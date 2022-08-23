/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/channel/endpoint.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/endpoints/channel/endpoint.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
let logger;
async function init(options, groupLoggerCreator) {
    logger = groupLoggerCreator("ChannelEndpoint");
    logger.info("Was passed the following options", options);
}
async function action(endpointDefinition, request) {
    if (request === undefined) {
        logger.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
        return false;
    }
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
        return false;
    }
    const logInfo = endpointDefinition?.options?.logInfo ?? true;
    const logWarn = endpointDefinition?.options?.logWarn ?? true;
    const logError = endpointDefinition?.options?.logError ?? true;
    if (endpointDefinition.options === undefined ||
        endpointDefinition.options.actionName === undefined ||
        endpointDefinition.options.channelName === undefined) {
        if (logWarn) {
            logger.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
        }
        return false;
    }
    try {
        const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
            wait: endpointDefinition.options.wait,
            payload: endpointDefinition.options.payload
        });
        if (endpointDefinition.options.uuid !== undefined &&
            endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
            if (logWarn) {
                logger.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
            }
            return false;
        }
        if (logInfo) {
            logger.info(`Sending action for endpoint id: ${endpointDefinition.id}`);
        }
        await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
        await channel.disconnect();
        return true;
    }
    catch (error) {
        if (logError) {
            logger.error(`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`, error);
        }
        return false;
    }
}
async function requestResponse(endpointDefinition, request) {
    let defaultValue = null;
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return defaultValue;
    }
    const logInfo = endpointDefinition?.options?.logInfo ?? true;
    const logWarn = endpointDefinition?.options?.logWarn ?? true;
    const logError = endpointDefinition?.options?.logError ?? true;
    if (endpointDefinition?.options?.default !== undefined) {
        if (endpointDefinition.options.default === "array") {
            defaultValue = [];
        }
        else if (endpointDefinition.options.default === "object") {
            defaultValue = {};
        }
    }
    if (endpointDefinition.options === undefined ||
        endpointDefinition.options.actionName === undefined ||
        endpointDefinition.options.channelName === undefined) {
        if (logWarn) {
            logger.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
        }
        return defaultValue;
    }
    try {
        const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
            wait: endpointDefinition.options.wait,
            payload: endpointDefinition.options.payload
        });
        if (endpointDefinition.options.uuid !== undefined &&
            endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
            if (logWarn) {
                logger.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
            }
            return defaultValue;
        }
        if (logInfo) {
            logger.info(`Sending request response for endpoint: ${endpointDefinition.id}`);
        }
        const response = await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
        await channel.disconnect();
        return response;
    }
    catch (error) {
        if (logError) {
            logger.error(`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`, error);
        }
        return defaultValue;
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
/*!*******************************************************!*\
  !*** ./client/src/modules/endpoints/channel/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "endpoint": () => (/* reexport module object */ _endpoint__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/channel/endpoint.ts");


})();

var __webpack_exports__endpoint = __webpack_exports__.endpoint;
export { __webpack_exports__endpoint as endpoint };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsRUFBRSxFQUFFLEVBQy9GLEtBQUssQ0FDTCxDQUFDO1NBQ0Y7UUFDRCxPQUFPLFlBQVksQ0FBQztLQUNwQjtBQUNGLENBQUM7Ozs7Ozs7U0MzSkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ051QyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9jaGFubmVsL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEdyb3VwTG9nZ2VyLCBHcm91cExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBHcm91cExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQob3B0aW9uczogdW5rbm93biwgZ3JvdXBMb2dnZXJDcmVhdG9yOiBHcm91cExvZ2dlckNyZWF0b3IpOiBQcm9taXNlPHZvaWQ+IHtcblx0bG9nZ2VyID0gZ3JvdXBMb2dnZXJDcmVhdG9yKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0cGF5bG9hZD86IHVua25vd247XG5cdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0dXVpZD86IHN0cmluZztcblx0XHRsb2dJbmZvPzogYm9vbGVhbjtcblx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdH0+LFxuXHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBwZXJmb3JtIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRjb25zdCBsb2dFcnJvciA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nRXJyb3IgPz8gdHJ1ZTtcblxuXHRpZiAoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdGxvZ2dlci53YXJuKGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHR9KTtcblx0XHRpZiAoXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdGxvZ2dlci5pbmZvKGBTZW5kaW5nIGFjdGlvbiBmb3IgZW5kcG9pbnQgaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRhd2FpdCBjaGFubmVsLmRpc3BhdGNoKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUsIHJlcXVlc3Q/LnBheWxvYWQpO1xuXHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRgRXJyb3IgZXhlY3V0aW5nL29yIGNvbm5lY3RpbmcgdG8gYWN0aW9uLiBFbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRlcnJvclxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRjaGFubmVsTmFtZTogc3RyaW5nO1xuXHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHR3YWl0PzogYm9vbGVhbjtcblx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdGxvZ1dhcm4/OiBib29sZWFuO1xuXHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0XHRkZWZhdWx0PzogXCJvYmplY3RcIiB8IFwiYXJyYXlcIjtcblx0fT4sXG5cdHJlcXVlc3Q/OiB7IHBheWxvYWQ/OiB1bmtub3duIH1cbik6IFByb21pc2U8dW5rbm93biB8IG51bGw+IHtcblx0bGV0IGRlZmF1bHRWYWx1ZTogdW5rbm93biA9IG51bGw7XG5cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG5cdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRjb25zdCBsb2dFcnJvciA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nRXJyb3IgPz8gdHJ1ZTtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5kZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuZGVmYXVsdCA9PT0gXCJhcnJheVwiKSB7XG5cdFx0XHRkZWZhdWx0VmFsdWUgPSBbXTtcblx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdGRlZmF1bHRWYWx1ZSA9IHt9O1xuXHRcdH1cblx0fVxuXHRpZiAoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdGxvZ2dlci53YXJuKGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdH1cblx0dHJ5IHtcblx0XHRjb25zdCBjaGFubmVsID0gYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lLCB7XG5cdFx0XHR3YWl0OiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy53YWl0LFxuXHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdH0pO1xuXHRcdGlmIChcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdGxvZ2dlci5pbmZvKGBTZW5kaW5nIHJlcXVlc3QgcmVzcG9uc2UgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0Y29uc3QgcmVzcG9uc2U6IHVua25vd24gPSBhd2FpdCBjaGFubmVsLmRpc3BhdGNoKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUsIHJlcXVlc3Q/LnBheWxvYWQpO1xuXHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdHJldHVybiByZXNwb25zZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdGxvZ2dlci5lcnJvcihcblx0XHRcdFx0YEVycm9yIGV4ZWN1dGluZyByZXF1ZXN0L3Jlc3BvbnNlIGFuZCBjb25uZWN0aW5nIHRvIGVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGFzIGVuZHBvaW50IGZyb20gXCIuL2VuZHBvaW50XCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=