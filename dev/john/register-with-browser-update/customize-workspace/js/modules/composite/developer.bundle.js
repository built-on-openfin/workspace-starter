/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/composite/developer/actions.ts":
/*!***********************************************************!*\
  !*** ./client/src/modules/composite/developer/actions.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeveloperActions": () => (/* binding */ DeveloperActions)
/* harmony export */ });
/**
 * Implement the actions.
 */
class DeveloperActions {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("DeveloperActions");
        this._helpers = helpers;
    }
    /**
     * Get the actions from the module.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["developer-inspect"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const identity = payload.selectedViews[i];
                    const view = fin.View.wrapSync(identity);
                    await view.showDeveloperTools();
                }
            }
            else if (payload.callerType === this._helpers.callerTypes.PageTabContextMenu) {
                const pageWindowIdentity = payload.windowIdentity;
                const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
                await pageWindow.showDeveloperTools();
            }
            else if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
                const target = payload?.customData?.target === "platform" ? "platform" : "window";
                const targetIdentity = target === "window"
                    ? payload.windowIdentity
                    : { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
                const targetWindow = fin.Window.wrapSync(targetIdentity);
                await targetWindow.showDeveloperTools();
            }
        };
        actionMap["raise-create-app-definition-intent"] = async (payload) => {
            if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
                const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
                for (let i = 0; i < payload.selectedViews.length; i++) {
                    const viewIdentity = payload.selectedViews[i];
                    const intentName = "CreateAppDefinition";
                    try {
                        const view = fin.View.wrapSync(viewIdentity);
                        const options = await view.getOptions();
                        const info = await view.getInfo();
                        const name = options.name;
                        const fdc3InteropApi = options.fdc3InteropApi !== undefined &&
                            options.fdc3InteropApi !== null &&
                            options.fdc3InteropApi.length > 0
                            ? options.fdc3InteropApi
                            : "1.2";
                        const preloads = Array.isArray(options.preloadScripts) && options.preloadScripts.length > 0
                            ? options.preloadScripts
                            : undefined;
                        const manifest = {
                            url: info.url,
                            fdc3InteropApi,
                            interop: options.interop,
                            customData: options.customData,
                            preloadScripts: preloads
                        };
                        const icons = [];
                        const favicons = info.favicons || [];
                        for (let f = 0; f < favicons.length; f++) {
                            icons.push({ src: favicons[f] });
                        }
                        const app = {
                            appId: name,
                            name,
                            title: info.title,
                            description: info.title,
                            manifestType: this._helpers.manifestTypes.inlineView.id,
                            manifest,
                            tags: [this._helpers.manifestTypes.view.id],
                            icons,
                            images: [],
                            publisher: "",
                            contactEmail: "",
                            supportEmail: "",
                            intents: []
                        };
                        const intent = {
                            name: intentName,
                            context: {
                                type: "openfin.app",
                                app
                            }
                        };
                        await brokerClient.fireIntent(intent);
                    }
                    catch (error) {
                        this._logger.error(`Error while trying to raise intent ${intentName} for view ${viewIdentity.name}`, error);
                    }
                }
            }
        };
        return actionMap;
    }
}


/***/ }),

/***/ "./client/src/modules/composite/developer/analytics.ts":
/*!*************************************************************!*\
  !*** ./client/src/modules/composite/developer/analytics.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DevAnalyticsModule": () => (/* binding */ DevAnalyticsModule)
/* harmony export */ });
/**
 * Implement the analytics module using the interop channels as the means of publishing the events.
 */
