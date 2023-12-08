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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUIsR0FBZ0IsRUFBRSxDQUFDO1lBQzFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2xELE9BQU8saUJBQWlCLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzdLRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMb0Q7QUFDUTtBQUNOO0FBRXREOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLEtBQUssRUFBRSxJQUFJLCtEQUEyQixFQUFFO0lBQ3hDLFNBQVMsRUFBRSxJQUFJLHFFQUE2QixFQUFFO0lBQzlDLE9BQU8sRUFBRSxJQUFJLDZEQUF1QixFQUFFO0NBQ3RDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2xpZmVjeWNsZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZCwgRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRXb3Jrc3BhY2VBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9uczxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBtZWFucyB0byBnZXQgYW5kIHNldCBkZWZhdWx0IHdvcmtzcGFjZXNcblx0ICogQGludGVybmFsXG5cdCAqICovXG5cdHByaXZhdGUgX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlOiBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRlZmF1bHRXb3Jrc3BhY2VBY3Rpb25cIik7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wic2V0LWRlZmF1bHQtd29ya3NwYWNlXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZC5jdXN0b21EYXRhKSAmJiAhaXNFbXB0eSh0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLnNldERlZmF1bHRXb3Jrc3BhY2UoXG5cdFx0XHRcdFx0XHRcdHBheWxvYWQuY3VzdG9tRGF0YSBhcyBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgVGhlIGRlZmF1bHQgd29ya3NwYWNlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQ6ICR7cmVzdWx0fWAsIHBheWxvYWQuY3VzdG9tRGF0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XCJBbiBhY3Rpb24gZm9yIHNldHRpbmcgdGhlIGRlZmF1bHQgd29ya3NwYWNlIHdhcyBub3QgcGFzc2VkIGEgcGF5bG9hZCBhbmQgY2Fubm90IGJlIHByb2Nlc3NlZC5cIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNhbm5vdCBzZXQgdGhlIGRlZmF1bHQgd29ya3NwYWNlIHdpdGggdGhlIGluZm9ybWF0aW9uIHByb3ZpZGVkLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVuZHBvaW50Q2xpZW50IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgVmVyc2lvbkluZm8gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3ZlcnNpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkLFxuXHREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zLFxuXHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXF1ZXN0LFxuXHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXNwb25zZSxcblx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlU2V0UmVxdWVzdFxufSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgY29udGFpbnMgdGhlIG1ldGhvZHMgcmVxdWlyZWQgZm9yIHNhdmluZyBhbmQgZ2V0dGluZyBhIGRlZmF1bHQgd29ya3NwYWNlLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2Uge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucztcblxuXHQvKipcblx0ICogQW4gZW5kcG9pbnQgY2xpZW50IGlmIGF2YWlsYWJsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9lbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJzaW9uIGluZm8gZm9yIHRoZSBjdXJyZW50bHkgcnVubmluZyBwbGF0Zm9ybS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF92ZXJzaW9uSW5mbzogVmVyc2lvbkluZm8gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEEgaGVscGVyIGZvciBzYXZpbmcgYW5kIHJldHVybmluZyB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UgcmVsYXRlZCBpbmZvcm1hdGlvbi5cblx0ICogQHBhcmFtIHNldHRpbmdzIHNldHRpbmdzIHRvIGJlIHVzZWQgYnkgdGhpcyBoZWxwZXJcblx0ICogQHBhcmFtIGhlbHBlcnMgaGVscGVyIGZ1bmN0aW9ucyB0byBiZSB1c2VkXG5cdCAqIEBwYXJhbSBsb2dnZXIgYSBsb2dnZXIgdG8gdXNlIHdoaWxlIHBlcmZvcm1pbmcgYWN0aW9uc1xuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0c2V0dGluZ3M6IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMgfCB1bmRlZmluZWQsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZCxcblx0XHRsb2dnZXI6IExvZ2dlclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRhd2FpdCB0aGlzLnNldHVwRW5kcG9pbnRDbGllbnQoKTtcblx0XHRhd2FpdCB0aGlzLnNldFZlcnNpb25JbmZvKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2F2ZSB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHRvIHNhdmUuXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzYXZlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNldERlZmF1bHRXb3Jrc3BhY2UocGF5bG9hZDogRGVmYXVsdFdvcmtzcGFjZVBheWxvYWQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBwYXlsb2FkSWQgPSB0aGlzLl9zZXR0aW5ncz8ucGF5bG9hZElkID8/IFwiZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRjb25zdCBzZXRFbmRwb2ludElkID0gdGhpcy5fc2V0dGluZ3M/LmVuZHBvaW50SWRzPy5zZXREZWZhdWx0V29ya3NwYWNlID8/IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCI7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fZW5kcG9pbnRDbGllbnQpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl92ZXJzaW9uSW5mbykgJiZcblx0XHRcdHRoaXMuX2VuZHBvaW50Q2xpZW50Lmhhc0VuZHBvaW50KHNldEVuZHBvaW50SWQpXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgdGhpcy5fZW5kcG9pbnRDbGllbnQuYWN0aW9uPEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZVNldFJlcXVlc3Q+KHNldEVuZHBvaW50SWQsIHtcblx0XHRcdFx0aWQ6IHBheWxvYWRJZCxcblx0XHRcdFx0cGxhdGZvcm06IGZpbi5tZS5pZGVudGl0eS51dWlkLFxuXHRcdFx0XHRtZXRhRGF0YToge1xuXHRcdFx0XHRcdHZlcnNpb246IHtcblx0XHRcdFx0XHRcdHdvcmtzcGFjZVBsYXRmb3JtQ2xpZW50OiB0aGlzLl92ZXJzaW9uSW5mby53b3Jrc3BhY2VQbGF0Zm9ybUNsaWVudCxcblx0XHRcdFx0XHRcdHBsYXRmb3JtQ2xpZW50OiB0aGlzLl92ZXJzaW9uSW5mby5wbGF0Zm9ybUNsaWVudFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0cGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gc3VjY2Vzcztcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XCJVbmFibGUgdG8gc2V0IHRoZSBkZWZhdWx0IHdvcmtzcGFjZSBhcyB0aGUgYWNjZXNzIHRvIHRoZSBlbmRwb2ludCBjbGllbnQsIHZlcnNpb24gaW5mbyBvciB0aGUgZW5kcG9pbnQgaXMgbm90IGF2YWlsYWJsZS5cIlxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgY3VycmVudGx5IHNhdmVkIGRlZmF1bHQgd29ya3NwYWNlLlxuXHQgKiBAcmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBzYXZlZCBkZWZhdWx0IHdvcmtzcGFjZSBvciBhIHBheWxvYWQgd2l0aCBhbiBlbXB0eSB3b3Jrc3BhY2Vcblx0ICogYW5kIGRlZmF1bHQgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZSBzZXR0aW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldERlZmF1bHRXb3Jrc3BhY2UoKTogUHJvbWlzZTxEZWZhdWx0V29ya3NwYWNlUGF5bG9hZD4ge1xuXHRcdGNvbnN0IHBheWxvYWRJZCA9IHRoaXMuX3NldHRpbmdzPy5wYXlsb2FkSWQgPz8gXCJkZWZhdWx0LXdvcmtzcGFjZVwiO1xuXHRcdGNvbnN0IGdldEVuZHBvaW50SWQgPSB0aGlzLl9zZXR0aW5ncz8uZW5kcG9pbnRJZHM/LmdldERlZmF1bHRXb3Jrc3BhY2UgPz8gXCJnZXQtZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRjb25zdCBub1NhdmVkRGF0YTogRGVmYXVsdFdvcmtzcGFjZVBheWxvYWQgPSB7XG5cdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiBmYWxzZSxcblx0XHRcdHdvcmtzcGFjZUlkOiBcIlwiXG5cdFx0fTtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fZW5kcG9pbnRDbGllbnQpICYmIHRoaXMuX2VuZHBvaW50Q2xpZW50Lmhhc0VuZHBvaW50KGdldEVuZHBvaW50SWQpKSB7XG5cdFx0XHRjb25zdCBzYXZlZFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2VuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTxcblx0XHRcdFx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVxdWVzdCxcblx0XHRcdFx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVzcG9uc2Vcblx0XHRcdD4oZ2V0RW5kcG9pbnRJZCwge1xuXHRcdFx0XHRwbGF0Zm9ybTogZmluLm1lLmlkZW50aXR5LnV1aWQsXG5cdFx0XHRcdGlkOiBwYXlsb2FkSWRcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHNhdmVkV29ya3NwYWNlPy5wYXlsb2FkID8/IG5vU2F2ZWREYXRhO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcIlVuYWJsZSB0byBnZXQgdGhlIGRlZmF1bHQgd29ya3NwYWNlIGFzIHRoZSBhY2Nlc3MgdG8gdGhlIGVuZHBvaW50IGNsaWVudCBvciB0aGUgZW5kcG9pbnQgaXMgbm90IGF2YWlsYWJsZS5cIlxuXHRcdCk7XG5cdFx0cmV0dXJuIG5vU2F2ZWREYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBlbmRwb2ludCBjbGllbnQgaWYgeW91IGhhdmUgYWNjZXNzIHRvIHRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGNsaWVudC5cblx0ICogQHJldHVybnMgYSBib29sZWFuIHJlcHJlc2VudGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgZW5kcG9pbnQgY2xpZW50IGNvdWxkIGJlIGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHNldHVwRW5kcG9pbnRDbGllbnQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50KSkge1xuXHRcdFx0dGhpcy5fZW5kcG9pbnRDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZlcnNpb24gaW5mbyBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIHBsYXRmb3JtLlxuXHQgKiBAcmV0dXJucyBhIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoZSB2ZXJzaW9uIGluZm8gd2FzIGF2YWlsYWJsZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2V0VmVyc2lvbkluZm8oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmdldFZlcnNpb25JbmZvKSkge1xuXHRcdFx0dGhpcy5fdmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRWZXJzaW9uSW5mbygpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHtcblx0TGlmZWN5Y2xlLFxuXHRMaWZlY3ljbGVFdmVudE1hcCxcblx0V29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWRcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9saWZlY3ljbGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB9IGZyb20gXCIuL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgYXBwbHkgZGVmYXVsdCB3b3Jrc3BhY2UgbGlmZWN5Y2xlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgaW1wbGVtZW50cyBMaWZlY3ljbGU8RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWVhbnMgdG8gZ2V0IGFuZCBzZXQgZGVmYXVsdCB3b3Jrc3BhY2VzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2U6IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBsaWZlY3ljbGUgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPExpZmVjeWNsZUV2ZW50TWFwPiB7XG5cdFx0Y29uc3QgbGlmZWN5Y2xlTWFwOiBMaWZlY3ljbGVFdmVudE1hcCA9IHt9O1xuXG5cdFx0bGlmZWN5Y2xlTWFwW1wiYWZ0ZXItYm9vdHN0cmFwXCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y3VzdG9tRGF0YT86IHVua25vd25cblx0XHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHNhdmVkRGVmYXVsdFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlPy5nZXREZWZhdWx0V29ya3NwYWNlKCk7XG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUlkID0gc2F2ZWREZWZhdWx0V29ya3NwYWNlPy53b3Jrc3BhY2VJZDtcblx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUod29ya3NwYWNlSWQpICYmICFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSkpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XHRgUmV0cmlldmVkIHdvcmtzcGFjZSBpZDogJHtzYXZlZERlZmF1bHRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkfSBhbmQgd2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBsYXVuY2ggYSB3b3Jrc3BhY2UuIEFwcGx5aW5nIHRoZSB3b3Jrc3BhY2UuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlQXBwbGllZCA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSh3b3Jrc3BhY2VJZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFdvcmtzcGFjZSBJZCAke3dvcmtzcGFjZUlkfSBhcHBsaWVkOiAke3dvcmtzcGFjZUFwcGxpZWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHRyeWluZyB0byBhcHBseSB0byBnZXQgb3IgYXBwbHkgdGhlIGRlZmF1bHQgd29ya3NwYWNlLlwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRsaWZlY3ljbGVNYXBbXCJ3b3Jrc3BhY2UtY2hhbmdlZFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGN1c3RvbURhdGE/OiB1bmtub3duXG5cdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoY3VzdG9tRGF0YSkpIHtcblx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlVXBkYXRlID0gY3VzdG9tRGF0YSBhcyBXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZDtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCh3b3Jrc3BhY2VVcGRhdGUuYWN0aW9uID09PSBcInVwZGF0ZVwiIHx8IHdvcmtzcGFjZVVwZGF0ZS5hY3Rpb24gPT09IFwiY3JlYXRlXCIpICYmXG5cdFx0XHRcdFx0IWlzRW1wdHkodGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJyZW50RGVmYXVsdFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmdldERlZmF1bHRXb3Jrc3BhY2UoKTtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50RGVmYXVsdFdvcmtzcGFjZS51c2VMYXN0QWN0aXZlV29ya3NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5zZXREZWZhdWx0V29ya3NwYWNlKHtcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogd29ya3NwYWNlVXBkYXRlLmlkLFxuXHRcdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdFx0XHRgRGVmYXVsdCB3b3Jrc3BhY2UgdXBkYXRlZCB0byB3b3Jrc3BhY2U6ICR7d29ya3NwYWNlVXBkYXRlLmlkfSB0aHJvdWdoIGxhc3QgYWN0aXZlIHdvcmtzcGFjZTogJHtzdWNjZXNzfWBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcdGBVbmFibGUgdG8gdXBkYXRlIGRlZmF1bHQgd29ya3NwYWNlIHRvIHdvcmtzcGFjZSBpZDogJHt3b3Jrc3BhY2VVcGRhdGUuaWR9IGJlY2F1c2UgYW4gZXJyb3Igb2NjdXJyZWQuYCxcblx0XHRcdFx0XHRcdFx0ZXJyXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gbGlmZWN5Y2xlTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZSxcblx0V29ya3NwYWNlLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRNZW51RW50cnksXG5cdE1lbnVzLFxuXHRSZWxhdGVkTWVudUlkLFxuXHRNZW51VHlwZVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBzZXQgZGVmYXVsdCB3b3Jrc3BhY2UgbWVudXMgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgaW1wbGVtZW50cyBNZW51czxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWVhbnMgdG8gZ2V0IGFuZCBzZXQgZGVmYXVsdCB3b3Jrc3BhY2VzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKiAqL1xuXHRwcml2YXRlIF9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZTogRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSByZWxhdGVkTWVudUlkIElmIGF2YWlsYWJsZSBwcm92aWRlIHRoZSByZWxhdGVkIHdpbmRvdyBpZGVudGl0eSB0aGUgbWVudSBpcyBzaG93aW5nIG9uIGFuZCBwYWdlIG9yIHZpZXcgaWRzXG5cdCAqIGRlcGVuZGluZyBvbiB0aGUgbWVudSB0eXBlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChcblx0XHRtZW51VHlwZTogTWVudVR5cGUsXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHJlbGF0ZWRNZW51SWQ/OiBSZWxhdGVkTWVudUlkXG5cdCk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoXG5cdFx0XHRtZW51VHlwZSA9PT0gXCJnbG9iYWxcIiAmJlxuXHRcdFx0IWlzRW1wdHkocmVsYXRlZE1lbnVJZD8ud2luZG93SWRlbnRpdHkpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSlcblx0XHQpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuZ2V0RGVmYXVsdFdvcmtzcGFjZSgpO1xuXHRcdFx0Y29uc3QgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldDogYm9vbGVhbiA9IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlLnVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U7XG5cdFx0XHRjb25zdCBzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZDogc3RyaW5nID0gY3VycmVudERlZmF1bHRXb3Jrc3BhY2Uud29ya3NwYWNlSWQ7XG5cblx0XHRcdGNvbnN0IHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2VzKCk7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlOiBXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHR3b3Jrc3BhY2VzLnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSk7XG5cdFx0XHRjb25zdCBkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uZGVmYXVsdFdvcmtzcGFjZT8ubWVudUxhYmVsID8/IFwiRGVmYXVsdCBXb3Jrc3BhY2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmRlZmF1bHRXb3Jrc3BhY2U/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiB3b3Jrc3BhY2VzLmxlbmd0aCA+IDAsXG5cdFx0XHRcdHN1Ym1lbnU6IFtdLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiRG93bmxvYWRzXCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiLFxuXHRcdFx0XHRcdGN1c3RvbUlkOiBcIkRlZmF1bHRXb3Jrc3BhY2VcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uZGVmYXVsdFdvcmtzcGFjZT8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRjb25zdCBpbmNsdWRlUmVzZXQgPSBpc0VtcHR5KHRoaXMuX3NldHRpbmdzPy5yZXNldD8uaW5jbHVkZSkgfHwgdGhpcy5fc2V0dGluZ3M/LnJlc2V0Py5pbmNsdWRlO1xuXHRcdFx0ZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeS5zdWJtZW51Py5wdXNoKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5yZXNldD8ubWVudUxhYmVsID8/IFwiTm9uZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8ucmVzZXQ/Lm1lbnVJY29uLFxuXHRcdFx0XHR2aXNpYmxlOiBpbmNsdWRlUmVzZXQsXG5cdFx0XHRcdGVuYWJsZWQ6IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQgfHwgaXNTdHJpbmdWYWx1ZShzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZCksXG5cdFx0XHRcdGNoZWNrZWQ6ICF1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0ICYmICFpc1N0cmluZ1ZhbHVlKHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkKSxcblx0XHRcdFx0dHlwZTogXCJjaGVja2JveFwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiBmYWxzZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBpbmNsdWRlTGFzdEFjdGl2ZSA9XG5cdFx0XHRcdGlzRW1wdHkodGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/LmluY2x1ZGUpIHx8IHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5pbmNsdWRlO1xuXHRcdFx0ZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeS5zdWJtZW51Py5wdXNoKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5tZW51TGFiZWwgPz8gXCJMYXN0IEFjdGl2ZSBXb3Jrc3BhY2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/Lm1lbnVJY29uLFxuXHRcdFx0XHR2aXNpYmxlOiBpbmNsdWRlTGFzdEFjdGl2ZSxcblx0XHRcdFx0Y2hlY2tlZDogdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCxcblx0XHRcdFx0ZW5hYmxlZDogIXVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQsXG5cdFx0XHRcdHR5cGU6IFwiY2hlY2tib3hcIixcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAod29ya3NwYWNlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGxhc3RBY3RpdmVXb3Jrc3BhY2VMYWJlbCA9XG5cdFx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/Lmxhc3RBY3RpdmVXb3Jrc3BhY2VMYWJlbCA/PyBcIiBbQWN0aXZlIFdvcmtzcGFjZV1cIjtcblx0XHRcdFx0Zm9yIChjb25zdCB3b3Jrc3BhY2Ugb2Ygd29ya3NwYWNlcykge1xuXHRcdFx0XHRcdGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnkuc3VibWVudT8ucHVzaCh7XG5cdFx0XHRcdFx0XHRsYWJlbDpcblx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCAmJiB3b3Jrc3BhY2Uud29ya3NwYWNlSWQgPT09IHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkXG5cdFx0XHRcdFx0XHRcdFx0PyBgJHt3b3Jrc3BhY2UudGl0bGV9ICR7bGFzdEFjdGl2ZVdvcmtzcGFjZUxhYmVsfWBcblx0XHRcdFx0XHRcdFx0XHQ6IHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IHdvcmtzcGFjZS53b3Jrc3BhY2VJZCAhPT0gc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQgfHwgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCxcblx0XHRcdFx0XHRcdGNoZWNrZWQ6ICF1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0ICYmIHdvcmtzcGFjZS53b3Jrc3BhY2VJZCA9PT0gc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImNoZWNrYm94XCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWQ6IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IHdvcmtzcGFjZS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IG1lbnVJdGVtc1RvUmV0dXJuOiBNZW51RW50cnlbXSA9IFtdO1xuXHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5KTtcblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9saWZlY3ljbGVcIjtcbmltcG9ydCB7IFNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlciB9IGZyb20gXCIuL21lbnVzXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRtZW51czogbmV3IFNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlcigpLFxuXHRsaWZlY3ljbGU6IG5ldyBBcHBseURlZmF1bHRXb3Jrc3BhY2VQcm92aWRlcigpLFxuXHRhY3Rpb25zOiBuZXcgRGVmYXVsdFdvcmtzcGFjZUFjdGlvbnMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==