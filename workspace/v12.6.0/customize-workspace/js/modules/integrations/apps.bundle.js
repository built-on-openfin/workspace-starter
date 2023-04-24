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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBZUE7O0dBRUc7QUFDSSxNQUFNLFdBQVc7SUErRHZCOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQXlDLEVBQ3pDLGFBQTRCLEVBQzVCLE9BQTJCO1FBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsZUFBZSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzVFLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxvQkFBb0I7UUFDaEMsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDNUIsS0FBYSxFQUNiLE9BQW9CLEVBQ3BCLFlBQXdDLEVBQ3hDLE9BR0M7UUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDbEMsTUFBTSxXQUFXLEdBQXVCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVGLE9BQU8sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQ3pCLE1BQWtDLEVBQ2xDLFlBQXdDO1FBRXhDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsRUFBRTtZQUM1QyxNQUFNLElBQUksR0FFTixNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWhCLElBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7Z0JBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekQ7U0FDRDtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFTyxLQUFLLENBQUMsVUFBVSxDQUN2QixVQUFrQixFQUNsQixPQUFvQixFQUNwQixPQUdDLEVBQ0QsVUFBMEI7UUFFMUIsTUFBTSxJQUFJLEdBQWtCLFVBQVUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sRUFBRSxjQUFjLENBQUM7UUFDbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RSxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7UUFFMUIsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN0RCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUU1QixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEVBQUU7b0JBQzdELGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNyRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUN0QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRW5DLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO2dDQUNwQyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7Z0NBQzlDLElBQUksU0FBUyxFQUFFO29DQUNkLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQ0FDMUM7Z0NBQ0QsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUN4Qzt5QkFDRDs2QkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM3QixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLElBQUksV0FBOEIsQ0FBQzs0QkFDbkMsSUFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7Z0NBQzlELFdBQVcsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3ZDOzRCQUVELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO2dDQUNwQyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7Z0NBQzlDLElBQUksU0FBUyxFQUFFO29DQUNkLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQ0FDMUM7Z0NBQ0QsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUN4Qzs0QkFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0NBQy9CLElBQ0MsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDO29DQUN0QixPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO29DQUNsQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQ2xGO29DQUNELE9BQU8sSUFBSSxDQUFDO2lDQUNaO2dDQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQixnS0FBZ0ssZUFBZSxFQUFFLENBQ2pMLENBQUM7NkJBQ0Y7eUJBQ0Q7NkJBQU07NEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2hCLDJNQUEyTSxDQUMzTSxDQUFDO3lCQUNGO3dCQUNELE9BQU8sS0FBSyxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO2lCQUNIO2dCQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUN4QyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsaUJBQWlCLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ04sSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUM3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNsQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksS0FBSyxTQUFTLEVBQUU7Z0NBQ3hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQzFCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQzVFLENBQUM7NkJBQ0Y7eUJBQ0Q7NkJBQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEtBQUssU0FBUyxFQUFFOzRCQUM1RSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDMUQ7d0JBQ0QsT0FBTyxJQUFJLENBQUM7b0JBQ2IsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxjQUFjLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQWlCLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsT0FBTyxjQUFjLElBQUksZ0JBQWdCLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3RCxPQUFPO2dCQUNOLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNwRDthQUNELENBQUM7U0FDRjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE9BQU87WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRTthQUNYO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFjO1FBQ3RDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QixNQUFNLE9BQU8sR0FBZ0IsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sU0FBUyxHQUFjO2dCQUM1QixFQUFFLEVBQUUsV0FBVyxDQUFDLGlCQUFpQjtnQkFDakMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGFBQWdEO2dCQUN0RCxPQUFPLEVBQUUsRUFBRTthQUNYLENBQUM7WUFFRixLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDckMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLEtBQUssRUFBRSxHQUFHO3dCQUNWLFVBQVUsRUFBRSxLQUFLO3FCQUNqQixDQUFDLENBQUM7aUJBQ0g7YUFDRDtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEIsT0FBTyxPQUFPLENBQUM7U0FDZjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVPLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxJQUFtQjtRQUM3RCxNQUFNLFVBQVUsR0FBdUIsRUFBRSxDQUFDO1FBQzFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO2dCQUN4RCxNQUFNLEtBQUssR0FBOEI7b0JBQ3hDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSztvQkFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7b0JBQ2hCLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtpQkFDM0MsQ0FBQztnQkFFRixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVqRixJQUFJLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtvQkFDdEMsSUFDQyxtQkFBbUIsQ0FBQyxVQUFVLEtBQUssU0FBUzt3QkFDNUMsbUJBQW1CLENBQUMsVUFBVSxLQUFLLElBQUk7d0JBQ3ZDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN4Qzt3QkFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztxQkFDN0M7b0JBQ0QsSUFDQyxtQkFBbUIsQ0FBQyxVQUFVLEtBQUssU0FBUzt3QkFDNUMsbUJBQW1CLENBQUMsVUFBVSxLQUFLLElBQUk7d0JBQ3ZDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN4Qzt3QkFDRCxNQUFNLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztxQkFDN0M7aUJBQ0Q7Z0JBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRWxDLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7b0JBQ2xDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztvQkFDcEMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7aUJBQ3pDO2dCQUVELEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBOEIsQ0FBQztnQkFDaEQsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUMvRSxHQUFHLEVBQ0gsS0FBSyxDQUFDLElBQUksRUFDVixNQUFNLENBQUMsSUFBSSxDQUNYLENBQUM7Z0JBRUYsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUF5QixDQUFDLENBQUM7YUFDM0M7U0FDRDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFFTyxVQUFVLENBQUMsR0FBZ0I7UUFDbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWEsQ0FBQztTQUNsQztJQUNGLENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYztRQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsRCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQ3hDLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLGVBQWUsRUFDcEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFDbEYsSUFBSSxDQUFDLGVBQWUsQ0FDcEIsQ0FBQztZQUNGLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RixJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdEM7SUFDRixDQUFDOztBQXRXRDs7O0dBR0c7QUFDcUIsNkJBQWlCLEdBQUcsTUFBTSxDQUFDOzs7Ozs7O1NDdkJwRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjRDO0FBRXJDLE1BQU0sV0FBVyxHQUFrQztJQUN6RCxZQUFZLEVBQUUsSUFBSSxxREFBVyxFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvYXBwcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9hcHBzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElGaWx0ZXJPcHRpb25UeXBlLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgYXBwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcFByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8QXBwU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBrZXkgdXNlZCB0byBmaWx0ZXIgb3V0IGJ5IHRhZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfSE9NRV9UQUdfRklMVEVSUyA9IFwidGFnc1wiO1xuXG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9wcm92aWRlcklkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBBcHBTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlBZ2FpbnN0Pzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IGFnYWluc3QgYXJyYXkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0Q0xJRmlsdGVycz86IENMSUZpbHRlcltdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBhcHAgcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RBcHBSZXN1bHRzPzogUGxhdGZvcm1BcHBbXTtcblxuXHQvKiogVGhlIGxpc3Qgb2YgdGhlIGlkcyBvZiB0aGUgbGFzdCBzZXQgb2YgcmVzdWx0cyAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0SWRzPzogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248QXBwU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkFwcFByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3Byb3ZpZGVySWQgPSBkZWZpbml0aW9uLmlkO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cygpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMuX2xhc3RSZXNwb25zZSA9IGxhc3RSZXNwb25zZTtcblx0XHRjb25zdCBhcHBSZXNwb25zZTogSG9tZVNlYXJjaFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXN1bHRzKHF1ZXJ5TG93ZXIsIGZpbHRlcnMsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIGFwcFJlc3BvbnNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRhcHA6IHsgYXBwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0aWYgKGRhdGE/LmFwcD8uYXBwSWQpIHtcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5sYXVuY2hBcHAoZGF0YS5hcHAuYXBwSWQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBnZXRSZXN1bHRzKFxuXHRcdHF1ZXJ5TG93ZXI6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9LFxuXHRcdGNhY2hlZEFwcHM/OiBQbGF0Zm9ybUFwcFtdXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0Y29uc3QgYXBwczogUGxhdGZvcm1BcHBbXSA9IGNhY2hlZEFwcHMgPz8gKGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRBcHBzKCkpO1xuXHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzID0gYXBwcztcblx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnM/LnF1ZXJ5TWluTGVuZ3RoO1xuXHRcdHRoaXMuX2xhc3RRdWVyeUFnYWluc3QgPSBvcHRpb25zPy5xdWVyeUFnYWluc3Q7XG5cdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMgPSBmaWx0ZXJzO1xuXHRcdGNvbnN0IGFwcFNlYXJjaEVudHJpZXMgPSBhd2FpdCB0aGlzLm1hcEFwcEVudHJpZXNUb1NlYXJjaEVudHJpZXMoYXBwcyk7XG5cblx0XHRjb25zdCB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0aWYgKGFwcFNlYXJjaEVudHJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgZmluYWxSZXN1bHRzID0gYXBwU2VhcmNoRW50cmllcy5maWx0ZXIoKGVudHJ5KSA9PiB7XG5cdFx0XHRcdGxldCB0ZXh0TWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdGxldCBmaWx0ZXJNYXRjaEZvdW5kID0gdHJ1ZTtcblxuXHRcdFx0XHRjb25zdCBpc0NvbW1hbmQgPSBxdWVyeUxvd2VyLnN0YXJ0c1dpdGgoXCIvXCIpO1xuXG5cdFx0XHRcdGlmIChxdWVyeUxvd2VyLmxlbmd0aCA+PSBvcHRpb25zLnF1ZXJ5TWluTGVuZ3RoIHx8IGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdHRleHRNYXRjaEZvdW5kID0gb3B0aW9ucy5xdWVyeUFnYWluc3Quc29tZSgodGFyZ2V0KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRWYWx1ZSA9IGVudHJ5W3BhdGhbMF1dO1xuXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb3dlclRhcmdldCA9IHRhcmdldFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzQ29tbWFuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LnN0YXJ0c1dpdGgocXVlcnlMb3dlcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBsb3dlclRhcmdldC5pbmNsdWRlcyhxdWVyeUxvd2VyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzcGVjaWZpZWRUYXJnZXQgPSBlbnRyeVtwYXRoWzBdXTtcblx0XHRcdFx0XHRcdFx0bGV0IHRhcmdldFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcblx0XHRcdFx0XHRcdFx0aWYgKHNwZWNpZmllZFRhcmdldCAhPT0gdW5kZWZpbmVkICYmIHNwZWNpZmllZFRhcmdldCAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldFZhbHVlID0gc3BlY2lmaWVkVGFyZ2V0W3BhdGhbMV1dO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvd2VyVGFyZ2V0ID0gdGFyZ2V0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21tYW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbG93ZXJUYXJnZXQuc3RhcnRzV2l0aChxdWVyeUxvd2VyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxvd2VyVGFyZ2V0LmluY2x1ZGVzKHF1ZXJ5TG93ZXIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0VmFsdWUubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHRhcmdldFZhbHVlWzBdID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRWYWx1ZS5zb21lKChtYXRjaFRhcmdldCkgPT4gbWF0Y2hUYXJnZXQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHF1ZXJ5TG93ZXIpKVxuXHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0YE1hbmlmZXN0IGNvbmZpZ3VyYXRpb24gZm9yIHNlYXJjaCBzcGVjaWZpZWQgYSBxdWVyeUFnYWluc3QgdGFyZ2V0IHRoYXQgaXMgYW4gYXJyYXkgYnV0IG5vdCBhbiBhcnJheSBvZiBzdHJpbmdzLiBPbmx5IHN0cmluZyB2YWx1ZXMgYW5kIGFycmF5cyBhcmUgc3VwcG9ydGVkOiAke3NwZWNpZmllZFRhcmdldH1gXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XCJUaGUgbWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3Igc2VhcmNoIGhhcyBhIHF1ZXJ5QWdhaW5zdCBlbnRyeSB0aGF0IGhhcyBhIGRlcHRoIGdyZWF0ZXIgdGhhbiAxLiBZb3UgY2FuIHNlYXJjaCBmb3IgZS5nLiBkYXRhLnRhZ3MgaWYgZGF0YSBoYXMgdGFncyBpbiBpdCBhbmQgaXQgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdGFnRmlsdGVycyA9IEFycmF5LmlzQXJyYXkoZmlsdGVycylcblx0XHRcdFx0XHQ/IGZpbHRlcnMuZmlsdGVyKChmKSA9PiBmLmlkID09PSBBcHBQcm92aWRlci5fSE9NRV9UQUdfRklMVEVSUylcblx0XHRcdFx0XHQ6IFtdO1xuXHRcdFx0XHRpZiAodGFnRmlsdGVycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0ZmlsdGVyTWF0Y2hGb3VuZCA9IHRhZ0ZpbHRlcnMuc29tZSgoZmlsdGVyKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGVudHJ5LmRhdGE/LmFwcD8udGFncyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbHRlci5vcHRpb25zLmV2ZXJ5KFxuXHRcdFx0XHRcdFx0XHRcdFx0KG9wdGlvbikgPT4gIW9wdGlvbi5pc1NlbGVjdGVkIHx8IGVudHJ5LmRhdGEuYXBwLnRhZ3MuaW5jbHVkZXMob3B0aW9uLnZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsdGVyLm9wdGlvbnMuaXNTZWxlY3RlZCAmJiBlbnRyeS5kYXRhPy5hcHA/LnRhZ3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZW50cnkuZGF0YS5hcHAudGFncy5pbmNsdWRlcyhmaWx0ZXIub3B0aW9ucy52YWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0ZXh0TWF0Y2hGb3VuZCAmJiBBcnJheS5pc0FycmF5KGVudHJ5LmRhdGE/LmFwcD8udGFncykpIHtcblx0XHRcdFx0XHR0YWdzLnB1c2goLi4uKGVudHJ5LmRhdGEuYXBwLnRhZ3MgYXMgc3RyaW5nW10pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGV4dE1hdGNoRm91bmQgJiYgZmlsdGVyTWF0Y2hGb3VuZDtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzdWx0SWRzID0gZmluYWxSZXN1bHRzLm1hcCgoZW50cnkpID0+IGVudHJ5LmtleSk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IGZpbmFsUmVzdWx0cyxcblx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdGZpbHRlcnM6IHRoaXMuZ2V0U2VhcmNoRmlsdGVycyh0YWdzLmZpbHRlcihCb29sZWFuKSlcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0dGhpcy5fbGFzdFJlc3VsdElkcyA9IFtdO1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBbXSxcblx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0ZmlsdGVyczogW11cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRTZWFyY2hGaWx0ZXJzKHRhZ3M6IHN0cmluZ1tdKTogQ0xJRmlsdGVyW10ge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRhZ3MpKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJzOiBDTElGaWx0ZXJbXSA9IFtdO1xuXHRcdFx0Y29uc3QgdW5pcXVlVGFncyA9IFsuLi5uZXcgU2V0KHRhZ3Muc29ydCgpKV07XG5cdFx0XHRjb25zdCB0YWdGaWx0ZXI6IENMSUZpbHRlciA9IHtcblx0XHRcdFx0aWQ6IEFwcFByb3ZpZGVyLl9IT01FX1RBR19GSUxURVJTLFxuXHRcdFx0XHR0aXRsZTogXCJUYWdzXCIsXG5cdFx0XHRcdHR5cGU6IFwiTXVsdGlTZWxlY3RcIiBhcyBDTElGaWx0ZXJPcHRpb25UeXBlLk11bHRpU2VsZWN0LFxuXHRcdFx0XHRvcHRpb25zOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChjb25zdCB0YWcgb2YgdW5pcXVlVGFncykge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWdGaWx0ZXIub3B0aW9ucykpIHtcblx0XHRcdFx0XHR0YWdGaWx0ZXIub3B0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHRcdHZhbHVlOiB0YWcsXG5cdFx0XHRcdFx0XHRpc1NlbGVjdGVkOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZpbHRlcnMucHVzaCh0YWdGaWx0ZXIpO1xuXHRcdFx0cmV0dXJuIGZpbHRlcnM7XG5cdFx0fVxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgbWFwQXBwRW50cmllc1RvU2VhcmNoRW50cmllcyhhcHBzOiBQbGF0Zm9ybUFwcFtdKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRjb25zdCBhcHBSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGFwcCA9IGFwcHNbaV07XG5cdFx0XHRcdGNvbnN0IGFjdGlvbiA9IHsgbmFtZTogXCJMYXVuY2ggVmlld1wiLCBob3RrZXk6IFwiZW50ZXJcIiB9O1xuXHRcdFx0XHRjb25zdCBlbnRyeTogUGFydGlhbDxIb21lU2VhcmNoUmVzdWx0PiA9IHtcblx0XHRcdFx0XHRrZXk6IGFwcC5hcHBJZCxcblx0XHRcdFx0XHR0aXRsZTogYXBwLnRpdGxlLFxuXHRcdFx0XHRcdGRhdGE6IHsgYXBwLCBwcm92aWRlcklkOiB0aGlzLl9wcm92aWRlcklkIH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRjb25zdCBtYW5pZmVzdFR5cGVNYXBwaW5nID0gdGhpcy5fc2V0dGluZ3MubWFuaWZlc3RUeXBlTWFwcGluZ1thcHAubWFuaWZlc3RUeXBlXTtcblxuXHRcdFx0XHRpZiAobWFuaWZlc3RUeXBlTWFwcGluZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZU1hcHBpbmcuZW50cnlMYWJlbCAhPT0gbnVsbCAmJlxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsLmxlbmd0aCA+IDBcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGVudHJ5LmxhYmVsID0gbWFuaWZlc3RUeXBlTWFwcGluZy5lbnRyeUxhYmVsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWUgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlTWFwcGluZy5hY3Rpb25OYW1lICE9PSBudWxsICYmXG5cdFx0XHRcdFx0XHRtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWUubGVuZ3RoID4gMFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0YWN0aW9uLm5hbWUgPSBtYW5pZmVzdFR5cGVNYXBwaW5nLmFjdGlvbk5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZW50cnkuYWN0aW9ucyA9IFthY3Rpb25dO1xuXHRcdFx0XHRlbnRyeS5pY29uID0gdGhpcy5nZXRBcHBJY29uKGFwcCk7XG5cblx0XHRcdFx0aWYgKGFwcC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZW50cnkuZGVzY3JpcHRpb24gPSBhcHAuZGVzY3JpcHRpb247XG5cdFx0XHRcdFx0ZW50cnkuc2hvcnREZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVudHJ5LnRlbXBsYXRlID0gXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b207XG5cdFx0XHRcdGVudHJ5LnRlbXBsYXRlQ29udGVudCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQXBwKFxuXHRcdFx0XHRcdGFwcCxcblx0XHRcdFx0XHRlbnRyeS5pY29uLFxuXHRcdFx0XHRcdGFjdGlvbi5uYW1lXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0YXBwUmVzdWx0cy5wdXNoKGVudHJ5IGFzIEhvbWVTZWFyY2hSZXN1bHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwUmVzdWx0cztcblx0fVxuXG5cdHByaXZhdGUgZ2V0QXBwSWNvbihhcHA6IFBsYXRmb3JtQXBwKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaWNvbnMpICYmIGFwcC5pY29ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRyZXR1cm4gYXBwLmljb25zWzBdLnNyYyBhcyBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyByZWJ1aWxkUmVzdWx0cygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9sYXN0UmVzdWx0SWRzKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJSZWJ1aWxkaW5nIHJlc3VsdHMuLi5cIik7XG5cdFx0XHRjb25zdCBsYXN0UmVzdWx0SWRzID0gdGhpcy5fbGFzdFJlc3VsdElkcy5zbGljZSgpO1xuXHRcdFx0Y29uc3QgYXBwUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldFJlc3VsdHMoXG5cdFx0XHRcdHRoaXMuX2xhc3RRdWVyeSxcblx0XHRcdFx0dGhpcy5fbGFzdENMSUZpbHRlcnMsXG5cdFx0XHRcdHsgcXVlcnlNaW5MZW5ndGg6IHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCwgcXVlcnlBZ2FpbnN0OiB0aGlzLl9sYXN0UXVlcnlBZ2FpbnN0IH0sXG5cdFx0XHRcdHRoaXMuX2xhc3RBcHBSZXN1bHRzXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgcmVtb3ZlUmVzdWx0SWRzID0gbGFzdFJlc3VsdElkcy5maWx0ZXIoKGlkKSA9PiAhdGhpcy5fbGFzdFJlc3VsdElkcy5pbmNsdWRlcyhpZCkpO1xuXHRcdFx0aWYgKHJlbW92ZVJlc3VsdElkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoLi4ucmVtb3ZlUmVzdWx0SWRzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKGFwcFJlc3BvbnNlLnJlc3VsdHMpO1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJSZXN1bHRzIHJlYnVpbHQuXCIpO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHBQcm92aWRlciB9IGZyb20gXCIuL2ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbaWQ6IHN0cmluZ106IEFwcFByb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IEFwcFByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=