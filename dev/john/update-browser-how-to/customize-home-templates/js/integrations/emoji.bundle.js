/******/ var __webpack_modules__ = ({

/***/ "./node_modules/@openfin/workspace/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@openfin/workspace/index.js ***!
  \**************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={3133:(e,t,n)=>{n.r(t),n.d(t,{CLIAction:()=>Ze.Pt,CLIFilterOptionType:()=>Ze.el,CLITemplate:()=>Ze.yW,deregister:()=>Qe,hide:()=>et,register:()=>ze,show:()=>Ye});var r={};n.r(r),n.d(r,{subscribe:()=>re});var o={};n.r(o),n.d(o,{create:()=>qe});var i=n(7405);const s="home";var a;!function(e){e.Commands="home-commands"}(a||(a={}));var c,d=n(5806);n(7564);!function(e){e[e.Initial=0]="Initial",e[e.Open=1]="Open",e[e.Close=2]="Close"}(c||(c={}));const u="all",f="0",l="5",p="6",g=()=>{};function w(e,t){return e?`${e}-${t}`:t}function h(e){return`__search-${e}-topic__`}const y=new Map;function v(e,t){y.has(e)||y.set(e,new Set),y.get(e).add(t)}function m(e,t){const n=y.get(e);n&&n.delete(t)}const S=new Map;function C(e,t){S.has(e)||S.set(e,new Set),S.get(e).add(t)}function P(e,t){const n=S.get(e);n&&n.delete(t)}const R=new Map;async function b(e,t){R.has(e)||R.set(e,new Map),R.get(e).set(t.id,t);const n=y.get(e);if(!n)return;const r=[...n].map((e=>e()));await Promise.all(r)}async function L(e,t){const n=R.get(e);if(!n)return;n.delete(t);const r=S.get(e);if(!r)return;const o=[...r].map((e=>e()));await Promise.all(o)}function T(e){return R.get(e)?[...R.get(e).values()]:[]}function I(e){const t=R.get(e);t&&t.clear()}function M(e,t){const n=R.get(e);return n?n.get(t):null}function k(e,t,n){return{...e,action:n||e.actions[0],dispatcherIdentity:t}}function B(e,t,n="ascending"){const r=e||[];if(!t?.length)return r;const o=[],i=new Map;t.forEach((e=>{if(e.key)return i.set(e.key,e);o.push(e)}));let s=r.map((e=>{const{key:t}=e;if(t&&i.has(t)){const e=i.get(t);return i.delete(t),e}return e}));return s.push(...i.values(),...o),s="ascending"===n?s.sort(((e,t)=>(null!==e.score&&void 0!==e.score?e.score:1/0)-(null!==t.score&&void 0!==t.score?t.score:1/0))):s.sort(((e,t)=>(null!==t.score&&void 0!==t.score?t.score:1/0)-(null!==e.score&&void 0!==e.score?e.score:1/0))),s}function O(e){const t={};let n=[];let r=[];let o=c.Initial;t.getStatus=()=>o,t.getResultBuffer=()=>n,t.setResultBuffer=e=>{n=e,n?.length&&t.onChange()},t.getRevokedBuffer=()=>r,t.setRevokedBuffer=e=>{r=e,r?.length&&t.onChange()},t.onChange=g;const i={};return t.res=i,i.close=()=>{o!==c.Close&&(o=c.Close,t.onChange())},i.open=()=>{o!==c.Open&&(o=c.Open,t.onChange())},i.respond=n=>{const r=B(t.getResultBuffer(),n,e);t.setResultBuffer(r)},i.revoke=(...e)=>{const n=new Set(e),r=t.getResultBuffer().filter((({key:e})=>{const t=n.has(e);return t&&n.delete(e),!t}));t.setResultBuffer(r),n.size&&(t.getRevokedBuffer().forEach((e=>n.add(e))),t.setRevokedBuffer([...n]))},t}function W(e,t,n){const r=new Set;let o=!1;return{close:()=>{o=!0;for(const e of r)e()},req:{id:t,topic:e,...n,context:n?.context||{},onClose:e=>{r.add(e),o&&e()},removeListener:e=>{r.delete(e)}}}}function D(){return{name:fin.me.name,uuid:fin.me.uuid}}function x(){let e;try{const t=fin.Platform.getCurrentSync();if(!t?.identity)return;e=t.identity.uuid}catch(e){}return e}const A="deregistered or does not exist",E=new Error(`provider ${A}`),F=new Error("provider with name already exists"),_=new Error("bad payload"),$=new Error("subscription rejected"),q=new Error(`channel ${A}`),G=new Map;function N(e){const t=H(e);if(t)return t;throw q}function H(e){const t=G.get(e);if(t)return t}function U(e,t){G.set(e,t)}const V=new Map;function K(e){V.has(e)||V.set(e,new Map);const t=V.get(e);return{getRequestsForIdentity:e=>{const n=function(e){return`${e.uuid}:${e.name}`}(e);return t.has(n)||t.set(n,new Map),t.get(n)}}}async function X(e,t){return(await N(e)).dispatch(f,t)}function j({namespacedTopic:e,topic:t}){const n=M.bind(null,e),r=K(e),o=X.bind(null,e);return async(e,i)=>{if(!e||!e.id||!e.providerId){const e=_;return{error:e.message}}const{id:s,providerId:a}=e,c=n(a);if(!c){const e=E;return{error:e.message}}const d=r.getRequestsForIdentity(i);let u=d.get(e.id);u||(u=W(t,s,e),d.set(e.id,u));const f=O(),l=()=>{const e=f.getResultBuffer();f.setResultBuffer([]);const t=f.getRevokedBuffer();f.setRevokedBuffer([]);const n=f.getStatus();o({id:s,providerId:a,results:e,revoked:t,status:n})};let p=!0,g=!1;f.onChange=()=>{if(p)return p=!1,void l();g||(g=!0,setTimeout((()=>{g=!1,l()}),100))};try{const{results:e,context:t}=await c.onUserInput(u.req,f.res),n=f.getStatus();return{id:s,providerId:a,status:n,results:e,context:t}}catch(e){return{id:s,providerId:a,error:e.message}}}}async function J(e,t,n){const r=n||await N(e),o=D(),i={identity:o,...t,onUserInput:void 0,onResultDispatch:void 0};await r.dispatch("2",i),await b(e,{identity:o,...t})}async function Z(e,t){const n=await N(e);return await n.dispatch("3",t),L(e,t)}async function z(e,t,n,r){const o=k(n,D(),r),i=M(e,t);if(i){const{onResultDispatch:e}=i;if(!e)return;return e(o)}const s={providerId:t,result:o};return(await N(e)).dispatch(l,s)}async function Q(e,t){const n={...t,context:t?.context||{}},r={},o=async function*(e,t,{setState:n}){const r=await N(e);for(;;){const e=await r.dispatch("1",t),o=e.error;if(o)throw new Error(o);const i=e;if(t.id=i.id,n(i.state),i.done)return i.value;yield i.value}}(e,n,{setState:e=>{r.state=e}});let i=await o.next();return r.id=n.id,r.close=()=>{!async function(e,t){(await N(e)).dispatch(p,{id:t})}(e,r.id)},r.next=()=>{if(i){const e=i;return i=void 0,e}return o.next()},r}async function Y(e){return(await N(e)).dispatch("4",null)}async function ee(e){const t=await N(e);var n;n=e,G.delete(n),I(e),await t.disconnect()}function te(e){const{namespacedTopic:t}=e,n=K(t);return async r=>{if(!H(t))return;const o=n.getRequestsForIdentity(r);for(const{req:e,close:t}of o.values())t(),o.delete(e.id);U(t,(async e=>{const{namespacedTopic:t}=e,n=await ne(e);for(const e of T(t))await J(t,e,n);return n})(e))}}async function ne(e){const{namespacedTopic:t}=e,n=h(t),r=await async function(e){for(let t=0;t<50;t++)try{return await fin.InterApplicationBus.Channel.connect(e,{wait:!1})}catch(e){if(49===t)throw e;await new Promise((e=>setTimeout(e,1e3)))}}(n);return r.register(f,j(e)),r.register(p,function(e){const t=K(e);return(e,n)=>{const r=t.getRequestsForIdentity(n),o=r.get(e.id);o&&(o.close(),r.delete(e.id))}}(t)),r.register(l,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const r=M(e,t.providerId);if(!r)return;const{onResultDispatch:o}=r;return o?(t.result.dispatcherIdentity=n,o(t.result)):void 0}}(t)),r.onDisconnection(te(e)),r}async function re(e){const t=("string"==typeof e?e:e?.topic)||u,n=("string"==typeof e?null:e?.uuid)||x(),r=w(n,t),o={topic:t,namespace:n,namespacedTopic:r};let i=H(r);return i||(i=ne(o),U(r,i),await i),{getAllProviders:Y.bind(null,r),register:J.bind(null,r),search:Q.bind(null,r),deregister:Z.bind(null,r),dispatch:z.bind(null,r),disconnect:ee.bind(null,r)}}const oe=new Map;function ie(e){const t=se(e);if(t)return t;throw q}function se(e){const t=oe.get(e);if(t)return t}const ae=new Map;function ce(e,t){ae.has(e)||ae.set(e,new Set),ae.get(e).add(t)}function de(e,t){const n=ae.get(e);n&&n.delete(t)}var ue=n(5316);function fe(e){return[...T(e)].map((e=>({...e,onUserInput:void 0,onResultDispatch:void 0})))}async function le(e,t){if(M(e,t.id))throw new Error("provider with name already exists");const n=D();await b(e,{identity:n,...t})}function pe(e,t){L(e,t)}async function ge(e,t,n,r){const o=M(e,t);if(!o)throw E;const{onResultDispatch:i}=o;if(!i)return;return i(k(n,D(),r))}async function*we(e,t,n){const r=function(e,t){const n=[],r=[],o=[],i=[];for(const s of e){const e=O(s.scoreOrder),a={results:[],provider:{id:s.id,identity:s.identity,title:s.title,scoreOrder:s.scoreOrder,icon:s.icon}};n.push(a),r.push(e);const c=(async()=>{try{const{results:n,context:r}=await s.onUserInput(t,e.res);a.results=B(a.results,n),a.context={...a.context,...r}}catch(e){a.error=e}c.done=!0})();i.push(c),o.push(o.length)}return{providerResponses:n,listenerResponses:r,openListenerResponses:o,initialResponsePromises:i}}(t.targets?t.targets.map((t=>M(e,t))).filter((e=>!!e)):[...T(e).filter((e=>!e.hidden))],t),{providerResponses:o,listenerResponses:i}=r;let{openListenerResponses:s,initialResponsePromises:a}=r,d=ue.D.Fetching;const u=e=>{d=e,n.setState(d)};let f,l=!1;t.onClose((()=>{l=!0,f&&f()}));do{let e=!1;if(a.length){const t=[];for(const n of a)n.done?e=!0:t.push(n);a=t,a.length||(u(ue.D.Fetched),e=!0)}let t,n=!1;const r=()=>{n=!0,t&&t()},p=[];for(const t of s){const n=i[t],s=o[t],a=n.getStatus();(a===c.Open||d===ue.D.Fetching&&a===c.Initial)&&(p.push(t),n.onChange=r);const u=n.getResultBuffer();u.length&&(n.setResultBuffer([]),s.results=B(s.results,u),e=!0);const f=n.getRevokedBuffer();if(f.length){n.setRevokedBuffer([]);const t=new Set(f);s.results=s.results.filter((({key:e})=>!t.has(e))),e=!0}}if(s=p,e&&(yield o),l)break;n||(s.length||a.length)&&await Promise.race([...a,new Promise((e=>{t=e})),new Promise((e=>{f=e}))])}while(s.length||a.length);return u(ue.D.Complete),o}let he=0;function ye({namespacedTopic:e,topic:t},n){he+=1;const r=W(t,he.toString(),n),o=we(e,r.req,{setState:e=>{o.state=e}});return o.id=he.toString(),o.close=r.close,o.state=ue.D.Fetching,o}const ve=new Map;function me(e,t){return`${e}:${t}`}function Se(e){return async(t,...n)=>{if(!t)return{error:_.message};let r;if(t.id)r=me(e.namespacedTopic,t.id);else{const n=ye(e,t);r=me(e.namespacedTopic,n.id),t.id=n.id,ve.set(r,{generator:n})}const o=ve.get(r);clearTimeout(o.timeout);const i=await o.generator.next();return o.timeout=function(e){return window.setTimeout((()=>{ve.delete(e)}),1e4)}(r),{...i,id:t.id,state:o.generator.state}}}function Ce(e,t,n){return ie(e).dispatch(t,p,{id:n})}function Pe(e){return t=>function(e,t){const n=me(e,t),r=ve.get(n);r&&r.generator.close()}(e,t.id)}async function Re(e,t,{id:n,query:r,context:o,targets:i}){const s=ie(e),a={id:n,query:r,context:o,targets:i,providerId:t.id},c=await s.dispatch(t.identity,f,a),d=c.error;if(d)throw new Error(d);return c}const be=new Map;function Le(e,t,n){return`${e}:${t.name}:${t.uuid}:${n}`}const Te=new Map;function Ie(e,t,n){return`${e}:${t}:${n}`}function Me(e,t){const n=Le.bind(null,e,t.identity),r=Ce.bind(null,e,t.identity),o=Re.bind(null,e,t);return async(i,s)=>{const a=n(i.id);if(!be.has(a)){const e=()=>{r(i.id),be.delete(a)};be.set(a,e),i.onClose(e)}const d=Ie(e,t.id,i.id),u=()=>{Te.delete(d),s.close()};i.onClose(u),Te.set(d,(e=>{e.results?.length&&s.respond(e.results),e.revoked?.length&&s.revoke(...e.revoked),e.status===c.Open&&s.open(),e.status===c.Close&&u()}));const f=await o(i);return f.status===c.Open&&s.open(),f.status!==c.Close&&f.status!==c.Initial||u(),f}}function ke(e,t){return async n=>{const r=ie(e),o={providerId:t.id,result:n};return r.dispatch(t.identity,l,o)}}const Be=new Map;function Oe(e,t){return`${e}-${t.name}-${t.uuid}`}function We(e){return async(t,n)=>{if(!t||!t.id)return void new Error(JSON.stringify(t));if(M(e,t.id))throw F;t.identity=n,await async function(e,t){const n=Oe(e,t.identity);Be.has(n)||Be.set(n,[]),Be.get(n).push(t.id),await b(e,{...t,onUserInput:Me(e,t),onResultDispatch:ke(e,t)})}(e,t)}}function De(e){return t=>{t&&function(e,t){const n=M(e,t);if(!n)return;const r=Oe(e,n.identity),o=Be.get(r);if(o){const n=o.findIndex((e=>e===t));-1!==n&&(o.splice(n,1),L(e,t))}}(e,t)}}const xe=new Map;function Ae(e,t){xe.has(e)||xe.set(e,new Set),xe.get(e).add(t)}function Ee(e,t){const n=xe.get(e);n&&n.delete(t)}function Fe(e){return async t=>{!function(e,t){const n=Oe(e,t),r=Be.get(n);if(r){for(const t of r)L(e,t);Be.delete(n)}}(e,t);const n=xe.get(e);n&&n.forEach((e=>e(t)))}}async function _e(e){const{namespacedTopic:t}=e,n=h(e.namespacedTopic),r=await(o=n,fin.InterApplicationBus.Channel.create(o));var o;return r.onConnection(function({namespacedTopic:e}){return async t=>{const n=ae.get(e);if(n)for(const e of n)if(!await e(t))throw $}}(e)),r.onDisconnection(Fe(t)),r.register(p,Pe(t)),r.register(f,function(e){return t=>{const n=Ie(e,t.providerId,t.id),r=Te.get(n);r&&r(t)}}(t)),r.register("2",We(t)),r.register("3",De(t)),r.register("4",function(e){return async()=>fe(e)}(t)),r.register("1",Se(e)),r.register(l,function(e){return async(t,n)=>{if(!t||!t.providerId||!t.result)return;const r=M(e,t.providerId);if(!r)throw E;const{onResultDispatch:o}=r;return o?(t.result.dispatcherIdentity=n,o(t.result)):void 0}}(t)),r}async function $e(e){const t=ie(e);var n;n=e,oe.delete(n),await t.destroy(),I(e)}async function qe(e){const t=("string"==typeof e?e:e?.topic)||u,n=x(),r=w(n,t),o={topic:t,namespace:n,namespacedTopic:r};let i=se(r);i||(i=await _e(o),function(e,t){oe.set(e,t)}(r,i));const s=de.bind(null,r),a=Ee.bind(null,r),c=m.bind(null,r),d=P.bind(null,r);return{getAllProviders:fe.bind(null,r),search:ye.bind(null,o),register:le.bind(null,r),deregister:pe.bind(null,r),onSubscription:ce.bind(null,r),onDisconnect:Ae.bind(null,r),onRegister:v.bind(null,r),onDeregister:C.bind(null,r),dispatch:ge.bind(null,o),disconnect:$e.bind(null,r),removeListener:e=>{s(e),a(e),c(e),d(e)}}}const{create:Ge}=o,{subscribe:Ne}=r,He={create:Ge,subscribe:Ne,defaultTopic:"all"},Ue=()=>{const e=window;e.search=He,e.fin&&(e.fin.Search=He)},Ve=e=>{const t=()=>{Ue(),window.removeEventListener(e,t)};return t};if("undefined"!=typeof window){Ue();const e="load",t=Ve(e);window.addEventListener(e,t);const n="DOMContentLoaded",r=Ve(n);window.addEventListener(n,r)}const Ke=new Map;async function Xe(){await async function(e){Ke.set(e,await Ne({topic:e,uuid:d.q9.Workspace}))}(s)}let je;async function Je(e){return await async function(){return je||(je=Xe()),je}(),Ke.get(e)}var Ze=n(3758);const ze=async e=>{if(!e.icon)throw new Error(`${e.id} provider needs to have icon property defined.`);await(0,i.aB)();return(await Je(s)).register(e)},Qe=async e=>{await(0,i.aB)();return(await Je(s)).deregister(e)};async function Ye(){return(await(0,i.Xl)()).dispatch(i.Ml.ShowHome,void 0)}async function et(){return(await(0,i.Xl)()).dispatch(i.Ml.HideHome,void 0)}},3298:(e,t,n)=>{n.d(t,{w:()=>r.w});var r=n(5316)},3758:(e,t,n)=>{var r,o,i;n.d(t,{Pt:()=>r,yW:()=>o,el:()=>i}),function(e){e.Suggestion="suggestion"}(r||(r={})),function(e){e.Contact="Contact",e.Custom="Custom",e.List="List",e.Plain="Plain",e.SimpleText="SimpleText"}(o||(o={})),function(e){e.MultiSelect="MultiSelect"}(i||(i={}))},7564:(e,t,n)=>{n(3298),n(3758),n(6114),n(2109)},6114:(e,t,n)=>{var r,o;n.d(t,{L:()=>r,T:()=>o}),function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(r||(r={})),function(e){e.LandingPage="landingPage",e.AppGrid="appGrid"}(o||(o={}))},2109:(e,t,n)=>{n.d(t,{p6:()=>r,Go:()=>o,bI:()=>i,ZJ:()=>s});const r={Container:"Container",Button:"Button"},o={Text:"Text",Image:"Image",List:"List"},i={...r,...o};var s;!function(e){e.Primary="primary",e.Secondary="secondary",e.TextOnly="textOnly"}(s||(s={}))},317:(e,t,n)=>{n.r(t),n.d(t,{AppManifestType:()=>o.L,StorefrontTemplate:()=>o.T,deregister:()=>u,hide:()=>f,register:()=>d,show:()=>l});var r=n(7405);n(7564);var o=n(6114);let i;const s=new Map,a=e=>{if(!s.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return s.get(e)},c=async e=>{const t=await(0,r.Xl)();if(s.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return s.set(e.id,e),(e=>{e.isStorefrontActionsRegistered||(e.isStorefrontActionsRegistered=!0,e.register(r.Ml.GetStorefrontProviderApps,(e=>a(e).getApps())),e.register(r.Ml.GetStorefrontProviderFooter,(e=>a(e).getFooter())),e.register(r.Ml.GetStorefrontProviderLandingPage,(e=>a(e).getLandingPage())),e.register(r.Ml.GetStorefrontProviderNavigation,(e=>a(e).getNavigation())),e.register(r.Ml.LaunchStorefrontProviderApp,(({id:e,app:t})=>a(e).launchApp(t))))})(t),t.dispatch(r.Ml.RegisterStorefrontProvider,e)},d=e=>(i=c(e),i),u=async e=>{await i,s.delete(e);return(await(0,r.Xl)()).dispatch(r.Ml.DeregisterStorefrontProvider,e)},f=async()=>{await i,await(0,r.aB)(),await(async()=>(await(0,r.Dm)()).dispatch(r.Ml.HideStorefront,void 0))()},l=async()=>{await i,await(0,r.aB)(),await(async()=>(await(0,r.Dm)()).dispatch(r.Ml.ShowStorefront,null))()}},7405:(e,t,n)=>{n.d(t,{Ml:()=>s,Dm:()=>a,Xl:()=>f,aB:()=>u});var r=n(6678);const o=r.Ax&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));var i=n(121);var s;!function(e){e.RegisterStorefrontProvider="register-storefront-provider",e.DeregisterStorefrontProvider="deregister-storefront-provider",e.GetStorefrontProviders="get-storefront-providers",e.HideStorefront="hide-storefront",e.GetStorefrontProviderApps="get-storefront-provider-apps",e.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",e.GetStorefrontProviderFooter="get-storefront-provider-footer",e.GetStorefrontProviderNavigation="get-storefront-provider-navigation",e.LaunchStorefrontProviderApp="launch-storefront-provider-app",e.ShowStorefront="show-storefront",e.CreateStorefrontWindow="create-storefront-window",e.ShowHome="show-home",e.HideHome="hide-home",e.AssignHomeSearchContext="assign-home-search-context",e.GetLegacyPages="get-legacy-pages",e.GetLegacyWorkspaces="get-legacy-workspaces",e.GetComputedPlatformTheme="get-computed-platform-theme"}(s||(s={}));const a=function(e){let t;return()=>{if(!r.sS)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return t||(t=(async()=>{await o;const n=await fin.InterApplicationBus.Channel.connect(e);return n.onDisconnection((async()=>{t=void 0})),n})().then((e=>e)).catch((n=>{throw t=void 0,new Error(`failed to connect to channel provider ${e}: ${n}`)}))),t}}("__of_workspace_protocol__"),c="isLaunchedViaLib",d=e=>{const t=new URL(e);return t.searchParams.append(c,"true"),t.toString()},u=async()=>{if(!await(0,i.JV)(i.iW))return(r.ZK||-1===navigator.userAgent.indexOf("Win"))&&await fin.Application.startFromManifest(d(r.aW)),fin.System.openUrlWithBrowser(d(r.GX))},f=async()=>(await u(),a())},5806:(e,t,n)=>{n.d(t,{q9:()=>r});var r,o,i,s=n(6678);!function(e){e.Workspace="openfin-browser"}(r||(r={})),function(e){e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(o||(o={})),function(e){e.FinProtocol="fin-protocol"}(i||(i={}));s.AB,s.AB,r.Workspace,r.Workspace},6678:(e,t,n)=>{var r;n.d(t,{sS:()=>o,Ax:()=>i,AB:()=>a,oC:()=>c,ZK:()=>d,GX:()=>u,aW:()=>f}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(r||(r={}));const o="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||process.env?.JEST_WORKER_ID,"undefined"!=typeof window),s=i?window.origin:r.Local,a=o&&fin.me.uuid,c=o&&fin.me.name,d=(o&&fin.me.entityType,"prod"===r.Local),u=(r.Dev,r.Staging,r.Prod,"fins://system-apps/workspace"),f="https://cdn.openfin.co/workspace/6.3.6/app.json",l=e=>e.startsWith("http://")||e.startsWith("https://")?e:s+e;l("https://cdn.openfin.co/workspace/6.3.6"),l("https://cdn.openfin.co/workspace/6.3.6"),"undefined"!=typeof WORKSPACE_DOCS_PLATFORM_URL&&l(WORKSPACE_DOCS_PLATFORM_URL),"undefined"!=typeof WORKSPACE_DOCS_CLIENT_URL&&l(WORKSPACE_DOCS_CLIENT_URL)},121:(e,t,n)=>{n.d(t,{iW:()=>c,JV:()=>d});var r,o,i=n(5806),s=n(6678);!function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window"}(r||(r={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached",e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.OptionsChanged="options-changed"}(o||(o={}));function a(e){if(!s.sS)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}s.oC,s.AB;r.Home,i.q9.Workspace,r.Dock,i.q9.Workspace,r.Storefront,i.q9.Workspace;const c={name:i.q9.Workspace,uuid:i.q9.Workspace};const d=e=>a(e).getOptions().then((()=>!0)).catch((()=>!1))},5316:(e,t,n)=>{var r,o;n.d(t,{D:()=>r,w:()=>o}),function(e){e.Fetching="fetching",e.Fetched="fetched",e.Complete="complete"}(r||(r={})),function(e){e.Active="active",e.Default="default"}(o||(o={}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{AppManifestType:()=>p.L,ButtonStyle:()=>f.ZJ,CLIAction:()=>l.Pt,CLIFilterOptionType:()=>l.el,CLITemplate:()=>l.yW,ContainerTemplateFragmentNames:()=>f.p6,Home:()=>o,Legacy:()=>e,PresentationTemplateFragmentNames:()=>f.Go,SearchTagBackground:()=>u.w,Storefront:()=>d,StorefrontTemplate:()=>p.T,TemplateFragmentTypes:()=>f.bI});var e={};n.r(e),n.d(e,{getPages:()=>a,getWorkspaces:()=>c});var t,o=n(3133);n(6678),n(121);!function(e){e.TabCreated="tab-created",e.ContainerCreated="container-created",e.ContainerResized="container-resized"}(t||(t={}));new Map;var i;!function(e){e.LastLaunchedWorkspaceId="activeWorkspaceId",e.LastFocusedBrowserWindow="lastFocusedBrowserWindow",e.MachineName="machineName",e.NewTabPageLayout="NewTabPageLayout",e.NewTabPageSort="NewTabPageSort"}(i||(i={}));var s=n(7405);const a=()=>async function(){return(await(0,s.Dm)()).dispatch(s.Ml.GetLegacyPages,void 0)}(),c=()=>(async()=>(await(0,s.Dm)()).dispatch(s.Ml.GetLegacyWorkspaces,void 0))();var d=n(317),u=n(3298),f=n(2109),l=n(3758),p=n(6114)})(),module.exports=r})();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

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

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
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

