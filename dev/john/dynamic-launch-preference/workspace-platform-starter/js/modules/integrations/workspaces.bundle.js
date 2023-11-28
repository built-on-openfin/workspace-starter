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

/***/ "./client/src/modules/integrations/workspaces/integration.ts":
/*!*******************************************************************!*\
  !*** ./client/src/modules/integrations/workspaces/integration.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacesProvider: () => (/* binding */ WorkspacesProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/favorite-shapes */ "./client/src/framework/shapes/favorite-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Implement the integration provider for workspaces.
 */
class WorkspacesProvider {
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
        this._logger = loggerCreator("WorkspacesProvider");
        if (this._integrationHelpers.subscribeLifecycleEvent) {
            this._integrationHelpers.subscribeLifecycleEvent("workspace-changed", async (platform, payload) => {
                if (payload?.action === "create") {
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._lastQuery) && !this._lastQuery.startsWith("/w ")) {
                        await this.rebuildResults(platform);
                    }
                }
                else if (payload?.action === "update") {
                    const lastResult = this._lastResults?.find((res) => res.key === payload.id);
                    if (lastResult && payload.workspace) {
                        lastResult.title = payload.workspace.title;
                        lastResult.data.workspaceTitle = payload.workspace.title;
                        lastResult.templateContent.data.title = payload.workspace.title;
                        this.resultAddUpdate([lastResult]);
                        const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                        if (favoriteClient?.setSavedFavorite) {
                            const saved = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                            const favorite = await saved?.find((f) => f.typeId === payload.id);
                            if (favorite) {
                                favorite.label = payload.workspace.title;
                                await favoriteClient.setSavedFavorite(favorite);
                            }
                        }
                    }
                }
                else if (payload?.action === "delete") {
                    this.resultRemove(payload.id);
                    const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                    if (favoriteClient?.deleteSavedFavorite) {
                        const saved = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
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
        if (this._integrationHelpers && this._settings) {
            const themeClient = await this._integrationHelpers.getThemeClient();
            return [
                {
                    key: `${this._definition?.id}-help1`,
                    score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
                    title: "Workspaces",
                    label: "Help",
                    icon: await themeClient.themeUrl(this._settings.images.workspace),
                    actions: [],
                    data: {
                        providerId: this._definition?.id
                    },
                    template: "Custom",
                    templateContent: await this._integrationHelpers.templateHelpers.createHelp("Workspaces", ["Use the workspaces command to save your current layout."], ["/w title"])
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
        if (this._integrationHelpers?.getPlatform && this._settings) {
            const themeClient = await this._integrationHelpers.getThemeClient();
            const platform = this._integrationHelpers.getPlatform();
            const queryLower = query.toLowerCase();
            let workspaces = await platform.Storage.getWorkspaces();
            let matchQuery = queryLower;
            this._lastResponse = lastResponse;
            this._lastQuery = queryLower;
            this._lastQueryMinLength = options.queryMinLength;
            if (queryLower.startsWith("/w ")) {
                const title = queryLower.replace("/w ", "");
                const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
                if (foundMatch) {
                    return {
                        results: [
                            {
                                key: WorkspacesProvider._ACTION_EXISTS_WORKSPACE,
                                score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
                                title: `Workspace ${foundMatch.title} already exists.`,
                                icon: await themeClient.themeUrl(this._settings.images.workspace),
                                actions: [],
                                data: {
                                    providerId: this._definition?.id,
                                    tags: ["workspace"],
                                    workspaceId: foundMatch.workspaceId
                                },
                                template: "Plain",
                                templateContent: undefined
                            }
                        ]
                    };
                }
                return {
                    results: [
                        {
                            key: WorkspacesProvider._ACTION_SAVE_WORKSPACE,
                            score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
                            title: `Save Current Workspace as ${title}`,
                            icon: await themeClient.themeUrl(this._settings.images.workspace),
                            label: "Suggestion",
                            actions: [{ name: "Save Workspace", hotkey: "Enter" }],
                            data: {
                                providerId: this._definition?.id,
                                tags: ["workspace"],
                                workspaceId: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.randomUUID)(),
                                workspaceTitle: title
                            },
                            template: "Plain",
                            templateContent: undefined
                        }
                    ]
                };
            }
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
            if (favoriteInfo?.isEnabled &&
                (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(favoriteInfo?.command) &&
                queryLower === favoriteInfo.command &&
                favoriteClient) {
                const favoriteApps = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
                workspaces = workspaces.filter((a) => favIds.includes(a.workspaceId));
                matchQuery = "";
            }
            const workspaceResults = await this.buildResults(platform, workspaces, matchQuery, options.queryMinLength);
            this._lastResults = workspaceResults;
            return {
                results: workspaceResults
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
        let handled = false;
        if (result.action.trigger === "user-action") {
            if (result.action.name.endsWith("favorite") && result.data?.workspaceId) {
                const { favoriteClient } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                if (favoriteClient) {
                    if (result.action.name.startsWith("un")) {
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(result.data?.favoriteId) && favoriteClient.deleteSavedFavorite) {
                            await favoriteClient.deleteSavedFavorite(result.data.favoriteId);
                        }
                    }
                    else if (favoriteClient.setSavedFavorite) {
                        await favoriteClient.setSavedFavorite({
                            id: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.randomUUID)(),
                            type: workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE,
                            typeId: result.key,
                            label: result.title,
                            icon: this._settings?.images.workspace
                        });
                    }
                    handled = true;
                }
            }
            else if (this._integrationHelpers?.getPlatform) {
                const data = result.data;
                if (data?.workspaceId) {
                    handled = true;
                    if (result.key === WorkspacesProvider._ACTION_SAVE_WORKSPACE) {
                        // Remove the save workspace entry
                        this.resultRemove(result.key);
                        const platform = this._integrationHelpers.getPlatform();
                        const snapshot = await platform.getSnapshot();
                        const currentWorkspace = await platform.getCurrentWorkspace();
                        const currentMetaData = currentWorkspace?.metadata;
                        const workspace = {
                            workspaceId: data.workspaceId,
                            title: data.workspaceTitle ?? "",
                            metadata: currentMetaData,
                            snapshot
                        };
                        await platform.Storage.saveWorkspace(workspace);
                        let shareEnabled = false;
                        if (this._integrationHelpers?.getConditionsClient) {
                            const conditionsClient = await this._integrationHelpers.getConditionsClient();
                            if (conditionsClient) {
                                shareEnabled = await conditionsClient.check("sharing");
                            }
                        }
                        const { favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                        const savedWorkspace = await this.getWorkspaceTemplate(workspace.workspaceId, workspace.title, shareEnabled, true, favoriteInfo);
                        // And add the new one
                        this.resultAddUpdate([savedWorkspace]);
                    }
                    else if (result.key === WorkspacesProvider._ACTION_EXISTS_WORKSPACE) {
                        // Do nothing, the user must update the query to give it a different
                        // name which will automatically refresh the results
                    }
                    else if (result.action.name === WorkspacesProvider._ACTION_OPEN_WORKSPACE) {
                        const platform = this._integrationHelpers.getPlatform();
                        const workspace = await platform.Storage.getWorkspace(data.workspaceId);
                        await platform.applyWorkspace(workspace);
                        // We rebuild the results here as we will now have a new current workspace
                        // and we need to change the existing one back to a standard template
                        await this.rebuildResults(platform);
                    }
                    else if (result.action.name === WorkspacesProvider._ACTION_DELETE_WORKSPACE) {
                        const platform = this._integrationHelpers.getPlatform();
                        await platform.Storage.deleteWorkspace(data.workspaceId);
                        // Deleting the working will eventually trigger the "delete" lifecycle
                        // event which will remove it from the result list
                    }
                    else if (result.action.name === WorkspacesProvider._ACTION_SHARE_WORKSPACE &&
                        this._integrationHelpers.share) {
                        await this._integrationHelpers.share({ type: "workspace", workspaceId: data.workspaceId });
                    }
                    else {
                        handled = false;
                        this._logger?.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
                    }
                }
            }
        }
        return handled;
    }
    /**
     * Get the template for a workspace.
     * @param id The id of the item.
     * @param title The title of the workspace.
     * @param shareEnabled Is sharing enabled.
     * @param isCurrent Is this the current workspace.
     * @param favInfo The favorites info if it is enabled.
     * @param favoriteId The id of the favorite.
     * @returns The home result.
     */
    async getWorkspaceTemplate(id, title, shareEnabled, isCurrent, favInfo, favoriteId) {
        if (this._integrationHelpers && this._settings) {
            const actions = [
                {
                    name: WorkspacesProvider._ACTION_OPEN_WORKSPACE,
                    hotkey: "Enter"
                }
            ];
            const actionButtons = [
                {
                    title: "Open",
                    action: WorkspacesProvider._ACTION_OPEN_WORKSPACE
                }
            ];
            let instructions;
            if (isCurrent) {
                instructions =
                    "This is the currently active workspace. You can use the Browser menu to update/rename this workspace";
            }
            else {
                instructions = "Use the buttons below to interact with your saved workspace";
                actions.push({
                    name: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
                    hotkey: "CmdOrCtrl+Shift+D"
                });
                actionButtons.push({
                    title: "Delete",
                    action: WorkspacesProvider._ACTION_DELETE_WORKSPACE
                });
            }
            if (shareEnabled) {
                actions.push({
                    name: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
                    hotkey: "CmdOrCtrl+Shift+S"
                });
                actionButtons.push({
                    title: "Share",
                    action: WorkspacesProvider._ACTION_SHARE_WORKSPACE
                });
            }
            const themeClient = await this._integrationHelpers.getThemeClient();
            const icon = await themeClient.themeUrl(this._settings.images.workspace);
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
                score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
                title,
                label: "Workspace",
                icon,
                actions,
                data: {
                    providerId: this._definition?.id,
                    workspaceTitle: title,
                    workspaceId: id,
                    tags: ["workspace"],
                    favoriteId
                },
                template: "Custom",
                templateContent: {
                    layout: layoutData.layout,
                    data: {
                        ...layoutData.data,
                        instructions
                    }
                }
            };
        }
        return {
            key: id,
            score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
            title,
            label: "Workspace",
            actions: [],
            data: {
                providerId: this._definition?.id,
                workspaceTitle: title,
                workspaceId: id,
                tags: ["workspace"]
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
            const workspaces = await platform.Storage.getWorkspaces();
            const results = await this.buildResults(platform, workspaces, this._lastQuery, this._lastQueryMinLength);
            this.resultAddUpdate(results);
        }
    }
    /**
     * Build the results for the workspaces.
     * @param platform The workspace platform.
     * @param workspaces The list of workspaces to build the results for.
     * @param query The query.
     * @param queryMinLength The min query length.
     * @returns The list of home search results.
     */
    async buildResults(platform, workspaces, query, queryMinLength) {
        let results = [];
        if (this._integrationHelpers && Array.isArray(workspaces)) {
            const currentWorkspace = await platform.getCurrentWorkspace();
            const currentWorkspaceId = currentWorkspace?.workspaceId;
            let shareEnabled = false;
            if (this._integrationHelpers?.getConditionsClient) {
                const conditionsClient = await this._integrationHelpers.getConditionsClient();
                if (conditionsClient) {
                    shareEnabled = await conditionsClient.check("sharing");
                }
            }
            const { favoriteClient, favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
            let savedFavorites;
            if (favoriteClient) {
                savedFavorites = await favoriteClient.getSavedFavorites(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
            }
            const wksProm = workspaces
                .filter((w) => query.length === 0 || (query.length >= queryMinLength && w.title.toLowerCase().includes(query)))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(async (ws) => {
                const favoriteId = savedFavorites?.find((f) => f.typeId === ws.workspaceId)?.id;
                return this.getWorkspaceTemplate(ws.workspaceId, ws.title, shareEnabled, currentWorkspaceId === ws.workspaceId, favoriteInfo, favoriteId);
            });
            results = await Promise.all(wksProm);
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
            this._integrationHelpers?.getPlatform &&
            (payload.action === "set" || payload.action === "delete") &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favorite) &&
            favorite.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE &&
            this._lastResults) {
            const { favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
            if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
                this._lastResponse.revoke(favorite.typeId);
            }
            else if (this._lastResults) {
                const lastWorkspace = this._lastResults.find((ws) => ws.key === favorite.typeId);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(lastWorkspace)) {
                    let shareEnabled = false;
                    if (this._integrationHelpers?.getConditionsClient) {
                        const conditionsClient = await this._integrationHelpers.getConditionsClient();
                        if (conditionsClient) {
                            shareEnabled = await conditionsClient.check("sharing");
                        }
                    }
                    const platform = this._integrationHelpers.getPlatform();
                    const currentWorkspace = await platform.getCurrentWorkspace();
                    const currentWorkspaceId = currentWorkspace?.workspaceId;
                    const rebuilt = await this.getWorkspaceTemplate(lastWorkspace.key, lastWorkspace.title, shareEnabled, currentWorkspaceId === lastWorkspace.key, favoriteInfo, payload.action === "set" ? favorite.id : undefined);
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
WorkspacesProvider._DEFAULT_BASE_SCORE = 100;
/**
 * The key to use for opening a workspace.
 * @internal
 */
WorkspacesProvider._ACTION_OPEN_WORKSPACE = "Open Workspace";
/**
 * The key to use for deleting a workspace.
 * @internal
 */
WorkspacesProvider._ACTION_DELETE_WORKSPACE = "Delete Workspace";
/**
 * The key to use for sharing a workspace.
 * @internal
 */
WorkspacesProvider._ACTION_SHARE_WORKSPACE = "Share Workspace";
/**
 * The key to use for saving a workspace.
 * @internal
 */
WorkspacesProvider._ACTION_SAVE_WORKSPACE = "Save Workspace";
/**
 * The key to use for a workspace exists.
 * @internal
 */
WorkspacesProvider._ACTION_EXISTS_WORKSPACE = "Workspace Exists";


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
/*!*************************************************************!*\
  !*** ./client/src/modules/integrations/workspaces/index.ts ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/workspaces/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.WorkspacesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0JBQ0YsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTztZQUNOLGNBQWM7WUFDZCxZQUFZO1NBQ1osQ0FBQztJQUNILENBQUM7O0FBeHZCRDs7O0dBR0c7QUFDcUIsc0NBQW1CLEdBQUcsR0FBRyxDQUFDO0FBRWxEOzs7R0FHRztBQUNxQix5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUVsRTs7O0dBR0c7QUFDcUIsMkNBQXdCLEdBQUcsa0JBQWtCLENBQUM7QUFFdEU7OztHQUdHO0FBQ3FCLDBDQUF1QixHQUFHLGlCQUFpQixDQUFDO0FBRXBFOzs7R0FHRztBQUNxQix5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUVsRTs7O0dBR0c7QUFDcUIsMkNBQXdCLEdBQUcsa0JBQWtCLENBQUM7Ozs7Ozs7U0NyRXZFO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNObUQ7QUFFNUMsTUFBTSxXQUFXLEdBQXlDO0lBQ2hFLFlBQVksRUFBRSxJQUFJLDREQUFrQixFQUFFO0NBQ3RDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvd29ya3NwYWNlcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3dvcmtzcGFjZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YSB9IGZyb20gXCIuL3BsYXRmb3JtLXNoYXBlc1wiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIEFwcC5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAgPSBcImFwcFwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgPSBcIndvcmtzcGFjZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFBhZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUEFHRSA9IFwicGFnZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFF1ZXJ5LlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZID0gXCJxdWVyeVwiO1xuXG4vKipcbiAqIE5hbWVzIGZvciBhbGwgdGhlIGZhdm9yaXRlIHR5cGVzLlxuICovXG5leHBvcnQgdHlwZSBGYXZvcml0ZVR5cGVOYW1lcyA9XG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9BUFBcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUEFHRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUVVFUlk7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgdGhlIGZhdm9yaXRlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlUHJvdmlkZXJPcHRpb25zIHtcblx0LyoqXG5cdCAqIElzIHRoZSBwcm92aWRlciBlbmFibGVkLCBkZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0ZW5hYmxlZD86IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgeW91IHdhbnQgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIGZhdm9yaXRlIGFjdGlvblxuXHQgKi9cblx0ZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRvIHVzZSB0byBpbmRpY2F0ZSB0aGF0IHRoaXMgZmF2b3JpdGUgY2FuIGJlIHVuc2V0XG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IGNvbW1hbmRzIHNob3VsZCBpbnRlZ3JhdGlvbnMgY2hlY2sgZm9yIGlmIHRoZXkgaW50ZW50IHRvIHN1cHBvcnQgdGhlIGRpc3BsYXkgb2YgZmF2b3JpdGVzXG5cdCAqL1xuXHRmYXZvcml0ZUNvbW1hbmQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25uZWN0aW9uIHByb3ZpZGVyIGNhbiBoYXZlIGFjdGlvbnMgcmVnaXN0ZXJlZCBhZ2FpbnN0IGl0IGZyb20gdGhlIHBsYXRmb3JtLiBUaGlzIHByb3ZpZGVzIGEgZGVmYXVsdCBsaXN0IG9mXG5cdCAqIGFjdGlvbnMgdGhhdCBjb25uZWN0aW9ucyBzaG91bGQgYmUgYWJsZSB0byB1c2UgaWYgYWN0aW9ucyBhcmUgZW5hYmxlZCBmb3IgdGhhdCBjb25uZWN0aW9uLlxuXHQgKi9cblx0c3VwcG9ydGVkRmF2b3JpdGVUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG59XG5cbi8qKlxuICogV2hlbiBhbiBlbnRyeSBpcyBtYWRlIGl0IHJlcHJlc2VudHMgYSB0eXBlIHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvb2t1cCBhbmQgbGF1bmNoIHRoZSB0aGluZyB0aGlzIGVudHJ5IHJlZmVycyB0by5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEEgdW5pcXVlIGd1aWQgdG8gcmVwcmVzZW50IHRoaXMgZmF2b3JpdGUgZW50cnkgc28gdGhhdCBpdCBjYW4gYmUgdXBkYXRlZCBvciByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgZm9yIHRoZSBmYXZvcml0ZSB0eXBlIHRoaXMgZW50cnkgcmVwcmVzZW50c1xuXHQgKi9cblx0dHlwZUlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgdHlwZSBvZiBmYXZvcml0ZSBlbnRyeSBkb2VzIHRoaXMgZW50cnkgcmVwcmVzZW50XG5cdCAqL1xuXHR0eXBlOiBGYXZvcml0ZVR5cGVOYW1lcztcblxuXHQvKipcblx0ICogVGhlIHRpbWVzdGFtcCBmb3IgdGhlIGVudHJ5LlxuXHQgKi9cblx0dGltZXN0YW1wPzogRGF0ZTtcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgbGFiZWwgdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0bGFiZWw/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0aWNvbj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbmZvIHRvIHJldHVybiB0byBpbnRlcmVzdGVkIHBhcnRpZXMgdG8gaGVscCB0aGVtIHN1cHBvcnQgZmF2b3JpdGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVJbmZvIHtcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byBmYXZvcml0ZVxuXHQgKi9cblx0ZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIHJlbW92ZSB0aGlzIGZhdm9yaXRlXG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIEEgY29tbWFuZCB0aGF0IHN1cHBvcnRpbmcgbW9kdWxlcyBzaG91bGQgbGlzdGVuIGZvciBpZiB0aGV5IGFyZSB0byBkaXNwbGF5IGZhdm9yaXRlcyB0aGF0IGZhbGwgdW5kZXIgdGhlbVxuXHQgKi9cblx0Y29tbWFuZD86IHN0cmluZztcblx0LyoqXG5cdCAqIFdoYXQgdHlwZXMgb2YgZmF2b3JpdGUgaXRlbSBhcmUgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0sIHRoaXMgYWxzbyBkZXRlcm1pbmVzIHRoZSBvcmRlcmluZyBpbiB0aGUgZG9jayBtZW51LlxuXHQgKi9cblx0ZW5hYmxlZFR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcblx0LyoqXG5cdCAqIElzIGZhdm9yaXRlIHN1cHBvcnQgZW5hYmxlZCBvbiB0aGlzIHBsYXRmb3JtLlxuXHQgKi9cblx0aXNFbmFibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY2xpZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gc29tZSBvciBhbGwgb2YgdGhlIGZhdm9yaXRlIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUNsaWVudCB7XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IHN1cHBvcnRpbmcgaW5mb3JtYXRpb24gYWJvdXQgd2hldGhlciBmYXZvcml0ZXMgYXJlIGluaXRpYWxpemVkIGZvciB0aGUgcGxhdGZvcm0gYW5kIHN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIFN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRnZXRJbmZvKCk6IEZhdm9yaXRlSW5mbztcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYWxsIChvciBzb21lIGlmIGJ5IHR5cGUpIG9mIHRoZSBzYXZlZCBmYXZvcml0ZXNcblx0ICogQHBhcmFtIGJ5VHlwZSB0aGUgdHlwZSBvZiBzYXZlZCBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHNhdmVkIGZhdm9yaXRlcyBvciBhbiBlbXB0eSBhcnJheSBpZiBpdCB3YXMgdW5hYmxlIHRvIGdldCBhbnkgYmFja1xuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZXMoYnlUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXMpOiBQcm9taXNlPEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGEgcGFydGljdWxhciBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyB0aGUgc2F2ZWQgZmF2b3JpdGUgaWYgYXZhaWxhYmxlIG9yIGZhbHNlIGlmIGl0IGRpZG4ndCBleGlzdFxuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5IHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHNhdmUgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGZhdm9yaXRlIHRoZSBGYXZvcml0ZSB5b3Ugd2lzaCB0byBzYXZlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgc2F2ZWRcblx0ICovXG5cdHNldFNhdmVkRmF2b3JpdGU/KGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5KTogUHJvbWlzZTxib29sZWFuPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlbW92ZS9kZWxldGUgYSBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgdG8gZGVsZXRlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgZGVsZXRlZC5cblx0ICovXG5cdGRlbGV0ZVNhdmVkRmF2b3JpdGU/KGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmYXZvcml0ZSBhbmQgbWV0YSBkYXRhIHJlbGF0ZWQgdG8gaXRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogSW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgcGxhdGZvcm0gcHJvdmlkaW5nIHRoZSBwYXlsb2FkLlxuXHQgKi9cblx0bWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhO1xuXHQvKipcblx0ICogVGhlIGZhdm9yaXRlIGVudHJ5XG5cdCAqL1xuXHRwYXlsb2FkOiBGYXZvcml0ZUVudHJ5O1xufVxuXG4vKipcbiAqIEEgcmVxdWVzdCB0eXBlIGZvciB0aGUgRmF2b3JpdGVFbmRwb2ludCB0aGF0IGdldHMgYWxsIHNhdmVkIGZhdm9yaXRlIGVudHJpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBpZiBzcGVjaWZpZWQgc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHRoZSByZXNwb25zZSB0byBvbmx5IHNlbmQgdGhlIGVudHJpZXMgdGhhdCBhcmUgcmVsZXZhbnRcblx0ICovXG5cdGZhdm9yaXRlVHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgZmF2b3JpdGVzIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHtcblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIGZhdm9yaXRlIGVudHJpZXMgd2l0aCBpbmZvcm1hdGlvbiBvZiB3aGF0IHBsYXRmb3JtIHZlcnNpb25zIHRoZXkgd2VyZSBvcmlnaW5hbGx5IHNhdmVkIGFnYWluc3Rcblx0ICovXG5cdGVudHJpZXM6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBoYXMgYmVlbiBzYXZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGEgc3BlY2lmaWMgZmF2b3JpdGUgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgdHlwZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UgPSBFbmRwb2ludEZhdm9yaXRlRW50cnk7XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IGV4dGVuZHMgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHNldFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgcmVtb3ZpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVSZW1vdmVSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwidXJsLWRvbWFpblwiIHwgXCJ1cmwtcGFnZVwiIHwgXCJ1cmwtYW55XCIgfCBcInVybC1ub25lXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1ub25lXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwidXJsLWFueVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwidXJsLXBhZ2VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcInVybC1kb21haW5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0Q3VzdG9tVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UsXG5cdHR5cGUgRmF2b3JpdGVDbGllbnQsXG5cdHR5cGUgRmF2b3JpdGVFbnRyeSxcblx0dHlwZSBGYXZvcml0ZUluZm8sXG5cdHR5cGUgRmF2b3JpdGVUeXBlTmFtZXNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkLFxuXHRXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlc1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3Igd29ya3NwYWNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFdvcmtzcGFjZXNTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGRlZmF1bHQgYmFzZSBzY29yZSBmb3Igb3JkZXJpbmcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RFRkFVTFRfQkFTRV9TQ09SRSA9IDEwMDtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIG9wZW5pbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9PUEVOX1dPUktTUEFDRSA9IFwiT3BlbiBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGRlbGV0aW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSA9IFwiRGVsZXRlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2hhcmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NIQVJFX1dPUktTUEFDRSA9IFwiU2hhcmUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzYXZpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TQVZFX1dPUktTUEFDRSA9IFwiU2F2ZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgd29ya3NwYWNlIGV4aXN0cy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UgPSBcIldvcmtzcGFjZSBFeGlzdHNcIjtcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxXb3Jrc3BhY2VzU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IFdvcmtzcGFjZXNTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgdGhlbWUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBTdWJzY3JpcHRpb24gaWQgZm9yIGZhdm9yaXRlLWNoYW5nZWQgbGlmZWN5Y2xlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBfZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248V29ya3NwYWNlc1NldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXb3Jrc3BhY2VzUHJvdmlkZXJcIik7XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQ8V29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ+KFxuXHRcdFx0XHRcIndvcmtzcGFjZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdGFzeW5jIChcblx0XHRcdFx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0XHRcdFx0cGF5bG9hZD86IFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkXG5cdFx0XHRcdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0XHRcdGlmIChwYXlsb2FkPy5hY3Rpb24gPT09IFwiY3JlYXRlXCIpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnkpICYmICF0aGlzLl9sYXN0UXVlcnkuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbGFzdFJlc3VsdCA9IHRoaXMuX2xhc3RSZXN1bHRzPy5maW5kKChyZXMpID0+IHJlcy5rZXkgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0aWYgKGxhc3RSZXN1bHQgJiYgcGF5bG9hZC53b3Jrc3BhY2UpIHtcblx0XHRcdFx0XHRcdFx0bGFzdFJlc3VsdC50aXRsZSA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRsYXN0UmVzdWx0LmRhdGEud29ya3NwYWNlVGl0bGUgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblx0XHRcdFx0XHRcdFx0KGxhc3RSZXN1bHQudGVtcGxhdGVDb250ZW50IGFzIEN1c3RvbVRlbXBsYXRlKS5kYXRhLnRpdGxlID0gcGF5bG9hZC53b3Jrc3BhY2UudGl0bGU7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUoW2xhc3RSZXN1bHRdKTtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdFx0XHRcdGlmIChmYXZvcml0ZUNsaWVudD8uc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGUgPSBhd2FpdCBzYXZlZD8uZmluZCgoZikgPT4gZi50eXBlSWQgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChmYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmF2b3JpdGUubGFiZWwgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LnNldFNhdmVkRmF2b3JpdGUoZmF2b3JpdGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZD8uYWN0aW9uID09PSBcImRlbGV0ZVwiKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlc3VsdFJlbW92ZShwYXlsb2FkLmlkKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50Py5kZWxldGVTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGZhdm9yaXRlID0gYXdhaXQgc2F2ZWQ/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSBwYXlsb2FkLmlkKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZShmYXZvcml0ZS5pZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XCJ0aGVtZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPVxuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQ8RmF2b3JpdGVDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCIsXG5cdFx0XHRcdFx0YXN5bmMgKF86IHVua25vd24sIHBheWxvYWQ/OiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVBcHBGYXZvcml0ZUJ1dHRvbnMocGF5bG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KSB7XG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQodGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsIFwidGhlbWUtY2hhbmdlZFwiKTtcblx0XHRcdFx0dGhpcy5fdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCkpIHtcblx0XHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkLFxuXHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6IGAke3RoaXMuX2RlZmluaXRpb24/LmlkfS1oZWxwMWAsXG5cdFx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHR0aXRsZTogXCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRcdGljb246IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UpLFxuXHRcdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XHRcIldvcmtzcGFjZXNcIixcblx0XHRcdFx0XHRcdFtcIlVzZSB0aGUgd29ya3NwYWNlcyBjb21tYW5kIHRvIHNhdmUgeW91ciBjdXJyZW50IGxheW91dC5cIl0sXG5cdFx0XHRcdFx0XHRbXCIvdyB0aXRsZVwiXVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0gJiYgdGhpcy5fc2V0dGluZ3MpIHtcblx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRsZXQgd29ya3NwYWNlczogV29ya3NwYWNlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFdvcmtzcGFjZXMoKTtcblx0XHRcdGxldCBtYXRjaFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnMucXVlcnlNaW5MZW5ndGg7XG5cblx0XHRcdGlmIChxdWVyeUxvd2VyLnN0YXJ0c1dpdGgoXCIvdyBcIikpIHtcblx0XHRcdFx0Y29uc3QgdGl0bGUgPSBxdWVyeUxvd2VyLnJlcGxhY2UoXCIvdyBcIiwgXCJcIik7XG5cblx0XHRcdFx0Y29uc3QgZm91bmRNYXRjaCA9IHdvcmtzcGFjZXMuZmluZCgoZW50cnkpID0+IGVudHJ5LnRpdGxlLnRvTG93ZXJDYXNlKCkgPT09IHRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0XHRpZiAoZm91bmRNYXRjaCkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRyZXN1bHRzOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHRcdFx0XHR0aXRsZTogYFdvcmtzcGFjZSAke2ZvdW5kTWF0Y2gudGl0bGV9IGFscmVhZHkgZXhpc3RzLmAsXG5cdFx0XHRcdFx0XHRcdFx0aWNvbjogYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZSksXG5cdFx0XHRcdFx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdFx0XHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl0sXG5cdFx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZm91bmRNYXRjaC53b3Jrc3BhY2VJZFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwiUGxhaW5cIiBhcyBDTElUZW1wbGF0ZS5QbGFpbixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHJlc3VsdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0a2V5OiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TQVZFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IGBTYXZlIEN1cnJlbnQgV29ya3NwYWNlIGFzICR7dGl0bGV9YCxcblx0XHRcdFx0XHRcdFx0aWNvbjogYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZSksXG5cdFx0XHRcdFx0XHRcdGxhYmVsOiBcIlN1Z2dlc3Rpb25cIixcblx0XHRcdFx0XHRcdFx0YWN0aW9uczogW3sgbmFtZTogXCJTYXZlIFdvcmtzcGFjZVwiLCBob3RrZXk6IFwiRW50ZXJcIiB9XSxcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogcmFuZG9tVVVJRCgpLFxuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0ZmF2b3JpdGVJbmZvPy5pc0VuYWJsZWQgJiZcblx0XHRcdFx0aXNTdHJpbmdWYWx1ZShmYXZvcml0ZUluZm8/LmNvbW1hbmQpICYmXG5cdFx0XHRcdHF1ZXJ5TG93ZXIgPT09IGZhdm9yaXRlSW5mby5jb21tYW5kICYmXG5cdFx0XHRcdGZhdm9yaXRlQ2xpZW50XG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgZmF2b3JpdGVBcHBzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdGNvbnN0IGZhdklkcyA9IGZhdm9yaXRlQXBwcz8ubWFwKChmKSA9PiBmLnR5cGVJZCkgPz8gW107XG5cdFx0XHRcdHdvcmtzcGFjZXMgPSB3b3Jrc3BhY2VzLmZpbHRlcigoYSkgPT4gZmF2SWRzLmluY2x1ZGVzKGEud29ya3NwYWNlSWQpKTtcblx0XHRcdFx0bWF0Y2hRdWVyeSA9IFwiXCI7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdvcmtzcGFjZVJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0d29ya3NwYWNlcyxcblx0XHRcdFx0bWF0Y2hRdWVyeSxcblx0XHRcdFx0b3B0aW9ucy5xdWVyeU1pbkxlbmd0aFxuXHRcdFx0KTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgPSB3b3Jrc3BhY2VSZXN1bHRzO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiB3b3Jrc3BhY2VSZXN1bHRzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLmVuZHNXaXRoKFwiZmF2b3JpdGVcIikgJiYgcmVzdWx0LmRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5zdGFydHNXaXRoKFwidW5cIikpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShyZXN1bHQuZGF0YT8uZmF2b3JpdGVJZCkgJiYgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKHJlc3VsdC5kYXRhLmZhdm9yaXRlSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSh7XG5cdFx0XHRcdFx0XHRcdGlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHR5cGU6IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHRcdHR5cGVJZDogcmVzdWx0LmtleSxcblx0XHRcdFx0XHRcdFx0bGFiZWw6IHJlc3VsdC50aXRsZSxcblx0XHRcdFx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmltYWdlcy53b3Jrc3BhY2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0pIHtcblx0XHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRcdHdvcmtzcGFjZUlkPzogc3RyaW5nO1xuXHRcdFx0XHRcdHdvcmtzcGFjZVRpdGxlPzogc3RyaW5nO1xuXHRcdFx0XHR9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRcdFx0aWYgKGRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0LmtleSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgc2F2ZSB3b3Jrc3BhY2UgZW50cnlcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHJlc3VsdC5rZXkpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgcGxhdGZvcm0uZ2V0U25hcHNob3QoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJyZW50TWV0YURhdGEgPSBjdXJyZW50V29ya3NwYWNlPy5tZXRhZGF0YTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0ge1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZGF0YS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IGRhdGEud29ya3NwYWNlVGl0bGUgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0bWV0YWRhdGE6IGN1cnJlbnRNZXRhRGF0YSxcblx0XHRcdFx0XHRcdFx0c25hcHNob3Rcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXG5cdFx0XHRcdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRDb25kaXRpb25zQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNvbmRpdGlvbnNDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q29uZGl0aW9uc0NsaWVudCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uc0NsaWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCA9IGF3YWl0IGNvbmRpdGlvbnNDbGllbnQuY2hlY2soXCJzaGFyaW5nXCIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkV29ya3NwYWNlID0gYXdhaXQgdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2UudGl0bGUsXG5cdFx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyBBbmQgYWRkIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbc2F2ZWRXb3Jrc3BhY2VdKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdC8vIERvIG5vdGhpbmcsIHRoZSB1c2VyIG11c3QgdXBkYXRlIHRoZSBxdWVyeSB0byBnaXZlIGl0IGEgZGlmZmVyZW50XG5cdFx0XHRcdFx0XHQvLyBuYW1lIHdoaWNoIHdpbGwgYXV0b21hdGljYWxseSByZWZyZXNoIHRoZSByZXN1bHRzXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlKGRhdGEud29ya3NwYWNlSWQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uYXBwbHlXb3Jrc3BhY2Uod29ya3NwYWNlKTtcblx0XHRcdFx0XHRcdC8vIFdlIHJlYnVpbGQgdGhlIHJlc3VsdHMgaGVyZSBhcyB3ZSB3aWxsIG5vdyBoYXZlIGEgbmV3IGN1cnJlbnQgd29ya3NwYWNlXG5cdFx0XHRcdFx0XHQvLyBhbmQgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGV4aXN0aW5nIG9uZSBiYWNrIHRvIGEgc3RhbmRhcmQgdGVtcGxhdGVcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0XHQvLyBEZWxldGluZyB0aGUgd29ya2luZyB3aWxsIGV2ZW50dWFsbHkgdHJpZ2dlciB0aGUgXCJkZWxldGVcIiBsaWZlY3ljbGVcblx0XHRcdFx0XHRcdC8vIGV2ZW50IHdoaWNoIHdpbGwgcmVtb3ZlIGl0IGZyb20gdGhlIHJlc3VsdCBsaXN0XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0XHRcdHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFICYmXG5cdFx0XHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc2hhcmVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHR5cGU6IFwid29ya3NwYWNlXCIsIHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkIH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFVucmVjb2duaXplZCBhY3Rpb24gZm9yIHdvcmtzcGFjZSBzZWxlY3Rpb246ICR7ZGF0YS53b3Jrc3BhY2VJZH1gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRlbXBsYXRlIGZvciBhIHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgaXRlbS5cblx0ICogQHBhcmFtIHRpdGxlIFRoZSB0aXRsZSBvZiB0aGUgd29ya3NwYWNlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGlzQ3VycmVudCBJcyB0aGlzIHRoZSBjdXJyZW50IHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBob21lIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRpc0N1cnJlbnQ6IGJvb2xlYW4sXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ/OiBzdHJpbmdcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0PiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRjb25zdCBhY3Rpb25CdXR0b25zOiB7IHRpdGxlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH1bXSA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIk9wZW5cIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRsZXQgaW5zdHJ1Y3Rpb25zO1xuXG5cdFx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRcdGluc3RydWN0aW9ucyA9XG5cdFx0XHRcdFx0XCJUaGlzIGlzIHRoZSBjdXJyZW50bHkgYWN0aXZlIHdvcmtzcGFjZS4gWW91IGNhbiB1c2UgdGhlIEJyb3dzZXIgbWVudSB0byB1cGRhdGUvcmVuYW1lIHRoaXMgd29ya3NwYWNlXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnN0cnVjdGlvbnMgPSBcIlVzZSB0aGUgYnV0dG9ucyBiZWxvdyB0byBpbnRlcmFjdCB3aXRoIHlvdXIgc2F2ZWQgd29ya3NwYWNlXCI7XG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K0RcIlxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogXCJEZWxldGVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtTXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblxuXHRcdFx0Y29uc3QgaWNvbiA9IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxheW91dERhdGEgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUxheW91dChcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdFthd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXCJpbnN0cnVjdGlvbnNcIildLFxuXHRcdFx0XHRhY3Rpb25CdXR0b25zLFxuXHRcdFx0XHRoZWFkZXJCdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRrZXk6IGlkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0bGFiZWw6IFwiV29ya3NwYWNlXCIsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdGFjdGlvbnMsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHR3b3Jrc3BhY2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRmYXZvcml0ZUlkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdFx0bGF5b3V0OiBsYXlvdXREYXRhLmxheW91dCxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHQuLi5sYXlvdXREYXRhLmRhdGEsXG5cdFx0XHRcdFx0XHRpbnN0cnVjdGlvbnNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXk6IGlkLFxuXHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiV29ya3NwYWNlXCIsXG5cdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB1bmRlZmluZWRcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlYnVpbGQgdGhlIHJlc3VsdHMgYWZ0ZXIgY29sb3Igc2NoZW1lIGNoYW5nZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSB3b3Jrc3BhY2UgcGxhdGZvcm0uXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgIWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5KSAmJiAhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpKSB7XG5cdFx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0d29ya3NwYWNlcyxcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGhcblx0XHRcdCk7XG5cdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgdGhlIHJlc3VsdHMgZm9yIHRoZSB3b3Jrc3BhY2VzLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHdvcmtzcGFjZXMgVGhlIGxpc3Qgb2Ygd29ya3NwYWNlcyB0byBidWlsZCB0aGUgcmVzdWx0cyBmb3IuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkuXG5cdCAqIEBwYXJhbSBxdWVyeU1pbkxlbmd0aCBUaGUgbWluIHF1ZXJ5IGxlbmd0aC5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaG9tZSBzZWFyY2ggcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgYnVpbGRSZXN1bHRzKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHR3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXJcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIEFycmF5LmlzQXJyYXkod29ya3NwYWNlcykpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlSWQgPSBjdXJyZW50V29ya3NwYWNlPy53b3Jrc3BhY2VJZDtcblx0XHRcdGxldCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldENvbmRpdGlvbnNDbGllbnQpIHtcblx0XHRcdFx0Y29uc3QgY29uZGl0aW9uc0NsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDb25kaXRpb25zQ2xpZW50KCk7XG5cdFx0XHRcdGlmIChjb25kaXRpb25zQ2xpZW50KSB7XG5cdFx0XHRcdFx0c2hhcmVFbmFibGVkID0gYXdhaXQgY29uZGl0aW9uc0NsaWVudC5jaGVjayhcInNoYXJpbmdcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRsZXQgc2F2ZWRGYXZvcml0ZXM6IEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdHNhdmVkRmF2b3JpdGVzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdrc1Byb20gPSB3b3Jrc3BhY2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHwgKHF1ZXJ5Lmxlbmd0aCA+PSBxdWVyeU1pbkxlbmd0aCAmJiB3LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKVxuXHRcdFx0XHQpXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpXG5cdFx0XHRcdC5tYXAoYXN5bmMgKHdzOiBXb3Jrc3BhY2UpID0+IHtcblx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSB3cy53b3Jrc3BhY2VJZCk/LmlkO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHR3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdzLnRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0Y3VycmVudFdvcmtzcGFjZUlkID09PSB3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKHdrc1Byb20pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgb3IgdXBkYXRlIGEgcmVzdWx0LlxuXHQgKiBAcGFyYW0gcmVzdWx0cyBUaGUgcmVzdWx0cyB0byBhZGQgb3IgdXBkYXRlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRBZGRVcGRhdGUocmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdEluZGV4ID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZEluZGV4KChyZXMpID0+IHJlcy5rZXkgPT09IHJlc3VsdC5rZXkpO1xuXHRcdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnNwbGljZShyZXN1bHRJbmRleCwgMSwgcmVzdWx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgaXRlbSB0byByZW1vdmUuXG5cdCAqL1xuXHRwcml2YXRlIHJlc3VsdFJlbW92ZShpZDogc3RyaW5nKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSBpZCk7XG5cdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGlkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBhcHAgYnV0dG9ucyBpZiB0aGUgZmF2b3JpdGVzIGhhdmUgY2hhbmdlZC5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgb2YgdGhlIGZhdm9yaXRlIGNoYW5nZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgdXBkYXRlQXBwRmF2b3JpdGVCdXR0b25zKHBheWxvYWQ6IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSA9IHBheWxvYWQuZmF2b3JpdGU7XG5cblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtICYmXG5cdFx0XHQocGF5bG9hZC5hY3Rpb24gPT09IFwic2V0XCIgfHwgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpICYmXG5cdFx0XHQhaXNFbXB0eShmYXZvcml0ZSkgJiZcblx0XHRcdGZhdm9yaXRlLnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgJiZcblx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzXG5cdFx0KSB7XG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXG5cdFx0XHRpZiAodGhpcy5fbGFzdFF1ZXJ5ID09PSBmYXZvcml0ZUluZm8/LmNvbW1hbmQgJiYgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShmYXZvcml0ZS50eXBlSWQpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCBsYXN0V29ya3NwYWNlID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZCgod3MpID0+IHdzLmtleSA9PT0gZmF2b3JpdGUudHlwZUlkKTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdFdvcmtzcGFjZSkpIHtcblx0XHRcdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0Q29uZGl0aW9uc0NsaWVudCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgY29uZGl0aW9uc0NsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDb25kaXRpb25zQ2xpZW50KCk7XG5cdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uc0NsaWVudCkge1xuXHRcdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCBjb25kaXRpb25zQ2xpZW50LmNoZWNrKFwic2hhcmluZ1wiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZUlkID0gY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdGxhc3RXb3Jrc3BhY2Uua2V5LFxuXHRcdFx0XHRcdFx0bGFzdFdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdGN1cnJlbnRXb3Jrc3BhY2VJZCA9PT0gbGFzdFdvcmtzcGFjZS5rZXksXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKFtyZWJ1aWx0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQgaWYgdGhleSBhcmUgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlVHlwZU5hbWVzIFRoZSB0eXBlIG9mIGNsaWVudCB0byBnZXQuXG5cdCAqIEByZXR1cm5zIFRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEZhdkluZm8oXG5cdFx0ZmF2b3JpdGVUeXBlTmFtZXM6IEZhdm9yaXRlVHlwZU5hbWVzXG5cdCk6IFByb21pc2U8eyBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkIH0+IHtcblx0XHRsZXQgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRcdGlmICgodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZmF2b3JpdGVzRW5hYmxlZCA/PyB0cnVlKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCgpO1xuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdGZhdm9yaXRlSW5mbyA9IGZhdm9yaXRlQ2xpZW50LmdldEluZm8oKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSW5mby5pc0VuYWJsZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpc1N1cHBvcnRlZCA9XG5cdFx0XHRcdFx0XHRpc0VtcHR5KGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMpIHx8IGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoZmF2b3JpdGVUeXBlTmFtZXMpO1xuXHRcdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCxcblx0XHRcdGZhdm9yaXRlSW5mb1xuXHRcdH07XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgV29ya3NwYWNlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogV29ya3NwYWNlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFdvcmtzcGFjZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9