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
     * Initialise the module.
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
            if (Array.isArray(json)) {
                // returned apps
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
    applyCurrentUserToApps(apps = []) {
        const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
        if (currentUser === null ||
            this._roleMapping === undefined ||
            this._roleMapping[currentUser.role] === undefined ||
            this._roleMapping[currentUser.role].excludeAppsWithTag === undefined) {
            return apps;
        }
        const excludeTag = this._roleMapping[currentUser.role].excludeAppsWithTag;
        const filteredApps = [];
        for (let i = 0; i < apps.length; i++) {
            if (Array.isArray(apps[i].tags)) {
                let include = true;
                for (let t = 0; t < apps[i].tags.length; t++) {
                    const tag = apps[i].tags[t];
                    if (excludeTag.includes(tag)) {
                        include = false;
                        break;
                    }
                }
                if (include) {
                    filteredApps.push(apps[i]);
                }
            }
            else {
                filteredApps.push(apps[i]);
            }
        }
        return filteredApps;
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
                for (let i = 0; i < appEndpoints.length; i++) {
                    if (typeof appEndpoints[i] === "string") {
                        const endpointToUpdate = settings.endpointProvider.endpoints.find((endpointEntry) => endpointEntry.id === appEndpoints[i] && endpointEntry.type === "fetch");
                        if (endpointToUpdate !== undefined) {
                            endpointToUpdate.type = "module";
                            // this if condition check is here to make typescript happy with the endpoint so that typeId can be set
                            if (endpointToUpdate.type === "module") {
                                endpointToUpdate.typeId = this._definition.id;
                            }
                        }
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
        if (Array.isArray(excludeMenuActionIds)) {
            if (Array.isArray(settings?.browserProvider?.globalMenu) &&
                settings.browserProvider.globalMenu.length > 0) {
                for (let i = 0; i < settings.browserProvider.globalMenu.length; i++) {
                    const globalMenuActionId = settings.browserProvider.globalMenu[i]?.data?.action?.id;
                    if (excludeMenuActionIds.includes(globalMenuActionId)) {
                        settings.browserProvider.globalMenu[i].include = false;
                    }
                }
            }
            if (Array.isArray(settings?.browserProvider?.pageMenu) &&
                settings.browserProvider.pageMenu.length > 0) {
                for (let i = 0; i < settings.browserProvider.pageMenu.length; i++) {
                    const pageMenuActionId = settings.browserProvider.pageMenu[i]?.data?.action?.id;
                    if (excludeMenuActionIds.includes(pageMenuActionId)) {
                        settings.browserProvider.pageMenu[i].include = false;
                    }
                }
            }
            if (Array.isArray(settings?.browserProvider?.viewMenu) &&
                settings.browserProvider.viewMenu.length > 0) {
                for (let i = 0; i < settings.browserProvider.viewMenu.length; i++) {
                    const viewMenuActionId = settings.browserProvider.viewMenu[i]?.data?.action?.id;
                    if (excludeMenuActionIds.includes(viewMenuActionId)) {
                        settings.browserProvider.viewMenu[i].include = false;
                    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNkM7QUFDSTtBQUUxQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsSUFBSSxFQUFFLElBQUksc0RBQW1CLEVBQUU7SUFDL0IsUUFBUSxFQUFFLElBQUksMERBQW1CLEVBQUU7Q0FDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXVpZC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdGNvbnN0IGdldFJhbmRvbUhleCA9IChjKSA9PlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1taXhlZC1vcGVyYXRvcnNcblx0XHQoYyBeICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKGMgLyA0KSkpKS50b1N0cmluZygxNik7XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEF1dGhQcm92aWRlciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9hdXRoLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3V1aWRcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZU9wdGlvbnMsIEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBjbGVhckN1cnJlbnRVc2VyLCBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aFByb3ZpZGVyIGltcGxlbWVudHMgQXV0aFByb3ZpZGVyPEV4YW1wbGVPcHRpb25zPiB7XG5cdHByaXZhdGUgX2F1dGhPcHRpb25zOiBFeGFtcGxlT3B0aW9ucztcblxuXHRwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9zdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZWRJblN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj47XG5cblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VkT3V0U3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+O1xuXG5cdHByaXZhdGUgX2F1dGhlbnRpY2F0ZWRLZXk6IHN0cmluZztcblxuXHRwcml2YXRlIF9jdXJyZW50VXNlcjogRXhhbXBsZVVzZXI7XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZDogYm9vbGVhbjtcblxuXHRwcml2YXRlIF9zZXNzaW9uRXhwaXJ5Q2hlY2tJZDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgRXhhbXBsZUF1dGhQcm92aWRlci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3N1YnNjcmliZUlkTWFwID0ge307XG5cdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU9wdGlvbnM+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG5cdCkge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkF1dGhFeGFtcGxlXCIpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURgO1xuXG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKGBTZXR0aW5nIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZGVmaW5pdGlvbi5kYXRhLCBudWxsLCA0KX1gKTtcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSkpO1xuXHRcdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0dGhpcy5fY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihcIk9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnNjcmliZSB0byBvbmUgb2YgdGhlIGF1dGggZXZlbnRzLlxuXHQgKiBAcGFyYW0gdG8gVGhlIGV2ZW50IHRvIHN1YnNjcmliZSB0by5cblx0ICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblx0ICogQHJldHVybnMgU3Vic2NyaXB0aW9uIGlkIGZvciB1bnN1YnNjcmliaW5nIG9yIHVuZGVmaW5lZCBpZiBldmVudCB0eXBlIGlzIG5vdCBhdmFpbGFibGUuXG5cdCAqL1xuXHRwdWJsaWMgc3Vic2NyaWJlKFxuXHRcdHRvOiBcImxvZ2dlZC1pblwiIHwgXCJiZWZvcmUtbG9nZ2VkLW91dFwiIHwgXCJsb2dnZWQtb3V0XCIgfCBcInNlc3Npb24tZXhwaXJlZFwiLFxuXHRcdGNhbGxiYWNrOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG5cdCk6IHN0cmluZyB7XG5cdFx0Y29uc3Qga2V5ID0gcmFuZG9tVVVJRCgpO1xuXHRcdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdFx0c3dpdGNoICh0bykge1xuXHRcdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwiYmVmb3JlLWxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXBba2V5XSA9IHRvO1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVuc3Vic2NyaWJlIGZyb20gYW4gYWxyZWFkeSBzdWJzY3JpYmVkIGV2ZW50LlxuXHQgKiBAcGFyYW0gc3Vic2NyaXB0aW9uSWQgVGhlIGlkIG9mIHRoZSBzdWJzY3JpcHRpb24gcmV0dXJuZWQgZnJvbSBzdWJzY3JpYmUuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVuc3Vic2NyaWJlIHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIHVuc3Vic2NyaWJlKGZyb206IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdFx0Y29uc3QgZXZlbnRUeXBlID0gdGhpcy5fc3Vic2NyaWJlSWRNYXBbZnJvbV07XG5cdFx0aWYgKGV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke2Zyb219IHRoYXQgaXMgaW52YWxpZGApO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHN3aXRjaCAoZXZlbnRUeXBlKSB7XG5cdFx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRlbGV0ZSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0XHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGhhcyBiZWVuIGNsZWFyZWRgKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0XHQpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEb2VzIHRoZSBhdXRoIHByb3ZpZGVyIHJlcXVpcmUgYXV0aGVudGljYXRpb24uXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGlvblJlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ2luIG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9naW4gd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiVXNlciBhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlZDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2F1dGhPcHRpb25zLmF1dG9Mb2dpbikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpblwiKTtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5nZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXksIHRoaXMuX2F1dGhlbnRpY2F0ZWQudG9TdHJpbmcoKSk7XG5cdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiLCB0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gdGhlIGxvZ291dCBvcGVyYXRpb24gb24gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGxvZ291dCB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlTG9nb3V0KHJlc29sdmUpXG5cdFx0XHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9nIG91dCAke2Vycm9yfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdGlmICh0aGlzLl9hdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIXRoaXMuX2F1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlRoaXMgZXhhbXBsZSByZXR1cm5zIGEgdXNlciBpZiBpdCB3YXMgcHJvdmlkZWQgdG8gdGhlIGV4YW1wbGUgbG9naW5cIik7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudFVzZXI7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5vcGVuTG9naW5XaW5kb3codGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHRcdC50aGVuKGFzeW5jICh3aW4pID0+IHtcblx0XHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7ZXJyb3IubWVzc2FnZX1gXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyO1xuXG5cdFx0XHRcdFx0YXdhaXQgd2luLmFkZExpc3RlbmVyKFwiY2xvc2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJBdXRoIFdpbmRvdyBjYW5jZWxsZWQgYnkgdXNlclwiKTtcblx0XHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCB0aGlzLl9hdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KGZvcmNlID0gZmFsc2UpIHtcblx0XHRpZiAoXG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzID4gLTEgJiZcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID09PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy5jaGVja0F1dGgodGhpcy5fYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJTZXNzaW9uIFN0aWxsIEFjdGl2ZVwiKTtcblx0XHRcdFx0XHR0aGlzLmNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFx0XCJTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS4gU2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHRcdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcInNlc3Npb24tZXhwaXJlZFwiLCB0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcy5fYXV0aE9wdGlvbnMuY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgKiAxMDAwKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG5vdGlmeVN1YnNjcmliZXJzKGV2ZW50VHlwZTogc3RyaW5nLCBzdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4pIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRcdHN1YnNjcmliZXJJZHMucmV2ZXJzZSgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVySWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWBcblx0XHRcdCk7XG5cdFx0XHRhd2FpdCBzdWJzY3JpYmVycy5nZXQoc3Vic2NyaWJlcklkKSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiWW91IGhhdmUgcmVxdWVzdGVkIHRvIGxvZyBvdXQgYnV0IGFyZSBub3QgbG9nZ2VkIGluXCIpO1xuXHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImJlZm9yZS1sb2dnZWQtb3V0XCIsIHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSk7XG5cdFx0Y2xlYXJDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IG51bGwgJiZcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybC50cmltKCkubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgdGhpcy5vcGVuTG9nb3V0V2luZG93KHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHR9LCAyMDAwKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0XHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7XG5cdFx0XHRjdXJyZW50VXNlcktleTogRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksXG5cdFx0XHQuLi50aGlzLl9hdXRoT3B0aW9ucz8uY3VzdG9tRGF0YVxuXHRcdH07XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybCxcblx0XHRcdGN1c3RvbURhdGE6IGVucmljaGVkQ3VzdG9tRGF0YVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0XHRkZWZhdWx0SGVpZ2h0OiB0aGlzLl9hdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHRcdHVybFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRjb25zdCB3aW5kb3dUb0NoZWNrID0gYXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtY2hlY2std2luZG93XCIsXG5cdFx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdFx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0XHRpZiAoaW5mby51cmwgPT09IHRoaXMuX2F1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdFx0aXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICh3aW5kb3dUb0NoZWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncywgUGxhdGZvcm1BcHAgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnQsIEVuZHBvaW50RGVmaW5pdGlvbiwgRmV0Y2hPcHRpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZUVuZHBvaW50T3B0aW9ucywgRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXV0aEVuZHBvaW50IGltcGxlbWVudHMgRW5kcG9pbnQ8RXhhbXBsZUVuZHBvaW50T3B0aW9ucz4ge1xuXHRwcml2YXRlIF9kZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+O1xuXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdHByaXZhdGUgX3JvbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPixcblx0XHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVycz86IG5ldmVyXG5cdCkge1xuXHRcdHRoaXMuX2xvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkV4YW1wbGVBdXRoRW5kcG9pbnRcIik7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJXYXMgcGFzc2VkIHRoZSBmb2xsb3dpbmcgb3B0aW9uc1wiLCBkZWZpbml0aW9uLmRhdGEpO1xuXHRcdHRoaXMuX3JvbGVNYXBwaW5nID0gZGVmaW5pdGlvbj8uZGF0YT8ucm9sZU1hcHBpbmc7XG5cdFx0dGhpcy5fZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGEgcmVxdWVzdCByZXNwb25zZSBvbiBhbiBlbmRwb2ludC5cblx0ICogQHBhcmFtIGVuZHBvaW50RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIFRoZSByZXNwb25zZSB0byB0aGUgcmVxdWVzdCwgb3IgbnVsbCBvZiBub3QgaGFuZGxlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyByZXF1ZXN0UmVzcG9uc2UoXG5cdFx0ZW5kcG9pbnREZWZpbml0aW9uOiBFbmRwb2ludERlZmluaXRpb248RmV0Y2hPcHRpb25zPixcblx0XHRyZXF1ZXN0PzogdW5rbm93blxuXHQpOiBQcm9taXNlPHVua25vd24+IHtcblx0XHRpZiAoZW5kcG9pbnREZWZpbml0aW9uLnR5cGUgIT09IFwibW9kdWxlXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9sb2dnZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFwiVGhpcyBhdXRoIGVuZHBvaW50IG1vZHVsZSBpcyBhbiBleGFtcGxlIHRoYXQgdGhhdCBzaW11bGF0ZXMgcmVxdWVzdGluZyBhIGh0dHAgZW5kcG9pbnQgYW5kIG1hbmlwdWxhdGluZyBpdCBiYXNlZCBvbiB0aGUgY3VycmVudCBleGFtcGxlIHVzZXIgYXMgaWYgaXQgd2FzIHRoZSBzZXJ2ZXIgZG9pbmcgdGhlIG1hbmlwdWxhdGlvbi4gRE8gTk9UIFVTRSBUSElTIE1PRFVMRSBJTiBQUk9EVUNUSU9OLlwiXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgdXJsLCAuLi5vcHRpb25zIH06IEZldGNoT3B0aW9ucyA9IGVuZHBvaW50RGVmaW5pdGlvbi5vcHRpb25zO1xuXG5cdFx0Y29uc3QgcmVxID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyh1cmwgYXMgc3RyaW5nLCBvcHRpb25zLCByZXF1ZXN0KTtcblx0XHRpZiAocmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiICYmIHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRgJHtlbmRwb2ludERlZmluaXRpb24uaWR9IHNwZWNpZmllcyBhIHR5cGU6ICR7ZW5kcG9pbnREZWZpbml0aW9uLnR5cGV9IHdpdGggYSBtZXRob2QgJHtyZXEub3B0aW9ucy5tZXRob2R9IHRoYXQgaXMgbm90IHN1cHBvcnRlZC5gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXEudXJsLCByZXEub3B0aW9ucyBhcyBSZXF1ZXN0SW5pdCk7XG5cblx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuXHRcdFx0XHQvLyByZXR1cm5lZCBhcHBzXG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbikgYXMgdW5rbm93bjtcblx0XHRcdH1cblx0XHRcdC8vIHNldHRpbmdzXG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhqc29uKSBhcyB1bmtub3duO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0UmVxdWVzdE9wdGlvbnMoXG5cdFx0dXJsOiBzdHJpbmcsXG5cdFx0b3B0aW9uczogRmV0Y2hPcHRpb25zLFxuXHRcdHJlcXVlc3Q6IHVua25vd25cblx0KTogeyB1cmw6IHN0cmluZzsgb3B0aW9uczogRmV0Y2hPcHRpb25zIH0ge1xuXHRcdGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuXHRcdFx0aWYgKHJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVxdWVzdCk7XG5cdFx0XHRcdGlmIChrZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR1cmwgPSB1cmwucmVwbGFjZShgWyR7a2V5c1tpXX1dYCwgZW5jb2RlVVJJQ29tcG9uZW50KHJlcXVlc3Rba2V5c1tpXV0gYXMgc3RyaW5nKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgcmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcblx0fVxuXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBQbGF0Zm9ybUFwcFtdID0gW10pOiBQbGF0Zm9ybUFwcFtdIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0Y3VycmVudFVzZXIgPT09IG51bGwgfHxcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nID09PSB1bmRlZmluZWQgfHxcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdID09PSB1bmRlZmluZWQgfHxcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZyA9PT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gYXBwcztcblx0XHR9XG5cdFx0Y29uc3QgZXhjbHVkZVRhZyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZztcblx0XHRjb25zdCBmaWx0ZXJlZEFwcHM6IFBsYXRmb3JtQXBwW10gPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHNbaV0udGFncykpIHtcblx0XHRcdFx0bGV0IGluY2x1ZGUgPSB0cnVlO1xuXHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGFwcHNbaV0udGFncy5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRcdGNvbnN0IHRhZzogc3RyaW5nID0gYXBwc1tpXS50YWdzW3RdO1xuXHRcdFx0XHRcdGlmIChleGNsdWRlVGFnLmluY2x1ZGVzKHRhZykpIHtcblx0XHRcdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaW5jbHVkZSkge1xuXHRcdFx0XHRcdGZpbHRlcmVkQXBwcy5wdXNoKGFwcHNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmaWx0ZXJlZEFwcHMucHVzaChhcHBzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbHRlcmVkQXBwcztcblx0fVxuXG5cdHByaXZhdGUgYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3Moc2V0dGluZ3M6IEN1c3RvbVNldHRpbmdzKTogQ3VzdG9tU2V0dGluZ3Mge1xuXHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0XHRpZiAoXG5cdFx0XHRjdXJyZW50VXNlciA9PT0gbnVsbCB8fFxuXHRcdFx0dGhpcy5fcm9sZU1hcHBpbmcgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0dGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0gPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHNldHRpbmdzO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5tb2R1bGVzKSkge1xuXHRcdFx0c2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlci5tb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRkYXRhOiB0aGlzLl9kZWZpbml0aW9uLFxuXHRcdFx0XHRlbmFibGVkOiB0aGlzLl9kZWZpbml0aW9uLmVuYWJsZWQsXG5cdFx0XHRcdGlkOiB0aGlzLl9kZWZpbml0aW9uLmlkLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5fZGVmaW5pdGlvbi5kZXNjcmlwdGlvbixcblx0XHRcdFx0aWNvbjogdGhpcy5fZGVmaW5pdGlvbi5pY29uLFxuXHRcdFx0XHRpbmZvOiB0aGlzLl9kZWZpbml0aW9uLmluZm8sXG5cdFx0XHRcdHRpdGxlOiB0aGlzLl9kZWZpbml0aW9uLnRpdGxlLFxuXHRcdFx0XHR1cmw6IHRoaXMuX2RlZmluaXRpb24udXJsXG5cdFx0XHR9KTtcblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8uZW5kcG9pbnRzKSAmJlxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHMpXG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRzID0gc2V0dGluZ3M/LmFwcFByb3ZpZGVyPy5lbmRwb2ludElkcztcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBFbmRwb2ludHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFwcEVuZHBvaW50c1tpXSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRUb1VwZGF0ZSA9IHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIuZW5kcG9pbnRzLmZpbmQoXG5cdFx0XHRcdFx0XHRcdChlbmRwb2ludEVudHJ5KSA9PiBlbmRwb2ludEVudHJ5LmlkID09PSBhcHBFbmRwb2ludHNbaV0gJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnRUb1VwZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZSA9IFwibW9kdWxlXCI7XG5cdFx0XHRcdFx0XHRcdC8vIHRoaXMgaWYgY29uZGl0aW9uIGNoZWNrIGlzIGhlcmUgdG8gbWFrZSB0eXBlc2NyaXB0IGhhcHB5IHdpdGggdGhlIGVuZHBvaW50IHNvIHRoYXQgdHlwZUlkIGNhbiBiZSBzZXRcblx0XHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUudHlwZSA9PT0gXCJtb2R1bGVcIikge1xuXHRcdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gdGhpcy5fZGVmaW5pdGlvbi5pZDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LnRoZW1lUHJvdmlkZXI/LnRoZW1lcykgJiZcblx0XHRcdHNldHRpbmdzLnRoZW1lUHJvdmlkZXIudGhlbWVzLmxlbmd0aCA+IDAgJiZcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRzZXR0aW5ncy50aGVtZVByb3ZpZGVyLnRoZW1lc1swXS5kZWZhdWx0ID1cblx0XHRcdFx0dGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lID09PSBcImRhcmtcIiA/IFwiZGFya1wiIDogXCJsaWdodFwiO1xuXHRcdFx0Y29uc3Qgc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1TZWxlY3RlZENvbG9yU2NoZW1lYDtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcIlRoaXMgaXMgYSBkZW1vIG1vZHVsZSB3aGVyZSB3ZSBhcmUgY2xlYXJpbmcgdGhlIGxvY2FsbHkgc3RvcmVkIHNjaGVtZSBwcmVmZXJlbmNlIGluIG9yZGVyIHRvIHNob3cgZGlmZmVyZW50IHNjaGVtZSdzIGxpZ2h0L2RhcmsgYmFzZWQgb24gdXNlciBzZWxlY3Rpb24uIFRoaXMgbWVhbnMgdGhhdCBpdCB3aWxsIGFsd2F5cyBiZSBzZXQgdG8gd2hhdCBpcyBpbiB0aGUgcm9sZSBtYXBwaW5nIGluaXRpYWxseSBhbmQgbm90IHdoYXQgaXQgaXMgc2V0IHRvIGxvY2FsbHkgb24gcmVzdGFydC5cIlxuXHRcdFx0KTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JlZFNjaGVtZVByZWZlcmVuY2UpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV4Y2x1ZGVNZW51QWN0aW9uSWRzID0gdGhpcy5fcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVBY3Rpb247XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShleGNsdWRlTWVudUFjdGlvbklkcykpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5nbG9iYWxNZW51KSAmJlxuXHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudS5sZW5ndGggPiAwXG5cdFx0XHQpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGdsb2JhbE1lbnVBY3Rpb25JZDogc3RyaW5nID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLmdsb2JhbE1lbnVbaV0/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdFx0aWYgKGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKGdsb2JhbE1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5nbG9iYWxNZW51W2ldLmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnBhZ2VNZW51KSAmJlxuXHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIucGFnZU1lbnUubGVuZ3RoID4gMFxuXHRcdFx0KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51W2ldPy5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhwYWdlTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51W2ldLmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnZpZXdNZW51KSAmJlxuXHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIudmlld01lbnUubGVuZ3RoID4gMFxuXHRcdFx0KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnZpZXdNZW51Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3Qgdmlld01lbnVBY3Rpb25JZDogc3RyaW5nID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnZpZXdNZW51W2ldPy5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnZpZXdNZW51W2ldLmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cbn1cbiIsImltcG9ydCB0eXBlIHsgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJgO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKTogRXhhbXBsZVVzZXIgfCBudWxsIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKHN0b3JlZFVzZXIgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRVc2VyKSBhcyBFeGFtcGxlVXNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXI6IEV4YW1wbGVVc2VyKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCkge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEV4YW1wbGVBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi9hdXRoXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aEVuZHBvaW50IH0gZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGF1dGg6IG5ldyBFeGFtcGxlQXV0aFByb3ZpZGVyKCksXG5cdGVuZHBvaW50OiBuZXcgRXhhbXBsZUF1dGhFbmRwb2ludCgpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9