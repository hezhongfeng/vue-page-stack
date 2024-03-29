import { defineComponent as I, getCurrentInstance as R, queuePostFlushCb as P, onMounted as F, onUpdated as U, onBeforeUnmount as D, isVNode as H, cloneVNode as K, callWithAsyncErrorHandling as y, ErrorCodes as v, setTransitionHooks as x } from "vue";
const r = {
  componentName: "VuePageStack",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, c = {
  action: r.pushName,
  n: 1
};
/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const b = (e, o) => {
  for (let s = 0; s < e.length; s++)
    e[s](o);
}, f = {
  ELEMENT: 1,
  1: "ELEMENT",
  FUNCTIONAL_COMPONENT: 2,
  2: "FUNCTIONAL_COMPONENT",
  STATEFUL_COMPONENT: 4,
  4: "STATEFUL_COMPONENT",
  TEXT_CHILDREN: 8,
  8: "TEXT_CHILDREN",
  ARRAY_CHILDREN: 16,
  16: "ARRAY_CHILDREN",
  SLOTS_CHILDREN: 32,
  32: "SLOTS_CHILDREN",
  TELEPORT: 64,
  64: "TELEPORT",
  SUSPENSE: 128,
  128: "SUSPENSE",
  COMPONENT_SHOULD_KEEP_ALIVE: 256,
  256: "COMPONENT_SHOULD_KEEP_ALIVE",
  COMPONENT_KEPT_ALIVE: 512,
  512: "COMPONENT_KEPT_ALIVE",
  COMPONENT: 6,
  6: "COMPONENT"
};
function g(e, o, s, l) {
  y(e, o, v.VNODE_HOOK, [s, l]);
}
const j = (e) => e.__isSuspense, k = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function L(e) {
  e.shapeFlag &= ~f.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~f.COMPONENT_KEPT_ALIVE;
}
function _(e) {
  return e.shapeFlag & f.SUSPENSE ? e.ssContent : e;
}
const i = [], q = I({
  name: r.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: o, emit: s }) {
    const l = R(), E = l.ctx, u = l.suspense, {
      renderer: {
        p,
        m: T,
        um: V,
        o: { createElement: A }
      }
    } = E, M = A("div");
    E.activate = (n, a, t, d, O) => {
      const N = n.component;
      T(n, a, t, k.ENTER, u), p(N.vnode, n, a, t, N, u, d, n.slotScopeIds, O), P(() => {
        N.isDeactivated = !1, N.a && b(N.a);
        const S = n.props && n.props.onVnodeMounted;
        S && g(S, N.parent, n);
      }, u);
    }, E.deactivate = (n) => {
      const a = n.component;
      T(n, M, null, k.LEAVE, u), P(() => {
        a.da && b(a.da);
        const t = n.props && n.props.onVnodeUnmounted;
        t && g(t, a.parent, n), a.isDeactivated = !0;
      }, u);
    };
    function w(n) {
      L(n), V(n, l, u, !0);
    }
    let h = !1, C = !1;
    const m = () => {
      h && (C ? i[i.length - 1] = _(l.subTree) : c.action != r.replaceName && i.push(_(l.subTree)));
    };
    return F(m), U(m), D(() => {
      for (const n of i)
        w(n);
    }), () => {
      if (h = !1, C = !1, !o.default)
        return null;
      const n = o.default(), a = n[0];
      if (n.length > 1)
        return n;
      if (!H(a) || !(a.shapeFlag & f.STATEFUL_COMPONENT) && !(a.shapeFlag & f.SUSPENSE))
        return a;
      let t = _(a);
      if (t.el && (t = K(t), a.shapeFlag & f.SUSPENSE && (a.ssContent = t)), h = !0, c.action === r.backName) {
        s("back");
        const d = -c.n, O = i[i.length - d - 1];
        if (!O || O.key != a.key)
          return a;
        t.el = O.el, t.component = O.component, t.transition && x(t, t.transition), t.shapeFlag |= f.COMPONENT_KEPT_ALIVE;
        for (let N = i.length - d; N < i.length; N++)
          L(i[N]), i[N] = null;
        i.splice(i.length - d), C = !0;
      } else
        s("forward");
      return t.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, j(a.type) ? a : t;
    };
  }
}), z = (e) => {
  const o = e.push.bind(e), s = e.go.bind(e), l = e.replace.bind(e), E = e.back.bind(e), u = e.forward.bind(e);
  e.push = (p) => (c.action = r.pushName, o(p)), e.go = (p) => {
    c.action = r.goName, p < 0 && (c.action = r.backName, c.n = p), s(p);
  }, e.replace = (p) => (c.action = r.replaceName, l(p)), e.back = () => {
    c.action = r.backName, c.n = -1, E();
  }, e.forward = () => {
    c.action = r.forwardName, u();
  };
}, B = {
  install(e, { router: o, backCallback: s, forwardCallback: l } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!o)
      throw Error("router is required");
    let E = null;
    o.options.history.listen((u, p, T) => {
      E = T;
    }), o.beforeEach(() => {
      E && (E.direction === "back" && s ? s() : E.direction === "forward" && l && l(), E = null);
    });
  }
}, X = () => {
  c.n = -1, c.action = r.backName, console.log("browser back");
}, Y = () => {
  c.action = r.forwardName, console.log("browser forward");
}, W = {
  install(e, { router: o }) {
    if (!o)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(r.componentName, q), e.use(B, { router: o, backCallback: X, forwardCallback: Y }), z(o);
  }
};
export {
  q as VuePageStack,
  W as VuePageStackPlugin
};
