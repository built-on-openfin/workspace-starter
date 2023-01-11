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

/***/ "./client/src/modules/integrations/workspaces/integration-provider.ts":
/*!****************************************************************************!*\
  !*** ./client/src/modules/integrations/workspaces/integration-provider.ts ***!
  \****************************************************************************/
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
                            workspaceId: (0,_framework_uuid__WEBPACK_IMPORTED_MODULE_0__.randomUUID)(),
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlcy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQU8sU0FBUyxVQUFVO0lBQ3pCLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDbEMsZ0RBQWdEO1FBQ2hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNsQztJQUNELHVHQUF1RztJQUN2Ryw2RUFBNkU7SUFDN0UsOENBQThDO0lBQzlDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDMUIsMERBQTBEO0lBQzFELENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUYsT0FBTyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9FLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHb0Q7QUFFckQ7O0dBRUc7QUFDSSxNQUFNLGtCQUFrQjtJQWlEOUI7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDdEIsVUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsT0FBMkI7UUFFM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsb0JBQW9CO1FBQ2hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDL0UsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUV6RSxPQUFPO1lBQ047Z0JBQ0MsR0FBRyxFQUFFLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxRQUFRO2dCQUMvQyxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8saUJBQWlCLFVBQVUsSUFBSSxXQUFXLGlCQUFpQjtnQkFDcEcsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFO29CQUNMLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO2lCQUMzQztnQkFDRCxRQUFRLEVBQUUsUUFBOEI7Z0JBQ3hDLGVBQWUsRUFBRSxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUN6RSxZQUFZLEVBQ1osQ0FBQyx5REFBeUQsQ0FBQyxFQUMzRCxDQUFDLFVBQVUsQ0FBQyxDQUNaO2FBQ0Q7U0FDRCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsZ0JBQWdCLENBQzVCLEtBQWEsRUFDYixPQUFvQixFQUNwQixZQUF3QyxFQUN4QyxPQUdDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hELE1BQU0sVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxRCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQy9FLE1BQU0sVUFBVSxHQUFXLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFakYsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXZDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU1QyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLElBQUksVUFBVSxFQUFFO2dCQUNmLE9BQU87b0JBQ04sT0FBTyxFQUFFO3dCQUNSOzRCQUNDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyx3QkFBd0I7NEJBQ2hELEtBQUssRUFBRSxhQUFhLFVBQVUsQ0FBQyxLQUFLLGtCQUFrQjs0QkFDdEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8saUJBQWlCLFVBQVUsSUFBSSxXQUFXLGlCQUFpQjs0QkFDcEcsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsSUFBSSxFQUFFO2dDQUNMLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO2dDQUMzQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0NBQ25CLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVzs2QkFDbkM7NEJBQ0QsUUFBUSxFQUFFLElBQUk7NEJBQ2QsZUFBZSxFQUFFLElBQUk7eUJBQ3JCO3FCQUNEO2lCQUNELENBQUM7YUFDRjtZQUNELE9BQU87Z0JBQ04sT0FBTyxFQUFFO29CQUNSO3dCQUNDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7d0JBQzlDLEtBQUssRUFBRSw2QkFBNkIsS0FBSyxFQUFFO3dCQUMzQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxpQkFBaUIsVUFBVSxJQUFJLFdBQVcsaUJBQWlCO3dCQUNwRyxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO3dCQUN0RCxJQUFJLEVBQUU7NEJBQ0wsVUFBVSxFQUFFLGtCQUFrQixDQUFDLFlBQVk7NEJBQzNDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDbkIsV0FBVyxFQUFFLDJEQUFVLEVBQUU7NEJBQ3pCLGNBQWMsRUFBRSxLQUFLO3lCQUNyQjt3QkFDRCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxlQUFlLEVBQUUsSUFBSTtxQkFDckI7aUJBQ0Q7YUFDRCxDQUFDO1NBQ0Y7UUFFRCxJQUFJLGdCQUFnQixHQUF1QixFQUFFLENBQUM7UUFFOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM5RCxNQUFNLGtCQUFrQixHQUFHLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztZQUN6RCxNQUFNLFlBQVksR0FBWSxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbEYsZ0JBQWdCLEdBQUcsVUFBVTtpQkFDM0IsTUFBTSxDQUNOLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FDTixLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ2xCLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQ3hGO2lCQUNBLEdBQUcsQ0FBQyxDQUFDLEVBQWEsRUFBRSxFQUFFLENBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FDeEIsRUFBRSxDQUFDLFdBQVcsRUFDZCxFQUFFLENBQUMsS0FBSyxFQUNSLFlBQVksRUFDWixrQkFBa0IsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUNyQyxVQUFVLEVBQ1YsV0FBVyxDQUNYLENBQ0QsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNOLE9BQU8sRUFBRSxnQkFBZ0I7U0FDekIsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQ3pCLE1BQWtDLEVBQ2xDLFlBQXdDO1FBRXhDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsRUFBRTtZQUM1QyxNQUFNLElBQUksR0FHTixNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWhCLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDL0UsTUFBTSxVQUFVLEdBQVcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNqRixNQUFNLFlBQVksR0FBWSxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbEYsSUFBSSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUVmLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDN0QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWhDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzlDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDOUQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDO29CQUVuRCxNQUFNLFNBQVMsR0FBRzt3QkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO3dCQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWM7d0JBQzFCLFFBQVEsRUFBRSxlQUFlO3dCQUN6QixRQUFRO3FCQUNSLENBQUM7b0JBQ0YsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFaEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUM5QyxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsY0FBYyxFQUNuQixZQUFZLEVBQ1osSUFBSSxFQUNKLFVBQVUsRUFDVixXQUFXLENBQ1gsQ0FBQztvQkFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztpQkFDdEM7cUJBQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFO29CQUN0RSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEM7cUJBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRTtvQkFDOUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDeEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUM5QyxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsY0FBYyxFQUNuQixZQUFZLEVBQ1osSUFBSSxFQUNKLFVBQVUsRUFDVixXQUFXLENBQ1gsQ0FBQztvQkFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztpQkFDdEM7cUJBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRTtvQkFDOUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN4RCxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hDO3FCQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsdUJBQXVCLEVBQUU7b0JBQzdFLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztpQkFDeEU7cUJBQU07b0JBQ04sT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RjthQUNEO1NBQ0Q7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRU8sb0JBQW9CLENBQzNCLEVBQVUsRUFDVixLQUFhLEVBQ2IsWUFBcUIsRUFDckIsU0FBa0IsRUFDbEIsVUFBa0IsRUFDbEIsV0FBNEI7UUFFNUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLFNBQVMsRUFBRTtZQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUM1QyxJQUFJLEdBQUc7Z0JBQ04sS0FBSztnQkFDTCxZQUFZLEVBQ1gsc0dBQXNHO2FBQ3ZHLENBQUM7U0FDRjthQUFNO1lBQ04sSUFBSSxZQUFZLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1osSUFBSSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtvQkFDaEQsTUFBTSxFQUFFLG1CQUFtQjtpQkFDM0IsQ0FBQyxDQUFDO2FBQ0g7WUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDeEI7b0JBQ0MsSUFBSSxFQUFFLGtCQUFrQixDQUFDLHdCQUF3QjtvQkFDakQsTUFBTSxFQUFFLG1CQUFtQjtpQkFDM0I7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLGtCQUFrQixDQUFDLHdCQUF3QjtvQkFDakQsTUFBTSxFQUFFLE9BQU87aUJBQ2Y7YUFDRCxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RELElBQUksR0FBRztnQkFDTixLQUFLO2dCQUNMLFlBQVksRUFBRSw4REFBOEQ7Z0JBQzVFLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsU0FBUyxFQUFFLE9BQU87YUFDbEIsQ0FBQztTQUNGO1FBRUQsT0FBTztZQUNOLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSztZQUNMLEtBQUssRUFBRSxXQUFXO1lBQ2xCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLGlCQUFpQixVQUFVLElBQUksV0FBVyxpQkFBaUI7WUFDcEcsT0FBTztZQUNQLElBQUksRUFBRTtnQkFDTCxVQUFVLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtnQkFDM0MsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLFdBQVcsRUFBRSxFQUFFO2dCQUNmLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUNuQjtZQUNELFFBQVEsRUFBRSxRQUE4QjtZQUN4QyxlQUFlLEVBQUU7Z0JBQ2hCLE1BQU07Z0JBQ04sSUFBSTthQUNKO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxXQUFvQjtRQUNyRCxNQUFNLGFBQWEsR0FBdUI7WUFDekM7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFO29CQUNOLE9BQU8sRUFBRSxNQUFNO29CQUNmLGFBQWEsRUFBRSxRQUFRO29CQUN2QixLQUFLLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsd0JBQXdCO2dCQUNuRCxRQUFRLEVBQUU7b0JBQ1Q7d0JBQ0MsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLFVBQVU7d0JBQ25CLFFBQVEsRUFBRSxLQUFLO3FCQUNmO2lCQUNEO2FBQ0Q7WUFDRDtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsU0FBZ0M7Z0JBQzdDLEtBQUssRUFBRTtvQkFDTixPQUFPLEVBQUUsTUFBTTtvQkFDZixhQUFhLEVBQUUsUUFBUTtvQkFDdkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFdBQVcsRUFBRSxNQUFNO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsd0JBQXdCO2dCQUNuRCxRQUFRLEVBQUU7b0JBQ1Q7d0JBQ0MsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLFlBQVk7d0JBQ3JCLFFBQVEsRUFBRSxLQUFLO3FCQUNmO2lCQUNEO2FBQ0Q7U0FDRCxDQUFDO1FBRUYsSUFBSSxXQUFXLEVBQUU7WUFDaEIsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDbEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLFNBQWdDO2dCQUM3QyxLQUFLLEVBQUU7b0JBQ04sT0FBTyxFQUFFLE1BQU07b0JBQ2YsYUFBYSxFQUFFLFFBQVE7b0JBQ3ZCLEtBQUssRUFBRSxNQUFNO2lCQUNiO2dCQUNELE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyx1QkFBdUI7Z0JBQ2xELFFBQVEsRUFBRTtvQkFDVDt3QkFDQyxJQUFJLEVBQUUsTUFBTTt3QkFDWixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsUUFBUSxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0Q7YUFDRCxDQUFDLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUU7Z0JBQ04sVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLGFBQWEsRUFBRSxRQUFRO2FBQ3ZCO1lBQ0QsUUFBUSxFQUFFO2dCQUNUO29CQUNDLElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxPQUFPO29CQUNoQixLQUFLLEVBQUU7d0JBQ04sVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFFBQVEsRUFBRSxNQUFNO3dCQUNoQixTQUFTLEVBQUUsUUFBUTtxQkFDbkI7aUJBQ0Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJO29CQUNkLEtBQUssRUFBRTt3QkFDTixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGFBQWEsRUFBRSxNQUFNO3dCQUNyQixXQUFXLEVBQUUsTUFBTTt3QkFDbkIsWUFBWSxFQUFFLE1BQU07cUJBQ3BCO2lCQUNEO2dCQUNEO29CQUNDLElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUU7d0JBQ04sT0FBTyxFQUFFLE1BQU07d0JBQ2YsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLGNBQWMsRUFBRSxRQUFRO3dCQUN4QixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsYUFBYSxFQUFFLE1BQU07cUJBQ3JCO29CQUNELFFBQVEsRUFBRSxhQUFhO2lCQUN2QjthQUNEO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFFTywyQkFBMkI7UUFDbEMsT0FBTztZQUNOLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRTtnQkFDTixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsYUFBYSxFQUFFLFFBQVE7YUFDdkI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1Q7b0JBQ0MsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLE9BQU87b0JBQ2hCLEtBQUssRUFBRTt3QkFDTixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsUUFBUSxFQUFFLE1BQU07d0JBQ2hCLFNBQVMsRUFBRSxRQUFRO3FCQUNuQjtpQkFDRDtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsS0FBSyxFQUFFO3dCQUNOLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLFdBQVcsRUFBRSxNQUFNO3dCQUNuQixZQUFZLEVBQUUsTUFBTTtxQkFDcEI7aUJBQ0Q7YUFDRDtTQUNELENBQUM7SUFDSCxDQUFDOztBQTNkRDs7O0dBR0c7QUFDcUIsK0JBQVksR0FBRyxZQUFZLENBQUM7QUFFcEQ7OztHQUdHO0FBQ3FCLDJDQUF3QixHQUFHLGtCQUFrQixDQUFDO0FBRXRFOzs7R0FHRztBQUNxQiwyQ0FBd0IsR0FBRyxrQkFBa0IsQ0FBQztBQUV0RTs7O0dBR0c7QUFDcUIsMENBQXVCLEdBQUcsaUJBQWlCLENBQUM7QUFFcEU7OztHQUdHO0FBQ3FCLHlDQUFzQixHQUFHLGdCQUFnQixDQUFDO0FBRWxFOzs7R0FHRztBQUNxQiwyQ0FBd0IsR0FBRyxrQkFBa0IsQ0FBQzs7Ozs7OztTQ3ZEdkU7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040RDtBQUVyRCxNQUFNLFdBQVcsR0FBeUM7SUFDaEUsWUFBWSxFQUFFLElBQUkscUVBQWtCLEVBQUU7Q0FDdEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXVpZC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvd29ya3NwYWNlcy9pbnRlZ3JhdGlvbi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy93b3Jrc3BhY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHRjb25zdCBnZXRSYW5kb21IZXggPSAoYykgPT5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZSwgbm8tbWl4ZWQtb3BlcmF0b3JzXG5cdFx0KGMgXiAod2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChjIC8gNCkpKSkudG9TdHJpbmcoMTYpO1xuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRCdXR0b25TdHlsZSxcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFRlbXBsYXRlRnJhZ21lbnQsXG5cdFdvcmtzcGFjZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ29sb3JTY2hlbWVNb2RlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL3RoZW1lLXNoYXBlc1wiO1xuaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXVpZFwiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIHdvcmtzcGFjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VzUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZSB7XG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfUFJPVklERVJfSUQgPSBcIndvcmtzcGFjZXNcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGxhdW5jaGluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0xBVU5DSF9XT1JLU1BBQ0UgPSBcIkxhdW5jaCBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGRlbGV0aW5nIGEgd29ya3NwYWNlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fREVMRVRFX1dPUktTUEFDRSA9IFwiRGVsZXRlIFdvcmtzcGFjZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2hhcmluZyBhIHdvcmtzcGFjZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NIQVJFX1dPUktTUEFDRSA9IFwiU2hhcmUgV29ya3NwYWNlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzYXZpbmcgYSB3b3Jrc3BhY2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TQVZFX1dPUktTUEFDRSA9IFwiU2F2ZSBXb3Jrc3BhY2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGEgd29ya3NwYWNlIGV4aXN0cy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UgPSBcIldvcmtzcGFjZSBFeGlzdHNcIjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIldvcmtzcGFjZXNQcm92aWRlclwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cdFx0Y29uc3QgaWNvbkZvbGRlciA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50SWNvbkZvbGRlcigpO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0a2V5OiBgJHtXb3Jrc3BhY2VzUHJvdmlkZXIuX1BST1ZJREVSX0lEfS1oZWxwMWAsXG5cdFx0XHRcdHRpdGxlOiBcIldvcmtzcGFjZXNcIixcblx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRpY29uOiBgJHt0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMucm9vdFVybH0vY29tbW9uL2ljb25zLyR7aWNvbkZvbGRlcn0vJHtjb2xvclNjaGVtZX0vd29ya3NwYWNlcy5zdmdgLFxuXHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IFdvcmtzcGFjZXNQcm92aWRlci5fUFJPVklERVJfSURcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRcIldvcmtzcGFjZXNcIixcblx0XHRcdFx0XHRbXCJVc2UgdGhlIHdvcmtzcGFjZXMgY29tbWFuZCB0byBzYXZlIHlvdXIgY3VycmVudCBsYXlvdXQuXCJdLFxuXHRcdFx0XHRcdFtcIi93IHRpdGxlXCJdXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRjb25zdCB3b3Jrc3BhY2VzID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2VzKCk7XG5cdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXHRcdGNvbnN0IGljb25Gb2xkZXI6IHN0cmluZyA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50SWNvbkZvbGRlcigpO1xuXG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAocXVlcnlMb3dlci5zdGFydHNXaXRoKFwiL3cgXCIpKSB7XG5cdFx0XHRjb25zdCB0aXRsZSA9IHF1ZXJ5TG93ZXIucmVwbGFjZShcIi93IFwiLCBcIlwiKTtcblxuXHRcdFx0Y29uc3QgZm91bmRNYXRjaCA9IHdvcmtzcGFjZXMuZmluZCgoZW50cnkpID0+IGVudHJ5LnRpdGxlLnRvTG93ZXJDYXNlKCkgPT09IHRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0aWYgKGZvdW5kTWF0Y2gpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRyZXN1bHRzOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGtleTogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fRVhJU1RTX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IGBXb3Jrc3BhY2UgJHtmb3VuZE1hdGNoLnRpdGxlfSBhbHJlYWR5IGV4aXN0cy5gLFxuXHRcdFx0XHRcdFx0XHRpY29uOiBgJHt0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMucm9vdFVybH0vY29tbW9uL2ljb25zLyR7aWNvbkZvbGRlcn0vJHtjb2xvclNjaGVtZX0vd29ya3NwYWNlcy5zdmdgLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHByb3ZpZGVySWQ6IFdvcmtzcGFjZXNQcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdFx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdLFxuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZUlkOiBmb3VuZE1hdGNoLndvcmtzcGFjZUlkXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBudWxsLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IG51bGxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TQVZFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRcdHRpdGxlOiBgU2F2ZSBDdXJyZW50IFdvcmtzcGFjZSBhcyAke3RpdGxlfWAsXG5cdFx0XHRcdFx0XHRpY29uOiBgJHt0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMucm9vdFVybH0vY29tbW9uL2ljb25zLyR7aWNvbkZvbGRlcn0vJHtjb2xvclNjaGVtZX0vd29ya3NwYWNlcy5zdmdgLFxuXHRcdFx0XHRcdFx0bGFiZWw6IFwiU3VnZ2VzdGlvblwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uczogW3sgbmFtZTogXCJTYXZlIFdvcmtzcGFjZVwiLCBob3RrZXk6IFwiRW50ZXJcIiB9XSxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0cHJvdmlkZXJJZDogV29ya3NwYWNlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0XHRcdFx0dGFnczogW1wid29ya3NwYWNlXCJdLFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogcmFuZG9tVVVJRCgpLFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VUaXRsZTogdGl0bGVcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogbnVsbCxcblx0XHRcdFx0XHRcdHRlbXBsYXRlQ29udGVudDogbnVsbFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRsZXQgd29ya3NwYWNlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh3b3Jrc3BhY2VzKSkge1xuXHRcdFx0Y29uc3QgY3VycmVudFdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLmdldEN1cnJlbnRXb3Jrc3BhY2UoKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRXb3Jrc3BhY2VJZCA9IGN1cnJlbnRXb3Jrc3BhY2U/LndvcmtzcGFjZUlkO1xuXHRcdFx0Y29uc3Qgc2hhcmVFbmFibGVkOiBib29sZWFuID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbihcInNoYXJpbmdcIik7XG5cblx0XHRcdHdvcmtzcGFjZVJlc3VsdHMgPSB3b3Jrc3BhY2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHBnKSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8XG5cdFx0XHRcdFx0XHQocXVlcnkubGVuZ3RoID49IG9wdGlvbnMucXVlcnlNaW5MZW5ndGggJiYgcGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeUxvd2VyKSlcblx0XHRcdFx0KVxuXHRcdFx0XHQubWFwKCh3czogV29ya3NwYWNlKSA9PlxuXHRcdFx0XHRcdHRoaXMuZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHR3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdHdzLnRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0Y3VycmVudFdvcmtzcGFjZUlkID09PSB3cy53b3Jrc3BhY2VJZCxcblx0XHRcdFx0XHRcdGljb25Gb2xkZXIsXG5cdFx0XHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogd29ya3NwYWNlUmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdHdvcmtzcGFjZUlkPzogc3RyaW5nO1xuXHRcdFx0XHR3b3Jrc3BhY2VUaXRsZT86IHN0cmluZztcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXHRcdFx0Y29uc3QgaWNvbkZvbGRlcjogc3RyaW5nID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRJY29uRm9sZGVyKCk7XG5cdFx0XHRjb25zdCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblxuXHRcdFx0aWYgKGRhdGE/LndvcmtzcGFjZUlkKSB7XG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChyZXN1bHQua2V5ID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TQVZFX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGxhc3RSZXNwb25zZS5yZXZva2UocmVzdWx0LmtleSk7XG5cblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgcGxhdGZvcm0uZ2V0U25hcHNob3QoKTtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50V29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uZ2V0Q3VycmVudFdvcmtzcGFjZSgpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRNZXRhRGF0YSA9IGN1cnJlbnRXb3Jrc3BhY2U/Lm1ldGFkYXRhO1xuXG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlID0ge1xuXHRcdFx0XHRcdFx0d29ya3NwYWNlSWQ6IGRhdGEud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHR0aXRsZTogZGF0YS53b3Jrc3BhY2VUaXRsZSxcblx0XHRcdFx0XHRcdG1ldGFkYXRhOiBjdXJyZW50TWV0YURhdGEsXG5cdFx0XHRcdFx0XHRzbmFwc2hvdFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5zYXZlV29ya3NwYWNlKHdvcmtzcGFjZSk7XG5cblx0XHRcdFx0XHRjb25zdCBzYXZlZFRlbXBsYXRlID0gdGhpcy5nZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRcdFx0XHRcdGRhdGEud29ya3NwYWNlSWQsXG5cdFx0XHRcdFx0XHRkYXRhLndvcmtzcGFjZVRpdGxlLFxuXHRcdFx0XHRcdFx0c2hhcmVFbmFibGVkLFxuXHRcdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdGljb25Gb2xkZXIsXG5cdFx0XHRcdFx0XHRjb2xvclNjaGVtZVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRsYXN0UmVzcG9uc2UucmVzcG9uZChbc2F2ZWRUZW1wbGF0ZV0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5rZXkgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0VYSVNUU19XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRsYXN0UmVzcG9uc2UucmV2b2tlKHJlc3VsdC5rZXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdGxhc3RSZXNwb25zZS5yZXZva2UocmVzdWx0LmtleSk7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRjb25zdCB3b3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFdvcmtzcGFjZShkYXRhLndvcmtzcGFjZUlkKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5hcHBseVdvcmtzcGFjZSh3b3Jrc3BhY2UpO1xuXG5cdFx0XHRcdFx0Y29uc3Qgc2F2ZWRUZW1wbGF0ZSA9IHRoaXMuZ2V0V29ya3NwYWNlVGVtcGxhdGUoXG5cdFx0XHRcdFx0XHRkYXRhLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0ZGF0YS53b3Jrc3BhY2VUaXRsZSxcblx0XHRcdFx0XHRcdHNoYXJlRW5hYmxlZCxcblx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRpY29uRm9sZGVyLFxuXHRcdFx0XHRcdFx0Y29sb3JTY2hlbWVcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0bGFzdFJlc3BvbnNlLnJlc3BvbmQoW3NhdmVkVGVtcGxhdGVdKTtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlV29ya3NwYWNlKGRhdGEud29ya3NwYWNlSWQpO1xuXHRcdFx0XHRcdGxhc3RSZXNwb25zZS5yZXZva2UocmVzdWx0LmtleSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc2hhcmUoeyB3b3Jrc3BhY2VJZDogZGF0YS53b3Jrc3BhY2VJZCB9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRoYW5kbGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oYFVucmVjb2duaXplZCBhY3Rpb24gZm9yIHdvcmtzcGFjZSBzZWxlY3Rpb246ICR7ZGF0YS53b3Jrc3BhY2VJZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRXb3Jrc3BhY2VUZW1wbGF0ZShcblx0XHRpZDogc3RyaW5nLFxuXHRcdHRpdGxlOiBzdHJpbmcsXG5cdFx0c2hhcmVFbmFibGVkOiBib29sZWFuLFxuXHRcdGlzQ3VycmVudDogYm9vbGVhbixcblx0XHRpY29uRm9sZGVyOiBzdHJpbmcsXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBIb21lU2VhcmNoUmVzdWx0IHtcblx0XHRsZXQgYWN0aW9ucyA9IFtdO1xuXHRcdGxldCBsYXlvdXQ7XG5cdFx0bGV0IGRhdGE7XG5cblx0XHRpZiAoaXNDdXJyZW50KSB7XG5cdFx0XHRsYXlvdXQgPSB0aGlzLmdldEN1cnJlbnRXb3Jrc3BhY2VUZW1wbGF0ZSgpO1xuXHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGluc3RydWN0aW9uczpcblx0XHRcdFx0XHRcIlRoaXMgaXMgdGhlIGN1cnJlbnRseSBhY3RpdmUgd29ya3NwYWNlLiBZb3UgY2FuIHVzZSB0aGUgQnJvd3NlciBtZW51IHRvIHVwZGF0ZS9yZW5hbWUgdGhpcyB3b3Jrc3BhY2VcIlxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHNoYXJlRW5hYmxlZCkge1xuXHRcdFx0XHRhY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1dPUktTUEFDRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJDbWRPckN0cmwrU2hpZnQrRFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBXb3Jrc3BhY2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfV09SS1NQQUNFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJFbnRlclwiXG5cdFx0XHRcdH1cblx0XHRcdF0pO1xuXHRcdFx0bGF5b3V0ID0gdGhpcy5nZXRPdGhlcldvcmtzcGFjZVRlbXBsYXRlKHNoYXJlRW5hYmxlZCk7XG5cdFx0XHRkYXRhID0ge1xuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0aW5zdHJ1Y3Rpb25zOiBcIlVzZSB0aGUgYnV0dG9ucyBiZWxvdyB0byBpbnRlcmFjdCB3aXRoIHlvdXIgc2F2ZWQgV29ya3NwYWNlOlwiLFxuXHRcdFx0XHRvcGVuVGV4dDogXCJMYXVuY2hcIixcblx0XHRcdFx0ZGVsZXRlVGV4dDogXCJEZWxldGVcIixcblx0XHRcdFx0c2hhcmVUZXh0OiBcIlNoYXJlXCJcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogaWQsXG5cdFx0XHR0aXRsZSxcblx0XHRcdGxhYmVsOiBcIldvcmtzcGFjZVwiLFxuXHRcdFx0aWNvbjogYCR7dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnJvb3RVcmx9L2NvbW1vbi9pY29ucy8ke2ljb25Gb2xkZXJ9LyR7Y29sb3JTY2hlbWV9L3dvcmtzcGFjZXMuc3ZnYCxcblx0XHRcdGFjdGlvbnMsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IFdvcmtzcGFjZXNQcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdHdvcmtzcGFjZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0d29ya3NwYWNlSWQ6IGlkLFxuXHRcdFx0XHR0YWdzOiBbXCJ3b3Jrc3BhY2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0bGF5b3V0LFxuXHRcdFx0XHRkYXRhXG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0T3RoZXJXb3Jrc3BhY2VUZW1wbGF0ZShlbmFibGVTaGFyZTogYm9vbGVhbik6IFRlbXBsYXRlRnJhZ21lbnQge1xuXHRcdGNvbnN0IGFjdGlvbkJ1dHRvbnM6IFRlbXBsYXRlRnJhZ21lbnRbXSA9IFtcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogXCJCdXR0b25cIixcblx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0XHRmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuXHRcdFx0XHRcdHdpZHRoOiBcIjgwcHhcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9XT1JLU1BBQ0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcIm9wZW5UZXh0XCIsXG5cdFx0XHRcdFx0XHRvcHRpb25hbDogZmFsc2Vcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGJ1dHRvblN0eWxlOiBcInByaW1hcnlcIiBhcyBCdXR0b25TdHlsZS5QcmltYXJ5LFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0d2lkdGg6IFwiODBweFwiLFxuXHRcdFx0XHRcdG1hcmdpbkxlZnQ6IFwiMTBweFwiLFxuXHRcdFx0XHRcdG1hcmdpblJpZ2h0OiBcIjEwcHhcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhY3Rpb246IFdvcmtzcGFjZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9XT1JLU1BBQ0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcImRlbGV0ZVRleHRcIixcblx0XHRcdFx0XHRcdG9wdGlvbmFsOiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRpZiAoZW5hYmxlU2hhcmUpIHtcblx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGJ1dHRvblN0eWxlOiBcInByaW1hcnlcIiBhcyBCdXR0b25TdHlsZS5QcmltYXJ5LFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0d2lkdGg6IFwiODBweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjdGlvbjogV29ya3NwYWNlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfV09SS1NQQUNFLFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0ZGF0YUtleTogXCJzaGFyZVRleHRcIixcblx0XHRcdFx0XHRcdG9wdGlvbmFsOiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRwYWRkaW5nVG9wOiBcIjEwcHhcIixcblx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCJcblx0XHRcdH0sXG5cdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJ0aXRsZVwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIixcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjE2cHhcIixcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdGRhdGFLZXk6IFwiaW5zdHJ1Y3Rpb25zXCIsXG5cdFx0XHRcdFx0b3B0aW9uYWw6IHRydWUsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1RvcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdMZWZ0OiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdSaWdodDogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIkNvbnRhaW5lclwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0XHRcdGZsZXhGbG93OiBcInJvdyB3cmFwXCIsXG5cdFx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdUb3A6IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ0JvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBhY3Rpb25CdXR0b25zXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRDdXJyZW50V29ya3NwYWNlVGVtcGxhdGUoKTogVGVtcGxhdGVGcmFnbWVudCB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRwYWRkaW5nVG9wOiBcIjEwcHhcIixcblx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCJcblx0XHRcdH0sXG5cdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJ0aXRsZVwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIixcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjE2cHhcIixcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdGRhdGFLZXk6IFwiaW5zdHJ1Y3Rpb25zXCIsXG5cdFx0XHRcdFx0b3B0aW9uYWw6IHRydWUsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1RvcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdMZWZ0OiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdSaWdodDogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFdvcmtzcGFjZXNQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IFdvcmtzcGFjZXNQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBXb3Jrc3BhY2VzUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==