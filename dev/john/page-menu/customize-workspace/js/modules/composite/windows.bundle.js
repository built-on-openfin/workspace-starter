/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/windows/actions.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/windows/actions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowActions": () => (/* binding */ WindowActions)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./client/src/modules/composite/windows/helper.ts");

/**
 * Implement the actions.
 */
class WindowActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("WindowActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["window-show-all"] = async (payload) => {
            if (payload.callerType !== this._helpers.callerTypes.API &&
                payload.callerType !== this._helpers.callerTypes.SaveButtonContextMenu) {
                const visibleWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getAllVisibleWindows)();
                let windowInitiator;
                for (const visibleWindow of visibleWindows) {
                    if (visibleWindow.identity.name === payload.windowIdentity.name &&
                        visibleWindow.identity.uuid === payload.windowIdentity.uuid) {
                        windowInitiator = visibleWindow;
                    }
                    else {
                        const windowState = await visibleWindow.getState();
                        if (windowState === "minimized") {
                            await visibleWindow.restore();
                        }
                        await visibleWindow.bringToFront();
                    }
                }
                if (windowInitiator !== undefined) {
                    await windowInitiator.setAsForeground();
                }
            }
        };
        actionMap["window-hide-all"] = async (payload) => {
            const visibleWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getAllVisibleWindows)();
            for (const visibleWindow of visibleWindows) {
                await visibleWindow.minimize();
            }
        };
        actionMap["window-hide-others"] = async (payload) => {
            if (payload.callerType !== this._helpers.callerTypes.API &&
                payload.callerType !== this._helpers.callerTypes.SaveButtonContextMenu) {
                const visibleWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getAllVisibleWindows)();
                for (const visibleWindow of visibleWindows) {
                    if (visibleWindow.identity.name !== payload.windowIdentity.name) {
                        await visibleWindow.minimize();
                    }
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/windows/helper.ts":
/*!********************************************************!*\
  !*** ./client/src/modules/composite/windows/helper.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllVisibleWindows": () => (/* binding */ getAllVisibleWindows)
/* harmony export */ });
async function getAllVisibleWindows() {
    const platform = fin.Platform.getCurrentSync();
    const windows = await platform.Application.getChildWindows();
    const availableWindows = [];
    for (const currentWindow of windows) {
        const isShowing = await currentWindow.isShowing();
        if (isShowing) {
            availableWindows.push(currentWindow);
        }
    }
    return availableWindows;
}


/***/ }),

/***/ "./client/src/modules/composite/windows/menus.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/windows/menus.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowMenus": () => (/* binding */ WindowMenus)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./client/src/modules/composite/windows/helper.ts");

/**
 * Implement the menus.
 */
class WindowMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("WindowMenus");
        this._settings = definition.data;
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     * @param relatedMenuId The related menu information (viewId/viewIds, pageId and window Id based on the type of menu).
     */
    async get(menuType, platform, relatedMenuId) {
        if (menuType === "global" && relatedMenuId.windowIdentity !== undefined) {
            // you can customize the browser main menu here
            const includeShowAllWindows = this._settings?.showAllWindows?.include === undefined || this._settings?.showAllWindows?.include;
            const includeHideAllWindows = this._settings?.hideAllWindows?.include === undefined || this._settings?.hideAllWindows?.include;
            const includeHideOtherWindows = this._settings?.hideOtherWindows?.include === undefined || this._settings?.hideOtherWindows?.include;
            const availableWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getAllVisibleWindows)();
            const showAllWindowsEntry = {
                label: this._settings?.showAllWindows?.menuLabel ?? "Show All Windows",
                icon: this._settings?.showAllWindows?.menuIcon,
                enabled: availableWindows.length > 1,
                position: {
                    type: "CloseWindow",
                    operation: "before",
                    ...this._settings?.showAllWindows?.menuPosition
                },
                data: {
                    type: "Custom",
                    action: {
                        id: "window-show-all"
                    }
                }
            };
            const hideAllWindowsEntry = {
                label: this._settings?.hideAllWindows?.menuLabel ?? "Hide All Windows",
                icon: this._settings?.hideAllWindows?.menuIcon,
                position: {
                    type: "CloseWindow",
                    operation: "before",
                    ...this._settings?.hideAllWindows?.menuPosition
                },
                data: {
                    type: "Custom",
                    action: {
                        id: "window-hide-all"
                    }
                }
            };
            const hideOtherWindowsEntry = {
                label: this._settings?.hideOtherWindows?.menuLabel ?? "Hide Other Windows",
                icon: this._settings?.hideOtherWindows?.menuIcon,
                enabled: availableWindows.length > 1,
                position: {
                    type: "CloseWindow",
                    operation: "before",
                    ...this._settings?.hideOtherWindows?.menuPosition
                },
                data: {
                    type: "Custom",
                    action: {
                        id: "window-hide-others"
                    }
                }
            };
            const menuItemsToReturn = [];
            if (includeShowAllWindows) {
                menuItemsToReturn.push(showAllWindowsEntry);
            }
            if (includeHideAllWindows) {
                menuItemsToReturn.push(hideAllWindowsEntry);
            }
            if (includeHideOtherWindows) {
                menuItemsToReturn.push(hideOtherWindowsEntry);
            }
            if (this._settings.separator !== "none" && menuItemsToReturn.length > 0) {
                menuItemsToReturn[0].separator = this._settings.separator ?? "before";
            }
            // even thought the array is typed eslint will still complain so the rule is disabled here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return menuItemsToReturn;
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
  !*** ./client/src/modules/composite/windows/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/windows/actions.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/windows/menus.ts");


const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.WindowActions(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_1__.WindowMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FDekI7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0NySUQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMEM7QUFDSjtBQUUvQixNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksbURBQWEsRUFBRTtJQUM1QixLQUFLLEVBQUUsSUFBSSwrQ0FBVyxFQUFFO0NBQ3hCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvd2luZG93cy9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS93aW5kb3dzL2hlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvd2luZG93cy9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS93aW5kb3dzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBBY3Rpb25IZWxwZXJzLCBBY3Rpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0QWxsVmlzaWJsZVdpbmRvd3MgfSBmcm9tIFwiLi9oZWxwZXJcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiV2luZG93QWN0aW9uc1wiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcIndpbmRvdy1zaG93LWFsbFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5BUEkgJiZcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlICE9PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLlNhdmVCdXR0b25Db250ZXh0TWVudVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IHZpc2libGVXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTtcblx0XHRcdFx0bGV0IHdpbmRvd0luaXRpYXRvcjogT3BlbkZpbi5XaW5kb3c7XG5cdFx0XHRcdGZvciAoY29uc3QgdmlzaWJsZVdpbmRvdyBvZiB2aXNpYmxlV2luZG93cykge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHZpc2libGVXaW5kb3cuaWRlbnRpdHkubmFtZSA9PT0gcGF5bG9hZC53aW5kb3dJZGVudGl0eS5uYW1lICYmXG5cdFx0XHRcdFx0XHR2aXNpYmxlV2luZG93LmlkZW50aXR5LnV1aWQgPT09IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0d2luZG93SW5pdGlhdG9yID0gdmlzaWJsZVdpbmRvdztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2luZG93U3RhdGUgPSBhd2FpdCB2aXNpYmxlV2luZG93LmdldFN0YXRlKCk7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93U3RhdGUgPT09IFwibWluaW1pemVkXCIpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdmlzaWJsZVdpbmRvdy5yZXN0b3JlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhd2FpdCB2aXNpYmxlV2luZG93LmJyaW5nVG9Gcm9udCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAod2luZG93SW5pdGlhdG9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhd2FpdCB3aW5kb3dJbml0aWF0b3Iuc2V0QXNGb3JlZ3JvdW5kKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wid2luZG93LWhpZGUtYWxsXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGNvbnN0IHZpc2libGVXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTtcblx0XHRcdGZvciAoY29uc3QgdmlzaWJsZVdpbmRvdyBvZiB2aXNpYmxlV2luZG93cykge1xuXHRcdFx0XHRhd2FpdCB2aXNpYmxlV2luZG93Lm1pbmltaXplKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcIndpbmRvdy1oaWRlLW90aGVyc1wiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5BUEkgJiZcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlICE9PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLlNhdmVCdXR0b25Db250ZXh0TWVudVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IHZpc2libGVXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTtcblx0XHRcdFx0Zm9yIChjb25zdCB2aXNpYmxlV2luZG93IG9mIHZpc2libGVXaW5kb3dzKSB7XG5cdFx0XHRcdFx0aWYgKHZpc2libGVXaW5kb3cuaWRlbnRpdHkubmFtZSAhPT0gcGF5bG9hZC53aW5kb3dJZGVudGl0eS5uYW1lKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB2aXNpYmxlV2luZG93Lm1pbmltaXplKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFZpc2libGVXaW5kb3dzKCk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3dbXT4ge1xuXHRjb25zdCBwbGF0Zm9ybSA9IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpO1xuXHRjb25zdCB3aW5kb3dzID0gYXdhaXQgcGxhdGZvcm0uQXBwbGljYXRpb24uZ2V0Q2hpbGRXaW5kb3dzKCk7XG5cdGNvbnN0IGF2YWlsYWJsZVdpbmRvd3M6IE9wZW5GaW4uV2luZG93W10gPSBbXTtcblx0Zm9yIChjb25zdCBjdXJyZW50V2luZG93IG9mIHdpbmRvd3MpIHtcblx0XHRjb25zdCBpc1Nob3dpbmcgPSBhd2FpdCBjdXJyZW50V2luZG93LmlzU2hvd2luZygpO1xuXHRcdGlmIChpc1Nob3dpbmcpIHtcblx0XHRcdGF2YWlsYWJsZVdpbmRvd3MucHVzaChjdXJyZW50V2luZG93KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGF2YWlsYWJsZVdpbmRvd3M7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNZW51cyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNZW51RW50cnksIE1lbnVUeXBlLCBSZWxhdGVkTWVudUlkIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0QWxsVmlzaWJsZVdpbmRvd3MgfSBmcm9tIFwiLi9oZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgV2luZG93TWVudVNldHRpbmdzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBtZW51cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFdpbmRvd01lbnVzIGltcGxlbWVudHMgTWVudXM8V2luZG93TWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5nczogV2luZG93TWVudVNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248V2luZG93TWVudVNldHRpbmdzPixcblx0XHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJXaW5kb3dNZW51c1wiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gcmVsYXRlZE1lbnVJZCBUaGUgcmVsYXRlZCBtZW51IGluZm9ybWF0aW9uICh2aWV3SWQvdmlld0lkcywgcGFnZUlkIGFuZCB3aW5kb3cgSWQgYmFzZWQgb24gdGhlIHR5cGUgb2YgbWVudSkuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KFxuXHRcdG1lbnVUeXBlOiBNZW51VHlwZSxcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0cmVsYXRlZE1lbnVJZD86IFJlbGF0ZWRNZW51SWRcblx0KTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIiAmJiByZWxhdGVkTWVudUlkLndpbmRvd0lkZW50aXR5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIHlvdSBjYW4gY3VzdG9taXplIHRoZSBicm93c2VyIG1haW4gbWVudSBoZXJlXG5cdFx0XHRjb25zdCBpbmNsdWRlU2hvd0FsbFdpbmRvd3MgPVxuXHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8uc2hvd0FsbFdpbmRvd3M/LmluY2x1ZGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl9zZXR0aW5ncz8uc2hvd0FsbFdpbmRvd3M/LmluY2x1ZGU7XG5cdFx0XHRjb25zdCBpbmNsdWRlSGlkZUFsbFdpbmRvd3MgPVxuXHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/LmluY2x1ZGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/LmluY2x1ZGU7XG5cdFx0XHRjb25zdCBpbmNsdWRlSGlkZU90aGVyV2luZG93cyA9XG5cdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5oaWRlT3RoZXJXaW5kb3dzPy5pbmNsdWRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fc2V0dGluZ3M/LmhpZGVPdGhlcldpbmRvd3M/LmluY2x1ZGU7XG5cblx0XHRcdGNvbnN0IGF2YWlsYWJsZVdpbmRvd3MgPSBhd2FpdCBnZXRBbGxWaXNpYmxlV2luZG93cygpO1xuXG5cdFx0XHRjb25zdCBzaG93QWxsV2luZG93c0VudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uc2hvd0FsbFdpbmRvd3M/Lm1lbnVMYWJlbCA/PyBcIlNob3cgQWxsIFdpbmRvd3NcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5tZW51SWNvbixcblx0XHRcdFx0ZW5hYmxlZDogYXZhaWxhYmxlV2luZG93cy5sZW5ndGggPiAxLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VXaW5kb3dcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5tZW51UG9zaXRpb25cblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRpZDogXCJ3aW5kb3ctc2hvdy1hbGxcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgaGlkZUFsbFdpbmRvd3NFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LmhpZGVBbGxXaW5kb3dzPy5tZW51TGFiZWwgPz8gXCJIaWRlIEFsbCBXaW5kb3dzXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5oaWRlQWxsV2luZG93cz8ubWVudUljb24sXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDbG9zZVdpbmRvd1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcIndpbmRvdy1oaWRlLWFsbFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBoaWRlT3RoZXJXaW5kb3dzRW50cnk6IE1lbnVFbnRyeSA9IHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5oaWRlT3RoZXJXaW5kb3dzPy5tZW51TGFiZWwgPz8gXCJIaWRlIE90aGVyIFdpbmRvd3NcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmhpZGVPdGhlcldpbmRvd3M/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiBhdmFpbGFibGVXaW5kb3dzLmxlbmd0aCA+IDEsXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDbG9zZVdpbmRvd1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwid2luZG93LWhpZGUtb3RoZXJzXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IG1lbnVJdGVtc1RvUmV0dXJuOiBNZW51RW50cnlbXSA9IFtdO1xuXG5cdFx0XHRpZiAoaW5jbHVkZVNob3dBbGxXaW5kb3dzKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goc2hvd0FsbFdpbmRvd3NFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbmNsdWRlSGlkZUFsbFdpbmRvd3MpIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChoaWRlQWxsV2luZG93c0VudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluY2x1ZGVIaWRlT3RoZXJXaW5kb3dzKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goaGlkZU90aGVyV2luZG93c0VudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3NldHRpbmdzLnNlcGFyYXRvciAhPT0gXCJub25lXCIgJiYgbWVudUl0ZW1zVG9SZXR1cm4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVyblswXS5zZXBhcmF0b3IgPSB0aGlzLl9zZXR0aW5ncy5zZXBhcmF0b3IgPz8gXCJiZWZvcmVcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXZlbiB0aG91Z2h0IHRoZSBhcnJheSBpcyB0eXBlZCBlc2xpbnQgd2lsbCBzdGlsbCBjb21wbGFpbiBzbyB0aGUgcnVsZSBpcyBkaXNhYmxlZCBoZXJlXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgV2luZG93QWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IFdpbmRvd01lbnVzIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBXaW5kb3dBY3Rpb25zKCksXG5cdG1lbnVzOiBuZXcgV2luZG93TWVudXMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==