class DevAnalyticsModule {
    constructor() {
        this._cachedAnalyticEvents = [];
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("DeveloperAnalyticsModule");
        this._logger.info("Initialized");
        this._logger.info("Session Id: ", helpers.sessionId);
        this._helpers = helpers;
        this._contextType = definition.data?.contextType ?? "fin.dev.platform.analytics";
        const channelName = definition.data?.sessionContextGroupName ?? "dev/platform/analytics";
        this._logger.info(`Using channel name: ${channelName} and contextType: ${this._contextType}. These can be customized by passing data settings: sessionContextGroupName and contextType in the module settings.`);
        if (helpers.getInteropClient !== undefined && helpers.subscribeLifecycleEvent !== undefined) {
            this._logger.info("Subscribing to the after bootstrap event.");
            const lifeCycleAfterBootstrapSubscriptionId = this._helpers.subscribeLifecycleEvent("after-bootstrap", async (_platform) => {
                this._logger.info("After bootstrap lifecycle event received. Getting interop client.");
                this._interopClient = await helpers.getInteropClient();
                this._channel = await this._interopClient.joinSessionContextGroup(channelName);
                if (this._helpers.unsubscribeLifecycleEvent !== undefined) {
                    this._helpers.unsubscribeLifecycleEvent(lifeCycleAfterBootstrapSubscriptionId, "after-bootstrap");
                }
            });
        }
        else {
            this._logger.warn("This analytics module requires a session context group name, a context type, the ability to create an interop client and the ability to listen for lifecycle events. Unfortunately this criteria has not been met.");
        }
    }
    /**
     * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
     * @param events one of more analytic events.
     */
    async handleAnalytics(events) {
        if (!Array.isArray(events)) {
            this._logger.warn("We were not passed an array of analytical events.");
            return;
        }
        if (this._channel !== undefined) {
            let platformAnalyticEvents = [];
            if (this._cachedAnalyticEvents.length > 0) {
                this._logger.info(`Adding ${this._cachedAnalyticEvents.length} analytic events.`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                platformAnalyticEvents.push(...this._cachedAnalyticEvents);
                this._cachedAnalyticEvents = [];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            platformAnalyticEvents.push(...events);
            const eventCount = platformAnalyticEvents.length;
            platformAnalyticEvents = platformAnalyticEvents.filter((entry) => !(entry.type.toLowerCase() === "interop" && entry.source.toLowerCase() !== "browser"));
            const filteredCount = platformAnalyticEvents.length;
            if (eventCount !== filteredCount) {
                this._logger.info(`Filtered out ${eventCount - filteredCount} events as they were of type interop and not from the browser and we send events out over interop`);
            }
            const context = {
                type: this._contextType,
                name: "Analytic Events",
                events: platformAnalyticEvents
            };
            await this._channel.setContext(context);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._cachedAnalyticEvents.push(...events);
        }
    }
    /**
     * Close down the module. If this module had any cached events it needed to process it could try and flush them here.
     */
    async closedown() {
        this._logger.info("closing down");
    }
}


/***/ }),

/***/ "./client/src/modules/composite/developer/menus.ts":
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/developer/menus.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeveloperMenus": () => (/* binding */ DeveloperMenus)
/* harmony export */ });
/**
 * Implement the menus.
 */
class DeveloperMenus {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param createLogger For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("DeveloperMenus");
    }
    /**
     * Get the menus from the module.
     * @param menuType The type of menu to get the entries for.
     * @param platform The current platform.
     */
    async get(menuType, platform) {
        if (menuType === "global") {
            return [
                {
                    include: true,
                    label: "Inspect Window",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "notification-toggle"
                    },
                    separator: "before"
                },
                {
                    include: true,
                    label: "Inspect Platform",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect",
                            customData: { target: "platform" }
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "developer-inspect"
                    }
                }
            ];
        }
        else if (menuType === "page") {
            return [
                {
                    include: true,
                    label: "Inspect Window",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "before",
                        type: "Close"
                    },
                    separator: "after"
                }
            ];
        }
        else if (menuType === "view") {
            return [
                {
                    include: true,
                    label: "Inspect View",
                    data: {
                        type: "Custom",
                        action: {
                            id: "developer-inspect"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Print"
                    },
                    separator: "before"
                },
                {
                    include: true,
                    label: "Create App Definition",
                    data: {
                        type: "Custom",
                        action: {
                            id: "raise-create-app-definition-intent"
                        }
                    },
                    position: {
                        operation: "after",
                        type: "Custom",
                        customId: "developer-inspect"
                    }
                }
            ];
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
/*!*********************************************************!*\
  !*** ./client/src/modules/composite/developer/index.ts ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/composite/developer/actions.ts");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics */ "./client/src/modules/composite/developer/analytics.ts");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menus */ "./client/src/modules/composite/developer/menus.ts");



