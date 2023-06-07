/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/endpoints/example-context-processor/endpoint.ts":
/*!****************************************************************************!*\
  !*** ./client/src/modules/endpoints/example-context-processor/endpoint.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleContextProcessorEndpoint: () => (/* binding */ ExampleContextProcessorEndpoint)
/* harmony export */ });
class ExampleContextProcessorEndpoint {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("ExampleContextProcessorEndpoint");
        this._logger.info("Was passed the following options", definition.data);
    }
    /**
     * Takes a context object and returns an enriched version
     * @param endpointDefinition The definition of the endpoint (which is passed by the endpoint provider).
     * @param request The request containing the context to process that is passed by the interopbroker.
     * @returns The response containing the enriched or original context object.
     */
    async requestResponse(endpointDefinition, request) {
        // decouple the request from the response.
        const response = { context: JSON.parse(JSON.stringify(request?.context)) };
        if (endpointDefinition.type !== "module") {
            this._logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return response;
        }
        this._logger.info("This is an example of an endpoint that can process a context object that was passed to the broker and needs processing.");
        if (request?.context?.type === "org.dayofinterest") {
            if (endpointDefinition?.options?.logContext) {
                this._logger.info(`Context Type ${request.context.type} matched. Incoming context:`, request.context);
            }
            if (request.context.id?.date !== undefined) {
                // we would do more validation in a real app
                const targetDate = new Date(request.context.id.date);
                if (!this.isValid(response.context.id.day)) {
                    response.context.id.day = `${targetDate.getDate()}`;
                }
                if (!this.isValid(response.context.id.month)) {
                    response.context.id.month = `${targetDate.getMonth() + 1}`;
                }
                if (!this.isValid(response.context.id.year)) {
                    response.context.id.year = `${targetDate.getFullYear()}`;
                }
                if (!this.isValid(response.context.id.epoch)) {
                    response.context.id.epoch = `${targetDate.getTime() / 1000}`;
                }
                if (!this.isValid(response.context.id.utc)) {
                    response.context.id.utc = `${targetDate.toUTCString()}`;
                }
                if (!this.isValid(response.context.id.iso)) {
                    response.context.id.iso = `${targetDate.toISOString()}`;
                }
                if (endpointDefinition?.options?.logContext) {
                    this._logger.info(`Context Type ${response.context.type} matched. Processed context:`, response.context);
                }
            }
            else {
                this._logger.warn(`Unable to process ${request.context.type} as it did not have date as part of the id`);
            }
        }
        return response;
    }
    /**
     * Does the id need to be set
     * @param id The property from within the id object.
     */
    isValid(id) {
        return id !== undefined && id !== null && id.trim().length > 0;
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
/*!*************************************************************************!*\
  !*** ./client/src/modules/endpoints/example-context-processor/index.ts ***!
  \*************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/endpoints/example-context-processor/endpoint.ts");

const entryPoints = {
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_0__.ExampleContextProcessorEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFFdEQsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFFBQVEsRUFBRSxJQUFJLHNFQUErQixFQUFFO0NBQy9DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvZXhhbXBsZS1jb250ZXh0LXByb2Nlc3Nvci9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2VuZHBvaW50cy9leGFtcGxlLWNvbnRleHQtcHJvY2Vzc29yL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHtcblx0dHlwZSBDb250ZXh0UHJvY2Vzc29yRW5kcG9pbnQsXG5cdHR5cGUgQ29udGV4dFRvUHJvY2Vzcyxcblx0dHlwZSBQcm9jZXNzZWRDb250ZXh0XG59IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9pbnRlcm9wYnJva2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IHR5cGUgQ29udGV4dFByb2Nlc3NvclNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQ29udGV4dFByb2Nlc3NvckVuZHBvaW50IGltcGxlbWVudHMgQ29udGV4dFByb2Nlc3NvckVuZHBvaW50IHtcblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM/OiBNb2R1bGVIZWxwZXJzXG5cdCkge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkV4YW1wbGVDb250ZXh0UHJvY2Vzc29yRW5kcG9pbnRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRha2VzIGEgY29udGV4dCBvYmplY3QgYW5kIHJldHVybnMgYW4gZW5yaWNoZWQgdmVyc2lvblxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludCAod2hpY2ggaXMgcGFzc2VkIGJ5IHRoZSBlbmRwb2ludCBwcm92aWRlcikuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IGNvbnRhaW5pbmcgdGhlIGNvbnRleHQgdG8gcHJvY2VzcyB0aGF0IGlzIHBhc3NlZCBieSB0aGUgaW50ZXJvcGJyb2tlci5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIGNvbnRhaW5pbmcgdGhlIGVucmljaGVkIG9yIG9yaWdpbmFsIGNvbnRleHQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxDb250ZXh0UHJvY2Vzc29yU2V0dGluZ3M+LFxuXHRcdHJlcXVlc3Q6IENvbnRleHRUb1Byb2Nlc3Ncblx0KTogUHJvbWlzZTxQcm9jZXNzZWRDb250ZXh0PiB7XG5cdFx0Ly8gZGVjb3VwbGUgdGhlIHJlcXVlc3QgZnJvbSB0aGUgcmVzcG9uc2UuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSB7IGNvbnRleHQ6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVxdWVzdD8uY29udGV4dCkpIH07XG5cblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XCJUaGlzIGlzIGFuIGV4YW1wbGUgb2YgYW4gZW5kcG9pbnQgdGhhdCBjYW4gcHJvY2VzcyBhIGNvbnRleHQgb2JqZWN0IHRoYXQgd2FzIHBhc3NlZCB0byB0aGUgYnJva2VyIGFuZCBuZWVkcyBwcm9jZXNzaW5nLlwiXG5cdFx0KTtcblxuXHRcdGlmIChyZXF1ZXN0Py5jb250ZXh0Py50eXBlID09PSBcIm9yZy5kYXlvZmludGVyZXN0XCIpIHtcblx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0NvbnRleHQpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYENvbnRleHQgVHlwZSAke3JlcXVlc3QuY29udGV4dC50eXBlfSBtYXRjaGVkLiBJbmNvbWluZyBjb250ZXh0OmAsIHJlcXVlc3QuY29udGV4dCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocmVxdWVzdC5jb250ZXh0LmlkPy5kYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gd2Ugd291bGQgZG8gbW9yZSB2YWxpZGF0aW9uIGluIGEgcmVhbCBhcHBcblx0XHRcdFx0Y29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHJlcXVlc3QuY29udGV4dC5pZC5kYXRlKTtcblx0XHRcdFx0aWYgKCF0aGlzLmlzVmFsaWQocmVzcG9uc2UuY29udGV4dC5pZC5kYXkpKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuY29udGV4dC5pZC5kYXkgPSBgJHt0YXJnZXREYXRlLmdldERhdGUoKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghdGhpcy5pc1ZhbGlkKHJlc3BvbnNlLmNvbnRleHQuaWQubW9udGgpKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuY29udGV4dC5pZC5tb250aCA9IGAke3RhcmdldERhdGUuZ2V0TW9udGgoKSArIDF9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRoaXMuaXNWYWxpZChyZXNwb25zZS5jb250ZXh0LmlkLnllYXIpKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuY29udGV4dC5pZC55ZWFyID0gYCR7dGFyZ2V0RGF0ZS5nZXRGdWxsWWVhcigpfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCF0aGlzLmlzVmFsaWQocmVzcG9uc2UuY29udGV4dC5pZC5lcG9jaCkpIHtcblx0XHRcdFx0XHRyZXNwb25zZS5jb250ZXh0LmlkLmVwb2NoID0gYCR7dGFyZ2V0RGF0ZS5nZXRUaW1lKCkgLyAxMDAwfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCF0aGlzLmlzVmFsaWQocmVzcG9uc2UuY29udGV4dC5pZC51dGMpKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuY29udGV4dC5pZC51dGMgPSBgJHt0YXJnZXREYXRlLnRvVVRDU3RyaW5nKCl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRoaXMuaXNWYWxpZChyZXNwb25zZS5jb250ZXh0LmlkLmlzbykpIHtcblx0XHRcdFx0XHRyZXNwb25zZS5jb250ZXh0LmlkLmlzbyA9IGAke3RhcmdldERhdGUudG9JU09TdHJpbmcoKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0NvbnRleHQpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdGBDb250ZXh0IFR5cGUgJHtyZXNwb25zZS5jb250ZXh0LnR5cGV9IG1hdGNoZWQuIFByb2Nlc3NlZCBjb250ZXh0OmAsXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5jb250ZXh0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0YFVuYWJsZSB0byBwcm9jZXNzICR7cmVxdWVzdC5jb250ZXh0LnR5cGV9IGFzIGl0IGRpZCBub3QgaGF2ZSBkYXRlIGFzIHBhcnQgb2YgdGhlIGlkYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogRG9lcyB0aGUgaWQgbmVlZCB0byBiZSBzZXRcblx0ICogQHBhcmFtIGlkIFRoZSBwcm9wZXJ0eSBmcm9tIHdpdGhpbiB0aGUgaWQgb2JqZWN0LlxuXHQgKi9cblx0cHJpdmF0ZSBpc1ZhbGlkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gaWQgIT09IHVuZGVmaW5lZCAmJiBpZCAhPT0gbnVsbCAmJiBpZC50cmltKCkubGVuZ3RoID4gMDtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQ29udGV4dFByb2Nlc3NvckVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGVuZHBvaW50OiBuZXcgRXhhbXBsZUNvbnRleHRQcm9jZXNzb3JFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9