var VuePageStack=function(g,E){"use strict";const r={componentName:"VuePageStack",pushName:"push",goName:"go",replaceName:"replace",backName:"back",forwardName:"forward"},s={action:r.pushName,n:1};/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/process.env.NODE_ENV!=="production"&&Object.freeze({}),process.env.NODE_ENV!=="production"&&Object.freeze([]);const b=(e,c)=>{for(let l=0;l<e.length;l++)e[l](c)},f={ELEMENT:1,1:"ELEMENT",FUNCTIONAL_COMPONENT:2,2:"FUNCTIONAL_COMPONENT",STATEFUL_COMPONENT:4,4:"STATEFUL_COMPONENT",TEXT_CHILDREN:8,8:"TEXT_CHILDREN",ARRAY_CHILDREN:16,16:"ARRAY_CHILDREN",SLOTS_CHILDREN:32,32:"SLOTS_CHILDREN",TELEPORT:64,64:"TELEPORT",SUSPENSE:128,128:"SUSPENSE",COMPONENT_SHOULD_KEEP_ALIVE:256,256:"COMPONENT_SHOULD_KEEP_ALIVE",COMPONENT_KEPT_ALIVE:512,512:"COMPONENT_KEPT_ALIVE",COMPONENT:6,6:"COMPONENT"};function k(e,c,l,i){E.callWithAsyncErrorHandling(e,c,E.ErrorCodes.VNODE_HOOK,[l,i])}const m=e=>e.__isSuspense,L={ENTER:0,LEAVE:1,REORDER:2};function S(e){e.shapeFlag&=~f.COMPONENT_SHOULD_KEEP_ALIVE,e.shapeFlag&=~f.COMPONENT_KEPT_ALIVE}function h(e){return e.shapeFlag&f.SUSPENSE?e.ssContent:e}const a=[],V=E.defineComponent({name:r.componentName,__isKeepAlive:!0,emits:["back","forward"],setup(e,{slots:c,emit:l}){const i=E.getCurrentInstance(),N=i.ctx,O=i.suspense,{renderer:{p:u,m:P,um:D,o:{createElement:H}}}=N,y=H("div");N.activate=(n,t,o,T,d)=>{const p=n.component;P(n,t,o,L.ENTER,O),u(p.vnode,n,t,o,p,O,T,n.slotScopeIds,d),E.queuePostFlushCb(()=>{p.isDeactivated=!1,p.a&&b(p.a);const M=n.props&&n.props.onVnodeMounted;M&&k(M,p.parent,n)},O)},N.deactivate=n=>{const t=n.component;P(n,y,null,L.LEAVE,O),E.queuePostFlushCb(()=>{t.da&&b(t.da);const o=n.props&&n.props.onVnodeUnmounted;o&&k(o,t.parent,n),t.isDeactivated=!0},O)};function K(n){S(n),D(n,i,O,!0)}let _=!1,C=!1;const A=()=>{_&&(C?a[a.length-1]=h(i.subTree):s.action!=r.replaceName?a.push(h(i.subTree)):a[a.length-1]=h(i.subTree))};return E.onMounted(A),E.onUpdated(A),E.onBeforeUnmount(()=>{for(const n of a)K(n)}),()=>{if(_=!1,C=!1,!c.default)return null;const n=c.default(),t=n[0];if(n.length>1)return n;if(!E.isVNode(t)||!(t.shapeFlag&f.STATEFUL_COMPONENT)&&!(t.shapeFlag&f.SUSPENSE))return t;let o=h(t);if(o.el&&(o=E.cloneVNode(o),t.shapeFlag&f.SUSPENSE&&(t.ssContent=o)),_=!0,s.action===r.backName){l("back");const T=-s.n,d=a[a.length-T-1];if(!d||d.key!=t.key)return S(a[a.length-T]),a[a.length-T]=null,a.splice(a.length-T),o.shapeFlag|=f.COMPONENT_SHOULD_KEEP_ALIVE,m(t.type)?t:o;o.el=d.el,o.component=d.component,o.transition&&E.setTransitionHooks(o,o.transition),o.shapeFlag|=f.COMPONENT_KEPT_ALIVE;for(let p=a.length-T;p<a.length;p++)S(a[p]),a[p]=null;a.splice(a.length-T),C=!0}else l("forward");return o.shapeFlag|=f.COMPONENT_SHOULD_KEEP_ALIVE,m(t.type)?t:o}}}),F=e=>{const c=e.push.bind(e),l=e.go.bind(e),i=e.replace.bind(e),N=e.back.bind(e),O=e.forward.bind(e);e.push=u=>(s.action=r.pushName,c(u)),e.go=u=>{s.action=r.goName,u<0&&(s.action=r.backName,s.n=u),l(u)},e.replace=u=>(s.action=r.replaceName,i(u)),e.back=()=>{s.action=r.backName,s.n=-1,N()},e.forward=()=>{s.action=r.forwardName,O()}},I={install(e,{router:c,backCallback:l,forwardCallback:i}={router:null,backCallback:null,forwardCallback:null}){if(!c)throw Error("router is required");let N=null;c.options.history.listen((O,u,P)=>{N=P}),c.beforeEach(()=>{N&&(N.direction==="back"&&l?l():N.direction==="forward"&&i&&i(),N=null)})}},w=()=>{s.n=-1,s.action=r.backName,console.log("browser back")},R=()=>{s.action=r.forwardName,console.log("browser forward")},U={install(e,{router:c}){if(!c)throw Error(`
 vue-router is necessary. 

`);e.component(r.componentName,V),e.use(I,{router:c,backCallback:w,forwardCallback:R}),F(c)}};return g.VuePageStack=V,g.VuePageStackPlugin=U,Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),g}({},Vue);
