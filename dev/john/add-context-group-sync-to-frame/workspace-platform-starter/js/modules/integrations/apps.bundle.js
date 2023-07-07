/******/ var __webpack_modules__ = ({

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
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
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


/***/ }),

/***/ "./client/src/modules/integrations/apps/integration.ts":
/*!*************************************************************!*\
  !*** ./client/src/modules/integrations/apps/integration.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppProvider: () => (/* binding */ AppProvider)
/* harmony export */ });
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");

/**
 * Implement the integration provider for apps.
 */
class AppProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._settings = definition.data;
        this._integrationHelpers = helpers;
        this._definition = definition;
        this._logger = loggerCreator("AppProvider");
        this._providerId = definition.id;
        if (this._integrationHelpers.subscribeLifecycleEvent) {
            this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
                await this.rebuildResults();
            });
        }
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
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
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        const queryLower = query.toLowerCase();
        this._lastResponse = lastResponse;
        const appResponse = await this.getResults(queryLower, filters, options);
        return appResponse;
    }
    /**
     * An entry has been selected.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    async itemSelection(result, lastResponse) {
        let handled = false;
        if (result.action.trigger === "user-action" && this._integrationHelpers?.launchApp) {
            const data = result.data;
            if (data?.app?.appId) {
                handled = true;
                await this._integrationHelpers.launchApp(data.app.appId);
            }
        }
        return handled;
    }
    /**
     * Get the results for the apps.
     * @param queryLower The query.
     * @param filters The filters to apply.
     * @param options The query options.
     * @param options.queryMinLength The minimum length before a query is actioned.
     * @param options.queryAgainst The fields in the data to query against.
     * @param cachedApps The cached apps.
     * @returns The search response.
     */
    async getResults(queryLower, filters, options, cachedApps) {
        if (this._integrationHelpers?.getApps) {
            const apps = cachedApps ?? (await this._integrationHelpers.getApps());
            this._lastAppResults = apps;
            this._lastQuery = queryLower;
            this._lastQueryMinLength = options?.queryMinLength;
            this._lastQueryAgainst = options?.queryAgainst;
            this._lastCLIFilters = filters;
            const appSearchEntries = await this.mapAppEntriesToSearchEntries(apps);
            const tags = [];
            if (appSearchEntries.length > 0) {
                const finalResults = appSearchEntries.filter((entry) => {
                    let textMatchFound = true;
                    let filterMatchFound = true;
                    const isCommand = queryLower.startsWith("/");
                    if (queryLower.length >= options.queryMinLength || isCommand) {
                        textMatchFound = options.queryAgainst.some((target) => {
                            const entryObject = entry;
                            const path = target.split(".");
                            if (path.length === 1) {
                                const targetValue = entryObject[path[0]];
                                if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(targetValue)) {
                                    const lowerTarget = targetValue.toLowerCase();
                                    if (isCommand) {
                                        return lowerTarget.startsWith(queryLower);
                                    }
                                    return lowerTarget.includes(queryLower);
                                }
                            }
                            else if (path.length === 2) {
                                const specifiedTarget = entryObject[path[0]];
                                if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(specifiedTarget)) {
                                    let targetValue;
                                    if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(specifiedTarget)) {
                                        targetValue = specifiedTarget[path[1]];
                                    }
                                    if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(targetValue)) {
                                        const lowerTarget = targetValue.toLowerCase();
                                        if (isCommand) {
                                            return lowerTarget.startsWith(queryLower);
                                        }
                                        return lowerTarget.includes(queryLower);
                                    }
                                    if (Array.isArray(targetValue)) {
                                        if (targetValue.length > 0 &&
                                            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(targetValue[0]) &&
                                            targetValue.some((mt) => mt.toLowerCase().startsWith(queryLower))) {
                                            return true;
                                        }
                                        this._logger?.warn(`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${JSON.stringify(specifiedTarget)}`);
                                    }
                                }
                            }
                            else {
                                this._logger?.warn("The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings");
                            }
                            return false;
                        });
                    }
                    const tagFilters = Array.isArray(filters)
                        ? filters.filter((f) => f.id === AppProvider._HOME_TAG_FILTERS)
                        : [];
                    if (tagFilters.length > 0) {
                        filterMatchFound = tagFilters.some((filter) => {
                            if (Array.isArray(filter.options)) {
                                if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(entry.data?.app?.tags)) {
                                    return filter.options.every((option) => !option.isSelected || entry.data.app.tags.includes(option.value));
                                }
                            }
                            else if (filter.options.isSelected && !(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(entry.data?.app?.tags)) {
                                return entry.data.app.tags.includes(filter.options.value);
                            }
                            return true;
                        });
                    }
                    if (textMatchFound && Array.isArray(entry.data?.app?.tags)) {
                        tags.push(...entry.data.app.tags);
                    }
                    return textMatchFound && filterMatchFound;
                });
                this._lastResultIds = finalResults.map((entry) => entry.key);
                return {
                    results: finalResults,
                    context: {
                        filters: this.getSearchFilters(tags.filter(Boolean))
                    }
                };
            }
        }
        this._lastResultIds = [];
        return {
            results: [],
            context: {
                filters: []
            }
        };
    }
    /**
     * Get search filters.
     * @param tags The tags to create the filters from.
     * @returns The filters.
     */
    getSearchFilters(tags) {
        if (Array.isArray(tags)) {
            const filters = [];
            const uniqueTags = [...new Set(tags)].sort();
            const tagFilter = {
                id: AppProvider._HOME_TAG_FILTERS,
                title: "Tags",
                type: "MultiSelect",
                options: []
            };
            for (const tag of uniqueTags) {
                if (Array.isArray(tagFilter.options)) {
                    tagFilter.options.push({
                        value: tag,
                        isSelected: false
                    });
                }
            }
            filters.push(tagFilter);
            return filters;
        }
        return [];
    }
    /**
     * Maps platform apps to search results.
     * @param apps The apps to convert.
     * @returns The search results.
     */
    async mapAppEntriesToSearchEntries(apps) {
        const appResults = [];
        if (Array.isArray(apps)) {
            const typeMapping = this._settings?.manifestTypeMapping;
            for (const app of apps) {
                const manifestType = app.manifestType;
                if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(manifestType)) {
                    const action = { name: "Launch View", hotkey: "enter" };
                    const entry = {
                        key: app.appId,
                        score: this._definition?.baseScore ?? AppProvider._DEFAULT_BASE_SCORE,
                        title: app.title,
                        data: { app, providerId: this._providerId }
                    };
                    if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(typeMapping)) {
                        const manifestTypeMapping = typeMapping[manifestType];
                        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(manifestTypeMapping)) {
                            if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(manifestTypeMapping.entryLabel)) {
                                entry.label = manifestTypeMapping.entryLabel;
                            }
                            if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(manifestTypeMapping.actionName)) {
                                action.name = manifestTypeMapping.actionName;
                            }
                        }
                    }
                    entry.actions = [action];
                    entry.icon = this.getAppIcon(app);
                    if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.description)) {
                        entry.description = app.description;
                        entry.shortDescription = app.description;
                    }
                    entry.template = "Custom";
                    entry.templateContent = await this._integrationHelpers?.templateHelpers.createApp(app, entry.icon ?? "", action.name);
                    appResults.push(entry);
                }
            }
        }
        return appResults;
    }
    /**
     * Get the icon for an application.
     * @param app The application to get the icon for.
     * @returns The icon.
     */
    getAppIcon(app) {
        if (Array.isArray(app.icons) && app.icons.length > 0) {
            return app.icons[0].src;
        }
    }
    /**
     * Rebuild the results if the theme changes.
     */
    async rebuildResults() {
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._lastResponse) &&
            Array.isArray(this._lastResultIds) &&
            this._lastQuery &&
            this._lastCLIFilters &&
            this._lastQueryAgainst &&
            this._lastQueryMinLength &&
            this._lastResultIds) {
            this._logger?.info("Rebuilding results...");
            const lastResultIds = this._lastResultIds.slice();
            const appResponse = await this.getResults(this._lastQuery, this._lastCLIFilters, { queryMinLength: this._lastQueryMinLength, queryAgainst: this._lastQueryAgainst }, this._lastAppResults);
            const removeResultIds = lastResultIds.filter((id) => !this._lastResultIds?.includes(id));
            if (removeResultIds.length > 0) {
                this._lastResponse.revoke(...removeResultIds);
            }
            this._lastResponse.respond(appResponse.results);
            this._logger?.info("Results rebuilt.");
        }
    }
}
/**
 * The default base score for ordering.
 * @internal
 */
