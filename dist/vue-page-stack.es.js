import { defineComponent as M, getCurrentInstance as S, queuePostFlushCb as y, onMounted as w, onUpdated as K, onBeforeUnmount as v, isVNode as x, cloneVNode as W, callWithAsyncErrorHandling as B, setTransitionHooks as q } from "vue";
import "vue-router";
const s = {
  componentName: "VuePageStack",
  keyName: "stack-key",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
}, p = {
  action: s.pushName
};
let C;
const G = new Uint8Array(16);
function X() {
  if (!C && (C = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !C))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return C(G);
}
const i = [];
for (let n = 0; n < 256; ++n)
  i.push((n + 256).toString(16).slice(1));
function Y(n, e = 0) {
  return i[n[e + 0]] + i[n[e + 1]] + i[n[e + 2]] + i[n[e + 3]] + "-" + i[n[e + 4]] + i[n[e + 5]] + "-" + i[n[e + 6]] + i[n[e + 7]] + "-" + i[n[e + 8]] + i[n[e + 9]] + "-" + i[n[e + 10]] + i[n[e + 11]] + i[n[e + 12]] + i[n[e + 13]] + i[n[e + 14]] + i[n[e + 15]];
}
const j = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), b = {
  randomUUID: j
};
function z(n, e, c) {
  if (b.randomUUID && !e && !n)
    return b.randomUUID();
  n = n || {};
  const o = n.random || (n.rng || X)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, e) {
    c = c || 0;
    for (let E = 0; E < 16; ++E)
      e[c + E] = o[E];
    return e;
  }
  return Y(o);
}
var N;
(function(n) {
  n[n.ELEMENT = 1] = "ELEMENT", n[n.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", n[n.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", n[n.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", n[n.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", n[n.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", n[n.TELEPORT = 64] = "TELEPORT", n[n.SUSPENSE = 128] = "SUSPENSE", n[n.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", n[n.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE", n[n.COMPONENT = 6] = "COMPONENT";
})(N || (N = {}));
const V = (n, e) => {
  for (let c = 0; c < n.length; c++)
    n[c](e);
};
function R(n, e, c, o) {
  B(n, e, Q.VNODE_HOOK, [c, o]);
}
const J = (n) => n.__isSuspense, I = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
}, Q = {
  SETUP_FUNCTION: 0,
  RENDER_FUNCTION: 1,
  WATCH_GETTER: 2,
  WATCH_CALLBACK: 3,
  WATCH_CLEANUP: 4,
  NATIVE_EVENT_HANDLER: 5,
  COMPONENT_EVENT_HANDLER: 6,
  VNODE_HOOK: 7
};
function g(n) {
  n.shapeFlag &= ~N.COMPONENT_SHOULD_KEEP_ALIVE, n.shapeFlag &= ~N.COMPONENT_KEPT_ALIVE;
}
function k(n) {
  return n.shapeFlag & N.SUSPENSE ? n.ssContent : n;
}
const T = [], Z = (n) => M({
  name: s.componentName,
  __isKeepAlive: !0,
  setup(e, { slots: c }) {
    const o = S(), E = o.ctx, u = o.suspense, {
      renderer: {
        p: d,
        m,
        um: D,
        o: { createElement: H }
      }
    } = E, f = H("div");
    E.activate = (t, r, a, P, O) => {
      const l = t.component;
      m(t, r, a, I.ENTER, u), d(l.vnode, t, r, a, l, u, P, t.slotScopeIds, O), y(() => {
        l.isDeactivated = !1, l.a && V(l.a);
        const U = t.props && t.props.onVnodeMounted;
        U && R(U, l.parent, t);
      }, u);
    }, E.deactivate = (t) => {
      const r = t.component;
      m(t, f, null, I.LEAVE, u), y(() => {
        r.da && V(r.da);
        const a = t.props && t.props.onVnodeUnmounted;
        a && R(a, r.parent, t), r.isDeactivated = !0;
      }, u);
    };
    function h(t) {
      g(t), D(t, o, u, !0);
    }
    let L = null, _ = !1;
    const A = () => {
      L && (_ ? T[T.length - 1].vnode = k(o.subTree) : (console.log("cacheSubtree and push"), T.push({ vnode: k(o.subTree) }), console.log(T)));
    };
    return w(A), K(A), v(() => {
      for (const t of T)
        h(t.vnode);
    }), () => {
      if (_ = !1, !c.default)
        return null;
      const t = c.default(), r = t[0];
      if (t.length > 1)
        return t;
      if (!x(r) || !(r.shapeFlag & N.STATEFUL_COMPONENT) && !(r.shapeFlag & N.SUSPENSE))
        return r;
      let a = k(r);
      console.log("vnode.key", a.key);
      const P = z();
      if (a.el && (a = W(a), r.shapeFlag & N.SUSPENSE && (r.ssContent = a)), L = P, p.action === s.backName) {
        console.log("back");
        let O = T.pop();
        const l = T[T.length - 1].vnode;
        a.el = l.el, a.component = l.component, a.transition && q(a, a.transition), a.shapeFlag |= N.COMPONENT_KEPT_ALIVE, g(O.vnode), O = null, _ = !0;
      }
      return a.shapeFlag |= N.COMPONENT_SHOULD_KEEP_ALIVE, J(r.type) ? r : a;
    };
  }
}), $ = (n) => {
  const e = n.push.bind(n), c = n.go.bind(n), o = n.replace.bind(n), E = n.back.bind(n), u = n.forward.bind(n);
  n.push = (d) => (p.action = s.pushName, e(d)), n.go = (d) => {
    p.action = s.goName, c(d);
  }, n.replace = (d) => (p.action = s.replaceName, o(d)), n.back = () => {
    p.action = s.backName, E();
  }, n.forward = () => {
    p.action = s.forwardName, u();
  };
}, F = {
  install(n, { router: e, backCallback: c, forwardCallback: o } = {
    router: null,
    backCallback: null,
    forwardCallback: null
  }) {
    if (!e)
      throw Error("router is required");
    let E = null;
    e.options.history.listen((u, d, m) => {
      E = m;
    }), e.beforeEach(() => {
      E && (E.direction === "back" && c ? c() : E.direction === "forward" && o && o(), E = null);
    });
  }
}, nn = () => {
  p.action = s.backName;
}, on = {
  install(n, { router: e, name: c = s.componentName, keyName: o = s.keyName }) {
    if (!e)
      throw Error(`
 vue-router is necessary. 

`);
    n.component(c, Z()), n.use(F, { router: e, backCallback: nn }), $(e);
  }
};
export {
  on as default
};
