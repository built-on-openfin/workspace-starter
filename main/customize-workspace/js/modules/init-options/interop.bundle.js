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
let logger;
async function raiseIntent(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    logger.info(`Received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
    await brokerClient.fireIntent(payload);
}
async function shareContext(payload) {
    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    const contextGroups = await brokerClient.getContextGroups();
    const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
    if (targetContextGroup !== undefined) {
        await brokerClient.joinContextGroup(targetContextGroup.id);
        logger.info(`Received context to send. Context Group ${targetContextGroup.id}. Context: ${JSON.stringify(payload.context, null, 4)}`);
        await brokerClient.setContext(payload.context);
    }
}
async function init(options, loggerCreator) {
    logger = loggerCreator("InitOptionsInteropHandler");
    // the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
    logger.info("The handler has been loaded");
}
async function action(requestedAction, payload) {
    if (payload === undefined) {
        logger.warn(`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
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
        logger.error(`Error trying to perform action ${requestedAction}.`, error);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvaW50ZXJvcC9hY3Rpb24taGFuZGxlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2luaXQtb3B0aW9ucy9pbnRlcm9wL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcblxuaW50ZXJmYWNlIFJhaXNlSW50ZW50UGF5bG9hZCB7XG5cdG5hbWU6IHN0cmluZztcblx0Y29udGV4dDogT3BlbkZpbi5Db250ZXh0O1xufVxuXG5pbnRlcmZhY2UgU2hhcmVDb250ZXh0UGF5bG9hZCB7XG5cdGNvbnRleHRHcm91cDogc3RyaW5nO1xuXHRjb250ZXh0OiBPcGVuRmluLkNvbnRleHQ7XG59XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuYXN5bmMgZnVuY3Rpb24gcmFpc2VJbnRlbnQocGF5bG9hZDogUmFpc2VJbnRlbnRQYXlsb2FkKSB7XG5cdGNvbnN0IGJyb2tlckNsaWVudCA9IGZpbi5JbnRlcm9wLmNvbm5lY3RTeW5jKGZpbi5tZS5pZGVudGl0eS51dWlkLCB7fSk7XG5cdGxvZ2dlci5pbmZvKGBSZWNlaXZlZCBpbnRlbnQgdG8gcmFpc2UuIEludGVudCBSZXF1ZXN0ICR7SlNPTi5zdHJpbmdpZnkocGF5bG9hZCwgbnVsbCwgNCl9LmApO1xuXHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChwYXlsb2FkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hhcmVDb250ZXh0KHBheWxvYWQ6IFNoYXJlQ29udGV4dFBheWxvYWQpIHtcblx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0Y29uc3QgY29udGV4dEdyb3VwcyA9IGF3YWl0IGJyb2tlckNsaWVudC5nZXRDb250ZXh0R3JvdXBzKCk7XG5cdGNvbnN0IHRhcmdldENvbnRleHRHcm91cCA9IGNvbnRleHRHcm91cHMuZmluZCgoZ3JvdXApID0+IGdyb3VwLmlkID09PSBwYXlsb2FkLmNvbnRleHRHcm91cCk7XG5cdGlmICh0YXJnZXRDb250ZXh0R3JvdXAgIT09IHVuZGVmaW5lZCkge1xuXHRcdGF3YWl0IGJyb2tlckNsaWVudC5qb2luQ29udGV4dEdyb3VwKHRhcmdldENvbnRleHRHcm91cC5pZCk7XG5cdFx0bG9nZ2VyLmluZm8oXG5cdFx0XHRgUmVjZWl2ZWQgY29udGV4dCB0byBzZW5kLiBDb250ZXh0IEdyb3VwICR7dGFyZ2V0Q29udGV4dEdyb3VwLmlkfS4gQ29udGV4dDogJHtKU09OLnN0cmluZ2lmeShcblx0XHRcdFx0cGF5bG9hZC5jb250ZXh0LFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHQ0XG5cdFx0XHQpfWBcblx0XHQpO1xuXHRcdGF3YWl0IGJyb2tlckNsaWVudC5zZXRDb250ZXh0KHBheWxvYWQuY29udGV4dCk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQob3B0aW9uczogdW5rbm93biwgbG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcikge1xuXHRsb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiSW5pdE9wdGlvbnNJbnRlcm9wSGFuZGxlclwiKTtcblx0Ly8gdGhlIGluaXQgZnVuY3Rpb24gY291bGQgYmUgcGFzc2VkIGxpbWl0cyAoZS5nLiBvbmx5IHN1cHBvcnQgdGhlIGZvbGxvd2luZyBpbnRlbnRzIG9yIGNvbnRleHRzLiBPbmx5IHB1Ymxpc2ggdG8gdGhlIGZvbGxvd2luZyBjb250ZXh0IGdyb3VwcyBldGMuKVxuXHRsb2dnZXIuaW5mbyhcIlRoZSBoYW5kbGVyIGhhcyBiZWVuIGxvYWRlZFwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0cmVxdWVzdGVkQWN0aW9uOiBzdHJpbmcsXG5cdHBheWxvYWQ/OiBSYWlzZUludGVudFBheWxvYWQgfCBTaGFyZUNvbnRleHRQYXlsb2FkXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKHBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YEFjdGlvbnMgcGFzc2VkIHRvIHRoZSBtb2R1bGUgcmVxdWlyZSBhIHBheWxvYWQgdG8gYmUgcGFzc2VkLiBSZXF1ZXN0ZWQgYWN0aW9uOiAke3JlcXVlc3RlZEFjdGlvbn0gY2FuIG5vdCBiZSBmdWxmaWxsZWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0c3dpdGNoIChyZXF1ZXN0ZWRBY3Rpb24pIHtcblx0XHRcdGNhc2UgXCJyYWlzZS1pbnRlbnRcIjoge1xuXHRcdFx0XHRhd2FpdCByYWlzZUludGVudChwYXlsb2FkIGFzIFJhaXNlSW50ZW50UGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNoYXJlLWNvbnRleHRcIjoge1xuXHRcdFx0XHRhd2FpdCBzaGFyZUNvbnRleHQocGF5bG9hZCBhcyBTaGFyZUNvbnRleHRQYXlsb2FkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlci5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0ICogYXMgaGFuZGxlciBmcm9tIFwiLi9hY3Rpb24taGFuZGxlclwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9