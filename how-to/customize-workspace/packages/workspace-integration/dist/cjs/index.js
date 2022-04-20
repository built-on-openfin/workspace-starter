/******/ var __webpack_modules__ = ({

/***/ "./src/integrations.ts":
/*!*****************************!*\
  !*** ./src/integrations.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deregister": () => (/* binding */ deregister),
/* harmony export */   "getAppSearchEntries": () => (/* binding */ getAppSearchEntries),
/* harmony export */   "getSearchResults": () => (/* binding */ getSearchResults),
/* harmony export */   "itemSelection": () => (/* binding */ itemSelection),
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
const knownIntegrationProviders = {};
const homeIntegrations = [];
/**
 * Register all the workspace integrations.
 * @param integrationManager The integration manager.
 * @param integrationProvider The integration provider settings.
 */
async function register(integrationManager, integrationProvider) {
    const integrations = integrationProvider?.integrations;
    if (Array.isArray(integrations)) {
        for (const integration of integrations) {
            if (integration.enabled) {
                if (!knownIntegrationProviders[integration.id] && integration.moduleUrl) {
                    try {
                        const mod = await import(/* webpackIgnore: true */ integration.moduleUrl);
                        knownIntegrationProviders[integration.id] = mod.integration;
                    }
                    catch (err) {
                        console.error(`Error loading module ${integration.moduleUrl}`, err);
                    }
                }
                if (knownIntegrationProviders[integration.id]) {
                    const homeIntegration = knownIntegrationProviders[integration.id];
                    homeIntegrations.push({
                        module: homeIntegration,
                        integration
                    });
                    if (homeIntegration.register) {
                        await homeIntegration.register(integrationManager, integration);
                    }
                }
                else {
                    console.error("Missing module in integration providers", integration.id);
                }
            }
        }
    }
}
/**
 * Deregister all the integrations.
 * @param integrationProvider The integration provider.
 */
async function deregister(integrationProvider) {
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.deregister) {
            await homeIntegration.module.deregister(homeIntegration.integration);
        }
    }
}
/**
 * Get the search results from all the integration providers.
 * @param query The query to get the search results for.
 * @param filters The filters to apply to the search results.
 * @returns The search results and new filters.
 */
async function getSearchResults(query, filters) {
    const homeResponse = {
        results: [],
        context: {
            filters: []
        }
    };
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.getSearchResults) {
            const integrationResults = await homeIntegration.module.getSearchResults(homeIntegration.integration, query, filters);
            if (Array.isArray(integrationResults.results)) {
                homeResponse.results = homeResponse.results.concat(integrationResults.results);
            }
            const newFilters = integrationResults.context?.filters;
            if (Array.isArray(newFilters) && homeResponse.context?.filters) {
                homeResponse.context.filters = homeResponse.context.filters.concat(newFilters);
            }
        }
    }
    return homeResponse;
}
/**
 * Get the app search entries for all the integration providers.
 * @returns The list of app entries.
 */
async function getAppSearchEntries() {
    let results = [];
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.getAppSearchEntries) {
            const integrationResults = await homeIntegration.module.getAppSearchEntries(homeIntegration.integration);
            results = results.concat(integrationResults);
        }
    }
    return results;
}
/**
 * The item for one of the providers was selected.
 * @param result The result of the selection.
 * @param lastResponse The last response.
 * @returns True if the selection was handled.
 */
