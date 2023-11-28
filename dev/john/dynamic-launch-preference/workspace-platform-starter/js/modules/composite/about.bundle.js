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

/***/ "./client/src/modules/composite/about/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/about/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutActions: () => (/* binding */ AboutActions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Implement the actions.
 */
class AboutActions {
    /**
     * Create a new instance of AccountActions.
     * @param sharedState The shared state data.
     */
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("AboutAction");
        this._helpers = helpers;
        this._definition = definition;
        this._sharedState.aboutWindow = await this.getAboutWindow();
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["show-about"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.GlobalContextMenu &&
                !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._sharedState?.aboutWindow)) {
                const aboutWindow = fin.Window.wrapSync({
                    uuid: fin.me.identity.uuid,
                    name: this._sharedState.aboutWindow.name
                });
                let windowExists = false;
                try {
                    await aboutWindow.getInfo();
                    windowExists = true;
                }
                catch {
                    this._logger?.info("Cannot see existing about window. Will create an about window.");
                }
                if (windowExists) {
                    await aboutWindow.setAsForeground();
                }
                else {
                    try {
                        await fin.Window.create(this._sharedState.aboutWindow);
                    }
                    catch (error) {
                        this._logger?.error("Error launching show about action window.", error);
                    }
                }
            }
        };
        return actionMap;
    }
    /**
     * Gets about window options enriched with VersionInfo.
     * @returns The window options to show.
     */
    async getAboutWindow() {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._definition?.data?.windowOptions)) {
            this._logger?.info("No about window configuration provided.");
            return;
        }
        const validatedWindowOptions = {
            ...this._definition?.data?.windowOptions
        };
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(validatedWindowOptions.url)) {
            this._logger?.error("An about version window configuration was set but a url was not provided. A window cannot be launched.");
            return undefined;
        }
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(validatedWindowOptions.name)) {
            validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning-about`;
        }
        if (this._helpers?.getVersionInfo) {
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(validatedWindowOptions?.customData?.versionInfo)) {
                this._logger?.info("Enriching customData versionInfo provided by about version window configuration.");
                validatedWindowOptions.customData.versionInfo = {
                    ...validatedWindowOptions.customData.versionInfo,
                    ...(await this._helpers.getVersionInfo())
                };
            }
            else {
                this._logger?.info("Setting customData versionInfo for about version window configuration.");
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(validatedWindowOptions.customData)) {
                    validatedWindowOptions.customData = {};
                }
                validatedWindowOptions.customData.versionInfo = await this._helpers.getVersionInfo();
            }
        }
        this._logger?.info("Returning about version window configuration.");
        return validatedWindowOptions;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/about/conditions.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/composite/about/conditions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutConditions: () => (/* binding */ AboutConditions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implement the conditions.
 */
class AboutConditions {
    /**
     * Create a new instance of AboutConditions.
     * @param sharedState The shared state data.
     */
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator) {
        this._logger = loggerCreator("AboutCondition");
        this._definition = definition;
        this._logger.info("Condition Initialized");
    }
    /**
     * Get the conditions from the module.
     * @returns Map of the conditions from the module.
     */
    async get() {
        const conditionMap = {};
        conditionMap["has-about"] = async () => !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._sharedState.aboutWindow);
        return conditionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/about/integration.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/composite/about/integration.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutProvider: () => (/* binding */ AboutProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implement the integration provider for about info.
 */
class AboutProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._integrationHelpers = helpers;
        this._definition = definition;
        this._settings = definition.data;
        this._versionTypeMap = definition?.data?.versionTypeMap ?? {};
        this._excludeVersionType = definition?.data?.excludeVersionType ?? [];
        this._logger = loggerCreator("AboutProvider");
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        if (this._integrationHelpers) {
            return [
                {
                    key: `${this._definition?.id}-help`,
                    score: this._definition?.baseScore ?? AboutProvider._DEFAULT_BASE_SCORE,
                    title: AboutProvider._ABOUT_COMMAND,
                    label: "Help",
                    icon: this._definition?.icon,
                    actions: [],
                    data: {
                        providerId: this._definition?.id,
                        populateQuery: AboutProvider._ABOUT_COMMAND
                    },
                    template: "Custom",
                    templateContent: await this._integrationHelpers.templateHelpers.createHelp(AboutProvider._ABOUT_COMMAND, ["The about command lists the version information related to this platform."], [AboutProvider._ABOUT_COMMAND])
                }
            ];
        }
        return [];
    }
    /**
     * Get a list of search results based on the query and filters.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @param options Options for the search query.
     * @param options.queryMinLength The minimum length before a query is actioned.
     * @param options.queryAgainst The fields in the data to query against.
     * @param options.isSuggestion Is the query from a suggestion.
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        if (query.length < 2 || !AboutProvider._ABOUT_COMMAND.startsWith(query)) {
            return {
                results: []
            };
        }
        if (this._integrationHelpers?.getVersionInfo) {
            const themeClient = await this._integrationHelpers.getThemeClient();
            const palette = await themeClient.getPalette();
            const versionInfo = await this._integrationHelpers.getVersionInfo();
            const actions = [];
            const data = {};
            const tableData = [];
            tableData.push(["Version Type", "Version"]);
            if (versionInfo && this._versionTypeMap && this._excludeVersionType) {
                const keys = Object.keys(versionInfo);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const versionForKey = versionInfo[key];
                    if (!this._excludeVersionType.includes(key) && versionForKey) {
                        const label = this._versionTypeMap[key] ?? key;
                        tableData.push([label, (versionForKey ?? "unknown")]);
                    }
                }
            }
            data.title = this._settings?.title ?? "Versions";
            const children = [];
            const titleFragment = (await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
                marginBottom: "10px",
                borderBottom: `1px solid ${palette.background6}`
            }));
            children.push(titleFragment);
            const desc = this._settings?.description;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(desc)) {
                data.description = desc;
                const descriptionFragment = (await this._integrationHelpers.templateHelpers.createText("description", undefined, {
                    marginBottom: "10px"
                }));
                children.push(descriptionFragment);
            }
            const tableFragment = (await this._integrationHelpers.templateHelpers.createTable(tableData, [], 0, data));
            children.push(tableFragment);
            const result = {
                key: "about-info",
                score: this._definition?.baseScore ?? AboutProvider._DEFAULT_BASE_SCORE,
                title: AboutProvider._ABOUT_COMMAND,
                label: "Version",
                icon: this._definition?.icon,
                actions,
                data: {
                    providerId: this._definition?.id
                },
                template: "Custom",
                templateContent: {
                    layout: await this._integrationHelpers.templateHelpers.createContainer("column", children, {
                        padding: "10px"
                    }),
                    data
                }
            };
            return {
                results: [result]
            };
        }
        return {
            results: []
        };
    }
    /**
     * An entry has been selected.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    async itemSelection(result, lastResponse) {
        return true;
    }
}
/**
 * The default base score for ordering.
 * @internal
 */
AboutProvider._DEFAULT_BASE_SCORE = 3000;
/**
 * The command to display the about information.
 * @internal
 */
AboutProvider._ABOUT_COMMAND = "/about";


/***/ }),

/***/ "./client/src/modules/composite/about/menus.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/about/menus.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutMenus: () => (/* binding */ AboutMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class AboutMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperMenus");
        this._settings = definition.data;
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
                    label: this._settings?.entries?.about?.label ?? "About",
                    data: {
                        type: "Custom",
                        action: {
                            id: "show-about"
                        }
                    },
                    position: this._settings?.entries?.about?.position ?? {
                        type: "Quit",
                        operation: "before"
                    },
                    conditions: ["has-about"]
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
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/about/index.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/about/actions.ts");
/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conditions */ "./client/src/modules/composite/about/conditions.ts");
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integration */ "./client/src/modules/composite/about/integration.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/about/menus.ts");




const sharedState = {};
const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_2__.AboutProvider(),
    conditions: new _conditions__WEBPACK_IMPORTED_MODULE_1__.AboutConditions(sharedState),
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.AboutActions(sharedState),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_3__.AboutMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2NvbmRpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwiVVJMX0RPTUFJTlwiIHwgXCJVUkxfUEFHRVwiIHwgXCJVUkxfQU5ZXCIgfCBcIlVSTF9OT05FXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9OT05FXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0FOWVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX1BBR0VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9ET01BSU5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0Q3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSxcblx0dHlwZSBBY3Rpb25IZWxwZXJzLFxuXHR0eXBlIEFjdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBBYm91dEFjdGlvblNldHRpbmdzLCBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dEFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzPzogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgYWN0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRBY3Rpb25TZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzaGFyZWQgc3RhdGUgcGFzc2VkIHRvIHRoZXNlIGltcGxlbWVudGF0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX3NoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEFjY291bnRBY3Rpb25zLlxuXHQgKiBAcGFyYW0gc2hhcmVkU3RhdGUgVGhlIHNoYXJlZCBzdGF0ZSBkYXRhLlxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc2hhcmVkU3RhdGU6IFNoYXJlZFN0YXRlKSB7XG5cdFx0dGhpcy5fc2hhcmVkU3RhdGUgPSBzaGFyZWRTdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0QWN0aW9uU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogQWN0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQWJvdXRBY3Rpb25cIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fc2hhcmVkU3RhdGUuYWJvdXRXaW5kb3cgPSBhd2FpdCB0aGlzLmdldEFib3V0V2luZG93KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wic2hvdy1hYm91dFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5HbG9iYWxDb250ZXh0TWVudSAmJlxuXHRcdFx0XHQhaXNFbXB0eSh0aGlzLl9zaGFyZWRTdGF0ZT8uYWJvdXRXaW5kb3cpXG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgYWJvdXRXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHtcblx0XHRcdFx0XHR1dWlkOiBmaW4ubWUuaWRlbnRpdHkudXVpZCxcblx0XHRcdFx0XHRuYW1lOiB0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdy5uYW1lXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsZXQgd2luZG93RXhpc3RzID0gZmFsc2U7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0YXdhaXQgYWJvdXRXaW5kb3cuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdHdpbmRvd0V4aXN0cyA9IHRydWU7XG5cdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNhbm5vdCBzZWUgZXhpc3RpbmcgYWJvdXQgd2luZG93LiBXaWxsIGNyZWF0ZSBhbiBhYm91dCB3aW5kb3cuXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHdpbmRvd0V4aXN0cykge1xuXHRcdFx0XHRcdGF3YWl0IGFib3V0V2luZG93LnNldEFzRm9yZWdyb3VuZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciBsYXVuY2hpbmcgc2hvdyBhYm91dCBhY3Rpb24gd2luZG93LlwiLCBlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBhYm91dCB3aW5kb3cgb3B0aW9ucyBlbnJpY2hlZCB3aXRoIFZlcnNpb25JbmZvLlxuXHQgKiBAcmV0dXJucyBUaGUgd2luZG93IG9wdGlvbnMgdG8gc2hvdy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0QWJvdXRXaW5kb3coKTogUHJvbWlzZTxPcGVuRmluLldpbmRvd09wdGlvbnMgfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy53aW5kb3dPcHRpb25zKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTm8gYWJvdXQgd2luZG93IGNvbmZpZ3VyYXRpb24gcHJvdmlkZWQuXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZhbGlkYXRlZFdpbmRvd09wdGlvbnM6IFBhcnRpYWw8T3BlbkZpbi5XaW5kb3dPcHRpb25zPiA9IHtcblx0XHRcdC4uLnRoaXMuX2RlZmluaXRpb24/LmRhdGE/LndpbmRvd09wdGlvbnNcblx0XHR9O1xuXG5cdFx0aWYgKGlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucy51cmwpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcIkFuIGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24gd2FzIHNldCBidXQgYSB1cmwgd2FzIG5vdCBwcm92aWRlZC4gQSB3aW5kb3cgY2Fubm90IGJlIGxhdW5jaGVkLlwiXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKGlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucy5uYW1lKSkge1xuXHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5uYW1lID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LXZlcnNpb25pbmctYWJvdXRgO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9oZWxwZXJzPy5nZXRWZXJzaW9uSW5mbykge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHZhbGlkYXRlZFdpbmRvd09wdGlvbnM/LmN1c3RvbURhdGE/LnZlcnNpb25JbmZvKSkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XCJFbnJpY2hpbmcgY3VzdG9tRGF0YSB2ZXJzaW9uSW5mbyBwcm92aWRlZCBieSBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uLlwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyA9IHtcblx0XHRcdFx0XHQuLi52YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEudmVyc2lvbkluZm8sXG5cdFx0XHRcdFx0Li4uKGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKSlcblx0XHRcdFx0fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlNldHRpbmcgY3VzdG9tRGF0YSB2ZXJzaW9uSW5mbyBmb3IgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YSkpIHtcblx0XHRcdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEgPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEudmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldFZlcnNpb25JbmZvKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmV0dXJuaW5nIGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24uXCIpO1xuXHRcdHJldHVybiB2YWxpZGF0ZWRXaW5kb3dPcHRpb25zIGFzIE9wZW5GaW4uV2luZG93T3B0aW9ucztcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDb25kaXRpb25NYXAsIENvbmRpdGlvbnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2NvbmRpdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlZFN0YXRlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG4vKipcbiAqIEltcGxlbWVudCB0aGUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0Q29uZGl0aW9ucyBpbXBsZW1lbnRzIENvbmRpdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgY29uZGl0aW9ucy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPHVua25vd24+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcmVkIHN0YXRlIHBhc3NlZCB0byB0aGVzZSBpbXBsZW1lbnRhdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGU7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBYm91dENvbmRpdGlvbnMuXG5cdCAqIEBwYXJhbSBzaGFyZWRTdGF0ZSBUaGUgc2hhcmVkIHN0YXRlIGRhdGEuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUpIHtcblx0XHR0aGlzLl9zaGFyZWRTdGF0ZSA9IHNoYXJlZFN0YXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQWJvdXRDb25kaXRpb25cIik7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJDb25kaXRpb24gSW5pdGlhbGl6ZWRcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBjb25kaXRpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTWFwIG9mIHRoZSBjb25kaXRpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxDb25kaXRpb25NYXA+IHtcblx0XHRjb25zdCBjb25kaXRpb25NYXA6IENvbmRpdGlvbk1hcCA9IHt9O1xuXG5cdFx0Y29uZGl0aW9uTWFwW1wiaGFzLWFib3V0XCJdID0gYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4gIWlzRW1wdHkodGhpcy5fc2hhcmVkU3RhdGUuYWJvdXRXaW5kb3cpO1xuXG5cdFx0cmV0dXJuIGNvbmRpdGlvbk1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lQWN0aW9uLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdCxcblx0VGVtcGxhdGVGcmFnbWVudFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEludGVncmF0aW9uSGVscGVycyxcblx0SW50ZWdyYXRpb25Nb2R1bGUsXG5cdEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvblxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgVmVyc2lvbkluZm8gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3ZlcnNpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFib3V0UHJvdmlkZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIGFib3V0IGluZm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QWJvdXRQcm92aWRlclNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMzAwMDtcblxuXHQvKipcblx0ICogVGhlIGNvbW1hbmQgdG8gZGlzcGxheSB0aGUgYWJvdXQgaW5mb3JtYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FCT1VUX0NPTU1BTkQgPSBcIi9hYm91dFwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IEFib3V0UHJvdmlkZXJTZXR0aW5ncztcblxuXHQvKipcblx0ICogUHJvdmlkZWQgYWx0ZXJuYXRlIGxhYmVscyBmb3IgdGhlIHZlcnNpb24gdHlwZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF92ZXJzaW9uVHlwZU1hcD86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVkIGFsdGVybmF0ZSBsYWJlbHMgZm9yIHRoZSB2ZXJzaW9uIHR5cGVzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZXhjbHVkZVZlcnNpb25UeXBlPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRQcm92aWRlclNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX3ZlcnNpb25UeXBlTWFwID0gZGVmaW5pdGlvbj8uZGF0YT8udmVyc2lvblR5cGVNYXAgPz8ge307XG5cdFx0dGhpcy5fZXhjbHVkZVZlcnNpb25UeXBlID0gZGVmaW5pdGlvbj8uZGF0YT8uZXhjbHVkZVZlcnNpb25UeXBlID8/IFtdO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dFByb3ZpZGVyXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6IGAke3RoaXMuX2RlZmluaXRpb24/LmlkfS1oZWxwYCxcblx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IEFib3V0UHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHR0aXRsZTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHRcdHBvcHVsYXRlUXVlcnk6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRcdEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQsXG5cdFx0XHRcdFx0XHRbXCJUaGUgYWJvdXQgY29tbWFuZCBsaXN0cyB0aGUgdmVyc2lvbiBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoaXMgcGxhdGZvcm0uXCJdLFxuXHRcdFx0XHRcdFx0W0Fib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRdXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH1cblxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5pc1N1Z2dlc3Rpb24gSXMgdGhlIHF1ZXJ5IGZyb20gYSBzdWdnZXN0aW9uLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHRcdGlzU3VnZ2VzdGlvbj86IGJvb2xlYW47XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGlmIChxdWVyeS5sZW5ndGggPCAyIHx8ICFBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5ELnN0YXJ0c1dpdGgocXVlcnkpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBbXVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRWZXJzaW9uSW5mbykge1xuXHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblx0XHRcdGNvbnN0IHBhbGV0dGUgPSBhd2FpdCB0aGVtZUNsaWVudC5nZXRQYWxldHRlKCk7XG5cblx0XHRcdGNvbnN0IHZlcnNpb25JbmZvID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFZlcnNpb25JbmZvKCk7XG5cblx0XHRcdGNvbnN0IGFjdGlvbnM6IEhvbWVBY3Rpb25bXSA9IFtdO1xuXG5cdFx0XHRjb25zdCBkYXRhOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuXHRcdFx0Y29uc3QgdGFibGVEYXRhOiBzdHJpbmdbXVtdID0gW107XG5cdFx0XHR0YWJsZURhdGEucHVzaChbXCJWZXJzaW9uIFR5cGVcIiwgXCJWZXJzaW9uXCJdKTtcblxuXHRcdFx0aWYgKHZlcnNpb25JbmZvICYmIHRoaXMuX3ZlcnNpb25UeXBlTWFwICYmIHRoaXMuX2V4Y2x1ZGVWZXJzaW9uVHlwZSkge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmVyc2lvbkluZm8pO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0Y29uc3QgdmVyc2lvbkZvcktleSA9IHZlcnNpb25JbmZvW2tleSBhcyBrZXlvZiBWZXJzaW9uSW5mb107XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9leGNsdWRlVmVyc2lvblR5cGUuaW5jbHVkZXMoa2V5KSAmJiB2ZXJzaW9uRm9yS2V5KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYWJlbCA9IHRoaXMuX3ZlcnNpb25UeXBlTWFwW2tleV0gPz8ga2V5O1xuXHRcdFx0XHRcdFx0dGFibGVEYXRhLnB1c2goW2xhYmVsLCAodmVyc2lvbkZvcktleSA/PyBcInVua25vd25cIikgYXMgc3RyaW5nXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGRhdGEudGl0bGUgPSB0aGlzLl9zZXR0aW5ncz8udGl0bGUgPz8gXCJWZXJzaW9uc1wiO1xuXG5cdFx0XHRjb25zdCBjaGlsZHJlbjogVGVtcGxhdGVGcmFnbWVudFtdID0gW107XG5cdFx0XHRjb25zdCB0aXRsZUZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGl0bGUoXG5cdFx0XHRcdFwidGl0bGVcIixcblx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3BhbGV0dGUuYmFja2dyb3VuZDZ9YFxuXHRcdFx0XHR9XG5cdFx0XHQpKSBhcyBUZW1wbGF0ZUZyYWdtZW50O1xuXG5cdFx0XHRjaGlsZHJlbi5wdXNoKHRpdGxlRnJhZ21lbnQpO1xuXG5cdFx0XHRjb25zdCBkZXNjID0gdGhpcy5fc2V0dGluZ3M/LmRlc2NyaXB0aW9uO1xuXHRcdFx0aWYgKCFpc0VtcHR5KGRlc2MpKSB7XG5cdFx0XHRcdGRhdGEuZGVzY3JpcHRpb24gPSBkZXNjO1xuXHRcdFx0XHRjb25zdCBkZXNjcmlwdGlvbkZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGV4dChcblx0XHRcdFx0XHRcImRlc2NyaXB0aW9uXCIsXG5cdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goZGVzY3JpcHRpb25GcmFnbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHRhYmxlRnJhZ21lbnQgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUYWJsZShcblx0XHRcdFx0dGFibGVEYXRhLFxuXHRcdFx0XHRbXSxcblx0XHRcdFx0MCxcblx0XHRcdFx0ZGF0YVxuXHRcdFx0KSkgYXMgVGVtcGxhdGVGcmFnbWVudDtcblxuXHRcdFx0Y2hpbGRyZW4ucHVzaCh0YWJsZUZyYWdtZW50KTtcblxuXHRcdFx0Y29uc3QgcmVzdWx0OiBIb21lU2VhcmNoUmVzdWx0ID0ge1xuXHRcdFx0XHRrZXk6IFwiYWJvdXQtaW5mb1wiLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IEFib3V0UHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGU6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQsXG5cdFx0XHRcdGxhYmVsOiBcIlZlcnNpb25cIixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0YWN0aW9ucyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdFx0bGF5b3V0OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUNvbnRhaW5lcihcImNvbHVtblwiLCBjaGlsZHJlbiwge1xuXHRcdFx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCJcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtyZXN1bHRdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgTWVudXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRNZW51c1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0TWVudXMgaW1wbGVtZW50cyBNZW51czxBYm91dE1lbnVzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IEFib3V0TWVudXNTZXR0aW5ncztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dE1lbnVzU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyTWVudXNcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHJldHVybnMgVGhlIG1lbnUgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQobWVudVR5cGU6IE1lbnVUeXBlLCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPE1lbnVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKG1lbnVUeXBlID09PSBcImdsb2JhbFwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5lbnRyaWVzPy5hYm91dD8ubGFiZWwgPz8gXCJBYm91dFwiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwic2hvdy1hYm91dFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjogdGhpcy5fc2V0dGluZ3M/LmVudHJpZXM/LmFib3V0Py5wb3NpdGlvbiA/PyB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIlF1aXRcIixcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y29uZGl0aW9uczogW1wiaGFzLWFib3V0XCJdXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBBYm91dEFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBBYm91dENvbmRpdGlvbnMgfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XG5pbXBvcnQgeyBBYm91dFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcbmltcG9ydCB7IEFib3V0TWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuaW1wb3J0IHR5cGUgeyBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5jb25zdCBzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUgPSB7fTtcbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBYm91dFByb3ZpZGVyKCksXG5cdGNvbmRpdGlvbnM6IG5ldyBBYm91dENvbmRpdGlvbnMoc2hhcmVkU3RhdGUpLFxuXHRhY3Rpb25zOiBuZXcgQWJvdXRBY3Rpb25zKHNoYXJlZFN0YXRlKSxcblx0bWVudXM6IG5ldyBBYm91dE1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=