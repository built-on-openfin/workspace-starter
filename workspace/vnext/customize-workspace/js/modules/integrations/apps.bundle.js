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
            const uniqueTags = [...new Set(tags)].sort();
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
            for (const app of apps) {
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
            const lastResultIds = this._lastResultIds.slice();
            const appResponse = await this.getResults(this._lastQuery, this._lastCLIFilters, { queryMinLength: this._lastQueryMinLength, queryAgainst: this._lastQueryAgainst }, this._lastAppResults);
            const removeResultIds = lastResultIds.filter((id) => !this._lastResultIds.includes(id));
            if (removeResultIds.length > 0) {
                this._lastResponse.revoke(...removeResultIds);
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQ2xGLElBQUksQ0FBQyxlQUFlLENBQ3BCLENBQUM7WUFDRixNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0YsQ0FBQzs7QUFyV0Q7OztHQUdHO0FBQ3FCLDZCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUw1Qjs7Ozs7OztTQ2xCeEI7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040QztBQUVyQyxNQUFNLFdBQVcsR0FBa0M7SUFDekQsWUFBWSxFQUFFLElBQUkscURBQVcsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL2FwcHMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdENMSUZpbHRlcixcblx0Q0xJRmlsdGVyT3B0aW9uVHlwZSxcblx0Q0xJVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1BcHAgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgSW50ZWdyYXRpb25IZWxwZXJzLCBJbnRlZ3JhdGlvbk1vZHVsZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9pbnRlZ3JhdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIGFwcHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPEFwcFNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUga2V5IHVzZWQgdG8gZmlsdGVyIG91dCBieSB0YWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0hPTUVfVEFHX0ZJTFRFUlMgPSBcInRhZ3NcIjtcblxuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfcHJvdmlkZXJJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5nczogQXBwU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5QWdhaW5zdD86IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBhZ2FpbnN0IGFycmF5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdENMSUZpbHRlcnM/OiBDTElGaWx0ZXJbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgYXBwIHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0QXBwUmVzdWx0cz86IFBsYXRmb3JtQXBwW107XG5cblx0LyoqIFRoZSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGxhc3Qgc2V0IG9mIHJlc3VsdHMgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdElkcz86IHN0cmluZ1tdO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEFwcFNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBcHBQcm92aWRlclwiKTtcblx0XHR0aGlzLl9wcm92aWRlcklkID0gZGVmaW5pdGlvbi5pZDtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXCJ0aGVtZS1jaGFuZ2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMoKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0Y29uc3QgYXBwUmVzcG9uc2U6IEhvbWVTZWFyY2hSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhxdWVyeUxvd2VyLCBmaWx0ZXJzLCBvcHRpb25zKTtcblxuXHRcdHJldHVybiBhcHBSZXNwb25zZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0YXBwOiB7IGFwcElkPzogc3RyaW5nIH07XG5cdFx0XHR9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRcdGlmIChkYXRhPy5hcHA/LmFwcElkKSB7XG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoQXBwKGRhdGEuYXBwLmFwcElkKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgZ2V0UmVzdWx0cyhcblx0XHRxdWVyeUxvd2VyOiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fSxcblx0XHRjYWNoZWRBcHBzPzogUGxhdGZvcm1BcHBbXVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IGFwcHM6IFBsYXRmb3JtQXBwW10gPSBjYWNoZWRBcHBzID8/IChhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0QXBwcygpKTtcblx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyA9IGFwcHM7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zPy5xdWVyeU1pbkxlbmd0aDtcblx0XHR0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0ID0gb3B0aW9ucz8ucXVlcnlBZ2FpbnN0O1xuXHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzID0gZmlsdGVycztcblx0XHRjb25zdCBhcHBTZWFyY2hFbnRyaWVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHMpO1xuXG5cdFx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBbXTtcblxuXHRcdGlmIChhcHBTZWFyY2hFbnRyaWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpbmFsUmVzdWx0cyA9IGFwcFNlYXJjaEVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4ge1xuXHRcdFx0XHRsZXQgdGV4dE1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRsZXQgZmlsdGVyTWF0Y2hGb3VuZCA9IHRydWU7XG5cblx0XHRcdFx0Y29uc3QgaXNDb21tYW5kID0gcXVlcnlMb3dlci5zdGFydHNXaXRoKFwiL1wiKTtcblxuXHRcdFx0XHRpZiAocXVlcnlMb3dlci5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCB8fCBpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHR0ZXh0TWF0Y2hGb3VuZCA9IG9wdGlvbnMucXVlcnlBZ2FpbnN0LnNvbWUoKHRhcmdldCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdChcIi5cIik7XG5cdFx0XHRcdFx0XHRpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWUgPSBlbnRyeVtwYXRoWzBdXTtcblxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5zdGFydHNXaXRoKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocGF0aC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3BlY2lmaWVkVGFyZ2V0ID0gZW50cnlbcGF0aFswXV07XG5cdFx0XHRcdFx0XHRcdGxldCB0YXJnZXRWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cdFx0XHRcdFx0XHRcdGlmIChzcGVjaWZpZWRUYXJnZXQgIT09IHVuZGVmaW5lZCAmJiBzcGVjaWZpZWRUYXJnZXQgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZSA9IHNwZWNpZmllZFRhcmdldFtwYXRoWzFdXTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhxdWVyeUxvd2VyKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB0YXJnZXRWYWx1ZVswXSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUuc29tZSgobWF0Y2hUYXJnZXQpID0+IG1hdGNoVGFyZ2V0LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChxdWVyeUxvd2VyKSlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdGBNYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggc3BlY2lmaWVkIGEgcXVlcnlBZ2FpbnN0IHRhcmdldCB0aGF0IGlzIGFuIGFycmF5IGJ1dCBub3QgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gT25seSBzdHJpbmcgdmFsdWVzIGFuZCBhcnJheXMgYXJlIHN1cHBvcnRlZDogJHtzcGVjaWZpZWRUYXJnZXR9YFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFwiVGhlIG1hbmlmZXN0IGNvbmZpZ3VyYXRpb24gZm9yIHNlYXJjaCBoYXMgYSBxdWVyeUFnYWluc3QgZW50cnkgdGhhdCBoYXMgYSBkZXB0aCBncmVhdGVyIHRoYW4gMS4gWW91IGNhbiBzZWFyY2ggZm9yIGUuZy4gZGF0YS50YWdzIGlmIGRhdGEgaGFzIHRhZ3MgaW4gaXQgYW5kIGl0IGlzIGVpdGhlciBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHRhZ0ZpbHRlcnMgPSBBcnJheS5pc0FycmF5KGZpbHRlcnMpXG5cdFx0XHRcdFx0PyBmaWx0ZXJzLmZpbHRlcigoZikgPT4gZi5pZCA9PT0gQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMpXG5cdFx0XHRcdFx0OiBbXTtcblx0XHRcdFx0aWYgKHRhZ0ZpbHRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGZpbHRlck1hdGNoRm91bmQgPSB0YWdGaWx0ZXJzLnNvbWUoKGZpbHRlcikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlbnRyeS5kYXRhPy5hcHA/LnRhZ3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIub3B0aW9ucy5ldmVyeShcblx0XHRcdFx0XHRcdFx0XHRcdChvcHRpb24pID0+ICFvcHRpb24uaXNTZWxlY3RlZCB8fCBlbnRyeS5kYXRhLmFwcC50YWdzLmluY2x1ZGVzKG9wdGlvbi52YWx1ZSlcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGZpbHRlci5vcHRpb25zLmlzU2VsZWN0ZWQgJiYgZW50cnkuZGF0YT8uYXBwPy50YWdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMoZmlsdGVyLm9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGV4dE1hdGNoRm91bmQgJiYgQXJyYXkuaXNBcnJheShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0dGFncy5wdXNoKC4uLihlbnRyeS5kYXRhLmFwcC50YWdzIGFzIHN0cmluZ1tdKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRleHRNYXRjaEZvdW5kICYmIGZpbHRlck1hdGNoRm91bmQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IGZpbmFsUmVzdWx0cy5tYXAoKGVudHJ5KSA9PiBlbnRyeS5rZXkpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBmaW5hbFJlc3VsdHMsXG5cdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRmaWx0ZXJzOiB0aGlzLmdldFNlYXJjaEZpbHRlcnModGFncy5maWx0ZXIoQm9vbGVhbikpXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBbXTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogW10sXG5cdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdGZpbHRlcnM6IFtdXG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0U2VhcmNoRmlsdGVycyh0YWdzOiBzdHJpbmdbXSk6IENMSUZpbHRlcltdIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdzKSkge1xuXHRcdFx0Y29uc3QgZmlsdGVyczogQ0xJRmlsdGVyW10gPSBbXTtcblx0XHRcdGNvbnN0IHVuaXF1ZVRhZ3MgPSBbLi4ubmV3IFNldCh0YWdzKV0uc29ydCgpO1xuXHRcdFx0Y29uc3QgdGFnRmlsdGVyOiBDTElGaWx0ZXIgPSB7XG5cdFx0XHRcdGlkOiBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUyxcblx0XHRcdFx0dGl0bGU6IFwiVGFnc1wiLFxuXHRcdFx0XHR0eXBlOiBcIk11bHRpU2VsZWN0XCIgYXMgQ0xJRmlsdGVyT3B0aW9uVHlwZS5NdWx0aVNlbGVjdCxcblx0XHRcdFx0b3B0aW9uczogW11cblx0XHRcdH07XG5cblx0XHRcdGZvciAoY29uc3QgdGFnIG9mIHVuaXF1ZVRhZ3MpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFnRmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0dGFnRmlsdGVyLm9wdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdGFnLFxuXHRcdFx0XHRcdFx0aXNTZWxlY3RlZDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmaWx0ZXJzLnB1c2godGFnRmlsdGVyKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwczogUGxhdGZvcm1BcHBbXSk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgYXBwUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykpIHtcblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdFx0Y29uc3QgYWN0aW9uID0geyBuYW1lOiBcIkxhdW5jaCBWaWV3XCIsIGhvdGtleTogXCJlbnRlclwiIH07XG5cdFx0XHRcdGNvbnN0IGVudHJ5OiBQYXJ0aWFsPEhvbWVTZWFyY2hSZXN1bHQ+ID0ge1xuXHRcdFx0XHRcdGtleTogYXBwLmFwcElkLFxuXHRcdFx0XHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0XHRcdFx0ZGF0YTogeyBhcHAsIHByb3ZpZGVySWQ6IHRoaXMuX3Byb3ZpZGVySWQgfVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGNvbnN0IG1hbmlmZXN0VHlwZU1hcHBpbmcgPSB0aGlzLl9zZXR0aW5ncy5tYW5pZmVzdFR5cGVNYXBwaW5nW2FwcC5tYW5pZmVzdFR5cGVdO1xuXG5cdFx0XHRcdGlmIChtYW5pZmVzdFR5cGVNYXBwaW5nICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsICE9PSBudWxsICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwubGVuZ3RoID4gMFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0ZW50cnkubGFiZWwgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWUgIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZS5sZW5ndGggPiAwXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRhY3Rpb24ubmFtZSA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbnRyeS5hY3Rpb25zID0gW2FjdGlvbl07XG5cdFx0XHRcdGVudHJ5Lmljb24gPSB0aGlzLmdldEFwcEljb24oYXBwKTtcblxuXHRcdFx0XHRpZiAoYXBwLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRlbnRyeS5kZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbjtcblx0XHRcdFx0XHRlbnRyeS5zaG9ydERlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZW50cnkudGVtcGxhdGUgPSBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbTtcblx0XHRcdFx0ZW50cnkudGVtcGxhdGVDb250ZW50ID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVBcHAoXG5cdFx0XHRcdFx0YXBwLFxuXHRcdFx0XHRcdGVudHJ5Lmljb24sXG5cdFx0XHRcdFx0YWN0aW9uLm5hbWVcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRhcHBSZXN1bHRzLnB1c2goZW50cnkgYXMgSG9tZVNlYXJjaFJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBSZXN1bHRzO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRBcHBJY29uKGFwcDogUGxhdGZvcm1BcHApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykgJiYgYXBwLmljb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBhcHAuaWNvbnNbMF0uc3JjIGFzIHN0cmluZztcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2xhc3RSZXN1bHRJZHMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlYnVpbGRpbmcgcmVzdWx0cy4uLlwiKTtcblx0XHRcdGNvbnN0IGxhc3RSZXN1bHRJZHMgPSB0aGlzLl9sYXN0UmVzdWx0SWRzLnNsaWNlKCk7XG5cdFx0XHRjb25zdCBhcHBSZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVzdWx0cyhcblx0XHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0XHR0aGlzLl9sYXN0Q0xJRmlsdGVycyxcblx0XHRcdFx0eyBxdWVyeU1pbkxlbmd0aDogdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBxdWVyeUFnYWluc3Q6IHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgfSxcblx0XHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHNcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByZW1vdmVSZXN1bHRJZHMgPSBsYXN0UmVzdWx0SWRzLmZpbHRlcigoaWQpID0+ICF0aGlzLl9sYXN0UmVzdWx0SWRzLmluY2x1ZGVzKGlkKSk7XG5cdFx0XHRpZiAocmVtb3ZlUmVzdWx0SWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZSguLi5yZW1vdmVSZXN1bHRJZHMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoYXBwUmVzcG9uc2UucmVzdWx0cyk7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlc3VsdHMgcmVidWlsdC5cIik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogQXBwUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgQXBwUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==