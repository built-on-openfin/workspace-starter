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
        openLoginWindow(authOptions.loginUrl).then(async (win) => {
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
            }, (authOptions.checkLoginStatusInSeconds ?? 1 * 1000));
            return true;
        })
            .catch((error) => {
            console.error(`Error while trying to authenticate the user`, error);
        });
    });
}
function checkForSessionExpiry() {
    if (authOptions?.checkSessionValidityInSeconds !== undefined && authOptions?.checkSessionValidityInSeconds > -1) {
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
            openLogoutWindow(authOptions.logoutUrl).then((win) => {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksS0FBSyxTQUFTLEVBQUU7UUFDdkIsVUFBVSxHQUFHLElBQUksQ0FBQztLQUNsQjtJQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN4QixRQUFRLEdBQUcsS0FBSyxDQUFDO0tBQ2pCO0FBQ0YsQ0FBQzs7Ozs7OztTQzdRRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTHNEO0FBRS9DLE1BQU0sWUFBWSxHQUFpQiwyQ0FBa0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlLy4vY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvZXhhbXBsZS9hdXRoLXByb3ZpZGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY3VzdG9taXplLXdvcmtzcGFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jdXN0b21pemUtd29ya3NwYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWN1c3RvbWl6ZS13b3Jrc3BhY2UvLi9jbGllbnQvc3JjL21vZHVsZXMvYXV0aC9leGFtcGxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBsb2dJbmZvID0gY29uc29sZS5sb2c7XG5sZXQgbG9nV2FybmluZyA9IGNvbnNvbGUud2FybjtcbmxldCBsb2dFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5sZXQgYXV0aFJlcXVpcmVkQ2FsbGJhY2s6IChhdXRoZW50aWNhdGlvblJlcXVpcmVkOiBib29sZWFuKSA9PiB2b2lkO1xubGV0IGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG5sZXQgYXV0aE9wdGlvbnM6IEV4YW1wbGVPcHRpb25zO1xuaW50ZXJmYWNlIEV4YW1wbGVPcHRpb25zIHtcbiBhdXRvTG9naW46IGJvb2xlYW47XG4gYXV0aGVudGljYXRlZFVybDogc3RyaW5nO1xuIGxvZ2luVXJsOiBzdHJpbmc7XG4gbG9nb3V0VXJsOiBzdHJpbmc7XG4gbG9naW5IZWlnaHQ6IG51bWJlcjtcbiBsb2dpbldpZHRoOiBudW1iZXI7XG4gY2hlY2tMb2dpblN0YXR1c0luU2Vjb25kczogbnVtYmVyO1xuIGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzOiBudW1iZXI7XG59XG5cbmNvbnN0IEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSA9IFwiRVhBTVBMRV9BVVRIX0lTX0FVVEhFTlRJQ0FURURcIjtcblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ2luV2luZG93KHVybDogc3RyaW5nKTogUHJvbWlzZTxPcGVuRmluLldpbmRvdz4ge1xuXHRyZXR1cm4gZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdG5hbWU6IFwiZXhhbXBsZS1hdXRoLWxvZy1pblwiLFxuXHRcdGFsd2F5c09uVG9wOiB0cnVlLFxuXHRcdG1heGltaXphYmxlOiBmYWxzZSxcblx0XHRtaW5pbWl6YWJsZTogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdGRlZmF1bHRDZW50ZXJlZDogdHJ1ZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlbkxvZ291dFdpbmRvdyh1cmw6IHN0cmluZyk6IFByb21pc2U8T3BlbkZpbi5XaW5kb3c+IHtcblx0cmV0dXJuIGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1sb2ctb3V0XCIsXG5cdFx0bWF4aW1pemFibGU6IGZhbHNlLFxuXHRcdG1pbmltaXphYmxlOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0ZGVmYXVsdENlbnRlcmVkOiB0cnVlLFxuXHRcdGRlZmF1bHRIZWlnaHQ6IGF1dGhPcHRpb25zLmxvZ2luSGVpZ2h0ID8/IDI1MCxcblx0XHRkZWZhdWx0V2lkdGg6IGF1dGhPcHRpb25zLmxvZ2luV2lkdGggPz8gNDAwLFxuXHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0cmVzaXphYmxlOiBmYWxzZSxcblx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdHNhdmVXaW5kb3dTdGF0ZTogZmFsc2UsXG5cdFx0dXJsXG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0F1dGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Y29uc3Qgd2luZG93VG9DaGVjayA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHtcblx0XHRuYW1lOiBcImV4YW1wbGUtYXV0aC1jaGVjay13aW5kb3dcIixcblx0XHRhbHdheXNPblRvcDogdHJ1ZSxcblx0XHRtYXhpbWl6YWJsZTogZmFsc2UsXG5cdFx0bWluaW1pemFibGU6IGZhbHNlLFxuXHRcdGF1dG9TaG93OiBmYWxzZSxcblx0XHRkZWZhdWx0SGVpZ2h0OiBhdXRoT3B0aW9ucy5sb2dpbkhlaWdodCA/PyAyNTAsXG5cdFx0ZGVmYXVsdFdpZHRoOiBhdXRoT3B0aW9ucy5sb2dpbldpZHRoID8/IDQwMCxcblx0XHRpbmNsdWRlSW5TbmFwc2hvdHM6IGZhbHNlLFxuXHRcdHJlc2l6YWJsZTogZmFsc2UsXG5cdFx0c2hvd1Rhc2tiYXJJY29uOiBmYWxzZSxcblx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdHVybFxuXHR9KTtcblx0bGV0IGlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHR0cnkge1xuXHRcdGNvbnN0IGluZm8gPSBhd2FpdCB3aW5kb3dUb0NoZWNrLmdldEluZm8oKTtcblx0XHRpZiAoaW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdGlzQXV0aGVudGljYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ0Vycm9yKGBFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjaGVja2luZyBzZXNzaW9uLmAsIGVycm9yKTtcblx0fSBmaW5hbGx5IHtcblx0XHRpZiAod2luZG93VG9DaGVjayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRhd2FpdCB3aW5kb3dUb0NoZWNrLmNsb3NlKHRydWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaXNBdXRoZW50aWNhdGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdG9wZW5Mb2dpbldpbmRvdyhhdXRoT3B0aW9ucy5sb2dpblVybCkudGhlbihhc3luYyAod2luKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAod2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRjb25zdCBpbmZvID0gYXdhaXQgd2luLmdldEluZm8oKTtcblx0XHRcdFx0XHRpZiAoaW5mby51cmwgPT09IGF1dGhPcHRpb25zLmF1dGhlbnRpY2F0ZWRVcmwpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSh0cnVlKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXdhaXQgd2luLnNob3codHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGxvZ0Vycm9yKGBFcnJvciB3aGlsZSBjaGVja2luZyBpZiBsb2dpbiB3aW5kb3cgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLiBFcnJvciAke2Vycm9yLm1lc3NhZ2V9YCk7XG5cdFx0XHRcdGlmICh3aW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5zaG93KHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzdGF0dXNDaGVjazogbnVtYmVyO1xuXG5cdFx0XHRhd2FpdCB3aW4uYWRkTGlzdGVuZXIoXCJjbG9zZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAod2luKSB7XG5cdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoc3RhdHVzQ2hlY2spO1xuXHRcdFx0XHRcdHN0YXR1c0NoZWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGxvZ0luZm8oXCJFeGFtcGxlIEF1dGg6IEF1dGggV2luZG93IGNhbmNlbGxlZCBieSB1c2VyLlwiKTtcblx0XHRcdFx0XHR3aW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHN0YXR1c0NoZWNrID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Y29uc3Qgd2luSW5mbyA9IGF3YWl0IHdpbi5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0aWYgKHdpbkluZm8udXJsID09PSBhdXRoT3B0aW9ucy5hdXRoZW50aWNhdGVkVXJsKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChzdGF0dXNDaGVjayk7XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0XHRhd2FpdCB3aW4uY2xvc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKGF1dGhPcHRpb25zLmNoZWNrTG9naW5TdGF0dXNJblNlY29uZHMgPz8gMSAqIDEwMDApKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pXG5cdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGF1dGhlbnRpY2F0ZSB0aGUgdXNlcmAsIGVycm9yKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpIHtcblx0aWYgKGF1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyAhPT0gdW5kZWZpbmVkICYmIGF1dGhPcHRpb25zPy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyA+IC0xKSB7XG5cdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBzdGlsbEF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBjaGVja0F1dGgoYXV0aE9wdGlvbnMubG9naW5VcmwpO1xuXHRcdFx0aWYgKHN0aWxsQXV0aGVudGljYXRlZCkge1xuXHRcdFx0XHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBTZXNzaW9uIFN0aWxsIEFjdGl2ZS5cIik7XG5cdFx0XHRcdGNoZWNrRm9yU2Vzc2lvbkV4cGlyeSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nSW5mbyhgRXhhbXBsZSBBdXRoOiBTZXNzaW9uIG5vdCB2YWxpZC4gS2lsbGluZyBzZXNzaW9uIGFuZCBub3RpZnlpbmcgcmVnaXN0ZXJlZCBjYWxsYmFjayB0aGF0IGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkLiBUaGlzIGNoZWNrIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGRhdGEgZm9yIHRoaXMgZXhhbXBsZSBhdXRoIG1vZHVsZS5cblx0XHRcdFx0U2V0IGNoZWNrU2Vzc2lvblZhbGlkaXR5SW5TZWNvbmRzIHRvIC0xIGluIHRoZSBhdXRoUHJvdmlkZXIgbW9kdWxlIGRlZmluaXRpb24gaWYgeW91IHdpc2ggdG8gZGlzYWJsZSB0aGlzIGNoZWNrLmApO1xuXHRcdFx0XHRhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSk7XG5cdFx0XHRcdGlmIChhdXRoUmVxdWlyZWRDYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YXV0aFJlcXVpcmVkQ2FsbGJhY2sodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCBhdXRoT3B0aW9ucy5jaGVja1Nlc3Npb25WYWxpZGl0eUluU2Vjb25kcyAqIDEwMDApO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KG9wdGlvbnM6IHVua25vd24pIHtcblx0aWYgKGF1dGhPcHRpb25zID09PSB1bmRlZmluZWQpIHtcblx0XHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBTZXR0aW5nIG9wdGlvbnMuXCIpO1xuXHRcdGF1dGhPcHRpb25zID0gb3B0aW9ucyBhcyBFeGFtcGxlT3B0aW9ucztcblx0XHRhdXRoZW50aWNhdGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkpKTtcblx0XHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdFx0Y2hlY2tGb3JTZXNzaW9uRXhwaXJ5KCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGxvZ1dhcm5pbmcoXCJFeGFtcGxlIEF1dGg6IE9wdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IGFzIGluaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQuXCIpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0bG9nSW5mbyhcIkV4YW1wbGUgQXV0aDogbG9naW4gcmVxdWVzdGVkXCIpO1xuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ0luZm8oXCJVc2VyIGFscmVhZHkgYXV0aGVudGljYXRlZFwiKTtcblx0XHRyZXR1cm4gYXV0aGVudGljYXRlZDtcblx0fVxuXHRpZiAoYXV0aE9wdGlvbnMuYXV0b0xvZ2luKSB7XG5cdFx0bG9nSW5mbyhcIkV4YW1wbGUgQXV0aDogYXV0b0xvZ2luIGVuYWJsZWQgaW4gYXV0aCBwcm92aWRlIG1vZHVsZSBzZXR0aW5ncy4gRmFrZSBsb2dnZWQgaW4uXCIpO1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBnZXRBdXRoZW50aWNhdGlvbkZyb21Vc2VyKCk7XG5cdH1cblxuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEVYQU1QTEVfQVVUSF9BVVRIRU5USUNBVEVEX0tFWSwgYXV0aGVudGljYXRlZC50b1N0cmluZygpKTtcblx0XHRjaGVja0ZvclNlc3Npb25FeHBpcnkoKTtcblx0fVxuXG5cdHJldHVybiBhdXRoZW50aWNhdGVkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRpZiAoYXV0aGVudGljYXRlZCA9PT0gdW5kZWZpbmVkIHx8ICFhdXRoZW50aWNhdGVkKSB7XG5cdFx0bG9nRXJyb3IoXCJFeGFtcGxlIEF1dGg6IFlvdSBoYXZlIHJlcXVlc3RlZCB0byBsb2cgb3V0IGJ1dCBhcmUgbm90IGxvZ2dlZCBpbi5cIik7XG5cdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxvZ0luZm8oXCJFeGFtcGxlIEF1dGg6IExvZyBvdXQgcmVxdWVzdGVkLlwiKTtcblx0YXV0aGVudGljYXRlZCA9IGZhbHNlO1xuXHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShFWEFNUExFX0FVVEhfQVVUSEVOVElDQVRFRF9LRVkpO1xuXHRpZiAoYXV0aE9wdGlvbnMubG9nb3V0VXJsICE9PSB1bmRlZmluZWQgJiZcblx0XHRhdXRoT3B0aW9ucy5sb2dvdXRVcmwgIT09IG51bGwgJiZcblx0XHRhdXRoT3B0aW9ucy5sb2dpblVybC50cmltKCkubGVuZ3RoID4gMCkge1xuXHRcdFx0b3BlbkxvZ291dFdpbmRvdyhhdXRoT3B0aW9ucy5sb2dvdXRVcmwpLnRoZW4oKHdpbikgPT4ge1xuXHRcdFx0XHQvLyBnaXZlIHRpbWUgZm9yIHRoZSBsb2dvdXQgd2luZG93IHRvIGxvYWQuXG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHdpbi5jbG9zZSgpO1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdGxvZ0Vycm9yKGBFcnJvciB3aGlsZSBsYXVuY2hpbmcgbG9nb3V0IHdpbmRvdy4gJHtlcnJvcn1gKTtcblx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0fSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQoXG5cdGNhbGxiYWNrPzogKGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IGJvb2xlYW4pID0+IHZvaWRcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChhdXRoUmVxdWlyZWRDYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsb2dJbmZvKFwiRXhhbXBsZSBBdXRoOiBBc3NpZ25pbmcgcGFzc2VkIGNhbGxiYWNrXCIpO1xuXHRcdFx0YXV0aFJlcXVpcmVkQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bG9nV2FybmluZyhcIkV4YW1wbGUgQXV0aDogVGhpcyBpcyBvbmx5IGEgc2FtcGxlIGFuZCBvbmx5IGFjY2VwdHMgb25lIGNhbGxiYWNrIHJlZ2lzdHJhdGlvbi5cIik7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbzxUPigpOiBQcm9taXNlPFQ+IHtcblx0aWYgKGF1dGhlbnRpY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCAhYXV0aGVudGljYXRlZCkge1xuXHRcdGxvZ1dhcm5pbmcoXCJFeGFtcGxlIEF1dGg6IFVuYWJsZSB0byByZXRyaWV2ZSB1c2VyIGluZm8gdW5sZXNzIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZ0luZm8oXCJFeGFtcGxlIEF1dGg6IFRoaXMgZXhhbXBsZSBkb2VzIG5vdCByZXR1cm4gYW55IHVzZXIgaW5mby4gUmV0dXJuaW5nIG51bGwuXCIpO1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9nZ2VyKFxuXHRpbmZvOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLFxuXHR3YXJuOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLFxuXHRlcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZFxuKTogdm9pZCB7XG5cdGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcblx0XHRsb2dJbmZvID0gaW5mbztcblx0fVxuXHRpZiAod2FybiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bG9nV2FybmluZyA9IHdhcm47XG5cdH1cblx0aWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRsb2dFcnJvciA9IGVycm9yO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9hdXRoLXNoYXBlc1wiO1xuaW1wb3J0ICogYXMgYXV0aEltcGxlbWVudGF0aW9uIGZyb20gXCIuL2F1dGgtcHJvdmlkZXJcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhQcm92aWRlcjogQXV0aFByb3ZpZGVyID0gYXV0aEltcGxlbWVudGF0aW9uO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9