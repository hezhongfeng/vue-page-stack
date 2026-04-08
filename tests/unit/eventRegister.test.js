import { afterEach, describe, expect, it, vi } from 'vitest';

import { NAVIGATION_ACTIONS } from '../../lib/constants/config.js';
import eventRegister from '../../lib/plugin/eventRegister.js';
import { createNavigationState } from '../../lib/core/history.js';

let navigationState;

describe('eventRegister', () => {
  afterEach(() => {
    navigationState = createNavigationState();
  });

  it('updates navigation state for push, replace, back and forward', () => {
    navigationState = createNavigationState();
    const router = {
      push: vi.fn(to => to),
      go: vi.fn(step => step),
      replace: vi.fn(to => to),
      back: vi.fn(),
      forward: vi.fn()
    };

    eventRegister(router, navigationState);

    expect(router.push('/detail')).toBe('/detail');
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.push);

    expect(router.replace('/profile')).toBe('/profile');
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.replace);

    router.back();
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-1);

    router.forward();
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.forward);
  });

  it('stores the direction and step when calling go', () => {
    navigationState = createNavigationState();
    const router = {
      push: vi.fn(),
      go: vi.fn(step => step),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    };

    eventRegister(router, navigationState);

    expect(router.go(2)).toBe(2);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.forward);
    expect(navigationState.n).toBe(2);

    router.go(-3);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-3);

    router.go(0);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(0);
  });

  it('does not wrap the same router more than once', () => {
    navigationState = createNavigationState();
    const router = {
      push: vi.fn(to => to),
      go: vi.fn(step => step),
      replace: vi.fn(to => to),
      back: vi.fn(),
      forward: vi.fn()
    };

    eventRegister(router, navigationState);
    const wrappedPush = router.push;

    eventRegister(router, createNavigationState());

    expect(router.push).toBe(wrappedPush);
  });
});
