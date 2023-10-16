/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/snap-sdk/openfin.snap.mjs":
/*!*************************************************************!*\
  !*** ../../node_modules/@openfin/snap-sdk/openfin.snap.mjs ***!
  \*************************************************************/
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
/* harmony import */ var _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/snap-sdk */ "../../node_modules/@openfin/snap-sdk/openfin.snap.mjs");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDekM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFFBQVE7SUFDaEIsSUFBSSxPQUFPLEVBQUU7UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUN0QjtBQUNGLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLFNBQVMsQ0FDdkIsT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQVksRUFDWixJQUFjLEVBQ2QsUUFBNkI7SUFFN0IsSUFBSTtRQUNILElBQUksTUFBTSxFQUFFO1lBQ1gsY0FBYyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUk7Z0JBQ0osUUFBUTtnQkFDUixJQUFJO2dCQUNKLFFBQVE7YUFDUixDQUFDLENBQUM7WUFFSCxJQUFJLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxHQUFHLE9BQU8sNkJBQTZCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0Q7S0FDRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi9zbmFwLXNkay9vcGVuZmluLnNuYXAubWpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi9jbGllbnQvc3JjL3Byb3ZpZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBlPXszNDM6ZT0+e3ZhciB0LG49XCJvYmplY3RcIj09dHlwZW9mIFJlZmxlY3Q/UmVmbGVjdDpudWxsLGk9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5hcHBseT9uLmFwcGx5OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoZSx0LG4pfTt0PW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4ub3duS2V5cz9uLm93bktleXM6T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz9mdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSkpfTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSl9O3ZhciByPU51bWJlci5pc05hTnx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUhPWV9O2Z1bmN0aW9uIHMoKXtzLmluaXQuY2FsbCh0aGlzKX1lLmV4cG9ydHM9cyxlLmV4cG9ydHMub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24obixpKXtmdW5jdGlvbiByKG4pe2UucmVtb3ZlTGlzdGVuZXIodCxzKSxpKG4pfWZ1bmN0aW9uIHMoKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnJlbW92ZUxpc3RlbmVyJiZlLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIixyKSxuKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9dihlLHQscyx7b25jZTohMH0pLFwiZXJyb3JcIiE9PXQmJmZ1bmN0aW9uKGUsdCxuKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uJiZ2KGUsXCJlcnJvclwiLHQsbil9KGUscix7b25jZTohMH0pfSkpfSxzLkV2ZW50RW1pdHRlcj1zLHMucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLHMucHJvdG90eXBlLl9ldmVudHNDb3VudD0wLHMucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwO3ZhciBhPTEwO2Z1bmN0aW9uIG8oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKX1mdW5jdGlvbiBjKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/cy5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBwKGUsdCxuLGkpe3ZhciByLHMsYSxwO2lmKG8obiksdm9pZCAwPT09KHM9ZS5fZXZlbnRzKT8ocz1lLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxlLl9ldmVudHNDb3VudD0wKToodm9pZCAwIT09cy5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxuLmxpc3RlbmVyP24ubGlzdGVuZXI6bikscz1lLl9ldmVudHMpLGE9c1t0XSksdm9pZCAwPT09YSlhPXNbdF09biwrK2UuX2V2ZW50c0NvdW50O2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYT9hPXNbdF09aT9bbixhXTpbYSxuXTppP2EudW5zaGlmdChuKTphLnB1c2gobiksKHI9YyhlKSk+MCYmYS5sZW5ndGg+ciYmIWEud2FybmVkKXthLndhcm5lZD0hMDt2YXIgbD1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK2EubGVuZ3RoK1wiIFwiK1N0cmluZyh0KStcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO2wubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLGwuZW1pdHRlcj1lLGwudHlwZT10LGwuY291bnQ9YS5sZW5ndGgscD1sLGNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKHApfXJldHVybiBlfWZ1bmN0aW9uIGwoKXtpZighdGhpcy5maXJlZClyZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLDA9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk6dGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCxhcmd1bWVudHMpfWZ1bmN0aW9uIGgoZSx0LG4pe3ZhciBpPXtmaXJlZDohMSx3cmFwRm46dm9pZCAwLHRhcmdldDplLHR5cGU6dCxsaXN0ZW5lcjpufSxyPWwuYmluZChpKTtyZXR1cm4gci5saXN0ZW5lcj1uLGkud3JhcEZuPXIscn1mdW5jdGlvbiB1KGUsdCxuKXt2YXIgaT1lLl9ldmVudHM7aWYodm9pZCAwPT09aSlyZXR1cm5bXTt2YXIgcj1pW3RdO3JldHVybiB2b2lkIDA9PT1yP1tdOlwiZnVuY3Rpb25cIj09dHlwZW9mIHI/bj9bci5saXN0ZW5lcnx8cl06W3JdOm4/ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCksbj0wO248dC5sZW5ndGg7KytuKXRbbl09ZVtuXS5saXN0ZW5lcnx8ZVtuXTtyZXR1cm4gdH0ocik6ZihyLHIubGVuZ3RoKX1mdW5jdGlvbiBkKGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT10KXt2YXIgbj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pcmV0dXJuIDE7aWYodm9pZCAwIT09bilyZXR1cm4gbi5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgbj1uZXcgQXJyYXkodCksaT0wO2k8dDsrK2kpbltpXT1lW2ldO3JldHVybiBufWZ1bmN0aW9uIHYoZSx0LG4saSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbilpLm9uY2U/ZS5vbmNlKHQsbik6ZS5vbih0LG4pO2Vsc2V7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO2UuYWRkRXZlbnRMaXN0ZW5lcih0LChmdW5jdGlvbiByKHMpe2kub25jZSYmZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsciksbihzKX0pKX19T2JqZWN0LmRlZmluZVByb3BlcnR5KHMsXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGF9LHNldDpmdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxyKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTthPWV9fSkscy5pbml0PWZ1bmN0aW9uKCl7dm9pZCAwIT09dGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHMhPT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApLHRoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHZvaWQgMH0scy5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fHIoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO3JldHVybiB0aGlzLl9tYXhMaXN0ZW5lcnM9ZSx0aGlzfSxzLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oKXtyZXR1cm4gYyh0aGlzKX0scy5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9W10sbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspdC5wdXNoKGFyZ3VtZW50c1tuXSk7dmFyIHI9XCJlcnJvclwiPT09ZSxzPXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT1zKXI9ciYmdm9pZCAwPT09cy5lcnJvcjtlbHNlIGlmKCFyKXJldHVybiExO2lmKHIpe3ZhciBhO2lmKHQubGVuZ3RoPjAmJihhPXRbMF0pLGEgaW5zdGFuY2VvZiBFcnJvcil0aHJvdyBhO3ZhciBvPW5ldyBFcnJvcihcIlVuaGFuZGxlZCBlcnJvci5cIisoYT9cIiAoXCIrYS5tZXNzYWdlK1wiKVwiOlwiXCIpKTt0aHJvdyBvLmNvbnRleHQ9YSxvfXZhciBjPXNbZV07aWYodm9pZCAwPT09YylyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjKWkoYyx0aGlzLHQpO2Vsc2V7dmFyIHA9Yy5sZW5ndGgsbD1mKGMscCk7Zm9yKG49MDtuPHA7KytuKWkobFtuXSx0aGlzLHQpfXJldHVybiEwfSxzLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBwKHRoaXMsZSx0LCExKX0scy5wcm90b3R5cGUub249cy5wcm90b3R5cGUuYWRkTGlzdGVuZXIscy5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHAodGhpcyxlLHQsITApfSxzLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odCksdGhpcy5vbihlLGgodGhpcyxlLHQpKSx0aGlzfSxzLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odCksdGhpcy5wcmVwZW5kTGlzdGVuZXIoZSxoKHRoaXMsZSx0KSksdGhpc30scy5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXt2YXIgbixpLHIscyxhO2lmKG8odCksdm9pZCAwPT09KGk9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZih2b2lkIDA9PT0obj1pW2VdKSlyZXR1cm4gdGhpcztpZihuPT09dHx8bi5saXN0ZW5lcj09PXQpMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG4ubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pe2ZvcihyPS0xLHM9bi5sZW5ndGgtMTtzPj0wO3MtLSlpZihuW3NdPT09dHx8bltzXS5saXN0ZW5lcj09PXQpe2E9bltzXS5saXN0ZW5lcixyPXM7YnJlYWt9aWYocjwwKXJldHVybiB0aGlzOzA9PT1yP24uc2hpZnQoKTpmdW5jdGlvbihlLHQpe2Zvcig7dCsxPGUubGVuZ3RoO3QrKyllW3RdPWVbdCsxXTtlLnBvcCgpfShuLHIpLDE9PT1uLmxlbmd0aCYmKGlbZV09blswXSksdm9pZCAwIT09aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLGF8fHQpfXJldHVybiB0aGlzfSxzLnByb3RvdHlwZS5vZmY9cy5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIscy5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LG4saTtpZih2b2lkIDA9PT0obj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PW4ucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKTp2b2lkIDAhPT1uW2VdJiYoMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTpkZWxldGUgbltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7dmFyIHIscz1PYmplY3Qua2V5cyhuKTtmb3IoaT0wO2k8cy5sZW5ndGg7KytpKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShyPXNbaV0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhyKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1uW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih2b2lkIDAhPT10KWZvcihpPXQubGVuZ3RoLTE7aT49MDtpLS0pdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbaV0pO3JldHVybiB0aGlzfSxzLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHUodGhpcyxlLCEwKX0scy5wcm90b3R5cGUucmF3TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiB1KHRoaXMsZSwhMSl9LHMubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6ZC5jYWxsKGUsdCl9LHMucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZCxzLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/dCh0aGlzLl9ldmVudHMpOltdfX19LHQ9e307ZnVuY3Rpb24gbihpKXt2YXIgcj10W2ldO2lmKHZvaWQgMCE9PXIpcmV0dXJuIHIuZXhwb3J0czt2YXIgcz10W2ldPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtpXShzLHMuZXhwb3J0cyxuKSxzLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBpIGluIHQpbi5vKHQsaSkmJiFuLm8oZSxpKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaSx7ZW51bWVyYWJsZTohMCxnZXQ6dFtpXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpO3ZhciBpPXt9OygoKT0+e24uZChpLHtQOigpPT50fSk7dmFyIGU9bigzNDMpO2NsYXNzIHR7Y29uc3RydWN0b3IodCl7aWYodGhpcy5zZXJ2ZXJfaWQ9dCx0aGlzLmVtaXR0ZXI9bmV3IGUuRXZlbnRFbWl0dGVyLCFmaW4pdGhyb3cgbmV3IEVycm9yKFwiT3BlbkZpbiBpcyBub3QgYXZhaWxhYmxlXCIpfWFzeW5jIHN0YXJ0KGUpe2NvbnN0IHQ9YXdhaXQgZmluLlN5c3RlbS5xdWVyeVBlcm1pc3Npb25Gb3JDdXJyZW50Q29udGV4dChcIlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3NcIik7aWYoIXQuZ3JhbnRlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlclwiKTtpZihlPy5leGVjdXRhYmxlUGF0aCYmIXQucmF3VmFsdWU/LmV4ZWN1dGFibGVzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciBmcm9tIGFuIGV4ZWN1dGFibGUgcGF0aFwiKTtpZighZT8uZXhlY3V0YWJsZVBhdGgmJiF0LnJhd1ZhbHVlPy5hc3NldHM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyIGZyb20gYSBVUkxcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoKXRyeXthd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6XCJvcGVuZmluLXNuYXBcIn0pfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihcIlRoZSAnb3BlbmZpbi1zbmFwJyBhc3NldCBtdXN0IGJlIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0XCIpfWNvbnN0IG49YXdhaXQgdGhpcy5idWlsZF9jb21tYW5kX2xpbmUoZSk7bGV0IGk9e2FsaWFzOlwib3BlbmZpbi1zbmFwXCIsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn07ZT8uZXhlY3V0YWJsZVBhdGgmJihpPXtwYXRoOmUuZXhlY3V0YWJsZVBhdGgsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn0pO3RyeXt0aGlzLnNuYXBfaWRlbnRpdHk9YXdhaXQgZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MoaSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXJcIil9cmV0dXJuIHRoaXMuY29ubmVjdCgpfWFzeW5jIGNvbm5lY3QoKXt0aGlzLmNsaWVudD1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoYHNuYXAtc2VydmVyLWNvcmUtJHt0aGlzLnNlcnZlcl9pZH1gKSx0aGlzLmNsaWVudC5yZWdpc3RlcihcInNuYXBfaGFuZHNoYWtlXCIsKGFzeW5jKGUsdCk9Pnthd2FpdCBmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJhZGFwdGVyLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOmUudmVyc2lvbixjb21wb25lbnROYW1lOlwic25hcC1zZXJ2ZXJcIn19KX0pKSxhd2FpdCBmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJhZGFwdGVyLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOlwiMC4xLjBcIixjb21wb25lbnROYW1lOlwic25hcC1jbGllbnRcIn19KSx0aGlzLmNsaWVudC5yZWdpc3RlcihcInNuYXBfdXBkYXRlc1wiLCgoZSx0KT0+dGhpcy5oYW5kbGVTbmFwRXZlbnRzKGUsdCkpKX1hc3luYyBzdG9wKCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJzaHV0ZG93blwifSkpfWFzeW5jIGdldExheW91dCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTtjb25zdCBlPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJzZXJpYWxpc2VMYXlvdXRcIn0pKTtyZXR1cm4gZT8ucGF5bG9hZC5sYXlvdXR9YXN5bmMgc2V0TGF5b3V0KGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGVzZXJpYWxpc2VMYXlvdXRcIixwYXlsb2FkOntsYXlvdXQ6ZX19KSl9YXN5bmMgcHJlcGFyZVRvQXBwbHlTbmFwc2hvdCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicmVzZXRBbGxcIn0pKX1hc3luYyBkZWNvcmF0ZVNuYXBzaG90KGUpe3JldHVybnsuLi5lLHNuYXA6YXdhaXQgdGhpcy5nZXRMYXlvdXQoKX19YXN5bmMgYXBwbHlTbmFwc2hvdChlKXtlLnNuYXAmJmF3YWl0IHRoaXMuc2V0TGF5b3V0KGUuc25hcCl9YXN5bmMgbGF1bmNoKGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJOb3QgY29ubmVjdGVkIHRvIGFuIFNuYXAgc2VydmVyXCIpO2NvbnN0IHQ9e2FjdGlvbjpcInN0YXJ0UHJvY2Vzc1wiLHBheWxvYWQ6ey4uLmUsYXJnczplLmFyZ3N8fFtdfX07aWYoZS5zdHJhdGVneSl7Y29uc3R7dHlwZTpuLC4uLml9PWUuc3RyYXRlZ3k7dC5wYXlsb2FkLnN0cmF0ZWd5PXt0eXBlOm4scGFyYW1ldGVyczp7Li4uaX19fWNvbnN0IG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIsdCkpO2lmKG4/LnBheWxvYWQ/LnN1Y2Nlc3MpcmV0dXJue3Byb2Nlc3NfaWQ6bi5wYXlsb2FkLnByb2Nlc3NfaWR9O3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxhdW5jaCBwcm9jZXNzOiAke24/LnBheWxvYWQ/LmVycm9yfWApfWFzeW5jIHJlZ2lzdGVyV2luZG93KGUsdCl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhvb2tBbmRSZWdpc3RlcldpbmRvd1wiLHBheWxvYWQ6e2NsaWVudElkOmUsd2luZG93SGFuZGxlOnR9fSkpfWFzeW5jIGVuYWJsZUF1dG9XaW5kb3dSZWdpc3RyYXRpb24oKXtjb25zdCBlPWU9PnRoaXMuaGFuZGxlTmV3V2luZG93KGUpO3JldHVybiBhd2FpdCBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKS5hZGRMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSksYXN5bmMoKT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVtb3ZlTGlzdGVuZXIoXCJ3aW5kb3ctY3JlYXRlZFwiLGUpfX1hc3luYyBhdHRhY2hXaW5kb3dzKGUsdCxuLGkpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJhdHRhY2hcIixwYXlsb2FkOnt0YXJnZXRDbGllbnRJZDplLHRvQXR0YWNoQ2xpZW50SWQ6dCx0YXJnZXRTaWRlOm4sb2Zmc2V0Oml9fSkpfWFzeW5jIGRldGFjaEZyb21Hcm91cChlKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGV0YWNoRnJvbUdyb3VwXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSl9YXN5bmMgZ2V0QXR0YWNoZWQoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRBdHRhY2hlZEluc3RhbmNlc1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmF0dGFjaGVkfWFzeW5jIGhhc0F0dGFjaG1lbnRzKGUpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaGFzQXR0YWNobWVudHNcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKSkucGF5bG9hZC5oYXNBdHRhY2htZW50c31hZGRFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9uKGUsdCl9cmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuZW1pdHRlci5vZmYoZSx0KX1vbmNlKGUsdCl7dGhpcy5lbWl0dGVyLm9uY2UoZSx0KX1hc3luYyBoYW5kbGVOZXdXaW5kb3coZSl7Y29uc3QgdD1hd2FpdCBmaW4uV2luZG93LndyYXAoe3V1aWQ6ZS51dWlkLG5hbWU6ZS5uYW1lfSksbj1hd2FpdCB0LmdldE5hdGl2ZUlkKCk7bGV0IGk9dC5pZGVudGl0eS5uYW1lO2NvbnN0IHI9KGF3YWl0IHQuZ2V0T3B0aW9ucygpKS5jdXN0b21EYXRhfHx7fTtyLnNuYXBDbGllbnRJZD9pPXIuc25hcENsaWVudElkOmF3YWl0IHQudXBkYXRlT3B0aW9ucyh7Y3VzdG9tRGF0YTp7Li4ucixzbmFwQ2xpZW50SWQ6aX19KSxhd2FpdCB0aGlzLnJlZ2lzdGVyV2luZG93KGksbil9ZW1pdF9ldmVudChlLC4uLnQpe3RoaXMuZW1pdHRlci5lbWl0KGUsLi4udCl9aGFuZGxlU25hcEV2ZW50cyhlLHQpe3N3aXRjaCh0aGlzLmVtaXRfZXZlbnQoXCJhbGwtZXZlbnRzXCIse3R5cGU6ZS5hY3Rpb24scGF5bG9hZDplLnBheWxvYWR9KSxlLmFjdGlvbil7Y2FzZVwiY2xpZW50UmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1yZWdpc3RlcmVkXCIse2NsaWVudElkOmUucGF5bG9hZC5jbGllbnRJZCx3aW5kb3dIYW5kbGU6YCMke2UucGF5bG9hZC53aW5kb3dIYW5kbGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCxvd25pbmdQcm9jZXNzSWQ6ZS5wYXlsb2FkLm93bmluZ1Byb2Nlc3NJZH0pO2JyZWFrO2Nhc2VcImNsaWVudFVuUmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC11bnJlZ2lzdGVyZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwibW92ZVNpemVDb21wbGV0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudHNBdHRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudHMtYXR0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGV0YWNoZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGV0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiZ3JvdXBzQ2hhbmdlZFwiOnRoaXMuZW1pdF9ldmVudChcImdyb3Vwcy1jaGFuZ2VkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudEFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1hY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGVhY3RpdmF0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSl9fWFzeW5jIGJ1aWxkX2NvbW1hbmRfbGluZShlKXtsZXQgdD1gLS1pZCAke3RoaXMuc2VydmVyX2lkfSBgO2U/LnNob3dEZWJ1ZyYmKHQrPVwiIC0tc2hvdy1kZWJ1ZyBcIik7Y29uc3Qgbj1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7cmV0dXJuIHQrPWAtLXJ1bnRpbWUtcG9ydCAke24ucG9ydH0gYCx0Kz1gLS1ydW50aW1lLXZlcnNpb24gJHtuLnZlcnNpb259IGAsdC50cmltKCl9fX0pKCk7dmFyIHI9aS5QO2V4cG9ydHtyIGFzIFNuYXBTZXJ2ZXJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgU25hcCBmcm9tIFwiQG9wZW5maW4vc25hcC1zZGtcIjtcblxuY29uc3QgVEVTVF9BUFBfV0lORE9XX0lEID0gXCJzbmFwLWV4YW1wbGUtbmF0aXZlLXRlc3QtYXBwLWlkXCI7XG5cbi8vIFRoZSBET00gZWxlbWVudHNcbmxldCBjaGtTaG93RGVidWdXaW5kb3c6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blN0YXJ0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU3RvcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bk5hdGl2ZVRlc3RBcHA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBzZWxBdHRhY2hQb3NpdGlvbjogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkF0dGFjaFRvV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuRGV0YWNoRnJvbVdpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldExheW91dDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldEF0dGFjaGVkOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQ2xlYXJMb2c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBzZXJ2ZXJTdGF0dXM6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dnaW5nOiBIVE1MUHJlRWxlbWVudCB8IG51bGw7XG5cbmxldCBzZXJ2ZXJTdGF0ZTogXCJzdGFydGluZ1wiIHwgXCJzdGFydGVkXCIgfCBcInN0b3BwaW5nXCIgfCBcInN0b3BwZWRcIiA9IFwic3RvcHBlZFwiO1xubGV0IGlzV2luZG93T3BlbiA9IGZhbHNlO1xubGV0IGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcbmxldCBzZXJ2ZXI6IFNuYXAuU25hcFNlcnZlciB8IHVuZGVmaW5lZDtcblxuLy8gV2FpdCBmb3IgdGhlIERPTSB0byBmaW5pc2ggbG9hZGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0Ly8gUGxhdGZvcm0gaGFzIGxvYWRlZCBzbyBpbml0aWFsaXplIHRoZSBET01cblx0YXdhaXQgaW5pdGlhbGl6ZURPTSgpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgRE9NIGVsZW1lbnRzLlxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplRE9NKCk6IFByb21pc2U8dm9pZD4ge1xuXHRjaGtTaG93RGVidWdXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa1Nob3dEZWJ1Z1dpbmRvd1wiKTtcblx0YnRuU3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdGFydFwiKTtcblx0YnRuU3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blN0b3BcIik7XG5cdHNlcnZlclN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFBhcmFncmFwaEVsZW1lbnQ+KFwiI3NlcnZlclN0YXR1c1wiKTtcblx0YnRuTmF0aXZlVGVzdEFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bk5hdGl2ZVRlc3RBcHBcIik7XG5cdHNlbEF0dGFjaFBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsQXR0YWNoUG9zaXRpb25cIik7XG5cdGJ0bkF0dGFjaFRvV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQXR0YWNoVG9XaW5kb3dcIik7XG5cdGJ0bkRldGFjaEZyb21XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5EZXRhY2hGcm9tV2luZG93XCIpO1xuXHRidG5HZXRMYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRMYXlvdXRcIik7XG5cdGJ0bkdldEF0dGFjaGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0QXR0YWNoZWRcIik7XG5cdGxvZ2dpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dnaW5nXCIpO1xuXHRidG5DbGVhckxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNsZWFyTG9nXCIpO1xuXG5cdGlmIChcblx0XHRjaGtTaG93RGVidWdXaW5kb3cgJiZcblx0XHRidG5TdGFydCAmJlxuXHRcdGJ0blN0b3AgJiZcblx0XHRzZXJ2ZXJTdGF0dXMgJiZcblx0XHRidG5OYXRpdmVUZXN0QXBwICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0YnRuR2V0TGF5b3V0ICYmXG5cdFx0YnRuR2V0QXR0YWNoZWQgJiZcblx0XHRidG5DbGVhckxvZ1xuXHQpIHtcblx0XHRidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0YXJ0aW5nXCI7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBTdGFydGluZyBTbmFwIFNlcnZlciB3aXRoIElkICR7ZmluLm1lLmlkZW50aXR5LnV1aWR9YCk7XG5cdFx0XHRcdHNlcnZlciA9IG5ldyBTbmFwLlNuYXBTZXJ2ZXIoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RhcnQoeyBzaG93RGVidWc6IGNoa1Nob3dEZWJ1Z1dpbmRvdz8uY2hlY2tlZCB9KTtcblxuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRSZWdpc3RlcmVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IFJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtdW5yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRVblJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgVW5yZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudHMtYXR0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudHNBdHRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudHMgQXR0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdGlmIChldmVudC5hdHRhY2hlZENsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGV0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERldGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERldGFjaGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnRBY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgQWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRlYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnREZWFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZWFjdGl2YXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIiwgKGV2ZW50OiBTbmFwLk1vdmVTaXplQ29tcGxldGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgTW92ZSBTaXplIENvbXBsZXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImdyb3Vwcy1jaGFuZ2VkXCIsIChldmVudDogU25hcC5Hcm91cHNDaGFuZ2VkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgR3JvdXBzIENoYW5nZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0YXJ0ZWQgU25hcCBTZXJ2ZXJcIik7XG5cblx0XHRcdFx0Y29uc3Qgd2luID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuXHRcdFx0XHRjb25zdCBuYXRpdmVJZCA9IGF3YWl0IHdpbi5nZXROYXRpdmVJZCgpO1xuXG5cdFx0XHRcdGF3YWl0IHNlcnZlci5yZWdpc3RlcldpbmRvdyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgbmF0aXZlSWQpO1xuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgUmVnaXN0ZXJpbmcgUGxhdGZvcm0gV2luZG93IHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0gYW5kIGhhbmRsZSAke25hdGl2ZUlkfWApO1xuXG5cdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGVkXCI7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0blN0b3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGluZ1wiO1xuXHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblxuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwaW5nIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5zdG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdG9wcGVkIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0c2VydmVyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBlZFwiO1xuXHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IHJ1bnRpbWVJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO1xuXHRcdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhczogXCJzbmFwLW5hdGl2ZS10ZXN0LWFwcFwiIH0pO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IGxvY2FsQXBwVXJsID0gKHJ1bnRpbWVJbmZvLmFyZ3MgYXMgYW55KVtcImxvY2FsLXN0YXJ0dXAtdXJsXCJdLnJlcGxhY2UoXCJjb25maWcuanNvblwiLCBcIlwiKTtcblx0XHRcdGF3YWl0IGxhdW5jaEFwcChcblx0XHRcdFx0XCJOYXRpdmUgVGVzdCBBcHBcIixcblx0XHRcdFx0VEVTVF9BUFBfV0lORE9XX0lELFxuXHRcdFx0XHRgJHtsb2NhbEFwcFVybH1hc3NldHNcXFxcJHthcHBBc3NldEluZm8uYWxpYXN9XFxcXCR7YXBwQXNzZXRJbmZvLnZlcnNpb259XFxcXCR7YXBwQXNzZXRJbmZvLnRhcmdldH1gLFxuXHRcdFx0XHRbXSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwid2FpdEZvcldpbmRvd09mTmFtZVwiLFxuXHRcdFx0XHRcdHRpbWVvdXRNczogMTUwMDAsXG5cdFx0XHRcdFx0bWF0Y2hSZWdleDogXCJeTmF0aXZlIFRlc3QgQXBwJFwiXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRpc1dpbmRvd09wZW4gPSB0cnVlO1xuXHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0fSk7XG5cblx0XHRidG5BdHRhY2hUb1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKHNlcnZlciAmJiBzZWxBdHRhY2hQb3NpdGlvbikge1xuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNlbEF0dGFjaFBvc2l0aW9uLnZhbHVlO1xuXHRcdFx0XHRhd2FpdCBzZXJ2ZXIuYXR0YWNoV2luZG93cyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgVEVTVF9BUFBfV0lORE9XX0lELCB2YWx1ZSBhcyBTbmFwLkF0dGFjaFNpZGUsIDApO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gdHJ1ZTtcblx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGF3YWl0IHNlcnZlci5kZXRhY2hGcm9tR3JvdXAoVEVTVF9BUFBfV0lORE9XX0lEKTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkNsZWFyTG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRsb2dDbGVhcigpO1xuXHRcdH0pO1xuXG5cdFx0YnRuR2V0TGF5b3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJMYXlvdXRcIik7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGxheW91dCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkdldEF0dGFjaGVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGNvbnN0IGF0dGFjaGVkID0gYXdhaXQgc2VydmVyLmdldEF0dGFjaGVkKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJBdHRhY2hlZFwiKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBET00gZWxlbWVudHMgd2l0aCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNlcnZlclN0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkXG5cdCkge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBgU25hcCBTZXJ2ZXIgaXMgJHtzZXJ2ZXJTdGF0ZX1gO1xuXHRcdH0gZWxzZSBpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRlZFwiKSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gXCJTbmFwIFNlcnZlciBpcyBzdGFydGVkXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RvcHBlZFwiO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSB3aW5kb3cgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVdpbmRvd1N0YXR1cygpOiB2b2lkIHtcblx0aWYgKGJ0bk5hdGl2ZVRlc3RBcHAgJiYgc2VsQXR0YWNoUG9zaXRpb24gJiYgYnRuQXR0YWNoVG9XaW5kb3cgJiYgYnRuRGV0YWNoRnJvbVdpbmRvdykge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIgJiYgaXNXaW5kb3dPcGVuKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHNlcnZlclN0YXRlID09PSBcInN0b3BwZWRcIjtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGxvZyBkaXNwbGF5LlxuICogQHBhcmFtIGluZm9ybWF0aW9uIFRoZSBpbmZvcm1hdGlvbiB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvcm1hdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9JHtpbmZvcm1hdGlvbn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGVycm9yIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGxvZ0Vycm9yKGVycjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9RVJST1I6ICR7ZXJyfVxcblxcbmA7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSBsb2dnaW5nLnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBsb2cgZGlzcGxheS5cbiAqL1xuZnVuY3Rpb24gbG9nQ2xlYXIoKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSAwO1xuXHR9XG59XG5cbi8qKlxuICogTGF1bmNoIGFuIGFwcGxpY2F0aW9uIHVzaW5nIFNuYXAuXG4gKiBAcGFyYW0gYXBwTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXBwIHRoYXQgaXMgYmVpbmcgbGF1bmNoZWQuXG4gKiBAcGFyYW0gY2xpZW50SWQgQW4gSWQgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGxhdW5jaGVkIGFwcC5cbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gbGF1bmNoLlxuICogQHBhcmFtIGFyZ3MgQWRkaXRpb25hbCBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGZvciB0aGUgbGF1bmNoLlxuICogQHBhcmFtIHN0cmF0ZWd5IFRoZSBzdHJhdGVneSB0byBsYXVuY2ggdGhlIHdpbmRvdyB3aXRoLlxuICovXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hBcHAoXG5cdGFwcE5hbWU6IHN0cmluZyxcblx0Y2xpZW50SWQ6IHN0cmluZyxcblx0cGF0aDogc3RyaW5nLFxuXHRhcmdzOiBzdHJpbmdbXSxcblx0c3RyYXRlZ3k6IFNuYXAuTGF1bmNoU3RyYXRlZ3lcbik6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBMYXVuY2hpbmcgJHthcHBOYW1lfWApO1xuXHRcdFx0Y29uc3QgbGF1bmNoUmVzdWx0ID0gYXdhaXQgc2VydmVyLmxhdW5jaCh7XG5cdFx0XHRcdHBhdGgsXG5cdFx0XHRcdGNsaWVudElkLFxuXHRcdFx0XHRhcmdzLFxuXHRcdFx0XHRzdHJhdGVneVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChsYXVuY2hSZXN1bHQ/LnByb2Nlc3NfaWQpIHtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYCR7YXBwTmFtZX0gbGF1bmNoZWQgd2l0aCBwcm9jZXNzIGlkICR7bGF1bmNoUmVzdWx0LnByb2Nlc3NfaWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9