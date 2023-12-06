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

/***/ "./client/src/modules/auth/example/auth.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/auth/example/auth.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleAuthProvider: () => (/* binding */ ExampleAuthProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");


/**
 * Example authentication provider.
 */
class ExampleAuthProvider {
    /**
     * Create a new instance of ExampleAuthProvider.
     */
    constructor() {
        this._subscribeIdMap = {};
        this._eventSubscribers = {};
    }
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("AuthExample");
        this._authenticatedKey = `${fin.me.identity.uuid}-EXAMPLE_AUTH_IS_AUTHENTICATED`;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authOptions)) {
            this._logger.info(`Setting options: ${JSON.stringify(definition.data, null, 4)}`);
            this._authOptions = definition.data;
            this._authenticated = Boolean(localStorage.getItem(this._authenticatedKey));
            if (this._authenticated) {
                this._currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)();
                this.checkForSessionExpiry();
            }
        }
        else {
            this._logger.warn("Options have already been set as init has already been called");
        }
    }
    /**
     * Subscribe to one of the auth events.
     * @param to The event to subscribe to.
     * @param callback The callback to fire when the event occurs.
     * @returns Subscription id for unsubscribing or undefined if event type is not available.
     */
    subscribe(to, callback) {
        const subscriptionId = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
        const toMap = this._eventSubscribers[to] ?? {};
        toMap[subscriptionId] = callback;
        this._eventSubscribers[to] = toMap;
        this._subscribeIdMap[subscriptionId] = to;
        this._logger?.info(`Subscription to ${to} events registered. Subscription Id: ${subscriptionId}`);
        return subscriptionId;
    }
    /**
     * Unsubscribe from an already subscribed event.
     * @param subscriptionId The id of the subscription returned from subscribe.
     * @returns True if the unsubscribe was successful.
     */
    unsubscribe(subscriptionId) {
        const eventType = this._subscribeIdMap[subscriptionId];
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(eventType)) {
            this._logger?.warn(`You have tried to unsubscribe with a key ${subscriptionId} that is invalid`);
            return false;
        }
        const eventSubscribers = this._eventSubscribers[eventType];
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(eventSubscribers)) {
            delete eventSubscribers[subscriptionId];
        }
        if (this._subscribeIdMap[subscriptionId]) {
            delete this._subscribeIdMap[subscriptionId];
            this._logger?.info(`Subscription to ${eventType} events with subscription Id: ${subscriptionId} has been cleared`);
            return true;
        }
        this._logger?.warn(`Subscription to ${eventType} events with subscription Id: ${subscriptionId} could not be cleared as we do not have a register of that event type.`);
        return false;
    }
    /**
     * Does the auth provider require authentication.
     * @returns True if authentication is required.
     */
    async isAuthenticationRequired() {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated)) {
            this._authenticated = false;
        }
        return !this._authenticated;
    }
    /**
     * Perform the login operation on the auth provider.
     * @returns True if the login was successful.
     */
    async login() {
        this._logger?.info("login requested");
        if (this._authenticated) {
            this._logger?.info("User already authenticated");
            return this._authenticated;
        }
        if (this._authOptions?.autoLogin) {
            this._logger?.info("autoLogin enabled in auth provide module settings. Fake logged in");
            this._authenticated = true;
        }
        else {
            this._authenticated = await this.getAuthenticationFromUser();
        }
        if (this._authenticated) {
            if (this._authenticatedKey) {
                localStorage.setItem(this._authenticatedKey, this._authenticated.toString());
            }
            this.checkForSessionExpiry();
            await this.notifySubscribers("logged-in");
        }
        else {
            (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
        }
        return this._authenticated;
    }
    /**
     * Perform the logout operation on the auth provider.
     * @returns True if the logout was successful.
     */
    async logout() {
        return new Promise((resolve, reject) => {
            this.handleLogout(resolve)
                .then(async () => {
                this._logger?.info("Log out called");
                return true;
            })
                .catch(async (error) => {
                this._logger?.error(`Error while trying to log out ${error}`);
            });
        });
    }
    /**
     * Get user information from the auth provider.
     * @returns The user information.
     */
    async getUserInfo() {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated) || !this._authenticated) {
            this._logger?.warn("Unable to retrieve user info unless the user is authenticated");
            return;
        }
        this._logger?.info("This example returns a user if it was provided to the example login");
        return this._currentUser;
    }
    /**
     * Get the authentication from the user.
     * @returns True if authenticated.
     */
    async getAuthenticationFromUser() {
        return new Promise((resolve, reject) => {
            if (this._authOptions) {
                this.openLoginWindow(this._authOptions.loginUrl)
                    .then(async (openedWin) => {
                    let win = openedWin;
                    if (this._authOptions) {
                        const authMatch = new RegExp(this._authOptions.authenticatedUrl, "i");
                        try {
                            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
                                const info = await win.getInfo();
                                if (authMatch.test(info.url)) {
                                    await win.close(true);
                                    return resolve(true);
                                }
                                await win.show(true);
                            }
                        }
                        catch (error) {
                            this._logger?.error(`Error while checking if login window automatically redirected. Error ${(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.formatError)(error)}`);
                            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
                                await win.show(true);
                            }
                        }
                        let statusCheck;
                        await win.addListener("closed", async () => {
                            if (win) {
                                window.clearInterval(statusCheck);
                                statusCheck = undefined;
                                this._logger?.info("Auth Window cancelled by user");
                                win = undefined;
                                return resolve(false);
                            }
                        });
                        statusCheck = window.setInterval(async () => {
                            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
                                const info = await win.getInfo();
                                if (authMatch.test(info.url)) {
                                    window.clearInterval(statusCheck);
                                    await win.removeAllListeners();
                                    await win.close(true);
                                    return resolve(true);
                                }
                            }
                            else {
                                return resolve(false);
                            }
                        }, this._authOptions.checkLoginStatusInSeconds ?? 1 * 1000);
                        return true;
                    }
                    return false;
                })
                    .catch((error) => {
                    this._logger?.error("Error while trying to authenticate the user", error);
                });
            }
        });
    }
    /**
     * Check to see if a session has expired.
     */
    checkForSessionExpiry() {
        const validity = this._authOptions?.checkSessionValidityInSeconds;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(validity) && validity > -1 && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._sessionExpiryCheckId)) {
            this._sessionExpiryCheckId = window.setTimeout(async () => {
                if (this._authOptions) {
                    this._sessionExpiryCheckId = undefined;
                    const stillAuthenticated = await this.checkAuth(this._authOptions.loginUrl);
                    if (stillAuthenticated) {
                        this._logger?.info("Session Still Active");
                        this.checkForSessionExpiry();
                    }
                    else {
                        this._logger?.info("Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check");
                        this._authenticated = false;
                        if (this._authenticatedKey) {
                            localStorage.removeItem(this._authenticatedKey);
                        }
                        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
                        await this.notifySubscribers("session-expired");
                    }
                }
            }, validity * 1000);
        }
    }
    /**
     * Notify subscribers of an event change.
     * @param authEventType The type of authentication event to send to.
     */
    async notifySubscribers(authEventType) {
        const subscribers = this._eventSubscribers[authEventType];
        if (subscribers) {
            const subscriberIds = Object.keys(subscribers);
            subscriberIds.reverse();
            for (const subscriberId of subscriberIds) {
                this._logger?.info(`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${authEventType}`);
                await subscribers[subscriberId]();
            }
        }
    }
    /**
     * Handle logout.
     * @param resolve The resolve method to call after logout.
     * @returns Nothing.
     */
    async handleLogout(resolve) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated) || !this._authenticated) {
            this._logger?.error("You have requested to log out but are not logged in");
            resolve(false);
            return;
        }
        this._logger?.info("Log out requested");
        await this.notifySubscribers("before-logged-out");
        this._authenticated = false;
        if (this._authenticatedKey) {
            localStorage.removeItem(this._authenticatedKey);
        }
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
        const logoutUrl = this._authOptions?.logoutUrl;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(logoutUrl)) {
            try {
                const win = await this.openLogoutWindow(logoutUrl);
                setTimeout(async () => {
                    await win.close();
                    await this.notifySubscribers("logged-out");
                    resolve(true);
                }, 2000);
            }
            catch (error) {
                this._logger?.error(`Error while launching logout window. ${error}`);
                return resolve(false);
            }
        }
        else {
            await this.notifySubscribers("logged-out");
            resolve(true);
        }
    }
    /**
     * Open the login window.
     * @param url The url to open for the login window.
     * @returns The window that was created.
     */
    async openLoginWindow(url) {
        const enrichedCustomData = {
            currentUserKey: _util__WEBPACK_IMPORTED_MODULE_1__.EXAMPLE_AUTH_CURRENT_USER_KEY,
            ...this._authOptions?.customData
        };
        return fin.Window.create({
            name: "example-auth-log-in",
            alwaysOnTop: true,
            maximizable: false,
            minimizable: false,
            autoShow: false,
            defaultCentered: true,
            defaultHeight: this._authOptions?.loginHeight ?? 325,
            defaultWidth: this._authOptions?.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url,
            customData: enrichedCustomData
        });
    }
    /**
     * Open the logout window.
     * @param url The url for the logout window.
     * @returns The window created.
     */
    async openLogoutWindow(url) {
        return fin.Window.create({
            name: "example-auth-log-out",
            maximizable: false,
            minimizable: false,
            autoShow: false,
            defaultCentered: true,
            defaultHeight: this._authOptions?.loginHeight ?? 325,
            defaultWidth: this._authOptions?.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url
        });
    }
    /**
     * Check the authentication status.
     * @param url The url to open to check.
     * @returns True if authenticated.
     */
    async checkAuth(url) {
        const windowToCheck = await fin.Window.create({
            name: "example-auth-check-window",
            alwaysOnTop: true,
            maximizable: false,
            minimizable: false,
            autoShow: false,
            defaultHeight: this._authOptions?.loginHeight ?? 325,
            defaultWidth: this._authOptions?.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url
        });
        let isAuthenticated = false;
        try {
            const info = await windowToCheck.getInfo();
            if (info.url === this._authOptions?.authenticatedUrl) {
                isAuthenticated = true;
            }
        }
        catch (error) {
            this._logger?.error("Error encountered while checking session", error);
        }
        finally {
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowToCheck)) {
                await windowToCheck.close(true);
            }
        }
        return isAuthenticated;
    }
}


