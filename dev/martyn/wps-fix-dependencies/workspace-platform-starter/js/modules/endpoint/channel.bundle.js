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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHO0FBQ0ksU0FBUyxPQUFPLENBQUMsS0FBYztJQUNyQyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BHLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDM0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFNBQVMsQ0FBQyxLQUFjO0lBQ3ZDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDNUUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFNBQVMsQ0FBQyxLQUFjO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFdBQVcsQ0FBSSxHQUFNO0lBQ3BDLGdEQUFnRDtJQUNoRCxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsVUFBVTtJQUN6QixJQUFJLFlBQVksSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsZ0RBQWdEO1FBQ2hELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsdUdBQXVHO0lBQ3ZHLDZFQUE2RTtJQUM3RSw4Q0FBOEM7SUFDOUM7Ozs7T0FJRztJQUNILFNBQVMsWUFBWSxDQUFDLENBQVM7UUFDOUIsc0NBQXNDO1FBQ3RDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RixPQUFPO1FBQ04sc0NBQXNDO1FBQ3RDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FDOUIsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFdBQVcsQ0FBQyxHQUFZO0lBQ3ZDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO1NBQU0sSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7UUFDakMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCLENBQUM7U0FBTSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9CLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztTQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQixDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxjQUFjLENBQUMsT0FBZ0I7SUFDOUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU87YUFDWixPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzthQUN6QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQzthQUN0QixPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQzthQUN2QixPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSjBEO0FBRTNEOztHQUVHO0FBQ0ksTUFBTSxlQUFlO0lBRzNCOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLE9BQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQ2xCLGtCQVNFLEVBQ0YsT0FBK0I7UUFFL0IsSUFBSSx5RUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsMENBQTBDLGtCQUFrQixDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUN2RyxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLGtCQUFrQixDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDakIsc0VBQXNFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUM3RixDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDN0QsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUM7UUFFL0QsSUFDQyx5RUFBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztZQUNuQyx5RUFBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDOUMseUVBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQzlDLENBQUM7WUFDRixJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNqQixnRUFBZ0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQ3ZGLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0osTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUNyRyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3JDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTzthQUMzQyxDQUFDLENBQUM7WUFDSCxJQUNDLENBQUMseUVBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUN6QyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQ2hFLENBQUM7Z0JBQ0YsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDYixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDakIsZ0JBQWdCLGtCQUFrQixDQUFDLEVBQUUsNEJBQTRCLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLHNDQUFzQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxrREFBa0QsQ0FDOU4sQ0FBQztnQkFDSCxDQUFDO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUNELElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUNBQW1DLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUNELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNoRixNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQztRQUNiLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2hCLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQ2xCLDhEQUE4RCxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFDckYsS0FBSyxDQUNMLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0YsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQzNCLGtCQVVFLEVBQ0YsT0FBK0I7UUFFL0IsSUFBSSxZQUFZLEdBQVksSUFBSSxDQUFDO1FBRWpDLElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNqQixtRkFBbUYsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQzFHLENBQUM7WUFDRixPQUFPLFlBQVksQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDN0QsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUM7UUFFL0QsSUFBSSxDQUFDLHlFQUFPLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDcEQsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUNwRCxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ25CLENBQUM7aUJBQU0sSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUM1RCxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ25CLENBQUM7UUFDRixDQUFDO1FBQ0QsSUFDQyx5RUFBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztZQUNuQyx5RUFBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDOUMseUVBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQzlDLENBQUM7WUFDRixJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUNqQixnRUFBZ0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQ3ZGLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksQ0FBQztZQUNKLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDckcsSUFBSSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUNyQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDM0MsQ0FBQyxDQUFDO1lBQ0gsSUFDQyxDQUFDLHlFQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDekMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUNoRSxDQUFDO2dCQUNGLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQ2pCLGdCQUFnQixrQkFBa0IsQ0FBQyxFQUFFLDRCQUE0QixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxzQ0FBc0Msa0JBQWtCLENBQUMsT0FBTyxDQUFDLFdBQVcsa0RBQWtELENBQzlOLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxPQUFPLFlBQVksQ0FBQztZQUNyQixDQUFDO1lBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQywwQ0FBMEMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RixDQUFDO1lBQ0QsTUFBTSxRQUFRLEdBQVksTUFBTSxPQUFPLENBQUMsUUFBUSxDQUMvQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUNoQixDQUFDO1lBQ0YsTUFBTSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsT0FBTyxRQUFRLENBQUM7UUFDakIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEIsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FDbEIsd0VBQXdFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUMvRixLQUFLLENBQ0wsQ0FBQztZQUNILENBQUM7WUFDRCxPQUFPLFlBQVksQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDbk5EO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFFdEMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLHNEQUFlLEVBQUU7Q0FDL0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9jaGFubmVsL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9jaGFubmVsL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSBnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uLCBFbmRwb2ludCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQ2hhbm5lbCBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYW5uZWxFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYW4gYWN0aW9uIHNlbnQgdG8gdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5jaGFubmVsTmFtZSBUaGUgZW5kcG9pbnQgY2hhbm5lbCBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmFjdGlvbk5hbWUgVGhlIGVuZHBvaW50IGFjdGlvbiBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnBheWxvYWQgVGhlIGVuZHBvaW50IHBheWxvYWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ud2FpdCBXYWl0IGZvciBhIHJlc3BvbnNlLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnV1aWQgVGhlIGVuZHBvaW50IHV1aWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nSW5mbyBMb2cgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nV2FybiBMb2cgd2FybmluZ3MuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nRXJyb3IgTG9nIGVycm9ycy5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHByb2Nlc3NlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24oXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gcGVyZm9ybSBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0XHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSlcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0XHR3YWl0OiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy53YWl0LFxuXHRcdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0XHR9KTtcblx0XHRcdGlmIChcblx0XHRcdFx0IWlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCkgJiZcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTZW5kaW5nIGFjdGlvbiBmb3IgZW5kcG9pbnQgaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uY2hhbm5lbE5hbWUgVGhlIGVuZHBvaW50IGNoYW5uZWwgbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5hY3Rpb25OYW1lIFRoZSBlbmRwb2ludCBhY3Rpb24gbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5wYXlsb2FkIFRoZSBlbmRwb2ludCBwYXlsb2FkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLndhaXQgV2FpdCBmb3IgYSByZXNwb25zZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi51dWlkIFRoZSBlbmRwb2ludCB1dWlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0luZm8gTG9nIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ1dhcm4gTG9nIHdhcm5pbmdzLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0Vycm9yIExvZyBlcnJvcnMuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uZGVmYXVsdCBUaGUgZGVmYXVsdCBvYmplY3QgdHlwZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdFx0dXVpZD86IHN0cmluZztcblx0XHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0XHRkZWZhdWx0PzogXCJvYmplY3RcIiB8IFwiYXJyYXlcIjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGxldCBkZWZhdWx0VmFsdWU6IHVua25vd24gPSBudWxsO1xuXG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZGVmYXVsdCkpIHtcblx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gW107XG5cdFx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lKVxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQpICYmXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFNlbmRpbmcgcmVxdWVzdCByZXNwb25zZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzcG9uc2U6IHVua25vd24gPSBhd2FpdCBjaGFubmVsLmRpc3BhdGNoKFxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLFxuXHRcdFx0XHRyZXF1ZXN0Py5wYXlsb2FkXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcgcmVxdWVzdC9yZXNwb25zZSBhbmQgY29ubmVjdGluZyB0byBlbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgQ2hhbm5lbEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgQ2hhbm5lbEVuZHBvaW50KClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=