/******/ var __webpack_modules__ = ({

/***/ "./client/src/modules/auth/example/auth-provider.ts":
/*!**********************************************************!*\
  !*** ./client/src/modules/auth/example/auth-provider.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserInfo": () => (/* binding */ getUserInfo),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "isAuthenticationRequired": () => (/* binding */ isAuthenticationRequired),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "unsubscribe": () => (/* binding */ unsubscribe)
/* harmony export */ });
const LOGGER_GROUP = "AuthExample";
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
        logger.error(LOGGER_GROUP, "Error encountered while checking session", error);
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
            try {
                if (win !== undefined) {
                    const info = await win.getInfo();
                    if (info.url === authOptions.authenticatedUrl) {
                        await win.close(true);
                        return resolve(true);
                    }
                    await win.show(true);
                }
            }
            catch (error) {
                logger.error(LOGGER_GROUP, `Error while checking if login window automatically redirected. Error ${error.message}`);
                if (win !== undefined) {
                    await win.show(true);
                }
            }
            let statusCheck;
            await win.addListener("closed", async () => {
                if (win) {
                    window.clearInterval(statusCheck);
                    statusCheck = undefined;
                    logger.info(LOGGER_GROUP, "Auth Window cancelled by user");
                    win = undefined;
                    return resolve(false);
                }
            });
            statusCheck = window.setInterval(async () => {
                if (win !== undefined) {
                    const winInfo = await win.getInfo();
                    if (winInfo.url === authOptions.authenticatedUrl) {
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
            logger.error(LOGGER_GROUP, "Error while trying to authenticate the user", error);
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
                logger.info(LOGGER_GROUP, "Session Still Active");
                checkForSessionExpiry();
            }
            else {
                logger.info(LOGGER_GROUP, "Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check");
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
        logger.info(LOGGER_GROUP, `Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`);
        await subscribers.get(subscriberId)();
    }
}
async function handleLogout(resolve) {
    if (authenticated === undefined || !authenticated) {
        logger.error(LOGGER_GROUP, "You have requested to log out but are not logged in");
        resolve(false);
        return;
    }
    logger.info(LOGGER_GROUP, "Log out requested");
    await notifySubscribers("before-logged-out", beforeLoggedOutSubscribers);
    authenticated = false;
    localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
    if (authOptions.logoutUrl !== undefined &&
        authOptions.logoutUrl !== null &&
        authOptions.loginUrl.trim().length > 0) {
        try {
            const win = await openLogoutWindow(authOptions.logoutUrl);
            setTimeout(async () => {
                await win.close();
                await notifySubscribers("logged-out", loggedOutSubscribers);
                resolve(true);
            }, 2000);
        }
        catch (error) {
            logger.error(LOGGER_GROUP, `Error while launching logout window. ${error}`);
            return resolve(false);
        }
    }
    else {
        await notifySubscribers("logged-out", loggedOutSubscribers);
        resolve(true);
    }
}
async function init(options, log) {
    logger = log;
    if (authOptions === undefined) {
        logger.info(LOGGER_GROUP, `Setting options: ${JSON.stringify(options, null, 4)}`);
        authOptions = options;
        authenticated = Boolean(localStorage.getItem(EXAMPLE_AUTH_AUTHENTICATED_KEY));
        if (authenticated) {
            checkForSessionExpiry();
        }
    }
    else {
        logger.warn(LOGGER_GROUP, "Options have already been set as init has already been called");
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
        logger.info(LOGGER_GROUP, `Subscription to ${to} events registered. Subscription Id: ${key}`);
        return key;
    }
    return null;
}
function unsubscribe(from) {
    let matchFound = false;
    const eventType = subscribeIdMap[from];
    if (eventType === undefined) {
        logger.warn(LOGGER_GROUP, `You have tried to unsubscribe with a key ${from} that is invalid`);
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
        logger.info(LOGGER_GROUP, `Subscription to ${eventType} events with subscription Id: ${from} has been cleared`);
        return true;
    }
    logger.warn(LOGGER_GROUP, `Subscription to ${eventType} events with subscription Id: ${from} could not be cleared as we do not have a register of that event type.`);
    return false;
}
async function login() {
    logger.info(LOGGER_GROUP, "login requested");
    if (authenticated) {
        logger.info(LOGGER_GROUP, "User already authenticated");
        return authenticated;
    }
    if (authOptions.autoLogin) {
        logger.info(LOGGER_GROUP, "autoLogin enabled in auth provide module settings. Fake logged in");
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
            logger.info(LOGGER_GROUP, "Log out called");
            return true;
        })
            .catch(async (error) => {
            logger.error(LOGGER_GROUP, `Error while trying to log out ${error}`);
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
        logger.warn(LOGGER_GROUP, "Unable to retrieve user info unless the user is authenticated");
    }
    else {
        logger.info(LOGGER_GROUP, "This example does not return any user info. Returning null");
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
/* harmony export */   "authProvider": () => (/* binding */ authProvider)
/* harmony export */ });
/* harmony import */ var _auth_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-provider */ "./client/src/modules/auth/example/auth-provider.ts");

const authProvider = _auth_provider__WEBPACK_IMPORTED_MODULE_0__;

})();

