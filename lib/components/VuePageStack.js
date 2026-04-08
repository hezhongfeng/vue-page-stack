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
      if (pendingCacheKey) {
        if (useCache) {
          stack[stack.length - 1] = getInnerChild(instance.subTree);
        } else {
          if (navigationState.action != config.replaceName) {
            stack.push(getInnerChild(instance.subTree));
          } else {
            stack[stack.length - 1] = getInnerChild(instance.subTree);
          }
        }
      }
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

      if (navigationState.action === config.backName) {
        emit('back');

        const step = -navigationState.n;

        // cached node
        const cachedVNode = stack[stack.length - step - 1];

        if (!cachedVNode || cachedVNode.key != rawVNode.key) {
          // 这里相当于 push ，是从浏览器后退的，没有缓存
          resetShapeFlag(stack[stack.length - step]);
          stack[stack.length - step] = null;
          stack.splice(stack.length - step);
          vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
          return isSuspense(rawVNode.type) ? rawVNode : vnode;
        }

        // copy over mounted state
        reuseCachedVNode(vnode, cachedVNode);

        for (let i = stack.length - step; i < stack.length; i++) {
          resetShapeFlag(stack[i]);
          stack[i] = null;
        }
        stack.splice(stack.length - step);

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
