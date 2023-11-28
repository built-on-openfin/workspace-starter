/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   isValidUrl: () => (/* binding */ isValidUrl),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
/* harmony export */ });
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object";
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isString(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return content;
}
/**
 * Validates the suggested url to see if it can replace the source url.
 * @param sourceUrl the original url to compare against.
 * @param suggestedUrl the suggested url to replace it with.
 * @param constraint the rules to apply against it.
 * @returns whether it is ok to replace the sourceUrl with the suggestedUrl
 */
function isValidUrl(sourceUrl, suggestedUrl, constraint) {
    if (isEmpty(suggestedUrl)) {
        return false;
    }
    if (!Array.isArray(constraint) || constraint.length === 0) {
        return true;
    }
    if (constraint.includes("url-none")) {
        return false;
    }
    if (constraint.includes("url-any")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("url-page")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("url-domain")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
}


/***/ }),

/***/ "./client/src/modules/init-options/launch-workspace/init-options.ts":
/*!**************************************************************************!*\
  !*** ./client/src/modules/init-options/launch-workspace/init-options.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitOptionsLaunchWorkspaceHandler: () => (/* binding */ InitOptionsLaunchWorkspaceHandler)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Init options launch handler.
 */
class InitOptionsLaunchWorkspaceHandler {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("InitOptionsLaunchWorkspaceHandler");
        this._helpers = helpers;
        this._definition = definition;
        this._logger.info("The handler has been loaded");
    }
    /**
     * Handle the init options action.
     * @param requestedAction The requested action.
     * @param payload The payload for the action.
     * @param context The context calling the action.
     */
    async action(requestedAction, payload, context) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload)) {
            this._logger?.warn(`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
            return;
        }
        try {
            if (requestedAction === "launch-workspace") {
                const workspaceId = payload?.workspaceId;
                this._logger?.info(`The following workspaceId was passed and requested to launch: ${workspaceId}`);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(workspaceId)) {
                    this._logger?.error("The init handler received a workspaceId in the wrong format and is unable to launch it");
                    return;
                }
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.launchWorkspace)) {
                    this._logger?.warn(`Unable to launch workspace with workspaceId: ${workspaceId} as a launchWorkspace function was not passed to this module via the module helpers.`);
                    return;
                }
                this._logger?.info(`Requesting the launch of workspace with workspaceId: ${workspaceId}`);
                await this._helpers?.launchWorkspace(workspaceId, this._logger);
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
/*!*******************************************************************!*\
  !*** ./client/src/modules/init-options/launch-workspace/index.ts ***!
  \*******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _init_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init-options */ "./client/src/modules/init-options/launch-workspace/init-options.ts");

const entryPoints = {
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_0__.InitOptionsLaunchWorkspaceHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsa0NBQWtDLGVBQWUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLENBQUM7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0NsRkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xtRTtBQUU1RCxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsV0FBVyxFQUFFLElBQUksNEVBQWlDLEVBQUU7Q0FDcEQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvbGF1bmNoLXdvcmtzcGFjZS9pbml0LW9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2luaXQtb3B0aW9ucy9sYXVuY2gtd29ya3NwYWNlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBBIHdheSBvZiBzcGVjaWZ5IHRoZSBydWxlcyBhcm91bmQgdGhlIHZhbGlkYXRpb24uXG4gKiBET01BSU4gbWVhbnMgdGhhdCB0aGUgdXJsIG11c3QgY29tZSBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAqIFBBR0UgbWVhbnMgdGhhdCB0aGUgdXJscyBtdXN0IG1hdGNoIHRoZSBzYW1lIG9yaWdpbiBhbmQgcGF0aC5cbiAqIEFOWSBtZWFucyB5b3UgYXJlIGFsbG93ZWQgdG8gcmVwbGFjZSBvbmUgdXJsIHdpdGggYW5vdGhlciB3aXRob3V0IGNvbnN0cmFpbi5cbiAqIE5PTkUgbWVhbnMgeW91IHdhbnQgdG8gZW5zdXJlIHRoYXQgdGhlIHVybCBpcyBub3QgY2hhbmdlZC5cbiAqL1xuZXhwb3J0IHR5cGUgVmFsaWRVUkxDb25zdHJhaW50ID0gXCJ1cmwtZG9tYWluXCIgfCBcInVybC1wYWdlXCIgfCBcInVybC1hbnlcIiB8IFwidXJsLW5vbmVcIjtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIHN1Z2dlc3RlZCB1cmwgdG8gc2VlIGlmIGl0IGNhbiByZXBsYWNlIHRoZSBzb3VyY2UgdXJsLlxuICogQHBhcmFtIHNvdXJjZVVybCB0aGUgb3JpZ2luYWwgdXJsIHRvIGNvbXBhcmUgYWdhaW5zdC5cbiAqIEBwYXJhbSBzdWdnZXN0ZWRVcmwgdGhlIHN1Z2dlc3RlZCB1cmwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICogQHBhcmFtIGNvbnN0cmFpbnQgdGhlIHJ1bGVzIHRvIGFwcGx5IGFnYWluc3QgaXQuXG4gKiBAcmV0dXJucyB3aGV0aGVyIGl0IGlzIG9rIHRvIHJlcGxhY2UgdGhlIHNvdXJjZVVybCB3aXRoIHRoZSBzdWdnZXN0ZWRVcmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRVcmwoXG5cdHNvdXJjZVVybDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuXHRzdWdnZXN0ZWRVcmw6IHN0cmluZyxcblx0Y29uc3RyYWludDogVmFsaWRVUkxDb25zdHJhaW50W10gfCB1bmRlZmluZWRcbik6IGJvb2xlYW4ge1xuXHRpZiAoaXNFbXB0eShzdWdnZXN0ZWRVcmwpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICghQXJyYXkuaXNBcnJheShjb25zdHJhaW50KSB8fCBjb25zdHJhaW50Lmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwidXJsLW5vbmVcIikpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtYW55XCIpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGlzRW1wdHkoc291cmNlVXJsKSkge1xuXHRcdC8vIGlmIHdlIGFyZSBhYm91dCB0byBkbyBhIGRvbWFpbiByZWxhdGVkIGNoZWNrIHRoZW4gd2UgbmVlZCBhIHNvdXJjZSB1cmxcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgdmFsaWRhdGVkU291cmNlVXJsID0gbmV3IFVSTChzb3VyY2VVcmwpO1xuXHRjb25zdCB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwgPSBuZXcgVVJMKHN1Z2dlc3RlZFVybCk7XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJ1cmwtcGFnZVwiKSkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQodmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiArIHZhbGlkYXRlZFNvdXJjZVVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKSA9PT1cblx0XHRcdCh2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwub3JpZ2luICsgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpXG5cdFx0KTtcblx0fVxuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwidXJsLWRvbWFpblwiKSkge1xuXHRcdHJldHVybiB2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luID09PSB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwub3JpZ2luO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRBY3Rpb25IYW5kbGVyQ29udGV4dCxcblx0SW5pdE9wdGlvbnNIYW5kbGVyXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW5pdC1vcHRpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBMYXVuY2hXb3Jrc3BhY2VPcHRpb25zLCBMYXVuY2hXb3Jrc3BhY2VQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW5pdCBvcHRpb25zIGxhdW5jaCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgSW5pdE9wdGlvbnNMYXVuY2hXb3Jrc3BhY2VIYW5kbGVyXG5cdGltcGxlbWVudHMgSW5pdE9wdGlvbnNIYW5kbGVyPExhdW5jaFdvcmtzcGFjZU9wdGlvbnMsIExhdW5jaFdvcmtzcGFjZVBheWxvYWQ+XG57XG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9oZWxwZXJzPzogTW9kdWxlSGVscGVycztcblxuXHRwcml2YXRlIF9kZWZpbml0aW9uPzogTW9kdWxlRGVmaW5pdGlvbjxMYXVuY2hXb3Jrc3BhY2VPcHRpb25zPjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxMYXVuY2hXb3Jrc3BhY2VPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkluaXRPcHRpb25zTGF1bmNoV29ya3NwYWNlSGFuZGxlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlRoZSBoYW5kbGVyIGhhcyBiZWVuIGxvYWRlZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgdGhlIGluaXQgb3B0aW9ucyBhY3Rpb24uXG5cdCAqIEBwYXJhbSByZXF1ZXN0ZWRBY3Rpb24gVGhlIHJlcXVlc3RlZCBhY3Rpb24uXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIGZvciB0aGUgYWN0aW9uLlxuXHQgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCBjYWxsaW5nIHRoZSBhY3Rpb24uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKFxuXHRcdHJlcXVlc3RlZEFjdGlvbjogc3RyaW5nLFxuXHRcdHBheWxvYWQ6IExhdW5jaFdvcmtzcGFjZVBheWxvYWQgfCB1bmRlZmluZWQsXG5cdFx0Y29udGV4dDogQWN0aW9uSGFuZGxlckNvbnRleHRcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YEFjdGlvbnMgcGFzc2VkIHRvIHRoZSBtb2R1bGUgcmVxdWlyZSBhIHBheWxvYWQgdG8gYmUgcGFzc2VkLiBSZXF1ZXN0ZWQgYWN0aW9uOiAke3JlcXVlc3RlZEFjdGlvbn0gY2FuIG5vdCBiZSBmdWxmaWxsZWQuYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChyZXF1ZXN0ZWRBY3Rpb24gPT09IFwibGF1bmNoLXdvcmtzcGFjZVwiKSB7XG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUlkID0gcGF5bG9hZD8ud29ya3NwYWNlSWQ7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgVGhlIGZvbGxvd2luZyB3b3Jrc3BhY2VJZCB3YXMgcGFzc2VkIGFuZCByZXF1ZXN0ZWQgdG8gbGF1bmNoOiAke3dvcmtzcGFjZUlkfWApO1xuXG5cdFx0XHRcdGlmICghaXNTdHJpbmdWYWx1ZSh3b3Jrc3BhY2VJZCkpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XCJUaGUgaW5pdCBoYW5kbGVyIHJlY2VpdmVkIGEgd29ya3NwYWNlSWQgaW4gdGhlIHdyb25nIGZvcm1hdCBhbmQgaXMgdW5hYmxlIHRvIGxhdW5jaCBpdFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5sYXVuY2hXb3Jrc3BhY2UpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0YFVuYWJsZSB0byBsYXVuY2ggd29ya3NwYWNlIHdpdGggd29ya3NwYWNlSWQ6ICR7d29ya3NwYWNlSWR9IGFzIGEgbGF1bmNoV29ya3NwYWNlIGZ1bmN0aW9uIHdhcyBub3QgcGFzc2VkIHRvIHRoaXMgbW9kdWxlIHZpYSB0aGUgbW9kdWxlIGhlbHBlcnMuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBSZXF1ZXN0aW5nIHRoZSBsYXVuY2ggb2Ygd29ya3NwYWNlIHdpdGggd29ya3NwYWNlSWQ6ICR7d29ya3NwYWNlSWR9YCk7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSh3b3Jrc3BhY2VJZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBJbml0T3B0aW9uc0xhdW5jaFdvcmtzcGFjZUhhbmRsZXIgfSBmcm9tIFwiLi9pbml0LW9wdGlvbnNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGluaXRPcHRpb25zOiBuZXcgSW5pdE9wdGlvbnNMYXVuY2hXb3Jrc3BhY2VIYW5kbGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=