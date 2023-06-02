import { VuePageStack, getIndexByKey } from './components/VuePageStack.js';
import eventRegister from './eventRegister';
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

    eventRegister(router);

    router.beforeEach((to, from) => {
      if (!hasKey(to.query, keyName)) {
        to.query[keyName] = getKey('xxxxxxxx');
        // !hasKey() 为了适配初始化路由
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
        if (index === -1) {
          to.params[keyName + '-dir'] = config.forwardName;
        } else {
          to.params[keyName + '-dir'] = config.backName;
        }
      }
    });
  }
};

export default VuePageStackPlugin;
