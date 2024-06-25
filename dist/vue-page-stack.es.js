import { defineComponent as I, getCurrentInstance as R, queuePostFlushCb as b, onMounted as F, onUpdated as U, onBeforeUnmount as D, isVNode as H, cloneVNode as K, callWithAsyncErrorHandling as y, ErrorCodes as v, setTransitionHooks as x } from "vue";
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
const g = (e, o) => {
  for (let r = 0; r < e.length; r++)
    e[r](o);
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
function P(e, o, r, l) {
  y(e, o, v.VNODE_HOOK, [r, l]);
}
const j = (e) => e.__isSuspense, k = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function L(e) {
  e.shapeFlag &= ~f.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~f.COMPONENT_KEPT_ALIVE;
}
function h(e) {
  return e.shapeFlag & f.SUSPENSE ? e.ssContent : e;
}
const s = [], q = I({
  name: i.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: o, emit: r }) {
    const l = R(), E = l.ctx, u = l.suspense, {
      renderer: {
        p,
        m: d,
        um: V,
        o: { createElement: A }
      }
    } = E, M = A("div");
    E.activate = (n, a, t, T, O) => {
      const N = n.component;
      d(n, a, t, k.ENTER, u), p(N.vnode, n, a, t, N, u, T, n.slotScopeIds, O), b(() => {
        N.isDeactivated = !1, N.a && g(N.a);
        const S = n.props && n.props.onVnodeMounted;
        S && P(S, N.parent, n);
      }, u);
    }, E.deactivate = (n) => {
      const a = n.component;
      d(n, M, null, k.LEAVE, u), b(() => {
        a.da && g(a.da);
        const t = n.props && n.props.onVnodeUnmounted;
        t && P(t, a.parent, n), a.isDeactivated = !0;
      }, u);
    };
    function w(n) {
      L(n), V(n, l, u, !0);
    }
    let C = !1, _ = !1;
    const m = () => {
      C && (_ ? s[s.length - 1] = h(l.subTree) : c.action != i.replaceName ? s.push(h(l.subTree)) : s[s.length - 1] = h(l.subTree));
    };
    return F(m), U(m), D(() => {
      for (const n of s)
        w(n);
    }), () => {
      if (C = !1, _ = !1, !o.default)
        return null;
      const n = o.default(), a = n[0];
      if (n.length > 1)
        return n;
      if (!H(a) || !(a.shapeFlag & f.STATEFUL_COMPONENT) && !(a.shapeFlag & f.SUSPENSE))
        return a;
      let t = h(a);
      if (t.el && (t = K(t), a.shapeFlag & f.SUSPENSE && (a.ssContent = t)), C = !0, c.action === i.backName) {
        r("back");
        const T = -c.n, O = s[s.length - T - 1];
        if (!O || O.key != a.key)
          return a;
        t.el = O.el, t.component = O.component, t.transition && x(t, t.transition), t.shapeFlag |= f.COMPONENT_KEPT_ALIVE;
        for (let N = s.length - T; N < s.length; N++)
          L(s[N]), s[N] = null;
        s.splice(s.length - T), _ = !0;
      } else
        r("forward");
      return t.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, j(a.type) ? a : t;
    };
  }
}), z = (e) => {
  const o = e.push.bind(e), r = e.go.bind(e), l = e.replace.bind(e), E = e.back.bind(e), u = e.forward.bind(e);
  e.push = (p) => (c.action = i.pushName, o(p)), e.go = (p) => {
    c.action = i.goName, p < 0 && (c.action = i.backName, c.n = p), r(p);
  }, e.replace = (p) => (c.action = i.replaceName, l(p)), e.back = () => {
    c.action = i.backName, c.n = -1, E();
  }, e.forward = () => {
    c.action = i.forwardName, u();
  };
}, B = {
  install(e, { router: o, backCallback: r, forwardCallback: l } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!o)
      throw Error("router is required");
    let E = null;
    o.options.history.listen((u, p, d) => {
      E = d;
    }), o.beforeEach(() => {
      E && (E.direction === "back" && r ? r() : E.direction === "forward" && l && l(), E = null);
    });
  }
}, X = () => {
  c.n = -1, c.action = i.backName, console.log("browser back");
}, Y = () => {
  c.action = i.forwardName, console.log("browser forward");
}, W = {
  install(e, { router: o }) {
    if (!o)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(i.componentName, q), e.use(B, { router: o, backCallback: X, forwardCallback: Y }), z(o);
  }
};
export {
  q as VuePageStack,
  W as VuePageStackPlugin
};
