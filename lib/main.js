import { VuePageStack } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
import history from './history';
import config from './config/config';
import DetectBrowserNavigationInVueRouter from 'detect-browser-navigation-in-vue-router';

// let isBack = false;

const backCallback = () => {
  // console.log('back');
  // isBack = true;
  history.action = config.backName;
};

const VuePageStackPlugin = {
  install(app, { router, name = config.componentName, keyName = config.keyName }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    app.component(name, VuePageStack(keyName));

    app.use(DetectBrowserNavigationInVueRouter, { router, backCallback });

    eventRegister(router);

    // router.beforeEach(to => {
    //   if (!isBack) {
    //     console.log('26 forward');
    //     to.params[keyName + '-dir'] = config.forwardName;
    //   } else {
    //     console.log('29 back');
    //     to.params[keyName + '-dir'] = config.backName;
    //     // history.action
    //   }
    // });
  }
};

export default VuePageStackPlugin;
