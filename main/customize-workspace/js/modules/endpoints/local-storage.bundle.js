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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/local-storage/endpoint.ts");

const entryPoints = {
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMcUQ7QUFFOUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxzQ0FBc0I7Q0FDaEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9sb2NhbC1zdG9yYWdlL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvbG9jYWwtc3RvcmFnZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLWxvY2FsLXN0b3JhZ2VcIjtcbmltcG9ydCB0eXBlIHsgSVBsYXRmb3JtU3RvcmFnZSB9IGZyb20gXCIuL3BsYXRmb3JtLXN0b3JhZ2Utc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcbmxldCBsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yO1xuXG5jb25zdCBzdG9yYWdlOiB7IFtrZXk6IHN0cmluZ106IElQbGF0Zm9ybVN0b3JhZ2U8dW5rbm93bj4gfSA9IHt9O1xuXG5mdW5jdGlvbiBnZXRTdG9yYWdlPFQ+KGlkOiBzdHJpbmcpOiBJUGxhdGZvcm1TdG9yYWdlPFQ+IHtcblx0bGV0IGxvY2FsU3RvcmFnZTogSVBsYXRmb3JtU3RvcmFnZTxUPiA9IHN0b3JhZ2VbaWRdIGFzIFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+O1xuXHRpZiAobG9jYWxTdG9yYWdlID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2NhbFN0b3JhZ2UgPSBuZXcgUGxhdGZvcm1Mb2NhbFN0b3JhZ2U8VD4oaWQsIGlkLCBsb2dnZXJDcmVhdG9yKTtcblx0XHRzdG9yYWdlW2lkXSA9IGxvY2FsU3RvcmFnZTtcblx0fVxuXHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZShkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLCBjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsIGhlbHBlcnM/OiBuZXZlcikge1xuXHRsb2dnZXJDcmVhdG9yID0gY3JlYXRlTG9nZ2VyO1xuXHRsb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiTG9jYWxTdG9yYWdlRW5kcG9pbnRcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248eyBkYXRhVHlwZTogc3RyaW5nOyBtZXRob2Q6IFwiUkVNT1ZFXCIgfCBcIlNFVFwiIH0+LFxuXHRyZXF1ZXN0PzogeyBpZDogc3RyaW5nOyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBwZXJmb3JtIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y29uc3QgeyBkYXRhVHlwZSwgbWV0aG9kIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0Y29uc3QgbG9jYWxTdG9yYWdlID0gZ2V0U3RvcmFnZTx1bmtub3duPihkYXRhVHlwZSk7XG5cblx0aWYgKG1ldGhvZCA9PT0gXCJSRU1PVkVcIikge1xuXHRcdGNvbnN0IGlkOiBzdHJpbmcgPSByZXF1ZXN0LmlkO1xuXHRcdGF3YWl0IGxvY2FsU3RvcmFnZS5yZW1vdmUoaWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJTRVRcIikge1xuXHRcdGlmIChyZXF1ZXN0LnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bG9nZ2VyLndhcm4oYFRoZSBwYXlsb2FkIG5lZWRzIHRvIGJlIHNwZWNpZmllZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0KHJlcXVlc3QuaWQsIHJlcXVlc3QucGF5bG9hZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7IGRhdGFUeXBlOiBzdHJpbmc7IG1ldGhvZDogXCJHRVRcIiB8IFwiR0VUQUxMXCIgfT4sXG5cdHJlcXVlc3Q/OiB7IGlkPzogc3RyaW5nOyBxdWVyeT86IHN0cmluZyB9XG4pOiBQcm9taXNlPHVua25vd24gfCBudWxsPiB7XG5cdGlmIChyZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIud2FybihgQSByZXF1ZXN0IGlzIHJlcXVpcmVkIGZvciB0aGlzIHJlcXVlc3QgcmVzcG9uc2U6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIG51bGwuYCk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHsgZGF0YVR5cGUsIG1ldGhvZCB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdGNvbnN0IGxvY2FsU3RvcmFnZSA9IGdldFN0b3JhZ2U8dW5rbm93bj4oZGF0YVR5cGUpO1xuXG5cdGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRpZiAocmVxdWVzdC5pZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dnZXIud2FybihgQW4gaWQgaXMgcmVxdWlyZWQgZm9yIHRoaXMgcmVxdWVzdCByZXNwb25zZTogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgbnVsbGApO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0KHJlcXVlc3QuaWQpO1xuXHR9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJHRVRBTExcIikge1xuXHRcdHJldHVybiB7IGRhdGE6IGF3YWl0IGxvY2FsU3RvcmFnZS5nZXRBbGwoKSB9O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBJUGxhdGZvcm1TdG9yYWdlIH0gZnJvbSBcIi4vcGxhdGZvcm0tc3RvcmFnZS1zaGFwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTG9jYWxTdG9yYWdlPFQ+IGltcGxlbWVudHMgSVBsYXRmb3JtU3RvcmFnZTxUPiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2VUeXBlTmFtZTogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2VLZXk6IHN0cmluZztcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IExvZ2dlcjtcblxuXHRjb25zdHJ1Y3RvcihzdG9yYWdlSWQ6IHN0cmluZywgc3RvcmFnZVR5cGU6IHN0cmluZywgbG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcikge1xuXHRcdHRoaXMuX3N0b3JhZ2VUeXBlTmFtZSA9IHN0b3JhZ2VUeXBlO1xuXHRcdHRoaXMuX3N0b3JhZ2VLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpfS0ke3N0b3JhZ2VJZH1gO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJQbGF0Zm9ybUxvY2FsU3RvcmFnZVwiKTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuXHRcdGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYE5vIGlkIHdhcyBzcGVjaWZpZWQgZm9yIGdldHRpbmcgYSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnlgKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGNvbnN0IHNhdmVkRW50cnkgPSBzdG9yZVtpZF07XG5cdFx0aWYgKHNhdmVkRW50cnkgPT09IHVuZGVmaW5lZCB8fCBzYXZlZEVudHJ5ID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihgTm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJ5IHdhcyBmb3VuZCBmb3IgaWQgJHtpZH1gKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2F2ZWRFbnRyeTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBzZXQoaWQ6IHN0cmluZywgZW50cnk6IFQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBZb3UgbmVlZCB0byBwcm92aWRlIGEgaWQgZm9yIHRoZSAke3RoaXMuX3N0b3JhZ2VUeXBlTmFtZX0gZW50cnkgeW91IHdpc2ggdG8gc2F2ZWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXG5cdFx0XHRzdG9yZVtpZF0gPSBlbnRyeTtcblxuXHRcdFx0dGhpcy5zZXRDb21wbGV0ZVN0b3JlKHN0b3JlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0QWxsKHF1ZXJ5Pzogc3RyaW5nKTogUHJvbWlzZTxUW10+IHtcblx0XHRjb25zdCBzdG9yZSA9IHRoaXMuZ2V0Q29tcGxldGVTdG9yZSgpO1xuXHRcdGlmIChPYmplY3Qua2V5cyhzdG9yZSkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXNgKTtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyhzdG9yZSk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgcmVtb3ZlKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBBbiBpZCB0byBjbGVhciB0aGUgc2F2ZWQgJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IHdhcyBub3QgcHJvdmlkZWRgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSB0aGlzLmdldENvbXBsZXRlU3RvcmUoKTtcblx0XHRcdGNvbnN0IGVudHJ5ID0gc3RvcmVbaWRdO1xuXG5cdFx0XHRpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkZWxldGUgc3RvcmVbaWRdO1xuXHRcdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoc3RvcmUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBZb3UgdHJpZWQgdG8gZGVsZXRlIGEgbm9uLWV4aXN0ZW50ICR7dGhpcy5fc3RvcmFnZVR5cGVOYW1lfSB3aXRoIGlkICR7aWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb21wbGV0ZVN0b3JlKCkge1xuXHRcdGNvbnN0IHN0b3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fc3RvcmFnZUtleSk7XG5cdFx0aWYgKHN0b3JlID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3RvcmFnZSBoYXMgbm8gJHt0aGlzLl9zdG9yYWdlVHlwZU5hbWV9IGVudHJpZXMuIENyZWF0aW5nIHN0b3JlYCk7XG5cdFx0XHR0aGlzLnNldENvbXBsZXRlU3RvcmUoe30pO1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnBhcnNlKHN0b3JlKSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfTtcblx0fVxuXG5cdHByaXZhdGUgc2V0Q29tcGxldGVTdG9yZShzdG9yZTogeyBba2V5OiBzdHJpbmddOiBUIH0pIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9zdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZSkpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9