/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/about/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/about/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutActions: () => (/* binding */ AboutActions)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/**
 * Implement the actions.
 */
class AboutActions {
    /**
     * Create a new instance of AccountActions.
     * @param sharedState The shared state data.
     */
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("AboutAction");
        this._helpers = helpers;
        this._definition = definition;
        this._sharedState.aboutWindow = await this.getAboutWindow();
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["show-about"] = async (payload) => {
            if (payload.callerType === this._helpers?.callerTypes.GlobalContextMenu &&
                !Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._sharedState?.aboutWindow)) {
                const aboutWindow = fin.Window.wrapSync({
                    uuid: fin.me.identity.uuid,
                    name: this._sharedState.aboutWindow.name
                });
                let windowExists = false;
                try {
                    await aboutWindow.getInfo();
                    windowExists = true;
                }
                catch {
                    this._logger?.info("Cannot see existing about window. Will create an about window.");
                }
                if (windowExists) {
                    await aboutWindow.setAsForeground();
                }
                else {
                    try {
                        await fin.Window.create(this._sharedState.aboutWindow);
                    }
                    catch (error) {
                        this._logger?.error("Error launching show about action window.", error);
                    }
                }
            }
        };
        return actionMap;
    }
    /**
     * Gets about window options enriched with VersionInfo.
     * @returns The window options to show.
     */
    async getAboutWindow() {
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._definition?.data?.windowOptions)) {
            this._logger?.info("No about window configuration provided.");
            return;
        }
        const validatedWindowOptions = {
            ...this._definition?.data?.windowOptions
        };
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(validatedWindowOptions.url)) {
            this._logger?.error("An about version window configuration was set but a url was not provided. A window cannot be launched.");
            return undefined;
        }
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(validatedWindowOptions.name)) {
            validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning-about`;
        }
        if (this._helpers?.getVersionInfo) {
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(validatedWindowOptions?.customData?.versionInfo)) {
                this._logger?.info("Enriching customData versionInfo provided by about version window configuration.");
                validatedWindowOptions.customData.versionInfo = {
                    ...validatedWindowOptions.customData.versionInfo,
                    ...(await this._helpers.getVersionInfo())
                };
            }
            else {
                this._logger?.info("Setting customData versionInfo for about version window configuration.");
                if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(validatedWindowOptions.customData)) {
                    validatedWindowOptions.customData = {};
                }
                validatedWindowOptions.customData.versionInfo = await this._helpers.getVersionInfo();
            }
        }
        this._logger?.info("Returning about version window configuration.");
        return validatedWindowOptions;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/about/conditions.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/composite/about/conditions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutConditions: () => (/* binding */ AboutConditions)
/* harmony export */ });
/**
 * Implement the conditions.
 */
class AboutConditions {
    /**
     * Create a new instance of AboutConditions.
     * @param sharedState The shared state data.
     */
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator) {
        this._logger = loggerCreator("AboutCondition");
        this._definition = definition;
        this._logger.info("Condition Initialized");
    }
    /**
     * Get the conditions from the module.
     * @returns Map of the conditions from the module.
     */
    async get() {
        const conditionMap = {};
        conditionMap["has-about"] = async () => !isEmpty(this._sharedState.aboutWindow);
        return conditionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/about/integration.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/composite/about/integration.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutProvider: () => (/* binding */ AboutProvider)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/**
 * Implement the integration provider for about info.
 */
class AboutProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._integrationHelpers = helpers;
        this._definition = definition;
        this._versionTypeMap = definition?.data?.versionTypeMap ?? {};
        this._excludeVersionType = definition?.data?.excludeVersionType ?? [];
        this._logger = loggerCreator("AboutProvider");
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        if (this._integrationHelpers) {
            return [
                {
                    key: `${AboutProvider._PROVIDER_ID}-help`,
                    title: AboutProvider._ABOUT_COMMAND,
                    label: "Help",
                    icon: this._definition?.icon,
                    actions: [],
                    data: {
                        providerId: AboutProvider._PROVIDER_ID,
                        populateQuery: AboutProvider._ABOUT_COMMAND
                    },
                    template: "Custom",
                    templateContent: await this._integrationHelpers.templateHelpers.createHelp(AboutProvider._ABOUT_COMMAND, ["The about command lists the version information related to this platform."], [AboutProvider._ABOUT_COMMAND])
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
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        if (query.length < 2 || !AboutProvider._ABOUT_COMMAND.startsWith(query)) {
            return {
                results: []
            };
        }
        if (this._integrationHelpers?.getVersionInfo) {
            const palette = await this._integrationHelpers.getCurrentPalette();
            const versionInfo = await this._integrationHelpers.getVersionInfo();
            const actions = [];
            const data = {};
            const tableData = [];
            tableData.push(["Version Type", "Version"]);
            if (versionInfo && this._versionTypeMap && this._excludeVersionType) {
                const keys = Object.keys(versionInfo);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const versionForKey = versionInfo[key];
                    if (!this._excludeVersionType.includes(key) && versionForKey) {
                        const label = this._versionTypeMap[key] ?? key;
                        tableData.push([label, (versionForKey ?? "unknown")]);
                    }
                }
            }
            data.title = this._definition?.data?.title ?? "Versions";
            const children = [];
            const titleFragment = (await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
                marginBottom: "10px",
                borderBottom: `1px solid ${palette.background6}`
            }));
            children.push(titleFragment);
            const desc = this._definition?.data?.description;
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(desc)) {
                data.description = desc;
                const descriptionFragment = (await this._integrationHelpers.templateHelpers.createText("description", undefined, {
                    marginBottom: "10px"
                }));
                children.push(descriptionFragment);
            }
            const tableFragment = (await this._integrationHelpers.templateHelpers.createTable(tableData, [], 0, data));
            children.push(tableFragment);
            const result = {
                key: "about-info",
                title: AboutProvider._ABOUT_COMMAND,
                label: "Version",
                icon: this._definition?.icon,
                actions,
                data: {
                    providerId: AboutProvider._PROVIDER_ID
                },
                template: "Custom",
                templateContent: {
                    layout: await this._integrationHelpers.templateHelpers.createContainer("column", children, {
                        padding: "10px"
                    }),
                    data
                }
            };
            return {
                results: [result]
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
        return true;
    }
}
/**
 * Provider id.
 * @internal
 */
AboutProvider._PROVIDER_ID = "about";
/**
 * The command to display the about information.
 * @internal
 */
AboutProvider._ABOUT_COMMAND = "/about";


/***/ }),

/***/ "./client/src/modules/composite/about/menus.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/about/menus.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutMenus: () => (/* binding */ AboutMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class AboutMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperMenus");
        this._settings = definition.data;
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     * @returns The menu entries.
     */
    async get(menuType, platform) {
        if (menuType === "global") {
            return [
                {
                    label: this._settings?.entries?.about?.label ?? "About",
                    data: {
                        type: "Custom",
                        action: {
                            id: "show-about"
                        }
                    },
                    position: this._settings?.entries?.about?.position ?? {
                        type: "Quit",
                        operation: "before"
                    },
                    conditions: ["has-about"]
                }
            ];
        }
    }
}


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
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/about/index.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/about/actions.ts");
/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conditions */ "./client/src/modules/composite/about/conditions.ts");
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integration */ "./client/src/modules/composite/about/integration.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/about/menus.ts");




const sharedState = {};
const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_2__.AboutProvider(),
    conditions: new _conditions__WEBPACK_IMPORTED_MODULE_1__.AboutConditions(sharedState),
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.AboutActions(sharedState),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_3__.AboutMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsV0FBVyxDQUFDO2lCQUN6QjthQUNELENBQUM7U0FDRjtJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzlERDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHlDO0FBQ007QUFDRDtBQUNUO0FBR3JDLE1BQU0sV0FBVyxHQUFnQixFQUFFLENBQUM7QUFDN0IsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFlBQVksRUFBRSxJQUFJLHVEQUFhLEVBQUU7SUFDakMsVUFBVSxFQUFFLElBQUksd0RBQWUsQ0FBQyxXQUFXLENBQUM7SUFDNUMsT0FBTyxFQUFFLElBQUksa0RBQVksQ0FBQyxXQUFXLENBQUM7SUFDdEMsS0FBSyxFQUFFLElBQUksOENBQVUsRUFBRTtDQUN2QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvYWJvdXQvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgQWN0aW9uSGVscGVycywgQWN0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRBY3Rpb25TZXR0aW5ncywgU2hhcmVkU3RhdGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVycz86IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGFjdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0QWN0aW9uU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcmVkIHN0YXRlIHBhc3NlZCB0byB0aGVzZSBpbXBsZW1lbnRhdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGU7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBY2NvdW50QWN0aW9ucy5cblx0ICogQHBhcmFtIHNoYXJlZFN0YXRlIFRoZSBzaGFyZWQgc3RhdGUgZGF0YS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSkge1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlID0gc2hhcmVkU3RhdGU7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dEFjdGlvblNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFib3V0QWN0aW9uXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93ID0gYXdhaXQgdGhpcy5nZXRBYm91dFdpbmRvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcInNob3ctYWJvdXRcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnM/LmNhbGxlclR5cGVzLkdsb2JhbENvbnRleHRNZW51ICYmXG5cdFx0XHRcdCFpc0VtcHR5KHRoaXMuX3NoYXJlZFN0YXRlPy5hYm91dFdpbmRvdylcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBhYm91dFdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMoe1xuXHRcdFx0XHRcdHV1aWQ6IGZpbi5tZS5pZGVudGl0eS51dWlkLFxuXHRcdFx0XHRcdG5hbWU6IHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93Lm5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGxldCB3aW5kb3dFeGlzdHMgPSBmYWxzZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBhYm91dFdpbmRvdy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0d2luZG93RXhpc3RzID0gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2Fubm90IHNlZSBleGlzdGluZyBhYm91dCB3aW5kb3cuIFdpbGwgY3JlYXRlIGFuIGFib3V0IHdpbmRvdy5cIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAod2luZG93RXhpc3RzKSB7XG5cdFx0XHRcdFx0YXdhaXQgYWJvdXRXaW5kb3cuc2V0QXNGb3JlZ3JvdW5kKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93KTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIkVycm9yIGxhdW5jaGluZyBzaG93IGFib3V0IGFjdGlvbiB3aW5kb3cuXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGFib3V0IHdpbmRvdyBvcHRpb25zIGVucmljaGVkIHdpdGggVmVyc2lvbkluZm8uXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgb3B0aW9ucyB0byBzaG93LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRBYm91dFdpbmRvdygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93T3B0aW9ucyB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LndpbmRvd09wdGlvbnMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJObyBhYm91dCB3aW5kb3cgY29uZmlndXJhdGlvbiBwcm92aWRlZC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmFsaWRhdGVkV2luZG93T3B0aW9uczogUGFydGlhbDxPcGVuRmluLldpbmRvd09wdGlvbnM+ID0ge1xuXHRcdFx0Li4udGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ud2luZG93T3B0aW9uc1xuXHRcdH07XG5cblx0XHRpZiAoaXNFbXB0eSh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLnVybCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFwiQW4gYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbiB3YXMgc2V0IGJ1dCBhIHVybCB3YXMgbm90IHByb3ZpZGVkLiBBIHdpbmRvdyBjYW5ub3QgYmUgbGF1bmNoZWQuXCJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoaXNFbXB0eSh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUpKSB7XG5cdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tdmVyc2lvbmluZy1hYm91dGA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2hlbHBlcnM/LmdldFZlcnNpb25JbmZvKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucz8uY3VzdG9tRGF0YT8udmVyc2lvbkluZm8pKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcIkVucmljaGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIHByb3ZpZGVkIGJ5IGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24uXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhLnZlcnNpb25JbmZvID0ge1xuXHRcdFx0XHRcdC4uLnZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyxcblx0XHRcdFx0XHQuLi4oYXdhaXQgdGhpcy5faGVscGVycy5nZXRWZXJzaW9uSW5mbygpKVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiU2V0dGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIGZvciBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uLlwiKTtcblx0XHRcdFx0aWYgKGlzRW1wdHkodmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZXR1cm5pbmcgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFdpbmRvd09wdGlvbnMgYXMgT3BlbkZpbi5XaW5kb3dPcHRpb25zO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IENvbmRpdGlvbk1hcCwgQ29uZGl0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvY29uZGl0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgU2hhcmVkU3RhdGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbi8qKlxuICogSW1wbGVtZW50IHRoZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRDb25kaXRpb25zIGltcGxlbWVudHMgQ29uZGl0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBjb25kaXRpb25zLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzaGFyZWQgc3RhdGUgcGFzc2VkIHRvIHRoZXNlIGltcGxlbWVudGF0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX3NoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEFib3V0Q29uZGl0aW9ucy5cblx0ICogQHBhcmFtIHNoYXJlZFN0YXRlIFRoZSBzaGFyZWQgc3RhdGUgZGF0YS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSkge1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlID0gc2hhcmVkU3RhdGU7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dENvbmRpdGlvblwiKTtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkNvbmRpdGlvbiBJbml0aWFsaXplZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBNYXAgb2YgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPENvbmRpdGlvbk1hcD4ge1xuXHRcdGNvbnN0IGNvbmRpdGlvbk1hcDogQ29uZGl0aW9uTWFwID0ge307XG5cblx0XHRjb25kaXRpb25NYXBbXCJoYXMtYWJvdXRcIl0gPSBhc3luYyAoKTogUHJvbWlzZTxib29sZWFuPiA9PiAhaXNFbXB0eSh0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyk7XG5cblx0XHRyZXR1cm4gY29uZGl0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVBY3Rpb24sXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0LFxuXHRUZW1wbGF0ZUZyYWdtZW50XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IHR5cGUgVmVyc2lvbkluZm8gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3ZlcnNpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFib3V0UHJvdmlkZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIGFib3V0IGluZm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8dW5rbm93bj4ge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJhYm91dFwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29tbWFuZCB0byBkaXNwbGF5IHRoZSBhYm91dCBpbmZvcm1hdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUJPVVRfQ09NTUFORCA9IFwiL2Fib3V0XCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRQcm92aWRlclNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogUHJvdmlkZWQgYWx0ZXJuYXRlIGxhYmVscyBmb3IgdGhlIHZlcnNpb24gdHlwZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF92ZXJzaW9uVHlwZU1hcD86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVkIGFsdGVybmF0ZSBsYWJlbHMgZm9yIHRoZSB2ZXJzaW9uIHR5cGVzXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZXhjbHVkZVZlcnNpb25UeXBlPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRQcm92aWRlclNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX3ZlcnNpb25UeXBlTWFwID0gZGVmaW5pdGlvbj8uZGF0YT8udmVyc2lvblR5cGVNYXAgPz8ge307XG5cdFx0dGhpcy5fZXhjbHVkZVZlcnNpb25UeXBlID0gZGVmaW5pdGlvbj8uZGF0YT8uZXhjbHVkZVZlcnNpb25UeXBlID8/IFtdO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dFByb3ZpZGVyXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6IGAke0Fib3V0UHJvdmlkZXIuX1BST1ZJREVSX0lEfS1oZWxwYCxcblx0XHRcdFx0XHR0aXRsZTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0XHRsYWJlbDogXCJIZWxwXCIsXG5cdFx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRwcm92aWRlcklkOiBBYm91dFByb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0XHRcdHBvcHVsYXRlUXVlcnk6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRcdEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQsXG5cdFx0XHRcdFx0XHRbXCJUaGUgYWJvdXQgY29tbWFuZCBsaXN0cyB0aGUgdmVyc2lvbiBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoaXMgcGxhdGZvcm0uXCJdLFxuXHRcdFx0XHRcdFx0W0Fib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRdXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH1cblxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHBhcmFtIG9wdGlvbnMucXVlcnlNaW5MZW5ndGggVGhlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBhIHF1ZXJ5IGlzIGFjdGlvbmVkLlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeUFnYWluc3QgVGhlIGZpZWxkcyBpbiB0aGUgZGF0YSB0byBxdWVyeSBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHF1ZXJ5Lmxlbmd0aCA8IDIgfHwgIUFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQuc3RhcnRzV2l0aChxdWVyeSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFZlcnNpb25JbmZvKSB7XG5cdFx0XHRjb25zdCBwYWxldHRlID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRQYWxldHRlKCk7XG5cblx0XHRcdGNvbnN0IHZlcnNpb25JbmZvID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFZlcnNpb25JbmZvKCk7XG5cblx0XHRcdGNvbnN0IGFjdGlvbnM6IEhvbWVBY3Rpb25bXSA9IFtdO1xuXG5cdFx0XHRjb25zdCBkYXRhOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuXHRcdFx0Y29uc3QgdGFibGVEYXRhOiBzdHJpbmdbXVtdID0gW107XG5cdFx0XHR0YWJsZURhdGEucHVzaChbXCJWZXJzaW9uIFR5cGVcIiwgXCJWZXJzaW9uXCJdKTtcblxuXHRcdFx0aWYgKHZlcnNpb25JbmZvICYmIHRoaXMuX3ZlcnNpb25UeXBlTWFwICYmIHRoaXMuX2V4Y2x1ZGVWZXJzaW9uVHlwZSkge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmVyc2lvbkluZm8pO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0Y29uc3QgdmVyc2lvbkZvcktleSA9IHZlcnNpb25JbmZvW2tleSBhcyBrZXlvZiBWZXJzaW9uSW5mb107XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9leGNsdWRlVmVyc2lvblR5cGUuaW5jbHVkZXMoa2V5KSAmJiB2ZXJzaW9uRm9yS2V5KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYWJlbCA9IHRoaXMuX3ZlcnNpb25UeXBlTWFwW2tleV0gPz8ga2V5O1xuXHRcdFx0XHRcdFx0dGFibGVEYXRhLnB1c2goW2xhYmVsLCAodmVyc2lvbkZvcktleSA/PyBcInVua25vd25cIikgYXMgc3RyaW5nXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGRhdGEudGl0bGUgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy50aXRsZSA/PyBcIlZlcnNpb25zXCI7XG5cblx0XHRcdGNvbnN0IGNoaWxkcmVuOiBUZW1wbGF0ZUZyYWdtZW50W10gPSBbXTtcblx0XHRcdGNvbnN0IHRpdGxlRnJhZ21lbnQgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUaXRsZShcblx0XHRcdFx0XCJ0aXRsZVwiLFxuXHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG5cdFx0XHRcdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7cGFsZXR0ZS5iYWNrZ3JvdW5kNn1gXG5cdFx0XHRcdH1cblx0XHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cblx0XHRcdGNoaWxkcmVuLnB1c2godGl0bGVGcmFnbWVudCk7XG5cblx0XHRcdGNvbnN0IGRlc2MgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5kZXNjcmlwdGlvbjtcblx0XHRcdGlmICghaXNFbXB0eShkZXNjKSkge1xuXHRcdFx0XHRkYXRhLmRlc2NyaXB0aW9uID0gZGVzYztcblx0XHRcdFx0Y29uc3QgZGVzY3JpcHRpb25GcmFnbWVudCA9IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXG5cdFx0XHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpKSBhcyBUZW1wbGF0ZUZyYWdtZW50O1xuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGRlc2NyaXB0aW9uRnJhZ21lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB0YWJsZUZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGFibGUoXG5cdFx0XHRcdHRhYmxlRGF0YSxcblx0XHRcdFx0W10sXG5cdFx0XHRcdDAsXG5cdFx0XHRcdGRhdGFcblx0XHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cblx0XHRcdGNoaWxkcmVuLnB1c2godGFibGVGcmFnbWVudCk7XG5cblx0XHRcdGNvbnN0IHJlc3VsdDogSG9tZVNlYXJjaFJlc3VsdCA9IHtcblx0XHRcdFx0a2V5OiBcImFib3V0LWluZm9cIixcblx0XHRcdFx0dGl0bGU6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQsXG5cdFx0XHRcdGxhYmVsOiBcIlZlcnNpb25cIixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0YWN0aW9ucyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IEFib3V0UHJvdmlkZXIuX1BST1ZJREVSX0lEXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdFx0bGF5b3V0OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUNvbnRhaW5lcihcImNvbHVtblwiLCBjaGlsZHJlbiwge1xuXHRcdFx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCJcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtyZXN1bHRdXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgTWVudXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRNZW51c1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0TWVudXMgaW1wbGVtZW50cyBNZW51czxBYm91dE1lbnVzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5ncz86IEFib3V0TWVudXNTZXR0aW5ncztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dE1lbnVzU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRGV2ZWxvcGVyTWVudXNcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHJldHVybnMgVGhlIG1lbnUgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQobWVudVR5cGU6IE1lbnVUeXBlLCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPE1lbnVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKG1lbnVUeXBlID09PSBcImdsb2JhbFwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5lbnRyaWVzPy5hYm91dD8ubGFiZWwgPz8gXCJBYm91dFwiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwic2hvdy1hYm91dFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjogdGhpcy5fc2V0dGluZ3M/LmVudHJpZXM/LmFib3V0Py5wb3NpdGlvbiA/PyB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIlF1aXRcIixcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y29uZGl0aW9uczogW1wiaGFzLWFib3V0XCJdXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBBYm91dEFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBBYm91dENvbmRpdGlvbnMgfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XG5pbXBvcnQgeyBBYm91dFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcbmltcG9ydCB7IEFib3V0TWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuaW1wb3J0IHR5cGUgeyBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5jb25zdCBzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUgPSB7fTtcbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBYm91dFByb3ZpZGVyKCksXG5cdGNvbmRpdGlvbnM6IG5ldyBBYm91dENvbmRpdGlvbnMoc2hhcmVkU3RhdGUpLFxuXHRhY3Rpb25zOiBuZXcgQWJvdXRBY3Rpb25zKHNoYXJlZFN0YXRlKSxcblx0bWVudXM6IG5ldyBBYm91dE1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=