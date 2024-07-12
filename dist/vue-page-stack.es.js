import { defineComponent as F, getCurrentInstance as R, queuePostFlushCb as S, onMounted as U, onUpdated as D, onBeforeUnmount as H, isVNode as K, cloneVNode as y, callWithAsyncErrorHandling as v, ErrorCodes as x, setTransitionHooks as j } from "vue";
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
const b = (e, s) => {
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
function k(e, s, r, l) {
  v(e, s, x.VNODE_HOOK, [r, l]);
}
const L = (e) => e.__isSuspense, V = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function g(e) {
  e.shapeFlag &= ~f.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~f.COMPONENT_KEPT_ALIVE;
}
function h(e) {
  return e.shapeFlag & f.SUSPENSE ? e.ssContent : e;
}
const o = [], q = F({
  name: i.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: s, emit: r }) {
    const l = R(), E = l.ctx, u = l.suspense, {
      renderer: {
        p,
        m: d,
        um: A,
        o: { createElement: M }
      }
    } = E, I = M("div");
    E.activate = (n, t, a, O, T) => {
      const N = n.component;
      d(n, t, a, V.ENTER, u), p(N.vnode, n, t, a, N, u, O, n.slotScopeIds, T), S(() => {
        N.isDeactivated = !1, N.a && b(N.a);
        const P = n.props && n.props.onVnodeMounted;
        P && k(P, N.parent, n);
      }, u);
    }, E.deactivate = (n) => {
      const t = n.component;
      d(n, I, null, V.LEAVE, u), S(() => {
        t.da && b(t.da);
        const a = n.props && n.props.onVnodeUnmounted;
        a && k(a, t.parent, n), t.isDeactivated = !0;
      }, u);
    };
    function w(n) {
      g(n), A(n, l, u, !0);
    }
    let _ = !1, C = !1;
    const m = () => {
      _ && (C ? o[o.length - 1] = h(l.subTree) : c.action != i.replaceName ? o.push(h(l.subTree)) : o[o.length - 1] = h(l.subTree));
    };
    return U(m), D(m), H(() => {
      for (const n of o)
        w(n);
    }), () => {
      if (_ = !1, C = !1, !s.default)
        return null;
      const n = s.default(), t = n[0];
      if (n.length > 1)
        return n;
      if (!K(t) || !(t.shapeFlag & f.STATEFUL_COMPONENT) && !(t.shapeFlag & f.SUSPENSE))
        return t;
      let a = h(t);
      if (a.el && (a = y(a), t.shapeFlag & f.SUSPENSE && (t.ssContent = a)), _ = !0, c.action === i.backName) {
        r("back");
        const O = -c.n, T = o[o.length - O - 1];
        if (!T || T.key != t.key)
          return g(o[o.length - O]), o[o.length - O] = null, o.splice(o.length - O), a.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, L(t.type) ? t : a;
        a.el = T.el, a.component = T.component, a.transition && j(a, a.transition), a.shapeFlag |= f.COMPONENT_KEPT_ALIVE;
        for (let N = o.length - O; N < o.length; N++)
          g(o[N]), o[N] = null;
        o.splice(o.length - O), C = !0;
      } else
        r("forward");
      return a.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, L(t.type) ? t : a;
    };
  }
}), z = (e) => {
  const s = e.push.bind(e), r = e.go.bind(e), l = e.replace.bind(e), E = e.back.bind(e), u = e.forward.bind(e);
  e.push = (p) => (c.action = i.pushName, s(p)), e.go = (p) => {
    c.action = i.goName, p < 0 && (c.action = i.backName, c.n = p), r(p);
  }, e.replace = (p) => (c.action = i.replaceName, l(p)), e.back = () => {
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
    s.options.history.listen((u, p, d) => {
      E = d;
    }), s.beforeEach(() => {
      E && (E.direction === "back" && r ? r() : E.direction === "forward" && l && l(), E = null);
    });
  }
}, X = () => {
  c.n = -1, c.action = i.backName, console.log("browser back");
}, Y = () => {
  c.action = i.forwardName, console.log("browser forward");
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
