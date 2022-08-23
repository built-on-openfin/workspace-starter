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
     * Log data as information.
     * @param group The group sending the log message.
     * @param message The message to log.
     * @param optionalParams Optional parameters for details.
     */
    info(group, message, ...optionalParams) {
        this.handleGroup(group);
        console.info(message, ...optionalParams);
    }
    /**
     * Log data as error.
     * @param group The group sending the log message.
     * @param message The message to log.
     * @param optionalParams Optional parameters for details.
     */
    error(group, message, ...optionalParams) {
        this.handleGroup(group);
        console.error(message, ...optionalParams);
    }
    /**
     * Log data as warning.
     * @param group The group sending the log message.
     * @param message The message to log.
     * @param optionalParams Optional parameters for details.
     */
    warn(group, message, ...optionalParams) {
        this.handleGroup(group);
        console.warn(message, ...optionalParams);
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
    handleGroup(group) {
        if (this._lastGroup !== group) {
            this._lastGroup = group;
            if (this._lastGroup) {
                console.groupEnd();
            }
            if (group.length > 0) {
                console.group(`%c${group}`, `color: #ffffff; background: ${this.stringToColor(group)}; font-size: 10px; font-weight: bold; padding: 2px`);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUE7O0dBRUc7QUFDSSxNQUFNLGFBQWE7SUFNekI7Ozs7O09BS0c7SUFDSSxJQUFJLENBQUMsS0FBYSxFQUFFLE9BQWlCLEVBQUUsR0FBRyxjQUF5QjtRQUN6RSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLEtBQWEsRUFBRSxPQUFpQixFQUFFLEdBQUcsY0FBeUI7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLElBQUksQ0FBQyxLQUFhLEVBQUUsT0FBaUIsRUFBRSxHQUFHLGNBQXlCO1FBQ3pFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxHQUFXO1FBQ2hDLHNDQUFzQztRQUN0QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEcsT0FBTyxPQUFPLGdCQUFnQixHQUFHLEdBQUcsYUFBYSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSyxXQUFXLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsT0FBTyxDQUFDLEtBQUssQ0FDWixLQUFLLEtBQUssRUFBRSxFQUNaLCtCQUErQixJQUFJLENBQUMsYUFBYSxDQUNoRCxLQUFLLENBQ0wsb0RBQW9ELENBQ3JELENBQUM7YUFDRjtTQUNEO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDM0VEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxrREFBYSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9sb2dnZXIvY29uc29sZS9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9sb2dnZXIvY29uc29sZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbG9nZ2VyIHVzaW5nIHRoZSBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciBpbXBsZW1lbnRzIExvZ2dlciB7XG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBncm91cCBvdXRwdXQuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0R3JvdXA6IHN0cmluZztcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBncm91cCBUaGUgZ3JvdXAgc2VuZGluZyB0aGUgbG9nIG1lc3NhZ2UuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRwdWJsaWMgaW5mbyhncm91cDogc3RyaW5nLCBtZXNzYWdlPzogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQge1xuXHRcdHRoaXMuaGFuZGxlR3JvdXAoZ3JvdXApO1xuXHRcdGNvbnNvbGUuaW5mbyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG5cdH1cblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgZXJyb3IuXG5cdCAqIEBwYXJhbSBncm91cCBUaGUgZ3JvdXAgc2VuZGluZyB0aGUgbG9nIG1lc3NhZ2UuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRwdWJsaWMgZXJyb3IoZ3JvdXA6IHN0cmluZywgbWVzc2FnZT86IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkIHtcblx0XHR0aGlzLmhhbmRsZUdyb3VwKGdyb3VwKTtcblx0XHRjb25zb2xlLmVycm9yKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YSBhcyB3YXJuaW5nLlxuXHQgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwIHNlbmRpbmcgdGhlIGxvZyBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0cHVibGljIHdhcm4oZ3JvdXA6IHN0cmluZywgbWVzc2FnZT86IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkIHtcblx0XHR0aGlzLmhhbmRsZUdyb3VwKGdyb3VwKTtcblx0XHRjb25zb2xlLndhcm4obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBjb2xvci5cblx0ICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBjb2xvci5cblx0ICovXG5cdHByaXZhdGUgc3RyaW5nVG9Db2xvcihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBzdHJpbmdVbmlxdWVIYXNoID0gWy4uLnN0cl0ucmVkdWNlKChhY2MsIGNoYXIpID0+IGNoYXIuY2hhckNvZGVBdCgwKSArICgoYWNjIDw8IDUpIC0gYWNjKSwgMCk7XG5cdFx0cmV0dXJuIGBoc2woJHtzdHJpbmdVbmlxdWVIYXNoICUgMzYwfSwgOTUlLCAzNSUpYDtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSBncm91cC5cblx0ICogQHBhcmFtIGdyb3VwIFRoZSBncm91cC5cblx0ICovXG5cdHByaXZhdGUgaGFuZGxlR3JvdXAoZ3JvdXA6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9sYXN0R3JvdXAgIT09IGdyb3VwKSB7XG5cdFx0XHR0aGlzLl9sYXN0R3JvdXAgPSBncm91cDtcblx0XHRcdGlmICh0aGlzLl9sYXN0R3JvdXApIHtcblx0XHRcdFx0Y29uc29sZS5ncm91cEVuZCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGdyb3VwLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc29sZS5ncm91cChcblx0XHRcdFx0XHRgJWMke2dyb3VwfWAsXG5cdFx0XHRcdFx0YGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kOiAke3RoaXMuc3RyaW5nVG9Db2xvcihcblx0XHRcdFx0XHRcdGdyb3VwXG5cdFx0XHRcdFx0KX07IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDJweGBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==