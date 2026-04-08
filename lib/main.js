import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
import { createNavigationState, navigationStateKey } from './history';
import { COMPONENT_NAME } from './config/config';
import { createBrowserNavigationCallbacks } from './navigation';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const VuePageStackPlugin = {
  install(app, { router }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    const navigationState = createNavigationState();
    const browserNavigationCallbacks = createBrowserNavigationCallbacks(navigationState);

    app.component(COMPONENT_NAME, VuePageStack);
    app.provide(navigationStateKey, navigationState);

    app.use(DetectBrowserNavigationInVueRouter, {
      router,
      ...browserNavigationCallbacks
    });

    eventRegister(router, navigationState);
  }
};

export { VuePageStackPlugin, VuePageStack };
