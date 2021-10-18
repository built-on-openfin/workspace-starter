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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNMdUQ7QUFFdkQsS0FBSyxVQUFVLElBQUk7SUFDakIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFaEQsYUFBYSxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUcsRUFBRTtRQUNoQyxNQUFNLDRDQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBRyxFQUFFO1FBQzVCLE1BQU0sNENBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUYsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUcsRUFBRTtRQUM1QixNQUFNLDRDQUFJLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDckQsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3dvcmtzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tYWRkLWFwcGxpY2F0aW9uLXRvLXN0b3JlZnJvbnQtYmFzaWMvLi9jbGllbnQvc3JjL2FwcHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vY2xpZW50L3NyYy9zdG9yZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tYWRkLWFwcGxpY2F0aW9uLXRvLXN0b3JlZnJvbnQtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1hZGQtYXBwbGljYXRpb24tdG8tc3RvcmVmcm9udC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWFkZC1hcHBsaWNhdGlvbi10by1zdG9yZWZyb250LWJhc2ljLy4vY2xpZW50L3NyYy9wcm92aWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17ZDoobyxyKT0+e2Zvcih2YXIgdCBpbiByKWUubyhyLHQpJiYhZS5vKG8sdCkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLHQse2VudW1lcmFibGU6ITAsZ2V0OnJbdF19KX0sbzooZSxvKT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsbykscjplPT57XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX19LG89e307ZS5yKG8pLGUuZChvLHtTdG9yZWZyb250OigpPT4kLGxhdW5jaEFwcDooKT0+VH0pO3ZhciByLHQsbj17fTtlLnIobiksZS5kKG4se2hpZGU6KCk9PkMscmVnaXN0ZXI6KCk9PmIsc2hvdzooKT0+Rn0pLGZ1bmN0aW9uKGUpe2UuTG9jYWw9XCJsb2NhbFwiLGUuRGV2PVwiZGV2XCIsZS5TdGFnaW5nPVwic3RhZ2luZ1wiLGUuUHJvZD1cInByb2RcIn0odHx8KHQ9e30pKTtjb25zdCBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBmaW4saT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHByb2Nlc3N8fG51bGw9PT0ocj1wcm9jZXNzLmVudil8fHZvaWQgMD09PXJ8fHIuSkVTVF9XT1JLRVJfSUQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyksZD0oaT93aW5kb3cub3JpZ2luOnQuTG9jYWwsYSYmZmluLm1lLnV1aWQsYSYmZmluLm1lLm5hbWUsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEVOVj9FTlY6dC5Mb2NhbCx0LkxvY2FsLHQuRGV2LHQuU3RhZ2luZyx0LlByb2QsITApLHM9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfQVBJX1VSTCYmV09SS1NQQUNFX0FQSV9VUkwsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdPUktTUEFDRV9BUFBTX1VSTCYmV09SS1NQQUNFX0FQUFNfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9GT09URVJfVVJMJiZXT1JLU1BBQ0VfU1RPUkVGUk9OVF9GT09URVJfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9MQU5ESU5HX1BBR0VfVVJMJiZXT1JLU1BBQ0VfU1RPUkVGUk9OVF9MQU5ESU5HX1BBR0VfVVJMLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXT1JLU1BBQ0VfU1RPUkVGUk9OVF9OQVZJR0FUSU9OX1VSTCYmV09SS1NQQUNFX1NUT1JFRlJPTlRfTkFWSUdBVElPTl9VUkwsXCIjNzc5NWY3XCIpLGM9e3RyYWNlOiEwLGRlYnVnOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBMT0dfREVCVUcmJkxPR19ERUJVRyxpbmZvOiExLHdhcm46ITAsZXJyb3I6ITAsZmF0YWw6ITB9O2NvbnN0IHA9ZnVuY3Rpb24oZSxvKXtjb25zdCByPWAke2V9IDogYCx0PWBjb2xvcjoke3N9YDtyZXR1cm57dHJhY2U6Yy50cmFjZT8oZSwuLi5vKT0+e2NvbnNvbGUudHJhY2UoYCVjJHtyfSR7ZX1gLHQsLi4ubyl9OihlLC4uLm8pPT57fSxkZWJ1ZzpjLmRlYnVnPyhlLC4uLm8pPT57Y29uc29sZS5pbmZvKGAlYyR7cn0ke2V9YCxcImNvbG9yOiM4NmRiOTRcIiwuLi5vKX06KGUsLi4ubyk9Pnt9LGluZm86Yy5pbmZvPyhlLC4uLm8pPT57Y29uc29sZS5kZWJ1ZyhgJWMke3J9JHtlfWAsXCJjb2xvcjojZmZmZmZmXCIsLi4ubyl9OihlLC4uLm8pPT57fSx3YXJuOmMud2Fybj8oZSwuLi5vKT0+e2NvbnNvbGUud2FybihgJWMke3J9JHtlfWAsXCJjb2xvcjojZWRhZDY4XCIsLi4ubyl9OihlLC4uLm8pPT57fSxlcnJvcjpjLmVycm9yPyhlLG8sLi4udCk9Pntjb25zb2xlLmVycm9yKGAlYyR7cn0ke2V9YCxcImNvbG9yOiNmNTVkNjdcIiwuLi50LG8pfTooZSxvLC4uLnIpPT57fSxmYXRhbDpjLmZhdGFsPyhlLG8sLi4udCk9Pntjb25zb2xlLmVycm9yKGAlYyR7cn0ke2V9YCxcImNvbG9yOiNmNzA3MjNcIiwuLi50LG8pfTooZSxvLC4uLnIpPT57fX19KFwidXRpbHMuY2hhbm5lbHNcIiksZz1pJiZcImNvbXBsZXRlXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZuZXcgUHJvbWlzZSgoZT0+ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIiwoKCk9PntcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZlKCl9KSkpKTt2YXIgZix3LHUsbCxoOyFmdW5jdGlvbihlKXtlLldvcmtzcGFjZT1cIm9wZW5maW4tYnJvd3NlclwifShmfHwoZj17fSkpLGZ1bmN0aW9uKGUpe2UuVmlld1BhZ2VUaXRsZVVwZGF0ZWQ9XCJ2aWV3LXBhZ2UtdGl0bGUtdXBkYXRlZFwiLGUuVmlld0Rlc3Ryb3llZD1cInZpZXctZGVzdHJveWVkXCIsZS5SdW5SZXF1ZXN0ZWQ9XCJydW4tcmVxdWVzdGVkXCIsZS5XaW5kb3dPcHRpb25zQ2hhbmdlZD1cIndpbmRvdy1vcHRpb25zLWNoYW5nZWRcIixlLldpbmRvd0Nsb3NlZD1cIndpbmRvdy1jbG9zZWRcIixlLldpbmRvd0NyZWF0ZWQ9XCJ3aW5kb3ctY3JlYXRlZFwifSh3fHwodz17fSkpLGZ1bmN0aW9uKGUpe2UuRmluUHJvdG9jb2w9XCJmaW4tcHJvdG9jb2xcIn0odXx8KHU9e30pKSxmLldvcmtzcGFjZSxmLldvcmtzcGFjZSxmdW5jdGlvbihlKXtlLkhvbWU9XCJvcGVuZmluLWhvbWVcIixlLkRvY2s9XCJvcGVuZmluLWRvY2tcIixlLlN0b3JlZnJvbnQ9XCJvcGVuZmluLXN0b3JlZnJvbnRcIixlLkhvbWVJbnRlcm5hbD1cIm9wZW5maW4taG9tZS1pbnRlcm5hbFwiLGUuQnJvd3Nlck1lbnU9XCJvcGVuZmluLWJyb3dzZXItbWVudVwiLGUuQnJvd3NlckluZGljYXRvcj1cIm9wZW5maW4tYnJvd3Nlci1pbmRpY2F0b3JcIixlLkJyb3dzZXJXaW5kb3c9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtd2luZG93XCJ9KGx8fChsPXt9KSksZnVuY3Rpb24oZSl7ZS5TaG93bj1cInNob3duXCIsZS5Cb3VuZHNDaGFuZ2VkPVwiYm91bmRzLWNoYW5nZWRcIixlLkxheW91dFJlYWR5PVwibGF5b3V0LXJlYWR5XCIsZS5FbmRVc2VyQm91bmRzQ2hhbmdpbmc9XCJlbmQtdXNlci1ib3VuZHMtY2hhbmdpbmdcIixlLkJsdXJyZWQ9XCJibHVycmVkXCIsZS5DbG9zZVJlcXVlc3RlZD1cImNsb3NlLXJlcXVlc3RlZFwiLGUuRm9jdXNlZD1cImZvY3VzZWRcIixlLlNob3dSZXF1ZXN0ZWQ9XCJzaG93LXJlcXVlc3RlZFwiLGUuVmlld0NyYXNoZWQ9XCJ2aWV3LWNyYXNoZWRcIixlLlZpZXdBdHRhY2hlZD1cInZpZXctYXR0YWNoZWRcIixlLlZpZXdEZXRhY2hlZD1cInZpZXctZGV0YWNoZWRcIn0oaHx8KGg9e30pKSxsLkhvbWUsZi5Xb3Jrc3BhY2UsbC5Eb2NrLGYuV29ya3NwYWNlLGwuU3RvcmVmcm9udCxmLldvcmtzcGFjZTtjb25zdCB2PXtuYW1lOmYuV29ya3NwYWNlLHV1aWQ6Zi5Xb3Jrc3BhY2V9LFM9ZT0+ZnVuY3Rpb24oZSl7aWYoIWEpdGhyb3cgbmV3IEVycm9yKFwiZ2V0T0ZXaW5kb3cgY2FuIG9ubHkgYmUgdXNlZCBpbiBhbiBPcGVuRmluIGVudi4gQXZvaWQgY2FsbGluZyB0aGlzIG1ldGhvZCBkdXJpbmcgcHJlLXJlbmRlcmluZy5cIik7cmV0dXJuIGZpbi5XaW5kb3cud3JhcFN5bmMoZSl9KGUpLmdldE9wdGlvbnMoKS50aGVuKCgoKT0+ITApKS5jYXRjaCgoKCk9PiExKSk7dmFyIFAsUjsoUj1QfHwoUD17fSkpLkxhdW5jaEFwcD1cImxhdW5jaC1hcHBcIixSLkNyZWF0ZVdvcmtzcGFjZT1cImNyZWF0ZS13b3Jrc3BhY2VcIixSLlVwZGF0ZVdvcmtzcGFjZT1cInVwZGF0ZS13b3Jrc3BhY2VcIixSLkRlbGV0ZVdvcmtzcGFjZT1cImRlbGV0ZS13b3Jrc3BhY2VcIixSLkxhdW5jaFdvcmtzcGFjZT1cImxhdW5jaC13b3Jrc3BhY2VcIixSLlNoYXJlV29ya3NwYWNlPVwic2hhcmUtd29ya3NwYWNlXCIsUi5HZXRXb3Jrc3BhY2U9XCJnZXQtd29ya3NwYWNlXCIsUi5HZXRXb3Jrc3BhY2VMaXN0PVwiZ2V0LXdvcmtzcGFjZS1saXN0XCIsUi5HZXRBY3RpdmVXb3Jrc3BhY2U9XCJnZXQtYWN0aXZlLXdvcmtzcGFjZVwiLFIuR2V0UGFnZT1cImdldC1wYWdlXCIsUi5DcmVhdGVQYWdlPVwiY3JlYXRlLXBhZ2VcIixSLlVwZGF0ZVBhZ2U9XCJ1cGRhdGUtcGFnZVwiLFIuUmVuYW1lUGFnZT1cInJlbmFtZS1wYWdlXCIsUi5EZWxldGVQYWdlPVwiZGVsZXRlLXBhZ2VcIixSLlNoYXJlUGFnZT1cInNoYXJlLXBhZ2VcIixSLkxhdW5jaFBhZ2U9XCJsYXVuY2gtcGFnZVwiLFIuQXR0YWNoUGFnZXNUb1dpbmRvdz1cImF0dGFjaC1wYWdlcy10by13aW5kb3dcIixSLkRldGFjaFBhZ2VzRnJvbVdpbmRvdz1cImRldGFjaC1wYWdlcy1mcm9tLXdpbmRvd1wiLFIuUmVvcmRlclBhZ2VzRm9yV2luZG93PVwicmVvcmRlci1wYWdlcy1mb3Itd2luZG93XCIsUi5TZXRBY3RpdmVQYWdlRm9yV2luZG93PVwic2V0LWFjdGl2ZS1wYWdlLWZvci13aW5kb3dcIixSLkdldFNhdmVkUGFnZUxpc3Q9XCJnZXQtc2F2ZWQtcGFnZS1saXN0XCIsUi5HZXRBdHRhY2hlZFBhZ2VMaXN0PVwiZ2V0LXJ1bm5pbmctcGFnZS1saXN0XCIsUi5HZXRBbGxQYWdlTGlzdD1cImdldC1hbGwtcGFnZS1saXN0XCIsUi5HZXRBY3RpdmVQYWdlSWRGb3JXaW5kb3c9XCJnZXQtYWN0aXZlLXBhZ2UtaWQtZm9yLXdpbmRvd1wiLFIuR2V0UGFnZXNGb3JXaW5kb3c9XCJnZXQtcGFnZXMtZm9yLXdpbmRvd1wiLFIuR2V0U2F2ZWRQYWdlTWV0YWRhdGE9XCJnZXQtc2F2ZWQtcGFnZS1tZXRhZGF0YVwiLFIuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXI9XCJyZWdpc3Rlci1zdG9yZWZyb250LXByb3ZpZGVyXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJzPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXJzXCIsUi5IaWRlU3RvcmVmcm9udD1cImhpZGUtc3RvcmVmcm9udFwiLFIuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcz1cImdldC1zdG9yZWZyb250LXByb3ZpZGVyLWFwcHNcIixSLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlPVwiZ2V0LXN0b3JlZnJvbnQtcHJvdmlkZXItbGFuZGluZy1wYWdlXCIsUi5HZXRTdG9yZWZyb250UHJvdmlkZXJGb290ZXI9XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1mb290ZXJcIixSLkdldFN0b3JlZnJvbnRQcm92aWRlck5hdmlnYXRpb249XCJnZXQtc3RvcmVmcm9udC1wcm92aWRlci1uYXZpZ2F0aW9uXCIsUi5MYXVuY2hTdG9yZWZyb250UHJvdmlkZXJBcHA9XCJsYXVuY2gtc3RvcmVmcm9udC1wcm92aWRlci1hcHBcIixSLlNob3dTdG9yZWZyb250PVwic2hvdy1zdG9yZWZyb250XCIsUi5DcmVhdGVTdG9yZWZyb250V2luZG93PVwiY3JlYXRlLXN0b3JlZnJvbnQtd2luZG93XCIsUi5DcmVhdGVCcm93c2VyV2luZG93PVwiY3JlYXRlLWJyb3dzZXItd2luZG93XCI7Y29uc3QgeT1mdW5jdGlvbihlKXtsZXQgbztyZXR1cm4oKT0+e2lmKCFhKXRocm93IG5ldyBFcnJvcihcImdldENoYW5uZWxDbGllbnQgY2Fubm90IGJlIHVzZWQgb3V0c2lkZSBhbiBPcGVuRmluIGVudi4gQXZvaWQgdXNpbmcgdGhpcyBtZXRob2QgZHVyaW5nIHByZS1yZW5kZXJpbmcuXCIpO3JldHVybiBvfHwocC5kZWJ1ZyhgY29ubmVjdGluZyB0byBjaGFubmVsIHByb3ZpZGVyICR7ZX1gKSxvPShhc3luYygpPT57YXdhaXQgZztjb25zdCByPWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlKTtyZXR1cm4gci5vbkRpc2Nvbm5lY3Rpb24oKGFzeW5jKCk9PntwLndhcm4oYGRpc2Nvbm5lY3RlZCBmcm9tIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWApLG89dm9pZCAwfSkpLHJ9KSgpLnRoZW4oKG89PihwLmRlYnVnKGBjb25uZWN0ZWQgdG8gY2hhbm5lbCBwcm92aWRlciAke2V9YCksbykpKS5jYXRjaCgobz0+e3AuZXJyb3IoYGZhaWxlZCB0byBjb25uZWN0IHRvIGNoYW5uZWwgcHJvdmlkZXIgJHtlfWAsbyl9KSkpLG99fShcIl9fb2Zfd29ya3NwYWNlX3Byb3RvY29sX19cIiksQT1hc3luYygpPT57aWYoIWF3YWl0IFModikpcmV0dXJuIGZpbi5TeXN0ZW0ub3BlblVybFdpdGhCcm93c2VyKCgoKT0+e2NvbnN0IGU9bmV3IFVSTChcImZpbnM6Ly9jZG4ub3BlbmZpbi5jby93b3Jrc3BhY2UvZGV2L2FwcC5qc29uXCIpO3JldHVybiBlLnNlYXJjaFBhcmFtcy5hcHBlbmQoXCJpc0xhdW5jaGVkVmlhTGliXCIsZC50b1N0cmluZygpKSxlLnRvU3RyaW5nKCl9KSgpKX0sVz1hc3luYygpPT4oYXdhaXQgQSgpLHkoKSk7dmFyIE8sXyxMO2xldCBFOyFmdW5jdGlvbihlKXtlLlNuYXBzaG90PVwic25hcHNob3RcIixlLk1hbmlmZXN0PVwibWFuaWZlc3RcIixlLlZpZXc9XCJ2aWV3XCIsZS5FeHRlcm5hbD1cImV4dGVybmFsXCJ9KE98fChPPXt9KSksKEw9X3x8KF89e30pKS5MYW5kaW5nUGFnZT1cImxhbmRpbmdQYWdlXCIsTC5BcHBHcmlkPVwiYXBwR3JpZFwiO2NvbnN0IG09bmV3IE1hcDtsZXQgRz0hMTtjb25zdCBrPWU9PntpZighbS5oYXMoZSkpdGhyb3cgbmV3IEVycm9yKGBTdG9yZWZyb250IFByb3ZpZGVyIHdpdGggaWQgJHtlfSBpcyBub3QgcmVnaXN0ZXJlZGApO3JldHVybiBtLmdldChlKX0sYj1lPT4oRT0oYXN5bmMgZT0+e2NvbnN0IG89YXdhaXQgVygpO2lmKG0uaGFzKGUuaWQpKXRocm93IG5ldyBFcnJvcihgU3RvcmVmcm9udCBwcm92aWRlciB3aXRoIGlkICR7ZS5pZH0gYWxyZWFkeSByZWdpc3RlcmVkYCk7cmV0dXJuIG0uc2V0KGUuaWQsZSksKGU9PntHfHwoRz0hMCxlLnJlZ2lzdGVyKFAuR2V0U3RvcmVmcm9udFByb3ZpZGVyQXBwcywoZT0+ayhlKS5nZXRBcHBzKCkpKSxlLnJlZ2lzdGVyKFAuR2V0U3RvcmVmcm9udFByb3ZpZGVyRm9vdGVyLChlPT5rKGUpLmdldEZvb3RlcigpKSksZS5yZWdpc3RlcihQLkdldFN0b3JlZnJvbnRQcm92aWRlckxhbmRpbmdQYWdlLChlPT5rKGUpLmdldExhbmRpbmdQYWdlKCkpKSxlLnJlZ2lzdGVyKFAuR2V0U3RvcmVmcm9udFByb3ZpZGVyTmF2aWdhdGlvbiwoZT0+ayhlKS5nZXROYXZpZ2F0aW9uKCkpKSxlLnJlZ2lzdGVyKFAuTGF1bmNoU3RvcmVmcm9udFByb3ZpZGVyQXBwLCgoe2lkOmUsYXBwOm99KT0+ayhlKS5sYXVuY2hBcHAobykpKSl9KShvKSxvLmRpc3BhdGNoKFAuUmVnaXN0ZXJTdG9yZWZyb250UHJvdmlkZXIsZSl9KShlKSxFKSxDPWFzeW5jKCk9Pnthd2FpdCBFLGF3YWl0IEEoKSxhd2FpdChhc3luYygpPT4oYXdhaXQgeSgpKS5kaXNwYXRjaChQLkhpZGVTdG9yZWZyb250LHZvaWQgMCkpKCl9LEY9YXN5bmMoKT0+e2F3YWl0IEUsYXdhaXQgQSgpLGF3YWl0KGFzeW5jKCk9Pihhd2FpdCB5KCkpLmRpc3BhdGNoKFAuU2hvd1N0b3JlZnJvbnQsbnVsbCkpKCl9LFQ9YXN5bmMgZT0+KGF3YWl0IFcoKSkuZGlzcGF0Y2goUC5MYXVuY2hBcHAsZSksJD1uO21vZHVsZS5leHBvcnRzPW99KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS9zaGFwZXNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBcHBzKCk6IFByb21pc2U8QXBwW10+IHtcclxuICAgIHJldHVybiBbZXhwZXJvQXBwLCBub3RpZmljYXRpb25TdHVkaW8sIHByb2Nlc3NNYW5hZ2VyLCBkZXZlbG9wZXJDb250ZW50XTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGV4cGVyb0FwcDpBcHAgPSB7XHJcbiAgICBhcHBJZDogXCJleHBlcm8tY29tcGFueS1uZXdzXCIsXHJcbiAgICB0aXRsZTogXCJHYXRld2F5IC0gQ29tcGFueSBOZXdzXCIsXHJcbiAgICBtYW5pZmVzdDogXCJodHRwczovL29wZW5maW4taWV4LmV4cGVyb2xhYnMuY29tL29wZW5maW4vbWFuaWZlc3RzL2NvbXBhbnktbmV3cy5qc29uXCIsXHJcbiAgICBtYW5pZmVzdFR5cGU6IFwidmlld1wiLFxyXG4gICAgaWNvbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCJodHRwczovL29wZW5maW4taWV4LmV4cGVyb2xhYnMuY29tL2Zhdmljb24uaWNvXCJcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIGNvbnRhY3RFbWFpbDogXCJjb250YWN0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBzdXBwb3J0RW1haWw6IFwic3VwcG9ydEBleGFtcGxlLmNvbVwiLFxyXG4gICAgcHVibGlzaGVyOiBcIkV4cGVyb1wiLFxyXG4gICAgaW50ZW50czogW10sXHJcbiAgICBpbWFnZXM6IFt7XHJcbiAgICAgIHNyYzpcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvcHJldmlld3MvZXhwZXJvLW5ld3Mtdmlldy5wbmdcIlxyXG4gICAgfV0sXHJcbiAgICB0YWdzOltcImV4cGVyb1wiLCBcImFsbFwiLCBcInZpZXdcIiwgXCJpbnRlcm9wXCJdXHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0IGNvbnN0IG5vdGlmaWNhdGlvblN0dWRpbzpBcHAgPSAge1xyXG4gICAgYXBwSWQ6IFwibm90aWZpY2F0aW9ucy1nZW5lcmF0b3JcIixcclxuICAgIHRpdGxlOiBcIk9wZW5GaW4gTm90aWZpY2F0aW9ucyBTdHVkaW9cIixcclxuICAgIG1hbmlmZXN0VHlwZTogXCJtYW5pZmVzdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTm90aWZpY2F0aW9ucyBTdHVkaW86IFRoaXMgaXMgT3BlbkZpbidzIHRvb2wgZm9yIGRlbW9uc3RyYXRpbmcgdGhlIHBvd2VyIG9mIG91ciBOb3RpZmljYXRpb24gQ2VudGVyLiBVc2UgaXQgdG8gY3JlYXRlIGxvY2FsIG5vdGlmaWNhdGlvbnMgb3IgdXNlIHNvbWUgb2YgdGhlIGV4YW1wbGVzIHNob3duIGluIG91ciBDYXRhbG9nLiBFeHBlcmltZW50IHdpdGggb3VyIGZlYXR1cmVzIGFuZCBzZWUgdGhlIHBvd2VyIHRoYXQgT3BlbkZpbiBOb3RpZmljYXRpb24gQ2VudGVyIGNhbiBicmluZyB0byB5b3VyIGFwcGxpY2F0aW9ucy5cIixcclxuICAgIG1hbmlmZXN0OiBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vc3R1ZGlvL25vdGlmaWNhdGlvbi9hcHAuanNvblwiLFxyXG4gICAgaWNvbnM6IFtcclxuICAgICAgeyBzcmM6IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9kZW1vcy9ub3RpZmljYXRpb25zL2dlbmVyYXRvci9pbWFnZXMvaWNvbi1ibHVlLnBuZ1wifVxyXG4gICAgXSxcclxuICAgIGNvbnRhY3RFbWFpbDogXCJjb250YWN0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBzdXBwb3J0RW1haWw6IFwic3VwcG9ydEBleGFtcGxlLmNvbVwiLFxyXG4gICAgcHVibGlzaGVyOiBcIk9wZW5GaW5cIixcclxuICAgIGludGVudHM6IFtdLFxyXG4gICAgaW1hZ2VzOiBbe1xyXG4gICAgICBzcmM6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL3ByZXZpZXdzL29wZW5maW4tbm90aWZpY2F0aW9uLXN0dWRpby5wbmdcIlxyXG4gICAgfV0sXHJcbiAgICB0YWdzOltcImhlcm9cIiwgXCJhbGxcIiwgXCJtYW5pZmVzdFwiLCBcImRldi10b29sc1wiLCBcIm9wZW5maW5cIl1cclxuICB9O1xyXG5cclxuICBleHBvcnQgY29uc3QgcHJvY2Vzc01hbmFnZXI6QXBwID0ge1xyXG4gICAgYXBwSWQ6IFwib3BlbmZpbi1wcm9jZXNzLW1hbmFnZXJcIixcclxuICAgIHRpdGxlOiBcIk9wZW5GaW4gUHJvY2VzcyBNYW5hZ2VyXCIsXHJcbiAgICBtYW5pZmVzdFR5cGU6IFwibWFuaWZlc3RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlByb2Nlc3MgTWFuYWdlcjogVGhpcyBpcyBPcGVuRmluJ3MgdG9vbCBmb3IgaGVscGluZyBkZXZlbG9wZXJzIGJ1aWxkIE9wZW5GaW4gQXBwbGljYXRpb25zLiBJdCBsZXRzIHlvdSBzZWUgdGhlIE9wZW5GaW4gYXBwbGljYXRpb25zIHRoYXQgYXJlIHJ1bm5pbmcsIHRoZSBwZXJmb3JtYW5jZSBvZiB0aGUgYXBwbGljYXRpb25zIChtZW1vcnkgYW5kIGNwdSkgYW5kIGVhc3kgYWNjZXNzIHRvIHRoZSBkZXYgdG9vbHMgZm9yIHRoZSBXaW5kb3dzIG9mIHlvdXIgYXBwbGljYXRpb24uXCIsXHJcbiAgICBtYW5pZmVzdDogXCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3Byb2Nlc3MtbWFuYWdlci9hcHAuanNvblwiLFxyXG4gICAgaWNvbnM6IFtcclxuICAgICAgeyBzcmM6IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9wcm9jZXNzLW1hbmFnZXIvaW1nL3Byb2MtbWdyLWljb24ucG5nXCIgfVxyXG4gICAgXSxcclxuICAgIGNvbnRhY3RFbWFpbDogXCJjb250YWN0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBzdXBwb3J0RW1haWw6IFwic3VwcG9ydEBleGFtcGxlLmNvbVwiLFxyXG4gICAgcHVibGlzaGVyOiBcIk9wZW5GaW5cIixcclxuICAgIGludGVudHM6IFtdLFxyXG4gICAgaW1hZ2VzOiBbe1xyXG4gICAgICBzcmM6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL3ByZXZpZXdzL29wZW5maW4tcHJvY2Vzcy1tYW5hZ2VyLnBuZ1wiXHJcbiAgICB9XSxcclxuICAgIHRhZ3M6W1wiaGVyb1wiLCBcImFsbFwiLCBcIm1hbmlmZXN0XCIsIFwiZGV2LXRvb2xzXCIsIFwib3BlbmZpblwiXVxyXG4gIH07XHJcblxyXG4gIGV4cG9ydCBjb25zdCBkZXZlbG9wZXJDb250ZW50OiBBcHAgPSB7XHJcbiAgICBhcHBJZDogXCJvcGVuZmluLWRldmVsb3Blci1wYWdlXCIsXHJcbiAgICB0aXRsZTogXCJPcGVuRmluIERldmVsb3BlciBEb2NzXCIsXHJcbiAgICBtYW5pZmVzdFR5cGU6IFwic25hcHNob3RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3dzIGEgY29sbGVjdGlvbiBvZiBPcGVuRmluIGRldmVsb3BlciBwYWdlcyBhbmQgcHJvdmlkZXMgYW4gZXhhbXBsZSBvZiBob3cgeW91IGNhbiBwcmVzZW50IGEgcHJlLWJ1aWx0IHBhZ2UgYXMgYSBsYXVuY2ggdGFyZ2V0IGluIE9wZW5GaW4gSG9tZS4gVGhpcyBlbnRyeSBoYXMgYSBtYW5pZmVzdCB0eXBlIG9mICdzbmFwc2hvdCcuXCIsXHJcbiAgICBtYW5pZmVzdDogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvc25hcHNob3QuanNvblwiLFxyXG4gICAgaWNvbnM6IFtcclxuICAgICAgeyBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9pY29uLWJsdWUucG5nXCIgfVxyXG4gICAgXSxcclxuICAgIGNvbnRhY3RFbWFpbDogXCJjb250YWN0QGV4YW1wbGUuY29tXCIsXHJcbiAgICBzdXBwb3J0RW1haWw6IFwic3VwcG9ydEBleGFtcGxlLmNvbVwiLFxyXG4gICAgcHVibGlzaGVyOiBcIk9wZW5GaW5cIixcclxuICAgIGludGVudHM6IFtdLFxyXG4gICAgaW1hZ2VzOiBbe1xyXG4gICAgICBzcmM6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL3ByZXZpZXdzL29wZW5maW4tcGFnZS1kb2NzLnBuZ1wiXHJcbiAgICB9XSxcclxuICAgIHRhZ3M6W1wiYWxsXCIsIFwicGFnZVwiLCBcImRldi1jb250ZW50XCIsIFwib3BlbmZpblwiXVxyXG4gIH07IiwiaW1wb3J0IHsgU3RvcmVmcm9udCwgbGF1bmNoQXBwIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xyXG5pbXBvcnQge1xyXG4gIFN0b3JlZnJvbnRMYW5kaW5nUGFnZSxcclxuICBTdG9yZWZyb250TmF2aWdhdGlvblNlY3Rpb24sXHJcbiAgU3RvcmVmcm9udEZvb3RlcixcclxuICBTdG9yZWZyb250UHJvdmlkZXIsXHJcbiAgU3RvcmVmcm9udFRlbXBsYXRlLFxyXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2Uvc2hhcGVzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0QXBwcyxcclxuICBleHBlcm9BcHAsXHJcbiAgbm90aWZpY2F0aW9uU3R1ZGlvLFxyXG4gIHByb2Nlc3NNYW5hZ2VyLFxyXG4gIGRldmVsb3BlckNvbnRlbnQsXHJcbn0gZnJvbSBcIi4vYXBwc1wiO1xyXG5cclxubGV0IHN0b3JlQ291bnQgPSAwO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY29uc29sZS5sb2coXCJJbml0aWFsaXNpbmcgdGhlIHN0b3JlZnJvbnQgcHJvdmlkZXIuXCIpO1xyXG4gIGxldCBwcm92aWRlciA9IGF3YWl0IGdldFN0b3JlUHJvdmlkZXIoKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgU3RvcmVmcm9udC5yZWdpc3Rlcihwcm92aWRlcik7XHJcbiAgICBjb25zb2xlLmxvZyhcIlN0b3JlZnJvbnQgcHJvdmlkZXIgaW5pdGlhbGlzZWQuXCIpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihcclxuICAgICAgXCJBbiBlcnJvciB3YXMgZW5jb3VudGVyZWQgd2hpbGUgdHJ5aW5nIHRvIHJlZ2lzdGVyIHRoZSBjb250ZW50IHN0b3JlIHByb3ZpZGVyXCIsXHJcbiAgICAgIGVyclxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93KCkge1xyXG4gIGNvbnNvbGUubG9nKFwiU2hvd2luZyB0aGUgc3RvcmUuXCIpO1xyXG4gIHJldHVybiBTdG9yZWZyb250LnNob3coKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgY29uc29sZS5sb2coXCJIaWRpbmcgdGhlIHN0b3JlLlwiKTtcclxuICByZXR1cm4gU3RvcmVmcm9udC5zaG93KCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFN0b3JlUHJvdmlkZXIoKTogUHJvbWlzZTxTdG9yZWZyb250UHJvdmlkZXI+IHtcclxuICBjb25zb2xlLmxvZyhcIkdldHRpbmcgdGhlIHN0b3JlIHByb3ZpZGVyLlwiKTtcclxuICBzdG9yZUNvdW50Kys7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBcIm15LWJhc2ljLXN0b3JlLVwiICsgc3RvcmVDb3VudCxcclxuICAgIHRpdGxlOiBcIkJhc2ljIFN0b3JlIFwiICArIHN0b3JlQ291bnQsXHJcbiAgICBnZXROYXZpZ2F0aW9uOiBnZXROYXZpZ2F0aW9uLmJpbmQodGhpcyksXHJcbiAgICBnZXRMYW5kaW5nUGFnZTogZ2V0TGFuZGluZ1BhZ2UuYmluZCh0aGlzKSxcclxuICAgIGdldEZvb3RlcjogZ2V0Rm9vdGVyLmJpbmQodGhpcyksXHJcbiAgICBnZXRBcHBzLFxyXG4gICAgbGF1bmNoQXBwOiBsYXVuY2hBcHAsXHJcbiAgfTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TmF2aWdhdGlvbigpOiBQcm9taXNlPFxyXG4gIFtTdG9yZWZyb250TmF2aWdhdGlvblNlY3Rpb24/LCBTdG9yZWZyb250TmF2aWdhdGlvblNlY3Rpb24/XVxyXG4+IHtcclxuICBjb25zb2xlLmxvZyhcIlNob3dpbmcgdGhlIHN0b3JlIG5hdmlnYXRpb24uXCIpO1xyXG5cclxuICBsZXQgbmF2aWdhdGlvblNlY3Rpb25zOiBbXHJcbiAgICBTdG9yZWZyb250TmF2aWdhdGlvblNlY3Rpb24/LFxyXG4gICAgU3RvcmVmcm9udE5hdmlnYXRpb25TZWN0aW9uP1xyXG4gIF0gPSBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiBcImFwcHNcIixcclxuICAgICAgdGl0bGU6IFwiQXBwc1wiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcInZpZXdcIixcclxuICAgICAgICAgIHRpdGxlOiBcIlZpZXdzXCIsXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbZXhwZXJvQXBwXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJwYWdlXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJQYWdlc1wiLFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW2RldmVsb3BlckNvbnRlbnRdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcIm1hbmlmZXN0XCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJXZWIgQXBwc1wiLFxyXG4gICAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGE6IHtcclxuICAgICAgICAgICAgYXBwczogW25vdGlmaWNhdGlvblN0dWRpbywgcHJvY2Vzc01hbmFnZXJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICByZXR1cm4gbmF2aWdhdGlvblNlY3Rpb25zO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRMYW5kaW5nUGFnZSgpOiBQcm9taXNlPFN0b3JlZnJvbnRMYW5kaW5nUGFnZT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiR2V0dGluZyB0aGUgc3RvcmUgbGFuZGluZyBwYWdlLlwiKTtcclxuXHJcbiAgbGV0IGxhbmRpbmdQYWdlOiBTdG9yZWZyb250TGFuZGluZ1BhZ2UgPSB7XHJcbiAgICBoZXJvOiB7XHJcbiAgICAgIHRpdGxlOiBcIkN1c3RvbSBIZXJvIFRpdGxlXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgIFwiVGhpcyBpcyBhIGRlbW9uc3RyYXRpb24gb2YgdGhlIGhlcm8gc2VjdGlvbiB0aGF0IHlvdSBjYW4gY29uZmlndXJlIGZvciB5b3VyIHN0b3JlLlwiLFxyXG4gICAgICBjdGE6IHtcclxuICAgICAgICBpZDogXCJoZXJvLTFcIixcclxuICAgICAgICB0aXRsZTogXCJIZXJvIEFwcHMhXCIsXHJcbiAgICAgICAgdGVtcGxhdGVJZDogXCJhcHBHcmlkXCIgYXMgU3RvcmVmcm9udFRlbXBsYXRlLkFwcEdyaWQsXHJcbiAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICBhcHBzOiBbbm90aWZpY2F0aW9uU3R1ZGlvLCBwcm9jZXNzTWFuYWdlcl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgaW1hZ2U6IHtcclxuICAgICAgICBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9zdXBlcmhlcm8tdW5zcGxhc2guanBnXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdG9wUm93OiB7XHJcbiAgICAgIHRpdGxlOiBcIkN1c3RvbSBUb3AgUm93IENvbnRlbnRcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJ0b3Atcm93LWl0ZW0tMVwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiRXhwZXJvXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgXCJBIGNvbGxlY3Rpb24gb2YgZXhhbXBsZSB2aWV3cyBmcm9tIEV4cGVybyBzaG93aW5nIHRoZSBwb3dlciBvZiBpbnRlcm9wIGFuZCBjb250ZXh0IHNoYXJpbmcuXCIsXHJcbiAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9jb2RpbmctMS11bnNwbGFzaC5qcGdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbZXhwZXJvQXBwXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogXCJ0b3Atcm93LWl0ZW0tMlwiLFxyXG4gICAgICAgICAgdGl0bGU6IFwiRGV2IFRvb2xzXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgXCJBIGNvbGxlY3Rpb24gb2YgZGV2ZWxvcGVyIHRvb2xzIHRoYXQgY2FuIGFpZCB3aXRoIGJ1aWxkaW5nIGFuZCBkZWJ1Z2dpbmcgT3BlbkZpbiBhcHBsaWNhdGlvbnMuXCIsXHJcbiAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9jb2RpbmctMi11bnNwbGFzaC5qcGdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbbm90aWZpY2F0aW9uU3R1ZGlvLCBwcm9jZXNzTWFuYWdlcl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgbWlkZGxlUm93OiB7XHJcbiAgICAgIHRpdGxlOlxyXG4gICAgICAgIFwiQSBjb2xsZWN0aW9uIG9mIHNpbXBsZSB2aWV3cyB0aGF0IHNob3cgaG93IHRvIHNoYXJlIGNvbnRleHQgdXNpbmcgdGhlIEludGVyb3AgQVBJLlwiLFxyXG4gICAgICBhcHBzOiBbZXhwZXJvQXBwXSxcclxuICAgIH0sXHJcbiAgICBib3R0b21Sb3c6IHtcclxuICAgICAgdGl0bGU6IFwiUXVpY2sgQWNjZXNzXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IFwiYm90dG9tLXJvdy1pdGVtLTFcIixcclxuICAgICAgICAgIHRpdGxlOiBcIlZpZXdzXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgXCJBIGNvbGxlY3Rpb24gb2Ygdmlld3MgbWFkZSBhdmFpbGFibGUgdGhyb3VnaCBvdXIgY2F0YWxvZy5cIixcclxuICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvaW1hZ2VzL2NvZGluZy00LXVuc3BsYXNoLmpwZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiYXBwR3JpZFwiIGFzIFN0b3JlZnJvbnRUZW1wbGF0ZS5BcHBHcmlkLFxyXG4gICAgICAgICAgdGVtcGxhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgIGFwcHM6IFtleHBlcm9BcHBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiBcImJvdHRvbS1yb3ctaXRlbS0yXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJXZWIgQXBwc1wiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQSBjb2xsZWN0aW9uIG9mIHdlYiBhcHBzIGJ1aWx0IHVzaW5nIE9wZW5GaW4uXCIsXHJcbiAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2ltYWdlcy9jb2RpbmctNS11bnNwbGFzaC5qcGdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0ZW1wbGF0ZUlkOiBcImFwcEdyaWRcIiBhcyBTdG9yZWZyb250VGVtcGxhdGUuQXBwR3JpZCxcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICBhcHBzOiBbbm90aWZpY2F0aW9uU3R1ZGlvLCBwcm9jZXNzTWFuYWdlcl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIHJldHVybiBsYW5kaW5nUGFnZTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9vdGVyKCk6IFByb21pc2U8U3RvcmVmcm9udEZvb3Rlcj4ge1xyXG4gIGNvbnNvbGUubG9nKFwiR2V0dGluZyB0aGUgc3RvcmUgZm9vdGVyLlwiKTtcclxuICByZXR1cm4ge1xyXG4gICAgbG9nbzogeyBzcmM6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2Zhdmljb24uaWNvXCIsIHNpemU6IFwiMzJcIiB9LFxyXG4gICAgdGV4dDogXCJXZWxjb21lIHRvIHRoZSBPcGVuRmluIFNhbXBsZSBGb290ZXJcIixcclxuICAgIGxpbmtzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogXCJHaXRodWJcIixcclxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL29wZW5maW4vd29ya3NwYWNlLXN0YXJ0ZXJcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiBcIllvdVR1YmVcIixcclxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vdXNlci9PcGVuRmluVGVjaFwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcclxuaW1wb3J0IHsgaW5pdCBhcyByZWdpc3Rlciwgc2hvdywgaGlkZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcclxuICBsZXQgcmVnaXN0ZXJTdG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXJcIik7XHJcbiAgbGV0IHNob3dTdG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd1wiKTtcclxuICBsZXQgaGlkZVN0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlXCIpO1xyXG5cclxuICByZWdpc3RlclN0b3JlLm9uY2xpY2sgPSBhc3luYyAoKT0+IHtcclxuICAgIGF3YWl0IHJlZ2lzdGVyKCk7XHJcbiAgfTtcclxuXHJcbiAgc2hvd1N0b3JlLm9uY2xpY2sgPSBhc3luYyAoKT0+IHtcclxuICAgIGF3YWl0IHNob3coKTtcclxuICB9O1xyXG5cclxuICBoaWRlU3RvcmUub25jbGljayA9IGFzeW5jICgpPT4ge1xyXG4gICAgYXdhaXQgaGlkZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IGluaXQoKTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9