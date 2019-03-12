import HyPage from './components/HyPage';
import event from './event';

function hasKey(query) {
  return query[keyName];
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
    Vue.component(name || HyPage.name, HyPage);
    // console.log(options.router);
    // options.router.beforeEach((to, from, next) => {
    //   console.log('beforeEach1');
    //   next();
    // });
    // options.router.beforeEach((to, from, next) => {
    //   console.log('beforeEach2');
    //   next();
    // });
    event(router);
    router.beforeEach((to, from, next) => {
      if (!hasKey(to.query)) {
        console.log('has no Key');
        query[keyName] = getKey('XXXXXXXX');
      }
      next();
    });
  }
};
