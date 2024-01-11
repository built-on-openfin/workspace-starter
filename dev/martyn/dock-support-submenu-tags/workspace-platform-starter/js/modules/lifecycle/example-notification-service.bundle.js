/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
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
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
function deepEqual(obj1, obj2, matchPropertyOrder = true) {
    if (isObject(obj1) && isObject(obj2)) {
        const objKeys1 = Object.keys(obj1);
        const objKeys2 = Object.keys(obj2);
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
        if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
            return false;
        }
        for (const key of objKeys1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value1 = obj1[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value2 = obj2[key];
            if (!deepEqual(value1, value2, matchPropertyOrder)) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
                return false;
            }
        }
    }
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
function deepMerge(target, ...sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
        return target;
    }
    const targetAsMap = target;
    const source = sources.shift();
    let keys;
    if (isObject(targetAsMap) && isObject(source)) {
        keys = Object.keys(source);
    }
    else if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            return source;
        }
        keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
    }
    if (keys) {
        const sourceAsMap = source;
        for (const key of keys) {
            const value = sourceAsMap[key];
            if (isObject(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = {};
                }
                deepMerge(targetAsMap[key], value);
            }
            else if (Array.isArray(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = [];
                }
                deepMerge(targetAsMap[key], value);
            }
            else {
                targetAsMap[key] = value;
            }
        }
    }
    return deepMerge(target, ...sources);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0dBSUc7QUFDSSxTQUFTLE9BQU8sQ0FBQyxLQUFjO0lBQ3JDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEcsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQ3RDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLGFBQWEsQ0FBQyxLQUFjO0lBQzNDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxRQUFRLENBQUMsS0FBYztJQUN0QyxnREFBZ0Q7SUFDaEQsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQzNFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBYztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxD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LENBQUM7Z0JBQzVFLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUNqRCxHQUFrQyxFQUNsQyxLQUFjLENBQ2QsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7O1NDNVdEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMaUU7QUFFakU7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsU0FBUyxFQUFFLElBQUksMEVBQWtDLEVBQUU7Q0FDbkQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9saWZlY3ljbGUvZXhhbXBsZS1ub3RpZmljYXRpb24tc2VydmljZS9saWZlY3ljbGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2xpZmVjeWNsZS9leGFtcGxlLW5vdGlmaWNhdGlvbi1zZXJ2aWNlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBEbyBhIGRlZXAgY29tcGFyaXNvbiBvZiB0aGUgb2JqZWN0cy5cbiAqIEBwYXJhbSBvYmoxIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvYmoyIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbWF0Y2hQcm9wZXJ0eU9yZGVyIElmIHRydWUgdGhlIHByb3BlcnRpZXMgbXVzdCBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9iamVjdHMgYXJlIHRoZSBzYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEVxdWFsKG9iajE6IHVua25vd24sIG9iajI6IHVua25vd24sIG1hdGNoUHJvcGVydHlPcmRlcjogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcblx0aWYgKGlzT2JqZWN0KG9iajEpICYmIGlzT2JqZWN0KG9iajIpKSB7XG5cdFx0Y29uc3Qgb2JqS2V5czEgPSBPYmplY3Qua2V5cyhvYmoxKTtcblx0XHRjb25zdCBvYmpLZXlzMiA9IE9iamVjdC5rZXlzKG9iajIpO1xuXG5cdFx0aWYgKG9iaktleXMxLmxlbmd0aCAhPT0gb2JqS2V5czIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoUHJvcGVydHlPcmRlciAmJiBKU09OLnN0cmluZ2lmeShvYmpLZXlzMSkgIT09IEpTT04uc3RyaW5naWZ5KG9iaktleXMyKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iaktleXMxKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUxID0gKG9iajEgYXMgYW55KVtrZXldO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMiA9IChvYmoyIGFzIGFueSlba2V5XTtcblxuXHRcdFx0aWYgKCFkZWVwRXF1YWwodmFsdWUxLCB2YWx1ZTIsIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajEpICYmIEFycmF5LmlzQXJyYXkob2JqMikpIHtcblx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFkZWVwRXF1YWwob2JqMVtpXSwgb2JqMltpXSwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKTtcbn1cblxuLyoqXG4gKiBEZWVwIG1lcmdlIHR3byBvYmplY3RzLlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGJlIG1lcmdlZCBpbnRvLlxuICogQHBhcmFtIHNvdXJjZXMgVGhlIG9iamVjdHMgdG8gbWVyZ2UgaW50byB0aGUgdGFyZ2V0LlxuICogQHJldHVybnMgVGhlIG1lcmdlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8VCA9IHVua25vd24+KHRhcmdldDogVCwgLi4uc291cmNlczogVFtdKTogVCB7XG5cdGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VzKSB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc01hcCA9IHRhcmdldCBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cblx0bGV0IGtleXM7XG5cdGlmIChpc09iamVjdCh0YXJnZXRBc01hcCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gc291cmNlO1xuXHRcdH1cblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKS5tYXAoKGspID0+IE51bWJlci5wYXJzZUludChrLCAxMCkpO1xuXHR9XG5cblx0aWYgKGtleXMpIHtcblx0XHRjb25zdCBzb3VyY2VBc01hcCA9IHNvdXJjZSBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlQXNNYXBba2V5XTtcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHRhcmdldCwgLi4uc291cmNlcyk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlIH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUge1xuXHROb3RpZmljYXRpb25BY3Rpb25FdmVudCxcblx0Tm90aWZpY2F0aW9uQ2xvc2VkRXZlbnQsXG5cdE5vdGlmaWNhdGlvbkNyZWF0ZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uRm9ybVN1Ym1pdHRlZEV2ZW50LFxuXHROb3RpZmljYXRpb25SZW1pbmRlckNyZWF0ZWRFdmVudCxcblx0Tm90aWZpY2F0aW9uUmVtaW5kZXJSZW1vdmVkRXZlbnQsXG5cdE5vdGlmaWNhdGlvblRvYXN0RGlzbWlzc2VkRXZlbnQsXG5cdE5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWQsXG5cdE5vdGlmaWNhdGlvbk9wdGlvbnNcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG5cdExpZmVjeWNsZSxcblx0TGlmZWN5Y2xlRXZlbnRNYXAsXG5cdExpZmVjeWNsZUV2ZW50c1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xpZmVjeWNsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0Tm90aWZpY2F0aW9uQ2xpZW50LFxuXHROb3RpZmljYXRpb25zRXZlbnRNYXBcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9ub3RpZmljYXRpb24tc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gZm9yIHRoZSBleGFtcGxlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIGxpZmVjeWNsZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJcblx0aW1wbGVtZW50cyBMaWZlY3ljbGU8RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+XG57XG5cdC8qKlxuXHQgKiBUaGUgbW9kdWxlIGRlZmluaXRpb24gaW5jbHVkaW5nIHNldHRpbmdzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCBjb250YWluaW5nIGN1cnJlbnQgc3Vic2NyaXB0aW9ucy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9saWZlQ3ljbGVTdWJzY3JpcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IExpZmVjeWNsZUV2ZW50cyB9IHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgY29udGFpbmluZyBjdXJyZW50IHN1YnNjcmlwdGlvbnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uczpcblx0XHR8IHsgW2tleSBpbiBrZXlvZiBOb3RpZmljYXRpb25zRXZlbnRNYXBdPzogKGV2ZW50OiBOb3RpZmljYXRpb25zRXZlbnRNYXBba2V5XSkgPT4gdm9pZCB9XG5cdFx0fCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEEgbm90aWZpY2F0aW9uIGNsaWVudCBpZiBhdmFpbGFibGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbm90aWZpY2F0aW9uQ2xpZW50OiBOb3RpZmljYXRpb25DbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlck9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKGBFeGFtcGxlTm90aWZpY2F0aW9uU2VydmljZSgke3RoaXMuX2RlZmluaXRpb24/LmlkfSk6YCk7XG5cdFx0dGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG5cdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucyA9IHt9O1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0XHQvLyBkaXNjb25uZWN0IGZyb20gd2Vic29ja2V0L3NlcnZlciBzZW50IGV2ZW50IHNvdXJjZSBmb3IgZXhhbXBsZVxuXHRcdGF3YWl0IHRoaXMuc3RvcE5vdGlmaWNhdGlvblNlcnZpY2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxpZmVjeWNsZSBldmVudHMuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgbGlmZWN5Y2xlIGV2ZW50cy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXQoKTogUHJvbWlzZTxMaWZlY3ljbGVFdmVudE1hcD4ge1xuXHRcdGNvbnN0IGxpZmVjeWNsZU1hcDogTGlmZWN5Y2xlRXZlbnRNYXAgPSB7fTtcblxuXHRcdGxpZmVjeWNsZU1hcFtcImFmdGVyLWJvb3RzdHJhcFwiXSA9IGFzeW5jIChcblx0XHRcdHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSxcblx0XHRcdGN1c3RvbURhdGE/OiB1bmtub3duXG5cdFx0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRhd2FpdCB0aGlzLnN0YXJ0Tm90aWZpY2F0aW9uU2VydmljZSgpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gbGlmZWN5Y2xlTWFwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0cyB0aGUgbm90aWZpY2F0aW9uIHNlcnZpY2UuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHN0YXJ0Tm90aWZpY2F0aW9uU2VydmljZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5leGFtcGxlU2VydmVyVXJsO1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdGBTdGFydGluZyBub3RpZmljYXRpb24gc2VydmljZSBhbmQgY29ubmVjdGluZyB0byAke1xuXHRcdFx0XHRzZXJ2ZXJVcmwgPz8gXCJodHRwczovL2V4YW1wbGVub3RpZmljYXRpb25zZXJ2ZXJcIlxuXHRcdFx0fSAoTm90IFJlYWxseS4uLnRoaXMgaXMgYW4gZXhhbXBsZS4pYFxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQpIHtcblx0XHRcdC8vIHdlIGhhdmUgYmVlbiBwYXNzZWQgdGhlIGFiaWxpdHkgdG8gc3Vic2NyaWJlIHRvIGxpZmVjeWNsZSBldmVudHMuXG5cdFx0XHRpZiAoIXRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCF0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2hlbHBlcnM/LmdldE5vdGlmaWNhdGlvbkNsaWVudCkge1xuXHRcdFx0XHR0aGlzLl9ub3RpZmljYXRpb25DbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldE5vdGlmaWNhdGlvbkNsaWVudCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50KSB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuc2V0dXBOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5ub3RpZnlPbj8uYXBwc0NoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXBwc0NoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcImFwcHMtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkFwcHMgQ2hhbmdlZCBOb3RpZmljYXRpb25cIixcblx0XHRcdFx0XHRcdFx0Ym9keTogYFRoZSBsaXN0IG9mIGFwcHMgb24gdGhpcyBwbGF0Zm9ybSBoYXMgY2hhbmdlZC5UaGlzIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIGV4YW1wbGUgbm90aWZpY2F0aW9uIHNlcnZpY2UgKG1vZHVsZUlkOiAke3RoaXMuX2RlZmluaXRpb24/LmlkfSkuYCxcblx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwibWFya2Rvd25cIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1thcHBzQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcImFwcHMtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy5mYXZvcml0ZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgZmF2b3JpdGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0XHRcImZhdm9yaXRlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkZhdm9yaXRlIENoYW5nZWQgTm90aWZpY2F0aW9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgYSBmYXZvcml0ZSBvbiB0aGlzIHBsYXRmb3JtLlRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR0aGlzLl9saWZlQ3ljbGVTdWJzY3JpcHRpb25zW2Zhdm9yaXRlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcImZhdm9yaXRlLWNoYW5nZWRcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9kZWZpbml0aW9uPy5kYXRhPy5ub3RpZnlPbj8ucGFnZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcInBhZ2UtY2hhbmdlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIlBhZ2UgQ2hhbmdlZCBOb3RpZmljYXRpb25cIixcblx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgdGhlIHBhZ2Ugb24gdGhpcyBwbGF0Zm9ybS5UaGlzIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIGV4YW1wbGUgbm90aWZpY2F0aW9uIHNlcnZpY2UgKG1vZHVsZUlkOiAke3RoaXMuX2RlZmluaXRpb24/LmlkfSkuYCxcblx0XHRcdFx0XHRcdFx0dG9hc3Q6IFwidHJhbnNpZW50XCIsXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IFwibWFya2Rvd25cIlxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudD8uY3JlYXRlKG5vdGlmaWNhdGlvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5fbGlmZUN5Y2xlU3Vic2NyaXB0aW9uc1twYWdlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcInBhZ2UtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy50aGVtZUNoYW5nZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5faGVscGVycz8uc3Vic2NyaWJlTGlmZWN5Y2xlRXZlbnQoXG5cdFx0XHRcdFx0XHRcInRoZW1lLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIlRoZW1lIENoYW5nZWRcIixcblx0XHRcdFx0XHRcdFx0XHRib2R5OiBgWW91IGhhdmUgY2hhbmdlZCB0aGUgdGhlbWUgZm9yIHRoaXMgcGxhdGZvcm0uIFRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiLFxuXHRcdFx0XHRcdFx0XHRcdGZvcm06IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJib29sZWFuXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGtleTogXCJpbnRlbmRlZCB0aGVtZSBjaGFuZ2VcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiRGlkIHlvdSBpbnRlbmQgdG8gY2hhbmdlIHRoZSB0aGVtZT9cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkZ2V0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJUb2dnbGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFx0XHRidXR0b25zOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkFja25vd2xlZGdlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1Ym1pdDogdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnNbdGhlbWVDaGFuZ2VkU3Vic2NyaXB0aW9uXSA9IFwidGhlbWUtY2hhbmdlZFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RlZmluaXRpb24/LmRhdGE/Lm5vdGlmeU9uPy53b3Jrc3BhY2VDaGFuZ2VkICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGNvbnN0IHdvcmtzcGFjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9oZWxwZXJzPy5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChcblx0XHRcdFx0XHRcdFwid29ya3NwYWNlLWNoYW5nZWRcIixcblx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBcIldvcmtzcGFjZSBDaGFuZ2VkXCIsXG5cdFx0XHRcdFx0XHRcdFx0Ym9keTogYFlvdSBoYXZlIGNoYW5nZWQgeW91ciB3b3Jrc3BhY2UuIFRoaXMgd2FzIGdlbmVyYXRlZCBieSB0aGUgZXhhbXBsZSBub3RpZmljYXRpb24gc2VydmljZSAobW9kdWxlSWQ6ICR7dGhpcy5fZGVmaW5pdGlvbj8uaWR9KS5gLFxuXHRcdFx0XHRcdFx0XHRcdHRvYXN0OiBcInRyYW5zaWVudFwiLFxuXHRcdFx0XHRcdFx0XHRcdGNhdGVnb3J5OiBcImRlZmF1bHRcIixcblx0XHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogXCJtYXJrZG93blwiLFxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnM6IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiQWNrbm93bGVkZ2VkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljazoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2s6IFwiYWNrbm93bGVkZ2UtdGFza1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhpcyBpcyB0aGUgcmVzcG9uc2UgZGF0YVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogXCJDYW5jZWxcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50Py5jcmVhdGUobm90aWZpY2F0aW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnNbd29ya3NwYWNlQ2hhbmdlZFN1YnNjcmlwdGlvbl0gPSBcIndvcmtzcGFjZS1jaGFuZ2VkXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3RvcHMgdGhlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBzdG9wTm90aWZpY2F0aW9uU2VydmljZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJTdG9wcGluZyBub3RpZmljYXRpb24gc2VydmljZSAoTm90IFJlYWxseS4uLnRoaXMgaXMgYW4gZXhhbXBsZS4pXCIpO1xuXHRcdGlmICh0aGlzLl9oZWxwZXJzPy51bnN1YnNjcmliZUxpZmVjeWNsZUV2ZW50ICYmIHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpIHtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2xpZmVDeWNsZVN1YnNjcmlwdGlvbnMpKSB7XG5cdFx0XHRcdHRoaXMuX2hlbHBlcnMudW5zdWJzY3JpYmVMaWZlY3ljbGVFdmVudChrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YXdhaXQgdGhpcy5yZW1vdmVOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIGxpc3RlbmVycyB1c2luZyB0aGUgbm90aWZpY2F0aW9uIGNsaWVudCBmZXRjaGVkIHZpYSBhIGhlbHBlci5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgc2V0dXBOb3RpZmljYXRpb25FdmVudExpc3RlbmVycygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50KSAmJiAhaXNFbXB0eSh0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zKSkge1xuXHRcdFx0Y29uc3QgYWN0aW9uRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25BY3Rpb25FdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGFjdGlvbiByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tYWN0aW9uXCIsIGFjdGlvbkV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLWFjdGlvblwiXSA9IGFjdGlvbkV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3QgY2xvc2VkRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBOb3RpZmljYXRpb25DbG9zZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGNsb3NlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tY2xvc2VkXCIsIGNsb3NlZEV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLl9ub3RpZmljYXRpb25TdWJzY3JpcHRpb25zW1wibm90aWZpY2F0aW9uLWNsb3NlZFwiXSA9IGNsb3NlZEV2ZW50SGFuZGxlcjtcblxuXHRcdFx0Y29uc3QgY3JlYXRlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uQ3JlYXRlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gY3JlYXRlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb24tY3JlYXRlZFwiLCBjcmVhdGVkRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tY3JlYXRlZFwiXSA9IGNyZWF0ZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IGZvcm1TdWJtaXR0ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbkZvcm1TdWJtaXR0ZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIGZvcm0gc3VibWl0dGVkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb24tZm9ybS1zdWJtaXR0ZWRcIixcblx0XHRcdFx0Zm9ybVN1Ym1pdHRlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tZm9ybS1zdWJtaXR0ZWRcIl0gPSBmb3JtU3VibWl0dGVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCByZW1pbmRlckNyZWF0ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvblJlbWluZGVyQ3JlYXRlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gcmVtaW5kZXIgY3JlYXRlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXJlbWluZGVyLWNyZWF0ZWRcIixcblx0XHRcdFx0cmVtaW5kZXJDcmVhdGVkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1yZW1pbmRlci1jcmVhdGVkXCJdID0gcmVtaW5kZXJDcmVhdGVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCByZW1pbmRlclJlbW92ZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvblJlbWluZGVyUmVtb3ZlZEV2ZW50KTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkV2ZW50IGZvciBub3RpZmljYXRpb24gcmVtaW5kZXIgcmVtb3ZlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXJlbWluZGVyLXJlbW92ZWRcIixcblx0XHRcdFx0cmVtaW5kZXJSZW1vdmVkRXZlbnRIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9uc1tcIm5vdGlmaWNhdGlvbi1yZW1pbmRlci1yZW1vdmVkXCJdID0gcmVtaW5kZXJSZW1vdmVkRXZlbnRIYW5kbGVyO1xuXG5cdFx0XHRjb25zdCB0b2FzdERpc21pc3NlZEV2ZW50SGFuZGxlciA9IChldmVudDogTm90aWZpY2F0aW9uVG9hc3REaXNtaXNzZWRFdmVudCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJFdmVudCBmb3Igbm90aWZpY2F0aW9uIHRvYXN0IGRpc21pc3NlZCByZWNlaXZlZC5cIiwgZXZlbnQpO1xuXHRcdFx0fTtcblxuXHRcdFx0YXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uQ2xpZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFwibm90aWZpY2F0aW9uLXRvYXN0LWRpc21pc3NlZFwiLFxuXHRcdFx0XHR0b2FzdERpc21pc3NlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb24tdG9hc3QtZGlzbWlzc2VkXCJdID0gdG9hc3REaXNtaXNzZWRFdmVudEhhbmRsZXI7XG5cblx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWRFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IE5vdGlmaWNhdGlvbnNDb3VudENoYW5nZWQpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRXZlbnQgZm9yIG5vdGlmaWNhdGlvbiBjb3VudCBjaGFuZ2VkIHJlY2VpdmVkLlwiLCBldmVudCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRhd2FpdCB0aGlzLl9ub3RpZmljYXRpb25DbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XCJub3RpZmljYXRpb25zLWNvdW50LWNoYW5nZWRcIixcblx0XHRcdFx0bm90aWZpY2F0aW9uc0NvdW50Q2hhbmdlZEV2ZW50SGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnNbXCJub3RpZmljYXRpb25zLWNvdW50LWNoYW5nZWRcIl0gPSBub3RpZmljYXRpb25zQ291bnRDaGFuZ2VkRXZlbnRIYW5kbGVyO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbiB1cCBub3RpZmljYXRpb24gc3Vic2NyaXB0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgcmVtb3ZlTm90aWZpY2F0aW9uRXZlbnRMaXN0ZW5lcnMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudCkgJiYgIWlzRW1wdHkodGhpcy5fbm90aWZpY2F0aW9uU3Vic2NyaXB0aW9ucykpIHtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX25vdGlmaWNhdGlvblN1YnNjcmlwdGlvbnMpKSB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvbkNsaWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdGtleSBhcyBrZXlvZiBOb3RpZmljYXRpb25zRXZlbnRNYXAsXG5cdFx0XHRcdFx0dmFsdWUgYXMgbmV2ZXJcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9saWZlY3ljbGVcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGxpZmVjeWNsZTogbmV3IEV4YW1wbGVOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==