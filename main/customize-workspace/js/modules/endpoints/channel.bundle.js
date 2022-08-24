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
async function init(options, loggerCreator) {
    logger = loggerCreator("ChannelEndpoint");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsRUFBRSxFQUMvRixLQUFLLENBQ0wsQ0FBQztTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7S0FDcEI7QUFDRixDQUFDOzs7Ozs7O1NDM0pEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOdUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvY2hhbm5lbC9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9jaGFubmVsL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyLXNoYXBlc1wiO1xuXG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KG9wdGlvbnM6IHVua25vd24sIGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IpOiBQcm9taXNlPHZvaWQ+IHtcblx0bG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkNoYW5uZWxFbmRwb2ludFwiKTtcblx0bG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0YWN0aW9uTmFtZTogc3RyaW5nO1xuXHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdHV1aWQ/OiBzdHJpbmc7XG5cdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0bG9nRXJyb3I/OiBib29sZWFuO1xuXHR9Pixcblx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGlmIChyZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIud2FybihgQSByZXF1ZXN0IGlzIHJlcXVpcmVkIGZvciB0aGlzIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgZmFsc2VgKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gcGVyZm9ybSBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdGNvbnN0IGxvZ1dhcm4gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ1dhcm4gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0aWYgKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lID09PSB1bmRlZmluZWQgfHxcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSA9PT0gdW5kZWZpbmVkXG5cdCkge1xuXHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRsb2dnZXIud2FybihgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR0cnkge1xuXHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdHdhaXQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLndhaXQsXG5cdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0fSk7XG5cdFx0aWYgKFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyhgU2VuZGluZyBhY3Rpb24gZm9yIGVuZHBvaW50IGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdGxvZ2dlci5lcnJvcihcblx0XHRcdFx0YEVycm9yIGV4ZWN1dGluZy9vciBjb25uZWN0aW5nIHRvIGFjdGlvbi4gRW5kcG9pbnQgd2l0aCBpZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCxcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0cGF5bG9hZD86IHVua25vd247XG5cdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0dXVpZD86IHN0cmluZztcblx0XHRsb2dJbmZvPzogYm9vbGVhbjtcblx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0ZGVmYXVsdD86IFwib2JqZWN0XCIgfCBcImFycmF5XCI7XG5cdH0+LFxuXHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPHVua25vd24gfCBudWxsPiB7XG5cdGxldCBkZWZhdWx0VmFsdWU6IHVua25vd24gPSBudWxsO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0fVxuXHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdGNvbnN0IGxvZ1dhcm4gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ1dhcm4gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwiYXJyYXlcIikge1xuXHRcdFx0ZGVmYXVsdFZhbHVlID0gW107XG5cdFx0fSBlbHNlIGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRkZWZhdWx0VmFsdWUgPSB7fTtcblx0XHR9XG5cdH1cblx0aWYgKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lID09PSB1bmRlZmluZWQgfHxcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSA9PT0gdW5kZWZpbmVkXG5cdCkge1xuXHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRsb2dnZXIud2FybihgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHR9KTtcblx0XHRpZiAoXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyhgU2VuZGluZyByZXF1ZXN0IHJlc3BvbnNlIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdGNvbnN0IHJlc3BvbnNlOiB1bmtub3duID0gYXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ0Vycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoXG5cdFx0XHRcdGBFcnJvciBleGVjdXRpbmcgcmVxdWVzdC9yZXNwb25zZSBhbmQgY29ubmVjdGluZyB0byBlbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRlcnJvclxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBhcyBlbmRwb2ludCBmcm9tIFwiLi9lbmRwb2ludFwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9