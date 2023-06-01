import { defineComponent as S, getCurrentInstance as y, queuePostFlushCb as A, onMounted as D, onUpdated as K, onBeforeUnmount as k, isVNode as b, cloneVNode as q, setTransitionHooks as v, callWithAsyncErrorHandling as w } from "vue";
import { useRoute as W } from "vue-router";
const f = {
  componentName: "VuePageStack",
  keyName: "stack-key",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
};
var i;
(function(e) {
  e[e.ELEMENT = 1] = "ELEMENT", e[e.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", e[e.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", e[e.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", e[e.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", e[e.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", e[e.TELEPORT = 64] = "TELEPORT", e[e.SUSPENSE = 128] = "SUSPENSE", e[e.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", e[e.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE", e[e.COMPONENT = 6] = "COMPONENT";
})(i || (i = {}));
const V = (e, o) => {
  for (let s = 0; s < e.length; s++)
    e[s](o);
};
function g(e, o, s, t) {
  w(e, o, X.VNODE_HOOK, [s, t]);
}
const B = (e) => e.__isSuspense, I = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
}, X = {
  SETUP_FUNCTION: 0,
  RENDER_FUNCTION: 1,
  WATCH_GETTER: 2,
  WATCH_CALLBACK: 3,
  WATCH_CLEANUP: 4,
  NATIVE_EVENT_HANDLER: 5,
  COMPONENT_EVENT_HANDLER: 6,
  VNODE_HOOK: 7
};
function Y(e) {
  e.shapeFlag &= ~i.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~i.COMPONENT_KEPT_ALIVE;
}
function d(e) {
  return e.shapeFlag & i.SUSPENSE ? e.ssContent : e;
}
const N = [], H = (e) => {
  for (let o = 0; o < N.length; o++)
    if (N[o].key === e)
      return o;
  return -1;
}, G = (e) => S({
  name: f.componentName,
  __isKeepAlive: !0,
  setup(o, { slots: s }) {
    console.log("VuePageStack setup", e);
    const t = y(), r = t.ctx, T = t.suspense, {
      renderer: {
        p: C,
        m,
        um: M,
        o: { createElement: U }
      }
    } = r, h = U("div");
    r.activate = (n, a, l, E, c) => {
      const u = n.component;
      m(n, a, l, I.ENTER, T), C(u.vnode, n, a, l, u, T, E, n.slotScopeIds, c), A(() => {
        u.isDeactivated = !1, u.a && V(u.a);
        const _ = n.props && n.props.onVnodeMounted;
        _ && g(_, u.parent, n);
      }, T);
    }, r.deactivate = (n) => {
      const a = n.component;
      m(n, h, null, I.LEAVE, T), A(() => {
        a.da && V(a.da);
        const l = n.props && n.props.onVnodeUnmounted;
        l && g(l, a.parent, n), a.isDeactivated = !0;
      }, T);
    };
    function x(n) {
      Y(n), M(n, t, T, !0);
    }
    let O = null, p = !1;
    const L = () => {
      console.log("cacheSubtree"), O != null && (p ? N[N.length - 1].vnode = d(t.subTree) : N.push({ key: O, vnode: d(t.subTree) })), console.log(O, N);
    };
    return D(L), K(L), k(() => {
      for (const n of N)
        x(n.vnode);
    }), () => {
      console.log("return"), O = null, p = !1;
      const n = W();
      console.log("route", n);
      const a = n.query[e];
      if (!s.default)
        return null;
      console.log(180);
      const l = s.default(), E = l[0];
      if (l.length > 1)
        return l;
      if (!b(E) || !(E.shapeFlag & i.STATEFUL_COMPONENT) && !(E.shapeFlag & i.SUSPENSE))
        return E;
      console.log(191);
      let c = d(E);
      c.el && (c = q(c), E.shapeFlag & i.SUSPENSE && (E.ssContent = c)), O = a, console.log("pendingCacheKey", O);
      let u = H(a);
      if (u !== -1) {
        const _ = N[u].vnode;
        c.el = _.el, c.component = _.component, c.transition && v(c, c.transition), c.shapeFlag |= i.COMPONENT_KEPT_ALIVE;
        for (let P = u + 1; P < N.length; P++)
          N[P] = null;
        N.splice(u + 1), p = !0;
      }
      return c.shapeFlag |= i.COMPONENT_SHOULD_KEEP_ALIVE, B(E.type) ? E : c;
    };
  }
});
function R(e, o) {
  return !!e[o];
}
function j(e) {
  return e.replace(/[xy]/g, (o) => {
    const s = Math.random() * 16 | 0;
    return (o === "x" ? s : s & 3 | 8).toString(16);
  });
}
const Q = {
  install(e, { router: o, name: s = f.componentName, keyName: t = f.keyName }) {
    if (!o)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(s, G(t)), o.beforeEach((r, T) => {
      if (console.log("beforeEach"), R(r.query, t))
        H(r.query[t]) === -1 ? (r.params[t + "-dir"] = f.forwardName, console.log("前进")) : (r.params[t + "-dir"] = f.backName, console.log("后退"));
      else {
        r.query[t] = j("xxxxxxxx");
        const C = !R(T.query, t);
        return {
          hash: r.hash,
          path: r.path,
          name: r.name,
          params: r.params,
          query: r.query,
          meta: r.meta,
          replace: C
        };
      }
    });
  }
};
export {
  Q as default
};
//# sourceMappingURL=vue-page-stack.es.js.map
