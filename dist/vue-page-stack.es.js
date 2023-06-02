import { defineComponent as y, getCurrentInstance as D, queuePostFlushCb as R, onMounted as S, onUpdated as b, onBeforeUnmount as K, isVNode as w, cloneVNode as v, setTransitionHooks as q, callWithAsyncErrorHandling as B } from "vue";
import { useRoute as W } from "vue-router";
const a = {
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
  B(e, n, X.VNODE_HOOK, [r, o]);
}
const G = (e) => e.__isSuspense, I = {
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
  e.shapeFlag &= ~p.COMPONENT_SHOULD_KEEP_ALIVE, e.shapeFlag &= ~p.COMPONENT_KEPT_ALIVE;
}
function P(e) {
  return e.shapeFlag & p.SUSPENSE ? e.ssContent : e;
}
const T = [], M = (e) => {
  for (let n = 0; n < T.length; n++)
    if (T[n].key === e)
      return n;
  return -1;
}, j = (e) => y({
  name: a.componentName,
  __isKeepAlive: !0,
  setup(n, { slots: r }) {
    const o = D(), c = o.ctx, N = o.suspense, {
      renderer: {
        p: u,
        m: L,
        um: U,
        o: { createElement: g }
      }
    } = c, k = g("div");
    c.activate = (t, l, O, E, s) => {
      const i = t.component;
      L(t, l, O, I.ENTER, N), u(i.vnode, t, l, O, i, N, E, t.slotScopeIds, s), R(() => {
        i.isDeactivated = !1, i.a && V(i.a);
        const f = t.props && t.props.onVnodeMounted;
        f && h(f, i.parent, t);
      }, N);
    }, c.deactivate = (t) => {
      const l = t.component;
      L(t, k, null, I.LEAVE, N), R(() => {
        l.da && V(l.da);
        const O = t.props && t.props.onVnodeUnmounted;
        O && h(O, l.parent, t), l.isDeactivated = !0;
      }, N);
    };
    function x(t) {
      Y(t), U(t, o, N, !0);
    }
    let _ = null, m = !1;
    const A = () => {
      _ != null && (m ? T[T.length - 1].vnode = P(o.subTree) : T.push({ key: _, vnode: P(o.subTree) }));
    };
    return S(A), b(A), K(() => {
      for (const t of T)
        x(t.vnode);
    }), () => {
      _ = null, m = !1;
      const l = W().query[e];
      if (!r.default)
        return null;
      const O = r.default(), E = O[0];
      if (O.length > 1)
        return O;
      if (!w(E) || !(E.shapeFlag & p.STATEFUL_COMPONENT) && !(E.shapeFlag & p.SUSPENSE))
        return E;
      let s = P(E);
      s.el && (s = v(s), E.shapeFlag & p.SUSPENSE && (E.ssContent = s)), _ = l;
      let i = M(l);
      if (i !== -1) {
        const f = T[i].vnode;
        s.el = f.el, s.component = f.component, s.transition && q(s, s.transition), s.shapeFlag |= p.COMPONENT_KEPT_ALIVE;
        for (let C = i + 1; C < T.length; C++)
          T[C] = null;
        T.splice(i + 1), m = !0;
      }
      return s.shapeFlag |= p.COMPONENT_SHOULD_KEEP_ALIVE, G(E.type) ? E : s;
    };
  }
}), d = {
  action: a.pushName
}, z = (e) => {
  const n = e.push.bind(e), r = e.go.bind(e), o = e.replace.bind(e), c = e.back.bind(e), N = e.forward.bind(e);
  e.push = (u) => (d.action = a.pushName, console.log("push"), n(u)), e.go = (u) => {
    d.action = a.goName, console.log("go"), r(u);
  }, e.replace = (u) => (d.action = a.replaceName, console.log("replace"), o(u)), e.back = () => {
    d.action = a.backName, console.log("back"), c();
  }, e.forward = () => {
    d.action = a.forwardName, console.log("forward"), N();
  };
};
function H(e, n) {
  return !!e[n];
}
function J(e) {
  return e.replace(/[xy]/g, (n) => {
    const r = Math.random() * 16 | 0;
    return (n === "x" ? r : r & 3 | 8).toString(16);
  });
}
const $ = {
  install(e, { router: n, name: r = a.componentName, keyName: o = a.keyName }) {
    if (!n)
      throw Error(`
 vue-router is necessary. 

`);
    e.component(r, j(o)), z(n), n.beforeEach((c, N) => {
      if (H(c.query, o))
        M(c.query[o]) === -1 ? c.params[o + "-dir"] = a.forwardName : c.params[o + "-dir"] = a.backName;
      else {
        c.query[o] = J("xxxxxxxx");
        const u = d.action === a.replaceName || !H(N.query, o);
        return {
          hash: c.hash,
          path: c.path,
          name: c.name,
          params: c.params,
          query: c.query,
          meta: c.meta,
          replace: u
        };
      }
    });
  }
};
export {
  $ as default
};
//# sourceMappingURL=vue-page-stack.es.js.map
