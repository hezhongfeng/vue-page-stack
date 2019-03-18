import VueStack from './components/VueStack';
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

export default {
  install: function(Vue, { name, router, keyName = 'router-key' }) {
    Vue.component(name || VueStack.name, VueStack(keyName));
    // console.log(options.router);
    // options.router.beforeEach((to, from, next) => {
    //   console.log('beforeEach1');
    //   next();
    // });
    // options.router.beforeEach((to, from, next) => {
    //   console.log('beforeEach2');
    //   next();
    // });
    mixin(router);
    router.beforeEach((to, from, next) => {
      console.log('to:', to);
      // console.log('to:', to);
      if (!hasKey(to.query, keyName)) {
        // console.log('has no Key');
        to.query[keyName] = getKey('xxxxxxxx');
        // console.log(to);
        next({
          hash: to.hash,
          path: to.path,
          name: to.name,
          params: to.params,
          query: to.query,
          meta: to.meta,
          replace: history.action === 'replace'
        });
      } else {
        console.log('has Key');
        // console.log(to);
        next();
      }
    });
  }
};
