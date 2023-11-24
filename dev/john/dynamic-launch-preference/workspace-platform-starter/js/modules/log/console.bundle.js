/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/log/console/log.ts":
/*!***********************************************!*\
  !*** ./client/src/modules/log/console/log.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsoleLogProvider: () => (/* binding */ ConsoleLogProvider)
/* harmony export */ });
/**
 * Implement the log provider using the console.
 */
class ConsoleLogProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._includeLevels = definition.data?.includeLevels ?? ["info", "warn", "error", "debug", "trace"];
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
        if (this._includeLevels?.includes(level)) {
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
     * @param identity The identity.
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
/*!*************************************************!*\
  !*** ./client/src/modules/log/console/index.ts ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./client/src/modules/log/console/log.ts");

const entryPoints = {
    log: new _log__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7O0dBRUc7QUFDSSxNQUFNLGtCQUFrQjtJQVc5Qjs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUN0QixVQUErQyxFQUMvQyxhQUE0QixFQUM1QixPQUFzQjtRQUV0QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksR0FBRyxDQUNULFFBQWdCLEVBQ2hCLEtBQWEsRUFDYixLQUFlLEVBQ2YsT0FBZ0IsRUFDaEIsR0FBRyxjQUF5QjtRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxHQUFXO1FBQ2hDLHNDQUFzQztRQUN0QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEcsT0FBTyxPQUFPLGdCQUFnQixHQUFHLEdBQUcsYUFBYSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssV0FBVyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLGdCQUFnQixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsS0FBSyxDQUNaLEtBQUssS0FBSyxLQUFLLFFBQVEsRUFBRSxFQUN6QiwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsS0FBSyxDQUNMLDRFQUE0RSxFQUM3RSwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsUUFBUSxDQUNSLDhGQUE4RixDQUMvRixDQUFDO1lBQ0gsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0MxRkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0wyQztBQUVwQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsR0FBRyxFQUFFLElBQUksb0RBQWtCLEVBQUU7Q0FDN0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9sb2cvY29uc29sZS9sb2cudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZy9jb25zb2xlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTG9nZ2VyQ3JlYXRvciwgTG9nTGV2ZWwsIExvZ1Byb3ZpZGVyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ29uc29sZUxvZ09wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGxvZyBwcm92aWRlciB1c2luZyB0aGUgY29uc29sZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dQcm92aWRlciBpbXBsZW1lbnRzIExvZ1Byb3ZpZGVyPENvbnNvbGVMb2dPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbGV2ZWxzIG9mIGxvZ2dpbmcgdG8gaW5jbHVkZS5cblx0ICovXG5cdHByaXZhdGUgX2luY2x1ZGVMZXZlbHM/OiBMb2dMZXZlbFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGFzdCBncm91cCBpZGVudGl0eSBvdXRwdXQuXG5cdCAqL1xuXHRwcml2YXRlIF9sYXN0R3JvdXBJZGVudGl0eT86IHN0cmluZztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxDb25zb2xlTG9nT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2luY2x1ZGVMZXZlbHMgPSBkZWZpbml0aW9uLmRhdGE/LmluY2x1ZGVMZXZlbHMgPz8gW1wiaW5mb1wiLCBcIndhcm5cIiwgXCJlcnJvclwiLCBcImRlYnVnXCIsIFwidHJhY2VcIl07XG5cdH1cblxuXHQvKipcblx0ICogTG9nIGRhdGEuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkgc2VuZGluZyB0aGUgbWVzc2FnZS5cblx0ICogQHBhcmFtIGdyb3VwIFRoZSBncm91cCBzZW5kaW5nIHRoZSBsb2cgbWVzc2FnZS5cblx0ICogQHBhcmFtIGxldmVsIFRoZSBsZXZlbCBvZiB0aGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRwdWJsaWMgbG9nKFxuXHRcdGlkZW50aXR5OiBzdHJpbmcsXG5cdFx0Z3JvdXA6IHN0cmluZyxcblx0XHRsZXZlbDogTG9nTGV2ZWwsXG5cdFx0bWVzc2FnZTogdW5rbm93bixcblx0XHQuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdXG5cdCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9pbmNsdWRlTGV2ZWxzPy5pbmNsdWRlcyhsZXZlbCkpIHtcblx0XHRcdHRoaXMuaGFuZGxlR3JvdXAoZ3JvdXAsIGlkZW50aXR5KTtcblx0XHRcdGNvbnNvbGVbbGV2ZWxdKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBhIHN0cmluZyB0byBhIGNvbG9yLlxuXHQgKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cblx0ICogQHJldHVybnMgVGhlIGNvbG9yLlxuXHQgKi9cblx0cHJpdmF0ZSBzdHJpbmdUb0NvbG9yKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHN0cmluZ1VuaXF1ZUhhc2ggPSBbLi4uc3RyXS5yZWR1Y2UoKGFjYywgY2hhcikgPT4gY2hhci5jaGFyQ29kZUF0KDApICsgKChhY2MgPDwgNSkgLSBhY2MpLCAwKTtcblx0XHRyZXR1cm4gYGhzbCgke3N0cmluZ1VuaXF1ZUhhc2ggJSAzNjB9LCA5NSUsIDM1JSlgO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIGdyb3VwLlxuXHQgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwLlxuXHQgKiBAcGFyYW0gaWRlbnRpdHkgVGhlIGlkZW50aXR5LlxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVHcm91cChncm91cDogc3RyaW5nLCBpZGVudGl0eTogc3RyaW5nKTogdm9pZCB7XG5cdFx0Y29uc3QgbmV3R3JvdXBJZGVudGl0eSA9IGAke2dyb3VwfSAke2lkZW50aXR5fWA7XG5cdFx0aWYgKHRoaXMuX2xhc3RHcm91cElkZW50aXR5ICE9PSBuZXdHcm91cElkZW50aXR5KSB7XG5cdFx0XHR0aGlzLl9sYXN0R3JvdXBJZGVudGl0eSA9IG5ld0dyb3VwSWRlbnRpdHk7XG5cdFx0XHRpZiAodGhpcy5fbGFzdEdyb3VwSWRlbnRpdHkpIHtcblx0XHRcdFx0Y29uc29sZS5ncm91cEVuZCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGdyb3VwLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc29sZS5ncm91cChcblx0XHRcdFx0XHRgJWMke2dyb3VwfSVjJHtpZGVudGl0eX1gLFxuXHRcdFx0XHRcdGBjb2xvcjogI2ZmZmZmZjsgYmFja2dyb3VuZDogJHt0aGlzLnN0cmluZ1RvQ29sb3IoXG5cdFx0XHRcdFx0XHRncm91cFxuXHRcdFx0XHRcdCl9OyBmb250LXNpemU6IDEwcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwYWRkaW5nOiAycHggNHB4OyBib3JkZXItcmFkaXVzOiA1cHhgLFxuXHRcdFx0XHRcdGBjb2xvcjogI2ZmZmZmZjsgYmFja2dyb3VuZDogJHt0aGlzLnN0cmluZ1RvQ29sb3IoXG5cdFx0XHRcdFx0XHRpZGVudGl0eVxuXHRcdFx0XHRcdCl9OyBmb250LXNpemU6IDEwcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwYWRkaW5nOiAycHggNHB4OyBtYXJnaW4tbGVmdDogNHB4OyBib3JkZXItcmFkaXVzOiA1cHhgXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBDb25zb2xlTG9nUHJvdmlkZXIgfSBmcm9tIFwiLi9sb2dcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGxvZzogbmV3IENvbnNvbGVMb2dQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9