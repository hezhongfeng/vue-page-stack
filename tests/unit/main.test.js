import { afterEach, describe, expect, it, vi } from 'vitest';

import { COMPONENT_NAME, NAVIGATION_ACTIONS } from '../../lib/constants/config.js';
import { NAVIGATION_STATE_INJECTION_KEY } from '../../lib/core/history.js';
import { VuePageStack, VuePageStackPlugin } from '../../lib/main.js';

describe('VuePageStackPlugin', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when installed without an options object', () => {
    expect(() => VuePageStackPlugin.install({}, undefined)).toThrow(/vue-router is necessary/i);
  });

  it('throws when installed without a router', () => {
    expect(() => VuePageStackPlugin.install({}, {})).toThrow(/vue-router is necessary/i);
  });

  it('throws when the router is missing required navigation methods', () => {
    const app = {
      component: vi.fn(),
      provide: vi.fn(),
      use: vi.fn()
    };

    expect(() => VuePageStackPlugin.install(app, { router: { push: vi.fn() } })).toThrow(/requires router\.replace/i);
  });

  it('registers the component, wires the browser plugin and patches router methods', () => {
    const app = {
      component: vi.fn(),
      provide: vi.fn(),
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

    expect(app.component).toHaveBeenCalledWith(COMPONENT_NAME, VuePageStack);
    expect(app.provide).toHaveBeenCalledTimes(1);
    expect(app.provide.mock.calls[0][0]).toBe(NAVIGATION_STATE_INJECTION_KEY);
    expect(app.use).toHaveBeenCalledTimes(1);
    expect(app.use.mock.calls[0][1]).toMatchObject({ router });

    const navigationState = app.provide.mock.calls[0][1];

    router.push('/foo');
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.push);

    router.go(-1);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-1);
  });

  it('updates history when browser navigation callbacks are triggered', () => {
    const app = {
      component: vi.fn(),
      provide: vi.fn(),
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
    const navigationState = app.provide.mock.calls[0][1];

    options.backCallback(-2);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-2);

    options.forwardCallback(3);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.forward);
    expect(navigationState.n).toBe(3);
  });

  it('is idempotent when installed multiple times on the same app with the same router', () => {
    const app = {
      component: vi.fn(),
      provide: vi.fn(),
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
    VuePageStackPlugin.install(app, { router });

    expect(app.component).toHaveBeenCalledTimes(1);
    expect(app.provide).toHaveBeenCalledTimes(1);
    expect(app.use).toHaveBeenCalledTimes(1);
  });

  it('throws when installed twice on the same app with different routers', () => {
    const app = {
      component: vi.fn(),
      provide: vi.fn(),
      use: vi.fn()
    };
    const firstRouter = {
      push: vi.fn(),
      go: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    };
    const secondRouter = {
      push: vi.fn(),
      go: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    };

    VuePageStackPlugin.install(app, { router: firstRouter });

    expect(() => VuePageStackPlugin.install(app, { router: secondRouter })).toThrow(/already installed on this app with a different router/i);
  });
});
