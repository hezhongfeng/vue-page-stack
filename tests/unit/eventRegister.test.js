import { afterEach, describe, expect, it, vi } from 'vitest';

import config from '../../lib/config/config.js';
import eventRegister from '../../lib/eventRegister.js';
import history from '../../lib/history.js';

const resetHistory = () => {
  history.action = config.pushName;
  history.n = 1;
};

describe('eventRegister', () => {
  afterEach(() => {
    resetHistory();
  });

  it('updates navigation state for push, replace, back and forward', () => {
    const router = {
      push: vi.fn(to => to),
      go: vi.fn(step => step),
      replace: vi.fn(to => to),
      back: vi.fn(),
      forward: vi.fn()
    };

    eventRegister(router);

    expect(router.push('/detail')).toBe('/detail');
    expect(history.action).toBe(config.pushName);

    expect(router.replace('/profile')).toBe('/profile');
    expect(history.action).toBe(config.replaceName);

    router.back();
    expect(history.action).toBe(config.backName);
    expect(history.n).toBe(-1);

    router.forward();
    expect(history.action).toBe(config.forwardName);
  });

  it('stores the direction and step when calling go', () => {
    const router = {
      push: vi.fn(),
      go: vi.fn(step => step),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    };

    eventRegister(router);

    expect(router.go(2)).toBeUndefined();
    expect(history.action).toBe(config.forwardName);
    expect(history.n).toBe(2);

    router.go(-3);
    expect(history.action).toBe(config.backName);
    expect(history.n).toBe(-3);

    router.go(0);
    expect(history.action).toBe(config.backName);
    expect(history.n).toBe(0);
  });
});