async function itemSelection(result, lastResponse) {
    if (result.data) {
        const foundIntegration = homeIntegrations.find(hi => hi.integration.id === result.data?.providerId);
        if (foundIntegration?.module?.itemSelection) {
            const handled = await foundIntegration.module.itemSelection(foundIntegration.integration, result, lastResponse);
            if (!handled) {
                console.warn(`Error while trying to handle ${foundIntegration.integration.id} entry`, result.data);
            }
            return handled;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVncmF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxNQUFNLHlCQUF5QixHQUFpRCxFQUFFLENBQUM7QUFFbkYsTUFBTSxnQkFBZ0IsR0FHaEIsRUFBRSxDQUFDO0FBRVQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUMxQixrQkFBc0MsRUFDdEMsbUJBQXlDO0lBRXpDLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixFQUFFLFlBQVksQ0FBQztJQUN2RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDN0IsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUU7WUFDcEMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO2dCQUNyQixJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7b0JBQ3JFLElBQUk7d0JBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxRSx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztxQkFDL0Q7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN2RTtpQkFDSjtnQkFDRCxJQUFJLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDM0MsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxlQUFl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

/***/ }),

/***/ "./src/shapes.ts":
/*!***********************!*\
  !*** ./src/shapes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NoYXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIn0=

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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deregister": () => (/* reexport safe */ _integrations__WEBPACK_IMPORTED_MODULE_0__.deregister),
/* harmony export */   "getAppSearchEntries": () => (/* reexport safe */ _integrations__WEBPACK_IMPORTED_MODULE_0__.getAppSearchEntries),
/* harmony export */   "getSearchResults": () => (/* reexport safe */ _integrations__WEBPACK_IMPORTED_MODULE_0__.getSearchResults),
/* harmony export */   "itemSelection": () => (/* reexport safe */ _integrations__WEBPACK_IMPORTED_MODULE_0__.itemSelection),
/* harmony export */   "register": () => (/* reexport safe */ _integrations__WEBPACK_IMPORTED_MODULE_0__.register)
/* harmony export */ });
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integrations */ "./src/integrations.ts");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shapes */ "./src/shapes.ts");


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLFVBQVUsQ0FBQyJ9
})();

