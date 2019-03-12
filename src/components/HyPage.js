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

export default {
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
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    console.log(vnode);
    // const componentOptions = vnode && vnode.componentOptions;

    // check it's a Vue component
    // if (componentOptions) {
    // }
    return vnode;
  }
};
