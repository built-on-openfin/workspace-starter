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

/***/ "./client/src/modules/share/workspaces/share.ts":
/*!******************************************************!*\
  !*** ./client/src/modules/share/workspaces/share.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacesShareProvider: () => (/* binding */ WorkspacesShareProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _common_share_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/share-common */ "./client/src/modules/share/common/share-common.ts");


/**
 * Implementation for the workspaces share provider.
 */
class WorkspacesShareProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._definition = definition;
        this._logger = loggerCreator("WorkspacesShareProvider");
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
        return ["workspace"];
    }
    /**
     * Get the shares from the module.
     * @param windowIdentity The window identity to get the shares for.
     * @returns Nothing.
     */
    async getEntries(windowIdentity) {
        const workspaceShareEntryPayload = {
            windowIdentity
        };
        return [
            {
                label: "Share Workspace",
                type: "workspace",
                payload: workspaceShareEntryPayload
            }
        ];
    }
    /**
     * Perform the share for the given entry.
     * @param type The type of share to perform.
     * @param payload The data to associate with the share.
     * @returns Nothing.
     */
    async share(type, payload) {
        if (type === "workspace") {
            const platform = await this._helpers?.getPlatform?.();
            if (platform) {
                let workspace;
                const workspaceId = payload?.workspaceId;
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(workspaceId)) {
                    workspace = await platform.getCurrentWorkspace();
                }
                else {
                    workspace = await platform.Storage.getWorkspace(workspaceId);
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(workspace)) {
                    const confirmation = await (0,_common_share_common__WEBPACK_IMPORTED_MODULE_1__.saveShareRequest)(platform, this._logger, await this._helpers?.getEndpointClient?.(), this._definition?.data?.setEndpointId, type, workspace);
                    await this.showConfirmation(confirmation, payload?.windowIdentity);
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
        if (type === "workspace") {
            const response = await (0,_common_share_common__WEBPACK_IMPORTED_MODULE_1__.loadShareRequest)(this._logger, await this._helpers?.getEndpointClient?.(), this._definition?.data?.getEndpointId, type, payload.id);
            const platform = await this._helpers?.getPlatform?.();
            if (platform) {
                const responsePayload = response?.payload;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(responsePayload) && this._helpers?.launchWorkspace) {
                    await platform.Storage.saveWorkspace(responsePayload);
                    await this._helpers.launchWorkspace(responsePayload.workspaceId, this._logger);
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
/*!******************************************************!*\
  !*** ./client/src/modules/share/workspaces/index.ts ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./share */ "./client/src/modules/share/workspaces/share.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    share: new _share__WEBPACK_IMPORTED_MODULE_0__.WorkspacesShareProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsS0FBSyxFQUFFLElBQUksMkRBQXVCLEVBQUU7Q0FDcEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS9jb21tb24vc2hhcmUtY29tbW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS93b3Jrc3BhY2VzL3NoYXJlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9zaGFyZS93b3Jrc3BhY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSBnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IEVuZHBvaW50Q2xpZW50IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2hhcmUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogU2F2ZSB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgd29ya3NwYWNlIHBsYXRmb3JtLlxuICogQHBhcmFtIGxvZ2dlciBUaGUgbG9nZ2VyIGZvciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSBlbmRwb2ludENsaWVudCBUaGUgZW5kcG9pbnQgY2xpZW50LlxuICogQHBhcmFtIGVuZHBvaW50SWQgVGhlIGVuZHBvaW50IGlkLlxuICogQHBhcmFtIHNoYXJlVHlwZSBUaGUgc2hhcmUgdHlwZS5cbiAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHRvIHNhdmUuXG4gKiBAcmV0dXJucyBUaGUgY29uZmlybWF0aW9uIHRvIGRpc3BsYXkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlU2hhcmVSZXF1ZXN0KFxuXHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdGxvZ2dlcjogTG9nZ2VyIHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c2hhcmVUeXBlOiBzdHJpbmcsXG5cdHBheWxvYWQ6IHVua25vd25cbik6IFByb21pc2U8U2hhcmVDb25maXJtYXRpb25PcHRpb25zIHwgdW5kZWZpbmVkPiB7XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50KSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCByZXF1ZXN0UmVzcG9uc2UgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50SWQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgaWQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3QgZXhwaXJ5SW5Ib3VycyA9IDI0O1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlPFxuXHRcdFx0eyB0eXBlOiBzdHJpbmc7IGRhdGE6IHVua25vd24gfSxcblx0XHRcdHsgdXJsOiBzdHJpbmc7IGlkPzogc3RyaW5nIH1cblx0XHQ+KGVuZHBvaW50SWQsIHtcblx0XHRcdHR5cGU6IHNoYXJlVHlwZSxcblx0XHRcdGRhdGE6IHBheWxvYWRcblx0XHR9KTtcblxuXHRcdGlmIChyZXNwb25zZSkge1xuXHRcdFx0bGV0IGlkID0gcmVzcG9uc2UuaWQ7XG5cdFx0XHRpZiAoaXNFbXB0eShpZCkpIHtcblx0XHRcdFx0Y29uc3QgaW5kZXhPZklkID0gcmVzcG9uc2UudXJsLmxhc3RJbmRleE9mKFwiL1wiKTtcblx0XHRcdFx0aWYgKGluZGV4T2ZJZCAhPT0gLTEpIHtcblx0XHRcdFx0XHRpZCA9IHJlc3BvbnNlLnVybC5zbGljZShpbmRleE9mSWQgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRW1wdHkoaWQpKSB7XG5cdFx0XHRcdGNvbnN0IHBsYXRmb3JtSW5mbyA9IGF3YWl0IHBsYXRmb3JtLkFwcGxpY2F0aW9uLmdldEluZm8oKTtcblx0XHRcdFx0bGV0IGZpbnNMaW5rOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0aWYgKHBsYXRmb3JtSW5mby5tYW5pZmVzdFVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdFx0XHRcdGZpbnNMaW5rID0gYCR7cGxhdGZvcm1JbmZvLm1hbmlmZXN0VXJsLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRcImh0dHBcIixcblx0XHRcdFx0XHRcdFwiZmluXCJcblx0XHRcdFx0XHQpfT8kJHNoYXJlVHlwZT0ke3NoYXJlVHlwZX0mJCRwYXlsb2FkPSR7YnRvYShKU09OLnN0cmluZ2lmeSh7IGlkIH0pKX1gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcIldlIGRvIG5vdCBzdXBwb3J0IGZpbGUgYmFzZWQgbWFuaWZlc3QgbGF1bmNoZXMuIFRoZSBtYW5pZmVzdCBoYXMgdG8gYmUgc2VydmVkIG92ZXIgaHR0cC9odHRwczpcIixcblx0XHRcdFx0XHRcdHBsYXRmb3JtSW5mby5tYW5pZmVzdFVybFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNTdHJpbmdWYWx1ZShmaW5zTGluaykpIHtcblx0XHRcdFx0XHRhd2FpdCBmaW4uQ2xpcGJvYXJkLndyaXRlVGV4dCh7XG5cdFx0XHRcdFx0XHRkYXRhOiBmaW5zTGlua1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHRpdGxlOiBcIlNoYXJlIFJlcXVlc3QgUmFpc2VkXCIsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBgVGhlIHNoYXJlIHJlcXVlc3QgeW91IHJhaXNlZCBoYXMgYmVlbiBjb3BpZWQgdG8gdGhlICoqY2xpcGJvYXJkKiogYW5kIHdpbGwgYmUgdmFsaWQgZm9yICR7ZXhwaXJ5SW5Ib3Vyc30gaG91cnMuIFxcbiBTaGFyZSBVcmw6IFxcbiAqICoqJHtmaW5zTGlua30qKmAsXG5cdFx0XHRcdFx0XHRzdGF0dXM6IFwic2hhcmVkXCJcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJFcnJvciBzYXZpbmcgc2hhcmUgcmVxdWVzdDpcIiwgZXJyb3IpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHR0aXRsZTogXCJTaGFyZSBSZXF1ZXN0IEZhaWxlZFwiLFxuXHRcdG1lc3NhZ2U6IFwiVGhlIHNoYXJlIHJlcXVlc3QgeW91IHJhaXNlZCBjb3VsZCBub3QgYmUgZ2VuZXJhdGVkLlwiLFxuXHRcdHN0YXR1czogXCJlcnJvclwiXG5cdH07XG59XG5cbi8qKlxuICogTG9hZCB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSBsb2dnZXIgVGhlIGxvZ2dlciBmb3IgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0gZW5kcG9pbnRDbGllbnQgVGhlIGVuZHBvaW50IGNsaWVudC5cbiAqIEBwYXJhbSBlbmRwb2ludElkIFRoZSBlbmRwb2ludCBpZC5cbiAqIEBwYXJhbSBzaGFyZVR5cGUgVGhlIHNoYXJlIHR5cGUuXG4gKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSByZXF1ZXN0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyBUaGUgbG9hZGVkIHBheWxvYWQgYW5kIGFueSBjb25maXJtYXRpb24gdG8gZGlzcGxheS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTaGFyZVJlcXVlc3Q8VD4oXG5cdGxvZ2dlcjogTG9nZ2VyIHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQsXG5cdGVuZHBvaW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c2hhcmVUeXBlOiBzdHJpbmcsXG5cdGlkOiBzdHJpbmdcbik6IFByb21pc2U8XG5cdHwge1xuXHRcdFx0cGF5bG9hZD86IFQ7XG5cdFx0XHRjb25maXJtYXRpb246IFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB8IHVuZGVmaW5lZDtcblx0ICB9XG5cdHwgdW5kZWZpbmVkXG4+IHtcblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2UpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgY2xpZW50IHJlcXVlc3RSZXNwb25zZSBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRJZCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBpZCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTx7IGlkOiBzdHJpbmcgfSwgeyB0eXBlOiBzdHJpbmc7IGRhdGE6IFQgfT4oXG5cdFx0XHRcInNoYXJlLWdldFwiLFxuXHRcdFx0eyBpZCB9XG5cdFx0KTtcblx0XHRpZiAoIWlzRW1wdHkocmVzcG9uc2UpKSB7XG5cdFx0XHRpZiAoc2hhcmVUeXBlICE9PSByZXNwb25zZS50eXBlKSB7XG5cdFx0XHRcdGxvZ2dlcj8ud2FybihgU2hhcmUgZW50cnkgb2YgbWlzbWF0Y2hlZCB0eXBlIHNwZWNpZmllZDogJHtyZXNwb25zZS50eXBlfSBpdCBzaG91bGQgYmUgJHtzaGFyZVR5cGV9YCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29uZmlybWF0aW9uOiB7XG5cdFx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZSBMb2FkIEZhaWxlZFwiLFxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgc3BlY2lmaWVkIHNoYXJlIGxpbmsgZG9lcyBub3QgY29udGFpbiB0aGUgY29ycmVjdCBkYXRhIGZvciB0aGUgc2hhcmUgdHlwZS5cIixcblx0XHRcdFx0XHRcdHN0YXR1czogXCJlcnJvclwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRwYXlsb2FkOiByZXNwb25zZS5kYXRhLFxuXHRcdFx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZSBSZXF1ZXN0IEFwcGxpZWRcIixcblx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBzaGFyZSByZXF1ZXN0IGhhcyBiZWVuIGZldGNoZWQgYW5kIGFwcGxpZWQuXCIsXG5cdFx0XHRcdFx0c3RhdHVzOiBcImxvYWRlZFwiXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgTG9hZCBFeHBpcmVkXCIsXG5cdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNoYXJlIHJlcXVlc3QgaGFzIGV4cGlyZWQgYW5kIGlzIG5vIGxvbmdlciBhdmFpbGFibGUuXCIsXG5cdFx0XHRcdHN0YXR1czogXCJlcnJvclwiXG5cdFx0XHR9XG5cdFx0fTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3IgdHJ5aW5nIHRvIGxvYWQgYW5kIGFwcGx5IHRoZSBzaGFyZSBsaW5rLlwiLCBlcnJvcik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGNvbmZpcm1hdGlvbjoge1xuXHRcdFx0dGl0bGU6IFwiU2hhcmUgTG9hZCBGYWlsZWRcIixcblx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNwZWNpZmllZCBzaGFyZSBsaW5rIGNhbm5vdCBiZSBsb2FkZWQuXCIsXG5cdFx0XHRzdGF0dXM6IFwiZXJyb3JcIlxuXHRcdH1cblx0fTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRTaGFyZSxcblx0U2hhcmVDb25maXJtYXRpb25PcHRpb25zLFxuXHRTaGFyZUVudHJ5XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2hhcmUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBsb2FkU2hhcmVSZXF1ZXN0LCBzYXZlU2hhcmVSZXF1ZXN0IH0gZnJvbSBcIi4uL2NvbW1vbi9zaGFyZS1jb21tb25cIjtcbmltcG9ydCB0eXBlIHsgV29ya3NwYWNlc1NoYXJlRW50cnlQYXlsb2FkLCBXb3Jrc3BhY2VzU2hhcmVQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHdvcmtzcGFjZXMgc2hhcmUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VzU2hhcmVQcm92aWRlciBpbXBsZW1lbnRzIFNoYXJlPFdvcmtzcGFjZXNTaGFyZVByb3ZpZGVyT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIG1vZHVsZSBkZWZpbml0aW9uIGluY2x1ZGluZyBzZXR0aW5ncy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFdvcmtzcGFjZXNTaGFyZVByb3ZpZGVyT3B0aW9ucz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxXb3Jrc3BhY2VzU2hhcmVQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiV29ya3NwYWNlc1NoYXJlUHJvdmlkZXJcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZ1wiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIGFueSByZXNvdXJjZXMgYmVpbmcgdXNlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGNsb3NlZG93bigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJDbG9zZWRvd25cIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBsaXN0IG9mIHNoYXJlIHR5cGVzIHN1cHBvcnRlZCBieSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFNoYXJlVHlwZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXHRcdHJldHVybiBbXCJ3b3Jrc3BhY2VcIl07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzaGFyZXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gd2luZG93SWRlbnRpdHkgVGhlIHdpbmRvdyBpZGVudGl0eSB0byBnZXQgdGhlIHNoYXJlcyBmb3IuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0RW50cmllcyh3aW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSk6IFByb21pc2U8U2hhcmVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0Y29uc3Qgd29ya3NwYWNlU2hhcmVFbnRyeVBheWxvYWQ6IFdvcmtzcGFjZXNTaGFyZUVudHJ5UGF5bG9hZCA9IHtcblx0XHRcdHdpbmRvd0lkZW50aXR5XG5cdFx0fTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogXCJTaGFyZSBXb3Jrc3BhY2VcIixcblx0XHRcdFx0dHlwZTogXCJ3b3Jrc3BhY2VcIixcblx0XHRcdFx0cGF5bG9hZDogd29ya3NwYWNlU2hhcmVFbnRyeVBheWxvYWRcblx0XHRcdH1cblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIHNoYXJlIGZvciB0aGUgZ2l2ZW4gZW50cnkuXG5cdCAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHNoYXJlIHRvIHBlcmZvcm0uXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBkYXRhIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBzaGFyZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBzaGFyZSh0eXBlOiBzdHJpbmcsIHBheWxvYWQ/OiBXb3Jrc3BhY2VzU2hhcmVFbnRyeVBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodHlwZSA9PT0gXCJ3b3Jrc3BhY2VcIikge1xuXHRcdFx0Y29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRQbGF0Zm9ybT8uKCk7XG5cblx0XHRcdGlmIChwbGF0Zm9ybSkge1xuXHRcdFx0XHRsZXQgd29ya3NwYWNlO1xuXG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUlkID0gcGF5bG9hZD8ud29ya3NwYWNlSWQ7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHdvcmtzcGFjZUlkKSkge1xuXHRcdFx0XHRcdHdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLmdldEN1cnJlbnRXb3Jrc3BhY2UoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR3b3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFdvcmtzcGFjZSh3b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkod29ya3NwYWNlKSkge1xuXHRcdFx0XHRcdGNvbnN0IGNvbmZpcm1hdGlvbiA9IGF3YWl0IHNhdmVTaGFyZVJlcXVlc3QoXG5cdFx0XHRcdFx0XHRwbGF0Zm9ybSxcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcixcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50Py4oKSxcblx0XHRcdFx0XHRcdHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LnNldEVuZHBvaW50SWQsXG5cdFx0XHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRcdFx0d29ya3NwYWNlXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuc2hvd0NvbmZpcm1hdGlvbihjb25maXJtYXRpb24sIHBheWxvYWQ/LndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSBzaGFyZSBhY3RpdmF0aW9uLlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSBvZiB0aGUgc2hhcmUuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIGZvciB0aGUgc2hhcmUuXG5cdCAqIEBwYXJhbSBwYXlsb2FkLmlkIFRoZSBwYXlsb2FkIGZvciB0aGUgc2hhcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlKHR5cGU6IHN0cmluZywgcGF5bG9hZDogeyBpZDogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodHlwZSA9PT0gXCJ3b3Jrc3BhY2VcIikge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsb2FkU2hhcmVSZXF1ZXN0PFdvcmtzcGFjZT4oXG5cdFx0XHRcdHRoaXMuX2xvZ2dlcixcblx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8uZ2V0RW5kcG9pbnRDbGllbnQ/LigpLFxuXHRcdFx0XHR0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5nZXRFbmRwb2ludElkLFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRwYXlsb2FkLmlkXG5cdFx0XHQpO1xuXG5cdFx0XHRjb25zdCBwbGF0Zm9ybSA9IGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldFBsYXRmb3JtPy4oKTtcblx0XHRcdGlmIChwbGF0Zm9ybSkge1xuXHRcdFx0XHRjb25zdCByZXNwb25zZVBheWxvYWQgPSByZXNwb25zZT8ucGF5bG9hZDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KHJlc3BvbnNlUGF5bG9hZCkgJiYgdGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKSB7XG5cdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5zYXZlV29ya3NwYWNlKHJlc3BvbnNlUGF5bG9hZCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycy5sYXVuY2hXb3Jrc3BhY2UocmVzcG9uc2VQYXlsb2FkLndvcmtzcGFjZUlkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IHRoaXMuc2hvd0NvbmZpcm1hdGlvbihyZXNwb25zZT8uY29uZmlybWF0aW9uKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyBhIGNvbmZpcm1hdGlvbi5cblx0ICogQHBhcmFtIGNvbmZpcm1hdGlvbiBUaGUgY29uZmlybWF0aW9uIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBwYXJlbnRJZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIHBhcmVudCB3aW5kb3cuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHNob3dDb25maXJtYXRpb24oXG5cdFx0Y29uZmlybWF0aW9uOiBTaGFyZUNvbmZpcm1hdGlvbk9wdGlvbnMgfCB1bmRlZmluZWQsXG5cdFx0cGFyZW50SWRlbnRpdHk/OiBPcGVuRmluLklkZW50aXR5XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghaXNFbXB0eShjb25maXJtYXRpb24pICYmIHRoaXMuX2hlbHBlcnM/LmdldFNoYXJlQ2xpZW50KSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oY29uZmlybWF0aW9uKTtcblx0XHRcdGNvbnN0IHNoYXJlQ2xpZW50ID0gYXdhaXQgdGhpcy5faGVscGVycy5nZXRTaGFyZUNsaWVudCgpO1xuXHRcdFx0aWYgKHNoYXJlQ2xpZW50KSB7XG5cdFx0XHRcdGNvbnN0IGljb25LZXkgPSBjb25maXJtYXRpb24uc3RhdHVzID09PSBcImVycm9yXCIgPyBcImVycm9yXCIgOiBcInN1Y2Nlc3NcIjtcblx0XHRcdFx0Y29uZmlybWF0aW9uLmljb25VcmwgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5pbWFnZXNbaWNvbktleV07XG5cdFx0XHRcdGlmICh0aGlzLl9oZWxwZXJzPy5nZXRUaGVtZUNsaWVudCAmJiAhaXNFbXB0eShjb25maXJtYXRpb24uaWNvblVybCkpIHtcblx0XHRcdFx0XHRjb25zdCB0aGVtZUNsaWVudCA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0VGhlbWVDbGllbnQoKTtcblx0XHRcdFx0XHRjb25maXJtYXRpb24uaWNvblVybCA9IGF3YWl0IHRoZW1lQ2xpZW50LnRoZW1lVXJsKGNvbmZpcm1hdGlvbi5pY29uVXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhd2FpdCBzaGFyZUNsaWVudC5jb25maXJtYXRpb24oXG5cdFx0XHRcdFx0Y29uZmlybWF0aW9uLFxuXHRcdFx0XHRcdHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmNvbmZpcm1hdGlvbk1vZGUsXG5cdFx0XHRcdFx0cGFyZW50SWRlbnRpdHlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFdvcmtzcGFjZXNTaGFyZVByb3ZpZGVyIH0gZnJvbSBcIi4vc2hhcmVcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdHNoYXJlOiBuZXcgV29ya3NwYWNlc1NoYXJlUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==