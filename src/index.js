import { VuePageStack, getIndexByKey } from './components/VuePageStack';
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

function hasSameMatched(to, from) {
  if (from.matched[0] && from.matched[0].path === to.matched[0].path) {
    return true;
  }
  return false;
}

const VuePageStackPlugin = {};

VuePageStackPlugin.install = function(Vue, { router, name = config.componentName, keyName = config.keyName }) {
  if (!router) {
    throw Error('\n vue-router is necessary. \n\n');
  }
  Vue.component(name, VuePageStack(keyName));
  mixin(router);
  router.beforeEach((to, from, next) => {
    if (!hasKey(to.query, keyName)) {
      if (hasSameMatched(to, from)) {
        to.query[keyName] = from.query[keyName];
      } else {
        to.query[keyName] = getKey('xxxxxxxx');
      }
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
  });
};

if (window && window.Vue) {
  // window
  window.Vue.use(VuePageStackPlugin);
}

export default VuePageStackPlugin;
