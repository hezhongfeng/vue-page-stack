var VuePageStack=function(E,M){"use strict";const C={componentName:"VuePageStack",keyName:"stack-key",pushName:"push",goName:"go",replaceName:"replace",backName:"back",forwardName:"forward"};var i;(function(e){e[e.ELEMENT=1]="ELEMENT",e[e.FUNCTIONAL_COMPONENT=2]="FUNCTIONAL_COMPONENT",e[e.STATEFUL_COMPONENT=4]="STATEFUL_COMPONENT",e[e.TEXT_CHILDREN=8]="TEXT_CHILDREN",e[e.ARRAY_CHILDREN=16]="ARRAY_CHILDREN",e[e.SLOTS_CHILDREN=32]="SLOTS_CHILDREN",e[e.TELEPORT=64]="TELEPORT",e[e.SUSPENSE=128]="SUSPENSE",e[e.COMPONENT_SHOULD_KEEP_ALIVE=256]="COMPONENT_SHOULD_KEEP_ALIVE",e[e.COMPONENT_KEPT_ALIVE=512]="COMPONENT_KEPT_ALIVE",e[e.COMPONENT=6]="COMPONENT"})(i||(i={}));const m=(e,t)=>{for(let s=0;s<e.length;s++)e[s](t)};function A(e,t,s,o){E.callWithAsyncErrorHandling(e,t,h.VNODE_HOOK,[s,o])}const S=e=>e.__isSuspense,V={ENTER:0,LEAVE:1,REORDER:2},h={SETUP_FUNCTION:0,RENDER_FUNCTION:1,WATCH_GETTER:2,WATCH_CALLBACK:3,WATCH_CLEANUP:4,NATIVE_EVENT_HANDLER:5,COMPONENT_EVENT_HANDLER:6,VNODE_HOOK:7};function U(e){e.shapeFlag&=~i.COMPONENT_SHOULD_KEEP_ALIVE,e.shapeFlag&=~i.COMPONENT_KEPT_ALIVE}function p(e){return e.shapeFlag&i.SUSPENSE?e.ssContent:e}const u=[],g=e=>{for(let t=0;t<u.length;t++)if(u[t].key===e)return t;return-1},x=e=>E.defineComponent({name:C.componentName,__isKeepAlive:!0,setup(t,{slots:s}){console.log("VuePageStack setup");const o=E.getCurrentInstance(),r=o.ctx,O=o.suspense,{renderer:{p:f,m:I,um:k,o:{createElement:D}}}=r,K=D("div");r.activate=(n,l,T,a,c)=>{const N=n.component;I(n,l,T,V.ENTER,O),f(N.vnode,n,l,T,N,O,a,n.slotScopeIds,c),E.queuePostFlushCb(()=>{N.isDeactivated=!1,N.a&&m(N.a);const P=n.props&&n.props.onVnodeMounted;P&&A(P,N.parent,n)},O)},r.deactivate=n=>{const l=n.component;I(n,K,null,V.LEAVE,O),E.queuePostFlushCb(()=>{l.da&&m(l.da);const T=n.props&&n.props.onVnodeUnmounted;T&&A(T,l.parent,n),l.isDeactivated=!0},O)};function b(n){U(n),k(n,o,O,!0)}let _=null,d=!1;const H=()=>{console.log("cacheSubtree"),_!=null&&(d?u[u.length-1].vnode=p(o.subTree):u.push({key:_,vnode:p(o.subTree)})),console.log(_,u)};return E.onMounted(H),E.onUpdated(H),E.onBeforeUnmount(()=>{for(const n of u)b(n.vnode)}),()=>{console.log("return"),_=null,d=!1;const l=M.useRoute().query[e];if(!s.default)return null;console.log(180);const T=s.default(),a=T[0];if(T.length>1)return T;if(!E.isVNode(a)||!(a.shapeFlag&i.STATEFUL_COMPONENT)&&!(a.shapeFlag&i.SUSPENSE))return a;console.log(191);let c=p(a);c.el&&(c=E.cloneVNode(c),a.shapeFlag&i.SUSPENSE&&(a.ssContent=c)),_=l,console.log("pendingCacheKey",_);let N=g(l);if(N!==-1){const P=u[N].vnode;c.el=P.el,c.component=P.component,c.transition&&E.setTransitionHooks(c,c.transition),c.shapeFlag|=i.COMPONENT_KEPT_ALIVE;for(let L=N+1;L<u.length;L++)u[L]=null;u.splice(N+1),d=!0}return c.shapeFlag|=i.COMPONENT_SHOULD_KEEP_ALIVE,S(a.type)?a:c}}});function R(e,t){return!!e[t]}function y(e){return e.replace(/[xy]/g,t=>{const s=Math.random()*16|0;return(t==="x"?s:s&3|8).toString(16)})}return{install(e,{router:t,name:s=C.componentName,keyName:o=C.keyName}){if(!t)throw Error(`
 vue-router is necessary. 

`);e.component(s,x(o)),t.beforeEach((r,O)=>{if(console.log("beforeEach"),R(r.query,o))g(r.query[o])===-1?(r.params[o+"-dir"]=C.forwardName,console.log("前进")):(r.params[o+"-dir"]=C.backName,console.log("后退"));else{r.query[o]=y("xxxxxxxx");const f=!R(O.query,o);return{hash:r.hash,path:r.path,name:r.name,params:r.params,query:r.query,meta:r.meta,replace:f}}})}}}(Vue,vueRouter);
