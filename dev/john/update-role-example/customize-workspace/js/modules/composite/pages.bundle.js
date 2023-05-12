/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/pages/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/pages/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageActions": () => (/* binding */ PageActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class PageActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("PageActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["page-open"] = async (payload) => {
            if (payload.callerType !== this._helpers.callerTypes.API) {
                const pageId = payload?.customData?.pageId;
                const targetWindowIdentity = payload?.customData?.windowIdentity;
                if (pageId !== undefined) {
                    const page = await platform.Storage.getPage(pageId);
                    if (page !== undefined && page !== null) {
                        if (targetWindowIdentity !== undefined) {
                            this._logger.info(`Adding page with id: ${pageId} to the current window with name: ${targetWindowIdentity.name}`);
                            const targetWindow = platform.Browser.wrapSync(targetWindowIdentity);
                            await targetWindow.addPage(page);
                            await targetWindow.setActivePage(pageId);
                        }
                        else {
                            this._logger.info(`Adding page with id: ${pageId} to the current a new window as no window identity was provided (likely unable to add a page to the window)`);
                            const newWindow = {
                                workspacePlatform: {
                                    pages: [page]
                                }
                            };
                            await platform.Browser.createWindow(newWindow);
                        }
                    }
                }
            }
        };
        actionMap["page-show"] = async (payload) => {
            if (payload.callerType !== this._helpers.callerTypes.API) {
                const pageId = payload?.customData?.pageId;
                const parentIdentity = payload?.customData?.windowIdentity;
                if (pageId !== undefined && parentIdentity !== undefined) {
                    this._logger.info(`Showing page with id: ${pageId} by bringing window with name: ${parentIdentity.name} to the foreground.`);
                    const pageWindow = platform.Browser.wrapSync(parentIdentity);
                    const windowState = await pageWindow.openfinWindow.getState();
                    if (windowState === "minimized") {
                        await pageWindow.openfinWindow.restore();
                    }
                    await pageWindow.openfinWindow.setAsForeground();
                    await pageWindow.setActivePage(pageId);
                }
            }
        };
        actionMap["page-delete"] = async (payload) => {
            if (payload.callerType !== this._helpers.callerTypes.API) {
                const pageId = payload?.customData?.pageId;
                if (pageId !== undefined) {
                    this._logger.info(`Deleting page with id: ${pageId}`);
                    await platform.Storage.deletePage(pageId);
                }
            }
        };
        return actionMap;
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
/* harmony export */   "PageMenus": () => (/* binding */ PageMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class PageMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("PageMenus");
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
            const pages = await platform.Storage.getPages();
            const includeDeletePage = this._settings?.deletePage?.include === undefined || this._settings?.deletePage?.include;
            const includeShowPage = this._settings?.showPage?.include === undefined || this._settings?.showPage?.include;
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
            let browserWindowIdentity = relatedMenuId.windowIdentity;
            const browserWindow = platform.Browser.wrapSync(browserWindowIdentity);
            const options = await browserWindow.openfinWindow.getOptions();
            const workspaceOptions = options.workspacePlatform;
            if (workspaceOptions.disableMultiplePages === true) {
                browserWindowIdentity = undefined;
            }
            const allOpenPages = await platform.Browser.getAllAttachedPages();
            if (pages.length > 0) {
                for (const page of pages) {
                    const existingPage = allOpenPages.find((openPage) => page.pageId === openPage.pageId);
                    const isActiveExistingPageOnCurrentWindow = existingPage !== undefined &&
                        existingPage.parentIdentity.name === browserWindowIdentity.name &&
                        existingPage?.isActive;
                    showPagesMenu.push({
                        label: page.title,
                        type: "normal",
                        enabled: !isActiveExistingPageOnCurrentWindow,
                        data: {
                            type: "Custom",
                            action: {
                                id: existingPage !== undefined ? "page-show" : "page-open",
                                customData: {
                                    pageId: page.pageId,
                                    windowIdentity: existingPage !== undefined ? existingPage.parentIdentity : browserWindowIdentity
                                }
                            }
                        }
                    });
                    deletePagesMenu.push({
                        label: page.title,
                        type: "normal",
                        enabled: existingPage === undefined,
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
/*!*****************************************************!*\
  !*** ./client/src/modules/composite/pages/index.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/pages/actions.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/pages/menus.ts");


const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.PageActions(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_1__.PageMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDcEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDMUM7WUFFRCwwRkFBMEY7WUFDMUYsK0RBQStEO1lBQy9ELE9BQU8saUJBQWlCLENBQUM7U0FDekI7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0M5SkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMd0M7QUFDSjtBQUU3QixNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksaURBQVcsRUFBRTtJQUMxQixLQUFLLEVBQUUsSUFBSSw2Q0FBUyxFQUFFO0NBQ3RCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdCxcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBBY3Rpb25IZWxwZXJzLCBBY3Rpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiUGFnZUFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJwYWdlLW9wZW5cIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5BUEkpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGNvbnN0IHRhcmdldFdpbmRvd0lkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGlmIChwYWdlSWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2UgPSBhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmdldFBhZ2UocGFnZUlkKTtcblxuXHRcdFx0XHRcdGlmIChwYWdlICE9PSB1bmRlZmluZWQgJiYgcGFnZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldFdpbmRvd0lkZW50aXR5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XHRcdFx0YEFkZGluZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfSB0byB0aGUgY3VycmVudCB3aW5kb3cgd2l0aCBuYW1lOiAke3RhcmdldFdpbmRvd0lkZW50aXR5Lm5hbWV9YFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHRhcmdldFdpbmRvd0lkZW50aXR5KTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGFyZ2V0V2luZG93LmFkZFBhZ2UocGFnZSk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRhcmdldFdpbmRvdy5zZXRBY3RpdmVQYWdlKHBhZ2VJZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdFx0XHRgQWRkaW5nIHBhZ2Ugd2l0aCBpZDogJHtwYWdlSWR9IHRvIHRoZSBjdXJyZW50IGEgbmV3IHdpbmRvdyBhcyBubyB3aW5kb3cgaWRlbnRpdHkgd2FzIHByb3ZpZGVkIChsaWtlbHkgdW5hYmxlIHRvIGFkZCBhIHBhZ2UgdG8gdGhlIHdpbmRvdylgXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5ld1dpbmRvdzogQnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3QgPSB7XG5cdFx0XHRcdFx0XHRcdFx0d29ya3NwYWNlUGxhdGZvcm06IHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhZ2VzOiBbcGFnZV1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLkJyb3dzZXIuY3JlYXRlV2luZG93KG5ld1dpbmRvdyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInBhZ2Utc2hvd1wiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlICE9PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLkFQSSkge1xuXHRcdFx0XHRjb25zdCBwYWdlSWQ6IHN0cmluZyA9IHBheWxvYWQ/LmN1c3RvbURhdGE/LnBhZ2VJZDtcblx0XHRcdFx0Y29uc3QgcGFyZW50SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy53aW5kb3dJZGVudGl0eTtcblx0XHRcdFx0aWYgKHBhZ2VJZCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudElkZW50aXR5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdGBTaG93aW5nIHBhZ2Ugd2l0aCBpZDogJHtwYWdlSWR9IGJ5IGJyaW5naW5nIHdpbmRvdyB3aXRoIG5hbWU6ICR7cGFyZW50SWRlbnRpdHkubmFtZX0gdG8gdGhlIGZvcmVncm91bmQuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZVdpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmMocGFyZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRcdGNvbnN0IHdpbmRvd1N0YXRlID0gYXdhaXQgcGFnZVdpbmRvdy5vcGVuZmluV2luZG93LmdldFN0YXRlKCk7XG5cdFx0XHRcdFx0aWYgKHdpbmRvd1N0YXRlID09PSBcIm1pbmltaXplZFwiKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBwYWdlV2luZG93Lm9wZW5maW5XaW5kb3cucmVzdG9yZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCBwYWdlV2luZG93Lm9wZW5maW5XaW5kb3cuc2V0QXNGb3JlZ3JvdW5kKCk7XG5cdFx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5zZXRBY3RpdmVQYWdlKHBhZ2VJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wicGFnZS1kZWxldGVcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5BUEkpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGlmIChwYWdlSWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBEZWxldGluZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfWApO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLCBQYWdlLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTWVudXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgUmVsYXRlZE1lbnVJZCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZU1lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlTWVudXMgaW1wbGVtZW50cyBNZW51czxQYWdlTWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9zZXR0aW5nczogUGFnZU1lbnVTZXR0aW5ncztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFBhZ2VNZW51U2V0dGluZ3M+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIlBhZ2VNZW51c1wiKTtcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1lbnVzIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIG1lbnVUeXBlIFRoZSB0eXBlIG9mIG1lbnUgdG8gZ2V0IHRoZSBlbnRyaWVzIGZvci5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBjdXJyZW50IHBsYXRmb3JtLlxuXHQgKiBAcGFyYW0gcmVsYXRlZE1lbnVJZCBUaGUgcmVsYXRlZCBtZW51IGluZm9ybWF0aW9uICh2aWV3SWQvdmlld0lkcywgcGFnZUlkIGFuZCB3aW5kb3cgSWQgYmFzZWQgb24gdGhlIHR5cGUgb2YgbWVudSkuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KFxuXHRcdG1lbnVUeXBlOiBNZW51VHlwZSxcblx0XHRwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUsXG5cdFx0cmVsYXRlZE1lbnVJZD86IFJlbGF0ZWRNZW51SWRcblx0KTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIiAmJiByZWxhdGVkTWVudUlkLndpbmRvd0lkZW50aXR5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIHlvdSBjYW4gY3VzdG9taXplIHRoZSBicm93c2VyIG1haW4gbWVudSBoZXJlXG5cdFx0XHRjb25zdCBwYWdlczogUGFnZVtdID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlcygpO1xuXHRcdFx0Y29uc3QgaW5jbHVkZURlbGV0ZVBhZ2UgPVxuXHRcdFx0XHR0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8uaW5jbHVkZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5pbmNsdWRlO1xuXHRcdFx0Y29uc3QgaW5jbHVkZVNob3dQYWdlID1cblx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5pbmNsdWRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5pbmNsdWRlO1xuXHRcdFx0Y29uc3Qgc2hvd1BhZ2VzTWVudTogT3BlbkZpbi5NZW51SXRlbVRlbXBsYXRlW10gPSBbXTtcblx0XHRcdGNvbnN0IHNob3dQYWdlTWVudUVudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/Lm1lbnVMYWJlbCA/PyBcIlNob3cgUGFnZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiBwYWdlcy5sZW5ndGggPiAwLFxuXHRcdFx0XHRzdWJtZW51OiBbXSxcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIlNhdmVQYWdlQXNcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRjdXN0b21JZDogXCJTaG93UGFnZVwiLFxuXHRcdFx0XHRcdC4uLnRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8ubWVudVBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRjb25zdCBkZWxldGVQYWdlTWVudUVudHJ5OiBNZW51RW50cnkgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8ubWVudUxhYmVsID8/IFwiRGVsZXRlIFBhZ2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiBwYWdlcy5sZW5ndGggPiAwLFxuXHRcdFx0XHRzdWJtZW51OiBbXSxcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIlNhdmVQYWdlQXNcIixcblx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRjdXN0b21JZDogXCJTaG93RGVsZXRlXCIsXG5cdFx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBkZWxldGVQYWdlc01lbnU6IE9wZW5GaW4uTWVudUl0ZW1UZW1wbGF0ZVtdID0gW107XG5cblx0XHRcdGxldCBicm93c2VyV2luZG93SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSByZWxhdGVkTWVudUlkLndpbmRvd0lkZW50aXR5O1xuXG5cdFx0XHRjb25zdCBicm93c2VyV2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyhicm93c2VyV2luZG93SWRlbnRpdHkpO1xuXG5cdFx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgYnJvd3NlcldpbmRvdy5vcGVuZmluV2luZG93LmdldE9wdGlvbnMoKTtcblx0XHRcdGNvbnN0IHdvcmtzcGFjZU9wdGlvbnM6IE9wZW5GaW4uV29ya3NwYWNlUGxhdGZvcm1PcHRpb25zID0gb3B0aW9ucy53b3Jrc3BhY2VQbGF0Zm9ybTtcblxuXHRcdFx0aWYgKHdvcmtzcGFjZU9wdGlvbnMuZGlzYWJsZU11bHRpcGxlUGFnZXMgPT09IHRydWUpIHtcblx0XHRcdFx0YnJvd3NlcldpbmRvd0lkZW50aXR5ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhbGxPcGVuUGFnZXMgPSBhd2FpdCBwbGF0Zm9ybS5Ccm93c2VyLmdldEFsbEF0dGFjaGVkUGFnZXMoKTtcblxuXHRcdFx0aWYgKHBhZ2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0XHRcdFx0Y29uc3QgZXhpc3RpbmdQYWdlID0gYWxsT3BlblBhZ2VzLmZpbmQoKG9wZW5QYWdlKSA9PiBwYWdlLnBhZ2VJZCA9PT0gb3BlblBhZ2UucGFnZUlkKTtcblx0XHRcdFx0XHRjb25zdCBpc0FjdGl2ZUV4aXN0aW5nUGFnZU9uQ3VycmVudFdpbmRvdyA9XG5cdFx0XHRcdFx0XHRleGlzdGluZ1BhZ2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdFx0ZXhpc3RpbmdQYWdlLnBhcmVudElkZW50aXR5Lm5hbWUgPT09IGJyb3dzZXJXaW5kb3dJZGVudGl0eS5uYW1lICYmXG5cdFx0XHRcdFx0XHRleGlzdGluZ1BhZ2U/LmlzQWN0aXZlO1xuXHRcdFx0XHRcdHNob3dQYWdlc01lbnUucHVzaCh7XG5cdFx0XHRcdFx0XHRsYWJlbDogcGFnZS50aXRsZSxcblx0XHRcdFx0XHRcdHR5cGU6IFwibm9ybWFsXCIsXG5cdFx0XHRcdFx0XHRlbmFibGVkOiAhaXNBY3RpdmVFeGlzdGluZ1BhZ2VPbkN1cnJlbnRXaW5kb3csXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWQ6IGV4aXN0aW5nUGFnZSAhPT0gdW5kZWZpbmVkID8gXCJwYWdlLXNob3dcIiA6IFwicGFnZS1vcGVuXCIsXG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFnZUlkOiBwYWdlLnBhZ2VJZCxcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvd0lkZW50aXR5OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRleGlzdGluZ1BhZ2UgIT09IHVuZGVmaW5lZCA/IGV4aXN0aW5nUGFnZS5wYXJlbnRJZGVudGl0eSA6IGJyb3dzZXJXaW5kb3dJZGVudGl0eVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGRlbGV0ZVBhZ2VzTWVudS5wdXNoKHtcblx0XHRcdFx0XHRcdGxhYmVsOiBwYWdlLnRpdGxlLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJub3JtYWxcIixcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGV4aXN0aW5nUGFnZSA9PT0gdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdGlkOiBcInBhZ2UtZGVsZXRlXCIsXG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFnZUlkOiBwYWdlLnBhZ2VJZFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzaG93UGFnZU1lbnVFbnRyeS5zdWJtZW51KSB7XG5cdFx0XHRcdFx0c2hvd1BhZ2VNZW51RW50cnkuc3VibWVudS5wdXNoKC4uLnNob3dQYWdlc01lbnUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChkZWxldGVQYWdlTWVudUVudHJ5LnN1Ym1lbnUpIHtcblx0XHRcdFx0XHRkZWxldGVQYWdlTWVudUVudHJ5LnN1Ym1lbnUucHVzaCguLi5kZWxldGVQYWdlc01lbnUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IG1lbnVJdGVtc1RvUmV0dXJuOiBNZW51RW50cnlbXSA9IFtdO1xuXG5cdFx0XHRpZiAoaW5jbHVkZURlbGV0ZVBhZ2UpIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChkZWxldGVQYWdlTWVudUVudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluY2x1ZGVTaG93UGFnZSkge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKHNob3dQYWdlTWVudUVudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXZlbiB0aG91Z2h0IHRoZSBhcnJheSBpcyB0eXBlZCBlc2xpbnQgd2lsbCBzdGlsbCBjb21wbGFpbiBzbyB0aGUgcnVsZSBpcyBkaXNhYmxlZCBoZXJlXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgUGFnZUFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBQYWdlTWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IFBhZ2VBY3Rpb25zKCksXG5cdG1lbnVzOiBuZXcgUGFnZU1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=