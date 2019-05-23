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
    data() {
      return {};
    },
    props: {
      max: {
        type: [String, Number],
        default() {
          return '';
        }
      }
    },
    render() {
      console.log('render');
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      console.log('slot', slot);
      const vnode = getFirstComponentChild(slot);
      if (!vnode) {
        return vnode;
      }
      let index = getIndexByKey(key);
      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance;
        this.$emit('stack-back');
        stack.splice(index + 1);
      } else {
        if (history.action === 'replace') {
          stack.splice(stack.length - 1);
        }
        stack.push({ key, vnode });
        this.$emit('stack-forward');
      }
      console.log('stack', stack);
      vnode.data.keepAlive = true;
      return vnode;
    }
  };
};
