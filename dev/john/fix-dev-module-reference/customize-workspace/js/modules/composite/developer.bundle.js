/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/developer/actions.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/composite/developer/actions.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeveloperActions": () => (/* binding */ DeveloperActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class DeveloperActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("DeveloperActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["developer-inspect"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const identity = payload.selectedViews[i];
                    const view = fin.View.wrapSync(identity);
                    await view.showDeveloperTools();
                }
            }
            else if (payload.callerType === this._helpers.callerTypes.PageTabContextMenu) {
                const pageWindowIdentity = payload.windowIdentity;
                const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
                await pageWindow.showDeveloperTools();
            }
            else if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
                const target = payload?.customData?.target === "platform" ? "platform" : "window";
                const targetIdentity = target === "window"
                    ? payload.windowIdentity
                    : { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
                const targetWindow = fin.Window.wrapSync(targetIdentity);
                await targetWindow.showDeveloperTools();
            }
        };
        actionMap["raise-create-app-definition-intent"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
                const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const viewIdentity = payload.selectedViews[i];
                    const intentName = "CreateAppDefinition";
                    try {
                        const view = fin.View.wrapSync(viewIdentity);
                        const options = await view.getOptions();
                        const info = await view.getInfo();
                        const name = options.name;
                        const fdc3InteropApi = options.fdc3InteropApi !== undefined &&
                            options.fdc3InteropApi !== null &&
                            options.fdc3InteropApi.length > 0
                            ? options.fdc3InteropApi
                            : "1.2";
                        const preloads = Array.isArray(options.preloadScripts) && options.preloadScripts.length > 0
                            ? options.preloadScripts
                            : undefined;
                        const manifest = {
                            url: info.url,
                            fdc3InteropApi,
                            interop: options.interop,
                            customData: options.customData,
                            preloadScripts: preloads
                        };
                        const icons = [];
                        const favicons = info.favicons || [];
                        for (let f = 0; f < favicons.length; f++) {
                            icons.push({ src: favicons[f] });
                        }
                        const app = {
                            appId: name,
                            name,
                            title: info.title,
                            description: info.title,
                            manifestType: this._helpers.manifestTypes.inlineView.id,
                            manifest,
                            tags: [this._helpers.manifestTypes.view.id],
                            icons,
                            images: [],
                            publisher: "",
                            contactEmail: "",
                            supportEmail: "",
                            intents: []
                        };
                        const intent = {
                            name: intentName,
                            context: {
                                type: "openfin.app",
                                app
                            }
                        };
                        await brokerClient.fireIntent(intent);
                    }
                    catch (error) {
                        this._logger.error(`Error while trying to raise intent ${intentName} for view ${viewIdentity.name}`, error);
                    }
                }
            }
        };
        return actionMap;
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
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/developer/index.ts ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/developer/actions.ts");

