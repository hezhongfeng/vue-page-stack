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

const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

function invokeVNodeHook(hook, instance, vnode, prevVNode) {
  callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
}

// eslint-disable-next-line no-unused-vars
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

const getIndexByKey = key => {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
};

// eslint-disable-next-line no-unused-vars
const VuePageStack = keyName => {
  return defineComponent({
    name: config.componentName,
    __isKeepAlive: true,
    setup(props, { slots }) {
      console.log('VuePageStack setup');
      const instance = getCurrentInstance();
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

      // eslint-disable-next-line no-unused-vars
      function unmount(vnode) {
        // reset the shapeFlag so it can be properly unmounted
        resetShapeFlag(vnode);
        _unmount(vnode, instance, parentSuspense, true);
      }

      // cache sub tree after render
      let pendingCacheKey = null;

      const cacheSubtree = () => {
        // fix #1621, the pendingCacheKey could be 0
        console.log('cacheSubtree');
        if (pendingCacheKey != null) {
          cache.set(pendingCacheKey, getInnerChild(instance.subTree));
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);

      // clear all cache
      onBeforeUnmount(() => {
        console.log('onBeforeUnmount');
      });

      return () => {
        console.log('return');
        pendingCacheKey = null;

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
        pendingCacheKey = key;

        if (cachedVNode) {
          console.log('cachedVNode');
          // copy over mounted state
          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
          // make this key the freshest
          keys.delete(key);
          keys.add(key);
          console.log('cachedVNode' + 291);
        } else {
          console.log('cachedVNode else' + 293);
          keys.add(key);
          // prune oldest entry
          // if (max && keys.size > parseInt(max, 10)) {
          //   console.log('max && keys.size > parseInt(max, 10)');
          //   pruneCacheEntry(keys.values().next().value);
          // }
        }

        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
        return vnode;
      };
    }
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
