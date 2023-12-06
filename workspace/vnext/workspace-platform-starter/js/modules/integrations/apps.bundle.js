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
                        isSelected: true
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O0FDTjRDO0FBRXJDLE1BQU0sV0FBVyxHQUFrQztJQUN6RCxZQUFZLEVBQUUsSUFBSSxxREFBVyxFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YSB9IGZyb20gXCIuL3BsYXRmb3JtLXNoYXBlc1wiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIEFwcC5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAgPSBcImFwcFwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgPSBcIndvcmtzcGFjZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFBhZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUEFHRSA9IFwicGFnZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFF1ZXJ5LlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZID0gXCJxdWVyeVwiO1xuXG4vKipcbiAqIE5hbWVzIGZvciBhbGwgdGhlIGZhdm9yaXRlIHR5cGVzLlxuICovXG5leHBvcnQgdHlwZSBGYXZvcml0ZVR5cGVOYW1lcyA9XG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9BUFBcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUEFHRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUVVFUlk7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgdGhlIGZhdm9yaXRlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlUHJvdmlkZXJPcHRpb25zIHtcblx0LyoqXG5cdCAqIElzIHRoZSBwcm92aWRlciBlbmFibGVkLCBkZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0ZW5hYmxlZD86IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgeW91IHdhbnQgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIGZhdm9yaXRlIGFjdGlvblxuXHQgKi9cblx0ZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRvIHVzZSB0byBpbmRpY2F0ZSB0aGF0IHRoaXMgZmF2b3JpdGUgY2FuIGJlIHVuc2V0XG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IGNvbW1hbmRzIHNob3VsZCBpbnRlZ3JhdGlvbnMgY2hlY2sgZm9yIGlmIHRoZXkgaW50ZW50IHRvIHN1cHBvcnQgdGhlIGRpc3BsYXkgb2YgZmF2b3JpdGVzXG5cdCAqL1xuXHRmYXZvcml0ZUNvbW1hbmQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25uZWN0aW9uIHByb3ZpZGVyIGNhbiBoYXZlIGFjdGlvbnMgcmVnaXN0ZXJlZCBhZ2FpbnN0IGl0IGZyb20gdGhlIHBsYXRmb3JtLiBUaGlzIHByb3ZpZGVzIGEgZGVmYXVsdCBsaXN0IG9mXG5cdCAqIGFjdGlvbnMgdGhhdCBjb25uZWN0aW9ucyBzaG91bGQgYmUgYWJsZSB0byB1c2UgaWYgYWN0aW9ucyBhcmUgZW5hYmxlZCBmb3IgdGhhdCBjb25uZWN0aW9uLlxuXHQgKi9cblx0c3VwcG9ydGVkRmF2b3JpdGVUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG59XG5cbi8qKlxuICogV2hlbiBhbiBlbnRyeSBpcyBtYWRlIGl0IHJlcHJlc2VudHMgYSB0eXBlIHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvb2t1cCBhbmQgbGF1bmNoIHRoZSB0aGluZyB0aGlzIGVudHJ5IHJlZmVycyB0by5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEEgdW5pcXVlIGd1aWQgdG8gcmVwcmVzZW50IHRoaXMgZmF2b3JpdGUgZW50cnkgc28gdGhhdCBpdCBjYW4gYmUgdXBkYXRlZCBvciByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgZm9yIHRoZSBmYXZvcml0ZSB0eXBlIHRoaXMgZW50cnkgcmVwcmVzZW50c1xuXHQgKi9cblx0dHlwZUlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgdHlwZSBvZiBmYXZvcml0ZSBlbnRyeSBkb2VzIHRoaXMgZW50cnkgcmVwcmVzZW50XG5cdCAqL1xuXHR0eXBlOiBGYXZvcml0ZVR5cGVOYW1lcztcblxuXHQvKipcblx0ICogVGhlIHRpbWVzdGFtcCBmb3IgdGhlIGVudHJ5LlxuXHQgKi9cblx0dGltZXN0YW1wPzogRGF0ZTtcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgbGFiZWwgdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0bGFiZWw/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0aWNvbj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbmZvIHRvIHJldHVybiB0byBpbnRlcmVzdGVkIHBhcnRpZXMgdG8gaGVscCB0aGVtIHN1cHBvcnQgZmF2b3JpdGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVJbmZvIHtcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byBmYXZvcml0ZVxuXHQgKi9cblx0ZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIHJlbW92ZSB0aGlzIGZhdm9yaXRlXG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIEEgY29tbWFuZCB0aGF0IHN1cHBvcnRpbmcgbW9kdWxlcyBzaG91bGQgbGlzdGVuIGZvciBpZiB0aGV5IGFyZSB0byBkaXNwbGF5IGZhdm9yaXRlcyB0aGF0IGZhbGwgdW5kZXIgdGhlbVxuXHQgKi9cblx0Y29tbWFuZD86IHN0cmluZztcblx0LyoqXG5cdCAqIFdoYXQgdHlwZXMgb2YgZmF2b3JpdGUgaXRlbSBhcmUgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0sIHRoaXMgYWxzbyBkZXRlcm1pbmVzIHRoZSBvcmRlcmluZyBpbiB0aGUgZG9jayBtZW51LlxuXHQgKi9cblx0ZW5hYmxlZFR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcblx0LyoqXG5cdCAqIElzIGZhdm9yaXRlIHN1cHBvcnQgZW5hYmxlZCBvbiB0aGlzIHBsYXRmb3JtLlxuXHQgKi9cblx0aXNFbmFibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY2xpZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gc29tZSBvciBhbGwgb2YgdGhlIGZhdm9yaXRlIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUNsaWVudCB7XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IHN1cHBvcnRpbmcgaW5mb3JtYXRpb24gYWJvdXQgd2hldGhlciBmYXZvcml0ZXMgYXJlIGluaXRpYWxpemVkIGZvciB0aGUgcGxhdGZvcm0gYW5kIHN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIFN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRnZXRJbmZvKCk6IEZhdm9yaXRlSW5mbztcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYWxsIChvciBzb21lIGlmIGJ5IHR5cGUpIG9mIHRoZSBzYXZlZCBmYXZvcml0ZXNcblx0ICogQHBhcmFtIGJ5VHlwZSB0aGUgdHlwZSBvZiBzYXZlZCBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHNhdmVkIGZhdm9yaXRlcyBvciBhbiBlbXB0eSBhcnJheSBpZiBpdCB3YXMgdW5hYmxlIHRvIGdldCBhbnkgYmFja1xuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZXMoYnlUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXMpOiBQcm9taXNlPEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGEgcGFydGljdWxhciBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyB0aGUgc2F2ZWQgZmF2b3JpdGUgaWYgYXZhaWxhYmxlIG9yIGZhbHNlIGlmIGl0IGRpZG4ndCBleGlzdFxuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5IHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHNhdmUgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGZhdm9yaXRlIHRoZSBGYXZvcml0ZSB5b3Ugd2lzaCB0byBzYXZlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgc2F2ZWRcblx0ICovXG5cdHNldFNhdmVkRmF2b3JpdGU/KGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5KTogUHJvbWlzZTxib29sZWFuPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlbW92ZS9kZWxldGUgYSBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgdG8gZGVsZXRlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgZGVsZXRlZC5cblx0ICovXG5cdGRlbGV0ZVNhdmVkRmF2b3JpdGU/KGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmYXZvcml0ZSBhbmQgbWV0YSBkYXRhIHJlbGF0ZWQgdG8gaXRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogSW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgcGxhdGZvcm0gcHJvdmlkaW5nIHRoZSBwYXlsb2FkLlxuXHQgKi9cblx0bWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhO1xuXHQvKipcblx0ICogVGhlIGZhdm9yaXRlIGVudHJ5XG5cdCAqL1xuXHRwYXlsb2FkOiBGYXZvcml0ZUVudHJ5O1xufVxuXG4vKipcbiAqIEEgcmVxdWVzdCB0eXBlIGZvciB0aGUgRmF2b3JpdGVFbmRwb2ludCB0aGF0IGdldHMgYWxsIHNhdmVkIGZhdm9yaXRlIGVudHJpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBpZiBzcGVjaWZpZWQgc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHRoZSByZXNwb25zZSB0byBvbmx5IHNlbmQgdGhlIGVudHJpZXMgdGhhdCBhcmUgcmVsZXZhbnRcblx0ICovXG5cdGZhdm9yaXRlVHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgZmF2b3JpdGVzIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHtcblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIGZhdm9yaXRlIGVudHJpZXMgd2l0aCBpbmZvcm1hdGlvbiBvZiB3aGF0IHBsYXRmb3JtIHZlcnNpb25zIHRoZXkgd2VyZSBvcmlnaW5hbGx5IHNhdmVkIGFnYWluc3Rcblx0ICovXG5cdGVudHJpZXM6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBoYXMgYmVlbiBzYXZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGEgc3BlY2lmaWMgZmF2b3JpdGUgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgdHlwZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UgPSBFbmRwb2ludEZhdm9yaXRlRW50cnk7XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IGV4dGVuZHMgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHNldFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgcmVtb3ZpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVSZW1vdmVSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSUZpbHRlck9wdGlvblR5cGUsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IE1hbmlmZXN0VHlwZUlkLCBQbGF0Zm9ybUFwcCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX0FQUCxcblx0dHlwZSBGYXZvcml0ZUNsaWVudCxcblx0dHlwZSBGYXZvcml0ZUVudHJ5LFxuXHR0eXBlIEZhdm9yaXRlSW5mbyxcblx0dHlwZSBGYXZvcml0ZVR5cGVOYW1lc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzT2JqZWN0LCBpc1N0cmluZ1ZhbHVlLCByYW5kb21VVUlEIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcsIEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYXBwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QXBwU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHVzZWQgdG8gZmlsdGVyIG91dCBieSB0YWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0hPTUVfVEFHX0ZJTFRFUlMgPSBcInRhZ3NcIjtcblxuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfcHJvdmlkZXJJZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogQXBwU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXNwb25zZT86IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgbWluIGxlbmd0aC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeU1pbkxlbmd0aD86IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeUFnYWluc3Q/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RDTElGaWx0ZXJzPzogQ0xJRmlsdGVyW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IGFwcCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEFwcFJlc3VsdHM/OiBQbGF0Zm9ybUFwcFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBsYXN0IHNldCBvZiByZXN1bHRzXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0SWRzPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgdGhlbWUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBTdWJzY3JpcHRpb24gaWQgZm9yIGZhdm9yaXRlLWNoYW5nZWQgbGlmZWN5Y2xlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBfZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcFByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3Byb3ZpZGVySWQgPSBkZWZpbml0aW9uLmlkO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFwidGhlbWUtY2hhbmdlZFwiLFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cygpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPVxuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQ8RmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdFx0YXN5bmMgKF86IHVua25vd24sIHBheWxvYWQ/OiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsIFwidGhlbWUtY2hhbmdlZFwiKTtcblx0XHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkLFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdGNvbnN0IGFwcFJlc3BvbnNlOiBIb21lU2VhcmNoUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMocXVlcnlMb3dlciwgZmlsdGVycywgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gYXBwUmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLmVuZHNXaXRoKFwiZmF2b3JpdGVcIikgJiYgcmVzdWx0LmRhdGE/LmFwcCkge1xuXHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cdFx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUuc3RhcnRzV2l0aChcInVuXCIpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocmVzdWx0LmRhdGE/LmZhdm9yaXRlSWQpICYmIGZhdm9yaXRlQ2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZShyZXN1bHQuZGF0YS5mYXZvcml0ZUlkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGZhdm9yaXRlQ2xpZW50LnNldFNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LnNldFNhdmVkRmF2b3JpdGUoe1xuXHRcdFx0XHRcdFx0XHRpZDogcmFuZG9tVVVJRCgpLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBGQVZPUklURV9UWVBFX05BTUVfQVBQLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHJlc3VsdC5rZXksXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiByZXN1bHQudGl0bGUsXG5cdFx0XHRcdFx0XHRcdGljb246IHJlc3VsdC5pY29uXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmxhdW5jaEFwcCkge1xuXHRcdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdFx0YXBwOiB7IGFwcElkPzogc3RyaW5nIH07XG5cdFx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRpZiAoZGF0YT8uYXBwPy5hcHBJZCkge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5sYXVuY2hBcHAoZGF0YS5hcHAuYXBwSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSByZXN1bHRzIGZvciB0aGUgYXBwcy5cblx0ICogQHBhcmFtIHF1ZXJ5TG93ZXIgVGhlIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIHF1ZXJ5IG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIG9wdGlvbnMuaXNTdWdnZXN0aW9uIElzIHRoZSBxdWVyeSBmcm9tIGEgc3VnZ2VzdGlvbi5cblx0ICogQHBhcmFtIGNhY2hlZEFwcHMgVGhlIGNhY2hlZCBhcHBzLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRSZXN1bHRzKFxuXHRcdHF1ZXJ5TG93ZXI6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHRcdGlzU3VnZ2VzdGlvbj86IGJvb2xlYW47XG5cdFx0fSxcblx0XHRjYWNoZWRBcHBzPzogUGxhdGZvcm1BcHBbXVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEFwcHMpIHtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zPy5xdWVyeU1pbkxlbmd0aDtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgPSBvcHRpb25zPy5xdWVyeUFnYWluc3Q7XG5cdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyA9IGZpbHRlcnM7XG5cblx0XHRcdGxldCBhcHBzOiBQbGF0Zm9ybUFwcFtdID0gY2FjaGVkQXBwcyA/PyAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEFwcHMoKSk7XG5cdFx0XHRsZXQgbWF0Y2hRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGZhdm9yaXRlSW5mbz8uaXNFbmFibGVkICYmXG5cdFx0XHRcdGlzU3RyaW5nVmFsdWUoZmF2b3JpdGVJbmZvPy5jb21tYW5kKSAmJlxuXHRcdFx0XHRxdWVyeUxvd2VyID09PSBmYXZvcml0ZUluZm8uY29tbWFuZCAmJlxuXHRcdFx0XHRmYXZvcml0ZUNsaWVudFxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IGZhdm9yaXRlQXBwcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXHRcdFx0XHRjb25zdCBmYXZJZHMgPSBmYXZvcml0ZUFwcHM/Lm1hcCgoZikgPT4gZi50eXBlSWQpID8/IFtdO1xuXHRcdFx0XHRhcHBzID0gYXBwcy5maWx0ZXIoKGEpID0+IGZhdklkcy5pbmNsdWRlcyhhLmFwcElkKSk7XG5cdFx0XHRcdG1hdGNoUXVlcnkgPSBcIlwiO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyA9IGFwcHM7XG5cdFx0XHRjb25zdCBhcHBTZWFyY2hFbnRyaWVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHMpO1xuXG5cdFx0XHRjb25zdCB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0XHRpZiAoYXBwU2VhcmNoRW50cmllcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGZpbmFsUmVzdWx0cyA9IGFwcFNlYXJjaEVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4ge1xuXHRcdFx0XHRcdGxldCB0ZXh0TWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdFx0bGV0IGZpbHRlck1hdGNoRm91bmQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0Y29uc3QgaXNDb21tYW5kID0gbWF0Y2hRdWVyeS5zdGFydHNXaXRoKFwiL1wiKTtcblxuXHRcdFx0XHRcdGlmIChtYXRjaFF1ZXJ5Lmxlbmd0aCA+PSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIHx8IGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0dGV4dE1hdGNoRm91bmQgPSBvcHRpb25zLnF1ZXJ5QWdhaW5zdC5zb21lKCh0YXJnZXQpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZW50cnlPYmplY3QgPSBlbnRyeSBhcyB1bmtub3duIGFzIHtcblx0XHRcdFx0XHRcdFx0XHRbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIHwgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRcdFx0XHRpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRWYWx1ZTogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH0gfCBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbnRyeU9iamVjdFtwYXRoWzBdXTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocGF0aC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBzcGVjaWZpZWRUYXJnZXQgPSBlbnRyeU9iamVjdFtwYXRoWzBdXSBhcyB7IFtpZDogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc09iamVjdChzcGVjaWZpZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgdGFyZ2V0VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHNwZWNpZmllZFRhcmdldCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUgPSBzcGVjaWZpZWRUYXJnZXRbcGF0aFsxXV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMobWF0Y2hRdWVyeSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlzU3RyaW5nVmFsdWUodGFyZ2V0VmFsdWVbMF0pICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUuc29tZSgobXQpID0+IG10LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChtYXRjaFF1ZXJ5KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGBNYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggc3BlY2lmaWVkIGEgcXVlcnlBZ2FpbnN0IHRhcmdldCB0aGF0IGlzIGFuIGFycmF5IGJ1dCBub3QgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gT25seSBzdHJpbmcgdmFsdWVzIGFuZCBhcnJheXMgYXJlIHN1cHBvcnRlZDogJHtKU09OLnN0cmluZ2lmeShcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNwZWNpZmllZFRhcmdldFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCl9YFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XHRcIlRoZSBtYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggaGFzIGEgcXVlcnlBZ2FpbnN0IGVudHJ5IHRoYXQgaGFzIGEgZGVwdGggZ3JlYXRlciB0aGFuIDEuIFlvdSBjYW4gc2VhcmNoIGZvciBlLmcuIGRhdGEudGFncyBpZiBkYXRhIGhhcyB0YWdzIGluIGl0IGFuZCBpdCBpcyBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCB0YWdGaWx0ZXJzID0gQXJyYXkuaXNBcnJheShmaWx0ZXJzKVxuXHRcdFx0XHRcdFx0PyBmaWx0ZXJzLmZpbHRlcigoZikgPT4gZi5pZCA9PT0gQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMpXG5cdFx0XHRcdFx0XHQ6IFtdO1xuXHRcdFx0XHRcdGlmICh0YWdGaWx0ZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGZpbHRlck1hdGNoRm91bmQgPSB0YWdGaWx0ZXJzLnNvbWUoKGZpbHRlcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbHRlci5vcHRpb25zLmV2ZXJ5KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQob3B0aW9uKSA9PiAhb3B0aW9uLmlzU2VsZWN0ZWQgfHwgZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhvcHRpb24udmFsdWUpXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChmaWx0ZXIub3B0aW9ucy5pc1NlbGVjdGVkICYmICFpc0VtcHR5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhmaWx0ZXIub3B0aW9ucy52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGV4dE1hdGNoRm91bmQgJiYgQXJyYXkuaXNBcnJheShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHR0YWdzLnB1c2goLi4uKGVudHJ5LmRhdGEuYXBwLnRhZ3MgYXMgc3RyaW5nW10pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRleHRNYXRjaEZvdW5kICYmIGZpbHRlck1hdGNoRm91bmQ7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBmaW5hbFJlc3VsdHMubWFwKChlbnRyeSkgPT4gZW50cnkua2V5KTtcblxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHJlc3VsdHM6IGZpbmFsUmVzdWx0cyxcblx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJzOiB0aGlzLmdldFNlYXJjaEZpbHRlcnModGFncy5maWx0ZXIoQm9vbGVhbikpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gW107XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtdLFxuXHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRmaWx0ZXJzOiBbXVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHNlYXJjaCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gdGFncyBUaGUgdGFncyB0byBjcmVhdGUgdGhlIGZpbHRlcnMgZnJvbS5cblx0ICogQHJldHVybnMgVGhlIGZpbHRlcnMuXG5cdCAqL1xuXHRwcml2YXRlIGdldFNlYXJjaEZpbHRlcnModGFnczogc3RyaW5nW10pOiBDTElGaWx0ZXJbXSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcblx0XHRcdGNvbnN0IGZpbHRlcnM6IENMSUZpbHRlcltdID0gW107XG5cdFx0XHRjb25zdCB1bmlxdWVUYWdzID0gWy4uLm5ldyBTZXQodGFncyldLnNvcnQoKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKSk7XG5cdFx0XHRjb25zdCB0YWdGaWx0ZXI6IENMSUZpbHRlciA9IHtcblx0XHRcdFx0aWQ6IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTLFxuXHRcdFx0XHR0aXRsZTogXCJUYWdzXCIsXG5cdFx0XHRcdHR5cGU6IFwiTXVsdGlTZWxlY3RcIiBhcyBDTElGaWx0ZXJPcHRpb25UeXBlLk11bHRpU2VsZWN0LFxuXHRcdFx0XHRvcHRpb25zOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChjb25zdCB0YWcgb2YgdW5pcXVlVGFncykge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdGaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHR0YWdGaWx0ZXIub3B0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdHZhbHVlOiB0YWcsXG5cdFx0XHRcdFx0XHRpc1NlbGVjdGVkOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZmlsdGVycy5wdXNoKHRhZ0ZpbHRlcik7XG5cdFx0XHRyZXR1cm4gZmlsdGVycztcblx0XHR9XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcHMgcGxhdGZvcm0gYXBwcyB0byBzZWFyY2ggcmVzdWx0cy5cblx0ICogQHBhcmFtIGFwcHMgVGhlIGFwcHMgdG8gY29udmVydC5cblx0ICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBtYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHM6IFBsYXRmb3JtQXBwW10pOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGNvbnN0IGFwcFJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IFtdO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHMpICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycykge1xuXHRcdFx0bGV0IHNhdmVkRmF2b3JpdGVzOiBGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ7XG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50LCBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblxuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdHNhdmVkRmF2b3JpdGVzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVJZCA9IHNhdmVkRmF2b3JpdGVzPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gYXBwLmFwcElkKT8uaWQ7XG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdFx0XHRcdGFwcCxcblx0XHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8ubWFuaWZlc3RUeXBlTWFwcGluZyxcblx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0ZmF2b3JpdGVJZFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAocmVzKSB7XG5cdFx0XHRcdFx0YXBwUmVzdWx0cy5wdXNoKHJlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFwcFJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogTWFwIGEgc2luZ2xlIGFwcCB0byBhIHNlYXJjaCByZXN1bHQuXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcCB0byBtYXAuXG5cdCAqIEBwYXJhbSB0eXBlTWFwcGluZyBUaGUgdHlwZSBtYXBwaW5ncyB0byBpbmNsdWRlLlxuXHQgKiBAcGFyYW0gZmF2SW5mbyBUaGUgZmF2b3JpdGVzIGluZm8gaWYgaXQgaXMgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlSWQgVGhlIGlkIG9mIHRoZSBmYXZvcml0ZS5cblx0ICogQHJldHVybnMgVGhlIHNlYXJjaCByZXN1bHQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJ5VG9TZWFyY2hFbnRyeShcblx0XHRhcHA6IFBsYXRmb3JtQXBwLFxuXHRcdHR5cGVNYXBwaW5nOiBBcHBNYW5pZmVzdFR5cGVNYXBwaW5nIHwgdW5kZWZpbmVkLFxuXHRcdGZhdkluZm86IEZhdm9yaXRlSW5mbyB8IHVuZGVmaW5lZCxcblx0XHRmYXZvcml0ZUlkOiBzdHJpbmcgfCB1bmRlZmluZWRcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0IHwgdW5kZWZpbmVkPiB7XG5cdFx0Y29uc3QgbWFuaWZlc3RUeXBlID0gYXBwLm1hbmlmZXN0VHlwZTtcblx0XHRpZiAoaXNTdHJpbmdWYWx1ZShtYW5pZmVzdFR5cGUpKSB7XG5cdFx0XHRjb25zdCBhY3Rpb24gPSB7IG5hbWU6IFwiTGF1bmNoIFZpZXdcIiwgaG90a2V5OiBcImVudGVyXCIgfTtcblx0XHRcdGNvbnN0IGVudHJ5OiBQYXJ0aWFsPEhvbWVTZWFyY2hSZXN1bHQ+ID0ge1xuXHRcdFx0XHRrZXk6IGFwcC5hcHBJZCxcblx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBBcHBQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHR0aXRsZTogYXBwLnRpdGxlLFxuXHRcdFx0XHRkYXRhOiB7IGFwcCwgcHJvdmlkZXJJZDogdGhpcy5fcHJvdmlkZXJJZCwgZmF2b3JpdGVJZCB9XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIWlzRW1wdHkodHlwZU1hcHBpbmcpKSB7XG5cdFx0XHRcdGNvbnN0IG1hbmlmZXN0VHlwZU1hcHBpbmcgPSB0eXBlTWFwcGluZ1ttYW5pZmVzdFR5cGUgYXMgTWFuaWZlc3RUeXBlSWRdO1xuXG5cdFx0XHRcdGlmICghaXNFbXB0eShtYW5pZmVzdFR5cGVNYXBwaW5nKSkge1xuXHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbCkpIHtcblx0XHRcdFx0XHRcdGVudHJ5LmxhYmVsID0gbWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWUpKSB7XG5cdFx0XHRcdFx0XHRhY3Rpb24ubmFtZSA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZW50cnkuYWN0aW9ucyA9IFthY3Rpb25dO1xuXHRcdFx0ZW50cnkuaWNvbiA9IHRoaXMuZ2V0QXBwSWNvbihhcHApO1xuXG5cdFx0XHRpZiAoIWlzRW1wdHkoYXBwLmRlc2NyaXB0aW9uKSkge1xuXHRcdFx0XHRlbnRyeS5kZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbjtcblx0XHRcdFx0ZW50cnkuc2hvcnREZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaGVhZGVyQnV0dG9uczogeyBpY29uOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xuXG5cdFx0XHRpZiAoZmF2SW5mbz8uZmF2b3JpdGVJY29uICYmIGZhdkluZm8udW5mYXZvcml0ZUljb24gJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzKSB7XG5cdFx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVJY29uID0gYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwoXG5cdFx0XHRcdFx0IWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBmYXZJbmZvLmZhdm9yaXRlSWNvbiA6IGZhdkluZm8udW5mYXZvcml0ZUljb25cblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRcdGhlYWRlckJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRpY29uOiBmYXZvcml0ZUljb24sXG5cdFx0XHRcdFx0XHRhY3Rpb246ICFpc0VtcHR5KGZhdm9yaXRlSWQpID8gXCJ1bmZhdm9yaXRlXCIgOiBcImZhdm9yaXRlXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRlbnRyeS50ZW1wbGF0ZSA9IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tO1xuXHRcdFx0ZW50cnkudGVtcGxhdGVDb250ZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQXBwKFxuXHRcdFx0XHRhcHAsXG5cdFx0XHRcdGVudHJ5Lmljb24gPz8gXCJcIixcblx0XHRcdFx0YWN0aW9uLm5hbWUsXG5cdFx0XHRcdGhlYWRlckJ1dHRvbnNcblx0XHRcdCk7XG5cblx0XHRcdHJldHVybiBlbnRyeSBhcyBIb21lU2VhcmNoUmVzdWx0O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGljb24gZm9yIGFuIGFwcGxpY2F0aW9uLlxuXHQgKiBAcGFyYW0gYXBwIFRoZSBhcHBsaWNhdGlvbiB0byBnZXQgdGhlIGljb24gZm9yLlxuXHQgKiBAcmV0dXJucyBUaGUgaWNvbi5cblx0ICovXG5cdHByaXZhdGUgZ2V0QXBwSWNvbihhcHA6IFBsYXRmb3JtQXBwKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaWNvbnMpICYmIGFwcC5pY29ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRyZXR1cm4gYXBwLmljb25zWzBdLnNyYztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVidWlsZCB0aGUgcmVzdWx0cyBpZiB0aGUgdGhlbWUgY2hhbmdlcy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVidWlsZFJlc3VsdHMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheSh0aGlzLl9sYXN0UmVzdWx0SWRzKSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5KSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdENMSUZpbHRlcnMpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0KSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoKSAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3VsdElkcylcblx0XHQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlYnVpbGRpbmcgcmVzdWx0cy4uLlwiKTtcblx0XHRcdGNvbnN0IGxhc3RSZXN1bHRJZHMgPSB0aGlzLl9sYXN0UmVzdWx0SWRzLnNsaWNlKCk7XG5cdFx0XHRjb25zdCBhcHBSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyxcblx0XHRcdFx0eyBxdWVyeU1pbkxlbmd0aDogdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBxdWVyeUFnYWluc3Q6IHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgfSxcblx0XHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHNcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByZW1vdmVSZXN1bHRJZHMgPSBsYXN0UmVzdWx0SWRzLmZpbHRlcigoaWQpID0+ICF0aGlzLl9sYXN0UmVzdWx0SWRzPy5pbmNsdWRlcyhpZCkpO1xuXHRcdFx0aWYgKHJlbW92ZVJlc3VsdElkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoLi4ucmVtb3ZlUmVzdWx0SWRzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKGFwcFJlc3BvbnNlLnJlc3VsdHMpO1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmVzdWx0cyByZWJ1aWx0LlwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBhcHAgYnV0dG9ucyBpZiB0aGUgZmF2b3JpdGVzIGhhdmUgY2hhbmdlZC5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgb2YgdGhlIGZhdm9yaXRlIGNoYW5nZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgdXBkYXRlQXBwRmF2b3JpdGVCdXR0b25zKHBheWxvYWQ6IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSA9IHBheWxvYWQuZmF2b3JpdGU7XG5cblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHQocGF5bG9hZC5hY3Rpb24gPT09IFwic2V0XCIgfHwgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpICYmXG5cdFx0XHQhaXNFbXB0eShmYXZvcml0ZSkgJiZcblx0XHRcdGZhdm9yaXRlLnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAgJiZcblx0XHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzICYmXG5cdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnNcblx0XHQpIHtcblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cblx0XHRcdGlmICh0aGlzLl9sYXN0UXVlcnkgPT09IGZhdm9yaXRlSW5mbz8uY29tbWFuZCAmJiBwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGZhdm9yaXRlLnR5cGVJZCk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3RBcHBSZXN1bHRzKSB7XG5cdFx0XHRcdGxldCBsYXN0QXBwID0gdGhpcy5fbGFzdEFwcFJlc3VsdHMuZmluZCgoYSkgPT4gYS5hcHBJZCA9PT0gZmF2b3JpdGUudHlwZUlkKTtcblxuXHRcdFx0XHQvLyBJZiBpdCB3YXNuJ3QgaW4gdGhlIGxhc3QgcmVzdWx0cyBhZGQgaXQsIGJ1dCBvbmx5IGlmIHdlIGFyZSBpbiBmYXYgY29tbWFuZFxuXHRcdFx0XHRpZiAoIWxhc3RBcHAgJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRBcHAgJiYgdGhpcy5fbGFzdFF1ZXJ5ID09PSBmYXZvcml0ZUluZm8/LmNvbW1hbmQpIHtcblx0XHRcdFx0XHRsYXN0QXBwID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEFwcChmYXZvcml0ZS50eXBlSWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KGxhc3RBcHApKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVidWlsdCA9IGF3YWl0IHRoaXMubWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdFx0XHRcdFx0bGFzdEFwcCxcblx0XHRcdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5tYW5pZmVzdFR5cGVNYXBwaW5nLFxuXHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvLFxuXHRcdFx0XHRcdFx0cGF5bG9hZC5hY3Rpb24gPT09IFwic2V0XCIgPyBmYXZvcml0ZS5pZCA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRpZiAocmVidWlsdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoW3JlYnVpbHRdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQgaWYgdGhleSBhcmUgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlVHlwZU5hbWVzIFRoZSB0eXBlIG9mIGNsaWVudCB0byBnZXQuXG5cdCAqIEByZXR1cm5zIFRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEZhdkluZm8oXG5cdFx0ZmF2b3JpdGVUeXBlTmFtZXM6IEZhdm9yaXRlVHlwZU5hbWVzXG5cdCk6IFByb21pc2U8eyBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkIH0+IHtcblx0XHRsZXQgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRcdGlmICgodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZmF2b3JpdGVzRW5hYmxlZCA/PyB0cnVlKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCgpO1xuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdGZhdm9yaXRlSW5mbyA9IGZhdm9yaXRlQ2xpZW50LmdldEluZm8oKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSW5mby5pc0VuYWJsZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpc1N1cHBvcnRlZCA9XG5cdFx0XHRcdFx0XHRpc0VtcHR5KGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMpIHx8IGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoZmF2b3JpdGVUeXBlTmFtZXMpO1xuXHRcdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCxcblx0XHRcdGZhdm9yaXRlSW5mb1xuXHRcdH07XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQXBwUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBBcHBQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBcHBQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9