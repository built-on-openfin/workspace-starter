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
                    const workspace = await platform.Storage.getWorkspace(responsePayload.workspaceId);
                    if (workspace) {
                        await platform.Storage.updateWorkspace({
                            workspaceId: responsePayload.workspaceId,
                            workspace: responsePayload
                        });
                    }
                    else {
                        await platform.Storage.saveWorkspace(responsePayload);
                    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUMsQ0FBQztnQkFDekUsQ0FBQztnQkFDRCxNQUFNLFdBQVcsQ0FBQyxZQUFZLENBQzdCLFlBQVksRUFDWixJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFDeEMsY0FBYyxDQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzdMRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTGtEO0FBRWxEOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLEtBQUssRUFBRSxJQUFJLDJEQUF1QixFQUFFO0NBQ3BDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvY29tbW9uL3NoYXJlLWNvbW1vbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvd29ya3NwYWNlcy9zaGFyZS50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvc2hhcmUvd29ya3NwYWNlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludENsaWVudCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTaGFyZUNvbmZpcm1hdGlvbk9wdGlvbnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3NoYXJlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIFNhdmUgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHdvcmtzcGFjZSBwbGF0Zm9ybS5cbiAqIEBwYXJhbSBsb2dnZXIgVGhlIGxvZ2dlciBmb3IgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0gZW5kcG9pbnRDbGllbnQgVGhlIGVuZHBvaW50IGNsaWVudC5cbiAqIEBwYXJhbSBlbmRwb2ludElkIFRoZSBlbmRwb2ludCBpZC5cbiAqIEBwYXJhbSBzaGFyZVR5cGUgVGhlIHNoYXJlIHR5cGUuXG4gKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCB0byBzYXZlLlxuICogQHJldHVybnMgVGhlIGNvbmZpcm1hdGlvbiB0byBkaXNwbGF5LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNoYXJlUmVxdWVzdChcblx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRsb2dnZXI6IExvZ2dlciB8IHVuZGVmaW5lZCxcblx0ZW5kcG9pbnRDbGllbnQ6IEVuZHBvaW50Q2xpZW50IHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludElkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHNoYXJlVHlwZTogc3RyaW5nLFxuXHRwYXlsb2FkOiB1bmtub3duXG4pOiBQcm9taXNlPFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB8IHVuZGVmaW5lZD4ge1xuXHRpZiAoaXNFbXB0eShlbmRwb2ludENsaWVudCkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZSkpIHtcblx0XHRsb2dnZXI/Lndhcm4oXCJFbmRwb2ludCBjbGllbnQgcmVxdWVzdFJlc3BvbnNlIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoaXNFbXB0eShlbmRwb2ludElkKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGlkIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IGV4cGlyeUluSG91cnMgPSAyNDtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTxcblx0XHRcdHsgdHlwZTogc3RyaW5nOyBkYXRhOiB1bmtub3duIH0sXG5cdFx0XHR7IHVybDogc3RyaW5nOyBpZD86IHN0cmluZyB9XG5cdFx0PihlbmRwb2ludElkLCB7XG5cdFx0XHR0eXBlOiBzaGFyZVR5cGUsXG5cdFx0XHRkYXRhOiBwYXlsb2FkXG5cdFx0fSk7XG5cblx0XHRpZiAocmVzcG9uc2UpIHtcblx0XHRcdGxldCBpZCA9IHJlc3BvbnNlLmlkO1xuXHRcdFx0aWYgKGlzRW1wdHkoaWQpKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4T2ZJZCA9IHJlc3BvbnNlLnVybC5sYXN0SW5kZXhPZihcIi9cIik7XG5cdFx0XHRcdGlmIChpbmRleE9mSWQgIT09IC0xKSB7XG5cdFx0XHRcdFx0aWQgPSByZXNwb25zZS51cmwuc2xpY2UoaW5kZXhPZklkICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc0VtcHR5KGlkKSkge1xuXHRcdFx0XHRjb25zdCBwbGF0Zm9ybUluZm8gPSBhd2FpdCBwbGF0Zm9ybS5BcHBsaWNhdGlvbi5nZXRJbmZvKCk7XG5cdFx0XHRcdGxldCBmaW5zTGluazogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRcdGlmIChwbGF0Zm9ybUluZm8ubWFuaWZlc3RVcmwuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRcdFx0XHRmaW5zTGluayA9IGAke3BsYXRmb3JtSW5mby5tYW5pZmVzdFVybC5yZXBsYWNlKFxuXHRcdFx0XHRcdFx0XCJodHRwXCIsXG5cdFx0XHRcdFx0XHRcImZpblwiXG5cdFx0XHRcdFx0KX0/JCRzaGFyZVR5cGU9JHtzaGFyZVR5cGV9JiQkcGF5bG9hZD0ke2J0b2EoSlNPTi5zdHJpbmdpZnkoeyBpZCB9KSl9YDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XCJXZSBkbyBub3Qgc3VwcG9ydCBmaWxlIGJhc2VkIG1hbmlmZXN0IGxhdW5jaGVzLiBUaGUgbWFuaWZlc3QgaGFzIHRvIGJlIHNlcnZlZCBvdmVyIGh0dHAvaHR0cHM6XCIsXG5cdFx0XHRcdFx0XHRwbGF0Zm9ybUluZm8ubWFuaWZlc3RVcmxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzU3RyaW5nVmFsdWUoZmluc0xpbmspKSB7XG5cdFx0XHRcdFx0YXdhaXQgZmluLkNsaXBib2FyZC53cml0ZVRleHQoe1xuXHRcdFx0XHRcdFx0ZGF0YTogZmluc0xpbmtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0aXRsZTogXCJTaGFyZSBSZXF1ZXN0IFJhaXNlZFwiLFxuXHRcdFx0XHRcdFx0bWVzc2FnZTogYFRoZSBzaGFyZSByZXF1ZXN0IHlvdSByYWlzZWQgaGFzIGJlZW4gY29waWVkIHRvIHRoZSAqKmNsaXBib2FyZCoqIGFuZCB3aWxsIGJlIHZhbGlkIGZvciAke2V4cGlyeUluSG91cnN9IGhvdXJzLiBcXG4gU2hhcmUgVXJsOiBcXG4gKiAqKiR7Zmluc0xpbmt9KipgLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiBcInNoYXJlZFwiXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiRXJyb3Igc2F2aW5nIHNoYXJlIHJlcXVlc3Q6XCIsIGVycm9yKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IFwiU2hhcmUgUmVxdWVzdCBGYWlsZWRcIixcblx0XHRtZXNzYWdlOiBcIlRoZSBzaGFyZSByZXF1ZXN0IHlvdSByYWlzZWQgY291bGQgbm90IGJlIGdlbmVyYXRlZC5cIixcblx0XHRzdGF0dXM6IFwiZXJyb3JcIlxuXHR9O1xufVxuXG4vKipcbiAqIExvYWQgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0gbG9nZ2VyIFRoZSBsb2dnZXIgZm9yIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIGVuZHBvaW50Q2xpZW50IFRoZSBlbmRwb2ludCBjbGllbnQuXG4gKiBAcGFyYW0gZW5kcG9pbnRJZCBUaGUgZW5kcG9pbnQgaWQuXG4gKiBAcGFyYW0gc2hhcmVUeXBlIFRoZSBzaGFyZSB0eXBlLlxuICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgcmVxdWVzdCB0byBsb2FkLlxuICogQHJldHVybnMgVGhlIGxvYWRlZCBwYXlsb2FkIGFuZCBhbnkgY29uZmlybWF0aW9uIHRvIGRpc3BsYXkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkU2hhcmVSZXF1ZXN0PFQ+KFxuXHRsb2dnZXI6IExvZ2dlciB8IHVuZGVmaW5lZCxcblx0ZW5kcG9pbnRDbGllbnQ6IEVuZHBvaW50Q2xpZW50IHwgdW5kZWZpbmVkLFxuXHRlbmRwb2ludElkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHNoYXJlVHlwZTogc3RyaW5nLFxuXHRpZDogc3RyaW5nXG4pOiBQcm9taXNlPFxuXHR8IHtcblx0XHRcdHBheWxvYWQ/OiBUO1xuXHRcdFx0Y29uZmlybWF0aW9uOiBTaGFyZUNvbmZpcm1hdGlvbk9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cdCAgfVxuXHR8IHVuZGVmaW5lZFxuPiB7XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50Q2xpZW50KSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCBpcyBub3QgYXZhaWxhYmxlLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQucmVxdWVzdFJlc3BvbnNlKSkge1xuXHRcdGxvZ2dlcj8ud2FybihcIkVuZHBvaW50IGNsaWVudCByZXF1ZXN0UmVzcG9uc2UgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChpc0VtcHR5KGVuZHBvaW50SWQpKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiRW5kcG9pbnQgaWQgaXMgbm90IGF2YWlsYWJsZS5cIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBlbmRwb2ludENsaWVudC5yZXF1ZXN0UmVzcG9uc2U8eyBpZDogc3RyaW5nIH0sIHsgdHlwZTogc3RyaW5nOyBkYXRhOiBUIH0+KFxuXHRcdFx0XCJzaGFyZS1nZXRcIixcblx0XHRcdHsgaWQgfVxuXHRcdCk7XG5cdFx0aWYgKCFpc0VtcHR5KHJlc3BvbnNlKSkge1xuXHRcdFx0aWYgKHNoYXJlVHlwZSAhPT0gcmVzcG9uc2UudHlwZSkge1xuXHRcdFx0XHRsb2dnZXI/Lndhcm4oYFNoYXJlIGVudHJ5IG9mIG1pc21hdGNoZWQgdHlwZSBzcGVjaWZpZWQ6ICR7cmVzcG9uc2UudHlwZX0gaXQgc2hvdWxkIGJlICR7c2hhcmVUeXBlfWApO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvbmZpcm1hdGlvbjoge1xuXHRcdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgTG9hZCBGYWlsZWRcIixcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIHNwZWNpZmllZCBzaGFyZSBsaW5rIGRvZXMgbm90IGNvbnRhaW4gdGhlIGNvcnJlY3QgZGF0YSBmb3IgdGhlIHNoYXJlIHR5cGUuXCIsXG5cdFx0XHRcdFx0XHRzdGF0dXM6IFwiZXJyb3JcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cGF5bG9hZDogcmVzcG9uc2UuZGF0YSxcblx0XHRcdFx0Y29uZmlybWF0aW9uOiB7XG5cdFx0XHRcdFx0dGl0bGU6IFwiU2hhcmUgUmVxdWVzdCBBcHBsaWVkXCIsXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgc2hhcmUgcmVxdWVzdCBoYXMgYmVlbiBmZXRjaGVkIGFuZCBhcHBsaWVkLlwiLFxuXHRcdFx0XHRcdHN0YXR1czogXCJsb2FkZWRcIlxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29uZmlybWF0aW9uOiB7XG5cdFx0XHRcdHRpdGxlOiBcIlNoYXJlIExvYWQgRXhwaXJlZFwiLFxuXHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBzaGFyZSByZXF1ZXN0IGhhcyBleHBpcmVkIGFuZCBpcyBubyBsb25nZXIgYXZhaWxhYmxlLlwiLFxuXHRcdFx0XHRzdGF0dXM6IFwiZXJyb3JcIlxuXHRcdFx0fVxuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIlRoZXJlIGhhcyBiZWVuIGFuIGVycm9yIHRyeWluZyB0byBsb2FkIGFuZCBhcHBseSB0aGUgc2hhcmUgbGluay5cIiwgZXJyb3IpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb25maXJtYXRpb246IHtcblx0XHRcdHRpdGxlOiBcIlNoYXJlIExvYWQgRmFpbGVkXCIsXG5cdFx0XHRtZXNzYWdlOiBcIlRoZSBzcGVjaWZpZWQgc2hhcmUgbGluayBjYW5ub3QgYmUgbG9hZGVkLlwiLFxuXHRcdFx0c3RhdHVzOiBcImVycm9yXCJcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtzcGFjZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0U2hhcmUsXG5cdFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyxcblx0U2hhcmVFbnRyeVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3NoYXJlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgbG9hZFNoYXJlUmVxdWVzdCwgc2F2ZVNoYXJlUmVxdWVzdCB9IGZyb20gXCIuLi9jb21tb24vc2hhcmUtY29tbW9uXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtzcGFjZXNTaGFyZUVudHJ5UGF5bG9hZCwgV29ya3NwYWNlc1NoYXJlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSB3b3Jrc3BhY2VzIHNoYXJlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlc1NoYXJlUHJvdmlkZXIgaW1wbGVtZW50cyBTaGFyZTxXb3Jrc3BhY2VzU2hhcmVQcm92aWRlck9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbiBpbmNsdWRpbmcgc2V0dGluZ3MuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxXb3Jrc3BhY2VzU2hhcmVQcm92aWRlck9wdGlvbnM+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248V29ya3NwYWNlc1NoYXJlUHJvdmlkZXJPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIldvcmtzcGFjZXNTaGFyZVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbGlzdCBvZiBzaGFyZSB0eXBlcyBzdXBwb3J0ZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRTaGFyZVR5cGVzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcblx0XHRyZXR1cm4gW1wid29ya3NwYWNlXCJdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgc2hhcmVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHdpbmRvd0lkZW50aXR5IFRoZSB3aW5kb3cgaWRlbnRpdHkgdG8gZ2V0IHRoZSBzaGFyZXMgZm9yLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEVudHJpZXMod2luZG93SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkpOiBQcm9taXNlPFNoYXJlRW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IHdvcmtzcGFjZVNoYXJlRW50cnlQYXlsb2FkOiBXb3Jrc3BhY2VzU2hhcmVFbnRyeVBheWxvYWQgPSB7XG5cdFx0XHR3aW5kb3dJZGVudGl0eVxuXHRcdH07XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IFwiU2hhcmUgV29ya3NwYWNlXCIsXG5cdFx0XHRcdHR5cGU6IFwid29ya3NwYWNlXCIsXG5cdFx0XHRcdHBheWxvYWQ6IHdvcmtzcGFjZVNoYXJlRW50cnlQYXlsb2FkXG5cdFx0XHR9XG5cdFx0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBzaGFyZSBmb3IgdGhlIGdpdmVuIGVudHJ5LlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSBvZiBzaGFyZSB0byBwZXJmb3JtLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgc2hhcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2hhcmUodHlwZTogc3RyaW5nLCBwYXlsb2FkPzogV29ya3NwYWNlc1NoYXJlRW50cnlQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHR5cGUgPT09IFwid29ya3NwYWNlXCIpIHtcblx0XHRcdGNvbnN0IHBsYXRmb3JtID0gYXdhaXQgdGhpcy5faGVscGVycz8uZ2V0UGxhdGZvcm0/LigpO1xuXG5cdFx0XHRpZiAocGxhdGZvcm0pIHtcblx0XHRcdFx0bGV0IHdvcmtzcGFjZTtcblxuXHRcdFx0XHRjb25zdCB3b3Jrc3BhY2VJZCA9IHBheWxvYWQ/LndvcmtzcGFjZUlkO1xuXHRcdFx0XHRpZiAoaXNFbXB0eSh3b3Jrc3BhY2VJZCkpIHtcblx0XHRcdFx0XHR3b3Jrc3BhY2UgPSBhd2FpdCBwbGF0Zm9ybS5nZXRDdXJyZW50V29ya3NwYWNlKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0d29ya3NwYWNlID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRXb3Jrc3BhY2Uod29ya3NwYWNlSWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KHdvcmtzcGFjZSkpIHtcblx0XHRcdFx0XHRjb25zdCBjb25maXJtYXRpb24gPSBhd2FpdCBzYXZlU2hhcmVSZXF1ZXN0KFxuXHRcdFx0XHRcdFx0cGxhdGZvcm0sXG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIsXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudD8uKCksXG5cdFx0XHRcdFx0XHR0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5zZXRFbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0dHlwZSxcblx0XHRcdFx0XHRcdHdvcmtzcGFjZVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRhd2FpdCB0aGlzLnNob3dDb25maXJtYXRpb24oY29uZmlybWF0aW9uLCBwYXlsb2FkPy53aW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgc2hhcmUgYWN0aXZhdGlvbi5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIHNoYXJlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmb3IgdGhlIHNoYXJlLlxuXHQgKiBAcGFyYW0gcGF5bG9hZC5pZCBUaGUgcGF5bG9hZCBmb3IgdGhlIHNoYXJlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhhbmRsZSh0eXBlOiBzdHJpbmcsIHBheWxvYWQ6IHsgaWQ6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHR5cGUgPT09IFwid29ya3NwYWNlXCIpIHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbG9hZFNoYXJlUmVxdWVzdDxXb3Jrc3BhY2U+KFxuXHRcdFx0XHR0aGlzLl9sb2dnZXIsXG5cdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmdldEVuZHBvaW50Q2xpZW50Py4oKSxcblx0XHRcdFx0dGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uZ2V0RW5kcG9pbnRJZCxcblx0XHRcdFx0dHlwZSxcblx0XHRcdFx0cGF5bG9hZC5pZFxuXHRcdFx0KTtcblxuXHRcdFx0Y29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5nZXRQbGF0Zm9ybT8uKCk7XG5cdFx0XHRpZiAocGxhdGZvcm0pIHtcblx0XHRcdFx0Y29uc3QgcmVzcG9uc2VQYXlsb2FkID0gcmVzcG9uc2U/LnBheWxvYWQ7XG5cdFx0XHRcdGlmICghaXNFbXB0eShyZXNwb25zZVBheWxvYWQpICYmIHRoaXMuX2hlbHBlcnM/LmxhdW5jaFdvcmtzcGFjZSkge1xuXHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0V29ya3NwYWNlKHJlc3BvbnNlUGF5bG9hZC53b3Jrc3BhY2VJZCk7XG5cdFx0XHRcdFx0aWYgKHdvcmtzcGFjZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uU3RvcmFnZS51cGRhdGVXb3Jrc3BhY2Uoe1xuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VJZDogcmVzcG9uc2VQYXlsb2FkLndvcmtzcGFjZUlkLFxuXHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2U6IHJlc3BvbnNlUGF5bG9hZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2Uuc2F2ZVdvcmtzcGFjZShyZXNwb25zZVBheWxvYWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzLmxhdW5jaFdvcmtzcGFjZShyZXNwb25zZVBheWxvYWQud29ya3NwYWNlSWQsIHRoaXMuX2xvZ2dlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgdGhpcy5zaG93Q29uZmlybWF0aW9uKHJlc3BvbnNlPy5jb25maXJtYXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IGEgY29uZmlybWF0aW9uLlxuXHQgKiBAcGFyYW0gY29uZmlybWF0aW9uIFRoZSBjb25maXJtYXRpb24gb3B0aW9ucy5cblx0ICogQHBhcmFtIHBhcmVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgcGFyZW50IHdpbmRvdy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2hvd0NvbmZpcm1hdGlvbihcblx0XHRjb25maXJtYXRpb246IFNoYXJlQ29uZmlybWF0aW9uT3B0aW9ucyB8IHVuZGVmaW5lZCxcblx0XHRwYXJlbnRJZGVudGl0eT86IE9wZW5GaW4uSWRlbnRpdHlcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFpc0VtcHR5KGNvbmZpcm1hdGlvbikgJiYgdGhpcy5faGVscGVycz8uZ2V0U2hhcmVDbGllbnQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhjb25maXJtYXRpb24pO1xuXHRcdFx0Y29uc3Qgc2hhcmVDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldFNoYXJlQ2xpZW50KCk7XG5cdFx0XHRpZiAoc2hhcmVDbGllbnQpIHtcblx0XHRcdFx0Y29uc3QgaWNvbktleSA9IGNvbmZpcm1hdGlvbi5zdGF0dXMgPT09IFwiZXJyb3JcIiA/IFwiZXJyb3JcIiA6IFwic3VjY2Vzc1wiO1xuXHRcdFx0XHRjb25maXJtYXRpb24uaWNvblVybCA9IHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmltYWdlc1tpY29uS2V5XTtcblx0XHRcdFx0aWYgKHRoaXMuX2hlbHBlcnM/LmdldFRoZW1lQ2xpZW50ICYmICFpc0VtcHR5KGNvbmZpcm1hdGlvbi5pY29uVXJsKSkge1xuXHRcdFx0XHRcdGNvbnN0IHRoZW1lQ2xpZW50ID0gYXdhaXQgdGhpcy5faGVscGVycy5nZXRUaGVtZUNsaWVudCgpO1xuXHRcdFx0XHRcdGNvbmZpcm1hdGlvbi5pY29uVXJsID0gYXdhaXQgdGhlbWVDbGllbnQudGhlbWVVcmwoY29uZmlybWF0aW9uLmljb25VcmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGF3YWl0IHNoYXJlQ2xpZW50LmNvbmZpcm1hdGlvbihcblx0XHRcdFx0XHRjb25maXJtYXRpb24sXG5cdFx0XHRcdFx0dGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8uY29uZmlybWF0aW9uTW9kZSxcblx0XHRcdFx0XHRwYXJlbnRJZGVudGl0eVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgV29ya3NwYWNlc1NoYXJlUHJvdmlkZXIgfSBmcm9tIFwiLi9zaGFyZVwiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0c2hhcmU6IG5ldyBXb3Jrc3BhY2VzU2hhcmVQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9