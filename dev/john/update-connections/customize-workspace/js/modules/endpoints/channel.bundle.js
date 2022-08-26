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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WCx3RUFBd0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLEVBQy9GLEtBQUssQ0FDTCxDQUFDO1NBQ0Y7UUFDRCxPQUFPLFlBQVksQ0FBQztLQUNwQjtBQUNGLENBQUM7Ozs7Ozs7U0M1SkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xxRDtBQUU5QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLHNDQUFzQjtDQUNoQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzPzogbmV2ZXIpIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRsb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3Rpb24oXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRjaGFubmVsTmFtZTogc3RyaW5nO1xuXHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHR3YWl0PzogYm9vbGVhbjtcblx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdGxvZ1dhcm4/OiBib29sZWFuO1xuXHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0fT4sXG5cdHJlcXVlc3Q/OiB7IHBheWxvYWQ/OiB1bmtub3duIH1cbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgbG9nSW5mbyA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nSW5mbyA/PyB0cnVlO1xuXHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdGlmIChcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0bG9nZ2VyLndhcm4oYFlvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uTmFtZSBhbmQgY2hhbm5lbE5hbWUgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRjb25zdCBjaGFubmVsID0gYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lLCB7XG5cdFx0XHR3YWl0OiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy53YWl0LFxuXHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdH0pO1xuXHRcdGlmIChcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0bG9nZ2VyLmluZm8oYFNlbmRpbmcgYWN0aW9uIGZvciBlbmRwb2ludCBpZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSwgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ0Vycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoXG5cdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0YWN0aW9uTmFtZTogc3RyaW5nO1xuXHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdHV1aWQ/OiBzdHJpbmc7XG5cdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0bG9nRXJyb3I/OiBib29sZWFuO1xuXHRcdGRlZmF1bHQ/OiBcIm9iamVjdFwiIHwgXCJhcnJheVwiO1xuXHR9Pixcblx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuKTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRsZXQgZGVmYXVsdFZhbHVlOiB1bmtub3duID0gbnVsbDtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHQpO1xuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdH1cblx0Y29uc3QgbG9nSW5mbyA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nSW5mbyA/PyB0cnVlO1xuXHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdGlmIChlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmRlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdGRlZmF1bHRWYWx1ZSA9IFtdO1xuXHRcdH0gZWxzZSBpZiAoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuZGVmYXVsdCA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0fVxuXHR9XG5cdGlmIChcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0bG9nZ2VyLndhcm4oYFlvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uTmFtZSBhbmQgY2hhbm5lbE5hbWUgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdHdhaXQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLndhaXQsXG5cdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0fSk7XG5cdFx0aWYgKFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0bG9nZ2VyLmluZm8oYFNlbmRpbmcgcmVxdWVzdCByZXNwb25zZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRjb25zdCByZXNwb25zZTogdW5rbm93biA9IGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSwgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRgRXJyb3IgZXhlY3V0aW5nIHJlcXVlc3QvcmVzcG9uc2UgYW5kIGNvbm5lY3RpbmcgdG8gZW5kcG9pbnQgd2l0aCBpZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCxcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgZW5kcG9pbnRJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0ZW5kcG9pbnQ6IGVuZHBvaW50SW1wbGVtZW50YXRpb25cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=