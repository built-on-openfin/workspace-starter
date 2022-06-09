/******/ var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/workspace/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/@openfin/workspace/index.js ***!
  \******************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={3133:(e,t,n)=>{n.r(t),n.d(t,{CLIAction:()=>ze.Pt,CLIFilterOptionType:()=>ze.el,CLITemplate:()=>ze.yW,deregister:()=>Ye,hide:()=>tt,register:()=>Qe,show:()=>et});var r={};n.r(r),n.d(r,{subscribe:()=>oe});var o={};n.r(o),n.d(o,{create:()=>Ge});var i=n(6532),s=n(7405);const a="home";var c;!function(e){e.Commands="home-commands"}(c||(c={}));var d,u=n(5806);n(7564);!function(e){e[e.Initial=0]="Initial",e[e.Open=1]="Open",e[e.Close=2]="Close"}(d||(d={}));const f="all",l="0",p="5",g="6",w=()=>{};function h(e,t){return e?`${e}-${t}`:t}function y(e){return`__search-${e}-topic__`}const v=new Map;function m(e,t){v.has(e)||v.set(e,new Set),v.get(e).add(t)}function S(e,t){const n=v.get(e);n&&n.delete(t)}const C=new Map;function P(e,t){C.has(e)||C.set(e,new Set),C.get(e).add(t)}function R(e,t){const n=C.get(e);n&&n.delete(t)}const b=new Map;async function T(e,t){b.has(e)||b.set(e,new Map),b.get(e).set(t.id,t);const n=v.get(e);if(!n)return;const r=[...n].map((e=>e()));await Promise.all(r)}async function I(e,t){const n=b.get(e);if(!n)return;n.delete(t);const r=C.get(e);if(!r)return;const o=[...r].map((e=>e()));await Promise.all(o)}function L(e){return b.get(e)?[...b.get(e).values()]:[]}function k(e){const t=b.get(e);t&&t.clear()}function M(e,t){const n=b.get(e);return n?n.get(t):null}function B(e,t,n){return{...e,action:n||e.actions[0],dispatcherIdentity:t}}function O(e,t,n="ascending"){const r=e||[];if(!t?.length)return r;const o=[],i=new Map;t.forEach((e=>{if(e.key)return i.set(e.key,e);o.push(e)}));let s=r.map((e=>{const{key:t}=e;if(t&&i.has(t)){const e=i.get(t);return i.delete(t),e}return e}));return s.push(...i.values(),...o),s="ascending"===n?s.sort(((e,t)=>(null!==e.score&&void 0!==e.score?e.score:1/0)-(null!==t.score&&void 0!==t.score?t.score:1/0))):s.sort(((e,t)=>(null!==t.score&&void 0!==t.score?t.score:1/0)-(null!==e.score&&void 0!==e.score?e.score:1/0))),s}function W(e){const t={};let n=[];let r=[];let o=d.Initial;t.getStatus=()=>o,t.getResultBuffer=()=>n,t.setResultBuffer=e=>{n=e,n?.length&&t.onChange()},t.getRevokedBuffer=()=>r,t.setRevokedBuffer=e=>{r=e,r?.length&&t.onChange()},t.onChange=w;const i={};return t.res=i,i.close=()=>{o!==d.Close&&(o=d.Close,t.onChange())},i.open=()=>{o!==d.Open&&(o=d.Open,t.onChange())},i.respond=n=>{const r=O(t.getResultBuffer(),n,e);t.setResultBuffer(r)},i.revoke=(...e)=>{const n=new Set(e),r=t.getResultBuffer().filter((({key:e})=>{const t=n.has(e);return t&&n.delete(e),!t}));t.setResultBuffer(r),n.size&&(t.getRevokedBuffer().forEach((e=>n.add(e))),t.setRevokedBuffer([...n]))},t}function D(e,t,n){const r=new Set;let o=!1;return{close:()=>{o=!0;for(const e of r)e()},req:{id:t,topic:e,...n,context:n?.context||{},onClose:e=>{r.add(e),o&&e()},removeListener:e=>{r.delete(e)}}}}function x(){return{name:fin.me.name,uuid:fin.me.uuid}}function A(){let e;try{const t=fin.Platform.getCurrentSync();if(!t?.identity)return;e=t.identity.uuid}catch(e){}return e}const E="deregistered or does not exist",F=new Error(`provider ${E}`),_=new Error("provider with name already exists"),$=new Error("bad payload"),q=new Error("subscription rejected"),G=new Error(`channel ${E}`),N=new Map;function H(e){const t=U(e);if(t)return t;throw G}function U(e){const t=N.get(e);if(t)return t}function V(e,t){N.set(e,t)}const j=new Map;function K(e){j.has(e)||j.set(e,new Map);const t=j.get(e);return{getRequestsForIdentity:e=>{const n=function(e){return`${e.uuid}:${e.name}`}(e);return t.has(n)||t.set(n,new Map),t.get(n)}}}async function X(e,t){return(await H(e)).dispatch(l,t)}function J({namespacedTopic:e,topic:t}){const n=M.bind(null,e),r=K(e),o=X.bind(null,e);return async(e,i)=>{if(!e||!e.id||!e.providerId){const e=$;return{error:e.message}}const{id:s,providerId:a}=e,c=n(a);if(!c){const e=F;return{error:e.message}}const d=r.getRequestsForIdentity(i);let u=d.get(e.id);u||(u=D(t,s,e),d.set(e.id,u));const f=W(),l=()=>{const e=f.getResultBuffer();f.setResultBuffer([]);const t=f.getRevokedBuffer();f.setRevokedBuffer([]);const n=f.getStatus();o({id:s,providerId:a,results:e,revoked:t,status:n})};let p=!0,g=!1;f.onChange=()=>{if(p)return p=!1,void l();g||(g=!0,setTimeout((()=>{g=!1,l()}),100))};try{const{results:e,context:t}=await c.onUserInput(u.req,f.res),n=f.getStatus();return{id:s,providerId:a,status:n,results:e,context:t}}catch(e){return{id:s,providerId:a,error:e.message}}}}async function Z(e,t,n){const r=n||await H(e),o=x(),i={identity:o,...t,onUserInput:void 0,onResultDispatch:void 0};await r.dispatch("2",i),await T(e,{identity:o,...t})}async function z(e,t){const n=await H(e);return await n.dispatch("3",t),I(e,t)}async function Q(e,t,n,r){const o=B(n,x(),r),i=M(e,t);if(i){const{onResultDispatch:e}=i;if(!e)return;return e(o)}const s={providerId:t,result:o};return(await H(e)).dispatch(p,s)}async function Y(e,t){const n={...t,context:t?.context||{}},r={},o=async function*(e,t,{setState:n}){const r=await H(e);for(;;){const e=await r.dispatch("1",t),o=e.error;if(o)throw new Error(o);const i=e;if(t.id=i.id,n(i.state),i.done)return i.value;yield i.value}}(e,n,{setState:e=>{r.state=e}});let i=await o.next();return r.id=n.id,r.close=()=>{!async function(e,t){(await H(e)).dispatch(g,{id:t})}(e,r.id)},r.next=()=>{if(i){const e=i;return i=void 0,e}return o.next()},r}async function ee(e){return(await H(e)).dispatch("4",null)}async function te(e){const t=await H(e);var n;n=e,N.delete(n),k(e),await t.disconnect()}function ne(e){const{namespacedTopic:t}=e,n=K(t);return async r=>{if(!U(t))return;const o=n.getRequestsForIdentity(r);for(const{req:e,close:t}of o.values())t(),o.delete(e.id);V(t,(async e=>{const{namespacedTopic:t}=e,n=await re(e);for(const e of L(t))await Z(t,e,n);return n})(e))}}async function re(e){const{namespacedTopic:t}=e,n=y(t),r=await async function(e){for(let t=0;t<50;t++)try{return await fin.InterApplicationBus.Channel.connect(e,{wait:!1})}catch(e){if(49===t)throw e;await new Promise((e=>setTimeout(e,1e3)))}}(n);return r.register(l,J(e)),r.register(g,function(e){const t=K(e);return(e,n)=>{const r=t.getRequestsForIdentity(n),o=r.get(e.id);o&&(o.close(),r.delete(e.id))}}(t)),r.register(p,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const r=M(e,t.providerId);if(!r)return;const{onResultDispatch:o}=r;return o?(t.result.dispatcherIdentity=n,o(t.result)):void 0}}(t)),r.onDisconnection(ne(e)),r}async function oe(e){const t=("string"==typeof e?e:e?.topic)||f,n=("string"==typeof e?null:e?.uuid)||A(),r=h(n,t),o={topic:t,namespace:n,namespacedTopic:r};let i=U(r);return i||(i=re(o),V(r,i),await i),{getAllProviders:ee.bind(null,r),register:Z.bind(null,r),search:Y.bind(null,r),deregister:z.bind(null,r),dispatch:Q.bind(null,r),disconnect:te.bind(null,r)}}const ie=new Map;function se(e){const t=ae(e);if(t)return t;throw G}function ae(e){const t=ie.get(e);if(t)return t}const ce=new Map;function de(e,t){ce.has(e)||ce.set(e,new Set),ce.get(e).add(t)}function ue(e,t){const n=ce.get(e);n&&n.delete(t)}var fe=n(5316);function le(e){return[...L(e)].map((e=>({...e,onUserInput:void 0,onResultDispatch:void 0})))}async function pe(e,t){if(M(e,t.id))throw new Error("provider with name already exists");const n=x();await T(e,{identity:n,...t})}function ge(e,t){I(e,t)}async function we(e,t,n,r){const o=M(e,t);if(!o)throw F;const{onResultDispatch:i}=o;if(!i)return;return i(B(n,x(),r))}async function*he(e,t,n){const r=function(e,t){const n=[],r=[],o=[],i=[];for(const s of e){const e=W(s.scoreOrder),a={results:[],provider:{id:s.id,identity:s.identity,title:s.title,scoreOrder:s.scoreOrder,icon:s.icon}};n.push(a),r.push(e);const c=(async()=>{try{const{results:n,context:r}=await s.onUserInput(t,e.res);a.results=O(a.results,n),a.context={...a.context,...r}}catch(e){a.error=e}c.done=!0})();i.push(c),o.push(o.length)}return{providerResponses:n,listenerResponses:r,openListenerResponses:o,initialResponsePromises:i}}(t.targets?t.targets.map((t=>M(e,t))).filter((e=>!!e)):[...L(e).filter((e=>!e.hidden))],t),{providerResponses:o,listenerResponses:i}=r;let{openListenerResponses:s,initialResponsePromises:a}=r,c=fe.D.Fetching;const u=e=>{c=e,n.setState(c)};let f,l=!1;t.onClose((()=>{l=!0,f&&f()}));do{let e=!1;if(a.length){const t=[];for(const n of a)n.done?e=!0:t.push(n);a=t,a.length||(u(fe.D.Fetched),e=!0)}let t,n=!1;const r=()=>{n=!0,t&&t()},p=[];for(const t of s){const n=i[t],s=o[t],a=n.getStatus();(a===d.Open||c===fe.D.Fetching&&a===d.Initial)&&(p.push(t),n.onChange=r);const u=n.getResultBuffer();u.length&&(n.setResultBuffer([]),s.results=O(s.results,u),e=!0);const f=n.getRevokedBuffer();if(f.length){n.setRevokedBuffer([]);const t=new Set(f);s.results=s.results.filter((({key:e})=>!t.has(e))),e=!0}}if(s=p,e&&(yield o),l)break;n||(s.length||a.length)&&await Promise.race([...a,new Promise((e=>{t=e})),new Promise((e=>{f=e}))])}while(s.length||a.length);return u(fe.D.Complete),o}let ye=0;function ve({namespacedTopic:e,topic:t},n){ye+=1;const r=D(t,ye.toString(),n),o=he(e,r.req,{setState:e=>{o.state=e}});return o.id=ye.toString(),o.close=r.close,o.state=fe.D.Fetching,o}const me=new Map;function Se(e,t){return`${e}:${t}`}function Ce(e){return async(t,...n)=>{if(!t)return{error:$.message};let r;if(t.id)r=Se(e.namespacedTopic,t.id);else{const n=ve(e,t);r=Se(e.namespacedTopic,n.id),t.id=n.id,me.set(r,{generator:n})}const o=me.get(r);clearTimeout(o.timeout);const i=await o.generator.next();return o.timeout=function(e){return window.setTimeout((()=>{me.delete(e)}),1e4)}(r),{...i,id:t.id,state:o.generator.state}}}function Pe(e,t,n){return se(e).dispatch(t,g,{id:n})}function Re(e){return t=>function(e,t){const n=Se(e,t),r=me.get(n);r&&r.generator.close()}(e,t.id)}async function be(e,t,{id:n,query:r,context:o,targets:i}){const s=se(e),a={id:n,query:r,context:o,targets:i,providerId:t.id},c=await s.dispatch(t.identity,l,a),d=c.error;if(d)throw new Error(d);return c}const Te=new Map;function Ie(e,t,n){return`${e}:${t.name}:${t.uuid}:${n}`}const Le=new Map;function ke(e,t,n){return`${e}:${t}:${n}`}function Me(e,t){const n=Ie.bind(null,e,t.identity),r=Pe.bind(null,e,t.identity),o=be.bind(null,e,t);return async(i,s)=>{const a=n(i.id);if(!Te.has(a)){const e=()=>{r(i.id),Te.delete(a)};Te.set(a,e),i.onClose(e)}const c=ke(e,t.id,i.id),u=()=>{Le.delete(c),s.close()};i.onClose(u),Le.set(c,(e=>{e.results?.length&&s.respond(e.results),e.revoked?.length&&s.revoke(...e.revoked),e.status===d.Open&&s.open(),e.status===d.Close&&u()}));const f=await o(i);return f.status===d.Open&&s.open(),f.status!==d.Close&&f.status!==d.Initial||u(),f}}function Be(e,t){return async n=>{const r=se(e),o={providerId:t.id,result:n};return r.dispatch(t.identity,p,o)}}const Oe=new Map;function We(e,t){return`${e}-${t.name}-${t.uuid}`}function De(e){return async(t,n)=>{if(!t||!t.id)return void new Error(JSON.stringify(t));if(M(e,t.id))throw _;t.identity=n,await async function(e,t){const n=We(e,t.identity);Oe.has(n)||Oe.set(n,[]),Oe.get(n).push(t.id),await T(e,{...t,onUserInput:Me(e,t),onResultDispatch:Be(e,t)})}(e,t)}}function xe(e){return t=>{t&&function(e,t){const n=M(e,t);if(!n)return;const r=We(e,n.identity),o=Oe.get(r);if(o){const n=o.findIndex((e=>e===t));-1!==n&&(o.splice(n,1),I(e,t))}}(e,t)}}const Ae=new Map;function Ee(e,t){Ae.has(e)||Ae.set(e,new Set),Ae.get(e).add(t)}function Fe(e,t){const n=Ae.get(e);n&&n.delete(t)}function _e(e){return async t=>{!function(e,t){const n=We(e,t),r=Oe.get(n);if(r){for(const t of r)I(e,t);Oe.delete(n)}}(e,t);const n=Ae.get(e);n&&n.forEach((e=>e(t)))}}async function $e(e){const{namespacedTopic:t}=e,n=y(e.namespacedTopic),r=await(o=n,fin.InterApplicationBus.Channel.create(o));var o;return r.onConnection(function({namespacedTopic:e}){return async t=>{const n=ce.get(e);if(n)for(const e of n)if(!await e(t))throw q}}(e)),r.onDisconnection(_e(t)),r.register(g,Re(t)),r.register(l,function(e){return t=>{const n=ke(e,t.providerId,t.id),r=Le.get(n);r&&r(t)}}(t)),r.register("2",De(t)),r.register("3",xe(t)),r.register("4",function(e){return async()=>le(e)}(t)),r.register("1",Ce(e)),r.register(p,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const r=M(e,t.providerId);if(!r)throw F;const{onResultDispatch:o}=r;return o?(t.result.dispatcherIdentity=n,o(t.result)):void 0}}(t)),r}async function qe(e){const t=se(e);var n;n=e,ie.delete(n),await t.destroy(),k(e)}async function Ge(e){const t=("string"==typeof e?e:e?.topic)||f,n=A(),r=h(n,t),o={topic:t,namespace:n,namespacedTopic:r};let i=ae(r);i||(i=await $e(o),function(e,t){ie.set(e,t)}(r,i));const s=ue.bind(null,r),a=Fe.bind(null,r),c=S.bind(null,r),d=R.bind(null,r);return{getAllProviders:le.bind(null,r),search:ve.bind(null,o),register:pe.bind(null,r),deregister:ge.bind(null,r),onSubscription:de.bind(null,r),onDisconnect:Ee.bind(null,r),onRegister:m.bind(null,r),onDeregister:P.bind(null,r),dispatch:we.bind(null,o),disconnect:qe.bind(null,r),removeListener:e=>{s(e),a(e),c(e),d(e)}}}const{create:Ne}=o,{subscribe:He}=r,Ue={create:Ne,subscribe:He,defaultTopic:"all"},Ve=()=>{const e=window;e.search=Ue,e.fin&&(e.fin.Search=Ue)},je=e=>{const t=()=>{Ve(),window.removeEventListener(e,t)};return t};if("undefined"!=typeof window){Ve();const e="load",t=je(e);window.addEventListener(e,t);const n="DOMContentLoaded",r=je(n);window.addEventListener(n,r)}const Ke=new Map;async function Xe(){await async function(e){Ke.set(e,await He({topic:e,uuid:u.q9.Workspace}))}(a)}let Je;async function Ze(e){return await async function(){return Je||(Je=Xe()),Je}(),Ke.get(e)}var ze=n(3758);const Qe=async e=>{if(!e.icon)throw new Error(`${e.id} provider needs to have icon property defined.`);await(0,s.aB)();const t=await Ze(a);try{const n=await t.register(e);return(0,i.ck)({allowed:!0}),n}catch(e){throw(0,i.ck)({allowed:!1,rejectionCode:e.message}),e}},Ye=async e=>{await(0,s.aB)();return(await Ze(a)).deregister(e)};async function et(){return(await(0,s.Xl)()).dispatch(s.Ml.ShowHome,void 0)}async function tt(){return(await(0,s.Xl)()).dispatch(s.Ml.HideHome,void 0)}},3298:(e,t,n)=>{n.d(t,{w:()=>r.w});var r=n(5316)},3758:(e,t,n)=>{var r,o,i;n.d(t,{Pt:()=>r,yW:()=>o,el:()=>i}),function(e){e.Suggestion="suggestion"}(r||(r={})),function(e){e.Contact="Contact",e.Custom="Custom",e.List="List",e.Plain="Plain",e.SimpleText="SimpleText"}(o||(o={})),function(e){e.MultiSelect="MultiSelect"}(i||(i={}))},7564:(e,t,n)=>{n(3298),n(3758),n(6114),n(2109)},6114:(e,t,n)=>{var r,o;n.d(t,{L:()=>r,T:()=>o}),function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(r||(r={})),function(e){e.LandingPage="landingPage",e.AppGrid="appGrid"}(o||(o={}))},2109:(e,t,n)=>{n.d(t,{p6:()=>r,Go:()=>o,bI:()=>i,ZJ:()=>s});const r={Container:"Container",Button:"Button"},o={Text:"Text",Image:"Image",List:"List"},i={...r,...o};var s;!function(e){e.Primary="primary",e.Secondary="secondary",e.TextOnly="textOnly"}(s||(s={}))},317:(e,t,n)=>{n.r(t),n.d(t,{AppManifestType:()=>i.L,StorefrontTemplate:()=>i.T,deregister:()=>f,hide:()=>l,register:()=>u,show:()=>p});var r=n(6532),o=n(7405);n(7564);var i=n(6114);let s;const a=new Map,c=e=>{if(!a.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return a.get(e)},d=async e=>{const t=await(0,o.Xl)();if(a.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return a.set(e.id,e),(e=>{e.isStorefrontActionsRegistered||(e.isStorefrontActionsRegistered=!0,e.register(o.Ml.GetStorefrontProviderApps,(e=>c(e).getApps())),e.register(o.Ml.GetStorefrontProviderFooter,(e=>c(e).getFooter())),e.register(o.Ml.GetStorefrontProviderLandingPage,(e=>c(e).getLandingPage())),e.register(o.Ml.GetStorefrontProviderNavigation,(e=>c(e).getNavigation())),e.register(o.Ml.LaunchStorefrontProviderApp,(({id:e,app:t})=>c(e).launchApp(t))))})(t),t.dispatch(o.Ml.RegisterStorefrontProvider,e)},u=e=>(s=d(e),(0,r.d9)({allowed:!0}),s),f=async e=>{await s,a.delete(e);return(await(0,o.Xl)()).dispatch(o.Ml.DeregisterStorefrontProvider,e)},l=async()=>{await s,await(0,o.aB)(),await(async()=>(await(0,o.Dm)()).dispatch(o.Ml.HideStorefront,void 0))()},p=async()=>{await s,await(0,o.aB)(),await(async()=>(await(0,o.Dm)()).dispatch(o.Ml.ShowStorefront,null))()}},7405:(e,t,n)=>{n.d(t,{Ml:()=>s,Dm:()=>a,Xl:()=>f,aB:()=>u});var r=n(6678);const o=r.Ax&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));var i=n(121);var s;!function(e){e.RegisterStorefrontProvider="register-storefront-provider",e.DeregisterStorefrontProvider="deregister-storefront-provider",e.GetStorefrontProviders="get-storefront-providers",e.HideStorefront="hide-storefront",e.GetStorefrontProviderApps="get-storefront-provider-apps",e.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",e.GetStorefrontProviderFooter="get-storefront-provider-footer",e.GetStorefrontProviderNavigation="get-storefront-provider-navigation",e.LaunchStorefrontProviderApp="launch-storefront-provider-app",e.ShowStorefront="show-storefront",e.CreateStorefrontWindow="create-storefront-window",e.ShowHome="show-home",e.HideHome="hide-home",e.AssignHomeSearchContext="assign-home-search-context",e.GetLegacyPages="get-legacy-pages",e.GetLegacyWorkspaces="get-legacy-workspaces",e.GetComputedPlatformTheme="get-computed-platform-theme"}(s||(s={}));const a=function(e){let t;return()=>{if(!r.sS)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return t||(t=(async()=>{await o;const n=await fin.InterApplicationBus.Channel.connect(e);return n.onDisconnection((async()=>{t=void 0})),n})().then((e=>e)).catch((n=>{throw t=void 0,new Error(`failed to connect to channel provider ${e}: ${n}`)}))),t}}("__of_workspace_protocol__"),c="isLaunchedViaLib",d=e=>{const t=new URL(e);return t.searchParams.append(c,"true"),t.toString()},u=async()=>{if(!await(0,i.JV)(i.iW))return(r.ZK||-1===navigator.userAgent.indexOf("Win"))&&await fin.Application.startFromManifest(d(r.aW)),fin.System.openUrlWithBrowser(d(r.GX))},f=async()=>(await u(),a())},5806:(e,t,n)=>{n.d(t,{q9:()=>r});var r,o,i,s=n(6678);!function(e){e.Workspace="openfin-browser"}(r||(r={})),function(e){e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(o||(o={})),function(e){e.FinProtocol="fin-protocol"}(i||(i={}));s.AB,s.AB,r.Workspace,r.Workspace},6678:(e,t,n)=>{var r;n.d(t,{sS:()=>o,Ax:()=>i,AB:()=>a,oC:()=>c,ZK:()=>d,GX:()=>u,aW:()=>f,u0:()=>p}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(r||(r={}));const o="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||process.env?.JEST_WORKER_ID,"undefined"!=typeof window),s=i?window.origin:r.Local,a=o&&fin.me.uuid,c=o&&fin.me.name,d=(o&&fin.me.entityType,"prod"===r.Local),u=(r.Dev,r.Staging,r.Prod,"fins://system-apps/workspace"),f="https://cdn.openfin.co/workspace/7.3.10/app.json",l=e=>e.startsWith("http://")||e.startsWith("https://")?e:s+e,p=(l("https://cdn.openfin.co/workspace/7.3.10"),l("https://cdn.openfin.co/workspace/7.3.10"),"undefined"!=typeof WORKSPACE_DOCS_PLATFORM_URL&&l(WORKSPACE_DOCS_PLATFORM_URL),"undefined"!=typeof WORKSPACE_DOCS_CLIENT_URL&&l(WORKSPACE_DOCS_CLIENT_URL),"7.3.10")},6532:(e,t,n)=>{n.d(t,{ck:()=>a,d9:()=>c});var r,o=n(6678),i=n(121);!function(e){e.Browser="Browser",e.Home="Home",e.Notification="Notification",e.Storefront="Storefront",e.Platform="Platform",e.Theming="Theming"}(r||(r={}));const s=async(e,t)=>{const n={apiVersion:t.apiVersion||o.u0,componentName:e,componentVersion:o.u0,...t};fin.System.registerUsage({type:"workspace-licensing",data:n})},a=async e=>{i.OI.uuid===i.Gi.uuid&&i.OI.name===i.Gi.name||s(r.Home,e)},c=async e=>{s(r.Storefront,e)}},121:(e,t,n)=>{n.d(t,{Gi:()=>c,OI:()=>d,iW:()=>u,JV:()=>f});var r,o,i=n(5806),s=n(6678);!function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window"}(r||(r={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached",e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.OptionsChanged="options-changed"}(o||(o={}));function a(e){if(!s.sS)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}const c={name:s.oC,uuid:s.AB};const d={name:r.Home,uuid:i.q9.Workspace},u=(r.Dock,i.q9.Workspace,r.Storefront,i.q9.Workspace,{name:i.q9.Workspace,uuid:i.q9.Workspace});const f=e=>a(e).getOptions().then((()=>!0)).catch((()=>!1))},5316:(e,t,n)=>{var r,o;n.d(t,{D:()=>r,w:()=>o}),function(e){e.Fetching="fetching",e.Fetched="fetched",e.Complete="complete"}(r||(r={})),function(e){e.Active="active",e.Default="default"}(o||(o={}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{AppManifestType:()=>p.L,ButtonStyle:()=>f.ZJ,CLIAction:()=>l.Pt,CLIFilterOptionType:()=>l.el,CLITemplate:()=>l.yW,ContainerTemplateFragmentNames:()=>f.p6,Home:()=>o,Legacy:()=>e,PresentationTemplateFragmentNames:()=>f.Go,SearchTagBackground:()=>u.w,Storefront:()=>d,StorefrontTemplate:()=>p.T,TemplateFragmentTypes:()=>f.bI});var e={};n.r(e),n.d(e,{getPages:()=>a,getWorkspaces:()=>c});var t,o=n(3133);n(6678),n(121);!function(e){e.TabCreated="tab-created",e.ContainerCreated="container-created",e.ContainerResized="container-resized"}(t||(t={}));new Map;var i;!function(e){e.CurrentWorkspaceId="currentWorkspaceId",e.LastFocusedBrowserWindow="lastFocusedBrowserWindow",e.MachineName="machineName",e.NewTabPageLayout="NewTabPageLayout",e.NewTabPageSort="NewTabPageSort"}(i||(i={}));var s=n(7405);const a=()=>async function(){return(await(0,s.Dm)()).dispatch(s.Ml.GetLegacyPages,void 0)}(),c=()=>(async()=>(await(0,s.Dm)()).dispatch(s.Ml.GetLegacyWorkspaces,void 0))();var d=n(317),u=n(3298),f=n(2109),l=n(3758),p=n(6114)})(),module.exports=r})();
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
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ "./client/src/integrations/emoji/templates.ts");



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
     * Get a list of the static application entries.
     * @param integration The integration details.
     * @returns The list of application entries.
     */
    async getAppSearchEntries(integration) {
        return [];
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
        if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION && result.data.emoji) {
            await fin.Clipboard.writeText({ data: result.data.emoji });
            return true;
        }
        else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION && result.data.key) {
            await fin.Clipboard.writeText({ data: result.data.key });
            return true;
        }
        else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION &&
            data.url &&
            this._integrationManager.openUrl) {
            await this._integrationManager.openUrl(data.url);
            return true;
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
                    results.push(this.createResult(key, matchEmoji));
                }
                // Find all other potential matches
                const searchResult = node_emoji__WEBPACK_IMPORTED_MODULE_1__.search(key);
                for (const result of searchResult) {
                    if (result.emoji !== matchEmoji) {
                        results.push(this.createResult(result.key, result.emoji));
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
     * @param emojiName The emoji symbol.
     * @returns The search result.
     */
    createResult(key, emojiName) {
        return {
            key: `emoji-${key}`,
            title: key,
            label: "Information",
            actions: [
                { name: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION, hotkey: "CmdOrCtrl+C" },
                { name: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION, hotkey: "Enter" }
            ],
            data: {
                providerId: EmojiIntegrationProvider._PROVIDER_ID,
                key,
                emoji: emojiName,
                url: `https://emojipedia.org/${key}/`
            },
            template: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.CLITemplate.Custom,
            templateContent: {
                layout: (0,_templates__WEBPACK_IMPORTED_MODULE_2__.getEmojiTemplate)({
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
                    emoji: emojiName,
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


function getEmojiTemplate(actions) {
    return (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("column", [
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("keyTitle", 12, { color: "lightgray", fontWeight: "bold" }),
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("key", 12, { color: "white", wordBreak: "break-all" }),
            (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Secondary, "copyKeyTitle", actions.copyKeyAction, { fontSize: "12px" })
        ], { justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }),
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("emojiTitle", 12, { color: "lightgray", fontWeight: "bold" }),
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createText)("emoji", 32, { color: "white" }),
            (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Secondary, "copyEmojiTitle", actions.copyEmojiAction, { fontSize: "12px" })
        ], { justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }),
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [(0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Primary, "detailsTitle", actions.detailsAction, { fontSize: "12px" })], { justifyContent: "flex-end" })
    ], {
        padding: "10px"
    });
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
/* harmony export */   "createImage": () => (/* binding */ createImage),
/* harmony export */   "createText": () => (/* binding */ createText)
/* harmony export */ });
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "../../node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);

function createContainer(containerType, children, style) {
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
function createText(dataKey, fontSize = 14, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Text,
        dataKey,
        style: {
            fontSize: `${fontSize ?? 14}px`,
            ...style
        }
    };
}
function createImage(dataKey, alternativeText, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Image,
        dataKey,
        alternativeText,
        style: {
            ...style
        }
    };
}
function createButton(buttonStyle, titleKey, action, style) {
    return {
        type: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.TemplateFragmentTypes.Button,
        buttonStyle,
        children: [createText(titleKey, 12)],
        action,
        style: {
            ...style
        }
    };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDcEMsTUFBTTtRQUNOLEtBQUssRUFBRTtZQUNMLEdBQUcsS0FBSztTQUNUO0tBQ0YsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1NDaEVEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN6QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLGlDQUFpQyxXQUFXO1VBQzVDO1VBQ0E7Ozs7O1VDUEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLEdBQUc7VUFDSDtVQUNBO1VBQ0EsQ0FBQzs7Ozs7VUNQRDs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7O1VDTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSmtFO0FBRTNELE1BQU0sV0FBVyxHQUFHLElBQUksMkVBQXdCLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3dvcmtzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0RhdGFWaWV3LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hc2NpaVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNVbmljb2RlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzTWFza2VkLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25vZGVVdGlsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpbmdUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdmFsdWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi4vLi4vbm9kZV9tb2R1bGVzL25vZGUtZW1vamkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uLi8uLi9ub2RlX21vZHVsZXMvbm9kZS1lbW9qaS9saWIvZW1vamkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvaW50ZWdyYXRpb25zL2Vtb2ppL2ludGVncmF0aW9uLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS90ZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvdGVtcGxhdGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL2NsaWVudC9zcmMvaW50ZWdyYXRpb25zL2Vtb2ppL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIigoKT0+e1widXNlIHN0cmljdFwiO3ZhciBlPXszMTMzOihlLHQsbik9PntuLnIodCksbi5kKHQse0NMSUFjdGlvbjooKT0+emUuUHQsQ0xJRmlsdGVyT3B0aW9uVHlwZTooKT0+emUuZWwsQ0xJVGVtcGxhdGU6KCk9PnplLnlXLGRlcmVnaXN0ZXI6KCk9PlllLGhpZGU6KCk9PnR0LHJlZ2lzdGVyOigpPT5RZSxzaG93OigpPT5ldH0pO3ZhciByPXt9O24ucihyKSxuLmQocix7c3Vic2NyaWJlOigpPT5vZX0pO3ZhciBvPXt9O24ucihvKSxuLmQobyx7Y3JlYXRlOigpPT5HZX0pO3ZhciBpPW4oNjUzMikscz1uKDc0MDUpO2NvbnN0IGE9XCJob21lXCI7dmFyIGM7IWZ1bmN0aW9uKGUpe2UuQ29tbWFuZHM9XCJob21lLWNvbW1hbmRzXCJ9KGN8fChjPXt9KSk7dmFyIGQsdT1uKDU4MDYpO24oNzU2NCk7IWZ1bmN0aW9uKGUpe2VbZS5Jbml0aWFsPTBdPVwiSW5pdGlhbFwiLGVbZS5PcGVuPTFdPVwiT3BlblwiLGVbZS5DbG9zZT0yXT1cIkNsb3NlXCJ9KGR8fChkPXt9KSk7Y29uc3QgZj1cImFsbFwiLGw9XCIwXCIscD1cIjVcIixnPVwiNlwiLHc9KCk9Pnt9O2Z1bmN0aW9uIGgoZSx0KXtyZXR1cm4gZT9gJHtlfS0ke3R9YDp0fWZ1bmN0aW9uIHkoZSl7cmV0dXJuYF9fc2VhcmNoLSR7ZX0tdG9waWNfX2B9Y29uc3Qgdj1uZXcgTWFwO2Z1bmN0aW9uIG0oZSx0KXt2LmhhcyhlKXx8di5zZXQoZSxuZXcgU2V0KSx2LmdldChlKS5hZGQodCl9ZnVuY3Rpb24gUyhlLHQpe2NvbnN0IG49di5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgQz1uZXcgTWFwO2Z1bmN0aW9uIFAoZSx0KXtDLmhhcyhlKXx8Qy5zZXQoZSxuZXcgU2V0KSxDLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gUihlLHQpe2NvbnN0IG49Qy5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgYj1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIFQoZSx0KXtiLmhhcyhlKXx8Yi5zZXQoZSxuZXcgTWFwKSxiLmdldChlKS5zZXQodC5pZCx0KTtjb25zdCBuPXYuZ2V0KGUpO2lmKCFuKXJldHVybjtjb25zdCByPVsuLi5uXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKHIpfWFzeW5jIGZ1bmN0aW9uIEkoZSx0KXtjb25zdCBuPWIuZ2V0KGUpO2lmKCFuKXJldHVybjtuLmRlbGV0ZSh0KTtjb25zdCByPUMuZ2V0KGUpO2lmKCFyKXJldHVybjtjb25zdCBvPVsuLi5yXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKG8pfWZ1bmN0aW9uIEwoZSl7cmV0dXJuIGIuZ2V0KGUpP1suLi5iLmdldChlKS52YWx1ZXMoKV06W119ZnVuY3Rpb24gayhlKXtjb25zdCB0PWIuZ2V0KGUpO3QmJnQuY2xlYXIoKX1mdW5jdGlvbiBNKGUsdCl7Y29uc3Qgbj1iLmdldChlKTtyZXR1cm4gbj9uLmdldCh0KTpudWxsfWZ1bmN0aW9uIEIoZSx0LG4pe3JldHVybnsuLi5lLGFjdGlvbjpufHxlLmFjdGlvbnNbMF0sZGlzcGF0Y2hlcklkZW50aXR5OnR9fWZ1bmN0aW9uIE8oZSx0LG49XCJhc2NlbmRpbmdcIil7Y29uc3Qgcj1lfHxbXTtpZighdD8ubGVuZ3RoKXJldHVybiByO2NvbnN0IG89W10saT1uZXcgTWFwO3QuZm9yRWFjaCgoZT0+e2lmKGUua2V5KXJldHVybiBpLnNldChlLmtleSxlKTtvLnB1c2goZSl9KSk7bGV0IHM9ci5tYXAoKGU9Pntjb25zdHtrZXk6dH09ZTtpZih0JiZpLmhhcyh0KSl7Y29uc3QgZT1pLmdldCh0KTtyZXR1cm4gaS5kZWxldGUodCksZX1yZXR1cm4gZX0pKTtyZXR1cm4gcy5wdXNoKC4uLmkudmFsdWVzKCksLi4ubykscz1cImFzY2VuZGluZ1wiPT09bj9zLnNvcnQoKChlLHQpPT4obnVsbCE9PWUuc2NvcmUmJnZvaWQgMCE9PWUuc2NvcmU/ZS5zY29yZToxLzApLShudWxsIT09dC5zY29yZSYmdm9pZCAwIT09dC5zY29yZT90LnNjb3JlOjEvMCkpKTpzLnNvcnQoKChlLHQpPT4obnVsbCE9PXQuc2NvcmUmJnZvaWQgMCE9PXQuc2NvcmU/dC5zY29yZToxLzApLShudWxsIT09ZS5zY29yZSYmdm9pZCAwIT09ZS5zY29yZT9lLnNjb3JlOjEvMCkpKSxzfWZ1bmN0aW9uIFcoZSl7Y29uc3QgdD17fTtsZXQgbj1bXTtsZXQgcj1bXTtsZXQgbz1kLkluaXRpYWw7dC5nZXRTdGF0dXM9KCk9Pm8sdC5nZXRSZXN1bHRCdWZmZXI9KCk9Pm4sdC5zZXRSZXN1bHRCdWZmZXI9ZT0+e249ZSxuPy5sZW5ndGgmJnQub25DaGFuZ2UoKX0sdC5nZXRSZXZva2VkQnVmZmVyPSgpPT5yLHQuc2V0UmV2b2tlZEJ1ZmZlcj1lPT57cj1lLHI/Lmxlbmd0aCYmdC5vbkNoYW5nZSgpfSx0Lm9uQ2hhbmdlPXc7Y29uc3QgaT17fTtyZXR1cm4gdC5yZXM9aSxpLmNsb3NlPSgpPT57byE9PWQuQ2xvc2UmJihvPWQuQ2xvc2UsdC5vbkNoYW5nZSgpKX0saS5vcGVuPSgpPT57byE9PWQuT3BlbiYmKG89ZC5PcGVuLHQub25DaGFuZ2UoKSl9LGkucmVzcG9uZD1uPT57Y29uc3Qgcj1PKHQuZ2V0UmVzdWx0QnVmZmVyKCksbixlKTt0LnNldFJlc3VsdEJ1ZmZlcihyKX0saS5yZXZva2U9KC4uLmUpPT57Y29uc3Qgbj1uZXcgU2V0KGUpLHI9dC5nZXRSZXN1bHRCdWZmZXIoKS5maWx0ZXIoKCh7a2V5OmV9KT0+e2NvbnN0IHQ9bi5oYXMoZSk7cmV0dXJuIHQmJm4uZGVsZXRlKGUpLCF0fSkpO3Quc2V0UmVzdWx0QnVmZmVyKHIpLG4uc2l6ZSYmKHQuZ2V0UmV2b2tlZEJ1ZmZlcigpLmZvckVhY2goKGU9Pm4uYWRkKGUpKSksdC5zZXRSZXZva2VkQnVmZmVyKFsuLi5uXSkpfSx0fWZ1bmN0aW9uIEQoZSx0LG4pe2NvbnN0IHI9bmV3IFNldDtsZXQgbz0hMTtyZXR1cm57Y2xvc2U6KCk9PntvPSEwO2Zvcihjb25zdCBlIG9mIHIpZSgpfSxyZXE6e2lkOnQsdG9waWM6ZSwuLi5uLGNvbnRleHQ6bj8uY29udGV4dHx8e30sb25DbG9zZTplPT57ci5hZGQoZSksbyYmZSgpfSxyZW1vdmVMaXN0ZW5lcjplPT57ci5kZWxldGUoZSl9fX19ZnVuY3Rpb24geCgpe3JldHVybntuYW1lOmZpbi5tZS5uYW1lLHV1aWQ6ZmluLm1lLnV1aWR9fWZ1bmN0aW9uIEEoKXtsZXQgZTt0cnl7Y29uc3QgdD1maW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtpZighdD8uaWRlbnRpdHkpcmV0dXJuO2U9dC5pZGVudGl0eS51dWlkfWNhdGNoKGUpe31yZXR1cm4gZX1jb25zdCBFPVwiZGVyZWdpc3RlcmVkIG9yIGRvZXMgbm90IGV4aXN0XCIsRj1uZXcgRXJyb3IoYHByb3ZpZGVyICR7RX1gKSxfPW5ldyBFcnJvcihcInByb3ZpZGVyIHdpdGggbmFtZSBhbHJlYWR5IGV4aXN0c1wiKSwkPW5ldyBFcnJvcihcImJhZCBwYXlsb2FkXCIpLHE9bmV3IEVycm9yKFwic3Vic2NyaXB0aW9uIHJlamVjdGVkXCIpLEc9bmV3IEVycm9yKGBjaGFubmVsICR7RX1gKSxOPW5ldyBNYXA7ZnVuY3Rpb24gSChlKXtjb25zdCB0PVUoZSk7aWYodClyZXR1cm4gdDt0aHJvdyBHfWZ1bmN0aW9uIFUoZSl7Y29uc3QgdD1OLmdldChlKTtpZih0KXJldHVybiB0fWZ1bmN0aW9uIFYoZSx0KXtOLnNldChlLHQpfWNvbnN0IGo9bmV3IE1hcDtmdW5jdGlvbiBLKGUpe2ouaGFzKGUpfHxqLnNldChlLG5ldyBNYXApO2NvbnN0IHQ9ai5nZXQoZSk7cmV0dXJue2dldFJlcXVlc3RzRm9ySWRlbnRpdHk6ZT0+e2NvbnN0IG49ZnVuY3Rpb24oZSl7cmV0dXJuYCR7ZS51dWlkfToke2UubmFtZX1gfShlKTtyZXR1cm4gdC5oYXMobil8fHQuc2V0KG4sbmV3IE1hcCksdC5nZXQobil9fX1hc3luYyBmdW5jdGlvbiBYKGUsdCl7cmV0dXJuKGF3YWl0IEgoZSkpLmRpc3BhdGNoKGwsdCl9ZnVuY3Rpb24gSih7bmFtZXNwYWNlZFRvcGljOmUsdG9waWM6dH0pe2NvbnN0IG49TS5iaW5kKG51bGwsZSkscj1LKGUpLG89WC5iaW5kKG51bGwsZSk7cmV0dXJuIGFzeW5jKGUsaSk9PntpZighZXx8IWUuaWR8fCFlLnByb3ZpZGVySWQpe2NvbnN0IGU9JDtyZXR1cm57ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdHtpZDpzLHByb3ZpZGVySWQ6YX09ZSxjPW4oYSk7aWYoIWMpe2NvbnN0IGU9RjtyZXR1cm57ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdCBkPXIuZ2V0UmVxdWVzdHNGb3JJZGVudGl0eShpKTtsZXQgdT1kLmdldChlLmlkKTt1fHwodT1EKHQscyxlKSxkLnNldChlLmlkLHUpKTtjb25zdCBmPVcoKSxsPSgpPT57Y29uc3QgZT1mLmdldFJlc3VsdEJ1ZmZlcigpO2Yuc2V0UmVzdWx0QnVmZmVyKFtdKTtjb25zdCB0PWYuZ2V0UmV2b2tlZEJ1ZmZlcigpO2Yuc2V0UmV2b2tlZEJ1ZmZlcihbXSk7Y29uc3Qgbj1mLmdldFN0YXR1cygpO28oe2lkOnMscHJvdmlkZXJJZDphLHJlc3VsdHM6ZSxyZXZva2VkOnQsc3RhdHVzOm59KX07bGV0IHA9ITAsZz0hMTtmLm9uQ2hhbmdlPSgpPT57aWYocClyZXR1cm4gcD0hMSx2b2lkIGwoKTtnfHwoZz0hMCxzZXRUaW1lb3V0KCgoKT0+e2c9ITEsbCgpfSksMTAwKSl9O3RyeXtjb25zdHtyZXN1bHRzOmUsY29udGV4dDp0fT1hd2FpdCBjLm9uVXNlcklucHV0KHUucmVxLGYucmVzKSxuPWYuZ2V0U3RhdHVzKCk7cmV0dXJue2lkOnMscHJvdmlkZXJJZDphLHN0YXR1czpuLHJlc3VsdHM6ZSxjb250ZXh0OnR9fWNhdGNoKGUpe3JldHVybntpZDpzLHByb3ZpZGVySWQ6YSxlcnJvcjplLm1lc3NhZ2V9fX19YXN5bmMgZnVuY3Rpb24gWihlLHQsbil7Y29uc3Qgcj1ufHxhd2FpdCBIKGUpLG89eCgpLGk9e2lkZW50aXR5Om8sLi4udCxvblVzZXJJbnB1dDp2b2lkIDAsb25SZXN1bHREaXNwYXRjaDp2b2lkIDB9O2F3YWl0IHIuZGlzcGF0Y2goXCIyXCIsaSksYXdhaXQgVChlLHtpZGVudGl0eTpvLC4uLnR9KX1hc3luYyBmdW5jdGlvbiB6KGUsdCl7Y29uc3Qgbj1hd2FpdCBIKGUpO3JldHVybiBhd2FpdCBuLmRpc3BhdGNoKFwiM1wiLHQpLEkoZSx0KX1hc3luYyBmdW5jdGlvbiBRKGUsdCxuLHIpe2NvbnN0IG89QihuLHgoKSxyKSxpPU0oZSx0KTtpZihpKXtjb25zdHtvblJlc3VsdERpc3BhdGNoOmV9PWk7aWYoIWUpcmV0dXJuO3JldHVybiBlKG8pfWNvbnN0IHM9e3Byb3ZpZGVySWQ6dCxyZXN1bHQ6b307cmV0dXJuKGF3YWl0IEgoZSkpLmRpc3BhdGNoKHAscyl9YXN5bmMgZnVuY3Rpb24gWShlLHQpe2NvbnN0IG49ey4uLnQsY29udGV4dDp0Py5jb250ZXh0fHx7fX0scj17fSxvPWFzeW5jIGZ1bmN0aW9uKihlLHQse3NldFN0YXRlOm59KXtjb25zdCByPWF3YWl0IEgoZSk7Zm9yKDs7KXtjb25zdCBlPWF3YWl0IHIuZGlzcGF0Y2goXCIxXCIsdCksbz1lLmVycm9yO2lmKG8pdGhyb3cgbmV3IEVycm9yKG8pO2NvbnN0IGk9ZTtpZih0LmlkPWkuaWQsbihpLnN0YXRlKSxpLmRvbmUpcmV0dXJuIGkudmFsdWU7eWllbGQgaS52YWx1ZX19KGUsbix7c2V0U3RhdGU6ZT0+e3Iuc3RhdGU9ZX19KTtsZXQgaT1hd2FpdCBvLm5leHQoKTtyZXR1cm4gci5pZD1uLmlkLHIuY2xvc2U9KCk9PnshYXN5bmMgZnVuY3Rpb24oZSx0KXsoYXdhaXQgSChlKSkuZGlzcGF0Y2goZyx7aWQ6dH0pfShlLHIuaWQpfSxyLm5leHQ9KCk9PntpZihpKXtjb25zdCBlPWk7cmV0dXJuIGk9dm9pZCAwLGV9cmV0dXJuIG8ubmV4dCgpfSxyfWFzeW5jIGZ1bmN0aW9uIGVlKGUpe3JldHVybihhd2FpdCBIKGUpKS5kaXNwYXRjaChcIjRcIixudWxsKX1hc3luYyBmdW5jdGlvbiB0ZShlKXtjb25zdCB0PWF3YWl0IEgoZSk7dmFyIG47bj1lLE4uZGVsZXRlKG4pLGsoZSksYXdhaXQgdC5kaXNjb25uZWN0KCl9ZnVuY3Rpb24gbmUoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1LKHQpO3JldHVybiBhc3luYyByPT57aWYoIVUodCkpcmV0dXJuO2NvbnN0IG89bi5nZXRSZXF1ZXN0c0ZvcklkZW50aXR5KHIpO2Zvcihjb25zdHtyZXE6ZSxjbG9zZTp0fW9mIG8udmFsdWVzKCkpdCgpLG8uZGVsZXRlKGUuaWQpO1YodCwoYXN5bmMgZT0+e2NvbnN0e25hbWVzcGFjZWRUb3BpYzp0fT1lLG49YXdhaXQgcmUoZSk7Zm9yKGNvbnN0IGUgb2YgTCh0KSlhd2FpdCBaKHQsZSxuKTtyZXR1cm4gbn0pKGUpKX19YXN5bmMgZnVuY3Rpb24gcmUoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj15KHQpLHI9YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Zm9yKGxldCB0PTA7dDw1MDt0KyspdHJ5e3JldHVybiBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSx7d2FpdDohMX0pfWNhdGNoKGUpe2lmKDQ5PT09dCl0aHJvdyBlO2F3YWl0IG5ldyBQcm9taXNlKChlPT5zZXRUaW1lb3V0KGUsMWUzKSkpfX0obik7cmV0dXJuIHIucmVnaXN0ZXIobCxKKGUpKSxyLnJlZ2lzdGVyKGcsZnVuY3Rpb24oZSl7Y29uc3QgdD1LKGUpO3JldHVybihlLG4pPT57Y29uc3Qgcj10LmdldFJlcXVlc3RzRm9ySWRlbnRpdHkobiksbz1yLmdldChlLmlkKTtvJiYoby5jbG9zZSgpLHIuZGVsZXRlKGUuaWQpKX19KHQpKSxyLnJlZ2lzdGVyKHAsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQucHJvdmlkZXJJZHx8IXQucmVzdWx0KXJldHVybjtjb25zdCByPU0oZSx0LnByb3ZpZGVySWQpO2lmKCFyKXJldHVybjtjb25zdHtvblJlc3VsdERpc3BhdGNoOm99PXI7cmV0dXJuIG8/KHQucmVzdWx0LmRpc3BhdGNoZXJJZGVudGl0eT1uLG8odC5yZXN1bHQpKTp2b2lkIDB9fSh0KSksci5vbkRpc2Nvbm5lY3Rpb24obmUoZSkpLHJ9YXN5bmMgZnVuY3Rpb24gb2UoZSl7Y29uc3QgdD0oXCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplPy50b3BpYyl8fGYsbj0oXCJzdHJpbmdcIj09dHlwZW9mIGU/bnVsbDplPy51dWlkKXx8QSgpLHI9aChuLHQpLG89e3RvcGljOnQsbmFtZXNwYWNlOm4sbmFtZXNwYWNlZFRvcGljOnJ9O2xldCBpPVUocik7cmV0dXJuIGl8fChpPXJlKG8pLFYocixpKSxhd2FpdCBpKSx7Z2V0QWxsUHJvdmlkZXJzOmVlLmJpbmQobnVsbCxyKSxyZWdpc3RlcjpaLmJpbmQobnVsbCxyKSxzZWFyY2g6WS5iaW5kKG51bGwsciksZGVyZWdpc3Rlcjp6LmJpbmQobnVsbCxyKSxkaXNwYXRjaDpRLmJpbmQobnVsbCxyKSxkaXNjb25uZWN0OnRlLmJpbmQobnVsbCxyKX19Y29uc3QgaWU9bmV3IE1hcDtmdW5jdGlvbiBzZShlKXtjb25zdCB0PWFlKGUpO2lmKHQpcmV0dXJuIHQ7dGhyb3cgR31mdW5jdGlvbiBhZShlKXtjb25zdCB0PWllLmdldChlKTtpZih0KXJldHVybiB0fWNvbnN0IGNlPW5ldyBNYXA7ZnVuY3Rpb24gZGUoZSx0KXtjZS5oYXMoZSl8fGNlLnNldChlLG5ldyBTZXQpLGNlLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gdWUoZSx0KXtjb25zdCBuPWNlLmdldChlKTtuJiZuLmRlbGV0ZSh0KX12YXIgZmU9big1MzE2KTtmdW5jdGlvbiBsZShlKXtyZXR1cm5bLi4uTChlKV0ubWFwKChlPT4oey4uLmUsb25Vc2VySW5wdXQ6dm9pZCAwLG9uUmVzdWx0RGlzcGF0Y2g6dm9pZCAwfSkpKX1hc3luYyBmdW5jdGlvbiBwZShlLHQpe2lmKE0oZSx0LmlkKSl0aHJvdyBuZXcgRXJyb3IoXCJwcm92aWRlciB3aXRoIG5hbWUgYWxyZWFkeSBleGlzdHNcIik7Y29uc3Qgbj14KCk7YXdhaXQgVChlLHtpZGVudGl0eTpuLC4uLnR9KX1mdW5jdGlvbiBnZShlLHQpe0koZSx0KX1hc3luYyBmdW5jdGlvbiB3ZShlLHQsbixyKXtjb25zdCBvPU0oZSx0KTtpZighbyl0aHJvdyBGO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6aX09bztpZighaSlyZXR1cm47cmV0dXJuIGkoQihuLHgoKSxyKSl9YXN5bmMgZnVuY3Rpb24qaGUoZSx0LG4pe2NvbnN0IHI9ZnVuY3Rpb24oZSx0KXtjb25zdCBuPVtdLHI9W10sbz1bXSxpPVtdO2Zvcihjb25zdCBzIG9mIGUpe2NvbnN0IGU9VyhzLnNjb3JlT3JkZXIpLGE9e3Jlc3VsdHM6W10scHJvdmlkZXI6e2lkOnMuaWQsaWRlbnRpdHk6cy5pZGVudGl0eSx0aXRsZTpzLnRpdGxlLHNjb3JlT3JkZXI6cy5zY29yZU9yZGVyLGljb246cy5pY29ufX07bi5wdXNoKGEpLHIucHVzaChlKTtjb25zdCBjPShhc3luYygpPT57dHJ5e2NvbnN0e3Jlc3VsdHM6bixjb250ZXh0OnJ9PWF3YWl0IHMub25Vc2VySW5wdXQodCxlLnJlcyk7YS5yZXN1bHRzPU8oYS5yZXN1bHRzLG4pLGEuY29udGV4dD17Li4uYS5jb250ZXh0LC4uLnJ9fWNhdGNoKGUpe2EuZXJyb3I9ZX1jLmRvbmU9ITB9KSgpO2kucHVzaChjKSxvLnB1c2goby5sZW5ndGgpfXJldHVybntwcm92aWRlclJlc3BvbnNlczpuLGxpc3RlbmVyUmVzcG9uc2VzOnIsb3Blbkxpc3RlbmVyUmVzcG9uc2VzOm8saW5pdGlhbFJlc3BvbnNlUHJvbWlzZXM6aX19KHQudGFyZ2V0cz90LnRhcmdldHMubWFwKCh0PT5NKGUsdCkpKS5maWx0ZXIoKGU9PiEhZSkpOlsuLi5MKGUpLmZpbHRlcigoZT0+IWUuaGlkZGVuKSldLHQpLHtwcm92aWRlclJlc3BvbnNlczpvLGxpc3RlbmVyUmVzcG9uc2VzOml9PXI7bGV0e29wZW5MaXN0ZW5lclJlc3BvbnNlczpzLGluaXRpYWxSZXNwb25zZVByb21pc2VzOmF9PXIsYz1mZS5ELkZldGNoaW5nO2NvbnN0IHU9ZT0+e2M9ZSxuLnNldFN0YXRlKGMpfTtsZXQgZixsPSExO3Qub25DbG9zZSgoKCk9PntsPSEwLGYmJmYoKX0pKTtkb3tsZXQgZT0hMTtpZihhLmxlbmd0aCl7Y29uc3QgdD1bXTtmb3IoY29uc3QgbiBvZiBhKW4uZG9uZT9lPSEwOnQucHVzaChuKTthPXQsYS5sZW5ndGh8fCh1KGZlLkQuRmV0Y2hlZCksZT0hMCl9bGV0IHQsbj0hMTtjb25zdCByPSgpPT57bj0hMCx0JiZ0KCl9LHA9W107Zm9yKGNvbnN0IHQgb2Ygcyl7Y29uc3Qgbj1pW3RdLHM9b1t0XSxhPW4uZ2V0U3RhdHVzKCk7KGE9PT1kLk9wZW58fGM9PT1mZS5ELkZldGNoaW5nJiZhPT09ZC5Jbml0aWFsKSYmKHAucHVzaCh0KSxuLm9uQ2hhbmdlPXIpO2NvbnN0IHU9bi5nZXRSZXN1bHRCdWZmZXIoKTt1Lmxlbmd0aCYmKG4uc2V0UmVzdWx0QnVmZmVyKFtdKSxzLnJlc3VsdHM9TyhzLnJlc3VsdHMsdSksZT0hMCk7Y29uc3QgZj1uLmdldFJldm9rZWRCdWZmZXIoKTtpZihmLmxlbmd0aCl7bi5zZXRSZXZva2VkQnVmZmVyKFtdKTtjb25zdCB0PW5ldyBTZXQoZik7cy5yZXN1bHRzPXMucmVzdWx0cy5maWx0ZXIoKCh7a2V5OmV9KT0+IXQuaGFzKGUpKSksZT0hMH19aWYocz1wLGUmJih5aWVsZCBvKSxsKWJyZWFrO258fChzLmxlbmd0aHx8YS5sZW5ndGgpJiZhd2FpdCBQcm9taXNlLnJhY2UoWy4uLmEsbmV3IFByb21pc2UoKGU9Pnt0PWV9KSksbmV3IFByb21pc2UoKGU9PntmPWV9KSldKX13aGlsZShzLmxlbmd0aHx8YS5sZW5ndGgpO3JldHVybiB1KGZlLkQuQ29tcGxldGUpLG99bGV0IHllPTA7ZnVuY3Rpb24gdmUoe25hbWVzcGFjZWRUb3BpYzplLHRvcGljOnR9LG4pe3llKz0xO2NvbnN0IHI9RCh0LHllLnRvU3RyaW5nKCksbiksbz1oZShlLHIucmVxLHtzZXRTdGF0ZTplPT57by5zdGF0ZT1lfX0pO3JldHVybiBvLmlkPXllLnRvU3RyaW5nKCksby5jbG9zZT1yLmNsb3NlLG8uc3RhdGU9ZmUuRC5GZXRjaGluZyxvfWNvbnN0IG1lPW5ldyBNYXA7ZnVuY3Rpb24gU2UoZSx0KXtyZXR1cm5gJHtlfToke3R9YH1mdW5jdGlvbiBDZShlKXtyZXR1cm4gYXN5bmModCwuLi5uKT0+e2lmKCF0KXJldHVybntlcnJvcjokLm1lc3NhZ2V9O2xldCByO2lmKHQuaWQpcj1TZShlLm5hbWVzcGFjZWRUb3BpYyx0LmlkKTtlbHNle2NvbnN0IG49dmUoZSx0KTtyPVNlKGUubmFtZXNwYWNlZFRvcGljLG4uaWQpLHQuaWQ9bi5pZCxtZS5zZXQocix7Z2VuZXJhdG9yOm59KX1jb25zdCBvPW1lLmdldChyKTtjbGVhclRpbWVvdXQoby50aW1lb3V0KTtjb25zdCBpPWF3YWl0IG8uZ2VuZXJhdG9yLm5leHQoKTtyZXR1cm4gby50aW1lb3V0PWZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKCk9PnttZS5kZWxldGUoZSl9KSwxZTQpfShyKSx7Li4uaSxpZDp0LmlkLHN0YXRlOm8uZ2VuZXJhdG9yLnN0YXRlfX19ZnVuY3Rpb24gUGUoZSx0LG4pe3JldHVybiBzZShlKS5kaXNwYXRjaCh0LGcse2lkOm59KX1mdW5jdGlvbiBSZShlKXtyZXR1cm4gdD0+ZnVuY3Rpb24oZSx0KXtjb25zdCBuPVNlKGUsdCkscj1tZS5nZXQobik7ciYmci5nZW5lcmF0b3IuY2xvc2UoKX0oZSx0LmlkKX1hc3luYyBmdW5jdGlvbiBiZShlLHQse2lkOm4scXVlcnk6cixjb250ZXh0Om8sdGFyZ2V0czppfSl7Y29uc3Qgcz1zZShlKSxhPXtpZDpuLHF1ZXJ5OnIsY29udGV4dDpvLHRhcmdldHM6aSxwcm92aWRlcklkOnQuaWR9LGM9YXdhaXQgcy5kaXNwYXRjaCh0LmlkZW50aXR5LGwsYSksZD1jLmVycm9yO2lmKGQpdGhyb3cgbmV3IEVycm9yKGQpO3JldHVybiBjfWNvbnN0IFRlPW5ldyBNYXA7ZnVuY3Rpb24gSWUoZSx0LG4pe3JldHVybmAke2V9OiR7dC5uYW1lfToke3QudXVpZH06JHtufWB9Y29uc3QgTGU9bmV3IE1hcDtmdW5jdGlvbiBrZShlLHQsbil7cmV0dXJuYCR7ZX06JHt0fToke259YH1mdW5jdGlvbiBNZShlLHQpe2NvbnN0IG49SWUuYmluZChudWxsLGUsdC5pZGVudGl0eSkscj1QZS5iaW5kKG51bGwsZSx0LmlkZW50aXR5KSxvPWJlLmJpbmQobnVsbCxlLHQpO3JldHVybiBhc3luYyhpLHMpPT57Y29uc3QgYT1uKGkuaWQpO2lmKCFUZS5oYXMoYSkpe2NvbnN0IGU9KCk9PntyKGkuaWQpLFRlLmRlbGV0ZShhKX07VGUuc2V0KGEsZSksaS5vbkNsb3NlKGUpfWNvbnN0IGM9a2UoZSx0LmlkLGkuaWQpLHU9KCk9PntMZS5kZWxldGUoYykscy5jbG9zZSgpfTtpLm9uQ2xvc2UodSksTGUuc2V0KGMsKGU9PntlLnJlc3VsdHM/Lmxlbmd0aCYmcy5yZXNwb25kKGUucmVzdWx0cyksZS5yZXZva2VkPy5sZW5ndGgmJnMucmV2b2tlKC4uLmUucmV2b2tlZCksZS5zdGF0dXM9PT1kLk9wZW4mJnMub3BlbigpLGUuc3RhdHVzPT09ZC5DbG9zZSYmdSgpfSkpO2NvbnN0IGY9YXdhaXQgbyhpKTtyZXR1cm4gZi5zdGF0dXM9PT1kLk9wZW4mJnMub3BlbigpLGYuc3RhdHVzIT09ZC5DbG9zZSYmZi5zdGF0dXMhPT1kLkluaXRpYWx8fHUoKSxmfX1mdW5jdGlvbiBCZShlLHQpe3JldHVybiBhc3luYyBuPT57Y29uc3Qgcj1zZShlKSxvPXtwcm92aWRlcklkOnQuaWQscmVzdWx0Om59O3JldHVybiByLmRpc3BhdGNoKHQuaWRlbnRpdHkscCxvKX19Y29uc3QgT2U9bmV3IE1hcDtmdW5jdGlvbiBXZShlLHQpe3JldHVybmAke2V9LSR7dC5uYW1lfS0ke3QudXVpZH1gfWZ1bmN0aW9uIERlKGUpe3JldHVybiBhc3luYyh0LG4pPT57aWYoIXR8fCF0LmlkKXJldHVybiB2b2lkIG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh0KSk7aWYoTShlLHQuaWQpKXRocm93IF87dC5pZGVudGl0eT1uLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1XZShlLHQuaWRlbnRpdHkpO09lLmhhcyhuKXx8T2Uuc2V0KG4sW10pLE9lLmdldChuKS5wdXNoKHQuaWQpLGF3YWl0IFQoZSx7Li4udCxvblVzZXJJbnB1dDpNZShlLHQpLG9uUmVzdWx0RGlzcGF0Y2g6QmUoZSx0KX0pfShlLHQpfX1mdW5jdGlvbiB4ZShlKXtyZXR1cm4gdD0+e3QmJmZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1NKGUsdCk7aWYoIW4pcmV0dXJuO2NvbnN0IHI9V2UoZSxuLmlkZW50aXR5KSxvPU9lLmdldChyKTtpZihvKXtjb25zdCBuPW8uZmluZEluZGV4KChlPT5lPT09dCkpOy0xIT09biYmKG8uc3BsaWNlKG4sMSksSShlLHQpKX19KGUsdCl9fWNvbnN0IEFlPW5ldyBNYXA7ZnVuY3Rpb24gRWUoZSx0KXtBZS5oYXMoZSl8fEFlLnNldChlLG5ldyBTZXQpLEFlLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gRmUoZSx0KXtjb25zdCBuPUFlLmdldChlKTtuJiZuLmRlbGV0ZSh0KX1mdW5jdGlvbiBfZShlKXtyZXR1cm4gYXN5bmMgdD0+eyFmdW5jdGlvbihlLHQpe2NvbnN0IG49V2UoZSx0KSxyPU9lLmdldChuKTtpZihyKXtmb3IoY29uc3QgdCBvZiByKUkoZSx0KTtPZS5kZWxldGUobil9fShlLHQpO2NvbnN0IG49QWUuZ2V0KGUpO24mJm4uZm9yRWFjaCgoZT0+ZSh0KSkpfX1hc3luYyBmdW5jdGlvbiAkZShlKXtjb25zdHtuYW1lc3BhY2VkVG9waWM6dH09ZSxuPXkoZS5uYW1lc3BhY2VkVG9waWMpLHI9YXdhaXQobz1uLGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY3JlYXRlKG8pKTt2YXIgbztyZXR1cm4gci5vbkNvbm5lY3Rpb24oZnVuY3Rpb24oe25hbWVzcGFjZWRUb3BpYzplfSl7cmV0dXJuIGFzeW5jIHQ9Pntjb25zdCBuPWNlLmdldChlKTtpZihuKWZvcihjb25zdCBlIG9mIG4paWYoIWF3YWl0IGUodCkpdGhyb3cgcX19KGUpKSxyLm9uRGlzY29ubmVjdGlvbihfZSh0KSksci5yZWdpc3RlcihnLFJlKHQpKSxyLnJlZ2lzdGVyKGwsZnVuY3Rpb24oZSl7cmV0dXJuIHQ9Pntjb25zdCBuPWtlKGUsdC5wcm92aWRlcklkLHQuaWQpLHI9TGUuZ2V0KG4pO3ImJnIodCl9fSh0KSksci5yZWdpc3RlcihcIjJcIixEZSh0KSksci5yZWdpc3RlcihcIjNcIix4ZSh0KSksci5yZWdpc3RlcihcIjRcIixmdW5jdGlvbihlKXtyZXR1cm4gYXN5bmMoKT0+bGUoZSl9KHQpKSxyLnJlZ2lzdGVyKFwiMVwiLENlKGUpKSxyLnJlZ2lzdGVyKHAsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKHQsbik9PntpZighdHx8IXQucHJvdmlkZXJJZHx8IXQucmVzdWx0KXJldHVybjtjb25zdCByPU0oZSx0LnByb3ZpZGVySWQpO2lmKCFyKXRocm93IEY7Y29uc3R7b25SZXN1bHREaXNwYXRjaDpvfT1yO3JldHVybiBvPyh0LnJlc3VsdC5kaXNwYXRjaGVySWRlbnRpdHk9bixvKHQucmVzdWx0KSk6dm9pZCAwfX0odCkpLHJ9YXN5bmMgZnVuY3Rpb24gcWUoZSl7Y29uc3QgdD1zZShlKTt2YXIgbjtuPWUsaWUuZGVsZXRlKG4pLGF3YWl0IHQuZGVzdHJveSgpLGsoZSl9YXN5bmMgZnVuY3Rpb24gR2UoZSl7Y29uc3QgdD0oXCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplPy50b3BpYyl8fGYsbj1BKCkscj1oKG4sdCksbz17dG9waWM6dCxuYW1lc3BhY2U6bixuYW1lc3BhY2VkVG9waWM6cn07bGV0IGk9YWUocik7aXx8KGk9YXdhaXQgJGUobyksZnVuY3Rpb24oZSx0KXtpZS5zZXQoZSx0KX0ocixpKSk7Y29uc3Qgcz11ZS5iaW5kKG51bGwsciksYT1GZS5iaW5kKG51bGwsciksYz1TLmJpbmQobnVsbCxyKSxkPVIuYmluZChudWxsLHIpO3JldHVybntnZXRBbGxQcm92aWRlcnM6bGUuYmluZChudWxsLHIpLHNlYXJjaDp2ZS5iaW5kKG51bGwsbykscmVnaXN0ZXI6cGUuYmluZChudWxsLHIpLGRlcmVnaXN0ZXI6Z2UuYmluZChudWxsLHIpLG9uU3Vic2NyaXB0aW9uOmRlLmJpbmQobnVsbCxyKSxvbkRpc2Nvbm5lY3Q6RWUuYmluZChudWxsLHIpLG9uUmVnaXN0ZXI6bS5iaW5kKG51bGwsciksb25EZXJlZ2lzdGVyOlAuYmluZChudWxsLHIpLGRpc3BhdGNoOndlLmJpbmQobnVsbCxvKSxkaXNjb25uZWN0OnFlLmJpbmQobnVsbCxyKSxyZW1vdmVMaXN0ZW5lcjplPT57cyhlKSxhKGUpLGMoZSksZChlKX19fWNvbnN0e2NyZWF0ZTpOZX09byx7c3Vic2NyaWJlOkhlfT1yLFVlPXtjcmVhdGU6TmUsc3Vic2NyaWJlOkhlLGRlZmF1bHRUb3BpYzpcImFsbFwifSxWZT0oKT0+e2NvbnN0IGU9d2luZG93O2Uuc2VhcmNoPVVlLGUuZmluJiYoZS5maW4uU2VhcmNoPVVlKX0samU9ZT0+e2NvbnN0IHQ9KCk9PntWZSgpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl9O3JldHVybiB0fTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXtWZSgpO2NvbnN0IGU9XCJsb2FkXCIsdD1qZShlKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihlLHQpO2NvbnN0IG49XCJET01Db250ZW50TG9hZGVkXCIscj1qZShuKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihuLHIpfWNvbnN0IEtlPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gWGUoKXthd2FpdCBhc3luYyBmdW5jdGlvbihlKXtLZS5zZXQoZSxhd2FpdCBIZSh7dG9waWM6ZSx1dWlkOnUucTkuV29ya3NwYWNlfSkpfShhKX1sZXQgSmU7YXN5bmMgZnVuY3Rpb24gWmUoZSl7cmV0dXJuIGF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7cmV0dXJuIEplfHwoSmU9WGUoKSksSmV9KCksS2UuZ2V0KGUpfXZhciB6ZT1uKDM3NTgpO2NvbnN0IFFlPWFzeW5jIGU9PntpZighZS5pY29uKXRocm93IG5ldyBFcnJvcihgJHtlLmlkfSBwcm92aWRlciBuZWVkcyB0byBoYXZlIGljb24gcHJvcGVydHkgZGVmaW5lZC5gKTthd2FpdCgwLHMuYUIpKCk7Y29uc3QgdD1hd2FpdCBaZShhKTt0cnl7Y29uc3Qgbj1hd2FpdCB0LnJlZ2lzdGVyKGUpO3JldHVybigwLGkuY2spKHthbGxvd2VkOiEwfSksbn1jYXRjaChlKXt0aHJvdygwLGkuY2spKHthbGxvd2VkOiExLHJlamVjdGlvbkNvZGU6ZS5tZXNzYWdlfSksZX19LFllPWFzeW5jIGU9Pnthd2FpdCgwLHMuYUIpKCk7cmV0dXJuKGF3YWl0IFplKGEpKS5kZXJlZ2lzdGVyKGUpfTthc3luYyBmdW5jdGlvbiBldCgpe3JldHVybihhd2FpdCgwLHMuWGwpKCkpLmRpc3BhdGNoKHMuTWwuU2hvd0hvbWUsdm9pZCAwKX1hc3luYyBmdW5jdGlvbiB0dCgpe3JldHVybihhd2FpdCgwLHMuWGwpKCkpLmRpc3BhdGNoKHMuTWwuSGlkZUhvbWUsdm9pZCAwKX19LDMyOTg6KGUsdCxuKT0+e24uZCh0LHt3OigpPT5yLnd9KTt2YXIgcj1uKDUzMTYpfSwzNzU4OihlLHQsbik9Pnt2YXIgcixvLGk7bi5kKHQse1B0OigpPT5yLHlXOigpPT5vLGVsOigpPT5pfSksZnVuY3Rpb24oZSl7ZS5TdWdnZXN0aW9uPVwic3VnZ2VzdGlvblwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuQ29udGFjdD1cIkNvbnRhY3RcIixlLkN1c3RvbT1cIkN1c3RvbVwiLGUuTGlzdD1cIkxpc3RcIixlLlBsYWluPVwiUGxhaW5cIixlLlNpbXBsZVRleHQ9XCJTaW1wbGVUZXh0XCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5NdWx0aVNlbGVjdD1cIk11bHRpU2VsZWN0XCJ9KGl8fChpPXt9KSl9LDc1NjQ6KGUsdCxuKT0+e24oMzI5OCksbigzNzU4KSxuKDYxMTQpLG4oMjEwOSl9LDYxMTQ6KGUsdCxuKT0+e3ZhciByLG87bi5kKHQse0w6KCk9PnIsVDooKT0+b30pLGZ1bmN0aW9uKGUpe2UuU25hcHNob3Q9XCJzbmFwc2hvdFwiLGUuTWFuaWZlc3Q9XCJtYW5pZmVzdFwiLGUuVmlldz1cInZpZXdcIixlLkV4dGVybmFsPVwiZXh0ZXJuYWxcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkxhbmRpbmdQYWdlPVwibGFuZGluZ1BhZ2VcIixlLkFwcEdyaWQ9XCJhcHBHcmlkXCJ9KG98fChvPXt9KSl9LDIxMDk6KGUsdCxuKT0+e24uZCh0LHtwNjooKT0+cixHbzooKT0+byxiSTooKT0+aSxaSjooKT0+c30pO2NvbnN0IHI9e0NvbnRhaW5lcjpcIkNvbnRhaW5lclwiLEJ1dHRvbjpcIkJ1dHRvblwifSxvPXtUZXh0OlwiVGV4dFwiLEltYWdlOlwiSW1hZ2VcIixMaXN0OlwiTGlzdFwifSxpPXsuLi5yLC4uLm99O3ZhciBzOyFmdW5jdGlvbihlKXtlLlByaW1hcnk9XCJwcmltYXJ5XCIsZS5TZWNvbmRhcnk9XCJzZWNvbmRhcnlcIixlLlRleHRPbmx5PVwidGV4dE9ubHlcIn0oc3x8KHM9e30pKX0sMzE3OihlLHQsbik9PntuLnIodCksbi5kKHQse0FwcE1hbmlmZXN0VHlwZTooKT0+aS5MLFN0b3JlZnJvbnRUZW1wbGF0ZTooKT0+aS5ULGRlcmVnaXN0ZXI6KCk9PmYsaGlkZTooKT0+bCxyZWdpc3RlcjooKT0+dSxzaG93OigpPT5wfSk7dmFyIHI9big2NTMyKSxvPW4oNzQwNSk7big3NTY0KTt2YXIgaT1uKDYxMTQpO2xldCBzO2NvbnN0IGE9bmV3IE1hcCxjPWU9PntpZighYS5oYXMoZSkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IFByb3ZpZGVyIHdpdGggaWQgJHtlfSBpcyBub3QgcmVnaXN0ZXJlZGApO3JldHVybiBhLmdldChlKX0sZD1hc3luYyBlPT57Y29uc3QgdD1hd2FpdCgwLG8uWGwpKCk7aWYoYS5oYXMoZS5pZCkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IHByb3ZpZGVyIHdpdGggaWQgJHtlLmlkfSBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtyZXR1cm4gYS5zZXQoZS5pZCxlKSwoZT0+e2UuaXNTdG9yZWZyb250QWN0aW9uc1JlZ2lzdGVyZWR8fChlLmlzU3RvcmVmcm9udEFjdGlvbnNSZWdpc3RlcmVkPSEwLGUucmVnaXN0ZXIoby5NbC5HZXRTdG9yZWZyb250UHJvdmlkZXJBcHBzLChlPT5jKGUpLmdldEFwcHMoKSkpLGUucmVnaXN0ZXIoby5NbC5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXIsKGU9PmMoZSkuZ2V0Rm9vdGVyKCkpKSxlLnJlZ2lzdGVyKG8uTWwuR2V0U3RvcmVmcm9udFByb3ZpZGVyTGFuZGluZ1BhZ2UsKGU9PmMoZSkuZ2V0TGFuZGluZ1BhZ2UoKSkpLGUucmVnaXN0ZXIoby5NbC5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uLChlPT5jKGUpLmdldE5hdmlnYXRpb24oKSkpLGUucmVnaXN0ZXIoby5NbC5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHAsKCh7aWQ6ZSxhcHA6dH0pPT5jKGUpLmxhdW5jaEFwcCh0KSkpKX0pKHQpLHQuZGlzcGF0Y2goby5NbC5SZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcixlKX0sdT1lPT4ocz1kKGUpLCgwLHIuZDkpKHthbGxvd2VkOiEwfSkscyksZj1hc3luYyBlPT57YXdhaXQgcyxhLmRlbGV0ZShlKTtyZXR1cm4oYXdhaXQoMCxvLlhsKSgpKS5kaXNwYXRjaChvLk1sLkRlcmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIsZSl9LGw9YXN5bmMoKT0+e2F3YWl0IHMsYXdhaXQoMCxvLmFCKSgpLGF3YWl0KGFzeW5jKCk9Pihhd2FpdCgwLG8uRG0pKCkpLmRpc3BhdGNoKG8uTWwuSGlkZVN0b3JlZnJvbnQsdm9pZCAwKSkoKX0scD1hc3luYygpPT57YXdhaXQgcyxhd2FpdCgwLG8uYUIpKCksYXdhaXQoYXN5bmMoKT0+KGF3YWl0KDAsby5EbSkoKSkuZGlzcGF0Y2goby5NbC5TaG93U3RvcmVmcm9udCxudWxsKSkoKX19LDc0MDU6KGUsdCxuKT0+e24uZCh0LHtNbDooKT0+cyxEbTooKT0+YSxYbDooKT0+ZixhQjooKT0+dX0pO3ZhciByPW4oNjY3OCk7Y29uc3Qgbz1yLkF4JiZcImNvbXBsZXRlXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZuZXcgUHJvbWlzZSgoZT0+ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIiwoKCk9PntcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZlKCl9KSkpKTt2YXIgaT1uKDEyMSk7dmFyIHM7IWZ1bmN0aW9uKGUpe2UuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5EZXJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyPVwiZGVyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJzPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXJzXCIsZS5IaWRlU3RvcmVmcm9udD1cImhpZGUtc3RvcmVmcm9udFwiLGUuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWFwcHNcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbGFuZGluZy1wYWdlXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXI9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1mb290ZXJcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb249XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1uYXZpZ2F0aW9uXCIsZS5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHA9XCJsYXVuY2gtc3RvcmVmcm9udC1wcm92aWRlci1hcHBcIixlLlNob3dTdG9yZWZyb250PVwic2hvdy1zdG9yZWZyb250XCIsZS5DcmVhdGVTdG9yZWZyb250V2luZG93PVwiY3JlYXRlLXN0b3JlZnJvbnQtd2luZG93XCIsZS5TaG93SG9tZT1cInNob3ctaG9tZVwiLGUuSGlkZUhvbWU9XCJoaWRlLWhvbWVcIixlLkFzc2lnbkhvbWVTZWFyY2hDb250ZXh0PVwiYXNzaWduLWhvbWUtc2VhcmNoLWNvbnRleHRcIixlLkdldExlZ2FjeVBhZ2VzPVwiZ2V0LWxlZ2FjeS1wYWdlc1wiLGUuR2V0TGVnYWN5V29ya3NwYWNlcz1cImdldC1sZWdhY3ktd29ya3NwYWNlc1wiLGUuR2V0Q29tcHV0ZWRQbGF0Zm9ybVRoZW1lPVwiZ2V0LWNvbXB1dGVkLXBsYXRmb3JtLXRoZW1lXCJ9KHN8fChzPXt9KSk7Y29uc3QgYT1mdW5jdGlvbihlKXtsZXQgdDtyZXR1cm4oKT0+e2lmKCFyLnNTKXRocm93IG5ldyBFcnJvcihcImdldENoYW5uZWxDbGllbnQgY2Fubm90IGJlIHVzZWQgb3V0c2lkZSBhbiBPcGVuRmluIGVudi4gQXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiB0fHwodD0oYXN5bmMoKT0+e2F3YWl0IG87Y29uc3Qgbj1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSk7cmV0dXJuIG4ub25EaXNjb25uZWN0aW9uKChhc3luYygpPT57dD12b2lkIDB9KSksbn0pKCkudGhlbigoZT0+ZSkpLmNhdGNoKChuPT57dGhyb3cgdD12b2lkIDAsbmV3IEVycm9yKGBmYWlsZWQgdG8gY29ubmVjdCB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX06ICR7bn1gKX0pKSksdH19KFwiX19vZl93b3Jrc3BhY2VfcHJvdG9jb2xfX1wiKSxjPVwiaXNMYXVuY2hlZFZpYUxpYlwiLGQ9ZT0+e2NvbnN0IHQ9bmV3IFVSTChlKTtyZXR1cm4gdC5zZWFyY2hQYXJhbXMuYXBwZW5kKGMsXCJ0cnVlXCIpLHQudG9TdHJpbmcoKX0sdT1hc3luYygpPT57aWYoIWF3YWl0KDAsaS5KVikoaS5pVykpcmV0dXJuKHIuWkt8fC0xPT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luXCIpKSYmYXdhaXQgZmluLkFwcGxpY2F0aW9uLnN0YXJ0RnJvbU1hbmlmZXN0KGQoci5hVykpLGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKGQoci5HWCkpfSxmPWFzeW5jKCk9Pihhd2FpdCB1KCksYSgpKX0sNTgwNjooZSx0LG4pPT57bi5kKHQse3E5OigpPT5yfSk7dmFyIHIsbyxpLHM9big2Njc4KTshZnVuY3Rpb24oZSl7ZS5Xb3Jrc3BhY2U9XCJvcGVuZmluLWJyb3dzZXJcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLlJ1blJlcXVlc3RlZD1cInJ1bi1yZXF1ZXN0ZWRcIixlLldpbmRvd09wdGlvbnNDaGFuZ2VkPVwid2luZG93LW9wdGlvbnMtY2hhbmdlZFwiLGUuV2luZG93Q2xvc2VkPVwid2luZG93LWNsb3NlZFwiLGUuV2luZG93Q3JlYXRlZD1cIndpbmRvdy1jcmVhdGVkXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5GaW5Qcm90b2NvbD1cImZpbi1wcm90b2NvbFwifShpfHwoaT17fSkpO3MuQUIscy5BQixyLldvcmtzcGFjZSxyLldvcmtzcGFjZX0sNjY3ODooZSx0LG4pPT57dmFyIHI7bi5kKHQse3NTOigpPT5vLEF4OigpPT5pLEFCOigpPT5hLG9DOigpPT5jLFpLOigpPT5kLEdYOigpPT51LGFXOigpPT5mLHUwOigpPT5wfSksZnVuY3Rpb24oZSl7ZS5Mb2NhbD1cImxvY2FsXCIsZS5EZXY9XCJkZXZcIixlLlN0YWdpbmc9XCJzdGFnaW5nXCIsZS5Qcm9kPVwicHJvZFwifShyfHwocj17fSkpO2NvbnN0IG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGZpbixpPShcInVuZGVmaW5lZFwiPT10eXBlb2YgcHJvY2Vzc3x8cHJvY2Vzcy5lbnY/LkpFU1RfV09SS0VSX0lELFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpLHM9aT93aW5kb3cub3JpZ2luOnIuTG9jYWwsYT1vJiZmaW4ubWUudXVpZCxjPW8mJmZpbi5tZS5uYW1lLGQ9KG8mJmZpbi5tZS5lbnRpdHlUeXBlLFwicHJvZFwiPT09ci5Mb2NhbCksdT0oci5EZXYsci5TdGFnaW5nLHIuUHJvZCxcImZpbnM6Ly9zeXN0ZW0tYXBwcy93b3Jrc3BhY2VcIiksZj1cImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzcuMy4xMC9hcHAuanNvblwiLGw9ZT0+ZS5zdGFydHNXaXRoKFwiaHR0cDovL1wiKXx8ZS5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIik/ZTpzK2UscD0obChcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzcuMy4xMFwiKSxsKFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvNy4zLjEwXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfRE9DU19QTEFURk9STV9VUkwmJmwoV09SS1NQQUNFX0RPQ1NfUExBVEZPUk1fVVJMKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX0RPQ1NfQ0xJRU5UX1VSTCYmbChXT1JLU1BBQ0VfRE9DU19DTElFTlRfVVJMKSxcIjcuMy4xMFwiKX0sNjUzMjooZSx0LG4pPT57bi5kKHQse2NrOigpPT5hLGQ5OigpPT5jfSk7dmFyIHIsbz1uKDY2NzgpLGk9bigxMjEpOyFmdW5jdGlvbihlKXtlLkJyb3dzZXI9XCJCcm93c2VyXCIsZS5Ib21lPVwiSG9tZVwiLGUuTm90aWZpY2F0aW9uPVwiTm90aWZpY2F0aW9uXCIsZS5TdG9yZWZyb250PVwiU3RvcmVmcm9udFwiLGUuUGxhdGZvcm09XCJQbGF0Zm9ybVwiLGUuVGhlbWluZz1cIlRoZW1pbmdcIn0ocnx8KHI9e30pKTtjb25zdCBzPWFzeW5jKGUsdCk9Pntjb25zdCBuPXthcGlWZXJzaW9uOnQuYXBpVmVyc2lvbnx8by51MCxjb21wb25lbnROYW1lOmUsY29tcG9uZW50VmVyc2lvbjpvLnUwLC4uLnR9O2Zpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcIndvcmtzcGFjZS1saWNlbnNpbmdcIixkYXRhOm59KX0sYT1hc3luYyBlPT57aS5PSS51dWlkPT09aS5HaS51dWlkJiZpLk9JLm5hbWU9PT1pLkdpLm5hbWV8fHMoci5Ib21lLGUpfSxjPWFzeW5jIGU9PntzKHIuU3RvcmVmcm9udCxlKX19LDEyMTooZSx0LG4pPT57bi5kKHQse0dpOigpPT5jLE9JOigpPT5kLGlXOigpPT51LEpWOigpPT5mfSk7dmFyIHIsbyxpPW4oNTgwNikscz1uKDY2NzgpOyFmdW5jdGlvbihlKXtlLkhvbWU9XCJvcGVuZmluLWhvbWVcIixlLkRvY2s9XCJvcGVuZmluLWRvY2tcIixlLlN0b3JlZnJvbnQ9XCJvcGVuZmluLXN0b3JlZnJvbnRcIixlLkhvbWVJbnRlcm5hbD1cIm9wZW5maW4taG9tZS1pbnRlcm5hbFwiLGUuQnJvd3Nlck1lbnU9XCJvcGVuZmluLWJyb3dzZXItbWVudVwiLGUuQnJvd3NlckluZGljYXRvcj1cIm9wZW5maW4tYnJvd3Nlci1pbmRpY2F0b3JcIixlLkJyb3dzZXJXaW5kb3c9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtd2luZG93XCJ9KHJ8fChyPXt9KSksZnVuY3Rpb24oZSl7ZS5TaG93bj1cInNob3duXCIsZS5Cb3VuZHNDaGFuZ2VkPVwiYm91bmRzLWNoYW5nZWRcIixlLkxheW91dFJlYWR5PVwibGF5b3V0LXJlYWR5XCIsZS5FbmRVc2VyQm91bmRzQ2hhbmdpbmc9XCJlbmQtdXNlci1ib3VuZHMtY2hhbmdpbmdcIixlLkJsdXJyZWQ9XCJibHVycmVkXCIsZS5DbG9zZVJlcXVlc3RlZD1cImNsb3NlLXJlcXVlc3RlZFwiLGUuRm9jdXNlZD1cImZvY3VzZWRcIixlLlNob3dSZXF1ZXN0ZWQ9XCJzaG93LXJlcXVlc3RlZFwiLGUuVmlld0NyYXNoZWQ9XCJ2aWV3LWNyYXNoZWRcIixlLlZpZXdBdHRhY2hlZD1cInZpZXctYXR0YWNoZWRcIixlLlZpZXdEZXRhY2hlZD1cInZpZXctZGV0YWNoZWRcIixlLlZpZXdQYWdlVGl0bGVVcGRhdGVkPVwidmlldy1wYWdlLXRpdGxlLXVwZGF0ZWRcIixlLlZpZXdEZXN0cm95ZWQ9XCJ2aWV3LWRlc3Ryb3llZFwiLGUuT3B0aW9uc0NoYW5nZWQ9XCJvcHRpb25zLWNoYW5nZWRcIn0ob3x8KG89e30pKTtmdW5jdGlvbiBhKGUpe2lmKCFzLnNTKXRocm93IG5ldyBFcnJvcihcImdldE9GV2luZG93IGNhbiBvbmx5IGJlIHVzZWQgaW4gYW4gT3BlbkZpbiBlbnYuIEF2b2lkIGNhbGxpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiBmaW4uV2luZG93LndyYXBTeW5jKGUpfWNvbnN0IGM9e25hbWU6cy5vQyx1dWlkOnMuQUJ9O2NvbnN0IGQ9e25hbWU6ci5Ib21lLHV1aWQ6aS5xOS5Xb3Jrc3BhY2V9LHU9KHIuRG9jayxpLnE5LldvcmtzcGFjZSxyLlN0b3JlZnJvbnQsaS5xOS5Xb3Jrc3BhY2Use25hbWU6aS5xOS5Xb3Jrc3BhY2UsdXVpZDppLnE5LldvcmtzcGFjZX0pO2NvbnN0IGY9ZT0+YShlKS5nZXRPcHRpb25zKCkudGhlbigoKCk9PiEwKSkuY2F0Y2goKCgpPT4hMSkpfSw1MzE2OihlLHQsbik9Pnt2YXIgcixvO24uZCh0LHtEOigpPT5yLHc6KCk9Pm99KSxmdW5jdGlvbihlKXtlLkZldGNoaW5nPVwiZmV0Y2hpbmdcIixlLkZldGNoZWQ9XCJmZXRjaGVkXCIsZS5Db21wbGV0ZT1cImNvbXBsZXRlXCJ9KHJ8fChyPXt9KSksZnVuY3Rpb24oZSl7ZS5BY3RpdmU9XCJhY3RpdmVcIixlLkRlZmF1bHQ9XCJkZWZhdWx0XCJ9KG98fChvPXt9KSl9fSx0PXt9O2Z1bmN0aW9uIG4ocil7dmFyIG89dFtyXTtpZih2b2lkIDAhPT1vKXJldHVybiBvLmV4cG9ydHM7dmFyIGk9dFtyXT17ZXhwb3J0czp7fX07cmV0dXJuIGVbcl0oaSxpLmV4cG9ydHMsbiksaS5leHBvcnRzfW4uZD0oZSx0KT0+e2Zvcih2YXIgciBpbiB0KW4ubyh0LHIpJiYhbi5vKGUscikmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIse2VudW1lcmFibGU6ITAsZ2V0OnRbcl19KX0sbi5vPShlLHQpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KSxuLnI9ZT0+e1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9O3ZhciByPXt9OygoKT0+e24ucihyKSxuLmQocix7QXBwTWFuaWZlc3RUeXBlOigpPT5wLkwsQnV0dG9uU3R5bGU6KCk9PmYuWkosQ0xJQWN0aW9uOigpPT5sLlB0LENMSUZpbHRlck9wdGlvblR5cGU6KCk9PmwuZWwsQ0xJVGVtcGxhdGU6KCk9PmwueVcsQ29udGFpbmVyVGVtcGxhdGVGcmFnbWVudE5hbWVzOigpPT5mLnA2LEhvbWU6KCk9Pm8sTGVnYWN5OigpPT5lLFByZXNlbnRhdGlvblRlbXBsYXRlRnJhZ21lbnROYW1lczooKT0+Zi5HbyxTZWFyY2hUYWdCYWNrZ3JvdW5kOigpPT51LncsU3RvcmVmcm9udDooKT0+ZCxTdG9yZWZyb250VGVtcGxhdGU6KCk9PnAuVCxUZW1wbGF0ZUZyYWdtZW50VHlwZXM6KCk9PmYuYkl9KTt2YXIgZT17fTtuLnIoZSksbi5kKGUse2dldFBhZ2VzOigpPT5hLGdldFdvcmtzcGFjZXM6KCk9PmN9KTt2YXIgdCxvPW4oMzEzMyk7big2Njc4KSxuKDEyMSk7IWZ1bmN0aW9uKGUpe2UuVGFiQ3JlYXRlZD1cInRhYi1jcmVhdGVkXCIsZS5Db250YWluZXJDcmVhdGVkPVwiY29udGFpbmVyLWNyZWF0ZWRcIixlLkNvbnRhaW5lclJlc2l6ZWQ9XCJjb250YWluZXItcmVzaXplZFwifSh0fHwodD17fSkpO25ldyBNYXA7dmFyIGk7IWZ1bmN0aW9uKGUpe2UuQ3VycmVudFdvcmtzcGFjZUlkPVwiY3VycmVudFdvcmtzcGFjZUlkXCIsZS5MYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3c9XCJsYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3dcIixlLk1hY2hpbmVOYW1lPVwibWFjaGluZU5hbWVcIixlLk5ld1RhYlBhZ2VMYXlvdXQ9XCJOZXdUYWJQYWdlTGF5b3V0XCIsZS5OZXdUYWJQYWdlU29ydD1cIk5ld1RhYlBhZ2VTb3J0XCJ9KGl8fChpPXt9KSk7dmFyIHM9big3NDA1KTtjb25zdCBhPSgpPT5hc3luYyBmdW5jdGlvbigpe3JldHVybihhd2FpdCgwLHMuRG0pKCkpLmRpc3BhdGNoKHMuTWwuR2V0TGVnYWN5UGFnZXMsdm9pZCAwKX0oKSxjPSgpPT4oYXN5bmMoKT0+KGF3YWl0KDAscy5EbSkoKSkuZGlzcGF0Y2gocy5NbC5HZXRMZWdhY3lXb3Jrc3BhY2VzLHZvaWQgMCkpKCk7dmFyIGQ9bigzMTcpLHU9bigzMjk4KSxmPW4oMjEwOSksbD1uKDM3NTgpLHA9big2MTE0KX0pKCksbW9kdWxlLmV4cG9ydHM9cn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TGlrZUtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2NpaVRvQXJyYXk7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCJ2YXIgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAqIGFycmF5IG9mIGBvYmplY3RgIHByb3BlcnR5IHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eSBuYW1lc1xuICogb2YgYHByb3BzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIGFycmF5TWFwKHByb3BzLCBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VWYWx1ZXM7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5QXJyYXk7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG4iLCJ2YXIgYXNjaWlUb0FycmF5ID0gcmVxdWlyZSgnLi9fYXNjaWlUb0FycmF5JyksXG4gICAgaGFzVW5pY29kZSA9IHJlcXVpcmUoJy4vX2hhc1VuaWNvZGUnKSxcbiAgICB1bmljb2RlVG9BcnJheSA9IHJlcXVpcmUoJy4vX3VuaWNvZGVUb0FycmF5Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBoYXNVbmljb2RlKHN0cmluZylcbiAgICA/IHVuaWNvZGVUb0FycmF5KHN0cmluZylcbiAgICA6IGFzY2lpVG9BcnJheShzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvQXJyYXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlVG9BcnJheTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpLFxuICAgIHN0dWJGYWxzZSA9IHJlcXVpcmUoJy4vc3R1YkZhbHNlJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB2YWx1ZXMgPSByZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bUl0ZXJhdG9yID0gU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0FycmF5KHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiBfLnRvQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddXG4gKlxuICogXy50b0FycmF5KDEpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLnRvQXJyYXkobnVsbCk7XG4gKiAvLyA9PiBbXVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb0FycmF5KHZhbHVlKSA6IGNvcHlBcnJheSh2YWx1ZSk7XG4gIH1cbiAgaWYgKHN5bUl0ZXJhdG9yICYmIHZhbHVlW3N5bUl0ZXJhdG9yXSkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkodmFsdWVbc3ltSXRlcmF0b3JdKCkpO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgZnVuYyA9IHRhZyA9PSBtYXBUYWcgPyBtYXBUb0FycmF5IDogKHRhZyA9PSBzZXRUYWcgPyBzZXRUb0FycmF5IDogdmFsdWVzKTtcblxuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheTtcbiIsInZhciBiYXNlVmFsdWVzID0gcmVxdWlyZSgnLi9fYmFzZVZhbHVlcycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9lbW9qaScpOyIsIi8qanNsaW50IG5vZGU6IHRydWUqL1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvdG9BcnJheScpO1xudmFyIGVtb2ppQnlOYW1lID0gcmVxdWlyZSgnLi9lbW9qaS5qc29uJyk7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIHJlZ2V4IHRvIHBhcnNlIGVtb2ppIGluIGEgc3RyaW5nIC0gZmluZHMgZW1vamksIGUuZy4gOmNvZmZlZTpcbiAqL1xudmFyIGVtb2ppTmFtZVJlZ2V4ID0gLzooW2EtekEtWjAtOV9cXC1cXCtdKyk6L2c7XG5cbi8qKlxuICogcmVnZXggdG8gdHJpbSB3aGl0ZXNwYWNlXG4gKiB1c2UgaW5zdGVhZCBvZiBTdHJpbmcucHJvdG90eXBlLnRyaW0oKSBmb3IgSUU4IHN1cHBvcnRcbiAqL1xudmFyIHRyaW1TcGFjZVJlZ2V4ID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG4vKipcbiAqIFJlbW92ZXMgY29sb25zIG9uIGVpdGhlciBzaWRlXG4gKiBvZiB0aGUgc3RyaW5nIGlmIHByZXNlbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQ29sb25zIChzdHIpIHtcbiAgdmFyIGNvbG9uSW5kZXggPSBzdHIuaW5kZXhPZignOicpO1xuICBpZiAoY29sb25JbmRleCA+IC0xKSB7XG4gICAgLy8gOmVtb2ppOiAoaHR0cDovL3d3dy5lbW9qaS1jaGVhdC1zaGVldC5jb20vKVxuICAgIGlmIChjb2xvbkluZGV4ID09PSBzdHIubGVuZ3RoIC0gMSkge1xuICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBjb2xvbkluZGV4KTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyKGNvbG9uSW5kZXggKyAxKTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQWRkcyBjb2xvbnMgdG8gZWl0aGVyIHNpZGVcbiAqIG9mIHRoZSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gd3JhcENvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyLmxlbmd0aCA+IDApID8gJzonICsgc3RyICsgJzonIDogc3RyO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IHRoZSB3b3JkIGlzIHdyYXBwZWQgaW4gY29sb25zXG4gKiBieSBvbmx5IGFkZGluZyB0aGVtLCBpZiB0aGV5IGFyZSBub3QgdGhlcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuc3VyZUNvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyWzBdICE9PSAnOicpID8gd3JhcENvbG9ucyhzdHIpIDogc3RyO1xufVxuXG4vLyBOb24gc3BhY2luZyBtYXJrLCBzb21lIGVtb3RpY29ucyBoYXZlIHRoZW0uIEl0J3MgdGhlICdWYXJpYW50IEZvcm0nLFxuLy8gd2hpY2ggcHJvdmlkZXMgbW9yZSBpbmZvcm1hdGlvbiBzbyB0aGF0IGVtb3RpY29ucyBjYW4gYmUgcmVuZGVyZWQgYXNcbi8vIG1vcmUgY29sb3JmdWwgZ3JhcGhpY3MuIEZFMEUgaXMgYSB1bmljb2RlIHRleHQgdmVyc2lvbiwgd2hlcmUgYXMgRkUwRlxuLy8gc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgZ3JhcGhpY2FsIHZlcnNpb24uIFRoZSBjb2RlIGdyYWNlZnVsbHkgZGVncmFkZXMuXG52YXIgTk9OX1NQQUNJTkdfTUFSSyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUwMzkpOyAvLyA2NTAzOSAtICfvuI8nIC0gMHhGRTBGO1xudmFyIG5vblNwYWNpbmdSZWdleCA9IG5ldyBSZWdFeHAoTk9OX1NQQUNJTkdfTUFSSywgJ2cnKVxuXG4vLyBSZW1vdmUgdGhlIG5vbi1zcGFjaW5nLW1hcmsgZnJvbSB0aGUgY29kZSwgbmV2ZXIgc2VuZCBhIHN0cmlwcGVkIHZlcnNpb25cbi8vIHRvIHRoZSBjbGllbnQsIGFzIGl0IGtpbGxzIGdyYXBoaWNhbCBlbW90aWNvbnMuXG5mdW5jdGlvbiBzdHJpcE5TQiAoY29kZSkge1xuICByZXR1cm4gY29kZS5yZXBsYWNlKG5vblNwYWNpbmdSZWdleCwgJycpO1xufTtcblxuLy8gUmV2ZXJzZWQgaGFzaCB0YWJsZSwgd2hlcmUgYXMgZW1vamlCeU5hbWUgY29udGFpbnMgYSB7IGhlYXJ0OiAn4p2kJyB9XG4vLyBkaWN0aW9uYXJ5IGVtb2ppQnlDb2RlIGNvbnRhaW5zIHsg4p2kOiAnaGVhcnQnIH0uIFRoZSBjb2RlcyBhcmUgbm9ybWFsaXplZFxuLy8gdG8gdGhlIHRleHQgdmVyc2lvbi5cbnZhciBlbW9qaUJ5Q29kZSA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKS5yZWR1Y2UoZnVuY3Rpb24oaCxrKSB7XG4gIGhbc3RyaXBOU0IoZW1vamlCeU5hbWVba10pXSA9IGs7XG4gIHJldHVybiBoO1xufSwge30pO1xuXG4vKipcbiAqIEVtb2ppIG5hbWVzcGFjZVxuICovXG52YXIgRW1vamkgPSB7XG4gIGVtb2ppOiBlbW9qaUJ5TmFtZSxcbn07XG5cbi8qKlxuICogZ2V0IGVtb2ppIGNvZGUgZnJvbSBuYW1lLiByZXR1cm4gZW1vamkgY29kZSBiYWNrIGlmIGNvZGUgaXMgcGFzc2VkIGluLlxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5fZ2V0ID0gZnVuY3Rpb24gX2dldCAoZW1vamkpIHtcbiAgaWYgKGVtb2ppQnlDb2RlW3N0cmlwTlNCKGVtb2ppKV0pIHtcbiAgICByZXR1cm4gZW1vamk7XG4gIH0gZWxzZSBpZiAoZW1vamlCeU5hbWUuaGFzT3duUHJvcGVydHkoZW1vamkpKSB7XG4gICAgcmV0dXJuIGVtb2ppQnlOYW1lW2Vtb2ppXTtcbiAgfVxuXG4gIHJldHVybiBlbnN1cmVDb2xvbnMoZW1vamkpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgY29kZSBmcm9tIDplbW9qaTogc3RyaW5nIG9yIG5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkuZ2V0ID0gZnVuY3Rpb24gZ2V0IChlbW9qaSkge1xuICBlbW9qaSA9IHN0cmlwQ29sb25zKGVtb2ppKTtcblxuICByZXR1cm4gRW1vamkuX2dldChlbW9qaSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IGVpdGhlciBjb2RlIG9yIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lT3JDb2RlIFRoZSBlbW9qaSB0byBmaW5kLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmZpbmQgPSBmdW5jdGlvbiBmaW5kIChuYW1lT3JDb2RlKSB7XG4gIHJldHVybiBFbW9qaS5maW5kQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmZpbmRCeUNvZGUobmFtZU9yQ29kZSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBlbW9qaSB0byBmaW5kIGVpdGhlciBgY29mZmVlYCBvciBgOmNvZmZlZTpgO1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5maW5kQnlOYW1lID0gZnVuY3Rpb24gZmluZEJ5TmFtZSAobmFtZSkge1xuICB2YXIgc3RyaXBwZWQgPSBzdHJpcENvbG9ucyhuYW1lKTtcbiAgdmFyIGVtb2ppID0gZW1vamlCeU5hbWVbc3RyaXBwZWRdO1xuXG4gIHJldHVybiBlbW9qaSA/ICh7IGVtb2ppOiBlbW9qaSwga2V5OiBzdHJpcHBlZCB9KSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgY29kZSAoZW1vamkpXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSBUaGUgZW1vamkgdG8gZmluZDsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuZmluZEJ5Q29kZSA9IGZ1bmN0aW9uIGZpbmRCeUNvZGUgKGNvZGUpIHtcbiAgdmFyIHN0cmlwcGVkID0gc3RyaXBOU0IoY29kZSk7XG4gIHZhciBuYW1lID0gZW1vamlCeUNvZGVbc3RyaXBwZWRdO1xuXG4gIC8vIGxvb2t1cCBlbW9qaSB0byBlbnN1cmUgdGhlIFZhcmlhbnQgRm9ybSBpcyByZXR1cm5lZFxuICByZXR1cm4gbmFtZSA/ICh7IGVtb2ppOiBlbW9qaUJ5TmFtZVtuYW1lXSwga2V5OiBuYW1lIH0pIDogdW5kZWZpbmVkO1xufTtcblxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVtb2ppIGlzIGtub3duIGJ5IHRoaXMgbGlicmFyeVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPckNvZGUgVGhlIGVtb2ppIHRvIHZhbGlkYXRlLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppID0gZnVuY3Rpb24gaGFzRW1vamkgKG5hbWVPckNvZGUpIHtcbiAgcmV0dXJuIEVtb2ppLmhhc0Vtb2ppQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmhhc0Vtb2ppQnlDb2RlKG5hbWVPckNvZGUpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhbiBlbW9qaSB3aXRoIGdpdmVuIG5hbWUgaXMga25vd24gYnkgdGhpcyBsaWJyYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZW1vamkgdG8gdmFsaWRhdGUgZWl0aGVyIGBjb2ZmZWVgIG9yIGA6Y29mZmVlOmA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppQnlOYW1lID0gZnVuY3Rpb24gaGFzRW1vamlCeU5hbWUgKG5hbWUpIHtcbiAgdmFyIHJlc3VsdCA9IEVtb2ppLmZpbmRCeU5hbWUobmFtZSk7XG4gIHJldHVybiAhIXJlc3VsdCAmJiByZXN1bHQua2V5ID09PSBzdHJpcENvbG9ucyhuYW1lKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiBlbW9qaSBpcyBrbm93biBieSB0aGlzIGxpYnJhcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBlbW9qaSB0byB2YWxpZGF0ZTsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamlCeUNvZGUgPSBmdW5jdGlvbiBoYXNFbW9qaUJ5Q29kZSAoY29kZSkge1xuICB2YXIgcmVzdWx0ID0gRW1vamkuZmluZEJ5Q29kZShjb2RlKTtcbiAgcmV0dXJuICEhcmVzdWx0ICYmIHN0cmlwTlNCKHJlc3VsdC5lbW9qaSkgPT09IHN0cmlwTlNCKGNvZGUpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgbmFtZSBmcm9tIGNvZGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1ZGVDb2xvbnMgc2hvdWxkIHRoZSByZXN1bHQgaW5jbHVkZSB0aGUgOjpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkud2hpY2ggPSBmdW5jdGlvbiB3aGljaCAoZW1vamlfY29kZSwgaW5jbHVkZUNvbG9ucykge1xuICB2YXIgY29kZSA9IHN0cmlwTlNCKGVtb2ppX2NvZGUpO1xuICB2YXIgd29yZCA9IGVtb2ppQnlDb2RlW2NvZGVdO1xuXG4gIHJldHVybiBpbmNsdWRlQ29sb25zID8gd3JhcENvbG9ucyh3b3JkKSA6IHdvcmQ7XG59O1xuXG4vKipcbiAqIGVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgOmVtb2ppOiB3aXRoIGFuIGVtb2ppKVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbl9taXNzaW5nIChnZXRzIGVtb2ppIG5hbWUgd2l0aG91dCA6OiBhbmQgcmV0dXJucyBhIHByb3BlciBlbW9qaSBpZiBubyBlbW9qaSB3YXMgZm91bmQpXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm9ybWF0ICh3cmFwIHRoZSByZXR1cm5lZCBlbW9qaSBpbiBhIGN1c3RvbSBlbGVtZW50KVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5lbW9qaWZ5ID0gZnVuY3Rpb24gZW1vamlmeSAoc3RyLCBvbl9taXNzaW5nLCBmb3JtYXQpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcblxuICByZXR1cm4gc3RyLnNwbGl0KGVtb2ppTmFtZVJlZ2V4KSAvLyBwYXJzZSBlbW9qaSB2aWEgcmVnZXhcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gcGFyc2VFbW9qaShzLCBpKSB7XG4gICAgICAgICAgICAgIC8vIGV2ZXJ5IHNlY29uZCBlbGVtZW50IGlzIGFuIGVtb2ppLCBlLmcuIFwidGVzdCA6ZmFzdF9mb3J3YXJkOlwiIC0+IFsgXCJ0ZXN0IFwiLCBcImZhc3RfZm9yd2FyZFwiIF1cbiAgICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSByZXR1cm4gcztcbiAgICAgICAgICAgICAgdmFyIGVtb2ppID0gRW1vamkuX2dldChzKTtcbiAgICAgICAgICAgICAgdmFyIGlzTWlzc2luZyA9IGVtb2ppLmluZGV4T2YoJzonKSA+IC0xO1xuXG4gICAgICAgICAgICAgIGlmIChpc01pc3NpbmcgJiYgdHlwZW9mIG9uX21pc3NpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb25fbWlzc2luZyhzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaXNNaXNzaW5nICYmIHR5cGVvZiBmb3JtYXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0KGVtb2ppLCBzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBlbW9qaTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJykgLy8gY29udmVydCBiYWNrIHRvIHN0cmluZ1xuICA7XG59O1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5yYW5kb20gPSBmdW5jdGlvbiByYW5kb20gKCkge1xuICB2YXIgZW1vamlLZXlzID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpO1xuICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaUtleXMubGVuZ3RoKTtcbiAgdmFyIGtleSA9IGVtb2ppS2V5c1tyYW5kb21JbmRleF07XG4gIHZhciBlbW9qaSA9IEVtb2ppLl9nZXQoa2V5KTtcbiAgcmV0dXJuIHsga2V5OiBrZXksIGVtb2ppOiBlbW9qaSB9O1xufVxuXG4vKipcbiAqICByZXR1cm4gYW4gY29sbGVjdGlvbiBvZiBwb3RlbnRpYWwgZW1vamkgbWF0Y2hlc1xuICogIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqICBAcmV0dXJuIHtBcnJheS48T2JqZWN0Pn1cbiAqL1xuRW1vamkuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoIChzdHIpIHtcbiAgdmFyIGVtb2ppS2V5cyA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKTtcbiAgdmFyIG1hdGNoZXIgPSBzdHJpcENvbG9ucyhzdHIpXG4gIHZhciBtYXRjaGluZ0tleXMgPSBlbW9qaUtleXMuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5pbmRleE9mKG1hdGNoZXIpID09PSAwO1xuICB9KTtcbiAgcmV0dXJuIG1hdGNoaW5nS2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgZW1vamk6IEVtb2ppLl9nZXQoa2V5KSxcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiB1bmVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgZW1vamkgd2l0aCA6ZW1vamk6KVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkudW5lbW9qaWZ5ID0gZnVuY3Rpb24gdW5lbW9qaWZ5IChzdHIpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcbiAgdmFyIHdvcmRzID0gdG9BcnJheShzdHIpO1xuXG4gIHJldHVybiB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCkge1xuICAgIHJldHVybiBFbW9qaS53aGljaCh3b3JkLCB0cnVlKSB8fCB3b3JkO1xuICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogcmVwbGFjZSBlbW9qaXMgd2l0aCByZXBsYWNlbWVudCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbnxzdHJpbmd9IHRoZSBzdHJpbmcgb3IgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgZW1vamkgd2l0aFxuICogQHBhcmFtIHtib29sZWFufSBzaG91bGQgdHJhaWxpbmcgd2hpdGVzcGFjZXMgYmUgY2xlYW5lZD8gRGVmYXVsdHMgZmFsc2VcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKHN0ciwgcmVwbGFjZW1lbnQsIGNsZWFuU3BhY2VzKSB7XG4gIGlmICghc3RyKSByZXR1cm4gJyc7XG5cbiAgdmFyIHJlcGxhY2UgPSB0eXBlb2YgcmVwbGFjZW1lbnQgPT09ICdmdW5jdGlvbicgPyByZXBsYWNlbWVudCA6IGZ1bmN0aW9uKCkgeyByZXR1cm4gcmVwbGFjZW1lbnQ7IH07XG4gIHZhciB3b3JkcyA9IHRvQXJyYXkoc3RyKTtcblxuICB2YXIgcmVwbGFjZWQgPSB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCwgaWR4KSB7XG4gICAgdmFyIGVtb2ppID0gRW1vamkuZmluZEJ5Q29kZSh3b3JkKTtcblxuICAgIGlmIChlbW9qaSAmJiBjbGVhblNwYWNlcyAmJiB3b3Jkc1tpZHggKyAxXSA9PT0gJyAnKSB7XG4gICAgICB3b3Jkc1tpZHggKyAxXSA9ICcnO1xuICAgIH1cblxuICAgIHJldHVybiBlbW9qaSA/IHJlcGxhY2UoZW1vamkpIDogd29yZDtcbiAgfSkuam9pbignJyk7XG5cbiAgcmV0dXJuIGNsZWFuU3BhY2VzID8gcmVwbGFjZWQucmVwbGFjZSh0cmltU3BhY2VSZWdleCwgJycpIDogcmVwbGFjZWQ7XG59O1xuXG5cbi8qKlxuICogcmVtb3ZlIGFsbCBlbW9qaXMgZnJvbSBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5zdHJpcCA9IGZ1bmN0aW9uIHN0cmlwIChzdHIpIHtcbiAgcmV0dXJuIEVtb2ppLnJlcGxhY2Uoc3RyLCAnJywgdHJ1ZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtb2ppO1xuIiwiaW1wb3J0IHtcbiAgQ0xJVGVtcGxhdGUsXG4gIHR5cGUgQ0xJRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcbiAgdHlwZSBDTElGaWx0ZXIsXG4gIHR5cGUgQ0xJU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcbiAgdHlwZSBIb21lU2VhcmNoUmVzcG9uc2UsXG4gIHR5cGUgSG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgKiBhcyBlbW9qaSBmcm9tIFwibm9kZS1lbW9qaVwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbiwgSW50ZWdyYXRpb25NYW5hZ2VyLCBJbnRlZ3JhdGlvbk1vZHVsZSB9IGZyb20gXCIuLi8uLi9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEVtb2ppU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGdldEVtb2ppVGVtcGxhdGUgfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBFbW9qaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxFbW9qaVNldHRpbmdzPiB7XG4gIC8qKlxuICAgKiBQcm92aWRlciBpZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfUFJPVklERVJfSUQgPSBcImVtb2ppXCI7XG5cbiAgLyoqXG4gICAqIFRoZSBrZXkgdG8gdXNlIGZvciBhIGVtb2ppIHJlc3VsdC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfRU1PSklfUFJPVklERVJfREVUQUlMU19BQ1RJT04gPSBcIkVtb2ppIERldGFpbHNcIjtcblxuICAvKipcbiAgICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgY29weSBrZXkgYWN0aW9uLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9DT1BZX0tFWV9BQ1RJT04gPSBcIkNvcHkgS2V5XCI7XG5cbiAgLyoqXG4gICAqIFRoZSBrZXkgdG8gdXNlIGZvciBhIGVtb2ppIGNvcHkga2V5IGFjdGlvbi5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfRU1PSklfUFJPVklERVJfQ09QWV9FTU9KSV9BQ1RJT04gPSBcIkNvcHkgRW1vamlcIjtcblxuICAvKipcbiAgICogVGhlIGludGVncmF0aW9uIG1hbmFnZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJpdmF0ZSBfaW50ZWdyYXRpb25NYW5hZ2VyOiBJbnRlZ3JhdGlvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBtb2R1bGUgaXMgYmVpbmcgcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIGludGVncmF0aW9uTWFuYWdlciBUaGUgbWFuYWdlciBmb3IgdGhlIGludGVncmF0aW9uLlxuICAgKiBAcGFyYW0gaW50ZWdyYXRpb24gVGhlIGludGVncmF0aW9uIGRldGFpbHMuXG4gICAqIEByZXR1cm5zIE5vdGhpbmcuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXIoXG4gICAgaW50ZWdyYXRpb25NYW5hZ2VyOiBJbnRlZ3JhdGlvbk1hbmFnZXIsXG4gICAgaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2ludGVncmF0aW9uTWFuYWdlciA9IGludGVncmF0aW9uTWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9kdWxlIGlzIGJlaW5nIGRlcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuICAgKiBAcmV0dXJucyBOb3RoaW5nLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlcmVnaXN0ZXIoaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+KTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgYXBwbGljYXRpb24gZW50cmllcy5cbiAgICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuICAgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBhcHBsaWNhdGlvbiBlbnRyaWVzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEFwcFNlYXJjaEVudHJpZXMoaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG4gICAqIEBwYXJhbSBpbnRlZ3JhdGlvbiBUaGUgaW50ZWdyYXRpb24gZGV0YWlscy5cbiAgICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG4gICAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcbiAgICBpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4sXG4gICAgcmVzdWx0OiBDTElEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuICAgIGxhc3RSZXNwb25zZTogQ0xJU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkYXRhOiB7IHVybD86IHN0cmluZyB9ID0gcmVzdWx0LmRhdGE7XG5cbiAgICBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OICYmIHJlc3VsdC5kYXRhLmVtb2ppKSB7XG4gICAgICBhd2FpdCBmaW4uQ2xpcGJvYXJkLndyaXRlVGV4dCh7IGRhdGE6IHJlc3VsdC5kYXRhLmVtb2ppIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OICYmIHJlc3VsdC5kYXRhLmtleSkge1xuICAgICAgYXdhaXQgZmluLkNsaXBib2FyZC53cml0ZVRleHQoeyBkYXRhOiByZXN1bHQuZGF0YS5rZXkgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0RFVEFJTFNfQUNUSU9OICYmXG4gICAgICBkYXRhLnVybCAmJlxuICAgICAgdGhpcy5faW50ZWdyYXRpb25NYW5hZ2VyLm9wZW5VcmxcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuX2ludGVncmF0aW9uTWFuYWdlci5vcGVuVXJsKGRhdGEudXJsKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cbiAgICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuICAgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuICAgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuICAgIGludGVncmF0aW9uOiBJbnRlZ3JhdGlvbjxFbW9qaVNldHRpbmdzPixcbiAgICBxdWVyeTogc3RyaW5nLFxuICAgIGZpbHRlcnM6IENMSUZpbHRlcltdLFxuICAgIGxhc3RSZXNwb25zZTogQ0xJU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuICApOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIGlmIChxdWVyeS5zdGFydHNXaXRoKFwiL2Vtb2ppIFwiKSkge1xuICAgICAgbGV0IGtleSA9IHF1ZXJ5LnNsaWNlKDcpO1xuXG4gICAgICBpZiAoa2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgLy8gRmluZCBleGFjdCBtYXRjaCBmaXJzdCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgY29uc3QgbWF0Y2hFbW9qaSA9IGVtb2ppLmdldChrZXkpO1xuICAgICAgICBpZiAobWF0Y2hFbW9qaSAmJiAhbWF0Y2hFbW9qaS5zdGFydHNXaXRoKFwiOlwiKSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmNyZWF0ZVJlc3VsdChrZXksIG1hdGNoRW1vamkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgYWxsIG90aGVyIHBvdGVudGlhbCBtYXRjaGVzXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGVtb2ppLnNlYXJjaChrZXkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgIGlmIChyZXN1bHQuZW1vamkgIT09IG1hdGNoRW1vamkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmNyZWF0ZVJlc3VsdChyZXN1bHQua2V5LCByZXN1bHQuZW1vamkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0c1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc2VhcmNoIHJlc3VsdC5cbiAgICogQHBhcmFtIGtleSBUaGUga2V5IGZvciB0aGUgZW1vamkuXG4gICAqIEBwYXJhbSBlbW9qaU5hbWUgVGhlIGVtb2ppIHN5bWJvbC5cbiAgICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHQuXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVJlc3VsdChrZXk6IHN0cmluZywgZW1vamlOYW1lOiBzdHJpbmcpOiBIb21lU2VhcmNoUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBgZW1vamktJHtrZXl9YCxcbiAgICAgIHRpdGxlOiBrZXksXG4gICAgICBsYWJlbDogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICB7IG5hbWU6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9FTU9KSV9BQ1RJT04sIGhvdGtleTogXCJDbWRPckN0cmwrQ1wiIH0sXG4gICAgICAgIHsgbmFtZTogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiwgaG90a2V5OiBcIkVudGVyXCIgfVxuICAgICAgXSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcHJvdmlkZXJJZDogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9QUk9WSURFUl9JRCxcbiAgICAgICAga2V5LFxuICAgICAgICBlbW9qaTogZW1vamlOYW1lLFxuICAgICAgICB1cmw6IGBodHRwczovL2Vtb2ppcGVkaWEub3JnLyR7a2V5fS9gXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGU6IENMSVRlbXBsYXRlLkN1c3RvbSxcbiAgICAgIHRlbXBsYXRlQ29udGVudDoge1xuICAgICAgICBsYXlvdXQ6IGdldEVtb2ppVGVtcGxhdGUoe1xuICAgICAgICAgIGNvcHlFbW9qaUFjdGlvbjogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTixcbiAgICAgICAgICBjb3B5S2V5QWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTixcbiAgICAgICAgICBkZXRhaWxzQWN0aW9uOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0RFVEFJTFNfQUNUSU9OXG4gICAgICAgIH0pLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAga2V5VGl0bGU6IFwiS2V5XCIsXG4gICAgICAgICAgY29weUtleVRpdGxlOiBcIkNvcHkgS2V5XCIsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGVtb2ppVGl0bGU6IFwiRW1vamlcIixcbiAgICAgICAgICBjb3B5RW1vamlUaXRsZTogXCJDb3B5IEVtb2ppXCIsXG4gICAgICAgICAgZW1vamk6IGVtb2ppTmFtZSxcbiAgICAgICAgICBkZXRhaWxzVGl0bGU6IFwiRnVydGhlciBEZXRhaWxzXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEJ1dHRvblN0eWxlLCBUZW1wbGF0ZUZyYWdtZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHsgY3JlYXRlQnV0dG9uLCBjcmVhdGVDb250YWluZXIsIGNyZWF0ZVRleHQgfSBmcm9tIFwiLi4vLi4vdGVtcGxhdGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbW9qaVRlbXBsYXRlKGFjdGlvbnM6IHtcbiAgY29weUVtb2ppQWN0aW9uOiBzdHJpbmc7XG4gIGNvcHlLZXlBY3Rpb246IHN0cmluZztcbiAgZGV0YWlsc0FjdGlvbjogc3RyaW5nO1xufSk6IFRlbXBsYXRlRnJhZ21lbnQge1xuICByZXR1cm4gY3JlYXRlQ29udGFpbmVyKFxuICAgIFwiY29sdW1uXCIsXG4gICAgW1xuICAgICAgY3JlYXRlVGV4dChcImtleVRpdGxlXCIsIDEyLCB7IGNvbG9yOiBcImxpZ2h0Z3JheVwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiB9KSxcbiAgICAgIGNyZWF0ZUNvbnRhaW5lcihcbiAgICAgICAgXCJyb3dcIixcbiAgICAgICAgW1xuICAgICAgICAgIGNyZWF0ZVRleHQoXCJrZXlcIiwgMTIsIHsgY29sb3I6IFwid2hpdGVcIiwgd29yZEJyZWFrOiBcImJyZWFrLWFsbFwiIH0pLFxuICAgICAgICAgIGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUtleVRpdGxlXCIsIGFjdGlvbnMuY29weUtleUFjdGlvbiwgeyBmb250U2l6ZTogXCIxMnB4XCIgfSlcbiAgICAgICAgXSxcbiAgICAgICAgeyBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIgfVxuICAgICAgKSxcblxuICAgICAgY3JlYXRlVGV4dChcImVtb2ppVGl0bGVcIiwgMTIsIHsgY29sb3I6IFwibGlnaHRncmF5XCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuICAgICAgY3JlYXRlQ29udGFpbmVyKFxuICAgICAgICBcInJvd1wiLFxuICAgICAgICBbXG4gICAgICAgICAgY3JlYXRlVGV4dChcImVtb2ppXCIsIDMyLCB7IGNvbG9yOiBcIndoaXRlXCIgfSksXG4gICAgICAgICAgY3JlYXRlQnV0dG9uKEJ1dHRvblN0eWxlLlNlY29uZGFyeSwgXCJjb3B5RW1vamlUaXRsZVwiLCBhY3Rpb25zLmNvcHlFbW9qaUFjdGlvbiwgeyBmb250U2l6ZTogXCIxMnB4XCIgfSlcbiAgICAgICAgXSxcbiAgICAgICAgeyBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIgfVxuICAgICAgKSxcblxuICAgICAgY3JlYXRlQ29udGFpbmVyKFxuICAgICAgICBcInJvd1wiLFxuICAgICAgICBbY3JlYXRlQnV0dG9uKEJ1dHRvblN0eWxlLlByaW1hcnksIFwiZGV0YWlsc1RpdGxlXCIsIGFjdGlvbnMuZGV0YWlsc0FjdGlvbiwgeyBmb250U2l6ZTogXCIxMnB4XCIgfSldLFxuICAgICAgICB7IGp1c3RpZnlDb250ZW50OiBcImZsZXgtZW5kXCIgfVxuICAgICAgKVxuICAgIF0sXG4gICAge1xuICAgICAgcGFkZGluZzogXCIxMHB4XCJcbiAgICB9XG4gICk7XG59XG4iLCJpbXBvcnQge1xuICBCdXR0b25TdHlsZSxcbiAgQnV0dG9uVGVtcGxhdGVGcmFnbWVudCxcbiAgSW1hZ2VUZW1wbGF0ZUZyYWdtZW50LFxuICBQbGFpbkNvbnRhaW5lclRlbXBsYXRlRnJhZ21lbnQsXG4gIFRlbXBsYXRlRnJhZ21lbnQsXG4gIFRlbXBsYXRlRnJhZ21lbnRUeXBlcyxcbiAgVGV4dFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0ICogYXMgQ1NTIGZyb20gXCJjc3N0eXBlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIoXG4gIGNvbnRhaW5lclR5cGU6IFwiY29sdW1uXCIgfCBcInJvd1wiLFxuICBjaGlsZHJlbjogVGVtcGxhdGVGcmFnbWVudFtdLFxuICBzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBQbGFpbkNvbnRhaW5lclRlbXBsYXRlRnJhZ21lbnQge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRlbXBsYXRlRnJhZ21lbnRUeXBlcy5Db250YWluZXIsXG4gICAgc3R5bGU6IHtcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZmxleERpcmVjdGlvbjogY29udGFpbmVyVHlwZSxcbiAgICAgIC4uLnN0eWxlXG4gICAgfSxcbiAgICBjaGlsZHJlblxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGV4dChkYXRhS2V5OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIgPSAxNCwgc3R5bGU/OiBDU1MuUHJvcGVydGllcyk6IFRleHRUZW1wbGF0ZUZyYWdtZW50IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuVGV4dCxcbiAgICBkYXRhS2V5LFxuICAgIHN0eWxlOiB7XG4gICAgICBmb250U2l6ZTogYCR7Zm9udFNpemUgPz8gMTR9cHhgLFxuICAgICAgLi4uc3R5bGVcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbWFnZShkYXRhS2V5OiBzdHJpbmcsIGFsdGVybmF0aXZlVGV4dDogc3RyaW5nLCBzdHlsZT86IENTUy5Qcm9wZXJ0aWVzKTogSW1hZ2VUZW1wbGF0ZUZyYWdtZW50IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuSW1hZ2UsXG4gICAgZGF0YUtleSxcbiAgICBhbHRlcm5hdGl2ZVRleHQsXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLnN0eWxlXG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKFxuICBidXR0b25TdHlsZTogQnV0dG9uU3R5bGUsXG4gIHRpdGxlS2V5OiBzdHJpbmcsXG4gIGFjdGlvbjogc3RyaW5nLFxuICBzdHlsZT86IENTUy5Qcm9wZXJ0aWVzXG4pOiBCdXR0b25UZW1wbGF0ZUZyYWdtZW50IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuQnV0dG9uLFxuICAgIGJ1dHRvblN0eWxlLFxuICAgIGNoaWxkcmVuOiBbY3JlYXRlVGV4dCh0aXRsZUtleSwgMTIpXSxcbiAgICBhY3Rpb24sXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLnN0eWxlXG4gICAgfVxuICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiaW1wb3J0IHsgRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb24tcHJvdmlkZXJcIjtcblxuZXhwb3J0IGNvbnN0IGludGVncmF0aW9uID0gbmV3IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9