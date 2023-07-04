import { defineComponent as S, getCurrentInstance as b, queuePostFlushCb as R, onMounted as K, onUpdated as g, onBeforeUnmount as v, isVNode as w, cloneVNode as q, setTransitionHooks as B, callWithAsyncErrorHandling as W } from "vue";
import { useRoute as G } from "vue-router";
const E = {
  componentName: "VuePageStack",
  keyName: "stack-key",
  pushName: "push",
  goName: "go",
  replaceName: "replace",
  backName: "back",
  forwardName: "forward"
};
var p;
(function(e) {
  e[e.ELEMENT = 1] = "ELEMENT", e[e.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", e[e.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", e[e.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", e[e.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", e[e.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", e[e.TELEPORT = 64] = "TELEPORT", e[e.SUSPENSE = 128] = "SUSPENSE", e[e.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", e[e.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE", e[e.COMPONENT = 6] = "COMPONENT";
})(p || (p = {}));
const V = (e, n) => {
  for (let r = 0; r < e.length; r++)
    e[r](n);
};
function h(e, n, r, o) {
  W(e, n, Y.VNODE_HOOK, [r, o]);
}
const X = (e) => e.__isSuspense, I = {
  ENTER: 0,
  LEAVE: 1,
  REORDER: 2
}, Y = {
  SETUP_FUNCTION: 0,
  RENDER_FUNCTION: 1,
  WATCH_GETTER: 2,
  WATCH_CALLBACK: 3,
  WATCH_CLEANUP: 4,
  NATIVE_EVENT_HANDLER: 5,
  COMPONENT_EVENT_HANDLER: 6,
  VNODE_HOOK: 7
};
function H(e) {
  e.shapeFlag &= ~p.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~p.COMPONENT_KEPT_ALIVE;
}
function P(e) {
  return e.shapeFlag & p.SUSPENSE ? e.ssContent : e;
}
const N = [], U = (e) => {
  for (let n = 0; n < N.length; n++)
    if (N[n].key === e)
      return n;
  return -1;
}, j = (e) => S({
  name: E.componentName,
  __isKeepAlive: !0,
  setup(n, { slots: r }) {
    const o = b(), c = o.ctx, u = o.suspense, {
      renderer: {
        p: T,
        m: L,
        um: x,
        o: { createElement: k }
      }
    } = c, y = k("div");
    c.activate = (t, O, l, a, s) => {
      const i = t.component;
      L(t, O, l, I.ENTER, u), T(i.vnode, t, O, l, i, u, a, t.slotScopeIds, s), R(() => {
        i.isDeactivated = !1, i.a && V(i.a);
        const _ = t.props && t.props.onVnodeMounted;
        _ && h(_, i.parent, t);
      }, u);
    }, c.deactivate = (t) => {
      const O = t.component;
      L(t, y, null, I.LEAVE, u), R(() => {
        O.da && V(O.da);
        const l = t.props && t.props.onVnodeUnmounted;
        l && h(l, O.parent, t), O.isDeactivated = !0;
      }, u);
    };
    function D(t) {
      H(t), x(t, o, u, !0);
    }
    let f = null, C = !1;
    const A = () => {
      f != null && (C ? N[N.length - 1].vnode = P(o.subTree) : N.push({ key: f, vnode: P(o.subTree) }));
    };
    return K(A), g(A), v(() => {
      for (const t of N)
        D(t.vnode);
    }), () => {
      f = null, C = !1;
      const O = G().query[e];
      if (!r.default)
        return null;
      const l = r.default(), a = l[0];
      if (l.length > 1)
        return l;
      if (!w(a) || !(a.shapeFlag & p.STATEFUL_COMPONENT) && !(a.shapeFlag & p.SUSPENSE))
        return a;
      let s = P(a);
      s.el && (s = q(s), a.shapeFlag & p.SUSPENSE && (a.ssContent = s)), f = O;
      let i = U(O);
      if (i !== -1) {
        const _ = N[i].vnode;
        s.el = _.el, s.component = _.component, s.transition && B(s, s.transition), s.shapeFlag |= p.COMPONENT_KEPT_ALIVE;
        for (let m = i + 1; m < N.length; m++)
          H(N[m].vnode), N[m] = null;
        N.splice(i + 1), C = !0;
      }
      return s.shapeFlag |= p.COMPONENT_SHOULD_KEEP_ALIVE, X(a.type) ? a : s;
    };
  }
}), d = {
  action: E.pushName
}, z = (e) => {
  const n = e.push.bind(e), r = e.go.bind(e), o = e.replace.bind(e), c = e.back.bind(e), u = e.forward.bind(e);
  e.push = (T) => (d.action = E.pushName, n(T)), e.go = (T) => {
    d.action = E.goName, r(T);
  }, e.replace = (T) => (d.action = E.replaceName, o(T)), e.back = () => {
    d.action = E.backName, c();
  }, e.forward = () => {
    d.action = E.forwardName, u();
  };
};
function M(e, n) {
  return !!e[n];
}
function J(e) {
  return e.replace(/[xy]/g, (n) => {
    const r = Math.random() * 16 | 0;
    return (n === "x" ? r : r & 3 | 8).toString(16);
  });
}
const $ = {
  install(e, { router: n, name: r = E.componentName, keyName: o = E.keyName }) {
    if (!n)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(r, j(o)), z(n), n.beforeEach((c, u) => {
      if (M(c.query, o))
        U(c.query[o]) === -1 ? c.params[o + "-dir"] = E.forwardName : c.params[o + "-dir"] = E.backName;
      else {
        c.query[o] = J("xxxxxxxx");
        const T = d.action === E.replaceName || !M(u.query, o);
        return {
          hash: c.hash,
          path: c.path,
          name: c.name,
          params: c.params,
          query: c.query,
          meta: c.meta,
          replace: T
        };
      }
    });
  }
};
export {
  $ as default
};
//# sourceMappingURL=vue-page-stack.es.js.map
