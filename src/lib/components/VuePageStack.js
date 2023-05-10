// import history from '../history';
import config from '../config/config';
import {
  callWithAsyncErrorHandling,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  cloneVNode,
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
    name: config.componentName,
    __isKeepAlive: true,
    setup(props, { slots }) {
      console.log('VuePageStack setup');
      const instance = getCurrentInstance();
      const sharedContext = instance.ctx;

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
      let pendingCacheKey = false;
      const cacheSubtree = () => {
        console.log('cacheSubtree');
        // fix #1621, the pendingCacheKey could be 0
        if (pendingCacheKey) {
          console.log('pendingCacheKey');
          stack.push({ key: pendingCacheKey, vnode: getInnerChild(instance.subTree) });
          console.log(stack);
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);

      // clear all cache
      onBeforeUnmount(() => {
        console.log('onBeforeUnmount');
        for (const cacheStack of stack) {
          const { subTree, suspense } = instance;
          const vnode = getInnerChild(subTree);
          if (cacheStack.vnode.type === vnode.type && cacheStack.key === vnode.key) {
            // current instance will be unmounted as part of keep-alive's unmount
            resetShapeFlag(vnode);
            // but invoke its deactivated hook here
            const da = vnode.component.da;
            da && queuePostFlushCb(da, suspense);
            return;
          }
          unmount(cacheStack.vnode);
        }
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
          return children;
        } else if (
          !isVNode(rawVNode) ||
          (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) && !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
        ) {
          return rawVNode;
        }

        let vnode = getInnerChild(rawVNode);

        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
            rawVNode.ssContent = vnode;
          }
        }
        let index = getIndexByKey(key);
        if (index !== -1) {
          // vnode.componentInstance = stack[index].vnode.componentInstance;
          const cachedVNode = stack[index].vnode;

          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            // stack[i].vnode.componentInstance.$destroy();
            stack[i] = null;
          }
          stack.splice(index + 1);
          // current = vnode;
          console.log(267);
          return vnode;
        } else {
          console.log('else 需要存储vnode');
          // 第一次没有subTree，第二次是有的，这两次的区别是什么

          pendingCacheKey = key;
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
