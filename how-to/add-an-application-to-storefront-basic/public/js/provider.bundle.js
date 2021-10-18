/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@openfin/workspace/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@openfin/workspace/index.js ***!
  \**************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{Storefront:()=>$,launchApp:()=>T});var r,t,n={};e.r(n),e.d(n,{hide:()=>C,register:()=>b,show:()=>F}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(t||(t={}));const a="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||null===(r=process.env)||void 0===r||r.JEST_WORKER_ID,"undefined"!=typeof window),d=(i?window.origin:t.Local,a&&fin.me.uuid,a&&fin.me.name,"undefined"!=typeof ENV?ENV:t.Local,t.Local,t.Dev,t.Staging,t.Prod,!0),s=("undefined"!=typeof WORKSPACE_API_URL&&WORKSPACE_API_URL,"undefined"!=typeof WORKSPACE_APPS_URL&&WORKSPACE_APPS_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_FOOTER_URL&&WORKSPACE_STOREFRONT_FOOTER_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_LANDING_PAGE_URL&&WORKSPACE_STOREFRONT_LANDING_PAGE_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_NAVIGATION_URL&&WORKSPACE_STOREFRONT_NAVIGATION_URL,"#7795f7"),c={trace:!0,debug:"undefined"!=typeof LOG_DEBUG&&LOG_DEBUG,info:!1,warn:!0,error:!0,fatal:!0};const p=function(e,o){const r=`${e} : `,t=`color:${s}`;return{trace:c.trace?(e,...o)=>{console.trace(`%c${r}${e}`,t,...o)}:(e,...o)=>{},debug:c.debug?(e,...o)=>{console.info(`%c${r}${e}`,"color:#86db94",...o)}:(e,...o)=>{},info:c.info?(e,...o)=>{console.debug(`%c${r}${e}`,"color:#ffffff",...o)}:(e,...o)=>{},warn:c.warn?(e,...o)=>{console.warn(`%c${r}${e}`,"color:#edad68",...o)}:(e,...o)=>{},error:c.error?(e,o,...t)=>{console.error(`%c${r}${e}`,"color:#f55d67",...t,o)}:(e,o,...r)=>{},fatal:c.fatal?(e,o,...t)=>{console.error(`%c${r}${e}`,"color:#f70723",...t,o)}:(e,o,...r)=>{}}}("utils.channels"),g=i&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));var f,w,u,l,h;!function(e){e.Workspace="openfin-browser"}(f||(f={})),function(e){e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(w||(w={})),function(e){e.FinProtocol="fin-protocol"}(u||(u={})),f.Workspace,f.Workspace,function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window"}(l||(l={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached"}(h||(h={})),l.Home,f.Workspace,l.Dock,f.Workspace,l.Storefront,f.Workspace;const v={name:f.Workspace,uuid:f.Workspace},S=e=>function(e){if(!a)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}(e).getOptions().then((()=>!0)).catch((()=>!1));var P,R;(R=P||(P={})).LaunchApp="launch-app",R.CreateWorkspace="create-workspace",R.UpdateWorkspace="update-workspace",R.DeleteWorkspace="delete-workspace",R.LaunchWorkspace="launch-workspace",R.ShareWorkspace="share-workspace",R.GetWorkspace="get-workspace",R.GetWorkspaceList="get-workspace-list",R.GetActiveWorkspace="get-active-workspace",R.GetPage="get-page",R.CreatePage="create-page",R.UpdatePage="update-page",R.RenamePage="rename-page",R.DeletePage="delete-page",R.SharePage="share-page",R.LaunchPage="launch-page",R.AttachPagesToWindow="attach-pages-to-window",R.DetachPagesFromWindow="detach-pages-from-window",R.ReorderPagesForWindow="reorder-pages-for-window",R.SetActivePageForWindow="set-active-page-for-window",R.GetSavedPageList="get-saved-page-list",R.GetAttachedPageList="get-running-page-list",R.GetAllPageList="get-all-page-list",R.GetActivePageIdForWindow="get-active-page-id-for-window",R.GetPagesForWindow="get-pages-for-window",R.GetSavedPageMetadata="get-saved-page-metadata",R.RegisterStorefrontProvider="register-storefront-provider",R.GetStorefrontProviders="get-storefront-providers",R.HideStorefront="hide-storefront",R.GetStorefrontProviderApps="get-storefront-provider-apps",R.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",R.GetStorefrontProviderFooter="get-storefront-provider-footer",R.GetStorefrontProviderNavigation="get-storefront-provider-navigation",R.LaunchStorefrontProviderApp="launch-storefront-provider-app",R.ShowStorefront="show-storefront",R.CreateStorefrontWindow="create-storefront-window",R.CreateBrowserWindow="create-browser-window";const y=function(e){let o;return()=>{if(!a)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return o||(p.debug(`connecting to channel provider ${e}`),o=(async()=>{await g;const r=await fin.InterApplicationBus.Channel.connect(e);return r.onDisconnection((async()=>{p.warn(`disconnected from channel provider ${e}`),o=void 0})),r})().then((o=>(p.debug(`connected to channel provider ${e}`),o))).catch((o=>{p.error(`failed to connect to channel provider ${e}`,o)}))),o}}("__of_workspace_protocol__"),A=async()=>{if(!await S(v))return fin.System.openUrlWithBrowser((()=>{const e=new URL("fins://system-apps/workspace");return e.searchParams.append("isLaunchedViaLib",d.toString()),e.toString()})())},W=async()=>(await A(),y());var O,_,L;let m;!function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(O||(O={})),(L=_||(_={})).LandingPage="landingPage",L.AppGrid="appGrid";const E=new Map;let G=!1;const k=e=>{if(!E.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return E.get(e)},b=e=>(m=(async e=>{const o=await W();if(E.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return E.set(e.id,e),(e=>{G||(G=!0,e.register(P.GetStorefrontProviderApps,(e=>k(e).getApps())),e.register(P.GetStorefrontProviderFooter,(e=>k(e).getFooter())),e.register(P.GetStorefrontProviderLandingPage,(e=>k(e).getLandingPage())),e.register(P.GetStorefrontProviderNavigation,(e=>k(e).getNavigation())),e.register(P.LaunchStorefrontProviderApp,(({id:e,app:o})=>k(e).launchApp(o))))})(o),o.dispatch(P.RegisterStorefrontProvider,e)})(e),m),C=async()=>{await m,await A(),await(async()=>(await y()).dispatch(P.HideStorefront,void 0))()},F=async()=>{await m,await A(),await(async()=>(await y()).dispatch(P.ShowStorefront,null))()},T=async e=>(await W()).dispatch(P.LaunchApp,e),$=n;module.exports=o})();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./client/src/apps.ts":
/*!****************************!*\
  !*** ./client/src/apps.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getApps": () => (/* binding */ getApps),
