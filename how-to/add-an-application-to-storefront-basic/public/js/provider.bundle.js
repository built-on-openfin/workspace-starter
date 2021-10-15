/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@openfin/workspace/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@openfin/workspace/index.js ***!
  \**************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{Storefront:()=>$,launchApp:()=>T});var r,t,n={};e.r(n),e.d(n,{hide:()=>C,register:()=>b,show:()=>F}),function(e){e.Local="local",e.Dev="dev",e.Staging="staging",e.Prod="prod"}(t||(t={}));const a="undefined"!=typeof window&&"undefined"!=typeof fin,i=("undefined"==typeof process||null===(r=process.env)||void 0===r||r.JEST_WORKER_ID,"undefined"!=typeof window),d=(i?window.origin:t.Local,a&&fin.me.uuid,a&&fin.me.name,"undefined"!=typeof ENV?ENV:t.Local,t.Local,t.Dev,t.Staging,t.Prod,!0),s=("undefined"!=typeof WORKSPACE_API_URL&&WORKSPACE_API_URL,"undefined"!=typeof WORKSPACE_APPS_URL&&WORKSPACE_APPS_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_FOOTER_URL&&WORKSPACE_STOREFRONT_FOOTER_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_LANDING_PAGE_URL&&WORKSPACE_STOREFRONT_LANDING_PAGE_URL,"undefined"!=typeof WORKSPACE_STOREFRONT_NAVIGATION_URL&&WORKSPACE_STOREFRONT_NAVIGATION_URL,"#7795f7"),c={trace:!0,debug:"undefined"!=typeof LOG_DEBUG&&LOG_DEBUG,info:!1,warn:!0,error:!0,fatal:!0};const p=function(e,o){const r=`${e} : `,t=`color:${s}`;return{trace:c.trace?(e,...o)=>{console.trace(`%c${r}${e}`,t,...o)}:(e,...o)=>{},debug:c.debug?(e,...o)=>{console.info(`%c${r}${e}`,"color:#86db94",...o)}:(e,...o)=>{},info:c.info?(e,...o)=>{console.debug(`%c${r}${e}`,"color:#ffffff",...o)}:(e,...o)=>{},warn:c.warn?(e,...o)=>{console.warn(`%c${r}${e}`,"color:#edad68",...o)}:(e,...o)=>{},error:c.error?(e,o,...t)=>{console.error(`%c${r}${e}`,"color:#f55d67",...t,o)}:(e,o,...r)=>{},fatal:c.fatal?(e,o,...t)=>{console.error(`%c${r}${e}`,"color:#f70723",...t,o)}:(e,o,...r)=>{}}}("utils.channels"),g=i&&"complete"!==document.readyState&&new Promise((e=>document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&e()}))));var f,w,u,l,h;!function(e){e.Workspace="openfin-browser"}(f||(f={})),function(e){e.ViewPageTitleUpdated="view-page-title-updated",e.ViewDestroyed="view-destroyed",e.RunRequested="run-requested",e.WindowOptionsChanged="window-options-changed",e.WindowClosed="window-closed",e.WindowCreated="window-created"}(w||(w={})),function(e){e.FinProtocol="fin-protocol"}(u||(u={})),f.Workspace,f.Workspace,function(e){e.Home="openfin-home",e.Dock="openfin-dock",e.Storefront="openfin-storefront",e.HomeInternal="openfin-home-internal",e.BrowserMenu="openfin-browser-menu",e.BrowserIndicator="openfin-browser-indicator",e.BrowserWindow="internal-generated-window"}(l||(l={})),function(e){e.Shown="shown",e.BoundsChanged="bounds-changed",e.LayoutReady="layout-ready",e.EndUserBoundsChanging="end-user-bounds-changing",e.Blurred="blurred",e.CloseRequested="close-requested",e.Focused="focused",e.ShowRequested="show-requested",e.ViewCrashed="view-crashed",e.ViewAttached="view-attached",e.ViewDetached="view-detached"}(h||(h={})),l.Home,f.Workspace,l.Dock,f.Workspace,l.Storefront,f.Workspace;const v={name:f.Workspace,uuid:f.Workspace},S=e=>function(e){if(!a)throw new Error("getOFWindow can only be used in an OpenFin env. Avoid calling this method during pre-rendering.");return fin.Window.wrapSync(e)}(e).getOptions().then((()=>!0)).catch((()=>!1));var P,R;(R=P||(P={})).LaunchApp="launch-app",R.CreateWorkspace="create-workspace",R.UpdateWorkspace="update-workspace",R.DeleteWorkspace="delete-workspace",R.LaunchWorkspace="launch-workspace",R.ShareWorkspace="share-workspace",R.GetWorkspace="get-workspace",R.GetWorkspaceList="get-workspace-list",R.GetActiveWorkspace="get-active-workspace",R.GetPage="get-page",R.CreatePage="create-page",R.UpdatePage="update-page",R.RenamePage="rename-page",R.DeletePage="delete-page",R.SharePage="share-page",R.LaunchPage="launch-page",R.AttachPagesToWindow="attach-pages-to-window",R.DetachPagesFromWindow="detach-pages-from-window",R.ReorderPagesForWindow="reorder-pages-for-window",R.SetActivePageForWindow="set-active-page-for-window",R.GetSavedPageList="get-saved-page-list",R.GetAttachedPageList="get-running-page-list",R.GetAllPageList="get-all-page-list",R.GetActivePageIdForWindow="get-active-page-id-for-window",R.GetPagesForWindow="get-pages-for-window",R.GetSavedPageMetadata="get-saved-page-metadata",R.RegisterStorefrontProvider="register-storefront-provider",R.GetStorefrontProviders="get-storefront-providers",R.HideStorefront="hide-storefront",R.GetStorefrontProviderApps="get-storefront-provider-apps",R.GetStorefrontProviderLandingPage="get-storefront-provider-landing-page",R.GetStorefrontProviderFooter="get-storefront-provider-footer",R.GetStorefrontProviderNavigation="get-storefront-provider-navigation",R.LaunchStorefrontProviderApp="launch-storefront-provider-app",R.ShowStorefront="show-storefront",R.CreateStorefrontWindow="create-storefront-window",R.CreateBrowserWindow="create-browser-window";const y=function(e){let o;return()=>{if(!a)throw new Error("getChannelClient cannot be used outside an OpenFin env. Avoid using this method during pre-rendering.");return o||(p.debug(`connecting to channel provider ${e}`),o=(async()=>{await g;const r=await fin.InterApplicationBus.Channel.connect(e);return r.onDisconnection((async()=>{p.warn(`disconnected from channel provider ${e}`),o=void 0})),r})().then((o=>(p.debug(`connected to channel provider ${e}`),o))).catch((o=>{p.error(`failed to connect to channel provider ${e}`,o)}))),o}}("__of_workspace_protocol__"),A=async()=>{if(!await S(v))return fin.System.openUrlWithBrowser((()=>{const e=new URL("fins://cdn.openfin.co/workspace/dev/app.json");return e.searchParams.append("isLaunchedViaLib",d.toString()),e.toString()})())},W=async()=>(await A(),y());var O,_,L;let E;!function(e){e.Snapshot="snapshot",e.Manifest="manifest",e.View="view",e.External="external"}(O||(O={})),(L=_||(_={})).LandingPage="landingPage",L.AppGrid="appGrid";const m=new Map;let G=!1;const k=e=>{if(!m.has(e))throw new Error(`Storefront Provider with id ${e} is not registered`);return m.get(e)},b=e=>(E=(async e=>{const o=await W();if(m.has(e.id))throw new Error(`Storefront provider with id ${e.id} already registered`);return m.set(e.id,e),(e=>{G||(G=!0,e.register(P.GetStorefrontProviderApps,(e=>k(e).getApps())),e.register(P.GetStorefrontProviderFooter,(e=>k(e).getFooter())),e.register(P.GetStorefrontProviderLandingPage,(e=>k(e).getLandingPage())),e.register(P.GetStorefrontProviderNavigation,(e=>k(e).getNavigation())),e.register(P.LaunchStorefrontProviderApp,(({id:e,app:o})=>k(e).launchApp(o))))})(o),o.dispatch(P.RegisterStorefrontProvider,e)})(e),E),C=async()=>{await E,await A(),await(async()=>(await y()).dispatch(P.HideStorefront,void 0))()},F=async()=>{await E,await A(),await(async()=>(await y()).dispatch(P.ShowStorefront,null))()},T=async e=>(await W()).dispatch(P.LaunchApp,e),$=n;module.exports=o})();
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
    return {
        id: "my-basic-store",
        title: "Basic Store",
        getNavigation: getNavigation.bind(this),
        getLandingPage: getLandingPage.bind(this),
        getFooter: getFooter.bind(this),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWhELGFBQWEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFHLEVBQUU7UUFDaEMsTUFBTSw0Q0FBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0lBRUYsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUcsRUFBRTtRQUM1QixNQUFNLDRDQUFJLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFHLEVBQUU7UUFDNUIsTUFBTSw0Q0FBSSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3JELE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy8uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi93b3Jrc3BhY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vY2xpZW50L3NyYy9hcHBzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy8uL2NsaWVudC9zcmMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tYWRkLWFwcGxpY2F0aW9uLXRvLXN0b3JlZnJvbnQtYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy8uL2NsaWVudC9zcmMvcHJvdmlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKCgpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9e2Q6KG8scik9Pntmb3IodmFyIHQgaW4gcillLm8ocix0KSYmIWUubyhvLHQpJiZPYmplY3QuZGVmaW5lUHJvcGVydHkobyx0LHtlbnVtZXJhYmxlOiEwLGdldDpyW3RdfSl9LG86KGUsbyk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLG8pLHI6ZT0+e1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9fSxvPXt9O2UucihvKSxlLmQobyx7U3RvcmVmcm9udDooKT0+JCxsYXVuY2hBcHA6KCk9PlR9KTt2YXIgcix0LG49e307ZS5yKG4pLGUuZChuLHtoaWRlOigpPT5DLHJlZ2lzdGVyOigpPT5iLHNob3c6KCk9PkZ9KSxmdW5jdGlvbihlKXtlLkxvY2FsPVwibG9jYWxcIixlLkRldj1cImRldlwiLGUuU3RhZ2luZz1cInN0YWdpbmdcIixlLlByb2Q9XCJwcm9kXCJ9KHR8fCh0PXt9KSk7Y29uc3QgYT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZmluLGk9KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBwcm9jZXNzfHxudWxsPT09KHI9cHJvY2Vzcy5lbnYpfHx2b2lkIDA9PT1yfHxyLkpFU1RfV09SS0VSX0lELFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpLGQ9KGk/d2luZG93Lm9yaWdpbjp0LkxvY2FsLGEmJmZpbi5tZS51dWlkLGEmJmZpbi5tZS5uYW1lLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBFTlY/RU5WOnQuTG9jYWwsdC5Mb2NhbCx0LkRldix0LlN0YWdpbmcsdC5Qcm9kLCEwKSxzPShcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX0FQSV9VUkwmJldPUktTUEFDRV9BUElfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfQVBQU19VUkwmJldPUktTUEFDRV9BUFBTX1VSTCxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX1NUT1JFRlJPTlRfRk9PVEVSX1VSTCYmV09SS1NQQUNFX1NUT1JFRlJPTlRfRk9PVEVSX1VSTCxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX1NUT1JFRlJPTlRfTEFORElOR19QQUdFX1VSTCYmV09SS1NQQUNFX1NUT1JFRlJPTlRfTEFORElOR19QQUdFX1VSTCxcInVuZGVmaW5lZFwiIT10eXBlb2YgV09SS1NQQUNFX1NUT1JFRlJPTlRfTkFWSUdBVElPTl9VUkwmJldPUktTUEFDRV9TVE9SRUZST05UX05BVklHQVRJT05fVVJMLFwiIzc3OTVmN1wiKSxjPXt0cmFjZTohMCxkZWJ1ZzpcInVuZGVmaW5lZFwiIT10eXBlb2YgTE9HX0RFQlVHJiZMT0dfREVCVUcsaW5mbzohMSx3YXJuOiEwLGVycm9yOiEwLGZhdGFsOiEwfTtjb25zdCBwPWZ1bmN0aW9uKGUsbyl7Y29uc3Qgcj1gJHtlfSA6IGAsdD1gY29sb3I6JHtzfWA7cmV0dXJue3RyYWNlOmMudHJhY2U/KGUsLi4ubyk9Pntjb25zb2xlLnRyYWNlKGAlYyR7cn0ke2V9YCx0LC4uLm8pfTooZSwuLi5vKT0+e30sZGVidWc6Yy5kZWJ1Zz8oZSwuLi5vKT0+e2NvbnNvbGUuaW5mbyhgJWMke3J9JHtlfWAsXCJjb2xvcjojODZkYjk0XCIsLi4ubyl9OihlLC4uLm8pPT57fSxpbmZvOmMuaW5mbz8oZSwuLi5vKT0+e2NvbnNvbGUuZGVidWcoYCVjJHtyfSR7ZX1gLFwiY29sb3I6I2ZmZmZmZlwiLC4uLm8pfTooZSwuLi5vKT0+e30sd2FybjpjLndhcm4/KGUsLi4ubyk9Pntjb25zb2xlLndhcm4oYCVjJHtyfSR7ZX1gLFwiY29sb3I6I2VkYWQ2OFwiLC4uLm8pfTooZSwuLi5vKT0+e30sZXJyb3I6Yy5lcnJvcj8oZSxvLC4uLnQpPT57Y29uc29sZS5lcnJvcihgJWMke3J9JHtlfWAsXCJjb2xvcjojZjU1ZDY3XCIsLi4udCxvKX06KGUsbywuLi5yKT0+e30sZmF0YWw6Yy5mYXRhbD8oZSxvLC4uLnQpPT57Y29uc29sZS5lcnJvcihgJWMke3J9JHtlfWAsXCJjb2xvcjojZjcwNzIzXCIsLi4udCxvKX06KGUsbywuLi5yKT0+e319fShcInV0aWxzLmNoYW5uZWxzXCIpLGc9aSYmXCJjb21wbGV0ZVwiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmbmV3IFByb21pc2UoKGU9PmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsKCgpPT57XCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmZSgpfSkpKSk7dmFyIGYsdyx1LGwsaDshZnVuY3Rpb24oZSl7ZS5Xb3Jrc3BhY2U9XCJvcGVuZmluLWJyb3dzZXJcIn0oZnx8KGY9e30pKSxmdW5jdGlvbihlKXtlLlZpZXdQYWdlVGl0bGVVcGRhdGVkPVwidmlldy1wYWdlLXRpdGxlLXVwZGF0ZWRcIixlLlZpZXdEZXN0cm95ZWQ9XCJ2aWV3LWRlc3Ryb3llZFwiLGUuUnVuUmVxdWVzdGVkPVwicnVuLXJlcXVlc3RlZFwiLGUuV2luZG93T3B0aW9uc0NoYW5nZWQ9XCJ3aW5kb3ctb3B0aW9ucy1jaGFuZ2VkXCIsZS5XaW5kb3dDbG9zZWQ9XCJ3aW5kb3ctY2xvc2VkXCIsZS5XaW5kb3dDcmVhdGVkPVwid2luZG93LWNyZWF0ZWRcIn0od3x8KHc9e30pKSxmdW5jdGlvbihlKXtlLkZpblByb3RvY29sPVwiZmluLXByb3RvY29sXCJ9KHV8fCh1PXt9KSksZi5Xb3Jrc3BhY2UsZi5Xb3Jrc3BhY2UsZnVuY3Rpb24oZSl7ZS5Ib21lPVwib3BlbmZpbi1ob21lXCIsZS5Eb2NrPVwib3BlbmZpbi1kb2NrXCIsZS5TdG9yZWZyb250PVwib3BlbmZpbi1zdG9yZWZyb250XCIsZS5Ib21lSW50ZXJuYWw9XCJvcGVuZmluLWhvbWUtaW50ZXJuYWxcIixlLkJyb3dzZXJNZW51PVwib3BlbmZpbi1icm93c2VyLW1lbnVcIixlLkJyb3dzZXJJbmRpY2F0b3I9XCJvcGVuZmluLWJyb3dzZXItaW5kaWNhdG9yXCIsZS5Ccm93c2VyV2luZG93PVwiaW50ZXJuYWwtZ2VuZXJhdGVkLXdpbmRvd1wifShsfHwobD17fSkpLGZ1bmN0aW9uKGUpe2UuU2hvd249XCJzaG93blwiLGUuQm91bmRzQ2hhbmdlZD1cImJvdW5kcy1jaGFuZ2VkXCIsZS5MYXlvdXRSZWFkeT1cImxheW91dC1yZWFkeVwiLGUuRW5kVXNlckJvdW5kc0NoYW5naW5nPVwiZW5kLXVzZXItYm91bmRzLWNoYW5naW5nXCIsZS5CbHVycmVkPVwiYmx1cnJlZFwiLGUuQ2xvc2VSZXF1ZXN0ZWQ9XCJjbG9zZS1yZXF1ZXN0ZWRcIixlLkZvY3VzZWQ9XCJmb2N1c2VkXCIsZS5TaG93UmVxdWVzdGVkPVwic2hvdy1yZXF1ZXN0ZWRcIixlLlZpZXdDcmFzaGVkPVwidmlldy1jcmFzaGVkXCIsZS5WaWV3QXR0YWNoZWQ9XCJ2aWV3LWF0dGFjaGVkXCIsZS5WaWV3RGV0YWNoZWQ9XCJ2aWV3LWRldGFjaGVkXCJ9KGh8fChoPXt9KSksbC5Ib21lLGYuV29ya3NwYWNlLGwuRG9jayxmLldvcmtzcGFjZSxsLlN0b3JlZnJvbnQsZi5Xb3Jrc3BhY2U7Y29uc3Qgdj17bmFtZTpmLldvcmtzcGFjZSx1dWlkOmYuV29ya3NwYWNlfSxTPWU9PmZ1bmN0aW9uKGUpe2lmKCFhKXRocm93IG5ldyBFcnJvcihcImdldE9GV2luZG93IGNhbiBvbmx5IGJlIHVzZWQgaW4gYW4gT3BlbkZpbiBlbnYuIEF2b2lkIGNhbGxpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiBmaW4uV2luZG93LndyYXBTeW5jKGUpfShlKS5nZXRPcHRpb25zKCkudGhlbigoKCk9PiEwKSkuY2F0Y2goKCgpPT4hMSkpO3ZhciBQLFI7KFI9UHx8KFA9e30pKS5MYXVuY2hBcHA9XCJsYXVuY2gtYXBwXCIsUi5DcmVhdGVXb3Jrc3BhY2U9XCJjcmVhdGUtd29ya3NwYWNlXCIsUi5VcGRhdGVXb3Jrc3BhY2U9XCJ1cGRhdGUtd29ya3NwYWNlXCIsUi5EZWxldGVXb3Jrc3BhY2U9XCJkZWxldGUtd29ya3NwYWNlXCIsUi5MYXVuY2hXb3Jrc3BhY2U9XCJsYXVuY2gtd29ya3NwYWNlXCIsUi5TaGFyZVdvcmtzcGFjZT1cInNoYXJlLXdvcmtzcGFjZVwiLFIuR2V0V29ya3NwYWNlPVwiZ2V0LXdvcmtzcGFjZVwiLFIuR2V0V29ya3NwYWNlTGlzdD1cImdldC13b3Jrc3BhY2UtbGlzdFwiLFIuR2V0QWN0aXZlV29ya3NwYWNlPVwiZ2V0LWFjdGl2ZS13b3Jrc3BhY2VcIixSLkdldFBhZ2U9XCJnZXQtcGFnZVwiLFIuQ3JlYXRlUGFnZT1cImNyZWF0ZS1wYWdlXCIsUi5VcGRhdGVQYWdlPVwidXBkYXRlLXBhZ2VcIixSLlJlbmFtZVBhZ2U9XCJyZW5hbWUtcGFnZVwiLFIuRGVsZXRlUGFnZT1cImRlbGV0ZS1wYWdlXCIsUi5TaGFyZVBhZ2U9XCJzaGFyZS1wYWdlXCIsUi5MYXVuY2hQYWdlPVwibGF1bmNoLXBhZ2VcIixSLkF0dGFjaFBhZ2VzVG9XaW5kb3c9XCJhdHRhY2gtcGFnZXMtdG8td2luZG93XCIsUi5EZXRhY2hQYWdlc0Zyb21XaW5kb3c9XCJkZXRhY2gtcGFnZXMtZnJvbS13aW5kb3dcIixSLlJlb3JkZXJQYWdlc0ZvcldpbmRvdz1cInJlb3JkZXItcGFnZXMtZm9yLXdpbmRvd1wiLFIuU2V0QWN0aXZlUGFnZUZvcldpbmRvdz1cInNldC1hY3RpdmUtcGFnZS1mb3Itd2luZG93XCIsUi5HZXRTYXZlZFBhZ2VMaXN0PVwiZ2V0LXNhdmVkLXBhZ2UtbGlzdFwiLFIuR2V0QXR0YWNoZWRQYWdlTGlzdD1cImdldC1ydW5uaW5nLXBhZ2UtbGlzdFwiLFIuR2V0QWxsUGFnZUxpc3Q9XCJnZXQtYWxsLXBhZ2UtbGlzdFwiLFIuR2V0QWN0aXZlUGFnZUlkRm9yV2luZG93PVwiZ2V0LWFjdGl2ZS1wYWdlLWlkLWZvci13aW5kb3dcIixSLkdldFBhZ2VzRm9yV2luZG93PVwiZ2V0LXBhZ2VzLWZvci13aW5kb3dcIixSLkdldFNhdmVkUGFnZU1ldGFkYXRhPVwiZ2V0LXNhdmVkLXBhZ2UtbWV0YWRhdGFcIixSLlJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyPVwicmVnaXN0ZXItc3RvcmVmcm9udC1wcm92aWRlclwiLFIuR2V0U3RvcmVmcm9udFByb3ZpZGVycz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyc1wiLFIuSGlkZVN0b3JlZnJvbnQ9XCJoaWRlLXN0b3JlZnJvbnRcIixSLkdldFN0b3JlZnJvbnRQcm92aWRlckFwcHM9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1hcHBzXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJMYW5kaW5nUGFnZT1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWxhbmRpbmctcGFnZVwiLFIuR2V0U3RvcmVmcm9udFByb3ZpZGVyRm9vdGVyPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItZm9vdGVyXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJOYXZpZ2F0aW9uPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbmF2aWdhdGlvblwiLFIuTGF1bmNoU3RvcmVmcm9udFByb3ZpZGVyQXBwPVwibGF1bmNoLXN0b3JlZnJvbnQtcHJvdmlkZXItYXBwXCIsUi5TaG93U3RvcmVmcm9udD1cInNob3ctc3RvcmVmcm9udFwiLFIuQ3JlYXRlU3RvcmVmcm9udFdpbmRvdz1cImNyZWF0ZS1zdG9yZWZyb250LXdpbmRvd1wiLFIuQ3JlYXRlQnJvd3NlcldpbmRvdz1cImNyZWF0ZS1icm93c2VyLXdpbmRvd1wiO2NvbnN0IHk9ZnVuY3Rpb24oZSl7bGV0IG87cmV0dXJuKCk9PntpZighYSl0aHJvdyBuZXcgRXJyb3IoXCJnZXRDaGFubmVsQ2xpZW50IGNhbm5vdCBiZSB1c2VkIG91dHNpZGUgYW4gT3BlbkZpbiBlbnYuIEF2b2lkIHVzaW5nIHRoaXMgbWV0aG9kIGR1cmluZyBwcmUtcmVuZGVyaW5nLlwiKTtyZXR1cm4gb3x8KHAuZGVidWcoYGNvbm5lY3RpbmcgdG8gY2hhbm5lbCBwcm92aWRlciAke2V9YCksbz0oYXN5bmMoKT0+e2F3YWl0IGc7Y29uc3Qgcj1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZSk7cmV0dXJuIHIub25EaXNjb25uZWN0aW9uKChhc3luYygpPT57cC53YXJuKGBkaXNjb25uZWN0ZWQgZnJvbSBjaGFubmVsIHByb3ZpZGVyICR7ZX1gKSxvPXZvaWQgMH0pKSxyfSkoKS50aGVuKChvPT4ocC5kZWJ1ZyhgY29ubmVjdGVkIHRvIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWApLG8pKSkuY2F0Y2goKG89PntwLmVycm9yKGBmYWlsZWQgdG8gY29ubmVjdCB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX1gLG8pfSkpKSxvfX0oXCJfX29mX3dvcmtzcGFjZV9wcm90b2NvbF9fXCIpLEE9YXN5bmMoKT0+e2lmKCFhd2FpdCBTKHYpKXJldHVybiBmaW4uU3lzdGVtLm9wZW5VcmxXaXRoQnJvd3NlcigoKCk9Pntjb25zdCBlPW5ldyBVUkwoXCJmaW5zOi8vY2RuLm9wZW5maW4uY28vd29ya3NwYWNlL2Rldi9hcHAuanNvblwiKTtyZXR1cm4gZS5zZWFyY2hQYXJhbXMuYXBwZW5kKFwiaXNMYXVuY2hlZFZpYUxpYlwiLGQudG9TdHJpbmcoKSksZS50b1N0cmluZygpfSkoKSl9LFc9YXN5bmMoKT0+KGF3YWl0IEEoKSx5KCkpO3ZhciBPLF8sTDtsZXQgRTshZnVuY3Rpb24oZSl7ZS5TbmFwc2hvdD1cInNuYXBzaG90XCIsZS5NYW5pZmVzdD1cIm1hbmlmZXN0XCIsZS5WaWV3PVwidmlld1wiLGUuRXh0ZXJuYWw9XCJleHRlcm5hbFwifShPfHwoTz17fSkpLChMPV98fChfPXt9KSkuTGFuZGluZ1BhZ2U9XCJsYW5kaW5nUGFnZVwiLEwuQXBwR3JpZD1cImFwcEdyaWRcIjtjb25zdCBtPW5ldyBNYXA7bGV0IEc9ITE7Y29uc3Qgaz1lPT57aWYoIW0uaGFzKGUpKXRocm93IG5ldyBFcnJvcihgU3RvcmVmcm9udCBQcm92aWRlciB3aXRoIGlkICR7ZX0gaXMgbm90IHJlZ2lzdGVyZWRgKTtyZXR1cm4gbS5nZXQoZSl9LGI9ZT0+KEU9KGFzeW5jIGU9Pntjb25zdCBvPWF3YWl0IFcoKTtpZihtLmhhcyhlLmlkKSl0aHJvdyBuZXcgRXJyb3IoYFN0b3JlZnJvbnQgcHJvdmlkZXIgd2l0aCBpZCAke2UuaWR9IGFscmVhZHkgcmVnaXN0ZXJlZGApO3JldHVybiBtLnNldChlLmlkLGUpLChlPT57R3x8KEc9ITAsZS5yZWdpc3RlcihQLkdldFN0b3JlZnJvbnRQcm92aWRlckFwcHMsKGU9PmsoZSkuZ2V0QXBwcygpKSksZS5yZWdpc3RlcihQLkdldFN0b3JlZnJvbnRQcm92aWRlckZvb3RlciwoZT0+ayhlKS5nZXRGb290ZXIoKSkpLGUucmVnaXN0ZXIoUC5HZXRTdG9yZWZyb250UHJvdmlkZXJMYW5kaW5nUGFnZSwoZT0+ayhlKS5nZXRMYW5kaW5nUGFnZSgpKSksZS5yZWdpc3RlcihQLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb24sKGU9PmsoZSkuZ2V0TmF2aWdhdGlvbigpKSksZS5yZWdpc3RlcihQLkxhdW5jaFN0b3JlZnJvbnRQcm92aWRlckFwcCwoKHtpZDplLGFwcDpvfSk9PmsoZSkubGF1bmNoQXBwKG8pKSkpfSkobyksby5kaXNwYXRjaChQLlJlZ2lzdGVyU3RvcmVmcm9udFByb3ZpZGVyLGUpfSkoZSksRSksQz1hc3luYygpPT57YXdhaXQgRSxhd2FpdCBBKCksYXdhaXQoYXN5bmMoKT0+KGF3YWl0IHkoKSkuZGlzcGF0Y2goUC5IaWRlU3RvcmVmcm9udCx2b2lkIDApKSgpfSxGPWFzeW5jKCk9Pnthd2FpdCBFLGF3YWl0IEEoKSxhd2FpdChhc3luYygpPT4oYXdhaXQgeSgpKS5kaXNwYXRjaChQLlNob3dTdG9yZWZyb250LG51bGwpKSgpfSxUPWFzeW5jIGU9Pihhd2FpdCBXKCkpLmRpc3BhdGNoKFAuTGF1bmNoQXBwLGUpLCQ9bjttb2R1bGUuZXhwb3J0cz1vfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IEFwcCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2Uvc2hhcGVzXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXBwcygpOiBQcm9taXNlPEFwcFtdPiB7XHJcbiAgICByZXR1cm4gW2V4cGVyb0FwcCwgbm90aWZpY2F0aW9uU3R1ZGlvLCBwcm9jZXNzTWFuYWdlciwgZGV2ZWxvcGVyQ29udGVudF07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBleHBlcm9BcHA6QXBwID0ge1xyXG4gICAgYXBwSWQ6IFwiZXhwZXJvLWNvbXBhbnktbmV3c1wiLFxyXG4gICAgdGl0bGU6IFwiR2F0ZXdheSAtIENvbXBhbnkgTmV3c1wiLFxyXG4gICAgbWFuaWZlc3Q6IFwiaHR0cHM6Ly9vcGVuZmluLWlleC5leHBlcm9sYWJzLmNvbS9vcGVuZmluL21hbmlmZXN0cy9jb21wYW55LW5ld3MuanNvblwiLFxyXG4gICAgbWFuaWZlc3RUeXBlOiBcInZpZXdcIixcclxuICAgIGljb25zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6IFwiaHR0cHM6Ly9vcGVuZmluLWlleC5leHBlcm9sYWJzLmNvbS9mYXZpY29uLmljb1wiXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjb250YWN0RW1haWw6IFwiY29udGFjdEBleGFtcGxlLmNvbVwiLFxyXG4gICAgc3VwcG9ydEVtYWlsOiBcInN1cHBvcnRAZXhhbXBsZS5jb21cIixcclxuICAgIHB1Ymxpc2hlcjogXCJFeHBlcm9cIixcclxuICAgIGludGVudHM6IFtdLFxyXG4gICAgaW1hZ2VzOiBbe1xyXG4gICAgICBzcmM6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL3ByZXZpZXdzL2V4cGVyby1uZXdzLXZpZXcucG5nXCJcclxuICAgIH1dLFxyXG4gICAgdGFnczpbXCJleHBlcm9cIiwgXCJhbGxcIiwgXCJ2aWV3XCIsIFwiaW50ZXJvcFwiXVxyXG4gIH07XHJcblxyXG4gIGV4cG9ydCBjb25zdCBub3RpZmljYXRpb25TdHVkaW86QXBwID0gIHtcclxuICAgIGFwcElkOiBcIm5vdGlmaWNhdGlvbnMtZ2VuZXJhdG9yXCIsXHJcbiAgICB0aXRsZTogXCJPcGVuRmluIE5vdGlmaWNhdGlvbnMgU3R1ZGlvXCIsXHJcbiAgICBtYW5pZmVzdFR5cGU6IFwibWFuaWZlc3RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5vdGlmaWNhdGlvbnMgU3R1ZGlvOiBUaGlzIGlzIE9wZW5GaW4ncyB0b29sIGZvciBkZW1vbnN0cmF0aW5nIHRoZSBwb3dlciBvZiBvdXIgTm90aWZpY2F0aW9uIENlbnRlci4gVXNlIGl0IHRvIGNyZWF0ZSBsb2NhbCBub3RpZmljYXRpb25zIG9yIHVzZSBzb21lIG9mIHRoZSBleGFtcGxlcyBzaG93biBpbiBvdXIgQ2F0YWxvZy4gRXhwZXJpbWVudCB3aXRoIG91ciBmZWF0dXJlcyBhbmQgc2VlIHRoZSBwb3dlciB0aGF0IE9wZW5GaW4gTm90aWZpY2F0aW9uIENlbnRlciBjYW4gYnJpbmcgdG8geW91ciBhcHBsaWNhdGlvbnMuXCIsXHJcbiAgICBtYW5pZmVzdDogXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3N0dWRpby9ub3RpZmljYXRpb24vYXBwLmpzb25cIixcclxuICAgIGljb25zOiBbXHJcbiAgICAgIHsgc3JjOiBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vZGVtb3Mvbm90aWZpY2F0aW9ucy9nZW5lcmF0b3IvaW1hZ2VzL2ljb24tYmx1ZS5wbmdcIn1cclxuICAgIF0sXHJcbiAgICBjb250YWN0RW1haWw6IFwiY29udGFjdEBleGFtcGxlLmNvbVwiLFxyXG4gICAgc3VwcG9ydEVtYWlsOiBcInN1cHBvcnRAZXhhbXBsZS5jb21cIixcclxuICAgIHB1Ymxpc2hlcjogXCJPcGVuRmluXCIsXHJcbiAgICBpbnRlbnRzOiBbXSxcclxuICAgIGltYWdlczogW3tcclxuICAgICAgc3JjOlwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9wcmV2aWV3cy9vcGVuZmluLW5vdGlmaWNhdGlvbi1zdHVkaW8ucG5nXCJcclxuICAgIH1dLFxyXG4gICAgdGFnczpbXCJoZXJvXCIsIFwiYWxsXCIsIFwibWFuaWZlc3RcIiwgXCJkZXYtdG9vbHNcIiwgXCJvcGVuZmluXCJdXHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGNvbnN0IHByb2Nlc3NNYW5hZ2VyOkFwcCA9IHtcclxuICAgIGFwcElkOiBcIm9wZW5maW4tcHJvY2Vzcy1tYW5hZ2VyXCIsXHJcbiAgICB0aXRsZTogXCJPcGVuRmluIFByb2Nlc3MgTWFuYWdlclwiLFxyXG4gICAgbWFuaWZlc3RUeXBlOiBcIm1hbmlmZXN0XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJQcm9jZXNzIE1hbmFnZXI6IFRoaXMgaXMgT3BlbkZpbidzIHRvb2wgZm9yIGhlbHBpbmcgZGV2ZWxvcGVycyBidWlsZCBPcGVuRmluIEFwcGxpY2F0aW9ucy4gSXQgbGV0cyB5b3Ugc2VlIHRoZSBPcGVuRmluIGFwcGxpY2F0aW9ucyB0aGF0IGFyZSBydW5uaW5nLCB0aGUgcGVyZm9ybWFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9ucyAobWVtb3J5IGFuZCBjcHUpIGFuZCBlYXN5IGFjY2VzcyB0byB0aGUgZGV2IHRvb2xzIGZvciB0aGUgV2luZG93cyBvZiB5b3VyIGFwcGxpY2F0aW9uLlwiLFxyXG4gICAgbWFuaWZlc3Q6IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9wcm9jZXNzLW1hbmFnZXIvYXBwLmpzb25cIixcclxuICAgIGljb25zOiBbXHJcbiAgICAgIHsgc3JjOiBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcHJvY2Vzcy1tYW5hZ2VyL2ltZy9wcm9jLW1nci1pY29uLnBuZ1wiIH1cclxuICAgIF0sXHJcbiAgICBjb250YWN0RW1haWw6IFwiY29udGFjdEBleGFtcGxlLmNvbVwiLFxyXG4gICAgc3VwcG9ydEVtYWlsOiBcInN1cHBvcnRAZXhhbXBsZS5jb21cIixcclxuICAgIHB1Ymxpc2hlcjogXCJPcGVuRmluXCIsXHJcbiAgICBpbnRlbnRzOiBbXSxcclxuICAgIGltYWdlczogW3tcclxuICAgICAgc3JjOlwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9wcmV2aWV3cy9vcGVuZmluLXByb2Nlc3MtbWFuYWdlci5wbmdcIlxyXG4gICAgfV0sXHJcbiAgICB0YWdzOltcImhlcm9cIiwgXCJhbGxcIiwgXCJtYW5pZmVzdFwiLCBcImRldi10b29sc1wiLCBcIm9wZW5maW5cIl1cclxuICB9O1xyXG5cclxuICBleHBvcnQgY29uc3QgZGV2ZWxvcGVyQ29udGVudDogQXBwID0ge1xyXG4gICAgYXBwSWQ6IFwib3BlbmZpbi1kZXZlbG9wZXItcGFnZVwiLFxyXG4gICAgdGl0bGU6IFwiT3BlbkZpbiBEZXZlbG9wZXIgRG9jc1wiLFxyXG4gICAgbWFuaWZlc3RUeXBlOiBcInNuYXBzaG90XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG93cyBhIGNvbGxlY3Rpb24gb2YgT3BlbkZpbiBkZXZlbG9wZXIgcGFnZXMgYW5kIHByb3ZpZGVzIGFuIGV4YW1wbGUgb2YgaG93IHlvdSBjYW4gcHJlc2VudCBhIHByZS1idWlsdCBwYWdlIGFzIGEgbGF1bmNoIHRhcmdldCBpbiBPcGVuRmluIEhvbWUuIFRoaXMgZW50cnkgaGFzIGEgbWFuaWZlc3QgdHlwZSBvZiAnc25hcHNob3QnLlwiLFxyXG4gICAgbWFuaWZlc3Q6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3NuYXBzaG90Lmpzb25cIixcclxuICAgIGljb25zOiBbXHJcbiAgICAgIHsgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvaWNvbi1ibHVlLnBuZ1wiIH1cclxuICAgIF0sXHJcbiAgICBjb250YWN0RW1haWw6IFwiY29udGFjdEBleGFtcGxlLmNvbVwiLFxyXG4gICAgc3VwcG9ydEVtYWlsOiBcInN1cHBvcnRAZXhhbXBsZS5jb21cIixcclxuICAgIHB1Ymxpc2hlcjogXCJPcGVuRmluXCIsXHJcbiAgICBpbnRlbnRzOiBbXSxcclxuICAgIGltYWdlczogW3tcclxuICAgICAgc3JjOlwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9wcmV2aWV3cy9vcGVuZmluLXBhZ2UtZG9jcy5wbmdcIlxyXG4gICAgfV0sXHJcbiAgICB0YWdzOltcImFsbFwiLCBcInBhZ2VcIiwgXCJkZXYtY29udGVudFwiLCBcIm9wZW5maW5cIl1cclxuICB9OyIsImltcG9ydCB7IFN0b3JlZnJvbnQsIGxhdW5jaEFwcCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcclxuaW1wb3J0IHtcclxuICBTdG9yZWZyb250TGFuZGluZ1BhZ2UsXHJcbiAgU3RvcmVmcm9udE5hdmlnYXRpb25TZWN0aW9uLFxyXG4gIFN0b3JlZnJvbnRGb290ZXIsXHJcbiAgU3RvcmVmcm9udFByb3ZpZGVyLFxyXG4gIFN0b3JlZnJvbnRUZW1wbGF0ZSxcclxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlL3NoYXBlc1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldEFwcHMsXHJcbiAgZXhwZXJvQXBwLFxyXG4gIG5vdGlmaWNhdGlvblN0dWRpbyxcclxuICBwcm9jZXNzTWFuYWdlcixcclxuICBkZXZlbG9wZXJDb250ZW50LFxyXG59IGZyb20gXCIuL2FwcHNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCkge1xyXG4gIGNvbnNvbGUubG9nKFwiSW5pdGlhbGlzaW5nIHRoZSBzdG9yZWZyb250IHByb3ZpZGVyLlwiKTtcclxuICBsZXQgcHJvdmlkZXIgPSBhd2FpdCBnZXRTdG9yZVByb3ZpZGVyKCk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IFN0b3JlZnJvbnQucmVnaXN0ZXIocHJvdmlkZXIpO1xyXG4gICAgY29uc29sZS5sb2coXCJTdG9yZWZyb250IHByb3ZpZGVyIGluaXRpYWxpc2VkLlwiKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgIFwiQW4gZXJyb3Igd2FzIGVuY291bnRlcmVkIHdoaWxlIHRyeWluZyB0byByZWdpc3RlciB0aGUgY29udGVudCBzdG9yZSBwcm92aWRlclwiLFxyXG4gICAgICBlcnJcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvdygpIHtcclxuICBjb25zb2xlLmxvZyhcIlNob3dpbmcgdGhlIHN0b3JlLlwiKTtcclxuICByZXR1cm4gU3RvcmVmcm9udC5zaG93KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoaWRlKCkge1xyXG4gIGNvbnNvbGUubG9nKFwiSGlkaW5nIHRoZSBzdG9yZS5cIik7XHJcbiAgcmV0dXJuIFN0b3JlZnJvbnQuc2hvdygpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRTdG9yZVByb3ZpZGVyKCk6IFByb21pc2U8U3RvcmVmcm9udFByb3ZpZGVyPiB7XHJcbiAgY29uc29sZS5sb2coXCJHZXR0aW5nIHRoZSBzdG9yZSBwcm92aWRlci5cIik7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBcIm15LWJhc2ljLXN0b3JlXCIsXHJcbiAgICB0aXRsZTogXCJCYXNpYyBTdG9yZVwiLFxyXG4gICAgZ2V0TmF2aWdhdGlvbjogZ2V0TmF2aWdhdGlvbi5iaW5kKHRoaXMpLFxyXG4gICAgZ2V0TGFuZGluZ1BhZ2U6IGdldExhbmRpbmdQYWdlLmJpbmQodGhpcyksXHJcbiAgICBnZXRGb290ZXI6IGdldEZvb3Rlci5iaW5kKHRoaXMpLFxyXG4gICAgZ2V0QXBwcyxcclxuICAgIGxhdW5jaEFwcDogbGF1bmNoQXBwLFxyXG4gIH07XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldE5hdmlnYXRpb24oKTogUHJvbWlzZTxcclxuICBbU3RvcmVmcm9udE5hdmlnYXRpb25TZWN0aW9uPywgU3RvcmVmcm9udE5hdmlnYXRpb25TZWN0aW9uP11cclxuPiB7XHJcbiAgY29uc29sZS5sb2coXCJTaG93aW5nIHRoZSBzdG9yZSBuYXZpZ2F0aW9uLlwiKTtcclxuXHJcbiAgbGV0IG5hdmlnYXRpb25TZWN0aW9uczogW1xyXG4gICAgU3RvcmVmcm9udE5hdmlnYXRpb25TZWN0aW9uPyxcclxuICAgIFN0b3JlZnJvbnROYXZpZ2F0aW9uU2VjdGlvbj9cclxuICBdID0gW1xyXG4gICAge1xyXG4gICAgICBpZDogXCJhcHBzXCIsXHJcbiAgICAgIHRpdGxlOiBcIkFwcHNcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJ2aWV3XCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJWaWV3c1wiLFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW2V4cGVyb0FwcF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwicGFnZVwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiUGFnZXNcIixcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtkZXZlbG9wZXJDb250ZW50XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJtYW5pZmVzdFwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiV2ViIEFwcHNcIixcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtub3RpZmljYXRpb25TdHVkaW8sIHByb2Nlc3NNYW5hZ2VyXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIG5hdmlnYXRpb25TZWN0aW9ucztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TGFuZGluZ1BhZ2UoKTogUHJvbWlzZTxTdG9yZWZyb250TGFuZGluZ1BhZ2U+IHtcclxuICBjb25zb2xlLmxvZyhcIkdldHRpbmcgdGhlIHN0b3JlIGxhbmRpbmcgcGFnZS5cIik7XHJcblxyXG4gIGxldCBsYW5kaW5nUGFnZTogU3RvcmVmcm9udExhbmRpbmdQYWdlID0ge1xyXG4gICAgaGVybzoge1xyXG4gICAgICB0aXRsZTogXCJDdXN0b20gSGVybyBUaXRsZVwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICBcIlRoaXMgaXMgYSBkZW1vbnN0cmF0aW9uIG9mIHRoZSBoZXJvIHNlY3Rpb24gdGhhdCB5b3UgY2FuIGNvbmZpZ3VyZSBmb3IgeW91ciBzdG9yZS5cIixcclxuICAgICAgY3RhOiB7XHJcbiAgICAgICAgaWQ6IFwiaGVyby0xXCIsXHJcbiAgICAgICAgdGl0bGU6IFwiSGVybyBBcHBzIVwiLFxyXG4gICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgYXBwczogW25vdGlmaWNhdGlvblN0dWRpbywgcHJvY2Vzc01hbmFnZXJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvc3VwZXJoZXJvLXVuc3BsYXNoLmpwZ1wiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRvcFJvdzoge1xyXG4gICAgICB0aXRsZTogXCJDdXN0b20gVG9wIFJvdyBDb250ZW50XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwidG9wLXJvdy1pdGVtLTFcIixcclxuICAgICAgICAgIHRpdGxlOiBcIkV4cGVyb1wiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgIFwiQSBjb2xsZWN0aW9uIG9mIGV4YW1wbGUgdmlld3MgZnJvbSBFeHBlcm8gc2hvd2luZyB0aGUgcG93ZXIgb2YgaW50ZXJvcCBhbmQgY29udGV4dCBzaGFyaW5nLlwiLFxyXG4gICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvY29kaW5nLTEtdW5zcGxhc2guanBnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW2V4cGVyb0FwcF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwidG9wLXJvdy1pdGVtLTJcIixcclxuICAgICAgICAgIHRpdGxlOiBcIkRldiBUb29sc1wiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgIFwiQSBjb2xsZWN0aW9uIG9mIGRldmVsb3BlciB0b29scyB0aGF0IGNhbiBhaWQgd2l0aCBidWlsZGluZyBhbmQgZGVidWdnaW5nIE9wZW5GaW4gYXBwbGljYXRpb25zLlwiLFxyXG4gICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvY29kaW5nLTItdW5zcGxhc2guanBnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW25vdGlmaWNhdGlvblN0dWRpbywgcHJvY2Vzc01hbmFnZXJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIG1pZGRsZVJvdzoge1xyXG4gICAgICB0aXRsZTpcclxuICAgICAgICBcIkEgY29sbGVjdGlvbiBvZiBzaW1wbGUgdmlld3MgdGhhdCBzaG93IGhvdyB0byBzaGFyZSBjb250ZXh0IHVzaW5nIHRoZSBJbnRlcm9wIEFQSS5cIixcclxuICAgICAgYXBwczogW2V4cGVyb0FwcF0sXHJcbiAgICB9LFxyXG4gICAgYm90dG9tUm93OiB7XHJcbiAgICAgIHRpdGxlOiBcIlF1aWNrIEFjY2Vzc1wiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcImJvdHRvbS1yb3ctaXRlbS0xXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJWaWV3c1wiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgIFwiQSBjb2xsZWN0aW9uIG9mIHZpZXdzIG1hZGUgYXZhaWxhYmxlIHRocm91Z2ggb3VyIGNhdGFsb2cuXCIsXHJcbiAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9jb2RpbmctNC11bnNwbGFzaC5qcGdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbZXhwZXJvQXBwXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJib3R0b20tcm93LWl0ZW0tMlwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiV2ViIEFwcHNcIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEgY29sbGVjdGlvbiBvZiB3ZWIgYXBwcyBidWlsdCB1c2luZyBPcGVuRmluLlwiLFxyXG4gICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvY29kaW5nLTUtdW5zcGxhc2guanBnXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW25vdGlmaWNhdGlvblN0dWRpbywgcHJvY2Vzc01hbmFnZXJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICByZXR1cm4gbGFuZGluZ1BhZ2U7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEZvb3RlcigpOiBQcm9taXNlPFN0b3JlZnJvbnRGb290ZXI+IHtcclxuICBjb25zb2xlLmxvZyhcIkdldHRpbmcgdGhlIHN0b3JlIGZvb3Rlci5cIik7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxvZ286IHsgc3JjOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9mYXZpY29uLmljb1wiLCBzaXplOiBcIjMyXCIgfSxcclxuICAgIHRleHQ6IFwiV2VsY29tZSB0byB0aGUgT3BlbkZpbiBTYW1wbGUgRm9vdGVyXCIsXHJcbiAgICBsaW5rczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiR2l0aHViXCIsXHJcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuZmluL3dvcmtzcGFjZS1zdGFydGVyXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogXCJZb3VUdWJlXCIsXHJcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3VzZXIvT3BlbkZpblRlY2hcIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbmltcG9ydCB7IGluaXQgYXMgcmVnaXN0ZXIsIHNob3csIGhpZGUgfSBmcm9tICcuL3N0b3JlJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgbGV0IHJlZ2lzdGVyU3RvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ2lzdGVyXCIpO1xyXG4gIGxldCBzaG93U3RvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dcIik7XHJcbiAgbGV0IGhpZGVTdG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkZVwiKTtcclxuXHJcbiAgcmVnaXN0ZXJTdG9yZS5vbmNsaWNrID0gYXN5bmMgKCk9PiB7XHJcbiAgICBhd2FpdCByZWdpc3RlcigpO1xyXG4gIH07XHJcblxyXG4gIHNob3dTdG9yZS5vbmNsaWNrID0gYXN5bmMgKCk9PiB7XHJcbiAgICBhd2FpdCBzaG93KCk7XHJcbiAgfTtcclxuXHJcbiAgaGlkZVN0b3JlLm9uY2xpY2sgPSBhc3luYyAoKT0+IHtcclxuICAgIGF3YWl0IGhpZGUoKTtcclxuICB9O1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFzeW5jICgpID0+IHtcclxuICBhd2FpdCBpbml0KCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==