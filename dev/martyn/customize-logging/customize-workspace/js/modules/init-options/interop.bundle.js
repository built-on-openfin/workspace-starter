/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/init-options/interop/action-handler.ts":
/*!*******************************************************************!*\
  !*** ./client/src/modules/init-options/interop/action-handler.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
const LOGGER_GROUP = "InitOptionsInteropHandler";
let logger;
async function raiseIntent(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    logger.info(LOGGER_GROUP, `Received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
    await brokerClient.fireIntent(payload);
}
async function shareContext(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    const contextGroups = await brokerClient.getContextGroups();
    const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
    if (targetContextGroup !== undefined) {
        await brokerClient.joinContextGroup(targetContextGroup.id);
        logger.info(LOGGER_GROUP, `Received context to send. Context Group ${targetContextGroup.id}. Context: ${JSON.stringify(payload.context, null, 4)}`);
        await brokerClient.setContext(payload.context);
    }
}
async function init(options, log) {
    logger = log;
    // the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
    logger.info(LOGGER_GROUP, "The handler has been loaded");
}
async function action(requestedAction, payload) {
    if (payload === undefined) {
        logger.warn(LOGGER_GROUP, `Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
        return;
    }
    try {
        switch (requestedAction) {
            case "raise-intent": {
                await raiseIntent(payload);
                break;
            }
            case "share-context": {
                await shareContext(payload);
                break;
            }
        }
    }
    catch (error) {
        logger.error(LOGGER_GROUP, `Error trying to perform action ${requestedAction}.`, error);
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
/*!**********************************************************!*\
  !*** ./client/src/modules/init-options/interop/index.ts ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handler": () => (/* reexport module object */ _action_handler__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _action_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action-handler */ "./client/src/modules/init-options/interop/action-handler.ts");


})();

var __webpack_exports__handler = __webpack_exports__.handler;
export { __webpack_exports__handler as handler };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjRDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW5pdC1vcHRpb25zL2ludGVyb3AvYWN0aW9uLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvaW50ZXJvcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5cbmNvbnN0IExPR0dFUl9HUk9VUCA9IFwiSW5pdE9wdGlvbnNJbnRlcm9wSGFuZGxlclwiO1xuXG5pbnRlcmZhY2UgUmFpc2VJbnRlbnRQYXlsb2FkIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjb250ZXh0OiBPcGVuRmluLkNvbnRleHQ7XG59XG5cbmludGVyZmFjZSBTaGFyZUNvbnRleHRQYXlsb2FkIHtcblx0Y29udGV4dEdyb3VwOiBzdHJpbmc7XG5cdGNvbnRleHQ6IE9wZW5GaW4uQ29udGV4dDtcbn1cblxubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5hc3luYyBmdW5jdGlvbiByYWlzZUludGVudChwYXlsb2FkOiBSYWlzZUludGVudFBheWxvYWQpIHtcblx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0bG9nZ2VyLmluZm8oTE9HR0VSX0dST1VQLCBgUmVjZWl2ZWQgaW50ZW50IHRvIHJhaXNlLiBJbnRlbnQgUmVxdWVzdCAke0pTT04uc3RyaW5naWZ5KHBheWxvYWQsIG51bGwsIDQpfS5gKTtcblx0YXdhaXQgYnJva2VyQ2xpZW50LmZpcmVJbnRlbnQocGF5bG9hZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNoYXJlQ29udGV4dChwYXlsb2FkOiBTaGFyZUNvbnRleHRQYXlsb2FkKSB7XG5cdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdGNvbnN0IGNvbnRleHRHcm91cHMgPSBhd2FpdCBicm9rZXJDbGllbnQuZ2V0Q29udGV4dEdyb3VwcygpO1xuXHRjb25zdCB0YXJnZXRDb250ZXh0R3JvdXAgPSBjb250ZXh0R3JvdXBzLmZpbmQoKGdyb3VwKSA9PiBncm91cC5pZCA9PT0gcGF5bG9hZC5jb250ZXh0R3JvdXApO1xuXHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwICE9PSB1bmRlZmluZWQpIHtcblx0XHRhd2FpdCBicm9rZXJDbGllbnQuam9pbkNvbnRleHRHcm91cCh0YXJnZXRDb250ZXh0R3JvdXAuaWQpO1xuXHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0TE9HR0VSX0dST1VQLFxuXHRcdFx0YFJlY2VpdmVkIGNvbnRleHQgdG8gc2VuZC4gQ29udGV4dCBHcm91cCAke3RhcmdldENvbnRleHRHcm91cC5pZH0uIENvbnRleHQ6ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRcdHBheWxvYWQuY29udGV4dCxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0NFxuXHRcdFx0KX1gXG5cdFx0KTtcblx0XHRhd2FpdCBicm9rZXJDbGllbnQuc2V0Q29udGV4dChwYXlsb2FkLmNvbnRleHQpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KG9wdGlvbnM6IHVua25vd24sIGxvZzogTG9nZ2VyKSB7XG5cdGxvZ2dlciA9IGxvZztcblx0Ly8gdGhlIGluaXQgZnVuY3Rpb24gY291bGQgYmUgcGFzc2VkIGxpbWl0cyAoZS5nLiBvbmx5IHN1cHBvcnQgdGhlIGZvbGxvd2luZyBpbnRlbnRzIG9yIGNvbnRleHRzLiBPbmx5IHB1Ymxpc2ggdG8gdGhlIGZvbGxvd2luZyBjb250ZXh0IGdyb3VwcyBldGMuKVxuXHRsb2dnZXIuaW5mbyhMT0dHRVJfR1JPVVAsIFwiVGhlIGhhbmRsZXIgaGFzIGJlZW4gbG9hZGVkXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRyZXF1ZXN0ZWRBY3Rpb246IHN0cmluZyxcblx0cGF5bG9hZD86IFJhaXNlSW50ZW50UGF5bG9hZCB8IFNoYXJlQ29udGV4dFBheWxvYWRcbik6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAocGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRMT0dHRVJfR1JPVVAsXG5cdFx0XHRgQWN0aW9ucyBwYXNzZWQgdG8gdGhlIG1vZHVsZSByZXF1aXJlIGEgcGF5bG9hZCB0byBiZSBwYXNzZWQuIFJlcXVlc3RlZCBhY3Rpb246ICR7cmVxdWVzdGVkQWN0aW9ufSBjYW4gbm90IGJlIGZ1bGZpbGxlZC5gXG5cdFx0KTtcblx0XHRyZXR1cm47XG5cdH1cblx0dHJ5IHtcblx0XHRzd2l0Y2ggKHJlcXVlc3RlZEFjdGlvbikge1xuXHRcdFx0Y2FzZSBcInJhaXNlLWludGVudFwiOiB7XG5cdFx0XHRcdGF3YWl0IHJhaXNlSW50ZW50KHBheWxvYWQgYXMgUmFpc2VJbnRlbnRQYXlsb2FkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwic2hhcmUtY29udGV4dFwiOiB7XG5cdFx0XHRcdGF3YWl0IHNoYXJlQ29udGV4dChwYXlsb2FkIGFzIFNoYXJlQ29udGV4dFBheWxvYWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyLmVycm9yKExPR0dFUl9HUk9VUCwgYEVycm9yIHRyeWluZyB0byBwZXJmb3JtIGFjdGlvbiAke3JlcXVlc3RlZEFjdGlvbn0uYCwgZXJyb3IpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGFzIGhhbmRsZXIgZnJvbSBcIi4vYWN0aW9uLWhhbmRsZXJcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==