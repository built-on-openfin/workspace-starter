/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@openfin/snap-sdk/openfin.snap.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/@openfin/snap-sdk/openfin.snap.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnapServer: () => (/* binding */ r)
/* harmony export */ });
var e={343:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,s),i(n)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,s,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,r,{once:!0})}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var a=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,s,a,p;if(o(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),a=s[t]),void 0===a)a=s[t]=n,++e._eventsCount;else if("function"==typeof a?a=s[t]=i?[n,a]:[a,n]:i?a.unshift(n):a.push(n),(r=c(e))>0&&a.length>r&&!a.warned){a.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=a.length,p=l,console&&console.warn&&console.warn(p)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=l.bind(i);return r.listener=n,i.wrapFn=r,r}function u(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(s){i.once&&e.removeEventListener(t,r),n(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return c(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,s=this._events;if(void 0!==s)r=r&&void 0===s.error;else if(!r)return!1;if(r){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var o=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw o.context=a,o}var c=s[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var p=c.length,l=f(c,p);for(n=0;n<p;++n)i(l[n],this,t)}return!0},s.prototype.addListener=function(e,t){return p(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return p(this,e,t,!0)},s.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,i,r,s,a;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){a=n[s].listener,r=s;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(r=s[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},s.prototype.listeners=function(e){return u(this,e,!0)},s.prototype.rawListeners=function(e){return u(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},s.prototype.listenerCount=d,s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{n.d(i,{P:()=>t});var e=n(343);class t{constructor(t){if(this.server_id=t,this.emitter=new e.EventEmitter,!fin)throw new Error("OpenFin is not available")}async start(e){const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL");if(!e?.executablePath)try{await fin.System.getAppAssetInfo({alias:"openfin-snap"})}catch(e){throw new Error("The 'openfin-snap' asset must be defined in the manifest")}const n=await this.build_command_line(e);let i={alias:"openfin-snap",arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error("Failed to launch the Snap server")}return this.connect()}async connect(){this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",(async(e,t)=>{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:e.version,componentName:"snap-server"}})})),await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"0.1.0",componentName:"snap-client"}}),this.client.register("snap_updates",((e,t)=>this.handleSnapEvents(e,t)))}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e}}))}async prepareToApplySnapshot(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}))}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){e.snap&&await this.setLayout(e.snap)}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=(await t.getOptions()).customData||{};r.snapClientId?i=r.snapClientId:await t.updateOptions({customData:{...r,snapClientId:i}}),await this.registerWindow(i,n)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug ");const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}})();var r=i.P;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./client/src/provider.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/snap-sdk */ "./node_modules/@openfin/snap-sdk/openfin.snap.mjs");

const TEST_APP_WINDOW_ID = "snap-example-native-test-app-id";
// The DOM elements
let chkShowDebugWindow;
let btnStart;
let btnStop;
let btnNativeTestApp;
let selAttachPosition;
let btnAttachToWindow;
let btnDetachFromWindow;
let btnGetLayout;
let btnGetAttached;
let btnClearLog;
let serverStatus;
let logging;
let serverState = "stopped";
let isWindowOpen = false;
let isWindowAttached = false;
let server;
// Wait for the DOM to finish loading
window.addEventListener("DOMContentLoaded", async () => {
    // Platform has loaded so initialize the DOM
    await initializeDOM();
});
/**
 * Initialize the DOM elements.
 */
