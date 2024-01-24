/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   getCommandLineArgs: () => (/* binding */ getCommandLineArgs),
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
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
function deepEqual(obj1, obj2, matchPropertyOrder = true) {
    if (isObject(obj1) && isObject(obj2)) {
        const objKeys1 = Object.keys(obj1);
        const objKeys2 = Object.keys(obj2);
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
        if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
            return false;
        }
        for (const key of objKeys1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value1 = obj1[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value2 = obj2[key];
            if (!deepEqual(value1, value2, matchPropertyOrder)) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
                return false;
            }
        }
    }
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
function deepMerge(target, ...sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
        return target;
    }
    const targetAsMap = target;
    const source = sources.shift();
    let keys;
    if (isObject(targetAsMap) && isObject(source)) {
        keys = Object.keys(source);
    }
    else if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            return source;
        }
        keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
    }
    if (keys) {
        const sourceAsMap = source;
        for (const key of keys) {
            const value = sourceAsMap[key];
            if (isObject(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = {};
                }
                deepMerge(targetAsMap[key], value);
            }
            else if (Array.isArray(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = [];
                }
                deepMerge(targetAsMap[key], value);
            }
            else {
                targetAsMap[key] = value;
            }
        }
    }
    return deepMerge(target, ...sources);
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
/**
 * Get the command line arguments from a command line string.
 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
 * @param commandLine The command line string.
 * @returns The command line arguments or an empty array if none
 */
function getCommandLineArgs(commandLine) {
    if (!isStringValue(commandLine)) {
        return [];
    }
    const matches = commandLine.match(/(\w+=)?("[^"]*"|'[^']*'|[^ ]+)/g);
    if (isEmpty(matches)) {
        return [];
    }
    return matches;
}


/***/ }),

/***/ "./client/src/modules/endpoint/example-context-processor/endpoint.ts":
/*!***************************************************************************!*\
  !*** ./client/src/modules/endpoint/example-context-processor/endpoint.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleContextProcessorEndpoint: () => (/* binding */ ExampleContextProcessorEndpoint)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Example context processor endpoint.
 */
