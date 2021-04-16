import history from '../history';
import config from '../config/config';
import {
  callWithAsyncErrorHandling,
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
  SetupContext,
  onBeforeUnmount,
  RendererElement,
  RendererNode,
  onMounted,
  onUpdated,
  VNode,
  cloneVNode,
  isVNode,
  SuspenseBoundary,
  queuePostFlushCb,
} from 'vue';
import { isArray, invokeArrayFns } from '@vue/shared';
import { useRoute } from 'vue-router';

const stack: any[] = [];

function getIndexByKey(key: string) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
}

const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

const enum MoveType {
  ENTER,
  LEAVE,
  REORDER,
}

function getInnerChild(vnode: VNode) {
  return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent! : vnode;
}

function resetShapeFlag(vnode: VNode) {
  let shapeFlag = vnode.shapeFlag;
  if (shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE) {
    shapeFlag -= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  }
  if (shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
    shapeFlag -= ShapeFlags.COMPONENT_KEPT_ALIVE;
  }
  vnode.shapeFlag = shapeFlag;
}

function queueEffectWithSuspense(
  fn: Function | Function[],
  suspense: SuspenseBoundary | null
): void {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}

function invokeVNodeHook(
  hook: any,
  instance: ComponentInternalInstance | null,
  vnode: VNode,
  prevVNode: VNode | null = null
) {
  callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}

type KeepAliveContext = {
  renderer: any;
  activate: (
    vnode: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    isSVG: boolean,
    optimized: boolean
  ) => void;
  deactivate: (vnode: VNode) => void;
};

const VuePageStack = (keyName: string): any => {
  return defineComponent({
    name: config.componentName,
    inheritRef: true,
    __isKeepAlive: true,
    setup(props, { slots }: SetupContext) {
      const instance = getCurrentInstance()! as any;

      const sharedContext = instance.ctx as KeepAliveContext;

      const cache = new Map();
      const keys: Keys = new Set();
      let current: VNode | null = null;

      const parentSuspense = instance.suspense;

      const {
        renderer: {
          p: patch,
          m: move,
          um: _unmount,
          o: { createElement },
        },
      } = sharedContext;
      const storageContainer = createElement('div');

      sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
        const instance = vnode.component!;
        move(vnode, container, anchor, MoveType.ENTER, parentSuspense);
        // in case props have changed
        patch(
          instance.vnode,
          vnode,
          container,
          anchor,
          instance,
          parentSuspense,
          isSVG,
          (vnode as any).slotScopeIds,
          optimized
        );
        queueEffectWithSuspense(() => {
          instance.isDeactivated = false;
          if ((instance as any).a) {
            invokeArrayFns((instance as any).a);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
        }, parentSuspense);
      };

      sharedContext.deactivate = (vnode: VNode) => {
        const instance = vnode.component!;
        move(vnode, storageContainer, null, MoveType.LEAVE, parentSuspense);
        queueEffectWithSuspense(() => {
          if ((instance as any).da) {
            invokeArrayFns((instance as any).da);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
          instance.isDeactivated = true;
        }, parentSuspense);
      };

      function unmount(vnode: VNode) {
        resetShapeFlag(vnode);
        _unmount(vnode, instance, parentSuspense);
      }

      onBeforeUnmount(() => {
        cache.forEach(cached => {
          const { subTree, suspense } = instance;
          const vnode = getInnerChild(subTree);
          if (cached.type === vnode.type) {
            // current instance will be unmounted as part of keep-alive's unmount
            resetShapeFlag(vnode);
            // but invoke its deactivated hook here
            const da = (vnode.component! as any).da;
            da && queueEffectWithSuspense(da, suspense);
            return;
          }
          unmount(cached);
        });
      });

      return () => {
        if (!slots.default) {
          return null;
        }

        const children = slots.default();
        const rawVNode = children[0];
        if (children.length > 1) {
          return children;
        } else if (
          !isVNode(rawVNode) ||
          (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) &&
            !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
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

        const route = useRoute();
        const key: any = route.query[keyName];
        const index: number = getIndexByKey(key);

        if (index !== -1) {
          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            unmount(stack[i]);
            stack[i] = null;
          }
          stack.splice(index + 1);
          vnode.component = stack[index].vnode.component;
          vnode.el = stack[index].vnode.el;
        } else {
          if (history.action === config.replaceName) {
            // destroy the instance
            unmount(stack[stack.length - 1]);
            stack[stack.length - 1] = null;
            stack.splice(stack.length - 1);
          }
          stack.push({ key, vnode });
        }

        // avoid vnode being unmounted
        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
        return vnode;
      };
    },
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