async function initializeDOM() {
    chkShowDebugWindow = document.querySelector("#chkShowDebugWindow");
    btnStart = document.querySelector("#btnStart");
    btnStop = document.querySelector("#btnStop");
    serverStatus = document.querySelector("#serverStatus");
    btnNativeTestApp = document.querySelector("#btnNativeTestApp");
    selAttachPosition = document.querySelector("#selAttachPosition");
    btnAttachToWindow = document.querySelector("#btnAttachToWindow");
    btnDetachFromWindow = document.querySelector("#btnDetachFromWindow");
    btnGetLayout = document.querySelector("#btnGetLayout");
    btnGetAttached = document.querySelector("#btnGetAttached");
    logging = document.querySelector("#logging");
    btnClearLog = document.querySelector("#btnClearLog");
    if (chkShowDebugWindow &&
        btnStart &&
        btnStop &&
        serverStatus &&
        btnNativeTestApp &&
        btnAttachToWindow &&
        btnDetachFromWindow &&
        btnGetLayout &&
        btnGetAttached &&
        btnClearLog) {
        btnStart.addEventListener("click", async () => {
            try {
                serverState = "starting";
                updateServerStatus();
                logInformation(`Starting Snap Server with Id ${fin.me.identity.uuid}`);
                server = new _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__.SnapServer(fin.me.identity.uuid);
                await server.start({ showDebug: chkShowDebugWindow?.checked });
                server.addEventListener("client-registered", (event) => {
                    logInformation(`Client Registered: ${JSON.stringify(event)}`);
                });
                server.addEventListener("client-unregistered", (event) => {
                    logInformation(`Client Unregistered: ${JSON.stringify(event)}`);
                    if (event.clientId === TEST_APP_WINDOW_ID) {
                        isWindowOpen = false;
                        isWindowAttached = false;
                        updateWindowStatus();
                    }
                });
                server.addEventListener("clients-attached", (event) => {
                    logInformation(`Clients Attached: ${JSON.stringify(event)}`);
                    if (event.attachedClientId === TEST_APP_WINDOW_ID) {
                        isWindowAttached = true;
                        updateWindowStatus();
                    }
                });
                server.addEventListener("client-detached", (event) => {
                    logInformation(`Client Detached: ${JSON.stringify(event)}`);
                    if (event.clientId === TEST_APP_WINDOW_ID) {
                        isWindowAttached = false;
                        updateWindowStatus();
                    }
                });
                server.addEventListener("client-activated", (event) => {
                    logInformation(`Client Activated: ${JSON.stringify(event)}`);
                });
                server.addEventListener("client-deactivated", (event) => {
                    logInformation(`Client Deactivated: ${JSON.stringify(event)}`);
                });
                server.addEventListener("move-size-completed", (event) => {
                    logInformation(`Move Size Completed: ${JSON.stringify(event)}`);
                });
                server.addEventListener("groups-changed", (event) => {
                    logInformation(`Groups Changed: ${JSON.stringify(event)}`);
                });
                logInformation("Started Snap Server");
                const win = fin.Window.getCurrentSync();
                const nativeId = await win.getNativeId();
                await server.registerWindow(fin.me.identity.uuid, nativeId);
                logInformation(`Registering Platform Window with Id ${fin.me.identity.uuid} and handle ${nativeId}`);
                serverState = "started";
            }
            catch (err) {
                logError(formatError(err));
            }
            finally {
                updateServerStatus();
            }
        });
        btnStop.addEventListener("click", async () => {
            try {
                serverState = "stopping";
                updateServerStatus();
                logInformation("Stopping Snap Server");
                if (server) {
                    await server.detachFromGroup(TEST_APP_WINDOW_ID);
                    await server.stop();
                }
                logInformation("Stopped Snap Server");
            }
            catch (err) {
                logError(formatError(err));
            }
            finally {
                server = undefined;
                serverState = "stopped";
                isWindowOpen = false;
                isWindowAttached = false;
                updateServerStatus();
            }
        });
        btnNativeTestApp.addEventListener("click", async () => {
            const runtimeInfo = await fin.System.getRuntimeInfo();
            const appAssetInfo = await fin.System.getAppAssetInfo({ alias: "snap-native-test-app" });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const localAppUrl = runtimeInfo.args["local-startup-url"].replace("config.json", "");
            await launchApp("Native Test App", TEST_APP_WINDOW_ID, `${localAppUrl}assets\\${appAssetInfo.alias}\\${appAssetInfo.version}\\${appAssetInfo.target}`, [], {
                type: "waitForWindowOfName",
                timeoutMs: 15000,
                matchRegex: "^Native Test App$"
            });
            isWindowOpen = true;
            isWindowAttached = false;
            updateWindowStatus();
        });
        btnAttachToWindow.addEventListener("click", async () => {
            if (server && selAttachPosition) {
                const value = selAttachPosition.value;
                await server.attachWindows(fin.me.identity.uuid, TEST_APP_WINDOW_ID, value, 0);
                isWindowAttached = true;
                updateWindowStatus();
            }
        });
        btnDetachFromWindow.addEventListener("click", async () => {
            if (server) {
                await server.detachFromGroup(TEST_APP_WINDOW_ID);
                isWindowAttached = false;
                updateWindowStatus();
            }
        });
        btnClearLog.addEventListener("click", () => {
            logClear();
        });
        btnGetLayout.addEventListener("click", async () => {
            if (server) {
                const layout = await server.getLayout();
                logInformation("Layout");
                logInformation(JSON.stringify(layout, undefined, "  "));
            }
        });
        btnGetAttached.addEventListener("click", async () => {
            if (server) {
                const attached = await server.getAttached(fin.me.identity.uuid);
                logInformation("Attached");
                logInformation(JSON.stringify(attached, undefined, "  "));
            }
        });
    }
    updateServerStatus();
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * Update the DOM elements with the state of the connection.
 */
function updateServerStatus() {
    if (chkShowDebugWindow &&
        btnStart &&
        btnStop &&
        serverStatus &&
        btnNativeTestApp &&
        btnAttachToWindow &&
        btnDetachFromWindow &&
        selAttachPosition &&
        btnGetLayout &&
        btnGetAttached) {
        if (serverState === "starting" || serverState === "stopping") {
            chkShowDebugWindow.disabled = true;
            btnStart.disabled = true;
            btnStop.disabled = true;
            btnGetLayout.disabled = true;
            btnGetAttached.disabled = true;
            serverStatus.textContent = `Snap Server is ${serverState}`;
        }
        else if (serverState === "started") {
            chkShowDebugWindow.disabled = true;
            btnStart.disabled = true;
            btnStop.disabled = false;
            btnGetLayout.disabled = false;
            btnGetAttached.disabled = false;
            serverStatus.textContent = "Snap Server is started";
        }
        else {
            chkShowDebugWindow.disabled = false;
            btnStart.disabled = false;
            btnStop.disabled = true;
            btnGetLayout.disabled = true;
            btnGetAttached.disabled = true;
            serverStatus.textContent = "Snap Server is stopped";
        }
    }
    updateWindowStatus();
}
/**
 * Update the UI based on the window state.
 */
function updateWindowStatus() {
    if (btnNativeTestApp && selAttachPosition && btnAttachToWindow && btnDetachFromWindow) {
        if (serverState === "starting" || serverState === "stopping") {
            btnNativeTestApp.disabled = true;
            selAttachPosition.disabled = true;
            btnAttachToWindow.disabled = true;
            btnDetachFromWindow.disabled = true;
        }
        else if (serverState === "started" && isWindowOpen) {
            btnNativeTestApp.disabled = true;
            selAttachPosition.disabled = isWindowAttached;
            btnAttachToWindow.disabled = isWindowAttached;
            btnDetachFromWindow.disabled = !isWindowAttached;
        }
        else {
            btnNativeTestApp.disabled = serverState === "stopped";
            selAttachPosition.disabled = true;
            btnAttachToWindow.disabled = true;
            btnDetachFromWindow.disabled = true;
        }
    }
}
/**
 * Send information to the log display.
 * @param information The information to send.
 */
function logInformation(information) {
    if (logging) {
        logging.textContent = `${logging.textContent}${information}\n\n`;
        logging.scrollTop = logging.scrollHeight;
    }
}
/**
 * Send error to the log display.
 * @param err The error to send.
 */
function logError(err) {
    if (logging) {
        logging.textContent = `${logging.textContent}ERROR: ${err}\n\n`;
        logging.scrollTop = logging.scrollHeight;
    }
}
/**
 * Clear the log display.
 */
function logClear() {
    if (logging) {
        logging.textContent = "";
        logging.scrollTop = 0;
    }
}
/**
 * Launch an application using Snap.
 * @param appName The name of the app that is being launched.
 * @param clientId An Id to associate with the launched app.
 * @param path The path to the app to launch.
 * @param args Additional command line arguments for the launch.
 * @param strategy The strategy to launch the window with.
 */
async function launchApp(appName, clientId, path, args, strategy) {
    try {
        if (server) {
            logInformation(`Launching ${appName}`);
            const launchResult = await server.launch({
                path,
                clientId,
                args,
                strategy
            });
            if (launchResult?.process_id) {
                logInformation(`${appName} launched with process id ${launchResult.process_id}`);
            }
        }
    }
    catch (err) {
        logError(formatError(err));
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDekM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFFBQVE7SUFDaEIsSUFBSSxPQUFPLEVBQUU7UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUN0QjtBQUNGLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLFNBQVMsQ0FDdkIsT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQVksRUFDWixJQUFjLEVBQ2QsUUFBNkI7SUFFN0IsSUFBSTtRQUNILElBQUksTUFBTSxFQUFFO1lBQ1gsY0FBYyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUk7Z0JBQ0osUUFBUTtnQkFDUixJQUFJO2dCQUNKLFFBQVE7YUFDUixDQUFDLENBQUM7WUFFSCxJQUFJLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxHQUFHLE9BQU8sNkJBQTZCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0Q7S0FDRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3NuYXAtc2RrL29wZW5maW4uc25hcC5tanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy8uL2NsaWVudC9zcmMvcHJvdmlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGU9ezM0MzplPT57dmFyIHQsbj1cIm9iamVjdFwiPT10eXBlb2YgUmVmbGVjdD9SZWZsZWN0Om51bGwsaT1uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLmFwcGx5P24uYXBwbHk6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChlLHQsbil9O3Q9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5vd25LZXlzP24ub3duS2V5czpPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzP2Z1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKSl9OmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKX07dmFyIHI9TnVtYmVyLmlzTmFOfHxmdW5jdGlvbihlKXtyZXR1cm4gZSE9ZX07ZnVuY3Rpb24gcygpe3MuaW5pdC5jYWxsKHRoaXMpfWUuZXhwb3J0cz1zLGUuZXhwb3J0cy5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBQcm9taXNlKChmdW5jdGlvbihuLGkpe2Z1bmN0aW9uIHIobil7ZS5yZW1vdmVMaXN0ZW5lcih0LHMpLGkobil9ZnVuY3Rpb24gcygpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVtb3ZlTGlzdGVuZXImJmUucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLHIpLG4oW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX12KGUsdCxzLHtvbmNlOiEwfSksXCJlcnJvclwiIT09dCYmZnVuY3Rpb24oZSx0LG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJnYoZSxcImVycm9yXCIsdCxuKX0oZSxyLHtvbmNlOiEwfSl9KSl9LHMuRXZlbnRFbWl0dGVyPXMscy5wcm90b3R5cGUuX2V2ZW50cz12b2lkIDAscy5wcm90b3R5cGUuX2V2ZW50c0NvdW50PTAscy5wcm90b3R5cGUuX21heExpc3RlbmVycz12b2lkIDA7dmFyIGE9MTA7ZnVuY3Rpb24gbyhlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpfWZ1bmN0aW9uIGMoZSl7cmV0dXJuIHZvaWQgMD09PWUuX21heExpc3RlbmVycz9zLmRlZmF1bHRNYXhMaXN0ZW5lcnM6ZS5fbWF4TGlzdGVuZXJzfWZ1bmN0aW9uIHAoZSx0LG4saSl7dmFyIHIscyxhLHA7aWYobyhuKSx2b2lkIDA9PT0ocz1lLl9ldmVudHMpPyhzPWUuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLGUuX2V2ZW50c0NvdW50PTApOih2b2lkIDAhPT1zLm5ld0xpc3RlbmVyJiYoZS5lbWl0KFwibmV3TGlzdGVuZXJcIix0LG4ubGlzdGVuZXI/bi5saXN0ZW5lcjpuKSxzPWUuX2V2ZW50cyksYT1zW3RdKSx2b2lkIDA9PT1hKWE9c1t0XT1uLCsrZS5fZXZlbnRzQ291bnQ7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2E9c1t0XT1pP1tuLGFdOlthLG5dOmk/YS51bnNoaWZ0KG4pOmEucHVzaChuKSwocj1jKGUpKT4wJiZhLmxlbmd0aD5yJiYhYS53YXJuZWQpe2Eud2FybmVkPSEwO3ZhciBsPW5ldyBFcnJvcihcIlBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gXCIrYS5sZW5ndGgrXCIgXCIrU3RyaW5nKHQpK1wiIGxpc3RlbmVycyBhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXRcIik7bC5uYW1lPVwiTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nXCIsbC5lbWl0dGVyPWUsbC50eXBlPXQsbC5jb3VudD1hLmxlbmd0aCxwPWwsY29uc29sZSYmY29uc29sZS53YXJuJiZjb25zb2xlLndhcm4ocCl9cmV0dXJuIGV9ZnVuY3Rpb24gbCgpe2lmKCF0aGlzLmZpcmVkKXJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsdGhpcy53cmFwRm4pLHRoaXMuZmlyZWQ9ITAsMD09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTp0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LGFyZ3VtZW50cyl9ZnVuY3Rpb24gaChlLHQsbil7dmFyIGk9e2ZpcmVkOiExLHdyYXBGbjp2b2lkIDAsdGFyZ2V0OmUsdHlwZTp0LGxpc3RlbmVyOm59LHI9bC5iaW5kKGkpO3JldHVybiByLmxpc3RlbmVyPW4saS53cmFwRm49cixyfWZ1bmN0aW9uIHUoZSx0LG4pe3ZhciBpPWUuX2V2ZW50cztpZih2b2lkIDA9PT1pKXJldHVybltdO3ZhciByPWlbdF07cmV0dXJuIHZvaWQgMD09PXI/W106XCJmdW5jdGlvblwiPT10eXBlb2Ygcj9uP1tyLmxpc3RlbmVyfHxyXTpbcl06bj9mdW5jdGlvbihlKXtmb3IodmFyIHQ9bmV3IEFycmF5KGUubGVuZ3RoKSxuPTA7bjx0Lmxlbmd0aDsrK24pdFtuXT1lW25dLmxpc3RlbmVyfHxlW25dO3JldHVybiB0fShyKTpmKHIsci5sZW5ndGgpfWZ1bmN0aW9uIGQoZSl7dmFyIHQ9dGhpcy5fZXZlbnRzO2lmKHZvaWQgMCE9PXQpe3ZhciBuPXRbZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbilyZXR1cm4gMTtpZih2b2lkIDAhPT1uKXJldHVybiBuLmxlbmd0aH1yZXR1cm4gMH1mdW5jdGlvbiBmKGUsdCl7Zm9yKHZhciBuPW5ldyBBcnJheSh0KSxpPTA7aTx0OysraSluW2ldPWVbaV07cmV0dXJuIG59ZnVuY3Rpb24gdihlLHQsbixpKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uKWkub25jZT9lLm9uY2UodCxuKTplLm9uKHQsbik7ZWxzZXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlLmFkZEV2ZW50TGlzdGVuZXIpdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyt0eXBlb2YgZSk7ZS5hZGRFdmVudExpc3RlbmVyKHQsKGZ1bmN0aW9uIHIocyl7aS5vbmNlJiZlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxyKSxuKHMpfSkpfX1PYmplY3QuZGVmaW5lUHJvcGVydHkocyxcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYX0sc2V0OmZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fHIoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO2E9ZX19KSxzLmluaXQ9ZnVuY3Rpb24oKXt2b2lkIDAhPT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCksdGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dm9pZCAwfSxzLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8cihlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7cmV0dXJuIHRoaXMuX21heExpc3RlbmVycz1lLHRoaXN9LHMucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiBjKHRoaXMpfSxzLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl0LnB1c2goYXJndW1lbnRzW25dKTt2YXIgcj1cImVycm9yXCI9PT1lLHM9dGhpcy5fZXZlbnRzO2lmKHZvaWQgMCE9PXMpcj1yJiZ2b2lkIDA9PT1zLmVycm9yO2Vsc2UgaWYoIXIpcmV0dXJuITE7aWYocil7dmFyIGE7aWYodC5sZW5ndGg+MCYmKGE9dFswXSksYSBpbnN0YW5jZW9mIEVycm9yKXRocm93IGE7dmFyIG89bmV3IEVycm9yKFwiVW5oYW5kbGVkIGVycm9yLlwiKyhhP1wiIChcIithLm1lc3NhZ2UrXCIpXCI6XCJcIikpO3Rocm93IG8uY29udGV4dD1hLG99dmFyIGM9c1tlXTtpZih2b2lkIDA9PT1jKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGMpaShjLHRoaXMsdCk7ZWxzZXt2YXIgcD1jLmxlbmd0aCxsPWYoYyxwKTtmb3Iobj0wO248cDsrK24paShsW25dLHRoaXMsdCl9cmV0dXJuITB9LHMucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHAodGhpcyxlLHQsITEpfSxzLnByb3RvdHlwZS5vbj1zLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixzLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcCh0aGlzLGUsdCwhMCl9LHMucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLm9uKGUsaCh0aGlzLGUsdCkpLHRoaXN9LHMucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLnByZXBlbmRMaXN0ZW5lcihlLGgodGhpcyxlLHQpKSx0aGlzfSxzLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3ZhciBuLGkscixzLGE7aWYobyh0KSx2b2lkIDA9PT0oaT10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PShuPWlbZV0pKXJldHVybiB0aGlzO2lmKG49PT10fHxuLmxpc3RlbmVyPT09dCkwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOihkZWxldGUgaVtlXSxpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsbi5saXN0ZW5lcnx8dCkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil7Zm9yKHI9LTEscz1uLmxlbmd0aC0xO3M+PTA7cy0tKWlmKG5bc109PT10fHxuW3NdLmxpc3RlbmVyPT09dCl7YT1uW3NdLmxpc3RlbmVyLHI9czticmVha31pZihyPDApcmV0dXJuIHRoaXM7MD09PXI/bi5zaGlmdCgpOmZ1bmN0aW9uKGUsdCl7Zm9yKDt0KzE8ZS5sZW5ndGg7dCsrKWVbdF09ZVt0KzFdO2UucG9wKCl9KG4sciksMT09PW4ubGVuZ3RoJiYoaVtlXT1uWzBdKSx2b2lkIDAhPT1pLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsYXx8dCl9cmV0dXJuIHRoaXN9LHMucHJvdG90eXBlLm9mZj1zLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcixzLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQsbixpO2lmKHZvaWQgMD09PShuPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09bi5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApOnZvaWQgMCE9PW5bZV0mJigwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOmRlbGV0ZSBuW2VdKSx0aGlzO2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXt2YXIgcixzPU9iamVjdC5rZXlzKG4pO2ZvcihpPTA7aTxzLmxlbmd0aDsrK2kpXCJyZW1vdmVMaXN0ZW5lclwiIT09KHI9c1tpXSkmJnRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKHIpO3JldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpLHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTAsdGhpc31pZihcImZ1bmN0aW9uXCI9PXR5cGVvZih0PW5bZV0pKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0KTtlbHNlIGlmKHZvaWQgMCE9PXQpZm9yKGk9dC5sZW5ndGgtMTtpPj0wO2ktLSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdFtpXSk7cmV0dXJuIHRoaXN9LHMucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbihlKXtyZXR1cm4gdSh0aGlzLGUsITApfSxzLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHUodGhpcyxlLCExKX0scy5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGUsdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS5saXN0ZW5lckNvdW50P2UubGlzdGVuZXJDb3VudCh0KTpkLmNhbGwoZSx0KX0scy5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1kLHMucHJvdG90eXBlLmV2ZW50TmFtZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQ+MD90KHRoaXMuX2V2ZW50cyk6W119fX0sdD17fTtmdW5jdGlvbiBuKGkpe3ZhciByPXRbaV07aWYodm9pZCAwIT09cilyZXR1cm4gci5leHBvcnRzO3ZhciBzPXRbaV09e2V4cG9ydHM6e319O3JldHVybiBlW2ldKHMscy5leHBvcnRzLG4pLHMuZXhwb3J0c31uLmQ9KGUsdCk9Pntmb3IodmFyIGkgaW4gdCluLm8odCxpKSYmIW4ubyhlLGkpJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxpLHtlbnVtZXJhYmxlOiEwLGdldDp0W2ldfSl9LG4ubz0oZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCk7dmFyIGk9e307KCgpPT57bi5kKGkse1A6KCk9PnR9KTt2YXIgZT1uKDM0Myk7Y2xhc3MgdHtjb25zdHJ1Y3Rvcih0KXtpZih0aGlzLnNlcnZlcl9pZD10LHRoaXMuZW1pdHRlcj1uZXcgZS5FdmVudEVtaXR0ZXIsIWZpbil0aHJvdyBuZXcgRXJyb3IoXCJPcGVuRmluIGlzIG5vdCBhdmFpbGFibGVcIil9YXN5bmMgc3RhcnQoZSl7Y29uc3QgdD1hd2FpdCBmaW4uU3lzdGVtLnF1ZXJ5UGVybWlzc2lvbkZvckN1cnJlbnRDb250ZXh0KFwiU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzc1wiKTtpZighdC5ncmFudGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyXCIpO2lmKGU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uZXhlY3V0YWJsZXM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyIGZyb20gYW4gZXhlY3V0YWJsZSBwYXRoXCIpO2lmKCFlPy5leGVjdXRhYmxlUGF0aCYmIXQucmF3VmFsdWU/LmFzc2V0cz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhIFVSTFwiKTtpZighZT8uZXhlY3V0YWJsZVBhdGgpdHJ5e2F3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHthbGlhczpcIm9wZW5maW4tc25hcFwifSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKFwiVGhlICdvcGVuZmluLXNuYXAnIGFzc2V0IG11c3QgYmUgZGVmaW5lZCBpbiB0aGUgbWFuaWZlc3RcIil9Y29uc3Qgbj1hd2FpdCB0aGlzLmJ1aWxkX2NvbW1hbmRfbGluZShlKTtsZXQgaT17YWxpYXM6XCJvcGVuZmluLXNuYXBcIixhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifTtlPy5leGVjdXRhYmxlUGF0aCYmKGk9e3BhdGg6ZS5leGVjdXRhYmxlUGF0aCxhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifSk7dHJ5e3RoaXMuc25hcF9pZGVudGl0eT1hd2FpdCBmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcyhpKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlclwiKX1yZXR1cm4gdGhpcy5jb25uZWN0KCl9YXN5bmMgY29ubmVjdCgpe3RoaXMuY2xpZW50PWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChgc25hcC1zZXJ2ZXItY29yZS0ke3RoaXMuc2VydmVyX2lkfWApLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF9oYW5kc2hha2VcIiwoYXN5bmMoZSx0KT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246ZS52ZXJzaW9uLGNvbXBvbmVudE5hbWU6XCJzbmFwLXNlcnZlclwifX0pfSkpLGF3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246XCIwLjEuMFwiLGNvbXBvbmVudE5hbWU6XCJzbmFwLWNsaWVudFwifX0pLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF91cGRhdGVzXCIsKChlLHQpPT50aGlzLmhhbmRsZVNuYXBFdmVudHMoZSx0KSkpfWFzeW5jIHN0b3AoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2NvbnN0IGU9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNlcmlhbGlzZUxheW91dFwifSkpO3JldHVybiBlPy5wYXlsb2FkLmxheW91dH1hc3luYyBzZXRMYXlvdXQoZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXNlcmlhbGlzZUxheW91dFwiLHBheWxvYWQ6e2xheW91dDplfX0pKX1hc3luYyBwcmVwYXJlVG9BcHBseVNuYXBzaG90KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpfWFzeW5jIGRlY29yYXRlU25hcHNob3QoZSl7cmV0dXJuey4uLmUsc25hcDphd2FpdCB0aGlzLmdldExheW91dCgpfX1hc3luYyBhcHBseVNuYXBzaG90KGUpe2Uuc25hcCYmYXdhaXQgdGhpcy5zZXRMYXlvdXQoZS5zbmFwKX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gU25hcCBzZXJ2ZXJcIik7Y29uc3QgdD17YWN0aW9uOlwic3RhcnRQcm9jZXNzXCIscGF5bG9hZDp7Li4uZSxhcmdzOmUuYXJnc3x8W119fTtpZihlLnN0cmF0ZWd5KXtjb25zdHt0eXBlOm4sLi4uaX09ZS5zdHJhdGVneTt0LnBheWxvYWQuc3RyYXRlZ3k9e3R5cGU6bixwYXJhbWV0ZXJzOnsuLi5pfX19Y29uc3Qgbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix0KSk7aWYobj8ucGF5bG9hZD8uc3VjY2VzcylyZXR1cm57cHJvY2Vzc19pZDpuLnBheWxvYWQucHJvY2Vzc19pZH07dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbGF1bmNoIHByb2Nlc3M6ICR7bj8ucGF5bG9hZD8uZXJyb3J9YCl9YXN5bmMgcmVnaXN0ZXJXaW5kb3coZSx0KXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dH19KSl9YXN5bmMgZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpe2NvbnN0IGU9ZT0+dGhpcy5oYW5kbGVOZXdXaW5kb3coZSk7cmV0dXJuIGF3YWl0IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpLmFkZExpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKSxhc3luYygpPT57YXdhaXQgZmluLlN5c3RlbS5yZW1vdmVMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSl9fWFzeW5jIGF0dGFjaFdpbmRvd3MoZSx0LG4saSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImF0dGFjaFwiLHBheWxvYWQ6e3RhcmdldENsaWVudElkOmUsdG9BdHRhY2hDbGllbnRJZDp0LHRhcmdldFNpZGU6bixvZmZzZXQ6aX19KSl9YXN5bmMgZGV0YWNoRnJvbUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXRhY2hGcm9tR3JvdXBcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKX1hc3luYyBnZXRBdHRhY2hlZChlKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEF0dGFjaGVkSW5zdGFuY2VzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuYXR0YWNoZWR9YXN5bmMgaGFzQXR0YWNobWVudHMoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJoYXNBdHRhY2htZW50c1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmhhc0F0dGFjaG1lbnRzfWFkZEV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub24oZSx0KX1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9mZihlLHQpfW9uY2UoZSx0KXt0aGlzLmVtaXR0ZXIub25jZShlLHQpfWFzeW5jIGhhbmRsZU5ld1dpbmRvdyhlKXtjb25zdCB0PWF3YWl0IGZpbi5XaW5kb3cud3JhcCh7dXVpZDplLnV1aWQsbmFtZTplLm5hbWV9KSxuPWF3YWl0IHQuZ2V0TmF0aXZlSWQoKTtsZXQgaT10LmlkZW50aXR5Lm5hbWU7Y29uc3Qgcj0oYXdhaXQgdC5nZXRPcHRpb25zKCkpLmN1c3RvbURhdGF8fHt9O3Iuc25hcENsaWVudElkP2k9ci5zbmFwQ2xpZW50SWQ6YXdhaXQgdC51cGRhdGVPcHRpb25zKHtjdXN0b21EYXRhOnsuLi5yLHNuYXBDbGllbnRJZDppfX0pLGF3YWl0IHRoaXMucmVnaXN0ZXJXaW5kb3coaSxuKX1lbWl0X2V2ZW50KGUsLi4udCl7dGhpcy5lbWl0dGVyLmVtaXQoZSwuLi50KX1oYW5kbGVTbmFwRXZlbnRzKGUsdCl7c3dpdGNoKHRoaXMuZW1pdF9ldmVudChcImFsbC1ldmVudHNcIix7dHlwZTplLmFjdGlvbixwYXlsb2FkOmUucGF5bG9hZH0pLGUuYWN0aW9uKXtjYXNlXCJjbGllbnRSZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXJlZ2lzdGVyZWRcIix7Y2xpZW50SWQ6ZS5wYXlsb2FkLmNsaWVudElkLHdpbmRvd0hhbmRsZTpgIyR7ZS5wYXlsb2FkLndpbmRvd0hhbmRsZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gLG93bmluZ1Byb2Nlc3NJZDplLnBheWxvYWQub3duaW5nUHJvY2Vzc0lkfSk7YnJlYWs7Y2FzZVwiY2xpZW50VW5SZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJtb3ZlU2l6ZUNvbXBsZXRlZFwiOnRoaXMuZW1pdF9ldmVudChcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50c0F0dGFjaGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50cy1hdHRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZXRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZXRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJncm91cHNDaGFuZ2VkXCI6dGhpcy5lbWl0X2V2ZW50KFwiZ3JvdXBzLWNoYW5nZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50QWN0aXZhdGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZWFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KX19YXN5bmMgYnVpbGRfY29tbWFuZF9saW5lKGUpe2xldCB0PWAtLWlkICR7dGhpcy5zZXJ2ZXJfaWR9IGA7ZT8uc2hvd0RlYnVnJiYodCs9XCIgLS1zaG93LWRlYnVnIFwiKTtjb25zdCBuPWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtyZXR1cm4gdCs9YC0tcnVudGltZS1wb3J0ICR7bi5wb3J0fSBgLHQrPWAtLXJ1bnRpbWUtdmVyc2lvbiAke24udmVyc2lvbn0gYCx0LnRyaW0oKX19fSkoKTt2YXIgcj1pLlA7ZXhwb3J0e3IgYXMgU25hcFNlcnZlcn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBTbmFwIGZyb20gXCJAb3BlbmZpbi9zbmFwLXNka1wiO1xuXG5jb25zdCBURVNUX0FQUF9XSU5ET1dfSUQgPSBcInNuYXAtZXhhbXBsZS1uYXRpdmUtdGVzdC1hcHAtaWRcIjtcblxuLy8gVGhlIERPTSBlbGVtZW50c1xubGV0IGNoa1Nob3dEZWJ1Z1dpbmRvdzogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU3RhcnQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdG9wOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuTmF0aXZlVGVzdEFwcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IHNlbEF0dGFjaFBvc2l0aW9uOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQXR0YWNoVG9XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5EZXRhY2hGcm9tV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0TGF5b3V0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0QXR0YWNoZWQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5DbGVhckxvZzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IHNlcnZlclN0YXR1czogSFRNTFBhcmFncmFwaEVsZW1lbnQgfCBudWxsO1xubGV0IGxvZ2dpbmc6IEhUTUxQcmVFbGVtZW50IHwgbnVsbDtcblxubGV0IHNlcnZlclN0YXRlOiBcInN0YXJ0aW5nXCIgfCBcInN0YXJ0ZWRcIiB8IFwic3RvcHBpbmdcIiB8IFwic3RvcHBlZFwiID0gXCJzdG9wcGVkXCI7XG5sZXQgaXNXaW5kb3dPcGVuID0gZmFsc2U7XG5sZXQgaXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xubGV0IHNlcnZlcjogU25hcC5TbmFwU2VydmVyIHwgdW5kZWZpbmVkO1xuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGZpbmlzaCBsb2FkaW5nXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBQbGF0Zm9ybSBoYXMgbG9hZGVkIHNvIGluaXRpYWxpemUgdGhlIERPTVxuXHRhd2FpdCBpbml0aWFsaXplRE9NKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVET00oKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNoa1Nob3dEZWJ1Z1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrU2hvd0RlYnVnV2luZG93XCIpO1xuXHRidG5TdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blN0YXJ0XCIpO1xuXHRidG5TdG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RvcFwiKTtcblx0c2VydmVyU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUGFyYWdyYXBoRWxlbWVudD4oXCIjc2VydmVyU3RhdHVzXCIpO1xuXHRidG5OYXRpdmVUZXN0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuTmF0aXZlVGVzdEFwcFwiKTtcblx0c2VsQXR0YWNoUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxBdHRhY2hQb3NpdGlvblwiKTtcblx0YnRuQXR0YWNoVG9XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5BdHRhY2hUb1dpbmRvd1wiKTtcblx0YnRuRGV0YWNoRnJvbVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRldGFjaEZyb21XaW5kb3dcIik7XG5cdGJ0bkdldExheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldExheW91dFwiKTtcblx0YnRuR2V0QXR0YWNoZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRBdHRhY2hlZFwiKTtcblx0bG9nZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFByZUVsZW1lbnQ+KFwiI2xvZ2dpbmdcIik7XG5cdGJ0bkNsZWFyTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ2xlYXJMb2dcIik7XG5cblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZCAmJlxuXHRcdGJ0bkNsZWFyTG9nXG5cdCkge1xuXHRcdGJ0blN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRpbmdcIjtcblx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIFNuYXAgU2VydmVyIHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH1gKTtcblx0XHRcdFx0c2VydmVyID0gbmV3IFNuYXAuU25hcFNlcnZlcihmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdGF3YWl0IHNlcnZlci5zdGFydCh7IHNob3dEZWJ1ZzogY2hrU2hvd0RlYnVnV2luZG93Py5jaGVja2VkIH0pO1xuXG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgUmVnaXN0ZXJlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC11bnJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFVuUmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBVbnJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50cy1hdHRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50c0F0dGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50cyBBdHRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0aWYgKGV2ZW50LmF0dGFjaGVkQ2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZXRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50RGV0YWNoZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgRGV0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1hY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudEFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBBY3RpdmF0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERlYWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERlYWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwibW92ZS1zaXplLWNvbXBsZXRlZFwiLCAoZXZlbnQ6IFNuYXAuTW92ZVNpemVDb21wbGV0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBNb3ZlIFNpemUgQ29tcGxldGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiZ3JvdXBzLWNoYW5nZWRcIiwgKGV2ZW50OiBTbmFwLkdyb3Vwc0NoYW5nZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBHcm91cHMgQ2hhbmdlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RhcnRlZCBTbmFwIFNlcnZlclwiKTtcblxuXHRcdFx0XHRjb25zdCB3aW4gPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRcdGNvbnN0IG5hdGl2ZUlkID0gYXdhaXQgd2luLmdldE5hdGl2ZUlkKCk7XG5cblx0XHRcdFx0YXdhaXQgc2VydmVyLnJlZ2lzdGVyV2luZG93KGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYXRpdmVJZCk7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBSZWdpc3RlcmluZyBQbGF0Zm9ybSBXaW5kb3cgd2l0aCBJZCAke2Zpbi5tZS5pZGVudGl0eS51dWlkfSBhbmQgaGFuZGxlICR7bmF0aXZlSWR9YCk7XG5cblx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0YXJ0ZWRcIjtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuU3RvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwaW5nXCI7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBpbmcgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLnN0b3AoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwZWQgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGVkXCI7XG5cdFx0XHRcdGlzV2luZG93T3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuTmF0aXZlVGVzdEFwcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgcnVudGltZUluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7XG5cdFx0XHRjb25zdCBhcHBBc3NldEluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7IGFsaWFzOiBcInNuYXAtbmF0aXZlLXRlc3QtYXBwXCIgfSk7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgbG9jYWxBcHBVcmwgPSAocnVudGltZUluZm8uYXJncyBhcyBhbnkpW1wibG9jYWwtc3RhcnR1cC11cmxcIl0ucmVwbGFjZShcImNvbmZpZy5qc29uXCIsIFwiXCIpO1xuXHRcdFx0YXdhaXQgbGF1bmNoQXBwKFxuXHRcdFx0XHRcIk5hdGl2ZSBUZXN0IEFwcFwiLFxuXHRcdFx0XHRURVNUX0FQUF9XSU5ET1dfSUQsXG5cdFx0XHRcdGAke2xvY2FsQXBwVXJsfWFzc2V0c1xcXFwke2FwcEFzc2V0SW5mby5hbGlhc31cXFxcJHthcHBBc3NldEluZm8udmVyc2lvbn1cXFxcJHthcHBBc3NldEluZm8udGFyZ2V0fWAsXG5cdFx0XHRcdFtdLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogXCJ3YWl0Rm9yV2luZG93T2ZOYW1lXCIsXG5cdFx0XHRcdFx0dGltZW91dE1zOiAxNTAwMCxcblx0XHRcdFx0XHRtYXRjaFJlZ2V4OiBcIl5OYXRpdmUgVGVzdCBBcHAkXCJcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGlzV2luZG93T3BlbiA9IHRydWU7XG5cdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHR9KTtcblxuXHRcdGJ0bkF0dGFjaFRvV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyICYmIHNlbEF0dGFjaFBvc2l0aW9uKSB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gc2VsQXR0YWNoUG9zaXRpb24udmFsdWU7XG5cdFx0XHRcdGF3YWl0IHNlcnZlci5hdHRhY2hXaW5kb3dzKGZpbi5tZS5pZGVudGl0eS51dWlkLCBURVNUX0FQUF9XSU5ET1dfSUQsIHZhbHVlIGFzIFNuYXAuQXR0YWNoU2lkZSwgMCk7XG5cdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuQ2xlYXJMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGxvZ0NsZWFyKCk7XG5cdFx0fSk7XG5cblx0XHRidG5HZXRMYXlvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0Y29uc3QgbGF5b3V0ID0gYXdhaXQgc2VydmVyLmdldExheW91dCgpO1xuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkxheW91dFwiKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkobGF5b3V0LCB1bmRlZmluZWQsIFwiICBcIikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuR2V0QXR0YWNoZWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0Y29uc3QgYXR0YWNoZWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0QXR0YWNoZWQoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkF0dGFjaGVkXCIpO1xuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShhdHRhY2hlZCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIERPTSBlbGVtZW50cyB3aXRoIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2VydmVyU3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdHNlbEF0dGFjaFBvc2l0aW9uICYmXG5cdFx0YnRuR2V0TGF5b3V0ICYmXG5cdFx0YnRuR2V0QXR0YWNoZWRcblx0KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IGBTbmFwIFNlcnZlciBpcyAke3NlcnZlclN0YXRlfWA7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIlNuYXAgU2VydmVyIGlzIHN0YXJ0ZWRcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0QXR0YWNoZWQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gXCJTbmFwIFNlcnZlciBpcyBzdG9wcGVkXCI7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIHdpbmRvdyBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlV2luZG93U3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoYnRuTmF0aXZlVGVzdEFwcCAmJiBzZWxBdHRhY2hQb3NpdGlvbiAmJiBidG5BdHRhY2hUb1dpbmRvdyAmJiBidG5EZXRhY2hGcm9tV2luZG93KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0ZWRcIiAmJiBpc1dpbmRvd09wZW4pIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSBpc1dpbmRvd0F0dGFjaGVkO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSBpc1dpbmRvd0F0dGFjaGVkO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9ICFpc1dpbmRvd0F0dGFjaGVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gc2VydmVyU3RhdGUgPT09IFwic3RvcHBlZFwiO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU2VuZCBpbmZvcm1hdGlvbiB0byB0aGUgbG9nIGRpc3BsYXkuXG4gKiBAcGFyYW0gaW5mb3JtYXRpb24gVGhlIGluZm9ybWF0aW9uIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGxvZ0luZm9ybWF0aW9uKGluZm9ybWF0aW9uOiBzdHJpbmcpOiB2b2lkIHtcblx0aWYgKGxvZ2dpbmcpIHtcblx0XHRsb2dnaW5nLnRleHRDb250ZW50ID0gYCR7bG9nZ2luZy50ZXh0Q29udGVudH0ke2luZm9ybWF0aW9ufVxcblxcbmA7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSBsb2dnaW5nLnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIFNlbmQgZXJyb3IgdG8gdGhlIGxvZyBkaXNwbGF5LlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gbG9nRXJyb3IoZXJyOiBzdHJpbmcpOiB2b2lkIHtcblx0aWYgKGxvZ2dpbmcpIHtcblx0XHRsb2dnaW5nLnRleHRDb250ZW50ID0gYCR7bG9nZ2luZy50ZXh0Q29udGVudH1FUlJPUjogJHtlcnJ9XFxuXFxuYDtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IGxvZ2dpbmcuc2Nyb2xsSGVpZ2h0O1xuXHR9XG59XG5cbi8qKlxuICogQ2xlYXIgdGhlIGxvZyBkaXNwbGF5LlxuICovXG5mdW5jdGlvbiBsb2dDbGVhcigpOiB2b2lkIHtcblx0aWYgKGxvZ2dpbmcpIHtcblx0XHRsb2dnaW5nLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBMYXVuY2ggYW4gYXBwbGljYXRpb24gdXNpbmcgU25hcC5cbiAqIEBwYXJhbSBhcHBOYW1lIFRoZSBuYW1lIG9mIHRoZSBhcHAgdGhhdCBpcyBiZWluZyBsYXVuY2hlZC5cbiAqIEBwYXJhbSBjbGllbnRJZCBBbiBJZCB0byBhc3NvY2lhdGUgd2l0aCB0aGUgbGF1bmNoZWQgYXBwLlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGhlIGFwcCB0byBsYXVuY2guXG4gKiBAcGFyYW0gYXJncyBBZGRpdGlvbmFsIGNvbW1hbmQgbGluZSBhcmd1bWVudHMgZm9yIHRoZSBsYXVuY2guXG4gKiBAcGFyYW0gc3RyYXRlZ3kgVGhlIHN0cmF0ZWd5IHRvIGxhdW5jaCB0aGUgd2luZG93IHdpdGguXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxhdW5jaEFwcChcblx0YXBwTmFtZTogc3RyaW5nLFxuXHRjbGllbnRJZDogc3RyaW5nLFxuXHRwYXRoOiBzdHJpbmcsXG5cdGFyZ3M6IHN0cmluZ1tdLFxuXHRzdHJhdGVneTogU25hcC5MYXVuY2hTdHJhdGVneVxuKTogUHJvbWlzZTx2b2lkPiB7XG5cdHRyeSB7XG5cdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oYExhdW5jaGluZyAke2FwcE5hbWV9YCk7XG5cdFx0XHRjb25zdCBsYXVuY2hSZXN1bHQgPSBhd2FpdCBzZXJ2ZXIubGF1bmNoKHtcblx0XHRcdFx0cGF0aCxcblx0XHRcdFx0Y2xpZW50SWQsXG5cdFx0XHRcdGFyZ3MsXG5cdFx0XHRcdHN0cmF0ZWd5XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGxhdW5jaFJlc3VsdD8ucHJvY2Vzc19pZCkge1xuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgJHthcHBOYW1lfSBsYXVuY2hlZCB3aXRoIHByb2Nlc3MgaWQgJHtsYXVuY2hSZXN1bHQucHJvY2Vzc19pZH1gKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=