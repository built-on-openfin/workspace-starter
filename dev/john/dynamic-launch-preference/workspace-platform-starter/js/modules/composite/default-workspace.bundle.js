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
    if (constraint.includes("URL_NONE")) {
        return false;
    }
    if (constraint.includes("URL_ANY")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("URL_PAGE")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("URL_DOMAIN")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTG9EO0FBQ1E7QUFDTjtBQUV0RDs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxLQUFLLEVBQUUsSUFBSSwrREFBMkIsRUFBRTtJQUN4QyxTQUFTLEVBQUUsSUFBSSxxRUFBNkIsRUFBRTtJQUM5QyxPQUFPLEVBQUUsSUFBSSw2REFBdUIsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGVmYXVsdC13b3Jrc3BhY2UvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9saWZlY3ljbGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZWZhdWx0LXdvcmtzcGFjZS9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RlZmF1bHQtd29ya3NwYWNlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEEgd2F5IG9mIHNwZWNpZnkgdGhlIHJ1bGVzIGFyb3VuZCB0aGUgdmFsaWRhdGlvbi5cbiAqIERPTUFJTiBtZWFucyB0aGF0IHRoZSB1cmwgbXVzdCBjb21lIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICogUEFHRSBtZWFucyB0aGF0IHRoZSB1cmxzIG11c3QgbWF0Y2ggdGhlIHNhbWUgb3JpZ2luIGFuZCBwYXRoLlxuICogQU5ZIG1lYW5zIHlvdSBhcmUgYWxsb3dlZCB0byByZXBsYWNlIG9uZSB1cmwgd2l0aCBhbm90aGVyIHdpdGhvdXQgY29uc3RyYWluLlxuICogTk9ORSBtZWFucyB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCB0aGUgdXJsIGlzIG5vdCBjaGFuZ2VkLlxuICovXG5leHBvcnQgdHlwZSBWYWxpZFVSTENvbnN0cmFpbnQgPSBcIlVSTF9ET01BSU5cIiB8IFwiVVJMX1BBR0VcIiB8IFwiVVJMX0FOWVwiIHwgXCJVUkxfTk9ORVwiO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc3VnZ2VzdGVkIHVybCB0byBzZWUgaWYgaXQgY2FuIHJlcGxhY2UgdGhlIHNvdXJjZSB1cmwuXG4gKiBAcGFyYW0gc291cmNlVXJsIHRoZSBvcmlnaW5hbCB1cmwgdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHN1Z2dlc3RlZFVybCB0aGUgc3VnZ2VzdGVkIHVybCB0byByZXBsYWNlIGl0IHdpdGguXG4gKiBAcGFyYW0gY29uc3RyYWludCB0aGUgcnVsZXMgdG8gYXBwbHkgYWdhaW5zdCBpdC5cbiAqIEByZXR1cm5zIHdoZXRoZXIgaXQgaXMgb2sgdG8gcmVwbGFjZSB0aGUgc291cmNlVXJsIHdpdGggdGhlIHN1Z2dlc3RlZFVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFVybChcblx0c291cmNlVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHN1Z2dlc3RlZFVybDogc3RyaW5nLFxuXHRjb25zdHJhaW50OiBWYWxpZFVSTENvbnN0cmFpbnRbXSB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG5cdGlmIChpc0VtcHR5KHN1Z2dlc3RlZFVybCkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKCFBcnJheS5pc0FycmF5KGNvbnN0cmFpbnQpIHx8IGNvbnN0cmFpbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfTk9ORVwiKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9BTllcIikpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoaXNFbXB0eShzb3VyY2VVcmwpKSB7XG5cdFx0Ly8gaWYgd2UgYXJlIGFib3V0IHRvIGRvIGEgZG9tYWluIHJlbGF0ZWQgY2hlY2sgdGhlbiB3ZSBuZWVkIGEgc291cmNlIHVybFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCB2YWxpZGF0ZWRTb3VyY2VVcmwgPSBuZXcgVVJMKHNvdXJjZVVybCk7XG5cdGNvbnN0IHZhbGlkYXRlZFN1Z2dlc3RlZFVybCA9IG5ldyBVUkwoc3VnZ2VzdGVkVXJsKTtcblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9QQUdFXCIpKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCh2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luICsgdmFsaWRhdGVkU291cmNlVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpID09PVxuXHRcdFx0KHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHQpO1xuXHR9XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfRE9NQUlOXCIpKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gPT09IHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW47XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZCwgRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRXb3Jrc3BhY2VBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9uczxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBtZWFucyB0byBnZXQgYW5kIHNldCBkZWZhdWx0IHdvcmtzcGFjZXNcblx0ICogQGludGVybmFsXG5cdCAqICovXG5cdHByaXZhdGUgX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlOiBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRlZmF1bHRXb3Jrc3BhY2VBY3Rpb25cIik7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wic2V0LWRlZmF1bHQtd29ya3NwYWNlXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZC5jdXN0b21EYXRhKSAmJiAhaXNFbXB0eSh0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLnNldERlZmF1bHRXb3Jrc3BhY2UoXG5cdFx0XHRcdFx0XHRcdHBheWxvYWQuY3VzdG9tRGF0YSBhcyBEZWZhdWx0V29ya3NwYWNlUGF5bG9hZFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgVGhlIGRlZmF1bHQgd29ya3NwYWNlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQ6ICR7cmVzdWx0fWAsIHBheWxvYWQuY3VzdG9tRGF0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XCJBbiBhY3Rpb24gZm9yIHNldHRpbmcgdGhlIGRlZmF1bHQgd29ya3NwYWNlIHdhcyBub3QgcGFzc2VkIGEgcGF5bG9hZCBhbmQgY2Fubm90IGJlIHByb2Nlc3NlZC5cIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNhbm5vdCBzZXQgdGhlIGRlZmF1bHQgd29ya3NwYWNlIHdpdGggdGhlIGluZm9ybWF0aW9uIHByb3ZpZGVkLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVuZHBvaW50Q2xpZW50IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgVmVyc2lvbkluZm8gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3ZlcnNpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdERlZmF1bHRXb3Jrc3BhY2VQYXlsb2FkLFxuXHREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zLFxuXHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXF1ZXN0LFxuXHRFbmRwb2ludERlZmF1bHRXb3Jrc3BhY2VHZXRSZXNwb25zZSxcblx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlU2V0UmVxdWVzdFxufSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgY29udGFpbnMgdGhlIG1ldGhvZHMgcmVxdWlyZWQgZm9yIHNhdmluZyBhbmQgZ2V0dGluZyBhIGRlZmF1bHQgd29ya3NwYWNlLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2Uge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucztcblxuXHQvKipcblx0ICogQW4gZW5kcG9pbnQgY2xpZW50IGlmIGF2YWlsYWJsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9lbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJzaW9uIGluZm8gZm9yIHRoZSBjdXJyZW50bHkgcnVubmluZyBwbGF0Zm9ybS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF92ZXJzaW9uSW5mbzogVmVyc2lvbkluZm8gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEEgaGVscGVyIGZvciBzYXZpbmcgYW5kIHJldHVybmluZyB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UgcmVsYXRlZCBpbmZvcm1hdGlvbi5cblx0ICogQHBhcmFtIHNldHRpbmdzIHNldHRpbmdzIHRvIGJlIHVzZWQgYnkgdGhpcyBoZWxwZXJcblx0ICogQHBhcmFtIGhlbHBlcnMgaGVscGVyIGZ1bmN0aW9ucyB0byBiZSB1c2VkXG5cdCAqIEBwYXJhbSBsb2dnZXIgYSBsb2dnZXIgdG8gdXNlIHdoaWxlIHBlcmZvcm1pbmcgYWN0aW9uc1xuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0c2V0dGluZ3M6IERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnMgfCB1bmRlZmluZWQsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZCxcblx0XHRsb2dnZXI6IExvZ2dlclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRhd2FpdCB0aGlzLnNldHVwRW5kcG9pbnRDbGllbnQoKTtcblx0XHRhd2FpdCB0aGlzLnNldFZlcnNpb25JbmZvKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2F2ZSB0aGUgZGVmYXVsdCB3b3Jrc3BhY2UuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHRvIHNhdmUuXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzYXZlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNldERlZmF1bHRXb3Jrc3BhY2UocGF5bG9hZDogRGVmYXVsdFdvcmtzcGFjZVBheWxvYWQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBwYXlsb2FkSWQgPSB0aGlzLl9zZXR0aW5ncz8ucGF5bG9hZElkID8/IFwiZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRjb25zdCBzZXRFbmRwb2ludElkID0gdGhpcy5fc2V0dGluZ3M/LmVuZHBvaW50SWRzPy5zZXREZWZhdWx0V29ya3NwYWNlID8/IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCI7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fZW5kcG9pbnRDbGllbnQpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl92ZXJzaW9uSW5mbykgJiZcblx0XHRcdHRoaXMuX2VuZHBvaW50Q2xpZW50Lmhhc0VuZHBvaW50KHNldEVuZHBvaW50SWQpXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgdGhpcy5fZW5kcG9pbnRDbGllbnQuYWN0aW9uPEVuZHBvaW50RGVmYXVsdFdvcmtzcGFjZVNldFJlcXVlc3Q+KHNldEVuZHBvaW50SWQsIHtcblx0XHRcdFx0aWQ6IHBheWxvYWRJZCxcblx0XHRcdFx0cGxhdGZvcm06IGZpbi5tZS5pZGVudGl0eS51dWlkLFxuXHRcdFx0XHRtZXRhRGF0YToge1xuXHRcdFx0XHRcdHZlcnNpb246IHtcblx0XHRcdFx0XHRcdHdvcmtzcGFjZVBsYXRmb3JtQ2xpZW50OiB0aGlzLl92ZXJzaW9uSW5mby53b3Jrc3BhY2VQbGF0Zm9ybUNsaWVudCxcblx0XHRcdFx0XHRcdHBsYXRmb3JtQ2xpZW50OiB0aGlzLl92ZXJzaW9uSW5mby5wbGF0Zm9ybUNsaWVudFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0cGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gc3VjY2Vzcztcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XCJVbmFibGUgdG8gc2V0IHRoZSBkZWZhdWx0IHdvcmtzcGFjZSBhcyB0aGUgYWNjZXNzIHRvIHRoZSBlbmRwb2ludCBjbGllbnQsIHZlcnNpb24gaW5mbyBvciB0aGUgZW5kcG9pbnQgaXMgbm90IGF2YWlsYWJsZS5cIlxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgY3VycmVudGx5IHNhdmVkIGRlZmF1bHQgd29ya3NwYWNlLlxuXHQgKiBAcmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBzYXZlZCBkZWZhdWx0IHdvcmtzcGFjZSBvciBhIHBheWxvYWQgd2l0aCBhbiBlbXB0eSB3b3Jrc3BhY2Vcblx0ICogYW5kIGRlZmF1bHQgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZSBzZXR0aW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldERlZmF1bHRXb3Jrc3BhY2UoKTogUHJvbWlzZTxEZWZhdWx0V29ya3NwYWNlUGF5bG9hZD4ge1xuXHRcdGNvbnN0IHBheWxvYWRJZCA9IHRoaXMuX3NldHRpbmdzPy5wYXlsb2FkSWQgPz8gXCJkZWZhdWx0LXdvcmtzcGFjZVwiO1xuXHRcdGNvbnN0IGdldEVuZHBvaW50SWQgPSB0aGlzLl9zZXR0aW5ncz8uZW5kcG9pbnRJZHM/LmdldERlZmF1bHRXb3Jrc3BhY2UgPz8gXCJnZXQtZGVmYXVsdC13b3Jrc3BhY2VcIjtcblx0XHRjb25zdCBub1NhdmVkRGF0YTogRGVmYXVsdFdvcmtzcGFjZVBheWxvYWQgPSB7XG5cdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiBmYWxzZSxcblx0XHRcdHdvcmtzcGFjZUlkOiBcIlwiXG5cdFx0fTtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fZW5kcG9pbnRDbGllbnQpICYmIHRoaXMuX2VuZHBvaW50Q2xpZW50Lmhhc0VuZHBvaW50KGdldEVuZHBvaW50SWQpKSB7XG5cdFx0XHRjb25zdCBzYXZlZFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2VuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTxcblx0XHRcdFx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVxdWVzdCxcblx0XHRcdFx0RW5kcG9pbnREZWZhdWx0V29ya3NwYWNlR2V0UmVzcG9uc2Vcblx0XHRcdD4oZ2V0RW5kcG9pbnRJZCwge1xuXHRcdFx0XHRwbGF0Zm9ybTogZmluLm1lLmlkZW50aXR5LnV1aWQsXG5cdFx0XHRcdGlkOiBwYXlsb2FkSWRcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHNhdmVkV29ya3NwYWNlPy5wYXlsb2FkID8/IG5vU2F2ZWREYXRhO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcIlVuYWJsZSB0byBnZXQgdGhlIGRlZmF1bHQgd29ya3NwYWNlIGFzIHRoZSBhY2Nlc3MgdG8gdGhlIGVuZHBvaW50IGNsaWVudCBvciB0aGUgZW5kcG9pbnQgaXMgbm90IGF2YWlsYWJsZS5cIlxuXHRcdCk7XG5cdFx0cmV0dXJuIG5vU2F2ZWREYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBlbmRwb2ludCBjbGllbnQgaWYgeW91IGhhdmUgYWNjZXNzIHRvIHRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGNsaWVudC5cblx0ICogQHJldHVybnMgYSBib29sZWFuIHJlcHJlc2VudGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgZW5kcG9pbnQgY2xpZW50IGNvdWxkIGJlIGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHNldHVwRW5kcG9pbnRDbGllbnQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50KSkge1xuXHRcdFx0dGhpcy5fZW5kcG9pbnRDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZlcnNpb24gaW5mbyBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIHBsYXRmb3JtLlxuXHQgKiBAcmV0dXJucyBhIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoZSB2ZXJzaW9uIGluZm8gd2FzIGF2YWlsYWJsZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2V0VmVyc2lvbkluZm8oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmdldFZlcnNpb25JbmZvKSkge1xuXHRcdFx0dGhpcy5fdmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRWZXJzaW9uSW5mbygpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHtcblx0TGlmZWN5Y2xlLFxuXHRMaWZlY3ljbGVFdmVudE1hcCxcblx0V29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWRcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9saWZlY3ljbGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBEZWZhdWx0V29ya3NwYWNlU3RvcmFnZSB9IGZyb20gXCIuL2RlZmF1bHQtd29ya3NwYWNlLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgRGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgYXBwbHkgZGVmYXVsdCB3b3Jrc3BhY2UgbGlmZWN5Y2xlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgaW1wbGVtZW50cyBMaWZlY3ljbGU8RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWVhbnMgdG8gZ2V0IGFuZCBzZXQgZGVmYXVsdCB3b3Jrc3BhY2VzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2U6IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBsaWZlY3ljbGUgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPExpZmVjeWNsZUV2ZW50TWFwPiB7XG5cdFx0Y29uc3QgbGlmZWN5Y2xlTWFwOiBMaWZlY3ljbGVFdmVudE1hcCA9IHt9O1xuXG5cdFx0bGlmZWN5Y2xlTWFwW1wiYWZ0ZXItYm9vdHN0cmFwXCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y3VzdG9tRGF0YT86IHVua25vd25cblx0XHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHNhdmVkRGVmYXVsdFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlPy5nZXREZWZhdWx0V29ya3NwYWNlKCk7XG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUlkID0gc2F2ZWREZWZhdWx0V29ya3NwYWNlPy53b3Jrc3BhY2VJZDtcblx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUod29ya3NwYWNlSWQpICYmICFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSkpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XHRgUmV0cmlldmVkIHdvcmtzcGFjZSBpZDogJHtzYXZlZERlZmF1bHRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkfSBhbmQgd2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBsYXVuY2ggYSB3b3Jrc3BhY2UuIEFwcGx5aW5nIHRoZSB3b3Jrc3BhY2UuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlQXBwbGllZCA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSh3b3Jrc3BhY2VJZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFdvcmtzcGFjZSBJZCAke3dvcmtzcGFjZUlkfSBhcHBsaWVkOiAke3dvcmtzcGFjZUFwcGxpZWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHRyeWluZyB0byBhcHBseSB0byBnZXQgb3IgYXBwbHkgdGhlIGRlZmF1bHQgd29ya3NwYWNlLlwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRsaWZlY3ljbGVNYXBbXCJ3b3Jrc3BhY2UtY2hhbmdlZFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGN1c3RvbURhdGE/OiB1bmtub3duXG5cdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoY3VzdG9tRGF0YSkpIHtcblx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlVXBkYXRlID0gY3VzdG9tRGF0YSBhcyBXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZDtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCh3b3Jrc3BhY2VVcGRhdGUuYWN0aW9uID09PSBcInVwZGF0ZVwiIHx8IHdvcmtzcGFjZVVwZGF0ZS5hY3Rpb24gPT09IFwiY3JlYXRlXCIpICYmXG5cdFx0XHRcdFx0IWlzRW1wdHkodGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJyZW50RGVmYXVsdFdvcmtzcGFjZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlLmdldERlZmF1bHRXb3Jrc3BhY2UoKTtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50RGVmYXVsdFdvcmtzcGFjZS51c2VMYXN0QWN0aXZlV29ya3NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5zZXREZWZhdWx0V29ya3NwYWNlKHtcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogd29ya3NwYWNlVXBkYXRlLmlkLFxuXHRcdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdFx0XHRgRGVmYXVsdCB3b3Jrc3BhY2UgdXBkYXRlZCB0byB3b3Jrc3BhY2U6ICR7d29ya3NwYWNlVXBkYXRlLmlkfSB0aHJvdWdoIGxhc3QgYWN0aXZlIHdvcmtzcGFjZTogJHtzdWNjZXNzfWBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcdGBVbmFibGUgdG8gdXBkYXRlIGRlZmF1bHQgd29ya3NwYWNlIHRvIHdvcmtzcGFjZSBpZDogJHt3b3Jrc3BhY2VVcGRhdGUuaWR9IGJlY2F1c2UgYW4gZXJyb3Igb2NjdXJyZWQuYCxcblx0XHRcdFx0XHRcdFx0ZXJyXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gbGlmZWN5Y2xlTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZSxcblx0V29ya3NwYWNlLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRNZW51RW50cnksXG5cdE1lbnVzLFxuXHRSZWxhdGVkTWVudUlkLFxuXHRNZW51VHlwZVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VTdG9yYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC13b3Jrc3BhY2Utc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBzZXQgZGVmYXVsdCB3b3Jrc3BhY2UgbWVudXMgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgaW1wbGVtZW50cyBNZW51czxEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWVhbnMgdG8gZ2V0IGFuZCBzZXQgZGVmYXVsdCB3b3Jrc3BhY2VzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKiAqL1xuXHRwcml2YXRlIF9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZTogRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RGVmYXVsdFdvcmtzcGFjZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJTZXREZWZhdWx0V29ya3NwYWNlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdFx0dGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UgPSBuZXcgRGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UoKTtcblx0XHRhd2FpdCB0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZS5pbml0aWFsaXplKGRlZmluaXRpb24/LmRhdGEsIGhlbHBlcnMsIHRoaXMuX2xvZ2dlcik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSByZWxhdGVkTWVudUlkIElmIGF2YWlsYWJsZSBwcm92aWRlIHRoZSByZWxhdGVkIHdpbmRvdyBpZGVudGl0eSB0aGUgbWVudSBpcyBzaG93aW5nIG9uIGFuZCBwYWdlIG9yIHZpZXcgaWRzXG5cdCAqIGRlcGVuZGluZyBvbiB0aGUgbWVudSB0eXBlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChcblx0XHRtZW51VHlwZTogTWVudVR5cGUsXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHJlbGF0ZWRNZW51SWQ/OiBSZWxhdGVkTWVudUlkXG5cdCk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoXG5cdFx0XHRtZW51VHlwZSA9PT0gXCJnbG9iYWxcIiAmJlxuXHRcdFx0IWlzRW1wdHkocmVsYXRlZE1lbnVJZD8ud2luZG93SWRlbnRpdHkpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9kZWZhdWx0V29ya3NwYWNlU3RvcmFnZSlcblx0XHQpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlID0gYXdhaXQgdGhpcy5fZGVmYXVsdFdvcmtzcGFjZVN0b3JhZ2UuZ2V0RGVmYXVsdFdvcmtzcGFjZSgpO1xuXHRcdFx0Y29uc3QgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldDogYm9vbGVhbiA9IGN1cnJlbnREZWZhdWx0V29ya3NwYWNlLnVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U7XG5cdFx0XHRjb25zdCBzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZDogc3RyaW5nID0gY3VycmVudERlZmF1bHRXb3Jrc3BhY2Uud29ya3NwYWNlSWQ7XG5cblx0XHRcdGNvbnN0IHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2VzKCk7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlOiBXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHR3b3Jrc3BhY2VzLnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSk7XG5cdFx0XHRjb25zdCBkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uZGVmYXVsdFdvcmtzcGFjZT8ubWVudUxhYmVsID8/IFwiRGVmYXVsdCBXb3Jrc3BhY2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmRlZmF1bHRXb3Jrc3BhY2U/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiB3b3Jrc3BhY2VzLmxlbmd0aCA+IDAsXG5cdFx0XHRcdHN1Ym1lbnU6IFtdLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiRG93bmxvYWRzXCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiLFxuXHRcdFx0XHRcdGN1c3RvbUlkOiBcIkRlZmF1bHRXb3Jrc3BhY2VcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uZGVmYXVsdFdvcmtzcGFjZT8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRjb25zdCBpbmNsdWRlUmVzZXQgPSBpc0VtcHR5KHRoaXMuX3NldHRpbmdzPy5yZXNldD8uaW5jbHVkZSkgfHwgdGhpcy5fc2V0dGluZ3M/LnJlc2V0Py5pbmNsdWRlO1xuXHRcdFx0ZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeS5zdWJtZW51Py5wdXNoKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5yZXNldD8ubWVudUxhYmVsID8/IFwiTm9uZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8ucmVzZXQ/Lm1lbnVJY29uLFxuXHRcdFx0XHR2aXNpYmxlOiBpbmNsdWRlUmVzZXQsXG5cdFx0XHRcdGVuYWJsZWQ6IHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQgfHwgaXNTdHJpbmdWYWx1ZShzYXZlZERlZmF1bHRXb3Jrc3BhY2VJZCksXG5cdFx0XHRcdGNoZWNrZWQ6ICF1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0ICYmICFpc1N0cmluZ1ZhbHVlKHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkKSxcblx0XHRcdFx0dHlwZTogXCJjaGVja2JveFwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHR1c2VMYXN0QWN0aXZlV29ya3NwYWNlOiBmYWxzZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBpbmNsdWRlTGFzdEFjdGl2ZSA9XG5cdFx0XHRcdGlzRW1wdHkodGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/LmluY2x1ZGUpIHx8IHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5pbmNsdWRlO1xuXHRcdFx0ZGVmYXVsdFdvcmtzcGFjZU1lbnVFbnRyeS5zdWJtZW51Py5wdXNoKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5sYXN0QWN0aXZlPy5tZW51TGFiZWwgPz8gXCJMYXN0IEFjdGl2ZSBXb3Jrc3BhY2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/Lm1lbnVJY29uLFxuXHRcdFx0XHR2aXNpYmxlOiBpbmNsdWRlTGFzdEFjdGl2ZSxcblx0XHRcdFx0Y2hlY2tlZDogdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCxcblx0XHRcdFx0ZW5hYmxlZDogIXVzZUxhc3RBY3RpdmVXb3Jrc3BhY2VTZXQsXG5cdFx0XHRcdHR5cGU6IFwiY2hlY2tib3hcIixcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcInNldC1kZWZhdWx0LXdvcmtzcGFjZVwiLFxuXHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZTogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAod29ya3NwYWNlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGxhc3RBY3RpdmVXb3Jrc3BhY2VMYWJlbCA9XG5cdFx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/Lmxhc3RBY3RpdmU/Lmxhc3RBY3RpdmVXb3Jrc3BhY2VMYWJlbCA/PyBcIiBbQWN0aXZlIFdvcmtzcGFjZV1cIjtcblx0XHRcdFx0Zm9yIChjb25zdCB3b3Jrc3BhY2Ugb2Ygd29ya3NwYWNlcykge1xuXHRcdFx0XHRcdGRlZmF1bHRXb3Jrc3BhY2VNZW51RW50cnkuc3VibWVudT8ucHVzaCh7XG5cdFx0XHRcdFx0XHRsYWJlbDpcblx0XHRcdFx0XHRcdFx0dXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCAmJiB3b3Jrc3BhY2Uud29ya3NwYWNlSWQgPT09IHNhdmVkRGVmYXVsdFdvcmtzcGFjZUlkXG5cdFx0XHRcdFx0XHRcdFx0PyBgJHt3b3Jrc3BhY2UudGl0bGV9ICR7bGFzdEFjdGl2ZVdvcmtzcGFjZUxhYmVsfWBcblx0XHRcdFx0XHRcdFx0XHQ6IHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IHdvcmtzcGFjZS53b3Jrc3BhY2VJZCAhPT0gc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQgfHwgdXNlTGFzdEFjdGl2ZVdvcmtzcGFjZVNldCxcblx0XHRcdFx0XHRcdGNoZWNrZWQ6ICF1c2VMYXN0QWN0aXZlV29ya3NwYWNlU2V0ICYmIHdvcmtzcGFjZS53b3Jrc3BhY2VJZCA9PT0gc2F2ZWREZWZhdWx0V29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImNoZWNrYm94XCIsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWQ6IFwic2V0LWRlZmF1bHQtd29ya3NwYWNlXCIsXG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IHdvcmtzcGFjZS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdFx0XHRcdHVzZUxhc3RBY3RpdmVXb3Jrc3BhY2U6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IG1lbnVJdGVtc1RvUmV0dXJuOiBNZW51RW50cnlbXSA9IFtdO1xuXHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChkZWZhdWx0V29ya3NwYWNlTWVudUVudHJ5KTtcblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgQXBwbHlEZWZhdWx0V29ya3NwYWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9saWZlY3ljbGVcIjtcbmltcG9ydCB7IFNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlciB9IGZyb20gXCIuL21lbnVzXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRtZW51czogbmV3IFNldERlZmF1bHRXb3Jrc3BhY2VQcm92aWRlcigpLFxuXHRsaWZlY3ljbGU6IG5ldyBBcHBseURlZmF1bHRXb3Jrc3BhY2VQcm92aWRlcigpLFxuXHRhY3Rpb25zOiBuZXcgRGVmYXVsdFdvcmtzcGFjZUFjdGlvbnMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==