class ExampleContextProcessorEndpoint {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ExampleContextProcessorEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Takes a context object and returns an enriched version.
     * @param endpointDefinition The definition of the endpoint (which is passed by the endpoint provider).
     * @param request The request containing the context to process that is passed by the interopbroker.
     * @returns The response containing the enriched or original context object.
     */
    async requestResponse(endpointDefinition, request) {
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return { context: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.objectClone)(request?.context) };
        }
        // decouple the request from the response.
        const response = { context: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.objectClone)(request?.context) };
        this._logger?.info("This is an example of an endpoint that can process a context object that was passed to the broker and needs processing.");
        if (request?.context?.type === "org.dayofinterest") {
            if (endpointDefinition?.options?.logContext) {
                this._logger?.info(`Context Type ${request.context.type} matched. Incoming context:`, request.context);
            }
            const contextId = request.context.id;
            if (contextId && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(contextId.date)) {
                // we would do more validation in a real app
                const targetDate = new Date(contextId.date);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.day)) {
                    contextId.day = `${targetDate.getDate()}`;
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.month)) {
                    contextId.month = `${targetDate.getMonth() + 1}`;
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.year)) {
                    contextId.year = `${targetDate.getFullYear()}`;
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.epoch)) {
                    contextId.epoch = `${targetDate.getTime() / 1000}`;
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.utc)) {
                    contextId.utc = `${targetDate.toUTCString()}`;
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(contextId.iso)) {
                    contextId.iso = `${targetDate.toISOString()}`;
                }
                if (endpointDefinition?.options?.logContext) {
                    this._logger?.info(`Context Type ${response.context.type} matched. Processed context:`, response.context);
                }
            }
            else {
                this._logger?.warn(`Unable to process ${request.context.type} as it did not have date as part of the id`);
            }
        }
        return response;
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
/*!************************************************************************!*\
  !*** ./client/src/modules/endpoint/example-context-processor/index.ts ***!
  \************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoint/example-context-processor/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.ExampleContextProcessorEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5jb250ZXh0LnByb2Nlc3Nvci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHO0FBQ0ksU0FBUyxPQUFPLENBQUMsS0FBYztJQUNyQyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BHLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDM0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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d0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0w2RDtBQUV0RCxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLElBQUksc0VBQStCLEVBQUU7Q0FDL0MsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9leGFtcGxlLWNvbnRleHQtcHJvY2Vzc29yL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludC9leGFtcGxlLWNvbnRleHQtcHJvY2Vzc29yL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBEbyBhIGRlZXAgY29tcGFyaXNvbiBvZiB0aGUgb2JqZWN0cy5cbiAqIEBwYXJhbSBvYmoxIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvYmoyIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbWF0Y2hQcm9wZXJ0eU9yZGVyIElmIHRydWUgdGhlIHByb3BlcnRpZXMgbXVzdCBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9iamVjdHMgYXJlIHRoZSBzYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEVxdWFsKG9iajE6IHVua25vd24sIG9iajI6IHVua25vd24sIG1hdGNoUHJvcGVydHlPcmRlcjogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcblx0aWYgKGlzT2JqZWN0KG9iajEpICYmIGlzT2JqZWN0KG9iajIpKSB7XG5cdFx0Y29uc3Qgb2JqS2V5czEgPSBPYmplY3Qua2V5cyhvYmoxKTtcblx0XHRjb25zdCBvYmpLZXlzMiA9IE9iamVjdC5rZXlzKG9iajIpO1xuXG5cdFx0aWYgKG9iaktleXMxLmxlbmd0aCAhPT0gb2JqS2V5czIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoUHJvcGVydHlPcmRlciAmJiBKU09OLnN0cmluZ2lmeShvYmpLZXlzMSkgIT09IEpTT04uc3RyaW5naWZ5KG9iaktleXMyKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iaktleXMxKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUxID0gKG9iajEgYXMgYW55KVtrZXldO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMiA9IChvYmoyIGFzIGFueSlba2V5XTtcblxuXHRcdFx0aWYgKCFkZWVwRXF1YWwodmFsdWUxLCB2YWx1ZTIsIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajEpICYmIEFycmF5LmlzQXJyYXkob2JqMikpIHtcblx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFkZWVwRXF1YWwob2JqMVtpXSwgb2JqMltpXSwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKTtcbn1cblxuLyoqXG4gKiBEZWVwIG1lcmdlIHR3byBvYmplY3RzLlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGJlIG1lcmdlZCBpbnRvLlxuICogQHBhcmFtIHNvdXJjZXMgVGhlIG9iamVjdHMgdG8gbWVyZ2UgaW50byB0aGUgdGFyZ2V0LlxuICogQHJldHVybnMgVGhlIG1lcmdlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8VCA9IHVua25vd24+KHRhcmdldDogVCwgLi4uc291cmNlczogVFtdKTogVCB7XG5cdGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VzKSB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc01hcCA9IHRhcmdldCBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cblx0bGV0IGtleXM7XG5cdGlmIChpc09iamVjdCh0YXJnZXRBc01hcCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gc291cmNlO1xuXHRcdH1cblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKS5tYXAoKGspID0+IE51bWJlci5wYXJzZUludChrLCAxMCkpO1xuXHR9XG5cblx0aWYgKGtleXMpIHtcblx0XHRjb25zdCBzb3VyY2VBc01hcCA9IHNvdXJjZSBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlQXNNYXBba2V5XTtcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHRhcmdldCwgLi4uc291cmNlcyk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGZyb20gYSBjb21tYW5kIGxpbmUgc3RyaW5nLlxuICogRXhhbXBsZXMgb2YgY29tbWFuZCBsaW5lIHN0cmluZ3M6IGFyZzEga2V5MT12YWx1ZTEga2V5Mj1cInZhbHVlIHdpdGggc3BhY2VzXCIga2V5Mz0ndmFsdWUzJyBrZXk0PSd2YWx1ZSB3aXRoIG1vcmUgc3BhY2VzJ2AuXG4gKiBAcGFyYW0gY29tbWFuZExpbmUgVGhlIGNvbW1hbmQgbGluZSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBvciBhbiBlbXB0eSBhcnJheSBpZiBub25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tYW5kTGluZUFyZ3MoY29tbWFuZExpbmU6IHN0cmluZyk6IHN0cmluZ1tdIHtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKGNvbW1hbmRMaW5lKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCBtYXRjaGVzID0gY29tbWFuZExpbmUubWF0Y2goLyhcXHcrPSk/KFwiW15cIl0qXCJ8J1teJ10qJ3xbXiBdKykvZyk7XG5cdGlmIChpc0VtcHR5KG1hdGNoZXMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdHJldHVybiBtYXRjaGVzO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRDb250ZXh0UHJvY2Vzc29yRW5kcG9pbnQsXG5cdENvbnRleHRUb1Byb2Nlc3MsXG5cdFByb2Nlc3NlZENvbnRleHRcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlcm9wYnJva2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNTdHJpbmdWYWx1ZSwgb2JqZWN0Q2xvbmUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQ29udGV4dFByb2Nlc3NvclNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogRXhhbXBsZSBjb250ZXh0IHByb2Nlc3NvciBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVDb250ZXh0UHJvY2Vzc29yRW5kcG9pbnQgaW1wbGVtZW50cyBDb250ZXh0UHJvY2Vzc29yRW5kcG9pbnQge1xuXHQvKipcblx0ICogTG9nZ2VkIGZvciBtZXNzYWdlcy5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM/OiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJFeGFtcGxlQ29udGV4dFByb2Nlc3NvckVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUYWtlcyBhIGNvbnRleHQgb2JqZWN0IGFuZCByZXR1cm5zIGFuIGVucmljaGVkIHZlcnNpb24uXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50ICh3aGljaCBpcyBwYXNzZWQgYnkgdGhlIGVuZHBvaW50IHByb3ZpZGVyKS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgY29udGFpbmluZyB0aGUgY29udGV4dCB0byBwcm9jZXNzIHRoYXQgaXMgcGFzc2VkIGJ5IHRoZSBpbnRlcm9wYnJva2VyLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgY29udGFpbmluZyB0aGUgZW5yaWNoZWQgb3Igb3JpZ2luYWwgY29udGV4dCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPENvbnRleHRQcm9jZXNzb3JTZXR0aW5ncz4sXG5cdFx0cmVxdWVzdDogQ29udGV4dFRvUHJvY2Vzc1xuXHQpOiBQcm9taXNlPFByb2Nlc3NlZENvbnRleHQ+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB7IGNvbnRleHQ6IG9iamVjdENsb25lKHJlcXVlc3Q/LmNvbnRleHQpIH07XG5cdFx0fVxuXG5cdFx0Ly8gZGVjb3VwbGUgdGhlIHJlcXVlc3QgZnJvbSB0aGUgcmVzcG9uc2UuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSB7IGNvbnRleHQ6IG9iamVjdENsb25lKHJlcXVlc3Q/LmNvbnRleHQpIH07XG5cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcIlRoaXMgaXMgYW4gZXhhbXBsZSBvZiBhbiBlbmRwb2ludCB0aGF0IGNhbiBwcm9jZXNzIGEgY29udGV4dCBvYmplY3QgdGhhdCB3YXMgcGFzc2VkIHRvIHRoZSBicm9rZXIgYW5kIG5lZWRzIHByb2Nlc3NpbmcuXCJcblx0XHQpO1xuXG5cdFx0aWYgKHJlcXVlc3Q/LmNvbnRleHQ/LnR5cGUgPT09IFwib3JnLmRheW9maW50ZXJlc3RcIikge1xuXHRcdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nQ29udGV4dCkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0YENvbnRleHQgVHlwZSAke3JlcXVlc3QuY29udGV4dC50eXBlfSBtYXRjaGVkLiBJbmNvbWluZyBjb250ZXh0OmAsXG5cdFx0XHRcdFx0cmVxdWVzdC5jb250ZXh0XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBjb250ZXh0SWQgPSByZXF1ZXN0LmNvbnRleHQuaWQ7XG5cdFx0XHRpZiAoY29udGV4dElkICYmICFpc0VtcHR5KGNvbnRleHRJZC5kYXRlKSkge1xuXHRcdFx0XHQvLyB3ZSB3b3VsZCBkbyBtb3JlIHZhbGlkYXRpb24gaW4gYSByZWFsIGFwcFxuXHRcdFx0XHRjb25zdCB0YXJnZXREYXRlID0gbmV3IERhdGUoY29udGV4dElkLmRhdGUpO1xuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoY29udGV4dElkLmRheSkpIHtcblx0XHRcdFx0XHRjb250ZXh0SWQuZGF5ID0gYCR7dGFyZ2V0RGF0ZS5nZXREYXRlKCl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoY29udGV4dElkLm1vbnRoKSkge1xuXHRcdFx0XHRcdGNvbnRleHRJZC5tb250aCA9IGAke3RhcmdldERhdGUuZ2V0TW9udGgoKSArIDF9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoY29udGV4dElkLnllYXIpKSB7XG5cdFx0XHRcdFx0Y29udGV4dElkLnllYXIgPSBgJHt0YXJnZXREYXRlLmdldEZ1bGxZZWFyKCl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoY29udGV4dElkLmVwb2NoKSkge1xuXHRcdFx0XHRcdGNvbnRleHRJZC5lcG9jaCA9IGAke3RhcmdldERhdGUuZ2V0VGltZSgpIC8gMTAwMH1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghaXNTdHJpbmdWYWx1ZShjb250ZXh0SWQudXRjKSkge1xuXHRcdFx0XHRcdGNvbnRleHRJZC51dGMgPSBgJHt0YXJnZXREYXRlLnRvVVRDU3RyaW5nKCl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzU3RyaW5nVmFsdWUoY29udGV4dElkLmlzbykpIHtcblx0XHRcdFx0XHRjb250ZXh0SWQuaXNvID0gYCR7dGFyZ2V0RGF0ZS50b0lTT1N0cmluZygpfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nQ29udGV4dCkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdGBDb250ZXh0IFR5cGUgJHtyZXNwb25zZS5jb250ZXh0LnR5cGV9IG1hdGNoZWQuIFByb2Nlc3NlZCBjb250ZXh0OmAsXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5jb250ZXh0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdGBVbmFibGUgdG8gcHJvY2VzcyAke3JlcXVlc3QuY29udGV4dC50eXBlfSBhcyBpdCBkaWQgbm90IGhhdmUgZGF0ZSBhcyBwYXJ0IG9mIHRoZSBpZGBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQ29udGV4dFByb2Nlc3NvckVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgRXhhbXBsZUNvbnRleHRQcm9jZXNzb3JFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9