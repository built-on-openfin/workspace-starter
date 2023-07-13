/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/fdc3/1.2/mapper.ts":
/*!*************************************************!*\
  !*** ./client/src/framework/fdc3/1.2/mapper.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapInteropFromFDC3: () => (/* binding */ mapInteropFromFDC3),
/* harmony export */   mapToAppMetaData: () => (/* binding */ mapToAppMetaData),
/* harmony export */   mapToFDC3App: () => (/* binding */ mapToFDC3App),
/* harmony export */   mapToPlatformApp: () => (/* binding */ mapToPlatformApp)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./client/src/framework/utils.ts");

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
function mapToPlatformApp(app) {
    const platformApp = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType: app.manifestType,
        manifest: getManifestFromFDC3(app),
        description: app.description,
        customConfig: app.customConfig,
        intents: app.intents,
        interop: mapInteropFromFDC3(app.intents),
        tags: mapTagsFromFDC3(app),
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: mapIconsFromFDC3(app.icons),
        images: mapImagesFromFDC3(app.images),
        private: mapPrivateFromFDC3(app),
        autostart: mapAutostartFromFDC3(app),
        instanceMode: app.customConfig?.instanceMode,
        tooltip: app.tooltip
    };
    return platformApp;
}
/**
 * Map a platform app to an FDC3 1.2 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 1.2 app.
 */
function mapToFDC3App(app) {
    const manifestType = `${app.manifestType}`;
    const fdc3App = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType,
        manifest: app.manifest,
        description: app.description,
        customConfig: mapCustomConfigFromPlatformApp(app),
        intents: mapIntentsFromPlatformApp(app),
        categories: app.tags ?? [],
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: mapIconsFromPlatformApp(app),
        images: mapImagesFromPlatformApp(app),
        tooltip: app.tooltip
    };
    return fdc3App;
}
/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @returns The app metadata.
 */
function mapToAppMetaData(app) {
    const icons = [];
    const images = [];
    if (Array.isArray(app.icons)) {
        for (const icon of app.icons) {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(icon.src)) {
                icons.push(icon.src);
            }
        }
    }
    if (Array.isArray(app.images)) {
        for (const image of app.images) {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(image.src)) {
                images.push(image.src);
            }
        }
    }
    const appMetaData = {
        appId: app.appId,
        description: app.description,
        icons,
        images,
        name: app.appId,
        title: app.title,
        tooltip: app.tooltip,
        version: app.version
    };
    return appMetaData;
}
/**
 * Map the app definition interop data to app interop format.
 * @param intents The intents to map.
 * @returns The app interop.
 */
function mapInteropFromFDC3(intents) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(intents)) {
        return;
    }
    const listensFor = {};
    for (const intent of intents) {
        listensFor[intent.name] = {
            contexts: intent.contexts,
            customConfig: intent.customConfig,
            displayName: intent.displayName
        };
    }
    const interop = {
        intents: { listensFor }
    };
    return interop;
}
/**
 * Maps the intents from a platform app to an FDC3 1.2 intents array.
 * @param app The platform app to use as a source
 * @returns an Array of Intents in FDC3 1.2 format
 */
function mapIntentsFromPlatformApp(app) {
    const intents = [];
    const passedIntents = app.interop?.intents?.listensFor;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(passedIntents)) {
        const keys = Object.keys(passedIntents);
        for (const key of keys) {
            const displayName = passedIntents[key].displayName ?? key;
            intents.push({ name: key,
                displayName,
                contexts: passedIntents[key].contexts,
                customConfig: passedIntents[key].customConfig });
        }
    }
    if (intents.length === 0 && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.intents)) {
        return app.intents;
    }
    return intents;
}
/**
 * Takes a platform app and returns an FDC3 custom config object.
 * @param app The platform app to map into a customConfig object.
 * @returns an FDC3 1.2 customConfig object based on the platform app settings.
 */
function mapCustomConfigFromPlatformApp(app) {
    const config = {
        "autostart": mapBooleanValue(app?.autostart, false).toString(),
        "instanceMode": app.instanceMode,
        "private": mapBooleanValue(app.private, false).toString()
    };
    return config;
}
/**
 * Map the icon format.
 * @param icons The icons to map.
 * @returns The mapped icons.
 */
function mapIconsFromFDC3(icons) {
    if (!Array.isArray(icons)) {
        return [];
    }
    const appIcons = [];
    for (const appIcon of icons) {
        appIcons.push({ src: appIcon.icon });
    }
    return appIcons;
}
/**
 * Takes a Platform App and converts icons so they are in FDC3 1.2 format.
 * @param app The platform app to use as a source.
 * @returns The array of app icons in FDC3 1.2 format.
 */
function mapIconsFromPlatformApp(app) {
    if (!Array.isArray(app.icons)) {
        return [];
    }
    const appIcons = [];
    for (const appIcon of app.icons) {
        appIcons.push({ icon: appIcon.src });
    }
    return appIcons;
}
/**
 * Map the image format.
 * @param images The images to map.
 * @returns The mapped images.
 */
function mapImagesFromFDC3(images) {
    if (!Array.isArray(images)) {
        return [];
    }
    const appImages = [];
    for (const appImage of images) {
        appImages.push({ src: appImage.url });
    }
    return appImages;
}
/**
 * Returns an array of images in FDC3 1.2 format from a Platform App.
 * @param app The platform app to use as a source.
 * @returns The mapped images.
 */
