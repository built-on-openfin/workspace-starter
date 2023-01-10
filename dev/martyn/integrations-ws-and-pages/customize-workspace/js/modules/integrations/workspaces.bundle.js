/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/integrations/workspaces/integration-provider.ts":
/*!****************************************************************************!*\
  !*** ./client/src/modules/integrations/workspaces/integration-provider.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkspacesProvider": () => (/* binding */ WorkspacesProvider)
/* harmony export */ });
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
        this._integrationHelpers = helpers;
        this._logger = loggerCreator("WorkspacesProvider");
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
        return [
            {
                key: `${WorkspacesProvider._PROVIDER_ID}-help1`,
                title: "Workspaces",
                label: "Help",
                icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
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
        const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
        const queryLower = query.toLowerCase();
        if (queryLower.startsWith("/w ")) {
            const title = queryLower.replace("/w ", "");
            const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
            if (foundMatch) {
                return {
                    results: [
                        {
                            key: WorkspacesProvider._ACTION_EXISTS_WORKSPACE,
                            title: `Workspace ${foundMatch.title} already exists.`,
                            icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
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
                        icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
                        label: "Suggestion",
                        actions: [{ name: "Save Workspace", hotkey: "Enter" }],
                        data: {
                            providerId: WorkspacesProvider._PROVIDER_ID,
                            tags: ["workspace"],
                            workspaceId: this._integrationHelpers.randomUUID(),
                            workspaceTitle: title
                        },
                        template: null,
                        templateContent: null
                    }
                ]
            };
        }
        let workspaceResults = [];
        if (Array.isArray(workspaces)) {
            const currentWorkspace = await platform.getCurrentWorkspace();
            const currentWorkspaceId = currentWorkspace?.workspaceId;
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            workspaceResults = workspaces
                .filter((pg) => query.length === 0 ||
                (query.length >= options.queryMinLength && pg.title.toLowerCase().includes(queryLower)))
                .map((ws) => this.getWorkspaceTemplate(ws.workspaceId, ws.title, shareEnabled, currentWorkspaceId === ws.workspaceId, iconFolder, colorScheme));
        }
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
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            if (data?.workspaceId) {
                handled = true;
                if (result.key === WorkspacesProvider._ACTION_SAVE_WORKSPACE) {
                    lastResponse.revoke(result.key);
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
                    const savedTemplate = this.getWorkspaceTemplate(data.workspaceId, data.workspaceTitle, shareEnabled, true, iconFolder, colorScheme);
                    lastResponse.respond([savedTemplate]);
                }
                else if (result.key === WorkspacesProvider._ACTION_EXISTS_WORKSPACE) {
                    lastResponse.revoke(result.key);
                }
                else if (result.action.name === WorkspacesProvider._ACTION_LAUNCH_WORKSPACE) {
                    lastResponse.revoke(result.key);
                    const platform = this._integrationHelpers.getPlatform();
                    const workspace = await platform.Storage.getWorkspace(data.workspaceId);
                    await platform.applyWorkspace(workspace);
                    const savedTemplate = this.getWorkspaceTemplate(data.workspaceId, data.workspaceTitle, shareEnabled, true, iconFolder, colorScheme);
                    lastResponse.respond([savedTemplate]);
                }
                else if (result.action.name === WorkspacesProvider._ACTION_DELETE_WORKSPACE) {
                    const platform = this._integrationHelpers.getPlatform();
                    await platform.Storage.deleteWorkspace(data.workspaceId);
                    lastResponse.revoke(result.key);
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
    getWorkspaceTemplate(id, title, shareEnabled, isCurrent, iconFolder, colorScheme) {
        let actions = [];
        let layout;
        let data;
        if (isCurrent) {
            layout = this.getCurrentWorkspaceTemplate();
            data = {
                title,
                instructions: "This is the currently active workspace. You can use the Browser menu to update/rename this workspace"
            };
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
                    name: WorkspacesProvider._ACTION_LAUNCH_WORKSPACE,
                    hotkey: "Enter"
                }
            ]);
            layout = this.getOtherWorkspaceTemplate(shareEnabled);
            data = {
                title,
                instructions: "Use the buttons below to interact with your saved Workspace:",
                openText: "Launch",
                deleteText: "Delete",
                shareText: "Share"
            };
        }
        return {
            key: id,
            title,
            label: "Workspace",
            icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
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
    getOtherWorkspaceTemplate(enableShare) {
        const actionButtons = [
            {
                type: "Button",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px"
                },
                action: WorkspacesProvider._ACTION_LAUNCH_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "openText",
                        optional: false
                    }
                ]
            },
            {
                type: "Button",
                buttonStyle: "primary",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px",
                    marginLeft: "10px",
                    marginRight: "10px"
                },
                action: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "deleteText",
                        optional: false
                    }
                ]
            }
        ];
        if (enableShare) {
            actionButtons.push({
                type: "Button",
                buttonStyle: "primary",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px"
                },
                action: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
                children: [
                    {
                        type: "Text",
                        dataKey: "shareText",
                        optional: false
                    }
                ]
            });
        }
        return {
            type: "Container",
            style: {
                paddingTop: "10px",
                display: "flex",
                flexDirection: "column"
            },
            children: [
                {
                    type: "Text",
                    dataKey: "title",
                    style: {
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                    }
                },
                {
                    type: "Text",
                    dataKey: "instructions",
                    optional: true,
                    style: {
                        fontWeight: "bold",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }
                },
                {
                    type: "Container",
                    style: {
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "center",
                        paddingTop: "10px",
                        paddingBottom: "10px"
                    },
                    children: actionButtons
                }
            ]
        };
    }
    getCurrentWorkspaceTemplate() {
        return {
            type: "Container",
            style: {
                paddingTop: "10px",
                display: "flex",
                flexDirection: "column"
            },
            children: [
                {
                    type: "Text",
                    dataKey: "title",
                    style: {
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                    }
                },
                {
                    type: "Text",
                    dataKey: "instructions",
                    optional: true,
                    style: {
                        fontWeight: "bold",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }
                }
            ]
        };
    }
}
/**
 * Provider id.
 * @internal
 */
