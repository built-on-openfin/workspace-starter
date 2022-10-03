/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/fdc3-app/endpoint.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/endpoints/fdc3-app/endpoint.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
/* harmony import */ var _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fdc3-1-2-helper */ "./client/src/modules/endpoints/fdc3-app/fdc3-1-2-helper.ts");
/* harmony import */ var _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fdc3-2-0-helper */ "./client/src/modules/endpoints/fdc3-app/fdc3-2-0-helper.ts");


let logger;
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("FDC3 App Mapper");
    logger.info("Was passed the following options", definition.data);
}
async function requestResponse(endpointDefinition, request) {
    const results = [];
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return results;
    }
    const fdc3Version = endpointDefinition?.options?.fdc3Version || "1.2";
    let applications;
    if (Array.isArray(request)) {
        applications = request;
    }
    else {
        applications = request.applications;
    }
    if (fdc3Version === "1.2") {
        for (let i = 0; i < applications.length; i++) {
            const passedApp = applications[i];
            const platformApp = {
                appId: passedApp.appId,
                title: passedApp.title || passedApp.name,
                manifestType: passedApp.manifestType,
                manifest: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getManifest(passedApp),
                description: passedApp.description,
                intents: passedApp.intents,
                tags: [passedApp.manifestType],
                version: passedApp.version,
                publisher: passedApp.publisher,
                contactEmail: passedApp.contactEmail,
                supportEmail: passedApp.supportEmail,
                icons: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getIcons(passedApp.icons),
                images: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getImages(passedApp.images)
            };
            results.push(platformApp);
        }
    }
    else if (fdc3Version === "2.0") {
        for (let i = 0; i < applications.length; i++) {
            const passedApp = applications[i];
            const platformApp = {
                appId: passedApp.appId,
                title: passedApp.title || passedApp.name,
                manifestType: _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__.getManifestType(passedApp),
                manifest: _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__.getManifest(passedApp),
                description: passedApp.description,
                intents: _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__.getIntents(passedApp),
                tags: passedApp.categories,
                version: passedApp.version,
                publisher: passedApp.publisher,
                contactEmail: passedApp.contactEmail,
                supportEmail: passedApp.supportEmail,
                icons: passedApp.icons,
                images: passedApp.screenshots
            };
            results.push(platformApp);
        }
    }
    else {
        logger.warn(`Unsupported FDC3 version passed: ${fdc3Version}. Unable to map apps.`);
    }
    return results;
}


/***/ }),

/***/ "./client/src/modules/endpoints/fdc3-app/fdc3-1-2-helper.ts":
/*!******************************************************************!*\
  !*** ./client/src/modules/endpoints/fdc3-app/fdc3-1-2-helper.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIcons": () => (/* binding */ getIcons),
/* harmony export */   "getImages": () => (/* binding */ getImages),
/* harmony export */   "getManifest": () => (/* binding */ getManifest)
/* harmony export */ });
function getIcons(icons) {
    const appIcons = [];
    if (icons === undefined) {
        return appIcons;
    }
    for (const appIcon of icons) {
        appIcons.push({ src: appIcon.icon });
    }
    return appIcons;
}
function getImages(images) {
    const appImages = [];
    if (images === undefined) {
        return appImages;
    }
    for (const appImage of images) {
        appImages.push({ src: appImage.url });
    }
    return appImages;
}
function getManifest(app) {
    if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
        return JSON.parse(app.manifest);
    }
    return app.manifest;
}


/***/ }),

/***/ "./client/src/modules/endpoints/fdc3-app/fdc3-2-0-helper.ts":
/*!******************************************************************!*\
  !*** ./client/src/modules/endpoints/fdc3-app/fdc3-2-0-helper.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIntents": () => (/* binding */ getIntents),
