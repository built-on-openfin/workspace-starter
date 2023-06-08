/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/init-options/launch-app/init-options.ts":
/*!********************************************************************!*\
  !*** ./client/src/modules/init-options/launch-app/init-options.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitOptionsLaunchAppHandler: () => (/* binding */ InitOptionsLaunchAppHandler)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/**
 * Init options launch handler.
 */
class InitOptionsLaunchAppHandler {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("InitOptionsLaunchAppHandler");
        this._helpers = helpers;
        this._definition = definition;
        this._logger.info("The handler has been loaded");
    }
    /**
     * Handle the init options action.
     * @param requestedAction The requested action.
     * @param payload The payload for the action.
     */
    async action(requestedAction, payload) {
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(payload)) {
            this._logger?.warn(`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
            return;
        }
        try {
            if (requestedAction === "launch-app") {
                const appId = payload?.appId;
                this._logger?.info(`The following appId was passed and requested to launch: ${appId}`);
                if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(appId)) {
                    this._logger?.error("The init handler received an appId in the wrong format and is unable to launch it");
                    return;
                }
                if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._helpers?.launchApp) || Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._helpers?.getApps)) {
                    this._logger?.warn(`Unable to launch app with appId: ${appId} as a launchApp and getApps (to verify appId) function was not passed to this module via the module helpers.`);
                    return;
                }
                const apps = await this._helpers?.getApps();
                const app = apps?.find((entry) => entry.appId === appId);
                if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(app)) {
                    this._logger?.warn(`Unable to launch app with appId: ${appId} because the app is not listed in the directory.`);
                    return;
                }
                const types = this._definition?.data?.supportedManifestTypes;
                if (Array.isArray(types) && app.manifestType && !types.includes(app.manifestType)) {
                    this._logger?.warn(`Unable to launch app with appId: ${appId} because a list of supported manifest types have been specified and this type of application isn't in the supported list.`);
                    return;
                }
                this._logger?.info(`Requesting the launch of app with appId: ${appId}`);
                await this._helpers?.launchApp(appId);
            }
        }
        catch (error) {
            this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
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
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _init_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init-options */ "./client/src/modules/init-options/launch-app/init-options.ts");