var __webpack_exports__deregister = __webpack_exports__.deregister;
var __webpack_exports__getAppSearchEntries = __webpack_exports__.getAppSearchEntries;
var __webpack_exports__getSearchResults = __webpack_exports__.getSearchResults;
var __webpack_exports__itemSelection = __webpack_exports__.itemSelection;
var __webpack_exports__register = __webpack_exports__.register;
export { __webpack_exports__deregister as deregister, __webpack_exports__getAppSearchEntries as getAppSearchEntries, __webpack_exports__getSearchResults as getSearchResults, __webpack_exports__itemSelection as itemSelection, __webpack_exports__register as register };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxzQkFBc0I7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGlDQUFpQztBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7Ozs7Ozs7Ozs7O0FDN0dqQztBQUNWLDJDQUEyQzs7Ozs7O1NDRDNDO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04rQjtBQUNOO0FBQ3pCLDJDQUEyQyx1TSIsInNvdXJjZXMiOlsid2VicGFjazovL0BvcGVuZmluL3dvcmtzcGFjZS1pbnRlZ3JhdGlvbi8uL3NyYy9pbnRlZ3JhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vQG9wZW5maW4vd29ya3NwYWNlLWludGVncmF0aW9uLy4vc3JjL3NoYXBlcy50cyIsIndlYnBhY2s6Ly9Ab3BlbmZpbi93b3Jrc3BhY2UtaW50ZWdyYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQG9wZW5maW4vd29ya3NwYWNlLWludGVncmF0aW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ab3BlbmZpbi93b3Jrc3BhY2UtaW50ZWdyYXRpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ab3BlbmZpbi93b3Jrc3BhY2UtaW50ZWdyYXRpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ab3BlbmZpbi93b3Jrc3BhY2UtaW50ZWdyYXRpb24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qga25vd25JbnRlZ3JhdGlvblByb3ZpZGVycyA9IHt9O1xyXG5jb25zdCBob21lSW50ZWdyYXRpb25zID0gW107XHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhbGwgdGhlIHdvcmtzcGFjZSBpbnRlZ3JhdGlvbnMuXHJcbiAqIEBwYXJhbSBpbnRlZ3JhdGlvbk1hbmFnZXIgVGhlIGludGVncmF0aW9uIG1hbmFnZXIuXHJcbiAqIEBwYXJhbSBpbnRlZ3JhdGlvblByb3ZpZGVyIFRoZSBpbnRlZ3JhdGlvbiBwcm92aWRlciBzZXR0aW5ncy5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlcihpbnRlZ3JhdGlvbk1hbmFnZXIsIGludGVncmF0aW9uUHJvdmlkZXIpIHtcclxuICAgIGNvbnN0IGludGVncmF0aW9ucyA9IGludGVncmF0aW9uUHJvdmlkZXI/LmludGVncmF0aW9ucztcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGludGVncmF0aW9ucykpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGludGVncmF0aW9uIG9mIGludGVncmF0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoaW50ZWdyYXRpb24uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFrbm93bkludGVncmF0aW9uUHJvdmlkZXJzW2ludGVncmF0aW9uLmlkXSAmJiBpbnRlZ3JhdGlvbi5tb2R1bGVVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2QgPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyBpbnRlZ3JhdGlvbi5tb2R1bGVVcmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbm93bkludGVncmF0aW9uUHJvdmlkZXJzW2ludGVncmF0aW9uLmlkXSA9IG1vZC5pbnRlZ3JhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBsb2FkaW5nIG1vZHVsZSAke2ludGVncmF0aW9uLm1vZHVsZVVybH1gLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChrbm93bkludGVncmF0aW9uUHJvdmlkZXJzW2ludGVncmF0aW9uLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvbWVJbnRlZ3JhdGlvbiA9IGtub3duSW50ZWdyYXRpb25Qcm92aWRlcnNbaW50ZWdyYXRpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbWVJbnRlZ3JhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZTogaG9tZUludGVncmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlZ3JhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob21lSW50ZWdyYXRpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgaG9tZUludGVncmF0aW9uLnJlZ2lzdGVyKGludGVncmF0aW9uTWFuYWdlciwgaW50ZWdyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIG1vZHVsZSBpbiBpbnRlZ3JhdGlvbiBwcm92aWRlcnNcIiwgaW50ZWdyYXRpb24uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBEZXJlZ2lzdGVyIGFsbCB0aGUgaW50ZWdyYXRpb25zLlxyXG4gKiBAcGFyYW0gaW50ZWdyYXRpb25Qcm92aWRlciBUaGUgaW50ZWdyYXRpb24gcHJvdmlkZXIuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVyZWdpc3RlcihpbnRlZ3JhdGlvblByb3ZpZGVyKSB7XHJcbiAgICBmb3IgKGNvbnN0IGhvbWVJbnRlZ3JhdGlvbiBvZiBob21lSW50ZWdyYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKGhvbWVJbnRlZ3JhdGlvbi5tb2R1bGUuZGVyZWdpc3Rlcikge1xyXG4gICAgICAgICAgICBhd2FpdCBob21lSW50ZWdyYXRpb24ubW9kdWxlLmRlcmVnaXN0ZXIoaG9tZUludGVncmF0aW9uLmludGVncmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEdldCB0aGUgc2VhcmNoIHJlc3VsdHMgZnJvbSBhbGwgdGhlIGludGVncmF0aW9uIHByb3ZpZGVycy5cclxuICogQHBhcmFtIHF1ZXJ5IFRoZSBxdWVyeSB0byBnZXQgdGhlIHNlYXJjaCByZXN1bHRzIGZvci5cclxuICogQHBhcmFtIGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYXBwbHkgdG8gdGhlIHNlYXJjaCByZXN1bHRzLlxyXG4gKiBAcmV0dXJucyBUaGUgc2VhcmNoIHJlc3VsdHMgYW5kIG5ldyBmaWx0ZXJzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlYXJjaFJlc3VsdHMocXVlcnksIGZpbHRlcnMpIHtcclxuICAgIGNvbnN0IGhvbWVSZXNwb25zZSA9IHtcclxuICAgICAgICByZXN1bHRzOiBbXSxcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgIGZpbHRlcnM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZvciAoY29uc3QgaG9tZUludGVncmF0aW9uIG9mIGhvbWVJbnRlZ3JhdGlvbnMpIHtcclxuICAgICAgICBpZiAoaG9tZUludGVncmF0aW9uLm1vZHVsZS5nZXRTZWFyY2hSZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVncmF0aW9uUmVzdWx0cyA9IGF3YWl0IGhvbWVJbnRlZ3JhdGlvbi5tb2R1bGUuZ2V0U2VhcmNoUmVzdWx0cyhob21lSW50ZWdyYXRpb24uaW50ZWdyYXRpb24sIHF1ZXJ5LCBmaWx0ZXJzKTtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW50ZWdyYXRpb25SZXN1bHRzLnJlc3VsdHMpKSB7XHJcbiAgICAgICAgICAgICAgICBob21lUmVzcG9uc2UucmVzdWx0cyA9IGhvbWVSZXNwb25zZS5yZXN1bHRzLmNvbmNhdChpbnRlZ3JhdGlvblJlc3VsdHMucmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3RmlsdGVycyA9IGludGVncmF0aW9uUmVzdWx0cy5jb250ZXh0Py5maWx0ZXJzO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdGaWx0ZXJzKSAmJiBob21lUmVzcG9uc2UuY29udGV4dD8uZmlsdGVycykge1xyXG4gICAgICAgICAgICAgICAgaG9tZVJlc3BvbnNlLmNvbnRleHQuZmlsdGVycyA9IGhvbWVSZXNwb25zZS5jb250ZXh0LmZpbHRlcnMuY29uY2F0KG5ld0ZpbHRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhvbWVSZXNwb25zZTtcclxufVxyXG4vKipcclxuICogR2V0IHRoZSBhcHAgc2VhcmNoIGVudHJpZXMgZm9yIGFsbCB0aGUgaW50ZWdyYXRpb24gcHJvdmlkZXJzLlxyXG4gKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBhcHAgZW50cmllcy5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBcHBTZWFyY2hFbnRyaWVzKCkge1xyXG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgaG9tZUludGVncmF0aW9uIG9mIGhvbWVJbnRlZ3JhdGlvbnMpIHtcclxuICAgICAgICBpZiAoaG9tZUludGVncmF0aW9uLm1vZHVsZS5nZXRBcHBTZWFyY2hFbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVncmF0aW9uUmVzdWx0cyA9IGF3YWl0IGhvbWVJbnRlZ3JhdGlvbi5tb2R1bGUuZ2V0QXBwU2VhcmNoRW50cmllcyhob21lSW50ZWdyYXRpb24uaW50ZWdyYXRpb24pO1xyXG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoaW50ZWdyYXRpb25SZXN1bHRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxufVxyXG4vKipcclxuICogVGhlIGl0ZW0gZm9yIG9uZSBvZiB0aGUgcHJvdmlkZXJzIHdhcyBzZWxlY3RlZC5cclxuICogQHBhcmFtIHJlc3VsdCBUaGUgcmVzdWx0IG9mIHRoZSBzZWxlY3Rpb24uXHJcbiAqIEBwYXJhbSBsYXN0UmVzcG9uc2UgVGhlIGxhc3QgcmVzcG9uc2UuXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNlbGVjdGlvbiB3YXMgaGFuZGxlZC5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpdGVtU2VsZWN0aW9uKHJlc3VsdCwgbGFzdFJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgICBjb25zdCBmb3VuZEludGVncmF0aW9uID0gaG9tZUludGVncmF0aW9ucy5maW5kKGhpID0+IGhpLmludGVncmF0aW9uLmlkID09PSByZXN1bHQuZGF0YT8ucHJvdmlkZXJJZCk7XHJcbiAgICAgICAgaWYgKGZvdW5kSW50ZWdyYXRpb24/Lm1vZHVsZT8uaXRlbVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVkID0gYXdhaXQgZm91bmRJbnRlZ3JhdGlvbi5tb2R1bGUuaXRlbVNlbGVjdGlvbihmb3VuZEludGVncmF0aW9uLmludGVncmF0aW9uLCByZXN1bHQsIGxhc3RSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gaGFuZGxlICR7Zm91bmRJbnRlZ3JhdGlvbi5pbnRlZ3JhdGlvbi5pZH0gZW50cnlgLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNTBaV2R5WVhScGIyNXpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDJsdWRHVm5jbUYwYVc5dWN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZUUVN4TlFVRk5MSGxDUVVGNVFpeEhRVUZwUkN4RlFVRkZMRU5CUVVNN1FVRkZia1lzVFVGQlRTeG5Ra0ZCWjBJc1IwRkhhRUlzUlVGQlJTeERRVUZETzBGQlJWUTdPenM3UjBGSlJ6dEJRVU5JTEUxQlFVMHNRMEZCUXl4TFFVRkxMRlZCUVZVc1VVRkJVU3hEUVVNeFFpeHJRa0ZCYzBNc1JVRkRkRU1zYlVKQlFYbERPMGxCUlhwRExFMUJRVTBzV1VGQldTeEhRVUZITEcxQ1FVRnRRaXhGUVVGRkxGbEJRVmtzUTBGQlF6dEpRVU4yUkN4SlFVRkpMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldTeERRVUZETEVWQlFVVTdVVUZETjBJc1MwRkJTeXhOUVVGTkxGZEJRVmNzU1VGQlNTeFpRVUZaTEVWQlFVVTdXVUZEY0VNc1NVRkJTU3hYUVVGWExFTkJRVU1zVDBGQlR5eEZRVUZGTzJkQ1FVTnlRaXhKUVVGSkxFTkJRVU1zZVVKQlFYbENMRU5CUVVNc1YwRkJWeXhEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEZkQlFWY3NRMEZCUXl4VFFVRlRMRVZCUVVVN2IwSkJRM0pGTEVsQlFVazdkMEpCUTBFc1RVRkJUU3hIUVVGSExFZEJRVWNzVFVGQlRTeE5RVUZOTEVOQlFVTXNlVUpCUVhsQ0xFTkJRVU1zVjBGQlZ5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPM2RDUVVNeFJTeDVRa0ZCZVVJc1EwRkJReXhYUVVGWExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRmRCUVZjc1EwRkJRenR4UWtGREwwUTdiMEpCUVVNc1QwRkJUeXhIUVVGSExFVkJRVVU3ZDBKQlExWXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXgzUWtGQmQwSXNWMEZCVnl4RFFVRkRMRk5CUVZNc1JVRkJSU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzNGQ1FVTjJSVHRwUWtGRFNqdG5Ra0ZEUkN4SlFVRkpMSGxDUVVGNVFpeERRVUZETEZkQlFWY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSVHR2UWtGRE0wTXNUVUZCVFN4bFFVRmxMRWRCUVVjc2VVSkJRWGxDTEVOQlFVTXNWMEZCVnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8yOUNRVU5zUlN4blFrRkJaMElzUTBGQlF5eEpRVUZKTEVOQlFVTTdkMEpCUTJ4Q0xFMUJRVTBzUlVGQlJTeGxRVUZsTzNkQ1FVTjJRaXhYUVVGWE8zRkNRVU5rTEVOQlFVTXNRMEZCUXp0dlFrRkRTQ3hKUVVGSkxHVkJRV1VzUTBGQlF5eFJRVUZSTEVWQlFVVTdkMEpCUXpGQ0xFMUJRVTBzWlVGQlpTeERRVUZETEZGQlFWRXNRMEZCUXl4clFrRkJhMElzUlVGQlJTeFhRVUZYTEVOQlFVTXNRMEZCUXp0eFFrRkRia1U3YVVKQlEwbzdjVUpCUVUwN2IwSkJRMGdzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4NVEwRkJlVU1zUlVGQlJTeFhRVUZYTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN2FVSkJRelZGTzJGQlEwbzdVMEZEU2p0TFFVTktPMEZCUTB3c1EwRkJRenRCUVVWRU96czdSMEZIUnp0QlFVTklMRTFCUVUwc1EwRkJReXhMUVVGTExGVkJRVlVzVlVGQlZTeERRVUZETEcxQ1FVRjVRenRKUVVOMFJTeExRVUZMTEUxQlFVMHNaVUZCWlN4SlFVRkpMR2RDUVVGblFpeEZRVUZGTzFGQlF6VkRMRWxCUVVrc1pVRkJaU3hEUVVGRExFMUJRVTBzUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZEYmtNc1RVRkJUU3hsUVVGbExFTkJRVU1zVFVGQlRTeERRVUZETEZWQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03VTBGRGVFVTdTMEZEU2p0QlFVTk1MRU5CUVVNN1FVRkZSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzUTBGQlF5eExRVUZMTEZWQlFWVXNaMEpCUVdkQ0xFTkJRVU1zUzBGQllTeEZRVUZGTEU5QlFYRkNPMGxCUTNaRkxFMUJRVTBzV1VGQldTeEhRVUYxUWp0UlFVTnlReXhQUVVGUExFVkJRVVVzUlVGQlJUdFJRVU5ZTEU5QlFVOHNSVUZCUlR0WlFVTk1MRTlCUVU4c1JVRkJSU3hGUVVGRk8xTkJRMlE3UzBGRFNpeERRVUZETzBsQlJVWXNTMEZCU3l4TlFVRk5MR1ZCUVdVc1NVRkJTU3huUWtGQlowSXNSVUZCUlR0UlFVTTFReXhKUVVGSkxHVkJRV1VzUTBGQlF5eE5RVUZOTEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVU3V1VGRGVrTXNUVUZCVFN4clFrRkJhMElzUjBGQlJ5eE5RVUZOTEdWQlFXVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlEzQkZMR1ZCUVdVc1EwRkJReXhYUVVGWExFVkJRek5DTEV0QlFVc3NSVUZEVEN4UFFVRlBMRU5CUTFZc1EwRkJRenRaUVVOR0xFbEJRVWtzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRNME1zV1VGQldTeERRVUZETEU5QlFVOHNSMEZCUnl4WlFVRlpMRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dGhRVU5zUmp0WlFVTkVMRTFCUVUwc1ZVRkJWU3hIUVVGSExHdENRVUZyUWl4RFFVRkRMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU03V1VGRGRrUXNTVUZCU1N4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEZsQlFWa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8yZENRVU0xUkN4WlFVRlpMRU5CUVVNc1QwRkJUeXhEUVVGRExFOUJRVThzUjBGQlJ5eFpRVUZaTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdZVUZEYkVZN1UwRkRTanRMUVVOS08wbEJSVVFzVDBGQlR5eFpRVUZaTEVOQlFVTTdRVUZEZUVJc1EwRkJRenRCUVVWRU96czdSMEZIUnp0QlFVTklMRTFCUVUwc1EwRkJReXhMUVVGTExGVkJRVlVzYlVKQlFXMUNPMGxCUTNKRExFbEJRVWtzVDBGQlR5eEhRVUYxUWl4RlFVRkZMRU5CUVVNN1NVRkZja01zUzBGQlN5eE5RVUZOTEdWQlFXVXNTVUZCU1N4blFrRkJaMElzUlVGQlJUdFJRVU0xUXl4SlFVRkpMR1ZCUVdVc1EwRkJReXhOUVVGTkxFTkJRVU1zYlVKQlFXMUNMRVZCUVVVN1dVRkROVU1zVFVGQlRTeHJRa0ZCYTBJc1IwRkJSeXhOUVVGTkxHVkJRV1VzUTBGQlF5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zWlVGQlpTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMWxCUTNwSExFOUJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTTdVMEZEYUVRN1MwRkRTanRKUVVWRUxFOUJRVThzVDBGQlR5eERRVUZETzBGQlEyNUNMRU5CUVVNN1FVRkZSRHM3T3pzN1IwRkxSenRCUVVOSUxFMUJRVTBzUTBGQlF5eExRVUZMTEZWQlFWVXNZVUZCWVN4RFFVTXZRaXhOUVVGcFF5eEZRVU5xUXl4WlFVRjNRenRKUVVWNFF5eEpRVUZKTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1VVRkRZaXhOUVVGTkxHZENRVUZuUWl4SFFVRkhMR2RDUVVGblFpeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eFhRVUZYTEVOQlFVTXNSVUZCUlN4TFFVRkxMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTTdVVUZGY0Vjc1NVRkJTU3huUWtGQlowSXNSVUZCUlN4TlFVRk5MRVZCUVVVc1lVRkJZU3hGUVVGRk8xbEJRM3BETEUxQlFVMHNUMEZCVHl4SFFVRkhMRTFCUVUwc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMR0ZCUVdFc1EwRkRka1FzWjBKQlFXZENMRU5CUVVNc1YwRkJWeXhGUVVNMVFpeE5RVUZOTEVWQlEwNHNXVUZCV1N4RFFVTm1MRU5CUVVNN1dVRkZSaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTzJkQ1FVTldMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zWjBOQlFXZERMR2RDUVVGblFpeERRVUZETEZkQlFWY3NRMEZCUXl4RlFVRkZMRkZCUVZFc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdZVUZEZEVjN1dVRkZSQ3hQUVVGUExFOUJRVThzUTBGQlF6dFRRVU5zUWp0TFFVTktPMGxCUlVRc1QwRkJUeXhMUVVGTExFTkJRVU03UVVGRGFrSXNRMEZCUXlKOSIsImV4cG9ydCB7fTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJoaGNHVnpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDNOb1lYQmxjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSW4wPSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0ICogZnJvbSBcIi4vaW50ZWdyYXRpb25zXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NoYXBlc1wiO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzWTBGQll5eG5Ra0ZCWjBJc1EwRkJRenRCUVVNdlFpeGpRVUZqTEZWQlFWVXNRMEZCUXlKOSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==