/* harmony export */   "experoApp": () => (/* binding */ experoApp),
/* harmony export */   "notificationStudio": () => (/* binding */ notificationStudio),
/* harmony export */   "processManager": () => (/* binding */ processManager),
/* harmony export */   "developerContent": () => (/* binding */ developerContent)
/* harmony export */ });
async function getApps() {
    return [experoApp, notificationStudio, processManager, developerContent];
}
const experoApp = {
    appId: "expero-company-news",
    title: "Gateway - Company News",
    manifest: "https://openfin-iex.experolabs.com/openfin/manifests/company-news.json",
    manifestType: "view",
    icons: [
        {
            src: "https://openfin-iex.experolabs.com/favicon.ico"
        }
    ],
    contactEmail: "contact@example.com",
    supportEmail: "support@example.com",
    publisher: "Expero",
    intents: [],
    images: [{
            src: "http://localhost:8080/images/previews/expero-news-view.png"
        }],
    tags: ["expero", "all", "view", "interop"]
};
const notificationStudio = {
    appId: "notifications-generator",
    title: "OpenFin Notifications Studio",
    manifestType: "manifest",
    description: "Notifications Studio: This is OpenFin's tool for demonstrating the power of our Notification Center. Use it to create local notifications or use some of the examples shown in our Catalog. Experiment with our features and see the power that OpenFin Notification Center can bring to your applications.",
    manifest: "https://cdn.openfin.co/studio/notification/app.json",
    icons: [
        { src: "https://cdn.openfin.co/demos/notifications/generator/images/icon-blue.png" }
    ],
    contactEmail: "contact@example.com",
    supportEmail: "support@example.com",
    publisher: "OpenFin",
    intents: [],
    images: [{
            src: "http://localhost:8080/images/previews/openfin-notification-studio.png"
        }],
    tags: ["hero", "all", "manifest", "dev-tools", "openfin"]
};
const processManager = {
    appId: "openfin-process-manager",
    title: "OpenFin Process Manager",
    manifestType: "manifest",
    description: "Process Manager: This is OpenFin's tool for helping developers build OpenFin Applications. It lets you see the OpenFin applications that are running, the performance of the applications (memory and cpu) and easy access to the dev tools for the Windows of your application.",
    manifest: "https://cdn.openfin.co/process-manager/app.json",
    icons: [
        { src: "https://cdn.openfin.co/process-manager/img/proc-mgr-icon.png" }
    ],
    contactEmail: "contact@example.com",
    supportEmail: "support@example.com",
    publisher: "OpenFin",
    intents: [],
    images: [{
            src: "http://localhost:8080/images/previews/openfin-process-manager.png"
        }],
    tags: ["hero", "all", "manifest", "dev-tools", "openfin"]
};
const developerContent = {
    appId: "openfin-developer-page",
    title: "OpenFin Developer Docs",
    manifestType: "snapshot",
    description: "Shows a collection of OpenFin developer pages and provides an example of how you can present a pre-built page as a launch target in OpenFin Home. This entry has a manifest type of 'snapshot'.",
    manifest: "http://localhost:8080/snapshot.json",
    icons: [
        { src: "http://localhost:8080/images/icon-blue.png" }
    ],
    contactEmail: "contact@example.com",
    supportEmail: "support@example.com",
    publisher: "OpenFin",
    intents: [],
    images: [{
            src: "http://localhost:8080/images/previews/openfin-page-docs.png"
        }],
    tags: ["all", "page", "dev-content", "openfin"]
};


/***/ }),

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "hide": () => (/* binding */ hide)
/* harmony export */ });
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/workspace */ "./node_modules/@openfin/workspace/index.js");
/* harmony import */ var _openfin_workspace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_openfin_workspace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apps */ "./client/src/apps.ts");


