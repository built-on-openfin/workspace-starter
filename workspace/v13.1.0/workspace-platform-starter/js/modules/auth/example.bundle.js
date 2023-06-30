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
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
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
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");
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
        this._loggedInSubscribers = {};
        this._beforeLoggedOutSubscribers = {};
        this._loggedOutSubscribers = {};
        this._sessionExpiredSubscribers = {};
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authOptions)) {
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
        const key = (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
        let matchFound = false;
        switch (to) {
            case "logged-in": {
                matchFound = true;
                this._loggedInSubscribers[key] = callback;
                break;
            }
            case "before-logged-out": {
                matchFound = true;
                this._beforeLoggedOutSubscribers[key] = callback;
                break;
            }
            case "logged-out": {
                matchFound = true;
                this._loggedOutSubscribers[key] = callback;
                break;
            }
            case "session-expired": {
                matchFound = true;
                this._sessionExpiredSubscribers[key] = callback;
                break;
            }
        }
        if (matchFound) {
            this._subscribeIdMap[key] = to;
            this._logger?.info(`Subscription to ${to} events registered. Subscription Id: ${key}`);
            return key;
        }
    }
    /**
     * Unsubscribe from an already subscribed event.
     * @param subscriptionId The id of the subscription returned from subscribe.
     * @returns True if the unsubscribe was successful.
     */
    unsubscribe(subscriptionId) {
        let matchFound = false;
        const eventType = this._subscribeIdMap[subscriptionId];
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(eventType)) {
            this._logger?.warn(`You have tried to unsubscribe with a key ${subscriptionId} that is invalid`);
            return false;
        }
        switch (eventType) {
            case "logged-in": {
                matchFound = true;
                delete this._loggedInSubscribers[subscriptionId];
                break;
            }
            case "before-logged-out": {
                matchFound = true;
                delete this._beforeLoggedOutSubscribers[subscriptionId];
                break;
            }
            case "logged-out": {
                matchFound = true;
                delete this._loggedOutSubscribers[subscriptionId];
                break;
            }
            case "session-expired": {
                matchFound = true;
                delete this._sessionExpiredSubscribers[subscriptionId];
                break;
            }
        }
        delete this._subscribeIdMap[subscriptionId];
        if (matchFound) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated)) {
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
            await this.notifySubscribers("logged-in", this._loggedInSubscribers);
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated) || !this._authenticated) {
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
                            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
                                const info = await win.getInfo();
                                if (authMatch.test(info.url)) {
                                    await win.close(true);
                                    return resolve(true);
                                }
                                await win.show(true);
                            }
                        }
                        catch (error) {
                            this._logger?.error(`Error while checking if login window automatically redirected. Error ${(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.formatError)(error)}`);
                            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
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
                            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(validity) && validity > -1 && (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._sessionExpiryCheckId)) {
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
                        await this.notifySubscribers("session-expired", this._sessionExpiredSubscribers);
                    }
                }
            }, validity * 1000);
        }
    }
    /**
     * Notify subscribers of an event change.
     * @param eventType The event to notify.
     * @param subscribers The subscribers for the event.
     */
    async notifySubscribers(eventType, subscribers) {
        const subscriberIds = Object.keys(subscribers);
        subscriberIds.reverse();
        for (let i = 0; i < subscriberIds.length; i++) {
            const subscriberId = subscriberIds[i];
            this._logger?.info(`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`);
            await subscribers[subscriberId]();
        }
    }
    /**
     * Handle logout.
     * @param resolve The resolve method to call after logout.
     * @returns Nothing.
     */
    async handleLogout(resolve) {
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated) || !this._authenticated) {
            this._logger?.error("You have requested to log out but are not logged in");
            resolve(false);
            return;
        }
        this._logger?.info("Log out requested");
        await this.notifySubscribers("before-logged-out", this._beforeLoggedOutSubscribers);
        this._authenticated = false;
        if (this._authenticatedKey) {
            localStorage.removeItem(this._authenticatedKey);
        }
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
        const logoutUrl = this._authOptions?.logoutUrl;
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(logoutUrl)) {
            try {
                const win = await this.openLogoutWindow(logoutUrl);
                setTimeout(async () => {
                    await win.close();
                    await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
                    resolve(true);
                }, 2000);
            }
            catch (error) {
                this._logger?.error(`Error while launching logout window. ${error}`);
                return resolve(false);
            }
        }
        else {
            await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
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
            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowToCheck)) {
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
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");
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
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._logger)) {
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
            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
                const keys = Object.keys(request);
                if (keys.length > 0) {
                    const length = keys.length;
                    for (let i = 0; i < length; i++) {
                        url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
                    }
                }
            }
        }
        else if (options.method === "POST" && !(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(request)) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(currentUser) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role]) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role].excludeAppsWithTag)) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(currentUser) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role]) ||
            (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._definition)) {
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
                            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(endpointToUpdate)) {
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
                    if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings.endpointProvider)) {
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
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(themeProvider) &&
            Array.isArray(themeProvider.themes) &&
            themeProvider.themes.length > 0 &&
            !(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._roleMapping[currentUser.role].preferredScheme)) {
            themeProvider.themes[0].default =
                this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
            const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
            this._logger?.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart.");
            localStorage.removeItem(storedSchemePreference);
        }
        const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
        const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;
        const browserProviders = settings.browserProvider;
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(browserProviders) && Array.isArray(excludeMenuActionIds)) {
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
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(menusProvider) &&
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
/* harmony import */ var _framework_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/utils */ "./client/src/framework/utils.ts");

