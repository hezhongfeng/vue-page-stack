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

const VuePage = () => {
  return defineComponent({
    name: `VuePage`,

    // Marker for special handling inside the renderer. We are not using a ===
    // check directly on KeepAlive in the renderer, because importing it directly
    // would prevent it from being tree-shaken.
    __isKeepAlive: true,

    setup(_props, { slots }) {
      const instance = getCurrentInstance() || false;
      // KeepAlive communicates with the instantiated renderer via the
      // ctx where the renderer passes in its internals,
      // and the KeepAlive instance exposes activate/deactivate implementations.
      // The whole point of this is to avoid importing KeepAlive directly in the
      // renderer to facilitate tree-shaking.
      const sharedContext = instance.ctx;

      const cache = new Map();
      const keys = new Set();

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
        const instance = vnode.component || null;
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
        const instance = vnode.component || null;
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
        pendingCacheKey = null;

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
        const comp = vnode.type;

        const key = vnode.key == null ? comp : vnode.key;
        const cachedVNode = cache.get(key);

        // clone vnode if it's reused because we are going to mutate it
        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
            rawVNode.ssContent = vnode;
          }
        }
        // #1513 it's possible for the returned vnode to be cloned due to attr
        // fallthrough or scopeId, so the vnode here may not be the final vnode
        // that is mounted. Instead of caching it directly, we store the pending
        // key and cache `instance.subTree` (the normalized vnode) in
        // beforeMount/beforeUpdate hooks.
        pendingCacheKey = key;

        if (cachedVNode) {
          // copy over mounted state
          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          if (vnode.transition) {
            // recursively update transition hooks on subTree
            setTransitionHooks(vnode, vnode.transition);
          }
          // avoid vnode being mounted as fresh
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
          // make this key the freshest
          keys.delete(key);
          keys.add(key);
        } else {
          keys.add(key);
        }
        // avoid vnode being unmounted
        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;

        return isSuspense(rawVNode.type) ? rawVNode : vnode;
      };
    }
  });
};

export { VuePage };
