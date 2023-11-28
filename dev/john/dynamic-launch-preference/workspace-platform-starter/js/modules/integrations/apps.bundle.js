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
    if (constraint.includes("url-none")) {
        return false;
    }
    if (constraint.includes("url-any")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("url-page")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("url-domain")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzdGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDbEIsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDekIsY0FBYyxHQUFHLFNBQVMsQ0FBQztvQkFDNUIsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUM7UUFFRCxPQUFPO1lBQ04sY0FBYztZQUNkLFlBQVk7U0FDWixDQUFDO0lBQ0gsQ0FBQzs7QUF6bkJEOzs7R0FHRztBQUNxQiwrQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFFaEQ7OztHQUdHO0FBQ3FCLDZCQUFpQixHQUFHLE1BQU0sQ0FBQzs7Ozs7OztTQzFDcEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040QztBQUVyQyxNQUFNLFdBQVcsR0FBa0M7SUFDekQsWUFBWSxFQUFFLElBQUkscURBQVcsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zaGFwZXNcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBBcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfQVBQID0gXCJhcHBcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBXb3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFID0gXCJ3b3Jrc3BhY2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBQYWdlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UgPSBcInBhZ2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBRdWVyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWSA9IFwicXVlcnlcIjtcblxuLyoqXG4gKiBOYW1lcyBmb3IgYWxsIHRoZSBmYXZvcml0ZSB0eXBlcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmF2b3JpdGVUeXBlTmFtZXMgPVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfQVBQXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSBmYXZvcml0ZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVByb3ZpZGVyT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJcyB0aGUgcHJvdmlkZXIgZW5hYmxlZCwgZGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGVuYWJsZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoaXMgaXMgYSBmYXZvcml0ZSBhY3Rpb25cblx0ICovXG5cdGZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0byB1c2UgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIGZhdm9yaXRlIGNhbiBiZSB1bnNldFxuXHQgKi9cblx0dW5mYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCBjb21tYW5kcyBzaG91bGQgaW50ZWdyYXRpb25zIGNoZWNrIGZvciBpZiB0aGV5IGludGVudCB0byBzdXBwb3J0IHRoZSBkaXNwbGF5IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0ZmF2b3JpdGVDb21tYW5kPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29ubmVjdGlvbiBwcm92aWRlciBjYW4gaGF2ZSBhY3Rpb25zIHJlZ2lzdGVyZWQgYWdhaW5zdCBpdCBmcm9tIHRoZSBwbGF0Zm9ybS4gVGhpcyBwcm92aWRlcyBhIGRlZmF1bHQgbGlzdCBvZlxuXHQgKiBhY3Rpb25zIHRoYXQgY29ubmVjdGlvbnMgc2hvdWxkIGJlIGFibGUgdG8gdXNlIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWQgZm9yIHRoYXQgY29ubmVjdGlvbi5cblx0ICovXG5cdHN1cHBvcnRlZEZhdm9yaXRlVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xufVxuXG4vKipcbiAqIFdoZW4gYW4gZW50cnkgaXMgbWFkZSBpdCByZXByZXNlbnRzIGEgdHlwZSBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybS4gVGhpcyBjYW4gYmUgdXNlZCB0byBsb29rdXAgYW5kIGxhdW5jaCB0aGUgdGhpbmcgdGhpcyBlbnRyeSByZWZlcnMgdG8uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBndWlkIHRvIHJlcHJlc2VudCB0aGlzIGZhdm9yaXRlIGVudHJ5IHNvIHRoYXQgaXQgY2FuIGJlIHVwZGF0ZWQgb3IgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZmF2b3JpdGUgdHlwZSB0aGlzIGVudHJ5IHJlcHJlc2VudHNcblx0ICovXG5cdHR5cGVJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IHR5cGUgb2YgZmF2b3JpdGUgZW50cnkgZG9lcyB0aGlzIGVudHJ5IHJlcHJlc2VudFxuXHQgKi9cblx0dHlwZTogRmF2b3JpdGVUeXBlTmFtZXM7XG5cblx0LyoqXG5cdCAqIFRoZSB0aW1lc3RhbXAgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdHRpbWVzdGFtcD86IERhdGU7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGxhYmVsIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGxhYmVsPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGljb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW5mbyB0byByZXR1cm4gdG8gaW50ZXJlc3RlZCBwYXJ0aWVzIHRvIGhlbHAgdGhlbSBzdXBwb3J0IGZhdm9yaXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlSW5mbyB7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gZmF2b3JpdGVcblx0ICovXG5cdGZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byByZW1vdmUgdGhpcyBmYXZvcml0ZVxuXHQgKi9cblx0dW5mYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBIGNvbW1hbmQgdGhhdCBzdXBwb3J0aW5nIG1vZHVsZXMgc2hvdWxkIGxpc3RlbiBmb3IgaWYgdGhleSBhcmUgdG8gZGlzcGxheSBmYXZvcml0ZXMgdGhhdCBmYWxsIHVuZGVyIHRoZW1cblx0ICovXG5cdGNvbW1hbmQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGF0IHR5cGVzIG9mIGZhdm9yaXRlIGl0ZW0gYXJlIHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLCB0aGlzIGFsc28gZGV0ZXJtaW5lcyB0aGUgb3JkZXJpbmcgaW4gdGhlIGRvY2sgbWVudS5cblx0ICovXG5cdGVuYWJsZWRUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG5cdC8qKlxuXHQgKiBJcyBmYXZvcml0ZSBzdXBwb3J0IGVuYWJsZWQgb24gdGhpcyBwbGF0Zm9ybS5cblx0ICovXG5cdGlzRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNsaWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHNvbWUgb3IgYWxsIG9mIHRoZSBmYXZvcml0ZSBmdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVDbGllbnQge1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uIGFib3V0IHdoZXRoZXIgZmF2b3JpdGVzIGFyZSBpbml0aWFsaXplZCBmb3IgdGhlIHBsYXRmb3JtIGFuZCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyBTdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0Z2V0SW5mbygpOiBGYXZvcml0ZUluZm87XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGFsbCAob3Igc29tZSBpZiBieSB0eXBlKSBvZiB0aGUgc2F2ZWQgZmF2b3JpdGVzXG5cdCAqIEBwYXJhbSBieVR5cGUgdGhlIHR5cGUgb2Ygc2F2ZWQgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzYXZlZCBmYXZvcml0ZXMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgaXQgd2FzIHVuYWJsZSB0byBnZXQgYW55IGJhY2tcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGVzKGJ5VHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhIHBhcnRpY3VsYXIgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgdGhlIHNhdmVkIGZhdm9yaXRlIGlmIGF2YWlsYWJsZSBvciBmYWxzZSBpZiBpdCBkaWRuJ3QgZXhpc3Rcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byBzYXZlIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZSB0aGUgRmF2b3JpdGUgeW91IHdpc2ggdG8gc2F2ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIHNhdmVkXG5cdCAqL1xuXHRzZXRTYXZlZEZhdm9yaXRlPyhmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZW1vdmUvZGVsZXRlIGEgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlIHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIGRlbGV0ZWQuXG5cdCAqL1xuXHRkZWxldGVTYXZlZEZhdm9yaXRlPyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmF2b3JpdGUgYW5kIG1ldGEgZGF0YSByZWxhdGVkIHRvIGl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHBsYXRmb3JtIHByb3ZpZGluZyB0aGUgcGF5bG9hZC5cblx0ICovXG5cdG1ldGFEYXRhOiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTtcblx0LyoqXG5cdCAqIFRoZSBmYXZvcml0ZSBlbnRyeVxuXHQgKi9cblx0cGF5bG9hZDogRmF2b3JpdGVFbnRyeTtcbn1cblxuLyoqXG4gKiBBIHJlcXVlc3QgdHlwZSBmb3IgdGhlIEZhdm9yaXRlRW5kcG9pbnQgdGhhdCBnZXRzIGFsbCBzYXZlZCBmYXZvcml0ZSBlbnRyaWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHR5cGUgaWYgc3BlY2lmaWVkIHNob3VsZCBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzcG9uc2UgdG8gb25seSBzZW5kIHRoZSBlbnRyaWVzIHRoYXQgYXJlIHJlbGV2YW50XG5cdCAqL1xuXHRmYXZvcml0ZVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlcyB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSB7XG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiBmYXZvcml0ZSBlbnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb2Ygd2hhdCBwbGF0Zm9ybSB2ZXJzaW9ucyB0aGV5IHdlcmUgb3JpZ2luYWxseSBzYXZlZCBhZ2FpbnN0XG5cdCAqL1xuXHRlbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXTtcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaGFzIGJlZW4gc2F2ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBhIHNwZWNpZmljIGZhdm9yaXRlIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IHR5cGUgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlID0gRW5kcG9pbnRGYXZvcml0ZUVudHJ5O1xuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCBleHRlbmRzIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSBzZXRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIHJlbW92aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEEgd2F5IG9mIHNwZWNpZnkgdGhlIHJ1bGVzIGFyb3VuZCB0aGUgdmFsaWRhdGlvbi5cbiAqIERPTUFJTiBtZWFucyB0aGF0IHRoZSB1cmwgbXVzdCBjb21lIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICogUEFHRSBtZWFucyB0aGF0IHRoZSB1cmxzIG11c3QgbWF0Y2ggdGhlIHNhbWUgb3JpZ2luIGFuZCBwYXRoLlxuICogQU5ZIG1lYW5zIHlvdSBhcmUgYWxsb3dlZCB0byByZXBsYWNlIG9uZSB1cmwgd2l0aCBhbm90aGVyIHdpdGhvdXQgY29uc3RyYWluLlxuICogTk9ORSBtZWFucyB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCB0aGUgdXJsIGlzIG5vdCBjaGFuZ2VkLlxuICovXG5leHBvcnQgdHlwZSBWYWxpZFVSTENvbnN0cmFpbnQgPSBcInVybC1kb21haW5cIiB8IFwidXJsLXBhZ2VcIiB8IFwidXJsLWFueVwiIHwgXCJ1cmwtbm9uZVwiO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc3VnZ2VzdGVkIHVybCB0byBzZWUgaWYgaXQgY2FuIHJlcGxhY2UgdGhlIHNvdXJjZSB1cmwuXG4gKiBAcGFyYW0gc291cmNlVXJsIHRoZSBvcmlnaW5hbCB1cmwgdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHN1Z2dlc3RlZFVybCB0aGUgc3VnZ2VzdGVkIHVybCB0byByZXBsYWNlIGl0IHdpdGguXG4gKiBAcGFyYW0gY29uc3RyYWludCB0aGUgcnVsZXMgdG8gYXBwbHkgYWdhaW5zdCBpdC5cbiAqIEByZXR1cm5zIHdoZXRoZXIgaXQgaXMgb2sgdG8gcmVwbGFjZSB0aGUgc291cmNlVXJsIHdpdGggdGhlIHN1Z2dlc3RlZFVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFVybChcblx0c291cmNlVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHN1Z2dlc3RlZFVybDogc3RyaW5nLFxuXHRjb25zdHJhaW50OiBWYWxpZFVSTENvbnN0cmFpbnRbXSB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG5cdGlmIChpc0VtcHR5KHN1Z2dlc3RlZFVybCkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKCFBcnJheS5pc0FycmF5KGNvbnN0cmFpbnQpIHx8IGNvbnN0cmFpbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtbm9uZVwiKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1hbnlcIikpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoaXNFbXB0eShzb3VyY2VVcmwpKSB7XG5cdFx0Ly8gaWYgd2UgYXJlIGFib3V0IHRvIGRvIGEgZG9tYWluIHJlbGF0ZWQgY2hlY2sgdGhlbiB3ZSBuZWVkIGEgc291cmNlIHVybFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCB2YWxpZGF0ZWRTb3VyY2VVcmwgPSBuZXcgVVJMKHNvdXJjZVVybCk7XG5cdGNvbnN0IHZhbGlkYXRlZFN1Z2dlc3RlZFVybCA9IG5ldyBVUkwoc3VnZ2VzdGVkVXJsKTtcblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1wYWdlXCIpKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCh2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luICsgdmFsaWRhdGVkU291cmNlVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpID09PVxuXHRcdFx0KHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHQpO1xuXHR9XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtZG9tYWluXCIpKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gPT09IHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW47XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJRmlsdGVyT3B0aW9uVHlwZSxcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgTWFuaWZlc3RUeXBlSWQsIFBsYXRmb3JtQXBwIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQge1xuXHRGQVZPUklURV9UWVBFX05BTUVfQVBQLFxuXHR0eXBlIEZhdm9yaXRlQ2xpZW50LFxuXHR0eXBlIEZhdm9yaXRlRW50cnksXG5cdHR5cGUgRmF2b3JpdGVJbmZvLFxuXHR0eXBlIEZhdm9yaXRlVHlwZU5hbWVzXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEludGVncmF0aW9uSGVscGVycyxcblx0SW50ZWdyYXRpb25Nb2R1bGUsXG5cdEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvblxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbGlmZWN5Y2xlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQXBwTWFuaWZlc3RUeXBlTWFwcGluZywgQXBwU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBhcHBzLlxuICovXG5leHBvcnQgY2xhc3MgQXBwUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxBcHBTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGRlZmF1bHQgYmFzZSBzY29yZSBmb3Igb3JkZXJpbmcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RFRkFVTFRfQkFTRV9TQ09SRSA9IDA7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdXNlZCB0byBmaWx0ZXIgb3V0IGJ5IHRhZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfSE9NRV9UQUdfRklMVEVSUyA9IFwidGFnc1wiO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9wcm92aWRlcklkPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPEFwcFNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBBcHBTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5QWdhaW5zdD86IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdENMSUZpbHRlcnM/OiBDTElGaWx0ZXJbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgYXBwIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0QXBwUmVzdWx0cz86IFBsYXRmb3JtQXBwW107XG5cblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGxhc3Qgc2V0IG9mIHJlc3VsdHNcblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXN1bHRJZHM/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogU3Vic2NyaXB0aW9uIGlkIGZvciB0aGVtZS1jaGFuZ2VkIGxpZmVjeWNsZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgZmF2b3JpdGUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXBwUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fcHJvdmlkZXJJZCA9IGRlZmluaXRpb24uaWQ7XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XCJ0aGVtZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkPihcblx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRhc3luYyAoXzogdW5rbm93biwgcGF5bG9hZD86IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpID0+IHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkKSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCwgXCJ0aGVtZS1jaGFuZ2VkXCIpO1xuXHRcdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIG9wdGlvbnMuaXNTdWdnZXN0aW9uIElzIHRoZSBxdWVyeSBmcm9tIGEgc3VnZ2VzdGlvbi5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0Y29uc3QgYXBwUmVzcG9uc2U6IEhvbWVTZWFyY2hSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhxdWVyeUxvd2VyLCBmaWx0ZXJzLCBvcHRpb25zKTtcblxuXHRcdHJldHVybiBhcHBSZXNwb25zZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUuZW5kc1dpdGgoXCJmYXZvcml0ZVwiKSAmJiByZXN1bHQuZGF0YT8uYXBwKSB7XG5cdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5zdGFydHNXaXRoKFwidW5cIikpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShyZXN1bHQuZGF0YT8uZmF2b3JpdGVJZCkgJiYgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKHJlc3VsdC5kYXRhLmZhdm9yaXRlSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSh7XG5cdFx0XHRcdFx0XHRcdGlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHR5cGU6IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAsXG5cdFx0XHRcdFx0XHRcdHR5cGVJZDogcmVzdWx0LmtleSxcblx0XHRcdFx0XHRcdFx0bGFiZWw6IHJlc3VsdC50aXRsZSxcblx0XHRcdFx0XHRcdFx0aWNvbjogcmVzdWx0Lmljb25cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8ubGF1bmNoQXBwKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0XHRhcHA6IHsgYXBwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRcdGlmIChkYXRhPy5hcHA/LmFwcElkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaEFwcChkYXRhLmFwcC5hcHBJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHJlc3VsdHMgZm9yIHRoZSBhcHBzLlxuXHQgKiBAcGFyYW0gcXVlcnlMb3dlciBUaGUgcXVlcnkuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcXVlcnkgb3B0aW9ucy5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5pc1N1Z2dlc3Rpb24gSXMgdGhlIHF1ZXJ5IGZyb20gYSBzdWdnZXN0aW9uLlxuXHQgKiBAcGFyYW0gY2FjaGVkQXBwcyBUaGUgY2FjaGVkIGFwcHMuXG5cdCAqIEByZXR1cm5zIFRoZSBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldFJlc3VsdHMoXG5cdFx0cXVlcnlMb3dlcjogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9LFxuXHRcdGNhY2hlZEFwcHM/OiBQbGF0Zm9ybUFwcFtdXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0QXBwcykge1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnM/LnF1ZXJ5TWluTGVuZ3RoO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCA9IG9wdGlvbnM/LnF1ZXJ5QWdhaW5zdDtcblx0XHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzID0gZmlsdGVycztcblxuXHRcdFx0bGV0IGFwcHM6IFBsYXRmb3JtQXBwW10gPSBjYWNoZWRBcHBzID8/IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0QXBwcygpKTtcblx0XHRcdGxldCBtYXRjaFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0ZmF2b3JpdGVJbmZvPy5pc0VuYWJsZWQgJiZcblx0XHRcdFx0aXNTdHJpbmdWYWx1ZShmYXZvcml0ZUluZm8/LmNvbW1hbmQpICYmXG5cdFx0XHRcdHF1ZXJ5TG93ZXIgPT09IGZhdm9yaXRlSW5mby5jb21tYW5kICYmXG5cdFx0XHRcdGZhdm9yaXRlQ2xpZW50XG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVBcHBzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCk7XG5cdFx0XHRcdGNvbnN0IGZhdklkcyA9IGZhdm9yaXRlQXBwcz8ubWFwKChmKSA9PiBmLnR5cGVJZCkgPz8gW107XG5cdFx0XHRcdGFwcHMgPSBhcHBzLmZpbHRlcigoYSkgPT4gZmF2SWRzLmluY2x1ZGVzKGEuYXBwSWQpKTtcblx0XHRcdFx0bWF0Y2hRdWVyeSA9IFwiXCI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzID0gYXBwcztcblx0XHRcdGNvbnN0IGFwcFNlYXJjaEVudHJpZXMgPSBhd2FpdCB0aGlzLm1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwcyk7XG5cblx0XHRcdGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gW107XG5cblx0XHRcdGlmIChhcHBTZWFyY2hFbnRyaWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgZmluYWxSZXN1bHRzID0gYXBwU2VhcmNoRW50cmllcy5maWx0ZXIoKGVudHJ5KSA9PiB7XG5cdFx0XHRcdFx0bGV0IHRleHRNYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0XHRsZXQgZmlsdGVyTWF0Y2hGb3VuZCA9IHRydWU7XG5cblx0XHRcdFx0XHRjb25zdCBpc0NvbW1hbmQgPSBtYXRjaFF1ZXJ5LnN0YXJ0c1dpdGgoXCIvXCIpO1xuXG5cdFx0XHRcdFx0aWYgKG1hdGNoUXVlcnkubGVuZ3RoID49IG9wdGlvbnMucXVlcnlNaW5MZW5ndGggfHwgaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHR0ZXh0TWF0Y2hGb3VuZCA9IG9wdGlvbnMucXVlcnlBZ2FpbnN0LnNvbWUoKHRhcmdldCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbnRyeU9iamVjdCA9IGVudHJ5IGFzIHVua25vd24gYXMge1xuXHRcdFx0XHRcdFx0XHRcdFtpZDogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfCB7IFtpZDogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdChcIi5cIik7XG5cdFx0XHRcdFx0XHRcdGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldFZhbHVlOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfSB8IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkID1cblx0XHRcdFx0XHRcdFx0XHRcdGVudHJ5T2JqZWN0W3BhdGhbMF1dO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGFyZ2V0VmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5zdGFydHNXaXRoKG1hdGNoUXVlcnkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKG1hdGNoUXVlcnkpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHNwZWNpZmllZFRhcmdldCA9IGVudHJ5T2JqZWN0W3BhdGhbMF1dIGFzIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzT2JqZWN0KHNwZWNpZmllZFRhcmdldCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCB0YXJnZXRWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoc3BlY2lmaWVkVGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZSA9IHNwZWNpZmllZFRhcmdldFtwYXRoWzFdXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGFyZ2V0VmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5zdGFydHNXaXRoKG1hdGNoUXVlcnkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhtYXRjaFF1ZXJ5KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZS5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aXNTdHJpbmdWYWx1ZSh0YXJnZXRWYWx1ZVswXSkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZS5zb21lKChtdCkgPT4gbXQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKG1hdGNoUXVlcnkpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YE1hbmlmZXN0IGNvbmZpZ3VyYXRpb24gZm9yIHNlYXJjaCBzcGVjaWZpZWQgYSBxdWVyeUFnYWluc3QgdGFyZ2V0IHRoYXQgaXMgYW4gYXJyYXkgYnV0IG5vdCBhbiBhcnJheSBvZiBzdHJpbmdzLiBPbmx5IHN0cmluZyB2YWx1ZXMgYW5kIGFycmF5cyBhcmUgc3VwcG9ydGVkOiAke0pTT04uc3RyaW5naWZ5KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3BlY2lmaWVkVGFyZ2V0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KX1gXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdFwiVGhlIG1hbmlmZXN0IGNvbmZpZ3VyYXRpb24gZm9yIHNlYXJjaCBoYXMgYSBxdWVyeUFnYWluc3QgZW50cnkgdGhhdCBoYXMgYSBkZXB0aCBncmVhdGVyIHRoYW4gMS4gWW91IGNhbiBzZWFyY2ggZm9yIGUuZy4gZGF0YS50YWdzIGlmIGRhdGEgaGFzIHRhZ3MgaW4gaXQgYW5kIGl0IGlzIGVpdGhlciBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXCJcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IHRhZ0ZpbHRlcnMgPSBBcnJheS5pc0FycmF5KGZpbHRlcnMpXG5cdFx0XHRcdFx0XHQ/IGZpbHRlcnMuZmlsdGVyKChmKSA9PiBmLmlkID09PSBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUylcblx0XHRcdFx0XHRcdDogW107XG5cdFx0XHRcdFx0aWYgKHRhZ0ZpbHRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0ZmlsdGVyTWF0Y2hGb3VuZCA9IHRhZ0ZpbHRlcnMuc29tZSgoZmlsdGVyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5vcHRpb25zKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsdGVyLm9wdGlvbnMuZXZlcnkoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdChvcHRpb24pID0+ICFvcHRpb24uaXNTZWxlY3RlZCB8fCBlbnRyeS5kYXRhLmFwcC50YWdzLmluY2x1ZGVzKG9wdGlvbi52YWx1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGZpbHRlci5vcHRpb25zLmlzU2VsZWN0ZWQgJiYgIWlzRW1wdHkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBlbnRyeS5kYXRhLmFwcC50YWdzLmluY2x1ZGVzKGZpbHRlci5vcHRpb25zLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0ZXh0TWF0Y2hGb3VuZCAmJiBBcnJheS5pc0FycmF5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHRcdHRhZ3MucHVzaCguLi4oZW50cnkuZGF0YS5hcHAudGFncyBhcyBzdHJpbmdbXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGV4dE1hdGNoRm91bmQgJiYgZmlsdGVyTWF0Y2hGb3VuZDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IGZpbmFsUmVzdWx0cy5tYXAoKGVudHJ5KSA9PiBlbnRyeS5rZXkpO1xuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVzdWx0czogZmluYWxSZXN1bHRzLFxuXHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdGZpbHRlcnM6IHRoaXMuZ2V0U2VhcmNoRmlsdGVycyh0YWdzLmZpbHRlcihCb29sZWFuKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBbXTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogW10sXG5cdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdGZpbHRlcnM6IFtdXG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgc2VhcmNoIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSB0YWdzIFRoZSB0YWdzIHRvIGNyZWF0ZSB0aGUgZmlsdGVycyBmcm9tLlxuXHQgKiBAcmV0dXJucyBUaGUgZmlsdGVycy5cblx0ICovXG5cdHByaXZhdGUgZ2V0U2VhcmNoRmlsdGVycyh0YWdzOiBzdHJpbmdbXSk6IENMSUZpbHRlcltdIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdzKSkge1xuXHRcdFx0Y29uc3QgZmlsdGVyczogQ0xJRmlsdGVyW10gPSBbXTtcblx0XHRcdGNvbnN0IHVuaXF1ZVRhZ3MgPSBbLi4ubmV3IFNldCh0YWdzKV0uc29ydCgoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpKTtcblx0XHRcdGNvbnN0IHRhZ0ZpbHRlcjogQ0xJRmlsdGVyID0ge1xuXHRcdFx0XHRpZDogQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMsXG5cdFx0XHRcdHRpdGxlOiBcIlRhZ3NcIixcblx0XHRcdFx0dHlwZTogXCJNdWx0aVNlbGVjdFwiIGFzIENMSUZpbHRlck9wdGlvblR5cGUuTXVsdGlTZWxlY3QsXG5cdFx0XHRcdG9wdGlvbnM6IFtdXG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGNvbnN0IHRhZyBvZiB1bmlxdWVUYWdzKSB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ0ZpbHRlci5vcHRpb25zKSkge1xuXHRcdFx0XHRcdHRhZ0ZpbHRlci5vcHRpb25zLnB1c2goe1xuXHRcdFx0XHRcdFx0dmFsdWU6IHRhZyxcblx0XHRcdFx0XHRcdGlzU2VsZWN0ZWQ6IHRydWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmaWx0ZXJzLnB1c2godGFnRmlsdGVyKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogTWFwcyBwbGF0Zm9ybSBhcHBzIHRvIHNlYXJjaCByZXN1bHRzLlxuXHQgKiBAcGFyYW0gYXBwcyBUaGUgYXBwcyB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwczogUGxhdGZvcm1BcHBbXSk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgYXBwUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykgJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzKSB7XG5cdFx0XHRsZXQgc2F2ZWRGYXZvcml0ZXM6IEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZDtcblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9BUFApO1xuXG5cdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0c2F2ZWRGYXZvcml0ZXMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBhcHAuYXBwSWQpPy5pZDtcblx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyeVRvU2VhcmNoRW50cnkoXG5cdFx0XHRcdFx0YXBwLFxuXHRcdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5tYW5pZmVzdFR5cGVNYXBwaW5nLFxuXHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRmYXZvcml0ZUlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChyZXMpIHtcblx0XHRcdFx0XHRhcHBSZXN1bHRzLnB1c2gocmVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwUmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXAgYSBzaW5nbGUgYXBwIHRvIGEgc2VhcmNoIHJlc3VsdC5cblx0ICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIG1hcC5cblx0ICogQHBhcmFtIHR5cGVNYXBwaW5nIFRoZSB0eXBlIG1hcHBpbmdzIHRvIGluY2x1ZGUuXG5cdCAqIEBwYXJhbSBmYXZJbmZvIFRoZSBmYXZvcml0ZXMgaW5mbyBpZiBpdCBpcyBlbmFibGVkLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGVJZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlLlxuXHQgKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cnlUb1NlYXJjaEVudHJ5KFxuXHRcdGFwcDogUGxhdGZvcm1BcHAsXG5cdFx0dHlwZU1hcHBpbmc6IEFwcE1hbmlmZXN0VHlwZU1hcHBpbmcgfCB1bmRlZmluZWQsXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQgfCB1bmRlZmluZWQ+IHtcblx0XHRjb25zdCBtYW5pZmVzdFR5cGUgPSBhcHAubWFuaWZlc3RUeXBlO1xuXHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZSkpIHtcblx0XHRcdGNvbnN0IGFjdGlvbiA9IHsgbmFtZTogXCJMYXVuY2ggVmlld1wiLCBob3RrZXk6IFwiZW50ZXJcIiB9O1xuXHRcdFx0Y29uc3QgZW50cnk6IFBhcnRpYWw8SG9tZVNlYXJjaFJlc3VsdD4gPSB7XG5cdFx0XHRcdGtleTogYXBwLmFwcElkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IEFwcFByb3ZpZGVyLl9ERUZBVUxUX0JBU0VfU0NPUkUsXG5cdFx0XHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0XHRcdGRhdGE6IHsgYXBwLCBwcm92aWRlcklkOiB0aGlzLl9wcm92aWRlcklkLCBmYXZvcml0ZUlkIH1cblx0XHRcdH07XG5cblx0XHRcdGlmICghaXNFbXB0eSh0eXBlTWFwcGluZykpIHtcblx0XHRcdFx0Y29uc3QgbWFuaWZlc3RUeXBlTWFwcGluZyA9IHR5cGVNYXBwaW5nW21hbmlmZXN0VHlwZSBhcyBNYW5pZmVzdFR5cGVJZF07XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KG1hbmlmZXN0VHlwZU1hcHBpbmcpKSB7XG5cdFx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUobWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsKSkge1xuXHRcdFx0XHRcdFx0ZW50cnkubGFiZWwgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSkpIHtcblx0XHRcdFx0XHRcdGFjdGlvbi5uYW1lID0gbWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRlbnRyeS5hY3Rpb25zID0gW2FjdGlvbl07XG5cdFx0XHRlbnRyeS5pY29uID0gdGhpcy5nZXRBcHBJY29uKGFwcCk7XG5cblx0XHRcdGlmICghaXNFbXB0eShhcHAuZGVzY3JpcHRpb24pKSB7XG5cdFx0XHRcdGVudHJ5LmRlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHRlbnRyeS5zaG9ydERlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbiAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMpIHtcblx0XHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblxuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGVudHJ5LnRlbXBsYXRlID0gXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b207XG5cdFx0XHRlbnRyeS50ZW1wbGF0ZUNvbnRlbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnRlbXBsYXRlSGVscGVycy5jcmVhdGVBcHAoXG5cdFx0XHRcdGFwcCxcblx0XHRcdFx0ZW50cnkuaWNvbiA/PyBcIlwiLFxuXHRcdFx0XHRhY3Rpb24ubmFtZSxcblx0XHRcdFx0aGVhZGVyQnV0dG9uc1xuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIGVudHJ5IGFzIEhvbWVTZWFyY2hSZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgaWNvbiBmb3IgYW4gYXBwbGljYXRpb24uXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIGdldCB0aGUgaWNvbiBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBpY29uLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGlmIHRoZSB0aGVtZSBjaGFuZ2VzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoaXMuX2xhc3RSZXN1bHRJZHMpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnkpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0Q0xJRmlsdGVycykgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeUFnYWluc3QpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzdWx0SWRzKVxuXHRcdCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmVidWlsZGluZyByZXN1bHRzLi4uXCIpO1xuXHRcdFx0Y29uc3QgbGFzdFJlc3VsdElkcyA9IHRoaXMuX2xhc3RSZXN1bHRJZHMuc2xpY2UoKTtcblx0XHRcdGNvbnN0IGFwcFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXN1bHRzKFxuXHRcdFx0XHR0aGlzLl9sYXN0UXVlcnksXG5cdFx0XHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzLFxuXHRcdFx0XHR7IHF1ZXJ5TWluTGVuZ3RoOiB0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgsIHF1ZXJ5QWdhaW5zdDogdGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCB9LFxuXHRcdFx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0c1xuXHRcdFx0KTtcblx0XHRcdGNvbnN0IHJlbW92ZVJlc3VsdElkcyA9IGxhc3RSZXN1bHRJZHMuZmlsdGVyKChpZCkgPT4gIXRoaXMuX2xhc3RSZXN1bHRJZHM/LmluY2x1ZGVzKGlkKSk7XG5cdFx0XHRpZiAocmVtb3ZlUmVzdWx0SWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZSguLi5yZW1vdmVSZXN1bHRJZHMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoYXBwUmVzcG9uc2UucmVzdWx0cyk7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZXN1bHRzIHJlYnVpbHQuXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGFwcCBidXR0b25zIGlmIHRoZSBmYXZvcml0ZXMgaGF2ZSBjaGFuZ2VkLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBvZiB0aGUgZmF2b3JpdGUgY2hhbmdlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyB1cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZDogRmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5ID0gcGF5bG9hZC5mYXZvcml0ZTtcblxuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoaXMuX2xhc3RSZXNwb25zZSkgJiZcblx0XHRcdChwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiB8fCBwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikgJiZcblx0XHRcdCFpc0VtcHR5KGZhdm9yaXRlKSAmJlxuXHRcdFx0ZmF2b3JpdGUudHlwZSA9PT0gRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCAmJlxuXHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMgJiZcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVyc1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfQVBQKTtcblxuXHRcdFx0aWYgKHRoaXMuX2xhc3RRdWVyeSA9PT0gZmF2b3JpdGVJbmZvPy5jb21tYW5kICYmIHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoZmF2b3JpdGUudHlwZUlkKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fbGFzdEFwcFJlc3VsdHMpIHtcblx0XHRcdFx0bGV0IGxhc3RBcHAgPSB0aGlzLl9sYXN0QXBwUmVzdWx0cy5maW5kKChhKSA9PiBhLmFwcElkID09PSBmYXZvcml0ZS50eXBlSWQpO1xuXG5cdFx0XHRcdC8vIElmIGl0IHdhc24ndCBpbiB0aGUgbGFzdCByZXN1bHRzIGFkZCBpdCwgYnV0IG9ubHkgaWYgd2UgYXJlIGluIGZhdiBjb21tYW5kXG5cdFx0XHRcdGlmICghbGFzdEFwcCAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEFwcCAmJiB0aGlzLl9sYXN0UXVlcnkgPT09IGZhdm9yaXRlSW5mbz8uY29tbWFuZCkge1xuXHRcdFx0XHRcdGxhc3RBcHAgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0QXBwKGZhdm9yaXRlLnR5cGVJZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdEFwcCkpIHtcblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyeVRvU2VhcmNoRW50cnkoXG5cdFx0XHRcdFx0XHRsYXN0QXBwLFxuXHRcdFx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/Lm1hbmlmZXN0VHlwZU1hcHBpbmcsXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChyZWJ1aWx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChbcmVidWlsdF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudCBpZiB0aGV5IGFyZSBlbmFibGVkLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGVUeXBlTmFtZXMgVGhlIHR5cGUgb2YgY2xpZW50IHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0RmF2SW5mbyhcblx0XHRmYXZvcml0ZVR5cGVOYW1lczogRmF2b3JpdGVUeXBlTmFtZXNcblx0KTogUHJvbWlzZTx7IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDsgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQgfT4ge1xuXHRcdGxldCBmYXZvcml0ZUluZm86IEZhdm9yaXRlSW5mbyB8IHVuZGVmaW5lZDtcblx0XHRsZXQgZmF2b3JpdGVDbGllbnQ6IEZhdm9yaXRlQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdFx0aWYgKCh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5mYXZvcml0ZXNFbmFibGVkID8/IHRydWUpICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0RmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEZhdm9yaXRlQ2xpZW50KCk7XG5cdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gZmF2b3JpdGVDbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJbmZvLmlzRW5hYmxlZCkge1xuXHRcdFx0XHRcdGNvbnN0IGlzU3VwcG9ydGVkID1cblx0XHRcdFx0XHRcdGlzRW1wdHkoZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcykgfHwgZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcy5pbmNsdWRlcyhmYXZvcml0ZVR5cGVOYW1lcyk7XG5cdFx0XHRcdFx0aWYgKCFpc1N1cHBvcnRlZCkge1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVDbGllbnQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50LFxuXHRcdFx0ZmF2b3JpdGVJbmZvXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHBQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IEFwcFByb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IEFwcFByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=