/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/windows/actions.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/windows/actions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowActions: () => (/* binding */ WindowActions)
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
/* harmony export */   getAllVisibleWindows: () => (/* binding */ getAllVisibleWindows)
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
/* harmony export */   WindowMenus: () => (/* binding */ WindowMenus)
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
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NDbklEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDBDO0FBQ0o7QUFFL0IsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLG1EQUFhLEVBQUU7SUFDNUIsS0FBSyxFQUFFLElBQUksK0NBQVcsRUFBRTtDQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3dpbmRvd3MvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvd2luZG93cy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3dpbmRvd3MvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvd2luZG93cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgQWN0aW9uSGVscGVycywgQWN0aW9ucyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGdldEFsbFZpc2libGVXaW5kb3dzIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgV2luZG93QWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIldpbmRvd0FjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJ3aW5kb3ctc2hvdy1hbGxcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRwYXlsb2FkLmNhbGxlclR5cGUgIT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuQVBJICYmXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5TYXZlQnV0dG9uQ29udGV4dE1lbnVcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCB2aXNpYmxlV2luZG93cyA9IGF3YWl0IGdldEFsbFZpc2libGVXaW5kb3dzKCk7XG5cdFx0XHRcdGxldCB3aW5kb3dJbml0aWF0b3I6IE9wZW5GaW4uV2luZG93O1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZpc2libGVXaW5kb3cgb2YgdmlzaWJsZVdpbmRvd3MpIHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHR2aXNpYmxlV2luZG93LmlkZW50aXR5Lm5hbWUgPT09IHBheWxvYWQud2luZG93SWRlbnRpdHkubmFtZSAmJlxuXHRcdFx0XHRcdFx0dmlzaWJsZVdpbmRvdy5pZGVudGl0eS51dWlkID09PSBwYXlsb2FkLndpbmRvd0lkZW50aXR5LnV1aWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHdpbmRvd0luaXRpYXRvciA9IHZpc2libGVXaW5kb3c7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IHdpbmRvd1N0YXRlID0gYXdhaXQgdmlzaWJsZVdpbmRvdy5nZXRTdGF0ZSgpO1xuXHRcdFx0XHRcdFx0aWYgKHdpbmRvd1N0YXRlID09PSBcIm1pbmltaXplZFwiKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHZpc2libGVXaW5kb3cucmVzdG9yZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YXdhaXQgdmlzaWJsZVdpbmRvdy5icmluZ1RvRnJvbnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHdpbmRvd0luaXRpYXRvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YXdhaXQgd2luZG93SW5pdGlhdG9yLnNldEFzRm9yZWdyb3VuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcIndpbmRvdy1oaWRlLWFsbFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRjb25zdCB2aXNpYmxlV2luZG93cyA9IGF3YWl0IGdldEFsbFZpc2libGVXaW5kb3dzKCk7XG5cdFx0XHRmb3IgKGNvbnN0IHZpc2libGVXaW5kb3cgb2YgdmlzaWJsZVdpbmRvd3MpIHtcblx0XHRcdFx0YXdhaXQgdmlzaWJsZVdpbmRvdy5taW5pbWl6ZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJ3aW5kb3ctaGlkZS1vdGhlcnNcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRwYXlsb2FkLmNhbGxlclR5cGUgIT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuQVBJICYmXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5TYXZlQnV0dG9uQ29udGV4dE1lbnVcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCB2aXNpYmxlV2luZG93cyA9IGF3YWl0IGdldEFsbFZpc2libGVXaW5kb3dzKCk7XG5cdFx0XHRcdGZvciAoY29uc3QgdmlzaWJsZVdpbmRvdyBvZiB2aXNpYmxlV2luZG93cykge1xuXHRcdFx0XHRcdGlmICh2aXNpYmxlV2luZG93LmlkZW50aXR5Lm5hbWUgIT09IHBheWxvYWQud2luZG93SWRlbnRpdHkubmFtZSkge1xuXHRcdFx0XHRcdFx0YXdhaXQgdmlzaWJsZVdpbmRvdy5taW5pbWl6ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxWaXNpYmxlV2luZG93cygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93W10+IHtcblx0Y29uc3QgcGxhdGZvcm0gPSBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtcblx0Y29uc3Qgd2luZG93cyA9IGF3YWl0IHBsYXRmb3JtLkFwcGxpY2F0aW9uLmdldENoaWxkV2luZG93cygpO1xuXHRjb25zdCBhdmFpbGFibGVXaW5kb3dzOiBPcGVuRmluLldpbmRvd1tdID0gW107XG5cdGZvciAoY29uc3QgY3VycmVudFdpbmRvdyBvZiB3aW5kb3dzKSB7XG5cdFx0Y29uc3QgaXNTaG93aW5nID0gYXdhaXQgY3VycmVudFdpbmRvdy5pc1Nob3dpbmcoKTtcblx0XHRpZiAoaXNTaG93aW5nKSB7XG5cdFx0XHRhdmFpbGFibGVXaW5kb3dzLnB1c2goY3VycmVudFdpbmRvdyk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhdmFpbGFibGVXaW5kb3dzO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTWVudXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgUmVsYXRlZE1lbnVJZCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGdldEFsbFZpc2libGVXaW5kb3dzIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IFdpbmRvd01lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dNZW51cyBpbXBsZW1lbnRzIE1lbnVzPFdpbmRvd01lbnVTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IFdpbmRvd01lbnVTZXR0aW5ncztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFdpbmRvd01lbnVTZXR0aW5ncz4sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiV2luZG93TWVudXNcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHJlbGF0ZWRNZW51SWQgVGhlIHJlbGF0ZWQgbWVudSBpbmZvcm1hdGlvbiAodmlld0lkL3ZpZXdJZHMsIHBhZ2VJZCBhbmQgd2luZG93IElkIGJhc2VkIG9uIHRoZSB0eXBlIG9mIG1lbnUpLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChcblx0XHRtZW51VHlwZTogTWVudVR5cGUsXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHJlbGF0ZWRNZW51SWQ/OiBSZWxhdGVkTWVudUlkXG5cdCk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAobWVudVR5cGUgPT09IFwiZ2xvYmFsXCIgJiYgcmVsYXRlZE1lbnVJZC53aW5kb3dJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyB5b3UgY2FuIGN1c3RvbWl6ZSB0aGUgYnJvd3NlciBtYWluIG1lbnUgaGVyZVxuXHRcdFx0Y29uc3QgaW5jbHVkZVNob3dBbGxXaW5kb3dzID1cblx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5pbmNsdWRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5pbmNsdWRlO1xuXHRcdFx0Y29uc3QgaW5jbHVkZUhpZGVBbGxXaW5kb3dzID1cblx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/LmhpZGVBbGxXaW5kb3dzPy5pbmNsdWRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fc2V0dGluZ3M/LmhpZGVBbGxXaW5kb3dzPy5pbmNsdWRlO1xuXHRcdFx0Y29uc3QgaW5jbHVkZUhpZGVPdGhlcldpbmRvd3MgPVxuXHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8uaW5jbHVkZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3NldHRpbmdzPy5oaWRlT3RoZXJXaW5kb3dzPy5pbmNsdWRlO1xuXG5cdFx0XHRjb25zdCBhdmFpbGFibGVXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTtcblxuXHRcdFx0Y29uc3Qgc2hvd0FsbFdpbmRvd3NFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5tZW51TGFiZWwgPz8gXCJTaG93IEFsbCBXaW5kb3dzXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5zaG93QWxsV2luZG93cz8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IGF2YWlsYWJsZVdpbmRvd3MubGVuZ3RoID4gMSxcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIkNsb3NlV2luZG93XCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiLFxuXHRcdFx0XHRcdC4uLnRoaXMuX3NldHRpbmdzPy5zaG93QWxsV2luZG93cz8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwid2luZG93LXNob3ctYWxsXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGhpZGVBbGxXaW5kb3dzRW50cnk6IE1lbnVFbnRyeSA9IHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5oaWRlQWxsV2luZG93cz8ubWVudUxhYmVsID8/IFwiSGlkZSBBbGwgV2luZG93c1wiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/Lm1lbnVJY29uLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VXaW5kb3dcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LmhpZGVBbGxXaW5kb3dzPy5tZW51UG9zaXRpb25cblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRpZDogXCJ3aW5kb3ctaGlkZS1hbGxcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgaGlkZU90aGVyV2luZG93c0VudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8ubWVudUxhYmVsID8/IFwiSGlkZSBPdGhlciBXaW5kb3dzXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5oaWRlT3RoZXJXaW5kb3dzPy5tZW51SWNvbixcblx0XHRcdFx0ZW5hYmxlZDogYXZhaWxhYmxlV2luZG93cy5sZW5ndGggPiAxLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VXaW5kb3dcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYmVmb3JlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LmhpZGVPdGhlcldpbmRvd3M/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcIndpbmRvdy1oaWRlLW90aGVyc1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBtZW51SXRlbXNUb1JldHVybjogTWVudUVudHJ5W10gPSBbXTtcblxuXHRcdFx0aWYgKGluY2x1ZGVTaG93QWxsV2luZG93cykge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKHNob3dBbGxXaW5kb3dzRW50cnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5jbHVkZUhpZGVBbGxXaW5kb3dzKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goaGlkZUFsbFdpbmRvd3NFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbmNsdWRlSGlkZU90aGVyV2luZG93cykge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKGhpZGVPdGhlcldpbmRvd3NFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9zZXR0aW5ncy5zZXBhcmF0b3IgIT09IFwibm9uZVwiICYmIG1lbnVJdGVtc1RvUmV0dXJuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm5bMF0uc2VwYXJhdG9yID0gdGhpcy5fc2V0dGluZ3Muc2VwYXJhdG9yID8/IFwiYmVmb3JlXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgV2luZG93QWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IFdpbmRvd01lbnVzIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBXaW5kb3dBY3Rpb25zKCksXG5cdG1lbnVzOiBuZXcgV2luZG93TWVudXMoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==