WorkspacesProvider._PROVIDER_ID = "workspaces";
/**
 * The key to use for launching a workspace.
 * @internal
 */
WorkspacesProvider._ACTION_LAUNCH_WORKSPACE = "Launch Workspace";
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
/* harmony import */ var _integration_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration-provider */ "./client/src/modules/integrations/workspaces/integration-provider.ts");

const entryPoints = {
    integrations: new _integration_provider__WEBPACK_IMPORTED_MODULE_0__.WorkspacesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RHZFO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONEQ7QUFFckQsTUFBTSxXQUFXLEdBQXlDO0lBQ2hFLFlBQVksRUFBRSxJQUFJLHFFQUFrQixFQUFFO0NBQ3RDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvd29ya3NwYWNlcy9pbnRlZ3JhdGlvbi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0QnV0dG9uU3R5bGUsXG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0LFxuXHRUZW1wbGF0ZUZyYWdtZW50LFxuXHRXb3Jrc3BhY2Vcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IENvbG9yU2NoZW1lTW9kZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy90aGVtZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciB3b3Jrc3BhY2VzLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlc1Byb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGUge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJ3b3Jrc3BhY2VzXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBsYXVuY2hpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9MQVVOQ0hfV09SS1NQQUNFID0gXCJMYXVuY2ggV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBkZWxldGluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UgPSBcIkRlbGV0ZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNoYXJpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UgPSBcIlNoYXJlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2F2aW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UgPSBcIlNhdmUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBhIHdvcmtzcGFjZSBleGlzdHMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9FWElTVFNfV09SS1NQQUNFID0gXCJXb3Jrc3BhY2UgRXhpc3RzXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXb3Jrc3BhY2VzUHJvdmlkZXJcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXHRcdGNvbnN0IGljb25Gb2xkZXIgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblxuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7V29ya3NwYWNlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRH0taGVscDFgLFxuXHRcdFx0XHR0aXRsZTogXCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdGxhYmVsOiBcIkhlbHBcIixcblx0XHRcdFx0aWNvbjogYCR7dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnJvb3RVcmx9L2NvbW1vbi9pY29ucy8ke2ljb25Gb2xkZXJ9LyR7Y29sb3JTY2hlbWV9L3dvcmtzcGFjZXMuc3ZnYCxcblx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lEXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0XCJXb3Jrc3BhY2VzXCIsXG5cdFx0XHRcdFx0W1wiVXNlIHRoZSB3b3Jrc3BhY2VzIGNvbW1hbmQgdG8gc2F2ZSB5b3VyIGN1cnJlbnQgbGF5b3V0LlwiXSxcblx0XHRcdFx0XHRbXCIvdyB0aXRsZVwiXVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0Y29uc3Qgd29ya3NwYWNlcyA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlcygpO1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblx0XHRjb25zdCBpY29uRm9sZGVyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblxuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi93IFwiKSkge1xuXHRcdFx0Y29uc3QgdGl0bGUgPSBxdWVyeUxvd2VyLnJlcGxhY2UoXCIvdyBcIiwgXCJcIik7XG5cblx0XHRcdGNvbnN0IGZvdW5kTWF0Y2ggPSB3b3Jrc3BhY2VzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS50aXRsZS50b0xvd2VyQ2FzZSgpID09PSB0aXRsZS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGlmIChmb3VuZE1hdGNoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRrZXk6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBgV29ya3NwYWNlICR7Zm91bmRNYXRjaC50aXRsZX0gYWxyZWFkeSBleGlzdHMuYCxcblx0XHRcdFx0XHRcdFx0aWNvbjogYCR7dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnJvb3RVcmx9L2NvbW1vbi9pY29ucy8ke2ljb25Gb2xkZXJ9LyR7Y29sb3JTY2hlbWV9L3dvcmtzcGFjZXMuc3ZnYCxcblx0XHRcdFx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRwcm92aWRlcklkOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZm91bmRNYXRjaC53b3Jrc3BhY2VJZFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogbnVsbCxcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBudWxsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGtleTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0FWRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0XHR0aXRsZTogYFNhdmUgQ3VycmVudCBXb3Jrc3BhY2UgYXMgJHt0aXRsZX1gLFxuXHRcdFx0XHRcdFx0aWNvbjogYCR7dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnJvb3RVcmx9L2NvbW1vbi9pY29ucy8ke2ljb25Gb2xkZXJ9LyR7Y29sb3JTY2hlbWV9L3dvcmtzcGFjZXMuc3ZnYCxcblx0XHRcdFx0XHRcdGxhYmVsOiBcIlN1Z2dlc3Rpb25cIixcblx0XHRcdFx0XHRcdGFjdGlvbnM6IFt7IG5hbWU6IFwiU2F2ZSBXb3Jrc3BhY2VcIiwgaG90a2V5OiBcIkVudGVyXCIgfV0sXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IFdvcmtzcGFjZXNQcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXSxcblx0XHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5yYW5kb21VVUlEKCksXG5cdFx0XHRcdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBudWxsLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBudWxsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGxldCB3b3Jrc3BhY2VSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHdvcmtzcGFjZXMpKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uZ2V0Q3VycmVudFdvcmtzcGFjZSgpO1xuXHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZUlkID0gY3VycmVudFdvcmtzcGFjZT8ud29ya3NwYWNlSWQ7XG5cdFx0XHRjb25zdCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblxuXHRcdFx0d29ya3NwYWNlUmVzdWx0cyA9IHdvcmtzcGFjZXNcblx0XHRcdFx0LmZpbHRlcihcblx0XHRcdFx0XHQocGcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHxcblx0XHRcdFx0XHRcdChxdWVyeS5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCAmJiBwZy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5TG93ZXIpKVxuXHRcdFx0XHQpXG5cdFx0XHRcdC5tYXAoKHdzOiBXb3Jrc3BhY2UpID0+XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdHdzLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0d3MudGl0bGUsXG5cdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQsXG5cdFx0XHRcdFx0XHRjdXJyZW50V29ya3NwYWNlSWQgPT09IHdzLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0aWNvbkZvbGRlcixcblx0XHRcdFx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiB3b3Jrc3BhY2VSZXN1bHRzXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0d29ya3NwYWNlSWQ/OiBzdHJpbmc7XG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlPzogc3RyaW5nO1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cdFx0XHRjb25zdCBpY29uRm9sZGVyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblx0XHRcdGNvbnN0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXG5cdFx0XHRpZiAoZGF0YT8ud29ya3NwYWNlSWQpIHtcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NBVkVfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0bGFzdFJlc3BvbnNlLnJldm9rZShyZXN1bHQua2V5KTtcblxuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0Y29uc3Qgc25hcHNob3QgPSBhd2FpdCBwbGF0Zm9ybS5nZXRTbmFwc2hvdCgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudE1ldGFEYXRhID0gY3VycmVudFdvcmtzcGFjZT8ubWV0YWRhdGE7XG5cblx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2UgPSB7XG5cdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogZGF0YS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHRpdGxlOiBkYXRhLndvcmtzcGFjZVRpdGxlLFxuXHRcdFx0XHRcdFx0bWV0YWRhdGE6IGN1cnJlbnRNZXRhRGF0YSxcblx0XHRcdFx0XHRcdHNuYXBzaG90XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLnNhdmVXb3Jrc3BhY2Uod29ya3NwYWNlKTtcblxuXHRcdFx0XHRcdGNvbnN0IHNhdmVkVGVtcGxhdGUgPSB0aGlzLmdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdFx0XHRcdFx0ZGF0YS53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdGRhdGEud29ya3NwYWNlVGl0bGUsXG5cdFx0XHRcdFx0XHRzaGFyZUVuYWJsZWQsXG5cdFx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0aWNvbkZvbGRlcixcblx0XHRcdFx0XHRcdGNvbG9yU2NoZW1lXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGxhc3RSZXNwb25zZS5yZXNwb25kKFtzYXZlZFRlbXBsYXRlXSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmtleSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGxhc3RSZXNwb25zZS5yZXZva2UocmVzdWx0LmtleSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfV09SS1NQQUNFKSB7XG5cdFx0XHRcdFx0bGFzdFJlc3BvbnNlLnJldm9rZShyZXN1bHQua2V5KTtcblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlKGRhdGEud29ya3NwYWNlSWQpO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLmFwcGx5V29ya3NwYWNlKHdvcmtzcGFjZSk7XG5cblx0XHRcdFx0XHRjb25zdCBzYXZlZFRlbXBsYXRlID0gdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdGRhdGEud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRkYXRhLndvcmtzcGFjZVRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdGljb25Gb2xkZXIsXG5cdFx0XHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRsYXN0UmVzcG9uc2UucmVzcG9uZChbc2F2ZWRUZW1wbGF0ZV0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVXb3Jrc3BhY2UoZGF0YS53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0bGFzdFJlc3BvbnNlLnJldm9rZShyZXN1bHQua2V5KTtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHdvcmtzcGFjZUlkOiBkYXRhLndvcmtzcGFjZUlkIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3Igd29ya3NwYWNlIHNlbGVjdGlvbjogJHtkYXRhLndvcmtzcGFjZUlkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHRwcml2YXRlIGdldFdvcmtzcGFjZVRlbXBsYXRlKFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRzaGFyZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdFx0aXNDdXJyZW50OiBib29sZWFuLFxuXHRcdGljb25Gb2xkZXI6IHN0cmluZyxcblx0XHRjb2xvclNjaGVtZTogQ29sb3JTY2hlbWVNb2RlXG5cdCk6IEhvbWVTZWFyY2hSZXN1bHQge1xuXHRcdGxldCBhY3Rpb25zID0gW107XG5cdFx0bGV0IGxheW91dDtcblx0XHRsZXQgZGF0YTtcblxuXHRcdGlmIChpc0N1cnJlbnQpIHtcblx0XHRcdGxheW91dCA9IHRoaXMuZ2V0Q3VycmVudFdvcmtzcGFjZVRlbXBsYXRlKCk7XG5cdFx0XHRkYXRhID0ge1xuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0aW5zdHJ1Y3Rpb25zOlxuXHRcdFx0XHRcdFwiVGhpcyBpcyB0aGUgY3VycmVudGx5IGFjdGl2ZSB3b3Jrc3BhY2UuIFlvdSBjYW4gdXNlIHRoZSBCcm93c2VyIG1lbnUgdG8gdXBkYXRlL3JlbmFtZSB0aGlzIHdvcmtzcGFjZVwiXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoc2hhcmVFbmFibGVkKSB7XG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJDbWRPckN0cmwrU2hpZnQrU1wiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0YWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9XT1JLU1BBQ0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XSk7XG5cdFx0XHRsYXlvdXQgPSB0aGlzLmdldE90aGVyV29ya3NwYWNlVGVtcGxhdGUoc2hhcmVFbmFibGVkKTtcblx0XHRcdGRhdGEgPSB7XG5cdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHRpbnN0cnVjdGlvbnM6IFwiVXNlIHRoZSBidXR0b25zIGJlbG93IHRvIGludGVyYWN0IHdpdGggeW91ciBzYXZlZCBXb3Jrc3BhY2U6XCIsXG5cdFx0XHRcdG9wZW5UZXh0OiBcIkxhdW5jaFwiLFxuXHRcdFx0XHRkZWxldGVUZXh0OiBcIkRlbGV0ZVwiLFxuXHRcdFx0XHRzaGFyZVRleHQ6IFwiU2hhcmVcIlxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBpZCxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiV29ya3NwYWNlXCIsXG5cdFx0XHRpY29uOiBgJHt0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMucm9vdFVybH0vY29tbW9uL2ljb25zLyR7aWNvbkZvbGRlcn0vJHtjb2xvclNjaGVtZX0vd29ya3NwYWNlcy5zdmdgLFxuXHRcdFx0YWN0aW9ucyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogV29ya3NwYWNlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0d29ya3NwYWNlVGl0bGU6IHRpdGxlLFxuXHRcdFx0XHR3b3Jrc3BhY2VJZDogaWQsXG5cdFx0XHRcdHRhZ3M6IFtcIndvcmtzcGFjZVwiXVxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQsXG5cdFx0XHRcdGRhdGFcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRPdGhlcldvcmtzcGFjZVRlbXBsYXRlKGVuYWJsZVNoYXJlOiBib29sZWFuKTogVGVtcGxhdGVGcmFnbWVudCB7XG5cdFx0Y29uc3QgYWN0aW9uQnV0dG9uczogVGVtcGxhdGVGcmFnbWVudFtdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0d2lkdGg6IFwiODBweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjdGlvbjogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1dPUktTUEFDRSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRcdGRhdGFLZXk6IFwib3BlblRleHRcIixcblx0XHRcdFx0XHRcdG9wdGlvbmFsOiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogXCJCdXR0b25cIixcblx0XHRcdFx0YnV0dG9uU3R5bGU6IFwicHJpbWFyeVwiIGFzIEJ1dHRvblN0eWxlLlByaW1hcnksXG5cdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdFx0ZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcblx0XHRcdFx0XHR3aWR0aDogXCI4MHB4XCIsXG5cdFx0XHRcdFx0bWFyZ2luTGVmdDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0bWFyZ2luUmlnaHQ6IFwiMTBweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjdGlvbjogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRcdGRhdGFLZXk6IFwiZGVsZXRlVGV4dFwiLFxuXHRcdFx0XHRcdFx0b3B0aW9uYWw6IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdGlmIChlbmFibGVTaGFyZSkge1xuXHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJCdXR0b25cIixcblx0XHRcdFx0YnV0dG9uU3R5bGU6IFwicHJpbWFyeVwiIGFzIEJ1dHRvblN0eWxlLlByaW1hcnksXG5cdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdFx0ZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcblx0XHRcdFx0XHR3aWR0aDogXCI4MHB4XCJcblx0XHRcdFx0fSxcblx0XHRcdFx0YWN0aW9uOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcInNoYXJlVGV4dFwiLFxuXHRcdFx0XHRcdFx0b3B0aW9uYWw6IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJDb250YWluZXJcIixcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdHBhZGRpbmdUb3A6IFwiMTBweFwiLFxuXHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0ZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIlxuXHRcdFx0fSxcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRkYXRhS2V5OiBcInRpdGxlXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTZweFwiLFxuXHRcdFx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJpbnN0cnVjdGlvbnNcIixcblx0XHRcdFx0XHRvcHRpb25hbDogdHJ1ZSxcblx0XHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFx0Zm9udFdlaWdodDogXCJib2xkXCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nVG9wOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdCb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ0xlZnQ6IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1JpZ2h0OiBcIjEwcHhcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdFx0ZmxleEZsb3c6IFwicm93IHdyYXBcIixcblx0XHRcdFx0XHRcdGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1RvcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjEwcHhcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2hpbGRyZW46IGFjdGlvbkJ1dHRvbnNcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGdldEN1cnJlbnRXb3Jrc3BhY2VUZW1wbGF0ZSgpOiBUZW1wbGF0ZUZyYWdtZW50IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJDb250YWluZXJcIixcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdHBhZGRpbmdUb3A6IFwiMTBweFwiLFxuXHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0ZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIlxuXHRcdFx0fSxcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRkYXRhS2V5OiBcInRpdGxlXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMTZweFwiLFxuXHRcdFx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJpbnN0cnVjdGlvbnNcIixcblx0XHRcdFx0XHRvcHRpb25hbDogdHJ1ZSxcblx0XHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFx0Zm9udFdlaWdodDogXCJib2xkXCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nVG9wOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdCb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ0xlZnQ6IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1JpZ2h0OiBcIjEwcHhcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgV29ya3NwYWNlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb24tcHJvdmlkZXJcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogV29ya3NwYWNlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFdvcmtzcGFjZXNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9