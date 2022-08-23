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
const storage = {};
function getStorage(id) {
    let localStorage = storage[id];
    if (localStorage === undefined) {
        localStorage = new _platform_local_storage__WEBPACK_IMPORTED_MODULE_0__.PlatformLocalStorage(id, id, logger);
        storage[id] = localStorage;
    }
    return localStorage;
}
async function init(options, log) {
    logger = log;
    logger.info("LocalStorageEndpoint", "Was passed the following options", options);
}
async function action(endpointDefinition, request) {
    if (request === undefined) {
        logger.warn("LocalStorageEndpoint", `A request is required for this action: ${endpointDefinition.id}. Returning false`);
        return false;
    }
    if (endpointDefinition.type !== "module") {
        logger.warn("LocalStorageEndpoint", `We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
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
            logger.warn("LocalStorageEndpoint", `The payload needs to be specified for this action: ${endpointDefinition.id}`);
            return false;
        }
        await localStorage.set(request.id, request.payload);
        return true;
    }
    return false;
}
async function requestResponse(endpointDefinition, request) {
    if (request === undefined) {
        logger.warn("LocalStorageEndpoint", `A request is required for this request response: ${endpointDefinition.id}. Returning null.`);
        return null;
    }
    if (endpointDefinition.type !== "module") {
        logger.warn("LocalStorageEndpoint", `We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return null;
    }
    const { dataType, method } = endpointDefinition.options;
    const localStorage = getStorage(dataType);
    if (method === "GET") {
        if (request.id === undefined) {
            logger.warn("LocalStorageEndpoint", `An id is required for this request response: ${endpointDefinition.id}. Returning null`);
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
const LOGGER_GROUP = "PlatformLocalStorage";
class PlatformLocalStorage {
    constructor(storageId, storageType, logger) {
        this._storageTypeName = storageType;
        this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
        this._logger = logger;
    }
    async get(id) {
        if (id === undefined) {
            this._logger.error(LOGGER_GROUP, `No id was specified for getting a ${this._storageTypeName} entry`);
            return null;
        }
        const store = this.getCompleteStore();
        const savedEntry = store[id];
        if (savedEntry === undefined || savedEntry === null) {
            this._logger.warn(LOGGER_GROUP, `No ${this._storageTypeName} entry was found for id ${id}`);
            return null;
        }
        return savedEntry;
    }
    async set(id, entry) {
        if (id === undefined) {
            this._logger.error(LOGGER_GROUP, `You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
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
            this._logger.info(LOGGER_GROUP, `Storage has no ${this._storageTypeName} entries`);
            return [];
        }
        return Object.values(store);
    }
    async remove(id) {
        if (id === undefined) {
            this._logger.error(LOGGER_GROUP, `An id to clear the saved ${this._storageTypeName} was not provided`);
        }
        else {
            const store = this.getCompleteStore();
            const entry = store[id];
            if (entry !== undefined) {
                delete store[id];
                this.setCompleteStore(store);
            }
            else {
                this._logger.error(LOGGER_GROUP, `You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
            }
        }
    }
    getCompleteStore() {
        const store = localStorage.getItem(this._storageKey);
        if (store === null) {
            this._logger.info(LOGGER_GROUP, `Storage has no ${this._storageTypeName} entries. Creating store`);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNEOzs7Ozs7O1NDMUZEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOdUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9wbGF0Zm9ybS1sb2NhbC1zdG9yYWdlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2xvY2FsLXN0b3JhZ2UvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgSVBsYXRmb3JtU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuY29uc3Qgc3RvcmFnZTogeyBba2V5OiBzdHJpbmddOiBJUGxhdGZvcm1TdG9yYWdlPHVua25vd24+IH0gPSB7fTtcblxuZnVuY3Rpb24gZ2V0U3RvcmFnZTxUPihpZDogc3RyaW5nKTogSVBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdGxldCBsb2NhbFN0b3JhZ2U6IElQbGF0Zm9ybVN0b3JhZ2U8VD4gPSBzdG9yYWdlW2lkXSBhcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUPjtcblx0aWYgKGxvY2FsU3RvcmFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9jYWxTdG9yYWdlID0gbmV3IFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+KGlkLCBpZCwgbG9nZ2VyKTtcblx0XHRzdG9yYWdlW2lkXSA9IGxvY2FsU3RvcmFnZTtcblx0fVxuXHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChvcHRpb25zOiB1bmtub3duLCBsb2c6IExvZ2dlcik6IFByb21pc2U8dm9pZD4ge1xuXHRsb2dnZXIgPSBsb2c7XG5cdGxvZ2dlci5pbmZvKFwiTG9jYWxTdG9yYWdlRW5kcG9pbnRcIiwgXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248eyBkYXRhVHlwZTogc3RyaW5nOyBtZXRob2Q6IFwiUkVNT1ZFXCIgfCBcIlNFVFwiIH0+LFxuXHRyZXF1ZXN0PzogeyBpZDogc3RyaW5nOyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiLFxuXHRcdFx0YEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiLFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCB7IGRhdGFUeXBlLCBtZXRob2QgfSA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXHRjb25zdCBsb2NhbFN0b3JhZ2UgPSBnZXRTdG9yYWdlPHVua25vd24+KGRhdGFUeXBlKTtcblxuXHRpZiAobWV0aG9kID09PSBcIlJFTU9WRVwiKSB7XG5cdFx0Y29uc3QgaWQ6IHN0cmluZyA9IHJlcXVlc3QuaWQ7XG5cdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnJlbW92ZShpZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAobWV0aG9kID09PSBcIlNFVFwiKSB7XG5cdFx0aWYgKHJlcXVlc3QucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiLFxuXHRcdFx0XHRgVGhlIHBheWxvYWQgbmVlZHMgdG8gYmUgc3BlY2lmaWVkIGZvciB0aGlzIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnNldChyZXF1ZXN0LmlkLCByZXF1ZXN0LnBheWxvYWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248eyBkYXRhVHlwZTogc3RyaW5nOyBtZXRob2Q6IFwiR0VUXCIgfCBcIkdFVEFMTFwiIH0+LFxuXHRyZXF1ZXN0PzogeyBpZD86IHN0cmluZzsgcXVlcnk/OiBzdHJpbmcgfVxuKTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcIkxvY2FsU3RvcmFnZUVuZHBvaW50XCIsXG5cdFx0XHRgQSByZXF1ZXN0IGlzIHJlcXVpcmVkIGZvciB0aGlzIHJlcXVlc3QgcmVzcG9uc2U6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIG51bGwuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcIkxvY2FsU3RvcmFnZUVuZHBvaW50XCIsXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdGNvbnN0IGxvY2FsU3RvcmFnZSA9IGdldFN0b3JhZ2U8dW5rbm93bj4oZGF0YVR5cGUpO1xuXG5cdGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRpZiAocmVxdWVzdC5pZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XCJMb2NhbFN0b3JhZ2VFbmRwb2ludFwiLFxuXHRcdFx0XHRgQW4gaWQgaXMgcmVxdWlyZWQgZm9yIHRoaXMgcmVxdWVzdCByZXNwb25zZTogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgbnVsbGBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXQocmVxdWVzdC5pZCk7XG5cdH0gZWxzZSBpZiAobWV0aG9kID09PSBcIkdFVEFMTFwiKSB7XG5cdFx0cmV0dXJuIHsgZGF0YTogYXdhaXQgbG9jYWxTdG9yYWdlLmdldEFsbCgpIH07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IElQbGF0Zm9ybVN0b3JhZ2UgfSBmcm9tIFwiLi9wbGF0Zm9ybS1zdG9yYWdlLXNoYXBlc1wiO1xuXG5jb25zdCBMT0dHRVJfR1JPVVAgPSBcIlBsYXRmb3JtTG9jYWxTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUPiBpbXBsZW1lbnRzIElQbGF0Zm9ybVN0b3JhZ2U8VD4ge1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlVHlwZU5hbWU6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlS2V5OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0Y29uc3RydWN0b3Ioc3RvcmFnZUlkOiBzdHJpbmcsIHN0b3JhZ2VUeXBlOiBzdHJpbmcsIGxvZ2dlcjogTG9nZ2VyKSB7XG5cdFx0dGhpcy5fc3RvcmFnZVR5cGVOYW1lID0gc3RvcmFnZVR5cGU7XG5cdFx0dGhpcy5fc3RvcmFnZUtleSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkLnRvTG93ZXJDYXNlKCkucmVwbGFjZUFsbChcIiBcIiwgXCJcIil9LSR7c3RvcmFnZUlkfWA7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG5cdFx0aWYgKGlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihMT0dHRVJfR1JPVVAsIGBObyBpZCB3YXMgc3BlY2lmaWVkIGZvciBnZXR0aW5nIGEgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5YCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRjb25zdCBzYXZlZEVudHJ5ID0gc3RvcmVbaWRdO1xuXHRcdGlmIChzYXZlZEVudHJ5ID09PSB1bmRlZmluZWQgfHwgc2F2ZWRFbnRyeSA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oTE9HR0VSX0dST1VQLCBgTm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5IHdhcyBmb3VuZCBmb3IgaWQgJHtpZH1gKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2F2ZWRFbnRyeTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBzZXQoaWQ6IHN0cmluZywgZW50cnk6IFQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRMT0dHRVJfR1JPVVAsXG5cdFx0XHRcdGBZb3UgbmVlZCB0byBwcm92aWRlIGEgaWQgZm9yIHRoZSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgeW91IHdpc2ggdG8gc2F2ZWBcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cblx0XHRcdHN0b3JlW2lkXSA9IGVudHJ5O1xuXG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXRBbGwocXVlcnk/OiBzdHJpbmcpOiBQcm9taXNlPFRbXT4ge1xuXHRcdGNvbnN0IHN0b3JlID0gdGhpcy5nZXRDb21wbGV0ZVN0b3JlKCk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgYFN0b3JhZ2UgaGFzIG5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyaWVzYCk7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC52YWx1ZXMoc3RvcmUpO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIHJlbW92ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihMT0dHRVJfR1JPVVAsIGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkZWxldGUgc3RvcmVbaWRdO1xuXHRcdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdExPR0dFUl9HUk9VUCxcblx0XHRcdFx0XHRgWW91IHRyaWVkIHRvIGRlbGV0ZSBhIG5vbi1leGlzdGVudCAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gd2l0aCBpZCAke2lkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGdldENvbXBsZXRlU3RvcmUoKSB7XG5cdFx0Y29uc3Qgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5KTtcblx0XHRpZiAoc3RvcmUgPT09IG51bGwpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgYFN0b3JhZ2UgaGFzIG5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyaWVzLiBDcmVhdGluZyBzdG9yZWApO1xuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHt9KTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZSkgYXMgeyBba2V5OiBzdHJpbmddOiBUIH07XG5cdH1cblxuXHRwcml2YXRlIHNldENvbXBsZXRlU3RvcmUoc3RvcmU6IHsgW2tleTogc3RyaW5nXTogVCB9KSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmUpKTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBhcyBlbmRwb2ludCBmcm9tIFwiLi9lbmRwb2ludFwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9