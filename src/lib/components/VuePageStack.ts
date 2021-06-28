import history from '../history';
import config from '../config/config';
const __FEATURE_SUSPENSE__ = true;
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
  ComponentOptions,
  VNodeProps,
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

function setTransitionHooks(vnode: VNode, hooks: any) {
  if (vnode.shapeFlag & ShapeFlags.COMPONENT && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (__FEATURE_SUSPENSE__ && vnode.shapeFlag & ShapeFlags.SUSPENSE) {
    vnode.ssContent!.transition = hooks.clone(vnode.ssContent!);
    vnode.ssFallback!.transition = hooks.clone(vnode.ssFallback!);
  } else {
    vnode.transition = hooks;
  }
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
    __isKeepAlive: true,
    setup(props, { slots }: SetupContext) {
      console.log('setup');

      const instance = getCurrentInstance()! as any;

      const sharedContext = instance.ctx as KeepAliveContext;

      if (!sharedContext.renderer) {
        return slots.default;
      }

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
          vnode.slotScopeIds,
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

      let key: any;

      const cacheSubtree = () => {
        if (key) {
          // 更新的时候，删除旧的 vnode ，存储更新的 vnode
          if (stack.some(item => item.key === key)) {
            const index: number = getIndexByKey(key);
            stack.splice(index);
          }
          stack.push({ key, vnode: getInnerChild(instance.subTree) });
        }
      };

      onMounted(() => {
        console.log('onMounted');
        cacheSubtree();
        console.log(stack);
      });

      onUpdated(() => {
        console.log('onUpdated');
        cacheSubtree();
        console.log(stack);
        setTimeout(() => {
          console.log(stack);
        }, 2000);
        // stack.find(item => item.key === key).vnode = getInnerChild(instance.subTree);
      });

      onBeforeUnmount(() => {
        console.log('onBeforeUnmount');

        stack.forEach(({ key, vnode }) => {
          const { subTree, suspense } = instance;
          const currentVnode = getInnerChild(subTree);
          if (vnode.type === currentVnode.type) {
            // current instance will be unmounted as part of keep-alive's unmount
            resetShapeFlag(currentVnode);
            // but invoke its deactivated hook here
            const da = (currentVnode.component! as any).da;
            da && queueEffectWithSuspense(da, suspense);
            return;
          }
          unmount(vnode);
        });
      });

      return () => {
        console.log('进入 return 函数');

        if (!slots.default) {
          console.log(230);
          return null;
        }

        const children = slots.default();
        const rawVNode = children[0];

        const route = useRoute();
        key = route.query[keyName];
        console.log(258, key);

        if (children.length > 1) {
          return children;
        } else if (
          !isVNode(rawVNode) ||
          (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) &&
            !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
        ) {
          console.log(243);
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

        const index: number = getIndexByKey(key);

        console.log(274);
        if (index !== -1) {
          console.log('命中缓存', stack);
          vnode.el = stack[index].vnode.el;
          vnode.component = stack[index].vnode.component;

          if (vnode.transition) {
            // recursively update transition hooks on subTree
            console.log(282);

            setTransitionHooks(vnode, vnode.transition!);
          }

          vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;

          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            unmount(stack[i]);
            stack[i] = null;
          }
          stack.splice(index + 1);
        } else {
          if (history.action === config.replaceName) {
            // destroy the instance
            unmount(stack[stack.length - 1]);
            stack[stack.length - 1] = null;
            stack.splice(stack.length - 1);
          }
        }

        // avoid vnode being unmounted
        vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
        console.log(292);

        return rawVNode;
      };
    },
  });
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
