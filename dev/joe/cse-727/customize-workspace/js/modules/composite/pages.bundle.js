/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/pages/actions.ts":
/*!*******************************************************!*\
  !*** ./client/src/modules/composite/pages/actions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageActions: () => (/* binding */ PageActions)
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
/* harmony export */   PageMenus: () => (/* binding */ PageMenus)
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
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/pages/menus.ts");


const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.PageActions(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_1__.PageMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVdBOztHQUVHO0FBQ0ksTUFBTSxXQUFXO0lBV3ZCOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQ3RCLFVBQTRCLEVBQzVCLFlBQTJCLEVBQzNCLE9BQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBaUM7UUFDakQsTUFBTSxTQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUV2QyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxFQUFFLE9BQTRCLEVBQUUsRUFBRTtZQUMvRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUN6RCxNQUFNLE1BQU0sR0FBVyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztnQkFDbkQsTUFBTSxvQkFBb0IsR0FBcUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUM7Z0JBQ25GLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFcEQsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7d0JBQ3hDLElBQUksb0JBQW9CLEtBQUssU0FBUyxFQUFFOzRCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsd0JBQXdCLE1BQU0scUNBQXFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUM5RixDQUFDOzRCQUNGLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7NEJBQ3JFLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakMsTUFBTSxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUN6Qzs2QkFBTTs0QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIsd0JBQXdCLE1BQU0sNkdBQTZHLENBQzNJLENBQUM7NEJBQ0YsTUFBTSxTQUFTLEdBQStCO2dDQUM3QyxpQkFBaUIsRUFBRTtvQ0FDbEIsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO2lDQUNiOzZCQUNELENBQUM7NEJBQ0YsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDL0M7cUJBQ0Q7aUJBQ0Q7YUFDRDtRQUNGLENBQUMsQ0FBQztRQUVGLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLEVBQUUsT0FBNEIsRUFBRSxFQUFFO1lBQy9ELElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pELE1BQU0sTUFBTSxHQUFXLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO2dCQUNuRCxNQUFNLGNBQWMsR0FBcUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUM7Z0JBQzdFLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO29CQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEIseUJBQXlCLE1BQU0sa0NBQWtDLGNBQWMsQ0FBQyxJQUFJLHFCQUFxQixDQUN6RyxDQUFDO29CQUNGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM3RCxNQUFNLFdBQVcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlELElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRTt3QkFDaEMsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUN6QztvQkFDRCxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ2pELE1BQU0sVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdkM7YUFDRDtRQUNGLENBQUMsQ0FBQztRQUVGLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLEVBQUUsT0FBNEIsRUFBRSxFQUFFO1lBQ2pFLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pELE1BQU0sTUFBTSxHQUFXLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO2dCQUNuRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQzthQUNEO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUNyR0Q7O0dBRUc7QUFDSSxNQUFNLFNBQVM7SUFXckI7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDdEIsVUFBOEMsRUFDOUMsWUFBMkIsRUFDM0IsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQ2YsUUFBa0IsRUFDbEIsUUFBaUMsRUFDakMsYUFBNkI7UUFFN0IsSUFBSSxRQUFRLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3hFLCtDQUErQztZQUMvQyxNQUFNLEtBQUssR0FBVyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsTUFBTSxpQkFBaUIsR0FDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7WUFDMUYsTUFBTSxlQUFlLEdBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBQ3RGLE1BQU0sYUFBYSxHQUErQixFQUFFLENBQUM7WUFDckQsTUFBTSxpQkFBaUIsR0FBYztnQkFDcEMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsSUFBSSxXQUFXO2dCQUN6RCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUTtnQkFDeEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFO29CQUNULElBQUksRUFBRSxZQUFZO29CQUNsQixTQUFTLEVBQUUsT0FBTztvQkFDbEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWTtpQkFDekM7YUFDRCxDQUFDO1lBQ0YsTUFBTSxtQkFBbUIsR0FBYztnQkFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsSUFBSSxhQUFhO2dCQUM3RCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUTtnQkFDMUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFO29CQUNULElBQUksRUFBRSxZQUFZO29CQUNsQixTQUFTLEVBQUUsT0FBTztvQkFDbEIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWTtpQkFDM0M7YUFDRCxDQUFDO1lBRUYsTUFBTSxlQUFlLEdBQStCLEVBQUUsQ0FBQztZQUV2RCxJQUFJLHFCQUFxQixHQUFxQixhQUFhLENBQUMsY0FBYyxDQUFDO1lBRTNFLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFdkUsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9ELE1BQU0sZ0JBQWdCLEdBQXFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUVyRixJQUFJLGdCQUFnQixDQUFDLG9CQUFvQixLQUFLLElBQUksRUFBRTtnQkFDbkQscUJBQXFCLEdBQUcsU0FBUyxDQUFDO2FBQ2xDO1lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFbEUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7b0JBQ3pCLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0RixNQUFNLG1DQUFtQyxHQUN4QyxZQUFZLEtBQUssU0FBUzt3QkFDMUIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsSUFBSTt3QkFDL0QsWUFBWSxFQUFFLFFBQVEsQ0FBQztvQkFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsQ0FBQyxtQ0FBbUM7d0JBQzdDLElBQUksRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBOEM7NEJBQ3BELE1BQU0sRUFBRTtnQ0FDUCxFQUFFLEVBQUUsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXO2dDQUMxRCxVQUFVLEVBQUU7b0NBQ1gsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29DQUNuQixjQUFjLEVBQ2IsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO2lDQUNqRjs2QkFDRDt5QkFDRDtxQkFDRCxDQUFDLENBQUM7b0JBQ0gsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsWUFBWSxLQUFLLFNBQVM7d0JBQ25DLElBQUksRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBOEM7NEJBQ3BELE1BQU0sRUFBRTtnQ0FDUCxFQUFFLEVBQUUsYUFBYTtnQ0FDakIsVUFBVSxFQUFFO29DQUNYLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtpQ0FDbkI7NkJBQ0Q7eUJBQ0Q7cUJBQ0QsQ0FBQyxDQUFDO2lCQUNIO2dCQUNELElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFO29CQUM5QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7aUJBQ2pEO2dCQUNELElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFO29CQUNoQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7aUJBQ3JEO2FBQ0Q7WUFFRCxNQUFNLGlCQUFpQixHQUFnQixFQUFFLENBQUM7WUFFMUMsSUFBSSxpQkFBaUIsRUFBRTtnQkFDdEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDcEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDMUM7WUFFRCxPQUFPLGlCQUFpQixDQUFDO1NBQ3pCO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDNUpEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTHdDO0FBQ0o7QUFFN0IsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLE9BQU8sRUFBRSxJQUFJLGlEQUFXLEVBQUU7SUFDMUIsS0FBSyxFQUFFLElBQUksNkNBQVMsRUFBRTtDQUN0QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3BhZ2VzL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3BhZ2VzL21lbnVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL3BhZ2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHtcblx0QnJvd3NlckNyZWF0ZVdpbmRvd1JlcXVlc3QsXG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgQWN0aW9uSGVscGVycywgQWN0aW9ucyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIlBhZ2VBY3Rpb25zXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wicGFnZS1vcGVuXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgIT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuQVBJKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VJZDogc3RyaW5nID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ucGFnZUlkO1xuXHRcdFx0XHRjb25zdCB0YXJnZXRXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQ/LmN1c3RvbURhdGE/LndpbmRvd0lkZW50aXR5O1xuXHRcdFx0XHRpZiAocGFnZUlkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRjb25zdCBwYWdlID0gYXdhaXQgcGxhdGZvcm0uU3RvcmFnZS5nZXRQYWdlKHBhZ2VJZCk7XG5cblx0XHRcdFx0XHRpZiAocGFnZSAhPT0gdW5kZWZpbmVkICYmIHBhZ2UgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRXaW5kb3dJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcdGBBZGRpbmcgcGFnZSB3aXRoIGlkOiAke3BhZ2VJZH0gdG8gdGhlIGN1cnJlbnQgd2luZG93IHdpdGggbmFtZTogJHt0YXJnZXRXaW5kb3dJZGVudGl0eS5uYW1lfWBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gcGxhdGZvcm0uQnJvd3Nlci53cmFwU3luYyh0YXJnZXRXaW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRhcmdldFdpbmRvdy5hZGRQYWdlKHBhZ2UpO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0YXJnZXRXaW5kb3cuc2V0QWN0aXZlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XHRcdFx0YEFkZGluZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfSB0byB0aGUgY3VycmVudCBhIG5ldyB3aW5kb3cgYXMgbm8gd2luZG93IGlkZW50aXR5IHdhcyBwcm92aWRlZCAobGlrZWx5IHVuYWJsZSB0byBhZGQgYSBwYWdlIHRvIHRoZSB3aW5kb3cpYFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXdXaW5kb3c6IEJyb3dzZXJDcmVhdGVXaW5kb3dSZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdFx0XHRcdHdvcmtzcGFjZVBsYXRmb3JtOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYWdlczogW3BhZ2VdXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5Ccm93c2VyLmNyZWF0ZVdpbmRvdyhuZXdXaW5kb3cpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRhY3Rpb25NYXBbXCJwYWdlLXNob3dcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSAhPT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5BUEkpIHtcblx0XHRcdFx0Y29uc3QgcGFnZUlkOiBzdHJpbmcgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy5wYWdlSWQ7XG5cdFx0XHRcdGNvbnN0IHBhcmVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGlmIChwYWdlSWQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XHRgU2hvd2luZyBwYWdlIHdpdGggaWQ6ICR7cGFnZUlkfSBieSBicmluZ2luZyB3aW5kb3cgd2l0aCBuYW1lOiAke3BhcmVudElkZW50aXR5Lm5hbWV9IHRvIHRoZSBmb3JlZ3JvdW5kLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3cgPSBwbGF0Zm9ybS5Ccm93c2VyLndyYXBTeW5jKHBhcmVudElkZW50aXR5KTtcblx0XHRcdFx0XHRjb25zdCB3aW5kb3dTdGF0ZSA9IGF3YWl0IHBhZ2VXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRTdGF0ZSgpO1xuXHRcdFx0XHRcdGlmICh3aW5kb3dTdGF0ZSA9PT0gXCJtaW5pbWl6ZWRcIikge1xuXHRcdFx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5vcGVuZmluV2luZG93LnJlc3RvcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXdhaXQgcGFnZVdpbmRvdy5vcGVuZmluV2luZG93LnNldEFzRm9yZWdyb3VuZCgpO1xuXHRcdFx0XHRcdGF3YWl0IHBhZ2VXaW5kb3cuc2V0QWN0aXZlUGFnZShwYWdlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInBhZ2UtZGVsZXRlXCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgIT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuQVBJKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VJZDogc3RyaW5nID0gcGF5bG9hZD8uY3VzdG9tRGF0YT8ucGFnZUlkO1xuXHRcdFx0XHRpZiAocGFnZUlkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgRGVsZXRpbmcgcGFnZSB3aXRoIGlkOiAke3BhZ2VJZH1gKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5TdG9yYWdlLmRlbGV0ZVBhZ2UocGFnZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYWN0aW9uTWFwO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZSwgUGFnZSwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1lbnVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1lbnVFbnRyeSwgTWVudVR5cGUsIFJlbGF0ZWRNZW51SWQgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbWVudS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IFBhZ2VNZW51U2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnQgdGhlIG1lbnVzLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZU1lbnVzIGltcGxlbWVudHMgTWVudXM8UGFnZU1lbnVTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVscGVyIG1ldGhvZHMgdG8gdXNlLlxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IFBhZ2VNZW51U2V0dGluZ3M7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGNyZWF0ZUxvZ2dlciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxQYWdlTWVudVNldHRpbmdzPixcblx0XHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJQYWdlTWVudXNcIik7XG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBkZWZpbml0aW9uLmRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBtZW51cyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBtZW51VHlwZSBUaGUgdHlwZSBvZiBtZW51IHRvIGdldCB0aGUgZW50cmllcyBmb3IuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgY3VycmVudCBwbGF0Zm9ybS5cblx0ICogQHBhcmFtIHJlbGF0ZWRNZW51SWQgVGhlIHJlbGF0ZWQgbWVudSBpbmZvcm1hdGlvbiAodmlld0lkL3ZpZXdJZHMsIHBhZ2VJZCBhbmQgd2luZG93IElkIGJhc2VkIG9uIHRoZSB0eXBlIG9mIG1lbnUpLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChcblx0XHRtZW51VHlwZTogTWVudVR5cGUsXG5cdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdHJlbGF0ZWRNZW51SWQ/OiBSZWxhdGVkTWVudUlkXG5cdCk6IFByb21pc2U8TWVudUVudHJ5W10gfCB1bmRlZmluZWQ+IHtcblx0XHRpZiAobWVudVR5cGUgPT09IFwiZ2xvYmFsXCIgJiYgcmVsYXRlZE1lbnVJZC53aW5kb3dJZGVudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyB5b3UgY2FuIGN1c3RvbWl6ZSB0aGUgYnJvd3NlciBtYWluIG1lbnUgaGVyZVxuXHRcdFx0Y29uc3QgcGFnZXM6IFBhZ2VbXSA9IGF3YWl0IHBsYXRmb3JtLlN0b3JhZ2UuZ2V0UGFnZXMoKTtcblx0XHRcdGNvbnN0IGluY2x1ZGVEZWxldGVQYWdlID1cblx0XHRcdFx0dGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/LmluY2x1ZGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl9zZXR0aW5ncz8uZGVsZXRlUGFnZT8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IGluY2x1ZGVTaG93UGFnZSA9XG5cdFx0XHRcdHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8uaW5jbHVkZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3NldHRpbmdzPy5zaG93UGFnZT8uaW5jbHVkZTtcblx0XHRcdGNvbnN0IHNob3dQYWdlc01lbnU6IE9wZW5GaW4uTWVudUl0ZW1UZW1wbGF0ZVtdID0gW107XG5cdFx0XHRjb25zdCBzaG93UGFnZU1lbnVFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5tZW51TGFiZWwgPz8gXCJTaG93IFBhZ2VcIixcblx0XHRcdFx0aWNvbjogdGhpcy5fc2V0dGluZ3M/LnNob3dQYWdlPy5tZW51SWNvbixcblx0XHRcdFx0ZW5hYmxlZDogcGFnZXMubGVuZ3RoID4gMCxcblx0XHRcdFx0c3VibWVudTogW10sXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJTYXZlUGFnZUFzXCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0Y3VzdG9tSWQ6IFwiU2hvd1BhZ2VcIixcblx0XHRcdFx0XHQuLi50aGlzLl9zZXR0aW5ncz8uc2hvd1BhZ2U/Lm1lbnVQb3NpdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZGVsZXRlUGFnZU1lbnVFbnRyeTogTWVudUVudHJ5ID0ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy5fc2V0dGluZ3M/LmRlbGV0ZVBhZ2U/Lm1lbnVMYWJlbCA/PyBcIkRlbGV0ZSBQYWdlXCIsXG5cdFx0XHRcdGljb246IHRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5tZW51SWNvbixcblx0XHRcdFx0ZW5hYmxlZDogcGFnZXMubGVuZ3RoID4gMCxcblx0XHRcdFx0c3VibWVudTogW10sXG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0dHlwZTogXCJTYXZlUGFnZUFzXCIsXG5cdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0Y3VzdG9tSWQ6IFwiU2hvd0RlbGV0ZVwiLFxuXHRcdFx0XHRcdC4uLnRoaXMuX3NldHRpbmdzPy5kZWxldGVQYWdlPy5tZW51UG9zaXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgZGVsZXRlUGFnZXNNZW51OiBPcGVuRmluLk1lbnVJdGVtVGVtcGxhdGVbXSA9IFtdO1xuXG5cdFx0XHRsZXQgYnJvd3NlcldpbmRvd0lkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcmVsYXRlZE1lbnVJZC53aW5kb3dJZGVudGl0eTtcblxuXHRcdFx0Y29uc3QgYnJvd3NlcldpbmRvdyA9IHBsYXRmb3JtLkJyb3dzZXIud3JhcFN5bmMoYnJvd3NlcldpbmRvd0lkZW50aXR5KTtcblxuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGJyb3dzZXJXaW5kb3cub3BlbmZpbldpbmRvdy5nZXRPcHRpb25zKCk7XG5cdFx0XHRjb25zdCB3b3Jrc3BhY2VPcHRpb25zOiBPcGVuRmluLldvcmtzcGFjZVBsYXRmb3JtT3B0aW9ucyA9IG9wdGlvbnMud29ya3NwYWNlUGxhdGZvcm07XG5cblx0XHRcdGlmICh3b3Jrc3BhY2VPcHRpb25zLmRpc2FibGVNdWx0aXBsZVBhZ2VzID09PSB0cnVlKSB7XG5cdFx0XHRcdGJyb3dzZXJXaW5kb3dJZGVudGl0eSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYWxsT3BlblBhZ2VzID0gYXdhaXQgcGxhdGZvcm0uQnJvd3Nlci5nZXRBbGxBdHRhY2hlZFBhZ2VzKCk7XG5cblx0XHRcdGlmIChwYWdlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0XHRcdGNvbnN0IGV4aXN0aW5nUGFnZSA9IGFsbE9wZW5QYWdlcy5maW5kKChvcGVuUGFnZSkgPT4gcGFnZS5wYWdlSWQgPT09IG9wZW5QYWdlLnBhZ2VJZCk7XG5cdFx0XHRcdFx0Y29uc3QgaXNBY3RpdmVFeGlzdGluZ1BhZ2VPbkN1cnJlbnRXaW5kb3cgPVxuXHRcdFx0XHRcdFx0ZXhpc3RpbmdQYWdlICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0XHRcdGV4aXN0aW5nUGFnZS5wYXJlbnRJZGVudGl0eS5uYW1lID09PSBicm93c2VyV2luZG93SWRlbnRpdHkubmFtZSAmJlxuXHRcdFx0XHRcdFx0ZXhpc3RpbmdQYWdlPy5pc0FjdGl2ZTtcblx0XHRcdFx0XHRzaG93UGFnZXNNZW51LnB1c2goe1xuXHRcdFx0XHRcdFx0bGFiZWw6IHBhZ2UudGl0bGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIm5vcm1hbFwiLFxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogIWlzQWN0aXZlRXhpc3RpbmdQYWdlT25DdXJyZW50V2luZG93LFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiIGFzIEdsb2JhbENvbnRleHRNZW51T3B0aW9uVHlwZS5DdXN0b20sXG5cdFx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdGlkOiBleGlzdGluZ1BhZ2UgIT09IHVuZGVmaW5lZCA/IFwicGFnZS1zaG93XCIgOiBcInBhZ2Utb3BlblwiLFxuXHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhZ2VJZDogcGFnZS5wYWdlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3dJZGVudGl0eTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXhpc3RpbmdQYWdlICE9PSB1bmRlZmluZWQgPyBleGlzdGluZ1BhZ2UucGFyZW50SWRlbnRpdHkgOiBicm93c2VyV2luZG93SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRkZWxldGVQYWdlc01lbnUucHVzaCh7XG5cdFx0XHRcdFx0XHRsYWJlbDogcGFnZS50aXRsZSxcblx0XHRcdFx0XHRcdHR5cGU6IFwibm9ybWFsXCIsXG5cdFx0XHRcdFx0XHRlbmFibGVkOiBleGlzdGluZ1BhZ2UgPT09IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIiBhcyBHbG9iYWxDb250ZXh0TWVudU9wdGlvblR5cGUuQ3VzdG9tLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0XHRpZDogXCJwYWdlLWRlbGV0ZVwiLFxuXHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhZ2VJZDogcGFnZS5wYWdlSWRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoc2hvd1BhZ2VNZW51RW50cnkuc3VibWVudSkge1xuXHRcdFx0XHRcdHNob3dQYWdlTWVudUVudHJ5LnN1Ym1lbnUucHVzaCguLi5zaG93UGFnZXNNZW51KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZGVsZXRlUGFnZU1lbnVFbnRyeS5zdWJtZW51KSB7XG5cdFx0XHRcdFx0ZGVsZXRlUGFnZU1lbnVFbnRyeS5zdWJtZW51LnB1c2goLi4uZGVsZXRlUGFnZXNNZW51KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBtZW51SXRlbXNUb1JldHVybjogTWVudUVudHJ5W10gPSBbXTtcblxuXHRcdFx0aWYgKGluY2x1ZGVEZWxldGVQYWdlKSB7XG5cdFx0XHRcdG1lbnVJdGVtc1RvUmV0dXJuLnB1c2goZGVsZXRlUGFnZU1lbnVFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbmNsdWRlU2hvd1BhZ2UpIHtcblx0XHRcdFx0bWVudUl0ZW1zVG9SZXR1cm4ucHVzaChzaG93UGFnZU1lbnVFbnRyeSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtZW51SXRlbXNUb1JldHVybjtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgUGFnZUFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBQYWdlTWVudXMgfSBmcm9tIFwiLi9tZW51c1wiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IFBhZ2VBY3Rpb25zKCksXG5cdG1lbnVzOiBuZXcgUGFnZU1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=