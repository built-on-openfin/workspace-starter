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
    if (constraint.includes("URL_NONE")) {
        return false;
    }
    if (constraint.includes("URL_ANY")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("URL_PAGE")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("URL_DOMAIN")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FDekIsUUFBaUMsRUFDakMsS0FBc0YsRUFDdEYsaUJBQXlCO1FBRXpCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRDs7Ozs7OztTQ2pLRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTHlFO0FBRXpFOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLGVBQWUsRUFBRSxJQUFJLGtGQUFtQyxFQUFFO0NBQzFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29udGVudC1jcmVhdGlvbi92aWV3LXBvc2l0aW9uL2NvbnRlbnQtY3JlYXRpb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbnRlbnQtY3JlYXRpb24vdmlldy1wb3NpdGlvbi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwiVVJMX0RPTUFJTlwiIHwgXCJVUkxfUEFHRVwiIHwgXCJVUkxfQU5ZXCIgfCBcIlVSTF9OT05FXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9OT05FXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0FOWVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX1BBR0VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9ET01BSU5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7XG5cdENvbnRlbnRDcmVhdGlvbkV2ZW50LFxuXHRDb250ZW50Q3JlYXRpb25SdWxlc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2NvbnRlbnQtY3JlYXRpb24tc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSB2aWV3IHBvc2l0aW9uIGNvbnRlbnQgY3JlYXRpb24gcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25Qcm92aWRlclxuXHRpbXBsZW1lbnRzIENvbnRlbnRDcmVhdGlvblJ1bGVzPFZpZXdQb3NpdGlvbkNvbnRlbnRDcmVhdGlvblNldHRpbmdzPlxue1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBtZW51LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25TZXR0aW5ncyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25TZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25Qcm92aWRlclwiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBsaXN0IG9mIGNvbnRlbnQgY3JlYXRpb24gcnVsZXMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGNvbnRlbnQgY3JlYXRpb24gcnVsZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0UnVsZXMoKTogUHJvbWlzZTxPcGVuRmluLkNvbnRlbnRDcmVhdGlvblJ1bGVbXT4ge1xuXHRcdHJldHVybiB0aGlzLl9zZXR0aW5ncz8ucnVsZXMgPz8gW107XG5cdH1cblxuXHQvKipcblx0ICogSGFuZCB0aGUgY29udGVudCBjcmVhdGVkIGV2ZW50IGZvciBhIHZpZXcgdG8gdGhlIG1vZHVsZSB0byBwcm9jZXNzIGl0LlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgZGV0YWlscyBmb3IgdGhlIGNyZWF0ZWQgdmlldy5cblx0ICogQHBhcmFtIG1hdGNoaW5nUnVsZUluZGV4IFdoaWNoIG9mIHRoZSBtb2R1bGVzIHJ1bGVzIGRvZXMgdGhlIGV2ZW50IG1hdGNoLCAtMSBpZiBpdCBkb2VzIG5vdCBtYXRjaC5cblx0ICogQHBhcmFtIGF0dGFjaGVkIFdpbGwgYmUgc2V0IGlmIGEgcHJldmlvdXMgaGFuZGxlciBoYXMgYWxyZWFkeSBhdHRhY2hlZCB0aGUgdmlldy5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmlldyBoYXMgYmVlbiBhdHRhY2hlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVWaWV3Q3JlYXRlZChcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0ZXZlbnQ6IENvbnRlbnRDcmVhdGlvbkV2ZW50PE9wZW5GaW4uRXZlbnRzLldlYkNvbnRlbnRzRXZlbnRzLkNoaWxkVmlld0NyZWF0ZWRFdmVudD4sXG5cdFx0bWF0Y2hpbmdSdWxlSW5kZXg6IG51bWJlcixcblx0XHRhdHRhY2hlZDogYm9vbGVhblxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJWaWV3IENyZWF0ZWRcIiwgZXZlbnQsIG1hdGNoaW5nUnVsZUluZGV4LCBhdHRhY2hlZCk7XG5cblx0XHQvLyBPbmx5IHBlcmZvcm0gdGhlIHBvc2l0aW9uaW5nIGlmIGl0IG1hdGNoZXMgb25lIG9mIG91ciBydWxlc1xuXHRcdC8vIGFuZCBpdHMgbm90IGFscmVhZHkgYXR0YWNoZWRcblx0XHRpZiAobWF0Y2hpbmdSdWxlSW5kZXggPj0gMCAmJiAhYXR0YWNoZWQpIHtcblx0XHRcdC8vIFdoZW4gd2UgcmVjZWl2ZSBhIHZpZXcgY3JlYXRlZCBldmVudCBpdCBpcyB1cCB0byB1cyB0byBkZWNpZGUgd2hlcmVcblx0XHRcdC8vIHRvIGFkZCB0aGUgdmlldy4gQ2FsbGluZyBwbGF0Zm9ybS5jcmVhdGVWaWV3IGRvZXMgbm90IHJlLWNyZWF0ZSB0aGUgdmlld1xuXHRcdFx0Ly8gaWYgaXQgYWxyZWFkeSBleGlzdHMsIGJ1dCBzcGVjaWZ5aW5nIGEgdGFyZ2V0IG1lYW5zIGl0IHdpbGwgYmUgYWRkZWQgdG8gdGhhdCB3aW5kb3dcblx0XHRcdC8vIEJ5IHJldHVybmluZyBmYWxzZSBmb3IgdGhlIGF0dGFjaGVkIGZsYWcgdGhlIGRlZmF1bHQgaGFuZGxpbmcgd2lsbCBqdXN0IGF0dGFjaFxuXHRcdFx0Ly8gdG8gdGhlIHNwZWNpZmllZCB0YXJnZXRcblxuXHRcdFx0Ly8gWW91IGNhbiBvZiBjb3Vyc2UgbG9jYXRlIHRoZSB2aWV3IGVsc2V3aGVyZSBhcyBzaG93biB1c2luZyB0aGUgdmlldy1wb3NpdGlvblxuXHRcdFx0Ly8gZmVhdHVyZSBmbGFnIHdoaWNoIGNvdWxkIGJlIHBhc3NlZCB0byB0aGUgd2luZG93Lm9wZW4gY2FsbFxuXHRcdFx0Y29uc3Qgdmlld1Bvc2l0aW9uID0gZXZlbnQucGFyc2VkRmVhdHVyZXNbXCJ2aWV3LXBvc2l0aW9uXCJdO1xuXHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUodmlld1Bvc2l0aW9uKSAmJiAhaXNFbXB0eShldmVudC52aWV3SWRlbnRpdHkpKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2aWV3UG9zaXRpb24gPT09IFwicmlnaHRcIiB8fFxuXHRcdFx0XHRcdHZpZXdQb3NpdGlvbiA9PT0gXCJsZWZ0XCIgfHxcblx0XHRcdFx0XHR2aWV3UG9zaXRpb24gPT09IFwidG9wXCIgfHxcblx0XHRcdFx0XHR2aWV3UG9zaXRpb24gPT09IFwiYm90dG9tXCJcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgdmlldzogT3BlbkZpbi5WaWV3ID0gZmluLlZpZXcud3JhcFN5bmMoZXZlbnQudmlld0lkZW50aXR5KTtcblx0XHRcdFx0XHRjb25zdCBwYXJlbnRUYWJTdGFjazogT3BlbkZpbi5UYWJTdGFjayA9IGF3YWl0IHZpZXcuZ2V0Q3VycmVudFN0YWNrKCk7XG5cdFx0XHRcdFx0YXdhaXQgcGFyZW50VGFiU3RhY2suY3JlYXRlQWRqYWNlbnRTdGFjayhbZXZlbnQuY2hpbGRPcHRpb25zXSwge1xuXHRcdFx0XHRcdFx0cG9zaXRpb246IHZpZXdQb3NpdGlvblxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHZpZXdQb3NpdGlvbiA9PT0gXCJzdGFjay1sZWZ0XCIgfHwgdmlld1Bvc2l0aW9uID09PSBcInN0YWNrLXJpZ2h0XCIpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3OiBPcGVuRmluLlZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhldmVudC52aWV3SWRlbnRpdHkpO1xuXHRcdFx0XHRcdGNvbnN0IHBhcmVudFRhYlN0YWNrOiBPcGVuRmluLlRhYlN0YWNrID0gYXdhaXQgdmlldy5nZXRDdXJyZW50U3RhY2soKTtcblx0XHRcdFx0XHRjb25zdCBzaWJsaW5nVmlld0lkczogT3BlbkZpbi5JZGVudGl0eVtdID0gYXdhaXQgcGFyZW50VGFiU3RhY2suZ2V0Vmlld3MoKTtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50Vmlld0luZGV4ID0gc2libGluZ1ZpZXdJZHMuZmluZEluZGV4KChpZCkgPT4gaWQubmFtZSA9PT0gZXZlbnQudmlld0lkZW50aXR5Py5uYW1lKTtcblx0XHRcdFx0XHRhd2FpdCBwYXJlbnRUYWJTdGFjay5hZGRWaWV3KGV2ZW50LmNoaWxkT3B0aW9ucywge1xuXHRcdFx0XHRcdFx0aW5kZXg6IHZpZXdQb3NpdGlvbiA9PT0gXCJzdGFjay1sZWZ0XCIgPyBjdXJyZW50Vmlld0luZGV4IDogY3VycmVudFZpZXdJbmRleCArIDFcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kIHRoZSBjb250ZW50IGNyZWF0ZWQgZXZlbnQgZm9yIGEgd2luZG93IHRvIHRoZSBtb2R1bGUgdG8gcHJvY2VzcyBpdC5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50IGRldGFpbHMgZm9yIHRoZSBjcmVhdGVkIHdpbmRvdy5cblx0ICogQHBhcmFtIG1hdGNoaW5nUnVsZUluZGV4IFdoaWNoIG9mIHRoZSBtb2R1bGVzIHJ1bGVzIGRvZXMgdGhlIGV2ZW50IG1hdGNoLCAtMSBpZiBpdCBkb2VzIG5vdCBtYXRjaC5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBoYW5kbGVXaW5kb3dDcmVhdGVkKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRldmVudDogQ29udGVudENyZWF0aW9uRXZlbnQ8T3BlbkZpbi5FdmVudHMuV2ViQ29udGVudHNFdmVudHMuQ2hpbGRXaW5kb3dDcmVhdGVkRXZlbnQ+LFxuXHRcdG1hdGNoaW5nUnVsZUluZGV4OiBudW1iZXJcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiV2luZG93IENyZWF0ZWRcIiwgZXZlbnQsIG1hdGNoaW5nUnVsZUluZGV4KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kIHRoZSBjb250ZW50IGNyZWF0ZWQgZXZlbnQgZm9yIGEgYnJvd3NlciB0byB0aGUgbW9kdWxlIHRvIHByb2Nlc3MgaXQuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCBkZXRhaWxzIGZvciB0aGUgY3JlYXRlZCBicm93c2VyLlxuXHQgKiBAcGFyYW0gbWF0Y2hpbmdSdWxlSW5kZXggV2hpY2ggb2YgdGhlIG1vZHVsZXMgcnVsZXMgZG9lcyB0aGUgZXZlbnQgbWF0Y2gsIC0xIGlmIGl0IGRvZXMgbm90IG1hdGNoLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZUJyb3dzZXJDcmVhdGVkKFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRldmVudDogQ29udGVudENyZWF0aW9uRXZlbnQ8T3BlbkZpbi5FdmVudHMuV2ViQ29udGVudHNFdmVudHMuQ2hpbGRDb250ZW50T3BlbmVkSW5Ccm93c2VyRXZlbnQ+LFxuXHRcdG1hdGNoaW5nUnVsZUluZGV4OiBudW1iZXJcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQnJvd3NlciBDcmVhdGVkXCIsIGV2ZW50LCBtYXRjaGluZ1J1bGVJbmRleCk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZCB0aGUgY29udGVudCBibG9ja2VkIGV2ZW50IHRvIHRoZSBtb2R1bGUgdG8gcHJvY2VzcyBpdC5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50IGRldGFpbHMgZm9yIHRoZSBibG9ja2VkIGNvbnRlbnQuXG5cdCAqIEBwYXJhbSBtYXRjaGluZ1J1bGVJbmRleCBXaGljaCBvZiB0aGUgbW9kdWxlcyBydWxlcyBkb2VzIHRoZSBldmVudCBtYXRjaCwgLTEgaWYgaXQgZG9lcyBub3QgbWF0Y2guXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlQmxvY2tlZChcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0ZXZlbnQ6IENvbnRlbnRDcmVhdGlvbkV2ZW50PE9wZW5GaW4uRXZlbnRzLldlYkNvbnRlbnRzRXZlbnRzLkNoaWxkQ29udGVudEJsb2NrZWRFdmVudD4sXG5cdFx0bWF0Y2hpbmdSdWxlSW5kZXg6IG51bWJlclxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDb250ZW50IEJsb2NrZWRcIiwgZXZlbnQsIG1hdGNoaW5nUnVsZUluZGV4KTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgVmlld1Bvc2l0aW9uQ29udGVudENyZWF0aW9uUHJvdmlkZXIgfSBmcm9tIFwiLi9jb250ZW50LWNyZWF0aW9uXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRjb250ZW50Q3JlYXRpb246IG5ldyBWaWV3UG9zaXRpb25Db250ZW50Q3JlYXRpb25Qcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9