/***/ }),

/***/ "./client/src/modules/auth/example/endpoint.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/auth/example/endpoint.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleAuthEndpoint: () => (/* binding */ ExampleAuthEndpoint)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");


/**
 * Example authentication endpoint.
 */
class ExampleAuthEndpoint {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("ExampleAuthEndpoint");
        this._logger.info("Was passed the following options", definition.data);
        this._roleMapping = definition?.data?.roleMapping;
        this._definition = definition;
    }
    /**
     * Handle a request response on an endpoint.
     * @param endpointDefinition The definition of the endpoint.
     * @param request The request to process.
     * @returns The response to the request, or null of not handled.
     */
    async requestResponse(endpointDefinition, request) {
        if (endpointDefinition.type !== "module") {
            this._logger?.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return null;
        }
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._logger)) {
            this._logger.info("This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION.");
        }
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options) || (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointDefinition.options.url)) {
            this._logger?.warn(`The endpoint definition for ${endpointDefinition.id} does not have a url defined. Unable to action request/response.`);
            return null;
        }
        const { url, ...options } = endpointDefinition.options;
        const req = this.getRequestOptions(url, options, request);
        if (req.options.method !== "GET" && req.options.method !== "POST") {
            this._logger?.warn(`${endpointDefinition.id} specifies a type: ${endpointDefinition.type} with a method ${req.options.method} that is not supported.`);
            return null;
        }
        const response = await fetch(req.url, req.options);
        if (response.ok) {
            const json = await response.json();
            if (Array.isArray(json)) {
                // returned apps
                return this.applyCurrentUserToApps(json);
            }
            else if (Array.isArray(json.applications)) {
                return {
                    applications: this.applyCurrentUserToApps(json.applications)
                };
            }
            // settings
            return this.applyCurrentUserToSettings(json);
        }
        return null;
    }
    /**
     * Convert the options to request data.
     * @param url The url.
     * @param options The options.
     * @param request The request object to convert.
     * @returns The converted options.
     */
    getRequestOptions(url, options, request) {
        if (options.method === "GET") {
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
                const keys = Object.keys(request);
                if (keys.length > 0) {
                    const length = keys.length;
                    for (let i = 0; i < length; i++) {
                        url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
                    }
                }
            }
        }
        else if (options.method === "POST" && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
            options.body = JSON.stringify(request);
        }
        return { url, options };
    }
    /**
     * Apply the current user settings to the applications.
     * @param apps The list of apps.
     * @returns The list of apps filtered for use by the user.
     */
    applyCurrentUserToApps(apps) {
        const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)();
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(currentUser) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role]) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role].excludeAppsWithTag)) {
            return apps;
        }
        const excludeTag = this._roleMapping[currentUser.role].excludeAppsWithTag;
        const applications = [];
        if (Array.isArray(apps)) {
            for (const app of apps) {
                const lookup = app.tags ?? app.categories;
                if (Array.isArray(lookup)) {
                    if (this.includeInResponse(lookup, excludeTag)) {
                        applications.push(app);
                    }
                }
                else {
                    applications.push(app);
                }
            }
        }
        return applications;
    }
    /**
     * Compare the tags with the exclude list to see if they should be used.
     * @param tags The tags to check.
     * @param excludeTags The exclude list to check against.
     * @returns True if the item should be included.
     */
    includeInResponse(tags, excludeTags) {
        let include = true;
        if (!Array.isArray(excludeTags)) {
            return true;
        }
        for (const tag of tags) {
            const currentTag = tag;
            if (excludeTags.includes(currentTag)) {
                include = false;
                break;
            }
        }
        return include;
    }
    /**
     * Apply the user settings to the custom settings.
     * @param settings The settings to filter.
     * @returns The filtered settings.
     */
    applyCurrentUserToSettings(settings) {
        const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)();
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(currentUser) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role]) ||
            (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._definition)) {
            return settings;
        }
        const modules = settings?.endpointProvider?.modules;
        if (Array.isArray(modules)) {
            modules.push({
                data: this._definition,
                enabled: this._definition.enabled,
                id: this._definition.id,
                description: this._definition.description,
                icon: this._definition.icon,
                info: this._definition.info,
                title: this._definition.title,
                url: this._definition.url
            });
            const appEndpointProviders = settings?.endpointProvider?.endpoints;
            const appEndpointIds = settings?.appProvider?.endpointIds;
            if (Array.isArray(appEndpointProviders) && Array.isArray(appEndpointIds)) {
                let count = 0;
                const updateEndpoints = [];
                for (const endpoint of appEndpointIds) {
                    if (typeof endpoint === "string") {
                        if (endpoint.startsWith("http")) {
                            updateEndpoints.push({ position: count, url: endpoint });
                        }
                        else {
                            const endpointToUpdate = appEndpointProviders.find((endpointEntry) => endpointEntry.id === endpoint && endpointEntry.type === "fetch");
                            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointToUpdate)) {
                                endpointToUpdate.type = "module";
                                // this if condition check is here to make typescript happy with the endpoint so that typeId can be set
                                if (endpointToUpdate.type === "module") {
                                    endpointToUpdate.typeId = this._definition.id;
                                }
                            }
                        }
                    }
                    count++;
                }
                if (updateEndpoints.length > 0) {
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings.endpointProvider)) {
                        settings.endpointProvider = {
                            endpoints: []
                        };
                    }
                    for (const newEndpointEntry of updateEndpoints) {
                        const endpointId = `auth-example-endpoint-${newEndpointEntry.position}`;
                        appEndpointIds[newEndpointEntry.position] = endpointId;
                        appEndpointProviders.push({
                            id: endpointId,
                            type: "module",
                            typeId: this._definition.id,
                            options: {
                                method: "GET",
                                url: newEndpointEntry.url
                            }
                        });
                    }
                }
            }
        }
        const themeProvider = settings.themeProvider;
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(themeProvider) &&
            Array.isArray(themeProvider.themes) &&
            themeProvider.themes.length > 0 &&
            !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role].preferredScheme)) {
            themeProvider.themes[0].default =
                this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
            const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
            this._logger?.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart.");
            localStorage.removeItem(storedSchemePreference);
        }
        const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
        const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;
        const browserProviders = settings.browserProvider;
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(browserProviders) && Array.isArray(excludeMenuActionIds)) {
            if (Array.isArray(browserProviders.globalMenu) && browserProviders.globalMenu.length > 0) {
                for (const globalMenuEntry of browserProviders.globalMenu) {
                    const globalMenuActionId = globalMenuEntry?.data?.action?.id;
                    if (globalMenuActionId && excludeMenuActionIds.includes(globalMenuActionId)) {
                        globalMenuEntry.include = false;
                    }
                }
            }
            if (Array.isArray(browserProviders.pageMenu) && browserProviders.pageMenu.length > 0) {
                for (const pageMenuEntry of browserProviders.pageMenu) {
                    const pageMenuActionId = pageMenuEntry?.data?.action?.id;
                    if (pageMenuActionId && excludeMenuActionIds.includes(pageMenuActionId)) {
                        pageMenuEntry.include = false;
                    }
                }
            }
            if (Array.isArray(browserProviders.viewMenu) && browserProviders.viewMenu.length > 0) {
                for (const viewMenuEntry of browserProviders.viewMenu) {
                    const viewMenuActionId = viewMenuEntry?.data?.action?.id;
                    if (viewMenuActionId && excludeMenuActionIds.includes(viewMenuActionId)) {
                        viewMenuEntry.include = false;
                    }
                }
            }
        }
        const menusProvider = settings.menusProvider;
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(menusProvider) &&
            Array.isArray(excludeMenuModuleIds) &&
            Array.isArray(menusProvider.modules)) {
            for (const menuModule of menusProvider.modules) {
                const menuModuleId = menuModule.id;
                if (excludeMenuModuleIds.includes(menuModuleId)) {
                    menuModule.enabled = false;
                }
            }
        }
        return settings;
    }
}


