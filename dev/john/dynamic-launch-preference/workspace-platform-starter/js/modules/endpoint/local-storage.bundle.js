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

/***/ "./client/src/modules/endpoint/local-storage/endpoint.ts":
/*!***************************************************************!*\
  !*** ./client/src/modules/endpoint/local-storage/endpoint.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageEndpoint: () => (/* binding */ LocalStorageEndpoint)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
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
     * @param request.platform The platform storing the item.
     * @param request.id The id of the storage item.
     * @param request.metaData The metadata associated with the payload to store.
     * @param request.payload The payload to store.
     * @returns True if processed.
     */
    async action(endpointDefinition, request) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
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
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.metaData)) {
                this._logger?.warn(`The metaData needs to be specified for this action: ${endpointDefinition.id}`);
                return false;
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request.payload)) {
                this._logger?.warn(`The payload needs to be specified for this action: ${endpointDefinition.id}`);
                return false;
            }
            await localStorage.set(request.id, {
                metaData: request.metaData,
                payload: request.payload
            });
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
     * @param request.platform The platform requesting the item.
     * @param request.id The id of the storage item.
     * @param request.query The payload to get.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return;
        }
        const { dataType, method } = endpointDefinition.options;
        const localStorage = this.getStorage(dataType);
        if (method === "GET") {
            const id = request?.id;
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
                return localStorage.getAll();
            }
            return localStorage.get(id);
        }
    }
    /**
     * Get the storage for the specified id.
     * @param id The id of the storage to get.
     * @returns The storage for the requested id.
     */
    getStorage(id) {
        let localStorage = this._storage[id];
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(localStorage)) {
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
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

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
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
            this._logger?.error(`No id was specified for getting a ${this._storageTypeName} entry`);
            return;
        }
        const store = this.getCompleteStore();
        return store[id];
    }
    /**
     * Save an item against storage.
     * @param id The identity of the item to store or update
     * @param entry The entry to store.
     * @returns Nothing.
     */
    async set(id, entry) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
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
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
            this._logger?.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
        }
        else {
            const store = this.getCompleteStore();
            const entry = store[id];
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(entry)) {
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
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(store)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMa0Q7QUFFM0MsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLDJEQUFvQixFQUFFO0NBQ3BDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvbG9jYWwtc3RvcmFnZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvbG9jYWwtc3RvcmFnZS9wbGF0Zm9ybS1sb2NhbC1zdG9yYWdlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9sb2NhbC1zdG9yYWdlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBBIHdheSBvZiBzcGVjaWZ5IHRoZSBydWxlcyBhcm91bmQgdGhlIHZhbGlkYXRpb24uXG4gKiBET01BSU4gbWVhbnMgdGhhdCB0aGUgdXJsIG11c3QgY29tZSBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAqIFBBR0UgbWVhbnMgdGhhdCB0aGUgdXJscyBtdXN0IG1hdGNoIHRoZSBzYW1lIG9yaWdpbiBhbmQgcGF0aC5cbiAqIEFOWSBtZWFucyB5b3UgYXJlIGFsbG93ZWQgdG8gcmVwbGFjZSBvbmUgdXJsIHdpdGggYW5vdGhlciB3aXRob3V0IGNvbnN0cmFpbi5cbiAqIE5PTkUgbWVhbnMgeW91IHdhbnQgdG8gZW5zdXJlIHRoYXQgdGhlIHVybCBpcyBub3QgY2hhbmdlZC5cbiAqL1xuZXhwb3J0IHR5cGUgVmFsaWRVUkxDb25zdHJhaW50ID0gXCJVUkxfRE9NQUlOXCIgfCBcIlVSTF9QQUdFXCIgfCBcIlVSTF9BTllcIiB8IFwiVVJMX05PTkVcIjtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIHN1Z2dlc3RlZCB1cmwgdG8gc2VlIGlmIGl0IGNhbiByZXBsYWNlIHRoZSBzb3VyY2UgdXJsLlxuICogQHBhcmFtIHNvdXJjZVVybCB0aGUgb3JpZ2luYWwgdXJsIHRvIGNvbXBhcmUgYWdhaW5zdC5cbiAqIEBwYXJhbSBzdWdnZXN0ZWRVcmwgdGhlIHN1Z2dlc3RlZCB1cmwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICogQHBhcmFtIGNvbnN0cmFpbnQgdGhlIHJ1bGVzIHRvIGFwcGx5IGFnYWluc3QgaXQuXG4gKiBAcmV0dXJucyB3aGV0aGVyIGl0IGlzIG9rIHRvIHJlcGxhY2UgdGhlIHNvdXJjZVVybCB3aXRoIHRoZSBzdWdnZXN0ZWRVcmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRVcmwoXG5cdHNvdXJjZVVybDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuXHRzdWdnZXN0ZWRVcmw6IHN0cmluZyxcblx0Y29uc3RyYWludDogVmFsaWRVUkxDb25zdHJhaW50W10gfCB1bmRlZmluZWRcbik6IGJvb2xlYW4ge1xuXHRpZiAoaXNFbXB0eShzdWdnZXN0ZWRVcmwpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICghQXJyYXkuaXNBcnJheShjb25zdHJhaW50KSB8fCBjb25zdHJhaW50Lmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX05PTkVcIikpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfQU5ZXCIpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGlzRW1wdHkoc291cmNlVXJsKSkge1xuXHRcdC8vIGlmIHdlIGFyZSBhYm91dCB0byBkbyBhIGRvbWFpbiByZWxhdGVkIGNoZWNrIHRoZW4gd2UgbmVlZCBhIHNvdXJjZSB1cmxcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgdmFsaWRhdGVkU291cmNlVXJsID0gbmV3IFVSTChzb3VyY2VVcmwpO1xuXHRjb25zdCB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwgPSBuZXcgVVJMKHN1Z2dlc3RlZFVybCk7XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfUEFHRVwiKSkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQodmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiArIHZhbGlkYXRlZFNvdXJjZVVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKSA9PT1cblx0XHRcdCh2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwub3JpZ2luICsgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpXG5cdFx0KTtcblx0fVxuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0RPTUFJTlwiKSkge1xuXHRcdHJldHVybiB2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luID09PSB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwub3JpZ2luO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBFbmRwb2ludCwgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGEgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3BsYXRmb3JtLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2VcIjtcblxuLyoqXG4gKiBFbmRwb2ludCBmb3IgbG9jYWwgc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGNyZWF0b3IgdG8gYWxsb3cgcGxhdGZvcm0gc3RvcmFnZSB0byBwZXJmb3JtIHRoZWlyIG93biBsb2dnaW5nLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlckNyZWF0b3I/OiBMb2dnZXJDcmVhdG9yO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3RvcmFnZSBmb3IgbXVsdGlwbGUgdHlwZXMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc3RvcmFnZTogeyBba2V5OiBzdHJpbmddOiBQbGF0Zm9ybVN0b3JhZ2U8dW5rbm93bj4gfTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIExvY2FsU3RvcmFnZUVuZHBvaW50LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fc3RvcmFnZSA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlckNyZWF0b3IgPSBsb2dnZXJDcmVhdG9yO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGFuIGFjdGlvbiBzZW50IHRvIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uZGF0YVR5cGUgVGhlIHR5cGUgb2YgdGhlIGRhdGEuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubWV0aG9kIFRoZSBtZXRob2QgdG8gdXNlLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcGFyYW0gcmVxdWVzdC5wbGF0Zm9ybSBUaGUgcGxhdGZvcm0gc3RvcmluZyB0aGUgaXRlbS5cblx0ICogQHBhcmFtIHJlcXVlc3QuaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIGl0ZW0uXG5cdCAqIEBwYXJhbSByZXF1ZXN0Lm1ldGFEYXRhIFRoZSBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIHBheWxvYWQgdG8gc3RvcmUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnBheWxvYWQgVGhlIHBheWxvYWQgdG8gc3RvcmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgcHJvY2Vzc2VkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGFjdGlvbihcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJSRU1PVkVcIiB8IFwiU0VUXCIgfT4sXG5cdFx0cmVxdWVzdD86IHsgcGxhdGZvcm06IHN0cmluZzsgaWQ6IHN0cmluZzsgbWV0YURhdGE/OiBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YTsgcGF5bG9hZD86IHVua25vd24gfVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdFx0Y29uc3QgbG9jYWxTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlPHsgbWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhOyBwYXlsb2FkOiB1bmtub3duIH0+KGRhdGFUeXBlKTtcblxuXHRcdGlmIChtZXRob2QgPT09IFwiUkVNT1ZFXCIpIHtcblx0XHRcdGNvbnN0IGlkOiBzdHJpbmcgPSByZXF1ZXN0LmlkO1xuXHRcdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnJlbW92ZShpZCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJTRVRcIikge1xuXHRcdFx0aWYgKGlzRW1wdHkocmVxdWVzdC5tZXRhRGF0YSkpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBUaGUgbWV0YURhdGEgbmVlZHMgdG8gYmUgc3BlY2lmaWVkIGZvciB0aGlzIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmIChpc0VtcHR5KHJlcXVlc3QucGF5bG9hZCkpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBUaGUgcGF5bG9hZCBuZWVkcyB0byBiZSBzcGVjaWZpZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnNldChyZXF1ZXN0LmlkLCB7XG5cdFx0XHRcdG1ldGFEYXRhOiByZXF1ZXN0Lm1ldGFEYXRhLFxuXHRcdFx0XHRwYXlsb2FkOiByZXF1ZXN0LnBheWxvYWRcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5kYXRhVHlwZSBUaGUgdHlwZSBvZiB0aGUgZGF0YS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5tZXRob2QgVGhlIG1ldGhvZCB0byB1c2UuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnBsYXRmb3JtIFRoZSBwbGF0Zm9ybSByZXF1ZXN0aW5nIHRoZSBpdGVtLlxuXHQgKiBAcGFyYW0gcmVxdWVzdC5pZCBUaGUgaWQgb2YgdGhlIHN0b3JhZ2UgaXRlbS5cblx0ICogQHBhcmFtIHJlcXVlc3QucXVlcnkgVGhlIHBheWxvYWQgdG8gZ2V0LlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHsgZGF0YVR5cGU6IHN0cmluZzsgbWV0aG9kOiBcIkdFVFwiIH0+LFxuXHRcdHJlcXVlc3Q/OiB7IHBsYXRmb3JtOiBzdHJpbmc7IGlkPzogc3RyaW5nOyBxdWVyeT86IHN0cmluZyB9XG5cdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdFx0Y29uc3QgbG9jYWxTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlPHsgbWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhOyBwYXlsb2FkOiB1bmtub3duIH0+KGRhdGFUeXBlKTtcblxuXHRcdGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGNvbnN0IGlkID0gcmVxdWVzdD8uaWQ7XG5cdFx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRBbGwoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0KGlkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzdG9yYWdlIGZvciB0aGUgc3BlY2lmaWVkIGlkLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlIHRvIGdldC5cblx0ICogQHJldHVybnMgVGhlIHN0b3JhZ2UgZm9yIHRoZSByZXF1ZXN0ZWQgaWQuXG5cdCAqL1xuXHRwcml2YXRlIGdldFN0b3JhZ2U8VD4oaWQ6IHN0cmluZyk6IFBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdFx0bGV0IGxvY2FsU3RvcmFnZTogUGxhdGZvcm1TdG9yYWdlPFQ+ID0gdGhpcy5fc3RvcmFnZVtpZF0gYXMgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD47XG5cdFx0aWYgKGlzRW1wdHkobG9jYWxTdG9yYWdlKSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlID0gbmV3IFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+KGlkLCBpZCwgdGhpcy5fbG9nZ2VyQ3JlYXRvcik7XG5cdFx0XHR0aGlzLl9zdG9yYWdlW2lkXSA9IGxvY2FsU3RvcmFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCBwbGF0Zm9ybSBzdG9yYWdlIHVzaW5nIGxvY2FsIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUID0gdW5rbm93bj4gaW1wbGVtZW50cyBQbGF0Zm9ybVN0b3JhZ2U8VD4ge1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlVHlwZU5hbWU6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlS2V5OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgUGxhdGZvcm1Mb2NhbFN0b3JhZ2UuXG5cdCAqIEBwYXJhbSBzdG9yYWdlSWQgVGhlIGlkIG9mIHRoZSBzdG9yYWdlLlxuXHQgKiBAcGFyYW0gc3RvcmFnZVR5cGUgVGhlIHN0b3JhZ2UgdHllPXBlLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBUaGUgY3JlYXRvciBmb3IgdGhlIGxvZ2dlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHN0b3JhZ2VJZDogc3RyaW5nLCBzdG9yYWdlVHlwZTogc3RyaW5nLCBsb2dnZXJDcmVhdG9yPzogTG9nZ2VyQ3JlYXRvcikge1xuXHRcdHRoaXMuX3N0b3JhZ2VUeXBlTmFtZSA9IHN0b3JhZ2VUeXBlO1xuXHRcdHRoaXMuX3N0b3JhZ2VLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpfS0ke3N0b3JhZ2VJZH1gO1xuXHRcdGlmIChsb2dnZXJDcmVhdG9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGxhdGZvcm1Mb2NhbFN0b3JhZ2VcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBpdGVtcyB0aGF0IGFyZSBzdG9yZWQuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpdHkgb2YgdGhlIHN0b3JlZCBvYmplY3Rcblx0ICogQHJldHVybnMgVGhlIHN0b3JlZCB0eXBlIG9yIG51bGwgaWYgbm90aGluZyB3YXMgZm91bmQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYE5vIGlkIHdhcyBzcGVjaWZpZWQgZm9yIGdldHRpbmcgYSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnlgKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRyZXR1cm4gc3RvcmVbaWRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmUgYW4gaXRlbSBhZ2FpbnN0IHN0b3JhZ2UuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpdHkgb2YgdGhlIGl0ZW0gdG8gc3RvcmUgb3IgdXBkYXRlXG5cdCAqIEBwYXJhbSBlbnRyeSBUaGUgZW50cnkgdG8gc3RvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2V0KGlkOiBzdHJpbmcsIGVudHJ5OiBUKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBZb3UgbmVlZCB0byBwcm92aWRlIGEgaWQgZm9yIHRoZSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgeW91IHdpc2ggdG8gc2F2ZWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXG5cdFx0XHRzdG9yZVtpZF0gPSBlbnRyeTtcblxuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHN0b3JlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFsbCB0aGUgc2F2ZWQgZW50cmllcy5cblx0ICogQHBhcmFtIHF1ZXJ5IE9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbHRlciB0aGUgcmVzdWx0IHNldFxuXHQgKiBAcmV0dXJucyBBbGwgYXZhaWxhYmxlIGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0QWxsKHF1ZXJ5Pzogc3RyaW5nKTogUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IFQgfT4ge1xuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXNgKTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH1cblxuXHQvKipcblx0ICogRGVsZXRlIGFuIGVudHJ5IGZyb20gc3RvcmFnZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZGVudGl0eSBvZiB0aGUgaXRlbSB0byBjbGVhclxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlbW92ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoIWlzRW1wdHkoZW50cnkpKSB7XG5cdFx0XHRcdGRlbGV0ZSBzdG9yZVtpZF07XG5cdFx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZShzdG9yZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBZb3UgdHJpZWQgdG8gZGVsZXRlIGEgbm9uLWV4aXN0ZW50ICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3aXRoIGlkICR7aWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgY29tcGxldGUgc3RvcmUuXG5cdCAqIEByZXR1cm5zIFRoZSBjb21wbGV0ZSBzdG9yZS5cblx0ICovXG5cdHByaXZhdGUgZ2V0Q29tcGxldGVTdG9yZSgpOiB7IFtrZXk6IHN0cmluZ106IFQgfSB7XG5cdFx0Y29uc3Qgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5KTtcblx0XHRpZiAoaXNFbXB0eShzdG9yZSkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXMuIENyZWF0aW5nIHN0b3JlYCk7XG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoe30pO1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnBhcnNlKHN0b3JlKSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNvbXBsZXRlIHN0b3JlLlxuXHQgKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIHNhdmUuXG5cdCAqL1xuXHRwcml2YXRlIHNldENvbXBsZXRlU3RvcmUoc3RvcmU6IHsgW2tleTogc3RyaW5nXTogVCB9KTogdm9pZCB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmUpKTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlRW5kcG9pbnQgfSBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0ZW5kcG9pbnQ6IG5ldyBMb2NhbFN0b3JhZ2VFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9