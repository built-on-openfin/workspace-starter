/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/init-options/interop/action-handler.ts":
/*!*******************************************************************!*\
  !*** ./client/src/modules/init-options/interop/action-handler.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action": () => (/* binding */ action),
/* harmony export */   "initialize": () => (/* binding */ initialize)
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
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("InitOptionsInteropHandler");
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _action_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action-handler */ "./client/src/modules/init-options/interop/action-handler.ts");

const entryPoints = {
    initOptions: _action_handler__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0w4RDtBQUV2RCxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsV0FBVyxFQUFFLDRDQUF5QjtDQUN0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvaW5pdC1vcHRpb25zL2ludGVyb3AvYWN0aW9uLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbml0LW9wdGlvbnMvaW50ZXJvcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG5pbnRlcmZhY2UgUmFpc2VJbnRlbnRQYXlsb2FkIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjb250ZXh0OiBPcGVuRmluLkNvbnRleHQ7XG59XG5cbmludGVyZmFjZSBTaGFyZUNvbnRleHRQYXlsb2FkIHtcblx0Y29udGV4dEdyb3VwOiBzdHJpbmc7XG5cdGNvbnRleHQ6IE9wZW5GaW4uQ29udGV4dDtcbn1cblxubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5hc3luYyBmdW5jdGlvbiByYWlzZUludGVudChwYXlsb2FkOiBSYWlzZUludGVudFBheWxvYWQpIHtcblx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0bG9nZ2VyLmluZm8oYFJlY2VpdmVkIGludGVudCB0byByYWlzZS4gSW50ZW50IFJlcXVlc3QgJHtKU09OLnN0cmluZ2lmeShwYXlsb2FkLCBudWxsLCA0KX0uYCk7XG5cdGF3YWl0IGJyb2tlckNsaWVudC5maXJlSW50ZW50KHBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaGFyZUNvbnRleHQocGF5bG9hZDogU2hhcmVDb250ZXh0UGF5bG9hZCkge1xuXHRjb25zdCBicm9rZXJDbGllbnQgPSBmaW4uSW50ZXJvcC5jb25uZWN0U3luYyhmaW4ubWUuaWRlbnRpdHkudXVpZCwge30pO1xuXHRjb25zdCBjb250ZXh0R3JvdXBzID0gYXdhaXQgYnJva2VyQ2xpZW50LmdldENvbnRleHRHcm91cHMoKTtcblx0Y29uc3QgdGFyZ2V0Q29udGV4dEdyb3VwID0gY29udGV4dEdyb3Vwcy5maW5kKChncm91cCkgPT4gZ3JvdXAuaWQgPT09IHBheWxvYWQuY29udGV4dEdyb3VwKTtcblx0aWYgKHRhcmdldENvbnRleHRHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0YXdhaXQgYnJva2VyQ2xpZW50LmpvaW5Db250ZXh0R3JvdXAodGFyZ2V0Q29udGV4dEdyb3VwLmlkKTtcblx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdGBSZWNlaXZlZCBjb250ZXh0IHRvIHNlbmQuIENvbnRleHQgR3JvdXAgJHt0YXJnZXRDb250ZXh0R3JvdXAuaWR9LiBDb250ZXh0OiAke0pTT04uc3RyaW5naWZ5KFxuXHRcdFx0XHRwYXlsb2FkLmNvbnRleHQsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdDRcblx0XHRcdCl9YFxuXHRcdCk7XG5cdFx0YXdhaXQgYnJva2VyQ2xpZW50LnNldENvbnRleHQocGF5bG9hZC5jb250ZXh0KTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZShcblx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG4pIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiSW5pdE9wdGlvbnNJbnRlcm9wSGFuZGxlclwiKTtcblx0Ly8gdGhlIGluaXQgZnVuY3Rpb24gY291bGQgYmUgcGFzc2VkIGxpbWl0cyAoZS5nLiBvbmx5IHN1cHBvcnQgdGhlIGZvbGxvd2luZyBpbnRlbnRzIG9yIGNvbnRleHRzLiBPbmx5IHB1Ymxpc2ggdG8gdGhlIGZvbGxvd2luZyBjb250ZXh0IGdyb3VwcyBldGMuKVxuXHRsb2dnZXIuaW5mbyhcIlRoZSBoYW5kbGVyIGhhcyBiZWVuIGxvYWRlZFwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGlvbihcblx0cmVxdWVzdGVkQWN0aW9uOiBzdHJpbmcsXG5cdHBheWxvYWQ/OiBSYWlzZUludGVudFBheWxvYWQgfCBTaGFyZUNvbnRleHRQYXlsb2FkXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKHBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YEFjdGlvbnMgcGFzc2VkIHRvIHRoZSBtb2R1bGUgcmVxdWlyZSBhIHBheWxvYWQgdG8gYmUgcGFzc2VkLiBSZXF1ZXN0ZWQgYWN0aW9uOiAke3JlcXVlc3RlZEFjdGlvbn0gY2FuIG5vdCBiZSBmdWxmaWxsZWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRyeSB7XG5cdFx0c3dpdGNoIChyZXF1ZXN0ZWRBY3Rpb24pIHtcblx0XHRcdGNhc2UgXCJyYWlzZS1pbnRlbnRcIjoge1xuXHRcdFx0XHRhd2FpdCByYWlzZUludGVudChwYXlsb2FkIGFzIFJhaXNlSW50ZW50UGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNoYXJlLWNvbnRleHRcIjoge1xuXHRcdFx0XHRhd2FpdCBzaGFyZUNvbnRleHQocGF5bG9hZCBhcyBTaGFyZUNvbnRleHRQYXlsb2FkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlci5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgaW5pdE9wdGlvbnNJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hY3Rpb24taGFuZGxlclwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0aW5pdE9wdGlvbnM6IGluaXRPcHRpb25zSW1wbGVtZW50YXRpb25cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=