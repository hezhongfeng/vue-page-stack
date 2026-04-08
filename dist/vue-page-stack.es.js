import { defineComponent as y, getCurrentInstance as M, queuePostFlushCb as _, onMounted as H, onUpdated as D, onBeforeUnmount as I, isVNode as K, cloneVNode as v, callWithAsyncErrorHandling as R, ErrorCodes as x, setTransitionHooks as j } from "vue";
const p = {
  componentName: "VuePageStack",
  pushName: "push",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, c = {
  action: p.pushName,
  n: 1
};
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const P = (e, ...s) => {
  for (let r = 0; r < e.length; r++)
    e[r](...s);
}, d = {
  STATEFUL_COMPONENT: 4,
  SUSPENSE: 128,
  COMPONENT_SHOULD_KEEP_ALIVE: 256,
  COMPONENT_KEPT_ALIVE: 512
};
function T(e, s, r, l) {
  R(e, s, x.VNODE_HOOK, [r, l]);
}
const V = (e) => e.__isSuspense, w = {
  ENTER: 0,
  LEAVE: 1
};
function S(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function g(e) {
  return e.shapeFlag & d.SUSPENSE ? e.ssContent : e;
}
const o = [], q = y({
  name: p.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: s, emit: r }) {
    const l = M(), i = l.ctx, E = l.suspense, {
      renderer: {
        p: u,
        m,
        um: F,
        o: { createElement: A }
      }
    } = i, L = A("div");
    i.activate = (n, a, t, N, h) => {
      const f = n.component;
      m(n, a, t, w.ENTER, E), u(f.vnode, n, a, t, f, E, N, n.slotScopeIds, h), _(() => {
        f.isDeactivated = !1, f.a && P(f.a);
        const O = n.props && n.props.onVnodeMounted;
        O && T(O, f.parent, n);
      }, E);
    }, i.deactivate = (n) => {
      const a = n.component;
      m(n, L, null, w.LEAVE, E), _(() => {
        a.da && P(a.da);
        const t = n.props && n.props.onVnodeUnmounted;
        t && T(t, a.parent, n), a.isDeactivated = !0;
      }, E);
    };
    function U(n) {
      S(n), F(n, l, E, !0);
    }
    let k = !1, b = !1;
    const C = () => {
      k && (b ? o[o.length - 1] = g(l.subTree) : c.action != p.replaceName ? o.push(g(l.subTree)) : o[o.length - 1] = g(l.subTree));
    };
    return H(C), D(C), I(() => {
      for (const n of o)
        U(n);
    }), () => {
      if (k = !1, b = !1, !s.default)
        return null;
      const n = s.default(), a = n[0];
      if (n.length > 1)
        return n;
      if (!K(a) || !(a.shapeFlag & d.STATEFUL_COMPONENT) && !(a.shapeFlag & d.SUSPENSE))
        return a;
      let t = g(a);
      if (t.el && (t = v(t), a.shapeFlag & d.SUSPENSE && (a.ssContent = t)), k = !0, c.action === p.backName) {
        r("back");
        const N = -c.n, h = o[o.length - N - 1];
        if (!h || h.key != a.key)
          return S(o[o.length - N]), o[o.length - N] = null, o.splice(o.length - N), t.shapeFlag |= d.COMPONENT_SHOULD_KEEP_ALIVE, V(a.type) ? a : t;
        t.el = h.el, t.component = h.component, t.transition && j(t, t.transition), t.shapeFlag |= d.COMPONENT_KEPT_ALIVE;
        for (let f = o.length - N; f < o.length; f++)
          S(o[f]), o[f] = null;
        o.splice(o.length - N), b = !0;
      } else
        r("forward");
      return t.shapeFlag |= d.COMPONENT_SHOULD_KEEP_ALIVE, V(a.type) ? a : t;
    };
  }
}), z = (e) => {
  const s = e.push.bind(e), r = e.go.bind(e), l = e.replace.bind(e), i = e.back.bind(e), E = e.forward.bind(e);
  e.push = (u) => (c.action = p.pushName, s(u)), e.go = (u) => {
    u > 0 && (c.action = p.forwardName), u < 0 && (c.action = p.backName), c.n = u, r(u);
  }, e.replace = (u) => (c.action = p.replaceName, l(u)), e.back = () => {
    c.action = p.backName, c.n = -1, i();
  }, e.forward = () => {
    c.action = p.forwardName, E();
  };
}, B = {
  install(e, { router: s, backCallback: r, forwardCallback: l } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!s)
      throw Error("router is required");
    let i = null;
    s.options.history.listen((E, u, m) => {
      i = m;
    }), s.beforeEach(() => {
      i && (i.direction === "back" && r ? r(i.delta) : i.direction === "forward" && l && l(i.delta), i = null);
    });
  }
}, G = (e) => {
  c.n = e, c.action = p.backName;
}, W = (e) => {
  c.n = e, c.action = p.forwardName;
}, Q = {
  install(e, { router: s }) {
    if (!s)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(p.componentName, q), e.use(B, { router: s, backCallback: G, forwardCallback: W }), z(s);
  }
};
export {
  q as VuePageStack,
  Q as VuePageStackPlugin
};
