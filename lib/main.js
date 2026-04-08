import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
import { createNavigationState, navigationStateKey } from './history';
import config from './config/config';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const VuePageStackPlugin = {
  install(app, { router }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    const navigationState = createNavigationState();

    app.component(config.componentName, VuePageStack);
    app.provide(navigationStateKey, navigationState);

    app.use(DetectBrowserNavigationInVueRouter, {
      router,
      backCallback: n => {
        navigationState.n = n;
        navigationState.action = config.backName;
      },
      forwardCallback: n => {
        navigationState.n = n;
        navigationState.action = config.forwardName;
      }
    });

    eventRegister(router, navigationState);
  }
};

export { VuePageStackPlugin, VuePageStack };
