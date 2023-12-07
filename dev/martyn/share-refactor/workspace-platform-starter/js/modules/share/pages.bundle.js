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
        const response = await endpointClient.requestResponse("share-save", {
            type: shareType,
            data: {
                payload
            }
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
                        isError: false
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
        isError: true
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
        // TODO: Add code here to free up any module resources
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
                const confirmation = await (0,_common_share_common__WEBPACK_IMPORTED_MODULE_1__.saveShareRequest)(platform, this._logger, await this._helpers?.getEndpointClient?.(), this._definition?.data?.endpointId, type, page);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(confirmation)) {
                    this._logger?.info(confirmation);
                }
            }
        }
    }
    /**
     * Handle a share activation.
     * @param type The type of the share.
     * @param payload The payload for the share.
     * @returns Nothing.
     */
    async handle(type, payload) {
        // TODO: Handle the share triggered by the given id and payload
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRztBQUNJLFNBQVMsT0FBTyxDQUFDLEtBQWM7SUFDckMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQzlDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDM0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLGFBQWEsQ0FBQyxLQUFjO0lBQzNDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxTQUFTLENBQUMsS0FBYztJQUN2QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQzVFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxTQUFTLENBQUMsS0FBYztJQUN2QyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxXQUFXLENBQUksR0FBTTtJQUNwQyxnREFBZ0Q7SUFDaEQsT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFFRDs7O0dBR0c7QUFDSSxTQUFTLFVBQVU7SUFDekIsSUFBSSxZQUFZLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLGdEQUFnRDtRQUNoRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNELHVHQUF1RztJQUN2Ryw2RUFBNkU7SUFDN0UsOENBQThDO0lBQzlDOzs7O09BSUc7SUFDSCxTQUFTLFlBQVksQ0FBQyxDQUFTO1FBQzlCLHNDQUFzQztRQUN0QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUYsT0FBTztRQUNOLHNDQUFzQztRQUN0QyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQzlCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxXQUFXLENBQUMsR0FBWTtJQUN2QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztTQUFNLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQixDQUFDO1NBQU0sSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMvQixPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUN2RSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsY0FBYyxDQUFDLE9BQWdCO0lBQzlDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDNUIsT0FBTyxPQUFPO2FBQ1osT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7YUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7YUFDckIsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7YUFDdEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7YUFDdkIsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEp5RTtBQUUxRTs7Ozs7Ozs7O0dBU0c7QUFDSSxLQUFLLFVBQVUsZ0JBQWdCLENBQ3JDLFFBQWlDLEVBQ2pDLE1BQTBCLEVBQzFCLGNBQTBDLEVBQzFDLFVBQThCLEVBQzlCLFNBQWlCLEVBQ2pCLE9BQVU7SUFTVixJQUFJLHlFQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbEQsT0FBTztJQUNSLENBQUM7SUFDRCxJQUFJLHlFQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFDN0MsTUFBTSxFQUFFLElBQUksQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ2xFLE9BQU87SUFDUixDQUFDO0lBQ0QsSUFBSSx5RUFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzlDLE9BQU87SUFDUixDQUFDO0lBQ0QsSUFBSSxDQUFDO1FBQ0osTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FHbkQsWUFBWSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUU7Z0JBQ0wsT0FBTzthQUNQO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNkLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDckIsSUFBSSx5RUFBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN0QixFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksQ0FBQyx5RUFBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sWUFBWSxHQUFHLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxRQUE0QixDQUFDO2dCQUVqQyxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ2pELFFBQVEsR0FBRyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUM3QyxNQUFNLEVBQ04sS0FBSyxDQUNMLGdCQUFnQixTQUFTLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDeEUsQ0FBQztxQkFBTSxDQUFDO29CQUNQLE1BQU0sRUFBRSxLQUFLLENBQ1osZ0dBQWdHLEVBQ2hHLFlBQVksQ0FBQyxXQUFXLENBQ3hCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxJQUFJLCtFQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLFFBQVE7cUJBQ2QsQ0FBQyxDQUFDO29CQUVILE9BQU87d0JBQ04sS0FBSyxFQUFFLHNCQUFzQjt3QkFDN0IsT0FBTyxFQUFFLDJGQUEyRixhQUFhLGdDQUFnQyxRQUFRLElBQUk7d0JBQzdKLE9BQU8sRUFBRSxLQUFLO3FCQUNkLENBQUM7Z0JBQ0gsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsTUFBTSxFQUFFLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsT0FBTztRQUNOLEtBQUssRUFBRSxzQkFBc0I7UUFDN0IsT0FBTyxFQUFFLHNEQUFzRDtRQUMvRCxPQUFPLEVBQUUsSUFBSTtLQUNiLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hHeUU7QUFDaEI7QUFHMUQ7O0dBRUc7QUFDSSxNQUFNLGtCQUFrQjtJQW1COUI7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDdEIsVUFBdUQsRUFDdkQsYUFBNEIsRUFDNUIsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMsc0RBQXNEO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsYUFBYTtRQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLGNBQWdDO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBRXRELElBQUksUUFBUSxFQUFFLENBQUM7WUFDZCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QyxJQUFJLE1BQU0sQ0FBQztZQUNYLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNuQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDckIsTUFBTTtnQkFDUCxDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ1osTUFBTSxxQkFBcUIsR0FBMEI7b0JBQ3BELGNBQWM7b0JBQ2QsTUFBTTtpQkFDTixDQUFDO2dCQUVGLE9BQU87b0JBQ047d0JBQ0MsS0FBSyxFQUFFLFlBQVk7d0JBQ25CLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxxQkFBcUI7cUJBQzlCO2lCQUNELENBQUM7WUFDSCxDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBWSxFQUFFLE9BQStCO1FBQy9ELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBRXRELElBQUksUUFBUSxJQUFJLENBQUMseUVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ25DLElBQUksSUFBSSxHQUFxQixPQUFPLEVBQUUsSUFBSSxDQUFDO1lBRTNDLElBQUkseUVBQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksK0VBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixJQUFJLENBQUM7b0JBQ0osc0RBQXNEO29CQUN0RCxJQUFJLENBQUMseUVBQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQzt3QkFDdEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUN2RSxJQUFJLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEQsSUFBSSx5RUFBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDOzRCQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQzt3QkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxNQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQzVFLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ3BCLENBQUM7Z0JBQ0YsQ0FBQztnQkFBQyxNQUFNLENBQUMsRUFBQztnQkFFVixJQUFJLHlFQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUVBQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztvQkFDdEQsK0ZBQStGO29CQUMvRiw4Q0FBOEM7b0JBQzlDLE1BQU0sYUFBYSxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29CQUNuRSxLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUM1QyxJQUFJLEdBQUcsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFDOzRCQUMzQixJQUFJLENBQUMseUVBQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQ0FDM0MsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUM1RSxJQUFJLHlFQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0NBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dDQUN0QixDQUFDO2dDQUNELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLE1BQU0sWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDN0UsQ0FBQzs0QkFDRCxVQUFVLEdBQUcsS0FBSyxDQUFDOzRCQUNuQixNQUFNO3dCQUNQLENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO2dCQUNELElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ2hCLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsQ0FBQztZQUNGLENBQUM7WUFFRCxJQUFJLENBQUMseUVBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNwQixNQUFNLFlBQVksR0FBRyxNQUFNLHNFQUFnQixDQUMxQyxRQUFRLEVBQ1IsSUFBSSxDQUFDLE9BQU8sRUFDWixNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQ2xDLElBQUksRUFDSixJQUFJLENBQ0osQ0FBQztnQkFFRixJQUFJLHlFQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBWSxFQUFFLE9BQWlCO1FBQ2xELCtEQUErRDtJQUNoRSxDQUFDO0NBQ0Q7Ozs7Ozs7U0N2TEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUU3Qzs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxLQUFLLEVBQUUsSUFBSSxzREFBa0IsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL3NoYXJlL2NvbW1vbi9zaGFyZS1jb21tb24udHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL3NoYXJlL3BhZ2VzL3NoYXJlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS9wYWdlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludENsaWVudCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIFNhdmUgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS5cbiAqIEBwYXJhbSBsb2dnZXIgVGhlIGxvZ2dlciBmb3IgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0gZW5kcG9pbnRDbGllbnQgVGhlIGVuZHBvaW50IGNsaWVudC5cbiAqIEBwYXJhbSBlbmRwb2ludElkIFRoZSBlbmRwb2ludCBpZC5cbiAqIEBwYXJhbSBzaGFyZVR5cGUgVGhlIHNoYXJlIHR5cGUuXG4gKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzYXZlLlxuICogQHJldHVybnMgVGhlIGNvbmZpcm1hdGlvbiB0byBkaXNwbGF5LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNoYXJlUmVxdWVzdDxUPihcblx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRsb2dnZXI6IExvZ2dlciB8IHVuZGVmaW5lZCxcblx0ZW5kcG9pbnRDbGllbnQ6IEVuZHBvaW50Q2xpZW50IHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludElkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHNoYXJlVHlwZTogc3RyaW5nLFxuXHRwYXlsb2FkOiBUXG4pOiBQcm9taXNlPFxuXHR8IHtcblx0XHRcdHRpdGxlOiBzdHJpbmc7XG5cdFx0XHRtZXNzYWdlOiBzdHJpbmc7XG5cdFx0XHRpc0Vycm9yOiBib29sZWFuO1xuXHQgIH1cblx0fCB1bmRlZmluZWRcbj4ge1xuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZSkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgcmVxdWVzdFJlc3BvbnNlIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludElkKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGlkIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IGV4cGlyeUluSG91cnMgPSAyNDtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTxcblx0XHRcdHsgdHlwZTogc3RyaW5nOyBkYXRhOiB7IHBheWxvYWQ6IFQgfSB9LFxuXHRcdFx0eyB1cmw6IHN0cmluZzsgaWQ/OiBzdHJpbmcgfVxuXHRcdD4oXCJzaGFyZS1zYXZlXCIsIHtcblx0XHRcdHR5cGU6IHNoYXJlVHlwZSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0cGF5bG9hZFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJlc3BvbnNlKSB7XG5cdFx0XHRsZXQgaWQgPSByZXNwb25zZS5pZDtcblx0XHRcdGlmIChpc0VtcHR5KGlkKSkge1xuXHRcdFx0XHRjb25zdCBpbmRleE9mSWQgPSByZXNwb25zZS51cmwubGFzdEluZGV4T2YoXCIvXCIpO1xuXHRcdFx0XHRpZiAoaW5kZXhPZklkICE9PSAtMSkge1xuXHRcdFx0XHRcdGlkID0gcmVzcG9uc2UudXJsLnNsaWNlKGluZGV4T2ZJZCArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0Y29uc3QgcGxhdGZvcm1JbmZvID0gYXdhaXQgcGxhdGZvcm0uQXBwbGljYXRpb24uZ2V0SW5mbygpO1xuXHRcdFx0XHRsZXQgZmluc0xpbms6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZiAocGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG5cdFx0XHRcdFx0Zmluc0xpbmsgPSBgJHtwbGF0Zm9ybUluZm8ubWFuaWZlc3RVcmwucmVwbGFjZShcblx0XHRcdFx0XHRcdFwiaHR0cFwiLFxuXHRcdFx0XHRcdFx0XCJmaW5cIlxuXHRcdFx0XHRcdCl9PyQkc2hhcmVUeXBlPSR7c2hhcmVUeXBlfSYkJHBheWxvYWQ9JHtidG9hKEpTT04uc3RyaW5naWZ5KHsgaWQgfSkpfWA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFwiV2UgZG8gbm90IHN1cHBvcnQgZmlsZSBiYXNlZCBtYW5pZmVzdCBsYXVuY2hlcy4gVGhlIG1hbmlmZXN0IGhhcyB0byBiZSBzZXJ2ZWQgb3ZlciBodHRwL2h0dHBzOlwiLFxuXHRcdFx0XHRcdFx0cGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKGZpbnNMaW5rKSkge1xuXHRcdFx0XHRcdGF3YWl0IGZpbi5DbGlwYm9hcmQud3JpdGVUZXh0KHtcblx0XHRcdFx0XHRcdGRhdGE6IGZpbnNMaW5rXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgUmVxdWVzdCBSYWlzZWRcIixcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IGBUaGUgc2hhcmUgcmVxdWVzdCB5b3UgcmFpc2VkIGhhcyBiZWVuIGNvcGllZCB0byB0aGUgKipjbGlwYm9hcmQqKiBhbmQgd2lsbCBiZSB2YWxpZCBmb3IgJHtleHBpcnlJbkhvdXJzfSBob3Vycy4gXFxuIFNoYXJlIFVybDogXFxuICogKioke2ZpbnNMaW5rfSoqYCxcblx0XHRcdFx0XHRcdGlzRXJyb3I6IGZhbHNlXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiRXJyb3Igc2F2aW5nIHNoYXJlIHJlcXVlc3Q6XCIsIGVycm9yKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IFwiU2hhcmUgUmVxdWVzdCBGYWlsZWRcIixcblx0XHRtZXNzYWdlOiBcIlRoZSBzaGFyZSByZXF1ZXN0IHlvdSByYWlzZWQgY291bGQgbm90IGJlIGdlbmVyYXRlZC5cIixcblx0XHRpc0Vycm9yOiB0cnVlXG5cdH07XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2UgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlLCBTaGFyZUVudHJ5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9zaGFyZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IHNhdmVTaGFyZVJlcXVlc3QgfSBmcm9tIFwiLi4vY29tbW9uL3NoYXJlLWNvbW1vblwiO1xuaW1wb3J0IHR5cGUgeyBQYWdlU2hhcmVFbnRyeVBheWxvYWQsIFBhZ2VzU2hhcmVQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHBhZ2VzIHNoYXJlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZXNTaGFyZVByb3ZpZGVyIGltcGxlbWVudHMgU2hhcmU8UGFnZXNTaGFyZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uIGluY2x1ZGluZyBzZXR0aW5ncy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFBhZ2VzU2hhcmVQcm92aWRlck9wdGlvbnM+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248UGFnZXNTaGFyZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJQYWdlc1NoYXJlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZ1wiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDbG9zZWRvd25cIik7XG5cblx0XHQvLyBUT0RPOiBBZGQgY29kZSBoZXJlIHRvIGZyZWUgdXAgYW55IG1vZHVsZSByZXNvdXJjZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxpc3Qgb2Ygc2hhcmUgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0U2hhcmVUeXBlcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG5cdFx0cmV0dXJuIFtcInBhZ2VcIl07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzaGFyZXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gd2luZG93SWRlbnRpdHkgVGhlIHdpbmRvdyBpZGVudGl0eSB0byBnZXQgdGhlIHNoYXJlcyBmb3IuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0RW50cmllcyh3aW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSk6IFByb21pc2U8U2hhcmVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0Y29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRQbGF0Zm9ybT8uKCk7XG5cblx0XHRpZiAocGxhdGZvcm0pIHtcblx0XHRcdGNvbnN0IHdpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmMod2luZG93SWRlbnRpdHkpO1xuXHRcdFx0Y29uc3QgcGFnZXMgPSBhd2FpdCB3aW5kb3cuZ2V0UGFnZXMoKTtcblxuXHRcdFx0bGV0IHBhZ2VJZDtcblx0XHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0XHRpZiAocGFnZS5pc0FjdGl2ZSkge1xuXHRcdFx0XHRcdHBhZ2VJZCA9IHBhZ2UucGFnZUlkO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYWdlSWQpIHtcblx0XHRcdFx0Y29uc3QgcGFnZVNoYXJlRW50cnlQYXlsb2FkOiBQYWdlU2hhcmVFbnRyeVBheWxvYWQgPSB7XG5cdFx0XHRcdFx0d2luZG93SWRlbnRpdHksXG5cdFx0XHRcdFx0cGFnZUlkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsYWJlbDogXCJTaGFyZSBQYWdlXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcInBhZ2VcIixcblx0XHRcdFx0XHRcdHBheWxvYWQ6IHBhZ2VTaGFyZUVudHJ5UGF5bG9hZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgc2hhcmUgZm9yIHRoZSBnaXZlbiBlbnRyeS5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2Ygc2hhcmUgdG8gcGVyZm9ybS5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIGRhdGEgdG8gYXNzb2NpYXRlIHdpdGggdGhlIHNoYXJlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNoYXJlKHR5cGU6IHN0cmluZywgcGF5bG9hZD86IFBhZ2VTaGFyZUVudHJ5UGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHBsYXRmb3JtID0gYXdhaXQgdGhpcy5faGVscGVycz8uZ2V0UGxhdGZvcm0/LigpO1xuXG5cdFx0aWYgKHBsYXRmb3JtICYmICFpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHRsZXQgcGFnZTogUGFnZSB8IHVuZGVmaW5lZCA9IHBheWxvYWQ/LnBhZ2U7XG5cblx0XHRcdGlmIChpc0VtcHR5KHBheWxvYWQ/LnBhZ2UpICYmIGlzU3RyaW5nVmFsdWUocGF5bG9hZC5wYWdlSWQpKSB7XG5cdFx0XHRcdGxldCB1c2VTdG9yYWdlID0gdHJ1ZTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRyeSBhbmQgZ2V0IHRoZSBwYWdlIGRldGFpbHMgZnJvbSB0aGUgcGFzc2VkIHdpbmRvd1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eShwYXlsb2FkLndpbmRvd0lkZW50aXR5KSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0XHRcdHBhZ2UgPSBhd2FpdCB0YXJnZXRXaW5kb3cuZ2V0UGFnZShwYXlsb2FkLnBhZ2VJZCk7XG5cdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShwYWdlPy5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRwYWdlLmN1c3RvbURhdGEgPSB7fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YS53aW5kb3dCb3VuZHMgPSBhd2FpdCB0YXJnZXRXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHRcdFx0XHRcdHVzZVN0b3JhZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2gge31cblxuXHRcdFx0XHRpZiAoaXNFbXB0eShwYWdlKSAmJiBpc0VtcHR5KHBheWxvYWQud2luZG93SWRlbnRpdHkpKSB7XG5cdFx0XHRcdFx0Ly8gd2UgaGF2ZW4ndCBnb3QgYSBwYXNzZWQgcGFnZSBhbmQgd2Ugd2VyZSBub3QgZ2l2ZW4gYSB3aW5kb3cgaWRlbnRpdHkgYnV0IHdlIGRvIGhhdmUgYSBwYWdlSWRcblx0XHRcdFx0XHQvLyB0cnkgYW5kIGZpbmQgYW4gYXR0YWNoZWQgcGFnZSB3aGljaCBtYXRjaGVzXG5cdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWRQYWdlcyA9IGF3YWl0IHBsYXRmb3JtLkJyb3dzZXIuZ2V0QWxsQXR0YWNoZWRQYWdlcygpO1xuXHRcdFx0XHRcdGZvciAoY29uc3QgYXR0YWNoZWRQYWdlIG9mIGF0dGFjaGVkUGFnZXMpIHtcblx0XHRcdFx0XHRcdGlmIChhdHRhY2hlZFBhZ2UucGFnZUlkID09PSBwYXlsb2FkLnBhZ2VJZCkge1xuXHRcdFx0XHRcdFx0XHRwYWdlID0geyAuLi5hdHRhY2hlZFBhZ2UgfTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGF0dGFjaGVkUGFnZS5wYXJlbnRJZGVudGl0eSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKGF0dGFjaGVkUGFnZS5wYXJlbnRJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocGFnZS5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFnZS5jdXN0b21EYXRhID0ge307XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHBhZ2UuY3VzdG9tRGF0YS53aW5kb3dCb3VuZHMgPSBhd2FpdCB0YXJnZXRXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR1c2VTdG9yYWdlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodXNlU3RvcmFnZSkge1xuXHRcdFx0XHRcdHBhZ2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2UocGF5bG9hZC5wYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFbXB0eShwYWdlKSkge1xuXHRcdFx0XHRjb25zdCBjb25maXJtYXRpb24gPSBhd2FpdCBzYXZlU2hhcmVSZXF1ZXN0KFxuXHRcdFx0XHRcdHBsYXRmb3JtLFxuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcixcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudD8uKCksXG5cdFx0XHRcdFx0dGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZW5kcG9pbnRJZCxcblx0XHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRcdHBhZ2Vcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoaXNFbXB0eShjb25maXJtYXRpb24pKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGNvbmZpcm1hdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgc2hhcmUgYWN0aXZhdGlvbi5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIHNoYXJlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmb3IgdGhlIHNoYXJlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZSh0eXBlOiBzdHJpbmcsIHBheWxvYWQ/OiB1bmtub3duKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Ly8gVE9ETzogSGFuZGxlIHRoZSBzaGFyZSB0cmlnZ2VyZWQgYnkgdGhlIGdpdmVuIGlkIGFuZCBwYXlsb2FkXG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFBhZ2VzU2hhcmVQcm92aWRlciB9IGZyb20gXCIuL3NoYXJlXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRzaGFyZTogbmV3IFBhZ2VzU2hhcmVQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9