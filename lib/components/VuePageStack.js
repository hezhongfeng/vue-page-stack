import config from '../config/config';
import { createNavigationState, navigationStateKey } from '../history';
import { ShapeFlags } from '@vue/shared';
import { createPageStackRenderer } from './pageStackRenderer.js';
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  cloneVNode,
  isVNode
} from 'vue';

const isCacheableVNode = vnode =>
  isVNode(vnode) && (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT || vnode.shapeFlag & ShapeFlags.SUSPENSE);

const normalizeVNodeForCache = (rawVNode, getInnerChild) => {
  let vnode = getInnerChild(rawVNode);

  if (!vnode.el) {
    return vnode;
  }

  vnode = cloneVNode(vnode);
  if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
    rawVNode.ssContent = vnode;
  }

  return vnode;
};

const writeCachedSubtree = ({ pendingCacheKey, useCache, stack, getInnerChild, subtree, action }) => {
  if (!pendingCacheKey) {
    return;
  }

  const cachedSubtree = getInnerChild(subtree);

  if (useCache || action === config.replaceName) {
    stack[stack.length - 1] = cachedSubtree;
    return;
  }

  stack.push(cachedSubtree);
};

const trimStackFrom = (stack, startIndex, resetShapeFlag) => {
  const normalizedStartIndex = Math.max(0, startIndex);

  for (let i = normalizedStartIndex; i < stack.length; i++) {
    resetShapeFlag(stack[i]);
    stack[i] = null;
  }

  stack.splice(normalizedStartIndex);
};

const hasMatchingCacheKey = (cachedVNode, rawVNode) =>
  cachedVNode && cachedVNode.key != null && rawVNode.key != null && cachedVNode.key === rawVNode.key;

const trimStackOnCacheMiss = (stack, step, resetShapeFlag) => {
  if (stack.length === 0) {
    return;
  }

  const startIndex = Math.max(0, Math.min(stack.length - step, stack.length - 1));
  trimStackFrom(stack, startIndex, resetShapeFlag);
};

const restoreFromCache = ({ stack, step, rawVNode, vnode, reuseCachedVNode, resetShapeFlag }) => {
  const cachedVNode = stack[stack.length - step - 1];

  if (!hasMatchingCacheKey(cachedVNode, rawVNode)) {
    trimStackOnCacheMiss(stack, step, resetShapeFlag);
    return false;
  }

  reuseCachedVNode(vnode, cachedVNode);
  trimStackFrom(stack, stack.length - step, resetShapeFlag);
  return true;
};

const VuePageStack = defineComponent({
  name: config.componentName,
  __isKeepAlive: true,
  emits: ['back', 'forward'],
  setup(_props, { slots, emit }) {
    const navigationState = inject(navigationStateKey, createNavigationState());
    const instance = getCurrentInstance();
    const stack = [];
    const { getInnerChild, isSuspense, resetShapeFlag, reuseCachedVNode, unmountCached } = createPageStackRenderer(instance);

    let pendingCacheKey = false;
    let useCache = false;
    const cacheSubtree = () => {
      writeCachedSubtree({
        pendingCacheKey,
        useCache,
        stack,
        getInnerChild,
        subtree: instance.subTree,
        action: navigationState.action
      });
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);

    onBeforeUnmount(() => {
      for (const cachedStack of stack) {
        unmountCached(cachedStack);
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
      }

      if (!isCacheableVNode(rawVNode)) {
        return rawVNode;
      }

      const vnode = normalizeVNodeForCache(rawVNode, getInnerChild);
      pendingCacheKey = true;

      if (navigationState.action === config.backName) {
        emit('back');

        const step = -navigationState.n;
        const restored = restoreFromCache({
          stack,
          step,
          rawVNode,
          vnode,
          reuseCachedVNode,
          resetShapeFlag
        });

        if (!restored) {
          vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
          return isSuspense(rawVNode.type) ? rawVNode : vnode;
        }

        useCache = true;
      } else {
        emit('forward');
      }

      vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;

      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
});

export { VuePageStack };
