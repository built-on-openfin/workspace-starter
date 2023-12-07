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
                        this._integrationHelpers.getShareClient) {
                        const shareClient = await this._integrationHelpers.getShareClient();
                        if (shareClient) {
                            await shareClient.share("workspace", { workspaceId: data.workspaceId });
                        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBRTVDLE1BQU0sV0FBVyxHQUF5QztJQUNoRSxZQUFZLEVBQUUsSUFBSSw0REFBa0IsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3dvcmtzcGFjZXMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zaGFwZXNcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBBcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfQVBQID0gXCJhcHBcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBXb3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFID0gXCJ3b3Jrc3BhY2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBQYWdlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UgPSBcInBhZ2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBRdWVyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWSA9IFwicXVlcnlcIjtcblxuLyoqXG4gKiBOYW1lcyBmb3IgYWxsIHRoZSBmYXZvcml0ZSB0eXBlcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmF2b3JpdGVUeXBlTmFtZXMgPVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfQVBQXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSBmYXZvcml0ZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVByb3ZpZGVyT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJcyB0aGUgcHJvdmlkZXIgZW5hYmxlZCwgZGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGVuYWJsZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoaXMgaXMgYSBmYXZvcml0ZSBhY3Rpb25cblx0ICovXG5cdGZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0byB1c2UgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIGZhdm9yaXRlIGNhbiBiZSB1bnNldFxuXHQgKi9cblx0dW5mYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCBjb21tYW5kcyBzaG91bGQgaW50ZWdyYXRpb25zIGNoZWNrIGZvciBpZiB0aGV5IGludGVudCB0byBzdXBwb3J0IHRoZSBkaXNwbGF5IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0ZmF2b3JpdGVDb21tYW5kPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29ubmVjdGlvbiBwcm92aWRlciBjYW4gaGF2ZSBhY3Rpb25zIHJlZ2lzdGVyZWQgYWdhaW5zdCBpdCBmcm9tIHRoZSBwbGF0Zm9ybS4gVGhpcyBwcm92aWRlcyBhIGRlZmF1bHQgbGlzdCBvZlxuXHQgKiBhY3Rpb25zIHRoYXQgY29ubmVjdGlvbnMgc2hvdWxkIGJlIGFibGUgdG8gdXNlIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWQgZm9yIHRoYXQgY29ubmVjdGlvbi5cblx0ICovXG5cdHN1cHBvcnRlZEZhdm9yaXRlVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xufVxuXG4vKipcbiAqIFdoZW4gYW4gZW50cnkgaXMgbWFkZSBpdCByZXByZXNlbnRzIGEgdHlwZSBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybS4gVGhpcyBjYW4gYmUgdXNlZCB0byBsb29rdXAgYW5kIGxhdW5jaCB0aGUgdGhpbmcgdGhpcyBlbnRyeSByZWZlcnMgdG8uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBndWlkIHRvIHJlcHJlc2VudCB0aGlzIGZhdm9yaXRlIGVudHJ5IHNvIHRoYXQgaXQgY2FuIGJlIHVwZGF0ZWQgb3IgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZmF2b3JpdGUgdHlwZSB0aGlzIGVudHJ5IHJlcHJlc2VudHNcblx0ICovXG5cdHR5cGVJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IHR5cGUgb2YgZmF2b3JpdGUgZW50cnkgZG9lcyB0aGlzIGVudHJ5IHJlcHJlc2VudFxuXHQgKi9cblx0dHlwZTogRmF2b3JpdGVUeXBlTmFtZXM7XG5cblx0LyoqXG5cdCAqIFRoZSB0aW1lc3RhbXAgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdHRpbWVzdGFtcD86IERhdGU7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGxhYmVsIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGxhYmVsPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGljb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW5mbyB0byByZXR1cm4gdG8gaW50ZXJlc3RlZCBwYXJ0aWVzIHRvIGhlbHAgdGhlbSBzdXBwb3J0IGZhdm9yaXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlSW5mbyB7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gZmF2b3JpdGVcblx0ICovXG5cdGZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byByZW1vdmUgdGhpcyBmYXZvcml0ZVxuXHQgKi9cblx0dW5mYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBIGNvbW1hbmQgdGhhdCBzdXBwb3J0aW5nIG1vZHVsZXMgc2hvdWxkIGxpc3RlbiBmb3IgaWYgdGhleSBhcmUgdG8gZGlzcGxheSBmYXZvcml0ZXMgdGhhdCBmYWxsIHVuZGVyIHRoZW1cblx0ICovXG5cdGNvbW1hbmQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGF0IHR5cGVzIG9mIGZhdm9yaXRlIGl0ZW0gYXJlIHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLCB0aGlzIGFsc28gZGV0ZXJtaW5lcyB0aGUgb3JkZXJpbmcgaW4gdGhlIGRvY2sgbWVudS5cblx0ICovXG5cdGVuYWJsZWRUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG5cdC8qKlxuXHQgKiBJcyBmYXZvcml0ZSBzdXBwb3J0IGVuYWJsZWQgb24gdGhpcyBwbGF0Zm9ybS5cblx0ICovXG5cdGlzRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNsaWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHNvbWUgb3IgYWxsIG9mIHRoZSBmYXZvcml0ZSBmdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVDbGllbnQge1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uIGFib3V0IHdoZXRoZXIgZmF2b3JpdGVzIGFyZSBpbml0aWFsaXplZCBmb3IgdGhlIHBsYXRmb3JtIGFuZCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyBTdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0Z2V0SW5mbygpOiBGYXZvcml0ZUluZm87XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGFsbCAob3Igc29tZSBpZiBieSB0eXBlKSBvZiB0aGUgc2F2ZWQgZmF2b3JpdGVzXG5cdCAqIEBwYXJhbSBieVR5cGUgdGhlIHR5cGUgb2Ygc2F2ZWQgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzYXZlZCBmYXZvcml0ZXMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgaXQgd2FzIHVuYWJsZSB0byBnZXQgYW55IGJhY2tcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGVzKGJ5VHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhIHBhcnRpY3VsYXIgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgdGhlIHNhdmVkIGZhdm9yaXRlIGlmIGF2YWlsYWJsZSBvciBmYWxzZSBpZiBpdCBkaWRuJ3QgZXhpc3Rcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byBzYXZlIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZSB0aGUgRmF2b3JpdGUgeW91IHdpc2ggdG8gc2F2ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIHNhdmVkXG5cdCAqL1xuXHRzZXRTYXZlZEZhdm9yaXRlPyhmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZW1vdmUvZGVsZXRlIGEgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlIHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIGRlbGV0ZWQuXG5cdCAqL1xuXHRkZWxldGVTYXZlZEZhdm9yaXRlPyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmF2b3JpdGUgYW5kIG1ldGEgZGF0YSByZWxhdGVkIHRvIGl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHBsYXRmb3JtIHByb3ZpZGluZyB0aGUgcGF5bG9hZC5cblx0ICovXG5cdG1ldGFEYXRhOiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTtcblx0LyoqXG5cdCAqIFRoZSBmYXZvcml0ZSBlbnRyeVxuXHQgKi9cblx0cGF5bG9hZDogRmF2b3JpdGVFbnRyeTtcbn1cblxuLyoqXG4gKiBBIHJlcXVlc3QgdHlwZSBmb3IgdGhlIEZhdm9yaXRlRW5kcG9pbnQgdGhhdCBnZXRzIGFsbCBzYXZlZCBmYXZvcml0ZSBlbnRyaWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHR5cGUgaWYgc3BlY2lmaWVkIHNob3VsZCBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzcG9uc2UgdG8gb25seSBzZW5kIHRoZSBlbnRyaWVzIHRoYXQgYXJlIHJlbGV2YW50XG5cdCAqL1xuXHRmYXZvcml0ZVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlcyB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSB7XG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiBmYXZvcml0ZSBlbnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb2Ygd2hhdCBwbGF0Zm9ybSB2ZXJzaW9ucyB0aGV5IHdlcmUgb3JpZ2luYWxseSBzYXZlZCBhZ2FpbnN0XG5cdCAqL1xuXHRlbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXTtcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaGFzIGJlZW4gc2F2ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBhIHNwZWNpZmljIGZhdm9yaXRlIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IHR5cGUgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlID0gRW5kcG9pbnRGYXZvcml0ZUVudHJ5O1xuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCBleHRlbmRzIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSBzZXRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIHJlbW92aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2UsIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSxcblx0dHlwZSBGYXZvcml0ZUNsaWVudCxcblx0dHlwZSBGYXZvcml0ZUVudHJ5LFxuXHR0eXBlIEZhdm9yaXRlSW5mbyxcblx0dHlwZSBGYXZvcml0ZVR5cGVOYW1lc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQsXG5cdFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbGlmZWN5Y2xlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSwgcmFuZG9tVVVJRCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciB3b3Jrc3BhY2VzLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlc1Byb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8V29ya3NwYWNlc1NldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMTAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igb3BlbmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX09QRU5fV09SS1NQQUNFID0gXCJPcGVuIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFID0gXCJEZWxldGUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0hBUkVfV09SS1NQQUNFID0gXCJTaGFyZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNhdmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NBVkVfV09SS1NQQUNFID0gXCJTYXZlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSB3b3Jrc3BhY2UgZXhpc3RzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSA9IFwiV29ya3NwYWNlIEV4aXN0c1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPFdvcmtzcGFjZXNTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogV29ya3NwYWNlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0cz86IEhvbWVTZWFyY2hSZXN1bHRbXTtcblxuXHQvKipcblx0ICogU3Vic2NyaXB0aW9uIGlkIGZvciB0aGVtZS1jaGFuZ2VkIGxpZmVjeWNsZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgZmF2b3JpdGUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxXb3Jrc3BhY2VzU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIldvcmtzcGFjZXNQcm92aWRlclwiKTtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFwid29ya3NwYWNlLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKFxuXHRcdFx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdFx0XHRwYXlsb2FkPzogV29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWRcblx0XHRcdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRcdFx0aWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiYgIXRoaXMuX2xhc3RRdWVyeS5zdGFydHNXaXRoKFwiL3cgXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZD8uYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0UmVzdWx0ID0gdGhpcy5fbGFzdFJlc3VsdHM/LmZpbmQoKHJlcykgPT4gcmVzLmtleSA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRpZiAobGFzdFJlc3VsdCAmJiBwYXlsb2FkLndvcmtzcGFjZSkge1xuXHRcdFx0XHRcdFx0XHRsYXN0UmVzdWx0LnRpdGxlID0gcGF5bG9hZC53b3Jrc3BhY2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQuZGF0YS53b3Jrc3BhY2VUaXRsZSA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHQobGFzdFJlc3VsdC50ZW1wbGF0ZUNvbnRlbnQgYXMgQ3VzdG9tVGVtcGxhdGUpLmRhdGEudGl0bGUgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50Py5zZXRTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZSA9IGF3YWl0IHNhdmVkPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmYXZvcml0ZS5sYWJlbCA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZShmYXZvcml0ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkPy5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQ/LmRlbGV0ZVNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGUgPSBhd2FpdCBzYXZlZD8uZmluZCgoZikgPT4gZi50eXBlSWQgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKGZhdm9yaXRlLmlkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcInRoZW1lLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkPihcblx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRhc3luYyAoXzogdW5rbm93biwgcGF5bG9hZD86IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpID0+IHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkKSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCwgXCJ0aGVtZS1jaGFuZ2VkXCIpO1xuXHRcdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIHRoaXMuX3NldHRpbmdzKSB7XG5cdFx0XHRjb25zdCB0aGVtZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRUaGVtZUNsaWVudCgpO1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogYCR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9LWhlbHAxYCxcblx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdHRpdGxlOiBcIldvcmtzcGFjZXNcIixcblx0XHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdFx0aWNvbjogYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZSksXG5cdFx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRcdFwiV29ya3NwYWNlc1wiLFxuXHRcdFx0XHRcdFx0W1wiVXNlIHRoZSB3b3Jrc3BhY2VzIGNvbW1hbmQgdG8gc2F2ZSB5b3VyIGN1cnJlbnQgbGF5b3V0LlwiXSxcblx0XHRcdFx0XHRcdFtcIi93IHRpdGxlXCJdXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW5pbXVtIGxlbmd0aCBiZWZvcmUgYSBxdWVyeSBpcyBhY3Rpb25lZC5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlBZ2FpbnN0IFRoZSBmaWVsZHMgaW4gdGhlIGRhdGEgdG8gcXVlcnkgYWdhaW5zdC5cblx0ICogQHBhcmFtIG9wdGlvbnMuaXNTdWdnZXN0aW9uIElzIHRoZSBxdWVyeSBmcm9tIGEgc3VnZ2VzdGlvbi5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0XHRpc1N1Z2dlc3Rpb24/OiBib29sZWFuO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGxldCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0bGV0IG1hdGNoUXVlcnkgPSBxdWVyeUxvd2VyO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aDtcblxuXHRcdFx0aWYgKHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0XHRjb25zdCB0aXRsZSA9IHF1ZXJ5TG93ZXIucmVwbGFjZShcIi93IFwiLCBcIlwiKTtcblxuXHRcdFx0XHRjb25zdCBmb3VuZE1hdGNoID0gd29ya3NwYWNlcy5maW5kKChlbnRyeSkgPT4gZW50cnkudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gdGl0bGUudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRcdGlmIChmb3VuZE1hdGNoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHJlc3VsdHM6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGtleTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBgV29ya3NwYWNlICR7Zm91bmRNYXRjaC50aXRsZX0gYWxyZWFkeSBleGlzdHMuYCxcblx0XHRcdFx0XHRcdFx0XHRpY29uOiBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybCh0aGlzLl9zZXR0aW5ncy5pbWFnZXMud29ya3NwYWNlKSxcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBmb3VuZE1hdGNoLndvcmtzcGFjZUlkXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NBVkVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogYFNhdmUgQ3VycmVudCBXb3Jrc3BhY2UgYXMgJHt0aXRsZX1gLFxuXHRcdFx0XHRcdFx0XHRpY29uOiBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybCh0aGlzLl9zZXR0aW5ncy5pbWFnZXMud29ya3NwYWNlKSxcblx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiU3VnZ2VzdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb25zOiBbeyBuYW1lOiBcIlNhdmUgV29ya3NwYWNlXCIsIGhvdGtleTogXCJFbnRlclwiIH1dLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdFx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdLFxuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlVGl0bGU6IHRpdGxlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIlBsYWluXCIgYXMgQ0xJVGVtcGxhdGUuUGxhaW4sXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50LCBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRmYXZvcml0ZUluZm8/LmlzRW5hYmxlZCAmJlxuXHRcdFx0XHRpc1N0cmluZ1ZhbHVlKGZhdm9yaXRlSW5mbz8uY29tbWFuZCkgJiZcblx0XHRcdFx0cXVlcnlMb3dlciA9PT0gZmF2b3JpdGVJbmZvLmNvbW1hbmQgJiZcblx0XHRcdFx0ZmF2b3JpdGVDbGllbnRcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUFwcHMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0Y29uc3QgZmF2SWRzID0gZmF2b3JpdGVBcHBzPy5tYXAoKGYpID0+IGYudHlwZUlkKSA/PyBbXTtcblx0XHRcdFx0d29ya3NwYWNlcyA9IHdvcmtzcGFjZXMuZmlsdGVyKChhKSA9PiBmYXZJZHMuaW5jbHVkZXMoYS53b3Jrc3BhY2VJZCkpO1xuXHRcdFx0XHRtYXRjaFF1ZXJ5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgd29ya3NwYWNlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMoXG5cdFx0XHRcdHBsYXRmb3JtLFxuXHRcdFx0XHR3b3Jrc3BhY2VzLFxuXHRcdFx0XHRtYXRjaFF1ZXJ5LFxuXHRcdFx0XHRvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoXG5cdFx0XHQpO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzdWx0cyA9IHdvcmtzcGFjZVJlc3VsdHM7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IHdvcmtzcGFjZVJlc3VsdHNcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtdXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUuZW5kc1dpdGgoXCJmYXZvcml0ZVwiKSAmJiByZXN1bHQuZGF0YT8ud29ya3NwYWNlSWQpIHtcblx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLnN0YXJ0c1dpdGgoXCJ1blwiKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHJlc3VsdC5kYXRhPy5mYXZvcml0ZUlkKSAmJiBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IGZhdm9yaXRlQ2xpZW50LmRlbGV0ZVNhdmVkRmF2b3JpdGUocmVzdWx0LmRhdGEuZmF2b3JpdGVJZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChmYXZvcml0ZUNsaWVudC5zZXRTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5zZXRTYXZlZEZhdm9yaXRlKHtcblx0XHRcdFx0XHRcdFx0aWQ6IHJhbmRvbVVVSUQoKSxcblx0XHRcdFx0XHRcdFx0dHlwZTogRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdFx0dHlwZUlkOiByZXN1bHQua2V5LFxuXHRcdFx0XHRcdFx0XHRsYWJlbDogcmVzdWx0LnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uaW1hZ2VzLndvcmtzcGFjZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdFx0d29ya3NwYWNlSWQ/OiBzdHJpbmc7XG5cdFx0XHRcdFx0d29ya3NwYWNlVGl0bGU/OiBzdHJpbmc7XG5cdFx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRpZiAoZGF0YT8ud29ya3NwYWNlSWQpIHtcblx0XHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGlmIChyZXN1bHQua2V5ID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TQVZFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBzYXZlIHdvcmtzcGFjZSBlbnRyeVxuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRSZW1vdmUocmVzdWx0LmtleSk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc25hcHNob3QgPSBhd2FpdCBwbGF0Zm9ybS5nZXRTbmFwc2hvdCgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLmdldEN1cnJlbnRXb3Jrc3BhY2UoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRNZXRhRGF0YSA9IGN1cnJlbnRXb3Jrc3BhY2U/Lm1ldGFkYXRhO1xuXG5cdFx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2UgPSB7XG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogZGF0YS53b3Jrc3BhY2VUaXRsZSA/PyBcIlwiLFxuXHRcdFx0XHRcdFx0XHRtZXRhZGF0YTogY3VycmVudE1ldGFEYXRhLFxuXHRcdFx0XHRcdFx0XHRzbmFwc2hvdFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5zYXZlV29ya3NwYWNlKHdvcmtzcGFjZSk7XG5cblx0XHRcdFx0XHRcdGxldCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldENvbmRpdGlvbnNDbGllbnQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29uZGl0aW9uc0NsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDb25kaXRpb25zQ2xpZW50KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChjb25kaXRpb25zQ2xpZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkID0gYXdhaXQgY29uZGl0aW9uc0NsaWVudC5jaGVjayhcInNoYXJpbmdcIik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLmdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2Uud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0XHRmYXZvcml0ZUluZm9cblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdC8vIEFuZCBhZGQgdGhlIG5ldyBvbmVcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKFtzYXZlZFdvcmtzcGFjZV0pO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmtleSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdFx0Ly8gRG8gbm90aGluZywgdGhlIHVzZXIgbXVzdCB1cGRhdGUgdGhlIHF1ZXJ5IHRvIGdpdmUgaXQgYSBkaWZmZXJlbnRcblx0XHRcdFx0XHRcdC8vIG5hbWUgd2hpY2ggd2lsbCBhdXRvbWF0aWNhbGx5IHJlZnJlc2ggdGhlIHJlc3VsdHNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fT1BFTl9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5hcHBseVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXHRcdFx0XHRcdFx0Ly8gV2UgcmVidWlsZCB0aGUgcmVzdWx0cyBoZXJlIGFzIHdlIHdpbGwgbm93IGhhdmUgYSBuZXcgY3VycmVudCB3b3Jrc3BhY2Vcblx0XHRcdFx0XHRcdC8vIGFuZCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgZXhpc3Rpbmcgb25lIGJhY2sgdG8gYSBzdGFuZGFyZCB0ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmRlbGV0ZVdvcmtzcGFjZShkYXRhLndvcmtzcGFjZUlkKTtcblx0XHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSB3b3JraW5nIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdFx0Ly8gZXZlbnQgd2hpY2ggd2lsbCByZW1vdmUgaXQgZnJvbSB0aGUgcmVzdWx0IGxpc3Rcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRcdFx0cmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UgJiZcblx0XHRcdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRTaGFyZUNsaWVudFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2hhcmVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0U2hhcmVDbGllbnQoKTtcblx0XHRcdFx0XHRcdGlmIChzaGFyZUNsaWVudCkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBzaGFyZUNsaWVudC5zaGFyZShcIndvcmtzcGFjZVwiLCB7IHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkIH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFVucmVjb2duaXplZCBhY3Rpb24gZm9yIHdvcmtzcGFjZSBzZWxlY3Rpb246ICR7ZGF0YS53b3Jrc3BhY2VJZH1gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRlbXBsYXRlIGZvciBhIHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgaXRlbS5cblx0ICogQHBhcmFtIHRpdGxlIFRoZSB0aXRsZSBvZiB0aGUgd29ya3NwYWNlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGlzQ3VycmVudCBJcyB0aGlzIHRoZSBjdXJyZW50IHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBob21lIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRpc0N1cnJlbnQ6IGJvb2xlYW4sXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ/OiBzdHJpbmdcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0PiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRjb25zdCBhY3Rpb25CdXR0b25zOiB7IHRpdGxlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH1bXSA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIk9wZW5cIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRsZXQgaW5zdHJ1Y3Rpb25zO1xuXG5cdFx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRcdGluc3RydWN0aW9ucyA9XG5cdFx0XHRcdFx0XCJUaGlzIGlzIHRoZSBjdXJyZW50bHkgYWN0aXZlIHdvcmtzcGFjZS4gWW91IGNhbiB1c2UgdGhlIEJyb3dzZXIgbWVudSB0byB1cGRhdGUvcmVuYW1lIHRoaXMgd29ya3NwYWNlXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnN0cnVjdGlvbnMgPSBcIlVzZSB0aGUgYnV0dG9ucyBiZWxvdyB0byBpbnRlcmFjdCB3aXRoIHlvdXIgc2F2ZWQgd29ya3NwYWNlXCI7XG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K0RcIlxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogXCJEZWxldGVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtTXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblxuXHRcdFx0Y29uc3QgaWNvbiA9IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChcblx0XHRcdFx0XHQhaXNFbXB0eShmYXZvcml0ZUlkKSA/IGZhdkluZm8uZmF2b3JpdGVJY29uIDogZmF2SW5mby51bmZhdm9yaXRlSWNvblxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZmF2b3JpdGVJY29uKSB7XG5cdFx0XHRcdFx0aGVhZGVyQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdGljb246IGZhdm9yaXRlSWNvbixcblx0XHRcdFx0XHRcdGFjdGlvbjogIWlzRW1wdHkoZmF2b3JpdGVJZCkgPyBcInVuZmF2b3JpdGVcIiA6IFwiZmF2b3JpdGVcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxheW91dERhdGEgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUxheW91dChcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdFthd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXCJpbnN0cnVjdGlvbnNcIildLFxuXHRcdFx0XHRhY3Rpb25CdXR0b25zLFxuXHRcdFx0XHRoZWFkZXJCdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRrZXk6IGlkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0bGFiZWw6IFwiV29ya3NwYWNlXCIsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdGFjdGlvbnMsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHR3b3Jrc3BhY2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRmYXZvcml0ZUlkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdFx0bGF5b3V0OiBsYXlvdXREYXRhLmxheW91dCxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHQuLi5sYXlvdXREYXRhLmRhdGEsXG5cdFx0XHRcdFx0XHRpbnN0cnVjdGlvbnNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXk6IGlkLFxuXHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiV29ya3NwYWNlXCIsXG5cdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB1bmRlZmluZWRcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlYnVpbGQgdGhlIHJlc3VsdHMgYWZ0ZXIgY29sb3Igc2NoZW1lIGNoYW5nZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSB3b3Jrc3BhY2UgcGxhdGZvcm0uXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgIWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5KSAmJiAhaXNFbXB0eSh0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgpKSB7XG5cdFx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0d29ya3NwYWNlcyxcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGhcblx0XHRcdCk7XG5cdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgdGhlIHJlc3VsdHMgZm9yIHRoZSB3b3Jrc3BhY2VzLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHdvcmtzcGFjZXMgVGhlIGxpc3Qgb2Ygd29ya3NwYWNlcyB0byBidWlsZCB0aGUgcmVzdWx0cyBmb3IuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkuXG5cdCAqIEBwYXJhbSBxdWVyeU1pbkxlbmd0aCBUaGUgbWluIHF1ZXJ5IGxlbmd0aC5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaG9tZSBzZWFyY2ggcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgYnVpbGRSZXN1bHRzKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHR3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXJcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIEFycmF5LmlzQXJyYXkod29ya3NwYWNlcykpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlSWQgPSBjdXJyZW50V29ya3NwYWNlPy53b3Jrc3BhY2VJZDtcblx0XHRcdGxldCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldENvbmRpdGlvbnNDbGllbnQpIHtcblx0XHRcdFx0Y29uc3QgY29uZGl0aW9uc0NsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDb25kaXRpb25zQ2xpZW50KCk7XG5cdFx0XHRcdGlmIChjb25kaXRpb25zQ2xpZW50KSB7XG5cdFx0XHRcdFx0c2hhcmVFbmFibGVkID0gYXdhaXQgY29uZGl0aW9uc0NsaWVudC5jaGVjayhcInNoYXJpbmdcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUNsaWVudCwgZmF2b3JpdGVJbmZvIH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRsZXQgc2F2ZWRGYXZvcml0ZXM6IEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdHNhdmVkRmF2b3JpdGVzID0gYXdhaXQgZmF2b3JpdGVDbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXMoRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdrc1Byb20gPSB3b3Jrc3BhY2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHwgKHF1ZXJ5Lmxlbmd0aCA+PSBxdWVyeU1pbkxlbmd0aCAmJiB3LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKVxuXHRcdFx0XHQpXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpXG5cdFx0XHRcdC5tYXAoYXN5bmMgKHdzOiBXb3Jrc3BhY2UpID0+IHtcblx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZUlkID0gc2F2ZWRGYXZvcml0ZXM/LmZpbmQoKGYpID0+IGYudHlwZUlkID09PSB3cy53b3Jrc3BhY2VJZCk/LmlkO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHR3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdzLnRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0Y3VycmVudFdvcmtzcGFjZUlkID09PSB3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyxcblx0XHRcdFx0XHRcdGZhdm9yaXRlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKHdrc1Byb20pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgb3IgdXBkYXRlIGEgcmVzdWx0LlxuXHQgKiBAcGFyYW0gcmVzdWx0cyBUaGUgcmVzdWx0cyB0byBhZGQgb3IgdXBkYXRlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRBZGRVcGRhdGUocmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdEluZGV4ID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZEluZGV4KChyZXMpID0+IHJlcy5rZXkgPT09IHJlc3VsdC5rZXkpO1xuXHRcdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnNwbGljZShyZXN1bHRJbmRleCwgMSwgcmVzdWx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgaXRlbSB0byByZW1vdmUuXG5cdCAqL1xuXHRwcml2YXRlIHJlc3VsdFJlbW92ZShpZDogc3RyaW5nKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSBpZCk7XG5cdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGlkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBhcHAgYnV0dG9ucyBpZiB0aGUgZmF2b3JpdGVzIGhhdmUgY2hhbmdlZC5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgb2YgdGhlIGZhdm9yaXRlIGNoYW5nZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgdXBkYXRlQXBwRmF2b3JpdGVCdXR0b25zKHBheWxvYWQ6IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSA9IHBheWxvYWQuZmF2b3JpdGU7XG5cblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9sYXN0UmVzcG9uc2UpICYmXG5cdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtICYmXG5cdFx0XHQocGF5bG9hZC5hY3Rpb24gPT09IFwic2V0XCIgfHwgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpICYmXG5cdFx0XHQhaXNFbXB0eShmYXZvcml0ZSkgJiZcblx0XHRcdGZhdm9yaXRlLnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgJiZcblx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzXG5cdFx0KSB7XG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXG5cdFx0XHRpZiAodGhpcy5fbGFzdFF1ZXJ5ID09PSBmYXZvcml0ZUluZm8/LmNvbW1hbmQgJiYgcGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShmYXZvcml0ZS50eXBlSWQpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCBsYXN0V29ya3NwYWNlID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZCgod3MpID0+IHdzLmtleSA9PT0gZmF2b3JpdGUudHlwZUlkKTtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkobGFzdFdvcmtzcGFjZSkpIHtcblx0XHRcdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0Q29uZGl0aW9uc0NsaWVudCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgY29uZGl0aW9uc0NsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDb25kaXRpb25zQ2xpZW50KCk7XG5cdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uc0NsaWVudCkge1xuXHRcdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCBjb25kaXRpb25zQ2xpZW50LmNoZWNrKFwic2hhcmluZ1wiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZUlkID0gY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdGxhc3RXb3Jrc3BhY2Uua2V5LFxuXHRcdFx0XHRcdFx0bGFzdFdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdGN1cnJlbnRXb3Jrc3BhY2VJZCA9PT0gbGFzdFdvcmtzcGFjZS5rZXksXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKFtyZWJ1aWx0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQgaWYgdGhleSBhcmUgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlVHlwZU5hbWVzIFRoZSB0eXBlIG9mIGNsaWVudCB0byBnZXQuXG5cdCAqIEByZXR1cm5zIFRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEZhdkluZm8oXG5cdFx0ZmF2b3JpdGVUeXBlTmFtZXM6IEZhdm9yaXRlVHlwZU5hbWVzXG5cdCk6IFByb21pc2U8eyBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkIH0+IHtcblx0XHRsZXQgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRcdGlmICgodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZmF2b3JpdGVzRW5hYmxlZCA/PyB0cnVlKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCgpO1xuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdGZhdm9yaXRlSW5mbyA9IGZhdm9yaXRlQ2xpZW50LmdldEluZm8oKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSW5mby5pc0VuYWJsZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpc1N1cHBvcnRlZCA9XG5cdFx0XHRcdFx0XHRpc0VtcHR5KGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMpIHx8IGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoZmF2b3JpdGVUeXBlTmFtZXMpO1xuXHRcdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCxcblx0XHRcdGZhdm9yaXRlSW5mb1xuXHRcdH07XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgV29ya3NwYWNlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogV29ya3NwYWNlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFdvcmtzcGFjZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9