const entryPoints = {
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_0__.InitOptionsLaunchAppHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWFwcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUcwRTtBQUcxRTs7R0FFRztBQUNJLE1BQU0sMkJBQTJCO0lBT3ZDOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQThDLEVBQzlDLGFBQTRCLEVBQzVCLE9BQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBdUIsRUFBRSxPQUEwQjtRQUN0RSxJQUFJLCtKQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQ2pCLGtGQUFrRixlQUFlLHdCQUF3QixDQUN6SCxDQUFDO1lBQ0YsT0FBTztTQUNQO1FBQ0QsSUFBSTtZQUNILElBQUksZUFBZSxLQUFLLFlBQVksRUFBRTtnQkFDckMsTUFBTSxLQUFLLEdBQUcsT0FBTyxFQUFFLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsMkRBQTJELEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRXZGLElBQUksQ0FBQywrSkFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FDbEIsbUZBQW1GLENBQ25GLENBQUM7b0JBQ0YsT0FBTztpQkFDUDtnQkFFRCxJQUFJLCtKQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFBSSwrSkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ3pFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNqQixvQ0FBb0MsS0FBSyw4R0FBOEcsQ0FDdkosQ0FBQztvQkFDRixPQUFPO2lCQUNQO2dCQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFFekQsSUFBSSwrSkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDakIsb0NBQW9DLEtBQUssa0RBQWtELENBQzNGLENBQUM7b0JBQ0YsT0FBTztpQkFDUDtnQkFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxzQkFBc0IsQ0FBQztnQkFDN0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDbEYsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQ2pCLG9DQUFvQyxLQUFLLDJIQUEySCxDQUNwSyxDQUFDO29CQUNGLE9BQU87aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsNENBQTRDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7U0FDRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsa0NBQWtDLGVBQWUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pGO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDMUZEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFFdEQsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFdBQVcsRUFBRSxJQUFJLHNFQUEyQixFQUFFO0NBQzlDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW5pdC1vcHRpb25zL2xhdW5jaC1hcHAvaW5pdC1vcHRpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEluaXRPcHRpb25zSGFuZGxlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW5pdC1vcHRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBMYXVuY2hBcHBPcHRpb25zLCBMYXVuY2hBcHBQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW5pdCBvcHRpb25zIGxhdW5jaCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgSW5pdE9wdGlvbnNMYXVuY2hBcHBIYW5kbGVyIGltcGxlbWVudHMgSW5pdE9wdGlvbnNIYW5kbGVyPExhdW5jaEFwcE9wdGlvbnM+IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBNb2R1bGVIZWxwZXJzO1xuXG5cdHByaXZhdGUgX2RlZmluaXRpb24/OiBNb2R1bGVEZWZpbml0aW9uPExhdW5jaEFwcE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPExhdW5jaEFwcE9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiSW5pdE9wdGlvbnNMYXVuY2hBcHBIYW5kbGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiVGhlIGhhbmRsZXIgaGFzIGJlZW4gbG9hZGVkXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSB0aGUgaW5pdCBvcHRpb25zIGFjdGlvbi5cblx0ICogQHBhcmFtIHJlcXVlc3RlZEFjdGlvbiBUaGUgcmVxdWVzdGVkIGFjdGlvbi5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgZm9yIHRoZSBhY3Rpb24uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKHJlcXVlc3RlZEFjdGlvbjogc3RyaW5nLCBwYXlsb2FkPzogTGF1bmNoQXBwUGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBBY3Rpb25zIHBhc3NlZCB0byB0aGUgbW9kdWxlIHJlcXVpcmUgYSBwYXlsb2FkIHRvIGJlIHBhc3NlZC4gUmVxdWVzdGVkIGFjdGlvbjogJHtyZXF1ZXN0ZWRBY3Rpb259IGNhbiBub3QgYmUgZnVsZmlsbGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRpZiAocmVxdWVzdGVkQWN0aW9uID09PSBcImxhdW5jaC1hcHBcIikge1xuXHRcdFx0XHRjb25zdCBhcHBJZCA9IHBheWxvYWQ/LmFwcElkO1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFRoZSBmb2xsb3dpbmcgYXBwSWQgd2FzIHBhc3NlZCBhbmQgcmVxdWVzdGVkIHRvIGxhdW5jaDogJHthcHBJZH1gKTtcblxuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoYXBwSWQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFwiVGhlIGluaXQgaGFuZGxlciByZWNlaXZlZCBhbiBhcHBJZCBpbiB0aGUgd3JvbmcgZm9ybWF0IGFuZCBpcyB1bmFibGUgdG8gbGF1bmNoIGl0XCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcCkgfHwgaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5nZXRBcHBzKSkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdGBVbmFibGUgdG8gbGF1bmNoIGFwcCB3aXRoIGFwcElkOiAke2FwcElkfSBhcyBhIGxhdW5jaEFwcCBhbmQgZ2V0QXBwcyAodG8gdmVyaWZ5IGFwcElkKSBmdW5jdGlvbiB3YXMgbm90IHBhc3NlZCB0byB0aGlzIG1vZHVsZSB2aWEgdGhlIG1vZHVsZSBoZWxwZXJzLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGFwcHMgPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRBcHBzKCk7XG5cdFx0XHRcdGNvbnN0IGFwcCA9IGFwcHM/LmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5hcHBJZCA9PT0gYXBwSWQpO1xuXG5cdFx0XHRcdGlmIChpc0VtcHR5KGFwcCkpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRgVW5hYmxlIHRvIGxhdW5jaCBhcHAgd2l0aCBhcHBJZDogJHthcHBJZH0gYmVjYXVzZSB0aGUgYXBwIGlzIG5vdCBsaXN0ZWQgaW4gdGhlIGRpcmVjdG9yeS5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB0eXBlcyA9IHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LnN1cHBvcnRlZE1hbmlmZXN0VHlwZXM7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHR5cGVzKSAmJiBhcHAubWFuaWZlc3RUeXBlICYmICF0eXBlcy5pbmNsdWRlcyhhcHAubWFuaWZlc3RUeXBlKSkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdGBVbmFibGUgdG8gbGF1bmNoIGFwcCB3aXRoIGFwcElkOiAke2FwcElkfSBiZWNhdXNlIGEgbGlzdCBvZiBzdXBwb3J0ZWQgbWFuaWZlc3QgdHlwZXMgaGF2ZSBiZWVuIHNwZWNpZmllZCBhbmQgdGhpcyB0eXBlIG9mIGFwcGxpY2F0aW9uIGlzbid0IGluIHRoZSBzdXBwb3J0ZWQgbGlzdC5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFJlcXVlc3RpbmcgdGhlIGxhdW5jaCBvZiBhcHAgd2l0aCBhcHBJZDogJHthcHBJZH1gKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoQXBwKGFwcElkKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBJbml0T3B0aW9uc0xhdW5jaEFwcEhhbmRsZXIgfSBmcm9tIFwiLi9pbml0LW9wdGlvbnNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGluaXRPcHRpb25zOiBuZXcgSW5pdE9wdGlvbnNMYXVuY2hBcHBIYW5kbGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=