/***/ "./node_modules/lodash/_asciiToArray.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_asciiToArray.js ***!
  \**********************************************/
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

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

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

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

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

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

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

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

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

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

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

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
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

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
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

/***/ "./node_modules/lodash/_baseValues.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseValues.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

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

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
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

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

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

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

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

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

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

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
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

/***/ "./node_modules/lodash/_hasUnicode.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hasUnicode.js ***!
  \********************************************/
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

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
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

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

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

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
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

/***/ "./node_modules/lodash/_iteratorToArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_iteratorToArray.js ***!
  \*************************************************/
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

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
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

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

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

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
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

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
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

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
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

/***/ "./node_modules/lodash/_stringToArray.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_stringToArray.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var asciiToArray = __webpack_require__(/*! ./_asciiToArray */ "./node_modules/lodash/_asciiToArray.js"),
    hasUnicode = __webpack_require__(/*! ./_hasUnicode */ "./node_modules/lodash/_hasUnicode.js"),
    unicodeToArray = __webpack_require__(/*! ./_unicodeToArray */ "./node_modules/lodash/_unicodeToArray.js");

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

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
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

/***/ "./node_modules/lodash/_unicodeToArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_unicodeToArray.js ***!
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

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

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

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
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

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

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

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

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

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

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

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
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

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
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

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
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

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

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

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

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

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

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

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
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

/***/ "./node_modules/lodash/toArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/toArray.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isString = __webpack_require__(/*! ./isString */ "./node_modules/lodash/isString.js"),
    iteratorToArray = __webpack_require__(/*! ./_iteratorToArray */ "./node_modules/lodash/_iteratorToArray.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js"),
    stringToArray = __webpack_require__(/*! ./_stringToArray */ "./node_modules/lodash/_stringToArray.js"),
    values = __webpack_require__(/*! ./values */ "./node_modules/lodash/values.js");

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

/***/ "./node_modules/lodash/values.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/values.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseValues = __webpack_require__(/*! ./_baseValues */ "./node_modules/lodash/_baseValues.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

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

/***/ "./node_modules/node-emoji/index.js":
/*!******************************************!*\
  !*** ./node_modules/node-emoji/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/emoji */ "./node_modules/node-emoji/lib/emoji.js");

/***/ }),

/***/ "./node_modules/node-emoji/lib/emoji.js":
/*!**********************************************!*\
  !*** ./node_modules/node-emoji/lib/emoji.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*jslint node: true*/
var toArray = __webpack_require__(/*! lodash/toArray */ "./node_modules/lodash/toArray.js");
var emojiByName = __webpack_require__(/*! ./emoji.json */ "./node_modules/node-emoji/lib/emoji.json");

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
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "./node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ "./client/src/integrations/emoji/templates.ts");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node-emoji */ "./node_modules/node-emoji/index.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_emoji__WEBPACK_IMPORTED_MODULE_2__);



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
    async deregister(integration) {
    }
    /**
     * Get a list of the static application entries.
     * @param integration The integration details.
     * @returns The list of application entries.
     */
    async getAppSearchEntries(integration) {
        const results = [];
        return results;
    }
    /**
     * An entry has been selected.
     * @param integration The integration details.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    async itemSelection(integration, result, lastResponse) {
        if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION && result.data.emoji) {
            await fin.Clipboard.writeText({ data: result.data.emoji });
            return true;
        }
        else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION && result.data.key) {
            await fin.Clipboard.writeText({ data: result.data.key });
            return true;
        }
        else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION && result.data.url && this._integrationManager.openUrl) {
            await this._integrationManager.openUrl(result.data.url);
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
                const matchEmoji = node_emoji__WEBPACK_IMPORTED_MODULE_2__.get(key);
                if (matchEmoji && !matchEmoji.startsWith(":")) {
                    results.push(this.createResult(key, matchEmoji));
                }
                // Find all other potential matches
                const searchResult = node_emoji__WEBPACK_IMPORTED_MODULE_2__.search(key);
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
     * @param emoji The emoji symbol.
     * @returns The search result.
     */
    createResult(key, emoji) {
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
                emoji,
                url: `https://emojipedia.org/${key}/`
            },
            template: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.CLITemplate.Custom,
            templateContent: {
                layout: (0,_templates__WEBPACK_IMPORTED_MODULE_1__.getEmojiTemplate)({
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
                    emoji,
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
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "./node_modules/@openfin/workspace/index.js");
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
        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createContainer)("row", [
            (0,_templates__WEBPACK_IMPORTED_MODULE_1__.createButton)(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.ButtonStyle.Primary, "detailsTitle", actions.detailsAction, { fontSize: "12px" })
        ], { justifyContent: "flex-end" })
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
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "./node_modules/@openfin/workspace/index.js");
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
        children: [
            createText(titleKey, 12)
        ],
        action: action,
        style: {
            ...style
        }
    };
}


/***/ }),

