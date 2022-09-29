/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/local-storage/endpoint.ts":
/*!****************************************************************!*\
  !*** ./client/src/modules/endpoints/local-storage/endpoint.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "initialize": () => (/* binding */ initialize),
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
async function initialize(definition, createLogger, helpers) {
    loggerCreator = createLogger;
    logger = loggerCreator("LocalStorageEndpoint");
    logger.info("Was passed the following options", definition.data);
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
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return null;
    }
    const { dataType, method } = endpointDefinition.options;
    const localStorage = getStorage(dataType);
    if (method === "GET") {
        if (request?.id === undefined) {
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/local-storage/endpoint.ts");

const entryPoints = {
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xxRDtBQUU5QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLHNDQUFzQjtDQUNoQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2xvY2FsLXN0b3JhZ2UvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2xvY2FsLXN0b3JhZ2UvcGxhdGZvcm0tbG9jYWwtc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFBsYXRmb3JtTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vcGxhdGZvcm0tbG9jYWwtc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBJUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcIi4vcGxhdGZvcm0tc3RvcmFnZS1zaGFwZXNcIjtcblxubGV0IGxvZ2dlcjogTG9nZ2VyO1xubGV0IGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3I7XG5cbmNvbnN0IHN0b3JhZ2U6IHsgW2tleTogc3RyaW5nXTogSVBsYXRmb3JtU3RvcmFnZTx1bmtub3duPiB9ID0ge307XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2U8VD4oaWQ6IHN0cmluZyk6IElQbGF0Zm9ybVN0b3JhZ2U8VD4ge1xuXHRsZXQgbG9jYWxTdG9yYWdlOiBJUGxhdGZvcm1TdG9yYWdlPFQ+ID0gc3RvcmFnZVtpZF0gYXMgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD47XG5cdGlmIChsb2NhbFN0b3JhZ2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvY2FsU3RvcmFnZSA9IG5ldyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUPihpZCwgaWQsIGxvZ2dlckNyZWF0b3IpO1xuXHRcdHN0b3JhZ2VbaWRdID0gbG9jYWxTdG9yYWdlO1xuXHR9XG5cdHJldHVybiBsb2NhbFN0b3JhZ2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sIGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvciwgaGVscGVycz86IG5ldmVyKSB7XG5cdGxvZ2dlckNyZWF0b3IgPSBjcmVhdGVMb2dnZXI7XG5cdGxvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiKTtcblx0bG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJSRU1PVkVcIiB8IFwiU0VUXCIgfT4sXG5cdHJlcXVlc3Q/OiB7IGlkOiBzdHJpbmc7IHBheWxvYWQ/OiB1bmtub3duIH1cbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCB7IGRhdGFUeXBlLCBtZXRob2QgfSA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXHRjb25zdCBsb2NhbFN0b3JhZ2UgPSBnZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlIGFzIHN0cmluZyk7XG5cblx0aWYgKG1ldGhvZCA9PT0gXCJSRU1PVkVcIikge1xuXHRcdGNvbnN0IGlkOiBzdHJpbmcgPSByZXF1ZXN0LmlkO1xuXHRcdGF3YWl0IGxvY2FsU3RvcmFnZS5yZW1vdmUoaWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJTRVRcIikge1xuXHRcdGlmIChyZXF1ZXN0LnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bG9nZ2VyLndhcm4oYFRoZSBwYXlsb2FkIG5lZWRzIHRvIGJlIHNwZWNpZmllZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0KHJlcXVlc3QuaWQsIHJlcXVlc3QucGF5bG9hZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJHRVRcIiB8IFwiR0VUQUxMXCIgfT4sXG5cdHJlcXVlc3Q/OiB7IGlkPzogc3RyaW5nOyBxdWVyeT86IHN0cmluZyB9XG4pOiBQcm9taXNlPHVua25vd24gfCBudWxsPiB7XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCB7IGRhdGFUeXBlLCBtZXRob2QgfSA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXHRjb25zdCBsb2NhbFN0b3JhZ2UgPSBnZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlIGFzIHN0cmluZyk7XG5cblx0aWYgKG1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdGlmIChyZXF1ZXN0Py5pZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dnZXIud2FybihgQW4gaWQgaXMgcmVxdWlyZWQgZm9yIHRoaXMgcmVxdWVzdCByZXNwb25zZTogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgbnVsbGApO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0KHJlcXVlc3QuaWQpO1xuXHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJHRVRBTExcIikge1xuXHRcdHJldHVybiB7IGRhdGE6IGF3YWl0IGxvY2FsU3RvcmFnZS5nZXRBbGwoKSB9O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvcGxhdGZvcm0tc3RvcmFnZS1zaGFwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQgPSB1bmtub3duPiBpbXBsZW1lbnRzIFBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2VUeXBlTmFtZTogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2VLZXk6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IExvZ2dlcjtcblxuXHRjb25zdHJ1Y3RvcihzdG9yYWdlSWQ6IHN0cmluZywgc3RvcmFnZVR5cGU6IHN0cmluZywgbG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcikge1xuXHRcdHRoaXMuX3N0b3JhZ2VUeXBlTmFtZSA9IHN0b3JhZ2VUeXBlO1xuXHRcdHRoaXMuX3N0b3JhZ2VLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpfS0ke3N0b3JhZ2VJZH1gO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJQbGF0Zm9ybUxvY2FsU3RvcmFnZVwiKTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuXHRcdGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYE5vIGlkIHdhcyBzcGVjaWZpZWQgZm9yIGdldHRpbmcgYSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnlgKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGNvbnN0IHNhdmVkRW50cnkgPSBzdG9yZVtpZF07XG5cdFx0aWYgKHNhdmVkRW50cnkgPT09IHVuZGVmaW5lZCB8fCBzYXZlZEVudHJ5ID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihgTm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5IHdhcyBmb3VuZCBmb3IgaWQgJHtpZH1gKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2F2ZWRFbnRyeTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBzZXQoaWQ6IHN0cmluZywgZW50cnk6IFQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBZb3UgbmVlZCB0byBwcm92aWRlIGEgaWQgZm9yIHRoZSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgeW91IHdpc2ggdG8gc2F2ZWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXG5cdFx0XHRzdG9yZVtpZF0gPSBlbnRyeTtcblxuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHN0b3JlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0QWxsKHF1ZXJ5Pzogc3RyaW5nKTogUHJvbWlzZTxUW10+IHtcblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGlmIChPYmplY3Qua2V5cyhzdG9yZSkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXNgKTtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyhzdG9yZSk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgcmVtb3ZlKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkZWxldGUgc3RvcmVbaWRdO1xuXHRcdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBZb3UgdHJpZWQgdG8gZGVsZXRlIGEgbm9uLWV4aXN0ZW50ICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3aXRoIGlkICR7aWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb21wbGV0ZVN0b3JlKCkge1xuXHRcdGNvbnN0IHN0b3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmFnZUtleSk7XG5cdFx0aWYgKHN0b3JlID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXMuIENyZWF0aW5nIHN0b3JlYCk7XG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoe30pO1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnBhcnNlKHN0b3JlKSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfTtcblx0fVxuXG5cdHByaXZhdGUgc2V0Q29tcGxldGVTdG9yZShzdG9yZTogeyBba2V5OiBzdHJpbmddOiBUIH0pIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZSkpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9