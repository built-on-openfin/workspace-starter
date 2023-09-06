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
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
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


/***/ }),

/***/ "./client/src/modules/endpoint/favorite-local-storage/endpoint.ts":
/*!************************************************************************!*\
  !*** ./client/src/modules/endpoint/favorite-local-storage/endpoint.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FavoriteLocalStorageProvider: () => (/* binding */ FavoriteLocalStorageProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implementation for the favorite local storage endpoint provider.
 */
class FavoriteLocalStorageProvider {
    /**
     * Sets up the favorite endpoint.
     */
    constructor() {
        this._favoritesKey = `${fin.me.identity.uuid}-favorites`;
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._definition = definition;
        this._logger = loggerCreator("FavoriteLocalStorageProvider");
        this._helpers = helpers;
        this._logger.info("Initializing");
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
    }
    /**
     * Handle an action sent to the endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns True if processed.
     */
    async action(endpointDefinition, request) {
        if (endpointDefinition.type === "module" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
            if ("payload" in request) {
                return this.requestResponseSetFavorite(request);
            }
            return this.requestResponseRemoveFavorite(request);
        }
        throw new Error(`This endpoint module only supports the type 'module' and being passed a request. The following endpoint type was specified: ${endpointDefinition.type} and request passed: ${!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)}`);
    }
    /**
     * Handles requests for getting all favorites, a list of favorites of a specific type or a single favorite by id.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        if (endpointDefinition.type === "module" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
            if ("id" in request) {
                return this.requestResponseGetFavorite(request);
            }
            return this.requestResponseFavorites(request);
        }
        throw new Error(`This endpoint module only supports the type 'module' and being passed a request. The following endpoint type was specified: ${endpointDefinition.type} and request passed: ${!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)}`);
    }
    /**
     * Handles the request for list request.
     * @param request the request for favorites
     * @returns the list of favorites
     */
    async requestResponseFavorites(request) {
        const favorites = this.getFavorites();
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.favoriteType)) {
            const filteredEntries = favorites.filter((entry) => entry.payload.type === request.favoriteType);
            return { entries: filteredEntries };
        }
        return { entries: favorites };
    }
    /**
     * Handles the request for a favorite.
     * @param request the request for a favorite
     * @returns the favorite
     */
    async requestResponseGetFavorite(request) {
        const favorites = this.getFavorites();
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.id)) {
            const matchedEntry = favorites.find((entry) => entry.payload.id === request.id);
            return matchedEntry;
        }
        return undefined;
    }
    /**
     * Handles the request for a favorite.
     * @param request the request for a favorite
     * @returns the favorite
     */
    async requestResponseSetFavorite(request) {
        const favorites = this.getFavorites();
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.id)) {
            const existingEntryIndex = favorites.findIndex((entry) => entry.payload.id === request.id);
            const entryToSave = { metaData: request.metaData, payload: request.payload };
            if (existingEntryIndex === -1) {
                favorites.push(entryToSave);
            }
            else {
                favorites[existingEntryIndex] = entryToSave;
            }
            this.saveFavorites(favorites);
            return true;
        }
        return false;
    }
    /**
     * Handles the request for the deletion of a favorite.
     * @param request the request for a favorite to be deleted
     * @returns whether or not the request was successful
     */
    async requestResponseRemoveFavorite(request) {
        const favorites = this.getFavorites();
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.id)) {
            const existingEntryIndex = favorites.findIndex((entry) => entry.payload.id === request.id);
            if (existingEntryIndex === -1) {
                return false;
            }
            delete favorites[existingEntryIndex];
            this.saveFavorites(favorites);
            return true;
        }
        return false;
    }
    /**
     * Return a list of saved favorites.
     * @returns The saved list of favorites
     */
    getFavorites() {
        const favorites = localStorage.getItem(this._favoritesKey);
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(favorites)) {
            return [];
        }
        const favoriteEntries = JSON.parse(favorites);
        return favoriteEntries;
    }
    /**
     * Save the favorites.
     * @param favorites to save
     */
    saveFavorites(favorites) {
        localStorage.setItem(this._favoritesKey, JSON.stringify(favorites));
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
/*!*********************************************************************!*\
  !*** ./client/src/modules/endpoint/favorite-local-storage/index.ts ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoint/favorite-local-storage/endpoint.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.FavoriteLocalStorageProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDBEO0FBRTFEOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLG1FQUE0QixFQUFFO0NBQzVDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvZmF2b3JpdGUtbG9jYWwtc3RvcmFnZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvZmF2b3JpdGUtbG9jYWwtc3RvcmFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVuZHBvaW50LCBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRFbmRwb2ludEZhdm9yaXRlRW50cnksXG5cdEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0LFxuXHRFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UsXG5cdEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdCxcblx0RW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZSxcblx0RW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3QsXG5cdEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBmYXZvcml0ZSBsb2NhbCBzdG9yYWdlIGVuZHBvaW50IHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgRmF2b3JpdGVMb2NhbFN0b3JhZ2VQcm92aWRlciBpbXBsZW1lbnRzIEVuZHBvaW50PHVua25vd24+IHtcblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbiBpbmNsdWRpbmcgc2V0dGluZ3MuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgdG8gdXNlIGZvciBzdG9yaW5nIHRoZSBmYXZvcml0ZXMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfZmF2b3JpdGVzS2V5OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdXAgdGhlIGZhdm9yaXRlIGVuZHBvaW50LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fZmF2b3JpdGVzS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LWZhdm9yaXRlc2A7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkZhdm9yaXRlTG9jYWxTdG9yYWdlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhbiBhY3Rpb24gc2VudCB0byB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHByb2Nlc3NlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24oXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb24sXG5cdFx0cmVxdWVzdD86IEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IHwgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Rcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlID09PSBcIm1vZHVsZVwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRpZiAoXCJwYXlsb2FkXCIgaW4gcmVxdWVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0UmVzcG9uc2VTZXRGYXZvcml0ZShyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnJlcXVlc3RSZXNwb25zZVJlbW92ZUZhdm9yaXRlKHJlcXVlc3QpO1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRgVGhpcyBlbmRwb2ludCBtb2R1bGUgb25seSBzdXBwb3J0cyB0aGUgdHlwZSAnbW9kdWxlJyBhbmQgYmVpbmcgcGFzc2VkIGEgcmVxdWVzdC4gVGhlIGZvbGxvd2luZyBlbmRwb2ludCB0eXBlIHdhcyBzcGVjaWZpZWQ6ICR7XG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi50eXBlXG5cdFx0XHR9IGFuZCByZXF1ZXN0IHBhc3NlZDogJHshaXNFbXB0eShyZXF1ZXN0KX1gXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHJlcXVlc3RzIGZvciBnZXR0aW5nIGFsbCBmYXZvcml0ZXMsIGEgbGlzdCBvZiBmYXZvcml0ZXMgb2YgYSBzcGVjaWZpYyB0eXBlIG9yIGEgc2luZ2xlIGZhdm9yaXRlIGJ5IGlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbixcblx0XHRyZXF1ZXN0PzogRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHwgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Rcblx0KTogUHJvbWlzZTxFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHwgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlID09PSBcIm1vZHVsZVwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRpZiAoXCJpZFwiIGluIHJlcXVlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVxdWVzdFJlc3BvbnNlR2V0RmF2b3JpdGUocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0UmVzcG9uc2VGYXZvcml0ZXMocmVxdWVzdCk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdGBUaGlzIGVuZHBvaW50IG1vZHVsZSBvbmx5IHN1cHBvcnRzIHRoZSB0eXBlICdtb2R1bGUnIGFuZCBiZWluZyBwYXNzZWQgYSByZXF1ZXN0LiBUaGUgZm9sbG93aW5nIGVuZHBvaW50IHR5cGUgd2FzIHNwZWNpZmllZDogJHtcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLnR5cGVcblx0XHRcdH0gYW5kIHJlcXVlc3QgcGFzc2VkOiAkeyFpc0VtcHR5KHJlcXVlc3QpfWBcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgZm9yIGxpc3QgcmVxdWVzdC5cblx0ICogQHBhcmFtIHJlcXVlc3QgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlc1xuXHQgKiBAcmV0dXJucyB0aGUgbGlzdCBvZiBmYXZvcml0ZXNcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlRmF2b3JpdGVzKFxuXHRcdHJlcXVlc3Q6IEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdFxuXHQpOiBQcm9taXNlPEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2U+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QuZmF2b3JpdGVUeXBlKSkge1xuXHRcdFx0Y29uc3QgZmlsdGVyZWRFbnRyaWVzID0gZmF2b3JpdGVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnBheWxvYWQudHlwZSA9PT0gcmVxdWVzdC5mYXZvcml0ZVR5cGUpO1xuXHRcdFx0cmV0dXJuIHsgZW50cmllczogZmlsdGVyZWRFbnRyaWVzIH07XG5cdFx0fVxuXHRcdHJldHVybiB7IGVudHJpZXM6IGZhdm9yaXRlcyB9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgZm9yIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlXG5cdCAqIEByZXR1cm5zIHRoZSBmYXZvcml0ZVxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVzcG9uc2VHZXRGYXZvcml0ZShcblx0XHRyZXF1ZXN0OiBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdFxuXHQpOiBQcm9taXNlPEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IHRoaXMuZ2V0RmF2b3JpdGVzKCk7XG5cdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QuaWQpKSB7XG5cdFx0XHRjb25zdCBtYXRjaGVkRW50cnkgPSBmYXZvcml0ZXMuZmluZCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0cmV0dXJuIG1hdGNoZWRFbnRyeTtcblx0XHR9XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCB0aGUgcmVxdWVzdCBmb3IgYSBmYXZvcml0ZVxuXHQgKiBAcmV0dXJucyB0aGUgZmF2b3JpdGVcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlU2V0RmF2b3JpdGUocmVxdWVzdDogRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmICghaXNFbXB0eShyZXF1ZXN0LmlkKSkge1xuXHRcdFx0Y29uc3QgZXhpc3RpbmdFbnRyeUluZGV4ID0gZmF2b3JpdGVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0Y29uc3QgZW50cnlUb1NhdmUgPSB7IG1ldGFEYXRhOiByZXF1ZXN0Lm1ldGFEYXRhLCBwYXlsb2FkOiByZXF1ZXN0LnBheWxvYWQgfTtcblx0XHRcdGlmIChleGlzdGluZ0VudHJ5SW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdGZhdm9yaXRlcy5wdXNoKGVudHJ5VG9TYXZlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZhdm9yaXRlc1tleGlzdGluZ0VudHJ5SW5kZXhdID0gZW50cnlUb1NhdmU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNhdmVGYXZvcml0ZXMoZmF2b3JpdGVzKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlcyB0aGUgcmVxdWVzdCBmb3IgdGhlIGRlbGV0aW9uIG9mIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlIHRvIGJlIGRlbGV0ZWRcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWxcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlUmVtb3ZlRmF2b3JpdGUocmVxdWVzdDogRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmICghaXNFbXB0eShyZXF1ZXN0LmlkKSkge1xuXHRcdFx0Y29uc3QgZXhpc3RpbmdFbnRyeUluZGV4ID0gZmF2b3JpdGVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0aWYgKGV4aXN0aW5nRW50cnlJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIGZhdm9yaXRlc1tleGlzdGluZ0VudHJ5SW5kZXhdO1xuXHRcdFx0dGhpcy5zYXZlRmF2b3JpdGVzKGZhdm9yaXRlcyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGxpc3Qgb2Ygc2F2ZWQgZmF2b3JpdGVzLlxuXHQgKiBAcmV0dXJucyBUaGUgc2F2ZWQgbGlzdCBvZiBmYXZvcml0ZXNcblx0ICovXG5cdHByaXZhdGUgZ2V0RmF2b3JpdGVzKCk6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdIHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9mYXZvcml0ZXNLZXkpO1xuXG5cdFx0aWYgKGlzRW1wdHkoZmF2b3JpdGVzKSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZhdm9yaXRlRW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W10gPSBKU09OLnBhcnNlKGZhdm9yaXRlcyk7XG5cdFx0cmV0dXJuIGZhdm9yaXRlRW50cmllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlIHRoZSBmYXZvcml0ZXMuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZXMgdG8gc2F2ZVxuXHQgKi9cblx0cHJpdmF0ZSBzYXZlRmF2b3JpdGVzKGZhdm9yaXRlczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W10pOiB2b2lkIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9mYXZvcml0ZXNLZXksIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlcykpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBGYXZvcml0ZUxvY2FsU3RvcmFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgRmF2b3JpdGVMb2NhbFN0b3JhZ2VQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9