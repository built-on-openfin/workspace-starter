/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/local-storage/endpoint.ts":
/*!****************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/endpoint.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
/* harmony import */ var _platform_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform-local-storage */ "./client/src/modules/endpoints/local-storage/platform-local-storage.ts");

let logger;
let loggerCreator;
const storage = {};
function getStorage(id) {
    let localStorage = storage[id];
    if (localStorage === undefined) {
        localStorage = new _platform_local_storage__WEBPACK_IMPORTED_MODULE_0__.PlatformLocalStorage(id, id, loggerCreator);
        storage[id] = localStorage;
    }
    return localStorage;
}
async function init(options, logCreator) {
    loggerCreator = logCreator;
    logger = loggerCreator("LocalStorageEndpoint");
    logger.info("Was passed the following options", options);
}
async function action(endpointDefinition, request) {
    if (request === undefined) {
        logger.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
        return false;
    }
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
        return false;
    }
    const { dataType, method } = endpointDefinition.options;
    const localStorage = getStorage(dataType);
    if (method === "REMOVE") {
        const id = request.id;
        await localStorage.remove(id);
        return true;
    }
    else if (method === "SET") {
        if (request.payload === undefined) {
            logger.warn(`The payload needs to be specified for this action: ${endpointDefinition.id}`);
            return false;
        }
        await localStorage.set(request.id, request.payload);
        return true;
    }
    return false;
}
async function requestResponse(endpointDefinition, request) {
    if (request === undefined) {
        logger.warn(`A request is required for this request response: ${endpointDefinition.id}. Returning null.`);
        return null;
    }
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return null;
    }
    const { dataType, method } = endpointDefinition.options;
    const localStorage = getStorage(dataType);
    if (method === "GET") {
        if (request.id === undefined) {
            logger.warn(`An id is required for this request response: ${endpointDefinition.id}. Returning null`);
            return null;
        }
        return localStorage.get(request.id);
    }
    else if (method === "GETALL") {
        return { data: await localStorage.getAll() };
    }
    return null;
}


/***/ }),

/***/ "./client/src/modules/endpoints/local-storage/platform-local-storage.ts":
/*!******************************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/platform-local-storage.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlatformLocalStorage": () => (/* binding */ PlatformLocalStorage)
/* harmony export */ });
class PlatformLocalStorage {
    constructor(storageId, storageType, loggerCreator) {
        this._storageTypeName = storageType;
        this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
        this._logger = loggerCreator("PlatformLocalStorage");
    }
    async get(id) {
        if (id === undefined) {
            this._logger.error(`No id was specified for getting a ${this._storageTypeName} entry`);
            return null;
        }
        const store = this.getCompleteStore();
        const savedEntry = store[id];
        if (savedEntry === undefined || savedEntry === null) {
            this._logger.warn(`No ${this._storageTypeName} entry was found for id ${id}`);
            return null;
        }
        return savedEntry;
    }
    async set(id, entry) {
        if (id === undefined) {
            this._logger.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
        }
        else {
            const store = this.getCompleteStore();
            store[id] = entry;
            this.setCompleteStore(store);
        }
    }
    async getAll(query) {
        const store = this.getCompleteStore();
        if (Object.keys(store).length === 0) {
            this._logger.info(`Storage has no ${this._storageTypeName} entries`);
            return [];
        }
        return Object.values(store);
    }
    async remove(id) {
        if (id === undefined) {
            this._logger.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
        }
        else {
            const store = this.getCompleteStore();
            const entry = store[id];
            if (entry !== undefined) {
                delete store[id];
                this.setCompleteStore(store);
            }
            else {
                this._logger.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
            }
        }
    }
    getCompleteStore() {
        const store = localStorage.getItem(this._storageKey);
        if (store === null) {
            this._logger.info(`Storage has no ${this._storageTypeName} entries. Creating store`);
            this.setCompleteStore({});
            return {};
        }
        return JSON.parse(store);
    }
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
/* harmony export */   "endpoint": () => (/* reexport module object */ _endpoint__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/local-storage/endpoint.ts");


})();