const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;
/**
 * Get the current user from storage.
 * @returns The current user.
 */
function getCurrentUser() {
    const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
    if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(storedUser)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSSxTQUFTLGdCQUFnQjtJQUMvQixZQUFZLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsQ0FBQzs7Ozs7OztTQzlCRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUNJO0FBRTFDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxJQUFJLEVBQUUsSUFBSSxzREFBbUIsRUFBRTtJQUMvQixRQUFRLEVBQUUsSUFBSSwwREFBbUIsRUFBRTtDQUNuQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS91dGlsLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBib29sZWFuIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIFRoZSBjbG9uZSBvZiB0aGUgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q2xvbmU8VD4ob2JqOiBUKTogVCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gb2JqID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiB3aW5kb3cuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHR9XG5cdC8vIFBvbHlmaWxsIHRoZSB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYSBub24gc2VjdXJlIGNvbnRleHQgdGhhdCBkb2Vzbid0IGhhdmUgaXRcblx0Ly8gd2UgYXJlIHN0aWxsIHVzaW5nIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGVcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvMjgwMDIxOFxuXHQvKipcblx0ICogR2V0IHJhbmRvbSBoZXggdmFsdWUuXG5cdCAqIEBwYXJhbSBjIFRoZSBudW1iZXIgdG8gYmFzZSB0aGUgcmFuZG9tIHZhbHVlIG9uLlxuXHQgKiBAcmV0dXJucyBUaGUgcmFuZG9tIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0UmFuZG9tSGV4KGM6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRjb25zdCBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2F1dGgtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBmb3JtYXRFcnJvciwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVPcHRpb25zLCBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIGNsZWFyQ3VycmVudFVzZXIsIGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIEV4YW1wbGUgYXV0aGVudGljYXRpb24gcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aFByb3ZpZGVyIGltcGxlbWVudHMgQXV0aFByb3ZpZGVyPEV4YW1wbGVPcHRpb25zPiB7XG5cdHByaXZhdGUgX2F1dGhPcHRpb25zPzogRXhhbXBsZU9wdGlvbnM7XG5cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3N1YnNjcmliZUlkTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlZEluU3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH07XG5cblx0cHJpdmF0ZSByZWFkb25seSBfYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH07XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VkT3V0U3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH07XG5cblx0cHJpdmF0ZSByZWFkb25seSBfc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyczogeyBbaWQ6IHN0cmluZ106ICgpID0+IFByb21pc2U8dm9pZD4gfTtcblxuXHRwcml2YXRlIF9hdXRoZW50aWNhdGVkS2V5Pzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2N1cnJlbnRVc2VyPzogRXhhbXBsZVVzZXI7XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZD86IGJvb2xlYW47XG5cblx0cHJpdmF0ZSBfc2Vzc2lvbkV4cGlyeUNoZWNrSWQ/OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBFeGFtcGxlQXV0aFByb3ZpZGVyLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXAgPSB7fTtcblx0XHR0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzID0ge307XG5cdFx0dGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMgPSB7fTtcblx0XHR0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyA9IHt9O1xuXHRcdHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMgPSB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkF1dGhFeGFtcGxlXCIpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURgO1xuXG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aE9wdGlvbnMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU2V0dGluZyBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGRlZmluaXRpb24uZGF0YSwgbnVsbCwgNCl9YCk7XG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpKTtcblx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXCJPcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHNldCBhcyBpbml0IGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJzY3JpYmUgdG8gb25lIG9mIHRoZSBhdXRoIGV2ZW50cy5cblx0ICogQHBhcmFtIHRvIFRoZSBldmVudCB0byBzdWJzY3JpYmUgdG8uXG5cdCAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG5cdCAqIEByZXR1cm5zIFN1YnNjcmlwdGlvbiBpZCBmb3IgdW5zdWJzY3JpYmluZyBvciB1bmRlZmluZWQgaWYgZXZlbnQgdHlwZSBpcyBub3QgYXZhaWxhYmxlLlxuXHQgKi9cblx0cHVibGljIHN1YnNjcmliZShcblx0XHR0bzogXCJsb2dnZWQtaW5cIiB8IFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiB8IFwibG9nZ2VkLW91dFwiIHwgXCJzZXNzaW9uLWV4cGlyZWRcIixcblx0XHRjYWxsYmFjazogKCkgPT4gUHJvbWlzZTx2b2lkPlxuXHQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IGtleSA9IHJhbmRvbVVVSUQoKTtcblx0XHRsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXHRcdHN3aXRjaCAodG8pIHtcblx0XHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzW2tleV0gPSBjYWxsYmFjaztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwibG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzW2tleV0gPSBjYWxsYmFjaztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwW2tleV0gPSB0bztcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7dG99IGV2ZW50cyByZWdpc3RlcmVkLiBTdWJzY3JpcHRpb24gSWQ6ICR7a2V5fWApO1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVW5zdWJzY3JpYmUgZnJvbSBhbiBhbHJlYWR5IHN1YnNjcmliZWQgZXZlbnQuXG5cdCAqIEBwYXJhbSBzdWJzY3JpcHRpb25JZCBUaGUgaWQgb2YgdGhlIHN1YnNjcmlwdGlvbiByZXR1cm5lZCBmcm9tIHN1YnNjcmliZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdW5zdWJzY3JpYmUgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgdW5zdWJzY3JpYmUoc3Vic2NyaXB0aW9uSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdFx0Y29uc3QgZXZlbnRUeXBlID0gdGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdGlmIChpc0VtcHR5KGV2ZW50VHlwZSkpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke3N1YnNjcmlwdGlvbklkfSB0aGF0IGlzIGludmFsaWRgKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGV2ZW50VHlwZSkge1xuXHRcdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzW3N1YnNjcmlwdGlvbklkXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzW3N1YnNjcmlwdGlvbklkXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGVsZXRlIHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXTtcblx0XHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaXB0aW9uSWR9IGhhcyBiZWVuIGNsZWFyZWRgXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfSBjb3VsZCBub3QgYmUgY2xlYXJlZCBhcyB3ZSBkbyBub3QgaGF2ZSBhIHJlZ2lzdGVyIG9mIHRoYXQgZXZlbnQgdHlwZS5gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogRG9lcyB0aGUgYXV0aCBwcm92aWRlciByZXF1aXJlIGF1dGhlbnRpY2F0aW9uLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSkge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gIXRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9naW4gb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dpbiB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucz8uYXV0b0xvZ2luKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpblwiKTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5nZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXksIHRoaXMuX2F1dGhlbnRpY2F0ZWQudG9TdHJpbmcoKSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiLCB0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ291dCBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ291dCB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlTG9nb3V0KHJlc29sdmUpXG5cdFx0XHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJMb2cgb3V0IGNhbGxlZFwiKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGFzeW5jIChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIHRyeWluZyB0byBsb2cgb3V0ICR7ZXJyb3J9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB1c2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRoZSB1c2VyIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHx8ICF0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlciBpbmZvIHVubGVzcyB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJUaGlzIGV4YW1wbGUgcmV0dXJucyBhIHVzZXIgaWYgaXQgd2FzIHByb3ZpZGVkIHRvIHRoZSBleGFtcGxlIGxvZ2luXCIpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRVc2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYXV0aGVudGljYXRpb24gZnJvbSB0aGUgdXNlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5vcGVuTG9naW5XaW5kb3codGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHRcdFx0LnRoZW4oYXN5bmMgKG9wZW5lZFdpbikgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IHdpbjogT3BlbkZpbi5XaW5kb3cgfCB1bmRlZmluZWQgPSBvcGVuZWRXaW47XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYXV0aE1hdGNoID0gbmV3IFJlZ0V4cCh0aGlzLl9hdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsLCBcImlcIik7XG5cblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Zvcm1hdEVycm9yKGVycm9yKX1gXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c0NoZWNrOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmFkZExpc3RlbmVyKFwiY2xvc2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAod2luKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLl9hdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclwiLCBlcnJvcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdG8gc2VlIGlmIGEgc2Vzc2lvbiBoYXMgZXhwaXJlZC5cblx0ICovXG5cdHByaXZhdGUgY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHZhbGlkaXR5ID0gdGhpcy5fYXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzO1xuXHRcdGlmIChpc051bWJlcih2YWxpZGl0eSkgJiYgdmFsaWRpdHkgPiAtMSAmJiBpc0VtcHR5KHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkKSkge1xuXHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGNvbnN0IHN0aWxsQXV0aGVudGljYXRlZCA9IGF3YWl0IHRoaXMuY2hlY2tBdXRoKHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luVXJsKTtcblx0XHRcdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJTZXNzaW9uIFN0aWxsIEFjdGl2ZVwiKTtcblx0XHRcdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdFx0XCJTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS4gU2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJzZXNzaW9uLWV4cGlyZWRcIiwgdGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LCB2YWxpZGl0eSAqIDEwMDApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZnkgc3Vic2NyaWJlcnMgb2YgYW4gZXZlbnQgY2hhbmdlLlxuXHQgKiBAcGFyYW0gZXZlbnRUeXBlIFRoZSBldmVudCB0byBub3RpZnkuXG5cdCAqIEBwYXJhbSBzdWJzY3JpYmVycyBUaGUgc3Vic2NyaWJlcnMgZm9yIHRoZSBldmVudC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgbm90aWZ5U3Vic2NyaWJlcnMoXG5cdFx0ZXZlbnRUeXBlOiBzdHJpbmcsXG5cdFx0c3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH1cblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3Qgc3Vic2NyaWJlcklkcyA9IE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKTtcblx0XHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcklkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qgc3Vic2NyaWJlcklkID0gc3Vic2NyaWJlcklkc1tpXTtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0YE5vdGlmeWluZyBzdWJzY3JpYmVyIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmliZXJJZH0gb2YgZXZlbnQgdHlwZTogJHtldmVudFR5cGV9YFxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHN1YnNjcmliZXJzW3N1YnNjcmliZXJJZF0oKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGxvZ291dC5cblx0ICogQHBhcmFtIHJlc29sdmUgVGhlIHJlc29sdmUgbWV0aG9kIHRvIGNhbGwgYWZ0ZXIgbG9nb3V0LlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIllvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpblwiKTtcblx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJMb2cgb3V0IHJlcXVlc3RlZFwiKTtcblx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgdGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0fVxuXHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHRjb25zdCBsb2dvdXRVcmwgPSB0aGlzLl9hdXRoT3B0aW9ucz8ubG9nb3V0VXJsO1xuXHRcdGlmIChpc1N0cmluZ1ZhbHVlKGxvZ291dFVybCkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHdpbiA9IGF3YWl0IHRoaXMub3BlbkxvZ291dFdpbmRvdyhsb2dvdXRVcmwpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UoKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCB0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0fSwgMjAwMCk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCB0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBsb2dpbiB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIGZvciB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcmV0dXJucyBUaGUgd2luZG93IHRoYXQgd2FzIGNyZWF0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7XG5cdFx0XHRjdXJyZW50VXNlcktleTogRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksXG5cdFx0XHQuLi50aGlzLl9hdXRoT3B0aW9ucz8uY3VzdG9tRGF0YVxuXHRcdH07XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsLFxuXHRcdFx0Y3VzdG9tRGF0YTogZW5yaWNoZWRDdXN0b21EYXRhXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIGZvciB0aGUgbG9nb3V0IHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXR1cy5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIG9wZW4gdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgY2hlY2tBdXRoKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWNoZWNrLXdpbmRvd1wiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucz8ubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdFx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0XHRpZiAoaW5mby51cmwgPT09IHRoaXMuX2F1dGhPcHRpb25zPy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uXCIsIGVycm9yKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHdpbmRvd1RvQ2hlY2spKSB7XG5cdFx0XHRcdGF3YWl0IHdpbmRvd1RvQ2hlY2suY2xvc2UodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpc0F1dGhlbnRpY2F0ZWQ7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHtcblx0RW5kcG9pbnQsXG5cdEVuZHBvaW50RGVmaW5pdGlvbixcblx0RmV0Y2hPcHRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9zZXR0aW5nLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXMsIEV4YW1wbGVFbmRwb2ludE9wdGlvbnMsIEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIEV4YW1wbGUgYXV0aGVudGljYXRpb24gZW5kcG9pbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aEVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQ8RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4ge1xuXHRwcml2YXRlIF9kZWZpbml0aW9uPzogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPjtcblxuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfcm9sZU1hcHBpbmc/OiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM/OiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJFeGFtcGxlQXV0aEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0XHR0aGlzLl9yb2xlTWFwcGluZyA9IGRlZmluaXRpb24/LmRhdGE/LnJvbGVNYXBwaW5nO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPEZldGNoT3B0aW9ucz4sXG5cdFx0cmVxdWVzdD86IHVua25vd25cblx0KTogUHJvbWlzZTxcblx0XHRDdXN0b21TZXR0aW5ncyB8IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gfCB7IGFwcGxpY2F0aW9uczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB9IHwgbnVsbFxuXHQ+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fbG9nZ2VyKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFwiVGhpcyBhdXRoIGVuZHBvaW50IG1vZHVsZSBpcyBhbiBleGFtcGxlIHRoYXQgdGhhdCBzaW11bGF0ZXMgcmVxdWVzdGluZyBhIGh0dHAgZW5kcG9pbnQgYW5kIG1hbmlwdWxhdGluZyBpdCBiYXNlZCBvbiB0aGUgY3VycmVudCBleGFtcGxlIHVzZXIgYXMgaWYgaXQgd2FzIHRoZSBzZXJ2ZXIgZG9pbmcgdGhlIG1hbmlwdWxhdGlvbi4gRE8gTk9UIFVTRSBUSElTIE1PRFVMRSBJTiBQUk9EVUNUSU9OLlwiXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgdXJsLCAuLi5vcHRpb25zIH06IEZldGNoT3B0aW9ucyA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXG5cdFx0Y29uc3QgcmVxID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyh1cmwgYXMgc3RyaW5nLCBvcHRpb25zLCByZXF1ZXN0IGFzIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSk7XG5cdFx0aWYgKHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXEub3B0aW9ucy5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gc3BlY2lmaWVzIGEgdHlwZTogJHtlbmRwb2ludERlZmluaXRpb24udHlwZX0gd2l0aCBhIG1ldGhvZCAke3JlcS5vcHRpb25zLm1ldGhvZH0gdGhhdCBpcyBub3Qgc3VwcG9ydGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcS51cmwsIHJlcS5vcHRpb25zIGFzIFJlcXVlc3RJbml0KTtcblxuXHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0Y29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcblx0XHRcdFx0Ly8gcmV0dXJuZWQgYXBwc1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24gYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoanNvbi5hcHBsaWNhdGlvbnMpKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zOiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbi5hcHBsaWNhdGlvbnMgYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vIHNldHRpbmdzXG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhqc29uIGFzIEN1c3RvbVNldHRpbmdzKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCB0aGUgb3B0aW9ucyB0byByZXF1ZXN0IGRhdGEuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybC5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IG9iamVjdCB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIG9wdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKFxuXHRcdHVybDogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IEZldGNoT3B0aW9ucyxcblx0XHRyZXF1ZXN0OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH1cblx0KTogeyB1cmw6IHN0cmluZzsgb3B0aW9uczogRmV0Y2hPcHRpb25zIH0ge1xuXHRcdGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXF1ZXN0KTtcblx0XHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKGBbJHtrZXlzW2ldfV1gLCBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdFtrZXlzW2ldXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGUgY3VycmVudCB1c2VyIHNldHRpbmdzIHRvIHRoZSBhcHBsaWNhdGlvbnMuXG5cdCAqIEBwYXJhbSBhcHBzIFRoZSBsaXN0IG9mIGFwcHMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGFwcHMgZmlsdGVyZWQgZm9yIHVzZSBieSB0aGUgdXNlci5cblx0ICovXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKTogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoY3VycmVudFVzZXIpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSkgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGFwcHM7XG5cdFx0fVxuXHRcdGNvbnN0IGV4Y2x1ZGVUYWcgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cblx0XHRjb25zdCBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSkge1xuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBsb29rdXA6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gYXBwLnRhZ3MgPz8gYXBwLmNhdGVnb3JpZXM7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGxvb2t1cCkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5pbmNsdWRlSW5SZXNwb25zZShsb29rdXAsIGV4Y2x1ZGVUYWcpKSB7XG5cdFx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBsaWNhdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZSB0aGUgdGFncyB3aXRoIHRoZSBleGNsdWRlIGxpc3QgdG8gc2VlIGlmIHRoZXkgc2hvdWxkIGJlIHVzZWQuXG5cdCAqIEBwYXJhbSB0YWdzIFRoZSB0YWdzIHRvIGNoZWNrLlxuXHQgKiBAcGFyYW0gZXhjbHVkZVRhZ3MgVGhlIGV4Y2x1ZGUgbGlzdCB0byBjaGVjayBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHNob3VsZCBiZSBpbmNsdWRlZC5cblx0ICovXG5cdHByaXZhdGUgaW5jbHVkZUluUmVzcG9uc2UodGFnczogc3RyaW5nW10sIGV4Y2x1ZGVUYWdzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuXHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXhjbHVkZVRhZ3MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuXHRcdFx0Y29uc3QgY3VycmVudFRhZzogc3RyaW5nID0gdGFnO1xuXHRcdFx0aWYgKGV4Y2x1ZGVUYWdzLmluY2x1ZGVzKGN1cnJlbnRUYWcpKSB7XG5cdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpbmNsdWRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBjdXN0b20gc2V0dGluZ3MuXG5cdCAqIEBwYXJhbSBzZXR0aW5ncyBUaGUgc2V0dGluZ3MgdG8gZmlsdGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgZmlsdGVyZWQgc2V0dGluZ3MuXG5cdCAqL1xuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncyk6IEN1c3RvbVNldHRpbmdzIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShjdXJyZW50VXNlcikgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmcpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9kZWZpbml0aW9uKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHNldHRpbmdzO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1vZHVsZXMgPSBzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8ubW9kdWxlcztcblx0XHRpZiAoQXJyYXkuaXNBcnJheShtb2R1bGVzKSkge1xuXHRcdFx0bW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0ZGF0YTogdGhpcy5fZGVmaW5pdGlvbixcblx0XHRcdFx0ZW5hYmxlZDogdGhpcy5fZGVmaW5pdGlvbi5lbmFibGVkLFxuXHRcdFx0XHRpZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuX2RlZmluaXRpb24uZGVzY3JpcHRpb24sXG5cdFx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24uaWNvbixcblx0XHRcdFx0aW5mbzogdGhpcy5fZGVmaW5pdGlvbi5pbmZvLFxuXHRcdFx0XHR0aXRsZTogdGhpcy5fZGVmaW5pdGlvbi50aXRsZSxcblx0XHRcdFx0dXJsOiB0aGlzLl9kZWZpbml0aW9uLnVybFxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludFByb3ZpZGVycyA9IHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5lbmRwb2ludHM7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludElkcyA9IHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHM7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludFByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludElkcykpIHtcblx0XHRcdFx0bGV0IGNvdW50ID0gMDtcblx0XHRcdFx0Y29uc3QgdXBkYXRlRW5kcG9pbnRzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgZW5kcG9pbnQgb2YgYXBwRW5kcG9pbnRJZHMpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGVuZHBvaW50ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnQuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRcdFx0XHRcdFx0dXBkYXRlRW5kcG9pbnRzLnB1c2goeyBwb3NpdGlvbjogY291bnQsIHVybDogZW5kcG9pbnQgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludFRvVXBkYXRlID0gYXBwRW5kcG9pbnRQcm92aWRlcnMuZmluZChcblx0XHRcdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gZW5kcG9pbnQgJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50VG9VcGRhdGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlID0gXCJtb2R1bGVcIjtcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzIGlmIGNvbmRpdGlvbiBjaGVjayBpcyBoZXJlIHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweSB3aXRoIHRoZSBlbmRwb2ludCBzbyB0aGF0IHR5cGVJZCBjYW4gYmUgc2V0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUudHlwZSA9PT0gXCJtb2R1bGVcIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlSWQgPSB0aGlzLl9kZWZpbml0aW9uLmlkO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHVwZGF0ZUVuZHBvaW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0aWYgKGlzRW1wdHkoc2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlcikpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAoY29uc3QgbmV3RW5kcG9pbnRFbnRyeSBvZiB1cGRhdGVFbmRwb2ludHMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50SWQgPSBgYXV0aC1leGFtcGxlLWVuZHBvaW50LSR7bmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbn1gO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRJZHNbbmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbl0gPSBlbmRwb2ludElkO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRQcm92aWRlcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBlbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBuZXdFbmRwb2ludEVudHJ5LnVybFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCB0aGVtZVByb3ZpZGVyID0gc2V0dGluZ3MudGhlbWVQcm92aWRlcjtcblxuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoZW1lUHJvdmlkZXIpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoZW1lUHJvdmlkZXIudGhlbWVzKSAmJlxuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXMubGVuZ3RoID4gMCAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lKVxuXHRcdCkge1xuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcblx0XHRcdGNvbnN0IHN0b3JlZFNjaGVtZVByZWZlcmVuY2UgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tU2VsZWN0ZWRDb2xvclNjaGVtZWA7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFwiVGhpcyBpcyBhIGRlbW8gbW9kdWxlIHdoZXJlIHdlIGFyZSBjbGVhcmluZyB0aGUgbG9jYWxseSBzdG9yZWQgc2NoZW1lIHByZWZlcmVuY2UgaW4gb3JkZXIgdG8gc2hvdyBkaWZmZXJlbnQgc2NoZW1lJ3MgbGlnaHQvZGFyayBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gVGhpcyBtZWFucyB0aGF0IGl0IHdpbGwgYWx3YXlzIGJlIHNldCB0byB3aGF0IGlzIGluIHRoZSByb2xlIG1hcHBpbmcgaW5pdGlhbGx5IGFuZCBub3Qgd2hhdCBpdCBpcyBzZXQgdG8gbG9jYWxseSBvbiByZXN0YXJ0LlwiXG5cdFx0XHQpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXhjbHVkZU1lbnVBY3Rpb25JZHMgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlTWVudUFjdGlvbjtcblx0XHRjb25zdCBleGNsdWRlTWVudU1vZHVsZUlkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51TW9kdWxlO1xuXG5cdFx0Y29uc3QgYnJvd3NlclByb3ZpZGVycyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlcjtcblx0XHRpZiAoIWlzRW1wdHkoYnJvd3NlclByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShleGNsdWRlTWVudUFjdGlvbklkcykpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBnbG9iYWxNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgZ2xvYmFsTWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnbG9iYWxNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKGdsb2JhbE1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhnbG9iYWxNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRnbG9iYWxNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgcGFnZU1lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gcGFnZU1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAocGFnZU1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhwYWdlTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0cGFnZU1lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2aWV3TWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB2aWV3TWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmICh2aWV3TWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKHZpZXdNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHR2aWV3TWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBtZW51c1Byb3ZpZGVyID0gc2V0dGluZ3MubWVudXNQcm92aWRlcjtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eShtZW51c1Byb3ZpZGVyKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShleGNsdWRlTWVudU1vZHVsZUlkcykgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkobWVudXNQcm92aWRlci5tb2R1bGVzKVxuXHRcdCkge1xuXHRcdFx0Zm9yIChjb25zdCBtZW51TW9kdWxlIG9mIG1lbnVzUHJvdmlkZXIubW9kdWxlcykge1xuXHRcdFx0XHRjb25zdCBtZW51TW9kdWxlSWQ6IHN0cmluZyA9IG1lbnVNb2R1bGUuaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudU1vZHVsZUlkcy5pbmNsdWRlcyhtZW51TW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bWVudU1vZHVsZS5lbmFibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cbn1cbiIsImltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmV4cG9ydCBjb25zdCBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1FWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSYDtcblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2UuXG4gKiBAcmV0dXJucyBUaGUgY3VycmVudCB1c2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKTogRXhhbXBsZVVzZXIgfCB1bmRlZmluZWQge1xuXHRjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkpO1xuXHRpZiAoaXNFbXB0eShzdG9yZWRVc2VyKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRVc2VyKSBhcyBFeGFtcGxlVXNlcjtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGN1cnJlbnQgdXNlciBpbiBzdG9yYWdlLlxuICogQHBhcmFtIHVzZXIgVGhlIHVzZXIgdG8gc3RvcmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyOiBFeGFtcGxlVXNlcik6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgY3VycmVudCB1c2VyIGZyb20gc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ3VycmVudFVzZXIoKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi9hdXRoXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGF1dGg6IG5ldyBFeGFtcGxlQXV0aFByb3ZpZGVyKCksXG5cdGVuZHBvaW50OiBuZXcgRXhhbXBsZUF1dGhFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9