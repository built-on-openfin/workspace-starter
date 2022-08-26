/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/log/console/logProvider.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/log/console/logProvider.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleLogProvider": () => (/* binding */ ConsoleLogProvider)
/* harmony export */ });
/**
 * Implement the log provider using the console.
 */
class ConsoleLogProvider {
    /**
     * Initialise the module.
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
/*!*************************************************!*\
  !*** ./client/src/modules/log/console/index.ts ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _logProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logProvider */ "./client/src/modules/log/console/logProvider.ts");

const entryPoints = {
    log: new _logProvider__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7O0dBRUc7QUFDSSxNQUFNLGtCQUFrQjtJQVc5Qjs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUN0QixVQUErQyxFQUMvQyxhQUE0QixFQUM1QixPQUFlO1FBRWYsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEdBQUcsQ0FDVCxRQUFnQixFQUNoQixLQUFhLEVBQ2IsS0FBZSxFQUNmLE9BQWdCLEVBQ2hCLEdBQUcsY0FBeUI7UUFFNUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7U0FDM0M7SUFDRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxHQUFXO1FBQ2hDLHNDQUFzQztRQUN0QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEcsT0FBTyxPQUFPLGdCQUFnQixHQUFHLEdBQUcsYUFBYSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSyxXQUFXLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssZ0JBQWdCLEVBQUU7WUFDakQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM1QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLENBQUMsS0FBSyxDQUNaLEtBQUssS0FBSyxLQUFLLFFBQVEsRUFBRSxFQUN6QiwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsS0FBSyxDQUNMLDRFQUE0RSxFQUM3RSwrQkFBK0IsSUFBSSxDQUFDLGFBQWEsQ0FDaEQsUUFBUSxDQUNSLDhGQUE4RixDQUMvRixDQUFDO2FBQ0Y7U0FDRDtJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQ3pGRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTG1EO0FBRTVDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxHQUFHLEVBQUUsSUFBSSw0REFBa0IsRUFBRTtDQUM3QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvbG9nL2NvbnNvbGUvbG9nUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9sb2cvY29uc29sZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ1Byb3ZpZGVyLCBMb2dMZXZlbCwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDb25zb2xlTG9nT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbG9nIHByb3ZpZGVyIHVzaW5nIHRoZSBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ1Byb3ZpZGVyIGltcGxlbWVudHMgTG9nUHJvdmlkZXI8Q29uc29sZUxvZ09wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBsZXZlbHMgb2YgbG9nZ2luZyB0byBpbmNsdWRlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaW5jbHVkZUxldmVsczogTG9nTGV2ZWxbXTtcblxuXHQvKipcblx0ICogVGhlIGxhc3QgZ3JvdXAgaWRlbnRpdHkgb3V0cHV0LlxuXHQgKi9cblx0cHJpdmF0ZSBfbGFzdEdyb3VwSWRlbnRpdHk6IHN0cmluZztcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxDb25zb2xlTG9nT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzPzogbmV2ZXJcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faW5jbHVkZUxldmVscyA9IGRlZmluaXRpb24uZGF0YT8uaW5jbHVkZUxldmVscyA/PyBbXCJpbmZvXCIsIFwid2FyblwiLCBcImVycm9yXCIsIFwiZGVidWdcIiwgXCJ0cmFjZVwiXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YS5cblx0ICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwIHNlbmRpbmcgdGhlIGxvZyBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gbGV2ZWwgVGhlIGxldmVsIG9mIHRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdHB1YmxpYyBsb2coXG5cdFx0aWRlbnRpdHk6IHN0cmluZyxcblx0XHRncm91cDogc3RyaW5nLFxuXHRcdGxldmVsOiBMb2dMZXZlbCxcblx0XHRtZXNzYWdlOiB1bmtub3duLFxuXHRcdC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW11cblx0KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2luY2x1ZGVMZXZlbHMuaW5jbHVkZXMobGV2ZWwpKSB7XG5cdFx0XHR0aGlzLmhhbmRsZUdyb3VwKGdyb3VwLCBpZGVudGl0eSk7XG5cdFx0XHRjb25zb2xlW2xldmVsXShtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBjb2xvci5cblx0ICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBjb2xvci5cblx0ICovXG5cdHByaXZhdGUgc3RyaW5nVG9Db2xvcihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBzdHJpbmdVbmlxdWVIYXNoID0gWy4uLnN0cl0ucmVkdWNlKChhY2MsIGNoYXIpID0+IGNoYXIuY2hhckNvZGVBdCgwKSArICgoYWNjIDw8IDUpIC0gYWNjKSwgMCk7XG5cdFx0cmV0dXJuIGBoc2woJHtzdHJpbmdVbmlxdWVIYXNoICUgMzYwfSwgOTUlLCAzNSUpYDtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSBncm91cC5cblx0ICogQHBhcmFtIGdyb3VwIFRoZSBncm91cC5cblx0ICovXG5cdHByaXZhdGUgaGFuZGxlR3JvdXAoZ3JvdXA6IHN0cmluZywgaWRlbnRpdHk6IHN0cmluZyk6IHZvaWQge1xuXHRcdGNvbnN0IG5ld0dyb3VwSWRlbnRpdHkgPSBgJHtncm91cH0gJHtpZGVudGl0eX1gO1xuXHRcdGlmICh0aGlzLl9sYXN0R3JvdXBJZGVudGl0eSAhPT0gbmV3R3JvdXBJZGVudGl0eSkge1xuXHRcdFx0dGhpcy5fbGFzdEdyb3VwSWRlbnRpdHkgPSBuZXdHcm91cElkZW50aXR5O1xuXHRcdFx0aWYgKHRoaXMuX2xhc3RHcm91cElkZW50aXR5KSB7XG5cdFx0XHRcdGNvbnNvbGUuZ3JvdXBFbmQoKTtcblx0XHRcdH1cblx0XHRcdGlmIChncm91cC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnNvbGUuZ3JvdXAoXG5cdFx0XHRcdFx0YCVjJHtncm91cH0lYyR7aWRlbnRpdHl9YCxcblx0XHRcdFx0XHRgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQ6ICR7dGhpcy5zdHJpbmdUb0NvbG9yKFxuXHRcdFx0XHRcdFx0Z3JvdXBcblx0XHRcdFx0XHQpfTsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogYm9sZDsgcGFkZGluZzogMnB4IDRweDsgYm9yZGVyLXJhZGl1czogNXB4YCxcblx0XHRcdFx0XHRgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQ6ICR7dGhpcy5zdHJpbmdUb0NvbG9yKFxuXHRcdFx0XHRcdFx0aWRlbnRpdHlcblx0XHRcdFx0XHQpfTsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogYm9sZDsgcGFkZGluZzogMnB4IDRweDsgbWFyZ2luLWxlZnQ6IDRweDsgYm9yZGVyLXJhZGl1czogNXB4YFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBDb25zb2xlTG9nUHJvdmlkZXIgfSBmcm9tIFwiLi9sb2dQcm92aWRlclwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0bG9nOiBuZXcgQ29uc29sZUxvZ1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=