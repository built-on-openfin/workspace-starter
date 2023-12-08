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
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(app.manifest) && app.manifest.startsWith("{")) {
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
    return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
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
    else if (isStringValue(err)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsY0FBYyxDQUFDLE9BQWdCO0lBQzlDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDNUIsT0FBTyxPQUFPO2FBQ1osT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7YUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7YUFDdEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7YUFDdkIsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWCxDQUFDOzs7Ozs7O1NDckpEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztHQUVHO0FBQytDO0FBQ2xEOztHQUVHO0FBQytDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvZmRjMy8xLjIvbWFwcGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL2ZkYzMvMi4wL21hcHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9mZGMzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgSW1hZ2UgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFBsYXRmb3JtQXBwIH0gZnJvbSBcIi4uLy4uL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdEFwcEljb24sXG5cdEFwcEltYWdlLFxuXHRBcHBJbnRlbnRzLFxuXHRBcHBNZXRhZGF0YSxcblx0Q3VzdG9tQ29uZmlnXG59IGZyb20gXCIuLi8uLi9zaGFwZXMvZmRjMy0xLTItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcEludGVyb3AsIEFwcEludGVudHMgYXMgRkRDM1R3b1BvaW50WmVyb0FwcEludGVudHMgfSBmcm9tIFwiLi4vLi4vc2hhcGVzL2ZkYzMtMi0wLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNCb29sZWFuLCBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbi8qKlxuICogTWFwIHRoZSBhcHAgZGVmaW5pdGlvbiB0byBhIHBsYXRmb3JtIGFwcC5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBkZWZpbml0aW9uIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBwbGF0Zm9ybSBhcHAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb1BsYXRmb3JtQXBwKGFwcDogQXBwRGVmaW5pdGlvbik6IFBsYXRmb3JtQXBwIHtcblx0Y29uc3QgcGxhdGZvcm1BcHA6IFBsYXRmb3JtQXBwID0ge1xuXHRcdGFwcElkOiBhcHAuYXBwSWQsXG5cdFx0bmFtZTogYXBwLm5hbWUgPz8gYXBwLmFwcElkLFxuXHRcdHRpdGxlOiBhcHAudGl0bGUgPz8gYXBwLm5hbWUsXG5cdFx0bWFuaWZlc3RUeXBlOiBhcHAubWFuaWZlc3RUeXBlLFxuXHRcdG1hbmlmZXN0OiBnZXRNYW5pZmVzdEZyb21GREMzKGFwcCkgYXMgc3RyaW5nLFxuXHRcdGRlc2NyaXB0aW9uOiBhcHAuZGVzY3JpcHRpb24sXG5cdFx0Y3VzdG9tQ29uZmlnOiBhcHAuY3VzdG9tQ29uZmlnLFxuXHRcdGludGVudHM6IGFwcC5pbnRlbnRzLFxuXHRcdGludGVyb3A6IG1hcEludGVyb3BGcm9tRkRDMyhhcHAuaW50ZW50cyksXG5cdFx0dGFnczogbWFwVGFnc0Zyb21GREMzKGFwcCksXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cHVibGlzaGVyOiBhcHAucHVibGlzaGVyID8/IFwiXCIsXG5cdFx0Y29udGFjdEVtYWlsOiBhcHAuY29udGFjdEVtYWlsLFxuXHRcdHN1cHBvcnRFbWFpbDogYXBwLnN1cHBvcnRFbWFpbCxcblx0XHRpY29uczogbWFwSWNvbnNGcm9tRkRDMyhhcHAuaWNvbnMpLFxuXHRcdGltYWdlczogbWFwSW1hZ2VzRnJvbUZEQzMoYXBwLmltYWdlcyksXG5cdFx0cHJpdmF0ZTogbWFwUHJpdmF0ZUZyb21GREMzKGFwcCksXG5cdFx0YXV0b3N0YXJ0OiBtYXBBdXRvc3RhcnRGcm9tRkRDMyhhcHApLFxuXHRcdGluc3RhbmNlTW9kZTogYXBwLmN1c3RvbUNvbmZpZz8uaW5zdGFuY2VNb2RlLFxuXHRcdHRvb2x0aXA6IGFwcC50b29sdGlwLFxuXHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcC5jdXN0b21Db25maWc/LmxhdW5jaFByZWZlcmVuY2Vcblx0fTtcblx0cmV0dXJuIHBsYXRmb3JtQXBwO1xufVxuXG4vKipcbiAqIE1hcCBhIHBsYXRmb3JtIGFwcCB0byBhbiBGREMzIDEuMiBhcHAgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBkZWZpbml0aW9uIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBmZGMzIDEuMiBhcHAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb0ZEQzNBcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcERlZmluaXRpb24ge1xuXHRjb25zdCBtYW5pZmVzdFR5cGU6IHN0cmluZyA9IGAke2FwcC5tYW5pZmVzdFR5cGV9YDtcblxuXHRjb25zdCBmZGMzQXBwOiBBcHBEZWZpbml0aW9uID0ge1xuXHRcdGFwcElkOiBhcHAuYXBwSWQsXG5cdFx0bmFtZTogYXBwLm5hbWUgPz8gYXBwLmFwcElkLFxuXHRcdHRpdGxlOiBhcHAudGl0bGUgPz8gYXBwLm5hbWUsXG5cdFx0bWFuaWZlc3RUeXBlLFxuXHRcdG1hbmlmZXN0OiBhcHAubWFuaWZlc3QgYXMgc3RyaW5nLFxuXHRcdGRlc2NyaXB0aW9uOiBhcHAuZGVzY3JpcHRpb24sXG5cdFx0Y3VzdG9tQ29uZmlnOiBtYXBDdXN0b21Db25maWdGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRpbnRlbnRzOiBtYXBJbnRlbnRzRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0Y2F0ZWdvcmllczogYXBwLnRhZ3MgPz8gW10sXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cHVibGlzaGVyOiBhcHAucHVibGlzaGVyID8/IFwiXCIsXG5cdFx0Y29udGFjdEVtYWlsOiBhcHAuY29udGFjdEVtYWlsLFxuXHRcdHN1cHBvcnRFbWFpbDogYXBwLnN1cHBvcnRFbWFpbCxcblx0XHRpY29uczogbWFwSWNvbnNGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRpbWFnZXM6IG1hcEltYWdlc0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdHRvb2x0aXA6IGFwcC50b29sdGlwXG5cdH07XG5cdHJldHVybiBmZGMzQXBwO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgcGxhdGZvcm0gYXBwIHRvIGFwcCBtZXRhZGF0YS5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBhcHAgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb0FwcE1ldGFEYXRhKGFwcDogUGxhdGZvcm1BcHApOiBBcHBNZXRhZGF0YSB7XG5cdGNvbnN0IGljb25zOiBzdHJpbmdbXSA9IFtdO1xuXHRjb25zdCBpbWFnZXM6IHN0cmluZ1tdID0gW107XG5cdGlmIChBcnJheS5pc0FycmF5KGFwcC5pY29ucykpIHtcblx0XHRmb3IgKGNvbnN0IGljb24gb2YgYXBwLmljb25zKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoaWNvbi5zcmMpKSB7XG5cdFx0XHRcdGljb25zLnB1c2goaWNvbi5zcmMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaW1hZ2VzKSkge1xuXHRcdGZvciAoY29uc3QgaW1hZ2Ugb2YgYXBwLmltYWdlcykge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGltYWdlLnNyYykpIHtcblx0XHRcdFx0aW1hZ2VzLnB1c2goaW1hZ2Uuc3JjKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y29uc3QgYXBwTWV0YURhdGE6IEFwcE1ldGFkYXRhID0ge1xuXHRcdGFwcElkOiBhcHAuYXBwSWQsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRpY29ucyxcblx0XHRpbWFnZXMsXG5cdFx0bmFtZTogYXBwLmFwcElkLFxuXHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb25cblx0fTtcblx0cmV0dXJuIGFwcE1ldGFEYXRhO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gaW50ZXJvcCBkYXRhIHRvIGFwcCBpbnRlcm9wIGZvcm1hdC5cbiAqIEBwYXJhbSBpbnRlbnRzIFRoZSBpbnRlbnRzIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBhcHAgaW50ZXJvcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcEludGVyb3BGcm9tRkRDMyhpbnRlbnRzOiBBcHBJbnRlbnRzW10gfCB1bmRlZmluZWQpOiBBcHBJbnRlcm9wIHwgdW5kZWZpbmVkIHtcblx0aWYgKGlzRW1wdHkoaW50ZW50cykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBsaXN0ZW5zRm9yOiB7IFtrZXk6IHN0cmluZ106IEZEQzNUd29Qb2ludFplcm9BcHBJbnRlbnRzIH0gPSB7fTtcblxuXHRmb3IgKGNvbnN0IGludGVudCBvZiBpbnRlbnRzKSB7XG5cdFx0bGlzdGVuc0ZvcltpbnRlbnQubmFtZV0gPSB7XG5cdFx0XHRjb250ZXh0czogaW50ZW50LmNvbnRleHRzLFxuXHRcdFx0Y3VzdG9tQ29uZmlnOiBpbnRlbnQuY3VzdG9tQ29uZmlnLFxuXHRcdFx0ZGlzcGxheU5hbWU6IGludGVudC5kaXNwbGF5TmFtZVxuXHRcdH07XG5cdH1cblxuXHRjb25zdCBpbnRlcm9wOiBBcHBJbnRlcm9wID0ge1xuXHRcdGludGVudHM6IHsgbGlzdGVuc0ZvciB9XG5cdH07XG5cblx0cmV0dXJuIGludGVyb3A7XG59XG5cbi8qKlxuICogTWFwcyB0aGUgaW50ZW50cyBmcm9tIGEgcGxhdGZvcm0gYXBwIHRvIGFuIEZEQzMgMS4yIGludGVudHMgYXJyYXkuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlXG4gKiBAcmV0dXJucyBhbiBBcnJheSBvZiBJbnRlbnRzIGluIEZEQzMgMS4yIGZvcm1hdFxuICovXG5mdW5jdGlvbiBtYXBJbnRlbnRzRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBJbnRlbnRzW10ge1xuXHRjb25zdCBpbnRlbnRzOiBBcHBJbnRlbnRzW10gPSBbXTtcblx0Y29uc3QgcGFzc2VkSW50ZW50cyA9IGFwcC5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yO1xuXHRpZiAoIWlzRW1wdHkocGFzc2VkSW50ZW50cykpIHtcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocGFzc2VkSW50ZW50cyk7XG5cdFx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0Y29uc3QgZGlzcGxheU5hbWU6IHN0cmluZyA9IHBhc3NlZEludGVudHNba2V5XS5kaXNwbGF5TmFtZSA/PyBrZXk7XG5cdFx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0XHRuYW1lOiBrZXksXG5cdFx0XHRcdGRpc3BsYXlOYW1lLFxuXHRcdFx0XHRjb250ZXh0czogcGFzc2VkSW50ZW50c1trZXldLmNvbnRleHRzLFxuXHRcdFx0XHRjdXN0b21Db25maWc6IHBhc3NlZEludGVudHNba2V5XS5jdXN0b21Db25maWdcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRpZiAoaW50ZW50cy5sZW5ndGggPT09IDAgJiYgIWlzRW1wdHkoYXBwLmludGVudHMpKSB7XG5cdFx0cmV0dXJuIGFwcC5pbnRlbnRzO1xuXHR9XG5cdHJldHVybiBpbnRlbnRzO1xufVxuXG4vKipcbiAqIFRha2VzIGEgcGxhdGZvcm0gYXBwIGFuZCByZXR1cm5zIGFuIEZEQzMgY3VzdG9tIGNvbmZpZyBvYmplY3QuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gbWFwIGludG8gYSBjdXN0b21Db25maWcgb2JqZWN0LlxuICogQHJldHVybnMgYW4gRkRDMyAxLjIgY3VzdG9tQ29uZmlnIG9iamVjdCBiYXNlZCBvbiB0aGUgcGxhdGZvcm0gYXBwIHNldHRpbmdzLlxuICovXG5mdW5jdGlvbiBtYXBDdXN0b21Db25maWdGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEN1c3RvbUNvbmZpZyB7XG5cdGNvbnN0IGNvbmZpZzogQ3VzdG9tQ29uZmlnID0ge1xuXHRcdGF1dG9zdGFydDogbWFwQm9vbGVhblZhbHVlKGFwcD8uYXV0b3N0YXJ0LCBmYWxzZSkudG9TdHJpbmcoKSxcblx0XHRpbnN0YW5jZU1vZGU6IGFwcC5pbnN0YW5jZU1vZGUsXG5cdFx0cHJpdmF0ZTogbWFwQm9vbGVhblZhbHVlKGFwcC5wcml2YXRlLCBmYWxzZSkudG9TdHJpbmcoKSxcblx0XHRsYXVuY2hQcmVmZXJlbmNlOiBhcHAubGF1bmNoUHJlZmVyZW5jZVxuXHR9O1xuXHRyZXR1cm4gY29uZmlnO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgaWNvbiBmb3JtYXQuXG4gKiBAcGFyYW0gaWNvbnMgVGhlIGljb25zIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgaWNvbnMuXG4gKi9cbmZ1bmN0aW9uIG1hcEljb25zRnJvbUZEQzMoaWNvbnM6IEFwcEljb25bXSB8IHVuZGVmaW5lZCk6IEltYWdlW10ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaWNvbnMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IGFwcEljb25zOiBJbWFnZVtdID0gW107XG5cdGZvciAoY29uc3QgYXBwSWNvbiBvZiBpY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBzcmM6IGFwcEljb24uaWNvbiB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbi8qKlxuICogVGFrZXMgYSBQbGF0Zm9ybSBBcHAgYW5kIGNvbnZlcnRzIGljb25zIHNvIHRoZXkgYXJlIGluIEZEQzMgMS4yIGZvcm1hdC5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2UuXG4gKiBAcmV0dXJucyBUaGUgYXJyYXkgb2YgYXBwIGljb25zIGluIEZEQzMgMS4yIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbWFwSWNvbnNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEljb25bXSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcHAuaWNvbnMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IGFwcEljb25zOiBBcHBJY29uW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJY29uIG9mIGFwcC5pY29ucykge1xuXHRcdGFwcEljb25zLnB1c2goeyBpY29uOiBhcHBJY29uLnNyYyB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSWNvbnM7XG59XG5cbi8qKlxuICogTWFwIHRoZSBpbWFnZSBmb3JtYXQuXG4gKiBAcGFyYW0gaW1hZ2VzIFRoZSBpbWFnZXMgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBpbWFnZXMuXG4gKi9cbmZ1bmN0aW9uIG1hcEltYWdlc0Zyb21GREMzKGltYWdlczogQXBwSW1hZ2VbXSB8IHVuZGVmaW5lZCk6IEltYWdlW10ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoaW1hZ2VzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJbWFnZXM6IEltYWdlW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBpbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHNyYzogYXBwSW1hZ2UudXJsIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBpbWFnZXMgaW4gRkRDMyAxLjIgZm9ybWF0IGZyb20gYSBQbGF0Zm9ybSBBcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBpbWFnZXMuXG4gKi9cbmZ1bmN0aW9uIG1hcEltYWdlc0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSW1hZ2VbXSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcHAuaW1hZ2VzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBhcHBJbWFnZXM6IEFwcEltYWdlW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJbWFnZSBvZiBhcHAuaW1hZ2VzKSB7XG5cdFx0YXBwSW1hZ2VzLnB1c2goeyB1cmw6IGFwcEltYWdlLnNyYyB9KTtcblx0fVxuXHRyZXR1cm4gYXBwSW1hZ2VzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbWFuaWZlc3Qgd2hpY2ggY2FuIGJlIHBsYWluIHN0cmluZyBvciBKU09OLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIGdldCB0aGUgbWFuaWZlc3QgZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBtYW5pZmVzdC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiB1bmtub3duIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoYXBwLm1hbmlmZXN0KSAmJiBhcHAubWFuaWZlc3Quc3RhcnRzV2l0aChcIntcIikpIHtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShhcHAubWFuaWZlc3QpO1xuXHR9XG5cblx0cmV0dXJuIGFwcC5tYW5pZmVzdDtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHRhZ3MuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAgdGhlIHRhZ3MgZm9yLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCB0YWdzLFxuICovXG5mdW5jdGlvbiBtYXBUYWdzRnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uICYgeyB0YWdzPzogc3RyaW5nW10gfSk6IHN0cmluZ1tdIHtcblx0Y29uc3QgdGFnczogc3RyaW5nW10gPSBhcHAudGFncyA/PyBhcHAuY2F0ZWdvcmllcyA/PyBbXTtcblx0aWYgKHRhZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0dGFncy5wdXNoKGFwcC5tYW5pZmVzdFR5cGUpO1xuXHR9XG5cblx0cmV0dXJuIHRhZ3M7XG59XG5cbi8qKlxuICogTWFwIHRoZSBwcml2YXRlIGZsYWcuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgY29udGFpbmluZyB0aGUgYXBwLlxuICogQHJldHVybnMgVGhlIGZsYWcgb3IgZmFsc2UgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBtYXBQcml2YXRlRnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdHJldHVybiBtYXBCb29sZWFuVmFsdWUoYXBwPy5jdXN0b21Db25maWc/LnByaXZhdGUsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGF1dG9zdGFydCBmbGFnLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGNvbnRhaW5pbmcgdGhlIGFwcC5cbiAqIEByZXR1cm5zIFRoZSBmbGFnIG9yIGZhbHNlIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbWFwQXV0b3N0YXJ0RnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uKTogYm9vbGVhbiB7XG5cdHJldHVybiBtYXBCb29sZWFuVmFsdWUoYXBwPy5jdXN0b21Db25maWc/LmF1dG9zdGFydCwgZmFsc2UpO1xufVxuXG4vKipcbiAqIE1hcCBhIGJvb2xlYW4gb3Igc3RyaW5nIHRvIGEgcmVhbCBib29sZWFuIHZhbHVlLlxuICogQHBhcmFtIGZsYWcgVGhlIGZsYWcgdG8gY29udmVydC5cbiAqIEBwYXJhbSBkZWZhdWx0RmxhZyBUaGUgZGVmYXVsdCB2YWx1ZSBpZiBtaXNzaW5nLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBmbGFnLlxuICovXG5mdW5jdGlvbiBtYXBCb29sZWFuVmFsdWUoZmxhZzogc3RyaW5nIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCwgZGVmYXVsdEZsYWc6IGJvb2xlYW4pOiBib29sZWFuIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoZmxhZykgfHwgaXNCb29sZWFuKGZsYWcpKSB7XG5cdFx0c3dpdGNoIChmbGFnKSB7XG5cdFx0XHRjYXNlIFwiRmFsc2VcIjpcblx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0Y2FzZSBmYWxzZTpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0Y2FzZSBcIlRydWVcIjpcblx0XHRcdGNhc2UgXCJ0cnVlXCI6XG5cdFx0XHRjYXNlIHRydWU6XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gaWYgc29tZW9uZSBoYXMgZGVmaW5lZCBhIGZsYWcgdGhlbiB0aGUgbGlrZWx5IGhvb2Qgd2FzIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdHJldHVybiAhZGVmYXVsdEZsYWc7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkZWZhdWx0RmxhZztcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwTWV0YWRhdGEgfSBmcm9tIFwiQGZpbm9zL2ZkYzNcIjtcbmltcG9ydCB0eXBlIHsgQXBwSW50ZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCIuLi8uLi9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRBcHBEZWZpbml0aW9uLFxuXHRXZWJBcHBEZXRhaWxzLFxuXHROYXRpdmVBcHBEZXRhaWxzLFxuXHRPbmxpbmVOYXRpdmVBcHBEZXRhaWxzLFxuXHRBcHBJbnRlcm9wLFxuXHRBcHBEZWZpbml0aW9uVHlwZSxcblx0QXBwSW50ZW50cyxcblx0SG9zdE1hbmlmZXN0c1xufSBmcm9tIFwiLi4vLi4vc2hhcGVzL2ZkYzMtMi0wLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuLyoqXG4gKiBNYXAgdGhlIGFwcCBkZWZpbml0aW9uIHRvIGEgcGxhdGZvcm0gYXBwLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIHBsYXRmb3JtIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvUGxhdGZvcm1BcHAoYXBwOiBBcHBEZWZpbml0aW9uKTogUGxhdGZvcm1BcHAge1xuXHRjb25zdCBwbGF0Zm9ybUFwcDogUGxhdGZvcm1BcHAgPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHRtYW5pZmVzdFR5cGU6IG1hcE1hbmlmZXN0VHlwZUZyb21GREMzKGFwcCksXG5cdFx0bWFuaWZlc3Q6IGdldE1hbmlmZXN0RnJvbUZEQzMoYXBwKSBhcyBzdHJpbmcsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRpbnN0YW5jZU1vZGU6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5pbnN0YW5jZU1vZGUsXG5cdFx0aW50ZW50czogbWFwSW50ZW50c0Zyb21GREMzKGFwcC5pbnRlcm9wKSxcblx0XHRpbnRlcm9wOiBhcHAuaW50ZXJvcCxcblx0XHRjdXN0b21Db25maWc6IGFwcC5jdXN0b21Db25maWcsXG5cdFx0dGFnczogYXBwLmNhdGVnb3JpZXMsXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cHVibGlzaGVyOiBhcHAucHVibGlzaGVyID8/IFwiXCIsXG5cdFx0Y29udGFjdEVtYWlsOiBhcHAuY29udGFjdEVtYWlsLFxuXHRcdHN1cHBvcnRFbWFpbDogYXBwLnN1cHBvcnRFbWFpbCxcblx0XHRpY29uczogYXBwLmljb25zID8/IFtdLFxuXHRcdGltYWdlczogYXBwLnNjcmVlbnNob3RzLFxuXHRcdHByaXZhdGU6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5wcml2YXRlLFxuXHRcdGF1dG9zdGFydDogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/LmF1dG9zdGFydCxcblx0XHRsYXVuY2hQcmVmZXJlbmNlOiBhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8ubGF1bmNoUHJlZmVyZW5jZVxuXHR9O1xuXHRyZXR1cm4gcGxhdGZvcm1BcHA7XG59XG5cbi8qKlxuICogTWFwIGEgcGxhdGZvcm0gYXBwIHRvIGFuIEZEQzMgMi4wIGFwcCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGZkYzMgMi4wIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvRkRDM0FwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwRGVmaW5pdGlvbiB7XG5cdGNvbnN0IGZkYzNBcHA6IEFwcERlZmluaXRpb24gPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHR0eXBlOiBtYXBUeXBlRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0ZGV0YWlsczoge30sXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRjYXRlZ29yaWVzOiBhcHAudGFncyA/PyBbXSxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBhcHAuaWNvbnMsXG5cdFx0c2NyZWVuc2hvdHM6IGFwcC5pbWFnZXMsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0aW50ZXJvcDogZ2V0SW50ZXJvcEZyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGhvc3RNYW5pZmVzdHM6IGdldEhvc3RNYW5pZmVzdHNGcm9tUGxhdGZvcm1BcHAoYXBwKVxuXHR9O1xuXHRyZXR1cm4gZmRjM0FwcDtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHBsYXRmb3JtIGFwcCB0byBhcHAgbWV0YWRhdGEuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHBsaWNhdGlvbiB0byBtYXAuXG4gKiBAcGFyYW0gcmVzdWx0VHlwZSBUaGUgcmVzdWx0IHR5cGUgdG8gaW5jbHVkZSBpbiB0aGUgZGF0YS5cbiAqIEByZXR1cm5zIFRoZSBhcHAgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb0FwcE1ldGFEYXRhKGFwcDogUGxhdGZvcm1BcHAsIHJlc3VsdFR5cGU/OiBzdHJpbmcpOiBBcHBNZXRhZGF0YSB7XG5cdGNvbnN0IGFwcE1ldGFEYXRhOiBBcHBNZXRhZGF0YSA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdGRlc2NyaXB0aW9uOiBhcHAuZGVzY3JpcHRpb24sXG5cdFx0aWNvbnM6IGFwcC5pY29ucyxcblx0XHRuYW1lOiBhcHAubmFtZSxcblx0XHRzY3JlZW5zaG90czogYXBwLmltYWdlcyxcblx0XHR0aXRsZTogYXBwLnRpdGxlLFxuXHRcdHRvb2x0aXA6IGFwcC50b29sdGlwLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHJlc3VsdFR5cGVcblx0fTtcblx0cmV0dXJuIGFwcE1ldGFEYXRhO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gaW50ZXJvcCBkYXRhIHRvIGFwcCBpbnRlcm9wIGZvcm1hdC5cbiAqIEBwYXJhbSBpbnRlcm9wIFRoZSBpbnRlcm9wIHRvIG1hcC5cbiAqIEByZXR1cm5zIFRoZSBhcHAgaW50ZXJvcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcEludGVudHNGcm9tRkRDMyhpbnRlcm9wOiBBcHBJbnRlcm9wIHwgdW5kZWZpbmVkKTogQXBwSW50ZW50W10ge1xuXHRjb25zdCBpbnRlbnRzOiBBcHBJbnRlbnRbXSA9IFtdO1xuXG5cdGNvbnN0IGxpc3RlbnNGb3IgPSBpbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yO1xuXHRpZiAoaXNFbXB0eShsaXN0ZW5zRm9yKSkge1xuXHRcdHJldHVybiBpbnRlbnRzO1xuXHR9XG5cblx0Y29uc3QgaW50ZW50SWRzID0gT2JqZWN0LmtleXMobGlzdGVuc0Zvcik7XG5cdGZvciAoY29uc3QgaW50ZW50TmFtZSBvZiBpbnRlbnRJZHMpIHtcblx0XHRpbnRlbnRzLnB1c2goe1xuXHRcdFx0bmFtZTogaW50ZW50TmFtZSxcblx0XHRcdGRpc3BsYXlOYW1lOiBsaXN0ZW5zRm9yW2ludGVudE5hbWVdLmRpc3BsYXlOYW1lID8/IFwiXCIsXG5cdFx0XHRjb250ZXh0czogbGlzdGVuc0ZvcltpbnRlbnROYW1lXS5jb250ZXh0c1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGludGVudHM7XG59XG5cbi8qKlxuICogR2V0IHRoZSBpbnRlcm9wIGRhdGEgZnJvbSBhIFBsYXRmb3JtIEFwcCBpbiBGREMzIDIuMCBmb3JtYXQuXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wIGRlZmluaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldEludGVyb3BGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEludGVyb3Age1xuXHRpZiAoIWlzRW1wdHkoYXBwLmludGVyb3ApKSB7XG5cdFx0cmV0dXJuIGFwcC5pbnRlcm9wO1xuXHR9XG5cdGNvbnN0IGludGVyb3A6IEFwcEludGVyb3AgPSB7XG5cdFx0aW50ZW50czoge1xuXHRcdFx0bGlzdGVuc0Zvcjoge31cblx0XHR9XG5cdH07XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmludGVudHMpICYmIGFwcC5pbnRlbnRzLmxlbmd0aCA+IDApIHtcblx0XHRjb25zdCBsaXN0ZW5zRm9yOiB7IFtrZXk6IHN0cmluZ106IEFwcEludGVudHMgfSA9IHt9O1xuXHRcdGZvciAoY29uc3QgaW50ZW50IG9mIGFwcC5pbnRlbnRzKSB7XG5cdFx0XHRsaXN0ZW5zRm9yW2ludGVudC5uYW1lXSA9IHsgZGlzcGxheU5hbWU6IGludGVudC5kaXNwbGF5TmFtZSwgY29udGV4dHM6IGludGVudC5jb250ZXh0cyB9O1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkoaW50ZXJvcC5pbnRlbnRzKSkge1xuXHRcdFx0aW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3IgPSBsaXN0ZW5zRm9yO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpbnRlcm9wO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgbWFuaWZlc3QgdHlwZS5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBkZWZpbml0aW9uIHRvIG1hcCB0aGUgbWFuaWZlc3QgdHlwZSBmb3IuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIG1hbmlmZXN0IHR5cGUuXG4gKi9cbmZ1bmN0aW9uIG1hcE1hbmlmZXN0VHlwZUZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB7XG5cdGxldCBtYW5pZmVzdFR5cGU6IHN0cmluZztcblxuXHRzd2l0Y2ggKGFwcC50eXBlKSB7XG5cdFx0Y2FzZSBcIndlYlwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS12aWV3XCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImlubGluZS1leHRlcm5hbFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gXCJkZXNrdG9wLWJyb3dzZXJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3RUeXBlID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LnR5cGUgPz8gXCJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAudHlwZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hbmlmZXN0VHlwZTtcbn1cblxuLyoqXG4gKiBNYXBzIHRvIGFuIEZEQzMgMi4wIHR5cGUgZnJvbSB0aGUgbWFuaWZlc3QgdHlwZSBzcGVjaWZpZWQgYnkgYSBwbGF0Zm9ybSBhcHAuXG4gKiBAcGFyYW0gYXBwIHRoZSBwbGF0Zm9ybSBhcHAgdG8gdXNlIGFzIGEgc291cmNlXG4gKiBAcmV0dXJucyB0aGUgRkRDMyAyLjAgYXBwIGRlZmluaXRpb24gdHlwZVxuICovXG5mdW5jdGlvbiBtYXBUeXBlRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBEZWZpbml0aW9uVHlwZSB7XG5cdGxldCB0eXBlOiBBcHBEZWZpbml0aW9uVHlwZSA9IFwib3RoZXJcIjtcblx0aWYgKGlzRW1wdHkoYXBwLm1hbmlmZXN0VHlwZSkpIHtcblx0XHRyZXR1cm4gdHlwZTtcblx0fVxuXHRzd2l0Y2ggKGFwcC5tYW5pZmVzdFR5cGUpIHtcblx0XHRjYXNlIFwiaW5saW5lLXZpZXdcIjoge1xuXHRcdFx0dHlwZSA9IFwid2ViXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImlubGluZS1leHRlcm5hbFwiOiB7XG5cdFx0XHR0eXBlID0gXCJuYXRpdmVcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiZGVza3RvcC1icm93c2VyXCI6IHtcblx0XHRcdHR5cGUgPSBcIm9ubGluZU5hdGl2ZVwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0eXBlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbWFuaWZlc3Qgd2hpY2ggY2FuIGJlIHBsYWluIHN0cmluZyBvciBKU09OLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIGdldCB0aGUgbWFuaWZlc3QgZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBtYW5pZmVzdC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBzdHJpbmcgfCB1bmtub3duIHtcblx0bGV0IG1hbmlmZXN0OiBzdHJpbmcgfCB1bmtub3duO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdGlmICghaXNFbXB0eShhcHA/LmRldGFpbHMpKSB7XG5cdFx0XHRcdGNvbnN0IGhvc3REZXRhaWxzID0gYXBwLmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmRldGFpbHM7XG5cdFx0XHRcdGlmIChpc09iamVjdChob3N0RGV0YWlscykpIHtcblx0XHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdHVybDogKGFwcD8uZGV0YWlscyBhcyBXZWJBcHBEZXRhaWxzKS51cmwsXG5cdFx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIyLjBcIixcblx0XHRcdFx0XHRcdC4uLmhvc3REZXRhaWxzXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcdHVybDogKGFwcD8uZGV0YWlscyBhcyBXZWJBcHBEZXRhaWxzKS51cmwsXG5cdFx0XHRcdFx0XHRmZGMzSW50ZXJvcEFwaTogXCIyLjBcIlxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdGlmICghaXNFbXB0eShhcHA/LmRldGFpbHMpKSB7XG5cdFx0XHRcdC8vIG91ciBuYXRpdmUgYXBpIHN1cHBvcnRzIHBhdGggYW5kIGFyZ3VtZW50cy5cblx0XHRcdFx0bWFuaWZlc3QgPSBhcHAuZGV0YWlscyBhcyBOYXRpdmVBcHBEZXRhaWxzO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvbmxpbmVOYXRpdmVcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0bWFuaWZlc3QgPSAoYXBwPy5kZXRhaWxzIGFzIE9ubGluZU5hdGl2ZUFwcERldGFpbHMpLnVybDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwib3RoZXJcIjoge1xuXHRcdFx0bWFuaWZlc3QgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3Q7XG59XG5cbi8qKlxuICogR2V0IHRoZSBIb3N0IERldGFpbHMgZnJvbSB0aGUgcGxhdGZvcm0gYXBwIGZvciB0aGlzIEZEQzMgMi4wIEFwcCBEZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIGdldCB0aGUgaW5mb3JtYXRpb24gZnJvbS5cbiAqIEByZXR1cm5zIFRoZSBob3N0IHNwZWNpZmljIGRldGFpbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEhvc3RNYW5pZmVzdHNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEhvc3RNYW5pZmVzdHMge1xuXHRjb25zdCBob3N0TWFuaWZlc3RzOiBIb3N0TWFuaWZlc3RzID0ge1xuXHRcdE9wZW5GaW46IHtcblx0XHRcdHR5cGU6IGFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0XHRkZXRhaWxzOiBhcHAubWFuaWZlc3QsXG5cdFx0XHRjb25maWc6IHtcblx0XHRcdFx0YXV0b3N0YXJ0OiBhcHAuYXV0b3N0YXJ0LFxuXHRcdFx0XHRwcml2YXRlOiBhcHAucHJpdmF0ZSxcblx0XHRcdFx0aW5zdGFuY2VNb2RlOiBhcHAuaW5zdGFuY2VNb2RlLFxuXHRcdFx0XHRsYXVuY2hQcmVmZXJlbmNlOiBhcHAubGF1bmNoUHJlZmVyZW5jZVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGhvc3RNYW5pZmVzdHM7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogQSBzZXQgb2YgaGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFwcGluZyBiZXR3ZWVuIGZkYzMgMS4yIGFuZCBhIFBsYXRmb3JtIEFwcFxuICovXG5leHBvcnQgKiBhcyBmZGMzTWFwcGVyMVBvaW50MiBmcm9tIFwiLi8xLjIvbWFwcGVyXCI7XG4vKipcbiAqIEEgc2V0IG9mIGhlbHBlciBmdW5jdGlvbnMgZm9yIG1hcHBpbmcgYmV0d2VlbiBmZGMzIDIuMCBhbmQgYSBQbGF0Zm9ybSBBcHBcbiAqL1xuZXhwb3J0ICogYXMgZmRjM01hcHBlcjJQb2ludDAgZnJvbSBcIi4vMi4wL21hcHBlclwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9