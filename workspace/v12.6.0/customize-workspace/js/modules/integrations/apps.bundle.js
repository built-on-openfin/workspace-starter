/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/integrations/apps/integration.ts":
/*!*************************************************************!*\
  !*** ./client/src/modules/integrations/apps/integration.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppProvider": () => (/* binding */ AppProvider)
/* harmony export */ });
/**
 * Implement the integration provider for apps.
 */
class AppProvider {
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
        this._logger = loggerCreator("AppProvider");
        this._providerId = definition.id;
        this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
            await this.rebuildResults();
        });
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        return [];
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
        const queryLower = query.toLowerCase();
        this._lastResponse = lastResponse;
        const appResponse = await this.getResults(queryLower, filters, options);
        return appResponse;
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
            if (data?.app?.appId) {
                handled = true;
                await this._integrationHelpers.launchApp(data.app.appId);
            }
        }
        return handled;
    }
    async getResults(queryLower, filters, options, cachedApps) {
        const apps = cachedApps ?? (await this._integrationHelpers.getApps());
        this._lastAppResults = apps;
        this._lastQuery = queryLower;
        this._lastQueryMinLength = options?.queryMinLength;
        this._lastQueryAgainst = options?.queryAgainst;
        this._lastCLIFilters = filters;
        const appSearchEntries = await this.mapAppEntriesToSearchEntries(apps);
        const tags = [];
        if (appSearchEntries.length > 0) {
            const finalResults = appSearchEntries.filter((entry) => {
                let textMatchFound = true;
                let filterMatchFound = true;
                const isCommand = queryLower.startsWith("/");
                if (queryLower.length >= options.queryMinLength || isCommand) {
                    textMatchFound = options.queryAgainst.some((target) => {
                        const path = target.split(".");
                        if (path.length === 1) {
                            const targetValue = entry[path[0]];
                            if (typeof targetValue === "string") {
                                const lowerTarget = targetValue.toLowerCase();
                                if (isCommand) {
                                    return lowerTarget.startsWith(queryLower);
                                }
                                return lowerTarget.includes(queryLower);
                            }
                        }
                        else if (path.length === 2) {
                            const specifiedTarget = entry[path[0]];
                            let targetValue;
                            if (specifiedTarget !== undefined && specifiedTarget !== null) {
                                targetValue = specifiedTarget[path[1]];
                            }
                            if (typeof targetValue === "string") {
                                const lowerTarget = targetValue.toLowerCase();
                                if (isCommand) {
                                    return lowerTarget.startsWith(queryLower);
                                }
                                return lowerTarget.includes(queryLower);
                            }
                            if (Array.isArray(targetValue)) {
                                if (targetValue.length > 0 &&
                                    typeof targetValue[0] === "string" &&
                                    targetValue.some((matchTarget) => matchTarget.toLowerCase().startsWith(queryLower))) {
                                    return true;
                                }
                                this._logger.warn(`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${specifiedTarget}`);
                            }
                        }
                        else {
                            this._logger.warn("The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings");
                        }
                        return false;
                    });
                }
                const tagFilters = Array.isArray(filters)
                    ? filters.filter((f) => f.id === AppProvider._HOME_TAG_FILTERS)
                    : [];
                if (tagFilters.length > 0) {
                    filterMatchFound = tagFilters.some((filter) => {
                        if (Array.isArray(filter.options)) {
                            if (entry.data?.app?.tags !== undefined) {
                                return filter.options.every((option) => !option.isSelected || entry.data.app.tags.includes(option.value));
                            }
                        }
                        else if (filter.options.isSelected && entry.data?.app?.tags !== undefined) {
                            return entry.data.app.tags.includes(filter.options.value);
                        }
                        return true;
                    });
                }
                if (textMatchFound && Array.isArray(entry.data?.app?.tags)) {
                    tags.push(...entry.data.app.tags);
                }
                return textMatchFound && filterMatchFound;
            });
            this._lastResultIds = finalResults.map((entry) => entry.key);
            return {
                results: finalResults,
                context: {
                    filters: this.getSearchFilters(tags.filter(Boolean))
                }
            };
        }
        this._lastResultIds = [];
        return {
            results: [],
            context: {
                filters: []
            }
        };
    }
    getSearchFilters(tags) {
        if (Array.isArray(tags)) {
            const filters = [];
            const uniqueTags = [...new Set(tags.sort())];
            const tagFilter = {
                id: AppProvider._HOME_TAG_FILTERS,
                title: "Tags",
                type: "MultiSelect",
                options: []
            };
            for (const tag of uniqueTags) {
                if (Array.isArray(tagFilter.options)) {
                    tagFilter.options.push({
                        value: tag,
                        isSelected: false
                    });
                }
            }
            filters.push(tagFilter);
            return filters;
        }
        return [];
    }
    async mapAppEntriesToSearchEntries(apps) {
        const appResults = [];
        if (Array.isArray(apps)) {
            for (let i = 0; i < apps.length; i++) {
                const app = apps[i];
                const action = { name: "Launch View", hotkey: "enter" };
                const entry = {
                    key: app.appId,
                    title: app.title,
                    data: { app, providerId: this._providerId }
                };
                const manifestTypeMapping = this._settings.manifestTypeMapping[app.manifestType];
                if (manifestTypeMapping !== undefined) {
                    if (manifestTypeMapping.entryLabel !== undefined &&
                        manifestTypeMapping.entryLabel !== null &&
                        manifestTypeMapping.entryLabel.length > 0) {
                        entry.label = manifestTypeMapping.entryLabel;
                    }
                    if (manifestTypeMapping.actionName !== undefined &&
                        manifestTypeMapping.actionName !== null &&
                        manifestTypeMapping.actionName.length > 0) {
                        action.name = manifestTypeMapping.actionName;
                    }
                }
                entry.actions = [action];
                entry.icon = this.getAppIcon(app);
                if (app.description !== undefined) {
                    entry.description = app.description;
                    entry.shortDescription = app.description;
                }
                entry.template = "Custom";
                entry.templateContent = await this._integrationHelpers.templateHelpers.createApp(app, entry.icon, action.name);
                appResults.push(entry);
            }
        }
        return appResults;
    }
    getAppIcon(app) {
        if (Array.isArray(app.icons) && app.icons.length > 0) {
            return app.icons[0].src;
        }
    }
    async rebuildResults() {
        if (this._lastResponse !== undefined && Array.isArray(this._lastResultIds)) {
            this._logger.info("Rebuilding results...");
            this._lastResponse.revoke(...this._lastResultIds);
            const appResponse = await this.getResults(this._lastQuery, this._lastCLIFilters, { queryMinLength: this._lastQueryMinLength, queryAgainst: this._lastQueryAgainst }, this._lastAppResults);
            this._lastResponse.respond(appResponse.results);
            this._logger.info("Results rebuilt.");
        }
    }
}
/**
 * The key used to filter out by tag.
 * @internal
 */
