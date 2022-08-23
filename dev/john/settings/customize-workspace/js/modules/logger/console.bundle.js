/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/logger/console/logger.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/logger/console/logger.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleLogger": () => (/* binding */ ConsoleLogger)
/* harmony export */ });
/**
 * Implement the logger using the console.
 */
class ConsoleLogger {
    /**
     * Optionally initialize the logger.
     * @param options The custom options for the logger.
     */
    async initialize(options) {
        this._includeLevels = options?.includeLevels ?? ["info", "warn", "error", "debug", "trace"];
    }
    /**
     * Log data.
     * @param identity The identity sending the message.
     * @param group The group sending the log message.
     * @param level The level of the message to log.
     * @param message The message to log.
     * @param optionalParams Optional parameters for details.
     */
    log(identity, group, level, message, ...optionalParams) {
        if (this._includeLevels.includes(level)) {
            this.handleGroup(group, identity);
            console[level](message, ...optionalParams);
        }
    }
    /**
     * Convert a string to a color.
     * @param str The string to convert.
     * @returns The color.
     */
    stringToColor(str) {
        // eslint-disable-next-line no-bitwise
        const stringUniqueHash = [...str].reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
    }
    /**
     * Handle a group.
     * @param group The group.
     */
    handleGroup(group, identity) {
        const newGroupIdentity = `${group} ${identity}`;
        if (this._lastGroupIdentity !== newGroupIdentity) {
            this._lastGroupIdentity = newGroupIdentity;
            if (this._lastGroupIdentity) {
                console.groupEnd();
            }
            if (group.length > 0) {
                console.group(`%c${group}%c${identity}`, `color: #ffffff; background: ${this.stringToColor(group)}; font-size: 10px; font-weight: bold; padding: 2px 4px; border-radius: 5px`, `color: #ffffff; background: ${this.stringToColor(identity)}; font-size: 10px; font-weight: bold; padding: 2px 4px; margin-left: 4px; border-radius: 5px`);
            }
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
/*!****************************************************!*\
  !*** ./client/src/modules/logger/console/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./client/src/modules/logger/console/logger.ts");

const logger = new _logger__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger();

})();

var __webpack_exports__logger = __webpack_exports__.logger;
export { __webpack_exports__logger as logger };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0E7O0dBRUc7QUFDSSxNQUFNLGFBQWE7SUFXekI7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUE2QjtRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sRUFBRSxhQUFhLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxHQUFHLENBQ1QsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLEtBQWUsRUFDZixPQUFnQixFQUNoQixHQUFHLGNBQXlCO1FBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxhQUFhLENBQUMsR0FBVztRQUNoQyxzQ0FBc0M7UUFDdEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sT0FBTyxnQkFBZ0IsR0FBRyxHQUFHLGFBQWEsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssV0FBVyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLGdCQUFnQixFQUFFO1lBQ2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsT0FBTyxDQUFDLEtBQUssQ0FDWixLQUFLLEtBQUssS0FBSyxRQUFRLEVBQUUsRUFDekIsK0JBQStCLElBQUksQ0FBQyxhQUFhLENBQ2hELEtBQUssQ0FDTCw0RUFBNEUsRUFDN0UsK0JBQStCLElBQUksQ0FBQyxhQUFhLENBQ2hELFFBQVEsQ0FDUiw4RkFBOEYsQ0FDL0YsQ0FBQzthQUNGO1NBQ0Q7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0NqRkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ055QztBQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtEQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZ2dlci9jb25zb2xlL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZ2dlci9jb25zb2xlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlckNvcmUsIExvZ0xldmVsIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB7IENvbnNvbGVMb2dnZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBsb2dnZXIgdXNpbmcgdGhlIGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25zb2xlTG9nZ2VyIGltcGxlbWVudHMgTG9nZ2VyQ29yZTxDb25zb2xlTG9nZ2VyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIGxldmVscyBvZiBsb2dnaW5nIHRvIGluY2x1ZGUuXG5cdCAqL1xuXHRwcml2YXRlIF9pbmNsdWRlTGV2ZWxzOiBMb2dMZXZlbFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBncm91cCBpZGVudGl0eSBvdXRwdXQuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0R3JvdXBJZGVudGl0eTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBPcHRpb25hbGx5IGluaXRpYWxpemUgdGhlIGxvZ2dlci5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIGN1c3RvbSBvcHRpb25zIGZvciB0aGUgbG9nZ2VyLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUob3B0aW9uczogQ29uc29sZUxvZ2dlck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9pbmNsdWRlTGV2ZWxzID0gb3B0aW9ucz8uaW5jbHVkZUxldmVscyA/PyBbXCJpbmZvXCIsIFwid2FyblwiLCBcImVycm9yXCIsIFwiZGVidWdcIiwgXCJ0cmFjZVwiXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YS5cblx0ICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwIHNlbmRpbmcgdGhlIGxvZyBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gbGV2ZWwgVGhlIGxldmVsIG9mIHRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdHB1YmxpYyBsb2coXG5cdFx0aWRlbnRpdHk6IHN0cmluZyxcblx0XHRncm91cDogc3RyaW5nLFxuXHRcdGxldmVsOiBMb2dMZXZlbCxcblx0XHRtZXNzYWdlOiB1bmtub3duLFxuXHRcdC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW11cblx0KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2luY2x1ZGVMZXZlbHMuaW5jbHVkZXMobGV2ZWwpKSB7XG5cdFx0XHR0aGlzLmhhbmRsZUdyb3VwKGdyb3VwLCBpZGVudGl0eSk7XG5cdFx0XHRjb25zb2xlW2xldmVsXShtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBjb2xvci5cblx0ICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBjb2xvci5cblx0ICovXG5cdHByaXZhdGUgc3RyaW5nVG9Db2xvcihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBzdHJpbmdVbmlxdWVIYXNoID0gWy4uLnN0cl0ucmVkdWNlKChhY2MsIGNoYXIpID0+IGNoYXIuY2hhckNvZGVBdCgwKSArICgoYWNjIDw8IDUpIC0gYWNjKSwgMCk7XG5cdFx0cmV0dXJuIGBoc2woJHtzdHJpbmdVbmlxdWVIYXNoICUgMzYwfSwgOTUlLCAzNSUpYDtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSBncm91cC5cblx0ICogQHBhcmFtIGdyb3VwIFRoZSBncm91cC5cblx0ICovXG5cdHByaXZhdGUgaGFuZGxlR3JvdXAoZ3JvdXA6IHN0cmluZywgaWRlbnRpdHk6IHN0cmluZyk6IHZvaWQge1xuXHRcdGNvbnN0IG5ld0dyb3VwSWRlbnRpdHkgPSBgJHtncm91cH0gJHtpZGVudGl0eX1gO1xuXHRcdGlmICh0aGlzLl9sYXN0R3JvdXBJZGVudGl0eSAhPT0gbmV3R3JvdXBJZGVudGl0eSkge1xuXHRcdFx0dGhpcy5fbGFzdEdyb3VwSWRlbnRpdHkgPSBuZXdHcm91cElkZW50aXR5O1xuXHRcdFx0aWYgKHRoaXMuX2xhc3RHcm91cElkZW50aXR5KSB7XG5cdFx0XHRcdGNvbnNvbGUuZ3JvdXBFbmQoKTtcblx0XHRcdH1cblx0XHRcdGlmIChncm91cC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnNvbGUuZ3JvdXAoXG5cdFx0XHRcdFx0YCVjJHtncm91cH0lYyR7aWRlbnRpdHl9YCxcblx0XHRcdFx0XHRgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQ6ICR7dGhpcy5zdHJpbmdUb0NvbG9yKFxuXHRcdFx0XHRcdFx0Z3JvdXBcblx0XHRcdFx0XHQpfTsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogYm9sZDsgcGFkZGluZzogMnB4IDRweDsgYm9yZGVyLXJhZGl1czogNXB4YCxcblx0XHRcdFx0XHRgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQ6ICR7dGhpcy5zdHJpbmdUb0NvbG9yKFxuXHRcdFx0XHRcdFx0aWRlbnRpdHlcblx0XHRcdFx0XHQpfTsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogYm9sZDsgcGFkZGluZzogMnB4IDRweDsgbWFyZ2luLWxlZnQ6IDRweDsgYm9yZGVyLXJhZGl1czogNXB4YFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDb25zb2xlTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBsb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9