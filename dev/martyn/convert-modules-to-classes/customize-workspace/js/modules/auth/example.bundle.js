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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0w2QztBQUNJO0FBRTFDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxJQUFJLEVBQUUsSUFBSSxzREFBbUIsRUFBRTtJQUMvQixRQUFRLEVBQUUsSUFBSSwwREFBbUIsRUFBRTtDQUNuQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dWlkLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvdXRpbC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0Y29uc3QgZ2V0UmFuZG9tSGV4ID0gKGMpID0+XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2UsIG5vLW1peGVkLW9wZXJhdG9yc1xuXHRcdChjIF4gKHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoYyAvIDQpKSkpLnRvU3RyaW5nKDE2KTtcblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cbiIsImltcG9ydCB0eXBlIHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2F1dGgtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXVpZFwiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlT3B0aW9ucywgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGNsZWFyQ3VycmVudFVzZXIsIEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoUHJvdmlkZXIgaW1wbGVtZW50cyBBdXRoUHJvdmlkZXI8RXhhbXBsZU9wdGlvbnM+IHtcblx0cHJpdmF0ZSBfYXV0aE9wdGlvbnM6IEV4YW1wbGVPcHRpb25zO1xuXG5cdHByaXZhdGUgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3N1YnNjcmliZUlkTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlZEluU3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj47XG5cblx0cHJpdmF0ZSByZWFkb25seSBfc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj47XG5cblx0cHJpdmF0ZSBfYXV0aGVudGljYXRlZEtleTogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2N1cnJlbnRVc2VyOiBFeGFtcGxlVXNlcjtcblxuXHRwcml2YXRlIF9hdXRoZW50aWNhdGVkOiBib29sZWFuO1xuXG5cdHByaXZhdGUgX3Nlc3Npb25FeHBpcnlDaGVja0lkOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBFeGFtcGxlQXV0aFByb3ZpZGVyLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fc3Vic2NyaWJlSWRNYXAgPSB7fTtcblx0XHR0aGlzLl9sb2dnZWRJblN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuX2xvZ2dlZE91dFN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMgPSBuZXcgTWFwKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlT3B0aW9ucz4sXG5cdFx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQXV0aEV4YW1wbGVcIik7XG5cdFx0dGhpcy5fYXV0aGVudGljYXRlZEtleSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1FWEFNUExFX0FVVEhfSVNfQVVUSEVOVElDQVRFRGA7XG5cblx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0XHR0aGlzLl9hdXRoZW50aWNhdGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KSk7XG5cdFx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3Vic2NyaWJlIHRvIG9uZSBvZiB0aGUgYXV0aCBldmVudHMuXG5cdCAqIEBwYXJhbSB0byBUaGUgZXZlbnQgdG8gc3Vic2NyaWJlIHRvLlxuXHQgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXHQgKiBAcmV0dXJucyBTdWJzY3JpcHRpb24gaWQgZm9yIHVuc3Vic2NyaWJpbmcgb3IgdW5kZWZpbmVkIGlmIGV2ZW50IHR5cGUgaXMgbm90IGF2YWlsYWJsZS5cblx0ICovXG5cdHB1YmxpYyBzdWJzY3JpYmUoXG5cdFx0dG86IFwibG9nZ2VkLWluXCIgfCBcImJlZm9yZS1sb2dnZWQtb3V0XCIgfCBcImxvZ2dlZC1vdXRcIiB8IFwic2Vzc2lvbi1leHBpcmVkXCIsXG5cdFx0Y2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD5cblx0KTogc3RyaW5nIHtcblx0XHRjb25zdCBrZXkgPSByYW5kb21VVUlEKCk7XG5cdFx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0XHRzd2l0Y2ggKHRvKSB7XG5cdFx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9iZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0XHR0aGlzLl9zdWJzY3JpYmVJZE1hcFtrZXldID0gdG87XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7dG99IGV2ZW50cyByZWdpc3RlcmVkLiBTdWJzY3JpcHRpb24gSWQ6ICR7a2V5fWApO1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVW5zdWJzY3JpYmUgZnJvbSBhbiBhbHJlYWR5IHN1YnNjcmliZWQgZXZlbnQuXG5cdCAqIEBwYXJhbSBzdWJzY3JpcHRpb25JZCBUaGUgaWQgb2YgdGhlIHN1YnNjcmlwdGlvbiByZXR1cm5lZCBmcm9tIHN1YnNjcmliZS5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdW5zdWJzY3JpYmUgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqL1xuXHRwdWJsaWMgdW5zdWJzY3JpYmUoZnJvbTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0XHRjb25zdCBldmVudFR5cGUgPSB0aGlzLl9zdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0XHRpZiAoZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKGBZb3UgaGF2ZSB0cmllZCB0byB1bnN1YnNjcmliZSB3aXRoIGEga2V5ICR7ZnJvbX0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChldmVudFR5cGUpIHtcblx0XHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VkSW5TdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2JlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIFwibG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9zZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGVsZXRlIHRoaXMuX3N1YnNjcmliZUlkTWFwW2Zyb21dO1xuXHRcdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7ZnJvbX0gaGFzIGJlZW4gY2xlYXJlZGApO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7ZnJvbX0gY291bGQgbm90IGJlIGNsZWFyZWQgYXMgd2UgZG8gbm90IGhhdmUgYSByZWdpc3RlciBvZiB0aGF0IGV2ZW50IHR5cGUuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERvZXMgdGhlIGF1dGggcHJvdmlkZXIgcmVxdWlyZSBhdXRoZW50aWNhdGlvbi5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gIXRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9naW4gb3BlcmF0aW9uIG9uIHRoZSBhdXRoIHByb3ZpZGVyLlxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBsb2dpbiB3YXMgc3VjY2Vzc2Z1bC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcImxvZ2luIHJlcXVlc3RlZFwiKTtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRcdHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fYXV0aE9wdGlvbnMuYXV0b0xvZ2luKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcImF1dG9Mb2dpbiBlbmFibGVkIGluIGF1dGggcHJvdmlkZSBtb2R1bGUgc2V0dGluZ3MuIEZha2UgbG9nZ2VkIGluXCIpO1xuXHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fYXV0aGVudGljYXRlZEtleSwgdGhpcy5fYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLWluXCIsIHRoaXMuX2xvZ2dlZEluU3Vic2NyaWJlcnMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2F1dGhlbnRpY2F0ZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybSB0aGUgbG9nb3V0IG9wZXJhdGlvbiBvbiB0aGUgYXV0aCBwcm92aWRlci5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbG9nb3V0IHdhcyBzdWNjZXNzZnVsLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVMb2dvdXQocmVzb2x2ZSlcblx0XHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiTG9nIG91dCBjYWxsZWRcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChhc3luYyAoZXJyb3IpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoYEVycm9yIHdoaWxlIHRyeWluZyB0byBsb2cgb3V0ICR7ZXJyb3J9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB1c2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIGF1dGggcHJvdmlkZXIuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTx1bmtub3duPiB7XG5cdFx0aWYgKHRoaXMuX2F1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5fYXV0aGVudGljYXRlZCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlciBpbmZvIHVubGVzcyB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiVGhpcyBleGFtcGxlIHJldHVybnMgYSB1c2VyIGlmIGl0IHdhcyBwcm92aWRlZCB0byB0aGUgZXhhbXBsZSBsb2dpblwiKTtcblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50VXNlcjtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLm9wZW5Mb2dpbldpbmRvdyh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybClcblx0XHRcdFx0LnRoZW4oYXN5bmMgKHdpbikgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGF1dGhNYXRjaCA9IG5ldyBSZWdFeHAodGhpcy5fYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCwgXCJpXCIpO1xuXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgY2hlY2tpbmcgaWYgbG9naW4gd2luZG93IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZC4gRXJyb3IgJHtlcnJvci5tZXNzYWdlfWBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGV0IHN0YXR1c0NoZWNrOiBudW1iZXI7XG5cblx0XHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHdpbikge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIHRoaXMuX2F1dGhPcHRpb25zLmNoZWNrTG9naW5TdGF0dXNJblNlY29uZHMgPz8gMSAqIDEwMDApO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclwiLCBlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjaGVja0ZvclNlc3Npb25FeHBpcnkoZm9yY2UgPSBmYWxzZSkge1xuXHRcdGlmIChcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHR0aGlzLl9hdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgPiAtMSAmJlxuXHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0dGhpcy5fc2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3Nlc3Npb25FeHBpcnlDaGVja0lkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCB0aGlzLmNoZWNrQXV0aCh0aGlzLl9hdXRoT3B0aW9ucy5sb2dpblVybCk7XG5cdFx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRcdHRoaXMuY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2F1dGhlbnRpY2F0ZWRLZXkpO1xuXHRcdFx0XHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHRoaXMuX3Nlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzLl9hdXRoT3B0aW9ucy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyAqIDEwMDApO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgbm90aWZ5U3Vic2NyaWJlcnMoZXZlbnRUeXBlOiBzdHJpbmcsIHN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+Pikge1xuXHRcdGNvbnN0IHN1YnNjcmliZXJJZHMgPSBBcnJheS5mcm9tKHN1YnNjcmliZXJzLmtleXMoKSk7XG5cdFx0c3Vic2NyaWJlcklkcy5yZXZlcnNlKCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHN1YnNjcmliZXJJZCA9IHN1YnNjcmliZXJJZHNbaV07XG5cdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0YE5vdGlmeWluZyBzdWJzY3JpYmVyIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmliZXJJZH0gb2YgZXZlbnQgdHlwZTogJHtldmVudFR5cGV9YFxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHN1YnNjcmliZXJzLmdldChzdWJzY3JpYmVySWQpKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5fYXV0aGVudGljYXRlZCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLl9hdXRoZW50aWNhdGVkKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJMb2cgb3V0IHJlcXVlc3RlZFwiKTtcblx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgdGhpcy5fYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9hdXRoZW50aWNhdGVkS2V5KTtcblx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMubG9nb3V0VXJsICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdHRoaXMuX2F1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gbnVsbCAmJlxuXHRcdFx0dGhpcy5fYXV0aE9wdGlvbnMubG9nb3V0VXJsLnRyaW0oKS5sZW5ndGggPiAwXG5cdFx0KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCB3aW4gPSBhd2FpdCB0aGlzLm9wZW5Mb2dvdXRXaW5kb3codGhpcy5fYXV0aE9wdGlvbnMubG9nb3V0VXJsKTtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgdGhpcy5fbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCB0aGlzLl9sb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRcdGNvbnN0IGVucmljaGVkQ3VzdG9tRGF0YSA9IHtcblx0XHRcdGN1cnJlbnRVc2VyS2V5OiBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSxcblx0XHRcdC4uLnRoaXMuX2F1dGhPcHRpb25zPy5jdXN0b21EYXRhXG5cdFx0fTtcblx0XHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLWluXCIsXG5cdFx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsLFxuXHRcdFx0Y3VzdG9tRGF0YTogZW5yaWNoZWRDdXN0b21EYXRhXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG9wZW5Mb2dvdXRXaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdFx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1vdXRcIixcblx0XHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2F1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRcdGRlZmF1bHRXaWR0aDogdGhpcy5fYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0dXJsXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGNoZWNrQXV0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogdGhpcy5fYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiB0aGlzLl9hdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0XHR1cmxcblx0XHR9KTtcblx0XHRsZXQgaXNBdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRcdGlmIChpbmZvLnVybCA9PT0gdGhpcy5fYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXCJFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uXCIsIGVycm9yKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKHdpbmRvd1RvQ2hlY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEN1c3RvbVNldHRpbmdzLCBQbGF0Zm9ybUFwcCB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBFbmRwb2ludCwgRW5kcG9pbnREZWZpbml0aW9uLCBGZXRjaE9wdGlvbnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlRW5kcG9pbnRPcHRpb25zLCBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIEV4YW1wbGVBdXRoRW5kcG9pbnQgaW1wbGVtZW50cyBFbmRwb2ludDxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPiB7XG5cdHByaXZhdGUgX2RlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZUVuZHBvaW50T3B0aW9ucz47XG5cblx0cHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSBfcm9sZU1hcHBpbmc6IHsgW2tleTogc3RyaW5nXTogRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+LFxuXHRcdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0XHRoZWxwZXJzPzogTW9kdWxlSGVscGVyc1xuXHQpIHtcblx0XHR0aGlzLl9sb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJFeGFtcGxlQXV0aEVuZHBvaW50XCIpO1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0XHR0aGlzLl9yb2xlTWFwcGluZyA9IGRlZmluaXRpb24/LmRhdGE/LnJvbGVNYXBwaW5nO1xuXHRcdHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBhIHJlcXVlc3QgcmVzcG9uc2Ugb24gYW4gZW5kcG9pbnQuXG5cdCAqIEBwYXJhbSBlbmRwb2ludERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGVuZHBvaW50LlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3QsIG9yIG51bGwgb2Ygbm90IGhhbmRsZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdFJlc3BvbnNlKFxuXHRcdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPEZldGNoT3B0aW9ucz4sXG5cdFx0cmVxdWVzdD86IHVua25vd25cblx0KTogUHJvbWlzZTx1bmtub3duPiB7XG5cdFx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fbG9nZ2VyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFxuXHRcdFx0XHRcIlRoaXMgYXV0aCBlbmRwb2ludCBtb2R1bGUgaXMgYW4gZXhhbXBsZSB0aGF0IHRoYXQgc2ltdWxhdGVzIHJlcXVlc3RpbmcgYSBodHRwIGVuZHBvaW50IGFuZCBtYW5pcHVsYXRpbmcgaXQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZXhhbXBsZSB1c2VyIGFzIGlmIGl0IHdhcyB0aGUgc2VydmVyIGRvaW5nIHRoZSBtYW5pcHVsYXRpb24uIERPIE5PVCBVU0UgVEhJUyBNT0RVTEUgSU4gUFJPRFVDVElPTi5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCB7IHVybCwgLi4ub3B0aW9ucyB9OiBGZXRjaE9wdGlvbnMgPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblxuXHRcdGNvbnN0IHJlcSA9IHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnModXJsIGFzIHN0cmluZywgb3B0aW9ucywgcmVxdWVzdCk7XG5cdFx0aWYgKHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXEub3B0aW9ucy5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0YCR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBzcGVjaWZpZXMgYSB0eXBlOiAke2VuZHBvaW50RGVmaW5pdGlvbi50eXBlfSB3aXRoIGEgbWV0aG9kICR7cmVxLm9wdGlvbnMubWV0aG9kfSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQuYFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxLnVybCwgcmVxLm9wdGlvbnMgYXMgUmVxdWVzdEluaXQpO1xuXG5cdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcblx0XHRcdFx0Ly8gcmV0dXJuZWQgYXBwc1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHBseUN1cnJlbnRVc2VyVG9BcHBzKGpzb24pIGFzIHVua25vd247XG5cdFx0XHR9XG5cdFx0XHQvLyBzZXR0aW5nc1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3MoanNvbikgYXMgdW5rbm93bjtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGdldFJlcXVlc3RPcHRpb25zKFxuXHRcdHVybDogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IEZldGNoT3B0aW9ucyxcblx0XHRyZXF1ZXN0OiB1bmtub3duXG5cdCk6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRcdGlmIChyZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0XHRpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoYFske2tleXNbaV19XWAsIGVuY29kZVVSSUNvbXBvbmVudChyZXF1ZXN0W2tleXNbaV1dIGFzIHN0cmluZykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiICYmIHJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHsgdXJsLCBvcHRpb25zIH07XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb0FwcHMoYXBwczogUGxhdGZvcm1BcHBbXSA9IFtdKTogUGxhdGZvcm1BcHBbXSB7XG5cdFx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRcdGlmIChcblx0XHRcdGN1cnJlbnRVc2VyID09PSBudWxsIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWcgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGFwcHM7XG5cdFx0fVxuXHRcdGNvbnN0IGV4Y2x1ZGVUYWcgPSB0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cdFx0Y29uc3QgZmlsdGVyZWRBcHBzOiBQbGF0Zm9ybUFwcFtdID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzW2ldLnRhZ3MpKSB7XG5cdFx0XHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBhcHBzW2ldLnRhZ3MubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0XHRjb25zdCB0YWc6IHN0cmluZyA9IGFwcHNbaV0udGFnc1t0XTtcblx0XHRcdFx0XHRpZiAoZXhjbHVkZVRhZy5pbmNsdWRlcyh0YWcpKSB7XG5cdFx0XHRcdFx0XHRpbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGluY2x1ZGUpIHtcblx0XHRcdFx0XHRmaWx0ZXJlZEFwcHMucHVzaChhcHBzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZmlsdGVyZWRBcHBzLnB1c2goYXBwc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaWx0ZXJlZEFwcHM7XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncyk6IEN1c3RvbVNldHRpbmdzIHtcblx0XHRjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0aWYgKFxuXHRcdFx0Y3VycmVudFVzZXIgPT09IG51bGwgfHxcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nID09PSB1bmRlZmluZWQgfHxcblx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdID09PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHJldHVybiBzZXR0aW5ncztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8ubW9kdWxlcykpIHtcblx0XHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIubW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0ZGF0YTogdGhpcy5fZGVmaW5pdGlvbixcblx0XHRcdFx0ZW5hYmxlZDogdGhpcy5fZGVmaW5pdGlvbi5lbmFibGVkLFxuXHRcdFx0XHRpZDogdGhpcy5fZGVmaW5pdGlvbi5pZCxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuX2RlZmluaXRpb24uZGVzY3JpcHRpb24sXG5cdFx0XHRcdGljb246IHRoaXMuX2RlZmluaXRpb24uaWNvbixcblx0XHRcdFx0aW5mbzogdGhpcy5fZGVmaW5pdGlvbi5pbmZvLFxuXHRcdFx0XHR0aXRsZTogdGhpcy5fZGVmaW5pdGlvbi50aXRsZSxcblx0XHRcdFx0dXJsOiB0aGlzLl9kZWZpbml0aW9uLnVybFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LmVuZHBvaW50UHJvdmlkZXI/LmVuZHBvaW50cykgJiZcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IGFwcEVuZHBvaW50cyA9IHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHM7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwRW5kcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBhcHBFbmRwb2ludHNbaV0gPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZHBvaW50VG9VcGRhdGUgPSBzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyLmVuZHBvaW50cy5maW5kKFxuXHRcdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gYXBwRW5kcG9pbnRzW2ldICYmIGVuZHBvaW50RW50cnkudHlwZSA9PT0gXCJmZXRjaFwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKGVuZHBvaW50VG9VcGRhdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGUgPSBcIm1vZHVsZVwiO1xuXHRcdFx0XHRcdFx0XHQvLyB0aGlzIGlmIGNvbmRpdGlvbiBjaGVjayBpcyBoZXJlIHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweSB3aXRoIHRoZSBlbmRwb2ludCBzbyB0aGF0IHR5cGVJZCBjYW4gYmUgc2V0XG5cdFx0XHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlLnR5cGUgPT09IFwibW9kdWxlXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGVJZCA9IHRoaXMuX2RlZmluaXRpb24uaWQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy50aGVtZVByb3ZpZGVyPy50aGVtZXMpICYmXG5cdFx0XHRzZXR0aW5ncy50aGVtZVByb3ZpZGVyLnRoZW1lcy5sZW5ndGggPiAwICYmXG5cdFx0XHR0aGlzLl9yb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0c2V0dGluZ3MudGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRcdHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcblx0XHRcdGNvbnN0IHN0b3JlZFNjaGVtZVByZWZlcmVuY2UgPSBgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0tU2VsZWN0ZWRDb2xvclNjaGVtZWA7XG5cdFx0XHR0aGlzLl9sb2dnZXIud2Fybihcblx0XHRcdFx0XCJUaGlzIGlzIGEgZGVtbyBtb2R1bGUgd2hlcmUgd2UgYXJlIGNsZWFyaW5nIHRoZSBsb2NhbGx5IHN0b3JlZCBzY2hlbWUgcHJlZmVyZW5jZSBpbiBvcmRlciB0byBzaG93IGRpZmZlcmVudCBzY2hlbWUncyBsaWdodC9kYXJrIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBUaGlzIG1lYW5zIHRoYXQgaXQgd2lsbCBhbHdheXMgYmUgc2V0IHRvIHdoYXQgaXMgaW4gdGhlIHJvbGUgbWFwcGluZyBpbml0aWFsbHkgYW5kIG5vdCB3aGF0IGl0IGlzIHNldCB0byBsb2NhbGx5IG9uIHJlc3RhcnQuXCJcblx0XHRcdCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yZWRTY2hlbWVQcmVmZXJlbmNlKTtcblx0XHR9XG5cblx0XHRjb25zdCBleGNsdWRlTWVudUFjdGlvbklkcyA9IHRoaXMuX3JvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVNZW51QWN0aW9uO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVBY3Rpb25JZHMpKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LmJyb3dzZXJQcm92aWRlcj8uZ2xvYmFsTWVudSkgJiZcblx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLmdsb2JhbE1lbnUubGVuZ3RoID4gMFxuXHRcdFx0KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLmdsb2JhbE1lbnUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBnbG9iYWxNZW51QWN0aW9uSWQ6IHN0cmluZyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5nbG9iYWxNZW51W2ldPy5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhnbG9iYWxNZW51QWN0aW9uSWQpKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5wYWdlTWVudSkgJiZcblx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51Lmxlbmd0aCA+IDBcblx0XHRcdCkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5wYWdlTWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IHBhZ2VNZW51QWN0aW9uSWQ6IHN0cmluZyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5wYWdlTWVudVtpXT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMocGFnZU1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5wYWdlTWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy52aWV3TWVudSkgJiZcblx0XHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnZpZXdNZW51Lmxlbmd0aCA+IDBcblx0XHRcdCkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IHZpZXdNZW51QWN0aW9uSWQ6IHN0cmluZyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudVtpXT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXModmlld01lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldHRpbmdzO1xuXHR9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEV4YW1wbGVVc2VyIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbmV4cG9ydCBjb25zdCBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1FWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSYDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCk6IEV4YW1wbGVVc2VyIHwgbnVsbCB7XG5cdGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG5cdGlmIChzdG9yZWRVc2VyID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyOiBFeGFtcGxlVXNlcik6IHZvaWQge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDdXJyZW50VXNlcigpIHtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVkpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBFeGFtcGxlQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgRXhhbXBsZUF1dGhFbmRwb2ludCB9IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBuZXcgRXhhbXBsZUF1dGhQcm92aWRlcigpLFxuXHRlbmRwb2ludDogbmV3IEV4YW1wbGVBdXRoRW5kcG9pbnQoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==