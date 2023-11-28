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

/***/ "./client/src/modules/composite/include-in-snapshot/actions.ts":
/*!*********************************************************************!*\
  !*** ./client/src/modules/composite/include-in-snapshot/actions.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncludeInSnapshotActionsProvider: () => (/* binding */ IncludeInSnapshotActionsProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Implementation for the include in snapshot actions provider.
 */
class IncludeInSnapshotActionsProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("IncludeInSnapshotActionsProvider");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["include-in-snapshot"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.CustomButton) {
                this._logger?.info("Including in snapshot", payload.windowIdentity);
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                const options = await browserWindow.openfinWindow.getOptions();
                const createRequest = options;
                if (createRequest.workspacePlatform.windowType !== "platform") {
                    const currentToolbarOptions = createRequest.workspacePlatform.toolbarOptions;
                    await browserWindow.openfinWindow.updateOptions({ includeInSnapshots: true });
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(currentToolbarOptions) && this._helpers?.updateToolbarButtons) {
                        const newButtons = await this._helpers.updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId, payload.customData.replacementId);
                        await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                    }
                }
            }
        };
        actionMap["remove-from-snapshot"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.CustomButton) {
                this._logger?.info("Removing from snapshot", payload.windowIdentity);
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                const options = await browserWindow.openfinWindow.getOptions();
                const createRequest = options;
                if (createRequest.workspacePlatform.windowType !== "platform") {
                    const currentToolbarOptions = createRequest.workspacePlatform.toolbarOptions;
                    await browserWindow.openfinWindow.updateOptions({ includeInSnapshots: false });
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(currentToolbarOptions) && this._helpers?.updateToolbarButtons) {
                        const newButtons = await this._helpers.updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId, payload.customData.replacementId);
                        await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                    }
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/include-in-snapshot/conditions.ts":
/*!************************************************************************!*\
  !*** ./client/src/modules/composite/include-in-snapshot/conditions.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncludeInSnapshotConditionsProvider: () => (/* binding */ IncludeInSnapshotConditionsProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implementation for the include in snapshot conditions provider.
 */
class IncludeInSnapshotConditionsProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("IncludeInSnapshotConditionsProvider");
    }
    /**
     * Get the conditions from the module.
     * @returns Map of the conditions from the module.
     */
    async get() {
        const conditionsMap = {};
        conditionsMap["included-in-snapshot"] = async (platform, context) => {
            if (context?.callerType === "browser" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(context?.customData)) {
                const includeInSnapshots = context.customData.includeInSnapshots ?? true;
                this._logger?.info("Included in snapshot", includeInSnapshots);
                return includeInSnapshots;
            }
            return true;
        };
        conditionsMap["removed-from-snapshot"] = async (platform, context) => {
            if (context?.callerType === "browser" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(context?.customData)) {
                const includeInSnapshots = context.customData.includeInSnapshots ?? true;
                this._logger?.info("Removed from snapshot", !includeInSnapshots);
                return !includeInSnapshots;
            }
            return false;
        };
        return conditionsMap;
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
/*!*******************************************************************!*\
  !*** ./client/src/modules/composite/include-in-snapshot/index.ts ***!
  \*******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/include-in-snapshot/actions.ts");
/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conditions */ "./client/src/modules/composite/include-in-snapshot/conditions.ts");


/**
 * Define the entry points for the module.
 */
