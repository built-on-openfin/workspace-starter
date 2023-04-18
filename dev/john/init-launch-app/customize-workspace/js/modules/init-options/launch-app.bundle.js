/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/init-options/launch-app/init-options.ts":
/*!********************************************************************!*\
  !*** ./client/src/modules/init-options/launch-app/init-options.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitOptionsInteropHandler": () => (/* binding */ InitOptionsInteropHandler)
/* harmony export */ });
class InitOptionsInteropHandler {
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
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_0__.InitOptionsInteropHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWFwcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS08sTUFBTSx5QkFBeUI7SUFLckM7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUE0QixFQUFFLFlBQTJCLEVBQUUsT0FBc0I7UUFDeEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUF1QixFQUFFLE9BQTBCO1FBQ3RFLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsa0ZBQWtGLGVBQWUsd0JBQXdCLENBQ3pILENBQUM7WUFDRixPQUFPO1NBQ1A7UUFDRCxJQUFJO1lBQ0gsSUFBSSxlQUFlLEtBQUssWUFBWSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyREFBMkQsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtvQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQ2pCLG1GQUFtRixDQUNuRixDQUFDO2lCQUNGO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsb0NBQW9DLEtBQUssZ0ZBQWdGLENBQ3pILENBQUM7aUJBQ0Y7cUJBQU07b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ3ZFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Q7U0FDRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLGVBQWUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hGO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDeEREO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMMkQ7QUFFcEQsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFdBQVcsRUFBRSxJQUFJLG9FQUF5QixFQUFFO0NBQzVDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLWFwcC9pbml0LW9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEluaXRPcHRpb25zSGFuZGxlciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9pbml0LW9wdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMYXVuY2hBcHBQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBJbml0T3B0aW9uc0ludGVyb3BIYW5kbGVyIGltcGxlbWVudHMgSW5pdE9wdGlvbnNIYW5kbGVyIHtcblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycztcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzOiBNb2R1bGVIZWxwZXJzKSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiSW5pdE9wdGlvbnNMYXVuY2hBcHBIYW5kbGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiVGhlIGhhbmRsZXIgaGFzIGJlZW4gbG9hZGVkXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSB0aGUgaW5pdCBvcHRpb25zIGFjdGlvbi5cblx0ICogQHBhcmFtIHJlcXVlc3RlZEFjdGlvbiBUaGUgcmVxdWVzdGVkIGFjdGlvbi5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgZm9yIHRoZSBhY3Rpb24uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKHJlcXVlc3RlZEFjdGlvbjogc3RyaW5nLCBwYXlsb2FkPzogTGF1bmNoQXBwUGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChwYXlsb2FkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRgQWN0aW9ucyBwYXNzZWQgdG8gdGhlIG1vZHVsZSByZXF1aXJlIGEgcGF5bG9hZCB0byBiZSBwYXNzZWQuIFJlcXVlc3RlZCBhY3Rpb246ICR7cmVxdWVzdGVkQWN0aW9ufSBjYW4gbm90IGJlIGZ1bGZpbGxlZC5gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0aWYgKHJlcXVlc3RlZEFjdGlvbiA9PT0gXCJsYXVuY2gtYXBwXCIpIHtcblx0XHRcdFx0Y29uc3QgYXBwSWQgPSBwYXlsb2FkPy5hcHBJZDtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFRoZSBmb2xsb3dpbmcgYXBwSWQgd2FzIHBhc3NlZCBhbmQgcmVxdWVzdGVkIHRvIGxhdW5jaDogJHthcHBJZH1gKTtcblx0XHRcdFx0aWYgKGFwcElkID09PSB1bmRlZmluZWQgfHwgYXBwSWQgPT09IG51bGwgfHwgYXBwSWQgPT09IFwiXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXG5cdFx0XHRcdFx0XHRcIlRoZSBpbml0IGhhbmRsZXIgcmVjZWl2ZWQgYW4gYXBwSWQgaW4gdGhlIHdyb25nIGZvcm1hdCBhbmQgaXMgdW5hYmxlIHRvIGxhdW5jaCBpdFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLl9oZWxwZXJzLmxhdW5jaEFwcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRgVW5hYmxlIHRvIGxhdW5jaCBhcHAgd2l0aCBhcHBJZDogJHthcHBJZH0gYXMgYSBsYXVuY2hBcHAgZnVuY3Rpb24gd2FzIG5vdCBwYXNzZWQgdG8gdGhpcyBtb2R1bGUgdmlhIHRoZSBtb2R1bGUgaGVscGVycy5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgUmVxdWVzdGluZyB0aGUgbGF1bmNoIG9mIGFwcCB3aXRoIGFwcElkOiAke2FwcElkfWApO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnMubGF1bmNoQXBwKGFwcElkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYEVycm9yIHRyeWluZyB0byBwZXJmb3JtIGFjdGlvbiAke3JlcXVlc3RlZEFjdGlvbn0uYCwgZXJyb3IpO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBJbml0T3B0aW9uc0ludGVyb3BIYW5kbGVyIH0gZnJvbSBcIi4vaW5pdC1vcHRpb25zXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRpbml0T3B0aW9uczogbmV3IEluaXRPcHRpb25zSW50ZXJvcEhhbmRsZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==