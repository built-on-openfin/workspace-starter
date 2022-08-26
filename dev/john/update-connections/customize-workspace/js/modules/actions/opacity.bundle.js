/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/actions/opacity/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/actions/opacity/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpacityActions": () => (/* binding */ OpacityActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class OpacityActions {
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("OpacityActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["change-opacity"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.CustomButton) {
                this._logger.info("Change Opacity Triggered");
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                const options = await browserWindow.openfinWindow.getOptions();
                const currentToolbarOptions = options.workspacePlatform
                    .toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ opacity: 0.7 });
                if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    const newButtons = await this._helpers.updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId, payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
            }
        };
        actionMap["restore-opacity"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.CustomButton) {
                this._logger.info("Restore Opacity Triggered");
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                const options = await browserWindow.openfinWindow.getOptions();
                const currentToolbarOptions = options.workspacePlatform
                    .toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ opacity: 1 });
                if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    const newButtons = await this._helpers.updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId, payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
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
/*!*****************************************************!*\
  !*** ./client/src/modules/actions/opacity/index.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/actions/opacity/actions.ts");

const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.OpacityActions()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztpQkFDbkU7YUFDRDtRQUNGLENBQUMsQ0FBQztRQUVGLE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7Q0FDRDs7Ozs7OztTQ3ZGRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDJDO0FBRXBDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxPQUFPLEVBQUUsSUFBSSxvREFBYyxFQUFFO0NBQzdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL29wYWNpdHkvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2FjdGlvbnMvb3BhY2l0eS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0LFxuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IEFjdGlvbkhlbHBlcnMsIEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgT3BhY2l0eUFjdGlvbnMgaW1wbGVtZW50cyBBY3Rpb25zIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJPcGFjaXR5QWN0aW9uc1wiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcImNoYW5nZS1vcGFjaXR5XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuQ3VzdG9tQnV0dG9uKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiQ2hhbmdlIE9wYWNpdHkgVHJpZ2dlcmVkXCIpO1xuXHRcdFx0XHRjb25zdCBicm93c2VyV2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRUb29sYmFyT3B0aW9ucyA9IChvcHRpb25zIGFzIEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0KS53b3Jrc3BhY2VQbGF0Zm9ybVxuXHRcdFx0XHRcdC50b29sYmFyT3B0aW9ucztcblx0XHRcdFx0YXdhaXQgYnJvd3NlcldpbmRvdy5vcGVuZmluV2luZG93LnVwZGF0ZU9wdGlvbnMoeyBvcGFjaXR5OiAwLjcgfSk7XG5cdFx0XHRcdGlmIChjdXJyZW50VG9vbGJhck9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50VG9vbGJhck9wdGlvbnMgIT09IG51bGwpIHtcblx0XHRcdFx0XHRjb25zdCBuZXdCdXR0b25zID0gYXdhaXQgdGhpcy5faGVscGVycy51cGRhdGVUb29sYmFyQnV0dG9ucyhcblx0XHRcdFx0XHRcdGN1cnJlbnRUb29sYmFyT3B0aW9ucy5idXR0b25zLFxuXHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnNvdXJjZUlkIGFzIHN0cmluZyxcblx0XHRcdFx0XHRcdHBheWxvYWQuY3VzdG9tRGF0YS5yZXBsYWNlbWVudElkIGFzIHN0cmluZ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YXdhaXQgYnJvd3NlcldpbmRvdy5yZXBsYWNlVG9vbGJhck9wdGlvbnMoeyBidXR0b25zOiBuZXdCdXR0b25zIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInJlc3RvcmUtb3BhY2l0eVwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLkN1c3RvbUJ1dHRvbikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlc3RvcmUgT3BhY2l0eSBUcmlnZ2VyZWRcIik7XG5cdFx0XHRcdGNvbnN0IGJyb3dzZXJXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHBheWxvYWQud2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgYnJvd3NlcldpbmRvdy5vcGVuZmluV2luZG93LmdldE9wdGlvbnMoKTtcblx0XHRcdFx0Y29uc3QgY3VycmVudFRvb2xiYXJPcHRpb25zID0gKG9wdGlvbnMgYXMgQnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3QpLndvcmtzcGFjZVBsYXRmb3JtXG5cdFx0XHRcdFx0LnRvb2xiYXJPcHRpb25zO1xuXHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93Lm9wZW5maW5XaW5kb3cudXBkYXRlT3B0aW9ucyh7IG9wYWNpdHk6IDEgfSk7XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRUb29sYmFyT3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRUb29sYmFyT3B0aW9ucyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnN0IG5ld0J1dHRvbnMgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLnVwZGF0ZVRvb2xiYXJCdXR0b25zKFxuXHRcdFx0XHRcdFx0Y3VycmVudFRvb2xiYXJPcHRpb25zLmJ1dHRvbnMsXG5cdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEuc291cmNlSWQgYXMgc3RyaW5nLFxuXHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnJlcGxhY2VtZW50SWQgYXMgc3RyaW5nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93LnJlcGxhY2VUb29sYmFyT3B0aW9ucyh7IGJ1dHRvbnM6IG5ld0J1dHRvbnMgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBPcGFjaXR5QWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBPcGFjaXR5QWN0aW9ucygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9