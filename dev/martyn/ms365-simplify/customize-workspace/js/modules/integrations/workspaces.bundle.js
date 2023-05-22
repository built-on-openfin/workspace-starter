/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/uuid.ts":
/*!**************************************!*\
  !*** ./client/src/framework/uuid.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
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
/* harmony export */   WorkspacesProvider: () => (/* binding */ WorkspacesProvider)
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
        this._providerId = definition.id;
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
                key: `${this._providerId}-help1`,
                title: "Workspaces",
                label: "Help",
                icon: this._settings.images.workspace.replace("{scheme}", colorScheme),
                actions: [],
                data: {
                    providerId: this._providerId
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
                                providerId: this._providerId,
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
                            providerId: this._providerId,
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
                    const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
                    const savedWorkspace = await this.getWorkspaceTemplate(workspace.workspaceId, workspace.title, shareEnabled, true, colorScheme);
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
    async getWorkspaceTemplate(id, title, shareEnabled, isCurrent, colorScheme) {
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
        const icon = this._settings.images.workspace.replace("{scheme}", colorScheme);
        const layoutData = await this._integrationHelpers.templateHelpers.createLayout(title, icon, [await this._integrationHelpers.templateHelpers.createText("instructions")], actionButtons);
        return {
            key: id,
            title,
            label: "Workspace",
            icon,
            actions,
            data: {
                providerId: this._providerId,
                workspaceTitle: title,
                workspaceId: id,
                tags: ["workspace"]
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
            const wksProm = workspaces
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(async (ws) => this.getWorkspaceTemplate(ws.workspaceId, ws.title, shareEnabled, currentWorkspaceId === ws.workspaceId, colorScheme));
            results = await Promise.all(wksProm);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RztBQUNxQiwwQ0FBdUIsR0FBRyxpQkFBaUIsQ0FBQztBQUVwRTs7O0dBR0c7QUFDcUIseUNBQXNCLEdBQUcsZ0JBQWdCLENBQUM7QUFFbEU7OztHQUdHO0FBQ3FCLDJDQUF3QixHQUFHLGtCQUFrQixDQUFDOzs7Ozs7O1NDbER2RTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBRTVDLE1BQU0sV0FBVyxHQUF5QztJQUNoRSxZQUFZLEVBQUUsSUFBSSw0REFBa0IsRUFBRTtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dWlkLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3dvcmtzcGFjZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdGNvbnN0IGdldFJhbmRvbUhleCA9IChjKSA9PlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1taXhlZC1vcGVyYXRvcnNcblx0XHQoYyBeICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKGMgLyA0KSkpKS50b1N0cmluZygxNik7XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEN1c3RvbVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtzcGFjZSwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtzcGFjZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ29sb3JTY2hlbWVNb2RlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL3RoZW1lLXNoYXBlc1wiO1xuaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXVpZFwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciB3b3Jrc3BhY2VzLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlc1Byb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8V29ya3NwYWNlc1NldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igb3BlbmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX09QRU5fV09SS1NQQUNFID0gXCJPcGVuIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFID0gXCJEZWxldGUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0hBUkVfV09SS1NQQUNFID0gXCJTaGFyZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNhdmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NBVkVfV09SS1NQQUNFID0gXCJTYXZlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgYSB3b3Jrc3BhY2UgZXhpc3RzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSA9IFwiV29ya3NwYWNlIEV4aXN0c1wiO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9wcm92aWRlcklkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBXb3Jrc3BhY2VzU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248V29ya3NwYWNlc1NldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXb3Jrc3BhY2VzUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fcHJvdmlkZXJJZCA9IGRlZmluaXRpb24uaWQ7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XCJ3b3Jrc3BhY2UtY2hhbmdlZFwiLFxuXHRcdFx0YXN5bmMgKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSwgcGF5bG9hZDogV29ya3NwYWNlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpID0+IHtcblx0XHRcdFx0aWYgKHBheWxvYWQuYWN0aW9uID09PSBcImNyZWF0ZVwiKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9sYXN0UXVlcnkuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGFzdFJlc3VsdCA9IHRoaXMuX2xhc3RSZXN1bHRzPy5maW5kKChyZXMpID0+IHJlcy5rZXkgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdGlmIChsYXN0UmVzdWx0KSB7XG5cdFx0XHRcdFx0XHRsYXN0UmVzdWx0LnRpdGxlID0gcGF5bG9hZC53b3Jrc3BhY2UudGl0bGU7XG5cdFx0XHRcdFx0XHRsYXN0UmVzdWx0LmRhdGEud29ya3NwYWNlVGl0bGUgPSBwYXlsb2FkLndvcmtzcGFjZS50aXRsZTtcblx0XHRcdFx0XHRcdChsYXN0UmVzdWx0LnRlbXBsYXRlQ29udGVudCBhcyBDdXN0b21UZW1wbGF0ZSkuZGF0YS50aXRsZSA9IHBheWxvYWQud29ya3NwYWNlLnRpdGxlO1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUoW2xhc3RSZXN1bHRdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHR0aGlzLnJlc3VsdFJlbW92ZShwYXlsb2FkLmlkIGFzIHN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6IGAke3RoaXMuX3Byb3ZpZGVySWR9LWhlbHAxYCxcblx0XHRcdFx0dGl0bGU6IFwiV29ya3NwYWNlc1wiLFxuXHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fcHJvdmlkZXJJZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHRcdHRlbXBsYXRlQ29udGVudDogYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVIZWxwKFxuXHRcdFx0XHRcdFwiV29ya3NwYWNlc1wiLFxuXHRcdFx0XHRcdFtcIlVzZSB0aGUgd29ya3NwYWNlcyBjb21tYW5kIHRvIHNhdmUgeW91ciBjdXJyZW50IGxheW91dC5cIl0sXG5cdFx0XHRcdFx0W1wiL3cgdGl0bGVcIl1cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdF07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRjb25zdCB3b3Jrc3BhY2VzOiBXb3Jrc3BhY2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aDtcblxuXHRcdGlmIChxdWVyeUxvd2VyLnN0YXJ0c1dpdGgoXCIvdyBcIikpIHtcblx0XHRcdGNvbnN0IHRpdGxlID0gcXVlcnlMb3dlci5yZXBsYWNlKFwiL3cgXCIsIFwiXCIpO1xuXG5cdFx0XHRjb25zdCBmb3VuZE1hdGNoID0gd29ya3NwYWNlcy5maW5kKChlbnRyeSkgPT4gZW50cnkudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gdGl0bGUudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRpZiAoZm91bmRNYXRjaCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHJlc3VsdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0a2V5OiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9FWElTVFNfV09SS1NQQUNFLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogYFdvcmtzcGFjZSAke2ZvdW5kTWF0Y2gudGl0bGV9IGFscmVhZHkgZXhpc3RzLmAsXG5cdFx0XHRcdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRcdFx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fcHJvdmlkZXJJZCxcblx0XHRcdFx0XHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl0sXG5cdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGZvdW5kTWF0Y2gud29ya3NwYWNlSWRcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IG51bGwsXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogbnVsbFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NBVkVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGBTYXZlIEN1cnJlbnQgV29ya3NwYWNlIGFzICR7dGl0bGV9YCxcblx0XHRcdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRcdFx0XHRsYWJlbDogXCJTdWdnZXN0aW9uXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb25zOiBbeyBuYW1lOiBcIlNhdmUgV29ya3NwYWNlXCIsIGhvdGtleTogXCJFbnRlclwiIH1dLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9wcm92aWRlcklkLFxuXHRcdFx0XHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl0sXG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiByYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBudWxsLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBudWxsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGNvbnN0IHdvcmtzcGFjZVJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0cGxhdGZvcm0sXG5cdFx0XHR3b3Jrc3BhY2VzLFxuXHRcdFx0cXVlcnlMb3dlcixcblx0XHRcdG9wdGlvbnMucXVlcnlNaW5MZW5ndGgsXG5cdFx0XHRjb2xvclNjaGVtZVxuXHRcdCk7XG5cblx0XHR0aGlzLl9sYXN0UmVzdWx0cyA9IHdvcmtzcGFjZVJlc3VsdHM7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogd29ya3NwYWNlUmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdHdvcmtzcGFjZUlkPzogc3RyaW5nO1xuXHRcdFx0XHR3b3Jrc3BhY2VUaXRsZT86IHN0cmluZztcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0aWYgKGRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChyZXN1bHQua2V5ID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TQVZFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgc2F2ZSB3b3Jrc3BhY2UgZW50cnlcblx0XHRcdFx0XHR0aGlzLnJlc3VsdFJlbW92ZShyZXN1bHQua2V5KTtcblxuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgcGxhdGZvcm0uZ2V0U25hcHNob3QoKTtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uZ2V0Q3VycmVudFdvcmtzcGFjZSgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRNZXRhRGF0YSA9IGN1cnJlbnRXb3Jrc3BhY2U/Lm1ldGFkYXRhO1xuXG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0ge1xuXHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGRhdGEud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHR0aXRsZTogZGF0YS53b3Jrc3BhY2VUaXRsZSxcblx0XHRcdFx0XHRcdG1ldGFkYXRhOiBjdXJyZW50TWV0YURhdGEsXG5cdFx0XHRcdFx0XHRzbmFwc2hvdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLnNhdmVXb3Jrc3BhY2Uod29ya3NwYWNlKTtcblxuXHRcdFx0XHRcdGNvbnN0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXHRcdFx0XHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdFx0XHRcdGNvbnN0IHNhdmVkV29ya3NwYWNlID0gYXdhaXQgdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdHdvcmtzcGFjZS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdvcmtzcGFjZS50aXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBBbmQgYWRkIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUoW3NhdmVkV29ya3NwYWNlXSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmtleSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdC8vIERvIG5vdGhpbmcsIHRoZSB1c2VyIG11c3QgdXBkYXRlIHRoZSBxdWVyeSB0byBnaXZlIGl0IGEgZGlmZmVyZW50XG5cdFx0XHRcdFx0Ly8gbmFtZSB3aGljaCB3aWxsIGF1dG9tYXRpY2FsbHkgcmVmcmVzaCB0aGUgcmVzdWx0c1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fT1BFTl9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFdvcmtzcGFjZShkYXRhLndvcmtzcGFjZUlkKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5hcHBseVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXHRcdFx0XHRcdC8vIFdlIHJlYnVpbGQgdGhlIHJlc3VsdHMgaGVyZSBhcyB3ZSB3aWxsIG5vdyBoYXZlIGEgbmV3IGN1cnJlbnQgd29ya3NwYWNlXG5cdFx0XHRcdFx0Ly8gYW5kIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBleGlzdGluZyBvbmUgYmFjayB0byBhIHN0YW5kYXJkIHRlbXBsYXRlXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmRlbGV0ZVdvcmtzcGFjZShkYXRhLndvcmtzcGFjZUlkKTtcblx0XHRcdFx0XHQvLyBEZWxldGluZyB0aGUgd29ya2luZyB3aWxsIGV2ZW50dWFsbHkgdHJpZ2dlciB0aGUgXCJkZWxldGVcIiBsaWZlY3ljbGVcblx0XHRcdFx0XHQvLyBldmVudCB3aGljaCB3aWxsIHJlbW92ZSBpdCBmcm9tIHRoZSByZXN1bHQgbGlzdFxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnNoYXJlKHsgd29ya3NwYWNlSWQ6IGRhdGEud29ya3NwYWNlSWQgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBVbnJlY29nbml6ZWQgYWN0aW9uIGZvciB3b3Jrc3BhY2Ugc2VsZWN0aW9uOiAke2RhdGEud29ya3NwYWNlSWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRpc0N1cnJlbnQ6IGJvb2xlYW4sXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHQ+IHtcblx0XHRjb25zdCBhY3Rpb25zID0gW1xuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9PUEVOX1dPUktTUEFDRSxcblx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdH1cblx0XHRdO1xuXHRcdGNvbnN0IGFjdGlvbkJ1dHRvbnM6IHsgdGl0bGU6IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJPcGVuXCIsXG5cdFx0XHRcdGFjdGlvbjogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fT1BFTl9XT1JLU1BBQ0Vcblx0XHRcdH1cblx0XHRdO1xuXHRcdGxldCBpbnN0cnVjdGlvbnM7XG5cblx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRpbnN0cnVjdGlvbnMgPVxuXHRcdFx0XHRcIlRoaXMgaXMgdGhlIGN1cnJlbnRseSBhY3RpdmUgd29ya3NwYWNlLiBZb3UgY2FuIHVzZSB0aGUgQnJvd3NlciBtZW51IHRvIHVwZGF0ZS9yZW5hbWUgdGhpcyB3b3Jrc3BhY2VcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zdHJ1Y3Rpb25zID0gXCJVc2UgdGhlIGJ1dHRvbnMgYmVsb3cgdG8gaW50ZXJhY3Qgd2l0aCB5b3VyIHNhdmVkIHdvcmtzcGFjZVwiO1xuXHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSxcblx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdH0pO1xuXHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0dGl0bGU6IFwiRGVsZXRlXCIsXG5cdFx0XHRcdGFjdGlvbjogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHNoYXJlRW5hYmxlZCkge1xuXHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFLFxuXHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0fSk7XG5cdFx0XHRhY3Rpb25CdXR0b25zLnB1c2goe1xuXHRcdFx0XHR0aXRsZTogXCJTaGFyZVwiLFxuXHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWNvbiA9IHRoaXMuX3NldHRpbmdzLmltYWdlcy53b3Jrc3BhY2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyk7XG5cblx0XHRjb25zdCBsYXlvdXREYXRhID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVMYXlvdXQoXG5cdFx0XHR0aXRsZSxcblx0XHRcdGljb24sXG5cdFx0XHRbYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUZXh0KFwiaW5zdHJ1Y3Rpb25zXCIpXSxcblx0XHRcdGFjdGlvbkJ1dHRvbnNcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogaWQsXG5cdFx0XHR0aXRsZSxcblx0XHRcdGxhYmVsOiBcIldvcmtzcGFjZVwiLFxuXHRcdFx0aWNvbixcblx0XHRcdGFjdGlvbnMsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX3Byb3ZpZGVySWQsXG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0bGF5b3V0OiBsYXlvdXREYXRhLmxheW91dCxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdC4uLmxheW91dERhdGEuZGF0YSxcblx0XHRcdFx0XHRpbnN0cnVjdGlvbnNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdGNvbnN0IHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2VzKCk7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKFxuXHRcdFx0cGxhdGZvcm0sXG5cdFx0XHR3b3Jrc3BhY2VzLFxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLFxuXHRcdFx0Y29sb3JTY2hlbWVcblx0XHQpO1xuXHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKHJlc3VsdHMpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHdvcmtzcGFjZXM6IFdvcmtzcGFjZVtdLFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcixcblx0XHRjb2xvclNjaGVtZTogQ29sb3JTY2hlbWVNb2RlXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0bGV0IHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IFtdO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkod29ya3NwYWNlcykpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlSWQgPSBjdXJyZW50V29ya3NwYWNlPy53b3Jrc3BhY2VJZDtcblx0XHRcdGNvbnN0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXG5cdFx0XHRjb25zdCB3a3NQcm9tID0gd29ya3NwYWNlc1xuXHRcdFx0XHQuZmlsdGVyKFxuXHRcdFx0XHRcdChwZykgPT5cblx0XHRcdFx0XHRcdHF1ZXJ5Lmxlbmd0aCA9PT0gMCB8fCAocXVlcnkubGVuZ3RoID49IHF1ZXJ5TWluTGVuZ3RoICYmIHBnLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKVxuXHRcdFx0XHQpXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpXG5cdFx0XHRcdC5tYXAoYXN5bmMgKHdzOiBXb3Jrc3BhY2UpID0+XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdHdzLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0d3MudGl0bGUsXG5cdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQsXG5cdFx0XHRcdFx0XHRjdXJyZW50V29ya3NwYWNlSWQgPT09IHdzLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0Y29sb3JTY2hlbWVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cblx0XHRcdHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbCh3a3NQcm9tKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcml2YXRlIHJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcblx0XHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gcmVzdWx0LmtleSk7XG5cdFx0XHRcdGlmIChyZXN1bHRJbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxLCByZXN1bHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlc3VsdFJlbW92ZShpZDogc3RyaW5nKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSBpZCk7XG5cdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKGlkKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgV29ya3NwYWNlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogV29ya3NwYWNlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFdvcmtzcGFjZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9