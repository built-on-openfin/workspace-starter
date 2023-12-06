/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/manifest-types.ts":
/*!************************************************!*\
  !*** ./client/src/framework/manifest-types.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MANIFEST_TYPES: () => (/* binding */ MANIFEST_TYPES)
/* harmony export */ });
const MANIFEST_TYPES = {
    View: {
        id: "view",
        label: "View",
        description: "This manifest type expects the manifest setting to be pointed to a json file that contains view options."
    },
    InlineView: {
        id: "inline-view",
        label: "View",
        description: "This manifest type expects the manifest setting to have the options inline rather than a url to a json file."
    },
    Window: {
        id: "window",
        label: "Window",
        description: "This manifest type expects the manifest setting to point to a json file that contains classic window options."
    },
    InlineWindow: {
        id: "inline-window",
        label: "Window",
        description: "This manifest type expects the manifest setting to have the classic window options inline rather than a url to a json file."
    },
    Snapshot: {
        id: "snapshot",
        label: "Snapshot",
        description: "This manifest type expects the manifest setting to point to a json file that contains a snapshot (one or more windows)"
    },
    InlineSnapshot: {
        id: "inline-snapshot",
        label: "Snapshot",
        description: "This manifest type expects the manifest setting to have a snapshot inline rather than a url to a json file that contains a snapshot (one or more windows)"
    },
    Manifest: {
        id: "manifest",
        label: "App",
        description: "This manifest type expects the manifest setting to point to a json file that is an openfin manifest. An openfin app."
    },
    External: {
        id: "external",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an exe."
    },
    InlineExternal: {
        id: "inline-external",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an exe using an inline launch external process request."
    },
    Appasset: {
        id: "appasset",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an app asset name."
    },
    InlineAppAsset: {
        id: "inline-appasset",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an app asset config using an inline launch external process request."
    },
    DesktopBrowser: {
        id: "desktop-browser",
        label: "Desktop Browser",
        description: "This manifest type expects the manifest setting to point to a url which will be launched in the default desktop browser."
    },
    Endpoint: {
        id: "endpoint",
        label: "Endpoint",
        description: "This manifest type expects the manifest setting to point to an endpoint (which should be defined in the endpointProvider). Action will be called on that endpoint and passed the specified app."
    },
    Connection: {
        id: "connection",
        label: "Connected App",
        description: "This manifest type expects the manifest setting to have a uuid. This must match to a connection registered in the connectionProvider with app support."
    },
    UnregisteredApp: {
        id: "unregistered-app",
        label: "Unregistered App",
        description: "This manifest type represents web page instances that have been launched that are not linked to an app. This manifest type should not be in the permitted manifest type list for app feeds as it is for dynamic urls."
    }
};


/***/ }),

/***/ "./client/src/framework/shapes/actions-shapes.ts":
/*!*******************************************************!*\
  !*** ./client/src/framework/shapes/actions-shapes.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomActionCallerType: () => (/* binding */ CustomActionCallerType)
/* harmony export */ });
/**
 * Use this in preference to CustomActionCallerType from workspace-platform to avoid the import of the whole of workspace package in modules.
 */
var CustomActionCallerType;
(function (CustomActionCallerType) {
    CustomActionCallerType["CustomButton"] = "CustomButton";
    CustomActionCallerType["StoreCustomButton"] = "StoreCustomButton";
    CustomActionCallerType["CustomDropdownItem"] = "CustomDropdownItem";
    CustomActionCallerType["GlobalContextMenu"] = "GlobalContextMenu";
    CustomActionCallerType["ViewTabContextMenu"] = "ViewTabContextMenu";
    CustomActionCallerType["PageTabContextMenu"] = "PageTabContextMenu";
    CustomActionCallerType["SaveButtonContextMenu"] = "SaveButtonContextMenu";
    CustomActionCallerType["API"] = "API";
})(CustomActionCallerType || (CustomActionCallerType = {}));


