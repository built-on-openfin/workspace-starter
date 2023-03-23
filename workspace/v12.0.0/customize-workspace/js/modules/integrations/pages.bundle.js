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
        const pageResults = await this.buildResults(platform, pages, queryLower, options.queryMinLength, colorScheme);
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
    getPageTemplate(id, title, shareEnabled, colorScheme, palette) {
        let actions = [];
        if (shareEnabled) {
            actions.push({
                name: PagesProvider._ACTION_SHARE_PAGE,
                hotkey: "CmdOrCtrl+Shift+S"
            });
        }
        actions = actions.concat([
            {
                name: PagesProvider._ACTION_DELETE_PAGE,
                hotkey: "CmdOrCtrl+Shift+D"
            },
            {
                name: PagesProvider._ACTION_LAUNCH_PAGE,
                hotkey: "Enter"
            }
        ]);
        const layout = this.getOtherPageTemplate(shareEnabled, palette);
        return {
            key: id,
            title,
            label: "Page",
            icon: this._settings.images.page.replace("{scheme}", colorScheme),
            actions,
            data: {
                providerId: PagesProvider._PROVIDER_ID,
                pageTitle: title,
                pageId: id,
                tags: ["page"]
            },
            template: "Custom",
            templateContent: {
                layout,
                data: {
                    title,
                    instructions: "Use the buttons below to interact with your saved page",
                    openText: "Launch",
                    deleteText: "Delete",
                    shareText: "Share"
                }
            }
        };
    }
    getOtherPageTemplate(enableShare, palette) {
        const actionButtons = [
            {
                type: "Button",
                action: PagesProvider._ACTION_LAUNCH_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "openText"
                    }
                ]
            },
            {
                type: "Button",
                buttonStyle: "primary",
                action: PagesProvider._ACTION_DELETE_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "deleteText"
                    }
                ]
            }
        ];
        if (enableShare) {
            actionButtons.push({
                type: "Button",
                buttonStyle: "primary",
                action: PagesProvider._ACTION_SHARE_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "shareText"
                    }
                ]
            });
        }
        return {
            type: "Container",
            style: {
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1
            },
            children: [
                {
                    type: "Text",
                    dataKey: "title",
                    style: {
                        fontWeight: "bold",
                        fontSize: "16px",
                        paddingBottom: "5px",
                        marginBottom: "10px",
                        borderBottom: `1px solid ${palette.background6}`
                    }
                },
                {
                    type: "Text",
                    dataKey: "instructions",
                    style: {
                        flex: 1
                    }
                },
                {
                    type: "Container",
                    style: {
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px"
                    },
                    children: actionButtons
                }
            ]
        };
    }
    async rebuildResults(platform) {
        const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
        const pages = await platform.Storage.getPages();
        const results = await this.buildResults(platform, pages, this._lastQuery, this._lastQueryMinLength, colorScheme);
        this.resultAddUpdate(results);
    }
    async buildResults(platform, pages, query, queryMinLength, colorScheme) {
        let results = [];
        if (Array.isArray(pages)) {
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            const palette = await this._integrationHelpers.getCurrentPalette();
            results = pages
                .filter((pg) => query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query)))
                .map((pg) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, colorScheme, palette))
                .sort((a, b) => a.title.localeCompare(b.title));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxDQUFDO0FBRTVEOzs7R0FHRztBQUNxQixpQ0FBbUIsR0FBRyxhQUFhLENBQUM7QUFFNUQ7OztHQUdHO0FBQ3FCLGdDQUFrQixHQUFHLFlBQVksQ0FBQztBQXZCakM7Ozs7Ozs7U0N4QjFCO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFFdkMsTUFBTSxXQUFXLEdBQW9DO0lBQzNELFlBQVksRUFBRSxJQUFJLHVEQUFhLEVBQUU7Q0FDakMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9wYWdlcy9pbnRlZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy9wYWdlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdEJ1dHRvblN0eWxlLFxuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRDdXN0b21UZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFBhZ2UsXG5cdFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgQ3VzdG9tUGFsZXR0ZVNldCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UvY2xpZW50LWFwaS1wbGF0Zm9ybS9zcmMvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2VDaGFuZ2VkTGlmZWN5Y2xlUGF5bG9hZCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IENvbG9yU2NoZW1lTW9kZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy90aGVtZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZXNTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIHBhZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFBhZ2VzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwicGFnZXNcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGxhdW5jaGluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9MQVVOQ0hfUEFHRSA9IFwiTGF1bmNoIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGRlbGV0aW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0RFTEVURV9QQUdFID0gXCJEZWxldGUgUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2hhcmluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TSEFSRV9QQUdFID0gXCJTaGFyZSBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBQYWdlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXNwb25zZT86IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBxdWVyeS5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcXVlcnkgbWluIGxlbmd0aC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RRdWVyeU1pbkxlbmd0aD86IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgcmVzdWx0cy5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RSZXN1bHRzPzogSG9tZVNlYXJjaFJlc3VsdFtdO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFBhZ2VzU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlBhZ2VzUHJvdmlkZXJcIik7XG5cblx0XHR0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcInBhZ2UtY2hhbmdlZFwiLFxuXHRcdFx0YXN5bmMgKHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSwgcGF5bG9hZDogUGFnZUNoYW5nZWRMaWZlY3ljbGVQYXlsb2FkKSA9PiB7XG5cdFx0XHRcdGlmIChwYXlsb2FkLmFjdGlvbiA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVidWlsZFJlc3VsdHMocGxhdGZvcm0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuYWN0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGFzdFJlc3VsdCA9IHRoaXMuX2xhc3RSZXN1bHRzPy5maW5kKChyZXMpID0+IHJlcy5rZXkgPT09IHBheWxvYWQuaWQpO1xuXHRcdFx0XHRcdGlmIChsYXN0UmVzdWx0KSB7XG5cdFx0XHRcdFx0XHRsYXN0UmVzdWx0LnRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0bGFzdFJlc3VsdC5kYXRhLndvcmtzcGFjZVRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0KGxhc3RSZXN1bHQudGVtcGxhdGVDb250ZW50IGFzIEN1c3RvbVRlbXBsYXRlKS5kYXRhLnRpdGxlID0gcGF5bG9hZC5wYWdlLnRpdGxlO1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRBZGRVcGRhdGUoW2xhc3RSZXN1bHRdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcblx0XHRcdFx0XHR0aGlzLnJlc3VsdFJlbW92ZShwYXlsb2FkLmlkIGFzIHN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInRoZW1lLWNoYW5nZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRhd2FpdCB0aGlzLnJlYnVpbGRSZXN1bHRzKHBsYXRmb3JtKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRjb25zdCBwYWdlczogUGFnZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlcygpO1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblxuXHRcdHRoaXMuX2xhc3RSZXNwb25zZSA9IGxhc3RSZXNwb25zZTtcblx0XHR0aGlzLl9sYXN0UXVlcnkgPSBxdWVyeUxvd2VyO1xuXHRcdHRoaXMuX2xhc3RRdWVyeU1pbkxlbmd0aCA9IG9wdGlvbnMucXVlcnlNaW5MZW5ndGg7XG5cblx0XHRjb25zdCBwYWdlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMoXG5cdFx0XHRwbGF0Zm9ybSxcblx0XHRcdHBhZ2VzLFxuXHRcdFx0cXVlcnlMb3dlcixcblx0XHRcdG9wdGlvbnMucXVlcnlNaW5MZW5ndGgsXG5cdFx0XHRjb2xvclNjaGVtZVxuXHRcdCk7XG5cblx0XHR0aGlzLl9sYXN0UmVzdWx0cyA9IHBhZ2VSZXN1bHRzO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IHBhZ2VSZXN1bHRzXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0bGV0IGhhbmRsZWQgPSBmYWxzZTtcblx0XHRpZiAocmVzdWx0LmFjdGlvbi50cmlnZ2VyID09PSBcInVzZXItYWN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGRhdGE6IHtcblx0XHRcdFx0cGFnZUlkPzogc3RyaW5nO1xuXHRcdFx0fSA9IHJlc3VsdC5kYXRhO1xuXG5cdFx0XHRpZiAoZGF0YT8ucGFnZUlkKSB7XG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZVRvTGF1bmNoID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlKGRhdGEucGFnZUlkKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMubGF1bmNoUGFnZShwYWdlVG9MYXVuY2gpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gUGFnZXNQcm92aWRlci5fQUNUSU9OX0RFTEVURV9QQUdFKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0UGxhdGZvcm0oKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmRlbGV0ZVBhZ2UoZGF0YS5wYWdlSWQpO1xuXHRcdFx0XHRcdC8vIERlbGV0aW5nIHRoZSBwYWdlIHdpbGwgZXZlbnR1YWxseSB0cmlnZ2VyIHRoZSBcImRlbGV0ZVwiIGxpZmVjeWNsZVxuXHRcdFx0XHRcdC8vIGV2ZW50IHdoaWNoIHdpbGwgcmVtb3ZlIGl0IGZyb20gdGhlIHJlc3VsdCBsaXN0XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fU0hBUkVfUEFHRSkge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5zaGFyZSh7IHBhZ2VJZDogZGF0YS5wYWdlSWQgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBVbnJlY29nbml6ZWQgYWN0aW9uIGZvciBwYWdlIHNlbGVjdGlvbjogJHtkYXRhLnBhZ2VJZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVkO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRQYWdlVGVtcGxhdGUoXG5cdFx0aWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdHNoYXJlRW5hYmxlZDogYm9vbGVhbixcblx0XHRjb2xvclNjaGVtZTogQ29sb3JTY2hlbWVNb2RlLFxuXHRcdHBhbGV0dGU6IEN1c3RvbVBhbGV0dGVTZXRcblx0KTogSG9tZVNlYXJjaFJlc3VsdCB7XG5cdFx0bGV0IGFjdGlvbnMgPSBbXTtcblxuXHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFLFxuXHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChbXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdH1cblx0XHRdKTtcblx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmdldE90aGVyUGFnZVRlbXBsYXRlKHNoYXJlRW5hYmxlZCwgcGFsZXR0ZSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBpZCxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiUGFnZVwiLFxuXHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLnBhZ2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRhY3Rpb25zLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBQYWdlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0cGFnZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0dGFnczogW1wicGFnZVwiXVxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0XHRpbnN0cnVjdGlvbnM6IFwiVXNlIHRoZSBidXR0b25zIGJlbG93IHRvIGludGVyYWN0IHdpdGggeW91ciBzYXZlZCBwYWdlXCIsXG5cdFx0XHRcdFx0b3BlblRleHQ6IFwiTGF1bmNoXCIsXG5cdFx0XHRcdFx0ZGVsZXRlVGV4dDogXCJEZWxldGVcIixcblx0XHRcdFx0XHRzaGFyZVRleHQ6IFwiU2hhcmVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0T3RoZXJQYWdlVGVtcGxhdGUoZW5hYmxlU2hhcmU6IGJvb2xlYW4sIHBhbGV0dGU6IEN1c3RvbVBhbGV0dGVTZXQpOiBUZW1wbGF0ZUZyYWdtZW50IHtcblx0XHRjb25zdCBhY3Rpb25CdXR0b25zOiBUZW1wbGF0ZUZyYWdtZW50W10gPSBbXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFLFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0ZGF0YUtleTogXCJvcGVuVGV4dFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRidXR0b25TdHlsZTogXCJwcmltYXJ5XCIgYXMgQnV0dG9uU3R5bGUuUHJpbWFyeSxcblx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcImRlbGV0ZVRleHRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRpZiAoZW5hYmxlU2hhcmUpIHtcblx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGJ1dHRvblN0eWxlOiBcInByaW1hcnlcIiBhcyBCdXR0b25TdHlsZS5QcmltYXJ5LFxuXHRcdFx0XHRhY3Rpb246IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFLFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0ZGF0YUtleTogXCJzaGFyZVRleHRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIixcblx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdGZsZXg6IDFcblx0XHRcdH0sXG5cdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJ0aXRsZVwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIixcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjE2cHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdCb3R0b206IFwiNXB4XCIsXG5cdFx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0Ym9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7cGFsZXR0ZS5iYWNrZ3JvdW5kNn1gXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJpbnN0cnVjdGlvbnNcIixcblx0XHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFx0ZmxleDogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdFx0anVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG5cdFx0XHRcdFx0XHRnYXA6IFwiMTBweFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjaGlsZHJlbjogYWN0aW9uQnV0dG9uc1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgcmVidWlsZFJlc3VsdHMocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgY29sb3JTY2hlbWUgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudENvbG9yU2NoZW1lTW9kZSgpO1xuXG5cdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5idWlsZFJlc3VsdHMoXG5cdFx0XHRwbGF0Zm9ybSxcblx0XHRcdHBhZ2VzLFxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5LFxuXHRcdFx0dGhpcy5fbGFzdFF1ZXJ5TWluTGVuZ3RoLFxuXHRcdFx0Y29sb3JTY2hlbWVcblx0XHQpO1xuXHRcdHRoaXMucmVzdWx0QWRkVXBkYXRlKHJlc3VsdHMpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBidWlsZFJlc3VsdHMoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHBhZ2VzOiBQYWdlW10sXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGVcblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRsZXQgcmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYWdlcykpIHtcblx0XHRcdGNvbnN0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXHRcdFx0Y29uc3QgcGFsZXR0ZTogQ3VzdG9tUGFsZXR0ZVNldCA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50UGFsZXR0ZSgpO1xuXG5cdFx0XHRyZXN1bHRzID0gcGFnZXNcblx0XHRcdFx0LmZpbHRlcihcblx0XHRcdFx0XHQocGcpID0+XG5cdFx0XHRcdFx0XHRxdWVyeS5sZW5ndGggPT09IDAgfHwgKHF1ZXJ5Lmxlbmd0aCA+PSBxdWVyeU1pbkxlbmd0aCAmJiBwZy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSlcblx0XHRcdFx0KVxuXHRcdFx0XHQubWFwKChwZzogUGFnZSkgPT4gdGhpcy5nZXRQYWdlVGVtcGxhdGUocGcucGFnZUlkLCBwZy50aXRsZSwgc2hhcmVFbmFibGVkLCBjb2xvclNjaGVtZSwgcGFsZXR0ZSkpXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJpdmF0ZSByZXN1bHRBZGRVcGRhdGUocmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXN1bHRzKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdEluZGV4ID0gdGhpcy5fbGFzdFJlc3VsdHMuZmluZEluZGV4KChyZXMpID0+IHJlcy5rZXkgPT09IHJlc3VsdC5rZXkpO1xuXHRcdFx0XHRpZiAocmVzdWx0SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RSZXN1bHRzLnNwbGljZShyZXN1bHRJbmRleCwgMSwgcmVzdWx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJlc3BvbmQocmVzdWx0cyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZXN1bHRSZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0UmVzdWx0cykge1xuXHRcdFx0Y29uc3QgcmVzdWx0SW5kZXggPSB0aGlzLl9sYXN0UmVzdWx0cy5maW5kSW5kZXgoKHJlcykgPT4gcmVzLmtleSA9PT0gaWQpO1xuXHRcdFx0aWYgKHJlc3VsdEluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5fbGFzdFJlc3VsdHMuc3BsaWNlKHJlc3VsdEluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xhc3RSZXNwb25zZSkge1xuXHRcdFx0dGhpcy5fbGFzdFJlc3BvbnNlLnJldm9rZShpZCk7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFBhZ2VzUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBQYWdlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFBhZ2VzUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==