AppProvider._HOME_TAG_FILTERS = "tags";


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
/*!*******************************************************!*\
  !*** ./client/src/modules/integrations/apps/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/apps/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.AppProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsVUFBVSxDQUN4QyxJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxlQUFlLEVBQ3BCLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQ2xGLElBQUksQ0FBQyxlQUFlLENBQ3BCLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN0QztJQUNGLENBQUM7O0FBbFdEOzs7R0FHRztBQUNxQiw2QkFBaUIsR0FBRyxNQUFNLENBQUM7Ozs7Ozs7U0N2QnBEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFFckMsTUFBTSxXQUFXLEdBQWtDO0lBQ3pELFlBQVksRUFBRSxJQUFJLHFEQUFXLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSUZpbHRlck9wdGlvblR5cGUsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFBsYXRmb3JtQXBwIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQXBwU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBhcHBzLlxuICovXG5leHBvcnQgY2xhc3MgQXBwUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxBcHBTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGtleSB1c2VkIHRvIGZpbHRlciBvdXQgYnkgdGFnLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9IT01FX1RBR19GSUxURVJTID0gXCJ0YWdzXCI7XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3Byb3ZpZGVySWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IEFwcFNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXNwb25zZT86IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgbWluIGxlbmd0aC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeU1pbkxlbmd0aD86IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeUFnYWluc3Q/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgYWdhaW5zdCBhcnJheS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RDTElGaWx0ZXJzPzogQ0xJRmlsdGVyW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IGFwcCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEFwcFJlc3VsdHM/OiBQbGF0Zm9ybUFwcFtdO1xuXG5cdC8qKiBUaGUgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBsYXN0IHNldCBvZiByZXN1bHRzICovXG5cdHByaXZhdGUgX2xhc3RSZXN1bHRJZHM/OiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxBcHBTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXBwUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fcHJvdmlkZXJJZCA9IGRlZmluaXRpb24uaWQ7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwidGhlbWUtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgcXVlcnlMb3dlciA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdGNvbnN0IGFwcFJlc3BvbnNlOiBIb21lU2VhcmNoUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMocXVlcnlMb3dlciwgZmlsdGVycywgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gYXBwUmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdGFwcDogeyBhcHBJZD86IHN0cmluZyB9O1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRpZiAoZGF0YT8uYXBwPy5hcHBJZCkge1xuXHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaEFwcChkYXRhLmFwcC5hcHBJZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGdldFJlc3VsdHMoXG5cdFx0cXVlcnlMb3dlcjogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH0sXG5cdFx0Y2FjaGVkQXBwcz86IFBsYXRmb3JtQXBwW11cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBhcHBzOiBQbGF0Zm9ybUFwcFtdID0gY2FjaGVkQXBwcyA/PyAoYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEFwcHMoKSk7XG5cdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMgPSBhcHBzO1xuXHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucz8ucXVlcnlNaW5MZW5ndGg7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5QWdhaW5zdCA9IG9wdGlvbnM/LnF1ZXJ5QWdhaW5zdDtcblx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyA9IGZpbHRlcnM7XG5cdFx0Y29uc3QgYXBwU2VhcmNoRW50cmllcyA9IGF3YWl0IHRoaXMubWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzKTtcblxuXHRcdGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gW107XG5cblx0XHRpZiAoYXBwU2VhcmNoRW50cmllcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBmaW5hbFJlc3VsdHMgPSBhcHBTZWFyY2hFbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IHtcblx0XHRcdFx0bGV0IHRleHRNYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0bGV0IGZpbHRlck1hdGNoRm91bmQgPSB0cnVlO1xuXG5cdFx0XHRcdGNvbnN0IGlzQ29tbWFuZCA9IHF1ZXJ5TG93ZXIuc3RhcnRzV2l0aChcIi9cIik7XG5cblx0XHRcdFx0aWYgKHF1ZXJ5TG93ZXIubGVuZ3RoID49IG9wdGlvbnMucXVlcnlNaW5MZW5ndGggfHwgaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0dGV4dE1hdGNoRm91bmQgPSBvcHRpb25zLnF1ZXJ5QWdhaW5zdC5zb21lKCh0YXJnZXQpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRcdFx0aWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldFZhbHVlID0gZW50cnlbcGF0aFswXV07XG5cblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChxdWVyeUxvd2VyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHBhdGgubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHNwZWNpZmllZFRhcmdldCA9IGVudHJ5W3BhdGhbMF1dO1xuXHRcdFx0XHRcdFx0XHRsZXQgdGFyZ2V0VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xuXHRcdFx0XHRcdFx0XHRpZiAoc3BlY2lmaWVkVGFyZ2V0ICE9PSB1bmRlZmluZWQgJiYgc3BlY2lmaWVkVGFyZ2V0ICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUgPSBzcGVjaWZpZWRUYXJnZXRbcGF0aFsxXV07XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5zdGFydHNXaXRoKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZS5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgdGFyZ2V0VmFsdWVbMF0gPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLnNvbWUoKG1hdGNoVGFyZ2V0KSA9PiBtYXRjaFRhcmdldC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgocXVlcnlMb3dlcikpXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XHRgTWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIHNwZWNpZmllZCBhIHF1ZXJ5QWdhaW5zdCB0YXJnZXQgdGhhdCBpcyBhbiBhcnJheSBidXQgbm90IGFuIGFycmF5IG9mIHN0cmluZ3MuIE9ubHkgc3RyaW5nIHZhbHVlcyBhbmQgYXJyYXlzIGFyZSBzdXBwb3J0ZWQ6ICR7c3BlY2lmaWVkVGFyZ2V0fWBcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcIlRoZSBtYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggaGFzIGEgcXVlcnlBZ2FpbnN0IGVudHJ5IHRoYXQgaGFzIGEgZGVwdGggZ3JlYXRlciB0aGFuIDEuIFlvdSBjYW4gc2VhcmNoIGZvciBlLmcuIGRhdGEudGFncyBpZiBkYXRhIGhhcyB0YWdzIGluIGl0IGFuZCBpdCBpcyBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB0YWdGaWx0ZXJzID0gQXJyYXkuaXNBcnJheShmaWx0ZXJzKVxuXHRcdFx0XHRcdD8gZmlsdGVycy5maWx0ZXIoKGYpID0+IGYuaWQgPT09IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTKVxuXHRcdFx0XHRcdDogW107XG5cdFx0XHRcdGlmICh0YWdGaWx0ZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRmaWx0ZXJNYXRjaEZvdW5kID0gdGFnRmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5vcHRpb25zKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoZW50cnkuZGF0YT8uYXBwPy50YWdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsdGVyLm9wdGlvbnMuZXZlcnkoXG5cdFx0XHRcdFx0XHRcdFx0XHQob3B0aW9uKSA9PiAhb3B0aW9uLmlzU2VsZWN0ZWQgfHwgZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhvcHRpb24udmFsdWUpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChmaWx0ZXIub3B0aW9ucy5pc1NlbGVjdGVkICYmIGVudHJ5LmRhdGE/LmFwcD8udGFncyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBlbnRyeS5kYXRhLmFwcC50YWdzLmluY2x1ZGVzKGZpbHRlci5vcHRpb25zLnZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRleHRNYXRjaEZvdW5kICYmIEFycmF5LmlzQXJyYXkoZW50cnkuZGF0YT8uYXBwPy50YWdzKSkge1xuXHRcdFx0XHRcdHRhZ3MucHVzaCguLi4oZW50cnkuZGF0YS5hcHAudGFncyBhcyBzdHJpbmdbXSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZXh0TWF0Y2hGb3VuZCAmJiBmaWx0ZXJNYXRjaEZvdW5kO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBmaW5hbFJlc3VsdHMubWFwKChlbnRyeSkgPT4gZW50cnkua2V5KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVzdWx0czogZmluYWxSZXN1bHRzLFxuXHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0ZmlsdGVyczogdGhpcy5nZXRTZWFyY2hGaWx0ZXJzKHRhZ3MuZmlsdGVyKEJvb2xlYW4pKVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gW107XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtdLFxuXHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRmaWx0ZXJzOiBbXVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGdldFNlYXJjaEZpbHRlcnModGFnczogc3RyaW5nW10pOiBDTElGaWx0ZXJbXSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcblx0XHRcdGNvbnN0IGZpbHRlcnM6IENMSUZpbHRlcltdID0gW107XG5cdFx0XHRjb25zdCB1bmlxdWVUYWdzID0gWy4uLm5ldyBTZXQodGFncy5zb3J0KCkpXTtcblx0XHRcdGNvbnN0IHRhZ0ZpbHRlcjogQ0xJRmlsdGVyID0ge1xuXHRcdFx0XHRpZDogQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMsXG5cdFx0XHRcdHRpdGxlOiBcIlRhZ3NcIixcblx0XHRcdFx0dHlwZTogXCJNdWx0aVNlbGVjdFwiIGFzIENMSUZpbHRlck9wdGlvblR5cGUuTXVsdGlTZWxlY3QsXG5cdFx0XHRcdG9wdGlvbnM6IFtdXG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGNvbnN0IHRhZyBvZiB1bmlxdWVUYWdzKSB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ0ZpbHRlci5vcHRpb25zKSkge1xuXHRcdFx0XHRcdHRhZ0ZpbHRlci5vcHRpb25zLnB1c2goe1xuXHRcdFx0XHRcdFx0dmFsdWU6IHRhZyxcblx0XHRcdFx0XHRcdGlzU2VsZWN0ZWQ6IGZhbHNlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZmlsdGVycy5wdXNoKHRhZ0ZpbHRlcik7XG5cdFx0XHRyZXR1cm4gZmlsdGVycztcblx0XHR9XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBtYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHM6IFBsYXRmb3JtQXBwW10pOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGNvbnN0IGFwcFJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IFtdO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHMpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgYXBwID0gYXBwc1tpXTtcblx0XHRcdFx0Y29uc3QgYWN0aW9uID0geyBuYW1lOiBcIkxhdW5jaCBWaWV3XCIsIGhvdGtleTogXCJlbnRlclwiIH07XG5cdFx0XHRcdGNvbnN0IGVudHJ5OiBQYXJ0aWFsPEhvbWVTZWFyY2hSZXN1bHQ+ID0ge1xuXHRcdFx0XHRcdGtleTogYXBwLmFwcElkLFxuXHRcdFx0XHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0XHRcdFx0ZGF0YTogeyBhcHAsIHByb3ZpZGVySWQ6IHRoaXMuX3Byb3ZpZGVySWQgfVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGNvbnN0IG1hbmlmZXN0VHlwZU1hcHBpbmcgPSB0aGlzLl9zZXR0aW5ncy5tYW5pZmVzdFR5cGVNYXBwaW5nW2FwcC5tYW5pZmVzdFR5cGVdO1xuXG5cdFx0XHRcdGlmIChtYW5pZmVzdFR5cGVNYXBwaW5nICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsICE9PSBudWxsICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwubGVuZ3RoID4gMFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0ZW50cnkubGFiZWwgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWUgIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZS5sZW5ndGggPiAwXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRhY3Rpb24ubmFtZSA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbnRyeS5hY3Rpb25zID0gW2FjdGlvbl07XG5cdFx0XHRcdGVudHJ5Lmljb24gPSB0aGlzLmdldEFwcEljb24oYXBwKTtcblxuXHRcdFx0XHRpZiAoYXBwLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRlbnRyeS5kZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbjtcblx0XHRcdFx0XHRlbnRyeS5zaG9ydERlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZW50cnkudGVtcGxhdGUgPSBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbTtcblx0XHRcdFx0ZW50cnkudGVtcGxhdGVDb250ZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVBcHAoXG5cdFx0XHRcdFx0YXBwLFxuXHRcdFx0XHRcdGVudHJ5Lmljb24sXG5cdFx0XHRcdFx0YWN0aW9uLm5hbWVcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRhcHBSZXN1bHRzLnB1c2goZW50cnkgYXMgSG9tZVNlYXJjaFJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBSZXN1bHRzO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjIGFzIHN0cmluZztcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2xhc3RSZXN1bHRJZHMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlYnVpbGRpbmcgcmVzdWx0cy4uLlwiKTtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoLi4udGhpcy5fbGFzdFJlc3VsdElkcyk7XG5cdFx0XHRjb25zdCBhcHBSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyxcblx0XHRcdFx0eyBxdWVyeU1pbkxlbmd0aDogdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBxdWVyeUFnYWluc3Q6IHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgfSxcblx0XHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHNcblx0XHRcdCk7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChhcHBSZXNwb25zZS5yZXN1bHRzKTtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiUmVzdWx0cyByZWJ1aWx0LlwiKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQXBwUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBBcHBQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBBcHBQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9