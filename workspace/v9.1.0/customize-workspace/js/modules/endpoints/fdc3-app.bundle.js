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
    const fdc3Version = endpointDefinition?.options?.fdc3Version ?? "1.2";
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
                tags: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getTags(passedApp),
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
/* harmony export */   "getManifest": () => (/* binding */ getManifest),
/* harmony export */   "getTags": () => (/* binding */ getTags)
/* harmony export */ });
function getIcons(icons) {
    const appIcons = [];
    if (!Array.isArray(icons)) {
        return appIcons;
    }
    for (const appIcon of icons) {
        appIcons.push({ src: appIcon.icon });
    }
    return appIcons;
}
function getImages(images) {
    const appImages = [];
    if (!Array.isArray(images)) {
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
function getTags(app) {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const tags = app["tags"] ?? [];
    if (tags.length === 0) {
        tags.push(app.manifestType);
    }
    return tags;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMS0yLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZmRjMy0yLTAtaGVscGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQXBwIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZmRjM09uZVBvaW50VHdvSGVscGVyIGZyb20gXCIuL2ZkYzMtMS0yLWhlbHBlclwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uIGFzIEFwcERlZmluaXRpb25PbmVQb2ludFR3byB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZmRjM1R3b1BvaW50WmVyb0hlbHBlciBmcm9tIFwiLi9mZGMzLTItMC1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvIH0gZnJvbSBcIi4vZmRjMy0yLTAtc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzPzogbmV2ZXIpIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiRkRDMyBBcHAgTWFwcGVyXCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRmZGMzVmVyc2lvbjogc3RyaW5nO1xuXHR9Pixcblx0cmVxdWVzdD86IHVua25vd25bXSB8IHsgYXBwbGljYXRpb25zOiB1bmtub3duW10gfVxuKTogUHJvbWlzZTxBcHBbXT4ge1xuXHRjb25zdCByZXN1bHRzOiBBcHBbXSA9IFtdO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblx0Y29uc3QgZmRjM1ZlcnNpb24gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmZkYzNWZXJzaW9uID8/IFwiMS4yXCI7XG5cdGxldCBhcHBsaWNhdGlvbnM7XG5cblx0aWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdCkpIHtcblx0XHRhcHBsaWNhdGlvbnMgPSByZXF1ZXN0O1xuXHR9IGVsc2Uge1xuXHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3QuYXBwbGljYXRpb25zO1xuXHR9XG5cdGlmIChmZGMzVmVyc2lvbiA9PT0gXCIxLjJcIikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25PbmVQb2ludFR3byA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd287XG5cdFx0XHRjb25zdCBwbGF0Zm9ybUFwcDogQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IHBhc3NlZEFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0TWFuaWZlc3QocGFzc2VkQXBwKSBhcyBzdHJpbmcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBwYXNzZWRBcHAuZGVzY3JpcHRpb24sXG5cdFx0XHRcdGludGVudHM6IHBhc3NlZEFwcC5pbnRlbnRzLFxuXHRcdFx0XHR0YWdzOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0VGFncyhwYXNzZWRBcHApLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJY29ucyhwYXNzZWRBcHAuaWNvbnMpLFxuXHRcdFx0XHRpbWFnZXM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJbWFnZXMocGFzc2VkQXBwLmltYWdlcylcblx0XHRcdH07XG5cdFx0XHRyZXN1bHRzLnB1c2gocGxhdGZvcm1BcHApO1xuXHRcdH1cblx0fSBlbHNlIGlmIChmZGMzVmVyc2lvbiA9PT0gXCIyLjBcIikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25Ud29Qb2ludFplcm8gPSBhcHBsaWNhdGlvbnNbaV0gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybztcblx0XHRcdGNvbnN0IHBsYXRmb3JtQXBwOiBBcHAgPSB7XG5cdFx0XHRcdGFwcElkOiBwYXNzZWRBcHAuYXBwSWQsXG5cdFx0XHRcdHRpdGxlOiBwYXNzZWRBcHAudGl0bGUgfHwgcGFzc2VkQXBwLm5hbWUsXG5cdFx0XHRcdG1hbmlmZXN0VHlwZTogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdFR5cGUocGFzc2VkQXBwKSxcblx0XHRcdFx0bWFuaWZlc3Q6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0TWFuaWZlc3QocGFzc2VkQXBwKSBhcyBzdHJpbmcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBwYXNzZWRBcHAuZGVzY3JpcHRpb24sXG5cdFx0XHRcdGludGVudHM6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0SW50ZW50cyhwYXNzZWRBcHApLFxuXHRcdFx0XHR0YWdzOiBwYXNzZWRBcHAuY2F0ZWdvcmllcyxcblx0XHRcdFx0dmVyc2lvbjogcGFzc2VkQXBwLnZlcnNpb24sXG5cdFx0XHRcdHB1Ymxpc2hlcjogcGFzc2VkQXBwLnB1Ymxpc2hlcixcblx0XHRcdFx0Y29udGFjdEVtYWlsOiBwYXNzZWRBcHAuY29udGFjdEVtYWlsLFxuXHRcdFx0XHRzdXBwb3J0RW1haWw6IHBhc3NlZEFwcC5zdXBwb3J0RW1haWwsXG5cdFx0XHRcdGljb25zOiBwYXNzZWRBcHAuaWNvbnMsXG5cdFx0XHRcdGltYWdlczogcGFzc2VkQXBwLnNjcmVlbnNob3RzXG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0cy5wdXNoKHBsYXRmb3JtQXBwKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nZ2VyLndhcm4oYFVuc3VwcG9ydGVkIEZEQzMgdmVyc2lvbiBwYXNzZWQ6ICR7ZmRjM1ZlcnNpb259LiBVbmFibGUgdG8gbWFwIGFwcHMuYCk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uLCBBcHBJY29uLCBBcHBJbWFnZSB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbnMoaWNvbnM6IEFwcEljb25bXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaWNvbnMpKSB7XG5cdFx0cmV0dXJuIGFwcEljb25zO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZXMoaW1hZ2VzOiBBcHBJbWFnZVtdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBhcHBJbWFnZXM7XG5cdH1cblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKHR5cGVvZiBhcHAubWFuaWZlc3QgPT09IFwic3RyaW5nXCIgJiYgYXBwLm1hbmlmZXN0LnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwLm1hbmlmZXN0KTtcblx0fVxuXG5cdHJldHVybiBhcHAubWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWdzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZ1tdIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9kb3Qtbm90YXRpb25cblx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBhcHBbXCJ0YWdzXCJdID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwSW50ZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRBcHBEZWZpbml0aW9uLFxuXHRXZWJBcHBEZXRhaWxzLFxuXHROYXRpdmVBcHBEZXRhaWxzLFxuXHRPbmxpbmVOYXRpdmVBcHBEZXRhaWxzXG59IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3RUeXBlKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB7XG5cdGxldCBtYW5pZmVzdFR5cGU6IHN0cmluZztcblxuXHRzd2l0Y2ggKGFwcC50eXBlKSB7XG5cdFx0Y2FzZSBcIndlYlwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS12aWV3XCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS1leHRlcm5hbFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJkZXNrdG9wLWJyb3dzZXJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LnR5cGU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLnR5cGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdFR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0bGV0IG1hbmlmZXN0OiBzdHJpbmcgfCB1bmtub3duO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdGlmIChhcHA/LmRldGFpbHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyByZXR1cm4gZmRjM0ludGVyb3BBcGkgMS4yIGFzIHRoZSBwbGF0Zm9ybSBjdXJyZW50bHkgc3VwcG9ydHMgdGhhdC5cblx0XHRcdFx0bWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIxLjJcIlxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIG91ciBuYXRpdmUgYXBpIHN1cHBvcnRzIHBhdGggYW5kIGFyZ3VtZW50cy5cblx0XHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscyBhcyBOYXRpdmVBcHBEZXRhaWxzO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG1hbmlmZXN0ID0gKGFwcD8uZGV0YWlscyBhcyBPbmxpbmVOYXRpdmVBcHBEZXRhaWxzKS51cmw7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm90aGVyXCI6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmRldGFpbHM7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscztcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZW50cyhhcHA6IEFwcERlZmluaXRpb24pOiBBcHBJbnRlbnRbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudFtdID0gW107XG5cblx0aWYgKGFwcD8uaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGludGVudHM7XG5cdH1cblxuXHRjb25zdCBpbnRlbnRJZHMgPSBPYmplY3Qua2V5cyhhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3IpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGludGVudElkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGludGVudE5hbWUgPSBpbnRlbnRJZHNbaV07XG5cdFx0aW50ZW50cy5wdXNoKHtcblx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRkaXNwbGF5TmFtZTogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmRpc3BsYXlOYW1lLFxuXHRcdFx0Y29udGV4dHM6IGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0ZvcltpbnRlbnROYW1lXS5jb250ZXh0c1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGludGVudHM7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9