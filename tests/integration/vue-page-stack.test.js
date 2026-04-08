import { describe, expect, it } from 'vitest';
import { defineComponent, h, nextTick, onMounted, ref, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';

import config from '../../lib/config/config.js';
import { createNavigationState, navigationStateKey } from '../../lib/history.js';
import { VuePageStack } from '../../lib/main.js';

const flushStack = async () => {
  await nextTick();
  await nextTick();
};

const createPage = name =>
  defineComponent({
    name,
    setup() {
      const value = ref('');
      const mounts = ref(0);

      onMounted(() => {
        mounts.value += 1;
      });

      return () =>
        h('section', { 'data-page': name }, [
          h('p', { 'data-testid': 'mounts' }, String(mounts.value)),
          h('input', {
            value: value.value,
            onInput: event => {
              value.value = event.target.value;
            }
          }),
          h('span', { 'data-testid': 'value' }, value.value)
        ]);
    }
  });

const mountStack = () => {
  const PageA = createPage('page-a');
  const PageB = createPage('page-b');
  const PageC = createPage('page-c');
  const PageX = createPage('page-x');
  const currentPage = shallowRef(PageA);
  const currentKey = ref('/a');
  const events = [];
  const navigationState = createNavigationState();

  const wrapper = mount(
    defineComponent({
      setup() {
        return () =>
          h(
            VuePageStack,
            {
              onBack: () => events.push('back'),
              onForward: () => events.push('forward')
            },
            {
              default: () => [h(currentPage.value, { key: currentKey.value })]
            }
        );
      }
    }),
    {
      global: {
        provide: {
          [navigationStateKey]: navigationState
        }
      }
    }
  );

  const navigate = async (component, key, action, step = 1) => {
    navigationState.action = action;
    navigationState.n = step;
    currentPage.value = component;
    currentKey.value = key;
    await flushStack();
  };

  return {
    wrapper,
    events,
    navigationState,
    PageA,
    PageB,
    PageC,
    PageX,
    navigate
  };
};

describe('VuePageStack', () => {
  it('renders nothing when there is no default slot', () => {
    const wrapper = mount(VuePageStack);
    expect(wrapper.html()).toBe('');
    wrapper.unmount();
  });

  it('passes through multiple children without applying stack behavior', () => {
    const wrapper = mount(VuePageStack, {
      slots: {
        default: () => [h('div', 'first'), h('div', 'second')]
      }
    });

    expect(wrapper.findAll('div')).toHaveLength(2);
    wrapper.unmount();
  });

  it('restores the previous page state on back and recreates popped pages on a new push', async () => {
    const { wrapper, PageA, PageB, navigate, events } = mountStack();
    await flushStack();

    await wrapper.find('input').setValue('alpha');

    await navigate(PageB, '/b', config.pushName);
    await wrapper.find('input').setValue('beta');
    expect(wrapper.find('[data-testid="value"]').text()).toBe('beta');

    await navigate(PageA, '/a', config.backName, -1);
    expect(wrapper.find('section').attributes('data-page')).toBe('page-a');
    expect(wrapper.find('input').element.value).toBe('alpha');

    await navigate(PageB, '/b', config.pushName);
    expect(wrapper.find('section').attributes('data-page')).toBe('page-b');
    expect(wrapper.find('input').element.value).toBe('');

    expect(events).toEqual(['forward', 'forward', 'back', 'forward']);
    wrapper.unmount();
  });

  it('replaces the current page in the stack so back returns to the previous cached page', async () => {
    const { wrapper, PageA, PageB, PageC, navigate } = mountStack();
    await flushStack();

    await wrapper.find('input').setValue('persisted');
    await navigate(PageB, '/b', config.pushName);
    await wrapper.find('input').setValue('to-be-replaced');

    await navigate(PageC, '/c', config.replaceName);
    await wrapper.find('input').setValue('current');

    await navigate(PageA, '/a', config.backName, -1);
    expect(wrapper.find('section').attributes('data-page')).toBe('page-a');
    expect(wrapper.find('input').element.value).toBe('persisted');

    wrapper.unmount();
  });

  it('renders a fresh page when a back navigation target is missing from the cache', async () => {
    const { wrapper, PageB, PageX, navigate } = mountStack();
    await flushStack();

    await navigate(PageB, '/b', config.pushName);
    await wrapper.find('input').setValue('cached-on-b');

    await navigate(PageX, '/x', config.backName, -1);
    expect(wrapper.find('section').attributes('data-page')).toBe('page-x');
    expect(wrapper.find('input').element.value).toBe('');

    wrapper.unmount();
  });

  it('keeps page stacks isolated when multiple instances exist at the same time', async () => {
    const first = mountStack();
    const second = mountStack();

    await flushStack();

    await first.wrapper.find('input').setValue('first-stack');
    await second.wrapper.find('input').setValue('second-stack');

    await first.navigate(first.PageB, '/b', config.pushName);
    await second.navigate(second.PageB, '/b', config.pushName);

    await first.wrapper.find('input').setValue('first-detail');
    await second.wrapper.find('input').setValue('second-detail');

    await first.navigate(first.PageA, '/a', config.backName, -1);
    expect(first.wrapper.find('input').element.value).toBe('first-stack');
    expect(second.wrapper.find('input').element.value).toBe('second-detail');

    await second.navigate(second.PageA, '/a', config.backName, -1);
    expect(second.wrapper.find('input').element.value).toBe('second-stack');

    first.wrapper.unmount();
    second.wrapper.unmount();
  });
});