/***/ "./node_modules/node-emoji/lib/emoji.json":
/*!************************************************!*\
  !*** ./node_modules/node-emoji/lib/emoji.json ***!
  \************************************************/
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBLGlDQUFpQyxXQUFXO1VBQzVDO1VBQ0E7Ozs7O1VDUEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLEdBQUc7VUFDSDtVQUNBO1VBQ0EsQ0FBQzs7Ozs7VUNQRDs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7O1VDTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSmtFO0FBRTNELE1BQU0sV0FBVyxHQUFHLElBQUksMkVBQXdCLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vd29ya3NwYWNlL2luZGV4LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19Qcm9taXNlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FzY2lpVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVGltZXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weUFycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzVW5pY29kZS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUtleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25vZGVVdGlsLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3VuaWNvZGVUb0FycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXMuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvc3R1YkZhbHNlLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL3RvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdmFsdWVzLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9ub2RlX21vZHVsZXMvbm9kZS1lbW9qaS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vbm9kZV9tb2R1bGVzL25vZGUtZW1vamkvbGliL2Vtb2ppLmpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS9pbnRlZ3JhdGlvbi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzLy4vY2xpZW50L3NyYy9pbnRlZ3JhdGlvbnMvZW1vamkvdGVtcGxhdGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL3RlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLWhvbWUtdGVtcGxhdGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS1ob21lLXRlbXBsYXRlcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtaG9tZS10ZW1wbGF0ZXMvLi9jbGllbnQvc3JjL2ludGVncmF0aW9ucy9lbW9qaS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17MzEzMzooZSx0LG4pPT57bi5yKHQpLG4uZCh0LHtDTElBY3Rpb246KCk9PlplLlB0LENMSUZpbHRlck9wdGlvblR5cGU6KCk9PlplLmVsLENMSVRlbXBsYXRlOigpPT5aZS55VyxkZXJlZ2lzdGVyOigpPT5RZSxoaWRlOigpPT5ldCxyZWdpc3RlcjooKT0+emUsc2hvdzooKT0+WWV9KTt2YXIgcj17fTtuLnIociksbi5kKHIse3N1YnNjcmliZTooKT0+cmV9KTt2YXIgbz17fTtuLnIobyksbi5kKG8se2NyZWF0ZTooKT0+cWV9KTt2YXIgaT1uKDc0MDUpO2NvbnN0IHM9XCJob21lXCI7dmFyIGE7IWZ1bmN0aW9uKGUpe2UuQ29tbWFuZHM9XCJob21lLWNvbW1hbmRzXCJ9KGF8fChhPXt9KSk7dmFyIGMsZD1uKDU4MDYpO24oNzU2NCk7IWZ1bmN0aW9uKGUpe2VbZS5Jbml0aWFsPTBdPVwiSW5pdGlhbFwiLGVbZS5PcGVuPTFdPVwiT3BlblwiLGVbZS5DbG9zZT0yXT1cIkNsb3NlXCJ9KGN8fChjPXt9KSk7Y29uc3QgdT1cImFsbFwiLGY9XCIwXCIsbD1cIjVcIixwPVwiNlwiLGc9KCk9Pnt9O2Z1bmN0aW9uIHcoZSx0KXtyZXR1cm4gZT9gJHtlfS0ke3R9YDp0fWZ1bmN0aW9uIGgoZSl7cmV0dXJuYF9fc2VhcmNoLSR7ZX0tdG9waWNfX2B9Y29uc3QgeT1uZXcgTWFwO2Z1bmN0aW9uIHYoZSx0KXt5LmhhcyhlKXx8eS5zZXQoZSxuZXcgU2V0KSx5LmdldChlKS5hZGQodCl9ZnVuY3Rpb24gbShlLHQpe2NvbnN0IG49eS5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgUz1uZXcgTWFwO2Z1bmN0aW9uIEMoZSx0KXtTLmhhcyhlKXx8Uy5zZXQoZSxuZXcgU2V0KSxTLmdldChlKS5hZGQodCl9ZnVuY3Rpb24gUChlLHQpe2NvbnN0IG49Uy5nZXQoZSk7biYmbi5kZWxldGUodCl9Y29uc3QgUj1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIGIoZSx0KXtSLmhhcyhlKXx8Ui5zZXQoZSxuZXcgTWFwKSxSLmdldChlKS5zZXQodC5pZCx0KTtjb25zdCBuPXkuZ2V0KGUpO2lmKCFuKXJldHVybjtjb25zdCByPVsuLi5uXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKHIpfWFzeW5jIGZ1bmN0aW9uIEwoZSx0KXtjb25zdCBuPVIuZ2V0KGUpO2lmKCFuKXJldHVybjtuLmRlbGV0ZSh0KTtjb25zdCByPVMuZ2V0KGUpO2lmKCFyKXJldHVybjtjb25zdCBvPVsuLi5yXS5tYXAoKGU9PmUoKSkpO2F3YWl0IFByb21pc2UuYWxsKG8pfWZ1bmN0aW9uIFQoZSl7cmV0dXJuIFIuZ2V0KGUpP1suLi5SLmdldChlKS52YWx1ZXMoKV06W119ZnVuY3Rpb24gSShlKXtjb25zdCB0PVIuZ2V0KGUpO3QmJnQuY2xlYXIoKX1mdW5jdGlvbiBNKGUsdCl7Y29uc3Qgbj1SLmdldChlKTtyZXR1cm4gbj9uLmdldCh0KTpudWxsfWZ1bmN0aW9uIGsoZSx0LG4pe3JldHVybnsuLi5lLGFjdGlvbjpufHxlLmFjdGlvbnNbMF0sZGlzcGF0Y2hlcklkZW50aXR5OnR9fWZ1bmN0aW9uIEIoZSx0LG49XCJhc2NlbmRpbmdcIil7Y29uc3Qgcj1lfHxbXTtpZighdD8ubGVuZ3RoKXJldHVybiByO2NvbnN0IG89W10saT1uZXcgTWFwO3QuZm9yRWFjaCgoZT0+e2lmKGUua2V5KXJldHVybiBpLnNldChlLmtleSxlKTtvLnB1c2goZSl9KSk7bGV0IHM9ci5tYXAoKGU9Pntjb25zdHtrZXk6dH09ZTtpZih0JiZpLmhhcyh0KSl7Y29uc3QgZT1pLmdldCh0KTtyZXR1cm4gaS5kZWxldGUodCksZX1yZXR1cm4gZX0pKTtyZXR1cm4gcy5wdXNoKC4uLmkudmFsdWVzKCksLi4ubykscz1cImFzY2VuZGluZ1wiPT09bj9zLnNvcnQoKChlLHQpPT4obnVsbCE9PWUuc2NvcmUmJnZvaWQgMCE9PWUuc2NvcmU/ZS5zY29yZToxLzApLShudWxsIT09dC5zY29yZSYmdm9pZCAwIT09dC5zY29yZT90LnNjb3JlOjEvMCkpKTpzLnNvcnQoKChlLHQpPT4obnVsbCE9PXQuc2NvcmUmJnZvaWQgMCE9PXQuc2NvcmU/dC5zY29yZToxLzApLShudWxsIT09ZS5zY29yZSYmdm9pZCAwIT09ZS5zY29yZT9lLnNjb3JlOjEvMCkpKSxzfWZ1bmN0aW9uIE8oZSl7Y29uc3QgdD17fTtsZXQgbj1bXTtsZXQgcj1bXTtsZXQgbz1jLkluaXRpYWw7dC5nZXRTdGF0dXM9KCk9Pm8sdC5nZXRSZXN1bHRCdWZmZXI9KCk9Pm4sdC5zZXRSZXN1bHRCdWZmZXI9ZT0+e249ZSxuPy5sZW5ndGgmJnQub25DaGFuZ2UoKX0sdC5nZXRSZXZva2VkQnVmZmVyPSgpPT5yLHQuc2V0UmV2b2tlZEJ1ZmZlcj1lPT57cj1lLHI/Lmxlbmd0aCYmdC5vbkNoYW5nZSgpfSx0Lm9uQ2hhbmdlPWc7Y29uc3QgaT17fTtyZXR1cm4gdC5yZXM9aSxpLmNsb3NlPSgpPT57byE9PWMuQ2xvc2UmJihvPWMuQ2xvc2UsdC5vbkNoYW5nZSgpKX0saS5vcGVuPSgpPT57byE9PWMuT3BlbiYmKG89Yy5PcGVuLHQub25DaGFuZ2UoKSl9LGkucmVzcG9uZD1uPT57Y29uc3Qgcj1CKHQuZ2V0UmVzdWx0QnVmZmVyKCksbixlKTt0LnNldFJlc3VsdEJ1ZmZlcihyKX0saS5yZXZva2U9KC4uLmUpPT57Y29uc3Qgbj1uZXcgU2V0KGUpLHI9dC5nZXRSZXN1bHRCdWZmZXIoKS5maWx0ZXIoKCh7a2V5OmV9KT0+e2NvbnN0IHQ9bi5oYXMoZSk7cmV0dXJuIHQmJm4uZGVsZXRlKGUpLCF0fSkpO3Quc2V0UmVzdWx0QnVmZmVyKHIpLG4uc2l6ZSYmKHQuZ2V0UmV2b2tlZEJ1ZmZlcigpLmZvckVhY2goKGU9Pm4uYWRkKGUpKSksdC5zZXRSZXZva2VkQnVmZmVyKFsuLi5uXSkpfSx0fWZ1bmN0aW9uIFcoZSx0LG4pe2NvbnN0IHI9bmV3IFNldDtsZXQgbz0hMTtyZXR1cm57Y2xvc2U6KCk9PntvPSEwO2Zvcihjb25zdCBlIG9mIHIpZSgpfSxyZXE6e2lkOnQsdG9waWM6ZSwuLi5uLGNvbnRleHQ6bj8uY29udGV4dHx8e30sb25DbG9zZTplPT57ci5hZGQoZSksbyYmZSgpfSxyZW1vdmVMaXN0ZW5lcjplPT57ci5kZWxldGUoZSl9fX19ZnVuY3Rpb24gRCgpe3JldHVybntuYW1lOmZpbi5tZS5uYW1lLHV1aWQ6ZmluLm1lLnV1aWR9fWZ1bmN0aW9uIHgoKXtsZXQgZTt0cnl7Y29uc3QgdD1maW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtpZighdD8uaWRlbnRpdHkpcmV0dXJuO2U9dC5pZGVudGl0eS51dWlkfWNhdGNoKGUpe31yZXR1cm4gZX1jb25zdCBBPVwiZGVyZWdpc3RlcmVkIG9yIGRvZXMgbm90IGV4aXN0XCIsRT1uZXcgRXJyb3IoYHByb3ZpZGVyICR7QX1gKSxGPW5ldyBFcnJvcihcInByb3ZpZGVyIHdpdGggbmFtZSBhbHJlYWR5IGV4aXN0c1wiKSxfPW5ldyBFcnJvcihcImJhZCBwYXlsb2FkXCIpLCQ9bmV3IEVycm9yKFwic3Vic2NyaXB0aW9uIHJlamVjdGVkXCIpLHE9bmV3IEVycm9yKGBjaGFubmVsICR7QX1gKSxHPW5ldyBNYXA7ZnVuY3Rpb24gTihlKXtjb25zdCB0PUgoZSk7aWYodClyZXR1cm4gdDt0aHJvdyBxfWZ1bmN0aW9uIEgoZSl7Y29uc3QgdD1HLmdldChlKTtpZih0KXJldHVybiB0fWZ1bmN0aW9uIFUoZSx0KXtHLnNldChlLHQpfWNvbnN0IFY9bmV3IE1hcDtmdW5jdGlvbiBLKGUpe1YuaGFzKGUpfHxWLnNldChlLG5ldyBNYXApO2NvbnN0IHQ9Vi5nZXQoZSk7cmV0dXJue2dldFJlcXVlc3RzRm9ySWRlbnRpdHk6ZT0+e2NvbnN0IG49ZnVuY3Rpb24oZSl7cmV0dXJuYCR7ZS51dWlkfToke2UubmFtZX1gfShlKTtyZXR1cm4gdC5oYXMobil8fHQuc2V0KG4sbmV3IE1hcCksdC5nZXQobil9fX1hc3luYyBmdW5jdGlvbiBYKGUsdCl7cmV0dXJuKGF3YWl0IE4oZSkpLmRpc3BhdGNoKGYsdCl9ZnVuY3Rpb24gaih7bmFtZXNwYWNlZFRvcGljOmUsdG9waWM6dH0pe2NvbnN0IG49TS5iaW5kKG51bGwsZSkscj1LKGUpLG89WC5iaW5kKG51bGwsZSk7cmV0dXJuIGFzeW5jKGUsaSk9PntpZighZXx8IWUuaWR8fCFlLnByb3ZpZGVySWQpe2NvbnN0IGU9XztyZXR1cm57ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdHtpZDpzLHByb3ZpZGVySWQ6YX09ZSxjPW4oYSk7aWYoIWMpe2NvbnN0IGU9RTtyZXR1cm57ZXJyb3I6ZS5tZXNzYWdlfX1jb25zdCBkPXIuZ2V0UmVxdWVzdHNGb3JJZGVudGl0eShpKTtsZXQgdT1kLmdldChlLmlkKTt1fHwodT1XKHQscyxlKSxkLnNldChlLmlkLHUpKTtjb25zdCBmPU8oKSxsPSgpPT57Y29uc3QgZT1mLmdldFJlc3VsdEJ1ZmZlcigpO2Yuc2V0UmVzdWx0QnVmZmVyKFtdKTtjb25zdCB0PWYuZ2V0UmV2b2tlZEJ1ZmZlcigpO2Yuc2V0UmV2b2tlZEJ1ZmZlcihbXSk7Y29uc3Qgbj1mLmdldFN0YXR1cygpO28oe2lkOnMscHJvdmlkZXJJZDphLHJlc3VsdHM6ZSxyZXZva2VkOnQsc3RhdHVzOm59KX07bGV0IHA9ITAsZz0hMTtmLm9uQ2hhbmdlPSgpPT57aWYocClyZXR1cm4gcD0hMSx2b2lkIGwoKTtnfHwoZz0hMCxzZXRUaW1lb3V0KCgoKT0+e2c9ITEsbCgpfSksMTAwKSl9O3RyeXtjb25zdHtyZXN1bHRzOmUsY29udGV4dDp0fT1hd2FpdCBjLm9uVXNlcklucHV0KHUucmVxLGYucmVzKSxuPWYuZ2V0U3RhdHVzKCk7cmV0dXJue2lkOnMscHJvdmlkZXJJZDphLHN0YXR1czpuLHJlc3VsdHM6ZSxjb250ZXh0OnR9fWNhdGNoKGUpe3JldHVybntpZDpzLHByb3ZpZGVySWQ6YSxlcnJvcjplLm1lc3NhZ2V9fX19YXN5bmMgZnVuY3Rpb24gSihlLHQsbil7Y29uc3Qgcj1ufHxhd2FpdCBOKGUpLG89RCgpLGk9e2lkZW50aXR5Om8sLi4udCxvblVzZXJJbnB1dDp2b2lkIDAsb25SZXN1bHREaXNwYXRjaDp2b2lkIDB9O2F3YWl0IHIuZGlzcGF0Y2goXCIyXCIsaSksYXdhaXQgYihlLHtpZGVudGl0eTpvLC4uLnR9KX1hc3luYyBmdW5jdGlvbiBaKGUsdCl7Y29uc3Qgbj1hd2FpdCBOKGUpO3JldHVybiBhd2FpdCBuLmRpc3BhdGNoKFwiM1wiLHQpLEwoZSx0KX1hc3luYyBmdW5jdGlvbiB6KGUsdCxuLHIpe2NvbnN0IG89ayhuLEQoKSxyKSxpPU0oZSx0KTtpZihpKXtjb25zdHtvblJlc3VsdERpc3BhdGNoOmV9PWk7aWYoIWUpcmV0dXJuO3JldHVybiBlKG8pfWNvbnN0IHM9e3Byb3ZpZGVySWQ6dCxyZXN1bHQ6b307cmV0dXJuKGF3YWl0IE4oZSkpLmRpc3BhdGNoKGwscyl9YXN5bmMgZnVuY3Rpb24gUShlLHQpe2NvbnN0IG49ey4uLnQsY29udGV4dDp0Py5jb250ZXh0fHx7fX0scj17fSxvPWFzeW5jIGZ1bmN0aW9uKihlLHQse3NldFN0YXRlOm59KXtjb25zdCByPWF3YWl0IE4oZSk7Zm9yKDs7KXtjb25zdCBlPWF3YWl0IHIuZGlzcGF0Y2goXCIxXCIsdCksbz1lLmVycm9yO2lmKG8pdGhyb3cgbmV3IEVycm9yKG8pO2NvbnN0IGk9ZTtpZih0LmlkPWkuaWQsbihpLnN0YXRlKSxpLmRvbmUpcmV0dXJuIGkudmFsdWU7eWllbGQgaS52YWx1ZX19KGUsbix7c2V0U3RhdGU6ZT0+e3Iuc3RhdGU9ZX19KTtsZXQgaT1hd2FpdCBvLm5leHQoKTtyZXR1cm4gci5pZD1uLmlkLHIuY2xvc2U9KCk9PnshYXN5bmMgZnVuY3Rpb24oZSx0KXsoYXdhaXQgTihlKSkuZGlzcGF0Y2gocCx7aWQ6dH0pfShlLHIuaWQpfSxyLm5leHQ9KCk9PntpZihpKXtjb25zdCBlPWk7cmV0dXJuIGk9dm9pZCAwLGV9cmV0dXJuIG8ubmV4dCgpfSxyfWFzeW5jIGZ1bmN0aW9uIFkoZSl7cmV0dXJuKGF3YWl0IE4oZSkpLmRpc3BhdGNoKFwiNFwiLG51bGwpfWFzeW5jIGZ1bmN0aW9uIGVlKGUpe2NvbnN0IHQ9YXdhaXQgTihlKTt2YXIgbjtuPWUsRy5kZWxldGUobiksSShlKSxhd2FpdCB0LmRpc2Nvbm5lY3QoKX1mdW5jdGlvbiB0ZShlKXtjb25zdHtuYW1lc3BhY2VkVG9waWM6dH09ZSxuPUsodCk7cmV0dXJuIGFzeW5jIHI9PntpZighSCh0KSlyZXR1cm47Y29uc3Qgbz1uLmdldFJlcXVlc3RzRm9ySWRlbnRpdHkocik7Zm9yKGNvbnN0e3JlcTplLGNsb3NlOnR9b2Ygby52YWx1ZXMoKSl0KCksby5kZWxldGUoZS5pZCk7VSh0LChhc3luYyBlPT57Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1hd2FpdCBuZShlKTtmb3IoY29uc3QgZSBvZiBUKHQpKWF3YWl0IEoodCxlLG4pO3JldHVybiBufSkoZSkpfX1hc3luYyBmdW5jdGlvbiBuZShlKXtjb25zdHtuYW1lc3BhY2VkVG9waWM6dH09ZSxuPWgodCkscj1hd2FpdCBhc3luYyBmdW5jdGlvbihlKXtmb3IobGV0IHQ9MDt0PDUwO3QrKyl0cnl7cmV0dXJuIGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlLHt3YWl0OiExfSl9Y2F0Y2goZSl7aWYoNDk9PT10KXRocm93IGU7YXdhaXQgbmV3IFByb21pc2UoKGU9PnNldFRpbWVvdXQoZSwxZTMpKSl9fShuKTtyZXR1cm4gci5yZWdpc3RlcihmLGooZSkpLHIucmVnaXN0ZXIocCxmdW5jdGlvbihlKXtjb25zdCB0PUsoZSk7cmV0dXJuKGUsbik9Pntjb25zdCByPXQuZ2V0UmVxdWVzdHNGb3JJZGVudGl0eShuKSxvPXIuZ2V0KGUuaWQpO28mJihvLmNsb3NlKCksci5kZWxldGUoZS5pZCkpfX0odCkpLHIucmVnaXN0ZXIobCxmdW5jdGlvbihlKXtyZXR1cm4gYXN5bmModCxuKT0+e2lmKCF0fHwhdC5wcm92aWRlcklkfHwhdC5yZXN1bHQpcmV0dXJuO2NvbnN0IHI9TShlLHQucHJvdmlkZXJJZCk7aWYoIXIpcmV0dXJuO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6b309cjtyZXR1cm4gbz8odC5yZXN1bHQuZGlzcGF0Y2hlcklkZW50aXR5PW4sbyh0LnJlc3VsdCkpOnZvaWQgMH19KHQpKSxyLm9uRGlzY29ubmVjdGlvbih0ZShlKSkscn1hc3luYyBmdW5jdGlvbiByZShlKXtjb25zdCB0PShcInN0cmluZ1wiPT10eXBlb2YgZT9lOmU/LnRvcGljKXx8dSxuPShcInN0cmluZ1wiPT10eXBlb2YgZT9udWxsOmU/LnV1aWQpfHx4KCkscj13KG4sdCksbz17dG9waWM6dCxuYW1lc3BhY2U6bixuYW1lc3BhY2VkVG9waWM6cn07bGV0IGk9SChyKTtyZXR1cm4gaXx8KGk9bmUobyksVShyLGkpLGF3YWl0IGkpLHtnZXRBbGxQcm92aWRlcnM6WS5iaW5kKG51bGwscikscmVnaXN0ZXI6Si5iaW5kKG51bGwsciksc2VhcmNoOlEuYmluZChudWxsLHIpLGRlcmVnaXN0ZXI6Wi5iaW5kKG51bGwsciksZGlzcGF0Y2g6ei5iaW5kKG51bGwsciksZGlzY29ubmVjdDplZS5iaW5kKG51bGwscil9fWNvbnN0IG9lPW5ldyBNYXA7ZnVuY3Rpb24gaWUoZSl7Y29uc3QgdD1zZShlKTtpZih0KXJldHVybiB0O3Rocm93IHF9ZnVuY3Rpb24gc2UoZSl7Y29uc3QgdD1vZS5nZXQoZSk7aWYodClyZXR1cm4gdH1jb25zdCBhZT1uZXcgTWFwO2Z1bmN0aW9uIGNlKGUsdCl7YWUuaGFzKGUpfHxhZS5zZXQoZSxuZXcgU2V0KSxhZS5nZXQoZSkuYWRkKHQpfWZ1bmN0aW9uIGRlKGUsdCl7Y29uc3Qgbj1hZS5nZXQoZSk7biYmbi5kZWxldGUodCl9dmFyIHVlPW4oNTMxNik7ZnVuY3Rpb24gZmUoZSl7cmV0dXJuWy4uLlQoZSldLm1hcCgoZT0+KHsuLi5lLG9uVXNlcklucHV0OnZvaWQgMCxvblJlc3VsdERpc3BhdGNoOnZvaWQgMH0pKSl9YXN5bmMgZnVuY3Rpb24gbGUoZSx0KXtpZihNKGUsdC5pZCkpdGhyb3cgbmV3IEVycm9yKFwicHJvdmlkZXIgd2l0aCBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO2NvbnN0IG49RCgpO2F3YWl0IGIoZSx7aWRlbnRpdHk6biwuLi50fSl9ZnVuY3Rpb24gcGUoZSx0KXtMKGUsdCl9YXN5bmMgZnVuY3Rpb24gZ2UoZSx0LG4scil7Y29uc3Qgbz1NKGUsdCk7aWYoIW8pdGhyb3cgRTtjb25zdHtvblJlc3VsdERpc3BhdGNoOml9PW87aWYoIWkpcmV0dXJuO3JldHVybiBpKGsobixEKCkscikpfWFzeW5jIGZ1bmN0aW9uKndlKGUsdCxuKXtjb25zdCByPWZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1bXSxyPVtdLG89W10saT1bXTtmb3IoY29uc3QgcyBvZiBlKXtjb25zdCBlPU8ocy5zY29yZU9yZGVyKSxhPXtyZXN1bHRzOltdLHByb3ZpZGVyOntpZDpzLmlkLGlkZW50aXR5OnMuaWRlbnRpdHksdGl0bGU6cy50aXRsZSxzY29yZU9yZGVyOnMuc2NvcmVPcmRlcixpY29uOnMuaWNvbn19O24ucHVzaChhKSxyLnB1c2goZSk7Y29uc3QgYz0oYXN5bmMoKT0+e3RyeXtjb25zdHtyZXN1bHRzOm4sY29udGV4dDpyfT1hd2FpdCBzLm9uVXNlcklucHV0KHQsZS5yZXMpO2EucmVzdWx0cz1CKGEucmVzdWx0cyxuKSxhLmNvbnRleHQ9ey4uLmEuY29udGV4dCwuLi5yfX1jYXRjaChlKXthLmVycm9yPWV9Yy5kb25lPSEwfSkoKTtpLnB1c2goYyksby5wdXNoKG8ubGVuZ3RoKX1yZXR1cm57cHJvdmlkZXJSZXNwb25zZXM6bixsaXN0ZW5lclJlc3BvbnNlczpyLG9wZW5MaXN0ZW5lclJlc3BvbnNlczpvLGluaXRpYWxSZXNwb25zZVByb21pc2VzOml9fSh0LnRhcmdldHM/dC50YXJnZXRzLm1hcCgodD0+TShlLHQpKSkuZmlsdGVyKChlPT4hIWUpKTpbLi4uVChlKS5maWx0ZXIoKGU9PiFlLmhpZGRlbikpXSx0KSx7cHJvdmlkZXJSZXNwb25zZXM6byxsaXN0ZW5lclJlc3BvbnNlczppfT1yO2xldHtvcGVuTGlzdGVuZXJSZXNwb25zZXM6cyxpbml0aWFsUmVzcG9uc2VQcm9taXNlczphfT1yLGQ9dWUuRC5GZXRjaGluZztjb25zdCB1PWU9PntkPWUsbi5zZXRTdGF0ZShkKX07bGV0IGYsbD0hMTt0Lm9uQ2xvc2UoKCgpPT57bD0hMCxmJiZmKCl9KSk7ZG97bGV0IGU9ITE7aWYoYS5sZW5ndGgpe2NvbnN0IHQ9W107Zm9yKGNvbnN0IG4gb2YgYSluLmRvbmU/ZT0hMDp0LnB1c2gobik7YT10LGEubGVuZ3RofHwodSh1ZS5ELkZldGNoZWQpLGU9ITApfWxldCB0LG49ITE7Y29uc3Qgcj0oKT0+e249ITAsdCYmdCgpfSxwPVtdO2Zvcihjb25zdCB0IG9mIHMpe2NvbnN0IG49aVt0XSxzPW9bdF0sYT1uLmdldFN0YXR1cygpOyhhPT09Yy5PcGVufHxkPT09dWUuRC5GZXRjaGluZyYmYT09PWMuSW5pdGlhbCkmJihwLnB1c2godCksbi5vbkNoYW5nZT1yKTtjb25zdCB1PW4uZ2V0UmVzdWx0QnVmZmVyKCk7dS5sZW5ndGgmJihuLnNldFJlc3VsdEJ1ZmZlcihbXSkscy5yZXN1bHRzPUIocy5yZXN1bHRzLHUpLGU9ITApO2NvbnN0IGY9bi5nZXRSZXZva2VkQnVmZmVyKCk7aWYoZi5sZW5ndGgpe24uc2V0UmV2b2tlZEJ1ZmZlcihbXSk7Y29uc3QgdD1uZXcgU2V0KGYpO3MucmVzdWx0cz1zLnJlc3VsdHMuZmlsdGVyKCgoe2tleTplfSk9PiF0LmhhcyhlKSkpLGU9ITB9fWlmKHM9cCxlJiYoeWllbGQgbyksbClicmVhaztufHwocy5sZW5ndGh8fGEubGVuZ3RoKSYmYXdhaXQgUHJvbWlzZS5yYWNlKFsuLi5hLG5ldyBQcm9taXNlKChlPT57dD1lfSkpLG5ldyBQcm9taXNlKChlPT57Zj1lfSkpXSl9d2hpbGUocy5sZW5ndGh8fGEubGVuZ3RoKTtyZXR1cm4gdSh1ZS5ELkNvbXBsZXRlKSxvfWxldCBoZT0wO2Z1bmN0aW9uIHllKHtuYW1lc3BhY2VkVG9waWM6ZSx0b3BpYzp0fSxuKXtoZSs9MTtjb25zdCByPVcodCxoZS50b1N0cmluZygpLG4pLG89d2UoZSxyLnJlcSx7c2V0U3RhdGU6ZT0+e28uc3RhdGU9ZX19KTtyZXR1cm4gby5pZD1oZS50b1N0cmluZygpLG8uY2xvc2U9ci5jbG9zZSxvLnN0YXRlPXVlLkQuRmV0Y2hpbmcsb31jb25zdCB2ZT1uZXcgTWFwO2Z1bmN0aW9uIG1lKGUsdCl7cmV0dXJuYCR7ZX06JHt0fWB9ZnVuY3Rpb24gU2UoZSl7cmV0dXJuIGFzeW5jKHQsLi4ubik9PntpZighdClyZXR1cm57ZXJyb3I6Xy5tZXNzYWdlfTtsZXQgcjtpZih0LmlkKXI9bWUoZS5uYW1lc3BhY2VkVG9waWMsdC5pZCk7ZWxzZXtjb25zdCBuPXllKGUsdCk7cj1tZShlLm5hbWVzcGFjZWRUb3BpYyxuLmlkKSx0LmlkPW4uaWQsdmUuc2V0KHIse2dlbmVyYXRvcjpufSl9Y29uc3Qgbz12ZS5nZXQocik7Y2xlYXJUaW1lb3V0KG8udGltZW91dCk7Y29uc3QgaT1hd2FpdCBvLmdlbmVyYXRvci5uZXh0KCk7cmV0dXJuIG8udGltZW91dD1mdW5jdGlvbihlKXtyZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCgpPT57dmUuZGVsZXRlKGUpfSksMWU0KX0ociksey4uLmksaWQ6dC5pZCxzdGF0ZTpvLmdlbmVyYXRvci5zdGF0ZX19fWZ1bmN0aW9uIENlKGUsdCxuKXtyZXR1cm4gaWUoZSkuZGlzcGF0Y2godCxwLHtpZDpufSl9ZnVuY3Rpb24gUGUoZSl7cmV0dXJuIHQ9PmZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1tZShlLHQpLHI9dmUuZ2V0KG4pO3ImJnIuZ2VuZXJhdG9yLmNsb3NlKCl9KGUsdC5pZCl9YXN5bmMgZnVuY3Rpb24gUmUoZSx0LHtpZDpuLHF1ZXJ5OnIsY29udGV4dDpvLHRhcmdldHM6aX0pe2NvbnN0IHM9aWUoZSksYT17aWQ6bixxdWVyeTpyLGNvbnRleHQ6byx0YXJnZXRzOmkscHJvdmlkZXJJZDp0LmlkfSxjPWF3YWl0IHMuZGlzcGF0Y2godC5pZGVudGl0eSxmLGEpLGQ9Yy5lcnJvcjtpZihkKXRocm93IG5ldyBFcnJvcihkKTtyZXR1cm4gY31jb25zdCBiZT1uZXcgTWFwO2Z1bmN0aW9uIExlKGUsdCxuKXtyZXR1cm5gJHtlfToke3QubmFtZX06JHt0LnV1aWR9OiR7bn1gfWNvbnN0IFRlPW5ldyBNYXA7ZnVuY3Rpb24gSWUoZSx0LG4pe3JldHVybmAke2V9OiR7dH06JHtufWB9ZnVuY3Rpb24gTWUoZSx0KXtjb25zdCBuPUxlLmJpbmQobnVsbCxlLHQuaWRlbnRpdHkpLHI9Q2UuYmluZChudWxsLGUsdC5pZGVudGl0eSksbz1SZS5iaW5kKG51bGwsZSx0KTtyZXR1cm4gYXN5bmMoaSxzKT0+e2NvbnN0IGE9bihpLmlkKTtpZighYmUuaGFzKGEpKXtjb25zdCBlPSgpPT57cihpLmlkKSxiZS5kZWxldGUoYSl9O2JlLnNldChhLGUpLGkub25DbG9zZShlKX1jb25zdCBkPUllKGUsdC5pZCxpLmlkKSx1PSgpPT57VGUuZGVsZXRlKGQpLHMuY2xvc2UoKX07aS5vbkNsb3NlKHUpLFRlLnNldChkLChlPT57ZS5yZXN1bHRzPy5sZW5ndGgmJnMucmVzcG9uZChlLnJlc3VsdHMpLGUucmV2b2tlZD8ubGVuZ3RoJiZzLnJldm9rZSguLi5lLnJldm9rZWQpLGUuc3RhdHVzPT09Yy5PcGVuJiZzLm9wZW4oKSxlLnN0YXR1cz09PWMuQ2xvc2UmJnUoKX0pKTtjb25zdCBmPWF3YWl0IG8oaSk7cmV0dXJuIGYuc3RhdHVzPT09Yy5PcGVuJiZzLm9wZW4oKSxmLnN0YXR1cyE9PWMuQ2xvc2UmJmYuc3RhdHVzIT09Yy5Jbml0aWFsfHx1KCksZn19ZnVuY3Rpb24ga2UoZSx0KXtyZXR1cm4gYXN5bmMgbj0+e2NvbnN0IHI9aWUoZSksbz17cHJvdmlkZXJJZDp0LmlkLHJlc3VsdDpufTtyZXR1cm4gci5kaXNwYXRjaCh0LmlkZW50aXR5LGwsbyl9fWNvbnN0IEJlPW5ldyBNYXA7ZnVuY3Rpb24gT2UoZSx0KXtyZXR1cm5gJHtlfS0ke3QubmFtZX0tJHt0LnV1aWR9YH1mdW5jdGlvbiBXZShlKXtyZXR1cm4gYXN5bmModCxuKT0+e2lmKCF0fHwhdC5pZClyZXR1cm4gdm9pZCBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkodCkpO2lmKE0oZSx0LmlkKSl0aHJvdyBGO3QuaWRlbnRpdHk9bixhd2FpdCBhc3luYyBmdW5jdGlvbihlLHQpe2NvbnN0IG49T2UoZSx0LmlkZW50aXR5KTtCZS5oYXMobil8fEJlLnNldChuLFtdKSxCZS5nZXQobikucHVzaCh0LmlkKSxhd2FpdCBiKGUsey4uLnQsb25Vc2VySW5wdXQ6TWUoZSx0KSxvblJlc3VsdERpc3BhdGNoOmtlKGUsdCl9KX0oZSx0KX19ZnVuY3Rpb24gRGUoZSl7cmV0dXJuIHQ9Pnt0JiZmdW5jdGlvbihlLHQpe2NvbnN0IG49TShlLHQpO2lmKCFuKXJldHVybjtjb25zdCByPU9lKGUsbi5pZGVudGl0eSksbz1CZS5nZXQocik7aWYobyl7Y29uc3Qgbj1vLmZpbmRJbmRleCgoZT0+ZT09PXQpKTstMSE9PW4mJihvLnNwbGljZShuLDEpLEwoZSx0KSl9fShlLHQpfX1jb25zdCB4ZT1uZXcgTWFwO2Z1bmN0aW9uIEFlKGUsdCl7eGUuaGFzKGUpfHx4ZS5zZXQoZSxuZXcgU2V0KSx4ZS5nZXQoZSkuYWRkKHQpfWZ1bmN0aW9uIEVlKGUsdCl7Y29uc3Qgbj14ZS5nZXQoZSk7biYmbi5kZWxldGUodCl9ZnVuY3Rpb24gRmUoZSl7cmV0dXJuIGFzeW5jIHQ9PnshZnVuY3Rpb24oZSx0KXtjb25zdCBuPU9lKGUsdCkscj1CZS5nZXQobik7aWYocil7Zm9yKGNvbnN0IHQgb2YgcilMKGUsdCk7QmUuZGVsZXRlKG4pfX0oZSx0KTtjb25zdCBuPXhlLmdldChlKTtuJiZuLmZvckVhY2goKGU9PmUodCkpKX19YXN5bmMgZnVuY3Rpb24gX2UoZSl7Y29uc3R7bmFtZXNwYWNlZFRvcGljOnR9PWUsbj1oKGUubmFtZXNwYWNlZFRvcGljKSxyPWF3YWl0KG89bixmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNyZWF0ZShvKSk7dmFyIG87cmV0dXJuIHIub25Db25uZWN0aW9uKGZ1bmN0aW9uKHtuYW1lc3BhY2VkVG9waWM6ZX0pe3JldHVybiBhc3luYyB0PT57Y29uc3Qgbj1hZS5nZXQoZSk7aWYobilmb3IoY29uc3QgZSBvZiBuKWlmKCFhd2FpdCBlKHQpKXRocm93ICR9fShlKSksci5vbkRpc2Nvbm5lY3Rpb24oRmUodCkpLHIucmVnaXN0ZXIocCxQZSh0KSksci5yZWdpc3RlcihmLGZ1bmN0aW9uKGUpe3JldHVybiB0PT57Y29uc3Qgbj1JZShlLHQucHJvdmlkZXJJZCx0LmlkKSxyPVRlLmdldChuKTtyJiZyKHQpfX0odCkpLHIucmVnaXN0ZXIoXCIyXCIsV2UodCkpLHIucmVnaXN0ZXIoXCIzXCIsRGUodCkpLHIucmVnaXN0ZXIoXCI0XCIsZnVuY3Rpb24oZSl7cmV0dXJuIGFzeW5jKCk9PmZlKGUpfSh0KSksci5yZWdpc3RlcihcIjFcIixTZShlKSksci5yZWdpc3RlcihsLGZ1bmN0aW9uKGUpe3JldHVybiBhc3luYyh0LG4pPT57aWYoIXR8fCF0LnByb3ZpZGVySWR8fCF0LnJlc3VsdClyZXR1cm47Y29uc3Qgcj1NKGUsdC5wcm92aWRlcklkKTtpZighcil0aHJvdyBFO2NvbnN0e29uUmVzdWx0RGlzcGF0Y2g6b309cjtyZXR1cm4gbz8odC5yZXN1bHQuZGlzcGF0Y2hlcklkZW50aXR5PW4sbyh0LnJlc3VsdCkpOnZvaWQgMH19KHQpKSxyfWFzeW5jIGZ1bmN0aW9uICRlKGUpe2NvbnN0IHQ9aWUoZSk7dmFyIG47bj1lLG9lLmRlbGV0ZShuKSxhd2FpdCB0LmRlc3Ryb3koKSxJKGUpfWFzeW5jIGZ1bmN0aW9uIHFlKGUpe2NvbnN0IHQ9KFwic3RyaW5nXCI9PXR5cGVvZiBlP2U6ZT8udG9waWMpfHx1LG49eCgpLHI9dyhuLHQpLG89e3RvcGljOnQsbmFtZXNwYWNlOm4sbmFtZXNwYWNlZFRvcGljOnJ9O2xldCBpPXNlKHIpO2l8fChpPWF3YWl0IF9lKG8pLGZ1bmN0aW9uKGUsdCl7b2Uuc2V0KGUsdCl9KHIsaSkpO2NvbnN0IHM9ZGUuYmluZChudWxsLHIpLGE9RWUuYmluZChudWxsLHIpLGM9bS5iaW5kKG51bGwsciksZD1QLmJpbmQobnVsbCxyKTtyZXR1cm57Z2V0QWxsUHJvdmlkZXJzOmZlLmJpbmQobnVsbCxyKSxzZWFyY2g6eWUuYmluZChudWxsLG8pLHJlZ2lzdGVyOmxlLmJpbmQobnVsbCxyKSxkZXJlZ2lzdGVyOnBlLmJpbmQobnVsbCxyKSxvblN1YnNjcmlwdGlvbjpjZS5iaW5kKG51bGwsciksb25EaXNjb25uZWN0OkFlLmJpbmQobnVsbCxyKSxvblJlZ2lzdGVyOnYuYmluZChudWxsLHIpLG9uRGVyZWdpc3RlcjpDLmJpbmQobnVsbCxyKSxkaXNwYXRjaDpnZS5iaW5kKG51bGwsbyksZGlzY29ubmVjdDokZS5iaW5kKG51bGwscikscmVtb3ZlTGlzdGVuZXI6ZT0+e3MoZSksYShlKSxjKGUpLGQoZSl9fX1jb25zdHtjcmVhdGU6R2V9PW8se3N1YnNjcmliZTpOZX09cixIZT17Y3JlYXRlOkdlLHN1YnNjcmliZTpOZSxkZWZhdWx0VG9waWM6XCJhbGxcIn0sVWU9KCk9Pntjb25zdCBlPXdpbmRvdztlLnNlYXJjaD1IZSxlLmZpbiYmKGUuZmluLlNlYXJjaD1IZSl9LFZlPWU9Pntjb25zdCB0PSgpPT57VWUoKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpfTtyZXR1cm4gdH07aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7VWUoKTtjb25zdCBlPVwibG9hZFwiLHQ9VmUoZSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSx0KTtjb25zdCBuPVwiRE9NQ29udGVudExvYWRlZFwiLHI9VmUobik7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIobixyKX1jb25zdCBLZT1uZXcgTWFwO2FzeW5jIGZ1bmN0aW9uIFhlKCl7YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7S2Uuc2V0KGUsYXdhaXQgTmUoe3RvcGljOmUsdXVpZDpkLnE5LldvcmtzcGFjZX0pKX0ocyl9bGV0IGplO2FzeW5jIGZ1bmN0aW9uIEplKGUpe3JldHVybiBhd2FpdCBhc3luYyBmdW5jdGlvbigpe3JldHVybiBqZXx8KGplPVhlKCkpLGplfSgpLEtlLmdldChlKX12YXIgWmU9bigzNzU4KTtjb25zdCB6ZT1hc3luYyBlPT57aWYoIWUuaWNvbil0aHJvdyBuZXcgRXJyb3IoYCR7ZS5pZH0gcHJvdmlkZXIgbmVlZHMgdG8gaGF2ZSBpY29uIHByb3BlcnR5IGRlZmluZWQuYCk7YXdhaXQoMCxpLmFCKSgpO3JldHVybihhd2FpdCBKZShzKSkucmVnaXN0ZXIoZSl9LFFlPWFzeW5jIGU9Pnthd2FpdCgwLGkuYUIpKCk7cmV0dXJuKGF3YWl0IEplKHMpKS5kZXJlZ2lzdGVyKGUpfTthc3luYyBmdW5jdGlvbiBZZSgpe3JldHVybihhd2FpdCgwLGkuWGwpKCkpLmRpc3BhdGNoKGkuTWwuU2hvd0hvbWUsdm9pZCAwKX1hc3luYyBmdW5jdGlvbiBldCgpe3JldHVybihhd2FpdCgwLGkuWGwpKCkpLmRpc3BhdGNoKGkuTWwuSGlkZUhvbWUsdm9pZCAwKX19LDMyOTg6KGUsdCxuKT0+e24uZCh0LHt3OigpPT5yLnd9KTt2YXIgcj1uKDUzMTYpfSwzNzU4OihlLHQsbik9Pnt2YXIgcixvLGk7bi5kKHQse1B0OigpPT5yLHlXOigpPT5vLGVsOigpPT5pfSksZnVuY3Rpb24oZSl7ZS5TdWdnZXN0aW9uPVwic3VnZ2VzdGlvblwifShyfHwocj17fSkpLGZ1bmN0aW9uKGUpe2UuQ29udGFjdD1cIkNvbnRhY3RcIixlLkN1c3RvbT1cIkN1c3RvbVwiLGUuTGlzdD1cIkxpc3RcIixlLlBsYWluPVwiUGxhaW5cIixlLlNpbXBsZVRleHQ9XCJTaW1wbGVUZXh0XCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5NdWx0aVNlbGVjdD1cIk11bHRpU2VsZWN0XCJ9KGl8fChpPXt9KSl9LDc1NjQ6KGUsdCxuKT0+e24oMzI5OCksbigzNzU4KSxuKDYxMTQpLG4oMjEwOSl9LDYxMTQ6KGUsdCxuKT0+e3ZhciByLG87bi5kKHQse0w6KCk9PnIsVDooKT0+b30pLGZ1bmN0aW9uKGUpe2UuU25hcHNob3Q9XCJzbmFwc2hvdFwiLGUuTWFuaWZlc3Q9XCJtYW5pZmVzdFwiLGUuVmlldz1cInZpZXdcIixlLkV4dGVybmFsPVwiZXh0ZXJuYWxcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkxhbmRpbmdQYWdlPVwibGFuZGluZ1BhZ2VcIixlLkFwcEdyaWQ9XCJhcHBHcmlkXCJ9KG98fChvPXt9KSl9LDIxMDk6KGUsdCxuKT0+e24uZCh0LHtwNjooKT0+cixHbzooKT0+byxiSTooKT0+aSxaSjooKT0+c30pO2NvbnN0IHI9e0NvbnRhaW5lcjpcIkNvbnRhaW5lclwiLEJ1dHRvbjpcIkJ1dHRvblwifSxvPXtUZXh0OlwiVGV4dFwiLEltYWdlOlwiSW1hZ2VcIixMaXN0OlwiTGlzdFwifSxpPXsuLi5yLC4uLm99O3ZhciBzOyFmdW5jdGlvbihlKXtlLlByaW1hcnk9XCJwcmltYXJ5XCIsZS5TZWNvbmRhcnk9XCJzZWNvbmRhcnlcIixlLlRleHRPbmx5PVwidGV4dE9ubHlcIn0oc3x8KHM9e30pKX0sMzE3OihlLHQsbik9PntuLnIodCksbi5kKHQse0FwcE1hbmlmZXN0VHlwZTooKT0+by5MLFN0b3JlZnJvbnRUZW1wbGF0ZTooKT0+by5ULGRlcmVnaXN0ZXI6KCk9PnUsaGlkZTooKT0+ZixyZWdpc3RlcjooKT0+ZCxzaG93OigpPT5sfSk7dmFyIHI9big3NDA1KTtuKDc1NjQpO3ZhciBvPW4oNjExNCk7bGV0IGk7Y29uc3Qgcz1uZXcgTWFwLGE9ZT0+e2lmKCFzLmhhcyhlKSl0aHJvdyBuZXcgRXJyb3IoYFN0b3JlZnJvbnQgUHJvdmlkZXIgd2l0aCBpZCAke2V9IGlzIG5vdCByZWdpc3RlcmVkYCk7cmV0dXJuIHMuZ2V0KGUpfSxjPWFzeW5jIGU9Pntjb25zdCB0PWF3YWl0KDAsci5YbCkoKTtpZihzLmhhcyhlLmlkKSl0aHJvdyBuZXcgRXJyb3IoYFN0b3JlZnJvbnQgcHJvdmlkZXIgd2l0aCBpZCAke2UuaWR9IGFscmVhZHkgcmVnaXN0ZXJlZGApO3JldHVybiBzLnNldChlLmlkLGUpLChlPT57ZS5pc1N0b3JlZnJvbnRBY3Rpb25zUmVnaXN0ZXJlZHx8KGUuaXNTdG9yZWZyb250QWN0aW9uc1JlZ2lzdGVyZWQ9ITAsZS5yZWdpc3RlcihyLk1sLkdldFN0b3JlZnJvbnRQcm92aWRlckFwcHMsKGU9PmEoZSkuZ2V0QXBwcygpKSksZS5yZWdpc3RlcihyLk1sLkdldFN0b3JlZnJvbnRQcm92aWRlckZvb3RlciwoZT0+YShlKS5nZXRGb290ZXIoKSkpLGUucmVnaXN0ZXIoci5NbC5HZXRTdG9yZWZyb250UHJvdmlkZXJMYW5kaW5nUGFnZSwoZT0+YShlKS5nZXRMYW5kaW5nUGFnZSgpKSksZS5yZWdpc3RlcihyLk1sLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb24sKGU9PmEoZSkuZ2V0TmF2aWdhdGlvbigpKSksZS5yZWdpc3RlcihyLk1sLkxhdW5jaFN0b3JlZnJvbnRQcm92aWRlckFwcCwoKHtpZDplLGFwcDp0fSk9PmEoZSkubGF1bmNoQXBwKHQpKSkpfSkodCksdC5kaXNwYXRjaChyLk1sLlJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyLGUpfSxkPWU9PihpPWMoZSksaSksdT1hc3luYyBlPT57YXdhaXQgaSxzLmRlbGV0ZShlKTtyZXR1cm4oYXdhaXQoMCxyLlhsKSgpKS5kaXNwYXRjaChyLk1sLkRlcmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIsZSl9LGY9YXN5bmMoKT0+e2F3YWl0IGksYXdhaXQoMCxyLmFCKSgpLGF3YWl0KGFzeW5jKCk9Pihhd2FpdCgwLHIuRG0pKCkpLmRpc3BhdGNoKHIuTWwuSGlkZVN0b3JlZnJvbnQsdm9pZCAwKSkoKX0sbD1hc3luYygpPT57YXdhaXQgaSxhd2FpdCgwLHIuYUIpKCksYXdhaXQoYXN5bmMoKT0+KGF3YWl0KDAsci5EbSkoKSkuZGlzcGF0Y2goci5NbC5TaG93U3RvcmVmcm9udCxudWxsKSkoKX19LDc0MDU6KGUsdCxuKT0+e24uZCh0LHtNbDooKT0+cyxEbTooKT0+YSxYbDooKT0+ZixhQjooKT0+dX0pO3ZhciByPW4oNjY3OCk7Y29uc3Qgbz1yLkF4JiZcImNvbXBsZXRlXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZuZXcgUHJvbWlzZSgoZT0+ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIiwoKCk9PntcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZlKCl9KSkpKTt2YXIgaT1uKDEyMSk7dmFyIHM7IWZ1bmN0aW9uKGUpe2UuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5EZXJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyPVwiZGVyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJzPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXJzXCIsZS5IaWRlU3RvcmVmcm9udD1cImhpZGUtc3RvcmVmcm9udFwiLGUuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWFwcHNcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbGFuZGluZy1wYWdlXCIsZS5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXI9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1mb290ZXJcIixlLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb249XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1uYXZpZ2F0aW9uXCIsZS5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHA9XCJsYXVuY2gtc3RvcmVmcm9udC1wcm92aWRlci1hcHBcIixlLlNob3dTdG9yZWZyb250PVwic2hvdy1zdG9yZWZyb250XCIsZS5DcmVhdGVTdG9yZWZyb250V2luZG93PVwiY3JlYXRlLXN0b3JlZnJvbnQtd2luZG93XCIsZS5TaG93SG9tZT1cInNob3ctaG9tZVwiLGUuSGlkZUhvbWU9XCJoaWRlLWhvbWVcIixlLkFzc2lnbkhvbWVTZWFyY2hDb250ZXh0PVwiYXNzaWduLWhvbWUtc2VhcmNoLWNvbnRleHRcIixlLkdldExlZ2FjeVBhZ2VzPVwiZ2V0LWxlZ2FjeS1wYWdlc1wiLGUuR2V0TGVnYWN5V29ya3NwYWNlcz1cImdldC1sZWdhY3ktd29ya3NwYWNlc1wiLGUuR2V0Q29tcHV0ZWRQbGF0Zm9ybVRoZW1lPVwiZ2V0LWNvbXB1dGVkLXBsYXRmb3JtLXRoZW1lXCJ9KHN8fChzPXt9KSk7Y29uc3QgYT1mdW5jdGlvbihlKXtsZXQgdDtyZXR1cm4oKT0+e2lmKCFyLnNTKXRocm93IG5ldyBFcnJvcihcImdldENoYW5uZWxDbGllbnQgY2Fubm90IGJlIHVzZWQgb3V0c2lkZSBhbiBPcGVuRmluIGVudi4gQXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiB0fHwodD0oYXN5bmMoKT0+e2F3YWl0IG87Y29uc3Qgbj1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSk7cmV0dXJuIG4ub25EaXNjb25uZWN0aW9uKChhc3luYygpPT57dD12b2lkIDB9KSksbn0pKCkudGhlbigoZT0+ZSkpLmNhdGNoKChuPT57dGhyb3cgdD12b2lkIDAsbmV3IEVycm9yKGBmYWlsZWQgdG8gY29ubmVjdCB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX06ICR7bn1gKX0pKSksdH19KFwiX19vZl93b3Jrc3BhY2VfcHJvdG9jb2xfX1wiKSxjPVwiaXNMYXVuY2hlZFZpYUxpYlwiLGQ9ZT0+e2NvbnN0IHQ9bmV3IFVSTChlKTtyZXR1cm4gdC5zZWFyY2hQYXJhbXMuYXBwZW5kKGMsXCJ0cnVlXCIpLHQudG9TdHJpbmcoKX0sdT1hc3luYygpPT57aWYoIWF3YWl0KDAsaS5KVikoaS5pVykpcmV0dXJuKHIuWkt8fC0xPT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luXCIpKSYmYXdhaXQgZmluLkFwcGxpY2F0aW9uLnN0YXJ0RnJvbU1hbmlmZXN0KGQoci5hVykpLGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKGQoci5HWCkpfSxmPWFzeW5jKCk9Pihhd2FpdCB1KCksYSgpKX0sNTgwNjooZSx0LG4pPT57bi5kKHQse3E5OigpPT5yfSk7dmFyIHIsbyxpLHM9big2Njc4KTshZnVuY3Rpb24oZSl7ZS5Xb3Jrc3BhY2U9XCJvcGVuZmluLWJyb3dzZXJcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLlJ1blJlcXVlc3RlZD1cInJ1bi1yZXF1ZXN0ZWRcIixlLldpbmRvd09wdGlvbnNDaGFuZ2VkPVwid2luZG93LW9wdGlvbnMtY2hhbmdlZFwiLGUuV2luZG93Q2xvc2VkPVwid2luZG93LWNsb3NlZFwiLGUuV2luZG93Q3JlYXRlZD1cIndpbmRvdy1jcmVhdGVkXCJ9KG98fChvPXt9KSksZnVuY3Rpb24oZSl7ZS5GaW5Qcm90b2NvbD1cImZpbi1wcm90b2NvbFwifShpfHwoaT17fSkpO3MuQUIscy5BQixyLldvcmtzcGFjZSxyLldvcmtzcGFjZX0sNjY3ODooZSx0LG4pPT57dmFyIHI7bi5kKHQse3NTOigpPT5vLEF4OigpPT5pLEFCOigpPT5hLG9DOigpPT5jLFpLOigpPT5kLEdYOigpPT51LGFXOigpPT5mfSksZnVuY3Rpb24oZSl7ZS5Mb2NhbD1cImxvY2FsXCIsZS5EZXY9XCJkZXZcIixlLlN0YWdpbmc9XCJzdGFnaW5nXCIsZS5Qcm9kPVwicHJvZFwifShyfHwocj17fSkpO2NvbnN0IG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGZpbixpPShcInVuZGVmaW5lZFwiPT10eXBlb2YgcHJvY2Vzc3x8cHJvY2Vzcy5lbnY/LkpFU1RfV09SS0VSX0lELFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpLHM9aT93aW5kb3cub3JpZ2luOnIuTG9jYWwsYT1vJiZmaW4ubWUudXVpZCxjPW8mJmZpbi5tZS5uYW1lLGQ9KG8mJmZpbi5tZS5lbnRpdHlUeXBlLFwicHJvZFwiPT09ci5Mb2NhbCksdT0oci5EZXYsci5TdGFnaW5nLHIuUHJvZCxcImZpbnM6Ly9zeXN0ZW0tYXBwcy93b3Jrc3BhY2VcIiksZj1cImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzYuMy42L2FwcC5qc29uXCIsbD1lPT5lLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpfHxlLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKT9lOnMrZTtsKFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvNi4zLjZcIiksbChcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlLzYuMy42XCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfRE9DU19QTEFURk9STV9VUkwmJmwoV09SS1NQQUNFX0RPQ1NfUExBVEZPUk1fVVJMKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX0RPQ1NfQ0xJRU5UX1VSTCYmbChXT1JLU1BBQ0VfRE9DU19DTElFTlRfVVJMKX0sMTIxOihlLHQsbik9PntuLmQodCx7aVc6KCk9PmMsSlY6KCk9PmR9KTt2YXIgcixvLGk9big1ODA2KSxzPW4oNjY3OCk7IWZ1bmN0aW9uKGUpe2UuSG9tZT1cIm9wZW5maW4taG9tZVwiLGUuRG9jaz1cIm9wZW5maW4tZG9ja1wiLGUuU3RvcmVmcm9udD1cIm9wZW5maW4tc3RvcmVmcm9udFwiLGUuSG9tZUludGVybmFsPVwib3BlbmZpbi1ob21lLWludGVybmFsXCIsZS5Ccm93c2VyTWVudT1cIm9wZW5maW4tYnJvd3Nlci1tZW51XCIsZS5Ccm93c2VySW5kaWNhdG9yPVwib3BlbmZpbi1icm93c2VyLWluZGljYXRvclwiLGUuQnJvd3NlcldpbmRvdz1cImludGVybmFsLWdlbmVyYXRlZC13aW5kb3dcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLlNob3duPVwic2hvd25cIixlLkJvdW5kc0NoYW5nZWQ9XCJib3VuZHMtY2hhbmdlZFwiLGUuTGF5b3V0UmVhZHk9XCJsYXlvdXQtcmVhZHlcIixlLkVuZFVzZXJCb3VuZHNDaGFuZ2luZz1cImVuZC11c2VyLWJvdW5kcy1jaGFuZ2luZ1wiLGUuQmx1cnJlZD1cImJsdXJyZWRcIixlLkNsb3NlUmVxdWVzdGVkPVwiY2xvc2UtcmVxdWVzdGVkXCIsZS5Gb2N1c2VkPVwiZm9jdXNlZFwiLGUuU2hvd1JlcXVlc3RlZD1cInNob3ctcmVxdWVzdGVkXCIsZS5WaWV3Q3Jhc2hlZD1cInZpZXctY3Jhc2hlZFwiLGUuVmlld0F0dGFjaGVkPVwidmlldy1hdHRhY2hlZFwiLGUuVmlld0RldGFjaGVkPVwidmlldy1kZXRhY2hlZFwiLGUuVmlld1BhZ2VUaXRsZVVwZGF0ZWQ9XCJ2aWV3LXBhZ2UtdGl0bGUtdXBkYXRlZFwiLGUuVmlld0Rlc3Ryb3llZD1cInZpZXctZGVzdHJveWVkXCIsZS5PcHRpb25zQ2hhbmdlZD1cIm9wdGlvbnMtY2hhbmdlZFwifShvfHwobz17fSkpO2Z1bmN0aW9uIGEoZSl7aWYoIXMuc1MpdGhyb3cgbmV3IEVycm9yKFwiZ2V0T0ZXaW5kb3cgY2FuIG9ubHkgYmUgdXNlZCBpbiBhbiBPcGVuRmluIGVudi4gQXZvaWQgY2FsbGluZyB0aGlzIG1ldGhvZCBkdXJpbmcgcHJlLXJlbmRlcmluZy5cIik7cmV0dXJuIGZpbi5XaW5kb3cud3JhcFN5bmMoZSl9cy5vQyxzLkFCO3IuSG9tZSxpLnE5LldvcmtzcGFjZSxyLkRvY2ssaS5xOS5Xb3Jrc3BhY2Usci5TdG9yZWZyb250LGkucTkuV29ya3NwYWNlO2NvbnN0IGM9e25hbWU6aS5xOS5Xb3Jrc3BhY2UsdXVpZDppLnE5LldvcmtzcGFjZX07Y29uc3QgZD1lPT5hKGUpLmdldE9wdGlvbnMoKS50aGVuKCgoKT0+ITApKS5jYXRjaCgoKCk9PiExKSl9LDUzMTY6KGUsdCxuKT0+e3ZhciByLG87bi5kKHQse0Q6KCk9PnIsdzooKT0+b30pLGZ1bmN0aW9uKGUpe2UuRmV0Y2hpbmc9XCJmZXRjaGluZ1wiLGUuRmV0Y2hlZD1cImZldGNoZWRcIixlLkNvbXBsZXRlPVwiY29tcGxldGVcIn0ocnx8KHI9e30pKSxmdW5jdGlvbihlKXtlLkFjdGl2ZT1cImFjdGl2ZVwiLGUuRGVmYXVsdD1cImRlZmF1bHRcIn0ob3x8KG89e30pKX19LHQ9e307ZnVuY3Rpb24gbihyKXt2YXIgbz10W3JdO2lmKHZvaWQgMCE9PW8pcmV0dXJuIG8uZXhwb3J0czt2YXIgaT10W3JdPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtyXShpLGkuZXhwb3J0cyxuKSxpLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciByIGluIHQpbi5vKHQscikmJiFuLm8oZSxyKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUscix7ZW51bWVyYWJsZTohMCxnZXQ6dFtyXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpLG4ucj1lPT57XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX07dmFyIHI9e307KCgpPT57bi5yKHIpLG4uZChyLHtBcHBNYW5pZmVzdFR5cGU6KCk9PnAuTCxCdXR0b25TdHlsZTooKT0+Zi5aSixDTElBY3Rpb246KCk9PmwuUHQsQ0xJRmlsdGVyT3B0aW9uVHlwZTooKT0+bC5lbCxDTElUZW1wbGF0ZTooKT0+bC55VyxDb250YWluZXJUZW1wbGF0ZUZyYWdtZW50TmFtZXM6KCk9PmYucDYsSG9tZTooKT0+byxMZWdhY3k6KCk9PmUsUHJlc2VudGF0aW9uVGVtcGxhdGVGcmFnbWVudE5hbWVzOigpPT5mLkdvLFNlYXJjaFRhZ0JhY2tncm91bmQ6KCk9PnUudyxTdG9yZWZyb250OigpPT5kLFN0b3JlZnJvbnRUZW1wbGF0ZTooKT0+cC5ULFRlbXBsYXRlRnJhZ21lbnRUeXBlczooKT0+Zi5iSX0pO3ZhciBlPXt9O24ucihlKSxuLmQoZSx7Z2V0UGFnZXM6KCk9PmEsZ2V0V29ya3NwYWNlczooKT0+Y30pO3ZhciB0LG89bigzMTMzKTtuKDY2NzgpLG4oMTIxKTshZnVuY3Rpb24oZSl7ZS5UYWJDcmVhdGVkPVwidGFiLWNyZWF0ZWRcIixlLkNvbnRhaW5lckNyZWF0ZWQ9XCJjb250YWluZXItY3JlYXRlZFwiLGUuQ29udGFpbmVyUmVzaXplZD1cImNvbnRhaW5lci1yZXNpemVkXCJ9KHR8fCh0PXt9KSk7bmV3IE1hcDt2YXIgaTshZnVuY3Rpb24oZSl7ZS5MYXN0TGF1bmNoZWRXb3Jrc3BhY2VJZD1cImFjdGl2ZVdvcmtzcGFjZUlkXCIsZS5MYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3c9XCJsYXN0Rm9jdXNlZEJyb3dzZXJXaW5kb3dcIixlLk1hY2hpbmVOYW1lPVwibWFjaGluZU5hbWVcIixlLk5ld1RhYlBhZ2VMYXlvdXQ9XCJOZXdUYWJQYWdlTGF5b3V0XCIsZS5OZXdUYWJQYWdlU29ydD1cIk5ld1RhYlBhZ2VTb3J0XCJ9KGl8fChpPXt9KSk7dmFyIHM9big3NDA1KTtjb25zdCBhPSgpPT5hc3luYyBmdW5jdGlvbigpe3JldHVybihhd2FpdCgwLHMuRG0pKCkpLmRpc3BhdGNoKHMuTWwuR2V0TGVnYWN5UGFnZXMsdm9pZCAwKX0oKSxjPSgpPT4oYXN5bmMoKT0+KGF3YWl0KDAscy5EbSkoKSkuZGlzcGF0Y2gocy5NbC5HZXRMZWdhY3lXb3Jrc3BhY2VzLHZvaWQgMCkpKCk7dmFyIGQ9bigzMTcpLHU9bigzMjk4KSxmPW4oMjEwOSksbD1uKDM3NTgpLHA9big2MTE0KX0pKCksbW9kdWxlLmV4cG9ydHM9cn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TGlrZUtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2NpaVRvQXJyYXk7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCJ2YXIgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAqIGFycmF5IG9mIGBvYmplY3RgIHByb3BlcnR5IHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eSBuYW1lc1xuICogb2YgYHByb3BzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIGFycmF5TWFwKHByb3BzLCBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VWYWx1ZXM7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5QXJyYXk7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG4iLCJ2YXIgYXNjaWlUb0FycmF5ID0gcmVxdWlyZSgnLi9fYXNjaWlUb0FycmF5JyksXG4gICAgaGFzVW5pY29kZSA9IHJlcXVpcmUoJy4vX2hhc1VuaWNvZGUnKSxcbiAgICB1bmljb2RlVG9BcnJheSA9IHJlcXVpcmUoJy4vX3VuaWNvZGVUb0FycmF5Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBoYXNVbmljb2RlKHN0cmluZylcbiAgICA/IHVuaWNvZGVUb0FycmF5KHN0cmluZylcbiAgICA6IGFzY2lpVG9BcnJheShzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvQXJyYXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlVG9BcnJheTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpLFxuICAgIHN0dWJGYWxzZSA9IHJlcXVpcmUoJy4vc3R1YkZhbHNlJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB2YWx1ZXMgPSByZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bUl0ZXJhdG9yID0gU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0FycmF5KHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiBfLnRvQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddXG4gKlxuICogXy50b0FycmF5KDEpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLnRvQXJyYXkobnVsbCk7XG4gKiAvLyA9PiBbXVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb0FycmF5KHZhbHVlKSA6IGNvcHlBcnJheSh2YWx1ZSk7XG4gIH1cbiAgaWYgKHN5bUl0ZXJhdG9yICYmIHZhbHVlW3N5bUl0ZXJhdG9yXSkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkodmFsdWVbc3ltSXRlcmF0b3JdKCkpO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgZnVuYyA9IHRhZyA9PSBtYXBUYWcgPyBtYXBUb0FycmF5IDogKHRhZyA9PSBzZXRUYWcgPyBzZXRUb0FycmF5IDogdmFsdWVzKTtcblxuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheTtcbiIsInZhciBiYXNlVmFsdWVzID0gcmVxdWlyZSgnLi9fYmFzZVZhbHVlcycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9lbW9qaScpOyIsIi8qanNsaW50IG5vZGU6IHRydWUqL1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvdG9BcnJheScpO1xudmFyIGVtb2ppQnlOYW1lID0gcmVxdWlyZSgnLi9lbW9qaS5qc29uJyk7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIHJlZ2V4IHRvIHBhcnNlIGVtb2ppIGluIGEgc3RyaW5nIC0gZmluZHMgZW1vamksIGUuZy4gOmNvZmZlZTpcbiAqL1xudmFyIGVtb2ppTmFtZVJlZ2V4ID0gLzooW2EtekEtWjAtOV9cXC1cXCtdKyk6L2c7XG5cbi8qKlxuICogcmVnZXggdG8gdHJpbSB3aGl0ZXNwYWNlXG4gKiB1c2UgaW5zdGVhZCBvZiBTdHJpbmcucHJvdG90eXBlLnRyaW0oKSBmb3IgSUU4IHN1cHBvcnRcbiAqL1xudmFyIHRyaW1TcGFjZVJlZ2V4ID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG4vKipcbiAqIFJlbW92ZXMgY29sb25zIG9uIGVpdGhlciBzaWRlXG4gKiBvZiB0aGUgc3RyaW5nIGlmIHByZXNlbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQ29sb25zIChzdHIpIHtcbiAgdmFyIGNvbG9uSW5kZXggPSBzdHIuaW5kZXhPZignOicpO1xuICBpZiAoY29sb25JbmRleCA+IC0xKSB7XG4gICAgLy8gOmVtb2ppOiAoaHR0cDovL3d3dy5lbW9qaS1jaGVhdC1zaGVldC5jb20vKVxuICAgIGlmIChjb2xvbkluZGV4ID09PSBzdHIubGVuZ3RoIC0gMSkge1xuICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBjb2xvbkluZGV4KTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyKGNvbG9uSW5kZXggKyAxKTtcbiAgICAgIHJldHVybiBzdHJpcENvbG9ucyhzdHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQWRkcyBjb2xvbnMgdG8gZWl0aGVyIHNpZGVcbiAqIG9mIHRoZSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gd3JhcENvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyLmxlbmd0aCA+IDApID8gJzonICsgc3RyICsgJzonIDogc3RyO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IHRoZSB3b3JkIGlzIHdyYXBwZWQgaW4gY29sb25zXG4gKiBieSBvbmx5IGFkZGluZyB0aGVtLCBpZiB0aGV5IGFyZSBub3QgdGhlcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuc3VyZUNvbG9ucyAoc3RyKSB7XG4gIHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyWzBdICE9PSAnOicpID8gd3JhcENvbG9ucyhzdHIpIDogc3RyO1xufVxuXG4vLyBOb24gc3BhY2luZyBtYXJrLCBzb21lIGVtb3RpY29ucyBoYXZlIHRoZW0uIEl0J3MgdGhlICdWYXJpYW50IEZvcm0nLFxuLy8gd2hpY2ggcHJvdmlkZXMgbW9yZSBpbmZvcm1hdGlvbiBzbyB0aGF0IGVtb3RpY29ucyBjYW4gYmUgcmVuZGVyZWQgYXNcbi8vIG1vcmUgY29sb3JmdWwgZ3JhcGhpY3MuIEZFMEUgaXMgYSB1bmljb2RlIHRleHQgdmVyc2lvbiwgd2hlcmUgYXMgRkUwRlxuLy8gc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgZ3JhcGhpY2FsIHZlcnNpb24uIFRoZSBjb2RlIGdyYWNlZnVsbHkgZGVncmFkZXMuXG52YXIgTk9OX1NQQUNJTkdfTUFSSyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUwMzkpOyAvLyA2NTAzOSAtICfvuI8nIC0gMHhGRTBGO1xudmFyIG5vblNwYWNpbmdSZWdleCA9IG5ldyBSZWdFeHAoTk9OX1NQQUNJTkdfTUFSSywgJ2cnKVxuXG4vLyBSZW1vdmUgdGhlIG5vbi1zcGFjaW5nLW1hcmsgZnJvbSB0aGUgY29kZSwgbmV2ZXIgc2VuZCBhIHN0cmlwcGVkIHZlcnNpb25cbi8vIHRvIHRoZSBjbGllbnQsIGFzIGl0IGtpbGxzIGdyYXBoaWNhbCBlbW90aWNvbnMuXG5mdW5jdGlvbiBzdHJpcE5TQiAoY29kZSkge1xuICByZXR1cm4gY29kZS5yZXBsYWNlKG5vblNwYWNpbmdSZWdleCwgJycpO1xufTtcblxuLy8gUmV2ZXJzZWQgaGFzaCB0YWJsZSwgd2hlcmUgYXMgZW1vamlCeU5hbWUgY29udGFpbnMgYSB7IGhlYXJ0OiAn4p2kJyB9XG4vLyBkaWN0aW9uYXJ5IGVtb2ppQnlDb2RlIGNvbnRhaW5zIHsg4p2kOiAnaGVhcnQnIH0uIFRoZSBjb2RlcyBhcmUgbm9ybWFsaXplZFxuLy8gdG8gdGhlIHRleHQgdmVyc2lvbi5cbnZhciBlbW9qaUJ5Q29kZSA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKS5yZWR1Y2UoZnVuY3Rpb24oaCxrKSB7XG4gIGhbc3RyaXBOU0IoZW1vamlCeU5hbWVba10pXSA9IGs7XG4gIHJldHVybiBoO1xufSwge30pO1xuXG4vKipcbiAqIEVtb2ppIG5hbWVzcGFjZVxuICovXG52YXIgRW1vamkgPSB7XG4gIGVtb2ppOiBlbW9qaUJ5TmFtZSxcbn07XG5cbi8qKlxuICogZ2V0IGVtb2ppIGNvZGUgZnJvbSBuYW1lLiByZXR1cm4gZW1vamkgY29kZSBiYWNrIGlmIGNvZGUgaXMgcGFzc2VkIGluLlxuICogQHBhcmFtICB7c3RyaW5nfSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5fZ2V0ID0gZnVuY3Rpb24gX2dldCAoZW1vamkpIHtcbiAgaWYgKGVtb2ppQnlDb2RlW3N0cmlwTlNCKGVtb2ppKV0pIHtcbiAgICByZXR1cm4gZW1vamk7XG4gIH0gZWxzZSBpZiAoZW1vamlCeU5hbWUuaGFzT3duUHJvcGVydHkoZW1vamkpKSB7XG4gICAgcmV0dXJuIGVtb2ppQnlOYW1lW2Vtb2ppXTtcbiAgfVxuXG4gIHJldHVybiBlbnN1cmVDb2xvbnMoZW1vamkpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgY29kZSBmcm9tIDplbW9qaTogc3RyaW5nIG9yIG5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkuZ2V0ID0gZnVuY3Rpb24gZ2V0IChlbW9qaSkge1xuICBlbW9qaSA9IHN0cmlwQ29sb25zKGVtb2ppKTtcblxuICByZXR1cm4gRW1vamkuX2dldChlbW9qaSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IGVpdGhlciBjb2RlIG9yIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lT3JDb2RlIFRoZSBlbW9qaSB0byBmaW5kLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmZpbmQgPSBmdW5jdGlvbiBmaW5kIChuYW1lT3JDb2RlKSB7XG4gIHJldHVybiBFbW9qaS5maW5kQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmZpbmRCeUNvZGUobmFtZU9yQ29kZSk7XG59O1xuXG4vKipcbiAqIGZpbmQgdGhlIGVtb2ppIGJ5IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBlbW9qaSB0byBmaW5kIGVpdGhlciBgY29mZmVlYCBvciBgOmNvZmZlZTpgO1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5FbW9qaS5maW5kQnlOYW1lID0gZnVuY3Rpb24gZmluZEJ5TmFtZSAobmFtZSkge1xuICB2YXIgc3RyaXBwZWQgPSBzdHJpcENvbG9ucyhuYW1lKTtcbiAgdmFyIGVtb2ppID0gZW1vamlCeU5hbWVbc3RyaXBwZWRdO1xuXG4gIHJldHVybiBlbW9qaSA/ICh7IGVtb2ppOiBlbW9qaSwga2V5OiBzdHJpcHBlZCB9KSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZmluZCB0aGUgZW1vamkgYnkgY29kZSAoZW1vamkpXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSBUaGUgZW1vamkgdG8gZmluZDsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuZmluZEJ5Q29kZSA9IGZ1bmN0aW9uIGZpbmRCeUNvZGUgKGNvZGUpIHtcbiAgdmFyIHN0cmlwcGVkID0gc3RyaXBOU0IoY29kZSk7XG4gIHZhciBuYW1lID0gZW1vamlCeUNvZGVbc3RyaXBwZWRdO1xuXG4gIC8vIGxvb2t1cCBlbW9qaSB0byBlbnN1cmUgdGhlIFZhcmlhbnQgRm9ybSBpcyByZXR1cm5lZFxuICByZXR1cm4gbmFtZSA/ICh7IGVtb2ppOiBlbW9qaUJ5TmFtZVtuYW1lXSwga2V5OiBuYW1lIH0pIDogdW5kZWZpbmVkO1xufTtcblxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVtb2ppIGlzIGtub3duIGJ5IHRoaXMgbGlicmFyeVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPckNvZGUgVGhlIGVtb2ppIHRvIHZhbGlkYXRlLCBlaXRoZXIgYGNvZmZlZWAsIGA6Y29mZmVlOmAgb3IgYOKYlWA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppID0gZnVuY3Rpb24gaGFzRW1vamkgKG5hbWVPckNvZGUpIHtcbiAgcmV0dXJuIEVtb2ppLmhhc0Vtb2ppQnlOYW1lKG5hbWVPckNvZGUpIHx8IEVtb2ppLmhhc0Vtb2ppQnlDb2RlKG5hbWVPckNvZGUpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhbiBlbW9qaSB3aXRoIGdpdmVuIG5hbWUgaXMga25vd24gYnkgdGhpcyBsaWJyYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZW1vamkgdG8gdmFsaWRhdGUgZWl0aGVyIGBjb2ZmZWVgIG9yIGA6Y29mZmVlOmA7XG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbkVtb2ppLmhhc0Vtb2ppQnlOYW1lID0gZnVuY3Rpb24gaGFzRW1vamlCeU5hbWUgKG5hbWUpIHtcbiAgdmFyIHJlc3VsdCA9IEVtb2ppLmZpbmRCeU5hbWUobmFtZSk7XG4gIHJldHVybiAhIXJlc3VsdCAmJiByZXN1bHQua2V5ID09PSBzdHJpcENvbG9ucyhuYW1lKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiBlbW9qaSBpcyBrbm93biBieSB0aGlzIGxpYnJhcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBlbW9qaSB0byB2YWxpZGF0ZTsgZm9yIGV4YW1wbGUgYOKYlWAgb3IgYOKYlGBcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuRW1vamkuaGFzRW1vamlCeUNvZGUgPSBmdW5jdGlvbiBoYXNFbW9qaUJ5Q29kZSAoY29kZSkge1xuICB2YXIgcmVzdWx0ID0gRW1vamkuZmluZEJ5Q29kZShjb2RlKTtcbiAgcmV0dXJuICEhcmVzdWx0ICYmIHN0cmlwTlNCKHJlc3VsdC5lbW9qaSkgPT09IHN0cmlwTlNCKGNvZGUpO1xufTtcblxuLyoqXG4gKiBnZXQgZW1vamkgbmFtZSBmcm9tIGNvZGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1vamlcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1ZGVDb2xvbnMgc2hvdWxkIHRoZSByZXN1bHQgaW5jbHVkZSB0aGUgOjpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkud2hpY2ggPSBmdW5jdGlvbiB3aGljaCAoZW1vamlfY29kZSwgaW5jbHVkZUNvbG9ucykge1xuICB2YXIgY29kZSA9IHN0cmlwTlNCKGVtb2ppX2NvZGUpO1xuICB2YXIgd29yZCA9IGVtb2ppQnlDb2RlW2NvZGVdO1xuXG4gIHJldHVybiBpbmNsdWRlQ29sb25zID8gd3JhcENvbG9ucyh3b3JkKSA6IHdvcmQ7XG59O1xuXG4vKipcbiAqIGVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgOmVtb2ppOiB3aXRoIGFuIGVtb2ppKVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbl9taXNzaW5nIChnZXRzIGVtb2ppIG5hbWUgd2l0aG91dCA6OiBhbmQgcmV0dXJucyBhIHByb3BlciBlbW9qaSBpZiBubyBlbW9qaSB3YXMgZm91bmQpXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm9ybWF0ICh3cmFwIHRoZSByZXR1cm5lZCBlbW9qaSBpbiBhIGN1c3RvbSBlbGVtZW50KVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5lbW9qaWZ5ID0gZnVuY3Rpb24gZW1vamlmeSAoc3RyLCBvbl9taXNzaW5nLCBmb3JtYXQpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcblxuICByZXR1cm4gc3RyLnNwbGl0KGVtb2ppTmFtZVJlZ2V4KSAvLyBwYXJzZSBlbW9qaSB2aWEgcmVnZXhcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gcGFyc2VFbW9qaShzLCBpKSB7XG4gICAgICAgICAgICAgIC8vIGV2ZXJ5IHNlY29uZCBlbGVtZW50IGlzIGFuIGVtb2ppLCBlLmcuIFwidGVzdCA6ZmFzdF9mb3J3YXJkOlwiIC0+IFsgXCJ0ZXN0IFwiLCBcImZhc3RfZm9yd2FyZFwiIF1cbiAgICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSByZXR1cm4gcztcbiAgICAgICAgICAgICAgdmFyIGVtb2ppID0gRW1vamkuX2dldChzKTtcbiAgICAgICAgICAgICAgdmFyIGlzTWlzc2luZyA9IGVtb2ppLmluZGV4T2YoJzonKSA+IC0xO1xuXG4gICAgICAgICAgICAgIGlmIChpc01pc3NpbmcgJiYgdHlwZW9mIG9uX21pc3NpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb25fbWlzc2luZyhzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaXNNaXNzaW5nICYmIHR5cGVvZiBmb3JtYXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0KGVtb2ppLCBzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBlbW9qaTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJykgLy8gY29udmVydCBiYWNrIHRvIHN0cmluZ1xuICA7XG59O1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBlbW9qaVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5yYW5kb20gPSBmdW5jdGlvbiByYW5kb20gKCkge1xuICB2YXIgZW1vamlLZXlzID0gT2JqZWN0LmtleXMoZW1vamlCeU5hbWUpO1xuICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaUtleXMubGVuZ3RoKTtcbiAgdmFyIGtleSA9IGVtb2ppS2V5c1tyYW5kb21JbmRleF07XG4gIHZhciBlbW9qaSA9IEVtb2ppLl9nZXQoa2V5KTtcbiAgcmV0dXJuIHsga2V5OiBrZXksIGVtb2ppOiBlbW9qaSB9O1xufVxuXG4vKipcbiAqICByZXR1cm4gYW4gY29sbGVjdGlvbiBvZiBwb3RlbnRpYWwgZW1vamkgbWF0Y2hlc1xuICogIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqICBAcmV0dXJuIHtBcnJheS48T2JqZWN0Pn1cbiAqL1xuRW1vamkuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoIChzdHIpIHtcbiAgdmFyIGVtb2ppS2V5cyA9IE9iamVjdC5rZXlzKGVtb2ppQnlOYW1lKTtcbiAgdmFyIG1hdGNoZXIgPSBzdHJpcENvbG9ucyhzdHIpXG4gIHZhciBtYXRjaGluZ0tleXMgPSBlbW9qaUtleXMuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5pbmRleE9mKG1hdGNoZXIpID09PSAwO1xuICB9KTtcbiAgcmV0dXJuIG1hdGNoaW5nS2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgZW1vamk6IEVtb2ppLl9nZXQoa2V5KSxcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiB1bmVtb2ppZnkgYSBzdHJpbmcgKHJlcGxhY2UgZW1vamkgd2l0aCA6ZW1vamk6KVxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkudW5lbW9qaWZ5ID0gZnVuY3Rpb24gdW5lbW9qaWZ5IChzdHIpIHtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcbiAgdmFyIHdvcmRzID0gdG9BcnJheShzdHIpO1xuXG4gIHJldHVybiB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCkge1xuICAgIHJldHVybiBFbW9qaS53aGljaCh3b3JkLCB0cnVlKSB8fCB3b3JkO1xuICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogcmVwbGFjZSBlbW9qaXMgd2l0aCByZXBsYWNlbWVudCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbnxzdHJpbmd9IHRoZSBzdHJpbmcgb3IgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgZW1vamkgd2l0aFxuICogQHBhcmFtIHtib29sZWFufSBzaG91bGQgdHJhaWxpbmcgd2hpdGVzcGFjZXMgYmUgY2xlYW5lZD8gRGVmYXVsdHMgZmFsc2VcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuRW1vamkucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKHN0ciwgcmVwbGFjZW1lbnQsIGNsZWFuU3BhY2VzKSB7XG4gIGlmICghc3RyKSByZXR1cm4gJyc7XG5cbiAgdmFyIHJlcGxhY2UgPSB0eXBlb2YgcmVwbGFjZW1lbnQgPT09ICdmdW5jdGlvbicgPyByZXBsYWNlbWVudCA6IGZ1bmN0aW9uKCkgeyByZXR1cm4gcmVwbGFjZW1lbnQ7IH07XG4gIHZhciB3b3JkcyA9IHRvQXJyYXkoc3RyKTtcblxuICB2YXIgcmVwbGFjZWQgPSB3b3Jkcy5tYXAoZnVuY3Rpb24od29yZCwgaWR4KSB7XG4gICAgdmFyIGVtb2ppID0gRW1vamkuZmluZEJ5Q29kZSh3b3JkKTtcblxuICAgIGlmIChlbW9qaSAmJiBjbGVhblNwYWNlcyAmJiB3b3Jkc1tpZHggKyAxXSA9PT0gJyAnKSB7XG4gICAgICB3b3Jkc1tpZHggKyAxXSA9ICcnO1xuICAgIH1cblxuICAgIHJldHVybiBlbW9qaSA/IHJlcGxhY2UoZW1vamkpIDogd29yZDtcbiAgfSkuam9pbignJyk7XG5cbiAgcmV0dXJuIGNsZWFuU3BhY2VzID8gcmVwbGFjZWQucmVwbGFjZSh0cmltU3BhY2VSZWdleCwgJycpIDogcmVwbGFjZWQ7XG59O1xuXG5cbi8qKlxuICogcmVtb3ZlIGFsbCBlbW9qaXMgZnJvbSBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5FbW9qaS5zdHJpcCA9IGZ1bmN0aW9uIHN0cmlwIChzdHIpIHtcbiAgcmV0dXJuIEVtb2ppLnJlcGxhY2Uoc3RyLCAnJywgdHJ1ZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtb2ppO1xuIiwiaW1wb3J0IHtcbiAgICBDTElUZW1wbGF0ZSxcbiAgICB0eXBlIENMSURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG4gICAgdHlwZSBDTElGaWx0ZXIsXG4gICAgdHlwZSBDTElTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuICAgIHR5cGUgSG9tZVNlYXJjaFJlc3BvbnNlLFxuICAgIHR5cGUgSG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uLCBJbnRlZ3JhdGlvbk1hbmFnZXIsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW1vamlTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0RW1vamlUZW1wbGF0ZSB9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0ICogYXMgZW1vamkgZnJvbSBcIm5vZGUtZW1vamlcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBFbW9qaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxFbW9qaVNldHRpbmdzPiB7XG4gICAgLyoqXG4gICAgICogUHJvdmlkZXIgaWQuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJlbW9qaVwiO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgcmVzdWx0LlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiA9IFwiRW1vamkgRGV0YWlsc1wiO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGtleSB0byB1c2UgZm9yIGEgZW1vamkgY29weSBrZXkgYWN0aW9uLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FTU9KSV9QUk9WSURFUl9DT1BZX0tFWV9BQ1RJT04gPSBcIkNvcHkgS2V5XCI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSBlbW9qaSBjb3B5IGtleSBhY3Rpb24uXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OID0gXCJDb3B5IEVtb2ppXCI7XG5cbiAgICAvKipcbiAgICAqIFRoZSBpbnRlZ3JhdGlvbiBtYW5hZ2VyLlxuICAgICogQGludGVybmFsXG4gICAgKi9cbiAgICBwcml2YXRlIF9pbnRlZ3JhdGlvbk1hbmFnZXI6IEludGVncmF0aW9uTWFuYWdlciB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtb2R1bGUgaXMgYmVpbmcgcmVnaXN0ZXJlZC5cbiAgICAgKiBAcGFyYW0gaW50ZWdyYXRpb25NYW5hZ2VyIFRoZSBtYW5hZ2VyIGZvciB0aGUgaW50ZWdyYXRpb24uXG4gICAgICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuICAgICAqIEByZXR1cm5zIE5vdGhpbmcuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKFxuICAgICAgICBpbnRlZ3JhdGlvbk1hbmFnZXI6IEludGVncmF0aW9uTWFuYWdlcixcbiAgICAgICAgaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+XG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuX2ludGVncmF0aW9uTWFuYWdlciA9IGludGVncmF0aW9uTWFuYWdlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9kdWxlIGlzIGJlaW5nIGRlcmVnaXN0ZXJlZC5cbiAgICAgKiBAcGFyYW0gaW50ZWdyYXRpb24gVGhlIGludGVncmF0aW9uIGRldGFpbHMuXG4gICAgICogQHJldHVybnMgTm90aGluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVyZWdpc3RlcihpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgYXBwbGljYXRpb24gZW50cmllcy5cbiAgICAgKiBAcGFyYW0gaW50ZWdyYXRpb24gVGhlIGludGVncmF0aW9uIGRldGFpbHMuXG4gICAgICogQHJldHVybnMgVGhlIGxpc3Qgb2YgYXBwbGljYXRpb24gZW50cmllcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0QXBwU2VhcmNoRW50cmllcyhpbnRlZ3JhdGlvbjogSW50ZWdyYXRpb248RW1vamlTZXR0aW5ncz4pOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIGludGVncmF0aW9uIFRoZSBpbnRlZ3JhdGlvbiBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuICAgICAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcbiAgICAgICAgaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+LFxuICAgICAgICByZXN1bHQ6IENMSURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG4gICAgICAgIGxhc3RSZXNwb25zZTogQ0xJU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuICAgICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfRU1PSklfQUNUSU9OICYmIHJlc3VsdC5kYXRhLmVtb2ppKSB7XG4gICAgICAgICAgICBhd2FpdCBmaW4uQ2xpcGJvYXJkLndyaXRlVGV4dCh7IGRhdGE6IHJlc3VsdC5kYXRhLmVtb2ppIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0NPUFlfS0VZX0FDVElPTiAmJiByZXN1bHQuZGF0YS5rZXkpIHtcbiAgICAgICAgICAgIGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHsgZGF0YTogcmVzdWx0LmRhdGEua2V5IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0RFVEFJTFNfQUNUSU9OICYmIHJlc3VsdC5kYXRhLnVybCAmJiB0aGlzLl9pbnRlZ3JhdGlvbk1hbmFnZXIub3BlblVybCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5faW50ZWdyYXRpb25NYW5hZ2VyLm9wZW5VcmwocmVzdWx0LmRhdGEudXJsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuICAgICAqIEBwYXJhbSBpbnRlZ3JhdGlvbiBUaGUgaW50ZWdyYXRpb24gZGV0YWlscy5cbiAgICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG4gICAgICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcbiAgICAgICAgaW50ZWdyYXRpb246IEludGVncmF0aW9uPEVtb2ppU2V0dGluZ3M+LFxuICAgICAgICBxdWVyeTogc3RyaW5nLFxuICAgICAgICBmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcbiAgICAgICAgbGFzdFJlc3BvbnNlOiBDTElTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGlmIChxdWVyeS5zdGFydHNXaXRoKFwiL2Vtb2ppIFwiKSkge1xuICAgICAgICAgICAgbGV0IGtleSA9IHF1ZXJ5LnNsaWNlKDcpO1xuICAgIFxuICAgICAgICAgICAgaWYgKGtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gRmluZCBleGFjdCBtYXRjaCBmaXJzdCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaEVtb2ppID0gZW1vamkuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoRW1vamkgJiYgIW1hdGNoRW1vamkuc3RhcnRzV2l0aChcIjpcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuY3JlYXRlUmVzdWx0KGtleSwgbWF0Y2hFbW9qaSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBGaW5kIGFsbCBvdGhlciBwb3RlbnRpYWwgbWF0Y2hlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGVtb2ppLnNlYXJjaChrZXkpO1xuICAgIFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVtb2ppICE9PSBtYXRjaEVtb2ppKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5jcmVhdGVSZXN1bHQocmVzdWx0LmtleSwgcmVzdWx0LmVtb2ppKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHNlYXJjaCByZXN1bHQuXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IGZvciB0aGUgZW1vamkuXG4gICAgICogQHBhcmFtIGVtb2ppIFRoZSBlbW9qaSBzeW1ib2wuXG4gICAgICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXN1bHQoa2V5OiBzdHJpbmcsIGVtb2ppOiBzdHJpbmcpOiBIb21lU2VhcmNoUmVzdWx0IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogYGVtb2ppLSR7a2V5fWAsXG4gICAgICAgICAgICB0aXRsZToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IFwiSW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9FTU9KSV9BQ1RJT04sIGhvdGtleTogXCJDbWRPckN0cmwrQ1wiIH0sXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBFbW9qaUludGVncmF0aW9uUHJvdmlkZXIuX0VNT0pJX1BST1ZJREVSX0RFVEFJTFNfQUNUSU9OLCBob3RrZXk6IFwiRW50ZXJcIiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVySWQ6IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fUFJPVklERVJfSUQsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGVtb2ppLFxuICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vZW1vamlwZWRpYS5vcmcvJHtrZXl9L2BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgbGF5b3V0OiBnZXRFbW9qaVRlbXBsYXRlKHsgXG4gICAgICAgICAgICAgICAgICAgIGNvcHlFbW9qaUFjdGlvbjogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9DT1BZX0VNT0pJX0FDVElPTiwgXG4gICAgICAgICAgICAgICAgICAgIGNvcHlLZXlBY3Rpb246IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlci5fRU1PSklfUFJPVklERVJfQ09QWV9LRVlfQUNUSU9OLCBcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsc0FjdGlvbjogRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyLl9FTU9KSV9QUk9WSURFUl9ERVRBSUxTX0FDVElPTiBcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGtleVRpdGxlOiBcIktleVwiLFxuICAgICAgICAgICAgICAgICAgICBjb3B5S2V5VGl0bGU6IFwiQ29weSBLZXlcIixcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBlbW9qaVRpdGxlOiBcIkVtb2ppXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvcHlFbW9qaVRpdGxlOiBcIkNvcHkgRW1vamlcIixcbiAgICAgICAgICAgICAgICAgICAgZW1vamksXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHNUaXRsZTogXCJGdXJ0aGVyIERldGFpbHNcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG5cbn1cbiIsImltcG9ydCB7IEJ1dHRvblN0eWxlLCBUZW1wbGF0ZUZyYWdtZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHsgY3JlYXRlQnV0dG9uLCBjcmVhdGVDb250YWluZXIsIGNyZWF0ZVRleHQgfSBmcm9tIFwiLi4vLi4vdGVtcGxhdGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbW9qaVRlbXBsYXRlKGFjdGlvbnM6IHtcbiAgICBjb3B5RW1vamlBY3Rpb246IHN0cmluZyxcbiAgICBjb3B5S2V5QWN0aW9uOiBzdHJpbmcsXG4gICAgZGV0YWlsc0FjdGlvbjogc3RyaW5nXG59KTogVGVtcGxhdGVGcmFnbWVudCB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRhaW5lcihcImNvbHVtblwiLCBbXG4gICAgICAgIGNyZWF0ZVRleHQoXCJrZXlUaXRsZVwiLCAxMiwgeyBjb2xvcjogXCJsaWdodGdyYXlcIiwgZm9udFdlaWdodDogXCJib2xkXCIgfSksXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lcihcInJvd1wiLCBbXG4gICAgICAgICAgICBjcmVhdGVUZXh0KFwia2V5XCIsIDEyLCB7IGNvbG9yOiBcIndoaXRlXCIsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9KSxcbiAgICAgICAgICAgIGNyZWF0ZUJ1dHRvbihCdXR0b25TdHlsZS5TZWNvbmRhcnksIFwiY29weUtleVRpdGxlXCIsIGFjdGlvbnMuY29weUtleUFjdGlvbiwgeyBmb250U2l6ZTogXCIxMnB4XCIgfSlcbiAgICAgICAgXSwgeyBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIsIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIgfSksXG5cbiAgICAgICAgY3JlYXRlVGV4dChcImVtb2ppVGl0bGVcIiwgMTIsIHsgY29sb3I6IFwibGlnaHRncmF5XCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pLFxuICAgICAgICBjcmVhdGVDb250YWluZXIoXCJyb3dcIiwgW1xuICAgICAgICAgICAgY3JlYXRlVGV4dChcImVtb2ppXCIsIDMyLCB7IGNvbG9yOiBcIndoaXRlXCIgfSksXG4gICAgICAgICAgICBjcmVhdGVCdXR0b24oQnV0dG9uU3R5bGUuU2Vjb25kYXJ5LCBcImNvcHlFbW9qaVRpdGxlXCIsIGFjdGlvbnMuY29weUVtb2ppQWN0aW9uLCB7IGZvbnRTaXplOiBcIjEycHhcIiB9KVxuICAgICAgICBdLCB7IGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiwgbWFyZ2luQm90dG9tOiBcIjEwcHhcIiB9KSxcblxuICAgICAgICBjcmVhdGVDb250YWluZXIoXCJyb3dcIiwgW1xuICAgICAgICAgICAgY3JlYXRlQnV0dG9uKEJ1dHRvblN0eWxlLlByaW1hcnksIFwiZGV0YWlsc1RpdGxlXCIsIGFjdGlvbnMuZGV0YWlsc0FjdGlvbiwgeyBmb250U2l6ZTogXCIxMnB4XCIgfSlcbiAgICAgICAgXSwgeyBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH0pXG4gICAgXSwge1xuICAgICAgICBwYWRkaW5nOiBcIjEwcHhcIlxuICAgIH0pO1xufSIsImltcG9ydCB7XG4gICAgQnV0dG9uU3R5bGUsXG4gICAgQnV0dG9uVGVtcGxhdGVGcmFnbWVudCxcbiAgICBJbWFnZVRlbXBsYXRlRnJhZ21lbnQsXG4gICAgUGxhaW5Db250YWluZXJUZW1wbGF0ZUZyYWdtZW50LFxuICAgIFRlbXBsYXRlRnJhZ21lbnQsXG4gICAgVGVtcGxhdGVGcmFnbWVudFR5cGVzLFxuICAgIFRleHRUZW1wbGF0ZUZyYWdtZW50LFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgKiBhcyBDU1MgZnJvbSBcImNzc3R5cGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihjb250YWluZXJUeXBlOiBcImNvbHVtblwiIHwgXCJyb3dcIiwgY2hpbGRyZW46IFRlbXBsYXRlRnJhZ21lbnRbXSwgc3R5bGU/OiBDU1MuUHJvcGVydGllcyk6IFBsYWluQ29udGFpbmVyVGVtcGxhdGVGcmFnbWVudCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkNvbnRhaW5lcixcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogY29udGFpbmVyVHlwZSxcbiAgICAgICAgICAgIC4uLnN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGV4dChkYXRhS2V5OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIgPSAxNCwgc3R5bGU/OiBDU1MuUHJvcGVydGllcyk6IFRleHRUZW1wbGF0ZUZyYWdtZW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuVGV4dCxcbiAgICAgICAgZGF0YUtleSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBgJHtmb250U2l6ZSA/PyAxNH1weGAsXG4gICAgICAgICAgICAuLi5zdHlsZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1hZ2UoZGF0YUtleTogc3RyaW5nLCBhbHRlcm5hdGl2ZVRleHQ6IHN0cmluZywgc3R5bGU/OiBDU1MuUHJvcGVydGllcyk6IEltYWdlVGVtcGxhdGVGcmFnbWVudCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVGVtcGxhdGVGcmFnbWVudFR5cGVzLkltYWdlLFxuICAgICAgICBkYXRhS2V5LFxuICAgICAgICBhbHRlcm5hdGl2ZVRleHQsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAuLi5zdHlsZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKGJ1dHRvblN0eWxlOiBCdXR0b25TdHlsZSwgdGl0bGVLZXk6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcsIHN0eWxlPzogQ1NTLlByb3BlcnRpZXMpOiBCdXR0b25UZW1wbGF0ZUZyYWdtZW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBUZW1wbGF0ZUZyYWdtZW50VHlwZXMuQnV0dG9uLFxuICAgICAgICBidXR0b25TdHlsZSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIGNyZWF0ZVRleHQodGl0bGVLZXksIDEyKVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIC4uLnN0eWxlXG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiaW1wb3J0IHsgRW1vamlJbnRlZ3JhdGlvblByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb24tcHJvdmlkZXJcIjtcblxuZXhwb3J0IGNvbnN0IGludGVncmF0aW9uID0gbmV3IEVtb2ppSW50ZWdyYXRpb25Qcm92aWRlcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==