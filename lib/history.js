import config from './config/config';

const navigationStateKey = Symbol('vue-page-stack-navigation-state');

const createNavigationState = () => ({
  action: config.pushName,
  n: 1
});

export { createNavigationState, navigationStateKey };
