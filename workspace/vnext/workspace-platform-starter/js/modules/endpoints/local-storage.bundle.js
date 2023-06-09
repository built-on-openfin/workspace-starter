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
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    return value !== undefined && value !== null && typeof value === "object";
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
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
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
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

/***/ "./client/src/modules/endpoints/local-storage/endpoint.ts":
/*!****************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/endpoint.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageEndpoint: () => (/* binding */ LocalStorageEndpoint)
/* harmony export */ });
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _platform_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform-local-storage */ "./client/src/modules/endpoints/local-storage/platform-local-storage.ts");


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

/***/ "./client/src/modules/endpoints/local-storage/platform-local-storage.ts":
/*!******************************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/platform-local-storage.ts ***!
  \******************************************************************************/
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
/*!*************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/index.ts ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/local-storage/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.LocalStorageEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSyxnQkFBZ0IsQ0FBQyxLQUEyQjtRQUNuRCxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRDs7Ozs7OztTQzNIRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTGtEO0FBRTNDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxRQUFRLEVBQUUsSUFBSSwyREFBb0IsRUFBRTtDQUNwQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9wbGF0Zm9ybS1sb2NhbC1zdG9yYWdlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVuZHBvaW50LCBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsc1wiO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9wbGF0Zm9ybS1sb2NhbC1zdG9yYWdlXCI7XG5cbi8qKlxuICogRW5kcG9pbnQgZm9yIGxvY2FsIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX2xvZ2dlckNyZWF0b3I/OiBMb2dnZXJDcmVhdG9yO1xuXG5cdHByaXZhdGUgX3N0b3JhZ2U6IHsgW2tleTogc3RyaW5nXTogUGxhdGZvcm1TdG9yYWdlPHVua25vd24+IH0gPSB7fTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIExvY2FsU3RvcmFnZUVuZHBvaW50LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fc3RvcmFnZSA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlckNyZWF0b3IgPSBsb2dnZXJDcmVhdG9yO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGFuIGFjdGlvbiBzZW50IHRvIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uZGF0YVR5cGUgVGhlIHR5cGUgb2YgdGhlIGRhdGEuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubWV0aG9kIFRoZSBtZXRob2QgdG8gdXNlLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcGFyYW0gcmVxdWVzdC5pZCBUaGUgaWQgb2YgdGhlIHN0b3JhZ2UgaXRlbS5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzdG9yZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBwcm9jZXNzZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHsgZGF0YVR5cGU6IHN0cmluZzsgbWV0aG9kOiBcIlJFTU9WRVwiIHwgXCJTRVRcIiB9Pixcblx0XHRyZXF1ZXN0PzogeyBpZDogc3RyaW5nOyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gcGVyZm9ybSBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeyBkYXRhVHlwZSwgbWV0aG9kIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0XHRjb25zdCBsb2NhbFN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2U8dW5rbm93bj4oZGF0YVR5cGUgYXMgc3RyaW5nKTtcblxuXHRcdGlmIChtZXRob2QgPT09IFwiUkVNT1ZFXCIpIHtcblx0XHRcdGNvbnN0IGlkOiBzdHJpbmcgPSByZXF1ZXN0LmlkO1xuXHRcdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnJlbW92ZShpZCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJTRVRcIikge1xuXHRcdFx0aWYgKGlzRW1wdHkocmVxdWVzdC5wYXlsb2FkKSkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFRoZSBwYXlsb2FkIG5lZWRzIHRvIGJlIHNwZWNpZmllZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0KHJlcXVlc3QuaWQsIHJlcXVlc3QucGF5bG9hZCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmRhdGFUeXBlIFRoZSB0eXBlIG9mIHRoZSBkYXRhLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLm1ldGhvZCBUaGUgbWV0aG9kIHRvIHVzZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QuaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIGl0ZW0uXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnF1ZXJ5IFRoZSBwYXlsb2FkIHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJHRVRcIiB9Pixcblx0XHRyZXF1ZXN0PzogeyBpZD86IHN0cmluZzsgcXVlcnk/OiBzdHJpbmcgfVxuXHQpOiBQcm9taXNlPHVua25vd24gfCBudWxsPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCB7IGRhdGFUeXBlLCBtZXRob2QgfSA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXHRcdGNvbnN0IGxvY2FsU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZTx1bmtub3duPihkYXRhVHlwZSBhcyBzdHJpbmcpO1xuXG5cdFx0aWYgKG1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdFx0Y29uc3QgaWQgPSByZXF1ZXN0Py5pZDtcblx0XHRcdGlmIChpc0VtcHR5KGlkKSkge1xuXHRcdFx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEFsbCgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXQoaWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHN0b3JhZ2UgZm9yIHRoZSBzcGVjaWZpZWQgaWQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHN0b3JhZ2UgdG8gZ2V0LlxuXHQgKiBAcmV0dXJucyBUaGUgc3RvcmFnZSBmb3IgdGhlIHJlcXVlc3RlZCBpZC5cblx0ICovXG5cdHByaXZhdGUgZ2V0U3RvcmFnZTxUPihpZDogc3RyaW5nKTogUGxhdGZvcm1TdG9yYWdlPFQ+IHtcblx0XHRsZXQgbG9jYWxTdG9yYWdlOiBQbGF0Zm9ybVN0b3JhZ2U8VD4gPSB0aGlzLl9zdG9yYWdlW2lkXSBhcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUPjtcblx0XHRpZiAoaXNFbXB0eShsb2NhbFN0b3JhZ2UpKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UgPSBuZXcgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD4oaWQsIGlkLCB0aGlzLl9sb2dnZXJDcmVhdG9yKTtcblx0XHRcdHRoaXMuX3N0b3JhZ2VbaWRdID0gbG9jYWxTdG9yYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCBwbGF0Zm9ybSBzdG9yYWdlIHVzaW5nIGxvY2FsIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUID0gdW5rbm93bj4gaW1wbGVtZW50cyBQbGF0Zm9ybVN0b3JhZ2U8VD4ge1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlVHlwZU5hbWU6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlS2V5OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgUGxhdGZvcm1Mb2NhbFN0b3JhZ2UuXG5cdCAqIEBwYXJhbSBzdG9yYWdlSWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlLlxuXHQgKiBAcGFyYW0gc3RvcmFnZVR5cGUgVGhlIHN0b3JhZ2UgdHllPXBlLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBUaGUgY3JlYXRvciBmb3IgdGhlIGxvZ2dlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHN0b3JhZ2VJZDogc3RyaW5nLCBzdG9yYWdlVHlwZTogc3RyaW5nLCBsb2dnZXJDcmVhdG9yPzogTG9nZ2VyQ3JlYXRvcikge1xuXHRcdHRoaXMuX3N0b3JhZ2VUeXBlTmFtZSA9IHN0b3JhZ2VUeXBlO1xuXHRcdHRoaXMuX3N0b3JhZ2VLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpfS0ke3N0b3JhZ2VJZH1gO1xuXHRcdGlmIChsb2dnZXJDcmVhdG9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGxhdGZvcm1Mb2NhbFN0b3JhZ2VcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBpdGVtcyB0aGF0IGFyZSBzdG9yZWQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpdHkgb2YgdGhlIHN0b3JlZCBvYmplY3Rcblx0ICogQHJldHVybnMgVGhlIHN0b3JlZCB0eXBlIG9yIG51bGwgaWYgbm90aGluZyB3YXMgZm91bmQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYE5vIGlkIHdhcyBzcGVjaWZpZWQgZm9yIGdldHRpbmcgYSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnlgKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRjb25zdCBzYXZlZEVudHJ5ID0gc3RvcmVbaWRdO1xuXHRcdGlmIChpc0VtcHR5KHNhdmVkRW50cnkpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYE5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyeSB3YXMgZm91bmQgZm9yIGlkICR7aWR9YCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHJldHVybiBzYXZlZEVudHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmUgYW4gaXRlbSBhZ2FpbnN0IHN0b3JhZ2UuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpdHkgb2YgdGhlIGl0ZW0gdG8gc3RvcmUgb3IgdXBkYXRlXG5cdCAqIEBwYXJhbSBlbnRyeSBUaGUgZW50cnkgdG8gc3RvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2V0KGlkOiBzdHJpbmcsIGVudHJ5OiBUKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBZb3UgbmVlZCB0byBwcm92aWRlIGEgaWQgZm9yIHRoZSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgeW91IHdpc2ggdG8gc2F2ZWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXG5cdFx0XHRzdG9yZVtpZF0gPSBlbnRyeTtcblxuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHN0b3JlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFsbCB0aGUgc2F2ZWQgZW50cmllcy5cblx0ICogQHBhcmFtIHF1ZXJ5IE9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzdWx0IHNldFxuXHQgKiBAcmV0dXJucyBBbGwgYXZhaWxhYmxlIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0QWxsKHF1ZXJ5Pzogc3RyaW5nKTogUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IFQgfT4ge1xuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXNgKTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH1cblxuXHQvKipcblx0ICogRGVsZXRlIGFuIGVudHJ5IGZyb20gc3RvcmFnZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZGVudGl0eSBvZiB0aGUgaXRlbSB0byBjbGVhclxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlbW92ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoIWlzRW1wdHkoZW50cnkpKSB7XG5cdFx0XHRcdGRlbGV0ZSBzdG9yZVtpZF07XG5cdFx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZShzdG9yZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBZb3UgdHJpZWQgdG8gZGVsZXRlIGEgbm9uLWV4aXN0ZW50ICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3aXRoIGlkICR7aWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgY29tcGxldGUgc3RvcmUuXG5cdCAqIEByZXR1cm5zIFRoZSBjb21wbGV0ZSBzdG9yZS5cblx0ICovXG5cdHByaXZhdGUgZ2V0Q29tcGxldGVTdG9yZSgpOiB7IFtrZXk6IHN0cmluZ106IFQgfSB7XG5cdFx0Y29uc3Qgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5KTtcblx0XHRpZiAoaXNFbXB0eShzdG9yZSkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXMuIENyZWF0aW5nIHN0b3JlYCk7XG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoe30pO1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnBhcnNlKHN0b3JlKSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNvbXBsZXRlIHN0b3JlLlxuXHQgKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIHNhdmUuXG5cdCAqL1xuXHRwcml2YXRlIHNldENvbXBsZXRlU3RvcmUoc3RvcmU6IHsgW2tleTogc3RyaW5nXTogVCB9KTogdm9pZCB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmUpKTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlRW5kcG9pbnQgfSBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0ZW5kcG9pbnQ6IG5ldyBMb2NhbFN0b3JhZ2VFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9