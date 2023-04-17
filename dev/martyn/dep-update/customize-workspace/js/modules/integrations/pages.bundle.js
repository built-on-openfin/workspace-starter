/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/integrations/pages/integration.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/integrations/pages/integration.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PagesProvider": () => (/* binding */ PagesProvider)
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
        this._integrationHelpers.subscribeLifecycleEvent("page-changed", async (platform, payload) => {
            if (payload.action === "create") {
                await this.rebuildResults(platform);
            }
            else if (payload.action === "update") {
                const lastResult = this._lastResults?.find((res) => res.key === payload.id);
                if (lastResult) {
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
            const platform = this._integrationHelpers.getPlatform();
            await this.rebuildResults(platform);
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
        const platform = this._integrationHelpers.getPlatform();
        const pages = await platform.Storage.getPages();
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const queryLower = query.toLowerCase();
        this._lastResponse = lastResponse;
        this._lastQuery = queryLower;
        this._lastQueryMinLength = options.queryMinLength;
        const pageResults = await this.buildResults(pages, queryLower, options.queryMinLength, colorScheme);
        this._lastResults = pageResults;
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
                    const platform = this._integrationHelpers.getPlatform();
                    const pageToLaunch = await platform.Storage.getPage(data.pageId);
                    await this._integrationHelpers.launchPage(pageToLaunch);
                }
                else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
                    const platform = this._integrationHelpers.getPlatform();
                    await platform.Storage.deletePage(data.pageId);
                    // Deleting the page will eventually trigger the "delete" lifecycle
                    // event which will remove it from the result list
                }
                else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE) {
                    await this._integrationHelpers.share({ pageId: data.pageId });
                }
                else {
                    handled = false;
                    this._logger.warn(`Unrecognized action for page selection: ${data.pageId}`);
                }
            }
        }
        return handled;
    }
    async getPageTemplate(id, title, shareEnabled, colorScheme) {
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
            title,
            label: "Page",
            icon,
            actions,
            data: {
                providerId: PagesProvider._PROVIDER_ID,
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
    async rebuildResults(platform) {
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const pages = await platform.Storage.getPages();
        const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength, colorScheme);
        this.resultAddUpdate(results);
    }
    async buildResults(pages, query, queryMinLength, colorScheme) {
        let results = [];
        if (Array.isArray(pages)) {
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            const pgsProm = pages
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(async (pg) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, colorScheme));
            results = await Promise.all(pgsProm);
        }
        return results;
    }
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
 * Provider id.
 * @internal
 */
PagesProvider._PROVIDER_ID = "pages";
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration */ "./client/src/modules/integrations/pages/integration.ts");

