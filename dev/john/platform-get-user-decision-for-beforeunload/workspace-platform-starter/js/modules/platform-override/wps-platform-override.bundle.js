var e,a={d:(e,t)=>{for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},o:(e,a)=>Object.prototype.hasOwnProperty.call(e,a)},t={};function o(e){return null==e}function r(e){return null!=e&&"object"==typeof e&&!Array.isArray(e)}function n(e){return void 0===e?void 0:JSON.parse(JSON.stringify(e))}function i(e,a,t=!0){if(r(e)&&r(a)){const o=Object.keys(e),r=Object.keys(a);if(o.length!==r.length)return!1;if(t&&JSON.stringify(o)!==JSON.stringify(r))return!1;for(const r of o)if(!i(e[r],a[r],t))return!1;return!0}if(Array.isArray(e)&&Array.isArray(a)){if(e.length!==a.length)return!1;for(let o=0;o<e.length;o++)if(!i(e[o],a[o],t))return!1}return JSON.stringify(e)===JSON.stringify(a)}function s(e,...a){if(!Array.isArray(a)||0===a.length)return e;const t=e,n=a.shift();let i;if(r(t)&&r(n))i=Object.keys(n);else if(Array.isArray(n)){if(!Array.isArray(e))return n;i=Object.keys(n).map((e=>Number.parseInt(e,10)))}if(i){const e=n;for(const a of i){const n=e[a];r(n)?(o(t[a])&&(t[a]={}),s(t[a],n)):Array.isArray(n)?(o(t[a])&&(t[a]=[]),s(t[a],n)):t[a]=n}}return s(e,...a)}function p(){return"randomUUID"in globalThis.crypto?globalThis.crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(function(e){const a=globalThis.crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^a).toString(16)}))}function l(e,a){if(o(e))return;const t=n(e);for(const e of t.snapshot.windows)d(e,a);y(t,"metadata");const r=[{propName:"interopSnapshotDetails",defaultValue:{contextGroupStates:{green:{},purple:{},orange:{},red:{},pink:{},yellow:{}}}}];for(const e of r)h(t.snapshot,e.propName,e.defaultValue);return t}function u(e,a){if(o(e))return;const t=n(e);return f(t,a),t}function d(e,a){const t=[{propName:"uuid",defaultValue:""},{propName:"url",defaultValue:""},{propName:"title",defaultValue:""},{propName:"alwaysOnTop",defaultValue:!1},{propName:"frame",defaultValue:!1},{propName:"icon",defaultValue:""},{propName:"x",defaultValue:-1},{propName:"y",defaultValue:-1},{propName:"width",defaultValue:-1},{propName:"height",defaultValue:-1},{propName:"center",defaultValue:!1},{propName:"defaultLeft",defaultValue:0},{propName:"defaultTop",defaultValue:0},{propName:"defaultWidth",defaultValue:-1},{propName:"defaultHeight",defaultValue:-1},{propName:"minWidth",defaultValue:200},{propName:"minHeight",defaultValue:200},{propName:"maxWidth",defaultValue:-1},{propName:"maxHeight",defaultValue:-1},{propName:"minimizable",defaultValue:!0},{propName:"maximizable",defaultValue:!0},{propName:"state",defaultValue:"normal"},{propName:"opacity",defaultValue:1},{propName:"transparent",defaultValue:!1},{propName:"resizeRegion",defaultValue:{bottomRightCorner:20,size:7,sides:{top:!0,right:!0,bottom:!0,left:!0}}},{propName:"accelerator",defaultValue:{devtools:!1,zoom:!1,reload:!1,reloadIgnoringCache:!1}},{propName:"alphaMask",defaultValue:{blue:-1,green:-1,red:-1}},{propName:"alwaysOnBottom",defaultValue:!1},{propName:"api",defaultValue:{iframe:{crossOriginInjection:!1,sameOriginInjection:!0,enableDeprecatedSharedName:!1}}},{propName:"applicationIcon",defaultValue:""},{propName:"aspectRatio",defaultValue:0},{propName:"autoShow",defaultValue:!1},{propName:"backgroundThrottling",defaultValue:!0},{propName:"contentNavigation",defaultValue:{allowlist:["<all_urls>"],denylist:[],whitelist:["<all_urls>"],blacklist:[]}},{propName:"contentRedirect",defaultValue:{allowlist:["<all_urls>"],denylist:[],whitelist:["<all_urls>"],blacklist:[]}},{propName:"contentCreation",defaultValue:{rules:[]}},{propName:"contextMenuSettings",defaultValue:{enable:!0,devtools:!0,reload:!1}},{propName:"cornerRounding",defaultValue:{height:0,width:0}},{propName:"closeOnLastViewRemoved",defaultValue:!1},{propName:"draggable",defaultValue:!1},{propName:"includeInSnapshots",defaultValue:!0},{propName:"resizable",defaultValue:!0},{propName:"resize",defaultValue:!0},{propName:"saveWindowState",defaultValue:!1},{propName:"shadow",defaultValue:!1},{propName:"showTaskbarIcon",defaultValue:!0},{propName:"showBackgroundImages",defaultValue:!1},{propName:"smallWindow",defaultValue:!1},{propName:"spellCheck",defaultValue:!1},{propName:"taskbarIcon",defaultValue:""},{propName:"waitForPageLoad",defaultValue:!1},{propName:"backgroundColor",defaultValue:""},{propName:"fdc3InteropApi",defaultValue:""},{propName:"enableBeforeUnload",defaultValue:!1},{propName:"viewVisibility",defaultValue:{showViewsOnSplitterDrag:{enabled:!0},showViewsOnWindowResize:{enabled:!0},showViewsOnTabDrag:{enabled:!0}}},{propName:"autoplayPolicy",defaultValue:"no-user-gesture-required"},{propName:"permissions",defaultValue:{}},{propName:"contextMenu",defaultValue:!0},{propName:"contextMenuOptions",defaultValue:{template:[],enabled:!1}},{propName:"ignoreSavedWindowState",defaultValue:!0},{propName:"preloadScripts",defaultValue:[]}];for(const o of t)h(e,o.propName,a?.window?.[o.propName]??o.defaultValue);if(y(e,"hotkeys"),y(e,"taskbarIconGroup"),y(e,"experimental"),e.workspacePlatform){y(e,"layout");const t=[{propName:"favicon",defaultValue:""},{propName:"title",defaultValue:""},{propName:"windowStateButtonOptions",defaultValue:void 0},{propName:"disableMultiplePages",defaultValue:!1},{propName:"isLocked",defaultValue:!1},{propName:"preventPageDragIn",defaultValue:!1},{propName:"preventPageDragOut",defaultValue:!1},{propName:"preventPageDrag",defaultValue:!1},{propName:"preventPageClose",defaultValue:!1},{propName:"windowType",defaultValue:"browser"}];for(const o of t)h(e.workspacePlatform,o.propName,a?.window?.workspacePlatform?.[o.propName]??o.defaultValue);y(e.workspacePlatform,"newTabUrl"),y(e.workspacePlatform,"newPageUrl"),y(e.workspacePlatform,"toolbarOptions"),y(e.workspacePlatform,"_internalDeferShowOptions");for(const t of e.workspacePlatform.pages)f(t,a)}}function f(e,a){const t=[{propName:"isActive",defaultValue:!1},{propName:"isReadOnly",defaultValue:!1},{propName:"panels",defaultValue:[]}];for(const o of t)h(e,o.propName,a?.page?.[o.propName]??o.defaultValue);y(e,"hasUnsavedChanges"),c(e.layout,a)}function c(e,a){const t=[{propName:"dimensions",defaultValue:{borderWidth:3,borderGrabWidth:15,minItemHeight:10,minItemWidth:10,headerHeight:30,dragProxyWidth:300,dragProxyHeight:200}},{propName:"labels",defaultValue:{close:"close",maximise:"maximise",minimise:"minimise",popout:"open in new window",popin:"pop in",tabDropdown:"additional tabs"}},{propName:"isClosable",defaultValue:!0},{propName:"reorderEnabled",defaultValue:!0},{propName:"title",defaultValue:""},{propName:"openPopouts",defaultValue:[]},{propName:"maximisedItemId",defaultValue:null}];for(const a of t)h(e,a.propName,a.defaultValue);if(y(e,"layoutDetails"),e.settings){const a=[{propName:"hasHeaders",defaultValue:!0},{propName:"reorderEnabled",defaultValue:!0},{propName:"selectionEnabled",defaultValue:!1},{propName:"popoutWholeStack",defaultValue:!1},{propName:"blockedPopoutsThrowError",defaultValue:!0},{propName:"closePopoutsOnUnload",defaultValue:!0},{propName:"showPopoutIcon",defaultValue:!1},{propName:"showMaximiseIcon",defaultValue:!1},{propName:"showCloseIcon",defaultValue:!1},{propName:"responsiveMode",defaultValue:"onload"},{propName:"tabOverlapAllowance",defaultValue:0},{propName:"reorderOnTabMenuClick",defaultValue:!0},{propName:"tabControlOffset",defaultValue:10},{propName:"preventDragOut",defaultValue:!1},{propName:"preventDragIn",defaultValue:!1},{propName:"constrainDragToContainer",defaultValue:!0},{propName:"constrainDragToHeaders",defaultValue:!1}];for(const t of a)h(e.settings,t.propName,t.defaultValue);y(e.settings,"newTabButton"),0===Object.keys(e.settings).length&&delete e.settings}if(e.content)for(const t of e.content)g(t,a)}function g(e,a){const t=[{propName:"title",defaultValue:""},{propName:"width",defaultValue:0},{propName:"height",defaultValue:0},{propName:"componentName",defaultValue:""},{propName:"isClosable",defaultValue:!0},{propName:"reorderEnabled",defaultValue:!0},{propName:"activeItemIndex",defaultValue:0}];for(const a of t)h(e,a.propName,a.defaultValue);if("componentState"in e){const t=e.componentState;if(t){const e=[{propName:"name",defaultValue:""},{propName:"url",defaultValue:""},{propName:"uuid",defaultValue:""},{propName:"componentName",defaultValue:"view"},{propName:"initialUrl",defaultValue:""},{propName:"processAffinity",defaultValue:fin.me.identity.uuid},{propName:"isClosable",defaultValue:!0},{propName:"bounds",defaultValue:{x:1,y:1,width:0,height:0}},{propName:"detachOnClose",defaultValue:!0},{propName:"isClosable",defaultValue:!0},{propName:"preventDragOut",defaultValue:!1},{propName:"accelerator",defaultValue:{zoom:!0}},{propName:"zoomLevel",defaultValue:0},{propName:"permissions",defaultValue:{}},{propName:"contextMenu",defaultValue:!0},{propName:"contextMenuOptions",defaultValue:{enabled:!0,template:["spellCheck","separator","print","separator","cut","copy","paste","undo","redo","selectAll","inspect","reload"]}},{propName:"preloadScripts",defaultValue:[]},{propName:"enableBeforeUnload",defaultValue:!1},{propName:"backgroundThrottling",defaultValue:!0},{propName:"autoResize",defaultValue:{width:!1,height:!1}},{propName:"zoomLevel",defaultValue:0},{propName:"fdc3InteropApi",defaultValue:""},{propName:"interop",defaultValue:{}},{propName:"customData",defaultValue:{}},{propName:"contentNavigation",defaultValue:{}}];for(const o of e)h(t,o.propName,a?.view?.[o.propName]??o.defaultValue);y(t,"hotkeys")}}if(e.content)for(const t of e.content)g(t,a)}function m(e,a){const t=s(e,a?.window);if(!o(e?.workspacePlatform?.pages))for(const t of e.workspacePlatform.pages)w(t,a);return t}function w(e,a){c(e.layout,a)}function h(e,a,t){a in e&&i(e[a],t,!1)&&delete e[a]}function y(e,a){a in e&&delete e[a]}function k(e){return JSON.parse(JSON.stringify(e,((e,a)=>{return t=a?.name,function(e){return null!=e&&"string"==typeof e}(t)&&t.trim().length>0&&!o(a.url)&&(/\/[\d,a-z-]{36}$/.test(a.name)&&(a.name=a.name.replace(/([\d,a-z-]{36}$)/,p())),/-[\d,a-z-]{36}$/.test(a.name)&&(a.name=a.name.replace(/(-[\d,a-z-]{36}$)/,p()))),a;var t})))}async function N(e){const a=await fin.Application.getCurrent(),t=await a.getManifest();return{window:s({},t.platform?.defaultWindowOptions,e?.defaultWindowOptions),page:s({},e?.defaultPageOptions),view:s({},t.platform?.defaultViewOptions,e?.defaultViewOptions)}}async function V(e,a,t=!1){let r;if(t){const t=await e.Storage.getPage(a);if(!o(t?.customData?.windowBounds))return{bounds:t?.customData?.windowBounds,state:t?.customData?.windowState}}const n=await e.Browser.getAllAttachedPages();let i;for(const e of n)if(e.pageId===a){i=e.parentIdentity;break}if(o(i)){const t=await e.Storage.getPage(a);if(!o(t))return{bounds:t?.customData?.windowBounds,state:t?.customData?.windowState};i=await e.Browser.getLastFocusedWindow()}if(!o(i)){const a=e.Browser.wrapSync(i);r={bounds:await a.openfinWindow.getBounds(),state:await a.openfinWindow.getState()}}return r}a.d(t,{k:()=>R}),function(e){e.Light="light",e.Dark="dark"}(e||(e={}));const v="workspace-list",b="workspace-get",S="workspace-set",P="workspace-remove",C="page-list",O="page-get",I="page-remove",$="page-set";let D,M,A,W,x,E;const R={platformOverride:new class{async initialize(e,a,t){this._definition=e;const o=e.data?.loggerName??"WpsPlatformOverride";this._logger=a(o),this._helpers=t,this._logger.info("Initializing")}async closedown(){this._logger?.info("Closedown")}async getConstructorOverride(a){if(!this._helpers||!this._logger)throw new Error("Module not initialized");return async function(a,t,r){let i,s;if(M=a?.platformProviderOptions?.disableStorageMapping??!1,A=a?.browserProviderOptions?.menuOptions?.styles?.globalMenu,W=a?.browserProviderOptions?.menuOptions?.styles?.pageMenu,x=a?.browserProviderOptions?.menuOptions?.styles?.viewMenu,D=a?.browserProviderOptions?.unsavedPagePromptStrategy??"default",E=!1,r?.getEndpointClient&&(i=await r.getEndpointClient()),r.getAnalyticsClient&&(s=await r.getAnalyticsClient()),!(i&&r.getThemeClient&&r.getVersionInfo&&r.getPlatform&&r.getMenuClient&&r.fireLifecycleEvent&&r.getSnapClient&&r.getConnectionClient))throw new Error("Platform Override Constructor is missing required helpers. The platform override will not function correctly so this error is to flag the issue.");const d=await r.getVersionInfo(),f=r.getPlatform,c=await r.getMenuClient(),g=r.fireLifecycleEvent,h=r.getUtilClient(),y=await r.getSnapClient(),R=await h.position.getWindowPositionOptions(a?.browserProviderOptions),U=await r.getThemeClient(),T=await r.getConnectionClient(),B=await r.getButtonClient(),q=await r.getDockClient(),z=async e=>{const a=f();await g(a,"language-changed",{locale:e});const t=await fin.me.interop.joinSessionContextGroup("platform/events");await t.setContext({type:"platform.language",locale:e})};return a=>class extends a{async launchIntoPlatform(e){t.debug("launchIntoPlatform called. Please use the initOptionsProvider for loading content into the platform. If triggered by clicking on the application icon then autoShow options from the bootstrapper are applied.",e)}async getSnapshot(e,a){let t=await super.getSnapshot(e,a);return y.isEnabled()&&(t=await y.decorateSnapshot(t)),o(T?.decorateSnapshot)?t:T.decorateSnapshot(t)}async applySnapshot(e,a){let t;y.isEnabled()&&(t=await y.prepareToApplyDecoratedSnapshot()),await super.applySnapshot(e,a),y.isEnabled()&&await y.applyDecoratedSnapshot(e.snapshot,t??[]),o(T?.applyClientSnapshot)||await T.applyClientSnapshot(e.snapshot)}async getSavedWorkspaces(e){if(o(e)||t.info(`Saved workspaces requested with query: ${e}`),t.info(`Checking for custom workspace storage with endpoint id: ${v}`),i.hasEndpoint(v)){t.info("Requesting saved workspaces from custom storage");const a=await i.requestResponse(v,{platform:fin.me.identity.uuid,query:e});return!o(a)&&Object.keys(a).length>0?(t.info("Returning saved workspaces from custom storage"),Object.values(a).map((e=>e.payload))):(t.warn("No response getting saved workspaces from custom storage"),[])}t.info("Requesting saved workspaces from default storage");const a=await super.getSavedWorkspaces(e);return t.info("Returning saved workspaces from default storage"),a}async getSavedWorkspace(e){if(t.info(`Checking for custom workspace storage with endpoint id: ${b}`),i.hasEndpoint(b)){t.info(`Requesting saved workspace from custom storage for workspace id: ${e}`);const a=await i.requestResponse(b,{platform:fin.me.identity.uuid,id:e});if(!o(a?.payload)){t.info(`Returning saved workspace from custom storage for workspace id: ${e}`);const r=await N();return function(e,a){if(o(e))return;const t=n(e);if(Array.isArray(t.snapshot.windows)){const e=[];for(const o of t.snapshot.windows)e.push(m(o,a));t.snapshot.windows=e}return t}(a.payload,r)}return void t.warn(`No response getting saved workspace from custom storage for workspace id: ${e}`)}t.info(`Requesting saved workspace from default storage for workspace id: ${e}`);const a=await super.getSavedWorkspace(e);return t.info(`Returning saved workspace from default storage for workspace id: ${e}`),a}async createSavedWorkspace(e){if(t.info(`Checking for custom workspace storage with endpoint id: ${S}`),i.hasEndpoint(S)){if(!await i.action(S,{platform:fin.me.identity.uuid,id:e.workspace.workspaceId,metaData:{version:{workspacePlatformClient:d.workspacePlatformClient,platformClient:d.platformClient}},payload:M?e.workspace:l(e.workspace,await N())})){const a=`Unable to save workspace with id: ${e.workspace.workspaceId} to custom storage`;throw t.error(a),new Error(a)}t.info(`Saved workspace with id: ${e.workspace.workspaceId} to custom storage`)}else t.info(`Saving workspace to default storage for workspace id: ${e.workspace.workspaceId}`),await super.createSavedWorkspace(e),t.info(`Saved workspace to default storage for workspace id: ${e.workspace.workspaceId}`);const a=f();E=!0,await g(a,"workspace-changed",{action:"create",id:e.workspace.workspaceId,workspace:e.workspace})}async updateSavedWorkspace(e){if(t.info(`Checking for custom workspace storage with endpoint id: ${S}`),i.hasEndpoint(S)){if(!await i.action(S,{platform:fin.me.identity.uuid,id:e.workspace.workspaceId,metaData:{version:{workspacePlatformClient:d.workspacePlatformClient,platformClient:d.platformClient}},payload:M?e.workspace:l(e.workspace,await N())})){const a=`Unable to update workspace with id: ${e.workspace.workspaceId} against custom storage`;throw t.error(a),new Error(a)}t.info(`Updated workspace with id: ${e.workspace.workspaceId} against custom storage`)}else t.info(`Saving updated workspace to default storage for workspace id: ${e.workspace.workspaceId}.`),await super.updateSavedWorkspace(e),t.info(`Saved updated workspace to default storage for workspace id: ${e.workspace.workspaceId}.`);const a=f();E=!0,await g(a,"workspace-changed",{action:"update",id:e.workspace.workspaceId,workspace:e.workspace})}async deleteSavedWorkspace(e){if(t.info(`Checking for custom workspace storage with endpoint id: ${P}`),i.hasEndpoint(P)){if(!await i.action(P,{platform:fin.me.identity.uuid,id:e})){const a=`Unable to remove workspace with id: ${e} from custom storage`;throw t.error(a),new Error(a)}t.info(`Removed workspace with id: ${e} from custom storage`)}else t.info(`Deleting workspace from default storage for workspace id: ${e}`),await super.deleteSavedWorkspace(e),t.info(`Deleted workspace from default storage for workspace id: ${e}`);const a=f();await g(a,"workspace-changed",{action:"delete",id:e})}async applyWorkspace(e){if(!e)return!1;const a=f();if(!E){let t;const r=await a.getSnapshot();Array.isArray(r.windows)&&0===r.windows.length&&(t=!0,o(e.options)?e.options={skipPrompt:t}:!o(e.options)&&o(e.options.skipPrompt)&&(e.options.skipPrompt=t))}const t=await super.applyWorkspace({...e,options:{...e.options,applySnapshotOptions:{...e.options?.applySnapshotOptions,closeExistingWindows:!1,closeSnapshotWindows:!0}}});return t&&!E&&(E=!0),await g(a,"workspace-changed",{action:"apply",id:e.workspaceId,workspace:e}),t}async getSavedPages(e){if(o(e)||t.info(`Saved pages requested with query: ${e}`),t.info(`Checking for custom page storage with endpoint id: ${C}`),i.hasEndpoint(C)){t.info("Getting saved pages from custom storage");const a=await i.requestResponse(C,{platform:fin.me.identity.uuid,query:e});return!o(a)&&Object.keys(a).length>0?(t.info("Returning saved pages from custom storage"),Object.values(a).map((e=>e.payload))):(t.warn("No response getting saved pages from custom storage"),[])}t.info("Getting saved pages from default storage");const a=await super.getSavedPages(e);return t.info("Returning saved pages from default storage"),a}async getSavedPage(e){let a;if(t.info(`Checking for custom page storage with endpoint id: ${O}`),i.hasEndpoint(O)){t.info(`Getting saved page from custom storage for page id: ${e}`);const r=await i.requestResponse(O,{platform:fin.me.identity.uuid,id:e});if(o(r?.payload))return void t.warn(`No response getting saved page from custom storage for page id: ${e}`);{t.info(`Returning saved page from custom storage for page id: ${e}`);const i=await N();a=function(e,a){if(o(e))return;const t=n(e);return w(t,a),t}(r.payload,i)}}else{if(t.info(`Getting saved page with id ${e} from default storage`),a=await super.getSavedPage(e),o(a))return void t.warn(`No response getting saved page from default storage for page id: ${e}`);t.info(`Returning saved page with id ${e} from default storage`)}return a.layout=k(a?.layout),Array.isArray(a.panels)&&a.panels.length>0&&(a.panels=k(a.panels)),a}async createSavedPage(e){const a=f(),r=await V(a,e.page.pageId);if(o(r)||(o(e.page.customData)&&(e.page.customData={}),o(e.page?.customData?.windowBounds)&&(e.page.customData.windowBounds=r.bounds),o(e.page?.customData?.windowState)&&(e.page.customData.windowState=r.state)),t.info(`Checking for custom page storage with endpoint id: ${$}`),i.hasEndpoint($)){if(t.info(`Saving page with id: ${e.page.pageId} to custom storage`),!await i.action($,{platform:fin.me.identity.uuid,id:e.page.pageId,metaData:{version:{workspacePlatformClient:d.workspacePlatformClient,platformClient:d.platformClient}},payload:M?e.page:u(e.page,await N())})){const a=`Unable to save page with id: ${e.page.pageId} to custom storage`;throw t.error(a),new Error(a)}t.info(`Saved page with id: ${e.page.pageId} to custom storage`)}else t.info(`creating saved page and saving to default storage. PageId: ${e.page.pageId}`),await super.createSavedPage(e),t.info(`Saved page with id: ${e.page.pageId} to default storage`);await g(a,"page-changed",{action:"create",id:e.page.pageId,page:e.page})}async updateSavedPage(e){const a=f(),r=await V(a,e.page.pageId);if(o(r)||(o(e.page.customData)&&(e.page.customData={}),e.page.customData.windowBounds=r.bounds,e.page.customData.windowState=r.state),t.info(`Checking for custom page storage with endpoint id: ${$}`),i.hasEndpoint($)){if(t.info(`Updating saved page and saving to custom storage with page id: ${e.page.pageId}`),!await i.action($,{platform:fin.me.identity.uuid,id:e.page.pageId,metaData:{version:{workspacePlatformClient:d.workspacePlatformClient,platformClient:d.platformClient}},payload:M?e.page:u(e.page,await N())})){const a=`Unable to save page with id: ${e.page.pageId} against custom storage`;throw t.error(a),new Error(a)}t.info(`Updated page with id: ${e.page.pageId} against custom storage`)}else t.info(`updating saved page and saving to default storage with page id: ${e.page.pageId}`),await super.updateSavedPage(e),t.info(`Updated page with id: ${e.page.pageId} against default storage`);await g(a,"page-changed",{action:"update",id:e.page.pageId,page:e.page})}async deleteSavedPage(e){if(t.info(`Checking for custom page storage with endpoint id: ${I}`),i.hasEndpoint(I)){if(t.info(`deleting saved page from custom storage. PageId: ${e}`),!await i.action(I,{platform:fin.me.identity.uuid,id:e})){const a=`Unable to remove page with id: ${e} from custom storage`;throw t.error(a),new Error(a)}t.info(`Removed page with id: ${e} from custom storage`)}else t.info(`deleting saved page from default storage. PageId: ${e}`),await super.deleteSavedPage(e),t.info(`Removed page with id: ${e} from custom storage`);const a=f();await g(a,"page-changed",{action:"delete",id:e})}async openGlobalContextMenu(e,a){const t=await c.getGlobalMenu(e.template,{windowIdentity:e.identity}),o=A??c.getPopupMenuStyle();if("platform"===o)return super.openGlobalContextMenu({...e,template:t},a);const r=await c.showPopupMenu({x:e.x,y:e.y},e.identity,"",t,{popupMenuStyle:o});r&&e.callback(r,e)}async openViewTabContextMenu(e,a){const t=await c.getViewMenu(e.template,{windowIdentity:e.identity,views:e.selectedViews}),o=x??c.getPopupMenuStyle();if("platform"===o)return super.openViewTabContextMenu({...e,template:t},a);const r=await c.showPopupMenu({x:e.x,y:e.y},e.identity,"",t,{popupMenuStyle:o});r&&e.callback(r,e)}async openPageTabContextMenu(e,a){const t=await c.getPageMenu(e.template,{windowIdentity:e.identity,pageId:e.pageId}),o=W??c.getPopupMenuStyle();if("platform"===o)return super.openPageTabContextMenu({...e,template:t},a);const r=await c.showPopupMenu({x:e.x,y:e.y},e.identity,"",t,{popupMenuStyle:o});r&&e.callback(r,e)}async quit(e,a){const t=f();return await g(t,"before-quit"),super.quit(e,a)}async createWindow(e,a){if(!1===e.autoShow)return super.createWindow(e,a);if(!o(R)&&!R?.disableWindowPositioningStrategy){const a=!o(e?.defaultLeft),r=!o(e?.defaultTop);if(!a||!r){const n=await h.position.getWindowPositionUsingStrategy(R);a||o(n?.left)||(e.defaultLeft=n.left,t.debug(`Updating default left to ${n.left} using window positioning strategy`)),r||o(n?.top)||(e.defaultTop=n.top,t.debug(`Updating default top to ${n.top} using window positioning strategy`))}}const r=Array.isArray(e?.workspacePlatform?.toolbarOptions?.buttons);if(!r){e.workspacePlatform=e.workspacePlatform??{},e.workspacePlatform.toolbarOptions=e.workspacePlatform.toolbarOptions??{};const a=await B.getToolbarButtons(e);o(a)||(e.workspacePlatform.toolbarOptions.buttons=a)}const n=await super.createWindow(e,a);try{t.info("After Create Window",await n.getOptions())}catch{}if(r)try{const e=f().Browser.wrapSync(n.identity);await B.updateBrowserWindowButtonsColorScheme(e)}catch{}return n}async setSelectedScheme(a){if(o(U.setCurrentColorSchemeMode))t.warn("setCurrentColorSchemeMode is not implemented in the theme client."),await super.setSelectedScheme(a);else{let t;switch(a){case"dark":t=e.Dark;break;case"light":t=e.Light;break;default:t=void 0}await Promise.all([U.setCurrentColorSchemeMode(t),super.setSelectedScheme(a)])}}async setLanguage(e){t.info(`Setting language to: ${e}`),await Promise.all([z(e),super.setLanguage(e)])}async handleAnalytics(e){if(s){const a=[],t=new Date;for(const o of e)a.push({timestamp:t,...o});await s.handleAnalytics(a)}return super.handleAnalytics(e)}async getDockProviderConfig(e){return q.loadConfig(e,(async e=>super.getDockProviderConfig(e)))}async saveDockProviderConfig(e){return q.saveConfig(e,(async e=>super.saveDockProviderConfig(e)))}async handleSaveModalOnPageClose(e){if(o(D)||"default"===D)return super.handleSaveModalOnPageClose(e);if("never"===D)return{shouldShowModal:!1};if("skip-untitled"===D){const a=f(),t=(await a.Browser.getUniquePageTitle()).split(" ")[0];if(e.page.title.startsWith(t))return{shouldShowModal:!1}}return t.warn("Unsaved page prompt strategy is not valid. Using default."),super.handleSaveModalOnPageClose(e)}async copyPage(e){const a=o(e?.page?.panels)?e?.page?.panels:k(e.page.panels),t=k(e.page.layout);return{...e.page,panels:a,layout:t,pageId:p(),isReadOnly:!1}}async handlePageChanges(e){return super.handlePageChanges(e)}async setActivePage(e){const a=f();await Promise.all([super.setActivePage(e),g(a,"page-changed",{action:"focus",id:e.pageId})])}}}(a,this._logger,this._helpers)}}};var U=t.k;export{U as entryPoints};
//# sourceMappingURL=wps-platform-override.bundle.js.map