/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/about/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/about/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutActions": () => (/* binding */ AboutActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class AboutActions {
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("AboutAction");
        this._helpers = helpers;
        this._definition = definition;
        this._sharedState.aboutWindow = await this.getAboutWindow();
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["show-about"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu &&
                this._sharedState?.aboutWindow !== undefined) {
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
                    this._logger.info("Cannot see existing about window. Will create an about window.");
                }
                if (windowExists) {
                    await aboutWindow.setAsForeground();
                }
                else {
                    try {
                        await fin.Window.create(this._sharedState.aboutWindow);
                    }
                    catch (error) {
                        this._logger.error("Error launching show about action window.", error);
                    }
                }
            }
        };
        return actionMap;
    }
    /** Gets about window options enriched with VersionInfo */
    async getAboutWindow() {
        if (this._definition?.data?.windowOptions === undefined) {
            this._logger.info("No about window configuration provided.");
            return undefined;
        }
        const validatedWindowOptions = {
            ...this._definition.data.windowOptions
        };
        if (validatedWindowOptions.url === undefined) {
            this._logger.error("An about version window configuration was set but a url was not provided. A window cannot be launched.");
            return undefined;
        }
        if (validatedWindowOptions.name === undefined) {
            validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning-about`;
        }
        if (validatedWindowOptions?.customData?.versionInfo !== undefined) {
            this._logger.info("Enriching customData versionInfo provided by about version window configuration.");
            validatedWindowOptions.customData.versionInfo = {
                ...validatedWindowOptions.customData.versionInfo,
                ...(await this._helpers.getVersionInfo())
            };
        }
        else {
            this._logger.info("Setting customData versionInfo for about version window configuration.");
            if (validatedWindowOptions.customData === undefined) {
                validatedWindowOptions.customData = {};
            }
            validatedWindowOptions.customData.versionInfo = await this._helpers.getVersionInfo();
        }
        this._logger.info("Returning about version window configuration.");
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
/* harmony export */   "AboutConditions": () => (/* binding */ AboutConditions)
/* harmony export */ });
/**
 * Implement the conditions.
 */
class AboutConditions {
    constructor(sharedState) {
        this._sharedState = sharedState;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @returns Nothing.
     */
    async initialize(definition, createLogger) {
        this._logger = createLogger("AboutCondition");
        this._definition = definition;
        this._logger.info("Condition Initialized");
    }
    /**
     * Get the conditions from the module.
     */
    async get() {
        const conditionMap = {};
        conditionMap["has-about"] = async () => this._sharedState.aboutWindow !== undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
/* harmony export */   "AboutProvider": () => (/* binding */ AboutProvider)
/* harmony export */ });
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
    /**
     * Get a list of search results based on the query and filters.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @param options Options for the search query.
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        if (query.length < 2 || !AboutProvider._ABOUT_COMMAND.startsWith(query)) {
            return {
                results: []
            };
        }
        const palette = await this._integrationHelpers.getCurrentPalette();
        const versionInfo = await this._integrationHelpers.getVersionInfo();
        const actions = [];
        const data = {};
        const tableData = [];
        tableData.push(["Version Type", "Version"]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const keys = Object.keys(versionInfo);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!this._excludeVersionType.includes(key)) {
                const label = this._versionTypeMap[key] ?? keys[i];
                tableData.push([label, (versionInfo[keys[i]] ?? "unknown")]);
            }
        }
        data.title = this._definition?.data?.title ?? "Versions";
        const children = [];
        const titleFragment = (await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
            marginBottom: "10px",
            borderBottom: `1px solid ${palette.background6}`
        }));
        children.push(titleFragment);
        if (this._definition?.data?.description !== undefined) {
            data.description = this._definition.data.description;
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
/* harmony export */   "AboutMenus": () => (/* binding */ AboutMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class AboutMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("DeveloperMenus");
        this._settings = definition.data;
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQzVFLFlBQVksRUFBRSxJQUFJLHVEQUFhLEVBQUU7SUFDakMsVUFBVSxFQUFFLElBQUksd0RBQWUsQ0FBQyxXQUFXLENBQUM7SUFDNUMsT0FBTyxFQUFFLElBQUksa0RBQVksQ0FBQyxXQUFXLENBQUM7SUFDdEMsS0FBSyxFQUFFLElBQUksOENBQVUsRUFBRTtDQUN2QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2NvbmRpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9hYm91dC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgQWN0aW9uSGVscGVycywgQWN0aW9ucyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRBY3Rpb25TZXR0aW5ncywgU2hhcmVkU3RhdGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBhY3Rpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dEFjdGlvblNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNoYXJlZCBzdGF0ZSBwYXNzZWQgdG8gdGhlc2UgaW1wbGVtZW50YXRpb25zLlxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfc2hhcmVkU3RhdGU6IFNoYXJlZFN0YXRlO1xuXG5cdGNvbnN0cnVjdG9yKHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSkge1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlID0gc2hhcmVkU3RhdGU7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0QWN0aW9uU2V0dGluZ3M+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkFib3V0QWN0aW9uXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93ID0gYXdhaXQgdGhpcy5nZXRBYm91dFdpbmRvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wic2hvdy1hYm91dFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5HbG9iYWxDb250ZXh0TWVudSAmJlxuXHRcdFx0XHR0aGlzLl9zaGFyZWRTdGF0ZT8uYWJvdXRXaW5kb3cgIT09IHVuZGVmaW5lZFxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IGFib3V0V2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyh7XG5cdFx0XHRcdFx0dXVpZDogZmluLm1lLmlkZW50aXR5LnV1aWQsXG5cdFx0XHRcdFx0bmFtZTogdGhpcy5fc2hhcmVkU3RhdGUuYWJvdXRXaW5kb3cubmFtZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0bGV0IHdpbmRvd0V4aXN0cyA9IGZhbHNlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGF3YWl0IGFib3V0V2luZG93LmdldEluZm8oKTtcblx0XHRcdFx0XHR3aW5kb3dFeGlzdHMgPSB0cnVlO1xuXHRcdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkNhbm5vdCBzZWUgZXhpc3RpbmcgYWJvdXQgd2luZG93LiBXaWxsIGNyZWF0ZSBhbiBhYm91dCB3aW5kb3cuXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHdpbmRvd0V4aXN0cykge1xuXHRcdFx0XHRcdGF3YWl0IGFib3V0V2luZG93LnNldEFzRm9yZWdyb3VuZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcIkVycm9yIGxhdW5jaGluZyBzaG93IGFib3V0IGFjdGlvbiB3aW5kb3cuXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxuXG5cdC8qKiBHZXRzIGFib3V0IHdpbmRvdyBvcHRpb25zIGVucmljaGVkIHdpdGggVmVyc2lvbkluZm8gKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRBYm91dFdpbmRvdygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93T3B0aW9ucz4ge1xuXHRcdGlmICh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy53aW5kb3dPcHRpb25zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiTm8gYWJvdXQgd2luZG93IGNvbmZpZ3VyYXRpb24gcHJvdmlkZWQuXCIpO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRjb25zdCB2YWxpZGF0ZWRXaW5kb3dPcHRpb25zOiBPcGVuRmluLldpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHQuLi50aGlzLl9kZWZpbml0aW9uLmRhdGEud2luZG93T3B0aW9uc1xuXHRcdH07XG5cblx0XHRpZiAodmFsaWRhdGVkV2luZG93T3B0aW9ucy51cmwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcIkFuIGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24gd2FzIHNldCBidXQgYSB1cmwgd2FzIG5vdCBwcm92aWRlZC4gQSB3aW5kb3cgY2Fubm90IGJlIGxhdW5jaGVkLlwiXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKHZhbGlkYXRlZFdpbmRvd09wdGlvbnMubmFtZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tdmVyc2lvbmluZy1hYm91dGA7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbGlkYXRlZFdpbmRvd09wdGlvbnM/LmN1c3RvbURhdGE/LnZlcnNpb25JbmZvICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiRW5yaWNoaW5nIGN1c3RvbURhdGEgdmVyc2lvbkluZm8gcHJvdmlkZWQgYnkgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEudmVyc2lvbkluZm8gPSB7XG5cdFx0XHRcdC4uLnZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyxcblx0XHRcdFx0Li4uKGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKSlcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU2V0dGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIGZvciBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uLlwiKTtcblx0XHRcdGlmICh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEgPSB7fTtcblx0XHRcdH1cblx0XHRcdHZhbGlkYXRlZFdpbmRvd09wdGlvbnMuY3VzdG9tRGF0YS52ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKTtcblx0XHR9XG5cblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJldHVybmluZyBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uLlwiKTtcblx0XHRyZXR1cm4gdmFsaWRhdGVkV2luZG93T3B0aW9ucztcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDb25kaXRpb25NYXAsIENvbmRpdGlvbnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlZFN0YXRlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG4vKipcbiAqIEltcGxlbWVudCB0aGUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0Q29uZGl0aW9ucyBpbXBsZW1lbnRzIENvbmRpdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBjb25kaXRpb25zLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzaGFyZWQgc3RhdGUgcGFzc2VkIHRvIHRoZXNlIGltcGxlbWVudGF0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX3NoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZTtcblxuXHRjb25zdHJ1Y3RvcihzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUpIHtcblx0XHR0aGlzLl9zaGFyZWRTdGF0ZSA9IHNoYXJlZFN0YXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGNyZWF0ZUxvZ2dlciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQWJvdXRDb25kaXRpb25cIik7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJDb25kaXRpb24gSW5pdGlhbGl6ZWRcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBjb25kaXRpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxDb25kaXRpb25NYXA+IHtcblx0XHRjb25zdCBjb25kaXRpb25NYXA6IENvbmRpdGlvbk1hcCA9IHt9O1xuXG5cdFx0Y29uZGl0aW9uTWFwW1wiaGFzLWFib3V0XCJdID0gYXN5bmMgKCkgPT4gdGhpcy5fc2hhcmVkU3RhdGUuYWJvdXRXaW5kb3cgIT09IHVuZGVmaW5lZDtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuXHRcdHJldHVybiBjb25kaXRpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEFib3V0UHJvdmlkZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIGFib3V0IGluZm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8dW5rbm93bj4ge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJhYm91dFwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29tbWFuZCB0byBkaXNwbGF5IHRoZSBhYm91dCBpbmZvcm1hdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUJPVVRfQ09NTUFORCA9IFwiL2Fib3V0XCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dFByb3ZpZGVyU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlZCBhbHRlcm5hdGUgbGFiZWxzIGZvciB0aGUgdmVyc2lvbiB0eXBlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3ZlcnNpb25UeXBlTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlZCBhbHRlcm5hdGUgbGFiZWxzIGZvciB0aGUgdmVyc2lvbiB0eXBlc1xuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2V4Y2x1ZGVWZXJzaW9uVHlwZTogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRQcm92aWRlclNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX3ZlcnNpb25UeXBlTWFwID0gZGVmaW5pdGlvbj8uZGF0YT8udmVyc2lvblR5cGVNYXAgPz8ge307XG5cdFx0dGhpcy5fZXhjbHVkZVZlcnNpb25UeXBlID0gZGVmaW5pdGlvbj8uZGF0YT8uZXhjbHVkZVZlcnNpb25UeXBlID8/IFtdO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBYm91dFByb3ZpZGVyXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7QWJvdXRQcm92aWRlci5fUFJPVklERVJfSUR9LWhlbHBgLFxuXHRcdFx0XHR0aXRsZTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IEFib3V0UHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRcdHBvcHVsYXRlUXVlcnk6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5ELFxuXHRcdFx0XHRcdFtcIlRoZSBhYm91dCBjb21tYW5kIGxpc3RzIHRoZSB2ZXJzaW9uIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhpcyBwbGF0Zm9ybS5cIl0sXG5cdFx0XHRcdFx0W0Fib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkRdXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHF1ZXJ5Lmxlbmd0aCA8IDIgfHwgIUFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQuc3RhcnRzV2l0aChxdWVyeSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtdXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRjb25zdCBwYWxldHRlID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRQYWxldHRlKCk7XG5cblx0XHRjb25zdCB2ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRWZXJzaW9uSW5mbygpO1xuXG5cdFx0Y29uc3QgYWN0aW9ucyA9IFtdO1xuXG5cdFx0Y29uc3QgZGF0YTogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cblx0XHRjb25zdCB0YWJsZURhdGE6IHN0cmluZ1tdW10gPSBbXTtcblx0XHR0YWJsZURhdGEucHVzaChbXCJWZXJzaW9uIFR5cGVcIiwgXCJWZXJzaW9uXCJdKTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZlcnNpb25JbmZvKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpXTtcblx0XHRcdGlmICghdGhpcy5fZXhjbHVkZVZlcnNpb25UeXBlLmluY2x1ZGVzKGtleSkpIHtcblx0XHRcdFx0Y29uc3QgbGFiZWwgPSB0aGlzLl92ZXJzaW9uVHlwZU1hcFtrZXldID8/IGtleXNbaV07XG5cdFx0XHRcdHRhYmxlRGF0YS5wdXNoKFtsYWJlbCwgKHZlcnNpb25JbmZvW2tleXNbaV1dID8/IFwidW5rbm93blwiKSBhcyBzdHJpbmddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhLnRpdGxlID0gdGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8udGl0bGUgPz8gXCJWZXJzaW9uc1wiO1xuXG5cdFx0Y29uc3QgY2hpbGRyZW46IFRlbXBsYXRlRnJhZ21lbnRbXSA9IFtdO1xuXHRcdGNvbnN0IHRpdGxlRnJhZ21lbnQgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUaXRsZShcblx0XHRcdFwidGl0bGVcIixcblx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdHtcblx0XHRcdFx0bWFyZ2luQm90dG9tOiBcIjEwcHhcIixcblx0XHRcdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7cGFsZXR0ZS5iYWNrZ3JvdW5kNn1gXG5cdFx0XHR9XG5cdFx0KSkgYXMgVGVtcGxhdGVGcmFnbWVudDtcblxuXHRcdGNoaWxkcmVuLnB1c2godGl0bGVGcmFnbWVudCk7XG5cblx0XHRpZiAodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGF0YS5kZXNjcmlwdGlvbiA9IHRoaXMuX2RlZmluaXRpb24uZGF0YS5kZXNjcmlwdGlvbjtcblx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uRnJhZ21lbnQgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUZXh0KFxuXHRcdFx0XHRcImRlc2NyaXB0aW9uXCIsXG5cdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0fVxuXHRcdFx0KSkgYXMgVGVtcGxhdGVGcmFnbWVudDtcblx0XHRcdGNoaWxkcmVuLnB1c2goZGVzY3JpcHRpb25GcmFnbWVudCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFibGVGcmFnbWVudCA9IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRhYmxlKFxuXHRcdFx0dGFibGVEYXRhLFxuXHRcdFx0W10sXG5cdFx0XHQwLFxuXHRcdFx0ZGF0YVxuXHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cblx0XHRjaGlsZHJlbi5wdXNoKHRhYmxlRnJhZ21lbnQpO1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0ge1xuXHRcdFx0a2V5OiBcImFib3V0LWluZm9cIixcblx0XHRcdHRpdGxlOiBBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5ELFxuXHRcdFx0bGFiZWw6IFwiVmVyc2lvblwiLFxuXHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdGFjdGlvbnMsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IEFib3V0UHJvdmlkZXIuX1BST1ZJREVSX0lEXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdGxheW91dDogYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVDb250YWluZXIoXCJjb2x1bW5cIiwgY2hpbGRyZW4sIHtcblx0XHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIlxuXHRcdFx0XHR9KSxcblx0XHRcdFx0ZGF0YVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogW3Jlc3VsdF1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTWVudXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQWJvdXRNZW51c1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFib3V0TWVudXMgaW1wbGVtZW50cyBNZW51czxBYm91dE1lbnVzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBBYm91dE1lbnVzU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGNyZWF0ZUxvZ2dlciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBYm91dE1lbnVzU2V0dGluZ3M+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkRldmVsb3Blck1lbnVzXCIpO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KG1lbnVUeXBlOiBNZW51VHlwZSwgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uZW50cmllcz8uYWJvdXQ/LmxhYmVsID8/IFwiQWJvdXRcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcInNob3ctYWJvdXRcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHRoaXMuX3NldHRpbmdzPy5lbnRyaWVzPy5hYm91dD8ucG9zaXRpb24gPz8ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJRdWl0XCIsXG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNvbmRpdGlvbnM6IFtcImhhcy1hYm91dFwiXVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBBYm91dEFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBBYm91dENvbmRpdGlvbnMgfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XG5pbXBvcnQgeyBBYm91dFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcbmltcG9ydCB7IEFib3V0TWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuaW1wb3J0IHR5cGUgeyBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5jb25zdCBzaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGUgPSB7fTtcbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBYm91dFByb3ZpZGVyKCksXG5cdGNvbmRpdGlvbnM6IG5ldyBBYm91dENvbmRpdGlvbnMoc2hhcmVkU3RhdGUpLFxuXHRhY3Rpb25zOiBuZXcgQWJvdXRBY3Rpb25zKHNoYXJlZFN0YXRlKSxcblx0bWVudXM6IG5ldyBBYm91dE1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=