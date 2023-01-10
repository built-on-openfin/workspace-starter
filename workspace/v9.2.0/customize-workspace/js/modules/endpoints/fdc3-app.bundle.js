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
    for (let i = 0; i < applications.length; i++) {
        let platformApp;
        if (fdc3Version === "1.2") {
            const passedApp = applications[i];
            platformApp = {
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
        }
        else if (fdc3Version === "2.0") {
            const passedApp = applications[i];
            platformApp = {
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
        }
        if (!Array.isArray(platformApp.icons)) {
            platformApp.icons = [];
        }
        if (platformApp.icons.length === 0 && endpointDefinition.options?.fallbackIcon !== undefined) {
            platformApp.icons.push({ src: endpointDefinition.options.fallbackIcon });
        }
        results.push(platformApp);
    }
    if (applications.length > 0 && results.length === 0) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xxRDtBQUU5QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLHNDQUFzQjtDQUNoQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9mZGMzLTEtMi1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMi0wLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNPbmVQb2ludFR3b0hlbHBlciBmcm9tIFwiLi9mZGMzLTEtMi1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNUd29Qb2ludFplcm9IZWxwZXIgZnJvbSBcIi4vZmRjMy0yLTAtaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyB9IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcbikge1xuXHRsb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJGREMzIEFwcCBNYXBwZXJcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGZkYzNWZXJzaW9uOiBzdHJpbmc7XG5cdFx0ZmFsbGJhY2tJY29uOiBzdHJpbmc7XG5cdH0+LFxuXHRyZXF1ZXN0PzogdW5rbm93bltdIHwgeyBhcHBsaWNhdGlvbnM6IHVua25vd25bXSB9XG4pOiBQcm9taXNlPEFwcFtdPiB7XG5cdGNvbnN0IHJlc3VsdHM6IEFwcFtdID0gW107XG5cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXHRjb25zdCBmZGMzVmVyc2lvbiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZmRjM1ZlcnNpb24gPz8gXCIxLjJcIjtcblx0bGV0IGFwcGxpY2F0aW9ucztcblxuXHRpZiAoQXJyYXkuaXNBcnJheShyZXF1ZXN0KSkge1xuXHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3Q7XG5cdH0gZWxzZSB7XG5cdFx0YXBwbGljYXRpb25zID0gcmVxdWVzdC5hcHBsaWNhdGlvbnM7XG5cdH1cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBsaWNhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgcGxhdGZvcm1BcHA6IEFwcDtcblx0XHRpZiAoZmRjM1ZlcnNpb24gPT09IFwiMS4yXCIpIHtcblx0XHRcdGNvbnN0IHBhc3NlZEFwcDogQXBwRGVmaW5pdGlvbk9uZVBvaW50VHdvID0gYXBwbGljYXRpb25zW2ldIGFzIEFwcERlZmluaXRpb25PbmVQb2ludFR3bztcblx0XHRcdHBsYXRmb3JtQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IHBhc3NlZEFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0TWFuaWZlc3QocGFzc2VkQXBwKSBhcyBzdHJpbmcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBwYXNzZWRBcHAuZGVzY3JpcHRpb24sXG5cdFx0XHRcdGludGVudHM6IHBhc3NlZEFwcC5pbnRlbnRzLFxuXHRcdFx0XHR0YWdzOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0VGFncyhwYXNzZWRBcHApLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJY29ucyhwYXNzZWRBcHAuaWNvbnMpLFxuXHRcdFx0XHRpbWFnZXM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJbWFnZXMocGFzc2VkQXBwLmltYWdlcylcblx0XHRcdH07XG5cdFx0fSBlbHNlIGlmIChmZGMzVmVyc2lvbiA9PT0gXCIyLjBcIikge1xuXHRcdFx0Y29uc3QgcGFzc2VkQXBwOiBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvID0gYXBwbGljYXRpb25zW2ldIGFzIEFwcERlZmluaXRpb25Ud29Qb2ludFplcm87XG5cdFx0XHRwbGF0Zm9ybUFwcCA9IHtcblx0XHRcdFx0YXBwSWQ6IHBhc3NlZEFwcC5hcHBJZCxcblx0XHRcdFx0dGl0bGU6IHBhc3NlZEFwcC50aXRsZSB8fCBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0bWFuaWZlc3RUeXBlOiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldE1hbmlmZXN0VHlwZShwYXNzZWRBcHApLFxuXHRcdFx0XHRtYW5pZmVzdDogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHBhc3NlZEFwcC5kZXNjcmlwdGlvbixcblx0XHRcdFx0aW50ZW50czogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRJbnRlbnRzKHBhc3NlZEFwcCksXG5cdFx0XHRcdHRhZ3M6IHBhc3NlZEFwcC5jYXRlZ29yaWVzLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IHBhc3NlZEFwcC5pY29ucyxcblx0XHRcdFx0aW1hZ2VzOiBwYXNzZWRBcHAuc2NyZWVuc2hvdHNcblx0XHRcdH07XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShwbGF0Zm9ybUFwcC5pY29ucykpIHtcblx0XHRcdHBsYXRmb3JtQXBwLmljb25zID0gW107XG5cdFx0fVxuXHRcdGlmIChwbGF0Zm9ybUFwcC5pY29ucy5sZW5ndGggPT09IDAgJiYgZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM/LmZhbGxiYWNrSWNvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwbGF0Zm9ybUFwcC5pY29ucy5wdXNoKHsgc3JjOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5mYWxsYmFja0ljb24gfSk7XG5cdFx0fVxuXHRcdHJlc3VsdHMucHVzaChwbGF0Zm9ybUFwcCk7XG5cdH1cblx0aWYgKGFwcGxpY2F0aW9ucy5sZW5ndGggPiAwICYmIHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nZ2VyLndhcm4oYFVuc3VwcG9ydGVkIEZEQzMgdmVyc2lvbiBwYXNzZWQ6ICR7ZmRjM1ZlcnNpb259LiBVbmFibGUgdG8gbWFwIGFwcHMuYCk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uLCBBcHBJY29uLCBBcHBJbWFnZSB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbnMoaWNvbnM6IEFwcEljb25bXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaWNvbnMpKSB7XG5cdFx0cmV0dXJuIGFwcEljb25zO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZXMoaW1hZ2VzOiBBcHBJbWFnZVtdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBhcHBJbWFnZXM7XG5cdH1cblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKHR5cGVvZiBhcHAubWFuaWZlc3QgPT09IFwic3RyaW5nXCIgJiYgYXBwLm1hbmlmZXN0LnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwLm1hbmlmZXN0KTtcblx0fVxuXG5cdHJldHVybiBhcHAubWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWdzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZ1tdIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9kb3Qtbm90YXRpb25cblx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBhcHBbXCJ0YWdzXCJdID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwSW50ZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRBcHBEZWZpbml0aW9uLFxuXHRXZWJBcHBEZXRhaWxzLFxuXHROYXRpdmVBcHBEZXRhaWxzLFxuXHRPbmxpbmVOYXRpdmVBcHBEZXRhaWxzXG59IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3RUeXBlKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB7XG5cdGxldCBtYW5pZmVzdFR5cGU6IHN0cmluZztcblxuXHRzd2l0Y2ggKGFwcC50eXBlKSB7XG5cdFx0Y2FzZSBcIndlYlwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS12aWV3XCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS1leHRlcm5hbFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJkZXNrdG9wLWJyb3dzZXJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LnR5cGU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLnR5cGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdFR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0bGV0IG1hbmlmZXN0OiBzdHJpbmcgfCB1bmtub3duO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdGlmIChhcHA/LmRldGFpbHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyByZXR1cm4gZmRjM0ludGVyb3BBcGkgMS4yIGFzIHRoZSBwbGF0Zm9ybSBjdXJyZW50bHkgc3VwcG9ydHMgdGhhdC5cblx0XHRcdFx0bWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIxLjJcIlxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIG91ciBuYXRpdmUgYXBpIHN1cHBvcnRzIHBhdGggYW5kIGFyZ3VtZW50cy5cblx0XHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscyBhcyBOYXRpdmVBcHBEZXRhaWxzO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG1hbmlmZXN0ID0gKGFwcD8uZGV0YWlscyBhcyBPbmxpbmVOYXRpdmVBcHBEZXRhaWxzKS51cmw7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm90aGVyXCI6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmRldGFpbHM7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscztcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZW50cyhhcHA6IEFwcERlZmluaXRpb24pOiBBcHBJbnRlbnRbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudFtdID0gW107XG5cblx0aWYgKGFwcD8uaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGludGVudHM7XG5cdH1cblxuXHRjb25zdCBpbnRlbnRJZHMgPSBPYmplY3Qua2V5cyhhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3IpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGludGVudElkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGludGVudE5hbWUgPSBpbnRlbnRJZHNbaV07XG5cdFx0aW50ZW50cy5wdXNoKHtcblx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRkaXNwbGF5TmFtZTogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmRpc3BsYXlOYW1lLFxuXHRcdFx0Y29udGV4dHM6IGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0ZvcltpbnRlbnROYW1lXS5jb250ZXh0c1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGludGVudHM7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGVuZHBvaW50SW1wbGVtZW50YXRpb24gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9