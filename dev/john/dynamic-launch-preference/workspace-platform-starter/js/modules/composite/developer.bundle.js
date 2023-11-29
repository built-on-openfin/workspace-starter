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
    return value !== undefined && value !== null && typeof value === "object";
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
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
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
        const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
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
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isString(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return content;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxtQkFBbUI7cUJBQzdCO2lCQUNEO2FBQ0QsQ0FBQztRQUNILENBQUM7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0M1SEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBQ0k7QUFDUjtBQUVsQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksc0RBQWdCLEVBQUU7SUFDL0IsU0FBUyxFQUFFLElBQUksMERBQWtCLEVBQUU7SUFDbkMsS0FBSyxFQUFFLElBQUksa0RBQWMsRUFBRTtDQUMzQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvbWFuaWZlc3QtdHlwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvYW5hbHl0aWNzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTWFuaWZlc3RUeXBlcyB9IGZyb20gXCIuL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5cbmV4cG9ydCBjb25zdCBNQU5JRkVTVF9UWVBFUzogTWFuaWZlc3RUeXBlcyA9IHtcblx0Vmlldzoge1xuXHRcdGlkOiBcInZpZXdcIixcblx0XHRsYWJlbDogXCJWaWV3XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGJlIHBvaW50ZWQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyB2aWV3IG9wdGlvbnMuXCJcblx0fSxcblx0SW5saW5lVmlldzoge1xuXHRcdGlkOiBcImlubGluZS12aWV3XCIsXG5cdFx0bGFiZWw6IFwiVmlld1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIHRoZSBvcHRpb25zIGlubGluZSByYXRoZXIgdGhhbiBhIHVybCB0byBhIGpzb24gZmlsZS5cIlxuXHR9LFxuXHRXaW5kb3c6IHtcblx0XHRpZDogXCJ3aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBjbGFzc2ljIHdpbmRvdyBvcHRpb25zLlwiXG5cdH0sXG5cdElubGluZVdpbmRvdzoge1xuXHRcdGlkOiBcImlubGluZS13aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSB0aGUgY2xhc3NpYyB3aW5kb3cgb3B0aW9ucyBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUuXCJcblx0fSxcblx0U25hcHNob3Q6IHtcblx0XHRpZDogXCJzbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgYSBzbmFwc2hvdCAob25lIG9yIG1vcmUgd2luZG93cylcIlxuXHR9LFxuXHRJbmxpbmVTbmFwc2hvdDoge1xuXHRcdGlkOiBcImlubGluZS1zbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSBzbmFwc2hvdCBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBhIHNuYXBzaG90IChvbmUgb3IgbW9yZSB3aW5kb3dzKVwiXG5cdH0sXG5cdE1hbmlmZXN0OiB7XG5cdFx0aWQ6IFwibWFuaWZlc3RcIixcblx0XHRsYWJlbDogXCJBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBpcyBhbiBvcGVuZmluIG1hbmlmZXN0LiBBbiBvcGVuZmluIGFwcC5cIlxuXHR9LFxuXHRFeHRlcm5hbDoge1xuXHRcdGlkOiBcImV4dGVybmFsXCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGV4ZS5cIlxuXHR9LFxuXHRJbmxpbmVFeHRlcm5hbDoge1xuXHRcdGlkOiBcImlubGluZS1leHRlcm5hbFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gZXhlIHVzaW5nIGFuIGlubGluZSBsYXVuY2ggZXh0ZXJuYWwgcHJvY2VzcyByZXF1ZXN0LlwiXG5cdH0sXG5cdEFwcGFzc2V0OiB7XG5cdFx0aWQ6IFwiYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gYXBwIGFzc2V0IG5hbWUuXCJcblx0fSxcblx0SW5saW5lQXBwQXNzZXQ6IHtcblx0XHRpZDogXCJpbmxpbmUtYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGFwcCBhc3NldCBjb25maWcgdXNpbmcgYW4gaW5saW5lIGxhdW5jaCBleHRlcm5hbCBwcm9jZXNzIHJlcXVlc3QuXCJcblx0fSxcblx0RGVza3RvcEJyb3dzZXI6IHtcblx0XHRpZDogXCJkZXNrdG9wLWJyb3dzZXJcIixcblx0XHRsYWJlbDogXCJEZXNrdG9wIEJyb3dzZXJcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSB1cmwgd2hpY2ggd2lsbCBiZSBsYXVuY2hlZCBpbiB0aGUgZGVmYXVsdCBkZXNrdG9wIGJyb3dzZXIuXCJcblx0fSxcblx0RW5kcG9pbnQ6IHtcblx0XHRpZDogXCJlbmRwb2ludFwiLFxuXHRcdGxhYmVsOiBcIkVuZHBvaW50XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGVuZHBvaW50ICh3aGljaCBzaG91bGQgYmUgZGVmaW5lZCBpbiB0aGUgZW5kcG9pbnRQcm92aWRlcikuIEFjdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiB0aGF0IGVuZHBvaW50IGFuZCBwYXNzZWQgdGhlIHNwZWNpZmllZCBhcHAuXCJcblx0fSxcblx0Q29ubmVjdGlvbjoge1xuXHRcdGlkOiBcImNvbm5lY3Rpb25cIixcblx0XHRsYWJlbDogXCJDb25uZWN0ZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSB1dWlkLiBUaGlzIG11c3QgbWF0Y2ggdG8gYSBjb25uZWN0aW9uIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbm5lY3Rpb25Qcm92aWRlciB3aXRoIGFwcCBzdXBwb3J0LlwiXG5cdH0sXG5cdFVucmVnaXN0ZXJlZEFwcDoge1xuXHRcdGlkOiBcInVucmVnaXN0ZXJlZC1hcHBcIixcblx0XHRsYWJlbDogXCJVbnJlZ2lzdGVyZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSByZXByZXNlbnRzIHdlYiBwYWdlIGluc3RhbmNlcyB0aGF0IGhhdmUgYmVlbiBsYXVuY2hlZCB0aGF0IGFyZSBub3QgbGlua2VkIHRvIGFuIGFwcC4gVGhpcyBtYW5pZmVzdCB0eXBlIHNob3VsZCBub3QgYmUgaW4gdGhlIHBlcm1pdHRlZCBtYW5pZmVzdCB0eXBlIGxpc3QgZm9yIGFwcCBmZWVkcyBhcyBpdCBpcyBmb3IgZHluYW1pYyB1cmxzLlwiXG5cdH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEN1c3RvbUFjdGlvbnNNYXAsIFRvb2xiYXJCdXR0b24sIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzLCBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlTGlzdCB9IGZyb20gXCIuL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIGZvciBhbiBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uczxPID0gdW5rbm93bj4gZXh0ZW5kcyBNb2R1bGVJbXBsZW1lbnRhdGlvbjxPLCBBY3Rpb25IZWxwZXJzPiB7XG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+O1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBtb2R1bGVzIHRoYXQgcHJvdmlkZSBhY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIHBsYXRmb3JtLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25zUHJvdmlkZXJPcHRpb25zID0gTW9kdWxlTGlzdDtcblxuLyoqXG4gKiBFeHRlbmRlZCBoZWxwZXJzIHVzZWQgYnkgYWN0aW9uIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uSGVscGVycyBleHRlbmRzIE1vZHVsZUhlbHBlcnMge1xuXHQvKipcblx0ICogVXBkYXRlIHRvb2xiYXIgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbnMgVGhlIGxpc3Qgb2YgYWxsIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25JZCBUaGUgYnV0dG9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHJlcGxhY2VtZW50QnV0dG9uSWQgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgYnV0dG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgdXBkYXRlZCBidXR0b25zLlxuXHQgKi9cblx0dXBkYXRlVG9vbGJhckJ1dHRvbnM6IChcblx0XHRidXR0b25zOiBUb29sYmFyQnV0dG9uW10sXG5cdFx0YnV0dG9uSWQ6IHN0cmluZyxcblx0XHRyZXBsYWNlbWVudEJ1dHRvbklkOiBzdHJpbmdcblx0KSA9PiBQcm9taXNlPFRvb2xiYXJCdXR0b25bXT47XG59XG5cbi8qKlxuICogVXNlIHRoaXMgaW4gcHJlZmVyZW5jZSB0byBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIGZyb20gd29ya3NwYWNlLXBsYXRmb3JtIHRvIGF2b2lkIHRoZSBpbXBvcnQgb2YgdGhlIHdob2xlIG9mIHdvcmtzcGFjZSBwYWNrYWdlIGluIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUge1xuXHRDdXN0b21CdXR0b24gPSBcIkN1c3RvbUJ1dHRvblwiLFxuXHRTdG9yZUN1c3RvbUJ1dHRvbiA9IFwiU3RvcmVDdXN0b21CdXR0b25cIixcblx0Q3VzdG9tRHJvcGRvd25JdGVtID0gXCJDdXN0b21Ecm9wZG93bkl0ZW1cIixcblx0R2xvYmFsQ29udGV4dE1lbnUgPSBcIkdsb2JhbENvbnRleHRNZW51XCIsXG5cdFZpZXdUYWJDb250ZXh0TWVudSA9IFwiVmlld1RhYkNvbnRleHRNZW51XCIsXG5cdFBhZ2VUYWJDb250ZXh0TWVudSA9IFwiUGFnZVRhYkNvbnRleHRNZW51XCIsXG5cdFNhdmVCdXR0b25Db250ZXh0TWVudSA9IFwiU2F2ZUJ1dHRvbkNvbnRleHRNZW51XCIsXG5cdEFQSSA9IFwiQVBJXCJcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0Q3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSxcblx0dHlwZSBBY3Rpb25IZWxwZXJzLFxuXHR0eXBlIEFjdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgTUFOSUZFU1RfVFlQRVMgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21hbmlmZXN0LXR5cGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgRGV2ZWxvcGVyQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogQWN0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyQWN0aW9uc1wiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJkZXZlbG9wZXItaW5zcGVjdFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLlZpZXdUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBheWxvYWQuc2VsZWN0ZWRWaWV3cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGlkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IHZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhpZGVudGl0eSk7XG5cdFx0XHRcdFx0YXdhaXQgdmlldy5zaG93RGV2ZWxvcGVyVG9vbHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuUGFnZVRhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHBhZ2VXaW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdGF3YWl0IHBhZ2VXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5HbG9iYWxDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy50YXJnZXQgPT09IFwicGxhdGZvcm1cIiA/IFwicGxhdGZvcm1cIiA6IFwid2luZG93XCI7XG5cdFx0XHRcdGNvbnN0IHRhcmdldElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID1cblx0XHRcdFx0XHR0YXJnZXQgPT09IFwid2luZG93XCJcblx0XHRcdFx0XHRcdD8gcGF5bG9hZC53aW5kb3dJZGVudGl0eVxuXHRcdFx0XHRcdFx0OiB7IHV1aWQ6IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZCwgbmFtZTogcGF5bG9hZC53aW5kb3dJZGVudGl0eS51dWlkIH07XG5cdFx0XHRcdGNvbnN0IHRhcmdldFdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmModGFyZ2V0SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCB0YXJnZXRXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5WaWV3VGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLnNlbGVjdGVkVmlld3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3SWRlbnRpdHkgPSBwYXlsb2FkLnNlbGVjdGVkVmlld3NbaV07XG5cdFx0XHRcdFx0Y29uc3QgaW50ZW50TmFtZSA9IFwiQ3JlYXRlQXBwRGVmaW5pdGlvblwiO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCB2aWV3ID0gZmluLlZpZXcud3JhcFN5bmModmlld0lkZW50aXR5KTtcblx0XHRcdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB2aWV3LmdldE9wdGlvbnMoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB2aWV3LmdldEluZm8oKTtcblx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHRcdFx0XHRjb25zdCBmZGMzSW50ZXJvcEFwaSA9IGlzU3RyaW5nVmFsdWUob3B0aW9ucy5mZGMzSW50ZXJvcEFwaSkgPyBvcHRpb25zLmZkYzNJbnRlcm9wQXBpIDogXCIxLjJcIjtcblx0XHRcdFx0XHRcdGNvbnN0IHByZWxvYWRzID1cblx0XHRcdFx0XHRcdFx0QXJyYXkuaXNBcnJheShvcHRpb25zLnByZWxvYWRTY3JpcHRzKSAmJiBvcHRpb25zLnByZWxvYWRTY3JpcHRzLmxlbmd0aCA+IDBcblx0XHRcdFx0XHRcdFx0XHQ/IG9wdGlvbnMucHJlbG9hZFNjcmlwdHNcblx0XHRcdFx0XHRcdFx0XHQ6IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGNvbnN0IG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdFx0XHR1cmw6IGluZm8udXJsLFxuXHRcdFx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaSxcblx0XHRcdFx0XHRcdFx0aW50ZXJvcDogb3B0aW9ucy5pbnRlcm9wLFxuXHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiBvcHRpb25zLmN1c3RvbURhdGEsXG5cdFx0XHRcdFx0XHRcdHByZWxvYWRTY3JpcHRzOiBwcmVsb2Fkc1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNvbnN0IGljb25zID0gW107XG5cdFx0XHRcdFx0XHRjb25zdCBmYXZpY29ucyA9IGluZm8uZmF2aWNvbnMgfHwgW107XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBmID0gMDsgZiA8IGZhdmljb25zLmxlbmd0aDsgZisrKSB7XG5cdFx0XHRcdFx0XHRcdGljb25zLnB1c2goeyBzcmM6IGZhdmljb25zW2ZdIH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgYXBwID0ge1xuXHRcdFx0XHRcdFx0XHRhcHBJZDogbmFtZSxcblx0XHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IGluZm8udGl0bGUsXG5cdFx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBpbmZvLnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGU6IE1BTklGRVNUX1RZUEVTLklubGluZVZpZXcuaWQsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0LFxuXHRcdFx0XHRcdFx0XHR0YWdzOiBbTUFOSUZFU1RfVFlQRVMuVmlldy5pZF0sXG5cdFx0XHRcdFx0XHRcdGljb25zLFxuXHRcdFx0XHRcdFx0XHRpbWFnZXM6IFtdLFxuXHRcdFx0XHRcdFx0XHRwdWJsaXNoZXI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdGNvbnRhY3RFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0c3VwcG9ydEVtYWlsOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNvbnN0IGludGVudCA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwib3BlbmZpbi5hcHBcIixcblx0XHRcdFx0XHRcdFx0XHRhcHBcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IGJyb2tlckNsaWVudC5maXJlSW50ZW50KGludGVudCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gcmFpc2UgaW50ZW50ICR7aW50ZW50TmFtZX0gZm9yIHZpZXcgJHt2aWV3SWRlbnRpdHkubmFtZX1gLFxuXHRcdFx0XHRcdFx0XHRlcnJvclxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRBbmFseXRpY3NNb2R1bGUsXG5cdFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hbmFseXRpY3Mtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IERldkFuYWx5dGljc09wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFuYWx5dGljcyBtb2R1bGUgdXNpbmcgdGhlIGludGVyb3AgY2hhbm5lbHMgYXMgdGhlIG1lYW5zIG9mIHB1Ymxpc2hpbmcgdGhlIGV2ZW50cy5cbiAqL1xuZXhwb3J0IGNsYXNzIERldkFuYWx5dGljc01vZHVsZSBpbXBsZW1lbnRzIEFuYWx5dGljc01vZHVsZTxEZXZBbmFseXRpY3NPcHRpb25zPiB7XG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9pbnRlcm9wQ2xpZW50OiBPcGVuRmluLkludGVyb3BDbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0cHJpdmF0ZSBfY2hhbm5lbD86IE9wZW5GaW4uU2Vzc2lvbkNvbnRleHRHcm91cDtcblxuXHRwcml2YXRlIF9jb250ZXh0VHlwZT86IHN0cmluZztcblxuXHRwcml2YXRlIF9jYWNoZWRBbmFseXRpY0V2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdID0gW107XG5cblx0cHJpdmF0ZSBfaGVscGVycz86IE1vZHVsZUhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RGV2QW5hbHl0aWNzT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJEZXZlbG9wZXJBbmFseXRpY3NNb2R1bGVcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXplZFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlNlc3Npb24gSWQ6IFwiLCBoZWxwZXJzLnNlc3Npb25JZCk7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fY29udGV4dFR5cGUgPSBkZWZpbml0aW9uLmRhdGE/LmNvbnRleHRUeXBlID8/IFwiZmluLmRldi5wbGF0Zm9ybS5hbmFseXRpY3NcIjtcblx0XHRjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gZGVmaW5pdGlvbi5kYXRhPy5zZXNzaW9uQ29udGV4dEdyb3VwTmFtZSA/PyBcImRldi9wbGF0Zm9ybS9hbmFseXRpY3NcIjtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdGBVc2luZyBjaGFubmVsIG5hbWU6ICR7Y2hhbm5lbE5hbWV9IGFuZCBjb250ZXh0VHlwZTogJHt0aGlzLl9jb250ZXh0VHlwZX0uIFRoZXNlIGNhbiBiZSBjdXN0b21pemVkIGJ5IHBhc3NpbmcgZGF0YSBzZXR0aW5nczogc2Vzc2lvbkNvbnRleHRHcm91cE5hbWUgYW5kIGNvbnRleHRUeXBlIGluIHRoZSBtb2R1bGUgc2V0dGluZ3MuYFxuXHRcdCk7XG5cdFx0aWYgKCFpc0VtcHR5KGhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlN1YnNjcmliaW5nIHRvIHRoZSBhZnRlciBib290c3RyYXAgZXZlbnQuXCIpO1xuXHRcdFx0Y29uc3QgbGlmZUN5Y2xlQWZ0ZXJCb290c3RyYXBTdWJzY3JpcHRpb25JZCA9IGhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFwiYWZ0ZXItYm9vdHN0cmFwXCIsXG5cdFx0XHRcdGFzeW5jIChfcGxhdGZvcm0pID0+IHtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoaGVscGVycy5nZXRJbnRlcm9wQ2xpZW50KSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQWZ0ZXIgYm9vdHN0cmFwIGxpZmVjeWNsZSBldmVudCByZWNlaXZlZC4gR2V0dGluZyBpbnRlcm9wIGNsaWVudC5cIik7XG5cdFx0XHRcdFx0XHR0aGlzLl9pbnRlcm9wQ2xpZW50ID0gYXdhaXQgaGVscGVycy5nZXRJbnRlcm9wQ2xpZW50KCk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5faW50ZXJvcENsaWVudCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9jaGFubmVsID0gYXdhaXQgdGhpcy5faW50ZXJvcENsaWVudC5qb2luU2Vzc2lvbkNvbnRleHRHcm91cChjaGFubmVsTmFtZSk7XG5cdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2hlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRsaWZlQ3ljbGVBZnRlckJvb3RzdHJhcFN1YnNjcmlwdGlvbklkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJhZnRlci1ib290c3RyYXBcIlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcIlRoaXMgYW5hbHl0aWNzIG1vZHVsZSByZXF1aXJlcyBhIHNlc3Npb24gY29udGV4dCBncm91cCBuYW1lLCBhIGNvbnRleHQgdHlwZSwgdGhlIGFiaWxpdHkgdG8gY3JlYXRlIGFuIGludGVyb3AgY2xpZW50IGFuZCB0aGUgYWJpbGl0eSB0byBsaXN0ZW4gZm9yIGxpZmVjeWNsZSBldmVudHMuIFVuZm9ydHVuYXRlbHkgdGhpcyBjcml0ZXJpYSBoYXMgbm90IGJlZW4gbWV0LlwiXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgQW5hbHl0aWNzLiBUaGlzIGV4YW1wbGUgbW9kdWxlIHNpbXBsZSBjb25zb2xlIGxvZ3MgdGhlIGV2ZW50cy4gWW91IGNvdWxkIGJhdGNoIHRoZSBldmVudHMgYW5kIHBhc3Mgc2V0dGluZ3MgKG51bWJlciB0byBiYXRjaCBldGMsIGRlc3RpbmF0aW9uIHRvIHNlbmQgZXZlbnRzKSB2aWEgdGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAcGFyYW0gZXZlbnRzIG9uZSBvZiBtb3JlIGFuYWx5dGljIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVBbmFseXRpY3MoZXZlbnRzOiBQbGF0Zm9ybUFuYWx5dGljc0V2ZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRzKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFwiV2Ugd2VyZSBub3QgcGFzc2VkIGFuIGFycmF5IG9mIGFuYWx5dGljYWwgZXZlbnRzLlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2NoYW5uZWwpKSB7XG5cdFx0XHRsZXQgcGxhdGZvcm1BbmFseXRpY0V2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdID0gW107XG5cdFx0XHRpZiAodGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYEFkZGluZyAke3RoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLmxlbmd0aH0gYW5hbHl0aWMgZXZlbnRzLmApO1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0XHRwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLnB1c2goLi4udGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMpO1xuXHRcdFx0XHR0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cyA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRcdHBsYXRmb3JtQW5hbHl0aWNFdmVudHMucHVzaCguLi5ldmVudHMpO1xuXHRcdFx0Y29uc3QgZXZlbnRDb3VudCA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMubGVuZ3RoO1xuXHRcdFx0cGxhdGZvcm1BbmFseXRpY0V2ZW50cyA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMuZmlsdGVyKFxuXHRcdFx0XHQoZW50cnkpID0+ICEoZW50cnkudHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImludGVyb3BcIiAmJiBlbnRyeS5zb3VyY2UudG9Mb3dlckNhc2UoKSAhPT0gXCJicm93c2VyXCIpXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgZmlsdGVyZWRDb3VudCA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoZXZlbnRDb3VudCAhPT0gZmlsdGVyZWRDb3VudCkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0YEZpbHRlcmVkIG91dCAke1xuXHRcdFx0XHRcdFx0ZXZlbnRDb3VudCAtIGZpbHRlcmVkQ291bnRcblx0XHRcdFx0XHR9IGV2ZW50cyBhcyB0aGV5IHdlcmUgb2YgdHlwZSBpbnRlcm9wIGFuZCBub3QgZnJvbSB0aGUgYnJvd3NlciBhbmQgd2Ugc2VuZCBldmVudHMgb3V0IG92ZXIgaW50ZXJvcGBcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY29udGV4dCA9IHtcblx0XHRcdFx0dHlwZTogdGhpcy5fY29udGV4dFR5cGUsXG5cdFx0XHRcdG5hbWU6IFwiQW5hbHl0aWMgRXZlbnRzXCIsXG5cdFx0XHRcdGV2ZW50czogcGxhdGZvcm1BbmFseXRpY0V2ZW50c1xuXHRcdFx0fTtcblx0XHRcdGF3YWl0IHRoaXMuX2NoYW5uZWwuc2V0Q29udGV4dChjb250ZXh0IGFzIE9wZW5GaW4uQ29udGV4dCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0XHR0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cy5wdXNoKC4uLmV2ZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gdGhlIG1vZHVsZS4gSWYgdGhpcyBtb2R1bGUgaGFkIGFueSBjYWNoZWQgZXZlbnRzIGl0IG5lZWRlZCB0byBwcm9jZXNzIGl0IGNvdWxkIHRyeSBhbmQgZmx1c2ggdGhlbSBoZXJlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bj8oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiY2xvc2luZyBkb3duXCIpO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgTWVudXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIG1lbnVzLlxuICovXG5leHBvcnQgY2xhc3MgRGV2ZWxvcGVyTWVudXMgaW1wbGVtZW50cyBNZW51cyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyTWVudXNcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHJldHVybnMgVGhlIG1lbnUgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQobWVudVR5cGU6IE1lbnVUeXBlLCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPE1lbnVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKG1lbnVUeXBlID09PSBcImdsb2JhbFwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFdpbmRvd1wiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGN1c3RvbUlkOiBcIm5vdGlmaWNhdGlvbi10b2dnbGVcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VwYXJhdG9yOiBcImJlZm9yZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRcdGxhYmVsOiBcIkluc3BlY3QgUGxhdGZvcm1cIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCIsXG5cdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHsgdGFyZ2V0OiBcInBsYXRmb3JtXCIgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGN1c3RvbUlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fSBlbHNlIGlmIChtZW51VHlwZSA9PT0gXCJwYWdlXCIpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRcdGxhYmVsOiBcIkluc3BlY3QgV2luZG93XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDbG9zZVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXBhcmF0b3I6IFwiYWZ0ZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH0gZWxzZSBpZiAobWVudVR5cGUgPT09IFwidmlld1wiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFZpZXdcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiUHJpbnRcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VwYXJhdG9yOiBcImJlZm9yZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRcdGxhYmVsOiBcIkNyZWF0ZSBBcHAgRGVmaW5pdGlvblwiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwicmFpc2UtY3JlYXRlLWFwcC1kZWZpbml0aW9uLWludGVudFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tSWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IERldmVsb3BlckFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBEZXZBbmFseXRpY3NNb2R1bGUgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IERldmVsb3Blck1lbnVzIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBEZXZlbG9wZXJBY3Rpb25zKCksXG5cdGFuYWx5dGljczogbmV3IERldkFuYWx5dGljc01vZHVsZSgpLFxuXHRtZW51czogbmV3IERldmVsb3Blck1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=