/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/uuid.ts":
/*!**************************************!*\
  !*** ./client/src/framework/uuid.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomUUID": () => (/* binding */ randomUUID)
/* harmony export */ });
function randomUUID() {
    if ("randomUUID" in window.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return window.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    const getRandomHex = (c) => 
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    (c ^ (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}


/***/ }),

/***/ "./client/src/modules/auth/example/auth.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/auth/example/auth.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleAuthProvider": () => (/* binding */ ExampleAuthProvider)
/* harmony export */ });
/* harmony import */ var _framework_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/uuid */ "./client/src/framework/uuid.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");


class ExampleAuthProvider {
    /**
     * Create a new instance of ExampleAuthProvider.
     */
    constructor() {
        this._subscribeIdMap = {};
        this._loggedInSubscribers = new Map();
        this._beforeLoggedOutSubscribers = new Map();
        this._loggedOutSubscribers = new Map();
        this._sessionExpiredSubscribers = new Map();
    }
    /**
     * Initialise the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("AuthExample");
        this._authenticatedKey = `${fin.me.identity.uuid}-EXAMPLE_AUTH_IS_AUTHENTICATED`;
        if (this._authOptions === undefined) {
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
        const key = (0,_framework_uuid__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
        let matchFound = false;
        switch (to) {
            case "logged-in": {
                matchFound = true;
                this._loggedInSubscribers.set(key, callback);
                break;
            }
            case "before-logged-out": {
                matchFound = true;
                this._beforeLoggedOutSubscribers.set(key, callback);
                break;
            }
            case "logged-out": {
                matchFound = true;
                this._loggedOutSubscribers.set(key, callback);
                break;
            }
            case "session-expired": {
                matchFound = true;
                this._sessionExpiredSubscribers.set(key, callback);
                break;
            }
        }
        if (matchFound) {
            this._subscribeIdMap[key] = to;
            this._logger.info(`Subscription to ${to} events registered. Subscription Id: ${key}`);
            return key;
        }
        return null;
    }
    /**
     * Unsubscribe from an already subscribed event.
     * @param subscriptionId The id of the subscription returned from subscribe.
     * @returns True if the unsubscribe was successful.
     */
    unsubscribe(from) {
        let matchFound = false;
        const eventType = this._subscribeIdMap[from];
        if (eventType === undefined) {
            this._logger.warn(`You have tried to unsubscribe with a key ${from} that is invalid`);
            return false;
        }
        switch (eventType) {
            case "logged-in": {
                matchFound = true;
                this._loggedInSubscribers.delete(from);
                break;
            }
            case "before-logged-out": {
                matchFound = true;
                this._beforeLoggedOutSubscribers.delete(from);
                break;
            }
            case "logged-out": {
                matchFound = true;
                this._loggedOutSubscribers.delete(from);
                break;
            }
            case "session-expired": {
                matchFound = true;
                this._sessionExpiredSubscribers.delete(from);
                break;
            }
        }
        delete this._subscribeIdMap[from];
        if (matchFound) {
            this._logger.info(`Subscription to ${eventType} events with subscription Id: ${from} has been cleared`);
            return true;
        }
        this._logger.warn(`Subscription to ${eventType} events with subscription Id: ${from} could not be cleared as we do not have a register of that event type.`);
        return false;
    }
    /**
     * Does the auth provider require authentication.
     * @returns True if authentication is required.
     */
    async isAuthenticationRequired() {
        if (this._authenticated === undefined) {
            this._authenticated = false;
        }
        return !this._authenticated;
    }
    /**
     * Perform the login operation on the auth provider.
     * @returns True if the login was successful.
     */
    async login() {
        this._logger.info("login requested");
        if (this._authenticated) {
            this._logger.info("User already authenticated");
            return this._authenticated;
        }
        if (this._authOptions.autoLogin) {
            this._logger.info("autoLogin enabled in auth provide module settings. Fake logged in");
            this._authenticated = true;
        }
        else {
            this._authenticated = await this.getAuthenticationFromUser();
        }
        if (this._authenticated) {
            localStorage.setItem(this._authenticatedKey, this._authenticated.toString());
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
                this._logger.info("Log out called");
                return true;
            })
                .catch(async (error) => {
                this._logger.error(`Error while trying to log out ${error}`);
            });
        });
    }
    /**
     * Get user information from the auth provider.
     */
    async getUserInfo() {
        if (this._authenticated === undefined || !this._authenticated) {
            this._logger.warn("Unable to retrieve user info unless the user is authenticated");
            return null;
        }
        this._logger.info("This example returns a user if it was provided to the example login");
        return this._currentUser;
    }
    async getAuthenticationFromUser() {
        return new Promise((resolve, reject) => {
            this.openLoginWindow(this._authOptions.loginUrl)
                .then(async (win) => {
                const authMatch = new RegExp(this._authOptions.authenticatedUrl, "i");
                try {
                    if (win !== undefined) {
                        const info = await win.getInfo();
                        if (authMatch.test(info.url)) {
                            await win.close(true);
                            return resolve(true);
                        }
                        await win.show(true);
                    }
                }
                catch (error) {
                    this._logger.error(`Error while checking if login window automatically redirected. Error ${error.message}`);
                    if (win !== undefined) {
                        await win.show(true);
                    }
                }
                let statusCheck;
                await win.addListener("closed", async () => {
                    if (win) {
                        window.clearInterval(statusCheck);
                        statusCheck = undefined;
                        this._logger.info("Auth Window cancelled by user");
                        win = undefined;
                        return resolve(false);
                    }
                });
                statusCheck = window.setInterval(async () => {
                    if (win !== undefined) {
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
            })
                .catch((error) => {
                this._logger.error("Error while trying to authenticate the user", error);
            });
        });
    }
    checkForSessionExpiry(force = false) {
        if (this._authOptions?.checkSessionValidityInSeconds !== undefined &&
            this._authOptions?.checkSessionValidityInSeconds > -1 &&
            this._sessionExpiryCheckId === undefined) {
            this._sessionExpiryCheckId = window.setTimeout(async () => {
                this._sessionExpiryCheckId = undefined;
                const stillAuthenticated = await this.checkAuth(this._authOptions.loginUrl);
                if (stillAuthenticated) {
                    this._logger.info("Session Still Active");
                    this.checkForSessionExpiry();
                }
                else {
                    this._logger.info("Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check");
                    this._authenticated = false;
                    localStorage.removeItem(this._authenticatedKey);
                    (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
                    await this.notifySubscribers("session-expired", this._sessionExpiredSubscribers);
                }
            }, this._authOptions.checkSessionValidityInSeconds * 1000);
        }
    }
    async notifySubscribers(eventType, subscribers) {
        const subscriberIds = Array.from(subscribers.keys());
        subscriberIds.reverse();
        for (let i = 0; i < subscriberIds.length; i++) {
            const subscriberId = subscriberIds[i];
            this._logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`);
            await subscribers.get(subscriberId)();
        }
    }
    async handleLogout(resolve) {
        if (this._authenticated === undefined || !this._authenticated) {
            this._logger.error("You have requested to log out but are not logged in");
            resolve(false);
            return;
        }
        this._logger.info("Log out requested");
        await this.notifySubscribers("before-logged-out", this._beforeLoggedOutSubscribers);
        this._authenticated = false;
        localStorage.removeItem(this._authenticatedKey);
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
        if (this._authOptions.logoutUrl !== undefined &&
            this._authOptions.logoutUrl !== null &&
            this._authOptions.logoutUrl.trim().length > 0) {
            try {
                const win = await this.openLogoutWindow(this._authOptions.logoutUrl);
                setTimeout(async () => {
                    await win.close();
                    await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
                    resolve(true);
                }, 2000);
            }
            catch (error) {
                this._logger.error(`Error while launching logout window. ${error}`);
                return resolve(false);
            }
        }
        else {
            await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
            resolve(true);
        }
    }
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
            defaultHeight: this._authOptions.loginHeight ?? 325,
            defaultWidth: this._authOptions.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url,
            customData: enrichedCustomData
        });
    }
    async openLogoutWindow(url) {
        return fin.Window.create({
            name: "example-auth-log-out",
            maximizable: false,
            minimizable: false,
            autoShow: false,
            defaultCentered: true,
            defaultHeight: this._authOptions.loginHeight ?? 325,
            defaultWidth: this._authOptions.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url
        });
    }
    async checkAuth(url) {
        const windowToCheck = await fin.Window.create({
            name: "example-auth-check-window",
            alwaysOnTop: true,
            maximizable: false,
            minimizable: false,
            autoShow: false,
            defaultHeight: this._authOptions.loginHeight ?? 325,
            defaultWidth: this._authOptions.loginWidth ?? 400,
            includeInSnapshots: false,
            resizable: false,
            showTaskbarIcon: false,
            saveWindowState: false,
            url
        });
        let isAuthenticated = false;
        try {
            const info = await windowToCheck.getInfo();
            if (info.url === this._authOptions.authenticatedUrl) {
                isAuthenticated = true;
            }
        }
        catch (error) {
            this._logger.error("Error encountered while checking session", error);
        }
        finally {
            if (windowToCheck !== undefined) {
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
/* harmony export */   "ExampleAuthEndpoint": () => (/* binding */ ExampleAuthEndpoint)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");

class ExampleAuthEndpoint {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, createLogger, helpers) {
        this._logger = createLogger("ExampleAuthEndpoint");
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
            this._logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
            return null;
        }
        if (this._logger !== undefined) {
            this._logger.info("This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION.");
        }
        const { url, ...options } = endpointDefinition.options;
        const req = this.getRequestOptions(url, options, request);
        if (req.options.method !== "GET" && req.options.method !== "POST") {
            this._logger.warn(`${endpointDefinition.id} specifies a type: ${endpointDefinition.type} with a method ${req.options.method} that is not supported.`);
            return null;
        }
        const response = await fetch(req.url, req.options);
        if (response.ok) {
            const json = await response.json();
            if (Array.isArray(json) || Array.isArray(json?.applications)) {
                // returned apps
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return this.applyCurrentUserToApps(json);
            }
            // settings
            return this.applyCurrentUserToSettings(json);
        }
        return null;
    }
    getRequestOptions(url, options, request) {
        if (options.method === "GET") {
            if (request !== undefined) {
                const keys = Object.keys(request);
                if (keys.length > 0) {
                    const length = keys.length;
                    for (let i = 0; i < length; i++) {
                        url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
                    }
                }
            }
        }
        else if (options.method === "POST" && request !== undefined) {
            options.body = JSON.stringify(request);
        }
        return { url, options };
    }
    applyCurrentUserToApps(response) {
        const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
        if (currentUser === null ||
            this._roleMapping === undefined ||
            this._roleMapping[currentUser.role] === undefined ||
            this._roleMapping[currentUser.role].excludeAppsWithTag === undefined) {
            return response;
        }
        const excludeTag = this._roleMapping[currentUser.role].excludeAppsWithTag;
        const applications = [];
        if (Array.isArray(response)) {
            for (const app of response) {
                if (Array.isArray(app.tags)) {
                    if (this.includeInResponse(app.tags, excludeTag)) {
                        applications.push(app);
                    }
                }
                else {
                    applications.push(app);
                }
            }
            return applications;
        }
        for (const app of response.applications) {
            if (Array.isArray(app.categories)) {
                if (this.includeInResponse(app.categories, excludeTag)) {
                    applications.push(app);
                }
            }
            else {
                applications.push(app);
            }
        }
        response.applications = applications;
        return response;
    }
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
    applyCurrentUserToSettings(settings) {
        const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
        if (currentUser === null ||
            this._roleMapping === undefined ||
            this._roleMapping[currentUser.role] === undefined) {
            return settings;
        }
        if (Array.isArray(settings?.endpointProvider?.modules)) {
            settings.endpointProvider.modules.push({
                data: this._definition,
                enabled: this._definition.enabled,
                id: this._definition.id,
                description: this._definition.description,
                icon: this._definition.icon,
                info: this._definition.info,
                title: this._definition.title,
                url: this._definition.url
            });
            if (Array.isArray(settings?.endpointProvider?.endpoints) &&
                Array.isArray(settings?.appProvider?.endpointIds)) {
                const appEndpoints = settings?.appProvider?.endpointIds;
                let count = 0;
                const updateEndpoints = [];
                for (const endpoint of appEndpoints) {
                    if (typeof endpoint === "string") {
                        if (endpoint.startsWith("http")) {
                            updateEndpoints.push({ position: count, url: endpoint });
                        }
                        else {
                            const endpointToUpdate = settings.endpointProvider.endpoints.find((endpointEntry) => endpointEntry.id === endpoint && endpointEntry.type === "fetch");
                            if (endpointToUpdate !== undefined) {
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
                    if (settings.endpointProvider === undefined) {
                        settings.endpointProvider = {
                            endpoints: []
                        };
                    }
                    for (const newEndpointEntry of updateEndpoints) {
                        const endpointId = `auth-example-endpoint-${newEndpointEntry.position}`;
                        settings.appProvider.endpointIds[newEndpointEntry.position] = endpointId;
                        settings.endpointProvider.endpoints.push({
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
        if (Array.isArray(settings?.themeProvider?.themes) &&
            settings.themeProvider.themes.length > 0 &&
            this._roleMapping[currentUser.role].preferredScheme !== undefined) {
            settings.themeProvider.themes[0].default =
                this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
            const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
            this._logger.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart.");
            localStorage.removeItem(storedSchemePreference);
        }
        const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
        const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;
        if (Array.isArray(excludeMenuActionIds)) {
            if (Array.isArray(settings?.browserProvider?.globalMenu) &&
                settings.browserProvider.globalMenu.length > 0) {
                for (const globalMenuEntry of settings.browserProvider.globalMenu) {
                    const globalMenuActionId = globalMenuEntry?.data?.action?.id;
                    if (excludeMenuActionIds.includes(globalMenuActionId)) {
                        globalMenuEntry.include = false;
                    }
                }
            }
            if (Array.isArray(settings?.browserProvider?.pageMenu) &&
                settings.browserProvider.pageMenu.length > 0) {
                for (const pageMenuEntry of settings.browserProvider.pageMenu) {
                    const pageMenuActionId = pageMenuEntry?.data?.action?.id;
                    if (excludeMenuActionIds.includes(pageMenuActionId)) {
                        pageMenuEntry.include = false;
                    }
                }
            }
            if (Array.isArray(settings?.browserProvider?.viewMenu) &&
                settings.browserProvider.viewMenu.length > 0) {
                for (const viewMenuEntry of settings.browserProvider.viewMenu) {
                    const viewMenuActionId = viewMenuEntry?.data?.action?.id;
                    if (excludeMenuActionIds.includes(viewMenuActionId)) {
                        viewMenuEntry.include = false;
                    }
                }
            }
        }
        if (Array.isArray(excludeMenuModuleIds) && Array.isArray(settings?.menusProvider?.modules)) {
            for (const menuModule of settings.menusProvider.modules) {
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
/* harmony export */   "EXAMPLE_AUTH_CURRENT_USER_KEY": () => (/* binding */ EXAMPLE_AUTH_CURRENT_USER_KEY),
/* harmony export */   "clearCurrentUser": () => (/* binding */ clearCurrentUser),
/* harmony export */   "getCurrentUser": () => (/* binding */ getCurrentUser),
/* harmony export */   "setCurrentUser": () => (/* binding */ setCurrentUser)
/* harmony export */ });
const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;
function getCurrentUser() {
    const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
    if (storedUser === null) {
        return null;
    }
    return JSON.parse(storedUser);
}
function setCurrentUser(user) {
    localStorage.setItem(EXAMPLE_AUTH_CURRENT_USER_KEY, JSON.stringify(user));
}
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
/* harmony export */   "entryPoints": () => (/* binding */ entryPoints)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUFpQjtJQUMvQyxZQUFZLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRU0sU0FBUyxnQkFBZ0I7SUFDL0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELENBQUM7Ozs7Ozs7U0NsQkQ7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFDSTtBQUUxQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsSUFBSSxFQUFFLElBQUksc0RBQW1CLEVBQUU7SUFDL0IsUUFBUSxFQUFFLElBQUksMERBQW1CLEVBQUU7Q0FDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXVpZC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdGNvbnN0IGdldFJhbmRvbUhleCA9IChjKSA9PlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1taXhlZC1vcGVyYXRvcnNcblx0XHQoYyBeICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKGMgLyA0KSkpKS50b1N0cmluZygxNik7XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhQcm92aWRlciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hdXRoLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V1aWRcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZU9wdGlvbnMsIEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBjbGVhckN1cnJlbnRVc2VyLCBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aFByb3ZpZGVyIGltcGxlbWVudHMgQXV0aFByb3ZpZGVyPEV4YW1wbGVPcHRpb25zPiB7XG5cdHByaXZhdGUgX2F1dGhPcHRpb25zOiBFeGFtcGxlT3B0aW9ucztcblxuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZWRJblN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj47XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VkT3V0U3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+O1xuXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWRLZXk6IHN0cmluZztcblxuXHRwcml2YXRlIF9jdXJyZW50VXNlcjogRXhhbXBsZVVzZXI7XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuXHRwcml2YXRlIF9zZXNzaW9uRXhwaXJ5Q2hlY2tJZDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU9wdGlvbnM+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCkge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkF1dGhFeGFtcGxlXCIpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURgO1xuXG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTZXR0aW5nIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZGVmaW5pdGlvbi5kYXRhLCBudWxsLCA0KX1gKTtcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSkpO1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0dGhpcy5fY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihcIk9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnNjcmliZSB0byBvbmUgb2YgdGhlIGF1dGggZXZlbnRzLlxuXHQgKiBAcGFyYW0gdG8gVGhlIGV2ZW50IHRvIHN1YnNjcmliZSB0by5cblx0ICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblx0ICogQHJldHVybnMgU3Vic2NyaXB0aW9uIGlkIGZvciB1bnN1YnNjcmliaW5nIG9yIHVuZGVmaW5lZCBpZiBldmVudCB0eXBlIGlzIG5vdCBhdmFpbGFibGUuXG5cdCAqL1xuXHRwdWJsaWMgc3Vic2NyaWJlKFxuXHRcdHRvOiBcImxvZ2dlZC1pblwiIHwgXCJiZWZvcmUtbG9nZ2VkLW91dFwiIHwgXCJsb2dnZWQtb3V0XCIgfCBcInNlc3Npb24tZXhwaXJlZFwiLFxuXHRcdGNhbGxiYWNrOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG5cdCk6IHN0cmluZyB7XG5cdFx0Y29uc3Qga2V5ID0gcmFuZG9tVVVJRCgpO1xuXHRcdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdFx0c3dpdGNoICh0bykge1xuXHRcdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwiYmVmb3JlLWxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXBba2V5XSA9IHRvO1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVuc3Vic2NyaWJlIGZyb20gYW4gYWxyZWFkeSBzdWJzY3JpYmVkIGV2ZW50LlxuXHQgKiBAcGFyYW0gc3Vic2NyaXB0aW9uSWQgVGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24gcmV0dXJuZWQgZnJvbSBzdWJzY3JpYmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVuc3Vic2NyaWJlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIHVuc3Vic2NyaWJlKGZyb206IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdFx0Y29uc3QgZXZlbnRUeXBlID0gdGhpcy5fc3Vic2NyaWJlSWRNYXBbZnJvbV07XG5cdFx0aWYgKGV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke2Zyb219IHRoYXQgaXMgaW52YWxpZGApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHN3aXRjaCAoZXZlbnRUeXBlKSB7XG5cdFx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0XHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGhhcyBiZWVuIGNsZWFyZWRgKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEb2VzIHRoZSBhdXRoIHByb3ZpZGVyIHJlcXVpcmUgYXV0aGVudGljYXRpb24uXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGlvblJlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ2luIG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiVXNlciBhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zLmF1dG9Mb2dpbikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpblwiKTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5nZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXksIHRoaXMuX2F1dGhlbnRpY2F0ZWQudG9TdHJpbmcoKSk7XG5cdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiLCB0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ291dCBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ291dCB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlTG9nb3V0KHJlc29sdmUpXG5cdFx0XHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9nIG91dCAke2Vycm9yfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlRoaXMgZXhhbXBsZSByZXR1cm5zIGEgdXNlciBpZiBpdCB3YXMgcHJvdmlkZWQgdG8gdGhlIGV4YW1wbGUgbG9naW5cIik7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudFVzZXI7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5vcGVuTG9naW5XaW5kb3codGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHRcdC50aGVuKGFzeW5jICh3aW4pID0+IHtcblx0XHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7ZXJyb3IubWVzc2FnZX1gXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyO1xuXG5cdFx0XHRcdFx0YXdhaXQgd2luLmFkZExpc3RlbmVyKFwiY2xvc2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJBdXRoIFdpbmRvdyBjYW5jZWxsZWQgYnkgdXNlclwiKTtcblx0XHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCB0aGlzLl9hdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KGZvcmNlID0gZmFsc2UpIHtcblx0XHRpZiAoXG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzID4gLTEgJiZcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID09PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5jaGVja0F1dGgodGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTZXNzaW9uIFN0aWxsIEFjdGl2ZVwiKTtcblx0XHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFx0XCJTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS4gU2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHRcdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcInNlc3Npb24tZXhwaXJlZFwiLCB0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcy5fYXV0aE9wdGlvbnMuY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgKiAxMDAwKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG5vdGlmeVN1YnNjcmliZXJzKGV2ZW50VHlwZTogc3RyaW5nLCBzdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4pIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRcdHN1YnNjcmliZXJJZHMucmV2ZXJzZSgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVySWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWBcblx0XHRcdCk7XG5cdFx0XHRhd2FpdCBzdWJzY3JpYmVycy5nZXQoc3Vic2NyaWJlcklkKSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiWW91IGhhdmUgcmVxdWVzdGVkIHRvIGxvZyBvdXQgYnV0IGFyZSBub3QgbG9nZ2VkIGluXCIpO1xuXHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImJlZm9yZS1sb2dnZWQtb3V0XCIsIHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IG51bGwgJiZcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybC50cmltKCkubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgdGhpcy5vcGVuTG9nb3V0V2luZG93KHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHR9LCAyMDAwKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7XG5cdFx0XHRjdXJyZW50VXNlcktleTogRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksXG5cdFx0XHQuLi50aGlzLl9hdXRoT3B0aW9ucz8uY3VzdG9tRGF0YVxuXHRcdH07XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybCxcblx0XHRcdGN1c3RvbURhdGE6IGVucmljaGVkQ3VzdG9tRGF0YVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCB3aW5kb3dUb0NoZWNrID0gYXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtY2hlY2std2luZG93XCIsXG5cdFx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdFx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0XHRpZiAoaW5mby51cmwgPT09IHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdFx0aXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICh3aW5kb3dUb0NoZWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncywgUGxhdGZvcm1BcHAgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnQsIEVuZHBvaW50RGVmaW5pdGlvbiwgRmV0Y2hPcHRpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZUVuZHBvaW50T3B0aW9ucywgRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aEVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQ8RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4ge1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+O1xuXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX3JvbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPixcblx0XHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVycz86IE1vZHVsZUhlbHBlcnNcblx0KSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiRXhhbXBsZUF1dGhFbmRwb2ludFwiKTtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIldhcyBwYXNzZWQgdGhlIGZvbGxvd2luZyBvcHRpb25zXCIsIGRlZmluaXRpb24uZGF0YSk7XG5cdFx0dGhpcy5fcm9sZU1hcHBpbmcgPSBkZWZpbml0aW9uPy5kYXRhPy5yb2xlTWFwcGluZztcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgYSByZXF1ZXN0IHJlc3BvbnNlIG9uIGFuIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gZW5kcG9pbnREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBlbmRwb2ludC5cblx0ICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0LCBvciBudWxsIG9mIG5vdCBoYW5kbGVkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlcXVlc3RSZXNwb25zZShcblx0XHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxGZXRjaE9wdGlvbnM+LFxuXHRcdHJlcXVlc3Q/OiB1bmtub3duXG5cdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdGBXZSBvbmx5IGV4cGVjdCBlbmRwb2ludHMgb2YgdHlwZSBtb2R1bGUuIFVuYWJsZSB0byBhY3Rpb24gcmVxdWVzdC9yZXNwb25zZSBmb3I6ICR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfWBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2xvZ2dlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XCJUaGlzIGF1dGggZW5kcG9pbnQgbW9kdWxlIGlzIGFuIGV4YW1wbGUgdGhhdCB0aGF0IHNpbXVsYXRlcyByZXF1ZXN0aW5nIGEgaHR0cCBlbmRwb2ludCBhbmQgbWFuaXB1bGF0aW5nIGl0IGJhc2VkIG9uIHRoZSBjdXJyZW50IGV4YW1wbGUgdXNlciBhcyBpZiBpdCB3YXMgdGhlIHNlcnZlciBkb2luZyB0aGUgbWFuaXB1bGF0aW9uLiBETyBOT1QgVVNFIFRISVMgTU9EVUxFIElOIFBST0RVQ1RJT04uXCJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeyB1cmwsIC4uLm9wdGlvbnMgfTogRmV0Y2hPcHRpb25zID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cblx0XHRjb25zdCByZXEgPSB0aGlzLmdldFJlcXVlc3RPcHRpb25zKHVybCBhcyBzdHJpbmcsIG9wdGlvbnMsIHJlcXVlc3QpO1xuXHRcdGlmIChyZXEub3B0aW9ucy5tZXRob2QgIT09IFwiR0VUXCIgJiYgcmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIlBPU1RcIikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdGAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH0gc3BlY2lmaWVzIGEgdHlwZTogJHtlbmRwb2ludERlZmluaXRpb24udHlwZX0gd2l0aCBhIG1ldGhvZCAke3JlcS5vcHRpb25zLm1ldGhvZH0gdGhhdCBpcyBub3Qgc3VwcG9ydGVkLmBcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcS51cmwsIHJlcS5vcHRpb25zIGFzIFJlcXVlc3RJbml0KTtcblxuXHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0Y29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGpzb24pIHx8IEFycmF5LmlzQXJyYXkoanNvbj8uYXBwbGljYXRpb25zKSkge1xuXHRcdFx0XHQvLyByZXR1cm5lZCBhcHBzXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbik7XG5cdFx0XHR9XG5cdFx0XHQvLyBzZXR0aW5nc1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3MoanNvbikgYXMgdW5rbm93bjtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKFxuXHRcdHVybDogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IEZldGNoT3B0aW9ucyxcblx0XHRyZXF1ZXN0OiB1bmtub3duXG5cdCk6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGlmIChyZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0XHRpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoYFske2tleXNbaV19XWAsIGVuY29kZVVSSUNvbXBvbmVudChyZXF1ZXN0W2tleXNbaV1dIGFzIHN0cmluZykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiICYmIHJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHsgdXJsLCBvcHRpb25zIH07XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb0FwcHMoXG5cdFx0cmVzcG9uc2U6IHsgdGFnczogc3RyaW5nW10gfVtdIHwgeyBhcHBsaWNhdGlvbnM6IHsgY2F0ZWdvcmllczogc3RyaW5nW10gfVtdIH1cblx0KTogdW5rbm93biB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGN1cnJlbnRVc2VyID09PSBudWxsIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWcgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlIGFzIHVua25vd247XG5cdFx0fVxuXHRcdGNvbnN0IGV4Y2x1ZGVUYWcgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cblx0XHRjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShyZXNwb25zZSkpIHtcblx0XHRcdGZvciAoY29uc3QgYXBwIG9mIHJlc3BvbnNlKSB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC50YWdzKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmluY2x1ZGVJblJlc3BvbnNlKGFwcC50YWdzLCBleGNsdWRlVGFnKSkge1xuXHRcdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwIGFzIFBsYXRmb3JtQXBwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb25zLnB1c2goYXBwIGFzIFBsYXRmb3JtQXBwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGFwcGxpY2F0aW9ucyBhcyB1bmtub3duO1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IGFwcCBvZiByZXNwb25zZS5hcHBsaWNhdGlvbnMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFwcC5jYXRlZ29yaWVzKSkge1xuXHRcdFx0XHRpZiAodGhpcy5pbmNsdWRlSW5SZXNwb25zZShhcHAuY2F0ZWdvcmllcywgZXhjbHVkZVRhZykpIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbnMucHVzaChhcHAgYXMgdW5rbm93bik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9ucy5wdXNoKGFwcCBhcyB1bmtub3duKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzcG9uc2UuYXBwbGljYXRpb25zID0gYXBwbGljYXRpb25zO1xuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdHByaXZhdGUgaW5jbHVkZUluUmVzcG9uc2UodGFnczogc3RyaW5nW10sIGV4Y2x1ZGVUYWdzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuXHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXhjbHVkZVRhZ3MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuXHRcdFx0Y29uc3QgY3VycmVudFRhZzogc3RyaW5nID0gdGFnO1xuXHRcdFx0aWYgKGV4Y2x1ZGVUYWdzLmluY2x1ZGVzKGN1cnJlbnRUYWcpKSB7XG5cdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpbmNsdWRlO1xuXHR9XG5cblx0cHJpdmF0ZSBhcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhzZXR0aW5nczogQ3VzdG9tU2V0dGluZ3MpOiBDdXN0b21TZXR0aW5ncyB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGN1cnJlbnRVc2VyID09PSBudWxsIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSA9PT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/Lm1vZHVsZXMpKSB7XG5cdFx0XHRzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyLm1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdGRhdGE6IHRoaXMuX2RlZmluaXRpb24sXG5cdFx0XHRcdGVuYWJsZWQ6IHRoaXMuX2RlZmluaXRpb24uZW5hYmxlZCxcblx0XHRcdFx0aWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLl9kZWZpbml0aW9uLmRlc2NyaXB0aW9uLFxuXHRcdFx0XHRpY29uOiB0aGlzLl9kZWZpbml0aW9uLmljb24sXG5cdFx0XHRcdGluZm86IHRoaXMuX2RlZmluaXRpb24uaW5mbyxcblx0XHRcdFx0dGl0bGU6IHRoaXMuX2RlZmluaXRpb24udGl0bGUsXG5cdFx0XHRcdHVybDogdGhpcy5fZGVmaW5pdGlvbi51cmxcblx0XHRcdH0pO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5lbmRwb2ludHMpICYmXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LmFwcFByb3ZpZGVyPy5lbmRwb2ludElkcylcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBhcHBFbmRwb2ludHMgPSBzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzO1xuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xuXHRcdFx0XHRjb25zdCB1cGRhdGVFbmRwb2ludHMgPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBlbmRwb2ludCBvZiBhcHBFbmRwb2ludHMpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGVuZHBvaW50ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnQuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRcdFx0XHRcdFx0dXBkYXRlRW5kcG9pbnRzLnB1c2goeyBwb3NpdGlvbjogY291bnQsIHVybDogZW5kcG9pbnQgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbmRwb2ludFRvVXBkYXRlID0gc2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlci5lbmRwb2ludHMuZmluZChcblx0XHRcdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gZW5kcG9pbnQgJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZSA9IFwibW9kdWxlXCI7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhpcyBpZiBjb25kaXRpb24gY2hlY2sgaXMgaGVyZSB0byBtYWtlIHR5cGVzY3JpcHQgaGFwcHkgd2l0aCB0aGUgZW5kcG9pbnQgc28gdGhhdCB0eXBlSWQgY2FuIGJlIHNldFxuXHRcdFx0XHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlLnR5cGUgPT09IFwibW9kdWxlXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gdGhpcy5fZGVmaW5pdGlvbi5pZDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh1cGRhdGVFbmRwb2ludHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50czogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAoY29uc3QgbmV3RW5kcG9pbnRFbnRyeSBvZiB1cGRhdGVFbmRwb2ludHMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50SWQgPSBgYXV0aC1leGFtcGxlLWVuZHBvaW50LSR7bmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbn1gO1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuYXBwUHJvdmlkZXIuZW5kcG9pbnRJZHNbbmV3RW5kcG9pbnRFbnRyeS5wb3NpdGlvbl0gPSBlbmRwb2ludElkO1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlci5lbmRwb2ludHMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBlbmRwb2ludElkLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHRcdFx0XHR0eXBlSWQ6IHRoaXMuX2RlZmluaXRpb24uaWQsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBuZXdFbmRwb2ludEVudHJ5LnVybFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy50aGVtZVByb3ZpZGVyPy50aGVtZXMpICYmXG5cdFx0XHRzZXR0aW5ncy50aGVtZVByb3ZpZGVyLnRoZW1lcy5sZW5ndGggPiAwICYmXG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0c2V0dGluZ3MudGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcblx0XHRcdGNvbnN0IHN0b3JlZFNjaGVtZVByZWZlcmVuY2UgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tU2VsZWN0ZWRDb2xvclNjaGVtZWA7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XCJUaGlzIGlzIGEgZGVtbyBtb2R1bGUgd2hlcmUgd2UgYXJlIGNsZWFyaW5nIHRoZSBsb2NhbGx5IHN0b3JlZCBzY2hlbWUgcHJlZmVyZW5jZSBpbiBvcmRlciB0byBzaG93IGRpZmZlcmVudCBzY2hlbWUncyBsaWdodC9kYXJrIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBUaGlzIG1lYW5zIHRoYXQgaXQgd2lsbCBhbHdheXMgYmUgc2V0IHRvIHdoYXQgaXMgaW4gdGhlIHJvbGUgbWFwcGluZyBpbml0aWFsbHkgYW5kIG5vdCB3aGF0IGl0IGlzIHNldCB0byBsb2NhbGx5IG9uIHJlc3RhcnQuXCJcblx0XHRcdCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yZWRTY2hlbWVQcmVmZXJlbmNlKTtcblx0XHR9XG5cblx0XHRjb25zdCBleGNsdWRlTWVudUFjdGlvbklkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51QWN0aW9uO1xuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51TW9kdWxlSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVNb2R1bGU7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShleGNsdWRlTWVudUFjdGlvbklkcykpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5nbG9iYWxNZW51KSAmJlxuXHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudS5sZW5ndGggPiAwXG5cdFx0XHQpIHtcblx0XHRcdFx0Zm9yIChjb25zdCBnbG9iYWxNZW51RW50cnkgb2Ygc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLmdsb2JhbE1lbnUpIHtcblx0XHRcdFx0XHRjb25zdCBnbG9iYWxNZW51QWN0aW9uSWQ6IHN0cmluZyA9IGdsb2JhbE1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMoZ2xvYmFsTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0Z2xvYmFsTWVudUVudHJ5LmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5wYWdlTWVudSkgJiZcblx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51Lmxlbmd0aCA+IDBcblx0XHRcdCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhZ2VNZW51RW50cnkgb2Ygc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51KSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nID0gcGFnZU1lbnVFbnRyeT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMocGFnZU1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHBhZ2VNZW51RW50cnkuaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnZpZXdNZW51KSAmJlxuXHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIudmlld01lbnUubGVuZ3RoID4gMFxuXHRcdFx0KSB7XG5cdFx0XHRcdGZvciAoY29uc3Qgdmlld01lbnVFbnRyeSBvZiBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIudmlld01lbnUpIHtcblx0XHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgPSB2aWV3TWVudUVudHJ5Py5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0dmlld01lbnVFbnRyeS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KGV4Y2x1ZGVNZW51TW9kdWxlSWRzKSAmJiBBcnJheS5pc0FycmF5KHNldHRpbmdzPy5tZW51c1Byb3ZpZGVyPy5tb2R1bGVzKSkge1xuXHRcdFx0Zm9yIChjb25zdCBtZW51TW9kdWxlIG9mIHNldHRpbmdzLm1lbnVzUHJvdmlkZXIubW9kdWxlcykge1xuXHRcdFx0XHRjb25zdCBtZW51TW9kdWxlSWQ6IHN0cmluZyA9IG1lbnVNb2R1bGUuaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudU1vZHVsZUlkcy5pbmNsdWRlcyhtZW51TW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bWVudU1vZHVsZS5lbmFibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJgO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKTogRXhhbXBsZVVzZXIgfCBudWxsIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKHN0b3JlZFVzZXIgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRVc2VyKSBhcyBFeGFtcGxlVXNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXI6IEV4YW1wbGVVc2VyKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCkge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi9hdXRoXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGF1dGg6IG5ldyBFeGFtcGxlQXV0aFByb3ZpZGVyKCksXG5cdGVuZHBvaW50OiBuZXcgRXhhbXBsZUF1dGhFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9