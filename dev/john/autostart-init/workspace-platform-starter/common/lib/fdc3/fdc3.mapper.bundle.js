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
        tooltip: app.tooltip,
        launchPreference: app.customConfig?.launchPreference
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
            intents.push({
                name: key,
                displayName,
                contexts: passedIntents[key].contexts,
                customConfig: passedIntents[key].customConfig
            });
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
        autostart: mapBooleanValue(app?.autostart, false).toString(),
        instanceMode: app.instanceMode,
        private: mapBooleanValue(app.private, false).toString(),
        launchPreference: app.launchPreference
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
        autostart: app?.hostManifests?.OpenFin?.config?.autostart,
        launchPreference: app?.hostManifests?.OpenFin?.config?.launchPreference
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
                instanceMode: app.instanceMode,
                launchPreference: app.launchPreference
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
/* harmony export */   isNumberValue: () => (/* binding */ isNumberValue),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
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
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumberValue(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
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
    if ("randomUUID" in globalThis.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return globalThis.crypto.randomUUID();
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
        const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
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
    if (isEmpty(err)) {
        return "";
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    else if (isObject(err) && "message" in err && isString(err.message)) {
        return err.message;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isStringValue(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return "";
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVEOzs7O0dBSUc7QUFDSSxTQUFTLGNBQWMsQ0FBQyxPQUFnQjtJQUM5QyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQzVCLE9BQU8sT0FBTzthQUNaLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO2FBQ3pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQzs7Ozs7OztTQ3JKRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7R0FFRztBQUMrQztBQUNsRDs7R0FFRztBQUMrQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL2ZkYzMvMS4yL21hcHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9mZGMzLzIuMC9tYXBwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvZmRjMy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCIuLi8uLi9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRBcHBEZWZpbml0aW9uLFxuXHRBcHBJY29uLFxuXHRBcHBJbWFnZSxcblx0QXBwSW50ZW50cyxcblx0QXBwTWV0YWRhdGEsXG5cdEN1c3RvbUNvbmZpZ1xufSBmcm9tIFwiLi4vLi4vc2hhcGVzL2ZkYzMtMS0yLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBJbnRlcm9wLCBBcHBJbnRlbnRzIGFzIEZEQzNUd29Qb2ludFplcm9BcHBJbnRlbnRzIH0gZnJvbSBcIi4uLy4uL3NoYXBlcy9mZGMzLTItMC1zaGFwZXNcIjtcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gdG8gYSBwbGF0Zm9ybSBhcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgcGxhdGZvcm0gYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9QbGF0Zm9ybUFwcChhcHA6IEFwcERlZmluaXRpb24pOiBQbGF0Zm9ybUFwcCB7XG5cdGNvbnN0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcCA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdG1hbmlmZXN0VHlwZTogYXBwLm1hbmlmZXN0VHlwZSxcblx0XHRtYW5pZmVzdDogZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHApIGFzIHN0cmluZyxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGN1c3RvbUNvbmZpZzogYXBwLmN1c3RvbUNvbmZpZyxcblx0XHRpbnRlbnRzOiBhcHAuaW50ZW50cyxcblx0XHRpbnRlcm9wOiBtYXBJbnRlcm9wRnJvbUZEQzMoYXBwLmludGVudHMpLFxuXHRcdHRhZ3M6IG1hcFRhZ3NGcm9tRkRDMyhhcHApLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHB1Ymxpc2hlcjogYXBwLnB1Ymxpc2hlciA/PyBcIlwiLFxuXHRcdGNvbnRhY3RFbWFpbDogYXBwLmNvbnRhY3RFbWFpbCxcblx0XHRzdXBwb3J0RW1haWw6IGFwcC5zdXBwb3J0RW1haWwsXG5cdFx0aWNvbnM6IG1hcEljb25zRnJvbUZEQzMoYXBwLmljb25zKSxcblx0XHRpbWFnZXM6IG1hcEltYWdlc0Zyb21GREMzKGFwcC5pbWFnZXMpLFxuXHRcdHByaXZhdGU6IG1hcFByaXZhdGVGcm9tRkRDMyhhcHApLFxuXHRcdGF1dG9zdGFydDogbWFwQXV0b3N0YXJ0RnJvbUZEQzMoYXBwKSxcblx0XHRpbnN0YW5jZU1vZGU6IGFwcC5jdXN0b21Db25maWc/Lmluc3RhbmNlTW9kZSxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcCxcblx0XHRsYXVuY2hQcmVmZXJlbmNlOiBhcHAuY3VzdG9tQ29uZmlnPy5sYXVuY2hQcmVmZXJlbmNlXG5cdH07XG5cdHJldHVybiBwbGF0Zm9ybUFwcDtcbn1cblxuLyoqXG4gKiBNYXAgYSBwbGF0Zm9ybSBhcHAgdG8gYW4gRkRDMyAxLjIgYXBwIGRlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgZmRjMyAxLjIgYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9GREMzQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBEZWZpbml0aW9uIHtcblx0Y29uc3QgbWFuaWZlc3RUeXBlOiBzdHJpbmcgPSBgJHthcHAubWFuaWZlc3RUeXBlfWA7XG5cblx0Y29uc3QgZmRjM0FwcDogQXBwRGVmaW5pdGlvbiA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdG1hbmlmZXN0VHlwZSxcblx0XHRtYW5pZmVzdDogYXBwLm1hbmlmZXN0IGFzIHN0cmluZyxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGN1c3RvbUNvbmZpZzogbWFwQ3VzdG9tQ29uZmlnRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0aW50ZW50czogbWFwSW50ZW50c0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGNhdGVnb3JpZXM6IGFwcC50YWdzID8/IFtdLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHB1Ymxpc2hlcjogYXBwLnB1Ymxpc2hlciA/PyBcIlwiLFxuXHRcdGNvbnRhY3RFbWFpbDogYXBwLmNvbnRhY3RFbWFpbCxcblx0XHRzdXBwb3J0RW1haWw6IGFwcC5zdXBwb3J0RW1haWwsXG5cdFx0aWNvbnM6IG1hcEljb25zRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0aW1hZ2VzOiBtYXBJbWFnZXNGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcFxuXHR9O1xuXHRyZXR1cm4gZmRjM0FwcDtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHBsYXRmb3JtIGFwcCB0byBhcHAgbWV0YWRhdGEuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHBsaWNhdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgYXBwIG1ldGFkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9BcHBNZXRhRGF0YShhcHA6IFBsYXRmb3JtQXBwKTogQXBwTWV0YWRhdGEge1xuXHRjb25zdCBpY29uczogc3RyaW5nW10gPSBbXTtcblx0Y29uc3QgaW1hZ2VzOiBzdHJpbmdbXSA9IFtdO1xuXHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaWNvbnMpKSB7XG5cdFx0Zm9yIChjb25zdCBpY29uIG9mIGFwcC5pY29ucykge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGljb24uc3JjKSkge1xuXHRcdFx0XHRpY29ucy5wdXNoKGljb24uc3JjKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmltYWdlcykpIHtcblx0XHRmb3IgKGNvbnN0IGltYWdlIG9mIGFwcC5pbWFnZXMpIHtcblx0XHRcdGlmICghaXNFbXB0eShpbWFnZS5zcmMpKSB7XG5cdFx0XHRcdGltYWdlcy5wdXNoKGltYWdlLnNyYyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGFwcE1ldGFEYXRhOiBBcHBNZXRhZGF0YSA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdGRlc2NyaXB0aW9uOiBhcHAuZGVzY3JpcHRpb24sXG5cdFx0aWNvbnMsXG5cdFx0aW1hZ2VzLFxuXHRcdG5hbWU6IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlLFxuXHRcdHRvb2x0aXA6IGFwcC50b29sdGlwLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uXG5cdH07XG5cdHJldHVybiBhcHBNZXRhRGF0YTtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGFwcCBkZWZpbml0aW9uIGludGVyb3AgZGF0YSB0byBhcHAgaW50ZXJvcCBmb3JtYXQuXG4gKiBAcGFyYW0gaW50ZW50cyBUaGUgaW50ZW50cyB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgYXBwIGludGVyb3AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBJbnRlcm9wRnJvbUZEQzMoaW50ZW50czogQXBwSW50ZW50c1tdIHwgdW5kZWZpbmVkKTogQXBwSW50ZXJvcCB8IHVuZGVmaW5lZCB7XG5cdGlmIChpc0VtcHR5KGludGVudHMpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbGlzdGVuc0ZvcjogeyBba2V5OiBzdHJpbmddOiBGREMzVHdvUG9pbnRaZXJvQXBwSW50ZW50cyB9ID0ge307XG5cblx0Zm9yIChjb25zdCBpbnRlbnQgb2YgaW50ZW50cykge1xuXHRcdGxpc3RlbnNGb3JbaW50ZW50Lm5hbWVdID0ge1xuXHRcdFx0Y29udGV4dHM6IGludGVudC5jb250ZXh0cyxcblx0XHRcdGN1c3RvbUNvbmZpZzogaW50ZW50LmN1c3RvbUNvbmZpZyxcblx0XHRcdGRpc3BsYXlOYW1lOiBpbnRlbnQuZGlzcGxheU5hbWVcblx0XHR9O1xuXHR9XG5cblx0Y29uc3QgaW50ZXJvcDogQXBwSW50ZXJvcCA9IHtcblx0XHRpbnRlbnRzOiB7IGxpc3RlbnNGb3IgfVxuXHR9O1xuXG5cdHJldHVybiBpbnRlcm9wO1xufVxuXG4vKipcbiAqIE1hcHMgdGhlIGludGVudHMgZnJvbSBhIHBsYXRmb3JtIGFwcCB0byBhbiBGREMzIDEuMiBpbnRlbnRzIGFycmF5LlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIHVzZSBhcyBhIHNvdXJjZVxuICogQHJldHVybnMgYW4gQXJyYXkgb2YgSW50ZW50cyBpbiBGREMzIDEuMiBmb3JtYXRcbiAqL1xuZnVuY3Rpb24gbWFwSW50ZW50c0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSW50ZW50c1tdIHtcblx0Y29uc3QgaW50ZW50czogQXBwSW50ZW50c1tdID0gW107XG5cdGNvbnN0IHBhc3NlZEludGVudHMgPSBhcHAuaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0Zvcjtcblx0aWYgKCFpc0VtcHR5KHBhc3NlZEludGVudHMpKSB7XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhc3NlZEludGVudHMpO1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBwYXNzZWRJbnRlbnRzW2tleV0uZGlzcGxheU5hbWUgPz8ga2V5O1xuXHRcdFx0aW50ZW50cy5wdXNoKHtcblx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRkaXNwbGF5TmFtZSxcblx0XHRcdFx0Y29udGV4dHM6IHBhc3NlZEludGVudHNba2V5XS5jb250ZXh0cyxcblx0XHRcdFx0Y3VzdG9tQ29uZmlnOiBwYXNzZWRJbnRlbnRzW2tleV0uY3VzdG9tQ29uZmlnXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aWYgKGludGVudHMubGVuZ3RoID09PSAwICYmICFpc0VtcHR5KGFwcC5pbnRlbnRzKSkge1xuXHRcdHJldHVybiBhcHAuaW50ZW50cztcblx0fVxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuLyoqXG4gKiBUYWtlcyBhIHBsYXRmb3JtIGFwcCBhbmQgcmV0dXJucyBhbiBGREMzIGN1c3RvbSBjb25maWcgb2JqZWN0LlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIG1hcCBpbnRvIGEgY3VzdG9tQ29uZmlnIG9iamVjdC5cbiAqIEByZXR1cm5zIGFuIEZEQzMgMS4yIGN1c3RvbUNvbmZpZyBvYmplY3QgYmFzZWQgb24gdGhlIHBsYXRmb3JtIGFwcCBzZXR0aW5ncy5cbiAqL1xuZnVuY3Rpb24gbWFwQ3VzdG9tQ29uZmlnRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBDdXN0b21Db25maWcge1xuXHRjb25zdCBjb25maWc6IEN1c3RvbUNvbmZpZyA9IHtcblx0XHRhdXRvc3RhcnQ6IG1hcEJvb2xlYW5WYWx1ZShhcHA/LmF1dG9zdGFydCwgZmFsc2UpLnRvU3RyaW5nKCksXG5cdFx0aW5zdGFuY2VNb2RlOiBhcHAuaW5zdGFuY2VNb2RlLFxuXHRcdHByaXZhdGU6IG1hcEJvb2xlYW5WYWx1ZShhcHAucHJpdmF0ZSwgZmFsc2UpLnRvU3RyaW5nKCksXG5cdFx0bGF1bmNoUHJlZmVyZW5jZTogYXBwLmxhdW5jaFByZWZlcmVuY2Vcblx0fTtcblx0cmV0dXJuIGNvbmZpZztcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGljb24gZm9ybWF0LlxuICogQHBhcmFtIGljb25zIFRoZSBpY29ucyB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGljb25zLlxuICovXG5mdW5jdGlvbiBtYXBJY29uc0Zyb21GREMzKGljb25zOiBBcHBJY29uW10gfCB1bmRlZmluZWQpOiBJbWFnZVtdIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGljb25zKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJY29uczogSW1hZ2VbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGFwcEljb24gb2YgaWNvbnMpIHtcblx0XHRhcHBJY29ucy5wdXNoKHsgc3JjOiBhcHBJY29uLmljb24gfSk7XG5cdH1cblx0cmV0dXJuIGFwcEljb25zO1xufVxuXG4vKipcbiAqIFRha2VzIGEgUGxhdGZvcm0gQXBwIGFuZCBjb252ZXJ0cyBpY29ucyBzbyB0aGV5IGFyZSBpbiBGREMzIDEuMiBmb3JtYXQuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIGFycmF5IG9mIGFwcCBpY29ucyBpbiBGREMzIDEuMiBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG1hcEljb25zRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBJY29uW10ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXBwLmljb25zKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJY29uczogQXBwSWNvbltdID0gW107XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBhcHAuaWNvbnMpIHtcblx0XHRhcHBJY29ucy5wdXNoKHsgaWNvbjogYXBwSWNvbi5zcmMgfSk7XG5cdH1cblx0cmV0dXJuIGFwcEljb25zO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgaW1hZ2UgZm9ybWF0LlxuICogQHBhcmFtIGltYWdlcyBUaGUgaW1hZ2VzIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgaW1hZ2VzLlxuICovXG5mdW5jdGlvbiBtYXBJbWFnZXNGcm9tRkRDMyhpbWFnZXM6IEFwcEltYWdlW10gfCB1bmRlZmluZWQpOiBJbWFnZVtdIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGltYWdlcykpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgYXBwSW1hZ2VzOiBJbWFnZVtdID0gW107XG5cdGZvciAoY29uc3QgYXBwSW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyBzcmM6IGFwcEltYWdlLnVybCB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgaW1hZ2VzIGluIEZEQzMgMS4yIGZvcm1hdCBmcm9tIGEgUGxhdGZvcm0gQXBwLlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIHVzZSBhcyBhIHNvdXJjZS5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgaW1hZ2VzLlxuICovXG5mdW5jdGlvbiBtYXBJbWFnZXNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEltYWdlW10ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXBwLmltYWdlcykpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgYXBwSW1hZ2VzOiBBcHBJbWFnZVtdID0gW107XG5cdGZvciAoY29uc3QgYXBwSW1hZ2Ugb2YgYXBwLmltYWdlcykge1xuXHRcdGFwcEltYWdlcy5wdXNoKHsgdXJsOiBhcHBJbWFnZS5zcmMgfSk7XG5cdH1cblx0cmV0dXJuIGFwcEltYWdlcztcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG1hbmlmZXN0IHdoaWNoIGNhbiBiZSBwbGFpbiBzdHJpbmcgb3IgSlNPTi5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCB0byBnZXQgdGhlIG1hbmlmZXN0IGZyb20uXG4gKiBAcmV0dXJucyBUaGUgbWFuaWZlc3QuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbmlmZXN0RnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uKTogdW5rbm93biB7XG5cdGlmICh0eXBlb2YgYXBwLm1hbmlmZXN0ID09PSBcInN0cmluZ1wiICYmIGFwcC5tYW5pZmVzdC5zdGFydHNXaXRoKFwie1wiKSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcC5tYW5pZmVzdCk7XG5cdH1cblxuXHRyZXR1cm4gYXBwLm1hbmlmZXN0O1xufVxuXG4vKipcbiAqIE1hcCB0aGUgdGFncy5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBkZWZpbml0aW9uIHRvIG1hcCB0aGUgdGFncyBmb3IuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIHRhZ3MsXG4gKi9cbmZ1bmN0aW9uIG1hcFRhZ3NGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24gJiB7IHRhZ3M/OiBzdHJpbmdbXSB9KTogc3RyaW5nW10ge1xuXHRjb25zdCB0YWdzOiBzdHJpbmdbXSA9IGFwcC50YWdzID8/IGFwcC5jYXRlZ29yaWVzID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHByaXZhdGUgZmxhZy5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBjb250YWluaW5nIHRoZSBhcHAuXG4gKiBAcmV0dXJucyBUaGUgZmxhZyBvciBmYWxzZSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIG1hcFByaXZhdGVGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBib29sZWFuIHtcblx0cmV0dXJuIG1hcEJvb2xlYW5WYWx1ZShhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSwgZmFsc2UpO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgYXV0b3N0YXJ0IGZsYWcuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgY29udGFpbmluZyB0aGUgYXBwLlxuICogQHJldHVybnMgVGhlIGZsYWcgb3IgZmFsc2UgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBtYXBBdXRvc3RhcnRGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBib29sZWFuIHtcblx0cmV0dXJuIG1hcEJvb2xlYW5WYWx1ZShhcHA/LmN1c3RvbUNvbmZpZz8uYXV0b3N0YXJ0LCBmYWxzZSk7XG59XG5cbi8qKlxuICogTWFwIGEgYm9vbGVhbiBvciBzdHJpbmcgdG8gYSByZWFsIGJvb2xlYW4gdmFsdWUuXG4gKiBAcGFyYW0gZmxhZyBUaGUgZmxhZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIGRlZmF1bHRGbGFnIFRoZSBkZWZhdWx0IHZhbHVlIGlmIG1pc3NpbmcuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGZsYWcuXG4gKi9cbmZ1bmN0aW9uIG1hcEJvb2xlYW5WYWx1ZShmbGFnOiBzdHJpbmcgfCBib29sZWFuIHwgdW5kZWZpbmVkLCBkZWZhdWx0RmxhZzogYm9vbGVhbik6IGJvb2xlYW4ge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShmbGFnKSB8fCBpc0Jvb2xlYW4oZmxhZykpIHtcblx0XHRzd2l0Y2ggKGZsYWcpIHtcblx0XHRcdGNhc2UgXCJGYWxzZVwiOlxuXHRcdFx0Y2FzZSBcImZhbHNlXCI6XG5cdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRjYXNlIFwiVHJ1ZVwiOlxuXHRcdFx0Y2FzZSBcInRydWVcIjpcblx0XHRcdGNhc2UgdHJ1ZTpcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvLyBpZiBzb21lb25lIGhhcyBkZWZpbmVkIGEgZmxhZyB0aGVuIHRoZSBsaWtlbHkgaG9vZCB3YXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0cmV0dXJuICFkZWZhdWx0RmxhZztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRGbGFnO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBBcHBNZXRhZGF0YSB9IGZyb20gXCJAZmlub3MvZmRjM1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBJbnRlbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFBsYXRmb3JtQXBwIH0gZnJvbSBcIi4uLy4uL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdFdlYkFwcERldGFpbHMsXG5cdE5hdGl2ZUFwcERldGFpbHMsXG5cdE9ubGluZU5hdGl2ZUFwcERldGFpbHMsXG5cdEFwcEludGVyb3AsXG5cdEFwcERlZmluaXRpb25UeXBlLFxuXHRBcHBJbnRlbnRzLFxuXHRIb3N0TWFuaWZlc3RzXG59IGZyb20gXCIuLi8uLi9zaGFwZXMvZmRjMy0yLTAtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gdG8gYSBwbGF0Zm9ybSBhcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgcGxhdGZvcm0gYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9QbGF0Zm9ybUFwcChhcHA6IEFwcERlZmluaXRpb24pOiBQbGF0Zm9ybUFwcCB7XG5cdGNvbnN0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcCA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdG1hbmlmZXN0VHlwZTogbWFwTWFuaWZlc3RUeXBlRnJvbUZEQzMoYXBwKSxcblx0XHRtYW5pZmVzdDogZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHApIGFzIHN0cmluZyxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGluc3RhbmNlTW9kZTogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/Lmluc3RhbmNlTW9kZSxcblx0XHRpbnRlbnRzOiBtYXBJbnRlbnRzRnJvbUZEQzMoYXBwLmludGVyb3ApLFxuXHRcdGludGVyb3A6IGFwcC5pbnRlcm9wLFxuXHRcdGN1c3RvbUNvbmZpZzogYXBwLmN1c3RvbUNvbmZpZyxcblx0XHR0YWdzOiBhcHAuY2F0ZWdvcmllcyxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBhcHAuaWNvbnMgPz8gW10sXG5cdFx0aW1hZ2VzOiBhcHAuc2NyZWVuc2hvdHMsXG5cdFx0cHJpdmF0ZTogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/LnByaXZhdGUsXG5cdFx0YXV0b3N0YXJ0OiBhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8uYXV0b3N0YXJ0LFxuXHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5sYXVuY2hQcmVmZXJlbmNlXG5cdH07XG5cdHJldHVybiBwbGF0Zm9ybUFwcDtcbn1cblxuLyoqXG4gKiBNYXAgYSBwbGF0Zm9ybSBhcHAgdG8gYW4gRkRDMyAyLjAgYXBwIGRlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgZmRjMyAyLjAgYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9GREMzQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBEZWZpbml0aW9uIHtcblx0Y29uc3QgZmRjM0FwcDogQXBwRGVmaW5pdGlvbiA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdHR5cGU6IG1hcFR5cGVGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRkZXRhaWxzOiB7fSxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGNhdGVnb3JpZXM6IGFwcC50YWdzID8/IFtdLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHB1Ymxpc2hlcjogYXBwLnB1Ymxpc2hlciA/PyBcIlwiLFxuXHRcdGNvbnRhY3RFbWFpbDogYXBwLmNvbnRhY3RFbWFpbCxcblx0XHRzdXBwb3J0RW1haWw6IGFwcC5zdXBwb3J0RW1haWwsXG5cdFx0aWNvbnM6IGFwcC5pY29ucyxcblx0XHRzY3JlZW5zaG90czogYXBwLmltYWdlcyxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcCxcblx0XHRpbnRlcm9wOiBnZXRJbnRlcm9wRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0aG9zdE1hbmlmZXN0czogZ2V0SG9zdE1hbmlmZXN0c0Zyb21QbGF0Zm9ybUFwcChhcHApXG5cdH07XG5cdHJldHVybiBmZGMzQXBwO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgcGxhdGZvcm0gYXBwIHRvIGFwcCBtZXRhZGF0YS5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIG1hcC5cbiAqIEBwYXJhbSByZXN1bHRUeXBlIFRoZSByZXN1bHQgdHlwZSB0byBpbmNsdWRlIGluIHRoZSBkYXRhLlxuICogQHJldHVybnMgVGhlIGFwcCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvQXBwTWV0YURhdGEoYXBwOiBQbGF0Zm9ybUFwcCwgcmVzdWx0VHlwZT86IHN0cmluZyk6IEFwcE1ldGFkYXRhIHtcblx0Y29uc3QgYXBwTWV0YURhdGE6IEFwcE1ldGFkYXRhID0ge1xuXHRcdGFwcElkOiBhcHAuYXBwSWQsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRpY29uczogYXBwLmljb25zLFxuXHRcdG5hbWU6IGFwcC5uYW1lLFxuXHRcdHNjcmVlbnNob3RzOiBhcHAuaW1hZ2VzLFxuXHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cmVzdWx0VHlwZVxuXHR9O1xuXHRyZXR1cm4gYXBwTWV0YURhdGE7XG59XG5cbi8qKlxuICogTWFwIHRoZSBhcHAgZGVmaW5pdGlvbiBpbnRlcm9wIGRhdGEgdG8gYXBwIGludGVyb3AgZm9ybWF0LlxuICogQHBhcmFtIGludGVyb3AgVGhlIGludGVyb3AgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwSW50ZW50c0Zyb21GREMzKGludGVyb3A6IEFwcEludGVyb3AgfCB1bmRlZmluZWQpOiBBcHBJbnRlbnRbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudFtdID0gW107XG5cblx0Y29uc3QgbGlzdGVuc0ZvciA9IGludGVyb3A/LmludGVudHM/Lmxpc3RlbnNGb3I7XG5cdGlmIChpc0VtcHR5KGxpc3RlbnNGb3IpKSB7XG5cdFx0cmV0dXJuIGludGVudHM7XG5cdH1cblxuXHRjb25zdCBpbnRlbnRJZHMgPSBPYmplY3Qua2V5cyhsaXN0ZW5zRm9yKTtcblx0Zm9yIChjb25zdCBpbnRlbnROYW1lIG9mIGludGVudElkcykge1xuXHRcdGludGVudHMucHVzaCh7XG5cdFx0XHRuYW1lOiBpbnRlbnROYW1lLFxuXHRcdFx0ZGlzcGxheU5hbWU6IGxpc3RlbnNGb3JbaW50ZW50TmFtZV0uZGlzcGxheU5hbWUgPz8gXCJcIixcblx0XHRcdGNvbnRleHRzOiBsaXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGludGVyb3AgZGF0YSBmcm9tIGEgUGxhdGZvcm0gQXBwIGluIEZEQzMgMi4wIGZvcm1hdC5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2UuXG4gKiBAcmV0dXJucyBUaGUgYXBwIGludGVyb3AgZGVmaW5pdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0SW50ZXJvcEZyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSW50ZXJvcCB7XG5cdGlmICghaXNFbXB0eShhcHAuaW50ZXJvcCkpIHtcblx0XHRyZXR1cm4gYXBwLmludGVyb3A7XG5cdH1cblx0Y29uc3QgaW50ZXJvcDogQXBwSW50ZXJvcCA9IHtcblx0XHRpbnRlbnRzOiB7XG5cdFx0XHRsaXN0ZW5zRm9yOiB7fVxuXHRcdH1cblx0fTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaW50ZW50cykgJiYgYXBwLmludGVudHMubGVuZ3RoID4gMCkge1xuXHRcdGNvbnN0IGxpc3RlbnNGb3I6IHsgW2tleTogc3RyaW5nXTogQXBwSW50ZW50cyB9ID0ge307XG5cdFx0Zm9yIChjb25zdCBpbnRlbnQgb2YgYXBwLmludGVudHMpIHtcblx0XHRcdGxpc3RlbnNGb3JbaW50ZW50Lm5hbWVdID0geyBkaXNwbGF5TmFtZTogaW50ZW50LmRpc3BsYXlOYW1lLCBjb250ZXh0czogaW50ZW50LmNvbnRleHRzIH07XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eShpbnRlcm9wLmludGVudHMpKSB7XG5cdFx0XHRpbnRlcm9wLmludGVudHMubGlzdGVuc0ZvciA9IGxpc3RlbnNGb3I7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGludGVyb3A7XG59XG5cbi8qKlxuICogTWFwIHRoZSBtYW5pZmVzdCB0eXBlLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwIHRoZSBtYW5pZmVzdCB0eXBlIGZvci5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgbWFuaWZlc3QgdHlwZS5cbiAqL1xuZnVuY3Rpb24gbWFwTWFuaWZlc3RUeXBlRnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uKTogc3RyaW5nIHtcblx0bGV0IG1hbmlmZXN0VHlwZTogc3RyaW5nO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLXZpZXdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLWV4dGVybmFsXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImRlc2t0b3AtYnJvd3NlclwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8udHlwZSA/PyBcIlwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IGFwcC50eXBlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3RUeXBlO1xufVxuXG4vKipcbiAqIE1hcHMgdG8gYW4gRkRDMyAyLjAgdHlwZSBmcm9tIHRoZSBtYW5pZmVzdCB0eXBlIHNwZWNpZmllZCBieSBhIHBsYXRmb3JtIGFwcC5cbiAqIEBwYXJhbSBhcHAgdGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2VcbiAqIEByZXR1cm5zIHRoZSBGREMzIDIuMCBhcHAgZGVmaW5pdGlvbiB0eXBlXG4gKi9cbmZ1bmN0aW9uIG1hcFR5cGVGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcERlZmluaXRpb25UeXBlIHtcblx0bGV0IHR5cGU6IEFwcERlZmluaXRpb25UeXBlID0gXCJvdGhlclwiO1xuXHRpZiAoaXNFbXB0eShhcHAubWFuaWZlc3RUeXBlKSkge1xuXHRcdHJldHVybiB0eXBlO1xuXHR9XG5cdHN3aXRjaCAoYXBwLm1hbmlmZXN0VHlwZSkge1xuXHRcdGNhc2UgXCJpbmxpbmUtdmlld1wiOiB7XG5cdFx0XHR0eXBlID0gXCJ3ZWJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiaW5saW5lLWV4dGVybmFsXCI6IHtcblx0XHRcdHR5cGUgPSBcIm5hdGl2ZVwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJkZXNrdG9wLWJyb3dzZXJcIjoge1xuXHRcdFx0dHlwZSA9IFwib25saW5lTmF0aXZlXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0cmV0dXJuIHR5cGU7XG59XG5cbi8qKlxuICogR2V0IHRoZSBtYW5pZmVzdCB3aGljaCBjYW4gYmUgcGxhaW4gc3RyaW5nIG9yIEpTT04uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgdG8gZ2V0IHRoZSBtYW5pZmVzdCBmcm9tLlxuICogQHJldHVybnMgVGhlIG1hbmlmZXN0LlxuICovXG5mdW5jdGlvbiBnZXRNYW5pZmVzdEZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB8IHVua25vd24ge1xuXHRsZXQgbWFuaWZlc3Q6IHN0cmluZyB8IHVua25vd247XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0Y29uc3QgaG9zdERldGFpbHMgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdFx0aWYgKGlzT2JqZWN0KGhvc3REZXRhaWxzKSkge1xuXHRcdFx0XHRcdG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjIuMFwiLFxuXHRcdFx0XHRcdFx0Li4uaG9zdERldGFpbHNcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjIuMFwiXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0Ly8gb3VyIG5hdGl2ZSBhcGkgc3VwcG9ydHMgcGF0aCBhbmQgYXJndW1lbnRzLlxuXHRcdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzIGFzIE5hdGl2ZUFwcERldGFpbHM7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoYXBwPy5kZXRhaWxzKSkge1xuXHRcdFx0XHRtYW5pZmVzdCA9IChhcHA/LmRldGFpbHMgYXMgT25saW5lTmF0aXZlQXBwRGV0YWlscykudXJsO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5kZXRhaWxzO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmRldGFpbHM7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIEhvc3QgRGV0YWlscyBmcm9tIHRoZSBwbGF0Zm9ybSBhcHAgZm9yIHRoaXMgRkRDMyAyLjAgQXBwIERlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBmcm9tLlxuICogQHJldHVybnMgVGhlIGhvc3Qgc3BlY2lmaWMgZGV0YWlscy5cbiAqL1xuZnVuY3Rpb24gZ2V0SG9zdE1hbmlmZXN0c0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogSG9zdE1hbmlmZXN0cyB7XG5cdGNvbnN0IGhvc3RNYW5pZmVzdHM6IEhvc3RNYW5pZmVzdHMgPSB7XG5cdFx0T3BlbkZpbjoge1xuXHRcdFx0dHlwZTogYXBwLm1hbmlmZXN0VHlwZSxcblx0XHRcdGRldGFpbHM6IGFwcC5tYW5pZmVzdCxcblx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRhdXRvc3RhcnQ6IGFwcC5hdXRvc3RhcnQsXG5cdFx0XHRcdHByaXZhdGU6IGFwcC5wcml2YXRlLFxuXHRcdFx0XHRpbnN0YW5jZU1vZGU6IGFwcC5pbnN0YW5jZU1vZGUsXG5cdFx0XHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcC5sYXVuY2hQcmVmZXJlbmNlXG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gaG9zdE1hbmlmZXN0cztcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBBIHNldCBvZiBoZWxwZXIgZnVuY3Rpb25zIGZvciBtYXBwaW5nIGJldHdlZW4gZmRjMyAxLjIgYW5kIGEgUGxhdGZvcm0gQXBwXG4gKi9cbmV4cG9ydCAqIGFzIGZkYzNNYXBwZXIxUG9pbnQyIGZyb20gXCIuLzEuMi9tYXBwZXJcIjtcbi8qKlxuICogQSBzZXQgb2YgaGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFwcGluZyBiZXR3ZWVuIGZkYzMgMi4wIGFuZCBhIFBsYXRmb3JtIEFwcFxuICovXG5leHBvcnQgKiBhcyBmZGMzTWFwcGVyMlBvaW50MCBmcm9tIFwiLi8yLjAvbWFwcGVyXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=