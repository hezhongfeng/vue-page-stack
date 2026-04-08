import { NAVIGATION_ACTIONS } from './config/config';

const navigationStateKey = Symbol('vue-page-stack-navigation-state');

const createNavigationState = () => ({
  action: NAVIGATION_ACTIONS.push,
  n: 1
});

export { createNavigationState, navigationStateKey };
