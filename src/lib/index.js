// import { VuePageStack, getIndexByKey } from './components/VuePageStack.js';
import { VuePageStack, getIndexByKey } from './components/KeepPageStack.js';
// import mixin from './mixin';
import history from './history';
import config from './config/config';

function hasKey(query, keyName) {
  return !!query[keyName];
}

function getKey(str) {
  return str.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const VuePageStackPlugin = {
  install(app, { router, name = config.componentName, keyName = config.keyName }) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    app.component(name, VuePageStack(keyName));

    // app.$pageStack = {
    //   getStack
    // };
    // mixin(router);
    router.beforeEach((to, from) => {
      console.log('beforeEach');
      if (!hasKey(to.query, keyName)) {
        to.query[keyName] = getKey('xxxxxxxx');
        const replace = history.action === config.replaceName || !hasKey(from.query, keyName);
        return {
          hash: to.hash,
          path: to.path,
          name: to.name,
          params: to.params,
          query: to.query,
          meta: to.meta,
          replace
        };
      } else {
        const index = getIndexByKey(to.query[keyName]);
        // console.log(index);
        if (index === -1) {
          to.params[keyName + '-dir'] = config.forwardName;
          console.log('前进');
        } else {
          to.params[keyName + '-dir'] = config.backName;
          console.log('后退');
        }
      }
    });
  }
};

export default VuePageStackPlugin;
