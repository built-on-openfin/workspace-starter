/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/example-connection-validation/endpoint.ts":
/*!********************************************************************************!*\
  !*** ./client/src/modules/endpoints/example-connection-validation/endpoint.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
let logger;
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("ConnectionValidationEndpoint");
    logger.info("Was passed the following options", definition.data);
}
async function requestResponse(endpointDefinition, request) {
    const defaultValue = { isValid: false };
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return defaultValue;
    }
    if (logger !== undefined) {
        logger.info("This payload verification module is an example that always returns true. Please replace with one that validates the connection either locally or by using a rest service.");
        logger.info(`Supplied identity: ${JSON.stringify(request?.identity)}`);
        logger.info(`Supplied options: ${JSON.stringify(request?.options)}`);
    }
    defaultValue.isValid = true;
    logger.info("Setting isValid to true");
    return defaultValue;
}


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
/*!*****************************************************************************!*\
  !*** ./client/src/modules/endpoints/example-connection-validation/index.ts ***!
  \*****************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/example-connection-validation/endpoint.ts");

const entryPoints = {
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5jb25uZWN0aW9uLnZhbGlkYXRpb24uYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQSxJQUFJLE1BQWMsQ0FBQztBQUVaLEtBQUssVUFBVSxVQUFVLENBQUMsVUFBNEIsRUFBRSxZQUEyQixFQUFFLE9BQWU7SUFDMUcsTUFBTSxHQUFHLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFTSxLQUFLLFVBQVUsZUFBZSxDQUNwQyxrQkFBK0MsRUFDL0MsT0FBdUQ7SUFFdkQsTUFBTSxZQUFZLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFFeEMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQ1YsbUZBQW1GLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUMxRyxDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUM7S0FDcEI7SUFDRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FDViwyS0FBMkssQ0FDM0ssQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDckU7SUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdkMsT0FBTyxZQUFZLENBQUM7QUFDckIsQ0FBQzs7Ozs7OztTQ3JDRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTHFEO0FBRTlDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxRQUFRLEVBQUUsc0NBQXNCO0NBQ2hDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZXhhbXBsZS1jb25uZWN0aW9uLXZhbGlkYXRpb24vZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZXhhbXBsZS1jb25uZWN0aW9uLXZhbGlkYXRpb24vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDb25uZWN0aW9uUGF5bG9hZFZlcmlmaWNhdGlvblJlcXVlc3QsXG5cdENvbm5lY3Rpb25QYXlsb2FkVmVyaWZpY2F0aW9uUmVzcG9uc2Vcbn0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2Nvbm5lY3Rpb24tc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzPzogbmV2ZXIpIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQ29ubmVjdGlvblZhbGlkYXRpb25FbmRwb2ludFwiKTtcblx0bG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx1bmtub3duPixcblx0cmVxdWVzdD86IENvbm5lY3Rpb25QYXlsb2FkVmVyaWZpY2F0aW9uUmVxdWVzdDx1bmtub3duPlxuKTogUHJvbWlzZTxDb25uZWN0aW9uUGF5bG9hZFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG5cdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHsgaXNWYWxpZDogZmFsc2UgfTtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdH1cblx0aWYgKGxvZ2dlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oXG5cdFx0XHRcIlRoaXMgcGF5bG9hZCB2ZXJpZmljYXRpb24gbW9kdWxlIGlzIGFuIGV4YW1wbGUgdGhhdCBhbHdheXMgcmV0dXJucyB0cnVlLiBQbGVhc2UgcmVwbGFjZSB3aXRoIG9uZSB0aGF0IHZhbGlkYXRlcyB0aGUgY29ubmVjdGlvbiBlaXRoZXIgbG9jYWxseSBvciBieSB1c2luZyBhIHJlc3Qgc2VydmljZS5cIlxuXHRcdCk7XG5cdFx0bG9nZ2VyLmluZm8oYFN1cHBsaWVkIGlkZW50aXR5OiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3Q/LmlkZW50aXR5KX1gKTtcblx0XHRsb2dnZXIuaW5mbyhgU3VwcGxpZWQgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0Py5vcHRpb25zKX1gKTtcblx0fVxuXHRkZWZhdWx0VmFsdWUuaXNWYWxpZCA9IHRydWU7XG5cdGxvZ2dlci5pbmZvKFwiU2V0dGluZyBpc1ZhbGlkIHRvIHRydWVcIik7XG5cdHJldHVybiBkZWZhdWx0VmFsdWU7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9