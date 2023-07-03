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

/***/ "./client/src/modules/endpoint/local-storage/endpoint.ts":
/*!***************************************************************!*\
  !*** ./client/src/modules/endpoint/local-storage/endpoint.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageEndpoint: () => (/* binding */ LocalStorageEndpoint)
/* harmony export */ });
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _platform_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform-local-storage */ "./client/src/modules/endpoint/local-storage/platform-local-storage.ts");


/**
 * Endpoint for local storage.
 */
class LocalStorageEndpoint {
    /**
     * Create a new instance of LocalStorageEndpoint.
     */
    constructor() {
        this._storage = {};
        this._storage = {};
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._loggerCreator = loggerCreator;
        this._logger = loggerCreator("LocalStorageEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Handle an action sent to the endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param endpointDefinition.dataType The type of the data.
     * @param endpointDefinition.method The method to use.
     * @param request The request to process.
     * @param request.id The id of the storage item.
     * @param request.payload The payload to store.
     * @returns True if processed.
     */
    async action(endpointDefinition, request) {
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
            this._logger?.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
            return false;
        }
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
            return false;
        }
        const { dataType, method } = endpointDefinition.options;
        const localStorage = this.getStorage(dataType);
        if (method === "REMOVE") {
            const id = request.id;
            await localStorage.remove(id);
            return true;
        }
        else if (method === "SET") {
            if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.payload)) {
                this._logger?.warn(`The payload needs to be specified for this action: ${endpointDefinition.id}`);
                return false;
            }
            await localStorage.set(request.id, request.payload);
            return true;
        }
        return false;
    }
    /**
     * Handle a request response on an endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param endpointDefinition.dataType The type of the data.
     * @param endpointDefinition.method The method to use.
     * @param request The request to process.
     * @param request.id The id of the storage item.
     * @param request.query The payload to get.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return null;
        }
        const { dataType, method } = endpointDefinition.options;
        const localStorage = this.getStorage(dataType);
        if (method === "GET") {
            const id = request?.id;
            if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
                return localStorage.getAll();
            }
            return localStorage.get(id);
        }
        return null;
    }
    /**
     * Get the storage for the specified id.
     * @param id The id of the storage to get.
     * @returns The storage for the requested id.
     */
    getStorage(id) {
        let localStorage = this._storage[id];
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(localStorage)) {
            localStorage = new _platform_local_storage__WEBPACK_IMPORTED_MODULE_1__.PlatformLocalStorage(id, id, this._loggerCreator);
            this._storage[id] = localStorage;
        }
        return localStorage;
    }
}


/***/ }),

/***/ "./client/src/modules/endpoint/local-storage/platform-local-storage.ts":
/*!*****************************************************************************!*\
  !*** ./client/src/modules/endpoint/local-storage/platform-local-storage.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformLocalStorage: () => (/* binding */ PlatformLocalStorage)
/* harmony export */ });
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");

/**
 * Implement platform storage using local storage.
 */
