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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvY2hhbm5lbC9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnQvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiwgRW5kcG9pbnQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIENoYW5uZWwgZW5kcG9pbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFubmVsRW5kcG9pbnQgaW1wbGVtZW50cyBFbmRwb2ludCB7XG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkNoYW5uZWxFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGFuIGFjdGlvbiBzZW50IHRvIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uY2hhbm5lbE5hbWUgVGhlIGVuZHBvaW50IGNoYW5uZWwgbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5hY3Rpb25OYW1lIFRoZSBlbmRwb2ludCBhY3Rpb24gbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5wYXlsb2FkIFRoZSBlbmRwb2ludCBwYXlsb2FkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLndhaXQgV2FpdCBmb3IgYSByZXNwb25zZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi51dWlkIFRoZSBlbmRwb2ludCB1dWlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0luZm8gTG9nIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ1dhcm4gTG9nIHdhcm5pbmdzLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0Vycm9yIExvZyBlcnJvcnMuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnBheWxvYWQgVGhlIHJlcXVlc3QgcGF5bG9hZC5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBwcm9jZXNzZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdFx0dXVpZD86IHN0cmluZztcblx0XHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0fT4sXG5cdFx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucykgfHxcblx0XHRcdGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSkgfHxcblx0XHRcdGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUpXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0YFlvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uTmFtZSBhbmQgY2hhbm5lbE5hbWUgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQpICYmXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU2VuZGluZyBhY3Rpb24gZm9yIGVuZHBvaW50IGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHRcdH1cblx0XHRcdGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSwgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRgRXJyb3IgZXhlY3V0aW5nL29yIGNvbm5lY3RpbmcgdG8gYWN0aW9uLiBFbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmNoYW5uZWxOYW1lIFRoZSBlbmRwb2ludCBjaGFubmVsIG5hbWUuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uYWN0aW9uTmFtZSBUaGUgZW5kcG9pbnQgYWN0aW9uIG5hbWUuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ucGF5bG9hZCBUaGUgZW5kcG9pbnQgcGF5bG9hZC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi53YWl0IFdhaXQgZm9yIGEgcmVzcG9uc2UuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24udXVpZCBUaGUgZW5kcG9pbnQgdXVpZC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5sb2dJbmZvIExvZyBpbmZvcm1hdGlvbi5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5sb2dXYXJuIExvZyB3YXJuaW5ncy5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5sb2dFcnJvciBMb2cgZXJyb3JzLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmRlZmF1bHQgVGhlIGRlZmF1bHQgb2JqZWN0IHR5cGUuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEBwYXJhbSByZXF1ZXN0LnBheWxvYWQgVGhlIHJlcXVlc3QgcGF5bG9hZC5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0XHRjaGFubmVsTmFtZTogc3RyaW5nO1xuXHRcdFx0YWN0aW9uTmFtZTogc3RyaW5nO1xuXHRcdFx0cGF5bG9hZD86IHVua25vd247XG5cdFx0XHR3YWl0PzogYm9vbGVhbjtcblx0XHRcdHV1aWQ/OiBzdHJpbmc7XG5cdFx0XHRsb2dJbmZvPzogYm9vbGVhbjtcblx0XHRcdGxvZ1dhcm4/OiBib29sZWFuO1xuXHRcdFx0bG9nRXJyb3I/OiBib29sZWFuO1xuXHRcdFx0ZGVmYXVsdD86IFwib2JqZWN0XCIgfCBcImFycmF5XCI7XG5cdFx0fT4sXG5cdFx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuXHQpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRsZXQgZGVmYXVsdFZhbHVlOiB1bmtub3duID0gbnVsbDtcblxuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0Y29uc3QgbG9nSW5mbyA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nSW5mbyA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ1dhcm4gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ1dhcm4gPz8gdHJ1ZTtcblx0XHRjb25zdCBsb2dFcnJvciA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nRXJyb3IgPz8gdHJ1ZTtcblxuXHRcdGlmICghaXNFbXB0eShlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmRlZmF1bHQpKSB7XG5cdFx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuZGVmYXVsdCA9PT0gXCJhcnJheVwiKSB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZSA9IFtdO1xuXHRcdFx0fSBlbHNlIGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZSA9IHt9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSlcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBjaGFubmVsID0gYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lLCB7XG5cdFx0XHRcdHdhaXQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLndhaXQsXG5cdFx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHRcdH0pO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhaXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkKSAmJlxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTZW5kaW5nIHJlcXVlc3QgcmVzcG9uc2UgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHJlc3BvbnNlOiB1bmtub3duID0gYXdhaXQgY2hhbm5lbC5kaXNwYXRjaChcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSxcblx0XHRcdFx0cmVxdWVzdD8ucGF5bG9hZFxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRgRXJyb3IgZXhlY3V0aW5nIHJlcXVlc3QvcmVzcG9uc2UgYW5kIGNvbm5lY3RpbmcgdG8gZW5kcG9pbnQgd2l0aCBpZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCxcblx0XHRcdFx0XHRlcnJvclxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IENoYW5uZWxFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogbmV3IENoYW5uZWxFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9