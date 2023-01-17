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
        tableData.push(["Version Type", "Current Version"]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUE7O0dBRUc7QUFDSSxNQUFNLGVBQWU7SUErQjNCOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQXFDLEVBQ3JDLGFBQTRCLEVBQzVCLE9BQTJCO1FBRTNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLG9CQUFvQjtRQUNoQyxPQUFPO1lBQ047Z0JBQ0MsR0FBRyxFQUFFLEdBQUcsZUFBZSxDQUFDLFlBQVksT0FBTztnQkFDM0MsS0FBSyxFQUFFLGVBQWUsQ0FBQyxnQkFBZ0I7Z0JBQ3ZDLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUk7Z0JBQzVCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLElBQUksRUFBRTtvQkFDTCxVQUFVLEVBQUUsZUFBZSxDQUFDLFlBQVk7b0JBQ3hDLGFBQWEsRUFBRSxlQUFlLENBQUMsZ0JBQWdCO2lCQUMvQztnQkFDRCxRQUFRLEVBQUUsUUFBOEI7Z0JBQ3hDLGVBQWUsRUFBRSxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUN6RSxlQUFlLENBQUMsZ0JBQWdCLEVBQ2hDLENBQUMsOEVBQThFLENBQUMsRUFDaEYsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FDbEM7YUFDRDtTQUNELENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDNUIsS0FBYSxFQUNiLE9BQW9CLEVBQ3BCLFlBQXdDLEVBQ3hDLE9BR0M7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxPQUFPO2dCQUNOLE9BQU8sRUFBRSxFQUFFO2FBQ1gsQ0FBQztTQUNGO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUVuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVwRSxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsTUFBTSxJQUFJLEdBQTZCLEVBQUUsQ0FBQztRQUUxQyxNQUFNLFNBQVMsR0FBZSxFQUFFLENBQUM7UUFDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFFcEQsaUVBQWlFO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQVcsQ0FBQyxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUV4QixNQUFNLE1BQU0sR0FBRztZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEtBQUssRUFBRSxlQUFlLENBQUMsZ0JBQWdCO1lBQ3ZDLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUk7WUFDNUIsT0FBTztZQUNQLElBQUksRUFBRTtnQkFDTCxVQUFVLEVBQUUsZUFBZSxDQUFDLFlBQVk7YUFDeEM7WUFDRCxRQUFRLEVBQUUsUUFBOEI7WUFDeEMsZUFBZSxFQUFFO2dCQUNoQixNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FDckUsUUFBUSxFQUNSO29CQUNDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7d0JBQ3pGLFlBQVksRUFBRSxNQUFNO3dCQUNwQixZQUFZLEVBQUUsYUFBYSxPQUFPLENBQUMsV0FBVyxFQUFFO3FCQUNoRCxDQUFDO29CQUNGLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO2lCQUNsRixFQUNEO29CQUNDLE9BQU8sRUFBRSxNQUFNO2lCQUNmLENBQ0Q7Z0JBQ0QsSUFBSTthQUNKO1NBQ0QsQ0FBQztRQUVGLE9BQU87WUFDTixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDakIsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQ3pCLE1BQWtDLEVBQ2xDLFlBQXdDO1FBRXhDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQzs7QUEvSkQ7OztHQUdHO0FBQ3FCLDRCQUFZLEdBQUcsU0FBUyxDQUFDO0FBRWpEOzs7R0FHRztBQUNxQixnQ0FBZ0IsR0FBRyxVQUFVLENBQUM7Ozs7Ozs7U0MxQnZEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFFbEQsTUFBTSxXQUFXLEdBQXNDO0lBQzdELFlBQVksRUFBRSxJQUFJLGtFQUFlLEVBQUU7Q0FDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVncmF0aW9ucy92ZXJzaW9uL2ludGVncmF0aW9uLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZWdyYXRpb25zL3ZlcnNpb24vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDTElGaWx0ZXIsXG5cdENMSVRlbXBsYXRlLFxuXHRIb21lRGlzcGF0Y2hlZFNlYXJjaFJlc3VsdCxcblx0SG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2UsXG5cdEhvbWVTZWFyY2hSZXNwb25zZSxcblx0SG9tZVNlYXJjaFJlc3VsdFxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IEludGVncmF0aW9uSGVscGVycywgSW50ZWdyYXRpb25Nb2R1bGUgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvaW50ZWdyYXRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGludGVncmF0aW9uIHByb3ZpZGVyIGZvciB2ZXJzaW9uIGluZm8uXG4gKi9cbmV4cG9ydCBjbGFzcyBWZXJzaW9uUHJvdmlkZXIgaW1wbGVtZW50cyBJbnRlZ3JhdGlvbk1vZHVsZTx1bmtub3duPiB7XG5cdC8qKlxuXHQgKiBQcm92aWRlciBpZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfUFJPVklERVJfSUQgPSBcInZlcnNpb25cIjtcblxuXHQvKipcblx0ICogVGhlIGNvbW1hbmQgdG8gZGlzcGxheSB0aGUgdmVyc2lvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBfVkVSU0lPTl9DT01NQU5EID0gXCIvdmVyc2lvblwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBpbnRlZ3JhdGlvbi5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGludGVncmF0aW9uIGhlbHBlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaW50ZWdyYXRpb25IZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIGludGVncmF0aW9uLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248dW5rbm93bj4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBJbnRlZ3JhdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW50ZWdyYXRpb25IZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiVmVyc2lvblByb3ZpZGVyXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgdGhlIHN0YXRpYyBoZWxwIGVudHJpZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGhlbHAgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRIZWxwU2VhcmNoRW50cmllcygpOiBQcm9taXNlPEhvbWVTZWFyY2hSZXN1bHRbXT4ge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogYCR7VmVyc2lvblByb3ZpZGVyLl9QUk9WSURFUl9JRH0taGVscGAsXG5cdFx0XHRcdHRpdGxlOiBWZXJzaW9uUHJvdmlkZXIuX1ZFUlNJT05fQ09NTUFORCxcblx0XHRcdFx0bGFiZWw6IFwiSGVscFwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uPy5pY29uLFxuXHRcdFx0XHRhY3Rpb25zOiBbXSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHByb3ZpZGVySWQ6IFZlcnNpb25Qcm92aWRlci5fUFJPVklERVJfSUQsXG5cdFx0XHRcdFx0cG9wdWxhdGVRdWVyeTogVmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkRcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVtcGxhdGU6IFwiQ3VzdG9tXCIgYXMgQ0xJVGVtcGxhdGUuQ3VzdG9tLFxuXHRcdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlSGVscChcblx0XHRcdFx0XHRWZXJzaW9uUHJvdmlkZXIuX1ZFUlNJT05fQ09NTUFORCxcblx0XHRcdFx0XHRbXCJUaGUgdmVyc2lvbiBjb21tYW5kcyBsaXN0cyB0aGUgdmVyc2lvbiBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoaXMgcGxhdGZvcm0uXCJdLFxuXHRcdFx0XHRcdFtWZXJzaW9uUHJvdmlkZXIuX1ZFUlNJT05fQ09NTUFORF1cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdF07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBzZWFyY2ggcmVzdWx0cyBiYXNlZCBvbiB0aGUgcXVlcnkgYW5kIGZpbHRlcnMuXG5cdCAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIGZvci5cblx0ICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3Qgc2VhcmNoIHJlc3BvbnNlIHVzZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlc3VsdHMuXG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBzZWFyY2ggcXVlcnkuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNlYXJjaFJlc3VsdHMoXG5cdFx0cXVlcnk6IHN0cmluZyxcblx0XHRmaWx0ZXJzOiBDTElGaWx0ZXJbXSxcblx0XHRsYXN0UmVzcG9uc2U6IEhvbWVTZWFyY2hMaXN0ZW5lclJlc3BvbnNlLFxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdHF1ZXJ5TWluTGVuZ3RoOiBudW1iZXI7XG5cdFx0XHRxdWVyeUFnYWluc3Q6IHN0cmluZ1tdO1xuXHRcdH1cblx0KTogUHJvbWlzZTxIb21lU2VhcmNoUmVzcG9uc2U+IHtcblx0XHRpZiAocXVlcnkubGVuZ3RoIDwgMiB8fCAhVmVyc2lvblByb3ZpZGVyLl9WRVJTSU9OX0NPTU1BTkQuc3RhcnRzV2l0aChxdWVyeSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJlc3VsdHM6IFtdXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRjb25zdCBwYWxldHRlID0gYXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLmdldEN1cnJlbnRQYWxldHRlKCk7XG5cblx0XHRjb25zdCB2ZXJzaW9uSW5mbyA9IGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy5nZXRWZXJzaW9uSW5mbygpO1xuXG5cdFx0Y29uc3QgYWN0aW9ucyA9IFtdO1xuXG5cdFx0Y29uc3QgZGF0YTogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cblx0XHRjb25zdCB0YWJsZURhdGE6IHN0cmluZ1tdW10gPSBbXTtcblx0XHR0YWJsZURhdGEucHVzaChbXCJWZXJzaW9uIFR5cGVcIiwgXCJDdXJyZW50IFZlcnNpb25cIl0pO1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmVyc2lvbkluZm8pO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YWJsZURhdGEucHVzaChba2V5c1tpXSwgKHZlcnNpb25JbmZvW2tleXNbaV1dID8/IFwidW5rbm93blwiKSBhcyBzdHJpbmddKTtcblx0XHR9XG5cblx0XHRkYXRhLnRpdGxlID0gXCJWZXJzaW9uc1wiO1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0ge1xuXHRcdFx0a2V5OiBcInZlcnNpb24taW5mb1wiLFxuXHRcdFx0dGl0bGU6IFZlcnNpb25Qcm92aWRlci5fVkVSU0lPTl9DT01NQU5ELFxuXHRcdFx0bGFiZWw6IFwiVmVyc2lvblwiLFxuXHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbj8uaWNvbixcblx0XHRcdGFjdGlvbnMsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHByb3ZpZGVySWQ6IFZlcnNpb25Qcm92aWRlci5fUFJPVklERVJfSURcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogXCJDdXN0b21cIiBhcyBDTElUZW1wbGF0ZS5DdXN0b20sXG5cdFx0XHR0ZW1wbGF0ZUNvbnRlbnQ6IHtcblx0XHRcdFx0bGF5b3V0OiBhd2FpdCB0aGlzLl9pbnRlZ3JhdGlvbkhlbHBlcnMudGVtcGxhdGVIZWxwZXJzLmNyZWF0ZUNvbnRhaW5lcihcblx0XHRcdFx0XHRcImNvbHVtblwiLFxuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2ludGVncmF0aW9uSGVscGVycy50ZW1wbGF0ZUhlbHBlcnMuY3JlYXRlVGl0bGUoXCJ0aXRsZVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge1xuXHRcdFx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IFwiMTBweFwiLFxuXHRcdFx0XHRcdFx0XHRib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtwYWxldHRlLmJhY2tncm91bmQ2fWBcblx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faW50ZWdyYXRpb25IZWxwZXJzLnRlbXBsYXRlSGVscGVycy5jcmVhdGVUYWJsZSh0YWJsZURhdGEsIFtdLCAwLCBkYXRhKVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cGFkZGluZzogXCIxMHB4XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCksXG5cdFx0XHRcdGRhdGFcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3VsdHM6IFtyZXN1bHRdXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBlbnRyeSBoYXMgYmVlbiBzZWxlY3RlZC5cblx0ICogQHBhcmFtIHJlc3VsdCBUaGUgZGlzcGF0Y2hlZCByZXN1bHQuXG5cdCAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gd2FzIGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXRlbVNlbGVjdGlvbihcblx0XHRyZXN1bHQ6IEhvbWVEaXNwYXRjaGVkU2VhcmNoUmVzdWx0LFxuXHRcdGxhc3RSZXNwb25zZTogSG9tZVNlYXJjaExpc3RlbmVyUmVzcG9uc2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVmVyc2lvblByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZWdyYXRpb24tcHJvdmlkZXJcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFtpZDogc3RyaW5nXTogVmVyc2lvblByb3ZpZGVyIH0gPSB7XG5cdGludGVncmF0aW9uczogbmV3IFZlcnNpb25Qcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9