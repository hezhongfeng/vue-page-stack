// import { VuePageStack } from './components/VuePageStack.js';
import { VuePageStack } from './components/VuePage.js';
import eventRegister from './eventRegister';
import history from './history';
import config from './config/config';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

const backCallback = () => {
  history.action = config.backName;
};

const VuePageStackPlugin = {
  install(app, { router, name = config.componentName }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    app.component(name, VuePageStack());

    app.use(DetectBrowserNavigationInVueRouter, { router, backCallback });

    eventRegister(router);
  }
};

export default VuePageStackPlugin;
