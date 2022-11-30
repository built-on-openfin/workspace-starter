/******/ var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/workspace/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/@openfin/workspace/index.js ***!
  \******************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={703:(e,t,n)=>{n.r(t),n.d(t,{CLIAction:()=>p.Pt,CLIFilterOptionType:()=>p.el,CLITemplate:()=>p.yW,deregister:()=>tt,hide:()=>ot,register:()=>et,show:()=>nt});var o={};n.r(o),n.d(o,{subscribe:()=>ce});var r={};n.r(r),n.d(r,{create:()=>Ue});var i=n(678),a=n(532),s=n(150);const c="home";var d;!function(e){e.Commands="home-commands"}(d||(d={}));var u,l=n(806),p=(n(298),n(758));n(114),n(109),n(427);!function(e){e[e.Initial=0]="Initial",e[e.Open=1]="Open",e[e.Close=2]="Close"}(u||(u={}));var f=n(316);const g="all",w="0",h="5",v="6",y=()=>{};function m(e,t){return e?`${e}-${t}`:t}function S(e){return`__search-${e}-topic__`}const P=new Map;function W(e,t){P.has(e)||P.set(e,new Set),P.get(e).add(t)}function k(e,t){const n=P.get(e);n&&n.delete(t)}const C=new Map;function I(e,t){C.has(e)||C.set(e,new Set),C.get(e).add(t)}function T(e,t){const n=C.get(e);n&&n.delete(t)}const b=new Map;async function A(e,t){b.has(e)||b.set(e,new Map),b.get(e).set(t.id,t);const n=P.get(e);if(!n)return;const o=[...n].map((e=>e()));await Promise.all(o)}async function F(e,t){const n=b.get(e);if(!n)return;n.delete(t);const o=C.get(e);if(!o)return;const r=[...o].map((e=>e()));await Promise.all(r)}function R(e){const t=b.get(e);return t?[...t.values()]:[]}function D(e){const t=b.get(e);t&&t.clear()}function B(e,t){const n=b.get(e);return n?n.get(t):null}function L(e,t,n){return{...e,action:n||{...e.actions[0],trigger:f.px.UserAction},dispatcherIdentity:t}}function x(e,t,n="ascending"){const o=e||[];if(!t?.length)return o;const r=[],i=new Map;t.forEach((e=>{if(e.key)return i.set(e.key,e);r.push(e)}));let a=o.map((e=>{const{key:t}=e;if(t&&i.has(t)){const e=i.get(t);return i.delete(t),e}return e}));return a.push(...i.values(),...r),a="ascending"===n?a.sort(((e,t)=>(e?.score??1/0)-(t?.score??1/0))):a.sort(((e,t)=>(t?.score??1/0)-(e?.score??1/0))),a}function O(e){const t={};let n=[];let o=[];let r=u.Initial;t.getStatus=()=>r,t.getResultBuffer=()=>n,t.setResultBuffer=e=>{n=e,n?.length&&t.onChange()},t.getRevokedBuffer=()=>o,t.setRevokedBuffer=e=>{o=e,o?.length&&t.onChange()},t.onChange=y;const i={};return t.res=i,i.close=()=>{r!==u.Close&&(r=u.Close,t.onChange())},i.open=()=>{r!==u.Open&&(r=u.Open,t.onChange())},i.respond=n=>{const o=x(t.getResultBuffer(),n,e);t.setResultBuffer(o)},i.revoke=(...e)=>{const n=new Set(e),o=t.getResultBuffer().filter((({key:e})=>{const t=n.has(e);return t&&n.delete(e),!t}));t.setResultBuffer(o),n.size&&(t.getRevokedBuffer().forEach((e=>n.add(e))),t.setRevokedBuffer([...n]))},t}function M(e,t,n){const o=new Set;let r=!1;return{close:()=>{r=!0;for(const e of o)e()},req:{id:t,topic:e,...n,context:n?.context||{},onClose:e=>{o.add(e),r&&e()},removeListener:e=>{o.delete(e)}}}}function E(){return{name:fin.me.name,uuid:fin.me.uuid}}function V(){let e;try{e=fin.Platform.getCurrentSync().identity.uuid}catch(e){}return e}const G="deregistered or does not exist",q=new Error(`provider ${G}`),_=new Error("provider with name already exists"),H=new Error("bad payload"),$=new Error("subscription rejected"),U=new Error(`channel ${G}`),N=new Map;function j(e){const t=X(e);if(t)return t;throw U}function X(e){const t=N.get(e);if(t)return t}function K(e,t){N.set(e,t)}function z(e){console.error("OpenFin Search API: ",e)}const J=new Map;function Q(e){J.has(e)||J.set(e,new Map);const t=J.get(e);return{getRequestsForIdentity:e=>{const n=function(e){return`${e.uuid}:${e.name}`}(e);return t.has(n)||t.set(n,new Map),t.get(n)}}}async function Z(e,t){return(await j(e)).dispatch(w,t)}function Y({namespacedTopic:e,topic:t}){const n=B.bind(null,e),o=Q(e),r=Z.bind(null,e);return async(e,i)=>{if(!e||!e.id||!e.providerId){const e=H;return z(e),{error:e.message}}const{id:a,providerId:s}=e,c=n(s);if(!c){const e=q;return z(e),{error:e.message}}const d=o.getRequestsForIdentity(i);let u=d.get(e.id);u||(u=M(t,a,e),d.set(e.id,u));const l=O(),p=()=>{const e=l.getResultBuffer();l.setResultBuffer([]);const t=l.getRevokedBuffer();l.setRevokedBuffer([]);const n=l.getStatus();r({id:a,providerId:s,results:e,revoked:t,status:n})};let f=!0,g=!1;l.onChange=()=>{if(f)return f=!1,void p();g||(g=!0,setTimeout((()=>{g=!1,p()}),100))};try{const{results:e,context:t}=await c.onUserInput(u.req,l.res),n=l.getStatus();return{id:a,providerId:s,status:n,results:e,context:t}}catch(e){return z(e),{id:a,providerId:s,error:e?.message}}}}async function ee(e,t,n){const o=n||await j(e),r=E(),i={...t,identity:r,onResultDispatch:void 0},a=await o.dispatch("2",i);return await A(e,{identity:r,...t}),a}async function te(e,t){const n=await j(e);return await n.dispatch("3",t),F(e,t)}async function ne(e,t,n,o){const r=L(n,E(),o),i=B(e,t);if(i){const{onResultDispatch:e}=i;if(!e)return;return e(r)}const a={providerId:t,result:r};return(await j(e)).dispatch(h,a)}async function oe(e,t){const n={...t,context:t?.context||{}},o={},r=async function*(e,t,{setState:n}){const o=await j(e);for(;;){const e=await o.dispatch("1",t),r=e.error;if(r)throw new Error(r);const i=e;if(t.id=i.id,n(i.state),i.done)return i.value;yield i.value}}(e,n,{setState:e=>{o.state=e}});let i=await r.next();return o.id=n.id||"",o.close=()=>{!async function(e,t){(await j(e)).dispatch(v,{id:t})}(e,o.id)},o.next=()=>{if(i){const e=i;return i=void 0,e}return r.next()},o}async function re(e){return(await j(e)).dispatch("4",null)}async function ie(e){const t=await j(e);var n;n=e,N.delete(n),D(e),await t.disconnect()}function ae(e){const{namespacedTopic:t}=e,n=Q(t);return async o=>{if(!X(t))return;const r=n.getRequestsForIdentity(o);for(const{req:e,close:t}of r.values())t(),r.delete(e.id);K(t,(async e=>{const{namespacedTopic:t}=e,n=await se(e);for(const e of R(t))await ee(t,e,n);return n})(e))}}async function se(e){const{namespacedTopic:t}=e,n=S(t),o=await async function(e){for(let t=0;t<50;t++)try{return await fin.InterApplicationBus.Channel.connect(e,{wait:!1})}catch(e){if(49===t)throw e;await new Promise((e=>setTimeout(e,1e3)))}}(n);return o.register(w,Y(e)),o.register(v,function(e){const t=Q(e);return(e,n)=>{const o=t.getRequestsForIdentity(n),r=o.get(e.id);r&&(r.close(),o.delete(e.id))}}(t)),o.register(h,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return void z(H);const o=B(e,t.providerId);if(!o)return void z(q);const{onResultDispatch:r}=o;return r?(t.result.dispatcherIdentity=n,r(t.result)):void 0}}(t)),o.onDisconnection(ae(e)),o}async function ce(e){const t="string"==typeof e?e:e.topic,n="string"==typeof e?void 0:e.uuid,o=t||g,r=n||V()||"",i=m(r,o),a={topic:o,namespace:r,namespacedTopic:i};let s=X(i);return s||(s=se(a),K(i,s),await s),{getAllProviders:re.bind(null,i),register:ee.bind(null,i),search:oe.bind(null,i),deregister:te.bind(null,i),dispatch:ne.bind(null,i),disconnect:ie.bind(null,i)}}const de=new Map;function ue(e){const t=le(e);if(t)return t;throw U}function le(e){const t=de.get(e);if(t)return t}const pe=new Map;function fe(e,t){pe.has(e)||pe.set(e,new Set),pe.get(e).add(t)}function ge(e,t){const n=pe.get(e);n&&n.delete(t)}async function we(e){return[...R(e)].map((e=>({...e,onUserInput:void 0,onResultDispatch:void 0})))}async function he(e,t){if(B(e,t.id))throw new Error("provider with name already exists");const n=E();return await A(e,{identity:n,...t}),{workspaceVersion:i.u0||"",clientAPIVersion:t.clientAPIVersion||""}}async function ve(e,t){await F(e,t)}async function ye(e,t,n,o){const r=B(e,t);if(!r)throw q;const{onResultDispatch:i}=r;if(!i)return;return i(L(n,E(),o))}async function*me(e,t,n){const o=function(e,t){const n=[],o=[],r=[],i=[];for(const a of e){const e=O(a.scoreOrder),s={results:[],provider:{id:a.id,identity:a.identity,title:a.title,scoreOrder:a.scoreOrder,icon:a.icon,dispatchFocusEvents:a.dispatchFocusEvents}};n.push(s),o.push(e);const c=(async()=>{try{const{results:n,context:o}=await a.onUserInput(t,e.res);s.results=x(s.results||[],n),s.context={...s.context,...o}}catch(e){s.error=e}})();c.finally((()=>{c.done=!0})),i.push(c),r.push(r.length)}return{providerResponses:n,listenerResponses:o,openListenerResponses:r,initialResponsePromises:i}}(t.targets?t.targets.map((t=>B(e,t))).filter((e=>!!e)):[...R(e).filter((e=>!e.hidden))],t),{providerResponses:r,listenerResponses:i}=o;let{openListenerResponses:a,initialResponsePromises:s}=o,c=f.De.Fetching;const d=e=>{c=e,n.setState(c)};let l,p=!1;t.onClose((()=>{p=!0,l&&l()}));do{let e=!1;if(s.length){const t=[];for(const n of s)n.done?e=!0:t.push(n);s=t,s.length||(d(f.De.Fetched),e=!0)}let t,n=!1;const o=()=>{n=!0,t&&t()},g=[];for(const t of a){const n=i[t],a=r[t],s=n.getStatus();(s===u.Open||c===f.De.Fetching&&s===u.Initial)&&(g.push(t),n.onChange=o);const d=n.getResultBuffer();d.length&&(n.setResultBuffer([]),a.results=x(a.results||[],d),e=!0);const l=n.getRevokedBuffer();if(l.length){n.setRevokedBuffer([]);const t=new Set(l);a.results=(a.results||[]).filter((({key:e})=>!t.has(e))),e=!0}}if(a=g,e&&(yield r),p)break;n||(a.length||s.length)&&await Promise.race([...s,new Promise((e=>{t=e})),new Promise((e=>{l=e}))])}while(a.length||s.length);return d(f.De.Complete),r}let Se=0;async function Pe({namespacedTopic:e,topic:t},n){Se+=1;const o=M(t,Se.toString(),n),r=me(e,o.req,{setState:e=>{r.state=e}});return r.id=Se.toString(),r.close=o.close,r.state=f.De.Fetching,r}const We=new Map;function ke(e,t){return`${e}:${t}`}function Ce(e){return async t=>{if(!t)return z(H),{error:H.message};let n;if(t.id)n=ke(e.namespacedTopic,t.id);else{const o=await Pe(e,t);n=ke(e.namespacedTopic,o.id),t.id=o.id,We.set(n,{generator:o})}const o=We.get(n);clearTimeout(o.timeout);const r=await o.generator.next();return o.timeout=function(e){return window.setTimeout((()=>{We.delete(e)}),1e4)}(n),{...r,id:t.id,state:o.generator.state}}}function Ie(e,t,n){return ue(e).dispatch(t,v,{id:n})}function Te(e){return t=>function(e,t){const n=ke(e,t),o=We.get(n);o&&o.generator.close()}(e,t.id)}async function be(e,t,{id:n,query:o,context:r,targets:i=[]}){const a=ue(e),s={id:n,query:o,context:r,targets:i,providerId:t.id},c=await a.dispatch(t.identity,w,s),d=c.error;if(d)throw new Error(d);return c}const Ae=new Map;function Fe(e,t,n){return`${e}:${t.name}:${t.uuid}:${n}`}const Re=new Map;function De(e,t,n){return`${e}:${t}:${n}`}function Be(e,t){const n=Fe.bind(null,e,t.identity),o=Ie.bind(null,e,t.identity),r=be.bind(null,e,t);return async(i,a)=>{const s=n(i.id);if(!Ae.has(s)){const e=()=>{o(i.id),Ae.delete(s)};Ae.set(s,e),i.onClose(e)}const c=De(e,t.id,i.id),d=()=>{Re.delete(c),a.close()};i.onClose(d),Re.set(c,(e=>{e.results?.length&&a.respond(e.results),e.revoked?.length&&a.revoke(...e.revoked),e.status===u.Open&&a.open(),e.status===u.Close&&d()}));const l=await r(i);return l.status===u.Open&&a.open(),l.status!==u.Close&&l.status!==u.Initial||d(),l}}function Le(e,t){return async n=>{const o=ue(e),r={providerId:t.id,result:n};return o.dispatch(t.identity,h,r)}}const xe=new Map;function Oe(e,t){return`${e}-${t.name}-${t.uuid}`}function Me(e){return async(t,n)=>{if(!t||!t.id)return z(new Error(JSON.stringify(t))),void z(H);if(B(e,t.id))throw _;return t.identity=n,await async function(e,t){const n=Oe(e,t.identity);xe.has(n)||xe.set(n,[]),xe.get(n).push(t.id),await A(e,{...t,onUserInput:Be(e,t),onResultDispatch:Le(e,t)})}(e,t),{workspaceVersion:i.u0||"",clientAPIVersion:t.clientAPIVersion||""}}}function Ee(e){return t=>{t?function(e,t){const n=B(e,t);if(!n)return;const o=Oe(e,n.identity),r=xe.get(o);if(r){const n=r.findIndex((e=>e===t));-1!==n&&(r.splice(n,1),F(e,t))}}(e,t):z(H)}}const Ve=new Map;function Ge(e,t){Ve.has(e)||Ve.set(e,new Set),Ve.get(e).add(t)}function qe(e,t){const n=Ve.get(e);n&&n.delete(t)}function _e(e){return async t=>{!function(e,t){const n=Oe(e,t),o=xe.get(n);if(o){for(const t of o)F(e,t);xe.delete(n)}}(e,t);const n=Ve.get(e);n&&n.forEach((e=>e(t)))}}async function He(e){const{namespacedTopic:t}=e,n=S(e.namespacedTopic),o=await(r=n,fin.InterApplicationBus.Channel.create(r));var r;return o.onConnection(function({namespacedTopic:e}){return async t=>{const n=pe.get(e);if(n)for(const e of n)if(!await e(t))throw $}}(e)),o.onDisconnection(_e(t)),o.register(v,Te(t)),o.register(w,function(e){return t=>{const n=De(e,t.providerId,t.id),o=Re.get(n);o&&o(t)}}(t)),o.register("2",Me(t)),o.register("3",Ee(t)),o.register("4",function(e){return async()=>we(e)}(t)),o.register("1",Ce(e)),o.register(h,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return void z(H);const o=B(e,t.providerId);if(!o)throw q;const{onResultDispatch:r}=o;return r?(t.result.dispatcherIdentity=n,r(t.result)):void 0}}(t)),o}async function $e(e){const t=ue(e);var n;n=e,de.delete(n),await t.destroy(),D(e)}async function Ue(e){const t=("string"==typeof e?e:e?.topic||"")||g,n=V()||"",o=m(n,t),r={topic:t,namespace:n,namespacedTopic:o};let i=le(o);i||(i=await He(r),function(e,t){de.set(e,t)}(o,i));const a=ge.bind(null,o),s=qe.bind(null,o),c=k.bind(null,o),d=T.bind(null,o);return{getAllProviders:we.bind(null,o),search:Pe.bind(null,r),register:he.bind(null,o),deregister:ve.bind(null,o),onSubscription:fe.bind(null,o),onDisconnect:Ge.bind(null,o),onRegister:W.bind(null,o),onDeregister:I.bind(null,o),dispatch:ye.bind(null,o),disconnect:$e.bind(null,o),removeListener:e=>{a(e),s(e),c(e),d(e)}}}const{create:Ne}=r,{subscribe:je}=o,Xe={create:Ne,subscribe:je,defaultTopic:"all"},Ke=()=>{window.search=Xe},ze=e=>{const t=()=>{Ke(),window.removeEventListener(e,t)};return t};if("undefined"!=typeof window){Ke();const e="load",t=ze(e);window.addEventListener(e,t);const n="DOMContentLoaded",o=ze(n);window.addEventListener(n,o)}const Je=new Map;async function Qe(){await async function(e){Je.set(e,await je({topic:e,uuid:l.q9.Workspace}))}(c)}let Ze;async function Ye(e){return await async function(){return Ze||(Ze=Qe()),Ze}(),Je.get(e)}const et=async e=>{if(!e.icon)throw new Error(`${e.id} provider needs to have icon property defined.`);await(0,s.aB)();const t=await Ye(c);try{e.clientAPIVersion=i.u0;const n=await t.register(e);return(0,a.ck)({allowed:!0,componentVersion:n?.workspaceVersion}),n?.workspaceVersion,i.u0,{...n,setSearchQuery:async t=>(await(0,s.Xl)()).dispatch(s.WF.SetSearchQuery,{query:t,providerID:e.id})}}catch(e){throw(0,a.ck)({allowed:!1,rejectionCode:e instanceof Error?e.message:"unknown"}),e}},tt=async e=>{await(0,s.aB)();return(await Ye(c)).deregister(e)};async function nt(){return(await(0,s.Xl)()).dispatch(s.WF.ShowHome,void 0)}async function ot(){return(await(0,s.Xl)()).dispatch(s.WF.HideHome,void 0)}},298:(e,t,n)=>{n.d(t,{p:()=>o.px,w:()=>o.wt});var o=n(316)},427:(e,t,n)=>{var o;n.d(t,{v:()=>o}),function(e){e.ActionButton="ActionButton",e.DropdownButton="DropdownButton"}(o||(o={}))},758:(e,t,n)=>{var o,r,i;n.d(t,{Pt:()=>o,el:()=>i,yW:()=>r}),function(e){e.Suggestion="suggestion"}(o||(o={})),function(e){e.Contact="Contact",e.Custom="Custom",e.List="List",e.Plain="Plain",e.SimpleText="SimpleText",e.Loading="Loading",e.Error="Error"}(r||(r={})),function(e){e.MultiSelect="MultiSelect"}(i||(i={}))},114:(e,t,n)=>{var o,r;n.d(t,{L:()=>o,T:()=>r}),function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(o||(o={})),function(e){e.LandingPage="landingPage",e.AppGrid="appGrid"}(r||(r={}))},109:(e,t,n)=>{n.d(t,{Go:()=>r,ZJ:()=>a,bI:()=>i,p6:()=>o});const o={Container:"Container",Button:"Button"},r={Text:"Text",Image:"Image",List:"List"},i={...o,...r};var a;!function(e){e.Primary="primary",e.Secondary="secondary",e.TextOnly="textOnly"}(a||(a={}))},528:(e,t,n)=>{n.r(t),n.d(t,{AppManifestType:()=>a.L,StorefrontTemplate:()=>a.T,deregister:()=>h,hide:()=>v,register:()=>w,show:()=>y});var o=n(532),r=n(150),i=n(82),a=n(114),s=n(678),c=n(438);let d,u=!1;async function l(e,t,n){const o=await(0,r.Dm)();try{return await o.dispatch(e.action,e.payload)}catch(r){if(-1!==r.toString().indexOf(e.action))return u||console.warn("You are using a newer version of the Workspace client library that is not supported by the currently running workspace provider. Please upgrade the Workspace to version 9.0 or later."),u=!0,await o.dispatch(t.action,t.payload),n;throw r}}const p=new Map,f=e=>{if(!p.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return p.get(e)},g=async e=>{await(0,c.Hh)(fin.me.identity);const t=await(0,r.Xl)();if(p.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return p.set(e.id,e),(e=>{e.isStorefrontActionsRegistered||(e.isStorefrontActionsRegistered=!0,e.register(r.WF.GetStorefrontProviderApps,(e=>f(e).getApps())),e.register(r.WF.GetStorefrontProviderFooter,(e=>f(e).getFooter())),e.register(r.WF.GetStorefrontProviderLandingPage,(e=>f(e).getLandingPage())),e.register(r.WF.GetStorefrontProviderNavigation,(e=>f(e).getNavigation())),e.register(r.WF.LaunchStorefrontProviderApp,(({id:e,app:t})=>f(e).launchApp(t))))})(t),e.clientAPIVersion=s.u0,l({action:r.WF.RegisterProvider,payload:{providerType:i.lP.Storefront,info:e}},{action:r.WF.RegisterStorefrontProvider,payload:e},{workspaceVersion:"unknown"})},w=e=>(d=new Promise((async(t,n)=>{try{const n=await g(e);(0,o.d9)({allowed:!0,componentVersion:n?.workspaceVersion}),n?.workspaceVersion,s.u0,t({clientAPIVersion:s.u0,workspaceVersion:n?.workspaceVersion??""})}catch(e){(0,o.d9)({allowed:!1,rejectionCode:e instanceof Error?e.message:"unknown"}),n(e)}})),d),h=async e=>(await d,p.delete(e),await(0,r.aB)(),l({action:r.WF.DeregisterProvider,payload:{providerType:i.lP.Storefront,id:e}},{action:r.WF.DeregisterStorefrontProvider,payload:e})),v=async()=>(await d,await(0,r.aB)(),l({action:r.WF.HideProviderWindow,payload:{providerType:i.lP.Storefront}},{action:r.WF.HideStorefront})),y=async()=>(await d,await(0,r.aB)(),l({action:r.WF.ShowProviderWindow,payload:{providerType:i.lP.Storefront}},{action:r.WF.ShowStorefront}))},438:(e,t,n)=>{var o;n.d(t,{Hh:()=>i}),function(e){e.LaunchApp="launchApp",e.SavePage="savePage",e.GetSavedPage="getSavedPage",e.CreateSavedPage="createSavedPage",e.UpdateSavedPage="updateSavedPage",e.DeleteSavedPage="deleteSavedPage",e.GetSavedPages="getSavedPages",e.CreateSavedPageInternal="createSavedPageInternal",e.UpdateSavedPageInternal="updateSavedPageInternal",e.DeleteSavedPageInternal="deleteSavedPageInternal",e.SharePage="sharePage",e.UpdatePageForWindow="updatePageForWindow",e.AttachPagesToWindow="attachPagesToWindow",e.DetachPagesFromWindow="detachPagesFromWindow",e.ReorderPagesForWindow="reorderPagesForWindow",e.SetActivePage="setActivePage",e.GetAllAttachedPages="getAllAttachedPages",e.GetActivePageIdForWindow="getActivePageIdForWindow",e.GetPagesForWindow="getPagesForWindow",e.GetPageForWindow="getPageForWindow",e.GetSavedPageMetadata="getSavedPageMetadata",e.GetUniquePageTitle="getUniquePageTitle",e.GetLastFocusedBrowserWindow="getLastFocusedBrowserWindow",e.GetThemes="getThemes",e.GetSelectedScheme="getSelectedScheme",e.SetSelectedScheme="setSelectedScheme",e.OpenGlobalContextMenuInternal="openGlobalContextMenuInternal",e.OpenViewTabContextMenuInternal="openViewTabContextMenuInternal",e.OpenPageTabContextMenuInternal="openPageTabContextMenuInternal",e.OpenSaveButtonContextMenuInternal="openSaveButtonContextMenuInternal",e.InvokeCustomActionInternal="invokeCustomActionInternal",e.RequestQuitPlatformDialogInternal="requestQuitPlatformDialogInternal",e.GetSavedWorkspace="getSavedWorkspace",e.CreateSavedWorkspace="createSavedWorkspace",e.UpdateSavedWorkspace="updateSavedWorkspace",e.DeleteSavedWorkspace="deleteSavedWorkspace",e.GetSavedWorkspaces="getSavedWorkspaces",e.SaveWorkspace="saveWorkspace",e.GetCurrentWorkspace="getCurrentWorkspace",e.ApplyWorkspace="applyWorkspace",e.SetActiveWorkspace="setActiveWorkspace",e.IsBrowserInitialized="isBrowserInitialized"}(o||(o={}));const r=async e=>fin.Platform.wrapSync(e).getClient(),i=async e=>{const t=await r(e),n="Target is not a Workspace Platform. Target must call WorkspacePlatform.init";let o;try{o=await t.dispatch("isWorkspacePlatform")}catch(e){throw new Error(n)}if("boolean"==typeof o&&o)return console.warn("You are using an older version of the workspace platform. Please update your workspace platform."),o;if("object"==typeof o&&o.isWorkspacePlatform)return o;throw new Error(n)}},150:(e,t,n)=>{n.d(t,{Dm:()=>s,WF:()=>a,Xl:()=>l,aB:()=>u});var o=n(117),r=n(678),i=n(121);var a;!function(e){e.RegisterProvider="register-provider",e.DeregisterProvider="deregister-provider",e.CreateProviderWindow="create-provider-window",e.GetProviders="get-providers",e.ShowProviderWindow="show-provider-window",e.HideProviderWindow="hide-provider-window",e.GetStorefrontProviderApps="get-storefront-provider-apps",e.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",e.GetStorefrontProviderFooter="get-storefront-provider-footer",e.GetStorefrontProviderNavigation="get-storefront-provider-navigation",e.LaunchStorefrontProviderApp="launch-storefront-provider-app",e.ShowHome="show-home",e.HideHome="hide-home",e.AssignHomeSearchContext="assign-home-search-context",e.SetSearchQuery="set-search-query",e.OpenHomeAndSetSearchQuery="open-home-and-set-search-query",e.GetLegacyPages="get-legacy-pages",e.GetLegacyWorkspaces="get-legacy-workspaces",e.GetComputedPlatformTheme="get-computed-platform-theme",e.SetSelectedScheme="set-selected-scheme",e.RegisterStorefrontProvider="register-storefront-provider",e.DeregisterStorefrontProvider="deregister-storefront-provider",e.HideStorefront="hide-storefront",e.ShowStorefront="show-storefront"}(a||(a={}));const s=(0,o.Z)("__of_workspace_protocol__"),c="isLaunchedViaLib",d=e=>{const t=new URL(e);return t.searchParams.append(c,"true"),t.toString()},u=async()=>{await(0,i.JV)(i.iW)||((r.ZK||-1===navigator.userAgent.indexOf("Win"))&&await fin.Application.startFromManifest(d(r.aW)),await fin.System.openUrlWithBrowser(d(r.GX)))},l=async()=>(await u(),s())},82:(e,t,n)=>{n.d(t,{R8:()=>a,X_:()=>i,lP:()=>o});var o,r=n(150);!function(e){e.Storefront="storefront",e.Dock="dock"}(o||(o={}));const i=async e=>(await(0,r.Dm)()).dispatch(r.WF.ShowProviderWindow,{providerType:e}),a=async e=>(await(0,r.Dm)()).dispatch(r.WF.HideProviderWindow,{providerType:e})},806:(e,t,n)=>{n.d(t,{q9:()=>o});var o,r,i,a=n(678);!function(e){e.Workspace="openfin-browser"}(o||(o={})),function(e){e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(r||(r={})),function(e){e.FinProtocol="fin-protocol"}(i||(i={}));a.AB,o.Workspace},117:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(678);const r=o.Ax&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));function i(e){let t;return()=>{if(!o.sS)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return t||(t=(async()=>{await r;const n={clientAPIVersion:o.u0},i=await fin.InterApplicationBus.Channel.connect(e,{payload:n});return i.onDisconnection((async()=>{console.warn(`disconnected from channel provider ${e}`),t=void 0})),i})().then((e=>e)).catch((n=>{throw t=void 0,new Error(`failed to connect to channel provider ${e}: ${n}`)}))),t}}},678:(e,t,n)=>{var o;n.d(t,{AB:()=>s,Ax:()=>i,GX:()=>u,ZK:()=>d,aW:()=>l,oC:()=>c,sS:()=>r,u0:()=>f}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(o||(o={}));const r="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||process.env?.JEST_WORKER_ID,"undefined"!=typeof window),a=i?window.origin:o.Local,s=r&&fin.me.uuid,c=r&&fin.me.name,d=(r&&fin.me.entityType,"prod"===o.Local),u=(o.Dev,o.Staging,o.Prod,"fins://system-apps/workspace"),l="https://cdn.openfin.co/workspace/9.6.0/app.json",p=e=>e.startsWith("http://")||e.startsWith("https://")?e:a+e,f=(p("https://cdn.openfin.co/workspace/9.6.0"),p("https://cdn.openfin.co/workspace/9.6.0"),"undefined"!=typeof WORKSPACE_DOCS_PLATFORM_URL&&p(WORKSPACE_DOCS_PLATFORM_URL),"undefined"!=typeof WORKSPACE_DOCS_CLIENT_URL&&p(WORKSPACE_DOCS_CLIENT_URL),"9.6.0")},532:(e,t,n)=>{n.d(t,{Wn:()=>d,ck:()=>s,d9:()=>c});var o,r=n(678),i=n(121);!function(e){e.Browser="Browser",e.Dock="Dock",e.Home="Home",e.Notification="Notification",e.Storefront="Storefront",e.Platform="Platform",e.Theming="Theming"}(o||(o={}));const a=async(e,t)=>{const n={apiVersion:t.apiVersion||r.u0,componentName:e,componentVersion:t.componentVersion||r.u0,allowed:t.allowed,rejectionCode:t.rejectionCode};fin.System.registerUsage({type:"workspace-licensing",data:n})},s=async e=>{i.OI.uuid===i.Gi.uuid&&i.OI.name===i.Gi.name||a(o.Home,e)},c=async e=>{a(o.Storefront,e)},d=async e=>{a(o.Dock,e)}},121:(e,t,n)=>{n.d(t,{Gi:()=>d,JV:()=>p,OI:()=>u,iW:()=>l});var o,r,i,a=n(806),s=n(678);!function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window",e.ClassicWindow="internal-generated-classic-window"}(o||(o={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.Closed="closed",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached",e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.OptionsChanged="options-changed"}(r||(r={})),function(e){e.BeforeUnload="beforeunload"}(i||(i={}));function c(e){if(!s.sS)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}const d={name:s.oC,uuid:s.AB};const u={name:o.Home,uuid:a.q9.Workspace},l=(o.Dock,a.q9.Workspace,o.Storefront,a.q9.Workspace,{name:a.q9.Workspace,uuid:a.q9.Workspace});const p=e=>c(e).getOptions().then((()=>!0)).catch((()=>!1))},316:(e,t,n)=>{var o,r,i;n.d(t,{De:()=>o,px:()=>r,wt:()=>i}),function(e){e.Fetching="fetching",e.Fetched="fetched",e.Complete="complete"}(o||(o={})),function(e){e.UserAction="user-action",e.FocusChange="focus-change",e.Reload="reload"}(r||(r={})),function(e){e.Active="active",e.Default="default"}(i||(i={}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{n.r(o),n.d(o,{ActionTrigger:()=>W.p,AppManifestType:()=>I.L,ButtonStyle:()=>k.ZJ,CLIAction:()=>C.Pt,CLIFilterOptionType:()=>C.el,CLITemplate:()=>C.yW,ContainerTemplateFragmentNames:()=>k.p6,Dock:()=>e,DockButtonNames:()=>d.v,Home:()=>v,Legacy:()=>t,PresentationTemplateFragmentNames:()=>k.Go,SearchTagBackground:()=>W.w,Storefront:()=>P,StorefrontTemplate:()=>I.T,TemplateFragmentTypes:()=>k.bI});var e={};n.r(e),n.d(e,{DockButtonNames:()=>d.v,deregister:()=>f,minimize:()=>g,register:()=>p,show:()=>w});var t={};n.r(t),n.d(t,{getPages:()=>m,getWorkspaces:()=>S});var r=n(678),i=n(532),a=n(150),s=n(438),c=n(82),d=n(427);let u,l=!1;const p=e=>(u=new Promise((async(t,n)=>{try{const n=await(async e=>{await(0,s.Hh)(fin.me.identity);const t=await(0,a.Xl)();if(l)throw new Error("A dock provider for the platform is already registered.");return l=!0,e.clientAPIVersion=r.u0,t.dispatch(a.WF.RegisterProvider,{providerType:c.lP.Dock,info:e})})(e);(0,i.Wn)({allowed:!0,componentVersion:n?.workspaceVersion}),n?.workspaceVersion,r.u0,t({clientAPIVersion:r.u0,workspaceVersion:n?.workspaceVersion??""})}catch(e){(0,i.Wn)({allowed:!1,rejectionCode:e instanceof Error?e.message:"unknown"}),n(e),u=null}})),u),f=async()=>{await u,l=!1;return(await(0,a.Xl)()).dispatch(a.WF.DeregisterProvider,{providerType:c.lP.Dock})},g=async()=>{await u,await(0,a.aB)(),await(0,c.R8)(c.lP.Dock)},w=async()=>{await u,await(0,a.aB)(),await(0,c.X_)(c.lP.Dock)};var h,v=n(703);n(121);!function(e){e.TabCreated="tab-created",e.ContainerCreated="container-created",e.ContainerResized="container-resized"}(h||(h={}));new Map;var y;!function(e){e.CurrentWorkspaceId="currentWorkspaceId",e.LastFocusedBrowserWindow="lastFocusedBrowserWindow",e.MachineName="machineName",e.NewTabPageLayout="NewTabPageLayout",e.NewTabPageSort="NewTabPageSort",e.DockPosition="DockPosition",e.SelectedColorScheme="SelectedColorScheme",e.HasMovedStore="HasMovedStore"}(y||(y={}));const m=()=>async function(){return(await(0,a.Dm)()).dispatch(a.WF.GetLegacyPages,void 0)}(),S=()=>(async()=>(await(0,a.Dm)()).dispatch(a.WF.GetLegacyWorkspaces,void 0))();var P=n(528),W=n(298),k=n(109),C=n(758),I=n(114)})(),module.exports=o})();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/lodash/_DataView.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_DataView.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "../../node_modules/lodash/_Map.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Map.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../../node_modules/lodash/_Promise.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_Promise.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "../../node_modules/lodash/_Set.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Set.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "../../node_modules/lodash/_Symbol.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_Symbol.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../../node_modules/lodash/_WeakMap.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_WeakMap.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "../../node_modules/lodash/_arrayLikeKeys.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_arrayLikeKeys.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_arrayMap.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_arrayMap.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "../../node_modules/lodash/_asciiToArray.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_asciiToArray.js ***!
  \**************************************************/
/***/ ((module) => {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetTag.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseGetTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsArguments.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_baseIsArguments.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsNative.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_baseIsNative.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsTypedArray.js":
/*!******************************************************!*\
  !*** ../../node_modules/lodash/_baseIsTypedArray.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/_baseKeys.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_baseKeys.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "../../node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "../../node_modules/lodash/_baseTimes.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseTimes.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "../../node_modules/lodash/_baseUnary.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseUnary.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../../node_modules/lodash/_baseValues.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseValues.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "../../node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "../../node_modules/lodash/_copyArray.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_copyArray.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "../../node_modules/lodash/_coreJsData.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_coreJsData.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../../node_modules/lodash/_freeGlobal.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_freeGlobal.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "../../node_modules/lodash/_getNative.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getNative.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../../node_modules/lodash/_getRawTag.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getRawTag.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../../node_modules/lodash/_getTag.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_getTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "../../node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "../../node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "../../node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "../../node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "../../node_modules/lodash/_getValue.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_getValue.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../../node_modules/lodash/_hasUnicode.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_hasUnicode.js ***!
  \************************************************/
/***/ ((module) => {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),

/***/ "../../node_modules/lodash/_isIndex.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_isIndex.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "../../node_modules/lodash/_isMasked.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_isMasked.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../../node_modules/lodash/_isPrototype.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_isPrototype.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../../node_modules/lodash/_iteratorToArray.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_iteratorToArray.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;


/***/ }),

/***/ "../../node_modules/lodash/_mapToArray.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_mapToArray.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "../../node_modules/lodash/_nativeKeys.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_nativeKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "../../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_nodeUtil.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_nodeUtil.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "../../node_modules/lodash/_objectToString.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_objectToString.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../../node_modules/lodash/_overArg.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_overArg.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "../../node_modules/lodash/_root.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/_root.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../../node_modules/lodash/_setToArray.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_setToArray.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "../../node_modules/lodash/_stringToArray.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_stringToArray.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var asciiToArray = __webpack_require__(/*! ./_asciiToArray */ "../../node_modules/lodash/_asciiToArray.js"),
    hasUnicode = __webpack_require__(/*! ./_hasUnicode */ "../../node_modules/lodash/_hasUnicode.js"),
    unicodeToArray = __webpack_require__(/*! ./_unicodeToArray */ "../../node_modules/lodash/_unicodeToArray.js");

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),

/***/ "../../node_modules/lodash/_toSource.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_toSource.js ***!
  \**********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../../node_modules/lodash/_unicodeToArray.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_unicodeToArray.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),

