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
/* harmony export */   "setLogger": () => (/* binding */ setLogger)
/* harmony export */ });
let logInfo = console.log;
let logWarning = console.warn;
let logError = console.error;
let authRequiredCallback;
let authenticated;
let authOptions;
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
        logError(`Error encountered while checking session.`, error);
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
                        resolve(true);
                        return true;
                    }
                    await win.show(true);
                }
            }
            catch (error) {
                logError(`Error while checking if login window automatically redirected. Error ${error.message}`);
                if (win !== undefined) {
                    await win.show(true);
                }
            }
            let statusCheck;
            await win.addListener("closed", async () => {
                if (win) {
                    window.clearInterval(statusCheck);
                    statusCheck = undefined;
                    logInfo("Example Auth: Auth Window cancelled by user.");
                    win = undefined;
                    resolve(false);
                    return false;
                }
            });
            statusCheck = window.setInterval(async () => {
                if (win !== undefined) {
                    const winInfo = await win.getInfo();
                    if (winInfo.url === authOptions.authenticatedUrl) {
                        window.clearInterval(statusCheck);
                        await win.removeAllListeners();
                        await win.close(true);
                        resolve(true);
                        return true;
                    }
                }
                else {
                    resolve(false);
                    return false;
                }
            }, authOptions.checkLoginStatusInSeconds ?? 1 * 1000);
            return true;
        })
            .catch((error) => {
            console.error(`Error while trying to authenticate the user`, error);
        });
    });
}
function checkForSessionExpiry() {
    if (authOptions?.checkSessionValidityInSeconds !== undefined &&
        authOptions?.checkSessionValidityInSeconds > -1) {
        setTimeout(async () => {
            const stillAuthenticated = await checkAuth(authOptions.loginUrl);
            if (stillAuthenticated) {
                logInfo("Example Auth: Session Still Active.");
                checkForSessionExpiry();
            }
            else {
                logInfo(`Example Auth: Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module.
				Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check.`);
                authenticated = false;
                localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
                if (authRequiredCallback !== undefined) {
                    authRequiredCallback(true);
                }
            }
        }, authOptions.checkSessionValidityInSeconds * 1000);
    }
}
async function init(options) {
    if (authOptions === undefined) {
        logInfo("Example Auth: Setting options.");
        authOptions = options;
        authenticated = Boolean(localStorage.getItem(EXAMPLE_AUTH_AUTHENTICATED_KEY));
        if (authenticated) {
            checkForSessionExpiry();
        }
    }
    else {
        logWarning("Example Auth: Options have already been set as init has already been called.");
    }
}
async function login() {
    logInfo("Example Auth: login requested");
    if (authenticated) {
        logInfo("User already authenticated");
        return authenticated;
    }
    if (authOptions.autoLogin) {
        logInfo("Example Auth: autoLogin enabled in auth provide module settings. Fake logged in.");
        authenticated = true;
    }
    else {
        authenticated = await getAuthenticationFromUser();
    }
    if (authenticated) {
        localStorage.setItem(EXAMPLE_AUTH_AUTHENTICATED_KEY, authenticated.toString());
        checkForSessionExpiry();
    }
    return authenticated;
}
async function logout() {
    return new Promise((resolve, reject) => {
        if (authenticated === undefined || !authenticated) {
            logError("Example Auth: You have requested to log out but are not logged in.");
            resolve(false);
            return false;
        }
        logInfo("Example Auth: Log out requested.");
        authenticated = false;
        localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
        if (authOptions.logoutUrl !== undefined &&
            authOptions.logoutUrl !== null &&
            authOptions.loginUrl.trim().length > 0) {
            openLogoutWindow(authOptions.logoutUrl)
                .then((win) => {
                // give time for the logout window to load.
                setTimeout(async () => {
                    await win.close();
                    resolve(true);
                    return true;
                }, 2000);
                return true;
            })
                .catch((error) => {
                logError(`Error while launching logout window. ${error}`);
                resolve(false);
                return false;
            });
        }
        else {
            resolve(true);
            return true;
        }
    });
}
async function isAuthenticationRequired(callback) {
    if (callback !== undefined) {
        if (authRequiredCallback === undefined) {
            logInfo("Example Auth: Assigning passed callback");
            authRequiredCallback = callback;
        }
        else {
            logWarning("Example Auth: This is only a sample and only accepts one callback registration.");
        }
    }
    if (authenticated === undefined) {
        authenticated = false;
    }
    return !authenticated;
}
async function getUserInfo() {
    if (authenticated === undefined || !authenticated) {
        logWarning("Example Auth: Unable to retrieve user info unless the user is authenticated.");
    }
    else {
        logInfo("Example Auth: This example does not return any user info. Returning null.");
    }
    return null;
}
function setLogger(info, warn, error) {
    if (info !== undefined) {
        logInfo = info;
    }
    if (warn !== undefined) {
        logWarning = warn;
    }
    if (error !== undefined) {
        logError = error;
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLFNBQVMsRUFBRTtRQUN2QixVQUFVLEdBQUcsSUFBSSxDQUFDO0tBQ2xCO0lBQ0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3hCLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDakI7QUFDRixDQUFDOzs7Ozs7O1NDcFJEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMc0Q7QUFFL0MsTUFBTSxZQUFZLEdBQWlCLDJDQUFrQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2F1dGgtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS8uL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2V4YW1wbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGxvZ0luZm8gPSBjb25zb2xlLmxvZztcbmxldCBsb2dXYXJuaW5nID0gY29uc29sZS53YXJuO1xubGV0IGxvZ0Vycm9yID0gY29uc29sZS5lcnJvcjtcbmxldCBhdXRoUmVxdWlyZWRDYWxsYmFjazogKGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG5sZXQgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbmxldCBhdXRoT3B0aW9uczogRXhhbXBsZU9wdGlvbnM7XG5pbnRlcmZhY2UgRXhhbXBsZU9wdGlvbnMge1xuXHRhdXRvTG9naW46IGJvb2xlYW47XG5cdGF1dGhlbnRpY2F0ZWRVcmw6IHN0cmluZztcblx0bG9naW5Vcmw6IHN0cmluZztcblx0bG9nb3V0VXJsOiBzdHJpbmc7XG5cdGxvZ2luSGVpZ2h0OiBudW1iZXI7XG5cdGxvZ2luV2lkdGg6IG51bWJlcjtcblx0Y2hlY2tMb2dpblN0YXR1c0luU2Vjb25kczogbnVtYmVyO1xuXHRjaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kczogbnVtYmVyO1xufVxuXG5jb25zdCBFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkgPSBcIkVYQU1QTEVfQVVUSF9JU19BVVRIRU5USUNBVEVEXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5Mb2dpbldpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctaW5cIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0Q2VudGVyZWQ6IHRydWUsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMjUwLFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmxcblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5Mb2dvdXRXaW5kb3codXJsOiBzdHJpbmcpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93PiB7XG5cdHJldHVybiBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtbG9nLW91dFwiLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tBdXRoKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdGNvbnN0IHdpbmRvd1RvQ2hlY2sgPSBhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0bmFtZTogXCJleGFtcGxlLWF1dGgtY2hlY2std2luZG93XCIsXG5cdFx0YWx3YXlzT25Ub3A6IHRydWUsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdEhlaWdodDogYXV0aE9wdGlvbnMubG9naW5IZWlnaHQgPz8gMjUwLFxuXHRcdGRlZmF1bHRXaWR0aDogYXV0aE9wdGlvbnMubG9naW5XaWR0aCA/PyA0MDAsXG5cdFx0aW5jbHVkZUluU25hcHNob3RzOiBmYWxzZSxcblx0XHRyZXNpemFibGU6IGZhbHNlLFxuXHRcdHNob3dUYXNrYmFySWNvbjogZmFsc2UsXG5cdFx0c2F2ZVdpbmRvd1N0YXRlOiBmYWxzZSxcblx0XHR1cmxcblx0fSk7XG5cdGxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0dHJ5IHtcblx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luZG93VG9DaGVjay5nZXRJbmZvKCk7XG5cdFx0aWYgKGluZm8udXJsID09PSBhdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2dFcnJvcihgRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2hlY2tpbmcgc2Vzc2lvbi5gLCBlcnJvcik7XG5cdH0gZmluYWxseSB7XG5cdFx0aWYgKHdpbmRvd1RvQ2hlY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YXdhaXQgd2luZG93VG9DaGVjay5jbG9zZSh0cnVlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGlzQXV0aGVudGljYXRlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aGVudGljYXRpb25Gcm9tVXNlcigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRvcGVuTG9naW5XaW5kb3coYXV0aE9wdGlvbnMubG9naW5VcmwpXG5cdFx0XHQudGhlbihhc3luYyAod2luKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRcdGlmIChpbmZvLnVybCA9PT0gYXV0aE9wdGlvbnMuYXV0aGVudGljYXRlZFVybCkge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdGxvZ0Vycm9yKGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Vycm9yLm1lc3NhZ2V9YCk7XG5cdFx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uc2hvdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc3RhdHVzQ2hlY2s6IG51bWJlcjtcblxuXHRcdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh3aW4pIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHN0YXR1c0NoZWNrKTtcblx0XHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0bG9nSW5mbyhcIkV4YW1wbGUgQXV0aDogQXV0aCBXaW5kb3cgY2FuY2VsbGVkIGJ5IHVzZXIuXCIpO1xuXHRcdFx0XHRcdFx0d2luID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RhdHVzQ2hlY2sgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2luSW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRpZiAod2luSW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB3aW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgYXV0aE9wdGlvbnMuY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kcyA/PyAxICogMTAwMCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlcmAsIGVycm9yKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCkge1xuXHRpZiAoXG5cdFx0YXV0aE9wdGlvbnM/LmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICE9PSB1bmRlZmluZWQgJiZcblx0XHRhdXRoT3B0aW9ucz8uY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgPiAtMVxuXHQpIHtcblx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IHN0aWxsQXV0aGVudGljYXRlZCA9IGF3YWl0IGNoZWNrQXV0aChhdXRoT3B0aW9ucy5sb2dpblVybCk7XG5cdFx0XHRpZiAoc3RpbGxBdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRcdGxvZ0luZm8oXCJFeGFtcGxlIEF1dGg6IFNlc3Npb24gU3RpbGwgQWN0aXZlLlwiKTtcblx0XHRcdFx0Y2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2dJbmZvKGBFeGFtcGxlIEF1dGg6IFNlc3Npb24gbm90IHZhbGlkLiBLaWxsaW5nIHNlc3Npb24gYW5kIG5vdGlmeWluZyByZWdpc3RlcmVkIGNhbGxiYWNrIHRoYXQgYXV0aGVudGljYXRpb24gaXMgcmVxdWlyZWQuIFRoaXMgY2hlY2sgaXMgY29uZmlndXJlZCBpbiB0aGUgZGF0YSBmb3IgdGhpcyBleGFtcGxlIGF1dGggbW9kdWxlLlxuXHRcdFx0XHRTZXQgY2hlY2tTZXNzaW9uVmFsaWRpdHlJblNlY29uZHMgdG8gLTEgaW4gdGhlIGF1dGhQcm92aWRlciBtb2R1bGUgZGVmaW5pdGlvbiBpZiB5b3Ugd2lzaCB0byBkaXNhYmxlIHRoaXMgY2hlY2suYCk7XG5cdFx0XHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZKTtcblx0XHRcdFx0aWYgKGF1dGhSZXF1aXJlZENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhdXRoUmVxdWlyZWRDYWxsYmFjayh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIGF1dGhPcHRpb25zLmNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzICogMTAwMCk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQob3B0aW9uczogdW5rbm93bikge1xuXHRpZiAoYXV0aE9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ0luZm8oXCJFeGFtcGxlIEF1dGg6IFNldHRpbmcgb3B0aW9ucy5cIik7XG5cdFx0YXV0aE9wdGlvbnMgPSBvcHRpb25zIGFzIEV4YW1wbGVPcHRpb25zO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSkpO1xuXHRcdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nV2FybmluZyhcIkV4YW1wbGUgQXV0aDogT3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBzZXQgYXMgaW5pdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZC5cIik7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBsb2dpbiByZXF1ZXN0ZWRcIik7XG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9nSW5mbyhcIlVzZXIgYWxyZWFkeSBhdXRoZW50aWNhdGVkXCIpO1xuXHRcdHJldHVybiBhdXRoZW50aWNhdGVkO1xuXHR9XG5cdGlmIChhdXRoT3B0aW9ucy5hdXRvTG9naW4pIHtcblx0XHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBhdXRvTG9naW4gZW5hYmxlZCBpbiBhdXRoIHByb3ZpZGUgbW9kdWxlIHNldHRpbmdzLiBGYWtlIGxvZ2dlZCBpbi5cIik7XG5cdFx0YXV0aGVudGljYXRlZCA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0YXV0aGVudGljYXRlZCA9IGF3YWl0IGdldEF1dGhlbnRpY2F0aW9uRnJvbVVzZXIoKTtcblx0fVxuXG5cdGlmIChhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oRVhBTVBMRV9BVVRIX0FVVEhFTlRJQ0FURURfS0VZLCBhdXRoZW50aWNhdGVkLnRvU3RyaW5nKCkpO1xuXHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHR9XG5cblx0cmV0dXJuIGF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdFx0bG9nRXJyb3IoXCJFeGFtcGxlIEF1dGg6IFlvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpbi5cIik7XG5cdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0bG9nSW5mbyhcIkV4YW1wbGUgQXV0aDogTG9nIG91dCByZXF1ZXN0ZWQuXCIpO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkpO1xuXHRcdGlmIChcblx0XHRcdGF1dGhPcHRpb25zLmxvZ291dFVybCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IG51bGwgJiZcblx0XHRcdGF1dGhPcHRpb25zLmxvZ2luVXJsLnRyaW0oKS5sZW5ndGggPiAwXG5cdFx0KSB7XG5cdFx0XHRvcGVuTG9nb3V0V2luZG93KGF1dGhPcHRpb25zLmxvZ291dFVybClcblx0XHRcdFx0LnRoZW4oKHdpbikgPT4ge1xuXHRcdFx0XHRcdC8vIGdpdmUgdGltZSBmb3IgdGhlIGxvZ291dCB3aW5kb3cgdG8gbG9hZC5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0bG9nRXJyb3IoYEVycm9yIHdoaWxlIGxhdW5jaGluZyBsb2dvdXQgd2luZG93LiAke2Vycm9yfWApO1xuXHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGlvblJlcXVpcmVkKFxuXHRjYWxsYmFjaz86IChhdXRoZW50aWNhdGlvblJlcXVpcmVkOiBib29sZWFuKSA9PiB2b2lkXG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0aWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoYXV0aFJlcXVpcmVkQ2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bG9nSW5mbyhcIkV4YW1wbGUgQXV0aDogQXNzaWduaW5nIHBhc3NlZCBjYWxsYmFja1wiKTtcblx0XHRcdGF1dGhSZXF1aXJlZENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxvZ1dhcm5pbmcoXCJFeGFtcGxlIEF1dGg6IFRoaXMgaXMgb25seSBhIHNhbXBsZSBhbmQgb25seSBhY2NlcHRzIG9uZSBjYWxsYmFjayByZWdpc3RyYXRpb24uXCIpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuICFhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckluZm88VD4oKTogUHJvbWlzZTxUPiB7XG5cdGlmIChhdXRoZW50aWNhdGVkID09PSB1bmRlZmluZWQgfHwgIWF1dGhlbnRpY2F0ZWQpIHtcblx0XHRsb2dXYXJuaW5nKFwiRXhhbXBsZSBBdXRoOiBVbmFibGUgdG8gcmV0cmlldmUgdXNlciBpbmZvIHVubGVzcyB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkLlwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBUaGlzIGV4YW1wbGUgZG9lcyBub3QgcmV0dXJuIGFueSB1c2VyIGluZm8uIFJldHVybmluZyBudWxsLlwiKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldExvZ2dlcihcblx0aW5mbzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCxcblx0d2FybjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCxcblx0ZXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWRcbik6IHZvaWQge1xuXHRpZiAoaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nSW5mbyA9IGluZm87XG5cdH1cblx0aWYgKHdhcm4gIT09IHVuZGVmaW5lZCkge1xuXHRcdGxvZ1dhcm5pbmcgPSB3YXJuO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nRXJyb3IgPSBlcnJvcjtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vYXV0aC1zaGFwZXNcIjtcbmltcG9ydCAqIGFzIGF1dGhJbXBsZW1lbnRhdGlvbiBmcm9tIFwiLi9hdXRoLXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoUHJvdmlkZXI6IEF1dGhQcm92aWRlciA9IGF1dGhJbXBsZW1lbnRhdGlvbjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==