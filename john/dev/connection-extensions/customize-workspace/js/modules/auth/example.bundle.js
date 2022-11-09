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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0xzRDtBQUUvQyxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsSUFBSSxFQUFFLDJDQUFrQjtDQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2F1dGgtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwiY3VzdG9taXplLXdvcmtzcGFjZS9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVEZWZpbml0aW9uLCBNb2R1bGVIZWxwZXJzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcblxubGV0IGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG5sZXQgYXV0aE9wdGlvbnM6IEV4YW1wbGVPcHRpb25zO1xubGV0IHNlc3Npb25FeHBpcnlDaGVja0lkO1xubGV0IGxvZ2dlcjogTG9nZ2VyO1xuXG5jb25zdCBzdWJzY3JpYmVJZE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuY29uc3QgbG9nZ2VkSW5TdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsb2dnZWRPdXRTdWJzY3JpYmVyczogTWFwPHN0cmluZywgKCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBuZXcgTWFwKCk7XG5jb25zdCBzZXNzaW9uRXhwaXJlZFN1YnNjcmliZXJzOiBNYXA8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHZvaWQ+PiA9IG5ldyBNYXAoKTtcbmludGVyZmFjZSBFeGFtcGxlT3B0aW9ucyB7XG5cdGF1dG9Mb2dpbjogYm9vbGVhbjtcblx0YXV0aGVudGljYXRlZFVybDogc3RyaW5nO1xuXHRsb2dpblVybDogc3RyaW5nO1xuXHRsb2dvdXRVcmw6IHN0cmluZztcblx0bG9naW5IZWlnaHQ6IG51bWJlcjtcblx0bG9naW5XaWR0aDogbnVtYmVyO1xuXHRjaGVja0xvZ2luU3RhdHVzSW5TZWNvbmRzOiBudW1iZXI7XG5cdGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzOiBudW1iZXI7XG59XG5cbmNvbnN0IEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSA9IFwiRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURcIjtcblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdGRlZmF1bHRIZWlnaHQ6IGF1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDI1MCxcblx0XHRkZWZhdWx0V2lkdGg6IGF1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0dXJsXG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcblx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHR0cnkge1xuXHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRpZiAoaW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlci5lcnJvcihcIkVycm9yIGVuY291bnRlcmVkIHdoaWxlIGNoZWNraW5nIHNlc3Npb25cIiwgZXJyb3IpO1xuXHR9IGZpbmFsbHkge1xuXHRcdGlmICh3aW5kb3dUb0NoZWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGF3YWl0IHdpbmRvd1RvQ2hlY2suY2xvc2UodHJ1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBpc0F1dGhlbnRpY2F0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0b3BlbkxvZ2luV2luZG93KGF1dGhPcHRpb25zLmxvZ2luVXJsKVxuXHRcdFx0LnRoZW4oYXN5bmMgKHdpbikgPT4ge1xuXHRcdFx0XHRjb25zdCBhdXRoTWF0Y2ggPSBuZXcgUmVnRXhwKGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwsIFwiaVwiKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRpZiAoYXV0aE1hdGNoLnRlc3QoaW5mby51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0bG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIGNoZWNraW5nIGlmIGxvZ2luIHdpbmRvdyBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQuIEVycm9yICR7ZXJyb3IubWVzc2FnZX1gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyO1xuXG5cdFx0XHRcdGF3YWl0IHdpbi5hZGRMaXN0ZW5lcihcImNsb3NlZFwiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHdpbikge1xuXHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcIkF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyXCIpO1xuXHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW4uZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0aWYgKGF1dGhNYXRjaC50ZXN0KGluZm8udXJsKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0bG9nZ2VyLmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclwiLCBlcnJvcik7XG5cdFx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yU2Vzc2lvbkV4cGlyeShmb3JjZSA9IGZhbHNlKSB7XG5cdGlmIChcblx0XHRhdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgIT09IHVuZGVmaW5lZCAmJlxuXHRcdGF1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyA+IC0xICYmXG5cdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPT09IHVuZGVmaW5lZFxuXHQpIHtcblx0XHRzZXNzaW9uRXhwaXJ5Q2hlY2tJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0c2Vzc2lvbkV4cGlyeUNoZWNrSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBjaGVja0F1dGgoYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0aWYgKHN0aWxsQXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIlNlc3Npb24gU3RpbGwgQWN0aXZlXCIpO1xuXHRcdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFwiU2Vzc2lvbiBub3QgdmFsaWQuIEtpbGxpbmcgc2Vzc2lvbiBhbmQgbm90aWZ5aW5nIHJlZ2lzdGVyZWQgY2FsbGJhY2sgdGhhdCBhdXRoZW50aWNhdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBjaGVjayBpcyBjb25maWd1cmVkIGluIHRoZSBkYXRhIGZvciB0aGlzIGV4YW1wbGUgYXV0aCBtb2R1bGUuIFNldCBjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyB0byAtMSBpbiB0aGUgYXV0aFByb3ZpZGVyIG1vZHVsZSBkZWZpbml0aW9uIGlmIHlvdSB3aXNoIHRvIGRpc2FibGUgdGhpcyBjaGVja1wiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKTtcblx0XHRcdFx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJzZXNzaW9uLWV4cGlyZWRcIiwgc2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycyk7XG5cdFx0XHR9XG5cdFx0fSwgYXV0aE9wdGlvbnMuY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgKiAxMDAwKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBub3RpZnlTdWJzY3JpYmVycyhldmVudFR5cGU6IHN0cmluZywgc3Vic2NyaWJlcnM6IE1hcDxzdHJpbmcsICgpID0+IFByb21pc2U8dm9pZD4+KSB7XG5cdGNvbnN0IHN1YnNjcmliZXJJZHMgPSBBcnJheS5mcm9tKHN1YnNjcmliZXJzLmtleXMoKSk7XG5cdHN1YnNjcmliZXJJZHMucmV2ZXJzZSgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcklkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IHN1YnNjcmliZXJJZCA9IHN1YnNjcmliZXJJZHNbaV07XG5cdFx0bG9nZ2VyLmluZm8oYE5vdGlmeWluZyBzdWJzY3JpYmVyIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke3N1YnNjcmliZXJJZH0gb2YgZXZlbnQgdHlwZTogJHtldmVudFR5cGV9YCk7XG5cdFx0YXdhaXQgc3Vic2NyaWJlcnMuZ2V0KHN1YnNjcmliZXJJZCkoKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVMb2dvdXQocmVzb2x2ZTogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci5lcnJvcihcIllvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpblwiKTtcblx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRyZXR1cm47XG5cdH1cblx0bG9nZ2VyLmluZm8oXCJMb2cgb3V0IHJlcXVlc3RlZFwiKTtcblx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJiZWZvcmUtbG9nZ2VkLW91dFwiLCBiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKTtcblx0aWYgKFxuXHRcdGF1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0YXV0aE9wdGlvbnMubG9nb3V0VXJsICE9PSBudWxsICYmXG5cdFx0YXV0aE9wdGlvbnMubG9nb3V0VXJsLnRyaW0oKS5sZW5ndGggPiAwXG5cdCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB3aW4gPSBhd2FpdCBvcGVuTG9nb3V0V2luZG93KGF1dGhPcHRpb25zLmxvZ291dFVybCk7XG5cdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgd2luLmNsb3NlKCk7XG5cdFx0XHRcdGF3YWl0IG5vdGlmeVN1YnNjcmliZXJzKFwibG9nZ2VkLW91dFwiLCBsb2dnZWRPdXRTdWJzY3JpYmVycyk7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0YXdhaXQgbm90aWZ5U3Vic2NyaWJlcnMoXCJsb2dnZWQtb3V0XCIsIGxvZ2dlZE91dFN1YnNjcmliZXJzKTtcblx0XHRyZXNvbHZlKHRydWUpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuXHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPEV4YW1wbGVPcHRpb25zPixcblx0Y3JlYXRlTG9nZ2VyOiBMb2dnZXJDcmVhdG9yLFxuXHRoZWxwZXJzOiBNb2R1bGVIZWxwZXJzXG4pIHtcblx0bG9nZ2VyID0gY3JlYXRlTG9nZ2VyKFwiQXV0aEV4YW1wbGVcIik7XG5cdGlmIChhdXRoT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nZ2VyLmluZm8oYFNldHRpbmcgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShkZWZpbml0aW9uLmRhdGEsIG51bGwsIDQpfWApO1xuXHRcdGF1dGhPcHRpb25zID0gZGVmaW5pdGlvbi5kYXRhO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSkpO1xuXHRcdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nZ2VyLndhcm4oXCJPcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHNldCBhcyBpbml0IGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXCIpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoXG5cdHRvOiBcImxvZ2dlZC1pblwiIHwgXCJiZWZvcmUtbG9nZ2VkLW91dFwiIHwgXCJsb2dnZWQtb3V0XCIgfCBcInNlc3Npb24tZXhwaXJlZFwiLFxuXHRjYWxsYmFjazogKCkgPT4gUHJvbWlzZTx2b2lkPlxuKTogc3RyaW5nIHtcblx0Y29uc3Qga2V5ID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0bGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcblx0c3dpdGNoICh0bykge1xuXHRcdGNhc2UgXCJsb2dnZWQtaW5cIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRJblN1YnNjcmliZXJzLnNldChrZXksIGNhbGxiYWNrKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiYmVmb3JlLWxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRiZWZvcmVMb2dnZWRPdXRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcImxvZ2dlZC1vdXRcIjoge1xuXHRcdFx0bWF0Y2hGb3VuZCA9IHRydWU7XG5cdFx0XHRsb2dnZWRPdXRTdWJzY3JpYmVycy5zZXQoa2V5LCBjYWxsYmFjayk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcInNlc3Npb24tZXhwaXJlZFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdHNlc3Npb25FeHBpcmVkU3Vic2NyaWJlcnMuc2V0KGtleSwgY2FsbGJhY2spO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG1hdGNoRm91bmQpIHtcblx0XHRzdWJzY3JpYmVJZE1hcFtrZXldID0gdG87XG5cdFx0bG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke3RvfSBldmVudHMgcmVnaXN0ZXJlZC4gU3Vic2NyaXB0aW9uIElkOiAke2tleX1gKTtcblx0XHRyZXR1cm4ga2V5O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZnJvbTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG5cdGNvbnN0IGV2ZW50VHlwZSA9IHN1YnNjcmliZUlkTWFwW2Zyb21dO1xuXHRpZiAoZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dnZXIud2FybihgWW91IGhhdmUgdHJpZWQgdG8gdW5zdWJzY3JpYmUgd2l0aCBhIGtleSAke2Zyb219IHRoYXQgaXMgaW52YWxpZGApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHN3aXRjaCAoZXZlbnRUeXBlKSB7XG5cdFx0Y2FzZSBcImxvZ2dlZC1pblwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZEluU3Vic2NyaWJlcnMuZGVsZXRlKGZyb20pO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJiZWZvcmUtbG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGJlZm9yZUxvZ2dlZE91dFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibG9nZ2VkLW91dFwiOiB7XG5cdFx0XHRtYXRjaEZvdW5kID0gdHJ1ZTtcblx0XHRcdGxvZ2dlZE91dFN1YnNjcmliZXJzLmRlbGV0ZShmcm9tKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwic2Vzc2lvbi1leHBpcmVkXCI6IHtcblx0XHRcdG1hdGNoRm91bmQgPSB0cnVlO1xuXHRcdFx0c2Vzc2lvbkV4cGlyZWRTdWJzY3JpYmVycy5kZWxldGUoZnJvbSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRkZWxldGUgc3Vic2NyaWJlSWRNYXBbZnJvbV07XG5cdGlmIChtYXRjaEZvdW5kKSB7XG5cdFx0bG9nZ2VyLmluZm8oYFN1YnNjcmlwdGlvbiB0byAke2V2ZW50VHlwZX0gZXZlbnRzIHdpdGggc3Vic2NyaXB0aW9uIElkOiAke2Zyb219IGhhcyBiZWVuIGNsZWFyZWRgKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGxvZ2dlci53YXJuKFxuXHRcdGBTdWJzY3JpcHRpb24gdG8gJHtldmVudFR5cGV9IGV2ZW50cyB3aXRoIHN1YnNjcmlwdGlvbiBJZDogJHtmcm9tfSBjb3VsZCBub3QgYmUgY2xlYXJlZCBhcyB3ZSBkbyBub3QgaGF2ZSBhIHJlZ2lzdGVyIG9mIHRoYXQgZXZlbnQgdHlwZS5gXG5cdCk7XG5cdHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRsb2dnZXIuaW5mbyhcImxvZ2luIHJlcXVlc3RlZFwiKTtcblx0aWYgKGF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dnZXIuaW5mbyhcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdHJldHVybiBhdXRoZW50aWNhdGVkO1xuXHR9XG5cdGlmIChhdXRoT3B0aW9ucy5hdXRvTG9naW4pIHtcblx0XHRsb2dnZXIuaW5mbyhcImF1dG9Mb2dpbiBlbmFibGVkIGluIGF1dGggcHJvdmlkZSBtb2R1bGUgc2V0dGluZ3MuIEZha2UgbG9nZ2VkIGluXCIpO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdH1cblxuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSwgYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHRhd2FpdCBub3RpZnlTdWJzY3JpYmVycyhcImxvZ2dlZC1pblwiLCBsb2dnZWRJblN1YnNjcmliZXJzKTtcblx0fVxuXG5cdHJldHVybiBhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGhhbmRsZUxvZ291dChyZXNvbHZlKVxuXHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIkxvZyBvdXQgY2FsbGVkXCIpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG5cdFx0XHRcdGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZyBvdXQgJHtlcnJvcn1gKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQXV0aGVudGljYXRpb25SZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbzxUPigpOiBQcm9taXNlPFQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIgaW5mbyB1bmxlc3MgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2dnZXIuaW5mbyhcIlRoaXMgZXhhbXBsZSBkb2VzIG5vdCByZXR1cm4gYW55IHVzZXIgaW5mby4gUmV0dXJuaW5nIG51bGxcIik7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcImN1c3RvbWl6ZS13b3Jrc3BhY2Uvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRhdXRoOiBhdXRoSW1wbGVtZW50YXRpb25cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=