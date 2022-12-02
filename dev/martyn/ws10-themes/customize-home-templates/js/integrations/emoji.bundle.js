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
                    providerId: EmojiIntegrationProvider._PROVIDER_ID
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4QyxPQUFPLENBQUMsSUFBSSxDQUNYLFVBQVUsVUFBVSxNQUFNLG9CQUFvQixxR0FBcUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUN2TCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztTQ3BLRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDekJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSxpQ0FBaUMsV0FBVztVQUM1QztVQUNBOzs7OztVQ1BBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSxHQUFHO1VBQ0g7VUFDQTtVQUNBLENBQUM7Ozs7O1VDUEQ7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0prRTtBQUUzRCxNQUFNLFdBQVcsR0FBK0M7SUFDdEUsWUFBWSxFQUFFLElBQUksMkVBQXdCLEVBQUU7Q0FDNUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3dvcmtzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0RhdGFWaWV3LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hc2NpaVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNVbmljb2RlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzTWFza2VkLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25vZGVVdGlsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpbmdUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdmFsdWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL25vZGUtZW1vamkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbm9kZS1lbW9qaS9saWIvZW1vamkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvaW50ZWdyYXRpb25zL2Vtb2ppL2ludGVncmF0aW9uLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS90ZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvdGVtcGxhdGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL3RoZW1lcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17NzAzOihlLHQsbik9PntuLnIodCksbi5kKHQse0NMSUFjdGlvbjooKT0+cC5QdCxDTElGaWx0ZXJPcHRpb25UeXBlOigpPT5wLmVsLENMSVRlbXBsYXRlOigpPT5wLnlXLGRlcmVnaXN0ZXI6KCk9PnR0LGhpZGU6KCk9Pm90LHJlZ2lzdGVyOigpPT5ldCxzaG93OigpPT5udH0pO3ZhciBvPXt9O24ucihvKSxuLmQobyx7c3Vic2NyaWJlOigpPT5jZX0pO3ZhciByPXt9O24ucihyKSxuLmQocix7Y3JlYXRlOigpPT5VZX0pO3ZhciBpPW4oNjc4KSxhPW4oNTMyKSxzPW4oMTUwKTtjb25zdCBjPVwiaG9tZVwiO3ZhciBkOyFmdW5jdGlvbihlKXtlLkNvbW1hbmRzPVwiaG9tZS1jb21tYW5kc1wifShkfHwoZD17fSkpO3ZhciB1LGw9big4MDYpLHA9KG4oMjk4KSxuKDc1OCkpO24oMTE0KSxuKDEwOSksbig0MjcpOyFmdW5jdGlvbihlKXtlW2UuSW5pdGlhbD0wXT1cIkluaXRpYWxcIixlW2UuT3Blbj0xXT1cIk9wZW5cIixlW2UuQ2xvc2U9Ml09XCJDbG9zZVwifSh1fHwodT17fSkpO3ZhciBmPW4oMzE2KTtjb25zdCBnPVwiYWxsXCIsdz1cIjBcIixoPVwiNVwiLHY9XCI2XCIseT0oKT0+e307ZnVuY3Rpb24gbShlLHQpe3JldHVybiBlP2Ake2V9LSR7dH1gOnR9ZnVuY3Rpb24gUyhlKXtyZXR1cm5gX19zZWFyY2gtJHtlfS10b3BpY19fYH1jb25zdCBQPW5ldyBNYXA7ZnVuY3Rpb24gVyhlLHQpe1AuaGFzKGUpfHxQLnNldChlLG5ldyBTZXQpLFAuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBrKGUsdCl7Y29uc3Qgbj1QLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1jb25zdCBDPW5ldyBNYXA7ZnVuY3Rpb24gSShlLHQpe0MuaGFzKGUpfHxDLnNldChlLG5ldyBTZXQpLEMuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBUKGUsdCl7Y29uc3Qgbj1DLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1jb25zdCBiPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gQShlLHQpe2IuaGFzKGUpfHxiLnNldChlLG5ldyBNYXApLGIuZ2V0KGUpLnNldCh0LmlkLHQpO2NvbnN0IG49UC5nZXQoZSk7aWYoIW4pcmV0dXJuO2NvbnN0IG89Wy4uLm5dLm1hcCgoZT0+ZSgpKSk7YXdhaXQgUHJvbWlzZS5hbGwobyl9YXN5bmMgZnVuY3Rpb24gRihlLHQpe2NvbnN0IG49Yi5nZXQoZSk7aWYoIW4pcmV0dXJuO24uZGVsZXRlKHQpO2NvbnN0IG89Qy5nZXQoZSk7aWYoIW8pcmV0dXJuO2NvbnN0IHI9Wy4uLm9dLm1hcCgoZT0+ZSgpKSk7YXdhaXQgUHJvbWlzZS5hbGwocil9ZnVuY3Rpb24gUihlKXtjb25zdCB0PWIuZ2V0KGUpO3JldHVybiB0P1suLi50LnZhbHVlcygpXTpbXX1mdW5jdGlvbiBEKGUpe2NvbnN0IHQ9Yi5nZXQoZSk7dCYmdC5jbGVhcigpfWZ1bmN0aW9uIEIoZSx0KXtjb25zdCBuPWIuZ2V0KGUpO3JldHVybiBuP24uZ2V0KHQpOm51bGx9ZnVuY3Rpb24gTChlLHQsbil7cmV0dXJuey4uLmUsYWN0aW9uOm58fHsuLi5lLmFjdGlvbnNbMF0sdHJpZ2dlcjpmLnB4LlVzZXJBY3Rpb259LGRpc3BhdGNoZXJJZGVudGl0eTp0fX1mdW5jdGlvbiB4KGUsdCxuPVwiYXNjZW5kaW5nXCIpe2NvbnN0IG89ZXx8W107aWYoIXQ/Lmxlbmd0aClyZXR1cm4gbztjb25zdCByPVtdLGk9bmV3IE1hcDt0LmZvckVhY2goKGU9PntpZihlLmtleSlyZXR1cm4gaS5zZXQoZS5rZXksZSk7ci5wdXNoKGUpfSkpO2xldCBhPW8ubWFwKChlPT57Y29uc3R7a2V5OnR9PWU7aWYodCYmaS5oYXModCkpe2NvbnN0IGU9aS5nZXQodCk7cmV0dXJuIGkuZGVsZXRlKHQpLGV9cmV0dXJuIGV9KSk7cmV0dXJuIGEucHVzaCguLi5pLnZhbHVlcygpLC4uLnIpLGE9XCJhc2NlbmRpbmdcIj09PW4/YS5zb3J0KCgoZSx0KT0+KGU/LnNjb3JlPz8xLzApLSh0Py5zY29yZT8/MS8wKSkpOmEuc29ydCgoKGUsdCk9Pih0Py5zY29yZT8/MS8wKS0oZT8uc2NvcmU/PzEvMCkpKSxhfWZ1bmN0aW9uIE8oZSl7Y29uc3QgdD17fTtsZXQgbj1bXTtsZXQgbz1bXTtsZXQgcj11LkluaXRpYWw7dC5nZXRTdGF0dXM9KCk9PnIsdC5nZXRSZXN1bHRCdWZmZXI9KCk9Pm4sdC5zZXRSZXN1bHRCdWZmZXI9ZT0+e249ZSxuPy5sZW5ndGgmJnQub25DaGFuZ2UoKX0sdC5nZXRSZXZva2VkQnVmZmVyPSgpPT5vLHQuc2V0UmV2b2tlZEJ1ZmZlcj1lPT57bz1lLG8/Lmxlbmd0aCYmdC5vbkNoYW5nZSgpfSx0Lm9uQ2hhbmdlPXk7Y29uc3QgaT17fTtyZXR1cm4gdC5yZXM9aSxpLmNsb3NlPSgpPT57ciE9PXUuQ2xvc2UmJihyPXUuQ2xvc2UsdC5vbkNoYW5nZSgpKX0saS5vcGVuPSgpPT57ciE9PXUuT3BlbiYmKHI9dS5PcGVuLHQub25DaGFuZ2UoKSl9LGkucmVzcG9uZD1uPT57Y29uc3Qgbz14KHQuZ2V0UmVzdWx0QnVmZmVyKCksbixlKTt0LnNldFJlc3VsdEJ1ZmZlcihvKX0saS5yZXZva2U9KC4uLmUpPT57Y29uc3Qgbj1uZXcgU2V0KGUpLG89dC5nZXRSZXN1bHRCdWZmZXIoKS5maWx0ZXIoKCh7a2V5OmV9KT0+e2NvbnN0IHQ9bi5oYXMoZSk7cmV0dXJuIHQmJm4uZGVsZXRlKGUpLCF0fSkpO3Quc2V0UmVzdWx0QnVmZmVyKG8pLG4uc2l6ZSYmKHQuZ2V0UmV2b2tlZEJ1ZmZlcigpLmZvckVhY2goKGU9Pm4uYWRkKGUpKSksdC5zZXRSZXZva2VkQnVmZmVyKFsuLi5uXSkpfSx0fWZ1bmN0aW9uIE0oZSx0LG4pe2NvbnN0IG89bmV3IFNldDtsZXQgcj0hMTtyZXR1cm57Y2xvc2U6KCk9PntyPSEwO2Zvcihjb25zdCBlIG9mIG8pZSgpfSxyZXE6e2lkOnQsdG9waWM6ZSwuLi5uLGNvbnRleHQ6bj8uY29udGV4dHx8e30sb25DbG9zZTplPT57by5hZGQoZSksciYmZSgpfSxyZW1vdmVMaXN0ZW5lcjplPT57by5kZWxldGUoZSl9fX19ZnVuY3Rpb24gRSgpe3JldHVybntuYW1lOmZpbi5tZS5uYW1lLHV1aWQ6ZmluLm1lLnV1aWR9fWZ1bmN0aW9uIFYoKXtsZXQgZTt0cnl7ZT1maW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKS5pZGVudGl0eS51dWlkfWNhdGNoKGUpe31yZXR1cm4gZX1jb25zdCBHPVwiZGVyZWdpc3RlcmVkIG9yIGRvZXMgbm90IGV4aXN0XCIscT1uZXcgRXJyb3IoYHByb3ZpZGVyICR7R31gKSxfPW5ldyBFcnJvcihcInByb3ZpZGVyIHdpdGggbmFtZSBhbHJlYWR5IGV4aXN0c1wiKSxIPW5ldyBFcnJvcihcImJhZCBwYXlsb2FkXCIpLCQ9bmV3IEVycm9yKFwic3Vic2NyaXB0aW9uIHJlamVjdGVkXCIpLFU9bmV3IEVycm9yKGBjaGFubmVsICR7R31gKSxOPW5ldyBNYXA7ZnVuY3Rpb24gaihlKXtjb25zdCB0PVgoZSk7aWYodClyZXR1cm4gdDt0aHJvdyBVfWZ1bmN0aW9uIFgoZSl7Y29uc3QgdD1OLmdldChlKTtpZih0KXJldHVybiB0fWZ1bmN0aW9uIEsoZSx0KXtOLnNldChlLHQpfWZ1bmN0aW9uIHooZSl7Y29uc29sZS5lcnJvcihcIk9wZW5GaW4gU2VhcmNoIEFQSTogXCIsZSl9Y29uc3QgSj1uZXcgTWFwO2Z1bmN0aW9uIFEoZSl7Si5oYXMoZSl8fEouc2V0KGUsbmV3IE1hcCk7Y29uc3QgdD1KLmdldChlKTtyZXR1cm57Z2V0UmVxdWVzdHNGb3JJZGVudGl0eTplPT57Y29uc3Qgbj1mdW5jdGlvbihlKXtyZXR1cm5gJHtlLnV1aWR9OiR7ZS5uYW1lfWB9KGUpO3JldHVybiB0LmhhcyhuKXx8dC5zZXQobixuZXcgTWFwKSx0LmdldChuKX19fWFzeW5jIGZ1bmN0aW9uIFooZSx0KXtyZXR1cm4oYXdhaXQgaihlKSkuZGlzcGF0Y2godyx0KX1mdW5jdGlvbiBZKHtuYW1lc3BhY2VkVG9waWM6ZSx0b3BpYzp0fSl7Y29uc3Qgbj1CLmJpbmQobnVsbCxlKSxvPVEoZSkscj1aLmJpbmQobnVsbCxlKTtyZXR1cm4gYXN5bmMoZSxpKT0+e2lmKCFlfHwhZS5pZHx8IWUucHJvdmlkZXJJZCl7Y29uc3QgZT1IO3JldHVybiB6KGUpLHtlcnJvcjplLm1lc3NhZ2V9fWNvbnN0e2lkOmEscHJvdmlkZXJJZDpzfT1lLGM9bihzKTtpZighYyl7Y29uc3QgZT1xO3JldHVybiB6KGUpLHtlcnJvcjplLm1lc3NhZ2V9fWNvbnN0IGQ9by5nZXRSZXF1ZXN0c0ZvcklkZW50aXR5KGkpO2xldCB1PWQuZ2V0KGUuaWQpO3V8fCh1PU0odCxhLGUpLGQuc2V0KGUuaWQsdSkpO2NvbnN0IGw9TygpLHA9KCk9Pntjb25zdCBlPWwuZ2V0UmVzdWx0QnVmZmVyKCk7bC5zZXRSZXN1bHRCdWZmZXIoW10pO2NvbnN0IHQ9bC5nZXRSZXZva2VkQnVmZmVyKCk7bC5zZXRSZXZva2VkQnVmZmVyKFtdKTtjb25zdCBuPWwuZ2V0U3RhdHVzKCk7cih7aWQ6YSxwcm92aWRlcklkOnMscmVzdWx0czplLHJldm9rZWQ6dCxzdGF0dXM6bn0pfTtsZXQgZj0hMCxnPSExO2wub25DaGFuZ2U9KCk9PntpZihmKXJldHVybiBmPSExLHZvaWQgcCgpO2d8fChnPSEwLHNldFRpbWVvdXQoKCgpPT57Zz0hMSxwKCl9KSwxMDApKX07dHJ5e2NvbnN0e3Jlc3VsdHM6ZSxjb250ZXh0OnR9PWF3YWl0IGMub25Vc2VySW5wdXQodS5yZXEsbC5yZXMpLG49bC5nZXRTdGF0dXMoKTtyZXR1cm57aWQ6YSxwcm92aWRlcklkOnMsc3RhdHVzOm4scmVzdWx0czplLGNvbnRleHQ6dH19Y2F0Y2goZSl7cmV0dXJuIHooZSkse2lkOmEscHJvdmlkZXJJZDpzLGVycm9yOmU/Lm1lc3NhZ2V9fX19YXN5bmMgZnVuY3Rpb24gZWUoZSx0LG4pe2NvbnN0IG89bnx8YXdhaXQgaihlKSxyPUUoKSxpPXsuLi50LGlkZW50aXR5OnIsb25SZXN1bHREaXNwYXRjaDp2b2lkIDB9LGE9YXdhaXQgby5kaXNwYXRjaChcIjJcIixpKTtyZXR1cm4gYXdhaXQgQShlLHtpZGVudGl0eTpyLC4uLnR9KSxhfWFzeW5jIGZ1bmN0aW9uIHRlKGUsdCl7Y29uc3Qgbj1hd2FpdCBqKGUpO3JldHVybiBhd2FpdCBuLmRpc3BhdGNoKFwiM1wiLHQpLEYoZSx0KX1hc3luYyBmdW5jdGlvbiBuZShlLHQsbixvKXtjb25zdCByPUwobixFKCksbyksaT1CKGUsdCk7aWYoaSl7Y29uc3R7b25SZXN1bHREaXNwYXRjaDplfT1pO2lmKCFlKXJldHVybjtyZXR1cm4gZShyKX1jb25zdCBhPXtwcm92aWRlcklkOnQscmVzdWx0OnJ9O3JldHVybihhd2FpdCBqKGUpKS5kaXNwYXRjaChoLGEpfWFzeW5jIGZ1bmN0aW9uIG9lKGUsdCl7Y29uc3Qgbj17Li4udCxjb250ZXh0OnQ/LmNvbnRleHR8fHt9fSxvPXt9LHI9YXN5bmMgZnVuY3Rpb24qKGUsdCx7c2V0U3RhdGU6bn0pe2NvbnN0IG89YXdhaXQgaihlKTtmb3IoOzspe2NvbnN0IGU9YXdhaXQgby5kaXNwYXRjaChcIjFcIix0KSxyPWUuZXJyb3I7aWYocil0aHJvdyBuZXcgRXJyb3Iocik7Y29uc3QgaT1lO2lmKHQuaWQ9aS5pZCxuKGkuc3RhdGUpLGkuZG9uZSlyZXR1cm4gaS52YWx1ZTt5aWVsZCBpLnZhbHVlfX0oZSxuLHtzZXRTdGF0ZTplPT57by5zdGF0ZT1lfX0pO2xldCBpPWF3YWl0IHIubmV4dCgpO3JldHVybiBvLmlkPW4uaWR8fFwiXCIsby5jbG9zZT0oKT0+eyFhc3luYyBmdW5jdGlvbihlLHQpeyhhd2FpdCBqKGUpKS5kaXNwYXRjaCh2LHtpZDp0fSl9KGUsby5pZCl9LG8ubmV4dD0oKT0+e2lmKGkpe2NvbnN0IGU9aTtyZXR1cm4gaT12b2lkIDAsZX1yZXR1cm4gci5uZXh0KCl9LG99YXN5bmMgZnVuY3Rpb24gcmUoZSl7cmV0dXJuKGF3YWl0IGooZSkpLmRpc3BhdGNoKFwiNFwiLG51bGwpfWFzeW5jIGZ1bmN0aW9uIGllKGUpe2NvbnN0IHQ9YXdhaXQgaihlKTt2YXIgbjtuPWUsTi5kZWxldGUobiksRChlKSxhd2FpdCB0LmRpc2Nvbm5lY3QoKX1mdW5jdGlvbiBhZShlKXtjb25zdHtuYW1lc3BhY2VkVG9waWM6dH09ZSxuPVEodCk7cmV0dXJuIGFzeW5jIG89PntpZighWCh0KSlyZXR1cm47Y29uc3Qgcj1uLmdldFJlcXVlc3RzRm9ySWRlbnRpdHkobyk7Zm9yKGNvbnN0e3JlcTplLGNsb3NlOnR9b2Ygci52YWx1ZXMoKSl0KCksci5kZWxldGUoZS5pZCk7Syh0LChhc3luYyBlPT57Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1hd2FpdCBzZShlKTtmb3IoY29uc3QgZSBvZiBSKHQpKWF3YWl0IGVlKHQsZSxuKTtyZXR1cm4gbn0pKGUpKX19YXN5bmMgZnVuY3Rpb24gc2UoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1TKHQpLG89YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Zm9yKGxldCB0PTA7dDw1MDt0KyspdHJ5e3JldHVybiBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSx7d2FpdDohMX0pfWNhdGNoKGUpe2lmKDQ5PT09dCl0aHJvdyBlO2F3YWl0IG5ldyBQcm9taXNlKChlPT5zZXRUaW1lb3V0KGUsMWUzKSkpfX0obik7cmV0dXJuIG8ucmVnaXN0ZXIodyxZKGUpKSxvLnJlZ2lzdGVyKHYsZnVuY3Rpb24oZSl7Y29uc3QgdD1RKGUpO3JldHVybihlLG4pPT57Y29uc3Qgbz10LmdldFJlcXVlc3RzRm9ySWRlbnRpdHkobikscj1vLmdldChlLmlkKTtyJiYoci5jbG9zZSgpLG8uZGVsZXRlKGUuaWQpKX19KHQpKSxvLnJlZ2lzdGVyKGgsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQucHJvdmlkZXJJZHx8IXQucmVzdWx0KXJldHVybiB2b2lkIHooSCk7Y29uc3Qgbz1CKGUsdC5wcm92aWRlcklkKTtpZighbylyZXR1cm4gdm9pZCB6KHEpO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6cn09bztyZXR1cm4gcj8odC5yZXN1bHQuZGlzcGF0Y2hlcklkZW50aXR5PW4scih0LnJlc3VsdCkpOnZvaWQgMH19KHQpKSxvLm9uRGlzY29ubmVjdGlvbihhZShlKSksb31hc3luYyBmdW5jdGlvbiBjZShlKXtjb25zdCB0PVwic3RyaW5nXCI9PXR5cGVvZiBlP2U6ZS50b3BpYyxuPVwic3RyaW5nXCI9PXR5cGVvZiBlP3ZvaWQgMDplLnV1aWQsbz10fHxnLHI9bnx8VigpfHxcIlwiLGk9bShyLG8pLGE9e3RvcGljOm8sbmFtZXNwYWNlOnIsbmFtZXNwYWNlZFRvcGljOml9O2xldCBzPVgoaSk7cmV0dXJuIHN8fChzPXNlKGEpLEsoaSxzKSxhd2FpdCBzKSx7Z2V0QWxsUHJvdmlkZXJzOnJlLmJpbmQobnVsbCxpKSxyZWdpc3RlcjplZS5iaW5kKG51bGwsaSksc2VhcmNoOm9lLmJpbmQobnVsbCxpKSxkZXJlZ2lzdGVyOnRlLmJpbmQobnVsbCxpKSxkaXNwYXRjaDpuZS5iaW5kKG51bGwsaSksZGlzY29ubmVjdDppZS5iaW5kKG51bGwsaSl9fWNvbnN0IGRlPW5ldyBNYXA7ZnVuY3Rpb24gdWUoZSl7Y29uc3QgdD1sZShlKTtpZih0KXJldHVybiB0O3Rocm93IFV9ZnVuY3Rpb24gbGUoZSl7Y29uc3QgdD1kZS5nZXQoZSk7aWYodClyZXR1cm4gdH1jb25zdCBwZT1uZXcgTWFwO2Z1bmN0aW9uIGZlKGUsdCl7cGUuaGFzKGUpfHxwZS5zZXQoZSxuZXcgU2V0KSxwZS5nZXQoZSkuYWRkKHQpfWZ1bmN0aW9uIGdlKGUsdCl7Y29uc3Qgbj1wZS5nZXQoZSk7biYmbi5kZWxldGUodCl9YXN5bmMgZnVuY3Rpb24gd2UoZSl7cmV0dXJuWy4uLlIoZSldLm1hcCgoZT0+KHsuLi5lLG9uVXNlcklucHV0OnZvaWQgMCxvblJlc3VsdERpc3BhdGNoOnZvaWQgMH0pKSl9YXN5bmMgZnVuY3Rpb24gaGUoZSx0KXtpZihCKGUsdC5pZCkpdGhyb3cgbmV3IEVycm9yKFwicHJvdmlkZXIgd2l0aCBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO2NvbnN0IG49RSgpO3JldHVybiBhd2FpdCBBKGUse2lkZW50aXR5Om4sLi4udH0pLHt3b3Jrc3BhY2VWZXJzaW9uOmkudTB8fFwiXCIsY2xpZW50QVBJVmVyc2lvbjp0LmNsaWVudEFQSVZlcnNpb258fFwiXCJ9fWFzeW5jIGZ1bmN0aW9uIHZlKGUsdCl7YXdhaXQgRihlLHQpfWFzeW5jIGZ1bmN0aW9uIHllKGUsdCxuLG8pe2NvbnN0IHI9QihlLHQpO2lmKCFyKXRocm93IHE7Y29uc3R7b25SZXN1bHREaXNwYXRjaDppfT1yO2lmKCFpKXJldHVybjtyZXR1cm4gaShMKG4sRSgpLG8pKX1hc3luYyBmdW5jdGlvbiptZShlLHQsbil7Y29uc3Qgbz1mdW5jdGlvbihlLHQpe2NvbnN0IG49W10sbz1bXSxyPVtdLGk9W107Zm9yKGNvbnN0IGEgb2YgZSl7Y29uc3QgZT1PKGEuc2NvcmVPcmRlcikscz17cmVzdWx0czpbXSxwcm92aWRlcjp7aWQ6YS5pZCxpZGVudGl0eTphLmlkZW50aXR5LHRpdGxlOmEudGl0bGUsc2NvcmVPcmRlcjphLnNjb3JlT3JkZXIsaWNvbjphLmljb24sZGlzcGF0Y2hGb2N1c0V2ZW50czphLmRpc3BhdGNoRm9jdXNFdmVudHN9fTtuLnB1c2gocyksby5wdXNoKGUpO2NvbnN0IGM9KGFzeW5jKCk9Pnt0cnl7Y29uc3R7cmVzdWx0czpuLGNvbnRleHQ6b309YXdhaXQgYS5vblVzZXJJbnB1dCh0LGUucmVzKTtzLnJlc3VsdHM9eChzLnJlc3VsdHN8fFtdLG4pLHMuY29udGV4dD17Li4ucy5jb250ZXh0LC4uLm99fWNhdGNoKGUpe3MuZXJyb3I9ZX19KSgpO2MuZmluYWxseSgoKCk9PntjLmRvbmU9ITB9KSksaS5wdXNoKGMpLHIucHVzaChyLmxlbmd0aCl9cmV0dXJue3Byb3ZpZGVyUmVzcG9uc2VzOm4sbGlzdGVuZXJSZXNwb25zZXM6byxvcGVuTGlzdGVuZXJSZXNwb25zZXM6cixpbml0aWFsUmVzcG9uc2VQcm9taXNlczppfX0odC50YXJnZXRzP3QudGFyZ2V0cy5tYXAoKHQ9PkIoZSx0KSkpLmZpbHRlcigoZT0+ISFlKSk6Wy4uLlIoZSkuZmlsdGVyKChlPT4hZS5oaWRkZW4pKV0sdCkse3Byb3ZpZGVyUmVzcG9uc2VzOnIsbGlzdGVuZXJSZXNwb25zZXM6aX09bztsZXR7b3Blbkxpc3RlbmVyUmVzcG9uc2VzOmEsaW5pdGlhbFJlc3BvbnNlUHJvbWlzZXM6c309byxjPWYuRGUuRmV0Y2hpbmc7Y29uc3QgZD1lPT57Yz1lLG4uc2V0U3RhdGUoYyl9O2xldCBsLHA9ITE7dC5vbkNsb3NlKCgoKT0+e3A9ITAsbCYmbCgpfSkpO2Rve2xldCBlPSExO2lmKHMubGVuZ3RoKXtjb25zdCB0PVtdO2Zvcihjb25zdCBuIG9mIHMpbi5kb25lP2U9ITA6dC5wdXNoKG4pO3M9dCxzLmxlbmd0aHx8KGQoZi5EZS5GZXRjaGVkKSxlPSEwKX1sZXQgdCxuPSExO2NvbnN0IG89KCk9PntuPSEwLHQmJnQoKX0sZz1bXTtmb3IoY29uc3QgdCBvZiBhKXtjb25zdCBuPWlbdF0sYT1yW3RdLHM9bi5nZXRTdGF0dXMoKTsocz09PXUuT3Blbnx8Yz09PWYuRGUuRmV0Y2hpbmcmJnM9PT11LkluaXRpYWwpJiYoZy5wdXNoKHQpLG4ub25DaGFuZ2U9byk7Y29uc3QgZD1uLmdldFJlc3VsdEJ1ZmZlcigpO2QubGVuZ3RoJiYobi5zZXRSZXN1bHRCdWZmZXIoW10pLGEucmVzdWx0cz14KGEucmVzdWx0c3x8W10sZCksZT0hMCk7Y29uc3QgbD1uLmdldFJldm9rZWRCdWZmZXIoKTtpZihsLmxlbmd0aCl7bi5zZXRSZXZva2VkQnVmZmVyKFtdKTtjb25zdCB0PW5ldyBTZXQobCk7YS5yZXN1bHRzPShhLnJlc3VsdHN8fFtdKS5maWx0ZXIoKCh7a2V5OmV9KT0+IXQuaGFzKGUpKSksZT0hMH19aWYoYT1nLGUmJih5aWVsZCByKSxwKWJyZWFrO258fChhLmxlbmd0aHx8cy5sZW5ndGgpJiZhd2FpdCBQcm9taXNlLnJhY2UoWy4uLnMsbmV3IFByb21pc2UoKGU9Pnt0PWV9KSksbmV3IFByb21pc2UoKGU9PntsPWV9KSldKX13aGlsZShhLmxlbmd0aHx8cy5sZW5ndGgpO3JldHVybiBkKGYuRGUuQ29tcGxldGUpLHJ9bGV0IFNlPTA7YXN5bmMgZnVuY3Rpb24gUGUoe25hbWVzcGFjZWRUb3BpYzplLHRvcGljOnR9LG4pe1NlKz0xO2NvbnN0IG89TSh0LFNlLnRvU3RyaW5nKCksbikscj1tZShlLG8ucmVxLHtzZXRTdGF0ZTplPT57ci5zdGF0ZT1lfX0pO3JldHVybiByLmlkPVNlLnRvU3RyaW5nKCksci5jbG9zZT1vLmNsb3NlLHIuc3RhdGU9Zi5EZS5GZXRjaGluZyxyfWNvbnN0IFdlPW5ldyBNYXA7ZnVuY3Rpb24ga2UoZSx0KXtyZXR1cm5gJHtlfToke3R9YH1mdW5jdGlvbiBDZShlKXtyZXR1cm4gYXN5bmMgdD0+e2lmKCF0KXJldHVybiB6KEgpLHtlcnJvcjpILm1lc3NhZ2V9O2xldCBuO2lmKHQuaWQpbj1rZShlLm5hbWVzcGFjZWRUb3BpYyx0LmlkKTtlbHNle2NvbnN0IG89YXdhaXQgUGUoZSx0KTtuPWtlKGUubmFtZXNwYWNlZFRvcGljLG8uaWQpLHQuaWQ9by5pZCxXZS5zZXQobix7Z2VuZXJhdG9yOm99KX1jb25zdCBvPVdlLmdldChuKTtjbGVhclRpbWVvdXQoby50aW1lb3V0KTtjb25zdCByPWF3YWl0IG8uZ2VuZXJhdG9yLm5leHQoKTtyZXR1cm4gby50aW1lb3V0PWZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKCk9PntXZS5kZWxldGUoZSl9KSwxZTQpfShuKSx7Li4ucixpZDp0LmlkLHN0YXRlOm8uZ2VuZXJhdG9yLnN0YXRlfX19ZnVuY3Rpb24gSWUoZSx0LG4pe3JldHVybiB1ZShlKS5kaXNwYXRjaCh0LHYse2lkOm59KX1mdW5jdGlvbiBUZShlKXtyZXR1cm4gdD0+ZnVuY3Rpb24oZSx0KXtjb25zdCBuPWtlKGUsdCksbz1XZS5nZXQobik7byYmby5nZW5lcmF0b3IuY2xvc2UoKX0oZSx0LmlkKX1hc3luYyBmdW5jdGlvbiBiZShlLHQse2lkOm4scXVlcnk6byxjb250ZXh0OnIsdGFyZ2V0czppPVtdfSl7Y29uc3QgYT11ZShlKSxzPXtpZDpuLHF1ZXJ5Om8sY29udGV4dDpyLHRhcmdldHM6aSxwcm92aWRlcklkOnQuaWR9LGM9YXdhaXQgYS5kaXNwYXRjaCh0LmlkZW50aXR5LHcscyksZD1jLmVycm9yO2lmKGQpdGhyb3cgbmV3IEVycm9yKGQpO3JldHVybiBjfWNvbnN0IEFlPW5ldyBNYXA7ZnVuY3Rpb24gRmUoZSx0LG4pe3JldHVybmAke2V9OiR7dC5uYW1lfToke3QudXVpZH06JHtufWB9Y29uc3QgUmU9bmV3IE1hcDtmdW5jdGlvbiBEZShlLHQsbil7cmV0dXJuYCR7ZX06JHt0fToke259YH1mdW5jdGlvbiBCZShlLHQpe2NvbnN0IG49RmUuYmluZChudWxsLGUsdC5pZGVudGl0eSksbz1JZS5iaW5kKG51bGwsZSx0LmlkZW50aXR5KSxyPWJlLmJpbmQobnVsbCxlLHQpO3JldHVybiBhc3luYyhpLGEpPT57Y29uc3Qgcz1uKGkuaWQpO2lmKCFBZS5oYXMocykpe2NvbnN0IGU9KCk9PntvKGkuaWQpLEFlLmRlbGV0ZShzKX07QWUuc2V0KHMsZSksaS5vbkNsb3NlKGUpfWNvbnN0IGM9RGUoZSx0LmlkLGkuaWQpLGQ9KCk9PntSZS5kZWxldGUoYyksYS5jbG9zZSgpfTtpLm9uQ2xvc2UoZCksUmUuc2V0KGMsKGU9PntlLnJlc3VsdHM/Lmxlbmd0aCYmYS5yZXNwb25kKGUucmVzdWx0cyksZS5yZXZva2VkPy5sZW5ndGgmJmEucmV2b2tlKC4uLmUucmV2b2tlZCksZS5zdGF0dXM9PT11Lk9wZW4mJmEub3BlbigpLGUuc3RhdHVzPT09dS5DbG9zZSYmZCgpfSkpO2NvbnN0IGw9YXdhaXQgcihpKTtyZXR1cm4gbC5zdGF0dXM9PT11Lk9wZW4mJmEub3BlbigpLGwuc3RhdHVzIT09dS5DbG9zZSYmbC5zdGF0dXMhPT11LkluaXRpYWx8fGQoKSxsfX1mdW5jdGlvbiBMZShlLHQpe3JldHVybiBhc3luYyBuPT57Y29uc3Qgbz11ZShlKSxyPXtwcm92aWRlcklkOnQuaWQscmVzdWx0Om59O3JldHVybiBvLmRpc3BhdGNoKHQuaWRlbnRpdHksaCxyKX19Y29uc3QgeGU9bmV3IE1hcDtmdW5jdGlvbiBPZShlLHQpe3JldHVybmAke2V9LSR7dC5uYW1lfS0ke3QudXVpZH1gfWZ1bmN0aW9uIE1lKGUpe3JldHVybiBhc3luYyh0LG4pPT57aWYoIXR8fCF0LmlkKXJldHVybiB6KG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh0KSkpLHZvaWQgeihIKTtpZihCKGUsdC5pZCkpdGhyb3cgXztyZXR1cm4gdC5pZGVudGl0eT1uLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1PZShlLHQuaWRlbnRpdHkpO3hlLmhhcyhuKXx8eGUuc2V0KG4sW10pLHhlLmdldChuKS5wdXNoKHQuaWQpLGF3YWl0IEEoZSx7Li4udCxvblVzZXJJbnB1dDpCZShlLHQpLG9uUmVzdWx0RGlzcGF0Y2g6TGUoZSx0KX0pfShlLHQpLHt3b3Jrc3BhY2VWZXJzaW9uOmkudTB8fFwiXCIsY2xpZW50QVBJVmVyc2lvbjp0LmNsaWVudEFQSVZlcnNpb258fFwiXCJ9fX1mdW5jdGlvbiBFZShlKXtyZXR1cm4gdD0+e3Q/ZnVuY3Rpb24oZSx0KXtjb25zdCBuPUIoZSx0KTtpZighbilyZXR1cm47Y29uc3Qgbz1PZShlLG4uaWRlbnRpdHkpLHI9eGUuZ2V0KG8pO2lmKHIpe2NvbnN0IG49ci5maW5kSW5kZXgoKGU9PmU9PT10KSk7LTEhPT1uJiYoci5zcGxpY2UobiwxKSxGKGUsdCkpfX0oZSx0KTp6KEgpfX1jb25zdCBWZT1uZXcgTWFwO2Z1bmN0aW9uIEdlKGUsdCl7VmUuaGFzKGUpfHxWZS5zZXQoZSxuZXcgU2V0KSxWZS5nZXQoZSkuYWRkKHQpfWZ1bmN0aW9uIHFlKGUsdCl7Y29uc3Qgbj1WZS5nZXQoZSk7biYmbi5kZWxldGUodCl9ZnVuY3Rpb24gX2UoZSl7cmV0dXJuIGFzeW5jIHQ9PnshZnVuY3Rpb24oZSx0KXtjb25zdCBuPU9lKGUsdCksbz14ZS5nZXQobik7aWYobyl7Zm9yKGNvbnN0IHQgb2YgbylGKGUsdCk7eGUuZGVsZXRlKG4pfX0oZSx0KTtjb25zdCBuPVZlLmdldChlKTtuJiZuLmZvckVhY2goKGU9PmUodCkpKX19YXN5bmMgZnVuY3Rpb24gSGUoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1TKGUubmFtZXNwYWNlZFRvcGljKSxvPWF3YWl0KHI9bixmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNyZWF0ZShyKSk7dmFyIHI7cmV0dXJuIG8ub25Db25uZWN0aW9uKGZ1bmN0aW9uKHtuYW1lc3BhY2VkVG9waWM6ZX0pe3JldHVybiBhc3luYyB0PT57Y29uc3Qgbj1wZS5nZXQoZSk7aWYobilmb3IoY29uc3QgZSBvZiBuKWlmKCFhd2FpdCBlKHQpKXRocm93ICR9fShlKSksby5vbkRpc2Nvbm5lY3Rpb24oX2UodCkpLG8ucmVnaXN0ZXIodixUZSh0KSksby5yZWdpc3Rlcih3LGZ1bmN0aW9uKGUpe3JldHVybiB0PT57Y29uc3Qgbj1EZShlLHQucHJvdmlkZXJJZCx0LmlkKSxvPVJlLmdldChuKTtvJiZvKHQpfX0odCkpLG8ucmVnaXN0ZXIoXCIyXCIsTWUodCkpLG8ucmVnaXN0ZXIoXCIzXCIsRWUodCkpLG8ucmVnaXN0ZXIoXCI0XCIsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKCk9PndlKGUpfSh0KSksby5yZWdpc3RlcihcIjFcIixDZShlKSksby5yZWdpc3RlcihoLGZ1bmN0aW9uKGUpe3JldHVybiBhc3luYyh0LG4pPT57aWYoIXR8fCF0LnByb3ZpZGVySWR8fCF0LnJlc3VsdClyZXR1cm4gdm9pZCB6KEgpO2NvbnN0IG89QihlLHQucHJvdmlkZXJJZCk7aWYoIW8pdGhyb3cgcTtjb25zdHtvblJlc3VsdERpc3BhdGNoOnJ9PW87cmV0dXJuIHI/KHQucmVzdWx0LmRpc3BhdGNoZXJJZGVudGl0eT1uLHIodC5yZXN1bHQpKTp2b2lkIDB9fSh0KSksb31hc3luYyBmdW5jdGlvbiAkZShlKXtjb25zdCB0PXVlKGUpO3ZhciBuO249ZSxkZS5kZWxldGUobiksYXdhaXQgdC5kZXN0cm95KCksRChlKX1hc3luYyBmdW5jdGlvbiBVZShlKXtjb25zdCB0PShcInN0cmluZ1wiPT10eXBlb2YgZT9lOmU/LnRvcGljfHxcIlwiKXx8ZyxuPVYoKXx8XCJcIixvPW0obix0KSxyPXt0b3BpYzp0LG5hbWVzcGFjZTpuLG5hbWVzcGFjZWRUb3BpYzpvfTtsZXQgaT1sZShvKTtpfHwoaT1hd2FpdCBIZShyKSxmdW5jdGlvbihlLHQpe2RlLnNldChlLHQpfShvLGkpKTtjb25zdCBhPWdlLmJpbmQobnVsbCxvKSxzPXFlLmJpbmQobnVsbCxvKSxjPWsuYmluZChudWxsLG8pLGQ9VC5iaW5kKG51bGwsbyk7cmV0dXJue2dldEFsbFByb3ZpZGVyczp3ZS5iaW5kKG51bGwsbyksc2VhcmNoOlBlLmJpbmQobnVsbCxyKSxyZWdpc3RlcjpoZS5iaW5kKG51bGwsbyksZGVyZWdpc3Rlcjp2ZS5iaW5kKG51bGwsbyksb25TdWJzY3JpcHRpb246ZmUuYmluZChudWxsLG8pLG9uRGlzY29ubmVjdDpHZS5iaW5kKG51bGwsbyksb25SZWdpc3RlcjpXLmJpbmQobnVsbCxvKSxvbkRlcmVnaXN0ZXI6SS5iaW5kKG51bGwsbyksZGlzcGF0Y2g6eWUuYmluZChudWxsLG8pLGRpc2Nvbm5lY3Q6JGUuYmluZChudWxsLG8pLHJlbW92ZUxpc3RlbmVyOmU9PnthKGUpLHMoZSksYyhlKSxkKGUpfX19Y29uc3R7Y3JlYXRlOk5lfT1yLHtzdWJzY3JpYmU6amV9PW8sWGU9e2NyZWF0ZTpOZSxzdWJzY3JpYmU6amUsZGVmYXVsdFRvcGljOlwiYWxsXCJ9LEtlPSgpPT57d2luZG93LnNlYXJjaD1YZX0semU9ZT0+e2NvbnN0IHQ9KCk9PntLZSgpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl9O3JldHVybiB0fTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXtLZSgpO2NvbnN0IGU9XCJsb2FkXCIsdD16ZShlKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihlLHQpO2NvbnN0IG49XCJET01Db250ZW50TG9hZGVkXCIsbz16ZShuKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihuLG8pfWNvbnN0IEplPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gUWUoKXthd2FpdCBhc3luYyBmdW5jdGlvbihlKXtKZS5zZXQoZSxhd2FpdCBqZSh7dG9waWM6ZSx1dWlkOmwucTkuV29ya3NwYWNlfSkpfShjKX1sZXQgWmU7YXN5bmMgZnVuY3Rpb24gWWUoZSl7cmV0dXJuIGF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7cmV0dXJuIFplfHwoWmU9UWUoKSksWmV9KCksSmUuZ2V0KGUpfWNvbnN0IGV0PWFzeW5jIGU9PntpZighZS5pY29uKXRocm93IG5ldyBFcnJvcihgJHtlLmlkfSBwcm92aWRlciBuZWVkcyB0byBoYXZlIGljb24gcHJvcGVydHkgZGVmaW5lZC5gKTthd2FpdCgwLHMuYUIpKCk7Y29uc3QgdD1hd2FpdCBZZShjKTt0cnl7ZS5jbGllbnRBUElWZXJzaW9uPWkudTA7Y29uc3Qgbj1hd2FpdCB0LnJlZ2lzdGVyKGUpO3JldHVybigwLGEuY2spKHthbGxvd2VkOiEwLGNvbXBvbmVudFZlcnNpb246bj8ud29ya3NwYWNlVmVyc2lvbn0pLG4/LndvcmtzcGFjZVZlcnNpb24saS51MCx7Li4ubixzZXRTZWFyY2hRdWVyeTphc3luYyB0PT4oYXdhaXQoMCxzLlhsKSgpKS5kaXNwYXRjaChzLldGLlNldFNlYXJjaFF1ZXJ5LHtxdWVyeTp0LHByb3ZpZGVySUQ6ZS5pZH0pfX1jYXRjaChlKXt0aHJvdygwLGEuY2spKHthbGxvd2VkOiExLHJlamVjdGlvbkNvZGU6ZSBpbnN0YW5jZW9mIEVycm9yP2UubWVzc2FnZTpcInVua25vd25cIn0pLGV9fSx0dD1hc3luYyBlPT57YXdhaXQoMCxzLmFCKSgpO3JldHVybihhd2FpdCBZZShjKSkuZGVyZWdpc3RlcihlKX07YXN5bmMgZnVuY3Rpb24gbnQoKXtyZXR1cm4oYXdhaXQoMCxzLlhsKSgpKS5kaXNwYXRjaChzLldGLlNob3dIb21lLHZvaWQgMCl9YXN5bmMgZnVuY3Rpb24gb3QoKXtyZXR1cm4oYXdhaXQoMCxzLlhsKSgpKS5kaXNwYXRjaChzLldGLkhpZGVIb21lLHZvaWQgMCl9fSwyOTg6KGUsdCxuKT0+e24uZCh0LHtwOigpPT5vLnB4LHc6KCk9Pm8ud3R9KTt2YXIgbz1uKDMxNil9LDQyNzooZSx0LG4pPT57dmFyIG87bi5kKHQse3Y6KCk9Pm99KSxmdW5jdGlvbihlKXtlLkFjdGlvbkJ1dHRvbj1cIkFjdGlvbkJ1dHRvblwiLGUuRHJvcGRvd25CdXR0b249XCJEcm9wZG93bkJ1dHRvblwifShvfHwobz17fSkpfSw3NTg6KGUsdCxuKT0+e3ZhciBvLHIsaTtuLmQodCx7UHQ6KCk9Pm8sZWw6KCk9PmkseVc6KCk9PnJ9KSxmdW5jdGlvbihlKXtlLlN1Z2dlc3Rpb249XCJzdWdnZXN0aW9uXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5Db250YWN0PVwiQ29udGFjdFwiLGUuQ3VzdG9tPVwiQ3VzdG9tXCIsZS5MaXN0PVwiTGlzdFwiLGUuUGxhaW49XCJQbGFpblwiLGUuU2ltcGxlVGV4dD1cIlNpbXBsZVRleHRcIixlLkxvYWRpbmc9XCJMb2FkaW5nXCIsZS5FcnJvcj1cIkVycm9yXCJ9KHJ8fChyPXt9KSksZnVuY3Rpb24oZSl7ZS5NdWx0aVNlbGVjdD1cIk11bHRpU2VsZWN0XCJ9KGl8fChpPXt9KSl9LDExNDooZSx0LG4pPT57dmFyIG8scjtuLmQodCx7TDooKT0+byxUOigpPT5yfSksZnVuY3Rpb24oZSl7ZS5TbmFwc2hvdD1cInNuYXBzaG90XCIsZS5NYW5pZmVzdD1cIm1hbmlmZXN0XCIsZS5WaWV3PVwidmlld1wiLGUuRXh0ZXJuYWw9XCJleHRlcm5hbFwifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuTGFuZGluZ1BhZ2U9XCJsYW5kaW5nUGFnZVwiLGUuQXBwR3JpZD1cImFwcEdyaWRcIn0ocnx8KHI9e30pKX0sMTA5OihlLHQsbik9PntuLmQodCx7R286KCk9PnIsWko6KCk9PmEsYkk6KCk9PmkscDY6KCk9Pm99KTtjb25zdCBvPXtDb250YWluZXI6XCJDb250YWluZXJcIixCdXR0b246XCJCdXR0b25cIn0scj17VGV4dDpcIlRleHRcIixJbWFnZTpcIkltYWdlXCIsTGlzdDpcIkxpc3RcIn0saT17Li4ubywuLi5yfTt2YXIgYTshZnVuY3Rpb24oZSl7ZS5QcmltYXJ5PVwicHJpbWFyeVwiLGUuU2Vjb25kYXJ5PVwic2Vjb25kYXJ5XCIsZS5UZXh0T25seT1cInRleHRPbmx5XCJ9KGF8fChhPXt9KSl9LDUyODooZSx0LG4pPT57bi5yKHQpLG4uZCh0LHtBcHBNYW5pZmVzdFR5cGU6KCk9PmEuTCxTdG9yZWZyb250VGVtcGxhdGU6KCk9PmEuVCxkZXJlZ2lzdGVyOigpPT5oLGhpZGU6KCk9PnYscmVnaXN0ZXI6KCk9Pncsc2hvdzooKT0+eX0pO3ZhciBvPW4oNTMyKSxyPW4oMTUwKSxpPW4oODIpLGE9bigxMTQpLHM9big2NzgpLGM9big0MzgpO2xldCBkLHU9ITE7YXN5bmMgZnVuY3Rpb24gbChlLHQsbil7Y29uc3Qgbz1hd2FpdCgwLHIuRG0pKCk7dHJ5e3JldHVybiBhd2FpdCBvLmRpc3BhdGNoKGUuYWN0aW9uLGUucGF5bG9hZCl9Y2F0Y2gocil7aWYoLTEhPT1yLnRvU3RyaW5nKCkuaW5kZXhPZihlLmFjdGlvbikpcmV0dXJuIHV8fGNvbnNvbGUud2FybihcIllvdSBhcmUgdXNpbmcgYSBuZXdlciB2ZXJzaW9uIG9mIHRoZSBXb3Jrc3BhY2UgY2xpZW50IGxpYnJhcnkgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50bHkgcnVubmluZyB3b3Jrc3BhY2UgcHJvdmlkZXIuIFBsZWFzZSB1cGdyYWRlIHRoZSBXb3Jrc3BhY2UgdG8gdmVyc2lvbiA5LjAgb3IgbGF0ZXIuXCIpLHU9ITAsYXdhaXQgby5kaXNwYXRjaCh0LmFjdGlvbix0LnBheWxvYWQpLG47dGhyb3cgcn19Y29uc3QgcD1uZXcgTWFwLGY9ZT0+e2lmKCFwLmhhcyhlKSl0aHJvdyBuZXcgRXJyb3IoYFN0b3JlZnJvbnQgUHJvdmlkZXIgd2l0aCBpZCAke2V9IGlzIG5vdCByZWdpc3RlcmVkYCk7cmV0dXJuIHAuZ2V0KGUpfSxnPWFzeW5jIGU9Pnthd2FpdCgwLGMuSGgpKGZpbi5tZS5pZGVudGl0eSk7Y29uc3QgdD1hd2FpdCgwLHIuWGwpKCk7aWYocC5oYXMoZS5pZCkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IHByb3ZpZGVyIHdpdGggaWQgJHtlLmlkfSBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtyZXR1cm4gcC5zZXQoZS5pZCxlKSwoZT0+e2UuaXNTdG9yZWZyb250QWN0aW9uc1JlZ2lzdGVyZWR8fChlLmlzU3RvcmVmcm9udEFjdGlvbnNSZWdpc3RlcmVkPSEwLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJBcHBzLChlPT5mKGUpLmdldEFwcHMoKSkpLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXIsKGU9PmYoZSkuZ2V0Rm9vdGVyKCkpKSxlLnJlZ2lzdGVyKHIuV0YuR2V0U3RvcmVmcm9udFByb3ZpZGVyTGFuZGluZ1BhZ2UsKGU9PmYoZSkuZ2V0TGFuZGluZ1BhZ2UoKSkpLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uLChlPT5mKGUpLmdldE5hdmlnYXRpb24oKSkpLGUucmVnaXN0ZXIoci5XRi5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHAsKCh7aWQ6ZSxhcHA6dH0pPT5mKGUpLmxhdW5jaEFwcCh0KSkpKX0pKHQpLGUuY2xpZW50QVBJVmVyc2lvbj1zLnUwLGwoe2FjdGlvbjpyLldGLlJlZ2lzdGVyUHJvdmlkZXIscGF5bG9hZDp7cHJvdmlkZXJUeXBlOmkubFAuU3RvcmVmcm9udCxpbmZvOmV9fSx7YWN0aW9uOnIuV0YuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIscGF5bG9hZDplfSx7d29ya3NwYWNlVmVyc2lvbjpcInVua25vd25cIn0pfSx3PWU9PihkPW5ldyBQcm9taXNlKChhc3luYyh0LG4pPT57dHJ5e2NvbnN0IG49YXdhaXQgZyhlKTsoMCxvLmQ5KSh7YWxsb3dlZDohMCxjb21wb25lbnRWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb259KSxuPy53b3Jrc3BhY2VWZXJzaW9uLHMudTAsdCh7Y2xpZW50QVBJVmVyc2lvbjpzLnUwLHdvcmtzcGFjZVZlcnNpb246bj8ud29ya3NwYWNlVmVyc2lvbj8/XCJcIn0pfWNhdGNoKGUpeygwLG8uZDkpKHthbGxvd2VkOiExLHJlamVjdGlvbkNvZGU6ZSBpbnN0YW5jZW9mIEVycm9yP2UubWVzc2FnZTpcInVua25vd25cIn0pLG4oZSl9fSkpLGQpLGg9YXN5bmMgZT0+KGF3YWl0IGQscC5kZWxldGUoZSksYXdhaXQoMCxyLmFCKSgpLGwoe2FjdGlvbjpyLldGLkRlcmVnaXN0ZXJQcm92aWRlcixwYXlsb2FkOntwcm92aWRlclR5cGU6aS5sUC5TdG9yZWZyb250LGlkOmV9fSx7YWN0aW9uOnIuV0YuRGVyZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcixwYXlsb2FkOmV9KSksdj1hc3luYygpPT4oYXdhaXQgZCxhd2FpdCgwLHIuYUIpKCksbCh7YWN0aW9uOnIuV0YuSGlkZVByb3ZpZGVyV2luZG93LHBheWxvYWQ6e3Byb3ZpZGVyVHlwZTppLmxQLlN0b3JlZnJvbnR9fSx7YWN0aW9uOnIuV0YuSGlkZVN0b3JlZnJvbnR9KSkseT1hc3luYygpPT4oYXdhaXQgZCxhd2FpdCgwLHIuYUIpKCksbCh7YWN0aW9uOnIuV0YuU2hvd1Byb3ZpZGVyV2luZG93LHBheWxvYWQ6e3Byb3ZpZGVyVHlwZTppLmxQLlN0b3JlZnJvbnR9fSx7YWN0aW9uOnIuV0YuU2hvd1N0b3JlZnJvbnR9KSl9LDQzODooZSx0LG4pPT57dmFyIG87bi5kKHQse0hoOigpPT5pfSksZnVuY3Rpb24oZSl7ZS5MYXVuY2hBcHA9XCJsYXVuY2hBcHBcIixlLlNhdmVQYWdlPVwic2F2ZVBhZ2VcIixlLkdldFNhdmVkUGFnZT1cImdldFNhdmVkUGFnZVwiLGUuQ3JlYXRlU2F2ZWRQYWdlPVwiY3JlYXRlU2F2ZWRQYWdlXCIsZS5VcGRhdGVTYXZlZFBhZ2U9XCJ1cGRhdGVTYXZlZFBhZ2VcIixlLkRlbGV0ZVNhdmVkUGFnZT1cImRlbGV0ZVNhdmVkUGFnZVwiLGUuR2V0U2F2ZWRQYWdlcz1cImdldFNhdmVkUGFnZXNcIixlLkNyZWF0ZVNhdmVkUGFnZUludGVybmFsPVwiY3JlYXRlU2F2ZWRQYWdlSW50ZXJuYWxcIixlLlVwZGF0ZVNhdmVkUGFnZUludGVybmFsPVwidXBkYXRlU2F2ZWRQYWdlSW50ZXJuYWxcIixlLkRlbGV0ZVNhdmVkUGFnZUludGVybmFsPVwiZGVsZXRlU2F2ZWRQYWdlSW50ZXJuYWxcIixlLlNoYXJlUGFnZT1cInNoYXJlUGFnZVwiLGUuVXBkYXRlUGFnZUZvcldpbmRvdz1cInVwZGF0ZVBhZ2VGb3JXaW5kb3dcIixlLkF0dGFjaFBhZ2VzVG9XaW5kb3c9XCJhdHRhY2hQYWdlc1RvV2luZG93XCIsZS5EZXRhY2hQYWdlc0Zyb21XaW5kb3c9XCJkZXRhY2hQYWdlc0Zyb21XaW5kb3dcIixlLlJlb3JkZXJQYWdlc0ZvcldpbmRvdz1cInJlb3JkZXJQYWdlc0ZvcldpbmRvd1wiLGUuU2V0QWN0aXZlUGFnZT1cInNldEFjdGl2ZVBhZ2VcIixlLkdldEFsbEF0dGFjaGVkUGFnZXM9XCJnZXRBbGxBdHRhY2hlZFBhZ2VzXCIsZS5HZXRBY3RpdmVQYWdlSWRGb3JXaW5kb3c9XCJnZXRBY3RpdmVQYWdlSWRGb3JXaW5kb3dcIixlLkdldFBhZ2VzRm9yV2luZG93PVwiZ2V0UGFnZXNGb3JXaW5kb3dcIixlLkdldFBhZ2VGb3JXaW5kb3c9XCJnZXRQYWdlRm9yV2luZG93XCIsZS5HZXRTYXZlZFBhZ2VNZXRhZGF0YT1cImdldFNhdmVkUGFnZU1ldGFkYXRhXCIsZS5HZXRVbmlxdWVQYWdlVGl0bGU9XCJnZXRVbmlxdWVQYWdlVGl0bGVcIixlLkdldExhc3RGb2N1c2VkQnJvd3NlcldpbmRvdz1cImdldExhc3RGb2N1c2VkQnJvd3NlcldpbmRvd1wiLGUuR2V0VGhlbWVzPVwiZ2V0VGhlbWVzXCIsZS5HZXRTZWxlY3RlZFNjaGVtZT1cImdldFNlbGVjdGVkU2NoZW1lXCIsZS5TZXRTZWxlY3RlZFNjaGVtZT1cInNldFNlbGVjdGVkU2NoZW1lXCIsZS5PcGVuR2xvYmFsQ29udGV4dE1lbnVJbnRlcm5hbD1cIm9wZW5HbG9iYWxDb250ZXh0TWVudUludGVybmFsXCIsZS5PcGVuVmlld1RhYkNvbnRleHRNZW51SW50ZXJuYWw9XCJvcGVuVmlld1RhYkNvbnRleHRNZW51SW50ZXJuYWxcIixlLk9wZW5QYWdlVGFiQ29udGV4dE1lbnVJbnRlcm5hbD1cIm9wZW5QYWdlVGFiQ29udGV4dE1lbnVJbnRlcm5hbFwiLGUuT3BlblNhdmVCdXR0b25Db250ZXh0TWVudUludGVybmFsPVwib3BlblNhdmVCdXR0b25Db250ZXh0TWVudUludGVybmFsXCIsZS5JbnZva2VDdXN0b21BY3Rpb25JbnRlcm5hbD1cImludm9rZUN1c3RvbUFjdGlvbkludGVybmFsXCIsZS5SZXF1ZXN0UXVpdFBsYXRmb3JtRGlhbG9nSW50ZXJuYWw9XCJyZXF1ZXN0UXVpdFBsYXRmb3JtRGlhbG9nSW50ZXJuYWxcIixlLkdldFNhdmVkV29ya3NwYWNlPVwiZ2V0U2F2ZWRXb3Jrc3BhY2VcIixlLkNyZWF0ZVNhdmVkV29ya3NwYWNlPVwiY3JlYXRlU2F2ZWRXb3Jrc3BhY2VcIixlLlVwZGF0ZVNhdmVkV29ya3NwYWNlPVwidXBkYXRlU2F2ZWRXb3Jrc3BhY2VcIixlLkRlbGV0ZVNhdmVkV29ya3NwYWNlPVwiZGVsZXRlU2F2ZWRXb3Jrc3BhY2VcIixlLkdldFNhdmVkV29ya3NwYWNlcz1cImdldFNhdmVkV29ya3NwYWNlc1wiLGUuU2F2ZVdvcmtzcGFjZT1cInNhdmVXb3Jrc3BhY2VcIixlLkdldEN1cnJlbnRXb3Jrc3BhY2U9XCJnZXRDdXJyZW50V29ya3NwYWNlXCIsZS5BcHBseVdvcmtzcGFjZT1cImFwcGx5V29ya3NwYWNlXCIsZS5TZXRBY3RpdmVXb3Jrc3BhY2U9XCJzZXRBY3RpdmVXb3Jrc3BhY2VcIixlLklzQnJvd3NlckluaXRpYWxpemVkPVwiaXNCcm93c2VySW5pdGlhbGl6ZWRcIn0ob3x8KG89e30pKTtjb25zdCByPWFzeW5jIGU9PmZpbi5QbGF0Zm9ybS53cmFwU3luYyhlKS5nZXRDbGllbnQoKSxpPWFzeW5jIGU9Pntjb25zdCB0PWF3YWl0IHIoZSksbj1cIlRhcmdldCBpcyBub3QgYSBXb3Jrc3BhY2UgUGxhdGZvcm0uIFRhcmdldCBtdXN0IGNhbGwgV29ya3NwYWNlUGxhdGZvcm0uaW5pdFwiO2xldCBvO3RyeXtvPWF3YWl0IHQuZGlzcGF0Y2goXCJpc1dvcmtzcGFjZVBsYXRmb3JtXCIpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihuKX1pZihcImJvb2xlYW5cIj09dHlwZW9mIG8mJm8pcmV0dXJuIGNvbnNvbGUud2FybihcIllvdSBhcmUgdXNpbmcgYW4gb2xkZXIgdmVyc2lvbiBvZiB0aGUgd29ya3NwYWNlIHBsYXRmb3JtLiBQbGVhc2UgdXBkYXRlIHlvdXIgd29ya3NwYWNlIHBsYXRmb3JtLlwiKSxvO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBvJiZvLmlzV29ya3NwYWNlUGxhdGZvcm0pcmV0dXJuIG87dGhyb3cgbmV3IEVycm9yKG4pfX0sMTUwOihlLHQsbik9PntuLmQodCx7RG06KCk9PnMsV0Y6KCk9PmEsWGw6KCk9PmwsYUI6KCk9PnV9KTt2YXIgbz1uKDExNykscj1uKDY3OCksaT1uKDEyMSk7dmFyIGE7IWZ1bmN0aW9uKGUpe2UuUmVnaXN0ZXJQcm92aWRlcj1cInJlZ2lzdGVyLXByb3ZpZGVyXCIsZS5EZXJlZ2lzdGVyUHJvdmlkZXI9XCJkZXJlZ2lzdGVyLXByb3ZpZGVyXCIsZS5DcmVhdGVQcm92aWRlcldpbmRvdz1cImNyZWF0ZS1wcm92aWRlci13aW5kb3dcIixlLkdldFByb3ZpZGVycz1cImdldC1wcm92aWRlcnNcIixlLlNob3dQcm92aWRlcldpbmRvdz1cInNob3ctcHJvdmlkZXItd2luZG93XCIsZS5IaWRlUHJvdmlkZXJXaW5kb3c9XCJoaWRlLXByb3ZpZGVyLXdpbmRvd1wiLGUuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWFwcHNcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbGFuZGluZy1wYWdlXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXI9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1mb290ZXJcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb249XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1uYXZpZ2F0aW9uXCIsZS5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHA9XCJsYXVuY2gtc3RvcmVmcm9udC1wcm92aWRlci1hcHBcIixlLlNob3dIb21lPVwic2hvdy1ob21lXCIsZS5IaWRlSG9tZT1cImhpZGUtaG9tZVwiLGUuQXNzaWduSG9tZVNlYXJjaENvbnRleHQ9XCJhc3NpZ24taG9tZS1zZWFyY2gtY29udGV4dFwiLGUuU2V0U2VhcmNoUXVlcnk9XCJzZXQtc2VhcmNoLXF1ZXJ5XCIsZS5PcGVuSG9tZUFuZFNldFNlYXJjaFF1ZXJ5PVwib3Blbi1ob21lLWFuZC1zZXQtc2VhcmNoLXF1ZXJ5XCIsZS5HZXRMZWdhY3lQYWdlcz1cImdldC1sZWdhY3ktcGFnZXNcIixlLkdldExlZ2FjeVdvcmtzcGFjZXM9XCJnZXQtbGVnYWN5LXdvcmtzcGFjZXNcIixlLkdldENvbXB1dGVkUGxhdGZvcm1UaGVtZT1cImdldC1jb21wdXRlZC1wbGF0Zm9ybS10aGVtZVwiLGUuU2V0U2VsZWN0ZWRTY2hlbWU9XCJzZXQtc2VsZWN0ZWQtc2NoZW1lXCIsZS5SZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcj1cInJlZ2lzdGVyLXN0b3JlZnJvbnQtcHJvdmlkZXJcIixlLkRlcmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJkZXJlZ2lzdGVyLXN0b3JlZnJvbnQtcHJvdmlkZXJcIixlLkhpZGVTdG9yZWZyb250PVwiaGlkZS1zdG9yZWZyb250XCIsZS5TaG93U3RvcmVmcm9udD1cInNob3ctc3RvcmVmcm9udFwifShhfHwoYT17fSkpO2NvbnN0IHM9KDAsby5aKShcIl9fb2Zfd29ya3NwYWNlX3Byb3RvY29sX19cIiksYz1cImlzTGF1bmNoZWRWaWFMaWJcIixkPWU9Pntjb25zdCB0PW5ldyBVUkwoZSk7cmV0dXJuIHQuc2VhcmNoUGFyYW1zLmFwcGVuZChjLFwidHJ1ZVwiKSx0LnRvU3RyaW5nKCl9LHU9YXN5bmMoKT0+e2F3YWl0KDAsaS5KVikoaS5pVyl8fCgoci5aS3x8LTE9PT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJXaW5cIikpJiZhd2FpdCBmaW4uQXBwbGljYXRpb24uc3RhcnRGcm9tTWFuaWZlc3QoZChyLmFXKSksYXdhaXQgZmluLlN5c3RlbS5vcGVuVXJsV2l0aEJyb3dzZXIoZChyLkdYKSkpfSxsPWFzeW5jKCk9Pihhd2FpdCB1KCkscygpKX0sODI6KGUsdCxuKT0+e24uZCh0LHtSODooKT0+YSxYXzooKT0+aSxsUDooKT0+b30pO3ZhciBvLHI9bigxNTApOyFmdW5jdGlvbihlKXtlLlN0b3JlZnJvbnQ9XCJzdG9yZWZyb250XCIsZS5Eb2NrPVwiZG9ja1wifShvfHwobz17fSkpO2NvbnN0IGk9YXN5bmMgZT0+KGF3YWl0KDAsci5EbSkoKSkuZGlzcGF0Y2goci5XRi5TaG93UHJvdmlkZXJXaW5kb3cse3Byb3ZpZGVyVHlwZTplfSksYT1hc3luYyBlPT4oYXdhaXQoMCxyLkRtKSgpKS5kaXNwYXRjaChyLldGLkhpZGVQcm92aWRlcldpbmRvdyx7cHJvdmlkZXJUeXBlOmV9KX0sODA2OihlLHQsbik9PntuLmQodCx7cTk6KCk9Pm99KTt2YXIgbyxyLGksYT1uKDY3OCk7IWZ1bmN0aW9uKGUpe2UuV29ya3NwYWNlPVwib3BlbmZpbi1icm93c2VyXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5SdW5SZXF1ZXN0ZWQ9XCJydW4tcmVxdWVzdGVkXCIsZS5XaW5kb3dPcHRpb25zQ2hhbmdlZD1cIndpbmRvdy1vcHRpb25zLWNoYW5nZWRcIixlLldpbmRvd0Nsb3NlZD1cIndpbmRvdy1jbG9zZWRcIixlLldpbmRvd0NyZWF0ZWQ9XCJ3aW5kb3ctY3JlYXRlZFwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuRmluUHJvdG9jb2w9XCJmaW4tcHJvdG9jb2xcIn0oaXx8KGk9e30pKTthLkFCLG8uV29ya3NwYWNlfSwxMTc6KGUsdCxuKT0+e24uZCh0LHtaOigpPT5pfSk7dmFyIG89big2NzgpO2NvbnN0IHI9by5BeCYmXCJjb21wbGV0ZVwiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmbmV3IFByb21pc2UoKGU9PmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsKCgpPT57XCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmZSgpfSkpKSk7ZnVuY3Rpb24gaShlKXtsZXQgdDtyZXR1cm4oKT0+e2lmKCFvLnNTKXRocm93IG5ldyBFcnJvcihcImdldENoYW5uZWxDbGllbnQgY2Fubm90IGJlIHVzZWQgb3V0c2lkZSBhbiBPcGVuRmluIGVudi4gQXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiB0fHwodD0oYXN5bmMoKT0+e2F3YWl0IHI7Y29uc3Qgbj17Y2xpZW50QVBJVmVyc2lvbjpvLnUwfSxpPWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlLHtwYXlsb2FkOm59KTtyZXR1cm4gaS5vbkRpc2Nvbm5lY3Rpb24oKGFzeW5jKCk9Pntjb25zb2xlLndhcm4oYGRpc2Nvbm5lY3RlZCBmcm9tIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWApLHQ9dm9pZCAwfSkpLGl9KSgpLnRoZW4oKGU9PmUpKS5jYXRjaCgobj0+e3Rocm93IHQ9dm9pZCAwLG5ldyBFcnJvcihgZmFpbGVkIHRvIGNvbm5lY3QgdG8gY2hhbm5lbCBwcm92aWRlciAke2V9OiAke259YCl9KSkpLHR9fX0sNjc4OihlLHQsbik9Pnt2YXIgbztuLmQodCx7QUI6KCk9PnMsQXg6KCk9PmksR1g6KCk9PnUsWks6KCk9PmQsYVc6KCk9Pmwsb0M6KCk9PmMsc1M6KCk9PnIsdTA6KCk9PmZ9KSxmdW5jdGlvbihlKXtlLkxvY2FsPVwibG9jYWxcIixlLkRldj1cImRldlwiLGUuU3RhZ2luZz1cInN0YWdpbmdcIixlLlByb2Q9XCJwcm9kXCJ9KG98fChvPXt9KSk7Y29uc3Qgcj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZmluLGk9KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBwcm9jZXNzfHxwcm9jZXNzLmVudj8uSkVTVF9XT1JLRVJfSUQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyksYT1pP3dpbmRvdy5vcmlnaW46by5Mb2NhbCxzPXImJmZpbi5tZS51dWlkLGM9ciYmZmluLm1lLm5hbWUsZD0ociYmZmluLm1lLmVudGl0eVR5cGUsXCJwcm9kXCI9PT1vLkxvY2FsKSx1PShvLkRldixvLlN0YWdpbmcsby5Qcm9kLFwiZmluczovL3N5c3RlbS1hcHBzL3dvcmtzcGFjZVwiKSxsPVwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvOS42LjAvYXBwLmpzb25cIixwPWU9PmUuc3RhcnRzV2l0aChcImh0dHA6Ly9cIil8fGUuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpP2U6YStlLGY9KHAoXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3dvcmtzcGFjZS85LjYuMFwiKSxwKFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvOS42LjBcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdPUktTUEFDRV9ET0NTX1BMQVRGT1JNX1VSTCYmcChXT1JLU1BBQ0VfRE9DU19QTEFURk9STV9VUkwpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfRE9DU19DTElFTlRfVVJMJiZwKFdPUktTUEFDRV9ET0NTX0NMSUVOVF9VUkwpLFwiOS42LjBcIil9LDUzMjooZSx0LG4pPT57bi5kKHQse1duOigpPT5kLGNrOigpPT5zLGQ5OigpPT5jfSk7dmFyIG8scj1uKDY3OCksaT1uKDEyMSk7IWZ1bmN0aW9uKGUpe2UuQnJvd3Nlcj1cIkJyb3dzZXJcIixlLkRvY2s9XCJEb2NrXCIsZS5Ib21lPVwiSG9tZVwiLGUuTm90aWZpY2F0aW9uPVwiTm90aWZpY2F0aW9uXCIsZS5TdG9yZWZyb250PVwiU3RvcmVmcm9udFwiLGUuUGxhdGZvcm09XCJQbGF0Zm9ybVwiLGUuVGhlbWluZz1cIlRoZW1pbmdcIn0ob3x8KG89e30pKTtjb25zdCBhPWFzeW5jKGUsdCk9Pntjb25zdCBuPXthcGlWZXJzaW9uOnQuYXBpVmVyc2lvbnx8ci51MCxjb21wb25lbnROYW1lOmUsY29tcG9uZW50VmVyc2lvbjp0LmNvbXBvbmVudFZlcnNpb258fHIudTAsYWxsb3dlZDp0LmFsbG93ZWQscmVqZWN0aW9uQ29kZTp0LnJlamVjdGlvbkNvZGV9O2Zpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcIndvcmtzcGFjZS1saWNlbnNpbmdcIixkYXRhOm59KX0scz1hc3luYyBlPT57aS5PSS51dWlkPT09aS5HaS51dWlkJiZpLk9JLm5hbWU9PT1pLkdpLm5hbWV8fGEoby5Ib21lLGUpfSxjPWFzeW5jIGU9PnthKG8uU3RvcmVmcm9udCxlKX0sZD1hc3luYyBlPT57YShvLkRvY2ssZSl9fSwxMjE6KGUsdCxuKT0+e24uZCh0LHtHaTooKT0+ZCxKVjooKT0+cCxPSTooKT0+dSxpVzooKT0+bH0pO3ZhciBvLHIsaSxhPW4oODA2KSxzPW4oNjc4KTshZnVuY3Rpb24oZSl7ZS5Ib21lPVwib3BlbmZpbi1ob21lXCIsZS5Eb2NrPVwib3BlbmZpbi1kb2NrXCIsZS5TdG9yZWZyb250PVwib3BlbmZpbi1zdG9yZWZyb250XCIsZS5Ib21lSW50ZXJuYWw9XCJvcGVuZmluLWhvbWUtaW50ZXJuYWxcIixlLkJyb3dzZXJNZW51PVwib3BlbmZpbi1icm93c2VyLW1lbnVcIixlLkJyb3dzZXJJbmRpY2F0b3I9XCJvcGVuZmluLWJyb3dzZXItaW5kaWNhdG9yXCIsZS5Ccm93c2VyV2luZG93PVwiaW50ZXJuYWwtZ2VuZXJhdGVkLXdpbmRvd1wiLGUuQ2xhc3NpY1dpbmRvdz1cImludGVybmFsLWdlbmVyYXRlZC1jbGFzc2ljLXdpbmRvd1wifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuU2hvd249XCJzaG93blwiLGUuQm91bmRzQ2hhbmdlZD1cImJvdW5kcy1jaGFuZ2VkXCIsZS5MYXlvdXRSZWFkeT1cImxheW91dC1yZWFkeVwiLGUuRW5kVXNlckJvdW5kc0NoYW5naW5nPVwiZW5kLXVzZXItYm91bmRzLWNoYW5naW5nXCIsZS5CbHVycmVkPVwiYmx1cnJlZFwiLGUuQ2xvc2VkPVwiY2xvc2VkXCIsZS5DbG9zZVJlcXVlc3RlZD1cImNsb3NlLXJlcXVlc3RlZFwiLGUuRm9jdXNlZD1cImZvY3VzZWRcIixlLlNob3dSZXF1ZXN0ZWQ9XCJzaG93LXJlcXVlc3RlZFwiLGUuVmlld0NyYXNoZWQ9XCJ2aWV3LWNyYXNoZWRcIixlLlZpZXdBdHRhY2hlZD1cInZpZXctYXR0YWNoZWRcIixlLlZpZXdEZXRhY2hlZD1cInZpZXctZGV0YWNoZWRcIixlLlZpZXdQYWdlVGl0bGVVcGRhdGVkPVwidmlldy1wYWdlLXRpdGxlLXVwZGF0ZWRcIixlLlZpZXdEZXN0cm95ZWQ9XCJ2aWV3LWRlc3Ryb3llZFwiLGUuT3B0aW9uc0NoYW5nZWQ9XCJvcHRpb25zLWNoYW5nZWRcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkJlZm9yZVVubG9hZD1cImJlZm9yZXVubG9hZFwifShpfHwoaT17fSkpO2Z1bmN0aW9uIGMoZSl7aWYoIXMuc1MpdGhyb3cgbmV3IEVycm9yKFwiZ2V0T0ZXaW5kb3cgY2FuIG9ubHkgYmUgdXNlZCBpbiBhbiBPcGVuRmluIGVudi4gQXZvaWQgY2FsbGluZyB0aGlzIG1ldGhvZCBkdXJpbmcgcHJlLXJlbmRlcmluZy5cIik7cmV0dXJuIGZpbi5XaW5kb3cud3JhcFN5bmMoZSl9Y29uc3QgZD17bmFtZTpzLm9DLHV1aWQ6cy5BQn07Y29uc3QgdT17bmFtZTpvLkhvbWUsdXVpZDphLnE5LldvcmtzcGFjZX0sbD0oby5Eb2NrLGEucTkuV29ya3NwYWNlLG8uU3RvcmVmcm9udCxhLnE5LldvcmtzcGFjZSx7bmFtZTphLnE5LldvcmtzcGFjZSx1dWlkOmEucTkuV29ya3NwYWNlfSk7Y29uc3QgcD1lPT5jKGUpLmdldE9wdGlvbnMoKS50aGVuKCgoKT0+ITApKS5jYXRjaCgoKCk9PiExKSl9LDMxNjooZSx0LG4pPT57dmFyIG8scixpO24uZCh0LHtEZTooKT0+byxweDooKT0+cix3dDooKT0+aX0pLGZ1bmN0aW9uKGUpe2UuRmV0Y2hpbmc9XCJmZXRjaGluZ1wiLGUuRmV0Y2hlZD1cImZldGNoZWRcIixlLkNvbXBsZXRlPVwiY29tcGxldGVcIn0ob3x8KG89e30pKSxmdW5jdGlvbihlKXtlLlVzZXJBY3Rpb249XCJ1c2VyLWFjdGlvblwiLGUuRm9jdXNDaGFuZ2U9XCJmb2N1cy1jaGFuZ2VcIixlLlJlbG9hZD1cInJlbG9hZFwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuQWN0aXZlPVwiYWN0aXZlXCIsZS5EZWZhdWx0PVwiZGVmYXVsdFwifShpfHwoaT17fSkpfX0sdD17fTtmdW5jdGlvbiBuKG8pe3ZhciByPXRbb107aWYodm9pZCAwIT09cilyZXR1cm4gci5leHBvcnRzO3ZhciBpPXRbb109e2V4cG9ydHM6e319O3JldHVybiBlW29dKGksaS5leHBvcnRzLG4pLGkuZXhwb3J0c31uLmQ9KGUsdCk9Pntmb3IodmFyIG8gaW4gdCluLm8odCxvKSYmIW4ubyhlLG8pJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLHtlbnVtZXJhYmxlOiEwLGdldDp0W29dfSl9LG4ubz0oZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCksbi5yPWU9PntcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfTt2YXIgbz17fTsoKCk9PntuLnIobyksbi5kKG8se0FjdGlvblRyaWdnZXI6KCk9PlcucCxBcHBNYW5pZmVzdFR5cGU6KCk9PkkuTCxCdXR0b25TdHlsZTooKT0+ay5aSixDTElBY3Rpb246KCk9PkMuUHQsQ0xJRmlsdGVyT3B0aW9uVHlwZTooKT0+Qy5lbCxDTElUZW1wbGF0ZTooKT0+Qy55VyxDb250YWluZXJUZW1wbGF0ZUZyYWdtZW50TmFtZXM6KCk9PmsucDYsRG9jazooKT0+ZSxEb2NrQnV0dG9uTmFtZXM6KCk9PmQudixIb21lOigpPT52LExlZ2FjeTooKT0+dCxQcmVzZW50YXRpb25UZW1wbGF0ZUZyYWdtZW50TmFtZXM6KCk9PmsuR28sU2VhcmNoVGFnQmFja2dyb3VuZDooKT0+Vy53LFN0b3JlZnJvbnQ6KCk9PlAsU3RvcmVmcm9udFRlbXBsYXRlOigpPT5JLlQsVGVtcGxhdGVGcmFnbWVudFR5cGVzOigpPT5rLmJJfSk7dmFyIGU9e307bi5yKGUpLG4uZChlLHtEb2NrQnV0dG9uTmFtZXM6KCk9PmQudixkZXJlZ2lzdGVyOigpPT5mLG1pbmltaXplOigpPT5nLHJlZ2lzdGVyOigpPT5wLHNob3c6KCk9Pnd9KTt2YXIgdD17fTtuLnIodCksbi5kKHQse2dldFBhZ2VzOigpPT5tLGdldFdvcmtzcGFjZXM6KCk9PlN9KTt2YXIgcj1uKDY3OCksaT1uKDUzMiksYT1uKDE1MCkscz1uKDQzOCksYz1uKDgyKSxkPW4oNDI3KTtsZXQgdSxsPSExO2NvbnN0IHA9ZT0+KHU9bmV3IFByb21pc2UoKGFzeW5jKHQsbik9Pnt0cnl7Y29uc3Qgbj1hd2FpdChhc3luYyBlPT57YXdhaXQoMCxzLkhoKShmaW4ubWUuaWRlbnRpdHkpO2NvbnN0IHQ9YXdhaXQoMCxhLlhsKSgpO2lmKGwpdGhyb3cgbmV3IEVycm9yKFwiQSBkb2NrIHByb3ZpZGVyIGZvciB0aGUgcGxhdGZvcm0gaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKTtyZXR1cm4gbD0hMCxlLmNsaWVudEFQSVZlcnNpb249ci51MCx0LmRpc3BhdGNoKGEuV0YuUmVnaXN0ZXJQcm92aWRlcix7cHJvdmlkZXJUeXBlOmMubFAuRG9jayxpbmZvOmV9KX0pKGUpOygwLGkuV24pKHthbGxvd2VkOiEwLGNvbXBvbmVudFZlcnNpb246bj8ud29ya3NwYWNlVmVyc2lvbn0pLG4/LndvcmtzcGFjZVZlcnNpb24sci51MCx0KHtjbGllbnRBUElWZXJzaW9uOnIudTAsd29ya3NwYWNlVmVyc2lvbjpuPy53b3Jrc3BhY2VWZXJzaW9uPz9cIlwifSl9Y2F0Y2goZSl7KDAsaS5Xbikoe2FsbG93ZWQ6ITEscmVqZWN0aW9uQ29kZTplIGluc3RhbmNlb2YgRXJyb3I/ZS5tZXNzYWdlOlwidW5rbm93blwifSksbihlKSx1PW51bGx9fSkpLHUpLGY9YXN5bmMoKT0+e2F3YWl0IHUsbD0hMTtyZXR1cm4oYXdhaXQoMCxhLlhsKSgpKS5kaXNwYXRjaChhLldGLkRlcmVnaXN0ZXJQcm92aWRlcix7cHJvdmlkZXJUeXBlOmMubFAuRG9ja30pfSxnPWFzeW5jKCk9Pnthd2FpdCB1LGF3YWl0KDAsYS5hQikoKSxhd2FpdCgwLGMuUjgpKGMubFAuRG9jayl9LHc9YXN5bmMoKT0+e2F3YWl0IHUsYXdhaXQoMCxhLmFCKSgpLGF3YWl0KDAsYy5YXykoYy5sUC5Eb2NrKX07dmFyIGgsdj1uKDcwMyk7bigxMjEpOyFmdW5jdGlvbihlKXtlLlRhYkNyZWF0ZWQ9XCJ0YWItY3JlYXRlZFwiLGUuQ29udGFpbmVyQ3JlYXRlZD1cImNvbnRhaW5lci1jcmVhdGVkXCIsZS5Db250YWluZXJSZXNpemVkPVwiY29udGFpbmVyLXJlc2l6ZWRcIn0oaHx8KGg9e30pKTtuZXcgTWFwO3ZhciB5OyFmdW5jdGlvbihlKXtlLkN1cnJlbnRXb3Jrc3BhY2VJZD1cImN1cnJlbnRXb3Jrc3BhY2VJZFwiLGUuTGFzdEZvY3VzZWRCcm93c2VyV2luZG93PVwibGFzdEZvY3VzZWRCcm93c2VyV2luZG93XCIsZS5NYWNoaW5lTmFtZT1cIm1hY2hpbmVOYW1lXCIsZS5OZXdUYWJQYWdlTGF5b3V0PVwiTmV3VGFiUGFnZUxheW91dFwiLGUuTmV3VGFiUGFnZVNvcnQ9XCJOZXdUYWJQYWdlU29ydFwiLGUuRG9ja1Bvc2l0aW9uPVwiRG9ja1Bvc2l0aW9uXCIsZS5TZWxlY3RlZENvbG9yU2NoZW1lPVwiU2VsZWN0ZWRDb2xvclNjaGVtZVwiLGUuSGFzTW92ZWRTdG9yZT1cIkhhc01vdmVkU3RvcmVcIn0oeXx8KHk9e30pKTtjb25zdCBtPSgpPT5hc3luYyBmdW5jdGlvbigpe3JldHVybihhd2FpdCgwLGEuRG0pKCkpLmRpc3BhdGNoKGEuV0YuR2V0TGVnYWN5UGFnZXMsdm9pZCAwKX0oKSxTPSgpPT4oYXN5bmMoKT0+KGF3YWl0KDAsYS5EbSkoKSkuZGlzcGF0Y2goYS5XRi5HZXRMZWdhY3lXb3Jrc3BhY2VzLHZvaWQgMCkpKCk7dmFyIFA9big1MjgpLFc9bigyOTgpLGs9bigxMDkpLEM9big3NTgpLEk9bigxMTQpfSkoKSxtb2R1bGUuZXhwb3J0cz1vfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVZpZXc7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXQ7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2Vha01hcDtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNYXA7XG4iLCIvKipcbiAqIENvbnZlcnRzIGFuIEFTQ0lJIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhc2NpaVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuc3BsaXQoJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzY2lpVG9BcnJheTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzVHlwZWRBcnJheTtcbiIsInZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuYXJ5O1xuIiwidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiBvZiBgcHJvcHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVZhbHVlcztcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFZhbHVlO1xuIiwiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHdpdGggW3plcm8td2lkdGggam9pbmVycyBvciBjb2RlIHBvaW50cyBmcm9tIHRoZSBhc3RyYWwgcGxhbmVzXShodHRwOi8vZWV2LmVlL2Jsb2cvMjAxNS8wOS8xMi9kYXJrLWNvcm5lcnMtb2YtdW5pY29kZS8pLiAqL1xudmFyIHJlSGFzVW5pY29kZSA9IFJlZ0V4cCgnWycgKyByc1pXSiArIHJzQXN0cmFsUmFuZ2UgICsgcnNDb21ib1JhbmdlICsgcnNWYXJSYW5nZSArICddJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSBzeW1ib2wgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZShzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZS50ZXN0KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzVW5pY29kZTtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuXG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlID09ICdudW1iZXInIHx8XG4gICAgICAodHlwZSAhPSAnc3ltYm9sJyAmJiByZUlzVWludC50ZXN0KHZhbHVlKSkpICYmXG4gICAgICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBpdGVyYXRvcmAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVyYXRvciBUaGUgaXRlcmF0b3IgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBpdGVyYXRvclRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgdmFyIGRhdGEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoIShkYXRhID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgcmVzdWx0LnB1c2goZGF0YS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpdGVyYXRvclRvQXJyYXk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG4iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUtleXM7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsInZhciBhc2NpaVRvQXJyYXkgPSByZXF1aXJlKCcuL19hc2NpaVRvQXJyYXknKSxcbiAgICBoYXNVbmljb2RlID0gcmVxdWlyZSgnLi9faGFzVW5pY29kZScpLFxuICAgIHVuaWNvZGVUb0FycmF5ID0gcmVxdWlyZSgnLi9fdW5pY29kZVRvQXJyYXknKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgID8gdW5pY29kZVRvQXJyYXkoc3RyaW5nKVxuICAgIDogYXNjaWlUb0FycmF5KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9BcnJheTtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9SYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNTeW1ib2wgPSAnKD86JyArIFtyc05vbkFzdHJhbCArIHJzQ29tYm8gKyAnPycsIHJzQ29tYm8sIHJzUmVnaW9uYWwsIHJzU3VyclBhaXIsIHJzQXN0cmFsXS5qb2luKCd8JykgKyAnKSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIFtzdHJpbmcgc3ltYm9sc10oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtdW5pY29kZSkuICovXG52YXIgcmVVbmljb2RlID0gUmVnRXhwKHJzRml0eiArICcoPz0nICsgcnNGaXR6ICsgJyl8JyArIHJzU3ltYm9sICsgcnNTZXEsICdnJyk7XG5cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiB1bmljb2RlVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGUpIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaWNvZGVUb0FycmF5O1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN0cmluZywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaW5nO1xuIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpLFxuICAgIGl0ZXJhdG9yVG9BcnJheSA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9yVG9BcnJheScpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKSxcbiAgICBzdHJpbmdUb0FycmF5ID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9BcnJheScpLFxuICAgIHZhbHVlcyA9IHJlcXVpcmUoJy4vdmFsdWVzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltSXRlcmF0b3IgPSBTeW1ib2wgPyBTeW1ib2wuaXRlcmF0b3IgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvQXJyYXkoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIF8udG9BcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ11cbiAqXG4gKiBfLnRvQXJyYXkoMSk7XG4gKiAvLyA9PiBbXVxuICpcbiAqIF8udG9BcnJheShudWxsKTtcbiAqIC8vID0+IFtdXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHZhbHVlKSA/IHN0cmluZ1RvQXJyYXkodmFsdWUpIDogY29weUFycmF5KHZhbHVlKTtcbiAgfVxuICBpZiAoc3ltSXRlcmF0b3IgJiYgdmFsdWVbc3ltSXRlcmF0b3JdKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yVG9BcnJheSh2YWx1ZVtzeW1JdGVyYXRvcl0oKSk7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICBmdW5jID0gdGFnID09IG1hcFRhZyA/IG1hcFRvQXJyYXkgOiAodGFnID09IHNldFRhZyA/IHNldFRvQXJyYXkgOiB2YWx1ZXMpO1xuXG4gIHJldHVybiBmdW5jKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5O1xuIiwidmFyIGJhc2VWYWx1ZXMgPSByZXF1aXJlKCcuL19iYXNlVmFsdWVzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gW10gOiBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZXM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2Vtb2ppJyk7IiwiLypqc2xpbnQgbm9kZTogdHJ1ZSovXG52YXIgdG9BcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC90b0FycmF5Jyk7XG52YXIgZW1vamlCeU5hbWUgPSByZXF1aXJlKCcuL2Vtb2ppLmpzb24nKTtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogcmVnZXggdG8gcGFyc2UgZW1vamkgaW4gYSBzdHJpbmcgLSBmaW5kcyBlbW9qaSwgZS5nLiA6Y29mZmVlOlxuICovXG52YXIgZW1vamlOYW1lUmVnZXggPSAvOihbYS16QS1aMC05X1xcLVxcK10rKTovZztcblxuLyoqXG4gKiByZWdleCB0byB0cmltIHdoaXRlc3BhY2VcbiAqIHVzZSBpbnN0ZWFkIG9mIFN0cmluZy5wcm90b3R5cGUudHJpbSgpIGZvciBJRTggc3VwcG9ydFxuICovXG52YXIgdHJpbVNwYWNlUmVnZXggPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cbi8qKlxuICogUmVtb3ZlcyBjb2xvbnMgb24gZWl0aGVyIHNpZGVcbiAqIG9mIHRoZSBzdHJpbmcgaWYgcHJlc2VudFxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaXBDb2xvbnMgKHN0cikge1xuICB2YXIgY29sb25JbmRleCA9IHN0ci5pbmRleE9mKCc6Jyk7XG4gIGlmIChjb2xvbkluZGV4ID4gLTEpIHtcbiAgICAvLyA6ZW1vamk6IChodHRwOi8vd3d3LmVtb2ppLWNoZWF0LXNoZWV0LmNvbS8pXG4gICAgaWYgKGNvbG9uSW5kZXggPT09IHN0ci5sZW5ndGggLSAxKSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGNvbG9uSW5kZXgpO1xuICAgICAgcmV0dXJuIHN0cmlwQ29sb25zKHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHIoY29sb25JbmRleCArIDEpO1xuICAgICAgcmV0dXJuIHN0cmlwQ29sb25zKHN0cik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBBZGRzIGNvbG9ucyB0byBlaXRoZXIgc2lkZVxuICogb2YgdGhlIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB3cmFwQ29sb25zIChzdHIpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIubGVuZ3RoID4gMCkgPyAnOicgKyBzdHIgKyAnOicgOiBzdHI7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgdGhlIHdvcmQgaXMgd3JhcHBlZCBpbiBjb2xvbnNcbiAqIGJ5IG9ubHkgYWRkaW5nIHRoZW0sIGlmIHRoZXkgYXJlIG5vdCB0aGVyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5zdXJlQ29sb25zIChzdHIpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHJbMF0gIT09ICc6JykgPyB3cmFwQ29sb25zKHN0cikgOiBzdHI7XG59XG5cbi8vIE5vbiBzcGFjaW5nIG1hcmssIHNvbWUgZW1vdGljb25zIGhhdmUgdGhlbS4gSXQncyB0aGUgJ1ZhcmlhbnQgRm9ybScsXG4vLyB3aGljaCBwcm92aWRlcyBtb3JlIGluZm9ybWF0aW9uIHNvIHRoYXQgZW1vdGljb25zIGNhbiBiZSByZW5kZXJlZCBhc1xuLy8gbW9yZSBjb2xvcmZ1bCBncmFwaGljcy4gRkUwRSBpcyBhIHVuaWNvZGUgdGV4dCB2ZXJzaW9uLCB3aGVyZSBhcyBGRTBGXG4vLyBzaG91bGQgYmUgcmVuZGVyZWQgYXMgYSBncmFwaGljYWwgdmVyc2lvbi4gVGhlIGNvZGUgZ3JhY2VmdWxseSBkZWdyYWRlcy5cbnZhciBOT05fU1BBQ0lOR19NQVJLID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTAzOSk7IC8vIDY1MDM5IC0gJ++4jycgLSAweEZFMEY7XG52YXIgbm9uU3BhY2luZ1JlZ2V4ID0gbmV3IFJlZ0V4cChOT05fU1BBQ0lOR19NQVJLLCAnZycpXG5cbi8vIFJlbW92ZSB0aGUgbm9uLXNwYWNpbmctbWFyayBmcm9tIHRoZSBjb2RlLCBuZXZlciBzZW5kIGEgc3RyaXBwZWQgdmVyc2lvblxuLy8gdG8gdGhlIGNsaWVudCwgYXMgaXQga2lsbHMgZ3JhcGhpY2FsIGVtb3RpY29ucy5cbmZ1bmN0aW9uIHN0cmlwTlNCIChjb2RlKSB7XG4gIHJldHVybiBjb2RlLnJlcGxhY2Uobm9uU3BhY2luZ1JlZ2V4LCAnJyk7XG59O1xuXG4vLyBSZXZlcnNlZCBoYXNoIHRhYmxlLCB3aGVyZSBhcyBlbW9qaUJ5TmFtZSBjb250YWlucyBhIHsgaGVhcnQ6ICfinaQnIH1cbi8vIGRpY3Rpb25hcnkgZW1vamlCeUNvZGUgY29udGFpbnMgeyDinaQ6ICdoZWFydCcgfS4gVGhlIGNvZGVzIGFyZSBub3JtYWxpemVkXG4vLyB0byB0aGUgdGV4dCB2ZXJzaW9uLlxudmFyIGVtb2ppQnlDb2RlID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpLnJlZHVjZShmdW5jdGlvbihoLGspIHtcbiAgaFtzdHJpcE5TQihlbW9qaUJ5TmFtZVtrXSldID0gaztcbiAgcmV0dXJuIGg7XG59LCB7fSk7XG5cbi8qKlxuICogRW1vamkgbmFtZXNwYWNlXG4gKi9cbnZhciBFbW9qaSA9IHtcbiAgZW1vamk6IGVtb2ppQnlOYW1lLFxufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgY29kZSBmcm9tIG5hbWUuIHJldHVybiBlbW9qaSBjb2RlIGJhY2sgaWYgY29kZSBpcyBwYXNzZWQgaW4uXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtb2ppXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLl9nZXQgPSBmdW5jdGlvbiBfZ2V0IChlbW9qaSkge1xuICBpZiAoZW1vamlCeUNvZGVbc3RyaXBOU0IoZW1vamkpXSkge1xuICAgIHJldHVybiBlbW9qaTtcbiAgfSBlbHNlIGlmIChlbW9qaUJ5TmFtZS5oYXNPd25Qcm9wZXJ0eShlbW9qaSkpIHtcbiAgICByZXR1cm4gZW1vamlCeU5hbWVbZW1vamldO1xuICB9XG5cbiAgcmV0dXJuIGVuc3VyZUNvbG9ucyhlbW9qaSk7XG59O1xuXG4vKipcbiAqIGdldCBlbW9qaSBjb2RlIGZyb20gOmVtb2ppOiBzdHJpbmcgb3IgbmFtZVxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5nZXQgPSBmdW5jdGlvbiBnZXQgKGVtb2ppKSB7XG4gIGVtb2ppID0gc3RyaXBDb2xvbnMoZW1vamkpO1xuXG4gIHJldHVybiBFbW9qaS5fZ2V0KGVtb2ppKTtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgZWl0aGVyIGNvZGUgb3IgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPckNvZGUgVGhlIGVtb2ppIHRvIGZpbmQsIGVpdGhlciBgY29mZmVlYCwgYDpjb2ZmZWU6YCBvciBg4piVYDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuZmluZCA9IGZ1bmN0aW9uIGZpbmQgKG5hbWVPckNvZGUpIHtcbiAgcmV0dXJuIEVtb2ppLmZpbmRCeU5hbWUobmFtZU9yQ29kZSkgfHwgRW1vamkuZmluZEJ5Q29kZShuYW1lT3JDb2RlKTtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGVtb2ppIHRvIGZpbmQgZWl0aGVyIGBjb2ZmZWVgIG9yIGA6Y29mZmVlOmA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmZpbmRCeU5hbWUgPSBmdW5jdGlvbiBmaW5kQnlOYW1lIChuYW1lKSB7XG4gIHZhciBzdHJpcHBlZCA9IHN0cmlwQ29sb25zKG5hbWUpO1xuICB2YXIgZW1vamkgPSBlbW9qaUJ5TmFtZVtzdHJpcHBlZF07XG5cbiAgcmV0dXJuIGVtb2ppID8gKHsgZW1vamk6IGVtb2ppLCBrZXk6IHN0cmlwcGVkIH0pIDogdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBmaW5kIHRoZSBlbW9qaSBieSBjb2RlIChlbW9qaSlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBlbW9qaSB0byBmaW5kOyBmb3IgZXhhbXBsZSBg4piVYCBvciBg4piUYFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5maW5kQnlDb2RlID0gZnVuY3Rpb24gZmluZEJ5Q29kZSAoY29kZSkge1xuICB2YXIgc3RyaXBwZWQgPSBzdHJpcE5TQihjb2RlKTtcbiAgdmFyIG5hbWUgPSBlbW9qaUJ5Q29kZVtzdHJpcHBlZF07XG5cbiAgLy8gbG9va3VwIGVtb2ppIHRvIGVuc3VyZSB0aGUgVmFyaWFudCBGb3JtIGlzIHJldHVybmVkXG4gIHJldHVybiBuYW1lID8gKHsgZW1vamk6IGVtb2ppQnlOYW1lW25hbWVdLCBrZXk6IG5hbWUgfSkgOiB1bmRlZmluZWQ7XG59O1xuXG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZW1vamkgaXMga25vd24gYnkgdGhpcyBsaWJyYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZU9yQ29kZSBUaGUgZW1vamkgdG8gdmFsaWRhdGUsIGVpdGhlciBgY29mZmVlYCwgYDpjb2ZmZWU6YCBvciBg4piVYDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamkgPSBmdW5jdGlvbiBoYXNFbW9qaSAobmFtZU9yQ29kZSkge1xuICByZXR1cm4gRW1vamkuaGFzRW1vamlCeU5hbWUobmFtZU9yQ29kZSkgfHwgRW1vamkuaGFzRW1vamlCeUNvZGUobmFtZU9yQ29kZSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVtb2ppIHdpdGggZ2l2ZW4gbmFtZSBpcyBrbm93biBieSB0aGlzIGxpYnJhcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBlbW9qaSB0byB2YWxpZGF0ZSBlaXRoZXIgYGNvZmZlZWAgb3IgYDpjb2ZmZWU6YDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamlCeU5hbWUgPSBmdW5jdGlvbiBoYXNFbW9qaUJ5TmFtZSAobmFtZSkge1xuICB2YXIgcmVzdWx0ID0gRW1vamkuZmluZEJ5TmFtZShuYW1lKTtcbiAgcmV0dXJuICEhcmVzdWx0ICYmIHJlc3VsdC5rZXkgPT09IHN0cmlwQ29sb25zKG5hbWUpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIGdpdmVuIGVtb2ppIGlzIGtub3duIGJ5IHRoaXMgbGlicmFyeVxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgVGhlIGVtb2ppIHRvIHZhbGlkYXRlOyBmb3IgZXhhbXBsZSBg4piVYCBvciBg4piUYFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5oYXNFbW9qaUJ5Q29kZSA9IGZ1bmN0aW9uIGhhc0Vtb2ppQnlDb2RlIChjb2RlKSB7XG4gIHZhciByZXN1bHQgPSBFbW9qaS5maW5kQnlDb2RlKGNvZGUpO1xuICByZXR1cm4gISFyZXN1bHQgJiYgc3RyaXBOU0IocmVzdWx0LmVtb2ppKSA9PT0gc3RyaXBOU0IoY29kZSk7XG59O1xuXG4vKipcbiAqIGdldCBlbW9qaSBuYW1lIGZyb20gY29kZVxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5jbHVkZUNvbG9ucyBzaG91bGQgdGhlIHJlc3VsdCBpbmNsdWRlIHRoZSA6OlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS53aGljaCA9IGZ1bmN0aW9uIHdoaWNoIChlbW9qaV9jb2RlLCBpbmNsdWRlQ29sb25zKSB7XG4gIHZhciBjb2RlID0gc3RyaXBOU0IoZW1vamlfY29kZSk7XG4gIHZhciB3b3JkID0gZW1vamlCeUNvZGVbY29kZV07XG5cbiAgcmV0dXJuIGluY2x1ZGVDb2xvbnMgPyB3cmFwQ29sb25zKHdvcmQpIDogd29yZDtcbn07XG5cbi8qKlxuICogZW1vamlmeSBhIHN0cmluZyAocmVwbGFjZSA6ZW1vamk6IHdpdGggYW4gZW1vamkpXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHBhcmFtICB7ZnVuY3Rpb259IG9uX21pc3NpbmcgKGdldHMgZW1vamkgbmFtZSB3aXRob3V0IDo6IGFuZCByZXR1cm5zIGEgcHJvcGVyIGVtb2ppIGlmIG5vIGVtb2ppIHdhcyBmb3VuZClcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmb3JtYXQgKHdyYXAgdGhlIHJldHVybmVkIGVtb2ppIGluIGEgY3VzdG9tIGVsZW1lbnQpXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLmVtb2ppZnkgPSBmdW5jdGlvbiBlbW9qaWZ5IChzdHIsIG9uX21pc3NpbmcsIGZvcm1hdCkge1xuICBpZiAoIXN0cikgcmV0dXJuICcnO1xuXG4gIHJldHVybiBzdHIuc3BsaXQoZW1vamlOYW1lUmVnZXgpIC8vIHBhcnNlIGVtb2ppIHZpYSByZWdleFxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiBwYXJzZUVtb2ppKHMsIGkpIHtcbiAgICAgICAgICAgICAgLy8gZXZlcnkgc2Vjb25kIGVsZW1lbnQgaXMgYW4gZW1vamksIGUuZy4gXCJ0ZXN0IDpmYXN0X2ZvcndhcmQ6XCIgLT4gWyBcInRlc3QgXCIsIFwiZmFzdF9mb3J3YXJkXCIgXVxuICAgICAgICAgICAgICBpZiAoaSAlIDIgPT09IDApIHJldHVybiBzO1xuICAgICAgICAgICAgICB2YXIgZW1vamkgPSBFbW9qaS5fZ2V0KHMpO1xuICAgICAgICAgICAgICB2YXIgaXNNaXNzaW5nID0gZW1vamkuaW5kZXhPZignOicpID4gLTE7XG5cbiAgICAgICAgICAgICAgaWYgKGlzTWlzc2luZyAmJiB0eXBlb2Ygb25fbWlzc2luZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbl9taXNzaW5nKHMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc01pc3NpbmcgJiYgdHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQoZW1vamksIHMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGVtb2ppO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKSAvLyBjb252ZXJ0IGJhY2sgdG8gc3RyaW5nXG4gIDtcbn07XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIGVtb2ppXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLnJhbmRvbSA9IGZ1bmN0aW9uIHJhbmRvbSAoKSB7XG4gIHZhciBlbW9qaUtleXMgPSBPYmplY3Qua2V5cyhlbW9qaUJ5TmFtZSk7XG4gIHZhciByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppS2V5cy5sZW5ndGgpO1xuICB2YXIga2V5ID0gZW1vamlLZXlzW3JhbmRvbUluZGV4XTtcbiAgdmFyIGVtb2ppID0gRW1vamkuX2dldChrZXkpO1xuICByZXR1cm4geyBrZXk6IGtleSwgZW1vamk6IGVtb2ppIH07XG59XG5cbi8qKlxuICogIHJldHVybiBhbiBjb2xsZWN0aW9uIG9mIHBvdGVudGlhbCBlbW9qaSBtYXRjaGVzXG4gKiAgQHBhcmFtIHtzdHJpbmd9IHN0clxuICogIEByZXR1cm4ge0FycmF5LjxPYmplY3Q+fVxuICovXG5FbW9qaS5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2ggKHN0cikge1xuICB2YXIgZW1vamlLZXlzID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpO1xuICB2YXIgbWF0Y2hlciA9IHN0cmlwQ29sb25zKHN0cilcbiAgdmFyIG1hdGNoaW5nS2V5cyA9IGVtb2ppS2V5cy5maWx0ZXIoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpLmluZGV4T2YobWF0Y2hlcikgPT09IDA7XG4gIH0pO1xuICByZXR1cm4gbWF0Y2hpbmdLZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBrZXksXG4gICAgICBlbW9qaTogRW1vamkuX2dldChrZXkpLFxuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIHVuZW1vamlmeSBhIHN0cmluZyAocmVwbGFjZSBlbW9qaSB3aXRoIDplbW9qaTopXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS51bmVtb2ppZnkgPSBmdW5jdGlvbiB1bmVtb2ppZnkgKHN0cikge1xuICBpZiAoIXN0cikgcmV0dXJuICcnO1xuICB2YXIgd29yZHMgPSB0b0FycmF5KHN0cik7XG5cbiAgcmV0dXJuIHdvcmRzLm1hcChmdW5jdGlvbih3b3JkKSB7XG4gICAgcmV0dXJuIEVtb2ppLndoaWNoKHdvcmQsIHRydWUpIHx8IHdvcmQ7XG4gIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiByZXBsYWNlIGVtb2ppcyB3aXRoIHJlcGxhY2VtZW50IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufHN0cmluZ30gdGhlIHN0cmluZyBvciBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBsYWNlIHRoZSBlbW9qaSB3aXRoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZCB0cmFpbGluZyB3aGl0ZXNwYWNlcyBiZSBjbGVhbmVkPyBEZWZhdWx0cyBmYWxzZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSAoc3RyLCByZXBsYWNlbWVudCwgY2xlYW5TcGFjZXMpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcblxuICB2YXIgcmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/IHJlcGxhY2VtZW50IDogZnVuY3Rpb24oKSB7IHJldHVybiByZXBsYWNlbWVudDsgfTtcbiAgdmFyIHdvcmRzID0gdG9BcnJheShzdHIpO1xuXG4gIHZhciByZXBsYWNlZCA9IHdvcmRzLm1hcChmdW5jdGlvbih3b3JkLCBpZHgpIHtcbiAgICB2YXIgZW1vamkgPSBFbW9qaS5maW5kQnlDb2RlKHdvcmQpO1xuXG4gICAgaWYgKGVtb2ppICYmIGNsZWFuU3BhY2VzICYmIHdvcmRzW2lkeCArIDFdID09PSAnICcpIHtcbiAgICAgIHdvcmRzW2lkeCArIDFdID0gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVtb2ppID8gcmVwbGFjZShlbW9qaSkgOiB3b3JkO1xuICB9KS5qb2luKCcnKTtcblxuICByZXR1cm4gY2xlYW5TcGFjZXMgPyByZXBsYWNlZC5yZXBsYWNlKHRyaW1TcGFjZVJlZ2V4LCAnJykgOiByZXBsYWNlZDtcbn07XG5cblxuLyoqXG4gKiByZW1vdmUgYWxsIGVtb2ppcyBmcm9tIGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLnN0cmlwID0gZnVuY3Rpb24gc3RyaXAgKHN0cikge1xuICByZXR1cm4gRW1vamkucmVwbGFjZShzdHIsICcnLCB0cnVlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1vamk7XG4iLCJpbXBvcnQge1xuXHRDTElUZW1wbGF0ZSxcblx0dHlwZSBDTElGaWx0ZXIsXG5cdHR5cGUgSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdHR5cGUgSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdHR5cGUgSG9tZVNlYXJjaFJlc3BvbnNlLFxuXHR0eXBlIEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0ICogYXMgZW1vamkgZnJvbSBcIm5vZGUtZW1vamlcIjtcbmltcG9ydCB0eXBlIHsgSW50ZWdyYXRpb24sIEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGVscCB9IGZyb20gXCIuLi8uLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB0eXBlIHsgRW1vamlTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0RW1vamlUZW1wbGF0ZSB9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIEVtb2ppcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPEVtb2ppU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwiZW1vamlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgcmVzdWx0LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiA9IFwiRW1vamkgRGV0YWlsc1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSBlbW9qaSBjb3B5IGtleSBhY3Rpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTiA9IFwiQ29weSBLZXlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgY29weSBrZXkgYWN0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTiA9IFwiQ29weSBFbW9qaVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6ICgpID0+IHZvaWQsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBpcyBiZWluZyBkZXJlZ2lzdGVyZWQuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge31cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzPygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7RW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRH0taGVscGAsXG5cdFx0XHRcdHRpdGxlOiBcIi9lbW9qaVwiLFxuXHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24/Lmljb24sXG5cdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cHJvdmlkZXJJZDogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0ZW1wbGF0ZTogQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IGNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XCIvZW1vamlcIixcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcIlRoZSBlbW9qaSBjb21tYW5kIGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgZW1vamlzIGJ5IG5hbWUuXCIsXG5cdFx0XHRcdFx0XHRcIkZvciBleGFtcGxlIHRvIHNlYXJjaCBmb3IgZW1vamlzIHdoaWNoIGluY2x1ZGUgYHdvbWFuYCBvciBgbWFuYCBpbiB0aGVpciBuYW1lLlwiXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRbXCIvZW1vamkgd29tYW5cIiwgXCIvZW1vamkgbWFuXCJdXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBkYXRhOiB7IHVybD86IHN0cmluZyB9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0cmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OICYmXG5cdFx0XHRcdHJlc3VsdC5kYXRhLmVtb2ppXG5cdFx0XHQpIHtcblx0XHRcdFx0YXdhaXQgZmluLkNsaXBib2FyZC53cml0ZVRleHQoeyBkYXRhOiByZXN1bHQuZGF0YS5lbW9qaSB9KTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRyZXN1bHQuYWN0aW9uLm5hbWUgPT09IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OICYmXG5cdFx0XHRcdHJlc3VsdC5kYXRhLmtleVxuXHRcdFx0KSB7XG5cdFx0XHRcdGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHsgZGF0YTogcmVzdWx0LmRhdGEua2V5IH0pO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiAmJlxuXHRcdFx0XHRyZXN1bHQuZGF0YS51cmwgJiZcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLm9wZW5Vcmxcblx0XHRcdCkge1xuXHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMub3BlblVybChkYXRhLnVybCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmIChxdWVyeS5zdGFydHNXaXRoKFwiL2Vtb2ppIFwiKSkge1xuXHRcdFx0bGV0IGtleSA9IHF1ZXJ5LnNsaWNlKDcpO1xuXG5cdFx0XHRpZiAoa2V5Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0a2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdFx0Ly8gRmluZCBleGFjdCBtYXRjaCBmaXJzdCBpZiB0aGVyZSBpcyBvbmVcblx0XHRcdFx0Y29uc3QgbWF0Y2hFbW9qaSA9IGVtb2ppLmdldChrZXkpO1xuXHRcdFx0XHRpZiAobWF0Y2hFbW9qaSAmJiAhbWF0Y2hFbW9qaS5zdGFydHNXaXRoKFwiOlwiKSkge1xuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLmNyZWF0ZVJlc3VsdChrZXksIG1hdGNoRW1vamkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZpbmQgYWxsIG90aGVyIHBvdGVudGlhbCBtYXRjaGVzXG5cdFx0XHRcdGNvbnN0IHNlYXJjaFJlc3VsdCA9IGVtb2ppLnNlYXJjaChrZXkpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgcmVzdWx0IG9mIHNlYXJjaFJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuZW1vamkgIT09IG1hdGNoRW1vamkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLmNyZWF0ZVJlc3VsdChyZXN1bHQua2V5LCByZXN1bHQuZW1vamkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgc2VhcmNoIHJlc3VsdC5cblx0ICogQHBhcmFtIGtleSBUaGUga2V5IGZvciB0aGUgZW1vamkuXG5cdCAqIEBwYXJhbSBzeW1ib2wgVGhlIGVtb2ppIHN5bWJvbC5cblx0ICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc3VsdChrZXk6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQ+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBgZW1vamktJHtrZXl9YCxcblx0XHRcdHRpdGxlOiBrZXksXG5cdFx0XHRsYWJlbDogXCJJbmZvcm1hdGlvblwiLFxuXHRcdFx0YWN0aW9uczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTixcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK0NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTixcblx0XHRcdFx0XHRob3RrZXk6IFwiRW50ZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGVtb2ppOiBzeW1ib2wsXG5cdFx0XHRcdHVybDogYGh0dHBzOi8vZW1vamlwZWRpYS5vcmcvJHtrZXl9L2Bcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdGxheW91dDogYXdhaXQgZ2V0RW1vamlUZW1wbGF0ZSh7XG5cdFx0XHRcdFx0Y29weUVtb2ppQWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OLFxuXHRcdFx0XHRcdGNvcHlLZXlBY3Rpb246IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OLFxuXHRcdFx0XHRcdGRldGFpbHNBY3Rpb246IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfREVUQUlMU19BQ1RJT05cblx0XHRcdFx0fSksXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRrZXlUaXRsZTogXCJLZXlcIixcblx0XHRcdFx0XHRjb3B5S2V5VGl0bGU6IFwiQ29weSBLZXlcIixcblx0XHRcdFx0XHRrZXksXG5cdFx0XHRcdFx0ZW1vamlUaXRsZTogXCJFbW9qaVwiLFxuXHRcdFx0XHRcdGNvcHlFbW9qaVRpdGxlOiBcIkNvcHkgRW1vamlcIixcblx0XHRcdFx0XHRlbW9qaTogc3ltYm9sLFxuXHRcdFx0XHRcdGRldGFpbHNUaXRsZTogXCJGdXJ0aGVyIERldGFpbHNcIlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uU3R5bGUsIFRlbXBsYXRlRnJhZ21lbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgeyBjcmVhdGVCdXR0b24sIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlVGV4dCB9IGZyb20gXCIuLi8uLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRUaGVtZSB9IGZyb20gXCIuLi8uLi90aGVtZXNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEVtb2ppVGVtcGxhdGUoYWN0aW9uczoge1xuXHRjb3B5RW1vamlBY3Rpb246IHN0cmluZztcblx0Y29weUtleUFjdGlvbjogc3RyaW5nO1xuXHRkZXRhaWxzQWN0aW9uOiBzdHJpbmc7XG59KTogUHJvbWlzZTxUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cblx0cmV0dXJuIGNyZWF0ZUNvbnRhaW5lcihcblx0XHRcImNvbHVtblwiLFxuXHRcdFtcblx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoXCJrZXlUaXRsZVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS5icmFuZFByaW1hcnksIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlVGV4dChcImtleVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0RGVmYXVsdCwgd29yZEJyZWFrOiBcImJyZWFrLWFsbFwiIH0pLFxuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUtleVRpdGxlXCIsIGFjdGlvbnMuY29weUtleUFjdGlvbiwge1xuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTJweFwiXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIixcblx0XHRcdFx0XHRhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuXHRcdFx0XHRcdGdhcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0bWFyZ2luQm90dG9tOiBcIjEwcHhcIlxuXHRcdFx0XHR9XG5cdFx0XHQpLFxuXG5cdFx0XHRhd2FpdCBjcmVhdGVUZXh0KFwiZW1vamlUaXRsZVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS5icmFuZFByaW1hcnksIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlVGV4dChcImVtb2ppXCIsIDMyLCB7IGNvbG9yOiB0aGVtZS5wYWxldHRlLnRleHREZWZhdWx0IH0pLFxuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUVtb2ppVGl0bGVcIiwgYWN0aW9ucy5jb3B5RW1vamlBY3Rpb24sIHtcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEycHhcIlxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG5cdFx0XHRcdFx0YWxpZ25JdGVtczogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRnYXA6IFwiMTBweFwiLFxuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0fVxuXHRcdFx0KSxcblxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlQnV0dG9uKEJ1dHRvblN0eWxlLlByaW1hcnksIFwiZGV0YWlsc1RpdGxlXCIsIGFjdGlvbnMuZGV0YWlsc0FjdGlvbiwge1xuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTJweFwiXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XSxcblx0XHRcdFx0eyBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH1cblx0XHRcdClcblx0XHRdLFxuXHRcdHtcblx0XHRcdHBhZGRpbmc6IFwiMTBweFwiXG5cdFx0fVxuXHQpO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5sZXQgc2V0dGluZ3M6IEN1c3RvbVNldHRpbmdzO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRDb25maWd1cmVkU2V0dGluZ3MoKTogUHJvbWlzZTxDdXN0b21TZXR0aW5ncz4ge1xuXHRjb25zdCBhcHAgPSBhd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudCgpO1xuXHRjb25zdCBtYW5pZmVzdDogT3BlbkZpbi5NYW5pZmVzdCAmIHsgY3VzdG9tU2V0dGluZ3M/OiBDdXN0b21TZXR0aW5ncyB9ID0gYXdhaXQgYXBwLmdldE1hbmlmZXN0KCk7XG5cblx0aWYgKG1hbmlmZXN0LmN1c3RvbVNldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZXR0aW5ncyA9IG1hbmlmZXN0LmN1c3RvbVNldHRpbmdzO1xuXHR9IGVsc2Uge1xuXHRcdHNldHRpbmdzID0ge307XG5cdH1cblxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPEN1c3RvbVNldHRpbmdzPiB7XG5cdGlmIChzZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0c2V0dGluZ3MgPSBhd2FpdCBnZXRDb25maWd1cmVkU2V0dGluZ3MoKTtcblx0fVxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG4iLCJpbXBvcnQge1xuXHRCdXR0b25TdHlsZSxcblx0QnV0dG9uVGVtcGxhdGVGcmFnbWVudCxcblx0SW1hZ2VUZW1wbGF0ZUZyYWdtZW50LFxuXHRQbGFpbkNvbnRhaW5lclRlbXBsYXRlRnJhZ21lbnQsXG5cdFRlbXBsYXRlRnJhZ21lbnQsXG5cdFRlbXBsYXRlRnJhZ21lbnRUeXBlcyxcblx0VGV4dFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgKiBhcyBDU1MgZnJvbSBcImNzc3R5cGVcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRUaGVtZSB9IGZyb20gXCIuL3RoZW1lc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlSGVscChcblx0dGl0bGU6IHN0cmluZyxcblx0ZGVzY3JpcHRpb246IHN0cmluZ1tdLFxuXHRleGFtcGxlczogc3RyaW5nW11cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbik6IFByb21pc2U8eyBsYXlvdXQ6IFBsYWluQ29udGFpbmVyVGVtcGxhdGVGcmFnbWVudDsgZGF0YTogYW55IH0+IHtcblx0Y29uc3QgdGhlbWUgPSBhd2FpdCBnZXRDdXJyZW50VGhlbWUoKTtcblx0Y29uc3QgYWRkaXRpb25hbERhdGEgPSB7fTtcblx0Y29uc3QgZnJhZ21lbnRzOiBUZW1wbGF0ZUZyYWdtZW50W10gPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjcmlwdGlvbi5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uS2V5ID0gYGRlc2MtJHtpfWA7XG5cdFx0YWRkaXRpb25hbERhdGFbZGVzY3JpcHRpb25LZXldID0gZGVzY3JpcHRpb25baV07XG5cdFx0ZnJhZ21lbnRzLnB1c2goXG5cdFx0XHRhd2FpdCBjcmVhdGVUZXh0KGRlc2NyaXB0aW9uS2V5LCAxMiwge1xuXHRcdFx0XHRwYWRkaW5nOiBcIjZweCAwcHhcIlxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG5cdGNvbnN0IGV4YW1wbGVGcmFnbWVudHM6IFRlbXBsYXRlRnJhZ21lbnRbXSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGV4YW1wbGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgZXhhbXBsZUtleSA9IGBsaW5lLSR7aX1gO1xuXHRcdGFkZGl0aW9uYWxEYXRhW2V4YW1wbGVLZXldID0gZXhhbXBsZXNbaV07XG5cdFx0ZXhhbXBsZUZyYWdtZW50cy5wdXNoKFxuXHRcdFx0YXdhaXQgY3JlYXRlVGV4dChleGFtcGxlS2V5LCAxMiwge1xuXHRcdFx0XHRmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiLFxuXHRcdFx0XHR3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiXG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblx0aWYgKGV4YW1wbGVGcmFnbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdGZyYWdtZW50cy5wdXNoKFxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFwiY29sdW1uXCIsIGV4YW1wbGVGcmFnbWVudHMsIHtcblx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCIsXG5cdFx0XHRcdG1hcmdpblRvcDogXCI2cHhcIixcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLmJhY2tncm91bmQ1LFxuXHRcdFx0XHRjb2xvcjogdGhlbWUucGFsZXR0ZS5pbnB1dENvbG9yLFxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IFwiNXB4XCIsXG5cdFx0XHRcdG92ZXJmbG93OiBcImF1dG9cIlxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0bGF5b3V0OiBhd2FpdCBjcmVhdGVDb250YWluZXIoXG5cdFx0XHRcImNvbHVtblwiLFxuXHRcdFx0W1xuXHRcdFx0XHRhd2FpdCBjcmVhdGVUaXRsZShcInRpdGxlXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7XG5cdFx0XHRcdFx0bWFyZ2luQm90dG9tOiBcIjEwcHhcIixcblx0XHRcdFx0XHRib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5wYWxldHRlLmJhY2tncm91bmQ2fWBcblx0XHRcdFx0fSksXG5cdFx0XHRcdC4uLmZyYWdtZW50c1xuXHRcdFx0XSxcblx0XHRcdHtcblx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCJcblx0XHRcdH1cblx0XHQpLFxuXHRcdGRhdGE6IHtcblx0XHRcdHRpdGxlLFxuXHRcdFx0Li4uYWRkaXRpb25hbERhdGFcblx0XHR9XG5cdH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIoXG5cdGNvbnRhaW5lclR5cGU6IFwiY29sdW1uXCIgfCBcInJvd1wiLFxuXHRjaGlsZHJlbjogVGVtcGxhdGVGcmFnbWVudFtdLFxuXHRzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQcm9taXNlPFBsYWluQ29udGFpbmVyVGVtcGxhdGVGcmFnbWVudD4ge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5Db250YWluZXIsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0ZmxleERpcmVjdGlvbjogY29udGFpbmVyVHlwZSxcblx0XHRcdC4uLnN0eWxlXG5cdFx0fSxcblx0XHRjaGlsZHJlblxuXHR9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGl0bGUoXG5cdGRhdGFLZXk6IHN0cmluZyxcblx0Zm9udFNpemU6IG51bWJlciA9IDE2LFxuXHRmb250V2VpZ2h0OiBzdHJpbmcgPSBcImJvbGRcIixcblx0c3R5bGU/OiBDU1MuUHJvcGVydGllc1xuKTogUHJvbWlzZTxUZXh0VGVtcGxhdGVGcmFnbWVudD4ge1xuXHRjb25zdCB0aGVtZSA9IGF3YWl0IGdldEN1cnJlbnRUaGVtZSgpO1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5UZXh0LFxuXHRcdGRhdGFLZXksXG5cdFx0c3R5bGU6IHtcblx0XHRcdGNvbG9yOiB0aGVtZS5wYWxldHRlLnRleHREZWZhdWx0LFxuXHRcdFx0Zm9udFNpemU6IGAke2ZvbnRTaXplID8/IDE2fXB4YCxcblx0XHRcdGZvbnRXZWlnaHQsXG5cdFx0XHQuLi5zdHlsZVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRleHQoXG5cdGRhdGFLZXk6IHN0cmluZyxcblx0Zm9udFNpemU6IG51bWJlciA9IDE0LFxuXHRzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQcm9taXNlPFRleHRUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLlRleHQsXG5cdFx0ZGF0YUtleSxcblx0XHRzdHlsZToge1xuXHRcdFx0Zm9udFNpemU6IGAke2ZvbnRTaXplID8/IDE0fXB4YCxcblx0XHRcdC4uLnN0eWxlXG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW1hZ2UoXG5cdGRhdGFLZXk6IHN0cmluZyxcblx0YWx0ZXJuYXRpdmVUZXh0OiBzdHJpbmcsXG5cdHN0eWxlPzogQ1NTLlByb3BlcnRpZXNcbik6IFByb21pc2U8SW1hZ2VUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkltYWdlLFxuXHRcdGRhdGFLZXksXG5cdFx0YWx0ZXJuYXRpdmVUZXh0LFxuXHRcdHN0eWxlOiB7XG5cdFx0XHQuLi5zdHlsZVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihcblx0YnV0dG9uU3R5bGU6IEJ1dHRvblN0eWxlLFxuXHR0aXRsZUtleTogc3RyaW5nLFxuXHRhY3Rpb246IHN0cmluZyxcblx0c3R5bGU/OiBDU1MuUHJvcGVydGllc1xuKTogUHJvbWlzZTxCdXR0b25UZW1wbGF0ZUZyYWdtZW50PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cdGNvbnN0IGJ1dHRvbk9wdGlvbnMgPVxuXHRcdGJ1dHRvblN0eWxlID09PSBCdXR0b25TdHlsZS5TZWNvbmRhcnlcblx0XHRcdD8ge1xuXHRcdFx0XHRcdGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuaW5wdXRDb2xvcn1gXG5cdFx0XHQgIH1cblx0XHRcdDoge307XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkJ1dHRvbixcblx0XHRidXR0b25TdHlsZSxcblx0XHRjaGlsZHJlbjogW2F3YWl0IGNyZWF0ZVRleHQodGl0bGVLZXksIDEyKV0sXG5cdFx0YWN0aW9uLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHQuLi5idXR0b25PcHRpb25zLFxuXHRcdFx0Li4uc3R5bGVcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbVBhbGV0dGVTZXQsXG5cdEN1c3RvbVRoZW1lT3B0aW9uc1xufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtL2NvbW1vbi9zcmMvYXBpL3RoZW1pbmdcIjtcbmltcG9ydCB7IGdldFNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcblxuY29uc3QgREVGQVVMVF9QQUxFVFRFUyA9IHtcblx0bGlnaHQ6IHtcblx0XHRicmFuZFByaW1hcnk6IFwiIzUwNENGRlwiLFxuXHRcdGJyYW5kU2Vjb25kYXJ5OiBcIiMxRTFGMjNcIixcblx0XHRiYWNrZ3JvdW5kUHJpbWFyeTogXCIjRkFGQkZFXCIsXG5cdFx0Y29udGVudEJhY2tncm91bmQxOiBcIiM1MDRDRkZcIixcblx0XHRiYWNrZ3JvdW5kMTogXCIjRkZGRkZGXCIsXG5cdFx0YmFja2dyb3VuZDI6IFwiI0ZBRkJGRVwiLFxuXHRcdGJhY2tncm91bmQzOiBcIiNGM0Y1RjhcIixcblx0XHRiYWNrZ3JvdW5kNDogXCIjRUNFRUYxXCIsXG5cdFx0YmFja2dyb3VuZDU6IFwiI0REREZFNFwiLFxuXHRcdGJhY2tncm91bmQ2OiBcIiNDOUNCRDJcIixcblx0XHRzdGF0dXNTdWNjZXNzOiBcIiMzNUM3NTlcIixcblx0XHRzdGF0dXNXYXJuaW5nOiBcIiNGNDhGMDBcIixcblx0XHRzdGF0dXNDcml0aWNhbDogXCIjQkUxRDFGXCIsXG5cdFx0c3RhdHVzQWN0aXZlOiBcIiMwNDk4RkJcIixcblx0XHRpbnB1dEJhY2tncm91bmQ6IFwiI0VDRUVGMVwiLFxuXHRcdGlucHV0Q29sb3I6IFwiIzFFMUYyM1wiLFxuXHRcdGlucHV0UGxhY2Vob2xkZXI6IFwiIzM4M0E0MFwiLFxuXHRcdGlucHV0RGlzYWJsZWQ6IFwiIzdEODA4QVwiLFxuXHRcdGlucHV0Rm9jdXNlZDogXCIjQzlDQkQyXCIsXG5cdFx0dGV4dERlZmF1bHQ6IFwiIzFFMUYyM1wiLFxuXHRcdHRleHRIZWxwOiBcIiMyRjMxMzZcIixcblx0XHR0ZXh0SW5hY3RpdmU6IFwiIzdEODA4QVwiXG5cdH0sXG5cdGRhcms6IHtcblx0XHRicmFuZFByaW1hcnk6IFwiIzUwNENGRlwiLFxuXHRcdGJyYW5kU2Vjb25kYXJ5OiBcIiMzODNBNDBcIixcblx0XHRiYWNrZ3JvdW5kUHJpbWFyeTogXCIjMUUxRjIzXCIsXG5cdFx0Y29udGVudEJhY2tncm91bmQxOiBcIiM1MDRDRkZcIixcblx0XHRiYWNrZ3JvdW5kMTogXCIjMTExMjE0XCIsXG5cdFx0YmFja2dyb3VuZDI6IFwiIzFFMUYyM1wiLFxuXHRcdGJhY2tncm91bmQzOiBcIiMyNDI2MkJcIixcblx0XHRiYWNrZ3JvdW5kNDogXCIjMkYzMTM2XCIsXG5cdFx0YmFja2dyb3VuZDU6IFwiIzM4M0E0MFwiLFxuXHRcdGJhY2tncm91bmQ2OiBcIiM1MzU2NUZcIixcblx0XHRzdGF0dXNTdWNjZXNzOiBcIiMzNUM3NTlcIixcblx0XHRzdGF0dXNXYXJuaW5nOiBcIiNGNDhGMDBcIixcblx0XHRzdGF0dXNDcml0aWNhbDogXCIjQkUxRDFGXCIsXG5cdFx0c3RhdHVzQWN0aXZlOiBcIiMwNDk4RkJcIixcblx0XHRpbnB1dEJhY2tncm91bmQ6IFwiIzUzNTY1RlwiLFxuXHRcdGlucHV0Q29sb3I6IFwiI0ZGRkZGRlwiLFxuXHRcdGlucHV0UGxhY2Vob2xkZXI6IFwiI0M5Q0JEMlwiLFxuXHRcdGlucHV0RGlzYWJsZWQ6IFwiIzdEODA4QVwiLFxuXHRcdGlucHV0Rm9jdXNlZDogXCIjQzlDQkQyXCIsXG5cdFx0dGV4dERlZmF1bHQ6IFwiI0ZGRkZGRlwiLFxuXHRcdHRleHRIZWxwOiBcIiNDOUNCRDJcIixcblx0XHR0ZXh0SW5hY3RpdmU6IFwiIzdEODA4QVwiXG5cdH1cbn07XG5cbmxldCB2YWxpZGF0ZWRUaGVtZXM6IEN1c3RvbVRoZW1lT3B0aW9uc1tdO1xuXG5mdW5jdGlvbiBnZXRTeXN0ZW1QcmVmZXJyZWRDb2xvclNjaGVtZSgpOiBcImxpZ2h0XCIgfCBcImRhcmtcIiB7XG5cdGlmICh3aW5kb3cubWF0Y2hNZWRpYT8uKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG5cdFx0cmV0dXJuIFwiZGFya1wiO1xuXHR9XG5cdHJldHVybiBcImxpZ2h0XCI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VGhlbWUoKTogUHJvbWlzZTxDdXN0b21UaGVtZU9wdGlvbnM+IHtcblx0Y29uc3QgdGhlbWVzID0gYXdhaXQgZ2V0VGhlbWVzKCk7XG5cdGlmICh0aGVtZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxhYmVsOiBcImRlZmF1bHRcIixcblx0XHRcdHBhbGV0dGU6IERFRkFVTFRfUEFMRVRURVMuZGFya1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIHRoZW1lc1swXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRoZW1lcygpOiBQcm9taXNlPEN1c3RvbVRoZW1lT3B0aW9uc1tdPiB7XG5cdGlmICghdmFsaWRhdGVkVGhlbWVzKSB7XG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xuXHRcdHZhbGlkYXRlZFRoZW1lcyA9IHZhbGlkYXRlVGhlbWVzKHNldHRpbmdzPy50aGVtZVByb3ZpZGVyPy50aGVtZXMpO1xuXHR9XG5cdHJldHVybiB2YWxpZGF0ZWRUaGVtZXMuc2xpY2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVGhlbWVzKHRoZW1lczogQ3VzdG9tVGhlbWVPcHRpb25zW10pOiBDdXN0b21UaGVtZU9wdGlvbnNbXSB7XG5cdGNvbnN0IGN1c3RvbVRoZW1lczogQ3VzdG9tVGhlbWVPcHRpb25zW10gPSBbXTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheSh0aGVtZXMpKSB7XG5cdFx0Y29uc3QgcHJlZmVycmVkQ29sb3JTY2hlbWUgPSBnZXRTeXN0ZW1QcmVmZXJyZWRDb2xvclNjaGVtZSgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGVtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHRoZW1lVG9WYWxpZGF0ZSA9IHRoZW1lc1tpXTtcblx0XHRcdGNvbnN0IHBhbGV0dGUgPSB2YWxpZGF0ZVBhbGV0dGUodGhlbWVUb1ZhbGlkYXRlLnBhbGV0dGUsIHRoZW1lVG9WYWxpZGF0ZS5sYWJlbCk7XG5cdFx0XHRpZiAocGFsZXR0ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHR0aGVtZVRvVmFsaWRhdGUucGFsZXR0ZSA9IHBhbGV0dGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBkb24ndCBwYXNzIGFuIGVtcHR5IG9iamVjdCBhcyB0aGVyZSBhcmUgbm8gdGhlbWUgcHJvcGVydGllc1xuXHRcdFx0XHR0aGVtZVRvVmFsaWRhdGUucGFsZXR0ZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICh0aGVtZVRvVmFsaWRhdGUubGFiZWwudG9Mb3dlckNhc2UoKSA9PT0gcHJlZmVycmVkQ29sb3JTY2hlbWUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFx0YEZvdW5kIGEgdGhlbWUgdGhhdCBtYXRjaGVzIHN5c3RlbSBjb2xvciBzY2hlbWUgcHJlZmVyZW5jZXMgYW5kIG1ha2luZyBpdCB0aGUgZGVmYXVsdCB0aGVtZTogJHtwcmVmZXJyZWRDb2xvclNjaGVtZX1gXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGN1c3RvbVRoZW1lcy51bnNoaWZ0KHRoZW1lVG9WYWxpZGF0ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdXN0b21UaGVtZXMucHVzaCh0aGVtZVRvVmFsaWRhdGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXN0b21UaGVtZXM7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGFsZXR0ZShcblx0dGhlbWVQYWxldHRlOiBDdXN0b21QYWxldHRlU2V0IHwgdW5kZWZpbmVkLFxuXHR0aGVtZUxhYmVsOiBzdHJpbmdcbik6IEN1c3RvbVBhbGV0dGVTZXQgfCBudWxsIHtcblx0aWYgKCF0aGVtZVBhbGV0dGUpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGVtZVBhbGV0dGUpO1xuXHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHBhbGV0dGU6IEN1c3RvbVBhbGV0dGVTZXQgPSB7XG5cdFx0Li4uREVGQVVMVF9QQUxFVFRFUy5kYXJrXG5cdH07XG5cblx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdGlmIChcblx0XHRcdHRoZW1lUGFsZXR0ZVtrZXldICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdHRoZW1lUGFsZXR0ZVtrZXldICE9PSBudWxsICYmXG5cdFx0XHR0aGVtZVBhbGV0dGVba2V5XS50cmltKCkubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0cGFsZXR0ZVtrZXldID0gdGhlbWVQYWxldHRlW2tleV07XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYnJhbmRQcmltYXJ5S2V5ID0gXCJicmFuZFByaW1hcnlcIjtcblx0Y29uc3QgYnJhbmRTZWNvbmRhcnlLZXkgPSBcImJyYW5kU2Vjb25kYXJ5XCI7XG5cdGNvbnN0IGJhY2tncm91bmRQcmltYXJ5S2V5ID0gXCJiYWNrZ3JvdW5kUHJpbWFyeVwiO1xuXG5cdGlmICghdGhlbWVQYWxldHRlW2JyYW5kUHJpbWFyeUtleV0pIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgVGhlbWU6ICR7dGhlbWVMYWJlbH0gOiAke2JyYW5kUHJpbWFyeUtleX0gbm90IHNwZWNpZmllZCAoaXQgaXMgcmVxdWlyZWQgaWYgc3BlY2lmeWluZyBvdGhlciB0aGVtZSBwYWxldHRlIHNldHRpbmdzKS4gUHJvdmlkaW5nIGRlZmF1bHQgb2Y6ICR7REVGQVVMVF9QQUxFVFRFUy5kYXJrLmJyYW5kUHJpbWFyeX1gXG5cdFx0KTtcblx0fVxuXG5cdGlmICghdGhlbWVQYWxldHRlW2JyYW5kU2Vjb25kYXJ5S2V5XSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdGBUaGVtZTogJHt0aGVtZUxhYmVsfSA6ICR7YnJhbmRTZWNvbmRhcnlLZXl9IG5vdCBzcGVjaWZpZWQgKGl0IGlzIHJlcXVpcmVkIGlmIHNwZWNpZnlpbmcgb3RoZXIgdGhlbWUgcGFsZXR0ZSBzZXR0aW5ncykuIFByb3ZpZGluZyBkZWZhdWx0IG9mOiAke0RFRkFVTFRfUEFMRVRURVMuZGFyay5icmFuZFNlY29uZGFyeX1gXG5cdFx0KTtcblx0fVxuXG5cdGlmICghdGhlbWVQYWxldHRlW2JhY2tncm91bmRQcmltYXJ5S2V5XSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdGBUaGVtZTogJHt0aGVtZUxhYmVsfSA6ICR7YmFja2dyb3VuZFByaW1hcnlLZXl9IG5vdCBzcGVjaWZpZWQgKGl0IGlzIHJlcXVpcmVkIGlmIHNwZWNpZnlpbmcgb3RoZXIgdGhlbWUgcGFsZXR0ZSBzZXR0aW5ncykuIFByb3ZpZGluZyBkZWZhdWx0IG9mOiAke0RFRkFVTFRfUEFMRVRURVMuZGFyay5icmFuZFByaW1hcnl9YFxuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gcGFsZXR0ZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsImltcG9ydCB7IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==