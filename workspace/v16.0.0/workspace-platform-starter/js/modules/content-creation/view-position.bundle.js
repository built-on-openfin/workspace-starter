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
        return content.replace(/<[^>]*>?/gm, "");
    }
    return content;
}


/***/ }),

/***/ "./client/src/modules/content-creation/view-position/content-creation.ts":
/*!*******************************************************************************!*\
  !*** ./client/src/modules/content-creation/view-position/content-creation.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewPositionContentCreationProvider: () => (/* binding */ ViewPositionContentCreationProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implementation for the view position content creation provider.
 */
class ViewPositionContentCreationProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ViewPositionContentCreationProvider");
        this._settings = definition.data;
        this._helpers = helpers;
    }
    /**
     * Get a list of content creation rules for the module.
     * @returns The list of content creation rules.
     */
    async getRules() {
        return this._settings?.rules ?? [];
    }
    /**
     * Hand the content created event for a view to the module to process it.
     * @param platform The current platform.
     * @param event The event details for the created view.
     * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
     * @param attached Will be set if a previous handler has already attached the view.
     * @returns True if the view has been attached.
     */
    async handleViewCreated(platform, event, matchingRuleIndex, attached) {
        this._logger?.info("View Created", event, matchingRuleIndex, attached);
        // Only perform the positioning if it matches one of our rules
        // and its not already attached
        if (matchingRuleIndex >= 0 && !attached) {
            // When we receive a view created event it is up to us to decide where
            // to add the view. Calling platform.createView does not re-create the view
            // if it already exists, but specifying a target means it will be added to that window
            // By returning false for the attached flag the default handling will just attach
            // to the specified target
            // You can of course locate the view elsewhere as shown using the view-position
            // feature flag which could be passed to the window.open call
            const viewPosition = event.parsedFeatures["view-position"];
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(viewPosition) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(event.viewIdentity)) {
                if (viewPosition === "right" ||
                    viewPosition === "left" ||
                    viewPosition === "top" ||
                    viewPosition === "bottom") {
                    const view = fin.View.wrapSync(event.viewIdentity);
                    const parentTabStack = await view.getCurrentStack();
                    await parentTabStack.createAdjacentStack([event.childOptions], {
                        position: viewPosition
                    });
                    return true;
                }
                else if (viewPosition === "stack-left" || viewPosition === "stack-right") {
                    const view = fin.View.wrapSync(event.viewIdentity);
                    const parentTabStack = await view.getCurrentStack();
                    const siblingViewIds = await parentTabStack.getViews();
                    const currentViewIndex = siblingViewIds.findIndex((id) => id.name === event.viewIdentity?.name);
                    await parentTabStack.addView(event.childOptions, {
                        index: viewPosition === "stack-left" ? currentViewIndex : currentViewIndex + 1
                    });
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Hand the content created event for a window to the module to process it.
     * @param platform The current platform.
     * @param event The event details for the created window.
     * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
     * @returns Nothing.
     */
    async handleWindowCreated(platform, event, matchingRuleIndex) {
        this._logger?.info("Window Created", event, matchingRuleIndex);
    }
    /**
     * Hand the content created event for a browser to the module to process it.
     * @param platform The current platform.
     * @param event The event details for the created browser.
     * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
     * @returns Nothing.
     */
    async handleBrowserCreated(platform, event, matchingRuleIndex) {
        this._logger?.info("Browser Created", event, matchingRuleIndex);
    }
    /**
     * Hand the content blocked event to the module to process it.
     * @param platform The current platform.
     * @param event The event details for the blocked content.
     * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
     * @returns Nothing.
     */
    async handleBlocked(platform, event, matchingRuleIndex) {
        this._logger?.info("Content Blocked", event, matchingRuleIndex);
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
/*!********************************************************************!*\
  !*** ./client/src/modules/content-creation/view-position/index.ts ***!
  \********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _content_creation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content-creation */ "./client/src/modules/content-creation/view-position/content-creation.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    contentCreation: new _content_creation__WEBPACK_IMPORTED_MODULE_0__.ViewPositionContentCreationProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMeUU7QUFFekU7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsZUFBZSxFQUFFLElBQUksa0ZBQW1DLEVBQUU7Q0FDMUQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb250ZW50LWNyZWF0aW9uL3ZpZXctcG9zaXRpb24vY29udGVudC1jcmVhdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29udGVudC1jcmVhdGlvbi92aWV3LXBvc2l0aW9uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUge1xuXHRDb250ZW50Q3JlYXRpb25FdmVudCxcblx0Q29udGVudENyZWF0aW9uUnVsZXNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9jb250ZW50LWNyZWF0aW9uLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25TZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgdmlldyBwb3NpdGlvbiBjb250ZW50IGNyZWF0aW9uIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uUHJvdmlkZXJcblx0aW1wbGVtZW50cyBDb250ZW50Q3JlYXRpb25SdWxlczxWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25TZXR0aW5ncz5cbntcblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciB0aGUgbWVudS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5nczogVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uU2V0dGluZ3MgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248Vmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uU2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgbGlzdCBvZiBjb250ZW50IGNyZWF0aW9uIHJ1bGVzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBjb250ZW50IGNyZWF0aW9uIHJ1bGVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFJ1bGVzKCk6IFByb21pc2U8T3BlbkZpbi5Db250ZW50Q3JlYXRpb25SdWxlW10+IHtcblx0XHRyZXR1cm4gdGhpcy5fc2V0dGluZ3M/LnJ1bGVzID8/IFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmQgdGhlIGNvbnRlbnQgY3JlYXRlZCBldmVudCBmb3IgYSB2aWV3IHRvIHRoZSBtb2R1bGUgdG8gcHJvY2VzcyBpdC5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50IGRldGFpbHMgZm9yIHRoZSBjcmVhdGVkIHZpZXcuXG5cdCAqIEBwYXJhbSBtYXRjaGluZ1J1bGVJbmRleCBXaGljaCBvZiB0aGUgbW9kdWxlcyBydWxlcyBkb2VzIHRoZSBldmVudCBtYXRjaCwgLTEgaWYgaXQgZG9lcyBub3QgbWF0Y2guXG5cdCAqIEBwYXJhbSBhdHRhY2hlZCBXaWxsIGJlIHNldCBpZiBhIHByZXZpb3VzIGhhbmRsZXIgaGFzIGFscmVhZHkgYXR0YWNoZWQgdGhlIHZpZXcuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGJlZW4gYXR0YWNoZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlVmlld0NyZWF0ZWQoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdGV2ZW50OiBDb250ZW50Q3JlYXRpb25FdmVudDxPcGVuRmluLkV2ZW50cy5XZWJDb250ZW50c0V2ZW50cy5DaGlsZFZpZXdDcmVhdGVkRXZlbnQ+LFxuXHRcdG1hdGNoaW5nUnVsZUluZGV4OiBudW1iZXIsXG5cdFx0YXR0YWNoZWQ6IGJvb2xlYW5cblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVmlldyBDcmVhdGVkXCIsIGV2ZW50LCBtYXRjaGluZ1J1bGVJbmRleCwgYXR0YWNoZWQpO1xuXG5cdFx0Ly8gT25seSBwZXJmb3JtIHRoZSBwb3NpdGlvbmluZyBpZiBpdCBtYXRjaGVzIG9uZSBvZiBvdXIgcnVsZXNcblx0XHQvLyBhbmQgaXRzIG5vdCBhbHJlYWR5IGF0dGFjaGVkXG5cdFx0aWYgKG1hdGNoaW5nUnVsZUluZGV4ID49IDAgJiYgIWF0dGFjaGVkKSB7XG5cdFx0XHQvLyBXaGVuIHdlIHJlY2VpdmUgYSB2aWV3IGNyZWF0ZWQgZXZlbnQgaXQgaXMgdXAgdG8gdXMgdG8gZGVjaWRlIHdoZXJlXG5cdFx0XHQvLyB0byBhZGQgdGhlIHZpZXcuIENhbGxpbmcgcGxhdGZvcm0uY3JlYXRlVmlldyBkb2VzIG5vdCByZS1jcmVhdGUgdGhlIHZpZXdcblx0XHRcdC8vIGlmIGl0IGFscmVhZHkgZXhpc3RzLCBidXQgc3BlY2lmeWluZyBhIHRhcmdldCBtZWFucyBpdCB3aWxsIGJlIGFkZGVkIHRvIHRoYXQgd2luZG93XG5cdFx0XHQvLyBCeSByZXR1cm5pbmcgZmFsc2UgZm9yIHRoZSBhdHRhY2hlZCBmbGFnIHRoZSBkZWZhdWx0IGhhbmRsaW5nIHdpbGwganVzdCBhdHRhY2hcblx0XHRcdC8vIHRvIHRoZSBzcGVjaWZpZWQgdGFyZ2V0XG5cblx0XHRcdC8vIFlvdSBjYW4gb2YgY291cnNlIGxvY2F0ZSB0aGUgdmlldyBlbHNld2hlcmUgYXMgc2hvd24gdXNpbmcgdGhlIHZpZXctcG9zaXRpb25cblx0XHRcdC8vIGZlYXR1cmUgZmxhZyB3aGljaCBjb3VsZCBiZSBwYXNzZWQgdG8gdGhlIHdpbmRvdy5vcGVuIGNhbGxcblx0XHRcdGNvbnN0IHZpZXdQb3NpdGlvbiA9IGV2ZW50LnBhcnNlZEZlYXR1cmVzW1widmlldy1wb3NpdGlvblwiXTtcblx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHZpZXdQb3NpdGlvbikgJiYgIWlzRW1wdHkoZXZlbnQudmlld0lkZW50aXR5KSkge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmlld1Bvc2l0aW9uID09PSBcInJpZ2h0XCIgfHxcblx0XHRcdFx0XHR2aWV3UG9zaXRpb24gPT09IFwibGVmdFwiIHx8XG5cdFx0XHRcdFx0dmlld1Bvc2l0aW9uID09PSBcInRvcFwiIHx8XG5cdFx0XHRcdFx0dmlld1Bvc2l0aW9uID09PSBcImJvdHRvbVwiXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXc6IE9wZW5GaW4uVmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKGV2ZW50LnZpZXdJZGVudGl0eSk7XG5cdFx0XHRcdFx0Y29uc3QgcGFyZW50VGFiU3RhY2s6IE9wZW5GaW4uVGFiU3RhY2sgPSBhd2FpdCB2aWV3LmdldEN1cnJlbnRTdGFjaygpO1xuXHRcdFx0XHRcdGF3YWl0IHBhcmVudFRhYlN0YWNrLmNyZWF0ZUFkamFjZW50U3RhY2soW2V2ZW50LmNoaWxkT3B0aW9uc10sIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uOiB2aWV3UG9zaXRpb25cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIGlmICh2aWV3UG9zaXRpb24gPT09IFwic3RhY2stbGVmdFwiIHx8IHZpZXdQb3NpdGlvbiA9PT0gXCJzdGFjay1yaWdodFwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmlldzogT3BlbkZpbi5WaWV3ID0gZmluLlZpZXcud3JhcFN5bmMoZXZlbnQudmlld0lkZW50aXR5KTtcblx0XHRcdFx0XHRjb25zdCBwYXJlbnRUYWJTdGFjazogT3BlbkZpbi5UYWJTdGFjayA9IGF3YWl0IHZpZXcuZ2V0Q3VycmVudFN0YWNrKCk7XG5cdFx0XHRcdFx0Y29uc3Qgc2libGluZ1ZpZXdJZHM6IE9wZW5GaW4uSWRlbnRpdHlbXSA9IGF3YWl0IHBhcmVudFRhYlN0YWNrLmdldFZpZXdzKCk7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFZpZXdJbmRleCA9IHNpYmxpbmdWaWV3SWRzLmZpbmRJbmRleCgoaWQpID0+IGlkLm5hbWUgPT09IGV2ZW50LnZpZXdJZGVudGl0eT8ubmFtZSk7XG5cdFx0XHRcdFx0YXdhaXQgcGFyZW50VGFiU3RhY2suYWRkVmlldyhldmVudC5jaGlsZE9wdGlvbnMsIHtcblx0XHRcdFx0XHRcdGluZGV4OiB2aWV3UG9zaXRpb24gPT09IFwic3RhY2stbGVmdFwiID8gY3VycmVudFZpZXdJbmRleCA6IGN1cnJlbnRWaWV3SW5kZXggKyAxXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZCB0aGUgY29udGVudCBjcmVhdGVkIGV2ZW50IGZvciBhIHdpbmRvdyB0byB0aGUgbW9kdWxlIHRvIHByb2Nlc3MgaXQuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCBkZXRhaWxzIGZvciB0aGUgY3JlYXRlZCB3aW5kb3cuXG5cdCAqIEBwYXJhbSBtYXRjaGluZ1J1bGVJbmRleCBXaGljaCBvZiB0aGUgbW9kdWxlcyBydWxlcyBkb2VzIHRoZSBldmVudCBtYXRjaCwgLTEgaWYgaXQgZG9lcyBub3QgbWF0Y2guXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlV2luZG93Q3JlYXRlZChcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0ZXZlbnQ6IENvbnRlbnRDcmVhdGlvbkV2ZW50PE9wZW5GaW4uRXZlbnRzLldlYkNvbnRlbnRzRXZlbnRzLkNoaWxkV2luZG93Q3JlYXRlZEV2ZW50Pixcblx0XHRtYXRjaGluZ1J1bGVJbmRleDogbnVtYmVyXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIldpbmRvdyBDcmVhdGVkXCIsIGV2ZW50LCBtYXRjaGluZ1J1bGVJbmRleCk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZCB0aGUgY29udGVudCBjcmVhdGVkIGV2ZW50IGZvciBhIGJyb3dzZXIgdG8gdGhlIG1vZHVsZSB0byBwcm9jZXNzIGl0LlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgZGV0YWlscyBmb3IgdGhlIGNyZWF0ZWQgYnJvd3Nlci5cblx0ICogQHBhcmFtIG1hdGNoaW5nUnVsZUluZGV4IFdoaWNoIG9mIHRoZSBtb2R1bGVzIHJ1bGVzIGRvZXMgdGhlIGV2ZW50IG1hdGNoLCAtMSBpZiBpdCBkb2VzIG5vdCBtYXRjaC5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVCcm93c2VyQ3JlYXRlZChcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0ZXZlbnQ6IENvbnRlbnRDcmVhdGlvbkV2ZW50PE9wZW5GaW4uRXZlbnRzLldlYkNvbnRlbnRzRXZlbnRzLkNoaWxkQ29udGVudE9wZW5lZEluQnJvd3NlckV2ZW50Pixcblx0XHRtYXRjaGluZ1J1bGVJbmRleDogbnVtYmVyXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkJyb3dzZXIgQ3JlYXRlZFwiLCBldmVudCwgbWF0Y2hpbmdSdWxlSW5kZXgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmQgdGhlIGNvbnRlbnQgYmxvY2tlZCBldmVudCB0byB0aGUgbW9kdWxlIHRvIHByb2Nlc3MgaXQuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCBkZXRhaWxzIGZvciB0aGUgYmxvY2tlZCBjb250ZW50LlxuXHQgKiBAcGFyYW0gbWF0Y2hpbmdSdWxlSW5kZXggV2hpY2ggb2YgdGhlIG1vZHVsZXMgcnVsZXMgZG9lcyB0aGUgZXZlbnQgbWF0Y2gsIC0xIGlmIGl0IGRvZXMgbm90IG1hdGNoLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZUJsb2NrZWQoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdGV2ZW50OiBDb250ZW50Q3JlYXRpb25FdmVudDxPcGVuRmluLkV2ZW50cy5XZWJDb250ZW50c0V2ZW50cy5DaGlsZENvbnRlbnRCbG9ja2VkRXZlbnQ+LFxuXHRcdG1hdGNoaW5nUnVsZUluZGV4OiBudW1iZXJcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ29udGVudCBCbG9ja2VkXCIsIGV2ZW50LCBtYXRjaGluZ1J1bGVJbmRleCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblByb3ZpZGVyIH0gZnJvbSBcIi4vY29udGVudC1jcmVhdGlvblwiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0Y29udGVudENyZWF0aW9uOiBuZXcgVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==