function mapImagesFromPlatformApp(app) {
    if (!Array.isArray(app.images)) {
        return [];
    }
    const appImages = [];
    for (const appImage of app.images) {
        appImages.push({ url: appImage.src });
    }
    return appImages;
}
/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app) {
    if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
        return JSON.parse(app.manifest);
    }
    return app.manifest;
}
/**
 * Map the tags.
 * @param app The app definition to map the tags for.
 * @returns The mapped tags,
 */
function mapTagsFromFDC3(app) {
    const tags = app.tags ?? app.categories ?? [];
    if (tags.length === 0) {
        tags.push(app.manifestType);
    }
    return tags;
}
/**
 * Map the private flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapPrivateFromFDC3(app) {
    return mapBooleanValue(app?.customConfig?.private, false);
}
/**
 * Map the autostart flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapAutostartFromFDC3(app) {
    return mapBooleanValue(app?.customConfig?.autostart, false);
}
/**
 * Map a boolean or string to a real boolean value.
 * @param flag The flag to convert.
 * @param defaultFlag The default value if missing.
 * @returns The mapped flag.
 */
function mapBooleanValue(flag, defaultFlag) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(flag) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(flag)) {
        switch (flag) {
            case "False":
            case "false":
            case false:
                return false;
            case "True":
            case "true":
            case true:
                return true;
            default:
                // if someone has defined a flag then the likely hood was to override the default value
                return !defaultFlag;
        }
    }
    return defaultFlag;
}


/***/ }),

/***/ "./client/src/framework/fdc3/2.0/mapper.ts":
/*!*************************************************!*\
  !*** ./client/src/framework/fdc3/2.0/mapper.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapIntentsFromFDC3: () => (/* binding */ mapIntentsFromFDC3),
/* harmony export */   mapToAppMetaData: () => (/* binding */ mapToAppMetaData),
/* harmony export */   mapToFDC3App: () => (/* binding */ mapToFDC3App),
/* harmony export */   mapToPlatformApp: () => (/* binding */ mapToPlatformApp)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./client/src/framework/utils.ts");

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
function mapToPlatformApp(app) {
    const platformApp = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType: mapManifestTypeFromFDC3(app),
        manifest: getManifestFromFDC3(app),
        description: app.description,
        instanceMode: app?.hostManifests?.OpenFin?.config?.instanceMode,
        intents: mapIntentsFromFDC3(app.interop),
        interop: app.interop,
        customConfig: app.customConfig,
        tags: app.categories,
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: app.icons ?? [],
        images: app.screenshots,
        private: app?.hostManifests?.OpenFin?.config?.private,
        autostart: app?.hostManifests?.OpenFin?.config?.autostart
    };
    return platformApp;
}
/**
 * Map a platform app to an FDC3 2.0 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 2.0 app.
 */
function mapToFDC3App(app) {
    const fdc3App = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        type: mapTypeFromPlatformApp(app),
        details: {},
        description: app.description,
        categories: app.tags ?? [],
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: app.icons,
        screenshots: app.images,
        tooltip: app.tooltip,
        interop: getInteropFromPlatformApp(app),
        hostManifests: getHostManifestsFromPlatformApp(app)
    };
    return fdc3App;
}
/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @param resultType The result type to include in the data.
 * @returns The app metadata.
 */
function mapToAppMetaData(app, resultType) {
    const appMetaData = {
        appId: app.appId,
        description: app.description,
        icons: app.icons,
        name: app.name,
        screenshots: app.images,
        title: app.title,
        tooltip: app.tooltip,
        version: app.version,
        resultType
    };
    return appMetaData;
}
/**
 * Map the app definition interop data to app interop format.
 * @param interop The interop to map.
 * @returns The app interop.
 */
function mapIntentsFromFDC3(interop) {
    const intents = [];
    const listensFor = interop?.intents?.listensFor;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(listensFor)) {
        return intents;
    }
    const intentIds = Object.keys(listensFor);
    for (const intentName of intentIds) {
        intents.push({
            name: intentName,
            displayName: listensFor[intentName].displayName ?? "",
            contexts: listensFor[intentName].contexts
        });
    }
    return intents;
}
/**
 * Get the interop data from a Platform App in FDC3 2.0 format.
 * @param app The platform app to use as a source.
 * @returns The app interop definition.
 */
function getInteropFromPlatformApp(app) {
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.interop)) {
        return app.interop;
    }
    const interop = {
        intents: {
            listensFor: {}
        }
    };
    if (Array.isArray(app.intents) && app.intents.length > 0) {
        const listensFor = {};
        for (const intent of app.intents) {
            listensFor[intent.name] = { displayName: intent.displayName, contexts: intent.contexts };
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(interop.intents)) {
            interop.intents.listensFor = listensFor;
        }
    }
    return interop;
}
/**
 * Map the manifest type.
 * @param app The app definition to map the manifest type for.
 * @returns The mapped manifest type.
 */
function mapManifestTypeFromFDC3(app) {
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
            manifestType = app.hostManifests?.OpenFin?.type ?? "";
            break;
        }
        default: {
            manifestType = app.type;
        }
    }
    return manifestType;
}
/**
 * Maps to an FDC3 2.0 type from the manifest type specified by a platform app.
 * @param app the platform app to use as a source
 * @returns the FDC3 2.0 app definition type
 */
