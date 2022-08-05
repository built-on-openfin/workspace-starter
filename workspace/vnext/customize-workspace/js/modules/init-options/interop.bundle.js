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
async function raiseIntent(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    console.log(`init options interop handler: received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
    await brokerClient.fireIntent(payload);
}
async function shareContext(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    const contextGroups = await brokerClient.getContextGroups();
    const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
    if (targetContextGroup !== undefined) {
        await brokerClient.joinContextGroup(targetContextGroup.id);
        console.log(`init options interop handler: received context to send. Context Group ${targetContextGroup.id}. Context: ${JSON.stringify(payload.context, null, 4)}`);
        await brokerClient.setContext(payload.context);
    }
}
async function init() {
    // the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
    console.log(`init options interop handler: The interop init options action handler has been loaded`);
}
async function action(requestedAction, payload) {
    if (payload === undefined) {
        console.warn(`init options interop handler: Actions passed to the interop init options module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
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
        console.error(`init options interop handler: Error trying to perform action ${requestedAction}.`, error);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW5pdC1vcHRpb25zL2ludGVyb3AvYWN0aW9uLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvaW50ZXJvcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgUmFpc2VJbnRlbnRQYXlsb2FkIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjb250ZXh0OiBPcGVuRmluLkNvbnRleHQ7XG59XG5cbmludGVyZmFjZSBTaGFyZUNvbnRleHRQYXlsb2FkIHtcblx0Y29udGV4dEdyb3VwOiBzdHJpbmc7XG5cdGNvbnRleHQ6IE9wZW5GaW4uQ29udGV4dDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmFpc2VJbnRlbnQocGF5bG9hZDogUmFpc2VJbnRlbnRQYXlsb2FkKSB7XG5cdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdGNvbnNvbGUubG9nKFxuXHRcdGBpbml0IG9wdGlvbnMgaW50ZXJvcCBoYW5kbGVyOiByZWNlaXZlZCBpbnRlbnQgdG8gcmFpc2UuIEludGVudCBSZXF1ZXN0ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRwYXlsb2FkLFxuXHRcdFx0bnVsbCxcblx0XHRcdDRcblx0XHQpfS5gXG5cdCk7XG5cdGF3YWl0IGJyb2tlckNsaWVudC5maXJlSW50ZW50KHBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaGFyZUNvbnRleHQocGF5bG9hZDogU2hhcmVDb250ZXh0UGF5bG9hZCkge1xuXHRjb25zdCBicm9rZXJDbGllbnQgPSBmaW4uSW50ZXJvcC5jb25uZWN0U3luYyhmaW4ubWUuaWRlbnRpdHkudXVpZCwge30pO1xuXHRjb25zdCBjb250ZXh0R3JvdXBzID0gYXdhaXQgYnJva2VyQ2xpZW50LmdldENvbnRleHRHcm91cHMoKTtcblx0Y29uc3QgdGFyZ2V0Q29udGV4dEdyb3VwID0gY29udGV4dEdyb3Vwcy5maW5kKChncm91cCkgPT4gZ3JvdXAuaWQgPT09IHBheWxvYWQuY29udGV4dEdyb3VwKTtcblx0aWYgKHRhcmdldENvbnRleHRHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0YXdhaXQgYnJva2VyQ2xpZW50LmpvaW5Db250ZXh0R3JvdXAodGFyZ2V0Q29udGV4dEdyb3VwLmlkKTtcblx0XHRjb25zb2xlLmxvZyhcblx0XHRcdGBpbml0IG9wdGlvbnMgaW50ZXJvcCBoYW5kbGVyOiByZWNlaXZlZCBjb250ZXh0IHRvIHNlbmQuIENvbnRleHQgR3JvdXAgJHtcblx0XHRcdFx0dGFyZ2V0Q29udGV4dEdyb3VwLmlkXG5cdFx0XHR9LiBDb250ZXh0OiAke0pTT04uc3RyaW5naWZ5KHBheWxvYWQuY29udGV4dCwgbnVsbCwgNCl9YFxuXHRcdCk7XG5cdFx0YXdhaXQgYnJva2VyQ2xpZW50LnNldENvbnRleHQocGF5bG9hZC5jb250ZXh0KTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcblx0Ly8gdGhlIGluaXQgZnVuY3Rpb24gY291bGQgYmUgcGFzc2VkIGxpbWl0cyAoZS5nLiBvbmx5IHN1cHBvcnQgdGhlIGZvbGxvd2luZyBpbnRlbnRzIG9yIGNvbnRleHRzLiBPbmx5IHB1Ymxpc2ggdG8gdGhlIGZvbGxvd2luZyBjb250ZXh0IGdyb3VwcyBldGMuKVxuXHRjb25zb2xlLmxvZyhgaW5pdCBvcHRpb25zIGludGVyb3AgaGFuZGxlcjogVGhlIGludGVyb3AgaW5pdCBvcHRpb25zIGFjdGlvbiBoYW5kbGVyIGhhcyBiZWVuIGxvYWRlZGApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKFxuXHRyZXF1ZXN0ZWRBY3Rpb246IHN0cmluZyxcblx0cGF5bG9hZD86IFJhaXNlSW50ZW50UGF5bG9hZCB8IFNoYXJlQ29udGV4dFBheWxvYWRcbik6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAocGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YGluaXQgb3B0aW9ucyBpbnRlcm9wIGhhbmRsZXI6IEFjdGlvbnMgcGFzc2VkIHRvIHRoZSBpbnRlcm9wIGluaXQgb3B0aW9ucyBtb2R1bGUgcmVxdWlyZSBhIHBheWxvYWQgdG8gYmUgcGFzc2VkLiBSZXF1ZXN0ZWQgYWN0aW9uOiAke3JlcXVlc3RlZEFjdGlvbn0gY2FuIG5vdCBiZSBmdWxmaWxsZWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0c3dpdGNoIChyZXF1ZXN0ZWRBY3Rpb24pIHtcblx0XHRcdGNhc2UgXCJyYWlzZS1pbnRlbnRcIjoge1xuXHRcdFx0XHRhd2FpdCByYWlzZUludGVudChwYXlsb2FkIGFzIFJhaXNlSW50ZW50UGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNoYXJlLWNvbnRleHRcIjoge1xuXHRcdFx0XHRhd2FpdCBzaGFyZUNvbnRleHQocGF5bG9hZCBhcyBTaGFyZUNvbnRleHRQYXlsb2FkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGluaXQgb3B0aW9ucyBpbnRlcm9wIGhhbmRsZXI6IEVycm9yIHRyeWluZyB0byBwZXJmb3JtIGFjdGlvbiAke3JlcXVlc3RlZEFjdGlvbn0uYCwgZXJyb3IpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGFzIGhhbmRsZXIgZnJvbSBcIi4vYWN0aW9uLWhhbmRsZXJcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==