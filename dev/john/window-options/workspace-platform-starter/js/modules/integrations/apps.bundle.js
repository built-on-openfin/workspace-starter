/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/shapes/favorite-shapes.ts":
/*!********************************************************!*\
  !*** ./client/src/framework/shapes/favorite-shapes.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FAVORITE_TYPE_NAME_APP: () => (/* binding */ FAVORITE_TYPE_NAME_APP),
/* harmony export */   FAVORITE_TYPE_NAME_PAGE: () => (/* binding */ FAVORITE_TYPE_NAME_PAGE),
/* harmony export */   FAVORITE_TYPE_NAME_QUERY: () => (/* binding */ FAVORITE_TYPE_NAME_QUERY),
/* harmony export */   FAVORITE_TYPE_NAME_WORKSPACE: () => (/* binding */ FAVORITE_TYPE_NAME_WORKSPACE)
/* harmony export */ });
/**
 * Favorite type for App.
 */
const FAVORITE_TYPE_NAME_APP = "app";
/**
 * Favorite type for Workspace.
 */
const FAVORITE_TYPE_NAME_WORKSPACE = "workspace";
/**
 * Favorite type for Page.
 */
const FAVORITE_TYPE_NAME_PAGE = "page";
/**
 * Favorite type for Query.
 */
