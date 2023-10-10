/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   imageUrlToDataUrl: () => (/* binding */ imageUrlToDataUrl),
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
/**
 * Load an image to a data url containing base64 image data.
 * @param url The url of the image to load.
 * @param dimensions The dimensions to resize the image to.
 * @returns The data url containing base64 data for the image.
 */
async function imageUrlToDataUrl(url, dimensions) {
    return new Promise((resolve) => {
        try {
            const img = document.createElement("img");
            img.addEventListener("load", () => {
                const canvas = document.createElement("canvas");
                canvas.width = dimensions;
                canvas.height = dimensions;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, dimensions, dimensions);
                    resolve(canvas.toDataURL("image/png", 1));
                }
                else {
                    // eslint-disable-next-line unicorn/no-useless-undefined
                    resolve(undefined);
                }
            });
            img.src = url;
        }
        catch { }
    });
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
        this._logger = loggerCreator("FavoriteLocalStorageProvider");
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
            favorites.splice(existingEntryIndex, 1);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMEQ7QUFFMUQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLElBQUksbUVBQTRCLEVBQUU7Q0FDNUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9mYXZvcml0ZS1sb2NhbC1zdG9yYWdlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9mYXZvcml0ZS1sb2NhbC1zdG9yYWdlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBMb2FkIGFuIGltYWdlIHRvIGEgZGF0YSB1cmwgY29udGFpbmluZyBiYXNlNjQgaW1hZ2UgZGF0YS5cbiAqIEBwYXJhbSB1cmwgVGhlIHVybCBvZiB0aGUgaW1hZ2UgdG8gbG9hZC5cbiAqIEBwYXJhbSBkaW1lbnNpb25zIFRoZSBkaW1lbnNpb25zIHRvIHJlc2l6ZSB0aGUgaW1hZ2UgdG8uXG4gKiBAcmV0dXJucyBUaGUgZGF0YSB1cmwgY29udGFpbmluZyBiYXNlNjQgZGF0YSBmb3IgdGhlIGltYWdlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1hZ2VVcmxUb0RhdGFVcmwodXJsOiBzdHJpbmcsIGRpbWVuc2lvbnM6IG51bWJlcik6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+KChyZXNvbHZlKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cblx0XHRcdGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cdFx0XHRcdGNhbnZhcy53aWR0aCA9IGRpbWVuc2lvbnM7XG5cdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSBkaW1lbnNpb25zO1xuXG5cdFx0XHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblx0XHRcdFx0aWYgKGN0eCkge1xuXHRcdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBkaW1lbnNpb25zLCBkaW1lbnNpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIiwgMSkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLXVzZWxlc3MtdW5kZWZpbmVkXG5cdFx0XHRcdFx0cmVzb2x2ZSh1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGltZy5zcmMgPSB1cmw7XG5cdFx0fSBjYXRjaCB7fVxuXHR9KTtcbn1cbiIsImltcG9ydCB0eXBlIHsgRW5kcG9pbnQsIEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEVuZHBvaW50RmF2b3JpdGVFbnRyeSxcblx0RW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3QsXG5cdEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSxcblx0RW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0LFxuXHRFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlLFxuXHRFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCxcblx0RW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3Rcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGZhdm9yaXRlIGxvY2FsIHN0b3JhZ2UgZW5kcG9pbnQgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBGYXZvcml0ZUxvY2FsU3RvcmFnZVByb3ZpZGVyIGltcGxlbWVudHMgRW5kcG9pbnQge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgdG8gdXNlIGZvciBzdG9yaW5nIHRoZSBmYXZvcml0ZXMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfZmF2b3JpdGVzS2V5OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdXAgdGhlIGZhdm9yaXRlIGVuZHBvaW50LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fZmF2b3JpdGVzS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LWZhdm9yaXRlc2A7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjx1bmtub3duPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkZhdm9yaXRlTG9jYWxTdG9yYWdlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhbiBhY3Rpb24gc2VudCB0byB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHByb2Nlc3NlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24oXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb24sXG5cdFx0cmVxdWVzdD86IEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IHwgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Rcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlID09PSBcIm1vZHVsZVwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRpZiAoXCJwYXlsb2FkXCIgaW4gcmVxdWVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0UmVzcG9uc2VTZXRGYXZvcml0ZShyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnJlcXVlc3RSZXNwb25zZVJlbW92ZUZhdm9yaXRlKHJlcXVlc3QpO1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRgVGhpcyBlbmRwb2ludCBtb2R1bGUgb25seSBzdXBwb3J0cyB0aGUgdHlwZSAnbW9kdWxlJyBhbmQgYmVpbmcgcGFzc2VkIGEgcmVxdWVzdC4gVGhlIGZvbGxvd2luZyBlbmRwb2ludCB0eXBlIHdhcyBzcGVjaWZpZWQ6ICR7XG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi50eXBlXG5cdFx0XHR9IGFuZCByZXF1ZXN0IHBhc3NlZDogJHshaXNFbXB0eShyZXF1ZXN0KX1gXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHJlcXVlc3RzIGZvciBnZXR0aW5nIGFsbCBmYXZvcml0ZXMsIGEgbGlzdCBvZiBmYXZvcml0ZXMgb2YgYSBzcGVjaWZpYyB0eXBlIG9yIGEgc2luZ2xlIGZhdm9yaXRlIGJ5IGlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbixcblx0XHRyZXF1ZXN0PzogRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0IHwgRW5kcG9pbnRGYXZvcml0ZUdldFJlcXVlc3Rcblx0KTogUHJvbWlzZTxFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHwgRW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlID09PSBcIm1vZHVsZVwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRpZiAoXCJpZFwiIGluIHJlcXVlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVxdWVzdFJlc3BvbnNlR2V0RmF2b3JpdGUocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0UmVzcG9uc2VGYXZvcml0ZXMocmVxdWVzdCk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdGBUaGlzIGVuZHBvaW50IG1vZHVsZSBvbmx5IHN1cHBvcnRzIHRoZSB0eXBlICdtb2R1bGUnIGFuZCBiZWluZyBwYXNzZWQgYSByZXF1ZXN0LiBUaGUgZm9sbG93aW5nIGVuZHBvaW50IHR5cGUgd2FzIHNwZWNpZmllZDogJHtcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLnR5cGVcblx0XHRcdH0gYW5kIHJlcXVlc3QgcGFzc2VkOiAkeyFpc0VtcHR5KHJlcXVlc3QpfWBcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgZm9yIGxpc3QgcmVxdWVzdC5cblx0ICogQHBhcmFtIHJlcXVlc3QgdGhlIHJlcXVlc3QgZm9yIGZhdm9yaXRlc1xuXHQgKiBAcmV0dXJucyB0aGUgbGlzdCBvZiBmYXZvcml0ZXNcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlRmF2b3JpdGVzKFxuXHRcdHJlcXVlc3Q6IEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdFxuXHQpOiBQcm9taXNlPEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2U+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QuZmF2b3JpdGVUeXBlKSkge1xuXHRcdFx0Y29uc3QgZmlsdGVyZWRFbnRyaWVzID0gZmF2b3JpdGVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnBheWxvYWQudHlwZSA9PT0gcmVxdWVzdC5mYXZvcml0ZVR5cGUpO1xuXHRcdFx0cmV0dXJuIHsgZW50cmllczogZmlsdGVyZWRFbnRyaWVzIH07XG5cdFx0fVxuXHRcdHJldHVybiB7IGVudHJpZXM6IGZhdm9yaXRlcyB9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgZm9yIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlXG5cdCAqIEByZXR1cm5zIHRoZSBmYXZvcml0ZVxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVzcG9uc2VHZXRGYXZvcml0ZShcblx0XHRyZXF1ZXN0OiBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdFxuXHQpOiBQcm9taXNlPEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IHRoaXMuZ2V0RmF2b3JpdGVzKCk7XG5cdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QuaWQpKSB7XG5cdFx0XHRjb25zdCBtYXRjaGVkRW50cnkgPSBmYXZvcml0ZXMuZmluZCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0cmV0dXJuIG1hdGNoZWRFbnRyeTtcblx0XHR9XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCB0aGUgcmVxdWVzdCBmb3IgYSBmYXZvcml0ZVxuXHQgKiBAcmV0dXJucyB0aGUgZmF2b3JpdGVcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlU2V0RmF2b3JpdGUocmVxdWVzdDogRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmICghaXNFbXB0eShyZXF1ZXN0LmlkKSkge1xuXHRcdFx0Y29uc3QgZXhpc3RpbmdFbnRyeUluZGV4ID0gZmF2b3JpdGVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0Y29uc3QgZW50cnlUb1NhdmUgPSB7IG1ldGFEYXRhOiByZXF1ZXN0Lm1ldGFEYXRhLCBwYXlsb2FkOiByZXF1ZXN0LnBheWxvYWQgfTtcblx0XHRcdGlmIChleGlzdGluZ0VudHJ5SW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdGZhdm9yaXRlcy5wdXNoKGVudHJ5VG9TYXZlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZhdm9yaXRlc1tleGlzdGluZ0VudHJ5SW5kZXhdID0gZW50cnlUb1NhdmU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNhdmVGYXZvcml0ZXMoZmF2b3JpdGVzKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlcyB0aGUgcmVxdWVzdCBmb3IgdGhlIGRlbGV0aW9uIG9mIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlIHRvIGJlIGRlbGV0ZWRcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWxcblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlc3BvbnNlUmVtb3ZlRmF2b3JpdGUocmVxdWVzdDogRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSB0aGlzLmdldEZhdm9yaXRlcygpO1xuXHRcdGlmICghaXNFbXB0eShyZXF1ZXN0LmlkKSkge1xuXHRcdFx0Y29uc3QgZXhpc3RpbmdFbnRyeUluZGV4ID0gZmF2b3JpdGVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LnBheWxvYWQuaWQgPT09IHJlcXVlc3QuaWQpO1xuXHRcdFx0aWYgKGV4aXN0aW5nRW50cnlJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZmF2b3JpdGVzLnNwbGljZShleGlzdGluZ0VudHJ5SW5kZXgsIDEpO1xuXHRcdFx0dGhpcy5zYXZlRmF2b3JpdGVzKGZhdm9yaXRlcyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGxpc3Qgb2Ygc2F2ZWQgZmF2b3JpdGVzLlxuXHQgKiBAcmV0dXJucyBUaGUgc2F2ZWQgbGlzdCBvZiBmYXZvcml0ZXNcblx0ICovXG5cdHByaXZhdGUgZ2V0RmF2b3JpdGVzKCk6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdIHtcblx0XHRjb25zdCBmYXZvcml0ZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9mYXZvcml0ZXNLZXkpO1xuXG5cdFx0aWYgKGlzRW1wdHkoZmF2b3JpdGVzKSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZhdm9yaXRlRW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W10gPSBKU09OLnBhcnNlKGZhdm9yaXRlcyk7XG5cdFx0cmV0dXJuIGZhdm9yaXRlRW50cmllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlIHRoZSBmYXZvcml0ZXMuXG5cdCAqIEBwYXJhbSBmYXZvcml0ZXMgdG8gc2F2ZVxuXHQgKi9cblx0cHJpdmF0ZSBzYXZlRmF2b3JpdGVzKGZhdm9yaXRlczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W10pOiB2b2lkIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9mYXZvcml0ZXNLZXksIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlcykpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBGYXZvcml0ZUxvY2FsU3RvcmFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgRmF2b3JpdGVMb2NhbFN0b3JhZ2VQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9