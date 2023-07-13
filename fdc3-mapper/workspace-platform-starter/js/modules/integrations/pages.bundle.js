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
                        await this._integrationHelpers.launchPage(pageToLaunch);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Q7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUI7SUFDRixDQUFDOztBQXJZRDs7O0dBR0c7QUFDcUIsaUNBQW1CLEdBQUcsR0FBRyxDQUFDO0FBRWxEOzs7R0FHRztBQUNxQixpQ0FBbUIsR0FBRyxhQUFhLENBQUM7QUFFNUQ7OztHQUdHO0FBQ3FCLGlDQUFtQixHQUFHLGFBQWEsQ0FBQztBQUU1RDs7O0dBR0c7QUFDcUIsZ0NBQWtCLEdBQUcsWUFBWSxDQUFDOzs7Ozs7O1NDaEQzRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBRXZDLE1BQU0sV0FBVyxHQUFvQztJQUMzRCxZQUFZLEVBQUUsSUFBSSx1REFBYSxFQUFFO0NBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3BhZ2VzL2ludGVncmF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFBhZ2Vcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHtcblx0SW50ZWdyYXRpb25IZWxwZXJzLFxuXHRJbnRlZ3JhdGlvbk1vZHVsZSxcblx0SW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ29sb3JTY2hlbWVNb2RlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy90aGVtZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZXNTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIHBhZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFBhZ2VzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IGJhc2Ugc2NvcmUgZm9yIG9yZGVyaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0JBU0VfU0NPUkUgPSAyMDA7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBsYXVuY2hpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fTEFVTkNIX1BBR0UgPSBcIkxhdW5jaCBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBkZWxldGluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9ERUxFVEVfUEFHRSA9IFwiRGVsZXRlIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIHNoYXJpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fU0hBUkVfUEFHRSA9IFwiU2hhcmUgUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogSW50ZWdyYXRpb25Nb2R1bGVEZWZpbml0aW9uPFBhZ2VzU2V0dGluZ3M+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZnJvbSBjb25maWcuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBQYWdlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzcG9uc2U/OiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5IG1pbiBsZW5ndGguXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UXVlcnlNaW5MZW5ndGg/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHJlc3VsdHMuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0UmVzdWx0cz86IEhvbWVTZWFyY2hSZXN1bHRbXTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEludGVncmF0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJQYWdlc1Byb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcInBhZ2UtY2hhbmdlZFwiLFxuXHRcdFx0XHRhc3luYyAocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLCB1bmtub3duUGF5bG9hZDogdW5rbm93bik6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHBheWxvYWQgPSB1bmtub3duUGF5bG9hZCBhcyBQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQ7XG5cdFx0XHRcdFx0aWYgKHBheWxvYWQuYWN0aW9uID09PSBcImNyZWF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0UmVzdWx0ID0gdGhpcy5fbGFzdFJlc3VsdHM/LmZpbmQoKHJlcykgPT4gcmVzLmtleSA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0XHRpZiAobGFzdFJlc3VsdCAmJiBwYXlsb2FkLnBhZ2UpIHtcblx0XHRcdFx0XHRcdFx0bGFzdFJlc3VsdC50aXRsZSA9IHBheWxvYWQucGFnZS50aXRsZTtcblx0XHRcdFx0XHRcdFx0bGFzdFJlc3VsdC5kYXRhLndvcmtzcGFjZVRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHQobGFzdFJlc3VsdC50ZW1wbGF0ZUNvbnRlbnQgYXMgQ3VzdG9tVGVtcGxhdGUpLmRhdGEudGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKFtsYXN0UmVzdWx0XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRSZW1vdmUocGF5bG9hZC5pZCBhcyBzdHJpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiB0aGUgc3RhdGljIGhlbHAgZW50cmllcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaGVscCBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEhlbHBTZWFyY2hFbnRyaWVzKCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdFtdPiB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCBUaGUgbWluaW11bSBsZW5ndGggYmVmb3JlIGEgcXVlcnkgaXMgYWN0aW9uZWQuXG5cdCAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5QWdhaW5zdCBUaGUgZmllbGRzIGluIHRoZSBkYXRhIHRvIHF1ZXJ5IGFnYWluc3QuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRsZXQgcGFnZVJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSA9IFtdO1xuXG5cdFx0aWYgKHRoaXMuX2ludGVncmF0aW9uSGVscGVycz8uZ2V0UGxhdGZvcm0pIHtcblx0XHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblx0XHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UgPSBsYXN0UmVzcG9uc2U7XG5cdFx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aDtcblxuXHRcdFx0cGFnZVJlc3VsdHMgPSBhd2FpdCB0aGlzLmJ1aWxkUmVzdWx0cyhwYWdlcywgcXVlcnlMb3dlciwgb3B0aW9ucy5xdWVyeU1pbkxlbmd0aCwgY29sb3JTY2hlbWUpO1xuXG5cdFx0XHR0aGlzLl9sYXN0UmVzdWx0cyA9IHBhZ2VSZXN1bHRzO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBwYWdlUmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdHBhZ2VJZD86IHN0cmluZztcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0aWYgKGRhdGE/LnBhZ2VJZCkge1xuXHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0UpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSAmJiB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnM/LmxhdW5jaFBhZ2UpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBwYWdlVG9MYXVuY2ggPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2UoZGF0YS5wYWdlSWQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaFBhZ2UocGFnZVRvTGF1bmNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5nZXRQbGF0Zm9ybSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShkYXRhLnBhZ2VJZCk7XG5cdFx0XHRcdFx0XHQvLyBEZWxldGluZyB0aGUgcGFnZSB3aWxsIGV2ZW50dWFsbHkgdHJpZ2dlciB0aGUgXCJkZWxldGVcIiBsaWZlY3ljbGVcblx0XHRcdFx0XHRcdC8vIGV2ZW50IHdoaWNoIHdpbGwgcmVtb3ZlIGl0IGZyb20gdGhlIHJlc3VsdCBsaXN0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0UpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzPy5zaGFyZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnNoYXJlKHsgdHlwZTogXCJwYWdlXCIsIHBhZ2VJZDogZGF0YS5wYWdlSWQgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFVucmVjb2duaXplZCBhY3Rpb24gZm9yIHBhZ2Ugc2VsZWN0aW9uOiAke2RhdGEucGFnZUlkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGhhbmRsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSB0ZW1wbGF0ZSBmb3IgYSBwYWdlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBpdGVtLlxuXHQgKiBAcGFyYW0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBwYWdlLlxuXHQgKiBAcGFyYW0gc2hhcmVFbmFibGVkIElzIHNoYXJpbmcgZW5hYmxlZC5cblx0ICogQHBhcmFtIGNvbG9yU2NoZW1lIFRoZSBjdXJyZW50IGNvbG9yIHNjaGVtZS5cblx0ICogQHJldHVybnMgVGhlIGhvbWUgcmVzdWx0LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRQYWdlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRjb2xvclNjaGVtZTogQ29sb3JTY2hlbWVNb2RlXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgdGhpcy5fc2V0dGluZ3MpIHtcblx0XHRcdGNvbnN0IGFjdGlvbnMgPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0UsXG5cdFx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSxcblx0XHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K0RcIlxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdFx0Y29uc3QgYWN0aW9uQnV0dG9uczogeyB0aXRsZTogc3RyaW5nOyBhY3Rpb246IHN0cmluZyB9W10gPSBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJMYXVuY2hcIixcblx0XHRcdFx0XHRhY3Rpb246IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwiRGVsZXRlXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0Vcblx0XHRcdFx0fVxuXHRcdFx0XTtcblxuXHRcdFx0aWYgKHNoYXJlRW5hYmxlZCkge1xuXHRcdFx0XHRhY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFLFxuXHRcdFx0XHRcdGhvdGtleTogXCJDbWRPckN0cmwrU2hpZnQrU1wiXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRhY3Rpb25CdXR0b25zLnB1c2goe1xuXHRcdFx0XHRcdHRpdGxlOiBcIlNoYXJlXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaWNvbiA9IHRoaXMuX3NldHRpbmdzLmltYWdlcy5wYWdlLnJlcGxhY2UoXCJ7c2NoZW1lfVwiLCBjb2xvclNjaGVtZSBhcyBzdHJpbmcpO1xuXG5cdFx0XHRjb25zdCBsYXlvdXREYXRhID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVMYXlvdXQoXG5cdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHRpY29uLFxuXHRcdFx0XHRbYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUZXh0KFwiaW5zdHJ1Y3Rpb25zXCIpXSxcblx0XHRcdFx0YWN0aW9uQnV0dG9uc1xuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0a2V5OiBpZCxcblx0XHRcdFx0c2NvcmU6IHRoaXMuX2RlZmluaXRpb24/LmJhc2VTY29yZSA/PyBQYWdlc1Byb3ZpZGVyLl9ERUZBVUxUX0JBU0VfU0NPUkUsXG5cdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHRsYWJlbDogXCJQYWdlXCIsXG5cdFx0XHRcdGljb24sXG5cdFx0XHRcdGFjdGlvbnMsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiB0aGlzLl9kZWZpbml0aW9uPy5pZCxcblx0XHRcdFx0XHRwYWdlVGl0bGU6IHRpdGxlLFxuXHRcdFx0XHRcdHBhZ2VJZDogaWQsXG5cdFx0XHRcdFx0dGFnczogW1wicGFnZVwiXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRcdGxheW91dDogbGF5b3V0RGF0YS5sYXlvdXQsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0Li4ubGF5b3V0RGF0YS5kYXRhLFxuXHRcdFx0XHRcdFx0aW5zdHJ1Y3Rpb25zOiBcIlVzZSB0aGUgYnV0dG9ucyBiZWxvdyB0byBpbnRlcmFjdCB3aXRoIHlvdXIgc2F2ZWQgcGFnZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBpZCxcblx0XHRcdHNjb3JlOiB0aGlzLl9kZWZpbml0aW9uPy5iYXNlU2NvcmUgPz8gUGFnZXNQcm92aWRlci5fREVGQVVMVF9CQVNFX1NDT1JFLFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRsYWJlbDogXCJQYWdlXCIsXG5cdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogdGhpcy5fZGVmaW5pdGlvbj8uaWQsXG5cdFx0XHRcdHBhZ2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdHBhZ2VJZDogaWQsXG5cdFx0XHRcdHRhZ3M6IFtcInBhZ2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJQbGFpblwiIGFzIENMSVRlbXBsYXRlLlBsYWluLFxuXHRcdFx0dGVtcGxhdGVDb250ZW50OiB1bmRlZmluZWRcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlYnVpbGQgdGhlIHJlc3VsdHMgYWZ0ZXIgY29sb3Igc2NoZW1lIGNoYW5nZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSB3b3Jrc3BhY2UgcGxhdGZvcm0uXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMgJiYgdGhpcy5fbGFzdFF1ZXJ5ICYmIHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCkge1xuXHRcdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXG5cdFx0XHRjb25zdCBwYWdlczogUGFnZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlcygpO1xuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKHBhZ2VzLCB0aGlzLl9sYXN0UXVlcnksIHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCwgY29sb3JTY2hlbWUpO1xuXHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHRoZSByZXN1bHRzIGZvciB0aGUgcGFnZXMuXG5cdCAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiB3b3Jrc3BhY2VzIHRvIGJ1aWxkIHRoZSByZXN1bHRzIGZvci5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeS5cblx0ICogQHBhcmFtIHF1ZXJ5TWluTGVuZ3RoIFRoZSBtaW4gcXVlcnkgbGVuZ3RoLlxuXHQgKiBAcGFyYW0gY29sb3JTY2hlbWUgVGhlIGNvbG9yIHNjaGVtZS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgaG9tZSBzZWFyY2ggcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgYnVpbGRSZXN1bHRzKFxuXHRcdHBhZ2VzOiBQYWdlW10sXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGVcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzICYmIEFycmF5LmlzQXJyYXkocGFnZXMpKSB7XG5cdFx0XHRsZXQgc2hhcmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbikge1xuXHRcdFx0XHRzaGFyZUVuYWJsZWQgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuY29uZGl0aW9uKFwic2hhcmluZ1wiKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGdzUHJvbSA9IHBhZ2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHBnKSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8IChxdWVyeS5sZW5ndGggPj0gcXVlcnlNaW5MZW5ndGggJiYgcGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpXG5cdFx0XHRcdClcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSlcblx0XHRcdFx0Lm1hcChhc3luYyAocGc6IFBhZ2UpID0+IHRoaXMuZ2V0UGFnZVRlbXBsYXRlKHBnLnBhZ2VJZCwgcGcudGl0bGUsIHNoYXJlRW5hYmxlZCwgY29sb3JTY2hlbWUpKTtcblxuXHRcdFx0cmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKHBnc1Byb20pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBvciB1cGRhdGUgYSByZXN1bHQuXG5cdCAqIEBwYXJhbSByZXN1bHRzIFRoZSByZXN1bHRzIHRvIGFkZCBvciB1cGRhdGUuXG5cdCAqL1xuXHRwcml2YXRlIHJlc3VsdEFkZFVwZGF0ZShyZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcblx0XHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gcmVzdWx0LmtleSk7XG5cdFx0XHRcdGlmIChyZXN1bHRJbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxLCByZXN1bHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fbGFzdFJlc3BvbnNlKSB7XG5cdFx0XHR0aGlzLl9sYXN0UmVzcG9uc2UucmVzcG9uZChyZXN1bHRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGEgcmVzdWx0LlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBpdGVtIHRvIHJlbW92ZS5cblx0ICovXG5cdHByaXZhdGUgcmVzdWx0UmVtb3ZlKGlkOiBzdHJpbmcpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdGNvbnN0IHJlc3VsdEluZGV4ID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZEluZGV4KChyZXMpID0+IHJlcy5rZXkgPT09IGlkKTtcblx0XHRcdGlmIChyZXN1bHRJbmRleCA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnNwbGljZShyZXN1bHRJbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoaWQpO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQYWdlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogUGFnZXNQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBQYWdlc1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=