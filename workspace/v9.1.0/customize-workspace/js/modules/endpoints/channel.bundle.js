/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/channel/endpoint.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/endpoints/channel/endpoint.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
let logger;
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("ChannelEndpoint");
    logger.info("Was passed the following options", definition.data);
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/channel/endpoint.ts");

const entryPoints = {
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEtBQUssQ0FDWCx3RUFBd0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLEVBQy9GLEtBQUssQ0FDTCxDQUFDO1NBQ0Y7UUFDRCxPQUFPLFlBQVksQ0FBQztLQUNwQjtBQUNGLENBQUM7Ozs7Ozs7U0N6S0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xxRDtBQUU5QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLHNDQUFzQjtDQUNoQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoXG5cdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuKSB7XG5cdGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkNoYW5uZWxFbmRwb2ludFwiKTtcblx0bG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjx7XG5cdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0cGF5bG9hZD86IHVua25vd247XG5cdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0dXVpZD86IHN0cmluZztcblx0XHRsb2dJbmZvPzogYm9vbGVhbjtcblx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdH0+LFxuXHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKHJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZWApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBwZXJmb3JtIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRjb25zdCBsb2dFcnJvciA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nRXJyb3IgPz8gdHJ1ZTtcblxuXHRpZiAoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdGxvZ2dlci53YXJuKGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lIGFzIHN0cmluZyxcblx0XHRcdHtcblx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0aWYgKFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyhgU2VuZGluZyBhY3Rpb24gZm9yIGVuZHBvaW50IGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lIGFzIHN0cmluZywgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ0Vycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoXG5cdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0YWN0aW9uTmFtZTogc3RyaW5nO1xuXHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdHV1aWQ/OiBzdHJpbmc7XG5cdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0bG9nRXJyb3I/OiBib29sZWFuO1xuXHRcdGRlZmF1bHQ/OiBcIm9iamVjdFwiIHwgXCJhcnJheVwiO1xuXHR9Pixcblx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuKTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRsZXQgZGVmYXVsdFZhbHVlOiB1bmtub3duID0gbnVsbDtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdH1cblx0Y29uc3QgbG9nSW5mbyA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nSW5mbyA/PyB0cnVlO1xuXHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmRlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdGRlZmF1bHRWYWx1ZSA9IFtdO1xuXHRcdH0gZWxzZSBpZiAoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuZGVmYXVsdCA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0fVxuXHR9XG5cdGlmIChcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0bG9nZ2VyLndhcm4oYFlvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uTmFtZSBhbmQgY2hhbm5lbE5hbWUgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSBhcyBzdHJpbmcsXG5cdFx0XHR7XG5cdFx0XHRcdHdhaXQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLndhaXQsXG5cdFx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHRcdH1cblx0XHQpO1xuXHRcdGlmIChcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdGxvZ2dlci5pbmZvKGBTZW5kaW5nIHJlcXVlc3QgcmVzcG9uc2UgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0Y29uc3QgcmVzcG9uc2U6IHVua25vd24gPSBhd2FpdCBjaGFubmVsLmRpc3BhdGNoKFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSBhcyBzdHJpbmcsXG5cdFx0XHRyZXF1ZXN0Py5wYXlsb2FkXG5cdFx0KTtcblx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ0Vycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoXG5cdFx0XHRcdGBFcnJvciBleGVjdXRpbmcgcmVxdWVzdC9yZXNwb25zZSBhbmQgY29ubmVjdGluZyB0byBlbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRlcnJvclxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgKiBhcyBlbmRwb2ludEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogZW5kcG9pbnRJbXBsZW1lbnRhdGlvblxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==