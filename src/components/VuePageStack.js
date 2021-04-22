import history from '../history';
import config from '../config/config';

function isDef(v) {
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
stack.remove = function({ start, end = stack.length - 1, isDestroy = true }) {
  if (!stack.length) {
    return;
  }
  if (isDestroy) {
    const leftStack = stack.slice(0, start);
    for(let i=start; i<=end; i++) {
      const item = stack[i];
      if (item && item.vnode.componentInstance) {
        // 有组件复用情况，此时不能destroy
        const isExist = leftStack.find(item2 => item2.vnode?.componentInstance === item.vnode.componentInstance);
        if (!isExist) {
          item.vnode.componentInstance.$destroy();
        }
      }
    }
  }
  stack.splice(start, end - start + 1);
};

function getIndexByKey(key) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
}

const VuePageStack = keyName => {
  return {
    name: config.componentName,
    abstract: true,
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
      const key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      if (!vnode) {
        return vnode;
      }
      const index = getIndexByKey(key);
      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance;
        // destroy the instances that will be spliced
        stack.remove({ start: index + 1, end: stack.length - 1 });
      } else {
        if (history.action === config.replaceName) {
          // 自替换时 组件instance是复用的
          stack.remove({
            start: stack.length - 1, end: stack.length - 1,
            isDestroy: !history.isSelfReplace
          });
        }
        // 刷新后，点击返回
        if (history.action === config.none) {
          stack.remove({ start: 0, end: stack.length - 1 });
        }
        stack.push({ key, vnode });
      }
      vnode.data.keepAlive = true;
      history.action = config.none;
      return vnode;
    }
  };
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
