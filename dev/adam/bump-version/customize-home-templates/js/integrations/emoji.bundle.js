/******/ var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/workspace/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/@openfin/workspace/index.js ***!
  \******************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={703:(e,t,n)=>{n.r(t),n.d(t,{CLIAction:()=>l.Pt,CLIFilterOptionType:()=>l.el,CLITemplate:()=>l.yW,deregister:()=>et,hide:()=>nt,register:()=>Ye,show:()=>tt});var o={};n.r(o),n.d(o,{subscribe:()=>ae});var r={};n.r(r),n.d(r,{create:()=>He});var i=n(678),s=n(532),a=n(436);const c="home";var d;!function(e){e.Commands="home-commands"}(d||(d={}));var u,p=n(806),l=(n(298),n(758));n(114),n(109),n(427);!function(e){e[e.Initial=0]="Initial",e[e.Open=1]="Open",e[e.Close=2]="Close"}(u||(u={}));var f=n(316);const w="all",g="0",h="5",y="6",v=()=>{};function m(e,t){return e?`${e}-${t}`:t}function S(e){return`__search-${e}-topic__`}const P=new Map;function C(e,t){P.has(e)||P.set(e,new Set),P.get(e).add(t)}function k(e,t){const n=P.get(e);n&&n.delete(t)}const W=new Map;function R(e,t){W.has(e)||W.set(e,new Set),W.get(e).add(t)}function T(e,t){const n=W.get(e);n&&n.delete(t)}const I=new Map;async function b(e,t){I.has(e)||I.set(e,new Map),I.get(e).set(t.id,t);const n=P.get(e);if(!n)return;const o=[...n].map((e=>e()));await Promise.all(o)}async function D(e,t){const n=I.get(e);if(!n)return;n.delete(t);const o=W.get(e);if(!o)return;const r=[...o].map((e=>e()));await Promise.all(r)}function B(e){return I.get(e)?[...I.get(e).values()]:[]}function F(e){const t=I.get(e);t&&t.clear()}function L(e,t){const n=I.get(e);return n?n.get(t):null}function A(e,t,n){return{...e,action:n||{...e.actions[0],trigger:f.px.UserAction},dispatcherIdentity:t}}function O(e,t,n="ascending"){const o=e||[];if(!t?.length)return o;const r=[],i=new Map;t.forEach((e=>{if(e.key)return i.set(e.key,e);r.push(e)}));let s=o.map((e=>{const{key:t}=e;if(t&&i.has(t)){const e=i.get(t);return i.delete(t),e}return e}));return s.push(...i.values(),...r),s="ascending"===n?s.sort(((e,t)=>(null!==e.score&&void 0!==e.score?e.score:1/0)-(null!==t.score&&void 0!==t.score?t.score:1/0))):s.sort(((e,t)=>(null!==t.score&&void 0!==t.score?t.score:1/0)-(null!==e.score&&void 0!==e.score?e.score:1/0))),s}function x(e){const t={};let n=[];let o=[];let r=u.Initial;t.getStatus=()=>r,t.getResultBuffer=()=>n,t.setResultBuffer=e=>{n=e,n?.length&&t.onChange()},t.getRevokedBuffer=()=>o,t.setRevokedBuffer=e=>{o=e,o?.length&&t.onChange()},t.onChange=v;const i={};return t.res=i,i.close=()=>{r!==u.Close&&(r=u.Close,t.onChange())},i.open=()=>{r!==u.Open&&(r=u.Open,t.onChange())},i.respond=n=>{const o=O(t.getResultBuffer(),n,e);t.setResultBuffer(o)},i.revoke=(...e)=>{const n=new Set(e),o=t.getResultBuffer().filter((({key:e})=>{const t=n.has(e);return t&&n.delete(e),!t}));t.setResultBuffer(o),n.size&&(t.getRevokedBuffer().forEach((e=>n.add(e))),t.setRevokedBuffer([...n]))},t}function E(e,t,n){const o=new Set;let r=!1;return{close:()=>{r=!0;for(const e of o)e()},req:{id:t,topic:e,...n,context:n?.context||{},onClose:e=>{o.add(e),r&&e()},removeListener:e=>{o.delete(e)}}}}function V(){return{name:fin.me.name,uuid:fin.me.uuid}}function M(){let e;try{const t=fin.Platform.getCurrentSync();if(!t?.identity)return;e=t.identity.uuid}catch(e){}return e}const _="deregistered or does not exist",$=new Error(`provider ${_}`),q=new Error("provider with name already exists"),G=new Error("bad payload"),H=new Error("subscription rejected"),N=new Error(`channel ${_}`),U=new Map;function j(e){const t=X(e);if(t)return t;throw N}function X(e){const t=U.get(e);if(t)return t}function K(e,t){U.set(e,t)}const J=new Map;function z(e){J.has(e)||J.set(e,new Map);const t=J.get(e);return{getRequestsForIdentity:e=>{const n=function(e){return`${e.uuid}:${e.name}`}(e);return t.has(n)||t.set(n,new Map),t.get(n)}}}async function Z(e,t){return(await j(e)).dispatch(g,t)}function Q({namespacedTopic:e,topic:t}){const n=L.bind(null,e),o=z(e),r=Z.bind(null,e);return async(e,i)=>{if(!e||!e.id||!e.providerId){const e=G;return{error:e.message}}const{id:s,providerId:a}=e,c=n(a);if(!c){const e=$;return{error:e.message}}const d=o.getRequestsForIdentity(i);let u=d.get(e.id);u||(u=E(t,s,e),d.set(e.id,u));const p=x(),l=()=>{const e=p.getResultBuffer();p.setResultBuffer([]);const t=p.getRevokedBuffer();p.setRevokedBuffer([]);const n=p.getStatus();r({id:s,providerId:a,results:e,revoked:t,status:n})};let f=!0,w=!1;p.onChange=()=>{if(f)return f=!1,void l();w||(w=!0,setTimeout((()=>{w=!1,l()}),100))};try{const{results:e,context:t}=await c.onUserInput(u.req,p.res),n=p.getStatus();return{id:s,providerId:a,status:n,results:e,context:t}}catch(e){return{id:s,providerId:a,error:e.message}}}}async function Y(e,t,n){const o=n||await j(e),r=V(),i={identity:r,...t,onUserInput:void 0,onResultDispatch:void 0},s=await o.dispatch("2",i);return await b(e,{identity:r,...t}),s}async function ee(e,t){const n=await j(e);return await n.dispatch("3",t),D(e,t)}async function te(e,t,n,o){const r=A(n,V(),o),i=L(e,t);if(i){const{onResultDispatch:e}=i;if(!e)return;return e(r)}const s={providerId:t,result:r};return(await j(e)).dispatch(h,s)}async function ne(e,t){const n={...t,context:t?.context||{}},o={},r=async function*(e,t,{setState:n}){const o=await j(e);for(;;){const e=await o.dispatch("1",t),r=e.error;if(r)throw new Error(r);const i=e;if(t.id=i.id,n(i.state),i.done)return i.value;yield i.value}}(e,n,{setState:e=>{o.state=e}});let i=await r.next();return o.id=n.id,o.close=()=>{!async function(e,t){(await j(e)).dispatch(y,{id:t})}(e,o.id)},o.next=()=>{if(i){const e=i;return i=void 0,e}return r.next()},o}async function oe(e){return(await j(e)).dispatch("4",null)}async function re(e){const t=await j(e);var n;n=e,U.delete(n),F(e),await t.disconnect()}function ie(e){const{namespacedTopic:t}=e,n=z(t);return async o=>{if(!X(t))return;const r=n.getRequestsForIdentity(o);for(const{req:e,close:t}of r.values())t(),r.delete(e.id);K(t,(async e=>{const{namespacedTopic:t}=e,n=await se(e);for(const e of B(t))await Y(t,e,n);return n})(e))}}async function se(e){const{namespacedTopic:t}=e,n=S(t),o=await async function(e){for(let t=0;t<50;t++)try{return await fin.InterApplicationBus.Channel.connect(e,{wait:!1})}catch(e){if(49===t)throw e;await new Promise((e=>setTimeout(e,1e3)))}}(n);return o.register(g,Q(e)),o.register(y,function(e){const t=z(e);return(e,n)=>{const o=t.getRequestsForIdentity(n),r=o.get(e.id);r&&(r.close(),o.delete(e.id))}}(t)),o.register(h,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const o=L(e,t.providerId);if(!o)return;const{onResultDispatch:r}=o;return r?(t.result.dispatcherIdentity=n,r(t.result)):void 0}}(t)),o.onDisconnection(ie(e)),o}async function ae(e){const t=("string"==typeof e?e:e?.topic)||w,n=("string"==typeof e?null:e?.uuid)||M(),o=m(n,t),r={topic:t,namespace:n,namespacedTopic:o};let i=X(o);return i||(i=se(r),K(o,i),await i),{getAllProviders:oe.bind(null,o),register:Y.bind(null,o),search:ne.bind(null,o),deregister:ee.bind(null,o),dispatch:te.bind(null,o),disconnect:re.bind(null,o)}}const ce=new Map;function de(e){const t=ue(e);if(t)return t;throw N}function ue(e){const t=ce.get(e);if(t)return t}const pe=new Map;function le(e,t){pe.has(e)||pe.set(e,new Set),pe.get(e).add(t)}function fe(e,t){const n=pe.get(e);n&&n.delete(t)}function we(e){return[...B(e)].map((e=>({...e,onUserInput:void 0,onResultDispatch:void 0})))}async function ge(e,t){if(L(e,t.id))throw new Error("provider with name already exists");const n=V();await b(e,{identity:n,...t})}function he(e,t){D(e,t)}async function ye(e,t,n,o){const r=L(e,t);if(!r)throw $;const{onResultDispatch:i}=r;if(!i)return;return i(A(n,V(),o))}async function*ve(e,t,n){const o=function(e,t){const n=[],o=[],r=[],i=[];for(const s of e){const e=x(s.scoreOrder),a={results:[],provider:{id:s.id,identity:s.identity,title:s.title,scoreOrder:s.scoreOrder,icon:s.icon,dispatchFocusEvents:s.dispatchFocusEvents}};n.push(a),o.push(e);const c=(async()=>{try{const{results:n,context:o}=await s.onUserInput(t,e.res);a.results=O(a.results,n),a.context={...a.context,...o}}catch(e){a.error=e}})();c.finally((()=>{c.done=!0})),i.push(c),r.push(r.length)}return{providerResponses:n,listenerResponses:o,openListenerResponses:r,initialResponsePromises:i}}(t.targets?t.targets.map((t=>L(e,t))).filter((e=>!!e)):[...B(e).filter((e=>!e.hidden))],t),{providerResponses:r,listenerResponses:i}=o;let{openListenerResponses:s,initialResponsePromises:a}=o,c=f.De.Fetching;const d=e=>{c=e,n.setState(c)};let p,l=!1;t.onClose((()=>{l=!0,p&&p()}));do{let e=!1;if(a.length){const t=[];for(const n of a)n.done?e=!0:t.push(n);a=t,a.length||(d(f.De.Fetched),e=!0)}let t,n=!1;const o=()=>{n=!0,t&&t()},w=[];for(const t of s){const n=i[t],s=r[t],a=n.getStatus();(a===u.Open||c===f.De.Fetching&&a===u.Initial)&&(w.push(t),n.onChange=o);const d=n.getResultBuffer();d.length&&(n.setResultBuffer([]),s.results=O(s.results,d),e=!0);const p=n.getRevokedBuffer();if(p.length){n.setRevokedBuffer([]);const t=new Set(p);s.results=s.results.filter((({key:e})=>!t.has(e))),e=!0}}if(s=w,e&&(yield r),l)break;n||(s.length||a.length)&&await Promise.race([...a,new Promise((e=>{t=e})),new Promise((e=>{p=e}))])}while(s.length||a.length);return d(f.De.Complete),r}let me=0;function Se({namespacedTopic:e,topic:t},n){me+=1;const o=E(t,me.toString(),n),r=ve(e,o.req,{setState:e=>{r.state=e}});return r.id=me.toString(),r.close=o.close,r.state=f.De.Fetching,r}const Pe=new Map;function Ce(e,t){return`${e}:${t}`}function ke(e){return async(t,...n)=>{if(!t)return{error:G.message};let o;if(t.id)o=Ce(e.namespacedTopic,t.id);else{const n=Se(e,t);o=Ce(e.namespacedTopic,n.id),t.id=n.id,Pe.set(o,{generator:n})}const r=Pe.get(o);clearTimeout(r.timeout);const i=await r.generator.next();return r.timeout=function(e){return window.setTimeout((()=>{Pe.delete(e)}),1e4)}(o),{...i,id:t.id,state:r.generator.state}}}function We(e,t,n){return de(e).dispatch(t,y,{id:n})}function Re(e){return t=>function(e,t){const n=Ce(e,t),o=Pe.get(n);o&&o.generator.close()}(e,t.id)}async function Te(e,t,{id:n,query:o,context:r,targets:i}){const s=de(e),a={id:n,query:o,context:r,targets:i,providerId:t.id},c=await s.dispatch(t.identity,g,a),d=c.error;if(d)throw new Error(d);return c}const Ie=new Map;function be(e,t,n){return`${e}:${t.name}:${t.uuid}:${n}`}const De=new Map;function Be(e,t,n){return`${e}:${t}:${n}`}function Fe(e,t){const n=be.bind(null,e,t.identity),o=We.bind(null,e,t.identity),r=Te.bind(null,e,t);return async(i,s)=>{const a=n(i.id);if(!Ie.has(a)){const e=()=>{o(i.id),Ie.delete(a)};Ie.set(a,e),i.onClose(e)}const c=Be(e,t.id,i.id),d=()=>{De.delete(c),s.close()};i.onClose(d),De.set(c,(e=>{e.results?.length&&s.respond(e.results),e.revoked?.length&&s.revoke(...e.revoked),e.status===u.Open&&s.open(),e.status===u.Close&&d()}));const p=await r(i);return p.status===u.Open&&s.open(),p.status!==u.Close&&p.status!==u.Initial||d(),p}}function Le(e,t){return async n=>{const o=de(e),r={providerId:t.id,result:n};return o.dispatch(t.identity,h,r)}}const Ae=new Map;function Oe(e,t){return`${e}-${t.name}-${t.uuid}`}function xe(e){return async(t,n)=>{if(!t||!t.id)return void new Error(JSON.stringify(t));if(L(e,t.id))throw q;return t.identity=n,await async function(e,t){const n=Oe(e,t.identity);Ae.has(n)||Ae.set(n,[]),Ae.get(n).push(t.id),await b(e,{...t,onUserInput:Fe(e,t),onResultDispatch:Le(e,t)})}(e,t),{workspaceVersion:i.u0,clientAPIVersion:t.clientAPIVersion}}}function Ee(e){return t=>{t&&function(e,t){const n=L(e,t);if(!n)return;const o=Oe(e,n.identity),r=Ae.get(o);if(r){const n=r.findIndex((e=>e===t));-1!==n&&(r.splice(n,1),D(e,t))}}(e,t)}}const Ve=new Map;function Me(e,t){Ve.has(e)||Ve.set(e,new Set),Ve.get(e).add(t)}function _e(e,t){const n=Ve.get(e);n&&n.delete(t)}function $e(e){return async t=>{!function(e,t){const n=Oe(e,t),o=Ae.get(n);if(o){for(const t of o)D(e,t);Ae.delete(n)}}(e,t);const n=Ve.get(e);n&&n.forEach((e=>e(t)))}}async function qe(e){const{namespacedTopic:t}=e,n=S(e.namespacedTopic),o=await(r=n,fin.InterApplicationBus.Channel.create(r));var r;return o.onConnection(function({namespacedTopic:e}){return async t=>{const n=pe.get(e);if(n)for(const e of n)if(!await e(t))throw H}}(e)),o.onDisconnection($e(t)),o.register(y,Re(t)),o.register(g,function(e){return t=>{const n=Be(e,t.providerId,t.id),o=De.get(n);o&&o(t)}}(t)),o.register("2",xe(t)),o.register("3",Ee(t)),o.register("4",function(e){return async()=>we(e)}(t)),o.register("1",ke(e)),o.register(h,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const o=L(e,t.providerId);if(!o)throw $;const{onResultDispatch:r}=o;return r?(t.result.dispatcherIdentity=n,r(t.result)):void 0}}(t)),o}async function Ge(e){const t=de(e);var n;n=e,ce.delete(n),await t.destroy(),F(e)}async function He(e){const t=("string"==typeof e?e:e?.topic)||w,n=M(),o=m(n,t),r={topic:t,namespace:n,namespacedTopic:o};let i=ue(o);i||(i=await qe(r),function(e,t){ce.set(e,t)}(o,i));const s=fe.bind(null,o),a=_e.bind(null,o),c=k.bind(null,o),d=T.bind(null,o);return{getAllProviders:we.bind(null,o),search:Se.bind(null,r),register:ge.bind(null,o),deregister:he.bind(null,o),onSubscription:le.bind(null,o),onDisconnect:Me.bind(null,o),onRegister:C.bind(null,o),onDeregister:R.bind(null,o),dispatch:ye.bind(null,r),disconnect:Ge.bind(null,o),removeListener:e=>{s(e),a(e),c(e),d(e)}}}const{create:Ne}=r,{subscribe:Ue}=o,je={create:Ne,subscribe:Ue,defaultTopic:"all"},Xe=()=>{window.search=je},Ke=e=>{const t=()=>{Xe(),window.removeEventListener(e,t)};return t};if("undefined"!=typeof window){Xe();const e="load",t=Ke(e);window.addEventListener(e,t);const n="DOMContentLoaded",o=Ke(n);window.addEventListener(n,o)}const Je=new Map;async function ze(){await async function(e){Je.set(e,await Ue({topic:e,uuid:p.q9.Workspace}))}(c)}let Ze;async function Qe(e){return await async function(){return Ze||(Ze=ze()),Ze}(),Je.get(e)}const Ye=async e=>{if(!e.icon)throw new Error(`${e.id} provider needs to have icon property defined.`);await(0,a.aB)();const t=await Qe(c);try{e.clientAPIVersion=i.u0;const n=await t.register(e);return(0,s.ck)({allowed:!0,componentVersion:n?.workspaceVersion}),n}catch(e){throw(0,s.ck)({allowed:!1,rejectionCode:e.message}),e}},et=async e=>{await(0,a.aB)();return(await Qe(c)).deregister(e)};async function tt(){return(await(0,a.Xl)()).dispatch(a.WF.ShowHome,void 0)}async function nt(){return(await(0,a.Xl)()).dispatch(a.WF.HideHome,void 0)}},298:(e,t,n)=>{n.d(t,{p:()=>o.px,w:()=>o.wt});var o=n(316)},427:(e,t,n)=>{var o;n.d(t,{v:()=>o}),function(e){e.ActionButton="ActionButton",e.DropdownButton="DropdownButton"}(o||(o={}))},758:(e,t,n)=>{var o,r,i;n.d(t,{Pt:()=>o,el:()=>i,yW:()=>r}),function(e){e.Suggestion="suggestion"}(o||(o={})),function(e){e.Contact="Contact",e.Custom="Custom",e.List="List",e.Plain="Plain",e.SimpleText="SimpleText",e.Loading="Loading",e.Error="Error"}(r||(r={})),function(e){e.MultiSelect="MultiSelect"}(i||(i={}))},114:(e,t,n)=>{var o,r;n.d(t,{L:()=>o,T:()=>r}),function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(o||(o={})),function(e){e.LandingPage="landingPage",e.AppGrid="appGrid"}(r||(r={}))},109:(e,t,n)=>{n.d(t,{Go:()=>r,ZJ:()=>s,bI:()=>i,p6:()=>o});const o={Container:"Container",Button:"Button"},r={Text:"Text",Image:"Image",List:"List"},i={...o,...r};var s;!function(e){e.Primary="primary",e.Secondary="secondary",e.TextOnly="textOnly"}(s||(s={}))},528:(e,t,n)=>{n.r(t),n.d(t,{AppManifestType:()=>s.L,StorefrontTemplate:()=>s.T,deregister:()=>g,hide:()=>h,register:()=>w,show:()=>y});var o=n(532),r=n(436),i=n(82),s=n(114),a=n(678);let c,d=!1;async function u(e,t,n){const o=await(0,r.Dm)();try{return await o.dispatch(e.action,e.payload)}catch(r){if(-1!==r.toString().indexOf(e.action))return d=!0,await o.dispatch(t.action,t.payload),n;throw r}}const p=new Map,l=e=>{if(!p.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return p.get(e)},f=async e=>{const t=await(0,r.Xl)();if(p.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return p.set(e.id,e),(e=>{e.isStorefrontActionsRegistered||(e.isStorefrontActionsRegistered=!0,e.register(r.WF.GetStorefrontProviderApps,(e=>l(e).getApps())),e.register(r.WF.GetStorefrontProviderFooter,(e=>l(e).getFooter())),e.register(r.WF.GetStorefrontProviderLandingPage,(e=>l(e).getLandingPage())),e.register(r.WF.GetStorefrontProviderNavigation,(e=>l(e).getNavigation())),e.register(r.WF.LaunchStorefrontProviderApp,(({id:e,app:t})=>l(e).launchApp(t))))})(t),e.clientAPIVersion=a.u0,u({action:r.WF.RegisterProvider,payload:{providerType:i.lP.Storefront,info:e}},{action:r.WF.RegisterStorefrontProvider,payload:e},{workspaceVersion:"unknown"})},w=e=>(c=new Promise((async(t,n)=>{try{const n=await f(e);(0,o.d9)({allowed:!0,componentVersion:n?.workspaceVersion}),t({clientAPIVersion:a.u0,workspaceVersion:n.workspaceVersion||""})}catch(e){(0,o.d9)({allowed:!1,rejectionCode:e.message}),n(e)}})),c),g=async e=>(await c,p.delete(e),await(0,r.aB)(),u({action:r.WF.DeregisterProvider,payload:{providerType:i.lP.Storefront,id:e}},{action:r.WF.DeregisterStorefrontProvider,payload:e})),h=async()=>(await c,await(0,r.aB)(),u({action:r.WF.HideProviderWindow,payload:{providerType:i.lP.Storefront}},{action:r.WF.HideStorefront})),y=async()=>(await c,await(0,r.aB)(),u({action:r.WF.ShowProviderWindow,payload:{providerType:i.lP.Storefront}},{action:r.WF.ShowStorefront}))},436:(e,t,n)=>{n.d(t,{WF:()=>s,Dm:()=>a,Xl:()=>p,aB:()=>u});var o=n(678);const r=o.Ax&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));var i=n(121);var s;!function(e){e.RegisterProvider="register-provider",e.DeregisterProvider="deregister-provider",e.CreateProviderWindow="create-provider-window",e.GetProviders="get-providers",e.ShowProviderWindow="show-provider-window",e.HideProviderWindow="hide-provider-window",e.GetStorefrontProviderApps="get-storefront-provider-apps",e.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",e.GetStorefrontProviderFooter="get-storefront-provider-footer",e.GetStorefrontProviderNavigation="get-storefront-provider-navigation",e.LaunchStorefrontProviderApp="launch-storefront-provider-app",e.ShowHome="show-home",e.HideHome="hide-home",e.AssignHomeSearchContext="assign-home-search-context",e.GetLegacyPages="get-legacy-pages",e.GetLegacyWorkspaces="get-legacy-workspaces",e.GetComputedPlatformTheme="get-computed-platform-theme",e.RegisterStorefrontProvider="register-storefront-provider",e.DeregisterStorefrontProvider="deregister-storefront-provider",e.HideStorefront="hide-storefront",e.ShowStorefront="show-storefront"}(s||(s={}));const a=function(e){let t;return()=>{if(!o.sS)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return t||(t=(async()=>{await r;const n={clientAPIVersion:o.u0},i=await fin.InterApplicationBus.Channel.connect(e,{payload:n});return i.onDisconnection((async()=>{t=void 0})),i})().then((e=>e)).catch((n=>{throw t=void 0,new Error(`failed to connect to channel provider ${e}: ${n}`)}))),t}}("__of_workspace_protocol__"),c="isLaunchedViaLib",d=e=>{const t=new URL(e);return t.searchParams.append(c,"true"),t.toString()},u=async()=>{if(!await(0,i.JV)(i.iW))return(o.ZK||-1===navigator.userAgent.indexOf("Win"))&&await fin.Application.startFromManifest(d(o.aW)),fin.System.openUrlWithBrowser(d(o.GX))},p=async()=>(await u(),a())},82:(e,t,n)=>{n.d(t,{R8:()=>s,X_:()=>i,lP:()=>o});var o,r=n(436);!function(e){e.Storefront="storefront",e.Dock="dock"}(o||(o={}));const i=async e=>(await(0,r.Dm)()).dispatch(r.WF.ShowProviderWindow,{providerType:e}),s=async e=>(await(0,r.Dm)()).dispatch(r.WF.HideProviderWindow,{providerType:e})},806:(e,t,n)=>{n.d(t,{q9:()=>o});var o,r,i,s=n(678);!function(e){e.Workspace="openfin-browser"}(o||(o={})),function(e){e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(r||(r={})),function(e){e.FinProtocol="fin-protocol"}(i||(i={}));s.AB,o.Workspace},678:(e,t,n)=>{var o;n.d(t,{AB:()=>a,Ax:()=>i,GX:()=>u,ZK:()=>d,aW:()=>p,oC:()=>c,sS:()=>r,u0:()=>f}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(o||(o={}));const r="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||process.env?.JEST_WORKER_ID,"undefined"!=typeof window),s=i?window.origin:o.Local,a=r&&fin.me.uuid,c=r&&fin.me.name,d=(r&&fin.me.entityType,"prod"===o.Local),u=(o.Dev,o.Staging,o.Prod,"fins://system-apps/workspace"),p="https://cdn.openfin.co/workspace/9.0.13/app.json",l=e=>e.startsWith("http://")||e.startsWith("https://")?e:s+e,f=(l("https://cdn.openfin.co/workspace/9.0.13"),l("https://cdn.openfin.co/workspace/9.0.13"),"undefined"!=typeof WORKSPACE_DOCS_PLATFORM_URL&&l(WORKSPACE_DOCS_PLATFORM_URL),"undefined"!=typeof WORKSPACE_DOCS_CLIENT_URL&&l(WORKSPACE_DOCS_CLIENT_URL),"9.0.13")},532:(e,t,n)=>{n.d(t,{Wn:()=>d,ck:()=>a,d9:()=>c});var o,r=n(678),i=n(121);!function(e){e.Browser="Browser",e.Dock="Dock",e.Home="Home",e.Notification="Notification",e.Storefront="Storefront",e.Platform="Platform",e.Theming="Theming"}(o||(o={}));const s=async(e,t)=>{const n={apiVersion:t.apiVersion||r.u0,componentName:e,componentVersion:t.componentVersion||r.u0,allowed:t.allowed,rejectionCode:t.rejectionCode};fin.System.registerUsage({type:"workspace-licensing",data:n})},a=async e=>{i.OI.uuid===i.Gi.uuid&&i.OI.name===i.Gi.name||s(o.Home,e)},c=async e=>{s(o.Storefront,e)},d=async e=>{s(o.Dock,e)}},121:(e,t,n)=>{n.d(t,{Gi:()=>d,JV:()=>l,OI:()=>u,iW:()=>p});var o,r,i,s=n(806),a=n(678);!function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window"}(o||(o={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.Closed="closed",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached",e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.OptionsChanged="options-changed"}(r||(r={})),function(e){e.BeforeUnload="beforeunload"}(i||(i={}));function c(e){if(!a.sS)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}const d={name:a.oC,uuid:a.AB};const u={name:o.Home,uuid:s.q9.Workspace},p=(o.Dock,s.q9.Workspace,o.Storefront,s.q9.Workspace,{name:s.q9.Workspace,uuid:s.q9.Workspace});const l=e=>c(e).getOptions().then((()=>!0)).catch((()=>!1))},316:(e,t,n)=>{var o,r,i;n.d(t,{De:()=>o,px:()=>r,wt:()=>i}),function(e){e.Fetching="fetching",e.Fetched="fetched",e.Complete="complete"}(o||(o={})),function(e){e.UserAction="user-action",e.FocusChange="focus-change",e.Reload="reload"}(r||(r={})),function(e){e.Active="active",e.Default="default"}(i||(i={}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{n.r(o),n.d(o,{ActionTrigger:()=>P.p,AppManifestType:()=>W.L,ButtonStyle:()=>C.ZJ,CLIAction:()=>k.Pt,CLIFilterOptionType:()=>k.el,CLITemplate:()=>k.yW,ContainerTemplateFragmentNames:()=>C.p6,Dock:()=>e,DockButtonNames:()=>c.v,Home:()=>h,Legacy:()=>t,PresentationTemplateFragmentNames:()=>C.Go,SearchTagBackground:()=>P.w,Storefront:()=>S,StorefrontTemplate:()=>W.T,TemplateFragmentTypes:()=>C.bI});var e={};n.r(e),n.d(e,{DockButtonNames:()=>c.v,deregister:()=>l,minimize:()=>f,register:()=>p,show:()=>w});var t={};n.r(t),n.d(t,{getPages:()=>v,getWorkspaces:()=>m});var r=n(678),i=n(532),s=n(436),a=n(82),c=n(427);let d,u=!1;const p=e=>(d=new Promise((async(t,n)=>{try{const n=await(async e=>{const t=await(0,s.Xl)();if(u)throw new Error("A dock provider for the platform is already registered.");return u=!0,e.clientAPIVersion=r.u0,t.dispatch(s.WF.RegisterProvider,{providerType:a.lP.Dock,info:e})})(e);(0,i.Wn)({allowed:!0,componentVersion:n?.workspaceVersion}),t({clientAPIVersion:r.u0,workspaceVersion:n.workspaceVersion||""})}catch(e){(0,i.Wn)({allowed:!1,rejectionCode:e.message}),n(e),d=null}})),d),l=async()=>{await d,u=!1;return(await(0,s.Xl)()).dispatch(s.WF.DeregisterProvider,{providerType:a.lP.Dock})},f=async()=>{await d,await(0,s.aB)(),await(0,a.R8)(a.lP.Dock)},w=async()=>{await d,await(0,s.aB)(),await(0,a.X_)(a.lP.Dock)};var g,h=n(703);n(121);!function(e){e.TabCreated="tab-created",e.ContainerCreated="container-created",e.ContainerResized="container-resized"}(g||(g={}));new Map;var y;!function(e){e.CurrentWorkspaceId="currentWorkspaceId",e.LastFocusedBrowserWindow="lastFocusedBrowserWindow",e.MachineName="machineName",e.NewTabPageLayout="NewTabPageLayout",e.NewTabPageSort="NewTabPageSort",e.DockPosition="DockPosition"}(y||(y={}));const v=()=>async function(){return(await(0,s.Dm)()).dispatch(s.WF.GetLegacyPages,void 0)}(),m=()=>(async()=>(await(0,s.Dm)()).dispatch(s.WF.GetLegacyWorkspaces,void 0))();var S=n(528),P=n(298),C=n(109),k=n(758),W=n(114)})(),module.exports=o})();
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
     * The module is being registered.
     * @param integrationManager The manager for the integration.
     * @param integration The integration details.
     * @returns Nothing.
     */
    async register(integrationManager, integration) {
        this._integrationManager = integrationManager;
    }
    /**
     * The module is being deregistered.
     * @param integration The integration details.
     * @returns Nothing.
     */
    async deregister(integration) { }
    /**
     * Get a list of the static help entries.
     * @param integration The integration details.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries(integration) {
        return [
            {
                key: `${EmojiIntegrationProvider._PROVIDER_ID}-help`,
                title: "/emoji",
                label: "Help",
                icon: integration.icon,
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
     * @param integration The integration details.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    async itemSelection(integration, result, lastResponse) {
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
                this._integrationManager.openUrl) {
                await this._integrationManager.openUrl(data.url);
                return true;
            }
        }
        return false;
    }
    /**
     * Get a list of search results based on the query and filters.
     * @param integration The integration details.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @returns The list of results and new filters.
     */
    async getSearchResults(integration, query, filters, lastResponse) {
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
            fontFamily: "monospace"
        }));
    }
    if (exampleFragments.length > 0) {
        fragments.push(await createContainer("column", exampleFragments, {
            padding: "10px",
            marginTop: "6px",
            backgroundColor: theme.palette.background5,
            color: theme.palette.inputColor,
            borderRadius: "5px"
        }));
    }
    return {
        layout: await createContainer("column", [await createTitle("title"), ...fragments], {
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
            color: theme.palette.brandPrimary,
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
/* harmony export */   "integration": () => (/* binding */ integration)
/* harmony export */ });
/* harmony import */ var _integration_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration-provider */ "./client/src/integrations/emoji/integration-provider.ts");

