/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/integrations/pages/integration.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/integrations/pages/integration.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PagesProvider: () => (/* binding */ PagesProvider)
/* harmony export */ });
/**
 * Implement the integration provider for pages.
 */
class PagesProvider {
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
        this._logger = loggerCreator("PagesProvider");
        this._definition = definition;
        if (this._integrationHelpers.subscribeLifecycleEvent) {
            this._integrationHelpers.subscribeLifecycleEvent("page-changed", async (platform, unknownPayload) => {
                const payload = unknownPayload;
                if (payload.action === "create") {
                    await this.rebuildResults(platform);
                }
                else if (payload.action === "update") {
                    const lastResult = this._lastResults?.find((res) => res.key === payload.id);
                    if (lastResult && payload.page) {
                        lastResult.title = payload.page.title;
                        lastResult.data.workspaceTitle = payload.page.title;
                        lastResult.templateContent.data.title = payload.page.title;
                        this.resultAddUpdate([lastResult]);
                    }
                }
                else if (payload.action === "delete") {
                    this.resultRemove(payload.id);
                }
            });
            this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
                if (this._integrationHelpers?.getPlatform) {
                    const platform = this._integrationHelpers.getPlatform();
                    await this.rebuildResults(platform);
                }
            });
        }
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
     * @param options.queryMinLength The minimum length before a query is actioned.
     * @param options.queryAgainst The fields in the data to query against.
     * @param options.isSuggestion Is the query from a suggestion.
     * @returns The list of results and new filters.
     */
    async getSearchResults(query, filters, lastResponse, options) {
        let pageResults = [];
        if (this._integrationHelpers?.getPlatform) {
            const platform = this._integrationHelpers.getPlatform();
            const pages = await platform.Storage.getPages();
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            const queryLower = query.toLowerCase();
            this._lastResponse = lastResponse;
            this._lastQuery = queryLower;
            this._lastQueryMinLength = options.queryMinLength;
            pageResults = await this.buildResults(pages, queryLower, options.queryMinLength, colorScheme);
            this._lastResults = pageResults;
        }
        return {
            results: pageResults
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
            if (data?.pageId) {
                handled = true;
                if (result.action.name === PagesProvider._ACTION_LAUNCH_PAGE) {
                    if (this._integrationHelpers?.getPlatform && this._integrationHelpers?.launchPage) {
                        const platform = this._integrationHelpers.getPlatform();
                        const pageToLaunch = await platform.Storage.getPage(data.pageId);
                        await this._integrationHelpers.launchPage(pageToLaunch, undefined, this._logger);
                    }
                }
                else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
                    if (this._integrationHelpers?.getPlatform) {
                        const platform = this._integrationHelpers.getPlatform();
                        await platform.Storage.deletePage(data.pageId);
                        // Deleting the page will eventually trigger the "delete" lifecycle
                        // event which will remove it from the result list
                    }
                }
                else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE) {
                    if (this._integrationHelpers?.share) {
                        await this._integrationHelpers.share({ type: "page", pageId: data.pageId });
                    }
                }
                else {
                    handled = false;
                    this._logger?.warn(`Unrecognized action for page selection: ${data.pageId}`);
                }
            }
        }
        return handled;
    }
    /**
     * Get the template for a page.
     * @param id The id of the item.
     * @param title The title of the page.
     * @param shareEnabled Is sharing enabled.
     * @param colorScheme The current color scheme.
     * @returns The home result.
     */
    async getPageTemplate(id, title, shareEnabled, colorScheme) {
        if (this._integrationHelpers && this._settings) {
            const actions = [
                {
                    name: PagesProvider._ACTION_LAUNCH_PAGE,
                    hotkey: "Enter"
                },
                {
                    name: PagesProvider._ACTION_DELETE_PAGE,
                    hotkey: "CmdOrCtrl+Shift+D"
                }
            ];
            const actionButtons = [
                {
                    title: "Launch",
                    action: PagesProvider._ACTION_LAUNCH_PAGE
                },
                {
                    title: "Delete",
                    action: PagesProvider._ACTION_DELETE_PAGE
                }
            ];
            if (shareEnabled) {
                actions.push({
                    name: PagesProvider._ACTION_SHARE_PAGE,
                    hotkey: "CmdOrCtrl+Shift+S"
                });
                actionButtons.push({
                    title: "Share",
                    action: PagesProvider._ACTION_SHARE_PAGE
                });
            }
            const icon = this._settings.images.page.replace("{scheme}", colorScheme);
            const layoutData = await this._integrationHelpers.templateHelpers.createLayout(title, icon, [await this._integrationHelpers.templateHelpers.createText("instructions")], actionButtons);
            return {
                key: id,
                score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
                title,
                label: "Page",
                icon,
                actions,
                data: {
                    providerId: this._definition?.id,
                    pageTitle: title,
                    pageId: id,
                    tags: ["page"]
                },
                template: "Custom",
                templateContent: {
                    layout: layoutData.layout,
                    data: {
                        ...layoutData.data,
                        instructions: "Use the buttons below to interact with your saved page"
                    }
                }
            };
        }
        return {
            key: id,
            score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
            title,
            label: "Page",
            actions: [],
            data: {
                providerId: this._definition?.id,
                pageTitle: title,
                pageId: id,
                tags: ["page"]
            },
            template: "Plain",
            templateContent: undefined
        };
    }
    /**
     * Rebuild the results after color scheme change.
     * @param platform The workspace platform.
     */
    async rebuildResults(platform) {
        if (this._integrationHelpers && this._lastQuery && this._lastQueryMinLength) {
            const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
            const pages = await platform.Storage.getPages();
            const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength, colorScheme);
            this.resultAddUpdate(results);
        }
    }
    /**
     * Build the results for the pages.
     * @param pages The list of workspaces to build the results for.
     * @param query The query.
     * @param queryMinLength The min query length.
     * @param colorScheme The color scheme.
     * @returns The list of home search results.
     */
    async buildResults(pages, query, queryMinLength, colorScheme) {
        let results = [];
        if (this._integrationHelpers && Array.isArray(pages)) {
            let shareEnabled = false;
            if (this._integrationHelpers.condition) {
                shareEnabled = await this._integrationHelpers.condition("sharing");
            }
            const pgsProm = pages
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(async (pg) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, colorScheme));
            results = await Promise.all(pgsProm);
        }
        return results;
    }
    /**
     * Add or update a result.
     * @param results The results to add or update.
     */
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
    /**
     * Remove a result.
     * @param id The id of the item to remove.
     */
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
 * The default base score for ordering.
 * @internal
 */
