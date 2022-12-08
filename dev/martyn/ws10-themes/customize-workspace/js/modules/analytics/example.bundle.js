/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/analytics/example/analytics-module.ts":
/*!******************************************************************!*\
  !*** ./client/src/modules/analytics/example/analytics-module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleConsoleAnalyticsModule": () => (/* binding */ ExampleConsoleAnalyticsModule)
/* harmony export */ });
/**
 * Implement the log provider using the console.
 */
class ExampleConsoleAnalyticsModule {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ExampleConsoleAnalyticsModule");
        this._logger.info("Initialized");
        this._logger.info("Session Id: ", helpers.sessionId);
        const logLevel = definition?.data?.eventLogLevel === "trace" ? "debug" : definition?.data?.eventLogLevel ?? "info";
        this._logEvent = (message, events) => {
            // we don't want to trace the function so we log it as debug/verbose
            this._logger[logLevel](message, JSON.stringify(events));
        };
    }
    /**
     * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
     * @param events one of more analytic events.
     */
    async handleAnalytics(events) {
        this._logEvent("Received the following analytics events", events);
    }
    /**
     * Closedown the module. If this module had any cached events it needed to process it could try and flush them here.
     */
    async closedown() {
        this._logger.info("closing down");
    }
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
/*!*******************************************************!*\
  !*** ./client/src/modules/analytics/example/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _analytics_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics-module */ "./client/src/modules/analytics/example/analytics-module.ts");

const entryPoints = {
    analytics: new _analytics_module__WEBPACK_IMPORTED_MODULE_0__.ExampleConsoleAnalyticsModule()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0E7O0dBRUc7QUFDSSxNQUFNLDZCQUE2QjtJQUt6Qzs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUN0QixVQUE0RCxFQUM1RCxhQUE0QixFQUM1QixPQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQ2IsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxJQUFJLE1BQU0sQ0FBQztRQUNuRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3BDLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBZ0M7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Q7Ozs7Ozs7U0NsREQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xtRTtBQUU1RCxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsU0FBUyxFQUFFLElBQUksNEVBQTZCLEVBQUU7Q0FDOUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2FuYWx5dGljcy9leGFtcGxlL2FuYWx5dGljcy1tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hbmFseXRpY3MvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBbmFseXRpY3NNb2R1bGUsIFBsYXRmb3JtQW5hbHl0aWNzRXZlbnQgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYW5hbHl0aWNzLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZUNvbnNvbGVBbmFseXRpY3NPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBsb2cgcHJvdmlkZXIgdXNpbmcgdGhlIGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQ29uc29sZUFuYWx5dGljc01vZHVsZSBpbXBsZW1lbnRzIEFuYWx5dGljc01vZHVsZTxFeGFtcGxlQ29uc29sZUFuYWx5dGljc09wdGlvbnM+IHtcblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfbG9nRXZlbnQ6IChtZXNzYWdlOiBzdHJpbmcsIGV2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVDb25zb2xlQW5hbHl0aWNzT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJFeGFtcGxlQ29uc29sZUFuYWx5dGljc01vZHVsZVwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemVkXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU2Vzc2lvbiBJZDogXCIsIGhlbHBlcnMuc2Vzc2lvbklkKTtcblx0XHRjb25zdCBsb2dMZXZlbCA9XG5cdFx0XHRkZWZpbml0aW9uPy5kYXRhPy5ldmVudExvZ0xldmVsID09PSBcInRyYWNlXCIgPyBcImRlYnVnXCIgOiBkZWZpbml0aW9uPy5kYXRhPy5ldmVudExvZ0xldmVsID8/IFwiaW5mb1wiO1xuXHRcdHRoaXMuX2xvZ0V2ZW50ID0gKG1lc3NhZ2UsIGV2ZW50cykgPT4ge1xuXHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byB0cmFjZSB0aGUgZnVuY3Rpb24gc28gd2UgbG9nIGl0IGFzIGRlYnVnL3ZlcmJvc2Vcblx0XHRcdHRoaXMuX2xvZ2dlcltsb2dMZXZlbF0obWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKSk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgQW5hbHl0aWNzLiBUaGlzIGV4YW1wbGUgbW9kdWxlIHNpbXBsZSBjb25zb2xlIGxvZ3MgdGhlIGV2ZW50cy4gWW91IGNvdWxkIGJhdGNoIHRoZSBldmVudHMgYW5kIHBhc3Mgc2V0dGluZ3MgKG51bWJlciB0byBiYXRjaCBldGMsIGRlc3RpbmF0aW9uIHRvIHNlbmQgZXZlbnRzKSB2aWEgdGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAcGFyYW0gZXZlbnRzIG9uZSBvZiBtb3JlIGFuYWx5dGljIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVBbmFseXRpY3MoZXZlbnRzOiBQbGF0Zm9ybUFuYWx5dGljc0V2ZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dFdmVudChcIlJlY2VpdmVkIHRoZSBmb2xsb3dpbmcgYW5hbHl0aWNzIGV2ZW50c1wiLCBldmVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlZG93biB0aGUgbW9kdWxlLiBJZiB0aGlzIG1vZHVsZSBoYWQgYW55IGNhY2hlZCBldmVudHMgaXQgbmVlZGVkIHRvIHByb2Nlc3MgaXQgY291bGQgdHJ5IGFuZCBmbHVzaCB0aGVtIGhlcmUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duPygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcImNsb3NpbmcgZG93blwiKTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQ29uc29sZUFuYWx5dGljc01vZHVsZSB9IGZyb20gXCIuL2FuYWx5dGljcy1tb2R1bGVcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFuYWx5dGljczogbmV3IEV4YW1wbGVDb25zb2xlQW5hbHl0aWNzTW9kdWxlKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=