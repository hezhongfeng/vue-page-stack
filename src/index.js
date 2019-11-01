import { VuePageStack, getIndexByKey, getStack } from './components/VuePageStack';
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
  function intercept(to, from, next) {
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
      let index = getIndexByKey(to.query[keyName]);
      if (index === -1) {
        to.params[keyName + '-dir'] = config.forwardName;
      } else {
        to.params[keyName + '-dir'] = config.backName;
      }
      next({ params: to.params });
    }
  }
  router.beforeEach(intercept);
  let index = router.beforeHooks.findIndex(hook => {
    return hook === a
  })
  router.beforeHooks.unshift(router.beforeHooks.splice(index, 1)[0])
};

export default VuePageStackPlugin;
