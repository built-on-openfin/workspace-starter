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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQ3pCLFFBQWlDLEVBQ2pDLEtBQXNGLEVBQ3RGLGlCQUF5QjtRQUV6QixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0Q7Ozs7Ozs7U0NqS0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0x5RTtBQUV6RTs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxlQUFlLEVBQUUsSUFBSSxrRkFBbUMsRUFBRTtDQUMxRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbnRlbnQtY3JlYXRpb24vdmlldy1wb3NpdGlvbi9jb250ZW50LWNyZWF0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb250ZW50LWNyZWF0aW9uL3ZpZXctcG9zaXRpb24vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHtcblx0Q29udGVudENyZWF0aW9uRXZlbnQsXG5cdENvbnRlbnRDcmVhdGlvblJ1bGVzXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvY29udGVudC1jcmVhdGlvbi1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uU2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHZpZXcgcG9zaXRpb24gY29udGVudCBjcmVhdGlvbiBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblByb3ZpZGVyXG5cdGltcGxlbWVudHMgQ29udGVudENyZWF0aW9uUnVsZXM8Vmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uU2V0dGluZ3M+XG57XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIG1lbnUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblNldHRpbmdzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhIGxpc3Qgb2YgY29udGVudCBjcmVhdGlvbiBydWxlcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgY29udGVudCBjcmVhdGlvbiBydWxlcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRSdWxlcygpOiBQcm9taXNlPE9wZW5GaW4uQ29udGVudENyZWF0aW9uUnVsZVtdPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3NldHRpbmdzPy5ydWxlcyA/PyBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kIHRoZSBjb250ZW50IGNyZWF0ZWQgZXZlbnQgZm9yIGEgdmlldyB0byB0aGUgbW9kdWxlIHRvIHByb2Nlc3MgaXQuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCBkZXRhaWxzIGZvciB0aGUgY3JlYXRlZCB2aWV3LlxuXHQgKiBAcGFyYW0gbWF0Y2hpbmdSdWxlSW5kZXggV2hpY2ggb2YgdGhlIG1vZHVsZXMgcnVsZXMgZG9lcyB0aGUgZXZlbnQgbWF0Y2gsIC0xIGlmIGl0IGRvZXMgbm90IG1hdGNoLlxuXHQgKiBAcGFyYW0gYXR0YWNoZWQgV2lsbCBiZSBzZXQgaWYgYSBwcmV2aW91cyBoYW5kbGVyIGhhcyBhbHJlYWR5IGF0dGFjaGVkIHRoZSB2aWV3LlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2aWV3IGhhcyBiZWVuIGF0dGFjaGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZVZpZXdDcmVhdGVkKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRldmVudDogQ29udGVudENyZWF0aW9uRXZlbnQ8T3BlbkZpbi5FdmVudHMuV2ViQ29udGVudHNFdmVudHMuQ2hpbGRWaWV3Q3JlYXRlZEV2ZW50Pixcblx0XHRtYXRjaGluZ1J1bGVJbmRleDogbnVtYmVyLFxuXHRcdGF0dGFjaGVkOiBib29sZWFuXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlZpZXcgQ3JlYXRlZFwiLCBldmVudCwgbWF0Y2hpbmdSdWxlSW5kZXgsIGF0dGFjaGVkKTtcblxuXHRcdC8vIE9ubHkgcGVyZm9ybSB0aGUgcG9zaXRpb25pbmcgaWYgaXQgbWF0Y2hlcyBvbmUgb2Ygb3VyIHJ1bGVzXG5cdFx0Ly8gYW5kIGl0cyBub3QgYWxyZWFkeSBhdHRhY2hlZFxuXHRcdGlmIChtYXRjaGluZ1J1bGVJbmRleCA+PSAwICYmICFhdHRhY2hlZCkge1xuXHRcdFx0Ly8gV2hlbiB3ZSByZWNlaXZlIGEgdmlldyBjcmVhdGVkIGV2ZW50IGl0IGlzIHVwIHRvIHVzIHRvIGRlY2lkZSB3aGVyZVxuXHRcdFx0Ly8gdG8gYWRkIHRoZSB2aWV3LiBDYWxsaW5nIHBsYXRmb3JtLmNyZWF0ZVZpZXcgZG9lcyBub3QgcmUtY3JlYXRlIHRoZSB2aWV3XG5cdFx0XHQvLyBpZiBpdCBhbHJlYWR5IGV4aXN0cywgYnV0IHNwZWNpZnlpbmcgYSB0YXJnZXQgbWVhbnMgaXQgd2lsbCBiZSBhZGRlZCB0byB0aGF0IHdpbmRvd1xuXHRcdFx0Ly8gQnkgcmV0dXJuaW5nIGZhbHNlIGZvciB0aGUgYXR0YWNoZWQgZmxhZyB0aGUgZGVmYXVsdCBoYW5kbGluZyB3aWxsIGp1c3QgYXR0YWNoXG5cdFx0XHQvLyB0byB0aGUgc3BlY2lmaWVkIHRhcmdldFxuXG5cdFx0XHQvLyBZb3UgY2FuIG9mIGNvdXJzZSBsb2NhdGUgdGhlIHZpZXcgZWxzZXdoZXJlIGFzIHNob3duIHVzaW5nIHRoZSB2aWV3LXBvc2l0aW9uXG5cdFx0XHQvLyBmZWF0dXJlIGZsYWcgd2hpY2ggY291bGQgYmUgcGFzc2VkIHRvIHRoZSB3aW5kb3cub3BlbiBjYWxsXG5cdFx0XHRjb25zdCB2aWV3UG9zaXRpb24gPSBldmVudC5wYXJzZWRGZWF0dXJlc1tcInZpZXctcG9zaXRpb25cIl07XG5cdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZSh2aWV3UG9zaXRpb24pICYmICFpc0VtcHR5KGV2ZW50LnZpZXdJZGVudGl0eSkpIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZpZXdQb3NpdGlvbiA9PT0gXCJyaWdodFwiIHx8XG5cdFx0XHRcdFx0dmlld1Bvc2l0aW9uID09PSBcImxlZnRcIiB8fFxuXHRcdFx0XHRcdHZpZXdQb3NpdGlvbiA9PT0gXCJ0b3BcIiB8fFxuXHRcdFx0XHRcdHZpZXdQb3NpdGlvbiA9PT0gXCJib3R0b21cIlxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3OiBPcGVuRmluLlZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhldmVudC52aWV3SWRlbnRpdHkpO1xuXHRcdFx0XHRcdGNvbnN0IHBhcmVudFRhYlN0YWNrOiBPcGVuRmluLlRhYlN0YWNrID0gYXdhaXQgdmlldy5nZXRDdXJyZW50U3RhY2soKTtcblx0XHRcdFx0XHRhd2FpdCBwYXJlbnRUYWJTdGFjay5jcmVhdGVBZGphY2VudFN0YWNrKFtldmVudC5jaGlsZE9wdGlvbnNdLCB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbjogdmlld1Bvc2l0aW9uXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gZWxzZSBpZiAodmlld1Bvc2l0aW9uID09PSBcInN0YWNrLWxlZnRcIiB8fCB2aWV3UG9zaXRpb24gPT09IFwic3RhY2stcmlnaHRcIikge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXc6IE9wZW5GaW4uVmlldyA9IGZpbi5WaWV3LndyYXBTeW5jKGV2ZW50LnZpZXdJZGVudGl0eSk7XG5cdFx0XHRcdFx0Y29uc3QgcGFyZW50VGFiU3RhY2s6IE9wZW5GaW4uVGFiU3RhY2sgPSBhd2FpdCB2aWV3LmdldEN1cnJlbnRTdGFjaygpO1xuXHRcdFx0XHRcdGNvbnN0IHNpYmxpbmdWaWV3SWRzOiBPcGVuRmluLklkZW50aXR5W10gPSBhd2FpdCBwYXJlbnRUYWJTdGFjay5nZXRWaWV3cygpO1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRWaWV3SW5kZXggPSBzaWJsaW5nVmlld0lkcy5maW5kSW5kZXgoKGlkKSA9PiBpZC5uYW1lID09PSBldmVudC52aWV3SWRlbnRpdHk/Lm5hbWUpO1xuXHRcdFx0XHRcdGF3YWl0IHBhcmVudFRhYlN0YWNrLmFkZFZpZXcoZXZlbnQuY2hpbGRPcHRpb25zLCB7XG5cdFx0XHRcdFx0XHRpbmRleDogdmlld1Bvc2l0aW9uID09PSBcInN0YWNrLWxlZnRcIiA/IGN1cnJlbnRWaWV3SW5kZXggOiBjdXJyZW50Vmlld0luZGV4ICsgMVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmQgdGhlIGNvbnRlbnQgY3JlYXRlZCBldmVudCBmb3IgYSB3aW5kb3cgdG8gdGhlIG1vZHVsZSB0byBwcm9jZXNzIGl0LlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgZGV0YWlscyBmb3IgdGhlIGNyZWF0ZWQgd2luZG93LlxuXHQgKiBAcGFyYW0gbWF0Y2hpbmdSdWxlSW5kZXggV2hpY2ggb2YgdGhlIG1vZHVsZXMgcnVsZXMgZG9lcyB0aGUgZXZlbnQgbWF0Y2gsIC0xIGlmIGl0IGRvZXMgbm90IG1hdGNoLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZVdpbmRvd0NyZWF0ZWQoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdGV2ZW50OiBDb250ZW50Q3JlYXRpb25FdmVudDxPcGVuRmluLkV2ZW50cy5XZWJDb250ZW50c0V2ZW50cy5DaGlsZFdpbmRvd0NyZWF0ZWRFdmVudD4sXG5cdFx0bWF0Y2hpbmdSdWxlSW5kZXg6IG51bWJlclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJXaW5kb3cgQ3JlYXRlZFwiLCBldmVudCwgbWF0Y2hpbmdSdWxlSW5kZXgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmQgdGhlIGNvbnRlbnQgY3JlYXRlZCBldmVudCBmb3IgYSBicm93c2VyIHRvIHRoZSBtb2R1bGUgdG8gcHJvY2VzcyBpdC5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50IGRldGFpbHMgZm9yIHRoZSBjcmVhdGVkIGJyb3dzZXIuXG5cdCAqIEBwYXJhbSBtYXRjaGluZ1J1bGVJbmRleCBXaGljaCBvZiB0aGUgbW9kdWxlcyBydWxlcyBkb2VzIHRoZSBldmVudCBtYXRjaCwgLTEgaWYgaXQgZG9lcyBub3QgbWF0Y2guXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlQnJvd3NlckNyZWF0ZWQoXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdGV2ZW50OiBDb250ZW50Q3JlYXRpb25FdmVudDxPcGVuRmluLkV2ZW50cy5XZWJDb250ZW50c0V2ZW50cy5DaGlsZENvbnRlbnRPcGVuZWRJbkJyb3dzZXJFdmVudD4sXG5cdFx0bWF0Y2hpbmdSdWxlSW5kZXg6IG51bWJlclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJCcm93c2VyIENyZWF0ZWRcIiwgZXZlbnQsIG1hdGNoaW5nUnVsZUluZGV4KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kIHRoZSBjb250ZW50IGJsb2NrZWQgZXZlbnQgdG8gdGhlIG1vZHVsZSB0byBwcm9jZXNzIGl0LlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgZGV0YWlscyBmb3IgdGhlIGJsb2NrZWQgY29udGVudC5cblx0ICogQHBhcmFtIG1hdGNoaW5nUnVsZUluZGV4IFdoaWNoIG9mIHRoZSBtb2R1bGVzIHJ1bGVzIGRvZXMgdGhlIGV2ZW50IG1hdGNoLCAtMSBpZiBpdCBkb2VzIG5vdCBtYXRjaC5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVCbG9ja2VkKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRldmVudDogQ29udGVudENyZWF0aW9uRXZlbnQ8T3BlbkZpbi5FdmVudHMuV2ViQ29udGVudHNFdmVudHMuQ2hpbGRDb250ZW50QmxvY2tlZEV2ZW50Pixcblx0XHRtYXRjaGluZ1J1bGVJbmRleDogbnVtYmVyXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNvbnRlbnQgQmxvY2tlZFwiLCBldmVudCwgbWF0Y2hpbmdSdWxlSW5kZXgpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25Qcm92aWRlciB9IGZyb20gXCIuL2NvbnRlbnQtY3JlYXRpb25cIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGNvbnRlbnRDcmVhdGlvbjogbmV3IFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=