var __webpack_exports__authProvider = __webpack_exports__.authProvider;
export { __webpack_exports__authProvider as authProvider };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLDREQUE0RCxDQUFDLENBQUM7S0FDeEY7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7Ozs7Ozs7U0M5V0Q7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xzRDtBQUUvQyxNQUFNLFlBQVksR0FBaUIsMkNBQWtCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvYXV0aC1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9sb2dnZXItc2hhcGVzXCI7XG5cbmNvbnN0IExPR0dFUl9HUk9VUCA9IFwiQXV0aEV4YW1wbGVcIjtcblxubGV0IGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG5sZXQgYXV0aE9wdGlvbnM6IEV4YW1wbGVPcHRpb25zO1xubGV0IHNlc3Npb25FeHBpcnlDaGVja0lkO1xubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5jb25zdCBzdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuY29uc3QgbG9nZ2VkSW5TdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcbmludGVyZmFjZSBFeGFtcGxlT3B0aW9ucyB7XG5cdGF1dG9Mb2dpbjogYm9vbGVhbjtcblx0YXV0aGVudGljYXRlZFVybDogc3RyaW5nO1xuXHRsb2dpblVybDogc3RyaW5nO1xuXHRsb2dvdXRVcmw6IHN0cmluZztcblx0bG9naW5IZWlnaHQ6IG51bWJlcjtcblx0bG9naW5XaWR0aDogbnVtYmVyO1xuXHRjaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzOiBudW1iZXI7XG5cdGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzOiBudW1iZXI7XG59XG5cbmNvbnN0IEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSA9IFwiRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURcIjtcblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdGRlZmF1bHRIZWlnaHQ6IGF1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDI1MCxcblx0XHRkZWZhdWx0V2lkdGg6IGF1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0dXJsXG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcblx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHR0cnkge1xuXHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRpZiAoaW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlci5lcnJvcihMT0dHRVJfR1JPVVAsIFwiRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvblwiLCBlcnJvcik7XG5cdH0gZmluYWxseSB7XG5cdFx0aWYgKHdpbmRvd1RvQ2hlY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRvcGVuTG9naW5XaW5kb3coYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHQudGhlbihhc3luYyAod2luKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdGlmIChpbmZvLnVybCA9PT0gYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdGxvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRcdExPR0dFUl9HUk9VUCxcblx0XHRcdFx0XHRcdGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Vycm9yLm1lc3NhZ2V9YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlcjtcblxuXHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0bG9nZ2VyLmluZm8oTE9HR0VSX0dST1VQLCBcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHdpbkluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0aWYgKHdpbkluZm8udXJsID09PSBhdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLnJlbW92ZUFsbExpc3RlbmVycygpO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCBhdXRoT3B0aW9ucy5jaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzID8/IDEgKiAxMDAwKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRsb2dnZXIuZXJyb3IoTE9HR0VSX0dST1VQLCBcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXJcIiwgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvclNlc3Npb25FeHBpcnkoZm9yY2UgPSBmYWxzZSkge1xuXHRpZiAoXG5cdFx0YXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICE9PSB1bmRlZmluZWQgJiZcblx0XHRhdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgPiAtMSAmJlxuXHRcdHNlc3Npb25FeHBpcnlDaGVja0lkID09PSB1bmRlZmluZWRcblx0KSB7XG5cdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdHNlc3Npb25FeHBpcnlDaGVja0lkID0gdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3Qgc3RpbGxBdXRoZW50aWNhdGVkID0gYXdhaXQgY2hlY2tBdXRoKGF1dGhPcHRpb25zLmxvZ2luVXJsKTtcblx0XHRcdGlmIChzdGlsbEF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdFx0bG9nZ2VyLmluZm8oTE9HR0VSX0dST1VQLCBcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdExPR0dFUl9HUk9VUCxcblx0XHRcdFx0XHRcIlNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLiBTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2tcIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwic2Vzc2lvbi1leHBpcmVkXCIsIHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMpO1xuXHRcdFx0fVxuXHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICogMTAwMCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbm90aWZ5U3Vic2NyaWJlcnMoZXZlbnRUeXBlOiBzdHJpbmcsIHN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+Pikge1xuXHRjb25zdCBzdWJzY3JpYmVySWRzID0gQXJyYXkuZnJvbShzdWJzY3JpYmVycy5rZXlzKCkpO1xuXHRzdWJzY3JpYmVySWRzLnJldmVyc2UoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzdWJzY3JpYmVySWQgPSBzdWJzY3JpYmVySWRzW2ldO1xuXHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0TE9HR0VSX0dST1VQLFxuXHRcdFx0YE5vdGlmeWluZyBzdWJzY3JpYmVyIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmliZXJJZH0gb2YgZXZlbnQgdHlwZTogJHtldmVudFR5cGV9YFxuXHRcdCk7XG5cdFx0YXdhaXQgc3Vic2NyaWJlcnMuZ2V0KHN1YnNjcmliZXJJZCkoKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci5lcnJvcihMT0dHRVJfR1JPVVAsIFwiWW91IGhhdmUgcmVxdWVzdGVkIHRvIGxvZyBvdXQgYnV0IGFyZSBub3QgbG9nZ2VkIGluXCIpO1xuXHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdHJldHVybjtcblx0fVxuXHRsb2dnZXIuaW5mbyhMT0dHRVJfR1JPVVAsIFwiTG9nIG91dCByZXF1ZXN0ZWRcIik7XG5cdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiwgYmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdGlmIChcblx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IHVuZGVmaW5lZCAmJlxuXHRcdGF1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gbnVsbCAmJlxuXHRcdGF1dGhPcHRpb25zLmxvZ2luVXJsLnRyaW0oKS5sZW5ndGggPiAwXG5cdCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB3aW4gPSBhd2FpdCBvcGVuTG9nb3V0V2luZG93KGF1dGhPcHRpb25zLmxvZ291dFVybCk7XG5cdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCBsb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKExPR0dFUl9HUk9VUCwgYEVycm9yIHdoaWxlIGxhdW5jaGluZyBsb2dvdXQgd2luZG93LiAke2Vycm9yfWApO1xuXHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRhd2FpdCBub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1vdXRcIiwgbG9nZ2VkT3V0U3Vic2NyaWJlcnMpO1xuXHRcdHJlc29sdmUodHJ1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQob3B0aW9uczogdW5rbm93biwgbG9nOiBMb2dnZXIpIHtcblx0bG9nZ2VyID0gbG9nO1xuXHRpZiAoYXV0aE9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLCBudWxsLCA0KX1gKTtcblx0XHRhdXRoT3B0aW9ucyA9IG9wdGlvbnMgYXMgRXhhbXBsZU9wdGlvbnM7XG5cdFx0YXV0aGVudGljYXRlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKSk7XG5cdFx0aWYgKGF1dGhlbnRpY2F0ZWQpIHtcblx0XHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dnZXIud2FybihMT0dHRVJfR1JPVVAsIFwiT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFwiKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlKFxuXHR0bzogXCJsb2dnZWQtaW5cIiB8IFwiYmVmb3JlLWxvZ2dlZC1vdXRcIiB8IFwibG9nZ2VkLW91dFwiIHwgXCJzZXNzaW9uLWV4cGlyZWRcIixcblx0Y2FsbGJhY2s6ICgpID0+IFByb21pc2U8dm9pZD5cbik6IHN0cmluZyB7XG5cdGNvbnN0IGtleSA9IGNyeXB0by5yYW5kb21VVUlEKCk7XG5cdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdHN3aXRjaCAodG8pIHtcblx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkSW5TdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0YmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkT3V0U3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0c3Vic2NyaWJlSWRNYXBba2V5XSA9IHRvO1xuXHRcdGxvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRyZXR1cm4ga2V5O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZnJvbTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdGNvbnN0IGV2ZW50VHlwZSA9IHN1YnNjcmliZUlkTWFwW2Zyb21dO1xuXHRpZiAoZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIud2FybihMT0dHRVJfR1JPVVAsIGBZb3UgaGF2ZSB0cmllZCB0byB1bnN1YnNjcmliZSB3aXRoIGEga2V5ICR7ZnJvbX0gdGhhdCBpcyBpbnZhbGlkYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c3dpdGNoIChldmVudFR5cGUpIHtcblx0XHRjYXNlIFwibG9nZ2VkLWluXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkSW5TdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImJlZm9yZS1sb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0YmVmb3JlTG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJsb2dnZWQtb3V0XCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0bG9nZ2VkT3V0U3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJzZXNzaW9uLWV4cGlyZWRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGRlbGV0ZSBzdWJzY3JpYmVJZE1hcFtmcm9tXTtcblx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdExPR0dFUl9HUk9VUCxcblx0XHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtmcm9tfSBoYXMgYmVlbiBjbGVhcmVkYFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRsb2dnZXIud2Fybihcblx0XHRMT0dHRVJfR1JPVVAsXG5cdFx0YFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGNvdWxkIG5vdCBiZSBjbGVhcmVkIGFzIHdlIGRvIG5vdCBoYXZlIGEgcmVnaXN0ZXIgb2YgdGhhdCBldmVudCB0eXBlLmBcblx0KTtcblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGxvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgXCJsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oTE9HR0VSX0dST1VQLCBcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdHJldHVybiBhdXRoZW50aWNhdGVkO1xuXHR9XG5cdGlmIChhdXRoT3B0aW9ucy5hdXRvTG9naW4pIHtcblx0XHRsb2dnZXIuaW5mbyhMT0dHRVJfR1JPVVAsIFwiYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW5cIik7XG5cdFx0YXV0aGVudGljYXRlZCA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0YXV0aGVudGljYXRlZCA9IGF3YWl0IGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0fVxuXG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZLCBhdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLWluXCIsIGxvZ2dlZEluU3Vic2NyaWJlcnMpO1xuXHR9XG5cblx0cmV0dXJuIGF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aGFuZGxlTG9nb3V0KHJlc29sdmUpXG5cdFx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgXCJMb2cgb3V0IGNhbGxlZFwiKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlcnJvcikgPT4ge1xuXHRcdFx0XHRsb2dnZXIuZXJyb3IoTE9HR0VSX0dST1VQLCBgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbzxUPigpOiBQcm9taXNlPFQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci53YXJuKExPR0dFUl9HUk9VUCwgXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlciBpbmZvIHVubGVzcyB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZ2dlci5pbmZvKExPR0dFUl9HUk9VUCwgXCJUaGlzIGV4YW1wbGUgZG9lcyBub3QgcmV0dXJuIGFueSB1c2VyIGluZm8uIFJldHVybmluZyBudWxsXCIpO1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vYXV0aC1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoUHJvdmlkZXI6IEF1dGhQcm92aWRlciA9IGF1dGhJbXBsZW1lbnRhdGlvbjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==