/***/ "../../node_modules/lodash/isArguments.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArguments.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../../node_modules/lodash/isArray.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/isArray.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../../node_modules/lodash/isArrayLike.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArrayLike.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../../node_modules/lodash/isBuffer.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "../../node_modules/lodash/isFunction.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/isFunction.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../../node_modules/lodash/isLength.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isLength.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../../node_modules/lodash/isObject.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isObject.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../../node_modules/lodash/isObjectLike.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isObjectLike.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../../node_modules/lodash/isString.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isString.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "../../node_modules/lodash/isTypedArray.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/keys.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/keys.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "../../node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "../../node_modules/lodash/stubFalse.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/stubFalse.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../../node_modules/lodash/toArray.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/toArray.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "../../node_modules/lodash/_copyArray.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js"),
    isString = __webpack_require__(/*! ./isString */ "../../node_modules/lodash/isString.js"),
    iteratorToArray = __webpack_require__(/*! ./_iteratorToArray */ "../../node_modules/lodash/_iteratorToArray.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "../../node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "../../node_modules/lodash/_setToArray.js"),
    stringToArray = __webpack_require__(/*! ./_stringToArray */ "../../node_modules/lodash/_stringToArray.js"),
    values = __webpack_require__(/*! ./values */ "../../node_modules/lodash/values.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Built-in value references. */
var symIterator = Symbol ? Symbol.iterator : undefined;

/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }
  var tag = getTag(value),
      func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

module.exports = toArray;


/***/ }),

/***/ "../../node_modules/lodash/values.js":
/*!*******************************************!*\
  !*** ../../node_modules/lodash/values.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseValues = __webpack_require__(/*! ./_baseValues */ "../../node_modules/lodash/_baseValues.js"),
    keys = __webpack_require__(/*! ./keys */ "../../node_modules/lodash/keys.js");

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ "../../node_modules/node-emoji/index.js":
/*!**********************************************!*\
  !*** ../../node_modules/node-emoji/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/emoji */ "../../node_modules/node-emoji/lib/emoji.js");

/***/ }),

/***/ "../../node_modules/node-emoji/lib/emoji.js":
/*!**************************************************!*\
  !*** ../../node_modules/node-emoji/lib/emoji.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*jslint node: true*/
var toArray = __webpack_require__(/*! lodash/toArray */ "../../node_modules/lodash/toArray.js");
var emojiByName = __webpack_require__(/*! ./emoji.json */ "../../node_modules/node-emoji/lib/emoji.json");

"use strict";

/**
 * regex to parse emoji in a string - finds emoji, e.g. :coffee:
 */
var emojiNameRegex = /:([a-zA-Z0-9_\-\+]+):/g;

/**
 * regex to trim whitespace
 * use instead of String.prototype.trim() for IE8 support
 */
var trimSpaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Removes colons on either side
 * of the string if present
 * @param  {string} str
 * @return {string}
 */
function stripColons (str) {
  var colonIndex = str.indexOf(':');
  if (colonIndex > -1) {
    // :emoji: (http://www.emoji-cheat-sheet.com/)
    if (colonIndex === str.length - 1) {
      str = str.substring(0, colonIndex);
      return stripColons(str);
    } else {
      str = str.substr(colonIndex + 1);
      return stripColons(str);
    }
  }

  return str;
}

/**
 * Adds colons to either side
 * of the string
 * @param {string} str
 * @return {string}
 */
function wrapColons (str) {
  return (typeof str === 'string' && str.length > 0) ? ':' + str + ':' : str;
}

/**
 * Ensure that the word is wrapped in colons
 * by only adding them, if they are not there.
 * @param {string} str
 * @return {string}
 */
function ensureColons (str) {
  return (typeof str === 'string' && str[0] !== ':') ? wrapColons(str) : str;
}

// Non spacing mark, some emoticons have them. It's the 'Variant Form',
// which provides more information so that emoticons can be rendered as
// more colorful graphics. FE0E is a unicode text version, where as FE0F
// should be rendered as a graphical version. The code gracefully degrades.
var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '️' - 0xFE0F;
var nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g')

// Remove the non-spacing-mark from the code, never send a stripped version
// to the client, as it kills graphical emoticons.
function stripNSB (code) {
  return code.replace(nonSpacingRegex, '');
};

// Reversed hash table, where as emojiByName contains a { heart: '❤' }
// dictionary emojiByCode contains { ❤: 'heart' }. The codes are normalized
// to the text version.
var emojiByCode = Object.keys(emojiByName).reduce(function(h,k) {
  h[stripNSB(emojiByName[k])] = k;
  return h;
}, {});

/**
 * Emoji namespace
 */
var Emoji = {
  emoji: emojiByName,
};

/**
 * get emoji code from name. return emoji code back if code is passed in.
 * @param  {string} emoji
 * @return {string}
 */
Emoji._get = function _get (emoji) {
  if (emojiByCode[stripNSB(emoji)]) {
    return emoji;
  } else if (emojiByName.hasOwnProperty(emoji)) {
    return emojiByName[emoji];
  }

  return ensureColons(emoji);
};

/**
 * get emoji code from :emoji: string or name
 * @param  {string} emoji
 * @return {string}
 */
Emoji.get = function get (emoji) {
  emoji = stripColons(emoji);

  return Emoji._get(emoji);
};

/**
 * find the emoji by either code or name
 * @param {string} nameOrCode The emoji to find, either `coffee`, `:coffee:` or `☕`;
 * @return {object}
 */
Emoji.find = function find (nameOrCode) {
  return Emoji.findByName(nameOrCode) || Emoji.findByCode(nameOrCode);
};

/**
 * find the emoji by name
 * @param {string} name The emoji to find either `coffee` or `:coffee:`;
 * @return {object}
 */
Emoji.findByName = function findByName (name) {
  var stripped = stripColons(name);
  var emoji = emojiByName[stripped];

  return emoji ? ({ emoji: emoji, key: stripped }) : undefined;
};

/**
 * find the emoji by code (emoji)
 * @param {string} code The emoji to find; for example `☕` or `☔`
 * @return {object}
 */
Emoji.findByCode = function findByCode (code) {
  var stripped = stripNSB(code);
  var name = emojiByCode[stripped];

  // lookup emoji to ensure the Variant Form is returned
  return name ? ({ emoji: emojiByName[name], key: name }) : undefined;
};


/**
 * Check if an emoji is known by this library
 * @param {string} nameOrCode The emoji to validate, either `coffee`, `:coffee:` or `☕`;
 * @return {object}
 */
Emoji.hasEmoji = function hasEmoji (nameOrCode) {
  return Emoji.hasEmojiByName(nameOrCode) || Emoji.hasEmojiByCode(nameOrCode);
};

/**
 * Check if an emoji with given name is known by this library
 * @param {string} name The emoji to validate either `coffee` or `:coffee:`;
 * @return {object}
 */
Emoji.hasEmojiByName = function hasEmojiByName (name) {
  var result = Emoji.findByName(name);
  return !!result && result.key === stripColons(name);
};

/**
 * Check if a given emoji is known by this library
 * @param {string} code The emoji to validate; for example `☕` or `☔`
 * @return {object}
 */
Emoji.hasEmojiByCode = function hasEmojiByCode (code) {
  var result = Emoji.findByCode(code);
  return !!result && stripNSB(result.emoji) === stripNSB(code);
};

/**
 * get emoji name from code
 * @param  {string} emoji
 * @param  {boolean} includeColons should the result include the ::
 * @return {string}
 */
Emoji.which = function which (emoji_code, includeColons) {
  var code = stripNSB(emoji_code);
  var word = emojiByCode[code];

  return includeColons ? wrapColons(word) : word;
};

/**
 * emojify a string (replace :emoji: with an emoji)
 * @param  {string} str
 * @param  {function} on_missing (gets emoji name without :: and returns a proper emoji if no emoji was found)
 * @param  {function} format (wrap the returned emoji in a custom element)
 * @return {string}
 */
Emoji.emojify = function emojify (str, on_missing, format) {
  if (!str) return '';

  return str.split(emojiNameRegex) // parse emoji via regex
            .map(function parseEmoji(s, i) {
              // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
              if (i % 2 === 0) return s;
              var emoji = Emoji._get(s);
              var isMissing = emoji.indexOf(':') > -1;

              if (isMissing && typeof on_missing === 'function') {
                return on_missing(s);
              }

              if (!isMissing && typeof format === 'function') {
                return format(emoji, s);
              }

              return emoji;
            })
            .join('') // convert back to string
  ;
};

/**
 * return a random emoji
 * @return {string}
 */
Emoji.random = function random () {
  var emojiKeys = Object.keys(emojiByName);
  var randomIndex = Math.floor(Math.random() * emojiKeys.length);
  var key = emojiKeys[randomIndex];
  var emoji = Emoji._get(key);
  return { key: key, emoji: emoji };
}

/**
 *  return an collection of potential emoji matches
 *  @param {string} str
 *  @return {Array.<Object>}
 */
Emoji.search = function search (str) {
  var emojiKeys = Object.keys(emojiByName);
  var matcher = stripColons(str)
  var matchingKeys = emojiKeys.filter(function(key) {
    return key.toString().indexOf(matcher) === 0;
  });
  return matchingKeys.map(function(key) {
    return {
      key: key,
      emoji: Emoji._get(key),
    };
  });
}

/**
 * unemojify a string (replace emoji with :emoji:)
 * @param  {string} str
 * @return {string}
 */
Emoji.unemojify = function unemojify (str) {
  if (!str) return '';
  var words = toArray(str);

  return words.map(function(word) {
    return Emoji.which(word, true) || word;
  }).join('');
};

/**
 * replace emojis with replacement value
 * @param {string} str
 * @param {function|string} the string or callback function to replace the emoji with
 * @param {boolean} should trailing whitespaces be cleaned? Defaults false
 * @return {string}
 */
Emoji.replace = function replace (str, replacement, cleanSpaces) {
  if (!str) return '';

  var replace = typeof replacement === 'function' ? replacement : function() { return replacement; };
  var words = toArray(str);

  var replaced = words.map(function(word, idx) {
    var emoji = Emoji.findByCode(word);

    if (emoji && cleanSpaces && words[idx + 1] === ' ') {
      words[idx + 1] = '';
    }

    return emoji ? replace(emoji) : word;
  }).join('');

  return cleanSpaces ? replaced.replace(trimSpaceRegex, '') : replaced;
};


/**
 * remove all emojis from a string
 * @param {string} str
 * @return {string}
 */
Emoji.strip = function strip (str) {
  return Emoji.replace(str, '', true);
};

module.exports = Emoji;


/***/ }),

/***/ "./client/src/integrations/emoji/integration-provider.ts":
/*!***************************************************************!*\
  !*** ./client/src/integrations/emoji/integration-provider.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmojiIntegrationProvider": () => (/* binding */ EmojiIntegrationProvider)
/* harmony export */ });
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "../../node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-emoji */ "../../node_modules/node-emoji/index.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_emoji__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../templates */ "./client/src/templates.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates */ "./client/src/integrations/emoji/templates.ts");




/**
 * Implement the integration provider for Emojis.
 */
class EmojiIntegrationProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._integrationHelpers = helpers;
        this._definition = definition;
    }
    /**
     * The module is being deregistered.
     * @returns Nothing.
     */
    async closedown() { }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        return [
            {
                key: `${EmojiIntegrationProvider._PROVIDER_ID}-help`,
                title: "/emoji",
                label: "Help",
                icon: this._definition?.icon,
                actions: [],
                data: {
                    providerId: EmojiIntegrationProvider._PROVIDER_ID,
                    populateQuery: "/emoji "
                },
                template: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.CLITemplate.Custom,
                templateContent: await (0,_templates__WEBPACK_IMPORTED_MODULE_2__.createHelp)("/emoji", [
                    "The emoji command can be used to search for emojis by name.",
                    "For example to search for emojis which include `woman` or `man` in their name."
                ], ["/emoji woman", "/emoji man"])
            }
        ];
    }
    /**
     * An entry has been selected.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    async itemSelection(result, lastResponse) {
        const data = result.data;
        if (result.action.trigger === "user-action") {
            if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION &&
                result.data.emoji) {
                await fin.Clipboard.writeText({ data: result.data.emoji });
                return true;
            }
            else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION &&
                result.data.key) {
                await fin.Clipboard.writeText({ data: result.data.key });
                return true;
            }
            else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION &&
                result.data.url &&
                this._integrationHelpers.openUrl) {
                await this._integrationHelpers.openUrl(data.url);
                return true;
            }
        }
        return false;
    }
    /**
     * Get a list of search results based on the query and filters.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse) {
        const results = [];
        if (query.startsWith("/emoji ")) {
            let key = query.slice(7);
            if (key.length > 0) {
                key = key.toLowerCase();
                // Find exact match first if there is one
                const matchEmoji = node_emoji__WEBPACK_IMPORTED_MODULE_1__.get(key);
                if (matchEmoji && !matchEmoji.startsWith(":")) {
                    results.push(await this.createResult(key, matchEmoji));
                }
                // Find all other potential matches
                const searchResult = node_emoji__WEBPACK_IMPORTED_MODULE_1__.search(key);
                for (const result of searchResult) {
                    if (result.emoji !== matchEmoji) {
                        results.push(await this.createResult(result.key, result.emoji));
                    }
                }
            }
        }
        return {
            results
        };
    }
    /**
     * Create a search result.
     * @param key The key for the emoji.
     * @param symbol The emoji symbol.
     * @returns The search result.
     */
    async createResult(key, symbol) {
        return {
            key: `emoji-${key}`,
            title: key,
            label: "Information",
            actions: [
                {
                    name: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
                    hotkey: "CmdOrCtrl+C"
                },
                {
                    name: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION,
                    hotkey: "Enter"
                }
            ],
            data: {
                providerId: EmojiIntegrationProvider._PROVIDER_ID,
                key,
                emoji: symbol,
                url: `https://emojipedia.org/${key}/`
            },
            template: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.CLITemplate.Custom,
            templateContent: {
                layout: await (0,_templates__WEBPACK_IMPORTED_MODULE_3__.getEmojiTemplate)({
                    copyEmojiAction: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
                    copyKeyAction: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION,
                    detailsAction: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION
                }),
                data: {
                    keyTitle: "Key",
                    copyKeyTitle: "Copy Key",
                    key,
                    emojiTitle: "Emoji",
                    copyEmojiTitle: "Copy Emoji",
                    emoji: symbol,
                    detailsTitle: "Further Details"
                }
            }
        };
    }
}
/**
 * Provider id.
 * @internal
 */
EmojiIntegrationProvider._PROVIDER_ID = "emoji";
/**
 * The key to use for a emoji result.
 * @internal
 */
EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION = "Emoji Details";
/**
 * The key to use for a emoji copy key action.
 * @internal
 */
EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION = "Copy Key";
/**
 * The key to use for a emoji copy key action.
 * @internal
 */
EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION = "Copy Emoji";


/***/ }),

/***/ "./client/src/integrations/emoji/templates.ts":
/*!****************************************************!*\
  !*** ./client/src/integrations/emoji/templates.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEmojiTemplate": () => (/* binding */ getEmojiTemplate)
/* harmony export */ });
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "../../node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../templates */ "./client/src/templates.ts");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../themes */ "./client/src/themes.ts");



async function getEmojiTemplate(actions) {
    const theme = await (0,_themes__WEBPACK_IMPORTED_MODULE_2__.getCurrentTheme)();
    return (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("column", [
        await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("keyTitle", 12, { color: theme.palette.brandPrimary, fontWeight: "bold" }),
        await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("key", 12, { color: theme.palette.textDefault, wordBreak: "break-all" }),
            await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Secondary, "copyKeyTitle", actions.copyKeyAction, {
                fontSize: "12px"
            })
        ], {
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px"
        }),
        await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("emojiTitle", 12, { color: theme.palette.brandPrimary, fontWeight: "bold" }),
        await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("emoji", 32, { color: theme.palette.textDefault }),
            await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Secondary, "copyEmojiTitle", actions.copyEmojiAction, {
                fontSize: "12px"
            })
        ], {
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px"
        }),
        await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            await (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Primary, "detailsTitle", actions.detailsAction, {
                fontSize: "12px"
            })
        ], { justifyContent: "flex-end" })
    ], {
        padding: "10px"
    });
}


/***/ }),

/***/ "./client/src/settings.ts":
/*!********************************!*\
  !*** ./client/src/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSettings": () => (/* binding */ getSettings)
/* harmony export */ });
let settings;
async function getConfiguredSettings() {
    const app = await fin.Application.getCurrent();
    const manifest = await app.getManifest();
    if (manifest.customSettings !== undefined) {
        settings = manifest.customSettings;
    }
    else {
        settings = {};
    }
    return settings;
}
async function getSettings() {
    if (settings === undefined) {
        settings = await getConfiguredSettings();
    }
    return settings;
}


/***/ }),

/***/ "./client/src/templates.ts":
/*!*********************************!*\
  !*** ./client/src/templates.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createButton": () => (/* binding */ createButton),
/* harmony export */   "createContainer": () => (/* binding */ createContainer),
/* harmony export */   "createHelp": () => (/* binding */ createHelp),
/* harmony export */   "createImage": () => (/* binding */ createImage),
/* harmony export */   "createText": () => (/* binding */ createText),
/* harmony export */   "createTitle": () => (/* binding */ createTitle)
/* harmony export */ });
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "../../node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes */ "./client/src/themes.ts");


async function createHelp(title, description, examples
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    const theme = await (0,_themes__WEBPACK_IMPORTED_MODULE_1__.getCurrentTheme)();
    const additionalData = {};
    const fragments = [];
    for (let i = 0; i < description.length; i++) {
        const descriptionKey = `desc-${i}`;
        additionalData[descriptionKey] = description[i];
        fragments.push(await createText(descriptionKey, 12, {
            padding: "6px 0px"
        }));
    }
    const exampleFragments = [];
    for (let i = 0; i < examples.length; i++) {
        const exampleKey = `line-${i}`;
        additionalData[exampleKey] = examples[i];
        exampleFragments.push(await createText(exampleKey, 12, {
            fontFamily: "monospace",
            whiteSpace: "nowrap"
        }));
    }
    if (exampleFragments.length > 0) {
        fragments.push(await createContainer("column", exampleFragments, {
            padding: "10px",
            marginTop: "6px",
            backgroundColor: theme.palette.background5,
            color: theme.palette.inputColor,
            borderRadius: "5px",
            overflow: "auto"
        }));
    }
    return {
        layout: await createContainer("column", [
            await createTitle("title", undefined, undefined, {
                marginBottom: "10px",
                borderBottom: `1px solid ${theme.palette.background6}`
            }),
            ...fragments
        ], {
            padding: "10px"
        }),
        data: {
            title,
            ...additionalData
        }
    };
}
async function createContainer(containerType, children, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Container,
        style: {
            display: "flex",
            flexDirection: containerType,
            ...style
        },
        children
    };
}
async function createTitle(dataKey, fontSize = 16, fontWeight = "bold", style) {
    const theme = await (0,_themes__WEBPACK_IMPORTED_MODULE_1__.getCurrentTheme)();
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Text,
        dataKey,
        style: {
            color: theme.palette.textDefault,
            fontSize: `${fontSize ?? 16}px`,
            fontWeight,
            ...style
        }
    };
}
async function createText(dataKey, fontSize = 14, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Text,
        dataKey,
        style: {
            fontSize: `${fontSize ?? 14}px`,
            ...style
        }
    };
}
async function createImage(dataKey, alternativeText, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Image,
        dataKey,
        alternativeText,
        style: {
            ...style
        }
    };
}
async function createButton(buttonStyle, titleKey, action, style) {
    const theme = await (0,_themes__WEBPACK_IMPORTED_MODULE_1__.getCurrentTheme)();
    const buttonOptions = buttonStyle === _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Secondary
        ? {
            border: `1px solid ${theme.palette.inputColor}`
        }
        : {};
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Button,
        buttonStyle,
        children: [await createText(titleKey, 12)],
        action,
        style: {
            ...buttonOptions,
            ...style
        }
    };
}


/***/ }),

/***/ "./client/src/themes.ts":
/*!******************************!*\
  !*** ./client/src/themes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentTheme": () => (/* binding */ getCurrentTheme),
/* harmony export */   "getThemes": () => (/* binding */ getThemes),
/* harmony export */   "validateThemes": () => (/* binding */ validateThemes)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./client/src/settings.ts");

const DEFAULT_PALETTES = {
    light: {
        brandPrimary: "#504CFF",
        brandSecondary: "#1E1F23",
        backgroundPrimary: "#FAFBFE",
        contentBackground1: "#504CFF",
        background1: "#FFFFFF",
        background2: "#FAFBFE",
        background3: "#F3F5F8",
        background4: "#ECEEF1",
        background5: "#DDDFE4",
        background6: "#C9CBD2",
        statusSuccess: "#35C759",
        statusWarning: "#F48F00",
        statusCritical: "#BE1D1F",
        statusActive: "#0498FB",
        inputBackground: "#ECEEF1",
        inputColor: "#1E1F23",
        inputPlaceholder: "#383A40",
        inputDisabled: "#7D808A",
        inputFocused: "#C9CBD2",
        textDefault: "#1E1F23",
        textHelp: "#2F3136",
        textInactive: "#7D808A"
    },
    dark: {
        brandPrimary: "#504CFF",
        brandSecondary: "#383A40",
        backgroundPrimary: "#1E1F23",
        contentBackground1: "#504CFF",
        background1: "#111214",
        background2: "#1E1F23",
        background3: "#24262B",
        background4: "#2F3136",
        background5: "#383A40",
        background6: "#53565F",
        statusSuccess: "#35C759",
        statusWarning: "#F48F00",
        statusCritical: "#BE1D1F",
        statusActive: "#0498FB",
        inputBackground: "#53565F",
        inputColor: "#FFFFFF",
        inputPlaceholder: "#C9CBD2",
        inputDisabled: "#7D808A",
        inputFocused: "#C9CBD2",
        textDefault: "#FFFFFF",
        textHelp: "#C9CBD2",
        textInactive: "#7D808A"
    }
};
let validatedThemes;
function getSystemPreferredColorScheme() {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
}
async function getCurrentTheme() {
    const themes = await getThemes();
    if (themes.length === 0) {
        return {
            label: "default",
            palette: DEFAULT_PALETTES.dark
        };
    }
    return themes[0];
}
async function getThemes() {
    if (!validatedThemes) {
        const settings = await (0,_settings__WEBPACK_IMPORTED_MODULE_0__.getSettings)();
        validatedThemes = validateThemes(settings?.themeProvider?.themes);
    }
    return validatedThemes.slice();
}
function validateThemes(themes) {
    const customThemes = [];
    if (Array.isArray(themes)) {
        const preferredColorScheme = getSystemPreferredColorScheme();
        for (let i = 0; i < themes.length; i++) {
            const themeToValidate = themes[i];
            const palette = validatePalette(themeToValidate.palette, themeToValidate.label);
            if (palette !== null) {
                themeToValidate.palette = palette;
            }
            else {
                // don't pass an empty object as there are no theme properties
                themeToValidate.palette = undefined;
            }
            if (themeToValidate.label.toLowerCase() === preferredColorScheme) {
                console.log(`Found a theme that matches system color scheme preferences and making it the default theme: ${preferredColorScheme}`);
                customThemes.unshift(themeToValidate);
            }
            else {
                customThemes.push(themeToValidate);
            }
        }
    }
    return customThemes;
}
function validatePalette(themePalette, themeLabel) {
    if (!themePalette) {
        return null;
    }
    const keys = Object.keys(themePalette);
    if (keys.length === 0) {
        return null;
    }
    const palette = {
        ...DEFAULT_PALETTES.dark
    };
    for (const key of keys) {
        if (themePalette[key] !== undefined &&
            themePalette[key] !== null &&
            themePalette[key].trim().length > 0) {
            palette[key] = themePalette[key];
        }
    }
    const brandPrimaryKey = "brandPrimary";
    const brandSecondaryKey = "brandSecondary";
    const backgroundPrimaryKey = "backgroundPrimary";
    if (!themePalette[brandPrimaryKey]) {
        console.warn(`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandPrimary}`);
    }
    if (!themePalette[brandSecondaryKey]) {
        console.warn(`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandSecondary}`);
    }
    if (!themePalette[backgroundPrimaryKey]) {
        console.warn(`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandPrimary}`);
    }
    return palette;
}


/***/ }),

