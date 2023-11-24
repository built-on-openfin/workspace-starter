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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDckQsQ0FBQzs0QkFDRixDQUFDO2lDQUFNLENBQUM7Z0NBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUM5RSxDQUFDO3dCQUNGLENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGLE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7Q0FDRDs7Ozs7OztTQzVJRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTGtEO0FBRWxEOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLDJEQUFxQixFQUFFO0NBQ3BDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYWN0aW9ucy9mYXZvcml0ZXMtbWVudS9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2Zhdm9yaXRlcy1tZW51L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YSB9IGZyb20gXCIuL3BsYXRmb3JtLXNoYXBlc1wiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIEFwcC5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAgPSBcImFwcFwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgPSBcIndvcmtzcGFjZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFBhZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUEFHRSA9IFwicGFnZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFF1ZXJ5LlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZID0gXCJxdWVyeVwiO1xuXG4vKipcbiAqIE5hbWVzIGZvciBhbGwgdGhlIGZhdm9yaXRlIHR5cGVzLlxuICovXG5leHBvcnQgdHlwZSBGYXZvcml0ZVR5cGVOYW1lcyA9XG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9BUFBcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUEFHRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUVVFUlk7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgdGhlIGZhdm9yaXRlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlUHJvdmlkZXJPcHRpb25zIHtcblx0LyoqXG5cdCAqIElzIHRoZSBwcm92aWRlciBlbmFibGVkLCBkZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0ZW5hYmxlZD86IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgeW91IHdhbnQgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIGZhdm9yaXRlIGFjdGlvblxuXHQgKi9cblx0ZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRvIHVzZSB0byBpbmRpY2F0ZSB0aGF0IHRoaXMgZmF2b3JpdGUgY2FuIGJlIHVuc2V0XG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IGNvbW1hbmRzIHNob3VsZCBpbnRlZ3JhdGlvbnMgY2hlY2sgZm9yIGlmIHRoZXkgaW50ZW50IHRvIHN1cHBvcnQgdGhlIGRpc3BsYXkgb2YgZmF2b3JpdGVzXG5cdCAqL1xuXHRmYXZvcml0ZUNvbW1hbmQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25uZWN0aW9uIHByb3ZpZGVyIGNhbiBoYXZlIGFjdGlvbnMgcmVnaXN0ZXJlZCBhZ2FpbnN0IGl0IGZyb20gdGhlIHBsYXRmb3JtLiBUaGlzIHByb3ZpZGVzIGEgZGVmYXVsdCBsaXN0IG9mXG5cdCAqIGFjdGlvbnMgdGhhdCBjb25uZWN0aW9ucyBzaG91bGQgYmUgYWJsZSB0byB1c2UgaWYgYWN0aW9ucyBhcmUgZW5hYmxlZCBmb3IgdGhhdCBjb25uZWN0aW9uLlxuXHQgKi9cblx0c3VwcG9ydGVkRmF2b3JpdGVUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG59XG5cbi8qKlxuICogV2hlbiBhbiBlbnRyeSBpcyBtYWRlIGl0IHJlcHJlc2VudHMgYSB0eXBlIHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvb2t1cCBhbmQgbGF1bmNoIHRoZSB0aGluZyB0aGlzIGVudHJ5IHJlZmVycyB0by5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEEgdW5pcXVlIGd1aWQgdG8gcmVwcmVzZW50IHRoaXMgZmF2b3JpdGUgZW50cnkgc28gdGhhdCBpdCBjYW4gYmUgdXBkYXRlZCBvciByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgZm9yIHRoZSBmYXZvcml0ZSB0eXBlIHRoaXMgZW50cnkgcmVwcmVzZW50c1xuXHQgKi9cblx0dHlwZUlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgdHlwZSBvZiBmYXZvcml0ZSBlbnRyeSBkb2VzIHRoaXMgZW50cnkgcmVwcmVzZW50XG5cdCAqL1xuXHR0eXBlOiBGYXZvcml0ZVR5cGVOYW1lcztcblxuXHQvKipcblx0ICogVGhlIHRpbWVzdGFtcCBmb3IgdGhlIGVudHJ5LlxuXHQgKi9cblx0dGltZXN0YW1wPzogRGF0ZTtcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgbGFiZWwgdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0bGFiZWw/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0aWNvbj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbmZvIHRvIHJldHVybiB0byBpbnRlcmVzdGVkIHBhcnRpZXMgdG8gaGVscCB0aGVtIHN1cHBvcnQgZmF2b3JpdGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVJbmZvIHtcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byBmYXZvcml0ZVxuXHQgKi9cblx0ZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIHJlbW92ZSB0aGlzIGZhdm9yaXRlXG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIEEgY29tbWFuZCB0aGF0IHN1cHBvcnRpbmcgbW9kdWxlcyBzaG91bGQgbGlzdGVuIGZvciBpZiB0aGV5IGFyZSB0byBkaXNwbGF5IGZhdm9yaXRlcyB0aGF0IGZhbGwgdW5kZXIgdGhlbVxuXHQgKi9cblx0Y29tbWFuZD86IHN0cmluZztcblx0LyoqXG5cdCAqIFdoYXQgdHlwZXMgb2YgZmF2b3JpdGUgaXRlbSBhcmUgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0sIHRoaXMgYWxzbyBkZXRlcm1pbmVzIHRoZSBvcmRlcmluZyBpbiB0aGUgZG9jayBtZW51LlxuXHQgKi9cblx0ZW5hYmxlZFR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcblx0LyoqXG5cdCAqIElzIGZhdm9yaXRlIHN1cHBvcnQgZW5hYmxlZCBvbiB0aGlzIHBsYXRmb3JtLlxuXHQgKi9cblx0aXNFbmFibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY2xpZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gc29tZSBvciBhbGwgb2YgdGhlIGZhdm9yaXRlIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUNsaWVudCB7XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IHN1cHBvcnRpbmcgaW5mb3JtYXRpb24gYWJvdXQgd2hldGhlciBmYXZvcml0ZXMgYXJlIGluaXRpYWxpemVkIGZvciB0aGUgcGxhdGZvcm0gYW5kIHN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIFN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRnZXRJbmZvKCk6IEZhdm9yaXRlSW5mbztcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYWxsIChvciBzb21lIGlmIGJ5IHR5cGUpIG9mIHRoZSBzYXZlZCBmYXZvcml0ZXNcblx0ICogQHBhcmFtIGJ5VHlwZSB0aGUgdHlwZSBvZiBzYXZlZCBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHNhdmVkIGZhdm9yaXRlcyBvciBhbiBlbXB0eSBhcnJheSBpZiBpdCB3YXMgdW5hYmxlIHRvIGdldCBhbnkgYmFja1xuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZXMoYnlUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXMpOiBQcm9taXNlPEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGEgcGFydGljdWxhciBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyB0aGUgc2F2ZWQgZmF2b3JpdGUgaWYgYXZhaWxhYmxlIG9yIGZhbHNlIGlmIGl0IGRpZG4ndCBleGlzdFxuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5IHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHNhdmUgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGZhdm9yaXRlIHRoZSBGYXZvcml0ZSB5b3Ugd2lzaCB0byBzYXZlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgc2F2ZWRcblx0ICovXG5cdHNldFNhdmVkRmF2b3JpdGU/KGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5KTogUHJvbWlzZTxib29sZWFuPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlbW92ZS9kZWxldGUgYSBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgdG8gZGVsZXRlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgZGVsZXRlZC5cblx0ICovXG5cdGRlbGV0ZVNhdmVkRmF2b3JpdGU/KGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmYXZvcml0ZSBhbmQgbWV0YSBkYXRhIHJlbGF0ZWQgdG8gaXRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogSW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgcGxhdGZvcm0gcHJvdmlkaW5nIHRoZSBwYXlsb2FkLlxuXHQgKi9cblx0bWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhO1xuXHQvKipcblx0ICogVGhlIGZhdm9yaXRlIGVudHJ5XG5cdCAqL1xuXHRwYXlsb2FkOiBGYXZvcml0ZUVudHJ5O1xufVxuXG4vKipcbiAqIEEgcmVxdWVzdCB0eXBlIGZvciB0aGUgRmF2b3JpdGVFbmRwb2ludCB0aGF0IGdldHMgYWxsIHNhdmVkIGZhdm9yaXRlIGVudHJpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBpZiBzcGVjaWZpZWQgc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHRoZSByZXNwb25zZSB0byBvbmx5IHNlbmQgdGhlIGVudHJpZXMgdGhhdCBhcmUgcmVsZXZhbnRcblx0ICovXG5cdGZhdm9yaXRlVHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgZmF2b3JpdGVzIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHtcblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIGZhdm9yaXRlIGVudHJpZXMgd2l0aCBpbmZvcm1hdGlvbiBvZiB3aGF0IHBsYXRmb3JtIHZlcnNpb25zIHRoZXkgd2VyZSBvcmlnaW5hbGx5IHNhdmVkIGFnYWluc3Rcblx0ICovXG5cdGVudHJpZXM6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBoYXMgYmVlbiBzYXZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGEgc3BlY2lmaWMgZmF2b3JpdGUgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgdHlwZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UgPSBFbmRwb2ludEZhdm9yaXRlRW50cnk7XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IGV4dGVuZHMgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHNldFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgcmVtb3ZpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVSZW1vdmVSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsIHR5cGUgQWN0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB7XG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAsXG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFLFxuXHRGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFLFxuXHR0eXBlIEZhdm9yaXRlRW50cnlcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9mYXZvcml0ZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFBvcHVwTWVudUVudHJ5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgZmF2b3JpdGVzIG1lbnUgYWN0aW9ucyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZhdm9yaXRlc01lbnVQcm92aWRlciBpbXBsZW1lbnRzIEFjdGlvbnM8RmF2b3JpdGVzTWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIG1lbnUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxGYXZvcml0ZXNNZW51U2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRmF2b3JpdGVzTWVudVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wiZmF2b3JpdGVzLW1lbnVcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5DdXN0b21CdXR0b24gJiYgdGhpcy5faGVscGVycykge1xuXHRcdFx0XHRjb25zdCBnZXRDbGllbnQgPSB0aGlzLl9oZWxwZXJzPy5nZXRGYXZvcml0ZUNsaWVudDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KGdldENsaWVudCkpIHtcblx0XHRcdFx0XHRjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY2xpZW50KSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2SW5mbyA9IGNsaWVudC5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBtZW51RW50cmllczogUG9wdXBNZW51RW50cnk8RmF2b3JpdGVFbnRyeT5bXSA9IFtdO1xuXG5cdFx0XHRcdFx0XHRpZiAoZmF2SW5mby5lbmFibGVkVHlwZXMpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGhhZEVudHJpZXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCB0eXBlIG9mIGZhdkluZm8uZW5hYmxlZFR5cGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBjbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXModHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNhdmVkICYmIHNhdmVkLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChoYWRFbnRyaWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLnB1c2goeyB0eXBlOiBcInNlcGFyYXRvclwiIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlZC5zb3J0KChmMSwgZjIpID0+IChmMS5sYWJlbCA/PyBcIlwiKS5sb2NhbGVDb21wYXJlKGYyLmxhYmVsID8/IFwiXCIpKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBzYXZlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZW51RW50cmllcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogZW50cnkubGFiZWwgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBlbnRyeS5pY29uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IGVudHJ5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aGFkRW50cmllcyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1lbnVDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldE1lbnVDbGllbnQoKTtcblx0XHRcdFx0XHRcdGNvbnN0IHBvcHVwTWVudVN0eWxlID0gdGhpcy5fc2V0dGluZ3M/LnBvcHVwTWVudVN0eWxlID8/IG1lbnVDbGllbnQuZ2V0UG9wdXBNZW51U3R5bGUoKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgbWVudUNsaWVudC5zaG93UG9wdXBNZW51PEZhdm9yaXRlRW50cnk+KFxuXHRcdFx0XHRcdFx0XHR7IHg6IHBheWxvYWQueCwgeTogNDggfSxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC53aW5kb3dJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XCJUaGVyZSBhcmUgbm8gZmF2b3JpdGVzXCIsXG5cdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cG9wdXBNZW51U3R5bGVcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBEaXNtaXNzZWRcIik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBJdGVtIFNlbGVjdGVkXCIsIHJlc3VsdCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfQVBQKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcChyZXN1bHQudHlwZUlkKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFBhZ2UpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKHJlc3VsdC50eXBlSWQsIHVuZGVmaW5lZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKHJlc3VsdC50eXBlSWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYEZhdm9yaXRlcyBUeXBlICR7cmVzdWx0LnR5cGV9IG5vIHlldCBzdXBwb3J0ZWRgLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEZhdm9yaXRlc01lbnVQcm92aWRlciB9IGZyb20gXCIuL2FjdGlvbnNcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBGYXZvcml0ZXNNZW51UHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==