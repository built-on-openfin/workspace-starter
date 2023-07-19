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
                                    resolve(true);
                                    return;
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
                                resolve(false);
                            }
                        });
                        statusCheck = window.setInterval(async () => {
                            if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(win)) {
                                const info = await win.getInfo();
                                if (authMatch.test(info.url)) {
                                    window.clearInterval(statusCheck);
                                    await win.removeAllListeners();
                                    await win.close(true);
                                    resolve(true);
                                }
                            }
                            else {
                                resolve(false);
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
        for (const subscriberId of subscriberIds) {
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
                resolve(false);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO0FBQ3hELENBQUM7Ozs7Ozs7U0M5QkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFDSTtBQUUxQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsSUFBSSxFQUFFLElBQUksc0RBQW1CLEVBQUU7SUFDL0IsUUFBUSxFQUFFLElBQUksMERBQW1CLEVBQUU7Q0FDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2VuZHBvaW50LnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvdXRpbC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbHMgcmFuZG9tVVVJRCBpZiBydW5uaW5nIGluIGEgbm9uLXNlY3VyZSBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIHJhbmRvbSBVVUlELlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgKDE1ID4+IChOdW1iZXIoYykgLyA0KSk7XG5cdFx0cmV0dXJuIChcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHQoTnVtYmVyKGMpIF4gcm5kKS50b1N0cmluZygxNilcblx0XHQpO1xuXHR9XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hdXRoLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgZm9ybWF0RXJyb3IsIGlzRW1wdHksIGlzTnVtYmVyLCBpc1N0cmluZ1ZhbHVlLCByYW5kb21VVUlEIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlT3B0aW9ucywgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBjbGVhckN1cnJlbnRVc2VyLCBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhQcm92aWRlciBpbXBsZW1lbnRzIEF1dGhQcm92aWRlcjxFeGFtcGxlT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9hdXRoT3B0aW9ucz86IEV4YW1wbGVPcHRpb25zO1xuXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZWRJblN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlZE91dFN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH07XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZEtleT86IHN0cmluZztcblxuXHRwcml2YXRlIF9jdXJyZW50VXNlcj86IEV4YW1wbGVVc2VyO1xuXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWQ/OiBib29sZWFuO1xuXG5cdHByaXZhdGUgX3Nlc3Npb25FeHBpcnlDaGVja0lkPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyA9IHt9O1xuXHRcdHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMgPSB7fTtcblx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzID0ge307XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBdXRoRXhhbXBsZVwiKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEYDtcblxuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhPcHRpb25zKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSk7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3Vic2NyaWJlIHRvIG9uZSBvZiB0aGUgYXV0aCBldmVudHMuXG5cdCAqIEBwYXJhbSB0byBUaGUgZXZlbnQgdG8gc3Vic2NyaWJlIHRvLlxuXHQgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXHQgKiBAcmV0dXJucyBTdWJzY3JpcHRpb24gaWQgZm9yIHVuc3Vic2NyaWJpbmcgb3IgdW5kZWZpbmVkIGlmIGV2ZW50IHR5cGUgaXMgbm90IGF2YWlsYWJsZS5cblx0ICovXG5cdHB1YmxpYyBzdWJzY3JpYmUoXG5cdFx0dG86IFwibG9nZ2VkLWluXCIgfCBcImJlZm9yZS1sb2dnZWQtb3V0XCIgfCBcImxvZ2dlZC1vdXRcIiB8IFwic2Vzc2lvbi1leHBpcmVkXCIsXG5cdFx0Y2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD5cblx0KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBrZXkgPSByYW5kb21VVUlEKCk7XG5cdFx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0XHRzd2l0Y2ggKHRvKSB7XG5cdFx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnNba2V5XSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnNba2V5XSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0XHR0aGlzLl9zdWJzY3JpYmVJZE1hcFtrZXldID0gdG87XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVuc3Vic2NyaWJlIGZyb20gYW4gYWxyZWFkeSBzdWJzY3JpYmVkIGV2ZW50LlxuXHQgKiBAcGFyYW0gc3Vic2NyaXB0aW9uSWQgVGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24gcmV0dXJuZWQgZnJvbSBzdWJzY3JpYmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVuc3Vic2NyaWJlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIHVuc3Vic2NyaWJlKHN1YnNjcmlwdGlvbklkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXHRcdGNvbnN0IGV2ZW50VHlwZSA9IHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXTtcblx0XHRpZiAoaXNFbXB0eShldmVudFR5cGUpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFlvdSBoYXZlIHRyaWVkIHRvIHVuc3Vic2NyaWJlIHdpdGggYSBrZXkgJHtzdWJzY3JpcHRpb25JZH0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChldmVudFR5cGUpIHtcblx0XHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF07XG5cdFx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfSBoYXMgYmVlbiBjbGVhcmVkYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH0gY291bGQgbm90IGJlIGNsZWFyZWQgYXMgd2UgZG8gbm90IGhhdmUgYSByZWdpc3RlciBvZiB0aGF0IGV2ZW50IHR5cGUuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERvZXMgdGhlIGF1dGggcHJvdmlkZXIgcmVxdWlyZSBhdXRoZW50aWNhdGlvbi5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkpIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ2luIG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwibG9naW4gcmVxdWVzdGVkXCIpO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnM/LmF1dG9Mb2dpbikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW5cIik7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGF3YWl0IHRoaXMuZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5LCB0aGlzLl9hdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtaW5cIiwgdGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBsb2dvdXQgb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dvdXQgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTG9nIG91dCBjYWxsZWRcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChhc3luYyAoZXJyb3IpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9nIG91dCAke2Vycm9yfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgdXNlciBpbmZvcm1hdGlvbi5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVGhpcyBleGFtcGxlIHJldHVybnMgYSB1c2VyIGlmIGl0IHdhcyBwcm92aWRlZCB0byB0aGUgZXhhbXBsZSBsb2dpblwiKTtcblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50VXNlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGF1dGhlbnRpY2F0aW9uIGZyb20gdGhlIHVzZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMub3BlbkxvZ2luV2luZG93KHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luVXJsKVxuXHRcdFx0XHRcdC50aGVuKGFzeW5jIChvcGVuZWRXaW4pID0+IHtcblx0XHRcdFx0XHRcdGxldCB3aW46IE9wZW5GaW4uV2luZG93IHwgdW5kZWZpbmVkID0gb3BlbmVkV2luO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGF1dGhNYXRjaCA9IG5ldyBSZWdFeHAodGhpcy5fYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCwgXCJpXCIpO1xuXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7Zm9ybWF0RXJyb3IoZXJyb3IpfWBcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiQXV0aCBXaW5kb3cgY2FuY2VsbGVkIGJ5IHVzZXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuX2F1dGhPcHRpb25zLmNoZWNrTG9naW5TdGF0dXNJblNlY29uZHMgPz8gMSAqIDEwMDApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gYXV0aGVudGljYXRlIHRoZSB1c2VyXCIsIGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB0byBzZWUgaWYgYSBzZXNzaW9uIGhhcyBleHBpcmVkLlxuXHQgKi9cblx0cHJpdmF0ZSBjaGVja0ZvclNlc3Npb25FeHBpcnkoKTogdm9pZCB7XG5cdFx0Y29uc3QgdmFsaWRpdHkgPSB0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHM7XG5cdFx0aWYgKGlzTnVtYmVyKHZhbGlkaXR5KSAmJiB2YWxpZGl0eSA+IC0xICYmIGlzRW1wdHkodGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQpKSB7XG5cdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5jaGVja0F1dGgodGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcInNlc3Npb24tZXhwaXJlZFwiLCB0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sIHZhbGlkaXR5ICogMTAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmeSBzdWJzY3JpYmVycyBvZiBhbiBldmVudCBjaGFuZ2UuXG5cdCAqIEBwYXJhbSBldmVudFR5cGUgVGhlIGV2ZW50IHRvIG5vdGlmeS5cblx0ICogQHBhcmFtIHN1YnNjcmliZXJzIFRoZSBzdWJzY3JpYmVycyBmb3IgdGhlIGV2ZW50LlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBub3RpZnlTdWJzY3JpYmVycyhcblx0XHRldmVudFR5cGU6IHN0cmluZyxcblx0XHRzdWJzY3JpYmVyczogeyBbaWQ6IHN0cmluZ106ICgpID0+IFByb21pc2U8dm9pZD4gfVxuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWRzID0gT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpO1xuXHRcdHN1YnNjcmliZXJJZHMucmV2ZXJzZSgpO1xuXG5cdFx0Zm9yIChjb25zdCBzdWJzY3JpYmVySWQgb2Ygc3Vic2NyaWJlcklkcykge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRgTm90aWZ5aW5nIHN1YnNjcmliZXIgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaWJlcklkfSBvZiBldmVudCB0eXBlOiAke2V2ZW50VHlwZX1gXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgc3Vic2NyaWJlcnNbc3Vic2NyaWJlcklkXSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbG9nb3V0LlxuXHQgKiBAcGFyYW0gcmVzb2x2ZSBUaGUgcmVzb2x2ZSBtZXRob2QgdG8gY2FsbCBhZnRlciBsb2dvdXQuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGhhbmRsZUxvZ291dChyZXNvbHZlOiAoc3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHx8ICF0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiWW91IGhhdmUgcmVxdWVzdGVkIHRvIGxvZyBvdXQgYnV0IGFyZSBub3QgbG9nZ2VkIGluXCIpO1xuXHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkxvZyBvdXQgcmVxdWVzdGVkXCIpO1xuXHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJiZWZvcmUtbG9nZ2VkLW91dFwiLCB0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHR9XG5cdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdGNvbnN0IGxvZ291dFVybCA9IHRoaXMuX2F1dGhPcHRpb25zPy5sb2dvdXRVcmw7XG5cdFx0aWYgKGlzU3RyaW5nVmFsdWUobG9nb3V0VXJsKSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgdGhpcy5vcGVuTG9nb3V0V2luZG93KGxvZ291dFVybCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHR9LCAyMDAwKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIGxhdW5jaGluZyBsb2dvdXQgd2luZG93LiAke2Vycm9yfWApO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gb3BlbiBmb3IgdGhlIGxvZ2luIHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyB0aGF0IHdhcyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9naW5XaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdFx0Y29uc3QgZW5yaWNoZWRDdXN0b21EYXRhID0ge1xuXHRcdFx0Y3VycmVudFVzZXJLZXk6IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLFxuXHRcdFx0Li4udGhpcy5fYXV0aE9wdGlvbnM/LmN1c3RvbURhdGFcblx0XHR9O1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybCxcblx0XHRcdGN1c3RvbURhdGE6IGVucmljaGVkQ3VzdG9tRGF0YVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCBmb3IgdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgY3JlYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLW91dFwiLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0dXMuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNoZWNrQXV0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHRcdGxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbmRvd1RvQ2hlY2suZ2V0SW5mbygpO1xuXHRcdFx0aWYgKGluZm8udXJsID09PSB0aGlzLl9hdXRoT3B0aW9ucz8uYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICghaXNFbXB0eSh3aW5kb3dUb0NoZWNrKSkge1xuXHRcdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEVuZHBvaW50LFxuXHRFbmRwb2ludERlZmluaXRpb24sXG5cdEZldGNoT3B0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2V0dGluZy1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzLCBFeGFtcGxlRW5kcG9pbnRPcHRpb25zLCBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIGVuZHBvaW50LlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50PEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+IHtcblx0cHJpdmF0ZSBfZGVmaW5pdGlvbj86IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz47XG5cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX3JvbGVNYXBwaW5nPzogeyBba2V5OiBzdHJpbmddOiBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH07XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzPzogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRXhhbXBsZUF1dGhFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdFx0dGhpcy5fcm9sZU1hcHBpbmcgPSBkZWZpbml0aW9uPy5kYXRhPy5yb2xlTWFwcGluZztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxGZXRjaE9wdGlvbnM+LFxuXHRcdHJlcXVlc3Q/OiB1bmtub3duXG5cdCk6IFByb21pc2U8XG5cdFx0Q3VzdG9tU2V0dGluZ3MgfCBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIHwgeyBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gfSB8IG51bGxcblx0PiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2xvZ2dlcikpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcIlRoaXMgYXV0aCBlbmRwb2ludCBtb2R1bGUgaXMgYW4gZXhhbXBsZSB0aGF0IHRoYXQgc2ltdWxhdGVzIHJlcXVlc3RpbmcgYSBodHRwIGVuZHBvaW50IGFuZCBtYW5pcHVsYXRpbmcgaXQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZXhhbXBsZSB1c2VyIGFzIGlmIGl0IHdhcyB0aGUgc2VydmVyIGRvaW5nIHRoZSBtYW5pcHVsYXRpb24uIERPIE5PVCBVU0UgVEhJUyBNT0RVTEUgSU4gUFJPRFVDVElPTi5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCB7IHVybCwgLi4ub3B0aW9ucyB9OiBGZXRjaE9wdGlvbnMgPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblxuXHRcdGNvbnN0IHJlcSA9IHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnModXJsIGFzIHN0cmluZywgb3B0aW9ucywgcmVxdWVzdCBhcyB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0pO1xuXHRcdGlmIChyZXEub3B0aW9ucy5tZXRob2QgIT09IFwiR0VUXCIgJiYgcmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIlBPU1RcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgJHtlbmRwb2ludERlZmluaXRpb24uaWR9IHNwZWNpZmllcyBhIHR5cGU6ICR7ZW5kcG9pbnREZWZpbml0aW9uLnR5cGV9IHdpdGggYSBtZXRob2QgJHtyZXEub3B0aW9ucy5tZXRob2R9IHRoYXQgaXMgbm90IHN1cHBvcnRlZC5gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXEudXJsLCByZXEub3B0aW9ucyBhcyBSZXF1ZXN0SW5pdCk7XG5cblx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG5cdFx0XHRcdC8vIHJldHVybmVkIGFwcHNcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvQXBwcyhqc29uIGFzIEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGpzb24uYXBwbGljYXRpb25zKSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uczogdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24uYXBwbGljYXRpb25zIGFzIEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvLyBzZXR0aW5nc1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3MoanNvbiBhcyBDdXN0b21TZXR0aW5ncyk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgdGhlIG9wdGlvbnMgdG8gcmVxdWVzdCBkYXRhLlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwuXG5cdCAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3QgdG8gY29udmVydC5cblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBvcHRpb25zLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRSZXF1ZXN0T3B0aW9ucyhcblx0XHR1cmw6IHN0cmluZyxcblx0XHRvcHRpb25zOiBGZXRjaE9wdGlvbnMsXG5cdFx0cmVxdWVzdDogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9XG5cdCk6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGlmICghaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVxdWVzdCk7XG5cdFx0XHRcdGlmIChrZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR1cmwgPSB1cmwucmVwbGFjZShgWyR7a2V5c1tpXX1dYCwgZW5jb2RlVVJJQ29tcG9uZW50KHJlcXVlc3Rba2V5c1tpXV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMubWV0aG9kID09PSBcIlBPU1RcIiAmJiAhaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHsgdXJsLCBvcHRpb25zIH07XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlIGN1cnJlbnQgdXNlciBzZXR0aW5ncyB0byB0aGUgYXBwbGljYXRpb25zLlxuXHQgKiBAcGFyYW0gYXBwcyBUaGUgbGlzdCBvZiBhcHBzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBhcHBzIGZpbHRlcmVkIGZvciB1c2UgYnkgdGhlIHVzZXIuXG5cdCAqL1xuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb0FwcHMoYXBwczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSk6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10ge1xuXHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGN1cnJlbnRVc2VyKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZykgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0pIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZylcblx0XHQpIHtcblx0XHRcdHJldHVybiBhcHBzO1xuXHRcdH1cblx0XHRjb25zdCBleGNsdWRlVGFnID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnO1xuXG5cdFx0Y29uc3QgYXBwbGljYXRpb25zOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykpIHtcblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdFx0Y29uc3QgbG9va3VwOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IGFwcC50YWdzID8/IGFwcC5jYXRlZ29yaWVzO1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShsb29rdXApKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaW5jbHVkZUluUmVzcG9uc2UobG9va3VwLCBleGNsdWRlVGFnKSkge1xuXHRcdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwbGljYXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmUgdGhlIHRhZ3Mgd2l0aCB0aGUgZXhjbHVkZSBsaXN0IHRvIHNlZSBpZiB0aGV5IHNob3VsZCBiZSB1c2VkLlxuXHQgKiBAcGFyYW0gdGFncyBUaGUgdGFncyB0byBjaGVjay5cblx0ICogQHBhcmFtIGV4Y2x1ZGVUYWdzIFRoZSBleGNsdWRlIGxpc3QgdG8gY2hlY2sgYWdhaW5zdC5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSBzaG91bGQgYmUgaW5jbHVkZWQuXG5cdCAqL1xuXHRwcml2YXRlIGluY2x1ZGVJblJlc3BvbnNlKHRhZ3M6IHN0cmluZ1tdLCBleGNsdWRlVGFnczogc3RyaW5nW10pOiBib29sZWFuIHtcblx0XHRsZXQgaW5jbHVkZSA9IHRydWU7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV4Y2x1ZGVUYWdzKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRUYWc6IHN0cmluZyA9IHRhZztcblx0XHRcdGlmIChleGNsdWRlVGFncy5pbmNsdWRlcyhjdXJyZW50VGFnKSkge1xuXHRcdFx0XHRpbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaW5jbHVkZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGUgdXNlciBzZXR0aW5ncyB0byB0aGUgY3VzdG9tIHNldHRpbmdzLlxuXHQgKiBAcGFyYW0gc2V0dGluZ3MgVGhlIHNldHRpbmdzIHRvIGZpbHRlci5cblx0ICogQHJldHVybnMgVGhlIGZpbHRlcmVkIHNldHRpbmdzLlxuXHQgKi9cblx0cHJpdmF0ZSBhcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhzZXR0aW5nczogQ3VzdG9tU2V0dGluZ3MpOiBDdXN0b21TZXR0aW5ncyB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoY3VycmVudFVzZXIpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSkgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fZGVmaW5pdGlvbilcblx0XHQpIHtcblx0XHRcdHJldHVybiBzZXR0aW5ncztcblx0XHR9XG5cblx0XHRjb25zdCBtb2R1bGVzID0gc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/Lm1vZHVsZXM7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobW9kdWxlcykpIHtcblx0XHRcdG1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdGRhdGE6IHRoaXMuX2RlZmluaXRpb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHRoaXMuX2RlZmluaXRpb24uZW5hYmxlZCxcblx0XHRcdFx0aWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLl9kZWZpbml0aW9uLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uLmljb24sXG5cdFx0XHRcdGluZm86IHRoaXMuX2RlZmluaXRpb24uaW5mbyxcblx0XHRcdFx0dGl0bGU6IHRoaXMuX2RlZmluaXRpb24udGl0bGUsXG5cdFx0XHRcdHVybDogdGhpcy5fZGVmaW5pdGlvbi51cmxcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRQcm92aWRlcnMgPSBzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8uZW5kcG9pbnRzO1xuXHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRJZHMgPSBzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzO1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwRW5kcG9pbnRQcm92aWRlcnMpICYmIEFycmF5LmlzQXJyYXkoYXBwRW5kcG9pbnRJZHMpKSB7XG5cdFx0XHRcdGxldCBjb3VudCA9IDA7XG5cdFx0XHRcdGNvbnN0IHVwZGF0ZUVuZHBvaW50cyA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGVuZHBvaW50IG9mIGFwcEVuZHBvaW50SWRzKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBlbmRwb2ludCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50LnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZUVuZHBvaW50cy5wdXNoKHsgcG9zaXRpb246IGNvdW50LCB1cmw6IGVuZHBvaW50IH0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRUb1VwZGF0ZSA9IGFwcEVuZHBvaW50UHJvdmlkZXJzLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGVuZHBvaW50RW50cnkpID0+IGVuZHBvaW50RW50cnkuaWQgPT09IGVuZHBvaW50ICYmIGVuZHBvaW50RW50cnkudHlwZSA9PT0gXCJmZXRjaFwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShlbmRwb2ludFRvVXBkYXRlKSkge1xuXHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZSA9IFwibW9kdWxlXCI7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhpcyBpZiBjb25kaXRpb24gY2hlY2sgaXMgaGVyZSB0byBtYWtlIHR5cGVzY3JpcHQgaGFwcHkgd2l0aCB0aGUgZW5kcG9pbnQgc28gdGhhdCB0eXBlSWQgY2FuIGJlIHNldFxuXHRcdFx0XHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlLnR5cGUgPT09IFwibW9kdWxlXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gdGhpcy5fZGVmaW5pdGlvbi5pZDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh1cGRhdGVFbmRwb2ludHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGlmIChpc0VtcHR5KHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIpKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyID0ge1xuXHRcdFx0XHRcdFx0XHRlbmRwb2ludHM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKGNvbnN0IG5ld0VuZHBvaW50RW50cnkgb2YgdXBkYXRlRW5kcG9pbnRzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludElkID0gYGF1dGgtZXhhbXBsZS1lbmRwb2ludC0ke25ld0VuZHBvaW50RW50cnkucG9zaXRpb259YDtcblx0XHRcdFx0XHRcdGFwcEVuZHBvaW50SWRzW25ld0VuZHBvaW50RW50cnkucG9zaXRpb25dID0gZW5kcG9pbnRJZDtcblx0XHRcdFx0XHRcdGFwcEVuZHBvaW50UHJvdmlkZXJzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZDogZW5kcG9pbnRJZCxcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJtb2R1bGVcIixcblx0XHRcdFx0XHRcdFx0dHlwZUlkOiB0aGlzLl9kZWZpbml0aW9uLmlkLFxuXHRcdFx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxuXHRcdFx0XHRcdFx0XHRcdHVybDogbmV3RW5kcG9pbnRFbnRyeS51cmxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGhlbWVQcm92aWRlciA9IHNldHRpbmdzLnRoZW1lUHJvdmlkZXI7XG5cblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGVtZVByb3ZpZGVyKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheSh0aGVtZVByb3ZpZGVyLnRoZW1lcykgJiZcblx0XHRcdHRoZW1lUHJvdmlkZXIudGhlbWVzLmxlbmd0aCA+IDAgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSlcblx0XHQpIHtcblx0XHRcdHRoZW1lUHJvdmlkZXIudGhlbWVzWzBdLmRlZmF1bHQgPVxuXHRcdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgPT09IFwiZGFya1wiID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG5cdFx0XHRjb25zdCBzdG9yZWRTY2hlbWVQcmVmZXJlbmNlID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LVNlbGVjdGVkQ29sb3JTY2hlbWVgO1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcIlRoaXMgaXMgYSBkZW1vIG1vZHVsZSB3aGVyZSB3ZSBhcmUgY2xlYXJpbmcgdGhlIGxvY2FsbHkgc3RvcmVkIHNjaGVtZSBwcmVmZXJlbmNlIGluIG9yZGVyIHRvIHNob3cgZGlmZmVyZW50IHNjaGVtZSdzIGxpZ2h0L2RhcmsgYmFzZWQgb24gdXNlciBzZWxlY3Rpb24uIFRoaXMgbWVhbnMgdGhhdCBpdCB3aWxsIGFsd2F5cyBiZSBzZXQgdG8gd2hhdCBpcyBpbiB0aGUgcm9sZSBtYXBwaW5nIGluaXRpYWxseSBhbmQgbm90IHdoYXQgaXQgaXMgc2V0IHRvIGxvY2FsbHkgb24gcmVzdGFydC5cIlxuXHRcdFx0KTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JlZFNjaGVtZVByZWZlcmVuY2UpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51QWN0aW9uSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVBY3Rpb247XG5cdFx0Y29uc3QgZXhjbHVkZU1lbnVNb2R1bGVJZHMgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlTWVudU1vZHVsZTtcblxuXHRcdGNvbnN0IGJyb3dzZXJQcm92aWRlcnMgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXI7XG5cdFx0aWYgKCFpc0VtcHR5KGJyb3dzZXJQcm92aWRlcnMpICYmIEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVBY3Rpb25JZHMpKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgZ2xvYmFsTWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IGdsb2JhbE1lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gZ2xvYmFsTWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChnbG9iYWxNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMoZ2xvYmFsTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0Z2xvYmFsTWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhZ2VNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHBhZ2VNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKHBhZ2VNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMocGFnZU1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHBhZ2VNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy52aWV3TWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy52aWV3TWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3Qgdmlld01lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld01lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdmlld01lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAodmlld01lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0dmlld01lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWVudXNQcm92aWRlciA9IHNldHRpbmdzLm1lbnVzUHJvdmlkZXI7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkobWVudXNQcm92aWRlcikgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVNb2R1bGVJZHMpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KG1lbnVzUHJvdmlkZXIubW9kdWxlcylcblx0XHQpIHtcblx0XHRcdGZvciAoY29uc3QgbWVudU1vZHVsZSBvZiBtZW51c1Byb3ZpZGVyLm1vZHVsZXMpIHtcblx0XHRcdFx0Y29uc3QgbWVudU1vZHVsZUlkOiBzdHJpbmcgPSBtZW51TW9kdWxlLmlkO1xuXHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVNb2R1bGVJZHMuaW5jbHVkZXMobWVudU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1lbnVNb2R1bGUuZW5hYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldHRpbmdzO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUmA7XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICogQHJldHVybnMgVGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCk6IEV4YW1wbGVVc2VyIHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKGlzRW1wdHkoc3RvcmVkVXNlcikpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IHVzZXIgaW4gc3RvcmFnZS5cbiAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIHRvIHN0b3JlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcjogRXhhbXBsZVVzZXIpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCk6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBuZXcgRXhhbXBsZUF1dGhQcm92aWRlcigpLFxuXHRlbmRwb2ludDogbmV3IEV4YW1wbGVBdXRoRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==