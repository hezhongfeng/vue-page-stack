import { VuePageStack, getIndexByKey, getStack } from './components/VuePageStack';
import mixin from './mixin';
import history from './history';
import config from './config/config';

function hasKey(query: any, keyName: string): boolean {
  return !!query[keyName];
}

function getKey(str: string): string {
  return str.replace(/[xy]/g, (c: string) => {
    // tslint:disable-next-line: no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line: no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface Option {
  router: any;
  name: string;
  keyName: string;
}

const VuePageStackPlugin = {
  install(Vue: any, { router, name = config.componentName, keyName = config.keyName }: Option) {
    if (!router) {
      throw Error('\n vue-router is necessary. \n\n');
    }
    Vue.component(name, VuePageStack(keyName));
    Vue.prototype.$pageStack = {
      getStack,
    };
    mixin(router);
    function beforeEach(to: any, from: any, next: any) {
      if (!hasKey(to.query, keyName)) {
        to.query[keyName] = getKey('xxxxxxxx');
        const replace = history.action === config.replaceName || !hasKey(from.query, keyName);
        next({
          hash: to.hash,
          path: to.path,
          name: to.name,
          params: to.params,
          query: to.query,
          meta: to.meta,
          replace,
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
  },
};

export default VuePageStackPlugin;