AppProvider._DEFAULT_BASE_SCORE = 0;
/**
 * The key used to filter out by tag.
 * @internal
 */
AppProvider._HOME_TAG_FILTERS = "tags";


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
/*!*******************************************************!*\
  !*** ./client/src/modules/integrations/apps/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/apps/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.AppProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdkM7SUFDRixDQUFDOztBQXphRDs7O0dBR0c7QUFDcUIsK0JBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBRWhEOzs7R0FHRztBQUNxQiw2QkFBaUIsR0FBRyxNQUFNLENBQUM7Ozs7Ozs7U0NsQ3BEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFFckMsTUFBTSxXQUFXLEdBQWtDO0lBQ3pELFlBQVksRUFBRSxJQUFJLHFEQUFXLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSUZpbHRlck9wdGlvblR5cGUsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IE1hbmlmZXN0VHlwZUlkLCBQbGF0Zm9ybUFwcCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQXBwU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBhcHBzLlxuICovXG5leHBvcnQgY2xhc3MgQXBwUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxBcHBTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGRlZmF1bHQgYmFzZSBzY29yZSBmb3Igb3JkZXJpbmcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RFRkFVTFRfQkFTRV9TQ09SRSA9IDA7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdXNlZCB0byBmaWx0ZXIgb3V0IGJ5IHRhZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfSE9NRV9UQUdfRklMVEVSUyA9IFwidGFnc1wiO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9wcm92aWRlcklkPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPEFwcFNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBBcHBTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5QWdhaW5zdD86IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdENMSUZpbHRlcnM/OiBDTElGaWx0ZXJbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgYXBwIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0QXBwUmVzdWx0cz86IFBsYXRmb3JtQXBwW107XG5cblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGxhc3Qgc2V0IG9mIHJlc3VsdHNcblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXN1bHRJZHM/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXBwUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fcHJvdmlkZXJJZCA9IGRlZmluaXRpb24uaWQ7XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXCJ0aGVtZS1jaGFuZ2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdGNvbnN0IGFwcFJlc3BvbnNlOiBIb21lU2VhcmNoUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMocXVlcnlMb3dlciwgZmlsdGVycywgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gYXBwUmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8ubGF1bmNoQXBwKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdGFwcDogeyBhcHBJZD86IHN0cmluZyB9O1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRpZiAoZGF0YT8uYXBwPy5hcHBJZCkge1xuXHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaEFwcChkYXRhLmFwcC5hcHBJZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSByZXN1bHRzIGZvciB0aGUgYXBwcy5cblx0ICogQHBhcmFtIHF1ZXJ5TG93ZXIgVGhlIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIHF1ZXJ5IG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIGNhY2hlZEFwcHMgVGhlIGNhY2hlZCBhcHBzLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRSZXN1bHRzKFxuXHRcdHF1ZXJ5TG93ZXI6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9LFxuXHRcdGNhY2hlZEFwcHM/OiBQbGF0Zm9ybUFwcFtdXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0QXBwcykge1xuXHRcdFx0Y29uc3QgYXBwczogUGxhdGZvcm1BcHBbXSA9IGNhY2hlZEFwcHMgPz8gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRBcHBzKCkpO1xuXG5cdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyA9IGFwcHM7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucz8ucXVlcnlNaW5MZW5ndGg7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0ID0gb3B0aW9ucz8ucXVlcnlBZ2FpbnN0O1xuXHRcdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMgPSBmaWx0ZXJzO1xuXHRcdFx0Y29uc3QgYXBwU2VhcmNoRW50cmllcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzKTtcblxuXHRcdFx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBbXTtcblxuXHRcdFx0aWYgKGFwcFNlYXJjaEVudHJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBmaW5hbFJlc3VsdHMgPSBhcHBTZWFyY2hFbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IHtcblx0XHRcdFx0XHRsZXQgdGV4dE1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdGxldCBmaWx0ZXJNYXRjaEZvdW5kID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGNvbnN0IGlzQ29tbWFuZCA9IHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi9cIik7XG5cblx0XHRcdFx0XHRpZiAocXVlcnlMb3dlci5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCB8fCBpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdHRleHRNYXRjaEZvdW5kID0gb3B0aW9ucy5xdWVyeUFnYWluc3Quc29tZSgodGFyZ2V0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVudHJ5T2JqZWN0ID0gZW50cnkgYXMgdW5rbm93biBhcyB7XG5cdFx0XHRcdFx0XHRcdFx0W2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0aWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWU6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9IHwgc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQgPVxuXHRcdFx0XHRcdFx0XHRcdFx0ZW50cnlPYmplY3RbcGF0aFswXV07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHBhdGgubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3BlY2lmaWVkVGFyZ2V0ID0gZW50cnlPYmplY3RbcGF0aFswXV0gYXMgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNPYmplY3Qoc3BlY2lmaWVkVGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHRhcmdldFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShzcGVjaWZpZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlID0gc3BlY2lmaWVkVGFyZ2V0W3BhdGhbMV1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlWzBdKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLnNvbWUoKG10KSA9PiBtdC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgocXVlcnlMb3dlcikpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRgTWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIHNwZWNpZmllZCBhIHF1ZXJ5QWdhaW5zdCB0YXJnZXQgdGhhdCBpcyBhbiBhcnJheSBidXQgbm90IGFuIGFycmF5IG9mIHN0cmluZ3MuIE9ubHkgc3RyaW5nIHZhbHVlcyBhbmQgYXJyYXlzIGFyZSBzdXBwb3J0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzcGVjaWZpZWRUYXJnZXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpfWBcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJUaGUgbWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIGhhcyBhIHF1ZXJ5QWdhaW5zdCBlbnRyeSB0aGF0IGhhcyBhIGRlcHRoIGdyZWF0ZXIgdGhhbiAxLiBZb3UgY2FuIHNlYXJjaCBmb3IgZS5nLiBkYXRhLnRhZ3MgaWYgZGF0YSBoYXMgdGFncyBpbiBpdCBhbmQgaXQgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgdGFnRmlsdGVycyA9IEFycmF5LmlzQXJyYXkoZmlsdGVycylcblx0XHRcdFx0XHRcdD8gZmlsdGVycy5maWx0ZXIoKGYpID0+IGYuaWQgPT09IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTKVxuXHRcdFx0XHRcdFx0OiBbXTtcblx0XHRcdFx0XHRpZiAodGFnRmlsdGVycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaEZvdW5kID0gdGFnRmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIub3B0aW9ucy5ldmVyeShcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG9wdGlvbikgPT4gIW9wdGlvbi5pc1NlbGVjdGVkIHx8IGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMob3B0aW9uLnZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsdGVyLm9wdGlvbnMuaXNTZWxlY3RlZCAmJiAhaXNFbXB0eShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMoZmlsdGVyLm9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRleHRNYXRjaEZvdW5kICYmIEFycmF5LmlzQXJyYXkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0dGFncy5wdXNoKC4uLihlbnRyeS5kYXRhLmFwcC50YWdzIGFzIHN0cmluZ1tdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0ZXh0TWF0Y2hGb3VuZCAmJiBmaWx0ZXJNYXRjaEZvdW5kO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gZmluYWxSZXN1bHRzLm1hcCgoZW50cnkpID0+IGVudHJ5LmtleSk7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRyZXN1bHRzOiBmaW5hbFJlc3VsdHMsXG5cdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0ZmlsdGVyczogdGhpcy5nZXRTZWFyY2hGaWx0ZXJzKHRhZ3MuZmlsdGVyKEJvb2xlYW4pKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IFtdO1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXSxcblx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0ZmlsdGVyczogW11cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBzZWFyY2ggZmlsdGVycy5cblx0ICogQHBhcmFtIHRhZ3MgVGhlIHRhZ3MgdG8gY3JlYXRlIHRoZSBmaWx0ZXJzIGZyb20uXG5cdCAqIEByZXR1cm5zIFRoZSBmaWx0ZXJzLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRTZWFyY2hGaWx0ZXJzKHRhZ3M6IHN0cmluZ1tdKTogQ0xJRmlsdGVyW10ge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ3MpKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJzOiBDTElGaWx0ZXJbXSA9IFtdO1xuXHRcdFx0Y29uc3QgdW5pcXVlVGFncyA9IFsuLi5uZXcgU2V0KHRhZ3MpXS5zb3J0KCk7XG5cdFx0XHRjb25zdCB0YWdGaWx0ZXI6IENMSUZpbHRlciA9IHtcblx0XHRcdFx0aWQ6IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTLFxuXHRcdFx0XHR0aXRsZTogXCJUYWdzXCIsXG5cdFx0XHRcdHR5cGU6IFwiTXVsdGlTZWxlY3RcIiBhcyBDTElGaWx0ZXJPcHRpb25UeXBlLk11bHRpU2VsZWN0LFxuXHRcdFx0XHRvcHRpb25zOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChjb25zdCB0YWcgb2YgdW5pcXVlVGFncykge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdGaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHR0YWdGaWx0ZXIub3B0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdHZhbHVlOiB0YWcsXG5cdFx0XHRcdFx0XHRpc1NlbGVjdGVkOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZpbHRlcnMucHVzaCh0YWdGaWx0ZXIpO1xuXHRcdFx0cmV0dXJuIGZpbHRlcnM7XG5cdFx0fVxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXBzIHBsYXRmb3JtIGFwcHMgdG8gc2VhcmNoIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBhcHBzIFRoZSBhcHBzIHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzOiBQbGF0Zm9ybUFwcFtdKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRjb25zdCBhcHBSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSkge1xuXHRcdFx0Y29uc3QgdHlwZU1hcHBpbmcgPSB0aGlzLl9zZXR0aW5ncz8ubWFuaWZlc3RUeXBlTWFwcGluZztcblxuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBtYW5pZmVzdFR5cGUgPSBhcHAubWFuaWZlc3RUeXBlO1xuXHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShtYW5pZmVzdFR5cGUpKSB7XG5cdFx0XHRcdFx0Y29uc3QgYWN0aW9uID0geyBuYW1lOiBcIkxhdW5jaCBWaWV3XCIsIGhvdGtleTogXCJlbnRlclwiIH07XG5cdFx0XHRcdFx0Y29uc3QgZW50cnk6IFBhcnRpYWw8SG9tZVNlYXJjaFJlc3VsdD4gPSB7XG5cdFx0XHRcdFx0XHRrZXk6IGFwcC5hcHBJZCxcblx0XHRcdFx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gQXBwUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0XHRcdFx0XHRkYXRhOiB7IGFwcCwgcHJvdmlkZXJJZDogdGhpcy5fcHJvdmlkZXJJZCB9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmICghaXNFbXB0eSh0eXBlTWFwcGluZykpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hbmlmZXN0VHlwZU1hcHBpbmcgPSB0eXBlTWFwcGluZ1ttYW5pZmVzdFR5cGUgYXMgTWFuaWZlc3RUeXBlSWRdO1xuXG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkobWFuaWZlc3RUeXBlTWFwcGluZykpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsKSkge1xuXHRcdFx0XHRcdFx0XHRcdGVudHJ5LmxhYmVsID0gbWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb24ubmFtZSA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVudHJ5LmFjdGlvbnMgPSBbYWN0aW9uXTtcblx0XHRcdFx0XHRlbnRyeS5pY29uID0gdGhpcy5nZXRBcHBJY29uKGFwcCk7XG5cblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoYXBwLmRlc2NyaXB0aW9uKSkge1xuXHRcdFx0XHRcdFx0ZW50cnkuZGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHRcdFx0XHRlbnRyeS5zaG9ydERlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVudHJ5LnRlbXBsYXRlID0gXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b207XG5cdFx0XHRcdFx0ZW50cnkudGVtcGxhdGVDb250ZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQXBwKFxuXHRcdFx0XHRcdFx0YXBwLFxuXHRcdFx0XHRcdFx0ZW50cnkuaWNvbiA/PyBcIlwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uLm5hbWVcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0YXBwUmVzdWx0cy5wdXNoKGVudHJ5IGFzIEhvbWVTZWFyY2hSZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBSZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgaWNvbiBmb3IgYW4gYXBwbGljYXRpb24uXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIGdldCB0aGUgaWNvbiBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBpY29uLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjIGFzIHN0cmluZztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVidWlsZCB0aGUgcmVzdWx0cyBpZiB0aGUgdGhlbWUgY2hhbmdlcy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVidWlsZFJlc3VsdHMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheSh0aGlzLl9sYXN0UmVzdWx0SWRzKSAmJlxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5ICYmXG5cdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyAmJlxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCAmJlxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoICYmXG5cdFx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzXG5cdFx0KSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZWJ1aWxkaW5nIHJlc3VsdHMuLi5cIik7XG5cdFx0XHRjb25zdCBsYXN0UmVzdWx0SWRzID0gdGhpcy5fbGFzdFJlc3VsdElkcy5zbGljZSgpO1xuXHRcdFx0Y29uc3QgYXBwUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMoXG5cdFx0XHRcdHRoaXMuX2xhc3RRdWVyeSxcblx0XHRcdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMsXG5cdFx0XHRcdHsgcXVlcnlNaW5MZW5ndGg6IHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCwgcXVlcnlBZ2FpbnN0OiB0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0IH0sXG5cdFx0XHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgcmVtb3ZlUmVzdWx0SWRzID0gbGFzdFJlc3VsdElkcy5maWx0ZXIoKGlkKSA9PiAhdGhpcy5fbGFzdFJlc3VsdElkcz8uaW5jbHVkZXMoaWQpKTtcblx0XHRcdGlmIChyZW1vdmVSZXN1bHRJZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKC4uLnJlbW92ZVJlc3VsdElkcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChhcHBSZXNwb25zZS5yZXN1bHRzKTtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlc3VsdHMgcmVidWlsdC5cIik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogQXBwUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgQXBwUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==