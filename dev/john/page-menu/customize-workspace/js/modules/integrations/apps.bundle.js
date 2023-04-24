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
        const apps = cachedApps ?? await this._integrationHelpers.getApps();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUM5RSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUNsRixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdEM7SUFDRixDQUFDOztBQS9WRDs7O0dBR0c7QUFDcUIsNkJBQWlCLEdBQUcsTUFBTSxDQUFDOzs7Ozs7O1NDdkJwRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjRDO0FBRXJDLE1BQU0sV0FBVyxHQUFrQztJQUN6RCxZQUFZLEVBQUUsSUFBSSxxREFBVyxFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElGaWx0ZXJPcHRpb25UeXBlLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYXBwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QXBwU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBrZXkgdXNlZCB0byBmaWx0ZXIgb3V0IGJ5IHRhZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfSE9NRV9UQUdfRklMVEVSUyA9IFwidGFnc1wiO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9wcm92aWRlcklkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBBcHBTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlBZ2FpbnN0Pzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0Q0xJRmlsdGVycz86IENMSUZpbHRlcltdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBhcHAgcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RBcHBSZXN1bHRzPzogUGxhdGZvcm1BcHBbXTtcblxuXHQvKiogVGhlIGxpc3Qgb2YgdGhlIGlkcyBvZiB0aGUgbGFzdCBzZXQgb2YgcmVzdWx0cyAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0SWRzPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcFByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3Byb3ZpZGVySWQgPSBkZWZpbml0aW9uLmlkO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cygpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMuX2xhc3RSZXNwb25zZSA9IGxhc3RSZXNwb25zZTtcblx0XHRjb25zdCBhcHBSZXNwb25zZTogSG9tZVNlYXJjaFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXN1bHRzKHF1ZXJ5TG93ZXIsIGZpbHRlcnMsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIGFwcFJlc3BvbnNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRhcHA6IHsgYXBwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0aWYgKGRhdGE/LmFwcD8uYXBwSWQpIHtcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5sYXVuY2hBcHAoZGF0YS5hcHAuYXBwSWQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBnZXRSZXN1bHRzKFxuXHRcdHF1ZXJ5TG93ZXI6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9LFxuXHRcdGNhY2hlZEFwcHM/OiBQbGF0Zm9ybUFwcFtdXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgYXBwczogUGxhdGZvcm1BcHBbXSA9IGNhY2hlZEFwcHMgPz8gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEFwcHMoKTtcblx0XHR0aGlzLl9sYXN0QXBwUmVzdWx0cyA9IGFwcHM7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHR0aGlzLl9sYXN0UXVlcnlNaW5MZW5ndGggPSBvcHRpb25zPy5xdWVyeU1pbkxlbmd0aDtcblx0XHR0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0ID0gb3B0aW9ucz8ucXVlcnlBZ2FpbnN0O1xuXHRcdHRoaXMuX2xhc3RDTElGaWx0ZXJzID0gZmlsdGVycztcblx0XHRjb25zdCBhcHBTZWFyY2hFbnRyaWVzID0gYXdhaXQgdGhpcy5tYXBBcHBFbnRyaWVzVG9TZWFyY2hFbnRyaWVzKGFwcHMpO1xuXG5cdFx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBbXTtcblxuXHRcdGlmIChhcHBTZWFyY2hFbnRyaWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpbmFsUmVzdWx0cyA9IGFwcFNlYXJjaEVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4ge1xuXHRcdFx0XHRsZXQgdGV4dE1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRsZXQgZmlsdGVyTWF0Y2hGb3VuZCA9IHRydWU7XG5cblx0XHRcdFx0Y29uc3QgaXNDb21tYW5kID0gcXVlcnlMb3dlci5zdGFydHNXaXRoKFwiL1wiKTtcblxuXHRcdFx0XHRpZiAocXVlcnlMb3dlci5sZW5ndGggPj0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCB8fCBpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHR0ZXh0TWF0Y2hGb3VuZCA9IG9wdGlvbnMucXVlcnlBZ2FpbnN0LnNvbWUoKHRhcmdldCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdChcIi5cIik7XG5cdFx0XHRcdFx0XHRpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWUgPSBlbnRyeVtwYXRoWzBdXTtcblxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG93ZXJUYXJnZXQgPSB0YXJnZXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpc0NvbW1hbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5zdGFydHNXaXRoKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuaW5jbHVkZXMocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocGF0aC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3BlY2lmaWVkVGFyZ2V0ID0gZW50cnlbcGF0aFswXV07XG5cdFx0XHRcdFx0XHRcdGxldCB0YXJnZXRWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cdFx0XHRcdFx0XHRcdGlmIChzcGVjaWZpZWRUYXJnZXQgIT09IHVuZGVmaW5lZCAmJiBzcGVjaWZpZWRUYXJnZXQgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZSA9IHNwZWNpZmllZFRhcmdldFtwYXRoWzFdXTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhxdWVyeUxvd2VyKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB0YXJnZXRWYWx1ZVswXSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUuc29tZSgobWF0Y2hUYXJnZXQpID0+IG1hdGNoVGFyZ2V0LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChxdWVyeUxvd2VyKSlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdGBNYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciBzZWFyY2ggc3BlY2lmaWVkIGEgcXVlcnlBZ2FpbnN0IHRhcmdldCB0aGF0IGlzIGFuIGFycmF5IGJ1dCBub3QgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gT25seSBzdHJpbmcgdmFsdWVzIGFuZCBhcnJheXMgYXJlIHN1cHBvcnRlZDogJHtzcGVjaWZpZWRUYXJnZXR9YFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFwiVGhlIG1hbmlmZXN0IGNvbmZpZ3VyYXRpb24gZm9yIHNlYXJjaCBoYXMgYSBxdWVyeUFnYWluc3QgZW50cnkgdGhhdCBoYXMgYSBkZXB0aCBncmVhdGVyIHRoYW4gMS4gWW91IGNhbiBzZWFyY2ggZm9yIGUuZy4gZGF0YS50YWdzIGlmIGRhdGEgaGFzIHRhZ3MgaW4gaXQgYW5kIGl0IGlzIGVpdGhlciBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHRhZ0ZpbHRlcnMgPSBBcnJheS5pc0FycmF5KGZpbHRlcnMpXG5cdFx0XHRcdFx0PyBmaWx0ZXJzLmZpbHRlcigoZikgPT4gZi5pZCA9PT0gQXBwUHJvdmlkZXIuX0hPTUVfVEFHX0ZJTFRFUlMpXG5cdFx0XHRcdFx0OiBbXTtcblx0XHRcdFx0aWYgKHRhZ0ZpbHRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGZpbHRlck1hdGNoRm91bmQgPSB0YWdGaWx0ZXJzLnNvbWUoKGZpbHRlcikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlbnRyeS5kYXRhPy5hcHA/LnRhZ3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIub3B0aW9ucy5ldmVyeShcblx0XHRcdFx0XHRcdFx0XHRcdChvcHRpb24pID0+ICFvcHRpb24uaXNTZWxlY3RlZCB8fCBlbnRyeS5kYXRhLmFwcC50YWdzLmluY2x1ZGVzKG9wdGlvbi52YWx1ZSlcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGZpbHRlci5vcHRpb25zLmlzU2VsZWN0ZWQgJiYgZW50cnkuZGF0YT8uYXBwPy50YWdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMoZmlsdGVyLm9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGV4dE1hdGNoRm91bmQgJiYgQXJyYXkuaXNBcnJheShlbnRyeS5kYXRhPy5hcHA/LnRhZ3MpKSB7XG5cdFx0XHRcdFx0dGFncy5wdXNoKC4uLihlbnRyeS5kYXRhLmFwcC50YWdzIGFzIHN0cmluZ1tdKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRleHRNYXRjaEZvdW5kICYmIGZpbHRlck1hdGNoRm91bmQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IGZpbmFsUmVzdWx0cy5tYXAoKGVudHJ5KSA9PiBlbnRyeS5rZXkpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBmaW5hbFJlc3VsdHMsXG5cdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRmaWx0ZXJzOiB0aGlzLmdldFNlYXJjaEZpbHRlcnModGFncy5maWx0ZXIoQm9vbGVhbikpXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHRoaXMuX2xhc3RSZXN1bHRJZHMgPSBbXTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogW10sXG5cdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdGZpbHRlcnM6IFtdXG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0U2VhcmNoRmlsdGVycyh0YWdzOiBzdHJpbmdbXSk6IENMSUZpbHRlcltdIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdzKSkge1xuXHRcdFx0Y29uc3QgZmlsdGVyczogQ0xJRmlsdGVyW10gPSBbXTtcblx0XHRcdGNvbnN0IHVuaXF1ZVRhZ3MgPSBbLi4ubmV3IFNldCh0YWdzLnNvcnQoKSldO1xuXHRcdFx0Y29uc3QgdGFnRmlsdGVyOiBDTElGaWx0ZXIgPSB7XG5cdFx0XHRcdGlkOiBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUyxcblx0XHRcdFx0dGl0bGU6IFwiVGFnc1wiLFxuXHRcdFx0XHR0eXBlOiBcIk11bHRpU2VsZWN0XCIgYXMgQ0xJRmlsdGVyT3B0aW9uVHlwZS5NdWx0aVNlbGVjdCxcblx0XHRcdFx0b3B0aW9uczogW11cblx0XHRcdH07XG5cblx0XHRcdGZvciAoY29uc3QgdGFnIG9mIHVuaXF1ZVRhZ3MpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFnRmlsdGVyLm9wdGlvbnMpKSB7XG5cdFx0XHRcdFx0dGFnRmlsdGVyLm9wdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdGFnLFxuXHRcdFx0XHRcdFx0aXNTZWxlY3RlZDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmaWx0ZXJzLnB1c2godGFnRmlsdGVyKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwczogUGxhdGZvcm1BcHBbXSk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgYXBwUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBhcHAgPSBhcHBzW2ldO1xuXHRcdFx0XHRjb25zdCBhY3Rpb24gPSB7IG5hbWU6IFwiTGF1bmNoIFZpZXdcIiwgaG90a2V5OiBcImVudGVyXCIgfTtcblx0XHRcdFx0Y29uc3QgZW50cnk6IFBhcnRpYWw8SG9tZVNlYXJjaFJlc3VsdD4gPSB7XG5cdFx0XHRcdFx0a2V5OiBhcHAuYXBwSWQsXG5cdFx0XHRcdFx0dGl0bGU6IGFwcC50aXRsZSxcblx0XHRcdFx0XHRkYXRhOiB7IGFwcCwgcHJvdmlkZXJJZDogdGhpcy5fcHJvdmlkZXJJZCB9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Y29uc3QgbWFuaWZlc3RUeXBlTWFwcGluZyA9IHRoaXMuX3NldHRpbmdzLm1hbmlmZXN0VHlwZU1hcHBpbmdbYXBwLm1hbmlmZXN0VHlwZV07XG5cblx0XHRcdFx0aWYgKG1hbmlmZXN0VHlwZU1hcHBpbmcgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmVudHJ5TGFiZWwgIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbC5sZW5ndGggPiAwXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRlbnRyeS5sYWJlbCA9IG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuYWN0aW9uTmFtZSAhPT0gbnVsbCAmJlxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lLmxlbmd0aCA+IDBcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGFjdGlvbi5uYW1lID0gbWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVudHJ5LmFjdGlvbnMgPSBbYWN0aW9uXTtcblx0XHRcdFx0ZW50cnkuaWNvbiA9IHRoaXMuZ2V0QXBwSWNvbihhcHApO1xuXG5cdFx0XHRcdGlmIChhcHAuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGVudHJ5LmRlc2NyaXB0aW9uID0gYXBwLmRlc2NyaXB0aW9uO1xuXHRcdFx0XHRcdGVudHJ5LnNob3J0RGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbnRyeS50ZW1wbGF0ZSA9IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tO1xuXHRcdFx0XHRlbnRyeS50ZW1wbGF0ZUNvbnRlbnQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUFwcChcblx0XHRcdFx0XHRhcHAsXG5cdFx0XHRcdFx0ZW50cnkuaWNvbixcblx0XHRcdFx0XHRhY3Rpb24ubmFtZVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGFwcFJlc3VsdHMucHVzaChlbnRyeSBhcyBIb21lU2VhcmNoUmVzdWx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFwcFJlc3VsdHM7XG5cdH1cblxuXHRwcml2YXRlIGdldEFwcEljb24oYXBwOiBQbGF0Zm9ybUFwcCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmljb25zKSAmJiBhcHAuaWNvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIGFwcC5pY29uc1swXS5zcmMgYXMgc3RyaW5nO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgcmVidWlsZFJlc3VsdHMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYodGhpcy5fbGFzdFJlc3BvbnNlICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9sYXN0UmVzdWx0SWRzKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJSZWJ1aWxkaW5nIHJlc3VsdHMuLi5cIik7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmV2b2tlKC4uLnRoaXMuX2xhc3RSZXN1bHRJZHMpO1xuXHRcdFx0Y29uc3QgYXBwUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHModGhpcy5fbGFzdFF1ZXJ5LCB0aGlzLl9sYXN0Q0xJRmlsdGVycyxcblx0XHRcdFx0eyBxdWVyeU1pbkxlbmd0aDogdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBxdWVyeUFnYWluc3Q6IHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgfSxcblx0XHRcdFx0dGhpcy5fbGFzdEFwcFJlc3VsdHMpO1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQoYXBwUmVzcG9uc2UucmVzdWx0cyk7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlc3VsdHMgcmVidWlsdC5cIik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogQXBwUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgQXBwUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==