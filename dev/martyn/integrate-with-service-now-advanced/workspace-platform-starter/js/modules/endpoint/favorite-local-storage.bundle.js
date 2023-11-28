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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUtbG9jYWwtc3RvcmFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0dBSUc7QUFDSSxTQUFTLE9BQU8sQ0FBQyxLQUFjO0lBQ3JDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDM0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFNBQVMsQ0FBQyxLQUFjO0lBQ3ZDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDNUUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFNBQVMsQ0FBQyxLQUFjO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFdBQVcsQ0FBSSxHQUFNO0lBQ3BDLGdEQUFnRDtJQUNoRCxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsVUFBVTtJQUN6QixJQUFJLFlBQVksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkMsZ0RBQWdEO1FBQ2hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsdUdBQXVHO0lBQ3ZHLDZFQUE2RTtJQUM3RSw4Q0FBOEM7SUFDOUM7Ozs7T0FJRztJQUNILFNBQVMsWUFBWSxDQUFDLENBQVM7UUFDOUIsc0NBQXNDO1FBQ3RDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRixPQUFPO1FBQ04sc0NBQXNDO1FBQ3RDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FDOUIsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFdBQVcsQ0FBQyxHQUFZO0lBQ3ZDLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRSxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQixDQUFDO1NBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLGNBQWMsQ0FBQyxPQUFlO0lBQzdDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDdkIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIMEQ7QUFFM0Q7O0dBRUc7QUFDSSxNQUFNLDRCQUE0QjtJQWF4Qzs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUN0QixVQUFxQyxFQUNyQyxhQUE0QixFQUM1QixPQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUNsQixrQkFBc0MsRUFDdEMsT0FBb0U7UUFFcEUsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMseUVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQy9ELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUMxQixPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQ2QsK0hBQ0Msa0JBQWtCLENBQUMsSUFDcEIsd0JBQXdCLENBQUMseUVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FDM0Isa0JBQXNDLEVBQ3RDLE9BQWtFO1FBRWxFLElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLHlFQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUMvRCxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUNkLCtIQUNDLGtCQUFrQixDQUFDLElBQ3BCLHdCQUF3QixDQUFDLHlFQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDM0MsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssS0FBSyxDQUFDLHdCQUF3QixDQUNyQyxPQUFvQztRQUVwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSx5RUFBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQ25DLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssS0FBSyxDQUFDLDBCQUEwQixDQUN2QyxPQUFtQztRQUVuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLHlFQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDMUIsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLE9BQU8sWUFBWSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxPQUFtQztRQUMzRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLHlFQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDMUIsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0YsTUFBTSxXQUFXLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdFLElBQUksa0JBQWtCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQzdDLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxLQUFLLENBQUMsNkJBQTZCLENBQUMsT0FBc0M7UUFDakYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyx5RUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLElBQUksa0JBQWtCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxLQUFLLENBQUM7WUFDZCxDQUFDO1lBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVk7UUFDbkIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0QsSUFBSSx5RUFBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDeEIsT0FBTyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTSxlQUFlLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkUsT0FBTyxlQUFlLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGFBQWEsQ0FBQyxTQUFrQztRQUN2RCxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRDs7Ozs7OztTQ3pNRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDBEO0FBRTFEOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLG1FQUE0QixFQUFFO0NBQzVDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvZmF2b3JpdGUtbG9jYWwtc3RvcmFnZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvZmF2b3JpdGUtbG9jYWwtc3RvcmFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBFbmRwb2ludCwgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0RW5kcG9pbnRGYXZvcml0ZUVudHJ5LFxuXHRFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdCxcblx0RW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlLFxuXHRFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3QsXG5cdEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2UsXG5cdEVuZHBvaW50RmF2b3JpdGVSZW1vdmVSZXF1ZXN0LFxuXHRFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgZmF2b3JpdGUgbG9jYWwgc3RvcmFnZSBlbmRwb2ludCBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZhdm9yaXRlTG9jYWxTdG9yYWdlUHJvdmlkZXIgaW1wbGVtZW50cyBFbmRwb2ludCB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCB0byB1c2UgZm9yIHN0b3JpbmcgdGhlIGZhdm9yaXRlcy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9mYXZvcml0ZXNLZXk6IHN0cmluZztcblxuXHQvKipcblx0ICogU2V0cyB1cCB0aGUgZmF2b3JpdGUgZW5kcG9pbnQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9mYXZvcml0ZXNLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tZmF2b3JpdGVzYDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPHVua25vd24+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRmF2b3JpdGVMb2NhbFN0b3JhZ2VQcm92aWRlclwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZ1wiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDbG9zZWRvd25cIik7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGFuIGFjdGlvbiBzZW50IHRvIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgcHJvY2Vzc2VkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGFjdGlvbihcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbixcblx0XHRyZXF1ZXN0PzogRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QgfCBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdFxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgPT09IFwibW9kdWxlXCIgJiYgIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdGlmIChcInBheWxvYWRcIiBpbiByZXF1ZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJlcXVlc3RSZXNwb25zZVNldEZhdm9yaXRlKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucmVxdWVzdFJlc3BvbnNlUmVtb3ZlRmF2b3JpdGUocmVxdWVzdCk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdGBUaGlzIGVuZHBvaW50IG1vZHVsZSBvbmx5IHN1cHBvcnRzIHRoZSB0eXBlICdtb2R1bGUnIGFuZCBiZWluZyBwYXNzZWQgYSByZXF1ZXN0LiBUaGUgZm9sbG93aW5nIGVuZHBvaW50IHR5cGUgd2FzIHNwZWNpZmllZDogJHtcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLnR5cGVcblx0XHRcdH0gYW5kIHJlcXVlc3QgcGFzc2VkOiAkeyFpc0VtcHR5KHJlcXVlc3QpfWBcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgcmVxdWVzdHMgZm9yIGdldHRpbmcgYWxsIGZhdm9yaXRlcywgYSBsaXN0IG9mIGZhdm9yaXRlcyBvZiBhIHNwZWNpZmljIHR5cGUgb3IgYSBzaW5nbGUgZmF2b3JpdGUgYnkgaWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uLFxuXHRcdHJlcXVlc3Q/OiBFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3QgfCBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdFxuXHQpOiBQcm9taXNlPEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2UgfCBFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgPT09IFwibW9kdWxlXCIgJiYgIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdGlmIChcImlkXCIgaW4gcmVxdWVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0UmVzcG9uc2VHZXRGYXZvcml0ZShyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnJlcXVlc3RSZXNwb25zZUZhdm9yaXRlcyhyZXF1ZXN0KTtcblx0XHR9XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0YFRoaXMgZW5kcG9pbnQgbW9kdWxlIG9ubHkgc3VwcG9ydHMgdGhlIHR5cGUgJ21vZHVsZScgYW5kIGJlaW5nIHBhc3NlZCBhIHJlcXVlc3QuIFRoZSBmb2xsb3dpbmcgZW5kcG9pbnQgdHlwZSB3YXMgc3BlY2lmaWVkOiAke1xuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24udHlwZVxuXHRcdFx0fSBhbmQgcmVxdWVzdCBwYXNzZWQ6ICR7IWlzRW1wdHkocmVxdWVzdCl9YFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlcyB0aGUgcmVxdWVzdCBmb3IgbGlzdCByZXF1ZXN0LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCB0aGUgcmVxdWVzdCBmb3IgZmF2b3JpdGVzXG5cdCAqIEByZXR1cm5zIHRoZSBsaXN0IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVzcG9uc2VGYXZvcml0ZXMoXG5cdFx0cmVxdWVzdDogRW5kcG9pbnRGYXZvcml0ZUxpc3RSZXF1ZXN0XG5cdCk6IFByb21pc2U8RW5kcG9pbnRGYXZvcml0ZUxpc3RSZXNwb25zZT4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IHRoaXMuZ2V0RmF2b3JpdGVzKCk7XG5cdFx0aWYgKGlzRW1wdHkocmVxdWVzdC5mYXZvcml0ZVR5cGUpKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBmYXZvcml0ZXMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkucGF5bG9hZC50eXBlID09PSByZXF1ZXN0LmZhdm9yaXRlVHlwZSk7XG5cdFx0XHRyZXR1cm4geyBlbnRyaWVzOiBmaWx0ZXJlZEVudHJpZXMgfTtcblx0XHR9XG5cdFx0cmV0dXJuIHsgZW50cmllczogZmF2b3JpdGVzIH07XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlcyB0aGUgcmVxdWVzdCBmb3IgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgdGhlIHJlcXVlc3QgZm9yIGEgZmF2b3JpdGVcblx0ICogQHJldHVybnMgdGhlIGZhdm9yaXRlXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHJlcXVlc3RSZXNwb25zZUdldEZhdm9yaXRlKFxuXHRcdHJlcXVlc3Q6IEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0XG5cdCk6IFByb21pc2U8RW5kcG9pbnRGYXZvcml0ZUdldFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG5cdFx0Y29uc3QgZmF2b3JpdGVzID0gdGhpcy5nZXRGYXZvcml0ZXMoKTtcblx0XHRpZiAoIWlzRW1wdHkocmVxdWVzdC5pZCkpIHtcblx0XHRcdGNvbnN0IG1hdGNoZWRFbnRyeSA9IGZhdm9yaXRlcy5maW5kKChlbnRyeSkgPT4gZW50cnkucGF5bG9hZC5pZCA9PT0gcmVxdWVzdC5pZCk7XG5cdFx0XHRyZXR1cm4gbWF0Y2hlZEVudHJ5O1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgZm9yIGEgZmF2b3JpdGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IHRoZSByZXF1ZXN0IGZvciBhIGZhdm9yaXRlXG5cdCAqIEByZXR1cm5zIHRoZSBmYXZvcml0ZVxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVzcG9uc2VTZXRGYXZvcml0ZShyZXF1ZXN0OiBFbmRwb2ludEZhdm9yaXRlU2V0UmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IHRoaXMuZ2V0RmF2b3JpdGVzKCk7XG5cdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QuaWQpKSB7XG5cdFx0XHRjb25zdCBleGlzdGluZ0VudHJ5SW5kZXggPSBmYXZvcml0ZXMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkucGF5bG9hZC5pZCA9PT0gcmVxdWVzdC5pZCk7XG5cdFx0XHRjb25zdCBlbnRyeVRvU2F2ZSA9IHsgbWV0YURhdGE6IHJlcXVlc3QubWV0YURhdGEsIHBheWxvYWQ6IHJlcXVlc3QucGF5bG9hZCB9O1xuXHRcdFx0aWYgKGV4aXN0aW5nRW50cnlJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0ZmF2b3JpdGVzLnB1c2goZW50cnlUb1NhdmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZmF2b3JpdGVzW2V4aXN0aW5nRW50cnlJbmRleF0gPSBlbnRyeVRvU2F2ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2F2ZUZhdm9yaXRlcyhmYXZvcml0ZXMpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSByZXF1ZXN0IGZvciB0aGUgZGVsZXRpb24gb2YgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgdGhlIHJlcXVlc3QgZm9yIGEgZmF2b3JpdGUgdG8gYmUgZGVsZXRlZFxuXHQgKiBAcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bFxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVzcG9uc2VSZW1vdmVGYXZvcml0ZShyZXF1ZXN0OiBFbmRwb2ludEZhdm9yaXRlUmVtb3ZlUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IHRoaXMuZ2V0RmF2b3JpdGVzKCk7XG5cdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QuaWQpKSB7XG5cdFx0XHRjb25zdCBleGlzdGluZ0VudHJ5SW5kZXggPSBmYXZvcml0ZXMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkucGF5bG9hZC5pZCA9PT0gcmVxdWVzdC5pZCk7XG5cdFx0XHRpZiAoZXhpc3RpbmdFbnRyeUluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRmYXZvcml0ZXMuc3BsaWNlKGV4aXN0aW5nRW50cnlJbmRleCwgMSk7XG5cdFx0XHR0aGlzLnNhdmVGYXZvcml0ZXMoZmF2b3JpdGVzKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIGEgbGlzdCBvZiBzYXZlZCBmYXZvcml0ZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBzYXZlZCBsaXN0IG9mIGZhdm9yaXRlc1xuXHQgKi9cblx0cHJpdmF0ZSBnZXRGYXZvcml0ZXMoKTogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W10ge1xuXHRcdGNvbnN0IGZhdm9yaXRlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX2Zhdm9yaXRlc0tleSk7XG5cblx0XHRpZiAoaXNFbXB0eShmYXZvcml0ZXMpKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmF2b3JpdGVFbnRyaWVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXSA9IEpTT04ucGFyc2UoZmF2b3JpdGVzKTtcblx0XHRyZXR1cm4gZmF2b3JpdGVFbnRyaWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmUgdGhlIGZhdm9yaXRlcy5cblx0ICogQHBhcmFtIGZhdm9yaXRlcyB0byBzYXZlXG5cdCAqL1xuXHRwcml2YXRlIHNhdmVGYXZvcml0ZXMoZmF2b3JpdGVzOiBFbmRwb2ludEZhdm9yaXRlRW50cnlbXSk6IHZvaWQge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2Zhdm9yaXRlc0tleSwgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVzKSk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEZhdm9yaXRlTG9jYWxTdG9yYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0ZW5kcG9pbnQ6IG5ldyBGYXZvcml0ZUxvY2FsU3RvcmFnZVByb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=