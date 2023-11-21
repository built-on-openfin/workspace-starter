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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7d0JBQ2xCLFlBQVksR0FBRyxTQUFTLENBQUM7d0JBQ3pCLGNBQWMsR0FBRyxTQUFTLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTztZQUNOLGNBQWM7WUFDZCxZQUFZO1NBQ1osQ0FBQztJQUNILENBQUM7O0FBem5CRDs7O0dBR0c7QUFDcUIsK0JBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBRWhEOzs7R0FHRztBQUNxQiw2QkFBaUIsR0FBRyxNQUFNLENBQUM7Ozs7Ozs7U0MxQ3BEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFFckMsTUFBTSxXQUFXLEdBQWtDO0lBQ3pELFlBQVksRUFBRSxJQUFJLHFEQUFXLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhIH0gZnJvbSBcIi4vcGxhdGZvcm0tc2hhcGVzXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgQXBwLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCA9IFwiYXBwXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgV29ya3NwYWNlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSA9IFwid29ya3NwYWNlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUGFnZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFID0gXCJwYWdlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUXVlcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUVVFUlkgPSBcInF1ZXJ5XCI7XG5cbi8qKlxuICogTmFtZXMgZm9yIGFsbCB0aGUgZmF2b3JpdGUgdHlwZXMuXG4gKi9cbmV4cG9ydCB0eXBlIEZhdm9yaXRlVHlwZU5hbWVzID1cblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUFxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgZmF2b3JpdGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVQcm92aWRlck9wdGlvbnMge1xuXHQvKipcblx0ICogSXMgdGhlIHByb3ZpZGVyIGVuYWJsZWQsIGRlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRlbmFibGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGljb24gdGhhdCBzaG91bGQgYmUgdXNlZCBpZiB5b3Ugd2FudCB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgZmF2b3JpdGUgYWN0aW9uXG5cdCAqL1xuXHRmYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGljb24gdG8gdXNlIHRvIGluZGljYXRlIHRoYXQgdGhpcyBmYXZvcml0ZSBjYW4gYmUgdW5zZXRcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgY29tbWFuZHMgc2hvdWxkIGludGVncmF0aW9ucyBjaGVjayBmb3IgaWYgdGhleSBpbnRlbnQgdG8gc3VwcG9ydCB0aGUgZGlzcGxheSBvZiBmYXZvcml0ZXNcblx0ICovXG5cdGZhdm9yaXRlQ29tbWFuZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGNvbm5lY3Rpb24gcHJvdmlkZXIgY2FuIGhhdmUgYWN0aW9ucyByZWdpc3RlcmVkIGFnYWluc3QgaXQgZnJvbSB0aGUgcGxhdGZvcm0uIFRoaXMgcHJvdmlkZXMgYSBkZWZhdWx0IGxpc3Qgb2Zcblx0ICogYWN0aW9ucyB0aGF0IGNvbm5lY3Rpb25zIHNob3VsZCBiZSBhYmxlIHRvIHVzZSBpZiBhY3Rpb25zIGFyZSBlbmFibGVkIGZvciB0aGF0IGNvbm5lY3Rpb24uXG5cdCAqL1xuXHRzdXBwb3J0ZWRGYXZvcml0ZVR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcbn1cblxuLyoqXG4gKiBXaGVuIGFuIGVudHJ5IGlzIG1hZGUgaXQgcmVwcmVzZW50cyBhIHR5cGUgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm0uIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9va3VwIGFuZCBsYXVuY2ggdGhlIHRoaW5nIHRoaXMgZW50cnkgcmVmZXJzIHRvLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogQSB1bmlxdWUgZ3VpZCB0byByZXByZXNlbnQgdGhpcyBmYXZvcml0ZSBlbnRyeSBzbyB0aGF0IGl0IGNhbiBiZSB1cGRhdGVkIG9yIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBmb3IgdGhlIGZhdm9yaXRlIHR5cGUgdGhpcyBlbnRyeSByZXByZXNlbnRzXG5cdCAqL1xuXHR0eXBlSWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCB0eXBlIG9mIGZhdm9yaXRlIGVudHJ5IGRvZXMgdGhpcyBlbnRyeSByZXByZXNlbnRcblx0ICovXG5cdHR5cGU6IEZhdm9yaXRlVHlwZU5hbWVzO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGltZXN0YW1wIGZvciB0aGUgZW50cnkuXG5cdCAqL1xuXHR0aW1lc3RhbXA/OiBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBsYWJlbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRsYWJlbD86IHN0cmluZztcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRpY29uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEluZm8gdG8gcmV0dXJuIHRvIGludGVyZXN0ZWQgcGFydGllcyB0byBoZWxwIHRoZW0gc3VwcG9ydCBmYXZvcml0ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUluZm8ge1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIGZhdm9yaXRlXG5cdCAqL1xuXHRmYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gcmVtb3ZlIHRoaXMgZmF2b3JpdGVcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogQSBjb21tYW5kIHRoYXQgc3VwcG9ydGluZyBtb2R1bGVzIHNob3VsZCBsaXN0ZW4gZm9yIGlmIHRoZXkgYXJlIHRvIGRpc3BsYXkgZmF2b3JpdGVzIHRoYXQgZmFsbCB1bmRlciB0aGVtXG5cdCAqL1xuXHRjb21tYW5kPzogc3RyaW5nO1xuXHQvKipcblx0ICogV2hhdCB0eXBlcyBvZiBmYXZvcml0ZSBpdGVtIGFyZSBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybSwgdGhpcyBhbHNvIGRldGVybWluZXMgdGhlIG9yZGVyaW5nIGluIHRoZSBkb2NrIG1lbnUuXG5cdCAqL1xuXHRlbmFibGVkVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xuXHQvKipcblx0ICogSXMgZmF2b3JpdGUgc3VwcG9ydCBlbmFibGVkIG9uIHRoaXMgcGxhdGZvcm0uXG5cdCAqL1xuXHRpc0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBjbGllbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFjY2VzcyB0byBzb21lIG9yIGFsbCBvZiB0aGUgZmF2b3JpdGUgZnVuY3Rpb25hbGl0eVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlQ2xpZW50IHtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3Qgc3VwcG9ydGluZyBpbmZvcm1hdGlvbiBhYm91dCB3aGV0aGVyIGZhdm9yaXRlcyBhcmUgaW5pdGlhbGl6ZWQgZm9yIHRoZSBwbGF0Zm9ybSBhbmQgc3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMgU3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICovXG5cdGdldEluZm8oKTogRmF2b3JpdGVJbmZvO1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhbGwgKG9yIHNvbWUgaWYgYnkgdHlwZSkgb2YgdGhlIHNhdmVkIGZhdm9yaXRlc1xuXHQgKiBAcGFyYW0gYnlUeXBlIHRoZSB0eXBlIG9mIHNhdmVkIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc2F2ZWQgZmF2b3JpdGVzIG9yIGFuIGVtcHR5IGFycmF5IGlmIGl0IHdhcyB1bmFibGUgdG8gZ2V0IGFueSBiYWNrXG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlcyhieVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYSBwYXJ0aWN1bGFyIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIHRoZSBzYXZlZCBmYXZvcml0ZSBpZiBhdmFpbGFibGUgb3IgZmFsc2UgaWYgaXQgZGlkbid0IGV4aXN0XG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPEZhdm9yaXRlRW50cnkgfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gc2F2ZSBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGUgdGhlIEZhdm9yaXRlIHlvdSB3aXNoIHRvIHNhdmVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBzYXZlZFxuXHQgKi9cblx0c2V0U2F2ZWRGYXZvcml0ZT8oZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVtb3ZlL2RlbGV0ZSBhIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB0byBkZWxldGVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBkZWxldGVkLlxuXHQgKi9cblx0ZGVsZXRlU2F2ZWRGYXZvcml0ZT8oaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZhdm9yaXRlIGFuZCBtZXRhIGRhdGEgcmVsYXRlZCB0byBpdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBJbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSBwbGF0Zm9ybSBwcm92aWRpbmcgdGhlIHBheWxvYWQuXG5cdCAqL1xuXHRtZXRhRGF0YTogUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGE7XG5cdC8qKlxuXHQgKiBUaGUgZmF2b3JpdGUgZW50cnlcblx0ICovXG5cdHBheWxvYWQ6IEZhdm9yaXRlRW50cnk7XG59XG5cbi8qKlxuICogQSByZXF1ZXN0IHR5cGUgZm9yIHRoZSBGYXZvcml0ZUVuZHBvaW50IHRoYXQgZ2V0cyBhbGwgc2F2ZWQgZmF2b3JpdGUgZW50cmllc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB0eXBlIGlmIHNwZWNpZmllZCBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgdGhlIHJlc3BvbnNlIHRvIG9ubHkgc2VuZCB0aGUgZW50cmllcyB0aGF0IGFyZSByZWxldmFudFxuXHQgKi9cblx0ZmF2b3JpdGVUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXM7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBmYXZvcml0ZXMgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2Uge1xuXHQvKipcblx0ICogVGhlIGxpc3Qgb2YgZmF2b3JpdGUgZW50cmllcyB3aXRoIGluZm9ybWF0aW9uIG9mIHdoYXQgcGxhdGZvcm0gdmVyc2lvbnMgdGhleSB3ZXJlIG9yaWdpbmFsbHkgc2F2ZWQgYWdhaW5zdFxuXHQgKi9cblx0ZW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W107XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGhhcyBiZWVuIHNhdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgYSBzcGVjaWZpYyBmYXZvcml0ZSB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCB0eXBlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSA9IEVuZHBvaW50RmF2b3JpdGVFbnRyeTtcblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QgZXh0ZW5kcyBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgc2V0XG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciByZW1vdmluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElGaWx0ZXJPcHRpb25UeXBlLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBNYW5pZmVzdFR5cGVJZCwgUGxhdGZvcm1BcHAgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FwcC1zaGFwZXNcIjtcbmltcG9ydCB7XG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAsXG5cdHR5cGUgRmF2b3JpdGVDbGllbnQsXG5cdHR5cGUgRmF2b3JpdGVFbnRyeSxcblx0dHlwZSBGYXZvcml0ZUluZm8sXG5cdHR5cGUgRmF2b3JpdGVUeXBlTmFtZXNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9saWZlY3ljbGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCwgaXNTdHJpbmdWYWx1ZSwgcmFuZG9tVVVJRCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBNYW5pZmVzdFR5cGVNYXBwaW5nLCBBcHBTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIGFwcHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPEFwcFNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMDtcblxuXHQvKipcblx0ICogVGhlIGtleSB1c2VkIHRvIGZpbHRlciBvdXQgYnkgdGFnLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9IT01FX1RBR19GSUxURVJTID0gXCJ0YWdzXCI7XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3Byb3ZpZGVySWQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IEFwcFNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlBZ2FpbnN0Pzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0Q0xJRmlsdGVycz86IENMSUZpbHRlcltdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBhcHAgcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RBcHBSZXN1bHRzPzogUGxhdGZvcm1BcHBbXTtcblxuXHQvKipcblx0ICogVGhlIGxpc3Qgb2YgdGhlIGlkcyBvZiB0aGUgbGFzdCBzZXQgb2YgcmVzdWx0c1xuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdElkcz86IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBTdWJzY3JpcHRpb24gaWQgZm9yIHRoZW1lLWNoYW5nZWQgbGlmZWN5Y2xlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBfdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogU3Vic2NyaXB0aW9uIGlkIGZvciBmYXZvcml0ZS1jaGFuZ2VkIGxpZmVjeWNsZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFwcFNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBcHBQcm92aWRlclwiKTtcblx0XHR0aGlzLl9wcm92aWRlcklkID0gZGVmaW5pdGlvbi5pZDtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcInRoZW1lLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblxuXHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkID1cblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50PEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ+KFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiLFxuXHRcdFx0XHRcdGFzeW5jIChfOiB1bmtub3duLCBwYXlsb2FkPzogRmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudXBkYXRlQXBwRmF2b3JpdGVCdXR0b25zKHBheWxvYWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8udW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQpKSB7XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkLCBcInRoZW1lLWNoYW5nZWRcIik7XG5cdFx0XHRcdHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQpKSB7XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCxcblx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5pc1N1Z2dlc3Rpb24gSXMgdGhlIHF1ZXJ5IGZyb20gYSBzdWdnZXN0aW9uLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHRcdGlzU3VnZ2VzdGlvbj86IGJvb2xlYW47XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMuX2xhc3RSZXNwb25zZSA9IGxhc3RSZXNwb25zZTtcblx0XHRjb25zdCBhcHBSZXNwb25zZTogSG9tZVNlYXJjaFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXN1bHRzKHF1ZXJ5TG93ZXIsIGZpbHRlcnMsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIGFwcFJlc3BvbnNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5lbmRzV2l0aChcImZhdm9yaXRlXCIpICYmIHJlc3VsdC5kYXRhPy5hcHApIHtcblx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLnN0YXJ0c1dpdGgoXCJ1blwiKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHJlc3VsdC5kYXRhPy5mYXZvcml0ZUlkKSAmJiBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUocmVzdWx0LmRhdGEuZmF2b3JpdGVJZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChmYXZvcml0ZUNsaWVudC5zZXRTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5zZXRTYXZlZEZhdm9yaXRlKHtcblx0XHRcdFx0XHRcdFx0aWQ6IHJhbmRvbVVVSUQoKSxcblx0XHRcdFx0XHRcdFx0dHlwZTogRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCxcblx0XHRcdFx0XHRcdFx0dHlwZUlkOiByZXN1bHQua2V5LFxuXHRcdFx0XHRcdFx0XHRsYWJlbDogcmVzdWx0LnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRpY29uOiByZXN1bHQuaWNvblxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5sYXVuY2hBcHApIHtcblx0XHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRcdGFwcDogeyBhcHBJZD86IHN0cmluZyB9O1xuXHRcdFx0XHR9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRcdFx0aWYgKGRhdGE/LmFwcD8uYXBwSWQpIHtcblx0XHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoQXBwKGRhdGEuYXBwLmFwcElkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgcmVzdWx0cyBmb3IgdGhlIGFwcHMuXG5cdCAqIEBwYXJhbSBxdWVyeUxvd2VyIFRoZSBxdWVyeS5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBvcHRpb25zIFRoZSBxdWVyeSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEBwYXJhbSBjYWNoZWRBcHBzIFRoZSBjYWNoZWQgYXBwcy5cblx0ICogQHJldHVybnMgVGhlIHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0UmVzdWx0cyhcblx0XHRxdWVyeUxvd2VyOiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH0sXG5cdFx0Y2FjaGVkQXBwcz86IFBsYXRmb3JtQXBwW11cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRBcHBzKSB7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucz8ucXVlcnlNaW5MZW5ndGg7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0ID0gb3B0aW9ucz8ucXVlcnlBZ2FpbnN0O1xuXHRcdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMgPSBmaWx0ZXJzO1xuXG5cdFx0XHRsZXQgYXBwczogUGxhdGZvcm1BcHBbXSA9IGNhY2hlZEFwcHMgPz8gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRBcHBzKCkpO1xuXHRcdFx0bGV0IG1hdGNoUXVlcnkgPSBxdWVyeUxvd2VyO1xuXG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50LCBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRmYXZvcml0ZUluZm8/LmlzRW5hYmxlZCAmJlxuXHRcdFx0XHRpc1N0cmluZ1ZhbHVlKGZhdm9yaXRlSW5mbz8uY29tbWFuZCkgJiZcblx0XHRcdFx0cXVlcnlMb3dlciA9PT0gZmF2b3JpdGVJbmZvLmNvbW1hbmQgJiZcblx0XHRcdFx0ZmF2b3JpdGVDbGllbnRcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUFwcHMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblx0XHRcdFx0Y29uc3QgZmF2SWRzID0gZmF2b3JpdGVBcHBzPy5tYXAoKGYpID0+IGYudHlwZUlkKSA/PyBbXTtcblx0XHRcdFx0YXBwcyA9IGFwcHMuZmlsdGVyKChhKSA9PiBmYXZJZHMuaW5jbHVkZXMoYS5hcHBJZCkpO1xuXHRcdFx0XHRtYXRjaFF1ZXJ5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMgPSBhcHBzO1xuXHRcdFx0Y29uc3QgYXBwU2VhcmNoRW50cmllcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzKTtcblxuXHRcdFx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBbXTtcblxuXHRcdFx0aWYgKGFwcFNlYXJjaEVudHJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBmaW5hbFJlc3VsdHMgPSBhcHBTZWFyY2hFbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IHtcblx0XHRcdFx0XHRsZXQgdGV4dE1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdGxldCBmaWx0ZXJNYXRjaEZvdW5kID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGNvbnN0IGlzQ29tbWFuZCA9IG1hdGNoUXVlcnkuc3RhcnRzV2l0aChcIi9cIik7XG5cblx0XHRcdFx0XHRpZiAobWF0Y2hRdWVyeS5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCB8fCBpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdHRleHRNYXRjaEZvdW5kID0gb3B0aW9ucy5xdWVyeUFnYWluc3Quc29tZSgodGFyZ2V0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVudHJ5T2JqZWN0ID0gZW50cnkgYXMgdW5rbm93biBhcyB7XG5cdFx0XHRcdFx0XHRcdFx0W2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0aWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWU6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9IHwgc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQgPVxuXHRcdFx0XHRcdFx0XHRcdFx0ZW50cnlPYmplY3RbcGF0aFswXV07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHBhdGgubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3BlY2lmaWVkVGFyZ2V0ID0gZW50cnlPYmplY3RbcGF0aFswXV0gYXMgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNPYmplY3Qoc3BlY2lmaWVkVGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHRhcmdldFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShzcGVjaWZpZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlID0gc3BlY2lmaWVkVGFyZ2V0W3BhdGhbMV1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKG1hdGNoUXVlcnkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlWzBdKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLnNvbWUoKG10KSA9PiBtdC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgobWF0Y2hRdWVyeSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRgTWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIHNwZWNpZmllZCBhIHF1ZXJ5QWdhaW5zdCB0YXJnZXQgdGhhdCBpcyBhbiBhcnJheSBidXQgbm90IGFuIGFycmF5IG9mIHN0cmluZ3MuIE9ubHkgc3RyaW5nIHZhbHVlcyBhbmQgYXJyYXlzIGFyZSBzdXBwb3J0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzcGVjaWZpZWRUYXJnZXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpfWBcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJUaGUgbWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIGhhcyBhIHF1ZXJ5QWdhaW5zdCBlbnRyeSB0aGF0IGhhcyBhIGRlcHRoIGdyZWF0ZXIgdGhhbiAxLiBZb3UgY2FuIHNlYXJjaCBmb3IgZS5nLiBkYXRhLnRhZ3MgaWYgZGF0YSBoYXMgdGFncyBpbiBpdCBhbmQgaXQgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgdGFnRmlsdGVycyA9IEFycmF5LmlzQXJyYXkoZmlsdGVycylcblx0XHRcdFx0XHRcdD8gZmlsdGVycy5maWx0ZXIoKGYpID0+IGYuaWQgPT09IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTKVxuXHRcdFx0XHRcdFx0OiBbXTtcblx0XHRcdFx0XHRpZiAodGFnRmlsdGVycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaEZvdW5kID0gdGFnRmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIub3B0aW9ucy5ldmVyeShcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG9wdGlvbikgPT4gIW9wdGlvbi5pc1NlbGVjdGVkIHx8IGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMob3B0aW9uLnZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsdGVyLm9wdGlvbnMuaXNTZWxlY3RlZCAmJiAhaXNFbXB0eShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMoZmlsdGVyLm9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRleHRNYXRjaEZvdW5kICYmIEFycmF5LmlzQXJyYXkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0dGFncy5wdXNoKC4uLihlbnRyeS5kYXRhLmFwcC50YWdzIGFzIHN0cmluZ1tdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0ZXh0TWF0Y2hGb3VuZCAmJiBmaWx0ZXJNYXRjaEZvdW5kO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gZmluYWxSZXN1bHRzLm1hcCgoZW50cnkpID0+IGVudHJ5LmtleSk7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRyZXN1bHRzOiBmaW5hbFJlc3VsdHMsXG5cdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0ZmlsdGVyczogdGhpcy5nZXRTZWFyY2hGaWx0ZXJzKHRhZ3MuZmlsdGVyKEJvb2xlYW4pKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IFtdO1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXSxcblx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0ZmlsdGVyczogW11cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBzZWFyY2ggZmlsdGVycy5cblx0ICogQHBhcmFtIHRhZ3MgVGhlIHRhZ3MgdG8gY3JlYXRlIHRoZSBmaWx0ZXJzIGZyb20uXG5cdCAqIEByZXR1cm5zIFRoZSBmaWx0ZXJzLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRTZWFyY2hGaWx0ZXJzKHRhZ3M6IHN0cmluZ1tdKTogQ0xJRmlsdGVyW10ge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ3MpKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJzOiBDTElGaWx0ZXJbXSA9IFtdO1xuXHRcdFx0Y29uc3QgdW5pcXVlVGFncyA9IFsuLi5uZXcgU2V0KHRhZ3MpXS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuXHRcdFx0Y29uc3QgdGFnRmlsdGVyOiBDTElGaWx0ZXIgPSB7XG5cdFx0XHRcdGlkOiBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUyxcblx0XHRcdFx0dGl0bGU6IFwiVGFnc1wiLFxuXHRcdFx0XHR0eXBlOiBcIk11bHRpU2VsZWN0XCIgYXMgQ0xJRmlsdGVyT3B0aW9uVHlwZS5NdWx0aVNlbGVjdCxcblx0XHRcdFx0b3B0aW9uczogW11cblx0XHRcdH07XG5cblx0XHRcdGZvciAoY29uc3QgdGFnIG9mIHVuaXF1ZVRhZ3MpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFnRmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0dGFnRmlsdGVyLm9wdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdGFnLFxuXHRcdFx0XHRcdFx0aXNTZWxlY3RlZDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmaWx0ZXJzLnB1c2godGFnRmlsdGVyKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogTWFwcyBwbGF0Zm9ybSBhcHBzIHRvIHNlYXJjaCByZXN1bHRzLlxuXHQgKiBAcGFyYW0gYXBwcyBUaGUgYXBwcyB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwczogUGxhdGZvcm1BcHBbXSk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgYXBwUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykgJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzKSB7XG5cdFx0XHRsZXQgc2F2ZWRGYXZvcml0ZXM6IEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZDtcblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXG5cdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0c2F2ZWRGYXZvcml0ZXMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBhcHAuYXBwSWQpPy5pZDtcblx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyeVRvU2VhcmNoRW50cnkoXG5cdFx0XHRcdFx0YXBwLFxuXHRcdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5tYW5pZmVzdFR5cGVNYXBwaW5nLFxuXHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRmYXZvcml0ZUlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChyZXMpIHtcblx0XHRcdFx0XHRhcHBSZXN1bHRzLnB1c2gocmVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwUmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXAgYSBzaW5nbGUgYXBwIHRvIGEgc2VhcmNoIHJlc3VsdC5cblx0ICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIG1hcC5cblx0ICogQHBhcmFtIHR5cGVNYXBwaW5nIFRoZSB0eXBlIG1hcHBpbmdzIHRvIGluY2x1ZGUuXG5cdCAqIEBwYXJhbSBmYXZJbmZvIFRoZSBmYXZvcml0ZXMgaW5mbyBpZiBpdCBpcyBlbmFibGVkLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGVJZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdGFwcDogUGxhdGZvcm1BcHAsXG5cdFx0dHlwZU1hcHBpbmc6IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcgfCB1bmRlZmluZWQsXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQgfCB1bmRlZmluZWQ+IHtcblx0XHRjb25zdCBtYW5pZmVzdFR5cGUgPSBhcHAubWFuaWZlc3RUeXBlO1xuXHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZSkpIHtcblx0XHRcdGNvbnN0IGFjdGlvbiA9IHsgbmFtZTogXCJMYXVuY2ggVmlld1wiLCBob3RrZXk6IFwiZW50ZXJcIiB9O1xuXHRcdFx0Y29uc3QgZW50cnk6IFBhcnRpYWw8SG9tZVNlYXJjaFJlc3VsdD4gPSB7XG5cdFx0XHRcdGtleTogYXBwLmFwcElkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IEFwcFByb3ZpZGVyLl9ERUZBVUxUX0JBU0VfU0NPUkUsXG5cdFx0XHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0XHRcdGRhdGE6IHsgYXBwLCBwcm92aWRlcklkOiB0aGlzLl9wcm92aWRlcklkLCBmYXZvcml0ZUlkIH1cblx0XHRcdH07XG5cblx0XHRcdGlmICghaXNFbXB0eSh0eXBlTWFwcGluZykpIHtcblx0XHRcdFx0Y29uc3QgbWFuaWZlc3RUeXBlTWFwcGluZyA9IHR5cGVNYXBwaW5nW21hbmlmZXN0VHlwZSBhcyBNYW5pZmVzdFR5cGVJZF07XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KG1hbmlmZXN0VHlwZU1hcHBpbmcpKSB7XG5cdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsKSkge1xuXHRcdFx0XHRcdFx0ZW50cnkubGFiZWwgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSkpIHtcblx0XHRcdFx0XHRcdGFjdGlvbi5uYW1lID0gbWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRlbnRyeS5hY3Rpb25zID0gW2FjdGlvbl07XG5cdFx0XHRlbnRyeS5pY29uID0gdGhpcy5nZXRBcHBJY29uKGFwcCk7XG5cblx0XHRcdGlmICghaXNFbXB0eShhcHAuZGVzY3JpcHRpb24pKSB7XG5cdFx0XHRcdGVudHJ5LmRlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHRlbnRyeS5zaG9ydERlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbiAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMpIHtcblx0XHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblxuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGVudHJ5LnRlbXBsYXRlID0gXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b207XG5cdFx0XHRlbnRyeS50ZW1wbGF0ZUNvbnRlbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnRlbXBsYXRlSGVscGVycy5jcmVhdGVBcHAoXG5cdFx0XHRcdGFwcCxcblx0XHRcdFx0ZW50cnkuaWNvbiA/PyBcIlwiLFxuXHRcdFx0XHRhY3Rpb24ubmFtZSxcblx0XHRcdFx0aGVhZGVyQnV0dG9uc1xuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIGVudHJ5IGFzIEhvbWVTZWFyY2hSZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgaWNvbiBmb3IgYW4gYXBwbGljYXRpb24uXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIGdldCB0aGUgaWNvbiBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBpY29uLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGlmIHRoZSB0aGVtZSBjaGFuZ2VzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoaXMuX2xhc3RSZXN1bHRJZHMpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnkpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0Q0xJRmlsdGVycykgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeUFnYWluc3QpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzdWx0SWRzKVxuXHRcdCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmVidWlsZGluZyByZXN1bHRzLi4uXCIpO1xuXHRcdFx0Y29uc3QgbGFzdFJlc3VsdElkcyA9IHRoaXMuX2xhc3RSZXN1bHRJZHMuc2xpY2UoKTtcblx0XHRcdGNvbnN0IGFwcFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXN1bHRzKFxuXHRcdFx0XHR0aGlzLl9sYXN0UXVlcnksXG5cdFx0XHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzLFxuXHRcdFx0XHR7IHF1ZXJ5TWluTGVuZ3RoOiB0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgsIHF1ZXJ5QWdhaW5zdDogdGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCB9LFxuXHRcdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0c1xuXHRcdFx0KTtcblx0XHRcdGNvbnN0IHJlbW92ZVJlc3VsdElkcyA9IGxhc3RSZXN1bHRJZHMuZmlsdGVyKChpZCkgPT4gIXRoaXMuX2xhc3RSZXN1bHRJZHM/LmluY2x1ZGVzKGlkKSk7XG5cdFx0XHRpZiAocmVtb3ZlUmVzdWx0SWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZSguLi5yZW1vdmVSZXN1bHRJZHMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoYXBwUmVzcG9uc2UucmVzdWx0cyk7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZXN1bHRzIHJlYnVpbHQuXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGFwcCBidXR0b25zIGlmIHRoZSBmYXZvcml0ZXMgaGF2ZSBjaGFuZ2VkLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBvZiB0aGUgZmF2b3JpdGUgY2hhbmdlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyB1cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZDogRmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5ID0gcGF5bG9hZC5mYXZvcml0ZTtcblxuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RSZXNwb25zZSkgJiZcblx0XHRcdChwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiB8fCBwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikgJiZcblx0XHRcdCFpc0VtcHR5KGZhdm9yaXRlKSAmJlxuXHRcdFx0ZmF2b3JpdGUudHlwZSA9PT0gRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCAmJlxuXHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMgJiZcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVyc1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblxuXHRcdFx0aWYgKHRoaXMuX2xhc3RRdWVyeSA9PT0gZmF2b3JpdGVJbmZvPy5jb21tYW5kICYmIHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoZmF2b3JpdGUudHlwZUlkKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fbGFzdEFwcFJlc3VsdHMpIHtcblx0XHRcdFx0bGV0IGxhc3RBcHAgPSB0aGlzLl9sYXN0QXBwUmVzdWx0cy5maW5kKChhKSA9PiBhLmFwcElkID09PSBmYXZvcml0ZS50eXBlSWQpO1xuXG5cdFx0XHRcdC8vIElmIGl0IHdhc24ndCBpbiB0aGUgbGFzdCByZXN1bHRzIGFkZCBpdCwgYnV0IG9ubHkgaWYgd2UgYXJlIGluIGZhdiBjb21tYW5kXG5cdFx0XHRcdGlmICghbGFzdEFwcCAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEFwcCAmJiB0aGlzLl9sYXN0UXVlcnkgPT09IGZhdm9yaXRlSW5mbz8uY29tbWFuZCkge1xuXHRcdFx0XHRcdGxhc3RBcHAgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0QXBwKGZhdm9yaXRlLnR5cGVJZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdEFwcCkpIHtcblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyeVRvU2VhcmNoRW50cnkoXG5cdFx0XHRcdFx0XHRsYXN0QXBwLFxuXHRcdFx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/Lm1hbmlmZXN0VHlwZU1hcHBpbmcsXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChyZWJ1aWx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChbcmVidWlsdF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudCBpZiB0aGV5IGFyZSBlbmFibGVkLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGVUeXBlTmFtZXMgVGhlIHR5cGUgb2YgY2xpZW50IHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0RmF2SW5mbyhcblx0XHRmYXZvcml0ZVR5cGVOYW1lczogRmF2b3JpdGVUeXBlTmFtZXNcblx0KTogUHJvbWlzZTx7IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDsgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQgfT4ge1xuXHRcdGxldCBmYXZvcml0ZUluZm86IEZhdm9yaXRlSW5mbyB8IHVuZGVmaW5lZDtcblx0XHRsZXQgZmF2b3JpdGVDbGllbnQ6IEZhdm9yaXRlQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdFx0aWYgKCh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5mYXZvcml0ZXNFbmFibGVkID8/IHRydWUpICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0RmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEZhdm9yaXRlQ2xpZW50KCk7XG5cdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gZmF2b3JpdGVDbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJbmZvLmlzRW5hYmxlZCkge1xuXHRcdFx0XHRcdGNvbnN0IGlzU3VwcG9ydGVkID1cblx0XHRcdFx0XHRcdGlzRW1wdHkoZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcykgfHwgZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcy5pbmNsdWRlcyhmYXZvcml0ZVR5cGVOYW1lcyk7XG5cdFx0XHRcdFx0aWYgKCFpc1N1cHBvcnRlZCkge1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVDbGllbnQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50LFxuXHRcdFx0ZmF2b3JpdGVJbmZvXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHBQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IEFwcFByb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IEFwcFByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=