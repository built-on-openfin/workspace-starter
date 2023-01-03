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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
                images: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getImages(passedApp.images),
                private: _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__.getPrivate(passedApp)
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
                images: passedApp.screenshots,
                private: _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__.getPrivate(passedApp)
            };
            results.push(platformApp);
        }
    }
    else {
        logger.warn(`Unsupported FDC3 version passed: ${fdc3Version}. Unable to map apps.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
/* harmony export */   "getPrivate": () => (/* binding */ getPrivate),
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
function getPrivate(app) {
    if (app?.customConfig?.private !== undefined) {
        switch (app?.customConfig?.private) {
            case "False":
            case "false":
            case false:
                return false;
            default:
                // if someone has defined private then the likely hood was to override the default of false.
                return true;
        }
    }
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
/* harmony export */   "getManifestType": () => (/* binding */ getManifestType),
/* harmony export */   "getPrivate": () => (/* binding */ getPrivate)
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
                    url: (app?.details).url,
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
                manifest = (app?.details).url;
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
function getPrivate(app) {
    let privateApp;
    if (app?.hostManifests?.OpenFin?.config?.private !== undefined) {
        privateApp = app?.hostManifests?.OpenFin?.config?.private;
    }
    else if (app?.customConfig?.private !== undefined) {
        privateApp = app?.customConfig?.private;
    }
    if (privateApp !== undefined) {
        switch (privateApp) {
            case "False":
            case "false":
            case false:
                return false;
            default:
                // if someone has defined private then the likely hood was to override the default of false.
                return true;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9mZGMzLTEtMi1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMi0wLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFBsYXRmb3JtQXBwIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2FwcC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNPbmVQb2ludFR3b0hlbHBlciBmcm9tIFwiLi9mZGMzLTEtMi1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNUd29Qb2ludFplcm9IZWxwZXIgZnJvbSBcIi4vZmRjMy0yLTAtaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyB9IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcbikge1xuXHRsb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJGREMzIEFwcCBNYXBwZXJcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGZkYzNWZXJzaW9uOiBzdHJpbmc7XG5cdH0+LFxuXHRyZXF1ZXN0PzogdW5rbm93bltdIHwgeyBhcHBsaWNhdGlvbnM6IHVua25vd25bXSB9XG4pOiBQcm9taXNlPFBsYXRmb3JtQXBwW10+IHtcblx0Y29uc3QgcmVzdWx0czogUGxhdGZvcm1BcHBbXSA9IFtdO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblx0Y29uc3QgZmRjM1ZlcnNpb24gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmZkYzNWZXJzaW9uID8/IFwiMS4yXCI7XG5cdGxldCBhcHBsaWNhdGlvbnM7XG5cblx0aWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdCkpIHtcblx0XHRhcHBsaWNhdGlvbnMgPSByZXF1ZXN0O1xuXHR9IGVsc2Uge1xuXHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3QuYXBwbGljYXRpb25zO1xuXHR9XG5cdGlmIChmZGMzVmVyc2lvbiA9PT0gXCIxLjJcIikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25PbmVQb2ludFR3byA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd287XG5cdFx0XHRjb25zdCBwbGF0Zm9ybUFwcDogUGxhdGZvcm1BcHAgPSB7XG5cdFx0XHRcdGFwcElkOiBwYXNzZWRBcHAuYXBwSWQsXG5cdFx0XHRcdHRpdGxlOiBwYXNzZWRBcHAudGl0bGUgfHwgcGFzc2VkQXBwLm5hbWUsXG5cdFx0XHRcdG1hbmlmZXN0VHlwZTogcGFzc2VkQXBwLm1hbmlmZXN0VHlwZSxcblx0XHRcdFx0bWFuaWZlc3Q6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHBhc3NlZEFwcC5kZXNjcmlwdGlvbixcblx0XHRcdFx0aW50ZW50czogcGFzc2VkQXBwLmludGVudHMsXG5cdFx0XHRcdHRhZ3M6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRUYWdzKHBhc3NlZEFwcCksXG5cdFx0XHRcdHZlcnNpb246IHBhc3NlZEFwcC52ZXJzaW9uLFxuXHRcdFx0XHRwdWJsaXNoZXI6IHBhc3NlZEFwcC5wdWJsaXNoZXIsXG5cdFx0XHRcdGNvbnRhY3RFbWFpbDogcGFzc2VkQXBwLmNvbnRhY3RFbWFpbCxcblx0XHRcdFx0c3VwcG9ydEVtYWlsOiBwYXNzZWRBcHAuc3VwcG9ydEVtYWlsLFxuXHRcdFx0XHRpY29uczogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldEljb25zKHBhc3NlZEFwcC5pY29ucyksXG5cdFx0XHRcdGltYWdlczogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldEltYWdlcyhwYXNzZWRBcHAuaW1hZ2VzKSxcblx0XHRcdFx0cHJpdmF0ZTogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldFByaXZhdGUocGFzc2VkQXBwKVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdHMucHVzaChwbGF0Zm9ybUFwcCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGZkYzNWZXJzaW9uID09PSBcIjIuMFwiKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBsaWNhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHBhc3NlZEFwcDogQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvO1xuXHRcdFx0Y29uc3QgcGxhdGZvcm1BcHA6IFBsYXRmb3JtQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0TWFuaWZlc3RUeXBlKHBhc3NlZEFwcCksXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldE1hbmlmZXN0KHBhc3NlZEFwcCkgYXMgc3RyaW5nLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogcGFzc2VkQXBwLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpbnRlbnRzOiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldEludGVudHMocGFzc2VkQXBwKSxcblx0XHRcdFx0dGFnczogcGFzc2VkQXBwLmNhdGVnb3JpZXMsXG5cdFx0XHRcdHZlcnNpb246IHBhc3NlZEFwcC52ZXJzaW9uLFxuXHRcdFx0XHRwdWJsaXNoZXI6IHBhc3NlZEFwcC5wdWJsaXNoZXIsXG5cdFx0XHRcdGNvbnRhY3RFbWFpbDogcGFzc2VkQXBwLmNvbnRhY3RFbWFpbCxcblx0XHRcdFx0c3VwcG9ydEVtYWlsOiBwYXNzZWRBcHAuc3VwcG9ydEVtYWlsLFxuXHRcdFx0XHRpY29uczogcGFzc2VkQXBwLmljb25zLFxuXHRcdFx0XHRpbWFnZXM6IHBhc3NlZEFwcC5zY3JlZW5zaG90cyxcblx0XHRcdFx0cHJpdmF0ZTogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRQcml2YXRlKHBhc3NlZEFwcClcblx0XHRcdH07XG5cdFx0XHRyZXN1bHRzLnB1c2gocGxhdGZvcm1BcHApO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dnZXIud2FybihgVW5zdXBwb3J0ZWQgRkRDMyB2ZXJzaW9uIHBhc3NlZDogJHtmZGMzVmVyc2lvbn0uIFVuYWJsZSB0byBtYXAgYXBwcy5gKTtcblx0fVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cblx0cmV0dXJuIHJlc3VsdHM7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uLCBBcHBJY29uLCBBcHBJbWFnZSB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbnMoaWNvbnM6IEFwcEljb25bXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaWNvbnMpKSB7XG5cdFx0cmV0dXJuIGFwcEljb25zO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZXMoaW1hZ2VzOiBBcHBJbWFnZVtdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBhcHBJbWFnZXM7XG5cdH1cblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKHR5cGVvZiBhcHAubWFuaWZlc3QgPT09IFwic3RyaW5nXCIgJiYgYXBwLm1hbmlmZXN0LnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwLm1hbmlmZXN0KTtcblx0fVxuXG5cdHJldHVybiBhcHAubWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWdzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZ1tdIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9kb3Qtbm90YXRpb25cblx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBhcHBbXCJ0YWdzXCJdID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByaXZhdGUoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdGlmIChhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c3dpdGNoIChhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSkge1xuXHRcdFx0Y2FzZSBcIkZhbHNlXCI6XG5cdFx0XHRjYXNlIFwiZmFsc2VcIjpcblx0XHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIGlmIHNvbWVvbmUgaGFzIGRlZmluZWQgcHJpdmF0ZSB0aGVuIHRoZSBsaWtlbHkgaG9vZCB3YXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb2YgZmFsc2UuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBBcHBJbnRlbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdFdlYkFwcERldGFpbHMsXG5cdE5hdGl2ZUFwcERldGFpbHMsXG5cdE9ubGluZU5hdGl2ZUFwcERldGFpbHNcbn0gZnJvbSBcIi4vZmRjMy0yLTAtc2hhcGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdFR5cGUoYXBwOiBBcHBEZWZpbml0aW9uKTogc3RyaW5nIHtcblx0bGV0IG1hbmlmZXN0VHlwZTogc3RyaW5nO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLXZpZXdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLWV4dGVybmFsXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImRlc2t0b3AtYnJvd3NlclwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8udHlwZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAudHlwZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0VHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hbmlmZXN0KGFwcDogQXBwRGVmaW5pdGlvbik6IHVua25vd24ge1xuXHRsZXQgbWFuaWZlc3Q6IHN0cmluZyB8IHVua25vd247XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIHJldHVybiBmZGMzSW50ZXJvcEFwaSAxLjIgYXMgdGhlIHBsYXRmb3JtIGN1cnJlbnRseSBzdXBwb3J0cyB0aGF0LlxuXHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHR1cmw6IChhcHA/LmRldGFpbHMgYXMgV2ViQXBwRGV0YWlscykudXJsLFxuXHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjEuMlwiXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gb3VyIG5hdGl2ZSBhcGkgc3VwcG9ydHMgcGF0aCBhbmQgYXJndW1lbnRzLlxuXHRcdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzIGFzIE5hdGl2ZUFwcERldGFpbHM7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bWFuaWZlc3QgPSAoYXBwPy5kZXRhaWxzIGFzIE9ubGluZU5hdGl2ZUFwcERldGFpbHMpLnVybDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnRlbnRzKGFwcDogQXBwRGVmaW5pdGlvbik6IEFwcEludGVudFtdIHtcblx0Y29uc3QgaW50ZW50czogQXBwSW50ZW50W10gPSBbXTtcblxuXHRpZiAoYXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gaW50ZW50cztcblx0fVxuXG5cdGNvbnN0IGludGVudElkcyA9IE9iamVjdC5rZXlzKGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0Zvcik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW50ZW50SWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgaW50ZW50TmFtZSA9IGludGVudElkc1tpXTtcblx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdGRpc3BsYXlOYW1lOiBhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3JbaW50ZW50TmFtZV0uZGlzcGxheU5hbWUsXG5cdFx0XHRjb250ZXh0czogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByaXZhdGUoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdGxldCBwcml2YXRlQXBwOiB1bmtub3duO1xuXG5cdGlmIChhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8ucHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cHJpdmF0ZUFwcCA9IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5wcml2YXRlO1xuXHR9IGVsc2UgaWYgKGFwcD8uY3VzdG9tQ29uZmlnPy5wcml2YXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRwcml2YXRlQXBwID0gYXBwPy5jdXN0b21Db25maWc/LnByaXZhdGU7XG5cdH1cblxuXHRpZiAocHJpdmF0ZUFwcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c3dpdGNoIChwcml2YXRlQXBwKSB7XG5cdFx0XHRjYXNlIFwiRmFsc2VcIjpcblx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0Y2FzZSBmYWxzZTpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gaWYgc29tZW9uZSBoYXMgZGVmaW5lZCBwcml2YXRlIHRoZW4gdGhlIGxpa2VseSBob29kIHdhcyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvZiBmYWxzZS5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9