/***/ }),

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isNumberValue: () => (/* binding */ isNumberValue),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
/* harmony export */ });
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumberValue(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in globalThis.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return globalThis.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (isEmpty(err)) {
        return "";
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    else if (isObject(err) && "message" in err && isString(err.message)) {
        return err.message;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isStringValue(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return "";
}


/***/ }),

/***/ "./client/src/modules/composite/developer/actions.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/composite/developer/actions.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeveloperActions: () => (/* binding */ DeveloperActions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _framework_manifest_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../framework/manifest-types */ "./client/src/framework/manifest-types.ts");



/**
 * Implement the actions.
 */
class DeveloperActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["developer-inspect"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.ViewTabContextMenu) {
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const identity = payload.selectedViews[i];
                    const view = fin.View.wrapSync(identity);
                    await view.showDeveloperTools();
                }
            }
            else if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.PageTabContextMenu) {
                const pageWindowIdentity = payload.windowIdentity;
                const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
                await pageWindow.showDeveloperTools();
            }
            else if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.GlobalContextMenu) {
                const target = payload?.customData?.target === "platform" ? "platform" : "window";
                const targetIdentity = target === "window"
                    ? payload.windowIdentity
                    : { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
                const targetWindow = fin.Window.wrapSync(targetIdentity);
                await targetWindow.showDeveloperTools();
            }
        };
        actionMap["raise-create-app-definition-intent"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.ViewTabContextMenu) {
                const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const viewIdentity = payload.selectedViews[i];
                    const intentName = "CreateAppDefinition";
                    try {
                        const view = fin.View.wrapSync(viewIdentity);
                        const options = await view.getOptions();
                        const info = await view.getInfo();
                        const name = options.name;
                        const fdc3InteropApi = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(options.fdc3InteropApi) ? options.fdc3InteropApi : "1.2";
                        const preloads = Array.isArray(options.preloadScripts) && options.preloadScripts.length > 0
                            ? options.preloadScripts
                            : undefined;
                        const manifest = {
                            url: info.url,
                            fdc3InteropApi,
                            interop: options.interop,
                            customData: options.customData,
                            preloadScripts: preloads
                        };
                        const icons = [];
                        const favicons = info.favicons || [];
                        for (let f = 0; f < favicons.length; f++) {
                            icons.push({ src: favicons[f] });
                        }
                        const app = {
                            appId: name,
                            name,
                            title: info.title,
                            description: info.title,
                            manifestType: _framework_manifest_types__WEBPACK_IMPORTED_MODULE_2__.MANIFEST_TYPES.InlineView.id,
                            manifest,
                            tags: [_framework_manifest_types__WEBPACK_IMPORTED_MODULE_2__.MANIFEST_TYPES.View.id],
                            icons,
                            images: [],
                            publisher: "",
                            contactEmail: "",
                            supportEmail: "",
                            intents: []
                        };
                        const intent = {
                            name: intentName,
                            context: {
                                type: "openfin.app",
                                app
                            }
                        };
                        await brokerClient.fireIntent(intent);
                    }
                    catch (error) {
                        this._logger?.error(`Error while trying to raise intent ${intentName} for view ${viewIdentity.name}`, error);
                    }
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/developer/analytics.ts":
/*!*************************************************************!*\
  !*** ./client/src/modules/composite/developer/analytics.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DevAnalyticsModule: () => (/* binding */ DevAnalyticsModule)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implement the analytics module using the interop channels as the means of publishing the events.
 */
class DevAnalyticsModule {
    constructor() {
        this._cachedAnalyticEvents = [];
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperAnalyticsModule");
        this._logger.info("Initialized");
        this._logger.info("Session Id: ", helpers.sessionId);
        this._helpers = helpers;
        this._contextType = definition.data?.contextType ?? "fin.dev.platform.analytics";
        const channelName = definition.data?.sessionContextGroupName ?? "dev/platform/analytics";
        this._logger.info(`Using channel name: ${channelName} and contextType: ${this._contextType}. These can be customized by passing data settings: sessionContextGroupName and contextType in the module settings.`);
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(helpers.subscribeLifecycleEvent)) {
            this._logger.info("Subscribing to the after bootstrap event.");
            const lifeCycleAfterBootstrapSubscriptionId = helpers.subscribeLifecycleEvent("after-bootstrap", async (_platform) => {
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(helpers.getInteropClient)) {
                    this._logger?.info("After bootstrap lifecycle event received. Getting interop client.");
                    this._interopClient = await helpers.getInteropClient();
                    if (this._interopClient) {
                        this._channel = await this._interopClient.joinSessionContextGroup(channelName);
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.unsubscribeLifecycleEvent)) {
                            this._helpers?.unsubscribeLifecycleEvent(lifeCycleAfterBootstrapSubscriptionId, "after-bootstrap");
                        }
                    }
                }
            });
        }
        else {
            this._logger.warn("This analytics module requires a session context group name, a context type, the ability to create an interop client and the ability to listen for lifecycle events. Unfortunately this criteria has not been met.");
        }
    }
    /**
     * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
     * @param events one of more analytic events.
     */
    async handleAnalytics(events) {
        if (!Array.isArray(events)) {
            this._logger?.warn("We were not passed an array of analytical events.");
            return;
        }
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._channel)) {
            let platformAnalyticEvents = [];
            if (this._cachedAnalyticEvents.length > 0) {
                this._logger?.info(`Adding ${this._cachedAnalyticEvents.length} analytic events.`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                platformAnalyticEvents.push(...this._cachedAnalyticEvents);
                this._cachedAnalyticEvents = [];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            platformAnalyticEvents.push(...events);
            const eventCount = platformAnalyticEvents.length;
            platformAnalyticEvents = platformAnalyticEvents.filter((entry) => !(entry.type.toLowerCase() === "interop" && entry.source.toLowerCase() !== "browser"));
            const filteredCount = platformAnalyticEvents.length;
            if (eventCount !== filteredCount) {
                this._logger?.info(`Filtered out ${eventCount - filteredCount} events as they were of type interop and not from the browser and we send events out over interop`);
            }
            const context = {
                type: this._contextType,
                name: "Analytic Events",
                events: platformAnalyticEvents
            };
            await this._channel.setContext(context);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._cachedAnalyticEvents.push(...events);
        }
    }
    /**
     * Close down the module. If this module had any cached events it needed to process it could try and flush them here.
     */
    async closedown() {
        this._logger?.info("closing down");
    }
}


