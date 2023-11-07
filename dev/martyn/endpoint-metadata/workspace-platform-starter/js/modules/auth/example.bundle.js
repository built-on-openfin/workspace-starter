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
        return content.replace(/<[^>]*>?/gm, "");
    }
    return content;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBaUI7SUFDL0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVEOztHQUVHO0FBQ0ksU0FBUyxnQkFBZ0I7SUFDL0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELENBQUM7Ozs7Ozs7U0M5QkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFDSTtBQUUxQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsSUFBSSxFQUFFLElBQUksc0RBQW1CLEVBQUU7SUFDL0IsUUFBUSxFQUFFLElBQUksMERBQW1CLEVBQUU7Q0FDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvdXRpbC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIHN0cmluZyBzYW5pdGl6ZSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYW5nbGUgYnJhY2tldHMgPD4gZnJvbSBhIHN0cmluZy5cbiAqIEBwYXJhbSBjb250ZW50IHRoZSBjb250ZW50IHRvIHNhbml0aXplXG4gKiBAcmV0dXJucyBhIHN0cmluZyB3aXRob3V0IGFuZ2xlIGJyYWNrZXRzIDw+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRyZXR1cm4gY29udGVudC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIik7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhFdmVudFR5cGVzLCBBdXRoUHJvdmlkZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2F1dGgtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBmb3JtYXRFcnJvciwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZU9wdGlvbnMsIEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgY2xlYXJDdXJyZW50VXNlciwgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogRXhhbXBsZSBhdXRoZW50aWNhdGlvbiBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoUHJvdmlkZXIgaW1wbGVtZW50cyBBdXRoUHJvdmlkZXI8RXhhbXBsZU9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBvcHRpb25zIGZvciB0aGUgcHJvdmlkZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfYXV0aE9wdGlvbnM/OiBFeGFtcGxlT3B0aW9ucztcblxuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBNYXAgYSBzdWJzY3JpcHRpb24gaWQgdG8gYW4gZXZlbnQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfc3Vic2NyaWJlSWRNYXA6IHsgW2tleTogc3RyaW5nXTogQXV0aEV2ZW50VHlwZXMgfTtcblxuXHQvKipcblx0ICogQ2FsbGJhY2tzIGZvciBldmVudCBzdWJzY3JpYmVycy5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IF9ldmVudFN1YnNjcmliZXJzOiB7IFtldmVudCBpbiBBdXRoRXZlbnRUeXBlc10/OiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9IH07XG5cblx0LyoqXG5cdCAqIFRoZSBrZXkgZm9yIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZEtleT86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgdXNlci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9jdXJyZW50VXNlcj86IEV4YW1wbGVVc2VyO1xuXG5cdC8qKlxuXHQgKiBBcmUgd2UgYXV0aGVudGljYXRlZC5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9hdXRoZW50aWNhdGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGlkIGZvciB0aGUgZXhwaXJ5IGNoZWNrIHRpbWVyLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3Nlc3Npb25FeHBpcnlDaGVja0lkPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fZXZlbnRTdWJzY3JpYmVycyA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiQXV0aEV4YW1wbGVcIik7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZEtleSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1FWEFNUExFX0FVVEhfSVNfQVVUSEVOVElDQVRFRGA7XG5cblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoT3B0aW9ucykpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTZXR0aW5nIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZGVmaW5pdGlvbi5kYXRhLCBudWxsLCA0KX1gKTtcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSkpO1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0dGhpcy5fY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihcIk9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnNjcmliZSB0byBvbmUgb2YgdGhlIGF1dGggZXZlbnRzLlxuXHQgKiBAcGFyYW0gdG8gVGhlIGV2ZW50IHRvIHN1YnNjcmliZSB0by5cblx0ICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblx0ICogQHJldHVybnMgU3Vic2NyaXB0aW9uIGlkIGZvciB1bnN1YnNjcmliaW5nIG9yIHVuZGVmaW5lZCBpZiBldmVudCB0eXBlIGlzIG5vdCBhdmFpbGFibGUuXG5cdCAqL1xuXHRwdWJsaWMgc3Vic2NyaWJlKHRvOiBBdXRoRXZlbnRUeXBlcywgY2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHN1YnNjcmlwdGlvbklkID0gcmFuZG9tVVVJRCgpO1xuXG5cdFx0Y29uc3QgdG9NYXAgPSB0aGlzLl9ldmVudFN1YnNjcmliZXJzW3RvXSA/PyB7fTtcblx0XHR0b01hcFtzdWJzY3JpcHRpb25JZF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9ldmVudFN1YnNjcmliZXJzW3RvXSA9IHRvTWFwO1xuXG5cdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdID0gdG87XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKGBTdWJzY3JpcHRpb24gdG8gJHt0b30gZXZlbnRzIHJlZ2lzdGVyZWQuIFN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH1gKTtcblxuXHRcdHJldHVybiBzdWJzY3JpcHRpb25JZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVbnN1YnNjcmliZSBmcm9tIGFuIGFscmVhZHkgc3Vic2NyaWJlZCBldmVudC5cblx0ICogQHBhcmFtIHN1YnNjcmlwdGlvbklkIFRoZSBpZCBvZiB0aGUgc3Vic2NyaXB0aW9uIHJldHVybmVkIGZyb20gc3Vic2NyaWJlLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB1bnN1YnNjcmliZSB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyB1bnN1YnNjcmliZShzdWJzY3JpcHRpb25JZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgZXZlbnRUeXBlID0gdGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdGlmIChpc0VtcHR5KGV2ZW50VHlwZSkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke3N1YnNjcmlwdGlvbklkfSB0aGF0IGlzIGludmFsaWRgKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCBldmVudFN1YnNjcmliZXJzID0gdGhpcy5fZXZlbnRTdWJzY3JpYmVyc1tldmVudFR5cGVdO1xuXHRcdGlmICghaXNFbXB0eShldmVudFN1YnNjcmliZXJzKSkge1xuXHRcdFx0ZGVsZXRlIGV2ZW50U3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF0pIHtcblx0XHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF07XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH0gaGFzIGJlZW4gY2xlYXJlZGBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaXB0aW9uSWR9IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEb2VzIHRoZSBhdXRoIHByb3ZpZGVyIHJlcXVpcmUgYXV0aGVudGljYXRpb24uXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGlvblJlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpKSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiAhdGhpcy5fYXV0aGVudGljYXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBsb2dpbiBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ2luIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGxvZ2luKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImxvZ2luIHJlcXVlc3RlZFwiKTtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVXNlciBhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zPy5hdXRvTG9naW4pIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcImF1dG9Mb2dpbiBlbmFibGVkIGluIGF1dGggcHJvdmlkZSBtb2R1bGUgc2V0dGluZ3MuIEZha2UgbG9nZ2VkIGluXCIpO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSwgdGhpcy5fYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLWluXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9nb3V0IG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9nb3V0IHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVMb2dvdXQocmVzb2x2ZSlcblx0XHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5mb3JtYXRpb24gZnJvbSB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVGhlIHVzZXIgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTx1bmtub3duPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihcIlVuYWJsZSB0byByZXRyaWV2ZSB1c2VyIGluZm8gdW5sZXNzIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlRoaXMgZXhhbXBsZSByZXR1cm5zIGEgdXNlciBpZiBpdCB3YXMgcHJvdmlkZWQgdG8gdGhlIGV4YW1wbGUgbG9naW5cIik7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudFVzZXI7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiBmcm9tIHRoZSB1c2VyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLm9wZW5Mb2dpbldpbmRvdyh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybClcblx0XHRcdFx0XHQudGhlbihhc3luYyAob3BlbmVkV2luKSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgd2luOiBPcGVuRmluLldpbmRvdyB8IHVuZGVmaW5lZCA9IG9wZW5lZFdpbjtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7Zm9ybWF0RXJyb3IoZXJyb3IpfWBcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQXV0aCBXaW5kb3cgY2FuY2VsbGVkIGJ5IHVzZXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoXG5cdFx0XHRcdFx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gYXV0aGVudGljYXRlIHRoZSB1c2VyXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB0byBzZWUgaWYgYSBzZXNzaW9uIGhhcyBleHBpcmVkLlxuXHQgKi9cblx0cHJpdmF0ZSBjaGVja0ZvclNlc3Npb25FeHBpcnkoKTogdm9pZCB7XG5cdFx0Y29uc3QgdmFsaWRpdHkgPSB0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHM7XG5cdFx0aWYgKGlzTnVtYmVyKHZhbGlkaXR5KSAmJiB2YWxpZGl0eSA+IC0xICYmIGlzRW1wdHkodGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQpKSB7XG5cdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5jaGVja0F1dGgodGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcInNlc3Npb24tZXhwaXJlZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sIHZhbGlkaXR5ICogMTAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmeSBzdWJzY3JpYmVycyBvZiBhbiBldmVudCBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBhdXRoRXZlbnRUeXBlIFRoZSB0eXBlIG9mIGF1dGhlbnRpY2F0aW9uIGV2ZW50IHRvIHNlbmQgdG8uXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG5vdGlmeVN1YnNjcmliZXJzKGF1dGhFdmVudFR5cGU6IEF1dGhFdmVudFR5cGVzKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9ldmVudFN1YnNjcmliZXJzW2F1dGhFdmVudFR5cGVdO1xuXG5cdFx0aWYgKHN1YnNjcmliZXJzKSB7XG5cdFx0XHRjb25zdCBzdWJzY3JpYmVySWRzID0gT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpO1xuXHRcdFx0c3Vic2NyaWJlcklkcy5yZXZlcnNlKCk7XG5cblx0XHRcdGZvciAoY29uc3Qgc3Vic2NyaWJlcklkIG9mIHN1YnNjcmliZXJJZHMpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7YXV0aEV2ZW50VHlwZX1gXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGF3YWl0IHN1YnNjcmliZXJzW3N1YnNjcmliZXJJZF0oKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGxvZ291dC5cblx0ICogQHBhcmFtIHJlc29sdmUgVGhlIHJlc29sdmUgbWV0aG9kIHRvIGNhbGwgYWZ0ZXIgbG9nb3V0LlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIllvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpblwiKTtcblx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJMb2cgb3V0IHJlcXVlc3RlZFwiKTtcblx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIik7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHR9XG5cdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdGNvbnN0IGxvZ291dFVybCA9IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dvdXRVcmw7XG5cdFx0aWYgKGlzU3RyaW5nVmFsdWUobG9nb3V0VXJsKSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgdGhpcy5vcGVuTG9nb3V0V2luZG93KGxvZ291dFVybCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIpO1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIik7XG5cdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBsb2dpbiB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIGZvciB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcmV0dXJucyBUaGUgd2luZG93IHRoYXQgd2FzIGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7XG5cdFx0XHRjdXJyZW50VXNlcktleTogRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksXG5cdFx0XHQuLi50aGlzLl9hdXRoT3B0aW9ucz8uY3VzdG9tRGF0YVxuXHRcdH07XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsLFxuXHRcdFx0Y3VzdG9tRGF0YTogZW5yaWNoZWRDdXN0b21EYXRhXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIGZvciB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXR1cy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIG9wZW4gdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgY2hlY2tBdXRoKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWNoZWNrLXdpbmRvd1wiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdFx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0XHRpZiAoaW5mby51cmwgPT09IHRoaXMuX2F1dGhPcHRpb25zPy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uXCIsIGVycm9yKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHdpbmRvd1RvQ2hlY2spKSB7XG5cdFx0XHRcdGF3YWl0IHdpbmRvd1RvQ2hlY2suY2xvc2UodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpc0F1dGhlbnRpY2F0ZWQ7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHtcblx0RW5kcG9pbnQsXG5cdEVuZHBvaW50RGVmaW5pdGlvbixcblx0RmV0Y2hPcHRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9zZXR0aW5nLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllcywgRXhhbXBsZUVuZHBvaW50T3B0aW9ucywgRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogRXhhbXBsZSBhdXRoZW50aWNhdGlvbiBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoRW5kcG9pbnQgaW1wbGVtZW50cyBFbmRwb2ludDxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPiB7XG5cdHByaXZhdGUgX2RlZmluaXRpb24/OiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+O1xuXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIF9yb2xlTWFwcGluZz86IHsgW2tleTogc3RyaW5nXTogRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVycz86IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkV4YW1wbGVBdXRoRW5kcG9pbnRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xuXHRcdHRoaXMuX3JvbGVNYXBwaW5nID0gZGVmaW5pdGlvbj8uZGF0YT8ucm9sZU1hcHBpbmc7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIFRoZSByZXNwb25zZSB0byB0aGUgcmVxdWVzdCwgb3IgbnVsbCBvZiBub3QgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZXF1ZXN0UmVzcG9uc2UoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248RmV0Y2hPcHRpb25zPixcblx0XHRyZXF1ZXN0PzogdW5rbm93blxuXHQpOiBQcm9taXNlPFxuXHRcdEN1c3RvbVNldHRpbmdzIHwgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB8IHsgYXBwbGljYXRpb25zOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIH0gfCBudWxsXG5cdD4ge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eSh0aGlzLl9sb2dnZXIpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XCJUaGlzIGF1dGggZW5kcG9pbnQgbW9kdWxlIGlzIGFuIGV4YW1wbGUgdGhhdCB0aGF0IHNpbXVsYXRlcyByZXF1ZXN0aW5nIGEgaHR0cCBlbmRwb2ludCBhbmQgbWFuaXB1bGF0aW5nIGl0IGJhc2VkIG9uIHRoZSBjdXJyZW50IGV4YW1wbGUgdXNlciBhcyBpZiBpdCB3YXMgdGhlIHNlcnZlciBkb2luZyB0aGUgbWFuaXB1bGF0aW9uLiBETyBOT1QgVVNFIFRISVMgTU9EVUxFIElOIFBST0RVQ1RJT04uXCJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeyB1cmwsIC4uLm9wdGlvbnMgfTogRmV0Y2hPcHRpb25zID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cblx0XHRjb25zdCByZXEgPSB0aGlzLmdldFJlcXVlc3RPcHRpb25zKHVybCBhcyBzdHJpbmcsIG9wdGlvbnMsIHJlcXVlc3QgYXMgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9KTtcblx0XHRpZiAocmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiICYmIHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YCR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBzcGVjaWZpZXMgYSB0eXBlOiAke2VuZHBvaW50RGVmaW5pdGlvbi50eXBlfSB3aXRoIGEgbWV0aG9kICR7cmVxLm9wdGlvbnMubWV0aG9kfSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQuYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxLnVybCwgcmVxLm9wdGlvbnMgYXMgUmVxdWVzdEluaXQpO1xuXG5cdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuXHRcdFx0XHQvLyByZXR1cm5lZCBhcHBzXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbiBhcyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShqc29uLmFwcGxpY2F0aW9ucykpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnM6IHRoaXMuYXBwbHlDdXJyZW50VXNlclRvQXBwcyhqc29uLmFwcGxpY2F0aW9ucyBhcyBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly8gc2V0dGluZ3Ncblx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKGpzb24gYXMgQ3VzdG9tU2V0dGluZ3MpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IHRoZSBvcHRpb25zIHRvIHJlcXVlc3QgZGF0YS5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsLlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucy5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0IHRvIGNvbnZlcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgb3B0aW9ucy5cblx0ICovXG5cdHByaXZhdGUgZ2V0UmVxdWVzdE9wdGlvbnMoXG5cdFx0dXJsOiBzdHJpbmcsXG5cdFx0b3B0aW9uczogRmV0Y2hPcHRpb25zLFxuXHRcdHJlcXVlc3Q6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfVxuXHQpOiB7IHVybDogc3RyaW5nOyBvcHRpb25zOiBGZXRjaE9wdGlvbnMgfSB7XG5cdFx0aWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0XHRpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoYFske2tleXNbaV19XWAsIGVuY29kZVVSSUNvbXBvbmVudChyZXF1ZXN0W2tleXNbaV1dKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWlzRW1wdHkocmVxdWVzdCkpIHtcblx0XHRcdG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7IHVybCwgb3B0aW9ucyB9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZSBjdXJyZW50IHVzZXIgc2V0dGluZ3MgdG8gdGhlIGFwcGxpY2F0aW9ucy5cblx0ICogQHBhcmFtIGFwcHMgVGhlIGxpc3Qgb2YgYXBwcy5cblx0ICogQHJldHVybnMgVGhlIGxpc3Qgb2YgYXBwcyBmaWx0ZXJlZCBmb3IgdXNlIGJ5IHRoZSB1c2VyLlxuXHQgKi9cblx0cHJpdmF0ZSBhcHBseUN1cnJlbnRVc2VyVG9BcHBzKGFwcHM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShjdXJyZW50VXNlcikgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmcpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWcpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gYXBwcztcblx0XHR9XG5cdFx0Y29uc3QgZXhjbHVkZVRhZyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZztcblxuXHRcdGNvbnN0IGFwcGxpY2F0aW9uczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSA9IFtdO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHMpKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGFwcCBvZiBhcHBzKSB7XG5cdFx0XHRcdGNvbnN0IGxvb2t1cDogc3RyaW5nW10gfCB1bmRlZmluZWQgPSBhcHAudGFncyA/PyBhcHAuY2F0ZWdvcmllcztcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobG9va3VwKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmluY2x1ZGVJblJlc3BvbnNlKGxvb2t1cCwgZXhjbHVkZVRhZykpIHtcblx0XHRcdFx0XHRcdGFwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFwcGxpY2F0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlIHRoZSB0YWdzIHdpdGggdGhlIGV4Y2x1ZGUgbGlzdCB0byBzZWUgaWYgdGhleSBzaG91bGQgYmUgdXNlZC5cblx0ICogQHBhcmFtIHRhZ3MgVGhlIHRhZ3MgdG8gY2hlY2suXG5cdCAqIEBwYXJhbSBleGNsdWRlVGFncyBUaGUgZXhjbHVkZSBsaXN0IHRvIGNoZWNrIGFnYWluc3QuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGl0ZW0gc2hvdWxkIGJlIGluY2x1ZGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBpbmNsdWRlSW5SZXNwb25zZSh0YWdzOiBzdHJpbmdbXSwgZXhjbHVkZVRhZ3M6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG5cdFx0bGV0IGluY2x1ZGUgPSB0cnVlO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShleGNsdWRlVGFncykpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50VGFnOiBzdHJpbmcgPSB0YWc7XG5cdFx0XHRpZiAoZXhjbHVkZVRhZ3MuaW5jbHVkZXMoY3VycmVudFRhZykpIHtcblx0XHRcdFx0aW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGluY2x1ZGU7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIGN1c3RvbSBzZXR0aW5ncy5cblx0ICogQHBhcmFtIHNldHRpbmdzIFRoZSBzZXR0aW5ncyB0byBmaWx0ZXIuXG5cdCAqIEByZXR1cm5zIFRoZSBmaWx0ZXJlZCBzZXR0aW5ncy5cblx0ICovXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3Moc2V0dGluZ3M6IEN1c3RvbVNldHRpbmdzKTogQ3VzdG9tU2V0dGluZ3Mge1xuXHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGN1cnJlbnRVc2VyKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZykgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0pIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX2RlZmluaXRpb24pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbW9kdWxlcyA9IHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5tb2R1bGVzO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KG1vZHVsZXMpKSB7XG5cdFx0XHRtb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRkYXRhOiB0aGlzLl9kZWZpbml0aW9uLFxuXHRcdFx0XHRlbmFibGVkOiB0aGlzLl9kZWZpbml0aW9uLmVuYWJsZWQsXG5cdFx0XHRcdGlkOiB0aGlzLl9kZWZpbml0aW9uLmlkLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5fZGVmaW5pdGlvbi5kZXNjcmlwdGlvbixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbi5pY29uLFxuXHRcdFx0XHRpbmZvOiB0aGlzLl9kZWZpbml0aW9uLmluZm8sXG5cdFx0XHRcdHRpdGxlOiB0aGlzLl9kZWZpbml0aW9uLnRpdGxlLFxuXHRcdFx0XHR1cmw6IHRoaXMuX2RlZmluaXRpb24udXJsXG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IGFwcEVuZHBvaW50UHJvdmlkZXJzID0gc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/LmVuZHBvaW50cztcblx0XHRcdGNvbnN0IGFwcEVuZHBvaW50SWRzID0gc2V0dGluZ3M/LmFwcFByb3ZpZGVyPy5lbmRwb2ludElkcztcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFwcEVuZHBvaW50UHJvdmlkZXJzKSAmJiBBcnJheS5pc0FycmF5KGFwcEVuZHBvaW50SWRzKSkge1xuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xuXHRcdFx0XHRjb25zdCB1cGRhdGVFbmRwb2ludHMgPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBlbmRwb2ludCBvZiBhcHBFbmRwb2ludElkcykge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZW5kcG9pbnQgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdGlmIChlbmRwb2ludC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVFbmRwb2ludHMucHVzaCh7IHBvc2l0aW9uOiBjb3VudCwgdXJsOiBlbmRwb2ludCB9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50VG9VcGRhdGUgPSBhcHBFbmRwb2ludFByb3ZpZGVycy5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdChlbmRwb2ludEVudHJ5KSA9PiBlbmRwb2ludEVudHJ5LmlkID09PSBlbmRwb2ludCAmJiBlbmRwb2ludEVudHJ5LnR5cGUgPT09IFwiZmV0Y2hcIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoZW5kcG9pbnRUb1VwZGF0ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGUgPSBcIm1vZHVsZVwiO1xuXHRcdFx0XHRcdFx0XHRcdC8vIHRoaXMgaWYgY29uZGl0aW9uIGNoZWNrIGlzIGhlcmUgdG8gbWFrZSB0eXBlc2NyaXB0IGhhcHB5IHdpdGggdGhlIGVuZHBvaW50IHNvIHRoYXQgdHlwZUlkIGNhbiBiZSBzZXRcblx0XHRcdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnRUb1VwZGF0ZS50eXBlID09PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGVJZCA9IHRoaXMuX2RlZmluaXRpb24uaWQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodXBkYXRlRW5kcG9pbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZiAoaXNFbXB0eShzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyKSkge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlciA9IHtcblx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBuZXdFbmRwb2ludEVudHJ5IG9mIHVwZGF0ZUVuZHBvaW50cykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRJZCA9IGBhdXRoLWV4YW1wbGUtZW5kcG9pbnQtJHtuZXdFbmRwb2ludEVudHJ5LnBvc2l0aW9ufWA7XG5cdFx0XHRcdFx0XHRhcHBFbmRwb2ludElkc1tuZXdFbmRwb2ludEVudHJ5LnBvc2l0aW9uXSA9IGVuZHBvaW50SWQ7XG5cdFx0XHRcdFx0XHRhcHBFbmRwb2ludFByb3ZpZGVycy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0aWQ6IGVuZHBvaW50SWQsXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwibW9kdWxlXCIsXG5cdFx0XHRcdFx0XHRcdHR5cGVJZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogXCJHRVRcIixcblx0XHRcdFx0XHRcdFx0XHR1cmw6IG5ld0VuZHBvaW50RW50cnkudXJsXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IHRoZW1lUHJvdmlkZXIgPSBzZXR0aW5ncy50aGVtZVByb3ZpZGVyO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkodGhlbWVQcm92aWRlcikgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkodGhlbWVQcm92aWRlci50aGVtZXMpICYmXG5cdFx0XHR0aGVtZVByb3ZpZGVyLnRoZW1lcy5sZW5ndGggPiAwICYmXG5cdFx0XHQhaXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUpXG5cdFx0KSB7XG5cdFx0XHR0aGVtZVByb3ZpZGVyLnRoZW1lc1swXS5kZWZhdWx0ID1cblx0XHRcdFx0dGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lID09PSBcImRhcmtcIiA/IFwiZGFya1wiIDogXCJsaWdodFwiO1xuXHRcdFx0Y29uc3Qgc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1TZWxlY3RlZENvbG9yU2NoZW1lYDtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0XCJUaGlzIGlzIGEgZGVtbyBtb2R1bGUgd2hlcmUgd2UgYXJlIGNsZWFyaW5nIHRoZSBsb2NhbGx5IHN0b3JlZCBzY2hlbWUgcHJlZmVyZW5jZSBpbiBvcmRlciB0byBzaG93IGRpZmZlcmVudCBzY2hlbWUncyBsaWdodC9kYXJrIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBUaGlzIG1lYW5zIHRoYXQgaXQgd2lsbCBhbHdheXMgYmUgc2V0IHRvIHdoYXQgaXMgaW4gdGhlIHJvbGUgbWFwcGluZyBpbml0aWFsbHkgYW5kIG5vdCB3aGF0IGl0IGlzIHNldCB0byBsb2NhbGx5IG9uIHJlc3RhcnQuXCJcblx0XHRcdCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yZWRTY2hlbWVQcmVmZXJlbmNlKTtcblx0XHR9XG5cblx0XHRjb25zdCBleGNsdWRlTWVudUFjdGlvbklkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51QWN0aW9uO1xuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51TW9kdWxlSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVNb2R1bGU7XG5cblx0XHRjb25zdCBicm93c2VyUHJvdmlkZXJzID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyO1xuXHRcdGlmICghaXNFbXB0eShicm93c2VyUHJvdmlkZXJzKSAmJiBBcnJheS5pc0FycmF5KGV4Y2x1ZGVNZW51QWN0aW9uSWRzKSkge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGdsb2JhbE1lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUpIHtcblx0XHRcdFx0XHRjb25zdCBnbG9iYWxNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGdsb2JhbE1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZ2xvYmFsTWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKGdsb2JhbE1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdGdsb2JhbE1lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWdlTWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUpIHtcblx0XHRcdFx0XHRjb25zdCBwYWdlTWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBwYWdlTWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChwYWdlTWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKHBhZ2VNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRwYWdlTWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZpZXdNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy52aWV3TWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXdNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHZpZXdNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKHZpZXdNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXModmlld01lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHZpZXdNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IG1lbnVzUHJvdmlkZXIgPSBzZXR0aW5ncy5tZW51c1Byb3ZpZGVyO1xuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KG1lbnVzUHJvdmlkZXIpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KGV4Y2x1ZGVNZW51TW9kdWxlSWRzKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShtZW51c1Byb3ZpZGVyLm1vZHVsZXMpXG5cdFx0KSB7XG5cdFx0XHRmb3IgKGNvbnN0IG1lbnVNb2R1bGUgb2YgbWVudXNQcm92aWRlci5tb2R1bGVzKSB7XG5cdFx0XHRcdGNvbnN0IG1lbnVNb2R1bGVJZDogc3RyaW5nID0gbWVudU1vZHVsZS5pZDtcblx0XHRcdFx0aWYgKGV4Y2x1ZGVNZW51TW9kdWxlSWRzLmluY2x1ZGVzKG1lbnVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtZW51TW9kdWxlLmVuYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzZXR0aW5ncztcblx0fVxufVxuIiwiaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUmA7XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICogQHJldHVybnMgVGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCk6IEV4YW1wbGVVc2VyIHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKGlzRW1wdHkoc3RvcmVkVXNlcikpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IHVzZXIgaW4gc3RvcmFnZS5cbiAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIHRvIHN0b3JlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcjogRXhhbXBsZVVzZXIpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCk6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBuZXcgRXhhbXBsZUF1dGhQcm92aWRlcigpLFxuXHRlbmRwb2ludDogbmV3IEV4YW1wbGVBdXRoRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==