var __webpack_exports__endpoint = __webpack_exports__.endpoint;
export { __webpack_exports__endpoint as endpoint };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2xvY2FsLXN0b3JhZ2UvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2xvY2FsLXN0b3JhZ2UvcGxhdGZvcm0tbG9jYWwtc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9wbGF0Zm9ybS1sb2NhbC1zdG9yYWdlXCI7XG5pbXBvcnQgdHlwZSB7IElQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5sZXQgbG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcjtcblxuY29uc3Qgc3RvcmFnZTogeyBba2V5OiBzdHJpbmddOiBJUGxhdGZvcm1TdG9yYWdlPHVua25vd24+IH0gPSB7fTtcblxuZnVuY3Rpb24gZ2V0U3RvcmFnZTxUPihpZDogc3RyaW5nKTogSVBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdGxldCBsb2NhbFN0b3JhZ2U6IElQbGF0Zm9ybVN0b3JhZ2U8VD4gPSBzdG9yYWdlW2lkXSBhcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUPjtcblx0aWYgKGxvY2FsU3RvcmFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9jYWxTdG9yYWdlID0gbmV3IFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+KGlkLCBpZCwgbG9nZ2VyQ3JlYXRvcik7XG5cdFx0c3RvcmFnZVtpZF0gPSBsb2NhbFN0b3JhZ2U7XG5cdH1cblx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQob3B0aW9uczogdW5rbm93biwgbG9nQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcik6IFByb21pc2U8dm9pZD4ge1xuXHRsb2dnZXJDcmVhdG9yID0gbG9nQ3JlYXRvcjtcblx0bG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkxvY2FsU3RvcmFnZUVuZHBvaW50XCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJSRU1PVkVcIiB8IFwiU0VUXCIgfT4sXG5cdHJlcXVlc3Q/OiB7IGlkOiBzdHJpbmc7IHBheWxvYWQ/OiB1bmtub3duIH1cbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCB7IGRhdGFUeXBlLCBtZXRob2QgfSA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXHRjb25zdCBsb2NhbFN0b3JhZ2UgPSBnZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlKTtcblxuXHRpZiAobWV0aG9kID09PSBcIlJFTU9WRVwiKSB7XG5cdFx0Y29uc3QgaWQ6IHN0cmluZyA9IHJlcXVlc3QuaWQ7XG5cdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnJlbW92ZShpZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAobWV0aG9kID09PSBcIlNFVFwiKSB7XG5cdFx0aWYgKHJlcXVlc3QucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dnZXIud2FybihgVGhlIHBheWxvYWQgbmVlZHMgdG8gYmUgc3BlY2lmaWVkIGZvciB0aGlzIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGF3YWl0IGxvY2FsU3RvcmFnZS5zZXQocmVxdWVzdC5pZCwgcmVxdWVzdC5wYXlsb2FkKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHsgZGF0YVR5cGU6IHN0cmluZzsgbWV0aG9kOiBcIkdFVFwiIHwgXCJHRVRBTExcIiB9Pixcblx0cmVxdWVzdD86IHsgaWQ/OiBzdHJpbmc7IHF1ZXJ5Pzogc3RyaW5nIH1cbik6IFByb21pc2U8dW5rbm93biB8IG51bGw+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgcmVxdWVzdCByZXNwb25zZTogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgbnVsbC5gKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3QgeyBkYXRhVHlwZSwgbWV0aG9kIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gZ2V0U3RvcmFnZTx1bmtub3duPihkYXRhVHlwZSk7XG5cblx0aWYgKG1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdGlmIChyZXF1ZXN0LmlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGxvZ2dlci53YXJuKGBBbiBpZCBpcyByZXF1aXJlZCBmb3IgdGhpcyByZXF1ZXN0IHJlc3BvbnNlOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBudWxsYCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXQocmVxdWVzdC5pZCk7XG5cdH0gZWxzZSBpZiAobWV0aG9kID09PSBcIkdFVEFMTFwiKSB7XG5cdFx0cmV0dXJuIHsgZGF0YTogYXdhaXQgbG9jYWxTdG9yYWdlLmdldEFsbCgpIH07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IElQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD4gaW1wbGVtZW50cyBJUGxhdGZvcm1TdG9yYWdlPFQ+IHtcblx0cHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZVR5cGVOYW1lOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZUtleTogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdGNvbnN0cnVjdG9yKHN0b3JhZ2VJZDogc3RyaW5nLCBzdG9yYWdlVHlwZTogc3RyaW5nLCBsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yKSB7XG5cdFx0dGhpcy5fc3RvcmFnZVR5cGVOYW1lID0gc3RvcmFnZVR5cGU7XG5cdFx0dGhpcy5fc3RvcmFnZUtleSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkLnRvTG93ZXJDYXNlKCkucmVwbGFjZUFsbChcIiBcIiwgXCJcIil9LSR7c3RvcmFnZUlkfWA7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlBsYXRmb3JtTG9jYWxTdG9yYWdlXCIpO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG5cdFx0aWYgKGlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihgTm8gaWQgd2FzIHNwZWNpZmllZCBmb3IgZ2V0dGluZyBhICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyeWApO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0Y29uc3Qgc2F2ZWRFbnRyeSA9IHN0b3JlW2lkXTtcblx0XHRpZiAoc2F2ZWRFbnRyeSA9PT0gdW5kZWZpbmVkIHx8IHNhdmVkRW50cnkgPT09IG51bGwpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBObyAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgd2FzIGZvdW5kIGZvciBpZCAke2lkfWApO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBzYXZlZEVudHJ5O1xuXHR9XG5cblx0cHVibGljIGFzeW5jIHNldChpZDogc3RyaW5nLCBlbnRyeTogVCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYFlvdSBuZWVkIHRvIHByb3ZpZGUgYSBpZCBmb3IgdGhlICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyeSB5b3Ugd2lzaCB0byBzYXZlYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cblx0XHRcdHN0b3JlW2lkXSA9IGVudHJ5O1xuXG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXRBbGwocXVlcnk/OiBzdHJpbmcpOiBQcm9taXNlPFRbXT4ge1xuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTdG9yYWdlIGhhcyBubyAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cmllc2ApO1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKHN0b3JlKTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyByZW1vdmUoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYEFuIGlkIHRvIGNsZWFyIHRoZSBzYXZlZCAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gd2FzIG5vdCBwcm92aWRlZGApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdFx0Y29uc3QgZW50cnkgPSBzdG9yZVtpZF07XG5cblx0XHRcdGlmIChlbnRyeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGRlbGV0ZSBzdG9yZVtpZF07XG5cdFx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZShzdG9yZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYFlvdSB0cmllZCB0byBkZWxldGUgYSBub24tZXhpc3RlbnQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdpdGggaWQgJHtpZH1gKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGdldENvbXBsZXRlU3RvcmUoKSB7XG5cdFx0Y29uc3Qgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5KTtcblx0XHRpZiAoc3RvcmUgPT09IG51bGwpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTdG9yYWdlIGhhcyBubyAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cmllcy4gQ3JlYXRpbmcgc3RvcmVgKTtcblx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZSh7fSk7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmUpIGFzIHsgW2tleTogc3RyaW5nXTogVCB9O1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRDb21wbGV0ZVN0b3JlKHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IFQgfSkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3N0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KHN0b3JlKSk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0ICogYXMgZW5kcG9pbnQgZnJvbSBcIi4vZW5kcG9pbnRcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==