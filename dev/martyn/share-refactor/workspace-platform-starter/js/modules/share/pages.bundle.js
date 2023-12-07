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
                    const page = await platform.Storage.getPage(responsePayload.pageId);
                    if (page) {
                        await platform.Storage.updatePage({ pageId: responsePayload.pageId, page: responsePayload });
                    }
                    else {
                        await platform.Storage.savePage(responsePayload);
                    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFjLENBQ2QsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDOU9EO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFFN0M7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsS0FBSyxFQUFFLElBQUksc0RBQWtCLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS9jb21tb24vc2hhcmUtY29tbW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS9wYWdlcy9zaGFyZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnRDbGllbnQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgU2hhcmVDb25maXJtYXRpb25PcHRpb25zIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9zaGFyZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBTYXZlIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHBsYXRmb3JtIFRoZSB3b3Jrc3BhY2UgcGxhdGZvcm0uXG4gKiBAcGFyYW0gbG9nZ2VyIFRoZSBsb2dnZXIgZm9yIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIGVuZHBvaW50Q2xpZW50IFRoZSBlbmRwb2ludCBjbGllbnQuXG4gKiBAcGFyYW0gZW5kcG9pbnRJZCBUaGUgZW5kcG9pbnQgaWQuXG4gKiBAcGFyYW0gc2hhcmVUeXBlIFRoZSBzaGFyZSB0eXBlLlxuICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQgdG8gc2F2ZS5cbiAqIEByZXR1cm5zIFRoZSBjb25maXJtYXRpb24gdG8gZGlzcGxheS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTaGFyZVJlcXVlc3QoXG5cdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0bG9nZ2VyOiBMb2dnZXIgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50Q2xpZW50OiBFbmRwb2ludENsaWVudCB8IHVuZGVmaW5lZCxcblx0ZW5kcG9pbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuXHRzaGFyZVR5cGU6IHN0cmluZyxcblx0cGF5bG9hZDogdW5rbm93blxuKTogUHJvbWlzZTxTaGFyZUNvbmZpcm1hdGlvbk9wdGlvbnMgfCB1bmRlZmluZWQ+IHtcblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2UpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IHJlcXVlc3RSZXNwb25zZSBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRJZCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBpZCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0dHJ5IHtcblx0XHRjb25zdCBleHBpcnlJbkhvdXJzID0gMjQ7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBlbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2U8XG5cdFx0XHR7IHR5cGU6IHN0cmluZzsgZGF0YTogdW5rbm93biB9LFxuXHRcdFx0eyB1cmw6IHN0cmluZzsgaWQ/OiBzdHJpbmcgfVxuXHRcdD4oZW5kcG9pbnRJZCwge1xuXHRcdFx0dHlwZTogc2hhcmVUeXBlLFxuXHRcdFx0ZGF0YTogcGF5bG9hZFxuXHRcdH0pO1xuXG5cdFx0aWYgKHJlc3BvbnNlKSB7XG5cdFx0XHRsZXQgaWQgPSByZXNwb25zZS5pZDtcblx0XHRcdGlmIChpc0VtcHR5KGlkKSkge1xuXHRcdFx0XHRjb25zdCBpbmRleE9mSWQgPSByZXNwb25zZS51cmwubGFzdEluZGV4T2YoXCIvXCIpO1xuXHRcdFx0XHRpZiAoaW5kZXhPZklkICE9PSAtMSkge1xuXHRcdFx0XHRcdGlkID0gcmVzcG9uc2UudXJsLnNsaWNlKGluZGV4T2ZJZCArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0Y29uc3QgcGxhdGZvcm1JbmZvID0gYXdhaXQgcGxhdGZvcm0uQXBwbGljYXRpb24uZ2V0SW5mbygpO1xuXHRcdFx0XHRsZXQgZmluc0xpbms6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZiAocGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG5cdFx0XHRcdFx0Zmluc0xpbmsgPSBgJHtwbGF0Zm9ybUluZm8ubWFuaWZlc3RVcmwucmVwbGFjZShcblx0XHRcdFx0XHRcdFwiaHR0cFwiLFxuXHRcdFx0XHRcdFx0XCJmaW5cIlxuXHRcdFx0XHRcdCl9PyQkc2hhcmVUeXBlPSR7c2hhcmVUeXBlfSYkJHBheWxvYWQ9JHtidG9hKEpTT04uc3RyaW5naWZ5KHsgaWQgfSkpfWA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFwiV2UgZG8gbm90IHN1cHBvcnQgZmlsZSBiYXNlZCBtYW5pZmVzdCBsYXVuY2hlcy4gVGhlIG1hbmlmZXN0IGhhcyB0byBiZSBzZXJ2ZWQgb3ZlciBodHRwL2h0dHBzOlwiLFxuXHRcdFx0XHRcdFx0cGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKGZpbnNMaW5rKSkge1xuXHRcdFx0XHRcdGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHtcblx0XHRcdFx0XHRcdGRhdGE6IGZpbnNMaW5rXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgUmVxdWVzdCBSYWlzZWRcIixcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IGBUaGUgc2hhcmUgcmVxdWVzdCB5b3UgcmFpc2VkIGhhcyBiZWVuIGNvcGllZCB0byB0aGUgKipjbGlwYm9hcmQqKiBhbmQgd2lsbCBiZSB2YWxpZCBmb3IgJHtleHBpcnlJbkhvdXJzfSBob3Vycy4gXFxuIFNoYXJlIFVybDogXFxuICogKioke2ZpbnNMaW5rfSoqYCxcblx0XHRcdFx0XHRcdHN0YXR1czogXCJzaGFyZWRcIlxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIkVycm9yIHNhdmluZyBzaGFyZSByZXF1ZXN0OlwiLCBlcnJvcik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHRpdGxlOiBcIlNoYXJlIFJlcXVlc3QgRmFpbGVkXCIsXG5cdFx0bWVzc2FnZTogXCJUaGUgc2hhcmUgcmVxdWVzdCB5b3UgcmFpc2VkIGNvdWxkIG5vdCBiZSBnZW5lcmF0ZWQuXCIsXG5cdFx0c3RhdHVzOiBcImVycm9yXCJcblx0fTtcbn1cblxuLyoqXG4gKiBMb2FkIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIGxvZ2dlciBUaGUgbG9nZ2VyIGZvciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSBlbmRwb2ludENsaWVudCBUaGUgZW5kcG9pbnQgY2xpZW50LlxuICogQHBhcmFtIGVuZHBvaW50SWQgVGhlIGVuZHBvaW50IGlkLlxuICogQHBhcmFtIHNoYXJlVHlwZSBUaGUgc2hhcmUgdHlwZS5cbiAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHJlcXVlc3QgdG8gbG9hZC5cbiAqIEByZXR1cm5zIFRoZSBsb2FkZWQgcGF5bG9hZCBhbmQgYW55IGNvbmZpcm1hdGlvbiB0byBkaXNwbGF5LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNoYXJlUmVxdWVzdDxUPihcblx0bG9nZ2VyOiBMb2dnZXIgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50Q2xpZW50OiBFbmRwb2ludENsaWVudCB8IHVuZGVmaW5lZCxcblx0ZW5kcG9pbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuXHRzaGFyZVR5cGU6IHN0cmluZyxcblx0aWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxcblx0fCB7XG5cdFx0XHRwYXlsb2FkPzogVDtcblx0XHRcdGNvbmZpcm1hdGlvbjogU2hhcmVDb25maXJtYXRpb25PcHRpb25zIHwgdW5kZWZpbmVkO1xuXHQgIH1cblx0fCB1bmRlZmluZWRcbj4ge1xuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZSkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgcmVxdWVzdFJlc3BvbnNlIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludElkKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGlkIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlPHsgaWQ6IHN0cmluZyB9LCB7IHR5cGU6IHN0cmluZzsgZGF0YTogVCB9Pihcblx0XHRcdFwic2hhcmUtZ2V0XCIsXG5cdFx0XHR7IGlkIH1cblx0XHQpO1xuXHRcdGlmICghaXNFbXB0eShyZXNwb25zZSkpIHtcblx0XHRcdGlmIChzaGFyZVR5cGUgIT09IHJlc3BvbnNlLnR5cGUpIHtcblx0XHRcdFx0bG9nZ2VyPy53YXJuKGBTaGFyZSBlbnRyeSBvZiBtaXNtYXRjaGVkIHR5cGUgc3BlY2lmaWVkOiAke3Jlc3BvbnNlLnR5cGV9IGl0IHNob3VsZCBiZSAke3NoYXJlVHlwZX1gKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlNoYXJlIExvYWQgRmFpbGVkXCIsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBzcGVjaWZpZWQgc2hhcmUgbGluayBkb2VzIG5vdCBjb250YWluIHRoZSBjb3JyZWN0IGRhdGEgZm9yIHRoZSBzaGFyZSB0eXBlLlwiLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiBcImVycm9yXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEsXG5cdFx0XHRcdGNvbmZpcm1hdGlvbjoge1xuXHRcdFx0XHRcdHRpdGxlOiBcIlNoYXJlIFJlcXVlc3QgQXBwbGllZFwiLFxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNoYXJlIHJlcXVlc3QgaGFzIGJlZW4gZmV0Y2hlZCBhbmQgYXBwbGllZC5cIixcblx0XHRcdFx0XHRzdGF0dXM6IFwibG9hZGVkXCJcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpcm1hdGlvbjoge1xuXHRcdFx0XHR0aXRsZTogXCJTaGFyZSBMb2FkIEV4cGlyZWRcIixcblx0XHRcdFx0bWVzc2FnZTogXCJUaGUgc2hhcmUgcmVxdWVzdCBoYXMgZXhwaXJlZCBhbmQgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZS5cIixcblx0XHRcdFx0c3RhdHVzOiBcImVycm9yXCJcblx0XHRcdH1cblx0XHR9O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJUaGVyZSBoYXMgYmVlbiBhbiBlcnJvciB0cnlpbmcgdG8gbG9hZCBhbmQgYXBwbHkgdGhlIHNoYXJlIGxpbmsuXCIsIGVycm9yKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29uZmlybWF0aW9uOiB7XG5cdFx0XHR0aXRsZTogXCJTaGFyZSBMb2FkIEZhaWxlZFwiLFxuXHRcdFx0bWVzc2FnZTogXCJUaGUgc3BlY2lmaWVkIHNoYXJlIGxpbmsgY2Fubm90IGJlIGxvYWRlZC5cIixcblx0XHRcdHN0YXR1czogXCJlcnJvclwiXG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUgeyBQYWdlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRTaGFyZSxcblx0U2hhcmVDb25maXJtYXRpb25PcHRpb25zLFxuXHRTaGFyZUVudHJ5XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2hhcmUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBsb2FkU2hhcmVSZXF1ZXN0LCBzYXZlU2hhcmVSZXF1ZXN0IH0gZnJvbSBcIi4uL2NvbW1vbi9zaGFyZS1jb21tb25cIjtcbmltcG9ydCB0eXBlIHsgUGFnZVNoYXJlRW50cnlQYXlsb2FkLCBQYWdlc1NoYXJlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBwYWdlcyBzaGFyZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VzU2hhcmVQcm92aWRlciBpbXBsZW1lbnRzIFNoYXJlPFBhZ2VzU2hhcmVQcm92aWRlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbiBpbmNsdWRpbmcgc2V0dGluZ3MuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlc1NoYXJlUHJvdmlkZXJPcHRpb25zPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFBhZ2VzU2hhcmVQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZXNTaGFyZVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbGlzdCBvZiBzaGFyZSB0eXBlcyBzdXBwb3J0ZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTaGFyZVR5cGVzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcblx0XHRyZXR1cm4gW1wicGFnZVwiXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHNoYXJlcyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSB3aW5kb3dJZGVudGl0eSBUaGUgd2luZG93IGlkZW50aXR5IHRvIGdldCB0aGUgc2hhcmVzIGZvci5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRFbnRyaWVzKHdpbmRvd0lkZW50aXR5OiBPcGVuRmluLklkZW50aXR5KTogUHJvbWlzZTxTaGFyZUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRjb25zdCBwbGF0Zm9ybSA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldFBsYXRmb3JtPy4oKTtcblxuXHRcdGlmIChwbGF0Zm9ybSkge1xuXHRcdFx0Y29uc3Qgd2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyh3aW5kb3dJZGVudGl0eSk7XG5cdFx0XHRjb25zdCBwYWdlcyA9IGF3YWl0IHdpbmRvdy5nZXRQYWdlcygpO1xuXG5cdFx0XHRsZXQgcGFnZUlkO1xuXHRcdFx0Zm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0XHRcdGlmIChwYWdlLmlzQWN0aXZlKSB7XG5cdFx0XHRcdFx0cGFnZUlkID0gcGFnZS5wYWdlSWQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHBhZ2VJZCkge1xuXHRcdFx0XHRjb25zdCBwYWdlU2hhcmVFbnRyeVBheWxvYWQ6IFBhZ2VTaGFyZUVudHJ5UGF5bG9hZCA9IHtcblx0XHRcdFx0XHR3aW5kb3dJZGVudGl0eSxcblx0XHRcdFx0XHRwYWdlSWRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxhYmVsOiBcIlNoYXJlIFBhZ2VcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwicGFnZVwiLFxuXHRcdFx0XHRcdFx0cGF5bG9hZDogcGFnZVNoYXJlRW50cnlQYXlsb2FkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBzaGFyZSBmb3IgdGhlIGdpdmVuIGVudHJ5LlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSBvZiBzaGFyZSB0byBwZXJmb3JtLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgc2hhcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2hhcmUodHlwZTogc3RyaW5nLCBwYXlsb2FkPzogUGFnZVNoYXJlRW50cnlQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHR5cGUgPT09IFwicGFnZVwiKSB7XG5cdFx0XHRjb25zdCBwbGF0Zm9ybSA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldFBsYXRmb3JtPy4oKTtcblxuXHRcdFx0aWYgKHBsYXRmb3JtICYmICFpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHRcdGxldCBwYWdlOiBQYWdlIHwgdW5kZWZpbmVkID0gcGF5bG9hZD8ucGFnZTtcblxuXHRcdFx0XHRpZiAoaXNFbXB0eShwYXlsb2FkPy5wYWdlKSAmJiBpc1N0cmluZ1ZhbHVlKHBheWxvYWQucGFnZUlkKSkge1xuXHRcdFx0XHRcdGxldCB1c2VTdG9yYWdlID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHQvLyBUcnkgYW5kIGdldCB0aGUgcGFnZSBkZXRhaWxzIGZyb20gdGhlIHBhc3NlZCB3aW5kb3dcblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkLndpbmRvd0lkZW50aXR5KSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHBheWxvYWQud2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0XHRwYWdlID0gYXdhaXQgdGFyZ2V0V2luZG93LmdldFBhZ2UocGF5bG9hZC5wYWdlSWQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShwYWdlPy5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YSA9IHt9O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YS53aW5kb3dCb3VuZHMgPSBhd2FpdCB0YXJnZXRXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHRcdFx0XHRcdFx0dXNlU3RvcmFnZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2gge31cblxuXHRcdFx0XHRcdGlmIChpc0VtcHR5KHBhZ2UpICYmIGlzRW1wdHkocGF5bG9hZC53aW5kb3dJZGVudGl0eSkpIHtcblx0XHRcdFx0XHRcdC8vIHdlIGhhdmVuJ3QgZ290IGEgcGFzc2VkIHBhZ2UgYW5kIHdlIHdlcmUgbm90IGdpdmVuIGEgd2luZG93IGlkZW50aXR5IGJ1dCB3ZSBkbyBoYXZlIGEgcGFnZUlkXG5cdFx0XHRcdFx0XHQvLyB0cnkgYW5kIGZpbmQgYW4gYXR0YWNoZWQgcGFnZSB3aGljaCBtYXRjaGVzXG5cdFx0XHRcdFx0XHRjb25zdCBhdHRhY2hlZFBhZ2VzID0gYXdhaXQgcGxhdGZvcm0uQnJvd3Nlci5nZXRBbGxBdHRhY2hlZFBhZ2VzKCk7XG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGF0dGFjaGVkUGFnZSBvZiBhdHRhY2hlZFBhZ2VzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhdHRhY2hlZFBhZ2UucGFnZUlkID09PSBwYXlsb2FkLnBhZ2VJZCkge1xuXHRcdFx0XHRcdFx0XHRcdHBhZ2UgPSB7IC4uLmF0dGFjaGVkUGFnZSB9O1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShhdHRhY2hlZFBhZ2UucGFyZW50SWRlbnRpdHkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKGF0dGFjaGVkUGFnZS5wYXJlbnRJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShwYWdlLmN1c3RvbURhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YSA9IHt9O1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0cGFnZS5jdXN0b21EYXRhLndpbmRvd0JvdW5kcyA9IGF3YWl0IHRhcmdldFdpbmRvdy5vcGVuZmluV2luZG93LmdldEJvdW5kcygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR1c2VTdG9yYWdlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHVzZVN0b3JhZ2UpIHtcblx0XHRcdFx0XHRcdHBhZ2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2UocGF5bG9hZC5wYWdlSWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghaXNFbXB0eShwYWdlKSkge1xuXHRcdFx0XHRcdGNvbnN0IGNvbmZpcm1hdGlvbiA9IGF3YWl0IHNhdmVTaGFyZVJlcXVlc3QoXG5cdFx0XHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcixcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50Py4oKSxcblx0XHRcdFx0XHRcdHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LnNldEVuZHBvaW50SWQsXG5cdFx0XHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRcdFx0cGFnZVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRhd2FpdCB0aGlzLnNob3dDb25maXJtYXRpb24oY29uZmlybWF0aW9uLCBwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSBzaGFyZSBhY3RpdmF0aW9uLlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSBvZiB0aGUgc2hhcmUuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIGZvciB0aGUgc2hhcmUuXG5cdCAqIEBwYXJhbSBwYXlsb2FkLmlkIFRoZSBwYXlsb2FkIGZvciB0aGUgc2hhcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlKHR5cGU6IHN0cmluZywgcGF5bG9hZDogeyBpZDogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodHlwZSA9PT0gXCJwYWdlXCIpIHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbG9hZFNoYXJlUmVxdWVzdDxQYWdlPihcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLFxuXHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudD8uKCksXG5cdFx0XHRcdHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmdldEVuZHBvaW50SWQsXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHBheWxvYWQuaWRcblx0XHRcdCk7XG5cblx0XHRcdGNvbnN0IHBsYXRmb3JtID0gYXdhaXQgdGhpcy5faGVscGVycz8uZ2V0UGxhdGZvcm0/LigpO1xuXHRcdFx0aWYgKHBsYXRmb3JtKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3BvbnNlUGF5bG9hZCA9IHJlc3BvbnNlPy5wYXlsb2FkO1xuXHRcdFx0XHRpZiAoIWlzRW1wdHkocmVzcG9uc2VQYXlsb2FkKSAmJiB0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZShyZXNwb25zZVBheWxvYWQucGFnZUlkKTtcblx0XHRcdFx0XHRpZiAocGFnZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS51cGRhdGVQYWdlKHsgcGFnZUlkOiByZXNwb25zZVBheWxvYWQucGFnZUlkLCBwYWdlOiByZXNwb25zZVBheWxvYWQgfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVBhZ2UocmVzcG9uc2VQYXlsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycy5sYXVuY2hQYWdlKHJlc3BvbnNlUGF5bG9hZC5wYWdlSWQsIHVuZGVmaW5lZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCB0aGlzLnNob3dDb25maXJtYXRpb24ocmVzcG9uc2U/LmNvbmZpcm1hdGlvbik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgYSBjb25maXJtYXRpb24uXG5cdCAqIEBwYXJhbSBjb25maXJtYXRpb24gVGhlIGNvbmZpcm1hdGlvbiBvcHRpb25zLlxuXHQgKiBAcGFyYW0gcGFyZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSBwYXJlbnQgd2luZG93LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzaG93Q29uZmlybWF0aW9uKFxuXHRcdGNvbmZpcm1hdGlvbjogU2hhcmVDb25maXJtYXRpb25PcHRpb25zIHwgdW5kZWZpbmVkLFxuXHRcdHBhcmVudElkZW50aXR5PzogT3BlbkZpbi5JZGVudGl0eVxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIWlzRW1wdHkoY29uZmlybWF0aW9uKSAmJiB0aGlzLl9oZWxwZXJzPy5nZXRTaGFyZUNsaWVudCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGNvbmZpcm1hdGlvbik7XG5cdFx0XHRjb25zdCBzaGFyZUNsaWVudCA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0U2hhcmVDbGllbnQoKTtcblx0XHRcdGlmIChzaGFyZUNsaWVudCkge1xuXHRcdFx0XHRjb25zdCBpY29uS2V5ID0gY29uZmlybWF0aW9uLnN0YXR1cyA9PT0gXCJlcnJvclwiID8gXCJlcnJvclwiIDogXCJzdWNjZXNzXCI7XG5cdFx0XHRcdGNvbmZpcm1hdGlvbi5pY29uVXJsID0gdGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uaW1hZ2VzW2ljb25LZXldO1xuXHRcdFx0XHRpZiAodGhpcy5faGVscGVycz8uZ2V0VGhlbWVDbGllbnQgJiYgIWlzRW1wdHkoY29uZmlybWF0aW9uLmljb25VcmwpKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGhlbWVDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldFRoZW1lQ2xpZW50KCk7XG5cdFx0XHRcdFx0Y29uZmlybWF0aW9uLmljb25VcmwgPSBhd2FpdCB0aGVtZUNsaWVudC50aGVtZVVybChjb25maXJtYXRpb24uaWNvblVybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YXdhaXQgc2hhcmVDbGllbnQuY29uZmlybWF0aW9uKFxuXHRcdFx0XHRcdGNvbmZpcm1hdGlvbixcblx0XHRcdFx0XHR0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5jb25maXJtYXRpb25Nb2RlLFxuXHRcdFx0XHRcdHBhcmVudElkZW50aXR5XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBQYWdlc1NoYXJlUHJvdmlkZXIgfSBmcm9tIFwiLi9zaGFyZVwiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0c2hhcmU6IG5ldyBQYWdlc1NoYXJlUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==