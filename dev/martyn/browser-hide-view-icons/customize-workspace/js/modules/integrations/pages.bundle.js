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
        const iconFolder = await this._integrationHelpers.getCurrentIconFolder();
        const queryLower = query.toLowerCase();
        let pageResults = [];
        if (Array.isArray(pages)) {
            const shareEnabled = await this._integrationHelpers.condition("sharing");
            pageResults = pages
                .filter((pg) => query.length === 0 ||
                (query.length >= options.queryMinLength && pg.title.toLowerCase().includes(queryLower)))
                .map((pg) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, iconFolder, colorScheme));
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
                    const platform = this._integrationHelpers.getPlatform();
                    const pageToLaunch = await platform.Storage.getPage(data.pageId);
                    await this._integrationHelpers.launchPage(pageToLaunch);
                }
                else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
                    const platform = this._integrationHelpers.getPlatform();
                    await platform.Storage.deletePage(data.pageId);
                    lastResponse.revoke(result.key);
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
    getPageTemplate(id, title, shareEnabled, iconFolder, colorScheme) {
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
        const layout = this.getOtherPageTemplate(shareEnabled);
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
                    instructions: "Use the buttons below to interact with your saved Page:",
                    openText: "Launch",
                    deleteText: "Delete",
                    shareText: "Share"
                }
            }
        };
    }
    getOtherPageTemplate(enableShare) {
        const actionButtons = [
            {
                type: "Button",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px"
                },
                action: PagesProvider._ACTION_LAUNCH_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "openText",
                        optional: false
                    }
                ]
            },
            {
                type: "Button",
                buttonStyle: "primary",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px",
                    marginLeft: "10px",
                    marginRight: "10px"
                },
                action: PagesProvider._ACTION_DELETE_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "deleteText",
                        optional: false
                    }
                ]
            }
        ];
        if (enableShare) {
            actionButtons.push({
                type: "Button",
                buttonStyle: "primary",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "80px"
                },
                action: PagesProvider._ACTION_SHARE_PAGE,
                children: [
                    {
                        type: "Text",
                        dataKey: "shareText",
                        optional: false
                    }
                ]
            });
        }
        return {
            type: "Container",
            style: {
                paddingTop: "10px",
                display: "flex",
                flexDirection: "column"
            },
            children: [
                {
                    type: "Text",
                    dataKey: "title",
                    style: {
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                    }
                },
                {
                    type: "Text",
                    dataKey: "description",
                    optional: true,
                    style: {
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }
                },
                {
                    type: "Text",
                    dataKey: "instructions",
                    style: {
                        fontWeight: "bold",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }
                },
                {
                    type: "Container",
                    style: {
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "center",
                        paddingTop: "10px",
                        paddingBottom: "10px"
                    },
                    children: actionButtons
                }
            ]
        };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBRXZDLE1BQU0sV0FBVyxHQUFvQztJQUMzRCxZQUFZLEVBQUUsSUFBSSx1REFBYSxFQUFFO0NBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW50ZWdyYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRCdXR0b25TdHlsZSxcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHQsXG5cdFBhZ2UsXG5cdFRlbXBsYXRlRnJhZ21lbnRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IENvbG9yU2NoZW1lTW9kZSB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy90aGVtZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZXNTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXIgZm9yIHBhZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZXNQcm92aWRlciBpbXBsZW1lbnRzIEludGVncmF0aW9uTW9kdWxlPFBhZ2VzU2V0dGluZ3M+IHtcblx0LyoqXG5cdCAqIFByb3ZpZGVyIGlkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9QUk9WSURFUl9JRCA9IFwicGFnZXNcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGxhdW5jaGluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9MQVVOQ0hfUEFHRSA9IFwiTGF1bmNoIFBhZ2VcIjtcblxuXHQvKipcblx0ICogVGhlIGtleSB0byB1c2UgZm9yIGRlbGV0aW5nIGEgcGFnZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfQUNUSU9OX0RFTEVURV9QQUdFID0gXCJEZWxldGUgUGFnZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IHRvIHVzZSBmb3Igc2hhcmluZyBhIHBhZ2UuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0FDVElPTl9TSEFSRV9QQUdFID0gXCJTaGFyZSBQYWdlXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmcm9tIGNvbmZpZy5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBQYWdlc1NldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZXNQcm92aWRlclwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdGNvbnN0IHBhZ2VzID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlcygpO1xuXHRcdGNvbnN0IGNvbG9yU2NoZW1lID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRDb2xvclNjaGVtZU1vZGUoKTtcblx0XHRjb25zdCBpY29uRm9sZGVyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0Q3VycmVudEljb25Gb2xkZXIoKTtcblx0XHRjb25zdCBxdWVyeUxvd2VyID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblxuXHRcdGxldCBwYWdlUmVzdWx0czogSG9tZVNlYXJjaFJlc3VsdFtdID0gW107XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYWdlcykpIHtcblx0XHRcdGNvbnN0IHNoYXJlRW5hYmxlZDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5jb25kaXRpb24oXCJzaGFyaW5nXCIpO1xuXG5cdFx0XHRwYWdlUmVzdWx0cyA9IHBhZ2VzXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0KHBnKSA9PlxuXHRcdFx0XHRcdFx0cXVlcnkubGVuZ3RoID09PSAwIHx8XG5cdFx0XHRcdFx0XHQocXVlcnkubGVuZ3RoID49IG9wdGlvbnMucXVlcnlNaW5MZW5ndGggJiYgcGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeUxvd2VyKSlcblx0XHRcdFx0KVxuXHRcdFx0XHQubWFwKChwZzogUGFnZSkgPT4gdGhpcy5nZXRQYWdlVGVtcGxhdGUocGcucGFnZUlkLCBwZy50aXRsZSwgc2hhcmVFbmFibGVkLCBpY29uRm9sZGVyLCBjb2xvclNjaGVtZSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN1bHRzOiBwYWdlUmVzdWx0c1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQW4gZW50cnkgaGFzIGJlZW4gc2VsZWN0ZWQuXG5cdCAqIEBwYXJhbSByZXN1bHQgVGhlIGRpc3BhdGNoZWQgcmVzdWx0LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHJlc3BvbnNlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHdhcyBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGl0ZW1TZWxlY3Rpb24oXG5cdFx0cmVzdWx0OiBIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCBoYW5kbGVkID0gZmFsc2U7XG5cdFx0aWYgKHJlc3VsdC5hY3Rpb24udHJpZ2dlciA9PT0gXCJ1c2VyLWFjdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkYXRhOiB7XG5cdFx0XHRcdHBhZ2VJZD86IHN0cmluZztcblx0XHRcdH0gPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0aWYgKGRhdGE/LnBhZ2VJZCkge1xuXHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAocmVzdWx0LmFjdGlvbi5uYW1lID09PSBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fTEFVTkNIX1BBR0UpIHtcblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRQbGF0Zm9ybSgpO1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VUb0xhdW5jaCA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZShkYXRhLnBhZ2VJZCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmxhdW5jaFBhZ2UocGFnZVRvTGF1bmNoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuYWN0aW9uLm5hbWUgPT09IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSkge1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldFBsYXRmb3JtKCk7XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5kZWxldGVQYWdlKGRhdGEucGFnZUlkKTtcblx0XHRcdFx0XHRsYXN0UmVzcG9uc2UucmV2b2tlKHJlc3VsdC5rZXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5hY3Rpb24ubmFtZSA9PT0gUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0UpIHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuc2hhcmUoeyBwYWdlSWQ6IGRhdGEucGFnZUlkIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2FybihgVW5yZWNvZ25pemVkIGFjdGlvbiBmb3IgcGFnZSBzZWxlY3Rpb246ICR7ZGF0YS5wYWdlSWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlZDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0UGFnZVRlbXBsYXRlKFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRzaGFyZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdFx0aWNvbkZvbGRlcjogc3RyaW5nLFxuXHRcdGNvbG9yU2NoZW1lOiBDb2xvclNjaGVtZU1vZGVcblx0KTogSG9tZVNlYXJjaFJlc3VsdCB7XG5cdFx0bGV0IGFjdGlvbnMgPSBbXTtcblxuXHRcdGlmIChzaGFyZUVuYWJsZWQpIHtcblx0XHRcdGFjdGlvbnMucHVzaCh7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9TSEFSRV9QQUdFLFxuXHRcdFx0XHRob3RrZXk6IFwiQ21kT3JDdHJsK1NoaWZ0K1NcIlxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChbXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9ERUxFVEVfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkNtZE9yQ3RybCtTaGlmdCtEXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFBhZ2VzUHJvdmlkZXIuX0FDVElPTl9MQVVOQ0hfUEFHRSxcblx0XHRcdFx0aG90a2V5OiBcIkVudGVyXCJcblx0XHRcdH1cblx0XHRdKTtcblx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmdldE90aGVyUGFnZVRlbXBsYXRlKHNoYXJlRW5hYmxlZCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBpZCxcblx0XHRcdHRpdGxlLFxuXHRcdFx0bGFiZWw6IFwiUGFnZVwiLFxuXHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3MuaW1hZ2VzLnBhZ2UucmVwbGFjZShcIntzY2hlbWV9XCIsIGNvbG9yU2NoZW1lIGFzIHN0cmluZyksXG5cdFx0XHRhY3Rpb25zLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRwcm92aWRlcklkOiBQYWdlc1Byb3ZpZGVyLl9QUk9WSURFUl9JRCxcblx0XHRcdFx0cGFnZVRpdGxlOiB0aXRsZSxcblx0XHRcdFx0cGFnZUlkOiBpZCxcblx0XHRcdFx0dGFnczogW1wicGFnZVwiXVxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0XHRpbnN0cnVjdGlvbnM6IFwiVXNlIHRoZSBidXR0b25zIGJlbG93IHRvIGludGVyYWN0IHdpdGggeW91ciBzYXZlZCBQYWdlOlwiLFxuXHRcdFx0XHRcdG9wZW5UZXh0OiBcIkxhdW5jaFwiLFxuXHRcdFx0XHRcdGRlbGV0ZVRleHQ6IFwiRGVsZXRlXCIsXG5cdFx0XHRcdFx0c2hhcmVUZXh0OiBcIlNoYXJlXCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGdldE90aGVyUGFnZVRlbXBsYXRlKGVuYWJsZVNoYXJlOiBib29sZWFuKTogVGVtcGxhdGVGcmFnbWVudCB7XG5cdFx0Y29uc3QgYWN0aW9uQnV0dG9uczogVGVtcGxhdGVGcmFnbWVudFtdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0d2lkdGg6IFwiODBweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX0xBVU5DSF9QQUdFLFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0ZGF0YUtleTogXCJvcGVuVGV4dFwiLFxuXHRcdFx0XHRcdFx0b3B0aW9uYWw6IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIkJ1dHRvblwiLFxuXHRcdFx0XHRidXR0b25TdHlsZTogXCJwcmltYXJ5XCIgYXMgQnV0dG9uU3R5bGUuUHJpbWFyeSxcblx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0XHRmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuXHRcdFx0XHRcdHdpZHRoOiBcIjgwcHhcIixcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OiBcIjEwcHhcIixcblx0XHRcdFx0XHRtYXJnaW5SaWdodDogXCIxMHB4XCJcblx0XHRcdFx0fSxcblx0XHRcdFx0YWN0aW9uOiBQYWdlc1Byb3ZpZGVyLl9BQ1RJT05fREVMRVRFX1BBR0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcImRlbGV0ZVRleHRcIixcblx0XHRcdFx0XHRcdG9wdGlvbmFsOiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRpZiAoZW5hYmxlU2hhcmUpIHtcblx0XHRcdGFjdGlvbkJ1dHRvbnMucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwiQnV0dG9uXCIsXG5cdFx0XHRcdGJ1dHRvblN0eWxlOiBcInByaW1hcnlcIiBhcyBCdXR0b25TdHlsZS5QcmltYXJ5LFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGRpc3BsYXk6IFwiZmxleFwiLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0d2lkdGg6IFwiODBweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjdGlvbjogUGFnZXNQcm92aWRlci5fQUNUSU9OX1NIQVJFX1BBR0UsXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRkYXRhS2V5OiBcInNoYXJlVGV4dFwiLFxuXHRcdFx0XHRcdFx0b3B0aW9uYWw6IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiQ29udGFpbmVyXCIsXG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRwYWRkaW5nVG9wOiBcIjEwcHhcIixcblx0XHRcdFx0ZGlzcGxheTogXCJmbGV4XCIsXG5cdFx0XHRcdGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCJcblx0XHRcdH0sXG5cdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0ZGF0YUtleTogXCJ0aXRsZVwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIixcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjE2cHhcIixcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdGRhdGFLZXk6IFwiZGVzY3JpcHRpb25cIixcblx0XHRcdFx0XHRvcHRpb25hbDogdHJ1ZSxcblx0XHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFx0cGFkZGluZ0xlZnQ6IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1JpZ2h0OiBcIjEwcHhcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdGRhdGFLZXk6IFwiaW5zdHJ1Y3Rpb25zXCIsXG5cdFx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ1RvcDogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdMZWZ0OiBcIjEwcHhcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdSaWdodDogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIkNvbnRhaW5lclwiLFxuXHRcdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBcImZsZXhcIixcblx0XHRcdFx0XHRcdGZsZXhGbG93OiBcInJvdyB3cmFwXCIsXG5cdFx0XHRcdFx0XHRqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcblx0XHRcdFx0XHRcdHBhZGRpbmdUb3A6IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0cGFkZGluZ0JvdHRvbTogXCIxMHB4XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBhY3Rpb25CdXR0b25zXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFBhZ2VzUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBQYWdlc1Byb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFBhZ2VzUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==