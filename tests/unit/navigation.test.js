import { describe, expect, it, vi } from 'vitest';

import { NAVIGATION_ACTIONS } from '../../lib/constants/config.js';
import { createNavigationState } from '../../lib/core/history.js';
import {
  createBrowserNavigationCallbacks,
  createRouterNavigationStrategy,
  setNavigationStateFromGo
} from '../../lib/core/navigation.js';

describe('navigation strategy', () => {
  it('updates state from go steps with positive, negative and zero values', () => {
    const navigationState = createNavigationState();

    setNavigationStateFromGo(navigationState, 2);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.forward);
    expect(navigationState.n).toBe(2);

    setNavigationStateFromGo(navigationState, -3);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-3);

    setNavigationStateFromGo(navigationState, 0);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(0);
  });

  it('creates browser navigation callbacks that write to the same state object', () => {
    const navigationState = createNavigationState();
    const callbacks = createBrowserNavigationCallbacks(navigationState);

    callbacks.backCallback(-2);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.back);
    expect(navigationState.n).toBe(-2);

    callbacks.forwardCallback(4);
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.forward);
    expect(navigationState.n).toBe(4);
  });

  it('creates an idempotent router strategy for a router instance', () => {
    const navigationState = createNavigationState();
    const router = {
      push: vi.fn(to => to),
      replace: vi.fn(to => to),
      go: vi.fn(step => step),
      back: vi.fn(() => 'back'),
      forward: vi.fn(() => 'forward')
    };

    const firstStrategy = createRouterNavigationStrategy(router, navigationState);
    const secondStrategy = createRouterNavigationStrategy(router, createNavigationState());

    expect(secondStrategy).toBe(firstStrategy);
    expect(firstStrategy.push('/detail')).toBe('/detail');
    expect(navigationState.action).toBe(NAVIGATION_ACTIONS.push);
  });
});
