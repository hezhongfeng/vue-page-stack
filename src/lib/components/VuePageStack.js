// import history from '../history';
// import config from '../config/config';
import {
  callWithAsyncErrorHandling,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  // cloneVNode,
  isVNode,
  queuePostFlushCb
} from 'vue';

import { useRoute } from 'vue-router';

const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

function invokeVNodeHook(hook, instance, vnode, prevVNode) {
  callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
}

// const isSuspense = type => type.__isSuspense;

// const isAsyncWrapper = i => !!i.type.__asyncLoader;

// const isArray = Array.isArray;

// const isString = val => typeof val === 'string';

// const objectToString = Object.prototype.toString;

// const toTypeString = value => objectToString.call(value);

// const isRegExp = val => toTypeString(val) === '[object RegExp]';

// const isFunction = val => typeof val === 'function';

// function getComponentName(Component, includeInferred = true) {
//   return isFunction(Component)
//     ? Component.displayName || Component.name
//     : Component.name || (includeInferred && Component.__name);
// }

// function matches(pattern, name) {
//   if (isArray(pattern)) {
//     return pattern.some(p => matches(p, name));
//   } else if (isString(pattern)) {
//     return pattern.split(',').includes(name);
//   } else if (isRegExp(pattern)) {
//     return pattern.test(name);
//   }
//   /* istanbul ignore next */
//   return false;
// }

export const MoveType = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};

export const ErrorCodes = {
  SETUP_FUNCTION: 0,
  RENDER_FUNCTION: 1,
  WATCH_GETTER: 2,
  WATCH_CALLBACK: 3,
  WATCH_CLEANUP: 4,
  NATIVE_EVENT_HANDLER: 5,
  COMPONENT_EVENT_HANDLER: 6,
  VNODE_HOOK: 7
};

export const ShapeFlags = {
  ELEMENT: 1,
  FUNCTIONAL_COMPONENT: 1 << 1,
  STATEFUL_COMPONENT: 1 << 2,
  TEXT_CHILDREN: 1 << 3,
  ARRAY_CHILDREN: 1 << 4,
  SLOTS_CHILDREN: 1 << 5,
  TELEPORT: 1 << 6,
  SUSPENSE: 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE: 1 << 8,
  COMPONENT_KEPT_ALIVE: 1 << 9
};

function resetShapeFlag(vnode) {
  // bitwise operations to remove keep alive flags
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE;
}

function getInnerChild(vnode) {
  return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent : vnode;
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

const VuePageStack = keyName => {
  return defineComponent({
    name: 'vue-page-stack',
    __isKeepAlive: true,
    setup(props, { slots }) {
      console.log('VuePageStack setup');

      // key = route.query[keyName];

      const instance = getCurrentInstance();
      const sharedContext = instance.ctx;

      const cache = new Map();
      // const keys = new Set();
      // let current = null;

      const parentSuspense = instance.suspense;

      const {
        renderer: {
          p: patch,
          m: move,
          um: _unmount,
          o: { createElement }
        }
      } = sharedContext;
      const storageContainer = createElement('div');

      sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
        const instance = vnode.component;
        move(vnode, container, anchor, MoveType.ENTER, parentSuspense);
        // in case props have changed
        patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
        queuePostFlushCb(() => {
          instance.isDeactivated = false;
          if (instance.a) {
            invokeArrayFns(instance.a);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
        }, parentSuspense);
      };

      sharedContext.deactivate = vnode => {
        const instance = vnode.component;
        move(vnode, storageContainer, null, MoveType.LEAVE, parentSuspense);
        queuePostFlushCb(() => {
          if (instance.da) {
            invokeArrayFns(instance.da);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
          instance.isDeactivated = true;
        }, parentSuspense);
      };

      function unmount(vnode) {
        // reset the shapeFlag so it can be properly unmounted
        resetShapeFlag(vnode);
        _unmount(vnode, instance, parentSuspense, true);
      }

      // cache sub tree after render
      let pendingCacheKey = null;
      const cacheSubtree = () => {
        // fix #1621, the pendingCacheKey could be 0
        if (pendingCacheKey != null) {
          cache.set(pendingCacheKey, getInnerChild(instance.subTree));
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);

      onBeforeUnmount(() => {
        cache.forEach(cached => {
          const { subTree, suspense } = instance;
          console.log(192);
          const vnode = getInnerChild(subTree);
          if (cached.type === vnode.type && cached.key === vnode.key) {
            // current instance will be unmounted as part of keep-alive's unmount
            resetShapeFlag(vnode);
            // but invoke its deactivated hook here
            const da = vnode.component.da;
            da && queuePostFlushCb(da, suspense);
            return;
          }
          unmount(cached);
        });
      });

      return () => {
        console.log('return');
        // 这里可以访问到route
        const route = useRoute();
        const key = route.query[keyName];

        pendingCacheKey = null;

        if (!slots.default) {
          return null;
        }

        const children = slots.default();
        const rawVNode = children[0];

        // 这里会提前return
        if (children.length > 1) {
          // current = null;
          return children;
        } else if (
          !isVNode(rawVNode) ||
          (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) && !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
        ) {
          // current = null;
          return rawVNode;
        }

        let vnode = getInnerChild(rawVNode);
        // console.log(rawVNode);
        let index = getIndexByKey(key);
        if (index !== -1) {
          // vnode.componentInstance = stack[index].vnode.componentInstance;
          // const cachedVNode = stack[index].vnode;

          // vnode.el = cachedVNode.el;
          // vnode.component = cachedVNode.component;
          // vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // // copy over mounted state
          // vnode.el = cachedVNode.el;
          // vnode.component = cachedVNode.component;
          // // if (vnode.transition) {
          // //   // recursively update transition hooks on subTree
          // //   setTransitionHooks(vnode, vnode.transition);
          // // }
          // // avoid vnode being mounted as fresh
          // vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
          // // make this key the freshest
          // keys.delete(key);
          // keys.add(key);

          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            // stack[i].vnode.componentInstance.$destroy();
            stack[i] = null;
          }
          stack.splice(index + 1);
          // current = vnode;
          vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
          return vnode;
        } else {
          // if (history.action === config.replaceName) {
          //   // destroy the instance
          //   stack[stack.length - 1].vnode.componentInstance.$destroy();
          //   stack[stack.length - 1] = null;
          //   stack.splice(stack.length - 1);
          // }

          // 第一次没有subTree，第二次是有的，这两次的区别是什么
          stack.push({ key, vnode: getInnerChild(instance.subTree) });
        }

        return rawVNode;
      };
    }
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