function mapTypeFromPlatformApp(app) {
    let type = "other";
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.manifestType)) {
        return type;
    }
    switch (app.manifestType) {
        case "inline-view": {
            type = "web";
            break;
        }
        case "inline-external": {
            type = "native";
            break;
        }
        case "desktop-browser": {
            type = "onlineNative";
            break;
        }
    }
    return type;
}
/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app) {
    let manifest;
    switch (app.type) {
        case "web": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
                const hostDetails = app.hostManifests?.OpenFin?.details;
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(hostDetails)) {
                    manifest = {
                        url: (app?.details).url,
                        fdc3InteropApi: "2.0",
                        ...hostDetails
                    };
                }
                else {
                    manifest = {
                        url: (app?.details).url,
                        fdc3InteropApi: "2.0"
                    };
                }
            }
            break;
        }
        case "native": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
                // our native api supports path and arguments.
                manifest = app.details;
            }
            break;
        }
        case "onlineNative": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
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
/**
 * Get the Host Details from the platform app for this FDC3 2.0 App Definition.
 * @param app The platform app to get the information from.
 * @returns The host specific details.
 */
function getHostManifestsFromPlatformApp(app) {
    const hostManifests = {
        OpenFin: {
            type: app.manifestType,
            details: app.manifest,
            config: {
                autostart: app.autostart,
                private: app.private,
                instanceMode: app.instanceMode
            }
        }
    };
    return hostManifests;
}


/***/ }),

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
/* harmony export */ });
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object";
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
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
/*!********************************************!*\
  !*** ./client/src/framework/fdc3/index.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fdc3Mapper1Point2: () => (/* reexport module object */ _1_2_mapper__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   fdc3Mapper2Point0: () => (/* reexport module object */ _2_0_mapper__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _1_2_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./1.2/mapper */ "./client/src/framework/fdc3/1.2/mapper.ts");
/* harmony import */ var _2_0_mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./2.0/mapper */ "./client/src/framework/fdc3/2.0/mapper.ts");
/**
 * A set of helper functions for mapping between fdc3 1.2 and a Platform App
 */

/**
 * A set of helper functions for mapping between fdc3 2.0 and a Platform App
 */


})();

