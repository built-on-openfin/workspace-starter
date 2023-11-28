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
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   isValidUrl: () => (/* binding */ isValidUrl),
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
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isString(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return content;
}
/**
 * Validates the suggested url to see if it can replace the source url.
 * @param sourceUrl the original url to compare against.
 * @param suggestedUrl the suggested url to replace it with.
 * @param constraint the rules to apply against it.
 * @returns whether it is ok to replace the sourceUrl with the suggestedUrl
 */
function isValidUrl(sourceUrl, suggestedUrl, constraint) {
    if (isEmpty(suggestedUrl)) {
        return false;
    }
    if (!Array.isArray(constraint) || constraint.length === 0) {
        return true;
    }
    if (constraint.includes("URL_NONE")) {
        return false;
    }
    if (constraint.includes("URL_ANY")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("URL_PAGE")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("URL_DOMAIN")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
}


/***/ }),

/***/ "./client/src/modules/endpoint/channel/endpoint.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/endpoint/channel/endpoint.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelEndpoint: () => (/* binding */ ChannelEndpoint)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Channel endpoint.
 */
class ChannelEndpoint {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ChannelEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Handle an action sent to the endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param endpointDefinition.channelName The endpoint channel name.
     * @param endpointDefinition.actionName The endpoint action name.
     * @param endpointDefinition.payload The endpoint payload.
     * @param endpointDefinition.wait Wait for a response.
     * @param endpointDefinition.uuid The endpoint uuid.
     * @param endpointDefinition.logInfo Log information.
     * @param endpointDefinition.logWarn Log warnings.
     * @param endpointDefinition.logError Log errors.
     * @param request The request to process.
     * @param request.payload The request payload.
     * @returns True if processed.
     */
    async action(endpointDefinition, request) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
            this._logger?.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
            return false;
        }
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
            return false;
        }
        const logInfo = endpointDefinition?.options?.logInfo ?? true;
        const logWarn = endpointDefinition?.options?.logWarn ?? true;
        const logError = endpointDefinition?.options?.logError ?? true;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.actionName) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.channelName)) {
            if (logWarn) {
                this._logger?.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
            }
            return false;
        }
        try {
            const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
                wait: endpointDefinition.options.wait,
                payload: endpointDefinition.options.payload
            });
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.uuid) &&
                endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
                if (logWarn) {
                    this._logger?.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
                }
                return false;
            }
            if (logInfo) {
                this._logger?.info(`Sending action for endpoint id: ${endpointDefinition.id}`);
            }
            await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
            await channel.disconnect();
            return true;
        }
        catch (error) {
            if (logError) {
                this._logger?.error(`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`, error);
            }
            return false;
        }
    }
    /**
     * Handle a request response on an endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param endpointDefinition.channelName The endpoint channel name.
     * @param endpointDefinition.actionName The endpoint action name.
     * @param endpointDefinition.payload The endpoint payload.
     * @param endpointDefinition.wait Wait for a response.
     * @param endpointDefinition.uuid The endpoint uuid.
     * @param endpointDefinition.logInfo Log information.
     * @param endpointDefinition.logWarn Log warnings.
     * @param endpointDefinition.logError Log errors.
     * @param endpointDefinition.default The default object type.
     * @param request The request to process.
     * @param request.payload The request payload.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        let defaultValue = null;
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return defaultValue;
        }
        const logInfo = endpointDefinition?.options?.logInfo ?? true;
        const logWarn = endpointDefinition?.options?.logWarn ?? true;
        const logError = endpointDefinition?.options?.logError ?? true;
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition?.options?.default)) {
            if (endpointDefinition.options.default === "array") {
                defaultValue = [];
            }
            else if (endpointDefinition.options.default === "object") {
                defaultValue = {};
            }
        }
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.actionName) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.channelName)) {
            if (logWarn) {
                this._logger?.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
            }
            return defaultValue;
        }
        try {
            const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
                wait: endpointDefinition.options.wait,
                payload: endpointDefinition.options.payload
            });
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.uuid) &&
                endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
                if (logWarn) {
                    this._logger?.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
                }
                return defaultValue;
            }
            if (logInfo) {
                this._logger?.info(`Sending request response for endpoint: ${endpointDefinition.id}`);
            }
            const response = await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
            await channel.disconnect();
            return response;
        }
        catch (error) {
            if (logError) {
                this._logger?.error(`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`, error);
            }
            return defaultValue;
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
  !*** ./client/src/modules/endpoint/channel/index.ts ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoint/channel/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.ChannelEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsT0FBTyxDQUFDLFVBQVUsRUFDckMsT0FBTyxFQUFFLE9BQU8sQ0FDaEIsQ0FBQztZQUNGLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzNCLE9BQU8sUUFBUSxDQUFDO1FBQ2pCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2hCLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQ2xCLHdFQUF3RSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFDL0YsS0FBSyxDQUNMLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDckIsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQ25ORDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBRXRDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxRQUFRLEVBQUUsSUFBSSxzREFBZSxFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvY2hhbm5lbC9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwiVVJMX0RPTUFJTlwiIHwgXCJVUkxfUEFHRVwiIHwgXCJVUkxfQU5ZXCIgfCBcIlVSTF9OT05FXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9OT05FXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0FOWVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX1BBR0VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9ET01BSU5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uLCBFbmRwb2ludCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQ2hhbm5lbCBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYW5uZWxFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYW4gYWN0aW9uIHNlbnQgdG8gdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5jaGFubmVsTmFtZSBUaGUgZW5kcG9pbnQgY2hhbm5lbCBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmFjdGlvbk5hbWUgVGhlIGVuZHBvaW50IGFjdGlvbiBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnBheWxvYWQgVGhlIGVuZHBvaW50IHBheWxvYWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ud2FpdCBXYWl0IGZvciBhIHJlc3BvbnNlLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnV1aWQgVGhlIGVuZHBvaW50IHV1aWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nSW5mbyBMb2cgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nV2FybiBMb2cgd2FybmluZ3MuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nRXJyb3IgTG9nIGVycm9ycy5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHByb2Nlc3NlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24oXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gcGVyZm9ybSBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0XHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSlcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0XHR3YWl0OiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy53YWl0LFxuXHRcdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0XHR9KTtcblx0XHRcdGlmIChcblx0XHRcdFx0IWlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCkgJiZcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTZW5kaW5nIGFjdGlvbiBmb3IgZW5kcG9pbnQgaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uY2hhbm5lbE5hbWUgVGhlIGVuZHBvaW50IGNoYW5uZWwgbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5hY3Rpb25OYW1lIFRoZSBlbmRwb2ludCBhY3Rpb24gbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5wYXlsb2FkIFRoZSBlbmRwb2ludCBwYXlsb2FkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLndhaXQgV2FpdCBmb3IgYSByZXNwb25zZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi51dWlkIFRoZSBlbmRwb2ludCB1dWlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0luZm8gTG9nIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ1dhcm4gTG9nIHdhcm5pbmdzLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0Vycm9yIExvZyBlcnJvcnMuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uZGVmYXVsdCBUaGUgZGVmYXVsdCBvYmplY3QgdHlwZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdFx0dXVpZD86IHN0cmluZztcblx0XHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0XHRkZWZhdWx0PzogXCJvYmplY3RcIiB8IFwiYXJyYXlcIjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGxldCBkZWZhdWx0VmFsdWU6IHVua25vd24gPSBudWxsO1xuXG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZGVmYXVsdCkpIHtcblx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gW107XG5cdFx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lKVxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQpICYmXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFNlbmRpbmcgcmVxdWVzdCByZXNwb25zZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzcG9uc2U6IHVua25vd24gPSBhd2FpdCBjaGFubmVsLmRpc3BhdGNoKFxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLFxuXHRcdFx0XHRyZXF1ZXN0Py5wYXlsb2FkXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcgcmVxdWVzdC9yZXNwb25zZSBhbmQgY29ubmVjdGluZyB0byBlbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgQ2hhbm5lbEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgQ2hhbm5lbEVuZHBvaW50KClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=