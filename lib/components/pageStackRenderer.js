import { ShapeFlags, invokeArrayFns } from '@vue/shared';
import {
  callWithAsyncErrorHandling,
  ErrorCodes,
  queuePostFlushCb,
  setTransitionHooks
} from 'vue';

const isSuspense = type => type.__isSuspense;

const moveType = {
  enter: 0,
  leave: 1
};

function invokeVNodeHook(hook, instance, vnode, prevVNode) {
  callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
}

function resetShapeFlag(vnode) {
  if (!vnode) {
    return;
  }

  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE;
}

function getInnerChild(vnode) {
  return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent : vnode;
}

function createPageStackRenderer(instance) {
  const sharedContext = instance.ctx;
  const parentSuspense = instance.suspense;
  const {
    renderer: {
      p: patch,
      m: move,
      um: unmount,
      o: { createElement }
    }
  } = sharedContext;
  const storageContainer = createElement('div');

  const activate = (vnode, container, anchor, namespace, optimized) => {
    const componentInstance = vnode.component;
    move(vnode, container, anchor, moveType.enter, parentSuspense);
    patch(componentInstance.vnode, vnode, container, anchor, componentInstance, parentSuspense, namespace, vnode.slotScopeIds, optimized);
    queuePostFlushCb(() => {
      componentInstance.isDeactivated = false;
      if (componentInstance.a) {
        invokeArrayFns(componentInstance.a);
      }
      const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
      if (vnodeHook) {
        invokeVNodeHook(vnodeHook, componentInstance.parent, vnode);
      }
    }, parentSuspense);
  };

  const deactivate = vnode => {
    const componentInstance = vnode.component;
    move(vnode, storageContainer, null, moveType.leave, parentSuspense);
    queuePostFlushCb(() => {
      if (componentInstance.da) {
        invokeArrayFns(componentInstance.da);
      }
      const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
      if (vnodeHook) {
        invokeVNodeHook(vnodeHook, componentInstance.parent, vnode);
      }
      componentInstance.isDeactivated = true;
    }, parentSuspense);
  };

  const unmountCached = vnode => {
    resetShapeFlag(vnode);
    unmount(vnode, instance, parentSuspense, true);
  };

  const reuseCachedVNode = (vnode, cachedVNode) => {
    vnode.el = cachedVNode.el;
    vnode.component = cachedVNode.component;
    if (vnode.transition) {
      setTransitionHooks(vnode, vnode.transition);
    }
    vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
  };

  sharedContext.activate = activate;
  sharedContext.deactivate = deactivate;

  return {
    getInnerChild,
    isSuspense,
    resetShapeFlag,
    reuseCachedVNode,
    unmountCached
  };
}

export { createPageStackRenderer };
