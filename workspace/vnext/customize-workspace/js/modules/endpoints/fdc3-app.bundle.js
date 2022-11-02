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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9mZGMzLTEtMi1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMi0wLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNPbmVQb2ludFR3b0hlbHBlciBmcm9tIFwiLi9mZGMzLTEtMi1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNUd29Qb2ludFplcm9IZWxwZXIgZnJvbSBcIi4vZmRjMy0yLTAtaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyB9IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sIGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvciwgaGVscGVycz86IG5ldmVyKSB7XG5cdGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkZEQzMgQXBwIE1hcHBlclwiKTtcblx0bG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0ZmRjM1ZlcnNpb246IHN0cmluZztcblx0fT4sXG5cdHJlcXVlc3Q/OiB1bmtub3duW10gfCB7IGFwcGxpY2F0aW9uczogdW5rbm93bltdIH1cbik6IFByb21pc2U8QXBwW10+IHtcblx0Y29uc3QgcmVzdWx0czogQXBwW10gPSBbXTtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cdGNvbnN0IGZkYzNWZXJzaW9uID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5mZGMzVmVyc2lvbiA/PyBcIjEuMlwiO1xuXHRsZXQgYXBwbGljYXRpb25zO1xuXG5cdGlmIChBcnJheS5pc0FycmF5KHJlcXVlc3QpKSB7XG5cdFx0YXBwbGljYXRpb25zID0gcmVxdWVzdDtcblx0fSBlbHNlIHtcblx0XHRhcHBsaWNhdGlvbnMgPSByZXF1ZXN0LmFwcGxpY2F0aW9ucztcblx0fVxuXHRpZiAoZmRjM1ZlcnNpb24gPT09IFwiMS4yXCIpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcGFzc2VkQXBwOiBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gPSBhcHBsaWNhdGlvbnNbaV0gYXMgQXBwRGVmaW5pdGlvbk9uZVBvaW50VHdvO1xuXHRcdFx0Y29uc3QgcGxhdGZvcm1BcHA6IEFwcCA9IHtcblx0XHRcdFx0YXBwSWQ6IHBhc3NlZEFwcC5hcHBJZCxcblx0XHRcdFx0dGl0bGU6IHBhc3NlZEFwcC50aXRsZSB8fCBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0bWFuaWZlc3RUeXBlOiBwYXNzZWRBcHAubWFuaWZlc3RUeXBlLFxuXHRcdFx0XHRtYW5pZmVzdDogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldE1hbmlmZXN0KHBhc3NlZEFwcCkgYXMgc3RyaW5nLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogcGFzc2VkQXBwLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpbnRlbnRzOiBwYXNzZWRBcHAuaW50ZW50cyxcblx0XHRcdFx0dGFnczogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldFRhZ3MocGFzc2VkQXBwKSxcblx0XHRcdFx0dmVyc2lvbjogcGFzc2VkQXBwLnZlcnNpb24sXG5cdFx0XHRcdHB1Ymxpc2hlcjogcGFzc2VkQXBwLnB1Ymxpc2hlcixcblx0XHRcdFx0Y29udGFjdEVtYWlsOiBwYXNzZWRBcHAuY29udGFjdEVtYWlsLFxuXHRcdFx0XHRzdXBwb3J0RW1haWw6IHBhc3NlZEFwcC5zdXBwb3J0RW1haWwsXG5cdFx0XHRcdGljb25zOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0SWNvbnMocGFzc2VkQXBwLmljb25zKSxcblx0XHRcdFx0aW1hZ2VzOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0SW1hZ2VzKHBhc3NlZEFwcC5pbWFnZXMpXG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0cy5wdXNoKHBsYXRmb3JtQXBwKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoZmRjM1ZlcnNpb24gPT09IFwiMi4wXCIpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcGFzc2VkQXBwOiBBcHBEZWZpbml0aW9uVHdvUG9pbnRaZXJvID0gYXBwbGljYXRpb25zW2ldIGFzIEFwcERlZmluaXRpb25Ud29Qb2ludFplcm87XG5cdFx0XHRjb25zdCBwbGF0Zm9ybUFwcDogQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0TWFuaWZlc3RUeXBlKHBhc3NlZEFwcCksXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldE1hbmlmZXN0KHBhc3NlZEFwcCkgYXMgc3RyaW5nLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogcGFzc2VkQXBwLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpbnRlbnRzOiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldEludGVudHMocGFzc2VkQXBwKSxcblx0XHRcdFx0dGFnczogcGFzc2VkQXBwLmNhdGVnb3JpZXMsXG5cdFx0XHRcdHZlcnNpb246IHBhc3NlZEFwcC52ZXJzaW9uLFxuXHRcdFx0XHRwdWJsaXNoZXI6IHBhc3NlZEFwcC5wdWJsaXNoZXIsXG5cdFx0XHRcdGNvbnRhY3RFbWFpbDogcGFzc2VkQXBwLmNvbnRhY3RFbWFpbCxcblx0XHRcdFx0c3VwcG9ydEVtYWlsOiBwYXNzZWRBcHAuc3VwcG9ydEVtYWlsLFxuXHRcdFx0XHRpY29uczogcGFzc2VkQXBwLmljb25zLFxuXHRcdFx0XHRpbWFnZXM6IHBhc3NlZEFwcC5zY3JlZW5zaG90c1xuXHRcdFx0fTtcblx0XHRcdHJlc3VsdHMucHVzaChwbGF0Zm9ybUFwcCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGxvZ2dlci53YXJuKGBVbnN1cHBvcnRlZCBGREMzIHZlcnNpb24gcGFzc2VkOiAke2ZkYzNWZXJzaW9ufS4gVW5hYmxlIHRvIG1hcCBhcHBzLmApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBJbWFnZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiwgQXBwSWNvbiwgQXBwSW1hZ2UgfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb25zKGljb25zOiBBcHBJY29uW10pOiBJbWFnZVtdIHtcblx0Y29uc3QgYXBwSWNvbnM6IEltYWdlW10gPSBbXTtcblx0aWYgKCFBcnJheS5pc0FycmF5KGljb25zKSkge1xuXHRcdHJldHVybiBhcHBJY29ucztcblx0fVxuXHRmb3IgKGNvbnN0IGFwcEljb24gb2YgaWNvbnMpIHtcblx0XHRhcHBJY29ucy5wdXNoKHsgc3JjOiBhcHBJY29uLmljb24gfSk7XG5cdH1cblx0cmV0dXJuIGFwcEljb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VzKGltYWdlczogQXBwSW1hZ2VbXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJbWFnZXM6IEltYWdlW10gPSBbXTtcblx0aWYgKCFBcnJheS5pc0FycmF5KGltYWdlcykpIHtcblx0XHRyZXR1cm4gYXBwSW1hZ2VzO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyBzcmM6IGFwcEltYWdlLnVybCB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3QoYXBwOiBBcHBEZWZpbml0aW9uKTogdW5rbm93biB7XG5cdGlmICh0eXBlb2YgYXBwLm1hbmlmZXN0ID09PSBcInN0cmluZ1wiICYmIGFwcC5tYW5pZmVzdC5zdGFydHNXaXRoKFwie1wiKSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcC5tYW5pZmVzdCk7XG5cdH1cblxuXHRyZXR1cm4gYXBwLm1hbmlmZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFncyhhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmdbXSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZG90LW5vdGF0aW9uXG5cdGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gYXBwW1widGFnc1wiXSA/PyBbXTtcblx0aWYgKHRhZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0dGFncy5wdXNoKGFwcC5tYW5pZmVzdFR5cGUpO1xuXHR9XG5cblx0cmV0dXJuIHRhZ3M7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEFwcEludGVudCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHtcblx0QXBwRGVmaW5pdGlvbixcblx0V2ViQXBwRGV0YWlscyxcblx0TmF0aXZlQXBwRGV0YWlscyxcblx0T25saW5lTmF0aXZlQXBwRGV0YWlsc1xufSBmcm9tIFwiLi9mZGMzLTItMC1zaGFwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hbmlmZXN0VHlwZShhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmcge1xuXHRsZXQgbWFuaWZlc3RUeXBlOiBzdHJpbmc7XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJpbmxpbmUtdmlld1wiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJpbmxpbmUtZXh0ZXJuYWxcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib25saW5lTmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiZGVza3RvcC1icm93c2VyXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm90aGVyXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IGFwcC5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy50eXBlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IGFwcC50eXBlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3RUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3QoYXBwOiBBcHBEZWZpbml0aW9uKTogdW5rbm93biB7XG5cdGxldCBtYW5pZmVzdDogc3RyaW5nIHwgdW5rbm93bjtcblxuXHRzd2l0Y2ggKGFwcC50eXBlKSB7XG5cdFx0Y2FzZSBcIndlYlwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gcmV0dXJuIGZkYzNJbnRlcm9wQXBpIDEuMiBhcyB0aGUgcGxhdGZvcm0gY3VycmVudGx5IHN1cHBvcnRzIHRoYXQuXG5cdFx0XHRcdG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdHVybDogKGFwcD8uZGV0YWlscyBhcyBXZWJBcHBEZXRhaWxzKS51cmwsXG5cdFx0XHRcdFx0ZmRjM0ludGVyb3BBcGk6IFwiMS4yXCJcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdGlmIChhcHA/LmRldGFpbHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyBvdXIgbmF0aXZlIGFwaSBzdXBwb3J0cyBwYXRoIGFuZCBhcmd1bWVudHMuXG5cdFx0XHRcdG1hbmlmZXN0ID0gYXBwLmRldGFpbHMgYXMgTmF0aXZlQXBwRGV0YWlscztcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib25saW5lTmF0aXZlXCI6IHtcblx0XHRcdGlmIChhcHA/LmRldGFpbHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtYW5pZmVzdCA9IChhcHA/LmRldGFpbHMgYXMgT25saW5lTmF0aXZlQXBwRGV0YWlscykudXJsO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5kZXRhaWxzO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmRldGFpbHM7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVudHMoYXBwOiBBcHBEZWZpbml0aW9uKTogQXBwSW50ZW50W10ge1xuXHRjb25zdCBpbnRlbnRzOiBBcHBJbnRlbnRbXSA9IFtdO1xuXG5cdGlmIChhcHA/LmludGVyb3A/LmludGVudHM/Lmxpc3RlbnNGb3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBpbnRlbnRzO1xuXHR9XG5cblx0Y29uc3QgaW50ZW50SWRzID0gT2JqZWN0LmtleXMoYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbnRlbnRJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBpbnRlbnROYW1lID0gaW50ZW50SWRzW2ldO1xuXHRcdGludGVudHMucHVzaCh7XG5cdFx0XHRuYW1lOiBpbnRlbnROYW1lLFxuXHRcdFx0ZGlzcGxheU5hbWU6IGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0ZvcltpbnRlbnROYW1lXS5kaXNwbGF5TmFtZSxcblx0XHRcdGNvbnRleHRzOiBhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3JbaW50ZW50TmFtZV0uY29udGV4dHNcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBpbnRlbnRzO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgKiBhcyBlbmRwb2ludEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogZW5kcG9pbnRJbXBsZW1lbnRhdGlvblxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==