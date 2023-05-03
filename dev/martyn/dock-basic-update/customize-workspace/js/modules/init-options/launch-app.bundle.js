/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/init-options/launch-app/init-options.ts":
/*!********************************************************************!*\
  !*** ./client/src/modules/init-options/launch-app/init-options.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitOptionsLaunchAppHandler": () => (/* binding */ InitOptionsLaunchAppHandler)
/* harmony export */ });
class InitOptionsLaunchAppHandler {
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("InitOptionsLaunchAppHandler");
        this._helpers = helpers;
        this._logger.info("The handler has been loaded");
    }
    /**
     * Handle the init options action.
     * @param requestedAction The requested action.
     * @param payload The payload for the action.
     */
    async action(requestedAction, payload) {
        if (payload === undefined) {
            this._logger.warn(`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
            return;
        }
        try {
            if (requestedAction === "launch-app") {
                const appId = payload?.appId;
                this._logger.info(`The following appId was passed and requested to launch: ${appId}`);
                if (appId === undefined || appId === null || appId === "") {
                    this._logger.error("The init handler received an appId in the wrong format and is unable to launch it");
                }
                else if (this._helpers.launchApp === undefined) {
                    this._logger.warn(`Unable to launch app with appId: ${appId} as a launchApp function was not passed to this module via the module helpers.`);
                }
                else {
                    this._logger.info(`Requesting the launch of app with appId: ${appId}`);
                    await this._helpers.launchApp(appId);
                }
            }
        }
        catch (error) {
            this._logger.error(`Error trying to perform action ${requestedAction}.`, error);
        }
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
/*!*************************************************************!*\
  !*** ./client/src/modules/init-options/launch-app/index.ts ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _init_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init-options */ "./client/src/modules/init-options/launch-app/init-options.ts");

const entryPoints = {
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_0__.InitOptionsLaunchAppHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWFwcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS08sTUFBTSwyQkFBMkI7SUFLdkM7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUE0QixFQUFFLFlBQTJCLEVBQUUsT0FBc0I7UUFDeEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUF1QixFQUFFLE9BQTBCO1FBQ3RFLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsa0ZBQWtGLGVBQWUsd0JBQXdCLENBQ3pILENBQUM7WUFDRixPQUFPO1NBQ1A7UUFDRCxJQUFJO1lBQ0gsSUFBSSxlQUFlLEtBQUssWUFBWSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyREFBMkQsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtvQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQ2pCLG1GQUFtRixDQUNuRixDQUFDO2lCQUNGO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsb0NBQW9DLEtBQUssZ0ZBQWdGLENBQ3pILENBQUM7aUJBQ0Y7cUJBQU07b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ3ZFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Q7U0FDRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLGVBQWUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hGO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDeEREO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFFdEQsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFdBQVcsRUFBRSxJQUFJLHNFQUEyQixFQUFFO0NBQzlDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLWFwcC9pbml0LW9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEluaXRPcHRpb25zSGFuZGxlciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9pbml0LW9wdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMYXVuY2hBcHBQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBJbml0T3B0aW9uc0xhdW5jaEFwcEhhbmRsZXIgaW1wbGVtZW50cyBJbml0T3B0aW9uc0hhbmRsZXIge1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLCBjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsIGhlbHBlcnM6IE1vZHVsZUhlbHBlcnMpIHtcblx0XHR0aGlzLl9sb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJJbml0T3B0aW9uc0xhdW5jaEFwcEhhbmRsZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJUaGUgaGFuZGxlciBoYXMgYmVlbiBsb2FkZWRcIik7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIHRoZSBpbml0IG9wdGlvbnMgYWN0aW9uLlxuXHQgKiBAcGFyYW0gcmVxdWVzdGVkQWN0aW9uIFRoZSByZXF1ZXN0ZWQgYWN0aW9uLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmb3IgdGhlIGFjdGlvbi5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24ocmVxdWVzdGVkQWN0aW9uOiBzdHJpbmcsIHBheWxvYWQ/OiBMYXVuY2hBcHBQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdGBBY3Rpb25zIHBhc3NlZCB0byB0aGUgbW9kdWxlIHJlcXVpcmUgYSBwYXlsb2FkIHRvIGJlIHBhc3NlZC4gUmVxdWVzdGVkIGFjdGlvbjogJHtyZXF1ZXN0ZWRBY3Rpb259IGNhbiBub3QgYmUgZnVsZmlsbGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRpZiAocmVxdWVzdGVkQWN0aW9uID09PSBcImxhdW5jaC1hcHBcIikge1xuXHRcdFx0XHRjb25zdCBhcHBJZCA9IHBheWxvYWQ/LmFwcElkO1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgVGhlIGZvbGxvd2luZyBhcHBJZCB3YXMgcGFzc2VkIGFuZCByZXF1ZXN0ZWQgdG8gbGF1bmNoOiAke2FwcElkfWApO1xuXHRcdFx0XHRpZiAoYXBwSWQgPT09IHVuZGVmaW5lZCB8fCBhcHBJZCA9PT0gbnVsbCB8fCBhcHBJZCA9PT0gXCJcIikge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdFwiVGhlIGluaXQgaGFuZGxlciByZWNlaXZlZCBhbiBhcHBJZCBpbiB0aGUgd3JvbmcgZm9ybWF0IGFuZCBpcyB1bmFibGUgdG8gbGF1bmNoIGl0XCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2hlbHBlcnMubGF1bmNoQXBwID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdGBVbmFibGUgdG8gbGF1bmNoIGFwcCB3aXRoIGFwcElkOiAke2FwcElkfSBhcyBhIGxhdW5jaEFwcCBmdW5jdGlvbiB3YXMgbm90IHBhc3NlZCB0byB0aGlzIG1vZHVsZSB2aWEgdGhlIG1vZHVsZSBoZWxwZXJzLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBSZXF1ZXN0aW5nIHRoZSBsYXVuY2ggb2YgYXBwIHdpdGggYXBwSWQ6ICR7YXBwSWR9YCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycy5sYXVuY2hBcHAoYXBwSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEluaXRPcHRpb25zTGF1bmNoQXBwSGFuZGxlciB9IGZyb20gXCIuL2luaXQtb3B0aW9uc1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0aW5pdE9wdGlvbnM6IG5ldyBJbml0T3B0aW9uc0xhdW5jaEFwcEhhbmRsZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==