var __webpack_exports__fdc3Mapper1Point2 = __webpack_exports__.fdc3Mapper1Point2;
var __webpack_exports__fdc3Mapper2Point0 = __webpack_exports__.fdc3Mapper2Point0;
export { __webpack_exports__fdc3Mapper1Point2 as fdc3Mapper1Point2, __webpack_exports__fdc3Mapper2Point0 as fdc3Mapper2Point0 };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7R0FFRztBQUMrQztBQUNsRDs7R0FFRztBQUMrQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL2ZkYzMvMS4yL21hcHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9mZGMzLzIuMC9tYXBwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvZmRjMy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCIuLi8uLi9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQXBwRGVmaW5pdGlvbiwgQXBwSWNvbiwgQXBwSW1hZ2UsIEFwcEludGVudHMsIEFwcE1ldGFkYXRhLCBDdXN0b21Db25maWcgfSBmcm9tIFwiLi4vLi4vc2hhcGVzL2ZkYzMtMS0yLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBJbnRlcm9wLCBBcHBJbnRlbnRzIGFzIEZEQzNUd29Qb2ludFplcm9BcHBJbnRlbnRzIH0gZnJvbSBcIi4uLy4uL3NoYXBlcy9mZGMzLTItMC1zaGFwZXNcIjtcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gdG8gYSBwbGF0Zm9ybSBhcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgcGxhdGZvcm0gYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9QbGF0Zm9ybUFwcChhcHA6IEFwcERlZmluaXRpb24pOiBQbGF0Zm9ybUFwcCB7XG5cdGNvbnN0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcCA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdG1hbmlmZXN0VHlwZTogYXBwLm1hbmlmZXN0VHlwZSxcblx0XHRtYW5pZmVzdDogZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHApIGFzIHN0cmluZyxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGN1c3RvbUNvbmZpZzogYXBwLmN1c3RvbUNvbmZpZyxcblx0XHRpbnRlbnRzOiBhcHAuaW50ZW50cyxcblx0XHRpbnRlcm9wOiBtYXBJbnRlcm9wRnJvbUZEQzMoYXBwLmludGVudHMpLFxuXHRcdHRhZ3M6IG1hcFRhZ3NGcm9tRkRDMyhhcHApLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHB1Ymxpc2hlcjogYXBwLnB1Ymxpc2hlciA/PyBcIlwiLFxuXHRcdGNvbnRhY3RFbWFpbDogYXBwLmNvbnRhY3RFbWFpbCxcblx0XHRzdXBwb3J0RW1haWw6IGFwcC5zdXBwb3J0RW1haWwsXG5cdFx0aWNvbnM6IG1hcEljb25zRnJvbUZEQzMoYXBwLmljb25zKSxcblx0XHRpbWFnZXM6IG1hcEltYWdlc0Zyb21GREMzKGFwcC5pbWFnZXMpLFxuXHRcdHByaXZhdGU6IG1hcFByaXZhdGVGcm9tRkRDMyhhcHApLFxuXHRcdGF1dG9zdGFydDogbWFwQXV0b3N0YXJ0RnJvbUZEQzMoYXBwKSxcblx0XHRpbnN0YW5jZU1vZGU6IGFwcC5jdXN0b21Db25maWc/Lmluc3RhbmNlTW9kZSxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcFxuXHR9O1xuXHRyZXR1cm4gcGxhdGZvcm1BcHA7XG59XG5cbi8qKlxuICogTWFwIGEgcGxhdGZvcm0gYXBwIHRvIGFuIEZEQzMgMS4yIGFwcCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGZkYzMgMS4yIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvRkRDM0FwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwRGVmaW5pdGlvbiB7XG5cdGNvbnN0IG1hbmlmZXN0VHlwZTogc3RyaW5nID0gYCR7YXBwLm1hbmlmZXN0VHlwZX1gO1xuXG5cdGNvbnN0IGZkYzNBcHA6IEFwcERlZmluaXRpb24gPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHRtYW5pZmVzdFR5cGUsXG5cdFx0bWFuaWZlc3Q6IGFwcC5tYW5pZmVzdCBhcyBzdHJpbmcsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRjdXN0b21Db25maWc6IG1hcEN1c3RvbUNvbmZpZ0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGludGVudHM6IG1hcEludGVudHNGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRjYXRlZ29yaWVzOiBhcHAudGFncyA/PyBbXSxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBtYXBJY29uc0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGltYWdlczogbWFwSW1hZ2VzRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXBcblx0fTtcblx0cmV0dXJuIGZkYzNBcHA7XG59XG5cbi8qKlxuICogTWFwIHRoZSBwbGF0Zm9ybSBhcHAgdG8gYXBwIG1ldGFkYXRhLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwbGljYXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvQXBwTWV0YURhdGEoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcE1ldGFkYXRhIHtcblx0Y29uc3QgaWNvbnM6IHN0cmluZ1tdID0gW107XG5cdGNvbnN0IGltYWdlczogc3RyaW5nW10gPSBbXTtcblx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmljb25zKSkge1xuXHRcdGZvciAoY29uc3QgaWNvbiBvZiBhcHAuaWNvbnMpIHtcblx0XHRcdGlmICghaXNFbXB0eShpY29uLnNyYykpIHtcblx0XHRcdFx0aWNvbnMucHVzaChpY29uLnNyYyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGFwcC5pbWFnZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBpbWFnZSBvZiBhcHAuaW1hZ2VzKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoaW1hZ2Uuc3JjKSkge1xuXHRcdFx0XHRpbWFnZXMucHVzaChpbWFnZS5zcmMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjb25zdCBhcHBNZXRhRGF0YTogQXBwTWV0YWRhdGEgPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGljb25zLFxuXHRcdGltYWdlcyxcblx0XHRuYW1lOiBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcCxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvblxuXHR9O1xuXHRyZXR1cm4gYXBwTWV0YURhdGE7XG59XG5cbi8qKlxuICogTWFwIHRoZSBhcHAgZGVmaW5pdGlvbiBpbnRlcm9wIGRhdGEgdG8gYXBwIGludGVyb3AgZm9ybWF0LlxuICogQHBhcmFtIGludGVudHMgVGhlIGludGVudHMgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwSW50ZXJvcEZyb21GREMzKGludGVudHM6IEFwcEludGVudHNbXSB8IHVuZGVmaW5lZCk6IEFwcEludGVyb3AgfCB1bmRlZmluZWQge1xuXHRpZiAoaXNFbXB0eShpbnRlbnRzKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGxpc3RlbnNGb3I6IHsgW2tleTogc3RyaW5nXTogRkRDM1R3b1BvaW50WmVyb0FwcEludGVudHMgfSA9IHt9O1xuXG5cdGZvciAoY29uc3QgaW50ZW50IG9mIGludGVudHMpIHtcblx0XHRsaXN0ZW5zRm9yW2ludGVudC5uYW1lXSA9IHtcblx0XHRcdGNvbnRleHRzOiBpbnRlbnQuY29udGV4dHMsXG5cdFx0XHRjdXN0b21Db25maWc6IGludGVudC5jdXN0b21Db25maWcsXG5cdFx0XHRkaXNwbGF5TmFtZTogaW50ZW50LmRpc3BsYXlOYW1lXG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IGludGVyb3A6IEFwcEludGVyb3AgPSB7XG5cdFx0aW50ZW50czogeyBsaXN0ZW5zRm9yIH1cblx0fTtcblxuXHRyZXR1cm4gaW50ZXJvcDtcbn1cblxuLyoqXG4gKiBNYXBzIHRoZSBpbnRlbnRzIGZyb20gYSBwbGF0Zm9ybSBhcHAgdG8gYW4gRkRDMyAxLjIgaW50ZW50cyBhcnJheS5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2VcbiAqIEByZXR1cm5zIGFuIEFycmF5IG9mIEludGVudHMgaW4gRkRDMyAxLjIgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIG1hcEludGVudHNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEludGVudHNbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudHNbXSA9IFtdO1xuXHRjb25zdCBwYXNzZWRJbnRlbnRzID0gYXBwLmludGVyb3A/LmludGVudHM/Lmxpc3RlbnNGb3I7XG5cdGlmKCFpc0VtcHR5KHBhc3NlZEludGVudHMpKSB7XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhc3NlZEludGVudHMpO1xuXHRcdGZvcihjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0Y29uc3QgZGlzcGxheU5hbWU6IHN0cmluZyA9IHBhc3NlZEludGVudHNba2V5XS5kaXNwbGF5TmFtZSA/PyBrZXk7XG5cdFx0XHRpbnRlbnRzLnB1c2goeyBuYW1lOiBrZXksXG5cdFx0XHRcdGRpc3BsYXlOYW1lLFxuXHRcdFx0XHRjb250ZXh0czogcGFzc2VkSW50ZW50c1trZXldLmNvbnRleHRzLFxuXHRcdFx0XHRjdXN0b21Db25maWc6IHBhc3NlZEludGVudHNba2V5XS5jdXN0b21Db25maWcgfSk7XG5cdFx0fVxuXHR9XG5cdGlmKGludGVudHMubGVuZ3RoID09PSAwICYmICFpc0VtcHR5KGFwcC5pbnRlbnRzKSkge1xuXHRcdHJldHVybiBhcHAuaW50ZW50cztcblx0fVxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuLyoqXG4gKiBUYWtlcyBhIHBsYXRmb3JtIGFwcCBhbmQgcmV0dXJucyBhbiBGREMzIGN1c3RvbSBjb25maWcgb2JqZWN0LlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIG1hcCBpbnRvIGEgY3VzdG9tQ29uZmlnIG9iamVjdC5cbiAqIEByZXR1cm5zIGFuIEZEQzMgMS4yIGN1c3RvbUNvbmZpZyBvYmplY3QgYmFzZWQgb24gdGhlIHBsYXRmb3JtIGFwcCBzZXR0aW5ncy5cbiAqL1xuZnVuY3Rpb24gbWFwQ3VzdG9tQ29uZmlnRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBDdXN0b21Db25maWcge1xuXHRjb25zdCBjb25maWc6IEN1c3RvbUNvbmZpZyA9IHtcblx0XHRcImF1dG9zdGFydFwiOiBtYXBCb29sZWFuVmFsdWUoYXBwPy5hdXRvc3RhcnQsIGZhbHNlKS50b1N0cmluZygpLFxuXHRcdFwiaW5zdGFuY2VNb2RlXCI6IGFwcC5pbnN0YW5jZU1vZGUsXG5cdFx0XCJwcml2YXRlXCI6IG1hcEJvb2xlYW5WYWx1ZShhcHAucHJpdmF0ZSwgZmFsc2UpLnRvU3RyaW5nKClcblx0fTtcblx0cmV0dXJuIGNvbmZpZztcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGljb24gZm9ybWF0LlxuICogQHBhcmFtIGljb25zIFRoZSBpY29ucyB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGljb25zLlxuICovXG5mdW5jdGlvbiBtYXBJY29uc0Zyb21GREMzKGljb25zOiBBcHBJY29uW10gfCB1bmRlZmluZWQpOiBJbWFnZVtdIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGljb25zKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGFwcEljb24gb2YgaWNvbnMpIHtcblx0XHRhcHBJY29ucy5wdXNoKHsgc3JjOiBhcHBJY29uLmljb24gfSk7XG5cdH1cblx0cmV0dXJuIGFwcEljb25zO1xufVxuXG4vKipcbiAqIFRha2VzIGEgUGxhdGZvcm0gQXBwIGFuZCBjb252ZXJ0cyBpY29ucyBzbyB0aGV5IGFyZSBpbiBGREMzIDEuMiBmb3JtYXQuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIGFycmF5IG9mIGFwcCBpY29ucyBpbiBGREMzIDEuMiBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG1hcEljb25zRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBJY29uW10ge1xuXHRpZighQXJyYXkuaXNBcnJheShhcHAuaWNvbnMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IGFwcEljb25zOiBBcHBJY29uW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJY29uIG9mIGFwcC5pY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBpY29uOiBhcHBJY29uLnNyYyB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbi8qKlxuICogTWFwIHRoZSBpbWFnZSBmb3JtYXQuXG4gKiBAcGFyYW0gaW1hZ2VzIFRoZSBpbWFnZXMgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBpbWFnZXMuXG4gKi9cbmZ1bmN0aW9uIG1hcEltYWdlc0Zyb21GREMzKGltYWdlczogQXBwSW1hZ2VbXSB8IHVuZGVmaW5lZCk6IEltYWdlW10ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJbWFnZXM6IEltYWdlW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBpbWFnZXMgaW4gRkRDMyAxLjIgZm9ybWF0IGZyb20gYSBQbGF0Zm9ybSBBcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBpbWFnZXMuXG4gKi9cbmZ1bmN0aW9uIG1hcEltYWdlc0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSW1hZ2VbXSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcHAuaW1hZ2VzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJbWFnZXM6IEFwcEltYWdlW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBhcHAuaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyB1cmw6IGFwcEltYWdlLnNyYyB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbWFuaWZlc3Qgd2hpY2ggY2FuIGJlIHBsYWluIHN0cmluZyBvciBKU09OLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIGdldCB0aGUgbWFuaWZlc3QgZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBtYW5pZmVzdC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKHR5cGVvZiBhcHAubWFuaWZlc3QgPT09IFwic3RyaW5nXCIgJiYgYXBwLm1hbmlmZXN0LnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwLm1hbmlmZXN0KTtcblx0fVxuXG5cdHJldHVybiBhcHAubWFuaWZlc3Q7XG59XG5cbi8qKlxuICogTWFwIHRoZSB0YWdzLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwIHRoZSB0YWdzIGZvci5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgdGFncyxcbiAqL1xuZnVuY3Rpb24gbWFwVGFnc0Zyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbiAmIHsgdGFncz86IHN0cmluZ1tdIH0pOiBzdHJpbmdbXSB7XG5cdGNvbnN0IHRhZ3M6IHN0cmluZ1tdID0gYXBwLnRhZ3MgPz8gYXBwLmNhdGVnb3JpZXMgPz8gW107XG5cdGlmICh0YWdzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRhZ3MucHVzaChhcHAubWFuaWZlc3RUeXBlKTtcblx0fVxuXG5cdHJldHVybiB0YWdzO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgcHJpdmF0ZSBmbGFnLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGNvbnRhaW5pbmcgdGhlIGFwcC5cbiAqIEByZXR1cm5zIFRoZSBmbGFnIG9yIGZhbHNlIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbWFwUHJpdmF0ZUZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gbWFwQm9vbGVhblZhbHVlKGFwcD8uY3VzdG9tQ29uZmlnPy5wcml2YXRlLCBmYWxzZSk7XG59XG5cbi8qKlxuICogTWFwIHRoZSBhdXRvc3RhcnQgZmxhZy5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBjb250YWluaW5nIHRoZSBhcHAuXG4gKiBAcmV0dXJucyBUaGUgZmxhZyBvciBmYWxzZSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIG1hcEF1dG9zdGFydEZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gbWFwQm9vbGVhblZhbHVlKGFwcD8uY3VzdG9tQ29uZmlnPy5hdXRvc3RhcnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBNYXAgYSBib29sZWFuIG9yIHN0cmluZyB0byBhIHJlYWwgYm9vbGVhbiB2YWx1ZS5cbiAqIEBwYXJhbSBmbGFnIFRoZSBmbGFnIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0gZGVmYXVsdEZsYWcgVGhlIGRlZmF1bHQgdmFsdWUgaWYgbWlzc2luZy5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgZmxhZy5cbiAqL1xuZnVuY3Rpb24gbWFwQm9vbGVhblZhbHVlKGZsYWc6IHN0cmluZyB8IGJvb2xlYW4gfCB1bmRlZmluZWQsIGRlZmF1bHRGbGFnOiBib29sZWFuKTogYm9vbGVhbiB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGZsYWcpIHx8IGlzQm9vbGVhbihmbGFnKSkge1xuXHRcdHN3aXRjaCAoZmxhZykge1xuXHRcdFx0Y2FzZSBcIkZhbHNlXCI6XG5cdFx0XHRjYXNlIFwiZmFsc2VcIjpcblx0XHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdGNhc2UgXCJUcnVlXCI6XG5cdFx0XHRjYXNlIFwidHJ1ZVwiOlxuXHRcdFx0Y2FzZSB0cnVlOlxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIGlmIHNvbWVvbmUgaGFzIGRlZmluZWQgYSBmbGFnIHRoZW4gdGhlIGxpa2VseSBob29kIHdhcyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCB2YWx1ZVxuXHRcdFx0XHRyZXR1cm4gIWRlZmF1bHRGbGFnO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGVmYXVsdEZsYWc7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEFwcE1ldGFkYXRhIH0gZnJvbSBcIkBmaW5vcy9mZGMzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcEludGVudCB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1BcHAgfSBmcm9tIFwiLi4vLi4vc2hhcGVzL2FwcC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0QXBwRGVmaW5pdGlvbixcblx0V2ViQXBwRGV0YWlscyxcblx0TmF0aXZlQXBwRGV0YWlscyxcblx0T25saW5lTmF0aXZlQXBwRGV0YWlscyxcblx0QXBwSW50ZXJvcCxcblx0QXBwRGVmaW5pdGlvblR5cGUsXG5cdEFwcEludGVudHMsXG5cdEhvc3RNYW5pZmVzdHNcbn0gZnJvbSBcIi4uLy4uL3NoYXBlcy9mZGMzLTItMC1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cblxuLyoqXG4gKiBNYXAgdGhlIGFwcCBkZWZpbml0aW9uIHRvIGEgcGxhdGZvcm0gYXBwLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIHBsYXRmb3JtIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvUGxhdGZvcm1BcHAoYXBwOiBBcHBEZWZpbml0aW9uKTogUGxhdGZvcm1BcHAge1xuXHRjb25zdCBwbGF0Zm9ybUFwcDogUGxhdGZvcm1BcHAgPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHRtYW5pZmVzdFR5cGU6IG1hcE1hbmlmZXN0VHlwZUZyb21GREMzKGFwcCksXG5cdFx0bWFuaWZlc3Q6IGdldE1hbmlmZXN0RnJvbUZEQzMoYXBwKSBhcyBzdHJpbmcsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRpbnN0YW5jZU1vZGU6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5pbnN0YW5jZU1vZGUsXG5cdFx0aW50ZW50czogbWFwSW50ZW50c0Zyb21GREMzKGFwcC5pbnRlcm9wKSxcblx0XHRpbnRlcm9wOiBhcHAuaW50ZXJvcCxcblx0XHRjdXN0b21Db25maWc6IGFwcC5jdXN0b21Db25maWcsXG5cdFx0dGFnczogYXBwLmNhdGVnb3JpZXMsXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cHVibGlzaGVyOiBhcHAucHVibGlzaGVyID8/IFwiXCIsXG5cdFx0Y29udGFjdEVtYWlsOiBhcHAuY29udGFjdEVtYWlsLFxuXHRcdHN1cHBvcnRFbWFpbDogYXBwLnN1cHBvcnRFbWFpbCxcblx0XHRpY29uczogYXBwLmljb25zID8/IFtdLFxuXHRcdGltYWdlczogYXBwLnNjcmVlbnNob3RzLFxuXHRcdHByaXZhdGU6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5wcml2YXRlLFxuXHRcdGF1dG9zdGFydDogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/LmF1dG9zdGFydFxuXHR9O1xuXHRyZXR1cm4gcGxhdGZvcm1BcHA7XG59XG5cbi8qKlxuICogTWFwIGEgcGxhdGZvcm0gYXBwIHRvIGFuIEZEQzMgMi4wIGFwcCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGZkYzMgMi4wIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvRkRDM0FwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwRGVmaW5pdGlvbiB7XG5cdGNvbnN0IGZkYzNBcHA6IEFwcERlZmluaXRpb24gPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHR0eXBlOiBtYXBUeXBlRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0ZGV0YWlsczoge30sXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRjYXRlZ29yaWVzOiBhcHAudGFncyA/PyBbXSxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBhcHAuaWNvbnMsXG5cdFx0c2NyZWVuc2hvdHM6IGFwcC5pbWFnZXMsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0aW50ZXJvcDogZ2V0SW50ZXJvcEZyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGhvc3RNYW5pZmVzdHM6IGdldEhvc3RNYW5pZmVzdHNGcm9tUGxhdGZvcm1BcHAoYXBwKVxuXHR9O1xuXHRyZXR1cm4gZmRjM0FwcDtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHBsYXRmb3JtIGFwcCB0byBhcHAgbWV0YWRhdGEuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHBsaWNhdGlvbiB0byBtYXAuXG4gKiBAcGFyYW0gcmVzdWx0VHlwZSBUaGUgcmVzdWx0IHR5cGUgdG8gaW5jbHVkZSBpbiB0aGUgZGF0YS5cbiAqIEByZXR1cm5zIFRoZSBhcHAgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb0FwcE1ldGFEYXRhKGFwcDogUGxhdGZvcm1BcHAsIHJlc3VsdFR5cGU/OiBzdHJpbmcpOiBBcHBNZXRhZGF0YSB7XG5cdGNvbnN0IGFwcE1ldGFEYXRhOiBBcHBNZXRhZGF0YSA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdGRlc2NyaXB0aW9uOiBhcHAuZGVzY3JpcHRpb24sXG5cdFx0aWNvbnM6IGFwcC5pY29ucyxcblx0XHRuYW1lOiBhcHAubmFtZSxcblx0XHRzY3JlZW5zaG90czogYXBwLmltYWdlcyxcblx0XHR0aXRsZTogYXBwLnRpdGxlLFxuXHRcdHRvb2x0aXA6IGFwcC50b29sdGlwLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHJlc3VsdFR5cGVcblx0fTtcblx0cmV0dXJuIGFwcE1ldGFEYXRhO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gaW50ZXJvcCBkYXRhIHRvIGFwcCBpbnRlcm9wIGZvcm1hdC5cbiAqIEBwYXJhbSBpbnRlcm9wIFRoZSBpbnRlcm9wIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBhcHAgaW50ZXJvcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcEludGVudHNGcm9tRkRDMyhpbnRlcm9wOiBBcHBJbnRlcm9wIHwgdW5kZWZpbmVkKTogQXBwSW50ZW50W10ge1xuXHRjb25zdCBpbnRlbnRzOiBBcHBJbnRlbnRbXSA9IFtdO1xuXG5cdGNvbnN0IGxpc3RlbnNGb3IgPSBpbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yO1xuXHRpZiAoaXNFbXB0eShsaXN0ZW5zRm9yKSkge1xuXHRcdHJldHVybiBpbnRlbnRzO1xuXHR9XG5cblx0Y29uc3QgaW50ZW50SWRzID0gT2JqZWN0LmtleXMobGlzdGVuc0Zvcik7XG5cdGZvciAoY29uc3QgaW50ZW50TmFtZSBvZiBpbnRlbnRJZHMpIHtcblx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdGRpc3BsYXlOYW1lOiBsaXN0ZW5zRm9yW2ludGVudE5hbWVdLmRpc3BsYXlOYW1lID8/IFwiXCIsXG5cdFx0XHRjb250ZXh0czogbGlzdGVuc0ZvcltpbnRlbnROYW1lXS5jb250ZXh0c1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGludGVudHM7XG59XG5cbi8qKlxuICogR2V0IHRoZSBpbnRlcm9wIGRhdGEgZnJvbSBhIFBsYXRmb3JtIEFwcCBpbiBGREMzIDIuMCBmb3JtYXQuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wIGRlZmluaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldEludGVyb3BGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEludGVyb3Age1xuXHRpZighaXNFbXB0eShhcHAuaW50ZXJvcCkpIHtcblx0XHRyZXR1cm4gYXBwLmludGVyb3A7XG5cdH1cblx0Y29uc3QgaW50ZXJvcDogQXBwSW50ZXJvcCA9IHtcblx0XHRpbnRlbnRzOiB7XG5cdFx0XHRsaXN0ZW5zRm9yOiB7fVxuXHRcdH1cblx0fTtcblxuXHRpZihBcnJheS5pc0FycmF5KGFwcC5pbnRlbnRzKSAmJiBhcHAuaW50ZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgbGlzdGVuc0ZvcjogeyBba2V5OiBzdHJpbmddOiBBcHBJbnRlbnRzfSA9IHt9O1xuXHRcdGZvcihjb25zdCBpbnRlbnQgb2YgYXBwLmludGVudHMpIHtcblx0XHRcdGxpc3RlbnNGb3JbaW50ZW50Lm5hbWVdID0geyBkaXNwbGF5TmFtZTogaW50ZW50LmRpc3BsYXlOYW1lLCBjb250ZXh0czogaW50ZW50LmNvbnRleHRzIH07XG5cdFx0fVxuXHRcdGlmKCFpc0VtcHR5KGludGVyb3AuaW50ZW50cykpIHtcblx0XHRcdGludGVyb3AuaW50ZW50cy5saXN0ZW5zRm9yID0gbGlzdGVuc0Zvcjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaW50ZXJvcDtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIG1hbmlmZXN0IHR5cGUuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAgdGhlIG1hbmlmZXN0IHR5cGUgZm9yLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBtYW5pZmVzdCB0eXBlLlxuICovXG5mdW5jdGlvbiBtYXBNYW5pZmVzdFR5cGVGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmcge1xuXHRsZXQgbWFuaWZlc3RUeXBlOiBzdHJpbmc7XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJpbmxpbmUtdmlld1wiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJpbmxpbmUtZXh0ZXJuYWxcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib25saW5lTmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiZGVza3RvcC1icm93c2VyXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm90aGVyXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IGFwcC5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy50eXBlID8/IFwiXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLnR5cGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdFR5cGU7XG59XG5cbi8qKlxuICogTWFwcyB0byBhbiBGREMzIDIuMCB0eXBlIGZyb20gdGhlIG1hbmlmZXN0IHR5cGUgc3BlY2lmaWVkIGJ5IGEgcGxhdGZvcm0gYXBwLlxuICogQHBhcmFtIGFwcCB0aGUgcGxhdGZvcm0gYXBwIHRvIHVzZSBhcyBhIHNvdXJjZVxuICogQHJldHVybnMgdGhlIEZEQzMgMi4wIGFwcCBkZWZpbml0aW9uIHR5cGVcbiAqL1xuZnVuY3Rpb24gbWFwVHlwZUZyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwRGVmaW5pdGlvblR5cGUge1xuXHRsZXQgdHlwZTogQXBwRGVmaW5pdGlvblR5cGUgPSBcIm90aGVyXCI7XG5cdGlmKGlzRW1wdHkoYXBwLm1hbmlmZXN0VHlwZSkpIHtcblx0XHRyZXR1cm4gdHlwZTtcblx0fVxuXHRzd2l0Y2ggKGFwcC5tYW5pZmVzdFR5cGUpIHtcblx0XHRjYXNlIFwiaW5saW5lLXZpZXdcIjoge1xuXHRcdFx0dHlwZSA9IFwid2ViXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImlubGluZS1leHRlcm5hbFwiOiB7XG5cdFx0XHR0eXBlID0gXCJuYXRpdmVcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiZGVza3RvcC1icm93c2VyXCI6IHtcblx0XHRcdHR5cGUgPSBcIm9ubGluZU5hdGl2ZVwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0eXBlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbWFuaWZlc3Qgd2hpY2ggY2FuIGJlIHBsYWluIHN0cmluZyBvciBKU09OLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIGdldCB0aGUgbWFuaWZlc3QgZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBtYW5pZmVzdC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmcgfCB1bmtub3duIHtcblx0bGV0IG1hbmlmZXN0OiBzdHJpbmcgfCB1bmtub3duO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdGlmICghaXNFbXB0eShhcHA/LmRldGFpbHMpKSB7XG5cdFx0XHRcdGNvbnN0IGhvc3REZXRhaWxzID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmRldGFpbHM7XG5cdFx0XHRcdGlmIChpc09iamVjdChob3N0RGV0YWlscykpIHtcblx0XHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdHVybDogKGFwcD8uZGV0YWlscyBhcyBXZWJBcHBEZXRhaWxzKS51cmwsXG5cdFx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIyLjBcIixcblx0XHRcdFx0XHRcdC4uLmhvc3REZXRhaWxzXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdHVybDogKGFwcD8uZGV0YWlscyBhcyBXZWJBcHBEZXRhaWxzKS51cmwsXG5cdFx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIyLjBcIlxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdGlmICghaXNFbXB0eShhcHA/LmRldGFpbHMpKSB7XG5cdFx0XHRcdC8vIG91ciBuYXRpdmUgYXBpIHN1cHBvcnRzIHBhdGggYW5kIGFyZ3VtZW50cy5cblx0XHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscyBhcyBOYXRpdmVBcHBEZXRhaWxzO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0bWFuaWZlc3QgPSAoYXBwPy5kZXRhaWxzIGFzIE9ubGluZU5hdGl2ZUFwcERldGFpbHMpLnVybDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3Q7XG59XG5cbi8qKlxuICogR2V0IHRoZSBIb3N0IERldGFpbHMgZnJvbSB0aGUgcGxhdGZvcm0gYXBwIGZvciB0aGlzIEZEQzMgMi4wIEFwcCBEZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIGdldCB0aGUgaW5mb3JtYXRpb24gZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBob3N0IHNwZWNpZmljIGRldGFpbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEhvc3RNYW5pZmVzdHNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEhvc3RNYW5pZmVzdHMge1xuXHRjb25zdCBob3N0TWFuaWZlc3RzOiBIb3N0TWFuaWZlc3RzID0ge1xuXHRcdE9wZW5GaW46IHtcblx0XHRcdHR5cGU6IGFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRkZXRhaWxzOiBhcHAubWFuaWZlc3QsXG5cdFx0XHRjb25maWc6IHtcblx0XHRcdFx0YXV0b3N0YXJ0OiBhcHAuYXV0b3N0YXJ0LFxuXHRcdFx0XHRwcml2YXRlOiBhcHAucHJpdmF0ZSxcblx0XHRcdFx0aW5zdGFuY2VNb2RlOiBhcHAuaW5zdGFuY2VNb2RlXG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gaG9zdE1hbmlmZXN0cztcbn1cblxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIEEgc2V0IG9mIGhlbHBlciBmdW5jdGlvbnMgZm9yIG1hcHBpbmcgYmV0d2VlbiBmZGMzIDEuMiBhbmQgYSBQbGF0Zm9ybSBBcHBcbiAqL1xuZXhwb3J0ICogYXMgZmRjM01hcHBlcjFQb2ludDIgZnJvbSBcIi4vMS4yL21hcHBlclwiO1xuLyoqXG4gKiBBIHNldCBvZiBoZWxwZXIgZnVuY3Rpb25zIGZvciBtYXBwaW5nIGJldHdlZW4gZmRjMyAyLjAgYW5kIGEgUGxhdGZvcm0gQXBwXG4gKi9cbmV4cG9ydCAqIGFzIGZkYzNNYXBwZXIyUG9pbnQwIGZyb20gXCIuLzIuMC9tYXBwZXJcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==