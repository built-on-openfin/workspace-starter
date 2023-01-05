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

/***/ "./client/src/modules/auth/example/auth-provider.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/auth/example/auth-provider.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserInfo": () => (/* binding */ getUserInfo),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "isAuthenticationRequired": () => (/* binding */ isAuthenticationRequired),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "unsubscribe": () => (/* binding */ unsubscribe)
/* harmony export */ });
/* harmony import */ var _framework_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/uuid */ "./client/src/framework/uuid.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");


let authenticated;
let authOptions;
let currentUser;
let userSessionKey;
let sessionExpiryCheckId;
let logger;
const subscribeIdMap = {};
const loggedInSubscribers = new Map();
const beforeLoggedOutSubscribers = new Map();
const loggedOutSubscribers = new Map();
const sessionExpiredSubscribers = new Map();
const EXAMPLE_AUTH_AUTHENTICATED_KEY = "EXAMPLE_AUTH_IS_AUTHENTICATED";
async function openLoginWindow(url) {
    return fin.Window.create({
        name: "example-auth-log-in",
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        autoShow: false,
        defaultCentered: true,
        defaultHeight: authOptions.loginHeight ?? 325,
        defaultWidth: authOptions.loginWidth ?? 400,
        includeInSnapshots: false,
        resizable: false,
        showTaskbarIcon: false,
        saveWindowState: false,
        url,
        customData: authOptions.customData
    });
}
async function openLogoutWindow(url) {
    return fin.Window.create({
        name: "example-auth-log-out",
        maximizable: false,
        minimizable: false,
        autoShow: false,
        defaultCentered: true,
        defaultHeight: authOptions.loginHeight ?? 325,
        defaultWidth: authOptions.loginWidth ?? 400,
        includeInSnapshots: false,
        resizable: false,
        showTaskbarIcon: false,
        saveWindowState: false,
        url
    });
}
async function checkAuth(url) {
    const windowToCheck = await fin.Window.create({
        name: "example-auth-check-window",
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        autoShow: false,
        defaultHeight: authOptions.loginHeight ?? 325,
        defaultWidth: authOptions.loginWidth ?? 400,
        includeInSnapshots: false,
        resizable: false,
        showTaskbarIcon: false,
        saveWindowState: false,
        url
    });
    let isAuthenticated = false;
    try {
        const info = await windowToCheck.getInfo();
        if (info.url === authOptions.authenticatedUrl) {
            isAuthenticated = true;
        }
    }
    catch (error) {
        logger.error("Error encountered while checking session", error);
    }
    finally {
        if (windowToCheck !== undefined) {
            await windowToCheck.close(true);
        }
    }
    return isAuthenticated;
}
async function getAuthenticationFromUser() {
    return new Promise((resolve, reject) => {
        openLoginWindow(authOptions.loginUrl)
            .then(async (win) => {
            const authMatch = new RegExp(authOptions.authenticatedUrl, "i");
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
                logger.error(`Error while checking if login window automatically redirected. Error ${error.message}`);
                if (win !== undefined) {
                    await win.show(true);
                }
            }
            let statusCheck;
            await win.addListener("closed", async () => {
                if (win) {
                    window.clearInterval(statusCheck);
                    statusCheck = undefined;
                    logger.info("Auth Window cancelled by user");
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
            }, authOptions.checkLoginStatusInSeconds ?? 1 * 1000);
            return true;
        })
            .catch((error) => {
            logger.error("Error while trying to authenticate the user", error);
        });
    });
}
function checkForSessionExpiry(force = false) {
    if (authOptions?.checkSessionValidityInSeconds !== undefined &&
        authOptions?.checkSessionValidityInSeconds > -1 &&
        sessionExpiryCheckId === undefined) {
        sessionExpiryCheckId = setTimeout(async () => {
            sessionExpiryCheckId = undefined;
            const stillAuthenticated = await checkAuth(authOptions.loginUrl);
            if (stillAuthenticated) {
                logger.info("Session Still Active");
                checkForSessionExpiry();
            }
            else {
                logger.info("Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check");
                authenticated = false;
                localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
                (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)(userSessionKey);
                await notifySubscribers("session-expired", sessionExpiredSubscribers);
            }
        }, authOptions.checkSessionValidityInSeconds * 1000);
    }
}
async function notifySubscribers(eventType, subscribers) {
    const subscriberIds = Array.from(subscribers.keys());
    subscriberIds.reverse();
    for (let i = 0; i < subscriberIds.length; i++) {
        const subscriberId = subscriberIds[i];
        logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`);
        await subscribers.get(subscriberId)();
    }
}
async function handleLogout(resolve) {
    if (authenticated === undefined || !authenticated) {
        logger.error("You have requested to log out but are not logged in");
        resolve(false);
        return;
    }
    logger.info("Log out requested");
    await notifySubscribers("before-logged-out", beforeLoggedOutSubscribers);
    authenticated = false;
    localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
    (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)(userSessionKey);
    if (authOptions.logoutUrl !== undefined &&
        authOptions.logoutUrl !== null &&
        authOptions.logoutUrl.trim().length > 0) {
        try {
            const win = await openLogoutWindow(authOptions.logoutUrl);
            setTimeout(async () => {
                await win.close();
                await notifySubscribers("logged-out", loggedOutSubscribers);
                resolve(true);
            }, 2000);
        }
        catch (error) {
            logger.error(`Error while launching logout window. ${error}`);
            return resolve(false);
        }
    }
    else {
        await notifySubscribers("logged-out", loggedOutSubscribers);
        resolve(true);
    }
}
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("AuthExample");
    if (authOptions === undefined) {
        logger.info(`Setting options: ${JSON.stringify(definition.data, null, 4)}`);
        authOptions = definition.data;
        authenticated = Boolean(localStorage.getItem(EXAMPLE_AUTH_AUTHENTICATED_KEY));
        if (authOptions?.customData?.userSessionId !== undefined) {
            userSessionKey = authOptions?.customData?.userSessionId;
        }
        if (authenticated) {
            currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)(userSessionKey);
            checkForSessionExpiry();
        }
    }
    else {
        logger.warn("Options have already been set as init has already been called");
    }
}
function subscribe(to, callback) {
    const key = (0,_framework_uuid__WEBPACK_IMPORTED_MODULE_0__.randomUUID)();
    let matchFound = false;
    switch (to) {
        case "logged-in": {
            matchFound = true;
            loggedInSubscribers.set(key, callback);
            break;
        }
        case "before-logged-out": {
            matchFound = true;
            beforeLoggedOutSubscribers.set(key, callback);
            break;
        }
        case "logged-out": {
            matchFound = true;
            loggedOutSubscribers.set(key, callback);
            break;
        }
        case "session-expired": {
            matchFound = true;
            sessionExpiredSubscribers.set(key, callback);
            break;
        }
    }
    if (matchFound) {
        subscribeIdMap[key] = to;
        logger.info(`Subscription to ${to} events registered. Subscription Id: ${key}`);
        return key;
    }
    return null;
}
function unsubscribe(from) {
    let matchFound = false;
    const eventType = subscribeIdMap[from];
    if (eventType === undefined) {
        logger.warn(`You have tried to unsubscribe with a key ${from} that is invalid`);
        return false;
    }
    switch (eventType) {
        case "logged-in": {
            matchFound = true;
            loggedInSubscribers.delete(from);
            break;
        }
        case "before-logged-out": {
            matchFound = true;
            beforeLoggedOutSubscribers.delete(from);
            break;
        }
        case "logged-out": {
            matchFound = true;
            loggedOutSubscribers.delete(from);
            break;
        }
        case "session-expired": {
            matchFound = true;
            sessionExpiredSubscribers.delete(from);
            break;
        }
    }
    delete subscribeIdMap[from];
    if (matchFound) {
        logger.info(`Subscription to ${eventType} events with subscription Id: ${from} has been cleared`);
        return true;
    }
    logger.warn(`Subscription to ${eventType} events with subscription Id: ${from} could not be cleared as we do not have a register of that event type.`);
    return false;
}
async function login() {
    logger.info("login requested");
    if (authenticated) {
        logger.info("User already authenticated");
        return authenticated;
    }
    if (authOptions.autoLogin) {
        logger.info("autoLogin enabled in auth provide module settings. Fake logged in");
        authenticated = true;
    }
    else {
        authenticated = await getAuthenticationFromUser();
    }
    if (authenticated) {
        localStorage.setItem(EXAMPLE_AUTH_AUTHENTICATED_KEY, authenticated.toString());
        checkForSessionExpiry();
        await notifySubscribers("logged-in", loggedInSubscribers);
    }
    else {
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)(userSessionKey);
    }
    return authenticated;
}
async function logout() {
    return new Promise((resolve, reject) => {
        handleLogout(resolve)
            .then(async () => {
            logger.info("Log out called");
            return true;
        })
            .catch(async (error) => {
            logger.error(`Error while trying to log out ${error}`);
        });
    });
}
async function isAuthenticationRequired() {
    if (authenticated === undefined) {
        authenticated = false;
    }
    return !authenticated;
}
async function getUserInfo() {
    if (authenticated === undefined || !authenticated) {
        logger.warn("Unable to retrieve user info unless the user is authenticated");
        return null;
    }
    logger.info("This example returns a user if it was provided to the example login");
    return currentUser;
}


/***/ }),

/***/ "./client/src/modules/auth/example/endpoint.ts":
/*!*****************************************************!*\
  !*** ./client/src/modules/auth/example/endpoint.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "requestResponse": () => (/* binding */ requestResponse)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./client/src/modules/auth/example/util.ts");

let logger;
let userSessionKey;
let roleMapping;
let definitionData;
function getRequestOptions(url, options, request) {
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
function applyCurrentUserToApps(apps = []) {
    const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)(userSessionKey);
    if (currentUser === null ||
        roleMapping === undefined ||
        roleMapping[currentUser.role] === undefined ||
        roleMapping[currentUser.role].excludeAppsWithTag === undefined) {
        return apps;
    }
    const excludeTag = roleMapping[currentUser.role].excludeAppsWithTag;
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
function applyCurrentUserToSettings(settings) {
    const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)(userSessionKey);
    if (currentUser === null || roleMapping === undefined || roleMapping[currentUser.role] === undefined) {
        return settings;
    }
    if (Array.isArray(settings?.endpointProvider?.modules)) {
        settings.endpointProvider.modules.push({
            data: definitionData,
            enabled: definitionData.enabled,
            id: definitionData.id,
            description: definitionData.description,
            icon: definitionData.icon,
            info: definitionData.info,
            title: definitionData.title,
            url: definitionData.url
        });
        if (Array.isArray(settings?.endpointProvider?.endpoints) &&
            Array.isArray(settings?.appProvider?.endpointIds)) {
            const appEndpoints = settings?.appProvider?.endpointIds;
            for (let i = 0; i < appEndpoints.length; i++) {
                if (typeof appEndpoints[i] === "string") {
                    const endpointToUpdate = settings.endpointProvider.endpoints.find((endpointEntry) => endpointEntry.id === appEndpoints[i] && endpointEntry.type === "fetch");
                    endpointToUpdate.type = "module";
                    if (endpointToUpdate.type === "module") {
                        endpointToUpdate.typeId = definitionData.id;
                    }
                }
            }
        }
    }
    if (Array.isArray(settings?.themeProvider?.themes) &&
        settings?.themeProvider?.themes.length > 0 &&
        roleMapping[currentUser.role].preferredScheme !== undefined) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        settings.themeProvider.themes[0]["default"] = roleMapping[currentUser.role].preferredScheme;
    }
    const excludeMenuActionIds = roleMapping[currentUser.role].excludeMenuAction;
    if (Array.isArray(excludeMenuActionIds)) {
        if (Array.isArray(settings?.browserProvider?.globalMenu) &&
            settings?.browserProvider?.globalMenu.length > 0) {
            for (let i = 0; i < settings?.browserProvider?.globalMenu.length; i++) {
                const globalMenuActionId = settings.browserProvider.globalMenu[i]?.data?.action?.id;
                if (excludeMenuActionIds.includes(globalMenuActionId)) {
                    settings.browserProvider.globalMenu[i].include = false;
                }
            }
        }
        if (Array.isArray(settings?.browserProvider?.pageMenu) &&
            settings?.browserProvider?.pageMenu.length > 0) {
            for (let i = 0; i < settings?.browserProvider?.pageMenu.length; i++) {
                const pageMenuActionId = settings.browserProvider.pageMenu[i]?.data?.action?.id;
                if (excludeMenuActionIds.includes(pageMenuActionId)) {
                    settings.browserProvider.pageMenu[i].include = false;
                }
            }
        }
        if (Array.isArray(settings?.browserProvider?.viewMenu) &&
            settings?.browserProvider?.viewMenu.length > 0) {
            for (let i = 0; i < settings?.browserProvider?.viewMenu.length; i++) {
                const viewMenuActionId = settings.browserProvider.viewMenu[i]?.data?.action?.id;
                if (excludeMenuActionIds.includes(viewMenuActionId)) {
                    settings.browserProvider.viewMenu[i].include = false;
                }
            }
        }
    }
    return settings;
}
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("ExampleAuthEndpoint");
    logger.info("Was passed the following options", definition.data);
    userSessionKey = definition?.data?.userSessionId;
    roleMapping = definition?.data?.roleMapping;
    definitionData = definition;
}
async function requestResponse(endpointDefinition, request) {
    if (endpointDefinition.type !== "module") {
        logger.warn(`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`);
        return null;
    }
    if (logger !== undefined) {
        logger.info("This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION.");
    }
    const { url, ...options } = endpointDefinition.options;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const req = getRequestOptions(url, options, request);
    if (req.options.method !== "GET" && req.options.method !== "POST") {
        logger.warn(`${endpointDefinition.id} specifies a type: ${endpointDefinition.type} with a method ${req.options.method} that is not supported.`);
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await fetch(req.url, req.options);
    if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json)) {
            // returned apps
            return applyCurrentUserToApps(json);
        }
        // settings
        return applyCurrentUserToSettings(json);
    }
    return null;
}


/***/ }),

/***/ "./client/src/modules/auth/example/util.ts":
/*!*************************************************!*\
  !*** ./client/src/modules/auth/example/util.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearCurrentUser": () => (/* binding */ clearCurrentUser),
/* harmony export */   "getCurrentUser": () => (/* binding */ getCurrentUser),
/* harmony export */   "setCurrentUser": () => (/* binding */ setCurrentUser)
/* harmony export */ });
function getCurrentUser(userSessionId) {
    if (userSessionId === undefined || userSessionId === null) {
        return null;
    }
    const storedUser = localStorage.getItem(userSessionId);
    if (storedUser === null) {
        return null;
    }
    return JSON.parse(storedUser);
}
function setCurrentUser(userSessionId, user) {
    if (userSessionId === undefined || userSessionId === null) {
        return false;
    }
    localStorage.setItem(userSessionId, JSON.stringify(user));
    return true;
}
function clearCurrentUser(userSessionId) {
    localStorage.removeItem(userSessionId);
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
/* harmony import */ var _auth_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-provider */ "./client/src/modules/auth/example/auth-provider.ts");
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/auth/example/endpoint.ts");


const entryPoints = {
    auth: _auth_provider__WEBPACK_IMPORTED_MODULE_0__,
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_1__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCLEVBQUUsSUFBaUI7SUFDdEUsSUFBSSxhQUFhLEtBQUssU0FBUyxJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7UUFDMUQsT0FBTyxLQUFLLENBQUM7S0FDYjtJQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFFTSxTQUFTLGdCQUFnQixDQUFDLGFBQXFCO0lBQ3JELFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsQ0FBQzs7Ozs7OztTQ3ZCRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0xzRDtBQUNEO0FBRTlDLE1BQU0sV0FBVyxHQUFxRDtJQUM1RSxJQUFJLEVBQUUsMkNBQWtCO0lBQ3hCLFFBQVEsRUFBRSxzQ0FBc0I7Q0FDaEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvdXVpZC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvZW5kcG9pbnQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIHdpbmRvdy5jcnlwdG8pIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRyZXR1cm4gd2luZG93LmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdGNvbnN0IGdldFJhbmRvbUhleCA9IChjKSA9PlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1taXhlZC1vcGVyYXRvcnNcblx0XHQoYyBeICh3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKGMgLyA0KSkpKS50b1N0cmluZygxNik7XG5cdHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIGdldFJhbmRvbUhleCk7XG59XG4iLCJpbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdXVpZFwiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlT3B0aW9ucywgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGNsZWFyQ3VycmVudFVzZXIsIGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5sZXQgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbmxldCBhdXRoT3B0aW9uczogRXhhbXBsZU9wdGlvbnM7XG5sZXQgY3VycmVudFVzZXI6IEV4YW1wbGVVc2VyO1xubGV0IHVzZXJTZXNzaW9uS2V5OiBzdHJpbmc7XG5sZXQgc2Vzc2lvbkV4cGlyeUNoZWNrSWQ7XG5sZXQgbG9nZ2VyOiBMb2dnZXI7XG5cbmNvbnN0IHN1YnNjcmliZUlkTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5jb25zdCBsb2dnZWRJblN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcbmNvbnN0IGxvZ2dlZE91dFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcbmNvbnN0IHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkgPSBcIkVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmwsXG5cdFx0Y3VzdG9tRGF0YTogYXV0aE9wdGlvbnMuY3VzdG9tRGF0YVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdGRlZmF1bHRIZWlnaHQ6IGF1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRkZWZhdWx0V2lkdGg6IGF1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0dXJsXG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAzMjUsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcblx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHR0cnkge1xuXHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRpZiAoaW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlci5lcnJvcihcIkVycm9yIGVuY291bnRlcmVkIHdoaWxlIGNoZWNraW5nIHNlc3Npb25cIiwgZXJyb3IpO1xuXHR9IGZpbmFsbHkge1xuXHRcdGlmICh3aW5kb3dUb0NoZWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGF3YWl0IHdpbmRvd1RvQ2hlY2suY2xvc2UodHJ1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBpc0F1dGhlbnRpY2F0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0b3BlbkxvZ2luV2luZG93KGF1dGhPcHRpb25zLmxvZ2luVXJsKVxuXHRcdFx0LnRoZW4oYXN5bmMgKHdpbikgPT4ge1xuXHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0bG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7ZXJyb3IubWVzc2FnZX1gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyO1xuXG5cdFx0XHRcdGF3YWl0IHdpbi5hZGRMaXN0ZW5lcihcImNsb3NlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHdpbikge1xuXHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0bG9nZ2VyLmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclwiLCBlcnJvcik7XG5cdFx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yU2Vzc2lvbkV4cGlyeShmb3JjZSA9IGZhbHNlKSB7XG5cdGlmIChcblx0XHRhdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgIT09IHVuZGVmaW5lZCAmJlxuXHRcdGF1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyA+IC0xICYmXG5cdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRzZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBjaGVja0F1dGgoYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0aWYgKHN0aWxsQXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFwiU2Vzc2lvbiBub3QgdmFsaWQuIEtpbGxpbmcgc2Vzc2lvbiBhbmQgbm90aWZ5aW5nIHJlZ2lzdGVyZWQgY2FsbGJhY2sgdGhhdCBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBjaGVjayBpcyBjb25maWd1cmVkIGluIHRoZSBkYXRhIGZvciB0aGlzIGV4YW1wbGUgYXV0aCBtb2R1bGUuIFNldCBjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyB0byAtMSBpbiB0aGUgYXV0aFByb3ZpZGVyIG1vZHVsZSBkZWZpbml0aW9uIGlmIHlvdSB3aXNoIHRvIGRpc2FibGUgdGhpcyBjaGVja1wiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKTtcblx0XHRcdFx0Y2xlYXJDdXJyZW50VXNlcih1c2VyU2Vzc2lvbktleSk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0fVxuXHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICogMTAwMCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbm90aWZ5U3Vic2NyaWJlcnMoZXZlbnRUeXBlOiBzdHJpbmcsIHN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+Pikge1xuXHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdGxvZ2dlci5pbmZvKGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWApO1xuXHRcdGF3YWl0IHN1YnNjcmliZXJzLmdldChzdWJzY3JpYmVySWQpKCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIWF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIuZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxvZ2dlci5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdGNsZWFyQ3VycmVudFVzZXIodXNlclNlc3Npb25LZXkpO1xuXHRpZiAoXG5cdFx0YXV0aE9wdGlvbnMubG9nb3V0VXJsICE9PSB1bmRlZmluZWQgJiZcblx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IG51bGwgJiZcblx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwudHJpbSgpLmxlbmd0aCA+IDBcblx0KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHdpbiA9IGF3YWl0IG9wZW5Mb2dvdXRXaW5kb3coYXV0aE9wdGlvbnMubG9nb3V0VXJsKTtcblx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UoKTtcblx0XHRcdFx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIGxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoYEVycm9yIHdoaWxlIGxhdW5jaGluZyBsb2dvdXQgd2luZG93LiAke2Vycm9yfWApO1xuXHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRhd2FpdCBub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdHJlc29sdmUodHJ1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoXG5cdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RXhhbXBsZU9wdGlvbnM+LFxuXHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcbikge1xuXHRsb2dnZXIgPSBjcmVhdGVMb2dnZXIoXCJBdXRoRXhhbXBsZVwiKTtcblx0aWYgKGF1dGhPcHRpb25zID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIuaW5mbyhgU2V0dGluZyBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGRlZmluaXRpb24uZGF0YSwgbnVsbCwgNCl9YCk7XG5cdFx0YXV0aE9wdGlvbnMgPSBkZWZpbml0aW9uLmRhdGE7XG5cdFx0YXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKSk7XG5cdFx0aWYgKGF1dGhPcHRpb25zPy5jdXN0b21EYXRhPy51c2VyU2Vzc2lvbklkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHVzZXJTZXNzaW9uS2V5ID0gYXV0aE9wdGlvbnM/LmN1c3RvbURhdGE/LnVzZXJTZXNzaW9uSWQ7XG5cdFx0fVxuXHRcdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKHVzZXJTZXNzaW9uS2V5KTtcblx0XHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dnZXIud2FybihcIk9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcIik7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZShcblx0dG86IFwibG9nZ2VkLWluXCIgfCBcImJlZm9yZS1sb2dnZWQtb3V0XCIgfCBcImxvZ2dlZC1vdXRcIiB8IFwic2Vzc2lvbi1leHBpcmVkXCIsXG5cdGNhbGxiYWNrOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4pOiBzdHJpbmcge1xuXHRjb25zdCBrZXkgPSByYW5kb21VVUlEKCk7XG5cdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdHN3aXRjaCAodG8pIHtcblx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkSW5TdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0YmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0c3Vic2NyaWJlSWRNYXBba2V5XSA9IHRvO1xuXHRcdGxvZ2dlci5pbmZvKGBTdWJzY3JpcHRpb24gdG8gJHt0b30gZXZlbnRzIHJlZ2lzdGVyZWQuIFN1YnNjcmlwdGlvbiBJZDogJHtrZXl9YCk7XG5cdFx0cmV0dXJuIGtleTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGZyb206IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXHRjb25zdCBldmVudFR5cGUgPSBzdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0aWYgKGV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLndhcm4oYFlvdSBoYXZlIHRyaWVkIHRvIHVuc3Vic2NyaWJlIHdpdGggYSBrZXkgJHtmcm9tfSB0aGF0IGlzIGludmFsaWRgKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzd2l0Y2ggKGV2ZW50VHlwZSkge1xuXHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRJblN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiYmVmb3JlLWxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRPdXRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0ZGVsZXRlIHN1YnNjcmliZUlkTWFwW2Zyb21dO1xuXHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdGxvZ2dlci5pbmZvKGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtmcm9tfSBoYXMgYmVlbiBjbGVhcmVkYCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRsb2dnZXIud2Fybihcblx0XHRgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7ZnJvbX0gY291bGQgbm90IGJlIGNsZWFyZWQgYXMgd2UgZG8gbm90IGhhdmUgYSByZWdpc3RlciBvZiB0aGF0IGV2ZW50IHR5cGUuYFxuXHQpO1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0bG9nZ2VyLmluZm8oXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRyZXR1cm4gYXV0aGVudGljYXRlZDtcblx0fVxuXHRpZiAoYXV0aE9wdGlvbnMuYXV0b0xvZ2luKSB7XG5cdFx0bG9nZ2VyLmluZm8oXCJhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpblwiKTtcblx0XHRhdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHRhdXRoZW50aWNhdGVkID0gYXdhaXQgZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpO1xuXHR9XG5cblx0aWYgKGF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVksIGF1dGhlbnRpY2F0ZWQudG9TdHJpbmcoKSk7XG5cdFx0Y2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtaW5cIiwgbG9nZ2VkSW5TdWJzY3JpYmVycyk7XG5cdH0gZWxzZSB7XG5cdFx0Y2xlYXJDdXJyZW50VXNlcih1c2VyU2Vzc2lvbktleSk7XG5cdH1cblxuXHRyZXR1cm4gYXV0aGVudGljYXRlZDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRoYW5kbGVMb2dvdXQocmVzb2x2ZSlcblx0XHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdFx0bG9nZ2VyLmluZm8oXCJMb2cgb3V0IGNhbGxlZFwiKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlcnJvcikgPT4ge1xuXHRcdFx0XHRsb2dnZXIuZXJyb3IoYEVycm9yIHdoaWxlIHRyeWluZyB0byBsb2cgb3V0ICR7ZXJyb3J9YCk7XG5cdFx0XHR9KTtcblx0fSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuICFhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckluZm8oKTogUHJvbWlzZTx1bmtub3duPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIWF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIud2FybihcIlVuYWJsZSB0byByZXRyaWV2ZSB1c2VyIGluZm8gdW5sZXNzIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0bG9nZ2VyLmluZm8oXCJUaGlzIGV4YW1wbGUgcmV0dXJucyBhIHVzZXIgaWYgaXQgd2FzIHByb3ZpZGVkIHRvIHRoZSBleGFtcGxlIGxvZ2luXCIpO1xuXG5cdHJldHVybiBjdXJyZW50VXNlcjtcbn1cbiIsImltcG9ydCB0eXBlIHsgQ3VzdG9tU2V0dGluZ3MsIFBsYXRmb3JtQXBwIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEVuZHBvaW50RGVmaW5pdGlvbiwgRmV0Y2hPcHRpb25zIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2VuZHBvaW50LXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRXhhbXBsZUVuZHBvaW50T3B0aW9ucywgRXhhbXBsZVVzZXJSb2xlTWFwcGluZyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmxldCBsb2dnZXI6IExvZ2dlcjtcbmxldCB1c2VyU2Vzc2lvbktleTogc3RyaW5nO1xubGV0IHJvbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcbmxldCBkZWZpbml0aW9uRGF0YTogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPjtcblxuZnVuY3Rpb24gZ2V0UmVxdWVzdE9wdGlvbnMoXG5cdHVybDogc3RyaW5nLFxuXHRvcHRpb25zOiBGZXRjaE9wdGlvbnMsXG5cdHJlcXVlc3Q6IHVua25vd25cbik6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0aWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiKSB7XG5cdFx0aWYgKHJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKGBbJHtrZXlzW2ldfV1gLCBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdFtrZXlzW2ldXSBhcyBzdHJpbmcpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgcmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdH1cblxuXHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcbn1cblxuZnVuY3Rpb24gYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBQbGF0Zm9ybUFwcFtdID0gW10pOiBQbGF0Zm9ybUFwcFtdIHtcblx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcih1c2VyU2Vzc2lvbktleSk7XG5cdGlmIChcblx0XHRjdXJyZW50VXNlciA9PT0gbnVsbCB8fFxuXHRcdHJvbGVNYXBwaW5nID09PSB1bmRlZmluZWQgfHxcblx0XHRyb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0cm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZUFwcHNXaXRoVGFnID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0cmV0dXJuIGFwcHM7XG5cdH1cblx0Y29uc3QgZXhjbHVkZVRhZyA9IHJvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZztcblx0Y29uc3QgZmlsdGVyZWRBcHBzOiBQbGF0Zm9ybUFwcFtdID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFwcHNbaV0udGFncykpIHtcblx0XHRcdGxldCBpbmNsdWRlID0gdHJ1ZTtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgYXBwc1tpXS50YWdzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGNvbnN0IHRhZzogc3RyaW5nID0gYXBwc1tpXS50YWdzW3RdO1xuXHRcdFx0XHRpZiAoZXhjbHVkZVRhZy5pbmNsdWRlcyh0YWcpKSB7XG5cdFx0XHRcdFx0aW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5jbHVkZSkge1xuXHRcdFx0XHRmaWx0ZXJlZEFwcHMucHVzaChhcHBzW2ldKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyZWRBcHBzLnB1c2goYXBwc1tpXSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmaWx0ZXJlZEFwcHM7XG59XG5cbmZ1bmN0aW9uIGFwcGx5Q3VycmVudFVzZXJUb1NldHRpbmdzKHNldHRpbmdzOiBDdXN0b21TZXR0aW5ncyk6IEN1c3RvbVNldHRpbmdzIHtcblx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcih1c2VyU2Vzc2lvbktleSk7XG5cdGlmIChjdXJyZW50VXNlciA9PT0gbnVsbCB8fCByb2xlTWFwcGluZyA9PT0gdW5kZWZpbmVkIHx8IHJvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8ubW9kdWxlcykpIHtcblx0XHRzZXR0aW5ncy5lbmRwb2ludFByb3ZpZGVyLm1vZHVsZXMucHVzaCh7XG5cdFx0XHRkYXRhOiBkZWZpbml0aW9uRGF0YSxcblx0XHRcdGVuYWJsZWQ6IGRlZmluaXRpb25EYXRhLmVuYWJsZWQsXG5cdFx0XHRpZDogZGVmaW5pdGlvbkRhdGEuaWQsXG5cdFx0XHRkZXNjcmlwdGlvbjogZGVmaW5pdGlvbkRhdGEuZGVzY3JpcHRpb24sXG5cdFx0XHRpY29uOiBkZWZpbml0aW9uRGF0YS5pY29uLFxuXHRcdFx0aW5mbzogZGVmaW5pdGlvbkRhdGEuaW5mbyxcblx0XHRcdHRpdGxlOiBkZWZpbml0aW9uRGF0YS50aXRsZSxcblx0XHRcdHVybDogZGVmaW5pdGlvbkRhdGEudXJsXG5cdFx0fSk7XG5cdFx0aWYgKFxuXHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uZW5kcG9pbnRQcm92aWRlcj8uZW5kcG9pbnRzKSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzKVxuXHRcdCkge1xuXHRcdFx0Y29uc3QgYXBwRW5kcG9pbnRzID0gc2V0dGluZ3M/LmFwcFByb3ZpZGVyPy5lbmRwb2ludElkcztcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXBwRW5kcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXBwRW5kcG9pbnRzW2ldID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0Y29uc3QgZW5kcG9pbnRUb1VwZGF0ZSA9IHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIuZW5kcG9pbnRzLmZpbmQoXG5cdFx0XHRcdFx0XHQoZW5kcG9pbnRFbnRyeSkgPT4gZW5kcG9pbnRFbnRyeS5pZCA9PT0gYXBwRW5kcG9pbnRzW2ldICYmIGVuZHBvaW50RW50cnkudHlwZSA9PT0gXCJmZXRjaFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRlbmRwb2ludFRvVXBkYXRlLnR5cGUgPSBcIm1vZHVsZVwiO1xuXHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlLnR5cGUgPT09IFwibW9kdWxlXCIpIHtcblx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gZGVmaW5pdGlvbkRhdGEuaWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKFxuXHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LnRoZW1lUHJvdmlkZXI/LnRoZW1lcykgJiZcblx0XHRzZXR0aW5ncz8udGhlbWVQcm92aWRlcj8udGhlbWVzLmxlbmd0aCA+IDAgJiZcblx0XHRyb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgIT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2RvdC1ub3RhdGlvblxuXHRcdHNldHRpbmdzLnRoZW1lUHJvdmlkZXIudGhlbWVzWzBdW1wiZGVmYXVsdFwiXSA9IHJvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLnByZWZlcnJlZFNjaGVtZTtcblx0fVxuXG5cdGNvbnN0IGV4Y2x1ZGVNZW51QWN0aW9uSWRzID0gcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVBY3Rpb247XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVBY3Rpb25JZHMpKSB7XG5cdFx0aWYgKFxuXHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5nbG9iYWxNZW51KSAmJlxuXHRcdFx0c2V0dGluZ3M/LmJyb3dzZXJQcm92aWRlcj8uZ2xvYmFsTWVudS5sZW5ndGggPiAwXG5cdFx0KSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/Lmdsb2JhbE1lbnUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgZ2xvYmFsTWVudUFjdGlvbklkOiBzdHJpbmcgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudVtpXT8uZGF0YT8uYWN0aW9uPy5pZDtcblx0XHRcdFx0aWYgKGV4Y2x1ZGVNZW51QWN0aW9uSWRzLmluY2x1ZGVzKGdsb2JhbE1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnBhZ2VNZW51KSAmJlxuXHRcdFx0c2V0dGluZ3M/LmJyb3dzZXJQcm92aWRlcj8ucGFnZU1lbnUubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5wYWdlTWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYWdlTWVudUFjdGlvbklkOiBzdHJpbmcgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIucGFnZU1lbnVbaV0/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyhwYWdlTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5wYWdlTWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnZpZXdNZW51KSAmJlxuXHRcdFx0c2V0dGluZ3M/LmJyb3dzZXJQcm92aWRlcj8udmlld01lbnUubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy52aWV3TWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIudmlld01lbnVbaV0/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+LFxuXHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdGhlbHBlcnM/OiBuZXZlclxuKSB7XG5cdGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkV4YW1wbGVBdXRoRW5kcG9pbnRcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0dXNlclNlc3Npb25LZXkgPSBkZWZpbml0aW9uPy5kYXRhPy51c2VyU2Vzc2lvbklkO1xuXHRyb2xlTWFwcGluZyA9IGRlZmluaXRpb24/LmRhdGE/LnJvbGVNYXBwaW5nO1xuXHRkZWZpbml0aW9uRGF0YSA9IGRlZmluaXRpb247XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2UoXG5cdGVuZHBvaW50RGVmaW5pdGlvbjogRW5kcG9pbnREZWZpbml0aW9uPEZldGNoT3B0aW9ucz4sXG5cdHJlcXVlc3Q/OiB1bmtub3duXG4pOiBQcm9taXNlPHVua25vd24+IHtcblx0aWYgKGVuZHBvaW50RGVmaW5pdGlvbi50eXBlICE9PSBcIm1vZHVsZVwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgV2Ugb25seSBleHBlY3QgZW5kcG9pbnRzIG9mIHR5cGUgbW9kdWxlLiBVbmFibGUgdG8gYWN0aW9uIHJlcXVlc3QvcmVzcG9uc2UgZm9yOiAke2VuZHBvaW50RGVmaW5pdGlvbi5pZH1gXG5cdFx0KTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAobG9nZ2VyICE9PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFwiVGhpcyBhdXRoIGVuZHBvaW50IG1vZHVsZSBpcyBhbiBleGFtcGxlIHRoYXQgdGhhdCBzaW11bGF0ZXMgcmVxdWVzdGluZyBhIGh0dHAgZW5kcG9pbnQgYW5kIG1hbmlwdWxhdGluZyBpdCBiYXNlZCBvbiB0aGUgY3VycmVudCBleGFtcGxlIHVzZXIgYXMgaWYgaXQgd2FzIHRoZSBzZXJ2ZXIgZG9pbmcgdGhlIG1hbmlwdWxhdGlvbi4gRE8gTk9UIFVTRSBUSElTIE1PRFVMRSBJTiBQUk9EVUNUSU9OLlwiXG5cdFx0KTtcblx0fVxuXG5cdGNvbnN0IHsgdXJsLCAuLi5vcHRpb25zIH0gPSBlbmRwb2ludERlZmluaXRpb24ub3B0aW9ucztcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0Y29uc3QgcmVxID0gZ2V0UmVxdWVzdE9wdGlvbnModXJsLCBvcHRpb25zLCByZXF1ZXN0KTtcblx0aWYgKHJlcS5vcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXEub3B0aW9ucy5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG5cdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRgJHtlbmRwb2ludERlZmluaXRpb24uaWR9IHNwZWNpZmllcyBhIHR5cGU6ICR7ZW5kcG9pbnREZWZpbml0aW9uLnR5cGV9IHdpdGggYSBtZXRob2QgJHtyZXEub3B0aW9ucy5tZXRob2R9IHRoYXQgaXMgbm90IHN1cHBvcnRlZC5gXG5cdFx0KTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuXHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcS51cmwsIHJlcS5vcHRpb25zKTtcblxuXHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG5cdFx0XHQvLyByZXR1cm5lZCBhcHBzXG5cdFx0XHRyZXR1cm4gYXBwbHlDdXJyZW50VXNlclRvQXBwcyhqc29uKSBhcyB1bmtub3duO1xuXHRcdH1cblx0XHQvLyBzZXR0aW5nc1xuXHRcdHJldHVybiBhcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhqc29uKSBhcyB1bmtub3duO1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodXNlclNlc3Npb25JZDogc3RyaW5nKTogRXhhbXBsZVVzZXIge1xuXHRpZiAodXNlclNlc3Npb25JZCA9PT0gdW5kZWZpbmVkIHx8IHVzZXJTZXNzaW9uSWQgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odXNlclNlc3Npb25JZCk7XG5cdGlmIChzdG9yZWRVc2VyID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVXNlcikgYXMgRXhhbXBsZVVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyU2Vzc2lvbklkOiBzdHJpbmcsIHVzZXI6IEV4YW1wbGVVc2VyKTogYm9vbGVhbiB7XG5cdGlmICh1c2VyU2Vzc2lvbklkID09PSB1bmRlZmluZWQgfHwgdXNlclNlc3Npb25JZCA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1c2VyU2Vzc2lvbklkLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG5cdHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDdXJyZW50VXNlcih1c2VyU2Vzc2lvbklkOiBzdHJpbmcpIHtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odXNlclNlc3Npb25JZCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5pbXBvcnQgKiBhcyBlbmRwb2ludEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBhdXRoSW1wbGVtZW50YXRpb24sXG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9