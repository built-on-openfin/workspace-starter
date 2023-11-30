/******/ var __webpack_modules__ = ({

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

/***/ "./client/src/modules/composite/default-workspace/actions.ts":
/*!*******************************************************************!*\
  !*** ./client/src/modules/composite/default-workspace/actions.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultWorkspaceActions: () => (/* binding */ DefaultWorkspaceActions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _default_workspace_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-workspace-storage */ "./client/src/modules/composite/default-workspace/default-workspace-storage.ts");



/**
 * Implement the actions.
 */
class DefaultWorkspaceActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DefaultWorkspaceAction");
        this._defaultWorkspaceStorage = new _default_workspace_storage__WEBPACK_IMPORTED_MODULE_2__.DefaultWorkspaceStorage();
        await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["set-default-workspace"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.GlobalContextMenu) {
                try {
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payload.customData) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._defaultWorkspaceStorage)) {
                        const result = await this._defaultWorkspaceStorage.setDefaultWorkspace(payload.customData);
                        this._logger?.info(`The default workspace state has been updated: ${result}`, payload.customData);
                    }
                    else {
                        this._logger?.warn("An action for setting the default workspace was not passed a payload and cannot be processed.");
                    }
                }
                catch {
                    this._logger?.info("Cannot set the default workspace with the information provided.");
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/default-workspace/default-workspace-storage.ts":
/*!*************************************************************************************!*\
  !*** ./client/src/modules/composite/default-workspace/default-workspace-storage.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultWorkspaceStorage: () => (/* binding */ DefaultWorkspaceStorage)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * A class that contains the methods required for saving and getting a default workspace.
 */
class DefaultWorkspaceStorage {
    /**
     * A helper for saving and returning the default workspace related information.
     * @param settings settings to be used by this helper
     * @param helpers helper functions to be used
     * @param logger a logger to use while performing actions
     */
    async initialize(settings, helpers, logger) {
        this._logger = logger;
        this._helpers = helpers;
        this._settings = settings;
        await this.setupEndpointClient();
        await this.setVersionInfo();
    }
    /**
     * Save the default workspace.
     * @param payload The payload to save.
     * @returns whether or not the save was successful.
     */
    async setDefaultWorkspace(payload) {
        const payloadId = this._settings?.payloadId ?? "default-workspace";
        const setEndpointId = this._settings?.endpointIds?.setDefaultWorkspace ?? "set-default-workspace";
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._endpointClient) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._versionInfo) &&
            this._endpointClient.hasEndpoint(setEndpointId)) {
            const success = await this._endpointClient.action(setEndpointId, {
                id: payloadId,
                platform: fin.me.identity.uuid,
                metaData: {
                    version: {
                        workspacePlatformClient: this._versionInfo.workspacePlatformClient,
                        platformClient: this._versionInfo.platformClient
                    }
                },
                payload
            });
            return success;
        }
        this._logger?.warn("Unable to set the default workspace as the access to the endpoint client, version info or the endpoint is not available.");
        return false;
    }
    /**
     * Get the currently saved default workspace.
     * @returns an object representing the saved default workspace or a payload with an empty workspace
     * and default useLastActiveWorkspace setting.
     */
    async getDefaultWorkspace() {
        const payloadId = this._settings?.payloadId ?? "default-workspace";
        const getEndpointId = this._settings?.endpointIds?.getDefaultWorkspace ?? "get-default-workspace";
        const noSavedData = {
            useLastActiveWorkspace: false,
            workspaceId: ""
        };
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._endpointClient) && this._endpointClient.hasEndpoint(getEndpointId)) {
            const savedWorkspace = await this._endpointClient.requestResponse(getEndpointId, {
                platform: fin.me.identity.uuid,
                id: payloadId
            });
            return savedWorkspace?.payload ?? noSavedData;
        }
        this._logger?.warn("Unable to get the default workspace as the access to the endpoint client or the endpoint is not available.");
        return noSavedData;
    }
    /**
     * Setup the endpoint client if you have access to the function to get the client.
     * @returns a boolean representing whether or not the endpoint client could be created.
     */
    async setupEndpointClient() {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.getEndpointClient)) {
            this._endpointClient = await this._helpers?.getEndpointClient();
            return true;
        }
        return false;
    }
    /**
     * Set the version info for the currently running platform.
     * @returns a boolean representing whether or not the version info was available.
     */
    async setVersionInfo() {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.getVersionInfo)) {
            this._versionInfo = await this._helpers?.getVersionInfo();
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/default-workspace/lifecycle.ts":
/*!*********************************************************************!*\
  !*** ./client/src/modules/composite/default-workspace/lifecycle.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyDefaultWorkspaceProvider: () => (/* binding */ ApplyDefaultWorkspaceProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _default_workspace_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-workspace-storage */ "./client/src/modules/composite/default-workspace/default-workspace-storage.ts");


/**
 * Implementation for the apply default workspace lifecycle provider.
 */
class ApplyDefaultWorkspaceProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ApplyDefaultWorkspaceProvider");
        this._helpers = helpers;
        this._defaultWorkspaceStorage = new _default_workspace_storage__WEBPACK_IMPORTED_MODULE_1__.DefaultWorkspaceStorage();
        await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
        this._logger.info("Initializing");
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
    }
    /**
     * Get the lifecycle events.
     * @returns The map of lifecycle events.
     */
    async get() {
        const lifecycleMap = {};
        lifecycleMap["after-bootstrap"] = async (platform, customData) => {
            try {
                const savedDefaultWorkspace = await this._defaultWorkspaceStorage?.getDefaultWorkspace();
                const workspaceId = savedDefaultWorkspace?.workspaceId;
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(workspaceId) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.launchWorkspace)) {
                    this._logger?.info(`Retrieved workspace id: ${savedDefaultWorkspace?.workspaceId} and we have the ability to launch a workspace. Applying the workspace.`);
                    const workspaceApplied = await this._helpers?.launchWorkspace(workspaceId, this._logger);
                    this._logger?.info(`Workspace Id ${workspaceId} applied: ${workspaceApplied}`);
                }
            }
            catch (err) {
                this._logger?.error("There was an error trying to apply to get or apply the default workspace.", err);
            }
        };
        lifecycleMap["workspace-changed"] = async (platform, customData) => {
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(customData)) {
                const workspaceUpdate = customData;
                if ((workspaceUpdate.action === "update" || workspaceUpdate.action === "create") &&
                    !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._defaultWorkspaceStorage)) {
                    try {
                        const currentDefaultWorkspace = await this._defaultWorkspaceStorage.getDefaultWorkspace();
                        if (currentDefaultWorkspace.useLastActiveWorkspace) {
                            const success = await this._defaultWorkspaceStorage.setDefaultWorkspace({
                                workspaceId: workspaceUpdate.id,
                                useLastActiveWorkspace: true
                            });
                            this._logger?.info(`Default workspace updated to workspace: ${workspaceUpdate.id} through last active workspace: ${success}`);
                        }
                    }
                    catch (err) {
                        this._logger?.error(`Unable to update default workspace to workspace id: ${workspaceUpdate.id} because an error occurred.`, err);
                    }
                }
            }
        };
        return lifecycleMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/default-workspace/menus.ts":
/*!*****************************************************************!*\
  !*** ./client/src/modules/composite/default-workspace/menus.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetDefaultWorkspaceProvider: () => (/* binding */ SetDefaultWorkspaceProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _default_workspace_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-workspace-storage */ "./client/src/modules/composite/default-workspace/default-workspace-storage.ts");


/**
 * Implementation for the set default workspace menus provider.
 */
class SetDefaultWorkspaceProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("SetDefaultWorkspaceProvider");
        this._settings = definition.data;
        this._logger.info("Initializing");
        this._defaultWorkspaceStorage = new _default_workspace_storage__WEBPACK_IMPORTED_MODULE_1__.DefaultWorkspaceStorage();
        await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     * @param relatedMenuId If available provide the related window identity the menu is showing on and page or view ids
     * depending on the menu type.
     * @returns Nothing.
     */
    async get(menuType, platform, relatedMenuId) {
        if (menuType === "global" &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedMenuId?.windowIdentity) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._defaultWorkspaceStorage)) {
            const currentDefaultWorkspace = await this._defaultWorkspaceStorage.getDefaultWorkspace();
            const useLastActiveWorkspaceSet = currentDefaultWorkspace.useLastActiveWorkspace;
            const savedDefaultWorkspaceId = currentDefaultWorkspace.workspaceId;
            const workspaces = await platform.Storage.getWorkspaces();
            const currentWorkspace = await platform.getCurrentWorkspace();
            workspaces.sort((a, b) => a.title.localeCompare(b.title));
            const defaultWorkspaceMenuEntry = {
                include: true,
                label: this._settings?.defaultWorkspace?.menuLabel ?? "Default Workspace",
                icon: this._settings?.defaultWorkspace?.menuIcon,
                enabled: workspaces.length > 0,
                submenu: [],
                position: {
                    type: "Downloads",
                    operation: "before",
                    customId: "DefaultWorkspace",
                    ...this._settings?.defaultWorkspace?.menuPosition
                }
            };
            const includeReset = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.reset?.include) || this._settings?.reset?.include;
            defaultWorkspaceMenuEntry.submenu?.push({
                label: this._settings?.reset?.menuLabel ?? "None",
                icon: this._settings?.reset?.menuIcon,
                visible: includeReset,
                enabled: useLastActiveWorkspaceSet || (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(savedDefaultWorkspaceId),
                checked: !useLastActiveWorkspaceSet && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(savedDefaultWorkspaceId),
                type: "checkbox",
                data: {
                    type: "Custom",
                    action: {
                        id: "set-default-workspace",
                        customData: {
                            workspaceId: "",
                            useLastActiveWorkspace: false
                        }
                    }
                }
            });
            const includeLastActive = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.lastActive?.include) || this._settings?.lastActive?.include;
            defaultWorkspaceMenuEntry.submenu?.push({
                label: this._settings?.lastActive?.menuLabel ?? "Last Active Workspace",
                icon: this._settings?.lastActive?.menuIcon,
                visible: includeLastActive,
                checked: useLastActiveWorkspaceSet,
                enabled: !useLastActiveWorkspaceSet,
                type: "checkbox",
                data: {
                    type: "Custom",
                    action: {
                        id: "set-default-workspace",
                        customData: {
                            workspaceId: currentWorkspace?.workspaceId ?? "",
                            useLastActiveWorkspace: true
                        }
                    }
                }
            });
            if (workspaces.length > 0) {
                const lastActiveWorkspaceLabel = this._settings?.lastActive?.lastActiveWorkspaceLabel ?? " [Active Workspace]";
                for (const workspace of workspaces) {
                    defaultWorkspaceMenuEntry.submenu?.push({
                        label: useLastActiveWorkspaceSet && workspace.workspaceId === savedDefaultWorkspaceId
                            ? `${workspace.title} ${lastActiveWorkspaceLabel}`
                            : workspace.title,
                        enabled: workspace.workspaceId !== savedDefaultWorkspaceId || useLastActiveWorkspaceSet,
                        checked: !useLastActiveWorkspaceSet && workspace.workspaceId === savedDefaultWorkspaceId,
                        type: "checkbox",
                        data: {
                            type: "Custom",
                            action: {
                                id: "set-default-workspace",
                                customData: {
                                    workspaceId: workspace.workspaceId,
                                    useLastActiveWorkspace: false
                                }
                            }
                        }
                    });
                }
            }
            const menuItemsToReturn = [];
            menuItemsToReturn.push(defaultWorkspaceMenuEntry);
            return menuItemsToReturn;
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
/*!*****************************************************************!*\
  !*** ./client/src/modules/composite/default-workspace/index.ts ***!
  \*****************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/default-workspace/actions.ts");
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lifecycle */ "./client/src/modules/composite/default-workspace/lifecycle.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/default-workspace/menus.ts");



