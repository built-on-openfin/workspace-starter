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
let sessionExpiryCheckId;
let logger;
const subscribeIdMap = {};
const loggedInSubscribers = new Map();
const beforeLoggedOutSubscribers = new Map();
const loggedOutSubscribers = new Map();
const sessionExpiredSubscribers = new Map();
const EXAMPLE_AUTH_AUTHENTICATED_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_IS_AUTHENTICATED`;
async function openLoginWindow(url) {
    const enrichedCustomData = { currentUserKey: _util__WEBPACK_IMPORTED_MODULE_1__.EXAMPLE_AUTH_CURRENT_USER_KEY, ...authOptions?.customData };
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
        customData: enrichedCustomData
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
                (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
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
    (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
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
        if (authenticated) {
            currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)();
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
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearCurrentUser)();
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
    const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
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
    const currentUser = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
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
                    if (endpointToUpdate !== undefined) {
                        endpointToUpdate.type = "module";
                        // this if condition check is here to make typescript happy with the endpoint so that typeId can be set
                        if (endpointToUpdate.type === "module") {
                            endpointToUpdate.typeId = definitionData.id;
                        }
                    }
                }
            }
        }
    }
    if (Array.isArray(settings?.themeProvider?.themes) &&
        settings.themeProvider.themes.length > 0 &&
        roleMapping[currentUser.role].preferredScheme !== undefined) {
        settings.themeProvider.themes[0].default =
            roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
        const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
        logger.warn("This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart.");
        localStorage.removeItem(storedSchemePreference);
    }
    const excludeMenuActionIds = roleMapping[currentUser.role].excludeMenuAction;
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
        if (Array.isArray(settings?.browserProvider?.pageMenu) && settings.browserProvider.pageMenu.length > 0) {
            for (let i = 0; i < settings.browserProvider.pageMenu.length; i++) {
                const pageMenuActionId = settings.browserProvider.pageMenu[i]?.data?.action?.id;
                if (excludeMenuActionIds.includes(pageMenuActionId)) {
                    settings.browserProvider.pageMenu[i].include = false;
                }
            }
        }
        if (Array.isArray(settings?.browserProvider?.viewMenu) && settings.browserProvider.viewMenu.length > 0) {
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
async function initialize(definition, createLogger, helpers) {
    logger = createLogger("ExampleAuthEndpoint");
    logger.info("Was passed the following options", definition.data);
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
/* harmony import */ var _auth_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-provider */ "./client/src/modules/auth/example/auth-provider.ts");
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoint */ "./client/src/modules/auth/example/endpoint.ts");


const entryPoints = {
    auth: _auth_provider__WEBPACK_IMPORTED_MODULE_0__,
    endpoint: _endpoint__WEBPACK_IMPORTED_MODULE_1__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLElBQUksQ0FBQztLQUNaO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQztBQUM5QyxDQUFDO0FBRU0sU0FBUyxjQUFjLENBQUMsSUFBaUI7SUFDL0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVNLFNBQVMsZ0JBQWdCO0lBQy9CLFlBQVksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN4RCxDQUFDOzs7Ozs7O1NDbEJEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTHNEO0FBQ0Q7QUFFOUMsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLElBQUksRUFBRSwyQ0FBa0I7SUFDeEIsUUFBUSxFQUFFLHNDQUFzQjtDQUNoQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dWlkLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9lbmRwb2ludC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvdXRpbC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmFuZG9tVVVJRCgpOiBzdHJpbmcge1xuXHRpZiAoXCJyYW5kb21VVUlEXCIgaW4gd2luZG93LmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiB3aW5kb3cuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0Y29uc3QgZ2V0UmFuZG9tSGV4ID0gKGMpID0+XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2UsIG5vLW1peGVkLW9wZXJhdG9yc1xuXHRcdChjIF4gKHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoYyAvIDQpKSkpLnRvU3RyaW5nKDE2KTtcblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cbiIsImltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyByYW5kb21VVUlEIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dWlkXCI7XG5pbXBvcnQgdHlwZSB7IEV4YW1wbGVPcHRpb25zLCBFeGFtcGxlVXNlciB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgY2xlYXJDdXJyZW50VXNlciwgRVhBTVBMRV9BVVRIX0NVUlJFTlRfVVNFUl9LRVksIGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5sZXQgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbmxldCBhdXRoT3B0aW9uczogRXhhbXBsZU9wdGlvbnM7XG5sZXQgY3VycmVudFVzZXI6IEV4YW1wbGVVc2VyO1xubGV0IHNlc3Npb25FeHBpcnlDaGVja0lkO1xubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5jb25zdCBzdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuY29uc3QgbG9nZ2VkSW5TdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcblxuY29uc3QgRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEYDtcblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRjb25zdCBlbnJpY2hlZEN1c3RvbURhdGEgPSB7IGN1cnJlbnRVc2VyS2V5OiBFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSwgLi4uYXV0aE9wdGlvbnM/LmN1c3RvbURhdGEgfTtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmwsXG5cdFx0Y3VzdG9tRGF0YTogZW5yaWNoZWRDdXN0b21EYXRhXG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvcGVuTG9nb3V0V2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1vdXRcIixcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMzI1LFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmxcblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQXV0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRjb25zdCB3aW5kb3dUb0NoZWNrID0gYXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWNoZWNrLXdpbmRvd1wiLFxuXHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRIZWlnaHQ6IGF1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDMyNSxcblx0XHRkZWZhdWx0V2lkdGg6IGF1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0dXJsXG5cdH0pO1xuXHRsZXQgaXNBdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdHRyeSB7XG5cdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbmRvd1RvQ2hlY2suZ2V0SW5mbygpO1xuXHRcdGlmIChpbmZvLnVybCA9PT0gYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0aXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyLmVycm9yKFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdH0gZmluYWxseSB7XG5cdFx0aWYgKHdpbmRvd1RvQ2hlY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRvcGVuTG9naW5XaW5kb3coYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHQudGhlbihhc3luYyAod2luKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGF1dGhNYXRjaCA9IG5ldyBSZWdFeHAoYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCwgXCJpXCIpO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRsb2dnZXIuZXJyb3IoXG5cdFx0XHRcdFx0XHRgRXJyb3Igd2hpbGUgY2hlY2tpbmcgaWYgbG9naW4gd2luZG93IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZC4gRXJyb3IgJHtlcnJvci5tZXNzYWdlfWBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHN0YXR1c0NoZWNrOiBudW1iZXI7XG5cblx0XHRcdFx0YXdhaXQgd2luLmFkZExpc3RlbmVyKFwiY2xvc2VkXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAod2luKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRzdGF0dXNDaGVjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdGxvZ2dlci5pbmZvKFwiQXV0aCBXaW5kb3cgY2FuY2VsbGVkIGJ5IHVzZXJcIik7XG5cdFx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCBhdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRsb2dnZXIuZXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gYXV0aGVudGljYXRlIHRoZSB1c2VyXCIsIGVycm9yKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KGZvcmNlID0gZmFsc2UpIHtcblx0aWYgKFxuXHRcdGF1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyAhPT0gdW5kZWZpbmVkICYmXG5cdFx0YXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzID4gLTEgJiZcblx0XHRzZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9PT0gdW5kZWZpbmVkXG5cdCkge1xuXHRcdHNlc3Npb25FeHBpcnlDaGVja0lkID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRzZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHVuZGVmaW5lZDtcblx0XHRcdGNvbnN0IHN0aWxsQXV0aGVudGljYXRlZCA9IGF3YWl0IGNoZWNrQXV0aChhdXRoT3B0aW9ucy5sb2dpblVybCk7XG5cdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKFwiU2Vzc2lvbiBTdGlsbCBBY3RpdmVcIik7XG5cdFx0XHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0XCJTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS4gU2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrXCJcblx0XHRcdFx0KTtcblx0XHRcdFx0YXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkpO1xuXHRcdFx0XHRjbGVhckN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0fVxuXHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICogMTAwMCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbm90aWZ5U3Vic2NyaWJlcnMoZXZlbnRUeXBlOiBzdHJpbmcsIHN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+Pikge1xuXHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdGxvZ2dlci5pbmZvKGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWApO1xuXHRcdGF3YWl0IHN1YnNjcmliZXJzLmdldChzdWJzY3JpYmVySWQpKCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIWF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIuZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxvZ2dlci5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0aWYgKFxuXHRcdGF1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0YXV0aE9wdGlvbnMubG9nb3V0VXJsICE9PSBudWxsICYmXG5cdFx0YXV0aE9wdGlvbnMubG9nb3V0VXJsLnRyaW0oKS5sZW5ndGggPiAwXG5cdCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB3aW4gPSBhd2FpdCBvcGVuTG9nb3V0V2luZG93KGF1dGhPcHRpb25zLmxvZ291dFVybCk7XG5cdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCBsb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIGxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRyZXNvbHZlKHRydWUpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVPcHRpb25zPixcblx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG4pIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQXV0aEV4YW1wbGVcIik7XG5cdGlmIChhdXRoT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdGF1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSkpO1xuXHRcdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nZ2VyLndhcm4oXCJPcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHNldCBhcyBpbml0IGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXCIpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoXG5cdHRvOiBcImxvZ2dlZC1pblwiIHwgXCJiZWZvcmUtbG9nZ2VkLW91dFwiIHwgXCJsb2dnZWQtb3V0XCIgfCBcInNlc3Npb24tZXhwaXJlZFwiLFxuXHRjYWxsYmFjazogKCkgPT4gUHJvbWlzZTx2b2lkPlxuKTogc3RyaW5nIHtcblx0Y29uc3Qga2V5ID0gcmFuZG9tVVVJRCgpO1xuXHRsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXHRzd2l0Y2ggKHRvKSB7XG5cdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZEluU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGJlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZE91dFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0c2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAobWF0Y2hGb3VuZCkge1xuXHRcdHN1YnNjcmliZUlkTWFwW2tleV0gPSB0bztcblx0XHRsb2dnZXIuaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7dG99IGV2ZW50cyByZWdpc3RlcmVkLiBTdWJzY3JpcHRpb24gSWQ6ICR7a2V5fWApO1xuXHRcdHJldHVybiBrZXk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnN1YnNjcmliZShmcm9tOiBzdHJpbmcpOiBib29sZWFuIHtcblx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0Y29uc3QgZXZlbnRUeXBlID0gc3Vic2NyaWJlSWRNYXBbZnJvbV07XG5cdGlmIChldmVudFR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci53YXJuKGBZb3UgaGF2ZSB0cmllZCB0byB1bnN1YnNjcmliZSB3aXRoIGEga2V5ICR7ZnJvbX0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c3dpdGNoIChldmVudFR5cGUpIHtcblx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkSW5TdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0YmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGRlbGV0ZSBzdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRsb2dnZXIuaW5mbyhgU3Vic2NyaXB0aW9uIHRvICR7ZXZlbnRUeXBlfSBldmVudHMgd2l0aCBzdWJzY3JpcHRpb24gSWQ6ICR7ZnJvbX0gaGFzIGJlZW4gY2xlYXJlZGApO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0bG9nZ2VyLndhcm4oXG5cdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0KTtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGxvZ2dlci5pbmZvKFwibG9naW4gcmVxdWVzdGVkXCIpO1xuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci5pbmZvKFwiVXNlciBhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIik7XG5cdFx0cmV0dXJuIGF1dGhlbnRpY2F0ZWQ7XG5cdH1cblx0aWYgKGF1dGhPcHRpb25zLmF1dG9Mb2dpbikge1xuXHRcdGxvZ2dlci5pbmZvKFwiYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW5cIik7XG5cdFx0YXV0aGVudGljYXRlZCA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0YXV0aGVudGljYXRlZCA9IGF3YWl0IGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0fVxuXG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZLCBhdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLWluXCIsIGxvZ2dlZEluU3Vic2NyaWJlcnMpO1xuXHR9IGVsc2Uge1xuXHRcdGNsZWFyQ3VycmVudFVzZXIoKTtcblx0fVxuXG5cdHJldHVybiBhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbygpOiBQcm9taXNlPHVua25vd24+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRsb2dnZXIuaW5mbyhcIlRoaXMgZXhhbXBsZSByZXR1cm5zIGEgdXNlciBpZiBpdCB3YXMgcHJvdmlkZWQgdG8gdGhlIGV4YW1wbGUgbG9naW5cIik7XG5cblx0cmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBDdXN0b21TZXR0aW5ncywgUGxhdGZvcm1BcHAgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnREZWZpbml0aW9uLCBGZXRjaE9wdGlvbnMgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvZW5kcG9pbnQtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJjdXN0b21pemUtd29ya3NwYWNlL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24gfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBFeGFtcGxlRW5kcG9pbnRPcHRpb25zLCBFeGFtcGxlVXNlclJvbGVNYXBwaW5nIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCIuL3V0aWxcIjtcblxubGV0IGxvZ2dlcjogTG9nZ2VyO1xubGV0IHJvbGVNYXBwaW5nOiB7IFtrZXk6IHN0cmluZ106IEV4YW1wbGVVc2VyUm9sZU1hcHBpbmcgfTtcbmxldCBkZWZpbml0aW9uRGF0YTogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlRW5kcG9pbnRPcHRpb25zPjtcblxuZnVuY3Rpb24gZ2V0UmVxdWVzdE9wdGlvbnMoXG5cdHVybDogc3RyaW5nLFxuXHRvcHRpb25zOiBGZXRjaE9wdGlvbnMsXG5cdHJlcXVlc3Q6IHVua25vd25cbik6IHsgdXJsOiBzdHJpbmc7IG9wdGlvbnM6IEZldGNoT3B0aW9ucyB9IHtcblx0aWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiKSB7XG5cdFx0aWYgKHJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcXVlc3QpO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKGBbJHtrZXlzW2ldfV1gLCBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdFtrZXlzW2ldXSBhcyBzdHJpbmcpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgcmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG5cdH1cblxuXHRyZXR1cm4geyB1cmwsIG9wdGlvbnMgfTtcbn1cblxuZnVuY3Rpb24gYXBwbHlDdXJyZW50VXNlclRvQXBwcyhhcHBzOiBQbGF0Zm9ybUFwcFtdID0gW10pOiBQbGF0Zm9ybUFwcFtdIHtcblx0Y29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlcigpO1xuXHRpZiAoXG5cdFx0Y3VycmVudFVzZXIgPT09IG51bGwgfHxcblx0XHRyb2xlTWFwcGluZyA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0cm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0gPT09IHVuZGVmaW5lZCB8fFxuXHRcdHJvbGVNYXBwaW5nW2N1cnJlbnRVc2VyLnJvbGVdLmV4Y2x1ZGVBcHBzV2l0aFRhZyA9PT0gdW5kZWZpbmVkXG5cdCkge1xuXHRcdHJldHVybiBhcHBzO1xuXHR9XG5cdGNvbnN0IGV4Y2x1ZGVUYWcgPSByb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5leGNsdWRlQXBwc1dpdGhUYWc7XG5cdGNvbnN0IGZpbHRlcmVkQXBwczogUGxhdGZvcm1BcHBbXSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFwcHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcHBzW2ldLnRhZ3MpKSB7XG5cdFx0XHRsZXQgaW5jbHVkZSA9IHRydWU7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGFwcHNbaV0udGFncy5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRjb25zdCB0YWc6IHN0cmluZyA9IGFwcHNbaV0udGFnc1t0XTtcblx0XHRcdFx0aWYgKGV4Y2x1ZGVUYWcuaW5jbHVkZXModGFnKSkge1xuXHRcdFx0XHRcdGluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGluY2x1ZGUpIHtcblx0XHRcdFx0ZmlsdGVyZWRBcHBzLnB1c2goYXBwc1tpXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlcmVkQXBwcy5wdXNoKGFwcHNbaV0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmlsdGVyZWRBcHBzO1xufVxuXG5mdW5jdGlvbiBhcHBseUN1cnJlbnRVc2VyVG9TZXR0aW5ncyhzZXR0aW5nczogQ3VzdG9tU2V0dGluZ3MpOiBDdXN0b21TZXR0aW5ncyB7XG5cdGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKTtcblx0aWYgKGN1cnJlbnRVc2VyID09PSBudWxsIHx8IHJvbGVNYXBwaW5nID09PSB1bmRlZmluZWQgfHwgcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzZXR0aW5ncztcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5tb2R1bGVzKSkge1xuXHRcdHNldHRpbmdzLmVuZHBvaW50UHJvdmlkZXIubW9kdWxlcy5wdXNoKHtcblx0XHRcdGRhdGE6IGRlZmluaXRpb25EYXRhLFxuXHRcdFx0ZW5hYmxlZDogZGVmaW5pdGlvbkRhdGEuZW5hYmxlZCxcblx0XHRcdGlkOiBkZWZpbml0aW9uRGF0YS5pZCxcblx0XHRcdGRlc2NyaXB0aW9uOiBkZWZpbml0aW9uRGF0YS5kZXNjcmlwdGlvbixcblx0XHRcdGljb246IGRlZmluaXRpb25EYXRhLmljb24sXG5cdFx0XHRpbmZvOiBkZWZpbml0aW9uRGF0YS5pbmZvLFxuXHRcdFx0dGl0bGU6IGRlZmluaXRpb25EYXRhLnRpdGxlLFxuXHRcdFx0dXJsOiBkZWZpbml0aW9uRGF0YS51cmxcblx0XHR9KTtcblx0XHRpZiAoXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5lbmRwb2ludFByb3ZpZGVyPy5lbmRwb2ludHMpICYmXG5cdFx0XHRBcnJheS5pc0FycmF5KHNldHRpbmdzPy5hcHBQcm92aWRlcj8uZW5kcG9pbnRJZHMpXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBhcHBFbmRwb2ludHMgPSBzZXR0aW5ncz8uYXBwUHJvdmlkZXI/LmVuZHBvaW50SWRzO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHBFbmRwb2ludHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcHBFbmRwb2ludHNbaV0gPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRjb25zdCBlbmRwb2ludFRvVXBkYXRlID0gc2V0dGluZ3MuZW5kcG9pbnRQcm92aWRlci5lbmRwb2ludHMuZmluZChcblx0XHRcdFx0XHRcdChlbmRwb2ludEVudHJ5KSA9PiBlbmRwb2ludEVudHJ5LmlkID09PSBhcHBFbmRwb2ludHNbaV0gJiYgZW5kcG9pbnRFbnRyeS50eXBlID09PSBcImZldGNoXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChlbmRwb2ludFRvVXBkYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZSA9IFwibW9kdWxlXCI7XG5cdFx0XHRcdFx0XHQvLyB0aGlzIGlmIGNvbmRpdGlvbiBjaGVjayBpcyBoZXJlIHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweSB3aXRoIHRoZSBlbmRwb2ludCBzbyB0aGF0IHR5cGVJZCBjYW4gYmUgc2V0XG5cdFx0XHRcdFx0XHRpZiAoZW5kcG9pbnRUb1VwZGF0ZS50eXBlID09PSBcIm1vZHVsZVwiKSB7XG5cdFx0XHRcdFx0XHRcdGVuZHBvaW50VG9VcGRhdGUudHlwZUlkID0gZGVmaW5pdGlvbkRhdGEuaWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKFxuXHRcdEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LnRoZW1lUHJvdmlkZXI/LnRoZW1lcykgJiZcblx0XHRzZXR0aW5ncy50aGVtZVByb3ZpZGVyLnRoZW1lcy5sZW5ndGggPiAwICYmXG5cdFx0cm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0ucHJlZmVycmVkU2NoZW1lICE9PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0c2V0dGluZ3MudGhlbWVQcm92aWRlci50aGVtZXNbMF0uZGVmYXVsdCA9XG5cdFx0XHRyb2xlTWFwcGluZ1tjdXJyZW50VXNlci5yb2xlXS5wcmVmZXJyZWRTY2hlbWUgPT09IFwiZGFya1wiID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG5cdFx0Y29uc3Qgc3RvcmVkU2NoZW1lUHJlZmVyZW5jZSA9IGAke2Zpbi5tZS5pZGVudGl0eS51dWlkfS1TZWxlY3RlZENvbG9yU2NoZW1lYDtcblx0XHRsb2dnZXIud2Fybihcblx0XHRcdFwiVGhpcyBpcyBhIGRlbW8gbW9kdWxlIHdoZXJlIHdlIGFyZSBjbGVhcmluZyB0aGUgbG9jYWxseSBzdG9yZWQgc2NoZW1lIHByZWZlcmVuY2UgaW4gb3JkZXIgdG8gc2hvdyBkaWZmZXJlbnQgc2NoZW1lJ3MgbGlnaHQvZGFyayBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gVGhpcyBtZWFucyB0aGF0IGl0IHdpbGwgYWx3YXlzIGJlIHNldCB0byB3aGF0IGlzIGluIHRoZSByb2xlIG1hcHBpbmcgaW5pdGlhbGx5IGFuZCBub3Qgd2hhdCBpdCBpcyBzZXQgdG8gbG9jYWxseSBvbiByZXN0YXJ0LlwiXG5cdFx0KTtcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yZWRTY2hlbWVQcmVmZXJlbmNlKTtcblx0fVxuXG5cdGNvbnN0IGV4Y2x1ZGVNZW51QWN0aW9uSWRzID0gcm9sZU1hcHBpbmdbY3VycmVudFVzZXIucm9sZV0uZXhjbHVkZU1lbnVBY3Rpb247XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoZXhjbHVkZU1lbnVBY3Rpb25JZHMpKSB7XG5cdFx0aWYgKFxuXHRcdFx0QXJyYXkuaXNBcnJheShzZXR0aW5ncz8uYnJvd3NlclByb3ZpZGVyPy5nbG9iYWxNZW51KSAmJlxuXHRcdFx0c2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLmdsb2JhbE1lbnUubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIuZ2xvYmFsTWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBnbG9iYWxNZW51QWN0aW9uSWQ6IHN0cmluZyA9IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5nbG9iYWxNZW51W2ldPy5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMoZ2xvYmFsTWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci5nbG9iYWxNZW51W2ldLmluY2x1ZGUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzPy5icm93c2VyUHJvdmlkZXI/LnBhZ2VNZW51KSAmJiBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIucGFnZU1lbnUubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIucGFnZU1lbnUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgcGFnZU1lbnVBY3Rpb25JZDogc3RyaW5nID0gc2V0dGluZ3MuYnJvd3NlclByb3ZpZGVyLnBhZ2VNZW51W2ldPy5kYXRhPy5hY3Rpb24/LmlkO1xuXHRcdFx0XHRpZiAoZXhjbHVkZU1lbnVBY3Rpb25JZHMuaW5jbHVkZXMocGFnZU1lbnVBY3Rpb25JZCkpIHtcblx0XHRcdFx0XHRzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIucGFnZU1lbnVbaV0uaW5jbHVkZSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3M/LmJyb3dzZXJQcm92aWRlcj8udmlld01lbnUpICYmIHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCB2aWV3TWVudUFjdGlvbklkOiBzdHJpbmcgPSBzZXR0aW5ncy5icm93c2VyUHJvdmlkZXIudmlld01lbnVbaV0/LmRhdGE/LmFjdGlvbj8uaWQ7XG5cdFx0XHRcdGlmIChleGNsdWRlTWVudUFjdGlvbklkcy5pbmNsdWRlcyh2aWV3TWVudUFjdGlvbklkKSkge1xuXHRcdFx0XHRcdHNldHRpbmdzLmJyb3dzZXJQcm92aWRlci52aWV3TWVudVtpXS5pbmNsdWRlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVFbmRwb2ludE9wdGlvbnM+LFxuXHRjcmVhdGVMb2dnZXI6IExvZ2dlckNyZWF0b3IsXG5cdGhlbHBlcnM/OiBuZXZlclxuKSB7XG5cdGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihcIkV4YW1wbGVBdXRoRW5kcG9pbnRcIik7XG5cdGxvZ2dlci5pbmZvKFwiV2FzIHBhc3NlZCB0aGUgZm9sbG93aW5nIG9wdGlvbnNcIiwgZGVmaW5pdGlvbi5kYXRhKTtcblx0cm9sZU1hcHBpbmcgPSBkZWZpbml0aW9uPy5kYXRhPy5yb2xlTWFwcGluZztcblx0ZGVmaW5pdGlvbkRhdGEgPSBkZWZpbml0aW9uO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlKFxuXHRlbmRwb2ludERlZmluaXRpb246IEVuZHBvaW50RGVmaW5pdGlvbjxGZXRjaE9wdGlvbnM+LFxuXHRyZXF1ZXN0PzogdW5rbm93blxuKTogUHJvbWlzZTx1bmtub3duPiB7XG5cdGlmIChlbmRwb2ludERlZmluaXRpb24udHlwZSAhPT0gXCJtb2R1bGVcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YFdlIG9ubHkgZXhwZWN0IGVuZHBvaW50cyBvZiB0eXBlIG1vZHVsZS4gVW5hYmxlIHRvIGFjdGlvbiByZXF1ZXN0L3Jlc3BvbnNlIGZvcjogJHtlbmRwb2ludERlZmluaXRpb24uaWR9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKGxvZ2dlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oXG5cdFx0XHRcIlRoaXMgYXV0aCBlbmRwb2ludCBtb2R1bGUgaXMgYW4gZXhhbXBsZSB0aGF0IHRoYXQgc2ltdWxhdGVzIHJlcXVlc3RpbmcgYSBodHRwIGVuZHBvaW50IGFuZCBtYW5pcHVsYXRpbmcgaXQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZXhhbXBsZSB1c2VyIGFzIGlmIGl0IHdhcyB0aGUgc2VydmVyIGRvaW5nIHRoZSBtYW5pcHVsYXRpb24uIERPIE5PVCBVU0UgVEhJUyBNT0RVTEUgSU4gUFJPRFVDVElPTi5cIlxuXHRcdCk7XG5cdH1cblxuXHRjb25zdCB7IHVybCwgLi4ub3B0aW9ucyB9ID0gZW5kcG9pbnREZWZpbml0aW9uLm9wdGlvbnM7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG5cdGNvbnN0IHJlcSA9IGdldFJlcXVlc3RPcHRpb25zKHVybCwgb3B0aW9ucywgcmVxdWVzdCk7XG5cdGlmIChyZXEub3B0aW9ucy5tZXRob2QgIT09IFwiR0VUXCIgJiYgcmVxLm9wdGlvbnMubWV0aG9kICE9PSBcIlBPU1RcIikge1xuXHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0YCR7ZW5kcG9pbnREZWZpbml0aW9uLmlkfSBzcGVjaWZpZXMgYSB0eXBlOiAke2VuZHBvaW50RGVmaW5pdGlvbi50eXBlfSB3aXRoIGEgbWV0aG9kICR7cmVxLm9wdGlvbnMubWV0aG9kfSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXEudXJsLCByZXEub3B0aW9ucyk7XG5cblx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0Y29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuXHRcdFx0Ly8gcmV0dXJuZWQgYXBwc1xuXHRcdFx0cmV0dXJuIGFwcGx5Q3VycmVudFVzZXJUb0FwcHMoanNvbikgYXMgdW5rbm93bjtcblx0XHR9XG5cdFx0Ly8gc2V0dGluZ3Ncblx0XHRyZXR1cm4gYXBwbHlDdXJyZW50VXNlclRvU2V0dGluZ3MoanNvbikgYXMgdW5rbm93bjtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB0eXBlIHsgRXhhbXBsZVVzZXIgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZID0gYCR7ZmluLm1lLmlkZW50aXR5LnV1aWR9LUVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJgO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKTogRXhhbXBsZVVzZXIgfCBudWxsIHtcblx0Y29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZKTtcblx0aWYgKHN0b3JlZFVzZXIgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRVc2VyKSBhcyBFeGFtcGxlVXNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXI6IEV4YW1wbGVVc2VyKTogdm9pZCB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9DVVJSRU5UX1VTRVJfS0VZLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckN1cnJlbnRVc2VyKCkge1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQ1VSUkVOVF9VU0VSX0tFWSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5pbXBvcnQgKiBhcyBlbmRwb2ludEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBhdXRoSW1wbGVtZW50YXRpb24sXG5cdGVuZHBvaW50OiBlbmRwb2ludEltcGxlbWVudGF0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9