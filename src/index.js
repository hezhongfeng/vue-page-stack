import { VuePageStack, getStack } from './components/VuePageStack';
import mixin from './mixin';
import history from './history';
import config from './config/config';

function hasKey(query, keyName) {
  return !!query[keyName];
}

function getKey(src) {
  return src.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const VuePageStackPlugin = {};

VuePageStackPlugin.install = function(Vue, { router, name = config.componentName, keyName = config.keyName }) {
  if (!router) {
    throw Error('\n vue-router is necessary. \n\n');
  }
  Vue.component(name, VuePageStack(keyName));

  Vue.prototype.$pageStack = {
    getStack
  };

  mixin(router);

  function beforeEach(to, from, next) {
    if (!hasKey(to.query, keyName)) {
      to.query[keyName] = getKey('xxxxxxxx');
      let replace = history.action === config.replaceName || !hasKey(from.query, keyName);
      next({
        hash: to.hash,
        path: to.path,
        name: to.name,
        params: to.params,
        query: to.query,
        meta: to.meta,
        replace: replace
      });
    } else {
      to.params[keyName + '-dir'] = history.direction;
      next({ params: to.params });
    }
  }

  // ensure it's the first beforeEach hook
  router.beforeHooks.unshift(beforeEach);
};

export default VuePageStackPlugin;
