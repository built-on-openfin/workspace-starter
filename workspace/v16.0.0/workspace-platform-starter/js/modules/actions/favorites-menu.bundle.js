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

/***/ "./client/src/framework/shapes/favorite-shapes.ts":
/*!********************************************************!*\
  !*** ./client/src/framework/shapes/favorite-shapes.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FAVORITE_TYPE_NAME_APP: () => (/* binding */ FAVORITE_TYPE_NAME_APP),
/* harmony export */   FAVORITE_TYPE_NAME_PAGE: () => (/* binding */ FAVORITE_TYPE_NAME_PAGE),
/* harmony export */   FAVORITE_TYPE_NAME_QUERY: () => (/* binding */ FAVORITE_TYPE_NAME_QUERY),
/* harmony export */   FAVORITE_TYPE_NAME_WORKSPACE: () => (/* binding */ FAVORITE_TYPE_NAME_WORKSPACE)
/* harmony export */ });
/**
 * Favorite type for App.
 */
const FAVORITE_TYPE_NAME_APP = "app";
/**
 * Favorite type for Workspace.
 */
const FAVORITE_TYPE_NAME_WORKSPACE = "workspace";
/**
 * Favorite type for Page.
 */
const FAVORITE_TYPE_NAME_PAGE = "page";
/**
 * Favorite type for Query.
 */
const FAVORITE_TYPE_NAME_QUERY = "query";


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
        return content.replace(/<[^>]*>?/gm, "");
    }
    return content;
}


/***/ }),

/***/ "./client/src/modules/actions/favorites-menu/actions.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/actions/favorites-menu/actions.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FavoritesMenuProvider: () => (/* binding */ FavoritesMenuProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/shapes/favorite-shapes */ "./client/src/framework/shapes/favorite-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");



/**
 * Implementation for the favorites menu actions provider.
 */
class FavoritesMenuProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("FavoritesMenuProvider");
        this._helpers = helpers;
        this._settings = definition.data;
        this._logger.info("Initializing");
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["favorites-menu"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.CustomButton && this._helpers) {
                const getClient = this._helpers?.getFavoriteClient;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(getClient)) {
                    const client = await getClient();
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(client)) {
                        const favInfo = client.getInfo();
                        const menuEntries = [];
                        if (favInfo.enabledTypes) {
                            let hadEntries = false;
                            for (const type of favInfo.enabledTypes) {
                                const saved = await client.getSavedFavorites(type);
                                if (saved && saved.length > 0) {
                                    if (hadEntries) {
                                        menuEntries.push({ type: "separator" });
                                    }
                                    saved.sort((f1, f2) => (f1.label ?? "").localeCompare(f2.label ?? ""));
                                    for (const entry of saved) {
                                        menuEntries.push({
                                            label: entry.label ?? "",
                                            icon: entry.icon,
                                            data: entry
                                        });
                                    }
                                    hadEntries = true;
                                }
                            }
                        }
                        const menuClient = await this._helpers.getMenuClient();
                        const popupMenuStyle = this._settings?.popupMenuStyle ?? menuClient.getPopupMenuStyle();
                        const result = await menuClient.showPopupMenu({ x: payload.x, y: 48 }, payload.windowIdentity, "There are no favorites", menuEntries, {
                            popupMenuStyle
                        });
                        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(result)) {
                            this._logger?.info("Favorites Menu Dismissed");
                        }
                        else {
                            this._logger?.info("Favorites Menu Item Selected", result);
                            if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_APP) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchApp)) {
                                    await this._helpers?.launchApp(result.typeId);
                                }
                            }
                            else if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_PAGE) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchPage)) {
                                    await this._helpers?.launchPage(result.typeId, undefined, this._logger);
                                }
                            }
                            else if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_WORKSPACE) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchWorkspace)) {
                                    await this._helpers?.launchWorkspace(result.typeId);
                                }
                            }
                            else {
                                this._logger?.info(`Favorites Type ${result.type} no yet supported`, result);
                            }
                        }
                    }
                }
            }
        };
        return actionMap;
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
/*!************************************************************!*\
  !*** ./client/src/modules/actions/favorites-menu/index.ts ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/actions/favorites-menu/actions.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.FavoritesMenuProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksMkRBQXFCLEVBQUU7Q0FDcEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9hY3Rpb25zLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2Zhdm9yaXRlcy1tZW51L2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2FjdGlvbnMvZmF2b3JpdGVzLW1lbnUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCJpbXBvcnQgdHlwZSB7IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhIH0gZnJvbSBcIi4vcGxhdGZvcm0tc2hhcGVzXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgQXBwLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCA9IFwiYXBwXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgV29ya3NwYWNlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSA9IFwid29ya3NwYWNlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUGFnZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFID0gXCJwYWdlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUXVlcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUVVFUlkgPSBcInF1ZXJ5XCI7XG5cbi8qKlxuICogTmFtZXMgZm9yIGFsbCB0aGUgZmF2b3JpdGUgdHlwZXMuXG4gKi9cbmV4cG9ydCB0eXBlIEZhdm9yaXRlVHlwZU5hbWVzID1cblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUFxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgZmF2b3JpdGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVQcm92aWRlck9wdGlvbnMge1xuXHQvKipcblx0ICogSXMgdGhlIHByb3ZpZGVyIGVuYWJsZWQsIGRlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRlbmFibGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGljb24gdGhhdCBzaG91bGQgYmUgdXNlZCBpZiB5b3Ugd2FudCB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgZmF2b3JpdGUgYWN0aW9uXG5cdCAqL1xuXHRmYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGljb24gdG8gdXNlIHRvIGluZGljYXRlIHRoYXQgdGhpcyBmYXZvcml0ZSBjYW4gYmUgdW5zZXRcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgY29tbWFuZHMgc2hvdWxkIGludGVncmF0aW9ucyBjaGVjayBmb3IgaWYgdGhleSBpbnRlbnQgdG8gc3VwcG9ydCB0aGUgZGlzcGxheSBvZiBmYXZvcml0ZXNcblx0ICovXG5cdGZhdm9yaXRlQ29tbWFuZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGNvbm5lY3Rpb24gcHJvdmlkZXIgY2FuIGhhdmUgYWN0aW9ucyByZWdpc3RlcmVkIGFnYWluc3QgaXQgZnJvbSB0aGUgcGxhdGZvcm0uIFRoaXMgcHJvdmlkZXMgYSBkZWZhdWx0IGxpc3Qgb2Zcblx0ICogYWN0aW9ucyB0aGF0IGNvbm5lY3Rpb25zIHNob3VsZCBiZSBhYmxlIHRvIHVzZSBpZiBhY3Rpb25zIGFyZSBlbmFibGVkIGZvciB0aGF0IGNvbm5lY3Rpb24uXG5cdCAqL1xuXHRzdXBwb3J0ZWRGYXZvcml0ZVR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcbn1cblxuLyoqXG4gKiBXaGVuIGFuIGVudHJ5IGlzIG1hZGUgaXQgcmVwcmVzZW50cyBhIHR5cGUgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm0uIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9va3VwIGFuZCBsYXVuY2ggdGhlIHRoaW5nIHRoaXMgZW50cnkgcmVmZXJzIHRvLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogQSB1bmlxdWUgZ3VpZCB0byByZXByZXNlbnQgdGhpcyBmYXZvcml0ZSBlbnRyeSBzbyB0aGF0IGl0IGNhbiBiZSB1cGRhdGVkIG9yIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBmb3IgdGhlIGZhdm9yaXRlIHR5cGUgdGhpcyBlbnRyeSByZXByZXNlbnRzXG5cdCAqL1xuXHR0eXBlSWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCB0eXBlIG9mIGZhdm9yaXRlIGVudHJ5IGRvZXMgdGhpcyBlbnRyeSByZXByZXNlbnRcblx0ICovXG5cdHR5cGU6IEZhdm9yaXRlVHlwZU5hbWVzO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGltZXN0YW1wIGZvciB0aGUgZW50cnkuXG5cdCAqL1xuXHR0aW1lc3RhbXA/OiBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBsYWJlbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRsYWJlbD86IHN0cmluZztcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRpY29uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEluZm8gdG8gcmV0dXJuIHRvIGludGVyZXN0ZWQgcGFydGllcyB0byBoZWxwIHRoZW0gc3VwcG9ydCBmYXZvcml0ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUluZm8ge1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIGZhdm9yaXRlXG5cdCAqL1xuXHRmYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gcmVtb3ZlIHRoaXMgZmF2b3JpdGVcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogQSBjb21tYW5kIHRoYXQgc3VwcG9ydGluZyBtb2R1bGVzIHNob3VsZCBsaXN0ZW4gZm9yIGlmIHRoZXkgYXJlIHRvIGRpc3BsYXkgZmF2b3JpdGVzIHRoYXQgZmFsbCB1bmRlciB0aGVtXG5cdCAqL1xuXHRjb21tYW5kPzogc3RyaW5nO1xuXHQvKipcblx0ICogV2hhdCB0eXBlcyBvZiBmYXZvcml0ZSBpdGVtIGFyZSBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybSwgdGhpcyBhbHNvIGRldGVybWluZXMgdGhlIG9yZGVyaW5nIGluIHRoZSBkb2NrIG1lbnUuXG5cdCAqL1xuXHRlbmFibGVkVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xuXHQvKipcblx0ICogSXMgZmF2b3JpdGUgc3VwcG9ydCBlbmFibGVkIG9uIHRoaXMgcGxhdGZvcm0uXG5cdCAqL1xuXHRpc0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBjbGllbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFjY2VzcyB0byBzb21lIG9yIGFsbCBvZiB0aGUgZmF2b3JpdGUgZnVuY3Rpb25hbGl0eVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlQ2xpZW50IHtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3Qgc3VwcG9ydGluZyBpbmZvcm1hdGlvbiBhYm91dCB3aGV0aGVyIGZhdm9yaXRlcyBhcmUgaW5pdGlhbGl6ZWQgZm9yIHRoZSBwbGF0Zm9ybSBhbmQgc3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMgU3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICovXG5cdGdldEluZm8oKTogRmF2b3JpdGVJbmZvO1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhbGwgKG9yIHNvbWUgaWYgYnkgdHlwZSkgb2YgdGhlIHNhdmVkIGZhdm9yaXRlc1xuXHQgKiBAcGFyYW0gYnlUeXBlIHRoZSB0eXBlIG9mIHNhdmVkIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc2F2ZWQgZmF2b3JpdGVzIG9yIGFuIGVtcHR5IGFycmF5IGlmIGl0IHdhcyB1bmFibGUgdG8gZ2V0IGFueSBiYWNrXG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlcyhieVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYSBwYXJ0aWN1bGFyIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIHRoZSBzYXZlZCBmYXZvcml0ZSBpZiBhdmFpbGFibGUgb3IgZmFsc2UgaWYgaXQgZGlkbid0IGV4aXN0XG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPEZhdm9yaXRlRW50cnkgfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gc2F2ZSBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGUgdGhlIEZhdm9yaXRlIHlvdSB3aXNoIHRvIHNhdmVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBzYXZlZFxuXHQgKi9cblx0c2V0U2F2ZWRGYXZvcml0ZT8oZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVtb3ZlL2RlbGV0ZSBhIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB0byBkZWxldGVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBkZWxldGVkLlxuXHQgKi9cblx0ZGVsZXRlU2F2ZWRGYXZvcml0ZT8oaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZhdm9yaXRlIGFuZCBtZXRhIGRhdGEgcmVsYXRlZCB0byBpdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBJbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSBwbGF0Zm9ybSBwcm92aWRpbmcgdGhlIHBheWxvYWQuXG5cdCAqL1xuXHRtZXRhRGF0YTogUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGE7XG5cdC8qKlxuXHQgKiBUaGUgZmF2b3JpdGUgZW50cnlcblx0ICovXG5cdHBheWxvYWQ6IEZhdm9yaXRlRW50cnk7XG59XG5cbi8qKlxuICogQSByZXF1ZXN0IHR5cGUgZm9yIHRoZSBGYXZvcml0ZUVuZHBvaW50IHRoYXQgZ2V0cyBhbGwgc2F2ZWQgZmF2b3JpdGUgZW50cmllc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB0eXBlIGlmIHNwZWNpZmllZCBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgdGhlIHJlc3BvbnNlIHRvIG9ubHkgc2VuZCB0aGUgZW50cmllcyB0aGF0IGFyZSByZWxldmFudFxuXHQgKi9cblx0ZmF2b3JpdGVUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXM7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBmYXZvcml0ZXMgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2Uge1xuXHQvKipcblx0ICogVGhlIGxpc3Qgb2YgZmF2b3JpdGUgZW50cmllcyB3aXRoIGluZm9ybWF0aW9uIG9mIHdoYXQgcGxhdGZvcm0gdmVyc2lvbnMgdGhleSB3ZXJlIG9yaWdpbmFsbHkgc2F2ZWQgYWdhaW5zdFxuXHQgKi9cblx0ZW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W107XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGhhcyBiZWVuIHNhdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgYSBzcGVjaWZpYyBmYXZvcml0ZSB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCB0eXBlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSA9IEVuZHBvaW50RmF2b3JpdGVFbnRyeTtcblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QgZXh0ZW5kcyBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgc2V0XG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciByZW1vdmluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsIHR5cGUgQWN0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB7XG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAsXG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFLFxuXHRGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFLFxuXHR0eXBlIEZhdm9yaXRlRW50cnlcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFBvcHVwTWVudUVudHJ5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgZmF2b3JpdGVzIG1lbnUgYWN0aW9ucyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZhdm9yaXRlc01lbnVQcm92aWRlciBpbXBsZW1lbnRzIEFjdGlvbnM8RmF2b3JpdGVzTWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIG1lbnUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxGYXZvcml0ZXNNZW51U2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRmF2b3JpdGVzTWVudVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wiZmF2b3JpdGVzLW1lbnVcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5DdXN0b21CdXR0b24gJiYgdGhpcy5faGVscGVycykge1xuXHRcdFx0XHRjb25zdCBnZXRDbGllbnQgPSB0aGlzLl9oZWxwZXJzPy5nZXRGYXZvcml0ZUNsaWVudDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KGdldENsaWVudCkpIHtcblx0XHRcdFx0XHRjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY2xpZW50KSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2SW5mbyA9IGNsaWVudC5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBtZW51RW50cmllczogUG9wdXBNZW51RW50cnk8RmF2b3JpdGVFbnRyeT5bXSA9IFtdO1xuXG5cdFx0XHRcdFx0XHRpZiAoZmF2SW5mby5lbmFibGVkVHlwZXMpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGhhZEVudHJpZXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCB0eXBlIG9mIGZhdkluZm8uZW5hYmxlZFR5cGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBjbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXModHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNhdmVkICYmIHNhdmVkLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChoYWRFbnRyaWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLnB1c2goeyB0eXBlOiBcInNlcGFyYXRvclwiIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlZC5zb3J0KChmMSwgZjIpID0+IChmMS5sYWJlbCA/PyBcIlwiKS5sb2NhbGVDb21wYXJlKGYyLmxhYmVsID8/IFwiXCIpKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBzYXZlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZW51RW50cmllcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogZW50cnkubGFiZWwgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBlbnRyeS5pY29uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IGVudHJ5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aGFkRW50cmllcyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1lbnVDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldE1lbnVDbGllbnQoKTtcblx0XHRcdFx0XHRcdGNvbnN0IHBvcHVwTWVudVN0eWxlID0gdGhpcy5fc2V0dGluZ3M/LnBvcHVwTWVudVN0eWxlID8/IG1lbnVDbGllbnQuZ2V0UG9wdXBNZW51U3R5bGUoKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgbWVudUNsaWVudC5zaG93UG9wdXBNZW51PEZhdm9yaXRlRW50cnk+KFxuXHRcdFx0XHRcdFx0XHR7IHg6IHBheWxvYWQueCwgeTogNDggfSxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC53aW5kb3dJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XCJUaGVyZSBhcmUgbm8gZmF2b3JpdGVzXCIsXG5cdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cG9wdXBNZW51U3R5bGVcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBEaXNtaXNzZWRcIik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBJdGVtIFNlbGVjdGVkXCIsIHJlc3VsdCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfQVBQKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcChyZXN1bHQudHlwZUlkKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFBhZ2UpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKHJlc3VsdC50eXBlSWQsIHVuZGVmaW5lZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKHJlc3VsdC50eXBlSWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYEZhdm9yaXRlcyBUeXBlICR7cmVzdWx0LnR5cGV9IG5vIHlldCBzdXBwb3J0ZWRgLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEZhdm9yaXRlc01lbnVQcm92aWRlciB9IGZyb20gXCIuL2FjdGlvbnNcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBGYXZvcml0ZXNNZW51UHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==