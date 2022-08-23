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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0E7O0dBRUc7QUFDSSxNQUFNLGFBQWE7SUFXekI7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUE2QjtRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sRUFBRSxhQUFhLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxHQUFHLENBQ1QsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLEtBQWUsRUFDZixPQUFnQixFQUNoQixHQUFHLGNBQXlCO1FBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxhQUFhLENBQUMsR0FBVztRQUNoQyxzQ0FBc0M7UUFDdEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sT0FBTyxnQkFBZ0IsR0FBRyxHQUFHLGFBQWEsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssV0FBVyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLGdCQUFnQixFQUFFO1lBQ2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsT0FBTyxDQUFDLEtBQUssQ0FDWixLQUFLLEtBQUssS0FBSyxRQUFRLEVBQUUsRUFDekIsK0JBQStCLElBQUksQ0FBQyxhQUFhLENBQ2hELEtBQUssQ0FDTCw0RUFBNEUsRUFDN0UsK0JBQStCLElBQUksQ0FBQyxhQUFhLENBQ2hELFFBQVEsQ0FDUiw4RkFBOEYsQ0FDL0YsQ0FBQzthQUNGO1NBQ0Q7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0NqRkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ055QztBQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtEQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZ2dlci9jb25zb2xlL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZ2dlci9jb25zb2xlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciwgTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgQ29uc29sZUxvZ2dlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGxvZ2dlciB1c2luZyB0aGUgY29uc29sZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXI8Q29uc29sZUxvZ2dlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsZXZlbHMgb2YgbG9nZ2luZyB0byBpbmNsdWRlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaW5jbHVkZUxldmVsczogTG9nTGV2ZWxbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgZ3JvdXAgaWRlbnRpdHkgb3V0cHV0LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEdyb3VwSWRlbnRpdHk6IHN0cmluZztcblxuXHQvKipcblx0ICogT3B0aW9uYWxseSBpbml0aWFsaXplIHRoZSBsb2dnZXIuXG5cdCAqIEBwYXJhbSBvcHRpb25zIFRoZSBjdXN0b20gb3B0aW9ucyBmb3IgdGhlIGxvZ2dlci5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKG9wdGlvbnM6IENvbnNvbGVMb2dnZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW5jbHVkZUxldmVscyA9IG9wdGlvbnM/LmluY2x1ZGVMZXZlbHMgPz8gW1wiaW5mb1wiLCBcIndhcm5cIiwgXCJlcnJvclwiLCBcImRlYnVnXCIsIFwidHJhY2VcIl07XG5cdH1cblxuXHQvKipcblx0ICogTG9nIGRhdGEuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkgc2VuZGluZyB0aGUgbWVzc2FnZS5cblx0ICogQHBhcmFtIGdyb3VwIFRoZSBncm91cCBzZW5kaW5nIHRoZSBsb2cgbWVzc2FnZS5cblx0ICogQHBhcmFtIGxldmVsIFRoZSBsZXZlbCBvZiB0aGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRwdWJsaWMgbG9nKFxuXHRcdGlkZW50aXR5OiBzdHJpbmcsXG5cdFx0Z3JvdXA6IHN0cmluZyxcblx0XHRsZXZlbDogTG9nTGV2ZWwsXG5cdFx0bWVzc2FnZTogdW5rbm93bixcblx0XHQuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdXG5cdCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9pbmNsdWRlTGV2ZWxzLmluY2x1ZGVzKGxldmVsKSkge1xuXHRcdFx0dGhpcy5oYW5kbGVHcm91cChncm91cCwgaWRlbnRpdHkpO1xuXHRcdFx0Y29uc29sZVtsZXZlbF0obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgY29sb3IuXG5cdCAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29sb3IuXG5cdCAqL1xuXHRwcml2YXRlIHN0cmluZ1RvQ29sb3Ioc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgc3RyaW5nVW5pcXVlSGFzaCA9IFsuLi5zdHJdLnJlZHVjZSgoYWNjLCBjaGFyKSA9PiBjaGFyLmNoYXJDb2RlQXQoMCkgKyAoKGFjYyA8PCA1KSAtIGFjYyksIDApO1xuXHRcdHJldHVybiBgaHNsKCR7c3RyaW5nVW5pcXVlSGFzaCAlIDM2MH0sIDk1JSwgMzUlKWA7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgZ3JvdXAuXG5cdCAqIEBwYXJhbSBncm91cCBUaGUgZ3JvdXAuXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUdyb3VwKGdyb3VwOiBzdHJpbmcsIGlkZW50aXR5OiBzdHJpbmcpOiB2b2lkIHtcblx0XHRjb25zdCBuZXdHcm91cElkZW50aXR5ID0gYCR7Z3JvdXB9ICR7aWRlbnRpdHl9YDtcblx0XHRpZiAodGhpcy5fbGFzdEdyb3VwSWRlbnRpdHkgIT09IG5ld0dyb3VwSWRlbnRpdHkpIHtcblx0XHRcdHRoaXMuX2xhc3RHcm91cElkZW50aXR5ID0gbmV3R3JvdXBJZGVudGl0eTtcblx0XHRcdGlmICh0aGlzLl9sYXN0R3JvdXBJZGVudGl0eSkge1xuXHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZ3JvdXAubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zb2xlLmdyb3VwKFxuXHRcdFx0XHRcdGAlYyR7Z3JvdXB9JWMke2lkZW50aXR5fWAsXG5cdFx0XHRcdFx0YGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kOiAke3RoaXMuc3RyaW5nVG9Db2xvcihcblx0XHRcdFx0XHRcdGdyb3VwXG5cdFx0XHRcdFx0KX07IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDJweCA0cHg7IGJvcmRlci1yYWRpdXM6IDVweGAsXG5cdFx0XHRcdFx0YGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kOiAke3RoaXMuc3RyaW5nVG9Db2xvcihcblx0XHRcdFx0XHRcdGlkZW50aXR5XG5cdFx0XHRcdFx0KX07IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDJweCA0cHg7IG1hcmdpbi1sZWZ0OiA0cHg7IGJvcmRlci1yYWRpdXM6IDVweGBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==