/***/ }),

/***/ "./client/src/modules/composite/developer/menus.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/developer/menus.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeveloperMenus: () => (/* binding */ DeveloperMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class DeveloperMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperMenus");
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     * @returns The menu entries.
     */
    async get(menuType, platform) {
        if (menuType === "global") {
            return [
                {
                    include: true,
                    label: "Inspect Window",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "notification-toggle"
                    },
                    separator: "before"
                },
                {
                    include: true,
                    label: "Inspect Platform",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect",
                            customData: { target: "platform" }
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "developer-inspect"
                    }
                }
            ];
        }
        else if (menuType === "page") {
            return [
                {
                    include: true,
                    label: "Inspect Window",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "before",
                        type: "Close"
                    },
                    separator: "after"
                }
            ];
        }
        else if (menuType === "view") {
            return [
                {
                    include: true,
                    label: "Inspect View",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Print"
                    },
                    separator: "before"
                },
                {
                    include: true,
                    label: "Create App Definition",
                    data: {
                        type: "Custom",
                        action: {
                            id: "raise-create-app-definition-intent"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "developer-inspect"
                    }
                }
            ];
        }
    }
}


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
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/developer/index.ts ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/developer/actions.ts");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics */ "./client/src/modules/composite/developer/analytics.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/developer/menus.ts");



