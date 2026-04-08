import { NAVIGATION_ACTIONS } from '../constants/config.js';

const navigationPatchedKey = Symbol('vue-page-stack-router-patched');

const setNavigationState = (navigationState, action, step = navigationState.n) => {
  navigationState.action = action;
  navigationState.n = step;
};

const setNavigationStateFromGo = (navigationState, step) => {
  if (step > 0) {
    setNavigationState(navigationState, NAVIGATION_ACTIONS.forward, step);
    return;
  }

  if (step < 0) {
    setNavigationState(navigationState, NAVIGATION_ACTIONS.back, step);
    return;
  }

  navigationState.n = step;
};

const createBrowserNavigationCallbacks = navigationState => ({
  backCallback: step => {
    setNavigationState(navigationState, NAVIGATION_ACTIONS.back, step);
  },
  forwardCallback: step => {
    setNavigationState(navigationState, NAVIGATION_ACTIONS.forward, step);
  }
});

const createRouterNavigationStrategy = (router, navigationState) => {
  if (router[navigationPatchedKey]) {
    return router[navigationPatchedKey];
  }

  const originalMethods = {
    push: router.push.bind(router),
    replace: router.replace.bind(router),
    go: router.go.bind(router),
    back: router.back.bind(router),
    forward: router.forward.bind(router)
  };

  const strategy = {
    push: to => {
      setNavigationState(navigationState, NAVIGATION_ACTIONS.push, 1);
      return originalMethods.push(to);
    },
    replace: to => {
      setNavigationState(navigationState, NAVIGATION_ACTIONS.replace);
      return originalMethods.replace(to);
    },
    go: step => {
      setNavigationStateFromGo(navigationState, step);
      return originalMethods.go(step);
    },
    back: () => {
      setNavigationState(navigationState, NAVIGATION_ACTIONS.back, -1);
      return originalMethods.back();
    },
    forward: () => {
      setNavigationState(navigationState, NAVIGATION_ACTIONS.forward, 1);
      return originalMethods.forward();
    }
  };

  Object.defineProperty(router, navigationPatchedKey, {
    configurable: false,
    enumerable: false,
    value: strategy
  });

  return strategy;
};

export {
  createBrowserNavigationCallbacks,
  createRouterNavigationStrategy,
  setNavigationState,
  setNavigationStateFromGo
};
