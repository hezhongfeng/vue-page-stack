import { afterEach, describe, expect, it, vi } from 'vitest';

import config from '../../lib/config/config.js';
import history from '../../lib/history.js';
import { VuePageStack, VuePageStackPlugin } from '../../lib/main.js';

const resetHistory = () => {
  history.action = config.pushName;
  history.n = 1;
};

describe('VuePageStackPlugin', () => {
  afterEach(() => {
    resetHistory();
  });

  it('throws when installed without a router', () => {
    expect(() => VuePageStackPlugin.install({}, {})).toThrow(/vue-router is necessary/i);
  });

  it('registers the component, wires the browser plugin and patches router methods', () => {
    const app = {
      component: vi.fn(),
      use: vi.fn()
    };
    const router = {
      push: vi.fn(to => to),
      go: vi.fn(),
      replace: vi.fn(to => to),
      back: vi.fn(),
      forward: vi.fn()
    };

    VuePageStackPlugin.install(app, { router });

    expect(app.component).toHaveBeenCalledWith(config.componentName, VuePageStack);
    expect(app.use).toHaveBeenCalledTimes(1);
    expect(app.use.mock.calls[0][1]).toMatchObject({ router });

    router.push('/foo');
    expect(history.action).toBe(config.pushName);

    router.go(-1);
    expect(history.action).toBe(config.backName);
    expect(history.n).toBe(-1);
  });

  it('updates history when browser navigation callbacks are triggered', () => {
    const app = {
      component: vi.fn(),
      use: vi.fn()
    };
    const router = {
      push: vi.fn(),
      go: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    };

    VuePageStackPlugin.install(app, { router });

    const options = app.use.mock.calls[0][1];

    options.backCallback(-2);
    expect(history.action).toBe(config.backName);
    expect(history.n).toBe(-2);

    options.forwardCallback(3);
    expect(history.action).toBe(config.forwardName);
    expect(history.n).toBe(3);
  });
});