const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.IncludeInSnapshotActionsProvider(),
    conditions: new _conditions__WEBPACK_IMPORTED_MODULE_1__.IncludeInSnapshotConditionsProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2IsQ0FBQyxDQUFDO1FBRUYsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxFQUM3QyxRQUFpQyxFQUNqQyxPQUErQixFQUNaLEVBQUU7WUFDckIsSUFBSSxPQUFPLEVBQUUsVUFBVSxLQUFLLFNBQVMsSUFBSSxDQUFDLHlFQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3hFLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDakUsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQzVCLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQztRQUVGLE9BQU8sYUFBYSxDQUFDO0lBQ3RCLENBQUM7Q0FDRDs7Ozs7OztTQ3BFRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0w2RDtBQUNNO0FBRW5FOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLHNFQUFnQyxFQUFFO0lBQy9DLFVBQVUsRUFBRSxJQUFJLDRFQUFtQyxFQUFFO0NBQ3JELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9pbmNsdWRlLWluLXNuYXBzaG90L2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9pbmNsdWRlLWluLXNuYXBzaG90L2NvbmRpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9pbmNsdWRlLWluLXNuYXBzaG90L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEEgd2F5IG9mIHNwZWNpZnkgdGhlIHJ1bGVzIGFyb3VuZCB0aGUgdmFsaWRhdGlvbi5cbiAqIERPTUFJTiBtZWFucyB0aGF0IHRoZSB1cmwgbXVzdCBjb21lIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICogUEFHRSBtZWFucyB0aGF0IHRoZSB1cmxzIG11c3QgbWF0Y2ggdGhlIHNhbWUgb3JpZ2luIGFuZCBwYXRoLlxuICogQU5ZIG1lYW5zIHlvdSBhcmUgYWxsb3dlZCB0byByZXBsYWNlIG9uZSB1cmwgd2l0aCBhbm90aGVyIHdpdGhvdXQgY29uc3RyYWluLlxuICogTk9ORSBtZWFucyB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCB0aGUgdXJsIGlzIG5vdCBjaGFuZ2VkLlxuICovXG5leHBvcnQgdHlwZSBWYWxpZFVSTENvbnN0cmFpbnQgPSBcIlVSTF9ET01BSU5cIiB8IFwiVVJMX1BBR0VcIiB8IFwiVVJMX0FOWVwiIHwgXCJVUkxfTk9ORVwiO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc3VnZ2VzdGVkIHVybCB0byBzZWUgaWYgaXQgY2FuIHJlcGxhY2UgdGhlIHNvdXJjZSB1cmwuXG4gKiBAcGFyYW0gc291cmNlVXJsIHRoZSBvcmlnaW5hbCB1cmwgdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHN1Z2dlc3RlZFVybCB0aGUgc3VnZ2VzdGVkIHVybCB0byByZXBsYWNlIGl0IHdpdGguXG4gKiBAcGFyYW0gY29uc3RyYWludCB0aGUgcnVsZXMgdG8gYXBwbHkgYWdhaW5zdCBpdC5cbiAqIEByZXR1cm5zIHdoZXRoZXIgaXQgaXMgb2sgdG8gcmVwbGFjZSB0aGUgc291cmNlVXJsIHdpdGggdGhlIHN1Z2dlc3RlZFVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFVybChcblx0c291cmNlVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdHN1Z2dlc3RlZFVybDogc3RyaW5nLFxuXHRjb25zdHJhaW50OiBWYWxpZFVSTENvbnN0cmFpbnRbXSB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG5cdGlmIChpc0VtcHR5KHN1Z2dlc3RlZFVybCkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKCFBcnJheS5pc0FycmF5KGNvbnN0cmFpbnQpIHx8IGNvbnN0cmFpbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfTk9ORVwiKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9BTllcIikpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoaXNFbXB0eShzb3VyY2VVcmwpKSB7XG5cdFx0Ly8gaWYgd2UgYXJlIGFib3V0IHRvIGRvIGEgZG9tYWluIHJlbGF0ZWQgY2hlY2sgdGhlbiB3ZSBuZWVkIGEgc291cmNlIHVybFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCB2YWxpZGF0ZWRTb3VyY2VVcmwgPSBuZXcgVVJMKHNvdXJjZVVybCk7XG5cdGNvbnN0IHZhbGlkYXRlZFN1Z2dlc3RlZFVybCA9IG5ldyBVUkwoc3VnZ2VzdGVkVXJsKTtcblxuXHRpZiAoY29uc3RyYWludC5pbmNsdWRlcyhcIlVSTF9QQUdFXCIpKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCh2YWxpZGF0ZWRTb3VyY2VVcmwub3JpZ2luICsgdmFsaWRhdGVkU291cmNlVXJsLnBhdGhuYW1lKS50b0xvd2VyQ2FzZSgpID09PVxuXHRcdFx0KHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW4gKyB2YWxpZGF0ZWRTdWdnZXN0ZWRVcmwucGF0aG5hbWUpLnRvTG93ZXJDYXNlKClcblx0XHQpO1xuXHR9XG5cblx0aWYgKGNvbnN0cmFpbnQuaW5jbHVkZXMoXCJVUkxfRE9NQUlOXCIpKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlZFNvdXJjZVVybC5vcmlnaW4gPT09IHZhbGlkYXRlZFN1Z2dlc3RlZFVybC5vcmlnaW47XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0LFxuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQge1xuXHRDdXN0b21BY3Rpb25DYWxsZXJUeXBlLFxuXHR0eXBlIEFjdGlvbkhlbHBlcnMsXG5cdHR5cGUgQWN0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBpbmNsdWRlIGluIHNuYXBzaG90IGFjdGlvbnMgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmNsdWRlSW5TbmFwc2hvdEFjdGlvbnNQcm92aWRlciBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJJbmNsdWRlSW5TbmFwc2hvdEFjdGlvbnNQcm92aWRlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJpbmNsdWRlLWluLXNuYXBzaG90XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuQ3VzdG9tQnV0dG9uKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkluY2x1ZGluZyBpbiBzbmFwc2hvdFwiLCBwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0Y29uc3QgYnJvd3NlcldpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmMocGF5bG9hZC53aW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBicm93c2VyV2luZG93Lm9wZW5maW5XaW5kb3cuZ2V0T3B0aW9ucygpO1xuXHRcdFx0XHRjb25zdCBjcmVhdGVSZXF1ZXN0OiBCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdCA9IG9wdGlvbnMgYXMgQnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3Q7XG5cdFx0XHRcdGlmIChjcmVhdGVSZXF1ZXN0LndvcmtzcGFjZVBsYXRmb3JtLndpbmRvd1R5cGUgIT09IFwicGxhdGZvcm1cIikge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRUb29sYmFyT3B0aW9ucyA9IGNyZWF0ZVJlcXVlc3Qud29ya3NwYWNlUGxhdGZvcm0udG9vbGJhck9wdGlvbnM7XG5cdFx0XHRcdFx0YXdhaXQgYnJvd3NlcldpbmRvdy5vcGVuZmluV2luZG93LnVwZGF0ZU9wdGlvbnMoeyBpbmNsdWRlSW5TbmFwc2hvdHM6IHRydWUgfSk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGN1cnJlbnRUb29sYmFyT3B0aW9ucykgJiYgdGhpcy5faGVscGVycz8udXBkYXRlVG9vbGJhckJ1dHRvbnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG5ld0J1dHRvbnMgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLnVwZGF0ZVRvb2xiYXJCdXR0b25zKFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VG9vbGJhck9wdGlvbnMuYnV0dG9ucyxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnNvdXJjZUlkIGFzIHN0cmluZyxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnJlcGxhY2VtZW50SWQgYXMgc3RyaW5nXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgYnJvd3NlcldpbmRvdy5yZXBsYWNlVG9vbGJhck9wdGlvbnMoeyBidXR0b25zOiBuZXdCdXR0b25zIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJyZW1vdmUtZnJvbS1zbmFwc2hvdFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlLkN1c3RvbUJ1dHRvbikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJSZW1vdmluZyBmcm9tIHNuYXBzaG90XCIsIHBheWxvYWQud2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRjb25zdCBicm93c2VyV2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdGNvbnN0IGNyZWF0ZVJlcXVlc3Q6IEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0ID0gb3B0aW9ucyBhcyBCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdDtcblx0XHRcdFx0aWYgKGNyZWF0ZVJlcXVlc3Qud29ya3NwYWNlUGxhdGZvcm0ud2luZG93VHlwZSAhPT0gXCJwbGF0Zm9ybVwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFRvb2xiYXJPcHRpb25zID0gY3JlYXRlUmVxdWVzdC53b3Jrc3BhY2VQbGF0Zm9ybS50b29sYmFyT3B0aW9ucztcblx0XHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93Lm9wZW5maW5XaW5kb3cudXBkYXRlT3B0aW9ucyh7IGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UgfSk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGN1cnJlbnRUb29sYmFyT3B0aW9ucykgJiYgdGhpcy5faGVscGVycz8udXBkYXRlVG9vbGJhckJ1dHRvbnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG5ld0J1dHRvbnMgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLnVwZGF0ZVRvb2xiYXJCdXR0b25zKFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VG9vbGJhck9wdGlvbnMuYnV0dG9ucyxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnNvdXJjZUlkIGFzIHN0cmluZyxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC5jdXN0b21EYXRhLnJlcGxhY2VtZW50SWQgYXMgc3RyaW5nXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgYnJvd3NlcldpbmRvdy5yZXBsYWNlVG9vbGJhck9wdGlvbnMoeyBidXR0b25zOiBuZXdCdXR0b25zIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUge1xuXHRDb25kaXRpb25Db250ZXh0VHlwZXMsXG5cdENvbmRpdGlvbk1hcCxcblx0Q29uZGl0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2NvbmRpdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBpbmNsdWRlIGluIHNuYXBzaG90IGNvbmRpdGlvbnMgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmNsdWRlSW5TbmFwc2hvdENvbmRpdGlvbnNQcm92aWRlciBpbXBsZW1lbnRzIENvbmRpdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiSW5jbHVkZUluU25hcHNob3RDb25kaXRpb25zUHJvdmlkZXJcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBjb25kaXRpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTWFwIG9mIHRoZSBjb25kaXRpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxDb25kaXRpb25NYXA+IHtcblx0XHRjb25zdCBjb25kaXRpb25zTWFwOiBDb25kaXRpb25NYXAgPSB7fTtcblxuXHRcdGNvbmRpdGlvbnNNYXBbXCJpbmNsdWRlZC1pbi1zbmFwc2hvdFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGNvbnRleHQ/OiBDb25kaXRpb25Db250ZXh0VHlwZXNcblx0XHQpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcblx0XHRcdGlmIChjb250ZXh0Py5jYWxsZXJUeXBlID09PSBcImJyb3dzZXJcIiAmJiAhaXNFbXB0eShjb250ZXh0Py5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRjb25zdCBpbmNsdWRlSW5TbmFwc2hvdHMgPSBjb250ZXh0LmN1c3RvbURhdGEuaW5jbHVkZUluU25hcHNob3RzID8/IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkluY2x1ZGVkIGluIHNuYXBzaG90XCIsIGluY2x1ZGVJblNuYXBzaG90cyk7XG5cdFx0XHRcdHJldHVybiBpbmNsdWRlSW5TbmFwc2hvdHM7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXG5cdFx0Y29uZGl0aW9uc01hcFtcInJlbW92ZWQtZnJvbS1zbmFwc2hvdFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGNvbnRleHQ/OiBDb25kaXRpb25Db250ZXh0VHlwZXNcblx0XHQpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcblx0XHRcdGlmIChjb250ZXh0Py5jYWxsZXJUeXBlID09PSBcImJyb3dzZXJcIiAmJiAhaXNFbXB0eShjb250ZXh0Py5jdXN0b21EYXRhKSkge1xuXHRcdFx0XHRjb25zdCBpbmNsdWRlSW5TbmFwc2hvdHMgPSBjb250ZXh0LmN1c3RvbURhdGEuaW5jbHVkZUluU25hcHNob3RzID8/IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlbW92ZWQgZnJvbSBzbmFwc2hvdFwiLCAhaW5jbHVkZUluU25hcHNob3RzKTtcblx0XHRcdFx0cmV0dXJuICFpbmNsdWRlSW5TbmFwc2hvdHM7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHJldHVybiBjb25kaXRpb25zTWFwO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBJbmNsdWRlSW5TbmFwc2hvdEFjdGlvbnNQcm92aWRlciB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IEluY2x1ZGVJblNuYXBzaG90Q29uZGl0aW9uc1Byb3ZpZGVyIH0gZnJvbSBcIi4vY29uZGl0aW9uc1wiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IEluY2x1ZGVJblNuYXBzaG90QWN0aW9uc1Byb3ZpZGVyKCksXG5cdGNvbmRpdGlvbnM6IG5ldyBJbmNsdWRlSW5TbmFwc2hvdENvbmRpdGlvbnNQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9