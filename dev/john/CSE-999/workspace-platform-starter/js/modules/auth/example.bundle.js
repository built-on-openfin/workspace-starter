var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function i(t){return null==t}function n(t){return null!=t&&"string"==typeof t}function o(t){return n(t)&&t.trim().length>0}t.d(e,{k:()=>h});const s=`${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;function r(){const t=localStorage.getItem(s);if(!i(t))return JSON.parse(t)}function a(){localStorage.removeItem(s)}const h={auth:new class{constructor(){this._subscribeIdMap={},this._eventSubscribers={}}async initialize(t,e,n){this._logger=e("AuthExample"),this._authenticatedKey=`${fin.me.identity.uuid}-EXAMPLE_AUTH_IS_AUTHENTICATED`,i(this._authOptions)?(this._logger.info(`Setting options: ${JSON.stringify(t.data,null,4)}`),this._authOptions=t.data,this._authenticated=Boolean(localStorage.getItem(this._authenticatedKey)),this._authenticated&&(this._currentUser=r(),this.checkForSessionExpiry())):this._logger.warn("Options have already been set as init has already been called")}subscribe(t,e){const i="randomUUID"in globalThis.crypto?globalThis.crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(function(t){const e=globalThis.crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(t)/4;return(Number(t)^e).toString(16)})),n=this._eventSubscribers[t]??{};return n[i]=e,this._eventSubscribers[t]=n,this._subscribeIdMap[i]=t,this._logger?.info(`Subscription to ${t} events registered. Subscription Id: ${i}`),i}unsubscribe(t){const e=this._subscribeIdMap[t];if(i(e))return this._logger?.warn(`You have tried to unsubscribe with a key ${t} that is invalid`),!1;const n=this._eventSubscribers[e];return i(n)||delete n[t],this._subscribeIdMap[t]?(delete this._subscribeIdMap[t],this._logger?.info(`Subscription to ${e} events with subscription Id: ${t} has been cleared`),!0):(this._logger?.warn(`Subscription to ${e} events with subscription Id: ${t} could not be cleared as we do not have a register of that event type.`),!1)}async isAuthenticationRequired(){return i(this._authenticated)&&(this._authenticated=!1),!this._authenticated}async login(){return this._logger?.info("login requested"),this._authenticated?(this._logger?.info("User already authenticated"),this._authenticated):(this._authOptions?.autoLogin?(this._logger?.info("autoLogin enabled in auth provide module settings. Fake logged in"),this._authenticated=!0):this._authenticated=await this.getAuthenticationFromUser(),this._authenticated?(this._authenticatedKey&&localStorage.setItem(this._authenticatedKey,this._authenticated.toString()),this.checkForSessionExpiry(),await this.notifySubscribers("logged-in")):a(),this._authenticated)}async logout(){return new Promise(((t,e)=>{this.handleLogout(t).then((async()=>(this._logger?.info("Log out called"),!0))).catch((async t=>{this._logger?.error(`Error while trying to log out ${t}`)}))}))}async getUserInfo(){if(!i(this._authenticated)&&this._authenticated)return this._logger?.info("This example returns a user if it was provided to the example login"),this._currentUser;this._logger?.warn("Unable to retrieve user info unless the user is authenticated")}async getAuthenticationFromUser(){return new Promise(((t,e)=>{this._authOptions&&this.openLoginWindow(this._authOptions.loginUrl).then((async e=>{let s=e;if(this._authOptions){const e=new RegExp(this._authOptions.authenticatedUrl,"i");try{if(!i(s)){const i=await s.getInfo();if(e.test(i.url))return await s.close(!0),t(!0);await s.show(!0)}}catch(t){this._logger?.error(`Error while checking if login window automatically redirected. Error ${a=t,i(a)?"":a instanceof Error?a.message:o(a)?a:(r=a,null!=r&&"object"==typeof r&&!Array.isArray(r)&&"message"in a&&n(a.message)?a.message:JSON.stringify(a))}`),i(s)||await s.show(!0)}let h;return await s.addListener("closed",(async()=>{if(s)return window.clearInterval(h),h=void 0,this._logger?.info("Auth Window cancelled by user"),s=void 0,t(!1)})),h=window.setInterval((async()=>{if(i(s))return t(!1);{const i=await s.getInfo();if(e.test(i.url))return window.clearInterval(h),await s.removeAllListeners(),await s.close(!0),t(!0)}}),this._authOptions.checkLoginStatusInSeconds??1e3),!0}var r,a;return!1})).catch((t=>{this._logger?.error("Error while trying to authenticate the user",t)}))}))}checkForSessionExpiry(){const t=this._authOptions?.checkSessionValidityInSeconds;var e;null!=(e=t)&&"number"==typeof e&&t>-1&&i(this._sessionExpiryCheckId)&&(this._sessionExpiryCheckId=window.setTimeout((async()=>{this._authOptions&&(this._sessionExpiryCheckId=void 0,await this.checkAuth(this._authOptions.loginUrl)?(this._logger?.info("Session Still Active"),this.checkForSessionExpiry()):(this._logger?.info("Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check"),this._authenticated=!1,this._authenticatedKey&&localStorage.removeItem(this._authenticatedKey),a(),await this.notifySubscribers("session-expired")))}),1e3*t))}async notifySubscribers(t){const e=this._eventSubscribers[t];if(e){const i=Object.keys(e);i.reverse();for(const n of i)this._logger?.info(`Notifying subscriber with subscription Id: ${n} of event type: ${t}`),await e[n]()}}async handleLogout(t){if(i(this._authenticated)||!this._authenticated)return this._logger?.error("You have requested to log out but are not logged in"),void t(!1);this._logger?.info("Log out requested"),await this.notifySubscribers("before-logged-out"),this._authenticated=!1,this._authenticatedKey&&localStorage.removeItem(this._authenticatedKey),a();const e=this._authOptions?.logoutUrl;if(o(e))try{const i=await this.openLogoutWindow(e);setTimeout((async()=>{await i.close(),await this.notifySubscribers("logged-out"),t(!0)}),2e3)}catch(e){return this._logger?.error(`Error while launching logout window. ${e}`),t(!1)}else await this.notifySubscribers("logged-out"),t(!0)}async openLoginWindow(t){const e={currentUserKey:s,...this._authOptions?.customData};return fin.Window.create({name:"example-auth-log-in",alwaysOnTop:!0,maximizable:!1,minimizable:!1,autoShow:!1,defaultCentered:!0,defaultHeight:this._authOptions?.loginHeight??325,defaultWidth:this._authOptions?.loginWidth??400,includeInSnapshots:!1,resizable:!1,showTaskbarIcon:!1,saveWindowState:!1,url:t,customData:e})}async openLogoutWindow(t){return fin.Window.create({name:"example-auth-log-out",maximizable:!1,minimizable:!1,autoShow:!1,defaultCentered:!0,defaultHeight:this._authOptions?.loginHeight??325,defaultWidth:this._authOptions?.loginWidth??400,includeInSnapshots:!1,resizable:!1,showTaskbarIcon:!1,saveWindowState:!1,url:t})}async checkAuth(t){const e=await fin.Window.create({name:"example-auth-check-window",alwaysOnTop:!0,maximizable:!1,minimizable:!1,autoShow:!1,defaultHeight:this._authOptions?.loginHeight??325,defaultWidth:this._authOptions?.loginWidth??400,includeInSnapshots:!1,resizable:!1,showTaskbarIcon:!1,saveWindowState:!1,url:t});let n=!1;try{(await e.getInfo()).url===this._authOptions?.authenticatedUrl&&(n=!0)}catch(t){this._logger?.error("Error encountered while checking session",t)}finally{i(e)||await e.close(!0)}return n}},endpoint:new class{async initialize(t,e,i){this._logger=e("ExampleAuthEndpoint"),this._logger.info("Was passed the following options",t.data),this._roleMapping=t?.data?.roleMapping,this._definition=t}async requestResponse(t,e){if("module"!==t.type)return this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${t.id}`),null;if(i(this._logger)||this._logger.info("This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION."),i(t.options)||i(t.options.url))return this._logger?.warn(`The endpoint definition for ${t.id} does not have a url defined. Unable to action request/response.`),null;const{url:n,...o}=t.options,s=this.getRequestOptions(n,o,e);if("GET"!==s.options.method&&"POST"!==s.options.method)return this._logger?.warn(`${t.id} specifies a type: ${t.type} with a method ${s.options.method} that is not supported.`),null;const r=await fetch(s.url,s.options);if(r.ok){const t=await r.json();return Array.isArray(t)?this.applyCurrentUserToApps(t):Array.isArray(t.applications)?{applications:this.applyCurrentUserToApps(t.applications)}:this.applyCurrentUserToSettings(t)}return null}getRequestOptions(t,e,n){if("GET"===e.method){if(!i(n)){const e=Object.keys(n);if(e.length>0){const i=e.length;for(let o=0;o<i;o++)t=t.replace(`[${e[o]}]`,encodeURIComponent(n[e[o]]))}}}else"POST"!==e.method||i(n)||(e.body=JSON.stringify(n));return{url:t,options:e}}applyCurrentUserToApps(t){const e=r();if(i(e)||i(this._roleMapping)||i(this._roleMapping[e.role])||i(this._roleMapping[e.role].excludeAppsWithTag))return t;const n=this._roleMapping[e.role].excludeAppsWithTag,o=[];if(Array.isArray(t))for(const e of t){const t=e.tags??e.categories;Array.isArray(t)?this.includeInResponse(t,n)&&o.push(e):o.push(e)}return o}includeInResponse(t,e){let i=!0;if(!Array.isArray(e))return!0;for(const n of t){const t=n;if(e.includes(t)){i=!1;break}}return i}applyCurrentUserToSettings(t){const e=r();if(i(e)||i(this._roleMapping)||i(this._roleMapping[e.role])||i(this._definition))return t;const n=t?.endpointProvider?.modules;if(Array.isArray(n)){n.push({data:this._definition,enabled:this._definition.enabled,id:this._definition.id,description:this._definition.description,icon:this._definition.icon,info:this._definition.info,title:this._definition.title,url:this._definition.url});const e=t?.endpointProvider?.endpoints,s=t?.appProvider?.endpointIds;if(Array.isArray(e)&&Array.isArray(s)){let n=0;const r=[];for(const t of s){if(o(t))if(t.startsWith("http"))r.push({position:n,url:t});else{const n=e.find((e=>e.id===t&&"fetch"===e.type));i(n)||(n.type="module","module"===n.type&&(n.typeId=this._definition.id))}n++}if(r.length>0){i(t.endpointProvider)&&(t.endpointProvider={endpoints:[]});for(const t of r){const i=`auth-example-endpoint-${t.position}`;s[t.position]=i,e.push({id:i,type:"module",typeId:this._definition.id,options:{method:"GET",url:t.url}})}}}}const s=t.themeProvider;if(!i(s)&&Array.isArray(s.themes)&&s.themes.length>0&&!i(this._roleMapping[e.role].preferredScheme)){s.themes[0].default="dark"===this._roleMapping[e.role].preferredScheme?"dark":"light";const t=`${fin.me.identity.uuid}-SelectedColorScheme`;this._logger?.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart."),localStorage.removeItem(t)}const a=this._roleMapping[e.role].excludeMenuAction,h=this._roleMapping[e.role].excludeMenuModule,l=t.browserProvider;if(!i(l)&&Array.isArray(a)){if(Array.isArray(l.globalMenu)&&l.globalMenu.length>0)for(const t of l.globalMenu){const e=t?.data?.action?.id;e&&a.includes(e)&&(t.include=!1)}if(Array.isArray(l.pageMenu)&&l.pageMenu.length>0)for(const t of l.pageMenu){const e=t?.data?.action?.id;e&&a.includes(e)&&(t.include=!1)}if(Array.isArray(l.viewMenu)&&l.viewMenu.length>0)for(const t of l.viewMenu){const e=t?.data?.action?.id;e&&a.includes(e)&&(t.include=!1)}}const u=t.menusProvider;if(!i(u)&&Array.isArray(h)&&Array.isArray(u.modules))for(const t of u.modules){const e=t.id;h.includes(e)&&(t.enabled=!1)}return t}}};var l=e.k;export{l as entryPoints};
//# sourceMappingURL=example.bundle.js.map