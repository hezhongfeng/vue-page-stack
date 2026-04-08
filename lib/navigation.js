import config from './config/config';

const navigationPatchedKey = Symbol('vue-page-stack-router-patched');

const setNavigationState = (navigationState, action, step = navigationState.n) => {
  navigationState.action = action;
  navigationState.n = step;
};

const setNavigationStateFromGo = (navigationState, step) => {
  if (step > 0) {
    setNavigationState(navigationState, config.forwardName, step);
    return;
  }

  if (step < 0) {
    setNavigationState(navigationState, config.backName, step);
    return;
  }

  navigationState.n = step;
};

const createBrowserNavigationCallbacks = navigationState => ({
  backCallback: step => {
    setNavigationState(navigationState, config.backName, step);
  },
  forwardCallback: step => {
    setNavigationState(navigationState, config.forwardName, step);
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
      setNavigationState(navigationState, config.pushName, 1);
      return originalMethods.push(to);
    },
    replace: to => {
      setNavigationState(navigationState, config.replaceName);
      return originalMethods.replace(to);
    },
    go: step => {
      setNavigationStateFromGo(navigationState, step);
      return originalMethods.go(step);
    },
    back: () => {
      setNavigationState(navigationState, config.backName, -1);
      return originalMethods.back();
    },
    forward: () => {
      setNavigationState(navigationState, config.forwardName, 1);
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
