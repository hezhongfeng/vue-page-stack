(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("vue")) : typeof define === "function" && define.amd ? define(["vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.VuePageStack = factory(global.Vue));
})(this, function(vue) {
  "use strict";
  const config = {
    componentName: "VuePageStack",
    keyName: "stack-key",
    pushName: "push",
    goName: "go",
    replaceName: "replace",
    backName: "back",
    forwardName: "forward"
  };
  /*!
    * vue-router v4.2.0
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
  Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
  Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
  const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
  Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
  function useRoute() {
    return vue.inject(routeLocationKey);
  }
  var ShapeFlags;
  (function(ShapeFlags2) {
    ShapeFlags2[ShapeFlags2["ELEMENT"] = 1] = "ELEMENT";
    ShapeFlags2[ShapeFlags2["FUNCTIONAL_COMPONENT"] = 2] = "FUNCTIONAL_COMPONENT";
    ShapeFlags2[ShapeFlags2["STATEFUL_COMPONENT"] = 4] = "STATEFUL_COMPONENT";
    ShapeFlags2[ShapeFlags2["TEXT_CHILDREN"] = 8] = "TEXT_CHILDREN";
    ShapeFlags2[ShapeFlags2["ARRAY_CHILDREN"] = 16] = "ARRAY_CHILDREN";
    ShapeFlags2[ShapeFlags2["SLOTS_CHILDREN"] = 32] = "SLOTS_CHILDREN";
    ShapeFlags2[ShapeFlags2["TELEPORT"] = 64] = "TELEPORT";
    ShapeFlags2[ShapeFlags2["SUSPENSE"] = 128] = "SUSPENSE";
    ShapeFlags2[ShapeFlags2["COMPONENT_SHOULD_KEEP_ALIVE"] = 256] = "COMPONENT_SHOULD_KEEP_ALIVE";
    ShapeFlags2[ShapeFlags2["COMPONENT_KEPT_ALIVE"] = 512] = "COMPONENT_KEPT_ALIVE";
    ShapeFlags2[ShapeFlags2["COMPONENT"] = 6] = "COMPONENT";
  })(ShapeFlags || (ShapeFlags = {}));
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  function invokeVNodeHook(hook, instance, vnode, prevVNode) {
    vue.callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [vnode, prevVNode]);
  }
  const isSuspense = (type) => type.__isSuspense;
  const MoveType = {
    ENTER: 0,
    LEAVE: 1,
    REORDER: 2
  };
  const ErrorCodes = {
    SETUP_FUNCTION: 0,
    RENDER_FUNCTION: 1,
    WATCH_GETTER: 2,
    WATCH_CALLBACK: 3,
    WATCH_CLEANUP: 4,
    NATIVE_EVENT_HANDLER: 5,
    COMPONENT_EVENT_HANDLER: 6,
    VNODE_HOOK: 7
  };
  function resetShapeFlag(vnode) {
    vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
    vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE;
  }
  function getInnerChild(vnode) {
    return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent : vnode;
  }
  const stack = [];
  const getIndexByKey = (key) => {
    for (let index = 0; index < stack.length; index++) {
      if (stack[index].key === key) {
        return index;
      }
    }
    return -1;
  };
  const VuePageStack = (keyName) => {
    return vue.defineComponent({
      name: config.componentName,
      __isKeepAlive: true,
      setup(props, { slots }) {
        console.log("VuePageStack setup");
        const instance = vue.getCurrentInstance();
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
        const storageContainer = createElement("div");
        sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
          const instance2 = vnode.component;
          move(vnode, container, anchor, MoveType.ENTER, parentSuspense);
          patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
          vue.queuePostFlushCb(() => {
            instance2.isDeactivated = false;
            if (instance2.a) {
              invokeArrayFns(instance2.a);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
          }, parentSuspense);
        };
        sharedContext.deactivate = (vnode) => {
          const instance2 = vnode.component;
          move(vnode, storageContainer, null, MoveType.LEAVE, parentSuspense);
          vue.queuePostFlushCb(() => {
            if (instance2.da) {
              invokeArrayFns(instance2.da);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
            instance2.isDeactivated = true;
          }, parentSuspense);
        };
        function unmount(vnode) {
          resetShapeFlag(vnode);
          _unmount(vnode, instance, parentSuspense, true);
        }
        let pendingCacheKey = null;
        let useCache = false;
        const cacheSubtree = () => {
          console.log("cacheSubtree");
          if (pendingCacheKey != null) {
            if (useCache) {
              stack[stack.length - 1].vnode = getInnerChild(instance.subTree);
            } else {
              stack.push({ key: pendingCacheKey, vnode: getInnerChild(instance.subTree) });
            }
          }
          console.log(pendingCacheKey, stack);
        };
        vue.onMounted(cacheSubtree);
        vue.onUpdated(cacheSubtree);
        vue.onBeforeUnmount(() => {
          for (const cachedStack of stack) {
            unmount(cachedStack.vnode);
          }
        });
        return () => {
          console.log("return");
          pendingCacheKey = null;
          useCache = false;
          const route = useRoute();
          const key = route.query[keyName];
          if (!slots.default) {
            return null;
          }
          console.log(180);
          const children = slots.default();
          const rawVNode = children[0];
          if (children.length > 1) {
            return children;
          } else if (!vue.isVNode(rawVNode) || !(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) && !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE)) {
            return rawVNode;
          }
          console.log(191);
          let vnode = getInnerChild(rawVNode);
          if (vnode.el) {
            vnode = vue.cloneVNode(vnode);
            if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
              rawVNode.ssContent = vnode;
            }
          }
          pendingCacheKey = key;
          console.log("pendingCacheKey", pendingCacheKey);
          let index = getIndexByKey(key);
          if (index !== -1) {
            const cachedVNode = stack[index].vnode;
            vnode.el = cachedVNode.el;
            vnode.component = cachedVNode.component;
            if (vnode.transition) {
              vue.setTransitionHooks(vnode, vnode.transition);
            }
            vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
            for (let i = index + 1; i < stack.length; i++) {
              stack[i] = null;
            }
            stack.splice(index + 1);
            useCache = true;
          }
          vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
          return isSuspense(rawVNode.type) ? rawVNode : vnode;
        };
      }
    });
  };
  function hasKey(query, keyName) {
    return !!query[keyName];
  }
  function getKey(str) {
    return str.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  const VuePageStackPlugin = {
    install(app, { router, name = config.componentName, keyName = config.keyName }) {
      if (!router) {
        throw Error("\n vue-router is necessary. \n\n");
      }
      app.component(name, VuePageStack(keyName));
      router.beforeEach((to, from) => {
        console.log("beforeEach");
        if (!hasKey(to.query, keyName)) {
          to.query[keyName] = getKey("xxxxxxxx");
          const replace = !hasKey(from.query, keyName);
          return {
            hash: to.hash,
            path: to.path,
            name: to.name,
            params: to.params,
            query: to.query,
            meta: to.meta,
            replace
          };
        } else {
          const index = getIndexByKey(to.query[keyName]);
          if (index === -1) {
            to.params[keyName + "-dir"] = config.forwardName;
            console.log("前进");
          } else {
            to.params[keyName + "-dir"] = config.backName;
            console.log("后退");
          }
        }
      });
    }
  };
  return VuePageStackPlugin;
});
//# sourceMappingURL=vue-page-stack.umd.js.map