/**
 * Define the entry points for the module.
 */
const entryPoints = {
    menus: new _menus__WEBPACK_IMPORTED_MODULE_2__.SetDefaultWorkspaceProvider(),
    lifecycle: new _lifecycle__WEBPACK_IMPORTED_MODULE_1__.ApplyDefaultWorkspaceProvider(),
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.DefaultWorkspaceActions()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDbEQsT0FBTyxpQkFBaUIsQ0FBQztRQUMxQixDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDN0tEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0xvRDtBQUNRO0FBQ047QUFFdEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsS0FBSyxFQUFFLElBQUksK0RBQTJCLEVBQUU7SUFDeEMsU0FBUyxFQUFFLElBQUkscUVBQTZCLEVBQUU7SUFDOUMsT0FBTyxFQUFFLElBQUksNkRBQXVCLEVBQUU7Q0FDdEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9hY3Rpb25zLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9kZWZhdWx0LXdvcmtzcGFjZS1zdG9yYWdlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvbGlmZWN5Y2xlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEN1c3RvbUFjdGlvbnNNYXAsIFRvb2xiYXJCdXR0b24sIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzLCBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlTGlzdCB9IGZyb20gXCIuL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIGZvciBhbiBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uczxPID0gdW5rbm93bj4gZXh0ZW5kcyBNb2R1bGVJbXBsZW1lbnRhdGlvbjxPLCBBY3Rpb25IZWxwZXJzPiB7XG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+O1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBtb2R1bGVzIHRoYXQgcHJvdmlkZSBhY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIHBsYXRmb3JtLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25zUHJvdmlkZXJPcHRpb25zID0gTW9kdWxlTGlzdDtcblxuLyoqXG4gKiBFeHRlbmRlZCBoZWxwZXJzIHVzZWQgYnkgYWN0aW9uIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uSGVscGVycyBleHRlbmRzIE1vZHVsZUhlbHBlcnMge1xuXHQvKipcblx0ICogVXBkYXRlIHRvb2xiYXIgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbnMgVGhlIGxpc3Qgb2YgYWxsIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25JZCBUaGUgYnV0dG9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHJlcGxhY2VtZW50QnV0dG9uSWQgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgYnV0dG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgdXBkYXRlZCBidXR0b25zLlxuXHQgKi9cblx0dXBkYXRlVG9vbGJhckJ1dHRvbnM6IChcblx0XHRidXR0b25zOiBUb29sYmFyQnV0dG9uW10sXG5cdFx0YnV0dG9uSWQ6IHN0cmluZyxcblx0XHRyZXBsYWNlbWVudEJ1dHRvbklkOiBzdHJpbmdcblx0KSA9PiBQcm9taXNlPFRvb2xiYXJCdXR0b25bXT47XG59XG5cbi8qKlxuICogVXNlIHRoaXMgaW4gcHJlZmVyZW5jZSB0byBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIGZyb20gd29ya3NwYWNlLXBsYXRmb3JtIHRvIGF2b2lkIHRoZSBpbXBvcnQgb2YgdGhlIHdob2xlIG9mIHdvcmtzcGFjZSBwYWNrYWdlIGluIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUge1xuXHRDdXN0b21CdXR0b24gPSBcIkN1c3RvbUJ1dHRvblwiLFxuXHRTdG9yZUN1c3RvbUJ1dHRvbiA9IFwiU3RvcmVDdXN0b21CdXR0b25cIixcblx0Q3VzdG9tRHJvcGRvd25JdGVtID0gXCJDdXN0b21Ecm9wZG93bkl0ZW1cIixcblx0R2xvYmFsQ29udGV4dE1lbnUgPSBcIkdsb2JhbENvbnRleHRNZW51XCIsXG5cdFZpZXdUYWJDb250ZXh0TWVudSA9IFwiVmlld1RhYkNvbnRleHRNZW51XCIsXG5cdFBhZ2VUYWJDb250ZXh0TWVudSA9IFwiUGFnZVRhYkNvbnRleHRNZW51XCIsXG5cdFNhdmVCdXR0b25Db250ZXh0TWVudSA9IFwiU2F2ZUJ1dHRvbkNvbnRleHRNZW51XCIsXG5cdEFQSSA9IFwiQVBJXCJcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0Q3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSxcblx0dHlwZSBBY3Rpb25IZWxwZXJzLFxuXHR0eXBlIEFjdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfSBmcm9tIFwiLi9kZWZhdWx0LXdvcmtzcGFjZS1zdG9yYWdlXCI7XG5pbXBvcnQgdHlwZSB7IERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkLCBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdvcmtzcGFjZUFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIG1lYW5zIHRvIGdldCBhbmQgc2V0IGRlZmF1bHQgd29ya3NwYWNlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICogKi9cblx0cHJpdmF0ZSBfZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2U6IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogQWN0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGVmYXVsdFdvcmtzcGFjZUFjdGlvblwiKTtcblx0XHR0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSA9IG5ldyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSgpO1xuXHRcdGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmluaXRpYWxpemUoZGVmaW5pdGlvbj8uZGF0YSwgaGVscGVycywgdGhpcy5fbG9nZ2VyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJzZXQtZGVmYXVsdC13b3Jrc3BhY2VcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5HbG9iYWxDb250ZXh0TWVudSkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkLmN1c3RvbURhdGEpICYmICFpc0VtcHR5KHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2Uuc2V0RGVmYXVsdFdvcmtzcGFjZShcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhIGFzIERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBUaGUgZGVmYXVsdCB3b3Jrc3BhY2Ugc3RhdGUgaGFzIGJlZW4gdXBkYXRlZDogJHtyZXN1bHR9YCwgcGF5bG9hZC5jdXN0b21EYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcIkFuIGFjdGlvbiBmb3Igc2V0dGluZyB0aGUgZGVmYXVsdCB3b3Jrc3BhY2Ugd2FzIG5vdCBwYXNzZWQgYSBwYXlsb2FkIGFuZCBjYW5ub3QgYmUgcHJvY2Vzc2VkLlwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2Fubm90IHNldCB0aGUgZGVmYXVsdCB3b3Jrc3BhY2Ugd2l0aCB0aGUgaW5mb3JtYXRpb24gcHJvdmlkZWQuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgRW5kcG9pbnRDbGllbnQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBWZXJzaW9uSW5mbyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvdmVyc2lvbi1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHtcblx0RGVmYXVsdFdvcmtzcGFjZVBheWxvYWQsXG5cdERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMsXG5cdEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZUdldFJlcXVlc3QsXG5cdEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZUdldFJlc3BvbnNlLFxuXHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VTZXRSZXF1ZXN0XG59IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBjb250YWlucyB0aGUgbWV0aG9kcyByZXF1aXJlZCBmb3Igc2F2aW5nIGFuZCBnZXR0aW5nIGEgZGVmYXVsdCB3b3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBBbiBlbmRwb2ludCBjbGllbnQgaWYgYXZhaWxhYmxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2VuZHBvaW50Q2xpZW50OiBFbmRwb2ludENsaWVudCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHZlcnNpb24gaW5mbyBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIHBsYXRmb3JtLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3ZlcnNpb25JbmZvOiBWZXJzaW9uSW5mbyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogQSBoZWxwZXIgZm9yIHNhdmluZyBhbmQgcmV0dXJuaW5nIHRoZSBkZWZhdWx0IHdvcmtzcGFjZSByZWxhdGVkIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gc2V0dGluZ3Mgc2V0dGluZ3MgdG8gYmUgdXNlZCBieSB0aGlzIGhlbHBlclxuXHQgKiBAcGFyYW0gaGVscGVycyBoZWxwZXIgZnVuY3Rpb25zIHRvIGJlIHVzZWRcblx0ICogQHBhcmFtIGxvZ2dlciBhIGxvZ2dlciB0byB1c2Ugd2hpbGUgcGVyZm9ybWluZyBhY3Rpb25zXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRzZXR0aW5nczogRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB8IHVuZGVmaW5lZCxcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkLFxuXHRcdGxvZ2dlcjogTG9nZ2VyXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdGF3YWl0IHRoaXMuc2V0dXBFbmRwb2ludENsaWVudCgpO1xuXHRcdGF3YWl0IHRoaXMuc2V0VmVyc2lvbkluZm8oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlIHRoZSBkZWZhdWx0IHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgdG8gc2F2ZS5cblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNhdmUgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2V0RGVmYXVsdFdvcmtzcGFjZShwYXlsb2FkOiBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHBheWxvYWRJZCA9IHRoaXMuX3NldHRpbmdzPy5wYXlsb2FkSWQgPz8gXCJkZWZhdWx0LXdvcmtzcGFjZVwiO1xuXHRcdGNvbnN0IHNldEVuZHBvaW50SWQgPSB0aGlzLl9zZXR0aW5ncz8uZW5kcG9pbnRJZHM/LnNldERlZmF1bHRXb3Jrc3BhY2UgPz8gXCJzZXQtZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9lbmRwb2ludENsaWVudCkgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX3ZlcnNpb25JbmZvKSAmJlxuXHRcdFx0dGhpcy5fZW5kcG9pbnRDbGllbnQuaGFzRW5kcG9pbnQoc2V0RW5kcG9pbnRJZClcblx0XHQpIHtcblx0XHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB0aGlzLl9lbmRwb2ludENsaWVudC5hY3Rpb248RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlU2V0UmVxdWVzdD4oc2V0RW5kcG9pbnRJZCwge1xuXHRcdFx0XHRpZDogcGF5bG9hZElkLFxuXHRcdFx0XHRwbGF0Zm9ybTogZmluLm1lLmlkZW50aXR5LnV1aWQsXG5cdFx0XHRcdG1ldGFEYXRhOiB7XG5cdFx0XHRcdFx0dmVyc2lvbjoge1xuXHRcdFx0XHRcdFx0d29ya3NwYWNlUGxhdGZvcm1DbGllbnQ6IHRoaXMuX3ZlcnNpb25JbmZvLndvcmtzcGFjZVBsYXRmb3JtQ2xpZW50LFxuXHRcdFx0XHRcdFx0cGxhdGZvcm1DbGllbnQ6IHRoaXMuX3ZlcnNpb25JbmZvLnBsYXRmb3JtQ2xpZW50XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYXlsb2FkXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBzdWNjZXNzO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcIlVuYWJsZSB0byBzZXQgdGhlIGRlZmF1bHQgd29ya3NwYWNlIGFzIHRoZSBhY2Nlc3MgdG8gdGhlIGVuZHBvaW50IGNsaWVudCwgdmVyc2lvbiBpbmZvIG9yIHRoZSBlbmRwb2ludCBpcyBub3QgYXZhaWxhYmxlLlwiXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBjdXJyZW50bHkgc2F2ZWQgZGVmYXVsdCB3b3Jrc3BhY2UuXG5cdCAqIEByZXR1cm5zIGFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNhdmVkIGRlZmF1bHQgd29ya3NwYWNlIG9yIGEgcGF5bG9hZCB3aXRoIGFuIGVtcHR5IHdvcmtzcGFjZVxuXHQgKiBhbmQgZGVmYXVsdCB1c2VMYXN0QWN0aXZlV29ya3NwYWNlIHNldHRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0RGVmYXVsdFdvcmtzcGFjZSgpOiBQcm9taXNlPERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkPiB7XG5cdFx0Y29uc3QgcGF5bG9hZElkID0gdGhpcy5fc2V0dGluZ3M/LnBheWxvYWRJZCA/PyBcImRlZmF1bHQtd29ya3NwYWNlXCI7XG5cdFx0Y29uc3QgZ2V0RW5kcG9pbnRJZCA9IHRoaXMuX3NldHRpbmdzPy5lbmRwb2ludElkcz8uZ2V0RGVmYXVsdFdvcmtzcGFjZSA/PyBcImdldC1kZWZhdWx0LXdvcmtzcGFjZVwiO1xuXHRcdGNvbnN0IG5vU2F2ZWREYXRhOiBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZCA9IHtcblx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IGZhbHNlLFxuXHRcdFx0d29ya3NwYWNlSWQ6IFwiXCJcblx0XHR9O1xuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9lbmRwb2ludENsaWVudCkgJiYgdGhpcy5fZW5kcG9pbnRDbGllbnQuaGFzRW5kcG9pbnQoZ2V0RW5kcG9pbnRJZCkpIHtcblx0XHRcdGNvbnN0IHNhdmVkV29ya3NwYWNlID0gYXdhaXQgdGhpcy5fZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlPFxuXHRcdFx0XHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXF1ZXN0LFxuXHRcdFx0XHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXNwb25zZVxuXHRcdFx0PihnZXRFbmRwb2ludElkLCB7XG5cdFx0XHRcdHBsYXRmb3JtOiBmaW4ubWUuaWRlbnRpdHkudXVpZCxcblx0XHRcdFx0aWQ6IHBheWxvYWRJZFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gc2F2ZWRXb3Jrc3BhY2U/LnBheWxvYWQgPz8gbm9TYXZlZERhdGE7XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFwiVW5hYmxlIHRvIGdldCB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UgYXMgdGhlIGFjY2VzcyB0byB0aGUgZW5kcG9pbnQgY2xpZW50IG9yIHRoZSBlbmRwb2ludCBpcyBub3QgYXZhaWxhYmxlLlwiXG5cdFx0KTtcblx0XHRyZXR1cm4gbm9TYXZlZERhdGE7XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgdGhlIGVuZHBvaW50IGNsaWVudCBpZiB5b3UgaGF2ZSBhY2Nlc3MgdG8gdGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgY2xpZW50LlxuXHQgKiBAcmV0dXJucyBhIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoZSBlbmRwb2ludCBjbGllbnQgY291bGQgYmUgY3JlYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2V0dXBFbmRwb2ludENsaWVudCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8uZ2V0RW5kcG9pbnRDbGllbnQpKSB7XG5cdFx0XHR0aGlzLl9lbmRwb2ludENsaWVudCA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50KCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgdmVyc2lvbiBpbmZvIGZvciB0aGUgY3VycmVudGx5IHJ1bm5pbmcgcGxhdGZvcm0uXG5cdCAqIEByZXR1cm5zIGEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3QgdGhlIHZlcnNpb24gaW5mbyB3YXMgYXZhaWxhYmxlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzZXRWZXJzaW9uSW5mbygpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8uZ2V0VmVyc2lvbkluZm8pKSB7XG5cdFx0XHR0aGlzLl92ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldFZlcnNpb25JbmZvKCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUge1xuXHRMaWZlY3ljbGUsXG5cdExpZmVjeWNsZUV2ZW50TWFwLFxuXHRXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBhcHBseSBkZWZhdWx0IHdvcmtzcGFjZSBsaWZlY3ljbGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBseURlZmF1bHRXb3Jrc3BhY2VQcm92aWRlciBpbXBsZW1lbnRzIExpZmVjeWNsZTxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBtZWFucyB0byBnZXQgYW5kIHNldCBkZWZhdWx0IHdvcmtzcGFjZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZTogRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBcHBseURlZmF1bHRXb3Jrc3BhY2VQcm92aWRlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSA9IG5ldyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSgpO1xuXHRcdGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmluaXRpYWxpemUoZGVmaW5pdGlvbj8uZGF0YSwgaGVscGVycywgdGhpcy5fbG9nZ2VyKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZ1wiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDbG9zZWRvd25cIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBsaWZlY3ljbGUgZXZlbnRzLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGxpZmVjeWNsZSBldmVudHMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KCk6IFByb21pc2U8TGlmZWN5Y2xlRXZlbnRNYXA+IHtcblx0XHRjb25zdCBsaWZlY3ljbGVNYXA6IExpZmVjeWNsZUV2ZW50TWFwID0ge307XG5cblx0XHRsaWZlY3ljbGVNYXBbXCJhZnRlci1ib290c3RyYXBcIl0gPSBhc3luYyAoXG5cdFx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0XHRjdXN0b21EYXRhPzogdW5rbm93blxuXHRcdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgc2F2ZWREZWZhdWx0V29ya3NwYWNlID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2U/LmdldERlZmF1bHRXb3Jrc3BhY2UoKTtcblx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlSWQgPSBzYXZlZERlZmF1bHRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkO1xuXHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh3b3Jrc3BhY2VJZCkgJiYgIWlzRW1wdHkodGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKSkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdGBSZXRyaWV2ZWQgd29ya3NwYWNlIGlkOiAke3NhdmVkRGVmYXVsdFdvcmtzcGFjZT8ud29ya3NwYWNlSWR9IGFuZCB3ZSBoYXZlIHRoZSBhYmlsaXR5IHRvIGxhdW5jaCBhIHdvcmtzcGFjZS4gQXBwbHlpbmcgdGhlIHdvcmtzcGFjZS5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2VBcHBsaWVkID0gYXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKHdvcmtzcGFjZUlkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgV29ya3NwYWNlIElkICR7d29ya3NwYWNlSWR9IGFwcGxpZWQ6ICR7d29ya3NwYWNlQXBwbGllZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJUaGVyZSB3YXMgYW4gZXJyb3IgdHJ5aW5nIHRvIGFwcGx5IHRvIGdldCBvciBhcHBseSB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UuXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGxpZmVjeWNsZU1hcFtcIndvcmtzcGFjZS1jaGFuZ2VkXCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y3VzdG9tRGF0YT86IHVua25vd25cblx0XHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmICghaXNFbXB0eShjdXN0b21EYXRhKSkge1xuXHRcdFx0XHRjb25zdCB3b3Jrc3BhY2VVcGRhdGUgPSBjdXN0b21EYXRhIGFzIFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KHdvcmtzcGFjZVVwZGF0ZS5hY3Rpb24gPT09IFwidXBkYXRlXCIgfHwgd29ya3NwYWNlVXBkYXRlLmFjdGlvbiA9PT0gXCJjcmVhdGVcIikgJiZcblx0XHRcdFx0XHQhaXNFbXB0eSh0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSlcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuZ2V0RGVmYXVsdFdvcmtzcGFjZSgpO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnREZWZhdWx0V29ya3NwYWNlLnVzZUxhc3RBY3RpdmVXb3Jrc3BhY2UpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLnNldERlZmF1bHRXb3Jrc3BhY2Uoe1xuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiB3b3Jrc3BhY2VVcGRhdGUuaWQsXG5cdFx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogdHJ1ZVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcdGBEZWZhdWx0IHdvcmtzcGFjZSB1cGRhdGVkIHRvIHdvcmtzcGFjZTogJHt3b3Jrc3BhY2VVcGRhdGUuaWR9IHRocm91Z2ggbGFzdCBhY3RpdmUgd29ya3NwYWNlOiAke3N1Y2Nlc3N9YFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFx0YFVuYWJsZSB0byB1cGRhdGUgZGVmYXVsdCB3b3Jrc3BhY2UgdG8gd29ya3NwYWNlIGlkOiAke3dvcmtzcGFjZVVwZGF0ZS5pZH0gYmVjYXVzZSBhbiBlcnJvciBvY2N1cnJlZC5gLFxuXHRcdFx0XHRcdFx0XHRlcnJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBsaWZlY3ljbGVNYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHtcblx0R2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLFxuXHRXb3Jrc3BhY2UsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdE1lbnVFbnRyeSxcblx0TWVudXMsXG5cdFJlbGF0ZWRNZW51SWQsXG5cdE1lbnVUeXBlXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbWVudS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfSBmcm9tIFwiLi9kZWZhdWx0LXdvcmtzcGFjZS1zdG9yYWdlXCI7XG5pbXBvcnQgdHlwZSB7IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHNldCBkZWZhdWx0IHdvcmtzcGFjZSBtZW51cyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlciBpbXBsZW1lbnRzIE1lbnVzPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIFRoZSBtZWFucyB0byBnZXQgYW5kIHNldCBkZWZhdWx0IHdvcmtzcGFjZXNcblx0ICogQGludGVybmFsXG5cdCAqICovXG5cdHByaXZhdGUgX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlOiBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlclwiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZ1wiKTtcblx0XHR0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSA9IG5ldyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSgpO1xuXHRcdGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmluaXRpYWxpemUoZGVmaW5pdGlvbj8uZGF0YSwgaGVscGVycywgdGhpcy5fbG9nZ2VyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDbG9zZWRvd25cIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHJlbGF0ZWRNZW51SWQgSWYgYXZhaWxhYmxlIHByb3ZpZGUgdGhlIHJlbGF0ZWQgd2luZG93IGlkZW50aXR5IHRoZSBtZW51IGlzIHNob3dpbmcgb24gYW5kIHBhZ2Ugb3IgdmlldyBpZHNcblx0ICogZGVwZW5kaW5nIG9uIHRoZSBtZW51IHR5cGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KFxuXHRcdG1lbnVUeXBlOiBNZW51VHlwZSxcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0cmVsYXRlZE1lbnVJZD86IFJlbGF0ZWRNZW51SWRcblx0KTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChcblx0XHRcdG1lbnVUeXBlID09PSBcImdsb2JhbFwiICYmXG5cdFx0XHQhaXNFbXB0eShyZWxhdGVkTWVudUlkPy53aW5kb3dJZGVudGl0eSkgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKVxuXHRcdCkge1xuXHRcdFx0Y29uc3QgY3VycmVudERlZmF1bHRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5nZXREZWZhdWx0V29ya3NwYWNlKCk7XG5cdFx0XHRjb25zdCB1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0OiBib29sZWFuID0gY3VycmVudERlZmF1bHRXb3Jrc3BhY2UudXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTtcblx0XHRcdGNvbnN0IHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkOiBzdHJpbmcgPSBjdXJyZW50RGVmYXVsdFdvcmtzcGFjZS53b3Jrc3BhY2VJZDtcblxuXHRcdFx0Y29uc3Qgd29ya3NwYWNlczogV29ya3NwYWNlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFdvcmtzcGFjZXMoKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2U6IFdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLmdldEN1cnJlbnRXb3Jrc3BhY2UoKTtcblx0XHRcdHdvcmtzcGFjZXMuc29ydCgoYSwgYikgPT4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpKTtcblx0XHRcdGNvbnN0IGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnk6IE1lbnVFbnRyeSA9IHtcblx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5kZWZhdWx0V29ya3NwYWNlPy5tZW51TGFiZWwgPz8gXCJEZWZhdWx0IFdvcmtzcGFjZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uZGVmYXVsdFdvcmtzcGFjZT8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHdvcmtzcGFjZXMubGVuZ3RoID4gMCxcblx0XHRcdFx0c3VibWVudTogW10sXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJEb3dubG9hZHNcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCIsXG5cdFx0XHRcdFx0Y3VzdG9tSWQ6IFwiRGVmYXVsdFdvcmtzcGFjZVwiLFxuXHRcdFx0XHRcdC4uLnRoaXMuX3NldHRpbmdzPy5kZWZhdWx0V29ya3NwYWNlPy5tZW51UG9zaXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGluY2x1ZGVSZXNldCA9IGlzRW1wdHkodGhpcy5fc2V0dGluZ3M/LnJlc2V0Py5pbmNsdWRlKSB8fCB0aGlzLl9zZXR0aW5ncz8ucmVzZXQ/LmluY2x1ZGU7XG5cdFx0XHRkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5LnN1Ym1lbnU/LnB1c2goe1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LnJlc2V0Py5tZW51TGFiZWwgPz8gXCJOb25lXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5yZXNldD8ubWVudUljb24sXG5cdFx0XHRcdHZpc2libGU6IGluY2x1ZGVSZXNldCxcblx0XHRcdFx0ZW5hYmxlZDogdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCB8fCBpc1N0cmluZ1ZhbHVlKHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkKSxcblx0XHRcdFx0Y2hlY2tlZDogIXVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQgJiYgIWlzU3RyaW5nVmFsdWUoc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQpLFxuXHRcdFx0XHR0eXBlOiBcImNoZWNrYm94XCIsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRpZDogXCJzZXQtZGVmYXVsdC13b3Jrc3BhY2VcIixcblx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IGZhbHNlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IGluY2x1ZGVMYXN0QWN0aXZlID1cblx0XHRcdFx0aXNFbXB0eSh0aGlzLl9zZXR0aW5ncz8ubGFzdEFjdGl2ZT8uaW5jbHVkZSkgfHwgdGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/LmluY2x1ZGU7XG5cdFx0XHRkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5LnN1Ym1lbnU/LnB1c2goe1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/Lm1lbnVMYWJlbCA/PyBcIkxhc3QgQWN0aXZlIFdvcmtzcGFjZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8ubGFzdEFjdGl2ZT8ubWVudUljb24sXG5cdFx0XHRcdHZpc2libGU6IGluY2x1ZGVMYXN0QWN0aXZlLFxuXHRcdFx0XHRjaGVja2VkOiB1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0LFxuXHRcdFx0XHRlbmFibGVkOiAhdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCxcblx0XHRcdFx0dHlwZTogXCJjaGVja2JveFwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBjdXJyZW50V29ya3NwYWNlPy53b3Jrc3BhY2VJZCA/PyBcIlwiLFxuXHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiB0cnVlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh3b3Jrc3BhY2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgbGFzdEFjdGl2ZVdvcmtzcGFjZUxhYmVsID1cblx0XHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8ubGFzdEFjdGl2ZT8ubGFzdEFjdGl2ZVdvcmtzcGFjZUxhYmVsID8/IFwiIFtBY3RpdmUgV29ya3NwYWNlXVwiO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHdvcmtzcGFjZSBvZiB3b3Jrc3BhY2VzKSB7XG5cdFx0XHRcdFx0ZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeS5zdWJtZW51Py5wdXNoKHtcblx0XHRcdFx0XHRcdGxhYmVsOlxuXHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0ICYmIHdvcmtzcGFjZS53b3Jrc3BhY2VJZCA9PT0gc2F2ZWREZWZhdWx0V29ya3NwYWNlSWRcblx0XHRcdFx0XHRcdFx0XHQ/IGAke3dvcmtzcGFjZS50aXRsZX0gJHtsYXN0QWN0aXZlV29ya3NwYWNlTGFiZWx9YFxuXHRcdFx0XHRcdFx0XHRcdDogd29ya3NwYWNlLnRpdGxlLFxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogd29ya3NwYWNlLndvcmtzcGFjZUlkICE9PSBzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZCB8fCB1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0LFxuXHRcdFx0XHRcdFx0Y2hlY2tlZDogIXVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQgJiYgd29ya3NwYWNlLndvcmtzcGFjZUlkID09PSBzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHR5cGU6IFwiY2hlY2tib3hcIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0XHRpZDogXCJzZXQtZGVmYXVsdC13b3Jrc3BhY2VcIixcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogd29ya3NwYWNlLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbWVudUl0ZW1zVG9SZXR1cm46IE1lbnVFbnRyeVtdID0gW107XG5cdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnkpO1xuXHRcdFx0cmV0dXJuIG1lbnVJdGVtc1RvUmV0dXJuO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRGVmYXVsdFdvcmtzcGFjZUFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBBcHBseURlZmF1bHRXb3Jrc3BhY2VQcm92aWRlciB9IGZyb20gXCIuL2xpZmVjeWNsZVwiO1xuaW1wb3J0IHsgU2V0RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdG1lbnVzOiBuZXcgU2V0RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyKCksXG5cdGxpZmVjeWNsZTogbmV3IEFwcGx5RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyKCksXG5cdGFjdGlvbnM6IG5ldyBEZWZhdWx0V29ya3NwYWNlQWN0aW9ucygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9