/* harmony export */   "getManifest": () => (/* binding */ getManifest),
/* harmony export */   "getManifestType": () => (/* binding */ getManifestType)
/* harmony export */ });
function getManifestType(app) {
    let manifestType;
    switch (app.type) {
        case "web": {
            manifestType = "inline-view";
            break;
        }
        case "native": {
            manifestType = "inline-external";
            break;
        }
        case "onlineNative": {
            manifestType = "desktop-browser";
            break;
        }
        case "other": {
            manifestType = app.hostManifests?.OpenFin?.type;
            break;
        }
        default: {
            manifestType = app.type;
        }
    }
    return manifestType;
}
function getManifest(app) {
    let manifest;
    switch (app.type) {
        case "web": {
            if (app?.details !== undefined) {
                // return fdc3InteropApi 1.2 as the platform currently supports that.
                manifest = {
                    url: app?.details.url,
                    fdc3InteropApi: "1.2"
                };
            }
            break;
        }
        case "native": {
            if (app?.details !== undefined) {
                // our native api supports path and arguments.
                manifest = app.details;
            }
            break;
        }
        case "onlineNative": {
            if (app?.details !== undefined) {
                manifest = app?.details.url;
            }
            break;
        }
        case "other": {
            manifest = app.hostManifests?.OpenFin?.details;
            break;
        }
        default: {
            manifest = app.details;
        }
    }
    return manifest;
}
function getIntents(app) {
    const intents = [];
    if (app?.interop?.intents?.listensFor === undefined) {
        return intents;
    }
    const intentIds = Object.keys(app.interop.intents.listensFor);
    for (let i = 0; i < intentIds.length; i++) {
        const intentName = intentIds[i];
        intents.push({
            name: intentName,
            displayName: app.interop.intents.listensFor[intentName].displayName,
            contexts: app.interop.intents.listensFor[intentName].contexts
        });
    }
    return intents;
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
/*!********************************************************!*\
  !*** ./client/src/modules/endpoints/fdc3-app/index.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/fdc3-app/endpoint.ts");

const entryPoints = {
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUU7UUFDMUMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDWixJQUFJLEVBQUUsVUFBVTtZQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVc7WUFDbkUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRO1NBQzdELENBQUMsQ0FBQztLQUNIO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztTQzNGRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTHFEO0FBRTlDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxRQUFRLEVBQUUsc0NBQXNCO0NBQ2hDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMS0yLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZmRjMy0yLTAtaGVscGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQXBwIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZmRjM09uZVBvaW50VHdvSGVscGVyIGZyb20gXCIuL2ZkYzMtMS0yLWhlbHBlclwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uIGFzIEFwcERlZmluaXRpb25PbmVQb2ludFR3byB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZmRjM1R3b1BvaW50WmVyb0hlbHBlciBmcm9tIFwiLi9mZGMzLTItMC1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvIH0gZnJvbSBcIi4vZmRjMy0yLTAtc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzPzogbmV2ZXIpIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiRkRDMyBBcHAgTWFwcGVyXCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRmZGMzVmVyc2lvbjogc3RyaW5nO1xuXHR9Pixcblx0cmVxdWVzdD86IHVua25vd25bXSB8IHsgYXBwbGljYXRpb25zOiB1bmtub3duW10gfVxuKTogUHJvbWlzZTxBcHBbXT4ge1xuXHRjb25zdCByZXN1bHRzOiBBcHBbXSA9IFtdO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblx0Y29uc3QgZmRjM1ZlcnNpb24gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmZkYzNWZXJzaW9uIHx8IFwiMS4yXCI7XG5cdGxldCBhcHBsaWNhdGlvbnM7XG5cblx0aWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdCkpIHtcblx0XHRhcHBsaWNhdGlvbnMgPSByZXF1ZXN0O1xuXHR9IGVsc2Uge1xuXHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3QuYXBwbGljYXRpb25zO1xuXHR9XG5cdGlmIChmZGMzVmVyc2lvbiA9PT0gXCIxLjJcIikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25PbmVQb2ludFR3byA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd287XG5cdFx0XHRjb25zdCBwbGF0Zm9ybUFwcDogQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IHBhc3NlZEFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0TWFuaWZlc3QocGFzc2VkQXBwKSBhcyBzdHJpbmcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBwYXNzZWRBcHAuZGVzY3JpcHRpb24sXG5cdFx0XHRcdGludGVudHM6IHBhc3NlZEFwcC5pbnRlbnRzLFxuXHRcdFx0XHR0YWdzOiBbcGFzc2VkQXBwLm1hbmlmZXN0VHlwZV0sXG5cdFx0XHRcdHZlcnNpb246IHBhc3NlZEFwcC52ZXJzaW9uLFxuXHRcdFx0XHRwdWJsaXNoZXI6IHBhc3NlZEFwcC5wdWJsaXNoZXIsXG5cdFx0XHRcdGNvbnRhY3RFbWFpbDogcGFzc2VkQXBwLmNvbnRhY3RFbWFpbCxcblx0XHRcdFx0c3VwcG9ydEVtYWlsOiBwYXNzZWRBcHAuc3VwcG9ydEVtYWlsLFxuXHRcdFx0XHRpY29uczogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldEljb25zKHBhc3NlZEFwcC5pY29ucyksXG5cdFx0XHRcdGltYWdlczogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldEltYWdlcyhwYXNzZWRBcHAuaW1hZ2VzKVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdHMucHVzaChwbGF0Zm9ybUFwcCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGZkYzNWZXJzaW9uID09PSBcIjIuMFwiKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBsaWNhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHBhc3NlZEFwcDogQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvO1xuXHRcdFx0Y29uc3QgcGxhdGZvcm1BcHA6IEFwcCA9IHtcblx0XHRcdFx0YXBwSWQ6IHBhc3NlZEFwcC5hcHBJZCxcblx0XHRcdFx0dGl0bGU6IHBhc3NlZEFwcC50aXRsZSB8fCBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0bWFuaWZlc3RUeXBlOiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldE1hbmlmZXN0VHlwZShwYXNzZWRBcHApLFxuXHRcdFx0XHRtYW5pZmVzdDogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHBhc3NlZEFwcC5kZXNjcmlwdGlvbixcblx0XHRcdFx0aW50ZW50czogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRJbnRlbnRzKHBhc3NlZEFwcCksXG5cdFx0XHRcdHRhZ3M6IHBhc3NlZEFwcC5jYXRlZ29yaWVzLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IHBhc3NlZEFwcC5pY29ucyxcblx0XHRcdFx0aW1hZ2VzOiBwYXNzZWRBcHAuc2NyZWVuc2hvdHNcblx0XHRcdH07XG5cdFx0XHRyZXN1bHRzLnB1c2gocGxhdGZvcm1BcHApO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dnZXIud2FybihgVW5zdXBwb3J0ZWQgRkRDMyB2ZXJzaW9uIHBhc3NlZDogJHtmZGMzVmVyc2lvbn0uIFVuYWJsZSB0byBtYXAgYXBwcy5gKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cbiIsImltcG9ydCB0eXBlIHsgSW1hZ2UgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24sIEFwcEljb24sIEFwcEltYWdlIH0gZnJvbSBcIi4vZmRjMy0xLTItc2hhcGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29ucyhpY29uczogQXBwSWNvbltdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEljb25zOiBJbWFnZVtdID0gW107XG5cdGlmIChpY29ucyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGFwcEljb25zO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZXMoaW1hZ2VzOiBBcHBJbWFnZVtdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoaW1hZ2VzID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYXBwSW1hZ2VzO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyBzcmM6IGFwcEltYWdlLnVybCB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3QoYXBwOiBBcHBEZWZpbml0aW9uKTogdW5rbm93biB7XG5cdGlmICh0eXBlb2YgYXBwLm1hbmlmZXN0ID09PSBcInN0cmluZ1wiICYmIGFwcC5tYW5pZmVzdC5zdGFydHNXaXRoKFwie1wiKSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcC5tYW5pZmVzdCk7XG5cdH1cblxuXHRyZXR1cm4gYXBwLm1hbmlmZXN0O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBBcHBJbnRlbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdFdlYkFwcERldGFpbHMsXG5cdE5hdGl2ZUFwcERldGFpbHMsXG5cdE9ubGluZU5hdGl2ZUFwcERldGFpbHNcbn0gZnJvbSBcIi4vZmRjMy0yLTAtc2hhcGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdFR5cGUoYXBwOiBBcHBEZWZpbml0aW9uKTogc3RyaW5nIHtcblx0bGV0IG1hbmlmZXN0VHlwZTogc3RyaW5nO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLXZpZXdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLWV4dGVybmFsXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImRlc2t0b3AtYnJvd3NlclwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8udHlwZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAudHlwZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0VHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hbmlmZXN0KGFwcDogQXBwRGVmaW5pdGlvbik6IHVua25vd24ge1xuXHRsZXQgbWFuaWZlc3Q6IHN0cmluZyB8IHVua25vd247XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIHJldHVybiBmZGMzSW50ZXJvcEFwaSAxLjIgYXMgdGhlIHBsYXRmb3JtIGN1cnJlbnRseSBzdXBwb3J0cyB0aGF0LlxuXHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHR1cmw6IChhcHA/LmRldGFpbHMgYXMgV2ViQXBwRGV0YWlscykudXJsLFxuXHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjEuMlwiXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gb3VyIG5hdGl2ZSBhcGkgc3VwcG9ydHMgcGF0aCBhbmQgYXJndW1lbnRzLlxuXHRcdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzIGFzIE5hdGl2ZUFwcERldGFpbHM7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bWFuaWZlc3QgPSAoYXBwPy5kZXRhaWxzIGFzIE9ubGluZU5hdGl2ZUFwcERldGFpbHMpLnVybDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnRlbnRzKGFwcDogQXBwRGVmaW5pdGlvbik6IEFwcEludGVudFtdIHtcblx0Y29uc3QgaW50ZW50czogQXBwSW50ZW50W10gPSBbXTtcblxuXHRpZiAoYXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gaW50ZW50cztcblx0fVxuXG5cdGNvbnN0IGludGVudElkcyA9IE9iamVjdC5rZXlzKGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0Zvcik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW50ZW50SWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgaW50ZW50TmFtZSA9IGludGVudElkc1tpXTtcblx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdGRpc3BsYXlOYW1lOiBhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3JbaW50ZW50TmFtZV0uZGlzcGxheU5hbWUsXG5cdFx0XHRjb250ZXh0czogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gaW50ZW50cztcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZW5kcG9pbnRJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0ZW5kcG9pbnQ6IGVuZHBvaW50SW1wbGVtZW50YXRpb25cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=