/***/ "../../node_modules/node-emoji/lib/emoji.json":
/*!****************************************************!*\
  !*** ../../node_modules/node-emoji/lib/emoji.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"100":"💯","1234":"🔢","umbrella_with_rain_drops":"☔","coffee":"☕","aries":"♈","taurus":"♉","sagittarius":"♐","capricorn":"♑","aquarius":"♒","pisces":"♓","anchor":"⚓","white_check_mark":"✅","sparkles":"✨","question":"❓","grey_question":"❔","grey_exclamation":"❕","exclamation":"❗","heavy_exclamation_mark":"❗","heavy_plus_sign":"➕","heavy_minus_sign":"➖","heavy_division_sign":"➗","hash":"#️⃣","keycap_star":"*️⃣","zero":"0️⃣","one":"1️⃣","two":"2️⃣","three":"3️⃣","four":"4️⃣","five":"5️⃣","six":"6️⃣","seven":"7️⃣","eight":"8️⃣","nine":"9️⃣","copyright":"©️","registered":"®️","mahjong":"🀄","black_joker":"🃏","a":"🅰️","b":"🅱️","o2":"🅾️","parking":"🅿️","ab":"🆎","cl":"🆑","cool":"🆒","free":"🆓","id":"🆔","new":"🆕","ng":"🆖","ok":"🆗","sos":"🆘","up":"🆙","vs":"🆚","flag-ac":"🇦🇨","flag-ad":"🇦🇩","flag-ae":"🇦🇪","flag-af":"🇦🇫","flag-ag":"🇦🇬","flag-ai":"🇦🇮","flag-al":"🇦🇱","flag-am":"🇦🇲","flag-ao":"🇦🇴","flag-aq":"🇦🇶","flag-ar":"🇦🇷","flag-as":"🇦🇸","flag-at":"🇦🇹","flag-au":"🇦🇺","flag-aw":"🇦🇼","flag-ax":"🇦🇽","flag-az":"🇦🇿","flag-ba":"🇧🇦","flag-bb":"🇧🇧","flag-bd":"🇧🇩","flag-be":"🇧🇪","flag-bf":"🇧🇫","flag-bg":"🇧🇬","flag-bh":"🇧🇭","flag-bi":"🇧🇮","flag-bj":"🇧🇯","flag-bl":"🇧🇱","flag-bm":"🇧🇲","flag-bn":"🇧🇳","flag-bo":"🇧🇴","flag-bq":"🇧🇶","flag-br":"🇧🇷","flag-bs":"🇧🇸","flag-bt":"🇧🇹","flag-bv":"🇧🇻","flag-bw":"🇧🇼","flag-by":"🇧🇾","flag-bz":"🇧🇿","flag-ca":"🇨🇦","flag-cc":"🇨🇨","flag-cd":"🇨🇩","flag-cf":"🇨🇫","flag-cg":"🇨🇬","flag-ch":"🇨🇭","flag-ci":"🇨🇮","flag-ck":"🇨🇰","flag-cl":"🇨🇱","flag-cm":"🇨🇲","cn":"🇨🇳","flag-cn":"🇨🇳","flag-co":"🇨🇴","flag-cp":"🇨🇵","flag-cr":"🇨🇷","flag-cu":"🇨🇺","flag-cv":"🇨🇻","flag-cw":"🇨🇼","flag-cx":"🇨🇽","flag-cy":"🇨🇾","flag-cz":"🇨🇿","de":"🇩🇪","flag-de":"🇩🇪","flag-dg":"🇩🇬","flag-dj":"🇩🇯","flag-dk":"🇩🇰","flag-dm":"🇩🇲","flag-do":"🇩🇴","flag-dz":"🇩🇿","flag-ea":"🇪🇦","flag-ec":"🇪🇨","flag-ee":"🇪🇪","flag-eg":"🇪🇬","flag-eh":"🇪🇭","flag-er":"🇪🇷","es":"🇪🇸","flag-es":"🇪🇸","flag-et":"🇪🇹","flag-eu":"🇪🇺","flag-fi":"🇫🇮","flag-fj":"🇫🇯","flag-fk":"🇫🇰","flag-fm":"🇫🇲","flag-fo":"🇫🇴","fr":"🇫🇷","flag-fr":"🇫🇷","flag-ga":"🇬🇦","gb":"🇬🇧","uk":"🇬🇧","flag-gb":"🇬🇧","flag-gd":"🇬🇩","flag-ge":"🇬🇪","flag-gf":"🇬🇫","flag-gg":"🇬🇬","flag-gh":"🇬🇭","flag-gi":"🇬🇮","flag-gl":"🇬🇱","flag-gm":"🇬🇲","flag-gn":"🇬🇳","flag-gp":"🇬🇵","flag-gq":"🇬🇶","flag-gr":"🇬🇷","flag-gs":"🇬🇸","flag-gt":"🇬🇹","flag-gu":"🇬🇺","flag-gw":"🇬🇼","flag-gy":"🇬🇾","flag-hk":"🇭🇰","flag-hm":"🇭🇲","flag-hn":"🇭🇳","flag-hr":"🇭🇷","flag-ht":"🇭🇹","flag-hu":"🇭🇺","flag-ic":"🇮🇨","flag-id":"🇮🇩","flag-ie":"🇮🇪","flag-il":"🇮🇱","flag-im":"🇮🇲","flag-in":"🇮🇳","flag-io":"🇮🇴","flag-iq":"🇮🇶","flag-ir":"🇮🇷","flag-is":"🇮🇸","it":"🇮🇹","flag-it":"🇮🇹","flag-je":"🇯🇪","flag-jm":"🇯🇲","flag-jo":"🇯🇴","jp":"🇯🇵","flag-jp":"🇯🇵","flag-ke":"🇰🇪","flag-kg":"🇰🇬","flag-kh":"🇰🇭","flag-ki":"🇰🇮","flag-km":"🇰🇲","flag-kn":"🇰🇳","flag-kp":"🇰🇵","kr":"🇰🇷","flag-kr":"🇰🇷","flag-kw":"🇰🇼","flag-ky":"🇰🇾","flag-kz":"🇰🇿","flag-la":"🇱🇦","flag-lb":"🇱🇧","flag-lc":"🇱🇨","flag-li":"🇱🇮","flag-lk":"🇱🇰","flag-lr":"🇱🇷","flag-ls":"🇱🇸","flag-lt":"🇱🇹","flag-lu":"🇱🇺","flag-lv":"🇱🇻","flag-ly":"🇱🇾","flag-ma":"🇲🇦","flag-mc":"🇲🇨","flag-md":"🇲🇩","flag-me":"🇲🇪","flag-mf":"🇲🇫","flag-mg":"🇲🇬","flag-mh":"🇲🇭","flag-mk":"🇲🇰","flag-ml":"🇲🇱","flag-mm":"🇲🇲","flag-mn":"🇲🇳","flag-mo":"🇲🇴","flag-mp":"🇲🇵","flag-mq":"🇲🇶","flag-mr":"🇲🇷","flag-ms":"🇲🇸","flag-mt":"🇲🇹","flag-mu":"🇲🇺","flag-mv":"🇲🇻","flag-mw":"🇲🇼","flag-mx":"🇲🇽","flag-my":"🇲🇾","flag-mz":"🇲🇿","flag-na":"🇳🇦","flag-nc":"🇳🇨","flag-ne":"🇳🇪","flag-nf":"🇳🇫","flag-ng":"🇳🇬","flag-ni":"🇳🇮","flag-nl":"🇳🇱","flag-no":"🇳🇴","flag-np":"🇳🇵","flag-nr":"🇳🇷","flag-nu":"🇳🇺","flag-nz":"🇳🇿","flag-om":"🇴🇲","flag-pa":"🇵🇦","flag-pe":"🇵🇪","flag-pf":"🇵🇫","flag-pg":"🇵🇬","flag-ph":"🇵🇭","flag-pk":"🇵🇰","flag-pl":"🇵🇱","flag-pm":"🇵🇲","flag-pn":"🇵🇳","flag-pr":"🇵🇷","flag-ps":"🇵🇸","flag-pt":"🇵🇹","flag-pw":"🇵🇼","flag-py":"🇵🇾","flag-qa":"🇶🇦","flag-re":"🇷🇪","flag-ro":"🇷🇴","flag-rs":"🇷🇸","ru":"🇷🇺","flag-ru":"🇷🇺","flag-rw":"🇷🇼","flag-sa":"🇸🇦","flag-sb":"🇸🇧","flag-sc":"🇸🇨","flag-sd":"🇸🇩","flag-se":"🇸🇪","flag-sg":"🇸🇬","flag-sh":"🇸🇭","flag-si":"🇸🇮","flag-sj":"🇸🇯","flag-sk":"🇸🇰","flag-sl":"🇸🇱","flag-sm":"🇸🇲","flag-sn":"🇸🇳","flag-so":"🇸🇴","flag-sr":"🇸🇷","flag-ss":"🇸🇸","flag-st":"🇸🇹","flag-sv":"🇸🇻","flag-sx":"🇸🇽","flag-sy":"🇸🇾","flag-sz":"🇸🇿","flag-ta":"🇹🇦","flag-tc":"🇹🇨","flag-td":"🇹🇩","flag-tf":"🇹🇫","flag-tg":"🇹🇬","flag-th":"🇹🇭","flag-tj":"🇹🇯","flag-tk":"🇹🇰","flag-tl":"🇹🇱","flag-tm":"🇹🇲","flag-tn":"🇹🇳","flag-to":"🇹🇴","flag-tr":"🇹🇷","flag-tt":"🇹🇹","flag-tv":"🇹🇻","flag-tw":"🇹🇼","flag-tz":"🇹🇿","flag-ua":"🇺🇦","flag-ug":"🇺🇬","flag-um":"🇺🇲","flag-un":"🇺🇳","us":"🇺🇸","flag-us":"🇺🇸","flag-uy":"🇺🇾","flag-uz":"🇺🇿","flag-va":"🇻🇦","flag-vc":"🇻🇨","flag-ve":"🇻🇪","flag-vg":"🇻🇬","flag-vi":"🇻🇮","flag-vn":"🇻🇳","flag-vu":"🇻🇺","flag-wf":"🇼🇫","flag-ws":"🇼🇸","flag-xk":"🇽🇰","flag-ye":"🇾🇪","flag-yt":"🇾🇹","flag-za":"🇿🇦","flag-zm":"🇿🇲","flag-zw":"🇿🇼","koko":"🈁","sa":"🈂️","u7121":"🈚","u6307":"🈯","u7981":"🈲","u7a7a":"🈳","u5408":"🈴","u6e80":"🈵","u6709":"🈶","u6708":"🈷️","u7533":"🈸","u5272":"🈹","u55b6":"🈺","ideograph_advantage":"🉐","accept":"🉑","cyclone":"🌀","foggy":"🌁","closed_umbrella":"🌂","night_with_stars":"🌃","sunrise_over_mountains":"🌄","sunrise":"🌅","city_sunset":"🌆","city_sunrise":"🌇","rainbow":"🌈","bridge_at_night":"🌉","ocean":"🌊","volcano":"🌋","milky_way":"🌌","earth_africa":"🌍","earth_americas":"🌎","earth_asia":"🌏","globe_with_meridians":"🌐","new_moon":"🌑","waxing_crescent_moon":"🌒","first_quarter_moon":"🌓","moon":"🌔","waxing_gibbous_moon":"🌔","full_moon":"🌕","waning_gibbous_moon":"🌖","last_quarter_moon":"🌗","waning_crescent_moon":"🌘","crescent_moon":"🌙","new_moon_with_face":"🌚","first_quarter_moon_with_face":"🌛","last_quarter_moon_with_face":"🌜","full_moon_with_face":"🌝","sun_with_face":"🌞","star2":"🌟","stars":"🌠","thermometer":"🌡️","mostly_sunny":"🌤️","sun_small_cloud":"🌤️","barely_sunny":"🌥️","sun_behind_cloud":"🌥️","partly_sunny_rain":"🌦️","sun_behind_rain_cloud":"🌦️","rain_cloud":"🌧️","snow_cloud":"🌨️","lightning":"🌩️","lightning_cloud":"🌩️","tornado":"🌪️","tornado_cloud":"🌪️","fog":"🌫️","wind_blowing_face":"🌬️","hotdog":"🌭","taco":"🌮","burrito":"🌯","chestnut":"🌰","seedling":"🌱","evergreen_tree":"🌲","deciduous_tree":"🌳","palm_tree":"🌴","cactus":"🌵","hot_pepper":"🌶️","tulip":"🌷","cherry_blossom":"🌸","rose":"🌹","hibiscus":"🌺","sunflower":"🌻","blossom":"🌼","corn":"🌽","ear_of_rice":"🌾","herb":"🌿","four_leaf_clover":"🍀","maple_leaf":"🍁","fallen_leaf":"🍂","leaves":"🍃","mushroom":"🍄","tomato":"🍅","eggplant":"🍆","grapes":"🍇","melon":"🍈","watermelon":"🍉","tangerine":"🍊","lemon":"🍋","banana":"🍌","pineapple":"🍍","apple":"🍎","green_apple":"🍏","pear":"🍐","peach":"🍑","cherries":"🍒","strawberry":"🍓","hamburger":"🍔","pizza":"🍕","meat_on_bone":"🍖","poultry_leg":"🍗","rice_cracker":"🍘","rice_ball":"🍙","rice":"🍚","curry":"🍛","ramen":"🍜","spaghetti":"🍝","bread":"🍞","fries":"🍟","sweet_potato":"🍠","dango":"🍡","oden":"🍢","sushi":"🍣","fried_shrimp":"🍤","fish_cake":"🍥","icecream":"🍦","shaved_ice":"🍧","ice_cream":"🍨","doughnut":"🍩","cookie":"🍪","chocolate_bar":"🍫","candy":"🍬","lollipop":"🍭","custard":"🍮","honey_pot":"🍯","cake":"🍰","bento":"🍱","stew":"🍲","fried_egg":"🍳","cooking":"🍳","fork_and_knife":"🍴","tea":"🍵","sake":"🍶","wine_glass":"🍷","cocktail":"🍸","tropical_drink":"🍹","beer":"🍺","beers":"🍻","baby_bottle":"🍼","knife_fork_plate":"🍽️","champagne":"🍾","popcorn":"🍿","ribbon":"🎀","gift":"🎁","birthday":"🎂","jack_o_lantern":"🎃","christmas_tree":"🎄","santa":"🎅","fireworks":"🎆","sparkler":"🎇","balloon":"🎈","tada":"🎉","confetti_ball":"🎊","tanabata_tree":"🎋","crossed_flags":"🎌","bamboo":"🎍","dolls":"🎎","flags":"🎏","wind_chime":"🎐","rice_scene":"🎑","school_satchel":"🎒","mortar_board":"🎓","medal":"🎖️","reminder_ribbon":"🎗️","studio_microphone":"🎙️","level_slider":"🎚️","control_knobs":"🎛️","film_frames":"🎞️","admission_tickets":"🎟️","carousel_horse":"🎠","ferris_wheel":"🎡","roller_coaster":"🎢","fishing_pole_and_fish":"🎣","microphone":"🎤","movie_camera":"🎥","cinema":"🎦","headphones":"🎧","art":"🎨","tophat":"🎩","circus_tent":"🎪","ticket":"🎫","clapper":"🎬","performing_arts":"🎭","video_game":"🎮","dart":"🎯","slot_machine":"🎰","8ball":"🎱","game_die":"🎲","bowling":"🎳","flower_playing_cards":"🎴","musical_note":"🎵","notes":"🎶","saxophone":"🎷","guitar":"🎸","musical_keyboard":"🎹","trumpet":"🎺","violin":"🎻","musical_score":"🎼","running_shirt_with_sash":"🎽","tennis":"🎾","ski":"🎿","basketball":"🏀","checkered_flag":"🏁","snowboarder":"🏂","woman-running":"🏃‍♀️","man-running":"🏃‍♂️","runner":"🏃‍♂️","running":"🏃‍♂️","woman-surfing":"🏄‍♀️","man-surfing":"🏄‍♂️","surfer":"🏄‍♂️","sports_medal":"🏅","trophy":"🏆","horse_racing":"🏇","football":"🏈","rugby_football":"🏉","woman-swimming":"🏊‍♀️","man-swimming":"🏊‍♂️","swimmer":"🏊‍♂️","woman-lifting-weights":"🏋️‍♀️","man-lifting-weights":"🏋️‍♂️","weight_lifter":"🏋️‍♂️","woman-golfing":"🏌️‍♀️","man-golfing":"🏌️‍♂️","golfer":"🏌️‍♂️","racing_motorcycle":"🏍️","racing_car":"🏎️","cricket_bat_and_ball":"🏏","volleyball":"🏐","field_hockey_stick_and_ball":"🏑","ice_hockey_stick_and_puck":"🏒","table_tennis_paddle_and_ball":"🏓","snow_capped_mountain":"🏔️","camping":"🏕️","beach_with_umbrella":"🏖️","building_construction":"🏗️","house_buildings":"🏘️","cityscape":"🏙️","derelict_house_building":"🏚️","classical_building":"🏛️","desert":"🏜️","desert_island":"🏝️","national_park":"🏞️","stadium":"🏟️","house":"🏠","house_with_garden":"🏡","office":"🏢","post_office":"🏣","european_post_office":"🏤","hospital":"🏥","bank":"🏦","atm":"🏧","hotel":"🏨","love_hotel":"🏩","convenience_store":"🏪","school":"🏫","department_store":"🏬","factory":"🏭","izakaya_lantern":"🏮","lantern":"🏮","japanese_castle":"🏯","european_castle":"🏰","rainbow-flag":"🏳️‍🌈","transgender_flag":"🏳️‍⚧️","waving_white_flag":"🏳️","pirate_flag":"🏴‍☠️","flag-england":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","flag-scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","flag-wales":"🏴󠁧󠁢󠁷󠁬󠁳󠁿","waving_black_flag":"🏴","rosette":"🏵️","label":"🏷️","badminton_racquet_and_shuttlecock":"🏸","bow_and_arrow":"🏹","amphora":"🏺","skin-tone-2":"🏻","skin-tone-3":"🏼","skin-tone-4":"🏽","skin-tone-5":"🏾","skin-tone-6":"🏿","rat":"🐀","mouse2":"🐁","ox":"🐂","water_buffalo":"🐃","cow2":"🐄","tiger2":"🐅","leopard":"🐆","rabbit2":"🐇","black_cat":"🐈‍⬛","cat2":"🐈","dragon":"🐉","crocodile":"🐊","whale2":"🐋","snail":"🐌","snake":"🐍","racehorse":"🐎","ram":"🐏","goat":"🐐","sheep":"🐑","monkey":"🐒","rooster":"🐓","chicken":"🐔","service_dog":"🐕‍🦺","dog2":"🐕","pig2":"🐖","boar":"🐗","elephant":"🐘","octopus":"🐙","shell":"🐚","bug":"🐛","ant":"🐜","bee":"🐝","honeybee":"🐝","ladybug":"🐞","lady_beetle":"🐞","fish":"🐟","tropical_fish":"🐠","blowfish":"🐡","turtle":"🐢","hatching_chick":"🐣","baby_chick":"🐤","hatched_chick":"🐥","bird":"🐦","penguin":"🐧","koala":"🐨","poodle":"🐩","dromedary_camel":"🐪","camel":"🐫","dolphin":"🐬","flipper":"🐬","mouse":"🐭","cow":"🐮","tiger":"🐯","rabbit":"🐰","cat":"🐱","dragon_face":"🐲","whale":"🐳","horse":"🐴","monkey_face":"🐵","dog":"🐶","pig":"🐷","frog":"🐸","hamster":"🐹","wolf":"🐺","polar_bear":"🐻‍❄️","bear":"🐻","panda_face":"🐼","pig_nose":"🐽","feet":"🐾","paw_prints":"🐾","chipmunk":"🐿️","eyes":"👀","eye-in-speech-bubble":"👁️‍🗨️","eye":"👁️","ear":"👂","nose":"👃","lips":"👄","tongue":"👅","point_up_2":"👆","point_down":"👇","point_left":"👈","point_right":"👉","facepunch":"👊","punch":"👊","wave":"👋","ok_hand":"👌","+1":"👍","thumbsup":"👍","-1":"👎","thumbsdown":"👎","clap":"👏","open_hands":"👐","crown":"👑","womans_hat":"👒","eyeglasses":"👓","necktie":"👔","shirt":"👕","tshirt":"👕","jeans":"👖","dress":"👗","kimono":"👘","bikini":"👙","womans_clothes":"👚","purse":"👛","handbag":"👜","pouch":"👝","mans_shoe":"👞","shoe":"👞","athletic_shoe":"👟","high_heel":"👠","sandal":"👡","boot":"👢","footprints":"👣","bust_in_silhouette":"👤","busts_in_silhouette":"👥","boy":"👦","girl":"👧","male-farmer":"👨‍🌾","male-cook":"👨‍🍳","man_feeding_baby":"👨‍🍼","male-student":"👨‍🎓","male-singer":"👨‍🎤","male-artist":"👨‍🎨","male-teacher":"👨‍🏫","male-factory-worker":"👨‍🏭","man-boy-boy":"👨‍👦‍👦","man-boy":"👨‍👦","man-girl-boy":"👨‍👧‍👦","man-girl-girl":"👨‍👧‍👧","man-girl":"👨‍👧","man-man-boy":"👨‍👨‍👦","man-man-boy-boy":"👨‍👨‍👦‍👦","man-man-girl":"👨‍👨‍👧","man-man-girl-boy":"👨‍👨‍👧‍👦","man-man-girl-girl":"👨‍👨‍👧‍👧","man-woman-boy":"👨‍👩‍👦","family":"👨‍👩‍👦","man-woman-boy-boy":"👨‍👩‍👦‍👦","man-woman-girl":"👨‍👩‍👧","man-woman-girl-boy":"👨‍👩‍👧‍👦","man-woman-girl-girl":"👨‍👩‍👧‍👧","male-technologist":"👨‍💻","male-office-worker":"👨‍💼","male-mechanic":"👨‍🔧","male-scientist":"👨‍🔬","male-astronaut":"👨‍🚀","male-firefighter":"👨‍🚒","man_with_probing_cane":"👨‍🦯","red_haired_man":"👨‍🦰","curly_haired_man":"👨‍🦱","bald_man":"👨‍🦲","white_haired_man":"👨‍🦳","man_in_motorized_wheelchair":"👨‍🦼","man_in_manual_wheelchair":"👨‍🦽","male-doctor":"👨‍⚕️","male-judge":"👨‍⚖️","male-pilot":"👨‍✈️","man-heart-man":"👨‍❤️‍👨","man-kiss-man":"👨‍❤️‍💋‍👨","man":"👨","female-farmer":"👩‍🌾","female-cook":"👩‍🍳","woman_feeding_baby":"👩‍🍼","female-student":"👩‍🎓","female-singer":"👩‍🎤","female-artist":"👩‍🎨","female-teacher":"👩‍🏫","female-factory-worker":"👩‍🏭","woman-boy-boy":"👩‍👦‍👦","woman-boy":"👩‍👦","woman-girl-boy":"👩‍👧‍👦","woman-girl-girl":"👩‍👧‍👧","woman-girl":"👩‍👧","woman-woman-boy":"👩‍👩‍👦","woman-woman-boy-boy":"👩‍👩‍👦‍👦","woman-woman-girl":"👩‍👩‍👧","woman-woman-girl-boy":"👩‍👩‍👧‍👦","woman-woman-girl-girl":"👩‍👩‍👧‍👧","female-technologist":"👩‍💻","female-office-worker":"👩‍💼","female-mechanic":"👩‍🔧","female-scientist":"👩‍🔬","female-astronaut":"👩‍🚀","female-firefighter":"👩‍🚒","woman_with_probing_cane":"👩‍🦯","red_haired_woman":"👩‍🦰","curly_haired_woman":"👩‍🦱","bald_woman":"👩‍🦲","white_haired_woman":"👩‍🦳","woman_in_motorized_wheelchair":"👩‍🦼","woman_in_manual_wheelchair":"👩‍🦽","female-doctor":"👩‍⚕️","female-judge":"👩‍⚖️","female-pilot":"👩‍✈️","woman-heart-man":"👩‍❤️‍👨","woman-heart-woman":"👩‍❤️‍👩","woman-kiss-man":"👩‍❤️‍💋‍👨","woman-kiss-woman":"👩‍❤️‍💋‍👩","woman":"👩","man_and_woman_holding_hands":"👫","woman_and_man_holding_hands":"👫","couple":"👫","two_men_holding_hands":"👬","men_holding_hands":"👬","two_women_holding_hands":"👭","women_holding_hands":"👭","female-police-officer":"👮‍♀️","male-police-officer":"👮‍♂️","cop":"👮‍♂️","women-with-bunny-ears-partying":"👯‍♀️","woman-with-bunny-ears-partying":"👯‍♀️","dancers":"👯‍♀️","men-with-bunny-ears-partying":"👯‍♂️","man-with-bunny-ears-partying":"👯‍♂️","woman_with_veil":"👰‍♀️","man_with_veil":"👰‍♂️","bride_with_veil":"👰","blond-haired-woman":"👱‍♀️","blond-haired-man":"👱‍♂️","person_with_blond_hair":"👱‍♂️","man_with_gua_pi_mao":"👲","woman-wearing-turban":"👳‍♀️","man-wearing-turban":"👳‍♂️","man_with_turban":"👳‍♂️","older_man":"👴","older_woman":"👵","baby":"👶","female-construction-worker":"👷‍♀️","male-construction-worker":"👷‍♂️","construction_worker":"👷‍♂️","princess":"👸","japanese_ogre":"👹","japanese_goblin":"👺","ghost":"👻","angel":"👼","alien":"👽","space_invader":"👾","imp":"👿","skull":"💀","woman-tipping-hand":"💁‍♀️","information_desk_person":"💁‍♀️","man-tipping-hand":"💁‍♂️","female-guard":"💂‍♀️","male-guard":"💂‍♂️","guardsman":"💂‍♂️","dancer":"💃","lipstick":"💄","nail_care":"💅","woman-getting-massage":"💆‍♀️","massage":"💆‍♀️","man-getting-massage":"💆‍♂️","woman-getting-haircut":"💇‍♀️","haircut":"💇‍♀️","man-getting-haircut":"💇‍♂️","barber":"💈","syringe":"💉","pill":"💊","kiss":"💋","love_letter":"💌","ring":"💍","gem":"💎","couplekiss":"💏","bouquet":"💐","couple_with_heart":"💑","wedding":"💒","heartbeat":"💓","broken_heart":"💔","two_hearts":"💕","sparkling_heart":"💖","heartpulse":"💗","cupid":"💘","blue_heart":"💙","green_heart":"💚","yellow_heart":"💛","purple_heart":"💜","gift_heart":"💝","revolving_hearts":"💞","heart_decoration":"💟","diamond_shape_with_a_dot_inside":"💠","bulb":"💡","anger":"💢","bomb":"💣","zzz":"💤","boom":"💥","collision":"💥","sweat_drops":"💦","droplet":"💧","dash":"💨","hankey":"💩","poop":"💩","shit":"💩","muscle":"💪","dizzy":"💫","speech_balloon":"💬","thought_balloon":"💭","white_flower":"💮","moneybag":"💰","currency_exchange":"💱","heavy_dollar_sign":"💲","credit_card":"💳","yen":"💴","dollar":"💵","euro":"💶","pound":"💷","money_with_wings":"💸","chart":"💹","seat":"💺","computer":"💻","briefcase":"💼","minidisc":"💽","floppy_disk":"💾","cd":"💿","dvd":"📀","file_folder":"📁","open_file_folder":"📂","page_with_curl":"📃","page_facing_up":"📄","date":"📅","calendar":"📆","card_index":"📇","chart_with_upwards_trend":"📈","chart_with_downwards_trend":"📉","bar_chart":"📊","clipboard":"📋","pushpin":"📌","round_pushpin":"📍","paperclip":"📎","straight_ruler":"📏","triangular_ruler":"📐","bookmark_tabs":"📑","ledger":"📒","notebook":"📓","notebook_with_decorative_cover":"📔","closed_book":"📕","book":"📖","open_book":"📖","green_book":"📗","blue_book":"📘","orange_book":"📙","books":"📚","name_badge":"📛","scroll":"📜","memo":"📝","pencil":"📝","telephone_receiver":"📞","pager":"📟","fax":"📠","satellite_antenna":"📡","loudspeaker":"📢","mega":"📣","outbox_tray":"📤","inbox_tray":"📥","package":"📦","e-mail":"📧","incoming_envelope":"📨","envelope_with_arrow":"📩","mailbox_closed":"📪","mailbox":"📫","mailbox_with_mail":"📬","mailbox_with_no_mail":"📭","postbox":"📮","postal_horn":"📯","newspaper":"📰","iphone":"📱","calling":"📲","vibration_mode":"📳","mobile_phone_off":"📴","no_mobile_phones":"📵","signal_strength":"📶","camera":"📷","camera_with_flash":"📸","video_camera":"📹","tv":"📺","radio":"📻","vhs":"📼","film_projector":"📽️","prayer_beads":"📿","twisted_rightwards_arrows":"🔀","repeat":"🔁","repeat_one":"🔂","arrows_clockwise":"🔃","arrows_counterclockwise":"🔄","low_brightness":"🔅","high_brightness":"🔆","mute":"🔇","speaker":"🔈","sound":"🔉","loud_sound":"🔊","battery":"🔋","electric_plug":"🔌","mag":"🔍","mag_right":"🔎","lock_with_ink_pen":"🔏","closed_lock_with_key":"🔐","key":"🔑","lock":"🔒","unlock":"🔓","bell":"🔔","no_bell":"🔕","bookmark":"🔖","link":"🔗","radio_button":"🔘","back":"🔙","end":"🔚","on":"🔛","soon":"🔜","top":"🔝","underage":"🔞","keycap_ten":"🔟","capital_abcd":"🔠","abcd":"🔡","symbols":"🔣","abc":"🔤","fire":"🔥","flashlight":"🔦","wrench":"🔧","hammer":"🔨","nut_and_bolt":"🔩","hocho":"🔪","knife":"🔪","gun":"🔫","microscope":"🔬","telescope":"🔭","crystal_ball":"🔮","six_pointed_star":"🔯","beginner":"🔰","trident":"🔱","black_square_button":"🔲","white_square_button":"🔳","red_circle":"🔴","large_blue_circle":"🔵","large_orange_diamond":"🔶","large_blue_diamond":"🔷","small_orange_diamond":"🔸","small_blue_diamond":"🔹","small_red_triangle":"🔺","small_red_triangle_down":"🔻","arrow_up_small":"🔼","arrow_down_small":"🔽","om_symbol":"🕉️","dove_of_peace":"🕊️","kaaba":"🕋","mosque":"🕌","synagogue":"🕍","menorah_with_nine_branches":"🕎","clock1":"🕐","clock2":"🕑","clock3":"🕒","clock4":"🕓","clock5":"🕔","clock6":"🕕","clock7":"🕖","clock8":"🕗","clock9":"🕘","clock10":"🕙","clock11":"🕚","clock12":"🕛","clock130":"🕜","clock230":"🕝","clock330":"🕞","clock430":"🕟","clock530":"🕠","clock630":"🕡","clock730":"🕢","clock830":"🕣","clock930":"🕤","clock1030":"🕥","clock1130":"🕦","clock1230":"🕧","candle":"🕯️","mantelpiece_clock":"🕰️","hole":"🕳️","man_in_business_suit_levitating":"🕴️","female-detective":"🕵️‍♀️","male-detective":"🕵️‍♂️","sleuth_or_spy":"🕵️‍♂️","dark_sunglasses":"🕶️","spider":"🕷️","spider_web":"🕸️","joystick":"🕹️","man_dancing":"🕺","linked_paperclips":"🖇️","lower_left_ballpoint_pen":"🖊️","lower_left_fountain_pen":"🖋️","lower_left_paintbrush":"🖌️","lower_left_crayon":"🖍️","raised_hand_with_fingers_splayed":"🖐️","middle_finger":"🖕","reversed_hand_with_middle_finger_extended":"🖕","spock-hand":"🖖","black_heart":"🖤","desktop_computer":"🖥️","printer":"🖨️","three_button_mouse":"🖱️","trackball":"🖲️","frame_with_picture":"🖼️","card_index_dividers":"🗂️","card_file_box":"🗃️","file_cabinet":"🗄️","wastebasket":"🗑️","spiral_note_pad":"🗒️","spiral_calendar_pad":"🗓️","compression":"🗜️","old_key":"🗝️","rolled_up_newspaper":"🗞️","dagger_knife":"🗡️","speaking_head_in_silhouette":"🗣️","left_speech_bubble":"🗨️","right_anger_bubble":"🗯️","ballot_box_with_ballot":"🗳️","world_map":"🗺️","mount_fuji":"🗻","tokyo_tower":"🗼","statue_of_liberty":"🗽","japan":"🗾","moyai":"🗿","grinning":"😀","grin":"😁","joy":"😂","smiley":"😃","smile":"😄","sweat_smile":"😅","laughing":"😆","satisfied":"😆","innocent":"😇","smiling_imp":"😈","wink":"😉","blush":"😊","yum":"😋","relieved":"😌","heart_eyes":"😍","sunglasses":"😎","smirk":"😏","neutral_face":"😐","expressionless":"😑","unamused":"😒","sweat":"😓","pensive":"😔","confused":"😕","confounded":"😖","kissing":"😗","kissing_heart":"😘","kissing_smiling_eyes":"😙","kissing_closed_eyes":"😚","stuck_out_tongue":"😛","stuck_out_tongue_winking_eye":"😜","stuck_out_tongue_closed_eyes":"😝","disappointed":"😞","worried":"😟","angry":"😠","rage":"😡","cry":"😢","persevere":"😣","triumph":"😤","disappointed_relieved":"😥","frowning":"😦","anguished":"😧","fearful":"😨","weary":"😩","sleepy":"😪","tired_face":"😫","grimacing":"😬","sob":"😭","face_exhaling":"😮‍💨","open_mouth":"😮","hushed":"😯","cold_sweat":"😰","scream":"😱","astonished":"😲","flushed":"😳","sleeping":"😴","face_with_spiral_eyes":"😵‍💫","dizzy_face":"😵","face_in_clouds":"😶‍🌫️","no_mouth":"😶","mask":"😷","smile_cat":"😸","joy_cat":"😹","smiley_cat":"😺","heart_eyes_cat":"😻","smirk_cat":"😼","kissing_cat":"😽","pouting_cat":"😾","crying_cat_face":"😿","scream_cat":"🙀","slightly_frowning_face":"🙁","slightly_smiling_face":"🙂","upside_down_face":"🙃","face_with_rolling_eyes":"🙄","woman-gesturing-no":"🙅‍♀️","no_good":"🙅‍♀️","man-gesturing-no":"🙅‍♂️","woman-gesturing-ok":"🙆‍♀️","ok_woman":"🙆‍♀️","man-gesturing-ok":"🙆‍♂️","woman-bowing":"🙇‍♀️","man-bowing":"🙇‍♂️","bow":"🙇‍♂️","see_no_evil":"🙈","hear_no_evil":"🙉","speak_no_evil":"🙊","woman-raising-hand":"🙋‍♀️","raising_hand":"🙋‍♀️","man-raising-hand":"🙋‍♂️","raised_hands":"🙌","woman-frowning":"🙍‍♀️","person_frowning":"🙍‍♀️","man-frowning":"🙍‍♂️","woman-pouting":"🙎‍♀️","person_with_pouting_face":"🙎‍♀️","man-pouting":"🙎‍♂️","pray":"🙏","rocket":"🚀","helicopter":"🚁","steam_locomotive":"🚂","railway_car":"🚃","bullettrain_side":"🚄","bullettrain_front":"🚅","train2":"🚆","metro":"🚇","light_rail":"🚈","station":"🚉","tram":"🚊","train":"🚋","bus":"🚌","oncoming_bus":"🚍","trolleybus":"🚎","busstop":"🚏","minibus":"🚐","ambulance":"🚑","fire_engine":"🚒","police_car":"🚓","oncoming_police_car":"🚔","taxi":"🚕","oncoming_taxi":"🚖","car":"🚗","red_car":"🚗","oncoming_automobile":"🚘","blue_car":"🚙","truck":"🚚","articulated_lorry":"🚛","tractor":"🚜","monorail":"🚝","mountain_railway":"🚞","suspension_railway":"🚟","mountain_cableway":"🚠","aerial_tramway":"🚡","ship":"🚢","woman-rowing-boat":"🚣‍♀️","man-rowing-boat":"🚣‍♂️","rowboat":"🚣‍♂️","speedboat":"🚤","traffic_light":"🚥","vertical_traffic_light":"🚦","construction":"🚧","rotating_light":"🚨","triangular_flag_on_post":"🚩","door":"🚪","no_entry_sign":"🚫","smoking":"🚬","no_smoking":"🚭","put_litter_in_its_place":"🚮","do_not_litter":"🚯","potable_water":"🚰","non-potable_water":"🚱","bike":"🚲","no_bicycles":"🚳","woman-biking":"🚴‍♀️","man-biking":"🚴‍♂️","bicyclist":"🚴‍♂️","woman-mountain-biking":"🚵‍♀️","man-mountain-biking":"🚵‍♂️","mountain_bicyclist":"🚵‍♂️","woman-walking":"🚶‍♀️","man-walking":"🚶‍♂️","walking":"🚶‍♂️","no_pedestrians":"🚷","children_crossing":"🚸","mens":"🚹","womens":"🚺","restroom":"🚻","baby_symbol":"🚼","toilet":"🚽","wc":"🚾","shower":"🚿","bath":"🛀","bathtub":"🛁","passport_control":"🛂","customs":"🛃","baggage_claim":"🛄","left_luggage":"🛅","couch_and_lamp":"🛋️","sleeping_accommodation":"🛌","shopping_bags":"🛍️","bellhop_bell":"🛎️","bed":"🛏️","place_of_worship":"🛐","octagonal_sign":"🛑","shopping_trolley":"🛒","hindu_temple":"🛕","hut":"🛖","elevator":"🛗","hammer_and_wrench":"🛠️","shield":"🛡️","oil_drum":"🛢️","motorway":"🛣️","railway_track":"🛤️","motor_boat":"🛥️","small_airplane":"🛩️","airplane_departure":"🛫","airplane_arriving":"🛬","satellite":"🛰️","passenger_ship":"🛳️","scooter":"🛴","motor_scooter":"🛵","canoe":"🛶","sled":"🛷","flying_saucer":"🛸","skateboard":"🛹","auto_rickshaw":"🛺","pickup_truck":"🛻","roller_skate":"🛼","large_orange_circle":"🟠","large_yellow_circle":"🟡","large_green_circle":"🟢","large_purple_circle":"🟣","large_brown_circle":"🟤","large_red_square":"🟥","large_blue_square":"🟦","large_orange_square":"🟧","large_yellow_square":"🟨","large_green_square":"🟩","large_purple_square":"🟪","large_brown_square":"🟫","pinched_fingers":"🤌","white_heart":"🤍","brown_heart":"🤎","pinching_hand":"🤏","zipper_mouth_face":"🤐","money_mouth_face":"🤑","face_with_thermometer":"🤒","nerd_face":"🤓","thinking_face":"🤔","face_with_head_bandage":"🤕","robot_face":"🤖","hugging_face":"🤗","the_horns":"🤘","sign_of_the_horns":"🤘","call_me_hand":"🤙","raised_back_of_hand":"🤚","left-facing_fist":"🤛","right-facing_fist":"🤜","handshake":"🤝","crossed_fingers":"🤞","hand_with_index_and_middle_fingers_crossed":"🤞","i_love_you_hand_sign":"🤟","face_with_cowboy_hat":"🤠","clown_face":"🤡","nauseated_face":"🤢","rolling_on_the_floor_laughing":"🤣","drooling_face":"🤤","lying_face":"🤥","woman-facepalming":"🤦‍♀️","man-facepalming":"🤦‍♂️","face_palm":"🤦","sneezing_face":"🤧","face_with_raised_eyebrow":"🤨","face_with_one_eyebrow_raised":"🤨","star-struck":"🤩","grinning_face_with_star_eyes":"🤩","zany_face":"🤪","grinning_face_with_one_large_and_one_small_eye":"🤪","shushing_face":"🤫","face_with_finger_covering_closed_lips":"🤫","face_with_symbols_on_mouth":"🤬","serious_face_with_symbols_covering_mouth":"🤬","face_with_hand_over_mouth":"🤭","smiling_face_with_smiling_eyes_and_hand_covering_mouth":"🤭","face_vomiting":"🤮","face_with_open_mouth_vomiting":"🤮","exploding_head":"🤯","shocked_face_with_exploding_head":"🤯","pregnant_woman":"🤰","breast-feeding":"🤱","palms_up_together":"🤲","selfie":"🤳","prince":"🤴","woman_in_tuxedo":"🤵‍♀️","man_in_tuxedo":"🤵‍♂️","person_in_tuxedo":"🤵","mrs_claus":"🤶","mother_christmas":"🤶","woman-shrugging":"🤷‍♀️","man-shrugging":"🤷‍♂️","shrug":"🤷","woman-cartwheeling":"🤸‍♀️","man-cartwheeling":"🤸‍♂️","person_doing_cartwheel":"🤸","woman-juggling":"🤹‍♀️","man-juggling":"🤹‍♂️","juggling":"🤹","fencer":"🤺","woman-wrestling":"🤼‍♀️","man-wrestling":"🤼‍♂️","wrestlers":"🤼","woman-playing-water-polo":"🤽‍♀️","man-playing-water-polo":"🤽‍♂️","water_polo":"🤽","woman-playing-handball":"🤾‍♀️","man-playing-handball":"🤾‍♂️","handball":"🤾","diving_mask":"🤿","wilted_flower":"🥀","drum_with_drumsticks":"🥁","clinking_glasses":"🥂","tumbler_glass":"🥃","spoon":"🥄","goal_net":"🥅","first_place_medal":"🥇","second_place_medal":"🥈","third_place_medal":"🥉","boxing_glove":"🥊","martial_arts_uniform":"🥋","curling_stone":"🥌","lacrosse":"🥍","softball":"🥎","flying_disc":"🥏","croissant":"🥐","avocado":"🥑","cucumber":"🥒","bacon":"🥓","potato":"🥔","carrot":"🥕","baguette_bread":"🥖","green_salad":"🥗","shallow_pan_of_food":"🥘","stuffed_flatbread":"🥙","egg":"🥚","glass_of_milk":"🥛","peanuts":"🥜","kiwifruit":"🥝","pancakes":"🥞","dumpling":"🥟","fortune_cookie":"🥠","takeout_box":"🥡","chopsticks":"🥢","bowl_with_spoon":"🥣","cup_with_straw":"🥤","coconut":"🥥","broccoli":"🥦","pie":"🥧","pretzel":"🥨","cut_of_meat":"🥩","sandwich":"🥪","canned_food":"🥫","leafy_green":"🥬","mango":"🥭","moon_cake":"🥮","bagel":"🥯","smiling_face_with_3_hearts":"🥰","yawning_face":"🥱","smiling_face_with_tear":"🥲","partying_face":"🥳","woozy_face":"🥴","hot_face":"🥵","cold_face":"🥶","ninja":"🥷","disguised_face":"🥸","pleading_face":"🥺","sari":"🥻","lab_coat":"🥼","goggles":"🥽","hiking_boot":"🥾","womans_flat_shoe":"🥿","crab":"🦀","lion_face":"🦁","scorpion":"🦂","turkey":"🦃","unicorn_face":"🦄","eagle":"🦅","duck":"🦆","bat":"🦇","shark":"🦈","owl":"🦉","fox_face":"🦊","butterfly":"🦋","deer":"🦌","gorilla":"🦍","lizard":"🦎","rhinoceros":"🦏","shrimp":"🦐","squid":"🦑","giraffe_face":"🦒","zebra_face":"🦓","hedgehog":"🦔","sauropod":"🦕","t-rex":"🦖","cricket":"🦗","kangaroo":"🦘","llama":"🦙","peacock":"🦚","hippopotamus":"🦛","parrot":"🦜","raccoon":"🦝","lobster":"🦞","mosquito":"🦟","microbe":"🦠","badger":"🦡","swan":"🦢","mammoth":"🦣","dodo":"🦤","sloth":"🦥","otter":"🦦","orangutan":"🦧","skunk":"🦨","flamingo":"🦩","oyster":"🦪","beaver":"🦫","bison":"🦬","seal":"🦭","guide_dog":"🦮","probing_cane":"🦯","bone":"🦴","leg":"🦵","foot":"🦶","tooth":"🦷","female_superhero":"🦸‍♀️","male_superhero":"🦸‍♂️","superhero":"🦸","female_supervillain":"🦹‍♀️","male_supervillain":"🦹‍♂️","supervillain":"🦹","safety_vest":"🦺","ear_with_hearing_aid":"🦻","motorized_wheelchair":"🦼","manual_wheelchair":"🦽","mechanical_arm":"🦾","mechanical_leg":"🦿","cheese_wedge":"🧀","cupcake":"🧁","salt":"🧂","beverage_box":"🧃","garlic":"🧄","onion":"🧅","falafel":"🧆","waffle":"🧇","butter":"🧈","mate_drink":"🧉","ice_cube":"🧊","bubble_tea":"🧋","woman_standing":"🧍‍♀️","man_standing":"🧍‍♂️","standing_person":"🧍","woman_kneeling":"🧎‍♀️","man_kneeling":"🧎‍♂️","kneeling_person":"🧎","deaf_woman":"🧏‍♀️","deaf_man":"🧏‍♂️","deaf_person":"🧏","face_with_monocle":"🧐","farmer":"🧑‍🌾","cook":"🧑‍🍳","person_feeding_baby":"🧑‍🍼","mx_claus":"🧑‍🎄","student":"🧑‍🎓","singer":"🧑‍🎤","artist":"🧑‍🎨","teacher":"🧑‍🏫","factory_worker":"🧑‍🏭","technologist":"🧑‍💻","office_worker":"🧑‍💼","mechanic":"🧑‍🔧","scientist":"🧑‍🔬","astronaut":"🧑‍🚀","firefighter":"🧑‍🚒","people_holding_hands":"🧑‍🤝‍🧑","person_with_probing_cane":"🧑‍🦯","red_haired_person":"🧑‍🦰","curly_haired_person":"🧑‍🦱","bald_person":"🧑‍🦲","white_haired_person":"🧑‍🦳","person_in_motorized_wheelchair":"🧑‍🦼","person_in_manual_wheelchair":"🧑‍🦽","health_worker":"🧑‍⚕️","judge":"🧑‍⚖️","pilot":"🧑‍✈️","adult":"🧑","child":"🧒","older_adult":"🧓","woman_with_beard":"🧔‍♀️","man_with_beard":"🧔‍♂️","bearded_person":"🧔","person_with_headscarf":"🧕","woman_in_steamy_room":"🧖‍♀️","man_in_steamy_room":"🧖‍♂️","person_in_steamy_room":"🧖‍♂️","woman_climbing":"🧗‍♀️","person_climbing":"🧗‍♀️","man_climbing":"🧗‍♂️","woman_in_lotus_position":"🧘‍♀️","person_in_lotus_position":"🧘‍♀️","man_in_lotus_position":"🧘‍♂️","female_mage":"🧙‍♀️","mage":"🧙‍♀️","male_mage":"🧙‍♂️","female_fairy":"🧚‍♀️","fairy":"🧚‍♀️","male_fairy":"🧚‍♂️","female_vampire":"🧛‍♀️","vampire":"🧛‍♀️","male_vampire":"🧛‍♂️","mermaid":"🧜‍♀️","merman":"🧜‍♂️","merperson":"🧜‍♂️","female_elf":"🧝‍♀️","male_elf":"🧝‍♂️","elf":"🧝‍♂️","female_genie":"🧞‍♀️","male_genie":"🧞‍♂️","genie":"🧞‍♂️","female_zombie":"🧟‍♀️","male_zombie":"🧟‍♂️","zombie":"🧟‍♂️","brain":"🧠","orange_heart":"🧡","billed_cap":"🧢","scarf":"🧣","gloves":"🧤","coat":"🧥","socks":"🧦","red_envelope":"🧧","firecracker":"🧨","jigsaw":"🧩","test_tube":"🧪","petri_dish":"🧫","dna":"🧬","compass":"🧭","abacus":"🧮","fire_extinguisher":"🧯","toolbox":"🧰","bricks":"🧱","magnet":"🧲","luggage":"🧳","lotion_bottle":"🧴","thread":"🧵","yarn":"🧶","safety_pin":"🧷","teddy_bear":"🧸","broom":"🧹","basket":"🧺","roll_of_paper":"🧻","soap":"🧼","sponge":"🧽","receipt":"🧾","nazar_amulet":"🧿","ballet_shoes":"🩰","one-piece_swimsuit":"🩱","briefs":"🩲","shorts":"🩳","thong_sandal":"🩴","drop_of_blood":"🩸","adhesive_bandage":"🩹","stethoscope":"🩺","yo-yo":"🪀","kite":"🪁","parachute":"🪂","boomerang":"🪃","magic_wand":"🪄","pinata":"🪅","nesting_dolls":"🪆","ringed_planet":"🪐","chair":"🪑","razor":"🪒","axe":"🪓","diya_lamp":"🪔","banjo":"🪕","military_helmet":"🪖","accordion":"🪗","long_drum":"🪘","coin":"🪙","carpentry_saw":"🪚","screwdriver":"🪛","ladder":"🪜","hook":"🪝","mirror":"🪞","window":"🪟","plunger":"🪠","sewing_needle":"🪡","knot":"🪢","bucket":"🪣","mouse_trap":"🪤","toothbrush":"🪥","headstone":"🪦","placard":"🪧","rock":"🪨","fly":"🪰","worm":"🪱","beetle":"🪲","cockroach":"🪳","potted_plant":"🪴","wood":"🪵","feather":"🪶","anatomical_heart":"🫀","lungs":"🫁","people_hugging":"🫂","blueberries":"🫐","bell_pepper":"🫑","olive":"🫒","flatbread":"🫓","tamale":"🫔","fondue":"🫕","teapot":"🫖","bangbang":"‼️","interrobang":"⁉️","tm":"™️","information_source":"ℹ️","left_right_arrow":"↔️","arrow_up_down":"↕️","arrow_upper_left":"↖️","arrow_upper_right":"↗️","arrow_lower_right":"↘️","arrow_lower_left":"↙️","leftwards_arrow_with_hook":"↩️","arrow_right_hook":"↪️","watch":"⌚","hourglass":"⌛","keyboard":"⌨️","eject":"⏏️","fast_forward":"⏩","rewind":"⏪","arrow_double_up":"⏫","arrow_double_down":"⏬","black_right_pointing_double_triangle_with_vertical_bar":"⏭️","black_left_pointing_double_triangle_with_vertical_bar":"⏮️","black_right_pointing_triangle_with_double_vertical_bar":"⏯️","alarm_clock":"⏰","stopwatch":"⏱️","timer_clock":"⏲️","hourglass_flowing_sand":"⏳","double_vertical_bar":"⏸️","black_square_for_stop":"⏹️","black_circle_for_record":"⏺️","m":"Ⓜ️","black_small_square":"▪️","white_small_square":"▫️","arrow_forward":"▶️","arrow_backward":"◀️","white_medium_square":"◻️","black_medium_square":"◼️","white_medium_small_square":"◽","black_medium_small_square":"◾","sunny":"☀️","cloud":"☁️","umbrella":"☂️","snowman":"☃️","comet":"☄️","phone":"☎️","telephone":"☎️","ballot_box_with_check":"☑️","shamrock":"☘️","point_up":"☝️","skull_and_crossbones":"☠️","radioactive_sign":"☢️","biohazard_sign":"☣️","orthodox_cross":"☦️","star_and_crescent":"☪️","peace_symbol":"☮️","yin_yang":"☯️","wheel_of_dharma":"☸️","white_frowning_face":"☹️","relaxed":"☺️","female_sign":"♀️","male_sign":"♂️","gemini":"♊","cancer":"♋","leo":"♌","virgo":"♍","libra":"♎","scorpius":"♏","chess_pawn":"♟️","spades":"♠️","clubs":"♣️","hearts":"♥️","diamonds":"♦️","hotsprings":"♨️","recycle":"♻️","infinity":"♾️","wheelchair":"♿","hammer_and_pick":"⚒️","crossed_swords":"⚔️","medical_symbol":"⚕️","staff_of_aesculapius":"⚕️","scales":"⚖️","alembic":"⚗️","gear":"⚙️","atom_symbol":"⚛️","fleur_de_lis":"⚜️","warning":"⚠️","zap":"⚡","transgender_symbol":"⚧️","white_circle":"⚪","black_circle":"⚫","coffin":"⚰️","funeral_urn":"⚱️","soccer":"⚽","baseball":"⚾","snowman_without_snow":"⛄","partly_sunny":"⛅","thunder_cloud_and_rain":"⛈️","ophiuchus":"⛎","pick":"⛏️","helmet_with_white_cross":"⛑️","chains":"⛓️","no_entry":"⛔","shinto_shrine":"⛩️","church":"⛪","mountain":"⛰️","umbrella_on_ground":"⛱️","fountain":"⛲","golf":"⛳","ferry":"⛴️","boat":"⛵","sailboat":"⛵","skier":"⛷️","ice_skate":"⛸️","woman-bouncing-ball":"⛹️‍♀️","man-bouncing-ball":"⛹️‍♂️","person_with_ball":"⛹️‍♂️","tent":"⛺","fuelpump":"⛽","scissors":"✂️","airplane":"✈️","email":"✉️","envelope":"✉️","fist":"✊","hand":"✋","raised_hand":"✋","v":"✌️","writing_hand":"✍️","pencil2":"✏️","black_nib":"✒️","heavy_check_mark":"✔️","heavy_multiplication_x":"✖️","latin_cross":"✝️","star_of_david":"✡️","eight_spoked_asterisk":"✳️","eight_pointed_black_star":"✴️","snowflake":"❄️","sparkle":"❇️","x":"❌","negative_squared_cross_mark":"❎","heavy_heart_exclamation_mark_ornament":"❣️","heart_on_fire":"❤️‍🔥","mending_heart":"❤️‍🩹","heart":"❤️","arrow_right":"➡️","curly_loop":"➰","loop":"➿","arrow_heading_up":"⤴️","arrow_heading_down":"⤵️","arrow_left":"⬅️","arrow_up":"⬆️","arrow_down":"⬇️","black_large_square":"⬛","white_large_square":"⬜","star":"⭐","o":"⭕","wavy_dash":"〰️","part_alternation_mark":"〽️","congratulations":"㊗️","secret":"㊙️"}');

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/node module decorator */
/******/ (() => {
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************************!*\
  !*** ./client/src/integrations/emoji/index.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration-provider */ "./client/src/integrations/emoji/integration-provider.ts");

const entryPoints = {
    integrations: new _integration_provider__WEBPACK_IMPORTED_MODULE_0__.EmojiIntegrationProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FDWCxVQUFVLFVBQVUsTUFBTSxvQkFBb0IscUdBQXFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FDdkwsQ0FBQztLQUNGO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0NwS0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3pCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsaUNBQWlDLFdBQVc7VUFDNUM7VUFDQTs7Ozs7VUNQQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsR0FBRztVQUNIO1VBQ0E7VUFDQSxDQUFDOzs7OztVQ1BEOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNKa0U7QUFFM0QsTUFBTSxXQUFXLEdBQStDO0lBQ3RFLFlBQVksRUFBRSxJQUFJLDJFQUF3QixFQUFFO0NBQzVDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi93b3Jrc3BhY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19XZWFrTWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNjaWlUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VWYWx1ZXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3B5QXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFRhZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFZhbHVlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzVW5pY29kZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19pc01hc2tlZC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXRlcmF0b3JUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUtleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19ub2RlVXRpbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdW5pY29kZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N0cmluZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9rZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViRmFsc2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL3RvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9ub2RlLWVtb2ppL2luZGV4LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL25vZGUtZW1vamkvbGliL2Vtb2ppLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS9pbnRlZ3JhdGlvbi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vY2xpZW50L3NyYy9pbnRlZ3JhdGlvbnMvZW1vamkvdGVtcGxhdGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL3NldHRpbmdzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL3RlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vY2xpZW50L3NyYy90aGVtZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vY2xpZW50L3NyYy9pbnRlZ3JhdGlvbnMvZW1vamkvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKCgpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9ezcwMzooZSx0LG4pPT57bi5yKHQpLG4uZCh0LHtDTElBY3Rpb246KCk9PnAuUHQsQ0xJRmlsdGVyT3B0aW9uVHlwZTooKT0+cC5lbCxDTElUZW1wbGF0ZTooKT0+cC55VyxkZXJlZ2lzdGVyOigpPT50dCxoaWRlOigpPT5vdCxyZWdpc3RlcjooKT0+ZXQsc2hvdzooKT0+bnR9KTt2YXIgbz17fTtuLnIobyksbi5kKG8se3N1YnNjcmliZTooKT0+Y2V9KTt2YXIgcj17fTtuLnIociksbi5kKHIse2NyZWF0ZTooKT0+VWV9KTt2YXIgaT1uKDY3OCksYT1uKDUzMikscz1uKDE1MCk7Y29uc3QgYz1cImhvbWVcIjt2YXIgZDshZnVuY3Rpb24oZSl7ZS5Db21tYW5kcz1cImhvbWUtY29tbWFuZHNcIn0oZHx8KGQ9e30pKTt2YXIgdSxsPW4oODA2KSxwPShuKDI5OCksbig3NTgpKTtuKDExNCksbigxMDkpLG4oNDI3KTshZnVuY3Rpb24oZSl7ZVtlLkluaXRpYWw9MF09XCJJbml0aWFsXCIsZVtlLk9wZW49MV09XCJPcGVuXCIsZVtlLkNsb3NlPTJdPVwiQ2xvc2VcIn0odXx8KHU9e30pKTt2YXIgZj1uKDMxNik7Y29uc3QgZz1cImFsbFwiLHc9XCIwXCIsaD1cIjVcIix2PVwiNlwiLHk9KCk9Pnt9O2Z1bmN0aW9uIG0oZSx0KXtyZXR1cm4gZT9gJHtlfS0ke3R9YDp0fWZ1bmN0aW9uIFMoZSl7cmV0dXJuYF9fc2VhcmNoLSR7ZX0tdG9waWNfX2B9Y29uc3QgUD1uZXcgTWFwO2Z1bmN0aW9uIFcoZSx0KXtQLmhhcyhlKXx8UC5zZXQoZSxuZXcgU2V0KSxQLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gayhlLHQpe2NvbnN0IG49UC5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgQz1uZXcgTWFwO2Z1bmN0aW9uIEkoZSx0KXtDLmhhcyhlKXx8Qy5zZXQoZSxuZXcgU2V0KSxDLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gVChlLHQpe2NvbnN0IG49Qy5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgYj1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIEEoZSx0KXtiLmhhcyhlKXx8Yi5zZXQoZSxuZXcgTWFwKSxiLmdldChlKS5zZXQodC5pZCx0KTtjb25zdCBuPVAuZ2V0KGUpO2lmKCFuKXJldHVybjtjb25zdCBvPVsuLi5uXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKG8pfWFzeW5jIGZ1bmN0aW9uIEYoZSx0KXtjb25zdCBuPWIuZ2V0KGUpO2lmKCFuKXJldHVybjtuLmRlbGV0ZSh0KTtjb25zdCBvPUMuZ2V0KGUpO2lmKCFvKXJldHVybjtjb25zdCByPVsuLi5vXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKHIpfWZ1bmN0aW9uIFIoZSl7Y29uc3QgdD1iLmdldChlKTtyZXR1cm4gdD9bLi4udC52YWx1ZXMoKV06W119ZnVuY3Rpb24gRChlKXtjb25zdCB0PWIuZ2V0KGUpO3QmJnQuY2xlYXIoKX1mdW5jdGlvbiBCKGUsdCl7Y29uc3Qgbj1iLmdldChlKTtyZXR1cm4gbj9uLmdldCh0KTpudWxsfWZ1bmN0aW9uIEwoZSx0LG4pe3JldHVybnsuLi5lLGFjdGlvbjpufHx7Li4uZS5hY3Rpb25zWzBdLHRyaWdnZXI6Zi5weC5Vc2VyQWN0aW9ufSxkaXNwYXRjaGVySWRlbnRpdHk6dH19ZnVuY3Rpb24geChlLHQsbj1cImFzY2VuZGluZ1wiKXtjb25zdCBvPWV8fFtdO2lmKCF0Py5sZW5ndGgpcmV0dXJuIG87Y29uc3Qgcj1bXSxpPW5ldyBNYXA7dC5mb3JFYWNoKChlPT57aWYoZS5rZXkpcmV0dXJuIGkuc2V0KGUua2V5LGUpO3IucHVzaChlKX0pKTtsZXQgYT1vLm1hcCgoZT0+e2NvbnN0e2tleTp0fT1lO2lmKHQmJmkuaGFzKHQpKXtjb25zdCBlPWkuZ2V0KHQpO3JldHVybiBpLmRlbGV0ZSh0KSxlfXJldHVybiBlfSkpO3JldHVybiBhLnB1c2goLi4uaS52YWx1ZXMoKSwuLi5yKSxhPVwiYXNjZW5kaW5nXCI9PT1uP2Euc29ydCgoKGUsdCk9PihlPy5zY29yZT8/MS8wKS0odD8uc2NvcmU/PzEvMCkpKTphLnNvcnQoKChlLHQpPT4odD8uc2NvcmU/PzEvMCktKGU/LnNjb3JlPz8xLzApKSksYX1mdW5jdGlvbiBPKGUpe2NvbnN0IHQ9e307bGV0IG49W107bGV0IG89W107bGV0IHI9dS5Jbml0aWFsO3QuZ2V0U3RhdHVzPSgpPT5yLHQuZ2V0UmVzdWx0QnVmZmVyPSgpPT5uLHQuc2V0UmVzdWx0QnVmZmVyPWU9PntuPWUsbj8ubGVuZ3RoJiZ0Lm9uQ2hhbmdlKCl9LHQuZ2V0UmV2b2tlZEJ1ZmZlcj0oKT0+byx0LnNldFJldm9rZWRCdWZmZXI9ZT0+e289ZSxvPy5sZW5ndGgmJnQub25DaGFuZ2UoKX0sdC5vbkNoYW5nZT15O2NvbnN0IGk9e307cmV0dXJuIHQucmVzPWksaS5jbG9zZT0oKT0+e3IhPT11LkNsb3NlJiYocj11LkNsb3NlLHQub25DaGFuZ2UoKSl9LGkub3Blbj0oKT0+e3IhPT11Lk9wZW4mJihyPXUuT3Blbix0Lm9uQ2hhbmdlKCkpfSxpLnJlc3BvbmQ9bj0+e2NvbnN0IG89eCh0LmdldFJlc3VsdEJ1ZmZlcigpLG4sZSk7dC5zZXRSZXN1bHRCdWZmZXIobyl9LGkucmV2b2tlPSguLi5lKT0+e2NvbnN0IG49bmV3IFNldChlKSxvPXQuZ2V0UmVzdWx0QnVmZmVyKCkuZmlsdGVyKCgoe2tleTplfSk9Pntjb25zdCB0PW4uaGFzKGUpO3JldHVybiB0JiZuLmRlbGV0ZShlKSwhdH0pKTt0LnNldFJlc3VsdEJ1ZmZlcihvKSxuLnNpemUmJih0LmdldFJldm9rZWRCdWZmZXIoKS5mb3JFYWNoKChlPT5uLmFkZChlKSkpLHQuc2V0UmV2b2tlZEJ1ZmZlcihbLi4ubl0pKX0sdH1mdW5jdGlvbiBNKGUsdCxuKXtjb25zdCBvPW5ldyBTZXQ7bGV0IHI9ITE7cmV0dXJue2Nsb3NlOigpPT57cj0hMDtmb3IoY29uc3QgZSBvZiBvKWUoKX0scmVxOntpZDp0LHRvcGljOmUsLi4ubixjb250ZXh0Om4/LmNvbnRleHR8fHt9LG9uQ2xvc2U6ZT0+e28uYWRkKGUpLHImJmUoKX0scmVtb3ZlTGlzdGVuZXI6ZT0+e28uZGVsZXRlKGUpfX19fWZ1bmN0aW9uIEUoKXtyZXR1cm57bmFtZTpmaW4ubWUubmFtZSx1dWlkOmZpbi5tZS51dWlkfX1mdW5jdGlvbiBWKCl7bGV0IGU7dHJ5e2U9ZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCkuaWRlbnRpdHkudXVpZH1jYXRjaChlKXt9cmV0dXJuIGV9Y29uc3QgRz1cImRlcmVnaXN0ZXJlZCBvciBkb2VzIG5vdCBleGlzdFwiLHE9bmV3IEVycm9yKGBwcm92aWRlciAke0d9YCksXz1uZXcgRXJyb3IoXCJwcm92aWRlciB3aXRoIG5hbWUgYWxyZWFkeSBleGlzdHNcIiksSD1uZXcgRXJyb3IoXCJiYWQgcGF5bG9hZFwiKSwkPW5ldyBFcnJvcihcInN1YnNjcmlwdGlvbiByZWplY3RlZFwiKSxVPW5ldyBFcnJvcihgY2hhbm5lbCAke0d9YCksTj1uZXcgTWFwO2Z1bmN0aW9uIGooZSl7Y29uc3QgdD1YKGUpO2lmKHQpcmV0dXJuIHQ7dGhyb3cgVX1mdW5jdGlvbiBYKGUpe2NvbnN0IHQ9Ti5nZXQoZSk7aWYodClyZXR1cm4gdH1mdW5jdGlvbiBLKGUsdCl7Ti5zZXQoZSx0KX1mdW5jdGlvbiB6KGUpe2NvbnNvbGUuZXJyb3IoXCJPcGVuRmluIFNlYXJjaCBBUEk6IFwiLGUpfWNvbnN0IEo9bmV3IE1hcDtmdW5jdGlvbiBRKGUpe0ouaGFzKGUpfHxKLnNldChlLG5ldyBNYXApO2NvbnN0IHQ9Si5nZXQoZSk7cmV0dXJue2dldFJlcXVlc3RzRm9ySWRlbnRpdHk6ZT0+e2NvbnN0IG49ZnVuY3Rpb24oZSl7cmV0dXJuYCR7ZS51dWlkfToke2UubmFtZX1gfShlKTtyZXR1cm4gdC5oYXMobil8fHQuc2V0KG4sbmV3IE1hcCksdC5nZXQobil9fX1hc3luYyBmdW5jdGlvbiBaKGUsdCl7cmV0dXJuKGF3YWl0IGooZSkpLmRpc3BhdGNoKHcsdCl9ZnVuY3Rpb24gWSh7bmFtZXNwYWNlZFRvcGljOmUsdG9waWM6dH0pe2NvbnN0IG49Qi5iaW5kKG51bGwsZSksbz1RKGUpLHI9Wi5iaW5kKG51bGwsZSk7cmV0dXJuIGFzeW5jKGUsaSk9PntpZighZXx8IWUuaWR8fCFlLnByb3ZpZGVySWQpe2NvbnN0IGU9SDtyZXR1cm4geihlKSx7ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdHtpZDphLHByb3ZpZGVySWQ6c309ZSxjPW4ocyk7aWYoIWMpe2NvbnN0IGU9cTtyZXR1cm4geihlKSx7ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdCBkPW8uZ2V0UmVxdWVzdHNGb3JJZGVudGl0eShpKTtsZXQgdT1kLmdldChlLmlkKTt1fHwodT1NKHQsYSxlKSxkLnNldChlLmlkLHUpKTtjb25zdCBsPU8oKSxwPSgpPT57Y29uc3QgZT1sLmdldFJlc3VsdEJ1ZmZlcigpO2wuc2V0UmVzdWx0QnVmZmVyKFtdKTtjb25zdCB0PWwuZ2V0UmV2b2tlZEJ1ZmZlcigpO2wuc2V0UmV2b2tlZEJ1ZmZlcihbXSk7Y29uc3Qgbj1sLmdldFN0YXR1cygpO3Ioe2lkOmEscHJvdmlkZXJJZDpzLHJlc3VsdHM6ZSxyZXZva2VkOnQsc3RhdHVzOm59KX07bGV0IGY9ITAsZz0hMTtsLm9uQ2hhbmdlPSgpPT57aWYoZilyZXR1cm4gZj0hMSx2b2lkIHAoKTtnfHwoZz0hMCxzZXRUaW1lb3V0KCgoKT0+e2c9ITEscCgpfSksMTAwKSl9O3RyeXtjb25zdHtyZXN1bHRzOmUsY29udGV4dDp0fT1hd2FpdCBjLm9uVXNlcklucHV0KHUucmVxLGwucmVzKSxuPWwuZ2V0U3RhdHVzKCk7cmV0dXJue2lkOmEscHJvdmlkZXJJZDpzLHN0YXR1czpuLHJlc3VsdHM6ZSxjb250ZXh0OnR9fWNhdGNoKGUpe3JldHVybiB6KGUpLHtpZDphLHByb3ZpZGVySWQ6cyxlcnJvcjplPy5tZXNzYWdlfX19fWFzeW5jIGZ1bmN0aW9uIGVlKGUsdCxuKXtjb25zdCBvPW58fGF3YWl0IGooZSkscj1FKCksaT17Li4udCxpZGVudGl0eTpyLG9uUmVzdWx0RGlzcGF0Y2g6dm9pZCAwfSxhPWF3YWl0IG8uZGlzcGF0Y2goXCIyXCIsaSk7cmV0dXJuIGF3YWl0IEEoZSx7aWRlbnRpdHk6ciwuLi50fSksYX1hc3luYyBmdW5jdGlvbiB0ZShlLHQpe2NvbnN0IG49YXdhaXQgaihlKTtyZXR1cm4gYXdhaXQgbi5kaXNwYXRjaChcIjNcIix0KSxGKGUsdCl9YXN5bmMgZnVuY3Rpb24gbmUoZSx0LG4sbyl7Y29uc3Qgcj1MKG4sRSgpLG8pLGk9QihlLHQpO2lmKGkpe2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6ZX09aTtpZighZSlyZXR1cm47cmV0dXJuIGUocil9Y29uc3QgYT17cHJvdmlkZXJJZDp0LHJlc3VsdDpyfTtyZXR1cm4oYXdhaXQgaihlKSkuZGlzcGF0Y2goaCxhKX1hc3luYyBmdW5jdGlvbiBvZShlLHQpe2NvbnN0IG49ey4uLnQsY29udGV4dDp0Py5jb250ZXh0fHx7fX0sbz17fSxyPWFzeW5jIGZ1bmN0aW9uKihlLHQse3NldFN0YXRlOm59KXtjb25zdCBvPWF3YWl0IGooZSk7Zm9yKDs7KXtjb25zdCBlPWF3YWl0IG8uZGlzcGF0Y2goXCIxXCIsdCkscj1lLmVycm9yO2lmKHIpdGhyb3cgbmV3IEVycm9yKHIpO2NvbnN0IGk9ZTtpZih0LmlkPWkuaWQsbihpLnN0YXRlKSxpLmRvbmUpcmV0dXJuIGkudmFsdWU7eWllbGQgaS52YWx1ZX19KGUsbix7c2V0U3RhdGU6ZT0+e28uc3RhdGU9ZX19KTtsZXQgaT1hd2FpdCByLm5leHQoKTtyZXR1cm4gby5pZD1uLmlkfHxcIlwiLG8uY2xvc2U9KCk9PnshYXN5bmMgZnVuY3Rpb24oZSx0KXsoYXdhaXQgaihlKSkuZGlzcGF0Y2godix7aWQ6dH0pfShlLG8uaWQpfSxvLm5leHQ9KCk9PntpZihpKXtjb25zdCBlPWk7cmV0dXJuIGk9dm9pZCAwLGV9cmV0dXJuIHIubmV4dCgpfSxvfWFzeW5jIGZ1bmN0aW9uIHJlKGUpe3JldHVybihhd2FpdCBqKGUpKS5kaXNwYXRjaChcIjRcIixudWxsKX1hc3luYyBmdW5jdGlvbiBpZShlKXtjb25zdCB0PWF3YWl0IGooZSk7dmFyIG47bj1lLE4uZGVsZXRlKG4pLEQoZSksYXdhaXQgdC5kaXNjb25uZWN0KCl9ZnVuY3Rpb24gYWUoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1RKHQpO3JldHVybiBhc3luYyBvPT57aWYoIVgodCkpcmV0dXJuO2NvbnN0IHI9bi5nZXRSZXF1ZXN0c0ZvcklkZW50aXR5KG8pO2Zvcihjb25zdHtyZXE6ZSxjbG9zZTp0fW9mIHIudmFsdWVzKCkpdCgpLHIuZGVsZXRlKGUuaWQpO0sodCwoYXN5bmMgZT0+e2NvbnN0e25hbWVzcGFjZWRUb3BpYzp0fT1lLG49YXdhaXQgc2UoZSk7Zm9yKGNvbnN0IGUgb2YgUih0KSlhd2FpdCBlZSh0LGUsbik7cmV0dXJuIG59KShlKSl9fWFzeW5jIGZ1bmN0aW9uIHNlKGUpe2NvbnN0e25hbWVzcGFjZWRUb3BpYzp0fT1lLG49Uyh0KSxvPWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUpe2ZvcihsZXQgdD0wO3Q8NTA7dCsrKXRyeXtyZXR1cm4gYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGUse3dhaXQ6ITF9KX1jYXRjaChlKXtpZig0OT09PXQpdGhyb3cgZTthd2FpdCBuZXcgUHJvbWlzZSgoZT0+c2V0VGltZW91dChlLDFlMykpKX19KG4pO3JldHVybiBvLnJlZ2lzdGVyKHcsWShlKSksby5yZWdpc3Rlcih2LGZ1bmN0aW9uKGUpe2NvbnN0IHQ9UShlKTtyZXR1cm4oZSxuKT0+e2NvbnN0IG89dC5nZXRSZXF1ZXN0c0ZvcklkZW50aXR5KG4pLHI9by5nZXQoZS5pZCk7ciYmKHIuY2xvc2UoKSxvLmRlbGV0ZShlLmlkKSl9fSh0KSksby5yZWdpc3RlcihoLGZ1bmN0aW9uKGUpe3JldHVybiBhc3luYyh0LG4pPT57aWYoIXR8fCF0LnByb3ZpZGVySWR8fCF0LnJlc3VsdClyZXR1cm4gdm9pZCB6KEgpO2NvbnN0IG89QihlLHQucHJvdmlkZXJJZCk7aWYoIW8pcmV0dXJuIHZvaWQgeihxKTtjb25zdHtvblJlc3VsdERpc3BhdGNoOnJ9PW87cmV0dXJuIHI/KHQucmVzdWx0LmRpc3BhdGNoZXJJZGVudGl0eT1uLHIodC5yZXN1bHQpKTp2b2lkIDB9fSh0KSksby5vbkRpc2Nvbm5lY3Rpb24oYWUoZSkpLG99YXN5bmMgZnVuY3Rpb24gY2UoZSl7Y29uc3QgdD1cInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9waWMsbj1cInN0cmluZ1wiPT10eXBlb2YgZT92b2lkIDA6ZS51dWlkLG89dHx8ZyxyPW58fFYoKXx8XCJcIixpPW0ocixvKSxhPXt0b3BpYzpvLG5hbWVzcGFjZTpyLG5hbWVzcGFjZWRUb3BpYzppfTtsZXQgcz1YKGkpO3JldHVybiBzfHwocz1zZShhKSxLKGkscyksYXdhaXQgcykse2dldEFsbFByb3ZpZGVyczpyZS5iaW5kKG51bGwsaSkscmVnaXN0ZXI6ZWUuYmluZChudWxsLGkpLHNlYXJjaDpvZS5iaW5kKG51bGwsaSksZGVyZWdpc3Rlcjp0ZS5iaW5kKG51bGwsaSksZGlzcGF0Y2g6bmUuYmluZChudWxsLGkpLGRpc2Nvbm5lY3Q6aWUuYmluZChudWxsLGkpfX1jb25zdCBkZT1uZXcgTWFwO2Z1bmN0aW9uIHVlKGUpe2NvbnN0IHQ9bGUoZSk7aWYodClyZXR1cm4gdDt0aHJvdyBVfWZ1bmN0aW9uIGxlKGUpe2NvbnN0IHQ9ZGUuZ2V0KGUpO2lmKHQpcmV0dXJuIHR9Y29uc3QgcGU9bmV3IE1hcDtmdW5jdGlvbiBmZShlLHQpe3BlLmhhcyhlKXx8cGUuc2V0KGUsbmV3IFNldCkscGUuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBnZShlLHQpe2NvbnN0IG49cGUuZ2V0KGUpO24mJm4uZGVsZXRlKHQpfWFzeW5jIGZ1bmN0aW9uIHdlKGUpe3JldHVyblsuLi5SKGUpXS5tYXAoKGU9Pih7Li4uZSxvblVzZXJJbnB1dDp2b2lkIDAsb25SZXN1bHREaXNwYXRjaDp2b2lkIDB9KSkpfWFzeW5jIGZ1bmN0aW9uIGhlKGUsdCl7aWYoQihlLHQuaWQpKXRocm93IG5ldyBFcnJvcihcInByb3ZpZGVyIHdpdGggbmFtZSBhbHJlYWR5IGV4aXN0c1wiKTtjb25zdCBuPUUoKTtyZXR1cm4gYXdhaXQgQShlLHtpZGVudGl0eTpuLC4uLnR9KSx7d29ya3NwYWNlVmVyc2lvbjppLnUwfHxcIlwiLGNsaWVudEFQSVZlcnNpb246dC5jbGllbnRBUElWZXJzaW9ufHxcIlwifX1hc3luYyBmdW5jdGlvbiB2ZShlLHQpe2F3YWl0IEYoZSx0KX1hc3luYyBmdW5jdGlvbiB5ZShlLHQsbixvKXtjb25zdCByPUIoZSx0KTtpZighcil0aHJvdyBxO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6aX09cjtpZighaSlyZXR1cm47cmV0dXJuIGkoTChuLEUoKSxvKSl9YXN5bmMgZnVuY3Rpb24qbWUoZSx0LG4pe2NvbnN0IG89ZnVuY3Rpb24oZSx0KXtjb25zdCBuPVtdLG89W10scj1bXSxpPVtdO2Zvcihjb25zdCBhIG9mIGUpe2NvbnN0IGU9TyhhLnNjb3JlT3JkZXIpLHM9e3Jlc3VsdHM6W10scHJvdmlkZXI6e2lkOmEuaWQsaWRlbnRpdHk6YS5pZGVudGl0eSx0aXRsZTphLnRpdGxlLHNjb3JlT3JkZXI6YS5zY29yZU9yZGVyLGljb246YS5pY29uLGRpc3BhdGNoRm9jdXNFdmVudHM6YS5kaXNwYXRjaEZvY3VzRXZlbnRzfX07bi5wdXNoKHMpLG8ucHVzaChlKTtjb25zdCBjPShhc3luYygpPT57dHJ5e2NvbnN0e3Jlc3VsdHM6bixjb250ZXh0Om99PWF3YWl0IGEub25Vc2VySW5wdXQodCxlLnJlcyk7cy5yZXN1bHRzPXgocy5yZXN1bHRzfHxbXSxuKSxzLmNvbnRleHQ9ey4uLnMuY29udGV4dCwuLi5vfX1jYXRjaChlKXtzLmVycm9yPWV9fSkoKTtjLmZpbmFsbHkoKCgpPT57Yy5kb25lPSEwfSkpLGkucHVzaChjKSxyLnB1c2goci5sZW5ndGgpfXJldHVybntwcm92aWRlclJlc3BvbnNlczpuLGxpc3RlbmVyUmVzcG9uc2VzOm8sb3Blbkxpc3RlbmVyUmVzcG9uc2VzOnIsaW5pdGlhbFJlc3BvbnNlUHJvbWlzZXM6aX19KHQudGFyZ2V0cz90LnRhcmdldHMubWFwKCh0PT5CKGUsdCkpKS5maWx0ZXIoKGU9PiEhZSkpOlsuLi5SKGUpLmZpbHRlcigoZT0+IWUuaGlkZGVuKSldLHQpLHtwcm92aWRlclJlc3BvbnNlczpyLGxpc3RlbmVyUmVzcG9uc2VzOml9PW87bGV0e29wZW5MaXN0ZW5lclJlc3BvbnNlczphLGluaXRpYWxSZXNwb25zZVByb21pc2VzOnN9PW8sYz1mLkRlLkZldGNoaW5nO2NvbnN0IGQ9ZT0+e2M9ZSxuLnNldFN0YXRlKGMpfTtsZXQgbCxwPSExO3Qub25DbG9zZSgoKCk9PntwPSEwLGwmJmwoKX0pKTtkb3tsZXQgZT0hMTtpZihzLmxlbmd0aCl7Y29uc3QgdD1bXTtmb3IoY29uc3QgbiBvZiBzKW4uZG9uZT9lPSEwOnQucHVzaChuKTtzPXQscy5sZW5ndGh8fChkKGYuRGUuRmV0Y2hlZCksZT0hMCl9bGV0IHQsbj0hMTtjb25zdCBvPSgpPT57bj0hMCx0JiZ0KCl9LGc9W107Zm9yKGNvbnN0IHQgb2YgYSl7Y29uc3Qgbj1pW3RdLGE9clt0XSxzPW4uZ2V0U3RhdHVzKCk7KHM9PT11Lk9wZW58fGM9PT1mLkRlLkZldGNoaW5nJiZzPT09dS5Jbml0aWFsKSYmKGcucHVzaCh0KSxuLm9uQ2hhbmdlPW8pO2NvbnN0IGQ9bi5nZXRSZXN1bHRCdWZmZXIoKTtkLmxlbmd0aCYmKG4uc2V0UmVzdWx0QnVmZmVyKFtdKSxhLnJlc3VsdHM9eChhLnJlc3VsdHN8fFtdLGQpLGU9ITApO2NvbnN0IGw9bi5nZXRSZXZva2VkQnVmZmVyKCk7aWYobC5sZW5ndGgpe24uc2V0UmV2b2tlZEJ1ZmZlcihbXSk7Y29uc3QgdD1uZXcgU2V0KGwpO2EucmVzdWx0cz0oYS5yZXN1bHRzfHxbXSkuZmlsdGVyKCgoe2tleTplfSk9PiF0LmhhcyhlKSkpLGU9ITB9fWlmKGE9ZyxlJiYoeWllbGQgcikscClicmVhaztufHwoYS5sZW5ndGh8fHMubGVuZ3RoKSYmYXdhaXQgUHJvbWlzZS5yYWNlKFsuLi5zLG5ldyBQcm9taXNlKChlPT57dD1lfSkpLG5ldyBQcm9taXNlKChlPT57bD1lfSkpXSl9d2hpbGUoYS5sZW5ndGh8fHMubGVuZ3RoKTtyZXR1cm4gZChmLkRlLkNvbXBsZXRlKSxyfWxldCBTZT0wO2FzeW5jIGZ1bmN0aW9uIFBlKHtuYW1lc3BhY2VkVG9waWM6ZSx0b3BpYzp0fSxuKXtTZSs9MTtjb25zdCBvPU0odCxTZS50b1N0cmluZygpLG4pLHI9bWUoZSxvLnJlcSx7c2V0U3RhdGU6ZT0+e3Iuc3RhdGU9ZX19KTtyZXR1cm4gci5pZD1TZS50b1N0cmluZygpLHIuY2xvc2U9by5jbG9zZSxyLnN0YXRlPWYuRGUuRmV0Y2hpbmcscn1jb25zdCBXZT1uZXcgTWFwO2Z1bmN0aW9uIGtlKGUsdCl7cmV0dXJuYCR7ZX06JHt0fWB9ZnVuY3Rpb24gQ2UoZSl7cmV0dXJuIGFzeW5jIHQ9PntpZighdClyZXR1cm4geihIKSx7ZXJyb3I6SC5tZXNzYWdlfTtsZXQgbjtpZih0LmlkKW49a2UoZS5uYW1lc3BhY2VkVG9waWMsdC5pZCk7ZWxzZXtjb25zdCBvPWF3YWl0IFBlKGUsdCk7bj1rZShlLm5hbWVzcGFjZWRUb3BpYyxvLmlkKSx0LmlkPW8uaWQsV2Uuc2V0KG4se2dlbmVyYXRvcjpvfSl9Y29uc3Qgbz1XZS5nZXQobik7Y2xlYXJUaW1lb3V0KG8udGltZW91dCk7Y29uc3Qgcj1hd2FpdCBvLmdlbmVyYXRvci5uZXh0KCk7cmV0dXJuIG8udGltZW91dD1mdW5jdGlvbihlKXtyZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCgpPT57V2UuZGVsZXRlKGUpfSksMWU0KX0obiksey4uLnIsaWQ6dC5pZCxzdGF0ZTpvLmdlbmVyYXRvci5zdGF0ZX19fWZ1bmN0aW9uIEllKGUsdCxuKXtyZXR1cm4gdWUoZSkuZGlzcGF0Y2godCx2LHtpZDpufSl9ZnVuY3Rpb24gVGUoZSl7cmV0dXJuIHQ9PmZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1rZShlLHQpLG89V2UuZ2V0KG4pO28mJm8uZ2VuZXJhdG9yLmNsb3NlKCl9KGUsdC5pZCl9YXN5bmMgZnVuY3Rpb24gYmUoZSx0LHtpZDpuLHF1ZXJ5Om8sY29udGV4dDpyLHRhcmdldHM6aT1bXX0pe2NvbnN0IGE9dWUoZSkscz17aWQ6bixxdWVyeTpvLGNvbnRleHQ6cix0YXJnZXRzOmkscHJvdmlkZXJJZDp0LmlkfSxjPWF3YWl0IGEuZGlzcGF0Y2godC5pZGVudGl0eSx3LHMpLGQ9Yy5lcnJvcjtpZihkKXRocm93IG5ldyBFcnJvcihkKTtyZXR1cm4gY31jb25zdCBBZT1uZXcgTWFwO2Z1bmN0aW9uIEZlKGUsdCxuKXtyZXR1cm5gJHtlfToke3QubmFtZX06JHt0LnV1aWR9OiR7bn1gfWNvbnN0IFJlPW5ldyBNYXA7ZnVuY3Rpb24gRGUoZSx0LG4pe3JldHVybmAke2V9OiR7dH06JHtufWB9ZnVuY3Rpb24gQmUoZSx0KXtjb25zdCBuPUZlLmJpbmQobnVsbCxlLHQuaWRlbnRpdHkpLG89SWUuYmluZChudWxsLGUsdC5pZGVudGl0eSkscj1iZS5iaW5kKG51bGwsZSx0KTtyZXR1cm4gYXN5bmMoaSxhKT0+e2NvbnN0IHM9bihpLmlkKTtpZighQWUuaGFzKHMpKXtjb25zdCBlPSgpPT57byhpLmlkKSxBZS5kZWxldGUocyl9O0FlLnNldChzLGUpLGkub25DbG9zZShlKX1jb25zdCBjPURlKGUsdC5pZCxpLmlkKSxkPSgpPT57UmUuZGVsZXRlKGMpLGEuY2xvc2UoKX07aS5vbkNsb3NlKGQpLFJlLnNldChjLChlPT57ZS5yZXN1bHRzPy5sZW5ndGgmJmEucmVzcG9uZChlLnJlc3VsdHMpLGUucmV2b2tlZD8ubGVuZ3RoJiZhLnJldm9rZSguLi5lLnJldm9rZWQpLGUuc3RhdHVzPT09dS5PcGVuJiZhLm9wZW4oKSxlLnN0YXR1cz09PXUuQ2xvc2UmJmQoKX0pKTtjb25zdCBsPWF3YWl0IHIoaSk7cmV0dXJuIGwuc3RhdHVzPT09dS5PcGVuJiZhLm9wZW4oKSxsLnN0YXR1cyE9PXUuQ2xvc2UmJmwuc3RhdHVzIT09dS5Jbml0aWFsfHxkKCksbH19ZnVuY3Rpb24gTGUoZSx0KXtyZXR1cm4gYXN5bmMgbj0+e2NvbnN0IG89dWUoZSkscj17cHJvdmlkZXJJZDp0LmlkLHJlc3VsdDpufTtyZXR1cm4gby5kaXNwYXRjaCh0LmlkZW50aXR5LGgscil9fWNvbnN0IHhlPW5ldyBNYXA7ZnVuY3Rpb24gT2UoZSx0KXtyZXR1cm5gJHtlfS0ke3QubmFtZX0tJHt0LnV1aWR9YH1mdW5jdGlvbiBNZShlKXtyZXR1cm4gYXN5bmModCxuKT0+e2lmKCF0fHwhdC5pZClyZXR1cm4geihuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkodCkpKSx2b2lkIHooSCk7aWYoQihlLHQuaWQpKXRocm93IF87cmV0dXJuIHQuaWRlbnRpdHk9bixhd2FpdCBhc3luYyBmdW5jdGlvbihlLHQpe2NvbnN0IG49T2UoZSx0LmlkZW50aXR5KTt4ZS5oYXMobil8fHhlLnNldChuLFtdKSx4ZS5nZXQobikucHVzaCh0LmlkKSxhd2FpdCBBKGUsey4uLnQsb25Vc2VySW5wdXQ6QmUoZSx0KSxvblJlc3VsdERpc3BhdGNoOkxlKGUsdCl9KX0oZSx0KSx7d29ya3NwYWNlVmVyc2lvbjppLnUwfHxcIlwiLGNsaWVudEFQSVZlcnNpb246dC5jbGllbnRBUElWZXJzaW9ufHxcIlwifX19ZnVuY3Rpb24gRWUoZSl7cmV0dXJuIHQ9Pnt0P2Z1bmN0aW9uKGUsdCl7Y29uc3Qgbj1CKGUsdCk7aWYoIW4pcmV0dXJuO2NvbnN0IG89T2UoZSxuLmlkZW50aXR5KSxyPXhlLmdldChvKTtpZihyKXtjb25zdCBuPXIuZmluZEluZGV4KChlPT5lPT09dCkpOy0xIT09biYmKHIuc3BsaWNlKG4sMSksRihlLHQpKX19KGUsdCk6eihIKX19Y29uc3QgVmU9bmV3IE1hcDtmdW5jdGlvbiBHZShlLHQpe1ZlLmhhcyhlKXx8VmUuc2V0KGUsbmV3IFNldCksVmUuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBxZShlLHQpe2NvbnN0IG49VmUuZ2V0KGUpO24mJm4uZGVsZXRlKHQpfWZ1bmN0aW9uIF9lKGUpe3JldHVybiBhc3luYyB0PT57IWZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1PZShlLHQpLG89eGUuZ2V0KG4pO2lmKG8pe2Zvcihjb25zdCB0IG9mIG8pRihlLHQpO3hlLmRlbGV0ZShuKX19KGUsdCk7Y29uc3Qgbj1WZS5nZXQoZSk7biYmbi5mb3JFYWNoKChlPT5lKHQpKSl9fWFzeW5jIGZ1bmN0aW9uIEhlKGUpe2NvbnN0e25hbWVzcGFjZWRUb3BpYzp0fT1lLG49UyhlLm5hbWVzcGFjZWRUb3BpYyksbz1hd2FpdChyPW4sZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jcmVhdGUocikpO3ZhciByO3JldHVybiBvLm9uQ29ubmVjdGlvbihmdW5jdGlvbih7bmFtZXNwYWNlZFRvcGljOmV9KXtyZXR1cm4gYXN5bmMgdD0+e2NvbnN0IG49cGUuZ2V0KGUpO2lmKG4pZm9yKGNvbnN0IGUgb2YgbilpZighYXdhaXQgZSh0KSl0aHJvdyAkfX0oZSkpLG8ub25EaXNjb25uZWN0aW9uKF9lKHQpKSxvLnJlZ2lzdGVyKHYsVGUodCkpLG8ucmVnaXN0ZXIodyxmdW5jdGlvbihlKXtyZXR1cm4gdD0+e2NvbnN0IG49RGUoZSx0LnByb3ZpZGVySWQsdC5pZCksbz1SZS5nZXQobik7byYmbyh0KX19KHQpKSxvLnJlZ2lzdGVyKFwiMlwiLE1lKHQpKSxvLnJlZ2lzdGVyKFwiM1wiLEVlKHQpKSxvLnJlZ2lzdGVyKFwiNFwiLGZ1bmN0aW9uKGUpe3JldHVybiBhc3luYygpPT53ZShlKX0odCkpLG8ucmVnaXN0ZXIoXCIxXCIsQ2UoZSkpLG8ucmVnaXN0ZXIoaCxmdW5jdGlvbihlKXtyZXR1cm4gYXN5bmModCxuKT0+e2lmKCF0fHwhdC5wcm92aWRlcklkfHwhdC5yZXN1bHQpcmV0dXJuIHZvaWQgeihIKTtjb25zdCBvPUIoZSx0LnByb3ZpZGVySWQpO2lmKCFvKXRocm93IHE7Y29uc3R7b25SZXN1bHREaXNwYXRjaDpyfT1vO3JldHVybiByPyh0LnJlc3VsdC5kaXNwYXRjaGVySWRlbnRpdHk9bixyKHQucmVzdWx0KSk6dm9pZCAwfX0odCkpLG99YXN5bmMgZnVuY3Rpb24gJGUoZSl7Y29uc3QgdD11ZShlKTt2YXIgbjtuPWUsZGUuZGVsZXRlKG4pLGF3YWl0IHQuZGVzdHJveSgpLEQoZSl9YXN5bmMgZnVuY3Rpb24gVWUoZSl7Y29uc3QgdD0oXCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplPy50b3BpY3x8XCJcIil8fGcsbj1WKCl8fFwiXCIsbz1tKG4sdCkscj17dG9waWM6dCxuYW1lc3BhY2U6bixuYW1lc3BhY2VkVG9waWM6b307bGV0IGk9bGUobyk7aXx8KGk9YXdhaXQgSGUociksZnVuY3Rpb24oZSx0KXtkZS5zZXQoZSx0KX0obyxpKSk7Y29uc3QgYT1nZS5iaW5kKG51bGwsbykscz1xZS5iaW5kKG51bGwsbyksYz1rLmJpbmQobnVsbCxvKSxkPVQuYmluZChudWxsLG8pO3JldHVybntnZXRBbGxQcm92aWRlcnM6d2UuYmluZChudWxsLG8pLHNlYXJjaDpQZS5iaW5kKG51bGwscikscmVnaXN0ZXI6aGUuYmluZChudWxsLG8pLGRlcmVnaXN0ZXI6dmUuYmluZChudWxsLG8pLG9uU3Vic2NyaXB0aW9uOmZlLmJpbmQobnVsbCxvKSxvbkRpc2Nvbm5lY3Q6R2UuYmluZChudWxsLG8pLG9uUmVnaXN0ZXI6Vy5iaW5kKG51bGwsbyksb25EZXJlZ2lzdGVyOkkuYmluZChudWxsLG8pLGRpc3BhdGNoOnllLmJpbmQobnVsbCxvKSxkaXNjb25uZWN0OiRlLmJpbmQobnVsbCxvKSxyZW1vdmVMaXN0ZW5lcjplPT57YShlKSxzKGUpLGMoZSksZChlKX19fWNvbnN0e2NyZWF0ZTpOZX09cix7c3Vic2NyaWJlOmplfT1vLFhlPXtjcmVhdGU6TmUsc3Vic2NyaWJlOmplLGRlZmF1bHRUb3BpYzpcImFsbFwifSxLZT0oKT0+e3dpbmRvdy5zZWFyY2g9WGV9LHplPWU9Pntjb25zdCB0PSgpPT57S2UoKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpfTtyZXR1cm4gdH07aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7S2UoKTtjb25zdCBlPVwibG9hZFwiLHQ9emUoZSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSx0KTtjb25zdCBuPVwiRE9NQ29udGVudExvYWRlZFwiLG89emUobik7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIobixvKX1jb25zdCBKZT1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIFFlKCl7YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7SmUuc2V0KGUsYXdhaXQgamUoe3RvcGljOmUsdXVpZDpsLnE5LldvcmtzcGFjZX0pKX0oYyl9bGV0IFplO2FzeW5jIGZ1bmN0aW9uIFllKGUpe3JldHVybiBhd2FpdCBhc3luYyBmdW5jdGlvbigpe3JldHVybiBaZXx8KFplPVFlKCkpLFplfSgpLEplLmdldChlKX1jb25zdCBldD1hc3luYyBlPT57aWYoIWUuaWNvbil0aHJvdyBuZXcgRXJyb3IoYCR7ZS5pZH0gcHJvdmlkZXIgbmVlZHMgdG8gaGF2ZSBpY29uIHByb3BlcnR5IGRlZmluZWQuYCk7YXdhaXQoMCxzLmFCKSgpO2NvbnN0IHQ9YXdhaXQgWWUoYyk7dHJ5e2UuY2xpZW50QVBJVmVyc2lvbj1pLnUwO2NvbnN0IG49YXdhaXQgdC5yZWdpc3RlcihlKTtyZXR1cm4oMCxhLmNrKSh7YWxsb3dlZDohMCxjb21wb25lbnRWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb259KSxuPy53b3Jrc3BhY2VWZXJzaW9uLGkudTAsey4uLm4sc2V0U2VhcmNoUXVlcnk6YXN5bmMgdD0+KGF3YWl0KDAscy5YbCkoKSkuZGlzcGF0Y2gocy5XRi5TZXRTZWFyY2hRdWVyeSx7cXVlcnk6dCxwcm92aWRlcklEOmUuaWR9KX19Y2F0Y2goZSl7dGhyb3coMCxhLmNrKSh7YWxsb3dlZDohMSxyZWplY3Rpb25Db2RlOmUgaW5zdGFuY2VvZiBFcnJvcj9lLm1lc3NhZ2U6XCJ1bmtub3duXCJ9KSxlfX0sdHQ9YXN5bmMgZT0+e2F3YWl0KDAscy5hQikoKTtyZXR1cm4oYXdhaXQgWWUoYykpLmRlcmVnaXN0ZXIoZSl9O2FzeW5jIGZ1bmN0aW9uIG50KCl7cmV0dXJuKGF3YWl0KDAscy5YbCkoKSkuZGlzcGF0Y2gocy5XRi5TaG93SG9tZSx2b2lkIDApfWFzeW5jIGZ1bmN0aW9uIG90KCl7cmV0dXJuKGF3YWl0KDAscy5YbCkoKSkuZGlzcGF0Y2gocy5XRi5IaWRlSG9tZSx2b2lkIDApfX0sMjk4OihlLHQsbik9PntuLmQodCx7cDooKT0+by5weCx3OigpPT5vLnd0fSk7dmFyIG89bigzMTYpfSw0Mjc6KGUsdCxuKT0+e3ZhciBvO24uZCh0LHt2OigpPT5vfSksZnVuY3Rpb24oZSl7ZS5BY3Rpb25CdXR0b249XCJBY3Rpb25CdXR0b25cIixlLkRyb3Bkb3duQnV0dG9uPVwiRHJvcGRvd25CdXR0b25cIn0ob3x8KG89e30pKX0sNzU4OihlLHQsbik9Pnt2YXIgbyxyLGk7bi5kKHQse1B0OigpPT5vLGVsOigpPT5pLHlXOigpPT5yfSksZnVuY3Rpb24oZSl7ZS5TdWdnZXN0aW9uPVwic3VnZ2VzdGlvblwifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuQ29udGFjdD1cIkNvbnRhY3RcIixlLkN1c3RvbT1cIkN1c3RvbVwiLGUuTGlzdD1cIkxpc3RcIixlLlBsYWluPVwiUGxhaW5cIixlLlNpbXBsZVRleHQ9XCJTaW1wbGVUZXh0XCIsZS5Mb2FkaW5nPVwiTG9hZGluZ1wiLGUuRXJyb3I9XCJFcnJvclwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuTXVsdGlTZWxlY3Q9XCJNdWx0aVNlbGVjdFwifShpfHwoaT17fSkpfSwxMTQ6KGUsdCxuKT0+e3ZhciBvLHI7bi5kKHQse0w6KCk9Pm8sVDooKT0+cn0pLGZ1bmN0aW9uKGUpe2UuU25hcHNob3Q9XCJzbmFwc2hvdFwiLGUuTWFuaWZlc3Q9XCJtYW5pZmVzdFwiLGUuVmlldz1cInZpZXdcIixlLkV4dGVybmFsPVwiZXh0ZXJuYWxcIn0ob3x8KG89e30pKSxmdW5jdGlvbihlKXtlLkxhbmRpbmdQYWdlPVwibGFuZGluZ1BhZ2VcIixlLkFwcEdyaWQ9XCJhcHBHcmlkXCJ9KHJ8fChyPXt9KSl9LDEwOTooZSx0LG4pPT57bi5kKHQse0dvOigpPT5yLFpKOigpPT5hLGJJOigpPT5pLHA2OigpPT5vfSk7Y29uc3Qgbz17Q29udGFpbmVyOlwiQ29udGFpbmVyXCIsQnV0dG9uOlwiQnV0dG9uXCJ9LHI9e1RleHQ6XCJUZXh0XCIsSW1hZ2U6XCJJbWFnZVwiLExpc3Q6XCJMaXN0XCJ9LGk9ey4uLm8sLi4ucn07dmFyIGE7IWZ1bmN0aW9uKGUpe2UuUHJpbWFyeT1cInByaW1hcnlcIixlLlNlY29uZGFyeT1cInNlY29uZGFyeVwiLGUuVGV4dE9ubHk9XCJ0ZXh0T25seVwifShhfHwoYT17fSkpfSw1Mjg6KGUsdCxuKT0+e24ucih0KSxuLmQodCx7QXBwTWFuaWZlc3RUeXBlOigpPT5hLkwsU3RvcmVmcm9udFRlbXBsYXRlOigpPT5hLlQsZGVyZWdpc3RlcjooKT0+aCxoaWRlOigpPT52LHJlZ2lzdGVyOigpPT53LHNob3c6KCk9Pnl9KTt2YXIgbz1uKDUzMikscj1uKDE1MCksaT1uKDgyKSxhPW4oMTE0KSxzPW4oNjc4KSxjPW4oNDM4KTtsZXQgZCx1PSExO2FzeW5jIGZ1bmN0aW9uIGwoZSx0LG4pe2NvbnN0IG89YXdhaXQoMCxyLkRtKSgpO3RyeXtyZXR1cm4gYXdhaXQgby5kaXNwYXRjaChlLmFjdGlvbixlLnBheWxvYWQpfWNhdGNoKHIpe2lmKC0xIT09ci50b1N0cmluZygpLmluZGV4T2YoZS5hY3Rpb24pKXJldHVybiB1fHxjb25zb2xlLndhcm4oXCJZb3UgYXJlIHVzaW5nIGEgbmV3ZXIgdmVyc2lvbiBvZiB0aGUgV29ya3NwYWNlIGNsaWVudCBsaWJyYXJ5IHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgY3VycmVudGx5IHJ1bm5pbmcgd29ya3NwYWNlIHByb3ZpZGVyLiBQbGVhc2UgdXBncmFkZSB0aGUgV29ya3NwYWNlIHRvIHZlcnNpb24gOS4wIG9yIGxhdGVyLlwiKSx1PSEwLGF3YWl0IG8uZGlzcGF0Y2godC5hY3Rpb24sdC5wYXlsb2FkKSxuO3Rocm93IHJ9fWNvbnN0IHA9bmV3IE1hcCxmPWU9PntpZighcC5oYXMoZSkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IFByb3ZpZGVyIHdpdGggaWQgJHtlfSBpcyBub3QgcmVnaXN0ZXJlZGApO3JldHVybiBwLmdldChlKX0sZz1hc3luYyBlPT57YXdhaXQoMCxjLkhoKShmaW4ubWUuaWRlbnRpdHkpO2NvbnN0IHQ9YXdhaXQoMCxyLlhsKSgpO2lmKHAuaGFzKGUuaWQpKXRocm93IG5ldyBFcnJvcihgU3RvcmVmcm9udCBwcm92aWRlciB3aXRoIGlkICR7ZS5pZH0gYWxyZWFkeSByZWdpc3RlcmVkYCk7cmV0dXJuIHAuc2V0KGUuaWQsZSksKGU9PntlLmlzU3RvcmVmcm9udEFjdGlvbnNSZWdpc3RlcmVkfHwoZS5pc1N0b3JlZnJvbnRBY3Rpb25zUmVnaXN0ZXJlZD0hMCxlLnJlZ2lzdGVyKHIuV0YuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcywoZT0+ZihlKS5nZXRBcHBzKCkpKSxlLnJlZ2lzdGVyKHIuV0YuR2V0U3RvcmVmcm9udFByb3ZpZGVyRm9vdGVyLChlPT5mKGUpLmdldEZvb3RlcigpKSksZS5yZWdpc3RlcihyLldGLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlLChlPT5mKGUpLmdldExhbmRpbmdQYWdlKCkpKSxlLnJlZ2lzdGVyKHIuV0YuR2V0U3RvcmVmcm9udFByb3ZpZGVyTmF2aWdhdGlvbiwoZT0+ZihlKS5nZXROYXZpZ2F0aW9uKCkpKSxlLnJlZ2lzdGVyKHIuV0YuTGF1bmNoU3RvcmVmcm9udFByb3ZpZGVyQXBwLCgoe2lkOmUsYXBwOnR9KT0+ZihlKS5sYXVuY2hBcHAodCkpKSl9KSh0KSxlLmNsaWVudEFQSVZlcnNpb249cy51MCxsKHthY3Rpb246ci5XRi5SZWdpc3RlclByb3ZpZGVyLHBheWxvYWQ6e3Byb3ZpZGVyVHlwZTppLmxQLlN0b3JlZnJvbnQsaW5mbzplfX0se2FjdGlvbjpyLldGLlJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyLHBheWxvYWQ6ZX0se3dvcmtzcGFjZVZlcnNpb246XCJ1bmtub3duXCJ9KX0sdz1lPT4oZD1uZXcgUHJvbWlzZSgoYXN5bmModCxuKT0+e3RyeXtjb25zdCBuPWF3YWl0IGcoZSk7KDAsby5kOSkoe2FsbG93ZWQ6ITAsY29tcG9uZW50VmVyc2lvbjpuPy53b3Jrc3BhY2VWZXJzaW9ufSksbj8ud29ya3NwYWNlVmVyc2lvbixzLnUwLHQoe2NsaWVudEFQSVZlcnNpb246cy51MCx3b3Jrc3BhY2VWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb24/P1wiXCJ9KX1jYXRjaChlKXsoMCxvLmQ5KSh7YWxsb3dlZDohMSxyZWplY3Rpb25Db2RlOmUgaW5zdGFuY2VvZiBFcnJvcj9lLm1lc3NhZ2U6XCJ1bmtub3duXCJ9KSxuKGUpfX0pKSxkKSxoPWFzeW5jIGU9Pihhd2FpdCBkLHAuZGVsZXRlKGUpLGF3YWl0KDAsci5hQikoKSxsKHthY3Rpb246ci5XRi5EZXJlZ2lzdGVyUHJvdmlkZXIscGF5bG9hZDp7cHJvdmlkZXJUeXBlOmkubFAuU3RvcmVmcm9udCxpZDplfX0se2FjdGlvbjpyLldGLkRlcmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIscGF5bG9hZDplfSkpLHY9YXN5bmMoKT0+KGF3YWl0IGQsYXdhaXQoMCxyLmFCKSgpLGwoe2FjdGlvbjpyLldGLkhpZGVQcm92aWRlcldpbmRvdyxwYXlsb2FkOntwcm92aWRlclR5cGU6aS5sUC5TdG9yZWZyb250fX0se2FjdGlvbjpyLldGLkhpZGVTdG9yZWZyb250fSkpLHk9YXN5bmMoKT0+KGF3YWl0IGQsYXdhaXQoMCxyLmFCKSgpLGwoe2FjdGlvbjpyLldGLlNob3dQcm92aWRlcldpbmRvdyxwYXlsb2FkOntwcm92aWRlclR5cGU6aS5sUC5TdG9yZWZyb250fX0se2FjdGlvbjpyLldGLlNob3dTdG9yZWZyb250fSkpfSw0Mzg6KGUsdCxuKT0+e3ZhciBvO24uZCh0LHtIaDooKT0+aX0pLGZ1bmN0aW9uKGUpe2UuTGF1bmNoQXBwPVwibGF1bmNoQXBwXCIsZS5TYXZlUGFnZT1cInNhdmVQYWdlXCIsZS5HZXRTYXZlZFBhZ2U9XCJnZXRTYXZlZFBhZ2VcIixlLkNyZWF0ZVNhdmVkUGFnZT1cImNyZWF0ZVNhdmVkUGFnZVwiLGUuVXBkYXRlU2F2ZWRQYWdlPVwidXBkYXRlU2F2ZWRQYWdlXCIsZS5EZWxldGVTYXZlZFBhZ2U9XCJkZWxldGVTYXZlZFBhZ2VcIixlLkdldFNhdmVkUGFnZXM9XCJnZXRTYXZlZFBhZ2VzXCIsZS5DcmVhdGVTYXZlZFBhZ2VJbnRlcm5hbD1cImNyZWF0ZVNhdmVkUGFnZUludGVybmFsXCIsZS5VcGRhdGVTYXZlZFBhZ2VJbnRlcm5hbD1cInVwZGF0ZVNhdmVkUGFnZUludGVybmFsXCIsZS5EZWxldGVTYXZlZFBhZ2VJbnRlcm5hbD1cImRlbGV0ZVNhdmVkUGFnZUludGVybmFsXCIsZS5TaGFyZVBhZ2U9XCJzaGFyZVBhZ2VcIixlLlVwZGF0ZVBhZ2VGb3JXaW5kb3c9XCJ1cGRhdGVQYWdlRm9yV2luZG93XCIsZS5BdHRhY2hQYWdlc1RvV2luZG93PVwiYXR0YWNoUGFnZXNUb1dpbmRvd1wiLGUuRGV0YWNoUGFnZXNGcm9tV2luZG93PVwiZGV0YWNoUGFnZXNGcm9tV2luZG93XCIsZS5SZW9yZGVyUGFnZXNGb3JXaW5kb3c9XCJyZW9yZGVyUGFnZXNGb3JXaW5kb3dcIixlLlNldEFjdGl2ZVBhZ2U9XCJzZXRBY3RpdmVQYWdlXCIsZS5HZXRBbGxBdHRhY2hlZFBhZ2VzPVwiZ2V0QWxsQXR0YWNoZWRQYWdlc1wiLGUuR2V0QWN0aXZlUGFnZUlkRm9yV2luZG93PVwiZ2V0QWN0aXZlUGFnZUlkRm9yV2luZG93XCIsZS5HZXRQYWdlc0ZvcldpbmRvdz1cImdldFBhZ2VzRm9yV2luZG93XCIsZS5HZXRQYWdlRm9yV2luZG93PVwiZ2V0UGFnZUZvcldpbmRvd1wiLGUuR2V0U2F2ZWRQYWdlTWV0YWRhdGE9XCJnZXRTYXZlZFBhZ2VNZXRhZGF0YVwiLGUuR2V0VW5pcXVlUGFnZVRpdGxlPVwiZ2V0VW5pcXVlUGFnZVRpdGxlXCIsZS5HZXRMYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3c9XCJnZXRMYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3dcIixlLkdldFRoZW1lcz1cImdldFRoZW1lc1wiLGUuR2V0U2VsZWN0ZWRTY2hlbWU9XCJnZXRTZWxlY3RlZFNjaGVtZVwiLGUuU2V0U2VsZWN0ZWRTY2hlbWU9XCJzZXRTZWxlY3RlZFNjaGVtZVwiLGUuT3Blbkdsb2JhbENvbnRleHRNZW51SW50ZXJuYWw9XCJvcGVuR2xvYmFsQ29udGV4dE1lbnVJbnRlcm5hbFwiLGUuT3BlblZpZXdUYWJDb250ZXh0TWVudUludGVybmFsPVwib3BlblZpZXdUYWJDb250ZXh0TWVudUludGVybmFsXCIsZS5PcGVuUGFnZVRhYkNvbnRleHRNZW51SW50ZXJuYWw9XCJvcGVuUGFnZVRhYkNvbnRleHRNZW51SW50ZXJuYWxcIixlLk9wZW5TYXZlQnV0dG9uQ29udGV4dE1lbnVJbnRlcm5hbD1cIm9wZW5TYXZlQnV0dG9uQ29udGV4dE1lbnVJbnRlcm5hbFwiLGUuSW52b2tlQ3VzdG9tQWN0aW9uSW50ZXJuYWw9XCJpbnZva2VDdXN0b21BY3Rpb25JbnRlcm5hbFwiLGUuUmVxdWVzdFF1aXRQbGF0Zm9ybURpYWxvZ0ludGVybmFsPVwicmVxdWVzdFF1aXRQbGF0Zm9ybURpYWxvZ0ludGVybmFsXCIsZS5HZXRTYXZlZFdvcmtzcGFjZT1cImdldFNhdmVkV29ya3NwYWNlXCIsZS5DcmVhdGVTYXZlZFdvcmtzcGFjZT1cImNyZWF0ZVNhdmVkV29ya3NwYWNlXCIsZS5VcGRhdGVTYXZlZFdvcmtzcGFjZT1cInVwZGF0ZVNhdmVkV29ya3NwYWNlXCIsZS5EZWxldGVTYXZlZFdvcmtzcGFjZT1cImRlbGV0ZVNhdmVkV29ya3NwYWNlXCIsZS5HZXRTYXZlZFdvcmtzcGFjZXM9XCJnZXRTYXZlZFdvcmtzcGFjZXNcIixlLlNhdmVXb3Jrc3BhY2U9XCJzYXZlV29ya3NwYWNlXCIsZS5HZXRDdXJyZW50V29ya3NwYWNlPVwiZ2V0Q3VycmVudFdvcmtzcGFjZVwiLGUuQXBwbHlXb3Jrc3BhY2U9XCJhcHBseVdvcmtzcGFjZVwiLGUuU2V0QWN0aXZlV29ya3NwYWNlPVwic2V0QWN0aXZlV29ya3NwYWNlXCIsZS5Jc0Jyb3dzZXJJbml0aWFsaXplZD1cImlzQnJvd3NlckluaXRpYWxpemVkXCJ9KG98fChvPXt9KSk7Y29uc3Qgcj1hc3luYyBlPT5maW4uUGxhdGZvcm0ud3JhcFN5bmMoZSkuZ2V0Q2xpZW50KCksaT1hc3luYyBlPT57Y29uc3QgdD1hd2FpdCByKGUpLG49XCJUYXJnZXQgaXMgbm90IGEgV29ya3NwYWNlIFBsYXRmb3JtLiBUYXJnZXQgbXVzdCBjYWxsIFdvcmtzcGFjZVBsYXRmb3JtLmluaXRcIjtsZXQgbzt0cnl7bz1hd2FpdCB0LmRpc3BhdGNoKFwiaXNXb3Jrc3BhY2VQbGF0Zm9ybVwiKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3Iobil9aWYoXCJib29sZWFuXCI9PXR5cGVvZiBvJiZvKXJldHVybiBjb25zb2xlLndhcm4oXCJZb3UgYXJlIHVzaW5nIGFuIG9sZGVyIHZlcnNpb24gb2YgdGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS4gUGxlYXNlIHVwZGF0ZSB5b3VyIHdvcmtzcGFjZSBwbGF0Zm9ybS5cIiksbztpZihcIm9iamVjdFwiPT10eXBlb2YgbyYmby5pc1dvcmtzcGFjZVBsYXRmb3JtKXJldHVybiBvO3Rocm93IG5ldyBFcnJvcihuKX19LDE1MDooZSx0LG4pPT57bi5kKHQse0RtOigpPT5zLFdGOigpPT5hLFhsOigpPT5sLGFCOigpPT51fSk7dmFyIG89bigxMTcpLHI9big2NzgpLGk9bigxMjEpO3ZhciBhOyFmdW5jdGlvbihlKXtlLlJlZ2lzdGVyUHJvdmlkZXI9XCJyZWdpc3Rlci1wcm92aWRlclwiLGUuRGVyZWdpc3RlclByb3ZpZGVyPVwiZGVyZWdpc3Rlci1wcm92aWRlclwiLGUuQ3JlYXRlUHJvdmlkZXJXaW5kb3c9XCJjcmVhdGUtcHJvdmlkZXItd2luZG93XCIsZS5HZXRQcm92aWRlcnM9XCJnZXQtcHJvdmlkZXJzXCIsZS5TaG93UHJvdmlkZXJXaW5kb3c9XCJzaG93LXByb3ZpZGVyLXdpbmRvd1wiLGUuSGlkZVByb3ZpZGVyV2luZG93PVwiaGlkZS1wcm92aWRlci13aW5kb3dcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlckFwcHM9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1hcHBzXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJMYW5kaW5nUGFnZT1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWxhbmRpbmctcGFnZVwiLGUuR2V0U3RvcmVmcm9udFByb3ZpZGVyRm9vdGVyPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItZm9vdGVyXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbmF2aWdhdGlvblwiLGUuTGF1bmNoU3RvcmVmcm9udFByb3ZpZGVyQXBwPVwibGF1bmNoLXN0b3JlZnJvbnQtcHJvdmlkZXItYXBwXCIsZS5TaG93SG9tZT1cInNob3ctaG9tZVwiLGUuSGlkZUhvbWU9XCJoaWRlLWhvbWVcIixlLkFzc2lnbkhvbWVTZWFyY2hDb250ZXh0PVwiYXNzaWduLWhvbWUtc2VhcmNoLWNvbnRleHRcIixlLlNldFNlYXJjaFF1ZXJ5PVwic2V0LXNlYXJjaC1xdWVyeVwiLGUuT3BlbkhvbWVBbmRTZXRTZWFyY2hRdWVyeT1cIm9wZW4taG9tZS1hbmQtc2V0LXNlYXJjaC1xdWVyeVwiLGUuR2V0TGVnYWN5UGFnZXM9XCJnZXQtbGVnYWN5LXBhZ2VzXCIsZS5HZXRMZWdhY3lXb3Jrc3BhY2VzPVwiZ2V0LWxlZ2FjeS13b3Jrc3BhY2VzXCIsZS5HZXRDb21wdXRlZFBsYXRmb3JtVGhlbWU9XCJnZXQtY29tcHV0ZWQtcGxhdGZvcm0tdGhlbWVcIixlLlNldFNlbGVjdGVkU2NoZW1lPVwic2V0LXNlbGVjdGVkLXNjaGVtZVwiLGUuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5EZXJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyPVwiZGVyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5IaWRlU3RvcmVmcm9udD1cImhpZGUtc3RvcmVmcm9udFwiLGUuU2hvd1N0b3JlZnJvbnQ9XCJzaG93LXN0b3JlZnJvbnRcIn0oYXx8KGE9e30pKTtjb25zdCBzPSgwLG8uWikoXCJfX29mX3dvcmtzcGFjZV9wcm90b2NvbF9fXCIpLGM9XCJpc0xhdW5jaGVkVmlhTGliXCIsZD1lPT57Y29uc3QgdD1uZXcgVVJMKGUpO3JldHVybiB0LnNlYXJjaFBhcmFtcy5hcHBlbmQoYyxcInRydWVcIiksdC50b1N0cmluZygpfSx1PWFzeW5jKCk9Pnthd2FpdCgwLGkuSlYpKGkuaVcpfHwoKHIuWkt8fC0xPT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luXCIpKSYmYXdhaXQgZmluLkFwcGxpY2F0aW9uLnN0YXJ0RnJvbU1hbmlmZXN0KGQoci5hVykpLGF3YWl0IGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKGQoci5HWCkpKX0sbD1hc3luYygpPT4oYXdhaXQgdSgpLHMoKSl9LDgyOihlLHQsbik9PntuLmQodCx7Ujg6KCk9PmEsWF86KCk9PmksbFA6KCk9Pm99KTt2YXIgbyxyPW4oMTUwKTshZnVuY3Rpb24oZSl7ZS5TdG9yZWZyb250PVwic3RvcmVmcm9udFwiLGUuRG9jaz1cImRvY2tcIn0ob3x8KG89e30pKTtjb25zdCBpPWFzeW5jIGU9Pihhd2FpdCgwLHIuRG0pKCkpLmRpc3BhdGNoKHIuV0YuU2hvd1Byb3ZpZGVyV2luZG93LHtwcm92aWRlclR5cGU6ZX0pLGE9YXN5bmMgZT0+KGF3YWl0KDAsci5EbSkoKSkuZGlzcGF0Y2goci5XRi5IaWRlUHJvdmlkZXJXaW5kb3cse3Byb3ZpZGVyVHlwZTplfSl9LDgwNjooZSx0LG4pPT57bi5kKHQse3E5OigpPT5vfSk7dmFyIG8scixpLGE9big2NzgpOyFmdW5jdGlvbihlKXtlLldvcmtzcGFjZT1cIm9wZW5maW4tYnJvd3NlclwifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuUnVuUmVxdWVzdGVkPVwicnVuLXJlcXVlc3RlZFwiLGUuV2luZG93T3B0aW9uc0NoYW5nZWQ9XCJ3aW5kb3ctb3B0aW9ucy1jaGFuZ2VkXCIsZS5XaW5kb3dDbG9zZWQ9XCJ3aW5kb3ctY2xvc2VkXCIsZS5XaW5kb3dDcmVhdGVkPVwid2luZG93LWNyZWF0ZWRcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkZpblByb3RvY29sPVwiZmluLXByb3RvY29sXCJ9KGl8fChpPXt9KSk7YS5BQixvLldvcmtzcGFjZX0sMTE3OihlLHQsbik9PntuLmQodCx7WjooKT0+aX0pO3ZhciBvPW4oNjc4KTtjb25zdCByPW8uQXgmJlwiY29tcGxldGVcIiE9PWRvY3VtZW50LnJlYWR5U3RhdGUmJm5ldyBQcm9taXNlKChlPT5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCgoKT0+e1wiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGUmJmUoKX0pKSkpO2Z1bmN0aW9uIGkoZSl7bGV0IHQ7cmV0dXJuKCk9PntpZighby5zUyl0aHJvdyBuZXcgRXJyb3IoXCJnZXRDaGFubmVsQ2xpZW50IGNhbm5vdCBiZSB1c2VkIG91dHNpZGUgYW4gT3BlbkZpbiBlbnYuIEF2b2lkIHVzaW5nIHRoaXMgbWV0aG9kIGR1cmluZyBwcmUtcmVuZGVyaW5nLlwiKTtyZXR1cm4gdHx8KHQ9KGFzeW5jKCk9Pnthd2FpdCByO2NvbnN0IG49e2NsaWVudEFQSVZlcnNpb246by51MH0saT1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSx7cGF5bG9hZDpufSk7cmV0dXJuIGkub25EaXNjb25uZWN0aW9uKChhc3luYygpPT57Y29uc29sZS53YXJuKGBkaXNjb25uZWN0ZWQgZnJvbSBjaGFubmVsIHByb3ZpZGVyICR7ZX1gKSx0PXZvaWQgMH0pKSxpfSkoKS50aGVuKChlPT5lKSkuY2F0Y2goKG49Pnt0aHJvdyB0PXZvaWQgMCxuZXcgRXJyb3IoYGZhaWxlZCB0byBjb25uZWN0IHRvIGNoYW5uZWwgcHJvdmlkZXIgJHtlfTogJHtufWApfSkpKSx0fX19LDY3ODooZSx0LG4pPT57dmFyIG87bi5kKHQse0FCOigpPT5zLEF4OigpPT5pLEdYOigpPT51LFpLOigpPT5kLGFXOigpPT5sLG9DOigpPT5jLHNTOigpPT5yLHUwOigpPT5mfSksZnVuY3Rpb24oZSl7ZS5Mb2NhbD1cImxvY2FsXCIsZS5EZXY9XCJkZXZcIixlLlN0YWdpbmc9XCJzdGFnaW5nXCIsZS5Qcm9kPVwicHJvZFwifShvfHwobz17fSkpO2NvbnN0IHI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGZpbixpPShcInVuZGVmaW5lZFwiPT10eXBlb2YgcHJvY2Vzc3x8cHJvY2Vzcy5lbnY/LkpFU1RfV09SS0VSX0lELFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpLGE9aT93aW5kb3cub3JpZ2luOm8uTG9jYWwscz1yJiZmaW4ubWUudXVpZCxjPXImJmZpbi5tZS5uYW1lLGQ9KHImJmZpbi5tZS5lbnRpdHlUeXBlLFwicHJvZFwiPT09by5Mb2NhbCksdT0oby5EZXYsby5TdGFnaW5nLG8uUHJvZCxcImZpbnM6Ly9zeXN0ZW0tYXBwcy93b3Jrc3BhY2VcIiksbD1cImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzkuNi4wL2FwcC5qc29uXCIscD1lPT5lLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpfHxlLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKT9lOmErZSxmPShwKFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvOS42LjBcIikscChcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzkuNi4wXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfRE9DU19QTEFURk9STV9VUkwmJnAoV09SS1NQQUNFX0RPQ1NfUExBVEZPUk1fVVJMKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX0RPQ1NfQ0xJRU5UX1VSTCYmcChXT1JLU1BBQ0VfRE9DU19DTElFTlRfVVJMKSxcIjkuNi4wXCIpfSw1MzI6KGUsdCxuKT0+e24uZCh0LHtXbjooKT0+ZCxjazooKT0+cyxkOTooKT0+Y30pO3ZhciBvLHI9big2NzgpLGk9bigxMjEpOyFmdW5jdGlvbihlKXtlLkJyb3dzZXI9XCJCcm93c2VyXCIsZS5Eb2NrPVwiRG9ja1wiLGUuSG9tZT1cIkhvbWVcIixlLk5vdGlmaWNhdGlvbj1cIk5vdGlmaWNhdGlvblwiLGUuU3RvcmVmcm9udD1cIlN0b3JlZnJvbnRcIixlLlBsYXRmb3JtPVwiUGxhdGZvcm1cIixlLlRoZW1pbmc9XCJUaGVtaW5nXCJ9KG98fChvPXt9KSk7Y29uc3QgYT1hc3luYyhlLHQpPT57Y29uc3Qgbj17YXBpVmVyc2lvbjp0LmFwaVZlcnNpb258fHIudTAsY29tcG9uZW50TmFtZTplLGNvbXBvbmVudFZlcnNpb246dC5jb21wb25lbnRWZXJzaW9ufHxyLnUwLGFsbG93ZWQ6dC5hbGxvd2VkLHJlamVjdGlvbkNvZGU6dC5yZWplY3Rpb25Db2RlfTtmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJ3b3Jrc3BhY2UtbGljZW5zaW5nXCIsZGF0YTpufSl9LHM9YXN5bmMgZT0+e2kuT0kudXVpZD09PWkuR2kudXVpZCYmaS5PSS5uYW1lPT09aS5HaS5uYW1lfHxhKG8uSG9tZSxlKX0sYz1hc3luYyBlPT57YShvLlN0b3JlZnJvbnQsZSl9LGQ9YXN5bmMgZT0+e2Eoby5Eb2NrLGUpfX0sMTIxOihlLHQsbik9PntuLmQodCx7R2k6KCk9PmQsSlY6KCk9PnAsT0k6KCk9PnUsaVc6KCk9Pmx9KTt2YXIgbyxyLGksYT1uKDgwNikscz1uKDY3OCk7IWZ1bmN0aW9uKGUpe2UuSG9tZT1cIm9wZW5maW4taG9tZVwiLGUuRG9jaz1cIm9wZW5maW4tZG9ja1wiLGUuU3RvcmVmcm9udD1cIm9wZW5maW4tc3RvcmVmcm9udFwiLGUuSG9tZUludGVybmFsPVwib3BlbmZpbi1ob21lLWludGVybmFsXCIsZS5Ccm93c2VyTWVudT1cIm9wZW5maW4tYnJvd3Nlci1tZW51XCIsZS5Ccm93c2VySW5kaWNhdG9yPVwib3BlbmZpbi1icm93c2VyLWluZGljYXRvclwiLGUuQnJvd3NlcldpbmRvdz1cImludGVybmFsLWdlbmVyYXRlZC13aW5kb3dcIixlLkNsYXNzaWNXaW5kb3c9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtY2xhc3NpYy13aW5kb3dcIn0ob3x8KG89e30pKSxmdW5jdGlvbihlKXtlLlNob3duPVwic2hvd25cIixlLkJvdW5kc0NoYW5nZWQ9XCJib3VuZHMtY2hhbmdlZFwiLGUuTGF5b3V0UmVhZHk9XCJsYXlvdXQtcmVhZHlcIixlLkVuZFVzZXJCb3VuZHNDaGFuZ2luZz1cImVuZC11c2VyLWJvdW5kcy1jaGFuZ2luZ1wiLGUuQmx1cnJlZD1cImJsdXJyZWRcIixlLkNsb3NlZD1cImNsb3NlZFwiLGUuQ2xvc2VSZXF1ZXN0ZWQ9XCJjbG9zZS1yZXF1ZXN0ZWRcIixlLkZvY3VzZWQ9XCJmb2N1c2VkXCIsZS5TaG93UmVxdWVzdGVkPVwic2hvdy1yZXF1ZXN0ZWRcIixlLlZpZXdDcmFzaGVkPVwidmlldy1jcmFzaGVkXCIsZS5WaWV3QXR0YWNoZWQ9XCJ2aWV3LWF0dGFjaGVkXCIsZS5WaWV3RGV0YWNoZWQ9XCJ2aWV3LWRldGFjaGVkXCIsZS5WaWV3UGFnZVRpdGxlVXBkYXRlZD1cInZpZXctcGFnZS10aXRsZS11cGRhdGVkXCIsZS5WaWV3RGVzdHJveWVkPVwidmlldy1kZXN0cm95ZWRcIixlLk9wdGlvbnNDaGFuZ2VkPVwib3B0aW9ucy1jaGFuZ2VkXCJ9KHJ8fChyPXt9KSksZnVuY3Rpb24oZSl7ZS5CZWZvcmVVbmxvYWQ9XCJiZWZvcmV1bmxvYWRcIn0oaXx8KGk9e30pKTtmdW5jdGlvbiBjKGUpe2lmKCFzLnNTKXRocm93IG5ldyBFcnJvcihcImdldE9GV2luZG93IGNhbiBvbmx5IGJlIHVzZWQgaW4gYW4gT3BlbkZpbiBlbnYuIEF2b2lkIGNhbGxpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiBmaW4uV2luZG93LndyYXBTeW5jKGUpfWNvbnN0IGQ9e25hbWU6cy5vQyx1dWlkOnMuQUJ9O2NvbnN0IHU9e25hbWU6by5Ib21lLHV1aWQ6YS5xOS5Xb3Jrc3BhY2V9LGw9KG8uRG9jayxhLnE5LldvcmtzcGFjZSxvLlN0b3JlZnJvbnQsYS5xOS5Xb3Jrc3BhY2Use25hbWU6YS5xOS5Xb3Jrc3BhY2UsdXVpZDphLnE5LldvcmtzcGFjZX0pO2NvbnN0IHA9ZT0+YyhlKS5nZXRPcHRpb25zKCkudGhlbigoKCk9PiEwKSkuY2F0Y2goKCgpPT4hMSkpfSwzMTY6KGUsdCxuKT0+e3ZhciBvLHIsaTtuLmQodCx7RGU6KCk9Pm8scHg6KCk9PnIsd3Q6KCk9Pml9KSxmdW5jdGlvbihlKXtlLkZldGNoaW5nPVwiZmV0Y2hpbmdcIixlLkZldGNoZWQ9XCJmZXRjaGVkXCIsZS5Db21wbGV0ZT1cImNvbXBsZXRlXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5Vc2VyQWN0aW9uPVwidXNlci1hY3Rpb25cIixlLkZvY3VzQ2hhbmdlPVwiZm9jdXMtY2hhbmdlXCIsZS5SZWxvYWQ9XCJyZWxvYWRcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkFjdGl2ZT1cImFjdGl2ZVwiLGUuRGVmYXVsdD1cImRlZmF1bHRcIn0oaXx8KGk9e30pKX19LHQ9e307ZnVuY3Rpb24gbihvKXt2YXIgcj10W29dO2lmKHZvaWQgMCE9PXIpcmV0dXJuIHIuZXhwb3J0czt2YXIgaT10W29dPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtvXShpLGkuZXhwb3J0cyxuKSxpLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBvIGluIHQpbi5vKHQsbykmJiFuLm8oZSxvKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbyx7ZW51bWVyYWJsZTohMCxnZXQ6dFtvXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpLG4ucj1lPT57XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX07dmFyIG89e307KCgpPT57bi5yKG8pLG4uZChvLHtBY3Rpb25UcmlnZ2VyOigpPT5XLnAsQXBwTWFuaWZlc3RUeXBlOigpPT5JLkwsQnV0dG9uU3R5bGU6KCk9PmsuWkosQ0xJQWN0aW9uOigpPT5DLlB0LENMSUZpbHRlck9wdGlvblR5cGU6KCk9PkMuZWwsQ0xJVGVtcGxhdGU6KCk9PkMueVcsQ29udGFpbmVyVGVtcGxhdGVGcmFnbWVudE5hbWVzOigpPT5rLnA2LERvY2s6KCk9PmUsRG9ja0J1dHRvbk5hbWVzOigpPT5kLnYsSG9tZTooKT0+dixMZWdhY3k6KCk9PnQsUHJlc2VudGF0aW9uVGVtcGxhdGVGcmFnbWVudE5hbWVzOigpPT5rLkdvLFNlYXJjaFRhZ0JhY2tncm91bmQ6KCk9PlcudyxTdG9yZWZyb250OigpPT5QLFN0b3JlZnJvbnRUZW1wbGF0ZTooKT0+SS5ULFRlbXBsYXRlRnJhZ21lbnRUeXBlczooKT0+ay5iSX0pO3ZhciBlPXt9O24ucihlKSxuLmQoZSx7RG9ja0J1dHRvbk5hbWVzOigpPT5kLnYsZGVyZWdpc3RlcjooKT0+ZixtaW5pbWl6ZTooKT0+ZyxyZWdpc3RlcjooKT0+cCxzaG93OigpPT53fSk7dmFyIHQ9e307bi5yKHQpLG4uZCh0LHtnZXRQYWdlczooKT0+bSxnZXRXb3Jrc3BhY2VzOigpPT5TfSk7dmFyIHI9big2NzgpLGk9big1MzIpLGE9bigxNTApLHM9big0MzgpLGM9big4MiksZD1uKDQyNyk7bGV0IHUsbD0hMTtjb25zdCBwPWU9Pih1PW5ldyBQcm9taXNlKChhc3luYyh0LG4pPT57dHJ5e2NvbnN0IG49YXdhaXQoYXN5bmMgZT0+e2F3YWl0KDAscy5IaCkoZmluLm1lLmlkZW50aXR5KTtjb25zdCB0PWF3YWl0KDAsYS5YbCkoKTtpZihsKXRocm93IG5ldyBFcnJvcihcIkEgZG9jayBwcm92aWRlciBmb3IgdGhlIHBsYXRmb3JtIGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5cIik7cmV0dXJuIGw9ITAsZS5jbGllbnRBUElWZXJzaW9uPXIudTAsdC5kaXNwYXRjaChhLldGLlJlZ2lzdGVyUHJvdmlkZXIse3Byb3ZpZGVyVHlwZTpjLmxQLkRvY2ssaW5mbzplfSl9KShlKTsoMCxpLlduKSh7YWxsb3dlZDohMCxjb21wb25lbnRWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb259KSxuPy53b3Jrc3BhY2VWZXJzaW9uLHIudTAsdCh7Y2xpZW50QVBJVmVyc2lvbjpyLnUwLHdvcmtzcGFjZVZlcnNpb246bj8ud29ya3NwYWNlVmVyc2lvbj8/XCJcIn0pfWNhdGNoKGUpeygwLGkuV24pKHthbGxvd2VkOiExLHJlamVjdGlvbkNvZGU6ZSBpbnN0YW5jZW9mIEVycm9yP2UubWVzc2FnZTpcInVua25vd25cIn0pLG4oZSksdT1udWxsfX0pKSx1KSxmPWFzeW5jKCk9Pnthd2FpdCB1LGw9ITE7cmV0dXJuKGF3YWl0KDAsYS5YbCkoKSkuZGlzcGF0Y2goYS5XRi5EZXJlZ2lzdGVyUHJvdmlkZXIse3Byb3ZpZGVyVHlwZTpjLmxQLkRvY2t9KX0sZz1hc3luYygpPT57YXdhaXQgdSxhd2FpdCgwLGEuYUIpKCksYXdhaXQoMCxjLlI4KShjLmxQLkRvY2spfSx3PWFzeW5jKCk9Pnthd2FpdCB1LGF3YWl0KDAsYS5hQikoKSxhd2FpdCgwLGMuWF8pKGMubFAuRG9jayl9O3ZhciBoLHY9big3MDMpO24oMTIxKTshZnVuY3Rpb24oZSl7ZS5UYWJDcmVhdGVkPVwidGFiLWNyZWF0ZWRcIixlLkNvbnRhaW5lckNyZWF0ZWQ9XCJjb250YWluZXItY3JlYXRlZFwiLGUuQ29udGFpbmVyUmVzaXplZD1cImNvbnRhaW5lci1yZXNpemVkXCJ9KGh8fChoPXt9KSk7bmV3IE1hcDt2YXIgeTshZnVuY3Rpb24oZSl7ZS5DdXJyZW50V29ya3NwYWNlSWQ9XCJjdXJyZW50V29ya3NwYWNlSWRcIixlLkxhc3RGb2N1c2VkQnJvd3NlcldpbmRvdz1cImxhc3RGb2N1c2VkQnJvd3NlcldpbmRvd1wiLGUuTWFjaGluZU5hbWU9XCJtYWNoaW5lTmFtZVwiLGUuTmV3VGFiUGFnZUxheW91dD1cIk5ld1RhYlBhZ2VMYXlvdXRcIixlLk5ld1RhYlBhZ2VTb3J0PVwiTmV3VGFiUGFnZVNvcnRcIixlLkRvY2tQb3NpdGlvbj1cIkRvY2tQb3NpdGlvblwiLGUuU2VsZWN0ZWRDb2xvclNjaGVtZT1cIlNlbGVjdGVkQ29sb3JTY2hlbWVcIixlLkhhc01vdmVkU3RvcmU9XCJIYXNNb3ZlZFN0b3JlXCJ9KHl8fCh5PXt9KSk7Y29uc3QgbT0oKT0+YXN5bmMgZnVuY3Rpb24oKXtyZXR1cm4oYXdhaXQoMCxhLkRtKSgpKS5kaXNwYXRjaChhLldGLkdldExlZ2FjeVBhZ2VzLHZvaWQgMCl9KCksUz0oKT0+KGFzeW5jKCk9Pihhd2FpdCgwLGEuRG0pKCkpLmRpc3BhdGNoKGEuV0YuR2V0TGVnYWN5V29ya3NwYWNlcyx2b2lkIDApKSgpO3ZhciBQPW4oNTI4KSxXPW4oMjk4KSxrPW4oMTA5KSxDPW4oNzU4KSxJPW4oMTE0KX0pKCksbW9kdWxlLmV4cG9ydHM9b30pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TGlrZUtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2NpaVRvQXJyYXk7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCJ2YXIgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAqIGFycmF5IG9mIGBvYmplY3RgIHByb3BlcnR5IHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eSBuYW1lc1xuICogb2YgYHByb3BzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIGFycmF5TWFwKHByb3BzLCBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VWYWx1ZXM7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5QXJyYXk7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG4iLCJ2YXIgYXNjaWlUb0FycmF5ID0gcmVxdWlyZSgnLi9fYXNjaWlUb0FycmF5JyksXG4gICAgaGFzVW5pY29kZSA9IHJlcXVpcmUoJy4vX2hhc1VuaWNvZGUnKSxcbiAgICB1bmljb2RlVG9BcnJheSA9IHJlcXVpcmUoJy4vX3VuaWNvZGVUb0FycmF5Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBoYXNVbmljb2RlKHN0cmluZylcbiAgICA/IHVuaWNvZGVUb0FycmF5KHN0cmluZylcbiAgICA6IGFzY2lpVG9BcnJheShzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvQXJyYXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlVG9BcnJheTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpLFxuICAgIHN0dWJGYWxzZSA9IHJlcXVpcmUoJy4vc3R1YkZhbHNlJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB2YWx1ZXMgPSByZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bUl0ZXJhdG9yID0gU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0FycmF5KHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiBfLnRvQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddXG4gKlxuICogXy50b0FycmF5KDEpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLnRvQXJyYXkobnVsbCk7XG4gKiAvLyA9PiBbXVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb0FycmF5KHZhbHVlKSA6IGNvcHlBcnJheSh2YWx1ZSk7XG4gIH1cbiAgaWYgKHN5bUl0ZXJhdG9yICYmIHZhbHVlW3N5bUl0ZXJhdG9yXSkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkodmFsdWVbc3ltSXRlcmF0b3JdKCkpO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgZnVuYyA9IHRhZyA9PSBtYXBUYWcgPyBtYXBUb0FycmF5IDogKHRhZyA9PSBzZXRUYWcgPyBzZXRUb0FycmF5IDogdmFsdWVzKTtcblxuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheTtcbiIsInZhciBiYXNlVmFsdWVzID0gcmVxdWlyZSgnLi9fYmFzZVZhbHVlcycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9lbW9qaScpOyIsIi8qanNsaW50IG5vZGU6IHRydWUqL1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvdG9BcnJheScpO1xudmFyIGVtb2ppQnlOYW1lID0gcmVxdWlyZSgnLi9lbW9qaS5qc29uJyk7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIHJlZ2V4IHRvIHBhcnNlIGVtb2ppIGluIGEgc3RyaW5nIC0gZmluZHMgZW1vamksIGUuZy4gOmNvZmZlZTpcbiAqL1xudmFyIGVtb2ppTmFtZVJlZ2V4ID0gLzooW2EtekEtWjAtOV9cXC1cXCtdKyk6L2c7XG5cbi8qKlxuICogcmVnZXggdG8gdHJpbSB3aGl0ZXNwYWNlXG4gKiB1c2UgaW5zdGVhZCBvZiBTdHJpbmcucHJvdG90eXBlLnRyaW0oKSBmb3IgSUU4IHN1cHBvcnRcbiAqL1xudmFyIHRyaW1TcGFjZVJlZ2V4ID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG4vKipcbiAqIFJlbW92ZXMgY29sb25zIG9uIGVpdGhlciBzaWRlXG4gKiBvZiB0aGUgc3RyaW5nIGlmIHByZXNlbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQ29sb25zIChzdHIpIHtcbiAgdmFyIGNvbG9uSW5kZXggPSBzdHIuaW5kZXhPZignOicpO1xuICBpZiAoY29sb25JbmRleCA+IC0xKSB7XG4gICAgLy8gOmVtb2ppOiAoaHR0cDovL3d3dy5lbW9qaS1jaGVhdC1zaGVldC5jb20vKVxuICAgIGlmIChjb2xvbkluZGV4ID09PSBzdHIubGVuZ3RoIC0gMSkge1xuICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBjb2xvbkluZGV4KTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyKGNvbG9uSW5kZXggKyAxKTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQWRkcyBjb2xvbnMgdG8gZWl0aGVyIHNpZGVcbiAqIG9mIHRoZSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gd3JhcENvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyLmxlbmd0aCA+IDApID8gJzonICsgc3RyICsgJzonIDogc3RyO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IHRoZSB3b3JkIGlzIHdyYXBwZWQgaW4gY29sb25zXG4gKiBieSBvbmx5IGFkZGluZyB0aGVtLCBpZiB0aGV5IGFyZSBub3QgdGhlcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuc3VyZUNvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyWzBdICE9PSAnOicpID8gd3JhcENvbG9ucyhzdHIpIDogc3RyO1xufVxuXG4vLyBOb24gc3BhY2luZyBtYXJrLCBzb21lIGVtb3RpY29ucyBoYXZlIHRoZW0uIEl0J3MgdGhlICdWYXJpYW50IEZvcm0nLFxuLy8gd2hpY2ggcHJvdmlkZXMgbW9yZSBpbmZvcm1hdGlvbiBzbyB0aGF0IGVtb3RpY29ucyBjYW4gYmUgcmVuZGVyZWQgYXNcbi8vIG1vcmUgY29sb3JmdWwgZ3JhcGhpY3MuIEZFMEUgaXMgYSB1bmljb2RlIHRleHQgdmVyc2lvbiwgd2hlcmUgYXMgRkUwRlxuLy8gc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgZ3JhcGhpY2FsIHZlcnNpb24uIFRoZSBjb2RlIGdyYWNlZnVsbHkgZGVncmFkZXMuXG52YXIgTk9OX1NQQUNJTkdfTUFSSyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUwMzkpOyAvLyA2NTAzOSAtICfvuI8nIC0gMHhGRTBGO1xudmFyIG5vblNwYWNpbmdSZWdleCA9IG5ldyBSZWdFeHAoTk9OX1NQQUNJTkdfTUFSSywgJ2cnKVxuXG4vLyBSZW1vdmUgdGhlIG5vbi1zcGFjaW5nLW1hcmsgZnJvbSB0aGUgY29kZSwgbmV2ZXIgc2VuZCBhIHN0cmlwcGVkIHZlcnNpb25cbi8vIHRvIHRoZSBjbGllbnQsIGFzIGl0IGtpbGxzIGdyYXBoaWNhbCBlbW90aWNvbnMuXG5mdW5jdGlvbiBzdHJpcE5TQiAoY29kZSkge1xuICByZXR1cm4gY29kZS5yZXBsYWNlKG5vblNwYWNpbmdSZWdleCwgJycpO1xufTtcblxuLy8gUmV2ZXJzZWQgaGFzaCB0YWJsZSwgd2hlcmUgYXMgZW1vamlCeU5hbWUgY29udGFpbnMgYSB7IGhlYXJ0OiAn4p2kJyB9XG4vLyBkaWN0aW9uYXJ5IGVtb2ppQnlDb2RlIGNvbnRhaW5zIHsg4p2kOiAnaGVhcnQnIH0uIFRoZSBjb2RlcyBhcmUgbm9ybWFsaXplZFxuLy8gdG8gdGhlIHRleHQgdmVyc2lvbi5cbnZhciBlbW9qaUJ5Q29kZSA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKS5yZWR1Y2UoZnVuY3Rpb24oaCxrKSB7XG4gIGhbc3RyaXBOU0IoZW1vamlCeU5hbWVba10pXSA9IGs7XG4gIHJldHVybiBoO1xufSwge30pO1xuXG4vKipcbiAqIEVtb2ppIG5hbWVzcGFjZVxuICovXG52YXIgRW1vamkgPSB7XG4gIGVtb2ppOiBlbW9qaUJ5TmFtZSxcbn07XG5cbi8qKlxuICogZ2V0IGVtb2ppIGNvZGUgZnJvbSBuYW1lLiByZXR1cm4gZW1vamkgY29kZSBiYWNrIGlmIGNvZGUgaXMgcGFzc2VkIGluLlxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5fZ2V0ID0gZnVuY3Rpb24gX2dldCAoZW1vamkpIHtcbiAgaWYgKGVtb2ppQnlDb2RlW3N0cmlwTlNCKGVtb2ppKV0pIHtcbiAgICByZXR1cm4gZW1vamk7XG4gIH0gZWxzZSBpZiAoZW1vamlCeU5hbWUuaGFzT3duUHJvcGVydHkoZW1vamkpKSB7XG4gICAgcmV0dXJuIGVtb2ppQnlOYW1lW2Vtb2ppXTtcbiAgfVxuXG4gIHJldHVybiBlbnN1cmVDb2xvbnMoZW1vamkpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgY29kZSBmcm9tIDplbW9qaTogc3RyaW5nIG9yIG5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkuZ2V0ID0gZnVuY3Rpb24gZ2V0IChlbW9qaSkge1xuICBlbW9qaSA9IHN0cmlwQ29sb25zKGVtb2ppKTtcblxuICByZXR1cm4gRW1vamkuX2dldChlbW9qaSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IGVpdGhlciBjb2RlIG9yIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lT3JDb2RlIFRoZSBlbW9qaSB0byBmaW5kLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmZpbmQgPSBmdW5jdGlvbiBmaW5kIChuYW1lT3JDb2RlKSB7XG4gIHJldHVybiBFbW9qaS5maW5kQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmZpbmRCeUNvZGUobmFtZU9yQ29kZSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBlbW9qaSB0byBmaW5kIGVpdGhlciBgY29mZmVlYCBvciBgOmNvZmZlZTpgO1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5maW5kQnlOYW1lID0gZnVuY3Rpb24gZmluZEJ5TmFtZSAobmFtZSkge1xuICB2YXIgc3RyaXBwZWQgPSBzdHJpcENvbG9ucyhuYW1lKTtcbiAgdmFyIGVtb2ppID0gZW1vamlCeU5hbWVbc3RyaXBwZWRdO1xuXG4gIHJldHVybiBlbW9qaSA/ICh7IGVtb2ppOiBlbW9qaSwga2V5OiBzdHJpcHBlZCB9KSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgY29kZSAoZW1vamkpXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSBUaGUgZW1vamkgdG8gZmluZDsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuZmluZEJ5Q29kZSA9IGZ1bmN0aW9uIGZpbmRCeUNvZGUgKGNvZGUpIHtcbiAgdmFyIHN0cmlwcGVkID0gc3RyaXBOU0IoY29kZSk7XG4gIHZhciBuYW1lID0gZW1vamlCeUNvZGVbc3RyaXBwZWRdO1xuXG4gIC8vIGxvb2t1cCBlbW9qaSB0byBlbnN1cmUgdGhlIFZhcmlhbnQgRm9ybSBpcyByZXR1cm5lZFxuICByZXR1cm4gbmFtZSA/ICh7IGVtb2ppOiBlbW9qaUJ5TmFtZVtuYW1lXSwga2V5OiBuYW1lIH0pIDogdW5kZWZpbmVkO1xufTtcblxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVtb2ppIGlzIGtub3duIGJ5IHRoaXMgbGlicmFyeVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPckNvZGUgVGhlIGVtb2ppIHRvIHZhbGlkYXRlLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppID0gZnVuY3Rpb24gaGFzRW1vamkgKG5hbWVPckNvZGUpIHtcbiAgcmV0dXJuIEVtb2ppLmhhc0Vtb2ppQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmhhc0Vtb2ppQnlDb2RlKG5hbWVPckNvZGUpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhbiBlbW9qaSB3aXRoIGdpdmVuIG5hbWUgaXMga25vd24gYnkgdGhpcyBsaWJyYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZW1vamkgdG8gdmFsaWRhdGUgZWl0aGVyIGBjb2ZmZWVgIG9yIGA6Y29mZmVlOmA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppQnlOYW1lID0gZnVuY3Rpb24gaGFzRW1vamlCeU5hbWUgKG5hbWUpIHtcbiAgdmFyIHJlc3VsdCA9IEVtb2ppLmZpbmRCeU5hbWUobmFtZSk7XG4gIHJldHVybiAhIXJlc3VsdCAmJiByZXN1bHQua2V5ID09PSBzdHJpcENvbG9ucyhuYW1lKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiBlbW9qaSBpcyBrbm93biBieSB0aGlzIGxpYnJhcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBlbW9qaSB0byB2YWxpZGF0ZTsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamlCeUNvZGUgPSBmdW5jdGlvbiBoYXNFbW9qaUJ5Q29kZSAoY29kZSkge1xuICB2YXIgcmVzdWx0ID0gRW1vamkuZmluZEJ5Q29kZShjb2RlKTtcbiAgcmV0dXJuICEhcmVzdWx0ICYmIHN0cmlwTlNCKHJlc3VsdC5lbW9qaSkgPT09IHN0cmlwTlNCKGNvZGUpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgbmFtZSBmcm9tIGNvZGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1ZGVDb2xvbnMgc2hvdWxkIHRoZSByZXN1bHQgaW5jbHVkZSB0aGUgOjpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkud2hpY2ggPSBmdW5jdGlvbiB3aGljaCAoZW1vamlfY29kZSwgaW5jbHVkZUNvbG9ucykge1xuICB2YXIgY29kZSA9IHN0cmlwTlNCKGVtb2ppX2NvZGUpO1xuICB2YXIgd29yZCA9IGVtb2ppQnlDb2RlW2NvZGVdO1xuXG4gIHJldHVybiBpbmNsdWRlQ29sb25zID8gd3JhcENvbG9ucyh3b3JkKSA6IHdvcmQ7XG59O1xuXG4vKipcbiAqIGVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgOmVtb2ppOiB3aXRoIGFuIGVtb2ppKVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbl9taXNzaW5nIChnZXRzIGVtb2ppIG5hbWUgd2l0aG91dCA6OiBhbmQgcmV0dXJucyBhIHByb3BlciBlbW9qaSBpZiBubyBlbW9qaSB3YXMgZm91bmQpXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm9ybWF0ICh3cmFwIHRoZSByZXR1cm5lZCBlbW9qaSBpbiBhIGN1c3RvbSBlbGVtZW50KVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5lbW9qaWZ5ID0gZnVuY3Rpb24gZW1vamlmeSAoc3RyLCBvbl9taXNzaW5nLCBmb3JtYXQpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcblxuICByZXR1cm4gc3RyLnNwbGl0KGVtb2ppTmFtZVJlZ2V4KSAvLyBwYXJzZSBlbW9qaSB2aWEgcmVnZXhcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gcGFyc2VFbW9qaShzLCBpKSB7XG4gICAgICAgICAgICAgIC8vIGV2ZXJ5IHNlY29uZCBlbGVtZW50IGlzIGFuIGVtb2ppLCBlLmcuIFwidGVzdCA6ZmFzdF9mb3J3YXJkOlwiIC0+IFsgXCJ0ZXN0IFwiLCBcImZhc3RfZm9yd2FyZFwiIF1cbiAgICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSByZXR1cm4gcztcbiAgICAgICAgICAgICAgdmFyIGVtb2ppID0gRW1vamkuX2dldChzKTtcbiAgICAgICAgICAgICAgdmFyIGlzTWlzc2luZyA9IGVtb2ppLmluZGV4T2YoJzonKSA+IC0xO1xuXG4gICAgICAgICAgICAgIGlmIChpc01pc3NpbmcgJiYgdHlwZW9mIG9uX21pc3NpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb25fbWlzc2luZyhzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaXNNaXNzaW5nICYmIHR5cGVvZiBmb3JtYXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0KGVtb2ppLCBzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBlbW9qaTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJykgLy8gY29udmVydCBiYWNrIHRvIHN0cmluZ1xuICA7XG59O1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5yYW5kb20gPSBmdW5jdGlvbiByYW5kb20gKCkge1xuICB2YXIgZW1vamlLZXlzID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpO1xuICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaUtleXMubGVuZ3RoKTtcbiAgdmFyIGtleSA9IGVtb2ppS2V5c1tyYW5kb21JbmRleF07XG4gIHZhciBlbW9qaSA9IEVtb2ppLl9nZXQoa2V5KTtcbiAgcmV0dXJuIHsga2V5OiBrZXksIGVtb2ppOiBlbW9qaSB9O1xufVxuXG4vKipcbiAqICByZXR1cm4gYW4gY29sbGVjdGlvbiBvZiBwb3RlbnRpYWwgZW1vamkgbWF0Y2hlc1xuICogIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqICBAcmV0dXJuIHtBcnJheS48T2JqZWN0Pn1cbiAqL1xuRW1vamkuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoIChzdHIpIHtcbiAgdmFyIGVtb2ppS2V5cyA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKTtcbiAgdmFyIG1hdGNoZXIgPSBzdHJpcENvbG9ucyhzdHIpXG4gIHZhciBtYXRjaGluZ0tleXMgPSBlbW9qaUtleXMuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5pbmRleE9mKG1hdGNoZXIpID09PSAwO1xuICB9KTtcbiAgcmV0dXJuIG1hdGNoaW5nS2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgZW1vamk6IEVtb2ppLl9nZXQoa2V5KSxcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiB1bmVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgZW1vamkgd2l0aCA6ZW1vamk6KVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkudW5lbW9qaWZ5ID0gZnVuY3Rpb24gdW5lbW9qaWZ5IChzdHIpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcbiAgdmFyIHdvcmRzID0gdG9BcnJheShzdHIpO1xuXG4gIHJldHVybiB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCkge1xuICAgIHJldHVybiBFbW9qaS53aGljaCh3b3JkLCB0cnVlKSB8fCB3b3JkO1xuICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogcmVwbGFjZSBlbW9qaXMgd2l0aCByZXBsYWNlbWVudCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbnxzdHJpbmd9IHRoZSBzdHJpbmcgb3IgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgZW1vamkgd2l0aFxuICogQHBhcmFtIHtib29sZWFufSBzaG91bGQgdHJhaWxpbmcgd2hpdGVzcGFjZXMgYmUgY2xlYW5lZD8gRGVmYXVsdHMgZmFsc2VcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKHN0ciwgcmVwbGFjZW1lbnQsIGNsZWFuU3BhY2VzKSB7XG4gIGlmICghc3RyKSByZXR1cm4gJyc7XG5cbiAgdmFyIHJlcGxhY2UgPSB0eXBlb2YgcmVwbGFjZW1lbnQgPT09ICdmdW5jdGlvbicgPyByZXBsYWNlbWVudCA6IGZ1bmN0aW9uKCkgeyByZXR1cm4gcmVwbGFjZW1lbnQ7IH07XG4gIHZhciB3b3JkcyA9IHRvQXJyYXkoc3RyKTtcblxuICB2YXIgcmVwbGFjZWQgPSB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCwgaWR4KSB7XG4gICAgdmFyIGVtb2ppID0gRW1vamkuZmluZEJ5Q29kZSh3b3JkKTtcblxuICAgIGlmIChlbW9qaSAmJiBjbGVhblNwYWNlcyAmJiB3b3Jkc1tpZHggKyAxXSA9PT0gJyAnKSB7XG4gICAgICB3b3Jkc1tpZHggKyAxXSA9ICcnO1xuICAgIH1cblxuICAgIHJldHVybiBlbW9qaSA/IHJlcGxhY2UoZW1vamkpIDogd29yZDtcbiAgfSkuam9pbignJyk7XG5cbiAgcmV0dXJuIGNsZWFuU3BhY2VzID8gcmVwbGFjZWQucmVwbGFjZSh0cmltU3BhY2VSZWdleCwgJycpIDogcmVwbGFjZWQ7XG59O1xuXG5cbi8qKlxuICogcmVtb3ZlIGFsbCBlbW9qaXMgZnJvbSBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5zdHJpcCA9IGZ1bmN0aW9uIHN0cmlwIChzdHIpIHtcbiAgcmV0dXJuIEVtb2ppLnJlcGxhY2Uoc3RyLCAnJywgdHJ1ZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtb2ppO1xuIiwiaW1wb3J0IHtcblx0Q0xJVGVtcGxhdGUsXG5cdHR5cGUgQ0xJRmlsdGVyLFxuXHR0eXBlIEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHR0eXBlIEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHR0eXBlIEhvbWVTZWFyY2hSZXNwb25zZSxcblx0dHlwZSBIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCAqIGFzIGVtb2ppIGZyb20gXCJub2RlLWVtb2ppXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUsIE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGVscCB9IGZyb20gXCIuLi8uLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB0eXBlIHsgRW1vamlTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0RW1vamlUZW1wbGF0ZSB9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIEVtb2ppcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPEVtb2ppU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwiZW1vamlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgcmVzdWx0LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiA9IFwiRW1vamkgRGV0YWlsc1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSBlbW9qaSBjb3B5IGtleSBhY3Rpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTiA9IFwiQ29weSBLZXlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgY29weSBrZXkgYWN0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTiA9IFwiQ29weSBFbW9qaVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFbW9qaVNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFbW9qaVNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiAoKSA9PiB2b2lkLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgaXMgYmVpbmcgZGVyZWdpc3RlcmVkLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHt9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcz8oKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6IGAke0Vtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fUFJPVklERVJfSUR9LWhlbHBgLFxuXHRcdFx0XHR0aXRsZTogXCIvZW1vamlcIixcblx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdFx0cG9wdWxhdGVRdWVyeTogXCIvZW1vamkgXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCBjcmVhdGVIZWxwKFxuXHRcdFx0XHRcdFwiL2Vtb2ppXCIsXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XCJUaGUgZW1vamkgY29tbWFuZCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGVtb2ppcyBieSBuYW1lLlwiLFxuXHRcdFx0XHRcdFx0XCJGb3IgZXhhbXBsZSB0byBzZWFyY2ggZm9yIGVtb2ppcyB3aGljaCBpbmNsdWRlIGB3b21hbmAgb3IgYG1hbmAgaW4gdGhlaXIgbmFtZS5cIlxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0W1wiL2Vtb2ppIHdvbWFuXCIsIFwiL2Vtb2ppIG1hblwiXVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3QgZGF0YTogeyB1cmw/OiBzdHJpbmcgfSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTiAmJlxuXHRcdFx0XHRyZXN1bHQuZGF0YS5lbW9qaVxuXHRcdFx0KSB7XG5cdFx0XHRcdGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHsgZGF0YTogcmVzdWx0LmRhdGEuZW1vamkgfSk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0cmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTiAmJlxuXHRcdFx0XHRyZXN1bHQuZGF0YS5rZXlcblx0XHRcdCkge1xuXHRcdFx0XHRhd2FpdCBmaW4uQ2xpcGJvYXJkLndyaXRlVGV4dCh7IGRhdGE6IHJlc3VsdC5kYXRhLmtleSB9KTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRyZXN1bHQuYWN0aW9uLm5hbWUgPT09IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfREVUQUlMU19BQ1RJT04gJiZcblx0XHRcdFx0cmVzdWx0LmRhdGEudXJsICYmXG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5vcGVuVXJsXG5cdFx0XHQpIHtcblx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLm9wZW5VcmwoZGF0YS51cmwpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAocXVlcnkuc3RhcnRzV2l0aChcIi9lbW9qaSBcIikpIHtcblx0XHRcdGxldCBrZXkgPSBxdWVyeS5zbGljZSg3KTtcblxuXHRcdFx0aWYgKGtleS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRcdC8vIEZpbmQgZXhhY3QgbWF0Y2ggZmlyc3QgaWYgdGhlcmUgaXMgb25lXG5cdFx0XHRcdGNvbnN0IG1hdGNoRW1vamkgPSBlbW9qaS5nZXQoa2V5KTtcblx0XHRcdFx0aWYgKG1hdGNoRW1vamkgJiYgIW1hdGNoRW1vamkuc3RhcnRzV2l0aChcIjpcIikpIHtcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2goYXdhaXQgdGhpcy5jcmVhdGVSZXN1bHQoa2V5LCBtYXRjaEVtb2ppKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGaW5kIGFsbCBvdGhlciBwb3RlbnRpYWwgbWF0Y2hlc1xuXHRcdFx0XHRjb25zdCBzZWFyY2hSZXN1bHQgPSBlbW9qaS5zZWFyY2goa2V5KTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IHJlc3VsdCBvZiBzZWFyY2hSZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmVtb2ppICE9PSBtYXRjaEVtb2ppKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goYXdhaXQgdGhpcy5jcmVhdGVSZXN1bHQocmVzdWx0LmtleSwgcmVzdWx0LmVtb2ppKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHNcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIHNlYXJjaCByZXN1bHQuXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSBmb3IgdGhlIGVtb2ppLlxuXHQgKiBAcGFyYW0gc3ltYm9sIFRoZSBlbW9qaSBzeW1ib2wuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzdWx0LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBjcmVhdGVSZXN1bHQoa2V5OiBzdHJpbmcsIHN5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0PiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogYGVtb2ppLSR7a2V5fWAsXG5cdFx0XHR0aXRsZToga2V5LFxuXHRcdFx0bGFiZWw6IFwiSW5mb3JtYXRpb25cIixcblx0XHRcdGFjdGlvbnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9FTU9KSV9BQ1RJT04sXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtDXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfREVUQUlMU19BQ1RJT04sXG5cdFx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRlbW9qaTogc3ltYm9sLFxuXHRcdFx0XHR1cmw6IGBodHRwczovL2Vtb2ppcGVkaWEub3JnLyR7a2V5fS9gXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQ6IGF3YWl0IGdldEVtb2ppVGVtcGxhdGUoe1xuXHRcdFx0XHRcdGNvcHlFbW9qaUFjdGlvbjogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTixcblx0XHRcdFx0XHRjb3B5S2V5QWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTixcblx0XHRcdFx0XHRkZXRhaWxzQWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0RFVEFJTFNfQUNUSU9OXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0a2V5VGl0bGU6IFwiS2V5XCIsXG5cdFx0XHRcdFx0Y29weUtleVRpdGxlOiBcIkNvcHkgS2V5XCIsXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGVtb2ppVGl0bGU6IFwiRW1vamlcIixcblx0XHRcdFx0XHRjb3B5RW1vamlUaXRsZTogXCJDb3B5IEVtb2ppXCIsXG5cdFx0XHRcdFx0ZW1vamk6IHN5bWJvbCxcblx0XHRcdFx0XHRkZXRhaWxzVGl0bGU6IFwiRnVydGhlciBEZXRhaWxzXCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn1cbiIsImltcG9ydCB7IEJ1dHRvblN0eWxlLCBUZW1wbGF0ZUZyYWdtZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHsgY3JlYXRlQnV0dG9uLCBjcmVhdGVDb250YWluZXIsIGNyZWF0ZVRleHQgfSBmcm9tIFwiLi4vLi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VGhlbWUgfSBmcm9tIFwiLi4vLi4vdGhlbWVzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFbW9qaVRlbXBsYXRlKGFjdGlvbnM6IHtcblx0Y29weUVtb2ppQWN0aW9uOiBzdHJpbmc7XG5cdGNvcHlLZXlBY3Rpb246IHN0cmluZztcblx0ZGV0YWlsc0FjdGlvbjogc3RyaW5nO1xufSk6IFByb21pc2U8VGVtcGxhdGVGcmFnbWVudD4ge1xuXHRjb25zdCB0aGVtZSA9IGF3YWl0IGdldEN1cnJlbnRUaGVtZSgpO1xuXG5cdHJldHVybiBjcmVhdGVDb250YWluZXIoXG5cdFx0XCJjb2x1bW5cIixcblx0XHRbXG5cdFx0XHRhd2FpdCBjcmVhdGVUZXh0KFwia2V5VGl0bGVcIiwgMTIsIHsgY29sb3I6IHRoZW1lLnBhbGV0dGUuYnJhbmRQcmltYXJ5LCBmb250V2VpZ2h0OiBcImJvbGRcIiB9KSxcblx0XHRcdGF3YWl0IGNyZWF0ZUNvbnRhaW5lcihcblx0XHRcdFx0XCJyb3dcIixcblx0XHRcdFx0W1xuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoXCJrZXlcIiwgMTIsIHsgY29sb3I6IHRoZW1lLnBhbGV0dGUudGV4dERlZmF1bHQsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9KSxcblx0XHRcdFx0XHRhd2FpdCBjcmVhdGVCdXR0b24oQnV0dG9uU3R5bGUuU2Vjb25kYXJ5LCBcImNvcHlLZXlUaXRsZVwiLCBhY3Rpb25zLmNvcHlLZXlBY3Rpb24sIHtcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEycHhcIlxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG5cdFx0XHRcdFx0YWxpZ25JdGVtczogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRnYXA6IFwiMTBweFwiLFxuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0fVxuXHRcdFx0KSxcblxuXHRcdFx0YXdhaXQgY3JlYXRlVGV4dChcImVtb2ppVGl0bGVcIiwgMTIsIHsgY29sb3I6IHRoZW1lLnBhbGV0dGUuYnJhbmRQcmltYXJ5LCBmb250V2VpZ2h0OiBcImJvbGRcIiB9KSxcblx0XHRcdGF3YWl0IGNyZWF0ZUNvbnRhaW5lcihcblx0XHRcdFx0XCJyb3dcIixcblx0XHRcdFx0W1xuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoXCJlbW9qaVwiLCAzMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0RGVmYXVsdCB9KSxcblx0XHRcdFx0XHRhd2FpdCBjcmVhdGVCdXR0b24oQnV0dG9uU3R5bGUuU2Vjb25kYXJ5LCBcImNvcHlFbW9qaVRpdGxlXCIsIGFjdGlvbnMuY29weUVtb2ppQWN0aW9uLCB7XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogXCIxMnB4XCJcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRdLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0anVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuXHRcdFx0XHRcdGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG5cdFx0XHRcdFx0Z2FwOiBcIjEwcHhcIixcblx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiXG5cdFx0XHRcdH1cblx0XHRcdCksXG5cblx0XHRcdGF3YWl0IGNyZWF0ZUNvbnRhaW5lcihcblx0XHRcdFx0XCJyb3dcIixcblx0XHRcdFx0W1xuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5QcmltYXJ5LCBcImRldGFpbHNUaXRsZVwiLCBhY3Rpb25zLmRldGFpbHNBY3Rpb24sIHtcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEycHhcIlxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHsganVzdGlmeUNvbnRlbnQ6IFwiZmxleC1lbmRcIiB9XG5cdFx0XHQpXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRwYWRkaW5nOiBcIjEwcHhcIlxuXHRcdH1cblx0KTtcbn1cbiIsImltcG9ydCB0eXBlIHsgQ3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxubGV0IHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29uZmlndXJlZFNldHRpbmdzKCk6IFByb21pc2U8Q3VzdG9tU2V0dGluZ3M+IHtcblx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0Y29uc3QgbWFuaWZlc3Q6IE9wZW5GaW4uTWFuaWZlc3QgJiB7IGN1c3RvbVNldHRpbmdzPzogQ3VzdG9tU2V0dGluZ3MgfSA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdGlmIChtYW5pZmVzdC5jdXN0b21TZXR0aW5ncyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c2V0dGluZ3MgPSBtYW5pZmVzdC5jdXN0b21TZXR0aW5ncztcblx0fSBlbHNlIHtcblx0XHRzZXR0aW5ncyA9IHt9O1xuXHR9XG5cblx0cmV0dXJuIHNldHRpbmdzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxDdXN0b21TZXR0aW5ncz4ge1xuXHRpZiAoc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdHNldHRpbmdzID0gYXdhaXQgZ2V0Q29uZmlndXJlZFNldHRpbmdzKCk7XG5cdH1cblx0cmV0dXJuIHNldHRpbmdzO1xufVxuIiwiaW1wb3J0IHtcblx0QnV0dG9uU3R5bGUsXG5cdEJ1dHRvblRlbXBsYXRlRnJhZ21lbnQsXG5cdEltYWdlVGVtcGxhdGVGcmFnbWVudCxcblx0UGxhaW5Db250YWluZXJUZW1wbGF0ZUZyYWdtZW50LFxuXHRUZW1wbGF0ZUZyYWdtZW50LFxuXHRUZW1wbGF0ZUZyYWdtZW50VHlwZXMsXG5cdFRleHRUZW1wbGF0ZUZyYWdtZW50XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlICogYXMgQ1NTIGZyb20gXCJjc3N0eXBlXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VGhlbWUgfSBmcm9tIFwiLi90aGVtZXNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUhlbHAoXG5cdHRpdGxlOiBzdHJpbmcsXG5cdGRlc2NyaXB0aW9uOiBzdHJpbmdbXSxcblx0ZXhhbXBsZXM6IHN0cmluZ1tdXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pOiBQcm9taXNlPHsgbGF5b3V0OiBQbGFpbkNvbnRhaW5lclRlbXBsYXRlRnJhZ21lbnQ7IGRhdGE6IGFueSB9PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cdGNvbnN0IGFkZGl0aW9uYWxEYXRhID0ge307XG5cdGNvbnN0IGZyYWdtZW50czogVGVtcGxhdGVGcmFnbWVudFtdID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY3JpcHRpb24ubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBkZXNjcmlwdGlvbktleSA9IGBkZXNjLSR7aX1gO1xuXHRcdGFkZGl0aW9uYWxEYXRhW2Rlc2NyaXB0aW9uS2V5XSA9IGRlc2NyaXB0aW9uW2ldO1xuXHRcdGZyYWdtZW50cy5wdXNoKFxuXHRcdFx0YXdhaXQgY3JlYXRlVGV4dChkZXNjcmlwdGlvbktleSwgMTIsIHtcblx0XHRcdFx0cGFkZGluZzogXCI2cHggMHB4XCJcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxuXHRjb25zdCBleGFtcGxlRnJhZ21lbnRzOiBUZW1wbGF0ZUZyYWdtZW50W10gPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBleGFtcGxlcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGV4YW1wbGVLZXkgPSBgbGluZS0ke2l9YDtcblx0XHRhZGRpdGlvbmFsRGF0YVtleGFtcGxlS2V5XSA9IGV4YW1wbGVzW2ldO1xuXHRcdGV4YW1wbGVGcmFnbWVudHMucHVzaChcblx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoZXhhbXBsZUtleSwgMTIsIHtcblx0XHRcdFx0Zm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcblx0XHRcdFx0d2hpdGVTcGFjZTogXCJub3dyYXBcIlxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG5cdGlmIChleGFtcGxlRnJhZ21lbnRzLmxlbmd0aCA+IDApIHtcblx0XHRmcmFnbWVudHMucHVzaChcblx0XHRcdGF3YWl0IGNyZWF0ZUNvbnRhaW5lcihcImNvbHVtblwiLCBleGFtcGxlRnJhZ21lbnRzLCB7XG5cdFx0XHRcdHBhZGRpbmc6IFwiMTBweFwiLFxuXHRcdFx0XHRtYXJnaW5Ub3A6IFwiNnB4XCIsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5iYWNrZ3JvdW5kNSxcblx0XHRcdFx0Y29sb3I6IHRoZW1lLnBhbGV0dGUuaW5wdXRDb2xvcixcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBcIjVweFwiLFxuXHRcdFx0XHRvdmVyZmxvdzogXCJhdXRvXCJcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGxheW91dDogYXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XCJjb2x1bW5cIixcblx0XHRcdFtcblx0XHRcdFx0YXdhaXQgY3JlYXRlVGl0bGUoXCJ0aXRsZVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge1xuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG5cdFx0XHRcdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUucGFsZXR0ZS5iYWNrZ3JvdW5kNn1gXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHQuLi5mcmFnbWVudHNcblx0XHRcdF0sXG5cdFx0XHR7XG5cdFx0XHRcdHBhZGRpbmc6IFwiMTBweFwiXG5cdFx0XHR9XG5cdFx0KSxcblx0XHRkYXRhOiB7XG5cdFx0XHR0aXRsZSxcblx0XHRcdC4uLmFkZGl0aW9uYWxEYXRhXG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKFxuXHRjb250YWluZXJUeXBlOiBcImNvbHVtblwiIHwgXCJyb3dcIixcblx0Y2hpbGRyZW46IFRlbXBsYXRlRnJhZ21lbnRbXSxcblx0c3R5bGU/OiBDU1MuUHJvcGVydGllc1xuKTogUHJvbWlzZTxQbGFpbkNvbnRhaW5lclRlbXBsYXRlRnJhZ21lbnQ+IHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuQ29udGFpbmVyLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdGZsZXhEaXJlY3Rpb246IGNvbnRhaW5lclR5cGUsXG5cdFx0XHQuLi5zdHlsZVxuXHRcdH0sXG5cdFx0Y2hpbGRyZW5cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRpdGxlKFxuXHRkYXRhS2V5OiBzdHJpbmcsXG5cdGZvbnRTaXplOiBudW1iZXIgPSAxNixcblx0Zm9udFdlaWdodDogc3RyaW5nID0gXCJib2xkXCIsXG5cdHN0eWxlPzogQ1NTLlByb3BlcnRpZXNcbik6IFByb21pc2U8VGV4dFRlbXBsYXRlRnJhZ21lbnQ+IHtcblx0Y29uc3QgdGhlbWUgPSBhd2FpdCBnZXRDdXJyZW50VGhlbWUoKTtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuVGV4dCxcblx0XHRkYXRhS2V5LFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRjb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0RGVmYXVsdCxcblx0XHRcdGZvbnRTaXplOiBgJHtmb250U2l6ZSA/PyAxNn1weGAsXG5cdFx0XHRmb250V2VpZ2h0LFxuXHRcdFx0Li4uc3R5bGVcblx0XHR9XG5cdH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUZXh0KFxuXHRkYXRhS2V5OiBzdHJpbmcsXG5cdGZvbnRTaXplOiBudW1iZXIgPSAxNCxcblx0c3R5bGU/OiBDU1MuUHJvcGVydGllc1xuKTogUHJvbWlzZTxUZXh0VGVtcGxhdGVGcmFnbWVudD4ge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5UZXh0LFxuXHRcdGRhdGFLZXksXG5cdFx0c3R5bGU6IHtcblx0XHRcdGZvbnRTaXplOiBgJHtmb250U2l6ZSA/PyAxNH1weGAsXG5cdFx0XHQuLi5zdHlsZVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUltYWdlKFxuXHRkYXRhS2V5OiBzdHJpbmcsXG5cdGFsdGVybmF0aXZlVGV4dDogc3RyaW5nLFxuXHRzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQcm9taXNlPEltYWdlVGVtcGxhdGVGcmFnbWVudD4ge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5JbWFnZSxcblx0XHRkYXRhS2V5LFxuXHRcdGFsdGVybmF0aXZlVGV4dCxcblx0XHRzdHlsZToge1xuXHRcdFx0Li4uc3R5bGVcblx0XHR9XG5cdH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVCdXR0b24oXG5cdGJ1dHRvblN0eWxlOiBCdXR0b25TdHlsZSxcblx0dGl0bGVLZXk6IHN0cmluZyxcblx0YWN0aW9uOiBzdHJpbmcsXG5cdHN0eWxlPzogQ1NTLlByb3BlcnRpZXNcbik6IFByb21pc2U8QnV0dG9uVGVtcGxhdGVGcmFnbWVudD4ge1xuXHRjb25zdCB0aGVtZSA9IGF3YWl0IGdldEN1cnJlbnRUaGVtZSgpO1xuXHRjb25zdCBidXR0b25PcHRpb25zID1cblx0XHRidXR0b25TdHlsZSA9PT0gQnV0dG9uU3R5bGUuU2Vjb25kYXJ5XG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5wYWxldHRlLmlucHV0Q29sb3J9YFxuXHRcdFx0ICB9XG5cdFx0XHQ6IHt9O1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5CdXR0b24sXG5cdFx0YnV0dG9uU3R5bGUsXG5cdFx0Y2hpbGRyZW46IFthd2FpdCBjcmVhdGVUZXh0KHRpdGxlS2V5LCAxMildLFxuXHRcdGFjdGlvbixcblx0XHRzdHlsZToge1xuXHRcdFx0Li4uYnV0dG9uT3B0aW9ucyxcblx0XHRcdC4uLnN0eWxlXG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDdXN0b21QYWxldHRlU2V0LFxuXHRDdXN0b21UaGVtZU9wdGlvbnNcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybS9jb21tb24vc3JjL2FwaS90aGVtaW5nXCI7XG5pbXBvcnQgeyBnZXRTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5cbmNvbnN0IERFRkFVTFRfUEFMRVRURVMgPSB7XG5cdGxpZ2h0OiB7XG5cdFx0YnJhbmRQcmltYXJ5OiBcIiM1MDRDRkZcIixcblx0XHRicmFuZFNlY29uZGFyeTogXCIjMUUxRjIzXCIsXG5cdFx0YmFja2dyb3VuZFByaW1hcnk6IFwiI0ZBRkJGRVwiLFxuXHRcdGNvbnRlbnRCYWNrZ3JvdW5kMTogXCIjNTA0Q0ZGXCIsXG5cdFx0YmFja2dyb3VuZDE6IFwiI0ZGRkZGRlwiLFxuXHRcdGJhY2tncm91bmQyOiBcIiNGQUZCRkVcIixcblx0XHRiYWNrZ3JvdW5kMzogXCIjRjNGNUY4XCIsXG5cdFx0YmFja2dyb3VuZDQ6IFwiI0VDRUVGMVwiLFxuXHRcdGJhY2tncm91bmQ1OiBcIiNERERGRTRcIixcblx0XHRiYWNrZ3JvdW5kNjogXCIjQzlDQkQyXCIsXG5cdFx0c3RhdHVzU3VjY2VzczogXCIjMzVDNzU5XCIsXG5cdFx0c3RhdHVzV2FybmluZzogXCIjRjQ4RjAwXCIsXG5cdFx0c3RhdHVzQ3JpdGljYWw6IFwiI0JFMUQxRlwiLFxuXHRcdHN0YXR1c0FjdGl2ZTogXCIjMDQ5OEZCXCIsXG5cdFx0aW5wdXRCYWNrZ3JvdW5kOiBcIiNFQ0VFRjFcIixcblx0XHRpbnB1dENvbG9yOiBcIiMxRTFGMjNcIixcblx0XHRpbnB1dFBsYWNlaG9sZGVyOiBcIiMzODNBNDBcIixcblx0XHRpbnB1dERpc2FibGVkOiBcIiM3RDgwOEFcIixcblx0XHRpbnB1dEZvY3VzZWQ6IFwiI0M5Q0JEMlwiLFxuXHRcdHRleHREZWZhdWx0OiBcIiMxRTFGMjNcIixcblx0XHR0ZXh0SGVscDogXCIjMkYzMTM2XCIsXG5cdFx0dGV4dEluYWN0aXZlOiBcIiM3RDgwOEFcIlxuXHR9LFxuXHRkYXJrOiB7XG5cdFx0YnJhbmRQcmltYXJ5OiBcIiM1MDRDRkZcIixcblx0XHRicmFuZFNlY29uZGFyeTogXCIjMzgzQTQwXCIsXG5cdFx0YmFja2dyb3VuZFByaW1hcnk6IFwiIzFFMUYyM1wiLFxuXHRcdGNvbnRlbnRCYWNrZ3JvdW5kMTogXCIjNTA0Q0ZGXCIsXG5cdFx0YmFja2dyb3VuZDE6IFwiIzExMTIxNFwiLFxuXHRcdGJhY2tncm91bmQyOiBcIiMxRTFGMjNcIixcblx0XHRiYWNrZ3JvdW5kMzogXCIjMjQyNjJCXCIsXG5cdFx0YmFja2dyb3VuZDQ6IFwiIzJGMzEzNlwiLFxuXHRcdGJhY2tncm91bmQ1OiBcIiMzODNBNDBcIixcblx0XHRiYWNrZ3JvdW5kNjogXCIjNTM1NjVGXCIsXG5cdFx0c3RhdHVzU3VjY2VzczogXCIjMzVDNzU5XCIsXG5cdFx0c3RhdHVzV2FybmluZzogXCIjRjQ4RjAwXCIsXG5cdFx0c3RhdHVzQ3JpdGljYWw6IFwiI0JFMUQxRlwiLFxuXHRcdHN0YXR1c0FjdGl2ZTogXCIjMDQ5OEZCXCIsXG5cdFx0aW5wdXRCYWNrZ3JvdW5kOiBcIiM1MzU2NUZcIixcblx0XHRpbnB1dENvbG9yOiBcIiNGRkZGRkZcIixcblx0XHRpbnB1dFBsYWNlaG9sZGVyOiBcIiNDOUNCRDJcIixcblx0XHRpbnB1dERpc2FibGVkOiBcIiM3RDgwOEFcIixcblx0XHRpbnB1dEZvY3VzZWQ6IFwiI0M5Q0JEMlwiLFxuXHRcdHRleHREZWZhdWx0OiBcIiNGRkZGRkZcIixcblx0XHR0ZXh0SGVscDogXCIjQzlDQkQyXCIsXG5cdFx0dGV4dEluYWN0aXZlOiBcIiM3RDgwOEFcIlxuXHR9XG59O1xuXG5sZXQgdmFsaWRhdGVkVGhlbWVzOiBDdXN0b21UaGVtZU9wdGlvbnNbXTtcblxuZnVuY3Rpb24gZ2V0U3lzdGVtUHJlZmVycmVkQ29sb3JTY2hlbWUoKTogXCJsaWdodFwiIHwgXCJkYXJrXCIge1xuXHRpZiAod2luZG93Lm1hdGNoTWVkaWE/LihcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcykge1xuXHRcdHJldHVybiBcImRhcmtcIjtcblx0fVxuXHRyZXR1cm4gXCJsaWdodFwiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFRoZW1lKCk6IFByb21pc2U8Q3VzdG9tVGhlbWVPcHRpb25zPiB7XG5cdGNvbnN0IHRoZW1lcyA9IGF3YWl0IGdldFRoZW1lcygpO1xuXHRpZiAodGhlbWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbDogXCJkZWZhdWx0XCIsXG5cdFx0XHRwYWxldHRlOiBERUZBVUxUX1BBTEVUVEVTLmRhcmtcblx0XHR9O1xuXHR9XG5cdHJldHVybiB0aGVtZXNbMF07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUaGVtZXMoKTogUHJvbWlzZTxDdXN0b21UaGVtZU9wdGlvbnNbXT4ge1xuXHRpZiAoIXZhbGlkYXRlZFRoZW1lcykge1xuXHRcdGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKTtcblx0XHR2YWxpZGF0ZWRUaGVtZXMgPSB2YWxpZGF0ZVRoZW1lcyhzZXR0aW5ncz8udGhlbWVQcm92aWRlcj8udGhlbWVzKTtcblx0fVxuXHRyZXR1cm4gdmFsaWRhdGVkVGhlbWVzLnNsaWNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVRoZW1lcyh0aGVtZXM6IEN1c3RvbVRoZW1lT3B0aW9uc1tdKTogQ3VzdG9tVGhlbWVPcHRpb25zW10ge1xuXHRjb25zdCBjdXN0b21UaGVtZXM6IEN1c3RvbVRoZW1lT3B0aW9uc1tdID0gW107XG5cblx0aWYgKEFycmF5LmlzQXJyYXkodGhlbWVzKSkge1xuXHRcdGNvbnN0IHByZWZlcnJlZENvbG9yU2NoZW1lID0gZ2V0U3lzdGVtUHJlZmVycmVkQ29sb3JTY2hlbWUoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhlbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCB0aGVtZVRvVmFsaWRhdGUgPSB0aGVtZXNbaV07XG5cdFx0XHRjb25zdCBwYWxldHRlID0gdmFsaWRhdGVQYWxldHRlKHRoZW1lVG9WYWxpZGF0ZS5wYWxldHRlLCB0aGVtZVRvVmFsaWRhdGUubGFiZWwpO1xuXHRcdFx0aWYgKHBhbGV0dGUgIT09IG51bGwpIHtcblx0XHRcdFx0dGhlbWVUb1ZhbGlkYXRlLnBhbGV0dGUgPSBwYWxldHRlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gZG9uJ3QgcGFzcyBhbiBlbXB0eSBvYmplY3QgYXMgdGhlcmUgYXJlIG5vIHRoZW1lIHByb3BlcnRpZXNcblx0XHRcdFx0dGhlbWVUb1ZhbGlkYXRlLnBhbGV0dGUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhlbWVUb1ZhbGlkYXRlLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09IHByZWZlcnJlZENvbG9yU2NoZW1lKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdGBGb3VuZCBhIHRoZW1lIHRoYXQgbWF0Y2hlcyBzeXN0ZW0gY29sb3Igc2NoZW1lIHByZWZlcmVuY2VzIGFuZCBtYWtpbmcgaXQgdGhlIGRlZmF1bHQgdGhlbWU6ICR7cHJlZmVycmVkQ29sb3JTY2hlbWV9YFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjdXN0b21UaGVtZXMudW5zaGlmdCh0aGVtZVRvVmFsaWRhdGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VzdG9tVGhlbWVzLnB1c2godGhlbWVUb1ZhbGlkYXRlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VzdG9tVGhlbWVzO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBhbGV0dGUoXG5cdHRoZW1lUGFsZXR0ZTogQ3VzdG9tUGFsZXR0ZVNldCB8IHVuZGVmaW5lZCxcblx0dGhlbWVMYWJlbDogc3RyaW5nXG4pOiBDdXN0b21QYWxldHRlU2V0IHwgbnVsbCB7XG5cdGlmICghdGhlbWVQYWxldHRlKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhlbWVQYWxldHRlKTtcblx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBwYWxldHRlOiBDdXN0b21QYWxldHRlU2V0ID0ge1xuXHRcdC4uLkRFRkFVTFRfUEFMRVRURVMuZGFya1xuXHR9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRpZiAoXG5cdFx0XHR0aGVtZVBhbGV0dGVba2V5XSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHR0aGVtZVBhbGV0dGVba2V5XSAhPT0gbnVsbCAmJlxuXHRcdFx0dGhlbWVQYWxldHRlW2tleV0udHJpbSgpLmxlbmd0aCA+IDBcblx0XHQpIHtcblx0XHRcdHBhbGV0dGVba2V5XSA9IHRoZW1lUGFsZXR0ZVtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGJyYW5kUHJpbWFyeUtleSA9IFwiYnJhbmRQcmltYXJ5XCI7XG5cdGNvbnN0IGJyYW5kU2Vjb25kYXJ5S2V5ID0gXCJicmFuZFNlY29uZGFyeVwiO1xuXHRjb25zdCBiYWNrZ3JvdW5kUHJpbWFyeUtleSA9IFwiYmFja2dyb3VuZFByaW1hcnlcIjtcblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVticmFuZFByaW1hcnlLZXldKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YFRoZW1lOiAke3RoZW1lTGFiZWx9IDogJHticmFuZFByaW1hcnlLZXl9IG5vdCBzcGVjaWZpZWQgKGl0IGlzIHJlcXVpcmVkIGlmIHNwZWNpZnlpbmcgb3RoZXIgdGhlbWUgcGFsZXR0ZSBzZXR0aW5ncykuIFByb3ZpZGluZyBkZWZhdWx0IG9mOiAke0RFRkFVTFRfUEFMRVRURVMuZGFyay5icmFuZFByaW1hcnl9YFxuXHRcdCk7XG5cdH1cblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVticmFuZFNlY29uZGFyeUtleV0pIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgVGhlbWU6ICR7dGhlbWVMYWJlbH0gOiAke2JyYW5kU2Vjb25kYXJ5S2V5fSBub3Qgc3BlY2lmaWVkIChpdCBpcyByZXF1aXJlZCBpZiBzcGVjaWZ5aW5nIG90aGVyIHRoZW1lIHBhbGV0dGUgc2V0dGluZ3MpLiBQcm92aWRpbmcgZGVmYXVsdCBvZjogJHtERUZBVUxUX1BBTEVUVEVTLmRhcmsuYnJhbmRTZWNvbmRhcnl9YFxuXHRcdCk7XG5cdH1cblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVtiYWNrZ3JvdW5kUHJpbWFyeUtleV0pIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgVGhlbWU6ICR7dGhlbWVMYWJlbH0gOiAke2JhY2tncm91bmRQcmltYXJ5S2V5fSBub3Qgc3BlY2lmaWVkIChpdCBpcyByZXF1aXJlZCBpZiBzcGVjaWZ5aW5nIG90aGVyIHRoZW1lIHBhbGV0dGUgc2V0dGluZ3MpLiBQcm92aWRpbmcgZGVmYXVsdCBvZjogJHtERUZBVUxUX1BBTEVUVEVTLmRhcmsuYnJhbmRQcmltYXJ5fWBcblx0XHQpO1xuXHR9XG5cblx0cmV0dXJuIHBhbGV0dGU7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJpbXBvcnQgeyBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvbi1wcm92aWRlclwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=