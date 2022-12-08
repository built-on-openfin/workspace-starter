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
        this._logger.info("ExampleConsoleAnalyticsModule initialized");
        this._logger.info("Session Id: ", helpers.sessionId);
        const logLevel = definition?.data?.eventLogLevel ?? "info";
        switch (logLevel) {
            case "trace": {
                this._logEvent = (message, events) => {
                    // we don't want to trace the function so we log it as debug/verbose
                    this._logger.debug(message, JSON.stringify(events));
                };
                break;
            }
            case "debug": {
                this._logEvent = (message, events) => {
                    this._logger.debug(message, JSON.stringify(events));
                };
                break;
            }
            case "info": {
                this._logEvent = (message, events) => {
                    this._logger.info(message, JSON.stringify(events));
                };
                break;
            }
            case "warn": {
                this._logEvent = (message, events) => {
                    this._logger.warn(message, JSON.stringify(events));
                };
                break;
            }
            case "error": {
                this._logEvent = (message, events) => {
                    this._logger.error(message, JSON.stringify(events));
                };
                break;
            }
        }
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
        this._logger.info("ConsoleAnalyticsModule closing down");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xtRTtBQUU1RCxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsU0FBUyxFQUFFLElBQUksNEVBQTZCLEVBQUU7Q0FDOUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2FuYWx5dGljcy9leGFtcGxlL2FuYWx5dGljcy1tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hbmFseXRpY3MvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBbmFseXRpY3NNb2R1bGUsIFBsYXRmb3JtQW5hbHl0aWNzRXZlbnQgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYW5hbHl0aWNzLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZUNvbnNvbGVBbmFseXRpY3NPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBsb2cgcHJvdmlkZXIgdXNpbmcgdGhlIGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQ29uc29sZUFuYWx5dGljc01vZHVsZSBpbXBsZW1lbnRzIEFuYWx5dGljc01vZHVsZTxFeGFtcGxlQ29uc29sZUFuYWx5dGljc09wdGlvbnM+IHtcblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfbG9nRXZlbnQ6IChtZXNzYWdlOiBzdHJpbmcsIGV2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVDb25zb2xlQW5hbHl0aWNzT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJFeGFtcGxlQ29uc29sZUFuYWx5dGljc01vZHVsZVwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkV4YW1wbGVDb25zb2xlQW5hbHl0aWNzTW9kdWxlIGluaXRpYWxpemVkXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU2Vzc2lvbiBJZDogXCIsIGhlbHBlcnMuc2Vzc2lvbklkKTtcblx0XHRjb25zdCBsb2dMZXZlbCA9IGRlZmluaXRpb24/LmRhdGE/LmV2ZW50TG9nTGV2ZWwgPz8gXCJpbmZvXCI7XG5cdFx0c3dpdGNoIChsb2dMZXZlbCkge1xuXHRcdFx0Y2FzZSBcInRyYWNlXCI6IHtcblx0XHRcdFx0dGhpcy5fbG9nRXZlbnQgPSAobWVzc2FnZSwgZXZlbnRzKSA9PiB7XG5cdFx0XHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byB0cmFjZSB0aGUgZnVuY3Rpb24gc28gd2UgbG9nIGl0IGFzIGRlYnVnL3ZlcmJvc2Vcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZGVidWcobWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImRlYnVnXCI6IHtcblx0XHRcdFx0dGhpcy5fbG9nRXZlbnQgPSAobWVzc2FnZSwgZXZlbnRzKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmRlYnVnKG1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KGV2ZW50cykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJpbmZvXCI6IHtcblx0XHRcdFx0dGhpcy5fbG9nRXZlbnQgPSAobWVzc2FnZSwgZXZlbnRzKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8obWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcIndhcm5cIjoge1xuXHRcdFx0XHR0aGlzLl9sb2dFdmVudCA9IChtZXNzYWdlLCBldmVudHMpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2FybihtZXNzYWdlLCBKU09OLnN0cmluZ2lmeShldmVudHMpKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwiZXJyb3JcIjoge1xuXHRcdFx0XHR0aGlzLl9sb2dFdmVudCA9IChtZXNzYWdlLCBldmVudHMpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IobWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgQW5hbHl0aWNzLiBUaGlzIGV4YW1wbGUgbW9kdWxlIHNpbXBsZSBjb25zb2xlIGxvZ3MgdGhlIGV2ZW50cy4gWW91IGNvdWxkIGJhdGNoIHRoZSBldmVudHMgYW5kIHBhc3Mgc2V0dGluZ3MgKG51bWJlciB0byBiYXRjaCBldGMsIGRlc3RpbmF0aW9uIHRvIHNlbmQgZXZlbnRzKSB2aWEgdGhlIG1vZHVsZSBkZWZpbml0aW9uLlxuXHQgKiBAcGFyYW0gZXZlbnRzIG9uZSBvZiBtb3JlIGFuYWx5dGljIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVBbmFseXRpY3MoZXZlbnRzOiBQbGF0Zm9ybUFuYWx5dGljc0V2ZW50W10pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dFdmVudChcIlJlY2VpdmVkIHRoZSBmb2xsb3dpbmcgYW5hbHl0aWNzIGV2ZW50c1wiLCBldmVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlZG93biB0aGUgbW9kdWxlLiBJZiB0aGlzIG1vZHVsZSBoYWQgYW55IGNhY2hlZCBldmVudHMgaXQgbmVlZGVkIHRvIHByb2Nlc3MgaXQgY291bGQgdHJ5IGFuZCBmbHVzaCB0aGVtIGhlcmUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duPygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkNvbnNvbGVBbmFseXRpY3NNb2R1bGUgY2xvc2luZyBkb3duXCIpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVDb25zb2xlQW5hbHl0aWNzTW9kdWxlIH0gZnJvbSBcIi4vYW5hbHl0aWNzLW1vZHVsZVwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YW5hbHl0aWNzOiBuZXcgRXhhbXBsZUNvbnNvbGVBbmFseXRpY3NNb2R1bGUoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==