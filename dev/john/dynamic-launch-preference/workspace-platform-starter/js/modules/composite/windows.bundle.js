/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/shapes/actions-shapes.ts":
/*!*******************************************************!*\
  !*** ./client/src/framework/shapes/actions-shapes.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomActionCallerType: () => (/* binding */ CustomActionCallerType)
/* harmony export */ });
/**
 * Use this in preference to CustomActionCallerType from workspace-platform to avoid the import of the whole of workspace package in modules.
 */
var CustomActionCallerType;
(function (CustomActionCallerType) {
    CustomActionCallerType["CustomButton"] = "CustomButton";
    CustomActionCallerType["StoreCustomButton"] = "StoreCustomButton";
    CustomActionCallerType["CustomDropdownItem"] = "CustomDropdownItem";
    CustomActionCallerType["GlobalContextMenu"] = "GlobalContextMenu";
    CustomActionCallerType["ViewTabContextMenu"] = "ViewTabContextMenu";
    CustomActionCallerType["PageTabContextMenu"] = "PageTabContextMenu";
    CustomActionCallerType["SaveButtonContextMenu"] = "SaveButtonContextMenu";
    CustomActionCallerType["API"] = "API";
})(CustomActionCallerType || (CustomActionCallerType = {}));


/***/ }),

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   isValidUrl: () => (/* binding */ isValidUrl),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
/* harmony export */ });
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object";
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isString(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return content;
}
/**
 * Validates the suggested url to see if it can replace the source url.
 * @param sourceUrl the original url to compare against.
 * @param suggestedUrl the suggested url to replace it with.
 * @param constraint the rules to apply against it.
 * @returns whether it is ok to replace the sourceUrl with the suggestedUrl
 */
function isValidUrl(sourceUrl, suggestedUrl, constraint) {
    if (isEmpty(suggestedUrl)) {
        return false;
    }
    if (!Array.isArray(constraint) || constraint.length === 0) {
        return true;
    }
    if (constraint.includes("URL_NONE")) {
        return false;
    }
    if (constraint.includes("URL_ANY")) {
        return true;
    }
    if (isEmpty(sourceUrl)) {
        // if we are about to do a domain related check then we need a source url
        return false;
    }
    const validatedSourceUrl = new URL(sourceUrl);
    const validatedSuggestedUrl = new URL(suggestedUrl);
    if (constraint.includes("URL_PAGE")) {
        return ((validatedSourceUrl.origin + validatedSourceUrl.pathname).toLowerCase() ===
            (validatedSuggestedUrl.origin + validatedSuggestedUrl.pathname).toLowerCase());
    }
    if (constraint.includes("URL_DOMAIN")) {
        return validatedSourceUrl.origin === validatedSuggestedUrl.origin;
    }
    return true;
}


/***/ }),

/***/ "./client/src/modules/composite/windows/actions.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/windows/actions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowActions: () => (/* binding */ WindowActions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./client/src/modules/composite/windows/helper.ts");



/**
 * Implement the actions.
 */
class WindowActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("WindowActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["window-show-all"] = async (payload) => {
            if (payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.API &&
                payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.SaveButtonContextMenu) {
                const userWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_2__.getAllUserWindows)();
                let windowInitiator;
                for (const visibleWindow of userWindows) {
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
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(windowInitiator)) {
                    await windowInitiator.setAsForeground();
                }
            }
        };
        actionMap["window-hide-all"] = async (payload) => {
            const userWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_2__.getAllUserWindows)();
            for (const userWindow of userWindows) {
                await userWindow.minimize();
            }
        };
        actionMap["window-hide-others"] = async (payload) => {
            if (payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.API &&
                payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.SaveButtonContextMenu) {
                const userWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_2__.getAllUserWindows)();
                for (const userWindow of userWindows) {
                    if (userWindow.identity.name !== payload.windowIdentity.name) {
                        await userWindow.minimize();
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
/* harmony export */   getAllUserWindows: () => (/* binding */ getAllUserWindows)
/* harmony export */ });
/**
 * Get all user windows and not hidden/background windows.
 * @returns The list of all user windows.
 */
async function getAllUserWindows() {
    const platform = fin.Platform.getCurrentSync();
    const windows = await platform.Application.getChildWindows();
    const availableWindows = [];
    for (const currentWindow of windows) {
        const isShowing = await currentWindow.isShowing();
        if (isShowing) {
            availableWindows.push(currentWindow);
        }
        else {
            // check to see if it is minimized as isShowing only counts windows that
            // are on the desktop in a visible sense and not hidden or minimized (from v32)
            const state = await currentWindow.getState();
            if (state === "minimized") {
                availableWindows.push(currentWindow);
            }
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
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./client/src/modules/composite/windows/helper.ts");


/**
 * Implement the menus.
 */
class WindowMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("WindowMenus");
        this._settings = definition.data;
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     * @param relatedMenuId The related menu information (viewId/viewIds, pageId and window Id based on the type of menu).
     * @returns The menu entries.
     */
    async get(menuType, platform, relatedMenuId) {
        if (menuType === "global" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedMenuId?.windowIdentity)) {
            // you can customize the browser main menu here
            const includeShowAllWindows = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.showAllWindows?.include) || this._settings?.showAllWindows?.include;
            const includeHideAllWindows = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.hideAllWindows?.include) || this._settings?.hideAllWindows?.include;
            const includeHideOtherWindows = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.hideOtherWindows?.include) || this._settings?.hideOtherWindows?.include;
            const userWindows = await (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getAllUserWindows)();
            const showAllWindowsEntry = {
                label: this._settings?.showAllWindows?.menuLabel ?? "Show All Windows",
                icon: this._settings?.showAllWindows?.menuIcon,
                enabled: userWindows.length > 1,
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
                enabled: userWindows.length > 1,
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
            if (this._settings?.separator !== "none" && menuItemsToReturn.length > 0) {
                menuItemsToReturn[0].separator = this._settings?.separator ?? "before";
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxLQUFLLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsSUFBSSxRQUFRLENBQUM7WUFDeEUsQ0FBQztZQUVELE9BQU8saUJBQWlCLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQ3pJRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0wwQztBQUNKO0FBRS9CLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxPQUFPLEVBQUUsSUFBSSxtREFBYSxFQUFFO0lBQzVCLEtBQUssRUFBRSxJQUFJLCtDQUFXLEVBQUU7Q0FDeEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9hY3Rpb25zLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3dpbmRvd3MvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3dpbmRvd3MvaGVscGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvd2luZG93cy9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3dpbmRvd3MvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogQSB3YXkgb2Ygc3BlY2lmeSB0aGUgcnVsZXMgYXJvdW5kIHRoZSB2YWxpZGF0aW9uLlxuICogRE9NQUlOIG1lYW5zIHRoYXQgdGhlIHVybCBtdXN0IGNvbWUgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKiBQQUdFIG1lYW5zIHRoYXQgdGhlIHVybHMgbXVzdCBtYXRjaCB0aGUgc2FtZSBvcmlnaW4gYW5kIHBhdGguXG4gKiBBTlkgbWVhbnMgeW91IGFyZSBhbGxvd2VkIHRvIHJlcGxhY2Ugb25lIHVybCB3aXRoIGFub3RoZXIgd2l0aG91dCBjb25zdHJhaW4uXG4gKiBOT05FIG1lYW5zIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IHRoZSB1cmwgaXMgbm90IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFZhbGlkVVJMQ29uc3RyYWludCA9IFwiVVJMX0RPTUFJTlwiIHwgXCJVUkxfUEFHRVwiIHwgXCJVUkxfQU5ZXCIgfCBcIlVSTF9OT05FXCI7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHNlZSBpZiBpdCBjYW4gcmVwbGFjZSB0aGUgc291cmNlIHVybC5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgdGhlIG9yaWdpbmFsIHVybCB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0gc3VnZ2VzdGVkVXJsIHRoZSBzdWdnZXN0ZWQgdXJsIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqIEBwYXJhbSBjb25zdHJhaW50IHRoZSBydWxlcyB0byBhcHBseSBhZ2FpbnN0IGl0LlxuICogQHJldHVybnMgd2hldGhlciBpdCBpcyBvayB0byByZXBsYWNlIHRoZSBzb3VyY2VVcmwgd2l0aCB0aGUgc3VnZ2VzdGVkVXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXJsKFxuXHRzb3VyY2VVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0c3VnZ2VzdGVkVXJsOiBzdHJpbmcsXG5cdGNvbnN0cmFpbnQ6IFZhbGlkVVJMQ29uc3RyYWludFtdIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcblx0aWYgKGlzRW1wdHkoc3VnZ2VzdGVkVXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29uc3RyYWludCkgfHwgY29uc3RyYWludC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9OT05FXCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX0FOWVwiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChpc0VtcHR5KHNvdXJjZVVybCkpIHtcblx0XHQvLyBpZiB3ZSBhcmUgYWJvdXQgdG8gZG8gYSBkb21haW4gcmVsYXRlZCBjaGVjayB0aGVuIHdlIG5lZWQgYSBzb3VyY2UgdXJsXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHZhbGlkYXRlZFNvdXJjZVVybCA9IG5ldyBVUkwoc291cmNlVXJsKTtcblx0Y29uc3QgdmFsaWRhdGVkU3VnZ2VzdGVkVXJsID0gbmV3IFVSTChzdWdnZXN0ZWRVcmwpO1xuXG5cdGlmIChjb25zdHJhaW50LmluY2x1ZGVzKFwiVVJMX1BBR0VcIikpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0KHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTb3VyY2VVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHQodmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbiArIHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5wYXRobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9ET01BSU5cIikpIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVkU291cmNlVXJsLm9yaWdpbiA9PT0gdmFsaWRhdGVkU3VnZ2VzdGVkVXJsLm9yaWdpbjtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHtcblx0Q3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSxcblx0dHlwZSBBY3Rpb25IZWxwZXJzLFxuXHR0eXBlIEFjdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0QWxsVXNlcldpbmRvd3MgfSBmcm9tIFwiLi9oZWxwZXJcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVycz86IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXaW5kb3dBY3Rpb25zXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcIndpbmRvdy1zaG93LWFsbFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5BUEkgJiZcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlICE9PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLlNhdmVCdXR0b25Db250ZXh0TWVudVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IHVzZXJXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVXNlcldpbmRvd3MoKTtcblx0XHRcdFx0bGV0IHdpbmRvd0luaXRpYXRvcjogT3BlbkZpbi5XaW5kb3cgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdGZvciAoY29uc3QgdmlzaWJsZVdpbmRvdyBvZiB1c2VyV2luZG93cykge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHZpc2libGVXaW5kb3cuaWRlbnRpdHkubmFtZSA9PT0gcGF5bG9hZC53aW5kb3dJZGVudGl0eS5uYW1lICYmXG5cdFx0XHRcdFx0XHR2aXNpYmxlV2luZG93LmlkZW50aXR5LnV1aWQgPT09IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0d2luZG93SW5pdGlhdG9yID0gdmlzaWJsZVdpbmRvdztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2luZG93U3RhdGUgPSBhd2FpdCB2aXNpYmxlV2luZG93LmdldFN0YXRlKCk7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93U3RhdGUgPT09IFwibWluaW1pemVkXCIpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdmlzaWJsZVdpbmRvdy5yZXN0b3JlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhd2FpdCB2aXNpYmxlV2luZG93LmJyaW5nVG9Gcm9udCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzRW1wdHkod2luZG93SW5pdGlhdG9yKSkge1xuXHRcdFx0XHRcdGF3YWl0IHdpbmRvd0luaXRpYXRvci5zZXRBc0ZvcmVncm91bmQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJ3aW5kb3ctaGlkZS1hbGxcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0Y29uc3QgdXNlcldpbmRvd3MgPSBhd2FpdCBnZXRBbGxVc2VyV2luZG93cygpO1xuXHRcdFx0Zm9yIChjb25zdCB1c2VyV2luZG93IG9mIHVzZXJXaW5kb3dzKSB7XG5cdFx0XHRcdGF3YWl0IHVzZXJXaW5kb3cubWluaW1pemUoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wid2luZG93LWhpZGUtb3RoZXJzXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0cGF5bG9hZC5jYWxsZXJUeXBlICE9PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLkFQSSAmJlxuXHRcdFx0XHRwYXlsb2FkLmNhbGxlclR5cGUgIT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuU2F2ZUJ1dHRvbkNvbnRleHRNZW51XG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgdXNlcldpbmRvd3MgPSBhd2FpdCBnZXRBbGxVc2VyV2luZG93cygpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHVzZXJXaW5kb3cgb2YgdXNlcldpbmRvd3MpIHtcblx0XHRcdFx0XHRpZiAodXNlcldpbmRvdy5pZGVudGl0eS5uYW1lICE9PSBwYXlsb2FkLndpbmRvd0lkZW50aXR5Lm5hbWUpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHVzZXJXaW5kb3cubWluaW1pemUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG4vKipcbiAqIEdldCBhbGwgdXNlciB3aW5kb3dzIGFuZCBub3QgaGlkZGVuL2JhY2tncm91bmQgd2luZG93cy5cbiAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGFsbCB1c2VyIHdpbmRvd3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxVc2VyV2luZG93cygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93W10+IHtcblx0Y29uc3QgcGxhdGZvcm0gPSBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtcblx0Y29uc3Qgd2luZG93cyA9IGF3YWl0IHBsYXRmb3JtLkFwcGxpY2F0aW9uLmdldENoaWxkV2luZG93cygpO1xuXHRjb25zdCBhdmFpbGFibGVXaW5kb3dzOiBPcGVuRmluLldpbmRvd1tdID0gW107XG5cdGZvciAoY29uc3QgY3VycmVudFdpbmRvdyBvZiB3aW5kb3dzKSB7XG5cdFx0Y29uc3QgaXNTaG93aW5nID0gYXdhaXQgY3VycmVudFdpbmRvdy5pc1Nob3dpbmcoKTtcblx0XHRpZiAoaXNTaG93aW5nKSB7XG5cdFx0XHRhdmFpbGFibGVXaW5kb3dzLnB1c2goY3VycmVudFdpbmRvdyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyBtaW5pbWl6ZWQgYXMgaXNTaG93aW5nIG9ubHkgY291bnRzIHdpbmRvd3MgdGhhdFxuXHRcdFx0Ly8gYXJlIG9uIHRoZSBkZXNrdG9wIGluIGEgdmlzaWJsZSBzZW5zZSBhbmQgbm90IGhpZGRlbiBvciBtaW5pbWl6ZWQgKGZyb20gdjMyKVxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBhd2FpdCBjdXJyZW50V2luZG93LmdldFN0YXRlKCk7XG5cdFx0XHRpZiAoc3RhdGUgPT09IFwibWluaW1pemVkXCIpIHtcblx0XHRcdFx0YXZhaWxhYmxlV2luZG93cy5wdXNoKGN1cnJlbnRXaW5kb3cpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXZhaWxhYmxlV2luZG93cztcbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRNZW51RW50cnksXG5cdE1lbnVUeXBlLFxuXHRNZW51cyxcblx0UmVsYXRlZE1lbnVJZFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IGdldEFsbFVzZXJXaW5kb3dzIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgdHlwZSB7IFdpbmRvd01lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dNZW51cyBpbXBsZW1lbnRzIE1lbnVzPFdpbmRvd01lbnVTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzPzogV2luZG93TWVudVNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFdpbmRvd01lbnVTZXR0aW5ncz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJXaW5kb3dNZW51c1wiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gcmVsYXRlZE1lbnVJZCBUaGUgcmVsYXRlZCBtZW51IGluZm9ybWF0aW9uICh2aWV3SWQvdmlld0lkcywgcGFnZUlkIGFuZCB3aW5kb3cgSWQgYmFzZWQgb24gdGhlIHR5cGUgb2YgbWVudSkuXG5cdCAqIEByZXR1cm5zIFRoZSBtZW51IGVudHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KFxuXHRcdG1lbnVUeXBlOiBNZW51VHlwZSxcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0cmVsYXRlZE1lbnVJZD86IFJlbGF0ZWRNZW51SWRcblx0KTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIiAmJiAhaXNFbXB0eShyZWxhdGVkTWVudUlkPy53aW5kb3dJZGVudGl0eSkpIHtcblx0XHRcdC8vIHlvdSBjYW4gY3VzdG9taXplIHRoZSBicm93c2VyIG1haW4gbWVudSBoZXJlXG5cdFx0XHRjb25zdCBpbmNsdWRlU2hvd0FsbFdpbmRvd3MgPVxuXHRcdFx0XHRpc0VtcHR5KHRoaXMuX3NldHRpbmdzPy5zaG93QWxsV2luZG93cz8uaW5jbHVkZSkgfHwgdGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5pbmNsdWRlO1xuXHRcdFx0Y29uc3QgaW5jbHVkZUhpZGVBbGxXaW5kb3dzID1cblx0XHRcdFx0aXNFbXB0eSh0aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/LmluY2x1ZGUpIHx8IHRoaXMuX3NldHRpbmdzPy5oaWRlQWxsV2luZG93cz8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IGluY2x1ZGVIaWRlT3RoZXJXaW5kb3dzID1cblx0XHRcdFx0aXNFbXB0eSh0aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8uaW5jbHVkZSkgfHwgdGhpcy5fc2V0dGluZ3M/LmhpZGVPdGhlcldpbmRvd3M/LmluY2x1ZGU7XG5cblx0XHRcdGNvbnN0IHVzZXJXaW5kb3dzID0gYXdhaXQgZ2V0QWxsVXNlcldpbmRvd3MoKTtcblxuXHRcdFx0Y29uc3Qgc2hvd0FsbFdpbmRvd3NFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LnNob3dBbGxXaW5kb3dzPy5tZW51TGFiZWwgPz8gXCJTaG93IEFsbCBXaW5kb3dzXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5zaG93QWxsV2luZG93cz8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHVzZXJXaW5kb3dzLmxlbmd0aCA+IDEsXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDbG9zZVdpbmRvd1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uc2hvd0FsbFdpbmRvd3M/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdGlkOiBcIndpbmRvdy1zaG93LWFsbFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBoaWRlQWxsV2luZG93c0VudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uaGlkZUFsbFdpbmRvd3M/Lm1lbnVMYWJlbCA/PyBcIkhpZGUgQWxsIFdpbmRvd3NcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmhpZGVBbGxXaW5kb3dzPy5tZW51SWNvbixcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIkNsb3NlV2luZG93XCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImJlZm9yZVwiLFxuXHRcdFx0XHRcdC4uLnRoaXMuX3NldHRpbmdzPy5oaWRlQWxsV2luZG93cz8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwid2luZG93LWhpZGUtYWxsXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGhpZGVPdGhlcldpbmRvd3NFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LmhpZGVPdGhlcldpbmRvd3M/Lm1lbnVMYWJlbCA/PyBcIkhpZGUgT3RoZXIgV2luZG93c1wiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHVzZXJXaW5kb3dzLmxlbmd0aCA+IDEsXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJDbG9zZVdpbmRvd1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uaGlkZU90aGVyV2luZG93cz8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwid2luZG93LWhpZGUtb3RoZXJzXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IG1lbnVJdGVtc1RvUmV0dXJuOiBNZW51RW50cnlbXSA9IFtdO1xuXG5cdFx0XHRpZiAoaW5jbHVkZVNob3dBbGxXaW5kb3dzKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goc2hvd0FsbFdpbmRvd3NFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbmNsdWRlSGlkZUFsbFdpbmRvd3MpIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChoaWRlQWxsV2luZG93c0VudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluY2x1ZGVIaWRlT3RoZXJXaW5kb3dzKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goaGlkZU90aGVyV2luZG93c0VudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3NldHRpbmdzPy5zZXBhcmF0b3IgIT09IFwibm9uZVwiICYmIG1lbnVJdGVtc1RvUmV0dXJuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm5bMF0uc2VwYXJhdG9yID0gdGhpcy5fc2V0dGluZ3M/LnNlcGFyYXRvciA/PyBcImJlZm9yZVwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWVudUl0ZW1zVG9SZXR1cm47XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBXaW5kb3dBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgV2luZG93TWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IFdpbmRvd0FjdGlvbnMoKSxcblx0bWVudXM6IG5ldyBXaW5kb3dNZW51cygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9