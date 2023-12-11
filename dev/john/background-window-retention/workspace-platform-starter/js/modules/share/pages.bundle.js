/******/ var __webpack_modules__ = ({

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


/***/ }),

/***/ "./client/src/modules/share/common/share-common.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/share/common/share-common.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadShareRequest: () => (/* binding */ loadShareRequest),
/* harmony export */   saveShareRequest: () => (/* binding */ saveShareRequest)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Save the request.
 * @param platform The workspace platform.
 * @param logger The logger for information.
 * @param endpointClient The endpoint client.
 * @param endpointId The endpoint id.
 * @param shareType The share type.
 * @param payload The payload to save.
 * @returns The confirmation to display.
 */
async function saveShareRequest(platform, logger, endpointClient, endpointId, shareType, payload) {
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointClient)) {
        logger?.warn("Endpoint client is not available.");
        return;
    }
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointClient.requestResponse)) {
        logger?.warn("Endpoint client requestResponse is not available.");
        return;
    }
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointId)) {
        logger?.warn("Endpoint id is not available.");
        return;
    }
    try {
        const expiryInHours = 24;
        const response = await endpointClient.requestResponse(endpointId, {
            type: shareType,
            data: payload
        });
        if (response) {
            let id = response.id;
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
                const indexOfId = response.url.lastIndexOf("/");
                if (indexOfId !== -1) {
                    id = response.url.slice(indexOfId + 1);
                }
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id)) {
                const platformInfo = await platform.Application.getInfo();
                let finsLink;
                if (platformInfo.manifestUrl.startsWith("http")) {
                    finsLink = `${platformInfo.manifestUrl.replace("http", "fin")}?$$shareType=${shareType}&$$payload=${btoa(JSON.stringify({ id }))}`;
                }
                else {
                    logger?.error("We do not support file based manifest launches. The manifest has to be served over http/https:", platformInfo.manifestUrl);
                }
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(finsLink)) {
                    await fin.Clipboard.writeText({
                        data: finsLink
                    });
                    return {
                        title: "Share Request Raised",
                        message: `The share request you raised has been copied to the **clipboard** and will be valid for ${expiryInHours} hours. \n Share Url: \n * **${finsLink}**`,
                        status: "shared"
                    };
                }
            }
        }
    }
    catch (error) {
        logger?.error("Error saving share request:", error);
    }
    return {
        title: "Share Request Failed",
        message: "The share request you raised could not be generated.",
        status: "error"
    };
}
/**
 * Load the request.
 * @param logger The logger for information.
 * @param endpointClient The endpoint client.
 * @param endpointId The endpoint id.
 * @param shareType The share type.
 * @param id The id of the request to load.
 * @returns The loaded payload and any confirmation to display.
 */
async function loadShareRequest(logger, endpointClient, endpointId, shareType, id) {
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointClient)) {
        logger?.warn("Endpoint client is not available.");
        return;
    }
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointClient.requestResponse)) {
        logger?.warn("Endpoint client requestResponse is not available.");
        return;
    }
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointId)) {
        logger?.warn("Endpoint id is not available.");
        return;
    }
    try {
        const response = await endpointClient.requestResponse("share-get", { id });
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(response)) {
            if (shareType !== response.type) {
                logger?.warn(`Share entry of mismatched type specified: ${response.type} it should be ${shareType}`);
                return {
                    confirmation: {
                        title: "Share Load Failed",
                        message: "The specified share link does not contain the correct data for the share type.",
                        status: "error"
                    }
                };
            }
            return {
                payload: response.data,
                confirmation: {
                    title: "Share Request Applied",
                    message: "The share request has been fetched and applied.",
                    status: "loaded"
                }
            };
        }
        return {
            confirmation: {
                title: "Share Load Expired",
                message: "The share request has expired and is no longer available.",
                status: "error"
            }
        };
    }
    catch (error) {
        logger?.error("There has been an error trying to load and apply the share link.", error);
    }
    return {
        confirmation: {
            title: "Share Load Failed",
            message: "The specified share link cannot be loaded.",
            status: "error"
        }
    };
}


/***/ }),

/***/ "./client/src/modules/share/pages/share.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/share/pages/share.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PagesShareProvider: () => (/* binding */ PagesShareProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _common_share_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/share-common */ "./client/src/modules/share/common/share-common.ts");


/**
 * Implementation for the pages share provider.
 */
class PagesShareProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._definition = definition;
        this._logger = loggerCreator("PagesShareProvider");
        this._helpers = helpers;
        this._logger.info("Initializing");
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
    }
    /**
     * Get the list of share types supported by the module.
     * @returns Nothing.
     */
    async getShareTypes() {
        return ["page"];
    }
    /**
     * Get the shares from the module.
     * @param windowIdentity The window identity to get the shares for.
     * @returns Nothing.
     */
    async getEntries(windowIdentity) {
        const platform = await this._helpers?.getPlatform?.();
        if (platform) {
            const window = platform.Browser.wrapSync(windowIdentity);
            const pages = await window.getPages();
            let pageId;
            for (const page of pages) {
                if (page.isActive) {
                    pageId = page.pageId;
                    break;
                }
            }
            if (pageId) {
                const pageShareEntryPayload = {
                    windowIdentity,
                    pageId
                };
                return [
                    {
                        label: "Share Page",
                        type: "page",
                        payload: pageShareEntryPayload
                    }
                ];
            }
        }
    }
    /**
     * Perform the share for the given entry.
     * @param type The type of share to perform.
     * @param payload The data to associate with the share.
     * @returns Nothing.
     */
    async share(type, payload) {
        if (type === "page") {
            const platform = await this._helpers?.getPlatform?.();
            if (platform && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload)) {
                let page = payload?.page;
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload?.page) && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(payload.pageId)) {
                    let useStorage = true;
                    try {
                        // Try and get the page details from the passed window
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload.windowIdentity)) {
                            const targetWindow = platform.Browser.wrapSync(payload.windowIdentity);
                            page = await targetWindow.getPage(payload.pageId);
                            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(page?.customData)) {
                                page.customData = {};
                            }
                            page.customData.windowBounds = await targetWindow.openfinWindow.getBounds();
                            useStorage = false;
                        }
                    }
                    catch { }
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(page) && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload.windowIdentity)) {
                        // we haven't got a passed page and we were not given a window identity but we do have a pageId
                        // try and find an attached page which matches
                        const attachedPages = await platform.Browser.getAllAttachedPages();
                        for (const attachedPage of attachedPages) {
                            if (attachedPage.pageId === payload.pageId) {
                                page = { ...attachedPage };
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(attachedPage.parentIdentity)) {
                                    const targetWindow = platform.Browser.wrapSync(attachedPage.parentIdentity);
                                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(page.customData)) {
                                        page.customData = {};
                                    }
                                    page.customData.windowBounds = await targetWindow.openfinWindow.getBounds();
                                }
                                useStorage = false;
                                break;
                            }
                        }
                    }
                    if (useStorage) {
                        page = await platform.Storage.getPage(payload.pageId);
                    }
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(page)) {
                    const confirmation = await (0,_common_share_common__WEBPACK_IMPORTED_MODULE_1__.saveShareRequest)(platform, this._logger, await this._helpers?.getEndpointClient?.(), this._definition?.data?.setEndpointId, type, page);
                    await this.showConfirmation(confirmation, payload.windowIdentity);
                }
            }
        }
    }
    /**
     * Handle a share activation.
     * @param type The type of the share.
     * @param payload The payload for the share.
     * @param payload.id The payload for the share.
     * @returns Nothing.
     */
    async handle(type, payload) {
        if (type === "page") {
            const response = await (0,_common_share_common__WEBPACK_IMPORTED_MODULE_1__.loadShareRequest)(this._logger, await this._helpers?.getEndpointClient?.(), this._definition?.data?.getEndpointId, type, payload.id);
            const platform = await this._helpers?.getPlatform?.();
            if (platform) {
                const responsePayload = response?.payload;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(responsePayload) && this._helpers?.launchPage) {
                    await platform.Storage.savePage(responsePayload);
                    await this._helpers.launchPage(responsePayload.pageId, undefined, this._logger);
                }
            }
            await this.showConfirmation(response?.confirmation);
        }
    }
    /**
     * Show a confirmation.
     * @param confirmation The confirmation options.
     * @param parentIdentity The identity of the parent window.
     */
    async showConfirmation(confirmation, parentIdentity) {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(confirmation) && this._helpers?.getShareClient) {
            this._logger?.info(confirmation);
            const shareClient = await this._helpers.getShareClient();
            if (shareClient) {
                const iconKey = confirmation.status === "error" ? "error" : "success";
                confirmation.iconUrl = this._definition?.data?.images[iconKey];
                if (this._helpers?.getThemeClient && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(confirmation.iconUrl)) {
                    const themeClient = await this._helpers.getThemeClient();
                    confirmation.iconUrl = await themeClient.themeUrl(confirmation.iconUrl);
                }
                await shareClient.confirmation(confirmation, this._definition?.data?.confirmationMode, parentIdentity);
            }
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
/*!*************************************************!*\
  !*** ./client/src/modules/share/pages/index.ts ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./share */ "./client/src/modules/share/pages/share.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    share: new _share__WEBPACK_IMPORTED_MODULE_0__.PagesShareProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBRTdDOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLEtBQUssRUFBRSxJQUFJLHNEQUFrQixFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvY29tbW9uL3NoYXJlLWNvbW1vbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvcGFnZXMvc2hhcmUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL3NoYXJlL3BhZ2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSBnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IEVuZHBvaW50Q2xpZW50IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2hhcmUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogU2F2ZSB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgd29ya3NwYWNlIHBsYXRmb3JtLlxuICogQHBhcmFtIGxvZ2dlciBUaGUgbG9nZ2VyIGZvciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSBlbmRwb2ludENsaWVudCBUaGUgZW5kcG9pbnQgY2xpZW50LlxuICogQHBhcmFtIGVuZHBvaW50SWQgVGhlIGVuZHBvaW50IGlkLlxuICogQHBhcmFtIHNoYXJlVHlwZSBUaGUgc2hhcmUgdHlwZS5cbiAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHRvIHNhdmUuXG4gKiBAcmV0dXJucyBUaGUgY29uZmlybWF0aW9uIHRvIGRpc3BsYXkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlU2hhcmVSZXF1ZXN0KFxuXHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdGxvZ2dlcjogTG9nZ2VyIHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c2hhcmVUeXBlOiBzdHJpbmcsXG5cdHBheWxvYWQ6IHVua25vd25cbik6IFByb21pc2U8U2hhcmVDb25maXJtYXRpb25PcHRpb25zIHwgdW5kZWZpbmVkPiB7XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50KSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCByZXF1ZXN0UmVzcG9uc2UgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50SWQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgaWQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3QgZXhwaXJ5SW5Ib3VycyA9IDI0O1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlPFxuXHRcdFx0eyB0eXBlOiBzdHJpbmc7IGRhdGE6IHVua25vd24gfSxcblx0XHRcdHsgdXJsOiBzdHJpbmc7IGlkPzogc3RyaW5nIH1cblx0XHQ+KGVuZHBvaW50SWQsIHtcblx0XHRcdHR5cGU6IHNoYXJlVHlwZSxcblx0XHRcdGRhdGE6IHBheWxvYWRcblx0XHR9KTtcblxuXHRcdGlmIChyZXNwb25zZSkge1xuXHRcdFx0bGV0IGlkID0gcmVzcG9uc2UuaWQ7XG5cdFx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0Y29uc3QgaW5kZXhPZklkID0gcmVzcG9uc2UudXJsLmxhc3RJbmRleE9mKFwiL1wiKTtcblx0XHRcdFx0aWYgKGluZGV4T2ZJZCAhPT0gLTEpIHtcblx0XHRcdFx0XHRpZCA9IHJlc3BvbnNlLnVybC5zbGljZShpbmRleE9mSWQgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRW1wdHkoaWQpKSB7XG5cdFx0XHRcdGNvbnN0IHBsYXRmb3JtSW5mbyA9IGF3YWl0IHBsYXRmb3JtLkFwcGxpY2F0aW9uLmdldEluZm8oKTtcblx0XHRcdFx0bGV0IGZpbnNMaW5rOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0aWYgKHBsYXRmb3JtSW5mby5tYW5pZmVzdFVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdFx0XHRcdGZpbnNMaW5rID0gYCR7cGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRcImh0dHBcIixcblx0XHRcdFx0XHRcdFwiZmluXCJcblx0XHRcdFx0XHQpfT8kJHNoYXJlVHlwZT0ke3NoYXJlVHlwZX0mJCRwYXlsb2FkPSR7YnRvYShKU09OLnN0cmluZ2lmeSh7IGlkIH0pKX1gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcIldlIGRvIG5vdCBzdXBwb3J0IGZpbGUgYmFzZWQgbWFuaWZlc3QgbGF1bmNoZXMuIFRoZSBtYW5pZmVzdCBoYXMgdG8gYmUgc2VydmVkIG92ZXIgaHR0cC9odHRwczpcIixcblx0XHRcdFx0XHRcdHBsYXRmb3JtSW5mby5tYW5pZmVzdFVybFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShmaW5zTGluaykpIHtcblx0XHRcdFx0XHRhd2FpdCBmaW4uQ2xpcGJvYXJkLndyaXRlVGV4dCh7XG5cdFx0XHRcdFx0XHRkYXRhOiBmaW5zTGlua1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlNoYXJlIFJlcXVlc3QgUmFpc2VkXCIsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBgVGhlIHNoYXJlIHJlcXVlc3QgeW91IHJhaXNlZCBoYXMgYmVlbiBjb3BpZWQgdG8gdGhlICoqY2xpcGJvYXJkKiogYW5kIHdpbGwgYmUgdmFsaWQgZm9yICR7ZXhwaXJ5SW5Ib3Vyc30gaG91cnMuIFxcbiBTaGFyZSBVcmw6IFxcbiAqICoqJHtmaW5zTGlua30qKmAsXG5cdFx0XHRcdFx0XHRzdGF0dXM6IFwic2hhcmVkXCJcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJFcnJvciBzYXZpbmcgc2hhcmUgcmVxdWVzdDpcIiwgZXJyb3IpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHR0aXRsZTogXCJTaGFyZSBSZXF1ZXN0IEZhaWxlZFwiLFxuXHRcdG1lc3NhZ2U6IFwiVGhlIHNoYXJlIHJlcXVlc3QgeW91IHJhaXNlZCBjb3VsZCBub3QgYmUgZ2VuZXJhdGVkLlwiLFxuXHRcdHN0YXR1czogXCJlcnJvclwiXG5cdH07XG59XG5cbi8qKlxuICogTG9hZCB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSBsb2dnZXIgVGhlIGxvZ2dlciBmb3IgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0gZW5kcG9pbnRDbGllbnQgVGhlIGVuZHBvaW50IGNsaWVudC5cbiAqIEBwYXJhbSBlbmRwb2ludElkIFRoZSBlbmRwb2ludCBpZC5cbiAqIEBwYXJhbSBzaGFyZVR5cGUgVGhlIHNoYXJlIHR5cGUuXG4gKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSByZXF1ZXN0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyBUaGUgbG9hZGVkIHBheWxvYWQgYW5kIGFueSBjb25maXJtYXRpb24gdG8gZGlzcGxheS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTaGFyZVJlcXVlc3Q8VD4oXG5cdGxvZ2dlcjogTG9nZ2VyIHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c2hhcmVUeXBlOiBzdHJpbmcsXG5cdGlkOiBzdHJpbmdcbik6IFByb21pc2U8XG5cdHwge1xuXHRcdFx0cGF5bG9hZD86IFQ7XG5cdFx0XHRjb25maXJtYXRpb246IFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB8IHVuZGVmaW5lZDtcblx0ICB9XG5cdHwgdW5kZWZpbmVkXG4+IHtcblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2UpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IHJlcXVlc3RSZXNwb25zZSBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRJZCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBpZCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTx7IGlkOiBzdHJpbmcgfSwgeyB0eXBlOiBzdHJpbmc7IGRhdGE6IFQgfT4oXG5cdFx0XHRcInNoYXJlLWdldFwiLFxuXHRcdFx0eyBpZCB9XG5cdFx0KTtcblx0XHRpZiAoIWlzRW1wdHkocmVzcG9uc2UpKSB7XG5cdFx0XHRpZiAoc2hhcmVUeXBlICE9PSByZXNwb25zZS50eXBlKSB7XG5cdFx0XHRcdGxvZ2dlcj8ud2FybihgU2hhcmUgZW50cnkgb2YgbWlzbWF0Y2hlZCB0eXBlIHNwZWNpZmllZDogJHtyZXNwb25zZS50eXBlfSBpdCBzaG91bGQgYmUgJHtzaGFyZVR5cGV9YCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29uZmlybWF0aW9uOiB7XG5cdFx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZSBMb2FkIEZhaWxlZFwiLFxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgc3BlY2lmaWVkIHNoYXJlIGxpbmsgZG9lcyBub3QgY29udGFpbiB0aGUgY29ycmVjdCBkYXRhIGZvciB0aGUgc2hhcmUgdHlwZS5cIixcblx0XHRcdFx0XHRcdHN0YXR1czogXCJlcnJvclwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kYXRhLFxuXHRcdFx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZSBSZXF1ZXN0IEFwcGxpZWRcIixcblx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBzaGFyZSByZXF1ZXN0IGhhcyBiZWVuIGZldGNoZWQgYW5kIGFwcGxpZWQuXCIsXG5cdFx0XHRcdFx0c3RhdHVzOiBcImxvYWRlZFwiXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgTG9hZCBFeHBpcmVkXCIsXG5cdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNoYXJlIHJlcXVlc3QgaGFzIGV4cGlyZWQgYW5kIGlzIG5vIGxvbmdlciBhdmFpbGFibGUuXCIsXG5cdFx0XHRcdHN0YXR1czogXCJlcnJvclwiXG5cdFx0XHR9XG5cdFx0fTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3IgdHJ5aW5nIHRvIGxvYWQgYW5kIGFwcGx5IHRoZSBzaGFyZSBsaW5rLlwiLCBlcnJvcik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGNvbmZpcm1hdGlvbjoge1xuXHRcdFx0dGl0bGU6IFwiU2hhcmUgTG9hZCBGYWlsZWRcIixcblx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNwZWNpZmllZCBzaGFyZSBsaW5rIGNhbm5vdCBiZSBsb2FkZWQuXCIsXG5cdFx0XHRzdGF0dXM6IFwiZXJyb3JcIlxuXHRcdH1cblx0fTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgUGFnZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0U2hhcmUsXG5cdFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyxcblx0U2hhcmVFbnRyeVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3NoYXJlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgbG9hZFNoYXJlUmVxdWVzdCwgc2F2ZVNoYXJlUmVxdWVzdCB9IGZyb20gXCIuLi9jb21tb24vc2hhcmUtY29tbW9uXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2VTaGFyZUVudHJ5UGF5bG9hZCwgUGFnZXNTaGFyZVByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgcGFnZXMgc2hhcmUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlc1NoYXJlUHJvdmlkZXIgaW1wbGVtZW50cyBTaGFyZTxQYWdlc1NoYXJlUHJvdmlkZXJPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24gaW5jbHVkaW5nIHNldHRpbmdzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTaGFyZVByb3ZpZGVyT3B0aW9ucz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NoYXJlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIlBhZ2VzU2hhcmVQcm92aWRlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxpc3Qgb2Ygc2hhcmUgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2hhcmVUeXBlcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG5cdFx0cmV0dXJuIFtcInBhZ2VcIl07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzaGFyZXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gd2luZG93SWRlbnRpdHkgVGhlIHdpbmRvdyBpZGVudGl0eSB0byBnZXQgdGhlIHNoYXJlcyBmb3IuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0RW50cmllcyh3aW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSk6IFByb21pc2U8U2hhcmVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0Y29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRQbGF0Zm9ybT8uKCk7XG5cblx0XHRpZiAocGxhdGZvcm0pIHtcblx0XHRcdGNvbnN0IHdpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmMod2luZG93SWRlbnRpdHkpO1xuXHRcdFx0Y29uc3QgcGFnZXMgPSBhd2FpdCB3aW5kb3cuZ2V0UGFnZXMoKTtcblxuXHRcdFx0bGV0IHBhZ2VJZDtcblx0XHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0XHRpZiAocGFnZS5pc0FjdGl2ZSkge1xuXHRcdFx0XHRcdHBhZ2VJZCA9IHBhZ2UucGFnZUlkO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYWdlSWQpIHtcblx0XHRcdFx0Y29uc3QgcGFnZVNoYXJlRW50cnlQYXlsb2FkOiBQYWdlU2hhcmVFbnRyeVBheWxvYWQgPSB7XG5cdFx0XHRcdFx0d2luZG93SWRlbnRpdHksXG5cdFx0XHRcdFx0cGFnZUlkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsYWJlbDogXCJTaGFyZSBQYWdlXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcInBhZ2VcIixcblx0XHRcdFx0XHRcdHBheWxvYWQ6IHBhZ2VTaGFyZUVudHJ5UGF5bG9hZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgc2hhcmUgZm9yIHRoZSBnaXZlbiBlbnRyeS5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2Ygc2hhcmUgdG8gcGVyZm9ybS5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIGRhdGEgdG8gYXNzb2NpYXRlIHdpdGggdGhlIHNoYXJlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNoYXJlKHR5cGU6IHN0cmluZywgcGF5bG9hZD86IFBhZ2VTaGFyZUVudHJ5UGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0eXBlID09PSBcInBhZ2VcIikge1xuXHRcdFx0Y29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRQbGF0Zm9ybT8uKCk7XG5cblx0XHRcdGlmIChwbGF0Zm9ybSAmJiAhaXNFbXB0eShwYXlsb2FkKSkge1xuXHRcdFx0XHRsZXQgcGFnZTogUGFnZSB8IHVuZGVmaW5lZCA9IHBheWxvYWQ/LnBhZ2U7XG5cblx0XHRcdFx0aWYgKGlzRW1wdHkocGF5bG9hZD8ucGFnZSkgJiYgaXNTdHJpbmdWYWx1ZShwYXlsb2FkLnBhZ2VJZCkpIHtcblx0XHRcdFx0XHRsZXQgdXNlU3RvcmFnZSA9IHRydWU7XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Ly8gVHJ5IGFuZCBnZXQgdGhlIHBhZ2UgZGV0YWlscyBmcm9tIHRoZSBwYXNzZWQgd2luZG93XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZC53aW5kb3dJZGVudGl0eSkpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0XHRcdFx0cGFnZSA9IGF3YWl0IHRhcmdldFdpbmRvdy5nZXRQYWdlKHBheWxvYWQucGFnZUlkKTtcblx0XHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocGFnZT8uY3VzdG9tRGF0YSkpIHtcblx0XHRcdFx0XHRcdFx0XHRwYWdlLmN1c3RvbURhdGEgPSB7fTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwYWdlLmN1c3RvbURhdGEud2luZG93Qm91bmRzID0gYXdhaXQgdGFyZ2V0V2luZG93Lm9wZW5maW5XaW5kb3cuZ2V0Qm91bmRzKCk7XG5cdFx0XHRcdFx0XHRcdHVzZVN0b3JhZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIHt9XG5cblx0XHRcdFx0XHRpZiAoaXNFbXB0eShwYWdlKSAmJiBpc0VtcHR5KHBheWxvYWQud2luZG93SWRlbnRpdHkpKSB7XG5cdFx0XHRcdFx0XHQvLyB3ZSBoYXZlbid0IGdvdCBhIHBhc3NlZCBwYWdlIGFuZCB3ZSB3ZXJlIG5vdCBnaXZlbiBhIHdpbmRvdyBpZGVudGl0eSBidXQgd2UgZG8gaGF2ZSBhIHBhZ2VJZFxuXHRcdFx0XHRcdFx0Ly8gdHJ5IGFuZCBmaW5kIGFuIGF0dGFjaGVkIHBhZ2Ugd2hpY2ggbWF0Y2hlc1xuXHRcdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWRQYWdlcyA9IGF3YWl0IHBsYXRmb3JtLkJyb3dzZXIuZ2V0QWxsQXR0YWNoZWRQYWdlcygpO1xuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBhdHRhY2hlZFBhZ2Ugb2YgYXR0YWNoZWRQYWdlcykge1xuXHRcdFx0XHRcdFx0XHRpZiAoYXR0YWNoZWRQYWdlLnBhZ2VJZCA9PT0gcGF5bG9hZC5wYWdlSWQpIHtcblx0XHRcdFx0XHRcdFx0XHRwYWdlID0geyAuLi5hdHRhY2hlZFBhZ2UgfTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoYXR0YWNoZWRQYWdlLnBhcmVudElkZW50aXR5KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhhdHRhY2hlZFBhZ2UucGFyZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocGFnZS5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYWdlLmN1c3RvbURhdGEgPSB7fTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YS53aW5kb3dCb3VuZHMgPSBhd2FpdCB0YXJnZXRXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0dXNlU3RvcmFnZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VTdG9yYWdlKSB7XG5cdFx0XHRcdFx0XHRwYWdlID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlKHBheWxvYWQucGFnZUlkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkocGFnZSkpIHtcblx0XHRcdFx0XHRjb25zdCBjb25maXJtYXRpb24gPSBhd2FpdCBzYXZlU2hhcmVSZXF1ZXN0KFxuXHRcdFx0XHRcdFx0cGxhdGZvcm0sXG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIsXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudD8uKCksXG5cdFx0XHRcdFx0XHR0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5zZXRFbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0dHlwZSxcblx0XHRcdFx0XHRcdHBhZ2Vcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zaG93Q29uZmlybWF0aW9uKGNvbmZpcm1hdGlvbiwgcGF5bG9hZC53aW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgc2hhcmUgYWN0aXZhdGlvbi5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIHNoYXJlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmb3IgdGhlIHNoYXJlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZC5pZCBUaGUgcGF5bG9hZCBmb3IgdGhlIHNoYXJlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZSh0eXBlOiBzdHJpbmcsIHBheWxvYWQ6IHsgaWQ6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHR5cGUgPT09IFwicGFnZVwiKSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGxvYWRTaGFyZVJlcXVlc3Q8UGFnZT4oXG5cdFx0XHRcdHRoaXMuX2xvZ2dlcixcblx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8uZ2V0RW5kcG9pbnRDbGllbnQ/LigpLFxuXHRcdFx0XHR0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5nZXRFbmRwb2ludElkLFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRwYXlsb2FkLmlkXG5cdFx0XHQpO1xuXG5cdFx0XHRjb25zdCBwbGF0Zm9ybSA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldFBsYXRmb3JtPy4oKTtcblx0XHRcdGlmIChwbGF0Zm9ybSkge1xuXHRcdFx0XHRjb25zdCByZXNwb25zZVBheWxvYWQgPSByZXNwb25zZT8ucGF5bG9hZDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KHJlc3BvbnNlUGF5bG9hZCkgJiYgdGhpcy5faGVscGVycz8ubGF1bmNoUGFnZSkge1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVBhZ2UocmVzcG9uc2VQYXlsb2FkKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzLmxhdW5jaFBhZ2UocmVzcG9uc2VQYXlsb2FkLnBhZ2VJZCwgdW5kZWZpbmVkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IHRoaXMuc2hvd0NvbmZpcm1hdGlvbihyZXNwb25zZT8uY29uZmlybWF0aW9uKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyBhIGNvbmZpcm1hdGlvbi5cblx0ICogQHBhcmFtIGNvbmZpcm1hdGlvbiBUaGUgY29uZmlybWF0aW9uIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBwYXJlbnRJZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIHBhcmVudCB3aW5kb3cuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHNob3dDb25maXJtYXRpb24oXG5cdFx0Y29uZmlybWF0aW9uOiBTaGFyZUNvbmZpcm1hdGlvbk9wdGlvbnMgfCB1bmRlZmluZWQsXG5cdFx0cGFyZW50SWRlbnRpdHk/OiBPcGVuRmluLklkZW50aXR5XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghaXNFbXB0eShjb25maXJtYXRpb24pICYmIHRoaXMuX2hlbHBlcnM/LmdldFNoYXJlQ2xpZW50KSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oY29uZmlybWF0aW9uKTtcblx0XHRcdGNvbnN0IHNoYXJlQ2xpZW50ID0gYXdhaXQgdGhpcy5faGVscGVycy5nZXRTaGFyZUNsaWVudCgpO1xuXHRcdFx0aWYgKHNoYXJlQ2xpZW50KSB7XG5cdFx0XHRcdGNvbnN0IGljb25LZXkgPSBjb25maXJtYXRpb24uc3RhdHVzID09PSBcImVycm9yXCIgPyBcImVycm9yXCIgOiBcInN1Y2Nlc3NcIjtcblx0XHRcdFx0Y29uZmlybWF0aW9uLmljb25VcmwgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5pbWFnZXNbaWNvbktleV07XG5cdFx0XHRcdGlmICh0aGlzLl9oZWxwZXJzPy5nZXRUaGVtZUNsaWVudCAmJiAhaXNFbXB0eShjb25maXJtYXRpb24uaWNvblVybCkpIHtcblx0XHRcdFx0XHRjb25zdCB0aGVtZUNsaWVudCA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblx0XHRcdFx0XHRjb25maXJtYXRpb24uaWNvblVybCA9IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKGNvbmZpcm1hdGlvbi5pY29uVXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhd2FpdCBzaGFyZUNsaWVudC5jb25maXJtYXRpb24oXG5cdFx0XHRcdFx0Y29uZmlybWF0aW9uLFxuXHRcdFx0XHRcdHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmNvbmZpcm1hdGlvbk1vZGUsXG5cdFx0XHRcdFx0cGFyZW50SWRlbnRpdHlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFBhZ2VzU2hhcmVQcm92aWRlciB9IGZyb20gXCIuL3NoYXJlXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRzaGFyZTogbmV3IFBhZ2VzU2hhcmVQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9