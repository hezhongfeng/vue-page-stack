/* eslint-disable */

import history from '../history';

export function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
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
    name: 'VueStack',
    props: {
      max: {
        type: [String, Number],
        default() {
          return '';
        }
      }
    },
    render() {
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      let index = getIndexByKey(key);
      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance;
        stack.splice(index + 1);
      } else {
        if (history.action === 'replace') {
          stack.splice(stack.length - 1);
        }
        stack.push({ key, vnode });
      }
      vnode.data.keepAlive = true;
      return vnode;
    }
  };
};
