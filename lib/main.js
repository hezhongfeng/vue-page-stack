import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
import history from './history';
import config from './config/config';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const backCallback = () => {
  history.n = -1;
  history.action = config.backName;
  console.log('browser back');
};

const forwardCallback = () => {
  history.action = config.forwardName;
  console.log('browser forward');
};

const VuePageStackPlugin = {
  install(app, { router }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    app.component(config.componentName, VuePageStack);

    app.use(DetectBrowserNavigationInVueRouter, { router, backCallback, forwardCallback });

    eventRegister(router);
  }
};

export { VuePageStackPlugin, VuePageStack };
