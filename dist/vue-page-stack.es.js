import { defineComponent as D, getCurrentInstance as M, queuePostFlushCb as b, onMounted as F, onUpdated as H, onBeforeUnmount as w, isVNode as v, cloneVNode as K, callWithAsyncErrorHandling as x, ErrorCodes as j, setTransitionHooks as q } from "vue";
const l = {
  componentName: "VuePageStack",
  keyName: "stack-key",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, d = {
  action: l.pushName
};
let T;
const z = new Uint8Array(16);
function B() {
  if (!T && (T = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !T))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return T(z);
}
const i = [];
for (let e = 0; e < 256; ++e)
  i.push((e + 256).toString(16).slice(1));
function X(e, n = 0) {
  return i[e[n + 0]] + i[e[n + 1]] + i[e[n + 2]] + i[e[n + 3]] + "-" + i[e[n + 4]] + i[e[n + 5]] + "-" + i[e[n + 6]] + i[e[n + 7]] + "-" + i[e[n + 8]] + i[e[n + 9]] + "-" + i[e[n + 10]] + i[e[n + 11]] + i[e[n + 12]] + i[e[n + 13]] + i[e[n + 14]] + i[e[n + 15]];
}
const Y = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), L = {
  randomUUID: Y
};
function G(e, n, t) {
  if (L.randomUUID && !n && !e)
    return L.randomUUID();
  e = e || {};
  const s = e.random || (e.rng || B)();
  if (s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, n) {
    t = t || 0;
    for (let a = 0; a < 16; ++a)
      n[t + a] = s[a];
    return n;
  }
  return X(s);
}
/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const U = (e, n) => {
  for (let t = 0; t < e.length; t++)
    e[t](n);
}, N = {
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
function y(e, n, t, s) {
  x(e, n, j.VNODE_HOOK, [t, s]);
}
const W = (e) => e.__isSuspense, V = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
};
function I(e) {
  e.shapeFlag &= ~N.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~N.COMPONENT_KEPT_ALIVE;
}
function _(e) {
  return e.shapeFlag & N.SUSPENSE ? e.ssContent : e;
}
const p = [], J = () => D({
  name: l.componentName,
  __isKeepAlive: !0,
  setup(e, { slots: n }) {
    const t = M(), s = t.ctx, a = t.suspense, {
      renderer: {
        p: m,
        m: E,
        um: g,
        o: { createElement: f }
      }
    } = s, A = f("div");
    s.activate = (o, r, c, S, O) => {
      const u = o.component;
      E(o, r, c, V.ENTER, a), m(u.vnode, o, r, c, u, a, S, o.slotScopeIds, O), b(() => {
        u.isDeactivated = !1, u.a && U(u.a);
        const k = o.props && o.props.onVnodeMounted;
        k && y(k, u.parent, o);
      }, a);
    }, s.deactivate = (o) => {
      const r = o.component;
      E(o, A, null, V.LEAVE, a), b(() => {
        r.da && U(r.da);
        const c = o.props && o.props.onVnodeUnmounted;
        c && y(c, r.parent, o), r.isDeactivated = !0;
      }, a);
    };
    function R(o) {
      I(o), g(o, t, a, !0);
    }
    let C = null, h = !1;
    const P = () => {
      C && (h ? p[p.length - 1].vnode = _(t.subTree) : (console.log("cacheSubtree and push"), p.push({ vnode: _(t.subTree) }), console.log(p)));
    };
    return F(P), H(P), w(() => {
      for (const o of p)
        R(o.vnode);
    }), () => {
      if (h = !1, !n.default)
        return null;
      const o = n.default(), r = o[0];
      if (o.length > 1)
        return o;
      if (!v(r) || !(r.shapeFlag & N.STATEFUL_COMPONENT) && !(r.shapeFlag & N.SUSPENSE))
        return r;
      let c = _(r);
      console.log("vnode.key", c.key);
      const S = G();
      if (c.el && (c = K(c), r.shapeFlag & N.SUSPENSE && (r.ssContent = c)), C = S, d.action === l.backName) {
        console.log("back");
        let O = p.pop();
        const u = p[p.length - 1].vnode;
        c.el = u.el, c.component = u.component, c.transition && q(c, c.transition), c.shapeFlag |= N.COMPONENT_KEPT_ALIVE, I(O.vnode), O = null, h = !0;
      }
      return c.shapeFlag |= N.COMPONENT_SHOULD_KEEP_ALIVE, W(r.type) ? r : c;
    };
  }
}), Q = (e) => {
  const n = e.push.bind(e), t = e.go.bind(e), s = e.replace.bind(e), a = e.back.bind(e), m = e.forward.bind(e);
  e.push = (E) => (d.action = l.pushName, n(E)), e.go = (E) => {
    d.action = l.goName, t(E);
  }, e.replace = (E) => (d.action = l.replaceName, s(E)), e.back = () => {
    d.action = l.backName, a();
  }, e.forward = () => {
    d.action = l.forwardName, m();
  };
}, Z = {
  install(e, { router: n, backCallback: t, forwardCallback: s } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!n)
      throw Error("router is required");
    let a = null;
    n.options.history.listen((m, E, g) => {
      a = g;
    }), n.beforeEach(() => {
      a && (a.direction === "back" && t ? t() : a.direction === "forward" && s && s(), a = null);
    });
  }
}, $ = () => {
  d.action = l.backName;
}, ne = {
  install(e, { router: n, name: t = l.componentName }) {
    if (!n)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(t, J()), e.use(Z, { router: n, backCallback: $ }), Q(n);
  }
};
export {
  ne as default
};