const FAVORITE_TYPE_NAME_QUERY = "query";


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
/* harmony import */ var workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/favorite-shapes */ "./client/src/framework/shapes/favorite-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


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
            this._themeChangedSubscriptionId = this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
                await this.rebuildResults();
            });
            this._favChangedSubscriptionId =
                this._integrationHelpers.subscribeLifecycleEvent("favorite-changed", async (_, payload) => {
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payload)) {
                        await this.updateAppFavoriteButtons(payload);
                    }
                });
        }
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        if (this._integrationHelpers?.unsubscribeLifecycleEvent) {
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(this._themeChangedSubscriptionId)) {
                this._integrationHelpers.unsubscribeLifecycleEvent(this._themeChangedSubscriptionId, "theme-changed");
                this._themeChangedSubscriptionId = undefined;
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(this._favChangedSubscriptionId)) {
                this._integrationHelpers.unsubscribeLifecycleEvent(this._favChangedSubscriptionId, "favorite-changed");
                this._favChangedSubscriptionId = undefined;
            }
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
            if (result.action.name.endsWith("favorite") && result.data?.app) {
                const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
                if (favoriteClient) {
                    if (result.action.name.startsWith("un")) {
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(result.data?.favoriteId) && favoriteClient.deleteSavedFavorite) {
                            await favoriteClient.deleteSavedFavorite(result.data.favoriteId);
                        }
                    }
                    else if (favoriteClient.setSavedFavorite) {
                        await favoriteClient.setSavedFavorite({
                            id: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.randomUUID)(),
                            type: workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP,
                            typeId: result.key,
                            label: result.title,
                            icon: result.icon
                        });
                    }
                    handled = true;
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
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
            if (favoriteInfo?.isEnabled &&
                (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(favoriteInfo?.command) &&
                queryLower === favoriteInfo.command &&
                favoriteClient) {
                const favoriteApps = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
                const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
                apps = apps.filter((a) => favIds.includes(a.appId));
                matchQuery = "";
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
                                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(targetValue)) {
                                    const lowerTarget = targetValue.toLowerCase();
                                    if (isCommand) {
                                        return lowerTarget.startsWith(matchQuery);
                                    }
                                    return lowerTarget.includes(matchQuery);
                                }
                            }
                            else if (path.length === 2) {
                                const specifiedTarget = entryObject[path[0]];
                                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isObject)(specifiedTarget)) {
                                    let targetValue;
                                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(specifiedTarget)) {
                                        targetValue = specifiedTarget[path[1]];
                                    }
                                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(targetValue)) {
                                        const lowerTarget = targetValue.toLowerCase();
                                        if (isCommand) {
                                            return lowerTarget.startsWith(matchQuery);
                                        }
                                        return lowerTarget.includes(matchQuery);
                                    }
                                    if (Array.isArray(targetValue)) {
                                        if (targetValue.length > 0 &&
                                            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(targetValue[0]) &&
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
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entry.data?.app?.tags)) {
                                    return filter.options.every((option) => !option.isSelected || entry.data.app.tags.includes(option.value));
                                }
                            }
                            else if (filter.options.isSelected && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entry.data?.app?.tags)) {
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
        if (Array.isArray(apps) && this._integrationHelpers) {
            let savedFavorites;
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
            if (favoriteClient) {
                savedFavorites = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
            }
            for (const app of apps) {
                const favoriteId = savedFavorites?.find((f) => f.typeId === app.appId)?.id;
                const res = await this.mapAppEntryToSearchEntry(app, this._settings?.manifestTypeMapping, favoriteInfo, favoriteId);
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
     * @returns The search result.
     */
    async mapAppEntryToSearchEntry(app, typeMapping, favInfo, favoriteId) {
        const manifestType = app.manifestType;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(manifestType)) {
            const action = { name: "Launch View", hotkey: "enter" };
            const entry = {
                key: app.appId,
                score: this._definition?.baseScore ?? AppProvider._DEFAULT_BASE_SCORE,
                title: app.title,
                data: { app, providerId: this._providerId, favoriteId }
            };
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(typeMapping)) {
                const manifestTypeMapping = typeMapping[manifestType];
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(manifestTypeMapping)) {
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(manifestTypeMapping.entryLabel)) {
                        entry.label = manifestTypeMapping.entryLabel;
                    }
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(manifestTypeMapping.actionName)) {
                        action.name = manifestTypeMapping.actionName;
                    }
                }
            }
            entry.actions = [action];
            entry.icon = this.getAppIcon(app);
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(app.description)) {
                entry.description = app.description;
                entry.shortDescription = app.description;
            }
            const headerButtons = [];
            if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon && this._integrationHelpers) {
                const themeClient = await this._integrationHelpers.getThemeClient();
                const favoriteIcon = await themeClient.themeUrl(!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon);
                if (favoriteIcon) {
                    headerButtons.push({
                        icon: favoriteIcon,
                        action: !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteId) ? "unfavorite" : "favorite"
                    });
                }
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
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastResponse) &&
            Array.isArray(this._lastResultIds) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQuery) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastCLIFilters) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQueryAgainst) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQueryMinLength) &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastResultIds)) {
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
    /**
     * Update the app buttons if the favorites have changed.
     * @param payload The payload of the favorite change.
     */
    async updateAppFavoriteButtons(payload) {
        const favorite = payload.favorite;
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastResponse) &&
            (payload.action === "set" || payload.action === "delete") &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favorite) &&
            favorite.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP &&
            this._lastAppResults &&
            this._integrationHelpers) {
            const { favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_APP);
            if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
                this._lastResponse.revoke(favorite.typeId);
            }
            else if (this._lastAppResults) {
                let lastApp = this._lastAppResults.find((a) => a.appId === favorite.typeId);
                // If it wasn't in the last results add it, but only if we are in fav command
                if (!lastApp && this._integrationHelpers?.getApp && this._lastQuery === favoriteInfo?.command) {
                    lastApp = await this._integrationHelpers.getApp(favorite.typeId);
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(lastApp)) {
                    const rebuilt = await this.mapAppEntryToSearchEntry(lastApp, this._settings?.manifestTypeMapping, favoriteInfo, payload.action === "set" ? favorite.id : undefined);
                    if (rebuilt) {
                        this._lastResponse.respond([rebuilt]);
                    }
                }
            }
        }
    }
    /**
     * Get the favorite info and client if they are enabled.
     * @param favoriteTypeNames The type of client to get.
     * @returns The favorite info and client.
     */
    async getFavInfo(favoriteTypeNames) {
        let favoriteInfo;
        let favoriteClient;
        if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers?.getFavoriteClient) {
            favoriteClient = await this._integrationHelpers.getFavoriteClient();
            if (favoriteClient) {
                favoriteInfo = favoriteClient.getInfo();
                if (favoriteInfo.isEnabled) {
                    const isSupported = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteInfo.enabledTypes) || favoriteInfo.enabledTypes.includes(favoriteTypeNames);
                    if (!isSupported) {
                        favoriteInfo = undefined;
                        favoriteClient = undefined;
                    }
                }
            }
        }
        return {
            favoriteClient,
            favoriteInfo
        };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Q7UUFFRCxPQUFPO1lBQ04sY0FBYztZQUNkLFlBQVk7U0FDWixDQUFDO0lBQ0gsQ0FBQzs7QUF6bkJEOzs7R0FHRztBQUNxQiwrQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFFaEQ7OztHQUdHO0FBQ3FCLDZCQUFpQixHQUFHLE1BQU0sQ0FBQzs7Ozs7OztTQzFDcEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040QztBQUVyQyxNQUFNLFdBQVcsR0FBa0M7SUFDekQsWUFBWSxFQUFFLElBQUkscURBQVcsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zaGFwZXNcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBBcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfQVBQID0gXCJhcHBcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBXb3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFID0gXCJ3b3Jrc3BhY2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBQYWdlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UgPSBcInBhZ2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBRdWVyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWSA9IFwicXVlcnlcIjtcblxuLyoqXG4gKiBOYW1lcyBmb3IgYWxsIHRoZSBmYXZvcml0ZSB0eXBlcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmF2b3JpdGVUeXBlTmFtZXMgPVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfQVBQXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSBmYXZvcml0ZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVByb3ZpZGVyT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJcyB0aGUgcHJvdmlkZXIgZW5hYmxlZCwgZGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGVuYWJsZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoaXMgaXMgYSBmYXZvcml0ZSBhY3Rpb25cblx0ICovXG5cdGZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0byB1c2UgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIGZhdm9yaXRlIGNhbiBiZSB1bnNldFxuXHQgKi9cblx0dW5mYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCBjb21tYW5kcyBzaG91bGQgaW50ZWdyYXRpb25zIGNoZWNrIGZvciBpZiB0aGV5IGludGVudCB0byBzdXBwb3J0IHRoZSBkaXNwbGF5IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0ZmF2b3JpdGVDb21tYW5kPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29ubmVjdGlvbiBwcm92aWRlciBjYW4gaGF2ZSBhY3Rpb25zIHJlZ2lzdGVyZWQgYWdhaW5zdCBpdCBmcm9tIHRoZSBwbGF0Zm9ybS4gVGhpcyBwcm92aWRlcyBhIGRlZmF1bHQgbGlzdCBvZlxuXHQgKiBhY3Rpb25zIHRoYXQgY29ubmVjdGlvbnMgc2hvdWxkIGJlIGFibGUgdG8gdXNlIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWQgZm9yIHRoYXQgY29ubmVjdGlvbi5cblx0ICovXG5cdHN1cHBvcnRlZEZhdm9yaXRlVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xufVxuXG4vKipcbiAqIFdoZW4gYW4gZW50cnkgaXMgbWFkZSBpdCByZXByZXNlbnRzIGEgdHlwZSBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybS4gVGhpcyBjYW4gYmUgdXNlZCB0byBsb29rdXAgYW5kIGxhdW5jaCB0aGUgdGhpbmcgdGhpcyBlbnRyeSByZWZlcnMgdG8uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBndWlkIHRvIHJlcHJlc2VudCB0aGlzIGZhdm9yaXRlIGVudHJ5IHNvIHRoYXQgaXQgY2FuIGJlIHVwZGF0ZWQgb3IgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZmF2b3JpdGUgdHlwZSB0aGlzIGVudHJ5IHJlcHJlc2VudHNcblx0ICovXG5cdHR5cGVJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IHR5cGUgb2YgZmF2b3JpdGUgZW50cnkgZG9lcyB0aGlzIGVudHJ5IHJlcHJlc2VudFxuXHQgKi9cblx0dHlwZTogRmF2b3JpdGVUeXBlTmFtZXM7XG5cblx0LyoqXG5cdCAqIFRoZSB0aW1lc3RhbXAgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdHRpbWVzdGFtcD86IERhdGU7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGxhYmVsIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGxhYmVsPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGljb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW5mbyB0byByZXR1cm4gdG8gaW50ZXJlc3RlZCBwYXJ0aWVzIHRvIGhlbHAgdGhlbSBzdXBwb3J0IGZhdm9yaXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlSW5mbyB7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gZmF2b3JpdGVcblx0ICovXG5cdGZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byByZW1vdmUgdGhpcyBmYXZvcml0ZVxuXHQgKi9cblx0dW5mYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBIGNvbW1hbmQgdGhhdCBzdXBwb3J0aW5nIG1vZHVsZXMgc2hvdWxkIGxpc3RlbiBmb3IgaWYgdGhleSBhcmUgdG8gZGlzcGxheSBmYXZvcml0ZXMgdGhhdCBmYWxsIHVuZGVyIHRoZW1cblx0ICovXG5cdGNvbW1hbmQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGF0IHR5cGVzIG9mIGZhdm9yaXRlIGl0ZW0gYXJlIHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLCB0aGlzIGFsc28gZGV0ZXJtaW5lcyB0aGUgb3JkZXJpbmcgaW4gdGhlIGRvY2sgbWVudS5cblx0ICovXG5cdGVuYWJsZWRUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG5cdC8qKlxuXHQgKiBJcyBmYXZvcml0ZSBzdXBwb3J0IGVuYWJsZWQgb24gdGhpcyBwbGF0Zm9ybS5cblx0ICovXG5cdGlzRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNsaWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHNvbWUgb3IgYWxsIG9mIHRoZSBmYXZvcml0ZSBmdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVDbGllbnQge1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uIGFib3V0IHdoZXRoZXIgZmF2b3JpdGVzIGFyZSBpbml0aWFsaXplZCBmb3IgdGhlIHBsYXRmb3JtIGFuZCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyBTdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0Z2V0SW5mbygpOiBGYXZvcml0ZUluZm87XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGFsbCAob3Igc29tZSBpZiBieSB0eXBlKSBvZiB0aGUgc2F2ZWQgZmF2b3JpdGVzXG5cdCAqIEBwYXJhbSBieVR5cGUgdGhlIHR5cGUgb2Ygc2F2ZWQgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzYXZlZCBmYXZvcml0ZXMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgaXQgd2FzIHVuYWJsZSB0byBnZXQgYW55IGJhY2tcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGVzKGJ5VHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhIHBhcnRpY3VsYXIgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgdGhlIHNhdmVkIGZhdm9yaXRlIGlmIGF2YWlsYWJsZSBvciBmYWxzZSBpZiBpdCBkaWRuJ3QgZXhpc3Rcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byBzYXZlIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZSB0aGUgRmF2b3JpdGUgeW91IHdpc2ggdG8gc2F2ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIHNhdmVkXG5cdCAqL1xuXHRzZXRTYXZlZEZhdm9yaXRlPyhmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZW1vdmUvZGVsZXRlIGEgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlIHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIGRlbGV0ZWQuXG5cdCAqL1xuXHRkZWxldGVTYXZlZEZhdm9yaXRlPyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmF2b3JpdGUgYW5kIG1ldGEgZGF0YSByZWxhdGVkIHRvIGl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHBsYXRmb3JtIHByb3ZpZGluZyB0aGUgcGF5bG9hZC5cblx0ICovXG5cdG1ldGFEYXRhOiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTtcblx0LyoqXG5cdCAqIFRoZSBmYXZvcml0ZSBlbnRyeVxuXHQgKi9cblx0cGF5bG9hZDogRmF2b3JpdGVFbnRyeTtcbn1cblxuLyoqXG4gKiBBIHJlcXVlc3QgdHlwZSBmb3IgdGhlIEZhdm9yaXRlRW5kcG9pbnQgdGhhdCBnZXRzIGFsbCBzYXZlZCBmYXZvcml0ZSBlbnRyaWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHR5cGUgaWYgc3BlY2lmaWVkIHNob3VsZCBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzcG9uc2UgdG8gb25seSBzZW5kIHRoZSBlbnRyaWVzIHRoYXQgYXJlIHJlbGV2YW50XG5cdCAqL1xuXHRmYXZvcml0ZVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlcyB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSB7XG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiBmYXZvcml0ZSBlbnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb2Ygd2hhdCBwbGF0Zm9ybSB2ZXJzaW9ucyB0aGV5IHdlcmUgb3JpZ2luYWxseSBzYXZlZCBhZ2FpbnN0XG5cdCAqL1xuXHRlbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXTtcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaGFzIGJlZW4gc2F2ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBhIHNwZWNpZmljIGZhdm9yaXRlIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IHR5cGUgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlID0gRW5kcG9pbnRGYXZvcml0ZUVudHJ5O1xuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCBleHRlbmRzIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSBzZXRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIHJlbW92aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSUZpbHRlck9wdGlvblR5cGUsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IE1hbmlmZXN0VHlwZUlkLCBQbGF0Zm9ybUFwcCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX0FQUCxcblx0dHlwZSBGYXZvcml0ZUNsaWVudCxcblx0dHlwZSBGYXZvcml0ZUVudHJ5LFxuXHR0eXBlIEZhdm9yaXRlSW5mbyxcblx0dHlwZSBGYXZvcml0ZVR5cGVOYW1lc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzT2JqZWN0LCBpc1N0cmluZ1ZhbHVlLCByYW5kb21VVUlEIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcsIEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYXBwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QXBwU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHVzZWQgdG8gZmlsdGVyIG91dCBieSB0YWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0hPTUVfVEFHX0ZJTFRFUlMgPSBcInRhZ3NcIjtcblxuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfcHJvdmlkZXJJZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogQXBwU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXNwb25zZT86IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgbWluIGxlbmd0aC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeU1pbkxlbmd0aD86IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeUFnYWluc3Q/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RDTElGaWx0ZXJzPzogQ0xJRmlsdGVyW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IGFwcCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEFwcFJlc3VsdHM/OiBQbGF0Zm9ybUFwcFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBsYXN0IHNldCBvZiByZXN1bHRzXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0SWRzPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgdGhlbWUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBTdWJzY3JpcHRpb24gaWQgZm9yIGZhdm9yaXRlLWNoYW5nZWQgbGlmZWN5Y2xlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBfZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcFByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3Byb3ZpZGVySWQgPSBkZWZpbml0aW9uLmlkO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFwidGhlbWUtY2hhbmdlZFwiLFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cygpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPVxuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQ8RmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdFx0YXN5bmMgKF86IHVua25vd24sIHBheWxvYWQ/OiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsIFwidGhlbWUtY2hhbmdlZFwiKTtcblx0XHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkLFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdGNvbnN0IGFwcFJlc3BvbnNlOiBIb21lU2VhcmNoUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMocXVlcnlMb3dlciwgZmlsdGVycywgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gYXBwUmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLmVuZHNXaXRoKFwiZmF2b3JpdGVcIikgJiYgcmVzdWx0LmRhdGE/LmFwcCkge1xuXHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cdFx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUuc3RhcnRzV2l0aChcInVuXCIpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocmVzdWx0LmRhdGE/LmZhdm9yaXRlSWQpICYmIGZhdm9yaXRlQ2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZShyZXN1bHQuZGF0YS5mYXZvcml0ZUlkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGZhdm9yaXRlQ2xpZW50LnNldFNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LnNldFNhdmVkRmF2b3JpdGUoe1xuXHRcdFx0XHRcdFx0XHRpZDogcmFuZG9tVVVJRCgpLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBGQVZPUklURV9UWVBFX05BTUVfQVBQLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHJlc3VsdC5rZXksXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiByZXN1bHQudGl0bGUsXG5cdFx0XHRcdFx0XHRcdGljb246IHJlc3VsdC5pY29uXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmxhdW5jaEFwcCkge1xuXHRcdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdFx0YXBwOiB7IGFwcElkPzogc3RyaW5nIH07XG5cdFx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRpZiAoZGF0YT8uYXBwPy5hcHBJZCkge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5sYXVuY2hBcHAoZGF0YS5hcHAuYXBwSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSByZXN1bHRzIGZvciB0aGUgYXBwcy5cblx0ICogQHBhcmFtIHF1ZXJ5TG93ZXIgVGhlIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIHF1ZXJ5IG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIG9wdGlvbnMuaXNTdWdnZXN0aW9uIElzIHRoZSBxdWVyeSBmcm9tIGEgc3VnZ2VzdGlvbi5cblx0ICogQHBhcmFtIGNhY2hlZEFwcHMgVGhlIGNhY2hlZCBhcHBzLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRSZXN1bHRzKFxuXHRcdHF1ZXJ5TG93ZXI6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHRcdGlzU3VnZ2VzdGlvbj86IGJvb2xlYW47XG5cdFx0fSxcblx0XHRjYWNoZWRBcHBzPzogUGxhdGZvcm1BcHBbXVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEFwcHMpIHtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zPy5xdWVyeU1pbkxlbmd0aDtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgPSBvcHRpb25zPy5xdWVyeUFnYWluc3Q7XG5cdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyA9IGZpbHRlcnM7XG5cblx0XHRcdGxldCBhcHBzOiBQbGF0Zm9ybUFwcFtdID0gY2FjaGVkQXBwcyA/PyAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEFwcHMoKSk7XG5cdFx0XHRsZXQgbWF0Y2hRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGZhdm9yaXRlSW5mbz8uaXNFbmFibGVkICYmXG5cdFx0XHRcdGlzU3RyaW5nVmFsdWUoZmF2b3JpdGVJbmZvPy5jb21tYW5kKSAmJlxuXHRcdFx0XHRxdWVyeUxvd2VyID09PSBmYXZvcml0ZUluZm8uY29tbWFuZCAmJlxuXHRcdFx0XHRmYXZvcml0ZUNsaWVudFxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IGZhdm9yaXRlQXBwcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXHRcdFx0XHRjb25zdCBmYXZJZHMgPSBmYXZvcml0ZUFwcHM/Lm1hcCgoZikgPT4gZi50eXBlSWQpID8/IFtdO1xuXHRcdFx0XHRhcHBzID0gYXBwcy5maWx0ZXIoKGEpID0+IGZhdklkcy5pbmNsdWRlcyhhLmFwcElkKSk7XG5cdFx0XHRcdG1hdGNoUXVlcnkgPSBcIlwiO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyA9IGFwcHM7XG5cdFx0XHRjb25zdCBhcHBTZWFyY2hFbnRyaWVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHMpO1xuXG5cdFx0XHRjb25zdCB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0XHRpZiAoYXBwU2VhcmNoRW50cmllcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGZpbmFsUmVzdWx0cyA9IGFwcFNlYXJjaEVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4ge1xuXHRcdFx0XHRcdGxldCB0ZXh0TWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdFx0bGV0IGZpbHRlck1hdGNoRm91bmQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0Y29uc3QgaXNDb21tYW5kID0gbWF0Y2hRdWVyeS5zdGFydHNXaXRoKFwiL1wiKTtcblxuXHRcdFx0XHRcdGlmIChtYXRjaFF1ZXJ5Lmxlbmd0aCA+PSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIHx8IGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0dGV4dE1hdGNoRm91bmQgPSBvcHRpb25zLnF1ZXJ5QWdhaW5zdC5zb21lKCh0YXJnZXQpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZW50cnlPYmplY3QgPSBlbnRyeSBhcyB1bmtub3duIGFzIHtcblx0XHRcdFx0XHRcdFx0XHRbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIHwgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRcdFx0XHRpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRWYWx1ZTogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH0gfCBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbnRyeU9iamVjdFtwYXRoWzBdXTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocGF0aC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBzcGVjaWZpZWRUYXJnZXQgPSBlbnRyeU9iamVjdFtwYXRoWzBdXSBhcyB7IFtpZDogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc09iamVjdChzcGVjaWZpZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgdGFyZ2V0VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHNwZWNpZmllZFRhcmdldCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUgPSBzcGVjaWZpZWRUYXJnZXRbcGF0aFsxXV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlzU3RyaW5nVmFsdWUodGFyZ2V0VmFsdWVbMF0pICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUuc29tZSgobXQpID0+IG10LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGBNYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggc3BlY2lmaWVkIGEgcXVlcnlBZ2FpbnN0IHRhcmdldCB0aGF0IGlzIGFuIGFycmF5IGJ1dCBub3QgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gT25seSBzdHJpbmcgdmFsdWVzIGFuZCBhcnJheXMgYXJlIHN1cHBvcnRlZDogJHtKU09OLnN0cmluZ2lmeShcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNwZWNpZmllZFRhcmdldFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCl9YFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XHRcIlRoZSBtYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggaGFzIGEgcXVlcnlBZ2FpbnN0IGVudHJ5IHRoYXQgaGFzIGEgZGVwdGggZ3JlYXRlciB0aGFuIDEuIFlvdSBjYW4gc2VhcmNoIGZvciBlLmcuIGRhdGEudGFncyBpZiBkYXRhIGhhcyB0YWdzIGluIGl0IGFuZCBpdCBpcyBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCB0YWdGaWx0ZXJzID0gQXJyYXkuaXNBcnJheShmaWx0ZXJzKVxuXHRcdFx0XHRcdFx0PyBmaWx0ZXJzLmZpbHRlcigoZikgPT4gZi5pZCA9PT0gQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMpXG5cdFx0XHRcdFx0XHQ6IFtdO1xuXHRcdFx0XHRcdGlmICh0YWdGaWx0ZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGZpbHRlck1hdGNoRm91bmQgPSB0YWdGaWx0ZXJzLnNvbWUoKGZpbHRlcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbHRlci5vcHRpb25zLmV2ZXJ5KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQob3B0aW9uKSA9PiAhb3B0aW9uLmlzU2VsZWN0ZWQgfHwgZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhvcHRpb24udmFsdWUpXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChmaWx0ZXIub3B0aW9ucy5pc1NlbGVjdGVkICYmICFpc0VtcHR5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhmaWx0ZXIub3B0aW9ucy52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGV4dE1hdGNoRm91bmQgJiYgQXJyYXkuaXNBcnJheShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHR0YWdzLnB1c2goLi4uKGVudHJ5LmRhdGEuYXBwLnRhZ3MgYXMgc3RyaW5nW10pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRleHRNYXRjaEZvdW5kICYmIGZpbHRlck1hdGNoRm91bmQ7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBmaW5hbFJlc3VsdHMubWFwKChlbnRyeSkgPT4gZW50cnkua2V5KTtcblxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHJlc3VsdHM6IGZpbmFsUmVzdWx0cyxcblx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJzOiB0aGlzLmdldFNlYXJjaEZpbHRlcnModGFncy5maWx0ZXIoQm9vbGVhbikpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gW107XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtdLFxuXHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRmaWx0ZXJzOiBbXVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHNlYXJjaCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gdGFncyBUaGUgdGFncyB0byBjcmVhdGUgdGhlIGZpbHRlcnMgZnJvbS5cblx0ICogQHJldHVybnMgVGhlIGZpbHRlcnMuXG5cdCAqL1xuXHRwcml2YXRlIGdldFNlYXJjaEZpbHRlcnModGFnczogc3RyaW5nW10pOiBDTElGaWx0ZXJbXSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcblx0XHRcdGNvbnN0IGZpbHRlcnM6IENMSUZpbHRlcltdID0gW107XG5cdFx0XHRjb25zdCB1bmlxdWVUYWdzID0gWy4uLm5ldyBTZXQodGFncyldLnNvcnQoKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKSk7XG5cdFx0XHRjb25zdCB0YWdGaWx0ZXI6IENMSUZpbHRlciA9IHtcblx0XHRcdFx0aWQ6IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTLFxuXHRcdFx0XHR0aXRsZTogXCJUYWdzXCIsXG5cdFx0XHRcdHR5cGU6IFwiTXVsdGlTZWxlY3RcIiBhcyBDTElGaWx0ZXJPcHRpb25UeXBlLk11bHRpU2VsZWN0LFxuXHRcdFx0XHRvcHRpb25zOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChjb25zdCB0YWcgb2YgdW5pcXVlVGFncykge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdGaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHR0YWdGaWx0ZXIub3B0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdHZhbHVlOiB0YWcsXG5cdFx0XHRcdFx0XHRpc1NlbGVjdGVkOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZpbHRlcnMucHVzaCh0YWdGaWx0ZXIpO1xuXHRcdFx0cmV0dXJuIGZpbHRlcnM7XG5cdFx0fVxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXBzIHBsYXRmb3JtIGFwcHMgdG8gc2VhcmNoIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBhcHBzIFRoZSBhcHBzIHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzOiBQbGF0Zm9ybUFwcFtdKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRjb25zdCBhcHBSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMpIHtcblx0XHRcdGxldCBzYXZlZEZhdm9yaXRlczogRmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cblx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRzYXZlZEZhdm9yaXRlcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGNvbnN0IGFwcCBvZiBhcHBzKSB7XG5cdFx0XHRcdGNvbnN0IGZhdm9yaXRlSWQgPSBzYXZlZEZhdm9yaXRlcz8uZmluZCgoZikgPT4gZi50eXBlSWQgPT09IGFwcC5hcHBJZCk/LmlkO1xuXHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCB0aGlzLm1hcEFwcEVudHJ5VG9TZWFyY2hFbnRyeShcblx0XHRcdFx0XHRhcHAsXG5cdFx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/Lm1hbmlmZXN0VHlwZU1hcHBpbmcsXG5cdFx0XHRcdFx0ZmF2b3JpdGVJbmZvLFxuXHRcdFx0XHRcdGZhdm9yaXRlSWRcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHJlcykge1xuXHRcdFx0XHRcdGFwcFJlc3VsdHMucHVzaChyZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBSZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcCBhIHNpbmdsZSBhcHAgdG8gYSBzZWFyY2ggcmVzdWx0LlxuXHQgKiBAcGFyYW0gYXBwIFRoZSBhcHAgdG8gbWFwLlxuXHQgKiBAcGFyYW0gdHlwZU1hcHBpbmcgVGhlIHR5cGUgbWFwcGluZ3MgdG8gaW5jbHVkZS5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzdWx0LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBtYXBBcHBFbnRyeVRvU2VhcmNoRW50cnkoXG5cdFx0YXBwOiBQbGF0Zm9ybUFwcCxcblx0XHR0eXBlTWFwcGluZzogQXBwTWFuaWZlc3RUeXBlTWFwcGluZyB8IHVuZGVmaW5lZCxcblx0XHRmYXZJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQsXG5cdFx0ZmF2b3JpdGVJZDogc3RyaW5nIHwgdW5kZWZpbmVkXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdCB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IG1hbmlmZXN0VHlwZSA9IGFwcC5tYW5pZmVzdFR5cGU7XG5cdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlKSkge1xuXHRcdFx0Y29uc3QgYWN0aW9uID0geyBuYW1lOiBcIkxhdW5jaCBWaWV3XCIsIGhvdGtleTogXCJlbnRlclwiIH07XG5cdFx0XHRjb25zdCBlbnRyeTogUGFydGlhbDxIb21lU2VhcmNoUmVzdWx0PiA9IHtcblx0XHRcdFx0a2V5OiBhcHAuYXBwSWQsXG5cdFx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gQXBwUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGU6IGFwcC50aXRsZSxcblx0XHRcdFx0ZGF0YTogeyBhcHAsIHByb3ZpZGVySWQ6IHRoaXMuX3Byb3ZpZGVySWQsIGZhdm9yaXRlSWQgfVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KHR5cGVNYXBwaW5nKSkge1xuXHRcdFx0XHRjb25zdCBtYW5pZmVzdFR5cGVNYXBwaW5nID0gdHlwZU1hcHBpbmdbbWFuaWZlc3RUeXBlIGFzIE1hbmlmZXN0VHlwZUlkXTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobWFuaWZlc3RUeXBlTWFwcGluZykpIHtcblx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwpKSB7XG5cdFx0XHRcdFx0XHRlbnRyeS5sYWJlbCA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lKSkge1xuXHRcdFx0XHRcdFx0YWN0aW9uLm5hbWUgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGVudHJ5LmFjdGlvbnMgPSBbYWN0aW9uXTtcblx0XHRcdGVudHJ5Lmljb24gPSB0aGlzLmdldEFwcEljb24oYXBwKTtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcC5kZXNjcmlwdGlvbikpIHtcblx0XHRcdFx0ZW50cnkuZGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHRcdGVudHJ5LnNob3J0RGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGhlYWRlckJ1dHRvbnM6IHsgaWNvbjogc3RyaW5nOyBhY3Rpb246IHN0cmluZyB9W10gPSBbXTtcblxuXHRcdFx0aWYgKGZhdkluZm8/LmZhdm9yaXRlSWNvbiAmJiBmYXZJbmZvLnVuZmF2b3JpdGVJY29uICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycykge1xuXHRcdFx0XHRjb25zdCB0aGVtZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRUaGVtZUNsaWVudCgpO1xuXG5cdFx0XHRcdGNvbnN0IGZhdm9yaXRlSWNvbiA9IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKFxuXHRcdFx0XHRcdCFpc0VtcHR5KGZhdm9yaXRlSWQpID8gZmF2SW5mby5mYXZvcml0ZUljb24gOiBmYXZJbmZvLnVuZmF2b3JpdGVJY29uXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChmYXZvcml0ZUljb24pIHtcblx0XHRcdFx0XHRoZWFkZXJCdXR0b25zLnB1c2goe1xuXHRcdFx0XHRcdFx0aWNvbjogZmF2b3JpdGVJY29uLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAhaXNFbXB0eShmYXZvcml0ZUlkKSA/IFwidW5mYXZvcml0ZVwiIDogXCJmYXZvcml0ZVwiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZW50cnkudGVtcGxhdGUgPSBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbTtcblx0XHRcdGVudHJ5LnRlbXBsYXRlQ29udGVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8udGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUFwcChcblx0XHRcdFx0YXBwLFxuXHRcdFx0XHRlbnRyeS5pY29uID8/IFwiXCIsXG5cdFx0XHRcdGFjdGlvbi5uYW1lLFxuXHRcdFx0XHRoZWFkZXJCdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4gZW50cnkgYXMgSG9tZVNlYXJjaFJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBpY29uIGZvciBhbiBhcHBsaWNhdGlvbi5cblx0ICogQHBhcmFtIGFwcCBUaGUgYXBwbGljYXRpb24gdG8gZ2V0IHRoZSBpY29uIGZvci5cblx0ICogQHJldHVybnMgVGhlIGljb24uXG5cdCAqL1xuXHRwcml2YXRlIGdldEFwcEljb24oYXBwOiBQbGF0Zm9ybUFwcCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmljb25zKSAmJiBhcHAuaWNvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIGFwcC5pY29uc1swXS5zcmM7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlYnVpbGQgdGhlIHJlc3VsdHMgaWYgdGhlIHRoZW1lIGNoYW5nZXMuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RSZXNwb25zZSkgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkodGhpcy5fbGFzdFJlc3VsdElkcykgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RDTElGaWx0ZXJzKSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCkgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCkgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RSZXN1bHRJZHMpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZWJ1aWxkaW5nIHJlc3VsdHMuLi5cIik7XG5cdFx0XHRjb25zdCBsYXN0UmVzdWx0SWRzID0gdGhpcy5fbGFzdFJlc3VsdElkcy5zbGljZSgpO1xuXHRcdFx0Y29uc3QgYXBwUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMoXG5cdFx0XHRcdHRoaXMuX2xhc3RRdWVyeSxcblx0XHRcdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMsXG5cdFx0XHRcdHsgcXVlcnlNaW5MZW5ndGg6IHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCwgcXVlcnlBZ2FpbnN0OiB0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0IH0sXG5cdFx0XHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgcmVtb3ZlUmVzdWx0SWRzID0gbGFzdFJlc3VsdElkcy5maWx0ZXIoKGlkKSA9PiAhdGhpcy5fbGFzdFJlc3VsdElkcz8uaW5jbHVkZXMoaWQpKTtcblx0XHRcdGlmIChyZW1vdmVSZXN1bHRJZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKC4uLnJlbW92ZVJlc3VsdElkcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChhcHBSZXNwb25zZS5yZXN1bHRzKTtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlc3VsdHMgcmVidWlsdC5cIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgYXBwIGJ1dHRvbnMgaWYgdGhlIGZhdm9yaXRlcyBoYXZlIGNoYW5nZWQuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIG9mIHRoZSBmYXZvcml0ZSBjaGFuZ2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkOiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkgPSBwYXlsb2FkLmZhdm9yaXRlO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0KHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiIHx8IHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSAmJlxuXHRcdFx0IWlzRW1wdHkoZmF2b3JpdGUpICYmXG5cdFx0XHRmYXZvcml0ZS50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfQVBQICYmXG5cdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyAmJlxuXHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzXG5cdFx0KSB7XG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXG5cdFx0XHRpZiAodGhpcy5fbGFzdFF1ZXJ5ID09PSBmYXZvcml0ZUluZm8/LmNvbW1hbmQgJiYgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShmYXZvcml0ZS50eXBlSWQpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9sYXN0QXBwUmVzdWx0cykge1xuXHRcdFx0XHRsZXQgbGFzdEFwcCA9IHRoaXMuX2xhc3RBcHBSZXN1bHRzLmZpbmQoKGEpID0+IGEuYXBwSWQgPT09IGZhdm9yaXRlLnR5cGVJZCk7XG5cblx0XHRcdFx0Ly8gSWYgaXQgd2Fzbid0IGluIHRoZSBsYXN0IHJlc3VsdHMgYWRkIGl0LCBidXQgb25seSBpZiB3ZSBhcmUgaW4gZmF2IGNvbW1hbmRcblx0XHRcdFx0aWYgKCFsYXN0QXBwICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0QXBwICYmIHRoaXMuX2xhc3RRdWVyeSA9PT0gZmF2b3JpdGVJbmZvPy5jb21tYW5kKSB7XG5cdFx0XHRcdFx0bGFzdEFwcCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRBcHAoZmF2b3JpdGUudHlwZUlkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghaXNFbXB0eShsYXN0QXBwKSkge1xuXHRcdFx0XHRcdGNvbnN0IHJlYnVpbHQgPSBhd2FpdCB0aGlzLm1hcEFwcEVudHJ5VG9TZWFyY2hFbnRyeShcblx0XHRcdFx0XHRcdGxhc3RBcHAsXG5cdFx0XHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8ubWFuaWZlc3RUeXBlTWFwcGluZyxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRcdHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiID8gZmF2b3JpdGUuaWQgOiB1bmRlZmluZWRcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0aWYgKHJlYnVpbHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKFtyZWJ1aWx0XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZmF2b3JpdGUgaW5mbyBhbmQgY2xpZW50IGlmIHRoZXkgYXJlIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZVR5cGVOYW1lcyBUaGUgdHlwZSBvZiBjbGllbnQgdG8gZ2V0LlxuXHQgKiBAcmV0dXJucyBUaGUgZmF2b3JpdGUgaW5mbyBhbmQgY2xpZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRGYXZJbmZvKFxuXHRcdGZhdm9yaXRlVHlwZU5hbWVzOiBGYXZvcml0ZVR5cGVOYW1lc1xuXHQpOiBQcm9taXNlPHsgZmF2b3JpdGVDbGllbnQ6IEZhdm9yaXRlQ2xpZW50IHwgdW5kZWZpbmVkOyBmYXZvcml0ZUluZm86IEZhdm9yaXRlSW5mbyB8IHVuZGVmaW5lZCB9PiB7XG5cdFx0bGV0IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkO1xuXHRcdGxldCBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0XHRpZiAoKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmZhdm9yaXRlc0VuYWJsZWQgPz8gdHJ1ZSkgJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRGYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0ZmF2b3JpdGVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0RmF2b3JpdGVDbGllbnQoKTtcblx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRmYXZvcml0ZUluZm8gPSBmYXZvcml0ZUNsaWVudC5nZXRJbmZvKCk7XG5cdFx0XHRcdGlmIChmYXZvcml0ZUluZm8uaXNFbmFibGVkKSB7XG5cdFx0XHRcdFx0Y29uc3QgaXNTdXBwb3J0ZWQgPVxuXHRcdFx0XHRcdFx0aXNFbXB0eShmYXZvcml0ZUluZm8uZW5hYmxlZFR5cGVzKSB8fCBmYXZvcml0ZUluZm8uZW5hYmxlZFR5cGVzLmluY2x1ZGVzKGZhdm9yaXRlVHlwZU5hbWVzKTtcblx0XHRcdFx0XHRpZiAoIWlzU3VwcG9ydGVkKSB7XG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRmYXZvcml0ZUNsaWVudCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZmF2b3JpdGVDbGllbnQsXG5cdFx0XHRmYXZvcml0ZUluZm9cblx0XHR9O1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogQXBwUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgQXBwUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==