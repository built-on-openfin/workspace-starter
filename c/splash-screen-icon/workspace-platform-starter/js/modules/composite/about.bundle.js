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
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   getCommandLineArgs: () => (/* binding */ getCommandLineArgs),
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
/**
 * Get the command line arguments from a command line string.
 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
 * @param commandLine The command line string.
 * @returns The command line arguments or an empty array if none
 */
function getCommandLineArgs(commandLine) {
    if (!isStringValue(commandLine)) {
        return [];
    }
    const matches = commandLine.match(/(\w+=)?("[^"]*"|'[^']*'|[^ ]+)/g);
    if (isEmpty(matches)) {
        return [];
    }
    return matches;
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
                for (const key of keys) {
                    const versionForKey = versionInfo[key];
                    if (!this._excludeVersionType.includes(key) && versionForKey) {
                        const label = this._versionTypeMap[key] ?? key;
                        tableData.push([label, versionForKey ?? "unknown"]);
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
            const tableFragment = await this._integrationHelpers.templateHelpers.createTable(tableData, [], 0, data);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMeUM7QUFDTTtBQUNEO0FBQ1Q7QUFHckMsTUFBTSxXQUFXLEdBQWdCLEVBQUUsQ0FBQztBQUM3QixNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsWUFBWSxFQUFFLElBQUksdURBQWEsRUFBRTtJQUNqQyxVQUFVLEVBQUUsSUFBSSx3REFBZSxDQUFDLFdBQVcsQ0FBQztJQUM1QyxPQUFPLEVBQUUsSUFBSSxrREFBWSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSSw4Q0FBVSxFQUFFO0NBQ3ZCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEN1c3RvbUFjdGlvbnNNYXAsIFRvb2xiYXJCdXR0b24sIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzLCBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlTGlzdCB9IGZyb20gXCIuL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIGZvciBhbiBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uczxPID0gdW5rbm93bj4gZXh0ZW5kcyBNb2R1bGVJbXBsZW1lbnRhdGlvbjxPLCBBY3Rpb25IZWxwZXJzPiB7XG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+O1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBtb2R1bGVzIHRoYXQgcHJvdmlkZSBhY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIHBsYXRmb3JtLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25zUHJvdmlkZXJPcHRpb25zID0gTW9kdWxlTGlzdDtcblxuLyoqXG4gKiBFeHRlbmRlZCBoZWxwZXJzIHVzZWQgYnkgYWN0aW9uIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uSGVscGVycyBleHRlbmRzIE1vZHVsZUhlbHBlcnMge1xuXHQvKipcblx0ICogVXBkYXRlIHRvb2xiYXIgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbnMgVGhlIGxpc3Qgb2YgYWxsIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25JZCBUaGUgYnV0dG9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHJlcGxhY2VtZW50QnV0dG9uSWQgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgYnV0dG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgdXBkYXRlZCBidXR0b25zLlxuXHQgKi9cblx0dXBkYXRlVG9vbGJhckJ1dHRvbnM6IChcblx0XHRidXR0b25zOiBUb29sYmFyQnV0dG9uW10sXG5cdFx0YnV0dG9uSWQ6IHN0cmluZyxcblx0XHRyZXBsYWNlbWVudEJ1dHRvbklkOiBzdHJpbmdcblx0KSA9PiBQcm9taXNlPFRvb2xiYXJCdXR0b25bXT47XG59XG5cbi8qKlxuICogVXNlIHRoaXMgaW4gcHJlZmVyZW5jZSB0byBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIGZyb20gd29ya3NwYWNlLXBsYXRmb3JtIHRvIGF2b2lkIHRoZSBpbXBvcnQgb2YgdGhlIHdob2xlIG9mIHdvcmtzcGFjZSBwYWNrYWdlIGluIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUge1xuXHRDdXN0b21CdXR0b24gPSBcIkN1c3RvbUJ1dHRvblwiLFxuXHRTdG9yZUN1c3RvbUJ1dHRvbiA9IFwiU3RvcmVDdXN0b21CdXR0b25cIixcblx0Q3VzdG9tRHJvcGRvd25JdGVtID0gXCJDdXN0b21Ecm9wZG93bkl0ZW1cIixcblx0R2xvYmFsQ29udGV4dE1lbnUgPSBcIkdsb2JhbENvbnRleHRNZW51XCIsXG5cdFZpZXdUYWJDb250ZXh0TWVudSA9IFwiVmlld1RhYkNvbnRleHRNZW51XCIsXG5cdFBhZ2VUYWJDb250ZXh0TWVudSA9IFwiUGFnZVRhYkNvbnRleHRNZW51XCIsXG5cdFNhdmVCdXR0b25Db250ZXh0TWVudSA9IFwiU2F2ZUJ1dHRvbkNvbnRleHRNZW51XCIsXG5cdEFQSSA9IFwiQVBJXCJcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBEbyBhIGRlZXAgY29tcGFyaXNvbiBvZiB0aGUgb2JqZWN0cy5cbiAqIEBwYXJhbSBvYmoxIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvYmoyIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbWF0Y2hQcm9wZXJ0eU9yZGVyIElmIHRydWUgdGhlIHByb3BlcnRpZXMgbXVzdCBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9iamVjdHMgYXJlIHRoZSBzYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEVxdWFsKG9iajE6IHVua25vd24sIG9iajI6IHVua25vd24sIG1hdGNoUHJvcGVydHlPcmRlcjogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcblx0aWYgKGlzT2JqZWN0KG9iajEpICYmIGlzT2JqZWN0KG9iajIpKSB7XG5cdFx0Y29uc3Qgb2JqS2V5czEgPSBPYmplY3Qua2V5cyhvYmoxKTtcblx0XHRjb25zdCBvYmpLZXlzMiA9IE9iamVjdC5rZXlzKG9iajIpO1xuXG5cdFx0aWYgKG9iaktleXMxLmxlbmd0aCAhPT0gb2JqS2V5czIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoUHJvcGVydHlPcmRlciAmJiBKU09OLnN0cmluZ2lmeShvYmpLZXlzMSkgIT09IEpTT04uc3RyaW5naWZ5KG9iaktleXMyKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iaktleXMxKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUxID0gKG9iajEgYXMgYW55KVtrZXldO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMiA9IChvYmoyIGFzIGFueSlba2V5XTtcblxuXHRcdFx0aWYgKCFkZWVwRXF1YWwodmFsdWUxLCB2YWx1ZTIsIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajEpICYmIEFycmF5LmlzQXJyYXkob2JqMikpIHtcblx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFkZWVwRXF1YWwob2JqMVtpXSwgb2JqMltpXSwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKTtcbn1cblxuLyoqXG4gKiBEZWVwIG1lcmdlIHR3byBvYmplY3RzLlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGJlIG1lcmdlZCBpbnRvLlxuICogQHBhcmFtIHNvdXJjZXMgVGhlIG9iamVjdHMgdG8gbWVyZ2UgaW50byB0aGUgdGFyZ2V0LlxuICogQHJldHVybnMgVGhlIG1lcmdlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8VCA9IHVua25vd24+KHRhcmdldDogVCwgLi4uc291cmNlczogVFtdKTogVCB7XG5cdGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VzKSB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc01hcCA9IHRhcmdldCBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cblx0bGV0IGtleXM7XG5cdGlmIChpc09iamVjdCh0YXJnZXRBc01hcCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gc291cmNlO1xuXHRcdH1cblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKS5tYXAoKGspID0+IE51bWJlci5wYXJzZUludChrLCAxMCkpO1xuXHR9XG5cblx0aWYgKGtleXMpIHtcblx0XHRjb25zdCBzb3VyY2VBc01hcCA9IHNvdXJjZSBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlQXNNYXBba2V5XTtcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHRhcmdldCwgLi4uc291cmNlcyk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGZyb20gYSBjb21tYW5kIGxpbmUgc3RyaW5nLlxuICogRXhhbXBsZXMgb2YgY29tbWFuZCBsaW5lIHN0cmluZ3M6IGFyZzEga2V5MT12YWx1ZTEga2V5Mj1cInZhbHVlIHdpdGggc3BhY2VzXCIga2V5Mz0ndmFsdWUzJyBrZXk0PSd2YWx1ZSB3aXRoIG1vcmUgc3BhY2VzJ2AuXG4gKiBAcGFyYW0gY29tbWFuZExpbmUgVGhlIGNvbW1hbmQgbGluZSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBvciBhbiBlbXB0eSBhcnJheSBpZiBub25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tYW5kTGluZUFyZ3MoY29tbWFuZExpbmU6IHN0cmluZyk6IHN0cmluZ1tdIHtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKGNvbW1hbmRMaW5lKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBtYXRjaGVzID0gY29tbWFuZExpbmUubWF0Y2goLyhcXHcrPSk/KFwiW15cIl0qXCJ8J1teJ10qJ3xbXiBdKykvZyk7XG5cdGlmIChpc0VtcHR5KG1hdGNoZXMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdHJldHVybiBtYXRjaGVzO1xufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQge1xuXHRDdXN0b21BY3Rpb25DYWxsZXJUeXBlLFxuXHR0eXBlIEFjdGlvbkhlbHBlcnMsXG5cdHR5cGUgQWN0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFib3V0QWN0aW9uU2V0dGluZ3MsIFNoYXJlZFN0YXRlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0QWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBhY3Rpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dEFjdGlvblNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNoYXJlZCBzdGF0ZSBwYXNzZWQgdG8gdGhlc2UgaW1wbGVtZW50YXRpb25zLlxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfc2hhcmVkU3RhdGU6IFNoYXJlZFN0YXRlO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQWNjb3VudEFjdGlvbnMuXG5cdCAqIEBwYXJhbSBzaGFyZWRTdGF0ZSBUaGUgc2hhcmVkIHN0YXRlIGRhdGEuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUpIHtcblx0XHR0aGlzLl9zaGFyZWRTdGF0ZSA9IHNoYXJlZFN0YXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRBY3Rpb25TZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dEFjdGlvblwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyA9IGF3YWl0IHRoaXMuZ2V0QWJvdXRXaW5kb3coKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJzaG93LWFib3V0XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLkdsb2JhbENvbnRleHRNZW51ICYmXG5cdFx0XHRcdCFpc0VtcHR5KHRoaXMuX3NoYXJlZFN0YXRlPy5hYm91dFdpbmRvdylcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBhYm91dFdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMoe1xuXHRcdFx0XHRcdHV1aWQ6IGZpbi5tZS5pZGVudGl0eS51dWlkLFxuXHRcdFx0XHRcdG5hbWU6IHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93Lm5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGxldCB3aW5kb3dFeGlzdHMgPSBmYWxzZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBhYm91dFdpbmRvdy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0d2luZG93RXhpc3RzID0gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2Fubm90IHNlZSBleGlzdGluZyBhYm91dCB3aW5kb3cuIFdpbGwgY3JlYXRlIGFuIGFib3V0IHdpbmRvdy5cIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAod2luZG93RXhpc3RzKSB7XG5cdFx0XHRcdFx0YXdhaXQgYWJvdXRXaW5kb3cuc2V0QXNGb3JlZ3JvdW5kKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93KTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIkVycm9yIGxhdW5jaGluZyBzaG93IGFib3V0IGFjdGlvbiB3aW5kb3cuXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGFib3V0IHdpbmRvdyBvcHRpb25zIGVucmljaGVkIHdpdGggVmVyc2lvbkluZm8uXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgb3B0aW9ucyB0byBzaG93LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRBYm91dFdpbmRvdygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93T3B0aW9ucyB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LndpbmRvd09wdGlvbnMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJObyBhYm91dCB3aW5kb3cgY29uZmlndXJhdGlvbiBwcm92aWRlZC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmFsaWRhdGVkV2luZG93T3B0aW9uczogUGFydGlhbDxPcGVuRmluLldpbmRvd09wdGlvbnM+ID0ge1xuXHRcdFx0Li4udGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ud2luZG93T3B0aW9uc1xuXHRcdH07XG5cblx0XHRpZiAoaXNFbXB0eSh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLnVybCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFwiQW4gYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbiB3YXMgc2V0IGJ1dCBhIHVybCB3YXMgbm90IHByb3ZpZGVkLiBBIHdpbmRvdyBjYW5ub3QgYmUgbGF1bmNoZWQuXCJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoaXNFbXB0eSh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUpKSB7XG5cdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tdmVyc2lvbmluZy1hYm91dGA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2hlbHBlcnM/LmdldFZlcnNpb25JbmZvKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucz8uY3VzdG9tRGF0YT8udmVyc2lvbkluZm8pKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcIkVucmljaGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIHByb3ZpZGVkIGJ5IGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24uXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhLnZlcnNpb25JbmZvID0ge1xuXHRcdFx0XHRcdC4uLnZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyxcblx0XHRcdFx0XHQuLi4oYXdhaXQgdGhpcy5faGVscGVycy5nZXRWZXJzaW9uSW5mbygpKVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiU2V0dGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIGZvciBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uLlwiKTtcblx0XHRcdFx0aWYgKGlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZXR1cm5pbmcgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFdpbmRvd09wdGlvbnMgYXMgT3BlbkZpbi5XaW5kb3dPcHRpb25zO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IENvbmRpdGlvbk1hcCwgQ29uZGl0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvY29uZGl0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgU2hhcmVkU3RhdGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbi8qKlxuICogSW1wbGVtZW50IHRoZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRDb25kaXRpb25zIGltcGxlbWVudHMgQ29uZGl0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBjb25kaXRpb25zLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzaGFyZWQgc3RhdGUgcGFzc2VkIHRvIHRoZXNlIGltcGxlbWVudGF0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX3NoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEFib3V0Q29uZGl0aW9ucy5cblx0ICogQHBhcmFtIHNoYXJlZFN0YXRlIFRoZSBzaGFyZWQgc3RhdGUgZGF0YS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSkge1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlID0gc2hhcmVkU3RhdGU7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dENvbmRpdGlvblwiKTtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkNvbmRpdGlvbiBJbml0aWFsaXplZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBNYXAgb2YgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPENvbmRpdGlvbk1hcD4ge1xuXHRcdGNvbnN0IGNvbmRpdGlvbk1hcDogQ29uZGl0aW9uTWFwID0ge307XG5cblx0XHRjb25kaXRpb25NYXBbXCJoYXMtYWJvdXRcIl0gPSBhc3luYyAoKTogUHJvbWlzZTxib29sZWFuPiA9PiAhaXNFbXB0eSh0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyk7XG5cblx0XHRyZXR1cm4gY29uZGl0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVBY3Rpb24sXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0LFxuXHRUZW1wbGF0ZUZyYWdtZW50XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBWZXJzaW9uSW5mbyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvdmVyc2lvbi1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRQcm92aWRlclNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYWJvdXQgaW5mby5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0UHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxBYm91dFByb3ZpZGVyU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAzMDAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29tbWFuZCB0byBkaXNwbGF5IHRoZSBhYm91dCBpbmZvcm1hdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUJPVVRfQ09NTUFORCA9IFwiL2Fib3V0XCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb24gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogQWJvdXRQcm92aWRlclNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlZCBhbHRlcm5hdGUgbGFiZWxzIGZvciB0aGUgdmVyc2lvbiB0eXBlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3ZlcnNpb25UeXBlTWFwPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHQvKipcblx0ICogUHJvdmlkZWQgYWx0ZXJuYXRlIGxhYmVscyBmb3IgdGhlIHZlcnNpb24gdHlwZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9leGNsdWRlVmVyc2lvblR5cGU/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dFByb3ZpZGVyU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5fdmVyc2lvblR5cGVNYXAgPSBkZWZpbml0aW9uPy5kYXRhPy52ZXJzaW9uVHlwZU1hcCA/PyB7fTtcblx0XHR0aGlzLl9leGNsdWRlVmVyc2lvblR5cGUgPSBkZWZpbml0aW9uPy5kYXRhPy5leGNsdWRlVmVyc2lvblR5cGUgPz8gW107XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFib3V0UHJvdmlkZXJcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycykge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogYCR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9LWhlbHBgLFxuXHRcdFx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gQWJvdXRQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdHRpdGxlOiBBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5ELFxuXHRcdFx0XHRcdGxhYmVsOiBcIkhlbHBcIixcblx0XHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRcdFx0cG9wdWxhdGVRdWVyeTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVIZWxwKFxuXHRcdFx0XHRcdFx0QWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0XHRcdFtcIlRoZSBhYm91dCBjb21tYW5kIGxpc3RzIHRoZSB2ZXJzaW9uIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhpcyBwbGF0Zm9ybS5cIl0sXG5cdFx0XHRcdFx0XHRbQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORF1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0Pzogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRpZiAocXVlcnkubGVuZ3RoIDwgMiB8fCAhQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORC5zdGFydHNXaXRoKHF1ZXJ5KSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVzdWx0czogW11cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0VmVyc2lvbkluZm8pIHtcblx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cdFx0XHRjb25zdCBwYWxldHRlID0gYXdhaXQgdGhlbWVDbGllbnQuZ2V0UGFsZXR0ZSgpO1xuXG5cdFx0XHRjb25zdCB2ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRWZXJzaW9uSW5mbygpO1xuXG5cdFx0XHRjb25zdCBhY3Rpb25zOiBIb21lQWN0aW9uW10gPSBbXTtcblxuXHRcdFx0Y29uc3QgZGF0YTogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cblx0XHRcdGNvbnN0IHRhYmxlRGF0YTogc3RyaW5nW11bXSA9IFtdO1xuXHRcdFx0dGFibGVEYXRhLnB1c2goW1wiVmVyc2lvbiBUeXBlXCIsIFwiVmVyc2lvblwiXSk7XG5cblx0XHRcdGlmICh2ZXJzaW9uSW5mbyAmJiB0aGlzLl92ZXJzaW9uVHlwZU1hcCAmJiB0aGlzLl9leGNsdWRlVmVyc2lvblR5cGUpIHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZlcnNpb25JbmZvKTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmVyc2lvbkZvcktleSA9IHZlcnNpb25JbmZvW2tleSBhcyBrZXlvZiBWZXJzaW9uSW5mb107XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9leGNsdWRlVmVyc2lvblR5cGUuaW5jbHVkZXMoa2V5KSAmJiB2ZXJzaW9uRm9yS2V5KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYWJlbCA9IHRoaXMuX3ZlcnNpb25UeXBlTWFwW2tleV0gPz8ga2V5O1xuXHRcdFx0XHRcdFx0dGFibGVEYXRhLnB1c2goW2xhYmVsLCB2ZXJzaW9uRm9yS2V5ID8/IFwidW5rbm93blwiXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGRhdGEudGl0bGUgPSB0aGlzLl9zZXR0aW5ncz8udGl0bGUgPz8gXCJWZXJzaW9uc1wiO1xuXG5cdFx0XHRjb25zdCBjaGlsZHJlbjogVGVtcGxhdGVGcmFnbWVudFtdID0gW107XG5cdFx0XHRjb25zdCB0aXRsZUZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGl0bGUoXG5cdFx0XHRcdFwidGl0bGVcIixcblx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3BhbGV0dGUuYmFja2dyb3VuZDZ9YFxuXHRcdFx0XHR9XG5cdFx0XHQpKSBhcyBUZW1wbGF0ZUZyYWdtZW50O1xuXG5cdFx0XHRjaGlsZHJlbi5wdXNoKHRpdGxlRnJhZ21lbnQpO1xuXG5cdFx0XHRjb25zdCBkZXNjID0gdGhpcy5fc2V0dGluZ3M/LmRlc2NyaXB0aW9uO1xuXHRcdFx0aWYgKCFpc0VtcHR5KGRlc2MpKSB7XG5cdFx0XHRcdGRhdGEuZGVzY3JpcHRpb24gPSBkZXNjO1xuXHRcdFx0XHRjb25zdCBkZXNjcmlwdGlvbkZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGV4dChcblx0XHRcdFx0XHRcImRlc2NyaXB0aW9uXCIsXG5cdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goZGVzY3JpcHRpb25GcmFnbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHRhYmxlRnJhZ21lbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRhYmxlKFxuXHRcdFx0XHR0YWJsZURhdGEsXG5cdFx0XHRcdFtdLFxuXHRcdFx0XHQwLFxuXHRcdFx0XHRkYXRhXG5cdFx0XHQpO1xuXG5cdFx0XHRjaGlsZHJlbi5wdXNoKHRhYmxlRnJhZ21lbnQpO1xuXG5cdFx0XHRjb25zdCByZXN1bHQ6IEhvbWVTZWFyY2hSZXN1bHQgPSB7XG5cdFx0XHRcdGtleTogXCJhYm91dC1pbmZvXCIsXG5cdFx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gQWJvdXRQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHR0aXRsZTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0bGFiZWw6IFwiVmVyc2lvblwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0XHRhY3Rpb25zLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWRcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0XHRsYXlvdXQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQ29udGFpbmVyKFwiY29sdW1uXCIsIGNoaWxkcmVuLCB7XG5cdFx0XHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIlxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdGRhdGFcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVzdWx0czogW3Jlc3VsdF1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtdXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNZW51RW50cnksIE1lbnVUeXBlLCBNZW51cyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbWVudS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBYm91dE1lbnVzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIG1lbnVzLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRNZW51cyBpbXBsZW1lbnRzIE1lbnVzPEFib3V0TWVudXNTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogQWJvdXRNZW51c1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0TWVudXNTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJEZXZlbG9wZXJNZW51c1wiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcmV0dXJucyBUaGUgbWVudSBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChtZW51VHlwZTogTWVudVR5cGUsIHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAobWVudVR5cGUgPT09IFwiZ2xvYmFsXCIpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LmVudHJpZXM/LmFib3V0Py5sYWJlbCA/PyBcIkFib3V0XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJzaG93LWFib3V0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB0aGlzLl9zZXR0aW5ncz8uZW50cmllcz8uYWJvdXQ/LnBvc2l0aW9uID8/IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiUXVpdFwiLFxuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjb25kaXRpb25zOiBbXCJoYXMtYWJvdXRcIl1cblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEFib3V0QWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IEFib3V0Q29uZGl0aW9ucyB9IGZyb20gXCIuL2NvbmRpdGlvbnNcIjtcbmltcG9ydCB7IEFib3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuaW1wb3J0IHsgQWJvdXRNZW51cyB9IGZyb20gXCIuL21lbnVzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlZFN0YXRlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmNvbnN0IHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSA9IHt9O1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IEFib3V0UHJvdmlkZXIoKSxcblx0Y29uZGl0aW9uczogbmV3IEFib3V0Q29uZGl0aW9ucyhzaGFyZWRTdGF0ZSksXG5cdGFjdGlvbnM6IG5ldyBBYm91dEFjdGlvbnMoc2hhcmVkU3RhdGUpLFxuXHRtZW51czogbmV3IEFib3V0TWVudXMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==