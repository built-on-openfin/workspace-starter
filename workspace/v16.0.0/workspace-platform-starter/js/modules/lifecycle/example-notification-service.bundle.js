/******/ var __webpack_modules__ = ({

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
/* harmony export */   isNumberValue: () => (/* binding */ isNumberValue),
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
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumberValue(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
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
    if ("randomUUID" in globalThis.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return globalThis.crypto.randomUUID();
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
        const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
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
    if (isEmpty(err)) {
        return "";
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    else if (isObject(err) && "message" in err && isString(err.message)) {
        return err.message;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isStringValue(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return "";
}


/***/ }),

/***/ "./client/src/modules/lifecycle/example-notification-service/lifecycle.ts":
/*!********************************************************************************!*\
  !*** ./client/src/modules/lifecycle/example-notification-service/lifecycle.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleNotificationServiceProvider: () => (/* binding */ ExampleNotificationServiceProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * Implementation for the example notification service lifecycle provider.
 */
class ExampleNotificationServiceProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._definition = definition;
        this._logger = loggerCreator(`ExampleNotificationService(${this._definition?.id}):`);
        this._helpers = helpers;
        this._lifeCycleSubscriptions = {};
        this._logger.info("Initializing");
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
        // disconnect from websocket/server sent event source for example
        await this.stopNotificationService();
    }
    /**
     * Get the lifecycle events.
     * @returns The map of lifecycle events.
     */
    async get() {
        const lifecycleMap = {};
        lifecycleMap["after-bootstrap"] = async (platform, customData) => {
            await this.startNotificationService();
        };
        return lifecycleMap;
    }
    /**
     * Starts the notification service.
     */
    async startNotificationService() {
        const serverUrl = this._definition?.data?.exampleServerUrl;
        this._logger?.info(`Starting notification service and connecting to ${serverUrl ?? "https://examplenotificationserver"} (Not Really...this is an example.)`);
        if (this._helpers?.subscribeLifecycleEvent) {
            // we have been passed the ability to subscribe to lifecycle events.
            if (!this._lifeCycleSubscriptions) {
                this._lifeCycleSubscriptions = {};
            }
            if (!this._notificationSubscriptions) {
                this._notificationSubscriptions = {};
            }
            if (this._helpers?.getNotificationClient) {
                this._notificationClient = await this._helpers.getNotificationClient();
            }
            if (this._notificationClient) {
                await this.setupNotificationEventListeners();
                if (this._definition?.data?.notifyOn?.appsChanged !== false) {
                    const appsChangedSubscription = this._helpers?.subscribeLifecycleEvent("apps-changed", async () => {
                        const notification = {
                            title: "Apps Changed Notification",
                            body: `The list of apps on this platform has changed.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,
                            toast: "transient",
                            category: "default",
                            template: "markdown"
                        };
                        await this._notificationClient?.create(notification);
                    });
                    this._lifeCycleSubscriptions[appsChangedSubscription] = "apps-changed";
                }
                if (this._definition?.data?.notifyOn?.favoriteChanged !== false) {
                    const favoriteChangedSubscription = this._helpers?.subscribeLifecycleEvent("favorite-changed", async () => {
                        const notification = {
                            title: "Favorite Changed Notification",
                            body: `You have changed a favorite on this platform.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,
                            toast: "transient",
                            category: "default",
                            template: "markdown"
                        };
                        await this._notificationClient?.create(notification);
                    });
                    this._lifeCycleSubscriptions[favoriteChangedSubscription] = "favorite-changed";
                }
                if (this._definition?.data?.notifyOn?.pageChanged !== false) {
                    const pageChangedSubscription = this._helpers?.subscribeLifecycleEvent("page-changed", async () => {
                        const notification = {
                            title: "Page Changed Notification",
                            body: `You have changed the page on this platform.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,
                            toast: "transient",
                            category: "default",
                            template: "markdown"
                        };
                        await this._notificationClient?.create(notification);
                    });
                    this._lifeCycleSubscriptions[pageChangedSubscription] = "page-changed";
                }
                if (this._definition?.data?.notifyOn?.themeChanged !== false) {
                    const themeChangedSubscription = this._helpers?.subscribeLifecycleEvent("theme-changed", async () => {
                        const notification = {
                            title: "Theme Changed",
                            body: `You have changed the theme for this platform. This was generated by the example notification service (moduleId: ${this._definition?.id}).`,
                            toast: "transient",
                            category: "default",
                            template: "markdown",
                            form: [
                                {
                                    type: "boolean",
                                    key: "intended theme change",
                                    label: "Did you intend to change the theme?",
                                    widget: {
                                        type: "Toggle"
                                    }
                                }
                            ],
                            buttons: [
                                {
                                    title: "Acknowledged",
                                    type: "button",
                                    cta: true,
                                    submit: true
                                }
                            ]
                        };
                        await this._notificationClient?.create(notification);
                    });
                    this._lifeCycleSubscriptions[themeChangedSubscription] = "theme-changed";
                }
                if (this._definition?.data?.notifyOn?.workspaceChanged !== false) {
                    const workspaceChangedSubscription = this._helpers?.subscribeLifecycleEvent("workspace-changed", async () => {
                        const notification = {
                            title: "Workspace Changed",
                            body: `You have changed your workspace. This was generated by the example notification service (moduleId: ${this._definition?.id}).`,
                            toast: "transient",
                            category: "default",
                            template: "markdown",
                            buttons: [
                                {
                                    title: "Acknowledged",
                                    type: "button",
                                    cta: true,
                                    onClick: {
                                        task: "acknowledge-task",
                                        customData: {
                                            message: "This is the response data"
                                        }
                                    }
                                },
                                {
                                    title: "Cancel",
                                    type: "button"
                                }
                            ]
                        };
                        await this._notificationClient?.create(notification);
                    });
                    this._lifeCycleSubscriptions[workspaceChangedSubscription] = "workspace-changed";
                }
            }
        }
    }
    /**
     * Stops the notification service.
     */
    async stopNotificationService() {
        this._logger?.info("Stopping notification service (Not Really...this is an example.)");
        if (this._helpers?.unsubscribeLifecycleEvent && this._lifeCycleSubscriptions) {
            for (const [key, value] of Object.entries(this._lifeCycleSubscriptions)) {
                this._helpers.unsubscribeLifecycleEvent(key, value);
            }
        }
        await this.removeNotificationEventListeners();
    }
    /**
     * Setup listeners using the notification client fetched via a helper.
     */
    async setupNotificationEventListeners() {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._notificationClient) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._notificationSubscriptions)) {
            const actionEventHandler = (event) => {
                this._logger?.info("Event for notification action received.", event);
            };
            await this._notificationClient.addEventListener("notification-action", actionEventHandler);
            this._notificationSubscriptions["notification-action"] = actionEventHandler;
            const closedEventHandler = (event) => {
                this._logger?.info("Event for notification closed received.", event);
            };
            await this._notificationClient.addEventListener("notification-closed", closedEventHandler);
            this._notificationSubscriptions["notification-closed"] = closedEventHandler;
            const createdEventHandler = (event) => {
                this._logger?.info("Event for notification created received.", event);
            };
            await this._notificationClient.addEventListener("notification-created", createdEventHandler);
            this._notificationSubscriptions["notification-created"] = createdEventHandler;
            const formSubmittedEventHandler = (event) => {
                this._logger?.info("Event for notification form submitted received.", event);
            };
            await this._notificationClient.addEventListener("notification-form-submitted", formSubmittedEventHandler);
            this._notificationSubscriptions["notification-form-submitted"] = formSubmittedEventHandler;
            const reminderCreatedEventHandler = (event) => {
                this._logger?.info("Event for notification reminder created received.", event);
            };
            await this._notificationClient.addEventListener("notification-reminder-created", reminderCreatedEventHandler);
            this._notificationSubscriptions["notification-reminder-created"] = reminderCreatedEventHandler;
            const reminderRemovedEventHandler = (event) => {
                this._logger?.info("Event for notification reminder removed received.", event);
            };
            await this._notificationClient.addEventListener("notification-reminder-removed", reminderRemovedEventHandler);
            this._notificationSubscriptions["notification-reminder-removed"] = reminderRemovedEventHandler;
            const toastDismissedEventHandler = (event) => {
                this._logger?.info("Event for notification toast dismissed received.", event);
            };
            await this._notificationClient.addEventListener("notification-toast-dismissed", toastDismissedEventHandler);
            this._notificationSubscriptions["notification-toast-dismissed"] = toastDismissedEventHandler;
            const notificationsCountChangedEventHandler = (event) => {
                this._logger?.info("Event for notification count changed received.", event);
            };
            await this._notificationClient.addEventListener("notifications-count-changed", notificationsCountChangedEventHandler);
            this._notificationSubscriptions["notifications-count-changed"] = notificationsCountChangedEventHandler;
        }
    }
    /**
     * Clean up notification subscriptions.
     */
    async removeNotificationEventListeners() {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._notificationClient) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._notificationSubscriptions)) {
            for (const [key, value] of Object.entries(this._notificationSubscriptions)) {
                await this._notificationClient.removeEventListener(key, value);
            }
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
/*!****************************************************************************!*\
  !*** ./client/src/modules/lifecycle/example-notification-service/index.ts ***!
  \****************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lifecycle */ "./client/src/modules/lifecycle/example-notification-service/lifecycle.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    lifecycle: new _lifecycle__WEBPACK_IMPORTED_MODULE_0__.ExampleNotificationServiceProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHO0FBQ0ksU0FBUyxPQUFPLENBQUMsS0FBYztJQUNyQyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLGFBQWEsQ0FBQyxLQUFjO0lBQzNDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FB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LE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUNqRCxHQUFrQyxFQUNsQyxLQUFjLENBQ2QsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDNVdEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMaUU7QUFFakU7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsU0FBUyxFQUFFLElBQUksMEVBQWtDLEVBQUU7Q0FDbkQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9saWZlY3ljbGUvZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS9saWZlY3ljbGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xpZmVjeWNsZS9leGFtcGxlLW5vdGlmaWNhdGlvbi1zZXJ2aWNlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIHsgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7XG5cdE5vdGlmaWNhdGlvbkFjdGlvbkV2ZW50LFxuXHROb3RpZmljYXRpb25DbG9zZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uQ3JlYXRlZEV2ZW50LFxuXHROb3RpZmljYXRpb25Gb3JtU3VibWl0dGVkRXZlbnQsXG5cdE5vdGlmaWNhdGlvblJlbWluZGVyQ3JlYXRlZEV2ZW50LFxuXHROb3RpZmljYXRpb25SZW1pbmRlclJlbW92ZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uVG9hc3REaXNtaXNzZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uc0NvdW50Q2hhbmdlZCxcblx0Tm90aWZpY2F0aW9uT3B0aW9uc1xufSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlL25vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcblx0TGlmZWN5Y2xlLFxuXHRMaWZlY3ljbGVFdmVudE1hcCxcblx0TGlmZWN5Y2xlRXZlbnRzXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbGlmZWN5Y2xlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHROb3RpZmljYXRpb25DbGllbnQsXG5cdE5vdGlmaWNhdGlvbnNFdmVudE1hcFxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL25vdGlmaWNhdGlvbi1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnMgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGV4YW1wbGUgbm90aWZpY2F0aW9uIHNlcnZpY2UgbGlmZWN5Y2xlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlclxuXHRpbXBsZW1lbnRzIExpZmVjeWNsZTxFeGFtcGxlTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyT3B0aW9ucz5cbntcblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbiBpbmNsdWRpbmcgc2V0dGluZ3MuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyT3B0aW9ucz4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfaGVscGVyczogTW9kdWxlSGVscGVycyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgY3VycmVudCBzdWJzY3JpcHRpb25zLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnM6IHsgW2tleTogc3RyaW5nXTogTGlmZWN5Y2xlRXZlbnRzIH0gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCBjb250YWluaW5nIGN1cnJlbnQgc3Vic2NyaXB0aW9ucy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zOlxuXHRcdHwgeyBba2V5IGluIGtleW9mIE5vdGlmaWNhdGlvbnNFdmVudE1hcF0/OiAoZXZlbnQ6IE5vdGlmaWNhdGlvbnNFdmVudE1hcFtrZXldKSA9PiB2b2lkIH1cblx0XHR8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogQSBub3RpZmljYXRpb24gY2xpZW50IGlmIGF2YWlsYWJsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9ub3RpZmljYXRpb25DbGllbnQ6IE5vdGlmaWNhdGlvbkNsaWVudCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoYEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlKCR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KTpgKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zID0ge307XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgZG93biBhbnkgcmVzb3VyY2VzIGJlaW5nIHVzZWQgYnkgdGhlIG1vZHVsZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjbG9zZWRvd24oKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQ2xvc2Vkb3duXCIpO1xuXHRcdC8vIGRpc2Nvbm5lY3QgZnJvbSB3ZWJzb2NrZXQvc2VydmVyIHNlbnQgZXZlbnQgc291cmNlIGZvciBleGFtcGxlXG5cdFx0YXdhaXQgdGhpcy5zdG9wTm90aWZpY2F0aW9uU2VydmljZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICogQHJldHVybnMgVGhlIG1hcCBvZiBsaWZlY3ljbGUgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldCgpOiBQcm9taXNlPExpZmVjeWNsZUV2ZW50TWFwPiB7XG5cdFx0Y29uc3QgbGlmZWN5Y2xlTWFwOiBMaWZlY3ljbGVFdmVudE1hcCA9IHt9O1xuXG5cdFx0bGlmZWN5Y2xlTWFwW1wiYWZ0ZXItYm9vdHN0cmFwXCJdID0gYXN5bmMgKFxuXHRcdFx0cGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlLFxuXHRcdFx0Y3VzdG9tRGF0YT86IHVua25vd25cblx0XHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGF3YWl0IHRoaXMuc3RhcnROb3RpZmljYXRpb25TZXJ2aWNlKCk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBsaWZlY3ljbGVNYXA7XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnRzIHRoZSBub3RpZmljYXRpb24gc2VydmljZS5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc3RhcnROb3RpZmljYXRpb25TZXJ2aWNlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHNlcnZlclVybCA9IHRoaXMuX2RlZmluaXRpb24/LmRhdGE/LmV4YW1wbGVTZXJ2ZXJVcmw7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0YFN0YXJ0aW5nIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIGFuZCBjb25uZWN0aW5nIHRvICR7XG5cdFx0XHRcdHNlcnZlclVybCA/PyBcImh0dHBzOi8vZXhhbXBsZW5vdGlmaWNhdGlvbnNlcnZlclwiXG5cdFx0XHR9IChOb3QgUmVhbGx5Li4udGhpcyBpcyBhbiBleGFtcGxlLilgXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudCkge1xuXHRcdFx0Ly8gd2UgaGF2ZSBiZWVuIHBhc3NlZCB0aGUgYWJpbGl0eSB0byBzdWJzY3JpYmUgdG8gbGlmZWN5Y2xlIGV2ZW50cy5cblx0XHRcdGlmICghdGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucykge1xuXHRcdFx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zID0ge307XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5faGVscGVycz8uZ2V0Tm90aWZpY2F0aW9uQ2xpZW50KSB7XG5cdFx0XHRcdHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudCA9IGF3YWl0IHRoaXMuX2hlbHBlcnMuZ2V0Tm90aWZpY2F0aW9uQ2xpZW50KCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9ub3RpZmljYXRpb25DbGllbnQpIHtcblx0XHRcdFx0YXdhaXQgdGhpcy5zZXR1cE5vdGlmaWNhdGlvbkV2ZW50TGlzdGVuZXJzKCk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy5hcHBzQ2hhbmdlZCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRjb25zdCBhcHBzQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2hlbHBlcnM/LnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwiYXBwcy1jaGFuZ2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiQXBwcyBDaGFuZ2VkIE5vdGlmaWNhdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRib2R5OiBgVGhlIGxpc3Qgb2YgYXBwcyBvbiB0aGlzIHBsYXRmb3JtIGhhcyBjaGFuZ2VkLlRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHR0b2FzdDogXCJ0cmFuc2llbnRcIixcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6IFwiZGVmYXVsdFwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zW2FwcHNDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwiYXBwcy1jaGFuZ2VkXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ubm90aWZ5T24/LmZhdm9yaXRlQ2hhbmdlZCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRjb25zdCBmYXZvcml0ZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHRcdFwiZmF2b3JpdGUtY2hhbmdlZFwiLFxuXHRcdFx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiRmF2b3JpdGUgQ2hhbmdlZCBOb3RpZmljYXRpb25cIixcblx0XHRcdFx0XHRcdFx0XHRib2R5OiBgWW91IGhhdmUgY2hhbmdlZCBhIGZhdm9yaXRlIG9uIHRoaXMgcGxhdGZvcm0uVGhpcyB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBleGFtcGxlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIChtb2R1bGVJZDogJHt0aGlzLl9kZWZpbml0aW9uPy5pZH0pLmAsXG5cdFx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6IFwiZGVmYXVsdFwiLFxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIm1hcmtkb3duXCJcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnNbZmF2b3JpdGVDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwiZmF2b3JpdGUtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy5wYWdlQ2hhbmdlZCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRjb25zdCBwYWdlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2hlbHBlcnM/LnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFwicGFnZS1jaGFuZ2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiUGFnZSBDaGFuZ2VkIE5vdGlmaWNhdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRib2R5OiBgWW91IGhhdmUgY2hhbmdlZCB0aGUgcGFnZSBvbiB0aGlzIHBsYXRmb3JtLlRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHR0b2FzdDogXCJ0cmFuc2llbnRcIixcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6IFwiZGVmYXVsdFwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zW3BhZ2VDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwicGFnZS1jaGFuZ2VkXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ubm90aWZ5T24/LnRoZW1lQ2hhbmdlZCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRjb25zdCB0aGVtZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHRcdFwidGhlbWUtY2hhbmdlZFwiLFxuXHRcdFx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiVGhlbWUgQ2hhbmdlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdGJvZHk6IGBZb3UgaGF2ZSBjaGFuZ2VkIHRoZSB0aGVtZSBmb3IgdGhpcyBwbGF0Zm9ybS4gVGhpcyB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBleGFtcGxlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIChtb2R1bGVJZDogJHt0aGlzLl9kZWZpbml0aW9uPy5pZH0pLmAsXG5cdFx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6IFwiZGVmYXVsdFwiLFxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIm1hcmtkb3duXCIsXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybTogW1xuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImJvb2xlYW5cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5OiBcImludGVuZGVkIHRoZW1lIGNoYW5nZVwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJEaWQgeW91IGludGVuZCB0byBjaGFuZ2UgdGhlIHRoZW1lP1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aWRnZXQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIlRvZ2dsZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnM6IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiQWNrbm93bGVkZ2VkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3VibWl0OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQ/LmNyZWF0ZShub3RpZmljYXRpb24pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1t0aGVtZUNoYW5nZWRTdWJzY3JpcHRpb25dID0gXCJ0aGVtZS1jaGFuZ2VkXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fZGVmaW5pdGlvbj8uZGF0YT8ubm90aWZ5T24/LndvcmtzcGFjZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3Qgd29ya3NwYWNlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2hlbHBlcnM/LnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KFxuXHRcdFx0XHRcdFx0XCJ3b3Jrc3BhY2UtY2hhbmdlZFwiLFxuXHRcdFx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiV29ya3NwYWNlIENoYW5nZWRcIixcblx0XHRcdFx0XHRcdFx0XHRib2R5OiBgWW91IGhhdmUgY2hhbmdlZCB5b3VyIHdvcmtzcGFjZS4gVGhpcyB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBleGFtcGxlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIChtb2R1bGVJZDogJHt0aGlzLl9kZWZpbml0aW9uPy5pZH0pLmAsXG5cdFx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6IFwiZGVmYXVsdFwiLFxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlOiBcIm1hcmtkb3duXCIsXG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9uczogW1xuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogXCJBY2tub3dsZWRnZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJidXR0b25cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y3RhOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzazogXCJhY2tub3dsZWRnZS10YXNrXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogXCJUaGlzIGlzIHRoZSByZXNwb25zZSBkYXRhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkNhbmNlbFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQ/LmNyZWF0ZShub3RpZmljYXRpb24pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1t3b3Jrc3BhY2VDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwid29ya3NwYWNlLWNoYW5nZWRcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdG9wcyB0aGUgbm90aWZpY2F0aW9uIHNlcnZpY2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHN0b3BOb3RpZmljYXRpb25TZXJ2aWNlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlN0b3BwaW5nIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIChOb3QgUmVhbGx5Li4udGhpcyBpcyBhbiBleGFtcGxlLilcIik7XG5cdFx0aWYgKHRoaXMuX2hlbHBlcnM/LnVuc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQgJiYgdGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucykge1xuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucykpIHtcblx0XHRcdFx0dGhpcy5faGVscGVycy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50KGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRhd2FpdCB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbkV2ZW50TGlzdGVuZXJzKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgbGlzdGVuZXJzIHVzaW5nIHRoZSBub3RpZmljYXRpb24gY2xpZW50IGZldGNoZWQgdmlhIGEgaGVscGVyLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzZXR1cE5vdGlmaWNhdGlvbkV2ZW50TGlzdGVuZXJzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9ub3RpZmljYXRpb25DbGllbnQpICYmICFpc0VtcHR5KHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMpKSB7XG5cdFx0XHRjb25zdCBhY3Rpb25FdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbkFjdGlvbkV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gYWN0aW9uIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbi1hY3Rpb25cIiwgYWN0aW9uRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tYWN0aW9uXCJdID0gYWN0aW9uRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCBjbG9zZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbkNsb3NlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gY2xvc2VkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbi1jbG9zZWRcIiwgY2xvc2VkRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tY2xvc2VkXCJdID0gY2xvc2VkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCBjcmVhdGVkRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25DcmVhdGVkRXZlbnQpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRXZlbnQgZm9yIG5vdGlmaWNhdGlvbiBjcmVhdGVkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbi1jcmVhdGVkXCIsIGNyZWF0ZWRFdmVudEhhbmRsZXIpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1jcmVhdGVkXCJdID0gY3JlYXRlZEV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3QgZm9ybVN1Ym1pdHRlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uRm9ybVN1Ym1pdHRlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gZm9ybSBzdWJtaXR0ZWQgcmVjZWl2ZWQuXCIsIGV2ZW50KTtcblx0XHRcdH07XG5cblx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcIm5vdGlmaWNhdGlvbi1mb3JtLXN1Ym1pdHRlZFwiLFxuXHRcdFx0XHRmb3JtU3VibWl0dGVkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1mb3JtLXN1Ym1pdHRlZFwiXSA9IGZvcm1TdWJtaXR0ZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IHJlbWluZGVyQ3JlYXRlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uUmVtaW5kZXJDcmVhdGVkRXZlbnQpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRXZlbnQgZm9yIG5vdGlmaWNhdGlvbiByZW1pbmRlciBjcmVhdGVkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb24tcmVtaW5kZXItY3JlYXRlZFwiLFxuXHRcdFx0XHRyZW1pbmRlckNyZWF0ZWRFdmVudEhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLXJlbWluZGVyLWNyZWF0ZWRcIl0gPSByZW1pbmRlckNyZWF0ZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IHJlbWluZGVyUmVtb3ZlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uUmVtaW5kZXJSZW1vdmVkRXZlbnQpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRXZlbnQgZm9yIG5vdGlmaWNhdGlvbiByZW1pbmRlciByZW1vdmVkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb24tcmVtaW5kZXItcmVtb3ZlZFwiLFxuXHRcdFx0XHRyZW1pbmRlclJlbW92ZWRFdmVudEhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLXJlbWluZGVyLXJlbW92ZWRcIl0gPSByZW1pbmRlclJlbW92ZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IHRvYXN0RGlzbWlzc2VkRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25Ub2FzdERpc21pc3NlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gdG9hc3QgZGlzbWlzc2VkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb24tdG9hc3QtZGlzbWlzc2VkXCIsXG5cdFx0XHRcdHRvYXN0RGlzbWlzc2VkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi10b2FzdC1kaXNtaXNzZWRcIl0gPSB0b2FzdERpc21pc3NlZEV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uc0NvdW50Q2hhbmdlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uc0NvdW50Q2hhbmdlZCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGNvdW50IGNoYW5nZWQgcmVjZWl2ZWQuXCIsIGV2ZW50KTtcblx0XHRcdH07XG5cblx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcIm5vdGlmaWNhdGlvbnMtY291bnQtY2hhbmdlZFwiLFxuXHRcdFx0XHRub3RpZmljYXRpb25zQ291bnRDaGFuZ2VkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbnMtY291bnQtY2hhbmdlZFwiXSA9IG5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWRFdmVudEhhbmRsZXI7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFuIHVwIG5vdGlmaWNhdGlvbiBzdWJzY3JpcHRpb25zLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyByZW1vdmVOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50KSAmJiAhaXNFbXB0eSh0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zKSkge1xuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9ucykpIHtcblx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFx0a2V5IGFzIGtleW9mIE5vdGlmaWNhdGlvbnNFdmVudE1hcCxcblx0XHRcdFx0XHR2YWx1ZSBhcyBuZXZlclxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciB9IGZyb20gXCIuL2xpZmVjeWNsZVwiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0bGlmZWN5Y2xlOiBuZXcgRXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9