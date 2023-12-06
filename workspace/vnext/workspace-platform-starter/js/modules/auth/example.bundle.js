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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSSxTQUFTLGdCQUFnQjtJQUMvQixZQUFZLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsQ0FBQzs7Ozs7OztTQzlCRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUNJO0FBRTFDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxJQUFJLEVBQUUsSUFBSSxzREFBbUIsRUFBRTtJQUMvQixRQUFRLEVBQUUsSUFBSSwwREFBbUIsRUFBRTtDQUNuQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS91dGlsLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIgd2l0aCBhIHJlYWwgdmFsdWUgaS5lLiBub3QgTmFOIG9yIEluZmluaXRlLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlclZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzU3RyaW5nVmFsdWUoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudFxuXHRcdFx0LnJlcGxhY2UoLzxbXj5dKj4/L2dtLCBcIlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG5cdFx0XHQucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcblx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcblx0XHRcdC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG5cdFx0XHQucmVwbGFjZSgvXFxuXFxzKlxcbi9nLCBcIlxcblwiKTtcblx0fVxuXHRyZXR1cm4gXCJcIjtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgQXV0aEV2ZW50VHlwZXMsIEF1dGhQcm92aWRlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXV0aC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGZvcm1hdEVycm9yLCBpc0VtcHR5LCBpc051bWJlciwgaXNTdHJpbmdWYWx1ZSwgcmFuZG9tVVVJRCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlT3B0aW9ucywgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBjbGVhckN1cnJlbnRVc2VyLCBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhQcm92aWRlciBpbXBsZW1lbnRzIEF1dGhQcm92aWRlcjxFeGFtcGxlT3B0aW9ucz4ge1xuXHQvKipcblx0ICogVGhlIG9wdGlvbnMgZm9yIHRoZSBwcm92aWRlci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9hdXRoT3B0aW9ucz86IEV4YW1wbGVPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIE1hcCBhIHN1YnNjcmlwdGlvbiBpZCB0byBhbiBldmVudC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9zdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBBdXRoRXZlbnRUeXBlcyB9O1xuXG5cdC8qKlxuXHQgKiBDYWxsYmFja3MgZm9yIGV2ZW50IHN1YnNjcmliZXJzLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50U3Vic2NyaWJlcnM6IHsgW2V2ZW50IGluIEF1dGhFdmVudFR5cGVzXT86IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH0gfTtcblxuXHQvKipcblx0ICogVGhlIGtleSBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9hdXRoZW50aWNhdGVkS2V5Pzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCB1c2VyLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2N1cnJlbnRVc2VyPzogRXhhbXBsZVVzZXI7XG5cblx0LyoqXG5cdCAqIEFyZSB3ZSBhdXRoZW50aWNhdGVkLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgZm9yIHRoZSBleHBpcnkgY2hlY2sgdGltZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2Vzc2lvbkV4cGlyeUNoZWNrSWQ/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBFeGFtcGxlQXV0aFByb3ZpZGVyLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXAgPSB7fTtcblx0XHR0aGlzLl9ldmVudFN1YnNjcmliZXJzID0ge307XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBdXRoRXhhbXBsZVwiKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEYDtcblxuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhPcHRpb25zKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSk7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3Vic2NyaWJlIHRvIG9uZSBvZiB0aGUgYXV0aCBldmVudHMuXG5cdCAqIEBwYXJhbSB0byBUaGUgZXZlbnQgdG8gc3Vic2NyaWJlIHRvLlxuXHQgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXHQgKiBAcmV0dXJucyBTdWJzY3JpcHRpb24gaWQgZm9yIHVuc3Vic2NyaWJpbmcgb3IgdW5kZWZpbmVkIGlmIGV2ZW50IHR5cGUgaXMgbm90IGF2YWlsYWJsZS5cblx0ICovXG5cdHB1YmxpYyBzdWJzY3JpYmUodG86IEF1dGhFdmVudFR5cGVzLCBjYWxsYmFjazogKCkgPT4gUHJvbWlzZTx2b2lkPik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qgc3Vic2NyaXB0aW9uSWQgPSByYW5kb21VVUlEKCk7XG5cblx0XHRjb25zdCB0b01hcCA9IHRoaXMuX2V2ZW50U3Vic2NyaWJlcnNbdG9dID8/IHt9O1xuXHRcdHRvTWFwW3N1YnNjcmlwdGlvbklkXSA9IGNhbGxiYWNrO1xuXHRcdHRoaXMuX2V2ZW50U3Vic2NyaWJlcnNbdG9dID0gdG9NYXA7XG5cblx0XHR0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF0gPSB0bztcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfWApO1xuXG5cdFx0cmV0dXJuIHN1YnNjcmlwdGlvbklkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVuc3Vic2NyaWJlIGZyb20gYW4gYWxyZWFkeSBzdWJzY3JpYmVkIGV2ZW50LlxuXHQgKiBAcGFyYW0gc3Vic2NyaXB0aW9uSWQgVGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24gcmV0dXJuZWQgZnJvbSBzdWJzY3JpYmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVuc3Vic2NyaWJlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIHVuc3Vic2NyaWJlKHN1YnNjcmlwdGlvbklkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRjb25zdCBldmVudFR5cGUgPSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF07XG5cdFx0aWYgKGlzRW1wdHkoZXZlbnRUeXBlKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKGBZb3UgaGF2ZSB0cmllZCB0byB1bnN1YnNjcmliZSB3aXRoIGEga2V5ICR7c3Vic2NyaXB0aW9uSWR9IHRoYXQgaXMgaW52YWxpZGApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV2ZW50U3Vic2NyaWJlcnMgPSB0aGlzLl9ldmVudFN1YnNjcmliZXJzW2V2ZW50VHlwZV07XG5cdFx0aWYgKCFpc0VtcHR5KGV2ZW50U3Vic2NyaWJlcnMpKSB7XG5cdFx0XHRkZWxldGUgZXZlbnRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXSkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXTtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfSBoYXMgYmVlbiBjbGVhcmVkYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH0gY291bGQgbm90IGJlIGNsZWFyZWQgYXMgd2UgZG8gbm90IGhhdmUgYSByZWdpc3RlciBvZiB0aGF0IGV2ZW50IHR5cGUuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERvZXMgdGhlIGF1dGggcHJvdmlkZXIgcmVxdWlyZSBhdXRoZW50aWNhdGlvbi5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkpIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ2luIG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwibG9naW4gcmVxdWVzdGVkXCIpO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnM/LmF1dG9Mb2dpbikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW5cIik7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGF3YWl0IHRoaXMuZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5LCB0aGlzLl9hdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtaW5cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBsb2dvdXQgb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dvdXQgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTG9nIG91dCBjYWxsZWRcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChhc3luYyAoZXJyb3IpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9nIG91dCAke2Vycm9yfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgdXNlciBpbmZvcm1hdGlvbi5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVGhpcyBleGFtcGxlIHJldHVybnMgYSB1c2VyIGlmIGl0IHdhcyBwcm92aWRlZCB0byB0aGUgZXhhbXBsZSBsb2dpblwiKTtcblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50VXNlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGF1dGhlbnRpY2F0aW9uIGZyb20gdGhlIHVzZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMub3BlbkxvZ2luV2luZG93KHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luVXJsKVxuXHRcdFx0XHRcdC50aGVuKGFzeW5jIChvcGVuZWRXaW4pID0+IHtcblx0XHRcdFx0XHRcdGxldCB3aW46IE9wZW5GaW4uV2luZG93IHwgdW5kZWZpbmVkID0gb3BlbmVkV2luO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGF1dGhNYXRjaCA9IG5ldyBSZWdFeHAodGhpcy5fYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCwgXCJpXCIpO1xuXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgY2hlY2tpbmcgaWYgbG9naW4gd2luZG93IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZC4gRXJyb3IgJHtmb3JtYXRFcnJvcihlcnJvcil9YFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5hZGRMaXN0ZW5lcihcImNsb3NlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHdpbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJBdXRoIFdpbmRvdyBjYW5jZWxsZWQgYnkgdXNlclwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHdpbmRvdy5zZXRJbnRlcnZhbChcblx0XHRcdFx0XHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRvIHNlZSBpZiBhIHNlc3Npb24gaGFzIGV4cGlyZWQuXG5cdCAqL1xuXHRwcml2YXRlIGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpOiB2b2lkIHtcblx0XHRjb25zdCB2YWxpZGl0eSA9IHRoaXMuX2F1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcztcblx0XHRpZiAoaXNOdW1iZXIodmFsaWRpdHkpICYmIHZhbGlkaXR5ID4gLTEgJiYgaXNFbXB0eSh0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCkpIHtcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmNoZWNrQXV0aCh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybCk7XG5cdFx0XHRcdFx0aWYgKHN0aWxsQXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiU2Vzc2lvbiBTdGlsbCBBY3RpdmVcIik7XG5cdFx0XHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XHRcdFwiU2Vzc2lvbiBub3QgdmFsaWQuIEtpbGxpbmcgc2Vzc2lvbiBhbmQgbm90aWZ5aW5nIHJlZ2lzdGVyZWQgY2FsbGJhY2sgdGhhdCBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBjaGVjayBpcyBjb25maWd1cmVkIGluIHRoZSBkYXRhIGZvciB0aGlzIGV4YW1wbGUgYXV0aCBtb2R1bGUuIFNldCBjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyB0byAtMSBpbiB0aGUgYXV0aFByb3ZpZGVyIG1vZHVsZSBkZWZpbml0aW9uIGlmIHlvdSB3aXNoIHRvIGRpc2FibGUgdGhpcyBjaGVja1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSwgdmFsaWRpdHkgKiAxMDAwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTm90aWZ5IHN1YnNjcmliZXJzIG9mIGFuIGV2ZW50IGNoYW5nZS5cblx0ICogQHBhcmFtIGF1dGhFdmVudFR5cGUgVGhlIHR5cGUgb2YgYXV0aGVudGljYXRpb24gZXZlbnQgdG8gc2VuZCB0by5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbm90aWZ5U3Vic2NyaWJlcnMoYXV0aEV2ZW50VHlwZTogQXV0aEV2ZW50VHlwZXMpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBzdWJzY3JpYmVycyA9IHRoaXMuX2V2ZW50U3Vic2NyaWJlcnNbYXV0aEV2ZW50VHlwZV07XG5cblx0XHRpZiAoc3Vic2NyaWJlcnMpIHtcblx0XHRcdGNvbnN0IHN1YnNjcmliZXJJZHMgPSBPYmplY3Qua2V5cyhzdWJzY3JpYmVycyk7XG5cdFx0XHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRcdFx0Zm9yIChjb25zdCBzdWJzY3JpYmVySWQgb2Ygc3Vic2NyaWJlcklkcykge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0YE5vdGlmeWluZyBzdWJzY3JpYmVyIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmliZXJJZH0gb2YgZXZlbnQgdHlwZTogJHthdXRoRXZlbnRUeXBlfWBcblx0XHRcdFx0KTtcblx0XHRcdFx0YXdhaXQgc3Vic2NyaWJlcnNbc3Vic2NyaWJlcklkXSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbG9nb3V0LlxuXHQgKiBAcGFyYW0gcmVzb2x2ZSBUaGUgcmVzb2x2ZSBtZXRob2QgdG8gY2FsbCBhZnRlciBsb2dvdXQuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGhhbmRsZUxvZ291dChyZXNvbHZlOiAoc3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHx8ICF0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiWW91IGhhdmUgcmVxdWVzdGVkIHRvIGxvZyBvdXQgYnV0IGFyZSBub3QgbG9nZ2VkIGluXCIpO1xuXHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkxvZyBvdXQgcmVxdWVzdGVkXCIpO1xuXHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJiZWZvcmUtbG9nZ2VkLW91dFwiKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdH1cblx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0Y29uc3QgbG9nb3V0VXJsID0gdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ291dFVybDtcblx0XHRpZiAoaXNTdHJpbmdWYWx1ZShsb2dvdXRVcmwpKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCB3aW4gPSBhd2FpdCB0aGlzLm9wZW5Mb2dvdXRXaW5kb3cobG9nb3V0VXJsKTtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIik7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0fSwgMjAwMCk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiKTtcblx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gdGhlIGxvZ2luIHdpbmRvdy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIG9wZW4gZm9yIHRoZSBsb2dpbiB3aW5kb3cuXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgdGhhdCB3YXMgY3JlYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdGNvbnN0IGVucmljaGVkQ3VzdG9tRGF0YSA9IHtcblx0XHRcdGN1cnJlbnRVc2VyS2V5OiBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSxcblx0XHRcdC4uLnRoaXMuX2F1dGhPcHRpb25zPy5jdXN0b21EYXRhXG5cdFx0fTtcblx0XHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLWluXCIsXG5cdFx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0XHR1cmwsXG5cdFx0XHRjdXN0b21EYXRhOiBlbnJpY2hlZEN1c3RvbURhdGFcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBsb2dvdXQgd2luZG93LlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwgZm9yIHRoZSBsb2dvdXQgd2luZG93LlxuXHQgKiBAcmV0dXJucyBUaGUgd2luZG93IGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dvdXRXaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1vdXRcIixcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0XHR1cmxcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB0aGUgYXV0aGVudGljYXRpb24gc3RhdHVzLlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gb3BlbiB0byBjaGVjay5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCB3aW5kb3dUb0NoZWNrID0gYXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtY2hlY2std2luZG93XCIsXG5cdFx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0XHR1cmxcblx0XHR9KTtcblx0XHRsZXQgaXNBdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRcdGlmIChpbmZvLnVybCA9PT0gdGhpcy5fYXV0aE9wdGlvbnM/LmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdFx0aXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIkVycm9yIGVuY291bnRlcmVkIHdoaWxlIGNoZWNraW5nIHNlc3Npb25cIiwgZXJyb3IpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkod2luZG93VG9DaGVjaykpIHtcblx0XHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRFbmRwb2ludCxcblx0RW5kcG9pbnREZWZpbml0aW9uLFxuXHRGZXRjaE9wdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9lbmRwb2ludC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL3NldHRpbmctc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzLCBFeGFtcGxlRW5kcG9pbnRPcHRpb25zLCBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIGVuZHBvaW50LlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50PEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+IHtcblx0cHJpdmF0ZSBfZGVmaW5pdGlvbj86IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz47XG5cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX3JvbGVNYXBwaW5nPzogeyBba2V5OiBzdHJpbmddOiBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH07XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzPzogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRXhhbXBsZUF1dGhFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdFx0dGhpcy5fcm9sZU1hcHBpbmcgPSBkZWZpbml0aW9uPy5kYXRhPy5yb2xlTWFwcGluZztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxGZXRjaE9wdGlvbnM+LFxuXHRcdHJlcXVlc3Q/OiB1bmtub3duXG5cdCk6IFByb21pc2U8XG5cdFx0Q3VzdG9tU2V0dGluZ3MgfCBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIHwgeyBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gfSB8IG51bGxcblx0PiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2xvZ2dlcikpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcIlRoaXMgYXV0aCBlbmRwb2ludCBtb2R1bGUgaXMgYW4gZXhhbXBsZSB0aGF0IHRoYXQgc2ltdWxhdGVzIHJlcXVlc3RpbmcgYSBodHRwIGVuZHBvaW50IGFuZCBtYW5pcHVsYXRpbmcgaXQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZXhhbXBsZSB1c2VyIGFzIGlmIGl0IHdhcyB0aGUgc2VydmVyIGRvaW5nIHRoZSBtYW5pcHVsYXRpb24uIERPIE5PVCBVU0UgVEhJUyBNT0RVTEUgSU4gUFJPRFVDVElPTi5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoaXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucykgfHwgaXNFbXB0eShlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucy51cmwpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBUaGUgZW5kcG9pbnQgZGVmaW5pdGlvbiBmb3IgJHtlbmRwb2ludERlZmluaXRpb24uaWR9IGRvZXMgbm90IGhhdmUgYSB1cmwgZGVmaW5lZC4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgeyB1cmwsIC4uLm9wdGlvbnMgfTogRmV0Y2hPcHRpb25zID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cblx0XHRjb25zdCByZXEgPSB0aGlzLmdldFJlcXVlc3RPcHRpb25zKHVybCBhcyBzdHJpbmcsIG9wdGlvbnMsIHJlcXVlc3QgYXMgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9KTtcblx0XHRpZiAocmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiICYmIHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YCR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBzcGVjaWZpZXMgYSB0eXBlOiAke2VuZHBvaW50RGVmaW5pdGlvbi50eXBlfSB3aXRoIGEgbWV0aG9kICR7cmVxLm9wdGlvbnMubWV0aG9kfSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQuYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxLnVybCwgcmVxLm9wdGlvbnMgYXMgUmVxdWVzdEluaXQpO1xuXG5cdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuXHRcdFx0XHQvLyByZXR1cm5lZCBhcHBzXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbiBhcyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShqc29uLmFwcGxpY2F0aW9ucykpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnM6IHRoaXMuYXBwbHlDdXJyZW50VXNlclRvQXBwcyhqc29uLmFwcGxpY2F0aW9ucyBhcyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly8gc2V0dGluZ3Ncblx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKGpzb24gYXMgQ3VzdG9tU2V0dGluZ3MpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IHRoZSBvcHRpb25zIHRvIHJlcXVlc3QgZGF0YS5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucy5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0IHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgb3B0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgZ2V0UmVxdWVzdE9wdGlvbnMoXG5cdFx0dXJsOiBzdHJpbmcsXG5cdFx0b3B0aW9uczogRmV0Y2hPcHRpb25zLFxuXHRcdHJlcXVlc3Q6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfVxuXHQpOiB7IHVybDogc3RyaW5nOyBvcHRpb25zOiBGZXRjaE9wdGlvbnMgfSB7XG5cdFx0aWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0XHRpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoYFske2tleXNbaV19XWAsIGVuY29kZVVSSUNvbXBvbmVudChyZXF1ZXN0W2tleXNbaV1dKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7IHVybCwgb3B0aW9ucyB9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZSBjdXJyZW50IHVzZXIgc2V0dGluZ3MgdG8gdGhlIGFwcGxpY2F0aW9ucy5cblx0ICogQHBhcmFtIGFwcHMgVGhlIGxpc3Qgb2YgYXBwcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgYXBwcyBmaWx0ZXJlZCBmb3IgdXNlIGJ5IHRoZSB1c2VyLlxuXHQgKi9cblx0cHJpdmF0ZSBhcHBseUN1cnJlbnRVc2VyVG9BcHBzKGFwcHM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShjdXJyZW50VXNlcikgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmcpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWcpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gYXBwcztcblx0XHR9XG5cdFx0Y29uc3QgZXhjbHVkZVRhZyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZztcblxuXHRcdGNvbnN0IGFwcGxpY2F0aW9uczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSA9IFtdO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHMpKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGFwcCBvZiBhcHBzKSB7XG5cdFx0XHRcdGNvbnN0IGxvb2t1cDogc3RyaW5nW10gfCB1bmRlZmluZWQgPSBhcHAudGFncyA/PyBhcHAuY2F0ZWdvcmllcztcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobG9va3VwKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmluY2x1ZGVJblJlc3BvbnNlKGxvb2t1cCwgZXhjbHVkZVRhZykpIHtcblx0XHRcdFx0XHRcdGFwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFwcGxpY2F0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlIHRoZSB0YWdzIHdpdGggdGhlIGV4Y2x1ZGUgbGlzdCB0byBzZWUgaWYgdGhleSBzaG91bGQgYmUgdXNlZC5cblx0ICogQHBhcmFtIHRhZ3MgVGhlIHRhZ3MgdG8gY2hlY2suXG5cdCAqIEBwYXJhbSBleGNsdWRlVGFncyBUaGUgZXhjbHVkZSBsaXN0IHRvIGNoZWNrIGFnYWluc3QuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gc2hvdWxkIGJlIGluY2x1ZGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBpbmNsdWRlSW5SZXNwb25zZSh0YWdzOiBzdHJpbmdbXSwgZXhjbHVkZVRhZ3M6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG5cdFx0bGV0IGluY2x1ZGUgPSB0cnVlO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShleGNsdWRlVGFncykpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50VGFnOiBzdHJpbmcgPSB0YWc7XG5cdFx0XHRpZiAoZXhjbHVkZVRhZ3MuaW5jbHVkZXMoY3VycmVudFRhZykpIHtcblx0XHRcdFx0aW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGluY2x1ZGU7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIGN1c3RvbSBzZXR0aW5ncy5cblx0ICogQHBhcmFtIHNldHRpbmdzIFRoZSBzZXR0aW5ncyB0byBmaWx0ZXIuXG5cdCAqIEByZXR1cm5zIFRoZSBmaWx0ZXJlZCBzZXR0aW5ncy5cblx0ICovXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3Moc2V0dGluZ3M6IEN1c3RvbVNldHRpbmdzKTogQ3VzdG9tU2V0dGluZ3Mge1xuXHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGN1cnJlbnRVc2VyKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZykgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0pIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX2RlZmluaXRpb24pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbW9kdWxlcyA9IHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5tb2R1bGVzO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KG1vZHVsZXMpKSB7XG5cdFx0XHRtb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRkYXRhOiB0aGlzLl9kZWZpbml0aW9uLFxuXHRcdFx0XHRlbmFibGVkOiB0aGlzLl9kZWZpbml0aW9uLmVuYWJsZWQsXG5cdFx0XHRcdGlkOiB0aGlzLl9kZWZpbml0aW9uLmlkLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5fZGVmaW5pdGlvbi5kZXNjcmlwdGlvbixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbi5pY29uLFxuXHRcdFx0XHRpbmZvOiB0aGlzLl9kZWZpbml0aW9uLmluZm8sXG5cdFx0XHRcdHRpdGxlOiB0aGlzLl9kZWZpbml0aW9uLnRpdGxlLFxuXHRcdFx0XHR1cmw6IHRoaXMuX2RlZmluaXRpb24udXJsXG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IGFwcEVuZHBvaW50UHJvdmlkZXJzID0gc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/LmVuZHBvaW50cztcblx0XHRcdGNvbnN0IGFwcEVuZHBvaW50SWRzID0gc2V0dGluZ3M/LmFwcFByb3ZpZGVyPy5lbmRwb2ludElkcztcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFwcEVuZHBvaW50UHJvdmlkZXJzKSAmJiBBcnJheS5pc0FycmF5KGFwcEVuZHBvaW50SWRzKSkge1xuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xuXHRcdFx0XHRjb25zdCB1cGRhdGVFbmRwb2ludHMgPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBlbmRwb2ludCBvZiBhcHBFbmRwb2ludElkcykge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZW5kcG9pbnQgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdGlmIChlbmRwb2ludC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVFbmRwb2ludHMucHVzaCh7IHBvc2l0aW9uOiBjb3VudCwgdXJsOiBlbmRwb2ludCB9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50VG9VcGRhdGUgPSBhcHBFbmRwb2ludFByb3ZpZGVycy5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdChlbmRwb2ludEVudHJ5KSA9PiBlbmRwb2ludEVudHJ5LmlkID09PSBlbmRwb2ludCAmJiBlbmRwb2ludEVudHJ5LnR5cGUgPT09IFwiZmV0Y2hcIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoZW5kcG9pbnRUb1VwZGF0ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGUgPSBcIm1vZHVsZVwiO1xuXHRcdFx0XHRcdFx0XHRcdC8vIHRoaXMgaWYgY29uZGl0aW9uIGNoZWNrIGlzIGhlcmUgdG8gbWFrZSB0eXBlc2NyaXB0IGhhcHB5IHdpdGggdGhlIGVuZHBvaW50IHNvIHRoYXQgdHlwZUlkIGNhbiBiZSBzZXRcblx0XHRcdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnRUb1VwZGF0ZS50eXBlID09PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGVJZCA9IHRoaXMuX2RlZmluaXRpb24uaWQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodXBkYXRlRW5kcG9pbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZiAoaXNFbXB0eShzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyKSkge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlciA9IHtcblx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBuZXdFbmRwb2ludEVudHJ5IG9mIHVwZGF0ZUVuZHBvaW50cykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRJZCA9IGBhdXRoLWV4YW1wbGUtZW5kcG9pbnQtJHtuZXdFbmRwb2ludEVudHJ5LnBvc2l0aW9ufWA7XG5cdFx0XHRcdFx0XHRhcHBFbmRwb2ludElkc1tuZXdFbmRwb2ludEVudHJ5LnBvc2l0aW9uXSA9IGVuZHBvaW50SWQ7XG5cdFx0XHRcdFx0XHRhcHBFbmRwb2ludFByb3ZpZGVycy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0aWQ6IGVuZHBvaW50SWQsXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwibW9kdWxlXCIsXG5cdFx0XHRcdFx0XHRcdHR5cGVJZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogXCJHRVRcIixcblx0XHRcdFx0XHRcdFx0XHR1cmw6IG5ld0VuZHBvaW50RW50cnkudXJsXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IHRoZW1lUHJvdmlkZXIgPSBzZXR0aW5ncy50aGVtZVByb3ZpZGVyO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhlbWVQcm92aWRlcikgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkodGhlbWVQcm92aWRlci50aGVtZXMpICYmXG5cdFx0XHR0aGVtZVByb3ZpZGVyLnRoZW1lcy5sZW5ndGggPiAwICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUpXG5cdFx0KSB7XG5cdFx0XHR0aGVtZVByb3ZpZGVyLnRoZW1lc1swXS5kZWZhdWx0ID1cblx0XHRcdFx0dGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lID09PSBcImRhcmtcIiA/IFwiZGFya1wiIDogXCJsaWdodFwiO1xuXHRcdFx0Y29uc3Qgc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1TZWxlY3RlZENvbG9yU2NoZW1lYDtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XCJUaGlzIGlzIGEgZGVtbyBtb2R1bGUgd2hlcmUgd2UgYXJlIGNsZWFyaW5nIHRoZSBsb2NhbGx5IHN0b3JlZCBzY2hlbWUgcHJlZmVyZW5jZSBpbiBvcmRlciB0byBzaG93IGRpZmZlcmVudCBzY2hlbWUncyBsaWdodC9kYXJrIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBUaGlzIG1lYW5zIHRoYXQgaXQgd2lsbCBhbHdheXMgYmUgc2V0IHRvIHdoYXQgaXMgaW4gdGhlIHJvbGUgbWFwcGluZyBpbml0aWFsbHkgYW5kIG5vdCB3aGF0IGl0IGlzIHNldCB0byBsb2NhbGx5IG9uIHJlc3RhcnQuXCJcblx0XHRcdCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yZWRTY2hlbWVQcmVmZXJlbmNlKTtcblx0XHR9XG5cblx0XHRjb25zdCBleGNsdWRlTWVudUFjdGlvbklkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51QWN0aW9uO1xuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51TW9kdWxlSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVNb2R1bGU7XG5cblx0XHRjb25zdCBicm93c2VyUHJvdmlkZXJzID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyO1xuXHRcdGlmICghaXNFbXB0eShicm93c2VyUHJvdmlkZXJzKSAmJiBBcnJheS5pc0FycmF5KGV4Y2x1ZGVNZW51QWN0aW9uSWRzKSkge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGdsb2JhbE1lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUpIHtcblx0XHRcdFx0XHRjb25zdCBnbG9iYWxNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGdsb2JhbE1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZ2xvYmFsTWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKGdsb2JhbE1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdGdsb2JhbE1lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWdlTWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUpIHtcblx0XHRcdFx0XHRjb25zdCBwYWdlTWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBwYWdlTWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChwYWdlTWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKHBhZ2VNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRwYWdlTWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZpZXdNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy52aWV3TWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXdNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHZpZXdNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKHZpZXdNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXModmlld01lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHZpZXdNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IG1lbnVzUHJvdmlkZXIgPSBzZXR0aW5ncy5tZW51c1Byb3ZpZGVyO1xuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KG1lbnVzUHJvdmlkZXIpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KGV4Y2x1ZGVNZW51TW9kdWxlSWRzKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShtZW51c1Byb3ZpZGVyLm1vZHVsZXMpXG5cdFx0KSB7XG5cdFx0XHRmb3IgKGNvbnN0IG1lbnVNb2R1bGUgb2YgbWVudXNQcm92aWRlci5tb2R1bGVzKSB7XG5cdFx0XHRcdGNvbnN0IG1lbnVNb2R1bGVJZDogc3RyaW5nID0gbWVudU1vZHVsZS5pZDtcblx0XHRcdFx0aWYgKGV4Y2x1ZGVNZW51TW9kdWxlSWRzLmluY2x1ZGVzKG1lbnVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtZW51TW9kdWxlLmVuYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzZXR0aW5ncztcblx0fVxufVxuIiwiaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUmA7XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICogQHJldHVybnMgVGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCk6IEV4YW1wbGVVc2VyIHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKGlzRW1wdHkoc3RvcmVkVXNlcikpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IHVzZXIgaW4gc3RvcmFnZS5cbiAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIHRvIHN0b3JlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcjogRXhhbXBsZVVzZXIpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCk6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBuZXcgRXhhbXBsZUF1dGhQcm92aWRlcigpLFxuXHRlbmRwb2ludDogbmV3IEV4YW1wbGVBdXRoRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==