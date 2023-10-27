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
        return content.replace(/<[^>]*>?/gm, "");
    }
    return content;
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
            let pages = await platform.Storage.getPages();
            let matchQuery = queryLower;
            this._lastResponse = lastResponse;
            this._lastQuery = queryLower;
            this._lastQueryMinLength = options.queryMinLength;
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
            pageResults = await this.buildResults(pages, matchQuery, options.queryMinLength);
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
                    else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE) {
                        if (this._integrationHelpers?.share) {
                            await this._integrationHelpers.share({ type: "page", pageId: data.pageId });
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
            if (this._integrationHelpers.condition) {
                shareEnabled = await this._integrationHelpers.condition("sharing");
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
                    if (this._integrationHelpers?.condition) {
                        shareEnabled = await this._integrationHelpers.condition("sharing");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0NBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9wYWdlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhIH0gZnJvbSBcIi4vcGxhdGZvcm0tc2hhcGVzXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgQXBwLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCA9IFwiYXBwXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgV29ya3NwYWNlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSA9IFwid29ya3NwYWNlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUGFnZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFID0gXCJwYWdlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUXVlcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUVVFUlkgPSBcInF1ZXJ5XCI7XG5cbi8qKlxuICogTmFtZXMgZm9yIGFsbCB0aGUgZmF2b3JpdGUgdHlwZXMuXG4gKi9cbmV4cG9ydCB0eXBlIEZhdm9yaXRlVHlwZU5hbWVzID1cblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUFxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgZmF2b3JpdGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVQcm92aWRlck9wdGlvbnMge1xuXHQvKipcblx0ICogSXMgdGhlIHByb3ZpZGVyIGVuYWJsZWQsIGRlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRlbmFibGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGljb24gdGhhdCBzaG91bGQgYmUgdXNlZCBpZiB5b3Ugd2FudCB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgZmF2b3JpdGUgYWN0aW9uXG5cdCAqL1xuXHRmYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGljb24gdG8gdXNlIHRvIGluZGljYXRlIHRoYXQgdGhpcyBmYXZvcml0ZSBjYW4gYmUgdW5zZXRcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgY29tbWFuZHMgc2hvdWxkIGludGVncmF0aW9ucyBjaGVjayBmb3IgaWYgdGhleSBpbnRlbnQgdG8gc3VwcG9ydCB0aGUgZGlzcGxheSBvZiBmYXZvcml0ZXNcblx0ICovXG5cdGZhdm9yaXRlQ29tbWFuZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGNvbm5lY3Rpb24gcHJvdmlkZXIgY2FuIGhhdmUgYWN0aW9ucyByZWdpc3RlcmVkIGFnYWluc3QgaXQgZnJvbSB0aGUgcGxhdGZvcm0uIFRoaXMgcHJvdmlkZXMgYSBkZWZhdWx0IGxpc3Qgb2Zcblx0ICogYWN0aW9ucyB0aGF0IGNvbm5lY3Rpb25zIHNob3VsZCBiZSBhYmxlIHRvIHVzZSBpZiBhY3Rpb25zIGFyZSBlbmFibGVkIGZvciB0aGF0IGNvbm5lY3Rpb24uXG5cdCAqL1xuXHRzdXBwb3J0ZWRGYXZvcml0ZVR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcbn1cblxuLyoqXG4gKiBXaGVuIGFuIGVudHJ5IGlzIG1hZGUgaXQgcmVwcmVzZW50cyBhIHR5cGUgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm0uIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9va3VwIGFuZCBsYXVuY2ggdGhlIHRoaW5nIHRoaXMgZW50cnkgcmVmZXJzIHRvLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogQSB1bmlxdWUgZ3VpZCB0byByZXByZXNlbnQgdGhpcyBmYXZvcml0ZSBlbnRyeSBzbyB0aGF0IGl0IGNhbiBiZSB1cGRhdGVkIG9yIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBmb3IgdGhlIGZhdm9yaXRlIHR5cGUgdGhpcyBlbnRyeSByZXByZXNlbnRzXG5cdCAqL1xuXHR0eXBlSWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCB0eXBlIG9mIGZhdm9yaXRlIGVudHJ5IGRvZXMgdGhpcyBlbnRyeSByZXByZXNlbnRcblx0ICovXG5cdHR5cGU6IEZhdm9yaXRlVHlwZU5hbWVzO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGltZXN0YW1wIGZvciB0aGUgZW50cnkuXG5cdCAqL1xuXHR0aW1lc3RhbXA/OiBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBsYWJlbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRsYWJlbD86IHN0cmluZztcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRpY29uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEluZm8gdG8gcmV0dXJuIHRvIGludGVyZXN0ZWQgcGFydGllcyB0byBoZWxwIHRoZW0gc3VwcG9ydCBmYXZvcml0ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUluZm8ge1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIGZhdm9yaXRlXG5cdCAqL1xuXHRmYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gcmVtb3ZlIHRoaXMgZmF2b3JpdGVcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogQSBjb21tYW5kIHRoYXQgc3VwcG9ydGluZyBtb2R1bGVzIHNob3VsZCBsaXN0ZW4gZm9yIGlmIHRoZXkgYXJlIHRvIGRpc3BsYXkgZmF2b3JpdGVzIHRoYXQgZmFsbCB1bmRlciB0aGVtXG5cdCAqL1xuXHRjb21tYW5kPzogc3RyaW5nO1xuXHQvKipcblx0ICogV2hhdCB0eXBlcyBvZiBmYXZvcml0ZSBpdGVtIGFyZSBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybSwgdGhpcyBhbHNvIGRldGVybWluZXMgdGhlIG9yZGVyaW5nIGluIHRoZSBkb2NrIG1lbnUuXG5cdCAqL1xuXHRlbmFibGVkVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xuXHQvKipcblx0ICogSXMgZmF2b3JpdGUgc3VwcG9ydCBlbmFibGVkIG9uIHRoaXMgcGxhdGZvcm0uXG5cdCAqL1xuXHRpc0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBjbGllbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFjY2VzcyB0byBzb21lIG9yIGFsbCBvZiB0aGUgZmF2b3JpdGUgZnVuY3Rpb25hbGl0eVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlQ2xpZW50IHtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3Qgc3VwcG9ydGluZyBpbmZvcm1hdGlvbiBhYm91dCB3aGV0aGVyIGZhdm9yaXRlcyBhcmUgaW5pdGlhbGl6ZWQgZm9yIHRoZSBwbGF0Zm9ybSBhbmQgc3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMgU3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICovXG5cdGdldEluZm8oKTogRmF2b3JpdGVJbmZvO1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhbGwgKG9yIHNvbWUgaWYgYnkgdHlwZSkgb2YgdGhlIHNhdmVkIGZhdm9yaXRlc1xuXHQgKiBAcGFyYW0gYnlUeXBlIHRoZSB0eXBlIG9mIHNhdmVkIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc2F2ZWQgZmF2b3JpdGVzIG9yIGFuIGVtcHR5IGFycmF5IGlmIGl0IHdhcyB1bmFibGUgdG8gZ2V0IGFueSBiYWNrXG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlcyhieVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYSBwYXJ0aWN1bGFyIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIHRoZSBzYXZlZCBmYXZvcml0ZSBpZiBhdmFpbGFibGUgb3IgZmFsc2UgaWYgaXQgZGlkbid0IGV4aXN0XG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPEZhdm9yaXRlRW50cnkgfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gc2F2ZSBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGUgdGhlIEZhdm9yaXRlIHlvdSB3aXNoIHRvIHNhdmVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBzYXZlZFxuXHQgKi9cblx0c2V0U2F2ZWRGYXZvcml0ZT8oZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVtb3ZlL2RlbGV0ZSBhIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB0byBkZWxldGVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBkZWxldGVkLlxuXHQgKi9cblx0ZGVsZXRlU2F2ZWRGYXZvcml0ZT8oaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZhdm9yaXRlIGFuZCBtZXRhIGRhdGEgcmVsYXRlZCB0byBpdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBJbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSBwbGF0Zm9ybSBwcm92aWRpbmcgdGhlIHBheWxvYWQuXG5cdCAqL1xuXHRtZXRhRGF0YTogUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGE7XG5cdC8qKlxuXHQgKiBUaGUgZmF2b3JpdGUgZW50cnlcblx0ICovXG5cdHBheWxvYWQ6IEZhdm9yaXRlRW50cnk7XG59XG5cbi8qKlxuICogQSByZXF1ZXN0IHR5cGUgZm9yIHRoZSBGYXZvcml0ZUVuZHBvaW50IHRoYXQgZ2V0cyBhbGwgc2F2ZWQgZmF2b3JpdGUgZW50cmllc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB0eXBlIGlmIHNwZWNpZmllZCBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgdGhlIHJlc3BvbnNlIHRvIG9ubHkgc2VuZCB0aGUgZW50cmllcyB0aGF0IGFyZSByZWxldmFudFxuXHQgKi9cblx0ZmF2b3JpdGVUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXM7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBmYXZvcml0ZXMgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2Uge1xuXHQvKipcblx0ICogVGhlIGxpc3Qgb2YgZmF2b3JpdGUgZW50cmllcyB3aXRoIGluZm9ybWF0aW9uIG9mIHdoYXQgcGxhdGZvcm0gdmVyc2lvbnMgdGhleSB3ZXJlIG9yaWdpbmFsbHkgc2F2ZWQgYWdhaW5zdFxuXHQgKi9cblx0ZW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W107XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGhhcyBiZWVuIHNhdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgYSBzcGVjaWZpYyBmYXZvcml0ZSB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCB0eXBlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSA9IEVuZHBvaW50RmF2b3JpdGVFbnRyeTtcblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QgZXh0ZW5kcyBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgc2V0XG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciByZW1vdmluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEN1c3RvbVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2UsIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UsXG5cdHR5cGUgRmF2b3JpdGVDbGllbnQsXG5cdHR5cGUgRmF2b3JpdGVFbnRyeSxcblx0dHlwZSBGYXZvcml0ZUluZm8sXG5cdHR5cGUgRmF2b3JpdGVUeXBlTmFtZXNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkLFxuXHRQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWRcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9saWZlY3ljbGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlLCByYW5kb21VVUlEIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2VzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBwYWdlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VzUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxQYWdlc1NldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMjAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgbGF1bmNoaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0xBVU5DSF9QQUdFID0gXCJMYXVuY2ggUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fREVMRVRFX1BBR0UgPSBcIkRlbGV0ZSBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NIQVJFX1BBR0UgPSBcIlNoYXJlIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogUGFnZXNTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgdGhlbWUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBTdWJzY3JpcHRpb24gaWQgZm9yIGZhdm9yaXRlLWNoYW5nZWQgbGlmZWN5Y2xlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBfZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZXNQcm92aWRlclwiKTtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ+KFxuXHRcdFx0XHRcInBhZ2UtY2hhbmdlZFwiLFxuXHRcdFx0XHRhc3luYyAocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLCBwYXlsb2FkPzogUGFnZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRcdFx0aWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkPy5hY3Rpb24gPT09IFwidXBkYXRlXCIpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxhc3RSZXN1bHQgPSB0aGlzLl9sYXN0UmVzdWx0cz8uZmluZCgocmVzKSA9PiByZXMua2V5ID09PSBwYXlsb2FkLmlkKTtcblx0XHRcdFx0XHRcdGlmIChsYXN0UmVzdWx0ICYmIHBheWxvYWQucGFnZSkge1xuXHRcdFx0XHRcdFx0XHRsYXN0UmVzdWx0LnRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRsYXN0UmVzdWx0LmRhdGEud29ya3NwYWNlVGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdChsYXN0UmVzdWx0LnRlbXBsYXRlQ29udGVudCBhcyBDdXN0b21UZW1wbGF0ZSkuZGF0YS50aXRsZSA9IHBheWxvYWQucGFnZS50aXRsZTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cdFx0XHRcdFx0XHRcdGlmIChmYXZvcml0ZUNsaWVudD8uc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGZhdm9yaXRlID0gYXdhaXQgc2F2ZWQ/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBwYXlsb2FkLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZhdm9yaXRlLmxhYmVsID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZShmYXZvcml0ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkPy5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50Py5kZWxldGVTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZSA9IGF3YWl0IHNhdmVkPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRcdGlmIChmYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUoZmF2b3JpdGUuaWQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFwidGhlbWUtY2hhbmdlZFwiLFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0pIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkID1cblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50PEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ+KFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiLFxuXHRcdFx0XHRcdGFzeW5jIChfOiB1bmtub3duLCBwYXlsb2FkPzogRmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudXBkYXRlQXBwRmF2b3JpdGVCdXR0b25zKHBheWxvYWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8udW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQpKSB7XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkLCBcInRoZW1lLWNoYW5nZWRcIik7XG5cdFx0XHRcdHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQpKSB7XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCxcblx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5pc1N1Z2dlc3Rpb24gSXMgdGhlIHF1ZXJ5IGZyb20gYSBzdWdnZXN0aW9uLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHRcdGlzU3VnZ2VzdGlvbj86IGJvb2xlYW47XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGxldCBwYWdlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0bGV0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0XHRsZXQgbWF0Y2hRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZSA9IGxhc3RSZXNwb25zZTtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50LCBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0ZmF2b3JpdGVJbmZvPy5pc0VuYWJsZWQgJiZcblx0XHRcdFx0aXNTdHJpbmdWYWx1ZShmYXZvcml0ZUluZm8/LmNvbW1hbmQpICYmXG5cdFx0XHRcdHF1ZXJ5TG93ZXIgPT09IGZhdm9yaXRlSW5mby5jb21tYW5kICYmXG5cdFx0XHRcdGZhdm9yaXRlQ2xpZW50XG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVBcHBzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0XHRjb25zdCBmYXZJZHMgPSBmYXZvcml0ZUFwcHM/Lm1hcCgoZikgPT4gZi50eXBlSWQpID8/IFtdO1xuXHRcdFx0XHRwYWdlcyA9IHBhZ2VzLmZpbHRlcigoYSkgPT4gZmF2SWRzLmluY2x1ZGVzKGEucGFnZUlkKSk7XG5cdFx0XHRcdG1hdGNoUXVlcnkgPSBcIlwiO1xuXHRcdFx0fVxuXG5cdFx0XHRwYWdlUmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKHBhZ2VzLCBtYXRjaFF1ZXJ5LCBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoKTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgPSBwYWdlUmVzdWx0cztcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogcGFnZVJlc3VsdHNcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5lbmRzV2l0aChcImZhdm9yaXRlXCIpICYmIHJlc3VsdC5kYXRhPy5wYWdlSWQpIHtcblx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5zdGFydHNXaXRoKFwidW5cIikpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShyZXN1bHQuZGF0YT8uZmF2b3JpdGVJZCkgJiYgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKHJlc3VsdC5kYXRhLmZhdm9yaXRlSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSh7XG5cdFx0XHRcdFx0XHRcdGlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHR5cGU6IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHJlc3VsdC5rZXksXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiByZXN1bHQudGl0bGUsXG5cdFx0XHRcdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5pbWFnZXMucGFnZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0XHRwYWdlSWQ/OiBzdHJpbmc7XG5cdFx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRpZiAoZGF0YT8ucGFnZUlkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0UpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtICYmIHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8ubGF1bmNoUGFnZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoUGFnZShkYXRhLnBhZ2VJZCwgdW5kZWZpbmVkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShkYXRhLnBhZ2VJZCk7XG5cdFx0XHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSBwYWdlIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdFx0XHQvLyBldmVudCB3aGljaCB3aWxsIHJlbW92ZSBpdCBmcm9tIHRoZSByZXN1bHQgbGlzdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uc2hhcmUpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnNoYXJlKHsgdHlwZTogXCJwYWdlXCIsIHBhZ2VJZDogZGF0YS5wYWdlSWQgfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3IgcGFnZSBzZWxlY3Rpb246ICR7ZGF0YS5wYWdlSWR9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSB0ZW1wbGF0ZSBmb3IgYSBwYWdlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBpdGVtLlxuXHQgKiBAcGFyYW0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBwYWdlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBob21lIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0UGFnZVRlbXBsYXRlKFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRzaGFyZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIHRoaXMuX3NldHRpbmdzKSB7XG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHRcdGNvbnN0IGFjdGlvbkJ1dHRvbnM6IHsgdGl0bGU6IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwiTGF1bmNoXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0Vcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIkRlbGV0ZVwiLFxuXHRcdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9QQUdFXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cblx0XHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZVwiLFxuXHRcdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cdFx0XHRjb25zdCBpY29uID0gYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLnBhZ2UpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxheW91dERhdGEgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUxheW91dChcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdFthd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXCJpbnN0cnVjdGlvbnNcIildLFxuXHRcdFx0XHRhY3Rpb25CdXR0b25zLFxuXHRcdFx0XHRoZWFkZXJCdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRrZXk6IGlkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFBhZ2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGxhYmVsOiBcIlBhZ2VcIixcblx0XHRcdFx0aWNvbixcblx0XHRcdFx0YWN0aW9ucyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRcdHBhZ2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0XHR0YWdzOiBbXCJwYWdlXCJdLFxuXHRcdFx0XHRcdGZhdm9yaXRlSWRcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0XHRsYXlvdXQ6IGxheW91dERhdGEubGF5b3V0LFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdC4uLmxheW91dERhdGEuZGF0YSxcblx0XHRcdFx0XHRcdGluc3RydWN0aW9uczogXCJVc2UgdGhlIGJ1dHRvbnMgYmVsb3cgdG8gaW50ZXJhY3Qgd2l0aCB5b3VyIHNhdmVkIHBhZ2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogaWQsXG5cdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFBhZ2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiUGFnZVwiLFxuXHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRwYWdlVGl0bGU6IHRpdGxlLFxuXHRcdFx0XHRwYWdlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJwYWdlXCJdXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IFwiUGxhaW5cIiBhcyBDTElUZW1wbGF0ZS5QbGFpbixcblx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGFmdGVyIGNvbG9yIHNjaGVtZSBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgd29ya3NwYWNlIHBsYXRmb3JtLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmICFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiYgIWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoKSkge1xuXHRcdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmJ1aWxkUmVzdWx0cyhwYWdlcywgdGhpcy5fbGFzdFF1ZXJ5LCB0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpO1xuXHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHRoZSByZXN1bHRzIGZvciB0aGUgcGFnZXMuXG5cdCAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiB3b3Jrc3BhY2VzIHRvIGJ1aWxkIHRoZSByZXN1bHRzIGZvci5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeS5cblx0ICogQHBhcmFtIHF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW4gcXVlcnkgbGVuZ3RoLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBob21lIHNlYXJjaCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGFnZXM6IFBhZ2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXJcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIEFycmF5LmlzQXJyYXkocGFnZXMpKSB7XG5cdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbikge1xuXHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpO1xuXHRcdFx0bGV0IHNhdmVkRmF2b3JpdGVzOiBGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ7XG5cblx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRzYXZlZEZhdm9yaXRlcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGdzUHJvbSA9IHBhZ2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHBnKSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8IChxdWVyeS5sZW5ndGggPj0gcXVlcnlNaW5MZW5ndGggJiYgcGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpXG5cdFx0XHRcdClcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSlcblx0XHRcdFx0Lm1hcChhc3luYyAocGc6IFBhZ2UpID0+IHtcblx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBwZy5wYWdlSWQpPy5pZDtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFBhZ2VUZW1wbGF0ZShwZy5wYWdlSWQsIHBnLnRpdGxlLCBzaGFyZUVuYWJsZWQsIGZhdm9yaXRlSW5mbywgZmF2b3JpdGVJZCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRyZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwocGdzUHJvbSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9yIHVwZGF0ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIHJlc3VsdHMgVGhlIHJlc3VsdHMgdG8gYWRkIG9yIHVwZGF0ZS5cblx0ICovXG5cdHByaXZhdGUgcmVzdWx0QWRkVXBkYXRlKHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Zm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSByZXN1bHQua2V5KTtcblx0XHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKHJlc3VsdHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSByZXN1bHQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gcmVtb3ZlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRSZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gaWQpO1xuXHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShpZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgYXBwIGJ1dHRvbnMgaWYgdGhlIGZhdm9yaXRlcyBoYXZlIGNoYW5nZWQuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIG9mIHRoZSBmYXZvcml0ZSBjaGFuZ2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkOiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkgPSBwYXlsb2FkLmZhdm9yaXRlO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0KHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiIHx8IHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSAmJlxuXHRcdFx0IWlzRW1wdHkoZmF2b3JpdGUpICYmXG5cdFx0XHRmYXZvcml0ZS50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfUEFHRSAmJlxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgJiZcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVyc1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfUEFHRSk7XG5cblx0XHRcdGlmICh0aGlzLl9sYXN0UXVlcnkgPT09IGZhdm9yaXRlSW5mbz8uY29tbWFuZCAmJiBwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGZhdm9yaXRlLnR5cGVJZCk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRcdGNvbnN0IGxhc3RQYWdlID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZCgocGcpID0+IHBnLmtleSA9PT0gZmF2b3JpdGUudHlwZUlkKTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdFBhZ2UpKSB7XG5cdFx0XHRcdFx0bGV0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmNvbmRpdGlvbikge1xuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbihcInNoYXJpbmdcIik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcmVidWlsdCA9IGF3YWl0IHRoaXMuZ2V0UGFnZVRlbXBsYXRlKFxuXHRcdFx0XHRcdFx0bGFzdFBhZ2Uua2V5LFxuXHRcdFx0XHRcdFx0bGFzdFBhZ2UudGl0bGUsXG5cdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQsXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKFtyZWJ1aWx0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQgaWYgdGhleSBhcmUgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlVHlwZU5hbWVzIFRoZSB0eXBlIG9mIGNsaWVudCB0byBnZXQuXG5cdCAqIEByZXR1cm5zIFRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEZhdkluZm8oXG5cdFx0ZmF2b3JpdGVUeXBlTmFtZXM6IEZhdm9yaXRlVHlwZU5hbWVzXG5cdCk6IFByb21pc2U8eyBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkIH0+IHtcblx0XHRsZXQgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRcdGlmICgodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZmF2b3JpdGVzRW5hYmxlZCA/PyB0cnVlKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCgpO1xuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdGZhdm9yaXRlSW5mbyA9IGZhdm9yaXRlQ2xpZW50LmdldEluZm8oKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSW5mby5pc0VuYWJsZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpc1N1cHBvcnRlZCA9XG5cdFx0XHRcdFx0XHRpc0VtcHR5KGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMpIHx8IGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoZmF2b3JpdGVUeXBlTmFtZXMpO1xuXHRcdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCxcblx0XHRcdGZhdm9yaXRlSW5mb1xuXHRcdH07XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUGFnZXNQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IFBhZ2VzUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgUGFnZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9