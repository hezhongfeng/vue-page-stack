import { defineComponent as I, getCurrentInstance as R, queuePostFlushCb as k, onMounted as F, onUpdated as U, onBeforeUnmount as D, isVNode as H, cloneVNode as K, callWithAsyncErrorHandling as y, ErrorCodes as v, setTransitionHooks as x } from "vue";
const r = {
  componentName: "VuePageStack",
  keyName: "stack-key",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, s = {
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
const S = (e, t) => {
  for (let c = 0; c < e.length; c++)
    e[c](t);
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
function b(e, t, c, l) {
  y(e, t, v.VNODE_HOOK, [c, l]);
}
const j = (e) => e.__isSuspense, P = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function L(e) {
  e.shapeFlag &= ~f.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~f.COMPONENT_KEPT_ALIVE;
}
function C(e) {
  return e.shapeFlag & f.SUSPENSE ? e.ssContent : e;
}
const i = [], q = I({
  name: r.componentName,
  __isKeepAlive: !0,
  emits: ["back", "forward"],
  setup(e, { slots: t, emit: c }) {
    const l = R(), E = l.ctx, u = l.suspense, {
      renderer: {
        p,
        m: d,
        um: V,
        o: { createElement: A }
      }
    } = E, w = A("div");
    E.activate = (n, a, o, O, T) => {
      const N = n.component;
      d(n, a, o, P.ENTER, u), p(N.vnode, n, a, o, N, u, O, n.slotScopeIds, T), k(() => {
        N.isDeactivated = !1, N.a && S(N.a);
        const g = n.props && n.props.onVnodeMounted;
        g && b(g, N.parent, n);
      }, u);
    }, E.deactivate = (n) => {
      const a = n.component;
      d(n, w, null, P.LEAVE, u), k(() => {
        a.da && S(a.da);
        const o = n.props && n.props.onVnodeUnmounted;
        o && b(o, a.parent, n), a.isDeactivated = !0;
      }, u);
    };
    function M(n) {
      L(n), V(n, l, u, !0);
    }
    let h = !1, m = !1;
    const _ = () => {
      h && (m ? i[i.length - 1] = C(l.subTree) : s.action != r.replaceName && i.push(C(l.subTree)));
    };
    return F(_), U(_), D(() => {
      for (const n of i)
        M(n);
    }), () => {
      if (h = !1, m = !1, !t.default)
        return null;
      const n = t.default(), a = n[0];
      if (n.length > 1)
        return n;
      if (!H(a) || !(a.shapeFlag & f.STATEFUL_COMPONENT) && !(a.shapeFlag & f.SUSPENSE))
        return a;
      let o = C(a);
      if (o.el && (o = K(o), a.shapeFlag & f.SUSPENSE && (a.ssContent = o)), h = !0, s.action === r.backName) {
        c("back");
        const O = -s.n, T = i[i.length - O - 1];
        o.el = T.el, o.component = T.component, o.transition && x(o, o.transition), o.shapeFlag |= f.COMPONENT_KEPT_ALIVE;
        for (let N = i.length - O; N < i.length; N++)
          L(i[N]), i[N] = null;
        i.splice(i.length - O), m = !0;
      } else
        c("forward");
      return o.shapeFlag |= f.COMPONENT_SHOULD_KEEP_ALIVE, j(a.type) ? a : o;
    };
  }
}), z = (e) => {
  const t = e.push.bind(e), c = e.go.bind(e), l = e.replace.bind(e), E = e.back.bind(e), u = e.forward.bind(e);
  e.push = (p) => (console.log("push"), s.action = r.pushName, t(p)), e.go = (p) => {
    s.action = r.goName, p < 0 && (s.action = r.backName, s.n = p), c(p);
  }, e.replace = (p) => (s.action = r.replaceName, l(p)), e.back = () => {
    console.log("back"), s.action = r.backName, s.n = -1, E();
  }, e.forward = () => {
    console.log("forward"), s.action = r.forwardName, u();
  };
}, B = {
  install(e, { router: t, backCallback: c, forwardCallback: l } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!t)
      throw Error("router is required");
    let E = null;
    t.options.history.listen((u, p, d) => {
      E = d;
    }), t.beforeEach(() => {
      E && (E.direction === "back" && c ? c() : E.direction === "forward" && l && l(), E = null);
    });
  }
}, X = () => {
  s.n = -1, s.action = r.backName, console.log("browser back");
}, Y = () => {
  s.action = r.forwardName, console.log("browser forward");
}, W = {
  install(e, { router: t, name: c = r.componentName }) {
    if (!t)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(c, q), e.use(B, { router: t, backCallback: X, forwardCallback: Y }), z(t);
  }
};
export {
  q as VuePageStack,
  W as VuePageStackPlugin
};
