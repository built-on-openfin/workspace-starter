/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/channel/endpoint.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/endpoints/channel/endpoint.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelEndpoint: () => (/* binding */ ChannelEndpoint)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.actionName) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.channelName)) {
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
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.uuid) &&
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
        if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition?.options?.default)) {
            if (endpointDefinition.options.default === "array") {
                defaultValue = [];
            }
            else if (endpointDefinition.options.default === "object") {
                defaultValue = {};
            }
        }
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.actionName) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.channelName)) {
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
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointDefinition.options.uuid) &&
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
/*!*******************************************************!*\
  !*** ./client/src/modules/endpoints/channel/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/channel/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.ChannelEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLDBDQUEwQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsTUFBTSxRQUFRLEdBQVksTUFBTSxPQUFPLENBQUMsUUFBUSxDQUMvQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUNoQixDQUFDO1lBQ0YsTUFBTSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsT0FBTyxRQUFRLENBQUM7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLElBQUksUUFBUSxFQUFFO2dCQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUNsQix3RUFBd0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLEVBQy9GLEtBQUssQ0FDTCxDQUFDO2FBQ0Y7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUNwQjtJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQ25ORDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBRXRDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxRQUFRLEVBQUUsSUFBSSxzREFBZSxFQUFFO0NBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9jaGFubmVsL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uLCBFbmRwb2ludCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQ2hhbm5lbCBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYW5uZWxFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50IHtcblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQ2hhbm5lbEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYW4gYWN0aW9uIHNlbnQgdG8gdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5jaGFubmVsTmFtZSBUaGUgZW5kcG9pbnQgY2hhbm5lbCBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmFjdGlvbk5hbWUgVGhlIGVuZHBvaW50IGFjdGlvbiBuYW1lLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnBheWxvYWQgVGhlIGVuZHBvaW50IHBheWxvYWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ud2FpdCBXYWl0IGZvciBhIHJlc3BvbnNlLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLnV1aWQgVGhlIGVuZHBvaW50IHV1aWQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nSW5mbyBMb2cgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nV2FybiBMb2cgd2FybmluZ3MuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24ubG9nRXJyb3IgTG9nIGVycm9ycy5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHByb2Nlc3NlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBhY3Rpb24oXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdFx0Y2hhbm5lbE5hbWU6IHN0cmluZztcblx0XHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdFx0d2FpdD86IGJvb2xlYW47XG5cdFx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0XHRsb2dXYXJuPzogYm9vbGVhbjtcblx0XHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYEEgcmVxdWVzdCBpcyByZXF1aXJlZCBmb3IgdGhpcyBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfS4gUmV0dXJuaW5nIGZhbHNlYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gcGVyZm9ybSBhY3Rpb246ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0XHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nRXJyb3IgPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0Vycm9yID8/IHRydWU7XG5cblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lKSB8fFxuXHRcdFx0aXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSlcblx0XHQpIHtcblx0XHRcdGlmIChsb2dXYXJuKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0XHR3YWl0OiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy53YWl0LFxuXHRcdFx0XHRwYXlsb2FkOiBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5wYXlsb2FkXG5cdFx0XHR9KTtcblx0XHRcdGlmIChcblx0XHRcdFx0IWlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCkgJiZcblx0XHRcdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZCAhPT0gY2hhbm5lbC5wcm92aWRlcklkZW50aXR5LnV1aWRcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XHRcdGBFbmRwb2ludCBJZDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGhhcyB0aGUgc291cmNlIHJ1bm5pbmcgKCR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXVpZH0pIGJ1dCB0aGUgcHJvdmlkZXIgb2YgdGhlIGNoYW5uZWw6ICR7ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWV9IGlzIG5vdCBjb21pbmcgZnJvbSB0aGUgc291cmNlLiBSZXR1cm5pbmcgZmFsc2UuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxvZ0luZm8pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTZW5kaW5nIGFjdGlvbiBmb3IgZW5kcG9pbnQgaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRcdGF3YWl0IGNoYW5uZWwuZGlzY29ubmVjdCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdFx0ZXJyb3Jcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uY2hhbm5lbE5hbWUgVGhlIGVuZHBvaW50IGNoYW5uZWwgbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5hY3Rpb25OYW1lIFRoZSBlbmRwb2ludCBhY3Rpb24gbmFtZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi5wYXlsb2FkIFRoZSBlbmRwb2ludCBwYXlsb2FkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLndhaXQgV2FpdCBmb3IgYSByZXNwb25zZS5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbi51dWlkIFRoZSBlbmRwb2ludCB1dWlkLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0luZm8gTG9nIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ1dhcm4gTG9nIHdhcm5pbmdzLlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uLmxvZ0Vycm9yIExvZyBlcnJvcnMuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24uZGVmYXVsdCBUaGUgZGVmYXVsdCBvYmplY3QgdHlwZS5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHBhcmFtIHJlcXVlc3QucGF5bG9hZCBUaGUgcmVxdWVzdCBwYXlsb2FkLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0XHRhY3Rpb25OYW1lOiBzdHJpbmc7XG5cdFx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdFx0dXVpZD86IHN0cmluZztcblx0XHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0XHRsb2dFcnJvcj86IGJvb2xlYW47XG5cdFx0XHRkZWZhdWx0PzogXCJvYmplY3RcIiB8IFwiYXJyYXlcIjtcblx0XHR9Pixcblx0XHRyZXF1ZXN0PzogeyBwYXlsb2FkPzogdW5rbm93biB9XG5cdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGxldCBkZWZhdWx0VmFsdWU6IHVua25vd24gPSBudWxsO1xuXG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHRjb25zdCBsb2dJbmZvID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dJbmZvID8/IHRydWU7XG5cdFx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRcdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8uZGVmYXVsdCkpIHtcblx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5kZWZhdWx0ID09PSBcImFycmF5XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gW107XG5cdFx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUpIHx8XG5cdFx0XHRpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lKVxuXHRcdCkge1xuXHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUsIHtcblx0XHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdFx0cGF5bG9hZDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMucGF5bG9hZFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFpc0VtcHR5KGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQpICYmXG5cdFx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFx0XHRgRW5kcG9pbnQgSWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBoYXMgdGhlIHNvdXJjZSBydW5uaW5nICgke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWR9KSBidXQgdGhlIHByb3ZpZGVyIG9mIHRoZSBjaGFubmVsOiAke2VuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lfSBpcyBub3QgY29taW5nIGZyb20gdGhlIHNvdXJjZS4gUmV0dXJuaW5nIGZhbHNlLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFNlbmRpbmcgcmVxdWVzdCByZXNwb25zZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzcG9uc2U6IHVua25vd24gPSBhd2FpdCBjaGFubmVsLmRpc3BhdGNoKFxuXHRcdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLFxuXHRcdFx0XHRyZXF1ZXN0Py5wYXlsb2FkXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdGBFcnJvciBleGVjdXRpbmcgcmVxdWVzdC9yZXNwb25zZSBhbmQgY29ubmVjdGluZyB0byBlbmRwb2ludCB3aXRoIGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gLFxuXHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgQ2hhbm5lbEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgQ2hhbm5lbEVuZHBvaW50KClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=