class PlatformLocalStorage {
    /**
     * Create a new instance of PlatformLocalStorage.
     * @param storageId The id of the storage.
     * @param storageType The storage tye=pe.
     * @param loggerCreator The creator for the logger.
     */
    constructor(storageId, storageType, loggerCreator) {
        this._storageTypeName = storageType;
        this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
        if (loggerCreator) {
            this._logger = loggerCreator("PlatformLocalStorage");
        }
    }
    /**
     * Get items that are stored.
     * @param id The identity of the stored object
     * @returns The stored type or null if nothing was found.
     */
    async get(id) {
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
            this._logger?.error(`No id was specified for getting a ${this._storageTypeName} entry`);
            return;
        }
        const store = this.getCompleteStore();
        const savedEntry = store[id];
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(savedEntry)) {
            this._logger?.warn(`No ${this._storageTypeName} entry was found for id ${id}`);
            return;
        }
        return savedEntry;
    }
    /**
     * Save an item against storage.
     * @param id The identity of the item to store or update
     * @param entry The entry to store.
     * @returns Nothing.
     */
    async set(id, entry) {
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
            this._logger?.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
        }
        else {
            const store = this.getCompleteStore();
            store[id] = entry;
            this.setCompleteStore(store);
        }
    }
    /**
     * Get all the saved entries.
     * @param query Optional parameter that can be used to filter the result set
     * @returns All available entries.
     */
    async getAll(query) {
        const store = this.getCompleteStore();
        if (Object.keys(store).length === 0) {
            this._logger?.info(`Storage has no ${this._storageTypeName} entries`);
            return {};
        }
        return store;
    }
    /**
     * Delete an entry from storage.
     * @param id The identity of the item to clear
     * @returns Nothing.
     */
    async remove(id) {
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
            this._logger?.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
        }
        else {
            const store = this.getCompleteStore();
            const entry = store[id];
            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(entry)) {
                delete store[id];
                this.setCompleteStore(store);
            }
            else {
                this._logger?.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
            }
        }
    }
    /**
     * Get the complete store.
     * @returns The complete store.
     */
    getCompleteStore() {
        const store = localStorage.getItem(this._storageKey);
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(store)) {
            this._logger?.info(`Storage has no ${this._storageTypeName} entries. Creating store`);
            this.setCompleteStore({});
            return {};
        }
        return JSON.parse(store);
    }
    /**
     * Set the complete store.
     * @param store The store to save.
     */
    setCompleteStore(store) {
        localStorage.setItem(this._storageKey, JSON.stringify(store));
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
/*!************************************************************!*\
  !*** ./client/src/modules/endpoint/local-storage/index.ts ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoint/local-storage/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.LocalStorageEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRztBQUNJLFNBQVMsT0FBTyxDQUFDLEtBQWM7SUFDckMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQzlDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsU0FBUyxDQUFDLEtBQWM7SUFDdkMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsU0FBUyxDQUFDLEtBQWM7SUFDdkMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsV0FBVyxDQUFJLEdBQU07SUFDcEMsZ0RBQWdEO0lBQ2hELE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQ7OztHQUdHO0FBQ0ksU0FBUyxVQUFVO0lBQ3pCLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDbEMsZ0RBQWdEO1FBQ2hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNsQztJQUNELHVHQUF1RztJQUN2Ryw2RUFBNkU7SUFDN0UsOENBQThDO0lBQzlDOzs7O09BSUc7SUFDSCxTQUFTLFlBQVksQ0FBQyxDQUFTO1FBQzlCLHNDQUFzQztRQUN0QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsT0FBTztRQUNOLHNDQUFzQztRQUN0QyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQzlCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxXQUFXLENBQUMsR0FBWTtJQUN2QyxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7UUFDekIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0tBQ25CO1NBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDbkMsT0FBTyxHQUFHLENBQUM7S0FDWDtJQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xIa0Q7QUFDYTtBQUVoRTs7R0FFRztBQUNJLE1BQU0sb0JBQW9CO0lBT2hDOztPQUVHO0lBQ0g7UUFMUSxhQUFRLEdBQWdELEVBQUUsQ0FBQztRQU1sRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDdEIsVUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQ2xCLGtCQUFzRixFQUN0RixPQUEyQztRQUUzQyxJQUFJLHlEQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsMENBQTBDLGtCQUFrQixDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUN2RyxPQUFPLEtBQUssQ0FBQztTQUNiO1FBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNqQixzRUFBc0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQzdGLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDeEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBVSxRQUFRLENBQUMsQ0FBQztRQUV4RCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDeEIsTUFBTSxFQUFFLEdBQVcsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDWjthQUFNLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUM1QixJQUFJLHlEQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxzREFBc0Qsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEcsT0FBTyxLQUFLLENBQUM7YUFDYjtZQUNELE1BQU0sWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FDM0Isa0JBQTJFLEVBQzNFLE9BQXlDO1FBRXpDLElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDakIsbUZBQW1GLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUMxRyxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQVUsUUFBUSxDQUFDLENBQUM7UUFFeEQsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDdkIsSUFBSSx5REFBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM3QjtZQUNELE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxVQUFVLENBQUksRUFBVTtRQUMvQixJQUFJLFlBQVksR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQTRCLENBQUM7UUFDcEYsSUFBSSx5REFBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzFCLFlBQVksR0FBRyxJQUFJLHlFQUFvQixDQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDckIsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FDaklrRDtBQUVuRDs7R0FFRztBQUNJLE1BQU0sb0JBQW9CO0lBT2hDOzs7OztPQUtHO0lBQ0gsWUFBWSxTQUFpQixFQUFFLFdBQW1CLEVBQUUsYUFBNkI7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7UUFDNUYsSUFBSSxhQUFhLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNyRDtJQUNGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFVO1FBQzFCLElBQUkseURBQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLGdCQUFnQixRQUFRLENBQUMsQ0FBQztZQUN4RixPQUFPO1NBQ1A7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsSUFBSSx5REFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQiwyQkFBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvRSxPQUFPO1NBQ1A7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQVUsRUFBRSxLQUFRO1FBQ3BDLElBQUkseURBQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxvQ0FBb0MsSUFBSSxDQUFDLGdCQUFnQix5QkFBeUIsQ0FBQyxDQUFDO1NBQ3hHO2FBQU07WUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV0QyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRWxCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFjO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsZ0JBQWdCLFVBQVUsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQzdCLElBQUkseURBQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLGdCQUFnQixtQkFBbUIsQ0FBQyxDQUFDO1NBQzFGO2FBQU07WUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLHlEQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsc0NBQXNDLElBQUksQ0FBQyxnQkFBZ0IsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pHO1NBQ0Q7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0JBQWdCO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUkseURBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGdCQUFnQiwwQkFBMEIsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBeUIsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0JBQWdCLENBQUMsS0FBMkI7UUFDbkQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Q7Ozs7Ozs7U0MzSEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xrRDtBQUUzQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLElBQUksMkRBQW9CLEVBQUU7Q0FDcEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9sb2NhbC1zdG9yYWdlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9sb2NhbC1zdG9yYWdlL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50L2xvY2FsLXN0b3JhZ2UvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBFbmRwb2ludCwgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbHNcIjtcbmltcG9ydCB7IFBsYXRmb3JtTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vcGxhdGZvcm0tbG9jYWwtc3RvcmFnZVwiO1xuXG4vKipcbiAqIEVuZHBvaW50IGZvciBsb2NhbCBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlRW5kcG9pbnQgaW1wbGVtZW50cyBFbmRwb2ludCB7XG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9sb2dnZXJDcmVhdG9yPzogTG9nZ2VyQ3JlYXRvcjtcblxuXHRwcml2YXRlIF9zdG9yYWdlOiB7IFtrZXk6IHN0cmluZ106IFBsYXRmb3JtU3RvcmFnZTx1bmtub3duPiB9ID0ge307XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBMb2NhbFN0b3JhZ2VFbmRwb2ludC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N0b3JhZ2UgPSB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXJDcmVhdG9yID0gbG9nZ2VyQ3JlYXRvcjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiTG9jYWxTdG9yYWdlRW5kcG9pbnRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhbiBhY3Rpb24gc2VudCB0byB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmRhdGFUeXBlIFRoZSB0eXBlIG9mIHRoZSBkYXRhLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLm1ldGhvZCBUaGUgbWV0aG9kIHRvIHVzZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QuaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIGl0ZW0uXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnBheWxvYWQgVGhlIHBheWxvYWQgdG8gc3RvcmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgcHJvY2Vzc2VkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGFjdGlvbihcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJSRU1PVkVcIiB8IFwiU0VUXCIgfT4sXG5cdFx0cmVxdWVzdD86IHsgaWQ6IHN0cmluZzsgcGF5bG9hZD86IHVua25vd24gfVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdFx0Y29uc3QgbG9jYWxTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlKTtcblxuXHRcdGlmIChtZXRob2QgPT09IFwiUkVNT1ZFXCIpIHtcblx0XHRcdGNvbnN0IGlkOiBzdHJpbmcgPSByZXF1ZXN0LmlkO1xuXHRcdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnJlbW92ZShpZCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJTRVRcIikge1xuXHRcdFx0aWYgKGlzRW1wdHkocmVxdWVzdC5wYXlsb2FkKSkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFRoZSBwYXlsb2FkIG5lZWRzIHRvIGJlIHNwZWNpZmllZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0KHJlcXVlc3QuaWQsIHJlcXVlc3QucGF5bG9hZCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmRhdGFUeXBlIFRoZSB0eXBlIG9mIHRoZSBkYXRhLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLm1ldGhvZCBUaGUgbWV0aG9kIHRvIHVzZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QuaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIGl0ZW0uXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnF1ZXJ5IFRoZSBwYXlsb2FkIHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJHRVRcIiB9Pixcblx0XHRyZXF1ZXN0PzogeyBpZD86IHN0cmluZzsgcXVlcnk/OiBzdHJpbmcgfVxuXHQpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdFx0Y29uc3QgbG9jYWxTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlKTtcblxuXHRcdGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGNvbnN0IGlkID0gcmVxdWVzdD8uaWQ7XG5cdFx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRBbGwoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0KGlkKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzdG9yYWdlIGZvciB0aGUgc3BlY2lmaWVkIGlkLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIHN0b3JhZ2UgZm9yIHRoZSByZXF1ZXN0ZWQgaWQuXG5cdCAqL1xuXHRwcml2YXRlIGdldFN0b3JhZ2U8VD4oaWQ6IHN0cmluZyk6IFBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdFx0bGV0IGxvY2FsU3RvcmFnZTogUGxhdGZvcm1TdG9yYWdlPFQ+ID0gdGhpcy5fc3RvcmFnZVtpZF0gYXMgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD47XG5cdFx0aWYgKGlzRW1wdHkobG9jYWxTdG9yYWdlKSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlID0gbmV3IFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+KGlkLCBpZCwgdGhpcy5fbG9nZ2VyQ3JlYXRvcik7XG5cdFx0XHR0aGlzLl9zdG9yYWdlW2lkXSA9IGxvY2FsU3RvcmFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbHNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgcGxhdGZvcm0gc3RvcmFnZSB1c2luZyBsb2NhbCBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VCA9IHVua25vd24+IGltcGxlbWVudHMgUGxhdGZvcm1TdG9yYWdlPFQ+IHtcblx0cHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZVR5cGVOYW1lOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZUtleTogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFBsYXRmb3JtTG9jYWxTdG9yYWdlLlxuXHQgKiBAcGFyYW0gc3RvcmFnZUlkIFRoZSBpZCBvZiB0aGUgc3RvcmFnZS5cblx0ICogQHBhcmFtIHN0b3JhZ2VUeXBlIFRoZSBzdG9yYWdlIHR5ZT1wZS5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgVGhlIGNyZWF0b3IgZm9yIHRoZSBsb2dnZXIuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzdG9yYWdlSWQ6IHN0cmluZywgc3RvcmFnZVR5cGU6IHN0cmluZywgbG9nZ2VyQ3JlYXRvcj86IExvZ2dlckNyZWF0b3IpIHtcblx0XHR0aGlzLl9zdG9yYWdlVHlwZU5hbWUgPSBzdG9yYWdlVHlwZTtcblx0XHR0aGlzLl9zdG9yYWdlS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWQudG9Mb3dlckNhc2UoKS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKX0tJHtzdG9yYWdlSWR9YDtcblx0XHRpZiAobG9nZ2VyQ3JlYXRvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlBsYXRmb3JtTG9jYWxTdG9yYWdlXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgaXRlbXMgdGhhdCBhcmUgc3RvcmVkLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkZW50aXR5IG9mIHRoZSBzdG9yZWQgb2JqZWN0XG5cdCAqIEByZXR1cm5zIFRoZSBzdG9yZWQgdHlwZSBvciBudWxsIGlmIG5vdGhpbmcgd2FzIGZvdW5kLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBObyBpZCB3YXMgc3BlY2lmaWVkIGZvciBnZXR0aW5nIGEgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5YCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0Y29uc3Qgc2F2ZWRFbnRyeSA9IHN0b3JlW2lkXTtcblx0XHRpZiAoaXNFbXB0eShzYXZlZEVudHJ5KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBObyAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgd2FzIGZvdW5kIGZvciBpZCAke2lkfWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRyZXR1cm4gc2F2ZWRFbnRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlIGFuIGl0ZW0gYWdhaW5zdCBzdG9yYWdlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkZW50aXR5IG9mIHRoZSBpdGVtIHRvIHN0b3JlIG9yIHVwZGF0ZVxuXHQgKiBAcGFyYW0gZW50cnkgVGhlIGVudHJ5IHRvIHN0b3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNldChpZDogc3RyaW5nLCBlbnRyeTogVCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KGlkKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgWW91IG5lZWQgdG8gcHJvdmlkZSBhIGlkIGZvciB0aGUgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5IHlvdSB3aXNoIHRvIHNhdmVgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblxuXHRcdFx0c3RvcmVbaWRdID0gZW50cnk7XG5cblx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZShzdG9yZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhbGwgdGhlIHNhdmVkIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBxdWVyeSBPcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgdGhlIHJlc3VsdCBzZXRcblx0ICogQHJldHVybnMgQWxsIGF2YWlsYWJsZSBlbnRyaWVzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEFsbChxdWVyeT86IHN0cmluZyk6IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBUIH0+IHtcblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGlmIChPYmplY3Qua2V5cyhzdG9yZSkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFN0b3JhZ2UgaGFzIG5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyaWVzYCk7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlbGV0ZSBhbiBlbnRyeSBmcm9tIHN0b3JhZ2UuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpdHkgb2YgdGhlIGl0ZW0gdG8gY2xlYXJcblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZW1vdmUoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KGlkKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgQW4gaWQgdG8gY2xlYXIgdGhlIHNhdmVkICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3YXMgbm90IHByb3ZpZGVkYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0XHRjb25zdCBlbnRyeSA9IHN0b3JlW2lkXTtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KGVudHJ5KSkge1xuXHRcdFx0XHRkZWxldGUgc3RvcmVbaWRdO1xuXHRcdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgWW91IHRyaWVkIHRvIGRlbGV0ZSBhIG5vbi1leGlzdGVudCAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gd2l0aCBpZCAke2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGNvbXBsZXRlIHN0b3JlLlxuXHQgKiBAcmV0dXJucyBUaGUgY29tcGxldGUgc3RvcmUuXG5cdCAqL1xuXHRwcml2YXRlIGdldENvbXBsZXRlU3RvcmUoKTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xuXHRcdGNvbnN0IHN0b3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmFnZUtleSk7XG5cdFx0aWYgKGlzRW1wdHkoc3RvcmUpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFN0b3JhZ2UgaGFzIG5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyaWVzLiBDcmVhdGluZyBzdG9yZWApO1xuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHt9KTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZSkgYXMgeyBba2V5OiBzdHJpbmddOiBUIH07XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjb21wbGV0ZSBzdG9yZS5cblx0ICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBzYXZlLlxuXHQgKi9cblx0cHJpdmF0ZSBzZXRDb21wbGV0ZVN0b3JlKHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IHZvaWQge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3N0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KHN0b3JlKSk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZUVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgTG9jYWxTdG9yYWdlRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==