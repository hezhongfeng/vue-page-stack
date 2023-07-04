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
  queuePostFlushCb,
  setTransitionHooks
} from 'vue';

import { useRoute } from 'vue-router';

var ShapeFlags;
(function (ShapeFlags) {
  ShapeFlags[(ShapeFlags['ELEMENT'] = 1)] = 'ELEMENT';
  ShapeFlags[(ShapeFlags['FUNCTIONAL_COMPONENT'] = 2)] = 'FUNCTIONAL_COMPONENT';
  ShapeFlags[(ShapeFlags['STATEFUL_COMPONENT'] = 4)] = 'STATEFUL_COMPONENT';
  ShapeFlags[(ShapeFlags['TEXT_CHILDREN'] = 8)] = 'TEXT_CHILDREN';
  ShapeFlags[(ShapeFlags['ARRAY_CHILDREN'] = 16)] = 'ARRAY_CHILDREN';
  ShapeFlags[(ShapeFlags['SLOTS_CHILDREN'] = 32)] = 'SLOTS_CHILDREN';
  ShapeFlags[(ShapeFlags['TELEPORT'] = 64)] = 'TELEPORT';
  ShapeFlags[(ShapeFlags['SUSPENSE'] = 128)] = 'SUSPENSE';
  ShapeFlags[(ShapeFlags['COMPONENT_SHOULD_KEEP_ALIVE'] = 256)] = 'COMPONENT_SHOULD_KEEP_ALIVE';
  ShapeFlags[(ShapeFlags['COMPONENT_KEPT_ALIVE'] = 512)] = 'COMPONENT_KEPT_ALIVE';
  ShapeFlags[(ShapeFlags['COMPONENT'] = 6)] = 'COMPONENT';
})(ShapeFlags || (ShapeFlags = {}));

export const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

function invokeVNodeHook(hook, instance, vnode, prevVNode) {
  callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
}

const isSuspense = type => type.__isSuspense;

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

function resetShapeFlag(vnode) {
  // bitwise operations to remove keep alive flags
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE;
}

function getInnerChild(vnode) {
  return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent : vnode;
}

const stack = [];

const getIndexByKey = key => {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
};

const VuePageStack = keyName => {
  return defineComponent({
    name: config.componentName,
    __isKeepAlive: true,
    setup(props, { slots }) {
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
      let pendingCacheKey = null;
      let useCache = false;

      const cacheSubtree = () => {
        // fix #1621, the pendingCacheKey could be 0
        if (pendingCacheKey != null) {
          if (useCache) {
            stack[stack.length - 1].vnode = getInnerChild(instance.subTree);
          } else {
            stack.push({ key: pendingCacheKey, vnode: getInnerChild(instance.subTree) });
          }
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);

      // clear all cache
      onBeforeUnmount(() => {
        for (const cachedStack of stack) {
          unmount(cachedStack.vnode);
        }
      });

      return () => {
        pendingCacheKey = null;
        useCache = false;
        // 这里可以访问到route
        const route = useRoute();

        // 路由上的Key
        const key = route.query[keyName];

        if (!slots.default) {
          return null;
        }

        const children = slots.default();
        const rawVNode = children[0];
        if (children.length > 1) {
          return children;
        } else if (
          !isVNode(rawVNode) ||
          (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) && !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
        ) {
          return rawVNode;
        }

        let vnode = getInnerChild(rawVNode);

        // clone vnode if it's reused because we are going to mutate it
        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
            rawVNode.ssContent = vnode;
          }
        }

        pendingCacheKey = key;

        let index = getIndexByKey(key);
        if (index !== -1) {
          // vnode.componentInstance = stack[index].vnode.componentInstance;
          const cachedVNode = stack[index].vnode;

          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          if (vnode.transition) {
            // recursively update transition hooks on subTree
            setTransitionHooks(vnode, vnode.transition);
          }
          // avoid vnode being mounted as fresh
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            resetShapeFlag(stack[i].vnode);
            stack[i] = null;
          }
          stack.splice(index + 1);
          useCache = true;
        }

        // avoid vnode being unmounted
        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;

        return isSuspense(rawVNode.type) ? rawVNode : vnode;
      };
    }
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
