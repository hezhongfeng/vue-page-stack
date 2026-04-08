import { COMPONENT_NAME, NAVIGATION_ACTIONS, STACK_EVENTS } from '../constants/config.js';
import { createNavigationState, NAVIGATION_STATE_INJECTION_KEY } from '../core/history.js';
import { ShapeFlags } from '@vue/shared';
import { createPageStackRenderer } from '../runtime/pageStackRenderer.js';
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

const createRenderCycleState = () => ({
  pendingCacheKey: false,
  useCache: false
});

const resetRenderCycleState = state => {
  state.pendingCacheKey = false;
  state.useCache = false;
};

const createPageStackState = ({ getInnerChild, resetShapeFlag, reuseCachedVNode, unmountCached }) => {
  const stack = [];

  return {
    cacheSubtree(subtree, action, renderState) {
      if (!renderState.pendingCacheKey) {
        return;
      }

      const cachedSubtree = getInnerChild(subtree);

      if (renderState.useCache || action === NAVIGATION_ACTIONS.replace) {
        stack[stack.length - 1] = cachedSubtree;
        return;
      }

      stack.push(cachedSubtree);
    },
    dispose() {
      for (const cachedStack of stack) {
        unmountCached(cachedStack);
      }
    },
    restore(rawVNode, vnode, step) {
      return restoreFromCache({
        stack,
        step,
        rawVNode,
        vnode,
        reuseCachedVNode,
        resetShapeFlag
      });
    }
  };
};

const resolveSlotChildren = slots => {
  if (!slots.default) {
    return null;
  }

  const children = slots.default();
  if (children.length > 1) {
    return children;
  }

  return children[0] ?? null;
};

const toRenderableVNode = (rawVNode, vnode, isSuspense) => {
  vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  return isSuspense(rawVNode.type) ? rawVNode : vnode;
};

const handleBackNavigation = ({ emit, navigationState, rawVNode, vnode, pageStackState, renderState }) => {
  emit(STACK_EVENTS.back);

  const restored = pageStackState.restore(rawVNode, vnode, -navigationState.n);
  if (!restored) {
    return false;
  }

  renderState.useCache = true;
  return true;
};

const VuePageStack = defineComponent({
  name: COMPONENT_NAME,
  __isKeepAlive: true,
  emits: [STACK_EVENTS.back, STACK_EVENTS.forward],
  setup(_props, { slots, emit }) {
    const navigationState = inject(NAVIGATION_STATE_INJECTION_KEY, createNavigationState());
    const instance = getCurrentInstance();
    const { getInnerChild, isSuspense, resetShapeFlag, reuseCachedVNode, unmountCached } = createPageStackRenderer(instance);
    const renderState = createRenderCycleState();
    const pageStackState = createPageStackState({
      getInnerChild,
      resetShapeFlag,
      reuseCachedVNode,
      unmountCached
    });

    const cacheSubtree = () => {
      pageStackState.cacheSubtree(instance.subTree, navigationState.action, renderState);
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);

    onBeforeUnmount(() => {
      pageStackState.dispose();
    });

    return () => {
      resetRenderCycleState(renderState);

      const rawVNode = resolveSlotChildren(slots);
      if (!rawVNode) {
        return null;
      }

      if (Array.isArray(rawVNode)) {
        return rawVNode;
      }

      if (!isCacheableVNode(rawVNode)) {
        return rawVNode;
      }

      const vnode = normalizeVNodeForCache(rawVNode, getInnerChild);
      renderState.pendingCacheKey = true;

      if (navigationState.action === NAVIGATION_ACTIONS.back) {
        if (!handleBackNavigation({ emit, navigationState, rawVNode, vnode, pageStackState, renderState })) {
          return toRenderableVNode(rawVNode, vnode, isSuspense);
        }
      } else {
        emit(STACK_EVENTS.forward);
      }

      return toRenderableVNode(rawVNode, vnode, isSuspense);
    };
  }
});

export { VuePageStack };
