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

/***/ "./client/src/modules/composite/pages/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/pages/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageActions: () => (/* binding */ PageActions)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Implement the actions.
 */
class PageActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("PageActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["page-open"] = async (payload) => {
            if (payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.API) {
                const pageId = payload?.customData?.pageId;
                const targetWindowIdentity = payload?.customData?.windowIdentity;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(pageId)) {
                    if (this._helpers?.launchPage) {
                        await this._helpers.launchPage(pageId, {
                            targetWindowIdentity
                        }, this._logger);
                    }
                    else {
                        this._logger?.error("We are unable to launch a page as this module has not been passed the launchPage function.");
                    }
                }
            }
        };
        actionMap["page-delete"] = async (payload) => {
            if (payload.callerType !== workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.API) {
                const pageId = payload?.customData?.pageId;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(pageId)) {
                    this._logger?.info(`Deleting page with id: ${pageId}`);
                    await platform.Storage.deletePage(pageId);
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/pages/init-options.ts":
/*!************************************************************!*\
  !*** ./client/src/modules/composite/pages/init-options.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitOptionsShowPageHandler: () => (/* binding */ InitOptionsShowPageHandler)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Init options show page handler.
 */
class InitOptionsShowPageHandler {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("InitOptionsShowPageHandler");
        this._helpers = helpers;
        this._definition = definition;
        this._logger.info("The handler has been loaded");
    }
    /**
     * Handle the init options action.
     * @param requestedAction The requested action.
     * @param payload The payload for the action.
     */
    async action(requestedAction, payload) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(payload)) {
            this._logger?.warn(`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`);
            return;
        }
        try {
            if (requestedAction === "show-page") {
                const pageId = payload?.pageId;
                this._logger?.info(`The following pageId was passed and requested to show: ${pageId}`);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(pageId)) {
                    this._logger?.error("The init handler received an pageId in the wrong format and is unable to show it");
                    return;
                }
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.launchPage) || (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._helpers?.launchPage)) {
                    this._logger?.warn(`Unable to show page with pageId: ${pageId} as a launchPage function was not passed to this module via the module helpers.`);
                    return;
                }
                const resultingWindow = await this._helpers?.launchPage(pageId);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(resultingWindow)) {
                    this._logger?.error(`We have been unable to find and show the provided pageId: ${pageId}`);
                }
            }
        }
        catch (error) {
            this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
        }
    }
}


/***/ }),

/***/ "./client/src/modules/composite/pages/menus.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/pages/menus.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageMenus: () => (/* binding */ PageMenus)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implement the menus.
 */
class PageMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("PageMenus");
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
            const pages = await platform.Storage.getPages();
            pages.sort((a, b) => a.title.localeCompare(b.title));
            const includeDeletePage = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.deletePage?.include) || this._settings?.deletePage?.include;
            const includeShowPage = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._settings?.showPage?.include) || this._settings?.showPage?.include;
            const showPagesMenu = [];
            const showPageMenuEntry = {
                label: this._settings?.showPage?.menuLabel ?? "Show Page",
                icon: this._settings?.showPage?.menuIcon,
                enabled: pages.length > 0,
                submenu: [],
                position: {
                    type: "SavePageAs",
                    operation: "after",
                    customId: "ShowPage",
                    ...this._settings?.showPage?.menuPosition
                }
            };
            const deletePageMenuEntry = {
                label: this._settings?.deletePage?.menuLabel ?? "Delete Page",
                icon: this._settings?.deletePage?.menuIcon,
                enabled: pages.length > 0,
                submenu: [],
                position: {
                    type: "SavePageAs",
                    operation: "after",
                    customId: "ShowDelete",
                    ...this._settings?.deletePage?.menuPosition
                }
            };
            const deletePagesMenu = [];
            let browserWindowIdentity = relatedMenuId?.windowIdentity;
            if (browserWindowIdentity) {
                const browserWindow = platform.Browser.wrapSync(browserWindowIdentity);
                const options = await browserWindow.openfinWindow.getOptions();
                const workspaceOptions = options.workspacePlatform;
                if (workspaceOptions.disableMultiplePages === true) {
                    browserWindowIdentity = undefined;
                }
            }
            const allOpenPages = await platform.Browser.getAllAttachedPages();
            if (pages.length > 0) {
                for (const page of pages) {
                    const existing = allOpenPages.find((openPage) => page.pageId === openPage.pageId);
                    const isActiveExistingPageOnCurrentWindow = !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(existing?.parentIdentity) &&
                        existing?.parentIdentity.name === browserWindowIdentity?.name &&
                        existing?.isActive;
                    showPagesMenu.push({
                        label: page.title,
                        type: "normal",
                        enabled: !isActiveExistingPageOnCurrentWindow,
                        data: {
                            type: "Custom",
                            action: {
                                id: "page-open",
                                customData: {
                                    pageId: page.pageId,
                                    windowIdentity: browserWindowIdentity
                                }
                            }
                        }
                    });
                    deletePagesMenu.push({
                        label: page.title,
                        type: "normal",
                        enabled: (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(existing),
                        data: {
                            type: "Custom",
                            action: {
                                id: "page-delete",
                                customData: {
                                    pageId: page.pageId
                                }
                            }
                        }
                    });
                }
                if (showPageMenuEntry.submenu) {
                    showPageMenuEntry.submenu.push(...showPagesMenu);
                }
                if (deletePageMenuEntry.submenu) {
                    deletePageMenuEntry.submenu.push(...deletePagesMenu);
                }
            }
            const menuItemsToReturn = [];
            if (includeDeletePage) {
                menuItemsToReturn.push(deletePageMenuEntry);
            }
            if (includeShowPage) {
                menuItemsToReturn.push(showPageMenuEntry);
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
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/pages/index.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/pages/actions.ts");
/* harmony import */ var _init_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init-options */ "./client/src/modules/composite/pages/init-options.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/pages/menus.ts");



const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.PageActions(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_2__.PageMenus(),
    initOptions: new _init_options__WEBPACK_IMPORTED_MODULE_1__.InitOptionsShowPageHandler()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWEsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUNELElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2pDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztZQUNGLENBQUM7WUFFRCxNQUFNLGlCQUFpQixHQUFnQixFQUFFLENBQUM7WUFFMUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO2dCQUN2QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBRUQsSUFBSSxlQUFlLEVBQUUsQ0FBQztnQkFDckIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUVELE9BQU8saUJBQWlCLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQ25LRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMd0M7QUFDb0I7QUFDeEI7QUFFN0IsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLGlEQUFXLEVBQUU7SUFDMUIsS0FBSyxFQUFFLElBQUksNkNBQVMsRUFBRTtJQUN0QixXQUFXLEVBQUUsSUFBSSxxRUFBMEIsRUFBRTtDQUM3QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2FjdGlvbnMtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3BhZ2VzL2luaXQtb3B0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3BhZ2VzL21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7XG5cdEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsXG5cdHR5cGUgQWN0aW9uSGVscGVycyxcblx0dHlwZSBBY3Rpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM/OiBBY3Rpb25IZWxwZXJzO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogQWN0aW9uSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZUFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wicGFnZS1vcGVuXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgIT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuQVBJKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VJZDogc3RyaW5nID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ucGFnZUlkO1xuXHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQ/LmN1c3RvbURhdGE/LndpbmRvd0lkZW50aXR5O1xuXHRcdFx0XHRpZiAoIWlzRW1wdHkocGFnZUlkKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzLmxhdW5jaFBhZ2UoXG5cdFx0XHRcdFx0XHRcdHBhZ2VJZCxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldFdpbmRvd0lkZW50aXR5XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlclxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFx0XCJXZSBhcmUgdW5hYmxlIHRvIGxhdW5jaCBhIHBhZ2UgYXMgdGhpcyBtb2R1bGUgaGFzIG5vdCBiZWVuIHBhc3NlZCB0aGUgbGF1bmNoUGFnZSBmdW5jdGlvbi5cIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wicGFnZS1kZWxldGVcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5BUEkpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGlmICghaXNFbXB0eShwYWdlSWQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBEZWxldGluZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfWApO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgSW5pdE9wdGlvbnNIYW5kbGVyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbml0LW9wdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc1N0cmluZ1ZhbHVlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IFNob3dQYWdlT3B0aW9ucywgU2hvd1BhZ2VQYXlsb2FkIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW5pdCBvcHRpb25zIHNob3cgcGFnZSBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgSW5pdE9wdGlvbnNTaG93UGFnZUhhbmRsZXIgaW1wbGVtZW50cyBJbml0T3B0aW9uc0hhbmRsZXI8U2hvd1BhZ2VPcHRpb25zPiB7XG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9oZWxwZXJzPzogTW9kdWxlSGVscGVycztcblxuXHRwcml2YXRlIF9kZWZpbml0aW9uPzogTW9kdWxlRGVmaW5pdGlvbjxTaG93UGFnZU9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFNob3dQYWdlT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJJbml0T3B0aW9uc1Nob3dQYWdlSGFuZGxlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlRoZSBoYW5kbGVyIGhhcyBiZWVuIGxvYWRlZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgdGhlIGluaXQgb3B0aW9ucyBhY3Rpb24uXG5cdCAqIEBwYXJhbSByZXF1ZXN0ZWRBY3Rpb24gVGhlIHJlcXVlc3RlZCBhY3Rpb24uXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIGZvciB0aGUgYWN0aW9uLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGFjdGlvbihyZXF1ZXN0ZWRBY3Rpb246IHN0cmluZywgcGF5bG9hZD86IFNob3dQYWdlUGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KHBheWxvYWQpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBBY3Rpb25zIHBhc3NlZCB0byB0aGUgbW9kdWxlIHJlcXVpcmUgYSBwYXlsb2FkIHRvIGJlIHBhc3NlZC4gUmVxdWVzdGVkIGFjdGlvbjogJHtyZXF1ZXN0ZWRBY3Rpb259IGNhbiBub3QgYmUgZnVsZmlsbGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRpZiAocmVxdWVzdGVkQWN0aW9uID09PSBcInNob3ctcGFnZVwiKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VJZCA9IHBheWxvYWQ/LnBhZ2VJZDtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBUaGUgZm9sbG93aW5nIHBhZ2VJZCB3YXMgcGFzc2VkIGFuZCByZXF1ZXN0ZWQgdG8gc2hvdzogJHtwYWdlSWR9YCk7XG5cblx0XHRcdFx0aWYgKCFpc1N0cmluZ1ZhbHVlKHBhZ2VJZCkpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XCJUaGUgaW5pdCBoYW5kbGVyIHJlY2VpdmVkIGFuIHBhZ2VJZCBpbiB0aGUgd3JvbmcgZm9ybWF0IGFuZCBpcyB1bmFibGUgdG8gc2hvdyBpdFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKSB8fCBpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFBhZ2UpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcdFx0YFVuYWJsZSB0byBzaG93IHBhZ2Ugd2l0aCBwYWdlSWQ6ICR7cGFnZUlkfSBhcyBhIGxhdW5jaFBhZ2UgZnVuY3Rpb24gd2FzIG5vdCBwYXNzZWQgdG8gdGhpcyBtb2R1bGUgdmlhIHRoZSBtb2R1bGUgaGVscGVycy5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCByZXN1bHRpbmdXaW5kb3cgPSBhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKHBhZ2VJZCk7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHJlc3VsdGluZ1dpbmRvdykpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBXZSBoYXZlIGJlZW4gdW5hYmxlIHRvIGZpbmQgYW5kIHNob3cgdGhlIHByb3ZpZGVkIHBhZ2VJZDogJHtwYWdlSWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3IgdHJ5aW5nIHRvIHBlcmZvcm0gYWN0aW9uICR7cmVxdWVzdGVkQWN0aW9ufS5gLCBlcnJvcik7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZSwgUGFnZSwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRNZW51RW50cnksXG5cdE1lbnVUeXBlLFxuXHRNZW51cyxcblx0UmVsYXRlZE1lbnVJZFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZU1lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlTWVudXMgaW1wbGVtZW50cyBNZW51czxQYWdlTWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M/OiBQYWdlTWVudVNldHRpbmdzO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFBhZ2VNZW51U2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiUGFnZU1lbnVzXCIpO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqIEBwYXJhbSByZWxhdGVkTWVudUlkIFRoZSByZWxhdGVkIG1lbnUgaW5mb3JtYXRpb24gKHZpZXdJZC92aWV3SWRzLCBwYWdlSWQgYW5kIHdpbmRvdyBJZCBiYXNlZCBvbiB0aGUgdHlwZSBvZiBtZW51KS5cblx0ICogQHJldHVybnMgVGhlIG1lbnUgZW50cmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoXG5cdFx0bWVudVR5cGU6IE1lbnVUeXBlLFxuXHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRyZWxhdGVkTWVudUlkPzogUmVsYXRlZE1lbnVJZFxuXHQpOiBQcm9taXNlPE1lbnVFbnRyeVtdIHwgdW5kZWZpbmVkPiB7XG5cdFx0aWYgKG1lbnVUeXBlID09PSBcImdsb2JhbFwiICYmICFpc0VtcHR5KHJlbGF0ZWRNZW51SWQ/LndpbmRvd0lkZW50aXR5KSkge1xuXHRcdFx0Ly8geW91IGNhbiBjdXN0b21pemUgdGhlIGJyb3dzZXIgbWFpbiBtZW51IGhlcmVcblx0XHRcdGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2VzKCk7XG5cdFx0XHRwYWdlcy5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpO1xuXHRcdFx0Y29uc3QgaW5jbHVkZURlbGV0ZVBhZ2UgPVxuXHRcdFx0XHRpc0VtcHR5KHRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5pbmNsdWRlKSB8fCB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IGluY2x1ZGVTaG93UGFnZSA9IGlzRW1wdHkodGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5pbmNsdWRlKSB8fCB0aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/LmluY2x1ZGU7XG5cdFx0XHRjb25zdCBzaG93UGFnZXNNZW51OiBPcGVuRmluLk1lbnVJdGVtVGVtcGxhdGVbXSA9IFtdO1xuXHRcdFx0Y29uc3Qgc2hvd1BhZ2VNZW51RW50cnk6IE1lbnVFbnRyeSA9IHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8ubWVudUxhYmVsID8/IFwiU2hvdyBQYWdlXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHBhZ2VzLmxlbmd0aCA+IDAsXG5cdFx0XHRcdHN1Ym1lbnU6IFtdLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiU2F2ZVBhZ2VBc1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdGN1c3RvbUlkOiBcIlNob3dQYWdlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5tZW51UG9zaXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGRlbGV0ZVBhZ2VNZW51RW50cnk6IE1lbnVFbnRyeSA9IHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5tZW51TGFiZWwgPz8gXCJEZWxldGUgUGFnZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHBhZ2VzLmxlbmd0aCA+IDAsXG5cdFx0XHRcdHN1Ym1lbnU6IFtdLFxuXHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdHR5cGU6IFwiU2F2ZVBhZ2VBc1wiLFxuXHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdGN1c3RvbUlkOiBcIlNob3dEZWxldGVcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGRlbGV0ZVBhZ2VzTWVudTogT3BlbkZpbi5NZW51SXRlbVRlbXBsYXRlW10gPSBbXTtcblxuXHRcdFx0bGV0IGJyb3dzZXJXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSB8IHVuZGVmaW5lZCA9IHJlbGF0ZWRNZW51SWQ/LndpbmRvd0lkZW50aXR5O1xuXG5cdFx0XHRpZiAoYnJvd3NlcldpbmRvd0lkZW50aXR5KSB7XG5cdFx0XHRcdGNvbnN0IGJyb3dzZXJXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKGJyb3dzZXJXaW5kb3dJZGVudGl0eSk7XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRPcHRpb25zKCk7XG5cdFx0XHRcdGNvbnN0IHdvcmtzcGFjZU9wdGlvbnM6IE9wZW5GaW4uV29ya3NwYWNlUGxhdGZvcm1PcHRpb25zID0gb3B0aW9ucy53b3Jrc3BhY2VQbGF0Zm9ybTtcblxuXHRcdFx0XHRpZiAod29ya3NwYWNlT3B0aW9ucy5kaXNhYmxlTXVsdGlwbGVQYWdlcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGJyb3dzZXJXaW5kb3dJZGVudGl0eSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhbGxPcGVuUGFnZXMgPSBhd2FpdCBwbGF0Zm9ybS5Ccm93c2VyLmdldEFsbEF0dGFjaGVkUGFnZXMoKTtcblxuXHRcdFx0aWYgKHBhZ2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0XHRcdFx0Y29uc3QgZXhpc3RpbmcgPSBhbGxPcGVuUGFnZXMuZmluZCgob3BlblBhZ2UpID0+IHBhZ2UucGFnZUlkID09PSBvcGVuUGFnZS5wYWdlSWQpO1xuXHRcdFx0XHRcdGNvbnN0IGlzQWN0aXZlRXhpc3RpbmdQYWdlT25DdXJyZW50V2luZG93ID1cblx0XHRcdFx0XHRcdCFpc0VtcHR5KGV4aXN0aW5nPy5wYXJlbnRJZGVudGl0eSkgJiZcblx0XHRcdFx0XHRcdGV4aXN0aW5nPy5wYXJlbnRJZGVudGl0eS5uYW1lID09PSBicm93c2VyV2luZG93SWRlbnRpdHk/Lm5hbWUgJiZcblx0XHRcdFx0XHRcdGV4aXN0aW5nPy5pc0FjdGl2ZTtcblx0XHRcdFx0XHRzaG93UGFnZXNNZW51LnB1c2goe1xuXHRcdFx0XHRcdFx0bGFiZWw6IHBhZ2UudGl0bGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLFxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogIWlzQWN0aXZlRXhpc3RpbmdQYWdlT25DdXJyZW50V2luZG93LFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdGlkOiBcInBhZ2Utb3BlblwiLFxuXHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhZ2VJZDogcGFnZS5wYWdlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3dJZGVudGl0eTogYnJvd3NlcldpbmRvd0lkZW50aXR5XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZGVsZXRlUGFnZXNNZW51LnB1c2goe1xuXHRcdFx0XHRcdFx0bGFiZWw6IHBhZ2UudGl0bGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLFxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogaXNFbXB0eShleGlzdGluZyksXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWQ6IFwicGFnZS1kZWxldGVcIixcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYWdlSWQ6IHBhZ2UucGFnZUlkXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHNob3dQYWdlTWVudUVudHJ5LnN1Ym1lbnUpIHtcblx0XHRcdFx0XHRzaG93UGFnZU1lbnVFbnRyeS5zdWJtZW51LnB1c2goLi4uc2hvd1BhZ2VzTWVudSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGRlbGV0ZVBhZ2VNZW51RW50cnkuc3VibWVudSkge1xuXHRcdFx0XHRcdGRlbGV0ZVBhZ2VNZW51RW50cnkuc3VibWVudS5wdXNoKC4uLmRlbGV0ZVBhZ2VzTWVudSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgbWVudUl0ZW1zVG9SZXR1cm46IE1lbnVFbnRyeVtdID0gW107XG5cblx0XHRcdGlmIChpbmNsdWRlRGVsZXRlUGFnZSkge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKGRlbGV0ZVBhZ2VNZW51RW50cnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5jbHVkZVNob3dQYWdlKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goc2hvd1BhZ2VNZW51RW50cnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWVudUl0ZW1zVG9SZXR1cm47XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBQYWdlQWN0aW9ucyB9IGZyb20gXCIuL2FjdGlvbnNcIjtcbmltcG9ydCB7IEluaXRPcHRpb25zU2hvd1BhZ2VIYW5kbGVyIH0gZnJvbSBcIi4vaW5pdC1vcHRpb25zXCI7XG5pbXBvcnQgeyBQYWdlTWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IFBhZ2VBY3Rpb25zKCksXG5cdG1lbnVzOiBuZXcgUGFnZU1lbnVzKCksXG5cdGluaXRPcHRpb25zOiBuZXcgSW5pdE9wdGlvbnNTaG93UGFnZUhhbmRsZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==