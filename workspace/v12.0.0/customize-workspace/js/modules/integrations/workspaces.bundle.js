/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/uuid.ts":
/*!**************************************!*\
  !*** ./client/src/framework/uuid.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomUUID": () => (/* binding */ randomUUID)
/* harmony export */ });
function randomUUID() {
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    const getRandomHex = (c) => 
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    (c ^ (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}


/***/ }),

/***/ "./client/src/modules/integrations/workspaces/integration.ts":
/*!*******************************************************************!*\
  !*** ./client/src/modules/integrations/workspaces/integration.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkspacesProvider": () => (/* binding */ WorkspacesProvider)
/* harmony export */ });
/* harmony import */ var _framework_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/uuid */ "./client/src/framework/uuid.ts");

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
        this._logger = loggerCreator("WorkspacesProvider");
        this._integrationHelpers.subscribeLifecycleEvent("workspace-changed", async (platform, payload) => {
            if (payload.action === "create") {
                if (!this._lastQuery.startsWith("/w ")) {
                    await this.rebuildResults(platform);
                }
            }
            else if (payload.action === "update") {
                const lastResult = this._lastResults?.find((res) => res.key === payload.id);
                if (lastResult) {
                    lastResult.title = payload.workspace.title;
                    lastResult.data.workspaceTitle = payload.workspace.title;
                    lastResult.templateContent.data.title = payload.workspace.title;
                    this.resultAddUpdate([lastResult]);
                }
            }
            else if (payload.action === "delete") {
                this.resultRemove(payload.id);
            }
        });
        this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
            const platform = this._integrationHelpers.getPlatform();
            await this.rebuildResults(platform);
        });
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        return [
            {
                key: `${WorkspacesProvider._PROVIDER_ID}-help1`,
                title: "Workspaces",
                label: "Help",
                icon: this._settings.images.workspace.replace("{scheme}", colorScheme),
                actions: [],
                data: {
                    providerId: WorkspacesProvider._PROVIDER_ID
                },
                template: "Custom",
                templateContent: await this._integrationHelpers.templateHelpers.createHelp("Workspaces", ["Use the workspaces command to save your current layout."], ["/w title"])
            }
        ];
    }
    /**
     * Get a list of search results based on the query and filters.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @param options Options for the search query.
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        const platform = this._integrationHelpers.getPlatform();
        const workspaces = await platform.Storage.getWorkspaces();
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const queryLower = query.toLowerCase();
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
                            title: `Workspace ${foundMatch.title} already exists.`,
                            icon: this._settings.images.workspace.replace("{scheme}", colorScheme),
                            actions: [],
                            data: {
                                providerId: WorkspacesProvider._PROVIDER_ID,
                                tags: ["workspace"],
                                workspaceId: foundMatch.workspaceId
                            },
                            template: null,
                            templateContent: null
                        }
                    ]
                };
            }
            return {
                results: [
                    {
                        key: WorkspacesProvider._ACTION_SAVE_WORKSPACE,
                        title: `Save Current Workspace as ${title}`,
                        icon: this._settings.images.workspace.replace("{scheme}", colorScheme),
                        label: "Suggestion",
                        actions: [{ name: "Save Workspace", hotkey: "Enter" }],
                        data: {
                            providerId: WorkspacesProvider._PROVIDER_ID,
                            tags: ["workspace"],
                            workspaceId: (0,_framework_uuid__WEBPACK_IMPORTED_MODULE_0__.randomUUID)(),
                            workspaceTitle: title
                        },
                        template: null,
                        templateContent: null
                    }
                ]
            };
        }
        const workspaceResults = await this.buildResults(platform, workspaces, queryLower, options.queryMinLength, colorScheme);
        this._lastResults = workspaceResults;
        return {
            results: workspaceResults
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
                        title: data.workspaceTitle,
                        metadata: currentMetaData,
                        snapshot
                    };
                    await platform.Storage.saveWorkspace(workspace);
                    const shareEnabled = await this._integrationHelpers.condition("sharing");
                    const palette = await this._integrationHelpers.getCurrentPalette();
                    const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
                    const savedWorkspace = this.getWorkspaceTemplate(workspace.workspaceId, workspace.title, shareEnabled, true, colorScheme, palette);
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
                else if (result.action.name === WorkspacesProvider._ACTION_SHARE_WORKSPACE) {
                    await this._integrationHelpers.share({ workspaceId: data.workspaceId });
                }
                else {
                    handled = false;
                    this._logger.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
                }
            }
        }
        return handled;
    }
    getWorkspaceTemplate(id, title, shareEnabled, isCurrent, colorScheme, palette) {
        let actions = [];
        let layout;
        let data;
        if (isCurrent) {
            layout = this.getOtherWorkspaceTemplate(shareEnabled, false, palette);
            data = {
                title,
                instructions: "This is the currently active workspace. You can use the Browser menu to update/rename this workspace",
                openText: "Open",
                shareText: "Share"
            };
            if (shareEnabled) {
                actions.push({
                    name: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
                    hotkey: "CmdOrCtrl+Shift+S"
                });
            }
            actions = actions.concat([
                {
                    name: WorkspacesProvider._ACTION_OPEN_WORKSPACE,
                    hotkey: "Enter"
                }
            ]);
        }
        else {
            if (shareEnabled) {
                actions.push({
                    name: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
                    hotkey: "CmdOrCtrl+Shift+S"
                });
            }
            actions = actions.concat([
                {
                    name: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
                    hotkey: "CmdOrCtrl+Shift+D"
                },
                {
                    name: WorkspacesProvider._ACTION_OPEN_WORKSPACE,
                    hotkey: "Enter"
                }
            ]);
            layout = this.getOtherWorkspaceTemplate(shareEnabled, true, palette);
            data = {
                title,
                instructions: "Use the buttons below to interact with your saved workspace",
                openText: "Open",
                deleteText: "Delete",
                shareText: "Share"
            };
        }
        return {
            key: id,
            title,
            label: "Workspace",
            icon: this._settings.images.workspace.replace("{scheme}", colorScheme),
            actions,
            data: {
                providerId: WorkspacesProvider._PROVIDER_ID,
                workspaceTitle: title,
                workspaceId: id,
                tags: ["workspace"]
            },
            template: "Custom",
            templateContent: {
                layout,
                data
            }
        };
    }
    getOtherWorkspaceTemplate(enableShare, enableDelete, palette) {
        const actionButtons = [
            {
                type: "Button",
                action: WorkspacesProvider._ACTION_OPEN_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "openText"
                    }
                ]
            }
        ];
        if (enableDelete) {
            actionButtons.push({
                type: "Button",
                buttonStyle: "primary",
                action: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "deleteText"
                    }
                ]
            });
        }
        if (enableShare) {
            actionButtons.push({
                type: "Button",
                buttonStyle: "primary",
                action: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "shareText"
                    }
                ]
            });
        }
        return {
            type: "Container",
            style: {
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1
            },
            children: [
                {
                    type: "Text",
                    dataKey: "title",
                    style: {
                        fontWeight: "bold",
                        fontSize: "16px",
                        paddingBottom: "5px",
                        marginBottom: "10px",
                        borderBottom: `1px solid ${palette.background6}`
                    }
                },
                {
                    type: "Text",
                    dataKey: "instructions",
                    style: {
                        flex: 1
                    }
                },
                {
                    type: "Container",
                    style: {
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px"
                    },
                    children: actionButtons
                }
            ]
        };
    }
    async rebuildResults(platform) {
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const workspaces = await platform.Storage.getWorkspaces();
        const results = await this.buildResults(platform, workspaces, this._lastQuery, this._lastQueryMinLength, colorScheme);
        this.resultAddUpdate(results);
    }
    async buildResults(platform, workspaces, query, queryMinLength, colorScheme) {
        let results = [];
        if (Array.isArray(workspaces)) {
            const currentWorkspace = await platform.getCurrentWorkspace();
            const currentWorkspaceId = currentWorkspace?.workspaceId;
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            const palette = await this._integrationHelpers.getCurrentPalette();
            results = workspaces
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .map((ws, index) => this.getWorkspaceTemplate(ws.workspaceId, ws.title, shareEnabled, currentWorkspaceId === ws.workspaceId, colorScheme, palette))
                .sort((a, b) => a.title.localeCompare(b.title));
        }
        return results;
    }
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
}
/**
 * Provider id.
 * @internal
 */
