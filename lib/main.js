import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
import { createNavigationState, navigationStateKey } from './history';
import config from './config/config';
import { createBrowserNavigationCallbacks } from './navigation';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const VuePageStackPlugin = {
  install(app, { router }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    const navigationState = createNavigationState();
    const browserNavigationCallbacks = createBrowserNavigationCallbacks(navigationState);

    app.component(config.componentName, VuePageStack);
    app.provide(navigationStateKey, navigationState);

    app.use(DetectBrowserNavigationInVueRouter, {
      router,
      ...browserNavigationCallbacks
    });

    eventRegister(router, navigationState);
  }
};

export { VuePageStackPlugin, VuePageStack };
