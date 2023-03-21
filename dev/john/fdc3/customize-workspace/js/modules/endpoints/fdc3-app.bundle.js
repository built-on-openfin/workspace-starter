/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/fdc3-app/endpoint.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/endpoints/fdc3-app/endpoint.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FDC3AppMapperEndpoint": () => (/* binding */ FDC3AppMapperEndpoint)
/* harmony export */ });
/* harmony import */ var _fdc3_1_2_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fdc3-1-2-helper */ "./client/src/modules/endpoints/fdc3-app/fdc3-1-2-helper.ts");
/* harmony import */ var _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fdc3-2-0-helper */ "./client/src/modules/endpoints/fdc3-app/fdc3-2-0-helper.ts");


class FDC3AppMapperEndpoint {
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("FDC3AppMapperEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Handle a request response on an endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        const results = [];
        if (endpointDefinition.type !== "module") {
            this._logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
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
                    customConfig: passedApp.customConfig,
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
                    customConfig: passedApp.customConfig,
                    tags: passedApp.categories,
                    version: passedApp.version,
                    publisher: passedApp.publisher,
                    contactEmail: passedApp.contactEmail,
                    supportEmail: passedApp.supportEmail,
                    icons: passedApp.icons,
                    images: passedApp.screenshots,
                    private: _fdc3_2_0_helper__WEBPACK_IMPORTED_MODULE_1__.getPrivate(passedApp)
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
            this._logger.warn(`Unsupported FDC3 version passed: ${fdc3Version}. Unable to map apps.`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return results;
    }
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
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.FDC3AppMapperEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O1NDakhEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMbUQ7QUFFNUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLDREQUFxQixFQUFFO0NBQ3JDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2ZkYzMtMS0yLWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZmRjMy1hcHAvZmRjMy0yLTAtaGVscGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2ZkYzMtYXBwL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUGxhdGZvcm1BcHAgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludCwgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNPbmVQb2ludFR3b0hlbHBlciBmcm9tIFwiLi9mZGMzLTEtMi1oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd28gfSBmcm9tIFwiLi9mZGMzLTEtMi1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGZkYzNUd29Qb2ludFplcm9IZWxwZXIgZnJvbSBcIi4vZmRjMy0yLTAtaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IEFwcERlZmluaXRpb24gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybyB9IGZyb20gXCIuL2ZkYzMtMi0wLXNoYXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRkRDM0FwcE1hcHBlckVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQge1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzOiBNb2R1bGVIZWxwZXJzKSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiRkRDM0FwcE1hcHBlckVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0XHRmZGMzVmVyc2lvbjogc3RyaW5nO1xuXHRcdFx0ZmFsbGJhY2tJY29uOiBzdHJpbmc7XG5cdFx0fT4sXG5cdFx0cmVxdWVzdD86IHVua25vd25bXSB8IHsgYXBwbGljYXRpb25zOiB1bmtub3duW10gfVxuXHQpOiBQcm9taXNlPFBsYXRmb3JtQXBwW10+IHtcblx0XHRjb25zdCByZXN1bHRzOiBQbGF0Zm9ybUFwcFtdID0gW107XG5cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9XG5cblx0XHRjb25zdCBmZGMzVmVyc2lvbiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZmRjM1ZlcnNpb24gPz8gXCIxLjJcIjtcblx0XHRsZXQgYXBwbGljYXRpb25zO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdCkpIHtcblx0XHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFwcGxpY2F0aW9ucyA9IHJlcXVlc3QuYXBwbGljYXRpb25zO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcDtcblx0XHRcdGlmIChmZGMzVmVyc2lvbiA9PT0gXCIxLjJcIikge1xuXHRcdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25PbmVQb2ludFR3byA9IGFwcGxpY2F0aW9uc1tpXSBhcyBBcHBEZWZpbml0aW9uT25lUG9pbnRUd287XG5cdFx0XHRcdHBsYXRmb3JtQXBwID0ge1xuXHRcdFx0XHRcdGFwcElkOiBwYXNzZWRBcHAuYXBwSWQsXG5cdFx0XHRcdFx0dGl0bGU6IHBhc3NlZEFwcC50aXRsZSB8fCBwYXNzZWRBcHAubmFtZSxcblx0XHRcdFx0XHRtYW5pZmVzdFR5cGU6IHBhc3NlZEFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRcdFx0bWFuaWZlc3Q6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogcGFzc2VkQXBwLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRcdGN1c3RvbUNvbmZpZzogcGFzc2VkQXBwLmN1c3RvbUNvbmZpZyxcblx0XHRcdFx0XHRpbnRlbnRzOiBwYXNzZWRBcHAuaW50ZW50cyxcblx0XHRcdFx0XHR0YWdzOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0VGFncyhwYXNzZWRBcHApLFxuXHRcdFx0XHRcdHZlcnNpb246IHBhc3NlZEFwcC52ZXJzaW9uLFxuXHRcdFx0XHRcdHB1Ymxpc2hlcjogcGFzc2VkQXBwLnB1Ymxpc2hlcixcblx0XHRcdFx0XHRjb250YWN0RW1haWw6IHBhc3NlZEFwcC5jb250YWN0RW1haWwsXG5cdFx0XHRcdFx0c3VwcG9ydEVtYWlsOiBwYXNzZWRBcHAuc3VwcG9ydEVtYWlsLFxuXHRcdFx0XHRcdGljb25zOiBmZGMzT25lUG9pbnRUd29IZWxwZXIuZ2V0SWNvbnMocGFzc2VkQXBwLmljb25zKSxcblx0XHRcdFx0XHRpbWFnZXM6IGZkYzNPbmVQb2ludFR3b0hlbHBlci5nZXRJbWFnZXMocGFzc2VkQXBwLmltYWdlcyksXG5cdFx0XHRcdFx0cHJpdmF0ZTogZmRjM09uZVBvaW50VHdvSGVscGVyLmdldFByaXZhdGUocGFzc2VkQXBwKVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmIChmZGMzVmVyc2lvbiA9PT0gXCIyLjBcIikge1xuXHRcdFx0XHRjb25zdCBwYXNzZWRBcHA6IEFwcERlZmluaXRpb25Ud29Qb2ludFplcm8gPSBhcHBsaWNhdGlvbnNbaV0gYXMgQXBwRGVmaW5pdGlvblR3b1BvaW50WmVybztcblx0XHRcdFx0cGxhdGZvcm1BcHAgPSB7XG5cdFx0XHRcdFx0YXBwSWQ6IHBhc3NlZEFwcC5hcHBJZCxcblx0XHRcdFx0XHR0aXRsZTogcGFzc2VkQXBwLnRpdGxlIHx8IHBhc3NlZEFwcC5uYW1lLFxuXHRcdFx0XHRcdG1hbmlmZXN0VHlwZTogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdFR5cGUocGFzc2VkQXBwKSxcblx0XHRcdFx0XHRtYW5pZmVzdDogZmRjM1R3b1BvaW50WmVyb0hlbHBlci5nZXRNYW5pZmVzdChwYXNzZWRBcHApIGFzIHN0cmluZyxcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogcGFzc2VkQXBwLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRcdGludGVudHM6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0SW50ZW50cyhwYXNzZWRBcHApLFxuXHRcdFx0XHRcdGN1c3RvbUNvbmZpZzogcGFzc2VkQXBwLmN1c3RvbUNvbmZpZyxcblx0XHRcdFx0XHR0YWdzOiBwYXNzZWRBcHAuY2F0ZWdvcmllcyxcblx0XHRcdFx0XHR2ZXJzaW9uOiBwYXNzZWRBcHAudmVyc2lvbixcblx0XHRcdFx0XHRwdWJsaXNoZXI6IHBhc3NlZEFwcC5wdWJsaXNoZXIsXG5cdFx0XHRcdFx0Y29udGFjdEVtYWlsOiBwYXNzZWRBcHAuY29udGFjdEVtYWlsLFxuXHRcdFx0XHRcdHN1cHBvcnRFbWFpbDogcGFzc2VkQXBwLnN1cHBvcnRFbWFpbCxcblx0XHRcdFx0XHRpY29uczogcGFzc2VkQXBwLmljb25zLFxuXHRcdFx0XHRcdGltYWdlczogcGFzc2VkQXBwLnNjcmVlbnNob3RzLFxuXHRcdFx0XHRcdHByaXZhdGU6IGZkYzNUd29Qb2ludFplcm9IZWxwZXIuZ2V0UHJpdmF0ZShwYXNzZWRBcHApXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGxhdGZvcm1BcHAuaWNvbnMpKSB7XG5cdFx0XHRcdHBsYXRmb3JtQXBwLmljb25zID0gW107XG5cdFx0XHR9XG5cdFx0XHRpZiAocGxhdGZvcm1BcHAuaWNvbnMubGVuZ3RoID09PSAwICYmIGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zPy5mYWxsYmFja0ljb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwbGF0Zm9ybUFwcC5pY29ucy5wdXNoKHsgc3JjOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5mYWxsYmFja0ljb24gfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHRzLnB1c2gocGxhdGZvcm1BcHApO1xuXHRcdH1cblx0XHRpZiAoYXBwbGljYXRpb25zLmxlbmd0aCA+IDAgJiYgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBVbnN1cHBvcnRlZCBGREMzIHZlcnNpb24gcGFzc2VkOiAke2ZkYzNWZXJzaW9ufS4gVW5hYmxlIHRvIG1hcCBhcHBzLmApO1xuXHRcdH1cblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBBcHBEZWZpbml0aW9uLCBBcHBJY29uLCBBcHBJbWFnZSB9IGZyb20gXCIuL2ZkYzMtMS0yLXNoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbnMoaWNvbnM6IEFwcEljb25bXSk6IEltYWdlW10ge1xuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaWNvbnMpKSB7XG5cdFx0cmV0dXJuIGFwcEljb25zO1xuXHR9XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZXMoaW1hZ2VzOiBBcHBJbWFnZVtdKTogSW1hZ2VbXSB7XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBhcHBJbWFnZXM7XG5cdH1cblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdChhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKHR5cGVvZiBhcHAubWFuaWZlc3QgPT09IFwic3RyaW5nXCIgJiYgYXBwLm1hbmlmZXN0LnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwLm1hbmlmZXN0KTtcblx0fVxuXG5cdHJldHVybiBhcHAubWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWdzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZ1tdIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9kb3Qtbm90YXRpb25cblx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBhcHBbXCJ0YWdzXCJdID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByaXZhdGUoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdGlmIChhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c3dpdGNoIChhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSkge1xuXHRcdFx0Y2FzZSBcIkZhbHNlXCI6XG5cdFx0XHRjYXNlIFwiZmFsc2VcIjpcblx0XHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIGlmIHNvbWVvbmUgaGFzIGRlZmluZWQgcHJpdmF0ZSB0aGVuIHRoZSBsaWtlbHkgaG9vZCB3YXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb2YgZmFsc2UuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBBcHBJbnRlbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdFdlYkFwcERldGFpbHMsXG5cdE5hdGl2ZUFwcERldGFpbHMsXG5cdE9ubGluZU5hdGl2ZUFwcERldGFpbHNcbn0gZnJvbSBcIi4vZmRjMy0yLTAtc2hhcGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdFR5cGUoYXBwOiBBcHBEZWZpbml0aW9uKTogc3RyaW5nIHtcblx0bGV0IG1hbmlmZXN0VHlwZTogc3RyaW5nO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLXZpZXdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLWV4dGVybmFsXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImRlc2t0b3AtYnJvd3NlclwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8udHlwZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAudHlwZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0VHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hbmlmZXN0KGFwcDogQXBwRGVmaW5pdGlvbik6IHVua25vd24ge1xuXHRsZXQgbWFuaWZlc3Q6IHN0cmluZyB8IHVua25vd247XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0aWYgKGFwcD8uZGV0YWlscyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIHJldHVybiBmZGMzSW50ZXJvcEFwaSAxLjIgYXMgdGhlIHBsYXRmb3JtIGN1cnJlbnRseSBzdXBwb3J0cyB0aGF0LlxuXHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHR1cmw6IChhcHA/LmRldGFpbHMgYXMgV2ViQXBwRGV0YWlscykudXJsLFxuXHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjEuMlwiXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gb3VyIG5hdGl2ZSBhcGkgc3VwcG9ydHMgcGF0aCBhbmQgYXJndW1lbnRzLlxuXHRcdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzIGFzIE5hdGl2ZUFwcERldGFpbHM7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoYXBwPy5kZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bWFuaWZlc3QgPSAoYXBwPy5kZXRhaWxzIGFzIE9ubGluZU5hdGl2ZUFwcERldGFpbHMpLnVybDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnRlbnRzKGFwcDogQXBwRGVmaW5pdGlvbik6IEFwcEludGVudFtdIHtcblx0Y29uc3QgaW50ZW50czogQXBwSW50ZW50W10gPSBbXTtcblxuXHRpZiAoYXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gaW50ZW50cztcblx0fVxuXG5cdGNvbnN0IGludGVudElkcyA9IE9iamVjdC5rZXlzKGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0Zvcik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW50ZW50SWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgaW50ZW50TmFtZSA9IGludGVudElkc1tpXTtcblx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdGRpc3BsYXlOYW1lOiBhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3JbaW50ZW50TmFtZV0uZGlzcGxheU5hbWUsXG5cdFx0XHRjb250ZXh0czogYXBwLmludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByaXZhdGUoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdGxldCBwcml2YXRlQXBwOiB1bmtub3duO1xuXG5cdGlmIChhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8ucHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cHJpdmF0ZUFwcCA9IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5wcml2YXRlO1xuXHR9IGVsc2UgaWYgKGFwcD8uY3VzdG9tQ29uZmlnPy5wcml2YXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRwcml2YXRlQXBwID0gYXBwPy5jdXN0b21Db25maWc/LnByaXZhdGU7XG5cdH1cblxuXHRpZiAocHJpdmF0ZUFwcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c3dpdGNoIChwcml2YXRlQXBwKSB7XG5cdFx0XHRjYXNlIFwiRmFsc2VcIjpcblx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0Y2FzZSBmYWxzZTpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gaWYgc29tZW9uZSBoYXMgZGVmaW5lZCBwcml2YXRlIHRoZW4gdGhlIGxpa2VseSBob29kIHdhcyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvZiBmYWxzZS5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEZEQzNBcHBNYXBwZXJFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogbmV3IEZEQzNBcHBNYXBwZXJFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9