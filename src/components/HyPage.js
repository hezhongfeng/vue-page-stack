/* eslint-disable */

import history from '../history';

export function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

const _toString = Object.prototype.toString;

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

const stack = [];

function getIndexByKey(key) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
}

export default keyName => {
  return {
    name: 'HyPage',
    props: {
      max: {
        type: [String, Number],
        default() {
          return '';
        }
      }
    },
    render() {
      console.log('当前方法' + history.action);
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      console.log('当前的key：', key);
      console.log(stack);
      let index = getIndexByKey(key);
      console.log('index:', index);
      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance;
        stack.splice(index + 1);
      } else {
        stack.push({ key, vnode });
      }

      console.log(stack);

      vnode.data.keepAlive = true;
      return vnode;
    }
  };
};
