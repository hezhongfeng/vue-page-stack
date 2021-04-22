import { VuePageStack, getIndexByKey, getStack } from './components/VuePageStack';
import mixin from './mixin';
import history from './history';
import config from './config/config';

function hasKey(query, keyName) {
  return !!query[keyName];
}

function getKey(src) {
  return src.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const VuePageStackPlugin = {};

VuePageStackPlugin.install = function(Vue, {
  router,
  name = config.componentName,
  keyName = config.keyName,
  keepQuery = [], // 全局参数
}) {
  if (!router) {
    throw Error('\n vue-router is necessary. \n\n');
  }
  config.keyName = keyName;
  Vue.component(name, VuePageStack(keyName));

  Vue.prototype.$pageStack = {
    getStack
  };

  mixin(router);

  function beforeEach(to, from, next) {
    if (!hasKey(to.query, keyName)) {
      to.query[keyName] = getKey('xxxxxxxx');
      const replace = history.action === config.replaceName || !hasKey(from.query, keyName);
      // keep 参数 特殊参数向下传递
      keepQuery.forEach(q => {
        if (from.query[q] !== undefined && to.query[q] === undefined) {
          to.query[q] = from.query[q];
        }
      });
      if (replace) {
        // 自替换 只修改query，不修改path的replace
        history.isSelfReplace = to.name === from.name;
      }
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
      const index = getIndexByKey(to.query[keyName]);
      if (index === -1) {
        to.params[keyName + '-dir'] = config.forwardName;
      } else {
        to.params[keyName + '-dir'] = config.backName;
      }
      next({ params: to.params });
    }
  }

  // ensure it's the first beforeEach hook
  router.beforeHooks.unshift(beforeEach);
};

export default VuePageStackPlugin;