WorkspacesProvider._PROVIDER_ID = "workspaces";
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/workspaces/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.WorkspacesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBRTVDLE1BQU0sV0FBVyxHQUF5QztJQUNoRSxZQUFZLEVBQUUsSUFBSSw0REFBa0IsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dWlkLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3dvcmtzcGFjZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdGNvbnN0IGdldFJhbmRvbUhleCA9IChjKSA9PlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1taXhlZC1vcGVyYXRvcnNcblx0XHQoYyBeICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKGMgLyA0KSkpKS50b1N0cmluZygxNik7XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEJ1dHRvblN0eWxlLFxuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBDdXN0b21QYWxldHRlU2V0LCBXb3Jrc3BhY2UsIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IENvbG9yU2NoZW1lTW9kZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy90aGVtZS1zaGFwZXNcIjtcbmltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V1aWRcIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlc1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3Igd29ya3NwYWNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFdvcmtzcGFjZXNTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJ3b3Jrc3BhY2VzXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBvcGVuaW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fT1BFTl9XT1JLU1BBQ0UgPSBcIk9wZW4gV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBkZWxldGluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UgPSBcIkRlbGV0ZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNoYXJpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UgPSBcIlNoYXJlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2F2aW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UgPSBcIlNhdmUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBhIHdvcmtzcGFjZSBleGlzdHMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9FWElTVFNfV09SS1NQQUNFID0gXCJXb3Jrc3BhY2UgRXhpc3RzXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBXb3Jrc3BhY2VzU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248V29ya3NwYWNlc1NldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXb3Jrc3BhY2VzUHJvdmlkZXJcIik7XG5cblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcIndvcmtzcGFjZS1jaGFuZ2VkXCIsXG5cdFx0XHRhc3luYyAocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLCBwYXlsb2FkOiBXb3Jrc3BhY2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCkgPT4ge1xuXHRcdFx0XHRpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwiY3JlYXRlXCIpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuX2xhc3RRdWVyeS5zdGFydHNXaXRoKFwiL3cgXCIpKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwidXBkYXRlXCIpIHtcblx0XHRcdFx0XHRjb25zdCBsYXN0UmVzdWx0ID0gdGhpcy5fbGFzdFJlc3VsdHM/LmZpbmQoKHJlcykgPT4gcmVzLmtleSA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0aWYgKGxhc3RSZXN1bHQpIHtcblx0XHRcdFx0XHRcdGxhc3RSZXN1bHQudGl0bGUgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblx0XHRcdFx0XHRcdGxhc3RSZXN1bHQuZGF0YS53b3Jrc3BhY2VUaXRsZSA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0KGxhc3RSZXN1bHQudGVtcGxhdGVDb250ZW50IGFzIEN1c3RvbVRlbXBsYXRlKS5kYXRhLnRpdGxlID0gcGF5bG9hZC53b3Jrc3BhY2UudGl0bGU7XG5cdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQgYXMgc3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwidGhlbWUtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7V29ya3NwYWNlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRH0taGVscDFgLFxuXHRcdFx0XHR0aXRsZTogXCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdGxhYmVsOiBcIkhlbHBcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZS5yZXBsYWNlKFwie3NjaGVtZX1cIiwgY29sb3JTY2hlbWUgYXMgc3RyaW5nKSxcblx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lEXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdFx0W1wiVXNlIHRoZSB3b3Jrc3BhY2VzIGNvbW1hbmQgdG8gc2F2ZSB5b3VyIGN1cnJlbnQgbGF5b3V0LlwiXSxcblx0XHRcdFx0XHRbXCIvdyB0aXRsZVwiXVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdGNvbnN0IHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2VzKCk7XG5cdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoO1xuXG5cdFx0aWYgKHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0Y29uc3QgdGl0bGUgPSBxdWVyeUxvd2VyLnJlcGxhY2UoXCIvdyBcIiwgXCJcIik7XG5cblx0XHRcdGNvbnN0IGZvdW5kTWF0Y2ggPSB3b3Jrc3BhY2VzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS50aXRsZS50b0xvd2VyQ2FzZSgpID09PSB0aXRsZS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGlmIChmb3VuZE1hdGNoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBgV29ya3NwYWNlICR7Zm91bmRNYXRjaC50aXRsZX0gYWxyZWFkeSBleGlzdHMuYCxcblx0XHRcdFx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZS5yZXBsYWNlKFwie3NjaGVtZX1cIiwgY29sb3JTY2hlbWUgYXMgc3RyaW5nKSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRwcm92aWRlcklkOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZm91bmRNYXRjaC53b3Jrc3BhY2VJZFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogbnVsbCxcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBudWxsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGtleTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHR0aXRsZTogYFNhdmUgQ3VycmVudCBXb3Jrc3BhY2UgYXMgJHt0aXRsZX1gLFxuXHRcdFx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLndvcmtzcGFjZS5yZXBsYWNlKFwie3NjaGVtZX1cIiwgY29sb3JTY2hlbWUgYXMgc3RyaW5nKSxcblx0XHRcdFx0XHRcdGxhYmVsOiBcIlN1Z2dlc3Rpb25cIixcblx0XHRcdFx0XHRcdGFjdGlvbnM6IFt7IG5hbWU6IFwiU2F2ZSBXb3Jrc3BhY2VcIiwgaG90a2V5OiBcIkVudGVyXCIgfV0sXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IFdvcmtzcGFjZXNQcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IHJhbmRvbVVVSUQoKSxcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlVGl0bGU6IHRpdGxlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IG51bGwsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IG51bGxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Y29uc3Qgd29ya3NwYWNlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMoXG5cdFx0XHRwbGF0Zm9ybSxcblx0XHRcdHdvcmtzcGFjZXMsXG5cdFx0XHRxdWVyeUxvd2VyLFxuXHRcdFx0b3B0aW9ucy5xdWVyeU1pbkxlbmd0aCxcblx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0KTtcblxuXHRcdHRoaXMuX2xhc3RSZXN1bHRzID0gd29ya3NwYWNlUmVzdWx0cztcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiB3b3Jrc3BhY2VSZXN1bHRzXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0d29ya3NwYWNlSWQ/OiBzdHJpbmc7XG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlPzogc3RyaW5nO1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRpZiAoZGF0YT8ud29ya3NwYWNlSWQpIHtcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NBVkVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBzYXZlIHdvcmtzcGFjZSBlbnRyeVxuXHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHJlc3VsdC5rZXkpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0Y29uc3Qgc25hcHNob3QgPSBhd2FpdCBwbGF0Zm9ybS5nZXRTbmFwc2hvdCgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudE1ldGFEYXRhID0gY3VycmVudFdvcmtzcGFjZT8ubWV0YWRhdGE7XG5cblx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2UgPSB7XG5cdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZGF0YS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHRpdGxlOiBkYXRhLndvcmtzcGFjZVRpdGxlLFxuXHRcdFx0XHRcdFx0bWV0YWRhdGE6IGN1cnJlbnRNZXRhRGF0YSxcblx0XHRcdFx0XHRcdHNuYXBzaG90XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXG5cdFx0XHRcdFx0Y29uc3Qgc2hhcmVFbmFibGVkOiBib29sZWFuID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbihcInNoYXJpbmdcIik7XG5cdFx0XHRcdFx0Y29uc3QgcGFsZXR0ZTogQ3VzdG9tUGFsZXR0ZVNldCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50UGFsZXR0ZSgpO1xuXHRcdFx0XHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdFx0XHRcdGNvbnN0IHNhdmVkV29ya3NwYWNlID0gdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdHdvcmtzcGFjZS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRjb2xvclNjaGVtZSxcblx0XHRcdFx0XHRcdHBhbGV0dGVcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0Ly8gQW5kIGFkZCB0aGUgbmV3IG9uZVxuXHRcdFx0XHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKFtzYXZlZFdvcmtzcGFjZV0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHQvLyBEbyBub3RoaW5nLCB0aGUgdXNlciBtdXN0IHVwZGF0ZSB0aGUgcXVlcnkgdG8gZ2l2ZSBpdCBhIGRpZmZlcmVudFxuXHRcdFx0XHRcdC8vIG5hbWUgd2hpY2ggd2lsbCBhdXRvbWF0aWNhbGx5IHJlZnJlc2ggdGhlIHJlc3VsdHNcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uYXBwbHlXb3Jrc3BhY2Uod29ya3NwYWNlKTtcblx0XHRcdFx0XHQvLyBXZSByZWJ1aWxkIHRoZSByZXN1bHRzIGhlcmUgYXMgd2Ugd2lsbCBub3cgaGF2ZSBhIG5ldyBjdXJyZW50IHdvcmtzcGFjZVxuXHRcdFx0XHRcdC8vIGFuZCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgZXhpc3Rpbmcgb25lIGJhY2sgdG8gYSBzdGFuZGFyZCB0ZW1wbGF0ZVxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0Ly8gRGVsZXRpbmcgdGhlIHdvcmtpbmcgd2lsbCBldmVudHVhbGx5IHRyaWdnZXIgdGhlIFwiZGVsZXRlXCIgbGlmZWN5Y2xlXG5cdFx0XHRcdFx0Ly8gZXZlbnQgd2hpY2ggd2lsbCByZW1vdmUgaXQgZnJvbSB0aGUgcmVzdWx0IGxpc3Rcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3Igd29ya3NwYWNlIHNlbGVjdGlvbjogJHtkYXRhLndvcmtzcGFjZUlkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHRwcml2YXRlIGdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRzaGFyZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdFx0aXNDdXJyZW50OiBib29sZWFuLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGUsXG5cdFx0cGFsZXR0ZTogQ3VzdG9tUGFsZXR0ZVNldFxuXHQpOiBIb21lU2VhcmNoUmVzdWx0IHtcblx0XHRsZXQgYWN0aW9ucyA9IFtdO1xuXHRcdGxldCBsYXlvdXQ7XG5cdFx0bGV0IGRhdGE7XG5cblx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRsYXlvdXQgPSB0aGlzLmdldE90aGVyV29ya3NwYWNlVGVtcGxhdGUoc2hhcmVFbmFibGVkLCBmYWxzZSwgcGFsZXR0ZSk7XG5cdFx0XHRkYXRhID0ge1xuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0aW5zdHJ1Y3Rpb25zOlxuXHRcdFx0XHRcdFwiVGhpcyBpcyB0aGUgY3VycmVudGx5IGFjdGl2ZSB3b3Jrc3BhY2UuIFlvdSBjYW4gdXNlIHRoZSBCcm93c2VyIG1lbnUgdG8gdXBkYXRlL3JlbmFtZSB0aGlzIHdvcmtzcGFjZVwiLFxuXHRcdFx0XHRvcGVuVGV4dDogXCJPcGVuXCIsXG5cdFx0XHRcdHNoYXJlVGV4dDogXCJTaGFyZVwiXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHNoYXJlRW5hYmxlZCkge1xuXHRcdFx0XHRhY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9PUEVOX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiRW50ZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHNoYXJlRW5hYmxlZCkge1xuXHRcdFx0XHRhY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJDbWRPckN0cmwrU2hpZnQrRFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9PUEVOX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiRW50ZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdKTtcblx0XHRcdGxheW91dCA9IHRoaXMuZ2V0T3RoZXJXb3Jrc3BhY2VUZW1wbGF0ZShzaGFyZUVuYWJsZWQsIHRydWUsIHBhbGV0dGUpO1xuXHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGluc3RydWN0aW9uczogXCJVc2UgdGhlIGJ1dHRvbnMgYmVsb3cgdG8gaW50ZXJhY3Qgd2l0aCB5b3VyIHNhdmVkIHdvcmtzcGFjZVwiLFxuXHRcdFx0XHRvcGVuVGV4dDogXCJPcGVuXCIsXG5cdFx0XHRcdGRlbGV0ZVRleHQ6IFwiRGVsZXRlXCIsXG5cdFx0XHRcdHNoYXJlVGV4dDogXCJTaGFyZVwiXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXk6IGlkLFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRsYWJlbDogXCJXb3Jrc3BhY2VcIixcblx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRhY3Rpb25zLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHR3b3Jrc3BhY2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdHdvcmtzcGFjZUlkOiBpZCxcblx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdGxheW91dCxcblx0XHRcdFx0ZGF0YVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGdldE90aGVyV29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0ZW5hYmxlU2hhcmU6IGJvb2xlYW4sXG5cdFx0ZW5hYmxlRGVsZXRlOiBib29sZWFuLFxuXHRcdHBhbGV0dGU6IEN1c3RvbVBhbGV0dGVTZXRcblx0KTogVGVtcGxhdGVGcmFnbWVudCB7XG5cdFx0Y29uc3QgYWN0aW9uQnV0dG9uczogVGVtcGxhdGVGcmFnbWVudFtdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX09QRU5fV09SS1NQQUNFLFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0ZGF0YUtleTogXCJvcGVuVGV4dFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdGlmIChlbmFibGVEZWxldGUpIHtcblx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGJ1dHRvblN0eWxlOiBcInByaW1hcnlcIiBhcyBCdXR0b25TdHlsZS5QcmltYXJ5LFxuXHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcImRlbGV0ZVRleHRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKGVuYWJsZVNoYXJlKSB7XG5cdFx0XHRhY3Rpb25CdXR0b25zLnB1c2goe1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRidXR0b25TdHlsZTogXCJwcmltYXJ5XCIgYXMgQnV0dG9uU3R5bGUuUHJpbWFyeSxcblx0XHRcdFx0YWN0aW9uOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcInNoYXJlVGV4dFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJDb250YWluZXJcIixcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdHBhZGRpbmc6IFwiMTBweFwiLFxuXHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0ZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcblx0XHRcdFx0ZmxleDogMVxuXHRcdFx0fSxcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRkYXRhS2V5OiBcInRpdGxlXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTZweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ0JvdHRvbTogXCI1cHhcIixcblx0XHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtwYWxldHRlLmJhY2tncm91bmQ2fWBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRkYXRhS2V5OiBcImluc3RydWN0aW9uc1wiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRmbGV4OiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJDb250YWluZXJcIixcblx0XHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRcdGdhcDogXCIxMHB4XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBhY3Rpb25CdXR0b25zXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cblx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmJ1aWxkUmVzdWx0cyhcblx0XHRcdHBsYXRmb3JtLFxuXHRcdFx0d29ya3NwYWNlcyxcblx0XHRcdHRoaXMuX2xhc3RRdWVyeSxcblx0XHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCxcblx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0KTtcblx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzKTtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgYnVpbGRSZXN1bHRzKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHR3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXIsXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGxldCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHdvcmtzcGFjZXMpKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uZ2V0Q3VycmVudFdvcmtzcGFjZSgpO1xuXHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZUlkID0gY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cdFx0XHRjb25zdCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblx0XHRcdGNvbnN0IHBhbGV0dGU6IEN1c3RvbVBhbGV0dGVTZXQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudFBhbGV0dGUoKTtcblxuXHRcdFx0cmVzdWx0cyA9IHdvcmtzcGFjZXNcblx0XHRcdFx0LmZpbHRlcihcblx0XHRcdFx0XHQocGcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHwgKHF1ZXJ5Lmxlbmd0aCA+PSBxdWVyeU1pbkxlbmd0aCAmJiBwZy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSlcblx0XHRcdFx0KVxuXHRcdFx0XHQubWFwKCh3czogV29ya3NwYWNlLCBpbmRleDogbnVtYmVyKSA9PlxuXHRcdFx0XHRcdHRoaXMuZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHR3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdzLnRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0Y3VycmVudFdvcmtzcGFjZUlkID09PSB3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdGNvbG9yU2NoZW1lLFxuXHRcdFx0XHRcdFx0cGFsZXR0ZVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcml2YXRlIHJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcblx0XHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gcmVzdWx0LmtleSk7XG5cdFx0XHRcdGlmIChyZXN1bHRJbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxLCByZXN1bHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlc3VsdFJlbW92ZShpZDogc3RyaW5nKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSBpZCk7XG5cdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGlkKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgV29ya3NwYWNlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogV29ya3NwYWNlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFdvcmtzcGFjZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9