const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.DeveloperActions()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUV0QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksc0RBQWdCLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IEFjdGlvbkhlbHBlcnMsIEFjdGlvbnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgRGV2ZWxvcGVyQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkRldmVsb3BlckFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJkZXZlbG9wZXItaW5zcGVjdFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLlZpZXdUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBheWxvYWQuc2VsZWN0ZWRWaWV3cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGlkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IHZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhpZGVudGl0eSk7XG5cdFx0XHRcdFx0YXdhaXQgdmlldy5zaG93RGV2ZWxvcGVyVG9vbHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuUGFnZVRhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHBhZ2VXaW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdGF3YWl0IHBhZ2VXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5HbG9iYWxDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy50YXJnZXQgPT09IFwicGxhdGZvcm1cIiA/IFwicGxhdGZvcm1cIiA6IFwid2luZG93XCI7XG5cdFx0XHRcdGNvbnN0IHRhcmdldElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID1cblx0XHRcdFx0XHR0YXJnZXQgPT09IFwid2luZG93XCJcblx0XHRcdFx0XHRcdD8gcGF5bG9hZC53aW5kb3dJZGVudGl0eVxuXHRcdFx0XHRcdFx0OiB7IHV1aWQ6IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZCwgbmFtZTogcGF5bG9hZC53aW5kb3dJZGVudGl0eS51dWlkIH07XG5cdFx0XHRcdGNvbnN0IHRhcmdldFdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmModGFyZ2V0SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCB0YXJnZXRXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5WaWV3VGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLnNlbGVjdGVkVmlld3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3SWRlbnRpdHkgPSBwYXlsb2FkLnNlbGVjdGVkVmlld3NbaV07XG5cdFx0XHRcdFx0Y29uc3QgaW50ZW50TmFtZSA9IFwiQ3JlYXRlQXBwRGVmaW5pdGlvblwiO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCB2aWV3ID0gZmluLlZpZXcud3JhcFN5bmModmlld0lkZW50aXR5IGFzIE9wZW5GaW4uSWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IHZpZXcuZ2V0T3B0aW9ucygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHZpZXcuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdFx0XHRcdGNvbnN0IGZkYzNJbnRlcm9wQXBpID1cblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5mZGMzSW50ZXJvcEFwaSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMuZmRjM0ludGVyb3BBcGkgIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5mZGMzSW50ZXJvcEFwaS5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdFx0PyBvcHRpb25zLmZkYzNJbnRlcm9wQXBpXG5cdFx0XHRcdFx0XHRcdFx0OiBcIjEuMlwiO1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJlbG9hZHMgPVxuXHRcdFx0XHRcdFx0XHRBcnJheS5pc0FycmF5KG9wdGlvbnMucHJlbG9hZFNjcmlwdHMpICYmIG9wdGlvbnMucHJlbG9hZFNjcmlwdHMubGVuZ3RoID4gMFxuXHRcdFx0XHRcdFx0XHRcdD8gb3B0aW9ucy5wcmVsb2FkU2NyaXB0c1xuXHRcdFx0XHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0XHRcdHVybDogaW5mby51cmwsXG5cdFx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpLFxuXHRcdFx0XHRcdFx0XHRpbnRlcm9wOiBvcHRpb25zLmludGVyb3AsXG5cdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IG9wdGlvbnMuY3VzdG9tRGF0YSxcblx0XHRcdFx0XHRcdFx0cHJlbG9hZFNjcmlwdHM6IHByZWxvYWRzXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3QgaWNvbnMgPSBbXTtcblx0XHRcdFx0XHRcdGNvbnN0IGZhdmljb25zID0gaW5mby5mYXZpY29ucyB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGYgPSAwOyBmIDwgZmF2aWNvbnMubGVuZ3RoOyBmKyspIHtcblx0XHRcdFx0XHRcdFx0aWNvbnMucHVzaCh7IHNyYzogZmF2aWNvbnNbZl0gfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBhcHAgPSB7XG5cdFx0XHRcdFx0XHRcdGFwcElkOiBuYW1lLFxuXHRcdFx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IGluZm8udGl0bGUsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZTogdGhpcy5faGVscGVycy5tYW5pZmVzdFR5cGVzLmlubGluZVZpZXcuaWQsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0LFxuXHRcdFx0XHRcdFx0XHR0YWdzOiBbdGhpcy5faGVscGVycy5tYW5pZmVzdFR5cGVzLnZpZXcuaWRdLFxuXHRcdFx0XHRcdFx0XHRpY29ucyxcblx0XHRcdFx0XHRcdFx0aW1hZ2VzOiBbXSxcblx0XHRcdFx0XHRcdFx0cHVibGlzaGVyOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRjb250YWN0RW1haWw6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHN1cHBvcnRFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0aW50ZW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIm9wZW5maW4uYXBwXCIsXG5cdFx0XHRcdFx0XHRcdFx0YXBwXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXG5cdFx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gcmFpc2UgaW50ZW50ICR7aW50ZW50TmFtZX0gZm9yIHZpZXcgJHt2aWV3SWRlbnRpdHkubmFtZX1gLFxuXHRcdFx0XHRcdFx0XHRlcnJvclxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBEZXZlbG9wZXJBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IERldmVsb3BlckFjdGlvbnMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==