import config from '../config/config';
import history from '../history';
import { ShapeFlags, invokeArrayFns } from '@vue/shared';
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
  setTransitionHooks,
  ErrorCodes
} from 'vue';

function invokeVNodeHook(hook, instancel, vnode, prevVNode) {
  callWithAsyncErrorHandling(hook, instancel, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
}

const isSuspense = type => type.__isSuspense;

const MoveType = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
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

const VuePageStack = () => {
  return defineComponent({
    name: config.componentName,
    __isKeepAlive: true,
    setup(_props, { slots }) {
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

      sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
        const instance = vnode.component;
        move(vnode, container, anchor, MoveType.ENTER, parentSuspense);
        // in case props have changed
        patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, namespace, vnode.slotScopeIds, optimized);
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

      let pendingCacheKey = false;
      let useCache = false;
      const cacheSubtree = () => {
        if (pendingCacheKey) {
          if (useCache) {
            stack[stack.length - 1] = getInnerChild(instance.subTree);
          } else {
            stack.push(getInnerChild(instance.subTree));
          }
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);

      onBeforeUnmount(() => {
        for (const cachedStack of stack) {
          unmount(cachedStack);
        }
      });

      return () => {
        pendingCacheKey = false;
        useCache = false;

        if (!slots.default) {
          return null;
        }

        const children = slots.default();
        const rawVNode = children[0];
        if (children.length > 1) {
          return children;
        } else if (!isVNode(rawVNode) || (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) && !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))) {
          return rawVNode;
        }

        let vnode = getInnerChild(rawVNode);

        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
            rawVNode.ssContent = vnode;
          }
        }

        pendingCacheKey = true;

        if (history.action === config.backName) {
          const step = -history.n;

          // cached node
          const cachedVNode = stack[stack.length - step - 1];

          // copy over mounted state
          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          if (vnode.transition) {
            // recursively update transition hooks on subTree
            setTransitionHooks(vnode, vnode.transition);
          }
          // avoid vnode being mounted as fresh
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          for (let i = stack.length - step; i < stack.length; i++) {
            resetShapeFlag(stack[i]);
            stack[i] = null;
          }
          stack.splice(stack.length - step);

          useCache = true;
        }

        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;

        return isSuspense(rawVNode.type) ? rawVNode : vnode;
      };
    }
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getStack };
