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
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
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


/***/ }),

/***/ "./client/src/modules/integrations/pages/integration.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/integrations/pages/integration.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PagesProvider: () => (/* binding */ PagesProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/favorite-shapes */ "./client/src/framework/shapes/favorite-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Implement the integration provider for pages.
 */
class PagesProvider {
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
        this._logger = loggerCreator("PagesProvider");
        this._definition = definition;
        if (this._integrationHelpers.subscribeLifecycleEvent) {
            this._integrationHelpers.subscribeLifecycleEvent("page-changed", async (platform, payload) => {
                if (payload?.action === "create") {
                    await this.rebuildResults(platform);
                }
                else if (payload?.action === "update") {
                    const lastResult = this._lastResults?.find((res) => res.key === payload.id);
                    if (lastResult && payload.page) {
                        lastResult.title = payload.page.title;
                        lastResult.data.workspaceTitle = payload.page.title;
                        lastResult.templateContent.data.title = payload.page.title;
                        this.resultAddUpdate([lastResult]);
                        const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                        if (favoriteClient?.setSavedFavorite) {
                            const saved = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                            const favorite = await saved?.find((f) => f.typeId === payload.id);
                            if (favorite) {
                                favorite.label = payload.page.title;
                                await favoriteClient.setSavedFavorite(favorite);
                            }
                        }
                    }
                }
                else if (payload?.action === "delete") {
                    this.resultRemove(payload.id);
                    const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                    if (favoriteClient?.deleteSavedFavorite) {
                        const saved = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                        const favorite = await saved?.find((f) => f.typeId === payload.id);
                        if (favorite) {
                            await favoriteClient.deleteSavedFavorite(favorite.id);
                        }
                    }
                }
            });
            this._themeChangedSubscriptionId = this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
                if (this._integrationHelpers?.getPlatform) {
                    const platform = this._integrationHelpers.getPlatform();
                    await this.rebuildResults(platform);
                }
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
        let pageResults = [];
        if (this._integrationHelpers?.getPlatform) {
            const platform = this._integrationHelpers.getPlatform();
            const queryLower = query.toLowerCase();
            const queryMinLength = options?.queryMinLength ?? 3;
            let pages = await platform.Storage.getPages();
            let matchQuery = queryLower;
            this._lastResponse = lastResponse;
            this._lastQuery = queryLower;
            this._lastQueryMinLength = queryMinLength;
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
            if (favoriteInfo?.isEnabled &&
                (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(favoriteInfo?.command) &&
                queryLower === favoriteInfo.command &&
                favoriteClient) {
                const favoriteApps = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
                pages = pages.filter((a) => favIds.includes(a.pageId));
                matchQuery = "";
            }
            pageResults = await this.buildResults(pages, matchQuery, queryMinLength);
            this._lastResults = pageResults;
        }
        return {
            results: pageResults
        };
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
            if (result.action.name.endsWith("favorite") && result.data?.pageId) {
                const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
                if (favoriteClient) {
                    if (result.action.name.startsWith("un")) {
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(result.data?.favoriteId) && favoriteClient.deleteSavedFavorite) {
                            await favoriteClient.deleteSavedFavorite(result.data.favoriteId);
                        }
                    }
                    else if (favoriteClient.setSavedFavorite) {
                        await favoriteClient.setSavedFavorite({
                            id: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.randomUUID)(),
                            type: workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE,
                            typeId: result.key,
                            label: result.title,
                            icon: this._settings?.images.page
                        });
                    }
                    handled = true;
                }
            }
            else {
                const data = result.data;
                if (data?.pageId) {
                    handled = true;
                    if (result.action.name === PagesProvider._ACTION_LAUNCH_PAGE) {
                        if (this._integrationHelpers?.getPlatform && this._integrationHelpers?.launchPage) {
                            await this._integrationHelpers.launchPage(data.pageId, undefined, this._logger);
                        }
                    }
                    else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
                        if (this._integrationHelpers?.getPlatform) {
                            const platform = this._integrationHelpers.getPlatform();
                            await platform.Storage.deletePage(data.pageId);
                            // Deleting the page will eventually trigger the "delete" lifecycle
                            // event which will remove it from the result list
                        }
                    }
                    else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE &&
                        this._integrationHelpers?.getShareClient) {
                        const shareClient = await this._integrationHelpers.getShareClient();
                        if (shareClient) {
                            await shareClient.share("page", { pageId: data.pageId });
                        }
                    }
                    else {
                        handled = false;
                        this._logger?.warn(`Unrecognized action for page selection: ${data.pageId}`);
                    }
                }
            }
        }
        return handled;
    }
    /**
     * Get the template for a page.
     * @param id The id of the item.
     * @param title The title of the page.
     * @param shareEnabled Is sharing enabled.
     * @param favInfo The favorites info if it is enabled.
     * @param favoriteId The id of the favorite.
     * @returns The home result.
     */
    async getPageTemplate(id, title, shareEnabled, favInfo, favoriteId) {
        if (this._integrationHelpers && this._settings) {
            const actions = [
                {
                    name: PagesProvider._ACTION_LAUNCH_PAGE,
                    hotkey: "Enter"
                },
                {
                    name: PagesProvider._ACTION_DELETE_PAGE,
                    hotkey: "CmdOrCtrl+Shift+D"
                }
            ];
            const actionButtons = [
                {
                    title: "Launch",
                    action: PagesProvider._ACTION_LAUNCH_PAGE
                },
                {
                    title: "Delete",
                    action: PagesProvider._ACTION_DELETE_PAGE
                }
            ];
            if (shareEnabled) {
                actions.push({
                    name: PagesProvider._ACTION_SHARE_PAGE,
                    hotkey: "CmdOrCtrl+Shift+S"
                });
                actionButtons.push({
                    title: "Share",
                    action: PagesProvider._ACTION_SHARE_PAGE
                });
            }
            const themeClient = await this._integrationHelpers.getThemeClient();
            const icon = await themeClient.themeUrl(this._settings.images.page);
            const headerButtons = [];
            if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
                const favoriteIcon = await themeClient.themeUrl(!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon);
                if (favoriteIcon) {
                    headerButtons.push({
                        icon: favoriteIcon,
                        action: !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteId) ? "unfavorite" : "favorite"
                    });
                }
            }
            const layoutData = await this._integrationHelpers.templateHelpers.createLayout(title, icon, [await this._integrationHelpers.templateHelpers.createText("instructions")], actionButtons, headerButtons);
            return {
                key: id,
                score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
                title,
                label: "Page",
                icon,
                actions,
                data: {
                    providerId: this._definition?.id,
                    pageTitle: title,
                    pageId: id,
                    tags: ["page"],
                    favoriteId
                },
                template: "Custom",
                templateContent: {
                    layout: layoutData.layout,
                    data: {
                        ...layoutData.data,
                        instructions: "Use the buttons below to interact with your saved page"
                    }
                }
            };
        }
        return {
            key: id,
            score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
            title,
            label: "Page",
            actions: [],
            data: {
                providerId: this._definition?.id,
                pageTitle: title,
                pageId: id,
                tags: ["page"]
            },
            template: "Plain",
            templateContent: undefined
        };
    }
    /**
     * Rebuild the results after color scheme change.
     * @param platform The workspace platform.
     */
    async rebuildResults(platform) {
        if (this._integrationHelpers && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQuery) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQueryMinLength)) {
            const pages = await platform.Storage.getPages();
            const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength);
            this.resultAddUpdate(results);
        }
    }
    /**
     * Build the results for the pages.
     * @param pages The list of workspaces to build the results for.
     * @param query The query.
     * @param queryMinLength The min query length.
     * @returns The list of home search results.
     */
    async buildResults(pages, query, queryMinLength) {
        let results = [];
        if (this._integrationHelpers && Array.isArray(pages)) {
            let shareEnabled = false;
            if (this._integrationHelpers?.getShareClient) {
                const shareClient = await this._integrationHelpers.getShareClient();
                if (shareClient) {
                    shareEnabled = await shareClient.typeEnabled("page");
                }
            }
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
            let savedFavorites;
            if (favoriteClient) {
                savedFavorites = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
            }
            const pgsProm = pages
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(async (pg) => {
                const favoriteId = savedFavorites?.find((f) => f.typeId === pg.pageId)?.id;
                return this.getPageTemplate(pg.pageId, pg.title, shareEnabled, favoriteInfo, favoriteId);
            });
            results = await Promise.all(pgsProm);
        }
        return results;
    }
    /**
     * Add or update a result.
     * @param results The results to add or update.
     */
    resultAddUpdate(results) {
        if (this._lastResults) {
            for (const result of results) {
                const resultIndex = this._lastResults.findIndex((res) => res.key === result.key);
                if (resultIndex >= 0) {
                    this._lastResults.splice(resultIndex, 1, result);
                }
                else {
                    this._lastResults.push(result);
                }
            }
        }
        if (this._lastResponse) {
            this._lastResponse.respond(results);
        }
    }
    /**
     * Remove a result.
     * @param id The id of the item to remove.
     */
    resultRemove(id) {
        if (this._lastResults) {
            const resultIndex = this._lastResults.findIndex((res) => res.key === id);
            if (resultIndex >= 0) {
                this._lastResults.splice(resultIndex, 1);
            }
        }
        if (this._lastResponse) {
            this._lastResponse.revoke(id);
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
            favorite.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE &&
            this._lastResults &&
            this._integrationHelpers) {
            const { favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_PAGE);
            if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
                this._lastResponse.revoke(favorite.typeId);
            }
            else if (this._lastResults) {
                const lastPage = this._lastResults.find((pg) => pg.key === favorite.typeId);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(lastPage)) {
                    let shareEnabled = false;
                    if (this._integrationHelpers?.getShareClient) {
                        const shareClient = await this._integrationHelpers.getShareClient();
                        if (shareClient) {
                            shareEnabled = await shareClient.typeEnabled("page");
                        }
                    }
                    const rebuilt = await this.getPageTemplate(lastPage.key, lastPage.title, shareEnabled, favoriteInfo, payload.action === "set" ? favorite.id : undefined);
                    this._lastResponse.respond([rebuilt]);
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
PagesProvider._DEFAULT_BASE_SCORE = 200;
/**
 * The key to use for launching a page.
 * @internal
 */
PagesProvider._ACTION_LAUNCH_PAGE = "Launch Page";
/**
 * The key to use for deleting a page.
 * @internal
 */
PagesProvider._ACTION_DELETE_PAGE = "Delete Page";
/**
 * The key to use for sharing a page.
 * @internal
 */
PagesProvider._ACTION_SHARE_PAGE = "Share Page";


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
/*!********************************************************!*\
  !*** ./client/src/modules/integrations/pages/index.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/pages/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.PagesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPO1lBQ04sY0FBYztZQUNkLFlBQVk7U0FDWixDQUFDO0lBQ0gsQ0FBQzs7QUF0bEJEOzs7R0FHRztBQUNxQixpQ0FBbUIsR0FBRyxHQUFHLENBQUM7QUFFbEQ7OztHQUdHO0FBQ3FCLGlDQUFtQixHQUFHLGFBQWEsQ0FBQztBQUU1RDs7O0dBR0c7QUFDcUIsaUNBQW1CLEdBQUcsYUFBYSxDQUFDO0FBRTVEOzs7R0FHRztBQUNxQixnQ0FBa0IsR0FBRyxZQUFZLENBQUM7Ozs7Ozs7U0N6RDNEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFFdkMsTUFBTSxXQUFXLEdBQW9DO0lBQzNELFlBQVksRUFBRSxJQUFJLHVEQUFhLEVBQUU7Q0FDakMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9wYWdlcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3BhZ2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zaGFwZXNcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBBcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfQVBQID0gXCJhcHBcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBXb3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFID0gXCJ3b3Jrc3BhY2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBQYWdlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UgPSBcInBhZ2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBRdWVyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWSA9IFwicXVlcnlcIjtcblxuLyoqXG4gKiBOYW1lcyBmb3IgYWxsIHRoZSBmYXZvcml0ZSB0eXBlcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmF2b3JpdGVUeXBlTmFtZXMgPVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfQVBQXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSBmYXZvcml0ZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVByb3ZpZGVyT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJcyB0aGUgcHJvdmlkZXIgZW5hYmxlZCwgZGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGVuYWJsZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoaXMgaXMgYSBmYXZvcml0ZSBhY3Rpb25cblx0ICovXG5cdGZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0byB1c2UgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIGZhdm9yaXRlIGNhbiBiZSB1bnNldFxuXHQgKi9cblx0dW5mYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCBjb21tYW5kcyBzaG91bGQgaW50ZWdyYXRpb25zIGNoZWNrIGZvciBpZiB0aGV5IGludGVudCB0byBzdXBwb3J0IHRoZSBkaXNwbGF5IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0ZmF2b3JpdGVDb21tYW5kPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29ubmVjdGlvbiBwcm92aWRlciBjYW4gaGF2ZSBhY3Rpb25zIHJlZ2lzdGVyZWQgYWdhaW5zdCBpdCBmcm9tIHRoZSBwbGF0Zm9ybS4gVGhpcyBwcm92aWRlcyBhIGRlZmF1bHQgbGlzdCBvZlxuXHQgKiBhY3Rpb25zIHRoYXQgY29ubmVjdGlvbnMgc2hvdWxkIGJlIGFibGUgdG8gdXNlIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWQgZm9yIHRoYXQgY29ubmVjdGlvbi5cblx0ICovXG5cdHN1cHBvcnRlZEZhdm9yaXRlVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xufVxuXG4vKipcbiAqIFdoZW4gYW4gZW50cnkgaXMgbWFkZSBpdCByZXByZXNlbnRzIGEgdHlwZSBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybS4gVGhpcyBjYW4gYmUgdXNlZCB0byBsb29rdXAgYW5kIGxhdW5jaCB0aGUgdGhpbmcgdGhpcyBlbnRyeSByZWZlcnMgdG8uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBndWlkIHRvIHJlcHJlc2VudCB0aGlzIGZhdm9yaXRlIGVudHJ5IHNvIHRoYXQgaXQgY2FuIGJlIHVwZGF0ZWQgb3IgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZmF2b3JpdGUgdHlwZSB0aGlzIGVudHJ5IHJlcHJlc2VudHNcblx0ICovXG5cdHR5cGVJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IHR5cGUgb2YgZmF2b3JpdGUgZW50cnkgZG9lcyB0aGlzIGVudHJ5IHJlcHJlc2VudFxuXHQgKi9cblx0dHlwZTogRmF2b3JpdGVUeXBlTmFtZXM7XG5cblx0LyoqXG5cdCAqIFRoZSB0aW1lc3RhbXAgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdHRpbWVzdGFtcD86IERhdGU7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGxhYmVsIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGxhYmVsPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGljb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW5mbyB0byByZXR1cm4gdG8gaW50ZXJlc3RlZCBwYXJ0aWVzIHRvIGhlbHAgdGhlbSBzdXBwb3J0IGZhdm9yaXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlSW5mbyB7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gZmF2b3JpdGVcblx0ICovXG5cdGZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byByZW1vdmUgdGhpcyBmYXZvcml0ZVxuXHQgKi9cblx0dW5mYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBIGNvbW1hbmQgdGhhdCBzdXBwb3J0aW5nIG1vZHVsZXMgc2hvdWxkIGxpc3RlbiBmb3IgaWYgdGhleSBhcmUgdG8gZGlzcGxheSBmYXZvcml0ZXMgdGhhdCBmYWxsIHVuZGVyIHRoZW1cblx0ICovXG5cdGNvbW1hbmQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGF0IHR5cGVzIG9mIGZhdm9yaXRlIGl0ZW0gYXJlIHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLCB0aGlzIGFsc28gZGV0ZXJtaW5lcyB0aGUgb3JkZXJpbmcgaW4gdGhlIGRvY2sgbWVudS5cblx0ICovXG5cdGVuYWJsZWRUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG5cdC8qKlxuXHQgKiBJcyBmYXZvcml0ZSBzdXBwb3J0IGVuYWJsZWQgb24gdGhpcyBwbGF0Zm9ybS5cblx0ICovXG5cdGlzRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNsaWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHNvbWUgb3IgYWxsIG9mIHRoZSBmYXZvcml0ZSBmdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVDbGllbnQge1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uIGFib3V0IHdoZXRoZXIgZmF2b3JpdGVzIGFyZSBpbml0aWFsaXplZCBmb3IgdGhlIHBsYXRmb3JtIGFuZCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyBTdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0Z2V0SW5mbygpOiBGYXZvcml0ZUluZm87XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGFsbCAob3Igc29tZSBpZiBieSB0eXBlKSBvZiB0aGUgc2F2ZWQgZmF2b3JpdGVzXG5cdCAqIEBwYXJhbSBieVR5cGUgdGhlIHR5cGUgb2Ygc2F2ZWQgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzYXZlZCBmYXZvcml0ZXMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgaXQgd2FzIHVuYWJsZSB0byBnZXQgYW55IGJhY2tcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGVzKGJ5VHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhIHBhcnRpY3VsYXIgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgdGhlIHNhdmVkIGZhdm9yaXRlIGlmIGF2YWlsYWJsZSBvciBmYWxzZSBpZiBpdCBkaWRuJ3QgZXhpc3Rcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byBzYXZlIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZSB0aGUgRmF2b3JpdGUgeW91IHdpc2ggdG8gc2F2ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIHNhdmVkXG5cdCAqL1xuXHRzZXRTYXZlZEZhdm9yaXRlPyhmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZW1vdmUvZGVsZXRlIGEgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlIHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIGRlbGV0ZWQuXG5cdCAqL1xuXHRkZWxldGVTYXZlZEZhdm9yaXRlPyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmF2b3JpdGUgYW5kIG1ldGEgZGF0YSByZWxhdGVkIHRvIGl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHBsYXRmb3JtIHByb3ZpZGluZyB0aGUgcGF5bG9hZC5cblx0ICovXG5cdG1ldGFEYXRhOiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTtcblx0LyoqXG5cdCAqIFRoZSBmYXZvcml0ZSBlbnRyeVxuXHQgKi9cblx0cGF5bG9hZDogRmF2b3JpdGVFbnRyeTtcbn1cblxuLyoqXG4gKiBBIHJlcXVlc3QgdHlwZSBmb3IgdGhlIEZhdm9yaXRlRW5kcG9pbnQgdGhhdCBnZXRzIGFsbCBzYXZlZCBmYXZvcml0ZSBlbnRyaWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHR5cGUgaWYgc3BlY2lmaWVkIHNob3VsZCBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzcG9uc2UgdG8gb25seSBzZW5kIHRoZSBlbnRyaWVzIHRoYXQgYXJlIHJlbGV2YW50XG5cdCAqL1xuXHRmYXZvcml0ZVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlcyB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSB7XG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiBmYXZvcml0ZSBlbnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb2Ygd2hhdCBwbGF0Zm9ybSB2ZXJzaW9ucyB0aGV5IHdlcmUgb3JpZ2luYWxseSBzYXZlZCBhZ2FpbnN0XG5cdCAqL1xuXHRlbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXTtcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaGFzIGJlZW4gc2F2ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBhIHNwZWNpZmljIGZhdm9yaXRlIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IHR5cGUgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlID0gRW5kcG9pbnRGYXZvcml0ZUVudHJ5O1xuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCBleHRlbmRzIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSBzZXRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIHJlbW92aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIERvIGEgZGVlcCBjb21wYXJpc29uIG9mIHRoZSBvYmplY3RzLlxuICogQHBhcmFtIG9iajEgVGhlIGZpcnN0IG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIG9iajIgVGhlIHNlY29uZCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBtYXRjaFByb3BlcnR5T3JkZXIgSWYgdHJ1ZSB0aGUgcHJvcGVydGllcyBtdXN0IGJlIGluIHRoZSBzYW1lIG9yZGVyLlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgb2JqZWN0cyBhcmUgdGhlIHNhbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWwob2JqMTogdW5rbm93biwgb2JqMjogdW5rbm93biwgbWF0Y2hQcm9wZXJ0eU9yZGVyOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xuXHRpZiAoaXNPYmplY3Qob2JqMSkgJiYgaXNPYmplY3Qob2JqMikpIHtcblx0XHRjb25zdCBvYmpLZXlzMSA9IE9iamVjdC5rZXlzKG9iajEpO1xuXHRcdGNvbnN0IG9iaktleXMyID0gT2JqZWN0LmtleXMob2JqMik7XG5cblx0XHRpZiAob2JqS2V5czEubGVuZ3RoICE9PSBvYmpLZXlzMi5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAobWF0Y2hQcm9wZXJ0eU9yZGVyICYmIEpTT04uc3RyaW5naWZ5KG9iaktleXMxKSAhPT0gSlNPTi5zdHJpbmdpZnkob2JqS2V5czIpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBrZXkgb2Ygb2JqS2V5czEpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRjb25zdCB2YWx1ZTEgPSAob2JqMSBhcyBhbnkpW2tleV07XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUyID0gKG9iajIgYXMgYW55KVtrZXldO1xuXG5cdFx0XHRpZiAoIWRlZXBFcXVhbCh2YWx1ZTEsIHZhbHVlMiwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMSkgJiYgQXJyYXkuaXNBcnJheShvYmoyKSkge1xuXHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIWRlZXBFcXVhbChvYmoxW2ldLCBvYmoyW2ldLCBtYXRjaFByb3BlcnR5T3JkZXIpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqMSkgPT09IEpTT04uc3RyaW5naWZ5KG9iajIpO1xufVxuXG4vKipcbiAqIERlZXAgbWVyZ2UgdHdvIG9iamVjdHMuXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSBvYmplY3QgdG8gYmUgbWVyZ2VkIGludG8uXG4gKiBAcGFyYW0gc291cmNlcyBUaGUgb2JqZWN0cyB0byBtZXJnZSBpbnRvIHRoZSB0YXJnZXQuXG4gKiBAcmV0dXJucyBUaGUgbWVyZ2VkIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNZXJnZTxUID0gdW5rbm93bj4odGFyZ2V0OiBULCAuLi5zb3VyY2VzOiBUW10pOiBUIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZXMpIHx8IHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHRhcmdldEFzTWFwID0gdGFyZ2V0IGFzIHsgW2lkOiBzdHJpbmddOiB1bmtub3duIH07XG5cdGNvbnN0IHNvdXJjZSA9IHNvdXJjZXMuc2hpZnQoKTtcblxuXHRsZXQga2V5cztcblx0aWYgKGlzT2JqZWN0KHRhcmdldEFzTWFwKSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcblx0XHRcdHJldHVybiBzb3VyY2U7XG5cdFx0fVxuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpLm1hcCgoaykgPT4gTnVtYmVyLnBhcnNlSW50KGssIDEwKSk7XG5cdH1cblxuXHRpZiAoa2V5cykge1xuXHRcdGNvbnN0IHNvdXJjZUFzTWFwID0gc291cmNlIGFzIHsgW2lkOiBzdHJpbmddOiB1bmtub3duIH07XG5cdFx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2VBc01hcFtrZXldO1xuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoaXNFbXB0eSh0YXJnZXRBc01hcFtrZXldKSkge1xuXHRcdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWVwTWVyZ2UodGFyZ2V0QXNNYXBba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoaXNFbXB0eSh0YXJnZXRBc01hcFtrZXldKSkge1xuXHRcdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWVwTWVyZ2UodGFyZ2V0QXNNYXBba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0QXNNYXBba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkZWVwTWVyZ2UodGFyZ2V0LCAuLi5zb3VyY2VzKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSBnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0Q3VzdG9tVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgUGFnZSwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQge1xuXHRGQVZPUklURV9UWVBFX05BTUVfUEFHRSxcblx0dHlwZSBGYXZvcml0ZUNsaWVudCxcblx0dHlwZSBGYXZvcml0ZUVudHJ5LFxuXHR0eXBlIEZhdm9yaXRlSW5mbyxcblx0dHlwZSBGYXZvcml0ZVR5cGVOYW1lc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQsXG5cdFBhZ2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZXNTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIHBhZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFBhZ2VzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAyMDA7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBsYXVuY2hpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fTEFVTkNIX1BBR0UgPSBcIkxhdW5jaCBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBkZWxldGluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9ERUxFVEVfUEFHRSA9IFwiRGVsZXRlIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNoYXJpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0hBUkVfUEFHRSA9IFwiU2hhcmUgUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPFBhZ2VzU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBQYWdlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0cz86IEhvbWVTZWFyY2hSZXN1bHRbXTtcblxuXHQvKipcblx0ICogU3Vic2NyaXB0aW9uIGlkIGZvciB0aGVtZS1jaGFuZ2VkIGxpZmVjeWNsZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgZmF2b3JpdGUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJQYWdlc1Byb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50PFBhZ2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFwicGFnZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdGFzeW5jIChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsIHBheWxvYWQ/OiBQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdFx0XHRpZiAocGF5bG9hZD8uYWN0aW9uID09PSBcImNyZWF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbGFzdFJlc3VsdCA9IHRoaXMuX2xhc3RSZXN1bHRzPy5maW5kKChyZXMpID0+IHJlcy5rZXkgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0aWYgKGxhc3RSZXN1bHQgJiYgcGF5bG9hZC5wYWdlKSB7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQudGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQuZGF0YS53b3Jrc3BhY2VUaXRsZSA9IHBheWxvYWQucGFnZS50aXRsZTtcblx0XHRcdFx0XHRcdFx0KGxhc3RSZXN1bHQudGVtcGxhdGVDb250ZW50IGFzIEN1c3RvbVRlbXBsYXRlKS5kYXRhLnRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKFtsYXN0UmVzdWx0XSk7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50Py5zZXRTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGUgPSBhd2FpdCBzYXZlZD8uZmluZCgoZikgPT4gZi50eXBlSWQgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChmYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmF2b3JpdGUubGFiZWwgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5zZXRTYXZlZEZhdm9yaXRlKGZhdm9yaXRlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRSZW1vdmUocGF5bG9hZC5pZCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQ/LmRlbGV0ZVNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGZhdm9yaXRlID0gYXdhaXQgc2F2ZWQ/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBwYXlsb2FkLmlkKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZShmYXZvcml0ZS5pZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XCJ0aGVtZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPVxuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQ8RmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdFx0YXN5bmMgKF86IHVua25vd24sIHBheWxvYWQ/OiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsIFwidGhlbWUtY2hhbmdlZFwiKTtcblx0XHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkLFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0Pzogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRsZXQgcGFnZVJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IFtdO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0pIHtcblx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjb25zdCBxdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnM/LnF1ZXJ5TWluTGVuZ3RoID8/IDM7XG5cblx0XHRcdGxldCBwYWdlczogUGFnZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlcygpO1xuXHRcdFx0bGV0IG1hdGNoUXVlcnkgPSBxdWVyeUxvd2VyO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gcXVlcnlNaW5MZW5ndGg7XG5cblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRmYXZvcml0ZUluZm8/LmlzRW5hYmxlZCAmJlxuXHRcdFx0XHRpc1N0cmluZ1ZhbHVlKGZhdm9yaXRlSW5mbz8uY29tbWFuZCkgJiZcblx0XHRcdFx0cXVlcnlMb3dlciA9PT0gZmF2b3JpdGVJbmZvLmNvbW1hbmQgJiZcblx0XHRcdFx0ZmF2b3JpdGVDbGllbnRcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUFwcHMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cdFx0XHRcdGNvbnN0IGZhdklkcyA9IGZhdm9yaXRlQXBwcz8ubWFwKChmKSA9PiBmLnR5cGVJZCkgPz8gW107XG5cdFx0XHRcdHBhZ2VzID0gcGFnZXMuZmlsdGVyKChhKSA9PiBmYXZJZHMuaW5jbHVkZXMoYS5wYWdlSWQpKTtcblx0XHRcdFx0bWF0Y2hRdWVyeSA9IFwiXCI7XG5cdFx0XHR9XG5cblx0XHRcdHBhZ2VSZXN1bHRzID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMocGFnZXMsIG1hdGNoUXVlcnksIHF1ZXJ5TWluTGVuZ3RoKTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgPSBwYWdlUmVzdWx0cztcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogcGFnZVJlc3VsdHNcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5lbmRzV2l0aChcImZhdm9yaXRlXCIpICYmIHJlc3VsdC5kYXRhPy5wYWdlSWQpIHtcblx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5zdGFydHNXaXRoKFwidW5cIikpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShyZXN1bHQuZGF0YT8uZmF2b3JpdGVJZCkgJiYgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKHJlc3VsdC5kYXRhLmZhdm9yaXRlSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSh7XG5cdFx0XHRcdFx0XHRcdGlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHR5cGU6IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHJlc3VsdC5rZXksXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiByZXN1bHQudGl0bGUsXG5cdFx0XHRcdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5pbWFnZXMucGFnZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0XHRwYWdlSWQ/OiBzdHJpbmc7XG5cdFx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRpZiAoZGF0YT8ucGFnZUlkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0UpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8ubGF1bmNoUGFnZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoUGFnZShkYXRhLnBhZ2VJZCwgdW5kZWZpbmVkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShkYXRhLnBhZ2VJZCk7XG5cdFx0XHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSBwYWdlIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdFx0XHQvLyBldmVudCB3aGljaCB3aWxsIHJlbW92ZSBpdCBmcm9tIHRoZSByZXN1bHQgbGlzdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdFx0XHRyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFICYmXG5cdFx0XHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFNoYXJlQ2xpZW50XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGFyZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRTaGFyZUNsaWVudCgpO1xuXHRcdFx0XHRcdFx0aWYgKHNoYXJlQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHNoYXJlQ2xpZW50LnNoYXJlKFwicGFnZVwiLCB7IHBhZ2VJZDogZGF0YS5wYWdlSWQgfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3IgcGFnZSBzZWxlY3Rpb246ICR7ZGF0YS5wYWdlSWR9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSB0ZW1wbGF0ZSBmb3IgYSBwYWdlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBpdGVtLlxuXHQgKiBAcGFyYW0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBwYWdlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBob21lIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0UGFnZVRlbXBsYXRlKFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRzaGFyZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIHRoaXMuX3NldHRpbmdzKSB7XG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHRcdGNvbnN0IGFjdGlvbkJ1dHRvbnM6IHsgdGl0bGU6IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwiTGF1bmNoXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0Vcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIkRlbGV0ZVwiLFxuXHRcdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9QQUdFXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZVwiLFxuXHRcdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cdFx0XHRjb25zdCBpY29uID0gYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLnBhZ2UpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxheW91dERhdGEgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUxheW91dChcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdFthd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXCJpbnN0cnVjdGlvbnNcIildLFxuXHRcdFx0XHRhY3Rpb25CdXR0b25zLFxuXHRcdFx0XHRoZWFkZXJCdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRrZXk6IGlkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFBhZ2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGxhYmVsOiBcIlBhZ2VcIixcblx0XHRcdFx0aWNvbixcblx0XHRcdFx0YWN0aW9ucyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRcdHBhZ2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0XHR0YWdzOiBbXCJwYWdlXCJdLFxuXHRcdFx0XHRcdGZhdm9yaXRlSWRcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0XHRsYXlvdXQ6IGxheW91dERhdGEubGF5b3V0LFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdC4uLmxheW91dERhdGEuZGF0YSxcblx0XHRcdFx0XHRcdGluc3RydWN0aW9uczogXCJVc2UgdGhlIGJ1dHRvbnMgYmVsb3cgdG8gaW50ZXJhY3Qgd2l0aCB5b3VyIHNhdmVkIHBhZ2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogaWQsXG5cdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFBhZ2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiUGFnZVwiLFxuXHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRwYWdlVGl0bGU6IHRpdGxlLFxuXHRcdFx0XHRwYWdlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJwYWdlXCJdXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IFwiUGxhaW5cIiBhcyBDTElUZW1wbGF0ZS5QbGFpbixcblx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGFmdGVyIGNvbG9yIHNjaGVtZSBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgd29ya3NwYWNlIHBsYXRmb3JtLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmICFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiYgIWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoKSkge1xuXHRcdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmJ1aWxkUmVzdWx0cyhwYWdlcywgdGhpcy5fbGFzdFF1ZXJ5LCB0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpO1xuXHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHRoZSByZXN1bHRzIGZvciB0aGUgcGFnZXMuXG5cdCAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiB3b3Jrc3BhY2VzIHRvIGJ1aWxkIHRoZSByZXN1bHRzIGZvci5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeS5cblx0ICogQHBhcmFtIHF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW4gcXVlcnkgbGVuZ3RoLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBob21lIHNlYXJjaCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGFnZXM6IFBhZ2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXJcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIEFycmF5LmlzQXJyYXkocGFnZXMpKSB7XG5cdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRTaGFyZUNsaWVudCkge1xuXHRcdFx0XHRjb25zdCBzaGFyZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRTaGFyZUNsaWVudCgpO1xuXHRcdFx0XHRpZiAoc2hhcmVDbGllbnQpIHtcblx0XHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCBzaGFyZUNsaWVudC50eXBlRW5hYmxlZChcInBhZ2VcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0bGV0IHNhdmVkRmF2b3JpdGVzOiBGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ7XG5cblx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRzYXZlZEZhdm9yaXRlcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGdzUHJvbSA9IHBhZ2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHBnKSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8IChxdWVyeS5sZW5ndGggPj0gcXVlcnlNaW5MZW5ndGggJiYgcGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpXG5cdFx0XHRcdClcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSlcblx0XHRcdFx0Lm1hcChhc3luYyAocGc6IFBhZ2UpID0+IHtcblx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBwZy5wYWdlSWQpPy5pZDtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFBhZ2VUZW1wbGF0ZShwZy5wYWdlSWQsIHBnLnRpdGxlLCBzaGFyZUVuYWJsZWQsIGZhdm9yaXRlSW5mbywgZmF2b3JpdGVJZCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwocGdzUHJvbSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9yIHVwZGF0ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIHJlc3VsdHMgVGhlIHJlc3VsdHMgdG8gYWRkIG9yIHVwZGF0ZS5cblx0ICovXG5cdHByaXZhdGUgcmVzdWx0QWRkVXBkYXRlKHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Zm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSByZXN1bHQua2V5KTtcblx0XHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKHJlc3VsdHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSByZXN1bHQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gcmVtb3ZlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRSZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gaWQpO1xuXHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShpZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgYXBwIGJ1dHRvbnMgaWYgdGhlIGZhdm9yaXRlcyBoYXZlIGNoYW5nZWQuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIG9mIHRoZSBmYXZvcml0ZSBjaGFuZ2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkOiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkgPSBwYXlsb2FkLmZhdm9yaXRlO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0KHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiIHx8IHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSAmJlxuXHRcdFx0IWlzRW1wdHkoZmF2b3JpdGUpICYmXG5cdFx0XHRmYXZvcml0ZS50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfUEFHRSAmJlxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgJiZcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVyc1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cblx0XHRcdGlmICh0aGlzLl9sYXN0UXVlcnkgPT09IGZhdm9yaXRlSW5mbz8uY29tbWFuZCAmJiBwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGZhdm9yaXRlLnR5cGVJZCk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRcdGNvbnN0IGxhc3RQYWdlID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZCgocGcpID0+IHBnLmtleSA9PT0gZmF2b3JpdGUudHlwZUlkKTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdFBhZ2UpKSB7XG5cdFx0XHRcdFx0bGV0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFNoYXJlQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGFyZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRTaGFyZUNsaWVudCgpO1xuXHRcdFx0XHRcdFx0aWYgKHNoYXJlQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCA9IGF3YWl0IHNoYXJlQ2xpZW50LnR5cGVFbmFibGVkKFwicGFnZVwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5nZXRQYWdlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHRsYXN0UGFnZS5rZXksXG5cdFx0XHRcdFx0XHRsYXN0UGFnZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRcdHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiID8gZmF2b3JpdGUuaWQgOiB1bmRlZmluZWRcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoW3JlYnVpbHRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudCBpZiB0aGV5IGFyZSBlbmFibGVkLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGVUeXBlTmFtZXMgVGhlIHR5cGUgb2YgY2xpZW50IHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIGZhdm9yaXRlIGluZm8gYW5kIGNsaWVudC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0RmF2SW5mbyhcblx0XHRmYXZvcml0ZVR5cGVOYW1lczogRmF2b3JpdGVUeXBlTmFtZXNcblx0KTogUHJvbWlzZTx7IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDsgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQgfT4ge1xuXHRcdGxldCBmYXZvcml0ZUluZm86IEZhdm9yaXRlSW5mbyB8IHVuZGVmaW5lZDtcblx0XHRsZXQgZmF2b3JpdGVDbGllbnQ6IEZhdm9yaXRlQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG5cdFx0aWYgKCh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5mYXZvcml0ZXNFbmFibGVkID8/IHRydWUpICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0RmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEZhdm9yaXRlQ2xpZW50KCk7XG5cdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gZmF2b3JpdGVDbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJbmZvLmlzRW5hYmxlZCkge1xuXHRcdFx0XHRcdGNvbnN0IGlzU3VwcG9ydGVkID1cblx0XHRcdFx0XHRcdGlzRW1wdHkoZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcykgfHwgZmF2b3JpdGVJbmZvLmVuYWJsZWRUeXBlcy5pbmNsdWRlcyhmYXZvcml0ZVR5cGVOYW1lcyk7XG5cdFx0XHRcdFx0aWYgKCFpc1N1cHBvcnRlZCkge1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0ZmF2b3JpdGVDbGllbnQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZhdm9yaXRlQ2xpZW50LFxuXHRcdFx0ZmF2b3JpdGVJbmZvXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQYWdlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogUGFnZXNQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBQYWdlc1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=