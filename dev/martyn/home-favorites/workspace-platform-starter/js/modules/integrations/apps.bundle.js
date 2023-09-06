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
     * @param options.isSuggestion Is the query from a suggestion.
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
        if (result.action.trigger === "user-action") {
            if ((this._definition?.data?.favoritesEnabled ?? true) &&
                result.action.name.endsWith("favorite") &&
                result.data?.app) {
                if (this._integrationHelpers?.getFavoriteClient) {
                    const favClient = await this._integrationHelpers.getFavoriteClient();
                    if (favClient) {
                        const favInfo = favClient.getInfo();
                        if (favInfo) {
                            let favoriteId = result.data?.favouriteId;
                            if (result.action.name.startsWith("un")) {
                                if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favoriteId) && favClient.deleteSavedFavorite) {
                                    await favClient.deleteSavedFavorite(favoriteId);
                                    favoriteId = undefined;
                                }
                            }
                            else if (favClient.setSavedFavorite) {
                                favoriteId = (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
                                await favClient.setSavedFavorite({
                                    id: (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.randomUUID)(),
                                    type: "app",
                                    typeId: result.key,
                                    label: result.title,
                                    icon: result.icon
                                });
                            }
                            const colorScheme = (await this._integrationHelpers?.getCurrentColorSchemeMode()) ?? "dark";
                            if (this._lastQuery === favInfo.command && (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favoriteId)) {
                                lastResponse.revoke(result.key);
                            }
                            else {
                                const rebuilt = await this.mapAppEntryToSearchEntry(result.data.app, this._settings?.manifestTypeMapping, favInfo, favoriteId, colorScheme);
                                if (rebuilt) {
                                    lastResponse.respond([rebuilt]);
                                }
                            }
                            handled = true;
                        }
                    }
                }
            }
            else if (this._integrationHelpers?.launchApp) {
                const data = result.data;
                if (data?.app?.appId) {
                    handled = true;
                    await this._integrationHelpers.launchApp(data.app.appId);
                }
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
     * @param options.isSuggestion Is the query from a suggestion.
     * @param cachedApps The cached apps.
     * @returns The search response.
     */
    async getResults(queryLower, filters, options, cachedApps) {
        if (this._integrationHelpers?.getApps) {
            this._lastQuery = queryLower;
            this._lastQueryMinLength = options?.queryMinLength;
            this._lastQueryAgainst = options?.queryAgainst;
            this._lastCLIFilters = filters;
            let apps = cachedApps ?? (await this._integrationHelpers.getApps());
            let matchQuery = queryLower;
            if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers.getFavoriteClient) {
                const favClient = await this._integrationHelpers.getFavoriteClient();
                if (favClient) {
                    const info = favClient.getInfo();
                    if (info.isEnabled && (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(info.command)) {
                        const isSupported = (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(info.enabledTypes) || info.enabledTypes.includes("app");
                        if (isSupported && queryLower === info.command) {
                            const favoriteApps = await favClient.getSavedFavorites("app");
                            const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
                            apps = apps.filter((a) => favIds.includes(a.appId));
                            matchQuery = "";
                        }
                    }
                }
            }
            this._lastAppResults = apps;
            const appSearchEntries = await this.mapAppEntriesToSearchEntries(apps);
            const tags = [];
            if (appSearchEntries.length > 0) {
                const finalResults = appSearchEntries.filter((entry) => {
                    let textMatchFound = true;
                    let filterMatchFound = true;
                    const isCommand = matchQuery.startsWith("/");
                    if (matchQuery.length >= options.queryMinLength || isCommand) {
                        textMatchFound = options.queryAgainst.some((target) => {
                            const entryObject = entry;
                            const path = target.split(".");
                            if (path.length === 1) {
                                const targetValue = entryObject[path[0]];
                                if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(targetValue)) {
                                    const lowerTarget = targetValue.toLowerCase();
                                    if (isCommand) {
                                        return lowerTarget.startsWith(matchQuery);
                                    }
                                    return lowerTarget.includes(matchQuery);
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
                                            return lowerTarget.startsWith(matchQuery);
                                        }
                                        return lowerTarget.includes(matchQuery);
                                    }
                                    if (Array.isArray(targetValue)) {
                                        if (targetValue.length > 0 &&
                                            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(targetValue[0]) &&
                                            targetValue.some((mt) => mt.toLowerCase().startsWith(matchQuery))) {
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
            const uniqueTags = [...new Set(tags)].sort((a, b) => a.localeCompare(b));
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
            let favInfo;
            let favClient;
            let savedFavorites;
            const colorScheme = (await this._integrationHelpers?.getCurrentColorSchemeMode()) ?? "dark";
            if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers?.getFavoriteClient) {
                favClient = await this._integrationHelpers.getFavoriteClient();
                if (favClient) {
                    favInfo = favClient.getInfo();
                    if (favInfo.isEnabled) {
                        const isSupported = (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favInfo.enabledTypes) || favInfo.enabledTypes.includes("app");
                        if (isSupported) {
                            savedFavorites = await favClient.getSavedFavorites("app");
                        }
                        else {
                            favInfo = undefined;
                        }
                    }
                }
            }
            for (const app of apps) {
                const favoriteId = savedFavorites?.find((f) => f.typeId === app.appId)?.id;
                const res = await this.mapAppEntryToSearchEntry(app, this._settings?.manifestTypeMapping, favInfo, favoriteId, colorScheme);
                if (res) {
                    appResults.push(res);
                }
            }
        }
        return appResults;
    }
    /**
     * Map a single app to a search result.
     * @param app The app to map.
     * @param typeMapping The type mappings to include.
     * @param favInfo The favorites info if it is enabled.
     * @param favoriteId The id of the favorite.
     * @param colorScheme The color scheme.
     * @returns The search result.
     */
    async mapAppEntryToSearchEntry(app, typeMapping, favInfo, favoriteId, colorScheme) {
        const manifestType = app.manifestType;
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(manifestType)) {
            const action = { name: "Launch View", hotkey: "enter" };
            const entry = {
                key: app.appId,
                score: this._definition?.baseScore ?? AppProvider._DEFAULT_BASE_SCORE,
                title: app.title,
                data: { app, providerId: this._providerId, favoriteId }
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
            const headerButtons = [];
            if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
                const icon = (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon).replace("{scheme}", colorScheme);
                headerButtons.push({
                    icon,
                    action: !(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favoriteId) ? "unfavorite" : "favorite"
                });
            }
            entry.template = "Custom";
            entry.templateContent = await this._integrationHelpers?.templateHelpers.createApp(app, entry.icon ?? "", action.name, headerButtons);
            return entry;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7WUFDRixNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekYsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQzs7QUE3aUJEOzs7R0FHRztBQUNxQiwrQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFFaEQ7OztHQUdHO0FBQ3FCLDZCQUFpQixHQUFHLE1BQU0sQ0FBQzs7Ozs7OztTQ3ZDcEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040QztBQUVyQyxNQUFNLFdBQVcsR0FBa0M7SUFDekQsWUFBWSxFQUFFLElBQUkscURBQVcsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJRmlsdGVyT3B0aW9uVHlwZSxcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgTWFuaWZlc3RUeXBlSWQsIFBsYXRmb3JtQXBwIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEZhdm9yaXRlQ2xpZW50LFxuXHRGYXZvcml0ZUVudHJ5LFxuXHRGYXZvcml0ZUluZm9cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcsIEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYXBwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QXBwU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHVzZWQgdG8gZmlsdGVyIG91dCBieSB0YWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0hPTUVfVEFHX0ZJTFRFUlMgPSBcInRhZ3NcIjtcblxuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfcHJvdmlkZXJJZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogQXBwU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXNwb25zZT86IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgbWluIGxlbmd0aC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeU1pbkxlbmd0aD86IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeUFnYWluc3Q/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RDTElGaWx0ZXJzPzogQ0xJRmlsdGVyW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IGFwcCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEFwcFJlc3VsdHM/OiBQbGF0Zm9ybUFwcFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBsYXN0IHNldCBvZiByZXN1bHRzXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0SWRzPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcFByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3Byb3ZpZGVySWQgPSBkZWZpbml0aW9uLmlkO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwidGhlbWUtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIG9wdGlvbnMuaXNTdWdnZXN0aW9uIElzIHRoZSBxdWVyeSBmcm9tIGEgc3VnZ2VzdGlvbi5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0Y29uc3QgYXBwUmVzcG9uc2U6IEhvbWVTZWFyY2hSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhxdWVyeUxvd2VyLCBmaWx0ZXJzLCBvcHRpb25zKTtcblxuXHRcdHJldHVybiBhcHBSZXNwb25zZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0KHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmZhdm9yaXRlc0VuYWJsZWQgPz8gdHJ1ZSkgJiZcblx0XHRcdFx0cmVzdWx0LmFjdGlvbi5uYW1lLmVuZHNXaXRoKFwiZmF2b3JpdGVcIikgJiZcblx0XHRcdFx0cmVzdWx0LmRhdGE/LmFwcFxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgZmF2Q2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEZhdm9yaXRlQ2xpZW50KCk7XG5cdFx0XHRcdFx0aWYgKGZhdkNsaWVudCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2SW5mbyA9IGZhdkNsaWVudC5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRpZiAoZmF2SW5mbykge1xuXHRcdFx0XHRcdFx0XHRsZXQgZmF2b3JpdGVJZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gcmVzdWx0LmRhdGE/LmZhdm91cml0ZUlkO1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLnN0YXJ0c1dpdGgoXCJ1blwiKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShmYXZvcml0ZUlkKSAmJiBmYXZDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2Q2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUoZmF2b3JpdGVJZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRmYXZvcml0ZUlkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChmYXZDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZhdm9yaXRlSWQgPSByYW5kb21VVUlEKCk7XG5cdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2Q2xpZW50LnNldFNhdmVkRmF2b3JpdGUoe1xuXHRcdFx0XHRcdFx0XHRcdFx0aWQ6IHJhbmRvbVVVSUQoKSxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYXBwXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHJlc3VsdC5rZXksXG5cdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogcmVzdWx0LnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogcmVzdWx0Lmljb25cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjb25zdCBjb2xvclNjaGVtZSA9IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKSkgPz8gXCJkYXJrXCI7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuX2xhc3RRdWVyeSA9PT0gZmF2SW5mby5jb21tYW5kICYmIGlzRW1wdHkoZmF2b3JpdGVJZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXN0UmVzcG9uc2UucmV2b2tlKHJlc3VsdC5rZXkpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlYnVpbHQgPSBhd2FpdCB0aGlzLm1hcEFwcEVudHJ5VG9TZWFyY2hFbnRyeShcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5kYXRhLmFwcCxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5tYW5pZmVzdFR5cGVNYXBwaW5nLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZmF2SW5mbyxcblx0XHRcdFx0XHRcdFx0XHRcdGZhdm9yaXRlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAocmVidWlsdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGFzdFJlc3BvbnNlLnJlc3BvbmQoW3JlYnVpbHRdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8ubGF1bmNoQXBwKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0XHRhcHA6IHsgYXBwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRcdGlmIChkYXRhPy5hcHA/LmFwcElkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaEFwcChkYXRhLmFwcC5hcHBJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHJlc3VsdHMgZm9yIHRoZSBhcHBzLlxuXHQgKiBAcGFyYW0gcXVlcnlMb3dlciBUaGUgcXVlcnkuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcXVlcnkgb3B0aW9ucy5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5pc1N1Z2dlc3Rpb24gSXMgdGhlIHF1ZXJ5IGZyb20gYSBzdWdnZXN0aW9uLlxuXHQgKiBAcGFyYW0gY2FjaGVkQXBwcyBUaGUgY2FjaGVkIGFwcHMuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldFJlc3VsdHMoXG5cdFx0cXVlcnlMb3dlcjogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9LFxuXHRcdGNhY2hlZEFwcHM/OiBQbGF0Zm9ybUFwcFtdXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0QXBwcykge1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnM/LnF1ZXJ5TWluTGVuZ3RoO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCA9IG9wdGlvbnM/LnF1ZXJ5QWdhaW5zdDtcblx0XHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzID0gZmlsdGVycztcblxuXHRcdFx0bGV0IGFwcHM6IFBsYXRmb3JtQXBwW10gPSBjYWNoZWRBcHBzID8/IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0QXBwcygpKTtcblx0XHRcdGxldCBtYXRjaFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblxuXHRcdFx0aWYgKCh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5mYXZvcml0ZXNFbmFibGVkID8/IHRydWUpICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRjb25zdCBmYXZDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0RmF2b3JpdGVDbGllbnQoKTtcblx0XHRcdFx0aWYgKGZhdkNsaWVudCkge1xuXHRcdFx0XHRcdGNvbnN0IGluZm8gPSBmYXZDbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdGlmIChpbmZvLmlzRW5hYmxlZCAmJiBpc1N0cmluZ1ZhbHVlKGluZm8uY29tbWFuZCkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGlzU3VwcG9ydGVkID0gaXNFbXB0eShpbmZvLmVuYWJsZWRUeXBlcykgfHwgaW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoXCJhcHBcIik7XG5cdFx0XHRcdFx0XHRpZiAoaXNTdXBwb3J0ZWQgJiYgcXVlcnlMb3dlciA9PT0gaW5mby5jb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGZhdm9yaXRlQXBwcyA9IGF3YWl0IGZhdkNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhcImFwcFwiKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZmF2SWRzID0gZmF2b3JpdGVBcHBzPy5tYXAoKGYpID0+IGYudHlwZUlkKSA/PyBbXTtcblx0XHRcdFx0XHRcdFx0YXBwcyA9IGFwcHMuZmlsdGVyKChhKSA9PiBmYXZJZHMuaW5jbHVkZXMoYS5hcHBJZCkpO1xuXHRcdFx0XHRcdFx0XHRtYXRjaFF1ZXJ5ID0gXCJcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMgPSBhcHBzO1xuXHRcdFx0Y29uc3QgYXBwU2VhcmNoRW50cmllcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzKTtcblxuXHRcdFx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBbXTtcblxuXHRcdFx0aWYgKGFwcFNlYXJjaEVudHJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBmaW5hbFJlc3VsdHMgPSBhcHBTZWFyY2hFbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IHtcblx0XHRcdFx0XHRsZXQgdGV4dE1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdGxldCBmaWx0ZXJNYXRjaEZvdW5kID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGNvbnN0IGlzQ29tbWFuZCA9IG1hdGNoUXVlcnkuc3RhcnRzV2l0aChcIi9cIik7XG5cblx0XHRcdFx0XHRpZiAobWF0Y2hRdWVyeS5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCB8fCBpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdHRleHRNYXRjaEZvdW5kID0gb3B0aW9ucy5xdWVyeUFnYWluc3Quc29tZSgodGFyZ2V0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVudHJ5T2JqZWN0ID0gZW50cnkgYXMgdW5rbm93biBhcyB7XG5cdFx0XHRcdFx0XHRcdFx0W2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0aWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWU6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9IHwgc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQgPVxuXHRcdFx0XHRcdFx0XHRcdFx0ZW50cnlPYmplY3RbcGF0aFswXV07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHBhdGgubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3BlY2lmaWVkVGFyZ2V0ID0gZW50cnlPYmplY3RbcGF0aFswXV0gYXMgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNPYmplY3Qoc3BlY2lmaWVkVGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHRhcmdldFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShzcGVjaWZpZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlID0gc3BlY2lmaWVkVGFyZ2V0W3BhdGhbMV1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKG1hdGNoUXVlcnkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlWzBdKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLnNvbWUoKG10KSA9PiBtdC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRgTWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIHNwZWNpZmllZCBhIHF1ZXJ5QWdhaW5zdCB0YXJnZXQgdGhhdCBpcyBhbiBhcnJheSBidXQgbm90IGFuIGFycmF5IG9mIHN0cmluZ3MuIE9ubHkgc3RyaW5nIHZhbHVlcyBhbmQgYXJyYXlzIGFyZSBzdXBwb3J0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzcGVjaWZpZWRUYXJnZXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpfWBcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJUaGUgbWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIGhhcyBhIHF1ZXJ5QWdhaW5zdCBlbnRyeSB0aGF0IGhhcyBhIGRlcHRoIGdyZWF0ZXIgdGhhbiAxLiBZb3UgY2FuIHNlYXJjaCBmb3IgZS5nLiBkYXRhLnRhZ3MgaWYgZGF0YSBoYXMgdGFncyBpbiBpdCBhbmQgaXQgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgdGFnRmlsdGVycyA9IEFycmF5LmlzQXJyYXkoZmlsdGVycylcblx0XHRcdFx0XHRcdD8gZmlsdGVycy5maWx0ZXIoKGYpID0+IGYuaWQgPT09IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTKVxuXHRcdFx0XHRcdFx0OiBbXTtcblx0XHRcdFx0XHRpZiAodGFnRmlsdGVycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaEZvdW5kID0gdGFnRmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIub3B0aW9ucy5ldmVyeShcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG9wdGlvbikgPT4gIW9wdGlvbi5pc1NlbGVjdGVkIHx8IGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMob3B0aW9uLnZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsdGVyLm9wdGlvbnMuaXNTZWxlY3RlZCAmJiAhaXNFbXB0eShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMoZmlsdGVyLm9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRleHRNYXRjaEZvdW5kICYmIEFycmF5LmlzQXJyYXkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0dGFncy5wdXNoKC4uLihlbnRyeS5kYXRhLmFwcC50YWdzIGFzIHN0cmluZ1tdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0ZXh0TWF0Y2hGb3VuZCAmJiBmaWx0ZXJNYXRjaEZvdW5kO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gZmluYWxSZXN1bHRzLm1hcCgoZW50cnkpID0+IGVudHJ5LmtleSk7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRyZXN1bHRzOiBmaW5hbFJlc3VsdHMsXG5cdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0ZmlsdGVyczogdGhpcy5nZXRTZWFyY2hGaWx0ZXJzKHRhZ3MuZmlsdGVyKEJvb2xlYW4pKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IFtdO1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXSxcblx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0ZmlsdGVyczogW11cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBzZWFyY2ggZmlsdGVycy5cblx0ICogQHBhcmFtIHRhZ3MgVGhlIHRhZ3MgdG8gY3JlYXRlIHRoZSBmaWx0ZXJzIGZyb20uXG5cdCAqIEByZXR1cm5zIFRoZSBmaWx0ZXJzLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRTZWFyY2hGaWx0ZXJzKHRhZ3M6IHN0cmluZ1tdKTogQ0xJRmlsdGVyW10ge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ3MpKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJzOiBDTElGaWx0ZXJbXSA9IFtdO1xuXHRcdFx0Y29uc3QgdW5pcXVlVGFncyA9IFsuLi5uZXcgU2V0KHRhZ3MpXS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuXHRcdFx0Y29uc3QgdGFnRmlsdGVyOiBDTElGaWx0ZXIgPSB7XG5cdFx0XHRcdGlkOiBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUyxcblx0XHRcdFx0dGl0bGU6IFwiVGFnc1wiLFxuXHRcdFx0XHR0eXBlOiBcIk11bHRpU2VsZWN0XCIgYXMgQ0xJRmlsdGVyT3B0aW9uVHlwZS5NdWx0aVNlbGVjdCxcblx0XHRcdFx0b3B0aW9uczogW11cblx0XHRcdH07XG5cblx0XHRcdGZvciAoY29uc3QgdGFnIG9mIHVuaXF1ZVRhZ3MpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFnRmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0dGFnRmlsdGVyLm9wdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdGFnLFxuXHRcdFx0XHRcdFx0aXNTZWxlY3RlZDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmaWx0ZXJzLnB1c2godGFnRmlsdGVyKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogTWFwcyBwbGF0Zm9ybSBhcHBzIHRvIHNlYXJjaCByZXN1bHRzLlxuXHQgKiBAcGFyYW0gYXBwcyBUaGUgYXBwcyB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwczogUGxhdGZvcm1BcHBbXSk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgYXBwUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykpIHtcblx0XHRcdGxldCBmYXZJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgZmF2Q2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblx0XHRcdGxldCBzYXZlZEZhdm9yaXRlczogRmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3QgY29sb3JTY2hlbWUgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCkpID8/IFwiZGFya1wiO1xuXG5cdFx0XHRpZiAoKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmZhdm9yaXRlc0VuYWJsZWQgPz8gdHJ1ZSkgJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRGYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRmYXZDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0RmF2b3JpdGVDbGllbnQoKTtcblx0XHRcdFx0aWYgKGZhdkNsaWVudCkge1xuXHRcdFx0XHRcdGZhdkluZm8gPSBmYXZDbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdGlmIChmYXZJbmZvLmlzRW5hYmxlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNTdXBwb3J0ZWQgPSBpc0VtcHR5KGZhdkluZm8uZW5hYmxlZFR5cGVzKSB8fCBmYXZJbmZvLmVuYWJsZWRUeXBlcy5pbmNsdWRlcyhcImFwcFwiKTtcblx0XHRcdFx0XHRcdGlmIChpc1N1cHBvcnRlZCkge1xuXHRcdFx0XHRcdFx0XHRzYXZlZEZhdm9yaXRlcyA9IGF3YWl0IGZhdkNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhcImFwcFwiKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZhdkluZm8gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVJZCA9IHNhdmVkRmF2b3JpdGVzPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gYXBwLmFwcElkKT8uaWQ7XG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdFx0XHRcdGFwcCxcblx0XHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8ubWFuaWZlc3RUeXBlTWFwcGluZyxcblx0XHRcdFx0XHRmYXZJbmZvLFxuXHRcdFx0XHRcdGZhdm9yaXRlSWQsXG5cdFx0XHRcdFx0Y29sb3JTY2hlbWVcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHJlcykge1xuXHRcdFx0XHRcdGFwcFJlc3VsdHMucHVzaChyZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBSZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcCBhIHNpbmdsZSBhcHAgdG8gYSBzZWFyY2ggcmVzdWx0LlxuXHQgKiBAcGFyYW0gYXBwIFRoZSBhcHAgdG8gbWFwLlxuXHQgKiBAcGFyYW0gdHlwZU1hcHBpbmcgVGhlIHR5cGUgbWFwcGluZ3MgdG8gaW5jbHVkZS5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBjb2xvclNjaGVtZSBUaGUgY29sb3Igc2NoZW1lLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdGFwcDogUGxhdGZvcm1BcHAsXG5cdFx0dHlwZU1hcHBpbmc6IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcgfCB1bmRlZmluZWQsXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0XHRjb2xvclNjaGVtZTogc3RyaW5nXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdCB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IG1hbmlmZXN0VHlwZSA9IGFwcC5tYW5pZmVzdFR5cGU7XG5cdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlKSkge1xuXHRcdFx0Y29uc3QgYWN0aW9uID0geyBuYW1lOiBcIkxhdW5jaCBWaWV3XCIsIGhvdGtleTogXCJlbnRlclwiIH07XG5cdFx0XHRjb25zdCBlbnRyeTogUGFydGlhbDxIb21lU2VhcmNoUmVzdWx0PiA9IHtcblx0XHRcdFx0a2V5OiBhcHAuYXBwSWQsXG5cdFx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gQXBwUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGU6IGFwcC50aXRsZSxcblx0XHRcdFx0ZGF0YTogeyBhcHAsIHByb3ZpZGVySWQ6IHRoaXMuX3Byb3ZpZGVySWQsIGZhdm9yaXRlSWQgfVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KHR5cGVNYXBwaW5nKSkge1xuXHRcdFx0XHRjb25zdCBtYW5pZmVzdFR5cGVNYXBwaW5nID0gdHlwZU1hcHBpbmdbbWFuaWZlc3RUeXBlIGFzIE1hbmlmZXN0VHlwZUlkXTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobWFuaWZlc3RUeXBlTWFwcGluZykpIHtcblx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwpKSB7XG5cdFx0XHRcdFx0XHRlbnRyeS5sYWJlbCA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lKSkge1xuXHRcdFx0XHRcdFx0YWN0aW9uLm5hbWUgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGVudHJ5LmFjdGlvbnMgPSBbYWN0aW9uXTtcblx0XHRcdGVudHJ5Lmljb24gPSB0aGlzLmdldEFwcEljb24oYXBwKTtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcC5kZXNjcmlwdGlvbikpIHtcblx0XHRcdFx0ZW50cnkuZGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHRcdGVudHJ5LnNob3J0RGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGhlYWRlckJ1dHRvbnM6IHsgaWNvbjogc3RyaW5nOyBhY3Rpb246IHN0cmluZyB9W10gPSBbXTtcblxuXHRcdFx0aWYgKGZhdkluZm8/LmZhdm9yaXRlSWNvbiAmJiBmYXZJbmZvLnVuZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdGNvbnN0IGljb24gPSAoIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBmYXZJbmZvLmZhdm9yaXRlSWNvbiA6IGZhdkluZm8udW5mYXZvcml0ZUljb24pLnJlcGxhY2UoXG5cdFx0XHRcdFx0XCJ7c2NoZW1lfVwiLFxuXHRcdFx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGhlYWRlckJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0aWNvbixcblx0XHRcdFx0XHRhY3Rpb246ICFpc0VtcHR5KGZhdm9yaXRlSWQpID8gXCJ1bmZhdm9yaXRlXCIgOiBcImZhdm9yaXRlXCJcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGVudHJ5LnRlbXBsYXRlID0gXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b207XG5cdFx0XHRlbnRyeS50ZW1wbGF0ZUNvbnRlbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnRlbXBsYXRlSGVscGVycy5jcmVhdGVBcHAoXG5cdFx0XHRcdGFwcCxcblx0XHRcdFx0ZW50cnkuaWNvbiA/PyBcIlwiLFxuXHRcdFx0XHRhY3Rpb24ubmFtZSxcblx0XHRcdFx0aGVhZGVyQnV0dG9uc1xuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIGVudHJ5IGFzIEhvbWVTZWFyY2hSZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgaWNvbiBmb3IgYW4gYXBwbGljYXRpb24uXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIGdldCB0aGUgaWNvbiBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBpY29uLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGlmIHRoZSB0aGVtZSBjaGFuZ2VzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoaXMuX2xhc3RSZXN1bHRJZHMpICYmXG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgJiZcblx0XHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzICYmXG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0ICYmXG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggJiZcblx0XHRcdHRoaXMuX2xhc3RSZXN1bHRJZHNcblx0XHQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlYnVpbGRpbmcgcmVzdWx0cy4uLlwiKTtcblx0XHRcdGNvbnN0IGxhc3RSZXN1bHRJZHMgPSB0aGlzLl9sYXN0UmVzdWx0SWRzLnNsaWNlKCk7XG5cdFx0XHRjb25zdCBhcHBSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyxcblx0XHRcdFx0eyBxdWVyeU1pbkxlbmd0aDogdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBxdWVyeUFnYWluc3Q6IHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgfSxcblx0XHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHNcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByZW1vdmVSZXN1bHRJZHMgPSBsYXN0UmVzdWx0SWRzLmZpbHRlcigoaWQpID0+ICF0aGlzLl9sYXN0UmVzdWx0SWRzPy5pbmNsdWRlcyhpZCkpO1xuXHRcdFx0aWYgKHJlbW92ZVJlc3VsdElkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoLi4ucmVtb3ZlUmVzdWx0SWRzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKGFwcFJlc3BvbnNlLnJlc3VsdHMpO1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmVzdWx0cyByZWJ1aWx0LlwiKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQXBwUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBBcHBQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBcHBQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9