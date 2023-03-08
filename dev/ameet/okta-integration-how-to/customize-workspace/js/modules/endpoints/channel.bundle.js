/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/channel/endpoint.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/endpoints/channel/endpoint.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChannelEndpoint": () => (/* binding */ ChannelEndpoint)
/* harmony export */ });
class ChannelEndpoint {
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("ChannelEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Handle an action sent to the endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns True if processed.
     */
    async action(endpointDefinition, request) {
        if (request === undefined) {
            this._logger.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
            return false;
        }
        if (endpointDefinition.type !== "module") {
            this._logger.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
            return false;
        }
        const logInfo = endpointDefinition?.options?.logInfo ?? true;
        const logWarn = endpointDefinition?.options?.logWarn ?? true;
        const logError = endpointDefinition?.options?.logError ?? true;
        if (endpointDefinition.options === undefined ||
            endpointDefinition.options.actionName === undefined ||
            endpointDefinition.options.channelName === undefined) {
            if (logWarn) {
                this._logger.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
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
                    this._logger.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
                }
                return false;
            }
            if (logInfo) {
                this._logger.info(`Sending action for endpoint id: ${endpointDefinition.id}`);
            }
            await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
            await channel.disconnect();
            return true;
        }
        catch (error) {
            if (logError) {
                this._logger.error(`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`, error);
            }
            return false;
        }
    }
    /**
     * Handle a request response on an endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        let defaultValue = null;
        if (endpointDefinition.type !== "module") {
            this._logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
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
                this._logger.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
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
                    this._logger.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
                }
                return defaultValue;
            }
            if (logInfo) {
                this._logger.info(`Sending request response for endpoint: ${endpointDefinition.id}`);
            }
            const response = await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
            await channel.disconnect();
            return response;
        }
        catch (error) {
            if (logError) {
                this._logger.error(`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`, error);
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
/*!*******************************************************!*\
  !*** ./client/src/modules/endpoints/channel/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/channel/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.ChannelEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxDQUMvQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBb0IsRUFDL0MsT0FBTyxFQUFFLE9BQU8sQ0FDaEIsQ0FBQztZQUNGLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzNCLE9BQU8sUUFBUSxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixJQUFJLFFBQVEsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDakIsd0VBQXdFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUMvRixLQUFLLENBQ0wsQ0FBQzthQUNGO1lBQ0QsT0FBTyxZQUFZLENBQUM7U0FDcEI7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0M5TEQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUV0QyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsUUFBUSxFQUFFLElBQUksc0RBQWUsRUFBRTtDQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiwgRW5kcG9pbnQgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbEVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQge1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbiwgY3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLCBoZWxwZXJzOiBNb2R1bGVIZWxwZXJzKSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYW4gYWN0aW9uIHNlbnQgdG8gdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBwcm9jZXNzZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgYWN0aW9uKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdFx0dXVpZD86IHN0cmluZztcblx0XHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0fT4sXG5cdFx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihgQSByZXF1ZXN0IGlzIHJlcXVpcmVkIGZvciB0aGlzIGFjdGlvbjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9LiBSZXR1cm5pbmcgZmFsc2VgKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdFx0aWYgKFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSA9PT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XHRgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgYXMgc3RyaW5nLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTZW5kaW5nIGFjdGlvbiBmb3IgZW5kcG9pbnQgaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lIGFzIHN0cmluZywgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIFRoZSByZXNwb25zZSB0byB0aGUgcmVxdWVzdCwgb3IgbnVsbCBvZiBub3QgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZXF1ZXN0UmVzcG9uc2UoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0XHRcdGRlZmF1bHQ/OiBcIm9iamVjdFwiIHwgXCJhcnJheVwiO1xuXHRcdH0+LFxuXHRcdHJlcXVlc3Q/OiB7IHBheWxvYWQ/OiB1bmtub3duIH1cblx0KTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRcdGxldCBkZWZhdWx0VmFsdWU6IHVua25vd24gPSBudWxsO1xuXG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHRcdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0XHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5kZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gW107XG5cdFx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0YFlvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uTmFtZSBhbmQgY2hhbm5lbE5hbWUgZm9yIGVuZHBvaW50OiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgYXMgc3RyaW5nLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSBjaGFubmVsLnByb3ZpZGVySWRlbnRpdHkudXVpZFxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU2VuZGluZyByZXF1ZXN0IHJlc3BvbnNlIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXNwb25zZTogdW5rbm93biA9IGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgYXMgc3RyaW5nLFxuXHRcdFx0XHRyZXF1ZXN0Py5wYXlsb2FkXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXG5cdFx0XHRcdFx0YEVycm9yIGV4ZWN1dGluZyByZXF1ZXN0L3Jlc3BvbnNlIGFuZCBjb25uZWN0aW5nIHRvIGVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IENoYW5uZWxFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRlbmRwb2ludDogbmV3IENoYW5uZWxFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9