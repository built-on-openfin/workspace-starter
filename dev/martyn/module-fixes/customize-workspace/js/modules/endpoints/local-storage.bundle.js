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
            return {};
        }
        return store;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMcUQ7QUFFOUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxzQ0FBc0I7Q0FDaEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgSVBsYXRmb3JtU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcbmxldCBsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yO1xuXG5jb25zdCBzdG9yYWdlOiB7IFtrZXk6IHN0cmluZ106IElQbGF0Zm9ybVN0b3JhZ2U8dW5rbm93bj4gfSA9IHt9O1xuXG5mdW5jdGlvbiBnZXRTdG9yYWdlPFQ+KGlkOiBzdHJpbmcpOiBJUGxhdGZvcm1TdG9yYWdlPFQ+IHtcblx0bGV0IGxvY2FsU3RvcmFnZTogSVBsYXRmb3JtU3RvcmFnZTxUPiA9IHN0b3JhZ2VbaWRdIGFzIFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+O1xuXHRpZiAobG9jYWxTdG9yYWdlID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2NhbFN0b3JhZ2UgPSBuZXcgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD4oaWQsIGlkLCBsb2dnZXJDcmVhdG9yKTtcblx0XHRzdG9yYWdlW2lkXSA9IGxvY2FsU3RvcmFnZTtcblx0fVxuXHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZShkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLCBjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsIGhlbHBlcnM/OiBuZXZlcikge1xuXHRsb2dnZXJDcmVhdG9yID0gY3JlYXRlTG9nZ2VyO1xuXHRsb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiTG9jYWxTdG9yYWdlRW5kcG9pbnRcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248eyBkYXRhVHlwZTogc3RyaW5nOyBtZXRob2Q6IFwiUkVNT1ZFXCIgfCBcIlNFVFwiIH0+LFxuXHRyZXF1ZXN0PzogeyBpZDogc3RyaW5nOyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBwZXJmb3JtIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y29uc3QgeyBkYXRhVHlwZSwgbWV0aG9kIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gZ2V0U3RvcmFnZTx1bmtub3duPihkYXRhVHlwZSBhcyBzdHJpbmcpO1xuXG5cdGlmIChtZXRob2QgPT09IFwiUkVNT1ZFXCIpIHtcblx0XHRjb25zdCBpZDogc3RyaW5nID0gcmVxdWVzdC5pZDtcblx0XHRhd2FpdCBsb2NhbFN0b3JhZ2UucmVtb3ZlKGlkKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChtZXRob2QgPT09IFwiU0VUXCIpIHtcblx0XHRpZiAocmVxdWVzdC5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGxvZ2dlci53YXJuKGBUaGUgcGF5bG9hZCBuZWVkcyB0byBiZSBzcGVjaWZpZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0YXdhaXQgbG9jYWxTdG9yYWdlLnNldChyZXF1ZXN0LmlkLCByZXF1ZXN0LnBheWxvYWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248eyBkYXRhVHlwZTogc3RyaW5nOyBtZXRob2Q6IFwiR0VUXCIgfCBcIkdFVEFMTFwiIH0+LFxuXHRyZXF1ZXN0PzogeyBpZD86IHN0cmluZzsgcXVlcnk/OiBzdHJpbmcgfVxuKTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3QgeyBkYXRhVHlwZSwgbWV0aG9kIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gZ2V0U3RvcmFnZTx1bmtub3duPihkYXRhVHlwZSBhcyBzdHJpbmcpO1xuXG5cdGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRpZiAocmVxdWVzdD8uaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bG9nZ2VyLndhcm4oYEFuIGlkIGlzIHJlcXVpcmVkIGZvciB0aGlzIHJlcXVlc3QgcmVzcG9uc2U6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIG51bGxgKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldChyZXF1ZXN0LmlkKTtcblx0fSBlbHNlIGlmIChtZXRob2QgPT09IFwiR0VUQUxMXCIpIHtcblx0XHRyZXR1cm4geyBkYXRhOiBhd2FpdCBsb2NhbFN0b3JhZ2UuZ2V0QWxsKCkgfTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybUxvY2FsU3RvcmFnZTxUID0gdW5rbm93bj4gaW1wbGVtZW50cyBQbGF0Zm9ybVN0b3JhZ2U8VD4ge1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlVHlwZU5hbWU6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlS2V5OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0Y29uc3RydWN0b3Ioc3RvcmFnZUlkOiBzdHJpbmcsIHN0b3JhZ2VUeXBlOiBzdHJpbmcsIGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IpIHtcblx0XHR0aGlzLl9zdG9yYWdlVHlwZU5hbWUgPSBzdG9yYWdlVHlwZTtcblx0XHR0aGlzLl9zdG9yYWdlS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWQudG9Mb3dlckNhc2UoKS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKX0tJHtzdG9yYWdlSWR9YDtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGxhdGZvcm1Mb2NhbFN0b3JhZ2VcIik7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBObyBpZCB3YXMgc3BlY2lmaWVkIGZvciBnZXR0aW5nIGEgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5YCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRjb25zdCBzYXZlZEVudHJ5ID0gc3RvcmVbaWRdO1xuXHRcdGlmIChzYXZlZEVudHJ5ID09PSB1bmRlZmluZWQgfHwgc2F2ZWRFbnRyeSA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oYE5vICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSBlbnRyeSB3YXMgZm91bmQgZm9yIGlkICR7aWR9YCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNhdmVkRW50cnk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgc2V0KGlkOiBzdHJpbmcsIGVudHJ5OiBUKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihgWW91IG5lZWQgdG8gcHJvdmlkZSBhIGlkIGZvciB0aGUgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5IHlvdSB3aXNoIHRvIHNhdmVgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblxuXHRcdFx0c3RvcmVbaWRdID0gZW50cnk7XG5cblx0XHRcdHRoaXMuc2V0Q29tcGxldGVTdG9yZShzdG9yZSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldEFsbChxdWVyeT86IHN0cmluZyk6IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBUIH0+IHtcblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGlmIChPYmplY3Qua2V5cyhzdG9yZSkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXNgKTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgcmVtb3ZlKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkZWxldGUgc3RvcmVbaWRdO1xuXHRcdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBZb3UgdHJpZWQgdG8gZGVsZXRlIGEgbm9uLWV4aXN0ZW50ICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3aXRoIGlkICR7aWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb21wbGV0ZVN0b3JlKCkge1xuXHRcdGNvbnN0IHN0b3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmFnZUtleSk7XG5cdFx0aWYgKHN0b3JlID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXMuIENyZWF0aW5nIHN0b3JlYCk7XG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoe30pO1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnBhcnNlKHN0b3JlKSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfTtcblx0fVxuXG5cdHByaXZhdGUgc2V0Q29tcGxldGVTdG9yZShzdG9yZTogeyBba2V5OiBzdHJpbmddOiBUIH0pIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZSkpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9