const entryPoints = {
    integrations: new _integration__WEBPACK_IMPORTED_MODULE_0__.PagesProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0c7QUFDcUIsZ0NBQWtCLEdBQUcsWUFBWSxDQUFDOzs7Ozs7O1NDNUMzRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBRXZDLE1BQU0sV0FBVyxHQUFvQztJQUMzRCxZQUFZLEVBQUUsSUFBSSx1REFBYSxFQUFFO0NBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFBhZ2Vcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgUGFnZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ29sb3JTY2hlbWVNb2RlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL3RoZW1lLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQYWdlc1NldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgcGFnZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlc1Byb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8UGFnZXNTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJwYWdlc1wiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgbGF1bmNoaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0xBVU5DSF9QQUdFID0gXCJMYXVuY2ggUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3IgZGVsZXRpbmcgYSBwYWdlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9BQ1RJT05fREVMRVRFX1BBR0UgPSBcIkRlbGV0ZSBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgdG8gdXNlIGZvciBzaGFyaW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX1NIQVJFX1BBR0UgPSBcIlNoYXJlIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZyb20gY29uZmlnLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IFBhZ2VzU2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZWdyYXRpb24gaGVscGVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9pbnRlZ3JhdGlvbkhlbHBlcnM6IEludGVncmF0aW9uSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3BvbnNlPzogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHF1ZXJ5LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeSBtaW4gbGVuZ3RoLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFF1ZXJ5TWluTGVuZ3RoPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCByZXN1bHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdFJlc3VsdHM/OiBIb21lU2VhcmNoUmVzdWx0W107XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZXNQcm92aWRlclwiKTtcblxuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFwicGFnZS1jaGFuZ2VkXCIsXG5cdFx0XHRhc3luYyAocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLCBwYXlsb2FkOiBQYWdlQ2hhbmdlZExpZmVjeWNsZVBheWxvYWQpID0+IHtcblx0XHRcdFx0aWYgKHBheWxvYWQuYWN0aW9uID09PSBcImNyZWF0ZVwiKSB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZWJ1aWxkUmVzdWx0cyhwbGF0Zm9ybSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwidXBkYXRlXCIpIHtcblx0XHRcdFx0XHRjb25zdCBsYXN0UmVzdWx0ID0gdGhpcy5fbGFzdFJlc3VsdHM/LmZpbmQoKHJlcykgPT4gcmVzLmtleSA9PT0gcGF5bG9hZC5pZCk7XG5cdFx0XHRcdFx0aWYgKGxhc3RSZXN1bHQpIHtcblx0XHRcdFx0XHRcdGxhc3RSZXN1bHQudGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHRsYXN0UmVzdWx0LmRhdGEud29ya3NwYWNlVGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHQobGFzdFJlc3VsdC50ZW1wbGF0ZUNvbnRlbnQgYXMgQ3VzdG9tVGVtcGxhdGUpLmRhdGEudGl0bGUgPSBwYXlsb2FkLnBhZ2UudGl0bGU7XG5cdFx0XHRcdFx0XHR0aGlzLnJlc3VsdEFkZFVwZGF0ZShbbGFzdFJlc3VsdF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJkZWxldGVcIikge1xuXHRcdFx0XHRcdHRoaXMucmVzdWx0UmVtb3ZlKHBheWxvYWQuaWQgYXMgc3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwidGhlbWUtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBxdWVyeSBhbmQgZmlsdGVycy5cblx0ICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggZm9yLlxuXHQgKiBAcGFyYW0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBhcHBseS5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCBzZWFyY2ggcmVzcG9uc2UgdXNlZCBmb3IgdXBkYXRpbmcgZXhpc3RpbmcgcmVzdWx0cy5cblx0ICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHNlYXJjaCBxdWVyeS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgcmVzdWx0cyBhbmQgbmV3IGZpbHRlcnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdGZpbHRlcnM6IENMSUZpbHRlcltdLFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cXVlcnlNaW5MZW5ndGg6IG51bWJlcjtcblx0XHRcdHF1ZXJ5QWdhaW5zdDogc3RyaW5nW107XG5cdFx0fVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXNwb25zZT4ge1xuXHRcdGNvbnN0IHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXHRcdGNvbnN0IHF1ZXJ5TG93ZXIgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0dGhpcy5fbGFzdFJlc3BvbnNlID0gbGFzdFJlc3BvbnNlO1xuXHRcdHRoaXMuX2xhc3RRdWVyeSA9IHF1ZXJ5TG93ZXI7XG5cdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoID0gb3B0aW9ucy5xdWVyeU1pbkxlbmd0aDtcblxuXHRcdGNvbnN0IHBhZ2VSZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBhd2FpdCB0aGlzLmJ1aWxkUmVzdWx0cyhcblx0XHRcdHBhZ2VzLFxuXHRcdFx0cXVlcnlMb3dlcixcblx0XHRcdG9wdGlvbnMucXVlcnlNaW5MZW5ndGgsXG5cdFx0XHRjb2xvclNjaGVtZVxuXHRcdCk7XG5cblx0XHR0aGlzLl9sYXN0UmVzdWx0cyA9IHBhZ2VSZXN1bHRzO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IHBhZ2VSZXN1bHRzXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0cGFnZUlkPzogc3RyaW5nO1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRpZiAoZGF0YT8ucGFnZUlkKSB7XG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZVRvTGF1bmNoID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlKGRhdGEucGFnZUlkKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoUGFnZShwYWdlVG9MYXVuY2gpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gUGFnZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9QQUdFKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmRlbGV0ZVBhZ2UoZGF0YS5wYWdlSWQpO1xuXHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSBwYWdlIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdC8vIGV2ZW50IHdoaWNoIHdpbGwgcmVtb3ZlIGl0IGZyb20gdGhlIHJlc3VsdCBsaXN0XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSkge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHBhZ2VJZDogZGF0YS5wYWdlSWQgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBVbnJlY29nbml6ZWQgYWN0aW9uIGZvciBwYWdlIHNlbGVjdGlvbjogJHtkYXRhLnBhZ2VJZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBnZXRQYWdlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRjb2xvclNjaGVtZTogQ29sb3JTY2hlbWVNb2RlXG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3VsdD4ge1xuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdH1cblx0XHRdO1xuXHRcdGNvbnN0IGFjdGlvbkJ1dHRvbnM6IHsgdGl0bGU6IHN0cmluZzsgYWN0aW9uOiBzdHJpbmcgfVtdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJMYXVuY2hcIixcblx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0Vcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIkRlbGV0ZVwiLFxuXHRcdFx0XHRhY3Rpb246IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRpZiAoc2hhcmVFbmFibGVkKSB7XG5cdFx0XHRhY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRuYW1lOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtTXCJcblx0XHRcdH0pO1xuXHRcdFx0YWN0aW9uQnV0dG9ucy5wdXNoKHtcblx0XHRcdFx0dGl0bGU6IFwiU2hhcmVcIixcblx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWNvbiA9IHRoaXMuX3NldHRpbmdzLmltYWdlcy5wYWdlLnJlcGxhY2UoXCJ7c2NoZW1lfVwiLCBjb2xvclNjaGVtZSBhcyBzdHJpbmcpO1xuXG5cdFx0Y29uc3QgbGF5b3V0RGF0YSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlTGF5b3V0KFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRpY29uLFxuXHRcdFx0W2F3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGV4dChcImluc3RydWN0aW9uc1wiKV0sXG5cdFx0XHRhY3Rpb25CdXR0b25zXG5cdFx0KTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXk6IGlkLFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRsYWJlbDogXCJQYWdlXCIsXG5cdFx0XHRpY29uLFxuXHRcdFx0YWN0aW9ucyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogUGFnZXNQcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdHBhZ2VUaXRsZTogdGl0bGUsXG5cdFx0XHRcdHBhZ2VJZDogaWQsXG5cdFx0XHRcdHRhZ3M6IFtcInBhZ2VcIl1cblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0bGF5b3V0OiBsYXlvdXREYXRhLmxheW91dCxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdC4uLmxheW91dERhdGEuZGF0YSxcblx0XHRcdFx0XHRpbnN0cnVjdGlvbnM6IFwiVXNlIHRoZSBidXR0b25zIGJlbG93IHRvIGludGVyYWN0IHdpdGggeW91ciBzYXZlZCBwYWdlXCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIHJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblxuXHRcdGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuYnVpbGRSZXN1bHRzKHBhZ2VzLCB0aGlzLl9sYXN0UXVlcnksIHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCwgY29sb3JTY2hlbWUpO1xuXHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKHJlc3VsdHMpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGFnZXM6IFBhZ2VbXSxcblx0XHRxdWVyeTogc3RyaW5nLFxuXHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXIsXG5cdFx0Y29sb3JTY2hlbWU6IENvbG9yU2NoZW1lTW9kZVxuXHQpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdGxldCByZXN1bHRzOiBIb21lU2VhcmNoUmVzdWx0W10gPSBbXTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhZ2VzKSkge1xuXHRcdFx0Y29uc3Qgc2hhcmVFbmFibGVkOiBib29sZWFuID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmNvbmRpdGlvbihcInNoYXJpbmdcIik7XG5cblx0XHRcdGNvbnN0IHBnc1Byb20gPSBwYWdlc1xuXHRcdFx0XHQuZmlsdGVyKFxuXHRcdFx0XHRcdChwZykgPT5cblx0XHRcdFx0XHRcdHF1ZXJ5Lmxlbmd0aCA9PT0gMCB8fCAocXVlcnkubGVuZ3RoID49IHF1ZXJ5TWluTGVuZ3RoICYmIHBnLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKVxuXHRcdFx0XHQpXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpXG5cdFx0XHRcdC5tYXAoYXN5bmMgKHBnOiBQYWdlKSA9PiB0aGlzLmdldFBhZ2VUZW1wbGF0ZShwZy5wYWdlSWQsIHBnLnRpdGxlLCBzaGFyZUVuYWJsZWQsIGNvbG9yU2NoZW1lKSk7XG5cblx0XHRcdHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChwZ3NQcm9tKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByaXZhdGUgcmVzdWx0QWRkVXBkYXRlKHJlc3VsdHM6IEhvbWVTZWFyY2hSZXN1bHRbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Zm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuXHRcdFx0XHRjb25zdCByZXN1bHRJbmRleCA9IHRoaXMuX2xhc3RSZXN1bHRzLmZpbmRJbmRleCgocmVzKSA9PiByZXMua2V5ID09PSByZXN1bHQua2V5KTtcblx0XHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5zcGxpY2UocmVzdWx0SW5kZXgsIDEsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXNwb25kKHJlc3VsdHMpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVzdWx0UmVtb3ZlKGlkOiBzdHJpbmcpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGFzdFJlc3VsdHMpIHtcblx0XHRcdGNvbnN0IHJlc3VsdEluZGV4ID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZEluZGV4KChyZXMpID0+IHJlcy5rZXkgPT09IGlkKTtcblx0XHRcdGlmIChyZXN1bHRJbmRleCA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnNwbGljZShyZXN1bHRJbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sYXN0UmVzcG9uc2UpIHtcblx0XHRcdHRoaXMuX2xhc3RSZXNwb25zZS5yZXZva2UoaWQpO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQYWdlc1Byb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogUGFnZXNQcm92aWRlciB9ID0ge1xuXHRpbnRlZ3JhdGlvbnM6IG5ldyBQYWdlc1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=