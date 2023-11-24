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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFDWixFQUFFO1lBQ3JCLElBQUksT0FBTyxFQUFFLFVBQVUsS0FBSyxTQUFTLElBQUksQ0FBQyx5RUFBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN4RSxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDO2dCQUN6RSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUM1QixDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRixPQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDO0NBQ0Q7Ozs7Ozs7U0NwRUQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFDTTtBQUVuRTs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxPQUFPLEVBQUUsSUFBSSxzRUFBZ0MsRUFBRTtJQUMvQyxVQUFVLEVBQUUsSUFBSSw0RUFBbUMsRUFBRTtDQUNyRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvaW5jbHVkZS1pbi1zbmFwc2hvdC9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvaW5jbHVkZS1pbi1zbmFwc2hvdC9jb25kaXRpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvaW5jbHVkZS1pbi1zbmFwc2hvdC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEN1c3RvbUFjdGlvbnNNYXAsIFRvb2xiYXJCdXR0b24sIFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVIZWxwZXJzLCBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlTGlzdCB9IGZyb20gXCIuL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIGZvciBhbiBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uczxPID0gdW5rbm93bj4gZXh0ZW5kcyBNb2R1bGVJbXBsZW1lbnRhdGlvbjxPLCBBY3Rpb25IZWxwZXJzPiB7XG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFjdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIHBsYXRmb3JtIG1vZHVsZS5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBjdXN0b20gYWN0aW9ucy5cblx0ICovXG5cdGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+O1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBtb2R1bGVzIHRoYXQgcHJvdmlkZSBhY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIHBsYXRmb3JtLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25zUHJvdmlkZXJPcHRpb25zID0gTW9kdWxlTGlzdDtcblxuLyoqXG4gKiBFeHRlbmRlZCBoZWxwZXJzIHVzZWQgYnkgYWN0aW9uIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uSGVscGVycyBleHRlbmRzIE1vZHVsZUhlbHBlcnMge1xuXHQvKipcblx0ICogVXBkYXRlIHRvb2xiYXIgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbnMgVGhlIGxpc3Qgb2YgYWxsIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25JZCBUaGUgYnV0dG9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHJlcGxhY2VtZW50QnV0dG9uSWQgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgYnV0dG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgdXBkYXRlZCBidXR0b25zLlxuXHQgKi9cblx0dXBkYXRlVG9vbGJhckJ1dHRvbnM6IChcblx0XHRidXR0b25zOiBUb29sYmFyQnV0dG9uW10sXG5cdFx0YnV0dG9uSWQ6IHN0cmluZyxcblx0XHRyZXBsYWNlbWVudEJ1dHRvbklkOiBzdHJpbmdcblx0KSA9PiBQcm9taXNlPFRvb2xiYXJCdXR0b25bXT47XG59XG5cbi8qKlxuICogVXNlIHRoaXMgaW4gcHJlZmVyZW5jZSB0byBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIGZyb20gd29ya3NwYWNlLXBsYXRmb3JtIHRvIGF2b2lkIHRoZSBpbXBvcnQgb2YgdGhlIHdob2xlIG9mIHdvcmtzcGFjZSBwYWNrYWdlIGluIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUge1xuXHRDdXN0b21CdXR0b24gPSBcIkN1c3RvbUJ1dHRvblwiLFxuXHRTdG9yZUN1c3RvbUJ1dHRvbiA9IFwiU3RvcmVDdXN0b21CdXR0b25cIixcblx0Q3VzdG9tRHJvcGRvd25JdGVtID0gXCJDdXN0b21Ecm9wZG93bkl0ZW1cIixcblx0R2xvYmFsQ29udGV4dE1lbnUgPSBcIkdsb2JhbENvbnRleHRNZW51XCIsXG5cdFZpZXdUYWJDb250ZXh0TWVudSA9IFwiVmlld1RhYkNvbnRleHRNZW51XCIsXG5cdFBhZ2VUYWJDb250ZXh0TWVudSA9IFwiUGFnZVRhYkNvbnRleHRNZW51XCIsXG5cdFNhdmVCdXR0b25Db250ZXh0TWVudSA9IFwiU2F2ZUJ1dHRvbkNvbnRleHRNZW51XCIsXG5cdEFQSSA9IFwiQVBJXCJcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0QnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3QsXG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGluY2x1ZGUgaW4gc25hcHNob3QgYWN0aW9ucyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEluY2x1ZGVJblNuYXBzaG90QWN0aW9uc1Byb3ZpZGVyIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVycz86IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkluY2x1ZGVJblNuYXBzaG90QWN0aW9uc1Byb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcImluY2x1ZGUtaW4tc25hcHNob3RcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5DdXN0b21CdXR0b24pIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiSW5jbHVkaW5nIGluIHNuYXBzaG90XCIsIHBheWxvYWQud2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRjb25zdCBicm93c2VyV2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhwYXlsb2FkLndpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdGNvbnN0IGNyZWF0ZVJlcXVlc3Q6IEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0ID0gb3B0aW9ucyBhcyBCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdDtcblx0XHRcdFx0aWYgKGNyZWF0ZVJlcXVlc3Qud29ya3NwYWNlUGxhdGZvcm0ud2luZG93VHlwZSAhPT0gXCJwbGF0Zm9ybVwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFRvb2xiYXJPcHRpb25zID0gY3JlYXRlUmVxdWVzdC53b3Jrc3BhY2VQbGF0Zm9ybS50b29sYmFyT3B0aW9ucztcblx0XHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93Lm9wZW5maW5XaW5kb3cudXBkYXRlT3B0aW9ucyh7IGluY2x1ZGVJblNuYXBzaG90czogdHJ1ZSB9KTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY3VycmVudFRvb2xiYXJPcHRpb25zKSAmJiB0aGlzLl9oZWxwZXJzPy51cGRhdGVUb29sYmFyQnV0dG9ucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbmV3QnV0dG9ucyA9IGF3YWl0IHRoaXMuX2hlbHBlcnMudXBkYXRlVG9vbGJhckJ1dHRvbnMoXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUb29sYmFyT3B0aW9ucy5idXR0b25zLFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEuc291cmNlSWQgYXMgc3RyaW5nLFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEucmVwbGFjZW1lbnRJZCBhcyBzdHJpbmdcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93LnJlcGxhY2VUb29sYmFyT3B0aW9ucyh7IGJ1dHRvbnM6IG5ld0J1dHRvbnMgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInJlbW92ZS1mcm9tLXNuYXBzaG90XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuQ3VzdG9tQnV0dG9uKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlJlbW92aW5nIGZyb20gc25hcHNob3RcIiwgcGF5bG9hZC53aW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdGNvbnN0IGJyb3dzZXJXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHBheWxvYWQud2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgYnJvd3NlcldpbmRvdy5vcGVuZmluV2luZG93LmdldE9wdGlvbnMoKTtcblx0XHRcdFx0Y29uc3QgY3JlYXRlUmVxdWVzdDogQnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3QgPSBvcHRpb25zIGFzIEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0O1xuXHRcdFx0XHRpZiAoY3JlYXRlUmVxdWVzdC53b3Jrc3BhY2VQbGF0Zm9ybS53aW5kb3dUeXBlICE9PSBcInBsYXRmb3JtXCIpIHtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50VG9vbGJhck9wdGlvbnMgPSBjcmVhdGVSZXF1ZXN0LndvcmtzcGFjZVBsYXRmb3JtLnRvb2xiYXJPcHRpb25zO1xuXHRcdFx0XHRcdGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy51cGRhdGVPcHRpb25zKHsgaW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSB9KTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY3VycmVudFRvb2xiYXJPcHRpb25zKSAmJiB0aGlzLl9oZWxwZXJzPy51cGRhdGVUb29sYmFyQnV0dG9ucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbmV3QnV0dG9ucyA9IGF3YWl0IHRoaXMuX2hlbHBlcnMudXBkYXRlVG9vbGJhckJ1dHRvbnMoXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUb29sYmFyT3B0aW9ucy5idXR0b25zLFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEuc291cmNlSWQgYXMgc3RyaW5nLFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLmN1c3RvbURhdGEucmVwbGFjZW1lbnRJZCBhcyBzdHJpbmdcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBicm93c2VyV2luZG93LnJlcGxhY2VUb29sYmFyT3B0aW9ucyh7IGJ1dHRvbnM6IG5ld0J1dHRvbnMgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7XG5cdENvbmRpdGlvbkNvbnRleHRUeXBlcyxcblx0Q29uZGl0aW9uTWFwLFxuXHRDb25kaXRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvY29uZGl0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGluY2x1ZGUgaW4gc25hcHNob3QgY29uZGl0aW9ucyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEluY2x1ZGVJblNuYXBzaG90Q29uZGl0aW9uc1Byb3ZpZGVyIGltcGxlbWVudHMgQ29uZGl0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJJbmNsdWRlSW5TbmFwc2hvdENvbmRpdGlvbnNQcm92aWRlclwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBNYXAgb2YgdGhlIGNvbmRpdGlvbnMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPENvbmRpdGlvbk1hcD4ge1xuXHRcdGNvbnN0IGNvbmRpdGlvbnNNYXA6IENvbmRpdGlvbk1hcCA9IHt9O1xuXG5cdFx0Y29uZGl0aW9uc01hcFtcImluY2x1ZGVkLWluLXNuYXBzaG90XCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y29udGV4dD86IENvbmRpdGlvbkNvbnRleHRUeXBlc1xuXHRcdCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuXHRcdFx0aWYgKGNvbnRleHQ/LmNhbGxlclR5cGUgPT09IFwiYnJvd3NlclwiICYmICFpc0VtcHR5KGNvbnRleHQ/LmN1c3RvbURhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IGluY2x1ZGVJblNuYXBzaG90cyA9IGNvbnRleHQuY3VzdG9tRGF0YS5pbmNsdWRlSW5TbmFwc2hvdHMgPz8gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiSW5jbHVkZWQgaW4gc25hcHNob3RcIiwgaW5jbHVkZUluU25hcHNob3RzKTtcblx0XHRcdFx0cmV0dXJuIGluY2x1ZGVJblNuYXBzaG90cztcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cblx0XHRjb25kaXRpb25zTWFwW1wicmVtb3ZlZC1mcm9tLXNuYXBzaG90XCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y29udGV4dD86IENvbmRpdGlvbkNvbnRleHRUeXBlc1xuXHRcdCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuXHRcdFx0aWYgKGNvbnRleHQ/LmNhbGxlclR5cGUgPT09IFwiYnJvd3NlclwiICYmICFpc0VtcHR5KGNvbnRleHQ/LmN1c3RvbURhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IGluY2x1ZGVJblNuYXBzaG90cyA9IGNvbnRleHQuY3VzdG9tRGF0YS5pbmNsdWRlSW5TbmFwc2hvdHMgPz8gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiUmVtb3ZlZCBmcm9tIHNuYXBzaG90XCIsICFpbmNsdWRlSW5TbmFwc2hvdHMpO1xuXHRcdFx0XHRyZXR1cm4gIWluY2x1ZGVJblNuYXBzaG90cztcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGNvbmRpdGlvbnNNYXA7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEluY2x1ZGVJblNuYXBzaG90QWN0aW9uc1Byb3ZpZGVyIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgSW5jbHVkZUluU25hcHNob3RDb25kaXRpb25zUHJvdmlkZXIgfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhY3Rpb25zOiBuZXcgSW5jbHVkZUluU25hcHNob3RBY3Rpb25zUHJvdmlkZXIoKSxcblx0Y29uZGl0aW9uczogbmV3IEluY2x1ZGVJblNuYXBzaG90Q29uZGl0aW9uc1Byb3ZpZGVyKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=