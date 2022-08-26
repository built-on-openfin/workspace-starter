/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/actions/app-definition/actions.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/actions/app-definition/actions.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDefinitionActions": () => (/* binding */ AppDefinitionActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class AppDefinitionActions {
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("AppDefinitionActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
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
/*!************************************************************!*\
  !*** ./client/src/modules/actions/app-definition/index.ts ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/actions/app-definition/actions.ts");

const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.AppDefinitionActions()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMaUQ7QUFFMUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLDBEQUFvQixFQUFFO0NBQ25DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2FwcC1kZWZpbml0aW9uL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2FwcC1kZWZpbml0aW9uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBBY3Rpb25IZWxwZXJzLCBBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcERlZmluaXRpb25BY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQXBwRGVmaW5pdGlvbkFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJyYWlzZS1jcmVhdGUtYXBwLWRlZmluaXRpb24taW50ZW50XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuVmlld1RhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5zZWxlY3RlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld0lkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IGludGVudE5hbWUgPSBcIkNyZWF0ZUFwcERlZmluaXRpb25cIjtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKHZpZXdJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgdmlldy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgdmlldy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmRjM0ludGVyb3BBcGkgPVxuXHRcdFx0XHRcdFx0XHRvcHRpb25zLmZkYzNJbnRlcm9wQXBpICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5mZGMzSW50ZXJvcEFwaSAhPT0gbnVsbCAmJlxuXHRcdFx0XHRcdFx0XHRvcHRpb25zLmZkYzNJbnRlcm9wQXBpLmxlbmd0aCA+IDBcblx0XHRcdFx0XHRcdFx0XHQ/IG9wdGlvbnMuZmRjM0ludGVyb3BBcGlcblx0XHRcdFx0XHRcdFx0XHQ6IFwiMS4yXCI7XG5cdFx0XHRcdFx0XHRjb25zdCBwcmVsb2FkcyA9XG5cdFx0XHRcdFx0XHRcdEFycmF5LmlzQXJyYXkob3B0aW9ucy5wcmVsb2FkU2NyaXB0cykgJiYgb3B0aW9ucy5wcmVsb2FkU2NyaXB0cy5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdFx0PyBvcHRpb25zLnByZWxvYWRTY3JpcHRzXG5cdFx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRjb25zdCBtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdFx0dXJsOiBpbmZvLnVybCxcblx0XHRcdFx0XHRcdFx0ZmRjM0ludGVyb3BBcGksXG5cdFx0XHRcdFx0XHRcdGludGVyb3A6IG9wdGlvbnMuaW50ZXJvcCxcblx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YTogb3B0aW9ucy5jdXN0b21EYXRhLFxuXHRcdFx0XHRcdFx0XHRwcmVsb2FkU2NyaXB0czogcHJlbG9hZHNcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpY29ucyA9IFtdO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2aWNvbnMgPSBpbmZvLmZhdmljb25zIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZiA9IDA7IGYgPCBmYXZpY29ucy5sZW5ndGg7IGYrKykge1xuXHRcdFx0XHRcdFx0XHRpY29ucy5wdXNoKHsgc3JjOiBmYXZpY29uc1tmXSB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGFwcCA9IHtcblx0XHRcdFx0XHRcdFx0YXBwSWQ6IG5hbWUsXG5cdFx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBpbmZvLnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0bWFuaWZlc3RUeXBlOiB0aGlzLl9oZWxwZXJzLm1hbmlmZXN0VHlwZXMuaW5saW5lVmlldy5pZCxcblx0XHRcdFx0XHRcdFx0bWFuaWZlc3QsXG5cdFx0XHRcdFx0XHRcdHRhZ3M6IFt0aGlzLl9oZWxwZXJzLm1hbmlmZXN0VHlwZXMudmlldy5pZF0sXG5cdFx0XHRcdFx0XHRcdGljb25zLFxuXHRcdFx0XHRcdFx0XHRpbWFnZXM6IFtdLFxuXHRcdFx0XHRcdFx0XHRwdWJsaXNoZXI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdGNvbnRhY3RFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0c3VwcG9ydEVtYWlsOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNvbnN0IGludGVudCA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwib3BlbmZpbi5hcHBcIixcblx0XHRcdFx0XHRcdFx0XHRhcHBcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IGJyb2tlckNsaWVudC5maXJlSW50ZW50KGludGVudCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIHRyeWluZyB0byByYWlzZSBpbnRlbnQgJHtpbnRlbnROYW1lfSBmb3IgdmlldyAke3ZpZXdJZGVudGl0eS5uYW1lfWAsXG5cdFx0XHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEFwcERlZmluaXRpb25BY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IEFwcERlZmluaXRpb25BY3Rpb25zKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=