const integration = new _integration_provider__WEBPACK_IMPORTED_MODULE_0__.EmojiIntegrationProvider();

})();

var __webpack_exports__integration = __webpack_exports__.integration;
export { __webpack_exports__integration as integration };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBLEdBQUc7VUFDSDtVQUNBO1VBQ0EsQ0FBQzs7Ozs7VUNQRDs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7O1VDTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSmtFO0FBRTNELE1BQU0sV0FBVyxHQUFHLElBQUksMkVBQXdCLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3dvcmtzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0RhdGFWaWV3LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hc2NpaVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNVbmljb2RlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzTWFza2VkLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25vZGVVdGlsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpbmdUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdmFsdWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL25vZGUtZW1vamkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbm9kZS1lbW9qaS9saWIvZW1vamkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvaW50ZWdyYXRpb25zL2Vtb2ppL2ludGVncmF0aW9uLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS90ZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvdGVtcGxhdGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL3RoZW1lcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17NzAzOihlLHQsbik9PntuLnIodCksbi5kKHQse0NMSUFjdGlvbjooKT0+bC5QdCxDTElGaWx0ZXJPcHRpb25UeXBlOigpPT5sLmVsLENMSVRlbXBsYXRlOigpPT5sLnlXLGRlcmVnaXN0ZXI6KCk9PmV0LGhpZGU6KCk9Pm50LHJlZ2lzdGVyOigpPT5ZZSxzaG93OigpPT50dH0pO3ZhciBvPXt9O24ucihvKSxuLmQobyx7c3Vic2NyaWJlOigpPT5hZX0pO3ZhciByPXt9O24ucihyKSxuLmQocix7Y3JlYXRlOigpPT5IZX0pO3ZhciBpPW4oNjc4KSxzPW4oNTMyKSxhPW4oNDM2KTtjb25zdCBjPVwiaG9tZVwiO3ZhciBkOyFmdW5jdGlvbihlKXtlLkNvbW1hbmRzPVwiaG9tZS1jb21tYW5kc1wifShkfHwoZD17fSkpO3ZhciB1LHA9big4MDYpLGw9KG4oMjk4KSxuKDc1OCkpO24oMTE0KSxuKDEwOSksbig0MjcpOyFmdW5jdGlvbihlKXtlW2UuSW5pdGlhbD0wXT1cIkluaXRpYWxcIixlW2UuT3Blbj0xXT1cIk9wZW5cIixlW2UuQ2xvc2U9Ml09XCJDbG9zZVwifSh1fHwodT17fSkpO3ZhciBmPW4oMzE2KTtjb25zdCB3PVwiYWxsXCIsZz1cIjBcIixoPVwiNVwiLHk9XCI2XCIsdj0oKT0+e307ZnVuY3Rpb24gbShlLHQpe3JldHVybiBlP2Ake2V9LSR7dH1gOnR9ZnVuY3Rpb24gUyhlKXtyZXR1cm5gX19zZWFyY2gtJHtlfS10b3BpY19fYH1jb25zdCBQPW5ldyBNYXA7ZnVuY3Rpb24gQyhlLHQpe1AuaGFzKGUpfHxQLnNldChlLG5ldyBTZXQpLFAuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBrKGUsdCl7Y29uc3Qgbj1QLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1jb25zdCBXPW5ldyBNYXA7ZnVuY3Rpb24gUihlLHQpe1cuaGFzKGUpfHxXLnNldChlLG5ldyBTZXQpLFcuZ2V0KGUpLmFkZCh0KX1mdW5jdGlvbiBUKGUsdCl7Y29uc3Qgbj1XLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1jb25zdCBJPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gYihlLHQpe0kuaGFzKGUpfHxJLnNldChlLG5ldyBNYXApLEkuZ2V0KGUpLnNldCh0LmlkLHQpO2NvbnN0IG49UC5nZXQoZSk7aWYoIW4pcmV0dXJuO2NvbnN0IG89Wy4uLm5dLm1hcCgoZT0+ZSgpKSk7YXdhaXQgUHJvbWlzZS5hbGwobyl9YXN5bmMgZnVuY3Rpb24gRChlLHQpe2NvbnN0IG49SS5nZXQoZSk7aWYoIW4pcmV0dXJuO24uZGVsZXRlKHQpO2NvbnN0IG89Vy5nZXQoZSk7aWYoIW8pcmV0dXJuO2NvbnN0IHI9Wy4uLm9dLm1hcCgoZT0+ZSgpKSk7YXdhaXQgUHJvbWlzZS5hbGwocil9ZnVuY3Rpb24gQihlKXtyZXR1cm4gSS5nZXQoZSk/Wy4uLkkuZ2V0KGUpLnZhbHVlcygpXTpbXX1mdW5jdGlvbiBGKGUpe2NvbnN0IHQ9SS5nZXQoZSk7dCYmdC5jbGVhcigpfWZ1bmN0aW9uIEwoZSx0KXtjb25zdCBuPUkuZ2V0KGUpO3JldHVybiBuP24uZ2V0KHQpOm51bGx9ZnVuY3Rpb24gQShlLHQsbil7cmV0dXJuey4uLmUsYWN0aW9uOm58fHsuLi5lLmFjdGlvbnNbMF0sdHJpZ2dlcjpmLnB4LlVzZXJBY3Rpb259LGRpc3BhdGNoZXJJZGVudGl0eTp0fX1mdW5jdGlvbiBPKGUsdCxuPVwiYXNjZW5kaW5nXCIpe2NvbnN0IG89ZXx8W107aWYoIXQ/Lmxlbmd0aClyZXR1cm4gbztjb25zdCByPVtdLGk9bmV3IE1hcDt0LmZvckVhY2goKGU9PntpZihlLmtleSlyZXR1cm4gaS5zZXQoZS5rZXksZSk7ci5wdXNoKGUpfSkpO2xldCBzPW8ubWFwKChlPT57Y29uc3R7a2V5OnR9PWU7aWYodCYmaS5oYXModCkpe2NvbnN0IGU9aS5nZXQodCk7cmV0dXJuIGkuZGVsZXRlKHQpLGV9cmV0dXJuIGV9KSk7cmV0dXJuIHMucHVzaCguLi5pLnZhbHVlcygpLC4uLnIpLHM9XCJhc2NlbmRpbmdcIj09PW4/cy5zb3J0KCgoZSx0KT0+KG51bGwhPT1lLnNjb3JlJiZ2b2lkIDAhPT1lLnNjb3JlP2Uuc2NvcmU6MS8wKS0obnVsbCE9PXQuc2NvcmUmJnZvaWQgMCE9PXQuc2NvcmU/dC5zY29yZToxLzApKSk6cy5zb3J0KCgoZSx0KT0+KG51bGwhPT10LnNjb3JlJiZ2b2lkIDAhPT10LnNjb3JlP3Quc2NvcmU6MS8wKS0obnVsbCE9PWUuc2NvcmUmJnZvaWQgMCE9PWUuc2NvcmU/ZS5zY29yZToxLzApKSksc31mdW5jdGlvbiB4KGUpe2NvbnN0IHQ9e307bGV0IG49W107bGV0IG89W107bGV0IHI9dS5Jbml0aWFsO3QuZ2V0U3RhdHVzPSgpPT5yLHQuZ2V0UmVzdWx0QnVmZmVyPSgpPT5uLHQuc2V0UmVzdWx0QnVmZmVyPWU9PntuPWUsbj8ubGVuZ3RoJiZ0Lm9uQ2hhbmdlKCl9LHQuZ2V0UmV2b2tlZEJ1ZmZlcj0oKT0+byx0LnNldFJldm9rZWRCdWZmZXI9ZT0+e289ZSxvPy5sZW5ndGgmJnQub25DaGFuZ2UoKX0sdC5vbkNoYW5nZT12O2NvbnN0IGk9e307cmV0dXJuIHQucmVzPWksaS5jbG9zZT0oKT0+e3IhPT11LkNsb3NlJiYocj11LkNsb3NlLHQub25DaGFuZ2UoKSl9LGkub3Blbj0oKT0+e3IhPT11Lk9wZW4mJihyPXUuT3Blbix0Lm9uQ2hhbmdlKCkpfSxpLnJlc3BvbmQ9bj0+e2NvbnN0IG89Tyh0LmdldFJlc3VsdEJ1ZmZlcigpLG4sZSk7dC5zZXRSZXN1bHRCdWZmZXIobyl9LGkucmV2b2tlPSguLi5lKT0+e2NvbnN0IG49bmV3IFNldChlKSxvPXQuZ2V0UmVzdWx0QnVmZmVyKCkuZmlsdGVyKCgoe2tleTplfSk9Pntjb25zdCB0PW4uaGFzKGUpO3JldHVybiB0JiZuLmRlbGV0ZShlKSwhdH0pKTt0LnNldFJlc3VsdEJ1ZmZlcihvKSxuLnNpemUmJih0LmdldFJldm9rZWRCdWZmZXIoKS5mb3JFYWNoKChlPT5uLmFkZChlKSkpLHQuc2V0UmV2b2tlZEJ1ZmZlcihbLi4ubl0pKX0sdH1mdW5jdGlvbiBFKGUsdCxuKXtjb25zdCBvPW5ldyBTZXQ7bGV0IHI9ITE7cmV0dXJue2Nsb3NlOigpPT57cj0hMDtmb3IoY29uc3QgZSBvZiBvKWUoKX0scmVxOntpZDp0LHRvcGljOmUsLi4ubixjb250ZXh0Om4/LmNvbnRleHR8fHt9LG9uQ2xvc2U6ZT0+e28uYWRkKGUpLHImJmUoKX0scmVtb3ZlTGlzdGVuZXI6ZT0+e28uZGVsZXRlKGUpfX19fWZ1bmN0aW9uIFYoKXtyZXR1cm57bmFtZTpmaW4ubWUubmFtZSx1dWlkOmZpbi5tZS51dWlkfX1mdW5jdGlvbiBNKCl7bGV0IGU7dHJ5e2NvbnN0IHQ9ZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCk7aWYoIXQ/LmlkZW50aXR5KXJldHVybjtlPXQuaWRlbnRpdHkudXVpZH1jYXRjaChlKXt9cmV0dXJuIGV9Y29uc3QgXz1cImRlcmVnaXN0ZXJlZCBvciBkb2VzIG5vdCBleGlzdFwiLCQ9bmV3IEVycm9yKGBwcm92aWRlciAke199YCkscT1uZXcgRXJyb3IoXCJwcm92aWRlciB3aXRoIG5hbWUgYWxyZWFkeSBleGlzdHNcIiksRz1uZXcgRXJyb3IoXCJiYWQgcGF5bG9hZFwiKSxIPW5ldyBFcnJvcihcInN1YnNjcmlwdGlvbiByZWplY3RlZFwiKSxOPW5ldyBFcnJvcihgY2hhbm5lbCAke199YCksVT1uZXcgTWFwO2Z1bmN0aW9uIGooZSl7Y29uc3QgdD1YKGUpO2lmKHQpcmV0dXJuIHQ7dGhyb3cgTn1mdW5jdGlvbiBYKGUpe2NvbnN0IHQ9VS5nZXQoZSk7aWYodClyZXR1cm4gdH1mdW5jdGlvbiBLKGUsdCl7VS5zZXQoZSx0KX1jb25zdCBKPW5ldyBNYXA7ZnVuY3Rpb24geihlKXtKLmhhcyhlKXx8Si5zZXQoZSxuZXcgTWFwKTtjb25zdCB0PUouZ2V0KGUpO3JldHVybntnZXRSZXF1ZXN0c0ZvcklkZW50aXR5OmU9Pntjb25zdCBuPWZ1bmN0aW9uKGUpe3JldHVybmAke2UudXVpZH06JHtlLm5hbWV9YH0oZSk7cmV0dXJuIHQuaGFzKG4pfHx0LnNldChuLG5ldyBNYXApLHQuZ2V0KG4pfX19YXN5bmMgZnVuY3Rpb24gWihlLHQpe3JldHVybihhd2FpdCBqKGUpKS5kaXNwYXRjaChnLHQpfWZ1bmN0aW9uIFEoe25hbWVzcGFjZWRUb3BpYzplLHRvcGljOnR9KXtjb25zdCBuPUwuYmluZChudWxsLGUpLG89eihlKSxyPVouYmluZChudWxsLGUpO3JldHVybiBhc3luYyhlLGkpPT57aWYoIWV8fCFlLmlkfHwhZS5wcm92aWRlcklkKXtjb25zdCBlPUc7cmV0dXJue2Vycm9yOmUubWVzc2FnZX19Y29uc3R7aWQ6cyxwcm92aWRlcklkOmF9PWUsYz1uKGEpO2lmKCFjKXtjb25zdCBlPSQ7cmV0dXJue2Vycm9yOmUubWVzc2FnZX19Y29uc3QgZD1vLmdldFJlcXVlc3RzRm9ySWRlbnRpdHkoaSk7bGV0IHU9ZC5nZXQoZS5pZCk7dXx8KHU9RSh0LHMsZSksZC5zZXQoZS5pZCx1KSk7Y29uc3QgcD14KCksbD0oKT0+e2NvbnN0IGU9cC5nZXRSZXN1bHRCdWZmZXIoKTtwLnNldFJlc3VsdEJ1ZmZlcihbXSk7Y29uc3QgdD1wLmdldFJldm9rZWRCdWZmZXIoKTtwLnNldFJldm9rZWRCdWZmZXIoW10pO2NvbnN0IG49cC5nZXRTdGF0dXMoKTtyKHtpZDpzLHByb3ZpZGVySWQ6YSxyZXN1bHRzOmUscmV2b2tlZDp0LHN0YXR1czpufSl9O2xldCBmPSEwLHc9ITE7cC5vbkNoYW5nZT0oKT0+e2lmKGYpcmV0dXJuIGY9ITEsdm9pZCBsKCk7d3x8KHc9ITAsc2V0VGltZW91dCgoKCk9Pnt3PSExLGwoKX0pLDEwMCkpfTt0cnl7Y29uc3R7cmVzdWx0czplLGNvbnRleHQ6dH09YXdhaXQgYy5vblVzZXJJbnB1dCh1LnJlcSxwLnJlcyksbj1wLmdldFN0YXR1cygpO3JldHVybntpZDpzLHByb3ZpZGVySWQ6YSxzdGF0dXM6bixyZXN1bHRzOmUsY29udGV4dDp0fX1jYXRjaChlKXtyZXR1cm57aWQ6cyxwcm92aWRlcklkOmEsZXJyb3I6ZS5tZXNzYWdlfX19fWFzeW5jIGZ1bmN0aW9uIFkoZSx0LG4pe2NvbnN0IG89bnx8YXdhaXQgaihlKSxyPVYoKSxpPXtpZGVudGl0eTpyLC4uLnQsb25Vc2VySW5wdXQ6dm9pZCAwLG9uUmVzdWx0RGlzcGF0Y2g6dm9pZCAwfSxzPWF3YWl0IG8uZGlzcGF0Y2goXCIyXCIsaSk7cmV0dXJuIGF3YWl0IGIoZSx7aWRlbnRpdHk6ciwuLi50fSksc31hc3luYyBmdW5jdGlvbiBlZShlLHQpe2NvbnN0IG49YXdhaXQgaihlKTtyZXR1cm4gYXdhaXQgbi5kaXNwYXRjaChcIjNcIix0KSxEKGUsdCl9YXN5bmMgZnVuY3Rpb24gdGUoZSx0LG4sbyl7Y29uc3Qgcj1BKG4sVigpLG8pLGk9TChlLHQpO2lmKGkpe2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6ZX09aTtpZighZSlyZXR1cm47cmV0dXJuIGUocil9Y29uc3Qgcz17cHJvdmlkZXJJZDp0LHJlc3VsdDpyfTtyZXR1cm4oYXdhaXQgaihlKSkuZGlzcGF0Y2goaCxzKX1hc3luYyBmdW5jdGlvbiBuZShlLHQpe2NvbnN0IG49ey4uLnQsY29udGV4dDp0Py5jb250ZXh0fHx7fX0sbz17fSxyPWFzeW5jIGZ1bmN0aW9uKihlLHQse3NldFN0YXRlOm59KXtjb25zdCBvPWF3YWl0IGooZSk7Zm9yKDs7KXtjb25zdCBlPWF3YWl0IG8uZGlzcGF0Y2goXCIxXCIsdCkscj1lLmVycm9yO2lmKHIpdGhyb3cgbmV3IEVycm9yKHIpO2NvbnN0IGk9ZTtpZih0LmlkPWkuaWQsbihpLnN0YXRlKSxpLmRvbmUpcmV0dXJuIGkudmFsdWU7eWllbGQgaS52YWx1ZX19KGUsbix7c2V0U3RhdGU6ZT0+e28uc3RhdGU9ZX19KTtsZXQgaT1hd2FpdCByLm5leHQoKTtyZXR1cm4gby5pZD1uLmlkLG8uY2xvc2U9KCk9PnshYXN5bmMgZnVuY3Rpb24oZSx0KXsoYXdhaXQgaihlKSkuZGlzcGF0Y2goeSx7aWQ6dH0pfShlLG8uaWQpfSxvLm5leHQ9KCk9PntpZihpKXtjb25zdCBlPWk7cmV0dXJuIGk9dm9pZCAwLGV9cmV0dXJuIHIubmV4dCgpfSxvfWFzeW5jIGZ1bmN0aW9uIG9lKGUpe3JldHVybihhd2FpdCBqKGUpKS5kaXNwYXRjaChcIjRcIixudWxsKX1hc3luYyBmdW5jdGlvbiByZShlKXtjb25zdCB0PWF3YWl0IGooZSk7dmFyIG47bj1lLFUuZGVsZXRlKG4pLEYoZSksYXdhaXQgdC5kaXNjb25uZWN0KCl9ZnVuY3Rpb24gaWUoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj16KHQpO3JldHVybiBhc3luYyBvPT57aWYoIVgodCkpcmV0dXJuO2NvbnN0IHI9bi5nZXRSZXF1ZXN0c0ZvcklkZW50aXR5KG8pO2Zvcihjb25zdHtyZXE6ZSxjbG9zZTp0fW9mIHIudmFsdWVzKCkpdCgpLHIuZGVsZXRlKGUuaWQpO0sodCwoYXN5bmMgZT0+e2NvbnN0e25hbWVzcGFjZWRUb3BpYzp0fT1lLG49YXdhaXQgc2UoZSk7Zm9yKGNvbnN0IGUgb2YgQih0KSlhd2FpdCBZKHQsZSxuKTtyZXR1cm4gbn0pKGUpKX19YXN5bmMgZnVuY3Rpb24gc2UoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1TKHQpLG89YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Zm9yKGxldCB0PTA7dDw1MDt0KyspdHJ5e3JldHVybiBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSx7d2FpdDohMX0pfWNhdGNoKGUpe2lmKDQ5PT09dCl0aHJvdyBlO2F3YWl0IG5ldyBQcm9taXNlKChlPT5zZXRUaW1lb3V0KGUsMWUzKSkpfX0obik7cmV0dXJuIG8ucmVnaXN0ZXIoZyxRKGUpKSxvLnJlZ2lzdGVyKHksZnVuY3Rpb24oZSl7Y29uc3QgdD16KGUpO3JldHVybihlLG4pPT57Y29uc3Qgbz10LmdldFJlcXVlc3RzRm9ySWRlbnRpdHkobikscj1vLmdldChlLmlkKTtyJiYoci5jbG9zZSgpLG8uZGVsZXRlKGUuaWQpKX19KHQpKSxvLnJlZ2lzdGVyKGgsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQucHJvdmlkZXJJZHx8IXQucmVzdWx0KXJldHVybjtjb25zdCBvPUwoZSx0LnByb3ZpZGVySWQpO2lmKCFvKXJldHVybjtjb25zdHtvblJlc3VsdERpc3BhdGNoOnJ9PW87cmV0dXJuIHI/KHQucmVzdWx0LmRpc3BhdGNoZXJJZGVudGl0eT1uLHIodC5yZXN1bHQpKTp2b2lkIDB9fSh0KSksby5vbkRpc2Nvbm5lY3Rpb24oaWUoZSkpLG99YXN5bmMgZnVuY3Rpb24gYWUoZSl7Y29uc3QgdD0oXCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplPy50b3BpYyl8fHcsbj0oXCJzdHJpbmdcIj09dHlwZW9mIGU/bnVsbDplPy51dWlkKXx8TSgpLG89bShuLHQpLHI9e3RvcGljOnQsbmFtZXNwYWNlOm4sbmFtZXNwYWNlZFRvcGljOm99O2xldCBpPVgobyk7cmV0dXJuIGl8fChpPXNlKHIpLEsobyxpKSxhd2FpdCBpKSx7Z2V0QWxsUHJvdmlkZXJzOm9lLmJpbmQobnVsbCxvKSxyZWdpc3RlcjpZLmJpbmQobnVsbCxvKSxzZWFyY2g6bmUuYmluZChudWxsLG8pLGRlcmVnaXN0ZXI6ZWUuYmluZChudWxsLG8pLGRpc3BhdGNoOnRlLmJpbmQobnVsbCxvKSxkaXNjb25uZWN0OnJlLmJpbmQobnVsbCxvKX19Y29uc3QgY2U9bmV3IE1hcDtmdW5jdGlvbiBkZShlKXtjb25zdCB0PXVlKGUpO2lmKHQpcmV0dXJuIHQ7dGhyb3cgTn1mdW5jdGlvbiB1ZShlKXtjb25zdCB0PWNlLmdldChlKTtpZih0KXJldHVybiB0fWNvbnN0IHBlPW5ldyBNYXA7ZnVuY3Rpb24gbGUoZSx0KXtwZS5oYXMoZSl8fHBlLnNldChlLG5ldyBTZXQpLHBlLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gZmUoZSx0KXtjb25zdCBuPXBlLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1mdW5jdGlvbiB3ZShlKXtyZXR1cm5bLi4uQihlKV0ubWFwKChlPT4oey4uLmUsb25Vc2VySW5wdXQ6dm9pZCAwLG9uUmVzdWx0RGlzcGF0Y2g6dm9pZCAwfSkpKX1hc3luYyBmdW5jdGlvbiBnZShlLHQpe2lmKEwoZSx0LmlkKSl0aHJvdyBuZXcgRXJyb3IoXCJwcm92aWRlciB3aXRoIG5hbWUgYWxyZWFkeSBleGlzdHNcIik7Y29uc3Qgbj1WKCk7YXdhaXQgYihlLHtpZGVudGl0eTpuLC4uLnR9KX1mdW5jdGlvbiBoZShlLHQpe0QoZSx0KX1hc3luYyBmdW5jdGlvbiB5ZShlLHQsbixvKXtjb25zdCByPUwoZSx0KTtpZighcil0aHJvdyAkO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6aX09cjtpZighaSlyZXR1cm47cmV0dXJuIGkoQShuLFYoKSxvKSl9YXN5bmMgZnVuY3Rpb24qdmUoZSx0LG4pe2NvbnN0IG89ZnVuY3Rpb24oZSx0KXtjb25zdCBuPVtdLG89W10scj1bXSxpPVtdO2Zvcihjb25zdCBzIG9mIGUpe2NvbnN0IGU9eChzLnNjb3JlT3JkZXIpLGE9e3Jlc3VsdHM6W10scHJvdmlkZXI6e2lkOnMuaWQsaWRlbnRpdHk6cy5pZGVudGl0eSx0aXRsZTpzLnRpdGxlLHNjb3JlT3JkZXI6cy5zY29yZU9yZGVyLGljb246cy5pY29uLGRpc3BhdGNoRm9jdXNFdmVudHM6cy5kaXNwYXRjaEZvY3VzRXZlbnRzfX07bi5wdXNoKGEpLG8ucHVzaChlKTtjb25zdCBjPShhc3luYygpPT57dHJ5e2NvbnN0e3Jlc3VsdHM6bixjb250ZXh0Om99PWF3YWl0IHMub25Vc2VySW5wdXQodCxlLnJlcyk7YS5yZXN1bHRzPU8oYS5yZXN1bHRzLG4pLGEuY29udGV4dD17Li4uYS5jb250ZXh0LC4uLm99fWNhdGNoKGUpe2EuZXJyb3I9ZX19KSgpO2MuZmluYWxseSgoKCk9PntjLmRvbmU9ITB9KSksaS5wdXNoKGMpLHIucHVzaChyLmxlbmd0aCl9cmV0dXJue3Byb3ZpZGVyUmVzcG9uc2VzOm4sbGlzdGVuZXJSZXNwb25zZXM6byxvcGVuTGlzdGVuZXJSZXNwb25zZXM6cixpbml0aWFsUmVzcG9uc2VQcm9taXNlczppfX0odC50YXJnZXRzP3QudGFyZ2V0cy5tYXAoKHQ9PkwoZSx0KSkpLmZpbHRlcigoZT0+ISFlKSk6Wy4uLkIoZSkuZmlsdGVyKChlPT4hZS5oaWRkZW4pKV0sdCkse3Byb3ZpZGVyUmVzcG9uc2VzOnIsbGlzdGVuZXJSZXNwb25zZXM6aX09bztsZXR7b3Blbkxpc3RlbmVyUmVzcG9uc2VzOnMsaW5pdGlhbFJlc3BvbnNlUHJvbWlzZXM6YX09byxjPWYuRGUuRmV0Y2hpbmc7Y29uc3QgZD1lPT57Yz1lLG4uc2V0U3RhdGUoYyl9O2xldCBwLGw9ITE7dC5vbkNsb3NlKCgoKT0+e2w9ITAscCYmcCgpfSkpO2Rve2xldCBlPSExO2lmKGEubGVuZ3RoKXtjb25zdCB0PVtdO2Zvcihjb25zdCBuIG9mIGEpbi5kb25lP2U9ITA6dC5wdXNoKG4pO2E9dCxhLmxlbmd0aHx8KGQoZi5EZS5GZXRjaGVkKSxlPSEwKX1sZXQgdCxuPSExO2NvbnN0IG89KCk9PntuPSEwLHQmJnQoKX0sdz1bXTtmb3IoY29uc3QgdCBvZiBzKXtjb25zdCBuPWlbdF0scz1yW3RdLGE9bi5nZXRTdGF0dXMoKTsoYT09PXUuT3Blbnx8Yz09PWYuRGUuRmV0Y2hpbmcmJmE9PT11LkluaXRpYWwpJiYody5wdXNoKHQpLG4ub25DaGFuZ2U9byk7Y29uc3QgZD1uLmdldFJlc3VsdEJ1ZmZlcigpO2QubGVuZ3RoJiYobi5zZXRSZXN1bHRCdWZmZXIoW10pLHMucmVzdWx0cz1PKHMucmVzdWx0cyxkKSxlPSEwKTtjb25zdCBwPW4uZ2V0UmV2b2tlZEJ1ZmZlcigpO2lmKHAubGVuZ3RoKXtuLnNldFJldm9rZWRCdWZmZXIoW10pO2NvbnN0IHQ9bmV3IFNldChwKTtzLnJlc3VsdHM9cy5yZXN1bHRzLmZpbHRlcigoKHtrZXk6ZX0pPT4hdC5oYXMoZSkpKSxlPSEwfX1pZihzPXcsZSYmKHlpZWxkIHIpLGwpYnJlYWs7bnx8KHMubGVuZ3RofHxhLmxlbmd0aCkmJmF3YWl0IFByb21pc2UucmFjZShbLi4uYSxuZXcgUHJvbWlzZSgoZT0+e3Q9ZX0pKSxuZXcgUHJvbWlzZSgoZT0+e3A9ZX0pKV0pfXdoaWxlKHMubGVuZ3RofHxhLmxlbmd0aCk7cmV0dXJuIGQoZi5EZS5Db21wbGV0ZSkscn1sZXQgbWU9MDtmdW5jdGlvbiBTZSh7bmFtZXNwYWNlZFRvcGljOmUsdG9waWM6dH0sbil7bWUrPTE7Y29uc3Qgbz1FKHQsbWUudG9TdHJpbmcoKSxuKSxyPXZlKGUsby5yZXEse3NldFN0YXRlOmU9PntyLnN0YXRlPWV9fSk7cmV0dXJuIHIuaWQ9bWUudG9TdHJpbmcoKSxyLmNsb3NlPW8uY2xvc2Usci5zdGF0ZT1mLkRlLkZldGNoaW5nLHJ9Y29uc3QgUGU9bmV3IE1hcDtmdW5jdGlvbiBDZShlLHQpe3JldHVybmAke2V9OiR7dH1gfWZ1bmN0aW9uIGtlKGUpe3JldHVybiBhc3luYyh0LC4uLm4pPT57aWYoIXQpcmV0dXJue2Vycm9yOkcubWVzc2FnZX07bGV0IG87aWYodC5pZClvPUNlKGUubmFtZXNwYWNlZFRvcGljLHQuaWQpO2Vsc2V7Y29uc3Qgbj1TZShlLHQpO289Q2UoZS5uYW1lc3BhY2VkVG9waWMsbi5pZCksdC5pZD1uLmlkLFBlLnNldChvLHtnZW5lcmF0b3I6bn0pfWNvbnN0IHI9UGUuZ2V0KG8pO2NsZWFyVGltZW91dChyLnRpbWVvdXQpO2NvbnN0IGk9YXdhaXQgci5nZW5lcmF0b3IubmV4dCgpO3JldHVybiByLnRpbWVvdXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KCgoKT0+e1BlLmRlbGV0ZShlKX0pLDFlNCl9KG8pLHsuLi5pLGlkOnQuaWQsc3RhdGU6ci5nZW5lcmF0b3Iuc3RhdGV9fX1mdW5jdGlvbiBXZShlLHQsbil7cmV0dXJuIGRlKGUpLmRpc3BhdGNoKHQseSx7aWQ6bn0pfWZ1bmN0aW9uIFJlKGUpe3JldHVybiB0PT5mdW5jdGlvbihlLHQpe2NvbnN0IG49Q2UoZSx0KSxvPVBlLmdldChuKTtvJiZvLmdlbmVyYXRvci5jbG9zZSgpfShlLHQuaWQpfWFzeW5jIGZ1bmN0aW9uIFRlKGUsdCx7aWQ6bixxdWVyeTpvLGNvbnRleHQ6cix0YXJnZXRzOml9KXtjb25zdCBzPWRlKGUpLGE9e2lkOm4scXVlcnk6byxjb250ZXh0OnIsdGFyZ2V0czppLHByb3ZpZGVySWQ6dC5pZH0sYz1hd2FpdCBzLmRpc3BhdGNoKHQuaWRlbnRpdHksZyxhKSxkPWMuZXJyb3I7aWYoZCl0aHJvdyBuZXcgRXJyb3IoZCk7cmV0dXJuIGN9Y29uc3QgSWU9bmV3IE1hcDtmdW5jdGlvbiBiZShlLHQsbil7cmV0dXJuYCR7ZX06JHt0Lm5hbWV9OiR7dC51dWlkfToke259YH1jb25zdCBEZT1uZXcgTWFwO2Z1bmN0aW9uIEJlKGUsdCxuKXtyZXR1cm5gJHtlfToke3R9OiR7bn1gfWZ1bmN0aW9uIEZlKGUsdCl7Y29uc3Qgbj1iZS5iaW5kKG51bGwsZSx0LmlkZW50aXR5KSxvPVdlLmJpbmQobnVsbCxlLHQuaWRlbnRpdHkpLHI9VGUuYmluZChudWxsLGUsdCk7cmV0dXJuIGFzeW5jKGkscyk9Pntjb25zdCBhPW4oaS5pZCk7aWYoIUllLmhhcyhhKSl7Y29uc3QgZT0oKT0+e28oaS5pZCksSWUuZGVsZXRlKGEpfTtJZS5zZXQoYSxlKSxpLm9uQ2xvc2UoZSl9Y29uc3QgYz1CZShlLHQuaWQsaS5pZCksZD0oKT0+e0RlLmRlbGV0ZShjKSxzLmNsb3NlKCl9O2kub25DbG9zZShkKSxEZS5zZXQoYywoZT0+e2UucmVzdWx0cz8ubGVuZ3RoJiZzLnJlc3BvbmQoZS5yZXN1bHRzKSxlLnJldm9rZWQ/Lmxlbmd0aCYmcy5yZXZva2UoLi4uZS5yZXZva2VkKSxlLnN0YXR1cz09PXUuT3BlbiYmcy5vcGVuKCksZS5zdGF0dXM9PT11LkNsb3NlJiZkKCl9KSk7Y29uc3QgcD1hd2FpdCByKGkpO3JldHVybiBwLnN0YXR1cz09PXUuT3BlbiYmcy5vcGVuKCkscC5zdGF0dXMhPT11LkNsb3NlJiZwLnN0YXR1cyE9PXUuSW5pdGlhbHx8ZCgpLHB9fWZ1bmN0aW9uIExlKGUsdCl7cmV0dXJuIGFzeW5jIG49Pntjb25zdCBvPWRlKGUpLHI9e3Byb3ZpZGVySWQ6dC5pZCxyZXN1bHQ6bn07cmV0dXJuIG8uZGlzcGF0Y2godC5pZGVudGl0eSxoLHIpfX1jb25zdCBBZT1uZXcgTWFwO2Z1bmN0aW9uIE9lKGUsdCl7cmV0dXJuYCR7ZX0tJHt0Lm5hbWV9LSR7dC51dWlkfWB9ZnVuY3Rpb24geGUoZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQuaWQpcmV0dXJuIHZvaWQgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHQpKTtpZihMKGUsdC5pZCkpdGhyb3cgcTtyZXR1cm4gdC5pZGVudGl0eT1uLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1PZShlLHQuaWRlbnRpdHkpO0FlLmhhcyhuKXx8QWUuc2V0KG4sW10pLEFlLmdldChuKS5wdXNoKHQuaWQpLGF3YWl0IGIoZSx7Li4udCxvblVzZXJJbnB1dDpGZShlLHQpLG9uUmVzdWx0RGlzcGF0Y2g6TGUoZSx0KX0pfShlLHQpLHt3b3Jrc3BhY2VWZXJzaW9uOmkudTAsY2xpZW50QVBJVmVyc2lvbjp0LmNsaWVudEFQSVZlcnNpb259fX1mdW5jdGlvbiBFZShlKXtyZXR1cm4gdD0+e3QmJmZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1MKGUsdCk7aWYoIW4pcmV0dXJuO2NvbnN0IG89T2UoZSxuLmlkZW50aXR5KSxyPUFlLmdldChvKTtpZihyKXtjb25zdCBuPXIuZmluZEluZGV4KChlPT5lPT09dCkpOy0xIT09biYmKHIuc3BsaWNlKG4sMSksRChlLHQpKX19KGUsdCl9fWNvbnN0IFZlPW5ldyBNYXA7ZnVuY3Rpb24gTWUoZSx0KXtWZS5oYXMoZSl8fFZlLnNldChlLG5ldyBTZXQpLFZlLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gX2UoZSx0KXtjb25zdCBuPVZlLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1mdW5jdGlvbiAkZShlKXtyZXR1cm4gYXN5bmMgdD0+eyFmdW5jdGlvbihlLHQpe2NvbnN0IG49T2UoZSx0KSxvPUFlLmdldChuKTtpZihvKXtmb3IoY29uc3QgdCBvZiBvKUQoZSx0KTtBZS5kZWxldGUobil9fShlLHQpO2NvbnN0IG49VmUuZ2V0KGUpO24mJm4uZm9yRWFjaCgoZT0+ZSh0KSkpfX1hc3luYyBmdW5jdGlvbiBxZShlKXtjb25zdHtuYW1lc3BhY2VkVG9waWM6dH09ZSxuPVMoZS5uYW1lc3BhY2VkVG9waWMpLG89YXdhaXQocj1uLGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY3JlYXRlKHIpKTt2YXIgcjtyZXR1cm4gby5vbkNvbm5lY3Rpb24oZnVuY3Rpb24oe25hbWVzcGFjZWRUb3BpYzplfSl7cmV0dXJuIGFzeW5jIHQ9Pntjb25zdCBuPXBlLmdldChlKTtpZihuKWZvcihjb25zdCBlIG9mIG4paWYoIWF3YWl0IGUodCkpdGhyb3cgSH19KGUpKSxvLm9uRGlzY29ubmVjdGlvbigkZSh0KSksby5yZWdpc3Rlcih5LFJlKHQpKSxvLnJlZ2lzdGVyKGcsZnVuY3Rpb24oZSl7cmV0dXJuIHQ9Pntjb25zdCBuPUJlKGUsdC5wcm92aWRlcklkLHQuaWQpLG89RGUuZ2V0KG4pO28mJm8odCl9fSh0KSksby5yZWdpc3RlcihcIjJcIix4ZSh0KSksby5yZWdpc3RlcihcIjNcIixFZSh0KSksby5yZWdpc3RlcihcIjRcIixmdW5jdGlvbihlKXtyZXR1cm4gYXN5bmMoKT0+d2UoZSl9KHQpKSxvLnJlZ2lzdGVyKFwiMVwiLGtlKGUpKSxvLnJlZ2lzdGVyKGgsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQucHJvdmlkZXJJZHx8IXQucmVzdWx0KXJldHVybjtjb25zdCBvPUwoZSx0LnByb3ZpZGVySWQpO2lmKCFvKXRocm93ICQ7Y29uc3R7b25SZXN1bHREaXNwYXRjaDpyfT1vO3JldHVybiByPyh0LnJlc3VsdC5kaXNwYXRjaGVySWRlbnRpdHk9bixyKHQucmVzdWx0KSk6dm9pZCAwfX0odCkpLG99YXN5bmMgZnVuY3Rpb24gR2UoZSl7Y29uc3QgdD1kZShlKTt2YXIgbjtuPWUsY2UuZGVsZXRlKG4pLGF3YWl0IHQuZGVzdHJveSgpLEYoZSl9YXN5bmMgZnVuY3Rpb24gSGUoZSl7Y29uc3QgdD0oXCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplPy50b3BpYyl8fHcsbj1NKCksbz1tKG4sdCkscj17dG9waWM6dCxuYW1lc3BhY2U6bixuYW1lc3BhY2VkVG9waWM6b307bGV0IGk9dWUobyk7aXx8KGk9YXdhaXQgcWUociksZnVuY3Rpb24oZSx0KXtjZS5zZXQoZSx0KX0obyxpKSk7Y29uc3Qgcz1mZS5iaW5kKG51bGwsbyksYT1fZS5iaW5kKG51bGwsbyksYz1rLmJpbmQobnVsbCxvKSxkPVQuYmluZChudWxsLG8pO3JldHVybntnZXRBbGxQcm92aWRlcnM6d2UuYmluZChudWxsLG8pLHNlYXJjaDpTZS5iaW5kKG51bGwscikscmVnaXN0ZXI6Z2UuYmluZChudWxsLG8pLGRlcmVnaXN0ZXI6aGUuYmluZChudWxsLG8pLG9uU3Vic2NyaXB0aW9uOmxlLmJpbmQobnVsbCxvKSxvbkRpc2Nvbm5lY3Q6TWUuYmluZChudWxsLG8pLG9uUmVnaXN0ZXI6Qy5iaW5kKG51bGwsbyksb25EZXJlZ2lzdGVyOlIuYmluZChudWxsLG8pLGRpc3BhdGNoOnllLmJpbmQobnVsbCxyKSxkaXNjb25uZWN0OkdlLmJpbmQobnVsbCxvKSxyZW1vdmVMaXN0ZW5lcjplPT57cyhlKSxhKGUpLGMoZSksZChlKX19fWNvbnN0e2NyZWF0ZTpOZX09cix7c3Vic2NyaWJlOlVlfT1vLGplPXtjcmVhdGU6TmUsc3Vic2NyaWJlOlVlLGRlZmF1bHRUb3BpYzpcImFsbFwifSxYZT0oKT0+e3dpbmRvdy5zZWFyY2g9amV9LEtlPWU9Pntjb25zdCB0PSgpPT57WGUoKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpfTtyZXR1cm4gdH07aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7WGUoKTtjb25zdCBlPVwibG9hZFwiLHQ9S2UoZSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSx0KTtjb25zdCBuPVwiRE9NQ29udGVudExvYWRlZFwiLG89S2Uobik7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIobixvKX1jb25zdCBKZT1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIHplKCl7YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7SmUuc2V0KGUsYXdhaXQgVWUoe3RvcGljOmUsdXVpZDpwLnE5LldvcmtzcGFjZX0pKX0oYyl9bGV0IFplO2FzeW5jIGZ1bmN0aW9uIFFlKGUpe3JldHVybiBhd2FpdCBhc3luYyBmdW5jdGlvbigpe3JldHVybiBaZXx8KFplPXplKCkpLFplfSgpLEplLmdldChlKX1jb25zdCBZZT1hc3luYyBlPT57aWYoIWUuaWNvbil0aHJvdyBuZXcgRXJyb3IoYCR7ZS5pZH0gcHJvdmlkZXIgbmVlZHMgdG8gaGF2ZSBpY29uIHByb3BlcnR5IGRlZmluZWQuYCk7YXdhaXQoMCxhLmFCKSgpO2NvbnN0IHQ9YXdhaXQgUWUoYyk7dHJ5e2UuY2xpZW50QVBJVmVyc2lvbj1pLnUwO2NvbnN0IG49YXdhaXQgdC5yZWdpc3RlcihlKTtyZXR1cm4oMCxzLmNrKSh7YWxsb3dlZDohMCxjb21wb25lbnRWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb259KSxufWNhdGNoKGUpe3Rocm93KDAscy5jaykoe2FsbG93ZWQ6ITEscmVqZWN0aW9uQ29kZTplLm1lc3NhZ2V9KSxlfX0sZXQ9YXN5bmMgZT0+e2F3YWl0KDAsYS5hQikoKTtyZXR1cm4oYXdhaXQgUWUoYykpLmRlcmVnaXN0ZXIoZSl9O2FzeW5jIGZ1bmN0aW9uIHR0KCl7cmV0dXJuKGF3YWl0KDAsYS5YbCkoKSkuZGlzcGF0Y2goYS5XRi5TaG93SG9tZSx2b2lkIDApfWFzeW5jIGZ1bmN0aW9uIG50KCl7cmV0dXJuKGF3YWl0KDAsYS5YbCkoKSkuZGlzcGF0Y2goYS5XRi5IaWRlSG9tZSx2b2lkIDApfX0sMjk4OihlLHQsbik9PntuLmQodCx7cDooKT0+by5weCx3OigpPT5vLnd0fSk7dmFyIG89bigzMTYpfSw0Mjc6KGUsdCxuKT0+e3ZhciBvO24uZCh0LHt2OigpPT5vfSksZnVuY3Rpb24oZSl7ZS5BY3Rpb25CdXR0b249XCJBY3Rpb25CdXR0b25cIixlLkRyb3Bkb3duQnV0dG9uPVwiRHJvcGRvd25CdXR0b25cIn0ob3x8KG89e30pKX0sNzU4OihlLHQsbik9Pnt2YXIgbyxyLGk7bi5kKHQse1B0OigpPT5vLGVsOigpPT5pLHlXOigpPT5yfSksZnVuY3Rpb24oZSl7ZS5TdWdnZXN0aW9uPVwic3VnZ2VzdGlvblwifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuQ29udGFjdD1cIkNvbnRhY3RcIixlLkN1c3RvbT1cIkN1c3RvbVwiLGUuTGlzdD1cIkxpc3RcIixlLlBsYWluPVwiUGxhaW5cIixlLlNpbXBsZVRleHQ9XCJTaW1wbGVUZXh0XCIsZS5Mb2FkaW5nPVwiTG9hZGluZ1wiLGUuRXJyb3I9XCJFcnJvclwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuTXVsdGlTZWxlY3Q9XCJNdWx0aVNlbGVjdFwifShpfHwoaT17fSkpfSwxMTQ6KGUsdCxuKT0+e3ZhciBvLHI7bi5kKHQse0w6KCk9Pm8sVDooKT0+cn0pLGZ1bmN0aW9uKGUpe2UuU25hcHNob3Q9XCJzbmFwc2hvdFwiLGUuTWFuaWZlc3Q9XCJtYW5pZmVzdFwiLGUuVmlldz1cInZpZXdcIixlLkV4dGVybmFsPVwiZXh0ZXJuYWxcIn0ob3x8KG89e30pKSxmdW5jdGlvbihlKXtlLkxhbmRpbmdQYWdlPVwibGFuZGluZ1BhZ2VcIixlLkFwcEdyaWQ9XCJhcHBHcmlkXCJ9KHJ8fChyPXt9KSl9LDEwOTooZSx0LG4pPT57bi5kKHQse0dvOigpPT5yLFpKOigpPT5zLGJJOigpPT5pLHA2OigpPT5vfSk7Y29uc3Qgbz17Q29udGFpbmVyOlwiQ29udGFpbmVyXCIsQnV0dG9uOlwiQnV0dG9uXCJ9LHI9e1RleHQ6XCJUZXh0XCIsSW1hZ2U6XCJJbWFnZVwiLExpc3Q6XCJMaXN0XCJ9LGk9ey4uLm8sLi4ucn07dmFyIHM7IWZ1bmN0aW9uKGUpe2UuUHJpbWFyeT1cInByaW1hcnlcIixlLlNlY29uZGFyeT1cInNlY29uZGFyeVwiLGUuVGV4dE9ubHk9XCJ0ZXh0T25seVwifShzfHwocz17fSkpfSw1Mjg6KGUsdCxuKT0+e24ucih0KSxuLmQodCx7QXBwTWFuaWZlc3RUeXBlOigpPT5zLkwsU3RvcmVmcm9udFRlbXBsYXRlOigpPT5zLlQsZGVyZWdpc3RlcjooKT0+ZyxoaWRlOigpPT5oLHJlZ2lzdGVyOigpPT53LHNob3c6KCk9Pnl9KTt2YXIgbz1uKDUzMikscj1uKDQzNiksaT1uKDgyKSxzPW4oMTE0KSxhPW4oNjc4KTtsZXQgYyxkPSExO2FzeW5jIGZ1bmN0aW9uIHUoZSx0LG4pe2NvbnN0IG89YXdhaXQoMCxyLkRtKSgpO3RyeXtyZXR1cm4gYXdhaXQgby5kaXNwYXRjaChlLmFjdGlvbixlLnBheWxvYWQpfWNhdGNoKHIpe2lmKC0xIT09ci50b1N0cmluZygpLmluZGV4T2YoZS5hY3Rpb24pKXJldHVybiBkPSEwLGF3YWl0IG8uZGlzcGF0Y2godC5hY3Rpb24sdC5wYXlsb2FkKSxuO3Rocm93IHJ9fWNvbnN0IHA9bmV3IE1hcCxsPWU9PntpZighcC5oYXMoZSkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IFByb3ZpZGVyIHdpdGggaWQgJHtlfSBpcyBub3QgcmVnaXN0ZXJlZGApO3JldHVybiBwLmdldChlKX0sZj1hc3luYyBlPT57Y29uc3QgdD1hd2FpdCgwLHIuWGwpKCk7aWYocC5oYXMoZS5pZCkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IHByb3ZpZGVyIHdpdGggaWQgJHtlLmlkfSBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtyZXR1cm4gcC5zZXQoZS5pZCxlKSwoZT0+e2UuaXNTdG9yZWZyb250QWN0aW9uc1JlZ2lzdGVyZWR8fChlLmlzU3RvcmVmcm9udEFjdGlvbnNSZWdpc3RlcmVkPSEwLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJBcHBzLChlPT5sKGUpLmdldEFwcHMoKSkpLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXIsKGU9PmwoZSkuZ2V0Rm9vdGVyKCkpKSxlLnJlZ2lzdGVyKHIuV0YuR2V0U3RvcmVmcm9udFByb3ZpZGVyTGFuZGluZ1BhZ2UsKGU9PmwoZSkuZ2V0TGFuZGluZ1BhZ2UoKSkpLGUucmVnaXN0ZXIoci5XRi5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uLChlPT5sKGUpLmdldE5hdmlnYXRpb24oKSkpLGUucmVnaXN0ZXIoci5XRi5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHAsKCh7aWQ6ZSxhcHA6dH0pPT5sKGUpLmxhdW5jaEFwcCh0KSkpKX0pKHQpLGUuY2xpZW50QVBJVmVyc2lvbj1hLnUwLHUoe2FjdGlvbjpyLldGLlJlZ2lzdGVyUHJvdmlkZXIscGF5bG9hZDp7cHJvdmlkZXJUeXBlOmkubFAuU3RvcmVmcm9udCxpbmZvOmV9fSx7YWN0aW9uOnIuV0YuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIscGF5bG9hZDplfSx7d29ya3NwYWNlVmVyc2lvbjpcInVua25vd25cIn0pfSx3PWU9PihjPW5ldyBQcm9taXNlKChhc3luYyh0LG4pPT57dHJ5e2NvbnN0IG49YXdhaXQgZihlKTsoMCxvLmQ5KSh7YWxsb3dlZDohMCxjb21wb25lbnRWZXJzaW9uOm4/LndvcmtzcGFjZVZlcnNpb259KSx0KHtjbGllbnRBUElWZXJzaW9uOmEudTAsd29ya3NwYWNlVmVyc2lvbjpuLndvcmtzcGFjZVZlcnNpb258fFwiXCJ9KX1jYXRjaChlKXsoMCxvLmQ5KSh7YWxsb3dlZDohMSxyZWplY3Rpb25Db2RlOmUubWVzc2FnZX0pLG4oZSl9fSkpLGMpLGc9YXN5bmMgZT0+KGF3YWl0IGMscC5kZWxldGUoZSksYXdhaXQoMCxyLmFCKSgpLHUoe2FjdGlvbjpyLldGLkRlcmVnaXN0ZXJQcm92aWRlcixwYXlsb2FkOntwcm92aWRlclR5cGU6aS5sUC5TdG9yZWZyb250LGlkOmV9fSx7YWN0aW9uOnIuV0YuRGVyZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcixwYXlsb2FkOmV9KSksaD1hc3luYygpPT4oYXdhaXQgYyxhd2FpdCgwLHIuYUIpKCksdSh7YWN0aW9uOnIuV0YuSGlkZVByb3ZpZGVyV2luZG93LHBheWxvYWQ6e3Byb3ZpZGVyVHlwZTppLmxQLlN0b3JlZnJvbnR9fSx7YWN0aW9uOnIuV0YuSGlkZVN0b3JlZnJvbnR9KSkseT1hc3luYygpPT4oYXdhaXQgYyxhd2FpdCgwLHIuYUIpKCksdSh7YWN0aW9uOnIuV0YuU2hvd1Byb3ZpZGVyV2luZG93LHBheWxvYWQ6e3Byb3ZpZGVyVHlwZTppLmxQLlN0b3JlZnJvbnR9fSx7YWN0aW9uOnIuV0YuU2hvd1N0b3JlZnJvbnR9KSl9LDQzNjooZSx0LG4pPT57bi5kKHQse1dGOigpPT5zLERtOigpPT5hLFhsOigpPT5wLGFCOigpPT51fSk7dmFyIG89big2NzgpO2NvbnN0IHI9by5BeCYmXCJjb21wbGV0ZVwiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmbmV3IFByb21pc2UoKGU9PmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsKCgpPT57XCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmZSgpfSkpKSk7dmFyIGk9bigxMjEpO3ZhciBzOyFmdW5jdGlvbihlKXtlLlJlZ2lzdGVyUHJvdmlkZXI9XCJyZWdpc3Rlci1wcm92aWRlclwiLGUuRGVyZWdpc3RlclByb3ZpZGVyPVwiZGVyZWdpc3Rlci1wcm92aWRlclwiLGUuQ3JlYXRlUHJvdmlkZXJXaW5kb3c9XCJjcmVhdGUtcHJvdmlkZXItd2luZG93XCIsZS5HZXRQcm92aWRlcnM9XCJnZXQtcHJvdmlkZXJzXCIsZS5TaG93UHJvdmlkZXJXaW5kb3c9XCJzaG93LXByb3ZpZGVyLXdpbmRvd1wiLGUuSGlkZVByb3ZpZGVyV2luZG93PVwiaGlkZS1wcm92aWRlci13aW5kb3dcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlckFwcHM9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1hcHBzXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJMYW5kaW5nUGFnZT1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWxhbmRpbmctcGFnZVwiLGUuR2V0U3RvcmVmcm9udFByb3ZpZGVyRm9vdGVyPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItZm9vdGVyXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbmF2aWdhdGlvblwiLGUuTGF1bmNoU3RvcmVmcm9udFByb3ZpZGVyQXBwPVwibGF1bmNoLXN0b3JlZnJvbnQtcHJvdmlkZXItYXBwXCIsZS5TaG93SG9tZT1cInNob3ctaG9tZVwiLGUuSGlkZUhvbWU9XCJoaWRlLWhvbWVcIixlLkFzc2lnbkhvbWVTZWFyY2hDb250ZXh0PVwiYXNzaWduLWhvbWUtc2VhcmNoLWNvbnRleHRcIixlLkdldExlZ2FjeVBhZ2VzPVwiZ2V0LWxlZ2FjeS1wYWdlc1wiLGUuR2V0TGVnYWN5V29ya3NwYWNlcz1cImdldC1sZWdhY3ktd29ya3NwYWNlc1wiLGUuR2V0Q29tcHV0ZWRQbGF0Zm9ybVRoZW1lPVwiZ2V0LWNvbXB1dGVkLXBsYXRmb3JtLXRoZW1lXCIsZS5SZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcj1cInJlZ2lzdGVyLXN0b3JlZnJvbnQtcHJvdmlkZXJcIixlLkRlcmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJkZXJlZ2lzdGVyLXN0b3JlZnJvbnQtcHJvdmlkZXJcIixlLkhpZGVTdG9yZWZyb250PVwiaGlkZS1zdG9yZWZyb250XCIsZS5TaG93U3RvcmVmcm9udD1cInNob3ctc3RvcmVmcm9udFwifShzfHwocz17fSkpO2NvbnN0IGE9ZnVuY3Rpb24oZSl7bGV0IHQ7cmV0dXJuKCk9PntpZighby5zUyl0aHJvdyBuZXcgRXJyb3IoXCJnZXRDaGFubmVsQ2xpZW50IGNhbm5vdCBiZSB1c2VkIG91dHNpZGUgYW4gT3BlbkZpbiBlbnYuIEF2b2lkIHVzaW5nIHRoaXMgbWV0aG9kIGR1cmluZyBwcmUtcmVuZGVyaW5nLlwiKTtyZXR1cm4gdHx8KHQ9KGFzeW5jKCk9Pnthd2FpdCByO2NvbnN0IG49e2NsaWVudEFQSVZlcnNpb246by51MH0saT1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSx7cGF5bG9hZDpufSk7cmV0dXJuIGkub25EaXNjb25uZWN0aW9uKChhc3luYygpPT57dD12b2lkIDB9KSksaX0pKCkudGhlbigoZT0+ZSkpLmNhdGNoKChuPT57dGhyb3cgdD12b2lkIDAsbmV3IEVycm9yKGBmYWlsZWQgdG8gY29ubmVjdCB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX06ICR7bn1gKX0pKSksdH19KFwiX19vZl93b3Jrc3BhY2VfcHJvdG9jb2xfX1wiKSxjPVwiaXNMYXVuY2hlZFZpYUxpYlwiLGQ9ZT0+e2NvbnN0IHQ9bmV3IFVSTChlKTtyZXR1cm4gdC5zZWFyY2hQYXJhbXMuYXBwZW5kKGMsXCJ0cnVlXCIpLHQudG9TdHJpbmcoKX0sdT1hc3luYygpPT57aWYoIWF3YWl0KDAsaS5KVikoaS5pVykpcmV0dXJuKG8uWkt8fC0xPT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luXCIpKSYmYXdhaXQgZmluLkFwcGxpY2F0aW9uLnN0YXJ0RnJvbU1hbmlmZXN0KGQoby5hVykpLGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKGQoby5HWCkpfSxwPWFzeW5jKCk9Pihhd2FpdCB1KCksYSgpKX0sODI6KGUsdCxuKT0+e24uZCh0LHtSODooKT0+cyxYXzooKT0+aSxsUDooKT0+b30pO3ZhciBvLHI9big0MzYpOyFmdW5jdGlvbihlKXtlLlN0b3JlZnJvbnQ9XCJzdG9yZWZyb250XCIsZS5Eb2NrPVwiZG9ja1wifShvfHwobz17fSkpO2NvbnN0IGk9YXN5bmMgZT0+KGF3YWl0KDAsci5EbSkoKSkuZGlzcGF0Y2goci5XRi5TaG93UHJvdmlkZXJXaW5kb3cse3Byb3ZpZGVyVHlwZTplfSkscz1hc3luYyBlPT4oYXdhaXQoMCxyLkRtKSgpKS5kaXNwYXRjaChyLldGLkhpZGVQcm92aWRlcldpbmRvdyx7cHJvdmlkZXJUeXBlOmV9KX0sODA2OihlLHQsbik9PntuLmQodCx7cTk6KCk9Pm99KTt2YXIgbyxyLGkscz1uKDY3OCk7IWZ1bmN0aW9uKGUpe2UuV29ya3NwYWNlPVwib3BlbmZpbi1icm93c2VyXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5SdW5SZXF1ZXN0ZWQ9XCJydW4tcmVxdWVzdGVkXCIsZS5XaW5kb3dPcHRpb25zQ2hhbmdlZD1cIndpbmRvdy1vcHRpb25zLWNoYW5nZWRcIixlLldpbmRvd0Nsb3NlZD1cIndpbmRvdy1jbG9zZWRcIixlLldpbmRvd0NyZWF0ZWQ9XCJ3aW5kb3ctY3JlYXRlZFwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuRmluUHJvdG9jb2w9XCJmaW4tcHJvdG9jb2xcIn0oaXx8KGk9e30pKTtzLkFCLG8uV29ya3NwYWNlfSw2Nzg6KGUsdCxuKT0+e3ZhciBvO24uZCh0LHtBQjooKT0+YSxBeDooKT0+aSxHWDooKT0+dSxaSzooKT0+ZCxhVzooKT0+cCxvQzooKT0+YyxzUzooKT0+cix1MDooKT0+Zn0pLGZ1bmN0aW9uKGUpe2UuTG9jYWw9XCJsb2NhbFwiLGUuRGV2PVwiZGV2XCIsZS5TdGFnaW5nPVwic3RhZ2luZ1wiLGUuUHJvZD1cInByb2RcIn0ob3x8KG89e30pKTtjb25zdCByPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBmaW4saT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHByb2Nlc3N8fHByb2Nlc3MuZW52Py5KRVNUX1dPUktFUl9JRCxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KSxzPWk/d2luZG93Lm9yaWdpbjpvLkxvY2FsLGE9ciYmZmluLm1lLnV1aWQsYz1yJiZmaW4ubWUubmFtZSxkPShyJiZmaW4ubWUuZW50aXR5VHlwZSxcInByb2RcIj09PW8uTG9jYWwpLHU9KG8uRGV2LG8uU3RhZ2luZyxvLlByb2QsXCJmaW5zOi8vc3lzdGVtLWFwcHMvd29ya3NwYWNlXCIpLHA9XCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3dvcmtzcGFjZS85LjAuMTMvYXBwLmpzb25cIixsPWU9PmUuc3RhcnRzV2l0aChcImh0dHA6Ly9cIil8fGUuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpP2U6cytlLGY9KGwoXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3dvcmtzcGFjZS85LjAuMTNcIiksbChcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzkuMC4xM1wiKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX0RPQ1NfUExBVEZPUk1fVVJMJiZsKFdPUktTUEFDRV9ET0NTX1BMQVRGT1JNX1VSTCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdPUktTUEFDRV9ET0NTX0NMSUVOVF9VUkwmJmwoV09SS1NQQUNFX0RPQ1NfQ0xJRU5UX1VSTCksXCI5LjAuMTNcIil9LDUzMjooZSx0LG4pPT57bi5kKHQse1duOigpPT5kLGNrOigpPT5hLGQ5OigpPT5jfSk7dmFyIG8scj1uKDY3OCksaT1uKDEyMSk7IWZ1bmN0aW9uKGUpe2UuQnJvd3Nlcj1cIkJyb3dzZXJcIixlLkRvY2s9XCJEb2NrXCIsZS5Ib21lPVwiSG9tZVwiLGUuTm90aWZpY2F0aW9uPVwiTm90aWZpY2F0aW9uXCIsZS5TdG9yZWZyb250PVwiU3RvcmVmcm9udFwiLGUuUGxhdGZvcm09XCJQbGF0Zm9ybVwiLGUuVGhlbWluZz1cIlRoZW1pbmdcIn0ob3x8KG89e30pKTtjb25zdCBzPWFzeW5jKGUsdCk9Pntjb25zdCBuPXthcGlWZXJzaW9uOnQuYXBpVmVyc2lvbnx8ci51MCxjb21wb25lbnROYW1lOmUsY29tcG9uZW50VmVyc2lvbjp0LmNvbXBvbmVudFZlcnNpb258fHIudTAsYWxsb3dlZDp0LmFsbG93ZWQscmVqZWN0aW9uQ29kZTp0LnJlamVjdGlvbkNvZGV9O2Zpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcIndvcmtzcGFjZS1saWNlbnNpbmdcIixkYXRhOm59KX0sYT1hc3luYyBlPT57aS5PSS51dWlkPT09aS5HaS51dWlkJiZpLk9JLm5hbWU9PT1pLkdpLm5hbWV8fHMoby5Ib21lLGUpfSxjPWFzeW5jIGU9PntzKG8uU3RvcmVmcm9udCxlKX0sZD1hc3luYyBlPT57cyhvLkRvY2ssZSl9fSwxMjE6KGUsdCxuKT0+e24uZCh0LHtHaTooKT0+ZCxKVjooKT0+bCxPSTooKT0+dSxpVzooKT0+cH0pO3ZhciBvLHIsaSxzPW4oODA2KSxhPW4oNjc4KTshZnVuY3Rpb24oZSl7ZS5Ib21lPVwib3BlbmZpbi1ob21lXCIsZS5Eb2NrPVwib3BlbmZpbi1kb2NrXCIsZS5TdG9yZWZyb250PVwib3BlbmZpbi1zdG9yZWZyb250XCIsZS5Ib21lSW50ZXJuYWw9XCJvcGVuZmluLWhvbWUtaW50ZXJuYWxcIixlLkJyb3dzZXJNZW51PVwib3BlbmZpbi1icm93c2VyLW1lbnVcIixlLkJyb3dzZXJJbmRpY2F0b3I9XCJvcGVuZmluLWJyb3dzZXItaW5kaWNhdG9yXCIsZS5Ccm93c2VyV2luZG93PVwiaW50ZXJuYWwtZ2VuZXJhdGVkLXdpbmRvd1wifShvfHwobz17fSkpLGZ1bmN0aW9uKGUpe2UuU2hvd249XCJzaG93blwiLGUuQm91bmRzQ2hhbmdlZD1cImJvdW5kcy1jaGFuZ2VkXCIsZS5MYXlvdXRSZWFkeT1cImxheW91dC1yZWFkeVwiLGUuRW5kVXNlckJvdW5kc0NoYW5naW5nPVwiZW5kLXVzZXItYm91bmRzLWNoYW5naW5nXCIsZS5CbHVycmVkPVwiYmx1cnJlZFwiLGUuQ2xvc2VkPVwiY2xvc2VkXCIsZS5DbG9zZVJlcXVlc3RlZD1cImNsb3NlLXJlcXVlc3RlZFwiLGUuRm9jdXNlZD1cImZvY3VzZWRcIixlLlNob3dSZXF1ZXN0ZWQ9XCJzaG93LXJlcXVlc3RlZFwiLGUuVmlld0NyYXNoZWQ9XCJ2aWV3LWNyYXNoZWRcIixlLlZpZXdBdHRhY2hlZD1cInZpZXctYXR0YWNoZWRcIixlLlZpZXdEZXRhY2hlZD1cInZpZXctZGV0YWNoZWRcIixlLlZpZXdQYWdlVGl0bGVVcGRhdGVkPVwidmlldy1wYWdlLXRpdGxlLXVwZGF0ZWRcIixlLlZpZXdEZXN0cm95ZWQ9XCJ2aWV3LWRlc3Ryb3llZFwiLGUuT3B0aW9uc0NoYW5nZWQ9XCJvcHRpb25zLWNoYW5nZWRcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkJlZm9yZVVubG9hZD1cImJlZm9yZXVubG9hZFwifShpfHwoaT17fSkpO2Z1bmN0aW9uIGMoZSl7aWYoIWEuc1MpdGhyb3cgbmV3IEVycm9yKFwiZ2V0T0ZXaW5kb3cgY2FuIG9ubHkgYmUgdXNlZCBpbiBhbiBPcGVuRmluIGVudi4gQXZvaWQgY2FsbGluZyB0aGlzIG1ldGhvZCBkdXJpbmcgcHJlLXJlbmRlcmluZy5cIik7cmV0dXJuIGZpbi5XaW5kb3cud3JhcFN5bmMoZSl9Y29uc3QgZD17bmFtZTphLm9DLHV1aWQ6YS5BQn07Y29uc3QgdT17bmFtZTpvLkhvbWUsdXVpZDpzLnE5LldvcmtzcGFjZX0scD0oby5Eb2NrLHMucTkuV29ya3NwYWNlLG8uU3RvcmVmcm9udCxzLnE5LldvcmtzcGFjZSx7bmFtZTpzLnE5LldvcmtzcGFjZSx1dWlkOnMucTkuV29ya3NwYWNlfSk7Y29uc3QgbD1lPT5jKGUpLmdldE9wdGlvbnMoKS50aGVuKCgoKT0+ITApKS5jYXRjaCgoKCk9PiExKSl9LDMxNjooZSx0LG4pPT57dmFyIG8scixpO24uZCh0LHtEZTooKT0+byxweDooKT0+cix3dDooKT0+aX0pLGZ1bmN0aW9uKGUpe2UuRmV0Y2hpbmc9XCJmZXRjaGluZ1wiLGUuRmV0Y2hlZD1cImZldGNoZWRcIixlLkNvbXBsZXRlPVwiY29tcGxldGVcIn0ob3x8KG89e30pKSxmdW5jdGlvbihlKXtlLlVzZXJBY3Rpb249XCJ1c2VyLWFjdGlvblwiLGUuRm9jdXNDaGFuZ2U9XCJmb2N1cy1jaGFuZ2VcIixlLlJlbG9hZD1cInJlbG9hZFwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuQWN0aXZlPVwiYWN0aXZlXCIsZS5EZWZhdWx0PVwiZGVmYXVsdFwifShpfHwoaT17fSkpfX0sdD17fTtmdW5jdGlvbiBuKG8pe3ZhciByPXRbb107aWYodm9pZCAwIT09cilyZXR1cm4gci5leHBvcnRzO3ZhciBpPXRbb109e2V4cG9ydHM6e319O3JldHVybiBlW29dKGksaS5leHBvcnRzLG4pLGkuZXhwb3J0c31uLmQ9KGUsdCk9Pntmb3IodmFyIG8gaW4gdCluLm8odCxvKSYmIW4ubyhlLG8pJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLHtlbnVtZXJhYmxlOiEwLGdldDp0W29dfSl9LG4ubz0oZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCksbi5yPWU9PntcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfTt2YXIgbz17fTsoKCk9PntuLnIobyksbi5kKG8se0FjdGlvblRyaWdnZXI6KCk9PlAucCxBcHBNYW5pZmVzdFR5cGU6KCk9PlcuTCxCdXR0b25TdHlsZTooKT0+Qy5aSixDTElBY3Rpb246KCk9PmsuUHQsQ0xJRmlsdGVyT3B0aW9uVHlwZTooKT0+ay5lbCxDTElUZW1wbGF0ZTooKT0+ay55VyxDb250YWluZXJUZW1wbGF0ZUZyYWdtZW50TmFtZXM6KCk9PkMucDYsRG9jazooKT0+ZSxEb2NrQnV0dG9uTmFtZXM6KCk9PmMudixIb21lOigpPT5oLExlZ2FjeTooKT0+dCxQcmVzZW50YXRpb25UZW1wbGF0ZUZyYWdtZW50TmFtZXM6KCk9PkMuR28sU2VhcmNoVGFnQmFja2dyb3VuZDooKT0+UC53LFN0b3JlZnJvbnQ6KCk9PlMsU3RvcmVmcm9udFRlbXBsYXRlOigpPT5XLlQsVGVtcGxhdGVGcmFnbWVudFR5cGVzOigpPT5DLmJJfSk7dmFyIGU9e307bi5yKGUpLG4uZChlLHtEb2NrQnV0dG9uTmFtZXM6KCk9PmMudixkZXJlZ2lzdGVyOigpPT5sLG1pbmltaXplOigpPT5mLHJlZ2lzdGVyOigpPT5wLHNob3c6KCk9Pnd9KTt2YXIgdD17fTtuLnIodCksbi5kKHQse2dldFBhZ2VzOigpPT52LGdldFdvcmtzcGFjZXM6KCk9Pm19KTt2YXIgcj1uKDY3OCksaT1uKDUzMikscz1uKDQzNiksYT1uKDgyKSxjPW4oNDI3KTtsZXQgZCx1PSExO2NvbnN0IHA9ZT0+KGQ9bmV3IFByb21pc2UoKGFzeW5jKHQsbik9Pnt0cnl7Y29uc3Qgbj1hd2FpdChhc3luYyBlPT57Y29uc3QgdD1hd2FpdCgwLHMuWGwpKCk7aWYodSl0aHJvdyBuZXcgRXJyb3IoXCJBIGRvY2sgcHJvdmlkZXIgZm9yIHRoZSBwbGF0Zm9ybSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpO3JldHVybiB1PSEwLGUuY2xpZW50QVBJVmVyc2lvbj1yLnUwLHQuZGlzcGF0Y2gocy5XRi5SZWdpc3RlclByb3ZpZGVyLHtwcm92aWRlclR5cGU6YS5sUC5Eb2NrLGluZm86ZX0pfSkoZSk7KDAsaS5Xbikoe2FsbG93ZWQ6ITAsY29tcG9uZW50VmVyc2lvbjpuPy53b3Jrc3BhY2VWZXJzaW9ufSksdCh7Y2xpZW50QVBJVmVyc2lvbjpyLnUwLHdvcmtzcGFjZVZlcnNpb246bi53b3Jrc3BhY2VWZXJzaW9ufHxcIlwifSl9Y2F0Y2goZSl7KDAsaS5Xbikoe2FsbG93ZWQ6ITEscmVqZWN0aW9uQ29kZTplLm1lc3NhZ2V9KSxuKGUpLGQ9bnVsbH19KSksZCksbD1hc3luYygpPT57YXdhaXQgZCx1PSExO3JldHVybihhd2FpdCgwLHMuWGwpKCkpLmRpc3BhdGNoKHMuV0YuRGVyZWdpc3RlclByb3ZpZGVyLHtwcm92aWRlclR5cGU6YS5sUC5Eb2NrfSl9LGY9YXN5bmMoKT0+e2F3YWl0IGQsYXdhaXQoMCxzLmFCKSgpLGF3YWl0KDAsYS5SOCkoYS5sUC5Eb2NrKX0sdz1hc3luYygpPT57YXdhaXQgZCxhd2FpdCgwLHMuYUIpKCksYXdhaXQoMCxhLlhfKShhLmxQLkRvY2spfTt2YXIgZyxoPW4oNzAzKTtuKDEyMSk7IWZ1bmN0aW9uKGUpe2UuVGFiQ3JlYXRlZD1cInRhYi1jcmVhdGVkXCIsZS5Db250YWluZXJDcmVhdGVkPVwiY29udGFpbmVyLWNyZWF0ZWRcIixlLkNvbnRhaW5lclJlc2l6ZWQ9XCJjb250YWluZXItcmVzaXplZFwifShnfHwoZz17fSkpO25ldyBNYXA7dmFyIHk7IWZ1bmN0aW9uKGUpe2UuQ3VycmVudFdvcmtzcGFjZUlkPVwiY3VycmVudFdvcmtzcGFjZUlkXCIsZS5MYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3c9XCJsYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3dcIixlLk1hY2hpbmVOYW1lPVwibWFjaGluZU5hbWVcIixlLk5ld1RhYlBhZ2VMYXlvdXQ9XCJOZXdUYWJQYWdlTGF5b3V0XCIsZS5OZXdUYWJQYWdlU29ydD1cIk5ld1RhYlBhZ2VTb3J0XCIsZS5Eb2NrUG9zaXRpb249XCJEb2NrUG9zaXRpb25cIn0oeXx8KHk9e30pKTtjb25zdCB2PSgpPT5hc3luYyBmdW5jdGlvbigpe3JldHVybihhd2FpdCgwLHMuRG0pKCkpLmRpc3BhdGNoKHMuV0YuR2V0TGVnYWN5UGFnZXMsdm9pZCAwKX0oKSxtPSgpPT4oYXN5bmMoKT0+KGF3YWl0KDAscy5EbSkoKSkuZGlzcGF0Y2gocy5XRi5HZXRMZWdhY3lXb3Jrc3BhY2VzLHZvaWQgMCkpKCk7dmFyIFM9big1MjgpLFA9bigyOTgpLEM9bigxMDkpLGs9big3NTgpLFc9bigxMTQpfSkoKSxtb2R1bGUuZXhwb3J0cz1vfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVZpZXc7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXQ7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2Vha01hcDtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNYXA7XG4iLCIvKipcbiAqIENvbnZlcnRzIGFuIEFTQ0lJIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhc2NpaVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuc3BsaXQoJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzY2lpVG9BcnJheTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzVHlwZWRBcnJheTtcbiIsInZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuYXJ5O1xuIiwidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiBvZiBgcHJvcHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVZhbHVlcztcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFZhbHVlO1xuIiwiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHdpdGggW3plcm8td2lkdGggam9pbmVycyBvciBjb2RlIHBvaW50cyBmcm9tIHRoZSBhc3RyYWwgcGxhbmVzXShodHRwOi8vZWV2LmVlL2Jsb2cvMjAxNS8wOS8xMi9kYXJrLWNvcm5lcnMtb2YtdW5pY29kZS8pLiAqL1xudmFyIHJlSGFzVW5pY29kZSA9IFJlZ0V4cCgnWycgKyByc1pXSiArIHJzQXN0cmFsUmFuZ2UgICsgcnNDb21ib1JhbmdlICsgcnNWYXJSYW5nZSArICddJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSBzeW1ib2wgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZShzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZS50ZXN0KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzVW5pY29kZTtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuXG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlID09ICdudW1iZXInIHx8XG4gICAgICAodHlwZSAhPSAnc3ltYm9sJyAmJiByZUlzVWludC50ZXN0KHZhbHVlKSkpICYmXG4gICAgICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBpdGVyYXRvcmAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVyYXRvciBUaGUgaXRlcmF0b3IgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBpdGVyYXRvclRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgdmFyIGRhdGEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoIShkYXRhID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgcmVzdWx0LnB1c2goZGF0YS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpdGVyYXRvclRvQXJyYXk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG4iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUtleXM7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsInZhciBhc2NpaVRvQXJyYXkgPSByZXF1aXJlKCcuL19hc2NpaVRvQXJyYXknKSxcbiAgICBoYXNVbmljb2RlID0gcmVxdWlyZSgnLi9faGFzVW5pY29kZScpLFxuICAgIHVuaWNvZGVUb0FycmF5ID0gcmVxdWlyZSgnLi9fdW5pY29kZVRvQXJyYXknKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgID8gdW5pY29kZVRvQXJyYXkoc3RyaW5nKVxuICAgIDogYXNjaWlUb0FycmF5KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9BcnJheTtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9SYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNTeW1ib2wgPSAnKD86JyArIFtyc05vbkFzdHJhbCArIHJzQ29tYm8gKyAnPycsIHJzQ29tYm8sIHJzUmVnaW9uYWwsIHJzU3VyclBhaXIsIHJzQXN0cmFsXS5qb2luKCd8JykgKyAnKSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIFtzdHJpbmcgc3ltYm9sc10oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtdW5pY29kZSkuICovXG52YXIgcmVVbmljb2RlID0gUmVnRXhwKHJzRml0eiArICcoPz0nICsgcnNGaXR6ICsgJyl8JyArIHJzU3ltYm9sICsgcnNTZXEsICdnJyk7XG5cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiB1bmljb2RlVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGUpIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaWNvZGVUb0FycmF5O1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN0cmluZywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaW5nO1xuIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpLFxuICAgIGl0ZXJhdG9yVG9BcnJheSA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9yVG9BcnJheScpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKSxcbiAgICBzdHJpbmdUb0FycmF5ID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9BcnJheScpLFxuICAgIHZhbHVlcyA9IHJlcXVpcmUoJy4vdmFsdWVzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltSXRlcmF0b3IgPSBTeW1ib2wgPyBTeW1ib2wuaXRlcmF0b3IgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvQXJyYXkoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIF8udG9BcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ11cbiAqXG4gKiBfLnRvQXJyYXkoMSk7XG4gKiAvLyA9PiBbXVxuICpcbiAqIF8udG9BcnJheShudWxsKTtcbiAqIC8vID0+IFtdXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHZhbHVlKSA/IHN0cmluZ1RvQXJyYXkodmFsdWUpIDogY29weUFycmF5KHZhbHVlKTtcbiAgfVxuICBpZiAoc3ltSXRlcmF0b3IgJiYgdmFsdWVbc3ltSXRlcmF0b3JdKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yVG9BcnJheSh2YWx1ZVtzeW1JdGVyYXRvcl0oKSk7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICBmdW5jID0gdGFnID09IG1hcFRhZyA/IG1hcFRvQXJyYXkgOiAodGFnID09IHNldFRhZyA/IHNldFRvQXJyYXkgOiB2YWx1ZXMpO1xuXG4gIHJldHVybiBmdW5jKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5O1xuIiwidmFyIGJhc2VWYWx1ZXMgPSByZXF1aXJlKCcuL19iYXNlVmFsdWVzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gW10gOiBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZXM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2Vtb2ppJyk7IiwiLypqc2xpbnQgbm9kZTogdHJ1ZSovXG52YXIgdG9BcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC90b0FycmF5Jyk7XG52YXIgZW1vamlCeU5hbWUgPSByZXF1aXJlKCcuL2Vtb2ppLmpzb24nKTtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogcmVnZXggdG8gcGFyc2UgZW1vamkgaW4gYSBzdHJpbmcgLSBmaW5kcyBlbW9qaSwgZS5nLiA6Y29mZmVlOlxuICovXG52YXIgZW1vamlOYW1lUmVnZXggPSAvOihbYS16QS1aMC05X1xcLVxcK10rKTovZztcblxuLyoqXG4gKiByZWdleCB0byB0cmltIHdoaXRlc3BhY2VcbiAqIHVzZSBpbnN0ZWFkIG9mIFN0cmluZy5wcm90b3R5cGUudHJpbSgpIGZvciBJRTggc3VwcG9ydFxuICovXG52YXIgdHJpbVNwYWNlUmVnZXggPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cbi8qKlxuICogUmVtb3ZlcyBjb2xvbnMgb24gZWl0aGVyIHNpZGVcbiAqIG9mIHRoZSBzdHJpbmcgaWYgcHJlc2VudFxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaXBDb2xvbnMgKHN0cikge1xuICB2YXIgY29sb25JbmRleCA9IHN0ci5pbmRleE9mKCc6Jyk7XG4gIGlmIChjb2xvbkluZGV4ID4gLTEpIHtcbiAgICAvLyA6ZW1vamk6IChodHRwOi8vd3d3LmVtb2ppLWNoZWF0LXNoZWV0LmNvbS8pXG4gICAgaWYgKGNvbG9uSW5kZXggPT09IHN0ci5sZW5ndGggLSAxKSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGNvbG9uSW5kZXgpO1xuICAgICAgcmV0dXJuIHN0cmlwQ29sb25zKHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHIoY29sb25JbmRleCArIDEpO1xuICAgICAgcmV0dXJuIHN0cmlwQ29sb25zKHN0cik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBBZGRzIGNvbG9ucyB0byBlaXRoZXIgc2lkZVxuICogb2YgdGhlIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB3cmFwQ29sb25zIChzdHIpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIubGVuZ3RoID4gMCkgPyAnOicgKyBzdHIgKyAnOicgOiBzdHI7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgdGhlIHdvcmQgaXMgd3JhcHBlZCBpbiBjb2xvbnNcbiAqIGJ5IG9ubHkgYWRkaW5nIHRoZW0sIGlmIHRoZXkgYXJlIG5vdCB0aGVyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5zdXJlQ29sb25zIChzdHIpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHJbMF0gIT09ICc6JykgPyB3cmFwQ29sb25zKHN0cikgOiBzdHI7XG59XG5cbi8vIE5vbiBzcGFjaW5nIG1hcmssIHNvbWUgZW1vdGljb25zIGhhdmUgdGhlbS4gSXQncyB0aGUgJ1ZhcmlhbnQgRm9ybScsXG4vLyB3aGljaCBwcm92aWRlcyBtb3JlIGluZm9ybWF0aW9uIHNvIHRoYXQgZW1vdGljb25zIGNhbiBiZSByZW5kZXJlZCBhc1xuLy8gbW9yZSBjb2xvcmZ1bCBncmFwaGljcy4gRkUwRSBpcyBhIHVuaWNvZGUgdGV4dCB2ZXJzaW9uLCB3aGVyZSBhcyBGRTBGXG4vLyBzaG91bGQgYmUgcmVuZGVyZWQgYXMgYSBncmFwaGljYWwgdmVyc2lvbi4gVGhlIGNvZGUgZ3JhY2VmdWxseSBkZWdyYWRlcy5cbnZhciBOT05fU1BBQ0lOR19NQVJLID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTAzOSk7IC8vIDY1MDM5IC0gJ++4jycgLSAweEZFMEY7XG52YXIgbm9uU3BhY2luZ1JlZ2V4ID0gbmV3IFJlZ0V4cChOT05fU1BBQ0lOR19NQVJLLCAnZycpXG5cbi8vIFJlbW92ZSB0aGUgbm9uLXNwYWNpbmctbWFyayBmcm9tIHRoZSBjb2RlLCBuZXZlciBzZW5kIGEgc3RyaXBwZWQgdmVyc2lvblxuLy8gdG8gdGhlIGNsaWVudCwgYXMgaXQga2lsbHMgZ3JhcGhpY2FsIGVtb3RpY29ucy5cbmZ1bmN0aW9uIHN0cmlwTlNCIChjb2RlKSB7XG4gIHJldHVybiBjb2RlLnJlcGxhY2Uobm9uU3BhY2luZ1JlZ2V4LCAnJyk7XG59O1xuXG4vLyBSZXZlcnNlZCBoYXNoIHRhYmxlLCB3aGVyZSBhcyBlbW9qaUJ5TmFtZSBjb250YWlucyBhIHsgaGVhcnQ6ICfinaQnIH1cbi8vIGRpY3Rpb25hcnkgZW1vamlCeUNvZGUgY29udGFpbnMgeyDinaQ6ICdoZWFydCcgfS4gVGhlIGNvZGVzIGFyZSBub3JtYWxpemVkXG4vLyB0byB0aGUgdGV4dCB2ZXJzaW9uLlxudmFyIGVtb2ppQnlDb2RlID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpLnJlZHVjZShmdW5jdGlvbihoLGspIHtcbiAgaFtzdHJpcE5TQihlbW9qaUJ5TmFtZVtrXSldID0gaztcbiAgcmV0dXJuIGg7XG59LCB7fSk7XG5cbi8qKlxuICogRW1vamkgbmFtZXNwYWNlXG4gKi9cbnZhciBFbW9qaSA9IHtcbiAgZW1vamk6IGVtb2ppQnlOYW1lLFxufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgY29kZSBmcm9tIG5hbWUuIHJldHVybiBlbW9qaSBjb2RlIGJhY2sgaWYgY29kZSBpcyBwYXNzZWQgaW4uXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtb2ppXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLl9nZXQgPSBmdW5jdGlvbiBfZ2V0IChlbW9qaSkge1xuICBpZiAoZW1vamlCeUNvZGVbc3RyaXBOU0IoZW1vamkpXSkge1xuICAgIHJldHVybiBlbW9qaTtcbiAgfSBlbHNlIGlmIChlbW9qaUJ5TmFtZS5oYXNPd25Qcm9wZXJ0eShlbW9qaSkpIHtcbiAgICByZXR1cm4gZW1vamlCeU5hbWVbZW1vamldO1xuICB9XG5cbiAgcmV0dXJuIGVuc3VyZUNvbG9ucyhlbW9qaSk7XG59O1xuXG4vKipcbiAqIGdldCBlbW9qaSBjb2RlIGZyb20gOmVtb2ppOiBzdHJpbmcgb3IgbmFtZVxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5nZXQgPSBmdW5jdGlvbiBnZXQgKGVtb2ppKSB7XG4gIGVtb2ppID0gc3RyaXBDb2xvbnMoZW1vamkpO1xuXG4gIHJldHVybiBFbW9qaS5fZ2V0KGVtb2ppKTtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgZWl0aGVyIGNvZGUgb3IgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPckNvZGUgVGhlIGVtb2ppIHRvIGZpbmQsIGVpdGhlciBgY29mZmVlYCwgYDpjb2ZmZWU6YCBvciBg4piVYDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuZmluZCA9IGZ1bmN0aW9uIGZpbmQgKG5hbWVPckNvZGUpIHtcbiAgcmV0dXJuIEVtb2ppLmZpbmRCeU5hbWUobmFtZU9yQ29kZSkgfHwgRW1vamkuZmluZEJ5Q29kZShuYW1lT3JDb2RlKTtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGVtb2ppIHRvIGZpbmQgZWl0aGVyIGBjb2ZmZWVgIG9yIGA6Y29mZmVlOmA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmZpbmRCeU5hbWUgPSBmdW5jdGlvbiBmaW5kQnlOYW1lIChuYW1lKSB7XG4gIHZhciBzdHJpcHBlZCA9IHN0cmlwQ29sb25zKG5hbWUpO1xuICB2YXIgZW1vamkgPSBlbW9qaUJ5TmFtZVtzdHJpcHBlZF07XG5cbiAgcmV0dXJuIGVtb2ppID8gKHsgZW1vamk6IGVtb2ppLCBrZXk6IHN0cmlwcGVkIH0pIDogdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBmaW5kIHRoZSBlbW9qaSBieSBjb2RlIChlbW9qaSlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBlbW9qaSB0byBmaW5kOyBmb3IgZXhhbXBsZSBg4piVYCBvciBg4piUYFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5maW5kQnlDb2RlID0gZnVuY3Rpb24gZmluZEJ5Q29kZSAoY29kZSkge1xuICB2YXIgc3RyaXBwZWQgPSBzdHJpcE5TQihjb2RlKTtcbiAgdmFyIG5hbWUgPSBlbW9qaUJ5Q29kZVtzdHJpcHBlZF07XG5cbiAgLy8gbG9va3VwIGVtb2ppIHRvIGVuc3VyZSB0aGUgVmFyaWFudCBGb3JtIGlzIHJldHVybmVkXG4gIHJldHVybiBuYW1lID8gKHsgZW1vamk6IGVtb2ppQnlOYW1lW25hbWVdLCBrZXk6IG5hbWUgfSkgOiB1bmRlZmluZWQ7XG59O1xuXG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZW1vamkgaXMga25vd24gYnkgdGhpcyBsaWJyYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZU9yQ29kZSBUaGUgZW1vamkgdG8gdmFsaWRhdGUsIGVpdGhlciBgY29mZmVlYCwgYDpjb2ZmZWU6YCBvciBg4piVYDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamkgPSBmdW5jdGlvbiBoYXNFbW9qaSAobmFtZU9yQ29kZSkge1xuICByZXR1cm4gRW1vamkuaGFzRW1vamlCeU5hbWUobmFtZU9yQ29kZSkgfHwgRW1vamkuaGFzRW1vamlCeUNvZGUobmFtZU9yQ29kZSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVtb2ppIHdpdGggZ2l2ZW4gbmFtZSBpcyBrbm93biBieSB0aGlzIGxpYnJhcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBlbW9qaSB0byB2YWxpZGF0ZSBlaXRoZXIgYGNvZmZlZWAgb3IgYDpjb2ZmZWU6YDtcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamlCeU5hbWUgPSBmdW5jdGlvbiBoYXNFbW9qaUJ5TmFtZSAobmFtZSkge1xuICB2YXIgcmVzdWx0ID0gRW1vamkuZmluZEJ5TmFtZShuYW1lKTtcbiAgcmV0dXJuICEhcmVzdWx0ICYmIHJlc3VsdC5rZXkgPT09IHN0cmlwQ29sb25zKG5hbWUpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIGdpdmVuIGVtb2ppIGlzIGtub3duIGJ5IHRoaXMgbGlicmFyeVxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgVGhlIGVtb2ppIHRvIHZhbGlkYXRlOyBmb3IgZXhhbXBsZSBg4piVYCBvciBg4piUYFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5oYXNFbW9qaUJ5Q29kZSA9IGZ1bmN0aW9uIGhhc0Vtb2ppQnlDb2RlIChjb2RlKSB7XG4gIHZhciByZXN1bHQgPSBFbW9qaS5maW5kQnlDb2RlKGNvZGUpO1xuICByZXR1cm4gISFyZXN1bHQgJiYgc3RyaXBOU0IocmVzdWx0LmVtb2ppKSA9PT0gc3RyaXBOU0IoY29kZSk7XG59O1xuXG4vKipcbiAqIGdldCBlbW9qaSBuYW1lIGZyb20gY29kZVxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5jbHVkZUNvbG9ucyBzaG91bGQgdGhlIHJlc3VsdCBpbmNsdWRlIHRoZSA6OlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS53aGljaCA9IGZ1bmN0aW9uIHdoaWNoIChlbW9qaV9jb2RlLCBpbmNsdWRlQ29sb25zKSB7XG4gIHZhciBjb2RlID0gc3RyaXBOU0IoZW1vamlfY29kZSk7XG4gIHZhciB3b3JkID0gZW1vamlCeUNvZGVbY29kZV07XG5cbiAgcmV0dXJuIGluY2x1ZGVDb2xvbnMgPyB3cmFwQ29sb25zKHdvcmQpIDogd29yZDtcbn07XG5cbi8qKlxuICogZW1vamlmeSBhIHN0cmluZyAocmVwbGFjZSA6ZW1vamk6IHdpdGggYW4gZW1vamkpXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHBhcmFtICB7ZnVuY3Rpb259IG9uX21pc3NpbmcgKGdldHMgZW1vamkgbmFtZSB3aXRob3V0IDo6IGFuZCByZXR1cm5zIGEgcHJvcGVyIGVtb2ppIGlmIG5vIGVtb2ppIHdhcyBmb3VuZClcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmb3JtYXQgKHdyYXAgdGhlIHJldHVybmVkIGVtb2ppIGluIGEgY3VzdG9tIGVsZW1lbnQpXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLmVtb2ppZnkgPSBmdW5jdGlvbiBlbW9qaWZ5IChzdHIsIG9uX21pc3NpbmcsIGZvcm1hdCkge1xuICBpZiAoIXN0cikgcmV0dXJuICcnO1xuXG4gIHJldHVybiBzdHIuc3BsaXQoZW1vamlOYW1lUmVnZXgpIC8vIHBhcnNlIGVtb2ppIHZpYSByZWdleFxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiBwYXJzZUVtb2ppKHMsIGkpIHtcbiAgICAgICAgICAgICAgLy8gZXZlcnkgc2Vjb25kIGVsZW1lbnQgaXMgYW4gZW1vamksIGUuZy4gXCJ0ZXN0IDpmYXN0X2ZvcndhcmQ6XCIgLT4gWyBcInRlc3QgXCIsIFwiZmFzdF9mb3J3YXJkXCIgXVxuICAgICAgICAgICAgICBpZiAoaSAlIDIgPT09IDApIHJldHVybiBzO1xuICAgICAgICAgICAgICB2YXIgZW1vamkgPSBFbW9qaS5fZ2V0KHMpO1xuICAgICAgICAgICAgICB2YXIgaXNNaXNzaW5nID0gZW1vamkuaW5kZXhPZignOicpID4gLTE7XG5cbiAgICAgICAgICAgICAgaWYgKGlzTWlzc2luZyAmJiB0eXBlb2Ygb25fbWlzc2luZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbl9taXNzaW5nKHMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc01pc3NpbmcgJiYgdHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQoZW1vamksIHMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGVtb2ppO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKSAvLyBjb252ZXJ0IGJhY2sgdG8gc3RyaW5nXG4gIDtcbn07XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIGVtb2ppXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLnJhbmRvbSA9IGZ1bmN0aW9uIHJhbmRvbSAoKSB7XG4gIHZhciBlbW9qaUtleXMgPSBPYmplY3Qua2V5cyhlbW9qaUJ5TmFtZSk7XG4gIHZhciByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppS2V5cy5sZW5ndGgpO1xuICB2YXIga2V5ID0gZW1vamlLZXlzW3JhbmRvbUluZGV4XTtcbiAgdmFyIGVtb2ppID0gRW1vamkuX2dldChrZXkpO1xuICByZXR1cm4geyBrZXk6IGtleSwgZW1vamk6IGVtb2ppIH07XG59XG5cbi8qKlxuICogIHJldHVybiBhbiBjb2xsZWN0aW9uIG9mIHBvdGVudGlhbCBlbW9qaSBtYXRjaGVzXG4gKiAgQHBhcmFtIHtzdHJpbmd9IHN0clxuICogIEByZXR1cm4ge0FycmF5LjxPYmplY3Q+fVxuICovXG5FbW9qaS5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2ggKHN0cikge1xuICB2YXIgZW1vamlLZXlzID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpO1xuICB2YXIgbWF0Y2hlciA9IHN0cmlwQ29sb25zKHN0cilcbiAgdmFyIG1hdGNoaW5nS2V5cyA9IGVtb2ppS2V5cy5maWx0ZXIoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpLmluZGV4T2YobWF0Y2hlcikgPT09IDA7XG4gIH0pO1xuICByZXR1cm4gbWF0Y2hpbmdLZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBrZXksXG4gICAgICBlbW9qaTogRW1vamkuX2dldChrZXkpLFxuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIHVuZW1vamlmeSBhIHN0cmluZyAocmVwbGFjZSBlbW9qaSB3aXRoIDplbW9qaTopXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS51bmVtb2ppZnkgPSBmdW5jdGlvbiB1bmVtb2ppZnkgKHN0cikge1xuICBpZiAoIXN0cikgcmV0dXJuICcnO1xuICB2YXIgd29yZHMgPSB0b0FycmF5KHN0cik7XG5cbiAgcmV0dXJuIHdvcmRzLm1hcChmdW5jdGlvbih3b3JkKSB7XG4gICAgcmV0dXJuIEVtb2ppLndoaWNoKHdvcmQsIHRydWUpIHx8IHdvcmQ7XG4gIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiByZXBsYWNlIGVtb2ppcyB3aXRoIHJlcGxhY2VtZW50IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufHN0cmluZ30gdGhlIHN0cmluZyBvciBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBsYWNlIHRoZSBlbW9qaSB3aXRoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZCB0cmFpbGluZyB3aGl0ZXNwYWNlcyBiZSBjbGVhbmVkPyBEZWZhdWx0cyBmYWxzZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSAoc3RyLCByZXBsYWNlbWVudCwgY2xlYW5TcGFjZXMpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcblxuICB2YXIgcmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/IHJlcGxhY2VtZW50IDogZnVuY3Rpb24oKSB7IHJldHVybiByZXBsYWNlbWVudDsgfTtcbiAgdmFyIHdvcmRzID0gdG9BcnJheShzdHIpO1xuXG4gIHZhciByZXBsYWNlZCA9IHdvcmRzLm1hcChmdW5jdGlvbih3b3JkLCBpZHgpIHtcbiAgICB2YXIgZW1vamkgPSBFbW9qaS5maW5kQnlDb2RlKHdvcmQpO1xuXG4gICAgaWYgKGVtb2ppICYmIGNsZWFuU3BhY2VzICYmIHdvcmRzW2lkeCArIDFdID09PSAnICcpIHtcbiAgICAgIHdvcmRzW2lkeCArIDFdID0gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVtb2ppID8gcmVwbGFjZShlbW9qaSkgOiB3b3JkO1xuICB9KS5qb2luKCcnKTtcblxuICByZXR1cm4gY2xlYW5TcGFjZXMgPyByZXBsYWNlZC5yZXBsYWNlKHRyaW1TcGFjZVJlZ2V4LCAnJykgOiByZXBsYWNlZDtcbn07XG5cblxuLyoqXG4gKiByZW1vdmUgYWxsIGVtb2ppcyBmcm9tIGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkVtb2ppLnN0cmlwID0gZnVuY3Rpb24gc3RyaXAgKHN0cikge1xuICByZXR1cm4gRW1vamkucmVwbGFjZShzdHIsICcnLCB0cnVlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1vamk7XG4iLCJpbXBvcnQge1xuXHRDTElUZW1wbGF0ZSxcblx0dHlwZSBDTElGaWx0ZXIsXG5cdHR5cGUgSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdHR5cGUgSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdHR5cGUgSG9tZVNlYXJjaFJlc3BvbnNlLFxuXHR0eXBlIEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0ICogYXMgZW1vamkgZnJvbSBcIm5vZGUtZW1vamlcIjtcbmltcG9ydCB0eXBlIHsgSW50ZWdyYXRpb24sIEludGVncmF0aW9uTWFuYWdlciwgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGVscCB9IGZyb20gXCIuLi8uLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB0eXBlIHsgRW1vamlTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0RW1vamlUZW1wbGF0ZSB9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIEVtb2ppcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPEVtb2ppU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwiZW1vamlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgcmVzdWx0LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiA9IFwiRW1vamkgRGV0YWlsc1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSBlbW9qaSBjb3B5IGtleSBhY3Rpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTiA9IFwiQ29weSBLZXlcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgY29weSBrZXkgYWN0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTiA9IFwiQ29weSBFbW9qaVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gbWFuYWdlci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbk1hbmFnZXI6IEludGVncmF0aW9uTWFuYWdlciB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBpcyBiZWluZyByZWdpc3RlcmVkLlxuXHQgKiBAcGFyYW0gaW50ZWdyYXRpb25NYW5hZ2VyIFRoZSBtYW5hZ2VyIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBwYXJhbSBpbnRlZ3JhdGlvbiBUaGUgaW50ZWdyYXRpb24gZGV0YWlscy5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZWdpc3Rlcihcblx0XHRpbnRlZ3JhdGlvbk1hbmFnZXI6IEludGVncmF0aW9uTWFuYWdlcixcblx0XHRpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz5cblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25NYW5hZ2VyID0gaW50ZWdyYXRpb25NYW5hZ2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgaXMgYmVpbmcgZGVyZWdpc3RlcmVkLlxuXHQgKiBAcGFyYW0gaW50ZWdyYXRpb24gVGhlIGludGVncmF0aW9uIGRldGFpbHMuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZGVyZWdpc3RlcihpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4pOiBQcm9taXNlPHZvaWQ+IHt9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBpbnRlZ3JhdGlvbiBUaGUgaW50ZWdyYXRpb24gZGV0YWlscy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzPyhpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4pOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7RW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRH0taGVscGAsXG5cdFx0XHRcdHRpdGxlOiBcIi9lbW9qaVwiLFxuXHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdGljb246IGludGVncmF0aW9uLmljb24sXG5cdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cHJvdmlkZXJJZDogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0ZW1wbGF0ZTogQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IGNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XCIvZW1vamlcIixcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcIlRoZSBlbW9qaSBjb21tYW5kIGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgZW1vamlzIGJ5IG5hbWUuXCIsXG5cdFx0XHRcdFx0XHRcIkZvciBleGFtcGxlIHRvIHNlYXJjaCBmb3IgZW1vamlzIHdoaWNoIGluY2x1ZGUgYHdvbWFuYCBvciBgbWFuYCBpbiB0aGVpciBuYW1lLlwiXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRbXCIvZW1vamkgd29tYW5cIiwgXCIvZW1vamkgbWFuXCJdXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gaW50ZWdyYXRpb24gVGhlIGludGVncmF0aW9uIGRldGFpbHMuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0aW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+LFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBkYXRhOiB7IHVybD86IHN0cmluZyB9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0cmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OICYmXG5cdFx0XHRcdHJlc3VsdC5kYXRhLmVtb2ppXG5cdFx0XHQpIHtcblx0XHRcdFx0YXdhaXQgZmluLkNsaXBib2FyZC53cml0ZVRleHQoeyBkYXRhOiByZXN1bHQuZGF0YS5lbW9qaSB9KTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRyZXN1bHQuYWN0aW9uLm5hbWUgPT09IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OICYmXG5cdFx0XHRcdHJlc3VsdC5kYXRhLmtleVxuXHRcdFx0KSB7XG5cdFx0XHRcdGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHsgZGF0YTogcmVzdWx0LmRhdGEua2V5IH0pO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiAmJlxuXHRcdFx0XHRyZXN1bHQuZGF0YS51cmwgJiZcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25NYW5hZ2VyLm9wZW5Vcmxcblx0XHRcdCkge1xuXHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbk1hbmFnZXIub3BlblVybChkYXRhLnVybCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdGludGVncmF0aW9uOiBJbnRlZ3JhdGlvbjxFbW9qaVNldHRpbmdzPixcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmIChxdWVyeS5zdGFydHNXaXRoKFwiL2Vtb2ppIFwiKSkge1xuXHRcdFx0bGV0IGtleSA9IHF1ZXJ5LnNsaWNlKDcpO1xuXG5cdFx0XHRpZiAoa2V5Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0a2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdFx0Ly8gRmluZCBleGFjdCBtYXRjaCBmaXJzdCBpZiB0aGVyZSBpcyBvbmVcblx0XHRcdFx0Y29uc3QgbWF0Y2hFbW9qaSA9IGVtb2ppLmdldChrZXkpO1xuXHRcdFx0XHRpZiAobWF0Y2hFbW9qaSAmJiAhbWF0Y2hFbW9qaS5zdGFydHNXaXRoKFwiOlwiKSkge1xuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLmNyZWF0ZVJlc3VsdChrZXksIG1hdGNoRW1vamkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZpbmQgYWxsIG90aGVyIHBvdGVudGlhbCBtYXRjaGVzXG5cdFx0XHRcdGNvbnN0IHNlYXJjaFJlc3VsdCA9IGVtb2ppLnNlYXJjaChrZXkpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgcmVzdWx0IG9mIHNlYXJjaFJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuZW1vamkgIT09IG1hdGNoRW1vamkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLmNyZWF0ZVJlc3VsdChyZXN1bHQua2V5LCByZXN1bHQuZW1vamkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgc2VhcmNoIHJlc3VsdC5cblx0ICogQHBhcmFtIGtleSBUaGUga2V5IGZvciB0aGUgZW1vamkuXG5cdCAqIEBwYXJhbSBzeW1ib2wgVGhlIGVtb2ppIHN5bWJvbC5cblx0ICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc3VsdChrZXk6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQ+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBgZW1vamktJHtrZXl9YCxcblx0XHRcdHRpdGxlOiBrZXksXG5cdFx0XHRsYWJlbDogXCJJbmZvcm1hdGlvblwiLFxuXHRcdFx0YWN0aW9uczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTixcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK0NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTixcblx0XHRcdFx0XHRob3RrZXk6IFwiRW50ZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGVtb2ppOiBzeW1ib2wsXG5cdFx0XHRcdHVybDogYGh0dHBzOi8vZW1vamlwZWRpYS5vcmcvJHtrZXl9L2Bcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdGxheW91dDogYXdhaXQgZ2V0RW1vamlUZW1wbGF0ZSh7XG5cdFx0XHRcdFx0Y29weUVtb2ppQWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OLFxuXHRcdFx0XHRcdGNvcHlLZXlBY3Rpb246IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OLFxuXHRcdFx0XHRcdGRldGFpbHNBY3Rpb246IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfREVUQUlMU19BQ1RJT05cblx0XHRcdFx0fSksXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRrZXlUaXRsZTogXCJLZXlcIixcblx0XHRcdFx0XHRjb3B5S2V5VGl0bGU6IFwiQ29weSBLZXlcIixcblx0XHRcdFx0XHRrZXksXG5cdFx0XHRcdFx0ZW1vamlUaXRsZTogXCJFbW9qaVwiLFxuXHRcdFx0XHRcdGNvcHlFbW9qaVRpdGxlOiBcIkNvcHkgRW1vamlcIixcblx0XHRcdFx0XHRlbW9qaTogc3ltYm9sLFxuXHRcdFx0XHRcdGRldGFpbHNUaXRsZTogXCJGdXJ0aGVyIERldGFpbHNcIlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uU3R5bGUsIFRlbXBsYXRlRnJhZ21lbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgeyBjcmVhdGVCdXR0b24sIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlVGV4dCB9IGZyb20gXCIuLi8uLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRUaGVtZSB9IGZyb20gXCIuLi8uLi90aGVtZXNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEVtb2ppVGVtcGxhdGUoYWN0aW9uczoge1xuXHRjb3B5RW1vamlBY3Rpb246IHN0cmluZztcblx0Y29weUtleUFjdGlvbjogc3RyaW5nO1xuXHRkZXRhaWxzQWN0aW9uOiBzdHJpbmc7XG59KTogUHJvbWlzZTxUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cblx0cmV0dXJuIGNyZWF0ZUNvbnRhaW5lcihcblx0XHRcImNvbHVtblwiLFxuXHRcdFtcblx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoXCJrZXlUaXRsZVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS5icmFuZFByaW1hcnksIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlVGV4dChcImtleVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0RGVmYXVsdCwgd29yZEJyZWFrOiBcImJyZWFrLWFsbFwiIH0pLFxuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUtleVRpdGxlXCIsIGFjdGlvbnMuY29weUtleUFjdGlvbiwge1xuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTJweFwiXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIixcblx0XHRcdFx0XHRhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuXHRcdFx0XHRcdGdhcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0bWFyZ2luQm90dG9tOiBcIjEwcHhcIlxuXHRcdFx0XHR9XG5cdFx0XHQpLFxuXG5cdFx0XHRhd2FpdCBjcmVhdGVUZXh0KFwiZW1vamlUaXRsZVwiLCAxMiwgeyBjb2xvcjogdGhlbWUucGFsZXR0ZS5icmFuZFByaW1hcnksIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlVGV4dChcImVtb2ppXCIsIDMyLCB7IGNvbG9yOiB0aGVtZS5wYWxldHRlLnRleHREZWZhdWx0IH0pLFxuXHRcdFx0XHRcdGF3YWl0IGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUVtb2ppVGl0bGVcIiwgYWN0aW9ucy5jb3B5RW1vamlBY3Rpb24sIHtcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEycHhcIlxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG5cdFx0XHRcdFx0YWxpZ25JdGVtczogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRnYXA6IFwiMTBweFwiLFxuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0fVxuXHRcdFx0KSxcblxuXHRcdFx0YXdhaXQgY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcInJvd1wiLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0YXdhaXQgY3JlYXRlQnV0dG9uKEJ1dHRvblN0eWxlLlByaW1hcnksIFwiZGV0YWlsc1RpdGxlXCIsIGFjdGlvbnMuZGV0YWlsc0FjdGlvbiwge1xuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTJweFwiXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XSxcblx0XHRcdFx0eyBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH1cblx0XHRcdClcblx0XHRdLFxuXHRcdHtcblx0XHRcdHBhZGRpbmc6IFwiMTBweFwiXG5cdFx0fVxuXHQpO1xufVxuIiwiaW1wb3J0IHsgQ3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxubGV0IHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29uZmlndXJlZFNldHRpbmdzKCk6IFByb21pc2U8Q3VzdG9tU2V0dGluZ3M+IHtcblx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0Y29uc3QgbWFuaWZlc3Q6IE9wZW5GaW4uTWFuaWZlc3QgJiB7IGN1c3RvbVNldHRpbmdzPzogQ3VzdG9tU2V0dGluZ3MgfSA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdGlmIChtYW5pZmVzdC5jdXN0b21TZXR0aW5ncyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c2V0dGluZ3MgPSBtYW5pZmVzdC5jdXN0b21TZXR0aW5ncztcblx0fSBlbHNlIHtcblx0XHRzZXR0aW5ncyA9IHt9O1xuXHR9XG5cblx0cmV0dXJuIHNldHRpbmdzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxDdXN0b21TZXR0aW5ncz4ge1xuXHRpZiAoc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdHNldHRpbmdzID0gYXdhaXQgZ2V0Q29uZmlndXJlZFNldHRpbmdzKCk7XG5cdH1cblx0cmV0dXJuIHNldHRpbmdzO1xufVxuIiwiaW1wb3J0IHtcblx0QnV0dG9uU3R5bGUsXG5cdEJ1dHRvblRlbXBsYXRlRnJhZ21lbnQsXG5cdEltYWdlVGVtcGxhdGVGcmFnbWVudCxcblx0UGxhaW5Db250YWluZXJUZW1wbGF0ZUZyYWdtZW50LFxuXHRUZW1wbGF0ZUZyYWdtZW50LFxuXHRUZW1wbGF0ZUZyYWdtZW50VHlwZXMsXG5cdFRleHRUZW1wbGF0ZUZyYWdtZW50XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCAqIGFzIENTUyBmcm9tIFwiY3NzdHlwZVwiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFRoZW1lIH0gZnJvbSBcIi4vdGhlbWVzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVIZWxwKFxuXHR0aXRsZTogc3RyaW5nLFxuXHRkZXNjcmlwdGlvbjogc3RyaW5nW10sXG5cdGV4YW1wbGVzOiBzdHJpbmdbXVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKTogUHJvbWlzZTx7IGxheW91dDogUGxhaW5Db250YWluZXJUZW1wbGF0ZUZyYWdtZW50OyBkYXRhOiBhbnkgfT4ge1xuXHRjb25zdCB0aGVtZSA9IGF3YWl0IGdldEN1cnJlbnRUaGVtZSgpO1xuXHRjb25zdCBhZGRpdGlvbmFsRGF0YSA9IHt9O1xuXHRjb25zdCBmcmFnbWVudHM6IFRlbXBsYXRlRnJhZ21lbnRbXSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NyaXB0aW9uLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb25LZXkgPSBgZGVzYy0ke2l9YDtcblx0XHRhZGRpdGlvbmFsRGF0YVtkZXNjcmlwdGlvbktleV0gPSBkZXNjcmlwdGlvbltpXTtcblx0XHRmcmFnbWVudHMucHVzaChcblx0XHRcdGF3YWl0IGNyZWF0ZVRleHQoZGVzY3JpcHRpb25LZXksIDEyLCB7XG5cdFx0XHRcdHBhZGRpbmc6IFwiNnB4IDBweFwiXG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblx0Y29uc3QgZXhhbXBsZUZyYWdtZW50czogVGVtcGxhdGVGcmFnbWVudFtdID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZXhhbXBsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBleGFtcGxlS2V5ID0gYGxpbmUtJHtpfWA7XG5cdFx0YWRkaXRpb25hbERhdGFbZXhhbXBsZUtleV0gPSBleGFtcGxlc1tpXTtcblx0XHRleGFtcGxlRnJhZ21lbnRzLnB1c2goXG5cdFx0XHRhd2FpdCBjcmVhdGVUZXh0KGV4YW1wbGVLZXksIDEyLCB7XG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCJcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxuXHRpZiAoZXhhbXBsZUZyYWdtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0ZnJhZ21lbnRzLnB1c2goXG5cdFx0XHRhd2FpdCBjcmVhdGVDb250YWluZXIoXCJjb2x1bW5cIiwgZXhhbXBsZUZyYWdtZW50cywge1xuXHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIixcblx0XHRcdFx0bWFyZ2luVG9wOiBcIjZweFwiLFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUuYmFja2dyb3VuZDUsXG5cdFx0XHRcdGNvbG9yOiB0aGVtZS5wYWxldHRlLmlucHV0Q29sb3IsXG5cdFx0XHRcdGJvcmRlclJhZGl1czogXCI1cHhcIlxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0bGF5b3V0OiBhd2FpdCBjcmVhdGVDb250YWluZXIoXCJjb2x1bW5cIiwgW2F3YWl0IGNyZWF0ZVRpdGxlKFwidGl0bGVcIiksIC4uLmZyYWdtZW50c10sIHtcblx0XHRcdHBhZGRpbmc6IFwiMTBweFwiXG5cdFx0fSksXG5cdFx0ZGF0YToge1xuXHRcdFx0dGl0bGUsXG5cdFx0XHQuLi5hZGRpdGlvbmFsRGF0YVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihcblx0Y29udGFpbmVyVHlwZTogXCJjb2x1bW5cIiB8IFwicm93XCIsXG5cdGNoaWxkcmVuOiBUZW1wbGF0ZUZyYWdtZW50W10sXG5cdHN0eWxlPzogQ1NTLlByb3BlcnRpZXNcbik6IFByb21pc2U8UGxhaW5Db250YWluZXJUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkNvbnRhaW5lcixcblx0XHRzdHlsZToge1xuXHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRmbGV4RGlyZWN0aW9uOiBjb250YWluZXJUeXBlLFxuXHRcdFx0Li4uc3R5bGVcblx0XHR9LFxuXHRcdGNoaWxkcmVuXG5cdH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUaXRsZShcblx0ZGF0YUtleTogc3RyaW5nLFxuXHRmb250U2l6ZTogbnVtYmVyID0gMTYsXG5cdGZvbnRXZWlnaHQ6IHN0cmluZyA9IFwiYm9sZFwiLFxuXHRzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQcm9taXNlPFRleHRUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLlRleHQsXG5cdFx0ZGF0YUtleSxcblx0XHRzdHlsZToge1xuXHRcdFx0Y29sb3I6IHRoZW1lLnBhbGV0dGUuYnJhbmRQcmltYXJ5LFxuXHRcdFx0Zm9udFNpemU6IGAke2ZvbnRTaXplID8/IDE2fXB4YCxcblx0XHRcdGZvbnRXZWlnaHQsXG5cdFx0XHQuLi5zdHlsZVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRleHQoXG5cdGRhdGFLZXk6IHN0cmluZyxcblx0Zm9udFNpemU6IG51bWJlciA9IDE0LFxuXHRzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQcm9taXNlPFRleHRUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLlRleHQsXG5cdFx0ZGF0YUtleSxcblx0XHRzdHlsZToge1xuXHRcdFx0Zm9udFNpemU6IGAke2ZvbnRTaXplID8/IDE0fXB4YCxcblx0XHRcdC4uLnN0eWxlXG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW1hZ2UoXG5cdGRhdGFLZXk6IHN0cmluZyxcblx0YWx0ZXJuYXRpdmVUZXh0OiBzdHJpbmcsXG5cdHN0eWxlPzogQ1NTLlByb3BlcnRpZXNcbik6IFByb21pc2U8SW1hZ2VUZW1wbGF0ZUZyYWdtZW50PiB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkltYWdlLFxuXHRcdGRhdGFLZXksXG5cdFx0YWx0ZXJuYXRpdmVUZXh0LFxuXHRcdHN0eWxlOiB7XG5cdFx0XHQuLi5zdHlsZVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihcblx0YnV0dG9uU3R5bGU6IEJ1dHRvblN0eWxlLFxuXHR0aXRsZUtleTogc3RyaW5nLFxuXHRhY3Rpb246IHN0cmluZyxcblx0c3R5bGU/OiBDU1MuUHJvcGVydGllc1xuKTogUHJvbWlzZTxCdXR0b25UZW1wbGF0ZUZyYWdtZW50PiB7XG5cdGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0Q3VycmVudFRoZW1lKCk7XG5cdGNvbnN0IGJ1dHRvbk9wdGlvbnMgPVxuXHRcdGJ1dHRvblN0eWxlID09PSBCdXR0b25TdHlsZS5TZWNvbmRhcnlcblx0XHRcdD8ge1xuXHRcdFx0XHRcdGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuaW5wdXRDb2xvcn1gXG5cdFx0XHQgIH1cblx0XHRcdDoge307XG5cdHJldHVybiB7XG5cdFx0dHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkJ1dHRvbixcblx0XHRidXR0b25TdHlsZSxcblx0XHRjaGlsZHJlbjogW2F3YWl0IGNyZWF0ZVRleHQodGl0bGVLZXksIDEyKV0sXG5cdFx0YWN0aW9uLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHQuLi5idXR0b25PcHRpb25zLFxuXHRcdFx0Li4uc3R5bGVcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgeyBDdXN0b21UaGVtZXMgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgeyBDdXN0b21QYWxldHRlU2V0LCBDdXN0b21UaGVtZU9wdGlvbnMgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtL2NvbW1vbi9zcmMvYXBpL3RoZW1pbmdcIjtcbmltcG9ydCB7IGdldFNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcblxuY29uc3QgREVGQVVMVF9QQUxFVFRFUyA9IHtcblx0bGlnaHQ6IHtcblx0XHRicmFuZFByaW1hcnk6IFwiIzUwNENGRlwiLFxuXHRcdGJyYW5kU2Vjb25kYXJ5OiBcIiMxRTFGMjNcIixcblx0XHRiYWNrZ3JvdW5kUHJpbWFyeTogXCIjRkFGQkZFXCIsXG5cdFx0YmFja2dyb3VuZDE6IFwiI0ZGRkZGRlwiLFxuXHRcdGJhY2tncm91bmQyOiBcIiNGQUZCRkVcIixcblx0XHRiYWNrZ3JvdW5kMzogXCIjRjNGNUY4XCIsXG5cdFx0YmFja2dyb3VuZDQ6IFwiI0VDRUVGMVwiLFxuXHRcdGJhY2tncm91bmQ1OiBcIiNERERGRTRcIixcblx0XHRiYWNrZ3JvdW5kNjogXCIjQzlDQkQyXCIsXG5cdFx0c3RhdHVzU3VjY2VzczogXCIjMzVDNzU5XCIsXG5cdFx0c3RhdHVzV2FybmluZzogXCIjRjQ4RjAwXCIsXG5cdFx0c3RhdHVzQ3JpdGljYWw6IFwiI0JFMUQxRlwiLFxuXHRcdHN0YXR1c0FjdGl2ZTogXCIjMDQ5OEZCXCIsXG5cdFx0aW5wdXRCYWNrZ3JvdW5kOiBcIiNFQ0VFRjFcIixcblx0XHRpbnB1dENvbG9yOiBcIiMxRTFGMjNcIixcblx0XHRpbnB1dFBsYWNlaG9sZGVyOiBcIiMzODNBNDBcIixcblx0XHRpbnB1dERpc2FibGVkOiBcIiM3RDgwOEFcIixcblx0XHRpbnB1dEZvY3VzZWQ6IFwiI0M5Q0JEMlwiLFxuXHRcdHRleHREZWZhdWx0OiBcIiMxRTFGMjNcIixcblx0XHR0ZXh0SGVscDogXCIjMkYzMTM2XCIsXG5cdFx0dGV4dEluYWN0aXZlOiBcIiM3RDgwOEFcIlxuXHR9LFxuXHRkYXJrOiB7XG5cdFx0YnJhbmRQcmltYXJ5OiBcIiM1MDRDRkZcIixcblx0XHRicmFuZFNlY29uZGFyeTogXCIjMzgzQTQwXCIsXG5cdFx0YmFja2dyb3VuZFByaW1hcnk6IFwiIzFFMUYyM1wiLFxuXHRcdGJhY2tncm91bmQxOiBcIiMxMTEyMTRcIixcblx0XHRiYWNrZ3JvdW5kMjogXCIjMUUxRjIzXCIsXG5cdFx0YmFja2dyb3VuZDM6IFwiIzI0MjYyQlwiLFxuXHRcdGJhY2tncm91bmQ0OiBcIiMyRjMxMzZcIixcblx0XHRiYWNrZ3JvdW5kNTogXCIjMzgzQTQwXCIsXG5cdFx0YmFja2dyb3VuZDY6IFwiIzUzNTY1RlwiLFxuXHRcdHN0YXR1c1N1Y2Nlc3M6IFwiIzM1Qzc1OVwiLFxuXHRcdHN0YXR1c1dhcm5pbmc6IFwiI0Y0OEYwMFwiLFxuXHRcdHN0YXR1c0NyaXRpY2FsOiBcIiNCRTFEMUZcIixcblx0XHRzdGF0dXNBY3RpdmU6IFwiIzA0OThGQlwiLFxuXHRcdGlucHV0QmFja2dyb3VuZDogXCIjNTM1NjVGXCIsXG5cdFx0aW5wdXRDb2xvcjogXCIjRkZGRkZGXCIsXG5cdFx0aW5wdXRQbGFjZWhvbGRlcjogXCIjQzlDQkQyXCIsXG5cdFx0aW5wdXREaXNhYmxlZDogXCIjN0Q4MDhBXCIsXG5cdFx0aW5wdXRGb2N1c2VkOiBcIiNDOUNCRDJcIixcblx0XHR0ZXh0RGVmYXVsdDogXCIjRkZGRkZGXCIsXG5cdFx0dGV4dEhlbHA6IFwiI0M5Q0JEMlwiLFxuXHRcdHRleHRJbmFjdGl2ZTogXCIjN0Q4MDhBXCJcblx0fVxufTtcblxubGV0IHZhbGlkYXRlZFRoZW1lczogQ3VzdG9tVGhlbWVzO1xuXG5mdW5jdGlvbiBnZXRTeXN0ZW1QcmVmZXJyZWRDb2xvclNjaGVtZSgpOiBcImxpZ2h0XCIgfCBcImRhcmtcIiB7XG5cdGlmICh3aW5kb3cubWF0Y2hNZWRpYT8uKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG5cdFx0cmV0dXJuIFwiZGFya1wiO1xuXHR9XG5cdHJldHVybiBcImxpZ2h0XCI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VGhlbWUoKTogUHJvbWlzZTxDdXN0b21UaGVtZU9wdGlvbnM+IHtcblx0Y29uc3QgdGhlbWVzID0gYXdhaXQgZ2V0VGhlbWVzKCk7XG5cdGlmICh0aGVtZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxhYmVsOiBcImRlZmF1bHRcIixcblx0XHRcdHBhbGV0dGU6IERFRkFVTFRfUEFMRVRURVMuZGFya1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIHRoZW1lc1swXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRoZW1lcygpOiBQcm9taXNlPEN1c3RvbVRoZW1lcz4ge1xuXHRpZiAoIXZhbGlkYXRlZFRoZW1lcykge1xuXHRcdGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKTtcblx0XHR2YWxpZGF0ZWRUaGVtZXMgPSB2YWxpZGF0ZVRoZW1lcyhzZXR0aW5ncz8udGhlbWVQcm92aWRlcj8udGhlbWVzKTtcblx0fVxuXHRyZXR1cm4gdmFsaWRhdGVkVGhlbWVzLnNsaWNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVRoZW1lcyh0aGVtZXM6IEN1c3RvbVRoZW1lcyk6IEN1c3RvbVRoZW1lcyB7XG5cdGNvbnN0IGN1c3RvbVRoZW1lczogQ3VzdG9tVGhlbWVzID0gW107XG5cblx0aWYgKEFycmF5LmlzQXJyYXkodGhlbWVzKSkge1xuXHRcdGNvbnN0IHByZWZlcnJlZENvbG9yU2NoZW1lID0gZ2V0U3lzdGVtUHJlZmVycmVkQ29sb3JTY2hlbWUoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhlbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCB0aGVtZVRvVmFsaWRhdGUgPSB0aGVtZXNbaV07XG5cdFx0XHRjb25zdCBwYWxldHRlID0gdmFsaWRhdGVQYWxldHRlKHRoZW1lVG9WYWxpZGF0ZS5wYWxldHRlLCB0aGVtZVRvVmFsaWRhdGUubGFiZWwpO1xuXHRcdFx0aWYgKHBhbGV0dGUgIT09IG51bGwpIHtcblx0XHRcdFx0dGhlbWVUb1ZhbGlkYXRlLnBhbGV0dGUgPSBwYWxldHRlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gZG9uJ3QgcGFzcyBhbiBlbXB0eSBvYmplY3QgYXMgdGhlcmUgYXJlIG5vIHRoZW1lIHByb3BlcnRpZXNcblx0XHRcdFx0dGhlbWVUb1ZhbGlkYXRlLnBhbGV0dGUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhlbWVUb1ZhbGlkYXRlLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09IHByZWZlcnJlZENvbG9yU2NoZW1lKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdGBGb3VuZCBhIHRoZW1lIHRoYXQgbWF0Y2hlcyBzeXN0ZW0gY29sb3Igc2NoZW1lIHByZWZlcmVuY2VzIGFuZCBtYWtpbmcgaXQgdGhlIGRlZmF1bHQgdGhlbWU6ICR7cHJlZmVycmVkQ29sb3JTY2hlbWV9YFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjdXN0b21UaGVtZXMudW5zaGlmdCh0aGVtZVRvVmFsaWRhdGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VzdG9tVGhlbWVzLnB1c2godGhlbWVUb1ZhbGlkYXRlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VzdG9tVGhlbWVzO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBhbGV0dGUoXG5cdHRoZW1lUGFsZXR0ZTogQ3VzdG9tUGFsZXR0ZVNldCB8IHVuZGVmaW5lZCxcblx0dGhlbWVMYWJlbDogc3RyaW5nXG4pOiBDdXN0b21QYWxldHRlU2V0IHwgbnVsbCB7XG5cdGlmICghdGhlbWVQYWxldHRlKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhlbWVQYWxldHRlKTtcblx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBwYWxldHRlOiBDdXN0b21QYWxldHRlU2V0ID0ge1xuXHRcdC4uLkRFRkFVTFRfUEFMRVRURVMuZGFya1xuXHR9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRpZiAoXG5cdFx0XHR0aGVtZVBhbGV0dGVba2V5XSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHR0aGVtZVBhbGV0dGVba2V5XSAhPT0gbnVsbCAmJlxuXHRcdFx0dGhlbWVQYWxldHRlW2tleV0udHJpbSgpLmxlbmd0aCA+IDBcblx0XHQpIHtcblx0XHRcdHBhbGV0dGVba2V5XSA9IHRoZW1lUGFsZXR0ZVtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGJyYW5kUHJpbWFyeUtleSA9IFwiYnJhbmRQcmltYXJ5XCI7XG5cdGNvbnN0IGJyYW5kU2Vjb25kYXJ5S2V5ID0gXCJicmFuZFNlY29uZGFyeVwiO1xuXHRjb25zdCBiYWNrZ3JvdW5kUHJpbWFyeUtleSA9IFwiYmFja2dyb3VuZFByaW1hcnlcIjtcblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVticmFuZFByaW1hcnlLZXldKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YFRoZW1lOiAke3RoZW1lTGFiZWx9IDogJHticmFuZFByaW1hcnlLZXl9IG5vdCBzcGVjaWZpZWQgKGl0IGlzIHJlcXVpcmVkIGlmIHNwZWNpZnlpbmcgb3RoZXIgdGhlbWUgcGFsZXR0ZSBzZXR0aW5ncykuIFByb3ZpZGluZyBkZWZhdWx0IG9mOiAke0RFRkFVTFRfUEFMRVRURVMuZGFyay5icmFuZFByaW1hcnl9YFxuXHRcdCk7XG5cdH1cblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVticmFuZFNlY29uZGFyeUtleV0pIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgVGhlbWU6ICR7dGhlbWVMYWJlbH0gOiAke2JyYW5kU2Vjb25kYXJ5S2V5fSBub3Qgc3BlY2lmaWVkIChpdCBpcyByZXF1aXJlZCBpZiBzcGVjaWZ5aW5nIG90aGVyIHRoZW1lIHBhbGV0dGUgc2V0dGluZ3MpLiBQcm92aWRpbmcgZGVmYXVsdCBvZjogJHtERUZBVUxUX1BBTEVUVEVTLmRhcmsuYnJhbmRTZWNvbmRhcnl9YFxuXHRcdCk7XG5cdH1cblxuXHRpZiAoIXRoZW1lUGFsZXR0ZVtiYWNrZ3JvdW5kUHJpbWFyeUtleV0pIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgVGhlbWU6ICR7dGhlbWVMYWJlbH0gOiAke2JhY2tncm91bmRQcmltYXJ5S2V5fSBub3Qgc3BlY2lmaWVkIChpdCBpcyByZXF1aXJlZCBpZiBzcGVjaWZ5aW5nIG90aGVyIHRoZW1lIHBhbGV0dGUgc2V0dGluZ3MpLiBQcm92aWRpbmcgZGVmYXVsdCBvZjogJHtERUZBVUxUX1BBTEVUVEVTLmRhcmsuYnJhbmRQcmltYXJ5fWBcblx0XHQpO1xuXHR9XG5cblx0cmV0dXJuIHBhbGV0dGU7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJpbXBvcnQgeyBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvbi1wcm92aWRlclwiO1xuXG5leHBvcnQgY29uc3QgaW50ZWdyYXRpb24gPSBuZXcgRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=