const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.DeveloperActions(),
    analytics: new _analytics__WEBPACK_IMPORTED_MODULE_1__.DevAnalyticsModule(),
    menus: new _menus__WEBPACK_IMPORTED_MODULE_2__.DeveloperMenus()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLEVBQUUsSUFBSSwwREFBa0IsRUFBRTtJQUNuQyxLQUFLLEVBQUUsSUFBSSxrREFBYyxFQUFFO0NBQzNCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9jb21wb3NpdGUvZGV2ZWxvcGVyL2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9hbmFseXRpY3MudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvY29tcG9zaXRlL2RldmVsb3Blci9tZW51cy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2NvbXBvc2l0ZS9kZXZlbG9wZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDdXN0b21BY3Rpb25QYXlsb2FkLFxuXHRDdXN0b21BY3Rpb25zTWFwLFxuXHRXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZVxufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IEFjdGlvbkhlbHBlcnMsIEFjdGlvbnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50IHRoZSBhY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgRGV2ZWxvcGVyQWN0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbnMge1xuXHQvKipcblx0ICogVGhlIGhlbHBlciBtZXRob2RzIHRvIHVzZS5cblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IEFjdGlvbkhlbHBlcnM7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBBY3Rpb25IZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkRldmVsb3BlckFjdGlvbnNcIik7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPiB7XG5cdFx0Y29uc3QgYWN0aW9uTWFwOiBDdXN0b21BY3Rpb25zTWFwID0ge307XG5cblx0XHRhY3Rpb25NYXBbXCJkZXZlbG9wZXItaW5zcGVjdFwiXSA9IGFzeW5jIChwYXlsb2FkOiBDdXN0b21BY3Rpb25QYXlsb2FkKSA9PiB7XG5cdFx0XHRpZiAocGF5bG9hZC5jYWxsZXJUeXBlID09PSB0aGlzLl9oZWxwZXJzLmNhbGxlclR5cGVzLlZpZXdUYWJDb250ZXh0TWVudSkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBheWxvYWQuc2VsZWN0ZWRWaWV3cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGlkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID0gcGF5bG9hZC5zZWxlY3RlZFZpZXdzW2ldO1xuXHRcdFx0XHRcdGNvbnN0IHZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhpZGVudGl0eSk7XG5cdFx0XHRcdFx0YXdhaXQgdmlldy5zaG93RGV2ZWxvcGVyVG9vbHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IHRoaXMuX2hlbHBlcnMuY2FsbGVyVHlwZXMuUGFnZVRhYkNvbnRleHRNZW51KSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3dJZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSA9IHBheWxvYWQud2luZG93SWRlbnRpdHk7XG5cdFx0XHRcdGNvbnN0IHBhZ2VXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHBhZ2VXaW5kb3dJZGVudGl0eSk7XG5cdFx0XHRcdGF3YWl0IHBhZ2VXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5HbG9iYWxDb250ZXh0TWVudSkge1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBwYXlsb2FkPy5jdXN0b21EYXRhPy50YXJnZXQgPT09IFwicGxhdGZvcm1cIiA/IFwicGxhdGZvcm1cIiA6IFwid2luZG93XCI7XG5cdFx0XHRcdGNvbnN0IHRhcmdldElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5ID1cblx0XHRcdFx0XHR0YXJnZXQgPT09IFwid2luZG93XCJcblx0XHRcdFx0XHRcdD8gcGF5bG9hZC53aW5kb3dJZGVudGl0eVxuXHRcdFx0XHRcdFx0OiB7IHV1aWQ6IHBheWxvYWQud2luZG93SWRlbnRpdHkudXVpZCwgbmFtZTogcGF5bG9hZC53aW5kb3dJZGVudGl0eS51dWlkIH07XG5cdFx0XHRcdGNvbnN0IHRhcmdldFdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmModGFyZ2V0SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCB0YXJnZXRXaW5kb3cuc2hvd0RldmVsb3BlclRvb2xzKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGFjdGlvbk1hcFtcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCkgPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gdGhpcy5faGVscGVycy5jYWxsZXJUeXBlcy5WaWV3VGFiQ29udGV4dE1lbnUpIHtcblx0XHRcdFx0Y29uc3QgYnJva2VyQ2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQsIHt9KTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLnNlbGVjdGVkVmlld3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3SWRlbnRpdHkgPSBwYXlsb2FkLnNlbGVjdGVkVmlld3NbaV07XG5cdFx0XHRcdFx0Y29uc3QgaW50ZW50TmFtZSA9IFwiQ3JlYXRlQXBwRGVmaW5pdGlvblwiO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCB2aWV3ID0gZmluLlZpZXcud3JhcFN5bmModmlld0lkZW50aXR5IGFzIE9wZW5GaW4uSWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IHZpZXcuZ2V0T3B0aW9ucygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHZpZXcuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdFx0XHRcdGNvbnN0IGZkYzNJbnRlcm9wQXBpID1cblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5mZGMzSW50ZXJvcEFwaSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMuZmRjM0ludGVyb3BBcGkgIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5mZGMzSW50ZXJvcEFwaS5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdFx0PyBvcHRpb25zLmZkYzNJbnRlcm9wQXBpXG5cdFx0XHRcdFx0XHRcdFx0OiBcIjEuMlwiO1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJlbG9hZHMgPVxuXHRcdFx0XHRcdFx0XHRBcnJheS5pc0FycmF5KG9wdGlvbnMucHJlbG9hZFNjcmlwdHMpICYmIG9wdGlvbnMucHJlbG9hZFNjcmlwdHMubGVuZ3RoID4gMFxuXHRcdFx0XHRcdFx0XHRcdD8gb3B0aW9ucy5wcmVsb2FkU2NyaXB0c1xuXHRcdFx0XHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWFuaWZlc3QgPSB7XG5cdFx0XHRcdFx0XHRcdHVybDogaW5mby51cmwsXG5cdFx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpLFxuXHRcdFx0XHRcdFx0XHRpbnRlcm9wOiBvcHRpb25zLmludGVyb3AsXG5cdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IG9wdGlvbnMuY3VzdG9tRGF0YSxcblx0XHRcdFx0XHRcdFx0cHJlbG9hZFNjcmlwdHM6IHByZWxvYWRzXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3QgaWNvbnMgPSBbXTtcblx0XHRcdFx0XHRcdGNvbnN0IGZhdmljb25zID0gaW5mby5mYXZpY29ucyB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGYgPSAwOyBmIDwgZmF2aWNvbnMubGVuZ3RoOyBmKyspIHtcblx0XHRcdFx0XHRcdFx0aWNvbnMucHVzaCh7IHNyYzogZmF2aWNvbnNbZl0gfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBhcHAgPSB7XG5cdFx0XHRcdFx0XHRcdGFwcElkOiBuYW1lLFxuXHRcdFx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogaW5mby50aXRsZSxcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IGluZm8udGl0bGUsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0VHlwZTogdGhpcy5faGVscGVycy5tYW5pZmVzdFR5cGVzLmlubGluZVZpZXcuaWQsXG5cdFx0XHRcdFx0XHRcdG1hbmlmZXN0LFxuXHRcdFx0XHRcdFx0XHR0YWdzOiBbdGhpcy5faGVscGVycy5tYW5pZmVzdFR5cGVzLnZpZXcuaWRdLFxuXHRcdFx0XHRcdFx0XHRpY29ucyxcblx0XHRcdFx0XHRcdFx0aW1hZ2VzOiBbXSxcblx0XHRcdFx0XHRcdFx0cHVibGlzaGVyOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRjb250YWN0RW1haWw6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdHN1cHBvcnRFbWFpbDogXCJcIixcblx0XHRcdFx0XHRcdFx0aW50ZW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGludGVudE5hbWUsXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIm9wZW5maW4uYXBwXCIsXG5cdFx0XHRcdFx0XHRcdFx0YXBwXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhd2FpdCBicm9rZXJDbGllbnQuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXG5cdFx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gcmFpc2UgaW50ZW50ICR7aW50ZW50TmFtZX0gZm9yIHZpZXcgJHt2aWV3SWRlbnRpdHkubmFtZX1gLFxuXHRcdFx0XHRcdFx0XHRlcnJvclxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBJbnRlcm9wQ2xpZW50IH0gZnJvbSBcIkBvcGVuZmluL2NvcmUvc3JjL2FwaS9pbnRlcm9wXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBBbmFseXRpY3NNb2R1bGUsIFBsYXRmb3JtQW5hbHl0aWNzRXZlbnQgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvYW5hbHl0aWNzLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRGV2QW5hbHl0aWNzT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgYW5hbHl0aWNzIG1vZHVsZSB1c2luZyB0aGUgaW50ZXJvcCBjaGFubmVscyBhcyB0aGUgbWVhbnMgb2YgcHVibGlzaGluZyB0aGUgZXZlbnRzLlxuICovXG5leHBvcnQgY2xhc3MgRGV2QW5hbHl0aWNzTW9kdWxlIGltcGxlbWVudHMgQW5hbHl0aWNzTW9kdWxlPERldkFuYWx5dGljc09wdGlvbnM+IHtcblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfaW50ZXJvcENsaWVudDogSW50ZXJvcENsaWVudDtcblxuXHRwcml2YXRlIF9jaGFubmVsOiBPcGVuRmluLlNlc3Npb25Db250ZXh0R3JvdXA7XG5cblx0cHJpdmF0ZSBfY29udGV4dFR5cGU6IHN0cmluZztcblxuXHRwcml2YXRlIF9jYWNoZWRBbmFseXRpY0V2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdID0gW107XG5cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycztcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxEZXZBbmFseXRpY3NPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkRldmVsb3BlckFuYWx5dGljc01vZHVsZVwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkluaXRpYWxpemVkXCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiU2Vzc2lvbiBJZDogXCIsIGhlbHBlcnMuc2Vzc2lvbklkKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9jb250ZXh0VHlwZSA9IGRlZmluaXRpb24uZGF0YT8uY29udGV4dFR5cGUgPz8gXCJmaW4uZGV2LnBsYXRmb3JtLmFuYWx5dGljc1wiO1xuXHRcdGNvbnN0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSBkZWZpbml0aW9uLmRhdGE/LnNlc3Npb25Db250ZXh0R3JvdXBOYW1lID8/IFwiZGV2L3BsYXRmb3JtL2FuYWx5dGljc1wiO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0YFVzaW5nIGNoYW5uZWwgbmFtZTogJHtjaGFubmVsTmFtZX0gYW5kIGNvbnRleHRUeXBlOiAke3RoaXMuX2NvbnRleHRUeXBlfS4gVGhlc2UgY2FuIGJlIGN1c3RvbWl6ZWQgYnkgcGFzc2luZyBkYXRhIHNldHRpbmdzOiBzZXNzaW9uQ29udGV4dEdyb3VwTmFtZSBhbmQgY29udGV4dFR5cGUgaW4gdGhlIG1vZHVsZSBzZXR0aW5ncy5gXG5cdFx0KTtcblx0XHRpZiAoaGVscGVycy5nZXRJbnRlcm9wQ2xpZW50ICE9PSB1bmRlZmluZWQgJiYgaGVscGVycy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlN1YnNjcmliaW5nIHRvIHRoZSBhZnRlciBib290c3RyYXAgZXZlbnQuXCIpO1xuXHRcdFx0Y29uc3QgbGlmZUN5Y2xlQWZ0ZXJCb290c3RyYXBTdWJzY3JpcHRpb25JZCA9IHRoaXMuX2hlbHBlcnMuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFwiYWZ0ZXItYm9vdHN0cmFwXCIsXG5cdFx0XHRcdGFzeW5jIChfcGxhdGZvcm0pID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkFmdGVyIGJvb3RzdHJhcCBsaWZlY3ljbGUgZXZlbnQgcmVjZWl2ZWQuIEdldHRpbmcgaW50ZXJvcCBjbGllbnQuXCIpO1xuXHRcdFx0XHRcdHRoaXMuX2ludGVyb3BDbGllbnQgPSBhd2FpdCBoZWxwZXJzLmdldEludGVyb3BDbGllbnQoKTtcblx0XHRcdFx0XHR0aGlzLl9jaGFubmVsID0gYXdhaXQgdGhpcy5faW50ZXJvcENsaWVudC5qb2luU2Vzc2lvbkNvbnRleHRHcm91cChjaGFubmVsTmFtZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2hlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9oZWxwZXJzLnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQobGlmZUN5Y2xlQWZ0ZXJCb290c3RyYXBTdWJzY3JpcHRpb25JZCwgXCJhZnRlci1ib290c3RyYXBcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XCJUaGlzIGFuYWx5dGljcyBtb2R1bGUgcmVxdWlyZXMgYSBzZXNzaW9uIGNvbnRleHQgZ3JvdXAgbmFtZSwgYSBjb250ZXh0IHR5cGUsIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSBhbiBpbnRlcm9wIGNsaWVudCBhbmQgdGhlIGFiaWxpdHkgdG8gbGlzdGVuIGZvciBsaWZlY3ljbGUgZXZlbnRzLiBVbmZvcnR1bmF0ZWx5IHRoaXMgY3JpdGVyaWEgaGFzIG5vdCBiZWVuIG1ldC5cIlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIEFuYWx5dGljcy4gVGhpcyBleGFtcGxlIG1vZHVsZSBzaW1wbGUgY29uc29sZSBsb2dzIHRoZSBldmVudHMuIFlvdSBjb3VsZCBiYXRjaCB0aGUgZXZlbnRzIGFuZCBwYXNzIHNldHRpbmdzIChudW1iZXIgdG8gYmF0Y2ggZXRjLCBkZXN0aW5hdGlvbiB0byBzZW5kIGV2ZW50cykgdmlhIHRoZSBtb2R1bGUgZGVmaW5pdGlvbi5cblx0ICogQHBhcmFtIGV2ZW50cyBvbmUgb2YgbW9yZSBhbmFseXRpYyBldmVudHMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaGFuZGxlQW5hbHl0aWNzKGV2ZW50czogUGxhdGZvcm1BbmFseXRpY3NFdmVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50cykpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiV2Ugd2VyZSBub3QgcGFzc2VkIGFuIGFycmF5IG9mIGFuYWx5dGljYWwgZXZlbnRzLlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2NoYW5uZWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bGV0IHBsYXRmb3JtQW5hbHl0aWNFdmVudHM6IFBsYXRmb3JtQW5hbHl0aWNzRXZlbnRbXSA9IFtdO1xuXHRcdFx0aWYgKHRoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYEFkZGluZyAke3RoaXMuX2NhY2hlZEFuYWx5dGljRXZlbnRzLmxlbmd0aH0gYW5hbHl0aWMgZXZlbnRzLmApO1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0XHRwbGF0Zm9ybUFuYWx5dGljRXZlbnRzLnB1c2goLi4udGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMpO1xuXHRcdFx0XHR0aGlzLl9jYWNoZWRBbmFseXRpY0V2ZW50cyA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0XHRcdHBsYXRmb3JtQW5hbHl0aWNFdmVudHMucHVzaCguLi5ldmVudHMpO1xuXHRcdFx0Y29uc3QgZXZlbnRDb3VudCA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMubGVuZ3RoO1xuXHRcdFx0cGxhdGZvcm1BbmFseXRpY0V2ZW50cyA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMuZmlsdGVyKFxuXHRcdFx0XHQoZW50cnkpID0+ICEoZW50cnkudHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImludGVyb3BcIiAmJiBlbnRyeS5zb3VyY2UudG9Mb3dlckNhc2UoKSAhPT0gXCJicm93c2VyXCIpXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgZmlsdGVyZWRDb3VudCA9IHBsYXRmb3JtQW5hbHl0aWNFdmVudHMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoZXZlbnRDb3VudCAhPT0gZmlsdGVyZWRDb3VudCkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRgRmlsdGVyZWQgb3V0ICR7XG5cdFx0XHRcdFx0XHRldmVudENvdW50IC0gZmlsdGVyZWRDb3VudFxuXHRcdFx0XHRcdH0gZXZlbnRzIGFzIHRoZXkgd2VyZSBvZiB0eXBlIGludGVyb3AgYW5kIG5vdCBmcm9tIHRoZSBicm93c2VyIGFuZCB3ZSBzZW5kIGV2ZW50cyBvdXQgb3ZlciBpbnRlcm9wYFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjb250ZXh0ID0ge1xuXHRcdFx0XHR0eXBlOiB0aGlzLl9jb250ZXh0VHlwZSxcblx0XHRcdFx0bmFtZTogXCJBbmFseXRpYyBFdmVudHNcIixcblx0XHRcdFx0ZXZlbnRzOiBwbGF0Zm9ybUFuYWx5dGljRXZlbnRzXG5cdFx0XHR9O1xuXHRcdFx0YXdhaXQgdGhpcy5fY2hhbm5lbC5zZXRDb250ZXh0KGNvbnRleHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRcdFx0dGhpcy5fY2FjaGVkQW5hbHl0aWNFdmVudHMucHVzaCguLi5ldmVudHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSBkb3duIHRoZSBtb2R1bGUuIElmIHRoaXMgbW9kdWxlIGhhZCBhbnkgY2FjaGVkIGV2ZW50cyBpdCBuZWVkZWQgdG8gcHJvY2VzcyBpdCBjb3VsZCB0cnkgYW5kIGZsdXNoIHRoZW0gaGVyZS5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24/KCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiY2xvc2luZyBkb3duXCIpO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBNZW51cyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNZW51RW50cnksIE1lbnVUeXBlIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGUgbWVudXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXZlbG9wZXJNZW51cyBpbXBsZW1lbnRzIE1lbnVzIHtcblx0LyoqXG5cdCAqIFRoZSBoZWxwZXIgbWV0aG9kcyB0byB1c2UuXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gY3JlYXRlTG9nZ2VyIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uLFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkRldmVsb3Blck1lbnVzXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbWVudXMgZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gbWVudVR5cGUgVGhlIHR5cGUgb2YgbWVudSB0byBnZXQgdGhlIGVudHJpZXMgZm9yLlxuXHQgKiBAcGFyYW0gcGxhdGZvcm0gVGhlIGN1cnJlbnQgcGxhdGZvcm0uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KG1lbnVUeXBlOiBNZW51VHlwZSwgcGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxNZW51RW50cnlbXSB8IHVuZGVmaW5lZD4ge1xuXHRcdGlmIChtZW51VHlwZSA9PT0gXCJnbG9iYWxcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBXaW5kb3dcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJub3RpZmljYXRpb24tdG9nZ2xlXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFBsYXRmb3JtXCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiLFxuXHRcdFx0XHRcdFx0XHRjdXN0b21EYXRhOiB7IHRhcmdldDogXCJwbGF0Zm9ybVwiIH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFwiYWZ0ZXJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRjdXN0b21JZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdO1xuXHRcdH0gZWxzZSBpZiAobWVudVR5cGUgPT09IFwicGFnZVwiKSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJJbnNwZWN0IFdpbmRvd1wiLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ3VzdG9tXCIsXG5cdFx0XHRcdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiZGV2ZWxvcGVyLWluc3BlY3RcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJiZWZvcmVcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ2xvc2VcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VwYXJhdG9yOiBcImFmdGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9IGVsc2UgaWYgKG1lbnVUeXBlID09PSBcInZpZXdcIikge1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGluY2x1ZGU6IHRydWUsXG5cdFx0XHRcdFx0bGFiZWw6IFwiSW5zcGVjdCBWaWV3XCIsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRpZDogXCJkZXZlbG9wZXItaW5zcGVjdFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBcImFmdGVyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcIlByaW50XCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlcGFyYXRvcjogXCJiZWZvcmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW5jbHVkZTogdHJ1ZSxcblx0XHRcdFx0XHRsYWJlbDogXCJDcmVhdGUgQXBwIERlZmluaXRpb25cIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBcInJhaXNlLWNyZWF0ZS1hcHAtZGVmaW5pdGlvbi1pbnRlbnRcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogXCJhZnRlclwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIixcblx0XHRcdFx0XHRcdGN1c3RvbUlkOiBcImRldmVsb3Blci1pbnNwZWN0XCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IERldmVsb3BlckFjdGlvbnMgfSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBEZXZBbmFseXRpY3NNb2R1bGUgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IERldmVsb3Blck1lbnVzIH0gZnJvbSBcIi4vbWVudXNcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBEZXZlbG9wZXJBY3Rpb25zKCksXG5cdGFuYWx5dGljczogbmV3IERldkFuYWx5dGljc01vZHVsZSgpLFxuXHRtZW51czogbmV3IERldmVsb3Blck1lbnVzKClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=