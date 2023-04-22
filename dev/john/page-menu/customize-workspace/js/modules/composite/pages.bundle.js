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
            if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
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
            if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
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
            if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
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
                submenu: []
            };
            const showPagePosition = {
                type: "SavePageAs",
                operation: "after",
                customId: "ShowPage",
                ...this._settings?.showPage?.menuPosition
            };
            const deletePageMenuEntry = {
                label: this._settings?.deletePage?.menuLabel ?? "Delete Page",
                icon: this._settings?.deletePage?.menuIcon,
                enabled: pages.length > 0,
                submenu: []
            };
            const deletePagePosition = {
                type: "SavePageAs",
                operation: "after",
                customId: "ShowDelete",
                ...this._settings?.deletePage?.menuPosition
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
                menuItemsToReturn.push({ ...deletePageMenuEntry, position: deletePagePosition });
            }
            if (includeShowPage) {
                menuItemsToReturn.push({ ...showPageMenuEntry, position: showPagePosition });
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVdBOztHQUVHO0FBQ0ksTUFBTSxXQUFXO0lBV3ZCOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQTRCLEVBQzVCLFlBQTJCLEVBQzNCLE9BQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBaUM7UUFDakQsTUFBTSxTQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUV2QyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxFQUFFLE9BQTRCLEVBQUUsRUFBRTtZQUMvRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3ZFLE1BQU0sTUFBTSxHQUFXLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO2dCQUNuRCxNQUFNLG9CQUFvQixHQUFxQixPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztnQkFDbkYsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUVwRCxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTt3QkFDeEMsSUFBSSxvQkFBb0IsS0FBSyxTQUFTLEVBQUU7NEJBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQix3QkFBd0IsTUFBTSxxQ0FBcUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQzlGLENBQUM7NEJBQ0YsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDckUsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNqQyxNQUFNLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3pDOzZCQUFNOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQix3QkFBd0IsTUFBTSw2R0FBNkcsQ0FDM0ksQ0FBQzs0QkFDRixNQUFNLFNBQVMsR0FBK0I7Z0NBQzdDLGlCQUFpQixFQUFFO29DQUNsQixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7aUNBQ2I7NkJBQ0QsQ0FBQzs0QkFDRixNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUMvQztxQkFDRDtpQkFDRDthQUNEO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssRUFBRSxPQUE0QixFQUFFLEVBQUU7WUFDL0QsSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO2dCQUN2RSxNQUFNLE1BQU0sR0FBVyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztnQkFDbkQsTUFBTSxjQUFjLEdBQXFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDO2dCQUM3RSxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRTtvQkFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2hCLHlCQUF5QixNQUFNLGtDQUFrQyxjQUFjLENBQUMsSUFBSSxxQkFBcUIsQ0FDekcsQ0FBQztvQkFDRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDN0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5RCxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUU7d0JBQ2hDLE1BQU0sVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDekM7b0JBQ0QsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUNqRCxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Q7UUFDRixDQUFDLENBQUM7UUFFRixTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxFQUFFLE9BQTRCLEVBQUUsRUFBRTtZQUNqRSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3ZFLE1BQU0sTUFBTSxHQUFXLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO2dCQUNuRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQzthQUNEO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUMvRkQ7O0dBRUc7QUFDSSxNQUFNLFNBQVM7SUFXckI7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDdEIsVUFBOEMsRUFDOUMsWUFBMkIsRUFDM0IsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQ2YsUUFBa0IsRUFDbEIsUUFBaUMsRUFDakMsYUFBNkI7UUFFN0IsSUFBSSxRQUFRLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3hFLCtDQUErQztZQUMvQyxNQUFNLEtBQUssR0FBVyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsTUFBTSxpQkFBaUIsR0FDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7WUFDMUYsTUFBTSxlQUFlLEdBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBQ3RGLE1BQU0sYUFBYSxHQUErQixFQUFFLENBQUM7WUFDckQsTUFBTSxpQkFBaUIsR0FBa0M7Z0JBQ3hELEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLElBQUksV0FBVztnQkFDekQsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVE7Z0JBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxFQUFFO2FBQ1gsQ0FBQztZQUNGLE1BQU0sZ0JBQWdCLEdBQUc7Z0JBQ3hCLElBQUksRUFBRSxZQUFZO2dCQUNsQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWTthQUN6QyxDQUFDO1lBQ0YsTUFBTSxtQkFBbUIsR0FBa0M7Z0JBQzFELEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLElBQUksYUFBYTtnQkFDN0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVE7Z0JBQzFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxFQUFFO2FBQ1gsQ0FBQztZQUNGLE1BQU0sa0JBQWtCLEdBQUc7Z0JBQzFCLElBQUksRUFBRSxZQUFZO2dCQUNsQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWTthQUMzQyxDQUFDO1lBQ0YsTUFBTSxlQUFlLEdBQStCLEVBQUUsQ0FBQztZQUV2RCxJQUFJLHFCQUFxQixHQUFxQixhQUFhLENBQUMsY0FBYyxDQUFDO1lBRTNFLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFdkUsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9ELE1BQU0sZ0JBQWdCLEdBQXFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUNyRixJQUFJLGdCQUFnQixDQUFDLG9CQUFvQixLQUFLLElBQUksRUFBRTtnQkFDbkQscUJBQXFCLEdBQUcsU0FBUyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDbEUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7b0JBQ3pCLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0RixNQUFNLG1DQUFtQyxHQUN4QyxZQUFZLEtBQUssU0FBUzt3QkFDMUIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsSUFBSTt3QkFDL0QsWUFBWSxFQUFFLFFBQVEsQ0FBQztvQkFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsQ0FBQyxtQ0FBbUM7d0JBQzdDLElBQUksRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBOEM7NEJBQ3BELE1BQU0sRUFBRTtnQ0FDUCxFQUFFLEVBQUUsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXO2dDQUMxRCxVQUFVLEVBQUU7b0NBQ1gsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29DQUNuQixjQUFjLEVBQ2IsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO2lDQUNqRjs2QkFDRDt5QkFDRDtxQkFDRCxDQUFDLENBQUM7b0JBQ0gsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsWUFBWSxLQUFLLFNBQVM7d0JBQ25DLElBQUksRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBOEM7NEJBQ3BELE1BQU0sRUFBRTtnQ0FDUCxFQUFFLEVBQUUsYUFBYTtnQ0FDakIsVUFBVSxFQUFFO29DQUNYLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtpQ0FDbkI7NkJBQ0Q7eUJBQ0Q7cUJBQ0QsQ0FBQyxDQUFDO2lCQUNIO2dCQUNELElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFO29CQUM5QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7aUJBQ2pEO2dCQUNELElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFO29CQUNoQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7aUJBQ3JEO2FBQ0Q7WUFFRCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUU3QixJQUFJLGlCQUFpQixFQUFFO2dCQUN0QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBZSxDQUFDLENBQUM7YUFDOUY7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDcEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQWUsQ0FBQyxDQUFDO2FBQzFGO1lBRUQsK0RBQStEO1lBQy9ELE9BQU8saUJBQWlCLENBQUM7U0FDekI7SUFDRixDQUFDO0NBQ0Q7Ozs7Ozs7U0MvSkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMd0M7QUFDSjtBQUU3QixNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksaURBQVcsRUFBRTtJQUMxQixLQUFLLEVBQUUsSUFBSSw2Q0FBUyxFQUFFO0NBQ3RCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvbWVudXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvcGFnZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdCxcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBBY3Rpb25IZWxwZXJzLCBBY3Rpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2FjdGlvbnMtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VBY3Rpb25zIGltcGxlbWVudHMgQWN0aW9ucyB7XG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogQWN0aW9uSGVscGVycztcblxuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBjcmVhdGVMb2dnZXIgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb24sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IEFjdGlvbkhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiUGFnZUFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJwYWdlLW9wZW5cIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5HbG9iYWxDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCBwYWdlSWQ6IHN0cmluZyA9IHBheWxvYWQ/LmN1c3RvbURhdGE/LnBhZ2VJZDtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHkgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy53aW5kb3dJZGVudGl0eTtcblx0XHRcdFx0aWYgKHBhZ2VJZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZShwYWdlSWQpO1xuXG5cdFx0XHRcdFx0aWYgKHBhZ2UgIT09IHVuZGVmaW5lZCAmJiBwYWdlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0V2luZG93SWRlbnRpdHkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdFx0XHRgQWRkaW5nIHBhZ2Ugd2l0aCBpZDogJHtwYWdlSWR9IHRvIHRoZSBjdXJyZW50IHdpbmRvdyB3aXRoIG5hbWU6ICR7dGFyZ2V0V2luZG93SWRlbnRpdHkubmFtZX1gXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldFdpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmModGFyZ2V0V2luZG93SWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0YXJnZXRXaW5kb3cuYWRkUGFnZShwYWdlKTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGFyZ2V0V2luZG93LnNldEFjdGl2ZVBhZ2UocGFnZUlkKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcdGBBZGRpbmcgcGFnZSB3aXRoIGlkOiAke3BhZ2VJZH0gdG8gdGhlIGN1cnJlbnQgYSBuZXcgd2luZG93IGFzIG5vIHdpbmRvdyBpZGVudGl0eSB3YXMgcHJvdmlkZWQgKGxpa2VseSB1bmFibGUgdG8gYWRkIGEgcGFnZSB0byB0aGUgd2luZG93KWBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmV3V2luZG93OiBCcm93c2VyQ3JlYXRlV2luZG93UmVxdWVzdCA9IHtcblx0XHRcdFx0XHRcdFx0XHR3b3Jrc3BhY2VQbGF0Zm9ybToge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFnZXM6IFtwYWdlXVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uQnJvd3Nlci5jcmVhdGVXaW5kb3cobmV3V2luZG93KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWN0aW9uTWFwW1wicGFnZS1zaG93XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGNvbnN0IHBhcmVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGlmIChwYWdlSWQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XHRgU2hvd2luZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfSBieSBicmluZ2luZyB3aW5kb3cgd2l0aCBuYW1lOiAke3BhcmVudElkZW50aXR5Lm5hbWV9IHRvIHRoZSBmb3JlZ3JvdW5kLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHBhcmVudElkZW50aXR5KTtcblx0XHRcdFx0XHRjb25zdCB3aW5kb3dTdGF0ZSA9IGF3YWl0IHBhZ2VXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRTdGF0ZSgpO1xuXHRcdFx0XHRcdGlmICh3aW5kb3dTdGF0ZSA9PT0gXCJtaW5pbWl6ZWRcIikge1xuXHRcdFx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5vcGVuZmluV2luZG93LnJlc3RvcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5vcGVuZmluV2luZG93LnNldEFzRm9yZWdyb3VuZCgpO1xuXHRcdFx0XHRcdGF3YWl0IHBhZ2VXaW5kb3cuc2V0QWN0aXZlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInBhZ2UtZGVsZXRlXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuR2xvYmFsQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGlmIChwYWdlSWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBEZWxldGluZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfWApO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZGVsZXRlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgTWVudUl0ZW1UZW1wbGF0ZSB9IGZyb20gXCJAb3BlbmZpbi9jb3JlL3NyYy9PcGVuRmluXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEdsb2JhbENvbnRleHRNZW51SXRlbVRlbXBsYXRlLFxuXHRHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUsXG5cdFBhZ2UsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTWVudXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTWVudUVudHJ5LCBNZW51VHlwZSwgUmVsYXRlZE1lbnVJZCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tZW51LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUGFnZU1lbnVPcHRpb25zIGFzIFBhZ2VNZW51U2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIG1lbnVzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZU1lbnVzIGltcGxlbWVudHMgTWVudXM8UGFnZU1lbnVTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IFBhZ2VNZW51U2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGNyZWF0ZUxvZ2dlciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlTWVudVNldHRpbmdzPixcblx0XHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJQYWdlTWVudXNcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHJlbGF0ZWRNZW51SWQgVGhlIHJlbGF0ZWQgbWVudSBpbmZvcm1hdGlvbiAodmlld0lkL3ZpZXdJZHMsIHBhZ2VJZCBhbmQgd2luZG93IElkIGJhc2VkIG9uIHRoZSB0eXBlIG9mIG1lbnUpLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChcblx0XHRtZW51VHlwZTogTWVudVR5cGUsXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHJlbGF0ZWRNZW51SWQ/OiBSZWxhdGVkTWVudUlkXG5cdCk6IFByb21pc2U8TWVudUVudHJ5PE1lbnVJdGVtVGVtcGxhdGU+W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAobWVudVR5cGUgPT09IFwiZ2xvYmFsXCIgJiYgcmVsYXRlZE1lbnVJZC53aW5kb3dJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyB5b3UgY2FuIGN1c3RvbWl6ZSB0aGUgYnJvd3NlciBtYWluIG1lbnUgaGVyZVxuXHRcdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRcdGNvbnN0IGluY2x1ZGVEZWxldGVQYWdlID1cblx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/LmluY2x1ZGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IGluY2x1ZGVTaG93UGFnZSA9XG5cdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8uaW5jbHVkZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IHNob3dQYWdlc01lbnU6IE9wZW5GaW4uTWVudUl0ZW1UZW1wbGF0ZVtdID0gW107XG5cdFx0XHRjb25zdCBzaG93UGFnZU1lbnVFbnRyeTogR2xvYmFsQ29udGV4dE1lbnVJdGVtVGVtcGxhdGUgPSB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/Lm1lbnVMYWJlbCA/PyBcIlNob3cgUGFnZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/Lm1lbnVJY29uLFxuXHRcdFx0XHRlbmFibGVkOiBwYWdlcy5sZW5ndGggPiAwLFxuXHRcdFx0XHRzdWJtZW51OiBbXVxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IHNob3dQYWdlUG9zaXRpb24gPSB7XG5cdFx0XHRcdHR5cGU6IFwiU2F2ZVBhZ2VBc1wiLFxuXHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0Y3VzdG9tSWQ6IFwiU2hvd1BhZ2VcIixcblx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5tZW51UG9zaXRpb25cblx0XHRcdH07XG5cdFx0XHRjb25zdCBkZWxldGVQYWdlTWVudUVudHJ5OiBHbG9iYWxDb250ZXh0TWVudUl0ZW1UZW1wbGF0ZSA9IHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5tZW51TGFiZWwgPz8gXCJEZWxldGUgUGFnZVwiLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8ubWVudUljb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHBhZ2VzLmxlbmd0aCA+IDAsXG5cdFx0XHRcdHN1Ym1lbnU6IFtdXG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZGVsZXRlUGFnZVBvc2l0aW9uID0ge1xuXHRcdFx0XHR0eXBlOiBcIlNhdmVQYWdlQXNcIixcblx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdGN1c3RvbUlkOiBcIlNob3dEZWxldGVcIixcblx0XHRcdFx0Li4udGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/Lm1lbnVQb3NpdGlvblxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGRlbGV0ZVBhZ2VzTWVudTogT3BlbkZpbi5NZW51SXRlbVRlbXBsYXRlW10gPSBbXTtcblxuXHRcdFx0bGV0IGJyb3dzZXJXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHJlbGF0ZWRNZW51SWQud2luZG93SWRlbnRpdHk7XG5cblx0XHRcdGNvbnN0IGJyb3dzZXJXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKGJyb3dzZXJXaW5kb3dJZGVudGl0eSk7XG5cblx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBicm93c2VyV2luZG93Lm9wZW5maW5XaW5kb3cuZ2V0T3B0aW9ucygpO1xuXHRcdFx0Y29uc3Qgd29ya3NwYWNlT3B0aW9uczogT3BlbkZpbi5Xb3Jrc3BhY2VQbGF0Zm9ybU9wdGlvbnMgPSBvcHRpb25zLndvcmtzcGFjZVBsYXRmb3JtO1xuXHRcdFx0aWYgKHdvcmtzcGFjZU9wdGlvbnMuZGlzYWJsZU11bHRpcGxlUGFnZXMgPT09IHRydWUpIHtcblx0XHRcdFx0YnJvd3NlcldpbmRvd0lkZW50aXR5ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgYWxsT3BlblBhZ2VzID0gYXdhaXQgcGxhdGZvcm0uQnJvd3Nlci5nZXRBbGxBdHRhY2hlZFBhZ2VzKCk7XG5cdFx0XHRpZiAocGFnZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcblx0XHRcdFx0XHRjb25zdCBleGlzdGluZ1BhZ2UgPSBhbGxPcGVuUGFnZXMuZmluZCgob3BlblBhZ2UpID0+IHBhZ2UucGFnZUlkID09PSBvcGVuUGFnZS5wYWdlSWQpO1xuXHRcdFx0XHRcdGNvbnN0IGlzQWN0aXZlRXhpc3RpbmdQYWdlT25DdXJyZW50V2luZG93ID1cblx0XHRcdFx0XHRcdGV4aXN0aW5nUGFnZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRleGlzdGluZ1BhZ2UucGFyZW50SWRlbnRpdHkubmFtZSA9PT0gYnJvd3NlcldpbmRvd0lkZW50aXR5Lm5hbWUgJiZcblx0XHRcdFx0XHRcdGV4aXN0aW5nUGFnZT8uaXNBY3RpdmU7XG5cdFx0XHRcdFx0c2hvd1BhZ2VzTWVudS5wdXNoKHtcblx0XHRcdFx0XHRcdGxhYmVsOiBwYWdlLnRpdGxlLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJub3JtYWxcIixcblx0XHRcdFx0XHRcdGVuYWJsZWQ6ICFpc0FjdGl2ZUV4aXN0aW5nUGFnZU9uQ3VycmVudFdpbmRvdyxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0XHRpZDogZXhpc3RpbmdQYWdlICE9PSB1bmRlZmluZWQgPyBcInBhZ2Utc2hvd1wiIDogXCJwYWdlLW9wZW5cIixcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYWdlSWQ6IHBhZ2UucGFnZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93SWRlbnRpdHk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGV4aXN0aW5nUGFnZSAhPT0gdW5kZWZpbmVkID8gZXhpc3RpbmdQYWdlLnBhcmVudElkZW50aXR5IDogYnJvd3NlcldpbmRvd0lkZW50aXR5XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZGVsZXRlUGFnZXNNZW51LnB1c2goe1xuXHRcdFx0XHRcdFx0bGFiZWw6IHBhZ2UudGl0bGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLFxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogZXhpc3RpbmdQYWdlID09PSB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIgYXMgR2xvYmFsQ29udGV4dE1lbnVPcHRpb25UeXBlLkN1c3RvbSxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWQ6IFwicGFnZS1kZWxldGVcIixcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYWdlSWQ6IHBhZ2UucGFnZUlkXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHNob3dQYWdlTWVudUVudHJ5LnN1Ym1lbnUpIHtcblx0XHRcdFx0XHRzaG93UGFnZU1lbnVFbnRyeS5zdWJtZW51LnB1c2goLi4uc2hvd1BhZ2VzTWVudSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGRlbGV0ZVBhZ2VNZW51RW50cnkuc3VibWVudSkge1xuXHRcdFx0XHRcdGRlbGV0ZVBhZ2VNZW51RW50cnkuc3VibWVudS5wdXNoKC4uLmRlbGV0ZVBhZ2VzTWVudSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgbWVudUl0ZW1zVG9SZXR1cm4gPSBbXTtcblxuXHRcdFx0aWYgKGluY2x1ZGVEZWxldGVQYWdlKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goeyAuLi5kZWxldGVQYWdlTWVudUVudHJ5LCBwb3NpdGlvbjogZGVsZXRlUGFnZVBvc2l0aW9uIH0gYXMgTWVudUVudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluY2x1ZGVTaG93UGFnZSkge1xuXHRcdFx0XHRtZW51SXRlbXNUb1JldHVybi5wdXNoKHsgLi4uc2hvd1BhZ2VNZW51RW50cnksIHBvc2l0aW9uOiBzaG93UGFnZVBvc2l0aW9uIH0gYXMgTWVudUVudHJ5KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG5cdFx0XHRyZXR1cm4gbWVudUl0ZW1zVG9SZXR1cm47XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IFBhZ2VBY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuaW1wb3J0IHsgUGFnZU1lbnVzIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBQYWdlQWN0aW9ucygpLFxuXHRtZW51czogbmV3IFBhZ2VNZW51cygpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9