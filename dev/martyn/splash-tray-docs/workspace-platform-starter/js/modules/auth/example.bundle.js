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
        const subscriptionId = (0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(eventType)) {
            this._logger?.warn(`You have tried to unsubscribe with a key ${subscriptionId} that is invalid`);
            return false;
        }
        const eventSubscribers = this._eventSubscribers[eventType];
        if (!(0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(eventSubscribers)) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this._authenticated) || !this._authenticated) {
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
        if ((0,_framework_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(logoutUrl)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUN4RCxDQUFDOzs7Ozs7O1NDOUJEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBQ0k7QUFFMUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLElBQUksRUFBRSxJQUFJLHNEQUFtQixFQUFFO0lBQy9CLFFBQVEsRUFBRSxJQUFJLDBEQUFtQixFQUFFO0NBQ25DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2F1dGgudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhFdmVudFR5cGVzLCBBdXRoUHJvdmlkZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2F1dGgtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBmb3JtYXRFcnJvciwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzU3RyaW5nVmFsdWUsIHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVPcHRpb25zLCBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIGNsZWFyQ3VycmVudFVzZXIsIGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIEV4YW1wbGUgYXV0aGVudGljYXRpb24gcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aFByb3ZpZGVyIGltcGxlbWVudHMgQXV0aFByb3ZpZGVyPEV4YW1wbGVPcHRpb25zPiB7XG5cdC8qKlxuXHQgKiBUaGUgb3B0aW9ucyBmb3IgdGhlIHByb3ZpZGVyLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2F1dGhPcHRpb25zPzogRXhhbXBsZU9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIFRoZSBsb2dnZXIgZm9yIGRpc3BsYXlpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHQvKipcblx0ICogTWFwIGEgc3Vic2NyaXB0aW9uIGlkIHRvIGFuIGV2ZW50LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgX3N1YnNjcmliZUlkTWFwOiB7IFtrZXk6IHN0cmluZ106IEF1dGhFdmVudFR5cGVzIH07XG5cblx0LyoqXG5cdCAqIENhbGxiYWNrcyBmb3IgZXZlbnQgc3Vic2NyaWJlcnMuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBfZXZlbnRTdWJzY3JpYmVyczogeyBbZXZlbnQgaW4gQXV0aEV2ZW50VHlwZXNdPzogeyBbaWQ6IHN0cmluZ106ICgpID0+IFByb21pc2U8dm9pZD4gfSB9O1xuXG5cdC8qKlxuXHQgKiBUaGUga2V5IGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWRLZXk/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50IHVzZXIuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfY3VycmVudFVzZXI/OiBFeGFtcGxlVXNlcjtcblxuXHQvKipcblx0ICogQXJlIHdlIGF1dGhlbnRpY2F0ZWQuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZD86IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBmb3IgdGhlIGV4cGlyeSBjaGVjayB0aW1lci5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9zZXNzaW9uRXhwaXJ5Q2hlY2tJZD86IG51bWJlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEV4YW1wbGVBdXRoUHJvdmlkZXIuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9zdWJzY3JpYmVJZE1hcCA9IHt9O1xuXHRcdHRoaXMuX2V2ZW50U3Vic2NyaWJlcnMgPSB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkF1dGhFeGFtcGxlXCIpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURgO1xuXG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aE9wdGlvbnMpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU2V0dGluZyBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGRlZmluaXRpb24uZGF0YSwgbnVsbCwgNCl9YCk7XG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucyA9IGRlZmluaXRpb24uZGF0YTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpKTtcblx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXCJPcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHNldCBhcyBpbml0IGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJzY3JpYmUgdG8gb25lIG9mIHRoZSBhdXRoIGV2ZW50cy5cblx0ICogQHBhcmFtIHRvIFRoZSBldmVudCB0byBzdWJzY3JpYmUgdG8uXG5cdCAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG5cdCAqIEByZXR1cm5zIFN1YnNjcmlwdGlvbiBpZCBmb3IgdW5zdWJzY3JpYmluZyBvciB1bmRlZmluZWQgaWYgZXZlbnQgdHlwZSBpcyBub3QgYXZhaWxhYmxlLlxuXHQgKi9cblx0cHVibGljIHN1YnNjcmliZSh0bzogQXV0aEV2ZW50VHlwZXMsIGNhbGxiYWNrOiAoKSA9PiBQcm9taXNlPHZvaWQ+KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBzdWJzY3JpcHRpb25JZCA9IHJhbmRvbVVVSUQoKTtcblxuXHRcdGNvbnN0IHRvTWFwID0gdGhpcy5fZXZlbnRTdWJzY3JpYmVyc1t0b10gPz8ge307XG5cdFx0dG9NYXBbc3Vic2NyaXB0aW9uSWRdID0gY2FsbGJhY2s7XG5cdFx0dGhpcy5fZXZlbnRTdWJzY3JpYmVyc1t0b10gPSB0b01hcDtcblxuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXSA9IHRvO1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7dG99IGV2ZW50cyByZWdpc3RlcmVkLiBTdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaXB0aW9uSWR9YCk7XG5cblx0XHRyZXR1cm4gc3Vic2NyaXB0aW9uSWQ7XG5cdH1cblxuXHQvKipcblx0ICogVW5zdWJzY3JpYmUgZnJvbSBhbiBhbHJlYWR5IHN1YnNjcmliZWQgZXZlbnQuXG5cdCAqIEBwYXJhbSBzdWJzY3JpcHRpb25JZCBUaGUgaWQgb2YgdGhlIHN1YnNjcmlwdGlvbiByZXR1cm5lZCBmcm9tIHN1YnNjcmliZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdW5zdWJzY3JpYmUgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgdW5zdWJzY3JpYmUoc3Vic2NyaXB0aW9uSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IGV2ZW50VHlwZSA9IHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXTtcblx0XHRpZiAoaXNFbXB0eShldmVudFR5cGUpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFlvdSBoYXZlIHRyaWVkIHRvIHVuc3Vic2NyaWJlIHdpdGggYSBrZXkgJHtzdWJzY3JpcHRpb25JZH0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXZlbnRTdWJzY3JpYmVycyA9IHRoaXMuX2V2ZW50U3Vic2NyaWJlcnNbZXZlbnRUeXBlXTtcblx0XHRpZiAoIWlzRW1wdHkoZXZlbnRTdWJzY3JpYmVycykpIHtcblx0XHRcdGRlbGV0ZSBldmVudFN1YnNjcmliZXJzW3N1YnNjcmlwdGlvbklkXTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fc3Vic2NyaWJlSWRNYXBbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaXB0aW9uSWR9IGhhcyBiZWVuIGNsZWFyZWRgXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfSBjb3VsZCBub3QgYmUgY2xlYXJlZCBhcyB3ZSBkbyBub3QgaGF2ZSBhIHJlZ2lzdGVyIG9mIHRoYXQgZXZlbnQgdHlwZS5gXG5cdFx0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogRG9lcyB0aGUgYXV0aCBwcm92aWRlciByZXF1aXJlIGF1dGhlbnRpY2F0aW9uLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSkge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gIXRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9naW4gb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dpbiB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucz8uYXV0b0xvZ2luKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpblwiKTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5nZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSB7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXksIHRoaXMuX2F1dGhlbnRpY2F0ZWQudG9TdHJpbmcoKSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ291dCBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ291dCB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlTG9nb3V0KHJlc29sdmUpXG5cdFx0XHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJMb2cgb3V0IGNhbGxlZFwiKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGFzeW5jIChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIHRyeWluZyB0byBsb2cgb3V0ICR7ZXJyb3J9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB1c2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRoZSB1c2VyIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHx8ICF0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlciBpbmZvIHVubGVzcyB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJUaGlzIGV4YW1wbGUgcmV0dXJucyBhIHVzZXIgaWYgaXQgd2FzIHByb3ZpZGVkIHRvIHRoZSBleGFtcGxlIGxvZ2luXCIpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRVc2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYXV0aGVudGljYXRpb24gZnJvbSB0aGUgdXNlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5vcGVuTG9naW5XaW5kb3codGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHRcdFx0LnRoZW4oYXN5bmMgKG9wZW5lZFdpbikgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IHdpbjogT3BlbkZpbi5XaW5kb3cgfCB1bmRlZmluZWQgPSBvcGVuZWRXaW47XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYXV0aE1hdGNoID0gbmV3IFJlZ0V4cCh0aGlzLl9hdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsLCBcImlcIik7XG5cblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcblx0XHRcdFx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Zvcm1hdEVycm9yKGVycm9yKX1gXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkod2luKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c0NoZWNrOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmFkZExpc3RlbmVyKFwiY2xvc2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAod2luKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKFxuXHRcdFx0XHRcdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh3aW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmNoZWNrTG9naW5TdGF0dXNJblNlY29uZHMgPz8gMSAqIDEwMDBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclwiLCBlcnJvcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdG8gc2VlIGlmIGEgc2Vzc2lvbiBoYXMgZXhwaXJlZC5cblx0ICovXG5cdHByaXZhdGUgY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHZhbGlkaXR5ID0gdGhpcy5fYXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzO1xuXHRcdGlmIChpc051bWJlcih2YWxpZGl0eSkgJiYgdmFsaWRpdHkgPiAtMSAmJiBpc0VtcHR5KHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkKSkge1xuXHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl9hdXRoT3B0aW9ucykge1xuXHRcdFx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGNvbnN0IHN0aWxsQXV0aGVudGljYXRlZCA9IGF3YWl0IHRoaXMuY2hlY2tBdXRoKHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luVXJsKTtcblx0XHRcdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJTZXNzaW9uIFN0aWxsIEFjdGl2ZVwiKTtcblx0XHRcdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRcdFx0XCJTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS4gU2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJzZXNzaW9uLWV4cGlyZWRcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LCB2YWxpZGl0eSAqIDEwMDApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZnkgc3Vic2NyaWJlcnMgb2YgYW4gZXZlbnQgY2hhbmdlLlxuXHQgKiBAcGFyYW0gYXV0aEV2ZW50VHlwZSBUaGUgdHlwZSBvZiBhdXRoZW50aWNhdGlvbiBldmVudCB0byBzZW5kIHRvLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBub3RpZnlTdWJzY3JpYmVycyhhdXRoRXZlbnRUeXBlOiBBdXRoRXZlbnRUeXBlcyk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHN1YnNjcmliZXJzID0gdGhpcy5fZXZlbnRTdWJzY3JpYmVyc1thdXRoRXZlbnRUeXBlXTtcblxuXHRcdGlmIChzdWJzY3JpYmVycykge1xuXHRcdFx0Y29uc3Qgc3Vic2NyaWJlcklkcyA9IE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKTtcblx0XHRcdHN1YnNjcmliZXJJZHMucmV2ZXJzZSgpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IHN1YnNjcmliZXJJZCBvZiBzdWJzY3JpYmVySWRzKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0XHRgTm90aWZ5aW5nIHN1YnNjcmliZXIgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7c3Vic2NyaWJlcklkfSBvZiBldmVudCB0eXBlOiAke2F1dGhFdmVudFR5cGV9YFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRhd2FpdCBzdWJzY3JpYmVyc1tzdWJzY3JpYmVySWRdKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBsb2dvdXQuXG5cdCAqIEBwYXJhbSByZXNvbHZlIFRoZSByZXNvbHZlIG1ldGhvZCB0byBjYWxsIGFmdGVyIGxvZ291dC5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImJlZm9yZS1sb2dnZWQtb3V0XCIpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0fVxuXHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHRjb25zdCBsb2dvdXRVcmwgPSB0aGlzLl9hdXRoT3B0aW9ucz8ubG9nb3V0VXJsO1xuXHRcdGlmIChpc1N0cmluZ1ZhbHVlKGxvZ291dFVybCkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHdpbiA9IGF3YWl0IHRoaXMub3BlbkxvZ291dFdpbmRvdyhsb2dvdXRVcmwpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UoKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHR9LCAyMDAwKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIGxhdW5jaGluZyBsb2dvdXQgd2luZG93LiAke2Vycm9yfWApO1xuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIpO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gb3BlbiBmb3IgdGhlIGxvZ2luIHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyB0aGF0IHdhcyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9naW5XaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdFx0Y29uc3QgZW5yaWNoZWRDdXN0b21EYXRhID0ge1xuXHRcdFx0Y3VycmVudFVzZXJLZXk6IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLFxuXHRcdFx0Li4udGhpcy5fYXV0aE9wdGlvbnM/LmN1c3RvbURhdGFcblx0XHR9O1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybCxcblx0XHRcdGN1c3RvbURhdGE6IGVucmljaGVkQ3VzdG9tRGF0YVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCBmb3IgdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgY3JlYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLW91dFwiLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0dXMuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNoZWNrQXV0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHRcdGxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbmRvd1RvQ2hlY2suZ2V0SW5mbygpO1xuXHRcdFx0aWYgKGluZm8udXJsID09PSB0aGlzLl9hdXRoT3B0aW9ucz8uYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICghaXNFbXB0eSh3aW5kb3dUb0NoZWNrKSkge1xuXHRcdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEVuZHBvaW50LFxuXHRFbmRwb2ludERlZmluaXRpb24sXG5cdEZldGNoT3B0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2V0dGluZy1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzLCBFeGFtcGxlRW5kcG9pbnRPcHRpb25zLCBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIGVuZHBvaW50LlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhFbmRwb2ludCBpbXBsZW1lbnRzIEVuZHBvaW50PEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+IHtcblx0cHJpdmF0ZSBfZGVmaW5pdGlvbj86IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz47XG5cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX3JvbGVNYXBwaW5nPzogeyBba2V5OiBzdHJpbmddOiBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH07XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzPzogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRXhhbXBsZUF1dGhFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdFx0dGhpcy5fcm9sZU1hcHBpbmcgPSBkZWZpbml0aW9uPy5kYXRhPy5yb2xlTWFwcGluZztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxGZXRjaE9wdGlvbnM+LFxuXHRcdHJlcXVlc3Q/OiB1bmtub3duXG5cdCk6IFByb21pc2U8XG5cdFx0Q3VzdG9tU2V0dGluZ3MgfCBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdIHwgeyBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gfSB8IG51bGxcblx0PiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2xvZ2dlcikpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcIlRoaXMgYXV0aCBlbmRwb2ludCBtb2R1bGUgaXMgYW4gZXhhbXBsZSB0aGF0IHRoYXQgc2ltdWxhdGVzIHJlcXVlc3RpbmcgYSBodHRwIGVuZHBvaW50IGFuZCBtYW5pcHVsYXRpbmcgaXQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZXhhbXBsZSB1c2VyIGFzIGlmIGl0IHdhcyB0aGUgc2VydmVyIGRvaW5nIHRoZSBtYW5pcHVsYXRpb24uIERPIE5PVCBVU0UgVEhJUyBNT0RVTEUgSU4gUFJPRFVDVElPTi5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCB7IHVybCwgLi4ub3B0aW9ucyB9OiBGZXRjaE9wdGlvbnMgPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblxuXHRcdGNvbnN0IHJlcSA9IHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnModXJsIGFzIHN0cmluZywgb3B0aW9ucywgcmVxdWVzdCBhcyB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0pO1xuXHRcdGlmIChyZXEub3B0aW9ucy5tZXRob2QgIT09IFwiR0VUXCIgJiYgcmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIlBPU1RcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRgJHtlbmRwb2ludERlZmluaXRpb24uaWR9IHNwZWNpZmllcyBhIHR5cGU6ICR7ZW5kcG9pbnREZWZpbml0aW9uLnR5cGV9IHdpdGggYSBtZXRob2QgJHtyZXEub3B0aW9ucy5tZXRob2R9IHRoYXQgaXMgbm90IHN1cHBvcnRlZC5gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXEudXJsLCByZXEub3B0aW9ucyBhcyBSZXF1ZXN0SW5pdCk7XG5cblx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG5cdFx0XHRcdC8vIHJldHVybmVkIGFwcHNcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvQXBwcyhqc29uIGFzIEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGpzb24uYXBwbGljYXRpb25zKSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uczogdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24uYXBwbGljYXRpb25zIGFzIEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10pXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvLyBzZXR0aW5nc1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3MoanNvbiBhcyBDdXN0b21TZXR0aW5ncyk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgdGhlIG9wdGlvbnMgdG8gcmVxdWVzdCBkYXRhLlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwuXG5cdCAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3QgdG8gY29udmVydC5cblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBvcHRpb25zLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRSZXF1ZXN0T3B0aW9ucyhcblx0XHR1cmw6IHN0cmluZyxcblx0XHRvcHRpb25zOiBGZXRjaE9wdGlvbnMsXG5cdFx0cmVxdWVzdDogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9XG5cdCk6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGlmICghaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVxdWVzdCk7XG5cdFx0XHRcdGlmIChrZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR1cmwgPSB1cmwucmVwbGFjZShgWyR7a2V5c1tpXX1dYCwgZW5jb2RlVVJJQ29tcG9uZW50KHJlcXVlc3Rba2V5c1tpXV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMubWV0aG9kID09PSBcIlBPU1RcIiAmJiAhaXNFbXB0eShyZXF1ZXN0KSkge1xuXHRcdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHsgdXJsLCBvcHRpb25zIH07XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlIGN1cnJlbnQgdXNlciBzZXR0aW5ncyB0byB0aGUgYXBwbGljYXRpb25zLlxuXHQgKiBAcGFyYW0gYXBwcyBUaGUgbGlzdCBvZiBhcHBzLlxuXHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBhcHBzIGZpbHRlcmVkIGZvciB1c2UgYnkgdGhlIHVzZXIuXG5cdCAqL1xuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb0FwcHMoYXBwczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSk6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10ge1xuXHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRpZiAoXG5cdFx0XHRpc0VtcHR5KGN1cnJlbnRVc2VyKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZykgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0pIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZylcblx0XHQpIHtcblx0XHRcdHJldHVybiBhcHBzO1xuXHRcdH1cblx0XHRjb25zdCBleGNsdWRlVGFnID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnO1xuXG5cdFx0Y29uc3QgYXBwbGljYXRpb25zOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdID0gW107XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwcykpIHtcblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdFx0Y29uc3QgbG9va3VwOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IGFwcC50YWdzID8/IGFwcC5jYXRlZ29yaWVzO1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShsb29rdXApKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaW5jbHVkZUluUmVzcG9uc2UobG9va3VwLCBleGNsdWRlVGFnKSkge1xuXHRcdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwbGljYXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmUgdGhlIHRhZ3Mgd2l0aCB0aGUgZXhjbHVkZSBsaXN0IHRvIHNlZSBpZiB0aGV5IHNob3VsZCBiZSB1c2VkLlxuXHQgKiBAcGFyYW0gdGFncyBUaGUgdGFncyB0byBjaGVjay5cblx0ICogQHBhcmFtIGV4Y2x1ZGVUYWdzIFRoZSBleGNsdWRlIGxpc3QgdG8gY2hlY2sgYWdhaW5zdC5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaXRlbSBzaG91bGQgYmUgaW5jbHVkZWQuXG5cdCAqL1xuXHRwcml2YXRlIGluY2x1ZGVJblJlc3BvbnNlKHRhZ3M6IHN0cmluZ1tdLCBleGNsdWRlVGFnczogc3RyaW5nW10pOiBib29sZWFuIHtcblx0XHRsZXQgaW5jbHVkZSA9IHRydWU7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV4Y2x1ZGVUYWdzKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRUYWc6IHN0cmluZyA9IHRhZztcblx0XHRcdGlmIChleGNsdWRlVGFncy5pbmNsdWRlcyhjdXJyZW50VGFnKSkge1xuXHRcdFx0XHRpbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaW5jbHVkZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGUgdXNlciBzZXR0aW5ncyB0byB0aGUgY3VzdG9tIHNldHRpbmdzLlxuXHQgKiBAcGFyYW0gc2V0dGluZ3MgVGhlIHNldHRpbmdzIHRvIGZpbHRlci5cblx0ICogQHJldHVybnMgVGhlIGZpbHRlcmVkIHNldHRpbmdzLlxuXHQgKi9cblx0cHJpdmF0ZSBhcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhzZXR0aW5nczogQ3VzdG9tU2V0dGluZ3MpOiBDdXN0b21TZXR0aW5ncyB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoY3VycmVudFVzZXIpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSkgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fZGVmaW5pdGlvbilcblx0XHQpIHtcblx0XHRcdHJldHVybiBzZXR0aW5ncztcblx0XHR9XG5cblx0XHRjb25zdCBtb2R1bGVzID0gc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/Lm1vZHVsZXM7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobW9kdWxlcykpIHtcblx0XHRcdG1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdGRhdGE6IHRoaXMuX2RlZmluaXRpb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHRoaXMuX2RlZmluaXRpb24uZW5hYmxlZCxcblx0XHRcdFx0aWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLl9kZWZpbml0aW9uLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uLmljb24sXG5cdFx0XHRcdGluZm86IHRoaXMuX2RlZmluaXRpb24uaW5mbyxcblx0XHRcdFx0dGl0bGU6IHRoaXMuX2RlZmluaXRpb24udGl0bGUsXG5cdFx0XHRcdHVybDogdGhpcy5fZGVmaW5pdGlvbi51cmxcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRQcm92aWRlcnMgPSBzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8uZW5kcG9pbnRzO1xuXHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRJZHMgPSBzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzO1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYXBwRW5kcG9pbnRQcm92aWRlcnMpICYmIEFycmF5LmlzQXJyYXkoYXBwRW5kcG9pbnRJZHMpKSB7XG5cdFx0XHRcdGxldCBjb3VudCA9IDA7XG5cdFx0XHRcdGNvbnN0IHVwZGF0ZUVuZHBvaW50cyA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGVuZHBvaW50IG9mIGFwcEVuZHBvaW50SWRzKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBlbmRwb2ludCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50LnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZUVuZHBvaW50cy5wdXNoKHsgcG9zaXRpb246IGNvdW50LCB1cmw6IGVuZHBvaW50IH0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRUb1VwZGF0ZSA9IGFwcEVuZHBvaW50UHJvdmlkZXJzLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGVuZHBvaW50RW50cnkpID0+IGVuZHBvaW50RW50cnkuaWQgPT09IGVuZHBvaW50ICYmIGVuZHBvaW50RW50cnkudHlwZSA9PT0gXCJmZXRjaFwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShlbmRwb2ludFRvVXBkYXRlKSkge1xuXHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZSA9IFwibW9kdWxlXCI7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhpcyBpZiBjb25kaXRpb24gY2hlY2sgaXMgaGVyZSB0byBtYWtlIHR5cGVzY3JpcHQgaGFwcHkgd2l0aCB0aGUgZW5kcG9pbnQgc28gdGhhdCB0eXBlSWQgY2FuIGJlIHNldFxuXHRcdFx0XHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlLnR5cGUgPT09IFwibW9kdWxlXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gdGhpcy5fZGVmaW5pdGlvbi5pZDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh1cGRhdGVFbmRwb2ludHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGlmIChpc0VtcHR5KHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIpKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyID0ge1xuXHRcdFx0XHRcdFx0XHRlbmRwb2ludHM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKGNvbnN0IG5ld0VuZHBvaW50RW50cnkgb2YgdXBkYXRlRW5kcG9pbnRzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludElkID0gYGF1dGgtZXhhbXBsZS1lbmRwb2ludC0ke25ld0VuZHBvaW50RW50cnkucG9zaXRpb259YDtcblx0XHRcdFx0XHRcdGFwcEVuZHBvaW50SWRzW25ld0VuZHBvaW50RW50cnkucG9zaXRpb25dID0gZW5kcG9pbnRJZDtcblx0XHRcdFx0XHRcdGFwcEVuZHBvaW50UHJvdmlkZXJzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZDogZW5kcG9pbnRJZCxcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJtb2R1bGVcIixcblx0XHRcdFx0XHRcdFx0dHlwZUlkOiB0aGlzLl9kZWZpbml0aW9uLmlkLFxuXHRcdFx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxuXHRcdFx0XHRcdFx0XHRcdHVybDogbmV3RW5kcG9pbnRFbnRyeS51cmxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGhlbWVQcm92aWRlciA9IHNldHRpbmdzLnRoZW1lUHJvdmlkZXI7XG5cblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eSh0aGVtZVByb3ZpZGVyKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheSh0aGVtZVByb3ZpZGVyLnRoZW1lcykgJiZcblx0XHRcdHRoZW1lUHJvdmlkZXIudGhlbWVzLmxlbmd0aCA+IDAgJiZcblx0XHRcdCFpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSlcblx0XHQpIHtcblx0XHRcdHRoZW1lUHJvdmlkZXIudGhlbWVzWzBdLmRlZmF1bHQgPVxuXHRcdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgPT09IFwiZGFya1wiID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG5cdFx0XHRjb25zdCBzdG9yZWRTY2hlbWVQcmVmZXJlbmNlID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LVNlbGVjdGVkQ29sb3JTY2hlbWVgO1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFxuXHRcdFx0XHRcIlRoaXMgaXMgYSBkZW1vIG1vZHVsZSB3aGVyZSB3ZSBhcmUgY2xlYXJpbmcgdGhlIGxvY2FsbHkgc3RvcmVkIHNjaGVtZSBwcmVmZXJlbmNlIGluIG9yZGVyIHRvIHNob3cgZGlmZmVyZW50IHNjaGVtZSdzIGxpZ2h0L2RhcmsgYmFzZWQgb24gdXNlciBzZWxlY3Rpb24uIFRoaXMgbWVhbnMgdGhhdCBpdCB3aWxsIGFsd2F5cyBiZSBzZXQgdG8gd2hhdCBpcyBpbiB0aGUgcm9sZSBtYXBwaW5nIGluaXRpYWxseSBhbmQgbm90IHdoYXQgaXQgaXMgc2V0IHRvIGxvY2FsbHkgb24gcmVzdGFydC5cIlxuXHRcdFx0KTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JlZFNjaGVtZVByZWZlcmVuY2UpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51QWN0aW9uSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVBY3Rpb247XG5cdFx0Y29uc3QgZXhjbHVkZU1lbnVNb2R1bGVJZHMgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlTWVudU1vZHVsZTtcblxuXHRcdGNvbnN0IGJyb3dzZXJQcm92aWRlcnMgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXI7XG5cdFx0aWYgKCFpc0VtcHR5KGJyb3dzZXJQcm92aWRlcnMpICYmIEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVBY3Rpb25JZHMpKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLmdsb2JhbE1lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgZ2xvYmFsTWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IGdsb2JhbE1lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gZ2xvYmFsTWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChnbG9iYWxNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMoZ2xvYmFsTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0Z2xvYmFsTWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUpICYmIGJyb3dzZXJQcm92aWRlcnMucGFnZU1lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhZ2VNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VNZW51QWN0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHBhZ2VNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKHBhZ2VNZW51QWN0aW9uSWQgJiYgZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMocGFnZU1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHBhZ2VNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy52aWV3TWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy52aWV3TWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3Qgdmlld01lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld01lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdmlld01lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAodmlld01lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0dmlld01lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWVudXNQcm92aWRlciA9IHNldHRpbmdzLm1lbnVzUHJvdmlkZXI7XG5cdFx0aWYgKFxuXHRcdFx0IWlzRW1wdHkobWVudXNQcm92aWRlcikgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVNb2R1bGVJZHMpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KG1lbnVzUHJvdmlkZXIubW9kdWxlcylcblx0XHQpIHtcblx0XHRcdGZvciAoY29uc3QgbWVudU1vZHVsZSBvZiBtZW51c1Byb3ZpZGVyLm1vZHVsZXMpIHtcblx0XHRcdFx0Y29uc3QgbWVudU1vZHVsZUlkOiBzdHJpbmcgPSBtZW51TW9kdWxlLmlkO1xuXHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVNb2R1bGVJZHMuaW5jbHVkZXMobWVudU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1lbnVNb2R1bGUuZW5hYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldHRpbmdzO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUmA7XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICogQHJldHVybnMgVGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCk6IEV4YW1wbGVVc2VyIHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKGlzRW1wdHkoc3RvcmVkVXNlcikpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IHVzZXIgaW4gc3RvcmFnZS5cbiAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIHRvIHN0b3JlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcjogRXhhbXBsZVVzZXIpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCk6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBuZXcgRXhhbXBsZUF1dGhQcm92aWRlcigpLFxuXHRlbmRwb2ludDogbmV3IEV4YW1wbGVBdXRoRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==