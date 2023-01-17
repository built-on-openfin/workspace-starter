/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/integrations/version/integration-provider.ts":
/*!*************************************************************************!*\
  !*** ./client/src/modules/integrations/version/integration-provider.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VersionProvider": () => (/* binding */ VersionProvider)
/* harmony export */ });
/**
 * Implement the integration provider for version info.
 */
class VersionProvider {
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
        this._logger = loggerCreator("VersionProvider");
    }
    /**
     * Get a list of the static help entries.
     * @returns The list of help entries.
     */
    async getHelpSearchEntries() {
        return [
            {
                key: `${VersionProvider._PROVIDER_ID}-help`,
                title: VersionProvider._VERSION_COMMAND,
                label: "Help",
                icon: this._definition?.icon,
                actions: [],
                data: {
                    providerId: VersionProvider._PROVIDER_ID,
                    populateQuery: VersionProvider._VERSION_COMMAND
                },
                template: "Custom",
                templateContent: await this._integrationHelpers.templateHelpers.createHelp(VersionProvider._VERSION_COMMAND, ["The version commands lists the version information related to this platform."], [VersionProvider._VERSION_COMMAND])
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
        if (query.length < 2 || !VersionProvider._VERSION_COMMAND.startsWith(query)) {
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
            tableData.push([keys[i], (versionInfo[keys[i]] ?? "unknown")]);
        }
        data.title = "Versions";
        const result = {
            key: "version-info",
            title: VersionProvider._VERSION_COMMAND,
            label: "Version",
            icon: this._definition?.icon,
            actions,
            data: {
                providerId: VersionProvider._PROVIDER_ID
            },
            template: "Custom",
            templateContent: {
                layout: await this._integrationHelpers.templateHelpers.createContainer("column", [
                    await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
                        marginBottom: "10px",
                        borderBottom: `1px solid ${palette.background6}`
                    }),
                    await this._integrationHelpers.templateHelpers.createTable(tableData, [], 0, data)
                ], {
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
VersionProvider._PROVIDER_ID = "version";
/**
 * The command to display the version.
 * @internal
 */
VersionProvider._VERSION_COMMAND = "/version";


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
/*!**********************************************************!*\
  !*** ./client/src/modules/integrations/version/index.ts ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _integration_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration-provider */ "./client/src/modules/integrations/version/integration-provider.ts");

const entryPoints = {
    integrations: new _integration_provider__WEBPACK_IMPORTED_MODULE_0__.VersionProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnlEO0FBRWxELE1BQU0sV0FBVyxHQUFzQztJQUM3RCxZQUFZLEVBQUUsSUFBSSxrRUFBZSxFQUFFO0NBQ25DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlZ3JhdGlvbnMvdmVyc2lvbi9pbnRlZ3JhdGlvbi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy92ZXJzaW9uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q0xJRmlsdGVyLFxuXHRDTElUZW1wbGF0ZSxcblx0SG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRIb21lU2VhcmNoUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXN1bHRcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlZ3JhdGlvbkhlbHBlcnMsIEludGVncmF0aW9uTW9kdWxlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2ludGVncmF0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBmb3IgdmVyc2lvbiBpbmZvLlxuICovXG5leHBvcnQgY2xhc3MgVmVyc2lvblByb3ZpZGVyIGltcGxlbWVudHMgSW50ZWdyYXRpb25Nb2R1bGU8dW5rbm93bj4ge1xuXHQvKipcblx0ICogUHJvdmlkZXIgaWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1BST1ZJREVSX0lEID0gXCJ2ZXJzaW9uXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBjb21tYW5kIHRvIGRpc3BsYXkgdGhlIHZlcnNpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX1ZFUlNJT05fQ09NTUFORCA9IFwiL3ZlcnNpb25cIjtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgaW50ZWdyYXRpb24uXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlZ3JhdGlvbiBoZWxwZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2ludGVncmF0aW9uSGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPHVua25vd24+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPHVua25vd24+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogSW50ZWdyYXRpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2ludGVncmF0aW9uSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlZlcnNpb25Qcm92aWRlclwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBzdGF0aWMgaGVscCBlbnRyaWVzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBoZWxwIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0SGVscFNlYXJjaEVudHJpZXMoKTogUHJvbWlzZTxIb21lU2VhcmNoUmVzdWx0W10+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6IGAke1ZlcnNpb25Qcm92aWRlci5fUFJPVklERVJfSUR9LWhlbHBgLFxuXHRcdFx0XHR0aXRsZTogVmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkQsXG5cdFx0XHRcdGxhYmVsOiBcIkhlbHBcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdFx0YWN0aW9uczogW10sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm92aWRlcklkOiBWZXJzaW9uUHJvdmlkZXIuX1BST1ZJREVSX0lELFxuXHRcdFx0XHRcdHBvcHVsYXRlUXVlcnk6IFZlcnNpb25Qcm92aWRlci5fVkVSU0lPTl9DT01NQU5EXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdFx0dGVtcGxhdGVDb250ZW50OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUhlbHAoXG5cdFx0XHRcdFx0VmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkQsXG5cdFx0XHRcdFx0W1wiVGhlIHZlcnNpb24gY29tbWFuZHMgbGlzdHMgdGhlIHZlcnNpb24gaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGlzIHBsYXRmb3JtLlwiXSxcblx0XHRcdFx0XHRbVmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkRdXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIHF1ZXJ5IGFuZCBmaWx0ZXJzLlxuXHQgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3IuXG5cdCAqIEBwYXJhbSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGFwcGx5LlxuXHQgKiBAcGFyYW0gbGFzdFJlc3BvbnNlIFRoZSBsYXN0IHNlYXJjaCByZXNwb25zZSB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyByZXN1bHRzLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHF1ZXJ5LlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiByZXN1bHRzIGFuZCBuZXcgZmlsdGVycy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxuXHRcdHF1ZXJ5OiBzdHJpbmcsXG5cdFx0ZmlsdGVyczogQ0xJRmlsdGVyW10sXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZSxcblx0XHRvcHRpb25zOiB7XG5cdFx0XHRxdWVyeU1pbkxlbmd0aDogbnVtYmVyO1xuXHRcdFx0cXVlcnlBZ2FpbnN0OiBzdHJpbmdbXTtcblx0XHR9XG5cdCk6IFByb21pc2U8SG9tZVNlYXJjaFJlc3BvbnNlPiB7XG5cdFx0aWYgKHF1ZXJ5Lmxlbmd0aCA8IDIgfHwgIVZlcnNpb25Qcm92aWRlci5fVkVSU0lPTl9DT01NQU5ELnN0YXJ0c1dpdGgocXVlcnkpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyZXN1bHRzOiBbXVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0Y29uc3QgcGFsZXR0ZSA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRDdXJyZW50UGFsZXR0ZSgpO1xuXG5cdFx0Y29uc3QgdmVyc2lvbkluZm8gPSBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMuZ2V0VmVyc2lvbkluZm8oKTtcblxuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXTtcblxuXHRcdGNvbnN0IGRhdGE6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG5cdFx0Y29uc3QgdGFibGVEYXRhOiBzdHJpbmdbXVtdID0gW107XG5cdFx0dGFibGVEYXRhLnB1c2goW1wiVmVyc2lvbiBUeXBlXCIsIFwiVmVyc2lvblwiXSk7XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2ZXJzaW9uSW5mbyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhYmxlRGF0YS5wdXNoKFtrZXlzW2ldLCAodmVyc2lvbkluZm9ba2V5c1tpXV0gPz8gXCJ1bmtub3duXCIpIGFzIHN0cmluZ10pO1xuXHRcdH1cblxuXHRcdGRhdGEudGl0bGUgPSBcIlZlcnNpb25zXCI7XG5cblx0XHRjb25zdCByZXN1bHQgPSB7XG5cdFx0XHRrZXk6IFwidmVyc2lvbi1pbmZvXCIsXG5cdFx0XHR0aXRsZTogVmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkQsXG5cdFx0XHRsYWJlbDogXCJWZXJzaW9uXCIsXG5cdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0YWN0aW9ucyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cHJvdmlkZXJJZDogVmVyc2lvblByb3ZpZGVyLl9QUk9WSURFUl9JRFxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiBcIkN1c3RvbVwiIGFzIENMSVRlbXBsYXRlLkN1c3RvbSxcblx0XHRcdHRlbXBsYXRlQ29udGVudDoge1xuXHRcdFx0XHRsYXlvdXQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlQ29udGFpbmVyKFxuXHRcdFx0XHRcdFwiY29sdW1uXCIsXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUaXRsZShcInRpdGxlXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7XG5cdFx0XHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG5cdFx0XHRcdFx0XHRcdGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3BhbGV0dGUuYmFja2dyb3VuZDZ9YFxuXHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZVRhYmxlKHRhYmxlRGF0YSwgW10sIDAsIGRhdGEpXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYWRkaW5nOiBcIjEwcHhcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KSxcblx0XHRcdFx0ZGF0YVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdWx0czogW3Jlc3VsdF1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGVudHJ5IGhhcyBiZWVuIHNlbGVjdGVkLlxuXHQgKiBAcGFyYW0gcmVzdWx0IFRoZSBkaXNwYXRjaGVkIHJlc3VsdC5cblx0ICogQHBhcmFtIGxhc3RSZXNwb25zZSBUaGUgbGFzdCByZXNwb25zZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSB3YXMgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpdGVtU2VsZWN0aW9uKFxuXHRcdHJlc3VsdDogSG9tZURpc3BhdGNoZWRTZWFyY2hSZXN1bHQsXG5cdFx0bGFzdFJlc3BvbnNlOiBIb21lU2VhcmNoTGlzdGVuZXJSZXNwb25zZVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBWZXJzaW9uUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlZ3JhdGlvbi1wcm92aWRlclwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW2lkOiBzdHJpbmddOiBWZXJzaW9uUHJvdmlkZXIgfSA9IHtcblx0aW50ZWdyYXRpb25zOiBuZXcgVmVyc2lvblByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=