"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const N=require("vue"),E={componentName:"VuePageStack",pushName:"push",goName:"go",replaceName:"replace",backName:"back",forwardName:"forward"},c={action:E.pushName,n:1};/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/process.env.NODE_ENV!=="production"&&Object.freeze({});process.env.NODE_ENV!=="production"&&Object.freeze([]);const b=(e,s)=>{for(let r=0;r<e.length;r++)e[r](s)},O={ELEMENT:1,1:"ELEMENT",FUNCTIONAL_COMPONENT:2,2:"FUNCTIONAL_COMPONENT",STATEFUL_COMPONENT:4,4:"STATEFUL_COMPONENT",TEXT_CHILDREN:8,8:"TEXT_CHILDREN",ARRAY_CHILDREN:16,16:"ARRAY_CHILDREN",SLOTS_CHILDREN:32,32:"SLOTS_CHILDREN",TELEPORT:64,64:"TELEPORT",SUSPENSE:128,128:"SUSPENSE",COMPONENT_SHOULD_KEEP_ALIVE:256,256:"COMPONENT_SHOULD_KEEP_ALIVE",COMPONENT_KEPT_ALIVE:512,512:"COMPONENT_KEPT_ALIVE",COMPONENT:6,6:"COMPONENT"};function k(e,s,r,l){N.callWithAsyncErrorHandling(e,s,N.ErrorCodes.VNODE_HOOK,[r,l])}const L=e=>e.__isSuspense,V={ENTER:0,LEAVE:1,REORDER:2};function C(e){e.shapeFlag&=~O.COMPONENT_SHOULD_KEEP_ALIVE,e.shapeFlag&=~O.COMPONENT_KEPT_ALIVE}function P(e){return e.shapeFlag&O.SUSPENSE?e.ssContent:e}const o=[],A=N.defineComponent({name:E.componentName,__isKeepAlive:!0,emits:["back","forward"],setup(e,{slots:s,emit:r}){const l=N.getCurrentInstance(),i=l.ctx,f=l.suspense,{renderer:{p:u,m:h,um:M,o:{createElement:F}}}=i,I=F("div");i.activate=(n,t,a,d,T)=>{const p=n.component;h(n,t,a,V.ENTER,f),u(p.vnode,n,t,a,p,f,d,n.slotScopeIds,T),N.queuePostFlushCb(()=>{p.isDeactivated=!1,p.a&&b(p.a);const m=n.props&&n.props.onVnodeMounted;m&&k(m,p.parent,n)},f)},i.deactivate=n=>{const t=n.component;h(n,I,null,V.LEAVE,f),N.queuePostFlushCb(()=>{t.da&&b(t.da);const a=n.props&&n.props.onVnodeUnmounted;a&&k(a,t.parent,n),t.isDeactivated=!0},f)};function R(n){C(n),M(n,l,f,!0)}let _=!1,g=!1;const S=()=>{_&&(g?o[o.length-1]=P(l.subTree):c.action!=E.replaceName?o.push(P(l.subTree)):o[o.length-1]=P(l.subTree))};return N.onMounted(S),N.onUpdated(S),N.onBeforeUnmount(()=>{for(const n of o)R(n)}),()=>{if(_=!1,g=!1,!s.default)return null;const n=s.default(),t=n[0];if(n.length>1)return n;if(!N.isVNode(t)||!(t.shapeFlag&O.STATEFUL_COMPONENT)&&!(t.shapeFlag&O.SUSPENSE))return t;let a=P(t);if(a.el&&(a=N.cloneVNode(a),t.shapeFlag&O.SUSPENSE&&(t.ssContent=a)),_=!0,c.action===E.backName){r("back");const d=-c.n,T=o[o.length-d-1];if(!T||T.key!=t.key)return C(o[o.length-d]),o[o.length-d]=null,o.splice(o.length-d),a.shapeFlag|=O.COMPONENT_SHOULD_KEEP_ALIVE,L(t.type)?t:a;a.el=T.el,a.component=T.component,a.transition&&N.setTransitionHooks(a,a.transition),a.shapeFlag|=O.COMPONENT_KEPT_ALIVE;for(let p=o.length-d;p<o.length;p++)C(o[p]),o[p]=null;o.splice(o.length-d),g=!0}else r("forward");return a.shapeFlag|=O.COMPONENT_SHOULD_KEEP_ALIVE,L(t.type)?t:a}}}),U=e=>{const s=e.push.bind(e),r=e.go.bind(e),l=e.replace.bind(e),i=e.back.bind(e),f=e.forward.bind(e);e.push=u=>(c.action=E.pushName,s(u)),e.go=u=>{u>0&&(c.action=E.forwardName),u<0&&(c.action=E.backName),c.n=u,r(u)},e.replace=u=>(c.action=E.replaceName,l(u)),e.back=()=>{c.action=E.backName,c.n=-1,i()},e.forward=()=>{c.action=E.forwardName,f()}},w={install(e,{router:s,backCallback:r,forwardCallback:l}={router:null,backCallback:null,forwardCallback:null}){if(!s)throw Error("router is required");let i=null;s.options.history.listen((f,u,h)=>{i=h}),s.beforeEach(()=>{i&&(i.direction==="back"&&r?r(i.delta):i.direction==="forward"&&l&&l(i.delta),i=null)})}},D=e=>{c.n=e,c.action=E.backName},H=e=>{c.n=e,c.action=E.forwardName},y={install(e,{router:s}){if(!s)throw Error(`
 vue-router is necessary. 

`);e.component(E.componentName,A),e.use(w,{router:s,backCallback:D,forwardCallback:H}),U(s)}};exports.VuePageStack=A;exports.VuePageStackPlugin=y;