/***/ }),

/***/ "./client/src/modules/auth/example/util.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/auth/example/util.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXAMPLE_AUTH_CURRENT_USER_KEY: () => (/* binding */ EXAMPLE_AUTH_CURRENT_USER_KEY),
/* harmony export */   clearCurrentUser: () => (/* binding */ clearCurrentUser),
/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),
/* harmony export */   setCurrentUser: () => (/* binding */ setCurrentUser)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;
/**
 * Get the current user from storage.
 * @returns The current user.
 */
function getCurrentUser() {
    const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(storedUser)) {
        return;
    }
    return JSON.parse(storedUser);
}
/**
 * Set the current user in storage.
 * @param user The user to store.
 */
function setCurrentUser(user) {
    localStorage.setItem(EXAMPLE_AUTH_CURRENT_USER_KEY, JSON.stringify(user));
}
/**
 * Remove the current user from storage.
 */
function clearCurrentUser() {
    localStorage.removeItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
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
/*!**************************************************!*\
  !*** ./client/src/modules/auth/example/index.ts ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./client/src/modules/auth/example/auth.ts");
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/auth/example/endpoint.ts");


const entryPoints = {
    auth: new _auth__WEBPACK_IMPORTED_MODULE_0__.ExampleAuthProvider(),
    endpoint: new _endpoint__WEBPACK_IMPORTED_MODULE_1__.ExampleAuthEndpoint()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7QUFFRDs7R0FFRztBQUNJLFNBQVMsZ0JBQWdCO0lBQy9CLFlBQVksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN4RCxDQUFDOzs7Ozs7O1NDOUJEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBQ0k7QUFFMUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLElBQUksRUFBRSxJQUFJLHNEQUFtQixFQUFFO0lBQy9CLFFBQVEsRUFBRSxJQUFJLDBEQUFtQixFQUFFO0NBQ25DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2F1dGgudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSBnbG9iYWxUaGlzLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhFdmVudFR5cGVzLCBBdXRoUHJvdmlkZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2F1dGgtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBmb3JtYXRFcnJvciwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZU9wdGlvbnMsIEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgY2xlYXJDdXJyZW50VXNlciwgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogRXhhbXBsZSBhdXRoZW50aWNhdGlvbiBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoUHJvdmlkZXIgaW1wbGVtZW50cyBBdXRoUHJvdmlkZXI8RXhhbXBsZU9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBvcHRpb25zIGZvciB0aGUgcHJvdmlkZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfYXV0aE9wdGlvbnM/OiBFeGFtcGxlT3B0aW9ucztcblxuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBNYXAgYSBzdWJzY3JpcHRpb24gaWQgdG8gYW4gZXZlbnQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfc3Vic2NyaWJlSWRNYXA6IHsgW2tleTogc3RyaW5nXTogQXV0aEV2ZW50VHlwZXMgfTtcblxuXHQvKipcblx0ICogQ2FsbGJhY2tzIGZvciBldmVudCBzdWJzY3JpYmVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9ldmVudFN1YnNjcmliZXJzOiB7IFtldmVudCBpbiBBdXRoRXZlbnRUeXBlc10/OiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9IH07XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgZm9yIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZEtleT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgdXNlci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9jdXJyZW50VXNlcj86IEV4YW1wbGVVc2VyO1xuXG5cdC8qKlxuXHQgKiBBcmUgd2UgYXV0aGVudGljYXRlZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9hdXRoZW50aWNhdGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZXhwaXJ5IGNoZWNrIHRpbWVyLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3Nlc3Npb25FeHBpcnlDaGVja0lkPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fZXZlbnRTdWJzY3JpYmVycyA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXV0aEV4YW1wbGVcIik7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZEtleSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1FWEFNUExFX0FVVEhfSVNfQVVUSEVOVElDQVRFRGA7XG5cblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoT3B0aW9ucykpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTZXR0aW5nIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZGVmaW5pdGlvbi5kYXRhLCBudWxsLCA0KX1gKTtcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSkpO1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0dGhpcy5fY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihcIk9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnNjcmliZSB0byBvbmUgb2YgdGhlIGF1dGggZXZlbnRzLlxuXHQgKiBAcGFyYW0gdG8gVGhlIGV2ZW50IHRvIHN1YnNjcmliZSB0by5cblx0ICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblx0ICogQHJldHVybnMgU3Vic2NyaXB0aW9uIGlkIGZvciB1bnN1YnNjcmliaW5nIG9yIHVuZGVmaW5lZCBpZiBldmVudCB0eXBlIGlzIG5vdCBhdmFpbGFibGUuXG5cdCAqL1xuXHRwdWJsaWMgc3Vic2NyaWJlKHRvOiBBdXRoRXZlbnRUeXBlcywgY2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHN1YnNjcmlwdGlvbklkID0gcmFuZG9tVVVJRCgpO1xuXG5cdFx0Y29uc3QgdG9NYXAgPSB0aGlzLl9ldmVudFN1YnNjcmliZXJzW3RvXSA/PyB7fTtcblx0XHR0b01hcFtzdWJzY3JpcHRpb25JZF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9ldmVudFN1YnNjcmliZXJzW3RvXSA9IHRvTWFwO1xuXG5cdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdID0gdG87XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTdWJzY3JpcHRpb24gdG8gJHt0b30gZXZlbnRzIHJlZ2lzdGVyZWQuIFN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH1gKTtcblxuXHRcdHJldHVybiBzdWJzY3JpcHRpb25JZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVbnN1YnNjcmliZSBmcm9tIGFuIGFscmVhZHkgc3Vic2NyaWJlZCBldmVudC5cblx0ICogQHBhcmFtIHN1YnNjcmlwdGlvbklkIFRoZSBpZCBvZiB0aGUgc3Vic2NyaXB0aW9uIHJldHVybmVkIGZyb20gc3Vic2NyaWJlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB1bnN1YnNjcmliZSB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyB1bnN1YnNjcmliZShzdWJzY3JpcHRpb25JZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgZXZlbnRUeXBlID0gdGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdGlmIChpc0VtcHR5KGV2ZW50VHlwZSkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke3N1YnNjcmlwdGlvbklkfSB0aGF0IGlzIGludmFsaWRgKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCBldmVudFN1YnNjcmliZXJzID0gdGhpcy5fZXZlbnRTdWJzY3JpYmVyc1tldmVudFR5cGVdO1xuXHRcdGlmICghaXNFbXB0eShldmVudFN1YnNjcmliZXJzKSkge1xuXHRcdFx0ZGVsZXRlIGV2ZW50U3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF0pIHtcblx0XHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF07XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH0gaGFzIGJlZW4gY2xlYXJlZGBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaXB0aW9uSWR9IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEb2VzIHRoZSBhdXRoIHByb3ZpZGVyIHJlcXVpcmUgYXV0aGVudGljYXRpb24uXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGlvblJlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpKSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiAhdGhpcy5fYXV0aGVudGljYXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBsb2dpbiBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ2luIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGxvZ2luKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImxvZ2luIHJlcXVlc3RlZFwiKTtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVXNlciBhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zPy5hdXRvTG9naW4pIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImF1dG9Mb2dpbiBlbmFibGVkIGluIGF1dGggcHJvdmlkZSBtb2R1bGUgc2V0dGluZ3MuIEZha2UgbG9nZ2VkIGluXCIpO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSwgdGhpcy5fYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLWluXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9nb3V0IG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9nb3V0IHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVMb2dvdXQocmVzb2x2ZSlcblx0XHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5mb3JtYXRpb24gZnJvbSB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVGhlIHVzZXIgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTx1bmtub3duPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihcIlVuYWJsZSB0byByZXRyaWV2ZSB1c2VyIGluZm8gdW5sZXNzIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlRoaXMgZXhhbXBsZSByZXR1cm5zIGEgdXNlciBpZiBpdCB3YXMgcHJvdmlkZWQgdG8gdGhlIGV4YW1wbGUgbG9naW5cIik7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudFVzZXI7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiBmcm9tIHRoZSB1c2VyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLm9wZW5Mb2dpbldpbmRvdyh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybClcblx0XHRcdFx0XHQudGhlbihhc3luYyAob3BlbmVkV2luKSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgd2luOiBPcGVuRmluLldpbmRvdyB8IHVuZGVmaW5lZCA9IG9wZW5lZFdpbjtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7Zm9ybWF0RXJyb3IoZXJyb3IpfWBcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQXV0aCBXaW5kb3cgY2FuY2VsbGVkIGJ5IHVzZXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoXG5cdFx0XHRcdFx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gYXV0aGVudGljYXRlIHRoZSB1c2VyXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB0byBzZWUgaWYgYSBzZXNzaW9uIGhhcyBleHBpcmVkLlxuXHQgKi9cblx0cHJpdmF0ZSBjaGVja0ZvclNlc3Npb25FeHBpcnkoKTogdm9pZCB7XG5cdFx0Y29uc3QgdmFsaWRpdHkgPSB0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHM7XG5cdFx0aWYgKGlzTnVtYmVyKHZhbGlkaXR5KSAmJiB2YWxpZGl0eSA+IC0xICYmIGlzRW1wdHkodGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQpKSB7XG5cdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5jaGVja0F1dGgodGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcInNlc3Npb24tZXhwaXJlZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sIHZhbGlkaXR5ICogMTAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmeSBzdWJzY3JpYmVycyBvZiBhbiBldmVudCBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBhdXRoRXZlbnRUeXBlIFRoZSB0eXBlIG9mIGF1dGhlbnRpY2F0aW9uIGV2ZW50IHRvIHNlbmQgdG8uXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG5vdGlmeVN1YnNjcmliZXJzKGF1dGhFdmVudFR5cGU6IEF1dGhFdmVudFR5cGVzKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9ldmVudFN1YnNjcmliZXJzW2F1dGhFdmVudFR5cGVdO1xuXG5cdFx0aWYgKHN1YnNjcmliZXJzKSB7XG5cdFx0XHRjb25zdCBzdWJzY3JpYmVySWRzID0gT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpO1xuXHRcdFx0c3Vic2NyaWJlcklkcy5yZXZlcnNlKCk7XG5cblx0XHRcdGZvciAoY29uc3Qgc3Vic2NyaWJlcklkIG9mIHN1YnNjcmliZXJJZHMpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7YXV0aEV2ZW50VHlwZX1gXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGF3YWl0IHN1YnNjcmliZXJzW3N1YnNjcmliZXJJZF0oKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGxvZ291dC5cblx0ICogQHBhcmFtIHJlc29sdmUgVGhlIHJlc29sdmUgbWV0aG9kIHRvIGNhbGwgYWZ0ZXIgbG9nb3V0LlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIllvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpblwiKTtcblx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJMb2cgb3V0IHJlcXVlc3RlZFwiKTtcblx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIik7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHR9XG5cdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdGNvbnN0IGxvZ291dFVybCA9IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dvdXRVcmw7XG5cdFx0aWYgKGlzU3RyaW5nVmFsdWUobG9nb3V0VXJsKSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgdGhpcy5vcGVuTG9nb3V0V2luZG93KGxvZ291dFVybCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIpO1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIik7XG5cdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBsb2dpbiB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIGZvciB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcmV0dXJucyBUaGUgd2luZG93IHRoYXQgd2FzIGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7XG5cdFx0XHRjdXJyZW50VXNlcktleTogRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksXG5cdFx0XHQuLi50aGlzLl9hdXRoT3B0aW9ucz8uY3VzdG9tRGF0YVxuXHRcdH07XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsLFxuXHRcdFx0Y3VzdG9tRGF0YTogZW5yaWNoZWRDdXN0b21EYXRhXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIGZvciB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXR1cy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIG9wZW4gdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgY2hlY2tBdXRoKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWNoZWNrLXdpbmRvd1wiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdFx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0XHRpZiAoaW5mby51cmwgPT09IHRoaXMuX2F1dGhPcHRpb25zPy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uXCIsIGVycm9yKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHdpbmRvd1RvQ2hlY2spKSB7XG5cdFx0XHRcdGF3YWl0IHdpbmRvd1RvQ2hlY2suY2xvc2UodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpc0F1dGhlbnRpY2F0ZWQ7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHtcblx0RW5kcG9pbnQsXG5cdEVuZHBvaW50RGVmaW5pdGlvbixcblx0RmV0Y2hPcHRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9zZXR0aW5nLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllcywgRXhhbXBsZUVuZHBvaW50T3B0aW9ucywgRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogRXhhbXBsZSBhdXRoZW50aWNhdGlvbiBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoRW5kcG9pbnQgaW1wbGVtZW50cyBFbmRwb2ludDxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPiB7XG5cdHByaXZhdGUgX2RlZmluaXRpb24/OiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+O1xuXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9yb2xlTWFwcGluZz86IHsgW2tleTogc3RyaW5nXTogRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVycz86IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkV4YW1wbGVBdXRoRW5kcG9pbnRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xuXHRcdHRoaXMuX3JvbGVNYXBwaW5nID0gZGVmaW5pdGlvbj8uZGF0YT8ucm9sZU1hcHBpbmc7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIFRoZSByZXNwb25zZSB0byB0aGUgcmVxdWVzdCwgb3IgbnVsbCBvZiBub3QgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZXF1ZXN0UmVzcG9uc2UoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248RmV0Y2hPcHRpb25zPixcblx0XHRyZXF1ZXN0PzogdW5rbm93blxuXHQpOiBQcm9taXNlPFxuXHRcdEN1c3RvbVNldHRpbmdzIHwgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB8IHsgYXBwbGljYXRpb25zOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIH0gfCBudWxsXG5cdD4ge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9sb2dnZXIpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XCJUaGlzIGF1dGggZW5kcG9pbnQgbW9kdWxlIGlzIGFuIGV4YW1wbGUgdGhhdCB0aGF0IHNpbXVsYXRlcyByZXF1ZXN0aW5nIGEgaHR0cCBlbmRwb2ludCBhbmQgbWFuaXB1bGF0aW5nIGl0IGJhc2VkIG9uIHRoZSBjdXJyZW50IGV4YW1wbGUgdXNlciBhcyBpZiBpdCB3YXMgdGhlIHNlcnZlciBkb2luZyB0aGUgbWFuaXB1bGF0aW9uLiBETyBOT1QgVVNFIFRISVMgTU9EVUxFIElOIFBST0RVQ1RJT04uXCJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMpIHx8IGlzRW1wdHkoZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnMudXJsKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgVGhlIGVuZHBvaW50IGRlZmluaXRpb24gZm9yICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBkb2VzIG5vdCBoYXZlIGEgdXJsIGRlZmluZWQuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZS5gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHsgdXJsLCAuLi5vcHRpb25zIH06IEZldGNoT3B0aW9ucyA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXG5cdFx0Y29uc3QgcmVxID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyh1cmwgYXMgc3RyaW5nLCBvcHRpb25zLCByZXF1ZXN0IGFzIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSk7XG5cdFx0aWYgKHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXEub3B0aW9ucy5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gc3BlY2lmaWVzIGEgdHlwZTogJHtlbmRwb2ludERlZmluaXRpb24udHlwZX0gd2l0aCBhIG1ldGhvZCAke3JlcS5vcHRpb25zLm1ldGhvZH0gdGhhdCBpcyBub3Qgc3VwcG9ydGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcS51cmwsIHJlcS5vcHRpb25zIGFzIFJlcXVlc3RJbml0KTtcblxuXHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0Y29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcblx0XHRcdFx0Ly8gcmV0dXJuZWQgYXBwc1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24gYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoanNvbi5hcHBsaWNhdGlvbnMpKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zOiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbi5hcHBsaWNhdGlvbnMgYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vIHNldHRpbmdzXG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhqc29uIGFzIEN1c3RvbVNldHRpbmdzKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCB0aGUgb3B0aW9ucyB0byByZXF1ZXN0IGRhdGEuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybC5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IG9iamVjdCB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIG9wdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKFxuXHRcdHVybDogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IEZldGNoT3B0aW9ucyxcblx0XHRyZXF1ZXN0OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH1cblx0KTogeyB1cmw6IHN0cmluZzsgb3B0aW9uczogRmV0Y2hPcHRpb25zIH0ge1xuXHRcdGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXF1ZXN0KTtcblx0XHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKGBbJHtrZXlzW2ldfV1gLCBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdFtrZXlzW2ldXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGUgY3VycmVudCB1c2VyIHNldHRpbmdzIHRvIHRoZSBhcHBsaWNhdGlvbnMuXG5cdCAqIEBwYXJhbSBhcHBzIFRoZSBsaXN0IG9mIGFwcHMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGFwcHMgZmlsdGVyZWQgZm9yIHVzZSBieSB0aGUgdXNlci5cblx0ICovXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKTogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoY3VycmVudFVzZXIpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSkgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGFwcHM7XG5cdFx0fVxuXHRcdGNvbnN0IGV4Y2x1ZGVUYWcgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cblx0XHRjb25zdCBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSkge1xuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBsb29rdXA6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gYXBwLnRhZ3MgPz8gYXBwLmNhdGVnb3JpZXM7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGxvb2t1cCkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5pbmNsdWRlSW5SZXNwb25zZShsb29rdXAsIGV4Y2x1ZGVUYWcpKSB7XG5cdFx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBsaWNhdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZSB0aGUgdGFncyB3aXRoIHRoZSBleGNsdWRlIGxpc3QgdG8gc2VlIGlmIHRoZXkgc2hvdWxkIGJlIHVzZWQuXG5cdCAqIEBwYXJhbSB0YWdzIFRoZSB0YWdzIHRvIGNoZWNrLlxuXHQgKiBAcGFyYW0gZXhjbHVkZVRhZ3MgVGhlIGV4Y2x1ZGUgbGlzdCB0byBjaGVjayBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHNob3VsZCBiZSBpbmNsdWRlZC5cblx0ICovXG5cdHByaXZhdGUgaW5jbHVkZUluUmVzcG9uc2UodGFnczogc3RyaW5nW10sIGV4Y2x1ZGVUYWdzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuXHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXhjbHVkZVRhZ3MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuXHRcdFx0Y29uc3QgY3VycmVudFRhZzogc3RyaW5nID0gdGFnO1xuXHRcdFx0aWYgKGV4Y2x1ZGVUYWdzLmluY2x1ZGVzKGN1cnJlbnRUYWcpKSB7XG5cdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpbmNsdWRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBjdXN0b20gc2V0dGluZ3MuXG5cdCAqIEBwYXJhbSBzZXR0aW5ncyBUaGUgc2V0dGluZ3MgdG8gZmlsdGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgZmlsdGVyZWQgc2V0dGluZ3MuXG5cdCAqL1xuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncyk6IEN1c3RvbVNldHRpbmdzIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShjdXJyZW50VXNlcikgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmcpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9kZWZpbml0aW9uKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHNldHRpbmdzO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1vZHVsZXMgPSBzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8ubW9kdWxlcztcblx0XHRpZiAoQXJyYXkuaXNBcnJheShtb2R1bGVzKSkge1xuXHRcdFx0bW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0ZGF0YTogdGhpcy5fZGVmaW5pdGlvbixcblx0XHRcdFx0ZW5hYmxlZDogdGhpcy5fZGVmaW5pdGlvbi5lbmFibGVkLFxuXHRcdFx0XHRpZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuX2RlZmluaXRpb24uZGVzY3JpcHRpb24sXG5cdFx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24uaWNvbixcblx0XHRcdFx0aW5mbzogdGhpcy5fZGVmaW5pdGlvbi5pbmZvLFxuXHRcdFx0XHR0aXRsZTogdGhpcy5fZGVmaW5pdGlvbi50aXRsZSxcblx0XHRcdFx0dXJsOiB0aGlzLl9kZWZpbml0aW9uLnVybFxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludFByb3ZpZGVycyA9IHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5lbmRwb2ludHM7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludElkcyA9IHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHM7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludFByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludElkcykpIHtcblx0XHRcdFx0bGV0IGNvdW50ID0gMDtcblx0XHRcdFx0Y29uc3QgdXBkYXRlRW5kcG9pbnRzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgZW5kcG9pbnQgb2YgYXBwRW5kcG9pbnRJZHMpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGVuZHBvaW50ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnQuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRcdFx0XHRcdFx0dXBkYXRlRW5kcG9pbnRzLnB1c2goeyBwb3NpdGlvbjogY291bnQsIHVybDogZW5kcG9pbnQgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludFRvVXBkYXRlID0gYXBwRW5kcG9pbnRQcm92aWRlcnMuZmluZChcblx0XHRcdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gZW5kcG9pbnQgJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50VG9VcGRhdGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlID0gXCJtb2R1bGVcIjtcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzIGlmIGNvbmRpdGlvbiBjaGVjayBpcyBoZXJlIHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweSB3aXRoIHRoZSBlbmRwb2ludCBzbyB0aGF0IHR5cGVJZCBjYW4gYmUgc2V0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUudHlwZSA9PT0gXCJtb2R1bGVcIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlSWQgPSB0aGlzLl9kZWZpbml0aW9uLmlkO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHVwZGF0ZUVuZHBvaW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0aWYgKGlzRW1wdHkoc2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlcikpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAoY29uc3QgbmV3RW5kcG9pbnRFbnRyeSBvZiB1cGRhdGVFbmRwb2ludHMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50SWQgPSBgYXV0aC1leGFtcGxlLWVuZHBvaW50LSR7bmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbn1gO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRJZHNbbmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbl0gPSBlbmRwb2ludElkO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRQcm92aWRlcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBlbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBuZXdFbmRwb2ludEVudHJ5LnVybFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCB0aGVtZVByb3ZpZGVyID0gc2V0dGluZ3MudGhlbWVQcm92aWRlcjtcblxuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoZW1lUHJvdmlkZXIpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoZW1lUHJvdmlkZXIudGhlbWVzKSAmJlxuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXMubGVuZ3RoID4gMCAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lKVxuXHRcdCkge1xuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcblx0XHRcdGNvbnN0IHN0b3JlZFNjaGVtZVByZWZlcmVuY2UgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tU2VsZWN0ZWRDb2xvclNjaGVtZWA7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFwiVGhpcyBpcyBhIGRlbW8gbW9kdWxlIHdoZXJlIHdlIGFyZSBjbGVhcmluZyB0aGUgbG9jYWxseSBzdG9yZWQgc2NoZW1lIHByZWZlcmVuY2UgaW4gb3JkZXIgdG8gc2hvdyBkaWZmZXJlbnQgc2NoZW1lJ3MgbGlnaHQvZGFyayBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gVGhpcyBtZWFucyB0aGF0IGl0IHdpbGwgYWx3YXlzIGJlIHNldCB0byB3aGF0IGlzIGluIHRoZSByb2xlIG1hcHBpbmcgaW5pdGlhbGx5IGFuZCBub3Qgd2hhdCBpdCBpcyBzZXQgdG8gbG9jYWxseSBvbiByZXN0YXJ0LlwiXG5cdFx0XHQpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXhjbHVkZU1lbnVBY3Rpb25JZHMgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlTWVudUFjdGlvbjtcblx0XHRjb25zdCBleGNsdWRlTWVudU1vZHVsZUlkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51TW9kdWxlO1xuXG5cdFx0Y29uc3QgYnJvd3NlclByb3ZpZGVycyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlcjtcblx0XHRpZiAoIWlzRW1wdHkoYnJvd3NlclByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShleGNsdWRlTWVudUFjdGlvbklkcykpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBnbG9iYWxNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgZ2xvYmFsTWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnbG9iYWxNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKGdsb2JhbE1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhnbG9iYWxNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRnbG9iYWxNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgcGFnZU1lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gcGFnZU1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAocGFnZU1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhwYWdlTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0cGFnZU1lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2aWV3TWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB2aWV3TWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmICh2aWV3TWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKHZpZXdNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHR2aWV3TWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBtZW51c1Byb3ZpZGVyID0gc2V0dGluZ3MubWVudXNQcm92aWRlcjtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eShtZW51c1Byb3ZpZGVyKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShleGNsdWRlTWVudU1vZHVsZUlkcykgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkobWVudXNQcm92aWRlci5tb2R1bGVzKVxuXHRcdCkge1xuXHRcdFx0Zm9yIChjb25zdCBtZW51TW9kdWxlIG9mIG1lbnVzUHJvdmlkZXIubW9kdWxlcykge1xuXHRcdFx0XHRjb25zdCBtZW51TW9kdWxlSWQ6IHN0cmluZyA9IG1lbnVNb2R1bGUuaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudU1vZHVsZUlkcy5pbmNsdWRlcyhtZW51TW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bWVudU1vZHVsZS5lbmFibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cbn1cbiIsImltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJgO1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gc3RvcmFnZS5cbiAqIEByZXR1cm5zIFRoZSBjdXJyZW50IHVzZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcigpOiBFeGFtcGxlVXNlciB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG5cdGlmIChpc0VtcHR5KHN0b3JlZFVzZXIpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHJldHVybiBKU09OLnBhcnNlKHN0b3JlZFVzZXIpIGFzIEV4YW1wbGVVc2VyO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY3VycmVudCB1c2VyIGluIHN0b3JhZ2UuXG4gKiBAcGFyYW0gdXNlciBUaGUgdXNlciB0byBzdG9yZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXI6IEV4YW1wbGVVc2VyKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDdXJyZW50VXNlcigpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhQcm92aWRlciB9IGZyb20gXCIuL2F1dGhcIjtcbmltcG9ydCB7IEV4YW1wbGVBdXRoRW5kcG9pbnQgfSBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YXV0aDogbmV3IEV4YW1wbGVBdXRoUHJvdmlkZXIoKSxcblx0ZW5kcG9pbnQ6IG5ldyBFeGFtcGxlQXV0aEVuZHBvaW50KClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=