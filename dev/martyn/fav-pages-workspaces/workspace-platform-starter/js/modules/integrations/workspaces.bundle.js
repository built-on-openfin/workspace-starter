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
            const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            return [
                {
                    key: `${this._definition?.id}-help1`,
                    score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
                    title: "Workspaces",
                    label: "Help",
                    icon: this.themeUrl(this._settings.images.workspace, iconFolder, colorScheme),
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
            const platform = this._integrationHelpers.getPlatform();
            const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
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
                                icon: this.themeUrl(this._settings.images.workspace, iconFolder, colorScheme),
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
                            icon: this.themeUrl(this._settings.images.workspace, iconFolder, colorScheme),
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
            const workspaceResults = await this.buildResults(platform, workspaces, matchQuery, options.queryMinLength, iconFolder, colorScheme);
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
                        if (this._integrationHelpers.condition) {
                            shareEnabled = await this._integrationHelpers.condition("sharing");
                        }
                        const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
                        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
                        const { favoriteInfo } = await this.getFavInfo(workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_0__.FAVORITE_TYPE_NAME_WORKSPACE);
                        const savedWorkspace = await this.getWorkspaceTemplate(workspace.workspaceId, workspace.title, shareEnabled, true, iconFolder, colorScheme, favoriteInfo);
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
     * @param iconFolder The folder for storing icons.
     * @param colorScheme The current color scheme.
     * @param favInfo The favorites info if it is enabled.
     * @param favoriteId The id of the favorite.
     * @returns The home result.
     */
    async getWorkspaceTemplate(id, title, shareEnabled, isCurrent, iconFolder, colorScheme, favInfo, favoriteId) {
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
            const icon = this.themeUrl(this._settings.images.workspace, iconFolder, colorScheme);
            const headerButtons = [];
            if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
                const favoriteIcon = this.themeUrl(!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon, iconFolder, colorScheme);
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
            const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            const workspaces = await platform.Storage.getWorkspaces();
            const results = await this.buildResults(platform, workspaces, this._lastQuery, this._lastQueryMinLength, iconFolder, colorScheme);
            this.resultAddUpdate(results);
        }
    }
    /**
     * Build the results for the workspaces.
     * @param platform The workspace platform.
     * @param workspaces The list of workspaces to build the results for.
     * @param query The query.
     * @param queryMinLength The min query length.
     * @param iconFolder The folder for storing icons.
     * @param colorScheme The color scheme.
     * @returns The list of home search results.
     */
    async buildResults(platform, workspaces, query, queryMinLength, iconFolder, colorScheme) {
        let results = [];
        if (this._integrationHelpers && Array.isArray(workspaces)) {
            const currentWorkspace = await platform.getCurrentWorkspace();
            const currentWorkspaceId = currentWorkspace?.workspaceId;
            let shareEnabled = false;
            if (this._integrationHelpers.condition) {
                shareEnabled = await this._integrationHelpers.condition("sharing");
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
                return this.getWorkspaceTemplate(ws.workspaceId, ws.title, shareEnabled, currentWorkspaceId === ws.workspaceId, iconFolder, colorScheme, favoriteInfo, favoriteId);
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
            const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
                this._lastResponse.revoke(favorite.typeId);
            }
            else if (this._lastResults) {
                const lastWorkspace = this._lastResults.find((ws) => ws.key === favorite.typeId);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(lastWorkspace)) {
                    let shareEnabled = false;
                    if (this._integrationHelpers.condition) {
                        shareEnabled = await this._integrationHelpers.condition("sharing");
                    }
                    const platform = this._integrationHelpers.getPlatform();
                    const currentWorkspace = await platform.getCurrentWorkspace();
                    const currentWorkspaceId = currentWorkspace?.workspaceId;
                    const rebuilt = await this.getWorkspaceTemplate(lastWorkspace.key, lastWorkspace.title, shareEnabled, currentWorkspaceId === lastWorkspace.key, iconFolder, colorScheme, favoriteInfo, payload.action === "set" ? favorite.id : undefined);
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
    /**
     * Apply theming to an icon url.
     * @param url The url to theme.
     * @param iconFolder The icon folder.
     * @param colorSchemeMode The color scheme.
     * @returns The themed url.
     */
    themeUrl(url, iconFolder, colorSchemeMode) {
        return url
            ? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode)
            : undefined;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBRTVDLE1BQU0sV0FBVyxHQUF5QztJQUNoRSxZQUFZLEVBQUUsSUFBSSw0REFBa0IsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3dvcmtzcGFjZXMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zaGFwZXNcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBBcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfQVBQID0gXCJhcHBcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBXb3Jrc3BhY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFID0gXCJ3b3Jrc3BhY2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBQYWdlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UgPSBcInBhZ2VcIjtcblxuLyoqXG4gKiBGYXZvcml0ZSB0eXBlIGZvciBRdWVyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWSA9IFwicXVlcnlcIjtcblxuLyoqXG4gKiBOYW1lcyBmb3IgYWxsIHRoZSBmYXZvcml0ZSB0eXBlcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmF2b3JpdGVUeXBlTmFtZXMgPVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfQVBQXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0Vcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSBmYXZvcml0ZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVByb3ZpZGVyT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJcyB0aGUgcHJvdmlkZXIgZW5hYmxlZCwgZGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdGVuYWJsZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoaXMgaXMgYSBmYXZvcml0ZSBhY3Rpb25cblx0ICovXG5cdGZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWNvbiB0byB1c2UgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIGZhdm9yaXRlIGNhbiBiZSB1bnNldFxuXHQgKi9cblx0dW5mYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCBjb21tYW5kcyBzaG91bGQgaW50ZWdyYXRpb25zIGNoZWNrIGZvciBpZiB0aGV5IGludGVudCB0byBzdXBwb3J0IHRoZSBkaXNwbGF5IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0ZmF2b3JpdGVDb21tYW5kPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29ubmVjdGlvbiBwcm92aWRlciBjYW4gaGF2ZSBhY3Rpb25zIHJlZ2lzdGVyZWQgYWdhaW5zdCBpdCBmcm9tIHRoZSBwbGF0Zm9ybS4gVGhpcyBwcm92aWRlcyBhIGRlZmF1bHQgbGlzdCBvZlxuXHQgKiBhY3Rpb25zIHRoYXQgY29ubmVjdGlvbnMgc2hvdWxkIGJlIGFibGUgdG8gdXNlIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWQgZm9yIHRoYXQgY29ubmVjdGlvbi5cblx0ICovXG5cdHN1cHBvcnRlZEZhdm9yaXRlVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xufVxuXG4vKipcbiAqIFdoZW4gYW4gZW50cnkgaXMgbWFkZSBpdCByZXByZXNlbnRzIGEgdHlwZSBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybS4gVGhpcyBjYW4gYmUgdXNlZCB0byBsb29rdXAgYW5kIGxhdW5jaCB0aGUgdGhpbmcgdGhpcyBlbnRyeSByZWZlcnMgdG8uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBndWlkIHRvIHJlcHJlc2VudCB0aGlzIGZhdm9yaXRlIGVudHJ5IHNvIHRoYXQgaXQgY2FuIGJlIHVwZGF0ZWQgb3IgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZmF2b3JpdGUgdHlwZSB0aGlzIGVudHJ5IHJlcHJlc2VudHNcblx0ICovXG5cdHR5cGVJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IHR5cGUgb2YgZmF2b3JpdGUgZW50cnkgZG9lcyB0aGlzIGVudHJ5IHJlcHJlc2VudFxuXHQgKi9cblx0dHlwZTogRmF2b3JpdGVUeXBlTmFtZXM7XG5cblx0LyoqXG5cdCAqIFRoZSB0aW1lc3RhbXAgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdHRpbWVzdGFtcD86IERhdGU7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGxhYmVsIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGxhYmVsPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXZvaWQgYSBsb29rdXBcblx0ICovXG5cdGljb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW5mbyB0byByZXR1cm4gdG8gaW50ZXJlc3RlZCBwYXJ0aWVzIHRvIGhlbHAgdGhlbSBzdXBwb3J0IGZhdm9yaXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlSW5mbyB7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gZmF2b3JpdGVcblx0ICovXG5cdGZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byByZW1vdmUgdGhpcyBmYXZvcml0ZVxuXHQgKi9cblx0dW5mYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBIGNvbW1hbmQgdGhhdCBzdXBwb3J0aW5nIG1vZHVsZXMgc2hvdWxkIGxpc3RlbiBmb3IgaWYgdGhleSBhcmUgdG8gZGlzcGxheSBmYXZvcml0ZXMgdGhhdCBmYWxsIHVuZGVyIHRoZW1cblx0ICovXG5cdGNvbW1hbmQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGF0IHR5cGVzIG9mIGZhdm9yaXRlIGl0ZW0gYXJlIHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLCB0aGlzIGFsc28gZGV0ZXJtaW5lcyB0aGUgb3JkZXJpbmcgaW4gdGhlIGRvY2sgbWVudS5cblx0ICovXG5cdGVuYWJsZWRUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG5cdC8qKlxuXHQgKiBJcyBmYXZvcml0ZSBzdXBwb3J0IGVuYWJsZWQgb24gdGhpcyBwbGF0Zm9ybS5cblx0ICovXG5cdGlzRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNsaWVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHNvbWUgb3IgYWxsIG9mIHRoZSBmYXZvcml0ZSBmdW5jdGlvbmFsaXR5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVDbGllbnQge1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uIGFib3V0IHdoZXRoZXIgZmF2b3JpdGVzIGFyZSBpbml0aWFsaXplZCBmb3IgdGhlIHBsYXRmb3JtIGFuZCBzdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyBTdXBwb3J0aW5nIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0Z2V0SW5mbygpOiBGYXZvcml0ZUluZm87XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGFsbCAob3Igc29tZSBpZiBieSB0eXBlKSBvZiB0aGUgc2F2ZWQgZmF2b3JpdGVzXG5cdCAqIEBwYXJhbSBieVR5cGUgdGhlIHR5cGUgb2Ygc2F2ZWQgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzYXZlZCBmYXZvcml0ZXMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgaXQgd2FzIHVuYWJsZSB0byBnZXQgYW55IGJhY2tcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGVzKGJ5VHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhIHBhcnRpY3VsYXIgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgdGhlIHNhdmVkIGZhdm9yaXRlIGlmIGF2YWlsYWJsZSBvciBmYWxzZSBpZiBpdCBkaWRuJ3QgZXhpc3Rcblx0ICovXG5cdGdldFNhdmVkRmF2b3JpdGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byBzYXZlIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZSB0aGUgRmF2b3JpdGUgeW91IHdpc2ggdG8gc2F2ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIHNhdmVkXG5cdCAqL1xuXHRzZXRTYXZlZEZhdm9yaXRlPyhmYXZvcml0ZTogRmF2b3JpdGVFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZW1vdmUvZGVsZXRlIGEgc2F2ZWQgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZhdm9yaXRlIHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZmF2b3JpdGUgd2FzIGRlbGV0ZWQuXG5cdCAqL1xuXHRkZWxldGVTYXZlZEZhdm9yaXRlPyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmF2b3JpdGUgYW5kIG1ldGEgZGF0YSByZWxhdGVkIHRvIGl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHBsYXRmb3JtIHByb3ZpZGluZyB0aGUgcGF5bG9hZC5cblx0ICovXG5cdG1ldGFEYXRhOiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTtcblx0LyoqXG5cdCAqIFRoZSBmYXZvcml0ZSBlbnRyeVxuXHQgKi9cblx0cGF5bG9hZDogRmF2b3JpdGVFbnRyeTtcbn1cblxuLyoqXG4gKiBBIHJlcXVlc3QgdHlwZSBmb3IgdGhlIEZhdm9yaXRlRW5kcG9pbnQgdGhhdCBnZXRzIGFsbCBzYXZlZCBmYXZvcml0ZSBlbnRyaWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHR5cGUgaWYgc3BlY2lmaWVkIHNob3VsZCBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzcG9uc2UgdG8gb25seSBzZW5kIHRoZSBlbnRyaWVzIHRoYXQgYXJlIHJlbGV2YW50XG5cdCAqL1xuXHRmYXZvcml0ZVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlcyB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSB7XG5cdC8qKlxuXHQgKiBUaGUgbGlzdCBvZiBmYXZvcml0ZSBlbnRyaWVzIHdpdGggaW5mb3JtYXRpb24gb2Ygd2hhdCBwbGF0Zm9ybSB2ZXJzaW9ucyB0aGV5IHdlcmUgb3JpZ2luYWxseSBzYXZlZCBhZ2FpbnN0XG5cdCAqL1xuXHRlbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXTtcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaGFzIGJlZW4gc2F2ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBhIHNwZWNpZmljIGZhdm9yaXRlIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IHR5cGUgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlID0gRW5kcG9pbnRGYXZvcml0ZUVudHJ5O1xuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCBleHRlbmRzIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSBzZXRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIHJlbW92aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBpcyB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2UsIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSxcblx0dHlwZSBGYXZvcml0ZUNsaWVudCxcblx0dHlwZSBGYXZvcml0ZUVudHJ5LFxuXHR0eXBlIEZhdm9yaXRlSW5mbyxcblx0dHlwZSBGYXZvcml0ZVR5cGVOYW1lc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlZ3JhdGlvbkhlbHBlcnMsXG5cdEludGVncmF0aW9uTW9kdWxlLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZURlZmluaXRpb25cbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQsXG5cdFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbGlmZWN5Y2xlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDb2xvclNjaGVtZU1vZGUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3RoZW1lLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSwgcmFuZG9tVVVJRCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciB3b3Jrc3BhY2VzLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlc1Byb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8V29ya3NwYWNlc1NldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMTAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igb3BlbmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX09QRU5fV09SS1NQQUNFID0gXCJPcGVuIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFID0gXCJEZWxldGUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0hBUkVfV09SS1NQQUNFID0gXCJTaGFyZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNhdmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NBVkVfV09SS1NQQUNFID0gXCJTYXZlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSB3b3Jrc3BhY2UgZXhpc3RzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSA9IFwiV29ya3NwYWNlIEV4aXN0c1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPFdvcmtzcGFjZXNTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogV29ya3NwYWNlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0cz86IEhvbWVTZWFyY2hSZXN1bHRbXTtcblxuXHQvKipcblx0ICogU3Vic2NyaXB0aW9uIGlkIGZvciB0aGVtZS1jaGFuZ2VkIGxpZmVjeWNsZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFN1YnNjcmlwdGlvbiBpZCBmb3IgZmF2b3JpdGUtY2hhbmdlZCBsaWZlY3ljbGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIF9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxXb3Jrc3BhY2VzU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIldvcmtzcGFjZXNQcm92aWRlclwiKTtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZD4oXG5cdFx0XHRcdFwid29ya3NwYWNlLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKFxuXHRcdFx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdFx0XHRwYXlsb2FkPzogV29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWRcblx0XHRcdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRcdFx0aWYgKHBheWxvYWQ/LmFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiYgIXRoaXMuX2xhc3RRdWVyeS5zdGFydHNXaXRoKFwiL3cgXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZD8uYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0UmVzdWx0ID0gdGhpcy5fbGFzdFJlc3VsdHM/LmZpbmQoKHJlcykgPT4gcmVzLmtleSA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRpZiAobGFzdFJlc3VsdCAmJiBwYXlsb2FkLndvcmtzcGFjZSkge1xuXHRcdFx0XHRcdFx0XHRsYXN0UmVzdWx0LnRpdGxlID0gcGF5bG9hZC53b3Jrc3BhY2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQuZGF0YS53b3Jrc3BhY2VUaXRsZSA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHQobGFzdFJlc3VsdC50ZW1wbGF0ZUNvbnRlbnQgYXMgQ3VzdG9tVGVtcGxhdGUpLmRhdGEudGl0bGUgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50Py5zZXRTYXZlZEZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZSA9IGF3YWl0IHNhdmVkPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZhdm9yaXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmYXZvcml0ZS5sYWJlbCA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZShmYXZvcml0ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkPy5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50IH0gPSBhd2FpdCB0aGlzLmdldEZhdkluZm8oRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSk7XG5cdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGVDbGllbnQ/LmRlbGV0ZVNhdmVkRmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGUgPSBhd2FpdCBzYXZlZD8uZmluZCgoZikgPT4gZi50eXBlSWQgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZmF2b3JpdGUpIHtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKGZhdm9yaXRlLmlkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcInRoZW1lLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX2ZhdkNoYW5nZWRTdWJzY3JpcHRpb25JZCA9XG5cdFx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudDxGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkPihcblx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRhc3luYyAoXzogdW5rbm93biwgcGF5bG9hZD86IEZhdm9yaXRlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpID0+IHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkKSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHRoaXMuX3RoZW1lQ2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCh0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCwgXCJ0aGVtZS1jaGFuZ2VkXCIpO1xuXHRcdFx0XHR0aGlzLl90aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25JZCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkKSkge1xuXHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHR0aGlzLl9mYXZDaGFuZ2VkU3Vic2NyaXB0aW9uSWQsXG5cdFx0XHRcdFx0XCJmYXZvcml0ZS1jaGFuZ2VkXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5fZmF2Q2hhbmdlZFN1YnNjcmlwdGlvbklkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIHRoaXMuX3NldHRpbmdzKSB7XG5cdFx0XHRjb25zdCBpY29uRm9sZGVyID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRJY29uRm9sZGVyKCk7XG5cdFx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6IGAke3RoaXMuX2RlZmluaXRpb24/LmlkfS1oZWxwMWAsXG5cdFx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0XHR0aXRsZTogXCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRcdGljb246IHRoaXMudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZSwgaWNvbkZvbGRlciwgY29sb3JTY2hlbWUpLFxuXHRcdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XHRcIldvcmtzcGFjZXNcIixcblx0XHRcdFx0XHRcdFtcIlVzZSB0aGUgd29ya3NwYWNlcyBjb21tYW5kIHRvIHNhdmUgeW91ciBjdXJyZW50IGxheW91dC5cIl0sXG5cdFx0XHRcdFx0XHRbXCIvdyB0aXRsZVwiXVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0gJiYgdGhpcy5fc2V0dGluZ3MpIHtcblx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0Y29uc3QgaWNvbkZvbGRlciA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50SWNvbkZvbGRlcigpO1xuXHRcdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXHRcdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGxldCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0bGV0IG1hdGNoUXVlcnkgPSBxdWVyeUxvd2VyO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aDtcblxuXHRcdFx0aWYgKHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0XHRjb25zdCB0aXRsZSA9IHF1ZXJ5TG93ZXIucmVwbGFjZShcIi93IFwiLCBcIlwiKTtcblxuXHRcdFx0XHRjb25zdCBmb3VuZE1hdGNoID0gd29ya3NwYWNlcy5maW5kKChlbnRyeSkgPT4gZW50cnkudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gdGl0bGUudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRcdGlmIChmb3VuZE1hdGNoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHJlc3VsdHM6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGtleTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBgV29ya3NwYWNlICR7Zm91bmRNYXRjaC50aXRsZX0gYWxyZWFkeSBleGlzdHMuYCxcblx0XHRcdFx0XHRcdFx0XHRpY29uOiB0aGlzLnRoZW1lVXJsKHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UsIGljb25Gb2xkZXIsIGNvbG9yU2NoZW1lKSxcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBmb3VuZE1hdGNoLndvcmtzcGFjZUlkXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NBVkVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFdvcmtzcGFjZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogYFNhdmUgQ3VycmVudCBXb3Jrc3BhY2UgYXMgJHt0aXRsZX1gLFxuXHRcdFx0XHRcdFx0XHRpY29uOiB0aGlzLnRoZW1lVXJsKHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UsIGljb25Gb2xkZXIsIGNvbG9yU2NoZW1lKSxcblx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiU3VnZ2VzdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb25zOiBbeyBuYW1lOiBcIlNhdmUgV29ya3NwYWNlXCIsIGhvdGtleTogXCJFbnRlclwiIH1dLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdFx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdLFxuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlVGl0bGU6IHRpdGxlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIlBsYWluXCIgYXMgQ0xJVGVtcGxhdGUuUGxhaW4sXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IGZhdm9yaXRlQ2xpZW50LCBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRmYXZvcml0ZUluZm8/LmlzRW5hYmxlZCAmJlxuXHRcdFx0XHRpc1N0cmluZ1ZhbHVlKGZhdm9yaXRlSW5mbz8uY29tbWFuZCkgJiZcblx0XHRcdFx0cXVlcnlMb3dlciA9PT0gZmF2b3JpdGVJbmZvLmNvbW1hbmQgJiZcblx0XHRcdFx0ZmF2b3JpdGVDbGllbnRcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUFwcHMgPSBhd2FpdCBmYXZvcml0ZUNsaWVudC5nZXRTYXZlZEZhdm9yaXRlcyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0Y29uc3QgZmF2SWRzID0gZmF2b3JpdGVBcHBzPy5tYXAoKGYpID0+IGYudHlwZUlkKSA/PyBbXTtcblx0XHRcdFx0d29ya3NwYWNlcyA9IHdvcmtzcGFjZXMuZmlsdGVyKChhKSA9PiBmYXZJZHMuaW5jbHVkZXMoYS53b3Jrc3BhY2VJZCkpO1xuXHRcdFx0XHRtYXRjaFF1ZXJ5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgd29ya3NwYWNlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMoXG5cdFx0XHRcdHBsYXRmb3JtLFxuXHRcdFx0XHR3b3Jrc3BhY2VzLFxuXHRcdFx0XHRtYXRjaFF1ZXJ5LFxuXHRcdFx0XHRvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoLFxuXHRcdFx0XHRpY29uRm9sZGVyLFxuXHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0KTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgPSB3b3Jrc3BhY2VSZXN1bHRzO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiB3b3Jrc3BhY2VSZXN1bHRzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lLmVuZHNXaXRoKFwiZmF2b3JpdGVcIikgJiYgcmVzdWx0LmRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQgfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZS5zdGFydHNXaXRoKFwidW5cIikpIHtcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShyZXN1bHQuZGF0YT8uZmF2b3JpdGVJZCkgJiYgZmF2b3JpdGVDbGllbnQuZGVsZXRlU2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBmYXZvcml0ZUNsaWVudC5kZWxldGVTYXZlZEZhdm9yaXRlKHJlc3VsdC5kYXRhLmZhdm9yaXRlSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmF2b3JpdGVDbGllbnQuc2V0U2F2ZWRGYXZvcml0ZSh7XG5cdFx0XHRcdFx0XHRcdGlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHR5cGU6IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHRcdHR5cGVJZDogcmVzdWx0LmtleSxcblx0XHRcdFx0XHRcdFx0bGFiZWw6IHJlc3VsdC50aXRsZSxcblx0XHRcdFx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmltYWdlcy53b3Jrc3BhY2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0pIHtcblx0XHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRcdHdvcmtzcGFjZUlkPzogc3RyaW5nO1xuXHRcdFx0XHRcdHdvcmtzcGFjZVRpdGxlPzogc3RyaW5nO1xuXHRcdFx0XHR9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRcdFx0aWYgKGRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0LmtleSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgc2F2ZSB3b3Jrc3BhY2UgZW50cnlcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHJlc3VsdC5rZXkpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgcGxhdGZvcm0uZ2V0U25hcHNob3QoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJyZW50TWV0YURhdGEgPSBjdXJyZW50V29ya3NwYWNlPy5tZXRhZGF0YTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0ge1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZGF0YS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IGRhdGEud29ya3NwYWNlVGl0bGUgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0bWV0YWRhdGE6IGN1cnJlbnRNZXRhRGF0YSxcblx0XHRcdFx0XHRcdFx0c25hcHNob3Rcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXG5cdFx0XHRcdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbikge1xuXHRcdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGljb25Gb2xkZXIgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWRXb3Jrc3BhY2UgPSBhd2FpdCB0aGlzLmdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2Uud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0XHRpY29uRm9sZGVyLFxuXHRcdFx0XHRcdFx0XHRjb2xvclNjaGVtZSxcblx0XHRcdFx0XHRcdFx0ZmF2b3JpdGVJbmZvXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyBBbmQgYWRkIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbc2F2ZWRXb3Jrc3BhY2VdKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdC8vIERvIG5vdGhpbmcsIHRoZSB1c2VyIG11c3QgdXBkYXRlIHRoZSBxdWVyeSB0byBnaXZlIGl0IGEgZGlmZmVyZW50XG5cdFx0XHRcdFx0XHQvLyBuYW1lIHdoaWNoIHdpbGwgYXV0b21hdGljYWxseSByZWZyZXNoIHRoZSByZXN1bHRzXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlKGRhdGEud29ya3NwYWNlSWQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uYXBwbHlXb3Jrc3BhY2Uod29ya3NwYWNlKTtcblx0XHRcdFx0XHRcdC8vIFdlIHJlYnVpbGQgdGhlIHJlc3VsdHMgaGVyZSBhcyB3ZSB3aWxsIG5vdyBoYXZlIGEgbmV3IGN1cnJlbnQgd29ya3NwYWNlXG5cdFx0XHRcdFx0XHQvLyBhbmQgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGV4aXN0aW5nIG9uZSBiYWNrIHRvIGEgc3RhbmRhcmQgdGVtcGxhdGVcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0XHQvLyBEZWxldGluZyB0aGUgd29ya2luZyB3aWxsIGV2ZW50dWFsbHkgdHJpZ2dlciB0aGUgXCJkZWxldGVcIiBsaWZlY3ljbGVcblx0XHRcdFx0XHRcdC8vIGV2ZW50IHdoaWNoIHdpbGwgcmVtb3ZlIGl0IGZyb20gdGhlIHJlc3VsdCBsaXN0XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0XHRcdHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFICYmXG5cdFx0XHRcdFx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc2hhcmVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHR5cGU6IFwid29ya3NwYWNlXCIsIHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkIH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFVucmVjb2duaXplZCBhY3Rpb24gZm9yIHdvcmtzcGFjZSBzZWxlY3Rpb246ICR7ZGF0YS53b3Jrc3BhY2VJZH1gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRlbXBsYXRlIGZvciBhIHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgaXRlbS5cblx0ICogQHBhcmFtIHRpdGxlIFRoZSB0aXRsZSBvZiB0aGUgd29ya3NwYWNlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGlzQ3VycmVudCBJcyB0aGlzIHRoZSBjdXJyZW50IHdvcmtzcGFjZS5cblx0ICogQHBhcmFtIGljb25Gb2xkZXIgVGhlIGZvbGRlciBmb3Igc3RvcmluZyBpY29ucy5cblx0ICogQHBhcmFtIGNvbG9yU2NoZW1lIFRoZSBjdXJyZW50IGNvbG9yIHNjaGVtZS5cblx0ICogQHBhcmFtIGZhdkluZm8gVGhlIGZhdm9yaXRlcyBpbmZvIGlmIGl0IGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZUlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBob21lIHJlc3VsdC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRpc0N1cnJlbnQ6IGJvb2xlYW4sXG5cdFx0aWNvbkZvbGRlcjogc3RyaW5nLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGUsXG5cdFx0ZmF2SW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkLFxuXHRcdGZhdm9yaXRlSWQ/OiBzdHJpbmdcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0PiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRjb25zdCBhY3Rpb25CdXR0b25zOiB7IHRpdGxlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH1bXSA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIk9wZW5cIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRsZXQgaW5zdHJ1Y3Rpb25zO1xuXG5cdFx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRcdGluc3RydWN0aW9ucyA9XG5cdFx0XHRcdFx0XCJUaGlzIGlzIHRoZSBjdXJyZW50bHkgYWN0aXZlIHdvcmtzcGFjZS4gWW91IGNhbiB1c2UgdGhlIEJyb3dzZXIgbWVudSB0byB1cGRhdGUvcmVuYW1lIHRoaXMgd29ya3NwYWNlXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnN0cnVjdGlvbnMgPSBcIlVzZSB0aGUgYnV0dG9ucyBiZWxvdyB0byBpbnRlcmFjdCB3aXRoIHlvdXIgc2F2ZWQgd29ya3NwYWNlXCI7XG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K0RcIlxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogXCJEZWxldGVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtTXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmVcIixcblx0XHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaWNvbiA9IHRoaXMudGhlbWVVcmwodGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZSwgaWNvbkZvbGRlciwgY29sb3JTY2hlbWUpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJCdXR0b25zOiB7IGljb246IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG5cblx0XHRcdGlmIChmYXZJbmZvPy5mYXZvcml0ZUljb24gJiYgZmF2SW5mby51bmZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRjb25zdCBmYXZvcml0ZUljb24gPSB0aGlzLnRoZW1lVXJsKFxuXHRcdFx0XHRcdCFpc0VtcHR5KGZhdm9yaXRlSWQpID8gZmF2SW5mby5mYXZvcml0ZUljb24gOiBmYXZJbmZvLnVuZmF2b3JpdGVJY29uLFxuXHRcdFx0XHRcdGljb25Gb2xkZXIsXG5cdFx0XHRcdFx0Y29sb3JTY2hlbWVcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSWNvbikge1xuXHRcdFx0XHRcdGhlYWRlckJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRpY29uOiBmYXZvcml0ZUljb24sXG5cdFx0XHRcdFx0XHRhY3Rpb246ICFpc0VtcHR5KGZhdm9yaXRlSWQpID8gXCJ1bmZhdm9yaXRlXCIgOiBcImZhdm9yaXRlXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsYXlvdXREYXRhID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVMYXlvdXQoXG5cdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHRpY29uLFxuXHRcdFx0XHRbYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUZXh0KFwiaW5zdHJ1Y3Rpb25zXCIpXSxcblx0XHRcdFx0YWN0aW9uQnV0dG9ucyxcblx0XHRcdFx0aGVhZGVyQnV0dG9uc1xuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0a2V5OiBpZCxcblx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBXb3Jrc3BhY2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGxhYmVsOiBcIldvcmtzcGFjZVwiLFxuXHRcdFx0XHRpY29uLFxuXHRcdFx0XHRhY3Rpb25zLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdFx0d29ya3NwYWNlVGl0bGU6IHRpdGxlLFxuXHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBpZCxcblx0XHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl0sXG5cdFx0XHRcdFx0ZmF2b3JpdGVJZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRcdGxheW91dDogbGF5b3V0RGF0YS5sYXlvdXQsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0Li4ubGF5b3V0RGF0YS5kYXRhLFxuXHRcdFx0XHRcdFx0aW5zdHJ1Y3Rpb25zXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBpZCxcblx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gV29ya3NwYWNlc1Byb3ZpZGVyLl9ERUZBVUxUX0JBU0VfU0NPUkUsXG5cdFx0XHR0aXRsZSxcblx0XHRcdGxhYmVsOiBcIldvcmtzcGFjZVwiLFxuXHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHR3b3Jrc3BhY2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdHdvcmtzcGFjZUlkOiBpZCxcblx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IFwiUGxhaW5cIiBhcyBDTElUZW1wbGF0ZS5QbGFpbixcblx0XHRcdHRlbXBsYXRlQ29udGVudDogdW5kZWZpbmVkXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkIHRoZSByZXN1bHRzIGFmdGVyIGNvbG9yIHNjaGVtZSBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgd29ya3NwYWNlIHBsYXRmb3JtLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmICFpc0VtcHR5KHRoaXMuX2xhc3RRdWVyeSkgJiYgIWlzRW1wdHkodGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoKSkge1xuXHRcdFx0Y29uc3QgaWNvbkZvbGRlciA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50SWNvbkZvbGRlcigpO1xuXHRcdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXG5cdFx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0d29ya3NwYWNlcyxcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGgsXG5cdFx0XHRcdGljb25Gb2xkZXIsXG5cdFx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHRoZSByZXN1bHRzIGZvciB0aGUgd29ya3NwYWNlcy5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSB3b3Jrc3BhY2UgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSB3b3Jrc3BhY2VzIFRoZSBsaXN0IG9mIHdvcmtzcGFjZXMgdG8gYnVpbGQgdGhlIHJlc3VsdHMgZm9yLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gcXVlcnlNaW5MZW5ndGggVGhlIG1pbiBxdWVyeSBsZW5ndGguXG5cdCAqIEBwYXJhbSBpY29uRm9sZGVyIFRoZSBmb2xkZXIgZm9yIHN0b3JpbmcgaWNvbnMuXG5cdCAqIEBwYXJhbSBjb2xvclNjaGVtZSBUaGUgY29sb3Igc2NoZW1lLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBob21lIHNlYXJjaCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdLFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcixcblx0XHRpY29uRm9sZGVyOiBzdHJpbmcsXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGxldCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgQXJyYXkuaXNBcnJheSh3b3Jrc3BhY2VzKSkge1xuXHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLmdldEN1cnJlbnRXb3Jrc3BhY2UoKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2VJZCA9IGN1cnJlbnRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkO1xuXHRcdFx0bGV0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24pIHtcblx0XHRcdFx0c2hhcmVFbmFibGVkID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbihcInNoYXJpbmdcIik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHsgZmF2b3JpdGVDbGllbnQsIGZhdm9yaXRlSW5mbyB9ID0gYXdhaXQgdGhpcy5nZXRGYXZJbmZvKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXHRcdFx0bGV0IHNhdmVkRmF2b3JpdGVzOiBGYXZvcml0ZUVudHJ5W10gfCB1bmRlZmluZWQ7XG5cblx0XHRcdGlmIChmYXZvcml0ZUNsaWVudCkge1xuXHRcdFx0XHRzYXZlZEZhdm9yaXRlcyA9IGF3YWl0IGZhdm9yaXRlQ2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB3a3NQcm9tID0gd29ya3NwYWNlc1xuXHRcdFx0XHQuZmlsdGVyKFxuXHRcdFx0XHRcdCh3KSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8IChxdWVyeS5sZW5ndGggPj0gcXVlcnlNaW5MZW5ndGggJiYgdy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSlcblx0XHRcdFx0KVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpKVxuXHRcdFx0XHQubWFwKGFzeW5jICh3czogV29ya3NwYWNlKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGVJZCA9IHNhdmVkRmF2b3JpdGVzPy5maW5kKChmKSA9PiBmLnR5cGVJZCA9PT0gd3Mud29ya3NwYWNlSWQpPy5pZDtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdFx0XHRcdFx0d3Mud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHR3cy50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdGN1cnJlbnRXb3Jrc3BhY2VJZCA9PT0gd3Mud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRpY29uRm9sZGVyLFxuXHRcdFx0XHRcdFx0Y29sb3JTY2hlbWUsXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbCh3a3NQcm9tKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9yIHVwZGF0ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIHJlc3VsdHMgVGhlIHJlc3VsdHMgdG8gYWRkIG9yIHVwZGF0ZS5cblx0ICovXG5cdHByaXZhdGUgcmVzdWx0QWRkVXBkYXRlKHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Zm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSByZXN1bHQua2V5KTtcblx0XHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKHJlc3VsdHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSByZXN1bHQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gcmVtb3ZlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRSZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gaWQpO1xuXHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShpZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgYXBwIGJ1dHRvbnMgaWYgdGhlIGZhdm9yaXRlcyBoYXZlIGNoYW5nZWQuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIG9mIHRoZSBmYXZvcml0ZSBjaGFuZ2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHVwZGF0ZUFwcEZhdm9yaXRlQnV0dG9ucyhwYXlsb2FkOiBGYXZvcml0ZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkgPSBwYXlsb2FkLmZhdm9yaXRlO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhpcy5fbGFzdFJlc3BvbnNlKSAmJlxuXHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSAmJlxuXHRcdFx0KHBheWxvYWQuYWN0aW9uID09PSBcInNldFwiIHx8IHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSAmJlxuXHRcdFx0IWlzRW1wdHkoZmF2b3JpdGUpICYmXG5cdFx0XHRmYXZvcml0ZS50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFICYmXG5cdFx0XHR0aGlzLl9sYXN0UmVzdWx0c1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgeyBmYXZvcml0ZUluZm8gfSA9IGF3YWl0IHRoaXMuZ2V0RmF2SW5mbyhGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFKTtcblx0XHRcdGNvbnN0IGljb25Gb2xkZXIgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblx0XHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdFx0aWYgKHRoaXMuX2xhc3RRdWVyeSA9PT0gZmF2b3JpdGVJbmZvPy5jb21tYW5kICYmIHBheWxvYWQuYWN0aW9uID09PSBcImRlbGV0ZVwiKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoZmF2b3JpdGUudHlwZUlkKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdFx0Y29uc3QgbGFzdFdvcmtzcGFjZSA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmQoKHdzKSA9PiB3cy5rZXkgPT09IGZhdm9yaXRlLnR5cGVJZCk7XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KGxhc3RXb3Jrc3BhY2UpKSB7XG5cdFx0XHRcdFx0bGV0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZUlkID0gY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cblx0XHRcdFx0XHRjb25zdCByZWJ1aWx0ID0gYXdhaXQgdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdGxhc3RXb3Jrc3BhY2Uua2V5LFxuXHRcdFx0XHRcdFx0bGFzdFdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdGN1cnJlbnRXb3Jrc3BhY2VJZCA9PT0gbGFzdFdvcmtzcGFjZS5rZXksXG5cdFx0XHRcdFx0XHRpY29uRm9sZGVyLFxuXHRcdFx0XHRcdFx0Y29sb3JTY2hlbWUsXG5cdFx0XHRcdFx0XHRmYXZvcml0ZUluZm8sXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmFjdGlvbiA9PT0gXCJzZXRcIiA/IGZhdm9yaXRlLmlkIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKFtyZWJ1aWx0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQgaWYgdGhleSBhcmUgZW5hYmxlZC5cblx0ICogQHBhcmFtIGZhdm9yaXRlVHlwZU5hbWVzIFRoZSB0eXBlIG9mIGNsaWVudCB0byBnZXQuXG5cdCAqIEByZXR1cm5zIFRoZSBmYXZvcml0ZSBpbmZvIGFuZCBjbGllbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEZhdkluZm8oXG5cdFx0ZmF2b3JpdGVUeXBlTmFtZXM6IEZhdm9yaXRlVHlwZU5hbWVzXG5cdCk6IFByb21pc2U8eyBmYXZvcml0ZUNsaWVudDogRmF2b3JpdGVDbGllbnQgfCB1bmRlZmluZWQ7IGZhdm9yaXRlSW5mbzogRmF2b3JpdGVJbmZvIHwgdW5kZWZpbmVkIH0+IHtcblx0XHRsZXQgZmF2b3JpdGVJbmZvOiBGYXZvcml0ZUluZm8gfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGZhdm9yaXRlQ2xpZW50OiBGYXZvcml0ZUNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHRcdGlmICgodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZmF2b3JpdGVzRW5hYmxlZCA/PyB0cnVlKSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldEZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRGYXZvcml0ZUNsaWVudCgpO1xuXHRcdFx0aWYgKGZhdm9yaXRlQ2xpZW50KSB7XG5cdFx0XHRcdGZhdm9yaXRlSW5mbyA9IGZhdm9yaXRlQ2xpZW50LmdldEluZm8oKTtcblx0XHRcdFx0aWYgKGZhdm9yaXRlSW5mby5pc0VuYWJsZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpc1N1cHBvcnRlZCA9XG5cdFx0XHRcdFx0XHRpc0VtcHR5KGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMpIHx8IGZhdm9yaXRlSW5mby5lbmFibGVkVHlwZXMuaW5jbHVkZXMoZmF2b3JpdGVUeXBlTmFtZXMpO1xuXHRcdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGZhdm9yaXRlSW5mbyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGZhdm9yaXRlQ2xpZW50ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRmYXZvcml0ZUNsaWVudCxcblx0XHRcdGZhdm9yaXRlSW5mb1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlbWluZyB0byBhbiBpY29uIHVybC5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIHRoZW1lLlxuXHQgKiBAcGFyYW0gaWNvbkZvbGRlciBUaGUgaWNvbiBmb2xkZXIuXG5cdCAqIEBwYXJhbSBjb2xvclNjaGVtZU1vZGUgVGhlIGNvbG9yIHNjaGVtZS5cblx0ICogQHJldHVybnMgVGhlIHRoZW1lZCB1cmwuXG5cdCAqL1xuXHRwcml2YXRlIHRoZW1lVXJsKFxuXHRcdHVybDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuXHRcdGljb25Gb2xkZXI6IHN0cmluZyxcblx0XHRjb2xvclNjaGVtZU1vZGU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB1cmxcblx0XHRcdD8gdXJsLnJlcGxhY2UoL3t0aGVtZX0vZywgaWNvbkZvbGRlcikucmVwbGFjZSgve3NjaGVtZX0vZywgY29sb3JTY2hlbWVNb2RlIGFzIHN0cmluZylcblx0XHRcdDogdW5kZWZpbmVkO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFdvcmtzcGFjZXNQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IFdvcmtzcGFjZXNQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBXb3Jrc3BhY2VzUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==