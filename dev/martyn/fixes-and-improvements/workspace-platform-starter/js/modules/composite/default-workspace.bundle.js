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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxXQUFXLEtBQUssdUJBQXVCO3dCQUN4RixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsSUFBSSxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUE4Qzs0QkFDcEQsTUFBTSxFQUFFO2dDQUNQLEVBQUUsRUFBRSx1QkFBdUI7Z0NBQzNCLFVBQVUsRUFBRTtvQ0FDWCxXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVc7b0NBQ2xDLHNCQUFzQixFQUFFLEtBQUs7aUNBQzdCOzZCQUNEO3lCQUNEO3FCQUNELENBQUMsQ0FBQztpQkFDSDthQUNEO1lBQ0QsTUFBTSxpQkFBaUIsR0FBZ0IsRUFBRSxDQUFDO1lBQzFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2xELE9BQU8saUJBQWlCLENBQUM7U0FDekI7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0M3S0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTG9EO0FBQ1E7QUFDTjtBQUV0RDs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxLQUFLLEVBQUUsSUFBSSwrREFBMkIsRUFBRTtJQUN4QyxTQUFTLEVBQUUsSUFBSSxxRUFBNkIsRUFBRTtJQUM5QyxPQUFPLEVBQUUsSUFBSSw2REFBdUIsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9saWZlY3ljbGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQge1xuXHRDdXN0b21BY3Rpb25DYWxsZXJUeXBlLFxuXHR0eXBlIEFjdGlvbkhlbHBlcnMsXG5cdHR5cGUgQWN0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB9IGZyb20gXCIuL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgRGVmYXVsdFdvcmtzcGFjZVBheWxvYWQsIERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0V29ya3NwYWNlQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnM8RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWVhbnMgdG8gZ2V0IGFuZCBzZXQgZGVmYXVsdCB3b3Jrc3BhY2VzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKiAqL1xuXHRwcml2YXRlIF9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZTogRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJEZWZhdWx0V29ya3NwYWNlQWN0aW9uXCIpO1xuXHRcdHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlID0gbmV3IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKCk7XG5cdFx0YXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuaW5pdGlhbGl6ZShkZWZpbml0aW9uPy5kYXRhLCBoZWxwZXJzLCB0aGlzLl9sb2dnZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLkdsb2JhbENvbnRleHRNZW51KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHBheWxvYWQuY3VzdG9tRGF0YSkgJiYgIWlzRW1wdHkodGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5zZXREZWZhdWx0V29ya3NwYWNlKFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEgYXMgRGVmYXVsdFdvcmtzcGFjZVBheWxvYWRcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFRoZSBkZWZhdWx0IHdvcmtzcGFjZSBzdGF0ZSBoYXMgYmVlbiB1cGRhdGVkOiAke3Jlc3VsdH1gLCBwYXlsb2FkLmN1c3RvbURhdGEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRcdFwiQW4gYWN0aW9uIGZvciBzZXR0aW5nIHRoZSBkZWZhdWx0IHdvcmtzcGFjZSB3YXMgbm90IHBhc3NlZCBhIHBheWxvYWQgYW5kIGNhbm5vdCBiZSBwcm9jZXNzZWQuXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDYW5ub3Qgc2V0IHRoZSBkZWZhdWx0IHdvcmtzcGFjZSB3aXRoIHRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZC5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBFbmRwb2ludENsaWVudCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFZlcnNpb25JbmZvIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy92ZXJzaW9uLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUge1xuXHREZWZhdWx0V29ya3NwYWNlUGF5bG9hZCxcblx0RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyxcblx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVxdWVzdCxcblx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVzcG9uc2UsXG5cdEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZVNldFJlcXVlc3Rcbn0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGNvbnRhaW5zIHRoZSBtZXRob2RzIHJlcXVpcmVkIGZvciBzYXZpbmcgYW5kIGdldHRpbmcgYSBkZWZhdWx0IHdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIHtcblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIEFuIGVuZHBvaW50IGNsaWVudCBpZiBhdmFpbGFibGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZW5kcG9pbnRDbGllbnQ6IEVuZHBvaW50Q2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmVyc2lvbiBpbmZvIGZvciB0aGUgY3VycmVudGx5IHJ1bm5pbmcgcGxhdGZvcm0uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfdmVyc2lvbkluZm86IFZlcnNpb25JbmZvIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBBIGhlbHBlciBmb3Igc2F2aW5nIGFuZCByZXR1cm5pbmcgdGhlIGRlZmF1bHQgd29ya3NwYWNlIHJlbGF0ZWQgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBzZXR0aW5ncyBzZXR0aW5ncyB0byBiZSB1c2VkIGJ5IHRoaXMgaGVscGVyXG5cdCAqIEBwYXJhbSBoZWxwZXJzIGhlbHBlciBmdW5jdGlvbnMgdG8gYmUgdXNlZFxuXHQgKiBAcGFyYW0gbG9nZ2VyIGEgbG9nZ2VyIHRvIHVzZSB3aGlsZSBwZXJmb3JtaW5nIGFjdGlvbnNcblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdHNldHRpbmdzOiBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zIHwgdW5kZWZpbmVkLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQsXG5cdFx0bG9nZ2VyOiBMb2dnZXJcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0YXdhaXQgdGhpcy5zZXR1cEVuZHBvaW50Q2xpZW50KCk7XG5cdFx0YXdhaXQgdGhpcy5zZXRWZXJzaW9uSW5mbygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmUgdGhlIGRlZmF1bHQgd29ya3NwYWNlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzYXZlLlxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc2F2ZSB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBzZXREZWZhdWx0V29ya3NwYWNlKHBheWxvYWQ6IERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3QgcGF5bG9hZElkID0gdGhpcy5fc2V0dGluZ3M/LnBheWxvYWRJZCA/PyBcImRlZmF1bHQtd29ya3NwYWNlXCI7XG5cdFx0Y29uc3Qgc2V0RW5kcG9pbnRJZCA9IHRoaXMuX3NldHRpbmdzPy5lbmRwb2ludElkcz8uc2V0RGVmYXVsdFdvcmtzcGFjZSA/PyBcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiO1xuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2VuZHBvaW50Q2xpZW50KSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fdmVyc2lvbkluZm8pICYmXG5cdFx0XHR0aGlzLl9lbmRwb2ludENsaWVudC5oYXNFbmRwb2ludChzZXRFbmRwb2ludElkKVxuXHRcdCkge1xuXHRcdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IHRoaXMuX2VuZHBvaW50Q2xpZW50LmFjdGlvbjxFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VTZXRSZXF1ZXN0PihzZXRFbmRwb2ludElkLCB7XG5cdFx0XHRcdGlkOiBwYXlsb2FkSWQsXG5cdFx0XHRcdHBsYXRmb3JtOiBmaW4ubWUuaWRlbnRpdHkudXVpZCxcblx0XHRcdFx0bWV0YURhdGE6IHtcblx0XHRcdFx0XHR2ZXJzaW9uOiB7XG5cdFx0XHRcdFx0XHR3b3Jrc3BhY2VQbGF0Zm9ybUNsaWVudDogdGhpcy5fdmVyc2lvbkluZm8ud29ya3NwYWNlUGxhdGZvcm1DbGllbnQsXG5cdFx0XHRcdFx0XHRwbGF0Zm9ybUNsaWVudDogdGhpcy5fdmVyc2lvbkluZm8ucGxhdGZvcm1DbGllbnRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBheWxvYWRcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHN1Y2Nlc3M7XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFwiVW5hYmxlIHRvIHNldCB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UgYXMgdGhlIGFjY2VzcyB0byB0aGUgZW5kcG9pbnQgY2xpZW50LCB2ZXJzaW9uIGluZm8gb3IgdGhlIGVuZHBvaW50IGlzIG5vdCBhdmFpbGFibGUuXCJcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGN1cnJlbnRseSBzYXZlZCBkZWZhdWx0IHdvcmtzcGFjZS5cblx0ICogQHJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgc2F2ZWQgZGVmYXVsdCB3b3Jrc3BhY2Ugb3IgYSBwYXlsb2FkIHdpdGggYW4gZW1wdHkgd29ya3NwYWNlXG5cdCAqIGFuZCBkZWZhdWx0IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2Ugc2V0dGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXREZWZhdWx0V29ya3NwYWNlKCk6IFByb21pc2U8RGVmYXVsdFdvcmtzcGFjZVBheWxvYWQ+IHtcblx0XHRjb25zdCBwYXlsb2FkSWQgPSB0aGlzLl9zZXR0aW5ncz8ucGF5bG9hZElkID8/IFwiZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRjb25zdCBnZXRFbmRwb2ludElkID0gdGhpcy5fc2V0dGluZ3M/LmVuZHBvaW50SWRzPy5nZXREZWZhdWx0V29ya3NwYWNlID8/IFwiZ2V0LWRlZmF1bHQtd29ya3NwYWNlXCI7XG5cdFx0Y29uc3Qgbm9TYXZlZERhdGE6IERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkID0ge1xuXHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogZmFsc2UsXG5cdFx0XHR3b3Jrc3BhY2VJZDogXCJcIlxuXHRcdH07XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2VuZHBvaW50Q2xpZW50KSAmJiB0aGlzLl9lbmRwb2ludENsaWVudC5oYXNFbmRwb2ludChnZXRFbmRwb2ludElkKSkge1xuXHRcdFx0Y29uc3Qgc2F2ZWRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLl9lbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2U8XG5cdFx0XHRcdEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZUdldFJlcXVlc3QsXG5cdFx0XHRcdEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZUdldFJlc3BvbnNlXG5cdFx0XHQ+KGdldEVuZHBvaW50SWQsIHtcblx0XHRcdFx0cGxhdGZvcm06IGZpbi5tZS5pZGVudGl0eS51dWlkLFxuXHRcdFx0XHRpZDogcGF5bG9hZElkXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBzYXZlZFdvcmtzcGFjZT8ucGF5bG9hZCA/PyBub1NhdmVkRGF0YTtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XCJVbmFibGUgdG8gZ2V0IHRoZSBkZWZhdWx0IHdvcmtzcGFjZSBhcyB0aGUgYWNjZXNzIHRvIHRoZSBlbmRwb2ludCBjbGllbnQgb3IgdGhlIGVuZHBvaW50IGlzIG5vdCBhdmFpbGFibGUuXCJcblx0XHQpO1xuXHRcdHJldHVybiBub1NhdmVkRGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXR1cCB0aGUgZW5kcG9pbnQgY2xpZW50IGlmIHlvdSBoYXZlIGFjY2VzcyB0byB0aGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBjbGllbnQuXG5cdCAqIEByZXR1cm5zIGEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3QgdGhlIGVuZHBvaW50IGNsaWVudCBjb3VsZCBiZSBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzZXR1cEVuZHBvaW50Q2xpZW50KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudCkpIHtcblx0XHRcdHRoaXMuX2VuZHBvaW50Q2xpZW50ID0gYXdhaXQgdGhpcy5faGVscGVycz8uZ2V0RW5kcG9pbnRDbGllbnQoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB2ZXJzaW9uIGluZm8gZm9yIHRoZSBjdXJyZW50bHkgcnVubmluZyBwbGF0Zm9ybS5cblx0ICogQHJldHVybnMgYSBib29sZWFuIHJlcHJlc2VudGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVyc2lvbiBpbmZvIHdhcyBhdmFpbGFibGUuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHNldFZlcnNpb25JbmZvKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5nZXRWZXJzaW9uSW5mbykpIHtcblx0XHRcdHRoaXMuX3ZlcnNpb25JbmZvID0gYXdhaXQgdGhpcy5faGVscGVycz8uZ2V0VmVyc2lvbkluZm8oKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7XG5cdExpZmVjeWNsZSxcblx0TGlmZWN5Y2xlRXZlbnRNYXAsXG5cdFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbGlmZWN5Y2xlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfSBmcm9tIFwiLi9kZWZhdWx0LXdvcmtzcGFjZS1zdG9yYWdlXCI7XG5pbXBvcnQgdHlwZSB7IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGFwcGx5IGRlZmF1bHQgd29ya3NwYWNlIGxpZmVjeWNsZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcGx5RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyIGltcGxlbWVudHMgTGlmZWN5Y2xlPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIG1lYW5zIHRvIGdldCBhbmQgc2V0IGRlZmF1bHQgd29ya3NwYWNlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlOiBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcGx5RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlID0gbmV3IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKCk7XG5cdFx0YXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuaW5pdGlhbGl6ZShkZWZpbml0aW9uPy5kYXRhLCBoZWxwZXJzLCB0aGlzLl9sb2dnZXIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxpZmVjeWNsZSBldmVudHMuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxMaWZlY3ljbGVFdmVudE1hcD4ge1xuXHRcdGNvbnN0IGxpZmVjeWNsZU1hcDogTGlmZWN5Y2xlRXZlbnRNYXAgPSB7fTtcblxuXHRcdGxpZmVjeWNsZU1hcFtcImFmdGVyLWJvb3RzdHJhcFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGN1c3RvbURhdGE/OiB1bmtub3duXG5cdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBzYXZlZERlZmF1bHRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZT8uZ2V0RGVmYXVsdFdvcmtzcGFjZSgpO1xuXHRcdFx0XHRjb25zdCB3b3Jrc3BhY2VJZCA9IHNhdmVkRGVmYXVsdFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHdvcmtzcGFjZUlkKSAmJiAhaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5sYXVuY2hXb3Jrc3BhY2UpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdFx0YFJldHJpZXZlZCB3b3Jrc3BhY2UgaWQ6ICR7c2F2ZWREZWZhdWx0V29ya3NwYWNlPy53b3Jrc3BhY2VJZH0gYW5kIHdlIGhhdmUgdGhlIGFiaWxpdHkgdG8gbGF1bmNoIGEgd29ya3NwYWNlLiBBcHBseWluZyB0aGUgd29ya3NwYWNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUFwcGxpZWQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hXb3Jrc3BhY2Uod29ya3NwYWNlSWQsIHRoaXMuX2xvZ2dlcik7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBXb3Jrc3BhY2UgSWQgJHt3b3Jrc3BhY2VJZH0gYXBwbGllZDogJHt3b3Jrc3BhY2VBcHBsaWVkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIlRoZXJlIHdhcyBhbiBlcnJvciB0cnlpbmcgdG8gYXBwbHkgdG8gZ2V0IG9yIGFwcGx5IHRoZSBkZWZhdWx0IHdvcmtzcGFjZS5cIiwgZXJyKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0bGlmZWN5Y2xlTWFwW1wid29ya3NwYWNlLWNoYW5nZWRcIl0gPSBhc3luYyAoXG5cdFx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0XHRjdXN0b21EYXRhPzogdW5rbm93blxuXHRcdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGN1c3RvbURhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZVVwZGF0ZSA9IGN1c3RvbURhdGEgYXMgV29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQod29ya3NwYWNlVXBkYXRlLmFjdGlvbiA9PT0gXCJ1cGRhdGVcIiB8fCB3b3Jrc3BhY2VVcGRhdGUuYWN0aW9uID09PSBcImNyZWF0ZVwiKSAmJlxuXHRcdFx0XHRcdCFpc0VtcHR5KHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgY3VycmVudERlZmF1bHRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5nZXREZWZhdWx0V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudERlZmF1bHRXb3Jrc3BhY2UudXNlTGFzdEFjdGl2ZVdvcmtzcGFjZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2Uuc2V0RGVmYXVsdFdvcmtzcGFjZSh7XG5cdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IHdvcmtzcGFjZVVwZGF0ZS5pZCxcblx0XHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XHRcdFx0YERlZmF1bHQgd29ya3NwYWNlIHVwZGF0ZWQgdG8gd29ya3NwYWNlOiAke3dvcmtzcGFjZVVwZGF0ZS5pZH0gdGhyb3VnaCBsYXN0IGFjdGl2ZSB3b3Jrc3BhY2U6ICR7c3VjY2Vzc31gXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRgVW5hYmxlIHRvIHVwZGF0ZSBkZWZhdWx0IHdvcmtzcGFjZSB0byB3b3Jrc3BhY2UgaWQ6ICR7d29ya3NwYWNlVXBkYXRlLmlkfSBiZWNhdXNlIGFuIGVycm9yIG9jY3VycmVkLmAsXG5cdFx0XHRcdFx0XHRcdGVyclxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGxpZmVjeWNsZU1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUsXG5cdFdvcmtzcGFjZSxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0TWVudUVudHJ5LFxuXHRNZW51cyxcblx0UmVsYXRlZE1lbnVJZCxcblx0TWVudVR5cGVcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB9IGZyb20gXCIuL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgc2V0IGRlZmF1bHQgd29ya3NwYWNlIG1lbnVzIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgU2V0RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyIGltcGxlbWVudHMgTWVudXM8RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucztcblxuXHQvKipcblx0ICogVGhlIG1lYW5zIHRvIGdldCBhbmQgc2V0IGRlZmF1bHQgd29ya3NwYWNlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICogKi9cblx0cHJpdmF0ZSBfZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2U6IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiU2V0RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHRcdHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlID0gbmV3IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlKCk7XG5cdFx0YXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuaW5pdGlhbGl6ZShkZWZpbml0aW9uPy5kYXRhLCBoZWxwZXJzLCB0aGlzLl9sb2dnZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gcmVsYXRlZE1lbnVJZCBJZiBhdmFpbGFibGUgcHJvdmlkZSB0aGUgcmVsYXRlZCB3aW5kb3cgaWRlbnRpdHkgdGhlIG1lbnUgaXMgc2hvd2luZyBvbiBhbmQgcGFnZSBvciB2aWV3IGlkc1xuXHQgKiBkZXBlbmRpbmcgb24gdGhlIG1lbnUgdHlwZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoXG5cdFx0bWVudVR5cGU6IE1lbnVUeXBlLFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRyZWxhdGVkTWVudUlkPzogUmVsYXRlZE1lbnVJZFxuXHQpOiBQcm9taXNlPE1lbnVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKFxuXHRcdFx0bWVudVR5cGUgPT09IFwiZ2xvYmFsXCIgJiZcblx0XHRcdCFpc0VtcHR5KHJlbGF0ZWRNZW51SWQ/LndpbmRvd0lkZW50aXR5KSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UpXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBjdXJyZW50RGVmYXVsdFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmdldERlZmF1bHRXb3Jrc3BhY2UoKTtcblx0XHRcdGNvbnN0IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQ6IGJvb2xlYW4gPSBjdXJyZW50RGVmYXVsdFdvcmtzcGFjZS51c2VMYXN0QWN0aXZlV29ya3NwYWNlO1xuXHRcdFx0Y29uc3Qgc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQ6IHN0cmluZyA9IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlLndvcmtzcGFjZUlkO1xuXG5cdFx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZTogV29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uZ2V0Q3VycmVudFdvcmtzcGFjZSgpO1xuXHRcdFx0d29ya3NwYWNlcy5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpO1xuXHRcdFx0Y29uc3QgZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRpbmNsdWRlOiB0cnVlLFxuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LmRlZmF1bHRXb3Jrc3BhY2U/Lm1lbnVMYWJlbCA/PyBcIkRlZmF1bHQgV29ya3NwYWNlXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5kZWZhdWx0V29ya3NwYWNlPy5tZW51SWNvbixcblx0XHRcdFx0ZW5hYmxlZDogd29ya3NwYWNlcy5sZW5ndGggPiAwLFxuXHRcdFx0XHRzdWJtZW51OiBbXSxcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIkRvd25sb2Fkc1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHRjdXN0b21JZDogXCJEZWZhdWx0V29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LmRlZmF1bHRXb3Jrc3BhY2U/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaW5jbHVkZVJlc2V0ID0gaXNFbXB0eSh0aGlzLl9zZXR0aW5ncz8ucmVzZXQ/LmluY2x1ZGUpIHx8IHRoaXMuX3NldHRpbmdzPy5yZXNldD8uaW5jbHVkZTtcblx0XHRcdGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnkuc3VibWVudT8ucHVzaCh7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8ucmVzZXQ/Lm1lbnVMYWJlbCA/PyBcIk5vbmVcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LnJlc2V0Py5tZW51SWNvbixcblx0XHRcdFx0dmlzaWJsZTogaW5jbHVkZVJlc2V0LFxuXHRcdFx0XHRlbmFibGVkOiB1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0IHx8IGlzU3RyaW5nVmFsdWUoc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQpLFxuXHRcdFx0XHRjaGVja2VkOiAhdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCAmJiAhaXNTdHJpbmdWYWx1ZShzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZCksXG5cdFx0XHRcdHR5cGU6IFwiY2hlY2tib3hcIixcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogXCJcIixcblx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogZmFsc2Vcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgaW5jbHVkZUxhc3RBY3RpdmUgPVxuXHRcdFx0XHRpc0VtcHR5KHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5pbmNsdWRlKSB8fCB0aGlzLl9zZXR0aW5ncz8ubGFzdEFjdGl2ZT8uaW5jbHVkZTtcblx0XHRcdGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnkuc3VibWVudT8ucHVzaCh7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8ubGFzdEFjdGl2ZT8ubWVudUxhYmVsID8/IFwiTGFzdCBBY3RpdmUgV29ya3NwYWNlXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5tZW51SWNvbixcblx0XHRcdFx0dmlzaWJsZTogaW5jbHVkZUxhc3RBY3RpdmUsXG5cdFx0XHRcdGNoZWNrZWQ6IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQsXG5cdFx0XHRcdGVuYWJsZWQ6ICF1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0LFxuXHRcdFx0XHR0eXBlOiBcImNoZWNrYm94XCIsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRpZDogXCJzZXQtZGVmYXVsdC13b3Jrc3BhY2VcIixcblx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGN1cnJlbnRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkID8/IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHdvcmtzcGFjZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBsYXN0QWN0aXZlV29ya3NwYWNlTGFiZWwgPVxuXHRcdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5sYXN0QWN0aXZlV29ya3NwYWNlTGFiZWwgPz8gXCIgW0FjdGl2ZSBXb3Jrc3BhY2VdXCI7XG5cdFx0XHRcdGZvciAoY29uc3Qgd29ya3NwYWNlIG9mIHdvcmtzcGFjZXMpIHtcblx0XHRcdFx0XHRkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5LnN1Ym1lbnU/LnB1c2goe1xuXHRcdFx0XHRcdFx0bGFiZWw6XG5cdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQgJiYgd29ya3NwYWNlLndvcmtzcGFjZUlkID09PSBzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZFxuXHRcdFx0XHRcdFx0XHRcdD8gYCR7d29ya3NwYWNlLnRpdGxlfSAke2xhc3RBY3RpdmVXb3Jrc3BhY2VMYWJlbH1gXG5cdFx0XHRcdFx0XHRcdFx0OiB3b3Jrc3BhY2UudGl0bGUsXG5cdFx0XHRcdFx0XHRlbmFibGVkOiB3b3Jrc3BhY2Uud29ya3NwYWNlSWQgIT09IHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkIHx8IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQsXG5cdFx0XHRcdFx0XHRjaGVja2VkOiAhdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCAmJiB3b3Jrc3BhY2Uud29ya3NwYWNlSWQgPT09IHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJjaGVja2JveFwiLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdGlkOiBcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiLFxuXHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiB3b3Jrc3BhY2Uud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBtZW51SXRlbXNUb1JldHVybjogTWVudUVudHJ5W10gPSBbXTtcblx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeSk7XG5cdFx0XHRyZXR1cm4gbWVudUl0ZW1zVG9SZXR1cm47XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBEZWZhdWx0V29ya3NwYWNlQWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IEFwcGx5RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyIH0gZnJvbSBcIi4vbGlmZWN5Y2xlXCI7XG5pbXBvcnQgeyBTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0bWVudXM6IG5ldyBTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIoKSxcblx0bGlmZWN5Y2xlOiBuZXcgQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIoKSxcblx0YWN0aW9uczogbmV3IERlZmF1bHRXb3Jrc3BhY2VBY3Rpb25zKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=