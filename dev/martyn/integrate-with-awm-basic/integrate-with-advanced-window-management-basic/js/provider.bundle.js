/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/awm/openfin.awm.mjs":
/*!*******************************************************!*\
  !*** ../../node_modules/@openfin/awm/openfin.awm.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWMServer: () => (/* binding */ r)
/* harmony export */ });
var e={343:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,a),i(n)}function a(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,a,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,r,{once:!0})}))},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var o=10;function s(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function l(e,t,n,i){var r,a,o,l;if(s(n),void 0===(a=e._events)?(a=e._events=Object.create(null),e._eventsCount=0):(void 0!==a.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),a=e._events),o=a[t]),void 0===o)o=a[t]=n,++e._eventsCount;else if("function"==typeof o?o=a[t]=i?[n,o]:[o,n]:i?o.unshift(n):o.push(n),(r=c(e))>0&&o.length>r&&!o.warned){o.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=e,h.type=t,h.count=o.length,l=h,console&&console.warn&&console.warn(l)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function u(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=h.bind(i);return r.listener=n,i.wrapFn=r,r}function p(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(a){i.once&&e.removeEventListener(t,r),n(a)}))}}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");o=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,a=this._events;if(void 0!==a)r=r&&void 0===a.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var c=a[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var l=c.length,h=f(c,l);for(n=0;n<l;++n)i(h[n],this,t)}return!0},a.prototype.addListener=function(e,t){return l(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return l(this,e,t,!0)},a.prototype.once=function(e,t){return s(t),this.on(e,u(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return s(t),this.prependListener(e,u(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,a,o;if(s(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,a=n.length-1;a>=0;a--)if(n[a]===t||n[a].listener===t){o=n[a].listener,r=a;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,o||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,a=Object.keys(n);for(i=0;i<a.length;++i)"removeListener"!==(r=a[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return p(this,e,!0)},a.prototype.rawListeners=function(e){return p(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},a.prototype.listenerCount=d,a.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{n.d(i,{n:()=>t});var e=n(343);class t{constructor(t){if(this.server_id=t,this.emitter=new e.EventEmitter,!fin)throw new Error("OpenFin is not available")}async start(e){const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the AWM server");if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the AWM server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the AWM server from a URL");if(!e?.executablePath)try{await fin.System.getAppAssetInfo({alias:"openfin-awm"})}catch(e){throw new Error("The 'openfin-awm' asset must be defined in the manifest")}const n=await this.build_command_line(e);let i={alias:"openfin-awm",arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.awm_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error("Failed to launch the AWM server")}return this.connect()}async connect(){this.client=await fin.InterApplicationBus.Channel.connect(`awm-server-core-${this.server_id}`),this.client.register("awm_handshake",(async(e,t)=>{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:e.version,componentName:"awm-server"}})})),await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"0.1.0-beta.10a",componentName:"awm-client"}}),this.client.register("awm_updates",((e,t)=>this.handleAWMEvents(e,t)))}async stop(){if(!this.client)throw new Error("AWM server is not running");await(this.client?.dispatch("awm_api_invoke",{action:"shutdown"}))}async getLayout(){if(!this.client)throw new Error("AWM server is not running");const e=await(this.client?.dispatch("awm_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e){if(!this.client)throw new Error("AWM server is not running");await(this.client?.dispatch("awm_api_invoke",{action:"deserialiseLayout",payload:{layout:e}}))}async prepareToApplySnapshot(){if(!this.client)throw new Error("AWM server is not running");await(this.client?.dispatch("awm_api_invoke",{action:"resetAll"}))}async decorateSnapshot(e){return{...e,awm:await this.getLayout()}}async applySnapshot(e){e.awm&&await this.setLayout(e.awm)}async launch(e){if(!this.client)throw new Error("Not connected to an AWM server");const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("awm_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t){await(this.client?.dispatch("awm_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("awm_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("awm_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("awm_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("awm_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=(await t.getOptions()).customData||{};r.awmClientId?i=r.awmClientId:await t.updateOptions({customData:{...r,awmClientId:i}}),await this.registerWindow(i,n)}emit_event(e,...t){this.emitter.emit(e,...t)}handleAWMEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug ");const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}})();var r=i.n;

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
/* harmony import */ var _openfin_awm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/awm */ "../../node_modules/@openfin/awm/openfin.awm.mjs");

const TEST_APP_WINDOW_ID = "awm-example-native-test-app-id";
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
                logInformation(`Starting AWM Server with Id ${fin.me.identity.uuid}`);
                server = new _openfin_awm__WEBPACK_IMPORTED_MODULE_0__.AWMServer(fin.me.identity.uuid);
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
                logInformation("Started AWM Server");
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
                logInformation("Stopping AWM Server");
                if (server) {
                    await server.detachFromGroup(TEST_APP_WINDOW_ID);
                    await server.stop();
                }
                logInformation("Stopped AWM Server");
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
            const appAssetInfo = await fin.System.getAppAssetInfo({ alias: "native-test-app" });
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
            serverStatus.textContent = `AWM Server is ${serverState}`;
        }
        else if (serverState === "started") {
            chkShowDebugWindow.disabled = true;
            btnStart.disabled = true;
            btnStop.disabled = false;
            btnGetLayout.disabled = false;
            btnGetAttached.disabled = false;
            serverStatus.textContent = "AWM Server is started";
        }
        else {
            chkShowDebugWindow.disabled = false;
            btnStart.disabled = false;
            btnStop.disabled = true;
            btnGetLayout.disabled = true;
            btnGetAttached.disabled = true;
            serverStatus.textContent = "AWM Server is stopped";
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
 * Launch an application using AWM.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDekM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFFBQVE7SUFDaEIsSUFBSSxPQUFPLEVBQUU7UUFDWixPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUN0QjtBQUNGLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLFNBQVMsQ0FDdkIsT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQVksRUFDWixJQUFjLEVBQ2QsUUFBNEI7SUFFNUIsSUFBSTtRQUNILElBQUksTUFBTSxFQUFFO1lBQ1gsY0FBYyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUk7Z0JBQ0osUUFBUTtnQkFDUixJQUFJO2dCQUNKLFFBQVE7YUFDUixDQUFDLENBQUM7WUFFSCxJQUFJLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxHQUFHLE9BQU8sNkJBQTZCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0Q7S0FDRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1hZHZhbmNlZC13aW5kb3ctbWFuYWdlbWVudC1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vYXdtL29wZW5maW4uYXdtLm1qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtYWR2YW5jZWQtd2luZG93LW1hbmFnZW1lbnQtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLWFkdmFuY2VkLXdpbmRvdy1tYW5hZ2VtZW50LWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtYWR2YW5jZWQtd2luZG93LW1hbmFnZW1lbnQtYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtYWR2YW5jZWQtd2luZG93LW1hbmFnZW1lbnQtYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtYWR2YW5jZWQtd2luZG93LW1hbmFnZW1lbnQtYmFzaWMvLi9jbGllbnQvc3JjL3Byb3ZpZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBlPXszNDM6ZT0+e3ZhciB0LG49XCJvYmplY3RcIj09dHlwZW9mIFJlZmxlY3Q/UmVmbGVjdDpudWxsLGk9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5hcHBseT9uLmFwcGx5OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoZSx0LG4pfTt0PW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4ub3duS2V5cz9uLm93bktleXM6T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz9mdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSkpfTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSl9O3ZhciByPU51bWJlci5pc05hTnx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUhPWV9O2Z1bmN0aW9uIGEoKXthLmluaXQuY2FsbCh0aGlzKX1lLmV4cG9ydHM9YSxlLmV4cG9ydHMub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24obixpKXtmdW5jdGlvbiByKG4pe2UucmVtb3ZlTGlzdGVuZXIodCxhKSxpKG4pfWZ1bmN0aW9uIGEoKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnJlbW92ZUxpc3RlbmVyJiZlLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIixyKSxuKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9dihlLHQsYSx7b25jZTohMH0pLFwiZXJyb3JcIiE9PXQmJmZ1bmN0aW9uKGUsdCxuKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uJiZ2KGUsXCJlcnJvclwiLHQsbil9KGUscix7b25jZTohMH0pfSkpfSxhLkV2ZW50RW1pdHRlcj1hLGEucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLGEucHJvdG90eXBlLl9ldmVudHNDb3VudD0wLGEucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwO3ZhciBvPTEwO2Z1bmN0aW9uIHMoZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKX1mdW5jdGlvbiBjKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/YS5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBsKGUsdCxuLGkpe3ZhciByLGEsbyxsO2lmKHMobiksdm9pZCAwPT09KGE9ZS5fZXZlbnRzKT8oYT1lLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxlLl9ldmVudHNDb3VudD0wKToodm9pZCAwIT09YS5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxuLmxpc3RlbmVyP24ubGlzdGVuZXI6biksYT1lLl9ldmVudHMpLG89YVt0XSksdm9pZCAwPT09bylvPWFbdF09biwrK2UuX2V2ZW50c0NvdW50O2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbz9vPWFbdF09aT9bbixvXTpbbyxuXTppP28udW5zaGlmdChuKTpvLnB1c2gobiksKHI9YyhlKSk+MCYmby5sZW5ndGg+ciYmIW8ud2FybmVkKXtvLndhcm5lZD0hMDt2YXIgaD1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK28ubGVuZ3RoK1wiIFwiK1N0cmluZyh0KStcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO2gubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLGguZW1pdHRlcj1lLGgudHlwZT10LGguY291bnQ9by5sZW5ndGgsbD1oLGNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKGwpfXJldHVybiBlfWZ1bmN0aW9uIGgoKXtpZighdGhpcy5maXJlZClyZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLDA9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk6dGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCxhcmd1bWVudHMpfWZ1bmN0aW9uIHUoZSx0LG4pe3ZhciBpPXtmaXJlZDohMSx3cmFwRm46dm9pZCAwLHRhcmdldDplLHR5cGU6dCxsaXN0ZW5lcjpufSxyPWguYmluZChpKTtyZXR1cm4gci5saXN0ZW5lcj1uLGkud3JhcEZuPXIscn1mdW5jdGlvbiBwKGUsdCxuKXt2YXIgaT1lLl9ldmVudHM7aWYodm9pZCAwPT09aSlyZXR1cm5bXTt2YXIgcj1pW3RdO3JldHVybiB2b2lkIDA9PT1yP1tdOlwiZnVuY3Rpb25cIj09dHlwZW9mIHI/bj9bci5saXN0ZW5lcnx8cl06W3JdOm4/ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCksbj0wO248dC5sZW5ndGg7KytuKXRbbl09ZVtuXS5saXN0ZW5lcnx8ZVtuXTtyZXR1cm4gdH0ocik6ZihyLHIubGVuZ3RoKX1mdW5jdGlvbiBkKGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT10KXt2YXIgbj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pcmV0dXJuIDE7aWYodm9pZCAwIT09bilyZXR1cm4gbi5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgbj1uZXcgQXJyYXkodCksaT0wO2k8dDsrK2kpbltpXT1lW2ldO3JldHVybiBufWZ1bmN0aW9uIHYoZSx0LG4saSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbilpLm9uY2U/ZS5vbmNlKHQsbik6ZS5vbih0LG4pO2Vsc2V7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO2UuYWRkRXZlbnRMaXN0ZW5lcih0LChmdW5jdGlvbiByKGEpe2kub25jZSYmZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsciksbihhKX0pKX19T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG99LHNldDpmdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxyKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTtvPWV9fSksYS5pbml0PWZ1bmN0aW9uKCl7dm9pZCAwIT09dGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHMhPT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApLHRoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHZvaWQgMH0sYS5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fHIoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO3JldHVybiB0aGlzLl9tYXhMaXN0ZW5lcnM9ZSx0aGlzfSxhLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oKXtyZXR1cm4gYyh0aGlzKX0sYS5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9W10sbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspdC5wdXNoKGFyZ3VtZW50c1tuXSk7dmFyIHI9XCJlcnJvclwiPT09ZSxhPXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT1hKXI9ciYmdm9pZCAwPT09YS5lcnJvcjtlbHNlIGlmKCFyKXJldHVybiExO2lmKHIpe3ZhciBvO2lmKHQubGVuZ3RoPjAmJihvPXRbMF0pLG8gaW5zdGFuY2VvZiBFcnJvcil0aHJvdyBvO3ZhciBzPW5ldyBFcnJvcihcIlVuaGFuZGxlZCBlcnJvci5cIisobz9cIiAoXCIrby5tZXNzYWdlK1wiKVwiOlwiXCIpKTt0aHJvdyBzLmNvbnRleHQ9byxzfXZhciBjPWFbZV07aWYodm9pZCAwPT09YylyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjKWkoYyx0aGlzLHQpO2Vsc2V7dmFyIGw9Yy5sZW5ndGgsaD1mKGMsbCk7Zm9yKG49MDtuPGw7KytuKWkoaFtuXSx0aGlzLHQpfXJldHVybiEwfSxhLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBsKHRoaXMsZSx0LCExKX0sYS5wcm90b3R5cGUub249YS5wcm90b3R5cGUuYWRkTGlzdGVuZXIsYS5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGwodGhpcyxlLHQsITApfSxhLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHModCksdGhpcy5vbihlLHUodGhpcyxlLHQpKSx0aGlzfSxhLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHModCksdGhpcy5wcmVwZW5kTGlzdGVuZXIoZSx1KHRoaXMsZSx0KSksdGhpc30sYS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXt2YXIgbixpLHIsYSxvO2lmKHModCksdm9pZCAwPT09KGk9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZih2b2lkIDA9PT0obj1pW2VdKSlyZXR1cm4gdGhpcztpZihuPT09dHx8bi5saXN0ZW5lcj09PXQpMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG4ubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pe2ZvcihyPS0xLGE9bi5sZW5ndGgtMTthPj0wO2EtLSlpZihuW2FdPT09dHx8blthXS5saXN0ZW5lcj09PXQpe289blthXS5saXN0ZW5lcixyPWE7YnJlYWt9aWYocjwwKXJldHVybiB0aGlzOzA9PT1yP24uc2hpZnQoKTpmdW5jdGlvbihlLHQpe2Zvcig7dCsxPGUubGVuZ3RoO3QrKyllW3RdPWVbdCsxXTtlLnBvcCgpfShuLHIpLDE9PT1uLmxlbmd0aCYmKGlbZV09blswXSksdm9pZCAwIT09aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG98fHQpfXJldHVybiB0aGlzfSxhLnByb3RvdHlwZS5vZmY9YS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIsYS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LG4saTtpZih2b2lkIDA9PT0obj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PW4ucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKTp2b2lkIDAhPT1uW2VdJiYoMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTpkZWxldGUgbltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7dmFyIHIsYT1PYmplY3Qua2V5cyhuKTtmb3IoaT0wO2k8YS5sZW5ndGg7KytpKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShyPWFbaV0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhyKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1uW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih2b2lkIDAhPT10KWZvcihpPXQubGVuZ3RoLTE7aT49MDtpLS0pdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbaV0pO3JldHVybiB0aGlzfSxhLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHAodGhpcyxlLCEwKX0sYS5wcm90b3R5cGUucmF3TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiBwKHRoaXMsZSwhMSl9LGEubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6ZC5jYWxsKGUsdCl9LGEucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZCxhLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/dCh0aGlzLl9ldmVudHMpOltdfX19LHQ9e307ZnVuY3Rpb24gbihpKXt2YXIgcj10W2ldO2lmKHZvaWQgMCE9PXIpcmV0dXJuIHIuZXhwb3J0czt2YXIgYT10W2ldPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtpXShhLGEuZXhwb3J0cyxuKSxhLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBpIGluIHQpbi5vKHQsaSkmJiFuLm8oZSxpKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaSx7ZW51bWVyYWJsZTohMCxnZXQ6dFtpXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpO3ZhciBpPXt9OygoKT0+e24uZChpLHtuOigpPT50fSk7dmFyIGU9bigzNDMpO2NsYXNzIHR7Y29uc3RydWN0b3IodCl7aWYodGhpcy5zZXJ2ZXJfaWQ9dCx0aGlzLmVtaXR0ZXI9bmV3IGUuRXZlbnRFbWl0dGVyLCFmaW4pdGhyb3cgbmV3IEVycm9yKFwiT3BlbkZpbiBpcyBub3QgYXZhaWxhYmxlXCIpfWFzeW5jIHN0YXJ0KGUpe2NvbnN0IHQ9YXdhaXQgZmluLlN5c3RlbS5xdWVyeVBlcm1pc3Npb25Gb3JDdXJyZW50Q29udGV4dChcIlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3NcIik7aWYoIXQuZ3JhbnRlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBBV00gc2VydmVyXCIpO2lmKGU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uZXhlY3V0YWJsZXM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIEFXTSBzZXJ2ZXIgZnJvbSBhbiBleGVjdXRhYmxlIHBhdGhcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uYXNzZXRzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBBV00gc2VydmVyIGZyb20gYSBVUkxcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoKXRyeXthd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6XCJvcGVuZmluLWF3bVwifSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKFwiVGhlICdvcGVuZmluLWF3bScgYXNzZXQgbXVzdCBiZSBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdFwiKX1jb25zdCBuPWF3YWl0IHRoaXMuYnVpbGRfY29tbWFuZF9saW5lKGUpO2xldCBpPXthbGlhczpcIm9wZW5maW4tYXdtXCIsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn07ZT8uZXhlY3V0YWJsZVBhdGgmJihpPXtwYXRoOmUuZXhlY3V0YWJsZVBhdGgsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn0pO3RyeXt0aGlzLmF3bV9pZGVudGl0eT1hd2FpdCBmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcyhpKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gbGF1bmNoIHRoZSBBV00gc2VydmVyXCIpfXJldHVybiB0aGlzLmNvbm5lY3QoKX1hc3luYyBjb25uZWN0KCl7dGhpcy5jbGllbnQ9YXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGBhd20tc2VydmVyLWNvcmUtJHt0aGlzLnNlcnZlcl9pZH1gKSx0aGlzLmNsaWVudC5yZWdpc3RlcihcImF3bV9oYW5kc2hha2VcIiwoYXN5bmMoZSx0KT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246ZS52ZXJzaW9uLGNvbXBvbmVudE5hbWU6XCJhd20tc2VydmVyXCJ9fSl9KSksYXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjpcIjAuMS4wLWJldGEuMTBhXCIsY29tcG9uZW50TmFtZTpcImF3bS1jbGllbnRcIn19KSx0aGlzLmNsaWVudC5yZWdpc3RlcihcImF3bV91cGRhdGVzXCIsKChlLHQpPT50aGlzLmhhbmRsZUFXTUV2ZW50cyhlLHQpKSl9YXN5bmMgc3RvcCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJBV00gc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcImF3bV9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIkFXTSBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7Y29uc3QgZT1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJhd21fYXBpX2ludm9rZVwiLHthY3Rpb246XCJzZXJpYWxpc2VMYXlvdXRcIn0pKTtyZXR1cm4gZT8ucGF5bG9hZC5sYXlvdXR9YXN5bmMgc2V0TGF5b3V0KGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJBV00gc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcImF3bV9hcGlfaW52b2tlXCIse2FjdGlvbjpcImRlc2VyaWFsaXNlTGF5b3V0XCIscGF5bG9hZDp7bGF5b3V0OmV9fSkpfWFzeW5jIHByZXBhcmVUb0FwcGx5U25hcHNob3QoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiQVdNIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJhd21fYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpfWFzeW5jIGRlY29yYXRlU25hcHNob3QoZSl7cmV0dXJuey4uLmUsYXdtOmF3YWl0IHRoaXMuZ2V0TGF5b3V0KCl9fWFzeW5jIGFwcGx5U25hcHNob3QoZSl7ZS5hd20mJmF3YWl0IHRoaXMuc2V0TGF5b3V0KGUuYXdtKX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gQVdNIHNlcnZlclwiKTtjb25zdCB0PXthY3Rpb246XCJzdGFydFByb2Nlc3NcIixwYXlsb2FkOnsuLi5lLGFyZ3M6ZS5hcmdzfHxbXX19O2lmKGUuc3RyYXRlZ3kpe2NvbnN0e3R5cGU6biwuLi5pfT1lLnN0cmF0ZWd5O3QucGF5bG9hZC5zdHJhdGVneT17dHlwZTpuLHBhcmFtZXRlcnM6ey4uLml9fX1jb25zdCBuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcImF3bV9hcGlfaW52b2tlXCIsdCkpO2lmKG4/LnBheWxvYWQ/LnN1Y2Nlc3MpcmV0dXJue3Byb2Nlc3NfaWQ6bi5wYXlsb2FkLnByb2Nlc3NfaWR9O3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxhdW5jaCBwcm9jZXNzOiAke24/LnBheWxvYWQ/LmVycm9yfWApfWFzeW5jIHJlZ2lzdGVyV2luZG93KGUsdCl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwiYXdtX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dH19KSl9YXN5bmMgZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpe2NvbnN0IGU9ZT0+dGhpcy5oYW5kbGVOZXdXaW5kb3coZSk7cmV0dXJuIGF3YWl0IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpLmFkZExpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKSxhc3luYygpPT57YXdhaXQgZmluLlN5c3RlbS5yZW1vdmVMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSl9fWFzeW5jIGF0dGFjaFdpbmRvd3MoZSx0LG4saSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwiYXdtX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiYXR0YWNoXCIscGF5bG9hZDp7dGFyZ2V0Q2xpZW50SWQ6ZSx0b0F0dGFjaENsaWVudElkOnQsdGFyZ2V0U2lkZTpuLG9mZnNldDppfX0pKX1hc3luYyBkZXRhY2hGcm9tR3JvdXAoZSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwiYXdtX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGV0YWNoRnJvbUdyb3VwXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSl9YXN5bmMgZ2V0QXR0YWNoZWQoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcImF3bV9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEF0dGFjaGVkSW5zdGFuY2VzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuYXR0YWNoZWR9YXN5bmMgaGFzQXR0YWNobWVudHMoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcImF3bV9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhhc0F0dGFjaG1lbnRzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuaGFzQXR0YWNobWVudHN9YWRkRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuZW1pdHRlci5vbihlLHQpfXJlbW92ZUV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub2ZmKGUsdCl9b25jZShlLHQpe3RoaXMuZW1pdHRlci5vbmNlKGUsdCl9YXN5bmMgaGFuZGxlTmV3V2luZG93KGUpe2NvbnN0IHQ9YXdhaXQgZmluLldpbmRvdy53cmFwKHt1dWlkOmUudXVpZCxuYW1lOmUubmFtZX0pLG49YXdhaXQgdC5nZXROYXRpdmVJZCgpO2xldCBpPXQuaWRlbnRpdHkubmFtZTtjb25zdCByPShhd2FpdCB0LmdldE9wdGlvbnMoKSkuY3VzdG9tRGF0YXx8e307ci5hd21DbGllbnRJZD9pPXIuYXdtQ2xpZW50SWQ6YXdhaXQgdC51cGRhdGVPcHRpb25zKHtjdXN0b21EYXRhOnsuLi5yLGF3bUNsaWVudElkOml9fSksYXdhaXQgdGhpcy5yZWdpc3RlcldpbmRvdyhpLG4pfWVtaXRfZXZlbnQoZSwuLi50KXt0aGlzLmVtaXR0ZXIuZW1pdChlLC4uLnQpfWhhbmRsZUFXTUV2ZW50cyhlLHQpe3N3aXRjaCh0aGlzLmVtaXRfZXZlbnQoXCJhbGwtZXZlbnRzXCIse3R5cGU6ZS5hY3Rpb24scGF5bG9hZDplLnBheWxvYWR9KSxlLmFjdGlvbil7Y2FzZVwiY2xpZW50UmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1yZWdpc3RlcmVkXCIse2NsaWVudElkOmUucGF5bG9hZC5jbGllbnRJZCx3aW5kb3dIYW5kbGU6YCMke2UucGF5bG9hZC53aW5kb3dIYW5kbGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCxvd25pbmdQcm9jZXNzSWQ6ZS5wYXlsb2FkLm93bmluZ1Byb2Nlc3NJZH0pO2JyZWFrO2Nhc2VcImNsaWVudFVuUmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC11bnJlZ2lzdGVyZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwibW92ZVNpemVDb21wbGV0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudHNBdHRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudHMtYXR0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGV0YWNoZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGV0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiZ3JvdXBzQ2hhbmdlZFwiOnRoaXMuZW1pdF9ldmVudChcImdyb3Vwcy1jaGFuZ2VkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudEFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1hY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGVhY3RpdmF0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSl9fWFzeW5jIGJ1aWxkX2NvbW1hbmRfbGluZShlKXtsZXQgdD1gLS1pZCAke3RoaXMuc2VydmVyX2lkfSBgO2U/LnNob3dEZWJ1ZyYmKHQrPVwiIC0tc2hvdy1kZWJ1ZyBcIik7Y29uc3Qgbj1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7cmV0dXJuIHQrPWAtLXJ1bnRpbWUtcG9ydCAke24ucG9ydH0gYCx0Kz1gLS1ydW50aW1lLXZlcnNpb24gJHtuLnZlcnNpb259IGAsdC50cmltKCl9fX0pKCk7dmFyIHI9aS5uO2V4cG9ydHtyIGFzIEFXTVNlcnZlcn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBBV00gZnJvbSBcIkBvcGVuZmluL2F3bVwiO1xuXG5jb25zdCBURVNUX0FQUF9XSU5ET1dfSUQgPSBcImF3bS1leGFtcGxlLW5hdGl2ZS10ZXN0LWFwcC1pZFwiO1xuXG4vLyBUaGUgRE9NIGVsZW1lbnRzXG5sZXQgY2hrU2hvd0RlYnVnV2luZG93OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdGFydDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blN0b3A6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5OYXRpdmVUZXN0QXBwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VsQXR0YWNoUG9zaXRpb246IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBidG5BdHRhY2hUb1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRldGFjaEZyb21XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRMYXlvdXQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRBdHRhY2hlZDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VydmVyU3RhdHVzOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB8IG51bGw7XG5sZXQgbG9nZ2luZzogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xuXG5sZXQgc2VydmVyU3RhdGU6IFwic3RhcnRpbmdcIiB8IFwic3RhcnRlZFwiIHwgXCJzdG9wcGluZ1wiIHwgXCJzdG9wcGVkXCIgPSBcInN0b3BwZWRcIjtcbmxldCBpc1dpbmRvd09wZW4gPSBmYWxzZTtcbmxldCBpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5sZXQgc2VydmVyOiBBV00uQVdNU2VydmVyIHwgdW5kZWZpbmVkO1xuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGZpbmlzaCBsb2FkaW5nXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBQbGF0Zm9ybSBoYXMgbG9hZGVkIHNvIGluaXRpYWxpemUgdGhlIERPTVxuXHRhd2FpdCBpbml0aWFsaXplRE9NKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVET00oKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNoa1Nob3dEZWJ1Z1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrU2hvd0RlYnVnV2luZG93XCIpO1xuXHRidG5TdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blN0YXJ0XCIpO1xuXHRidG5TdG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RvcFwiKTtcblx0c2VydmVyU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUGFyYWdyYXBoRWxlbWVudD4oXCIjc2VydmVyU3RhdHVzXCIpO1xuXHRidG5OYXRpdmVUZXN0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuTmF0aXZlVGVzdEFwcFwiKTtcblx0c2VsQXR0YWNoUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxBdHRhY2hQb3NpdGlvblwiKTtcblx0YnRuQXR0YWNoVG9XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5BdHRhY2hUb1dpbmRvd1wiKTtcblx0YnRuRGV0YWNoRnJvbVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRldGFjaEZyb21XaW5kb3dcIik7XG5cdGJ0bkdldExheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldExheW91dFwiKTtcblx0YnRuR2V0QXR0YWNoZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRBdHRhY2hlZFwiKTtcblx0bG9nZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFByZUVsZW1lbnQ+KFwiI2xvZ2dpbmdcIik7XG5cdGJ0bkNsZWFyTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ2xlYXJMb2dcIik7XG5cblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZCAmJlxuXHRcdGJ0bkNsZWFyTG9nXG5cdCkge1xuXHRcdGJ0blN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRpbmdcIjtcblx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIEFXTSBTZXJ2ZXIgd2l0aCBJZCAke2Zpbi5tZS5pZGVudGl0eS51dWlkfWApO1xuXHRcdFx0XHRzZXJ2ZXIgPSBuZXcgQVdNLkFXTVNlcnZlcihmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdGF3YWl0IHNlcnZlci5zdGFydCh7IHNob3dEZWJ1ZzogY2hrU2hvd0RlYnVnV2luZG93Py5jaGVja2VkIH0pO1xuXG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBBV00uQ2xpZW50UmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBSZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLCAoZXZlbnQ6IEFXTS5DbGllbnRVblJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgVW5yZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudHMtYXR0YWNoZWRcIiwgKGV2ZW50OiBBV00uQ2xpZW50c0F0dGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50cyBBdHRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0aWYgKGV2ZW50LmF0dGFjaGVkQ2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZXRhY2hlZFwiLCAoZXZlbnQ6IEFXTS5DbGllbnREZXRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZXRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0aWYgKGV2ZW50LmNsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWFjdGl2YXRlZFwiLCAoZXZlbnQ6IEFXTS5DbGllbnRBY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgQWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRlYWN0aXZhdGVkXCIsIChldmVudDogQVdNLkNsaWVudERlYWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERlYWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwibW92ZS1zaXplLWNvbXBsZXRlZFwiLCAoZXZlbnQ6IEFXTS5Nb3ZlU2l6ZUNvbXBsZXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYE1vdmUgU2l6ZSBDb21wbGV0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJncm91cHMtY2hhbmdlZFwiLCAoZXZlbnQ6IEFXTS5Hcm91cHNDaGFuZ2VkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgR3JvdXBzIENoYW5nZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0YXJ0ZWQgQVdNIFNlcnZlclwiKTtcblxuXHRcdFx0XHRjb25zdCB3aW4gPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRcdGNvbnN0IG5hdGl2ZUlkID0gYXdhaXQgd2luLmdldE5hdGl2ZUlkKCk7XG5cblx0XHRcdFx0YXdhaXQgc2VydmVyLnJlZ2lzdGVyV2luZG93KGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYXRpdmVJZCk7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBSZWdpc3RlcmluZyBQbGF0Zm9ybSBXaW5kb3cgd2l0aCBJZCAke2Zpbi5tZS5pZGVudGl0eS51dWlkfSBhbmQgaGFuZGxlICR7bmF0aXZlSWR9YCk7XG5cblx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0YXJ0ZWRcIjtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuU3RvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwaW5nXCI7XG5cdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBpbmcgQVdNIFNlcnZlclwiKTtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5kZXRhY2hGcm9tR3JvdXAoVEVTVF9BUFBfV0lORE9XX0lEKTtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RvcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBlZCBBV00gU2VydmVyXCIpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0c2VydmVyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBlZFwiO1xuXHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IHJ1bnRpbWVJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO1xuXHRcdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhczogXCJuYXRpdmUtdGVzdC1hcHBcIiB9KTtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRjb25zdCBsb2NhbEFwcFVybCA9IChydW50aW1lSW5mby5hcmdzIGFzIGFueSlbXCJsb2NhbC1zdGFydHVwLXVybFwiXS5yZXBsYWNlKFwiY29uZmlnLmpzb25cIiwgXCJcIik7XG5cdFx0XHRhd2FpdCBsYXVuY2hBcHAoXG5cdFx0XHRcdFwiTmF0aXZlIFRlc3QgQXBwXCIsXG5cdFx0XHRcdFRFU1RfQVBQX1dJTkRPV19JRCxcblx0XHRcdFx0YCR7bG9jYWxBcHBVcmx9YXNzZXRzXFxcXCR7YXBwQXNzZXRJbmZvLmFsaWFzfVxcXFwke2FwcEFzc2V0SW5mby52ZXJzaW9ufVxcXFwke2FwcEFzc2V0SW5mby50YXJnZXR9YCxcblx0XHRcdFx0W10sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIndhaXRGb3JXaW5kb3dPZk5hbWVcIixcblx0XHRcdFx0XHR0aW1lb3V0TXM6IDE1MDAwLFxuXHRcdFx0XHRcdG1hdGNoUmVnZXg6IFwiXk5hdGl2ZSBUZXN0IEFwcCRcIlxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0aXNXaW5kb3dPcGVuID0gdHJ1ZTtcblx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdH0pO1xuXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChzZXJ2ZXIgJiYgc2VsQXR0YWNoUG9zaXRpb24pIHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBzZWxBdHRhY2hQb3NpdGlvbi52YWx1ZTtcblx0XHRcdFx0YXdhaXQgc2VydmVyLmF0dGFjaFdpbmRvd3MoZmluLm1lLmlkZW50aXR5LnV1aWQsIFRFU1RfQVBQX1dJTkRPV19JRCwgdmFsdWUgYXMgQVdNLkF0dGFjaFNpZGUsIDApO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gdHJ1ZTtcblx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGF3YWl0IHNlcnZlci5kZXRhY2hGcm9tR3JvdXAoVEVTVF9BUFBfV0lORE9XX0lEKTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkNsZWFyTG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRsb2dDbGVhcigpO1xuXHRcdH0pO1xuXG5cdFx0YnRuR2V0TGF5b3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJMYXlvdXRcIik7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGxheW91dCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkdldEF0dGFjaGVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdGNvbnN0IGF0dGFjaGVkID0gYXdhaXQgc2VydmVyLmdldEF0dGFjaGVkKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJBdHRhY2hlZFwiKTtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBET00gZWxlbWVudHMgd2l0aCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNlcnZlclN0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkXG5cdCkge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBgQVdNIFNlcnZlciBpcyAke3NlcnZlclN0YXRlfWA7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIkFXTSBTZXJ2ZXIgaXMgc3RhcnRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIkFXTSBTZXJ2ZXIgaXMgc3RvcHBlZFwiO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSB3aW5kb3cgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVdpbmRvd1N0YXR1cygpOiB2b2lkIHtcblx0aWYgKGJ0bk5hdGl2ZVRlc3RBcHAgJiYgc2VsQXR0YWNoUG9zaXRpb24gJiYgYnRuQXR0YWNoVG9XaW5kb3cgJiYgYnRuRGV0YWNoRnJvbVdpbmRvdykge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIgJiYgaXNXaW5kb3dPcGVuKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHNlcnZlclN0YXRlID09PSBcInN0b3BwZWRcIjtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGxvZyBkaXNwbGF5LlxuICogQHBhcmFtIGluZm9ybWF0aW9uIFRoZSBpbmZvcm1hdGlvbiB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvcm1hdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9JHtpbmZvcm1hdGlvbn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGVycm9yIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGxvZ0Vycm9yKGVycjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9RVJST1I6ICR7ZXJyfVxcblxcbmA7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSBsb2dnaW5nLnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBsb2cgZGlzcGxheS5cbiAqL1xuZnVuY3Rpb24gbG9nQ2xlYXIoKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSAwO1xuXHR9XG59XG5cbi8qKlxuICogTGF1bmNoIGFuIGFwcGxpY2F0aW9uIHVzaW5nIEFXTS5cbiAqIEBwYXJhbSBhcHBOYW1lIFRoZSBuYW1lIG9mIHRoZSBhcHAgdGhhdCBpcyBiZWluZyBsYXVuY2hlZC5cbiAqIEBwYXJhbSBjbGllbnRJZCBBbiBJZCB0byBhc3NvY2lhdGUgd2l0aCB0aGUgbGF1bmNoZWQgYXBwLlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGhlIGFwcCB0byBsYXVuY2guXG4gKiBAcGFyYW0gYXJncyBBZGRpdGlvbmFsIGNvbW1hbmQgbGluZSBhcmd1bWVudHMgZm9yIHRoZSBsYXVuY2guXG4gKiBAcGFyYW0gc3RyYXRlZ3kgVGhlIHN0cmF0ZWd5IHRvIGxhdW5jaCB0aGUgd2luZG93IHdpdGguXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxhdW5jaEFwcChcblx0YXBwTmFtZTogc3RyaW5nLFxuXHRjbGllbnRJZDogc3RyaW5nLFxuXHRwYXRoOiBzdHJpbmcsXG5cdGFyZ3M6IHN0cmluZ1tdLFxuXHRzdHJhdGVneTogQVdNLkxhdW5jaFN0cmF0ZWd5XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgTGF1bmNoaW5nICR7YXBwTmFtZX1gKTtcblx0XHRcdGNvbnN0IGxhdW5jaFJlc3VsdCA9IGF3YWl0IHNlcnZlci5sYXVuY2goe1xuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRjbGllbnRJZCxcblx0XHRcdFx0YXJncyxcblx0XHRcdFx0c3RyYXRlZ3lcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobGF1bmNoUmVzdWx0Py5wcm9jZXNzX2lkKSB7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGAke2FwcE5hbWV9IGxhdW5jaGVkIHdpdGggcHJvY2VzcyBpZCAke2xhdW5jaFJlc3VsdC5wcm9jZXNzX2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==