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
/* harmony export */   isValidUrl: () => (/* binding */ isValidUrl),
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
/**
 * Validates the suggested url to see if it can replace the source url.
 * @param sourceUrl the original url to compare against.
 * @param suggestedUrl the suggested url to replace it with.
 * @param constraint the rules to apply against it.
 * @returns whether it is ok to replace the sourceUrl with the suggestedUrl
 */
function isValidUrl(sourceUrl, suggestedUrl, constraint) {
    if (isEmpty(suggestedUrl)) {
        return false;
    }
    if (!Array.isArray(constraint) || constraint.length === 0) {
        return true;
    }
    if (constraint.includes("url-none")) {
        return false;
    }
    if (constraint.includes("url-any")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("url-page")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("url-domain")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O29CQUNELFFBQVEsRUFBRTt3QkFDVCxTQUFTLEVBQUUsT0FBTzt3QkFDbEIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLG1CQUFtQjtxQkFDN0I7aUJBQ0Q7YUFDRCxDQUFDO1FBQ0gsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzVIRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFDSTtBQUNSO0FBRWxDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxPQUFPLEVBQUUsSUFBSSxzREFBZ0IsRUFBRTtJQUMvQixTQUFTLEVBQUUsSUFBSSwwREFBa0IsRUFBRTtJQUNuQyxLQUFLLEVBQUUsSUFBSSxrREFBYyxFQUFFO0NBQzNCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9tYW5pZmVzdC10eXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9hbmFseXRpY3MudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBNYW5pZmVzdFR5cGVzIH0gZnJvbSBcIi4vc2hhcGVzL2FwcC1zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IE1BTklGRVNUX1RZUEVTOiBNYW5pZmVzdFR5cGVzID0ge1xuXHRWaWV3OiB7XG5cdFx0aWQ6IFwidmlld1wiLFxuXHRcdGxhYmVsOiBcIlZpZXdcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gYmUgcG9pbnRlZCB0byBhIGpzb24gZmlsZSB0aGF0IGNvbnRhaW5zIHZpZXcgb3B0aW9ucy5cIlxuXHR9LFxuXHRJbmxpbmVWaWV3OiB7XG5cdFx0aWQ6IFwiaW5saW5lLXZpZXdcIixcblx0XHRsYWJlbDogXCJWaWV3XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgdGhlIG9wdGlvbnMgaW5saW5lIHJhdGhlciB0aGFuIGEgdXJsIHRvIGEganNvbiBmaWxlLlwiXG5cdH0sXG5cdFdpbmRvdzoge1xuXHRcdGlkOiBcIndpbmRvd1wiLFxuXHRcdGxhYmVsOiBcIldpbmRvd1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhIGpzb24gZmlsZSB0aGF0IGNvbnRhaW5zIGNsYXNzaWMgd2luZG93IG9wdGlvbnMuXCJcblx0fSxcblx0SW5saW5lV2luZG93OiB7XG5cdFx0aWQ6IFwiaW5saW5lLXdpbmRvd1wiLFxuXHRcdGxhYmVsOiBcIldpbmRvd1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIHRoZSBjbGFzc2ljIHdpbmRvdyBvcHRpb25zIGlubGluZSByYXRoZXIgdGhhbiBhIHVybCB0byBhIGpzb24gZmlsZS5cIlxuXHR9LFxuXHRTbmFwc2hvdDoge1xuXHRcdGlkOiBcInNuYXBzaG90XCIsXG5cdFx0bGFiZWw6IFwiU25hcHNob3RcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBhIHNuYXBzaG90IChvbmUgb3IgbW9yZSB3aW5kb3dzKVwiXG5cdH0sXG5cdElubGluZVNuYXBzaG90OiB7XG5cdFx0aWQ6IFwiaW5saW5lLXNuYXBzaG90XCIsXG5cdFx0bGFiZWw6IFwiU25hcHNob3RcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSBhIHNuYXBzaG90IGlubGluZSByYXRoZXIgdGhhbiBhIHVybCB0byBhIGpzb24gZmlsZSB0aGF0IGNvbnRhaW5zIGEgc25hcHNob3QgKG9uZSBvciBtb3JlIHdpbmRvd3MpXCJcblx0fSxcblx0TWFuaWZlc3Q6IHtcblx0XHRpZDogXCJtYW5pZmVzdFwiLFxuXHRcdGxhYmVsOiBcIkFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhIGpzb24gZmlsZSB0aGF0IGlzIGFuIG9wZW5maW4gbWFuaWZlc3QuIEFuIG9wZW5maW4gYXBwLlwiXG5cdH0sXG5cdEV4dGVybmFsOiB7XG5cdFx0aWQ6IFwiZXh0ZXJuYWxcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gZXhlLlwiXG5cdH0sXG5cdElubGluZUV4dGVybmFsOiB7XG5cdFx0aWQ6IFwiaW5saW5lLWV4dGVybmFsXCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhbiBleGUgdXNpbmcgYW4gaW5saW5lIGxhdW5jaCBleHRlcm5hbCBwcm9jZXNzIHJlcXVlc3QuXCJcblx0fSxcblx0QXBwYXNzZXQ6IHtcblx0XHRpZDogXCJhcHBhc3NldFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjogXCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhbiBhcHAgYXNzZXQgbmFtZS5cIlxuXHR9LFxuXHRJbmxpbmVBcHBBc3NldDoge1xuXHRcdGlkOiBcImlubGluZS1hcHBhc3NldFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gYXBwIGFzc2V0IGNvbmZpZyB1c2luZyBhbiBpbmxpbmUgbGF1bmNoIGV4dGVybmFsIHByb2Nlc3MgcmVxdWVzdC5cIlxuXHR9LFxuXHREZXNrdG9wQnJvd3Nlcjoge1xuXHRcdGlkOiBcImRlc2t0b3AtYnJvd3NlclwiLFxuXHRcdGxhYmVsOiBcIkRlc2t0b3AgQnJvd3NlclwiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBwb2ludCB0byBhIHVybCB3aGljaCB3aWxsIGJlIGxhdW5jaGVkIGluIHRoZSBkZWZhdWx0IGRlc2t0b3AgYnJvd3Nlci5cIlxuXHR9LFxuXHRFbmRwb2ludDoge1xuXHRcdGlkOiBcImVuZHBvaW50XCIsXG5cdFx0bGFiZWw6IFwiRW5kcG9pbnRcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gZW5kcG9pbnQgKHdoaWNoIHNob3VsZCBiZSBkZWZpbmVkIGluIHRoZSBlbmRwb2ludFByb3ZpZGVyKS4gQWN0aW9uIHdpbGwgYmUgY2FsbGVkIG9uIHRoYXQgZW5kcG9pbnQgYW5kIHBhc3NlZCB0aGUgc3BlY2lmaWVkIGFwcC5cIlxuXHR9LFxuXHRDb25uZWN0aW9uOiB7XG5cdFx0aWQ6IFwiY29ubmVjdGlvblwiLFxuXHRcdGxhYmVsOiBcIkNvbm5lY3RlZCBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSBhIHV1aWQuIFRoaXMgbXVzdCBtYXRjaCB0byBhIGNvbm5lY3Rpb24gcmVnaXN0ZXJlZCBpbiB0aGUgY29ubmVjdGlvblByb3ZpZGVyIHdpdGggYXBwIHN1cHBvcnQuXCJcblx0fSxcblx0VW5yZWdpc3RlcmVkQXBwOiB7XG5cdFx0aWQ6IFwidW5yZWdpc3RlcmVkLWFwcFwiLFxuXHRcdGxhYmVsOiBcIlVucmVnaXN0ZXJlZCBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIHJlcHJlc2VudHMgd2ViIHBhZ2UgaW5zdGFuY2VzIHRoYXQgaGF2ZSBiZWVuIGxhdW5jaGVkIHRoYXQgYXJlIG5vdCBsaW5rZWQgdG8gYW4gYXBwLiBUaGlzIG1hbmlmZXN0IHR5cGUgc2hvdWxkIG5vdCBiZSBpbiB0aGUgcGVybWl0dGVkIG1hbmlmZXN0IHR5cGUgbGlzdCBmb3IgYXBwIGZlZWRzIGFzIGl0IGlzIGZvciBkeW5hbWljIHVybHMuXCJcblx0fVxufTtcbiIsImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEEgd2F5IG9mIHNwZWNpZnkgdGhlIHJ1bGVzIGFyb3VuZCB0aGUgdmFsaWRhdGlvbi5cbiAqIERPTUFJTiBtZWFucyB0aGF0IHRoZSB1cmwgbXVzdCBjb21lIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICogUEFHRSBtZWFucyB0aGF0IHRoZSB1cmxzIG11c3QgbWF0Y2ggdGhlIHNhbWUgb3JpZ2luIGFuZCBwYXRoLlxuICogQU5ZIG1lYW5zIHlvdSBhcmUgYWxsb3dlZCB0byByZXBsYWNlIG9uZSB1cmwgd2l0aCBhbm90aGVyIHdpdGhvdXQgY29uc3RyYWluLlxuICogTk9ORSBtZWFucyB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCB0aGUgdXJsIGlzIG5vdCBjaGFuZ2VkLlxuICovXG5leHBvcnQgdHlwZSBWYWxpZFVSTENvbnN0cmFpbnQgPSBcInVybC1kb21haW5cIiB8IFwidXJsLXBhZ2VcIiB8IFwidXJsLWFueVwiIHwgXCJ1cmwtbm9uZVwiO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc3VnZ2VzdGVkIHVybCB0byBzZWUgaWYgaXQgY2FuIHJlcGxhY2UgdGhlIHNvdXJjZSB1cmwuXG4gKiBAcGFyYW0gc291cmNlVXJsIHRoZSBvcmlnaW5hbCB1cmwgdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHN1Z2dlc3RlZFVybCB0aGUgc3VnZ2VzdGVkIHVybCB0byByZXBsYWNlIGl0IHdpdGguXG4gKiBAcGFyYW0gY29uc3RyYWludCB0aGUgcnVsZXMgdG8gYXBwbHkgYWdhaW5zdCBpdC5cbiAqIEByZXR1cm5zIHdoZXRoZXIgaXQgaXMgb2sgdG8gcmVwbGFjZSB0aGUgc291cmNlVXJsIHdpdGggdGhlIHN1Z2dlc3RlZFVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFVybChcblx0c291cmNlVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHN1Z2dlc3RlZFVybDogc3RyaW5nLFxuXHRjb25zdHJhaW50OiBWYWxpZFVSTENvbnN0cmFpbnRbXSB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG5cdGlmIChpc0VtcHR5KHN1Z2dlc3RlZFVybCkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKCFBcnJheS5pc0FycmF5KGNvbnN0cmFpbnQpIHx8IGNvbnN0cmFpbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtbm9uZVwiKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1hbnlcIikpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoaXNFbXB0eShzb3VyY2VVcmwpKSB7XG5cdFx0Ly8gaWYgd2UgYXJlIGFib3V0IHRvIGRvIGEgZG9tYWluIHJlbGF0ZWQgY2hlY2sgdGhlbiB3ZSBuZWVkIGEgc291cmNlIHVybFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCB2YWxpZGF0ZWRTb3VyY2VVcmwgPSBuZXcgVVJMKHNvdXJjZVVybCk7XG5cdGNvbnN0IHZhbGlkYXRlZFN1Z2dlc3RlZFVybCA9IG5ldyBVUkwoc3VnZ2VzdGVkVXJsKTtcblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1wYWdlXCIpKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCh2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luICsgdmFsaWRhdGVkU291cmNlVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpID09PVxuXHRcdFx0KHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHQpO1xuXHR9XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtZG9tYWluXCIpKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gPT09IHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW47XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IE1BTklGRVNUX1RZUEVTIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tYW5pZmVzdC10eXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIERldmVsb3BlckFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzPzogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3BlckFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wiZGV2ZWxvcGVyLWluc3BlY3RcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5WaWV3VGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLnNlbGVjdGVkVmlld3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBpZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQuc2VsZWN0ZWRWaWV3c1tpXTtcblx0XHRcdFx0XHRjb25zdCB2aWV3ID0gZmluLlZpZXcud3JhcFN5bmMoaWRlbnRpdHkpO1xuXHRcdFx0XHRcdGF3YWl0IHZpZXcuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLlBhZ2VUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCBwYWdlV2luZG93SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSBwYXlsb2FkLndpbmRvd0lkZW50aXR5O1xuXHRcdFx0XHRjb25zdCBwYWdlV2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyhwYWdlV2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCBwYWdlV2luZG93LnNob3dEZXZlbG9wZXJUb29scygpO1xuXHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8udGFyZ2V0ID09PSBcInBsYXRmb3JtXCIgPyBcInBsYXRmb3JtXCIgOiBcIndpbmRvd1wiO1xuXHRcdFx0XHRjb25zdCB0YXJnZXRJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9XG5cdFx0XHRcdFx0dGFyZ2V0ID09PSBcIndpbmRvd1wiXG5cdFx0XHRcdFx0XHQ/IHBheWxvYWQud2luZG93SWRlbnRpdHlcblx0XHRcdFx0XHRcdDogeyB1dWlkOiBwYXlsb2FkLndpbmRvd0lkZW50aXR5LnV1aWQsIG5hbWU6IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZCB9O1xuXHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHRhcmdldElkZW50aXR5KTtcblx0XHRcdFx0YXdhaXQgdGFyZ2V0V2luZG93LnNob3dEZXZlbG9wZXJUb29scygpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJyYWlzZS1jcmVhdGUtYXBwLWRlZmluaXRpb24taW50ZW50XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuVmlld1RhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5zZWxlY3RlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld0lkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IGludGVudE5hbWUgPSBcIkNyZWF0ZUFwcERlZmluaXRpb25cIjtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKHZpZXdJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgdmlldy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgdmlldy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmRjM0ludGVyb3BBcGkgPSBpc1N0cmluZ1ZhbHVlKG9wdGlvbnMuZmRjM0ludGVyb3BBcGkpID8gb3B0aW9ucy5mZGMzSW50ZXJvcEFwaSA6IFwiMS4yXCI7XG5cdFx0XHRcdFx0XHRjb25zdCBwcmVsb2FkcyA9XG5cdFx0XHRcdFx0XHRcdEFycmF5LmlzQXJyYXkob3B0aW9ucy5wcmVsb2FkU2NyaXB0cykgJiYgb3B0aW9ucy5wcmVsb2FkU2NyaXB0cy5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdFx0PyBvcHRpb25zLnByZWxvYWRTY3JpcHRzXG5cdFx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRjb25zdCBtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdFx0dXJsOiBpbmZvLnVybCxcblx0XHRcdFx0XHRcdFx0ZmRjM0ludGVyb3BBcGksXG5cdFx0XHRcdFx0XHRcdGludGVyb3A6IG9wdGlvbnMuaW50ZXJvcCxcblx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YTogb3B0aW9ucy5jdXN0b21EYXRhLFxuXHRcdFx0XHRcdFx0XHRwcmVsb2FkU2NyaXB0czogcHJlbG9hZHNcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpY29ucyA9IFtdO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2aWNvbnMgPSBpbmZvLmZhdmljb25zIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZiA9IDA7IGYgPCBmYXZpY29ucy5sZW5ndGg7IGYrKykge1xuXHRcdFx0XHRcdFx0XHRpY29ucy5wdXNoKHsgc3JjOiBmYXZpY29uc1tmXSB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGFwcCA9IHtcblx0XHRcdFx0XHRcdFx0YXBwSWQ6IG5hbWUsXG5cdFx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBpbmZvLnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlOiBNQU5JRkVTVF9UWVBFUy5JbmxpbmVWaWV3LmlkLFxuXHRcdFx0XHRcdFx0XHRtYW5pZmVzdCxcblx0XHRcdFx0XHRcdFx0dGFnczogW01BTklGRVNUX1RZUEVTLlZpZXcuaWRdLFxuXHRcdFx0XHRcdFx0XHRpY29ucyxcblx0XHRcdFx0XHRcdFx0aW1hZ2VzOiBbXSxcblx0XHRcdFx0XHRcdFx0cHVibGlzaGVyOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRjb250YWN0RW1haWw6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHN1cHBvcnRFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0aW50ZW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIm9wZW5maW4uYXBwXCIsXG5cdFx0XHRcdFx0XHRcdFx0YXBwXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJhaXNlIGludGVudCAke2ludGVudE5hbWV9IGZvciB2aWV3ICR7dmlld0lkZW50aXR5Lm5hbWV9YCxcblx0XHRcdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0QW5hbHl0aWNzTW9kdWxlLFxuXHRQbGF0Zm9ybUFuYWx5dGljc0V2ZW50XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYW5hbHl0aWNzLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBEZXZBbmFseXRpY3NPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhbmFseXRpY3MgbW9kdWxlIHVzaW5nIHRoZSBpbnRlcm9wIGNoYW5uZWxzIGFzIHRoZSBtZWFucyBvZiBwdWJsaXNoaW5nIHRoZSBldmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXZBbmFseXRpY3NNb2R1bGUgaW1wbGVtZW50cyBBbmFseXRpY3NNb2R1bGU8RGV2QW5hbHl0aWNzT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfaW50ZXJvcENsaWVudDogT3BlbkZpbi5JbnRlcm9wQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX2NoYW5uZWw/OiBPcGVuRmluLlNlc3Npb25Db250ZXh0R3JvdXA7XG5cblx0cHJpdmF0ZSBfY29udGV4dFR5cGU/OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfY2FjaGVkQW5hbHl0aWNFdmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSA9IFtdO1xuXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBNb2R1bGVIZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERldkFuYWx5dGljc09wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyQW5hbHl0aWNzTW9kdWxlXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6ZWRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTZXNzaW9uIElkOiBcIiwgaGVscGVycy5zZXNzaW9uSWQpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2NvbnRleHRUeXBlID0gZGVmaW5pdGlvbi5kYXRhPy5jb250ZXh0VHlwZSA/PyBcImZpbi5kZXYucGxhdGZvcm0uYW5hbHl0aWNzXCI7XG5cdFx0Y29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IGRlZmluaXRpb24uZGF0YT8uc2Vzc2lvbkNvbnRleHRHcm91cE5hbWUgPz8gXCJkZXYvcGxhdGZvcm0vYW5hbHl0aWNzXCI7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRgVXNpbmcgY2hhbm5lbCBuYW1lOiAke2NoYW5uZWxOYW1lfSBhbmQgY29udGV4dFR5cGU6ICR7dGhpcy5fY29udGV4dFR5cGV9LiBUaGVzZSBjYW4gYmUgY3VzdG9taXplZCBieSBwYXNzaW5nIGRhdGEgc2V0dGluZ3M6IHNlc3Npb25Db250ZXh0R3JvdXBOYW1lIGFuZCBjb250ZXh0VHlwZSBpbiB0aGUgbW9kdWxlIHNldHRpbmdzLmBcblx0XHQpO1xuXHRcdGlmICghaXNFbXB0eShoZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTdWJzY3JpYmluZyB0byB0aGUgYWZ0ZXIgYm9vdHN0cmFwIGV2ZW50LlwiKTtcblx0XHRcdGNvbnN0IGxpZmVDeWNsZUFmdGVyQm9vdHN0cmFwU3Vic2NyaXB0aW9uSWQgPSBoZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcImFmdGVyLWJvb3RzdHJhcFwiLFxuXHRcdFx0XHRhc3luYyAoX3BsYXRmb3JtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGhlbHBlcnMuZ2V0SW50ZXJvcENsaWVudCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkFmdGVyIGJvb3RzdHJhcCBsaWZlY3ljbGUgZXZlbnQgcmVjZWl2ZWQuIEdldHRpbmcgaW50ZXJvcCBjbGllbnQuXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5faW50ZXJvcENsaWVudCA9IGF3YWl0IGhlbHBlcnMuZ2V0SW50ZXJvcENsaWVudCgpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVyb3BDbGllbnQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fY2hhbm5lbCA9IGF3YWl0IHRoaXMuX2ludGVyb3BDbGllbnQuam9pblNlc3Npb25Db250ZXh0R3JvdXAoY2hhbm5lbE5hbWUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8udW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9oZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcdFx0XHRcdFx0bGlmZUN5Y2xlQWZ0ZXJCb290c3RyYXBTdWJzY3JpcHRpb25JZCxcblx0XHRcdFx0XHRcdFx0XHRcdFwiYWZ0ZXItYm9vdHN0cmFwXCJcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XCJUaGlzIGFuYWx5dGljcyBtb2R1bGUgcmVxdWlyZXMgYSBzZXNzaW9uIGNvbnRleHQgZ3JvdXAgbmFtZSwgYSBjb250ZXh0IHR5cGUsIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSBhbiBpbnRlcm9wIGNsaWVudCBhbmQgdGhlIGFiaWxpdHkgdG8gbGlzdGVuIGZvciBsaWZlY3ljbGUgZXZlbnRzLiBVbmZvcnR1bmF0ZWx5IHRoaXMgY3JpdGVyaWEgaGFzIG5vdCBiZWVuIG1ldC5cIlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIEFuYWx5dGljcy4gVGhpcyBleGFtcGxlIG1vZHVsZSBzaW1wbGUgY29uc29sZSBsb2dzIHRoZSBldmVudHMuIFlvdSBjb3VsZCBiYXRjaCB0aGUgZXZlbnRzIGFuZCBwYXNzIHNldHRpbmdzIChudW1iZXIgdG8gYmF0Y2ggZXRjLCBkZXN0aW5hdGlvbiB0byBzZW5kIGV2ZW50cykgdmlhIHRoZSBtb2R1bGUgZGVmaW5pdGlvbi5cblx0ICogQHBhcmFtIGV2ZW50cyBvbmUgb2YgbW9yZSBhbmFseXRpYyBldmVudHMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlQW5hbHl0aWNzKGV2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50cykpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihcIldlIHdlcmUgbm90IHBhc3NlZCBhbiBhcnJheSBvZiBhbmFseXRpY2FsIGV2ZW50cy5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9jaGFubmVsKSkge1xuXHRcdFx0bGV0IHBsYXRmb3JtQW5hbHl0aWNFdmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSA9IFtdO1xuXHRcdFx0aWYgKHRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBBZGRpbmcgJHt0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cy5sZW5ndGh9IGFuYWx5dGljIGV2ZW50cy5gKTtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRcdFx0cGxhdGZvcm1BbmFseXRpY0V2ZW50cy5wdXNoKC4uLnRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzKTtcblx0XHRcdFx0dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMgPSBbXTtcblx0XHRcdH1cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0XHRwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLnB1c2goLi4uZXZlbnRzKTtcblx0XHRcdGNvbnN0IGV2ZW50Q291bnQgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmxlbmd0aDtcblx0XHRcdHBsYXRmb3JtQW5hbHl0aWNFdmVudHMgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmZpbHRlcihcblx0XHRcdFx0KGVudHJ5KSA9PiAhKGVudHJ5LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnRlcm9wXCIgJiYgZW50cnkuc291cmNlLnRvTG93ZXJDYXNlKCkgIT09IFwiYnJvd3NlclwiKVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGZpbHRlcmVkQ291bnQgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmxlbmd0aDtcblxuXHRcdFx0aWYgKGV2ZW50Q291bnQgIT09IGZpbHRlcmVkQ291bnQpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdGBGaWx0ZXJlZCBvdXQgJHtcblx0XHRcdFx0XHRcdGV2ZW50Q291bnQgLSBmaWx0ZXJlZENvdW50XG5cdFx0XHRcdFx0fSBldmVudHMgYXMgdGhleSB3ZXJlIG9mIHR5cGUgaW50ZXJvcCBhbmQgbm90IGZyb20gdGhlIGJyb3dzZXIgYW5kIHdlIHNlbmQgZXZlbnRzIG91dCBvdmVyIGludGVyb3BgXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0XHRcdHR5cGU6IHRoaXMuX2NvbnRleHRUeXBlLFxuXHRcdFx0XHRuYW1lOiBcIkFuYWx5dGljIEV2ZW50c1wiLFxuXHRcdFx0XHRldmVudHM6IHBsYXRmb3JtQW5hbHl0aWNFdmVudHNcblx0XHRcdH07XG5cdFx0XHRhd2FpdCB0aGlzLl9jaGFubmVsLnNldENvbnRleHQoY29udGV4dCBhcyBPcGVuRmluLkNvbnRleHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMucHVzaCguLi5ldmVudHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIHRoZSBtb2R1bGUuIElmIHRoaXMgbW9kdWxlIGhhZCBhbnkgY2FjaGVkIGV2ZW50cyBpdCBuZWVkZWQgdG8gcHJvY2VzcyBpdCBjb3VsZCB0cnkgYW5kIGZsdXNoIHRoZW0gaGVyZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24/KCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImNsb3NpbmcgZG93blwiKTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1lbnVFbnRyeSwgTWVudVR5cGUsIE1lbnVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIERldmVsb3Blck1lbnVzIGltcGxlbWVudHMgTWVudXMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3Blck1lbnVzXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEByZXR1cm5zIFRoZSBtZW51IGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KG1lbnVUeXBlOiBNZW51VHlwZSwgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBXaW5kb3dcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJub3RpZmljYXRpb24tdG9nZ2xlXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFBsYXRmb3JtXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiLFxuXHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7IHRhcmdldDogXCJwbGF0Zm9ybVwiIH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH0gZWxzZSBpZiAobWVudVR5cGUgPT09IFwicGFnZVwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFdpbmRvd1wiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VwYXJhdG9yOiBcImFmdGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9IGVsc2UgaWYgKG1lbnVUeXBlID09PSBcInZpZXdcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBWaWV3XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIlByaW50XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJDcmVhdGUgQXBwIERlZmluaXRpb25cIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGN1c3RvbUlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBEZXZlbG9wZXJBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgRGV2QW5hbHl0aWNzTW9kdWxlIH0gZnJvbSBcIi4vYW5hbHl0aWNzXCI7XG5pbXBvcnQgeyBEZXZlbG9wZXJNZW51cyB9IGZyb20gXCIuL21lbnVzXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhY3Rpb25zOiBuZXcgRGV2ZWxvcGVyQWN0aW9ucygpLFxuXHRhbmFseXRpY3M6IG5ldyBEZXZBbmFseXRpY3NNb2R1bGUoKSxcblx0bWVudXM6IG5ldyBEZXZlbG9wZXJNZW51cygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9