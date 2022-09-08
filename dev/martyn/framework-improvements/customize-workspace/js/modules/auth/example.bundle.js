/******/ var __webpack_modules__ = ({

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
let authenticated;
let authOptions;
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
        defaultHeight: authOptions.loginHeight ?? 250,
        defaultWidth: authOptions.loginWidth ?? 400,
        includeInSnapshots: false,
        resizable: false,
        showTaskbarIcon: false,
        saveWindowState: false,
        url
    });
}
async function openLogoutWindow(url) {
    return fin.Window.create({
        name: "example-auth-log-out",
        maximizable: false,
        minimizable: false,
        autoShow: false,
        defaultCentered: true,
        defaultHeight: authOptions.loginHeight ?? 250,
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
        defaultHeight: authOptions.loginHeight ?? 250,
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
            checkForSessionExpiry();
        }
    }
    else {
        logger.warn("Options have already been set as init has already been called");
    }
}
function subscribe(to, callback) {
    const key = crypto.randomUUID();
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
    }
    else {
        logger.info("This example does not return any user info. Returning null");
    }
    return null;
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

const entryPoints = {
    auth: _auth_provider__WEBPACK_IMPORTED_MODULE_0__
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMc0Q7QUFFL0MsTUFBTSxXQUFXLEdBQXFEO0lBQzVFLElBQUksRUFBRSwyQ0FBa0I7Q0FDeEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGUtc2hhcGVzXCI7XG5cbmxldCBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xubGV0IGF1dGhPcHRpb25zOiBFeGFtcGxlT3B0aW9ucztcbmxldCBzZXNzaW9uRXhwaXJ5Q2hlY2tJZDtcbmxldCBsb2dnZXI6IExvZ2dlcjtcblxuY29uc3Qgc3Vic2NyaWJlSWRNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbmNvbnN0IGxvZ2dlZEluU3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+ID0gbmV3IE1hcCgpO1xuY29uc3QgYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+ID0gbmV3IE1hcCgpO1xuY29uc3QgbG9nZ2VkT3V0U3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+ID0gbmV3IE1hcCgpO1xuY29uc3Qgc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5pbnRlcmZhY2UgRXhhbXBsZU9wdGlvbnMge1xuXHRhdXRvTG9naW46IGJvb2xlYW47XG5cdGF1dGhlbnRpY2F0ZWRVcmw6IHN0cmluZztcblx0bG9naW5Vcmw6IHN0cmluZztcblx0bG9nb3V0VXJsOiBzdHJpbmc7XG5cdGxvZ2luSGVpZ2h0OiBudW1iZXI7XG5cdGxvZ2luV2lkdGg6IG51bWJlcjtcblx0Y2hlY2tMb2dpblN0YXR1c0luU2Vjb25kczogbnVtYmVyO1xuXHRjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kczogbnVtYmVyO1xufVxuXG5jb25zdCBFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkgPSBcIkVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMjUwLFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmxcblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5Mb2dvdXRXaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLW91dFwiLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tBdXRoKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtY2hlY2std2luZG93XCIsXG5cdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMjUwLFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmxcblx0fSk7XG5cdGxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0dHJ5IHtcblx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0aWYgKGluZm8udXJsID09PSBhdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dnZXIuZXJyb3IoXCJFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uXCIsIGVycm9yKTtcblx0fSBmaW5hbGx5IHtcblx0XHRpZiAod2luZG93VG9DaGVjayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdG9wZW5Mb2dpbldpbmRvdyhhdXRoT3B0aW9ucy5sb2dpblVybClcblx0XHRcdC50aGVuKGFzeW5jICh3aW4pID0+IHtcblx0XHRcdFx0Y29uc3QgYXV0aE1hdGNoID0gbmV3IFJlZ0V4cChhdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsLCBcImlcIik7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdGxvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Vycm9yLm1lc3NhZ2V9YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlcjtcblxuXHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0bG9nZ2VyLmluZm8oXCJBdXRoIFdpbmRvdyBjYW5jZWxsZWQgYnkgdXNlclwiKTtcblx0XHRcdFx0XHRcdHdpbiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdGF0dXNDaGVjayA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdGlmIChhdXRoTWF0Y2gudGVzdChpbmZvLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrTG9naW5TdGF0dXNJblNlY29uZHMgPz8gMSAqIDEwMDApO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdGxvZ2dlci5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvclNlc3Npb25FeHBpcnkoZm9yY2UgPSBmYWxzZSkge1xuXHRpZiAoXG5cdFx0YXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICE9PSB1bmRlZmluZWQgJiZcblx0XHRhdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgPiAtMSAmJlxuXHRcdHNlc3Npb25FeHBpcnlDaGVja0lkID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdHNlc3Npb25FeHBpcnlDaGVja0lkID0gdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgY2hlY2tBdXRoKGF1dGhPcHRpb25zLmxvZ2luVXJsKTtcblx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0bG9nZ2VyLmluZm8oXCJTZXNzaW9uIFN0aWxsIEFjdGl2ZVwiKTtcblx0XHRcdFx0Y2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0fVxuXHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICogMTAwMCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbm90aWZ5U3Vic2NyaWJlcnMoZXZlbnRUeXBlOiBzdHJpbmcsIHN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+Pikge1xuXHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdGxvZ2dlci5pbmZvKGBOb3RpZnlpbmcgc3Vic2NyaWJlciB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtzdWJzY3JpYmVySWR9IG9mIGV2ZW50IHR5cGU6ICR7ZXZlbnRUeXBlfWApO1xuXHRcdGF3YWl0IHN1YnNjcmliZXJzLmdldChzdWJzY3JpYmVySWQpKCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9nb3V0KHJlc29sdmU6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIWF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIuZXJyb3IoXCJZb3UgaGF2ZSByZXF1ZXN0ZWQgdG8gbG9nIG91dCBidXQgYXJlIG5vdCBsb2dnZWQgaW5cIik7XG5cdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxvZ2dlci5pbmZvKFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdGlmIChcblx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IHVuZGVmaW5lZCAmJlxuXHRcdGF1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gbnVsbCAmJlxuXHRcdGF1dGhPcHRpb25zLmxvZ291dFVybC50cmltKCkubGVuZ3RoID4gMFxuXHQpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qgd2luID0gYXdhaXQgb3BlbkxvZ291dFdpbmRvdyhhdXRoT3B0aW9ucy5sb2dvdXRVcmwpO1xuXHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRhd2FpdCBub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0fSwgMjAwMCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgbGF1bmNoaW5nIGxvZ291dCB3aW5kb3cuICR7ZXJyb3J9YCk7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCBsb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0cmVzb2x2ZSh0cnVlKTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZShcblx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxFeGFtcGxlT3B0aW9ucz4sXG5cdGNyZWF0ZUxvZ2dlcjogTG9nZ2VyQ3JlYXRvcixcblx0aGVscGVycz86IG5ldmVyXG4pIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQXV0aEV4YW1wbGVcIik7XG5cdGlmIChhdXRoT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdGF1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSkpO1xuXHRcdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nZ2VyLndhcm4oXCJPcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHNldCBhcyBpbml0IGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXCIpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoXG5cdHRvOiBcImxvZ2dlZC1pblwiIHwgXCJiZWZvcmUtbG9nZ2VkLW91dFwiIHwgXCJsb2dnZWQtb3V0XCIgfCBcInNlc3Npb24tZXhwaXJlZFwiLFxuXHRjYWxsYmFjazogKCkgPT4gUHJvbWlzZTx2b2lkPlxuKTogc3RyaW5nIHtcblx0Y29uc3Qga2V5ID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0c3dpdGNoICh0bykge1xuXHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRJblN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiYmVmb3JlLWxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRPdXRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRzdWJzY3JpYmVJZE1hcFtrZXldID0gdG87XG5cdFx0bG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRyZXR1cm4ga2V5O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZnJvbTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdGNvbnN0IGV2ZW50VHlwZSA9IHN1YnNjcmliZUlkTWFwW2Zyb21dO1xuXHRpZiAoZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke2Zyb219IHRoYXQgaXMgaW52YWxpZGApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHN3aXRjaCAoZXZlbnRUeXBlKSB7XG5cdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZEluU3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGJlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZE91dFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0c2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRkZWxldGUgc3Vic2NyaWJlSWRNYXBbZnJvbV07XG5cdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0bG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGhhcyBiZWVuIGNsZWFyZWRgKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGxvZ2dlci53YXJuKFxuXHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtmcm9tfSBjb3VsZCBub3QgYmUgY2xlYXJlZCBhcyB3ZSBkbyBub3QgaGF2ZSBhIHJlZ2lzdGVyIG9mIHRoYXQgZXZlbnQgdHlwZS5gXG5cdCk7XG5cdHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRsb2dnZXIuaW5mbyhcImxvZ2luIHJlcXVlc3RlZFwiKTtcblx0aWYgKGF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIuaW5mbyhcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdHJldHVybiBhdXRoZW50aWNhdGVkO1xuXHR9XG5cdGlmIChhdXRoT3B0aW9ucy5hdXRvTG9naW4pIHtcblx0XHRsb2dnZXIuaW5mbyhcImF1dG9Mb2dpbiBlbmFibGVkIGluIGF1dGggcHJvdmlkZSBtb2R1bGUgc2V0dGluZ3MuIEZha2UgbG9nZ2VkIGluXCIpO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdH1cblxuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSwgYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRhd2FpdCBub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiLCBsb2dnZWRJblN1YnNjcmliZXJzKTtcblx0fVxuXG5cdHJldHVybiBhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbzxUPigpOiBQcm9taXNlPFQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2dnZXIuaW5mbyhcIlRoaXMgZXhhbXBsZSBkb2VzIG5vdCByZXR1cm4gYW55IHVzZXIgaW5mby4gUmV0dXJuaW5nIG51bGxcIik7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBhdXRoSW1wbGVtZW50YXRpb25cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=