PagesProvider._DEFAULT_BASE_SCORE = 200;
/**
 * The key to use for launching a page.
 * @internal
 */
PagesProvider._ACTION_LAUNCH_PAGE = "Launch Page";
/**
 * The key to use for deleting a page.
 * @internal
 */
PagesProvider._ACTION_DELETE_PAGE = "Delete Page";
/**
 * The key to use for sharing a page.
 * @internal
 */
PagesProvider._ACTION_SHARE_PAGE = "Share Page";


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
/*!********************************************************!*\
  !*** ./client/src/modules/integrations/pages/index.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/pages/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.PagesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztZQUN6RSxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN6QztTQUNEO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0lBQ0YsQ0FBQzs7QUF2WUQ7OztHQUdHO0FBQ3FCLGlDQUFtQixHQUFHLEdBQUcsQ0FBQztBQUVsRDs7O0dBR0c7QUFDcUIsaUNBQW1CLEdBQUcsYUFBYSxDQUFDO0FBRTVEOzs7R0FHRztBQUNxQixpQ0FBbUIsR0FBRyxhQUFhLENBQUM7QUFFNUQ7OztHQUdHO0FBQ3FCLGdDQUFrQixHQUFHLFlBQVksQ0FBQzs7Ozs7OztTQy9DM0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUV2QyxNQUFNLFdBQVcsR0FBb0M7SUFDM0QsWUFBWSxFQUFFLElBQUksdURBQWEsRUFBRTtDQUNqQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9wYWdlcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3BhZ2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0Q3VzdG9tVGVtcGxhdGUsXG5cdEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzdWx0XG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgUGFnZSwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEludGVncmF0aW9uSGVscGVycyxcblx0SW50ZWdyYXRpb25Nb2R1bGUsXG5cdEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvblxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9saWZlY3ljbGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IENvbG9yU2NoZW1lTW9kZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvdGhlbWUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2VzU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciBwYWdlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VzUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTxQYWdlc1NldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBiYXNlIHNjb3JlIGZvciBvcmRlcmluZy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9CQVNFX1NDT1JFID0gMjAwO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgbGF1bmNoaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0xBVU5DSF9QQUdFID0gXCJMYXVuY2ggUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fREVMRVRFX1BBR0UgPSBcIkRlbGV0ZSBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NIQVJFX1BBR0UgPSBcIlNoYXJlIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IEludGVncmF0aW9uTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NldHRpbmdzPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogUGFnZXNTZXR0aW5ncztcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZXNQcm92aWRlclwiKTtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XCJwYWdlLWNoYW5nZWRcIixcblx0XHRcdFx0YXN5bmMgKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSwgdW5rbm93blBheWxvYWQ6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdFx0XHRjb25zdCBwYXlsb2FkID0gdW5rbm93blBheWxvYWQgYXMgUGFnZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkO1xuXHRcdFx0XHRcdGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbGFzdFJlc3VsdCA9IHRoaXMuX2xhc3RSZXN1bHRzPy5maW5kKChyZXMpID0+IHJlcy5rZXkgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdFx0aWYgKGxhc3RSZXN1bHQgJiYgcGF5bG9hZC5wYWdlKSB7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQudGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdGxhc3RSZXN1bHQuZGF0YS53b3Jrc3BhY2VUaXRsZSA9IHBheWxvYWQucGFnZS50aXRsZTtcblx0XHRcdFx0XHRcdFx0KGxhc3RSZXN1bHQudGVtcGxhdGVDb250ZW50IGFzIEN1c3RvbVRlbXBsYXRlKS5kYXRhLnRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEBwYXJhbSBvcHRpb25zLmlzU3VnZ2VzdGlvbiBJcyB0aGUgcXVlcnkgZnJvbSBhIHN1Z2dlc3Rpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdFx0aXNTdWdnZXN0aW9uPzogYm9vbGVhbjtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0bGV0IHBhZ2VSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cdFx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5ID0gcXVlcnlMb3dlcjtcblx0XHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnMucXVlcnlNaW5MZW5ndGg7XG5cblx0XHRcdHBhZ2VSZXN1bHRzID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMocGFnZXMsIHF1ZXJ5TG93ZXIsIG9wdGlvbnMucXVlcnlNaW5MZW5ndGgsIGNvbG9yU2NoZW1lKTtcblxuXHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMgPSBwYWdlUmVzdWx0cztcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogcGFnZVJlc3VsdHNcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXHRcdGlmIChyZXN1bHQuYWN0aW9uLnRyaWdnZXIgPT09IFwidXNlci1hY3Rpb25cIikge1xuXHRcdFx0Y29uc3QgZGF0YToge1xuXHRcdFx0XHRwYWdlSWQ/OiBzdHJpbmc7XG5cdFx0XHR9ID0gcmVzdWx0LmRhdGE7XG5cblx0XHRcdGlmIChkYXRhPy5wYWdlSWQpIHtcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0gJiYgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5sYXVuY2hQYWdlKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFnZVRvTGF1bmNoID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlKGRhdGEucGFnZUlkKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5sYXVuY2hQYWdlKHBhZ2VUb0xhdW5jaCwgdW5kZWZpbmVkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmdldFBsYXRmb3JtKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVQYWdlKGRhdGEucGFnZUlkKTtcblx0XHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSBwYWdlIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdFx0Ly8gZXZlbnQgd2hpY2ggd2lsbCByZW1vdmUgaXQgZnJvbSB0aGUgcmVzdWx0IGxpc3Rcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LnNoYXJlKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc2hhcmUoeyB0eXBlOiBcInBhZ2VcIiwgcGFnZUlkOiBkYXRhLnBhZ2VJZCB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3IgcGFnZSBzZWxlY3Rpb246ICR7ZGF0YS5wYWdlSWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRlbXBsYXRlIGZvciBhIHBhZ2UuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW0uXG5cdCAqIEBwYXJhbSB0aXRsZSBUaGUgdGl0bGUgb2YgdGhlIHBhZ2UuXG5cdCAqIEBwYXJhbSBzaGFyZUVuYWJsZWQgSXMgc2hhcmluZyBlbmFibGVkLlxuXHQgKiBAcGFyYW0gY29sb3JTY2hlbWUgVGhlIGN1cnJlbnQgY29sb3Igc2NoZW1lLlxuXHQgKiBAcmV0dXJucyBUaGUgaG9tZSByZXN1bHQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldFBhZ2VUZW1wbGF0ZShcblx0XHRpZDogc3RyaW5nLFxuXHRcdHRpdGxlOiBzdHJpbmcsXG5cdFx0c2hhcmVFbmFibGVkOiBib29sZWFuLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGVcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0PiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9zZXR0aW5ncykge1xuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiRW50ZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogUGFnZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9QQUdFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJDbWRPckN0cmwrU2hpZnQrRFwiXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0XHRjb25zdCBhY3Rpb25CdXR0b25zOiB7IHRpdGxlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH1bXSA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcIkxhdW5jaFwiLFxuXHRcdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJEZWxldGVcIixcblx0XHRcdFx0XHRhY3Rpb246IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXG5cdFx0XHRpZiAoc2hhcmVFbmFibGVkKSB7XG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZTogUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtTXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmVcIixcblx0XHRcdFx0XHRhY3Rpb246IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpY29uID0gdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLnBhZ2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyk7XG5cblx0XHRcdGNvbnN0IGxheW91dERhdGEgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUxheW91dChcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdFthd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRleHQoXCJpbnN0cnVjdGlvbnNcIildLFxuXHRcdFx0XHRhY3Rpb25CdXR0b25zXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRrZXk6IGlkLFxuXHRcdFx0XHRzY29yZTogdGhpcy5fZGVmaW5pdGlvbj8uYmFzZVNjb3JlID8/IFBhZ2VzUHJvdmlkZXIuX0RFRkFVTFRfQkFTRV9TQ09SRSxcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdGxhYmVsOiBcIlBhZ2VcIixcblx0XHRcdFx0aWNvbixcblx0XHRcdFx0YWN0aW9ucyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IHRoaXMuX2RlZmluaXRpb24/LmlkLFxuXHRcdFx0XHRcdHBhZ2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0XHR0YWdzOiBbXCJwYWdlXCJdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiB7XG5cdFx0XHRcdFx0bGF5b3V0OiBsYXlvdXREYXRhLmxheW91dCxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHQuLi5sYXlvdXREYXRhLmRhdGEsXG5cdFx0XHRcdFx0XHRpbnN0cnVjdGlvbnM6IFwiVXNlIHRoZSBidXR0b25zIGJlbG93IHRvIGludGVyYWN0IHdpdGggeW91ciBzYXZlZCBwYWdlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXk6IGlkLFxuXHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBQYWdlc1Byb3ZpZGVyLl9ERUZBVUxUX0JBU0VfU0NPUkUsXG5cdFx0XHR0aXRsZSxcblx0XHRcdGxhYmVsOiBcIlBhZ2VcIixcblx0XHRcdGFjdGlvbnM6IFtdLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0cGFnZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0dGFnczogW1wicGFnZVwiXVxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIlBsYWluXCIgYXMgQ0xJVGVtcGxhdGUuUGxhaW4sXG5cdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHVuZGVmaW5lZFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmVidWlsZCB0aGUgcmVzdWx0cyBhZnRlciBjb2xvciBzY2hlbWUgY2hhbmdlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVidWlsZFJlc3VsdHMocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycyAmJiB0aGlzLl9sYXN0UXVlcnkgJiYgdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoKSB7XG5cdFx0XHRjb25zdCBjb2xvclNjaGVtZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50Q29sb3JTY2hlbWVNb2RlKCk7XG5cblx0XHRcdGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0XHRjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMocGFnZXMsIHRoaXMuX2xhc3RRdWVyeSwgdGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLCBjb2xvclNjaGVtZSk7XG5cdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgdGhlIHJlc3VsdHMgZm9yIHRoZSBwYWdlcy5cblx0ICogQHBhcmFtIHBhZ2VzIFRoZSBsaXN0IG9mIHdvcmtzcGFjZXMgdG8gYnVpbGQgdGhlIHJlc3VsdHMgZm9yLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gcXVlcnlNaW5MZW5ndGggVGhlIG1pbiBxdWVyeSBsZW5ndGguXG5cdCAqIEBwYXJhbSBjb2xvclNjaGVtZSBUaGUgY29sb3Igc2NoZW1lLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBob21lIHNlYXJjaCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGFnZXM6IFBhZ2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXIsXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGxldCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgQXJyYXkuaXNBcnJheShwYWdlcykpIHtcblx0XHRcdGxldCBzaGFyZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKSB7XG5cdFx0XHRcdHNoYXJlRW5hYmxlZCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwZ3NQcm9tID0gcGFnZXNcblx0XHRcdFx0LmZpbHRlcihcblx0XHRcdFx0XHQocGcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHwgKHF1ZXJ5Lmxlbmd0aCA+PSBxdWVyeU1pbkxlbmd0aCAmJiBwZy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSlcblx0XHRcdFx0KVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpKVxuXHRcdFx0XHQubWFwKGFzeW5jIChwZzogUGFnZSkgPT4gdGhpcy5nZXRQYWdlVGVtcGxhdGUocGcucGFnZUlkLCBwZy50aXRsZSwgc2hhcmVFbmFibGVkLCBjb2xvclNjaGVtZSkpO1xuXG5cdFx0XHRyZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwocGdzUHJvbSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9yIHVwZGF0ZSBhIHJlc3VsdC5cblx0ICogQHBhcmFtIHJlc3VsdHMgVGhlIHJlc3VsdHMgdG8gYWRkIG9yIHVwZGF0ZS5cblx0ICovXG5cdHByaXZhdGUgcmVzdWx0QWRkVXBkYXRlKHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Zm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSByZXN1bHQua2V5KTtcblx0XHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKHJlc3VsdHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSByZXN1bHQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gcmVtb3ZlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXN1bHRSZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gaWQpO1xuXHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShpZCk7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFBhZ2VzUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBQYWdlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFBhZ2VzUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==