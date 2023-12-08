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
    return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
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
    else if (isStringValue(err)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztHQUlHO0FBQ0ksU0FBUyxPQUFPLENBQUMsS0FBYztJQUNyQyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BHLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDM0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDO2dCQUM1RSxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FDakQsR0FBa0MsRUFDbEMsS0FBYyxDQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7OztTQzVXRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTGlFO0FBRWpFOztHQUVHO0FBQ0ksTUFBTSxXQUFXLEdBQXFEO0lBQzVFLFNBQVMsRUFBRSxJQUFJLDBFQUFrQyxFQUFFO0NBQ25ELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvbGlmZWN5Y2xlL2V4YW1wbGUtbm90aWZpY2F0aW9uLXNlcnZpY2UvbGlmZWN5Y2xlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9saWZlY3ljbGUvZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUge1xuXHROb3RpZmljYXRpb25BY3Rpb25FdmVudCxcblx0Tm90aWZpY2F0aW9uQ2xvc2VkRXZlbnQsXG5cdE5vdGlmaWNhdGlvbkNyZWF0ZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uRm9ybVN1Ym1pdHRlZEV2ZW50LFxuXHROb3RpZmljYXRpb25SZW1pbmRlckNyZWF0ZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uUmVtaW5kZXJSZW1vdmVkRXZlbnQsXG5cdE5vdGlmaWNhdGlvblRvYXN0RGlzbWlzc2VkRXZlbnQsXG5cdE5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWQsXG5cdE5vdGlmaWNhdGlvbk9wdGlvbnNcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG5cdExpZmVjeWNsZSxcblx0TGlmZWN5Y2xlRXZlbnRNYXAsXG5cdExpZmVjeWNsZUV2ZW50c1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0Tm90aWZpY2F0aW9uQ2xpZW50LFxuXHROb3RpZmljYXRpb25zRXZlbnRNYXBcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9ub3RpZmljYXRpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBleGFtcGxlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIGxpZmVjeWNsZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJcblx0aW1wbGVtZW50cyBMaWZlY3ljbGU8RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+XG57XG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24gaW5jbHVkaW5nIHNldHRpbmdzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCBjb250YWluaW5nIGN1cnJlbnQgc3Vic2NyaXB0aW9ucy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9saWZlQ3ljbGVTdWJzY3JpcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IExpZmVjeWNsZUV2ZW50cyB9IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgY29udGFpbmluZyBjdXJyZW50IHN1YnNjcmlwdGlvbnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uczpcblx0XHR8IHsgW2tleSBpbiBrZXlvZiBOb3RpZmljYXRpb25zRXZlbnRNYXBdPzogKGV2ZW50OiBOb3RpZmljYXRpb25zRXZlbnRNYXBba2V5XSkgPT4gdm9pZCB9XG5cdFx0fCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEEgbm90aWZpY2F0aW9uIGNsaWVudCBpZiBhdmFpbGFibGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbm90aWZpY2F0aW9uQ2xpZW50OiBOb3RpZmljYXRpb25DbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKGBFeGFtcGxlTm90aWZpY2F0aW9uU2VydmljZSgke3RoaXMuX2RlZmluaXRpb24/LmlkfSk6YCk7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucyA9IHt9O1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0XHQvLyBkaXNjb25uZWN0IGZyb20gd2Vic29ja2V0L3NlcnZlciBzZW50IGV2ZW50IHNvdXJjZSBmb3IgZXhhbXBsZVxuXHRcdGF3YWl0IHRoaXMuc3RvcE5vdGlmaWNhdGlvblNlcnZpY2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxpZmVjeWNsZSBldmVudHMuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxMaWZlY3ljbGVFdmVudE1hcD4ge1xuXHRcdGNvbnN0IGxpZmVjeWNsZU1hcDogTGlmZWN5Y2xlRXZlbnRNYXAgPSB7fTtcblxuXHRcdGxpZmVjeWNsZU1hcFtcImFmdGVyLWJvb3RzdHJhcFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGN1c3RvbURhdGE/OiB1bmtub3duXG5cdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRhd2FpdCB0aGlzLnN0YXJ0Tm90aWZpY2F0aW9uU2VydmljZSgpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gbGlmZWN5Y2xlTWFwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0cyB0aGUgbm90aWZpY2F0aW9uIHNlcnZpY2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHN0YXJ0Tm90aWZpY2F0aW9uU2VydmljZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5leGFtcGxlU2VydmVyVXJsO1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdGBTdGFydGluZyBub3RpZmljYXRpb24gc2VydmljZSBhbmQgY29ubmVjdGluZyB0byAke1xuXHRcdFx0XHRzZXJ2ZXJVcmwgPz8gXCJodHRwczovL2V4YW1wbGVub3RpZmljYXRpb25zZXJ2ZXJcIlxuXHRcdFx0fSAoTm90IFJlYWxseS4uLnRoaXMgaXMgYW4gZXhhbXBsZS4pYFxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdC8vIHdlIGhhdmUgYmVlbiBwYXNzZWQgdGhlIGFiaWxpdHkgdG8gc3Vic2NyaWJlIHRvIGxpZmVjeWNsZSBldmVudHMuXG5cdFx0XHRpZiAoIXRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCF0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2hlbHBlcnM/LmdldE5vdGlmaWNhdGlvbkNsaWVudCkge1xuXHRcdFx0XHR0aGlzLl9ub3RpZmljYXRpb25DbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldE5vdGlmaWNhdGlvbkNsaWVudCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50KSB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuc2V0dXBOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5ub3RpZnlPbj8uYXBwc0NoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXBwc0NoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcImFwcHMtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkFwcHMgQ2hhbmdlZCBOb3RpZmljYXRpb25cIixcblx0XHRcdFx0XHRcdFx0Ym9keTogYFRoZSBsaXN0IG9mIGFwcHMgb24gdGhpcyBwbGF0Zm9ybSBoYXMgY2hhbmdlZC5UaGlzIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIGV4YW1wbGUgbm90aWZpY2F0aW9uIHNlcnZpY2UgKG1vZHVsZUlkOiAke3RoaXMuX2RlZmluaXRpb24/LmlkfSkuYCxcblx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwibWFya2Rvd25cIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1thcHBzQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcImFwcHMtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy5mYXZvcml0ZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkZhdm9yaXRlIENoYW5nZWQgTm90aWZpY2F0aW9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgYSBmYXZvcml0ZSBvbiB0aGlzIHBsYXRmb3JtLlRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zW2Zhdm9yaXRlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcImZhdm9yaXRlLWNoYW5nZWRcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5ub3RpZnlPbj8ucGFnZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInBhZ2UtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIlBhZ2UgQ2hhbmdlZCBOb3RpZmljYXRpb25cIixcblx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgdGhlIHBhZ2Ugb24gdGhpcyBwbGF0Zm9ybS5UaGlzIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIGV4YW1wbGUgbm90aWZpY2F0aW9uIHNlcnZpY2UgKG1vZHVsZUlkOiAke3RoaXMuX2RlZmluaXRpb24/LmlkfSkuYCxcblx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwibWFya2Rvd25cIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1twYWdlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcInBhZ2UtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy50aGVtZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0XHRcInRoZW1lLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIlRoZW1lIENoYW5nZWRcIixcblx0XHRcdFx0XHRcdFx0XHRib2R5OiBgWW91IGhhdmUgY2hhbmdlZCB0aGUgdGhlbWUgZm9yIHRoaXMgcGxhdGZvcm0uIFRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiLFxuXHRcdFx0XHRcdFx0XHRcdGZvcm06IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJib29sZWFuXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGtleTogXCJpbnRlbmRlZCB0aGVtZSBjaGFuZ2VcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiRGlkIHlvdSBpbnRlbmQgdG8gY2hhbmdlIHRoZSB0aGVtZT9cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkZ2V0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJUb2dnbGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFx0XHRidXR0b25zOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkFja25vd2xlZGdlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1Ym1pdDogdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnNbdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwidGhlbWUtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy53b3Jrc3BhY2VDaGFuZ2VkICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHRcdFwid29ya3NwYWNlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIldvcmtzcGFjZSBDaGFuZ2VkXCIsXG5cdFx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgeW91ciB3b3Jrc3BhY2UuIFRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiLFxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnM6IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiQWNrbm93bGVkZ2VkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljazoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2s6IFwiYWNrbm93bGVkZ2UtdGFza1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhpcyBpcyB0aGUgcmVzcG9uc2UgZGF0YVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogXCJDYW5jZWxcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnNbd29ya3NwYWNlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcIndvcmtzcGFjZS1jaGFuZ2VkXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3RvcHMgdGhlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzdG9wTm90aWZpY2F0aW9uU2VydmljZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJTdG9wcGluZyBub3RpZmljYXRpb24gc2VydmljZSAoTm90IFJlYWxseS4uLnRoaXMgaXMgYW4gZXhhbXBsZS4pXCIpO1xuXHRcdGlmICh0aGlzLl9oZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50ICYmIHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpIHtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpKSB7XG5cdFx0XHRcdHRoaXMuX2hlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YXdhaXQgdGhpcy5yZW1vdmVOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIGxpc3RlbmVycyB1c2luZyB0aGUgbm90aWZpY2F0aW9uIGNsaWVudCBmZXRjaGVkIHZpYSBhIGhlbHBlci5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2V0dXBOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50KSAmJiAhaXNFbXB0eSh0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zKSkge1xuXHRcdFx0Y29uc3QgYWN0aW9uRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25BY3Rpb25FdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGFjdGlvbiByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tYWN0aW9uXCIsIGFjdGlvbkV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLWFjdGlvblwiXSA9IGFjdGlvbkV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3QgY2xvc2VkRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25DbG9zZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGNsb3NlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tY2xvc2VkXCIsIGNsb3NlZEV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLWNsb3NlZFwiXSA9IGNsb3NlZEV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3QgY3JlYXRlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uQ3JlYXRlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gY3JlYXRlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tY3JlYXRlZFwiLCBjcmVhdGVkRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tY3JlYXRlZFwiXSA9IGNyZWF0ZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IGZvcm1TdWJtaXR0ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbkZvcm1TdWJtaXR0ZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGZvcm0gc3VibWl0dGVkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb24tZm9ybS1zdWJtaXR0ZWRcIixcblx0XHRcdFx0Zm9ybVN1Ym1pdHRlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tZm9ybS1zdWJtaXR0ZWRcIl0gPSBmb3JtU3VibWl0dGVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCByZW1pbmRlckNyZWF0ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvblJlbWluZGVyQ3JlYXRlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gcmVtaW5kZXIgY3JlYXRlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXJlbWluZGVyLWNyZWF0ZWRcIixcblx0XHRcdFx0cmVtaW5kZXJDcmVhdGVkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1yZW1pbmRlci1jcmVhdGVkXCJdID0gcmVtaW5kZXJDcmVhdGVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCByZW1pbmRlclJlbW92ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvblJlbWluZGVyUmVtb3ZlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gcmVtaW5kZXIgcmVtb3ZlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXJlbWluZGVyLXJlbW92ZWRcIixcblx0XHRcdFx0cmVtaW5kZXJSZW1vdmVkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1yZW1pbmRlci1yZW1vdmVkXCJdID0gcmVtaW5kZXJSZW1vdmVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCB0b2FzdERpc21pc3NlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uVG9hc3REaXNtaXNzZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIHRvYXN0IGRpc21pc3NlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXRvYXN0LWRpc21pc3NlZFwiLFxuXHRcdFx0XHR0b2FzdERpc21pc3NlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tdG9hc3QtZGlzbWlzc2VkXCJdID0gdG9hc3REaXNtaXNzZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWQpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRXZlbnQgZm9yIG5vdGlmaWNhdGlvbiBjb3VudCBjaGFuZ2VkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb25zLWNvdW50LWNoYW5nZWRcIixcblx0XHRcdFx0bm90aWZpY2F0aW9uc0NvdW50Q2hhbmdlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb25zLWNvdW50LWNoYW5nZWRcIl0gPSBub3RpZmljYXRpb25zQ291bnRDaGFuZ2VkRXZlbnRIYW5kbGVyO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbiB1cCBub3RpZmljYXRpb24gc3Vic2NyaXB0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVtb3ZlTm90aWZpY2F0aW9uRXZlbnRMaXN0ZW5lcnMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudCkgJiYgIWlzRW1wdHkodGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9ucykpIHtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMpKSB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdGtleSBhcyBrZXlvZiBOb3RpZmljYXRpb25zRXZlbnRNYXAsXG5cdFx0XHRcdFx0dmFsdWUgYXMgbmV2ZXJcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9saWZlY3ljbGVcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGxpZmVjeWNsZTogbmV3IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==