import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './plugin/eventRegister.js';
import { createNavigationState, NAVIGATION_STATE_INJECTION_KEY } from './core/history.js';
import { COMPONENT_NAME } from './constants/config.js';
import { createBrowserNavigationCallbacks } from './core/navigation.js';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const INSTALLED_ROUTER_KEY = Symbol('vue-page-stack-installed-router');
const REQUIRED_ROUTER_METHODS = ['push', 'replace', 'go', 'back', 'forward'];

const assertValidRouter = router => {
  if (!router) {
    throw Error('\n vue-router is necessary. \n\n');
  }

  const missingMethod = REQUIRED_ROUTER_METHODS.find(method => typeof router[method] !== 'function');
  if (missingMethod) {
    throw Error(`\n vue-page-stack requires router.${missingMethod} to be a function. \n\n`);
  }
};

const VuePageStackPlugin = {
  install(app, options = {}) {
    const { router } = options;

    assertValidRouter(router);

    if (app[INSTALLED_ROUTER_KEY]) {
      if (app[INSTALLED_ROUTER_KEY] !== router) {
        throw Error('\n vue-page-stack is already installed on this app with a different router. \n\n');
      }
      return;
    }

    const navigationState = createNavigationState();
    const browserNavigationCallbacks = createBrowserNavigationCallbacks(navigationState);

    app.component(COMPONENT_NAME, VuePageStack);
    app.provide(NAVIGATION_STATE_INJECTION_KEY, navigationState);

    app.use(DetectBrowserNavigationInVueRouter, {
      router,
      ...browserNavigationCallbacks
    });

    eventRegister(router, navigationState);
    Object.defineProperty(app, INSTALLED_ROUTER_KEY, {
      configurable: false,
      enumerable: false,
      value: router
    });
  }
};

export { VuePageStackPlugin, VuePageStack };
