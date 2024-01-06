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
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
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
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
function deepEqual(obj1, obj2, matchPropertyOrder = true) {
    if (isObject(obj1) && isObject(obj2)) {
        const objKeys1 = Object.keys(obj1);
        const objKeys2 = Object.keys(obj2);
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
        if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
            return false;
        }
        for (const key of objKeys1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value1 = obj1[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value2 = obj2[key];
            if (!deepEqual(value1, value2, matchPropertyOrder)) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
                return false;
            }
        }
    }
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
function deepMerge(target, ...sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
        return target;
    }
    const targetAsMap = target;
    const source = sources.shift();
    let keys;
    if (isObject(targetAsMap) && isObject(source)) {
        keys = Object.keys(source);
    }
    else if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            return source;
        }
        keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
    }
    if (keys) {
        const sourceAsMap = source;
        for (const key of keys) {
            const value = sourceAsMap[key];
            if (isObject(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = {};
                }
                deepMerge(targetAsMap[key], value);
            }
            else if (Array.isArray(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = [];
                }
                deepMerge(targetAsMap[key], value);
            }
            else {
                targetAsMap[key] = value;
            }
        }
    }
    return deepMerge(target, ...sources);
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
    else if (isStringValue(err)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvbWFuaWZlc3QtdHlwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvYW5hbHl0aWNzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTWFuaWZlc3RUeXBlcyB9IGZyb20gXCIuL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5cbmV4cG9ydCBjb25zdCBNQU5JRkVTVF9UWVBFUzogTWFuaWZlc3RUeXBlcyA9IHtcblx0Vmlldzoge1xuXHRcdGlkOiBcInZpZXdcIixcblx0XHRsYWJlbDogXCJWaWV3XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGJlIHBvaW50ZWQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyB2aWV3IG9wdGlvbnMuXCJcblx0fSxcblx0SW5saW5lVmlldzoge1xuXHRcdGlkOiBcImlubGluZS12aWV3XCIsXG5cdFx0bGFiZWw6IFwiVmlld1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIHRoZSBvcHRpb25zIGlubGluZSByYXRoZXIgdGhhbiBhIHVybCB0byBhIGpzb24gZmlsZS5cIlxuXHR9LFxuXHRXaW5kb3c6IHtcblx0XHRpZDogXCJ3aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBjbGFzc2ljIHdpbmRvdyBvcHRpb25zLlwiXG5cdH0sXG5cdElubGluZVdpbmRvdzoge1xuXHRcdGlkOiBcImlubGluZS13aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSB0aGUgY2xhc3NpYyB3aW5kb3cgb3B0aW9ucyBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUuXCJcblx0fSxcblx0U25hcHNob3Q6IHtcblx0XHRpZDogXCJzbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgYSBzbmFwc2hvdCAob25lIG9yIG1vcmUgd2luZG93cylcIlxuXHR9LFxuXHRJbmxpbmVTbmFwc2hvdDoge1xuXHRcdGlkOiBcImlubGluZS1zbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSBzbmFwc2hvdCBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBhIHNuYXBzaG90IChvbmUgb3IgbW9yZSB3aW5kb3dzKVwiXG5cdH0sXG5cdE1hbmlmZXN0OiB7XG5cdFx0aWQ6IFwibWFuaWZlc3RcIixcblx0XHRsYWJlbDogXCJBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBpcyBhbiBvcGVuZmluIG1hbmlmZXN0LiBBbiBvcGVuZmluIGFwcC5cIlxuXHR9LFxuXHRFeHRlcm5hbDoge1xuXHRcdGlkOiBcImV4dGVybmFsXCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGV4ZS5cIlxuXHR9LFxuXHRJbmxpbmVFeHRlcm5hbDoge1xuXHRcdGlkOiBcImlubGluZS1leHRlcm5hbFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gZXhlIHVzaW5nIGFuIGlubGluZSBsYXVuY2ggZXh0ZXJuYWwgcHJvY2VzcyByZXF1ZXN0LlwiXG5cdH0sXG5cdEFwcGFzc2V0OiB7XG5cdFx0aWQ6IFwiYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gYXBwIGFzc2V0IG5hbWUuXCJcblx0fSxcblx0SW5saW5lQXBwQXNzZXQ6IHtcblx0XHRpZDogXCJpbmxpbmUtYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGFwcCBhc3NldCBjb25maWcgdXNpbmcgYW4gaW5saW5lIGxhdW5jaCBleHRlcm5hbCBwcm9jZXNzIHJlcXVlc3QuXCJcblx0fSxcblx0RGVza3RvcEJyb3dzZXI6IHtcblx0XHRpZDogXCJkZXNrdG9wLWJyb3dzZXJcIixcblx0XHRsYWJlbDogXCJEZXNrdG9wIEJyb3dzZXJcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSB1cmwgd2hpY2ggd2lsbCBiZSBsYXVuY2hlZCBpbiB0aGUgZGVmYXVsdCBkZXNrdG9wIGJyb3dzZXIuXCJcblx0fSxcblx0RW5kcG9pbnQ6IHtcblx0XHRpZDogXCJlbmRwb2ludFwiLFxuXHRcdGxhYmVsOiBcIkVuZHBvaW50XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGVuZHBvaW50ICh3aGljaCBzaG91bGQgYmUgZGVmaW5lZCBpbiB0aGUgZW5kcG9pbnRQcm92aWRlcikuIEFjdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiB0aGF0IGVuZHBvaW50IGFuZCBwYXNzZWQgdGhlIHNwZWNpZmllZCBhcHAuXCJcblx0fSxcblx0Q29ubmVjdGlvbjoge1xuXHRcdGlkOiBcImNvbm5lY3Rpb25cIixcblx0XHRsYWJlbDogXCJDb25uZWN0ZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSB1dWlkLiBUaGlzIG11c3QgbWF0Y2ggdG8gYSBjb25uZWN0aW9uIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbm5lY3Rpb25Qcm92aWRlciB3aXRoIGFwcCBzdXBwb3J0LlwiXG5cdH0sXG5cdFVucmVnaXN0ZXJlZEFwcDoge1xuXHRcdGlkOiBcInVucmVnaXN0ZXJlZC1hcHBcIixcblx0XHRsYWJlbDogXCJVbnJlZ2lzdGVyZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSByZXByZXNlbnRzIHdlYiBwYWdlIGluc3RhbmNlcyB0aGF0IGhhdmUgYmVlbiBsYXVuY2hlZCB0aGF0IGFyZSBub3QgbGlua2VkIHRvIGFuIGFwcC4gVGhpcyBtYW5pZmVzdCB0eXBlIHNob3VsZCBub3QgYmUgaW4gdGhlIHBlcm1pdHRlZCBtYW5pZmVzdCB0eXBlIGxpc3QgZm9yIGFwcCBmZWVkcyBhcyBpdCBpcyBmb3IgZHluYW1pYyB1cmxzLlwiXG5cdH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEN1c3RvbUFjdGlvbnNNYXAsIFRvb2xiYXJCdXR0b24sIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzLCBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlTGlzdCB9IGZyb20gXCIuL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIGZvciBhbiBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uczxPID0gdW5rbm93bj4gZXh0ZW5kcyBNb2R1bGVJbXBsZW1lbnRhdGlvbjxPLCBBY3Rpb25IZWxwZXJzPiB7XG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+O1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBtb2R1bGVzIHRoYXQgcHJvdmlkZSBhY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIHBsYXRmb3JtLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25zUHJvdmlkZXJPcHRpb25zID0gTW9kdWxlTGlzdDtcblxuLyoqXG4gKiBFeHRlbmRlZCBoZWxwZXJzIHVzZWQgYnkgYWN0aW9uIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uSGVscGVycyBleHRlbmRzIE1vZHVsZUhlbHBlcnMge1xuXHQvKipcblx0ICogVXBkYXRlIHRvb2xiYXIgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbnMgVGhlIGxpc3Qgb2YgYWxsIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25JZCBUaGUgYnV0dG9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHJlcGxhY2VtZW50QnV0dG9uSWQgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgYnV0dG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgdXBkYXRlZCBidXR0b25zLlxuXHQgKi9cblx0dXBkYXRlVG9vbGJhckJ1dHRvbnM6IChcblx0XHRidXR0b25zOiBUb29sYmFyQnV0dG9uW10sXG5cdFx0YnV0dG9uSWQ6IHN0cmluZyxcblx0XHRyZXBsYWNlbWVudEJ1dHRvbklkOiBzdHJpbmdcblx0KSA9PiBQcm9taXNlPFRvb2xiYXJCdXR0b25bXT47XG59XG5cbi8qKlxuICogVXNlIHRoaXMgaW4gcHJlZmVyZW5jZSB0byBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIGZyb20gd29ya3NwYWNlLXBsYXRmb3JtIHRvIGF2b2lkIHRoZSBpbXBvcnQgb2YgdGhlIHdob2xlIG9mIHdvcmtzcGFjZSBwYWNrYWdlIGluIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUge1xuXHRDdXN0b21CdXR0b24gPSBcIkN1c3RvbUJ1dHRvblwiLFxuXHRTdG9yZUN1c3RvbUJ1dHRvbiA9IFwiU3RvcmVDdXN0b21CdXR0b25cIixcblx0Q3VzdG9tRHJvcGRvd25JdGVtID0gXCJDdXN0b21Ecm9wZG93bkl0ZW1cIixcblx0R2xvYmFsQ29udGV4dE1lbnUgPSBcIkdsb2JhbENvbnRleHRNZW51XCIsXG5cdFZpZXdUYWJDb250ZXh0TWVudSA9IFwiVmlld1RhYkNvbnRleHRNZW51XCIsXG5cdFBhZ2VUYWJDb250ZXh0TWVudSA9IFwiUGFnZVRhYkNvbnRleHRNZW51XCIsXG5cdFNhdmVCdXR0b25Db250ZXh0TWVudSA9IFwiU2F2ZUJ1dHRvbkNvbnRleHRNZW51XCIsXG5cdEFQSSA9IFwiQVBJXCJcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBEbyBhIGRlZXAgY29tcGFyaXNvbiBvZiB0aGUgb2JqZWN0cy5cbiAqIEBwYXJhbSBvYmoxIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvYmoyIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbWF0Y2hQcm9wZXJ0eU9yZGVyIElmIHRydWUgdGhlIHByb3BlcnRpZXMgbXVzdCBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9iamVjdHMgYXJlIHRoZSBzYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEVxdWFsKG9iajE6IHVua25vd24sIG9iajI6IHVua25vd24sIG1hdGNoUHJvcGVydHlPcmRlcjogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcblx0aWYgKGlzT2JqZWN0KG9iajEpICYmIGlzT2JqZWN0KG9iajIpKSB7XG5cdFx0Y29uc3Qgb2JqS2V5czEgPSBPYmplY3Qua2V5cyhvYmoxKTtcblx0XHRjb25zdCBvYmpLZXlzMiA9IE9iamVjdC5rZXlzKG9iajIpO1xuXG5cdFx0aWYgKG9iaktleXMxLmxlbmd0aCAhPT0gb2JqS2V5czIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoUHJvcGVydHlPcmRlciAmJiBKU09OLnN0cmluZ2lmeShvYmpLZXlzMSkgIT09IEpTT04uc3RyaW5naWZ5KG9iaktleXMyKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iaktleXMxKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUxID0gKG9iajEgYXMgYW55KVtrZXldO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMiA9IChvYmoyIGFzIGFueSlba2V5XTtcblxuXHRcdFx0aWYgKCFkZWVwRXF1YWwodmFsdWUxLCB2YWx1ZTIsIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajEpICYmIEFycmF5LmlzQXJyYXkob2JqMikpIHtcblx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFkZWVwRXF1YWwob2JqMVtpXSwgb2JqMltpXSwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKTtcbn1cblxuLyoqXG4gKiBEZWVwIG1lcmdlIHR3byBvYmplY3RzLlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGJlIG1lcmdlZCBpbnRvLlxuICogQHBhcmFtIHNvdXJjZXMgVGhlIG9iamVjdHMgdG8gbWVyZ2UgaW50byB0aGUgdGFyZ2V0LlxuICogQHJldHVybnMgVGhlIG1lcmdlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8VCA9IHVua25vd24+KHRhcmdldDogVCwgLi4uc291cmNlczogVFtdKTogVCB7XG5cdGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VzKSB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc01hcCA9IHRhcmdldCBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cblx0bGV0IGtleXM7XG5cdGlmIChpc09iamVjdCh0YXJnZXRBc01hcCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gc291cmNlO1xuXHRcdH1cblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKS5tYXAoKGspID0+IE51bWJlci5wYXJzZUludChrLCAxMCkpO1xuXHR9XG5cblx0aWYgKGtleXMpIHtcblx0XHRjb25zdCBzb3VyY2VBc01hcCA9IHNvdXJjZSBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlQXNNYXBba2V5XTtcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHRhcmdldCwgLi4uc291cmNlcyk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IE1BTklGRVNUX1RZUEVTIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tYW5pZmVzdC10eXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIERldmVsb3BlckFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzPzogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3BlckFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wiZGV2ZWxvcGVyLWluc3BlY3RcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5WaWV3VGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLnNlbGVjdGVkVmlld3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBpZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQuc2VsZWN0ZWRWaWV3c1tpXTtcblx0XHRcdFx0XHRjb25zdCB2aWV3ID0gZmluLlZpZXcud3JhcFN5bmMoaWRlbnRpdHkpO1xuXHRcdFx0XHRcdGF3YWl0IHZpZXcuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLlBhZ2VUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCBwYWdlV2luZG93SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSBwYXlsb2FkLndpbmRvd0lkZW50aXR5O1xuXHRcdFx0XHRjb25zdCBwYWdlV2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyhwYWdlV2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCBwYWdlV2luZG93LnNob3dEZXZlbG9wZXJUb29scygpO1xuXHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8udGFyZ2V0ID09PSBcInBsYXRmb3JtXCIgPyBcInBsYXRmb3JtXCIgOiBcIndpbmRvd1wiO1xuXHRcdFx0XHRjb25zdCB0YXJnZXRJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9XG5cdFx0XHRcdFx0dGFyZ2V0ID09PSBcIndpbmRvd1wiXG5cdFx0XHRcdFx0XHQ/IHBheWxvYWQud2luZG93SWRlbnRpdHlcblx0XHRcdFx0XHRcdDogeyB1dWlkOiBwYXlsb2FkLndpbmRvd0lkZW50aXR5LnV1aWQsIG5hbWU6IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZCB9O1xuXHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHRhcmdldElkZW50aXR5KTtcblx0XHRcdFx0YXdhaXQgdGFyZ2V0V2luZG93LnNob3dEZXZlbG9wZXJUb29scygpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJyYWlzZS1jcmVhdGUtYXBwLWRlZmluaXRpb24taW50ZW50XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuVmlld1RhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5zZWxlY3RlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld0lkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IGludGVudE5hbWUgPSBcIkNyZWF0ZUFwcERlZmluaXRpb25cIjtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKHZpZXdJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgdmlldy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgdmlldy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmRjM0ludGVyb3BBcGkgPSBpc1N0cmluZ1ZhbHVlKG9wdGlvbnMuZmRjM0ludGVyb3BBcGkpID8gb3B0aW9ucy5mZGMzSW50ZXJvcEFwaSA6IFwiMS4yXCI7XG5cdFx0XHRcdFx0XHRjb25zdCBwcmVsb2FkcyA9XG5cdFx0XHRcdFx0XHRcdEFycmF5LmlzQXJyYXkob3B0aW9ucy5wcmVsb2FkU2NyaXB0cykgJiYgb3B0aW9ucy5wcmVsb2FkU2NyaXB0cy5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdFx0PyBvcHRpb25zLnByZWxvYWRTY3JpcHRzXG5cdFx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRjb25zdCBtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdFx0dXJsOiBpbmZvLnVybCxcblx0XHRcdFx0XHRcdFx0ZmRjM0ludGVyb3BBcGksXG5cdFx0XHRcdFx0XHRcdGludGVyb3A6IG9wdGlvbnMuaW50ZXJvcCxcblx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YTogb3B0aW9ucy5jdXN0b21EYXRhLFxuXHRcdFx0XHRcdFx0XHRwcmVsb2FkU2NyaXB0czogcHJlbG9hZHNcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpY29ucyA9IFtdO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2aWNvbnMgPSBpbmZvLmZhdmljb25zIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZiA9IDA7IGYgPCBmYXZpY29ucy5sZW5ndGg7IGYrKykge1xuXHRcdFx0XHRcdFx0XHRpY29ucy5wdXNoKHsgc3JjOiBmYXZpY29uc1tmXSB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGFwcCA9IHtcblx0XHRcdFx0XHRcdFx0YXBwSWQ6IG5hbWUsXG5cdFx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBpbmZvLnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlOiBNQU5JRkVTVF9UWVBFUy5JbmxpbmVWaWV3LmlkLFxuXHRcdFx0XHRcdFx0XHRtYW5pZmVzdCxcblx0XHRcdFx0XHRcdFx0dGFnczogW01BTklGRVNUX1RZUEVTLlZpZXcuaWRdLFxuXHRcdFx0XHRcdFx0XHRpY29ucyxcblx0XHRcdFx0XHRcdFx0aW1hZ2VzOiBbXSxcblx0XHRcdFx0XHRcdFx0cHVibGlzaGVyOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRjb250YWN0RW1haWw6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHN1cHBvcnRFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0aW50ZW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIm9wZW5maW4uYXBwXCIsXG5cdFx0XHRcdFx0XHRcdFx0YXBwXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJhaXNlIGludGVudCAke2ludGVudE5hbWV9IGZvciB2aWV3ICR7dmlld0lkZW50aXR5Lm5hbWV9YCxcblx0XHRcdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0QW5hbHl0aWNzTW9kdWxlLFxuXHRQbGF0Zm9ybUFuYWx5dGljc0V2ZW50XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYW5hbHl0aWNzLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBEZXZBbmFseXRpY3NPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhbmFseXRpY3MgbW9kdWxlIHVzaW5nIHRoZSBpbnRlcm9wIGNoYW5uZWxzIGFzIHRoZSBtZWFucyBvZiBwdWJsaXNoaW5nIHRoZSBldmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXZBbmFseXRpY3NNb2R1bGUgaW1wbGVtZW50cyBBbmFseXRpY3NNb2R1bGU8RGV2QW5hbHl0aWNzT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfaW50ZXJvcENsaWVudDogT3BlbkZpbi5JbnRlcm9wQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX2NoYW5uZWw/OiBPcGVuRmluLlNlc3Npb25Db250ZXh0R3JvdXA7XG5cblx0cHJpdmF0ZSBfY29udGV4dFR5cGU/OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfY2FjaGVkQW5hbHl0aWNFdmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSA9IFtdO1xuXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBNb2R1bGVIZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERldkFuYWx5dGljc09wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyQW5hbHl0aWNzTW9kdWxlXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6ZWRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTZXNzaW9uIElkOiBcIiwgaGVscGVycy5zZXNzaW9uSWQpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2NvbnRleHRUeXBlID0gZGVmaW5pdGlvbi5kYXRhPy5jb250ZXh0VHlwZSA/PyBcImZpbi5kZXYucGxhdGZvcm0uYW5hbHl0aWNzXCI7XG5cdFx0Y29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IGRlZmluaXRpb24uZGF0YT8uc2Vzc2lvbkNvbnRleHRHcm91cE5hbWUgPz8gXCJkZXYvcGxhdGZvcm0vYW5hbHl0aWNzXCI7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRgVXNpbmcgY2hhbm5lbCBuYW1lOiAke2NoYW5uZWxOYW1lfSBhbmQgY29udGV4dFR5cGU6ICR7dGhpcy5fY29udGV4dFR5cGV9LiBUaGVzZSBjYW4gYmUgY3VzdG9taXplZCBieSBwYXNzaW5nIGRhdGEgc2V0dGluZ3M6IHNlc3Npb25Db250ZXh0R3JvdXBOYW1lIGFuZCBjb250ZXh0VHlwZSBpbiB0aGUgbW9kdWxlIHNldHRpbmdzLmBcblx0XHQpO1xuXHRcdGlmICghaXNFbXB0eShoZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTdWJzY3JpYmluZyB0byB0aGUgYWZ0ZXIgYm9vdHN0cmFwIGV2ZW50LlwiKTtcblx0XHRcdGNvbnN0IGxpZmVDeWNsZUFmdGVyQm9vdHN0cmFwU3Vic2NyaXB0aW9uSWQgPSBoZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcImFmdGVyLWJvb3RzdHJhcFwiLFxuXHRcdFx0XHRhc3luYyAoX3BsYXRmb3JtKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGhlbHBlcnMuZ2V0SW50ZXJvcENsaWVudCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkFmdGVyIGJvb3RzdHJhcCBsaWZlY3ljbGUgZXZlbnQgcmVjZWl2ZWQuIEdldHRpbmcgaW50ZXJvcCBjbGllbnQuXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5faW50ZXJvcENsaWVudCA9IGF3YWl0IGhlbHBlcnMuZ2V0SW50ZXJvcENsaWVudCgpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVyb3BDbGllbnQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fY2hhbm5lbCA9IGF3YWl0IHRoaXMuX2ludGVyb3BDbGllbnQuam9pblNlc3Npb25Db250ZXh0R3JvdXAoY2hhbm5lbE5hbWUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8udW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9oZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcdFx0XHRcdFx0bGlmZUN5Y2xlQWZ0ZXJCb290c3RyYXBTdWJzY3JpcHRpb25JZCxcblx0XHRcdFx0XHRcdFx0XHRcdFwiYWZ0ZXItYm9vdHN0cmFwXCJcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XCJUaGlzIGFuYWx5dGljcyBtb2R1bGUgcmVxdWlyZXMgYSBzZXNzaW9uIGNvbnRleHQgZ3JvdXAgbmFtZSwgYSBjb250ZXh0IHR5cGUsIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSBhbiBpbnRlcm9wIGNsaWVudCBhbmQgdGhlIGFiaWxpdHkgdG8gbGlzdGVuIGZvciBsaWZlY3ljbGUgZXZlbnRzLiBVbmZvcnR1bmF0ZWx5IHRoaXMgY3JpdGVyaWEgaGFzIG5vdCBiZWVuIG1ldC5cIlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIEFuYWx5dGljcy4gVGhpcyBleGFtcGxlIG1vZHVsZSBzaW1wbGUgY29uc29sZSBsb2dzIHRoZSBldmVudHMuIFlvdSBjb3VsZCBiYXRjaCB0aGUgZXZlbnRzIGFuZCBwYXNzIHNldHRpbmdzIChudW1iZXIgdG8gYmF0Y2ggZXRjLCBkZXN0aW5hdGlvbiB0byBzZW5kIGV2ZW50cykgdmlhIHRoZSBtb2R1bGUgZGVmaW5pdGlvbi5cblx0ICogQHBhcmFtIGV2ZW50cyBvbmUgb2YgbW9yZSBhbmFseXRpYyBldmVudHMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlQW5hbHl0aWNzKGV2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50cykpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihcIldlIHdlcmUgbm90IHBhc3NlZCBhbiBhcnJheSBvZiBhbmFseXRpY2FsIGV2ZW50cy5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9jaGFubmVsKSkge1xuXHRcdFx0bGV0IHBsYXRmb3JtQW5hbHl0aWNFdmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSA9IFtdO1xuXHRcdFx0aWYgKHRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBBZGRpbmcgJHt0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cy5sZW5ndGh9IGFuYWx5dGljIGV2ZW50cy5gKTtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRcdFx0cGxhdGZvcm1BbmFseXRpY0V2ZW50cy5wdXNoKC4uLnRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzKTtcblx0XHRcdFx0dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMgPSBbXTtcblx0XHRcdH1cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0XHRwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLnB1c2goLi4uZXZlbnRzKTtcblx0XHRcdGNvbnN0IGV2ZW50Q291bnQgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmxlbmd0aDtcblx0XHRcdHBsYXRmb3JtQW5hbHl0aWNFdmVudHMgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmZpbHRlcihcblx0XHRcdFx0KGVudHJ5KSA9PiAhKGVudHJ5LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnRlcm9wXCIgJiYgZW50cnkuc291cmNlLnRvTG93ZXJDYXNlKCkgIT09IFwiYnJvd3NlclwiKVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGZpbHRlcmVkQ291bnQgPSBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLmxlbmd0aDtcblxuXHRcdFx0aWYgKGV2ZW50Q291bnQgIT09IGZpbHRlcmVkQ291bnQpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdGBGaWx0ZXJlZCBvdXQgJHtcblx0XHRcdFx0XHRcdGV2ZW50Q291bnQgLSBmaWx0ZXJlZENvdW50XG5cdFx0XHRcdFx0fSBldmVudHMgYXMgdGhleSB3ZXJlIG9mIHR5cGUgaW50ZXJvcCBhbmQgbm90IGZyb20gdGhlIGJyb3dzZXIgYW5kIHdlIHNlbmQgZXZlbnRzIG91dCBvdmVyIGludGVyb3BgXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0XHRcdHR5cGU6IHRoaXMuX2NvbnRleHRUeXBlLFxuXHRcdFx0XHRuYW1lOiBcIkFuYWx5dGljIEV2ZW50c1wiLFxuXHRcdFx0XHRldmVudHM6IHBsYXRmb3JtQW5hbHl0aWNFdmVudHNcblx0XHRcdH07XG5cdFx0XHRhd2FpdCB0aGlzLl9jaGFubmVsLnNldENvbnRleHQoY29udGV4dCBhcyBPcGVuRmluLkNvbnRleHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMucHVzaCguLi5ldmVudHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIHRoZSBtb2R1bGUuIElmIHRoaXMgbW9kdWxlIGhhZCBhbnkgY2FjaGVkIGV2ZW50cyBpdCBuZWVkZWQgdG8gcHJvY2VzcyBpdCBjb3VsZCB0cnkgYW5kIGZsdXNoIHRoZW0gaGVyZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24/KCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImNsb3NpbmcgZG93blwiKTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1lbnVFbnRyeSwgTWVudVR5cGUsIE1lbnVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIERldmVsb3Blck1lbnVzIGltcGxlbWVudHMgTWVudXMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3Blck1lbnVzXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEByZXR1cm5zIFRoZSBtZW51IGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KG1lbnVUeXBlOiBNZW51VHlwZSwgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBXaW5kb3dcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJub3RpZmljYXRpb24tdG9nZ2xlXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFBsYXRmb3JtXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiLFxuXHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7IHRhcmdldDogXCJwbGF0Zm9ybVwiIH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH0gZWxzZSBpZiAobWVudVR5cGUgPT09IFwicGFnZVwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFdpbmRvd1wiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VwYXJhdG9yOiBcImFmdGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9IGVsc2UgaWYgKG1lbnVUeXBlID09PSBcInZpZXdcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBWaWV3XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIlByaW50XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJDcmVhdGUgQXBwIERlZmluaXRpb25cIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGN1c3RvbUlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBEZXZlbG9wZXJBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgRGV2QW5hbHl0aWNzTW9kdWxlIH0gZnJvbSBcIi4vYW5hbHl0aWNzXCI7XG5pbXBvcnQgeyBEZXZlbG9wZXJNZW51cyB9IGZyb20gXCIuL21lbnVzXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhY3Rpb25zOiBuZXcgRGV2ZWxvcGVyQWN0aW9ucygpLFxuXHRhbmFseXRpY3M6IG5ldyBEZXZBbmFseXRpY3NNb2R1bGUoKSxcblx0bWVudXM6IG5ldyBEZXZlbG9wZXJNZW51cygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9