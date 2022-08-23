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
async function init(options) {
    console.log("Was passed the following options:", options);
}
async function action(endpointDefinition, request) {
    if (request === undefined) {
        console.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false.`);
        return false;
    }
    if (endpointDefinition.type !== "module") {
        console.warn(`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`);
        return false;
    }
    const logInfo = endpointDefinition?.options?.logInfo ?? true;
    const logWarn = endpointDefinition?.options?.logWarn ?? true;
    const logError = endpointDefinition?.options?.logError ?? true;
    if (endpointDefinition.options === undefined ||
        endpointDefinition.options.actionName === undefined ||
        endpointDefinition.options.channelName === undefined) {
        if (logWarn) {
            console.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
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
                console.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
            }
            return false;
        }
        if (logInfo) {
            console.log(`Sending action for endpoint id: ${endpointDefinition.id}`);
        }
        await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
        await channel.disconnect();
        return true;
    }
    catch (error) {
        if (logError) {
            console.error(`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`, error);
        }
        return false;
    }
}
async function requestResponse(endpointDefinition, request) {
    let defaultValue = null;
    if (endpointDefinition.type !== "module") {
        console.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
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
            console.warn(`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`);
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
                console.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
            }
            return defaultValue;
        }
        if (logInfo) {
            console.log(`Sending request response for endpoint: ${endpointDefinition.id}`);
        }
        const response = await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
        await channel.disconnect();
        return response;
    }
    catch (error) {
        if (logError) {
            console.error(`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`, error);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFTyxLQUFLLFVBQVUsSUFBSSxDQUFDLE9BQWdCO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVNLEtBQUssVUFBVSxNQUFNLENBQzNCLGtCQVNFLEVBQ0YsT0FBK0I7SUFFL0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLGtCQUFrQixDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNsRyxPQUFPLEtBQUssQ0FBQztLQUNiO0lBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQ1gsc0VBQXNFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUM3RixDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7S0FDYjtJQUNELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDO0lBQzdELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDO0lBQzdELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDO0lBRS9ELElBQ0Msa0JBQWtCLENBQUMsT0FBTyxLQUFLLFNBQVM7UUFDeEMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxTQUFTO1FBQ25ELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUNuRDtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnRUFBZ0Usa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN0RztRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2I7SUFFRCxJQUFJO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3JHLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUNyQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU87U0FDM0MsQ0FBQyxDQUFDO1FBQ0gsSUFDQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDN0Msa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUNoRTtZQUNELElBQUksT0FBTyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQ1gsZ0JBQWdCLGtCQUFrQixDQUFDLEVBQUUsNEJBQTRCLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLHNDQUFzQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxrREFBa0QsQ0FDOU4sQ0FBQzthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4RTtRQUNELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRixNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztLQUNaO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZixJQUFJLFFBQVEsRUFBRTtZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQ1osOERBQThELGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUNyRixLQUFLLENBQ0wsQ0FBQztTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7S0FDYjtBQUNGLENBQUM7QUFFTSxLQUFLLFVBQVUsZUFBZSxDQUNwQyxrQkFVRSxFQUNGLE9BQStCO0lBRS9CLElBQUksWUFBWSxHQUFZLElBQUksQ0FBQztJQUVqQyxJQUFJLGtCQUFrQixDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDekMsT0FBTyxDQUFDLElBQUksQ0FDWCxtRkFBbUYsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQzFHLENBQUM7UUFDRixPQUFPLFlBQVksQ0FBQztLQUNwQjtJQUNELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDO0lBQzdELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDO0lBQzdELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDO0lBRS9ELElBQUksa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDdkQsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtZQUNuRCxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMzRCxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0tBQ0Q7SUFDRCxJQUNDLGtCQUFrQixDQUFDLE9BQU8sS0FBSyxTQUFTO1FBQ3hDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUztRQUNuRCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFDbkQ7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0VBQWdFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdEc7UUFDRCxPQUFPLFlBQVksQ0FBQztLQUNwQjtJQUNELElBQUk7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckcsSUFBSSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3JDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTztTQUMzQyxDQUFDLENBQUM7UUFDSCxJQUNDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUztZQUM3QyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQ2hFO1lBQ0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLElBQUksQ0FDWCxnQkFBZ0Isa0JBQWtCLENBQUMsRUFBRSw0QkFBNEIsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksc0NBQXNDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxXQUFXLGtEQUFrRCxDQUM5TixDQUFDO2FBQ0Y7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUNwQjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvRTtRQUNELE1BQU0sUUFBUSxHQUFZLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixPQUFPLFFBQVEsQ0FBQztLQUNoQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2YsSUFBSSxRQUFRLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUNaLHdFQUF3RSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFDL0YsS0FBSyxDQUNMLENBQUM7U0FDRjtRQUNELE9BQU8sWUFBWSxDQUFDO0tBQ3BCO0FBQ0YsQ0FBQzs7Ozs7OztTQ3ZKRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvZW5kcG9pbnRzL2NoYW5uZWwvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9lbmRwb2ludHMvY2hhbm5lbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmRwb2ludERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vZW5kcG9pbnQtc2hhcGVzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KG9wdGlvbnM6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc29sZS5sb2coXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcIiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3Rpb24oXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPHtcblx0XHRjaGFubmVsTmFtZTogc3RyaW5nO1xuXHRcdGFjdGlvbk5hbWU6IHN0cmluZztcblx0XHRwYXlsb2FkPzogdW5rbm93bjtcblx0XHR3YWl0PzogYm9vbGVhbjtcblx0XHR1dWlkPzogc3RyaW5nO1xuXHRcdGxvZ0luZm8/OiBib29sZWFuO1xuXHRcdGxvZ1dhcm4/OiBib29sZWFuO1xuXHRcdGxvZ0Vycm9yPzogYm9vbGVhbjtcblx0fT4sXG5cdHJlcXVlc3Q/OiB7IHBheWxvYWQ/OiB1bmtub3duIH1cbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRpZiAocmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc29sZS53YXJuKGBBIHJlcXVlc3QgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0uIFJldHVybmluZyBmYWxzZS5gKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIHBlcmZvcm0gYWN0aW9uOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgbG9nSW5mbyA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nSW5mbyA/PyB0cnVlO1xuXHRjb25zdCBsb2dXYXJuID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dXYXJuID8/IHRydWU7XG5cdGNvbnN0IGxvZ0Vycm9yID0gZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5sb2dFcnJvciA/PyB0cnVlO1xuXG5cdGlmIChcblx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuY2hhbm5lbE5hbWUgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0Y29uc29sZS53YXJuKGBZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbk5hbWUgYW5kIGNoYW5uZWxOYW1lIGZvciBlbmRwb2ludDogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHR9KTtcblx0XHRpZiAoXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChsb2dJbmZvKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgU2VuZGluZyBhY3Rpb24gZm9yIGVuZHBvaW50IGlkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gKTtcblx0XHR9XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5hY3Rpb25OYW1lLCByZXF1ZXN0Py5wYXlsb2FkKTtcblx0XHRhd2FpdCBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAobG9nRXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBFcnJvciBleGVjdXRpbmcvb3IgY29ubmVjdGluZyB0byBhY3Rpb24uIEVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShcblx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248e1xuXHRcdGNoYW5uZWxOYW1lOiBzdHJpbmc7XG5cdFx0YWN0aW9uTmFtZTogc3RyaW5nO1xuXHRcdHBheWxvYWQ/OiB1bmtub3duO1xuXHRcdHdhaXQ/OiBib29sZWFuO1xuXHRcdHV1aWQ/OiBzdHJpbmc7XG5cdFx0bG9nSW5mbz86IGJvb2xlYW47XG5cdFx0bG9nV2Fybj86IGJvb2xlYW47XG5cdFx0bG9nRXJyb3I/OiBib29sZWFuO1xuXHRcdGRlZmF1bHQ/OiBcIm9iamVjdFwiIHwgXCJhcnJheVwiO1xuXHR9Pixcblx0cmVxdWVzdD86IHsgcGF5bG9hZD86IHVua25vd24gfVxuKTogUHJvbWlzZTx1bmtub3duIHwgbnVsbD4ge1xuXHRsZXQgZGVmYXVsdFZhbHVlOiB1bmtub3duID0gbnVsbDtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG5cdGNvbnN0IGxvZ0luZm8gPSBlbmRwb2ludERlZmluaXRpb24/Lm9wdGlvbnM/LmxvZ0luZm8gPz8gdHJ1ZTtcblx0Y29uc3QgbG9nV2FybiA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nV2FybiA/PyB0cnVlO1xuXHRjb25zdCBsb2dFcnJvciA9IGVuZHBvaW50RGVmaW5pdGlvbj8ub3B0aW9ucz8ubG9nRXJyb3IgPz8gdHJ1ZTtcblxuXHRpZiAoZW5kcG9pbnREZWZpbml0aW9uPy5vcHRpb25zPy5kZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuZGVmYXVsdCA9PT0gXCJhcnJheVwiKSB7XG5cdFx0XHRkZWZhdWx0VmFsdWUgPSBbXTtcblx0XHR9IGVsc2UgaWYgKGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmRlZmF1bHQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdGRlZmF1bHRWYWx1ZSA9IHt9O1xuXHRcdH1cblx0fVxuXHRpZiAoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmFjdGlvbk5hbWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLmNoYW5uZWxOYW1lID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0aWYgKGxvZ1dhcm4pIHtcblx0XHRcdGNvbnNvbGUud2FybihgWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb25OYW1lIGFuZCBjaGFubmVsTmFtZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZSwge1xuXHRcdFx0d2FpdDogZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMud2FpdCxcblx0XHRcdHBheWxvYWQ6IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnBheWxvYWRcblx0XHR9KTtcblx0XHRpZiAoXG5cdFx0XHRlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zLnV1aWQgIT09IGNoYW5uZWwucHJvdmlkZXJJZGVudGl0eS51dWlkXG5cdFx0KSB7XG5cdFx0XHRpZiAobG9nV2Fybikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0YEVuZHBvaW50IElkOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gaGFzIHRoZSBzb3VyY2UgcnVubmluZyAoJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51dWlkfSkgYnV0IHRoZSBwcm92aWRlciBvZiB0aGUgY2hhbm5lbDogJHtlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy5jaGFubmVsTmFtZX0gaXMgbm90IGNvbWluZyBmcm9tIHRoZSBzb3VyY2UuIFJldHVybmluZyBmYWxzZS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0XHRpZiAobG9nSW5mbykge1xuXHRcdFx0Y29uc29sZS5sb2coYFNlbmRpbmcgcmVxdWVzdCByZXNwb25zZSBmb3IgZW5kcG9pbnQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWApO1xuXHRcdH1cblx0XHRjb25zdCByZXNwb25zZTogdW5rbm93biA9IGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMuYWN0aW9uTmFtZSwgcmVxdWVzdD8ucGF5bG9hZCk7XG5cdFx0YXdhaXQgY2hhbm5lbC5kaXNjb25uZWN0KCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChsb2dFcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0YEVycm9yIGV4ZWN1dGluZyByZXF1ZXN0L3Jlc3BvbnNlIGFuZCBjb25uZWN0aW5nIHRvIGVuZHBvaW50IHdpdGggaWQ6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWAsXG5cdFx0XHRcdGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGFzIGVuZHBvaW50IGZyb20gXCIuL2VuZHBvaW50XCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=