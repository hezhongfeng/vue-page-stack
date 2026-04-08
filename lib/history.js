import { NAVIGATION_ACTIONS } from './config/config';

const NAVIGATION_STATE_INJECTION_KEY = Symbol('vue-page-stack-navigation-state');

const createNavigationState = () => ({
  action: NAVIGATION_ACTIONS.push,
  n: 1
});

export { createNavigationState, NAVIGATION_STATE_INJECTION_KEY };
