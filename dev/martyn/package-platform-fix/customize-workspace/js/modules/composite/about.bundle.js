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
                try {
                    await fin.Window.create(this._sharedState.aboutWindow);
                }
                catch (error) {
                    this._logger.error("Error launching show about action window.", error);
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



const sharedState = {};
const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_2__.AboutProvider(),
    conditions: new _conditions__WEBPACK_IMPORTED_MODULE_1__.AboutConditions(sharedState),
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.AboutActions(sharedState)
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO29CQUMxRixPQUFPLEVBQUUsTUFBTTtpQkFDZixDQUFDO2dCQUNGLElBQUk7YUFDSjtTQUNELENBQUM7UUFFRixPQUFPO1lBQ04sT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsYUFBYSxDQUN6QixNQUFrQyxFQUNsQyxZQUF3QztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7O0FBek1EOzs7R0FHRztBQUNxQiwwQkFBWSxHQUFHLE9BQU8sQ0FBQztBQUUvQzs7O0dBR0c7QUFDcUIsNEJBQWMsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7U0M1Qm5EO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0x5QztBQUNNO0FBQ0Q7QUFHOUMsTUFBTSxXQUFXLEdBQWdCLEVBQUUsQ0FBQztBQUM3QixNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsWUFBWSxFQUFFLElBQUksdURBQWEsRUFBRTtJQUNqQyxVQUFVLEVBQUUsSUFBSSx3REFBZSxDQUFDLFdBQVcsQ0FBQztJQUM1QyxPQUFPLEVBQUUsSUFBSSxrREFBWSxDQUFDLFdBQVcsQ0FBQztDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2NvbmRpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2Fib3V0L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBBY3Rpb25IZWxwZXJzLCBBY3Rpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBYm91dEFjdGlvblNldHRpbmdzLCBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dEFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGFjdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0QWN0aW9uU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcmVkIHN0YXRlIHBhc3NlZCB0byB0aGVzZSBpbXBsZW1lbnRhdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGU7XG5cblx0Y29uc3RydWN0b3Ioc2hhcmVkU3RhdGU6IFNoYXJlZFN0YXRlKSB7XG5cdFx0dGhpcy5fc2hhcmVkU3RhdGUgPSBzaGFyZWRTdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRBY3Rpb25TZXR0aW5ncz4sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQWJvdXRBY3Rpb25cIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fc2hhcmVkU3RhdGUuYWJvdXRXaW5kb3cgPSBhd2FpdCB0aGlzLmdldEFib3V0V2luZG93KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJzaG93LWFib3V0XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlID09PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLkdsb2JhbENvbnRleHRNZW51ICYmXG5cdFx0XHRcdHRoaXMuX3NoYXJlZFN0YXRlPy5hYm91dFdpbmRvdyAhPT0gdW5kZWZpbmVkXG5cdFx0XHQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh0aGlzLl9zaGFyZWRTdGF0ZS5hYm91dFdpbmRvdyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiRXJyb3IgbGF1bmNoaW5nIHNob3cgYWJvdXQgYWN0aW9uIHdpbmRvdy5cIiwgZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cblxuXHQvKiogR2V0cyBhYm91dCB3aW5kb3cgb3B0aW9ucyBlbnJpY2hlZCB3aXRoIFZlcnNpb25JbmZvICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0QWJvdXRXaW5kb3coKTogUHJvbWlzZTxPcGVuRmluLldpbmRvd09wdGlvbnM+IHtcblx0XHRpZiAodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ud2luZG93T3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIk5vIGFib3V0IHdpbmRvdyBjb25maWd1cmF0aW9uIHByb3ZpZGVkLlwiKTtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmFsaWRhdGVkV2luZG93T3B0aW9uczogT3BlbkZpbi5XaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0Li4udGhpcy5fZGVmaW5pdGlvbi5kYXRhLndpbmRvd09wdGlvbnNcblx0XHR9O1xuXG5cdFx0aWYgKHZhbGlkYXRlZFdpbmRvd09wdGlvbnMudXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcblx0XHRcdFx0XCJBbiBhYm91dCB2ZXJzaW9uIHdpbmRvdyBjb25maWd1cmF0aW9uIHdhcyBzZXQgYnV0IGEgdXJsIHdhcyBub3QgcHJvdmlkZWQuIEEgd2luZG93IGNhbm5vdCBiZSBsYXVuY2hlZC5cIlxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5uYW1lID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LXZlcnNpb25pbmctYWJvdXRgO1xuXHRcdH1cblxuXHRcdGlmICh2YWxpZGF0ZWRXaW5kb3dPcHRpb25zPy5jdXN0b21EYXRhPy52ZXJzaW9uSW5mbyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkVucmljaGluZyBjdXN0b21EYXRhIHZlcnNpb25JbmZvIHByb3ZpZGVkIGJ5IGFib3V0IHZlcnNpb24gd2luZG93IGNvbmZpZ3VyYXRpb24uXCIpO1xuXHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhLnZlcnNpb25JbmZvID0ge1xuXHRcdFx0XHQuLi52YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEudmVyc2lvbkluZm8sXG5cdFx0XHRcdC4uLihhd2FpdCB0aGlzLl9oZWxwZXJzLmdldFZlcnNpb25JbmZvKCkpXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlNldHRpbmcgY3VzdG9tRGF0YSB2ZXJzaW9uSW5mbyBmb3IgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0XHRpZiAodmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dmFsaWRhdGVkV2luZG93T3B0aW9ucy5jdXN0b21EYXRhID0ge307XG5cdFx0XHR9XG5cdFx0XHR2YWxpZGF0ZWRXaW5kb3dPcHRpb25zLmN1c3RvbURhdGEudmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldFZlcnNpb25JbmZvKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJSZXR1cm5pbmcgYWJvdXQgdmVyc2lvbiB3aW5kb3cgY29uZmlndXJhdGlvbi5cIik7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFdpbmRvd09wdGlvbnM7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgQ29uZGl0aW9uTWFwLCBDb25kaXRpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTaGFyZWRTdGF0ZSB9IGZyb20gXCIuL3NoYXBlc1wiO1xuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBYm91dENvbmRpdGlvbnMgaW1wbGVtZW50cyBDb25kaXRpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgY29uZGl0aW9ucy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPHVua25vd24+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcmVkIHN0YXRlIHBhc3NlZCB0byB0aGVzZSBpbXBsZW1lbnRhdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zaGFyZWRTdGF0ZTogU2hhcmVkU3RhdGU7XG5cblx0Y29uc3RydWN0b3Ioc2hhcmVkU3RhdGU6IFNoYXJlZFN0YXRlKSB7XG5cdFx0dGhpcy5fc2hhcmVkU3RhdGUgPSBzaGFyZWRTdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4sIGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkFib3V0Q29uZGl0aW9uXCIpO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiQ29uZGl0aW9uIEluaXRpYWxpemVkXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgY29uZGl0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KCk6IFByb21pc2U8Q29uZGl0aW9uTWFwPiB7XG5cdFx0Y29uc3QgY29uZGl0aW9uTWFwOiBDb25kaXRpb25NYXAgPSB7fTtcblxuXHRcdGNvbmRpdGlvbk1hcFtcImhhcy1hYm91dFwiXSA9IGFzeW5jICgpID0+IHRoaXMuX3NoYXJlZFN0YXRlLmFib3V0V2luZG93ICE9PSB1bmRlZmluZWQ7XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cblx0XHRyZXR1cm4gY29uZGl0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0LFxuXHRUZW1wbGF0ZUZyYWdtZW50XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgSW50ZWdyYXRpb25IZWxwZXJzLCBJbnRlZ3JhdGlvbk1vZHVsZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBYm91dFByb3ZpZGVyU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBhYm91dCBpbmZvLlxuICovXG5leHBvcnQgY2xhc3MgQWJvdXRQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPHVua25vd24+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwiYWJvdXRcIjtcblxuXHQvKipcblx0ICogVGhlIGNvbW1hbmQgdG8gZGlzcGxheSB0aGUgYWJvdXQgaW5mb3JtYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FCT1VUX0NPTU1BTkQgPSBcIi9hYm91dFwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QWJvdXRQcm92aWRlclNldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogUHJvdmlkZWQgYWx0ZXJuYXRlIGxhYmVscyBmb3IgdGhlIHZlcnNpb24gdHlwZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF92ZXJzaW9uVHlwZU1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHQvKipcblx0ICogUHJvdmlkZWQgYWx0ZXJuYXRlIGxhYmVscyBmb3IgdGhlIHZlcnNpb24gdHlwZXNcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9leGNsdWRlVmVyc2lvblR5cGU6IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFib3V0UHJvdmlkZXJTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl92ZXJzaW9uVHlwZU1hcCA9IGRlZmluaXRpb24/LmRhdGE/LnZlcnNpb25UeXBlTWFwID8/IHt9O1xuXHRcdHRoaXMuX2V4Y2x1ZGVWZXJzaW9uVHlwZSA9IGRlZmluaXRpb24/LmRhdGE/LmV4Y2x1ZGVWZXJzaW9uVHlwZSA/PyBbXTtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQWJvdXRQcm92aWRlclwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6IGAke0Fib3V0UHJvdmlkZXIuX1BST1ZJREVSX0lEfS1oZWxwYCxcblx0XHRcdFx0dGl0bGU6IEFib3V0UHJvdmlkZXIuX0FCT1VUX0NPTU1BTkQsXG5cdFx0XHRcdGxhYmVsOiBcIkhlbHBcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiBBYm91dFByb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0XHRwb3B1bGF0ZVF1ZXJ5OiBBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5EXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0QWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdFx0XHRbXCJUaGUgYWJvdXQgY29tbWFuZCBsaXN0cyB0aGUgdmVyc2lvbiBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoaXMgcGxhdGZvcm0uXCJdLFxuXHRcdFx0XHRcdFtBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5EXVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGlmIChxdWVyeS5sZW5ndGggPCAyIHx8ICFBYm91dFByb3ZpZGVyLl9BQk9VVF9DT01NQU5ELnN0YXJ0c1dpdGgocXVlcnkpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBbXVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0Y29uc3QgcGFsZXR0ZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50UGFsZXR0ZSgpO1xuXG5cdFx0Y29uc3QgdmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKTtcblxuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXTtcblxuXHRcdGNvbnN0IGRhdGE6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG5cdFx0Y29uc3QgdGFibGVEYXRhOiBzdHJpbmdbXVtdID0gW107XG5cdFx0dGFibGVEYXRhLnB1c2goW1wiVmVyc2lvbiBUeXBlXCIsIFwiVmVyc2lvblwiXSk7XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2ZXJzaW9uSW5mbyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRpZiAoIXRoaXMuX2V4Y2x1ZGVWZXJzaW9uVHlwZS5pbmNsdWRlcyhrZXkpKSB7XG5cdFx0XHRcdGNvbnN0IGxhYmVsID0gdGhpcy5fdmVyc2lvblR5cGVNYXBba2V5XSA/PyBrZXlzW2ldO1xuXHRcdFx0XHR0YWJsZURhdGEucHVzaChbbGFiZWwsICh2ZXJzaW9uSW5mb1trZXlzW2ldXSA/PyBcInVua25vd25cIikgYXMgc3RyaW5nXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGF0YS50aXRsZSA9IHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LnRpdGxlID8/IFwiVmVyc2lvbnNcIjtcblxuXHRcdGNvbnN0IGNoaWxkcmVuOiBUZW1wbGF0ZUZyYWdtZW50W10gPSBbXTtcblx0XHRjb25zdCB0aXRsZUZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGl0bGUoXG5cdFx0XHRcInRpdGxlXCIsXG5cdFx0XHR1bmRlZmluZWQsXG5cdFx0XHR1bmRlZmluZWQsXG5cdFx0XHR7XG5cdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG5cdFx0XHRcdGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3BhbGV0dGUuYmFja2dyb3VuZDZ9YFxuXHRcdFx0fVxuXHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cblx0XHRjaGlsZHJlbi5wdXNoKHRpdGxlRnJhZ21lbnQpO1xuXG5cdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGRhdGEuZGVzY3JpcHRpb24gPSB0aGlzLl9kZWZpbml0aW9uLmRhdGEuZGVzY3JpcHRpb247XG5cdFx0XHRjb25zdCBkZXNjcmlwdGlvbkZyYWdtZW50ID0gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGV4dChcblx0XHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiXG5cdFx0XHRcdH1cblx0XHRcdCkpIGFzIFRlbXBsYXRlRnJhZ21lbnQ7XG5cdFx0XHRjaGlsZHJlbi5wdXNoKGRlc2NyaXB0aW9uRnJhZ21lbnQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYmxlRnJhZ21lbnQgPSAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUYWJsZShcblx0XHRcdHRhYmxlRGF0YSxcblx0XHRcdFtdLFxuXHRcdFx0MCxcblx0XHRcdGRhdGFcblx0XHQpKSBhcyBUZW1wbGF0ZUZyYWdtZW50O1xuXG5cdFx0Y2hpbGRyZW4ucHVzaCh0YWJsZUZyYWdtZW50KTtcblxuXHRcdGNvbnN0IHJlc3VsdCA9IHtcblx0XHRcdGtleTogXCJhYm91dC1pbmZvXCIsXG5cdFx0XHR0aXRsZTogQWJvdXRQcm92aWRlci5fQUJPVVRfQ09NTUFORCxcblx0XHRcdGxhYmVsOiBcIlZlcnNpb25cIixcblx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24/Lmljb24sXG5cdFx0XHRhY3Rpb25zLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBBYm91dFByb3ZpZGVyLl9QUk9WSURFUl9JRFxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQ29udGFpbmVyKFwiY29sdW1uXCIsIGNoaWxkcmVuLCB7XG5cdFx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCJcblx0XHRcdFx0fSksXG5cdFx0XHRcdGRhdGFcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtyZXN1bHRdXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgQWJvdXRBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgQWJvdXRDb25kaXRpb25zIH0gZnJvbSBcIi4vY29uZGl0aW9uc1wiO1xuaW1wb3J0IHsgQWJvdXRQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlZFN0YXRlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmNvbnN0IHNoYXJlZFN0YXRlOiBTaGFyZWRTdGF0ZSA9IHt9O1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IEFib3V0UHJvdmlkZXIoKSxcblx0Y29uZGl0aW9uczogbmV3IEFib3V0Q29uZGl0aW9ucyhzaGFyZWRTdGF0ZSksXG5cdGFjdGlvbnM6IG5ldyBBYm91dEFjdGlvbnMoc2hhcmVkU3RhdGUpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9