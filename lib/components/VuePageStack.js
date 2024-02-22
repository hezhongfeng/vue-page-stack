import config from '../config/config';
import history from '../history';
import { v4 as uuidv4 } from 'uuid';
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
        if (pendingCacheKey) {
          if (useCache) {
            stack[stack.length - 1].vnode = getInnerChild(instance.subTree);
          } else {
            console.log('cacheSubtree and push');
            stack.push({ vnode: getInnerChild(instance.subTree) });
            console.log(stack);
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
        useCache = false;
        // 这里可以访问到route
        // const route = useRoute();

        // 路由上的Key
        // const key = route.query[keyName];

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

        console.log('vnode.key', vnode.key);

        const key = uuidv4();

        // clone vnode if it's reused because we are going to mutate it
        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
            rawVNode.ssContent = vnode;
          }
        }

        pendingCacheKey = key;
        if (history.action === config.backName) {
          console.log('back');
          // vnode.componentInstance = stack[index].vnode.componentInstance;
          let currentNode = stack.pop();
          const cachedVNode = stack[stack.length - 1].vnode;

          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          if (vnode.transition) {
            // recursively update transition hooks on subTree
            setTransitionHooks(vnode, vnode.transition);
          }
          // avoid vnode being mounted as fresh
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // destroy the instances that will be spliced
          // for (let i = index + 1; i < stack.length; i++) {
          resetShapeFlag(currentNode.vnode);
          currentNode = null;
          // }
          // stack.splice(index + 1);
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

export { VuePageStack, getStack };