let storeCount = 0;
async function init() {
    console.log("Initialising the storefront provider.");
    let provider = await getStoreProvider();
    try {
        await _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.Storefront.register(provider);
        console.log("Storefront provider initialised.");
    }
    catch (err) {
        console.error("An error was encountered while trying to register the content store provider", err);
    }
}
async function show() {
    console.log("Showing the store.");
    return _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.Storefront.show();
}
async function hide() {
    console.log("Hiding the store.");
    return _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.Storefront.show();
}
async function getStoreProvider() {
    console.log("Getting the store provider.");
    storeCount++;
    return {
        id: "my-basic-store-" + storeCount,
        title: "Basic Store " + storeCount,
        getNavigation: getNavigation,
        getLandingPage: getLandingPage,
        getFooter: getFooter,
        getApps: _apps__WEBPACK_IMPORTED_MODULE_1__.getApps,
        launchApp: _openfin_workspace__WEBPACK_IMPORTED_MODULE_0__.launchApp,
    };
}
async function getNavigation() {
    console.log("Showing the store navigation.");
    let navigationSections = [
        {
            id: "apps",
            title: "Apps",
            items: [
                {
                    id: "view",
                    title: "Views",
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.experoApp],
                    },
                },
                {
                    id: "page",
                    title: "Pages",
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.developerContent],
                    },
                },
                {
                    id: "manifest",
                    title: "Web Apps",
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.notificationStudio, _apps__WEBPACK_IMPORTED_MODULE_1__.processManager],
                    },
                },
            ],
        },
    ];
    return navigationSections;
}
async function getLandingPage() {
    console.log("Getting the store landing page.");
    let landingPage = {
        hero: {
            title: "Custom Hero Title",
            description: "This is a demonstration of the hero section that you can configure for your store.",
            cta: {
                id: "hero-1",
                title: "Hero Apps!",
                templateId: "appGrid",
                templateData: {
                    apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.notificationStudio, _apps__WEBPACK_IMPORTED_MODULE_1__.processManager],
                },
            },
            image: {
                src: "http://localhost:8080/images/superhero-unsplash.jpg",
            },
        },
        topRow: {
            title: "Custom Top Row Content",
            items: [
                {
                    id: "top-row-item-1",
                    title: "Expero",
                    description: "A collection of example views from Expero showing the power of interop and context sharing.",
                    image: {
                        src: "http://localhost:8080/images/coding-1-unsplash.jpg",
                    },
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.experoApp],
                    },
                },
                {
                    id: "top-row-item-2",
                    title: "Dev Tools",
                    description: "A collection of developer tools that can aid with building and debugging OpenFin applications.",
                    image: {
                        src: "http://localhost:8080/images/coding-2-unsplash.jpg",
                    },
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.notificationStudio, _apps__WEBPACK_IMPORTED_MODULE_1__.processManager],
                    },
                },
            ],
        },
        middleRow: {
            title: "A collection of simple views that show how to share context using the Interop API.",
            apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.experoApp],
        },
        bottomRow: {
            title: "Quick Access",
            items: [
                {
                    id: "bottom-row-item-1",
                    title: "Views",
                    description: "A collection of views made available through our catalog.",
                    image: {
                        src: "http://localhost:8080/images/coding-4-unsplash.jpg",
                    },
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.experoApp],
                    },
                },
                {
                    id: "bottom-row-item-2",
                    title: "Web Apps",
                    description: "A collection of web apps built using OpenFin.",
                    image: {
                        src: "http://localhost:8080/images/coding-5-unsplash.jpg",
                    },
                    templateId: "appGrid",
                    templateData: {
                        apps: [_apps__WEBPACK_IMPORTED_MODULE_1__.notificationStudio, _apps__WEBPACK_IMPORTED_MODULE_1__.processManager],
                    },
                },
            ],
        },
    };
    return landingPage;
}
async function getFooter() {
    console.log("Getting the store footer.");
    return {
        logo: { src: "http://localhost:8080/favicon.ico", size: "32" },
        text: "Welcome to the OpenFin Sample Footer",
        links: [
            {
                title: "Github",
                url: "https://github.com/openfin/workspace-starter",
            },
            {
                title: "YouTube",
                url: "https://www.youtube.com/user/OpenFinTech",
            },
        ],
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./client/src/provider.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./client/src/store.ts");

async function init() {
    let registerStore = document.getElementById("register");
    let showStore = document.getElementById("show");
    let hideStore = document.getElementById("hide");
    registerStore.onclick = async () => {
        await (0,_store__WEBPACK_IMPORTED_MODULE_0__.init)();
    };
    showStore.onclick = async () => {
        await (0,_store__WEBPACK_IMPORTED_MODULE_0__.show)();
    };
    hideStore.onclick = async () => {
        await (0,_store__WEBPACK_IMPORTED_MODULE_0__.hide)();
    };
}
window.addEventListener('DOMContentLoaded', async () => {
    await init();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFaEQsYUFBYSxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUcsRUFBRTtRQUNoQyxNQUFNLDRDQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBRyxFQUFFO1FBQzVCLE1BQU0sNENBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUYsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUcsRUFBRTtRQUM1QixNQUFNLDRDQUFJLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDckQsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3dvcmtzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tYWRkLWFwcGxpY2F0aW9uLXRvLXN0b3JlZnJvbnQtYmFzaWMvLi9jbGllbnQvc3JjL2FwcHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vY2xpZW50L3NyYy9zdG9yZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tYWRkLWFwcGxpY2F0aW9uLXRvLXN0b3JlZnJvbnQtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vY2xpZW50L3NyYy9wcm92aWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17ZDoobyxyKT0+e2Zvcih2YXIgdCBpbiByKWUubyhyLHQpJiYhZS5vKG8sdCkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLHQse2VudW1lcmFibGU6ITAsZ2V0OnJbdF19KX0sbzooZSxvKT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsbykscjplPT57XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX19LG89e307ZS5yKG8pLGUuZChvLHtTdG9yZWZyb250OigpPT4kLGxhdW5jaEFwcDooKT0+VH0pO3ZhciByLHQsbj17fTtlLnIobiksZS5kKG4se2hpZGU6KCk9PkMscmVnaXN0ZXI6KCk9PmIsc2hvdzooKT0+Rn0pLGZ1bmN0aW9uKGUpe2UuTG9jYWw9XCJsb2NhbFwiLGUuRGV2PVwiZGV2XCIsZS5TdGFnaW5nPVwic3RhZ2luZ1wiLGUuUHJvZD1cInByb2RcIn0odHx8KHQ9e30pKTtjb25zdCBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBmaW4saT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHByb2Nlc3N8fG51bGw9PT0ocj1wcm9jZXNzLmVudil8fHZvaWQgMD09PXJ8fHIuSkVTVF9XT1JLRVJfSUQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyksZD0oaT93aW5kb3cub3JpZ2luOnQuTG9jYWwsYSYmZmluLm1lLnV1aWQsYSYmZmluLm1lLm5hbWUsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEVOVj9FTlY6dC5Mb2NhbCx0LkxvY2FsLHQuRGV2LHQuU3RhZ2luZyx0LlByb2QsITApLHM9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfQVBJX1VSTCYmV09SS1NQQUNFX0FQSV9VUkwsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdPUktTUEFDRV9BUFBTX1VSTCYmV09SS1NQQUNFX0FQUFNfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9GT09URVJfVVJMJiZXT1JLU1BBQ0VfU1RPUkVGUk9OVF9GT09URVJfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9MQU5ESU5HX1BBR0VfVVJMJiZXT1JLU1BBQ0VfU1RPUkVGUk9OVF9MQU5ESU5HX1BBR0VfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9OQVZJR0FUSU9OX1VSTCYmV09SS1NQQUNFX1NUT1JFRlJPTlRfTkFWSUdBVElPTl9VUkwsXCIjNzc5NWY3XCIpLGM9e3RyYWNlOiEwLGRlYnVnOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBMT0dfREVCVUcmJkxPR19ERUJVRyxpbmZvOiExLHdhcm46ITAsZXJyb3I6ITAsZmF0YWw6ITB9O2NvbnN0IHA9ZnVuY3Rpb24oZSxvKXtjb25zdCByPWAke2V9IDogYCx0PWBjb2xvcjoke3N9YDtyZXR1cm57dHJhY2U6Yy50cmFjZT8oZSwuLi5vKT0+e2NvbnNvbGUudHJhY2UoYCVjJHtyfSR7ZX1gLHQsLi4ubyl9OihlLC4uLm8pPT57fSxkZWJ1ZzpjLmRlYnVnPyhlLC4uLm8pPT57Y29uc29sZS5pbmZvKGAlYyR7cn0ke2V9YCxcImNvbG9yOiM4NmRiOTRcIiwuLi5vKX06KGUsLi4ubyk9Pnt9LGluZm86Yy5pbmZvPyhlLC4uLm8pPT57Y29uc29sZS5kZWJ1ZyhgJWMke3J9JHtlfWAsXCJjb2xvcjojZmZmZmZmXCIsLi4ubyl9OihlLC4uLm8pPT57fSx3YXJuOmMud2Fybj8oZSwuLi5vKT0+e2NvbnNvbGUud2FybihgJWMke3J9JHtlfWAsXCJjb2xvcjojZWRhZDY4XCIsLi4ubyl9OihlLC4uLm8pPT57fSxlcnJvcjpjLmVycm9yPyhlLG8sLi4udCk9Pntjb25zb2xlLmVycm9yKGAlYyR7cn0ke2V9YCxcImNvbG9yOiNmNTVkNjdcIiwuLi50LG8pfTooZSxvLC4uLnIpPT57fSxmYXRhbDpjLmZhdGFsPyhlLG8sLi4udCk9Pntjb25zb2xlLmVycm9yKGAlYyR7cn0ke2V9YCxcImNvbG9yOiNmNzA3MjNcIiwuLi50LG8pfTooZSxvLC4uLnIpPT57fX19KFwidXRpbHMuY2hhbm5lbHNcIiksZz1pJiZcImNvbXBsZXRlXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZuZXcgUHJvbWlzZSgoZT0+ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIiwoKCk9PntcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZlKCl9KSkpKTt2YXIgZix3LHUsbCxoOyFmdW5jdGlvbihlKXtlLldvcmtzcGFjZT1cIm9wZW5maW4tYnJvd3NlclwifShmfHwoZj17fSkpLGZ1bmN0aW9uKGUpe2UuVmlld1BhZ2VUaXRsZVVwZGF0ZWQ9XCJ2aWV3LXBhZ2UtdGl0bGUtdXBkYXRlZFwiLGUuVmlld0Rlc3Ryb3llZD1cInZpZXctZGVzdHJveWVkXCIsZS5SdW5SZXF1ZXN0ZWQ9XCJydW4tcmVxdWVzdGVkXCIsZS5XaW5kb3dPcHRpb25zQ2hhbmdlZD1cIndpbmRvdy1vcHRpb25zLWNoYW5nZWRcIixlLldpbmRvd0Nsb3NlZD1cIndpbmRvdy1jbG9zZWRcIixlLldpbmRvd0NyZWF0ZWQ9XCJ3aW5kb3ctY3JlYXRlZFwifSh3fHwodz17fSkpLGZ1bmN0aW9uKGUpe2UuRmluUHJvdG9jb2w9XCJmaW4tcHJvdG9jb2xcIn0odXx8KHU9e30pKSxmLldvcmtzcGFjZSxmLldvcmtzcGFjZSxmdW5jdGlvbihlKXtlLkhvbWU9XCJvcGVuZmluLWhvbWVcIixlLkRvY2s9XCJvcGVuZmluLWRvY2tcIixlLlN0b3JlZnJvbnQ9XCJvcGVuZmluLXN0b3JlZnJvbnRcIixlLkhvbWVJbnRlcm5hbD1cIm9wZW5maW4taG9tZS1pbnRlcm5hbFwiLGUuQnJvd3Nlck1lbnU9XCJvcGVuZmluLWJyb3dzZXItbWVudVwiLGUuQnJvd3NlckluZGljYXRvcj1cIm9wZW5maW4tYnJvd3Nlci1pbmRpY2F0b3JcIixlLkJyb3dzZXJXaW5kb3c9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtd2luZG93XCJ9KGx8fChsPXt9KSksZnVuY3Rpb24oZSl7ZS5TaG93bj1cInNob3duXCIsZS5Cb3VuZHNDaGFuZ2VkPVwiYm91bmRzLWNoYW5nZWRcIixlLkxheW91dFJlYWR5PVwibGF5b3V0LXJlYWR5XCIsZS5FbmRVc2VyQm91bmRzQ2hhbmdpbmc9XCJlbmQtdXNlci1ib3VuZHMtY2hhbmdpbmdcIixlLkJsdXJyZWQ9XCJibHVycmVkXCIsZS5DbG9zZVJlcXVlc3RlZD1cImNsb3NlLXJlcXVlc3RlZFwiLGUuRm9jdXNlZD1cImZvY3VzZWRcIixlLlNob3dSZXF1ZXN0ZWQ9XCJzaG93LXJlcXVlc3RlZFwiLGUuVmlld0NyYXNoZWQ9XCJ2aWV3LWNyYXNoZWRcIixlLlZpZXdBdHRhY2hlZD1cInZpZXctYXR0YWNoZWRcIixlLlZpZXdEZXRhY2hlZD1cInZpZXctZGV0YWNoZWRcIn0oaHx8KGg9e30pKSxsLkhvbWUsZi5Xb3Jrc3BhY2UsbC5Eb2NrLGYuV29ya3NwYWNlLGwuU3RvcmVmcm9udCxmLldvcmtzcGFjZTtjb25zdCB2PXtuYW1lOmYuV29ya3NwYWNlLHV1aWQ6Zi5Xb3Jrc3BhY2V9LFM9ZT0+ZnVuY3Rpb24oZSl7aWYoIWEpdGhyb3cgbmV3IEVycm9yKFwiZ2V0T0ZXaW5kb3cgY2FuIG9ubHkgYmUgdXNlZCBpbiBhbiBPcGVuRmluIGVudi4gQXZvaWQgY2FsbGluZyB0aGlzIG1ldGhvZCBkdXJpbmcgcHJlLXJlbmRlcmluZy5cIik7cmV0dXJuIGZpbi5XaW5kb3cud3JhcFN5bmMoZSl9KGUpLmdldE9wdGlvbnMoKS50aGVuKCgoKT0+ITApKS5jYXRjaCgoKCk9PiExKSk7dmFyIFAsUjsoUj1QfHwoUD17fSkpLkxhdW5jaEFwcD1cImxhdW5jaC1hcHBcIixSLkNyZWF0ZVdvcmtzcGFjZT1cImNyZWF0ZS13b3Jrc3BhY2VcIixSLlVwZGF0ZVdvcmtzcGFjZT1cInVwZGF0ZS13b3Jrc3BhY2VcIixSLkRlbGV0ZVdvcmtzcGFjZT1cImRlbGV0ZS13b3Jrc3BhY2VcIixSLkxhdW5jaFdvcmtzcGFjZT1cImxhdW5jaC13b3Jrc3BhY2VcIixSLlNoYXJlV29ya3NwYWNlPVwic2hhcmUtd29ya3NwYWNlXCIsUi5HZXRXb3Jrc3BhY2U9XCJnZXQtd29ya3NwYWNlXCIsUi5HZXRXb3Jrc3BhY2VMaXN0PVwiZ2V0LXdvcmtzcGFjZS1saXN0XCIsUi5HZXRBY3RpdmVXb3Jrc3BhY2U9XCJnZXQtYWN0aXZlLXdvcmtzcGFjZVwiLFIuR2V0UGFnZT1cImdldC1wYWdlXCIsUi5DcmVhdGVQYWdlPVwiY3JlYXRlLXBhZ2VcIixSLlVwZGF0ZVBhZ2U9XCJ1cGRhdGUtcGFnZVwiLFIuUmVuYW1lUGFnZT1cInJlbmFtZS1wYWdlXCIsUi5EZWxldGVQYWdlPVwiZGVsZXRlLXBhZ2VcIixSLlNoYXJlUGFnZT1cInNoYXJlLXBhZ2VcIixSLkxhdW5jaFBhZ2U9XCJsYXVuY2gtcGFnZVwiLFIuQXR0YWNoUGFnZXNUb1dpbmRvdz1cImF0dGFjaC1wYWdlcy10by13aW5kb3dcIixSLkRldGFjaFBhZ2VzRnJvbVdpbmRvdz1cImRldGFjaC1wYWdlcy1mcm9tLXdpbmRvd1wiLFIuUmVvcmRlclBhZ2VzRm9yV2luZG93PVwicmVvcmRlci1wYWdlcy1mb3Itd2luZG93XCIsUi5TZXRBY3RpdmVQYWdlRm9yV2luZG93PVwic2V0LWFjdGl2ZS1wYWdlLWZvci13aW5kb3dcIixSLkdldFNhdmVkUGFnZUxpc3Q9XCJnZXQtc2F2ZWQtcGFnZS1saXN0XCIsUi5HZXRBdHRhY2hlZFBhZ2VMaXN0PVwiZ2V0LXJ1bm5pbmctcGFnZS1saXN0XCIsUi5HZXRBbGxQYWdlTGlzdD1cImdldC1hbGwtcGFnZS1saXN0XCIsUi5HZXRBY3RpdmVQYWdlSWRGb3JXaW5kb3c9XCJnZXQtYWN0aXZlLXBhZ2UtaWQtZm9yLXdpbmRvd1wiLFIuR2V0UGFnZXNGb3JXaW5kb3c9XCJnZXQtcGFnZXMtZm9yLXdpbmRvd1wiLFIuR2V0U2F2ZWRQYWdlTWV0YWRhdGE9XCJnZXQtc2F2ZWQtcGFnZS1tZXRhZGF0YVwiLFIuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJzPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXJzXCIsUi5IaWRlU3RvcmVmcm9udD1cImhpZGUtc3RvcmVmcm9udFwiLFIuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWFwcHNcIixSLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbGFuZGluZy1wYWdlXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXI9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1mb290ZXJcIixSLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb249XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1uYXZpZ2F0aW9uXCIsUi5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHA9XCJsYXVuY2gtc3RvcmVmcm9udC1wcm92aWRlci1hcHBcIixSLlNob3dTdG9yZWZyb250PVwic2hvdy1zdG9yZWZyb250XCIsUi5DcmVhdGVTdG9yZWZyb250V2luZG93PVwiY3JlYXRlLXN0b3JlZnJvbnQtd2luZG93XCIsUi5DcmVhdGVCcm93c2VyV2luZG93PVwiY3JlYXRlLWJyb3dzZXItd2luZG93XCI7Y29uc3QgeT1mdW5jdGlvbihlKXtsZXQgbztyZXR1cm4oKT0+e2lmKCFhKXRocm93IG5ldyBFcnJvcihcImdldENoYW5uZWxDbGllbnQgY2Fubm90IGJlIHVzZWQgb3V0c2lkZSBhbiBPcGVuRmluIGVudi4gQXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiBvfHwocC5kZWJ1ZyhgY29ubmVjdGluZyB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX1gKSxvPShhc3luYygpPT57YXdhaXQgZztjb25zdCByPWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlKTtyZXR1cm4gci5vbkRpc2Nvbm5lY3Rpb24oKGFzeW5jKCk9PntwLndhcm4oYGRpc2Nvbm5lY3RlZCBmcm9tIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWApLG89dm9pZCAwfSkpLHJ9KSgpLnRoZW4oKG89PihwLmRlYnVnKGBjb25uZWN0ZWQgdG8gY2hhbm5lbCBwcm92aWRlciAke2V9YCksbykpKS5jYXRjaCgobz0+e3AuZXJyb3IoYGZhaWxlZCB0byBjb25uZWN0IHRvIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWAsbyl9KSkpLG99fShcIl9fb2Zfd29ya3NwYWNlX3Byb3RvY29sX19cIiksQT1hc3luYygpPT57aWYoIWF3YWl0IFModikpcmV0dXJuIGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKCgoKT0+e2NvbnN0IGU9bmV3IFVSTChcImZpbnM6Ly9zeXN0ZW0tYXBwcy93b3Jrc3BhY2VcIik7cmV0dXJuIGUuc2VhcmNoUGFyYW1zLmFwcGVuZChcImlzTGF1bmNoZWRWaWFMaWJcIixkLnRvU3RyaW5nKCkpLGUudG9TdHJpbmcoKX0pKCkpfSxXPWFzeW5jKCk9Pihhd2FpdCBBKCkseSgpKTt2YXIgTyxfLEw7bGV0IG07IWZ1bmN0aW9uKGUpe2UuU25hcHNob3Q9XCJzbmFwc2hvdFwiLGUuTWFuaWZlc3Q9XCJtYW5pZmVzdFwiLGUuVmlldz1cInZpZXdcIixlLkV4dGVybmFsPVwiZXh0ZXJuYWxcIn0oT3x8KE89e30pKSwoTD1ffHwoXz17fSkpLkxhbmRpbmdQYWdlPVwibGFuZGluZ1BhZ2VcIixMLkFwcEdyaWQ9XCJhcHBHcmlkXCI7Y29uc3QgRT1uZXcgTWFwO2xldCBHPSExO2NvbnN0IGs9ZT0+e2lmKCFFLmhhcyhlKSl0aHJvdyBuZXcgRXJyb3IoYFN0b3JlZnJvbnQgUHJvdmlkZXIgd2l0aCBpZCAke2V9IGlzIG5vdCByZWdpc3RlcmVkYCk7cmV0dXJuIEUuZ2V0KGUpfSxiPWU9PihtPShhc3luYyBlPT57Y29uc3Qgbz1hd2FpdCBXKCk7aWYoRS5oYXMoZS5pZCkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IHByb3ZpZGVyIHdpdGggaWQgJHtlLmlkfSBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtyZXR1cm4gRS5zZXQoZS5pZCxlKSwoZT0+e0d8fChHPSEwLGUucmVnaXN0ZXIoUC5HZXRTdG9yZWZyb250UHJvdmlkZXJBcHBzLChlPT5rKGUpLmdldEFwcHMoKSkpLGUucmVnaXN0ZXIoUC5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXIsKGU9PmsoZSkuZ2V0Rm9vdGVyKCkpKSxlLnJlZ2lzdGVyKFAuR2V0U3RvcmVmcm9udFByb3ZpZGVyTGFuZGluZ1BhZ2UsKGU9PmsoZSkuZ2V0TGFuZGluZ1BhZ2UoKSkpLGUucmVnaXN0ZXIoUC5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uLChlPT5rKGUpLmdldE5hdmlnYXRpb24oKSkpLGUucmVnaXN0ZXIoUC5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHAsKCh7aWQ6ZSxhcHA6b30pPT5rKGUpLmxhdW5jaEFwcChvKSkpKX0pKG8pLG8uZGlzcGF0Y2goUC5SZWdpc3RlclN0b3JlZnJvbnRQcm92aWRlcixlKX0pKGUpLG0pLEM9YXN5bmMoKT0+e2F3YWl0IG0sYXdhaXQgQSgpLGF3YWl0KGFzeW5jKCk9Pihhd2FpdCB5KCkpLmRpc3BhdGNoKFAuSGlkZVN0b3JlZnJvbnQsdm9pZCAwKSkoKX0sRj1hc3luYygpPT57YXdhaXQgbSxhd2FpdCBBKCksYXdhaXQoYXN5bmMoKT0+KGF3YWl0IHkoKSkuZGlzcGF0Y2goUC5TaG93U3RvcmVmcm9udCxudWxsKSkoKX0sVD1hc3luYyBlPT4oYXdhaXQgVygpKS5kaXNwYXRjaChQLkxhdW5jaEFwcCxlKSwkPW47bW9kdWxlLmV4cG9ydHM9b30pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlL3NoYXBlc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFwcHMoKTogUHJvbWlzZTxBcHBbXT4ge1xyXG4gICAgcmV0dXJuIFtleHBlcm9BcHAsIG5vdGlmaWNhdGlvblN0dWRpbywgcHJvY2Vzc01hbmFnZXIsIGRldmVsb3BlckNvbnRlbnRdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZXhwZXJvQXBwOkFwcCA9IHtcclxuICAgIGFwcElkOiBcImV4cGVyby1jb21wYW55LW5ld3NcIixcclxuICAgIHRpdGxlOiBcIkdhdGV3YXkgLSBDb21wYW55IE5ld3NcIixcclxuICAgIG1hbmlmZXN0OiBcImh0dHBzOi8vb3BlbmZpbi1pZXguZXhwZXJvbGFicy5jb20vb3BlbmZpbi9tYW5pZmVzdHMvY29tcGFueS1uZXdzLmpzb25cIixcclxuICAgIG1hbmlmZXN0VHlwZTogXCJ2aWV3XCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcImh0dHBzOi8vb3BlbmZpbi1pZXguZXhwZXJvbGFicy5jb20vZmF2aWNvbi5pY29cIlxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgY29udGFjdEVtYWlsOiBcImNvbnRhY3RAZXhhbXBsZS5jb21cIixcclxuICAgIHN1cHBvcnRFbWFpbDogXCJzdXBwb3J0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBwdWJsaXNoZXI6IFwiRXhwZXJvXCIsXHJcbiAgICBpbnRlbnRzOiBbXSxcclxuICAgIGltYWdlczogW3tcclxuICAgICAgc3JjOlwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9wcmV2aWV3cy9leHBlcm8tbmV3cy12aWV3LnBuZ1wiXHJcbiAgICB9XSxcclxuICAgIHRhZ3M6W1wiZXhwZXJvXCIsIFwiYWxsXCIsIFwidmlld1wiLCBcImludGVyb3BcIl1cclxuICB9O1xyXG5cclxuICBleHBvcnQgY29uc3Qgbm90aWZpY2F0aW9uU3R1ZGlvOkFwcCA9ICB7XHJcbiAgICBhcHBJZDogXCJub3RpZmljYXRpb25zLWdlbmVyYXRvclwiLFxyXG4gICAgdGl0bGU6IFwiT3BlbkZpbiBOb3RpZmljYXRpb25zIFN0dWRpb1wiLFxyXG4gICAgbWFuaWZlc3RUeXBlOiBcIm1hbmlmZXN0XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOb3RpZmljYXRpb25zIFN0dWRpbzogVGhpcyBpcyBPcGVuRmluJ3MgdG9vbCBmb3IgZGVtb25zdHJhdGluZyB0aGUgcG93ZXIgb2Ygb3VyIE5vdGlmaWNhdGlvbiBDZW50ZXIuIFVzZSBpdCB0byBjcmVhdGUgbG9jYWwgbm90aWZpY2F0aW9ucyBvciB1c2Ugc29tZSBvZiB0aGUgZXhhbXBsZXMgc2hvd24gaW4gb3VyIENhdGFsb2cuIEV4cGVyaW1lbnQgd2l0aCBvdXIgZmVhdHVyZXMgYW5kIHNlZSB0aGUgcG93ZXIgdGhhdCBPcGVuRmluIE5vdGlmaWNhdGlvbiBDZW50ZXIgY2FuIGJyaW5nIHRvIHlvdXIgYXBwbGljYXRpb25zLlwiLFxyXG4gICAgbWFuaWZlc3Q6IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9zdHVkaW8vbm90aWZpY2F0aW9uL2FwcC5qc29uXCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7IHNyYzogXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL2RlbW9zL25vdGlmaWNhdGlvbnMvZ2VuZXJhdG9yL2ltYWdlcy9pY29uLWJsdWUucG5nXCJ9XHJcbiAgICBdLFxyXG4gICAgY29udGFjdEVtYWlsOiBcImNvbnRhY3RAZXhhbXBsZS5jb21cIixcclxuICAgIHN1cHBvcnRFbWFpbDogXCJzdXBwb3J0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBwdWJsaXNoZXI6IFwiT3BlbkZpblwiLFxyXG4gICAgaW50ZW50czogW10sXHJcbiAgICBpbWFnZXM6IFt7XHJcbiAgICAgIHNyYzpcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvcHJldmlld3Mvb3BlbmZpbi1ub3RpZmljYXRpb24tc3R1ZGlvLnBuZ1wiXHJcbiAgICB9XSxcclxuICAgIHRhZ3M6W1wiaGVyb1wiLCBcImFsbFwiLCBcIm1hbmlmZXN0XCIsIFwiZGV2LXRvb2xzXCIsIFwib3BlbmZpblwiXVxyXG4gIH07XHJcblxyXG4gIGV4cG9ydCBjb25zdCBwcm9jZXNzTWFuYWdlcjpBcHAgPSB7XHJcbiAgICBhcHBJZDogXCJvcGVuZmluLXByb2Nlc3MtbWFuYWdlclwiLFxyXG4gICAgdGl0bGU6IFwiT3BlbkZpbiBQcm9jZXNzIE1hbmFnZXJcIixcclxuICAgIG1hbmlmZXN0VHlwZTogXCJtYW5pZmVzdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiUHJvY2VzcyBNYW5hZ2VyOiBUaGlzIGlzIE9wZW5GaW4ncyB0b29sIGZvciBoZWxwaW5nIGRldmVsb3BlcnMgYnVpbGQgT3BlbkZpbiBBcHBsaWNhdGlvbnMuIEl0IGxldHMgeW91IHNlZSB0aGUgT3BlbkZpbiBhcHBsaWNhdGlvbnMgdGhhdCBhcmUgcnVubmluZywgdGhlIHBlcmZvcm1hbmNlIG9mIHRoZSBhcHBsaWNhdGlvbnMgKG1lbW9yeSBhbmQgY3B1KSBhbmQgZWFzeSBhY2Nlc3MgdG8gdGhlIGRldiB0b29scyBmb3IgdGhlIFdpbmRvd3Mgb2YgeW91ciBhcHBsaWNhdGlvbi5cIixcclxuICAgIG1hbmlmZXN0OiBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcHJvY2Vzcy1tYW5hZ2VyL2FwcC5qc29uXCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7IHNyYzogXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3Byb2Nlc3MtbWFuYWdlci9pbWcvcHJvYy1tZ3ItaWNvbi5wbmdcIiB9XHJcbiAgICBdLFxyXG4gICAgY29udGFjdEVtYWlsOiBcImNvbnRhY3RAZXhhbXBsZS5jb21cIixcclxuICAgIHN1cHBvcnRFbWFpbDogXCJzdXBwb3J0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBwdWJsaXNoZXI6IFwiT3BlbkZpblwiLFxyXG4gICAgaW50ZW50czogW10sXHJcbiAgICBpbWFnZXM6IFt7XHJcbiAgICAgIHNyYzpcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvcHJldmlld3Mvb3BlbmZpbi1wcm9jZXNzLW1hbmFnZXIucG5nXCJcclxuICAgIH1dLFxyXG4gICAgdGFnczpbXCJoZXJvXCIsIFwiYWxsXCIsIFwibWFuaWZlc3RcIiwgXCJkZXYtdG9vbHNcIiwgXCJvcGVuZmluXCJdXHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGNvbnN0IGRldmVsb3BlckNvbnRlbnQ6IEFwcCA9IHtcclxuICAgIGFwcElkOiBcIm9wZW5maW4tZGV2ZWxvcGVyLXBhZ2VcIixcclxuICAgIHRpdGxlOiBcIk9wZW5GaW4gRGV2ZWxvcGVyIERvY3NcIixcclxuICAgIG1hbmlmZXN0VHlwZTogXCJzbmFwc2hvdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvd3MgYSBjb2xsZWN0aW9uIG9mIE9wZW5GaW4gZGV2ZWxvcGVyIHBhZ2VzIGFuZCBwcm92aWRlcyBhbiBleGFtcGxlIG9mIGhvdyB5b3UgY2FuIHByZXNlbnQgYSBwcmUtYnVpbHQgcGFnZSBhcyBhIGxhdW5jaCB0YXJnZXQgaW4gT3BlbkZpbiBIb21lLiBUaGlzIGVudHJ5IGhhcyBhIG1hbmlmZXN0IHR5cGUgb2YgJ3NuYXBzaG90Jy5cIixcclxuICAgIG1hbmlmZXN0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zbmFwc2hvdC5qc29uXCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7IHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL2ljb24tYmx1ZS5wbmdcIiB9XHJcbiAgICBdLFxyXG4gICAgY29udGFjdEVtYWlsOiBcImNvbnRhY3RAZXhhbXBsZS5jb21cIixcclxuICAgIHN1cHBvcnRFbWFpbDogXCJzdXBwb3J0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBwdWJsaXNoZXI6IFwiT3BlbkZpblwiLFxyXG4gICAgaW50ZW50czogW10sXHJcbiAgICBpbWFnZXM6IFt7XHJcbiAgICAgIHNyYzpcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvcHJldmlld3Mvb3BlbmZpbi1wYWdlLWRvY3MucG5nXCJcclxuICAgIH1dLFxyXG4gICAgdGFnczpbXCJhbGxcIiwgXCJwYWdlXCIsIFwiZGV2LWNvbnRlbnRcIiwgXCJvcGVuZmluXCJdXHJcbiAgfTsiLCJpbXBvcnQgeyBTdG9yZWZyb250LCBsYXVuY2hBcHAgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XHJcbmltcG9ydCB7XHJcbiAgU3RvcmVmcm9udExhbmRpbmdQYWdlLFxyXG4gIFN0b3JlZnJvbnROYXZpZ2F0aW9uU2VjdGlvbixcclxuICBTdG9yZWZyb250Rm9vdGVyLFxyXG4gIFN0b3JlZnJvbnRQcm92aWRlcixcclxuICBTdG9yZWZyb250VGVtcGxhdGUsXHJcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS9zaGFwZXNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRBcHBzLFxyXG4gIGV4cGVyb0FwcCxcclxuICBub3RpZmljYXRpb25TdHVkaW8sXHJcbiAgcHJvY2Vzc01hbmFnZXIsXHJcbiAgZGV2ZWxvcGVyQ29udGVudCxcclxufSBmcm9tIFwiLi9hcHBzXCI7XHJcblxyXG5sZXQgc3RvcmVDb3VudCA9IDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcclxuICBjb25zb2xlLmxvZyhcIkluaXRpYWxpc2luZyB0aGUgc3RvcmVmcm9udCBwcm92aWRlci5cIik7XHJcbiAgbGV0IHByb3ZpZGVyID0gYXdhaXQgZ2V0U3RvcmVQcm92aWRlcigpO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBTdG9yZWZyb250LnJlZ2lzdGVyKHByb3ZpZGVyKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU3RvcmVmcm9udCBwcm92aWRlciBpbml0aWFsaXNlZC5cIik7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICBcIkFuIGVycm9yIHdhcyBlbmNvdW50ZXJlZCB3aGlsZSB0cnlpbmcgdG8gcmVnaXN0ZXIgdGhlIGNvbnRlbnQgc3RvcmUgcHJvdmlkZXJcIixcclxuICAgICAgZXJyXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgY29uc29sZS5sb2coXCJTaG93aW5nIHRoZSBzdG9yZS5cIik7XHJcbiAgcmV0dXJuIFN0b3JlZnJvbnQuc2hvdygpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGlkZSgpIHtcclxuICBjb25zb2xlLmxvZyhcIkhpZGluZyB0aGUgc3RvcmUuXCIpO1xyXG4gIHJldHVybiBTdG9yZWZyb250LnNob3coKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmVQcm92aWRlcigpOiBQcm9taXNlPFN0b3JlZnJvbnRQcm92aWRlcj4ge1xyXG4gIGNvbnNvbGUubG9nKFwiR2V0dGluZyB0aGUgc3RvcmUgcHJvdmlkZXIuXCIpO1xyXG4gIHN0b3JlQ291bnQrKztcclxuICByZXR1cm4ge1xyXG4gICAgaWQ6IFwibXktYmFzaWMtc3RvcmUtXCIgKyBzdG9yZUNvdW50LFxyXG4gICAgdGl0bGU6IFwiQmFzaWMgU3RvcmUgXCIgICsgc3RvcmVDb3VudCxcclxuICAgIGdldE5hdmlnYXRpb246IGdldE5hdmlnYXRpb24sXHJcbiAgICBnZXRMYW5kaW5nUGFnZTogZ2V0TGFuZGluZ1BhZ2UsXHJcbiAgICBnZXRGb290ZXI6IGdldEZvb3RlcixcclxuICAgIGdldEFwcHMsXHJcbiAgICBsYXVuY2hBcHA6IGxhdW5jaEFwcCxcclxuICB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXROYXZpZ2F0aW9uKCk6IFByb21pc2U8XHJcbiAgW1N0b3JlZnJvbnROYXZpZ2F0aW9uU2VjdGlvbj8sIFN0b3JlZnJvbnROYXZpZ2F0aW9uU2VjdGlvbj9dXHJcbj4ge1xyXG4gIGNvbnNvbGUubG9nKFwiU2hvd2luZyB0aGUgc3RvcmUgbmF2aWdhdGlvbi5cIik7XHJcblxyXG4gIGxldCBuYXZpZ2F0aW9uU2VjdGlvbnM6IFtcclxuICAgIFN0b3JlZnJvbnROYXZpZ2F0aW9uU2VjdGlvbj8sXHJcbiAgICBTdG9yZWZyb250TmF2aWdhdGlvblNlY3Rpb24/XHJcbiAgXSA9IFtcclxuICAgIHtcclxuICAgICAgaWQ6IFwiYXBwc1wiLFxyXG4gICAgICB0aXRsZTogXCJBcHBzXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwidmlld1wiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiVmlld3NcIixcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtleHBlcm9BcHBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcInBhZ2VcIixcclxuICAgICAgICAgIHRpdGxlOiBcIlBhZ2VzXCIsXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbZGV2ZWxvcGVyQ29udGVudF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwibWFuaWZlc3RcIixcclxuICAgICAgICAgIHRpdGxlOiBcIldlYiBBcHBzXCIsXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbbm90aWZpY2F0aW9uU3R1ZGlvLCBwcm9jZXNzTWFuYWdlcl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIHJldHVybiBuYXZpZ2F0aW9uU2VjdGlvbnM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExhbmRpbmdQYWdlKCk6IFByb21pc2U8U3RvcmVmcm9udExhbmRpbmdQYWdlPiB7XHJcbiAgY29uc29sZS5sb2coXCJHZXR0aW5nIHRoZSBzdG9yZSBsYW5kaW5nIHBhZ2UuXCIpO1xyXG5cclxuICBsZXQgbGFuZGluZ1BhZ2U6IFN0b3JlZnJvbnRMYW5kaW5nUGFnZSA9IHtcclxuICAgIGhlcm86IHtcclxuICAgICAgdGl0bGU6IFwiQ3VzdG9tIEhlcm8gVGl0bGVcIixcclxuICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgXCJUaGlzIGlzIGEgZGVtb25zdHJhdGlvbiBvZiB0aGUgaGVybyBzZWN0aW9uIHRoYXQgeW91IGNhbiBjb25maWd1cmUgZm9yIHlvdXIgc3RvcmUuXCIsXHJcbiAgICAgIGN0YToge1xyXG4gICAgICAgIGlkOiBcImhlcm8tMVwiLFxyXG4gICAgICAgIHRpdGxlOiBcIkhlcm8gQXBwcyFcIixcclxuICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgIGFwcHM6IFtub3RpZmljYXRpb25TdHVkaW8sIHByb2Nlc3NNYW5hZ2VyXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBpbWFnZToge1xyXG4gICAgICAgIHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL3N1cGVyaGVyby11bnNwbGFzaC5qcGdcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0b3BSb3c6IHtcclxuICAgICAgdGl0bGU6IFwiQ3VzdG9tIFRvcCBSb3cgQ29udGVudFwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcInRvcC1yb3ctaXRlbS0xXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJFeHBlcm9cIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICBcIkEgY29sbGVjdGlvbiBvZiBleGFtcGxlIHZpZXdzIGZyb20gRXhwZXJvIHNob3dpbmcgdGhlIHBvd2VyIG9mIGludGVyb3AgYW5kIGNvbnRleHQgc2hhcmluZy5cIixcclxuICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL2NvZGluZy0xLXVuc3BsYXNoLmpwZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtleHBlcm9BcHBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcInRvcC1yb3ctaXRlbS0yXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJEZXYgVG9vbHNcIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICBcIkEgY29sbGVjdGlvbiBvZiBkZXZlbG9wZXIgdG9vbHMgdGhhdCBjYW4gYWlkIHdpdGggYnVpbGRpbmcgYW5kIGRlYnVnZ2luZyBPcGVuRmluIGFwcGxpY2F0aW9ucy5cIixcclxuICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL2NvZGluZy0yLXVuc3BsYXNoLmpwZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtub3RpZmljYXRpb25TdHVkaW8sIHByb2Nlc3NNYW5hZ2VyXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBtaWRkbGVSb3c6IHtcclxuICAgICAgdGl0bGU6XHJcbiAgICAgICAgXCJBIGNvbGxlY3Rpb24gb2Ygc2ltcGxlIHZpZXdzIHRoYXQgc2hvdyBob3cgdG8gc2hhcmUgY29udGV4dCB1c2luZyB0aGUgSW50ZXJvcCBBUEkuXCIsXHJcbiAgICAgIGFwcHM6IFtleHBlcm9BcHBdLFxyXG4gICAgfSxcclxuICAgIGJvdHRvbVJvdzoge1xyXG4gICAgICB0aXRsZTogXCJRdWljayBBY2Nlc3NcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJib3R0b20tcm93LWl0ZW0tMVwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiVmlld3NcIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICBcIkEgY29sbGVjdGlvbiBvZiB2aWV3cyBtYWRlIGF2YWlsYWJsZSB0aHJvdWdoIG91ciBjYXRhbG9nLlwiLFxyXG4gICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvY29kaW5nLTQtdW5zcGxhc2guanBnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW2V4cGVyb0FwcF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwiYm90dG9tLXJvdy1pdGVtLTJcIixcclxuICAgICAgICAgIHRpdGxlOiBcIldlYiBBcHBzXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBIGNvbGxlY3Rpb24gb2Ygd2ViIGFwcHMgYnVpbHQgdXNpbmcgT3BlbkZpbi5cIixcclxuICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL2NvZGluZy01LXVuc3BsYXNoLmpwZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtub3RpZmljYXRpb25TdHVkaW8sIHByb2Nlc3NNYW5hZ2VyXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGxhbmRpbmdQYWdlO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRGb290ZXIoKTogUHJvbWlzZTxTdG9yZWZyb250Rm9vdGVyPiB7XHJcbiAgY29uc29sZS5sb2coXCJHZXR0aW5nIHRoZSBzdG9yZSBmb290ZXIuXCIpO1xyXG4gIHJldHVybiB7XHJcbiAgICBsb2dvOiB7IHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvZmF2aWNvbi5pY29cIiwgc2l6ZTogXCIzMlwiIH0sXHJcbiAgICB0ZXh0OiBcIldlbGNvbWUgdG8gdGhlIE9wZW5GaW4gU2FtcGxlIEZvb3RlclwiLFxyXG4gICAgbGlua3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiBcIkdpdGh1YlwiLFxyXG4gICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vb3BlbmZpbi93b3Jrc3BhY2Utc3RhcnRlclwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiWW91VHViZVwiLFxyXG4gICAgICAgIHVybDogXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS91c2VyL09wZW5GaW5UZWNoXCIsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxyXG5pbXBvcnQgeyBpbml0IGFzIHJlZ2lzdGVyLCBzaG93LCBoaWRlIH0gZnJvbSAnLi9zdG9yZSc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xyXG4gIGxldCByZWdpc3RlclN0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3RlclwiKTtcclxuICBsZXQgc2hvd1N0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93XCIpO1xyXG4gIGxldCBoaWRlU3RvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVcIik7XHJcblxyXG4gIHJlZ2lzdGVyU3RvcmUub25jbGljayA9IGFzeW5jICgpPT4ge1xyXG4gICAgYXdhaXQgcmVnaXN0ZXIoKTtcclxuICB9O1xyXG5cclxuICBzaG93U3RvcmUub25jbGljayA9IGFzeW5jICgpPT4ge1xyXG4gICAgYXdhaXQgc2hvdygpO1xyXG4gIH07XHJcblxyXG4gIGhpZGVTdG9yZS5vbmNsaWNrID0gYXN5bmMgKCk9PiB7XHJcbiAgICBhd2FpdCBoaWRlKCk7XHJcbiAgfTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgaW5pdCgpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=