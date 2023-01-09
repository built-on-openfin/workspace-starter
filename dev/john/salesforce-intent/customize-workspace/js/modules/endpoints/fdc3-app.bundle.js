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
                appId: passedApp.appId ?? passedApp.name,
                title: passedApp.title ?? passedApp.name,
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
                appId: passedApp.appId ?? passedApp.name,
                title: passedApp.title ?? passedApp.name,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZmRjMy0xLTItaGVscGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9mZGMzLWFwcC9mZGMzLTItMC1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgKiBhcyBmZGMzT25lUG9pbnRUd29IZWxwZXIgZnJvbSBcIi4vZmRjMy0xLTItaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24gYXMgQXBwRGVmaW5pdGlvbk9uZVBvaW50VHdvIH0gZnJvbSBcIi4vZmRjMy0xLTItc2hhcGVzXCI7XG5pbXBvcnQgKiBhcyBmZGMzVHdvUG9pbnRaZXJvSGVscGVyIGZyb20gXCIuL2ZkYzMtMi0wLWhlbHBlclwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uIGFzIEFwcERlZmluaXRpb25Ud29Qb2ludFplcm8gfSBmcm9tIFwiLi9mZGMzLTItMC1zaGFwZXNcIjtcblxubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZShcblx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG4pIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiRkRDMyBBcHAgTWFwcGVyXCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRmZGMzVmVyc2lvbjogc3RyaW5nO1xuXHR9Pixcblx0cmVxdWVzdD86IHVua25vd25bXSB8IHsgYXBwbGljYXRpb25zOiB1bmtub3duW10gfVxuKTogUHJvbWlzZTxQbGF0Zm9ybUFwcFtdPiB7XG5cdGNvbnN0IHJlc3VsdHM6IFBsYXRmb3JtQXBwW10gPSBbXTtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cdGNvbnN0IGZkYzNWZXJzaW9uID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5mZGMzVmVyc2lvbiA/PyBcIjEuMlwiO1xuXHRsZXQgYXBwbGljYXRpb25zO1xuXG5cdGlmIChBcnJheS5pc0FycmF5KHJlcXVlc3QpKSB7XG5cdFx0YXBwbGljYXRpb25zID0gcmVxdWVzdDtcblx0fSBlbHNlIHtcblx0XHRhcHBsaWNhdGlvbnMgPSByZXF1ZXN0LmFwcGxpY2F0aW9ucztcblx0fVxuXHRpZiAoZmRjM1ZlcnNpb24gPT09IFwiMS4yXCIpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcGFzc2VkQXBwOiBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gPSBhcHBsaWNhdGlvbnNbaV0gYXMgQXBwRGVmaW5pdGlvbk9uZVBvaW50VHdvO1xuXHRcdFx0Y29uc3QgcGxhdGZvcm1BcHA6IFBsYXRmb3JtQXBwID0ge1xuXHRcdFx0XHRhcHBJZDogcGFzc2VkQXBwLmFwcElkID8/IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlID8/IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRtYW5pZmVzdFR5cGU6IHBhc3NlZEFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRcdG1hbmlmZXN0OiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0TWFuaWZlc3QocGFzc2VkQXBwKSBhcyBzdHJpbmcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBwYXNzZWRBcHAuZGVzY3JpcHRpb24sXG5cdFx0XHRcdGludGVudHM6IHBhc3NlZEFwcC5pbnRlbnRzLFxuXHRcdFx0XHR0YWdzOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0VGFncyhwYXNzZWRBcHApLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJY29ucyhwYXNzZWRBcHAuaWNvbnMpLFxuXHRcdFx0XHRpbWFnZXM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJbWFnZXMocGFzc2VkQXBwLmltYWdlcyksXG5cdFx0XHRcdHByaXZhdGU6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRQcml2YXRlKHBhc3NlZEFwcClcblx0XHRcdH07XG5cdFx0XHRyZXN1bHRzLnB1c2gocGxhdGZvcm1BcHApO1xuXHRcdH1cblx0fSBlbHNlIGlmIChmZGMzVmVyc2lvbiA9PT0gXCIyLjBcIikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25Ud29Qb2ludFplcm8gPSBhcHBsaWNhdGlvbnNbaV0gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybztcblx0XHRcdGNvbnN0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcCA9IHtcblx0XHRcdFx0YXBwSWQ6IHBhc3NlZEFwcC5hcHBJZCA/PyBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0dGl0bGU6IHBhc3NlZEFwcC50aXRsZSA/PyBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0bWFuaWZlc3RUeXBlOiBmZGMzVHdvUG9pbnRaZXJvSGVscGVyLmdldE1hbmlmZXN0VHlwZShwYXNzZWRBcHApLFxuXHRcdFx0XHRtYW5pZmVzdDogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHBhc3NlZEFwcC5kZXNjcmlwdGlvbixcblx0XHRcdFx0aW50ZW50czogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRJbnRlbnRzKHBhc3NlZEFwcCksXG5cdFx0XHRcdHRhZ3M6IHBhc3NlZEFwcC5jYXRlZ29yaWVzLFxuXHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0cHVibGlzaGVyOiBwYXNzZWRBcHAucHVibGlzaGVyLFxuXHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0aWNvbnM6IHBhc3NlZEFwcC5pY29ucyxcblx0XHRcdFx0aW1hZ2VzOiBwYXNzZWRBcHAuc2NyZWVuc2hvdHMsXG5cdFx0XHRcdHByaXZhdGU6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0UHJpdmF0ZShwYXNzZWRBcHApXG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0cy5wdXNoKHBsYXRmb3JtQXBwKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nZ2VyLndhcm4oYFVuc3VwcG9ydGVkIEZEQzMgdmVyc2lvbiBwYXNzZWQ6ICR7ZmRjM1ZlcnNpb259LiBVbmFibGUgdG8gbWFwIGFwcHMuYCk7XG5cdH1cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG5cdHJldHVybiByZXN1bHRzO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBJbWFnZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiwgQXBwSWNvbiwgQXBwSW1hZ2UgfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb25zKGljb25zOiBBcHBJY29uW10pOiBJbWFnZVtdIHtcblx0Y29uc3QgYXBwSWNvbnM6IEltYWdlW10gPSBbXTtcblx0aWYgKCFBcnJheS5pc0FycmF5KGljb25zKSkge1xuXHRcdHJldHVybiBhcHBJY29ucztcblx0fVxuXHRmb3IgKGNvbnN0IGFwcEljb24gb2YgaWNvbnMpIHtcblx0XHRhcHBJY29ucy5wdXNoKHsgc3JjOiBhcHBJY29uLmljb24gfSk7XG5cdH1cblx0cmV0dXJuIGFwcEljb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VzKGltYWdlczogQXBwSW1hZ2VbXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJbWFnZXM6IEltYWdlW10gPSBbXTtcblx0aWYgKCFBcnJheS5pc0FycmF5KGltYWdlcykpIHtcblx0XHRyZXR1cm4gYXBwSW1hZ2VzO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyBzcmM6IGFwcEltYWdlLnVybCB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3QoYXBwOiBBcHBEZWZpbml0aW9uKTogdW5rbm93biB7XG5cdGlmICh0eXBlb2YgYXBwLm1hbmlmZXN0ID09PSBcInN0cmluZ1wiICYmIGFwcC5tYW5pZmVzdC5zdGFydHNXaXRoKFwie1wiKSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcC5tYW5pZmVzdCk7XG5cdH1cblxuXHRyZXR1cm4gYXBwLm1hbmlmZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFncyhhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmdbXSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZG90LW5vdGF0aW9uXG5cdGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gYXBwW1widGFnc1wiXSA/PyBbXTtcblx0aWYgKHRhZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0dGFncy5wdXNoKGFwcC5tYW5pZmVzdFR5cGUpO1xuXHR9XG5cblx0cmV0dXJuIHRhZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcml2YXRlKGFwcDogQXBwRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xuXHRpZiAoYXBwPy5jdXN0b21Db25maWc/LnByaXZhdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHN3aXRjaCAoYXBwPy5jdXN0b21Db25maWc/LnByaXZhdGUpIHtcblx0XHRcdGNhc2UgXCJGYWxzZVwiOlxuXHRcdFx0Y2FzZSBcImZhbHNlXCI6XG5cdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvLyBpZiBzb21lb25lIGhhcyBkZWZpbmVkIHByaXZhdGUgdGhlbiB0aGUgbGlrZWx5IGhvb2Qgd2FzIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9mIGZhbHNlLlxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwSW50ZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRBcHBEZWZpbml0aW9uLFxuXHRXZWJBcHBEZXRhaWxzLFxuXHROYXRpdmVBcHBEZXRhaWxzLFxuXHRPbmxpbmVOYXRpdmVBcHBEZXRhaWxzXG59IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3RUeXBlKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB7XG5cdGxldCBtYW5pZmVzdFR5cGU6IHN0cmluZztcblxuXHRzd2l0Y2ggKGFwcC50eXBlKSB7XG5cdFx0Y2FzZSBcIndlYlwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS12aWV3XCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS1leHRlcm5hbFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJkZXNrdG9wLWJyb3dzZXJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LnR5cGU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLnR5cGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdFR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0bGV0IG1hbmlmZXN0OiBzdHJpbmcgfCB1bmtub3duO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdGlmIChhcHA/LmRldGFpbHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyByZXR1cm4gZmRjM0ludGVyb3BBcGkgMS4yIGFzIHRoZSBwbGF0Zm9ybSBjdXJyZW50bHkgc3VwcG9ydHMgdGhhdC5cblx0XHRcdFx0bWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIxLjJcIlxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIG91ciBuYXRpdmUgYXBpIHN1cHBvcnRzIHBhdGggYW5kIGFyZ3VtZW50cy5cblx0XHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscyBhcyBOYXRpdmVBcHBEZXRhaWxzO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG1hbmlmZXN0ID0gKGFwcD8uZGV0YWlscyBhcyBPbmxpbmVOYXRpdmVBcHBEZXRhaWxzKS51cmw7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm90aGVyXCI6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmRldGFpbHM7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscztcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZW50cyhhcHA6IEFwcERlZmluaXRpb24pOiBBcHBJbnRlbnRbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudFtdID0gW107XG5cblx0aWYgKGFwcD8uaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGludGVudHM7XG5cdH1cblxuXHRjb25zdCBpbnRlbnRJZHMgPSBPYmplY3Qua2V5cyhhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3IpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGludGVudElkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGludGVudE5hbWUgPSBpbnRlbnRJZHNbaV07XG5cdFx0aW50ZW50cy5wdXNoKHtcblx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRkaXNwbGF5TmFtZTogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmRpc3BsYXlOYW1lLFxuXHRcdFx0Y29udGV4dHM6IGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0ZvcltpbnRlbnROYW1lXS5jb250ZXh0c1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGludGVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcml2YXRlKGFwcDogQXBwRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xuXHRsZXQgcHJpdmF0ZUFwcDogdW5rbm93bjtcblxuXHRpZiAoYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/LnByaXZhdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHByaXZhdGVBcHAgPSBhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8ucHJpdmF0ZTtcblx0fSBlbHNlIGlmIChhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cHJpdmF0ZUFwcCA9IGFwcD8uY3VzdG9tQ29uZmlnPy5wcml2YXRlO1xuXHR9XG5cblx0aWYgKHByaXZhdGVBcHAgIT09IHVuZGVmaW5lZCkge1xuXHRcdHN3aXRjaCAocHJpdmF0ZUFwcCkge1xuXHRcdFx0Y2FzZSBcIkZhbHNlXCI6XG5cdFx0XHRjYXNlIFwiZmFsc2VcIjpcblx0XHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIGlmIHNvbWVvbmUgaGFzIGRlZmluZWQgcHJpdmF0ZSB0aGVuIHRoZSBsaWtlbHkgaG9vZCB3YXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb2YgZmFsc2UuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgKiBhcyBlbmRwb2ludEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogZW5kcG9pbnRJbXBsZW1lbnRhdGlvblxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==