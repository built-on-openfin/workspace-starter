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

/***/ "./client/src/modules/init-options/interop/init-options.ts":
/*!*****************************************************************!*\
  !*** ./client/src/modules/init-options/interop/init-options.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitOptionsInteropHandler: () => (/* binding */ InitOptionsInteropHandler)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Init options interop handler.
 */
class InitOptionsInteropHandler {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("InitOptionsInteropHandler");
        // the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
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
            switch (requestedAction) {
                case "raise-intent": {
                    await this.raiseIntent(payload);
                    break;
                }
                case "share-context": {
                    await this.shareContext(payload);
                    break;
                }
            }
        }
        catch (error) {
            this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
        }
    }
    /**
     * Raise an intent.
     * @param payload The payload to send.
     */
    async raiseIntent(payload) {
        const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
        this._logger?.info(`Received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
        await brokerClient.fireIntent(payload);
    }
    /**
     * Share context.
     * @param payload The payload to share.
     */
    async shareContext(payload) {
        const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
        const contextGroups = await brokerClient.getContextGroups();
        const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(targetContextGroup)) {
            await brokerClient.joinContextGroup(targetContextGroup.id);
            this._logger?.info(`Received context to send. Context Group ${targetContextGroup.id}. Context: ${JSON.stringify(payload.context, null, 4)}`);
            await brokerClient.setContext(payload.context);
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
/*!**********************************************************!*\
  !*** ./client/src/modules/init-options/interop/index.ts ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _init_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init-options */ "./client/src/modules/init-options/interop/init-options.ts");

const entryPoints = {
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_0__.InitOptionsInteropHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxXQUFXLEdBQXFEO0lBQzVFLFdBQVcsRUFBRSxJQUFJLG9FQUF5QixFQUFFO0NBQzVDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW5pdC1vcHRpb25zL2ludGVyb3AvaW5pdC1vcHRpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvaW50ZXJvcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwiVVJMX0RPTUFJTlwiIHwgXCJVUkxfUEFHRVwiIHwgXCJVUkxfQU5ZXCIgfCBcIlVSTF9OT05FXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9OT05FXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0FOWVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX1BBR0VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9ET01BSU5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0QWN0aW9uSGFuZGxlckNvbnRleHQsXG5cdEluaXRPcHRpb25zSGFuZGxlcixcblx0SW5pdE9wdGlvbnNIYW5kbGVyT3B0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2luaXQtb3B0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgUmFpc2VJbnRlbnRQYXlsb2FkLCBTaGFyZUNvbnRleHRQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW5pdCBvcHRpb25zIGludGVyb3AgaGFuZGxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEluaXRPcHRpb25zSW50ZXJvcEhhbmRsZXJcblx0aW1wbGVtZW50cyBJbml0T3B0aW9uc0hhbmRsZXI8SW5pdE9wdGlvbnNIYW5kbGVyT3B0aW9ucywgUmFpc2VJbnRlbnRQYXlsb2FkIHwgU2hhcmVDb250ZXh0UGF5bG9hZD5cbntcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiSW5pdE9wdGlvbnNJbnRlcm9wSGFuZGxlclwiKTtcblx0XHQvLyB0aGUgaW5pdCBmdW5jdGlvbiBjb3VsZCBiZSBwYXNzZWQgbGltaXRzIChlLmcuIG9ubHkgc3VwcG9ydCB0aGUgZm9sbG93aW5nIGludGVudHMgb3IgY29udGV4dHMuIE9ubHkgcHVibGlzaCB0byB0aGUgZm9sbG93aW5nIGNvbnRleHQgZ3JvdXBzIGV0Yy4pXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJUaGUgaGFuZGxlciBoYXMgYmVlbiBsb2FkZWRcIik7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIHRoZSBpbml0IG9wdGlvbnMgYWN0aW9uLlxuXHQgKiBAcGFyYW0gcmVxdWVzdGVkQWN0aW9uIFRoZSByZXF1ZXN0ZWQgYWN0aW9uLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmb3IgdGhlIGFjdGlvbi5cblx0ICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgY2FsbGluZyB0aGUgYWN0aW9uLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGFjdGlvbihcblx0XHRyZXF1ZXN0ZWRBY3Rpb246IHN0cmluZyxcblx0XHRwYXlsb2FkOiBSYWlzZUludGVudFBheWxvYWQgfCBTaGFyZUNvbnRleHRQYXlsb2FkIHwgdW5kZWZpbmVkLFxuXHRcdGNvbnRleHQ6IEFjdGlvbkhhbmRsZXJDb250ZXh0XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBBY3Rpb25zIHBhc3NlZCB0byB0aGUgbW9kdWxlIHJlcXVpcmUgYSBwYXlsb2FkIHRvIGJlIHBhc3NlZC4gUmVxdWVzdGVkIGFjdGlvbjogJHtyZXF1ZXN0ZWRBY3Rpb259IGNhbiBub3QgYmUgZnVsZmlsbGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRzd2l0Y2ggKHJlcXVlc3RlZEFjdGlvbikge1xuXHRcdFx0XHRjYXNlIFwicmFpc2UtaW50ZW50XCI6IHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnJhaXNlSW50ZW50KHBheWxvYWQgYXMgUmFpc2VJbnRlbnRQYXlsb2FkKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFwic2hhcmUtY29udGV4dFwiOiB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zaGFyZUNvbnRleHQocGF5bG9hZCBhcyBTaGFyZUNvbnRleHRQYXlsb2FkKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB0cnlpbmcgdG8gcGVyZm9ybSBhY3Rpb24gJHtyZXF1ZXN0ZWRBY3Rpb259LmAsIGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmFpc2UgYW4gaW50ZW50LlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzZW5kLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByYWlzZUludGVudChwYXlsb2FkOiBSYWlzZUludGVudFBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBicm9rZXJDbGllbnQgPSBmaW4uSW50ZXJvcC5jb25uZWN0U3luYyhmaW4ubWUuaWRlbnRpdHkudXVpZCwge30pO1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgUmVjZWl2ZWQgaW50ZW50IHRvIHJhaXNlLiBJbnRlbnQgUmVxdWVzdCAke0pTT04uc3RyaW5naWZ5KHBheWxvYWQsIG51bGwsIDQpfS5gKTtcblx0XHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChwYXlsb2FkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGFyZSBjb250ZXh0LlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzaGFyZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2hhcmVDb250ZXh0KHBheWxvYWQ6IFNoYXJlQ29udGV4dFBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBicm9rZXJDbGllbnQgPSBmaW4uSW50ZXJvcC5jb25uZWN0U3luYyhmaW4ubWUuaWRlbnRpdHkudXVpZCwge30pO1xuXHRcdGNvbnN0IGNvbnRleHRHcm91cHMgPSBhd2FpdCBicm9rZXJDbGllbnQuZ2V0Q29udGV4dEdyb3VwcygpO1xuXHRcdGNvbnN0IHRhcmdldENvbnRleHRHcm91cCA9IGNvbnRleHRHcm91cHMuZmluZCgoZ3JvdXApID0+IGdyb3VwLmlkID09PSBwYXlsb2FkLmNvbnRleHRHcm91cCk7XG5cdFx0aWYgKCFpc0VtcHR5KHRhcmdldENvbnRleHRHcm91cCkpIHtcblx0XHRcdGF3YWl0IGJyb2tlckNsaWVudC5qb2luQ29udGV4dEdyb3VwKHRhcmdldENvbnRleHRHcm91cC5pZCk7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBSZWNlaXZlZCBjb250ZXh0IHRvIHNlbmQuIENvbnRleHQgR3JvdXAgJHt0YXJnZXRDb250ZXh0R3JvdXAuaWR9LiBDb250ZXh0OiAke0pTT04uc3RyaW5naWZ5KFxuXHRcdFx0XHRcdHBheWxvYWQuY29udGV4dCxcblx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdDRcblx0XHRcdFx0KX1gXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgYnJva2VyQ2xpZW50LnNldENvbnRleHQocGF5bG9hZC5jb250ZXh0KTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEluaXRPcHRpb25zSW50ZXJvcEhhbmRsZXIgfSBmcm9tIFwiLi9pbml0LW9wdGlvbnNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGluaXRPcHRpb25zOiBuZXcgSW5pdE9wdGlvbnNJbnRlcm9wSGFuZGxlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9