const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.DeveloperActions(),
    analytics: new _analytics__WEBPACK_IMPORTED_MODULE_1__.DevAnalyticsModule(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_2__.DeveloperMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL21hbmlmZXN0LXR5cGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9hY3Rpb25zLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2FuYWx5dGljcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE1hbmlmZXN0VHlwZXMgfSBmcm9tIFwiLi9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuXG5leHBvcnQgY29uc3QgTUFOSUZFU1RfVFlQRVM6IE1hbmlmZXN0VHlwZXMgPSB7XG5cdFZpZXc6IHtcblx0XHRpZDogXCJ2aWV3XCIsXG5cdFx0bGFiZWw6IFwiVmlld1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBiZSBwb2ludGVkIHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgdmlldyBvcHRpb25zLlwiXG5cdH0sXG5cdElubGluZVZpZXc6IHtcblx0XHRpZDogXCJpbmxpbmUtdmlld1wiLFxuXHRcdGxhYmVsOiBcIlZpZXdcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSB0aGUgb3B0aW9ucyBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUuXCJcblx0fSxcblx0V2luZG93OiB7XG5cdFx0aWQ6IFwid2luZG93XCIsXG5cdFx0bGFiZWw6IFwiV2luZG93XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgY2xhc3NpYyB3aW5kb3cgb3B0aW9ucy5cIlxuXHR9LFxuXHRJbmxpbmVXaW5kb3c6IHtcblx0XHRpZDogXCJpbmxpbmUtd2luZG93XCIsXG5cdFx0bGFiZWw6IFwiV2luZG93XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgdGhlIGNsYXNzaWMgd2luZG93IG9wdGlvbnMgaW5saW5lIHJhdGhlciB0aGFuIGEgdXJsIHRvIGEganNvbiBmaWxlLlwiXG5cdH0sXG5cdFNuYXBzaG90OiB7XG5cdFx0aWQ6IFwic25hcHNob3RcIixcblx0XHRsYWJlbDogXCJTbmFwc2hvdFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhIGpzb24gZmlsZSB0aGF0IGNvbnRhaW5zIGEgc25hcHNob3QgKG9uZSBvciBtb3JlIHdpbmRvd3MpXCJcblx0fSxcblx0SW5saW5lU25hcHNob3Q6IHtcblx0XHRpZDogXCJpbmxpbmUtc25hcHNob3RcIixcblx0XHRsYWJlbDogXCJTbmFwc2hvdFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIGEgc25hcHNob3QgaW5saW5lIHJhdGhlciB0aGFuIGEgdXJsIHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgYSBzbmFwc2hvdCAob25lIG9yIG1vcmUgd2luZG93cylcIlxuXHR9LFxuXHRNYW5pZmVzdDoge1xuXHRcdGlkOiBcIm1hbmlmZXN0XCIsXG5cdFx0bGFiZWw6IFwiQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEganNvbiBmaWxlIHRoYXQgaXMgYW4gb3BlbmZpbiBtYW5pZmVzdC4gQW4gb3BlbmZpbiBhcHAuXCJcblx0fSxcblx0RXh0ZXJuYWw6IHtcblx0XHRpZDogXCJleHRlcm5hbFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjogXCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhbiBleGUuXCJcblx0fSxcblx0SW5saW5lRXh0ZXJuYWw6IHtcblx0XHRpZDogXCJpbmxpbmUtZXh0ZXJuYWxcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGV4ZSB1c2luZyBhbiBpbmxpbmUgbGF1bmNoIGV4dGVybmFsIHByb2Nlc3MgcmVxdWVzdC5cIlxuXHR9LFxuXHRBcHBhc3NldDoge1xuXHRcdGlkOiBcImFwcGFzc2V0XCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGFwcCBhc3NldCBuYW1lLlwiXG5cdH0sXG5cdElubGluZUFwcEFzc2V0OiB7XG5cdFx0aWQ6IFwiaW5saW5lLWFwcGFzc2V0XCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhbiBhcHAgYXNzZXQgY29uZmlnIHVzaW5nIGFuIGlubGluZSBsYXVuY2ggZXh0ZXJuYWwgcHJvY2VzcyByZXF1ZXN0LlwiXG5cdH0sXG5cdERlc2t0b3BCcm93c2VyOiB7XG5cdFx0aWQ6IFwiZGVza3RvcC1icm93c2VyXCIsXG5cdFx0bGFiZWw6IFwiRGVza3RvcCBCcm93c2VyXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEgdXJsIHdoaWNoIHdpbGwgYmUgbGF1bmNoZWQgaW4gdGhlIGRlZmF1bHQgZGVza3RvcCBicm93c2VyLlwiXG5cdH0sXG5cdEVuZHBvaW50OiB7XG5cdFx0aWQ6IFwiZW5kcG9pbnRcIixcblx0XHRsYWJlbDogXCJFbmRwb2ludFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhbiBlbmRwb2ludCAod2hpY2ggc2hvdWxkIGJlIGRlZmluZWQgaW4gdGhlIGVuZHBvaW50UHJvdmlkZXIpLiBBY3Rpb24gd2lsbCBiZSBjYWxsZWQgb24gdGhhdCBlbmRwb2ludCBhbmQgcGFzc2VkIHRoZSBzcGVjaWZpZWQgYXBwLlwiXG5cdH0sXG5cdENvbm5lY3Rpb246IHtcblx0XHRpZDogXCJjb25uZWN0aW9uXCIsXG5cdFx0bGFiZWw6IFwiQ29ubmVjdGVkIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIGEgdXVpZC4gVGhpcyBtdXN0IG1hdGNoIHRvIGEgY29ubmVjdGlvbiByZWdpc3RlcmVkIGluIHRoZSBjb25uZWN0aW9uUHJvdmlkZXIgd2l0aCBhcHAgc3VwcG9ydC5cIlxuXHR9LFxuXHRVbnJlZ2lzdGVyZWRBcHA6IHtcblx0XHRpZDogXCJ1bnJlZ2lzdGVyZWQtYXBwXCIsXG5cdFx0bGFiZWw6IFwiVW5yZWdpc3RlcmVkIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgcmVwcmVzZW50cyB3ZWIgcGFnZSBpbnN0YW5jZXMgdGhhdCBoYXZlIGJlZW4gbGF1bmNoZWQgdGhhdCBhcmUgbm90IGxpbmtlZCB0byBhbiBhcHAuIFRoaXMgbWFuaWZlc3QgdHlwZSBzaG91bGQgbm90IGJlIGluIHRoZSBwZXJtaXR0ZWQgbWFuaWZlc3QgdHlwZSBsaXN0IGZvciBhcHAgZmVlZHMgYXMgaXQgaXMgZm9yIGR5bmFtaWMgdXJscy5cIlxuXHR9XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQge1xuXHRDdXN0b21BY3Rpb25DYWxsZXJUeXBlLFxuXHR0eXBlIEFjdGlvbkhlbHBlcnMsXG5cdHR5cGUgQWN0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBNQU5JRkVTVF9UWVBFUyB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbWFuaWZlc3QtdHlwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXZlbG9wZXJBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVycz86IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJEZXZlbG9wZXJBY3Rpb25zXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcImRldmVsb3Blci1pbnNwZWN0XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuVmlld1RhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5zZWxlY3RlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3QgaWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSBwYXlsb2FkLnNlbGVjdGVkVmlld3NbaV07XG5cdFx0XHRcdFx0Y29uc3QgdmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKGlkZW50aXR5KTtcblx0XHRcdFx0XHRhd2FpdCB2aWV3LnNob3dEZXZlbG9wZXJUb29scygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5QYWdlVGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgcGFnZVdpbmRvd0lkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZC53aW5kb3dJZGVudGl0eTtcblx0XHRcdFx0Y29uc3QgcGFnZVdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMocGFnZVdpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5zaG93RGV2ZWxvcGVyVG9vbHMoKTtcblx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLkdsb2JhbENvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9IHBheWxvYWQ/LmN1c3RvbURhdGE/LnRhcmdldCA9PT0gXCJwbGF0Zm9ybVwiID8gXCJwbGF0Zm9ybVwiIDogXCJ3aW5kb3dcIjtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPVxuXHRcdFx0XHRcdHRhcmdldCA9PT0gXCJ3aW5kb3dcIlxuXHRcdFx0XHRcdFx0PyBwYXlsb2FkLndpbmRvd0lkZW50aXR5XG5cdFx0XHRcdFx0XHQ6IHsgdXVpZDogcGF5bG9hZC53aW5kb3dJZGVudGl0eS51dWlkLCBuYW1lOiBwYXlsb2FkLndpbmRvd0lkZW50aXR5LnV1aWQgfTtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyh0YXJnZXRJZGVudGl0eSk7XG5cdFx0XHRcdGF3YWl0IHRhcmdldFdpbmRvdy5zaG93RGV2ZWxvcGVyVG9vbHMoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wicmFpc2UtY3JlYXRlLWFwcC1kZWZpbml0aW9uLWludGVudFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLlZpZXdUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCBicm9rZXJDbGllbnQgPSBmaW4uSW50ZXJvcC5jb25uZWN0U3luYyhmaW4ubWUuaWRlbnRpdHkudXVpZCwge30pO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBheWxvYWQuc2VsZWN0ZWRWaWV3cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXdJZGVudGl0eSA9IHBheWxvYWQuc2VsZWN0ZWRWaWV3c1tpXTtcblx0XHRcdFx0XHRjb25zdCBpbnRlbnROYW1lID0gXCJDcmVhdGVBcHBEZWZpbml0aW9uXCI7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHZpZXcgPSBmaW4uVmlldy53cmFwU3luYyh2aWV3SWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IHZpZXcuZ2V0T3B0aW9ucygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHZpZXcuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdFx0XHRcdGNvbnN0IGZkYzNJbnRlcm9wQXBpID0gaXNTdHJpbmdWYWx1ZShvcHRpb25zLmZkYzNJbnRlcm9wQXBpKSA/IG9wdGlvbnMuZmRjM0ludGVyb3BBcGkgOiBcIjEuMlwiO1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJlbG9hZHMgPVxuXHRcdFx0XHRcdFx0XHRBcnJheS5pc0FycmF5KG9wdGlvbnMucHJlbG9hZFNjcmlwdHMpICYmIG9wdGlvbnMucHJlbG9hZFNjcmlwdHMubGVuZ3RoID4gMFxuXHRcdFx0XHRcdFx0XHRcdD8gb3B0aW9ucy5wcmVsb2FkU2NyaXB0c1xuXHRcdFx0XHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0XHRcdHVybDogaW5mby51cmwsXG5cdFx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpLFxuXHRcdFx0XHRcdFx0XHRpbnRlcm9wOiBvcHRpb25zLmludGVyb3AsXG5cdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IG9wdGlvbnMuY3VzdG9tRGF0YSxcblx0XHRcdFx0XHRcdFx0cHJlbG9hZFNjcmlwdHM6IHByZWxvYWRzXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3QgaWNvbnMgPSBbXTtcblx0XHRcdFx0XHRcdGNvbnN0IGZhdmljb25zID0gaW5mby5mYXZpY29ucyB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGYgPSAwOyBmIDwgZmF2aWNvbnMubGVuZ3RoOyBmKyspIHtcblx0XHRcdFx0XHRcdFx0aWNvbnMucHVzaCh7IHNyYzogZmF2aWNvbnNbZl0gfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBhcHAgPSB7XG5cdFx0XHRcdFx0XHRcdGFwcElkOiBuYW1lLFxuXHRcdFx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IGluZm8udGl0bGUsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZTogTUFOSUZFU1RfVFlQRVMuSW5saW5lVmlldy5pZCxcblx0XHRcdFx0XHRcdFx0bWFuaWZlc3QsXG5cdFx0XHRcdFx0XHRcdHRhZ3M6IFtNQU5JRkVTVF9UWVBFUy5WaWV3LmlkXSxcblx0XHRcdFx0XHRcdFx0aWNvbnMsXG5cdFx0XHRcdFx0XHRcdGltYWdlczogW10sXG5cdFx0XHRcdFx0XHRcdHB1Ymxpc2hlcjogXCJcIixcblx0XHRcdFx0XHRcdFx0Y29udGFjdEVtYWlsOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRzdXBwb3J0RW1haWw6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdGludGVudHM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3QgaW50ZW50ID0ge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBpbnRlbnROYW1lLFxuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJvcGVuZmluLmFwcFwiLFxuXHRcdFx0XHRcdFx0XHRcdGFwcFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YXdhaXQgYnJva2VyQ2xpZW50LmZpcmVJbnRlbnQoaW50ZW50KTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIHRyeWluZyB0byByYWlzZSBpbnRlbnQgJHtpbnRlbnROYW1lfSBmb3IgdmlldyAke3ZpZXdJZGVudGl0eS5uYW1lfWAsXG5cdFx0XHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFuYWx5dGljc01vZHVsZSxcblx0UGxhdGZvcm1BbmFseXRpY3NFdmVudFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FuYWx5dGljcy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRGV2QW5hbHl0aWNzT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYW5hbHl0aWNzIG1vZHVsZSB1c2luZyB0aGUgaW50ZXJvcCBjaGFubmVscyBhcyB0aGUgbWVhbnMgb2YgcHVibGlzaGluZyB0aGUgZXZlbnRzLlxuICovXG5leHBvcnQgY2xhc3MgRGV2QW5hbHl0aWNzTW9kdWxlIGltcGxlbWVudHMgQW5hbHl0aWNzTW9kdWxlPERldkFuYWx5dGljc09wdGlvbnM+IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX2ludGVyb3BDbGllbnQ6IE9wZW5GaW4uSW50ZXJvcENsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRwcml2YXRlIF9jaGFubmVsPzogT3BlbkZpbi5TZXNzaW9uQ29udGV4dEdyb3VwO1xuXG5cdHByaXZhdGUgX2NvbnRleHRUeXBlPzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2NhY2hlZEFuYWx5dGljRXZlbnRzOiBQbGF0Zm9ybUFuYWx5dGljc0V2ZW50W10gPSBbXTtcblxuXHRwcml2YXRlIF9oZWxwZXJzPzogTW9kdWxlSGVscGVycztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZXZBbmFseXRpY3NPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3BlckFuYWx5dGljc01vZHVsZVwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemVkXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU2Vzc2lvbiBJZDogXCIsIGhlbHBlcnMuc2Vzc2lvbklkKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9jb250ZXh0VHlwZSA9IGRlZmluaXRpb24uZGF0YT8uY29udGV4dFR5cGUgPz8gXCJmaW4uZGV2LnBsYXRmb3JtLmFuYWx5dGljc1wiO1xuXHRcdGNvbnN0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSBkZWZpbml0aW9uLmRhdGE/LnNlc3Npb25Db250ZXh0R3JvdXBOYW1lID8/IFwiZGV2L3BsYXRmb3JtL2FuYWx5dGljc1wiO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0YFVzaW5nIGNoYW5uZWwgbmFtZTogJHtjaGFubmVsTmFtZX0gYW5kIGNvbnRleHRUeXBlOiAke3RoaXMuX2NvbnRleHRUeXBlfS4gVGhlc2UgY2FuIGJlIGN1c3RvbWl6ZWQgYnkgcGFzc2luZyBkYXRhIHNldHRpbmdzOiBzZXNzaW9uQ29udGV4dEdyb3VwTmFtZSBhbmQgY29udGV4dFR5cGUgaW4gdGhlIG1vZHVsZSBzZXR0aW5ncy5gXG5cdFx0KTtcblx0XHRpZiAoIWlzRW1wdHkoaGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU3Vic2NyaWJpbmcgdG8gdGhlIGFmdGVyIGJvb3RzdHJhcCBldmVudC5cIik7XG5cdFx0XHRjb25zdCBsaWZlQ3ljbGVBZnRlckJvb3RzdHJhcFN1YnNjcmlwdGlvbklkID0gaGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XCJhZnRlci1ib290c3RyYXBcIixcblx0XHRcdFx0YXN5bmMgKF9wbGF0Zm9ybSkgPT4ge1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eShoZWxwZXJzLmdldEludGVyb3BDbGllbnQpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJBZnRlciBib290c3RyYXAgbGlmZWN5Y2xlIGV2ZW50IHJlY2VpdmVkLiBHZXR0aW5nIGludGVyb3AgY2xpZW50LlwiKTtcblx0XHRcdFx0XHRcdHRoaXMuX2ludGVyb3BDbGllbnQgPSBhd2FpdCBoZWxwZXJzLmdldEludGVyb3BDbGllbnQoKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlcm9wQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2NoYW5uZWwgPSBhd2FpdCB0aGlzLl9pbnRlcm9wQ2xpZW50LmpvaW5TZXNzaW9uQ29udGV4dEdyb3VwKGNoYW5uZWxOYW1lKTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5faGVscGVycz8udW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHRcdFx0XHRcdGxpZmVDeWNsZUFmdGVyQm9vdHN0cmFwU3Vic2NyaXB0aW9uSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcImFmdGVyLWJvb3RzdHJhcFwiXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFwiVGhpcyBhbmFseXRpY3MgbW9kdWxlIHJlcXVpcmVzIGEgc2Vzc2lvbiBjb250ZXh0IGdyb3VwIG5hbWUsIGEgY29udGV4dCB0eXBlLCB0aGUgYWJpbGl0eSB0byBjcmVhdGUgYW4gaW50ZXJvcCBjbGllbnQgYW5kIHRoZSBhYmlsaXR5IHRvIGxpc3RlbiBmb3IgbGlmZWN5Y2xlIGV2ZW50cy4gVW5mb3J0dW5hdGVseSB0aGlzIGNyaXRlcmlhIGhhcyBub3QgYmVlbiBtZXQuXCJcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBBbmFseXRpY3MuIFRoaXMgZXhhbXBsZSBtb2R1bGUgc2ltcGxlIGNvbnNvbGUgbG9ncyB0aGUgZXZlbnRzLiBZb3UgY291bGQgYmF0Y2ggdGhlIGV2ZW50cyBhbmQgcGFzcyBzZXR0aW5ncyAobnVtYmVyIHRvIGJhdGNoIGV0YywgZGVzdGluYXRpb24gdG8gc2VuZCBldmVudHMpIHZpYSB0aGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBwYXJhbSBldmVudHMgb25lIG9mIG1vcmUgYW5hbHl0aWMgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZUFuYWx5dGljcyhldmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudHMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXCJXZSB3ZXJlIG5vdCBwYXNzZWQgYW4gYXJyYXkgb2YgYW5hbHl0aWNhbCBldmVudHMuXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fY2hhbm5lbCkpIHtcblx0XHRcdGxldCBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzOiBQbGF0Zm9ybUFuYWx5dGljc0V2ZW50W10gPSBbXTtcblx0XHRcdGlmICh0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgQWRkaW5nICR7dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMubGVuZ3RofSBhbmFseXRpYyBldmVudHMuYCk7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0XHRcdHBsYXRmb3JtQW5hbHl0aWNFdmVudHMucHVzaCguLi50aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cyk7XG5cdFx0XHRcdHRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzID0gW107XG5cdFx0XHR9XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0cGxhdGZvcm1BbmFseXRpY0V2ZW50cy5wdXNoKC4uLmV2ZW50cyk7XG5cdFx0XHRjb25zdCBldmVudENvdW50ID0gcGxhdGZvcm1BbmFseXRpY0V2ZW50cy5sZW5ndGg7XG5cdFx0XHRwbGF0Zm9ybUFuYWx5dGljRXZlbnRzID0gcGxhdGZvcm1BbmFseXRpY0V2ZW50cy5maWx0ZXIoXG5cdFx0XHRcdChlbnRyeSkgPT4gIShlbnRyeS50eXBlLnRvTG93ZXJDYXNlKCkgPT09IFwiaW50ZXJvcFwiICYmIGVudHJ5LnNvdXJjZS50b0xvd2VyQ2FzZSgpICE9PSBcImJyb3dzZXJcIilcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZENvdW50ID0gcGxhdGZvcm1BbmFseXRpY0V2ZW50cy5sZW5ndGg7XG5cblx0XHRcdGlmIChldmVudENvdW50ICE9PSBmaWx0ZXJlZENvdW50KSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRgRmlsdGVyZWQgb3V0ICR7XG5cdFx0XHRcdFx0XHRldmVudENvdW50IC0gZmlsdGVyZWRDb3VudFxuXHRcdFx0XHRcdH0gZXZlbnRzIGFzIHRoZXkgd2VyZSBvZiB0eXBlIGludGVyb3AgYW5kIG5vdCBmcm9tIHRoZSBicm93c2VyIGFuZCB3ZSBzZW5kIGV2ZW50cyBvdXQgb3ZlciBpbnRlcm9wYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjb250ZXh0ID0ge1xuXHRcdFx0XHR0eXBlOiB0aGlzLl9jb250ZXh0VHlwZSxcblx0XHRcdFx0bmFtZTogXCJBbmFseXRpYyBFdmVudHNcIixcblx0XHRcdFx0ZXZlbnRzOiBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzXG5cdFx0XHR9O1xuXHRcdFx0YXdhaXQgdGhpcy5fY2hhbm5lbC5zZXRDb250ZXh0KGNvbnRleHQgYXMgT3BlbkZpbi5Db250ZXh0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRcdHRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLnB1c2goLi4uZXZlbnRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biB0aGUgbW9kdWxlLiBJZiB0aGlzIG1vZHVsZSBoYWQgYW55IGNhY2hlZCBldmVudHMgaXQgbmVlZGVkIHRvIHByb2Nlc3MgaXQgY291bGQgdHJ5IGFuZCBmbHVzaCB0aGVtIGhlcmUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duPygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJjbG9zaW5nIGRvd25cIik7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNZW51RW50cnksIE1lbnVUeXBlLCBNZW51cyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbWVudS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXZlbG9wZXJNZW51cyBpbXBsZW1lbnRzIE1lbnVzIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJEZXZlbG9wZXJNZW51c1wiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcmV0dXJucyBUaGUgbWVudSBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChtZW51VHlwZTogTWVudVR5cGUsIHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAobWVudVR5cGUgPT09IFwiZ2xvYmFsXCIpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRcdGxhYmVsOiBcIkluc3BlY3QgV2luZG93XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tSWQ6IFwibm90aWZpY2F0aW9uLXRvZ2dsZVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXBhcmF0b3I6IFwiYmVmb3JlXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBQbGF0Zm9ybVwiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIixcblx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YTogeyB0YXJnZXQ6IFwicGxhdGZvcm1cIiB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tSWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9IGVsc2UgaWYgKG1lbnVUeXBlID09PSBcInBhZ2VcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBXaW5kb3dcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIkNsb3NlXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJhZnRlclwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fSBlbHNlIGlmIChtZW51VHlwZSA9PT0gXCJ2aWV3XCIpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRcdGxhYmVsOiBcIkluc3BlY3QgVmlld1wiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJQcmludFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXBhcmF0b3I6IFwiYmVmb3JlXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiQ3JlYXRlIEFwcCBEZWZpbml0aW9uXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJyYWlzZS1jcmVhdGUtYXBwLWRlZmluaXRpb24taW50ZW50XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRGV2ZWxvcGVyQWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IERldkFuYWx5dGljc01vZHVsZSB9IGZyb20gXCIuL2FuYWx5dGljc1wiO1xuaW1wb3J0IHsgRGV2ZWxvcGVyTWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IERldmVsb3BlckFjdGlvbnMoKSxcblx0YW5hbHl0aWNzOiBuZXcgRGV2QW5hbHl0aWNzTW9kdWxlKCksXG5cdG1lbnVzOiBuZXcgRGV2ZWxvcGVyTWVudXMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==