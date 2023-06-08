/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/auth/example/auth.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/auth/example/auth.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExampleAuthProvider: () => (/* binding */ ExampleAuthProvider)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._authOptions)) {
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
        const key = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(eventType)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._authenticated)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._authenticated) || !this._authenticated) {
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
                            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(win)) {
                                const info = await win.getInfo();
                                if (authMatch.test(info.url)) {
                                    await win.close(true);
                                    return resolve(true);
                                }
                                await win.show(true);
                            }
                        }
                        catch (error) {
                            this._logger?.error(`Error while checking if login window automatically redirected. Error ${Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(error)}`);
                            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(win)) {
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
                            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(win)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(validity) && validity > -1 && Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._sessionExpiryCheckId)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._authenticated) || !this._authenticated) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(logoutUrl)) {
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
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(windowToCheck)) {
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
        if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._logger)) {
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
            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request)) {
                const keys = Object.keys(request);
                if (keys.length > 0) {
                    const length = keys.length;
                    for (let i = 0; i < length; i++) {
                        url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
                    }
                }
            }
        }
        else if (options.method === "POST" && !Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(request)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(currentUser) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping[currentUser.role]) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping[currentUser.role].excludeAppsWithTag)) {
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
        if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(currentUser) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping[currentUser.role]) ||
            Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._definition)) {
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
                            if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(endpointToUpdate)) {
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
                    if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(settings.endpointProvider)) {
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
        if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(themeProvider) &&
            Array.isArray(themeProvider.themes) &&
            themeProvider.themes.length > 0 &&
            !Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._roleMapping[currentUser.role].preferredScheme)) {
            themeProvider.themes[0].default =
                this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
            const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
            this._logger?.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart.");
            localStorage.removeItem(storedSchemePreference);
        }
        const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
        const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;
        const browserProviders = settings.browserProvider;
        if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(browserProviders) && Array.isArray(excludeMenuActionIds)) {
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
        if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(menusProvider) &&
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;
/**
 * Get the current user from storage.
 * @returns The current user.
 */
function getCurrentUser() {
    const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
    if (Object(function webpackMissingModule() { var e = new Error("Cannot find module 'workspace-platform-starter/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(storedUser)) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUN4RCxDQUFDOzs7Ozs7O1NDOUJEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDZDO0FBQ0k7QUFFMUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLElBQUksRUFBRSxJQUFJLHNEQUFtQixFQUFFO0lBQy9CLFFBQVEsRUFBRSxJQUFJLDBEQUFtQixFQUFFO0NBQ25DLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2F1dGgudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhQcm92aWRlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXV0aC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGZvcm1hdEVycm9yLCBpc0VtcHR5LCBpc051bWJlciwgaXNTdHJpbmdWYWx1ZSwgcmFuZG9tVVVJRCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlT3B0aW9ucywgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBjbGVhckN1cnJlbnRVc2VyLCBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBFeGFtcGxlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY2xhc3MgRXhhbXBsZUF1dGhQcm92aWRlciBpbXBsZW1lbnRzIEF1dGhQcm92aWRlcjxFeGFtcGxlT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9hdXRoT3B0aW9ucz86IEV4YW1wbGVPcHRpb25zO1xuXG5cdHByaXZhdGUgX2xvZ2dlcj86IExvZ2dlcjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZWRJblN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlZE91dFN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnM6IHsgW2lkOiBzdHJpbmddOiAoKSA9PiBQcm9taXNlPHZvaWQ+IH07XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZEtleT86IHN0cmluZztcblxuXHRwcml2YXRlIF9jdXJyZW50VXNlcj86IEV4YW1wbGVVc2VyO1xuXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWQ/OiBib29sZWFuO1xuXG5cdHByaXZhdGUgX3Nlc3Npb25FeHBpcnlDaGVja0lkPzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyA9IHt9O1xuXHRcdHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMgPSB7fTtcblx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzID0ge307XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlT3B0aW9ucz4sXG5cdFx0bG9nZ2VyQ3JlYXRvcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJBdXRoRXhhbXBsZVwiKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkS2V5ID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEYDtcblxuXHRcdGlmIChpc0VtcHR5KHRoaXMuX2F1dGhPcHRpb25zKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSk7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3Vic2NyaWJlIHRvIG9uZSBvZiB0aGUgYXV0aCBldmVudHMuXG5cdCAqIEBwYXJhbSB0byBUaGUgZXZlbnQgdG8gc3Vic2NyaWJlIHRvLlxuXHQgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXHQgKiBAcmV0dXJucyBTdWJzY3JpcHRpb24gaWQgZm9yIHVuc3Vic2NyaWJpbmcgb3IgdW5kZWZpbmVkIGlmIGV2ZW50IHR5cGUgaXMgbm90IGF2YWlsYWJsZS5cblx0ICovXG5cdHB1YmxpYyBzdWJzY3JpYmUoXG5cdFx0dG86IFwibG9nZ2VkLWluXCIgfCBcImJlZm9yZS1sb2dnZWQtb3V0XCIgfCBcImxvZ2dlZC1vdXRcIiB8IFwic2Vzc2lvbi1leHBpcmVkXCIsXG5cdFx0Y2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD5cblx0KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBrZXkgPSByYW5kb21VVUlEKCk7XG5cdFx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0XHRzd2l0Y2ggKHRvKSB7XG5cdFx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnNba2V5XSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnNba2V5XSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyc1trZXldID0gY2FsbGJhY2s7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0XHR0aGlzLl9zdWJzY3JpYmVJZE1hcFtrZXldID0gdG87XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVuc3Vic2NyaWJlIGZyb20gYW4gYWxyZWFkeSBzdWJzY3JpYmVkIGV2ZW50LlxuXHQgKiBAcGFyYW0gc3Vic2NyaXB0aW9uSWQgVGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24gcmV0dXJuZWQgZnJvbSBzdWJzY3JpYmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVuc3Vic2NyaWJlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIHVuc3Vic2NyaWJlKHN1YnNjcmlwdGlvbklkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXHRcdGNvbnN0IGV2ZW50VHlwZSA9IHRoaXMuX3N1YnNjcmliZUlkTWFwW3N1YnNjcmlwdGlvbklkXTtcblx0XHRpZiAoaXNFbXB0eShldmVudFR5cGUpKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oYFlvdSBoYXZlIHRyaWVkIHRvIHVuc3Vic2NyaWJlIHdpdGggYSBrZXkgJHtzdWJzY3JpcHRpb25JZH0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChldmVudFR5cGUpIHtcblx0XHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnNbc3Vic2NyaXB0aW9uSWRdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyc1tzdWJzY3JpcHRpb25JZF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtzdWJzY3JpcHRpb25JZF07XG5cdFx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcblx0XHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmlwdGlvbklkfSBoYXMgYmVlbiBjbGVhcmVkYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpcHRpb25JZH0gY291bGQgbm90IGJlIGNsZWFyZWQgYXMgd2UgZG8gbm90IGhhdmUgYSByZWdpc3RlciBvZiB0aGF0IGV2ZW50IHR5cGUuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERvZXMgdGhlIGF1dGggcHJvdmlkZXIgcmVxdWlyZSBhdXRoZW50aWNhdGlvbi5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkpIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ2luIG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwibG9naW4gcmVxdWVzdGVkXCIpO1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnM/LmF1dG9Mb2dpbikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW5cIik7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGF3YWl0IHRoaXMuZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZEtleSkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5LCB0aGlzLl9hdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtaW5cIiwgdGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtIHRoZSBsb2dvdXQgb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dvdXQgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTG9nIG91dCBjYWxsZWRcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChhc3luYyAoZXJyb3IpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9nIG91dCAke2Vycm9yfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgdXNlciBpbmZvcm1hdGlvbi5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLl9hdXRoZW50aWNhdGVkKSB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyPy53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiVGhpcyBleGFtcGxlIHJldHVybnMgYSB1c2VyIGlmIGl0IHdhcyBwcm92aWRlZCB0byB0aGUgZXhhbXBsZSBsb2dpblwiKTtcblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50VXNlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGF1dGhlbnRpY2F0aW9uIGZyb20gdGhlIHVzZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMub3BlbkxvZ2luV2luZG93KHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luVXJsKVxuXHRcdFx0XHRcdC50aGVuKGFzeW5jIChvcGVuZWRXaW4pID0+IHtcblx0XHRcdFx0XHRcdGxldCB3aW46IE9wZW5GaW4uV2luZG93IHwgdW5kZWZpbmVkID0gb3BlbmVkV2luO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGF1dGhNYXRjaCA9IG5ldyBSZWdFeHAodGhpcy5fYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCwgXCJpXCIpO1xuXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgY2hlY2tpbmcgaWYgbG9naW4gd2luZG93IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZC4gRXJyb3IgJHtmb3JtYXRFcnJvcihlcnJvcil9YFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5hZGRMaXN0ZW5lcihcImNsb3NlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHdpbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJBdXRoIFdpbmRvdyBjYW5jZWxsZWQgYnkgdXNlclwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHdpbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSwgdGhpcy5fYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRvIHNlZSBpZiBhIHNlc3Npb24gaGFzIGV4cGlyZWQuXG5cdCAqL1xuXHRwcml2YXRlIGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpOiB2b2lkIHtcblx0XHRjb25zdCB2YWxpZGl0eSA9IHRoaXMuX2F1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcztcblx0XHRpZiAoaXNOdW1iZXIodmFsaWRpdHkpICYmIHZhbGlkaXR5ID4gLTEgJiYgaXNFbXB0eSh0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCkpIHtcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMpIHtcblx0XHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmNoZWNrQXV0aCh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybCk7XG5cdFx0XHRcdFx0aWYgKHN0aWxsQXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiU2Vzc2lvbiBTdGlsbCBBY3RpdmVcIik7XG5cdFx0XHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdFx0XHRcdFwiU2Vzc2lvbiBub3QgdmFsaWQuIEtpbGxpbmcgc2Vzc2lvbiBhbmQgbm90aWZ5aW5nIHJlZ2lzdGVyZWQgY2FsbGJhY2sgdGhhdCBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBjaGVjayBpcyBjb25maWd1cmVkIGluIHRoZSBkYXRhIGZvciB0aGlzIGV4YW1wbGUgYXV0aCBtb2R1bGUuIFNldCBjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyB0byAtMSBpbiB0aGUgYXV0aFByb3ZpZGVyIG1vZHVsZSBkZWZpbml0aW9uIGlmIHlvdSB3aXNoIHRvIGRpc2FibGUgdGhpcyBjaGVja1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSwgdmFsaWRpdHkgKiAxMDAwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTm90aWZ5IHN1YnNjcmliZXJzIG9mIGFuIGV2ZW50IGNoYW5nZS5cblx0ICogQHBhcmFtIGV2ZW50VHlwZSBUaGUgZXZlbnQgdG8gbm90aWZ5LlxuXHQgKiBAcGFyYW0gc3Vic2NyaWJlcnMgVGhlIHN1YnNjcmliZXJzIGZvciB0aGUgZXZlbnQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIG5vdGlmeVN1YnNjcmliZXJzKFxuXHRcdGV2ZW50VHlwZTogc3RyaW5nLFxuXHRcdHN1YnNjcmliZXJzOiB7IFtpZDogc3RyaW5nXTogKCkgPT4gUHJvbWlzZTx2b2lkPiB9XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHN1YnNjcmliZXJJZHMgPSBPYmplY3Qua2V5cyhzdWJzY3JpYmVycyk7XG5cdFx0c3Vic2NyaWJlcklkcy5yZXZlcnNlKCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHN1YnNjcmliZXJJZCA9IHN1YnNjcmliZXJJZHNbaV07XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWBcblx0XHRcdCk7XG5cdFx0XHRhd2FpdCBzdWJzY3JpYmVyc1tzdWJzY3JpYmVySWRdKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBsb2dvdXQuXG5cdCAqIEBwYXJhbSByZXNvbHZlIFRoZSByZXNvbHZlIG1ldGhvZCB0byBjYWxsIGFmdGVyIGxvZ291dC5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGlzRW1wdHkodGhpcy5fYXV0aGVudGljYXRlZCkgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8uZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImJlZm9yZS1sb2dnZWQtb3V0XCIsIHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdH1cblx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0Y29uc3QgbG9nb3V0VXJsID0gdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ291dFVybDtcblx0XHRpZiAoaXNTdHJpbmdWYWx1ZShsb2dvdXRVcmwpKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCB3aW4gPSBhd2FpdCB0aGlzLm9wZW5Mb2dvdXRXaW5kb3cobG9nb3V0VXJsKTtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiB0aGUgbG9naW4gd2luZG93LlxuXHQgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gb3BlbiBmb3IgdGhlIGxvZ2luIHdpbmRvdy5cblx0ICogQHJldHVybnMgVGhlIHdpbmRvdyB0aGF0IHdhcyBjcmVhdGVkLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9naW5XaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdFx0Y29uc3QgZW5yaWNoZWRDdXN0b21EYXRhID0ge1xuXHRcdFx0Y3VycmVudFVzZXJLZXk6IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLFxuXHRcdFx0Li4udGhpcy5fYXV0aE9wdGlvbnM/LmN1c3RvbURhdGFcblx0XHR9O1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybCxcblx0XHRcdGN1c3RvbURhdGE6IGVucmljaGVkQ3VzdG9tRGF0YVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCBmb3IgdGhlIGxvZ291dCB3aW5kb3cuXG5cdCAqIEByZXR1cm5zIFRoZSB3aW5kb3cgY3JlYXRlZC5cblx0ICovXG5cdHByaXZhdGUgYXN5bmMgb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLW91dFwiLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0dXMuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byBvcGVuIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNoZWNrQXV0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnM/LmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHRcdGxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbmRvd1RvQ2hlY2suZ2V0SW5mbygpO1xuXHRcdFx0aWYgKGluZm8udXJsID09PSB0aGlzLl9hdXRoT3B0aW9ucz8uYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/LmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICghaXNFbXB0eSh3aW5kb3dUb0NoZWNrKSkge1xuXHRcdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEVuZHBvaW50LFxuXHRFbmRwb2ludERlZmluaXRpb24sXG5cdEZldGNoT3B0aW9uc1xufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvc2V0dGluZy1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXMsIEV4YW1wbGVFbmRwb2ludE9wdGlvbnMsIEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIEV4YW1wbGUgYXV0aGVudGljYXRpb24gZW5kcG9pbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aEVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQ8RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4ge1xuXHRwcml2YXRlIF9kZWZpbml0aW9uPzogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPjtcblxuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfcm9sZU1hcHBpbmc/OiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM/OiBNb2R1bGVIZWxwZXJzXG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlckNyZWF0b3IoXCJFeGFtcGxlQXV0aEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0XHR0aGlzLl9yb2xlTWFwcGluZyA9IGRlZmluaXRpb24/LmRhdGE/LnJvbGVNYXBwaW5nO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPEZldGNoT3B0aW9ucz4sXG5cdFx0cmVxdWVzdD86IHVua25vd25cblx0KTogUHJvbWlzZTxcblx0XHRDdXN0b21TZXR0aW5ncyB8IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gfCB7IGFwcGxpY2F0aW9uczogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB9IHwgbnVsbFxuXHQ+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlcj8ud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkodGhpcy5fbG9nZ2VyKSkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFwiVGhpcyBhdXRoIGVuZHBvaW50IG1vZHVsZSBpcyBhbiBleGFtcGxlIHRoYXQgdGhhdCBzaW11bGF0ZXMgcmVxdWVzdGluZyBhIGh0dHAgZW5kcG9pbnQgYW5kIG1hbmlwdWxhdGluZyBpdCBiYXNlZCBvbiB0aGUgY3VycmVudCBleGFtcGxlIHVzZXIgYXMgaWYgaXQgd2FzIHRoZSBzZXJ2ZXIgZG9pbmcgdGhlIG1hbmlwdWxhdGlvbi4gRE8gTk9UIFVTRSBUSElTIE1PRFVMRSBJTiBQUk9EVUNUSU9OLlwiXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgdXJsLCAuLi5vcHRpb25zIH06IEZldGNoT3B0aW9ucyA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXG5cdFx0Y29uc3QgcmVxID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyh1cmwgYXMgc3RyaW5nLCBvcHRpb25zLCByZXF1ZXN0IGFzIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSk7XG5cdFx0aWYgKHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXEub3B0aW9ucy5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdGAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gc3BlY2lmaWVzIGEgdHlwZTogJHtlbmRwb2ludERlZmluaXRpb24udHlwZX0gd2l0aCBhIG1ldGhvZCAke3JlcS5vcHRpb25zLm1ldGhvZH0gdGhhdCBpcyBub3Qgc3VwcG9ydGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcS51cmwsIHJlcS5vcHRpb25zIGFzIFJlcXVlc3RJbml0KTtcblxuXHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0Y29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcblx0XHRcdFx0Ly8gcmV0dXJuZWQgYXBwc1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24gYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoanNvbi5hcHBsaWNhdGlvbnMpKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zOiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbi5hcHBsaWNhdGlvbnMgYXMgQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vIHNldHRpbmdzXG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhqc29uIGFzIEN1c3RvbVNldHRpbmdzKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCB0aGUgb3B0aW9ucyB0byByZXF1ZXN0IGRhdGEuXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybC5cblx0ICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IG9iamVjdCB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIG9wdGlvbnMuXG5cdCAqL1xuXHRwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKFxuXHRcdHVybDogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IEZldGNoT3B0aW9ucyxcblx0XHRyZXF1ZXN0OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH1cblx0KTogeyB1cmw6IHN0cmluZzsgb3B0aW9uczogRmV0Y2hPcHRpb25zIH0ge1xuXHRcdGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdFx0aWYgKCFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXF1ZXN0KTtcblx0XHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKGBbJHtrZXlzW2ldfV1gLCBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdFtrZXlzW2ldXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiICYmICFpc0VtcHR5KHJlcXVlc3QpKSB7XG5cdFx0XHRvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGUgY3VycmVudCB1c2VyIHNldHRpbmdzIHRvIHRoZSBhcHBsaWNhdGlvbnMuXG5cdCAqIEBwYXJhbSBhcHBzIFRoZSBsaXN0IG9mIGFwcHMuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGFwcHMgZmlsdGVyZWQgZm9yIHVzZSBieSB0aGUgdXNlci5cblx0ICovXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBBcHBXaXRoVGFnc09yQ2F0ZWdvcmllc1tdKTogQXBwV2l0aFRhZ3NPckNhdGVnb3JpZXNbXSB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGlzRW1wdHkoY3VycmVudFVzZXIpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSkgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGFwcHM7XG5cdFx0fVxuXHRcdGNvbnN0IGV4Y2x1ZGVUYWcgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cblx0XHRjb25zdCBhcHBsaWNhdGlvbnM6IEFwcFdpdGhUYWdzT3JDYXRlZ29yaWVzW10gPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzKSkge1xuXHRcdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0XHRjb25zdCBsb29rdXA6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gYXBwLnRhZ3MgPz8gYXBwLmNhdGVnb3JpZXM7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGxvb2t1cCkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5pbmNsdWRlSW5SZXNwb25zZShsb29rdXAsIGV4Y2x1ZGVUYWcpKSB7XG5cdFx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcHBsaWNhdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZSB0aGUgdGFncyB3aXRoIHRoZSBleGNsdWRlIGxpc3QgdG8gc2VlIGlmIHRoZXkgc2hvdWxkIGJlIHVzZWQuXG5cdCAqIEBwYXJhbSB0YWdzIFRoZSB0YWdzIHRvIGNoZWNrLlxuXHQgKiBAcGFyYW0gZXhjbHVkZVRhZ3MgVGhlIGV4Y2x1ZGUgbGlzdCB0byBjaGVjayBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpdGVtIHNob3VsZCBiZSBpbmNsdWRlZC5cblx0ICovXG5cdHByaXZhdGUgaW5jbHVkZUluUmVzcG9uc2UodGFnczogc3RyaW5nW10sIGV4Y2x1ZGVUYWdzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuXHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXhjbHVkZVRhZ3MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuXHRcdFx0Y29uc3QgY3VycmVudFRhZzogc3RyaW5nID0gdGFnO1xuXHRcdFx0aWYgKGV4Y2x1ZGVUYWdzLmluY2x1ZGVzKGN1cnJlbnRUYWcpKSB7XG5cdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpbmNsdWRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBjdXN0b20gc2V0dGluZ3MuXG5cdCAqIEBwYXJhbSBzZXR0aW5ncyBUaGUgc2V0dGluZ3MgdG8gZmlsdGVyLlxuXHQgKiBAcmV0dXJucyBUaGUgZmlsdGVyZWQgc2V0dGluZ3MuXG5cdCAqL1xuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncyk6IEN1c3RvbVNldHRpbmdzIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbXB0eShjdXJyZW50VXNlcikgfHxcblx0XHRcdGlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmcpIHx8XG5cdFx0XHRpc0VtcHR5KHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdKSB8fFxuXHRcdFx0aXNFbXB0eSh0aGlzLl9kZWZpbml0aW9uKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHNldHRpbmdzO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1vZHVsZXMgPSBzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8ubW9kdWxlcztcblx0XHRpZiAoQXJyYXkuaXNBcnJheShtb2R1bGVzKSkge1xuXHRcdFx0bW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0ZGF0YTogdGhpcy5fZGVmaW5pdGlvbixcblx0XHRcdFx0ZW5hYmxlZDogdGhpcy5fZGVmaW5pdGlvbi5lbmFibGVkLFxuXHRcdFx0XHRpZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuX2RlZmluaXRpb24uZGVzY3JpcHRpb24sXG5cdFx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24uaWNvbixcblx0XHRcdFx0aW5mbzogdGhpcy5fZGVmaW5pdGlvbi5pbmZvLFxuXHRcdFx0XHR0aXRsZTogdGhpcy5fZGVmaW5pdGlvbi50aXRsZSxcblx0XHRcdFx0dXJsOiB0aGlzLl9kZWZpbml0aW9uLnVybFxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludFByb3ZpZGVycyA9IHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5lbmRwb2ludHM7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludElkcyA9IHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHM7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludFByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShhcHBFbmRwb2ludElkcykpIHtcblx0XHRcdFx0bGV0IGNvdW50ID0gMDtcblx0XHRcdFx0Y29uc3QgdXBkYXRlRW5kcG9pbnRzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgZW5kcG9pbnQgb2YgYXBwRW5kcG9pbnRJZHMpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGVuZHBvaW50ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnQuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRcdFx0XHRcdFx0dXBkYXRlRW5kcG9pbnRzLnB1c2goeyBwb3NpdGlvbjogY291bnQsIHVybDogZW5kcG9pbnQgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludFRvVXBkYXRlID0gYXBwRW5kcG9pbnRQcm92aWRlcnMuZmluZChcblx0XHRcdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gZW5kcG9pbnQgJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGVuZHBvaW50VG9VcGRhdGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlID0gXCJtb2R1bGVcIjtcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzIGlmIGNvbmRpdGlvbiBjaGVjayBpcyBoZXJlIHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweSB3aXRoIHRoZSBlbmRwb2ludCBzbyB0aGF0IHR5cGVJZCBjYW4gYmUgc2V0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUudHlwZSA9PT0gXCJtb2R1bGVcIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kcG9pbnRUb1VwZGF0ZS50eXBlSWQgPSB0aGlzLl9kZWZpbml0aW9uLmlkO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHVwZGF0ZUVuZHBvaW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0aWYgKGlzRW1wdHkoc2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlcikpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAoY29uc3QgbmV3RW5kcG9pbnRFbnRyeSBvZiB1cGRhdGVFbmRwb2ludHMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50SWQgPSBgYXV0aC1leGFtcGxlLWVuZHBvaW50LSR7bmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbn1gO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRJZHNbbmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbl0gPSBlbmRwb2ludElkO1xuXHRcdFx0XHRcdFx0YXBwRW5kcG9pbnRQcm92aWRlcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBlbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBuZXdFbmRwb2ludEVudHJ5LnVybFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCB0aGVtZVByb3ZpZGVyID0gc2V0dGluZ3MudGhlbWVQcm92aWRlcjtcblxuXHRcdGlmIChcblx0XHRcdCFpc0VtcHR5KHRoZW1lUHJvdmlkZXIpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHRoZW1lUHJvdmlkZXIudGhlbWVzKSAmJlxuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXMubGVuZ3RoID4gMCAmJlxuXHRcdFx0IWlzRW1wdHkodGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lKVxuXHRcdCkge1xuXHRcdFx0dGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcblx0XHRcdGNvbnN0IHN0b3JlZFNjaGVtZVByZWZlcmVuY2UgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tU2VsZWN0ZWRDb2xvclNjaGVtZWA7XG5cdFx0XHR0aGlzLl9sb2dnZXI/Lndhcm4oXG5cdFx0XHRcdFwiVGhpcyBpcyBhIGRlbW8gbW9kdWxlIHdoZXJlIHdlIGFyZSBjbGVhcmluZyB0aGUgbG9jYWxseSBzdG9yZWQgc2NoZW1lIHByZWZlcmVuY2UgaW4gb3JkZXIgdG8gc2hvdyBkaWZmZXJlbnQgc2NoZW1lJ3MgbGlnaHQvZGFyayBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gVGhpcyBtZWFucyB0aGF0IGl0IHdpbGwgYWx3YXlzIGJlIHNldCB0byB3aGF0IGlzIGluIHRoZSByb2xlIG1hcHBpbmcgaW5pdGlhbGx5IGFuZCBub3Qgd2hhdCBpdCBpcyBzZXQgdG8gbG9jYWxseSBvbiByZXN0YXJ0LlwiXG5cdFx0XHQpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXhjbHVkZU1lbnVBY3Rpb25JZHMgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlTWVudUFjdGlvbjtcblx0XHRjb25zdCBleGNsdWRlTWVudU1vZHVsZUlkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51TW9kdWxlO1xuXG5cdFx0Y29uc3QgYnJvd3NlclByb3ZpZGVycyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlcjtcblx0XHRpZiAoIWlzRW1wdHkoYnJvd3NlclByb3ZpZGVycykgJiYgQXJyYXkuaXNBcnJheShleGNsdWRlTWVudUFjdGlvbklkcykpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGJyb3dzZXJQcm92aWRlcnMuZ2xvYmFsTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCBnbG9iYWxNZW51RW50cnkgb2YgYnJvd3NlclByb3ZpZGVycy5nbG9iYWxNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgZ2xvYmFsTWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnbG9iYWxNZW51RW50cnk/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKGdsb2JhbE1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhnbG9iYWxNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRnbG9iYWxNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudSkgJiYgYnJvd3NlclByb3ZpZGVycy5wYWdlTWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgcGFnZU1lbnVFbnRyeSBvZiBicm93c2VyUHJvdmlkZXJzLnBhZ2VNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gcGFnZU1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAocGFnZU1lbnVBY3Rpb25JZCAmJiBleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhwYWdlTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0cGFnZU1lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51KSAmJiBicm93c2VyUHJvdmlkZXJzLnZpZXdNZW51Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2aWV3TWVudUVudHJ5IG9mIGJyb3dzZXJQcm92aWRlcnMudmlld01lbnUpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB2aWV3TWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmICh2aWV3TWVudUFjdGlvbklkICYmIGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKHZpZXdNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHR2aWV3TWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBtZW51c1Byb3ZpZGVyID0gc2V0dGluZ3MubWVudXNQcm92aWRlcjtcblx0XHRpZiAoXG5cdFx0XHQhaXNFbXB0eShtZW51c1Byb3ZpZGVyKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShleGNsdWRlTWVudU1vZHVsZUlkcykgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkobWVudXNQcm92aWRlci5tb2R1bGVzKVxuXHRcdCkge1xuXHRcdFx0Zm9yIChjb25zdCBtZW51TW9kdWxlIG9mIG1lbnVzUHJvdmlkZXIubW9kdWxlcykge1xuXHRcdFx0XHRjb25zdCBtZW51TW9kdWxlSWQ6IHN0cmluZyA9IG1lbnVNb2R1bGUuaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudU1vZHVsZUlkcy5pbmNsdWRlcyhtZW51TW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bWVudU1vZHVsZS5lbmFibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cbn1cbiIsImltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJgO1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gc3RvcmFnZS5cbiAqIEByZXR1cm5zIFRoZSBjdXJyZW50IHVzZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcigpOiBFeGFtcGxlVXNlciB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG5cdGlmIChpc0VtcHR5KHN0b3JlZFVzZXIpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHJldHVybiBKU09OLnBhcnNlKHN0b3JlZFVzZXIpIGFzIEV4YW1wbGVVc2VyO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY3VycmVudCB1c2VyIGluIHN0b3JhZ2UuXG4gKiBAcGFyYW0gdXNlciBUaGUgdXNlciB0byBzdG9yZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXI6IEV4YW1wbGVVc2VyKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDdXJyZW50VXNlcigpOiB2b2lkIHtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhQcm92aWRlciB9IGZyb20gXCIuL2F1dGhcIjtcbmltcG9ydCB7IEV4YW1wbGVBdXRoRW5kcG9pbnQgfSBmcm9tIFwiLi9lbmRwb2ludFwiO1xuXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YXV0aDogbmV3IEV4YW1wbGVBdXRoUHJvdmlkZXIoKSxcblx0ZW5kcG9pbnQ6IG5ldyBFeGFtcGxlQXV0aEVuZHBvaW50KClcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=