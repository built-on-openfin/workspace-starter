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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7O0dBRUc7QUFDSSxNQUFNLGtCQUFrQjtJQVc5Qjs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUN0QixVQUErQyxFQUMvQyxhQUE0QixFQUM1QixPQUFzQjtRQUV0QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksR0FBRyxDQUNULFFBQWdCLEVBQ2hCLEtBQWEsRUFDYixLQUFlLEVBQ2YsT0FBZ0IsRUFDaEIsR0FBRyxjQUF5QjtRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztTQUMzQztJQUNGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssYUFBYSxDQUFDLEdBQVc7UUFDaEMsc0NBQXNDO1FBQ3RDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRyxPQUFPLE9BQU8sZ0JBQWdCLEdBQUcsR0FBRyxhQUFhLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxXQUFXLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssZ0JBQWdCLEVBQUU7WUFDakQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM1QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLENBQUMsS0FBSyxDQUNaLEtBQUssS0FBSyxLQUFLLFFBQVEsRUFBRSxFQUN6QiwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsS0FBSyxDQUNMLDRFQUE0RSxFQUM3RSwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsUUFBUSxDQUNSLDhGQUE4RixDQUMvRixDQUFDO2FBQ0Y7U0FDRDtJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzFGRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDJDO0FBRXBDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxHQUFHLEVBQUUsSUFBSSxvREFBa0IsRUFBRTtDQUM3QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xvZy9jb25zb2xlL2xvZy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvbG9nL2NvbnNvbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBMb2dnZXJDcmVhdG9yLCBMb2dMZXZlbCwgTG9nUHJvdmlkZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDb25zb2xlTG9nT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbG9nIHByb3ZpZGVyIHVzaW5nIHRoZSBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ1Byb3ZpZGVyIGltcGxlbWVudHMgTG9nUHJvdmlkZXI8Q29uc29sZUxvZ09wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsZXZlbHMgb2YgbG9nZ2luZyB0byBpbmNsdWRlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaW5jbHVkZUxldmVscz86IExvZ0xldmVsW107XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IGdyb3VwIGlkZW50aXR5IG91dHB1dC5cblx0ICovXG5cdHByaXZhdGUgX2xhc3RHcm91cElkZW50aXR5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPENvbnNvbGVMb2dPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW5jbHVkZUxldmVscyA9IGRlZmluaXRpb24uZGF0YT8uaW5jbHVkZUxldmVscyA/PyBbXCJpbmZvXCIsIFwid2FyblwiLCBcImVycm9yXCIsIFwiZGVidWdcIiwgXCJ0cmFjZVwiXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YS5cblx0ICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwIHNlbmRpbmcgdGhlIGxvZyBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gbGV2ZWwgVGhlIGxldmVsIG9mIHRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdHB1YmxpYyBsb2coXG5cdFx0aWRlbnRpdHk6IHN0cmluZyxcblx0XHRncm91cDogc3RyaW5nLFxuXHRcdGxldmVsOiBMb2dMZXZlbCxcblx0XHRtZXNzYWdlOiB1bmtub3duLFxuXHRcdC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW11cblx0KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2luY2x1ZGVMZXZlbHM/LmluY2x1ZGVzKGxldmVsKSkge1xuXHRcdFx0dGhpcy5oYW5kbGVHcm91cChncm91cCwgaWRlbnRpdHkpO1xuXHRcdFx0Y29uc29sZVtsZXZlbF0obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgY29sb3IuXG5cdCAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29sb3IuXG5cdCAqL1xuXHRwcml2YXRlIHN0cmluZ1RvQ29sb3Ioc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgc3RyaW5nVW5pcXVlSGFzaCA9IFsuLi5zdHJdLnJlZHVjZSgoYWNjLCBjaGFyKSA9PiBjaGFyLmNoYXJDb2RlQXQoMCkgKyAoKGFjYyA8PCA1KSAtIGFjYyksIDApO1xuXHRcdHJldHVybiBgaHNsKCR7c3RyaW5nVW5pcXVlSGFzaCAlIDM2MH0sIDk1JSwgMzUlKWA7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgZ3JvdXAuXG5cdCAqIEBwYXJhbSBncm91cCBUaGUgZ3JvdXAuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkuXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUdyb3VwKGdyb3VwOiBzdHJpbmcsIGlkZW50aXR5OiBzdHJpbmcpOiB2b2lkIHtcblx0XHRjb25zdCBuZXdHcm91cElkZW50aXR5ID0gYCR7Z3JvdXB9ICR7aWRlbnRpdHl9YDtcblx0XHRpZiAodGhpcy5fbGFzdEdyb3VwSWRlbnRpdHkgIT09IG5ld0dyb3VwSWRlbnRpdHkpIHtcblx0XHRcdHRoaXMuX2xhc3RHcm91cElkZW50aXR5ID0gbmV3R3JvdXBJZGVudGl0eTtcblx0XHRcdGlmICh0aGlzLl9sYXN0R3JvdXBJZGVudGl0eSkge1xuXHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZ3JvdXAubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zb2xlLmdyb3VwKFxuXHRcdFx0XHRcdGAlYyR7Z3JvdXB9JWMke2lkZW50aXR5fWAsXG5cdFx0XHRcdFx0YGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kOiAke3RoaXMuc3RyaW5nVG9Db2xvcihcblx0XHRcdFx0XHRcdGdyb3VwXG5cdFx0XHRcdFx0KX07IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDJweCA0cHg7IGJvcmRlci1yYWRpdXM6IDVweGAsXG5cdFx0XHRcdFx0YGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kOiAke3RoaXMuc3RyaW5nVG9Db2xvcihcblx0XHRcdFx0XHRcdGlkZW50aXR5XG5cdFx0XHRcdFx0KX07IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDJweCA0cHg7IG1hcmdpbi1sZWZ0OiA0cHg7IGJvcmRlci1yYWRpdXM6IDVweGBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IENvbnNvbGVMb2dQcm92aWRlciB9IGZyb20gXCIuL2xvZ1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0bG9nOiBuZXcgQ29uc29sZUxvZ1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=