import { defineComponent as R, getCurrentInstance as U, queuePostFlushCb as g, onMounted as w, onUpdated as D, onBeforeUnmount as H, isVNode as K, cloneVNode as y, callWithAsyncErrorHandling as v, ErrorCodes as x, setTransitionHooks as j } from "vue";
const i = {
  componentName: "VuePageStack",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, c = {
  action: i.pushName,
  n: 1
};
/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const k = (e, s) => {
  for (let r = 0; r < e.length; r++)
    e[r](s);
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
function b(e, s, r, l) {
  v(e, s, x.VNODE_HOOK, [r, l]);
}
const L = (e) => e.__isSuspense, V = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function m(e) {
  e.shapeFlag &= ~f.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~f.COMPONENT_KEPT_ALIVE;
}
function h(e) {
  return e.shapeFlag & f.SUSPENSE ? e.ssContent : e;
}
const o = [], q = R({
  name: i.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: s, emit: r }) {
    const l = U(), E = l.ctx, u = l.suspense, {
      renderer: {
        p: N,
        m: T,
        um: A,
        o: { createElement: M }
      }
    } = E, I = M("div");
    E.activate = (n, a, t, O, d) => {
      const p = n.component;
      T(n, a, t, V.ENTER, u), N(p.vnode, n, a, t, p, u, O, n.slotScopeIds, d), g(() => {
        p.isDeactivated = !1, p.a && k(p.a);
        const S = n.props && n.props.onVnodeMounted;
        S && b(S, p.parent, n);
      }, u);
    }, E.deactivate = (n) => {
      const a = n.component;
      T(n, I, null, V.LEAVE, u), g(() => {
        a.da && k(a.da);
        const t = n.props && n.props.onVnodeUnmounted;
        t && b(t, a.parent, n), a.isDeactivated = !0;
      }, u);
    };
    function F(n) {
      m(n), A(n, l, u, !0);
    }
    let _ = !1, C = !1;
    const P = () => {
      _ && (C ? o[o.length - 1] = h(l.subTree) : c.action != i.replaceName ? o.push(h(l.subTree)) : o[o.length - 1] = h(l.subTree));
    };
    return w(P), D(P), H(() => {
      for (const n of o)
        F(n);
    }), () => {
      if (_ = !1, C = !1, !s.default)
        return null;
      const n = s.default(), a = n[0];
      if (n.length > 1)
        return n;
      if (!K(a) || !(a.shapeFlag & f.STATEFUL_COMPONENT) && !(a.shapeFlag & f.SUSPENSE))
        return a;
      let t = h(a);
      if (t.el && (t = y(t), a.shapeFlag & f.SUSPENSE && (a.ssContent = t)), _ = !0, c.action === i.backName) {
        r("back");
        const O = -c.n, d = o[o.length - O - 1];
        if (!d || d.key != a.key)
          return m(o[o.length - O]), o[o.length - O] = null, o.splice(o.length - O), t.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, L(a.type) ? a : t;
        t.el = d.el, t.component = d.component, t.transition && j(t, t.transition), t.shapeFlag |= f.COMPONENT_KEPT_ALIVE;
        for (let p = o.length - O; p < o.length; p++)
          m(o[p]), o[p] = null;
        o.splice(o.length - O), C = !0;
      } else
        r("forward");
      return t.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, L(a.type) ? a : t;
    };
  }
}), z = (e) => {
  const s = e.push.bind(e), r = e.go.bind(e), l = e.replace.bind(e), E = e.back.bind(e), u = e.forward.bind(e);
  e.push = (N) => (c.action = i.pushName, s(N)), e.go = (N) => {
    N > 0 && (c.action = i.forwardName), N < 0 && (c.action = i.backName), c.n = N, r(N);
  }, e.replace = (N) => (c.action = i.replaceName, l(N)), e.back = () => {
    c.action = i.backName, c.n = -1, E();
  }, e.forward = () => {
    c.action = i.forwardName, u();
  };
}, B = {
  install(e, { router: s, backCallback: r, forwardCallback: l } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!s)
      throw Error("router is required");
    let E = null;
    s.options.history.listen((u, N, T) => {
      E = T;
    }), s.beforeEach(() => {
      E && (E.direction === "back" && r ? r(E.delta) : E.direction === "forward" && l && l(E.delta), E = null);
    });
  }
}, X = (e) => {
  c.n = e, c.action = i.backName;
}, Y = (e) => {
  c.n = e, c.action = i.forwardName;
}, W = {
  install(e, { router: s }) {
    if (!s)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(i.componentName, q), e.use(B, { router: s, backCallback: X, forwardCallback: Y }), z(s);
  }
};
export {
  q as VuePageStack,
  W as VuePageStackPlugin
};
