import { VueStack, getIndexByKey } from './components/VueStack';
import mixin from './mixin';
import history from './history';

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

export default {
  install: function(Vue, { router, name = VueStack.name, keyName = 'stack-key' }) {
    Vue.component(name, VueStack(keyName));
    mixin(router);
    router.beforeEach((to, from, next) => {
      // console.log('router.beforeEach');
      // console.log('to', to);
      // console.log('from', from);
      // 检查目标路由是否含有keyName
      if (!hasKey(to.query, keyName)) {
        // console.log('has no key');
        // 判断匹配的路由是否一致
        if (hasSameMatched(to, from)) {
          // console.log('hasSameMatched');
          to.query[keyName] = from.query[keyName];
        } else {
          to.query[keyName] = getKey('xxxxxxxx');
        }
        let replace = history.action === 'replace' || !hasKey(from.query, keyName);
        // console.log('replace', replace);
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
        // 此处确定是forward 还是 back
        let index = getIndexByKey(to.query[keyName]);
        if (index === -1) {
          to.params[keyName + '-dir'] = 'forward';
        } else {
          to.params[keyName + '-dir'] = 'back';
        }
        next({ params: to.params });
      }
    });
  }
};
